import { FloatingHead } from "@/components/floating-head";
import { ResultsCompletionLogger } from "@/components/results-completion-logger";
import { ResultsActions } from "@/components/results-actions";
import { ResultsGrid } from "@/components/results-grid";
import { ResultsDownloadStoryscore } from "@/components/results-download-storyscore";
import { StoryscoreButton } from "@/components/storyscore-button";
import { archetypes, isArchetypeId } from "@/lib/archetypes";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ResultsPageProps = {
  params: Promise<{
    core: string;
    balance: string;
    inverse: string;
  }>;
};

const SLOTS = [
  { rankLabel: "Core", descriptionKey: "core" as const },
  { rankLabel: "Balance", descriptionKey: "balance" as const },
  { rankLabel: "Inverse", descriptionKey: "inverse" as const },
];

export async function generateMetadata({
  params,
}: ResultsPageProps): Promise<Metadata> {
  const { core, balance, inverse } = await params;

  if (
    !isArchetypeId(core) ||
    !isArchetypeId(balance) ||
    !isArchetypeId(inverse)
  ) {
    return {};
  }

  const coreArchetype = archetypes[core];
  const balanceArchetype = archetypes[balance];
  const inverseArchetype = archetypes[inverse];

  const title = `My StoryScore: ${coreArchetype.name} / ${balanceArchetype.name} / ${inverseArchetype.name}`;
  const description = `I lead with ${coreArchetype.name.toLowerCase()}. I shape my voice through ${balanceArchetype.name.toLowerCase()}. I add depth through ${inverseArchetype.name.toLowerCase()}.`;

  return {
    title,
    description,
  };
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { core, balance, inverse } = await params;

  if (
    !isArchetypeId(core) ||
    !isArchetypeId(balance) ||
    !isArchetypeId(inverse)
  ) {
    notFound();
  }

  const ranked = [
    { id: core, ...SLOTS[0] },
    { id: balance, ...SLOTS[1] },
    { id: inverse, ...SLOTS[2] },
  ] as const;

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-white text-storyscore-red">
      <ResultsCompletionLogger core={core} balance={balance} inverse={inverse} />
      <header className="absolute left-0 top-0 z-10 px-5 pt-4 sm:px-8 sm:pt-5">
        <a
          href="https://www.nikgoodner.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-medium leading-none transition-opacity hover:opacity-70 sm:text-xl"
        >
          @nikgoodner
        </a>
      </header>

      <main className="flex w-full flex-1 flex-col items-center px-5 pt-20 pb-28 sm:px-8 sm:pt-28 sm:pb-32 md:pt-32">
        <div className="w-full max-w-3xl min-w-0">
          <div className="text-left mt-8 sm:mt-10 md:mt-0">
            <h1 className="font-display text-7xl font-bold uppercase leading-[0.85] text-storyscore-red md:text-8xl">
              Your STORYSCORE
            </h1>
            <p className="storyscore-results-intro mt-4 max-w-3xl">
              Your three keys, ranked from dominant to complementary. The chord your
              content / communication style actually plays.
            </p>
          </div>

          <div className="mt-5 sm:mt-6">
            <ResultsGrid ranked={ranked} archetypes={archetypes} fit />
          </div>

          <div className="mt-5 sm:mt-6">
            <ResultsActions core={core} balance={balance} inverse={inverse} fit />
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-dashed border-storyscore-red pt-8 sm:mt-10 sm:pt-10 sm:flex-row sm:gap-3">
            <ResultsDownloadStoryscore
              core={core}
              balance={balance}
              inverse={inverse}
            />
            <StoryscoreButton
              href="/quiz"
              variant="secondary"
              className="w-full py-3 text-sm sm:flex-1"
            >
              Retake Quiz →
            </StoryscoreButton>
          </div>
        </div>
      </main>

      <FloatingHead />
    </div>
  );
}
