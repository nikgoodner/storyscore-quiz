import { DM_Mono } from "next/font/google";
import Link from "next/link";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function Footer() {
  return (
    <footer
      className={`${dmMono.className} border-t border-dashed border-storyscore-red/30 px-5 py-6 sm:px-8`}
    >
      <div className="mx-auto flex max-w-[min(1100px,96vw)] flex-row flex-nowrap items-center justify-center gap-x-2 text-xs uppercase tracking-[0.1em] sm:justify-between sm:gap-x-3">
        <div className="flex items-center gap-2">
          <Link
            href="/privacy"
            className="text-storyscore-red/70 no-underline transition-colors hover:text-storyscore-red"
          >
            PRIVACY
          </Link>
          <span className="text-storyscore-red/70" aria-hidden="true">
            |
          </span>
          <Link
            href="/terms"
            className="text-storyscore-red/70 no-underline transition-colors hover:text-storyscore-red"
          >
            TERMS
          </Link>
        </div>
        <span
          className="text-storyscore-red/70 md:hidden"
          aria-hidden="true"
        >
          |
        </span>
        <p className="text-storyscore-red/70">
          © Nik Goodner 2026
        </p>
      </div>
    </footer>
  );
}
