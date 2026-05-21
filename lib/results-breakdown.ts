import { archetypes, type ArchetypeId } from "./archetypes";

const SLOTS = [
  { label: "Core", key: "core" as const },
  { label: "Balance", key: "balance" as const },
  { label: "Inverse", key: "inverse" as const },
];

export function buildResultsBreakdown(
  core: ArchetypeId,
  balance: ArchetypeId,
  inverse: ArchetypeId,
) {
  const ranked = [
    { id: core, ...SLOTS[0] },
    { id: balance, ...SLOTS[1] },
    { id: inverse, ...SLOTS[2] },
  ];

  const lines = ranked.map(({ id, label, key }, index) => {
    const archetype = archetypes[id];
    return [
      `${index + 1}. ${label}: ${archetype.name} (${archetype.tagline})`,
      archetype.descriptions[key],
      `Keywords: ${archetype.keywords.join(", ")}`,
      "",
    ].join("\n");
  });

  return {
    title: "My STORYSCORE",
    text: `My STORYSCORE\n\n${lines.join("\n")}`,
    ranked,
  };
}
