"use client";

import type { ReactNode } from "react";

type KeyCardProps = {
  number: string;
  title: string;
  children: ReactNode;
};

export function KeyCard({ number, title, children }: KeyCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col items-center justify-start rounded-2xl border border-dashed border-storyscore-red bg-white px-4 py-6 text-center transition-[background-color,border-color] duration-500 ease-in-out hover:border-solid hover:border-white hover:bg-storyscore-red sm:px-5 sm:py-8 md:px-6 md:py-9">
      <span
        className="landing-key-number inline-flex h-[1.5rem] w-[1.5rem] shrink-0 items-center justify-center rounded-full bg-white font-sans text-[0.6rem] font-bold leading-none text-storyscore-red sm:h-[1.625rem] sm:w-[1.625rem] sm:text-[0.625rem]"
        aria-hidden
      >
        {number}
      </span>
      <h3 className="landing-card-title mt-4 text-storyscore-red transition-colors duration-500 ease-in-out group-hover:text-white sm:mt-5 md:mt-5">
        {title}
      </h3>
      <p className="mt-4 w-full px-1 text-[0.8rem] leading-[1.2] text-storyscore-red transition-colors duration-500 ease-in-out group-hover:text-white sm:mt-4 sm:text-[0.85rem] md:px-2 md:text-sm md:leading-[1.25] [&_span]:transition-colors [&_span]:duration-500 [&_span]:ease-in-out group-hover:[&_span]:text-white">
        {children}
      </p>
    </article>
  );
}
