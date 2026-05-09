"use client";

import { useEffect, useState } from "react";
import { clearActiveTrack, setActiveTrack } from "@/lib/quoteMusic";

const TRACKS = [
  "/audio/in-this-shirt.mp3",
  "/audio/interstellar.mp3",
  "/audio/another-love.mp3",
];

/**
 * Tells the shared audio manager which track to play while this quote card
 * is the focused one. Renders nothing — the actual <audio> element lives in
 * the singleton at `@/lib/quoteMusic`. That single shared element is what
 * lets iOS-style autoplay-after-first-tap work across all cards (TikTok-style):
 * once unlocked, every subsequent card just swaps `src` without needing
 * another user gesture.
 */
export function QuoteAudio({ active }: { active: boolean }) {
  const [track] = useState(
    () => TRACKS[Math.floor(Math.random() * TRACKS.length)],
  );

  useEffect(() => {
    if (active) {
      setActiveTrack(track);
    } else {
      clearActiveTrack();
    }
  }, [active, track]);

  // Cleanup on unmount: if this card was the active one, release it.
  useEffect(() => {
    return () => {
      if (active) clearActiveTrack();
    };
    // We intentionally only want this on unmount, so deps are empty.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
