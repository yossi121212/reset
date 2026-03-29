"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md">
        <Link
          href="/"
          className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-xs tracking-wide transition-colors ${
            pathname === "/"
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          }`}
        >
          <FeedIcon active={pathname === "/"} />
          Feed
        </Link>
        <Link
          href="/playlist"
          className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-xs tracking-wide transition-colors ${
            pathname === "/playlist"
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          }`}
        >
          <PlaylistIcon active={pathname === "/playlist"} />
          Playlist
        </Link>
        <Link
          href="/about"
          className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-xs tracking-wide transition-colors ${
            pathname === "/about"
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          }`}
        >
          <AboutIcon active={pathname === "/about"} />
          About
        </Link>
      </div>
    </nav>
  );
}

function FeedIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function PlaylistIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function AboutIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
