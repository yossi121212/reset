"use client";

import { ContentItem } from "@/data/seed";
import { useMemo } from "react";
import { ActionButtons } from "./ActionButtons";

const categoryLabel: Record<string, string> = {
  stoic: "Stoic",
  psalm: "Psalm",
  proverb: "Proverb",
  philosophical: "Philosophical",
  motivational: "Motivational",
};

/**
 * Color palettes per category — each has 5 colors that become
 * animated floating blobs to form a living mesh gradient.
 */
const palettes: Record<string, string[]> = {
  stoic: ["#fef3c7", "#fde68a", "#fbbf24", "#f59e0b", "#fffbeb"],
  psalm: ["#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#eff6ff"],
  proverb: ["#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#ecfdf5"],
  philosophical: ["#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#f5f3ff"],
  motivational: ["#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#fff1f2"],
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

export function QuoteCard({ item }: { item: ContentItem }) {
  const blobs = useMemo(
    () => makeBlobs(item.category, item.id),
    [item.category, item.id],
  );

  const baseBg = palettes[item.category]?.[0] ?? "#F0F4F8";

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden px-8"
      style={{ backgroundColor: baseBg }}
    >
      {/* Animated mesh blobs */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full will-change-transform"
          style={{
            backgroundColor: blob.color,
            width: `${blob.size}vmin`,
            height: `${blob.size}vmin`,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            translate: "-50% -50%",
            filter: "blur(80px)",
            opacity: 0.85,
            animation: `meshFloat${i % 3} ${blob.duration}s ease-in-out ${blob.delay}s infinite`,
          }}
        />
      ))}

      {/* Action buttons — right side */}
      <div className="absolute right-5 bottom-24 z-10">
        <ActionButtons variant="light" />
      </div>

      {/* Content — above the blobs */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="max-w-lg text-center text-2xl leading-relaxed font-light tracking-tight text-black/80 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)] sm:text-3xl">
          &ldquo;{item.body}&rdquo;
        </p>
        <div className="mt-8 flex flex-col items-center gap-1">
          <span className="text-base font-medium tracking-wide text-black/70 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
            {item.source}
          </span>
          <span className="rounded-full bg-white/40 px-3 py-0.5 text-xs tracking-widest uppercase text-black/50 backdrop-blur-sm">
            {categoryLabel[item.category]}
          </span>
        </div>
      </div>
    </div>
  );
}
