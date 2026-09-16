#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
================================================================================
 主题队列状态机
================================================================================

 人只编辑 queue.md（一行一个主题）；机器状态存在 state.json。

     queue.md                        state.json
     - [ ] HBM 高带宽内存 @hbm   ──▶  {slug, status, started, finished, outputs}
     - [ ] CPO 共封装光学 @cpo

 命令：
     python3 queue.py list                  # 查看队列与进度
     python3 queue.py next                  # 取下一个待处理主题（JSON，供流程消费）
     python3 queue.py done  <序号|slug>     # 标记完成（落盘耗时 + 自动重建双格式）
     python3 queue.py fail  <序号|slug> 原因 # 标记失败
     python3 queue.py reset <序号|slug>     # 重置为待处理
     python3 queue.py add   "主题标题" @slug # 追加到队列
     python3 queue.py stats                 # 运行耗时统计 + 定时任务间隔建议
     python3 queue.py sync                  # 把 queue.md 的增删同步进 state.json

 批量执行（一次取多个待处理主题，跑完一个立刻接下一个）：
     python3 queue.py batch                 # 批量清单：全部待处理主题（并落盘批次）
     python3 queue.py batch --limit 3       # 只取前 3 个
     python3 queue.py batch --json          # 机器可读（供流程消费）
     python3 queue.py batch --summary       # 当前批次的逐项状态（收尾汇报用）
     python3 queue.py next --skip-failed    # 批量循环内取单个主题（不让失败项卡住队列）

 多队列（同时推进互不干扰的两条线）：
     python3 queue.py list  --queue queue2.md    # 换一条队列，状态落到 state.queue2.json
     python3 queue.py batch --queue queue2.md    # 该队列的批量清单
     省略 --queue 即默认 queue.md ↔ state.json；两条队列的主题、批次、耗时完全隔离。
================================================================================
"""
from __future__ import annotations

import datetime
import json
import math
import pathlib
import re
import subprocess
import sys
import unicodedata

ROOT = pathlib.Path(__file__).resolve().parent          # tools/
PROJECT_ROOT = ROOT.parent                              # 项目根：PanoramicCognitionPracticeEngine/
QUEUE_MD = ROOT / "queue.md"
STATE = ROOT / "state.json"
DIST = PROJECT_ROOT / "reports"                         # 生成物统一落在 <项目根>/reports/


def bind_queue(path=None) -> None:
    """把「队列文件 ↔ 状态文件」绑成一对。

    默认 queue.md ↔ state.json。指定别的队列（如 queue2.md）时，
    状态自动落到 state.queue2.json —— 两条队列各自记录主题、批次与耗时，
    互不覆盖。路径相对 tools/ 解析，也接受绝对路径。
    """
    global QUEUE_MD, STATE
    if not path or pathlib.Path(str(path)).name == "queue.md":
        QUEUE_MD, STATE = ROOT / "queue.md", ROOT / "state.json"
        return
    p = pathlib.Path(str(path)).expanduser()
    QUEUE_MD = p if p.is_absolute() else (ROOT / p).resolve()
    STATE = ROOT / f"state.{QUEUE_MD.stem}.json"

STATUS_LABEL = {
    "pending": "待处理",
    "running": "进行中",
    "done": "已完成",
    "failed": "失败",
    "removed": "已移除",
}
STATUS_ICON = {"pending": "○", "running": "◐", "done": "●", "failed": "✘", "removed": "—"}

# 「进行中」超过这么久没有动静，就判定为上一次跑中断了，批量执行可以接管。
# 与定时任务的并发保护阈值一致（2 × 推荐间隔）：刚被别的流程领走、正在跑的主题
# 不会被批量流程抢走，避免同一主题被两处同时加工。
STALE_MIN = 120


def now() -> str:
    """给人看的展示用时间（分钟精度）"""
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M")


def stamp() -> str:
    """落盘用的时间戳——秒精度。

    分钟精度会让耗时统计带上最多 59 秒的截断误差，
    而耗时又要用来反推定时任务的间隔，所以这里必须精确。
    """
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def parse_ts(s):
    """容忍 '2026-09-16 15:06' 与 '2026-09-16 15:06:00' 两种写法"""
    if not s:
        return None
    try:
        return datetime.datetime.fromisoformat(str(s).strip().replace(" ", "T", 1))
    except ValueError:
        return None


def runtime_of(t: dict):
    """该主题的运行耗时（秒）；取不到返回 None"""
    if t.get("duration_sec"):
        return float(t["duration_sec"])
    t0, t1 = parse_ts(t.get("started")), parse_ts(t.get("finished"))
    if t0 and t1:
        return max(0.0, (t1 - t0).total_seconds())
    return None


def humanize(seconds: float) -> str:
    """秒 → '48 秒' / '22 分 30 秒' / '1 小时 12 分'"""
    s = int(round(seconds))
    if s < 60:
        return f"{s} 秒"
    m, sec = divmod(s, 60)
    if m < 60:
        return f"{m} 分" + (f" {sec} 秒" if sec else "")
    h, m = divmod(m, 60)
    return f"{h} 小时" + (f" {m} 分" if m else "")


# ── 解析 queue.md ────────────────────────────────────────────────────────
ITEM_RE = re.compile(r"^\s*[-*]\s*\[([ xX])\]\s*(.+?)\s*$")


def clean_title(t: str) -> str:
    """剥掉标题上的 Markdown 装饰。

    队列里写 **威科夫操盘法** 是给人看的强调，但若原样当文件名，
    星号在 shell 里是通配符，会引发难以定位的问题。
    """
    t = re.sub(r"\*\*(.+?)\*\*", r"\1", t)
    t = re.sub(r"__(.+?)__", r"\1", t)
    t = re.sub(r"\*(.+?)\*", r"\1", t)
    t = t.replace("`", "").replace("~~", "")
    return t.strip()


def parse_queue() -> list:
    if not QUEUE_MD.exists():
        return []
    # 先剥掉 HTML 注释，否则注释里的示例行会被当成真主题
    raw = re.sub(r"<!--.*?-->", "", QUEUE_MD.read_text(encoding="utf-8"), flags=re.S)
    items, seen = [], set()
    for line in raw.split("\n"):
        m = ITEM_RE.match(line)
        if not m:
            continue
        checked, text = m.group(1).lower() == "x", m.group(2)
        slug = None
        ms = re.search(r"@([A-Za-z0-9][\w.\-]*)\s*$", text)
        if ms:
            slug = ms.group(1)
            text = text[: ms.start()].strip()
        title = clean_title(text)
        slug = re.sub(r'[/\\:*?"<>|]', "-", slug or title).strip()
        if not slug or slug in seen:
            continue
        seen.add(slug)
        items.append({"slug": slug, "title": title, "checked": checked})
    return items


def load_state() -> dict:
    if STATE.exists():
        return json.loads(STATE.read_text(encoding="utf-8"))
    return {"topics": [], "updated": ""}


def save_state(st: dict) -> None:
    st["updated"] = now()
    STATE.write_text(json.dumps(st, ensure_ascii=False, indent=2), encoding="utf-8")


def sync(st: dict) -> dict:
    """queue.md 是输入真相源：补齐新增，标记被删掉的"""
    topics = parse_queue()
    by_slug = {t["slug"]: t for t in st["topics"]}
    keep = []
    for item in topics:
        cur = by_slug.get(item["slug"])
        if cur is None:
            cur = {
                "slug": item["slug"],
                "title": item["title"],
                "status": "done" if item["checked"] else "pending",
                "started": None,
                "finished": now() if item["checked"] else None,
                "duration_sec": None,
                "outputs": [],
                "error": None,
            }
            if item["checked"]:
                cur["outputs"] = detect_outputs(item["slug"])
        else:
            cur["title"] = item["title"]
            if item["checked"] and cur["status"] not in ("done",):
                cur["status"] = "done"
                cur["finished"] = cur["finished"] or now()
                cur["outputs"] = detect_outputs(item["slug"])
        keep.append(cur)
    for t in st["topics"]:
        if t["slug"] not in {i["slug"] for i in topics}:
            t["status"] = "removed"
            keep.append(t)
    st["topics"] = keep
    return st


def set_queue_check(slug: str, title: str, checked: bool) -> bool:
    """把 queue.md 里对应那行的勾选状态改成 checked。

    不能用标题做精确正则——队列里可能写成 **威科夫操盘法**，
    所以统一走 clean_title 归一化后再比对。

    必须双向同步：sync() 是把 queue.md 当输入真相源的，
    如果 reset 后文件里还留着 [x]，下一次 sync 就会把状态又推回 done，
    重置静默失效。
    """
    if not QUEUE_MD.exists():
        return False
    lines = QUEUE_MD.read_text(encoding="utf-8").split("\n")
    want = "x" if checked else " "
    for k, line in enumerate(lines):
        m = ITEM_RE.match(line)
        if not m or m.group(1).lower() == want:
            continue
        raw = re.sub(r"@[A-Za-z0-9][\w.\-]*\s*$", "", m.group(2)).strip()
        if clean_title(raw) in (title, slug):
            lines[k] = re.sub(r"\[[ xX]\]", f"[{want}]", line, count=1)
            QUEUE_MD.write_text("\n".join(lines), encoding="utf-8")
            return True
    return False


def detect_outputs(slug: str) -> list:
    outs = []
    for ext in ("html", "md"):
        p = DIST / f"{slug}.{ext}"
        if p.exists():
            outs.append(f"reports/{slug}.{ext}")
    return outs


def resolve(st: dict, key: str):
    """按序号（从 1 起）或 slug 定位主题"""
    if key.isdigit():
        idx = int(key) - 1
        if 0 <= idx < len(st["topics"]):
            return st["topics"][idx]
        return None
    for t in st["topics"]:
        if t["slug"] == key:
            return t
    return None


# ── 命令 ─────────────────────────────────────────────────────────────────
def cmd_list(st: dict) -> int:
    ts = st["topics"]
    if not ts:
        print("队列为空。在 queue.md 里加一行：  - [ ] 主题标题 @slug")
        return 0
    done = sum(1 for t in ts if t["status"] == "done")
    total = sum(1 for t in ts if t["status"] != "removed")
    print(f"\n主题队列   {done}/{total} 已完成        （更新于 {st.get('updated', '—')}）")
    b = batch_progress(st)
    if b:
        print(f"当前批次   {b['id']}   {b['done']}/{b['size']} 已完成"
              + (f"   失败 {b['failed']}" if b["failed"] else "")
              + f"   剩 {b['remaining']} 个")
    print("─" * 74)
    for i, t in enumerate(ts, 1):
        icon = STATUS_ICON.get(t["status"], "?")
        outs = f"  → {len(t['outputs'])} 个文件" if t["outputs"] else ""
        secs = runtime_of(t)
        spent = f"  ⏱ {humanize(secs)}" if secs is not None else ""
        err = f"   [{t['error']}]" if t.get("error") else ""
        print(f" {i:2d}. {icon} {STATUS_LABEL.get(t['status'], t['status']):4s} "
              f"{t['title']}  (@{t['slug']}){outs}{spent}{err}")
    print("─" * 74)
    nxt = next((i for i, t in enumerate(ts, 1) if t["status"] in ("pending", "failed")), None)
    print(f"下一个：第 {nxt} 项" if nxt else "全部处理完毕 ✔")
    return 0


def dwidth(s: str) -> int:
    """显示宽度——中文/全角算 2 列，否则按字符数对齐会歪"""
    return sum(2 if unicodedata.east_asian_width(c) in "WF" else 1 for c in s)


def pad(s: str, width: int) -> str:
    return s + " " * max(0, width - dwidth(s))


def cmd_stats(st: dict) -> int:
    """按实际运行耗时反推定时任务的间隔。

    规则：推荐间隔 = max(1, ceil(最长单主题耗时 × 1.5 ÷ 60 分)) 小时

    取「最长」而不是平均值——间隔必须容得下最坏的那一次；
    1.5 倍是安全垫，保证上一轮跑完还有余量，不会下一轮触发时还在跑。
    下限 1 小时（调度最小粒度），上限 12 小时（再慢也不至于隔天以上）。
    """
    live = [t for t in st["topics"] if t["status"] != "removed"]
    rows = [t for t in live if runtime_of(t) is not None]
    skipped = [t["title"] for t in live if runtime_of(t) is None]

    if not rows:
        print("\n运行耗时统计：还没有任何耗时记录")
        print("  （queue.py done 时才会落盘耗时；早期手工归档的主题无法追溯）")
        print("  先用保守默认值：每 2 小时一次")
        print("RECOMMEND_HOURS=2")
        return 0

    spent = [runtime_of(t) for t in rows]
    avg, mx = sum(spent) / len(spent), max(spent)
    # 注意单位：spent 是秒，先除以 3600 换成小时
    hours = max(1, min(12, math.ceil(mx * 1.5 / 3600)))

    print(f"\n运行耗时统计        （{len(rows)} 个主题有记录）")
    print("─" * 74)
    wmax = max(dwidth(t["title"]) for t in rows)
    for t in rows:
        s = runtime_of(t)
        bar = "█" * max(1, int(round(s / mx * 30)))
        print(f"  {pad(t['title'], wmax + 2)}{humanize(s):>12s}  {bar}")
    print("─" * 74)
    print(f"  平均 {humanize(avg)}      最长 {humanize(mx)}")
    if skipped:
        print(f"  无记录：{'、'.join(skipped)}")
    print(f"\n  推荐间隔：每 {hours} 小时一次")
    print(f"  （= ceil(最长 {humanize(mx)} × 1.5 ÷ 60 分) = {hours} 小时，下限 1 小时）")
    print(f"RECOMMEND_HOURS={hours}")
    return 0


def cmd_next(st: dict, skip_failed: bool = False) -> int:
    """取一个主题并置为「进行中」。

    skip_failed：批量循环专用。默认的 next 会把 failed 也视为可领取，
    这在单主题模式没问题；但批量循环里一旦某项失败，它仍排在队首，
    next 会反复把它捞回来——队列就此卡死。批量流程因此跳过 failed，
    失败项交给人工 reset 决定是否重跑。
    """
    pool = ("pending",) if skip_failed else ("pending", "failed")
    t = next((t for t in st["topics"] if t["status"] in pool), None)
    if not t:
        print("__QUEUE_EMPTY__")
        return 3
    t["status"] = "running"
    t["started"] = stamp()
    t["error"] = None
    save_state(st)
    idx = st["topics"].index(t) + 1
    out = {
        "index": idx, "slug": t["slug"], "title": t["title"],
        "content_file": f"content/{t['slug']}.md",
        "outputs": [f"reports/{t['slug']}.html", f"reports/{t['slug']}.md"],
        "remaining": sum(1 for x in st["topics"] if x["status"] in pool),
    }
    b = batch_progress(st)
    if b:
        out["batch"] = b
    print(json.dumps(out, ensure_ascii=False, indent=2))
    return 0


# ── 批量执行 ─────────────────────────────────────────────────────────────
def new_batch_id() -> str:
    return "B" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")


def is_stranded(t: dict, stale_min: int = STALE_MIN) -> bool:
    """「进行中」但久无动静 → 上一次跑中断了，可由批量流程接管"""
    if t["status"] != "running":
        return False
    t0 = parse_ts(t.get("started"))
    if not t0:
        return True                     # 连开始时间都没有，无从判断，直接接管
    return (datetime.datetime.now() - t0).total_seconds() > stale_min * 60


def workable_topics(st: dict, stale_min: int = STALE_MIN, adopt: bool = True):
    """本批次可执行的主题，保持队列顺序。

    口径 = pending + 被接管的僵尸 running。
    - failed 不在其中：批量模式约定「失败即跳过」，重跑要显式 reset。
    - 新鲜 running 也不在其中：可能正被别的流程加工，抢过来会做重复功。
    """
    live = [t for t in st["topics"] if t["status"] != "removed"]
    pool, adopted = [], []
    for t in live:
        if t["status"] == "pending":
            pool.append(t)
        elif is_stranded(t, stale_min):
            pool.append(t)
            if adopt:
                t.update(status="pending", started=None, error=None)
                adopted.append(t)
    return pool, adopted


def batch_progress(st: dict):
    """当前批次的进度（没有批次时返回 None）"""
    b = st.get("batch") or {}
    slugs = b.get("slugs") or []
    if not slugs:
        return None
    want = set(slugs)
    members = [t for t in st["topics"] if t["slug"] in want]
    if not members:
        return None
    done = sum(1 for t in members if t["status"] == "done")
    failed = sum(1 for t in members if t["status"] == "failed")
    return {"id": b.get("id"), "size": len(slugs), "done": done,
            "failed": failed, "remaining": len(slugs) - done - failed}


def cmd_batch(st: dict, limit=None, as_json=False, dry_run=False,
              stale_min: int = STALE_MIN, adopt: bool = True) -> int:
    pool, adopted = workable_topics(st, stale_min, adopt and not dry_run)
    for t in adopted:
        print(f"  ↺ 接管中断主题：{t['title']}（此前卡在「进行中」）")

    if not pool:
        print("__QUEUE_EMPTY__")
        return 3

    picked = pool[:limit] if limit else pool
    rest = len(pool) - len(picked)
    bid = new_batch_id()

    if not dry_run:
        st["batch"] = {
            "id": bid,
            "started": stamp(),
            "limit": limit,
            "size": len(picked),
            "slugs": [t["slug"] for t in picked],
        }
        save_state(st)

    rows = []
    for n, t in enumerate(picked, 1):
        rows.append({
            "seq": n,
            "index": st["topics"].index(t) + 1,
            "slug": t["slug"],
            "title": t["title"],
            "content_file": f"content/{t['slug']}.md",
            "outputs": [f"reports/{t['slug']}.html", f"reports/{t['slug']}.md"],
            "has_content": (ROOT / "content" / f"{t['slug']}.md").exists(),
        })

    if as_json:
        print(json.dumps({
            "batch_id": bid,
            "size": len(picked),
            "pending_total": len(pool),
            "remaining_after": rest,
            "adopted": [t["slug"] for t in adopted],
            "topics": rows,
        }, ensure_ascii=False, indent=2))
        return 0

    print(f"\n批量清单   {bid}   本次 {len(picked)} 个"
          + (f"（队列待处理共 {len(pool)} 个）" if rest else "")
          + ("   [dry-run，未落盘]" if dry_run else ""))
    print("─" * 74)
    w = max(dwidth(r["title"]) for r in rows)
    for r in rows:
        src = "内容源已有" if r["has_content"] else "待写内容源"
        print(f"  {r['seq']:2d}. 队列#{r['index']:<3d} {pad(r['title'], w + 2)}{src}")
    print("─" * 74)
    if rest:
        print(f"  本批跑完队列还剩 {rest} 个（再跑一次 batch 即可接着来）")
    print(f"  循环：python3 queue.py next --skip-failed  →  写作/构建/校对  →  done <slug>")
    print(f"  失败：python3 queue.py fail <slug> \"原因\" 后立即接下一个（failed 不会被 next 重领）")
    return 0


def cmd_batch_summary(st: dict) -> int:
    """收尾汇报：当前批次逐项状态 + 耗时"""
    b = st.get("batch")
    if not b or not b.get("slugs"):
        print("还没有批量批次记录。先跑：python3 tools/queue.py batch")
        return 1
    by_slug = {t["slug"]: t for t in st["topics"]}
    members = [by_slug[s] for s in b["slugs"] if s in by_slug]
    if not members:
        print(f"批次 {b.get('id')} 的成员已不在队列里（可能被 reset 或被改名）")
        return 1
    tally = {}
    for t in members:
        tally[t["status"]] = tally.get(t["status"], 0) + 1
    secs = sum(runtime_of(t) or 0 for t in members)

    print(f"\n批次 {b.get('id')}   {b.get('started', '—')} 开始   共 {len(b['slugs'])} 个")
    print("─" * 74)
    w = max(dwidth(t["title"]) for t in members)
    for t in members:
        s = runtime_of(t)
        spent = f"  ⏱ {humanize(s)}" if s is not None else ""
        err = f"   [{t['error']}]" if t.get("error") else ""
        print(f"  {STATUS_ICON.get(t['status'], '?')} {pad(t['title'], w + 2)}"
              f"{STATUS_LABEL.get(t['status'], t['status'])}{spent}{err}")
    print("─" * 74)
    print("  " + "  ".join(f"{STATUS_LABEL.get(k, k)} {v}" for k, v in tally.items())
          + f"   累计耗时 {humanize(secs) if secs else '—'}")
    left = tally.get("pending", 0) + tally.get("running", 0)
    print("  ✔ 本批已全部处理完" if not left
          else f"  还有 {left} 个没跑完 —— 说「继续批量」接着来")
    return 0


def rebuild(slug: str) -> None:
    """done 之后重建双格式。

    构建通常发生在 done 之前，那时耗时只能按「开始 → 此刻」估算；
    这里用最终记录值再刷一次，页脚里的耗时才是准的。
    重建失败不影响「已完成」这个结论。
    """
    if not (ROOT / "content" / f"{slug}.md").exists():
        print(f"  （content/{slug}.md 不存在，跳过重建）")
        return
    try:
        r = subprocess.run(
            [sys.executable, str(ROOT / "build.py"), slug],
            capture_output=True, text=True, cwd=str(ROOT), timeout=300)
    except (OSError, subprocess.SubprocessError) as e:
        print(f"  ⚠ 重建失败（不影响完成状态）：{type(e).__name__}: {e}")
        return
    for line in (r.stdout or "").strip().split("\n")[1:]:
        if line.strip():
            print("  " + line.rstrip())
    if r.returncode != 0:
        print("  ⚠ 重建有警告，请查看上面输出")


def cmd_done(st: dict, key: str, do_rebuild: bool = True) -> int:
    t = resolve(st, key)
    if not t:
        print(f"找不到：{key}")
        return 1
    t["status"] = "done"
    t["finished"] = stamp()
    secs = runtime_of(t)
    if secs is not None:
        t["duration_sec"] = int(secs)
    t["outputs"] = detect_outputs(t["slug"])
    t["error"] = None
    save_state(st)
    set_queue_check(t["slug"], t["title"], True)
    spent = f"  耗时 {humanize(t['duration_sec'])}" if t.get("duration_sec") else ""
    print(f"✔ 已完成：{t['title']}{spent}  →  {', '.join(t['outputs']) or '（未检测到产出）'}")
    if do_rebuild:
        rebuild(t["slug"])
    return 0


def cmd_fail(st: dict, key: str, reason: str) -> int:
    t = resolve(st, key)
    if not t:
        print(f"找不到：{key}")
        return 1
    t["status"] = "failed"
    t["error"] = reason
    t["finished"] = stamp()
    save_state(st)
    print(f"✘ 已标记失败：{t['title']}  —— {reason}")
    return 0


def cmd_reset(st: dict, key: str) -> int:
    t = resolve(st, key)
    if not t:
        print(f"找不到：{key}")
        return 1
    t.update(status="pending", started=None, finished=None,
             duration_sec=None, error=None)
    save_state(st)
    unticked = set_queue_check(t["slug"], t["title"], False)
    print(f"↺ 已重置：{t['title']}"
          + ("（已同步取消 queue.md 里的勾选）" if unticked else ""))
    return 0


def cmd_add(title: str, slug: str | None) -> int:
    slug = slug or title
    if not QUEUE_MD.exists():
        QUEUE_MD.write_text("# 主题队列\n\n", encoding="utf-8")
    txt = QUEUE_MD.read_text(encoding="utf-8")
    if f"@{slug}" in txt or f"] {title}" in txt:
        print(f"已存在：{title}")
        return 1
    if not txt.endswith("\n"):
        txt += "\n"
    line = f"- [ ] {title}" + (f" @{slug}" if slug != title else "")
    txt = txt.rstrip("\n") + "\n" + line + "\n"
    QUEUE_MD.write_text(txt, encoding="utf-8")
    print(f"＋ 已加入队列：{title}  (@{slug})")
    return 0


def _flag_int(argv: list, name: str, default=None):
    """取 `--name 3` 或 `--name=3` 的整数值"""
    for i, a in enumerate(argv):
        if a == name and i + 1 < len(argv):
            try:
                return int(argv[i + 1])
            except ValueError:
                return default
        if a.startswith(name + "="):
            try:
                return int(a.split("=", 1)[1])
            except ValueError:
                return default
    return default


def _flag_str(argv: list, name: str, default=None):
    """取 `--name x` 或 `--name=x` 的字符串值"""
    for i, a in enumerate(argv):
        if a == name and i + 1 < len(argv):
            return argv[i + 1]
        if a.startswith(name + "="):
            return a.split("=", 1)[1]
    return default


def _strip_flag(argv: list, name: str) -> list:
    """把 `--name x` / `--name=x` 从参数表里摘掉（值和标志一起摘）"""
    out, skip = [], False
    for a in argv:
        if skip:
            skip = False
            continue
        if a == name:
            skip = True
            continue
        if a.startswith(name + "="):
            continue
        out.append(a)
    return out


def main() -> int:
    argv = sys.argv[1:]
    # 多队列支持：--queue <文件> 决定这一趟读哪条队列、写哪份状态
    bind_queue(_flag_str(argv, "--queue"))
    argv = _strip_flag(argv, "--queue")
    if not argv:
        argv = ["list"]
    cmd = argv[0]
    st = load_state()

    if cmd == "list":
        st = sync(st)
        save_state(st)
        return cmd_list(st)
    if cmd == "sync":
        st = sync(st)
        save_state(st)
        print(f"已同步：共 {len(st['topics'])} 个主题")
        return cmd_list(st)
    if cmd == "next":
        save_state(sync(st))
        return cmd_next(st, skip_failed="--skip-failed" in argv[1:])
    if cmd == "stats":
        save_state(sync(st))
        return cmd_stats(st)
    if cmd == "batch":
        save_state(sync(st))
        rest = argv[1:]
        if "--summary" in rest:
            return cmd_batch_summary(st)
        return cmd_batch(
            st,
            limit=_flag_int(rest, "--limit"),
            as_json="--json" in rest,
            dry_run="--dry-run" in rest,
            stale_min=_flag_int(rest, "--stale", STALE_MIN),
            adopt="--no-adopt" not in rest,
        )
    if cmd == "done":
        save_state(sync(st))
        flags = [a for a in argv[1:] if a.startswith("--")]
        key = next((a for a in argv[1:] if not a.startswith("--")), None)
        return cmd_done(st, key, do_rebuild="--no-build" not in flags) if key else 1
    if cmd == "fail":
        save_state(sync(st))
        return cmd_fail(st, argv[1], " ".join(argv[2:]) or "未说明") if len(argv) > 2 else 1
    if cmd == "reset":
        save_state(sync(st))
        return cmd_reset(st, argv[1]) if len(argv) > 1 else 1
    if cmd == "add":
        slug = next((a[1:] for a in argv if a.startswith("@")), None)
        title = " ".join(a for a in argv[1:] if not a.startswith("@"))
        if not title:
            print("用法：queue.py add \"主题标题\" @slug")
            return 1
        save_state(sync(st))
        return cmd_add(title, slug)

    print(__doc__)
    return 0


if __name__ == "__main__":
    sys.exit(main())
