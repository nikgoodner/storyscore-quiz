"use client";

import Link from "next/link";
import { useState } from "react";
import { PageLoader } from "@/components/page-loader";

type LandingCtaProps = {
  children: React.ReactNode;
  className?: string;
};

export function LandingCta({ children, className = "" }: LandingCtaProps) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <PageLoader />}
      <Link
        href="/quiz"
        onClick={() => setLoading(true)}
        className={`inline-flex w-full items-center justify-center rounded-none border border-solid border-storyscore-red bg-storyscore-red px-6 py-4 text-center text-[0.95rem] font-medium text-white transition-[background-color,color,border-color] duration-500 ease-in-out hover:bg-white hover:text-storyscore-red active:bg-white active:text-storyscore-red sm:py-[1.15rem] sm:text-base md:py-5 md:text-lg ${className}`}
      >
        {children}
      </Link>
    </>
  );
}
