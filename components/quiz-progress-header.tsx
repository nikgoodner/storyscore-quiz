import Link from "next/link";

type QuizProgressHeaderProps = {
  current: number;
  total: number;
  progress: number;
};

export function QuizProgressHeader({
  current,
  total,
  progress,
}: QuizProgressHeaderProps) {
  return (
    <header className="px-5 pt-5 sm:px-8 sm:pt-6">
      <div className="mx-auto flex w-full max-w-[min(1100px,96vw)] items-center gap-3 sm:gap-5">
        <Link
          href="/"
          className="shrink-0 text-base font-medium leading-none text-storyscore-red transition-opacity hover:opacity-70 sm:text-lg"
        >
          STORYSCORE
        </Link>

        <div className="storyscore-progress min-w-0 flex-1">
          <div className="storyscore-progress-outline" aria-hidden />
          <div
            className="storyscore-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="storyscore-body shrink-0 whitespace-nowrap text-sm tabular-nums">
          {current} / {total}
        </span>
      </div>
    </header>
  );
}
