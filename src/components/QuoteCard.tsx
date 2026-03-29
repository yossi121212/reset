"use client";

import { ContentItem } from "@/data/seed";

const categoryLabel: Record<string, string> = {
  stoic: "Stoic",
  psalm: "Psalm",
  proverb: "Proverb",
  philosophical: "Philosophical",
  motivational: "Motivational",
};

export function QuoteCard({ item }: { item: ContentItem }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#F0F4F8] px-8">
      <p className="max-w-lg text-center text-2xl leading-relaxed font-light tracking-tight sm:text-3xl">
        &ldquo;{item.body}&rdquo;
      </p>
      <div className="mt-8 flex flex-col items-center gap-1">
        <span className="text-base font-medium tracking-wide">
          {item.source}
        </span>
        <span className="text-xs tracking-widest uppercase text-black/40">
          {categoryLabel[item.category]}
        </span>
      </div>
    </div>
  );
}
