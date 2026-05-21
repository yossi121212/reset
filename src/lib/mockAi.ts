import type { ContentItem, Mood, Topic } from "@/data/seed";

/**
 * Mock "AI" matcher.
 * Maps natural-language prompts to the topic/mood tags on each video,
 * scores every video, and returns the best matches.
 *
 * This is intentionally dumb — pure string matching, no LLM — so the
 * feature works offline and gives deterministic, demo-able results.
 */

const TOPIC_KEYWORDS: Record<Topic, string[]> = {
  nature:     ["nature", "outdoor", "outside", "forest", "ocean", "sea", "mountain", "tree", "wild"],
  sports:     ["sport", "sports", "gym", "workout", "run ", "running", "training", "athlete", "fitness"],
  religion:   ["god", "faith", "pray", "prayer", "spirit", "spiritual", "soul", "religion", "religious", "holy"],
  discipline: ["discipline", "habit", "consistent", "consistency", "grind", "push through"],
  love:       ["love", "heart", "partner", "relationship", "romance"],
  career:     ["career", "job", "boss", "success", "business", "hustle"],
  family:     ["family", "kid", "kids", "child", "children", "mom", "dad", "parent", "son", "daughter"],
  space:      ["space", "astronaut", "planet", "stars", "universe", "cosmos"],
};

const MOOD_KEYWORDS: Record<Mood, string[]> = {
  uplifting:  ["uplifting", "uplift", "happy", "joy", "smile", "positive", "good vibes"],
  inspiring:  ["inspiring", "inspire", "motivate", "motivation", "motivated", "dream", "goal", "goals"],
  calm:       ["calm", "relax", "relaxed", "anxious", "anxiety", "stressed", "stress", "breathe", "quiet", "peace", "peaceful", "bed"],
  focus:      ["focus", "focused", "deep work", "study", "concentrate", "clear mind", "flow"],
  hype:       ["hype", "pump", "pumped", "fire up", "energy", "amped", "before the gym", "before gym"],
  reflective: ["reflect", "reflective", "think about", "perspective", "meaning", "purpose"],
  grateful:   ["grateful", "gratitude", "thankful", "thanks", "appreciate", "blessed"],
};

export interface MatchResult {
  item: ContentItem;
  score: number;
  matchedTopics: Topic[];
  matchedMoods: Mood[];
}

/** Detect which topics + moods a free-text prompt is talking about. */
export function detectTags(prompt: string): {
  topics: Topic[];
  moods: Mood[];
} {
  const text = prompt.toLowerCase();

  const topics = (Object.keys(TOPIC_KEYWORDS) as Topic[]).filter((t) =>
    TOPIC_KEYWORDS[t].some((kw) => text.includes(kw)),
  );

  const moods = (Object.keys(MOOD_KEYWORDS) as Mood[]).filter((m) =>
    MOOD_KEYWORDS[m].some((kw) => text.includes(kw)),
  );

  return { topics, moods };
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Score every video against the prompt and return ranked matches.
 * Moods are weighted higher than topics because mood is the dominant
 * signal in this app (users mostly type how they feel).
 *
 * Videos with the same score are shuffled so that running the same
 * prompt twice doesn't always pick the same "first" video — feels
 * more like an AI making a fresh choice.
 */
export function matchVideos(
  prompt: string,
  videos: ContentItem[],
  limit = 6,
): { results: MatchResult[]; detected: ReturnType<typeof detectTags> } {
  const detected = detectTags(prompt);

  // Track the last few "winners" so consecutive prompts never pick
  // the same video first. Persisted to sessionStorage so even a hard
  // reload between prompts doesn't undo the variety logic.
  const RECENT_KEY = "reset:ai:recent";
  let recent: string[] = [];
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(RECENT_KEY);
      if (raw) recent = JSON.parse(raw) as string[];
    } catch {
      recent = [];
    }
  }

  const scored: MatchResult[] = videos
    .map((item) => {
      const itemTopics = item.topics ?? [];
      const itemMoods = item.moods ?? [];

      const matchedTopics = detected.topics.filter((t) =>
        itemTopics.includes(t),
      );
      const matchedMoods = detected.moods.filter((m) =>
        itemMoods.includes(m),
      );

      const score = matchedTopics.length * 2 + matchedMoods.length * 3;
      return { item, score, matchedTopics, matchedMoods };
    })
    .filter((r) => r.score > 0);

  // Group by score, shuffle within each group, then flatten high → low.
  // Within each tier, push items that were recently first to the back
  // so each new prompt picks a fresh winner.
  const byScore = new Map<number, MatchResult[]>();
  for (const r of scored) {
    const bucket = byScore.get(r.score) ?? [];
    bucket.push(r);
    byScore.set(r.score, bucket);
  }
  const sortedScores = [...byScore.keys()].sort((a, b) => b - a);
  const ordered: MatchResult[] = [];
  for (const s of sortedScores) {
    const shuffled = shuffle(byScore.get(s)!);
    const fresh = shuffled.filter((r) => !recent.includes(r.item.id));
    const stale = shuffled.filter((r) => recent.includes(r.item.id));
    ordered.push(...fresh, ...stale);
  }

  const results = ordered.slice(0, limit);
  if (results.length > 0 && typeof window !== "undefined") {
    // Remember the last 3 winners to avoid immediate repeats.
    const nextRecent = [
      results[0].item.id,
      ...recent.filter((id) => id !== results[0].item.id),
    ].slice(0, 3);
    try {
      sessionStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent));
    } catch {
      // ignore quota errors
    }
  }

  return { results, detected };
}
