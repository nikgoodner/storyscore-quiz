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
  // Example: "You lead with story. You shape your core voice through proof. You add unexpected belonging through community."
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
      core: "This means your strongest content probably starts with a moment, a memory, a tension, a character, or a shift in perspective. You're not just here to explain what happened. You're here to make people care.",
      balance: "This means your best content gets stronger when you add examples, moments, or lived experience. Story helps your ideas travel because people can picture what you mean.",
      inverse: "This means story is often your secret layer. When your content feels too tactical or intellectual, bring it back to a person, a scene, or a moment people can feel.",
    },
    oneLiner: {
      core: "You lead with story.",
      balance: "You shape your core voice through story.",
      inverse: "You add unexpected depth through story.",
    },
    chordSummaryFragment: "Storyteller brings narrative, emotion, and human context to the chord.",
    contentQuestion: {
      core: "Am I turning this idea into a scene, moment, or example people can feel?",
      balance: "Would a story make my core idea easier to remember?",
      inverse: "Where is the human moment behind this idea?",
    },
    contentPrompt: "Write about a moment when something small revealed something bigger. What happened, what did it teach you, and why should your audience care?",
  },
  cowboy: {
    extendedDescription: {
      core: "This means your strongest content probably speaks up for people who feel overlooked, misunderstood, or exhausted. You're not just sharing ideas. You're trying to protect something that matters.",
      balance: "This means your best content gets stronger when people can feel the heart underneath it. Even sharp ideas land better when the audience knows you're trying to help, not just prove a point.",
      inverse: "This means care is the layer that softens your edge. When your content feels too intense, bring it back to the person you're trying to serve.",
    },
    oneLiner: {
      core: "You lead with care.",
      balance: "You shape your core voice through warmth.",
      inverse: "You add unexpected heart through protection.",
    },
    chordSummaryFragment: "Cowboy brings warmth, care, and grounded protection to the chord.",
    contentQuestion: {
      core: "Who am I protecting, defending, or helping with this idea?",
      balance: "Would more warmth make my core idea easier to trust?",
      inverse: "Where can I show people I'm trying to help, not just be right?",
    },
    contentPrompt: "Write about something your audience is tired of carrying alone. Name the weight, defend the person, and give them one grounded truth to hold onto.",
  },
  pirate: {
    extendedDescription: {
      core: "This means your strongest content probably starts with a tension, a contradiction, or a belief you want to challenge. You're not here to blend in. You're here to make people question the rules they've been following.",
      balance: "This means your best content gets stronger when you add a clear point of view. You don't need to be controversial for attention, but you do need to name what feels stale, false, or overdone.",
      inverse: "This means your edge may be quiet, but it matters. When your content feels too safe, ask what rule needs to be questioned.",
    },
    oneLiner: {
      core: "You lead by challenging the default.",
      balance: "You shape your core voice through disruption.",
      inverse: "You add unexpected edge through rebellion.",
    },
    chordSummaryFragment: "Pirate brings tension, originality, and rule-breaking energy to the chord.",
    contentQuestion: {
      core: "What default belief, cliché, or lazy assumption am I challenging?",
      balance: "Would a stronger point of view make my core idea harder to ignore?",
      inverse: "Where is this idea too safe, polished, or agreeable?",
    },
    contentPrompt: "Write about a rule everyone follows that you think is making the work worse. Name the rule, explain why it's broken, and offer a better way forward.",
  },
  comedian: {
    extendedDescription: {
      core: "This means your strongest content probably starts with the ridiculous thing everyone recognizes but no one has named yet. You help people laugh, then realize the joke was pointing at something real.",
      balance: "This means your best content gets stronger when you add wit, surprise, or a little absurdity. Humor helps people lower their defenses long enough to hear the truth.",
      inverse: "This means humor is your pressure release valve. When your content feels too heavy, look for the human, funny, or slightly ridiculous angle.",
    },
    oneLiner: {
      core: "You lead with humor.",
      balance: "You shape your core voice through wit.",
      inverse: "You add unexpected lightness through humor.",
    },
    chordSummaryFragment: "Comedian brings humor, honesty, and sharp observation to the chord.",
    contentQuestion: {
      core: "What ridiculous truth am I helping people see?",
      balance: "Would humor help this core idea feel less heavy or lecture-y?",
      inverse: "Where could I add lightness without weakening the point?",
    },
    contentPrompt: "Write about something people take way too seriously. Make the joke first, then reveal the truth hiding underneath it.",
  },
  reporter: {
    extendedDescription: {
      core: "This means your strongest content probably starts with something you noticed, found, tested, tracked, or investigated. You don't just make claims. You show people what the claim is built on.",
      balance: "This means your best content gets stronger when you add receipts. Examples, screenshots, data, quotes, trends, and real-world observations help your audience believe you.",
      inverse: "This means proof is your stabilizer. When your content feels too abstract, bring in the evidence that shows people this is not just a feeling, it's happening.",
    },
    oneLiner: {
      core: "You lead with evidence.",
      balance: "You shape your core voice through proof.",
      inverse: "You add unexpected credibility through evidence.",
    },
    chordSummaryFragment: "Reporter brings proof, research, and credibility to the chord.",
    contentQuestion: {
      core: "What receipts, examples, or observations support this idea?",
      balance: "Would evidence make my core idea easier to trust?",
      inverse: "Where does this idea need proof instead of just opinion?",
    },
    contentPrompt: "Write about something you noticed that proves a larger trend. Show the receipt, explain what it reveals, and tell people why it matters.",
  },
  guide: {
    extendedDescription: {
      core: "This means your strongest content probably gives people a way through something. You are at your best when you can name the struggle, clarify the path, and help people take the next step.",
      balance: "This means your best content gets stronger when it includes a next step. Your audience should leave with something to try, rethink, change, or practice.",
      inverse: "This means action is your hidden gift. When your content feels too conceptual, ask what someone should actually do with it.",
    },
    oneLiner: {
      core: "You lead by helping people move forward.",
      balance: "You shape your core voice through direction.",
      inverse: "You add unexpected usefulness through guidance.",
    },
    chordSummaryFragment: "Guide brings direction, encouragement, and next steps to the chord.",
    contentQuestion: {
      core: "What next step am I helping people take?",
      balance: "Would a clearer path make my core idea easier to apply?",
      inverse: "Where does this idea need a practical next step?",
    },
    contentPrompt: "Write about a problem your audience keeps overcomplicating. Name the confusion, simplify the path, and give them one next step.",
  },
  teacher: {
    extendedDescription: {
      core: "This means your strongest content probably breaks something down, names the parts, explains the pattern, or gives people language for something they've felt but couldn't describe.",
      balance: "This means your best content gets stronger when you simplify. Give people a framework, a definition, a comparison, or a cleaner way to understand what you mean.",
      inverse: "This means clarity is the layer that helps your ideas stick. When your content feels too loose, give it shape.",
    },
    oneLiner: {
      core: "You lead with clarity.",
      balance: "You shape your core voice through teaching.",
      inverse: "You add unexpected structure through clarity.",
    },
    chordSummaryFragment: "Teacher brings clarity, structure, and simple explanation to the chord.",
    contentQuestion: {
      core: "Am I making this easier to understand?",
      balance: "Would a framework, definition, or comparison help my core idea land?",
      inverse: "Where does this idea need more structure?",
    },
    contentPrompt: "Write about something your audience misunderstands. Break it into three simple parts and give them language they can use immediately.",
  },
  connector: {
    extendedDescription: {
      core: "This means your strongest content probably sounds like, \"Have you felt this too?\" You don't just broadcast ideas. You create a space where people can recognize themselves and each other.",
      balance: "This means your best content gets stronger when you invite people into it. Ask better questions, create shared language, name the group, or make people feel like they are part of the idea.",
      inverse: "This means belonging is your hidden layer. When your content feels too focused on you, open the door and make it about us.",
    },
    oneLiner: {
      core: "You lead by bringing people together.",
      balance: "You shape your core voice through connection.",
      inverse: "You add unexpected belonging through community.",
    },
    chordSummaryFragment: "Connector brings invitation, belonging, and shared language to the chord.",
    contentQuestion: {
      core: "Am I making people feel invited into this idea?",
      balance: "Would a question, collaboration, or shared language make my core idea more relational?",
      inverse: "Where can I make this less about me and more about us?",
    },
    contentPrompt: "Write about something your audience has probably felt but hasn't said out loud. Name the shared feeling and invite them into the conversation.",
  },
  artist: {
    extendedDescription: {
      core: "This means your strongest content probably has a distinct look, tone, or atmosphere. You are not just sharing ideas. You are shaping how those ideas feel.",
      balance: "This means your best content gets stronger when it feels intentionally made. The design, language, pacing, references, and mood all help people recognize your voice.",
      inverse: "This means craft is your hidden advantage. When your content feels too utilitarian, ask how it could feel more specific, more beautiful, or more unmistakably yours.",
    },
    oneLiner: {
      core: "You lead with taste.",
      balance: "You shape your core voice through artistry.",
      inverse: "You add unexpected beauty through taste.",
    },
    chordSummaryFragment: "Artist brings taste, mood, beauty, and interpretation to the chord.",
    contentQuestion: {
      core: "Does this idea feel visually, emotionally, or stylistically distinct?",
      balance: "Would stronger taste make my core idea more recognizable?",
      inverse: "Where could this feel more crafted, specific, or unmistakably mine?",
    },
    contentPrompt: "Write about something you think is beautiful, overlooked, or poorly interpreted. Describe what others miss and what you see instead.",
  },
  strategist: {
    extendedDescription: {
      core: "This means your strongest content probably shows people what is really happening underneath the surface. You connect choices to outcomes and help people see the game behind the move.",
      balance: "This means your best content gets stronger when you show the \"why\" behind the idea. Don't just share the thought, show the plan, positioning, or decision-making underneath it.",
      inverse: "This means intention is your hidden layer. When your content feels scattered, bring it back to the outcome you're trying to create.",
    },
    oneLiner: {
      core: "You lead with strategy.",
      balance: "You shape your core voice through intention.",
      inverse: "You add unexpected direction through strategy.",
    },
    chordSummaryFragment: "Strategist brings direction, positioning, and systems-level thinking to the chord.",
    contentQuestion: {
      core: "What pattern, position, or larger system am I helping people see?",
      balance: "Would showing the strategy behind this idea make it stronger?",
      inverse: "Where does this idea need a clearer outcome?",
    },
    contentPrompt: "Write about a decision people keep making at the surface level. Show the system underneath it and explain what smarter move they should make instead.",
  },
  builder: {
    extendedDescription: {
      core: "This means your strongest content probably shows the process, the build, the experiment, the behind-the-scenes, or the result. You make people trust you because they can see you making progress.",
      balance: "This means your best content gets stronger when you show how something gets made. Process, workflow, execution, iteration, and lessons learned help people see your ideas in motion.",
      inverse: "This means making is your hidden proof. When your content feels too theoretical, show the work, the build, or the result.",
    },
    oneLiner: {
      core: "You lead by making things real.",
      balance: "You shape your core voice through execution.",
      inverse: "You add unexpected proof through follow-through.",
    },
    chordSummaryFragment: "Builder brings process, execution, and visible progress to the chord.",
    contentQuestion: {
      core: "Am I showing the work, process, or result behind this idea?",
      balance: "Would showing how this gets made make my core idea more useful?",
      inverse: "Where does this idea need action, proof, or follow-through?",
    },
    contentPrompt: "Write about something you are building, testing, improving, or fixing. Show the process, the problem, and what you learned by making it real.",
  },
  philosopher: {
    extendedDescription: {
      core: "This means your strongest content probably starts with a question, tension, contradiction, or idea people haven't fully examined yet. You are not just giving answers. You are helping people sit with better questions.",
      balance: "This means your best content gets stronger when you resist the easy answer. Add context, tension, critique, or a deeper \"why\" behind what you're saying.",
      inverse: "This means meaning is your hidden layer. When your content feels too surface-level, ask what bigger question it is really pointing toward.",
    },
    oneLiner: {
      core: "You lead with depth.",
      balance: "You shape your core voice through nuance.",
      inverse: "You add unexpected meaning through deeper questions.",
    },
    chordSummaryFragment: "Philosopher brings depth, critique, nuance, and meaning to the chord.",
    contentQuestion: {
      core: "What deeper question is this idea really asking?",
      balance: "Would more nuance make my core idea more thoughtful?",
      inverse: "Where does this idea need more meaning instead of more speed?",
    },
    contentPrompt: "Write about an obvious answer you no longer trust. Ask the deeper question, explore the tension, and explain what people miss when they rush to certainty.",
  },
};
