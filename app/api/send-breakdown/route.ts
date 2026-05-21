import { StoryscoreBreakdown } from "@/emails/StoryscoreBreakdown";
import { archetypes, isArchetypeId, type ArchetypeId } from "@/lib/archetypes";
import { getUnsubscribeUrl } from "@/lib/site-url";
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { createElement } from "react";
import { Resend } from "resend";

type SendBreakdownRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  coreId?: string;
  balanceId?: string;
  inverseId?: string;
};

function validateBody(body: SendBreakdownRequest) {
  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const email = body.email?.trim();
  const { coreId, balanceId, inverseId } = body;

  if (!firstName || !lastName) {
    return { error: "First and last name required." as const };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Valid email required." as const };
  }

  if (
    !coreId ||
    !balanceId ||
    !inverseId ||
    !isArchetypeId(coreId) ||
    !isArchetypeId(balanceId) ||
    !isArchetypeId(inverseId)
  ) {
    return { error: "Invalid archetype results." as const };
  }

  return {
    firstName,
    lastName,
    email,
    coreId: coreId as ArchetypeId,
    balanceId: balanceId as ArchetypeId,
    inverseId: inverseId as ArchetypeId,
  };
}

async function sendBreakdownEmail(
  firstName: string,
  email: string,
  coreId: ArchetypeId,
  balanceId: ArchetypeId,
  inverseId: ArchetypeId,
) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!fromEmail) {
    throw new Error("FROM_EMAIL is not configured.");
  }

  const resend = new Resend(resendApiKey);
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: `Your StoryScore: ${archetypes[coreId].name} / ${archetypes[balanceId].name} / ${archetypes[inverseId].name}`,
    headers: {
      "List-Unsubscribe": `<${getUnsubscribeUrl(email)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    react: createElement(StoryscoreBreakdown, {
      firstName,
      coreId,
      balanceId,
      inverseId,
      recipientEmail: email,
    }),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function addBeehiivSubscriber(
  firstName: string,
  lastName: string,
  email: string,
  coreId: ArchetypeId,
  balanceId: ArchetypeId,
  inverseId: ArchetypeId,
) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    throw new Error("Beehiiv is not configured.");
  }

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: false,
        custom_fields: [
          { name: "first_name", value: firstName },
          { name: "last_name", value: lastName },
          { name: "core_archetype", value: archetypes[coreId].name },
          { name: "balance_archetype", value: archetypes[balanceId].name },
          { name: "inverse_archetype", value: archetypes[inverseId].name },
        ],
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Beehiiv subscription failed (${response.status}): ${errorBody}`,
    );
  }

  return response.json();
}

async function logToNotion(
  firstName: string,
  lastName: string,
  email: string,
  coreId: ArchetypeId,
  balanceId: ArchetypeId,
  inverseId: ArchetypeId,
) {
  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !databaseId) {
    throw new Error("Notion is not configured.");
  }

  const notion = new Client({ auth: notionApiKey });
  const submittedAt = new Date().toISOString();

  return notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Email: { email },
      "First Name": {
        rich_text: [{ text: { content: firstName } }],
      },
      "Last Name": {
        rich_text: [{ text: { content: lastName } }],
      },
      "Core Archetype": {
        select: { name: archetypes[coreId].name },
      },
      "Balance Archetype": {
        select: { name: archetypes[balanceId].name },
      },
      "Inverse Archetype": {
        select: { name: archetypes[inverseId].name },
      },
      "Submitted At": {
        date: { start: submittedAt },
      },
      Source: {
        select: { name: "StoryScore Quiz" },
      },
    },
  });
}

export async function POST(request: Request) {
  let body: SendBreakdownRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const validated = validateBody(body);

  if ("error" in validated) {
    return NextResponse.json(
      { success: false, error: validated.error },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, coreId, balanceId, inverseId } = validated;

  const [emailResult, beehiivResult, notionResult] = await Promise.allSettled([
    sendBreakdownEmail(firstName, email, coreId, balanceId, inverseId),
    addBeehiivSubscriber(
      firstName,
      lastName,
      email,
      coreId,
      balanceId,
      inverseId,
    ),
    logToNotion(firstName, lastName, email, coreId, balanceId, inverseId),
  ]);

  if (beehiivResult.status === "rejected") {
    console.error("[STORYSCORE] Beehiiv subscription failed:", beehiivResult.reason);
  } else {
    console.info("[STORYSCORE] Beehiiv subscription succeeded");
  }

  if (notionResult.status === "rejected") {
    console.error("[STORYSCORE] Notion log failed:", notionResult.reason);
  } else {
    console.info("[STORYSCORE] Notion entry created");
  }

  if (emailResult.status === "rejected") {
    console.error("[STORYSCORE] Resend email failed:", emailResult.reason);
    const message =
      emailResult.reason instanceof Error
        ? emailResult.reason.message
        : "Failed to send breakdown email.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }

  console.info("[STORYSCORE] Breakdown email sent", {
    email,
    coreId,
    balanceId,
    inverseId,
    resendId: emailResult.value?.id,
  });

  return NextResponse.json({ success: true });
}
