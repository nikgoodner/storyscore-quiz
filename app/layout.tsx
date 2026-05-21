import type { Metadata } from "next";
import { bodyFont, displayFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "STORYSCORE Quiz",
  description:
    "Find the three keys of your communication style and turn them into a chord that's unmistakably yours.",
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
