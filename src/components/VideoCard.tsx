"use client";

import { ContentItem } from "@/data/seed";
import { useEffect, useRef, useState } from "react";
import { ActionButtons } from "./ActionButtons";

// Music sits underneath the speech — quiet enough that the voice always wins.
const MUSIC_TARGET_VOLUME = 0.18;
const MUSIC_FADE_MS = 600;

export function VideoCard({
  item,
  priority = false,
  globalMuted = true,
  onMuteToggle,
}: {
  item: ContentItem;
  priority?: boolean;
  globalMuted?: boolean;
  onMuteToggle?: (muted: boolean) => void;
}) {
  const hasMusic = !!item.music;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = globalMuted;
    }
  }, [globalMuted]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPaused(false);
          setInView(true);
        } else {
          video.pause();
          video.currentTime = 0;
          setIsPaused(false);
          setInView(false);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Background-music fade tied to viewport + mute state.
  useEffect(() => {
    if (!hasMusic) return;
    const audio = musicRef.current;
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
        const t = Math.min((performance.now() - t0) / MUSIC_FADE_MS, 1);
        audio.volume = start + (target - start) * t;
        if (t === 1) {
          clearFade();
          onDone?.();
        }
      }, 16);
    };

    const shouldPlay = inView && !globalMuted;
    if (shouldPlay) {
      audio.volume = 0;
      audio.play().catch(() => {});
      fadeTo(MUSIC_TARGET_VOLUME);
    } else {
      fadeTo(0, () => audio.pause());
    }

    return clearFade;
  }, [hasMusic, inView, globalMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !globalMuted;
    // Tell the parent so ALL videos get the new mute state
    onMuteToggle?.(newMuted);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full items-center justify-center bg-black"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={item.body}
        muted={globalMuted}
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        className="h-full w-full object-cover"
      />

      {hasMusic && (
        <audio
          ref={musicRef}
          src={item.music}
          loop
          preload="metadata"
        />
      )}

      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="white"
            opacity={0.8}
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </div>
      )}

      {/* Right-side action stack — share, save, mute share one flex column */}
      <div
        className="absolute right-5 bottom-24 z-10 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <ActionButtons variant="dark" />
        <button
          onClick={toggleMute}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors active:bg-white/30"
          aria-label={globalMuted ? "Unmute" : "Mute"}
        >
          {globalMuted ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>

      <div className="absolute bottom-24 left-6 flex flex-col gap-1">
        <span className="text-sm font-medium text-white/90">{item.source}</span>
      </div>
    </div>
  );
}
