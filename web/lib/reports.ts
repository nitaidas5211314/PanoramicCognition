import fs from "node:fs";
import path from "node:path";

export type Report = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  en: string;
  date: string | null;
  finished: string | null;
  duration: string | null;
  tags: string[];
  html: { size: number; sections: number; tools: number } | null;
  md: { size: number; sections: number } | null;
};

export type Format = "html" | "md";

type Manifest = { generatedAt: string; reports: Report[] };

let cache: Manifest | null = null;

function manifest(): Manifest {
  if (!cache) {
    const file = path.join(process.cwd(), "data", "manifest.json");
    if (!fs.existsSync(file)) {
      throw new Error("缺少 data/manifest.json：先运行 npm run sync（dev / build 会自动执行）");
    }
    cache = JSON.parse(fs.readFileSync(file, "utf8")) as Manifest;
  }
  return cache;
}

export const generatedAt = () => manifest().generatedAt;

export const listReports = (format: Format) => manifest().reports.filter((r) => r[format]);

export const getReport = (id: string) => manifest().reports.find((r) => r.id === id) ?? null;

export const fileUrl = (r: Report, format: Format) => `/files/${r.id}.${format}`;

export const downloadName = (r: Report, format: Format) => `${r.slug}.${format}`;

export const readMarkdown = (r: Report) =>
  fs.readFileSync(path.join(process.cwd(), "public", "files", `${r.id}.md`), "utf8");
