"use client";

import { Drawer } from "@base-ui/react/drawer";
import { ContentItem } from "@/data/seed";
import { getReflection } from "@/data/reflections";

const sheetCopy = {
  en: {
    title: "Reflect on this",
    aiCta: "Talk with AI about this",
    aiSub: "Have a real conversation about this idea — coming soon",
    comingSoon: "Coming soon",
    close: "Close",
  },
  he: {
    title: "התבונן על זה",
    aiCta: "שוחח עם AI על הרעיון",
    aiSub: "שיחה אמתית על הרעיון הזה — בקרוב",
    comingSoon: "בקרוב",
    close: "סגור",
  },
};

export function QuoteReflectionSheet({
  item,
  open,
  onOpenChange,
  lang,
}: {
  item: ContentItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: "en" | "he";
}) {
  const reflection = getReflection(item.id);
  const showHebrew = lang === "he" && !!item.body_he;
  const copy = showHebrew ? sheetCopy.he : sheetCopy.en;

  // Reflection has Hebrew when both the language is set and a Hebrew translation exists.
  const reflectionBody =
    showHebrew && reflection?.body_he ? reflection.body_he : reflection?.body;
  const quoteBody = showHebrew ? item.body_he! : item.body;
  const quoteSource = showHebrew ? item.source_he ?? item.source : item.source;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Drawer.Popup
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88vh] w-full max-w-2xl flex-col rounded-t-3xl bg-white text-zinc-900 shadow-2xl transition-transform duration-300 ease-out data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full"
          dir={showHebrew ? "rtl" : "ltr"}
        >
          {/* Drag handle — visual + functional swipe target */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="h-1.5 w-12 rounded-full bg-zinc-300" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pt-2 pb-6">
            {/* Quote echo at top — subtle */}
            <div className="border-b border-zinc-200 pb-5">
              <Drawer.Description
                className="text-base leading-relaxed text-zinc-700 italic"
                style={
                  showHebrew
                    ? { fontFamily: "var(--font-hebrew), serif" }
                    : undefined
                }
              >
                &ldquo;{quoteBody}&rdquo;
              </Drawer.Description>
              <p
                className="mt-2 text-sm text-zinc-500"
                style={
                  showHebrew
                    ? { fontFamily: "var(--font-hebrew), serif" }
                    : undefined
                }
              >
                — {quoteSource}
              </p>
            </div>

            {/* Reflection title */}
            <Drawer.Title
              className="mt-6 text-xs font-medium tracking-[0.2em] uppercase text-zinc-500"
              style={
                showHebrew
                  ? { fontFamily: "var(--font-hebrew), serif" }
                  : undefined
              }
            >
              {copy.title}
            </Drawer.Title>

            {/* Reflection body — split on \n\n into paragraphs */}
            <div
              className="mt-3 space-y-4 text-lg leading-relaxed font-light text-zinc-800"
              style={
                showHebrew
                  ? { fontFamily: "var(--font-hebrew), serif" }
                  : undefined
              }
            >
              {reflectionBody ? (
                reflectionBody
                  .split("\n\n")
                  .map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p className="text-zinc-500">
                  {showHebrew
                    ? "ההרהור על ציטוט זה עדיין בכתיבה."
                    : "Reflection coming soon for this quote."}
                </p>
              )}
            </div>

            {/* Coming-soon AI CTA — disabled, contextual upsell */}
            <div className="mt-8">
              <button
                type="button"
                disabled
                className="group relative flex w-full cursor-not-allowed items-center gap-4 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-blue-50 via-emerald-50 to-violet-50 px-5 py-4 text-start"
              >
                {/* Sparkle icon — solid AI gradient circle with white sparkle */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm"
                  style={{
                    background:
                      "conic-gradient(from 200deg at 50% 50%, #3b82f6, #22c55e, #a855f7, #fbbf24, #3b82f6)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                    aria-hidden
                  >
                    <path d="M12 3l1.9 5.8 5.8 1.9-5.8 1.9L12 18.4l-1.9-5.8L4.3 10.7l5.8-1.9L12 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div
                    className="flex items-center gap-2 text-base font-medium text-zinc-900"
                    style={
                      showHebrew
                        ? { fontFamily: "var(--font-hebrew), serif" }
                        : undefined
                    }
                  >
                    <span>{copy.aiCta}</span>
                    <span className="rounded-full bg-zinc-900/85 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-white">
                      {copy.comingSoon}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-sm text-zinc-600"
                    style={
                      showHebrew
                        ? { fontFamily: "var(--font-hebrew), serif" }
                        : undefined
                    }
                  >
                    {copy.aiSub}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Close button — top-end (right in LTR, left in RTL) */}
          <Drawer.Close
            aria-label={copy.close}
            className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Drawer.Close>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
