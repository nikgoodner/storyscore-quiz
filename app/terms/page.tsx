import { promises as fs } from "fs";
import path from "path";
import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "Terms of Service | StoryScore",
  description: "Terms governing your use of StoryScore.",
};

export default async function TermsOfServicePage() {
  const filePath = path.join(process.cwd(), "app/terms/content.md");
  const content = await fs.readFile(filePath, "utf-8");

  return <LegalPage content={content} title="Terms of Service" />;
}
