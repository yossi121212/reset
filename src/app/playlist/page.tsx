"use client";

import { BottomNav } from "@/components/BottomNav";
import { PlaylistPlayer } from "@/components/PlaylistPlayer";
import { playlistItems } from "@/data/seed";

export default function PlaylistPage() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold tracking-tight">Playlist</h1>
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {playlistItems.length} videos
          </span>
        </div>
      </header>

      <main className="pt-16 pb-20">
        <PlaylistPlayer items={playlistItems} />
      </main>

      <BottomNav />
    </>
  );
}
