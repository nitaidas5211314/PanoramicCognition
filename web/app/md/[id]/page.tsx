import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import ViewerBar from "@/components/ViewerBar";
import { getReport, listReports, readMarkdown } from "@/lib/reports";
import remarkSourceTags from "@/lib/remark-tags";
import { extractToc } from "@/lib/toc";

export const dynamicParams = false;

export function generateStaticParams() {
  return listReports("md").map((r) => ({ id: r.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getReport((await params).id);
  return r ? { title: `${r.title}（Markdown）`, description: r.subtitle } : {};
}

export default async function MarkdownReportPage({ params }: Props) {
  const report = getReport((await params).id);
  if (!report?.md) notFound();
  const source = readMarkdown(report);
  const toc = extractToc(source);

  return (
    <div className="md-page">
      <ViewerBar report={report} format="md" />
      <div className="md-layout">
        {toc.length > 0 && (
          <aside className="md-toc">
            <details open>
              <summary>目录</summary>
              <nav>
                {toc.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>{t.text}</a>
                ))}
              </nav>
            </details>
          </aside>
        )}
        <article className="prose">
          <Markdown
            remarkPlugins={[remarkGfm, remarkSourceTags]}
            rehypePlugins={[rehypeSlug]}
            components={{
              table: ({ node: _node, ...props }) => (
                <div className="table-wrap"><table {...props} /></div>
              ),
              a: ({ node: _node, href, ...props }) =>
                href?.startsWith("#") ? <a href={href} {...props} /> : <a href={href} target="_blank" rel="noopener noreferrer" {...props} />,
            }}
          >
            {source}
          </Markdown>
        </article>
      </div>
    </div>
  );
}
