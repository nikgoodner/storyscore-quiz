"use client";

import { useEffect, useId, useRef } from "react";

type ShareChordModalProps = {
  isOpen: boolean;
  isClosing: boolean;
  imageReady: boolean;
  imageError: string | null;
  resultsUrl: string;
  nativeShareSupported: boolean;
  onClose: () => void;
  onDownload: () => void;
  onShareInstagram: () => void;
  onShareX: () => void;
  onShareFacebook: () => void;
};

const shareButtonClass =
  "storyscore-btn-primary w-full rounded-none px-8 py-3 text-sm disabled:cursor-wait disabled:opacity-60";

export function ShareChordModal({
  isOpen,
  isClosing,
  imageReady,
  imageError,
  resultsUrl,
  nativeShareSupported,
  onClose,
  onDownload,
  onShareInstagram,
  onShareX,
  onShareFacebook,
}: ShareChordModalProps) {
  const headingId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen || isClosing) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const getFocusableElements = () => {
      if (!panelRef.current) {
        return [];
      }
      return Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isClosing, onClose]);

  if (!isOpen && !isClosing) {
    return null;
  }

  const buttonsDisabled = !imageReady;
  const instagramHelperText = nativeShareSupported
    ? "Tap to share, then pick Instagram."
    : "Download, then post from Instagram.";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-5 py-8 ${
        isClosing ? "share-modal-backdrop-out" : "share-modal-backdrop-in"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      aria-hidden={isClosing}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className={`relative w-full max-w-md rounded-lg bg-white p-6 sm:p-8 ${
          isClosing ? "share-modal-panel-out" : "share-modal-panel-in"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-xl leading-none text-storyscore-red transition-opacity hover:opacity-70"
          aria-label="Close share modal"
        >
          ✕
        </button>

        <h2
          id={headingId}
          className="storyscore-display-lg pr-8 text-storyscore-red"
        >
          Share your chord
        </h2>
        <p className="storyscore-body mt-3 text-sm text-storyscore-red">
          Pick a platform, or download the image to post wherever.
        </p>

        {imageError && (
          <p className="mt-4 text-sm text-storyscore-red">{imageError}</p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            className={shareButtonClass}
            disabled={buttonsDisabled}
            onClick={onDownload}
          >
            {imageReady ? "Download image →" : "Preparing image…"}
          </button>

          <div>
            <button
              type="button"
              className={shareButtonClass}
              disabled={buttonsDisabled}
              onClick={onShareInstagram}
            >
              {imageReady ? "Share to Instagram →" : "Preparing image…"}
            </button>
            <p className="storyscore-body mt-2 text-xs text-storyscore-red">
              {instagramHelperText}
            </p>
          </div>

          <button
            type="button"
            className={shareButtonClass}
            disabled={buttonsDisabled}
            onClick={onShareX}
          >
            {imageReady ? "Share to X →" : "Preparing image…"}
          </button>

          <button
            type="button"
            className={shareButtonClass}
            disabled={buttonsDisabled}
            onClick={onShareFacebook}
          >
            {imageReady ? "Share to Facebook →" : "Preparing image…"}
          </button>
        </div>

        <p className="sr-only">Results page URL: {resultsUrl}</p>
      </div>
    </div>
  );
}
