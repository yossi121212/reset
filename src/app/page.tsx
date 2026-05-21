"use client";

import { FeedItem } from "@/components/FeedItem";
import { BottomNav } from "@/components/BottomNav";
import { feedVideos } from "@/data/seed";
import { useCallback, useEffect, useRef, useState } from "react";

const AI_STORAGE_KEY = "reset:ai:curated";

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface CuratedPayload {
  prompt: string;
  ids: string[];
  detected: { topics: string[]; moods: string[] };
}

// Module-level cache so a payload survives React StrictMode's
// double-mount in dev. TTL is intentionally short so a real page
// refresh doesn't keep re-applying a stale curation.
let lastAppliedPayload: CuratedPayload | null = null;
let lastAppliedAt = 0;
const STRICT_MODE_REMOUNT_WINDOW_MS = 5000;

function consumeCurated(): CuratedPayload | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(AI_STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw) {
    try {
      lastAppliedPayload = JSON.parse(raw) as CuratedPayload;
      lastAppliedAt = Date.now();
      sessionStorage.removeItem(AI_STORAGE_KEY);
      return lastAppliedPayload;
    } catch {
      return null;
    }
  }
  // Storage already cleared. Only return cached payload if we're still
  // inside the StrictMode double-mount window — otherwise treat this
  // as a fresh visit and return null so the feed shuffles normally.
  if (Date.now() - lastAppliedAt < STRICT_MODE_REMOUNT_WINDOW_MS) {
    return lastAppliedPayload;
  }
  lastAppliedPayload = null;
  return null;
}

export default function FeedPage() {
  const [items, setItems] = useState(feedVideos);
  const [globalMuted, setGlobalMuted] = useState(true);
  const [musicMuted, setMusicMuted] = useState(false);
  const lang: "en" | "he" = "en";
  const [curated, setCurated] = useState<CuratedPayload | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const feedRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Module-level cache survives StrictMode double-mount.
    const payload = consumeCurated();

    if (payload && payload.ids.length > 0) {
      // Put matched videos first (in the order returned by the matcher),
      // then append the rest of the feed shuffled.
      const matchedSet = new Set(payload.ids);
      const byId = new Map(feedVideos.map((v) => [v.id, v]));
      const ordered = [
        ...payload.ids.map((id) => byId.get(id)).filter((v): v is NonNullable<typeof v> => !!v),
        ...shuffle(feedVideos.filter((v) => !matchedSet.has(v.id))),
      ];
      setItems(ordered);
      setCurated(payload);
      // Curation is a deliberate user action — start the feed with sound on.
      setGlobalMuted(false);
      setToastVisible(true);
      return;
    }

    setItems(shuffle(feedVideos));
  }, []);

  // Hide the AI toast once the user scrolls past the matched/sorted zone.
  useEffect(() => {
    if (!curated) return;
    const el = feedRef.current;
    if (!el) return;
    const onScroll = () => {
      const step = el.clientHeight;
      if (step === 0) return;
      const idx = Math.round(el.scrollTop / step);
      const stillInMatched = idx < curated.ids.length;
      setToastVisible(stillInMatched);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [curated]);

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
        <div className="mx-auto flex max-w-md items-center px-6 pt-[env(safe-area-inset-top,0px)] py-4">
          <h1 className="text-lg font-semibold tracking-tight text-white drop-shadow-md">
            Reset
          </h1>
        </div>
      </header>

      {/* AI-curated toast — horizontally centered, near the top */}
      {curated && (
        <div
          className="pointer-events-none fixed left-1/2 z-[60]"
          style={{
            top: "max(env(safe-area-inset-top, 0px), 1.25rem)",
            opacity: toastVisible ? 1 : 0,
            transform: `translate(-50%, ${toastVisible ? "0" : "-1rem"})`,
            transition: "opacity 500ms ease, transform 500ms ease",
          }}
        >
          <div className="ai-shimmer">
            <div className="ai-shimmer-inner flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white shadow-lg">
              <SparkleIcon />
              <span>
                Your feed is ready
                {curated.detected &&
                (curated.detected.topics.length > 0 || curated.detected.moods.length > 0)
                  ? ` · ${[...curated.detected.topics, ...curated.detected.moods].join(" · ")}`
                  : ""}
              </span>
            </div>
          </div>
        </div>
      )}

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

function SparkleIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white"
    >
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
    </svg>
  );
}
