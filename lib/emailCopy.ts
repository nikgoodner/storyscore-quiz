import type { ArchetypeId } from "./archetypes";

export type ArchetypeEmailCopy = {
  // The 2-3 extra sentences that follow each archetype's standard description in the email.
  // One version per position the archetype can land in.
  extendedDescription: {
    core: string;
    balance: string;
    inverse: string;
  };
  // Position-specific one-liner sentences. Composed together to form the chord one-liner.
  // Example: "You lead with story. You shape your center through proof. You add unexpected belonging through community."
  oneLiner: {
    core: string;
    balance: string;
    inverse: string;
  };
  // One sentence describing what this archetype brings to the chord overall.
  // Three of these are concatenated to form the chord summary paragraph.
  chordSummaryFragment: string;
  // Position-specific reflection questions. Used in the "Am I leading with my Core?" section.
  contentQuestion: {
    core: string;
    balance: string;
    inverse: string;
  };
  // The weekly prompt for content creation. Only fires when the archetype is the user's Core.
  // The composition function pulls Core's prompt as the opener, then appends Balance and Inverse actions.
  contentPrompt: string;
};

export const emailCopy: Record<ArchetypeId, ArchetypeEmailCopy> = {
  storyteller: {
    extendedDescription: {
      core: "Your strongest content usually begins with a moment people can enter. A scene, a memory, a tension, a shift, a character. You make ideas land by helping people feel the meaning before they try to explain it.",
      balance: "Storyteller colors your Center by making it easier to picture and remember. Your audience does not just hear the point, they can see where it lives in real life. This shows up when you use examples, callbacks, lived experience, or emotional turns to make an idea stick.",
      inverse: "Storyteller adds the human scene people may not expect from you. When your content starts feeling too tactical, abstract, or opinion-heavy, story gives it a pulse. It helps people remember there is always a person inside the point.",
    },
    oneLiner: {
      core: "You lead by making people feel the meaning.",
      balance: "You shape your center through scenes and emotion.",
      inverse: "You add unexpected humanity through story.",
    },
    chordSummaryFragment: "Storyteller brings narrative, empathy, tension, and emotional context to the chord.",
    contentQuestion: {
      core: "Am I turning this idea into a moment people can feel?",
      balance: "Would a story make my Center easier to picture and remember?",
      inverse: "Where could the human moment underneath this idea show up?",
    },
    contentPrompt: "Write about a small moment that revealed something bigger. Show what happened, name the shift, and explain why your audience should care.",
  },
  cowboy: {
    extendedDescription: {
      core: "Your strongest content usually comes from care. You are at your best when you are defending someone, grounding someone, or helping people feel less alone in what they are carrying. Your voice works because people can tell you are not trying to win the room. You are trying to protect something human.",
      balance: "Cowboy colors your Center by making it feel safer to trust. Even when your ideas are bold, sharp, or strategic, warmth lets people feel your intent. This shows up when your content makes people feel seen before it asks them to change.",
      inverse: "Cowboy adds the heart people may not expect from you. When your content starts feeling too intense, critical, or polished, this layer brings it back to the person you are trying to help. It reminds people there is care underneath the conviction.",
    },
    oneLiner: {
      core: "You lead by protecting what matters.",
      balance: "You shape your center through warmth and care.",
      inverse: "You add unexpected heart through protection.",
    },
    chordSummaryFragment: "Cowboy brings warmth, compassion, groundedness, and protection to the chord.",
    contentQuestion: {
      core: "Who am I protecting, defending, or helping with this?",
      balance: "Would more warmth make my Center easier to trust?",
      inverse: "Where can I show people I am trying to help, not just be right?",
    },
    contentPrompt: "Write about something your audience is tired of carrying alone. Name the weight, defend the person, and give them one grounded truth they can hold onto.",
  },
  pirate: {
    extendedDescription: {
      core: "Your strongest content usually starts with a rule you do not trust. You notice the clichés, formulas, fake best practices, and lazy assumptions everyone else keeps repeating. Your voice works because you say the thing people have felt but have not been able to name yet.",
      balance: "Pirate colors your Center by adding tension and point of view. It gives even helpful, practical, or emotional content a sharper edge. This shows up when you name what feels stale, false, overdone, or too safe to be useful.",
      inverse: "Pirate adds the challenge people may not expect from you. When your content starts feeling too agreeable or polished, this layer asks what needs to be questioned. It keeps your voice from becoming predictable.",
    },
    oneLiner: {
      core: "You lead by challenging the default.",
      balance: "You shape your center through tension and edge.",
      inverse: "You add unexpected friction through rebellion.",
    },
    chordSummaryFragment: "Pirate brings tension, originality, provocation, and rule-breaking energy to the chord.",
    contentQuestion: {
      core: "What default belief, cliché, or lazy assumption am I challenging?",
      balance: "Would a stronger point of view make my Center harder to ignore?",
      inverse: "Where is this idea too safe, polished, or agreeable?",
    },
    contentPrompt: "Write about a rule everyone follows that you think is making the work worse. Name the rule, explain why it is broken, and offer a better way forward.",
  },
  comedian: {
    extendedDescription: {
      core: "Your strongest content usually starts with the ridiculous thing everyone recognizes but no one has said out loud. You use humor to point at something real without making it feel heavier than it has to. Your voice works because people laugh, then realize the joke had teeth.",
      balance: "Comedian colors your Center by lowering the room's defenses. It makes your ideas easier to receive, repeat, and share because the truth arrives with release. This shows up in sharp phrasing, absurd comparisons, satire, exaggeration, or a punchline that makes the point clearer.",
      inverse: "Comedian adds lightness people may not expect from you. When your content starts feeling too dense, serious, or emotionally heavy, humor gives people room to breathe. It keeps the point alive without weakening it.",
    },
    oneLiner: {
      core: "You lead by making truth easier to face.",
      balance: "You shape your center through wit and release.",
      inverse: "You add unexpected lightness through humor.",
    },
    chordSummaryFragment: "Comedian brings humor, honesty, timing, and sharp observation to the chord.",
    contentQuestion: {
      core: "What ridiculous truth am I helping people see?",
      balance: "Would humor help my Center feel less heavy or lecture-y?",
      inverse: "Where could I add lightness without weakening the point?",
    },
    contentPrompt: "Write about something people take way too seriously. Make the joke first, then reveal the truth hiding underneath it.",
  },
  reporter: {
    extendedDescription: {
      core: "Your strongest content usually starts with something you noticed, found, tested, tracked, or investigated. You do not just make a claim and hope people believe you. You show them what the claim is built on.",
      balance: "Reporter colors your Center by making it feel more credible. Even if your dominant voice is emotional, funny, artistic, or strategic, proof gives people something to trust. This shows up through examples, screenshots, data, quotes, trends, receipts, and real-world observations.",
      inverse: "Reporter adds proof people may not expect from you. When your content starts feeling too vague, intuitive, or opinion-driven, this layer stabilizes it. It helps people see that your point is not just a feeling. Something is actually happening.",
    },
    oneLiner: {
      core: "You lead by proving what is happening.",
      balance: "You shape your center through receipts and proof.",
      inverse: "You add unexpected credibility through evidence.",
    },
    chordSummaryFragment: "Reporter brings evidence, research, observation, and credibility to the chord.",
    contentQuestion: {
      core: "What receipts, examples, or observations support this idea?",
      balance: "Would evidence make my Center easier to trust?",
      inverse: "Where does this idea need proof instead of just opinion?",
    },
    contentPrompt: "Write about something you noticed that proves a larger trend. Show the receipt, explain what it reveals, and tell people why it matters.",
  },
  guide: {
    extendedDescription: {
      core: "Your strongest content usually gives people a way through something. You are at your best when you name the struggle, clarify the path, and help someone take a next step. Your voice works because people leave feeling less stuck than they were before.",
      balance: "Guide colors your Center by making it more useful. Your audience does not just understand the idea, they know what to do with it. This shows up when you give direction, steps, encouragement, reframes, or a simple action people can take.",
      inverse: "Guide adds movement people may not expect from you. When your content starts feeling too conceptual, aesthetic, funny, or opinion-based, this layer turns it into something people can use. It keeps the idea from stopping at agreement.",
    },
    oneLiner: {
      core: "You lead by helping people move forward.",
      balance: "You shape your center through direction and action.",
      inverse: "You add unexpected usefulness through guidance.",
    },
    chordSummaryFragment: "Guide brings direction, encouragement, movement, and next steps to the chord.",
    contentQuestion: {
      core: "What next step am I helping people take?",
      balance: "Would a clearer path make my Center easier to apply?",
      inverse: "Where does this idea need a practical next step?",
    },
    contentPrompt: "Write about a problem your audience keeps overcomplicating. Name the confusion, simplify the path, and give them one next step.",
  },
  teacher: {
    extendedDescription: {
      core: "Your strongest content usually makes something confusing finally make sense. You break things down, name the parts, explain the pattern, or give people language for something they have felt but could not describe. Your voice works because people leave with clarity they can use.",
      balance: "Teacher colors your Center by giving it structure. It helps emotional ideas feel easier to process, bold ideas feel easier to understand, and strategic ideas feel easier to follow. This shows up through frameworks, definitions, comparisons, examples, and clean takeaways.",
      inverse: "Teacher adds clarity people may not expect from you. When your content starts feeling too loose, expressive, or abstract, this layer gives it shape. It helps people not only feel the idea, but understand what to do with it.",
    },
    oneLiner: {
      core: "You lead by making confusion make sense.",
      balance: "You shape your center through structure and language.",
      inverse: "You add unexpected clarity through explanation.",
    },
    chordSummaryFragment: "Teacher brings clarity, structure, simplicity, and useful language to the chord.",
    contentQuestion: {
      core: "Am I making this easier to understand?",
      balance: "Would a framework, definition, or comparison help my Center land?",
      inverse: "Where does this idea need more structure or language?",
    },
    contentPrompt: "Write about something your audience misunderstands. Break it into three simple parts and give them language they can use immediately.",
  },
  connector: {
    extendedDescription: {
      core: "Your strongest content usually makes people feel included. You are not just broadcasting an idea. You are creating a space where people can recognize themselves, respond, and feel like they are part of something.",
      balance: `Connector colors your Center by making it more relational. It turns teaching into conversation, strategy into shared mission, and critique into something people can gather around. This shows up through questions, shared language, community cues, collaborations, and phrases that make people think, "That's us."`,
      inverse: "Connector adds belonging people may not expect from you. When your content starts feeling too individual, transactional, or one-sided, this layer opens the door. It helps the audience feel like the idea is not just about you. It includes them.",
    },
    oneLiner: {
      core: "You lead by making people feel included.",
      balance: "You shape your center through invitation and belonging.",
      inverse: "You add unexpected community through connection.",
    },
    chordSummaryFragment: "Connector brings invitation, belonging, relationships, and shared language to the chord.",
    contentQuestion: {
      core: "Am I making people feel invited into this idea?",
      balance: "Would a question, collaboration, or shared language make my Center more relational?",
      inverse: "Where can I make this less about me and more about us?",
    },
    contentPrompt: "Write about something your audience has probably felt but has not said out loud. Name the shared feeling and invite them into the conversation.",
  },
  artist: {
    extendedDescription: {
      core: "Your strongest content usually has a distinct feeling before people can fully explain why it works. You notice mood, beauty, symbolism, style, and interpretation in ways other people miss. Your voice works because you do not just communicate an idea. You shape how it feels.",
      balance: "Artist colors your Center by making it more recognizable. It gives your ideas a stronger sense of taste, rhythm, mood, design, language, or atmosphere. This shows up when your content feels intentionally made instead of simply posted.",
      inverse: "Artist adds craft people may not expect from you. When your content starts feeling too plain, functional, or mechanical, this layer gives it specificity. It helps the work feel more beautiful, more considered, and more unmistakably yours.",
    },
    oneLiner: {
      core: "You lead by shaping how ideas feel.",
      balance: "You shape your center through taste and atmosphere.",
      inverse: "You add unexpected beauty through craft.",
    },
    chordSummaryFragment: "Artist brings taste, mood, beauty, and interpretation to the chord.",
    contentQuestion: {
      core: "Does this idea feel visually, emotionally, or stylistically distinct?",
      balance: "Would stronger taste make my Center more recognizable?",
      inverse: "Where could this feel more crafted, specific, or unmistakably mine?",
    },
    contentPrompt: "Write about something you think is beautiful, overlooked, or poorly interpreted. Describe what others miss and what you see instead.",
  },
  strategist: {
    extendedDescription: {
      core: "Your strongest content usually shows people the system underneath the surface. You connect decisions to outcomes, patterns to behavior, and small moves to bigger consequences. Your voice works because you help people stop reacting and start seeing the game.",
      balance: "Strategist colors your Center by giving it intention. It makes creative ideas feel more purposeful, emotional ideas feel more focused, and practical ideas feel tied to a larger outcome. This shows up when you explain the why, the positioning, the tradeoff, or the plan behind the idea.",
      inverse: "Strategist adds direction people may not expect from you. When your content starts feeling scattered, reactive, or purely expressive, this layer brings it back to the outcome. It helps people see that there is a reason behind the move.",
    },
    oneLiner: {
      core: "You lead by seeing the system underneath.",
      balance: "You shape your center through intention and positioning.",
      inverse: "You add unexpected direction through strategy.",
    },
    chordSummaryFragment: "Strategist brings direction, positioning, planning, and systems-level thinking to the chord.",
    contentQuestion: {
      core: "What pattern, position, or larger system am I helping people see?",
      balance: "Would showing the strategy behind this idea make my Center stronger?",
      inverse: "Where does this idea need a clearer outcome or intention?",
    },
    contentPrompt: "Write about a decision people keep making at the surface level. Show the system underneath it and explain what smarter move they should make instead.",
  },
  builder: {
    extendedDescription: {
      core: "Your strongest content usually shows something becoming real. A process, a build, an experiment, a fix, a workflow, a result. Your voice works because people can see that you are not just talking about the work. You are doing it.",
      balance: "Builder colors your Center by making it feel practical and lived-in. It helps people see how an idea gets made, tested, improved, or applied. This shows up through process, behind-the-scenes, workflows, iterations, lessons learned, and visible progress.",
      inverse: "Builder adds follow-through people may not expect from you. When your content starts feeling too theoretical, polished, or idea-heavy, this layer shows the work. It proves the concept can survive contact with reality.",
    },
    oneLiner: {
      core: "You lead by making things real.",
      balance: "You shape your center through execution and process.",
      inverse: "You add unexpected proof through follow-through.",
    },
    chordSummaryFragment: "Builder brings process, execution, momentum, and visible progress to the chord.",
    contentQuestion: {
      core: "Am I showing the work, process, or result behind this idea?",
      balance: "Would showing how this gets made make my Center more useful?",
      inverse: "Where does this idea need action, proof, or follow-through?",
    },
    contentPrompt: "Write about something you are building, testing, improving, or fixing. Show the process, the problem, and what you learned by making it real.",
  },
  philosopher: {
    extendedDescription: {
      core: "Your strongest content usually begins with a question people have been avoiding. You look for the tension underneath the obvious answer and the meaning underneath the trend. Your voice works because you help people slow down and think more honestly.",
      balance: "Philosopher colors your Center by adding nuance. It keeps your content from moving too quickly toward easy answers, quick tips, or shallow certainty. This shows up when you add context, critique, tension, contradiction, or a deeper why.",
      inverse: "Philosopher adds meaning people may not expect from you. When your content starts feeling too tactical, fast, or surface-level, this layer asks what bigger question is hiding underneath it. It gives the idea depth without making it unnecessarily complicated.",
    },
    oneLiner: {
      core: "You lead by asking the deeper question.",
      balance: "You shape your center through nuance and meaning.",
      inverse: "You add unexpected depth through reflection.",
    },
    chordSummaryFragment: "Philosopher brings depth, critique, nuance, and meaning to the chord.",
    contentQuestion: {
      core: "What deeper question is this idea really asking?",
      balance: "Would more nuance make my Center more thoughtful?",
      inverse: "Where does this idea need more meaning instead of more speed?",
    },
    contentPrompt: "Write about an obvious answer you no longer trust. Ask the deeper question, explore the tension, and explain what people miss when they rush to certainty.",
  },
};
