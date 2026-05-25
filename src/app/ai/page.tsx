"use client";

import { BottomNav } from "@/components/BottomNav";
import { feedVideos } from "@/data/seed";
import { matchVideos } from "@/lib/mockAi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EXAMPLE_PROMPTS = [
  "I need to calm down before bed",
  "Hype me up before the gym",
  "Help me focus for deep work",
  "Remind me to be grateful",
  "Inspire me with sports",
  "Something reflective about nature",
];

export const AI_STORAGE_KEY = "reset:ai:curated";

export default function AIPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCurate(text: string) {
    const t = text.trim();
    if (!t) return;
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 900));

    const { results, detected } = matchVideos(t, feedVideos, feedVideos.length);

    if (results.length === 0) {
      setError("No match. Try words like calm, hype, nature, focus, sports, uplifting.");
      setLoading(false);
      return;
    }

    sessionStorage.setItem(
      AI_STORAGE_KEY,
      JSON.stringify({ prompt: t, ids: results.map((r) => r.item.id), detected }),
    );

    router.push("/");
  }

  function handleChip(label: string) {
    setPrompt(label);
    handleCurate(label);
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-white">
      {/* Soft ambient pastel blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(216,180,254,0.4)" }}
        />
        <div
          className="absolute top-1/3 -right-20 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(249,168,212,0.3)" }}
        />
        <div
          className="absolute bottom-20 left-1/4 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(103,232,249,0.25)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 pb-28 pt-[max(env(safe-area-inset-top,0px),2.5rem)]">

        {/* Top label */}
        <div className="self-start flex items-center gap-2 mb-2">
          <SparkleIcon />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-slate-400">
            AI Mode
          </span>
        </div>

        {/* ── Hero: orb + title ── */}
        <div className="flex flex-col items-center mt-4 mb-8 w-full">
          {/* Floating wrapper */}
          <div style={{ animation: "orbFloat 4s ease-in-out infinite" }}>
            <MagicOrb loading={loading} />
          </div>

          <div className="mt-7 text-center">
            <h1 className="text-2xl font-semibold leading-snug tracking-tight text-slate-800">
              {loading ? "Reading the room…" : "What do you need right now?"}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {loading
                ? "Curating your personal feed…"
                : "Tell Reset how you feel and it'll curate your feed."}
            </p>
          </div>
        </div>

        {/* ── Prompt card ── */}
        <div className="w-full rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm p-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleCurate(prompt);
              }
            }}
            placeholder="e.g. I need focus for deep work… or hype me up before the gym…"
            className="min-h-[80px] w-full resize-none bg-transparent text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 focus:outline-none"
          />
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
            <span className="text-[10px] font-medium tracking-widest uppercase text-slate-300">
              Mock AI
            </span>
            <button
              onClick={() => handleCurate(prompt)}
              disabled={loading || !prompt.trim()}
              className="rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
            >
              {loading ? "Curating…" : "Curate"}
            </button>
          </div>
        </div>

        {/* ── Example chips ── */}
        <div className="mt-4 w-full">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-slate-400">Try</div>
          <div
            className="relative"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            }}
          >
            <div
              className="ai-examples flex flex-col gap-2 overflow-y-auto pr-1"
              style={{ maxHeight: "9rem", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {EXAMPLE_PROMPTS.map((p) => (
                <button
                  key={p}
                  disabled={loading}
                  onClick={() => handleChip(p)}
                  className="shrink-0 text-left rounded-2xl border border-violet-100 bg-violet-50/80 px-3 py-2.5 text-sm text-violet-700 transition-colors active:bg-violet-100 disabled:opacity-50"
                >
                  <span className="text-violet-300">&ldquo;</span>
                  {p}
                  <span className="text-violet-300">&rdquo;</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-center text-xs text-rose-400">{error}</p>
        )}

        <p className="mt-auto pt-10 text-center text-xs text-slate-300">
          Or scroll the Feed for a curated mix.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

/* ── Magic Orb ────────────────────────────────────────────────────────────── */

function MagicOrb({ loading }: { loading: boolean }) {
  const spinDuration = loading ? "1.2s" : "5s";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 168, height: 168 }}
    >
      {/* Ripple ring 1 */}
      <div
        className="absolute rounded-full border border-violet-300/50"
        style={{ inset: -22, animation: "orbPulseRing 2.8s ease-out infinite" }}
      />
      {/* Ripple ring 2 — offset by 0.9s */}
      <div
        className="absolute rounded-full border border-pink-200/35"
        style={{ inset: -40, animation: "orbPulseRing 2.8s ease-out infinite 0.9s" }}
      />

      {/* Glow haze behind the orb */}
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          inset: -14,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.32) 0%, rgba(236,72,153,0.16) 45%, transparent 70%)",
          animation: "orbGlowPulse 3s ease-in-out infinite",
        }}
      />

      {/* Spinning conic-gradient ring — extends 7px beyond white core */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -7,
          background:
            "conic-gradient(from 0deg, #a855f7 0%, #ec4899 25%, #22d3ee 52%, #818cf8 78%, #c084fc 92%, #a855f7 100%)",
          animation: `orbSpin ${spinDuration} linear infinite`,
        }}
      />

      {/* White core — creates the ring effect */}
      <div className="absolute inset-0 rounded-full bg-white" />

      {/* Sphere sheen */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 36% 30%, rgba(255,255,255,1) 0%, rgba(245,240,255,0.55) 48%, rgba(233,213,255,0.25) 100%)",
        }}
      />

      {/* Center sparkle icon */}
      <div className="relative z-10">
        <SparkleIcon size={32} spinning={loading} />
      </div>
    </div>
  );
}

/* ── Icons ────────────────────────────────────────────────────────────────── */

function SparkleIcon({
  small = false,
  size,
  spinning = false,
}: {
  small?: boolean;
  size?: number;
  spinning?: boolean;
}) {
  const s = size ?? (small ? 14 : 18);
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{
        color: "#a855f7",
        animation: spinning ? "orbSpin 1.8s linear infinite" : undefined,
      }}
    >
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
      <path d="M19 16l.6 1.9L21.5 18.5l-1.9.6L19 16z" />
    </svg>
  );
}
