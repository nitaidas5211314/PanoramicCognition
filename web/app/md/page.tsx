import type { Metadata } from "next";
import ListPage from "@/components/ListPage";

export const metadata: Metadata = { title: "Markdown 文档" };

export default function MarkdownReportsPage() {
  return <ListPage format="md" />;
}
