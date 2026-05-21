import { NextResponse } from "next/server";

type UnsubscribeRequest = {
  email?: string;
};

export async function POST(request: Request) {
  let body: UnsubscribeRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = body.email?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: "Valid email required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    return NextResponse.json(
      { success: false, error: "Unsubscribe is not configured." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/by_email/${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unsubscribe: true }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[STORYSCORE] Beehiiv unsubscribe failed:", {
        status: response.status,
        body: errorBody,
      });
      return NextResponse.json(
        { success: false, error: "Could not unsubscribe. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[STORYSCORE] Beehiiv unsubscribe error:", err);
    return NextResponse.json(
      { success: false, error: "Could not unsubscribe. Please try again." },
      { status: 500 },
    );
  }
}
