import { UnsubscribeForm } from "@/components/unsubscribe-form";
import Link from "next/link";

type UnsubscribePageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function UnsubscribePage({
  searchParams,
}: UnsubscribePageProps) {
  const { email: rawEmail } = await searchParams;
  const email = rawEmail?.trim();

  return (
    <div className="flex min-h-full flex-1 flex-col overflow-x-hidden bg-white px-5 py-16 text-storyscore-red sm:px-8 sm:py-20">
      <main className="mx-auto w-full max-w-md">
        <Link
          href="/"
          className="text-sm font-medium transition-opacity hover:opacity-70"
        >
          ← STORYSCORE Quiz
        </Link>

        <h1 className="storyscore-display-lg mt-10">Unsubscribe from StoryScore emails</h1>

        {!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? (
          <p className="storyscore-body mt-6 text-base leading-[1.3]">
            Use the unsubscribe link in your StoryScore email to manage your
            subscription.
          </p>
        ) : (
          <UnsubscribeForm email={email} />
        )}
      </main>
    </div>
  );
}
