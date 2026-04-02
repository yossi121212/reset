"use client";

import { useCallback, useEffect, useRef } from "react";

// ── Warm emotional frequencies ─────────────────────────────
// C major scale — gentle, happy, cinematic feel
// Notes played will always come from the CURRENT chord, never random clashing
const NOTE_MAP: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99,
};

// Gentle, emotional chord progression — think Ludovico Einaudi / Ólafur Arnalds
// Each chord has bass + melody notes to pick from
const PROGRESSION = [
  { name: "C",  notes: ["C3", "E4", "G4", "C5", "E5"] },
  { name: "Am", notes: ["A3", "C4", "E4", "A4", "C5"] },
  { name: "F",  notes: ["F3", "A4", "C5", "F4", "A3"] },
  { name: "G",  notes: ["G3", "B4", "D5", "G4", "B3"] },
  { name: "C",  notes: ["C3", "E4", "G4", "C5", "G5"] },
  { name: "F",  notes: ["F3", "C4", "F4", "A4", "C5"] },
  { name: "Dm", notes: ["D3", "F4", "A4", "D4", "F3"] },
  { name: "G",  notes: ["G3", "B3", "D4", "G4", "D5"] },
];

/** Gentle reverb — shorter, brighter than before */
function createReverb(ctx: AudioContext): AudioBuffer {
  const rate = ctx.sampleRate;
  const length = rate * 2.5;
  const buffer = ctx.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
    }
  }
  return buffer;
}

/** Play a single soft "piano-like" note */
function playNote(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  volume = 0.05,
  duration = 4,
) {
  const now = ctx.currentTime;

  // Two slightly detuned sine waves = warmer than one
  for (const detune of [-3, 3]) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = detune;

    const env = ctx.createGain();
    env.gain.value = 0;
    // Soft attack
    env.gain.linearRampToValueAtTime(volume, now + 0.15);
    // Gentle sustain
    env.gain.setTargetAtTime(volume * 0.6, now + 0.15, 1.0);
    // Long fade out
    env.gain.setTargetAtTime(0.0001, now + duration * 0.6, duration * 0.3);

    osc.connect(env);
    env.connect(dest);
    osc.start(now);
    osc.stop(now + duration + 1);
  }
}

/**
 * Hook: returns { fadeIn, fadeOut }.
 * Plays gentle emotional music — soft sine "piano" notes
 * arpeggiated from warm chord progressions with light reverb.
 */
export function useAmbientMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const destRef = useRef<AudioNode | null>(null);
  const bootedRef = useRef(false);
  const activeRef = useRef(false);
  const chordIndexRef = useRef(0);

  const boot = useCallback(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Master volume
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGainRef.current = masterGain;
    masterGain.connect(ctx.destination);

    // Light reverb — mostly dry for clarity
    const convolver = ctx.createConvolver();
    convolver.buffer = createReverb(ctx);

    const dryGain = ctx.createGain();
    dryGain.gain.value = 0.65;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.35;

    dryGain.connect(masterGain);
    convolver.connect(wetGain);
    wetGain.connect(masterGain);

    // Warmth filter — cut harsh highs
    const warmth = ctx.createBiquadFilter();
    warmth.type = "lowpass";
    warmth.frequency.value = 2000;
    warmth.Q.value = 0.5;
    warmth.connect(dryGain);
    warmth.connect(convolver);
    destRef.current = warmth;

    // ── Soft pad: very quiet, sustained chord tone ──
    const padGain = ctx.createGain();
    padGain.gain.value = 0.02;
    padGain.connect(warmth);

    const chord = PROGRESSION[0];
    const padOscs = [chord.notes[0], chord.notes[2]].map((name) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = NOTE_MAP[name];
      osc.connect(padGain);
      osc.start();
      return osc;
    });

    // Shift pad chord every 8 seconds
    const chordInterval = setInterval(() => {
      chordIndexRef.current =
        (chordIndexRef.current + 1) % PROGRESSION.length;
      const ch = PROGRESSION[chordIndexRef.current];
      padOscs[0].frequency.setTargetAtTime(
        NOTE_MAP[ch.notes[0]],
        ctx.currentTime,
        2.5,
      );
      padOscs[1].frequency.setTargetAtTime(
        NOTE_MAP[ch.notes[2]],
        ctx.currentTime,
        2.5,
      );
    }, 8000);

    // ── Arpeggiated melody — pick notes from current chord ──
    const scheduleNote = () => {
      if (activeRef.current && destRef.current) {
        const chord = PROGRESSION[chordIndexRef.current];
        // Pick 1-2 notes from the chord
        const noteCount = Math.random() > 0.6 ? 2 : 1;
        for (let n = 0; n < noteCount; n++) {
          const noteName =
            chord.notes[Math.floor(Math.random() * chord.notes.length)];
          const freq = NOTE_MAP[noteName];
          // Higher notes = quieter for a gentle touch
          const vol = freq > 400 ? 0.03 : 0.045;
          playNote(ctx, destRef.current, freq, vol, 3.5 + Math.random() * 2);
        }
      }
      const next = 2000 + Math.random() * 2500; // every 2-4.5 seconds
      const id = setTimeout(scheduleNote, next);
      intervalsRef.current.push(id);
    };

    const startId = setTimeout(scheduleNote, 600);
    intervalsRef.current.push(startId);
    intervalsRef.current.push(
      chordInterval as unknown as ReturnType<typeof setTimeout>,
    );
  }, []);

  const fadeIn = useCallback(() => {
    boot();
    activeRef.current = true;
    const ctx = ctxRef.current;
    const gain = masterGainRef.current;
    if (!ctx || !gain) return;
    ctx.resume();
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setTargetAtTime(0.22, ctx.currentTime, 1.0);
  }, [boot]);

  const fadeOut = useCallback(() => {
    activeRef.current = false;
    const ctx = ctxRef.current;
    const gain = masterGainRef.current;
    if (!ctx || !gain) return;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.8);
  }, []);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearTimeout);
      ctxRef.current?.close();
    };
  }, []);

  return { fadeIn, fadeOut };
}
