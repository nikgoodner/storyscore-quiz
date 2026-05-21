import { archetypes, isArchetypeId, type ArchetypeId } from "@/lib/archetypes";
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

type LogCompletionRequest = {
  coreId?: string;
  balanceId?: string;
  inverseId?: string;
};

async function logAnonymousCompletion(
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
      "Has Email": {
        checkbox: false,
      },
    },
  });
}

export async function POST(request: Request) {
  let body: LogCompletionRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { coreId, balanceId, inverseId } = body;

  if (
    !coreId ||
    !balanceId ||
    !inverseId ||
    !isArchetypeId(coreId) ||
    !isArchetypeId(balanceId) ||
    !isArchetypeId(inverseId)
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid archetype results." },
      { status: 400 },
    );
  }

  try {
    await logAnonymousCompletion(coreId, balanceId, inverseId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[STORYSCORE] Notion anonymous completion log failed:", err);
    return NextResponse.json({ success: true });
  }
}
