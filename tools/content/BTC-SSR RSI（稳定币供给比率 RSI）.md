---
slug: BTC-SSR RSI（稳定币供给比率 RSI）
title: BTC-SSR RSI（稳定币供给比率 RSI）
subtitle: 用<strong>稳定币购买力动量</strong>读 BTC 侧线资金——绿区 20–30 是背景条件，不是自动反弹按钮；低 SSR 也可能是<strong>资本撤离的数学残差</strong>
brand_sub: Bitcoin × Stablecoin × On-Chain Liquidity
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, SSR, 稳定币, RSI, 链上流动性, Glassnode]
theme_js_file: BTC-SSR RSI（稳定币供给比率 RSI）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**SSR = BTC 市值 ÷ 稳定币总市值**；低 SSR 意味着稳定币相对 BTC「购买力」更强【事实】。SSR 本身变化很慢，社区在 SSR 上套 **RSI(14)** 得到 **SSR RSI**——读的是**比率的动量**，不是绝对水平【分析】。CryptoQuant 社区图把 **20–30 标绿区**（超卖/充裕）、**70–80 标红区**（超买/紧缩）【待验证】。

2026 年 9 月 SSR RSI 曾跌至 **~13**（Maartunn 图表）【待验证】，媒体解读为「大量干火药在侧线」。但 **SSR=9.36 同时 USDT 30 日净流出 −$3.08B**——低 SSR 可能只是 BTC 与稳定币**同步缩水**的数学残差，不是积累信号【分析】。**永远配净流入/振荡器，勿单读 RSI。**

# 这个领域到底是什么

## 一句话定位

「BTC-SSR RSI」研究的是：**用稳定币相对 BTC 的体量与动量，推断侧线购买力环境及其有效边界**。它是 Glassnode 2019 年提出的 SSR 指标上叠加 Wilder RSI 的二次加工，核心思想是「稳定币是加密市场的美元蓄水池，其相对体量反映潜在买盘」。

:::note red 先划清边界
本手册**不提供**「SSR RSI<30 就抄底」的信号。SSR 度量的是**潜在**购买力；稳定币可能在 DeFi 锁仓、作抵押、或正在净流出——与「即将买入 BTC」不是一回事。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | SSR 定义、SSR RSI 构造、绿/红区阈值、与振荡器的关系 |
| 2 | 边界在哪 | 不含法币 OTC、ETF 申购、衍生品保证金；不预测监管 |
| 3 | 核心对象 | BTC 市值、稳定币总市值、SSR、SSR RSI、振荡器 |
| 4 | 参与者 | Glassnode、CryptoQuant 社区、Maartunn、Adler、稳定币发行商 |
| 5 | 关键变量 | SSR、RSI(14)、osc90d/200d、USDT 净流入、交易所储备 |
| 6 | 可观察的 | 链上稳定币供应、Glassnode/CryptoQuant 面板、现货价 |
| 7 | 不可观察但可推断 | 场外 OTC 规模、DeFi 锁仓比例、机构 ETF 通道 |
| 8 | 谁影响谁 | BTC 跌→SSR↓→RSI↓；稳定币增发→SSR↓→购买力↑ |
| 9 | 因果 | 市值比变化 = 【事实】；低 RSI→反弹 = 【推论】 |
| 10 | 只是相关 | SSR RSI 与价格、与周期阶段共线——非领先指标 |
| 11 | 表层现象 | 「RSI=13 必涨」「绿区=干火药」社交媒体叙事 |
| 12 | 底层机制 | 稳定币蓄水池 + 均值回归动量 + 结构性供应扩张 |
| 13 | 反馈 | 低 RSI→媒体看涨→更多持币→SSR 继续变化 |
| 14 | 时间延迟 | 稳定币从发行到上交易所可数日；RSI 滞后 14 日 |
| 15 | 正负反馈 | 正：FOMO 时稳定币被消耗→SSR↑→红区；负：恐慌时囤 U→SSR↓ |

## SSR 与 SSR RSI 的区别

| 版本 | 公式 | 用途 |
|---|---|---|
| **SSR** | BTC 市值 ÷ 稳定币市值 | 绝对购买力；跨周期**不可横比** |
| **SSR RSI** | RSI(14) 作用于 SSR 日序列 | 动量振荡；绿/红区判极端 |
| **SSR Oscillator** | SSR 相对 90/200 日均值偏离 | 跨周期可比；Adler 推荐 |
| **交易所稳定币储备** | 仅 CEX 钱包内稳定币 | 更接近「可立即交易」的流动性 |

# 为什么值得研究

## 理由一：SSR 是「加密美元池」最简洁的宏观读数

Glassnode 2019 年提出 SSR，称稳定币是 BTC 的「购买力代理」【事实】。在 USDT+USDC 合计 **>$150B** 的 2026 年，不懂 SSR 就无法讨论「侧线资金」叙事。

## 理由二：2024–2026 是指标 falsify 窗口

ETF 通道（2024-01 美国批准）让大量买盘**绕过稳定币**【分析】；2024 年 3 月 BTC 触 **$73,010** 时 SSR 振荡器仍处 **+0.597** 高位【待验证】——**传统「低 SSR=涨」叙事被 live test**。同时 Adler 2026 年 2 月指出：SSR 降至 **9.36** 但 USDT **连续 34 日净流出**——低 SSR 可能是撤离而非积累【分析】。

## 理由三：学会「测量 ≠ 择时」

| 持有期 | BTC μ=10%/年 σ=18% | **随机持币基准** | 「绿区买入 58% 胜率」真实超额 |
|---|---|---|---|
| 30 日 | — | **53.1%** | 表面 +5 pp → 真实 **−48.1 pp**（若仅 5%） |
| 90 日 | — | **63.0%** | 表面 −5 pp → **跑输基准** |
| 180 日 | — | **69.5%** | 需信号 >70% 才有正超额 |

**任何「SSR RSI 底买」都要和对照基准比**——BTC 有正漂移，基准不是 50%。osc90d<−0.25 后 90 日上涨仅 **58%**【待验证】，低于 90 日基准 **63.0%**。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从稳定币账本，到 SSR RSI 图表

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-SSR RSI · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「链上硬数据」，越靠下越「阈值/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 稳定币账本层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">USDT/USDC/DAI 等链上供应 · 合计 ~$150B+</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：DeFi 锁仓不计入「可交易」</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 市值比层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">SSR = BTC 市值 ÷ 稳定币市值</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">SSR=50 → 稳定币可买 2% 供应</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 购买力语义层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">低 SSR = 高相对购买力 · 高 SSR = 紧缩</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">失效：供应≠意愿≠通道</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 动量变换层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">SSR RSI = Wilder RSI(14) 于 SSR</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">读变化速度，非绝对水平</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 区间阈值层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">绿区 20–30 · 红区 70–80【待验证】</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：趋势市 RSI 可长期极端</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 结构漂移层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">前 2022 均值 SSR~188 · 后 2022 ~11</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">绝对 SSR 跨周期不可比——须用振荡器</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 通道分流层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">ETF/OTC/衍生品绕过稳定币池</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">2024 顶 ETF 需求与 SSR 脱节【分析】</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「RSI=13 干火药」· 链上 KOL 截图</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：不展示 USDT 净流出同期数据</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">SSR RSI 当背景过滤器，不当单点触发器</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">振荡器 + 净流入 + 对照基准</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">SSR RSI 概念 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 侧线美元池</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 购买力势能</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 动量均值回归</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 结构性漂移</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 市值比 SSR</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• RSI 捕捉变化率</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 双因子：价+供应</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• ETF 分流通道</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 读 CryptoQuant 面板</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 绿/红区 + 振荡器</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 配 USDT 净流入</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#ssA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#ssA)"/>
  <defs><marker id="ssA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 SSR RSI 的关系 |
|---|---|---|
| **Glassnode / Renato Shirakashi** | 2019 提出 SSR | 指标原创与文档维护【事实】 |
| **CryptoQuant 社区（SKY CEO LEE）** | 2022 发布 SSR RSI 图表 | 绿/红区可视化来源【待验证】 |
| **Maartunn (CryptoQuant)** | 链上分析师 | 2026 年 SSR RSI≈13 传播【待验证】 |
| **Axel Adler Jr.** | SSR 振荡器研究 | 强调绝对值不可比、须看净流入【分析】 |
| **Tether / Circle** | USDT/USDC 发行 | 供应端决定 SSR 分母 |
| **ETF 发行商** | 现货 ETF 申购 | 绕过稳定币通道【推论】 |
| **DeFi 协议** | 锁仓稳定币 | 降低「可交易」流动性【分析】 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **BTC 市值** | 供应 × 现货价 | ~$1.34T |
| **稳定币总市值** | USDT+USDC+DAI 等合计 | ~$143B |
| **SSR** | 前者 ÷ 后者 | **~9.37** |
| **购买力** | 1/SSR × 100% | **~10.67%** |
| **SSR RSI(14)** | RSI 作用于 SSR | **~13**（极端绿区） |
| **USDT 30 日变化** | 净流入/流出 | **−$3.08B**（连续净流出） |

:::raw
<div class="tool">
<h3>工具 · SSR 购买力计算器</h3>
<p>手算 <strong>SSR = BTC 市值 ÷ 稳定币市值</strong>，并换算购买力百分比。</p>
<div class="ctrl"><label>BTC 市值 ($T)<input type="range" id="ssr_btc" min="0.8" max="2.5" step="0.001" value="1.340"><output id="ssr_btcO">$1.34T</output></label></div>
<div class="ctrl"><label>稳定币市值 ($B)<input type="range" id="ssr_stab" min="80" max="200" step="0.1" value="143.0"><output id="ssr_stabO">$143.0B</output></label></div>
<div class="readout">
<div class="ro"><span class="k">SSR</span><strong id="ssr_ratio">9.37</strong><span id="ssr_ratioh">—</span></div>
<div class="ro"><span class="k">购买力</span><strong id="ssr_power">10.67%</strong><span id="ssr_powerh">—</span></div>
<canvas id="ssrChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ssr_v">充裕区</strong><span id="ssr_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链：从稳定币供应，到 SSR RSI 读数

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">SSR RSI · 因果与反馈</text>
  <rect x="20" y="40" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="80" y="67" font-size="11" fill="#15181d" font-family="sans-serif" text-anchor="middle">稳定币增发/销毁</text>
  <rect x="180" y="40" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="240" y="67" font-size="11" fill="#15181d" font-family="sans-serif" text-anchor="middle">BTC 现货价格</text>
  <rect x="340" y="40" width="100" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="390" y="67" font-size="11" fill="#15181d" font-family="sans-serif" text-anchor="middle">SSR 比值</text>
  <rect x="480" y="40" width="100" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="530" y="67" font-size="11" fill="#15181d" font-family="sans-serif" text-anchor="middle">SSR RSI</text>
  <rect x="600" y="40" width="70" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="635" y="67" font-size="11" fill="#15181d" font-family="sans-serif" text-anchor="middle">交易叙事</text>
  <path d="M140 62 L180 62" stroke="#454c56" stroke-width="1.5" marker-end="url(#ssB)"/>
  <path d="M300 62 L340 62" stroke="#454c56" stroke-width="1.5" marker-end="url(#ssB)"/>
  <path d="M440 62 L480 62" stroke="#454c56" stroke-width="1.5" marker-end="url(#ssB)"/>
  <path d="M580 62 L600 62" stroke="#454c56" stroke-width="1.5" marker-end="url(#ssB)"/>
  <text x="160" y="54" font-size="9" fill="#7c848f" font-family="sans-serif">市值</text>
  <text x="410" y="54" font-size="9" fill="#7c848f" font-family="sans-serif">RSI(14)</text>
  <path d="M390 84 Q390 130 240 130 Q90 130 80 84" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" fill="none" marker-end="url(#ssR)"/>
  <text x="240" y="148" font-size="10" fill="#d5342c" font-family="sans-serif" text-anchor="middle">反馈：叙事→FOMO/恐慌→价格→SSR</text>
  <path d="M80 84 Q80 200 530 84" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="4,3" fill="none"/>
  <text x="300" y="210" font-size="10" fill="#d5342c" font-family="sans-serif" text-anchor="middle">旁路：ETF/OTC 不经过稳定币池（虚线）</text>
  <defs>
    <marker id="ssB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="ssR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**实线因果**：稳定币供应与 BTC 价格共同决定 SSR → RSI 捕捉 SSR 变化率 → 媒体/KOL 解读为「干火药」或「过热」。

**红色虚线反馈**：叙事本身影响交易行为，进而改变价格与稳定币流向——形成正/负反馈环。

**旁路（未画实线）**：ETF 申购、OTC 大宗、衍生品保证金——不经过稳定币池，却直接影响 BTC 价格。

# 隐藏关系

## 跨域同构

| 本领域 | 同构领域 | 共同结构 |
|---|---|---|
| SSR（购买力比） | 货币供应量/M2 增速 | 法币池相对资产体量 |
| SSR RSI 绿区 | 信用利差收窄 | 「宽松」背景条件 |
| 低 SSR + 净流出 | 流动性陷阱 | 表面充裕、实际收缩 |
| RSI 于慢变量 | VIX 于 SPX 波动 | 对平滑序列套动量指标 |
| 振荡器 vs 绝对值 | P/E 分位 vs 绝对 P/E | 结构性漂移下的可比性 |

## 与相邻指标的关系

- **MVRV**：读全网持仓盈亏；SSR 读侧线法币池——互补而非替代。
- **交易所稳定币储备**：更接近「可立即买入」的子集；SSR 用全链上供应，更宽。
- **Coinbase Premium**：读美国买盘意愿；SSR 不区分地域。
- **ETF 净流入**：2024 年后与 SSR 经常**背离**——须同屏对照。

:::raw
<div class="tool">
<h3>工具 · SSR RSI 动量仪表盘</h3>
<p>模拟 SSR 在 <strong>15 日</strong>内从基准值下跌，计算 <strong>RSI(14)</strong> 并判绿/红区。</p>
<div class="ctrl"><label>起始 SSR<input type="range" id="ssr_r_base" min="5" max="20" step="0.1" value="11.0"><output id="ssr_r_baseO">11.0</output></label></div>
<div class="ctrl"><label>15 日跌幅 (%)<input type="range" id="ssr_r_drop" min="0" max="40" step="0.5" value="14.0"><output id="ssr_r_dropO">14.0%</output></label></div>
<div class="ctrl"><label>观察窗口 (日)<input type="range" id="ssr_r_days" min="7" max="30" step="1" value="15"><output id="ssr_r_daysO">15 日</output></label></div>
<div class="readout">
<div class="ro"><span class="k">SSR RSI</span><strong id="ssr_r_rsi">12.6</strong><span id="ssr_r_rsih">—</span></div>
<div class="ro"><span class="k">区间</span><strong id="ssr_r_zone">绿区 20–30</strong><span id="ssr_r_zoneh">—</span></div>
<canvas id="ssrRsiChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ssr_r_v">绿区（超卖）</strong><span id="ssr_r_vh">—</span></div>
</div>
</div>
:::

# 系统运行机制

SSR RSI 系统按四步循环运转：

1. **供应侧**：Tether/Circle 增发或赎回 USDT/USDC → 改变 SSR 分母。
2. **价格侧**：BTC 涨跌改变 SSR 分子——**双因子可同向或反向**。
3. **变换侧**：RSI(14) 将慢变量 SSR 转为快振荡器——绿/红区判极端动量。
4. **解读侧**：分析师/KOL 将读数映射为「干火药」「过热」叙事 → 影响交易行为 → 回到第 2 步。

**关键洞察**：第 1 步与第 2 步可**同时收缩**（2026 年 2 月案例）——SSR 数学上下降，但购买力并未增加。

# 时间演化

## 绝对 SSR 的结构性断裂

| 时期 | SSR 典型区间 | 购买力 (1/SSR) | 备注 |
|---|---|---|---|
| 2018 底 | **87.73** | 1.14% | 稳定币池极小 |
| 2020 夏 | **~188** | 0.53% | 前 2022 均值区【分析】 |
| 2022 底 | **4.12** | 24.27% | 稳定币扩张 + BTC 熊市 |
| 2024-03 顶 | SSR 振荡器 **+0.597** | — | ETF  Rally，振荡器仍高【待验证】 |
| 2026-02 | **9.36** | 10.68% | USDT 净流出同期【待验证】（SSR 9.37→购买力 10.67%） |

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">SSR 演化时间轴（绝对值 → 振荡器时代）</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#b8730a"/>
  <text x="80" y="80" font-size="10" fill="#454c56" font-family="sans-serif" text-anchor="middle">2018</text>
  <text x="80" y="130" font-size="9" fill="#7c848f" font-family="sans-serif" text-anchor="middle">SSR 87</text>
  <circle cx="200" cy="100" r="6" fill="#b8730a"/>
  <text x="200" y="80" font-size="10" fill="#454c56" font-family="sans-serif" text-anchor="middle">2020</text>
  <text x="200" y="130" font-size="9" fill="#7c848f" font-family="sans-serif" text-anchor="middle">SSR ~188</text>
  <circle cx="340" cy="100" r="8" fill="#d5342c"/>
  <text x="340" y="75" font-size="10" font-weight="700" fill="#d5342c" font-family="sans-serif" text-anchor="middle">2022 结构断裂</text>
  <text x="340" y="130" font-size="9" fill="#7c848f" font-family="sans-serif" text-anchor="middle">SSR → 个位数</text>
  <circle cx="480" cy="100" r="6" fill="#1d4ed8"/>
  <text x="480" y="80" font-size="10" fill="#454c56" font-family="sans-serif" text-anchor="middle">2024 ETF</text>
  <text x="480" y="130" font-size="9" fill="#7c848f" font-family="sans-serif" text-anchor="middle">通道分流</text>
  <circle cx="600" cy="100" r="6" fill="#0f8a4d"/>
  <text x="600" y="80" font-size="10" fill="#454c56" font-family="sans-serif" text-anchor="middle">2026</text>
  <text x="600" y="130" font-size="9" fill="#7c848f" font-family="sans-serif" text-anchor="middle">SSR RSI 时代</text>
  <text x="340" y="170" font-size="10" fill="#7c848f" font-family="sans-serif" text-anchor="middle">结论：跨周期比绝对 SSR 无意义 → 用振荡器 / RSI</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 SSR RSI 叙事的影响 |
|---|---|---|
| **稳定币发行商** | 增发赚储备收益 | 供应扩张→SSR↓→「购买力」叙事 |
| **交易所** | 吸引存量资金入场 | 推广「干火药」解读 |
| **链上数据商** | 订阅与 API | 指标可视化、社区图表 |
| **多头 KOL** | 流量与喊单 | 放大绿区=抄底口诀 |
| **空头/批评者** | 差异化观点 | 强调净流出、ETF 分流 |
| **ETF 发行商** | 规模管理费 | 买盘不经过 SSR 分母 |

# 资源与信息流

## 资金流抽水图：稳定币池 ↔ BTC 的多条通道

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">资金流 · 稳定币池与 BTC 的多通道</text>
  <rect x="30" y="50" width="140" height="80" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="100" y="85" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif" text-anchor="middle">稳定币池</text>
  <text x="100" y="105" font-size="10" fill="#454c56" font-family="sans-serif" text-anchor="middle">~$143B 链上</text>
  <rect x="280" y="40" width="120" height="60" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="340" y="65" font-size="11" fill="#0f8a4d" font-family="sans-serif" text-anchor="middle">CEX 现货</text>
  <text x="340" y="82" font-size="9" fill="#7c848f" font-family="sans-serif" text-anchor="middle">SSR 可见通道</text>
  <rect x="280" y="120" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="340" y="145" font-size="11" fill="#a06800" font-family="sans-serif" text-anchor="middle">DeFi 锁仓</text>
  <text x="340" y="160" font-size="9" fill="#7c848f" font-family="sans-serif" text-anchor="middle">SSR 计入但不可交易</text>
  <rect x="500" y="50" width="150" height="80" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="575" y="85" font-size="12" font-weight="700" fill="#d5342c" font-family="sans-serif" text-anchor="middle">BTC 现货</text>
  <text x="575" y="105" font-size="10" fill="#454c56" font-family="sans-serif" text-anchor="middle">~$1.34T 市值</text>
  <path d="M170 75 L280 70" stroke="#0f8a4d" stroke-width="2" marker-end="url(#ssG)"/>
  <text x="225" y="62" font-size="9" fill="#0f8a4d" font-family="sans-serif">买入</text>
  <path d="M170 95 L280 145" stroke="#7c848f" stroke-width="1.2" stroke-dasharray="4,3"/>
  <text x="210" y="130" font-size="9" fill="#7c848f" font-family="sans-serif">沉淀</text>
  <path d="M400 70 L500 75" stroke="#0f8a4d" stroke-width="2" marker-end="url(#ssG)"/>
  <rect x="280" y="200" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="225" font-size="11" fill="#1d4ed8" font-family="sans-serif" text-anchor="middle">ETF / OTC</text>
  <text x="340" y="240" font-size="9" fill="#7c848f" font-family="sans-serif" text-anchor="middle">SSR 不可见</text>
  <path d="M340 200 L575 130" stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#ssG)"/>
  <text x="460" y="175" font-size="9" fill="#1d4ed8" font-family="sans-serif">旁路需求</text>
  <path d="M100 130 L100 200 L340 225" stroke="#d5342c" stroke-width="1.5" marker-end="url(#ssG)"/>
  <text x="60" y="175" font-size="9" fill="#d5342c" font-family="sans-serif">净流出抽水</text>
  <defs><marker id="ssG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker></defs>
</svg>
:::

**信息源层级**：

1. **一级**：Glassnode/CryptoQuant 原始 SSR、RSI 序列
2. **二级**：USDT/USDC 发行数据、交易所储备
3. **三级**：ETF 净流入、Coinbase Premium
4. **四级**：媒体/KOL 解读（滞后、带偏见）

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 为什么重要 | 今天就能做的 |
|---|---|---|---|
| 1 | **配 USDT 净流入** | 区分积累 vs 撤离 | 查 CryptoQuant 30 日变化 |
| 2 | **用振荡器替代绝对 SSR** | 跨周期可比 | 读 osc200d 而非 SSR=9 |
| 3 | **漂移剥离胜率** | 避免被 58% 误导 | §12 工具实操 |
| 4 | **同屏 ETF 净流入** | 捕捉旁路需求 | 记录 7 日 ETF 流 |
| 5 | **读交易所储备子集** | 更接近可交易流动性 | 对比全供应 vs CEX 储备 |
| 6 | **绿区当背景非触发** | 防过早抄底 | 写清「背景条件」定义 |
| 7 | **趋势市禁用均值回归** | RSI 可长期极端 | 加 200 日均线方向过滤 |
| 8 | **样本量门槛** | 58% 需 n≈740 才显著 | §12 算所需 n |
| 9 | **DeFi 锁仓比例** | 修正「可交易」分母 | 查 DefiLlama 稳定币 TVL |
| 10 | **季度校准阈值** | 绿/红区可能漂移 | 每季记录分位而非绝对 |

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>把「绿区买入 XX% 胜率」与<strong>随机持币基准</strong>对照，算真实超额与所需样本量。</p>
<div class="ctrl"><label>持有期 (日)<input type="range" id="ssr_T" min="5" max="180" step="5" value="90"><output id="ssr_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="ssr_ps" min="50" max="80" step="0.1" value="58.0"><output id="ssr_psO">58.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="ssr_mu" min="0" max="30" step="0.5" value="10.0"><output id="ssr_muO">10.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="ssr_sg" min="10" max="80" step="1" value="18"><output id="ssr_sgO">18%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机基准</span><strong id="ssr_base">63.0%</strong><span id="ssr_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="ssr_dp">−5.0 pp</strong><span id="ssr_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="ssr_n">740</strong><span id="ssr_nh">—</span></div>
<canvas id="ssrDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ssr_v3">跑输基准</strong><span id="ssr_v3h">—</span></div>
</div>
</div>
:::

# 常见认知陷阱

:::details 1. 「SSR RSI<30 = 立刻抄底」
**错因**：2022 年绿区持续数月，价仍跌。**对策**：绿区是背景，不是时点；配价格结构。
:::

:::details 2. 「低 SSR = 干火药充足」
**错因**：2026 年 SSR=9.36 同时 USDT 净流出 $3.6B【待验证】。**对策**：必须看净流入方向。
:::

:::details 3. 跨周期比绝对 SSR
**错因**：2018 底 SSR=87 vs 2022 底 SSR=4——不可比。**对策**：用振荡器或 RSI。
:::

:::details 4. 把 SSR 当领先指标
**错因**：分子含现价，RSI 滞后 14 日。**对策**：当 coincident/略滞后背景。
:::

:::details 5. 忽视 ETF 旁路
**错因**：2024 顶 ETF 大量申购，SSR 振荡器仍高。**对策**：同屏 ETF 流。
:::

:::details 6. 稳定币供应 = 可交易流动性
**错因**：大量锁 DeFi、作抵押。**对策**：读交易所储备子集。
:::

:::details 7. RSI 均值回归在趋势市
**错因**：加密趋势性强，RSI 可长期极端【分析】。**对策**：加趋势过滤。
:::

:::details 8. 把二手胜率当【事实】
**错因**：osc90d 58% 传播链过长。**对策**：标【待验证】，自己回测。
:::

:::details 9. 单指标 All-in
**错因**：公开指标被 trade against。**对策**：≥3 独立信号。
:::

:::details 10. 胜率不算漂移
**错因**：90 日基准 63%，58% 信号跑输。**对策**：§12 漂移剥离器。
:::

:::details 11. 忽视 Glassnode 原始警告
**错因**：SSR「不反映法币交易或衍生品」【事实】。**对策**：当近似，非完备。
:::

:::details 12. 把媒体标题当研究
**错因**：「RSI=13 必涨」省略净流出上下文。**对策**：读原始图表+多源。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 侧线美元池 | 稳定币总市值 | ~$143B USDT+USDC+DAI |
| 购买力势能 | 低 SSR / 低 RSI | SSR 9.37 · RSI ~13 |
| 资金撤离 | 净流出 | USDT 30 日 −$3.08B |
| 旁路需求 | ETF 申购 | 现货 ETF 日净流入 |
| 可交易流动性 | 交易所储备 | CryptoQuant 储备指标 |

# 从理论到行动

**决策漏斗**（自上而下）：

1. **宏观**：全球流动性与风险偏好方向？
2. **结构**：SSR 振荡器处于哪个分位？净流入还是流出？
3. **动量**：SSR RSI 是否在绿/红区极端？
4. **确认**：ETF 流、MVRV、价格结构是否同向？
5. **执行**：仓位与持有期匹配周期尺度——非 RSI 一碰就动

# 技能树

:::details L1 · 观察者
- [ ] 手算 SSR = 1.34T÷143B = 9.37
- [ ] 解释 SSR=50 时购买力 2%
- [ ] 说出绿区 20–30 的含义
:::

:::details L2 · 分析师
- [ ] 区分 SSR vs SSR RSI vs 振荡器
- [ ] 复述 2026 净流出案例
- [ ] 用 §12 剥离 58% 胜率
:::

:::details L3 · 建模者
- [ ] 对比全供应 vs 交易所储备 SSR
- [ ] 建 SSR RSI + 净流入双面板
- [ ] 写 ETF 分流辅助规则
:::

:::details L4 · 系统设计者
- [ ] 多信号投票（禁单指标）
- [ ] 每季记录振荡器分位
- [ ] 季度回测绿/红区有效性
:::

# 游戏化世界

**角色**：稳定币流动性审计员（Stablecoin Auditor）。等级越高，越不信「干火药」口号，越会看净流入。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 SSR 误差 <1% | 解锁「供应层」 |
| Lv.2 | 向朋友解释 SSR vs RSI | 解锁「动量仪表盘」 |
| Lv.3 | 算出 90 日真实超额为负 | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周记录 SSR+净流入 | 解锁「结构漂移」 |
| Lv.5 | 写一页「SSR 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘价 | 7 日表 |
| 每周 | 更新 SSR & SSR RSI | §06 工具截图 |
| 每周 | 记录 USDT 7 日净流入 | CryptoQuant 截图 |
| 每月 | 读一篇 SSR 批评/辩护 | 3 行摘要 |
| 每季 | 核对振荡器分位 | 与 Adler 框架对照 |

# 反事实模拟

:::tabs
@@情景 A · 若绿区必反弹
2022 年 SSR RSI 多次入绿区后价仍跌数月——**绿区是区域非时点，反事实否定「必涨」**。

@@情景 B · 若无 ETF 通道
2024 年 Rally 买盘须经稳定币→SSR 振荡器应更低。实际 osc200d 仍 **+0.597**【待验证】——**ETF 分流支持旁路假说**。

@@情景 C · 若 USDT 持续净流入
SSR=9.36 + 净流入 → 真·干火药叙事成立。实际 **连续 34 日净流出**——**反事实支持「数学残差」解读**。

@@情景 D · 若只用绝对 SSR
2018 底 SSR=87「更紧」于 2022 底 SSR=4——逻辑荒谬。**反事实支持振荡器/RSI 必需**。
:::

:::raw
<div class="tool">
<h3>工具 · 结构漂移对照器</h3>
<p>各周期<strong>绝对 SSR</strong>不可横比——须配振荡器读数。</p>
<div class="ctrl"><label>选择时期<input type="range" id="ssr_era" min="0" max="4" step="1" value="4"><output id="ssr_eraO">2026 常态</output></label></div>
<div class="readout">
<div class="ro"><span class="k">绝对 SSR</span><strong id="ssr_raw">9.36</strong><span id="ssr_rawh">—</span></div>
<div class="ro"><span class="k">振荡器</span><strong id="ssr_osc">−0.265</strong><span id="ssr_osch">—</span></div>
<canvas id="ssrStructChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ssr_struct_v">后 2022 低绝对值</strong><span id="ssr_struct_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会算 SSR** | 3 天 | 市值比/购买力 | 口算 9.37 |
| **L2 会拆 RSI** | 1 周 | 绿/红区 + 净流出案例 | 漂移剥离器实操 |
| **L3 会修偏差** | 2 周 | 振荡器+ETF+储备 | 三版本对照 |
| **L4 会迭代系统** | 1 月+ | 多信号+分位阈 | 连续 2 月无口诀交易 |

# 30 分钟最小实践

**任务**：完成「SSR RSI 三联检」——算、比、判。

1. **8 分钟 · 手算 SSR**：$1.34T ÷ $143B = **9.37**；购买力 = **10.67%**。
2. **7 分钟 · RSI 区间**：§08 仪表盘，起始 SSR=11、15 日跌 14% → RSI≈**12.6**（绿区）。
3. **8 分钟 · 漂移剥离**：§12 工具，90 日 58% 胜率 → 真实超额 **−5.0 pp**，需 **n≈740**。
4. **7 分钟 · 结论**：写三句话——(a) 当前 SSR/RSI 区间 (b) USDT 净流入方向 (c) ETF 流一条观察。**禁止写「RSI=13 必涨」。**

**验证**：SSR 与 §06 默认读数误差 **<0.05**；漂移剥离默认显示 **−5.0 pp**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Glassnode SSR 指南 + Medium 2019 原文摘要 |
| D2 | 手算 | SSR/购买力/RSI 公式 |
| D3 | 批评 | Adler 净流出 + ETF 分流各 3 条 |
| D4 | 工具 | §06–§20 四个交互模型 |
| D5 | 历史 | 对照 2018/2022/2024 SSR 与振荡器 |
| D6 | 流量 | 记录 7 日 USDT 净流入 + ETF 流 |
| D7 | 合成 | 1 页「SSR RSI 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：SSR 定义 + 手算 + 购买力（L1）
**Week 2**：SSR RSI + 绿/红区 + 漂移剥离（L2）
**Week 3**：振荡器 + ETF 修正 + 净流入配证（L3）
**Week 4**：个人双面板 + 季度校准 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **SSR 比率** | BTC 市值÷稳定币市值 | 跨周期不可比 |
| 2 | **购买力** | 1/SSR | 供应≠意愿 |
| 3 | **SSR RSI** | RSI(14) 于 SSR | 趋势市失效 |
| 4 | **绿/红区** | 20–30 / 70–80 | 背景非触发 |
| 5 | **SSR 振荡器** | 相对均线偏离 | 窗口选择 |
| 6 | **USDT 净流入** | 积累 vs 撤离 | 与 SSR 必配 |
| 7 | **ETF 分流** | 旁路需求 | 2024 后关键 |
| 8 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 9 | **交易所储备** | 可交易子集 | 非全供应 |
| 10 | **多信号投票** | ≥3 独立确认 | 禁单指标 |

# 关键问题清单

:::details 链上
- 当前 SSR？SSR RSI？
- 振荡器 osc200d 分位？
- USDT 7/30 日净流入？
:::

:::details 结构
- 绝对 SSR 处于哪个时代？
- ETF 7 日净流入？
- 交易所储备 vs 全供应差多少？
:::

:::details 信号
- 绿区持续多久了？
- 信号胜率是否扣过漂移？
- 样本量是否够？
:::

:::details 决策
- 净流入方向与 SSR 同向吗？
- 是否 ≥3 信号一致？
- 持有期是否匹配周期尺度？
:::

# 下一阶段探索

1. **SSR 交易所储备版**：仅用 CEX 钱包内稳定币作分母——能否提升预测力？
2. **SSR RSI + MVRV 共振**：双背景过滤器 vs 单指标
3. **DeFi 锁仓修正 SSR**：剔除 TVL 中稳定币后的「可交易 SSR」
4. **ETF  Era 阈值重校准**：绿/红区是否需从 20–30 移至 15–25？
5. **跨资产 SSR**：ETH 是否有可比框架，或仅 BTC 有效？

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| SSR 定义与公式 | 指标文档 | Glassnode Docs / Medium 2019 | 【事实】 |
| 稳定币篮子 | 指标文档 | USDT/TUSD/USDC/USDP/GUSD/DAI 等 | 【事实】 |
| SSR RSI 绿/红区 | 社区图表 | CryptoQuant SKY CEO LEE 2022 | 【待验证】 |
| SSR RSI≈13 | 媒体 | KuCoin / Maartunn X 2026 | 【待验证】 |
| SSR=9.36 + 净流出 | 行业分析 | CryptoPotato / Adler 2026-02 | 【待验证】 |
| USDT 峰值 $187.2B | 行业分析 | Adler 2026-02 | 【待验证】 |
| 跨周期 SSR 均值 | 行业分析 | Axel Adler Jr. | 【分析】 |
| osc90d 58% 胜率 | 回测摘要 | Axel Adler Jr. | 【待验证】 |
| 2024 顶 osc200d +0.597 | 行业分析 | Axel Adler Jr. 2024-03 | 【待验证】 |
| ETF 分流批评 | 行业分析 | Axel Adler Jr. / Glassnode | 【分析】 |
| RSI 加密失效 | 学术研究 | PMC 2023 / Quant Signals | 【分析】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；SSR、SSR RSI 及任何链上阈值均**不保证**未来价格路径。低 SSR 可能反映资本撤离而非积累；绿区信号在 90 日持有期可能**跑输**随机持币基准。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
