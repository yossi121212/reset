export type ContentType = "quote" | "video";
export type Category = "stoic" | "psalm" | "proverb" | "philosophical" | "motivational";
export type Section = "feed" | "playlist" | "both";

export interface ContentItem {
  id: string;
  type: ContentType;
  body: string;
  source: string;
  category: Category;
  section: Section;
}

export const seedData: ContentItem[] = [
  // ── Local Videos ───────────────────────────────
  {
    id: "51",
    type: "video",
    body: "/videos/vision.mp4",
    source: "Give yourself fully to the vision",
    category: "motivational",
    section: "both",
  },
  {
    id: "52",
    type: "video",
    body: "/videos/sheryl-lee-ralph.mp4",
    source: "Sheryl Lee Ralph — You better love what you see",
    category: "motivational",
    section: "both",
  },
  {
    id: "53",
    type: "video",
    body: "/videos/roger-federer.mp4",
    source: "Roger Federer — 20 Grand Slam legend",
    category: "motivational",
    section: "both",
  },
  {
    id: "54",
    type: "video",
    body: "/videos/ice-skating.mp4",
    source: "Ice Skating — la mia terapia",
    category: "motivational",
    section: "both",
  },
  {
    id: "55",
    type: "video",
    body: "/videos/past-self-proud.mp4",
    source: "Make sure your past self would be proud of who you're becoming",
    category: "motivational",
    section: "both",
  },

  // ── Stoic Quotes ──────────────────────────────
  {
    id: "1",
    type: "quote",
    body: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    source: "Marcus Aurelius",
    category: "stoic",
    section: "feed",
  },
  {
    id: "2",
    type: "quote",
    body: "The happiness of your life depends upon the quality of your thoughts.",
    source: "Marcus Aurelius",
    category: "stoic",
    section: "feed",
  },
  {
    id: "3",
    type: "quote",
    body: "Waste no more time arguing about what a good man should be. Be one.",
    source: "Marcus Aurelius",
    category: "stoic",
    section: "feed",
  },
  {
    id: "4",
    type: "quote",
    body: "It is not that we have a short time to live, but that we waste a great deal of it.",
    source: "Seneca",
    category: "stoic",
    section: "feed",
  },
  {
    id: "5",
    type: "quote",
    body: "We suffer more often in imagination than in reality.",
    source: "Seneca",
    category: "stoic",
    section: "feed",
  },
  {
    id: "6",
    type: "quote",
    body: "Difficulties strengthen the mind, as labor does the body.",
    source: "Seneca",
    category: "stoic",
    section: "feed",
  },
  {
    id: "7",
    type: "quote",
    body: "It's not what happens to you, but how you react to it that matters.",
    source: "Epictetus",
    category: "stoic",
    section: "feed",
  },
  {
    id: "8",
    type: "quote",
    body: "First say to yourself what you would be; and then do what you have to do.",
    source: "Epictetus",
    category: "stoic",
    section: "feed",
  },
  {
    id: "9",
    type: "quote",
    body: "No man is free who is not master of himself.",
    source: "Epictetus",
    category: "stoic",
    section: "feed",
  },
  {
    id: "10",
    type: "quote",
    body: "The soul becomes dyed with the color of its thoughts.",
    source: "Marcus Aurelius",
    category: "stoic",
    section: "feed",
  },
  {
    id: "11",
    type: "quote",
    body: "He who fears death will never do anything worthy of a man who is alive.",
    source: "Seneca",
    category: "stoic",
    section: "feed",
  },
  {
    id: "12",
    type: "quote",
    body: "The best revenge is not to be like your enemy.",
    source: "Marcus Aurelius",
    category: "stoic",
    section: "feed",
  },
  {
    id: "13",
    type: "quote",
    body: "Begin at once to live, and count each separate day as a separate life.",
    source: "Seneca",
    category: "stoic",
    section: "feed",
  },
  {
    id: "14",
    type: "quote",
    body: "When you arise in the morning, think of what a precious privilege it is to be alive — to breathe, to think, to enjoy, to love.",
    source: "Marcus Aurelius",
    category: "stoic",
    section: "feed",
  },
  {
    id: "15",
    type: "quote",
    body: "Man is not worried by real problems so much as by his imagined anxieties about real problems.",
    source: "Epictetus",
    category: "stoic",
    section: "feed",
  },

  // ── Psalms ────────────────────────────────────
  {
    id: "16",
    type: "quote",
    body: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
    source: "Psalm 23:1-3",
    category: "psalm",
    section: "feed",
  },
  {
    id: "17",
    type: "quote",
    body: "The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?",
    source: "Psalm 27:1",
    category: "psalm",
    section: "feed",
  },
  {
    id: "18",
    type: "quote",
    body: "God is our refuge and strength, an ever-present help in trouble.",
    source: "Psalm 46:1",
    category: "psalm",
    section: "feed",
  },
  {
    id: "19",
    type: "quote",
    body: "Be still, and know that I am God.",
    source: "Psalm 46:10",
    category: "psalm",
    section: "feed",
  },
  {
    id: "20",
    type: "quote",
    body: "He who dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
    source: "Psalm 91:1",
    category: "psalm",
    section: "feed",
  },
  {
    id: "21",
    type: "quote",
    body: "I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
    source: "Psalm 121:1-2",
    category: "psalm",
    section: "feed",
  },
  {
    id: "22",
    type: "quote",
    body: "Those who sow in tears will reap with songs of joy.",
    source: "Psalm 126:5",
    category: "psalm",
    section: "feed",
  },

  // ── Proverbs ──────────────────────────────────
  {
    id: "23",
    type: "quote",
    body: "Trust in the Lord with all your heart and lean not on your own understanding.",
    source: "Proverbs 3:5",
    category: "proverb",
    section: "feed",
  },
  {
    id: "24",
    type: "quote",
    body: "Guard your heart above all else, for it determines the course of your life.",
    source: "Proverbs 4:23",
    category: "proverb",
    section: "feed",
  },
  {
    id: "25",
    type: "quote",
    body: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
    source: "Proverbs 15:1",
    category: "proverb",
    section: "feed",
  },
  {
    id: "26",
    type: "quote",
    body: "As iron sharpens iron, so one person sharpens another.",
    source: "Proverbs 27:17",
    category: "proverb",
    section: "feed",
  },

  // ── Philosophical ─────────────────────────────
  {
    id: "27",
    type: "quote",
    body: "When we are no longer able to change a situation, we are challenged to change ourselves.",
    source: "Viktor Frankl",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "28",
    type: "quote",
    body: "Everything can be taken from a man but one thing: the last of the human freedoms — to choose one's attitude in any given set of circumstances.",
    source: "Viktor Frankl",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "29",
    type: "quote",
    body: "He who has a why to live can bear almost any how.",
    source: "Viktor Frankl",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "30",
    type: "quote",
    body: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.",
    source: "Rumi",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "31",
    type: "quote",
    body: "The wound is the place where the Light enters you.",
    source: "Rumi",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "32",
    type: "quote",
    body: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    source: "Rumi",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "33",
    type: "quote",
    body: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    source: "Rumi",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "34",
    type: "quote",
    body: "Your pain is the breaking of the shell that encloses your understanding.",
    source: "Khalil Gibran",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "35",
    type: "quote",
    body: "You talk when you cease to be at peace with your thoughts.",
    source: "Khalil Gibran",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "36",
    type: "quote",
    body: "The deeper that sorrow carves into your being, the more joy you can contain.",
    source: "Khalil Gibran",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "37",
    type: "quote",
    body: "Knowing yourself is the beginning of all wisdom.",
    source: "Aristotle",
    category: "philosophical",
    section: "feed",
  },
  {
    id: "38",
    type: "quote",
    body: "The unexamined life is not worth living.",
    source: "Socrates",
    category: "philosophical",
    section: "feed",
  },

  // ── Motivational ──────────────────────────────
  {
    id: "39",
    type: "quote",
    body: "Don't count the days. Make the days count.",
    source: "Muhammad Ali",
    category: "motivational",
    section: "feed",
  },
  {
    id: "40",
    type: "quote",
    body: "The only person you are destined to become is the person you decide to be.",
    source: "Ralph Waldo Emerson",
    category: "motivational",
    section: "feed",
  },
  {
    id: "41",
    type: "quote",
    body: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    source: "Ralph Waldo Emerson",
    category: "motivational",
    section: "feed",
  },
  {
    id: "42",
    type: "quote",
    body: "Stay hard.",
    source: "David Goggins",
    category: "motivational",
    section: "feed",
  },
  {
    id: "43",
    type: "quote",
    body: "Discipline equals freedom.",
    source: "Jocko Willink",
    category: "motivational",
    section: "feed",
  },

];

// Videos and quotes separated — videos always come first in the feed,
// quotes get shuffled on the client side.
const allFeed = seedData.filter(
  (item) => item.section === "feed" || item.section === "both",
);

export const feedVideos = allFeed.filter((i) => i.type === "video");
export const feedQuotes = allFeed.filter((i) => i.type === "quote");

export const playlistItems = seedData.filter(
  (item) =>
    item.type === "video" &&
    (item.section === "playlist" || item.section === "both"),
);
