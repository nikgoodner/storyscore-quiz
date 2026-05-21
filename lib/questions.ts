import type { ArchetypeId } from "./archetypes";

export type QuestionOption = {
  label: string;
  scores: Partial<Record<ArchetypeId, number>>;
};

export type Question = {
  id: string;
  text: string;
  options: QuestionOption[];
};

export const questions: Question[] = [
  {
    id: "q1",
    text: "Pick the movie that hits you hardest:",
    options: [
      { label: "Someone quietly doing the right thing when nobody's watching. (Hidden Figures, A Beautiful Day in the Neighborhood, Forrest Gump)", scores: { cowboy: 3 } },
      { label: "A scrappy underdog film where the villain is the system itself. (The Big Short, Erin Brockovich, Moneyball)", scores: { pirate: 3 } },
      { label: "A weird, beautiful indie that wrecks you by act three. (Past Lives, Manchester by the Sea, Moonlight)", scores: { storyteller: 3 } },
      { label: "A heist where the team chemistry is the whole point. (Ocean's Eleven, The Italian Job, Logan Lucky)", scores: { connector: 3 } },
      { label: "A psychological thriller that makes you rethink something you believed. (Arrival, Eternal Sunshine of the Spotless Mind, The Matrix)", scores: { philosopher: 3 } },
      { label: "A visually stunning piece you'd watch with the sound off. (Blade Runner 2049, The Grand Budapest Hotel, Drive)", scores: { artist: 3 } },
    ],
  },
  {
    id: "q2",
    text: "You're scrolling LinkedIn. Pick the post that makes you want to throw your phone:",
    options: [
      { label: "\"10 things successful people do before 6am\"", scores: { pirate: 3 } },
      { label: "A 3,000-word think-piece with no headers, no breaks, no visuals", scores: { teacher: 3 } },
      { label: "\"Just hit $10K MRR! No marketing! AMA 👇\" with zero proof anywhere", scores: { reporter: 3 } },
      { label: "\"Had to let half my team go to hit growth targets. Here's what I learned 🚀\"", scores: { cowboy: 3 } },
      { label: "A carousel post with three different fonts and clip art icons", scores: { artist: 3 } },
      { label: "A confident hot take that's flat wrong, racking up thousands of likes", scores: { philosopher: 3 } },
    ],
  },
  {
    id: "q3",
    text: "It's 11pm on a Tuesday and you can't sleep. You open YouTube. The thumbnail you click is:",
    options: [
      { label: "A two-hour deep dive on something nobody else is covering", scores: { philosopher: 3 } },
      { label: "A side-by-side product review with charts and numbered scores", scores: { reporter: 3 } },
      { label: "A \"build with me\" timelapse of someone making something cool", scores: { builder: 3 } },
      { label: "A cinematic short film with no dialogue", scores: { artist: 3 } },
      { label: "A standup special that's been on your watch-later for a month", scores: { comedian: 3 } },
      { label: "A creator you've never heard of telling their origin story", scores: { storyteller: 3 } },
    ],
  },
  {
    id: "q4",
    text: "The book on your nightstand that you actually finished is:",
    options: [
      { label: "A biography of someone who quietly changed the world. (Just Mercy, Educated)", scores: { cowboy: 3 } },
      { label: "A manifesto-style book that challenges everything the industry assumes. (Originals, Antifragile)", scores: { pirate: 3 } },
      { label: "A novel that emotionally wrecked you. (Normal People, The Kite Runner)", scores: { storyteller: 3 } },
      { label: "A book by a comedian that's funnier than it has any right to be. (Born a Crime, Bossypants)", scores: { comedian: 3 } },
      { label: "A novel that changed how you see the world. (1984, Brave New World)", scores: { philosopher: 3 } },
      { label: "A how-to book that became your bible for a year. (Atomic Habits, Deep Work)", scores: { teacher: 3 } },
    ],
  },
  {
    id: "q5",
    text: "You inherit $50K with one rule: spend it all on the same kind of thing. Pick the category:",
    options: [
      { label: "Plane tickets to places that change how you see the world", scores: { storyteller: 3 } },
      { label: "Concerts, dinners, and gatherings with people you love", scores: { connector: 3 } },
      { label: "A studio space designed exactly the way you want it", scores: { artist: 3 } },
      { label: "A library's worth of books and a year off to read them", scores: { philosopher: 3 } },
      { label: "Quietly funding causes nobody else is funding", scores: { cowboy: 3 } },
      { label: "Conferences and rooms with people way smarter than you", scores: { strategist: 3 } },
    ],
  },
  {
    id: "q6",
    text: "A friend texts you at midnight saying \"I think I need to quit my job.\" You:",
    options: [
      { label: "Immediately call them and let them talk it out", scores: { cowboy: 3 } },
      { label: "Ask \"okay what's the actual problem here. Let's name it.\"", scores: { philosopher: 3 } },
      { label: "\"Quit. Life's too short. You'll figure it out.\"", scores: { pirate: 3 } },
      { label: "\"Send me the spreadsheet. Real numbers, real options.\"", scores: { strategist: 3 } },
      { label: "\"Send me three concrete next steps you can take tomorrow.\"", scores: { guide: 3 } },
      { label: "\"Send me a joke first. Now what's actually going on?\"", scores: { comedian: 3 } },
    ],
  },
  {
    id: "q7",
    text: "A friend sends you a half-finished idea for a business. Your first instinct is to:",
    options: [
      { label: "Ask what story makes this idea matter to someone", scores: { storyteller: 3 } },
      { label: "Ask if they've tested it with even one real person", scores: { reporter: 3 } },
      { label: "Open a doc and start mapping how to actually build it", scores: { builder: 3 } },
      { label: "Start sketching the brand identity in your head", scores: { artist: 3 } },
      { label: "Ask who else needs to be in the room for this to work", scores: { connector: 3 } },
      { label: "Ask what makes it different from everything else out there", scores: { strategist: 3 } },
    ],
  },
  {
    id: "q8",
    text: "A friend asks you to be their hype person for a big launch. You show up by:",
    options: [
      { label: "Making a short video telling the story of why this matters", scores: { storyteller: 3 } },
      { label: "Writing the killer line they'll use in every pitch from now on", scores: { teacher: 3 } },
      { label: "Sending them an hour-by-hour day-of plan so they don't have to think", scores: { builder: 3 } },
      { label: "Designing the announcement so it actually looks good", scores: { artist: 3 } },
      { label: "Introducing them to the right five people who could change everything", scores: { connector: 3 } },
      { label: "Hyping them up the night before until they believe it themselves", scores: { guide: 3 } },
    ],
  },
  {
    id: "q9",
    text: "It's Sunday morning. You have three free hours and no obligations. You spend them:",
    options: [
      { label: "Walking somewhere new with no phone, just thinking", scores: { philosopher: 3 } },
      { label: "Catching up over coffee with someone you've been missing", scores: { cowboy: 3 } },
      { label: "Cleaning, organizing, and prepping the week ahead", scores: { strategist: 3 } },
      { label: "Building or making something just for the fun of it", scores: { builder: 3 } },
      { label: "Watching something you've been told you HAVE to see", scores: { storyteller: 3 } },
      { label: "Sketching, photographing, or just noticing beautiful things", scores: { artist: 3 } },
    ],
  },
  {
    id: "q10",
    text: "Someone you respect just said something on a panel you think is completely wrong. You:",
    options: [
      { label: "Stand up and call it out directly, panel be damned", scores: { pirate: 3 } },
      { label: "Make a joke that lands the disagreement softly", scores: { comedian: 3 } },
      { label: "Quietly note your evidence and post a thoughtful rebuttal later", scores: { reporter: 3 } },
      { label: "Ask a question that lets them realize it themselves", scores: { guide: 3 } },
      { label: "Write a longer piece working through the nuance they missed", scores: { philosopher: 3 } },
      { label: "Talk to them after, person to person, because they're not the enemy", scores: { cowboy: 3 } },
    ],
  },
  {
    id: "q11",
    text: "The compliment you most love to GIVE somebody else is:",
    options: [
      { label: "\"Nobody else could have made me feel that way about it\"", scores: { storyteller: 3 } },
      { label: "\"You're the most thoughtful person I know\"", scores: { cowboy: 3 } },
      { label: "\"I love that you don't give a damn what people think\"", scores: { pirate: 3 } },
      { label: "\"You make me laugh more than anyone\"", scores: { comedian: 3 } },
      { label: "\"I trust your read more than almost anyone's\"", scores: { reporter: 3 } },
      { label: "\"I always know what to do after talking to you\"", scores: { guide: 3 } },
    ],
  },
  {
    id: "q12",
    text: "Confession time. Pick the thing you secretly love but won't always admit:",
    options: [
      { label: "A really good cry from a movie nobody respects", scores: { storyteller: 3 } },
      { label: "Cheesy motivational content when you need it", scores: { guide: 3 } },
      { label: "Being a little petty in the group chat", scores: { pirate: 3 } },
      { label: "A 47-minute YouTube video about something completely random", scores: { philosopher: 3 } },
      { label: "Reorganizing your apps, files, or workspace for an hour", scores: { strategist: 3 } },
      { label: "Stalking the aesthetic of brands you'll never actually buy from", scores: { artist: 3 } },
    ],
  },
];