import Link from "next/link";
import type { ReactNode } from "react";

type StoryscoreButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function StoryscoreButton({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
}: StoryscoreButtonProps) {
  const base =
    variant === "primary" ? "storyscore-btn-primary" : "storyscore-btn-secondary";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} rounded-none px-8 py-3.5 text-sm sm:text-base ${className}`}
    >
      {children}
    </Link>
  );
}
