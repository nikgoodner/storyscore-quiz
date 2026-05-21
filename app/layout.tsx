import type { Metadata } from "next";
import { bodyFont, displayFont } from "@/lib/fonts";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://storyscore.nikgoodner.com";
const ogImageUrl = `${siteUrl.replace(/\/$/, "")}/og-image.png`;

export const metadata: Metadata = {
  title: "StoryScore | Find your personal brand chord",
  description:
    "Every voice has a chord. Take the free quiz to find yours: three archetypes that show how your content actually plays.",
  openGraph: {
    title: "StoryScore | Find your personal brand chord",
    description:
      "Every voice has a chord. Take the free quiz to find yours: three archetypes that show how your content actually plays.",
    url: siteUrl,
    siteName: "StoryScore",
    images: [
      {
        url: ogImageUrl,
        width: 1920,
        height: 1080,
        alt: "StoryScore: Find your personal brand chord",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoryScore | Find your personal brand chord",
    description:
      "Every voice has a chord. Take the free quiz to find yours: three archetypes that show how your content actually plays.",
    images: [ogImageUrl],
    creator: "@nikgoodner",
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-black">
        {children}
      </body>
    </html>
  );
}
