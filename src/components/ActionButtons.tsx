"use client";

/**
 * Like, Share & Save buttons — vertical action bar for feed items.
 * Purely presentational for now (no logic).
 *
 * @param variant "light" for quote cards (dark icons), "dark" for video cards (white icons)
 */
export function ActionButtons({
  variant = "dark",
}: {
  variant?: "light" | "dark";
}) {
  const stroke = variant === "dark" ? "white" : "rgba(0,0,0,0.6)";
  const bg =
    variant === "dark"
      ? "bg-white/20 backdrop-blur-sm active:bg-white/30"
      : "bg-black/10 backdrop-blur-sm active:bg-black/15";

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Share */}
      <button
        className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} transition-colors`}
        aria-label="Share"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>

      {/* Save / Bookmark */}
      <button
        className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} transition-colors`}
        aria-label="Save"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
}
