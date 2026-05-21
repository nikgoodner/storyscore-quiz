import Link from "next/link";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function CtaButton({ href, children, className = "" }: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full bg-black px-8 py-4 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {children}
    </Link>
  );
}
