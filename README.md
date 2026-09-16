# 全景认知与实践引擎

把一串主题**依次**加工成《全景认知与实践操作手册》，每个主题**同时**产出 HTML 交互版和 Markdown 版。

```
主题队列 ──▶ 检索 ──▶ 写内容源(.md) ──▶ 构建 ──▶ 校验 ──▶ 双格式交付 ──▶ 下一个主题
```

**引擎与产物分离**：所有脚本、版式母本、内容源都在 `tools/`；所有生成的手册都在 `reports/`。改代码只动 `tools/`，读报告只进 `reports/`。

---

## 目录结构

```
PanoramicCognitionPracticeEngine/
├── tools/                        引擎（工具）
│   ├── queue.md                  主题队列 ← 你只改这个文件（默认队列）
│   ├── queue2.md                 可选：第二条队列，用 --queue queue2.md 驱动（见「多条队列并跑」）
│   ├── queue.py                  队列状态机（取任务 / 批量清单 / 标记完成 / 耗时统计 / 断点续跑）
│   ├── build.py                  构建器：内容源 → HTML + MD
│   ├── state.json                运行状态（机器维护，别手改；含每个主题的运行耗时与当前批次）
│   ├── state.<队列名>.json        第二条队列的状态（如 state.queue2.json），与 state.json 完全隔离
│   ├── content/
│   │   ├── _TEMPLATE.md          内容源语法速查（下划线开头 = 不参与构建）
│   │   ├── selftest.md/.js       语法参考实现——看 reports/selftest.html 可知每个组件长什么样
│   │   ├── <slug>.md             每个主题的内容源（唯一真相源）
│   │   └── <slug>.js             可选：主题专属交互脚本
│   └── assets/
│       ├── base-template.html    版式母本（CSS + 通用 JS）
│       └── shell.html            构建器自动派生，可删（会重新生成）
├── reports/                      生成物（报告）
│   ├── <slug>.html               交付物 A：交互增强版
│   └── <slug>.md                 交付物 B：纯净 Markdown
├── web/                          报告站点（Next.js，可部署到 Vercel，见 docs/vercel-web.md）
└── docs/                         部署与运维文档
```

**核心设计**：内容只写一次。`tools/content/<slug>.md` 是唯一手写的文件，HTML 和 MD 都从它派生——所以两者永不脱节。

输出目录由 `build.py` / `queue.py` 里的 `DIST_DIR = PROJECT_ROOT / "reports"` 决定（`PROJECT_ROOT` 即 `tools/` 的上一级）。想把产物挪到别处，只改这一个常量。

---

## 日常操作

所有命令都在 `tools/` 目录下运行：

```bash
cd tools
```

> **用哪个 python**：`build.py` 依赖 `markdown` 包，而系统自带的 `python3` 没装。
> 本机统一用托管解释器：`/Users/nitai/.workbuddy/binaries/python/envs/default/bin/python`。
> `queue.py done` 会在内部调 `sys.executable` 重建双格式——**所以 `done` 也必须用同一个解释器跑**，否则重建会静默跳过（标记完成仍生效）。

### 加主题

直接编辑 `queue.md`：

```markdown
- [ ] HBM 高带宽内存 @hbm
- [ ] CPO 共封装光学 @cpo
```

`@hbm` 是输出文件名，可省略（省略就用标题）。改完同步一次：

```bash
python3 queue.py sync
```

也可以命令行加：`python3 queue.py add "HBM 高带宽内存" @hbm`

### 看进度

```bash
python3 queue.py list
```

```
 1. ● 已完成  量化交易与数学的关系  (@quant-math)  → 1 个文件
 2. ● 已完成  量化交易与博弈论的关系  (@量化交易与博弈论的关系)  → 2 个文件  ⏱ 7 分
 3. ● 已完成  投资与概率论的关系  (@投资与概率论的关系)  → 2 个文件  ⏱ 36 分
 4. ○ 待处理  威科夫操盘法  (@威科夫操盘法)
──────────────────────────────────────
下一个：第 4 项
```

`⏱` 是 `queue.py done` 时落盘的真实运行耗时。早期手工归档的主题没有记录，就不显示。

### 运行耗时与定时任务间隔

每个主题跑完，耗时会被记进 `state.json`，并写进成品的页脚：

> 《投资与概率论的关系 · 全景认知与实践操作手册》 · 生成于 2026-09-16 · **耗时 36 分** · 数据截至 2026 年 9 月

查全部统计，并按实测数据反推定时任务该隔多久触发：

```bash
python3 queue.py stats
```

```
运行耗时统计        （2 个主题有记录）
──────────────────────────────────────────────────────────
  量化交易与博弈论的关系           7 分  ██████
  投资与概率论的关系              36 分  ██████████████████████████████
──────────────────────────────────────────────────────────
  平均 21 分 30 秒      最长 36 分

  推荐间隔：每 1 小时一次
  （= ceil(最长 36 分 × 1.5 ÷ 60 分) = 1 小时，下限 1 小时）
RECOMMEND_HOURS=1
```

**规则**：`推荐间隔 = max(1, ceil(最长单主题耗时 × 1.5 ÷ 60)) 小时`

- 取**最长**而不是平均值——间隔必须容得下最坏的那一次，否则上一轮没跑完就撞上下一次触发。
- **1.5 倍**是安全垫。实测 36 分钟 → 54 分钟 → 取整 1 小时。
- 若某次主题耗时超过 40 分钟，推荐值会自动升到 2 小时；超过 80 分钟升到 3 小时。

定时任务的 prompt 里还留了一道并发保护：发现主题处于「进行中」且开始时间在 120 分钟内（= 2× 间隔），就直接退出，不开始新主题。

### 跑一个主题

流程由 AI 驱动（它负责检索、写作、校验）。你只需要说：

> 跑下一个主题

或者直接说明确的主题。AI 会执行下面的八阶段。

### 批量跑（一次把待办全跑完）

不想一个一个说「跑下一个」，就让 AI **批量执行**：

> 批量跑

AI 会走这条循环——取清单 → 逐条建 todo → 跑一个 → 立刻接下一个，中途不停：

```bash
python3 queue.py batch                 # ① 批量清单：全部待处理主题（并落盘批次）
# ② 对每个主题：next --skip-failed → 检索/写作/构建/校验 → done <slug>
python3 queue.py next --skip-failed    # 循环内取单个主题
python3 queue.py done  <slug>          # 完成（落盘耗时 + 自动重建双格式）
python3 queue.py fail  <slug> "原因"    # 失败：标记后立即接下一个
python3 queue.py batch --summary       # ③ 收尾：本批逐项状态 + 累计耗时
```

**三条约定：**

| 约定 | 为什么 |
|---|---|
| 循环内一律用 `next --skip-failed` | 普通 `next` 会把 `failed` 也当成可领取。某项失败后它仍排在队首，`next` 会反复把它捞回来，**队列就此卡死**。失败项交给 `queue.py reset <slug>` 显式重跑 |
| `batch` 会自动接管「僵尸」主题 | 上次跑中断留下的「进行中」，只要 `started` 早于 2× 推荐间隔（默认 120 分钟）就被判定为中断，自动 reset 回待处理并排进本批。刚被别的流程领走的热主题（`started` 很新）不会被抢，避免两处同时加工同一个主题。可用 `--stale N` 改阈值、`--no-adopt` 只列不改 |
| 跑到上下文上限就停，不算失败 | 单次会话仍建议 1–3 个高质量主题。停下来只要说明进度，下次说「继续批量」——`batch` 只列还没跑的，天然接着来 |

**选项**：`--limit N` 只取前 N 个｜`--json` 机器可读（供流程消费）｜`--dry-run` 只看清单不改状态。

### 多条队列并跑

默认只有一条队列（`queue.md` ↔ `state.json`）。想同时挂第二条线——比如主线在跑产业研究、支线在跑基础学科——再建一个 `queue2.md`，命令加 `--queue` 即可：

```bash
python3 queue.py list  --queue queue2.md     # 看第二条队列
python3 queue.py batch --queue queue2.md     # 取它的批量清单
python3 queue.py next  --skip-failed --queue queue2.md
python3 queue.py done  <slug> --queue queue2.md
```

两条队列的**主题、批次、耗时统计完全隔离**：`queue2.md` 的状态自动落到 `state.queue2.json`，不会覆盖主线的进度，`done` 也只勾选自己那条队列。`build.py` 会按 slug 在所有 `state*.json` 里找运行耗时，所以页脚的「耗时 xx 分」对哪条队列的主题都成立，不需要额外参数。

> 队列文件写在哪都行（相对 `tools/` 解析，也接受绝对路径）；只有文件名正好是 `queue.md` 时才等价于默认队列。

### 手动只构建

内容源改完后重新出两种格式：

```bash
python3 build.py            # 全部
python3 build.py hbm        # 指定 slug
python3 queue.py list
```

产物出现在 `../reports/`。

---

## 单个主题的八阶段

| # | 阶段 | 产出 / 动作 |
|---|---|---|
| 1 | 取任务 | `queue.py next` → 拿到 slug、标题、目标路径 |
| 2 | 联网核校 | 4–8 条检索：最新数据、代表机构、方法论批评、当期监管变化 |
| 3 | 写内容源 | `content/<slug>.md`，27 节骨架（见 `_TEMPLATE.md`） |
| 4 | 写交互脚本 | 需要可调模型时写 `content/<slug>.js`，并在 front matter 里 `theme_js_file` 指向它 |
| 5 | 构建 | `build.py <slug>` → `reports/<slug>.html` + `reports/<slug>.md` |
| 6 | 校验 | 标签平衡、脚本语法、**公式数值验算**、无头浏览器截图 |
| 7 | 交付 | 打开预览给用户 |
| 8 | 收尾 | `queue.py done <slug>` —— 落盘耗时，并用最终耗时自动重建双格式（页脚的耗时字段要准数） |

**跨会话接力**：状态存在 `state.json`，随时中断、随时 `queue.py next` 接着跑。标记为「进行中」的主题会被重新分配。

**失败不阻塞**：`queue.py fail <slug> "原因"`，队列会跳到下一个；之后 `queue.py reset <slug>` 可以重来（reset 会同步取消 `queue.md` 里的勾选，否则下次 `sync` 会把状态推回已完成）。

---

## 内容源语法

完整速查见 `content/_TEMPLATE.md`。要点：

| 写法 | 效果 |
|---|---|
| `# 标题` | 一个章节，自动编号 00/01/02… |
| `# 标题 {.appendix}` | 编号变成 A、B、C… |
| `<!-- nav:分组名 -->` | 切换侧栏分组 |
| `:::note blue 小标题` | 提示框（blue/red/amber/green/purple/teal） |
| `:::cards g3` + `### 卡片名 {.danger}` | 卡片网格（accent/warn/danger） |
| `:::details 摘要` | 折叠卡 |
| `:::tabs` + `@@选项名` | Tab 面板 |
| `:::raw` | 原样注入 SVG / 交互工具 HTML |
| `【事实】` | 自动变成彩色来源标签 |

其余就是标准 Markdown（表格、列表、引用、加粗）。**表格首列会自动加重点样式，整表自动支持窄屏横向滚动。**

### 关于交互组件

可调模型（滑块 + canvas）用 `:::raw` 写 HTML，逻辑放 `content/<slug>.js`。构建器会把脚本注入页面末尾的独立 `<script>`，与页面通用脚本（进度条 / 导航高亮 / Tab 切换）互不干扰。

**滑块必须真的参与计算。** 宁可少做，也不要放假交互。

---

## 校验清单

构建器不校验内容对不对，只保证结构正确。下列检查由流程执行：

```bash
# 1) 结构：标签平衡 + 脚本块闭合
python3 - <<'PY'
import re
s = open("../reports/hbm.html", encoding="utf-8").read()
body = re.sub(r"<script>.*?</script>", "", s, flags=re.S)
body = re.sub(r"<style>.*?</style>", "", body, flags=re.S)
body = re.sub(r"<svg.*?</svg>", "", body, flags=re.S)
for t in ["section","div","table","tbody","tr","td","details","summary","span","ul","li","canvas"]:
    o = len(re.findall(r"<%s[\s>]" % t, body)); c = len(re.findall(r"</%s>" % t, body))
    if o != c: print("MISMATCH", t, o, c)
for i, sc in enumerate(re.findall(r"<script>(.*?)</script>", s, re.S)):
    open(f"/tmp/chk{i}.js", "w", encoding="utf-8").write(sc)
print("脚本块:", len(re.findall(r"<script>", s)), "（通用 + 主题）")
PY

# 2) 脚本语法
node --check /tmp/chk0.js && node --check /tmp/chk1.js && echo "JS OK"

# 3) 数值验算：正文里出现的每个数字都要能被代码复现

# 4) 视觉（文件路径含中文，用 as_uri()）
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
python3 -c "import pathlib;print(pathlib.Path('../reports/hbm.html').resolve().as_uri())" > /tmp/u.txt
"$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=5000 --window-size=1340,2000 --screenshot=/tmp/shot.png "$(cat /tmp/u.txt)"
```

---

## 已踩过的坑

| 现象 | 原因 | 处理 |
|---|---|---|
| 页面文字全变样、canvas 全白 | 骨架里通用脚本段**漏了 `</script>`**，把后续内容吞进脚本，撞到下一个 `<script>` 报 `Unexpected token '<'` | `make_shell()` 补闭合；`assets/shell.html` 删掉即会重新生成 |
| 标题出现 `<h3>…</h2>` | 标题降级只替换了开标签 | 开闭标签一起降 |
| 表格里出现 `class=\"k\"` | 正则用了 raw string 还写 `\"` | raw string 里直接写 `"` |
| 队列里多出奇怪主题 | 解析把 `<!-- -->` 注释里的示例行当成主题 | 解析前先剥注释 |
| 中文路径截图失败 | `file://` 未转义 | 用 `pathlib.Path(...).as_uri()` |
| 局部预览时 canvas 全白 | 预览副本把 `#totop` 按钮切掉，`getElementById('totop').addEventListener` 抛错导致脚本中断 | 预览副本必须保留 `#totop` 和文末脚本；这是副本问题不是文件问题 |
| `reset` 后主题又变回「已完成」 | `queue.md` 里还留着 `[x]`，`sync()` 以文件为输入真相源，把状态推了回去 | `set_queue_check()` 双向同步：`done` 打勾、`reset` 取消勾选 |
| 页脚耗时显示成 12 小时 | 耗时单位是**秒**，算间隔时误按分钟代入 | 统一 `秒 × 1.5 ÷ 3600`；`stats` 里的自检表覆盖了 7–400 分各档 |
| 全量重建后某份报告消失 | 早期手工归档的主题没有内容源，`build.py` 不认它，`reports/` 被清空时就一起没了 | 归档件（如 `quant-math.html`）不进内容源，删输出目录前先单独留一份 |
| 批量跑时卡在同一个失败主题上，队列再也不前进 | `next` 默认把 `failed` 也算可领取；失败项仍在队首，于是被反复捞回，`remaining` 一直不动 | 批量循环一律用 `next --skip-failed`；失败项只能靠 `queue.py reset <slug>` 显式重跑 |
| 上次中断的「进行中」主题再也没人跑 | `next` 只领 `pending`/`failed`，`running` 状态没有任何出口，成了孤儿 | `queue.py batch` 会自动接管：`started` 早于 `--stale`（默认 120 分钟）的 `running` 一律判定为中断并 reset 回待处理 |

---

## 与技能的关系

这套引擎是 `panorama-handbook` 技能的可执行底座。技能负责「怎么把主题写成一份好手册」（写作原则、27 节骨架、标记规范），引擎负责「一次写对、两种格式、串起来跑」。
