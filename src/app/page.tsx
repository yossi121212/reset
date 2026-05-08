"use client";

import { FeedItem } from "@/components/FeedItem";
import { BottomNav } from "@/components/BottomNav";
import { feedVideos, feedQuotes } from "@/data/seed";
import { useCallback, useEffect, useRef, useState } from "react";

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Front-loaded interleave: first few slots alternate video-quote so a video
 * lands at position 0, then remaining videos spread evenly through the tail.
 * Result starts video-heavy and tapers to quote-heavy.
 */
function interleave() {
  const videos = shuffle(feedVideos);
  const quotes = shuffle(feedQuotes);

  if (videos.length === 0) return quotes;
  if (quotes.length === 0) return videos;

  const result: typeof quotes = [];
  // How many videos to pack into the front block. Bump this to make the
  // top of the feed even more video-heavy.
  const frontBlock = Math.min(3, videos.length);

  let v = 0;
  let q = 0;

  // Front block: V Q V Q V Q ...
  for (let i = 0; i < frontBlock; i++) {
    result.push(videos[v++]);
    if (q < quotes.length) result.push(quotes[q++]);
  }

  // Remaining: spread the rest of the videos evenly through the rest of the quotes.
  const remainingVideos = videos.slice(v);
  const remainingQuotes = quotes.slice(q);
  const gap = Math.max(
    1,
    Math.floor(remainingQuotes.length / (remainingVideos.length + 1)),
  );

  let rq = 0;
  for (const video of remainingVideos) {
    for (let g = 0; g < gap && rq < remainingQuotes.length; g++) {
      result.push(remainingQuotes[rq++]);
    }
    result.push(video);
  }
  while (rq < remainingQuotes.length) {
    result.push(remainingQuotes[rq++]);
  }

  return result;
}

export default function FeedPage() {
  const [items, setItems] = useState([...feedVideos, ...feedQuotes]);
  const [globalMuted, setGlobalMuted] = useState(true);
  const [musicMuted, setMusicMuted] = useState(false);
  const [lang, setLang] = useState<"en" | "he">("en");
  const feedRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setItems(interleave());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const el = feedRef.current;
      if (!el) return;
      e.preventDefault();
      const step = el.clientHeight;
      const direction = e.key === "ArrowDown" ? 1 : -1;
      const current = Math.round(el.scrollTop / step);
      const next = Math.max(
        0,
        Math.min(items.length - 1, current + direction),
      );
      el.scrollTo({ top: next * step, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  const handleMuteToggle = useCallback((muted: boolean) => {
    setGlobalMuted(muted);
  }, []);

  const handleMusicMuteToggle = useCallback((muted: boolean) => {
    setMusicMuted(muted);
  }, []);

  return (
    <div className="mx-auto max-w-md">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-md items-center justify-between px-6 pt-[env(safe-area-inset-top,0px)] py-4">
          <h1 className="text-lg font-semibold tracking-tight text-white drop-shadow-md">
            Reset
          </h1>
          <button
            onClick={() => setLang((l) => (l === "en" ? "he" : "en"))}
            className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-white backdrop-blur-md transition-colors active:bg-white/30"
            aria-label="Toggle language"
          >
            {lang === "en" ? "עב" : "EN"}
          </button>
        </div>
      </header>

      {/* Full-screen snap scroll feed */}
      <main
        ref={feedRef}
        className="h-[100dvh] snap-y snap-mandatory overflow-y-scroll"
      >
        {items.map((item, i) => (
          <div key={item.id} className="h-[100dvh] snap-start">
            <FeedItem
              item={item}
              priority={i === 0}
              globalMuted={globalMuted}
              onMuteToggle={handleMuteToggle}
              musicMuted={musicMuted}
              onMusicMuteToggle={handleMusicMuteToggle}
              lang={lang}
            />
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
