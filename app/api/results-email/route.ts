import { buildResultsBreakdown } from "@/lib/results-breakdown";
import { isArchetypeId, type ArchetypeId } from "@/lib/archetypes";
import { NextResponse } from "next/server";

type EmailRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  core?: string;
  balance?: string;
  inverse?: string;
};

export async function POST(request: Request) {
  let body: EmailRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, core, balance, inverse } = body;

  if (!firstName?.trim() || !lastName?.trim()) {
    return NextResponse.json(
      { error: "First and last name required." },
      { status: 400 },
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  if (
    !core ||
    !balance ||
    !inverse ||
    !isArchetypeId(core) ||
    !isArchetypeId(balance) ||
    !isArchetypeId(inverse)
  ) {
    return NextResponse.json({ error: "Invalid results." }, { status: 400 });
  }

  const breakdown = buildResultsBreakdown(
    core as ArchetypeId,
    balance as ArchetypeId,
    inverse as ArchetypeId,
  );

  console.info("[STORYSCORE] Email breakdown requested", {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email,
    core,
    balance,
    inverse,
    preview: breakdown.text.slice(0, 200),
  });

  return NextResponse.json({
    ok: true,
    message: "Your full breakdown is on its way. Check your inbox shortly.",
  });
}
