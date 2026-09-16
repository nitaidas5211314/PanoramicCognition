---
slug: BTC-价格影响的“平方根定律”（Square Root Law）
title: BTC-价格影响的"平方根定律"（Square Root Law）
subtitle: 大单冲击 <strong>I ∝ √(Q/V)</strong> 是微观结构最硬的经验律——BTC 2014 曾完美符合，2025 机构化后指数可能<strong>从 0.5 漂到 ~0.1</strong>
brand_sub: Bitcoin × Market Microstructure × Execution
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, 平方根定律, 市场冲击, 订单簿, 执行算法]
theme_js_file: BTC-价格影响的“平方根定律”（Square Root Law）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**平方根定律（Square Root Law, SRL）**：执行规模为 **Q** 的 metaorder 时，平均价格冲击 **I(Q) ∝ (Q/V)^δ**，经验上 **δ ≈ 0.5**【事实】——即冲击随订单量**次线性**增长：量翻 4 倍，冲击只翻 2 倍。

Donier & Bonart (2014) 在 MtGox 百万级 metaorder 上确认 **δ=0.50±0.02**【事实】；东京证交所 2024 全样本 **δ=0.500±0.002**【事实】。但 2025 年 Binance 重建 metaorder 测得 **δ≈0.1**【待验证】——**定律是否仍适用于 ETF 时代的 BTC，正在 live test**。

# 这个领域到底是什么

## 一句话定位

「BTC-平方根定律」研究的是：**大单如何通过消耗订单簿流动性推动价格，以及冲击与订单规模之间的幂律关系**。它是执行算法（TWAP/VWAP/POV）、做市商报价、监管评估「市场深度」的共同语言——不是预测 BTC 涨跌，而是**量化「买/卖这么多会贵多少」**。

:::note red 先划清边界
本手册**不提供**「冲击 0.3% 就反向」的交易信号。SRL 描述**平均**冲击；同一 Q 在不同时间、不同交易所、不同信息流下可差 **一个数量级**。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | I(Q) 幂律指数 δ、归一化 I/σ∝(Q/V)^δ、执行成本、冲击衰减 |
| 2 | 边界在哪 | 不含链上估值；不预测宏观；不替代合规披露 |
| 3 | 核心对象 | metaorder、参与率 φ=Q/V、临时/永久冲击、订单簿深度 |
| 4 | 参与者 | 机构执行台、做市商、HFT 套利、交易所、监管、研究者 |
| 5 | 关键变量 | Q、V、σ、δ、Y（冲击常数）、η（参与率）、λ（线性斜率） |
| 6 | 可观察的 | 逐笔成交、L2 深度、执行日志、公开 metaorder 重建 |
| 7 | 不可观察但可推断 | 真实 trader ID、隐藏 iceberg、OTC 暗池流量 |
| 8 | 谁影响谁 | 大单→吃深度→价移→套利补单→部分反弹 |
| 9 | 因果 | 主动吃单→流动性消耗 = 【事实】；δ=0.5 机制 = 【推论】 |
| 10 | 只是相关 | 冲击与波动率共变——高 σ 日冲击名义更大 |
| 11 | 表层现象 | 「冲击=常数×√(Q)」口诀、执行台 cost estimate |
| 12 | 底层机制 | latent liquidity 恢复、做市商库存风险、无套利约束 |
| 13 | 反馈 | 冲击大→拆单→隐藏意图→对手更难预测 |
| 14 | 时间延迟 | 临时冲击秒–分钟衰减；永久冲击可持数日 |
| 15 | 正负反馈 | 正：冲击→波动→宽 spread→更大冲击；负：套利补深度 |

## 标准公式

| 形式 | 表达式 | 含义 |
|---|---|---|
| **原始** | I(Q) = Y · σ · (Q/V)^δ | 无量纲冲击；Y≈0.9（Donier BTC）【待验证】 |
| **线性区** | I(Q) ≈ λ · Q/V | φ < 0.1% 日量时【分析】 |
| **Almgren-Chriss** | g(v) ∝ v^β，β≈0.6 | 临时冲击按**速率**计【事实】 |
| **永久** | Δp_perm ∝ Q/V | 线性永久冲击才无 stat arb【分析】 |

# 为什么值得研究

## 理由一：执行成本是 BTC 机构的「隐形税」

现货 ETF（2024-01 美国）与永续套利把 BTC 日成交量抬到 **~5 万 BTC/日** 量级【待验证】。一笔 **500 BTC** 市价单在 δ=0.5、σ=3%/日 下冲击约 **0.270%**——按 **$95,000/BTC** 计约 **$257/BTC × 500 ≈ $12.9 万**【推论】。不懂 SRL，回测 alpha 会被执行成本吃掉。

## 理由二：BTC 是检验「定律普适性」的天然实验场

Donier (2014) 强调 MtGox **几乎无 stat arb、无做市**——却仍有 δ=0.5【事实】。2025 年高度机构化后 δ 可能骤降到 **~0.1**【待验证】——**同一资产、两种制度，是最好的 falsify 窗口**。

## 理由三：学会「表面胜率 vs 真实超额」

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「低冲击入场 72% 胜率」真实超额 |
|---|---|---|---|
| 20 日 | — | **58.6%** | 表面 +13.4 pp → 真实 **+13.4 pp** |
| 90 日 | — | **67.7%** | 表面 +4.3 pp → 真实 **+4.3 pp** |

**任何「执行优化策略」都要和对照基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从逐笔成交，到执行决策

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 平方根定律 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「微观硬数据」，越靠下越「策略可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 逐笔成交层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">tick · 买卖标志 · 时间戳</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：wash trade、自成交过滤差异</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 订单簿层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">L2 深度 · spread · 斜率</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">Binance/Coinbase 深度可差 2–3×</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ Metaorder 层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">同一意图的切片聚合 · 需 trader ID 或启发式重建</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">2025 无 ground truth → δ 估计有偏【待验证】</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 冲击度量层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">I(Q)/σ vs Q/V · 峰值/轨迹/终值冲击</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">Donier：轨迹全程 √ 律，非仅收盘价</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 幂律指数层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">δ≈0.5 股票/BTC2014 · δ≈0.1 BTC2025【待验证】</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">crossover：η&lt;0.1% 线性 · 中间 √ · 大单边超线性</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 执行算法层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">TWAP/VWAP/POV · 切片 n 与总成本 ∝ √n</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">拆单降低峰值冲击，但总成本未必降</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 套利恢复层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">现货-永续 · 跨所 · 做市商补单</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">机构化↑ → 临时冲击衰减更快【推论】</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「√Q 就够了」简化 · 执行台 vendor 报价</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：把 2014 BTC 系数硬套 2025</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">执行前估冲击 · 选算法 · 对照基准验 alpha</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">SRL 是成本模型，不是方向模型</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">平方根定律 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 次线性缩放</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 统计力学标度</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 探索/利用</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 扩散吸收</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• latent liquidity</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 做市商库存</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 无套利边界</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 信息/噪声分解</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 估 I(Q) 再下单</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 选 TWAP 切片</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 读 L2 斜率</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#srA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#srA)"/>
  <defs><marker id="srA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 SRL 的关系 |
|---|---|---|
| **Donier / Bonart / Mastromatteo** | 2014 BTC 百万 metaorder | 确认 δ=0.50±0.02【事实】 |
| **Sato et al. (2024)** | 东京证交所全样本 | δ=0.500±0.002，「严格普适」【事实】 |
| **Almgren et al. (2005)** | Citigroup 执行数据 | 拒绝纯 √，临时冲击 β≈0.6【事实】 |
| **CFM / LLOB 模型** | 理论 crossover | 小 η 线性、大 η √【分析】 |
| **2025 crypto-market-impact** | Binance 重建 metaorder | δ≈0.1，与 equity 模型不符【待验证】 |
| **做市商 / HFT** | 补深度、套利 | 压低有效 δ【推论】 |
| **ETF 授权参与者** | 大额申购赎回 | 典型 metaorder 来源 |
| **执行算法 vendor** | TWAP/VWAP 报价 | 内置 Y、δ 系数——常过时 |

# 核心变量

| 变量 | 定义 | 2026-09 典型量级【待验证】 |
|---|---|---|
| **Q** | metaorder 规模（BTC） | 10–1000 |
| **V** | 日成交量（BTC） | ~50,000 |
| **σ** | 日波动率 | ~3% |
| **φ=Q/V** | 参与率 | 100 BTC → **0.20%** |
| **δ** | 冲击幂指数 | 0.5（经典）/ 0.1（2025 争议） |
| **Y** | 无量纲常数 | ~0.9（Donier BTC） |
| **η** | 时间参与率 Q/(V·T) | 8h 执行 100 BTC → **0.60%** |
| **λ** | 线性冲击斜率 | 小单区有效 |

:::raw
<div class="tool">
<h3>工具 · 价格冲击计算器</h3>
<p><strong>I = Y · σ · (Q/V)^δ</strong>。默认：V=50,000 BTC/日、σ=3%、δ=0.50、Y=0.90、BTC=$95,000。</p>
<div class="ctrl"><label>订单量 Q (BTC)<input type="range" id="srl_q" min="1" max="2000" step="1" value="100"><output id="srl_qO">100 BTC</output></label></div>
<div class="ctrl"><label>日成交量 V<input type="range" id="srl_v" min="10000" max="100000" step="500" value="50000"><output id="srl_vO">50,000 BTC/日</output></label></div>
<div class="ctrl"><label>日波动 σ (%)<input type="range" id="srl_sig" min="1" max="8" step="0.1" value="3.0"><output id="srl_sigO">3.0%</output></label></div>
<div class="ctrl"><label>幂指数 δ<input type="range" id="srl_del" min="0.05" max="0.8" step="0.01" value="0.50"><output id="srl_delO">0.50</output></label></div>
<div class="ctrl"><label>常数 Y<input type="range" id="srl_y" min="0.3" max="1.5" step="0.01" value="0.90"><output id="srl_yO">0.90</output></label></div>
<div class="ctrl"><label>BTC 价格 ($)<input type="range" id="srl_px" min="50000" max="150000" step="500" value="95000"><output id="srl_pxO">$95,000</output></label></div>
<div class="readout">
<div class="ro"><span class="k">冲击 I</span><strong id="srl_imp">0.121%</strong><span id="srl_imp_usd">$115</span></div>
<div class="ro"><span class="k">参与率 φ</span><strong id="srl_phi">0.200%</strong><span>—</span></div>
<canvas id="srlChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="srl_verdict">典型 metaorder</strong><span id="srl_verdict_h">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">平方根定律 · 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="90" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">Metaorder Q</text>
  <rect x="200" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="260" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">吃 L2 深度</text>
  <rect x="370" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="430" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">临时冲击</text>
  <rect x="540" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="600" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">观测 I(Q)</text>
  <rect x="120" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="190" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">套利/做市补单</text>
  <rect x="400" y="150" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="470" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">永久冲击</text>
  <rect x="260" y="250" width="160" height="44" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="340" y="278" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">执行算法拆单</text>
  <path d="M150 72 L200 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#srB)"/>
  <path d="M320 72 L370 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#srB)"/>
  <path d="M490 72 L540 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#srB)"/>
  <path d="M260 94 L190 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#srB)"/>
  <path d="M430 94 L470 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#srB)"/>
  <path d="M340 250 L430 194" stroke="#454c56" stroke-width="1.5" marker-end="url(#srB)"/>
  <path d="M190 194 L260 94" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#srC)"/>
  <path d="M600 94 L600 250 L420 250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#srD)"/>
  <defs>
    <marker id="srB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="srC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
    <marker id="srD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：Q 驱动吃深度→临时冲击；套利部分**反转**临时冲击（绿色路径），但可能留下永久冲击。红色反馈：观测到大冲击→算法拆单→改变后续 Q 分布——**冲击与执行策略共演化**。

# 隐藏关系

## 隐藏关系一：√ 律是「统计律」不是「单笔律」

Microstructure Lab 强调：单笔 100 lot 不服从 √Q，**一天内执行 10,000 lot 的平均成本**才服从【分析】。把 SRL 用于极小单会系统性高估冲击。

## 隐藏关系二：TWAP 在 √ 世界下「更贵」

若 I(q)∝√q，则 n 片总成本 = n·√(Q/n) = **√n·√Q**——比单笔 √Q 贵 **√n 倍**。默认 Q=200 BTC、n=10：单笔 **0.171%** vs TWAP **0.540%**，比值 **3.16≈√10**【事实】（见工具 2）。

:::raw
<div class="tool">
<h3>工具 · TWAP 切片优化器</h3>
<p>比较<strong>单笔市价</strong> vs <strong>n 片 TWAP</strong> 的总冲击（δ=0.5 下 TWAP 总成本更高是正常现象）。</p>
<div class="ctrl"><label>总量 Q (BTC)<input type="range" id="srl_tw_q" min="10" max="1000" step="5" value="200"><output id="srl_tw_qO">200 BTC</output></label></div>
<div class="ctrl"><label>切片数 n<input type="range" id="srl_tw_n" min="1" max="30" step="1" value="10"><output id="srl_tw_nO">10</output></label></div>
<div class="ctrl"><label>日成交量 V<input type="range" id="srl_tw_v" min="10000" max="100000" step="500" value="50000"><output id="srl_tw_vO">—</output></label></div>
<div class="ctrl"><label>σ (%)<input type="range" id="srl_tw_sig" min="1" max="8" step="0.1" value="3.0"><output id="srl_tw_sigO">—</output></label></div>
<div class="ctrl"><label>δ<input type="range" id="srl_tw_del" min="0.1" max="0.8" step="0.01" value="0.50"><output id="srl_tw_delO">0.50</output></label></div>
<div class="readout">
<div class="ro"><span class="k">单笔冲击</span><strong id="srl_tw_agg">0.171%</strong><span>—</span></div>
<div class="ro"><span class="k">TWAP 总冲击</span><strong id="srl_tw_cost">0.540%</strong><span>—</span></div>
<div class="ro"><span class="k">比值</span><strong id="srl_tw_ratio">3.16×</strong><span id="srl_tw_save">+216% 更贵</span></div>
<canvas id="srlTwapChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="srl_tw_verdict">TWAP 更贵（预期）</strong><span id="srl_tw_verdict_h">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | 平方根定律 | 其他领域 |
|---|---|---|
| **次线性缩放** | I∝Q^0.5 | 代谢率∝M^0.75；扩散√t |
| **大数平均** | 日累计冲击 | 中心极限定理 |
| **探索/利用** | 拆单 vs 速度 | 强化学习 ε-greedy |
| **crossover** | 线性→√ | 雷诺数层流/湍流过渡 |
| **永久 vs 临时** | 信息/噪声分解 | 信号处理 trend/noise |

# 系统运行机制

## 四阶段：从下单到冲击衰减

1. **提交**：算法生成 child orders，隐藏总 Q
2. **消耗**：市价/aggressive limit 逐层吃 book → 临时冲击峰值
3. **恢复**：套利者、做市商补 depth → 临时冲击 **分钟级** 部分反弹
4. **残留**： informed 部分留下永久冲击；uninformed 几乎完全衰减【事实】（Donier 2014）

:::note amber 2025 制度差异
永续-现货套利 + 专业做市 → 阶段 3 加速 → **同样 Q 测得 δ 更小**【推论】。这不是定律「错了」，可能是**测量对象变了**。
:::

:::raw
<div class="tool">
<h3>工具 · 参与率 crossover</h3>
<p>CFM LLOB：**η&lt;0.1%** 近似线性；中间区 **∝η^δ**；极大 η 可能超线性。</p>
<div class="ctrl"><label>参与率 η (%)<input type="range" id="srl_cr_eta" min="0.001" max="2" step="0.001" value="0.200"><output id="srl_cr_etaO">0.200%</output></label></div>
<div class="ctrl"><label>幂指数 δ<input type="range" id="srl_cr_del" min="0.1" max="0.8" step="0.01" value="0.50"><output id="srl_cr_delO">0.50</output></label></div>
<div class="readout">
<div class="ro"><span class="k">线性近似</span><strong id="srl_cr_lin">0.2000%</strong><span>—</span></div>
<div class="ro"><span class="k">幂律 I∝η^δ</span><strong id="srl_cr_sqrt">0.0447%</strong><span>—</span></div>
<div class="ro"><span class="k">区间判定</span><strong id="srl_cr_reg">crossover 区</strong><span>—</span></div>
<canvas id="srlCrossChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="srl_cr_v">crossover 区</strong><span id="srl_cr_vh">—</span></div>
</div>
</div>
:::

# 时间演化

## BTC 冲击指数：从 MtGox 到 Binance

| 阶段 | 时期 | 数据特征 | δ 估计 | 标记 |
|---|---|---|---|---|
| **早期** | 2014 MtGox | 真实 trader ID、无 stat arb | **0.50±0.02** | 【事实】Donier |
| **成熟股票** | 2024 TSE | 全账户 8 年 | **0.500±0.002** | 【事实】Sato |
| **机构 BTC** | 2025 Binance | 启发式 metaorder | **0.10–0.13** OLS | 【待验证】 |
| **争议** | 2025 | MLP 局部斜率 | **0.03–0.04** | 【待验证】 |

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 平方根定律 · 演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="100" cy="100" r="6" fill="#1d4ed8"/><text x="100" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2014</text><text x="100" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">δ=0.50</text>
  <circle cx="220" cy="100" r="6" fill="#b8730a"/><text x="220" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2017</text><text x="220" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">多交易所</text>
  <circle cx="360" cy="100" r="6" fill="#b8730a"/><text x="360" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021</text><text x="360" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">机构化</text>
  <circle cx="480" cy="100" r="6" fill="#0f8a4d"/><text x="480" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024 ETF</text><text x="480" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">AP 大单</text>
  <circle cx="580" cy="100" r="6" fill="#d5342c"/><text x="580" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2025</text><text x="580" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">δ~0.1?</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">测量方法变 + 市场结构变 → 指数漂移，勿混为一谈</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 SRL 叙事的影响 |
|---|---|---|
| **执行算法 vendor** | 卖「省冲击」方案 | 夸大 TWAP 节省，隐瞒 √n 效应 |
| **交易所** | 成交量排名 | 低费率诱大单 → 冲击外部化 |
| **做市商** | 赚 spread+rebate | 压低观测 δ，但赚 inventory 风险 |
| **研究者** | 发「普适律」论文 | 倾向报告 δ=0.5 |
| **2025 批评者** | 证伪旧律 | 强调重建 metaorder 偏差 |
| **AP/ETF** | 隐蔽大额建仓 | 拆单使 Q 难测 → δ 被低估【推论】 |

# 资源与信息流

## 流动性消耗与冲击「抽水」

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">大单执行 · 资金流抽水图</text>
  <rect x="40" y="50" width="600" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">机构意图 · 买入 Q=500 BTC</text>
  <rect x="40" y="120" width="280" height="36" rx="6" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.2"/>
  <text x="180" y="143" font-size="11" text-anchor="middle" fill="#d5342c" font-family="sans-serif">冲击成本 ~0.27% ≈ $12.9 万</text>
  <rect x="360" y="120" width="280" height="36" rx="6" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.2"/>
  <text x="500" y="143" font-size="11" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">名义本金 ~$4,750 万</text>
  <path d="M180 156 L180 200 L340 200 L340 230" stroke="#d5342c" stroke-width="1.5" fill="none" marker-end="url(#srE)"/>
  <path d="M500 156 L500 200 L340 200" stroke="#0f8a4d" stroke-width="1.5" fill="none" marker-end="url(#srF)"/>
  <rect x="240" y="230" width="200" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="340" y="255" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">做市商 / 套利者 · 捕获 spread</text>
  <text x="130" y="195" font-size="10" fill="#d5342c" font-family="sans-serif">买方损失</text>
  <text x="530" y="195" font-size="10" fill="#0f8a4d" font-family="sans-serif">对手方收益</text>
  <defs>
    <marker id="srE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
    <marker id="srF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
  </defs>
</svg>
:::

**信息流**：意图 → 算法切片 → 交易所撮合 → 冲击观测 → 研报/模型校准。**瓶颈**：无 trader ID 时 metaorder 重建误差直接污染 δ【分析】。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「低冲击择时 72% 胜率」？先减<strong>随机持币基准</strong>——BTC μ=50%、σ=65%。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="srl_d_T" min="5" max="180" step="5" value="90"><output id="srl_d_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="srl_d_ps" min="50" max="90" step="0.1" value="72.0"><output id="srl_d_psO">72.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="srl_d_mu" min="0" max="100" step="1" value="50"><output id="srl_d_muO">50%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="srl_d_sg" min="30" max="100" step="1" value="65"><output id="srl_d_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="srl_d_base">67.7%</strong><span>—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="srl_d_dp">+4.3 pp</strong><span>—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="srl_d_n">906</strong><span>—</span></div>
<canvas id="srlDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="srl_d_v">超额有限</strong><span id="srl_d_vh">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **先算 φ=Q/V 再谈冲击** | 无量纲化后才可跨日比较 |
| 2 | **分清 δ=0.5 与 δ=0.1** | 2014 BTC ≠ 2025 BTC |
| 3 | **理解 TWAP 的 √n 陷阱** | 拆单降峰值、未必降总成本 |
| 4 | **读 L2 斜率作一阶近似** | 小单区 λ·Q 快速估算 |
| 5 | **临时 vs 永久冲击** | 回测用哪个价格点 |
| 6 | **漂移剥离胜率** | 执行 alpha 先减基准 |
| 7 | **多样本 n>400** | 6 pp 超额才谈显著 |
| 8 | **跨所深度合并** | 单所 V 低估 φ |
| 9 | **记录己方成交冲击** | 比文献 Y 更准 |
| 10 | **30 分钟三联检** | 算、比、判——§22 |

# 常见认知陷阱

:::details 1. 「冲击 = k·√Q」对单笔成立
**错因**：SRL 是 metaorder **日平均**统计律。**对策**：小单用线性 λ。
:::

:::details 2. TWAP 一定更便宜
**错因**：√ 律下总成本 ∝ √n。**对策**：工具 2 验算；目标是最小化**总**成本或**峰值**。
:::

:::details 3. 把 Donier 2014 套 2025
**错因**：市场结构巨变；2025 δ≈0.1【待验证】。**对策**：标【待验证】，用己方日志校准。
:::

:::details 4. 忽视 Almgren β≈0.6
**错因**：临时冲击按**速率**计，非仅总量。**对策**：同时看 Q 与 T。
:::

:::details 5. δ=0.5 是理论推导
**错因**：是**经验**普适律，机制仍在争【分析】。**对策**：当 stylized fact，不当定理。
:::

:::details 6. 冲击=方向信号
**错因**：大单可 noise 可 info。**对策**：SRL 只估成本，不估 alpha。
:::

:::details 7. 永久冲击可忽略
**错因**：informed 流留下线性永久项【事实】。**对策**：长周期回测用 VWAP+perm。
:::

:::details 8. 单所 V 代表全市场
**错因**：BTC 深度分散在 Binance/Coinbase/OKX。**对策**：合并 V 或按执行场所算 φ。
:::

:::details 9. 把 OLS δ 当真值
**错因**：2025 OLS 0.10 vs MLP 0.04——方法敏感【待验证】。**对策**：多方法 + 置信区间。
:::

:::details 10. 忽视 crossover 线性区
**错因**：φ<0.1% 时 √ 与线性差 10×。**对策**：工具 3 看 η 区间。
:::

:::details 11. 胜率不算漂移
**错因**：90 日随机做多基准 **67.7%**。**对策**：§12 漂移剥离器。
:::

:::details 12. 冲击成本不算入回测
**错因**：α 被执行吃掉。**对策**：回测扣 I(Q) 再评策略。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| Q | ETF 申购块 / OTC 块 | 执行日志 notional |
| V | 日成交量 | 交易所 API |
| σ | 日实现波动 | 20d RV |
| I(Q) | 滑点 | 决策价 vs 成交价 |
| δ | 冲击曲线斜率 | log-log 回归 |
| 恢复 | 冲击后 5min 反弹 | event study |

# 从理论到行动

## 执行前检查清单

1. **估 φ**：Q ÷ 预期日 V（含主执行场所）
2. **选 δ**：保守用 0.5；2025 BTC 可敏感性测试 0.1–0.5
3. **算 I**：Y·σ·(Q/V)^δ → 美元成本
4. **选算法**：要降峰值→TWAP；要降总成本→可能更少切片
5. **对照基准**：策略收益 − I(Q) − 随机持币机会成本

# 技能树

:::details L1 · 识别（1–2 天）
读 Donier 2014 摘要 · 手算 100 BTC 冲击 · 理解 φ 与 δ
:::
:::details L2 · 测量（1 周）
拉 Binance L2 · 估 book 斜率 · 对比 √ 预测
:::
:::details L3 · 建模（2–4 周）
拟 log-log δ · 分 calm/stress · 记录己方成交冲击
:::
:::details L4 · 系统（1–3 月）
嵌入 execution sim · 冲击+漂移双基准 · 样本外验证
:::

# 游戏化世界

**角色**：你是一家 BTC ETF 的 execution trader。

| 关卡 | 任务 | 成功条件 |
|---|---|---|
| 1 | 100 BTC 单笔 vs 10 片 TWAP | 说清哪个**总成本**更高 |
| 2 | φ 从 0.2% 降到 0.05% | 冲击降多少（δ=0.5） |
| 3 | 2024 δ=0.5 vs 2025 δ=0.1 | 同一 Q 成本差几倍 |
| 4 | 72% 胜率策略 | 剥离 67.7% 基准后还剩多少 |

# 任务系统

| 优先级 | 任务 | 产出 |
|---|---|---|
| P0 | 手算默认参数 I(Q) | 100 BTC → 0.121% |
| P1 | 读 Donier 2014 §impact law | 1 页笔记 |
| P1 | 跑工具 2 TWAP n=10 | 确认 3.16× |
| P2 | 下载 1 天 BTCUSDT trades | CSV + φ 分布 |
| P2 | 对比 2014 vs 2025 δ 文献 | 对照表 |
| P3 | 嵌入回测 slippage | 扣 I(Q) 后 Sharpe |

# 反事实模拟

:::tabs
@@δ 仍是 0.5
若 2025 BTC 仍满足 Donier 尺度：500 BTC 冲击 **0.270%**（~$12.9 万）。ETF AP 会倾向**更激进**执行——因冲击被低估为「便宜」。

@@δ 降到 0.1
同一 500 BTC：冲击仅 **~0.054%**（~$2.6 万）——**五分之一**。机构化 + 做市确实「压平」了曲线——但 OLS 可能低估【待验证】。

@@stat arb 消失
回到 MtGox 式无做市环境：δ 回到 0.5【推论】。冲击成本飙升，大单更「贵」——流动性溢价上升。
:::

:::note amber
反事实只改 **一个**参数。真实世界 δ、Y、V 同时变——勿把模拟当预测。
:::

# 四级能力路线

| 级别 | 你能做什么 | 检验标准 |
|---|---|---|
| **L1 观察者** | 看到大单推价，说出 φ | 口算 Q/V |
| **L2 分析者** | 用 SRL 估美元冲击 | 与工具 1 误差 <10% |
| **L3 模拟者** | TWAP vs 单笔 trade-off | 解释 √n 效应 |
| **L4 设计者** | 自建 execution cost 模型 | 样本外 MAE < 20 bps |

# 30分钟最小实践

**目标**：用默认参数走通「算冲击 → 比 TWAP → 剥基准」三联检。

1. **5 分钟**：打开 HTML 工具 1，Q=100 → 记录 I=**0.121%**、$**115**/BTC
2. **10 分钟**：工具 2，Q=200、n=10 → 单笔 **0.171%** vs TWAP **0.540%**，比值 **3.16×**
3. **10 分钟**：工具 4，90 日、72% 胜率 → 基准 **67.7%**，超额 **+4.3 pp**，n=**906**
4. **5 分钟**：写 3 行日志——φ、δ 假设、是否扣冲击进回测

**产出**：一张手算对照表 + 明确「TWAP 总成本更高是 √ 律推论，不是 bug」。

# 7天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 §01–02 + Donier 摘要 |
| D2 | 公式 | 手算 10/100/500 BTC 三档 I(Q) |
| D3 | TWAP | 工具 2 + 推导 √n |
| D4 | crossover | 工具 3 + CFM 论文扫读 |
| D5 | 数据 | 拉 1 日 BTCUSDT volume 估 V |
| D6 | 2025 争议 | 读 crypto-market-impact README |
| D7 | 复盘 | 写「我的 δ 假设」1 页 |

# 30天计划

| 周 | 目标 |
|---|---|
| W1 | 理论：Donier + Almgren + LLOB crossover |
| W2 | 数据：3 所 V 合并 · L2 斜率 vs √ 预测 |
| W3 | 己方：若有成交日志，拟 Y、δ |
| W4 | 系统：回测扣 I(Q) · 漂移双基准 · 写免责声明 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | **Square Root Law** | I∝(Q/V)^0.5 经验普适 |
| 2 | **Almgren-Chriss** | 永久线性 + 临时 concave |
| 3 | **LLOB latent liquidity** | 隐藏单恢复驱动 √ |
| 4 | **Linear crossover** | η<0.1% → λQ |
| 5 | **Kyle λ** | 小单线性价格影响 |
| 6 | **Propagator model** | 冲击核随时间衰减 |
| 7 | **Metaorder decomposition** | informed vs uninformed |
| 8 | **Participation rate η** | Q/(V·T) 控制速率 |
| 9 | **Book slope proxy** | L2 一阶估冲击 |
| 10 | **Drift baseline** | 随机持币 Φ(μ,σ,T) |

# 关键问题清单

:::details 测量
我的 Q 是 metaorder 还是 child order？V 含不含永续对冲流量？
:::
:::details 指数
δ 用 OLS 还是分箱？置信区间多少？δ=0.1 是重建 artifact 吗？
:::
:::details 执行
我要最小化总成本还是峰值冲击？TWAP n 最优几？
:::
:::details 制度
ETF AP 申购算不算可观测 metaorder？跨所如何合并？
:::
:::details 回测
滑点假设 5 bps 够不够？500 BTC 单在 δ=0.5 下要 27 bps。
:::
:::details 基准
策略 72% 胜率扣掉 67.7% 基准还剩多少？n 够不够？
:::
:::details 衰减
临时冲击 5 分钟反弹多少？永久留多少？
:::
:::details 监管
大单披露阈值 vs 真实 Q——公开数据能否测 δ？
:::
:::details 跨域
股票 δ=0.5 能否迁移到 mid-cap 山寨？δ≈0.6【分析】
:::
:::details 下一步
己方下一笔 >50 BTC 单能否做 before/after 冲击计量？
:::

# 下一阶段探索

1. **跟做 Donier 2026 版**：若有 trader ID 级数据（OTC / 托管），重测 δ
2. **永续-现货分解**：对冲流是否污染 V 的分母
3. **与 MVRV/链上指标联读**：冲击成本 vs 全网盈亏结构——不同时间尺度
4. **执行 ML**：用 L2 特征预测 I(Q)，对比静态 √ 律
5. **监管**：ETF AP 申购冲击是否可公开观测

# 附录：数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| BTC δ=0.50±0.02 | 学术论文 | Donier et al. 2014 | 【事实】 |
| TSE δ=0.500±0.002 | 预印本 | Sato et al. 2024, arXiv:2411.13965 | 【事实】 |
| Almgren β≈0.6 | 期刊 | Almgren et al. 2005, *Risk* | 【事实】 |
| 2025 δ≈0.1 | 开源复现 | SLMolenaar/crypto-market-impact | 【待验证】 |
| LLOB crossover | 工作论文 | CFM, Crossover linear to sqrt | 【分析】 |
| BTC V≈50k/日 | 市场数据 | 交易所 API 量级 | 【待验证】 |
| 默认 σ=3% | 市场数据 | 2026 实现波动近似 | 【待验证】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。BTC 波动极大，执行成本模型在不同交易所、不同时段可能严重失效。平方根定律是**平均意义**上的经验关系，单笔交易可能偏离数个数量级。请勿将文献中的 δ=0.5 或 δ=0.1 直接用于实盘下单。作者不对依据本手册做出的任何交易决策负责。加密货币监管政策因司法辖区而异，请自行合规。
