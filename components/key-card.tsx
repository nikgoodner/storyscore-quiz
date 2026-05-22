"use client";

import type { ReactNode } from "react";

type KeyCardProps = {
  number: number;
  title: string;
  children: ReactNode;
};

export function KeyCard({ number, title, children }: KeyCardProps) {
  return (
    <article className="group flex max-sm:min-h-[7rem] h-full min-w-0 items-center justify-center rounded-2xl border border-dashed border-storyscore-red bg-white py-0 pl-8 pr-4 text-left transition-[background-color,border-color] duration-500 ease-in-out hover:border-solid hover:border-white hover:bg-storyscore-red sm:flex-col sm:min-h-0 sm:px-5 sm:py-8 sm:text-center md:px-6 md:py-9">
      <div className="flex w-full min-w-0 flex-row items-center gap-9 sm:flex-col sm:items-center sm:gap-0">
        <span
          className="landing-key-number storyscore-rank-circle inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs sm:mb-5 sm:h-6 sm:w-6 sm:text-[0.65rem]"
          aria-hidden
        >
          {number}
        </span>
        <div className="min-w-0 flex-1 sm:w-full sm:text-center">
          <h3 className="landing-key-card-title text-storyscore-red transition-colors duration-500 ease-in-out group-hover:text-white">
            {title}
          </h3>
          <p className="mt-0.5 w-full text-[0.9375rem] leading-[1.15] text-storyscore-red transition-colors duration-500 ease-in-out group-hover:text-white sm:mt-2 sm:text-[1.025rem] sm:leading-[1.3] md:text-[1.0625rem] md:leading-[1.35] [&_span]:transition-colors [&_span]:duration-500 [&_span]:ease-in-out group-hover:[&_span]:text-white">
            {children}
          </p>
        </div>
      </div>
    </article>
  );
}
