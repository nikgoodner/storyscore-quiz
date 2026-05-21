"use client";

import type { ArchetypeId } from "@/lib/archetypes";
import { useCallback, useRef, useState } from "react";
import { ShareChordModal } from "@/components/share-chord-modal";

type ResultsShareChordProps = {
  core: ArchetypeId;
  balance: ArchetypeId;
  inverse: ArchetypeId;
  resultsUrl: string;
  initialImageUrl?: string | null;
};

const CLOSE_ANIMATION_MS = 200;

function detectNativeShareSupport(): boolean {
  if (typeof navigator === "undefined" || !navigator.share || !navigator.canShare) {
    return false;
  }

  try {
    const testFile = new File([new Blob([""])], "storyscore.png", {
      type: "image/png",
    });
    return navigator.canShare({ files: [testFile] });
  } catch {
    return false;
  }
}

export function ResultsShareChord({
  core,
  balance,
  inverse,
  resultsUrl,
  initialImageUrl = null,
}: ResultsShareChordProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);
  const [imageReady, setImageReady] = useState(Boolean(initialImageUrl));
  const [imageError, setImageError] = useState<string | null>(null);
  const [nativeShareSupported] = useState(detectNativeShareSupport);

  const fetchShareImage = useCallback(async () => {
    setImageError(null);

    try {
      const response = await fetch(
        `/api/generate-share-image?core=${core}&balance=${balance}&inverse=${inverse}`,
      );
      const data = await response.json();

      if (!response.ok || !data.image_url) {
        setImageError(data.error ?? "Could not prepare share image. Try again.");
        setImageReady(false);
        return;
      }

      setImageUrl(data.image_url);
      setImageReady(true);
    } catch {
      setImageError("Could not prepare share image. Try again.");
      setImageReady(false);
    }
  }, [core, balance, inverse]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      triggerRef.current?.focus();
    }, CLOSE_ANIMATION_MS);
  }, []);

  const openModal = () => {
    if (!imageReady && !imageError) {
      void fetchShareImage();
    }
    setIsOpen(true);
  };

  const getImageFile = async (): Promise<File | null> => {
    if (!imageUrl) {
      return null;
    }

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], "storyscore.png", { type: "image/png" });
  };

  const downloadImage = async () => {
    const file = await getImageFile();
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `storyscore-${core}-${balance}-${inverse}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  };

  const shareToInstagram = async () => {
    if (!imageUrl) {
      return;
    }

    if (
      nativeShareSupported &&
      typeof navigator.share === "function" &&
      typeof navigator.canShare === "function"
    ) {
      try {
        const file = await getImageFile();
        if (!file) {
          return;
        }

        const shareData = { files: [file], title: "My StoryScore" };
        if (!navigator.canShare(shareData)) {
          await downloadImage();
          return;
        }

        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        await downloadImage();
        return;
      }
    }

    await downloadImage();
  };

  const shareToX = () => {
    const text = "My StoryScore chord is in.";
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(resultsUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  const shareToFacebook = () => {
    const intentUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resultsUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openModal}
        className="storyscore-btn-primary w-full rounded-none px-8 py-3 text-sm sm:flex-1"
      >
        Share your chord →
      </button>

      <ShareChordModal
        isOpen={isOpen}
        isClosing={isClosing}
        imageReady={imageReady}
        imageError={imageError}
        resultsUrl={resultsUrl}
        onClose={closeModal}
        nativeShareSupported={nativeShareSupported}
        onDownload={downloadImage}
        onShareInstagram={shareToInstagram}
        onShareX={shareToX}
        onShareFacebook={shareToFacebook}
      />
    </>
  );
}
