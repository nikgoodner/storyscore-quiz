/**
 * After adding .woff2 files to public/fonts/, copy this file to lib/fonts.ts
 * and remove the Google font imports in that file.
 */
import localFont from "next/font/local";

export const displayFont = localFont({
  src: [
    {
      path: "../public/fonts/StoryscoreDisplay.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/StoryscoreDisplay-Italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-storyscore-display",
  fallback: ["Arial Black", "Impact", "sans-serif"],
  display: "swap",
});

export const bodyFont = localFont({
  src: [
    {
      path: "../public/fonts/StoryscoreBody.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-storyscore-body",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  display: "swap",
});
