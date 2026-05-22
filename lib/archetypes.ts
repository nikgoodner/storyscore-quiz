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
      core: "You lead by making people feel the meaning before they analyze it. Your mind naturally turns ideas into scenes, examples, tension, and emotional payoff. People trust you because you don't just explain what happened. You help them understand why it mattered.",
      balance: "Storyteller as Vibe makes your dominant voice more memorable. Whatever your Center is, this adds shape, pacing, and emotional texture so that people can follow the idea rather than just receive information. Your audience feels like they are being pulled into a moment, not handed a point.",
      inverse: "Storyteller as Twist adds a human layer that people may not expect. You might seem practical, analytical, funny, or direct at first, but then you reveal the scene underneath the idea. That surprise makes your voice feel less flat and more alive.",
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
      core: "You lead with protection, warmth, and grounded care. At your foundation, you want people to feel safe enough to listen, grow, and be honest. People trust you because your voice feels human before it feels impressive.",
      balance: "Cowboy as Vibe softens the way your Center lands. It makes bold ideas feel less intimidating, sharp critiques feel less cruel, and expertise feel more approachable. Your audience feels like you are with them, not above them.",
      inverse: "Cowboy as Twist reveals the care underneath your strongest moves. People may first notice your humor, strategy, critique, or intensity, then realize you are actually trying to protect something human. That surprise keeps your voice from feeling cold or performative.",
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
      core: "You lead by challenging what everyone else has accepted too easily. You notice the cliché, the fake rule, the lazy formula, and the thing people are afraid to question. People connect with you because you give language to the frustration they have been carrying quietly.",
      balance: "Pirate as Vibe gives your dominant voice tension and edge. It makes your ideas feel less predictable because there is always a little friction in the way you say things. Your audience feels the push, even when the core message is helpful, warm, or practical.",
      inverse: "Pirate as Twist adds a rebellious layer that people do not see coming. You may seem clear, kind, structured, or thoughtful at first, but then you suddenly challenge the system behind the conversation. That surprise makes your voice harder to ignore.",
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
      core: "You lead by making truth easier to face. Humor is not just decoration for you. It is how you reveal what is awkward, broken, obvious, or absurd. People connect with you because you can say the honest thing without making the room feel heavier.",
      balance: "Comedian as Vibe makes your Center easier to receive and easier to repeat. It lowers people's defenses, gives your ideas rhythm, and turns serious points into something people want to share. Your audience feels entertained, but they also leave with the truth stuck in their head.",
      inverse: "Comedian as Twist adds a sudden release valve. You may lead with depth, evidence, taste, or direction, then cut through the tension with a line that makes people laugh because it is true. That surprise keeps your voice from becoming too serious or self-important.",
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
      core: "You lead with receipts. You pay attention to facts, examples, patterns, trends, and contradictions that other people miss. People trust you because your voice feels grounded in what is actually happening, not just what you wish were true.",
      balance: "Reporter as Vibe makes your dominant voice feel more credible. Even when you are leading with emotion, humor, taste, or strategy, there is a sense that your ideas carry weight. Your audience feels like they can trust you because you are not just making claims. You are noticing evidence.",
      inverse: "Reporter as Twist adds proof where people may expect only personality. You might seem intuitive, funny, artistic, or philosophical at first, then you bring out the receipts. That surprise makes your voice feel sharper, sturdier, and harder to dismiss.",
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
      core: "You lead by helping people move. You are not satisfied with making something interesting if it leaves people stuck in the same place. People trust you because you turn confusion into a path, and a path into a next step.",
      balance: "Guide as Vibe makes your dominant voice feel more useful. It gives your ideas direction, momentum, and a sense of \"here is what to do with this.\" Your audience feels helped, not just impressed.",
      inverse: "Guide as Twist adds practical movement people may not expect. You may lead with story, humor, critique, beauty, or deep thinking, then suddenly hand people a next step. That surprise keeps your voice from feeling interesting but unusable.",
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
      core: "You lead with clarity. You can take something messy, intimidating, or half-understood and make it easier to name, organize, and use. People trust you because you help them finally say, \"Oh, now I get it.\"",
      balance: "Teacher as Vibe gives your dominant voice structure. It makes emotional ideas easier to process, strategic ideas easier to follow, and bold ideas easier to understand. Your audience feels smarter around you because you give them language for what they were already sensing.",
      inverse: "Teacher as Twist adds an unexpected moment of clarity. You may seem artistic, funny, rebellious, or relational at first, and then you suddenly explain it in a way that clicks. That surprise makes your voice feel more generous and more useful.",
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
      core: "You lead by creating belonging. You think in relationships, shared language, collaboration, and the feeling of being part of something. People trust you because your voice does not make them feel like spectators. It makes them feel invited.",
      balance: "Connector as Vibe makes your dominant voice feel more relational. It turns teaching into conversation, strategy into shared mission, and critique into something people can gather around. Your audience feels included in the idea, not talked at from a distance.",
      inverse: "Connector as Twist adds a communal layer that people may not expect. You might lead with facts, frameworks, taste, execution, or opinion, then suddenly make people feel like they belong inside the work. That surprise keeps your voice from feeling isolated, transactional, or one-sided.",
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
      core: "You lead with taste. You notice mood, beauty, symbolism, style, and meaning before other people even know what they are reacting to. People trust you because your work does not just communicate information. It creates a feeling they remember.",
      balance: "Artist as Vibe makes your dominant voice feel more distinct. It gives your ideas mood, texture, visual identity, and a stronger sense of taste. Your audience feels the difference before they can always explain it.",
      inverse: "Artist as Twist adds craft where people may expect function. You may lead with systems, clarity, humor, or leadership, then reveal an eye for beauty and interpretation. That surprise makes your voice feel more intentional, more memorable, and less generic.",
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
      core: "You lead by seeing the system behind the moment. You think in terms of positioning, patterns, decisions, trade-offs, and long-term consequences. People trust you because you help them stop reacting and start choosing with intention.",
      balance: "Strategist as Vibe gives your dominant voice direction. It makes creative ideas feel purposeful, emotional ideas feel focused, and practical ideas feel tied to a larger outcome. Your audience feels like there is a plan underneath what you are saying.",
      inverse: "Strategist as Twist adds a hidden intention that people may not notice at first. You might lead with humor, story, taste, care, or teaching, then reveal the larger pattern behind it all. That surprise makes your voice feel smarter and more deliberate than people expected.",
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
      core: "You lead by making things real. You care about process, execution, output, and whether an idea can survive contact with actual work. People trust you because you are not just talking about what could exist. You know how to build it.",
      balance: "Builder as Vibe makes your dominant voice feel more practical. It gives your ideas a sense of weight, workflow, and follow-through. Your audience feels like what you are saying could actually become something.",
      inverse: "Builder as Twist adds execution that people may not expect. You might lead with theory, story, humor, taste, or critique, then reveal that you can actually make the thing happen. That surprise keeps your voice from feeling abstract, unfinished, or stuck in idea mode.",
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
      core: "You lead with depth. You question easy answers, look underneath the obvious, and search for the meaning behind the work. People trust you because you help them think about familiar things in a more honest and layered way.",
      balance: "Philosopher as Vibe makes your dominant voice feel more thoughtful. It adds nuance, reflection, and a sense that there is more happening beneath the surface. Your audience feels invited to slow down and think, not just react.",
      inverse: "Philosopher as Twist adds unexpected depth to what may first look simple. You might lead with action, humor, clarity, strategy, or taste, then reveal the bigger question underneath it. That surprise makes your voice feel more layered and harder to reduce to a quick take.",
    },
  },
};

export function isArchetypeId(value: string): value is ArchetypeId {
  return ARCHETYPE_IDS.includes(value as ArchetypeId);
}