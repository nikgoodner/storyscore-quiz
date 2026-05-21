import { generateShareImageUrl } from "@/lib/share-image";
import { isArchetypeId, type ArchetypeId } from "@/lib/archetypes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const core = searchParams.get("core");
  const balance = searchParams.get("balance");
  const inverse = searchParams.get("inverse");

  if (
    !core ||
    !balance ||
    !inverse ||
    !isArchetypeId(core) ||
    !isArchetypeId(balance) ||
    !isArchetypeId(inverse)
  ) {
    return NextResponse.json(
      { error: "Invalid or missing archetype IDs." },
      { status: 400 },
    );
  }

  const coreId = core as ArchetypeId;
  const balanceId = balance as ArchetypeId;
  const inverseId = inverse as ArchetypeId;

  try {
    const imageUrl = await generateShareImageUrl(coreId, balanceId, inverseId);

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to generate share image." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      image_url: imageUrl,
      core: coreId,
      balance: balanceId,
      inverse: inverseId,
    });
  } catch (err) {
    console.error("[STORYSCORE] Bannerbear request error:", err);
    return NextResponse.json(
      { error: "Failed to generate share image." },
      { status: 500 },
    );
  }
}
