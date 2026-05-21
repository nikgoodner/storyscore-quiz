import { FloatingHead } from "@/components/floating-head";
import { ResultsActions } from "@/components/results-actions";
import { ResultsGrid } from "@/components/results-grid";
import { ResultsShareChord } from "@/components/results-share-chord";
import { StoryscoreButton } from "@/components/storyscore-button";
import { archetypes, isArchetypeId } from "@/lib/archetypes";
import { generateShareImageUrl } from "@/lib/share-image";
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

const PRODUCTION_SITE_URL = "https://quiz.nikgoodner.com";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? PRODUCTION_SITE_URL;
}

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

  const imageUrl = await generateShareImageUrl(core, balance, inverse);
  const openGraphImages = imageUrl ? [{ url: imageUrl }] : [];
  const twitterImages = imageUrl ? [imageUrl] : [];

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages,
    },
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

  const resultsUrl = `${getSiteUrl()}/results/${core}/${balance}/${inverse}`;
  const shareImageUrl = await generateShareImageUrl(core, balance, inverse);

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-white text-storyscore-red">
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

      <main className="flex w-full flex-1 flex-col items-center px-5 pt-20 pb-28 sm:px-8 sm:py-14 sm:pb-32">
        <div className="w-full max-w-3xl min-w-0">
          <div className="text-left mt-8 sm:mt-0">
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
            <ResultsShareChord
              core={core}
              balance={balance}
              inverse={inverse}
              resultsUrl={resultsUrl}
              initialImageUrl={shareImageUrl}
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
