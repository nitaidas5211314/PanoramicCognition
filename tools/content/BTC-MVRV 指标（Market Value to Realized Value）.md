---
slug: BTC-MVRV 指标（Market Value to Realized Value）
title: BTC-MVRV 指标（Market Value to Realized Value）
subtitle: 用<strong>市值÷已实现市值</strong>读全网持仓盈亏——均值回归叙事可以，但 3.5 顶阈与 +7 Z 分在 ETF 时代已<strong>结构性失效</strong>
brand_sub: Bitcoin × On-Chain × Valuation
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, MVRV, 链上指标, 已实现市值, Glassnode]
theme_js_file: BTC-MVRV 指标（Market Value to Realized Value）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**MVRV = 市值 ÷ 已实现市值（Realized Cap）。** 它把全网 BTC 当成一个「巨型持仓组合」——分子是现价估值，分母是每枚币**上次链上转移时**的买入价加权总和【事实】。MVRV = **1.5** 意味着平均持有者约 **+50%** 未实现盈利；MVRV **< 1** 意味着全网整体亏损，历史上常对应熊市底【推论】。

Murad Mahmudov 与 David Puell (2018) 提出该比率；aweandwonder 的 **MVRV Z-Score** 用标准差标准化【事实】。但 **MVRV > 3.5 = 顶** 与 **Z ≥ +7 = 顶** 来自仅 **3–4 个完整周期** 的样本外推【分析】——2025 峰 MVRV 仅 **~2.52**，2024 顶 Z 仅 **+2.97**；ETF 时代需用**分位数/Z 相对读法**，勿死守旧阈值。

# 这个领域到底是什么

## 一句话定位

「BTC-MVRV」研究的是：**用链上 UTXO 成本基线衡量 BTC 全网估值偏离与周期位置的框架及其有效边界**。它是 Glassnode 等数据平台最常用的宏观链上振荡器之一，核心思想是「价格围绕全网成本基线均值回归」。

:::note red 先划清边界
本手册**不提供**「MVRV 到 X 就买卖」的信号。MVRV 度量的是**存量持仓盈亏结构**；何时变现取决于流动性、宏观与行为，不是一条静态阈值线。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | MVRV 定义、Realized Cap 构造、Z-Score、周期阈值漂移 |
| 2 | 边界在哪 | 不含订单簿微观结构；不预测监管；不替代现货技术分析 |
| 3 | 核心对象 | 市值、已实现市值、MVRV 比率、Z-Score、未实现盈亏 |
| 4 | 参与者 | 链上分析师、长期持有者、ETF 做市商、数据商、学术批评者 |
| 5 | 关键变量 | Market Cap、Realized Cap、MVRV、Z-Score、CDD、STH/LTH MVRV |
| 6 | 可观察的 | 链上 UTXO 集、Glassnode/Coin Metrics 指标、现货价 |
| 7 | 不可观察但可推断 | 丢失币、场外 OTC 真实成本、交易所内部划转噪声 |
| 8 | 谁影响谁 | 价格↑→MVRV↑→抛压↑；恐慌抛售→MVRV↓→ capitulation |
| 9 | 因果 | UTXO 重定价→Realized Cap 变 = 【事实】；MVRV 顶→价跌 = 【推论】 |
| 10 | 只是相关 | MVRV 与价格、与周期阶段高度共线——非领先指标 |
| 11 | 表层现象 | 「3.5 必顶」「Z=7 必顶」社交媒体口诀 |
| 12 | 底层机制 | 成本基线锚定 + 未实现盈亏→变现激励 + 均值回归叙事 |
| 13 | 反馈 | 高 MVRV→媒体看涨→更多买盘→MVRV 更高，直至抛压 |
| 14 | 时间延迟 | Realized Cap 仅随**链上转移**更新，可滞后数月 |
| 15 | 正负反馈 | 正：盈利扩张→FOMO；负：<1  capitulation→抄底叙事 |

## MVRV 与 Z-Score 的区别

| 版本 | 公式 | 用途 |
|---|---|---|
| **MVRV** | Market Cap ÷ Realized Cap | 绝对盈利倍数；与 Realized Price 对照 |
| **MVRV Z-Score** | (MVRV − μ) ÷ σ | 跨周期可比；识别统计极端 |
| **Adjusted MVRV** | 剔除 7 年未动/ETF 实体币 | 反映「活供应」盈亏【分析】 |
| **STH-MVRV** | 仅短期持有者 cohort | 捕捉近期买家盈亏与抛压 |

# 为什么值得研究

## 理由一：MVRV 是链上分析的「入门必修课」

Glassnode 称其「最广泛使用的链上指标之一」【事实】；不懂 MVRV 就无法阅读 80% 的 BTC 周期研报。它把抽象的「全网持仓」变成可计算的比率。

## 理由二：2024–2026 是阈值 falsify 窗口

现货 ETF（2024-01 美国批准）引入机械再平衡资金流，压缩了 MVRV 波动区间【分析】。2025 年 1 月 MVRV 峰 **~2.52**，远低于传统 **3.5** 顶阈【待验证】；2026 年 8 月 MVRV **~1.5**、Z **~1.0**，处于「温和盈利」而非极端【待验证】——**旧口诀正在 live test**。

## 理由三：学会「测量 ≠ 择时」

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「MVRV<1 买入 72% 胜率」真实超额 |
|---|---|---|---|
| 30 日 | — | **54.3%** | 表面 +18 pp → 真实 **+17.7 pp** |
| 90 日 | — | **67.7%** | 表面 +4 pp → 真实 **+4.3 pp** |
| 180 日 | — | **74.8%** | 表面 +2 pp → 真实 **~+2 pp** |

**任何「MVRV 底买顶卖」都要和对照基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 UTXO 账本，到 MVRV 图表

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-MVRV · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「链上硬数据」，越靠下越「阈值/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① UTXO 账本层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">每枚币按上次转移价计价 · 供应 ~19.8M</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：丢失币仍计入、自转账噪声</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 已实现市值层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">Realized Cap ≈ 全网成本基线 · 慢变量</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">仅链上转移才重定价——滞后于现货</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 市值对比层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">MVRV = Market Cap ÷ Realized Cap</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">= Price ÷ Realized Price（等价形式）</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 标准化层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">Z-Score = (MVRV−μ)÷σ · 跨周期可比</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：σ 窗口含早期极端 → 分母膨胀</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 周期阈值层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">顶 3.5 / Z+7 · 底 1.0 / Z~0</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：ETF 时代峰仅 2.5–3.0【待验证】</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 抛压激励层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">高未实现盈利→变现动机↑ · 供给冲击</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">LTH 盈利≠立刻卖出——时间偏好异质</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 修正指标层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">Adjusted-MVRV · STH-MVRV · ETF 剔除版</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">活供应视图更接近可交易抛压</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「3.5 必顶」口诀 · 链上 KOL 图表</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：只展示 2017 顶，隐藏 2024–25 偏离</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">MVRV 当周期仪表盘，不当单点触发器</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">Z 分位数 + 多信号 + 对照基准</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">MVRV 概念 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 均值回归</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 全网盈亏表</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 周期振荡</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 行为金融</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• UTXO 成本基线</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 未实现盈亏→抛压</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• Realized Cap 慢更新</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• Z 标准化极端</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 读 Glassnode 面板</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• Z 分位 vs 绝对阈</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 配 CDD/ETF 流</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#mvA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#mvA)"/>
  <defs><marker id="mvA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 MVRV 的关系 |
|---|---|---|
| **Murad Mahmudov / David Puell** | 2018 提出 MVRV | 原创者；本人警告上阈可能失效【分析】 |
| **aweandwonder** | MVRV Z-Score | 标准化框架；+7 顶阈来源 |
| **Glassnode / Coin Metrics** | 数据基础设施 | 指标定义、Adjusted 变体 |
| **ETF 发行商** | 机械再平衡 | 压低 MVRV 波动、抬高成本基线【推论】 |
| **长期持有者 (LTH)** | 低换手 | 抬升 Realized Cap 分母、抑制 MVRV |
| **链上 KOL** | 传播阈值口诀 | 放大「3.5 必顶」幸存者叙事 |
| **BIS 研究者** | 方法论批评 | 链上指标精度有限【分析】 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **Market Cap** | 供应 × 现货价 | ~$1.34T（$79K 附近） |
| **Realized Cap** | Σ(UTXO 量 × 上次转移价) | ~$0.893T |
| **MVRV** | 前者 ÷ 后者 | **1.50** |
| **Realized Price** | Realized Cap ÷ 供应 | **~$45,101** |
| **MVRV Z-Score** | (MVRV−μ)÷σ | **~+1.0** |
| **CDD** | 币天销毁 | 活动/抛压侧证 |

:::raw
<div class="tool">
<h3>工具 · MVRV 比值计算器</h3>
<p>手算 <strong>MVRV = 市值 ÷ 已实现市值</strong>。默认 2026-08 量级参数。</p>
<div class="ctrl"><label>市值 ($T)<input type="range" id="mvrv_mcap" min="0.8" max="2.5" step="0.001" value="1.340"><output id="mvrv_mcapO">$1.34T</output></label></div>
<div class="ctrl"><label>已实现市值 ($T)<input type="range" id="mvrv_rcap" min="0.5" max="1.5" step="0.001" value="0.893"><output id="mvrv_rcapO">$0.893T</output></label></div>
<div class="readout">
<div class="ro"><span class="k">MVRV</span><strong id="mvrv_ratio">1.50</strong><span id="mvrv_ratioh">—</span></div>
<div class="ro"><span class="k">未实现盈亏</span><strong id="mvrv_profit">+49.9%</strong><span id="mvrv_profith">—</span></div>
<div class="ro"><span class="k">已实现价格</span><strong id="mvrv_realized_px">$45,101</strong><span id="mvrv_realized_pxh">—</span></div>
<canvas id="mvrvChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="mvrv_v">温和盈利</strong><span id="mvrv_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">MVRV 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="90" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货需求/供给</text>
  <rect x="200" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="260" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 价格</text>
  <rect x="370" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="430" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">Market Cap</text>
  <rect x="540" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="600" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">MVRV 比率</text>
  <rect x="200" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="270" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">链上转移</text>
  <text x="270" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(重定价 UTXO)</text>
  <rect x="400" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="470" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">Realized Cap</text>
  <rect x="200" y="250" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="270" y="270" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">变现/抛压</text>
  <text x="270" y="286" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(高 MVRV 激励)</text>
  <path d="M150 72 L200 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#mvB)"/>
  <path d="M320 72 L370 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#mvB)"/>
  <path d="M490 72 L540 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#mvB)"/>
  <path d="M260 94 L270 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#mvB)"/>
  <path d="M340 172 L400 172" stroke="#454c56" stroke-width="1.5" marker-end="url(#mvB)"/>
  <path d="M470 150 L470 94 L430 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#mvB)"/>
  <path d="M600 94 L600 250 L340 250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#mvC)"/>
  <path d="M270 250 L260 94" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#mvC)"/>
  <defs>
    <marker id="mvB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="mvC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：价格推高 MVRV（分子快）；Realized Cap 仅随链上转移慢变（分母慢）——故 MVRV 是** coincident 指标**，非领先。红色反馈：高 MVRV → 抛压 → 价格回落。

# 隐藏关系

## 隐藏关系一：MVRV 与价格共线 ≠ 预测力

MVRV 分子就是 Market Cap——它与价格**机械相关**。把它当「独立信号」会重复计入价格信息【分析】。Puell 等在原文已提示：随波动率下降，**上阈值可靠性下降**【分析】。

## 隐藏关系二：丢失币抬高 MVRV

Satoshi 币、早期矿工币、丢失钱包按极低历史价计入 Realized Cap，**压低分母、抬高 MVRV**【推论】。Glassnode 的 Adjusted-MVRV 剔除 7 年未动供应以修正【分析】。

:::raw
<div class="tool">
<h3>工具 · MVRV Z-Score 仪表盘</h3>
<p><strong>Z = (MVRV − 均值) ÷ 标准差</strong>。默认读数对应 2026-08 MVRV≈1.5、Z≈+1.0。</p>
<div class="ctrl"><label>MVRV<input type="range" id="mvrv_z_mvrv" min="0.5" max="4" step="0.01" value="1.50"><output id="mvrv_z_mvrvO">1.50</output></label></div>
<div class="ctrl"><label>滚动均值 μ<input type="range" id="mvrv_z_mean" min="0.8" max="2.5" step="0.01" value="1.35"><output id="mvrv_z_meanO">1.35</output></label></div>
<div class="ctrl"><label>标准差 σ<input type="range" id="mvrv_z_std" min="0.05" max="1" step="0.01" value="0.15"><output id="mvrv_z_stdO">0.15</output></label></div>
<div class="readout">
<div class="ro"><span class="k">Z-Score</span><strong id="mvrv_z_z">+1.00σ</strong><span id="mvrv_z_zh">—</span></div>
<div class="ro"><span class="k">区间</span><strong id="mvrv_z_band">0 ~ +1σ</strong><span id="mvrv_z_bandh">—</span></div>
<canvas id="mvrvZChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="mvrv_z_v">高于均值</strong><span id="mvrv_z_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | MVRV 领域 | 其他领域 |
|---|---|---|
| **成本基线偏离** | MVRV 围绕 1 振荡 | 股票 PB、房地产锚定价 |
| **Z-Score 极端** | MVRV Z | 信用利差 Z、VIX 分位 |
| **慢变量分母** | Realized Cap | 央行资产负债表、库存 |
| **未实现盈亏→抛压** | MVRV>2 | 期权 Gamma 墙、质押解锁 |

# 系统运行机制

## 四阶段循环

1. **积累期**：价格缓升，Realized Cap 随换手抬升，MVRV 温和（1.0–1.5）
2. **扩张期**：价格加速，MVRV 突破 2，媒体关注，新 demand 入场
3. **派发期**：MVRV 极端（历史 >3.5；ETF 时代可能仅 2.5+），LTH 减持、CDD  spike
4. **清算期**：价格跌破 Realized Price，MVRV <1， capitulation，Smart Money 吸筹

:::note amber Realized Cap 的「慢」
熊市中 Realized Cap **可能仍上升**——因低位换手把成本基线重新定价到更高绝对值但更低盈利倍数。勿把 Realized Cap 方向简单等同于牛熊。
:::

# 时间演化

## 周期峰值衰减：Z-Score 顶逐轮下移

| 周期顶 | 年月 | MVRV 峰【待验证】 | Z-Score 峰【待验证】 |
|---|---|---|---|
| 2013 | Apr/Nov | ~5.8 | +8.68 / +7.98 |
| 2017 | Dec | ~4.7 | +10.40 |
| 2021 | Feb | ~3.7 | +6.90 |
| 2021 | Nov | — | +3.54 |
| 2024 | Mar | ~2.52 | +2.97 |
| 2026 | Aug | ~1.50 | ~+1.0 |

**+7 顶阈自 2017-12-19 后再未触发**【分析】——校准窗口被早期极端主导，σ 膨胀后 Z 被压缩。

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">MVRV 周期演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#d5342c"/><text x="80" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2013</text><text x="80" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">Z+8.7</text>
  <circle cx="180" cy="100" r="6" fill="#d5342c"/><text x="180" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2017</text><text x="180" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">Z+10.4</text>
  <circle cx="300" cy="100" r="6" fill="#d5342c"/><text x="300" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021</text><text x="300" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">Z+6.9</text>
  <circle cx="420" cy="100" r="6" fill="#b8730a"/><text x="420" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024</text><text x="420" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">Z+3.0</text>
  <circle cx="520" cy="100" r="6" fill="#1d4ed8"/><text x="520" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">ETF</text><text x="520" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">2024-01</text>
  <circle cx="600" cy="100" r="6" fill="#0f8a4d"/><text x="600" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026</text><text x="600" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">Z~+1</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">峰值 Z 递减 · 波动区间压缩 · 阈值需重校准</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 MVRV 的影响 |
|---|---|---|
| **数据商** | 指标知名度→订阅 | 推「经典阈值」叙事 |
| **ETF 发行商** | 规模增长 | 持续买盘抬升 Realized Cap |
| **LTH** | 最大化终值 | 低换手→MVRV 分母滞后 |
| **交易者** | 短期 alpha | 公开阈值→被 front-run |
| **矿工** | 现金流 | 高 MVRV 时抛售激励↑ |

# 资源与信息流

## 资金流与未实现盈亏「抽水」

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">未实现盈亏 → 潜在抛压（资金流抽水图）</text>
  <rect x="40" y="50" width="600" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">全网持仓 · 市值 $1.34T</text>
  <rect x="40" y="120" width="360" height="36" rx="6" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.2"/>
  <text x="220" y="143" font-size="11" text-anchor="middle" fill="#d5342c" font-family="sans-serif">未实现盈利 ~$0.45T (MVRV 1.5 → +50%)</text>
  <rect x="420" y="120" width="220" height="36" rx="6" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.2"/>
  <text x="530" y="143" font-size="11" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">成本基线 $0.89T</text>
  <path d="M220 156 L220 200 L340 200 L340 230" stroke="#d5342c" stroke-width="1.5" fill="none" marker-end="url(#mvD)"/>
  <path d="M530 156 L530 200 L340 200" stroke="#0f8a4d" stroke-width="1.5" fill="none" marker-end="url(#mvE)"/>
  <rect x="240" y="230" width="200" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="340" y="255" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货市场流动性池</text>
  <text x="180" y="195" font-size="10" fill="#d5342c" font-family="sans-serif">潜在抛压</text>
  <text x="480" y="195" font-size="10" fill="#0f8a4d" font-family="sans-serif">抄底弹药</text>
  <defs>
    <marker id="mvD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
    <marker id="mvE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
  </defs>
</svg>
:::

**信息流路径**：链上节点 → 索引商（Glassnode）→ 仪表盘/API → 研报/KOL → 交易者预期 → 现货/ETF 订单流。**瓶颈**：各索引商对「实体调整」「交易所内部转账」处理不同，同指标可差 **数倍**【分析】（BIS 研究）。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「MVRV&lt;1 买入胜率 72%」？先和<strong>随机持币基准</strong>比——BTC 有正漂移。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="mvrv_T" min="5" max="365" step="5" value="90"><output id="mvrv_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="mvrv_ps" min="50" max="90" step="0.1" value="72.0"><output id="mvrv_psO">72.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="mvrv_mu" min="0" max="100" step="1" value="50"><output id="mvrv_muO">50.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="mvrv_sg" min="30" max="100" step="1" value="65"><output id="mvrv_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="mvrv_base">67.7%</strong><span id="mvrv_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="mvrv_dp">+4.3 pp</strong><span id="mvrv_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="mvrv_n">911</strong><span id="mvrv_nh">—</span></div>
<canvas id="mvrvDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="mvrv_v3">超额有限</strong><span id="mvrv_v3h">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **分清测量与阈值** | MVRV 数学可靠；3.5/+7 阈值需重校 |
| 2 | **用 Z 分位替代绝对值** | 与自身历史比，不与 2017 比 |
| 3 | **读 Adjusted/STH 变体** | 剥离休眠币与 ETF 实体 |
| 4 | **配 CDD/ETF 流** | 单指标不交易 |
| 5 | **盯 Realized Price** | 链上「盈亏平衡线」 |
| 6 | **漂移剥离胜率** | 任何信号先减基准 |
| 7 | **样本量意识** | n>400 才谈 6pp 超额 |
| 8 | **多数据源交叉** | Glassnode vs Coin Metrics |
| 9 | **写阈值衰减日志** | 每周期记录实际峰 Z |
| 10 | **30 分钟三联检** | 算、比、判——§22 |

# 常见认知陷阱

:::details 1. 「MVRV>3.5 必顶」
**错因**：样本 n=3 周期 + ETF 结构变迁。2025 峰仅 ~2.52【待验证】。**对策**：看 Z 分位 + Adjusted MVRV。
:::

:::details 2. 「Z≥+7 才会见顶」
**错因**：+7 自 2017 后再未触发；2021 顶 Z=+6.90 已错过。**对策**：跟踪峰值斜率递减，非绝对线。
:::

:::details 3. 「MVRV<1 = 立刻抄底」
**错因**：2022 年 MVRV<1 持续 **5 个月**，价仍跌 **~35%**【待验证】。**对策**：<1 是区间不是时点。
:::

:::details 4. 把 MVRV 当领先指标
**错因**：分子含现价，本质是 coincident。**对策**：配宏观流动性/ETF 流。
:::

:::details 5. 忽视丢失币偏差
**错因**：早期低价币压低 Realized Cap → MVRV 系统性偏高。**对策**：读 Adjusted-MVRV。
:::

:::details 6. 忽视 ETF 成本基线抬升
**错因**：机构买盘持续重定价 UTXO → 分母抬高、MVRV 压低【推论】。**对策**：对比 ETF 剔除版。
:::

:::details 7. 把二手阈值当【事实】
**错因**：3.5、+7、0.1 底阈传播链过长。**对策**：标【待验证】，回测己周期。
:::

:::details 8. 单指标 All-in
**错因**：公开指标被 trade against。**对策**：≥3 独立信号一致。
:::

:::details 9. 混淆 Realized Price 与 VWAP
**错因**：前者按上次链上转移，非交易所成交均价。**对策**：理解 UTXO 语义。
:::

:::details 10. 忽视 BIS 方法论警告
**错因**：链上转账解读可差 **6×**【分析】。**对策**：当近似值，非精确会计。
:::

:::details 11. 胜率不算漂移
**错因**：BTC 随机做多 90 日基准 **67.7%**。**对策**：§12 漂移剥离器。
:::

:::details 12. 用 MVRV 做日内
**错因**：Realized Cap 日变化极慢。**对策**：MVRV 是周期尺度工具。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 全网成本基线 | 持有者平均买入价 | Realized Price ~$45.1K |
| 估值偏离 | 贵/便宜讨论 | MVRV 1.5 = 温和溢价 |
| 抛压势能 | 获利盘减持 | CDD spike、LTH 流出 |
|  capitulation | 熊市恐慌 | MVRV<1 + ETF 净流出 |

# 从理论到行动

**决策漏斗**（自上而下）：

1. **宏观**：流动性周期方向？
2. **链上**：MVRV + Z 处于历史分位？
3. **修正**：Adjusted/STH MVRV 是否一致？
4. **确认**：ETF 流、CDD、价格结构同向？
5. **执行**：仓位与持有期匹配周期尺度——非阈值一碰就动

# 技能树

:::details L1 · 观察者
- [ ] 手算 MVRV = 1.34÷0.893 = 1.50
- [ ] 解释 Realized Cap 与 Market Cap 区别
- [ ] 说出 MVRV=1 的含义
:::

:::details L2 · 分析师
- [ ] 计算 Z-Score 并判区间
- [ ] 复述 2024–25 阈值失效案例
- [ ] 用 §12 剥离 72% 胜率
:::

:::details L3 · 建模者
- [ ] 对比 Raw vs Adjusted MVRV
- [ ] 建 MVRV 分位仪表盘（3 年窗口）
- [ ] 写 CDD+ETF 辅助规则
:::

:::details L4 · 系统设计者
- [ ] 多信号投票系统（禁单指标）
- [ ] 每周期自动记录 Z 峰
- [ ] 季度回测阈值衰减
:::

# 游戏化世界

**角色**：链上估值审计员（On-Chain Auditor）。等级越高，越不信口诀，越会看重校准。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 MVRV 误差 <1% | 解锁「UTXO 层」 |
| Lv.2 | 向朋友解释 Z vs 绝对 MVRV | 解锁「Z 仪表盘」 |
| Lv.3 | 算出 90 日真实超额 <5pp | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周记录 MVRV+ETF | 解锁「修正指标」 |
| Lv.5 | 写一页「MVRV 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘价 | 7 日表 |
| 每周 | 更新 MVRV & Z | §06 工具截图 |
| 每月 | 读一篇 MVRV 批评/辩护 | 3 行摘要 |
| 每季 | 核对 Realized Price | 与 Glassnode 误差 <2% |
| 每年 | 记录周期 Z 峰 | 与 §10 表对照 |

# 反事实模拟

:::tabs
@@情景 A · 若 3.5 顶阈仍有效
2025 年应出现 MVRV>3.5 后暴跌。实际峰 ~**2.52**【待验证】——**顶阈未被触及，反事实支持重校准**。

@@情景 B · 若 MVRV<1 是精准底
2022 年触 <1 后应立刻 V 反。实际 <1 持续数月且价再跌 **~35%**——**<1 是区域非时点**。

@@情景 C · 若无 ETF 资金流
Realized Cap 抬升更慢，MVRV 波动更大——2024 顶 Z 可能更高（+4?）。ETF 压缩振荡【推论】。

@@情景 D · 若只用 STH-MVRV
近期买家盈亏更敏感，可提前见抛压——但噪声更大，需配平滑【假设】。
:::

:::raw
<div class="tool">
<h3>工具 · 周期峰值衰减器</h3>
<p>历次周期顶 <strong>Z-Score</strong> 递减——阈值须随时代调整。</p>
<div class="ctrl"><label>选择周期<input type="range" id="mvrv_era" min="0" max="4" step="1" value="4"><output id="mvrv_eraO">2026 周期</output></label></div>
<div class="readout">
<div class="ro"><span class="k">顶 Z-Score</span><strong id="mvrv_peak_z">+1.00σ</strong><span id="mvrv_peak_zh">—</span></div>
<div class="ro"><span class="k">参考顶阈</span><strong id="mvrv_peak_thr">2.5</strong><span id="mvrv_peak_thrh">—</span></div>
<canvas id="mvrvPeakChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="mvrv_peak_v">阈值需下移</strong><span id="mvrv_peak_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会算 MVRV** | 3 天 | 市值/已实现市值/Z | 口算 1.50 |
| **L2 会拆阈值** | 1 周 | 3.5/+7 衰减叙事 | 漂移剥离器实操 |
| **L3 会修偏差** | 2 周 | Adjusted+STH+ETF | 双版本对照 |
| **L4 会迭代系统** | 1 月+ | 多信号+分位阈 | 连续 2 月无口诀交易 |

# 30 分钟最小实践

**任务**：完成「MVRV 三联检」——算、比、判。

1. **8 分钟 · 手算 MVRV**：市值 $1.34T ÷ 已实现 $0.893T = **1.50**。
2. **7 分钟 · Z 区间**：§08 仪表盘，μ=1.35、σ=0.15 → Z=**+1.00σ**。
3. **8 分钟 · 漂移剥离**：§12 工具，90 日 72% 胜率 → 真实超额仅 **+4.3 pp**，需 **n≈911**。
4. **7 分钟 · 结论**：写三句话——(a) 当前 MVRV 区间 (b) 旧阈是否适用 (c) ETF 流一条观察。**禁止写「3.5 必顶」。**

**验证**：MVRV 与 §06 默认读数误差 **<0.02**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Glassnode MVRV 指南 + Puell 2018 摘要 |
| D2 | 手算 | Market/Realized Cap 与 Realized Price |
| D3 | 批评 | Dan Holloran + BIS 方法论各 3 条 |
| D4 | 工具 | §06–§12 四个交互模型 |
| D5 | 历史 | 对照 2017/2021/2024 Z 峰 |
| D6 | ETF | 记录 7 日现货 ETF 净流入 |
| D7 | 合成 | 1 页「MVRV 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：MVRV 定义 + 手算 + Realized Cap（L1）
**Week 2**：Z-Score + 阈值衰减 + 漂移剥离（L2）
**Week 3**：Adjusted/STH + ETF 修正 + CDD 配证（L3）
**Week 4**：个人分位仪表盘 + 季度校准 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **MVRV 比率** | 市值÷已实现市值 | 与价格共线 |
| 2 | **Realized Cap** | UTXO 成本基线 | 丢失币偏差 |
| 3 | **MVRV Z-Score** | 标准化偏离 | +7 已失效 |
| 4 | **Realized Price** | RV÷供应 | 非 VWAP |
| 5 | **Adjusted-MVRV** | 剔除休眠币 | 7 年阈任意 |
| 6 | **STH-MVRV** | 短期持有者版 | 噪声大 |
| 7 | **CDD** | 币天销毁 | 与 MVRV 互补 |
| 8 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 9 | **阈值衰减** | 峰值 Z 递减 | 死守旧线 |
| 10 | **分位阈** | 与自身历史比 | 窗口选择 |

# 关键问题清单

:::details 链上
- 当前 MVRV？Realized Price？
- Raw vs Adjusted 差多少？
- STH-MVRV 方向是否一致？
:::

:::details 阈值
- 本周期 Z 峰是多少？
- +7 是否仍合理？
- <1 持续多久了？
:::

:::details 宏观
- ETF 7 日净流入？
- 全球流动性方向？
- 与 CDD 是否共振？
:::

:::details 决策
- 信号胜率是否扣过漂移？
- 样本量是否够？
- 是否 ≥3 信号一致？
:::

# 下一阶段探索

1. **ETF 实体剔除 MVRV**：WEEX 分析 Adjusted 版高于 Raw ~0.26【待验证】——能否成为新基准？
2. **ULSR（未实现亏损压力比）**：与 MVRV 互补的抛压度量
3. **MVRV 分位 + 宏观流动性**：2026 Z~0.5 与流动性下行共振【假设】
4. **STH-MVRV 领先性检验**：能否比全样本 MVRV 早 2–4 周见顶？
5. **跨资产 MVRV**：ETH/SOL 是否有可比阈值，或仅 BTC 有效？

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| MVRV 定义与公式 | 指标文档 | Glassnode Docs | 【事实】 |
| 原创者 Mahmudov/Puell | 论文/博客 | 2018 on-chain analysis | 【事实】 |
| MVRV Z-Score | 社区指标 | aweandwonder | 【待验证】 |
| 3.5 顶 / 1.0 底阈 | 指标文档 | Glassnode Docs | 【待验证】 |
| 2025 峰 MVRV ~2.52 | 媒体 | TechGaged 2025 | 【待验证】 |
| 2026-08 MVRV ~1.5 Z~1 | 行业分析 | BIT.com 2026-08 | 【待验证】 |
| Z 峰衰减序列 | 数据站 | btc oak / DurdenBTC | 【待验证】 |
| +7 自 2017 未触发 | 数据站 | btc oak 2026 | 【分析】 |
| ETF 结构变迁 | 行业分析 | WEEX / Dan Holloran | 【分析】 |
| BIS 链上精度批评 | 央行研究 | BIS 工作论文 | 【分析】 |
| 2022 <1 持续 5 月 | 评论 | Dan Holloran 2026 | 【待验证】 |
| Puell 上阈失效警告 | 原文 | Ledger School 引述 | 【分析】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；MVRV、Z-Score 及任何链上阈值均**不保证**未来价格路径。历史阈值（3.5、+7）在 ETF 时代已多次**未被触及**，请勿依据单一指标进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
