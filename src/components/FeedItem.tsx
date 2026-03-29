"use client";

import { ContentItem } from "@/data/seed";
import { QuoteCard } from "./QuoteCard";
import { VideoCard } from "./VideoCard";

export function FeedItem({ item }: { item: ContentItem }) {
  if (item.type === "video") {
    return <VideoCard item={item} />;
  }
  return <QuoteCard item={item} />;
}
