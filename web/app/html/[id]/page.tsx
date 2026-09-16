import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ViewerBar from "@/components/ViewerBar";
import { fileUrl, getReport, listReports } from "@/lib/reports";

export const dynamicParams = false;

export function generateStaticParams() {
  return listReports("html").map((r) => ({ id: r.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getReport((await params).id);
  return r ? { title: r.title, description: r.subtitle } : {};
}

export default async function HtmlReportPage({ params }: Props) {
  const report = getReport((await params).id);
  if (!report?.html) notFound();
  return (
    <div className="viewer">
      <ViewerBar report={report} format="html" />
      <iframe className="viewer-frame" src={fileUrl(report, "html")} title={report.title} />
    </div>
  );
}
