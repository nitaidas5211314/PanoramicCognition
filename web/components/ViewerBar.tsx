import Link from "next/link";
import { downloadName, fileUrl, type Format, type Report } from "@/lib/reports";
import { BackIcon, DownloadIcon, ExternalIcon, SwapIcon } from "./Icons";

export default function ViewerBar({ report, format }: { report: Report; format: Format }) {
  const other: Format = format === "html" ? "md" : "html";
  const label = format === "html" ? "HTML" : "Markdown";
  return (
    <header className="viewer-bar">
      <Link href={format === "html" ? "/" : "/md"} className="icon-btn" aria-label="返回列表" title="返回列表">
        <BackIcon size={18} />
      </Link>
      <div className="viewer-title">
        <strong>{report.title}</strong>
        <span className={`badge badge-${format}`}>{format === "html" ? "HTML" : "MD"}</span>
      </div>
      <div className="viewer-actions">
        {report[other] && (
          <Link href={`/${other}/${report.id}`} className="btn btn-ghost" title={`切换到 ${other === "html" ? "HTML" : "Markdown"} 版`}>
            <SwapIcon /><span className="btn-label">{other === "html" ? "HTML 版" : "MD 版"}</span>
          </Link>
        )}
        <a href={fileUrl(report, format)} target="_blank" rel="noopener" className="btn btn-ghost" title="在新标签页打开原文件">
          <ExternalIcon /><span className="btn-label">新窗口</span>
        </a>
        <a href={fileUrl(report, format)} download={downloadName(report, format)} className="btn btn-primary" title={`下载 ${downloadName(report, format)}`}>
          <DownloadIcon /><span className="btn-label">下载 {label}</span>
        </a>
      </div>
    </header>
  );
}
