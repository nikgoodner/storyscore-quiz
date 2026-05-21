export const ARCHETYPE_IDS = [
  "storyteller",
  "cowboy",
  "pirate",
  "comedian",
  "reporter",
  "guide",
  "teacher",
  "connector",
  "artist",
  "strategist",
  "builder",
  "philosopher",
] as const;

export type ArchetypeId = (typeof ARCHETYPE_IDS)[number];

export type ArchetypeExample = {
  name: string;
  url: string;
};

export type Archetype = {
  id: ArchetypeId;
  name: string;
  tagline: string;
  keywords: string[];
  examples: ArchetypeExample[];
  descriptions: {
    core: string;
    balance: string;
    inverse: string;
  };
};

export const archetypes: Record<ArchetypeId, Archetype> = {
  storyteller: {
    id: "storyteller",
    name: "Storyteller",
    tagline: "Scene Builder",
    keywords: ["Empathy", "Perspective", "Emotion"],
    examples: [
      { name: "Pixar", url: "https://www.pixar.com" },
      { name: "Brené Brown", url: "https://en.wikipedia.org/wiki/Bren%C3%A9_Brown" },
      { name: "Jordan Peele", url: "https://en.wikipedia.org/wiki/Jordan_Peele" },
    ],
    descriptions: {
      core: "You lead with narrative. You make ideas easier to understand by turning them into scenes, moments, examples, and emotional takeaways. People connect with you because you help them feel the point, not just hear it.",
      balance: "You use stories to support your core voice. Your main key may be more analytical, practical, funny, or strategic, but storytelling helps make it more memorable. It gives your ideas a clearer beginning, middle, and end.",
      inverse: "You use story to add depth that people may not expect from you at first. You may lead with facts, frameworks, opinions, or action, but storytelling helps people see the human side of your message. It keeps your content from feeling too cold, flat, or disconnected.",
    },
  },
  cowboy: {
    id: "cowboy",
    name: "Cowboy",
    tagline: "People Protector",
    keywords: ["Warmth", "Down-to-Earth", "Compassion"],
    examples: [
      { name: "Patagonia", url: "https://www.patagonia.com" },
      { name: "José Andrés", url: "https://en.wikipedia.org/wiki/Jos%C3%A9_Andr%C3%A9s" },
      { name: "Dolly Parton", url: "https://en.wikipedia.org/wiki/Dolly_Parton" },
    ],
    descriptions: {
      core: "You lead with care. You make people feel seen, defended, and safe enough to trust what you're saying. People connect with you because your voice feels grounded, protective, and human.",
      balance: "You use warmth to support your core voice. Your main key may be bold, analytical, artistic, or intense, but the Cowboy helps it feel more approachable. It keeps your message from feeling distant or self-important.",
      inverse: "You use protection to add heart that people may not expect from you at first. You may lead with critique, strategy, humor, or execution, but this key shows people you're not just trying to be right; you're trying to help. It keeps your content from feeling cold, sharp, or detached.",
    },
  },
  pirate: {
    id: "pirate",
    name: "Pirate",
    tagline: "Rule Breaker",
    keywords: ["Disruptive", "Anti-Cliché", "Provocative"],
    examples: [
      { name: "Liquid Death", url: "https://liquiddeath.com" },
      { name: "Sara Blakely", url: "https://en.wikipedia.org/wiki/Sara_Blakely" },
      { name: "Billie Eilish", url: "https://en.wikipedia.org/wiki/Billie_Eilish" },
    ],
    descriptions: {
      core: "You lead by challenging the default. You notice the clichés, broken rules, tired formulas, and lazy assumptions other people ignore. People connect with you because you say what others are thinking but are too afraid to say out loud.",
      balance: "You use disruption to support your core voice. Your main key may be thoughtful, practical, relational, or educational, but the Pirate keeps it from feeling too safe. It gives your ideas tension, edge, and a reason to stand out.",
      inverse: "You use rebellion to add surprise that people may not expect from you at first. You may lead with clarity, warmth, evidence, or story, but this key helps you challenge the system when needed. It keeps your content from feeling too predictable, polished, or agreeable.",
    },
  },
  comedian: {
    id: "comedian",
    name: "Comedian",
    tagline: "Truth Joker",
    keywords: ["Satire", "Parody", "Absurdity"],
    examples: [
      { name: "Duolingo", url: "https://www.duolingo.com" },
      { name: "Jon Stewart", url: "https://en.wikipedia.org/wiki/Jon_Stewart" },
      { name: "Quinta Brunson", url: "https://en.wikipedia.org/wiki/Quinta_Brunson" },
    ],
    descriptions: {
      core: "You lead with humor. You use jokes, exaggeration, satire, and absurdity to make the truth easier to see. People connect with you because you can say something honest without making it feel heavy.",
      balance: "You use humor to support your core voice. Your main key may be strategic, emotional, educational, or critical, but the Comedian makes it more entertaining and easier to share. It helps your ideas land without sounding like a lecture.",
      inverse: "You use humor to add lightness that people may not expect from you at first. You may lead with depth, facts, action, or leadership, but this key helps people enjoy the ride. It keeps your content from feeling too serious, stiff, or intense.",
    },
  },
  reporter: {
    id: "reporter",
    name: "Reporter",
    tagline: "Receipt Collector",
    keywords: ["Evidence", "Informs", "Debunks"],
    examples: [
      { name: "The Verge", url: "https://www.theverge.com" },
      { name: "Kara Swisher", url: "https://en.wikipedia.org/wiki/Kara_Swisher" },
      { name: "Anderson Cooper", url: "https://en.wikipedia.org/wiki/Anderson_Cooper" },
    ],
    descriptions: {
      core: "You lead with evidence. You collect facts, examples, receipts, trends, and observations that help people understand what's really happening. People connect with you because your ideas feel researched, grounded, and hard to dismiss.",
      balance: "You use evidence to support your core voice. Your main key may be emotional, funny, visionary, or strategic, but the Reporter gives it credibility. It helps people trust your ideas because they can see what they're built on.",
      inverse: "You use reporting to add proof that people may not expect from you at first. You may lead with story, taste, humor, or big ideas, but this key helps you back up what you're saying. It keeps your content from feeling too vague, overly exaggerated, or purely opinionated.",
    },
  },
  guide: {
    id: "guide",
    name: "Guide",
    tagline: "Path Finder",
    keywords: ["Coaching", "Leadership", "Action"],
    examples: [
      { name: "Headspace", url: "https://www.headspace.com" },
      { name: "Simon Sinek", url: "https://en.wikipedia.org/wiki/Simon_Sinek" },
      { name: "Tabitha Brown", url: "https://en.wikipedia.org/wiki/Tabitha_Brown" },
    ],
    descriptions: {
      core: "You lead by helping people move forward. You give direction, encouragement, next steps, and a clear path through confusion. People connect with you because you don't just explain the problem; you help them know what to do next.",
      balance: "You use guidance to support your core voice. Your main key may be creative, analytical, relational, or disruptive, but the Guide turns your ideas into action. It helps people apply what you're saying instead of just agreeing with it.",
      inverse: "You use guidance to add usefulness that people may not expect from you at first. You may lead with story, humor, critique, or aesthetics, but this key helps people leave with a next step. It keeps your content from feeling interesting but impractical.",
    },
  },
  teacher: {
    id: "teacher",
    name: "Teacher",
    tagline: "Clarity Maker",
    keywords: ["Frameworks", "Explainers", "Simplifying"],
    examples: [
      { name: "Khan Academy", url: "https://www.khanacademy.org" },
      { name: "Sal Khan", url: "https://en.wikipedia.org/wiki/Sal_Khan" },
      { name: "LeVar Burton", url: "https://en.wikipedia.org/wiki/LeVar_Burton" },
    ],
    descriptions: {
      core: "You lead with clarity. You take ideas that feel messy, confusing, or overwhelming and make them easier to understand. People connect with you because you help them finally \"get it.\"",
      balance: "You use teaching to support your core voice. Your main key may be emotional, strategic, funny, or bold, but the Teacher helps organize it. It gives your ideas structure, language, and a clearer takeaway.",
      inverse: "You use clarity to add structure that people may not expect from you at first. You may lead with story, taste, critique, or community, but this key helps people understand what you mean. It keeps your content from feeling scattered, unclear, or hard to follow.",
    },
  },
  connector: {
    id: "connector",
    name: "Connector",
    tagline: "Community Builder",
    keywords: ["Invitation", "Relationships", "Collaboration"],
    examples: [
      { name: "Peloton", url: "https://www.onepeloton.com" },
      { name: "Priya Parker", url: "https://en.wikipedia.org/wiki/Priya_Parker" },
      { name: "Reese Witherspoon", url: "https://en.wikipedia.org/wiki/Reese_Witherspoon" },
    ],
    descriptions: {
      core: "You lead by bringing people together. You build relationships, create shared language, and make people feel like they're part of something. People connect with you because your voice feels inviting rather than isolated.",
      balance: "You use connection to support your core voice. Your main key may be educational, artistic, strategic, or disruptive, but the Connector makes it feel more relational. It helps your ideas feel like a conversation, not just a broadcast.",
      inverse: "You use community to foster a sense of belonging that people may not expect from you at first. You may lead with facts, frameworks, opinions, or execution, but this key helps people feel included in the work. It keeps your content from feeling too individualistic, transactional, or one-sided.",
    },
  },
  artist: {
    id: "artist",
    name: "Artist",
    tagline: "Taste Maker",
    keywords: ["Imagery", "Aesthetic", "Interpretation"],
    examples: [
      { name: "Apple", url: "https://www.apple.com" },
      { name: "Ruth E. Carter", url: "https://en.wikipedia.org/wiki/Ruth_E._Carter" },
      { name: "Zendaya", url: "https://en.wikipedia.org/wiki/Zendaya" },
    ],
    descriptions: {
      core: "You lead with taste. You notice beauty, mood, style, symbolism, and meaning in ways other people might miss. People connect with you because your work doesn't just communicate; it creates a feeling.",
      balance: "You use artistry to support your core voice. Your main key may be practical, strategic, educational, or relational, but the Artist makes it feel more distinct. It gives your ideas a stronger visual identity, tone, and sense of taste.",
      inverse: "You use taste to add beauty that people may not expect from you at first. You may lead with facts, systems, humor, or leadership, but this key helps your message feel more crafted. It keeps your content from feeling too plain, generic, or purely functional.",
    },
  },
  strategist: {
    id: "strategist",
    name: "Strategist",
    tagline: "Systems Thinker",
    keywords: ["Case Studies", "Planning", "Positioning"],
    examples: [
      { name: "Nike", url: "https://www.nike.com" },
      { name: "Bozoma Saint John", url: "https://en.wikipedia.org/wiki/Bozoma_Saint_John" },
      { name: "Beyoncé", url: "https://en.wikipedia.org/wiki/Beyonc%C3%A9" },
    ],
    descriptions: {
      core: "You lead with strategy. You see patterns, positioning, plans, and the bigger system behind the work. People connect with you because you help them make smarter decisions, not just better content.",
      balance: "You use strategy to support your core voice. Your main key may be creative, emotional, relational, or funny, but the Strategist gives it direction. It helps your ideas feel more intentional, useful, and connected to a bigger goal.",
      inverse: "You use strategy to add intention that people may not expect from you at first. You may lead with story, humor, taste, or care, but this key helps people see the plan underneath it. It keeps your content from feeling random, reactive, or disconnected from outcomes.",
    },
  },
  builder: {
    id: "builder",
    name: "Builder",
    tagline: "Relentless Maker",
    keywords: ["Execution", "Process", "Workflow"],
    examples: [
      { name: "LEGO", url: "https://www.lego.com" },
      { name: "Simone Giertz", url: "https://en.wikipedia.org/wiki/Simone_Giertz" },
      { name: "Mark Rober", url: "https://en.wikipedia.org/wiki/Mark_Rober" },
    ],
    descriptions: {
      core: "You lead by making things real. You care about execution, process, output, and turning ideas into something people can actually use. People connect with you because you don't just talk about the work; you do the work.",
      balance: "You use building to support your core voice. Your main key may be strategic, creative, educational, or relational, but the Builder makes it practical. It helps your ideas move from concept to action.",
      inverse: "You use execution to add follow-through that people may not expect from you at first. You may lead with story, theory, humor, or taste, but this key shows people you can make the idea real. It keeps your content from feeling too abstract, unfinished, or disconnected from reality.",
    },
  },
  philosopher: {
    id: "philosopher",
    name: "Philosopher",
    tagline: "Deep Thinker",
    keywords: ["Critique", "Deep Dives", "Nuance"],
    examples: [
      { name: "The Atlantic", url: "https://www.theatlantic.com" },
      { name: "James Baldwin", url: "https://en.wikipedia.org/wiki/James_Baldwin" },
      { name: "Kendrick Lamar", url: "https://en.wikipedia.org/wiki/Kendrick_Lamar" },
    ],
    descriptions: {
      core: "You lead with depth. You ask better questions, challenge easy answers, and look for the meaning underneath the obvious. People connect with you because you help them think more deeply about things they may have taken for granted.",
      balance: "You use depth to support your core voice. Your main key may be practical, funny, artistic, or relational, but the Philosopher adds nuance. It helps your ideas feel more thoughtful, layered, and worth sitting with.",
      inverse: "You use philosophy to add depth that people may not expect from you at first. You may lead with action, clarity, humor, or strategy, but this key helps people see the bigger meaning behind the work. It keeps your content from feeling too shallow, rushed, or overly tactical.",
    },
  },
};

export function isArchetypeId(value: string): value is ArchetypeId {
  return ARCHETYPE_IDS.includes(value as ArchetypeId);
}