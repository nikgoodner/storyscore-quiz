"use client";

import type { ArchetypeId } from "@/lib/archetypes";
import { useState } from "react";

type ResultsDownloadStoryscoreProps = {
  core: ArchetypeId;
  balance: ArchetypeId;
  inverse: ArchetypeId;
};

function detectCanShareFiles(): boolean {
  if (
    typeof navigator === "undefined" ||
    !navigator.share ||
    !navigator.canShare
  ) {
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

function downloadBlob(
  blob: Blob,
  core: ArchetypeId,
  balance: ArchetypeId,
  inverse: ArchetypeId,
) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `storyscore-${core}-${balance}-${inverse}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}

export function ResultsDownloadStoryscore({
  core,
  balance,
  inverse,
}: ResultsDownloadStoryscoreProps) {
  const [loading, setLoading] = useState(false);
  const [canShareFile] = useState(detectCanShareFiles);

  const buttonLabel = canShareFile
    ? "Save your StoryScore →"
    : "Download your StoryScore →";

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/generate-share-image?core=${core}&balance=${balance}&inverse=${inverse}`,
      );
      const data = await response.json();

      if (!response.ok || !data.image_url) {
        return;
      }

      const imageResponse = await fetch(data.image_url);
      const blob = await imageResponse.blob();
      const file = new File(
        [blob],
        `storyscore-${core}-${balance}-${inverse}.png`,
        { type: "image/png" },
      );

      const canShare =
        typeof navigator !== "undefined" &&
        navigator.canShare &&
        navigator.canShare({ files: [file] });

      if (canShare && typeof navigator.share === "function") {
        try {
          await navigator.share({ files: [file], title: "My StoryScore" });
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return;
          }
          downloadBlob(blob, core, balance, inverse);
        }
        return;
      }

      downloadBlob(blob, core, balance, inverse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={loading}
      className="inline-flex w-full items-center justify-center rounded-none border border-solid border-storyscore-red bg-storyscore-red px-8 py-3 text-sm font-medium text-white transition-[background-color,color,border-color] duration-500 ease-in-out hover:bg-white hover:text-storyscore-red active:bg-white active:text-storyscore-red disabled:cursor-wait disabled:opacity-60 sm:flex-1"
    >
      {loading ? "Generating..." : buttonLabel}
    </button>
  );
}
