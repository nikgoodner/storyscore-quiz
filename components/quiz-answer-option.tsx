"use client";

import { QuizOptionText } from "@/lib/prevent-emoji-orphan";

type QuizAnswerOptionProps = {
  label: string;
  title?: string;
  description?: string;
  examples?: string;
  variant?: "simple" | "rich";
  selected: boolean;
  disabled: boolean;
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const optionClassName =
  "quiz-answer-option group/answer flex w-full min-h-11 items-center gap-3.5 rounded-2xl border border-dashed border-storyscore-red bg-white px-4 py-4 text-left text-storyscore-red transition-[background-color,border-color,color] duration-200 ease-out hover:border-solid hover:border-white hover:bg-storyscore-red hover:text-white focus:outline-none active:border-solid active:border-white active:bg-storyscore-red active:text-white disabled:pointer-events-none data-[selected]:border-solid data-[selected]:border-white data-[selected]:bg-storyscore-red data-[selected]:text-white sm:min-h-[3rem] sm:gap-4 sm:px-6 sm:py-5";

const hoverTextTransition =
  "transition-colors duration-200 ease-out group-hover/answer:text-white group-active/answer:text-white group-data-[selected]/answer:text-white";

function SelectionIndicator() {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-storyscore-red bg-white transition-[background-color,border-color] duration-200 ease-out group-hover/answer:border-white group-hover/answer:bg-white group-active/answer:border-white group-active/answer:bg-white group-data-[selected]/answer:border-white group-data-[selected]/answer:bg-white sm:h-[1.375rem] sm:w-[1.375rem]"
      aria-hidden
    >
      <svg
        className="block h-2.5 w-2.5 text-storyscore-red opacity-0 transition-opacity duration-200 ease-out group-hover/answer:opacity-100 group-active/answer:opacity-100 group-data-[selected]/answer:opacity-100 sm:h-3 sm:w-3"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function QuizAnswerOption({
  label,
  title,
  description,
  examples,
  variant = "simple",
  selected,
  disabled,
  onSelect,
}: QuizAnswerOptionProps) {
  const isRich = variant === "rich";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      data-selected={selected ? "" : undefined}
      className={optionClassName}
    >
      <SelectionIndicator />
      <span className="min-w-0 flex-1">
        {isRich && title && description && examples ? (
          <span className="flex flex-col gap-0.5 sm:gap-1">
            <span
              className={`font-display block text-[1.625rem] font-bold uppercase leading-[0.92] tracking-[0.01em] text-inherit sm:text-[1.875rem] sm:leading-[0.95] ${hoverTextTransition}`}
            >
              {title}
            </span>
            <span
              className={`block text-[0.9375rem] font-normal leading-[1.15] text-inherit sm:text-[1rem] sm:leading-[1.2] ${hoverTextTransition}`}
            >
              {description}
            </span>
            <span
              className="font-aeonik-fono block text-[0.6875rem] font-medium leading-[1.15] text-inherit group-hover/answer:text-white/80 group-active/answer:text-white/80 group-data-[selected]/answer:text-white/80 sm:text-[0.75rem]"
            >
              {examples}
            </span>
          </span>
        ) : (
          <span className="block text-[1rem] font-normal leading-[1.35] text-inherit sm:text-[1.0625rem] sm:leading-[1.4]">
            <QuizOptionText text={label} />
          </span>
        )}
      </span>
    </button>
  );
}
