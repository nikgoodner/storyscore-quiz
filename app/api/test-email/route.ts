import { StoryscoreBreakdown } from "@/emails/StoryscoreBreakdown";
import { archetypes } from "@/lib/archetypes";
import { NextResponse } from "next/server";
import { createElement } from "react";
import { Resend } from "resend";

const TEST_EMAIL = "nikgoodner@gmail.com";
const TEST_FIRST_NAME = "Nik";
const TEST_CORE_ID = "philosopher" as const;
const TEST_BALANCE_ID = "reporter" as const;
const TEST_INVERSE_ID = "storyteller" as const;

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ success: false, error: "Not found." }, { status: 404 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;

  if (!resendApiKey) {
    return NextResponse.json(
      { success: false, error: "RESEND_API_KEY is not configured." },
      { status: 500 },
    );
  }

  if (!fromEmail) {
    return NextResponse.json(
      { success: false, error: "FROM_EMAIL is not configured." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: TEST_EMAIL,
      subject: `Your StoryScore: ${archetypes[TEST_CORE_ID].name} / ${archetypes[TEST_BALANCE_ID].name} / ${archetypes[TEST_INVERSE_ID].name}`,
      headers: {
        "List-Unsubscribe": "<{{{RESEND_UNSUBSCRIBE_URL}}}>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      react: createElement(StoryscoreBreakdown, {
        firstName: TEST_FIRST_NAME,
        coreId: TEST_CORE_ID,
        balanceId: TEST_BALANCE_ID,
        inverseId: TEST_INVERSE_ID,
      }),
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${TEST_EMAIL}.`,
      resendId: data?.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send test email.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
