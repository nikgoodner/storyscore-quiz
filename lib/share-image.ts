import { archetypes, type ArchetypeId } from "@/lib/archetypes";

const CACHE_TTL_MS = 60 * 60 * 1000;

type CacheEntry = {
  imageUrl: string;
  expiresAt: number;
};

const shareImageCache = new Map<string, CacheEntry>();

function getCachedImageUrl(chordKey: string): string | null {
  const entry = shareImageCache.get(chordKey);
  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    shareImageCache.delete(chordKey);
    return null;
  }

  return entry.imageUrl;
}

function setCachedImageUrl(chordKey: string, imageUrl: string) {
  shareImageCache.set(chordKey, {
    imageUrl,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

type BannerbearSyncResponse = {
  image_url_png?: string;
};

export async function generateShareImageUrl(
  coreId: ArchetypeId,
  balanceId: ArchetypeId,
  inverseId: ArchetypeId,
): Promise<string | null> {
  const chordKey = `${coreId}-${balanceId}-${inverseId}`;
  const cachedImageUrl = getCachedImageUrl(chordKey);
  if (cachedImageUrl) {
    return cachedImageUrl;
  }

  const apiKey = process.env.BANNERBEAR_API_KEY;
  const templateId = process.env.BANNERBEAR_TEMPLATE_ID;

  if (!apiKey || !templateId) {
    return null;
  }

  const coreArchetype = archetypes[coreId];
  const balanceArchetype = archetypes[balanceId];
  const inverseArchetype = archetypes[inverseId];

  const response = await fetch("https://sync.api.bannerbear.com/v2/images", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template: templateId,
      modifications: [
        { name: "core_name", text: coreArchetype.name.toUpperCase() },
        { name: "core_description", text: coreArchetype.tagline },
        { name: "balance_name", text: balanceArchetype.name.toUpperCase() },
        { name: "balance_description", text: balanceArchetype.tagline },
        { name: "inverse_name", text: inverseArchetype.name.toUpperCase() },
        { name: "inverse_description", text: inverseArchetype.tagline },
      ],
    }),
  });

  const responseBody = await response.text();

  if (!response.ok) {
    console.error("[STORYSCORE] Bannerbear image generation failed", {
      status: response.status,
      body: responseBody,
    });
    return null;
  }

  let data: BannerbearSyncResponse;
  try {
    data = JSON.parse(responseBody) as BannerbearSyncResponse;
  } catch {
    console.error("[STORYSCORE] Bannerbear returned invalid JSON", responseBody);
    return null;
  }

  const imageUrl = data.image_url_png;
  if (!imageUrl) {
    console.error("[STORYSCORE] Bannerbear response missing image_url_png", data);
    return null;
  }

  setCachedImageUrl(chordKey, imageUrl);
  return imageUrl;
}
