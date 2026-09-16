import Link from "next/link";
import type { Format } from "@/lib/reports";

export default function SiteHeader({ active, counts }: { active: Format; counts: Record<Format, number> }) {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">◎</span>
          <span>全景认知与实践操作手册</span>
        </Link>
        <nav className="tabs" aria-label="报告格式">
          <Link href="/" className={active === "html" ? "tab active" : "tab"} aria-current={active === "html" ? "page" : undefined}>
            HTML 报告<span className="tab-count">{counts.html}</span>
          </Link>
          <Link href="/md" className={active === "md" ? "tab active" : "tab"} aria-current={active === "md" ? "page" : undefined}>
            Markdown 文档<span className="tab-count">{counts.md}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
