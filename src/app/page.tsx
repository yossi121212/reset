"use client";

import { FeedItem } from "@/components/FeedItem";
import { BottomNav } from "@/components/BottomNav";
import { feedItems } from "@/data/seed";

export default function FeedPage() {
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
        {feedItems.map((item) => (
          <div key={item.id} className="h-[100dvh] snap-start">
            <FeedItem item={item} />
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
