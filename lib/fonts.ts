import localFont from "next/font/local";

/** PP Formula Condensed Bold — headlines (STORYSCORE QUIZ, CORE, BALANCE, INVERSE) */
export const displayFont = localFont({
  src: [
    {
      path: "../public/fonts/PPFormula-CondensedBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-storyscore-display",
  fallback: ["Arial Black", "Impact", "sans-serif"],
  display: "swap",
});

/** PP Neue Montreal Medium — body copy and UI text */
export const bodyFont = localFont({
  src: [
    {
      path: "../public/fonts/PPNeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-storyscore-body",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  display: "swap",
});
