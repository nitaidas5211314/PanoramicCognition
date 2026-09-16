#!/usr/bin/env node
/**
 * 把 <项目根>/reports 同步成站点可用的静态资源 + 清单。
 *
 *   ../reports/<slug>.html ─┐                 public/files/<id>.html
 *   ../reports/<slug>.md   ─┼─▶ sync ─▶      public/files/<id>.md
 *   ../tools/state.json    ─┘                 data/manifest.json
 *
 * id = sha1(slug) 前 10 位：URL 与文件名全是 ASCII，避开中文、全角标点在路由和 CDN 上的编码问题；
 * 下载时再用 <a download="<slug>.html"> 还原成原文件名。
 *
 * 环境变量：
 *   REPORTS_DIR     报告目录（默认 ../reports）
 *   STATE_FILE      队列状态（默认 ../tools/state.json，可缺省）
 *   REPORTS_EXCLUDE 不展示的 slug，逗号分隔（默认 selftest）
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT_ROOT = path.resolve(WEB_ROOT, "..");
const REPORTS_DIR = path.resolve(WEB_ROOT, process.env.REPORTS_DIR ?? path.join(PROJECT_ROOT, "reports"));
const STATE_FILE = path.resolve(WEB_ROOT, process.env.STATE_FILE ?? path.join(PROJECT_ROOT, "tools", "state.json"));
const EXCLUDE = new Set(
  (process.env.REPORTS_EXCLUDE ?? "selftest").split(",").map((s) => s.trim()).filter(Boolean),
);
const OUT_FILES = path.join(WEB_ROOT, "public", "files");
const OUT_MANIFEST = path.join(WEB_ROOT, "data", "manifest.json");

const BRAND_SUFFIX = /\s*·\s*全景认知与实践操作手册\s*$/;

const idOf = (slug) => crypto.createHash("sha1").update(slug, "utf8").digest("hex").slice(0, 10);

const stripTags = (s) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const stripMd = (s) =>
  s
    .replace(/\*\*|__|`/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();

function parseHtml(src) {
  const title = stripTags(src.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(BRAND_SUFFIX, "");
  const subtitle = stripTags(src.match(/<p class="sub"[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "");
  const en = stripTags(src.match(/<div class="brand"[^>]*>[\s\S]*?<small[^>]*>([\s\S]*?)<\/small>/i)?.[1] ?? "");
  const footer = stripTags(src.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i)?.[1] ?? "");
  return {
    title,
    subtitle,
    en,
    date: footer.match(/生成于\s*(\d{4}-\d{2}-\d{2})/)?.[1] ?? null,
    duration: footer.match(/耗时\s*([^·]+?)\s*(?:·|$)/)?.[1] ?? null,
    sections: (src.match(/<section[\s>]/g) ?? []).length,
    tools: (src.match(/class="tool[\s"]/g) ?? []).length,
  };
}

function parseMd(src) {
  const lines = src.split("\n");
  const title = stripMd((lines.find((l) => /^# /.test(l)) ?? "").replace(/^# /, "")).replace(BRAND_SUFFIX, "");
  const quotes = lines.filter((l) => /^> /.test(l)).map((l) => l.replace(/^> /, ""));
  const metaLine = quotes.find((l) => l.startsWith("生成于")) ?? "";
  const meta = Object.fromEntries(
    metaLine.split("｜").map((part) => {
      const m = part.match(/^(生成于|耗时|主题|标签)[：:\s]\s*(.*)$/);
      return m ? [m[1], m[2].trim()] : [part, ""];
    }),
  );
  let inFence = false;
  let headings = 0;
  for (const l of lines) {
    if (/^```/.test(l)) inFence = !inFence;
    else if (!inFence && /^## /.test(l)) headings++;
  }
  return {
    title,
    subtitle: stripMd(quotes.find((l) => !l.startsWith("生成于")) ?? ""),
    topic: meta["主题"] ?? null,
    date: meta["生成于"]?.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null,
    duration: meta["耗时"] ?? null,
    tags: (meta["标签"] ?? "").split(/[、,，]/).map((t) => t.trim()).filter(Boolean),
    sections: headings,
  };
}

// state.json 里的时间是北京时间 "YYYY-MM-DD HH:MM[:SS]"，文件时间也换成同一格式才能直接比较
const localStamp = (ms) =>
  new Date(ms + 8 * 3600e3).toISOString().slice(0, 19).replace("T", " ");

function loadState() {
  try {
    const st = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
    return new Map((st.topics ?? []).map((t) => [t.slug, t]));
  } catch {
    return new Map();
  }
}

function main() {
  if (!fs.existsSync(REPORTS_DIR)) {
    console.error(`[sync] 找不到报告目录：${REPORTS_DIR}\n       用 REPORTS_DIR 指定，或确认部署时包含了仓库根的 reports/`);
    process.exit(1);
  }

  const state = loadState();
  const bySlug = new Map();
  for (const name of fs.readdirSync(REPORTS_DIR).sort()) {
    const m = name.normalize("NFC").match(/^(.+)\.(html|md)$/);
    if (!m || EXCLUDE.has(m[1])) continue;
    const [, slug, ext] = m;
    const entry = bySlug.get(slug) ?? { slug };
    entry[ext] = path.join(REPORTS_DIR, name);
    bySlug.set(slug, entry);
  }

  fs.rmSync(OUT_FILES, { recursive: true, force: true });
  fs.mkdirSync(OUT_FILES, { recursive: true });
  fs.mkdirSync(path.dirname(OUT_MANIFEST), { recursive: true });

  const reports = [];
  for (const { slug, html, md } of bySlug.values()) {
    const id = idOf(slug);
    const h = html ? parseHtml(fs.readFileSync(html, "utf8")) : null;
    const d = md ? parseMd(fs.readFileSync(md, "utf8")) : null;
    const s = state.get(slug);

    if (html) fs.copyFileSync(html, path.join(OUT_FILES, `${id}.html`));
    if (md) fs.copyFileSync(md, path.join(OUT_FILES, `${id}.md`));

    const mtime = Math.max(...[html, md].filter(Boolean).map((f) => fs.statSync(f).mtimeMs));
    reports.push({
      id,
      slug,
      title: h?.title || d?.topic || d?.title || s?.title || slug,
      subtitle: h?.subtitle || d?.subtitle || "",
      en: h?.en || "",
      date: h?.date || d?.date || s?.finished?.slice(0, 10) || null,
      finished: s?.finished ?? null,
      duration: h?.duration || d?.duration || null,
      tags: d?.tags ?? [],
      html: html ? { size: fs.statSync(html).size, sections: h.sections, tools: h.tools } : null,
      md: md ? { size: fs.statSync(md).size, sections: d.sections } : null,
      // 排序键：队列完成时间优先；还没 done 的（进行中 / 手工放入的）用文件修改时间
      sortKey: s?.finished ?? localStamp(mtime),
    });
  }

  // 最新的排前面
  reports.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  reports.forEach((r) => delete r.sortKey);

  fs.writeFileSync(
    OUT_MANIFEST,
    JSON.stringify({ generatedAt: new Date().toISOString(), reports }, null, 2) + "\n",
  );
  const nHtml = reports.filter((r) => r.html).length;
  const nMd = reports.filter((r) => r.md).length;
  console.log(`[sync] ${reports.length} 个主题（HTML ${nHtml} / MD ${nMd}）← ${path.relative(WEB_ROOT, REPORTS_DIR)}`);
}

main();
