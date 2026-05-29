import Link from "next/link";
import type { ReactNode } from "react";

type StoryscoreHeaderProps = {
  children?: ReactNode;
};

export function StoryscoreHeader({ children }: StoryscoreHeaderProps) {
  return (
    <header className="px-5 pt-5 sm:px-8 sm:pt-6">
      <div className="mx-auto flex w-full max-w-[min(1100px,96vw)] items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-medium leading-none text-storyscore-red transition-[text-decoration] hover:underline sm:text-xl"
        >
          STORYSCORE
        </Link>
        {children}
      </div>
    </header>
  );
}
