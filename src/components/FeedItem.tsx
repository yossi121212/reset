"use client";

import { ContentItem } from "@/data/seed";
import { QuoteCard } from "./QuoteCard";
import { VideoCard } from "./VideoCard";

export function FeedItem({
  item,
  priority = false,
}: {
  item: ContentItem;
  priority?: boolean;
}) {
  if (item.type === "video") {
    return <VideoCard item={item} priority={priority} />;
  }
  return <QuoteCard item={item} />;
}
