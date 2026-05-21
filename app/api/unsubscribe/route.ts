import { NextResponse } from "next/server";
import { Resend } from "resend";

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

  const resendApiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!resendApiKey || !audienceId) {
    console.error("[STORYSCORE] Resend unsubscribe not configured:", {
      hasApiKey: Boolean(resendApiKey),
      hasAudienceId: Boolean(audienceId),
    });
    return NextResponse.json(
      { success: false, error: "Unsubscribe is not configured." },
      { status: 500 },
    );
  }

  console.info("[STORYSCORE] Unsubscribe request:", { email, audienceId });

  try {
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.contacts.update({
      email,
      audienceId,
      unsubscribed: true,
    });

    if (error) {
      console.error("[STORYSCORE] Resend unsubscribe failed:", {
        email,
        audienceId,
        statusCode: error.statusCode,
        name: error.name,
        message: error.message,
        error,
      });

      if (error.statusCode === 404) {
        console.info("[STORYSCORE] Resend contact not found; treating as unsubscribed:", {
          email,
        });
        return NextResponse.json({ success: true });
      }

      return NextResponse.json(
        { success: false, error: "Could not unsubscribe. Please try again." },
        { status: 500 },
      );
    }

    console.info("[STORYSCORE] Resend unsubscribe succeeded:", {
      email,
      contactId: data?.id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[STORYSCORE] Resend unsubscribe error:", err);
    return NextResponse.json(
      { success: false, error: "Could not unsubscribe. Please try again." },
      { status: 500 },
    );
  }
}
