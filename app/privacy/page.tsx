import { promises as fs } from "fs";
import path from "path";
import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "Privacy Policy | StoryScore",
  description: "How StoryScore collects, uses, and protects your information.",
};

export default async function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "app/privacy/content.md");
  const content = await fs.readFile(filePath, "utf-8");

  return <LegalPage content={content} title="Privacy Policy" />;
}
