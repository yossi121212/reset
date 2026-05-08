"use client";

import { ContentItem } from "@/data/seed";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActionButtons } from "./ActionButtons";
import { QuoteAudio } from "./QuoteAudio";

const categoryLabel: Record<string, string> = {
  stoic: "Stoic",
  psalm: "Psalm",
  proverb: "Proverb",
  philosophical: "Philosophical",
  motivational: "Motivational",
};

/**
 * Color palettes per category — drive the soft-light blob tint
 * that overlays the nature photo.
 */
const palettes: Record<string, string[]> = {
  stoic: ["#fef3c7", "#fde68a", "#fbbf24", "#f59e0b", "#fffbeb"],
  psalm: ["#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#eff6ff"],
  proverb: ["#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#ecfdf5"],
  philosophical: ["#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#f5f3ff"],
  motivational: ["#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#fff1f2"],
};

/**
 * Curated Unsplash photo IDs per category — direct CDN, no API key.
 * Each ID is the trailing "photo-XXXXXXXXXX-yyyyyy" slug of an unsplash.com URL.
 * Swap freely: pick a photo on unsplash.com and copy its slug into the list.
 */
const natureImages: Record<string, string[]> = {
  stoic: [
    "1506905925346-21bda4d32df4",
    "1464822759023-fed622ff2c3b",
    "1469474968028-56623f02e42e",
    "1418065460487-3e41a6c84dc5",
    "1454496522488-7a8e488e8606",
  ],
  psalm: [
    "1441974231531-c6227db76b6e",
    "1470770841072-f978cf4d019e",
    "1426604966848-d7adac402bff",
    "1455218873509-8097305ee378",
    "1518173946687-a4c8892bbd9f",
  ],
  proverb: [
    "1447752875215-b2761acb3c5d",
    "1502082553048-f009c37129b9",
    "1490604001847-b712b0c2f967",
    "1500382017468-9049fed747ef",
    "1504788363733-507549153474",
  ],
  philosophical: [
    "1472214103451-9374bd1c798e",
    "1505144808419-1957a94ca61e",
    "1518837695005-2083093ee35b",
    "1493246507139-91e8fad9978e",
    "1483728642387-6c3bdd6c93e5",
  ],
  motivational: [
    "1501785888041-af3ef285b470",
    "1444080748397-f442aa95c3e5",
    "1509316975850-ff9c5deb0cd9",
    "1485470733090-0aae1788d5af",
    "1506905925346-21bda4d32df4",
  ],
};

/** Simple seeded hash from item id */
function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

interface Blob {
  color: string;
  /** Starting x/y as % */
  x: number;
  y: number;
  /** Size in vmin */
  size: number;
  /** Animation duration in seconds */
  duration: number;
  /** Animation delay in seconds (negative = starts mid-way) */
  delay: number;
}

/** Generate blob configs from category + id */
function makeBlobs(category: string, id: string): Blob[] {
  const colors = palettes[category] ?? palettes.stoic;
  const seed = hashId(id);

  return colors.map((color, i) => {
    const s = seed * (i + 1);
    return {
      color,
      x: (s * 37) % 80 + 10,       // 10-90%
      y: (s * 53) % 80 + 10,       // 10-90%
      size: 55 + ((s * 17) % 35),  // 55-90 vmin — big blobs
      duration: 10 + ((s * 13) % 10), // 10-20s
      delay: -((s * 7) % 10),       // negative = already mid-animation
    };
  });
}

/** Stable photo URL per quote — same id always resolves to the same image. */
function pickImageUrl(category: string, id: string): string {
  const list = natureImages[category] ?? natureImages.stoic;
  const photoId = list[hashId(id) % list.length];
  return `https://images.unsplash.com/photo-${photoId}?w=1600&q=80&auto=format&fit=crop`;
}

interface KenBurns {
  /** Which @keyframes block to use: kenBurns0..kenBurns3 */
  variant: 0 | 1 | 2 | 3;
  /** Loop duration in seconds */
  duration: number;
  /** Negative offset so cards aren't synchronized */
  delay: number;
  /** Focal point that the zoom drifts toward, as % */
  originX: number;
  originY: number;
}

/** Per-quote Ken Burns motion — varied keyframe + cadence + focal point so no two cards breathe alike. */
function makeKenBurns(id: string): KenBurns {
  const s = hashId(id);
  return {
    variant: ((s % 4) as 0 | 1 | 2 | 3),
    duration: 14 + (s % 11),          // 14–24s, snappier than before
    delay: -(s % 12),                  // -11s..0s, negative starts mid-loop
    originX: 25 + ((s * 31) % 50),     // 25–74%
    originY: 25 + ((s * 47) % 50),     // 25–74%
  };
}

export function QuoteCard({
  item,
  musicMuted = false,
  onMusicMuteToggle,
  lang = "en",
}: {
  item: ContentItem;
  musicMuted?: boolean;
  onMusicMuteToggle?: (muted: boolean) => void;
  lang?: "en" | "he";
}) {
  // Use Hebrew text only when Hebrew is selected AND this quote has a Hebrew translation.
  // Stoics, Buddhists, etc. without body_he stay in English — graceful fallback.
  const showHebrew = lang === "he" && !!item.body_he;
  const body = showHebrew ? item.body_he! : item.body;
  const source = showHebrew ? item.source_he ?? item.source : item.source;
  const { blobs, imageUrl, kenBurns } = useMemo(
    () => ({
      blobs: makeBlobs(item.category, item.id),
      imageUrl: pickImageUrl(item.category, item.id),
      kenBurns: makeKenBurns(item.id),
    }),
    [item.category, item.id],
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.intersectionRatio > 0.7),
      { threshold: [0, 0.5, 0.7, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex h-full flex-col items-center justify-center overflow-hidden px-8"
    >
      {/* Photo background — deepest layer, with Ken Burns drift */}
      <div
        aria-hidden
        data-ken-burns
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transformOrigin: `${kenBurns.originX}% ${kenBurns.originY}%`,
          animation: `kenBurns${kenBurns.variant} ${kenBurns.duration}s ease-in-out ${kenBurns.delay}s infinite alternate`,
        }}
      />

      {/* Animated mesh blobs — soft-light tints the photo with category mood */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full mix-blend-soft-light will-change-transform"
          style={{
            backgroundColor: blob.color,
            width: `${blob.size}vmin`,
            height: `${blob.size}vmin`,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            translate: "-50% -50%",
            filter: "blur(80px)",
            opacity: 0.6,
            animation: `meshFloat${i % 3} ${blob.duration}s ease-in-out ${blob.delay}s infinite`,
          }}
        />
      ))}

      {/* Dark gradient overlay — guarantees text legibility on any photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"
      />

      {/* Action buttons — right side, stacked above the music mute */}
      <div className="absolute right-5 bottom-40 z-10">
        <ActionButtons variant="dark" />
      </div>

      {/* Music mute / unmute */}
      <button
        onClick={() => onMusicMuteToggle?.(!musicMuted)}
        className="absolute right-5 bottom-24 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors active:bg-white/30"
        aria-label={musicMuted ? "Turn music on" : "Turn music off"}
      >
        {musicMuted ? (
          <svg
            width="18"
            height="18"
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
            width="18"
            height="18"
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

      {/* Content — above all background layers */}
      <div
        className="relative z-10 flex flex-col items-center"
        dir={showHebrew ? "rtl" : "ltr"}
      >
        <p
          className={`max-w-lg text-center leading-relaxed font-light tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${
            showHebrew
              ? "text-3xl sm:text-4xl"
              : "text-2xl sm:text-3xl"
          }`}
          style={
            showHebrew
              ? { fontFamily: "var(--font-hebrew), serif" }
              : undefined
          }
        >
          &ldquo;{body}&rdquo;
        </p>
        <div className="mt-8 flex flex-col items-center gap-1">
          <span
            className="text-base font-medium tracking-wide text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
            style={
              showHebrew
                ? { fontFamily: "var(--font-hebrew), serif" }
                : undefined
            }
          >
            {source}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-0.5 text-xs tracking-widest uppercase text-white/90 backdrop-blur-md">
            {categoryLabel[item.category]}
          </span>
        </div>
      </div>

      <QuoteAudio active={active && !musicMuted} />
    </div>
  );
}
