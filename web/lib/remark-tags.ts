/**
 * 【事实】【分析】… → <span class="tag t-fact">事实</span>
 * 与 tools/build.py 的 TAG_MAP 保持一致，让 Markdown 视图的来源标签和 HTML 版同色。
 */
const TAG_MAP: Record<string, string> = {
  事实: "t-fact",
  分析: "t-ana",
  推论: "t-inf",
  假设: "t-hyp",
  待验证: "t-chk",
};

const PATTERN = new RegExp(`【(${Object.keys(TAG_MAP).join("|")})】`, "g");

type Node = { type: string; value?: string; children?: Node[]; data?: Record<string, unknown> };

function transform(node: Node) {
  if (!node.children) return;
  const next: Node[] = [];
  for (const child of node.children) {
    if (child.type !== "text" || !child.value || !PATTERN.test(child.value)) {
      transform(child);
      next.push(child);
      continue;
    }
    PATTERN.lastIndex = 0;
    let last = 0;
    for (const m of child.value.matchAll(PATTERN)) {
      if (m.index! > last) next.push({ type: "text", value: child.value.slice(last, m.index) });
      next.push({
        type: "sourceTag",
        data: {
          hName: "span",
          hProperties: { className: ["tag", TAG_MAP[m[1]]] },
          hChildren: [{ type: "text", value: m[1] }],
        },
      });
      last = m.index! + m[0].length;
    }
    if (last < child.value.length) next.push({ type: "text", value: child.value.slice(last) });
  }
  node.children = next;
}

export default function remarkSourceTags() {
  return (tree: Node) => {
    PATTERN.lastIndex = 0;
    transform(tree);
  };
}
