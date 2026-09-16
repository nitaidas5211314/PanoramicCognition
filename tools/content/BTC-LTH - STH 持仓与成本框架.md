---
slug: BTC-LTH - STH 持仓与成本框架
title: BTC-LTH / STH 持仓与成本框架
subtitle: 用<strong>155 日 cohort 分层</strong>读「谁在持币、成本多少、供应往哪流」——Smart Money 叙事有用，但<strong>实体聚类与 ETF 托管</strong>让绝对数字跨平台不可比
brand_sub: Bitcoin × On-Chain × Cohort Analysis
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, LTH, STH, 链上指标, Glassnode, 成本基线]
theme_js_file: BTC-LTH - STH 持仓与成本框架.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**LTH（Long-Term Holder）与 STH（Short-Term Holder）把全网 BTC 供应按「持币时间偏好」切成两个行为 cohort。** Glassnode 用 **155 日** logistic 曲线（中点 155、过渡宽 10 天）做实体调整分类【事实】——155 日处各计 **50%** LTH/STH，177 日约 **90%** 计入 LTH【事实】。

配套 **cohort 成本基线**：STH realized price ≈ **$67,963**、LTH ≈ **$49,913**（2026-09【待验证】）。现货 **$98,000** 时 STH-MVRV **1.442**（+44.2%）、LTH-MVRV **1.963**（+96.3%）。LTH 供应占比 **83.6%** 处历史高位——供应向「强手」集中，但 **ETF 托管币也计入 LTH**，旧周期派发模板正在变形【分析】。

# 这个领域到底是什么

## 一句话定位

「BTC-LTH/STH 框架」研究的是：**如何把链上供应按持有者时间偏好分层，并追踪各 cohort 的持仓量、成本基线与净流向，从而读周期位置与抛压结构**。它是 Glassnode cohort 分析的核心骨架，与 MVRV、SOPR、HODL Waves 共享同一 155 日阈值。

:::note red 先划清边界
本手册**不提供**「LTH 吸筹就买入」的信号。LTH/STH 度量的是**存量结构**；何时变现取决于宏观、流动性与个体约束，不是一条静态线。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 155 日分类、供应占比、cohort 成本基线、净流向、周期模板 |
| 2 | 边界在哪 | 不含订单簿；不识别个体钱包身份；不预测监管 |
| 3 | 核心对象 | LTH supply、STH supply、LTH/STH realized price、净仓位变化 |
| 4 | 参与者 | Glassnode 研究团队、ETF 托管方、矿工、链上 KOL、批评者 |
| 5 | 关键变量 | 155 日权重、LTH%、STH-MVRV、LTH-MVRV、成本基线 spread |
| 6 | 可观察的 | Glassnode Studio 图表、API、第三方重建（btc oak 等） |
| 7 | 不可观察但可推断 | 场外 OTC 成本、交易所内部未转出持仓、丢失币 |
| 8 | 谁影响谁 | LTH 派发→STH 膨胀→流动供应↑→价格压；吸筹反向 |
| 9 | 因果 | 链上转移→cohort 重分类 = 【事实】；LTH%↑→价涨 = 【推论】 |
| 10 | 只是相关 | LTH 占比与价格周期高度共线——非独立领先指标 |
| 11 | 表层现象 | 「Smart Money 吸筹必涨」「LTH 派发必顶」 |
| 12 | 底层机制 | 时间偏好异质 + 供应成熟度 + 成本基线分层 |
| 13 | 反馈 | 高价→LTH 派发→STH 接盘→波动放大→再派发 |
| 14 | 时间延迟 | 155 日成熟曲线→分类变化滞后于实际买卖 |
| 15 | 正负反馈 | 正：供应紧缩→FOMO；负：STH 亏损→ capitulation 级联 |

## 155 日阈值从何而来

Rafael Schultze-Kraft 等 (2020) 分析 UTXO 被花费概率曲线：在 **155 日**处，「未来 7–120 日内被花费」的斜率首次超过「币龄 >1 年」段的最大斜率【事实】。此后 coin 被 spent 的概率趋于平坦——统计上可视为「长期持有者」。

:::note blue 实体调整 vs 原始 UTXO
Glassnode **不**按单个 UTXO 硬切 155 日，而按**实体**（cluster 地址）的**成交量加权平均购买日**分类，并用 logistic 平滑【事实】。大实体 90% 老仓 + 10% 新买 → 新币仍 mostly 计 LTH。
:::

# 为什么值得研究

## 理由一：cohort 分析是读 BTC 周期的「第二语言」

不懂 LTH/STH 就无法阅读 Glassnode 80% 的周期研报——它与 MVRV、SOPR、RHODL 共用同一分类底座【事实】。James Check 称 2024 供应老化行为「 genuinely new」【分析】——旧模板正在 live test。

## 理由二：2024–2026 是「派发模板失效」窗口

历史上周期顶 LTH 占比跌至 **50–65%**；2024 顶仅至 **~73%**，2026 仍 **83.6%**【待验证】——ETF 托管币 aging 但不以传统方式派发【推论】。若仍用 2017 模板读顶，会系统性误判。

## 理由三：成本基线 spread 比单一 MVRV 更锋利

全网 MVRV **1.853** 掩盖 cohort 差异：STH 仅 **+44.2%** 盈利、LTH **+96.3%**——**边际买家（STH）盈亏压力远低于 headline**。读周期应先看 **STH-MVRV** 与 **成本 spread**（$18,050 / +36.2%）。

## 对照基准

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「LTH 吸筹后 90 日 78% 胜率」真实超额 |
|---|---|---|---|
| 30 日 | — | **54.3%** | 表面 +24 pp → 真实 **+23.7 pp** |
| 90 日 | — | **67.7%** | 表面 +10 pp → 真实 **+10.3 pp** |
| 180 日 | — | **74.2%** | 表面 +6 pp → 真实 **~+6 pp** |

**任何「LTH 信号」都要和对照基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 UTXO 账本，到 cohort 仪表盘

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">LTH/STH · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「链上硬数据」，越靠下越「周期模板/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① UTXO / 实体层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">地址聚类 · 实体调整 · 供应 ~19.8M</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：CoinJoin 误聚类、变更地址错链</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 155 日分类层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">logistic 权重 · 155d=50/50 · 177d≈90% LTH</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">失效：custody 转移≠出售</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 供应分层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">LTH supply 14.7M · STH 16.4%【待验证】</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">交易所余额单独剔除</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ cohort 成本基线</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">STH RP $67,963 · LTH RP $49,913 · spread +36.2%</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">Realized Cap = Σ cohort 加权</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ cohort MVRV / SOPR</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">STH-MVRV 1.442 · LTH-MVRV 1.963 · STH-SOPR</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">STH 驱动边际抛压 · LTH 驱动派发</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 净流向层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">LTH Net Position Change · 供应成熟度</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">正=吸筹 · 负=派发</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 周期模板层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">底 LTH~80% · 顶 LTH&lt;65% · 2024 模板漂移</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">ETF 托管 aging 不计传统派发</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「Smart Money 吸筹」· LTH/STH 比 KOL 图表</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：跨平台数字不可比</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">cohort 当周期仪表盘，不当单点触发器</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">单平台历史 + 多信号 + 漂移剥离</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">LTH/STH · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 时间偏好异质</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• Smart Money 叙事</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 供应成熟度</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 成本基线分层</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 155d logistic 权重</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 实体 VW 购买日</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• LTH 派发→STH 膨胀</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• cohort realized price</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 读 LTH% 历史分位</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 算 STH/LTH MVRV</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 盯 Net Position Change</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 单平台纵向比</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#lsA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#lsA)"/>
  <defs><marker id="lsA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 LTH/STH 的关系 |
|---|---|---|
| **Rafael Schultze-Kraft / Glassnode** | 155 日阈值 + 实体调整方法论 | 原创框架【事实】 |
| **James Check (Checkmate)** | 周期解读、2024 模板漂移 | 指出 ETF 时代供应行为变化【分析】 |
| **ETF 托管方 (BlackRock 等)** | 机械持仓 aging | 币计入 LTH 但不传统派发【推论】 |
| **矿工** | 新产 BTC → 立即 STH | 持续 STH 供应源头 |
| **链上 KOL** | 传播 Smart Money 叙事 | 放大 LTH 吸筹=抄底口诀 |
| **Dan Holloran / BIS** | 聚类方法论批评 | 测量≠解读【分析】 |
| **VanEck / CryptoQuant** | 独立 cohort 重建 | 数字与 Glassnode 可差 **30%+**【待验证】 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **LTH Supply** | logistic 加权长期供应 | **14.7M BTC（83.6%）** |
| **STH Supply** | 互补短期供应 | **16.4%** |
| **STH Realized Price** | STH 加权成本基线 | **$67,963** |
| **LTH Realized Price** | LTH 加权成本基线 | **$49,913** |
| **成本 Spread** | STH RP − LTH RP | **$18,050（+36.2%）** |
| **STH-MVRV** | 现货 ÷ STH RP | **1.442** |
| **LTH-MVRV** | 现货 ÷ LTH RP | **1.963** |
| **LTH Net Position Change** | 30 日 LTH 净变化 | 2026 中段转正【待验证】 |

:::raw
<div class="tool">
<h3>工具 · 155 日成熟曲线</h3>
<p>logistic 权重 <strong>w<sub>LTH</sub>(d) = 1 ÷ (1 + e<sup>−(d−155)/10</sup>)</strong>。拖动持币天数看 cohort 归属。</p>
<div class="ctrl"><label>持币天数<input type="range" id="lth_age" min="0" max="250" step="1" value="155"><output id="lth_ageO">155 日</output></label></div>
<div class="readout">
<div class="ro"><span class="k">LTH 权重</span><strong id="lth_wL">50.0%</strong><span id="lth_wLh">—</span></div>
<div class="ro"><span class="k">STH 权重</span><strong id="lth_wS">50.0%</strong><span id="lth_wSh">—</span></div>
<canvas id="lthMatChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="lth_mat_v">过渡区</strong><span id="lth_mat_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">LTH/STH 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="90" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">价格趋势</text>
  <rect x="200" y="50" width="120" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="260" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">LTH 行为</text>
  <text x="260" y="92" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(吸筹/派发)</text>
  <rect x="370" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="430" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">LTH% / STH%</text>
  <rect x="540" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="600" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">流动供应</text>
  <rect x="200" y="150" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="270" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">cohort 成本基线</text>
  <rect x="400" y="150" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="470" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">STH-MVRV / SOPR</text>
  <rect x="200" y="250" width="140" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="270" y="278" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">边际抛压</text>
  <path d="M150 72 L200 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#lsB)"/>
  <path d="M320 72 L370 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#lsB)"/>
  <path d="M490 72 L540 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#lsB)"/>
  <path d="M260 94 L270 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#lsB)"/>
  <path d="M340 172 L400 172" stroke="#454c56" stroke-width="1.5" marker-end="url(#lsB)"/>
  <path d="M470 194 L470 94 L430 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#lsB)"/>
  <path d="M600 94 L600 250 L340 250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#lsC)"/>
  <path d="M270 250 L260 94" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#lsC)"/>
  <defs>
    <marker id="lsB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="lsC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：LTH 派发把供应推入 STH（流动化）→ STH-MVRV 反映边际盈亏→抛压反馈价格。红色回路：价格下跌→STH capitulation→部分 maturing 回 LTH。

# 隐藏关系

## 隐藏关系一：LTH 重分类 ≠ 出售

链上转移触发 cohort 重置——可能是**托管变更、钱包整理、CoinJoin**，而非市场卖出【分析】。VanEck 2026 指出 LTH→STH 转移中 **1–5 年 band** 驱动大部分「派发」，但 **10+ 年 band 几乎不动**【待验证】。

## 隐藏关系二：跨平台数字不可比

Glassnode LTH **~16.3M** vs VanEck **~11.84M**（2026 夏【待验证】）——差 **~30%**，因聚类规则、交易所处理、ETF 实体定义不同【分析】。**只跟踪单一平台自身历史**。

:::raw
<div class="tool">
<h3>工具 · 双 cohort 成本基线</h3>
<p>现货 vs <strong>STH/LTH realized price</strong> → cohort MVRV 与 spread。默认 2026-09 参数。</p>
<div class="ctrl"><label>现货 ($)<input type="range" id="lth_spot" min="40000" max="150000" step="1" value="98000"><output id="lth_spotO">$98,000</output></label></div>
<div class="ctrl"><label>STH realized price ($)<input type="range" id="lth_sthRP" min="40000" max="120000" step="1" value="67963"><output id="lth_sthRPO">$67,963</output></label></div>
<div class="ctrl"><label>LTH realized price ($)<input type="range" id="lth_lthRP" min="30000" max="80000" step="1" value="49913"><output id="lth_lthRPO">$49,913</output></label></div>
<div class="readout">
<div class="ro"><span class="k">STH-MVRV</span><strong id="lth_sthMv">1.442</strong><span id="lth_sthPh">+44.2%</span></div>
<div class="ro"><span class="k">LTH-MVRV</span><strong id="lth_lthMv">1.963</strong><span id="lth_lthPh">+96.3%</span></div>
<div class="ro"><span class="k">成本 spread</span><strong id="lth_spr">$18,050 (36.2%)</strong><span id="lth_sprh">—</span></div>
<canvas id="lthCostChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="lth_cost_v">双 cohort 均盈利</strong><span id="lth_cost_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | LTH/STH 领域 | 其他领域 |
|---|---|---|
| **cohort 分层** | 155 日 LTH/STH | 保险续保率曲线、订阅 churn |
| **成本基线 spread** | STH RP − LTH RP | 新股 vs 老股东成本、VWAP 分层 |
| **供应成熟度** | LTH% | 库存周转天数、债券久期 |
| **Smart Money 叙事** | LTH 吸筹 | 内部人买入、13F 集中增持 |
| **logistic 平滑** | 155d 权重 |  sigmoid 采纳曲线、扩散模型 |

# 系统运行机制

## 四阶段 cohort 循环

1. **熊市吸筹**：价格跌→LTH 净买入→LTH%↑→STH%↓→供应紧缩
2. **牛市扩张**：价格破前高→LTH 派发→STH 膨胀→新买家接盘
3. **顶部派发**：LTH% 从高位回落→STH-MVRV 极端→STH-SOPR>1 持续
4. ** capitulation**：价格 < STH RP→STH 亏损→部分换手→重新 maturing

:::note amber ETF 时代的「第五阶段」
ETF 托管币 aging 进 LTH **但不以传统方式流出**——LTH% 可长期维持 **>80%** 而不等于「永远牛市」【推论】。2024 周期派发带是史上最窄【待验证】。
:::

# 时间演化

## LTH 占比的周期峰值衰减

| 周期 | 阶段 | LTH 占比峰/谷【待验证】 | 特征 |
|---|---|---|---|
| 2013 | 顶 | ~50% | 深度派发 |
| 2017 | 顶 | ~55% | LTH 大幅减持 |
| 2021 | 顶 | ~65% | 派发带收窄 |
| 2024 | 顶 | ~73% | ETF 时代首顶 |
| 2022 | 底 | ~80% | 深度吸筹 |
| 2026 | 今 | **83.6%** | 供应高度成熟 |

**规律**：周期顶 LTH 占比**逐级抬高**（50→55→65→73%），底区也抬高（70→80%）——**不是重复模板，而是结构变迁**【分析】。

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">LTH 占比 · 周期演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="130" r="6" fill="#d5342c"/><text x="80" y="152" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2013顶 ~50%</text>
  <circle cx="180" cy="120" r="6" fill="#d5342c"/><text x="180" y="152" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2017顶 ~55%</text>
  <circle cx="300" cy="110" r="6" fill="#d5342c"/><text x="300" y="152" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021顶 ~65%</text>
  <circle cx="420" cy="95" r="6" fill="#b8730a"/><text x="420" y="152" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024顶 ~73%</text>
  <circle cx="300" cy="70" r="6" fill="#0f8a4d"/><text x="300" y="58" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022底 ~80%</text>
  <circle cx="600" cy="55" r="7" fill="#1d4ed8"/><text x="600" y="42" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026 83.6%</text>
  <text x="340" y="185" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">顶区 LTH% 逐级抬高 · 派发带收窄 · ETF 扭曲传统模板</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 LTH/STH 的影响 |
|---|---|---|
| **Glassnode** | 指标订阅与知名度 | 推 Smart Money 叙事 |
| **ETF 发行商** | AUM 增长 | 托管币 aging→LTH↑ 但不派发 |
| **LTH（真强手）** | 低换手最大化终值 | 抬升 LTH%、压低 STH 流动供应 |
| **STH（边际买家）** | 短期收益 | 高 beta、驱动 STH-MVRV |
| **矿工** | 现金流 | 持续向 STH 注入新供应 |
| **数据批评者** | 方法论声誉 | 提醒聚类误差 |

# 资源与信息流

## 资金流：LTH 派发 → STH 承接 → 现货抛压

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">LTH 派发 → STH 膨胀 → 流动供应（资金流抽水图）</text>
  <rect x="40" y="50" width="260" height="50" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="170" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">LTH 池 · 83.6% · 成本 $49,913</text>
  <rect x="380" y="50" width="260" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="510" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">STH 池 · 16.4% · 成本 $67,963</text>
  <path d="M300 75 L380 75" stroke="#d5342c" stroke-width="2" marker-end="url(#lsD)"/>
  <text x="340" y="68" font-size="10" text-anchor="middle" fill="#d5342c" font-family="sans-serif">LTH 派发</text>
  <rect x="140" y="140" width="400" height="40" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="340" y="165" font-size="11" text-anchor="middle" fill="#d5342c" font-family="sans-serif">流动供应膨胀 · STH-MVRV 反映边际盈亏 · 潜在抛压</text>
  <path d="M340 180 L340 220" stroke="#d5342c" stroke-width="1.5" marker-end="url(#lsD)"/>
  <rect x="200" y="220" width="280" height="40" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="245" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货市场 · 交易所 + ETF 订单流</text>
  <defs><marker id="lsD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker></defs>
</svg>
:::

**信息流**：全节点 → 索引商聚类 → Glassnode cohort 引擎 → 仪表盘/API → 研报/KOL → 交易者预期。**瓶颈**：聚类启发式误差可静默传播【分析】（Dan Holloran）。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「LTH 占比 &gt;80% 后 90 日上涨 78%」？先和<strong>随机持币基准</strong>比。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="lth_T" min="5" max="365" step="5" value="90"><output id="lth_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="lth_ps" min="50" max="90" step="0.1" value="78.0"><output id="lth_psO">78.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="lth_mu" min="0" max="100" step="1" value="50"><output id="lth_muO">50.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="lth_sg" min="30" max="100" step="1" value="65"><output id="lth_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="lth_base">67.7%</strong><span id="lth_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="lth_dp">+10.3 pp</strong><span id="lth_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="lth_n">152</strong><span id="lth_nh">—</span></div>
<canvas id="lthDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="lth_drift_v">超额有限</strong><span id="lth_drift_vh">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **分清测量与解读** | cohort 供应可算；Smart Money 是模型 |
| 2 | **单平台纵向比** | 不跨 Glassnode/VanEck 绝对值 |
| 3 | **读 STH-MVRV 先于 headline** | 边际买家盈亏更敏感 |
| 4 | **盯 LTH Net Position Change** | 净流向 > 静态占比 |
| 5 | **成本 spread 当压力表** | STH RP − LTH RP 扩=新买家更贵 |
| 6 | **ETF 模板漂移意识** | LTH>80% 不等于旧周期底 |
| 7 | **配 STH-SOPR 确认** | 供应变化 + 实际变现 |
| 8 | **漂移剥离胜率** | 任何 LTH 信号先减基准 |
| 9 | **155 日成熟曲线** | 理解分类滞后 |
| 10 | **30 分钟三联检** | 算、比、判——§22 |

# 常见认知陷阱

:::details 1. 「LTH 吸筹 = 立刻上涨」
**错因**：2022 LTH 80%+ 后价仍跌数月【待验证】。**对策**：LTH% 是区域信号；配价格结构与 ETF 流。
:::

:::details 2. 「LTH 派发 = 周期顶」
**错因**：2024 顶 LTH 仅 **~73%**，派发带有史以来最窄【待验证】。**对策**：看 LTH% **从高位回落的斜率**，非绝对值。
:::

:::details 3. 跨平台比较 LTH 绝对量
**错因**：Glassnode vs VanEck 差 **~30%**【待验证】。**对策**：只跟踪单一数据源历史。
:::

:::details 4. 把 LTH→STH 转移当卖出
**错因**：可能是 custody/整理/CoinJoin【分析】。**对策**：配 exchange inflow + SOPR。
:::

:::details 5. 忽视 ETF 托管 aging
**错因**：ETF 币进 LTH 但不传统派发【推论】。**对策**：读 Adjusted/ETF 剔除版。
:::

:::details 6. 用 2017 顶模板读 2026
**错因**：顶区 LTH% 从 50% 抬到 73%+【分析】。**对策**：§10 演化表。
:::

:::details 7. 只看 LTH% 不看成本 spread
**错因**：83.6% LTH 但 STH 仍 +44% 盈利——派发激励存在。**对策**：§08 双 cohort 工具。
:::

:::details 8. 把二手阈值当【事实】
**错因**：「80%=底」「65%=顶」传播链过长。**对策**：标【待验证】，回测本周期。
:::

:::details 9. 忽视交易所余额剔除
**错因**：用户存交易所多年不算 LTH【事实】。**对策**：理解 Glassnode 定义边界。
:::

:::details 10. 单指标 All-in
**错因**：公开 cohort 信号被 trade against。**对策**：≥3 独立信号。
:::

:::details 11. 胜率不算漂移
**错因**：90 日随机做多基准 **67.7%**。**对策**：§12 漂移剥离器。
:::

:::details 12. 把 STH 当「弱手」刻板印象
**错因**：STH 含 ETF 再平衡、矿工、机构战术仓【分析】。**对策**：cohort 是统计，非道德标签。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| Smart Money | 低换手长期持有者 | LTH% 83.6%、Net Change 正 |
| 边际买家压力 | 近期入场者盈亏 | STH-MVRV 1.442 |
| 供应紧缩 | 可交易 BTC 减少 | STH 16.4% |
| capitulation | 长持者亏损 | 现货 < LTH RP（罕见） |

# 从理论到行动

**决策漏斗**（自上而下）：

1. **宏观**：流动性与 ETF 流方向？
2. **cohort 结构**：LTH% 处于历史分位？Net Position Change 方向？
3. **成本分层**：STH-MVRV vs LTH-MVRV 是否分歧？
4. **确认**：STH-SOPR、exchange flow、价格结构同向？
5. **执行**：仓位匹配周期尺度——非 LTH% 一碰线就动

# 技能树

:::details L1 · 观察者
- [ ] 解释 155 日阈值的统计来源
- [ ] 手算 STH-MVRV = 98000÷67963 = 1.442
- [ ] 说出 LTH 与 STH 的行为差异
:::

:::details L2 · 分析师
- [ ] 读 LTH% 历史分位并判阶段
- [ ] 复述 2024 派发带收窄案例
- [ ] 用 §12 剥离 78% 胜率
:::

:::details L3 · 建模者
- [ ] 对比 Glassnode vs 第三方 LTH 量
- [ ] 建 LTH% + STH-MVRV 双轴面板
- [ ] 写 Net Position Change 辅助规则
:::

:::details L4 · 系统设计者
- [ ] 多信号投票（禁单 cohort 指标）
- [ ] 每季度记录 LTH 顶/谷模板
- [ ] 写「ETF 时代 cohort 失效清单」
:::

# 游戏化世界

**角色**：Cohort 供应审计员（Supply Auditor）。等级越高，越不信 Smart Money 口诀，越会看成本 spread。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 logistic w(155)=0.50 | 解锁「成熟曲线」 |
| Lv.2 | 向朋友解释 LTH≠个人身份 | 解锁「成本基线」 |
| Lv.3 | 算出 90 日真实超额 <12pp | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周记录 LTH%+STH-MVRV | 解锁「供应占比」 |
| Lv.5 | 写一页「LTH/STH 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘价 | 7 日表 |
| 每周 | 更新 LTH% & STH-MVRV | §06/§08 工具截图 |
| 每月 | 读一篇 cohort 批评/辩护 | 3 行摘要 |
| 每季 | 核对 STH/LTH RP | 与 Glassnode 误差 <3% |
| 每年 | 记录周期 LTH 顶/谷 | 与 §10 表对照 |

# 反事实模拟

:::tabs
@@情景 A · 若 2017 派发模板仍有效
2024 顶 LTH 应跌至 **~55%**。实际仅 **~73%**【待验证】——**派发带有史以来最窄，反事实支持模板漂移**。

@@情景 B · 若 LTH 吸筹必涨
2022 LTH 80%+ 后应 V 反。实际底后仍横盘数月——**LTH% 是区域非时点**。

@@情景 C · 若无 ETF 托管 aging
LTH% 峰值可能低 5–10 pp，STH 流动供应更大【推论】。ETF 抬升 LTH 占比但不等派发。

@@情景 D · 若只用全网 MVRV
STH +44% vs LTH +96% 差异被掩盖——**cohort 分层提供额外分辨率**【分析】。
:::

:::raw
<div class="tool">
<h3>工具 · 供应占比周期读数</h3>
<p><strong>LTH 供应占比</strong>与历史周期顶/底对照。默认 2026-09：<strong>83.6%</strong>。</p>
<div class="ctrl"><label>LTH 供应占比 (%)<input type="range" id="lth_lthPct" min="45" max="90" step="0.1" value="83.6"><output id="lth_lthPctO">83.6%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">STH 供应</span><strong id="lth_sthPct">16.4%</strong><span id="lth_sthPctO">—</span></div>
<div class="ro"><span class="k">LTH:STH 比</span><strong id="lth_ratio">5.10:1</strong><span id="lth_ratioh">—</span></div>
<canvas id="lthSupChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="lth_sup_v">深度吸筹/供应紧缩</strong><span id="lth_sup_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会分层** | 3 天 | 155 日/logistic/实体调整 | 口算 w(177)=0.90 |
| **L2 会读成本** | 1 周 | STH/LTH MVRV + spread | 双 cohort 工具实操 |
| **L3 会修模板** | 2 周 | ETF 漂移 + 单平台纵向 | 2024 vs 2017 对照 |
| **L4 会迭代系统** | 1 月+ | 多信号 + 漂移剥离 | 连续 2 月无口诀交易 |

# 30 分钟最小实践

**任务**：完成「LTH/STH 三联检」——算、比、判。

1. **8 分钟 · 成熟曲线**：§06 工具，155 日 → w_LTH=**50.0%**，177 日 → **90.0%**。
2. **7 分钟 · 成本分层**：§08 工具，STH-MVRV=**1.442**，LTH-MVRV=**1.963**，spread=**+36.2%**。
3. **8 分钟 · 漂移剥离**：§12 工具，90 日 78% 胜率 → 真实超额 **+10.3 pp**，需 **n≈152**。
4. **7 分钟 · 结论**：写三句话——(a) 当前 LTH% 区间 (b) 2024 模板是否仍适用 (c) STH-MVRV 一条观察。**禁止写「LTH 吸筹必涨」。**

**验证**：STH-MVRV 与 §08 默认读数误差 **<0.01**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Glassnode LTH/STH 指南 + Schultze-Kraft 2020 摘要 |
| D2 | 分类 | logistic 曲线手算 + §06 工具 |
| D3 | 批评 | Dan Holloran + ETF aging 各 3 条 |
| D4 | 成本 | §08 双 cohort 工具 + STH/LTH RP |
| D5 | 历史 | 对照 2017/2021/2024 LTH% 顶谷 |
| D6 | 流向 | 记录 7 日 LTH Net Position Change |
| D7 | 合成 | 1 页「LTH/STH 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：155 日分类 + logistic + 实体调整（L1）
**Week 2**：cohort 成本基线 + STH/LTH MVRV + spread（L2）
**Week 3**：供应占比周期 + ETF 模板漂移 + SOPR 配证（L3）
**Week 4**：个人 cohort 面板 + 季度校准 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **155 日阈值** | UTXO 花费概率拐点 | 实体调整≠单 UTXO |
| 2 | **logistic 权重** | 平滑 cohort 归属 | 155d=50/50 |
| 3 | **LTH/STH Supply** | 分层供应占比 | 跨平台不可比 |
| 4 | **STH/LTH Realized Price** | cohort 成本基线 | 非 VWAP |
| 5 | **STH-MVRV / LTH-MVRV** | cohort 盈亏倍数 | STH 驱动边际 |
| 6 | **成本 Spread** | STH RP − LTH RP | 扩=新买家更贵 |
| 7 | **LTH Net Position Change** | 30 日净流向 | 优于静态 LTH% |
| 8 | **STH-SOPR / LTH-SOPR** | cohort 变现行为 | 供应+行为双读 |
| 9 | **周期模板漂移** | 顶区 LTH% 抬高 | 死守 2017 |
| 10 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |

# 关键问题清单

:::details cohort 结构
- 当前 LTH%？STH%？Net Position Change 方向？
- LTH% 处于历史分位？
- 与 2024 顶/2022 底比如何？
:::

:::details 成本分层
- STH-MVRV vs LTH-MVRV？
- 现货 vs LTH RP（ capitulation 线）？
- 成本 spread 扩还是收窄？
:::

:::details 确认
- STH-SOPR >1 持续？
- ETF 7 日净流入？
- exchange inflow 是否共振？
:::

:::details 决策
- 信号胜率是否扣过漂移？
- 样本量是否够？
- 是否 ≥3 信号一致？
:::

# 下一阶段探索

1. **ETF 实体剔除 LTH%**：托管 aging 占 LTH 增量多少？【待验证】
2. **STH-MVRV 领先性**：能否比全网 MVRV 早 2–4 周见顶？
3. **VanEck vs Glassnode 收敛**：聚类规则统一后数字差会否缩小？
4. **10+ 年 band 不动性**：老币「终极 LTH」对派发的缓冲有多大？
5. **跨资产 cohort**：ETH LTH/STH 是否有可比 155 日阈值？

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 155 日阈值 | 学术论文 | Schultze-Kraft & Heeg, Glassnode 2020 | 【事实】 |
| logistic 权重 | 技术文档 | Glassnode entity-adjusted supply | 【事实】 |
| LTH 14.7M / 83.6% | 第三方重建 | btc oak / Glassnode Studio 2026-07【待验证】 | 【待验证】 |
| STH RP $67,963 / LTH RP $49,913 | 第三方重建 | btc oak 2026-09【待验证】 | 【待验证】 |
| 2024 顶 LTH ~73% | 行业分析 | btc oak HODL Waves【待验证】 | 【待验证】 |
| Glassnode vs VanEck 差异 | 行业评论 | BIT.com Knowledge Hub 2026-08【待验证】 | 【待验证】 |
| 聚类方法论批评 | 个人博客 | Dan Holloran 2025 | 【分析】 |
| ETF aging 效应 | 行业分析 | James Check / btc oak 2026【分析】 | 【分析】 |
| 随机持币基准公式 | 手册内算 | μ=50%, σ=65%, Φ 正态 CDF | 【推论】 |

# 免责声明 {.appendix}

本手册仅供学习与认知框架构建，**不构成任何投资建议**。Bitcoin 价格波动极大；链上 cohort 指标基于启发式聚类与统计模型，存在**实体误分类、跨平台不可比、模板漂移**等重大局限。任何交易决策须自行承担风险，并咨询持牌专业人士。作者不对依据本手册内容做出的投资行为负责。
