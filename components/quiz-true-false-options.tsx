"use client";

type QuizTrueFalseOptionsProps = {
  selectedAnswer?: number;
  disabled: boolean;
  onSelect: (
    optionIndex: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
};

const optionClassName =
  "quiz-answer-option group/answer flex w-full min-h-11 items-center justify-center rounded-2xl border border-dashed border-storyscore-red bg-white px-4 py-4 text-center text-storyscore-red transition-[background-color,border-color,color] duration-200 ease-out hover:border-solid hover:border-white hover:bg-storyscore-red hover:text-white focus:outline-none active:border-solid active:border-white active:bg-storyscore-red active:text-white disabled:pointer-events-none data-[selected]:border-solid data-[selected]:border-white data-[selected]:bg-storyscore-red data-[selected]:text-white sm:min-h-[3rem] sm:px-6 sm:py-5";

export function QuizTrueFalseOptions({
  selectedAnswer,
  disabled,
  onSelect,
}: QuizTrueFalseOptionsProps) {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
      {(["True", "False"] as const).map((label, index) => (
        <button
          key={label}
          type="button"
          disabled={disabled}
          onClick={(event) => onSelect(index, event)}
          data-selected={selectedAnswer === index ? "" : undefined}
          className={optionClassName}
        >
          <span className="text-[1rem] font-normal leading-[1.35] sm:text-[1.0625rem] sm:leading-[1.4]">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
