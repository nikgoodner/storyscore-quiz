import type { Archetype } from "@/lib/archetypes";

type ResultsArchetypeCardProps = {
  rank: number;
  rankLabel: string;
  descriptionKey: "core" | "balance" | "inverse";
  archetype: Archetype;
  compact?: boolean;
  fit?: boolean;
};

export function ResultsArchetypeCard({
  rank,
  rankLabel,
  descriptionKey,
  archetype,
  compact = false,
  fit = false,
}: ResultsArchetypeCardProps) {
  if (fit) {
    return (
      <article className="rounded-2xl border border-dashed border-storyscore-red bg-white px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center gap-3">
          <span
            className="storyscore-rank-circle inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs"
            aria-hidden
          >
            {rank}
          </span>
          <div className="min-w-0 flex-1">
            <p className="storyscore-eyebrow text-[0.65rem] leading-none">{rankLabel}</p>
            <h2 className="landing-card-title mt-1.5 text-storyscore-red leading-none sm:mt-2">
              {archetype.name}
            </h2>
            <p className="storyscore-body mt-1.5 text-xs leading-[1.15] sm:mt-2 sm:text-[0.8rem]">
              <span className="font-bold">{archetype.tagline}</span>
              <span className="mx-2 opacity-40">|</span>
              <span>
                Think{" "}
                {archetype.examples.map((example, exampleIndex) => (
                  <span key={example.url}>
                    {exampleIndex > 0 && ", "}
                    <a
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-storyscore-red/40 underline-offset-2 transition-opacity hover:opacity-70"
                    >
                      {example.name}
                    </a>
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>

        <p className="storyscore-body mt-3 text-[0.8rem] leading-[1.2] sm:text-sm sm:leading-[1.25]">
          {archetype.descriptions[descriptionKey]}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {archetype.keywords.map((keyword) => (
            <li key={keyword}>
              <span className="storyscore-keyword inline-block rounded-full px-2.5 py-0.5 text-[0.65rem]">
                {keyword}
              </span>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  if (compact) {
    return (
      <article className="flex flex-col rounded-xl border border-dashed border-storyscore-red bg-white px-3 py-3 sm:px-3.5 sm:py-3.5">
        <div className="flex items-center gap-2">
          <span
            className="storyscore-rank-circle inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[0.65rem] sm:h-7 sm:w-7 sm:text-xs"
            aria-hidden
          >
            {rank}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.1em] text-storyscore-red">
              {rankLabel}
            </p>
            <h2 className="font-display text-lg leading-none font-bold text-storyscore-red sm:text-xl">
              {archetype.name}
            </h2>
            <p className="mt-1 text-[0.65rem] font-bold leading-[1.2] text-storyscore-red sm:text-[0.7rem]">
              {archetype.tagline}
            </p>
          </div>
        </div>

        <p className="mt-2 text-[0.65rem] leading-[1.2] text-storyscore-red sm:text-[0.7rem] sm:leading-[1.25]">
          {archetype.descriptions[descriptionKey]}
        </p>

        <ul className="mt-2 flex flex-wrap gap-1">
          {archetype.keywords.map((keyword) => (
            <li key={keyword}>
              <span className="inline-block rounded-full border border-dashed border-storyscore-red px-2 py-0.5 text-[0.6rem] text-storyscore-red">
                {keyword}
              </span>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-dashed border-storyscore-red bg-white px-5 py-7 sm:px-7 sm:py-8">
      <div className="flex items-center gap-4">
        <span
          className="storyscore-rank-circle inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm sm:h-9 sm:w-9"
          aria-hidden
        >
          {rank}
        </span>
        <div className="min-w-0 flex-1">
          <p className="storyscore-eyebrow">{rankLabel}</p>
          <h2 className="landing-card-title mt-2 text-storyscore-red">
            {archetype.name}
          </h2>
          <p className="storyscore-body mt-2 text-sm leading-[1.25]">
            <span className="font-bold">{archetype.tagline}</span>
            <span className="mx-2 opacity-40">|</span>
            <span>
              Think{" "}
              {archetype.examples.map((example, exampleIndex) => (
                <span key={example.url}>
                  {exampleIndex > 0 && ", "}
                  <a
                    href={example.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-storyscore-red/40 underline-offset-2 transition-opacity hover:opacity-70"
                  >
                    {example.name}
                  </a>
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>

      <p className="storyscore-body mt-6 text-[0.9rem] leading-[1.25] sm:text-base">
        {archetype.descriptions[descriptionKey]}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {archetype.keywords.map((keyword) => (
          <li key={keyword}>
            <span className="storyscore-keyword inline-block rounded-full px-3 py-1">
              {keyword}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
