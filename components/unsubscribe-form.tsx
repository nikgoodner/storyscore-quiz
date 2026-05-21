"use client";

import { useState } from "react";

type UnsubscribeFormProps = {
  email: string;
};

export function UnsubscribeForm({ email }: UnsubscribeFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error ?? "Could not unsubscribe. Please try again.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Could not unsubscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <p className="storyscore-body mt-6 text-base leading-[1.3]">
        You&apos;re unsubscribed. Sorry to see you go.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <p className="storyscore-body text-base leading-[1.3]">
        We&apos;ll remove <span className="font-bold">{email}</span> from our list.
      </p>

      {error && (
        <p className="storyscore-body mt-4 text-sm leading-[1.3]">{error}</p>
      )}

      <button
        type="button"
        onClick={() => void handleConfirm()}
        disabled={loading}
        className="storyscore-btn-primary mt-6 w-full rounded-none px-8 py-3 text-sm disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "Unsubscribing..." : "Confirm unsubscribe"}
      </button>
    </div>
  );
}
