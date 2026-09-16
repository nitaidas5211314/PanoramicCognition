import GithubSlugger from "github-slugger";

export type TocItem = { id: string; text: string };

/** 与 rehype-slug 同一套规则：按文档顺序给所有标题分配 id，只把二级标题放进目录 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    const m = !inFence && line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[2]
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\*\*|__|`/g, "")
      .replace(/(^|\s)[*_]|[*_](\s|$)/g, "$1$2")
      .trim();
    const id = slugger.slug(text);
    if (m[1].length === 2) toc.push({ id, text });
  }
  return toc;
}
