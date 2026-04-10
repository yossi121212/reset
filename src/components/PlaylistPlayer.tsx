"use client";

import { ContentItem } from "@/data/seed";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActionButtons } from "./ActionButtons";

export function PlaylistPlayer({ items }: { items: ContentItem[] }) {
  const [globalMuted, setGlobalMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prevIndexRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number>(0);

  const current = items[currentIndex];

  // Navigate to a specific index
  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;
      prevIndexRef.current = currentIndex;
      setProgress(0);
      setIsPaused(false);
      setCurrentIndex(index);
    },
    [items.length],
  );

  // Keyboard arrows: left/right = prev/next, space = pause
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(currentIndex - 1);
      else if (e.key === "ArrowRight") goTo(currentIndex + 1);
      else if (e.key === " ") {
        e.preventDefault();
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
          video.play().catch(() => {});
          setIsPaused(false);
        } else {
          video.pause();
          setIsPaused(true);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, goTo]);

  // Track progress via rAF
  useEffect(() => {
    const update = () => {
      const video = videoRef.current;
      if (video && video.duration > 0) {
        setProgress(video.currentTime / video.duration);
      }
      animFrameRef.current = requestAnimationFrame(update);
    };
    animFrameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [currentIndex]);

  // Play video when index changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      video.muted = globalMuted;
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.load();

    return () => video.removeEventListener("canplay", handleCanPlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Sync mute
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = globalMuted;
  }, [globalMuted]);

  // Auto-advance on end
  const handleEnded = useCallback(() => {
    if (currentIndex + 1 < items.length) {
      goTo(currentIndex + 1);
    } else {
      // Loop back
      goTo(0);
    }
  }, [currentIndex, items.length, goTo]);

  // Tap zones: left = prev, right = next, center = pause
  const handleTap = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;

      if (pct < 0.3) {
        goTo(currentIndex - 1);
      } else if (pct > 0.7) {
        goTo(currentIndex + 1);
      } else {
        // Center — toggle play/pause
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
          video.play().catch(() => {});
          setIsPaused(false);
        } else {
          video.pause();
          setIsPaused(true);
        }
      }
    },
    [currentIndex, goTo],
  );

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGlobalMuted((m) => !m);
  };

  if (!current) return null;

  return (
    <div className="relative h-[100dvh] w-full bg-black" onClick={handleTap}>
      {/* Stories-style progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 px-3 pt-[calc(env(safe-area-inset-top,0px)+8px)]">
        {items.map((_, i) => (
          <div
            key={i}
            className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/30"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white"
              style={{
                width:
                  i < currentIndex
                    ? "100%"
                    : i === currentIndex
                      ? `${progress * 100}%`
                      : "0%",
                // Only animate the active bar filling up; snap instantly when going back
                transition:
                  i === currentIndex
                    ? "width 150ms linear"
                    : i >= currentIndex && currentIndex < prevIndexRef.current
                      ? "none"
                      : "width 150ms linear",
              }}
            />
          </div>
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-0 right-0 z-50 px-3 pt-[calc(env(safe-area-inset-top,0px)+18px)]">
        <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/60 drop-shadow">
          {currentIndex + 1} / {items.length}
        </span>
      </div>

      {/* Single video element — source swaps on navigation */}
      <video
        ref={videoRef}
        src={current.body}
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className="h-full w-full object-cover"
      />

      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="white" opacity={0.8}>
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </div>
      )}

      {/* Action buttons */}
      <div
        className="absolute right-5 bottom-40 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <ActionButtons variant="dark" />
      </div>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-24 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors active:bg-white/30"
        aria-label={globalMuted ? "Unmute" : "Mute"}
      >
        {globalMuted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      {/* Source label */}
      <div className="absolute bottom-24 left-6">
        <span className="text-sm font-medium text-white/90 drop-shadow">
          {current.source}
        </span>
      </div>
    </div>
  );
}
