/**
 * Singleton audio manager for the quote feed.
 *
 * Why a singleton? iOS Safari unlocks audio playback **per HTMLAudioElement**,
 * not per page. If each QuoteCard owns its own <audio>, every new card the user
 * scrolls to is locked again — they'd have to tap once per card.
 *
 * TikTok / Instagram solve this with one shared audio element that lives for
 * the entire session. The first user gesture (touchstart anywhere) primes that
 * element exactly once; from then on, swapping `src` is enough to play any new
 * track without another tap.
 *
 * Usage:
 *   setActiveTrack("/audio/foo.mp3")  → starts (or swaps to) that track
 *   clearActiveTrack()                → fades out and pauses
 */

const TARGET_VOLUME = 0.32;
const FADE_MS = 900;

let audio: HTMLAudioElement | null = null;
let currentTrack: string | null = null;
let pendingTrack: string | null = null;
let unlocked = false;
let primeRegistered = false;
let fadeInterval: ReturnType<typeof setInterval> | null = null;

function ensureAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (audio) return audio;
  audio = new Audio();
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0;
  // iOS won't honor `playsinline` on audio (that's a video attr), but setting
  // crossOrigin to anonymous avoids issues if we ever serve audio from a CDN.
  return audio;
}

function clearFade() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
}

function fadeTo(target: number, onDone?: () => void) {
  const a = audio;
  if (!a) return;
  clearFade();
  const start = a.volume;
  const t0 = performance.now();
  fadeInterval = setInterval(() => {
    const t = Math.min((performance.now() - t0) / FADE_MS, 1);
    a.volume = start + (target - start) * t;
    if (t === 1) {
      clearFade();
      onDone?.();
    }
  }, 16);
}

/**
 * Register a one-time gesture listener that "unlocks" the audio element by
 * calling play() inside a real user-activation event handler. After this
 * fires once, the element can be played freely for the rest of the session.
 */
function registerPrime() {
  if (primeRegistered || typeof window === "undefined") return;
  primeRegistered = true;

  const prime = () => {
    document.removeEventListener("touchstart", prime);
    document.removeEventListener("pointerdown", prime);
    document.removeEventListener("click", prime);
    if (unlocked) return;

    const a = ensureAudio();
    if (!a) return;

    // The track that should be playing right now (set by setActiveTrack).
    // If a card is in view but autoplay was blocked, this is set.
    const trackToPlay = pendingTrack ?? currentTrack;
    if (trackToPlay && a.src !== absoluteUrl(trackToPlay)) {
      a.src = trackToPlay;
      currentTrack = trackToPlay;
    }

    // Synchronous play() inside the gesture handler — this is the unlock.
    const p = a.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        unlocked = true;
        // If, by the time we got here, the active card has been cleared
        // (e.g. user scrolled to a video), pause immediately. The element
        // stays unlocked.
        if (!pendingTrack && !currentTrack) {
          a.pause();
        } else {
          // Restart the fade-in now that audio is actually audible.
          a.volume = 0;
          fadeTo(TARGET_VOLUME);
        }
      }).catch(() => {
        // Failed even with gesture — re-register and try again on next tap.
        primeRegistered = false;
        registerPrime();
      });
    } else {
      unlocked = true;
    }
  };

  // Listen for whichever gesture comes first. `touchstart` catches the
  // beginning of a swipe (before scroll motion), so the very first swipe
  // toward a new card unlocks audio — no dedicated tap required.
  document.addEventListener("touchstart", prime, { once: true, passive: true });
  document.addEventListener("pointerdown", prime, { once: true });
  document.addEventListener("click", prime, { once: true });
}

/** Resolve a relative URL the same way the browser does, so we can compare. */
function absoluteUrl(src: string): string {
  if (typeof window === "undefined") return src;
  return new URL(src, window.location.href).href;
}

export function setActiveTrack(track: string) {
  const a = ensureAudio();
  if (!a) return;
  registerPrime();

  pendingTrack = track;

  // If the same track is already loaded, just (re)start playback + fade.
  if (currentTrack !== track) {
    currentTrack = track;
    a.src = track;
  }

  if (unlocked) {
    a.volume = 0;
    a.play().catch(() => {});
    fadeTo(TARGET_VOLUME);
  }
  // If not yet unlocked: do nothing here. The prime() handler will pick up
  // `pendingTrack` on the user's next gesture.
}

export function clearActiveTrack() {
  pendingTrack = null;
  const a = audio;
  if (!a) return;
  if (unlocked) {
    fadeTo(0, () => a.pause());
  }
  // currentTrack stays set so we don't reload the same src on quick re-entry.
}
