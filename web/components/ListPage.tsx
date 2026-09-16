import SiteHeader from "@/components/SiteHeader";
import ReportGrid from "@/components/ReportGrid";
import { generatedAt, listReports, type Format } from "@/lib/reports";

const COPY: Record<Format, { title: string; lead: string }> = {
  html: {
    title: "HTML 交互报告",
    lead: "带侧栏导航、可调模型与图示的完整版。点开在线阅读，右上角可下载原文件离线打开。",
  },
  md: {
    title: "Markdown 文档",
    lead: "与 HTML 版同源的纯净文本版，适合检索、摘录，或导入 Obsidian 等笔记工具。",
  },
};

export default function ListPage({ format }: { format: Format }) {
  const reports = listReports(format);
  const counts = { html: listReports("html").length, md: listReports("md").length };
  const updated = new Date(generatedAt()).toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" });
  return (
    <>
      <SiteHeader active={format} counts={counts} />
      <main className="container list-main">
        <section className="hero">
          <h1>{COPY[format].title}</h1>
          <p>{COPY[format].lead}</p>
          <p className="hero-meta">共 {reports.length} 份 · 站点更新于 {updated}</p>
        </section>
        <ReportGrid reports={reports} format={format} />
      </main>
    </>
  );
}
