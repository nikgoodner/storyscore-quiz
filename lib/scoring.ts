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

const NEVER_SCORED = Number.POSITIVE_INFINITY;

function emptyScores(): Record<ArchetypeId, number> {
  return Object.fromEntries(
    ARCHETYPE_IDS.map((id) => [id, 0]),
  ) as Record<ArchetypeId, number>;
}

function emptyFirstScoredAt(): Record<ArchetypeId, number> {
  return Object.fromEntries(
    ARCHETYPE_IDS.map((id) => [id, NEVER_SCORED]),
  ) as Record<ArchetypeId, number>;
}

function recordFirstScore(
  firstScoredAt: Record<ArchetypeId, number>,
  archetypeId: ArchetypeId,
  questionIndex: number,
) {
  if (firstScoredAt[archetypeId] === NEVER_SCORED) {
    firstScoredAt[archetypeId] = questionIndex;
  }
}

function addPoints(
  scores: Record<ArchetypeId, number>,
  firstScoredAt: Record<ArchetypeId, number>,
  questionIndex: number,
  archetypeScores: Partial<Record<ArchetypeId, number>>,
) {
  for (const [archetypeId, points] of Object.entries(archetypeScores)) {
    const id = archetypeId as ArchetypeId;
    const delta = points ?? 0;
    if (delta <= 0) continue;

    scores[id] += delta;
    recordFirstScore(firstScoredAt, id, questionIndex);
  }
}

export function calculateResults(answers: QuizAnswers): QuizResult {
  const scores = emptyScores();
  const firstScoredAt = emptyFirstScoredAt();

  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    if (!question) return;

    if (question.type === "truefalse") {
      const archetypes =
        answerIndex === 0 ? question.trueArchetypes : question.falseArchetypes;

      for (const archetypeId of archetypes) {
        scores[archetypeId] += 1;
        recordFirstScore(firstScoredAt, archetypeId, questionIndex);
      }
      return;
    }

    const option = question.options[answerIndex];
    if (!option) return;

    addPoints(scores, firstScoredAt, questionIndex, option.scores);
  });

  const ranked = [...ARCHETYPE_IDS].sort((a, b) => {
    const scoreDiff = scores[b] - scores[a];
    if (scoreDiff !== 0) return scoreDiff;

    const firstScoreDiff = firstScoredAt[a] - firstScoredAt[b];
    if (firstScoreDiff !== 0) return firstScoreDiff;

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
