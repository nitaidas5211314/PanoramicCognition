---
slug: BTC-ahr999 定投指标
title: BTC-ahr999 定投指标
subtitle: 用<strong>（现价÷GMA200）×（现价÷幂律估值）</strong>合成一条定投择时线——底阈 0.45 仍有用，顶阈 1.2 在 Cycle 4 已<strong>结构性失效</strong>
brand_sub: Bitcoin × DCA × Valuation Heuristic
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, ahr999, 定投, 九神, 囤比特币]
theme_js_file: BTC-ahr999 定投指标.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**ahr999 =（现价 ÷ 200 日几何定投成本）×（现价 ÷ 指数增长估值）。** 九神（ahr999）在《囤比特币》中把两个「低估比值」相乘，合成一条便于定投决策的曲线【事实】。指数增长估值 = **10^(5.84×log₁₀(币龄)−17.01)**，币龄自 2009-01-03 起算【事实】。

经验阈值：**<0.45** 抄底区（历史约 **8.5%** 时间）、**0.45–1.2** 定投区（**46.3%**）、**>1.2** 谨慎区【分析】。2026-09-09 读数 **0.503**【待验证】——仍在定投区。但 Cycle 4 牛顶 ATH（$124,824）时 ahr999 仅 **1.16**，**从未触发「暂停定投」**【待验证】——**底信号尚可，顶信号已死**。

# 这个领域到底是什么

## 一句话定位

「BTC-ahr999」研究的是：**用价格相对 200 日几何成本与幂律增长曲线的双重偏离，指导比特币定投节奏的经验框架及其在成熟周期的失效边界**。它是中文囤币圈最流行的「一张图定策略」指标之一，核心思想是「同时低于成本线且低于长期增长线 = 极佳买点」。

:::note red 先划清边界
本手册**不提供**「ahr999 到 X 就买卖」的信号。ahr999 是**纯价格启发式**——看不见 ETF 流、链上 cohort、衍生品仓位。把它当**周期仪表盘**，不当单点触发器。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | ahr999 公式、GMA200、幂律估值、阈值漂移、与 S2F/PL 的关系 |
| 2 | 边界在哪 | 不含链上、不含宏观；不预测监管；不替代仓位管理 |
| 3 | 核心对象 | 现货价、GMA200、指数增长估值、ahr999 比值、区间阈值 |
| 4 | 参与者 | 九神、囤币社区、TradingView 脚本作者、CoinGlass、开源数据集维护者 |
| 5 | 关键变量 | Price、GMA200、coin_age、ExpGrowth、ahr999 |
| 6 | 可观察的 | 交易所日收盘价、公开仪表盘、Binance klines |
| 7 | 不可观察但可推断 | 各平台用 SMA 还是 GMA、参数是否每月重拟合 |
| 8 | 谁影响谁 | 价格↓→ahr↓→抄底叙事→买盘→价格↑ |
| 9 | 因果 | 公式是代数恒等式 = 【事实】；低 ahr→后续涨 = 【推论】 |
| 10 | 只是相关 | ahr999 与价格平方相关——高位必然读数高 |
| 11 | 表层现象 | 「0.45 抄底、1.2 停投」口诀 |
| 12 | 底层机制 | 成本锚 + 幂律增长锚的双因子低估检测 |
| 13 | 反馈 | 社区传播阈值→集体定投→抬升 GMA200→压低 ahr |
| 14 | 时间延迟 | GMA200 滞后约 200 日；幂律估值仅随币龄单调升 |
| 15 | 正负反馈 | 正：恐慌→ahr 极低→抄底潮；负：牛市→ahr 长期 >1.2 但价格仍涨 |

## 公式拆解

| 分量 | 公式 | 2026-09-17 量级【待验证】 |
|---|---|---|
| **币龄** | 距 2009-01-03 天数 | **6466 天** |
| **指数增长估值** | 10^(5.84·log₁₀(币龄)−17.01) | **$175,434** |
| **GMA200** | (∏P_i)^(1/200)，i=过去 200 日 | **~$69,953** |
| **比值 1** | Price ÷ GMA200 | **1.119** |
| **比值 2** | Price ÷ ExpGrowth | **0.446** |
| **ahr999** | 比值 1 × 比值 2 | **0.500** |

:::note amber GMA vs SMA
九神原文用**几何平均**（GMA200）；部分平台（含 ahr999.aix4u.com 表格列名）显示 SMA200【待验证】。GMA 对极端低价日更敏感，与 SMA 可差 **1–3%**，进而使 ahr999 偏移 **2–6%**【推论】。
:::

# 为什么值得研究

## 理由一：中文囤币圈的「共同语言」

《囤比特币》与 ahr999 是中文 BTC 社区传播最广的估值框架之一【事实】。不懂它，就无法阅读大量中文研报、微博与社群讨论。

## 理由二：2024–2026 是阈值 falsify 的 live test

Cycle 4 牛熊振幅从早期 **~22×** 压缩到 **~2×**【分析】——ahr999 几乎全程落在 0.45–1.2「定投区」，**顶信号在 ATH 从未触发**【待验证】。这是检验「固定阈值能否穿越周期」的绝佳窗口。

## 理由三：学会「底有效、顶无效」的不对称

| 信号 | Cycle 1–3 | Cycle 4【待验证】 | 结论 |
|---|---|---|---|
| **底 <0.45** | 均触发 | 触发（最低 ~0.40） | 仍可参考 |
| **顶 >1.2 停投** | 牛顶远超 1.2 | ATH 仅 1.16 | **已失效** |

## 理由四：对照基准剥离「定投永远对」

BTC 年化漂移 μ≈**50%**、σ≈**65%** 时，随机持币 **90 日**基准胜率 **67.7%**——「ahr999 在定投区买入」表面正确，很大一部分是**漂移本身**【推论】。任何信号都要减基准（见 §12 漂移剥离器）。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从创世区块，到定投按钮

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-ahr999 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「硬数据」，越靠下越「阈值/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 价格数据层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">日收盘价 · Binance/Coinbase 等</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：交易所溢价、稳定币对偏差</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 成本锚层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">GMA200 · 200 日几何定投成本</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">滞后 ~200 日 · 牛市中常 < 现价</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 增长锚层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">幂律估值 · 5.84/−17.01 固定参数</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">失效：九神「每月重拟合」未被主流实现</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 合成指数层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">ahr999 = (P/GMA)×(P/Exp) · 与 P² 相关</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">两因子同时低估才极低</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 阈值层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">0.45 / 1.2 / 5 · 2019 历史分布校准</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：Cycle 4 顶未触 1.2</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 传播层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">《囤比特币》· 微博 · TradingView</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">只展示 2017 底，隐藏 2024 顶失效</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 执行层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">定投金额调节 · 抄底加码</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">与交易所 DCA 机器人对接</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 对照层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">MVRV · NVT · ETF 流 · 分位数</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">单指标 blind spot 互补</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">底阈当「加深定投」而非「梭哈」</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">顶阈当「减速」而非「清仓」</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">ahr999 概念 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 双锚低估</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 幂律增长</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 定投纪律</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 周期振幅衰减</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• GMA200 成本锚</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• log-log 币龄拟合</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 两比值相乘</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 固定阈值分区</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 读 CoinGlass/开源集</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• <0.45 加码定投</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 配 MVRV 分位</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#ahA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#ahA)"/>
  <defs><marker id="ahA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 ahr999 的关系 |
|---|---|---|
| **九神（ahr999）** | 《囤比特币》作者 | 原创公式与阈值；提出每月重拟合【分析】 |
| **囤币社区** | 长期持有叙事 | 传播 0.45/1.2 口诀 |
| **TradingView 作者** | Pine Script 实现 | discountry 等开源脚本【事实】 |
| **RuochenLyu** | ahr999-dataset | 可复现日频数据集【事实】 |
| **CoinGlass 等** | 聚合仪表盘 | 参数未公开，反向推断≈原版【待验证】 |
| **批评者（Coinlive/btcoak）** | 周期振幅分析 | 顶信号失效、阈值老化【分析】 |
| **ETF 发行商** | 机械买盘 | 抬高 GMA200、压缩 ahr 波动【推论】 |

# 核心变量

| 变量 | 定义 | 敏感度 |
|---|---|---|
| **Price** | 日收盘价 | ahr ∝ P² |
| **GMA200** | 200 日几何均价 | 滞后 200 日；牛市中压低 ahr |
| **coin_age** | 创世至今日数 | 每日 +1，缓慢抬升 ExpGrowth |
| **ExpGrowth** | 幂律拟合价 | 固定参数；不随市场变 |
| **ahr999** | 两比值之积 | 综合读数 |
| **quantile5y** | 5 年滚动分位 | 替代固定阈值的现代读法【分析】 |

:::raw
<div class="tool">
<h3>工具 · AHR999 公式计算器</h3>
<p>手算 <strong>ahr999 = (P/GMA200) × (P/ExpGrowth)</strong>。默认 2026-09 参数。</p>
<div class="ctrl"><label>现价 ($)<input type="range" id="ahr_price" min="20000" max="150000" step="100" value="78306"><output id="ahr_priceO">$78,306</output></label></div>
<div class="ctrl"><label>GMA200 ($)<input type="range" id="ahr_gma" min="30000" max="100000" step="50" value="69953"><output id="ahr_gmaO">$69,953</output></label></div>
<div class="ctrl"><label>币龄（天）<input type="range" id="ahr_age" min="3000" max="7000" step="1" value="6466"><output id="ahr_ageO">6466 天</output></label></div>
<div class="readout">
<div class="ro"><span class="k">比值 1</span><strong id="ahr_r1">1.119</strong><span id="ahr_r1h">—</span></div>
<div class="ro"><span class="k">比值 2</span><strong id="ahr_r2">0.446</strong><span id="ahr_r2h">—</span></div>
<div class="ro"><span class="k">幂律估值</span><strong id="ahr_fit">$175,434</strong><span id="ahr_fith">—</span></div>
<div class="ro"><span class="k">ahr999</span><strong id="ahr_val">0.500</strong><span id="ahr_valh">—</span></div>
<canvas id="ahrChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ahr_v">定投区</strong><span id="ahr_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">ahr999 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="90" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货买卖压力</text>
  <rect x="200" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="260" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 价格 P</text>
  <rect x="370" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="430" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">P/GMA200</text>
  <rect x="540" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="600" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">ahr999</text>
  <rect x="200" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="270" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">200 日收盘价</text>
  <text x="270" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">滚动窗口</text>
  <rect x="400" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="470" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">GMA200</text>
  <rect x="200" y="250" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="270" y="270" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">定投/抄底行为</text>
  <text x="270" y="286" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ahr&lt;0.45 触发</text>
  <rect x="400" y="250" width="140" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="470" y="270" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">币龄 → ExpGrowth</text>
  <text x="470" y="286" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">慢变量，日 +1</text>
  <path d="M150 72 L200 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#ahB)"/>
  <path d="M320 72 L370 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#ahB)"/>
  <path d="M490 72 L540 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#ahB)"/>
  <path d="M260 94 L270 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#ahB)"/>
  <path d="M340 172 L400 172" stroke="#454c56" stroke-width="1.5" marker-end="url(#ahB)"/>
  <path d="M470 150 L470 94 L430 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#ahB)"/>
  <path d="M600 94 L600 250 L340 250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#ahC)"/>
  <path d="M270 250 L260 94" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#ahC)"/>
  <defs>
    <marker id="ahB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="ahC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：ahr999 分子含 **P²**——它是价格的二次函数，不是独立外生信号。红色反馈：低 ahr → 社区抄底 → 买盘推高 P → ahr 回升。

# 隐藏关系

## 隐藏关系一：ahr999 ≈ (P/GMA)² × (GMA/Exp)

因 ahr = (P/GMA)×(P/Exp)，当 GMA 接近 Exp 时（早期周期），两因子相关；成熟期 GMA << Exp 时，**第二因子 (P/Exp) 主导低位读数**【推论】。

## 隐藏关系二：与 Power Law 的同构

| 结构 | ahr999 领域 | 其他领域 |
|---|---|---|
| **log-log 币龄拟合** | ExpGrowth = 10^(a·log(age)+b) | PlanB S2F、Giovanni Power Law |
| **双因子低估** | P/GMA × P/Exp | P/B × P/PEG（股票） |
| **固定阈值老化** | 0.45/1.2 | MVRV 3.5、S2F 偏离度 |
| **振幅压缩** | Cycle 4 顶 1.16 | VIX 长期下行 |

:::raw
<div class="tool">
<h3>工具 · 区间判定仪表盘</h3>
<p>拖动 ahr999 读数，对照<strong>九神 2019 历史时间占比</strong>与三区阈值。</p>
<div class="ctrl"><label>ahr999<input type="range" id="ahr_z_val" min="0.1" max="8" step="0.01" value="0.50"><output id="ahr_z_valO">0.50</output></label></div>
<div class="readout">
<div class="ro"><span class="k">5 年分位近似</span><strong id="ahr_z_pct">27.4%</strong><span id="ahr_z_pcth">—</span></div>
<div class="ro"><span class="k">历史区间</span><strong id="ahr_z_hist">定投区</strong><span id="ahr_z_histh">—</span></div>
<canvas id="ahrZoneChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ahr_z_v">可定投</strong><span id="ahr_z_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系三：「每月重拟合」从未落地

九神提出参数应每月重拟合【分析】，但 GitHub、TradingView、ahr999.aix4u.com 均用固定 **5.84 / −17.01**【待验证】——**理论框架与工程实现脱节**。

# 系统运行机制

## 四阶段循环（ahr999 视角）

1. **深熊**：P 远低于 GMA 与 Exp → ahr **<0.45** → 社区「抄底」叙事
2. **复苏**：P 回升穿越 GMA → ahr 升至 0.45–1.2 → 「正常定投」
3. **牛市**：P 快速拉升 → ahr 逼近 1.2 → 老框架喊「停投」（Cycle 4 未触发）
4. **成熟化**：振幅压缩 → ahr 全程挤在窄带 → 阈值失去区分力

:::note amber 价格翻倍 → ahr 约翻四倍
因 ahr ∝ P²（GMA/Exp 短期近似常数），**P×2 → ahr×4**。现价 $78K、ahr≈0.50；若涨至 $156K 且 GMA 滞后，ahr 可逼近 **2.0**【推论】。
:::

# 时间演化

## 周期振幅衰减：ahr999 顶逐轮下移

| 周期 | 熊底 ahr【待验证】 | 牛顶 ahr【待验证】 | 振幅 |
|---|---|---|---|
| Cycle 1 | ~0.30 | ~12+ | **~22×** |
| Cycle 2 | ~0.35 | ~6.5 | **~11×** |
| Cycle 3 | ~0.42 | ~2.7 | **~6×** |
| Cycle 4 | ~0.40 | **~1.16** | **~2×** |

**1.2 顶阈在 Cycle 4 ATH 从未触发**【待验证】——2021 顶 ahr 曾达 **9.25**（4 月）与 **3.80**（11 月）【待验证】，「>1.2 停投」若严格执行会错过大半牛市。

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">ahr999 周期演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#0f8a4d"/><text x="80" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2015</text><text x="80" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ahr~0.3</text>
  <circle cx="180" cy="100" r="6" fill="#0f8a4d"/><text x="180" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2018</text><text x="180" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ahr~0.4</text>
  <circle cx="300" cy="100" r="6" fill="#d5342c"/><text x="300" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021</text><text x="300" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ahr~9.3</text>
  <circle cx="420" cy="100" r="6" fill="#0f8a4d"/><text x="420" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022</text><text x="420" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ahr~0.4</text>
  <circle cx="520" cy="100" r="6" fill="#b8730a"/><text x="520" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024 ATH</text><text x="520" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ahr~1.16</text>
  <circle cx="600" cy="100" r="6" fill="#1d4ed8"/><text x="600" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026</text><text x="600" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ahr~0.50</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">顶递减 · 底持稳 · 固定阈值需分位替代</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 ahr999 的影响 |
|---|---|---|
| **九神/囤币 KOL** | 影响力与书籍销售 | 强化「简单阈值」叙事 |
| **交易所** | 交易量 | 抄底区鼓励加仓交易 |
| **数据平台** | 流量 | 聚合展示，参数不透明 |
| **长期定投者** | 纪律与心理安慰 | 低 ahr 时坚持买入 |
| **批评者** | 差异化观点 | 揭露顶信号失效 |

# 资源与信息流

## 资金流与「定投抽水」

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">ahr999 区间 → 定投流量（资金流抽水图）</text>
  <rect x="40" y="50" width="600" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">散户可部署法币 · 月薪/积蓄</text>
  <rect x="40" y="120" width="180" height="36" rx="6" fill="#e8f5ee" stroke="#0f8a4d" stroke-width="1.2"/>
  <text x="130" y="143" font-size="11" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">ahr&lt;0.45 · 加码 2–3×</text>
  <rect x="250" y="120" width="180" height="36" rx="6" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.2"/>
  <text x="340" y="143" font-size="11" text-anchor="middle" fill="#1d4ed8" font-family="sans-serif">0.45–1.2 · 常规定投</text>
  <rect x="460" y="120" width="180" height="36" rx="6" fill="#fff7e6" stroke="#b8730a" stroke-width="1.2"/>
  <text x="550" y="143" font-size="11" text-anchor="middle" fill="#b8730a" font-family="sans-serif">&gt;1.2 · 减速（Cycle4失效）</text>
  <path d="M130 156 L130 200 L340 200 L340 230" stroke="#0f8a4d" stroke-width="1.5" fill="none" marker-end="url(#ahD)"/>
  <path d="M340 156 L340 200" stroke="#1d4ed8" stroke-width="1.5" fill="none"/>
  <path d="M550 156 L550 200 L340 200" stroke="#b8730a" stroke-width="1.5" fill="none" marker-end="url(#ahE)"/>
  <rect x="240" y="230" width="200" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="340" y="255" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货/ETF 买盘池</text>
  <defs>
    <marker id="ahD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
    <marker id="ahE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#b8730a"/></marker>
  </defs>
</svg>
:::

**信息流路径**：Binance klines → 开源脚本/数据集 → CoinGlass/TradingView → 中文社群 → 定投行为。**瓶颈**：GMA vs SMA、参数固定 vs 重拟合——同指标不同源可差 **5%+**【推论】。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「ahr999 在定投区买入胜率 75%」？先和<strong>随机持币基准</strong>比。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="ahr_T" min="5" max="365" step="5" value="90"><output id="ahr_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="ahr_ps" min="50" max="90" step="0.1" value="75.0"><output id="ahr_psO">75.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="ahr_mu" min="0" max="100" step="1" value="50"><output id="ahr_muO">50%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="ahr_sg" min="30" max="100" step="1" value="65"><output id="ahr_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="ahr_base">67.7%</strong><span id="ahr_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="ahr_dp">+7.3 pp</strong><span id="ahr_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="ahr_n">382</strong><span id="ahr_nh">—</span></div>
<canvas id="ahrDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ahr_v3">超额有限</strong><span id="ahr_v3h">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **底阈仍可用、顶阈当减速** | <0.45 加码；>1.2 勿当清仓信号 |
| 2 | **用 5 年分位替代绝对值** | quantile5y ~27% 比裸读 0.50 更有信息量 |
| 3 | **确认 GMA 而非 SMA** | 实现差异可偏移 2–6% |
| 4 | **配 MVRV/NVT** | 补「纯价格」盲区 |
| 5 | **漂移剥离胜率** | 任何「定投区有效」先减基准 |
| 6 | **跟踪振幅压缩** | Cycle 5 可能全程 0.4–1.0 |
| 7 | **自建可复现数据集** | ahr999-dataset 思路 |
| 8 | **写阈值衰减日志** | 每周期记录实际顶/底 ahr |
| 9 | **定投金额分档** | 0.45 以下 2×、以上 1×，而非全有/全无 |
| 10 | **30 分钟三联检** | 算、比、判——§22 |

# 常见认知陷阱

:::details 1. 「ahr999>1.2 就该卖」
**错因**：2021 年 1–2 月 ahr 已 >1.2，但 4 月顶 $64K、11 月顶 $69K【待验证】。**对策**：>1.2 当「减速定投」，不当卖出触发器。
:::

:::details 2. 「ahr999 在定投区 = 低估」
**错因**：Cycle 4 **绝大多数日子**都在 0.45–1.2——这是「相对低位」不是「绝对便宜」【分析】。**对策**：看分位数 + 链上指标。
:::

:::details 3. 「0.45 抄底 = 立刻 V 反」
**错因**：2022 年 ahr ~0.4 持续数月，价仍横盘【待验证】。**对策**：<0.45 是区间，加大定投频率而非梭哈。
:::

:::details 4. 忽视 ahr ∝ P²
**错因**：指标与价格机械相关，非独立信号。**对策**：理解公式，不迷信「魔法数字」。
:::

:::details 5. 把 SMA 当 GMA
**错因**：平台实现不一。**对策**：自己算或认准数据源。
:::

:::details 6. 相信「每月重拟合」已实现
**错因**：全网固定 5.84/−17.01【待验证】。**对策**：若要重拟合，自己跑回归。
:::

:::details 7. 单指标 All-in
**错因**：纯价格、无链上、无流。**对策**：≥3 独立信号。
:::

:::details 8. 忽视 ETF 结构变迁
**错因**：机械买盘抬 GMA、压低波动【推论】。**对策**：对比 Pre/Post ETF 分位。
:::

:::details 9. 把二手阈值当【事实】
**错因**：0.45/1.2 来自 2019 样本【分析】。**对策**：标【待验证】，滚动校准。
:::

:::details 10. 胜率不算漂移
**错因**：90 日随机持币基准 **67.7%**。**对策**：§12 漂移剥离器。
:::

:::details 11. 用 ahr999 做日内
**错因**：GMA200 日频工具。**对策**：日线收盘后读一次即可。
:::

:::details 12. 「九神指标永远适用」
**错因**：Cycle 4 顶信号已 falsify【分析】。**对策**：底看 ahr，顶看别的（MVRV Z、资金流）。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 成本锚 | 过去 200 日买家均价 | GMA200 |
| 增长锚 | 比特币成熟度曲线 | ExpGrowth(币龄) |
| 低估 | 两锚同时下方 | ahr999 < 0.45 |
| 过热 | 远高于两锚 | ahr999 > 1.2（已弱化） |
| 振幅压缩 | ETF 时代波动收窄 | Cycle 4 顶仅 1.16 |

# 从理论到行动

## 决策漏斗

1. **读数**：今日 ahr999 + 5 年分位
2. **对照**：MVRV Z、ETF 净流入
3. **分档**：<0.45 加码 / 0.45–1.2 常规定投 / >1.2 维持最小定投
4. **记录**：每周截图存档，跟踪阈值漂移
5. **复盘**：每季度检验「信号−基准」超额

# 技能树

:::details Lv.1 观察者（0–2 周）
- 手算一次 ahr999（§07 工具）
- 读懂三区阈值与历史占比
- 区分 GMA 与 SMA
:::

:::details Lv.2 分析者（2–6 周）
- 拉 5 年 ahr999 序列，标顶底
- 对比 CoinGlass vs 开源集差异
- 跑漂移剥离器
:::

:::details Lv.3 构建者（6–12 周）
- 自建日频计算脚本
- 写分位替代固定阈的回测
- 与 MVRV 联合信号
:::

:::details Lv.4 系统者（12 周+）
- 动态阈值（滚动分位）
- 多数据源交叉验证
- 定投金额自适应规则
:::

# 游戏化世界

**角色**：囤币指挥官。**经验值**：每正确识别一个区间 +10 XP。**Boss**：「阈值老化」——Cycle 5 全程定投区。**装备**：公式计算器、漂移剥离器、分位仪表盘。**成就**：「四次抄底见证者」（亲历四个 <0.45 区间）。

# 任务系统

| 任务 | 难度 | 奖励 |
|---|---|---|
| 手算今日 ahr999 | ★ | 理解公式 |
| 找出 GMA vs SMA 差异 | ★★ | 数据源意识 |
| 标注 Cycle 4 顶为何 <1.2 | ★★★ | 阈值批判 |
| 写 90 日漂移剥离报告 | ★★★ | 统计纪律 |
| 搭建可复现数据集 | ★★★★ | 工程能力 |

# 反事实模拟

:::tabs
@@场景 A：严格「>1.2 停投」
2021-01 ahr 突破 1.2 时价约 **$35K**【待验证】。停投会错过 4 月 **$64K** 与 11 月 **$69K** 两段涨幅——**真实 dated 假信号**【分析】。

@@场景 B：仅 <0.45 加码
四轮熊市底均触发 <0.45（含 Cycle 4 的 **~0.40**）【待验证】。若仅在抄底区 2× 定投、其余 1×，心理可承受且历史有效【推论】。

@@场景 C：Cycle 5 全程 0.5–0.9
若振幅继续压缩，固定阈值将**永久绿灯**——此时只有**分位数 + 链上**仍有区分力【假设】。
:::

:::raw
<div class="tool">
<h3>工具 · 周期振幅压缩器</h3>
<p>拖动 Cycle 4 熊底/牛顶 ahr，观察<strong>振幅收窄</strong>如何使 0.45/1.2 失效。</p>
<div class="ctrl"><label>熊底 ahr<input type="range" id="ahr_amp_bot" min="0.2" max="0.6" step="0.01" value="0.40"><output id="ahr_amp_botO">0.40</output></label></div>
<div class="ctrl"><label>牛顶 ahr<input type="range" id="ahr_amp_top" min="0.8" max="3" step="0.01" value="1.16"><output id="ahr_amp_topO">1.16</output></label></div>
<div class="readout">
<div class="ro"><span class="k">振幅</span><strong id="ahr_amp_ratio">2.9×</strong><span id="ahr_amp_ratioh">—</span></div>
<div class="ro"><span class="k">熊底</span><strong id="ahr_amp_ahrbot">0.40</strong><span>—</span></div>
<div class="ro"><span class="k">牛顶</span><strong id="ahr_amp_ahrtop">1.16</strong><span>—</span></div>
<canvas id="ahrAmpChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ahr_amp_v">阈值几乎无法区分牛熊</strong><span id="ahr_amp_vh">—</span></div>
</div>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 检验标准 |
|---|---|---|
| **L1** | 读懂公式与三区 | 能口述 ahr999 定义 |
| **L2** | 识别阈值老化 | 能解释 Cycle 4 顶失效 |
| **L3** | 漂移剥离 + 分位 | 能算真实超额与 5y 分位 |
| **L4** | 自建系统 | 有可复现日频管道 + 多信号 |

# 30 分钟最小实践

**今天就能做，成本 ≈ 0，产出可验证。**

1. **5 分钟 · 手算**：用 §07 工具，输入今日价（CoinGecko）、币龄 **6466**、估 GMA200 **$69,953** → 应得 ahr ≈ **0.50**
2. **10 分钟 · 对照**：打开 [ahr999.aix4u.com](https://ahr999.aix4u.com/)，比对你的读数与平台差多少
3. **10 分钟 · 漂移剥离**：§12 工具，设 90 日、信号胜率 75%、μ=50%、σ=65% → 基准 **67.7%**，超额 **+7.3 pp**
4. **5 分钟 · 写一句结论**：「底阈尚可，顶阈已死；我采用 <0.45 加码、>1.2 不减仓」

**验证**：笔记本留下四行数字 + 一句结论 + 截图日期。

# 7 天计划

| 天 | 主题 | 行动 |
|---|---|---|
| D1 | 公式 | 手算 + 对照开源集 |
| D2 | 历史 | 标 2015/2018/2021/2022 底 ahr |
| D3 | 顶失效 | 读 Cycle 4 ATH 案例 |
| D4 | GMA vs SMA | 同一日两种实现对比 |
| D5 | 漂移剥离 | 写 30/90/180 日超额表 |
| D6 | 多信号 | 同屏 ahr999 + MVRV |
| D7 | 规则 | 写下你的三分档定投表 |

# 30 天能力构建计划

| 周 | 目标 | 交付物 |
|---|---|---|
| W1 | 公式 + 历史 | ahr 顶底标注图 |
| W2 | 批评 + 分位 | 「顶失效」一页备忘 |
| W3 | 工程 | 本地日频计算脚本 |
| W4 | 系统 | 定投分档 + 复盘模板 |

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | **ahr999 公式** | (P/GMA)×(P/Exp) |
| 2 | **幂律估值** | 10^(5.84·log(age)−17.01) |
| 3 | **GMA200** | 几何均值成本锚 |
| 4 | **三区阈值** | 0.45 / 1.2 / 5 |
| 5 | **历史时间占比** | 8.5% / 46.3% / 29.3% |
| 6 | **振幅压缩** | 顶从 12→1.16 |
| 7 | **P² 相关性** | 非独立信号 |
| 8 | **漂移基准** | p_base = Φ(μ√T/σ) |
| 9 | **5 年分位** | 替代固定阈 |
| 10 | **底有效顶无效** | 不对称使用 |

# 关键问题清单

:::details 公式与实现
- 你用的数据源是 GMA 还是 SMA？
- 参数 5.84/−17.01 最后一次重拟合是什么时候？
- 币龄起算日是 2009-01-03 还是 2010-07-17？
:::

:::details 阈值与周期
- 你的投资周期内，顶阈 1.2 是否曾正确预警？
- Cycle 5 若全程 0.4–1.0，你的规则会怎样？
- 5 年分位 27% 对你意味着什么？
:::

:::details 决策与风控
- <0.45 你加码多少倍？有上限吗？
- >1.2 你减仓还是仅减速定投？
- 单指标最大仓位占比是多少？
:::

# 下一阶段探索

- **动态阈值**：滚动 5 年分位替代 0.45/1.2
- **与 MVRV 联合**：ahr 低 + MVRV<1 双重确认
- **ETF 时代校准**：Pre/Post 2024-01 子样本
- **参数重拟合**：每月 OLS log(price)~log(age)
- **实盘日志**：连续 12 个月记录「信号 vs 基准」

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| ahr999 公式 | 原创著作 | 九神《囤比特币》/ ahr999.com | 【事实】 |
| 历史时间占比 8.5/46.3/29.3% | 作者统计 | 九神 2019 文章 | 【分析】 |
| 2026-09-09 读数 0.503 | 开源数据集 | ahr999.aix4u.com | 【待验证】 |
| Cycle 4 ATH ahr~1.16 | 二手分析 | Coinlive 2025 | 【待验证】 |
| GMA200 实现差异 | 工程对比 | TradingView / GitHub | 【推论】 |
| 漂移基准公式 | 统计推导 | 本手册 §12 工具 | 【事实】 |

# 免责声明 {.appendix}

本手册仅供学习与研究，**不构成任何投资建议**。比特币价格波动极大，过往 ahr999 区间分布不代表未来。作者不对依据本手册做出的任何投资决策承担责任。请根据自身风险承受能力独立判断，必要时咨询持牌专业人士。定投并不能保证盈利，「抄底区」可能持续数月且价格仍下跌。
