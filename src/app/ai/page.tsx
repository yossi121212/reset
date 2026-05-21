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
    // Fake "thinking" delay so it feels AI-ish.
    await new Promise((r) => setTimeout(r, 700));

    const { results, detected } = matchVideos(t, feedVideos, feedVideos.length);

    if (results.length === 0) {
      setError("No match. Try words like calm, hype, nature, focus, sports, uplifting.");
      setLoading(false);
      return;
    }

    sessionStorage.setItem(
      AI_STORAGE_KEY,
      JSON.stringify({
        prompt: t,
        ids: results.map((r) => r.item.id),
        detected,
      }),
    );

    router.push("/");
  }

  function handleChip(label: string) {
    setPrompt(label);
    handleCurate(label);
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Soft ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-32 pt-[max(env(safe-area-inset-top,0px),3rem)]">
        {/* Header */}
        <div className="flex items-center gap-2">
          <SparkleIcon />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/60">
            AI Mode
          </span>
        </div>

        {/* Hero */}
        <div className="mt-10 flex flex-col gap-3">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            Ask for the mode<br />you need right now.
          </h1>
          <p className="text-base leading-relaxed text-white/60">
            Tell Reset what you&apos;re feeling and it&apos;ll curate your feed.
          </p>
        </div>

        {/* Prompt card */}
        <div className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="mt-1 shrink-0 rounded-full bg-white/10 p-2">
                <SparkleIcon small />
              </div>
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
                className="min-h-[88px] w-full resize-none bg-transparent text-base leading-relaxed text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[11px] font-medium tracking-widest uppercase text-white/40">
                Mock AI
              </span>
              <button
                onClick={() => handleCurate(prompt)}
                disabled={loading || !prompt.trim()}
                className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 transition-colors active:bg-white disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
              >
                {loading ? "Curating…" : "Curate"}
              </button>
            </div>
          </div>

          {/* Example prompts — only first ~3 visible, scroll for more */}
          <div className="mt-4">
            <div className="mb-2 text-[10px] uppercase tracking-widest text-white/40">
              Try
            </div>
            <div
              className="relative"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
              }}
            >
              <div
                className="ai-examples flex flex-col gap-1.5 overflow-y-auto pr-1"
                style={{
                  maxHeight: "9.75rem",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {EXAMPLE_PROMPTS.map((p) => (
                  <button
                    key={p}
                    disabled={loading}
                    onClick={() => handleChip(p)}
                    className="shrink-0 text-left rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/75 transition-colors active:bg-white/10 disabled:opacity-50"
                  >
                    <span className="text-white/40">&ldquo;</span>
                    {p}
                    <span className="text-white/40">&rdquo;</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-center text-xs text-rose-300/80">{error}</p>
          )}

          {loading && (
            <p className="mt-6 text-center text-xs text-white/50">
              Reading the room…
            </p>
          )}
        </div>

        <p className="mt-auto pt-10 text-center text-xs text-white/40">
          Or scroll the Feed for a curated mix.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

function SparkleIcon({ small = false }: { small?: boolean }) {
  const size = small ? 14 : 18;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white"
    >
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" />
      <path d="M19 16l.6 1.9L21.5 18.5l-1.9.6L19 16z" />
    </svg>
  );
}
