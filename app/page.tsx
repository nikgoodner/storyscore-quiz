import { FloatingHead } from "@/components/floating-head";
import { KeyCardsGrid } from "@/components/key-cards-grid";
import { LandingCta } from "@/components/landing-cta";

const THREE_KEYS = [
  {
    title: "CENTER",
    description: (
      <>
        Who you <span className="font-bold">really are</span>.
      </>
    ),
  },
  {
    title: "VIBE",
    description: (
      <>
        What <span className="font-bold">shapes</span> your voice.
      </>
    ),
  },
  {
    title: "TWIST",
    description: (
      <>
        The thing <span className="font-bold">no one sees</span> coming.
      </>
    ),
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
            <p className="mx-auto mt-4 max-w-[40rem] text-[0.9375rem] leading-[1.25] text-storyscore-red sm:mt-5 sm:text-[1.175rem] md:mt-6 md:text-[1.3rem] md:leading-[1.35]">
              Every voice has a chord. Three keys that play together to make you
              sound like you.{" "}
              <span className="font-bold">STORYSCORE</span>{" "}
              defines yours so you stop sounding like everyone else.
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
