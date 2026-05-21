"use client";

import type { ArchetypeId } from "@/lib/archetypes";
import { useEffect } from "react";

type ResultsCompletionLoggerProps = {
  core: ArchetypeId;
  balance: ArchetypeId;
  inverse: ArchetypeId;
};

export function ResultsCompletionLogger({
  core,
  balance,
  inverse,
}: ResultsCompletionLoggerProps) {
  useEffect(() => {
    const sessionKey = `logged-${core}-${balance}-${inverse}`;
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }

    fetch("/api/log-completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coreId: core,
        balanceId: balance,
        inverseId: inverse,
      }),
    })
      .then(() => sessionStorage.setItem(sessionKey, "true"))
      .catch(() => {});
  }, [core, balance, inverse]);

  return null;
}
