const TRAILING_EXAMPLES = /\s+\(([^)]+)\)\s*$/;

export type ParsedQuizOptionLabel = {
  main: string;
  examples: string | null;
};

/** Splits trailing parenthetical examples from the main answer line. */
export function parseQuizOptionLabel(label: string): ParsedQuizOptionLabel {
  const match = label.match(TRAILING_EXAMPLES);
  if (!match || match.index === undefined) {
    return { main: label, examples: null };
  }

  const main = label.slice(0, match.index).trim();
  return { main: main || label, examples: match[1] };
}
