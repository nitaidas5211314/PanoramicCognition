# 自动化执行记忆 · 全景手册流水线

调度：每日推进队列中一个待处理主题（prompt 见 automation `a94594e5`）。

## 执行历史

| 日期 | 主题 | 结果 | 产出 | 队列 |
|---|---|---|---|---|
| 2026-09-16 | 投资与概率论的关系 | 成功 | dist/投资与概率论的关系.html + .md | 3/6，剩 3 |
| 2026-09-16 | 威科夫操盘法 | 成功 | dist/威科夫操盘法.html + .md | 4/8，剩 4 |

## 稳定做法（已跑通，可复用）

- Python 用 `/Users/nitai/.workbuddy/binaries/python/envs/default/bin/python`；Node 用 `/Users/nitai/.workbuddy/binaries/node/versions/22.22.2-2/bin/node`。
- 流程：`queue.py list` → 判断有无"进行中"（<90 分钟视为仍在跑，跳过）→ `queue.py next` → 检索 4–8 条 → 写 `content/<slug>.md`（分 2–3 次写入，单次别超 ~100KB）→ 写 `content/<slug>.js` → `build.py <slug>` → 校验 → 截图 → `present_files` → `queue.py done <slug>`。
- **先算数、后写正文**：把要写进正文的每个数字先用 node 脚本算出来，再落笔；正文与代码不一致时改正文。
- 中文路径截图必须用 `pathlib.Path(p).resolve().as_uri()`。
- 局部截图（含 canvas 的章节）：折叠目标 section 之前的内容，但**必须保留 `#totop` 与文末两块脚本**，否则脚本抛错、canvas 全白。

## 关键教训

1. **JS 引用的元素 id 必须与正文 HTML 严格对齐**，尤其"判定/verdict"这类附加行。id 失配会让 `.textContent` 抛错并中断整个 IIFE，症状是"readout 看着对（其实是 HTML 硬编码值）但滑块全失效、canvas 全白"。修复后务必做一次 **JS 全部 `$('...')` id 与 HTML 全部 `id="..."` 的集合差集**比对。
2. 正文里出现 `:::note` 等容器后必须补 `:::`,否则容器吞掉后续内容、连带产生"多出一个未闭合"的假报错。写完用脚本做一次栈式配对检查。
3. 27 节骨架里 `利益与激励`、`资源与信息流` 两节容易漏（夹在 `时间演化` 与 `关键杠杆点` 之间）；5 张必画 SVG 中"资金流抽水图"放在 `资源与信息流`。
4. 金融类主题：附录必须含免责声明；涨红跌绿；货币用 ¥。
5. 本次实测：半凯利增长率恰为全凯利的 75%（由 g(cf\*)/g(f\*) = 2c − c² 在 c=0.5 得出），"曾经腰斩"概率由 2^(−(2/c−1)) 给出（全凯利 50%、半凯利 12.5%、1/4 凯利 0.78%）。这两条可直接复用到后续金融类主题。
6. **改内容源时禁止用两个 `str.index()` 相减做切片**。本次想给第二个 SVG 换 marker，写了 `i=index('id="wkA"'); j=index('# 利益与激励'); s[:i]+s[i:j]+s[j:]`，但 `j < i`（目标章节在「利益与激励」之后），`s[i:j]` 是空串 → **整段被静默复制**。改法：先 `assert j > i`，或直接用 `replace(old,new,1)`。若已踩坑，可用 `s_orig = s_new[:i] + s_new[2i-j:]` 精确还原（无内容丢失）。
7. **滑块 `step` 必须能表示正文引用的那个数**。写给「65.1%」的滑块用了 `step="0.5"`，浏览器吸附成 65.0，默认 readout 与正文数字不符。**正文里每个滑块默认值都要 headless 读一次默认 readout 复核**，不能只验"手动设置后"的值。
8. **tabs 块里不要写裸 `@@`**。`@@` 是「开启新 Tab」标记且要求后面有标签文字；裸 `@@` 不匹配正则，会作为字面文本留在面板里。
9. **SVG `<marker>` 跨 `<svg>` 引用不可靠**：第二个 SVG 里 `url(#wkR)` 指第一个 SVG 定义的 marker。改为每个 SVG 自带 `<defs>`。
10. **局部截图聚焦要用纯 CSS，不要做 DOM 包裹**。DOM 包裹会破坏 `aside/main` 布局 → 渲出全白页。正确写法：`section{display:none!important} section#sN{display:block!important}`；只想截某个工具面板再加 `section#sN > :not(h2):not(.tool){display:none!important}`（canvas 仍按真实宽度绘制，可正常校验）。
11. **section 锚点与节号一一对应**：`s0` = 标题为「00」的那节，第 N 号节就是 `sN`。取「16 从理论到行动」写 `s16`，不要按序号数成 `s15`。


## 迁移记录（2026-09-16）

本自动化所属项目已从 `~/Documents/ObsidianData/Learn/MockData/handbook-pipeline/` 迁到 **本仓库根**（`PanoramicCognitionPracticeEngine/`），并改为「引擎 / 产物」分离：

- 命令前缀变化：`python3 tools/queue.py …`、`python3 tools/build.py …`（都在仓库根执行）。
- 路径变化：内容源 `tools/content/<slug>.md`；状态 `tools/state.json`；**产出 `reports/<slug>.html` 与 `reports/<slug>.md`（原 `dist/`）**。
- 教训里的 `dist/` 一律读作 `reports/`。
- `reports/quant-math.html` 是早期归档件（内容源已删），构建不会重建它，清理 `reports/` 时不要误删。
- 本次迁移后的实测基线：5/15 已完成，平均 16 分 7 秒、最长 36 分，RECOMMEND_HOURS=1（与 1 小时间隔一致）。
