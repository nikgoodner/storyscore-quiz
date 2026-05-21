"use client";

import { FloatingHead } from "@/components/floating-head";
import { PageLoader } from "@/components/page-loader";
import { QuizProgressHeader } from "@/components/quiz-progress-header";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { questions } from "@/lib/questions";
import { calculateResults } from "@/lib/scoring";

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const question = questions[currentIndex];
  const total = questions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const isLast = currentIndex === total - 1;

  const transitionTo = useCallback((nextIndex: number) => {
    setVisible(false);
    window.setTimeout(() => {
      setCurrentIndex(nextIndex);
      setVisible(true);
    }, 280);
  }, []);

  const handleSelect = (
    optionIndex: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.currentTarget.blur();

    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = optionIndex;
    setAnswers(nextAnswers);

    if (isLast) {
      const { core, balance, inverse } = calculateResults(nextAnswers);
      setLoading(true);
      router.push(`/results/${core}/${balance}/${inverse}`);
      return;
    }

    transitionTo(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    transitionTo(currentIndex - 1);
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-white pb-24 text-storyscore-red sm:pb-28">
      {loading && <PageLoader />}

      <QuizProgressHeader
        current={currentIndex + 1}
        total={total}
        progress={progress}
      />

      <main className="mx-auto flex w-full min-w-0 max-w-2xl flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-16">
        <div
          className={`transition-opacity duration-300 ease-out ${
            visible ? "animate-fade-in opacity-100" : "opacity-0"
          }`}
        >
          <p className="storyscore-eyebrow">Question {currentIndex + 1}</p>
          <h2 className="storyscore-display-lg mt-4">{question.text}</h2>

          <ul
            key={currentIndex}
            className="mt-10 space-y-3 sm:mt-12 sm:space-y-4"
          >
            {question.options.map((option, index) => {
              const selected = answers[currentIndex] === index;
              return (
                <li key={`${currentIndex}-${option.label}`}>
                  <button
                    type="button"
                    onClick={(event) => handleSelect(index, event)}
                    className={`storyscore-interactive w-full rounded-2xl px-5 py-4 text-left text-[0.9rem] leading-[1.25] focus:outline-none sm:px-6 sm:py-5 sm:text-base ${
                      selected ? "storyscore-interactive--active" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="storyscore-body mt-10 text-sm transition-opacity hover:opacity-70 sm:mt-12"
          >
            ← Previous question
          </button>
        )}
      </main>

      <FloatingHead />
    </div>
  );
}
