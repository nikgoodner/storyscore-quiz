import { FloatingHead } from "@/components/floating-head";
import { KeyCardsGrid } from "@/components/key-cards-grid";
import { LandingCta } from "@/components/landing-cta";

const THREE_KEYS = [
  {
    number: "1",
    title: "CORE",
    description:
      "Your main key. The overarching vibe you give off. The thing people feel from you before they can name it.",
  },
  {
    number: "2",
    title: "BALANCE",
    description: (
      <>
        How your <span className="font-bold">Core</span> gets shaped. The
        practical lens your dominant key gets filtered through so it lands the
        way you want it to.
      </>
    ),
  },
  {
    number: "3",
    title: "INVERSE",
    description:
      "The counterweight giving your brand depth. The unexpected note that keeps your work from feeling one-dimensional.",
  },
] as const;

export default function Home() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-white text-storyscore-red">
      <header className="absolute left-0 top-0 z-10 px-5 pt-5 sm:px-8 sm:pt-6">
        <a
          href="https://www.nikgoodner.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-medium leading-none transition-opacity hover:opacity-70 sm:text-xl md:text-2xl"
        >
          @nikgoodner
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-5 pt-20 pb-24 sm:px-8 sm:py-16 sm:pb-28 md:py-20">
        <div className="flex w-full min-w-0 max-w-[min(1100px,96vw)] flex-col">
          <section className="mt-8 text-center sm:mt-0">
            <h1 className="landing-headline uppercase text-storyscore-red">
              STORYSCORE QUIZ
            </h1>
            <p className="mx-auto mt-4 max-w-[40rem] text-[0.925rem] leading-[1.2] text-storyscore-red sm:mt-5 sm:text-[1.025rem] md:mt-6 md:text-[1.125rem] md:leading-[1.25]">
              Most personal brands learn to play one key on the piano of their
              lives. The problem is that it&apos;s boring. And if you don&apos;t
              get bored hitting that one key and give up, your audience will,
              too, and leave. This is why you need to learn to play a chord. A
              combination of keys of your personality that keeps your
              communication fresh and exciting.
            </p>
          </section>

          <section className="mt-8 sm:mt-10 md:mt-12">
            <KeyCardsGrid keys={THREE_KEYS} />
          </section>

          <section className="mt-5 sm:mt-6">
            <LandingCta>Find your StoryScore →</LandingCta>
          </section>
        </div>
      </main>

      <FloatingHead />
    </div>
  );
}
