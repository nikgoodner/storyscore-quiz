import type { ReactNode } from "react";

const TRAILING_EMOJI =
  /(\s)([\p{Extended_Pictographic}\p{Emoji_Modifier}\p{Emoji_Component}\u200d\ufe0f]+)$/u;

const TRAILING_WORD_EMOJI =
  /^(.*?)((?:\S+\s+){0,2}\S+\u00a0[\p{Extended_Pictographic}\p{Emoji_Modifier}\p{Emoji_Component}\u200d\ufe0f]+)$/u;

/** Replaces the space before a trailing emoji so it stays on the same line as the preceding word. */
export function preventEmojiOrphan(text: string): string {
  return text.replace(TRAILING_EMOJI, "\u00a0$2");
}

/** Renders option text with the last word and trailing emoji kept on one line. */
export function QuizOptionText({ text }: { text: string }): ReactNode {
  const normalized = preventEmojiOrphan(text);
  const match = normalized.match(TRAILING_WORD_EMOJI);

  if (!match) {
    return normalized;
  }

  return (
    <>
      {match[1]}
      <span className="whitespace-nowrap">{match[2]}</span>
    </>
  );
}
