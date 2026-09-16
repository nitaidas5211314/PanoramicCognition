"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { sizeText } from "@/lib/format";
import type { Format, Report } from "@/lib/reports";
import { SearchIcon } from "./Icons";

const TOP_TAGS = 10;

export default function ReportGrid({ reports, format }: { reports: Report[]; format: Format }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [allTagsOpen, setAllTagsOpen] = useState(false);

  const allTags = useMemo(() => {
    const count = new Map<string, number>();
    reports.forEach((r) => r.tags.forEach((t) => count.set(t, (count.get(t) ?? 0) + 1)));
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [reports]);

  const shown = useMemo(() => {
    const k = q.trim().toLowerCase();
    return reports.filter(
      (r) =>
        (!tag || r.tags.includes(tag)) &&
        (!k || [r.title, r.subtitle, r.en, r.slug, ...r.tags].some((s) => s.toLowerCase().includes(k))),
    );
  }, [reports, q, tag]);

  return (
    <>
      <div className="toolbar">
        <label className="search">
          <SearchIcon />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索标题、摘要、标签"
            aria-label="搜索报告"
          />
        </label>
        {allTags.length > 0 && (
          <div className="tag-filter" role="group" aria-label="按标签筛选">
            <button className={tag === null ? "chip active" : "chip"} onClick={() => setTag(null)}>全部</button>
            {(allTagsOpen ? allTags : allTags.slice(0, TOP_TAGS)).map((t) => (
              <button key={t} className={tag === t ? "chip active" : "chip"} onClick={() => setTag(tag === t ? null : t)}>
                {t}
              </button>
            ))}
            {allTags.length > TOP_TAGS && (
              <button className="chip chip-more" onClick={() => setAllTagsOpen(!allTagsOpen)} aria-expanded={allTagsOpen}>
                {allTagsOpen ? "收起" : `更多 ${allTags.length - TOP_TAGS}`}
              </button>
            )}
          </div>
        )}
      </div>

      {shown.length === 0 ? (
        <p className="empty">没有匹配的报告。</p>
      ) : (
        <ul className="grid">
          {shown.map((r) => {
            const f = r[format]!;
            return (
              <li key={r.id}>
                <Link href={`/${format}/${r.id}`} className="card">
                  <div className="card-top">
                    <span className={`badge badge-${format}`}>{format === "html" ? "HTML" : "MD"}</span>
                    {r.en && <span className="card-en">{r.en}</span>}
                  </div>
                  <h2 className="card-title">{r.title}</h2>
                  {r.subtitle && <p className="card-sub">{r.subtitle}</p>}
                  {r.tags.length > 0 && (
                    <div className="card-tags">
                      {r.tags.slice(0, 5).map((t) => <span key={t} className="mini-tag">{t}</span>)}
                    </div>
                  )}
                  <dl className="card-meta">
                    {r.date && <div><dt>生成</dt><dd>{r.date}</dd></div>}
                    {r.duration && <div><dt>耗时</dt><dd>{r.duration}</dd></div>}
                    <div><dt>章节</dt><dd>{f.sections}</dd></div>
                    {format === "html" && r.html!.tools > 0 && <div><dt>交互工具</dt><dd>{r.html!.tools}</dd></div>}
                    <div><dt>大小</dt><dd>{sizeText(f.size)}</dd></div>
                  </dl>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
