"use client";

import { ContentItem } from "@/data/seed";
import { QuoteCard } from "./QuoteCard";
import { VideoCard } from "./VideoCard";

export function FeedItem({
  item,
  priority = false,
  globalMuted = true,
  onMuteToggle,
  musicMuted = false,
  onMusicMuteToggle,
  lang = "en",
}: {
  item: ContentItem;
  priority?: boolean;
  globalMuted?: boolean;
  onMuteToggle?: (muted: boolean) => void;
  musicMuted?: boolean;
  onMusicMuteToggle?: (muted: boolean) => void;
  lang?: "en" | "he";
}) {
  if (item.type === "video") {
    return (
      <VideoCard
        item={item}
        priority={priority}
        globalMuted={globalMuted}
        onMuteToggle={onMuteToggle}
      />
    );
  }
  return (
    <QuoteCard
      item={item}
      musicMuted={musicMuted}
      onMusicMuteToggle={onMusicMuteToggle}
      lang={lang}
    />
  );
}
