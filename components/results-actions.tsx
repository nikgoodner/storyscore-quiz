"use client";

import type { ArchetypeId } from "@/lib/archetypes";
import { useState } from "react";

type ResultsActionsProps = {
  core: ArchetypeId;
  balance: ArchetypeId;
  inverse: ArchetypeId;
  fit?: boolean;
};

export function ResultsActions({
  core,
  balance,
  inverse,
  fit = false,
}: ResultsActionsProps) {
  const inputClass = fit
    ? "storyscore-interactive w-full rounded-none px-3 py-2.5 text-sm outline-none"
    : "storyscore-interactive w-full rounded-none px-4 py-3 text-sm outline-none";
  const buttonClass = fit
    ? "storyscore-btn-primary shrink-0 rounded-none px-5 py-2.5 text-sm disabled:opacity-60"
    : "storyscore-btn-primary shrink-0 rounded-none px-6 py-3 text-sm disabled:opacity-60";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setEmailMessage(null);
    setEmailError(null);

    try {
      const response = await fetch("/api/send-breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          coreId: core,
          balanceId: balance,
          inverseId: inverse,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setEmailError(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setEmailMessage(
        "Sent. Check your inbox in the next minute or two.",
      );
    } catch {
      setEmailError("Could not send email. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      {emailMessage ? (
        <p className="storyscore-body text-xs">{emailMessage}</p>
      ) : (
        <form onSubmit={handleEmail} className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              type="text"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First name"
              className={inputClass}
            />
            <input
              type="text"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last name"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email for full breakdown"
              className={`${inputClass} sm:min-w-0 sm:flex-1`}
            />
            <button
              type="submit"
              disabled={sending}
              className={buttonClass}
            >
              {sending ? "Sending…" : "Email breakdown →"}
            </button>
          </div>
        </form>
      )}

      {emailError && (
        <p className="text-xs text-storyscore-red">{emailError}</p>
      )}
    </div>
  );
}
