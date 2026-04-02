"use client";

import { FeedItem } from "@/components/FeedItem";
import { BottomNav } from "@/components/BottomNav";
import { feedVideos, feedQuotes } from "@/data/seed";
import { useEffect, useState } from "react";

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FeedPage() {
  const [items, setItems] = useState([...feedVideos, ...feedQuotes]);

  useEffect(() => {
    setItems([...shuffle(feedVideos), ...shuffle(feedQuotes)]);
  }, []);

  return (
    <div className="mx-auto max-w-md">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-md items-center justify-between px-6 pt-[env(safe-area-inset-top,0px)] py-4">
          <h1 className="text-lg font-semibold tracking-tight text-black drop-shadow-sm">
            Reset
          </h1>
          <span className="text-[10px] tracking-[0.2em] uppercase text-black/40">
            clean content
          </span>
        </div>
      </header>

      {/* Full-screen snap scroll feed */}
      <main className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll">
        {items.map((item, i) => (
          <div key={item.id} className="h-[100dvh] snap-start">
            <FeedItem item={item} priority={i === 0} />
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
