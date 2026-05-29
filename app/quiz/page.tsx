"use client";

import { FloatingHead } from "@/components/floating-head";
import { PageLoader } from "@/components/page-loader";
import { QuizAnswerOption } from "@/components/quiz-answer-option";
import { QuizImageOptions } from "@/components/quiz-image-options";
import { QuizProgressHeader } from "@/components/quiz-progress-header";
import { QuizTrueFalseOptions } from "@/components/quiz-true-false-options";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { questions } from "@/lib/questions";
import { calculateResults } from "@/lib/scoring";

/** Delay after selection before advancing — tweak if feedback feels too fast or slow. */
const SELECTION_FEEDBACK_MS = 350;

function questionPromptText(question: (typeof questions)[number]): string {
  return question.type === "truefalse"
    ? `\u201C${question.text}\u201D`
    : question.text;
}

/** Width in `ch` so prompts wrap to ~2 balanced lines without dangling words. */
function questionPromptMaxWidth(text: string): string {
  const charCount = text.length;
  const targetCh = Math.min(36, Math.max(14, Math.ceil(charCount / 2)));
  return `${targetCh}ch`;
}

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const question = questions[currentIndex];
  const total = questions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const isLast = currentIndex === total - 1;
  const selectedAnswer = answers[currentIndex];
  const isImageQuestion = question.type === "image";
  const isWideTextQuestion = question.id === "q3";

  const transitionTo = useCallback((nextIndex: number) => {
    setVisible(false);
    window.setTimeout(() => {
      setCurrentIndex(nextIndex);
      setVisible(true);
      setIsAdvancing(false);
    }, 280);
  }, []);

  const handleSelect = (
    optionIndex: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (isAdvancing) {
      return;
    }

    event.currentTarget.blur();

    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = optionIndex;
    setAnswers(nextAnswers);
    setIsAdvancing(true);

    window.setTimeout(() => {
      if (isLast) {
        const { core, balance, inverse } = calculateResults(nextAnswers);
        setLoading(true);
        router.push(`/results/${core}/${balance}/${inverse}`);
        return;
      }

      transitionTo(currentIndex + 1);
    }, SELECTION_FEEDBACK_MS);
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    transitionTo(currentIndex - 1);
  };

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden bg-white pb-24 text-storyscore-red sm:pb-28">
      {loading && <PageLoader />}

      <QuizProgressHeader
        current={currentIndex + 1}
        total={total}
        progress={progress}
      />

      <main
        className={`mx-auto flex w-full min-w-0 flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-16 ${
          isImageQuestion
            ? "max-w-4xl"
            : isWideTextQuestion
              ? "max-w-2xl sm:max-w-3xl"
              : "max-w-2xl"
        }`}
      >
        <div
          className={`transition-opacity duration-300 ease-out ${
            visible ? "animate-fade-in opacity-100" : "opacity-0"
          }`}
        >
          <header className="mx-auto w-full text-center">
            <p className="storyscore-eyebrow">Question {currentIndex + 1}</p>
            <h2
              className="storyscore-display-xl mx-auto mt-5 text-balance leading-[0.95] sm:mt-6"
              style={{
                maxWidth: questionPromptMaxWidth(questionPromptText(question)),
              }}
            >
              {questionPromptText(question)}
            </h2>
          </header>

          {question.type === "image" && (
            <QuizImageOptions
              options={question.options}
              selectedAnswer={selectedAnswer}
              disabled={isAdvancing}
              questionKey={currentIndex}
              onSelect={handleSelect}
            />
          )}

          {question.type === "text" && (
            <ul
              key={currentIndex}
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:gap-4"
            >
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isRichText = question.id === "q1";
                return (
                  <li key={`${currentIndex}-${option.label}`}>
                    <QuizAnswerOption
                      label={option.label}
                      title={option.title}
                      description={option.description}
                      examples={option.examples}
                      variant={isRichText ? "rich" : "simple"}
                      selected={isSelected}
                      disabled={isAdvancing}
                      onSelect={(event) => handleSelect(index, event)}
                    />
                  </li>
                );
              })}
            </ul>
          )}

          {question.type === "truefalse" && (
            <QuizTrueFalseOptions
              selectedAnswer={selectedAnswer}
              disabled={isAdvancing}
              onSelect={handleSelect}
            />
          )}
        </div>

        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="storyscore-body mt-10 text-sm text-storyscore-red transition-[text-decoration] hover:underline sm:mt-12"
          >
            ← Previous question
          </button>
        )}
      </main>

      <FloatingHead />
    </div>
  );
}
