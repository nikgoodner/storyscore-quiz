import { KeyCard } from "@/components/key-card";
import { Fragment, type ReactNode } from "react";

type KeyItem = {
  number: string;
  title: string;
  description: ReactNode;
};

type KeyCardsGridProps = {
  keys: readonly KeyItem[];
};

function HorizontalConnector() {
  return (
    <div
      className="mx-2 min-w-5 max-w-10 flex-1 self-center border-t-2 border-dotted border-storyscore-red"
      aria-hidden
    />
  );
}

function VerticalConnector() {
  return (
    <div
      className="storyscore-vertical-connector mx-auto my-2 h-6 shrink-0"
      aria-hidden
    />
  );
}

export function KeyCardsGrid({ keys }: KeyCardsGridProps) {
  return (
    <>
      <div className="flex flex-col sm:hidden">
        {keys.map((key, index) => (
          <Fragment key={key.title}>
            <KeyCard number={key.number} title={key.title}>
              {key.description}
            </KeyCard>
            {index < keys.length - 1 && <VerticalConnector />}
          </Fragment>
        ))}
      </div>

      <div className="hidden w-full items-stretch sm:flex">
        {keys.map((key, index) => (
          <Fragment key={key.title}>
            {index > 0 && <HorizontalConnector />}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <KeyCard number={key.number} title={key.title}>
                {key.description}
              </KeyCard>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
