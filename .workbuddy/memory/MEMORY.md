# 项目长期记忆 · 全景认知与实践引擎

`PanoramicCognitionPracticeEngine` —— 把一串主题依次加工成《全景认知与实践操作手册》，每个主题同时产出 HTML 交互版与 Markdown 版。详细说明看仓库根的 `README.md`，写作规范看 `panorama-handbook` 技能。

## 结构

```
tools/     引擎（build.py、queue.py、queue.md、queue2.md、state.json、state.<队列名>.json、content/、assets/）
reports/   生成物（<slug>.html + <slug>.md 双格式）
```

命令在仓库根执行即可（脚本按 `__file__` 定位，与 CWD 无关）：

```bash
python3 tools/queue.py list      # 看进度（含 ⏱ 耗时）
python3 tools/queue.py next      # 取任务（JSON）
python3 tools/build.py <slug>    # 内容源 → reports/ 下双格式
python3 tools/queue.py done <slug>     # 标记完成：落盘耗时 + 自动重建
python3 tools/queue.py stats     # 耗时统计 + 定时任务间隔建议
```

**批量执行**（用户说「批量跑」时走这条，详见 SKILL.md §8.6）：

```bash
python3 tools/queue.py batch [--limit N] [--json] [--dry-run]   # 批量清单（默认全部 pending）
python3 tools/queue.py next  --skip-failed                      # 循环内取任务，只领 pending
python3 tools/queue.py batch --summary                          # 收尾：本批逐项状态 + 累计耗时
```

**多条队列**（详见 SKILL.md §8.7）：默认只有 `queue.md` ↔ `state.json` 一条线。第二条队列（如 `tools/queue2.md`）的所有命令都加 `--queue queue2.md`，状态自动落到 `state.queue2.json`，两条线的主题 / 批次 / 耗时完全隔离。`build.py` 会按 slug 在所有 `state*.json` 里找耗时，**不要**给它传 `--queue`。

python 统一用 `/Users/nitai/.workbuddy/binaries/python/envs/default/bin/python`（环境里没有 pyyaml）。

## 硬约定

- **内容只写一次**：`tools/content/<slug>.md` 是唯一手写源，HTML 与 MD 都由它派生。**永远不要手改 `reports/` 里的文件**，会被下次构建覆盖。
- **队列是人写机器管的**：人只改 `tools/queue.md`（以及可选的 `queue2.md`）；`state*.json` 由 `queue.py` 维护。**不要把第二条队列的内容抄进 `queue.md`** —— 会污染另一条线的进度与批次记录。
- **节数口径固定为 30 个一级标题**：28 个正文节点（`00 一句话理解` + `01`–`27`）+ 2 个附录。交付前必须把 `grep -n "^# "` 的标题清单与骨架**逐条比对**，光看总数（29 vs 30 只差一个数）很容易把整节漏掉放过去。
- **双格式是硬要求**：交付时 HTML 与 MD 必须同时存在。
- 输出目录由 `DIST_DIR = PROJECT_ROOT / "reports"` 决定，要挪只改这一个常量。
- **归档件例外**：`reports/quant-math.html` 没有内容源，`build.py` 不会重建它；清理 `reports/` 前先备份。

## 版本管理

远端 `git@github.com:jackma3327/PanoramicCognitionPracticeEngine.git`，分支 `main`。2026-09-16 首次入库（root-commit `498da31`）。`reports/` 与 `.workbuddy/memory/` 纳入版本管理；`.gitignore` 排除 `tools/assets/shell.html`（派生文件）、`__pycache__/`、`.DS_Store`。

## 定时任务

`a94594e5-cd7b-4daf-8e18-499d9958a2c2`（每 1 小时推进一个主题）的 cwd 指向本仓库根，并发保护阈值 120 分钟（= 2× 间隔）。**当前状态 PAUSED**。间隔规则：`max(1, ceil(最长单主题耗时 × 1.5 ÷ 60)) 小时`，实测最长 36 分 → 1 小时。

## 工具行为坑

- **对同一个文件并行发起多个编辑会互相覆盖**：各次都基于同一份旧内容写入，后写覆盖前写，但每次都会回报「成功」。同一文件的改动必须**串行**，改完 `grep` 复核；跨多处改动写成脚本一次替换 + 唯一性断言。
- 局部截图聚焦用纯 CSS（`section{display:none!important} section#sN{display:block!important}`），不要做 DOM 包裹，否则破坏 `aside/main` 布局渲出全白页。
- 判断 canvas 是否真的绘制：读它的 `width` 属性，仍是浏览器默认的 **300** 就说明绘制代码没跑。
- **`next` 会把 `failed` 也当成可领取**：某项失败后它仍在队首，`next` 反复捞回同一项 → 队列死锁（`remaining` 永不动）。单主题模式无所谓，**批量循环必须用 `next --skip-failed`**；失败项只能 `reset` 显式重跑。
- **`running` 状态没有出口**：`next` 只领 pending/failed，中断留下的「进行中」会变成孤儿，再也没人跑。`queue.py batch` 会自动接管 `started` 早于 120 分钟（`--stale` 可调）的 `running`；新鲜 `running` 不抢，避免和定时任务撞车。
- **跑 `build.py` 必须用托管 python**：系统 `python3`（Homebrew）没装 `markdown`，直接报「缺少依赖」。`queue.py done` 内部用 `sys.executable` 调 `build.py` 重建 —— 用错解释器时**重建静默跳过**（「已完成」仍生效，只有页脚耗时可能不刷新），要补跑一次 `build.py <slug>`。
- **一条消息里可以并行派多个子代理各跑一个主题**：主题之间彼此独立（各自的 content/reports 文件），主控只需先建 todo、再把「自己加载技能 + 30 节口径 + 不要 present_files / 不要跑 queue.py」写进每个 prompt。实测 3 个主题并行 22 分钟出齐，主控上下文几乎不被内容源吃掉（突破 §8.2 的「单会话 1–3 个主题」预算）。**但子代理会整节漏写**（概率论漏了 02 节），回来必须自己复验：`build.py` lint + 逐条比对标题清单 + headless `--dump-dom` 读 canvas `width`。
- **子代理模式下 `started` 是空的，`done` 算不出耗时**：`done` 前把本批 `batch.started` 回填到这些主题的 `started`（同批并行、共享起点），耗时口径才与串行模式一致。
- **滑块默认值会被 `step` 吸附**：想让页面显示 14.8%，`step` 就必须是 `0.1`；`step=0.5` 会吸成 15.0，页面读数与正文对不上。**交付前必须 headless 读一次默认 readout**，不能只验手动设置后的值。
- **`:::cards` 是容器，末尾只写一次 `:::`**（卡片之间空行即可）。每卡后都写 `:::` 会让第一个提前闭合并让 MD 版残留字面量；栈式配对脚本查不出来，要单独 `grep -c "^:::"` MD 版（应为 0）。
- **canvas 底部轴标题会与刻度标签重叠**：`y1=h-28` 时标高 `y1+13` 与轴题 `h-10` 只差 5px。改成 `y1=h-46` / 刻度 `y1+13` / 轴题 `y1+31`，画布高 214。**headless 读数探针查不到，只能靠截图发现。**
