import Image from "next/image";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end bg-white/90 p-5 md:p-8"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
    >
      <Image
        src="/ng-floating-head.png"
        alt=""
        width={56}
        height={56}
        className="h-10 w-10 animate-spin-head md:h-14 md:w-14"
        priority
      />
    </div>
  );
}
