"use client";

import { ContentItem } from "@/data/seed";
import { useCallback, useEffect, useRef, useState } from "react";

export function PlaylistPlayer({ items }: { items: ContentItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number>(0);

  const current = items[currentIndex];

  const playNext = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const playPrev = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Track video progress with requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration && video.duration > 0) {
        setProgress(video.currentTime / video.duration);
      }
      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [currentIndex]);

  // Autoplay when track changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      if (isPlaying) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.load();

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [currentIndex, isPlaying]);

  if (!current) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-muted-foreground">
        No videos available
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col">
      {/* Video */}
      <div
        className="relative flex flex-1 items-center justify-center bg-black"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={current.body}
          muted
          playsInline
          preload="auto"
          onEnded={playNext}
          className="h-full w-full object-contain"
        />

        {/* Pause overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="white" opacity={0.8}>
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 bg-white px-6 py-5">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-medium">{current.source}</span>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of {items.length}
          </span>
        </div>

        {/* Segmented progress bar — each segment fills as its video plays */}
        <div className="flex w-full max-w-xs gap-1">
          {items.map((_, i) => (
            <div
              key={i}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-black/10"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-black transition-[width] duration-100 ease-linear"
                style={{
                  width:
                    i < currentIndex
                      ? "100%"
                      : i === currentIndex
                        ? `${progress * 100}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-8">
          <button
            onClick={playPrev}
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Previous"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" y1="19" x2="5" y2="5" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background transition-transform active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            )}
          </button>

          <button
            onClick={playNext}
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Next"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
