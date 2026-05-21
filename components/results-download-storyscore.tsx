"use client";

import type { ArchetypeId } from "@/lib/archetypes";
import { useState } from "react";

type ResultsDownloadStoryscoreProps = {
  core: ArchetypeId;
  balance: ArchetypeId;
  inverse: ArchetypeId;
};

export function ResultsDownloadStoryscore({
  core,
  balance,
  inverse,
}: ResultsDownloadStoryscoreProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
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
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `storyscore-${core}-${balance}-${inverse}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleDownload()}
      disabled={loading}
      className="storyscore-btn-primary w-full rounded-none px-8 py-3 text-sm disabled:cursor-wait disabled:opacity-60 sm:flex-1"
    >
      {loading ? "Generating..." : "Download your StoryScore →"}
    </button>
  );
}
