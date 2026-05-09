/**
 * Per-quote motivational reflections — the content shown when a user taps
 * "Learn more" on a quote card.
 *
 * Tone: not academic, not preachy. A friend pumping you up — concrete,
 * present-tense, ending with a small charge or shift in posture. Each
 * reflection is a few short paragraphs, mobile-readable in under a minute.
 *
 * Eventually this map will be replaced by a live LLM call. The shape stays
 * the same so the UI doesn't need to change.
 */

export interface Reflection {
  body: string;
  body_he?: string;
}

export const reflections: Record<string, Reflection> = {
  // ── Stoic ─────────────────────────────────────
  "1": {
    body:
      "The traffic, the inbox, the rude comment — none of it gets to write your inner story unless you hand it the pen.\n\nNext time something small tries to hijack your mood, pause for one breath and notice: this only owns me if I let it. Reclaim the wheel. Your strength isn't in fixing the world — it's in choosing what gets to live in your head.",
    body_he:
      "הפקקים, התיבת מייל, ההערה הקטנה והמעצבנת — שום דבר מזה לא כותב את הסיפור הפנימי שלך, אלא אם נתת לו את העט.\n\nבפעם הבאה שמשהו קטן מנסה לחטוף לך את מצב הרוח — עצור, נשום פעם אחת, והבחן: זה משתלט עליי רק אם הרשיתי לו. קח את ההגה בחזרה. הכוח שלך אינו בלתקן את העולם — אלא בלבחור מה יקבל מקום אצלך בראש.",
  },
  "2": {
    body:
      "Your inner monologue is a roommate you can't escape. What is it whispering all day?\n\nWatch the next thought that passes through. If it's harsh, swap it for one that's true and kind. Your mind is a garden — the harvest grows where you choose to water. Today, water on purpose.",
    body_he:
      "המונולוג הפנימי שלך הוא שותף לדירה שאי אפשר לברוח ממנו. מה הוא לוחש לך כל היום?\n\nשים לב למחשבה הבאה שתעבור. אם היא קשוחה, החלף אותה בכזאת שהיא גם נכונה וגם רכה. המחשבה שלך היא גינה — היבול גדל היכן שתבחר להשקות. היום, תשקה במכוון.",
  },
  "3": {
    body:
      "Stop drafting the mission statement of who you'll become \"someday.\"\n\nThe next small kindness, the next promise kept, the next lazy excuse refused — that *is* the becoming. You don't need a manifesto. You need a move. Make it now.",
    body_he:
      "תפסיק לנסח את ההצהרה הגדולה על מי שתהיה \"יום אחד\".\n\nהחסד הקטן הבא, ההבטחה הבאה שתשמור, התירוץ העצלני הבא שתסרב לו — *זאת* ההתהוות עצמה. אתה לא צריך מניפסט. אתה צריך תזוזה. עכשיו.",
  },
  "4": {
    body:
      "Look honestly at where the last hour went. Most of life leaks out through tabs we didn't mean to open.\n\nThe clock isn't the thief — attention is. Reclaim one hour today and pour it into something you'll be proud of tomorrow. That's how a life gets long.",
    body_he:
      "תסתכל באמת על איפה השעה האחרונה הלכה. רוב החיים זולגים החוצה דרך טאבים שלא התכוונו לפתוח.\n\nהשעון אינו הגנב — תשומת הלב היא. החזר לעצמך שעה אחת היום, ושפוך אותה לתוך משהו שתהיה גאה בו מחר. ככה חיים נעשים ארוכים.",
  },
  "5": {
    body:
      "Ninety percent of your dread is a movie playing in your head — and you're paying full price for the ticket.\n\nName the scenario keeping you up. Now ask: has this actually happened? Walk into the next thing you're avoiding. Almost always, the real version is smaller, kinder, more workable than the rehearsed one.",
    body_he:
      "תשעים אחוז מהדאגה שלך היא סרט שמתנגן לך בראש — ואתה משלם מחיר מלא על הכרטיס.\n\nתן שם לתסריט שמדיר ממך שינה. עכשיו שאל: זה באמת קרה? היכנס אל הדבר הבא שאתה נמנע ממנו. כמעט תמיד, הגרסה האמתית קטנה יותר, נדיבה יותר, ופתירה יותר מהחזרות שערכת בראש.",
  },
  "6": {
    body:
      "The thing breaking you right now is also building you. No one ever got tougher by avoiding heavy.\n\nDon't ask life to go easier on you — ask yourself to grow stronger. The struggle isn't a detour from the path; it *is* the path.",
    body_he:
      "הדבר ששובר אותך עכשיו הוא גם הדבר שבונה אותך. אף אחד לא נעשה חזק יותר על ידי בריחה ממשקל.\n\nאל תבקש מהחיים להקל עליך — בקש מעצמך לגדול. המאבק אינו עקיפה מן הדרך; הוא *הדרך עצמה*.",
  },
  "7": {
    body:
      "Two people get cut off in traffic. One screams for ten minutes. The other smiles, lets it go, has a great morning. Same event — two completely different lives.\n\nThe gap between trigger and reaction is the most powerful real estate you own. Move in. Furnish it. Defend it.",
    body_he:
      "שני אנשים נחתכים בכביש. אחד צועק עשר דקות. השני מחייך, משחרר, ויש לו בוקר נהדר. אותו אירוע — שני חיים שונים לחלוטין.\n\nהפער בין הטריגר לתגובה הוא הנדל\"ן הכי יקר שיש לך. עבור לגור שם. תרהט אותו. תשמור עליו.",
  },
  "8": {
    body:
      "Identity comes before action. Don't ask \"can I do this?\" — ask \"who am I becoming?\"\n\nThen do what that person would do, even if you don't yet feel like them. Acting *as* lights the path of *being*. Choose your future self today, in one small act.",
    body_he:
      "הזהות קודמת למעשה. אל תשאל \"האם אני מסוגל לזה?\" — שאל \"מי אני נעשה?\"\n\nואז תעשה את מה שהאדם הזה היה עושה, גם אם אתה עדיין לא מרגיש כמוהו. לפעול *כאילו* — מאיר את הדרך אל ה*להיות*. בחר את עצמך העתידי היום, בפעולה אחת קטנה.",
  },
  "9": {
    body:
      "Real freedom isn't escaping outside chains — it's not being yanked around by your own urges, moods, and old wounds.\n\nNext time a feeling barks orders, take a breath and ask: am I obeying, or am I choosing? Your power lives in that pause.",
    body_he:
      "החופש האמתי אינו בריחה משלשלאות חיצוניות — הוא לא להיות נמשך על ידי הדחפים, מצבי הרוח, והפצעים הישנים שלך עצמך.\n\nבפעם הבאה שרגש נובח עליך פקודות, נשום ושאל: אני מציית, או בוחר? הכוח שלך חי בתוך הרגע הזה של עצירה.",
  },
  "10": {
    body:
      "What you keep watching, scrolling, replaying — that's the dye soaking into who you are.\n\nSo choose the colors. Feed your mind beauty, and you start radiating it. Feed it bitterness, and that's what gets stamped on every interaction. You are what you keep thinking. Curate hard.",
    body_he:
      "מה שאתה ממשיך לצפות בו, לגלול, להריץ שוב — זאת הצבע הנספג בתוכך.\n\nאז תבחר את הצבעים. הזן את המחשבה שלך ביופי, ותתחיל לקרון אותו. הזן אותה במרירות, וזה מה שיוטבע על כל אינטראקציה. אתה הוא מה שאתה ממשיך לחשוב. תאצור בקפדנות.",
  },
  "11": {
    body:
      "Most of the things you don't do, you skip out of fear of small deaths — embarrassment, rejection, looking foolish.\n\nToday, do one thing you'd regret not trying. Let the small fears burn off in the heat of action. A life fully lived is the only real answer to the fear of losing it.",
    body_he:
      "רוב הדברים שאתה לא עושה, אתה מדלג עליהם מפחד ממיתות קטנות — מבושה, מדחייה, מלהיראות טיפש.\n\nהיום, תעשה דבר אחד שאתה תתחרט שלא ניסית. תן לפחדים הקטנים להישרף בחום הפעולה. חיים שנחיים בשלמות הם התשובה האמתית היחידה לפחד מאיבודם.",
  },
  "12": {
    body:
      "Someone hurt you. The temptation is to mirror it back. Don't.\n\nOutgrow them. Living well — kind, free, building — is the only revenge that actually changes the score. Every time you choose grace over grudge, you take your power back.",
    body_he:
      "מישהו פגע בך. הפיתוי הוא להחזיר באותו מטבע. אל תיכנע לו.\n\nתגדל מעבר לו. לחיות טוב — להיות חופשי, אדיב, בונה — זאת הנקמה היחידה שבאמת משנה את התוצאה. בכל פעם שתבחר חסד על פני טינה, אתה לוקח חזרה את הכוח שלך.",
  },
  "13": {
    body:
      "Treat tomorrow like a fresh existence, not a continuation of an exhausted today. Drop yesterday's weight at the door.\n\nTonight, write one thing that would make tomorrow a beautiful little life of its own. Then do it. That's how lives get built — one small life at a time.",
    body_he:
      "התייחס למחר כקיום חדש, לא כהמשך של היום העייף. הנח את משא האתמול בכניסה.\n\nהלילה, רשום דבר אחד שיהפוך את מחר לחיים קטנים ויפים בפני עצמם. ואז עשה אותו. ככה חיים נבנים — חיים קטנים אחרי חיים קטנים.",
  },
  "14": {
    body:
      "Before you reach for your phone tomorrow, take five seconds to feel your own breath.\n\nThat alone is something most of human history would have called a miracle. Start the day in awe, not anxiety. The mood you wake into tints everything that follows.",
    body_he:
      "לפני שתשלח יד אל הטלפון מחר, קח חמש שניות להרגיש את הנשימה שלך.\n\nזה לבדו דבר שרוב ההיסטוריה האנושית הייתה מכנה נס. תתחיל את היום ביראה, לא בחרדה. מצב הרוח שאתה קם אליו צובע את כל מה שיבוא אחריו.",
  },
  "15": {
    body:
      "Write down the thing you're worried about. Now write what would actually have to happen for the worst version to occur.\n\nThe story shrinks under daylight. Real problems are workable — imagined ones are infinite. Drag the worry from your head to the page, and watch it lose its teeth.",
    body_he:
      "רשום את הדבר שמדאיג אותך. עכשיו רשום מה בדיוק היה צריך לקרות בשביל הגרסה הכי גרועה להתממש.\n\nהסיפור מתכווץ באור היום. בעיות אמיתיות אפשר לפתור — דמיוניות הן אינסופיות. תגרור את הדאגה מהראש אל הנייר, ותראה איך היא מאבדת את השיניים.",
  },

  // ── Psalms ────────────────────────────────────
  "16": {
    body:
      "You are not the only one steering. There is a current beneath your effort that has carried you through more than you remember.\n\nWhen the planning mind gets loud, lay down for a moment in the green pasture of trust. The stillness isn't weakness — it's where you get refilled.",
    body_he:
      "אתה לא היחיד שמוביל. יש זרם מתחת למאמץ שלך שנשא אותך דרך הרבה יותר ממה שאתה זוכר.\n\nכשהראש המתכנן מתחיל לרעוש, שכב לרגע בנאות הדשא של הביטחון. השקט הזה איננו חולשה — הוא המקום שבו אתה מתמלא מחדש.",
  },
  "17": {
    body:
      "Fear shrinks in the presence of something bigger than itself.\n\nWhatever scared you this morning — picture the size of what holds you up. The thing you're dreading is not the final word. Walk forward like someone who has backup.",
    body_he:
      "הפחד מתכווץ בנוכחות של משהו גדול ממנו.\n\nמה שהפחיד אותך הבוקר — דמיין את הגודל של מה שנושא אותך. הדבר שאתה חושש ממנו אינו המילה האחרונה. צעד קדימה כמו מי שיש לו גיבוי.",
  },
  "18": {
    body:
      "On the worst days, you don't need a plan — you need a shelter.\n\nBuild one moment of stillness inside the storm: a breath, a prayer, a porch. Strength isn't always charging forward; sometimes it's standing inside what already holds you, until you remember you can stand again.",
    body_he:
      "בימים הקשים, אתה לא צריך תוכנית — אתה צריך מחסה.\n\nתבנה רגע אחד של שקט בתוך הסערה: נשימה, תפילה, מרפסת. כוח אינו תמיד התקדמות קדימה; לפעמים הוא לעמוד בתוך מה שכבר נושא אותך, עד שתיזכר שאתה יכול לעמוד שוב לבד.",
  },
  "19": {
    body:
      "Stop. Just stop.\n\nMost of the noise inside your head is you trying to be the manager of the whole world. Drop the clipboard for thirty seconds. Stillness is not laziness — it's the most radical act in a culture addicted to motion. Hear what's underneath.",
    body_he:
      "תפסיק. פשוט תפסיק.\n\nרוב הרעש בתוך הראש שלך הוא אתה מנסה להיות המנהל של העולם כולו. הנח את הלוח לשלושים שניות. שקט אינו עצלות — הוא המעשה הכי רדיקלי בתרבות ממכרת תנועה. תשמע מה יש מתחת.",
  },
  "20": {
    body:
      "Whatever you keep returning to in your mind is your real home. Make it a good one.\n\nLive inside gratitude, trust, possibility — not bitterness, fear, replay. Where you \"dwell\" is a choice you make a thousand times a day. Choose the shelter, not the storm.",
    body_he:
      "מה שאתה ממשיך לחזור אליו בראש שלך — זה הבית האמתי שלך. תהפוך אותו לבית טוב.\n\nגור בתוך הכרת תודה, אמון, אפשרות — לא בתוך מרירות, פחד, ושחזור. \"היכן שאתה שוכן\" היא בחירה שאתה עושה אלפי פעמים ביום. בחר את המחסה, לא את הסערה.",
  },
  "21": {
    body:
      "Lift your gaze. When everything feels too close — the screen, the ceiling, the worry — physically look up.\n\nHelp rarely comes from where we've been staring. Open your peripheral vision to people, signs, gifts you've been missing. The cavalry might already be on its way.",
    body_he:
      "תרים את העיניים. כשהכול מרגיש קרוב מדי — המסך, התקרה, הדאגה — תסתכל פיזית למעלה.\n\nעזרה כמעט אף פעם לא מגיעה מהמקום שאליו בהינו. תפתח את ראיית ההיקף שלך לאנשים, לסימנים, למתנות שהחמצת. הסיוע אולי כבר בדרך.",
  },
  "22": {
    body:
      "The hardest seasons are not wasted — they're being planted.\n\nThe tears you're shedding now are the irrigation for a harvest you can't yet see. Don't quit during the planting. Joy isn't denied; it's just delayed. Keep watering.",
    body_he:
      "העונות הקשות אינן מבוזבזות — הן עונות זריעה.\n\nהדמעות שאתה מזיל עכשיו הן ההשקיה ליבול שאתה עדיין לא רואה. אל תפרוש בשעת הזריעה. השמחה אינה נמנעת ממך; היא רק מתעכבת. תמשיך להשקות.",
  },
  "44": {
    body:
      "Whatever is breaking you tonight will not be the final scene. Mornings come.\n\nThe darkest hour really is just before dawn — not as a cliché, but as a fact your nervous system has forgotten and needs reminding. Hang on. The light is on its way.",
    body_he:
      "מה ששובר אותך הלילה לא יהיה הסצנה האחרונה. בקרים תמיד באים.\n\nהשעה הכי חשוכה באמת באה ממש לפני השחר — לא כקלישאה, אלא כעובדה שמערכת העצבים שלך שכחה והיא זקוקה לתזכורת. תחזיק מעמד. האור בדרך.",
  },
  "45": {
    body:
      "You don't have to clean yourself up before you can begin again.\n\nRenewal is available to anyone willing to ask. Take five minutes today to mentally set down what you've been carrying — guilt, regret, that thing you said. You can start clean from the next breath.",
    body_he:
      "אתה לא חייב לסדר את עצמך לפני שתוכל להתחיל שוב.\n\nההתחדשות זמינה לכל מי שמוכן לבקש. קח חמש דקות היום להניח בראש את מה שנשאת — אשמה, חרטה, אותו דבר שאמרת. אתה יכול להתחיל נקי מהנשימה הבאה.",
  },
  "46": {
    body:
      "Pick your North Star, then keep glancing up at it.\n\nWhen you keep something larger always in your line of sight, you stop getting knocked over by every passing wind. What's your \"always before me\"? Put it where you'll see it. Every. Day.",
    body_he:
      "בחר את כוכב הצפון שלך, ותסתכל אליו כל הזמן.\n\nכשמשהו גדול נמצא תמיד בקו הראייה שלך, אתה מפסיק להיות מופל על ידי כל רוח חולפת. מה ה\"לנגדי תמיד\" שלך? שים אותו במקום שתראה אותו. כל. יום.",
  },
  "47": {
    body:
      "If you're crushed right now, you are not alone — and not far from being held.\n\nThe very thing you think disqualifies you (the breaking, the falling apart) is the door that lets the light in. You don't have to be okay to be loved. Let the brokenness invite, not isolate.",
    body_he:
      "אם אתה מרוסק עכשיו, אתה לא לבד — ולא רחוק מלהיות מוחזק.\n\nאותו הדבר שאתה חושב שפוסל אותך (השבירה, ההתפרקות) הוא הדלת שדרכה האור נכנס. אתה לא חייב להיות בסדר כדי להיות אהוב. תן לשבירה להזמין, לא לבודד.",
  },
  "48": {
    body:
      "The fastest way is not always the right way. Some prayers are answered in the long, slow simmer — not the microwave.\n\nTrain yourself to wait without panicking. Stillness in the middle of unanswered questions is a quiet superpower. Most people never learn it.",
    body_he:
      "הדרך הכי מהירה אינה תמיד הדרך הנכונה. יש תפילות שנענות בבישול האיטי הארוך — לא במיקרוגל.\n\nתאמן את עצמך לחכות בלי להיכנס לפאניקה. שקט בלב שאלות לא פתורות הוא כוח-על שקט. רוב האנשים אף פעם לא לומדים אותו.",
  },

  // ── Proverbs ──────────────────────────────────
  "23": {
    body:
      "Your understanding is a small flashlight in a wide cave. Useful, but not enough.\n\nWhen the analysis loop gets stuck, lean off it — onto something bigger. Some doors only open when you stop trying to figure out the lock and just knock.",
    body_he:
      "הבינה שלך היא פנס קטן במערה ענקית. מועילה, אבל לא מספיקה.\n\nכשלולאת הניתוח נתקעת, היישען החוצה — על משהו גדול יותר. יש דלתות שנפתחות רק כשמפסיקים לנסות לפענח את המנעול ופשוט דופקים.",
  },
  "24": {
    body:
      "Your heart is the wellspring of everything you do. So watch what you let drink from it — the news you absorb, the people you orbit, the stories you tell yourself.\n\nA guarded heart isn't a closed one — it's one curated with care. Protect the source.",
    body_he:
      "הלב שלך הוא המעיין של כל מה שאתה עושה. אז תבחן מי אתה נותן לו לשתות ממנו — החדשות שאתה סופג, האנשים שאתה מקיף סביבם, הסיפורים שאתה מספר לעצמך.\n\nלב שמור אינו לב סגור — הוא לב מאוצרר בתשומת לב. שמור על המקור.",
  },
  "25": {
    body:
      "The next time someone snaps at you, try the soft response. It feels weak — it's actually a power move.\n\nHardness escalates. Softness redirects. You're not losing the fight; you're refusing to be drawn into it. Watch how often it ends the storm before it forms.",
    body_he:
      "בפעם הבאה שמישהו מתפרץ עליך, נסה את המענה הרך. זה מרגיש חלש — זה בעצם מהלך של עוצמה.\n\nקשיחות מסלימה. רוך מסיט. אתה לא מפסיד את הקרב; אתה מסרב להיכנס אליו. שים לב כמה פעמים זה מסיים את הסערה לפני שהיא בכלל מתחילה.",
  },
  "26": {
    body:
      "You become the average of who you spend time with. Not in a vague way — in your actual habits, language, ambition.\n\nAudit your circle. Are you being sharpened, or sanded down? One real friend who challenges you beats ten who only flatter.",
    body_he:
      "אתה הופך לממוצע של מי שאתה מבלה איתו. לא בצורה מעורפלת — בהרגלים, בשפה, בשאיפות שלך ממש.\n\nבחן את החוג שלך. אתה מתחדד, או נשחק? חבר אחד אמתי שמאתגר אותך עדיף על עשרה שרק מחמיאים.",
  },
  "49": {
    body:
      "If this isn't your season for it, that doesn't mean it's never.\n\nLet go of the demand that everything happen now. Some things are ripening. Some things are ending so others can begin. Honor the season you're actually in. Spring will come.",
    body_he:
      "אם זאת לא העונה שלך לזה — זה לא אומר שאף פעם.\n\nשחרר את הדרישה שהכול יקרה עכשיו. יש דברים שעדיין מבשילים. יש דברים שנגמרים כדי שאחרים יוכלו להתחיל. כבד את העונה שאתה באמת נמצא בה. האביב יבוא.",
  },
  "50": {
    body:
      "The thing you're going through — heartbreak, doubt, big change — humans have been moving through this for thousands of years.\n\nYou are not uniquely cursed. You're part of a long, ancient procession. There is comfort in not being alone in time.",
    body_he:
      "הדבר שאתה עובר — שברון לב, ספק, שינוי גדול — בני אדם עוברים אותו אלפי שנים.\n\nאתה לא מקולל באופן ייחודי. אתה חלק מתהלוכה ארוכה ועתיקה. יש נחמה בלא להיות לבד בזמן.",
  },
  "58": {
    body:
      "Conquering an empire is impressive. Not snapping at your kid when you're tired is more impressive.\n\nThe biggest fight of the day is usually with the version of yourself who wants to react. Win that one. The rest is downstream.",
    body_he:
      "לכבוש אימפריה זה מרשים. לא להתפרץ על הילד שלך כשאתה עייף — זה מרשים יותר.\n\nהקרב הגדול של היום הוא בדרך כלל מול הגרסה של עצמך שרוצה להגיב. תנצח שם. השאר זורם אחרי זה.",
  },
  "59": {
    body:
      "Plan boldly. Hold the plan loosely.\n\nThe path you're actually on is often the path you didn't draw on the map. When detours come, don't curse them — get curious. They might be the actual route.",
    body_he:
      "תכנן באומץ. החזק את התוכנית בידיים רכות.\n\nהשביל שאתה באמת בו הוא לעיתים קרובות שביל שלא ציירת על המפה. כשמגיעות עקיפות, אל תקלל אותן — תהיה סקרן. אולי הן המסלול האמתי.",
  },
  "60": {
    body:
      "Falling isn't disqualifying — it's part of the resume.\n\nThe only thing that defines a strong life is how many times you got back up. You don't need a perfect record; you need a stubborn one. Fall, learn, rise. Repeat.",
    body_he:
      "ליפול אינו פוסל — זה חלק מקורות החיים.\n\nהדבר היחיד שמגדיר חיים חזקים הוא כמה פעמים קמת שוב. לא צריך תיק מושלם; צריך תיק עקשן. תיפול, תלמד, תקום. שוב ושוב.",
  },
  "61": {
    body:
      "What people say when you leave the room is the most honest mirror.\n\nBuild a name brick by brick — through small honesties, kept promises, the way you treat people who can't help you. Reputation isn't bragged into existence. It's earned in private, every day.",
    body_he:
      "מה שאנשים אומרים אחרי שיצאת מהחדר הוא המראה הכי כנה שיש.\n\nבנה שם לבנה אחר לבנה — דרך אמתות קטנות, הבטחות שנשמרו, הדרך שבה אתה מתייחס לאנשים שלא יכולים לעזור לך. מוניטין לא נבנה בהתפארות. הוא נצבר בפרטיות, כל יום.",
  },

  // ── Philosophical ─────────────────────────────
  "27": {
    body:
      "The thing you can't fix is asking you to grow.\n\nStop bashing the wall and start asking what kind of person could move differently inside it. The situation might be stuck — you don't have to be. Growth always finds a way through.",
    body_he:
      "הדבר שאתה לא יכול לתקן מבקש ממך לגדול.\n\nתפסיק לחבוט בקיר, ותתחיל לשאול איזה אדם יוכל לזוז אחרת בתוכו. המצב אולי תקוע — אתה לא חייב להיות. צמיחה תמיד מוצאת דרך לעבור.",
  },
  "28": {
    body:
      "No matter what gets stripped away — circumstances, comforts, even hope itself — the choice of attitude is yours, untouchable.\n\nThis isn't a sweet idea. It's the deepest truth of being human. Today, claim it. Choose your stance.",
    body_he:
      "לא משנה מה ייקח ממך — נסיבות, נוחות, אפילו תקווה — בחירת העמדה היא שלך, חסינה.\n\nזה לא רעיון מתוק. זאת האמת הכי עמוקה של היות אדם. היום, אחז בה. בחר את העמידה שלך.",
  },
  "29": {
    body:
      "Suffering with no meaning crushes. Suffering with a why becomes fuel.\n\nWhat's your *why*? Write it down. Tape it where you'll see it. When the how gets brutal, the why is the rope you climb.",
    body_he:
      "סבל בלי משמעות מוחץ. סבל עם \"למה\" הופך לדלק.\n\nמהו ה*למה* שלך? רשום אותו. הדבק אותו במקום שתראה אותו. כשה\"איך\" נעשה אכזרי, ה\"למה\" הוא החבל שעליו אתה מטפס.",
  },
  "30": {
    body:
      "Most of your conflicts dissolve when you stop scoring them.\n\nThere's a place beyond who's right and who's wrong — it's called connection. Try meeting someone there today. Drop the scoreboard. Just sit in the field together and notice what's left.",
    body_he:
      "רוב הקונפליקטים שלך מתמוססים ברגע שתפסיק לתת להם נקודות.\n\nיש מקום מעבר למי צודק ומי טועה — הוא נקרא חיבור. נסה לפגוש שם מישהו היום. הנח את לוח התוצאות. שב איתו בשדה, ותראה מה נשאר.",
  },
  "31": {
    body:
      "The thing that broke you is also what's cracking you open to receive.\n\nDon't waste a wound by sealing it shut too fast. Let the light in. The most luminous people you know didn't escape pain — they let it transform them.",
    body_he:
      "הדבר ששבר אותך הוא גם הדבר שפותח אותך לקבל.\n\nאל תבזבז פצע על ידי סגירה מהירה. תן לאור להיכנס. האנשים הכי מאירים שאתה מכיר לא ברחו מכאב — הם הרשו לו לשנות אותם.",
  },
  "32": {
    body:
      "Change starts in the only territory you actually control: you.\n\nThe world will resist you forever; your own habits will yield with patience. Stop posting about how things should be. Become it. The world updates around someone who has changed themselves.",
    body_he:
      "השינוי מתחיל בטריטוריה היחידה שיש לך עליה שליטה אמתית: אתה.\n\nהעולם יתנגד לך לנצח; ההרגלים שלך עצמך יתמסרו בסבלנות. תפסיק לפרסם איך צריך להיות. תהפוך לזה. העולם מתעדכן סביב מי ששינה את עצמו.",
  },
  "33": {
    body:
      "Love isn't missing — your access to it is.\n\nThe walls you built to protect yourself are now blocking the very thing you crave. What's one wall you could lower this week? Vulnerability is not weakness. It's the door.",
    body_he:
      "אהבה לא חסרה — הגישה שלך אליה חסרה.\n\nהקירות שבנית כדי להגן על עצמך חוסמים עכשיו את עצם הדבר שאתה משתוקק אליו. איזה קיר אחד תוכל להוריד השבוע? פגיעות אינה חולשה. היא הדלת.",
  },
  "34": {
    body:
      "Every season of pain is also a season of expansion.\n\nThe version of you who emerges will see things the old you couldn't. Don't curse the breaking — it's the cocoon coming apart. Something in you is becoming.",
    body_he:
      "כל עונה של כאב היא גם עונה של התרחבות.\n\nהגרסה שלך שתצא בסוף תראה דברים שהישן לא יכול היה. אל תקלל את השבירה — זה הגולם שמתפרק. משהו בתוכך הופך להיות.",
  },
  "35": {
    body:
      "Notice today how often you fill silence with chatter. Most of it is anxiety wearing a costume.\n\nTry a five-minute conversation with no need to fill the gaps. The peace you're chasing might just be the peace of not needing to speak.",
    body_he:
      "שים לב היום כמה פעמים אתה ממלא שתיקה בפטפוט. רוב זה חרדה בתחפושת.\n\nנסה שיחה של חמש דקות בלי צורך למלא את הרווחים. השלווה שאתה רודף אחריה אולי היא בדיוק השלווה של לא להיות חייב לדבר.",
  },
  "36": {
    body:
      "Joy and sorrow aren't enemies — they share the same vessel.\n\nThe depth one carves becomes the volume the other can fill. Don't run from sadness; let it shape you. The people who feel deepest joy have usually been deepest into the dark.",
    body_he:
      "שמחה ועצב אינם אויבים — הם חולקים את אותו הכלי.\n\nהעומק שאחד חופר הופך לנפח שהשני יוכל למלא. אל תברח מהעצב; תן לו לעצב אותך. האנשים שחווים את השמחה הכי עמוקה — בדרך כלל עברו את החושך הכי עמוק.",
  },
  "37": {
    body:
      "All advice is useless until you know who's receiving it.\n\nSpend twenty minutes today on one honest question: what do I actually want? Most people skip this for forty years. Don't be most people.",
    body_he:
      "כל עצה היא חסרת ערך עד שאתה יודע מי מקבל אותה.\n\nהקדש עשרים דקות היום לשאלה כנה אחת: מה אני באמת רוצה? רוב האנשים מדלגים על זה ארבעים שנה. אל תהיה רוב האנשים.",
  },
  "38": {
    body:
      "Autopilot is the enemy.\n\nOnce a week, ask yourself: where am I going, and is this the direction I'd choose if I were starting fresh? Examined doesn't mean tortured — it means awake. Wake up.",
    body_he:
      "הטייס האוטומטי הוא האויב.\n\nפעם בשבוע, שאל את עצמך: לאן אני הולך, ואם הייתי מתחיל מחדש — האם הייתי בוחר בכיוון הזה? \"חיים בחינה\" לא אומר חיים מיוסרים — זה אומר חיים ערים. תתעורר.",
  },

  // ── Motivational ──────────────────────────────
  "39": {
    body:
      "The calendar isn't waiting for you to get serious. Today doesn't owe you anything — but you can give *it* something.\n\nOne real action. One conversation that mattered. One thing you'll remember. Make today count.",
    body_he:
      "הלוח שנה לא מחכה לך שתתחיל ברצינות. היום לא חייב לך כלום — אבל אתה יכול לתת *לו* משהו.\n\nפעולה אמתית אחת. שיחה אחת ששווה. דבר אחד שתזכור. תעשה שהיום ייספר.",
  },
  "40": {
    body:
      "There is no script. No fate writing you in.\n\nThe future you is being built right now by the choices you're making this week. Decide who that is — clearly, specifically — and start acting like them today. The decision *is* the destiny.",
    body_he:
      "אין תסריט. אין גורל שכותב אותך לתוכו.\n\nאתה-העתיד נבנה עכשיו, על ידי הבחירות שאתה עושה השבוע. תחליט מי זה — בבהירות, בספציפיות — ותתחיל לפעול כמוהו היום. ההחלטה *היא* הגורל.",
  },
  "41": {
    body:
      "Stop measuring yourself by your past or your projections. Both are stories.\n\nThe thing inside you that endures, that wants, that creates — that's the real material. Build from there. Everything else is weather.",
    body_he:
      "תפסיק למדוד את עצמך לפי העבר או לפי התחזיות שלך. שניהם סיפורים.\n\nהדבר בתוכך שמחזיק, שרוצה, שיוצר — זה החומר האמתי. בנה משם. כל השאר — מזג אוויר.",
  },
  "42": {
    body:
      "Two words. They mean: when it's hot, don't melt. When it's cold, don't freeze. When everyone else is folding, don't fold.\n\nThe hard moments are when your character actually gets built — there are no shortcuts. Stay hard. The soft life is later.",
    body_he:
      "שתי מילים. המשמעות: כשחם, אל תימס. כשקר, אל תקפא. כשכולם מקפלים — אל תקפל.\n\nהרגעים הקשים הם הרגעים שבהם האופי שלך באמת נבנה — אין קיצורי דרך. תישאר חזק. החיים הרכים יבואו אחר כך.",
  },
  "43": {
    body:
      "The you with no discipline is a slave to every craving and mood. The you with discipline gets to choose.\n\nSkip the workout, you're not free — you're bossed around by comfort. The boring habits are the door to a life you actually steer. Start one today.",
    body_he:
      "אתה בלי משמעת — עבד לכל דחף וכל מצב רוח. אתה עם משמעת — אתה זה שבוחר.\n\nתוותר על האימון — אתה לא חופשי, הנוחות מנהלת אותך. ההרגלים המשעממים הם הדלת לחיים שאתה באמת מוביל. תתחיל היום באחד.",
  },
};

/** Look up reflection for a quote id. Returns undefined if not found. */
export function getReflection(id: string): Reflection | undefined {
  return reflections[id];
}
