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
        className={`storyscore-btn-primary flex w-full rounded-none px-6 py-4 text-center text-[0.95rem] sm:py-[1.15rem] sm:text-base md:py-5 md:text-lg ${className}`}
      >
        {children}
      </Link>
    </>
  );
}
