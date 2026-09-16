---
slug: BTC-链上与周期技术指标
title: BTC-链上与周期技术指标
subtitle: 把<strong>链上估值</strong>（MVRV/NUPL/SOPR）与<strong>周期技术</strong>（减半/Pi Cycle/RSI）叠成<strong>信号栈</strong>——单指标口诀在 ETF 时代已结构性失效
brand_sub: Bitcoin × On-Chain × Cycle Technicals
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, 链上指标, 周期理论, Pi Cycle, 减半, ETF]
theme_js_file: BTC-链上与周期技术指标.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**BTC 链上与周期技术指标** = 用**链上账本**（谁持有、盈亏结构、是否向交易所转移）+ **周期时钟**（减半、移动均线交叉、历史分位）读 BTC 在**大周期**中的位置——不是预测下一根 K 线，而是回答「全网是否过热、周期是否完整、边际买家是否还在盈利」。

2024–2026 的核心教训：2025 峰 MVRV 仅 **~2.52**、NUPL 未持续 **>0.75**，Pi Cycle 在 2024-03 **误报顶**后价仍创新高【待验证】——**必须把多信号叠成栈，并对照随机持币基准**，不能死守 3.5 / +7 / Pi 交叉口诀。

# 这个领域到底是什么

## 一句话定位

研究的是：**如何把 Glassnode 式链上振荡器与减半/Pi Cycle/RSI 等周期技术读法组合成可校准的 BTC 宏观仪表盘**，及其在现货 ETF 时代的有效边界。

:::note red 先划清边界
本手册**不提供**买卖信号。链上指标度量**存量结构**；周期指标度量**时间节律**——二者都慢、都 coincident 居多，需配 ETF 流、宏观流动性与**对照基准**。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | MVRV/NUPL/SOPR、交易所储备、ETF 流、Pi Cycle、减半时钟、Puell/RSI |
| 2 | 边界 | 不含订单簿 HFT；不预测监管；不替代仓位管理 |
| 3 | 核心对象 | UTXO 成本基线、周期顶底阈值、机构资金流 |
| 4 | 参与者 | 链上分析师、ETF AP、矿工、数据商、周期理论传播者 |
| 5 | 关键变量 | MVRV、NUPL、SOPR、储备、ETF 净流入、111/350 DMA |
| 6 | 可观察 | 链上索引、ETF 日报、DMA 图表、Fear & Greed |
| 7 | 不可观察 | OTC 真实成本、丢失币、AP 实物申购路径 |
| 8 | 谁影响谁 | 价格→MVRV↑；ETF 申购→储备↓；矿工收入→Puell↑ |
| 9 | 因果 | UTXO 重定价 = 【事实】；Pi 交叉→顶 = 【推论】已 falsify 一次 |
| 10 | 只是相关 | 多数指标与价格共线——非独立 alpha |
| 11 | 表层 | 「3.5 必顶」「Pi 交叉必卖」「减半后 18 个月必顶」 |
| 12 | 底层 | 成本基线 + 供应冲击 + 行为激励 + 时间节律叙事 |
| 13 | 反馈 | 高 NUPL→媒体 FOMO→更多买盘→NUPL 更高 |
| 14 | 延迟 | Realized Cap 仅随链上转移更新；Pi Cycle **滞后** |
| 15 | 正负反馈 | 正：盈利扩张循环；负： capitulation→抄底叙事 |

## 两大子系统

| 子系统 | 代表指标 | 回答的问题 | 典型失效 |
|---|---|---|---|
| **链上估值** | MVRV、NUPL、SOPR、VDD、Reserve Risk | 全网贵不贵、谁在卖 | ETF 抬成本基线；阈值漂移 |
| **周期技术** | 减半时钟、Pi Cycle、Puell、周 RSI | 周期走到哪了 | 2024 Pi 误报；第四周期涨幅仅 **~31%**【待验证】 |

# 为什么值得研究

## 理由一：2024–2026 是「口诀集体失效」的 live test

第四减半（2024-04-19）后 **881 日**，涨幅远低于 2020 周期同期 **436%**【待验证】；Pi Cycle 2024-03 交叉后仅回调 **~20%** 而非历史 **>50%**【分析】。不学这一课，会继续用 2017 图表指挥 2026 仓位。

## 理由二：ETF 改变了信息流，没改变链上数学

CoinShares Q4 2025：价格跌 **23%** 但全球 ETF 流仍 **+$37 亿**【待验证】；13F 专业持仓全年 **+32%**【待验证】。链上储备与 ETF 流**可同向可背离**——必须分读「可见流动性」与「托管_redirect」。

## 理由三：任何胜率都要减漂移

| 持有期 | μ=50%/年 σ=65% | **随机持币基准** | 「Pi 顶卖空 65% 胜率」真实超额 |
|---|---|---|---|
| 20 日 | — | **58.6%** | 表面 +6.4 pp → 真实 **+6.4 pp** |
| 40 日 | — | **62.0%** | 表面 +3 pp → 真实 **~+3 pp** |
| 90 日 | — | **67.7%** | 表面 +2 pp → 真实 **~+2 pp** |

BTC 正漂移使「周期顶信号」的表观胜率被**系统性抬高**——§12 漂移剥离器必跑。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 UTXO 到周期决策

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 链上×周期 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「硬数据」，越靠下越「阈值/叙事可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① UTXO 账本</text>
  <text x="130" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">Realized Cap · SOPR 分子分母</text>
  <text x="130" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">丢失币/自转账噪声</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 链上估值层</text>
  <text x="130" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">MVRV · NUPL · SOPR · VDD · Reserve Risk</text>
  <text x="130" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">阈值 3.5/0.75 在 ETF 时代漂移</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 流动与储备层</text>
  <text x="130" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">交易所储备 · ETF 申购/赎回 · LTH/STH 供应</text>
  <text x="130" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">实物申购可绕过交易所余额</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 周期时钟层</text>
  <text x="130" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">减半 · 距顶/底日数 · Performance Multiple</text>
  <text x="130" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">第四周期峰值延迟 ~570 日【待验证】</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 周期技术层</text>
  <text x="130" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">Pi Cycle · Puell · 周 RSI · Mayer Multiple</text>
  <text x="130" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">Pi 2024 误报 · 滞后性</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 矿工与生产者层</text>
  <text x="130" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">Puell Multiple · MPI · 哈希率/价背离</text>
  <text x="130" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">手续费 Runes 脉冲后回落【事实】</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 机构流层</text>
  <text x="130" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">现货 ETF · 13F · Coinbase Premium</text>
  <text x="130" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">流≠买：实物 vs 现金申购</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="130" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「3.5 必顶」「Pi 交叉必卖」KOL 图表</text>
  <text x="130" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">只展示 2017 顶，隐藏 2024 偏离</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="130" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">信号栈 ≥3 一致 · 分位阈 · 漂移剥离</text>
  <text x="130" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">单指标不交易</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">链上×周期 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 均值回归</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 四年节律</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 未实现盈亏</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 供应冲击</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• UTXO 成本基线</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 减半发行率</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• DMA 交叉滞后</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• ETF 机械流</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 三联检仪表盘</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 减半日计数</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• Pi 距离 %</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#bcA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#bcA)"/>
  <defs><marker id="bcA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与指标栈的关系 |
|---|---|---|
| **Glassnode / Coin Metrics** | 链上索引 | MVRV/SOPR 定义方【事实】 |
| **Philip Swift** | Pi Cycle Top | 111/350 DMA 交叉；2024 误报【分析】 |
| **PlanB** | S2F 模型 | 2025 价远低于 $500K 预测【待验证】 |
| **ETF 发行商/AP** | 实物/现金申购 | 改变储备与成本基线【推论】 |
| **CoinShares / Kaiko** | 机构流研究 | 13F、ETF 流解读【分析】 |
| **矿工** | 区块奖励+费 | Puell/MPI 信号源 |
| **链上 KOL** | 传播阈值 | 放大幸存者偏差 |
| **BIS 研究者** | 方法论批评 | 链上精度有限【分析】 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **MVRV** | 市值÷已实现市值 | **~1.41**（+41% 未实现盈利） |
| **NUPL** | (MCap−RCap)/MCap | **~0.29**（Optimism 区） |
| **SOPR** | 花费输出市值÷创建时市值 | **~1.0**（盈亏平衡） |
| **LTH-SOPR** | 长期持有者版 | **~0.94**（亏损出货） |
| **距第四减半** | 2024-04-19 起算 | **881 日** |
| **Pi Cycle 间距** | (350×2 DMA − 111 DMA)/111 | **宽距**（无 imminent 交叉） |
| **ETF 5 日流** | 全球现货 ETF 净流入 | 波动；Q4 2025 仍为正【待验证】 |

:::raw
<div class="tool">
<h3>工具 · 链上信号栈</h3>
<p>叠 <strong>MVRV → NUPL 区</strong>、<strong>SOPR 方向</strong>、<strong>过热计数</strong>。默认 2026-09 温和区间。</p>
<div class="ctrl"><label>MVRV<input type="range" id="bc_mvrv" min="0.8" max="4" step="0.01" value="1.41"><output id="bc_mvrvO">1.41</output></label></div>
<div class="ctrl"><label>SOPR<input type="range" id="bc_sopr" min="0.85" max="1.15" step="0.01" value="1.00"><output id="bc_soprO">1.00</output></label></div>
<div class="ctrl"><label>MVRV Z-Score<input type="range" id="bc_z" min="-2" max="8" step="0.05" value="0.35"><output id="bc_zO">+0.35σ</output></label></div>
<div class="readout">
<div class="ro"><span class="k">NUPL</span><strong id="bc_nupl">29.1%</strong><span id="bc_nuplh">—</span></div>
<div class="ro"><span class="k">情绪区</span><strong id="bc_zone">Optimism</strong><span id="bc_zoneh">—</span></div>
<div class="ro"><span class="k">过热信号数</span><strong id="bc_hot">0 / 3</strong><span id="bc_hoth">—</span></div>
<canvas id="bc_stackChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="bc_stack_v">周期未完成</strong><span id="bc_stack_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链：链上 ↔ 价格 ↔ 周期技术

:::raw
<svg viewBox="0 0 680 340" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">链上×周期因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="110" height="40" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="85" y="75" font-size="10.5" text-anchor="middle" fill="#454c56" font-family="sans-serif">ETF/现货需求</text>
  <rect x="170" y="50" width="90" height="40" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="215" y="75" font-size="10.5" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 价格</text>
  <rect x="290" y="50" width="100" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="340" y="75" font-size="10.5" text-anchor="middle" fill="#454c56" font-family="sans-serif">MVRV/NUPL</text>
  <rect x="420" y="50" width="100" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="470" y="75" font-size="10.5" text-anchor="middle" fill="#454c56" font-family="sans-serif">SOPR/储备</text>
  <rect x="550" y="50" width="100" height="40" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="600" y="75" font-size="10.5" text-anchor="middle" fill="#454c56" font-family="sans-serif">Pi/Puell/RSI</text>
  <rect x="170" y="140" width="120" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="230" y="162" font-size="10.5" text-anchor="middle" fill="#454c56" font-family="sans-serif">变现/抛压</text>
  <text x="230" y="178" font-size="9.5" text-anchor="middle" fill="#7c848f" font-family="sans-serif">高 NUPL 激励</text>
  <rect x="330" y="140" width="120" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="390" y="167" font-size="10.5" text-anchor="middle" fill="#454c56" font-family="sans-serif">减半发行率↓</text>
  <rect x="170" y="240" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="230" y="262" font-size="10.5" text-anchor="middle" fill="#454c56" font-family="sans-serif">DMA 交叉</text>
  <text x="230" y="278" font-size="9.5" text-anchor="middle" fill="#7c848f" font-family="sans-serif">滞后确认</text>
  <path d="M140 70 L170 70" stroke="#454c56" stroke-width="1.5" marker-end="url(#bcB)"/>
  <path d="M260 70 L290 70" stroke="#454c56" stroke-width="1.5" marker-end="url(#bcB)"/>
  <path d="M390 70 L420 70" stroke="#454c56" stroke-width="1.5" marker-end="url(#bcB)"/>
  <path d="M520 70 L550 70" stroke="#454c56" stroke-width="1.5" marker-end="url(#bcB)"/>
  <path d="M340 90 L230 140" stroke="#454c56" stroke-width="1.5" marker-end="url(#bcB)"/>
  <path d="M390 184 L340 90" stroke="#454c56" stroke-width="1.5" marker-end="url(#bcB)"/>
  <path d="M215 90 L230 240" stroke="#454c56" stroke-width="1.5" marker-end="url(#bcB)"/>
  <path d="M600 90 L600 140 L350 140" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#bcC)"/>
  <path d="M230 184 L215 90" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#bcC)"/>
  <defs>
    <marker id="bcB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="bcC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：价格推高 MVRV/NUPL（快变量）；Pi Cycle 由 DMA **滞后**推导（慢变量）；红色反馈：链上过热 → 抛压 → 价格 → 周期指标同步回落。

# 隐藏关系

## 隐藏关系一：MVRV 与 NUPL 同源但速度不同

NUPL = (MVRV−1)/MVRV【事实】。MVRV **1.41 → NUPL 29.1%**；**2.52 → 60.3%**。NUPL 对情绪区更敏感；MVRV Z 对历史极端更稳健【分析】——**应配对读，非二选一**。

## 隐藏关系二：ETF 流 ≠ 交易所买盘

实物申购可把 BTC 从 OTC 直接送入托管，**储备可升可降**而 ETF 仍净流入【分析】。CVJ 2026：储备反弹 **28K BTC** 与 ETF 流入可同时发生【待验证】。

:::raw
<div class="tool">
<h3>工具 · 减半周期时钟</h3>
<p>距 <strong>2024-04-19</strong> 第四减半的日数 vs 历史峰值延迟（2016/2020/2024 周期）。</p>
<div class="ctrl"><label>距减半（日）<input type="range" id="bc_hdays" min="100" max="900" step="1" value="881"><output id="bc_hdaysO">881 日</output></label></div>
<div class="readout">
<div class="ro"><span class="k">参考峰延迟</span><strong id="bc_hpeak">570 日</strong><span id="bc_hpeakh">2024 周期 Nov 2025</span></div>
<div class="ro"><span class="k">周期相位</span><strong id="bc_hphase">峰后调整</strong><span id="bc_hphaseh">—</span></div>
<canvas id="bc_hChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="bc_h_v">已过典型峰位</strong><span id="bc_h_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | BTC 链上×周期 | 其他领域 |
|---|---|---|
| **慢变量分母** | Realized Cap | 央行资产负债表 |
| **滞后交叉** | Pi Cycle DMA | 金叉/死叉 MACD |
| **发行率冲击** | 减半 | OPEC 减产 |
| **分位极端** | MVRV Z | 信用利差 Z |
| **胜率漂移** | 随机持币基准 | 股票长期正 drift |

# 系统运行机制

## 信号栈：三问三分读

Onchain Decoded 2026 纪律【分析】：

1. **储备问**：供应变多还是变少？（交易所 + ETF 托管）
2. **边际买家问**：STH-SOPR 是否 <1 而价仍涨？（健康 rally vs 亏损推动）
3. **估值问**：MVRV Z 是否进入历史上沿？

**三者同向**才升级结论；多数周份它们**分歧**——分歧本身说明周期未走完。

## 四阶段 + 周期时钟

| 阶段 | 链上特征 | 周期技术 |
|---|---|---|
| 积累 | MVRV 1.0–1.5 · SOPR≈1 | 减半后 0–300 日 |
| 扩张 | NUPL 0.25–0.50 · SOPR>1 上行 | Performance Multiple >2 |
| 派发 | MVRV>2.5 · LTH 流出 | Pi 接近/交叉 · Puell>1.4 |
| 清算 | MVRV<1 · LTH-SOPR<1 | 峰后 12–18 月 |

:::note amber 2026 异常：「无狂热顶」
Amberdata/BGeometrics：2025 顶 MVRV **~2.52**、NUPL 未 sustained **>0.75**——**顶了但没有 euphoria**【待验证】。周期可能「不完整」或「结构变平」。
:::

# 时间演化

## 减半周期与指标峰值衰减

| 减半 | 日期 | 后 12M 涨幅【待验证】 | 峰 MVRV【待验证】 | Pi 有效？ |
|---|---|---|---|---|
| 3rd | 2020-05 | +541% | ~3.7 | 是 |
| 4th | 2024-04 | **+31~41%** | ~2.52 | **2024 误报** |
| — | 2026-09 | 881 日 · 调整中 | ~1.41 | 宽距 |

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 周期演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="70" cy="100" r="6" fill="#454c56"/><text x="70" y="82" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2016</text>
  <circle cx="170" cy="100" r="6" fill="#454c56"/><text x="170" y="82" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2020</text>
  <circle cx="280" cy="100" r="6" fill="#b8730a"/><text x="280" y="82" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024 减半</text>
  <circle cx="380" cy="100" r="6" fill="#d5342c"/><text x="380" y="82" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">Pi 误报</text>
  <circle cx="470" cy="100" r="6" fill="#d5342c"/><text x="470" y="82" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2025 顶</text>
  <circle cx="560" cy="100" r="6" fill="#0f8a4d"/><text x="560" y="82" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026 深值</text>
  <text x="380" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">MVRV 2.52</text>
  <text x="560" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">Z~0.2–0.4</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">涨幅压缩 · 顶阈下移 · Pi 需降级为栈内一票</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对指标叙事的影响 |
|---|---|---|
| **数据订阅商** | 指标知名度 | 推固定阈值 |
| **ETF 发行商** | AUM 增长 | 淡化「顶」信号 |
| **周期 KOL** | 内容传播 | 只展示 2017 Pi 成功案例 |
| **矿工** | 现金流 | Puell 高时抛售 |
| **AP/做市商** | 申购费差 | 实物流隐藏于储备外 |

# 资源与信息流

## 资金流：ETF 托管 vs 交易所可见池

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 资金流 · 抽水图（链上储备 + ETF 托管）</text>
  <rect x="40" y="50" width="260" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="170" y="80" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货 ETF 托管 · Coinbase Prime 等</text>
  <rect x="380" y="50" width="260" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="510" y="80" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">中心化交易所可见储备</text>
  <rect x="140" y="130" width="400" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="340" y="155" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">OTC / 实物申购 / 冷钱包 · 绕过交易所余额</text>
  <path d="M170 100 L170 130 L340 130 L340 170" stroke="#1d4ed8" stroke-width="1.5" fill="none" marker-end="url(#bcD)"/>
  <path d="M510 100 L510 130 L340 130" stroke="#b8730a" stroke-width="1.5" fill="none" marker-end="url(#bcD)"/>
  <rect x="240" y="190" width="200" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="340" y="210" font-size="11" text-anchor="middle" fill="#d5342c" font-family="sans-serif">潜在卖压池</text>
  <text x="340" y="226" font-size="9.5" text-anchor="middle" fill="#7c848f" font-family="sans-serif">高 NUPL + 储备↑ = 警惕</text>
  <defs><marker id="bcD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker></defs>
</svg>
:::

:::raw
<div class="tool">
<h3>工具 · Pi Cycle 距离计</h3>
<p>111 日 DMA 须<strong>上穿</strong> 350 日 DMA×2 才触发 Pi 顶信号。调节两线估算间距 %。</p>
<div class="ctrl"><label>111 日 DMA ($K)<input type="range" id="bc_d111" min="50000" max="130000" step="500" value="85000"><output id="bc_d111O">$85,000</output></label></div>
<div class="ctrl"><label>350 日 DMA×2 ($K)<input type="range" id="bc_d350" min="50000" max="150000" step="500" value="90000"><output id="bc_d350O">$90,000</output></label></div>
<div class="readout">
<div class="ro"><span class="k">间距</span><strong id="bc_pigap">+5.9%</strong><span id="bc_pigaph">111 低于 350×2</span></div>
<div class="ro"><span class="k">Pi 状态</span><strong id="bc_pist">未交叉</strong><span id="bc_pisth">—</span></div>
<canvas id="bc_piChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="bc_pi_v">宽距 · 非顶区</strong><span id="bc_pi_vh">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **信号栈 ≥3** | MVRV Z + NUPL + SOPR/Pi 至少三票 |
| 2 | **分位阈替代绝对值** | 与自身 3 年分位比 |
| 3 | **减半时钟 + 链上** | 日数 alone 不够 |
| 4 | **Pi 降级** | 2024 误报写入规则 |
| 5 | **ETF 流三分读** | 流/储备/premium |
| 6 | **STH-SOPR 背离** | 价新高 SOPR 不确认 |
| 7 | **漂移剥离** | 任何胜率减基准 |
| 8 | **Puell 配哈希率** | 价涨 hash 不涨 = 挤压 |
| 9 | **写周期日志** | 每季记录实际峰 MVRV |
| 10 | **30 分钟三联检** | §22 |

# 常见认知陷阱

:::details 1. 「MVRV>3.5 必顶」
2025 峰 **~2.52**【待验证】。**对策**：NUPL + Z 分位。
:::

:::details 2. 「Pi 交叉 = 立刻卖」
2024-03 交叉后价仍创新高【分析】。**对策**：栈内一票，非 veto。
:::

:::details 3. 「减半后 18 个月必顶」
第四周期峰 **~570 日** 但涨幅仅 **x1.75**【待验证】。**对策**：幅度与时机分开看。
:::

:::details 4. 「ETF 流入 = 储备必降」
实物申购可绕过交易所【分析】。**对策**：三分读。
:::

:::details 5. 「SOPR>1 永远看涨」
需**方向**：价涨 SOPR 下行 = 亏损推动 rally【分析】。**对策**：看 SOPR 斜率。
:::

:::details 6. 「S2F 定价」
PlanB 预测与实际差一个数量级【待验证】。**对策**：当叙事非模型。
:::

:::details 7. 「NUPL>0.75 才完周期」
2025 未达仍见顶【待验证】。**对策**：「无狂热顶」情景。
:::

:::details 8. 单指标 All-in
公开栈被 trade against。**对策**：私有权重 + 多源。
:::

:::details 9. 忽视 LTH-SOPR capitulation
2026 初 LTH-SOPR **~0.94** 与深值区共振【待验证】。**对策**：长短期分开。
:::

:::details 10. 胜率不算漂移
90 日基准 **67.7%**。**对策**：§12 工具。
:::

:::details 11. 链上当精确会计
BIS：解读可差 **6×**【分析】。**对策**：近似仪表盘。
:::

:::details 12. 用 Pi 做日内
DMA **滞后数周**。**对策**：周期尺度 only。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 全网盈亏 | 持有者浮盈比例 | NUPL **29.1%** |
| 周期位置 | 减半后天数 | **881 日** |
| 技术顶距 | DMA 结构 | Pi 宽距 |
| 机构底 | 专业持仓 | 13F **+32%** YoY【待验证】 |

# 从理论到行动

**决策漏斗**：

1. 宏观流动性方向？
2. 链上栈：MVRV/NUPL/SOPR 分位？
3. 周期栈：减半相位 + Pi 距离 + Puell？
4. 机构：ETF 5 日流 + 储备趋势？
5. 执行：仅当 ≥3 独立层同向；仓位匹配**月**尺度

# 技能树

:::details L1 · 观察者
- [ ] 手算 NUPL：MVRV 1.41 → **29.1%**
- [ ] 说出 Pi Cycle 两线定义
- [ ] 解释 SOPR=1 含义
:::

:::details L2 · 分析师
- [ ] 叠 §06 信号栈读过热数
- [ ] 复述 2024 Pi 误报
- [ ] 漂移剥离 65% vs 62% 基准
:::

:::details L3 · 建模者
- [ ] ETF 流+储备+premium 三联
- [ ] 减半时钟 vs 历史峰延迟
- [ ] STH/LTH SOPR 分拆
:::

:::details L4 · 系统设计者
- [ ] 个人信号栈权重表
- [ ] 每季峰 MVRV 日志
- [ ] 反事实清单（§20）
:::

# 游戏化世界

**角色**：周期雷达员（Cycle Radar）。等级越高，越不信单指标，越会写「改变主线的证据」。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 NUPL 误差 <0.5pp | 解锁「信号栈」 |
| Lv.2 | 解释 Pi 2024 误报 | 解锁「Pi 距离计」 |
| Lv.3 | 漂移剥离真实超额 <5pp | 解锁「减半时钟」 |
| Lv.4 | 4 周 ETF+储备日志 | 解锁「资金流图」 |
| Lv.5 | 写「栈不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | Fear & Greed + 收盘价 | 7 日表 |
| 每周 | MVRV/NUPL/SOPR 三联 | §06 截图 |
| 每月 | ETF 5 日流 + 储备 | 与 Kaiko/CVJ 对照 |
| 每季 | Pi 间距 + Puell | §08/§12 工具 |
| 每年 | 记录峰 MVRV/NUPL | §10 表追加 |

# 反事实模拟

:::tabs
@@情景 A · 若 3.5 顶阈仍有效
2025 应 MVRV>3.5。实际 **~2.52**——**支持阈值下移**。

@@情景 B · 若 Pi 仍一票否决
2024-03 后不应新高。实际 2025 ATH **~$126K**【待验证】——**Pi 须降级**。

@@情景 C · 若无 ETF
第四周期涨幅或更接近历史；MVRV 波动更大【推论】。实际涨幅 **~31%**——机构化压缩波动。

@@情景 D · 若链上栈三票全热
2025 应 NUPL>0.75  sustained。实际未达——**「无狂热顶」**情景成立【待验证】。
:::

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「周期顶信号 65% 胜率」？先减<strong>随机持币基准</strong>（μ=50%/年 σ=65%）。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="bc_T" min="5" max="180" step="5" value="40"><output id="bc_TO">40 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="bc_ps" min="50" max="85" step="0.1" value="65.0"><output id="bc_psO">65.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="bc_mu" min="0" max="100" step="1" value="50"><output id="bc_muO">50.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="bc_sg" min="30" max="100" step="1" value="65"><output id="bc_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="bc_base">62.0%</strong><span id="bc_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="bc_dp">+3.0 pp</strong><span id="bc_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="bc_n">2083</strong><span id="bc_nh">—</span></div>
<canvas id="bc_driftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="bc_drift_v">超额有限</strong><span id="bc_drift_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会读栈** | 3 天 | NUPL/SOPR/Pi 定义 | 手算 29.1% |
| **L2 会拆失效** | 1 周 | 2024 Pi + 2025 顶阈 | 漂移剥离 |
| **L3 会配流** | 2 周 | ETF+储备+链上 | 三联日志 |
| **L4 会迭代** | 1 月+ | 个人栈+分位阈 | 2 月无口诀交易 |

# 30 分钟最小实践

**任务**：「链上×周期三联检」——算、叠、判。

1. **8 分钟 · NUPL**：MVRV **1.41** → NUPL **29.1%**（Optimism）。
2. **7 分钟 · 信号栈**：§06 默认 → 过热 **0/3**。
3. **8 分钟 · Pi 距离**：§12 默认 **+5.9%** → **未交叉**。
4. **7 分钟 · 漂移**：§12 工具 40 日 65% → 基准 **62.0%**，超额 **+3.0 pp**，**n≈2083**。

**验证**：NUPL 与 §06 误差 **<0.2pp**；禁止写「Pi 交叉必卖」。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 链上基础 | Glassnode MVRV/NUPL/SOPR 指南 |
| D2 | 周期技术 | Pi Cycle + 减半时间线 |
| D3 | 失效案例 | 2024 Pi + 2025 无狂热顶 |
| D4 | 工具 | §06–§12 四个模型 |
| D5 | ETF | CoinShares 13F 摘要 |
| D6 | 储备 | 交易所储备 vs ETF 实物 |
| D7 | 合成 | 1 页个人信号栈权重 |

# 30 天能力构建计划

**Week 1**：链上三指标 + 手算（L1）
**Week 2**：Pi/减半/Puell + 误报史（L2）
**Week 3**：ETF 流三分读 + 储备日志（L3）
**Week 4**：信号栈仪表盘 + 分位阈 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **MVRV/NUPL** | 全网盈亏结构 | 阈值漂移 |
| 2 | **SOPR** | 边际转移盈亏 | 需看方向 |
| 3 | **MVRV Z** | 历史极端 | +7 失效 |
| 4 | **Pi Cycle** | 111 上穿 350×2 | 2024 误报 |
| 5 | **减半时钟** | 供应冲击节律 | 涨幅压缩 |
| 6 | **Puell Multiple** | 矿工收入热 | 费脉冲噪声 |
| 7 | **ETF 流** | 机构需求 | ≠ 交易所买 |
| 8 | **交易所储备** | 可见卖压 | 实物绕过 |
| 9 | **对照基准** | 随机持币胜率 | 必减漂移 |
| 10 | **信号栈** | 多票投票 | 单指标 |

# 关键问题清单

:::details 链上
- MVRV/NUPL/SOPR 各多少？同向吗？
- LTH-SOPR 是否 capitulation？
- Z 分位 vs 绝对 3.5？
:::

:::details 周期
- 距减半几天？已过历史峰延迟吗？
- Pi 间距 %？Puell/RSI？
- 本周期峰 MVRV 记录了吗？
:::

:::details 机构
- ETF 5 日流？13F 趋势？
- 储备 vs 流是否背离？
:::

:::details 决策
- 过热信号 ≥几票？
- 胜率扣过漂移吗？
- 写什么会改变主线？
:::

# 下一阶段探索

1. **「无狂热顶」是否新范式**：NUPL 上限下移的结构性原因
2. **STH 栈 vs LTH 栈**：哪条对 ETF 时代更领先？
3. **Pi + MVRV Z 联合概率**：历史共现条件下的回撤分布
4. **实物申购占比**：能否链上代理 ETF 真实买压？
5. **第五减半预演**：2028 时钟与当前栈如何衔接？

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| MVRV/NUPL 2026 读数 | 行业分析 | Amberdata 2026 / Screk 2026 | 【待验证】 |
| 2025 峰 MVRV ~2.52 | 行业分析 | BGeometrics / Amberdata | 【待验证】 |
| Pi Cycle 2024 误报 | 媒体 | Ryder / Bitcoin Magazine | 【分析】 |
| 第四减半后 881 日 | 计算 | 2024-04-19 → 2026-09-17 | 【事实】 |
| 第四周期涨幅 ~31–41% | 研报 | Kaiko / ARK / Gate Learn | 【待验证】 |
| ETF Q4 2025 流 +$3.7B | 机构报告 | CoinShares 13F Q4 2025 | 【待验证】 |
| 储备反弹 28K BTC | 媒体 | CVJ.AI 2026 | 【待验证】 |
| S2F 失效 | 社区模型 | CapBitcoin 2026 | 【待验证】 |
| BIS 链上精度 | 央行研究 | BIS 工作论文 | 【分析】 |
| 漂移基准公式 | 手册规范 | panorama-handbook §1 | 【事实】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；MVRV、NUPL、Pi Cycle、减半时钟及任何链上/周期阈值均**不保证**未来价格路径。历史阈值（3.5、NUPL 0.75、Pi 交叉）在 ETF 时代已多次**未被触及或误报**，请勿依据单一指标进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
