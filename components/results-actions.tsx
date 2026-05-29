"use client";

import type { ArchetypeId } from "@/lib/archetypes";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";

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
    ? "storyscore-interactive w-full rounded-none px-3 py-2.5 text-sm text-storyscore-red outline-none transition-[background-color,color,border-color] duration-500 ease-in-out placeholder:text-storyscore-red hover:text-white focus:text-white focus-visible:text-white hover:placeholder:text-white focus:placeholder:text-white focus-visible:placeholder:text-white"
    : "storyscore-interactive w-full rounded-none px-4 py-3 text-sm text-storyscore-red outline-none transition-[background-color,color,border-color] duration-500 ease-in-out placeholder:text-storyscore-red hover:text-white focus:text-white focus-visible:text-white hover:placeholder:text-white focus:placeholder:text-white focus-visible:placeholder:text-white";
  const buttonClass =
    "inline-flex w-full items-center justify-center rounded-none border border-solid border-storyscore-red bg-storyscore-red px-8 py-3 text-sm font-medium text-white transition-[background-color,color,border-color] duration-500 ease-in-out hover:bg-white hover:text-storyscore-red active:bg-white active:text-storyscore-red disabled:cursor-wait disabled:opacity-60 sm:w-auto";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const resetTurnstile = () => {
    setTurnstileToken(null);
    setTurnstileError(false);
    turnstileRef.current?.reset();
  };

  const handleEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!turnstileToken) {
      setEmailError(
        turnstileError
          ? "Verification failed. Please refresh and try again."
          : "Please complete the verification.",
      );
      return;
    }

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
          turnstileToken,
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
      resetTurnstile();
      setSending(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      {emailMessage ? (
        <p className="storyscore-body text-xs">{emailMessage}</p>
      ) : (
        <form onSubmit={handleEmail} className="relative flex flex-col gap-2">
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
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email for full breakdown"
            className={inputClass}
          />
          <div
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
            aria-hidden="true"
          >
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => {
                setTurnstileToken(token);
                setTurnstileError(false);
              }}
              onExpire={() => setTurnstileToken(null)}
              onError={() => {
                setTurnstileToken(null);
                setTurnstileError(true);
              }}
              options={{
                execution: "render",
                appearance: "execute",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className={buttonClass}
          >
            {sending ? "Sending…" : "Email breakdown →"}
          </button>
        </form>
      )}

      {emailError && (
        <p className="text-xs text-storyscore-red">{emailError}</p>
      )}
    </div>
  );
}
