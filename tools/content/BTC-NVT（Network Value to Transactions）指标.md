---
slug: BTC-NVT（Network Value to Transactions）指标
title: BTC-NVT（Network Value to Transactions）指标
subtitle: 用<strong>市值÷链上转账额</strong>读 BTC「价/用」比——Woo 的链上 P/E 可以，但 <strong>45/150 阈在 ETF 时代已结构性漂移</strong>
brand_sub: Bitcoin × On-Chain × Valuation
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, NVT, 链上指标, NVT Signal, Willy Woo]
theme_js_file: BTC-NVT（Network Value to Transactions）指标.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**NVT = 市值 ÷ 日链上转账额（USD）。** 它把 BTC 当成一家「结算网络公司」——分子是市场给的估值，分母是链上实际流转的经济量【事实】。NVT = **179** 意味着市场为每 **$1** 日链上结算额支付 **$179** 估值；**NVT Signal（NVTS）** 用 90 日成交量均线平滑分母，当前约 **224**【待验证】，高于 Kalichkin 经典高估阈 **150**。

Willy Woo (2017) 称其为「比特币的 P/E」；Dmitry Kalichkin (2018) 提出 NVTS 修正原始 NVT 的噪声与滞后【事实】。但 **NVTS < 45 = 抄底** 在 2022 年熊市底（NVTS **131.4**）**从未触发**【待验证】——ETF 囤币、闪电网络/L2 链下结算使分母系统性萎缩，阈值须用**分位数读法**重校。

# 这个领域到底是什么

## 一句话定位

「BTC-NVT」研究的是：**用链上经济吞吐量衡量 BTC 网络估值偏离的框架及其在成熟化时代的有效边界**。它是链上分析最早一批宏观指标之一，核心思想是「网络价值应与结算效用匹配」。

:::note red 先划清边界
本手册**不提供**「NVT 到 X 就买卖」的信号。NVT 度量的是**价/用比**；链上转账额受交易所内部结算、找零输出、批处理严重扭曲，且**不捕获**闪电网络与 ETF 囤币行为。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | NVT 定义、NVTS 平滑、周期阈值漂移、实体调整变体 |
| 2 | 边界在哪 | 不含订单簿微观结构；不预测监管；不替代现货技术分析 |
| 3 | 核心对象 | 市值、日链上转账额、NVT、NVT Signal、货币速度 |
| 4 | 参与者 | Willy Woo、Kalichkin、Glassnode、ETF 发行商、链上 KOL |
| 5 | 关键变量 | Market Cap、Transfer Volume、NVT、NVTS、Entity-Adjusted NVT |
| 6 | 可观察的 | 链上转账额、Woobull/Glassnode 面板、现货价 |
| 7 | 不可观察但可推断 | 闪电网络流量、交易所内部账本、OTC 结算 |
| 8 | 谁影响谁 | 价格↑→NVT↑；囤币/链下化→分母↓→NVT↑ |
| 9 | 因果 | 市值变→NVT 变 = 【事实】；高 NVT→价跌 = 【推论】 |
| 10 | 只是相关 | NVT 与价格、与周期阶段高度共线——非领先指标 |
| 11 | 表层现象 | 「NVTS>150 必顶」「<45 必底」社交媒体口诀 |
| 12 | 底层机制 | 估值/效用比 + 链下活动迁移 + 反射性成交量 |
| 13 | 反馈 | 涨价→投机转账↑→分母↑→NVT 暂降→再涨 |
| 14 | 时间延迟 | 原始 NVT 滞后顶数月；NVTS 改善但仍非预测 |
| 15 | 正负反馈 | 正：FOMO 推高市值快于用量；负：恐慌时用量韧性→NVT 骤降 |

## NVT 与 NVTS 的区别

| 版本 | 公式 | 用途 |
|---|---|---|
| **原始 NVT** | Market Cap ÷ 日转账额 | 日频噪声大；适合看极端日 |
| **NVT Signal** | Market Cap ÷ 90 日量均线 | 周期尺度；Kalichkin 45/150 阈 |
| **Entity-Adjusted NVT** | 剔除同实体自转账 | 更接近经济结算【分析】 |
| **Adjusted Transfer NVT** | 过滤找零/低质量流 | Glassnode/CoreCharts 变体 |

# 为什么值得研究

## 理由一：NVT 是链上估值的「元指标」

Glassnode 称其「链上工具最早开发的指标之一」【事实】；不懂 NVT 就无法阅读「比特币 P/E」类研报。它把抽象的「网络效用」变成可计算的比率。

## 理由二：2022–2026 是阈值 falsify 窗口

现货 ETF（2024-01）引入机构囤币——币不动链上，分母萎缩、NVT 系统性抬高【分析】。2022 年 11 月 FT X 后 NVTS 底 **131.4**，远高于低估阈 **45**【待验证】；2026 年 7 月 NVTS **224.1** 处高估区【待验证】——**旧口诀正在 live test**。

## 理由三：学会「测量 ≠ 择时」

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「高 NVT 分位 90 日胜率 40%」真实超额 |
|---|---|---|---|
| 30 日 | — | **54.3%** | 表面 −10 pp → 真实 **−28.3 pp** |
| 90 日 | — | **67.7%** | 表面 −28 pp → 真实 **−27.7 pp** |
| 180 日 | — | **74.8%** | 低 NVT 分位 80% 胜率 → 真实 **+5.2 pp** |

**任何「NVT 顶卖底买」都要和对照基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从链上转账，到 NVT 图表

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-NVT · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「链上硬数据」，越靠下越「阈值/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 链上转账层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">UTXO 转移 · 日额 ~$7.5B【待验证】</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：找零输出、自转账、批处理扭曲</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 市值对比层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">NVT = Market Cap ÷ 日转账额</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">≈ 货币速度的倒数（年化）</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 平滑层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">NVTS = 市值 ÷ 90 日量均线</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">Kalichkin 2018 · 滤除反射性成交量尖峰</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 周期阈值层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">顶 >150 · 底 <45 · 中性 45–150</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：2022 底 131.4 从未触 <45</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 实体调整层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">Entity-Adjusted NVT · 剔除同实体洗牌</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">Glassnode 变体可高于原始 NVT 数倍</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 链下迁移层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">闪电网络 · 交易所内部账本 · ETF 囤币</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">分母萎缩 → NVT 结构性上移【分析】</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 修正指标层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">Adjusted Transfer · NVT Golden Cross</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">短/长期 NVT 差分捕捉估值重置</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「比特币 P/E」叙事 · Woobull 图表</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：只展示 2017 顶，隐藏阈值漂移</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">NVT 当周期仪表盘，不当单点触发器</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">分位数 + MVRV/SOPR + 对照基准</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">NVT 概念 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 价/用比</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 网络 P/E</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 货币速度倒数</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 投机溢价</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 市值/链上结算</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 90 日平滑分母</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 链下活动迁移</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 反射性成交量</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 读 Woobull/Glassnode</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• NVTS 分位 vs 绝对阈</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 配 MVRV/ETF 流</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#nvtA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#nvtA)"/>
  <defs><marker id="nvtA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 NVT 的关系 |
|---|---|---|
| **Willy Woo** | 2017 提出 NVT | 原创者；承认不能提前判泡沫【分析】 |
| **Dmitry Kalichkin** | 2018 提出 NVTS | 90 日平滑 + 45/150 阈 |
| **Chris Burniske** | 命名 NVT | Token Summit 2017 首次公开演讲 |
| **Glassnode / Woobull** | 数据与图表 | 指标定义、Entity-Adjusted 变体 |
| **ETF 发行商** | 机构囤币 | 压低链上换手 → NVT 上移【推论】 |
| **闪电网络/L2** | 链下结算 | 分母不可见 → NVT 偏高【推论】 |
| **链上 KOL** | 传播 P/E 叙事 | 放大「150 必顶」幸存者偏差 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **Market Cap** | 供应 × 现货价 | ~$1.34T（$79K 附近） |
| **日链上转账额** | 24h Transfer Volume (USD) | ~$7.48B |
| **原始 NVT** | 前者 ÷ 后者 | **179.1** |
| **90 日量均线** | 90d MA of daily volume | ~$5.98B |
| **NVT Signal** | 市值 ÷ 90 日量均线 | **224.1** |
| **货币速度** | 日量÷市值×365 | **~2.04×/年** |

:::raw
<div class="tool">
<h3>工具 · 原始 NVT 计算器</h3>
<p>手算 <strong>NVT = 市值 ÷ 日链上转账额</strong>。默认 2026-07 量级参数。</p>
<div class="ctrl"><label>市值 ($T)<input type="range" id="nvt_mcap" min="0.8" max="2.5" step="0.001" value="1.340"><output id="nvt_mcapO">$1.34T</output></label></div>
<div class="ctrl"><label>日链上转账额 ($B)<input type="range" id="nvt_vol" min="2" max="20" step="0.01" value="7.48"><output id="nvt_volO">$7.5B</output></label></div>
<div class="readout">
<div class="ro"><span class="k">原始 NVT</span><strong id="nvt_ratio">179.1</strong><span id="nvt_ratioh">—</span></div>
<div class="ro"><span class="k">货币速度</span><strong id="nvt_vel">2.04×/年</strong><span id="nvt_velh">—</span></div>
<canvas id="nvtChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="nvt_v">本周期常态偏高</strong><span id="nvt_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">NVT 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="90" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">投机/囤币需求</text>
  <rect x="200" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="260" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 价格</text>
  <rect x="370" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="430" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">Market Cap</text>
  <rect x="540" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="600" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">NVT 比率</text>
  <rect x="200" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="270" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">链上转账</text>
  <text x="270" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(结算效用)</text>
  <rect x="400" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="470" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">链下活动</text>
  <text x="470" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(L2/交易所/ETF)</text>
  <rect x="200" y="250" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="270" y="270" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">估值修正</text>
  <text x="270" y="286" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(高 NVT→回调)</text>
  <path d="M150 72 L200 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#nvtB)"/>
  <path d="M320 72 L370 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#nvtB)"/>
  <path d="M490 72 L540 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#nvtB)"/>
  <path d="M260 94 L270 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#nvtB)"/>
  <path d="M340 172 L400 172" stroke="#454c56" stroke-width="1.5" marker-end="url(#nvtB)"/>
  <path d="M470 150 L430 94" stroke="#0f8a4d" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#nvtC)"/>
  <path d="M600 94 L600 250 L340 250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#nvtD)"/>
  <path d="M270 250 L260 94" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#nvtD)"/>
  <defs>
    <marker id="nvtB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="nvtC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
    <marker id="nvtD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：市值推高 NVT（分子快）；链上转账是慢变量且受链下迁移挤压（分母）——故 NVT 长期**结构性上移**【分析】。红色反馈：高 NVT → 估值修正叙事 → 价格回落。

# 隐藏关系

## 隐藏关系一：NVT 与价格共线 ≠ 预测力

NVT 分子就是 Market Cap——它与价格**机械相关**。Kalichkin 原文已指出：原始 NVT **滞后顶数月**，峰值出现在回调中途【分析】。NVTS 改善响应性，但 Woo 本人承认「不能可靠地提前判定泡沫」【事实】。

## 隐藏关系二：链下迁移 = 分母永久性萎缩

| 迁移渠道 | 对 NVT 分母的影响 | 量级【分析】 |
|---|---|---|
| 闪电网络 | 完全不可见 | 日额数亿美元【待验证】 |
| 交易所内部结算 | 不触链 | 占现货量绝大部分 |
| ETF 囤币 | 低换手 | 2024 后机构持仓↑ |
| 交易批处理 | 压缩链上笔数 | 12% 笔数移 30–60% 价值 |

**同一经济活动在 L1 上「看起来更少」→ NVT 系统性偏高**——这不是「更贵」，是「量不到」。

:::raw
<div class="tool">
<h3>工具 · NVT Signal 仪表盘</h3>
<p><strong>NVTS = 市值 ÷ 90 日转账额均线</strong>。默认读数对应 2026-07 NVTS≈224.1。</p>
<div class="ctrl"><label>市值 ($T)<input type="range" id="nvt_s_mcap" min="0.8" max="2.5" step="0.001" value="1.340"><output id="nvt_s_mcapO">$1.34T</output></label></div>
<div class="ctrl"><label>日转账额 ($B)<input type="range" id="nvt_s_vol" min="2" max="20" step="0.01" value="7.48"><output id="nvt_s_volO">$7.5B</output></label></div>
<div class="ctrl"><label>90 日量/日量比<input type="range" id="nvt_s_smooth" min="0.5" max="1.2" step="0.001" value="0.799"><output id="nvt_s_smoothO">79.9%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">NVT Signal</span><strong id="nvt_nvts">224.1</strong><span id="nvt_nvtsh">—</span></div>
<div class="ro"><span class="k">原始 NVT</span><strong id="nvt_raw_cmp">179.1</strong><span id="nvt_raw_cmph">—</span></div>
<div class="ro"><span class="k">Kalichkin 区间</span><strong id="nvt_s_band">≥150</strong><span id="nvt_s_bandh">—</span></div>
<canvas id="nvtSignalChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="nvt_s_v">高估区（>150）</strong><span id="nvt_s_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | NVT 领域 | 其他领域 |
|---|---|---|
| **价/基本面比** | NVT（市值/结算额） | 股票 P/E、房地产租售比 |
| **货币速度倒数** | 1/NVT×365 | MV=PY 中的 V |
| **平滑分母** | NVTS 90 日 MA | 财报 TTM 盈利 |
| **分母测量偏差** | 链下迁移 | GDP 地下经济不可见 |

# 系统运行机制

## 四阶段循环

1. **低估期**：链上用量相对市值充裕，NVTS <45（早期周期）或 <150（近期），积累叙事
2. **扩张期**：价格加速跑赢用量，NVT 攀升，投机转账短暂抬高分母
3. **高估期**：NVTS >150，市值远超结算效用，派发/回调风险上升
4. **重置期**：价格回落但用量韧性→NVT 骤降；或链下迁移使 NVT 高位横盘

:::note amber 反射性成交量
涨价后投机转账激增会**暂时压低 NVT**——这正是 Kalichkin 要用 90 日平滑滤除的噪声【分析】。勿把短期 NVT 下降误读为「用量跟上」。
:::

# 时间演化

## 周期峰值衰减：NVTS 顶逐轮下移、底阈失效

| 时点 | 事件 | NVTS【待验证】 | 经典区间 |
|---|---|---|---|
| 2017-12 | 周期顶 | **322.6** | >>150 高估 |
| 2018-12 | 熊市底 | **~50** | 近 45 低估阈 |
| 2021-04 | 周期顶 | **273.1** | >>150 高估 |
| 2022-11 | FT X 后底 | **131.4** | 中性区——**未触 <45** |
| 2024-04 | 减半日 | **136.0** | 中性偏高 |
| 2026-07 | 当前 | **224.1** | >150 高估 |

**<45 低估阈自 2018 后再未可靠触发**【分析】——2022 最深回撤时 NVTS 仍在「正常带」。

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">NVT Signal 周期演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#d5342c"/><text x="80" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2017</text><text x="80" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">323</text>
  <circle cx="160" cy="100" r="6" fill="#0f8a4d"/><text x="160" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2018</text><text x="160" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">~50</text>
  <circle cx="260" cy="100" r="6" fill="#d5342c"/><text x="260" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021</text><text x="260" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">273</text>
  <circle cx="360" cy="100" r="6" fill="#b8730a"/><text x="360" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022</text><text x="360" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">131</text>
  <circle cx="460" cy="100" r="6" fill="#b8730a"/><text x="460" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024</text><text x="460" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">136</text>
  <circle cx="560" cy="100" r="6" fill="#d5342c"/><text x="560" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026</text><text x="560" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">224</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">顶读数递减 · 底阈漂移失效 · 本周期 NVT 常 >100</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 NVT 的影响 |
|---|---|---|
| **数据商** | 指标知名度→订阅 | 推「经典 45/150」叙事 |
| **ETF 发行商** | 规模增长 | 囤币压低分母、抬高 NVT |
| **交易所** | 内部结算 | 链上量不代表现货量 |
| **交易者** | 短期 alpha | 公开阈值→被 front-run |
| **L2 开发者** | 扩容叙事 | 链下活动使 NVT「看起来更高」 |

# 资源与信息流

## 资金流与估值溢价「抽水」

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">市值溢价 → 投机/囤币分流（资金流抽水图）</text>
  <rect x="40" y="50" width="600" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 网络估值 · 市值 $1.34T</text>
  <rect x="40" y="120" width="280" height="36" rx="6" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.2"/>
  <text x="180" y="143" font-size="11" text-anchor="middle" fill="#d5342c" font-family="sans-serif">投机溢价 ~$1.05T (NVT 224 vs 中性 100)</text>
  <rect x="340" y="120" width="300" height="36" rx="6" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.2"/>
  <text x="490" y="143" font-size="11" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">链上日结算 ~$7.5B × 365 ≈ $2.7T/年</text>
  <path d="M180 156 L180 200 L340 200 L340 230" stroke="#d5342c" stroke-width="1.5" fill="none" marker-end="url(#nvtE)"/>
  <path d="M490 156 L490 200 L340 200" stroke="#0f8a4d" stroke-width="1.5" fill="none" marker-end="url(#nvtF)"/>
  <rect x="240" y="230" width="200" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="340" y="255" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">ETF 囤币 / 闪电网络 / 交易所账本</text>
  <text x="130" y="195" font-size="10" fill="#d5342c" font-family="sans-serif">高 NVT 溢价</text>
  <text x="520" y="195" font-size="10" fill="#0f8a4d" font-family="sans-serif">可见结算流</text>
  <defs>
    <marker id="nvtE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
    <marker id="nvtF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
  </defs>
</svg>
:::

**信息流路径**：全节点 → 索引商（Glassnode）→ Woobull 面板/API → 研报/KOL → 交易者预期 → 现货/ETF 订单流。**瓶颈**：各索引商对「实体调整」「交易所内部转账」处理不同，同指标可差 **数倍**【分析】。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「高 NVT 分位 90 日胜率 40%」？先和<strong>随机持币基准</strong>比——BTC 有正漂移。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="nvt_T" min="5" max="365" step="5" value="90"><output id="nvt_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="nvt_ps" min="30" max="90" step="0.1" value="40.0"><output id="nvt_psO">40.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="nvt_mu" min="0" max="100" step="1" value="50"><output id="nvt_muO">50.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="nvt_sg" min="30" max="100" step="1" value="65"><output id="nvt_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="nvt_base">67.7%</strong><span id="nvt_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="nvt_dp">-27.7 pp</strong><span id="nvt_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="nvt_n">42</strong><span id="nvt_nh">—</span></div>
<canvas id="nvtDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="nvt_v3">跑输基准</strong><span id="nvt_v3h">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **分清测量与阈值** | NVT 数学可靠；45/150 需重校 |
| 2 | **用分位替代绝对值** | 与自身 4 年历史比 |
| 3 | **读 Entity-Adjusted 变体** | 剔除洗牌噪声 |
| 4 | **配 MVRV/SOPR** | 单指标不交易 |
| 5 | **理解链下迁移** | L2/ETF 使 NVT 结构性上移 |
| 6 | **漂移剥离胜率** | 任何信号先减基准 |
| 7 | **看 NVTS 非原始 NVT** | 日频噪声极大 |
| 8 | **多数据源交叉** | Glassnode vs Woobull |
| 9 | **写阈值衰减日志** | 每周期记录 NVTS 顶/底 |
| 10 | **30 分钟三联检** | 算、比、判——§22 |

# 常见认知陷阱

:::details 1. 「NVTS>150 必顶」
**错因**：样本 n=3 周期 + 链下迁移。2021 顶 273 后仍横盘数月【待验证】。**对策**：看分位 + MVRV 共振。
:::

:::details 2. 「NVTS<45 = 立刻抄底」
**错因**：2022 底 131.4 从未触 45——等信号者错过整轮底【待验证】。**对策**：<45 是历史遗迹，非当前规则。
:::

:::details 3. 把 NVT 当领先指标
**错因**：Kalichkin 原文：原始 NVT 滞后顶数月。**对策**：配宏观流动性/ETF 流。
:::

:::details 4. 忽视链下活动
**错因**：闪电/L2/交易所内部结算不可见 → 分母萎缩。**对策**：读 Adjusted/Entity 版。
:::

:::details 5. 混淆原始 NVT 与 NVTS
**错因**：日频 NVT 噪声极大，单日鲸鱼转账可扭曲读数。**对策**：周期决策用 NVTS。
:::

:::details 6. 忽视反射性成交量
**错因**：涨价→投机转账↑→NVT 暂降→误判「用量跟上」。**对策**：90 日平滑正是为此。
:::

:::details 7. 把二手阈值当【事实】
**错因**：45/150 传播链过长，未验证 ETF 时代。**对策**：标【待验证】，回测己周期。
:::

:::details 8. 单指标 All-in
**错因**：公开指标被 trade against。**对策**：≥3 独立信号一致。
:::

:::details 9. 忽视找零输出扭曲
**错因**：UTXO 找零使原始转账额膨胀 30–50%【分析】。**对策**：Entity-Adjusted 系列。
:::

:::details 10. 胜率不算漂移
**错因**：BTC 随机做多 90 日基准 **67.7%**。**对策**：§12 漂移剥离器。
:::

:::details 11. 用 NVT 做日内
**错因**：NVTS 分母是 90 日均线，日变化极慢。**对策**：NVT 是周期尺度工具。
:::

:::details 12. 「比特币 P/E」类比过度
**错因**：股票 E 是利润，链上量是结算额——语义不同【分析】。**对策**：当启发式，非会计等式。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 网络效用 | 链上经济结算 | 日转账额 ~$7.5B |
| 估值偏离 | 贵/便宜讨论 | NVTS 224 > 150 |
| 投机溢价 | 市值跑赢用量 | NVT 179 vs 历史均值 |
| 链下迁移 | ETF 囤币/L2 | 转账笔数增速 < 市值增速 |

# 从理论到行动

**决策漏斗**（自上而下）：

1. **宏观**：流动性周期方向？
2. **链上**：NVTS 处于历史分位？与 MVRV 是否一致？
3. **修正**：Entity-Adjusted NVT 方向是否一致？
4. **确认**：ETF 流、价格结构同向？
5. **执行**：仓位与持有期匹配周期尺度——非阈值一碰就动

# 技能树

:::details L1 · 观察者
- [ ] 手算 NVT = 1.34T÷7.48B = 179.1
- [ ] 解释 NVT 与货币速度倒数关系
- [ ] 说出 NVTS 与原始 NVT 区别
:::

:::details L2 · 分析师
- [ ] 计算 NVTS 并判 Kalichkin 区间
- [ ] 复述 2022 阈值失效案例
- [ ] 用 §12 剥离高 NVT 40% 胜率
:::

:::details L3 · 建模者
- [ ] 对比 Raw vs Entity-Adjusted NVT
- [ ] 建 NVTS 分位仪表盘（4 年窗口）
- [ ] 写 MVRV+ETF 流辅助规则
:::

:::details L4 · 系统设计者
- [ ] 多信号投票系统（禁单指标）
- [ ] 每周期自动记录 NVTS 顶/底
- [ ] 季度回测阈值衰减
:::

# 游戏化世界

**角色**：链上效用审计员（Utility Auditor）。等级越高，越不信口诀，越会看重校准。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 NVT 误差 <1% | 解锁「转账层」 |
| Lv.2 | 向朋友解释 NVTS vs 原始 NVT | 解锁「Signal 仪表盘」 |
| Lv.3 | 算出 90 日高 NVT 真实超额为负 | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周记录 NVTS+ETF | 解锁「修正指标」 |
| Lv.5 | 写一页「NVT 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘价 | 7 日表 |
| 每周 | 更新 NVT & NVTS | §06 工具截图 |
| 每月 | 读一篇 NVT 批评/辩护 | 3 行摘要 |
| 每季 | 核对 Glassnode 转账额 | 与 Woobull 误差 <5% |
| 每年 | 记录周期 NVTS 顶/底 | 与 §10 表对照 |

# 反事实模拟

:::tabs
@@情景 A · 若 45/150 阈仍有效
2022 年应出现 NVTS<45 后 V 反。实际底 **131.4**——**低估阈未被触及，反事实支持重校准**。

@@情景 B · 若无链下迁移
2024–26 NVT 应低于当前 179。闪电/ETF 使分母萎缩——**NVT 系统性偏高【推论】**。

@@情景 C · 若只用原始 NVT
2017 顶后 NVT 峰值滞后数月才出现——**原始版更适合事后复盘，非实时**。

@@情景 D · 若配 MVRV 共振
2026 NVTS 224（高估）+ MVRV 1.5（温和）——**信号分裂，应降仓位而非加仓【假设】**。
:::

:::raw
<div class="tool">
<h3>工具 · 阈值漂移衰减器</h3>
<p>历次周期 <strong>NVTS</strong> 顶递减、底阈失效——须随时代调整。</p>
<div class="ctrl"><label>选择时点<input type="range" id="nvt_era" min="0" max="4" step="1" value="4"><output id="nvt_eraO">2026 · 现</output></label></div>
<div class="readout">
<div class="ro"><span class="k">NVTS 读数</span><strong id="nvt_peak_nvts">224.1</strong><span id="nvt_peak_nvtsh">—</span></div>
<div class="ro"><span class="k">参考阈</span><strong id="nvt_peak_thr">150</strong><span id="nvt_peak_thrh">—</span></div>
<canvas id="nvtPeakChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="nvt_peak_v">当前偏高区</strong><span id="nvt_peak_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会算 NVT** | 3 天 | 市值/日转账额/NVTS | 口算 179.1 |
| **L2 会拆阈值** | 1 周 | 45/150 漂移叙事 | 漂移剥离器实操 |
| **L3 会修偏差** | 2 周 | Entity-Adjusted+ETF | 双版本对照 |
| **L4 会迭代系统** | 1 月+ | 多信号+分位阈 | 连续 2 月无口诀交易 |

# 30 分钟最小实践

**任务**：完成「NVT 三联检」——算、比、判。

1. **8 分钟 · 手算 NVT**：市值 $1.34T ÷ 日转账 $7.48B = **179.1**。
2. **7 分钟 · NVTS 区间**：§08 仪表盘，90 日量比 80% → NVTS=**224.1** → 高估区。
3. **8 分钟 · 漂移剥离**：§12 工具，90 日高 NVT 40% 胜率 → 真实超额 **−27.7 pp**。
4. **7 分钟 · 结论**：写三句话——(a) 当前 NVTS 区间 (b) <45 阈是否仍适用 (c) ETF/链下迁移一条观察。**禁止写「150 必顶」。**

**验证**：NVT 与 §06 默认读数误差 **<1**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Glassnode NVT 指南 + Woo Forbes 文摘要 |
| D2 | 手算 | Market Cap/Transfer Volume 与货币速度 |
| D3 | 批评 | Kalichkin 原文 + 链下迁移各 3 条 |
| D4 | 工具 | §06–§12 四个交互模型 |
| D5 | 历史 | 对照 2017/2021/2022 NVTS |
| D6 | ETF | 记录 7 日现货 ETF 净流入 |
| D7 | 合成 | 1 页「NVT 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：NVT 定义 + 手算 + 货币速度（L1）
**Week 2**：NVTS + 阈值漂移 + 漂移剥离（L2）
**Week 3**：Entity-Adjusted + ETF 修正 + MVRV 配证（L3）
**Week 4**：个人分位仪表盘 + 季度校准 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **原始 NVT** | 市值÷日转账额 | 日频噪声极大 |
| 2 | **NVT Signal** | 90 日量均线平滑 | 45/150 已漂移 |
| 3 | **货币速度** | 日量÷市值×365 | 链下不可见 |
| 4 | **Entity-Adjusted NVT** | 剔除同实体洗牌 | 定义因商而异 |
| 5 | **Adjusted Transfer NVT** | 过滤找零流 | 与 Raw 可差数倍 |
| 6 | **NVT Golden Cross** | 短/长期 NVT 差分 | 需配绝对水平 |
| 7 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 8 | **阈值衰减** | 顶读数递减 | 死守旧线 |
| 9 | **分位阈** | 与自身历史比 | 窗口选择 |
| 10 | **价/用背离** | 价涨量平→NVT↑ | 非必然回调 |

# 关键问题清单

:::details 链上
- 当前 NVT？NVTS？
- Raw vs Entity-Adjusted 差多少？
- 日转账额 7 日趋势？
:::

:::details 阈值
- 本周期 NVTS 顶/底是多少？
- <45 是否仍合理？
- 与 4 年分位对照？
:::

:::details 宏观
- ETF 7 日净流入？
- 全球流动性方向？
- 与 MVRV 是否共振？
:::

:::details 决策
- 信号胜率是否扣过漂移？
- 样本量是否够？
- 是否 ≥3 信号一致？
:::

# 下一阶段探索

1. **Entity-Adjusted NVT 能否成为新基准？** Glassnode 读数可高于 Raw 数倍【待验证】
2. **NVT Golden Cross 与宏观流动性共振**：2026 从 −0.58 回升至 −0.32【待验证】
3. **闪电网络流量估算**：能否修补分母盲区？
4. **ETH/SOL NVT 可比性**：仅 L1 原生资产有效？
5. **NVT + MVRV 联合分位模型**：分裂信号时如何加权？

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| NVT 定义与公式 | 指标文档 | Glassnode Docs / Woobull | 【事实】 |
| 原创者 Willy Woo | 媒体/博客 | Forbes 2017-09 / Woobull | 【事实】 |
| NVT Signal / 45/150 阈 | 论文/博客 | Kalichkin Medium 2018-02 | 【事实】 |
| 2026-07 NVT 179 / NVTS 224 | 数据站 | btc oak 2026-07 | 【待验证】 |
| 周期顶/底 NVTS 序列 | 数据站 | btc oak / Woobull | 【待验证】 |
| 2022 底未触 <45 | 数据站 | btc oak 2026 | 【分析】 |
| 高/低 NVT 分位 90 日收益 | 数据站 | CriptoTrack 2026 | 【待验证】 |
| 2025 年 $3.1T 调整结算量 | 行业研报 | Bitwise 2025 Roundup | 【待验证】 |
| 链下迁移批评 | 行业分析 | Cryptint / Bitbase Blog | 【分析】 |
| Woo「不能提前判泡沫」 | 原文 | Forbes 2017 | 【事实】 |
| Kalichkin 滞后批评 | 原文 | Bitcoin Words Journal | 【分析】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；NVT、NVT Signal 及任何链上阈值均**不保证**未来价格路径。历史阈值（45、150）在 ETF 与链下结算时代已多次**未被触及或失效**，请勿依据单一指标进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
