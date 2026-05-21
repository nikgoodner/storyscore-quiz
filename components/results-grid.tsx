import { ResultsArchetypeCard } from "@/components/results-archetype-card";
import type { Archetype, ArchetypeId } from "@/lib/archetypes";
import { Fragment } from "react";

type ResultsSlot = {
  id: ArchetypeId;
  rankLabel: string;
  descriptionKey: "core" | "balance" | "inverse";
};

type ResultsGridProps = {
  ranked: readonly ResultsSlot[];
  archetypes: Record<ArchetypeId, Archetype>;
  fit?: boolean;
};

function VerticalConnector() {
  return (
    <div
      className="mx-auto my-1 h-4 w-0 shrink-0 border-l-2 border-dotted border-storyscore-red"
      aria-hidden
    />
  );
}

export function ResultsGrid({ ranked, archetypes, fit = false }: ResultsGridProps) {
  return (
    <div className="w-full">
      {ranked.map((slot, index) => (
        <Fragment key={slot.id}>
          <ResultsArchetypeCard
            rank={index + 1}
            rankLabel={slot.rankLabel}
            descriptionKey={slot.descriptionKey}
            archetype={archetypes[slot.id]}
            fit={fit}
          />
          {index < ranked.length - 1 && <VerticalConnector />}
        </Fragment>
      ))}
    </div>
  );
}
