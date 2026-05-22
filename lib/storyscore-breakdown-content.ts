import { archetypes, type ArchetypeId } from "@/lib/archetypes";
import { emailCopy } from "@/lib/emailCopy";
import { getUnsubscribeUrl } from "@/lib/site-url";

export type StoryscoreBreakdownEmailData = {
  firstName: string;
  coreId: ArchetypeId;
  balanceId: ArchetypeId;
  inverseId: ArchetypeId;
  recipientEmail: string;
};

export function withoutEmDashes(text: string): string {
  return text.replace(/\u2014/g, "-").replace(/\u2013/g, "-");
}

export function extractActionsKeepingCapitalization(text: string): string {
  const match = text.match(/\.\s+/);
  if (!match || match.index === undefined) {
    return text;
  }
  return text.slice(match.index + match[0].length);
}

export function buildChordOneLiner(
  coreId: ArchetypeId,
  balanceId: ArchetypeId,
  inverseId: ArchetypeId,
): string {
  return withoutEmDashes(
    [
      emailCopy[coreId].oneLiner.core,
      emailCopy[balanceId].oneLiner.balance,
      emailCopy[inverseId].oneLiner.inverse,
    ].join(" "),
  );
}

export function stripFirstWord(fragment: string): string {
  return fragment.split(" ").slice(1).join(" ");
}

function formatThinkExamples(archetypeId: ArchetypeId): string {
  return archetypes[archetypeId].examples
    .map((example) => `${example.name} (${example.url})`)
    .join(", ");
}

function formatArchetypeSection(
  rankLabel: string,
  archetypeId: ArchetypeId,
  descriptionKey: "core" | "balance" | "inverse",
): string {
  const archetype = archetypes[archetypeId];
  const extended = emailCopy[archetypeId].extendedDescription[descriptionKey];

  return [
    `${rankLabel}: ${archetype.name.toUpperCase()}`,
    "",
    archetype.tagline.toUpperCase(),
    "",
    withoutEmDashes(archetype.descriptions[descriptionKey]),
    "",
    withoutEmDashes(extended),
    "",
    `KEYWORDS: ${archetype.keywords.join(", ").toUpperCase()}`,
    `THINK: ${formatThinkExamples(archetypeId)}`,
  ].join("\n");
}

export function buildStoryscoreBreakdownText({
  firstName,
  coreId,
  balanceId,
  inverseId,
  recipientEmail,
}: StoryscoreBreakdownEmailData): string {
  const core = archetypes[coreId];
  const balance = archetypes[balanceId];
  const inverse = archetypes[inverseId];
  const chordOneLiner = buildChordOneLiner(coreId, balanceId, inverseId);
  const balanceActions = extractActionsKeepingCapitalization(
    emailCopy[balanceId].contentPrompt,
  );
  const inverseActions = extractActionsKeepingCapitalization(
    emailCopy[inverseId].contentPrompt,
  );

  const puttingItTogether = [
    `${core.name} ${withoutEmDashes(stripFirstWord(emailCopy[coreId].chordSummaryFragment))}`,
    `${balance.name} ${withoutEmDashes(stripFirstWord(emailCopy[balanceId].chordSummaryFragment))}`,
    `${inverse.name} ${withoutEmDashes(stripFirstWord(emailCopy[inverseId].chordSummaryFragment))}`,
  ].join(" ");

  return [
    "@nikgoodner",
    "",
    `UNDERSTANDING ${firstName.toUpperCase()}'S STORYSCORE`,
    "",
    "STORYSCORE CARD",
    "",
    `CORE: ${core.name.toUpperCase()}`,
    `BALANCE: ${balance.name.toUpperCase()}`,
    `INVERSE: ${inverse.name.toUpperCase()}`,
    "",
    "WHAT THIS MEANS:",
    "",
    chordOneLiner,
    "",
    "That's the music of your personal brand.",
    "",
    formatArchetypeSection("YOUR CORE", coreId, "core"),
    "",
    formatArchetypeSection("YOUR BALANCE", balanceId, "balance"),
    "",
    formatArchetypeSection("YOUR INVERSE", inverseId, "inverse"),
    "",
    "PUTTING IT ALL TOGETHER:",
    "",
    puttingItTogether,
    "",
    "TRY THIS OUT THIS WEEK:",
    "",
    "YOUR PROMPT",
    "",
    withoutEmDashes(emailCopy[coreId].contentPrompt),
    "",
    `Then ${withoutEmDashes(balanceActions)}`,
    "",
    `Finally, ${withoutEmDashes(inverseActions)}`,
    "",
    "Write it. Record it. Sketch it. Turn it into a post. Don't overthink it.",
    "",
    "Your StoryScore is not here to trap you inside a type. It's here to give you language for the way your voice already works.",
    "",
    "Good stories have good music. Now you know your chord.",
    "",
    "@nikgoodner",
    "https://nikgoodner.com",
    "",
    `Unsubscribe: ${getUnsubscribeUrl(recipientEmail)}`,
    "",
    "Orlando, Florida",
  ].join("\n\n");
}
