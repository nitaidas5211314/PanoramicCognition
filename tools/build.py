#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
================================================================================
 全景认知与实践操作手册 · 构建器
================================================================================

 单一内容源 → 双格式产出：

     content/<slug>.md ──┬──▶ reports/<slug>.html   交互增强版（主交付物）
                         └──▶ reports/<slug>.md     纯净 Markdown（可移植 / 可检索）

 用法：
     python3 build.py                 # 构建 content/ 下全部主题
     python3 build.py hbm quant-math  # 只构建指定 slug
     python3 build.py --list          # 列出内容源
     python3 build.py --check         # 只校验不写盘（CI 用）

 内容源语法见 content/_TEMPLATE.md

 依赖：仅需 markdown 库（tables / attr_list / sane_lists 扩展）
================================================================================
"""
from __future__ import annotations

import datetime
import html as html_mod
import json
import pathlib
import re
import sys

try:
    import markdown
except ImportError:
    sys.exit("缺少依赖：pip install markdown")

ROOT = pathlib.Path(__file__).resolve().parent          # tools/
PROJECT_ROOT = ROOT.parent                              # 项目根：PanoramicCognitionPracticeEngine/
CONTENT_DIR = ROOT / "content"
DIST_DIR = PROJECT_ROOT / "reports"                     # 生成物统一落在 <项目根>/reports/
ASSETS_DIR = ROOT / "assets"
STATE_FILE = ROOT / "state.json"

MD_EXTS = ["tables", "attr_list", "sane_lists", "fenced_code"]

# 【事实】→ <span class="tag t-fact">事实</span>
TAG_MAP = {
    "事实": "t-fact",
    "分析": "t-ana",
    "推论": "t-inf",
    "假设": "t-hyp",
    "待验证": "t-chk",
}


# ── 运行耗时 ─────────────────────────────────────────────────────────────
def _parse_ts(s):
    """容忍 '2026-09-16 15:06' 与 '2026-09-16 15:06:00' 两种写法"""
    if not s:
        return None
    try:
        return datetime.datetime.fromisoformat(str(s).strip().replace(" ", "T", 1))
    except ValueError:
        return None


def humanize(seconds: float) -> str:
    """秒 → 中文时长：'48 秒' / '22 分 30 秒' / '1 小时 12 分'"""
    s = int(round(seconds))
    if s < 60:
        return f"{s} 秒"
    m, sec = divmod(s, 60)
    if m < 60:
        return f"{m} 分" + (f" {sec} 秒" if sec else "")
    h, m = divmod(m, 60)
    return f"{h} 小时" + (f" {m} 分" if m else "")


def state_files() -> list:
    """全部队列状态文件，按优先级排列。

    队列可以有多条（queue.md、queue2.md…），各自的状态文件也分开
    （state.json、state.queue2.json）。构建器按 slug 在所有状态文件里找耗时，
    不必知道这个主题属于哪条队列。
    """
    main = ROOT / "state.json"
    files = [main] if main.exists() else []
    files += sorted(p for p in ROOT.glob("state.*.json") if p.name != "state.json")
    return files


def topic_runtime(slug: str):
    """该主题本次运行的耗时（秒）。

    优先级：done 落盘的 duration_sec ＞ finished−started ＞ now−started（仍在跑）。
    都取不到（例如早期手工归档、未登记进队列的主题）返回 None，
    页脚就不写耗时字段，而不是编一个数出来。
    """
    t = None
    for p in state_files():
        try:
            st = json.loads(p.read_text(encoding="utf-8"))
        except (ValueError, OSError):
            continue
        t = next((x for x in st.get("topics", []) if x.get("slug") == slug), None)
        if t:
            break
    if not t:
        return None
    if t.get("duration_sec"):
        return float(t["duration_sec"])
    t0, t1 = _parse_ts(t.get("started")), _parse_ts(t.get("finished"))
    if t0 and t1:
        return max(0.0, (t1 - t0).total_seconds())
    if t0:
        return max(0.0, (datetime.datetime.now() - t0).total_seconds())
    return None

OPEN_RE = re.compile(r"^:::\s*([a-z][a-z0-9_-]*)\s*(.*)$")


# ══════════════════════════════════════════════════════════════════════════
# 1. front matter（迷你解析器，零依赖）
# ══════════════════════════════════════════════════════════════════════════
def parse_front_matter(text: str):
    if not text.lstrip().startswith("---"):
        return {}, text
    text = text.lstrip()
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    raw = text[3:end]
    body = text[end + 4:].lstrip("\n")
    meta: dict = {}
    for line in raw.split("\n"):
        line = line.rstrip()
        if not line.strip() or line.strip().startswith("#"):
            continue
        if ":" not in line:
            continue
        key, val = line.split(":", 1)
        key, val = key.strip(), val.strip()
        if val.startswith("[") and val.endswith("]"):
            val = [v.strip().strip("'\"") for v in val[1:-1].split(",") if v.strip()]
        elif val.lower() in ("true", "false"):
            val = val.lower() == "true"
        elif val.isdigit():
            val = int(val)
        meta[key] = val
    return meta, body


# ══════════════════════════════════════════════════════════════════════════
# 2. 块级解析：把 ::: 容器解析成 AST
# ══════════════════════════════════════════════════════════════════════════
def parse_blocks(text: str) -> list:
    """→ [{t:'md',text}, {t:'raw',html}, {t:'container',kind,args,children}]"""
    lines = text.split("\n")
    nodes: list = []
    buf: list = []
    i, n = 0, len(lines)

    def flush():
        if any(l.strip() for l in buf):
            nodes.append({"t": "md", "text": "\n".join(buf)})
        buf.clear()

    while i < n:
        line = lines[i]
        m = OPEN_RE.match(line.strip())
        if not m:
            buf.append(line)
            i += 1
            continue

        kind, args = m.group(1), m.group(2).strip()
        depth, j, inner, fence = 1, i + 1, [], False
        while j < n:
            s = lines[j].strip()
            if s.startswith("```"):
                fence = not fence
            if not fence:
                if OPEN_RE.match(s):
                    depth += 1
                elif s == ":::":
                    depth -= 1
                    if depth == 0:
                        break
            inner.append(lines[j])
            j += 1
        else:
            sys.stderr.write(f"  ⚠ 未闭合的容器 ::: {kind}（已按到末尾处理）\n")

        flush()
        child_text = "\n".join(inner)
        if kind == "raw":
            nodes.append({"t": "raw", "html": child_text})
        else:
            nodes.append({
                "t": "container", "kind": kind, "args": args,
                "children": parse_blocks(child_text),
            })
        i = j + 1
    flush()
    return nodes


def node_text(node) -> str:
    """把节点（含子容器）拍平成纯文本，用于 cards/tabs 的再切分"""
    if node["t"] == "md":
        return node["text"]
    if node["t"] == "raw":
        return node["html"]
    return "\n".join(node_text(c) for c in node["children"])


# ══════════════════════════════════════════════════════════════════════════
# 3. Markdown → HTML（含容器渲染）
# ══════════════════════════════════════════════════════════════════════════
class Renderer:
    def __init__(self):
        self.counter = 0

    # ---------- 基础 markdown ----------
    def md(self, text: str) -> str:
        out = markdown.markdown(text, extensions=MD_EXTS)
        return self.postprocess(out)

    def postprocess(self, s: str) -> str:
        # 标题降级：内容里的 ## 是子标题，应渲染为 h3（开标签与闭标签都要降）
        for src, dst in ((4, 5), (3, 4), (2, 3)):
            s = re.sub(rf"<h{src}([ >])", rf"<h{dst}\1", s)
            s = s.replace(f"</h{src}>", f"</h{dst}>")
        # 表格：包裹 .tw，首列自动加 class="k"
        if "<table>" in s:
            s = s.replace("<table>", '<div class="tw"><table>')
            s = s.replace("</table>", "</table></div>")
            s = re.sub(r"<tr>\s*<td(?![^>]*\bclass=)",
                       lambda m: m.group(0).replace("<td", '<td class="k"', 1), s)
        # 来源标记
        for zh, cls in TAG_MAP.items():
            s = s.replace(f"【{zh}】", f'<span class="tag {cls}">{zh}</span>')
        return s

    # ---------- 块级渲染 ----------
    def blocks(self, nodes: list, raw_policy: str = "hint", hint: str = "") -> str:
        out = []
        for nd in nodes:
            if nd["t"] == "md":
                out.append(self.md(nd["text"]))
            elif nd["t"] == "raw":
                out.append(nd["html"])
            else:
                out.append(self.container(nd, raw_policy, hint))
        return "\n".join(x for x in out if x and x.strip())

    def container(self, nd: dict, raw_policy: str, hint: str) -> str:
        kind, args, ch = nd["kind"], nd["args"], nd["children"]
        inner = self.blocks(ch, raw_policy, hint)

        if kind == "note":
            parts = args.split(None, 1)
            color = parts[0] if parts and parts[0] in (
                "blue", "red", "amber", "green", "purple", "teal") else "blue"
            title = parts[1] if len(parts) > 1 else ("" if parts and parts[0] == color else args)
            head = f"<b>{html_mod.escape(title)}</b>" if title else ""
            return f'<div class="note {color}">{head}{inner}</div>'

        if kind == "cards":
            cls = args if args in ("g2", "g3", "g4") else "g3"
            cards = self.split_cards("\n".join(node_text(c) for c in ch))
            body = "\n".join(cards)
            return f'<div class="grid {cls}">\n{body}\n</div>'

        if kind == "details":
            return (
                f"<details><summary>{html_mod.escape(args)}</summary>"
                f'<div class="dbody">{inner}</div></details>'
            )

        if kind == "tabs":
            return self.render_tabs("\n".join(node_text(c) for c in ch))

        if kind in ("tw", "grid"):
            return f'<div class="{kind if kind == "tw" else "grid " + (args or "g3")}">{inner}</div>'

        # 未知容器：退化为普通 div，保持内容不丢
        return f'<div class="{html_mod.escape(kind)} {html_mod.escape(args)}">{inner}</div>'

    # ###  标题 → 卡片
    def split_cards(self, text: str) -> list:
        parts = re.split(r"^###\s+(.+)$", text, flags=re.M)
        cards = []
        if parts and parts[0].strip():
            cards.append(f'<div class="card">{self.md(parts[0])}</div>')
        for k in range(1, len(parts), 2):
            head = parts[k].strip()
            body = parts[k + 1] if k + 1 < len(parts) else ""
            cls = "card"
            m = re.search(r"\{\.([a-z]+)\}\s*$", head)
            if m:
                cls += f" {m.group(1)}"
                head = head[:m.start()].strip()
            cards.append(
                f'<div class="{cls}"><h4>{html_mod.escape(head)}</h4>{self.md(body)}</div>'
            )
        return cards

    # @@选项 → Tab 面板
    def render_tabs(self, text: str) -> str:
        self.counter += 1
        gid = f"tb{self.counter}"
        parts = re.split(r"^@@\s*(.+)$", text, flags=re.M)
        labels, bodies = [], []
        if parts and parts[0].strip():
            labels.append("默认")
            bodies.append(parts[0])
        for k in range(1, len(parts), 2):
            labels.append(parts[k].strip())
            bodies.append(parts[k + 1] if k + 1 < len(parts) else "")
        btns = "".join(
            f'<button class="tab{" on" if i == 0 else ""}" data-pane="{gid}-{i}">{html_mod.escape(l)}</button>'
            for i, l in enumerate(labels)
        )
        panes = "".join(
            f'<div class="pane{" on" if i == 0 else ""}" id="{gid}-{i}">{self.md(b)}</div>'
            for i, b in enumerate(bodies)
        )
        return f'<div class="tabs" data-group="{gid}">{btns}</div>\n{panes}'


# ══════════════════════════════════════════════════════════════════════════
# 4. Markdown 版本渲染（把增强组件降级为纯文本）
# ══════════════════════════════════════════════════════════════════════════
class MdRenderer:
    def __init__(self, raw_policy="hint", hint=""):
        self.raw_policy = raw_policy
        self.hint = hint or "（此处含交互图表，见 HTML 版）"

    @staticmethod
    def demote(text: str) -> str:
        """节标题已是 ##，子标题需降一级，避免 MD 版层级撞车"""
        out, fence = [], False
        for line in text.split("\n"):
            if line.strip().startswith("```"):
                fence = not fence
            elif not fence and re.match(r"^#{2,6}\s", line):
                line = "#" + line
            out.append(line)
        return "\n".join(out)

    def blocks(self, nodes: list) -> str:
        out = []
        for nd in nodes:
            if nd["t"] == "md":
                out.append(self.demote(nd["text"].strip("\n")))
            elif nd["t"] == "raw":
                if self.raw_policy == "hint":
                    out.append(f"> {self.hint}")
                elif self.raw_policy == "keep":
                    out.append("```html\n" + nd["html"].strip() + "\n```")
            else:
                out.append(self.container(nd))
        return "\n\n".join(x for x in out if x.strip())

    def container(self, nd: dict) -> str:
        kind, args, ch = nd["kind"], nd["args"], nd["children"]
        inner = self.blocks(ch)

        if kind == "note":
            parts = args.split(None, 1)
            if parts and parts[0] in ("blue", "red", "amber", "green", "purple", "teal"):
                title = parts[1] if len(parts) > 1 else ""
            else:
                title = args
            quoted = []
            if title:
                quoted += [f"> **{title}**", ">"]
            quoted += ["> " + l if l.strip() else ">" for l in inner.split("\n")]
            while quoted and quoted[-1].strip() == ">":
                quoted.pop()
            return "\n".join(quoted)

        if kind == "cards":
            # 卡片本身就是 ### 小标题 + 段落，天然合法；只需清掉配色后缀
            return re.sub(r"\s*\{\.\w+\}\s*$", "", inner, flags=re.M)

        if kind == "details":
            return f"**▶ {args}**\n\n{inner}"

        if kind == "tabs":
            parts = re.split(r"^@@\s*(.+)$", "\n".join(node_text(c) for c in ch), flags=re.M)
            segs = []
            if parts and parts[0].strip():
                segs.append(parts[0].strip())
            for k in range(1, len(parts), 2):
                segs.append(f"#### {parts[k].strip()}\n\n{(parts[k+1] if k+1 < len(parts) else '').strip()}")
            return "\n\n".join(segs)

        return inner


# ══════════════════════════════════════════════════════════════════════════
# 5. 章节切分
# ══════════════════════════════════════════════════════════════════════════
def split_sections(body: str) -> list:
    """以一级标题切分；`<!-- nav:组名 -->` 控制侧栏分组"""
    lines = body.split("\n")
    sections: list = []
    cur = None
    nav = "正文"
    fence = False

    for line in lines:
        s = line.strip()
        if s.startswith("```"):
            fence = not fence
        if not fence:
            m = re.match(r"^<!--\s*nav\s*:\s*(.+?)\s*-->$", s)
            if m:
                nav = m.group(1)
                continue
            if re.match(r"^#\s+\S", line):
                if cur:
                    sections.append(cur)
                cur = {"title": line.lstrip("#").strip(), "lines": [], "nav": nav}
                continue
        if cur is not None:
            cur["lines"].append(line)
    if cur:
        sections.append(cur)

    for sec in sections:
        title = sec["title"]
        appendix = bool(re.search(r"\{\.appendix\}", title))
        title = re.sub(r"\{\.appendix\}", "", title)
        title = re.sub(r"\{\.\w+\}\s*$", "", title).strip()
        sec["title"] = title
        sec["appendix"] = appendix
        sec["body"] = "\n".join(sec["lines"]).strip("\n")
    sections = [s for s in sections if s["title"]]

    # 统一编号：正文 00,01,02…  附录 A,B,C…
    n_norm = n_app = 0
    for sec in sections:
        if sec["appendix"]:
            sec["num"] = chr(ord("A") + n_app)
            n_app += 1
        else:
            sec["num"] = f"{n_norm:02d}"
            n_norm += 1
    return sections


def md_inline(s: str) -> str:
    """把 front matter 里可能内联的 HTML 转成等价 Markdown"""
    s = re.sub(r"<strong>(.*?)</strong>", r"**\1**", s)
    s = re.sub(r"<b>(.*?)</b>", r"**\1**", s)
    s = re.sub(r"<em>(.*?)</em>", r"*\1*", s)
    s = re.sub(r"<br\s*/?>", "\n", s)
    return s


def make_shell() -> str:
    """从 base-template.html 派生一次性骨架（含占位符）"""
    shell_path = ASSETS_DIR / "shell.html"
    if shell_path.exists():
        return shell_path.read_text(encoding="utf-8")
    src = (ASSETS_DIR / "base-template.html").read_text(encoding="utf-8")
    style = src[src.index("<style>"): src.index("</style>") + 8]
    js = src[src.index("<script>"): src.index("</script>") + 9]
    # 只取通用段（进度条 / 导航高亮 / Tab），切掉主题专属工具函数。
    # 注意：片段保留了开头的 <script>，必须显式补上闭合的 </script>，
    # 否则后续内容会被当成脚本内容，撞到下一个 <script> 时报 Unexpected token '<'。
    common = js[: js.index("/* ---------- 3.")].rstrip() + "\n  })();\n</script>\n"

    shell = "\n".join([
        "<!DOCTYPE html>",
        '<html lang="zh-CN">',
        "<head>",
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        "<title>@@TITLE@@</title>",
        style,
        "</head>",
        "<body>",
        '<div id="progress"></div>',
        '<div class="wrap">',
        "<aside>",
        '  <div class="brand">全景认知与实践操作手册<small>@@BRAND_SUB@@</small></div>',
        '  <nav id="nav">',
        "@@NAV@@",
        "  </nav>",
        "</aside>",
        "<main>",
        "@@HERO@@",
        "@@SECTIONS@@",
        "<footer>@@FOOTER@@</footer>",
        "</main>",
        "</div>",
        '<button class="totop" id="totop" aria-label="返回顶部">↑</button>',
        common,
        "<script>@@THEME_JS@@</script>",
        "</body>",
        "</html>",
        "",
    ])
    shell_path.write_text(shell, encoding="utf-8")
    return shell


# ══════════════════════════════════════════════════════════════════════════
# 6. 构建
# ══════════════════════════════════════════════════════════════════════════
def build_one(path: pathlib.Path) -> dict:
    meta, body = parse_front_matter(path.read_text(encoding="utf-8"))
    slug = meta.get("slug") or path.stem
    title = meta.get("title") or slug
    r = Renderer()
    mdr = MdRenderer(meta.get("md_raw", "hint"), meta.get("md_raw_hint"))

    sections = split_sections(body)

    # ---------- HTML ----------
    nav, secs_html = [], []
    for i, sec in enumerate(sections):
        num = sec["num"]
        anchor = f"s{i}"
        nav.append(f'    <a href="#{anchor}"><i>{num}</i>{html_mod.escape(sec["title"])}</a>')
        inner = r.blocks(parse_blocks(sec["body"]), meta.get("md_raw", "hint"), "")
        secs_html.append(
            f'<!-- ══════════════ {num} ══════════════ -->\n'
            f'<section id="{anchor}">\n'
            f'<h2><span class="num">{num}</span>{html_mod.escape(sec["title"])}</h2>\n'
            f"{inner}\n</section>"
        )

    # nav 分组
    nav_out, seen = [], None
    for i, sec in enumerate(sections):
        if sec["nav"] != seen:
            seen = sec["nav"]
            nav_out.append(f'    <div class="navgroup">{html_mod.escape(seen)}</div>')
        nav_out.append(nav[i])

    chips = meta.get("chips", [])
    if isinstance(chips, str):
        chips = [c.strip() for c in chips.split("|") if c.strip()]
    chips_html = "\n".join(
        f'    <span class="chip{" b" if k == 0 else ""}">{html_mod.escape(c)}</span>'
        for k, c in enumerate(chips)
    )
    hero = "\n".join([
        '<div class="hero">',
        f'  <div class="kicker">{html_mod.escape(meta.get("kicker", "Panoramic Cognition & Practice Engine"))}</div>',
        f"  <h1>{html_mod.escape(title)}</h1>",
        f'  <p class="sub">{meta.get("subtitle", "")}</p>',
        '  <div class="meta">',
        chips_html,
        "  </div>",
        "</div>",
    ])

    date = meta.get("date", "")
    # 耗时统计：front matter 的 elapsed_min 优先（跨会话/手工跑的场景可手写），
    # 否则从 state.json 读 queue.py 记录的真实运行时长
    if meta.get("elapsed_min"):
        try:
            elapsed = float(meta["elapsed_min"]) * 60
        except (TypeError, ValueError):
            elapsed = None
    else:
        elapsed = topic_runtime(slug)
    elapsed_txt = f" · 耗时 {humanize(elapsed)}" if elapsed is not None else ""
    footer = "\n".join([
        f"  <p>《{html_mod.escape(title)} · 全景认知与实践操作手册》 · 生成于 {date}{elapsed_txt}"
        f"{' · 数据截至 ' + str(meta['data_asof']) if meta.get('data_asof') else ''}</p>",
        f"  <p>{meta.get('footer_note', '本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。')}</p>",
    ])

    theme_js = meta.get("theme_js_file", "")
    js_code = ""
    if theme_js:
        p = CONTENT_DIR / theme_js
        if p.exists():
            js_code = p.read_text(encoding="utf-8")

    shell = make_shell()
    out_html = (shell
                .replace("@@TITLE@@", html_mod.escape(title) + " · 全景认知与实践操作手册")
                .replace("@@BRAND_SUB@@", html_mod.escape(str(meta.get("brand_sub", ""))))
                .replace("@@NAV@@", "\n".join(nav_out))
                .replace("@@HERO@@", hero)
                .replace("@@SECTIONS@@", "\n\n".join(secs_html))
                .replace("@@FOOTER@@", footer)
                .replace("@@THEME_JS@@", js_code))

    # ---------- Markdown ----------
    tags = meta.get("tags", "")
    if isinstance(tags, list):
        tags = "、".join(tags)
    md_out = [f"# {title} · 全景认知与实践操作手册", ""]
    if meta.get("subtitle"):
        md_out += [f"> {md_inline(meta['subtitle'])}", ""]
    md_out += [f"> 生成于 {date}{elapsed_txt.replace(' · ', '｜') if elapsed_txt else ''}"
               f"｜主题：{title}" + (f"｜标签：{tags}" if tags else ""), "", "---", ""]
    for sec in sections:
        md_out.append(f"## {sec['num']} · {sec['title']}")
        md_out.append("")
        md_out.append(mdr.blocks(parse_blocks(sec["body"])).strip())
        md_out.append("")
    md_text = re.sub(r"\n{4,}", "\n\n\n", "\n".join(md_out)).rstrip() + "\n"

    DIST_DIR.mkdir(parents=True, exist_ok=True)
    (DIST_DIR / f"{slug}.html").write_text(out_html, encoding="utf-8")
    (DIST_DIR / f"{slug}.md").write_text(md_text, encoding="utf-8")

    return {
        "slug": slug, "title": title,
        "sections": len(sections),
        "elapsed": elapsed,
        "html_kb": len(out_html.encode()) / 1024,
        "md_kb": len(md_text.encode()) / 1024,
        "tools": len(re.findall(r'class="tool"', out_html)),
        "svg": len(re.findall(r"<svg", out_html)),
        "details": len(re.findall(r"<details", out_html)),
        "tabs": len(re.findall(r'class="tabs"', out_html)),
        "warns": lint_output(out_html),
    }


def lint_output(out_html: str) -> list:
    """静态校验：专抓「页面看起来正常，但交互静默失效」这类难查的问题。

    最典型的一种：内容源的 :::raw 工具里漏写了某个 <div id="xx_v">，
    而主题脚本里有 $(‘xx_v’).style.color = ...，
    运行时抛 TypeError → 该工具后续全部代码被跳过（滑块无响应、canvas 不绘制）。
    页面视觉完全正常，只有动手拖滑块才发现是死的。
    """
    warns = []
    if "<script>" not in out_html:
        return ["没有找到 <script> 块"]

    html_part = out_html[: out_html.index("<script>")]
    declared = set(re.findall(r'id="([\w-]+)"', html_part))
    scripts = re.findall(r"<script>(.*?)</script>", out_html, re.S)

    refs = set()
    for js in scripts:
        for pat in (r"\$\('#?([\w-]+)'\)", r'\$\("#?([\w-]+)"\)',
                    r"getElementById\('([\w-]+)'\)", r'getElementById\("([\w-]+)"\)'):
            refs |= set(re.findall(pat, js))

    missing = sorted(refs - declared)
    if missing:
        warns.append("脚本引用了不存在的 id：" + "、".join(missing) +
                     "  → 运行时会抛 TypeError，整个工具静默失效")

    if len(scripts) != 2:
        warns.append(f"<script> 块数为 {len(scripts)}，应为 2（通用 + 主题）")
    for i, js in enumerate(scripts):
        if "<script>" in js:
            warns.append(f"第 {i} 个 script 块内嵌了 <script> 标签，会导致解析崩溃")

    if "&amp;amp;" in out_html:
        warns.append("检测到 &amp;amp; 双重转义：front matter 标量字段请写纯文本，不要预写 HTML 实体")

    return warns


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}

    files = sorted(p for p in CONTENT_DIR.glob("*.md") if not p.name.startswith("_"))
    if args:
        files = [p for p in files if p.stem in args]
    if not files:
        print("content/ 下没有可构建的内容源（以 _ 开头的文件会被忽略）")
        return 1

    if "--list" in flags:
        for p in files:
            meta, _ = parse_front_matter(p.read_text(encoding="utf-8"))
            print(f"  {p.stem:28s} {meta.get('title', '')}")
        return 0

    print(f"构建 {len(files)} 个主题\n" + "─" * 62)
    ok = True
    for p in files:
        try:
            st = build_one(p)
            el = f"耗时 {humanize(st['elapsed'])}" if st.get("elapsed") is not None else "耗时 —"
            print(f"  ✔ {st['slug']:26s} {st['sections']:2d} 节  "
                  f"HTML {st['html_kb']:6.1f}KB   MD {st['md_kb']:5.1f}KB  "
                  f"│ 工具{st['tools']} SVG{st['svg']} 折叠{st['details']} Tab{st['tabs']} │ {el}")
            for w in st["warns"]:
                ok = False
                print(f"    ⚠ {w}")
        except Exception as e:
            ok = False
            print(f"  ✘ {p.stem:26s} 失败：{type(e).__name__}: {e}")
    print("─" * 62)
    print("完成" if ok else "有失败项或警告，请修正后重建")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
