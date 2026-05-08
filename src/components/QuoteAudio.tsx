"use client";

import { useEffect, useRef, useState } from "react";

const TRACKS = [
  "/audio/in-this-shirt.mp3",
  "/audio/interstellar.mp3",
  "/audio/another-love.mp3",
];
const TARGET_VOLUME = 0.32;
const FADE_MS = 900;

/**
 * Plays a short, looping music clip behind a quote card.
 * Picks one of the tracks at random on mount.
 * Fades in when `active`, fades out and pauses when not.
 */
export function QuoteAudio({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [track] = useState(
    () => TRACKS[Math.floor(Math.random() * TRACKS.length)],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const clearFade = () => {
      if (fadeRef.current) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    };

    const fadeTo = (target: number, onDone?: () => void) => {
      clearFade();
      const start = audio.volume;
      const t0 = performance.now();
      fadeRef.current = setInterval(() => {
        const t = Math.min((performance.now() - t0) / FADE_MS, 1);
        audio.volume = start + (target - start) * t;
        if (t === 1) {
          clearFade();
          onDone?.();
        }
      }, 16);
    };

    // On mobile, autoplay is blocked until the user has tapped. If the first
    // play() rejects, wait for the next gesture anywhere on the page and retry —
    // so music starts on the user's first tap, not only when they hit the icon.
    let unlock: (() => void) | null = null;
    const removeUnlock = () => {
      if (!unlock) return;
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("touchstart", unlock);
      unlock = null;
    };

    const tryPlay = () => {
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          if (unlock) return;
          unlock = () => {
            removeUnlock();
            if (active && audio.paused) audio.play().catch(() => {});
          };
          document.addEventListener("pointerdown", unlock, { once: true });
          document.addEventListener("touchstart", unlock, { once: true });
        });
      }
    };

    if (active) {
      audio.volume = 0;
      tryPlay();
      fadeTo(TARGET_VOLUME);
    } else {
      removeUnlock();
      fadeTo(0, () => audio.pause());
    }

    return () => {
      clearFade();
      removeUnlock();
    };
  }, [active]);

  return <audio ref={audioRef} src={track} loop preload="metadata" />;
}
