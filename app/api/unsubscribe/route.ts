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
    return NextResponse.json(
      { success: false, error: "Unsubscribe is not configured." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.contacts.update({
      email,
      audienceId,
      unsubscribed: true,
    });

    if (error) {
      if (error.statusCode === 404) {
        return NextResponse.json({ success: true });
      }

      return NextResponse.json(
        { success: false, error: "Could not unsubscribe. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Could not unsubscribe. Please try again." },
      { status: 500 },
    );
  }
}
