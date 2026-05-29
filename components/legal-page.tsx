import { DM_Mono } from "next/font/google";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import type { ReactNode } from "react";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

type LegalPageProps = {
  content: string;
  title: string;
};

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    return getTextContent(
      (node as React.ReactElement<{ children?: ReactNode }>).props.children,
    );
  }
  return "";
}

function isMetaParagraph(children: ReactNode): boolean {
  const text = getTextContent(children).trim();
  return /^(Last Updated|Effective Date):/.test(text);
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1
      className={`${dmMono.className} mb-6 text-[1.5rem] font-bold uppercase tracking-[0.05em] text-[#FF0000] sm:text-[2rem] md:text-[2.5rem]`}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className={`${dmMono.className} mb-3 mt-10 text-base font-bold uppercase tracking-[0.08em] text-[#FF0000] sm:mt-10 sm:text-lg md:text-[1.375rem]`}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className={`${dmMono.className} mb-2 mt-6 text-sm uppercase tracking-[0.1em] text-[#FF0000] sm:text-base`}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => {
    if (isMetaParagraph(children)) {
      return (
        <p
          className={`${dmMono.className} mb-3 text-xs uppercase tracking-[0.1em] text-[#FF0000] last:mb-6 sm:text-[0.8125rem]`}
        >
          {children}
        </p>
      );
    }

    return (
      <p className="mb-4 font-sans text-sm leading-[1.65] text-[#FF0000] sm:text-[0.9375rem] md:text-base">
        {children}
      </p>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-4 list-none space-y-1.5 pl-6 sm:pl-8 [&>li]:relative [&>li]:pl-2 [&>li]:before:absolute [&>li]:before:-left-4 [&>li]:before:text-[#FF0000] [&>li]:before:content-['•'] sm:[&>li]:before:-left-5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-1.5 pl-6 font-sans text-sm leading-[1.65] text-[#FF0000] marker:text-[#FF0000] sm:pl-8 sm:text-[0.9375rem] md:text-base">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="font-sans text-sm leading-[1.65] text-[#FF0000] sm:text-[0.9375rem] md:text-base">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-[#FF0000]">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#FF0000] no-underline transition-[text-decoration] hover:underline"
    >
      {children}
    </a>
  ),
};

export function LegalPage({ content, title }: LegalPageProps) {
  return (
    <div className="flex-1 bg-white text-storyscore-red">
      <header className="legal-page-header flex items-center justify-between px-5 py-[1.125rem] sm:px-8 sm:py-6 md:px-10 md:py-8">
        <a
          href="https://www.nikgoodner.com"
          target="_blank"
          rel="noopener noreferrer"
          className="header-nikgoodner text-lg font-medium leading-none text-[#FF0000] no-underline transition-opacity hover:opacity-70 sm:text-xl md:text-2xl"
        >
          @nikgoodner
        </a>
        <a
          href="/"
          className={`header-take-test ${dmMono.className} text-[11px] font-bold uppercase tracking-[0.1em] text-[#FF0000] no-underline transition-opacity hover:opacity-70 max-[399px]:tracking-[0.05em] sm:text-xs md:text-sm`}
        >
          <span className="min-[400px]:hidden">TAKE QUIZ →</span>
          <span className="max-[399px]:hidden">TAKE THE QUIZ →</span>
        </a>
      </header>

      <div className="mx-auto w-full max-w-[720px] px-5 pb-10 sm:px-8 md:pb-16">
        <div
          className="border-t border-dashed border-[#FF0000]/40 pt-8 md:pt-12"
          aria-label={title}
        >
          <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
