import type { ArchetypeId } from "./archetypes";

export type QuestionType = "text" | "truefalse" | "image";

export type QuestionOption = {
  label: string;
  scores: Partial<Record<ArchetypeId, number>>;
  /** Rich text line 2 (Q1) or image alt text */
  description?: string;
  /** Rich text line 1 (Q1) — displayed uppercase via PP Formula */
  title?: string;
  /** Rich text line 3 (Q1) — Aeonik Fono examples */
  examples?: string;
  imageSrc?: string;
};

type BaseQuestion = {
  id: string;
  text: string;
};

export type TextQuestion = BaseQuestion & {
  type: "text";
  options: QuestionOption[];
};

export type ImageQuestion = BaseQuestion & {
  type: "image";
  options: QuestionOption[];
};

export type TrueFalseQuestion = BaseQuestion & {
  type: "truefalse";
  trueArchetypes: ArchetypeId[];
  falseArchetypes: ArchetypeId[];
};

export type Question = TextQuestion | ImageQuestion | TrueFalseQuestion;

function textOption(label: string, archetype: ArchetypeId): QuestionOption {
  return {
    label,
    scores: { [archetype]: 1 },
  };
}

function richTextOption(
  title: string,
  archetype: ArchetypeId,
  description: string,
  examples: string,
): QuestionOption {
  return {
    label: title,
    title,
    description,
    examples,
    scores: { [archetype]: 1 },
  };
}

function imageOption(
  label: string,
  description: string,
  imageSrc: string,
  archetype: ArchetypeId,
): QuestionOption {
  return {
    label,
    description,
    imageSrc,
    scores: { [archetype]: 1 },
  };
}

export const questions: Question[] = [
  {
    id: "q1",
    type: "text",
    text: "Which movie gets you every time?",
    options: [
      richTextOption(
        "The Quiet Hero",
        "cowboy",
        "Someone doing the right thing when no one notices.",
        "Hidden Figures · A Beautiful Day in the Neighborhood · Forrest Gump",
      ),
      richTextOption(
        "The Underdog vs. the System",
        "pirate",
        "A long shot taking on a broken machine.",
        "The Big Short · Erin Brockovich · Moneyball",
      ),
      richTextOption(
        "The Beautiful Gut Punch",
        "storyteller",
        "A slow burn that emotionally wrecks you.",
        "Past Lives · Manchester by the Sea · Moonlight",
      ),
      richTextOption(
        "The Team-Up",
        "connector",
        "A crew whose chemistry is the real story.",
        "Ocean's Eleven · The Italian Job · Logan Lucky",
      ),
      richTextOption(
        "The Mind-Bender",
        "teacher",
        "A story that rearranges how you think.",
        "Arrival · Eternal Sunshine of the Spotless Mind · The Matrix",
      ),
      richTextOption(
        "The Visual Masterpiece",
        "artist",
        "So beautiful you'd watch it on mute.",
        "Blade Runner 2049 · The Grand Budapest Hotel · Drive",
      ),
    ],
  },
  {
    id: "q2",
    type: "image",
    text: "Pick your dream workspace:",
    options: [
      imageOption(
        "Minimalist white desk",
        "One notebook, one pen, nothing else",
        "/quiz-visuals/workspace-strategist.jpg",
        "strategist",
      ),
      imageOption(
        "Chaotic creative studio",
        "Paint, instruments, half-finished projects everywhere",
        "/quiz-visuals/workspace-artist.jpg",
        "artist",
      ),
      imageOption(
        "Wood-paneled library",
        "Leather chair, stacks of books, warm lamp",
        "/quiz-visuals/workspace-philosopher.jpg",
        "philosopher",
      ),
      imageOption(
        "Maker's bench",
        "Tools, monitors, sticky notes covering the wall",
        "/quiz-visuals/workspace-builder.jpg",
        "builder",
      ),
      imageOption(
        "Outdoor patio table",
        "Coffee, journal, sunlight",
        "/quiz-visuals/workspace-cowboy.jpg",
        "cowboy",
      ),
      imageOption(
        "Industrial loft",
        "Concrete walls, bold art, vintage equipment",
        "/quiz-visuals/workspace-pirate.jpg",
        "pirate",
      ),
    ],
  },
  {
    id: "q3",
    type: "text",
    text: "Pick the LinkedIn post that makes you want to throw your phone:",
    options: [
      textOption("10 Things Successful People Do Before 6am", "pirate"),
      textOption(
        "A 3,000-word think-piece with no headers, no breaks, no visuals",
        "strategist",
      ),
      textOption(
        "Just hit $10K MRR! No marketing! AMA 👇 with zero proof anywhere",
        "reporter",
      ),
      textOption(
        "Had to let half my team go to hit growth targets. Here's what I learned 🚀",
        "connector",
      ),
      textOption(
        "A carousel post with three different fonts and clip art icons",
        "builder",
      ),
      textOption(
        "A confident hot take that's flat wrong, racking up thousands of likes",
        "philosopher",
      ),
    ],
  },
  {
    id: "q4",
    type: "truefalse",
    text: "I'd rather be respected than liked.",
    trueArchetypes: [
      "pirate",
      "strategist",
      "philosopher",
      "reporter",
      "builder",
      "teacher",
    ],
    falseArchetypes: [
      "cowboy",
      "connector",
      "comedian",
      "artist",
      "storyteller",
      "guide",
    ],
  },
  {
    id: "q5",
    type: "text",
    text: "How do you actually process a hard week?",
    options: [
      textOption("Talk it through with someone who knows me well", "cowboy"),
      textOption(
        "Tell the story of what happened until I can laugh about it",
        "storyteller",
      ),
      textOption("Step back and ask what I can learn from this", "philosopher"),
      textOption("Find the pattern so I can avoid it next time", "teacher"),
      textOption("Make a dark joke about it", "comedian"),
      textOption("Get back to work. Momentum solves everything.", "builder"),
    ],
  },
  {
    id: "q6",
    type: "text",
    text: "A friend texts at midnight: 'I need to quit my job.' You:",
    options: [
      textOption("Immediately call them and let them talk it out", "cowboy"),
      textOption(
        "Ask 'What's the actual problem here?' Let's name it.",
        "philosopher",
      ),
      textOption("Tell them to quit and figure it out.", "pirate"),
      textOption(
        "Send them a spreadsheet with real numbers and real options.",
        "reporter",
      ),
      textOption("Help them identify their next three moves.", "guide"),
      textOption("Make them laugh. Then get to the real issue.", "comedian"),
    ],
  },
  {
    id: "q7",
    type: "truefalse",
    text: "I'd rather make something than talk about making something.",
    trueArchetypes: [
      "builder",
      "artist",
      "strategist",
      "reporter",
      "guide",
      "teacher",
    ],
    falseArchetypes: [
      "storyteller",
      "connector",
      "philosopher",
      "comedian",
      "cowboy",
      "pirate",
    ],
  },
  {
    id: "q8",
    type: "text",
    text: "A friend is launching something big. You help by:",
    options: [
      textOption("Developing a marketing plan", "strategist"),
      textOption("Crafting a message that sticks", "teacher"),
      textOption("Building a launch plan that keeps everything moving", "builder"),
      textOption("Designing an announcement people can't ignore", "artist"),
      textOption("Opening doors to the right opportunities", "connector"),
      textOption("Giving them the confidence to go for it", "guide"),
    ],
  },
  {
    id: "q9",
    type: "truefalse",
    text: "I'd rather host a dinner than attend one.",
    trueArchetypes: [
      "cowboy",
      "connector",
      "guide",
      "comedian",
      "storyteller",
      "teacher",
    ],
    falseArchetypes: [
      "pirate",
      "philosopher",
      "reporter",
      "builder",
      "artist",
      "strategist",
    ],
  },
  {
    id: "q10",
    type: "text",
    text: "Confession time. Pick the thing you secretly love but won't always admit:",
    options: [
      textOption("Crying along to a good movie", "storyteller"),
      textOption("Cheesy motivational content when you need it", "guide"),
      textOption("Being a little petty in the group chat", "comedian"),
      textOption(
        "A 47-minute YouTube video about something completely random",
        "reporter",
      ),
      textOption(
        "Reorganizing your apps, files, or workspace for an hour",
        "strategist",
      ),
      textOption(
        "Stalking the aesthetic of brands you'll never actually buy from",
        "artist",
      ),
    ],
  },
];
