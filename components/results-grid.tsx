import { ResultsArchetypeCard } from "@/components/results-archetype-card";
import { StoryscoreVerticalConnector } from "@/components/storyscore-vertical-connector";
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
          {index < ranked.length - 1 && <StoryscoreVerticalConnector />}
        </Fragment>
      ))}
    </div>
  );
}
