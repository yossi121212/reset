"use client";

import { BottomNav } from "@/components/BottomNav";
import { PlaylistPlayer } from "@/components/PlaylistPlayer";
import { playlistItems } from "@/data/seed";
import { useEffect, useState } from "react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PlaylistPage() {
  const [items, setItems] = useState(playlistItems);

  useEffect(() => {
    setItems(shuffle(playlistItems));
  }, []);

  return (
    <div className="mx-auto max-w-md">
      <PlaylistPlayer items={items} />
      <BottomNav />
    </div>
  );
}
