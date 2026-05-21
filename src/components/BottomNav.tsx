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
          href="/ai"
          aria-label="AI"
          className="group flex flex-1 flex-col items-center justify-center py-3"
        >
          <span
            className={`relative flex h-11 w-11 items-center justify-center rounded-full shadow-[0_6px_18px_-6px_rgba(99,102,241,0.55)] transition-transform duration-500 ease-out group-hover:rotate-[18deg] group-hover:scale-110 group-active:scale-95 ${
              pathname === "/ai" ? "scale-105" : ""
            }`}
            style={{
              background:
                "conic-gradient(from 210deg at 50% 50%, #6366f1, #8b5cf6, #d946ef, #f472b6, #38bdf8, #6366f1)",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-[2px] rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)",
              }}
            />
            <AIIcon active={pathname === "/ai"} />
          </span>
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

function AIIcon({ active }: { active: boolean }) {
  return (
    <svg
      width={active ? 28 : 26}
      height={active ? 28 : 26}
      viewBox="0 0 24 24"
      fill="#ffffff"
      aria-hidden
      className="relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
    >
      {/* Four-point sparkle */}
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
      {/* Small accent sparkle */}
      <path d="M19 16l.6 1.9L21.5 18.5l-1.9.6L19 21l-.6-1.9L16.5 18.5l1.9-.6L19 16z" />
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
