import {
  ARCHETYPE_IDS,
  type ArchetypeId,
} from "./archetypes";
import { questions } from "./questions";

export type QuizAnswers = number[];

export type QuizResult = {
  core: ArchetypeId;
  balance: ArchetypeId;
  inverse: ArchetypeId;
  ranked: ArchetypeId[];
  scores: Record<ArchetypeId, number>;
};

function emptyScores(): Record<ArchetypeId, number> {
  return Object.fromEntries(
    ARCHETYPE_IDS.map((id) => [id, 0]),
  ) as Record<ArchetypeId, number>;
}

export function calculateResults(answers: QuizAnswers): QuizResult {
  const scores = emptyScores();

  answers.forEach((optionIndex, questionIndex) => {
    const question = questions[questionIndex];
    if (!question) return;

    const option = question.options[optionIndex];
    if (!option) return;

    for (const [archetypeId, points] of Object.entries(option.scores)) {
      const id = archetypeId as ArchetypeId;
      scores[id] += points ?? 0;
    }
  });

  const ranked = [...ARCHETYPE_IDS].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

  const [core, balance, inverse] = ranked;

  return {
    core,
    balance,
    inverse,
    ranked,
    scores,
  };
}
