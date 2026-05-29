"use client";

import type { QuestionOption } from "@/lib/questions";
import Image from "next/image";

type QuizImageOptionsProps = {
  options: QuestionOption[];
  selectedAnswer?: number;
  disabled: boolean;
  questionKey: number;
  onSelect: (
    optionIndex: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
};

export function QuizImageOptions({
  options,
  selectedAnswer,
  disabled,
  questionKey,
  onSelect,
}: QuizImageOptionsProps) {
  return (
    <ul
      key={questionKey}
      className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4"
    >
      {options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const alt = option.description ?? option.label;

        return (
          <li key={`${questionKey}-${option.label}`}>
            <button
              type="button"
              disabled={disabled}
              onClick={(event) => onSelect(index, event)}
              data-selected={isSelected ? "" : undefined}
              aria-label={alt}
              className="group/image relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-dashed border-storyscore-red bg-white transition-[border-color,box-shadow,transform] duration-200 ease-out hover:scale-[1.02] hover:border-solid hover:border-white hover:shadow-[0_0_0_2px_var(--storyscore-red)] focus:outline-none active:scale-[0.98] active:border-solid active:border-white disabled:pointer-events-none data-[selected]:scale-[1.02] data-[selected]:border-solid data-[selected]:border-white data-[selected]:shadow-[0_0_0_2px_var(--storyscore-red)]"
            >
              {option.imageSrc ? (
                <Image
                  src={option.imageSrc}
                  alt={alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
