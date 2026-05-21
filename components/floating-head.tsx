import Image from "next/image";

export function FloatingHead() {
  return (
    <a
      href="https://www.nikgoodner.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex sm:bottom-6 sm:right-6"
      aria-label="Nik Goodner"
    >
      <Image
        src="/ng-floating-head.png"
        alt="Nik Goodner"
        width={80}
        height={80}
        className="animate-sway-head-slow h-14 w-auto max-w-[4.5rem] object-contain object-bottom transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-16 sm:max-w-[5rem] md:h-[4.75rem] md:max-w-[5.5rem]"
      />
    </a>
  );
}
