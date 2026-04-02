"use client";

import { ContentItem } from "@/data/seed";
import { QuoteCard } from "./QuoteCard";
import { VideoCard } from "./VideoCard";

export function FeedItem({
  item,
  priority = false,
  globalMuted = true,
  onMuteToggle,
}: {
  item: ContentItem;
  priority?: boolean;
  globalMuted?: boolean;
  onMuteToggle?: (muted: boolean) => void;
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
  return <QuoteCard item={item} />;
}
