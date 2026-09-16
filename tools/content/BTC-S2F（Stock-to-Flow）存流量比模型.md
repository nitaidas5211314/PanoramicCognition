---
slug: BTC-S2F（Stock-to-Flow）存流量比模型
title: BTC-S2F（Stock-to-Flow）存流量比模型
subtitle: 用<strong>存量÷流量</strong>量化稀缺可以，但把一条幂律曲线当 BTC 目标价——Shelton (2024) 已证明样本外几乎无效
brand_sub: Bitcoin × S2F × Scarcity
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, S2F, 存流量比, PlanB, 减半, 稀缺性]
theme_js_file: BTC-S2F（Stock-to-Flow）存流量比模型.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**S2F（Stock-to-Flow）= 已有存量 ÷ 年新增产量。** 它把 BTC 当成「可预测增产的贵金属」——第四次减半（2024-04）后 S2F ≈ **120.6**，约为黄金（~62）的 **1.9 倍**【事实】。PlanB (2019) 用幂律 `P = e^−1.84 · S2F^3.36` 拟合历史价，隐含当前模型价约 **$156 万**——而 2026 年 9 月现货约 **$9.5 万**，仅为模型的 **6.1%**【推论】。

Shelton (2024) 的 walk-forward 检验：S2F Deflection 样本外 R² = **0.031**，Clark-West t = **0.11**；S2F 估计与 log(创世以来天数) 相关 **80.57%**，加入时间固定效应后系数**不显著**【分析】。**稀缺可以度量，但 S2F→价格 的因果链在样本外未被证实。**

# 这个领域到底是什么

## 一句话定位

「BTC-S2F 存流量比模型」研究的是：**用供给稀缺性解释/预测 BTC 价格的框架及其有效边界**。它源自 Saifedean Ammous 对黄金/白银「货币硬度」的 stock-to-flow 论述，由匿名分析师 PlanB 在 2019 年改写为 BTC 定价公式，并在 2020 年扩展为 S2FX（含金、银对照点）。

:::note red 先划清边界
本手册**不提供**「按 S2F 应该在 $X」的买卖信号。S2F 是**供给侧叙事工具**；价格由 demand 曲线决定，而 demand 不在原始 S2F 公式里。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | S2F 定义、PlanB 回归、减半如何改变 S2F、样本外有效性 |
| 2 | 边界在哪 | 不含链上交易信号；不预测监管；不讨论具体交易所操作 |
| 3 | 核心对象 | stock（流通 BTC）、flow（年挖矿产出）、S2F 比率 |
| 4 | 参与者 | PlanB/传播者、矿工、长期持有者、ETF 买家、学术批评者 |
| 5 | 关键变量 | S2F、block reward、stock、flow、S2F Deflection、log(时间) |
| 6 | 可观察的 | 区块奖励、总 supply、现货价、Glassnode S2F 指标 |
| 7 | 不可观察但可推断 | 丢失币、Satoshi 币、真实可交易 float |
| 8 | 谁影响谁 | 减半→flow↓→S2F↑；**S2F↑ ⇏ 价格↑**（需求侧独立） |
| 9 | 因果 | 减半→flow 减半 = 【事实】；S2F→价格 = 【推论/待验证】 |
| 10 | 只是相关 | S2F 与价格、S2F 与 log(时间) 高度共线 |
| 11 | 表层现象 | S2F 对数图「完美拟合」、减半后 rally 叙事 |
| 12 | 底层机制 | 垂直供给曲线 + 幂律回归 + 社交媒体放大 |
| 13 | 反馈 | 模型价远高于现货→信仰强化或叙事疲劳 |
| 14 | 时间延迟 | 减半影响 6–18 个月；S2F 阶梯每 ~4 年跳一次 |
| 15 | 正负反馈 | 正：稀缺叙事→HODL；负：偏离模型→「模型失效」讨论 |

## S2F 与 S2FX 的区别

| 版本 | 公式 | 数据点 | 用途 |
|---|---|---|---|
| **S2F** | ln(P) ~ ln(S2F)，斜率 ~3.32 | 仅 BTC 历史 | 2019 原始模型 |
| **S2FX** | 同上 + 金、银、钻石、房地产 | 跨资产对照 | 2020 扩展，增强「货币商品」叙事 |
| **S2F Deflection** | 预测 return 而非 price level | Shelton 2024 改造 | 缓解伪回归，仍 OOS 弱 |

# 为什么值得研究

## 理由一：S2F 是 crypto 最流行的「科学外观」叙事

PlanB 2019 年 Medium 文章获数百万阅读；Glassnode、Spark 等数据站内置 S2F 追踪器【事实】。**不懂 S2F 就无法拆解 half 圈内 80% 的估值讨论**——无论你是否相信它。

## 理由二：2024 减半后是 falsify 窗口

第四次减半后 S2F 从 ~**57** 跳至 ~**121**（×**2.11**），模型隐含价从 ~**$12.6 万** 升至 ~**$156 万**【推论】。2021 周期峰 ~$69,000 仅为当次模型价（S2F≈57）的 **55%**【待验证】——**in-sample 漂亮，out-of-sample 已裂口**。

## 理由三：学会「供给指标 ≠ 定价公式」

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「减半择时 78% 胜率」真实超额 |
|---|---|---|---|
| 30 日 | — | **60.5%** | 表面 +28 pp → 真实 **+17.5 pp** |
| 90 日 | — | **67.7%** | 表面 +28 pp → 真实 **+10.3 pp** |
| 180 日 | — | **74.2%** | 表面 +30 pp → 真实 **+5.8 pp** |

**任何「S2F 择时策略」都要和对照基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从代码硬顶，到 S2F 图表

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-S2F · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「协议/物理约束」，越靠下越「叙事/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 协议层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">2100 万硬顶 · 210,000 区块/次减半 · 当前奖励 3.125 BTC</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：软分叉改通胀（极低概率）</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 供给计量层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">stock ≈ 19.8M · flow ≈ 164,250/年 · S2F ≈ 120.6</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">精确可算——这是 S2F 唯一无争议的部分</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 跨资产对照层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">金 S2F~62 · 银 ~22 · BTC 2024 后超越金</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">失效：BTC 无工业消耗，金/银需求结构不同</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 回归模型层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">PlanB 幂律 R²≈95% in-sample · 斜率 3.32–3.36</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：价格水平回归 → 伪 R²；与 log(时间) 共线 80.57%</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 减半周期层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">flow 每 4 年 ≈ 减半 → S2F 阶梯上升</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：样本 n=4，「减半必涨」非统计结论</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 需求真空层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">ETF/机构/宏观/监管——S2F 公式未包含</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">失效：2022 熊市 S2F 仍升但价跌——供给叙事 alone 不够</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 统计检验层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">time FE · walk-forward · Clark-West · Deflection</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">Shelton 2024：OOS R²=0.031——几乎无预测力</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">Twitter/YouTube S2F 图表 · 「$500K 本周期」 headline</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：只展示拟合段，隐藏 2022–2025 偏离</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">把 S2F 当 supply 仪表盘，不当 target price</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">对照基准 + 区间思维 + 样本外 habit</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">S2F 概念 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 货币硬度</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 供给稀缺</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 不可稀释性</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 时间趋势</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• stock/flow 比率</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 减半阶梯</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 幂律回归</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 共趋势/伪回归</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 手算 S2F</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 查 Glassnode S2F</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• Deflection = 现货/模型</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• time FE 回归复核</text>
  <defs><marker id="s2fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="214" y1="120" x2="238" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#s2fA)"/>
  <line x1="440" y1="120" x2="464" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#s2fA)"/>
</svg>
:::

## 跨域同构

| S2F 结构 | 其他领域 | 共同数学 |
|---|---|---|
| stock/flow 稀缺 | 贵金属货币理论（Ammous） | 垂直供给 + 低弹性 |
| 减半阶梯 | 产能投资长周期 | 供给冲击可预测 |
| 幂律回归 | 城市规模、公司市值 | 双对数线性 → 警惕伪 R² |
| S2F vs log(时间) | 全球 GDP vs 时间 | 共趋势 → 假显著 |
| Deflection | 价值因子 Z-score | 相对模型偏离度 |
| 样本外 R²≈0 | 技术分析多数指标 | in-sample 过拟合 |

# 核心参与者

| 参与者 | 与 S2F 的关系 | 激励扭曲 |
|---|---|---|
| **PlanB** | 2019 创建模型，2020 S2FX | 影响力与「被证伪」声誉博弈 |
| **Saifedean Ammous** | 《Bitcoin Standard》引入 S2F 概念 | 区分「硬度概念」vs「定价回归」 |
| **Shelton (2024)** | 正式 OOS 检验 | 学术发表；结论偏否定 |
| **Glassnode / Spark** | 数据可视化 | 流量；未必强调 OOS 局限 |
| **ETF 发行商** | 借用「数字黄金」叙事 | AUM；淡化模型失效段 |
| **矿工** | 减半直接影响 flow | 强调长期稀缺，淡化 short-term 卖压 |
| **你** | 读者/潜在投资者 | 确认偏误：持币者倾向相信 S2F |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **stock** | 已挖出 BTC 总量 | ~19.80M |
| **flow** | 年挖矿产出 = reward×144×365 | ~164,250 BTC/年 |
| **S2F** | stock ÷ flow | **120.6** |
| **block reward** | 当前块补贴 | 3.125 BTC |
| **S2F 模型价** | e^−1.84·S2F^3.36 | ~$1,561,780 |
| **Deflection** | 现货价 ÷ 模型价 | ~**6.1%**（严重低于模型） |
| **log(时间)** | ln(创世以来天数) | 与 S2F 估计相关 **80.57%**【分析】 |

:::raw
<div class="tool">
<h3>工具 · S2F 定价器</h3>
<p>手算 <strong>S2F = stock ÷ flow</strong>，再代入 PlanB 幂律。默认 post-2024 减半参数。</p>
<div class="ctrl"><label>存量 stock (M BTC)<input type="range" id="s2f_stock" min="17" max="21" step="0.01" value="19.81"><output id="s2f_stockO">19.81M</output></label></div>
<div class="ctrl"><label>块奖励 (BTC)<input type="range" id="s2f_reward" min="0.5" max="50" step="0.0625" value="3.125"><output id="s2f_rewardO">3.125 BTC/块</output></label></div>
<div class="ctrl"><label>现货价 ($)<input type="range" id="s2f_actual" min="10000" max="200000" step="500" value="95000"><output id="s2f_actualO">$95,000</output></label></div>
<div class="readout">
<div class="ro"><span class="k">S2F 比率</span><strong id="s2f_ratio">120.6</strong><span id="s2f_ratioh">—</span></div>
<div class="ro"><span class="k">模型隐含价</span><strong id="s2f_model">$1.56M</strong><span id="s2f_modelh">—</span></div>
<div class="ro"><span class="k">Deflection</span><strong id="s2f_defl">6.1%</strong><span id="s2f_deflh">—</span></div>
<canvas id="s2fPriceChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="s2f_v">显著折价</strong><span id="s2f_vh">—</span></div>
</div>
</div>
:::

# 因果关系

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="s2fG" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker>
    <marker id="s2fR" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="14" y="30" width="120" height="46" rx="8" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.2"/>
  <text x="26" y="50" font-size="11" font-weight="700" fill="#1d4ed8" font-family="sans-serif">减半</text>
  <text x="26" y="66" font-size="10" fill="#454c56" font-family="sans-serif">flow ↓50%</text>
  <rect x="154" y="30" width="120" height="46" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="166" y="50" font-size="11" font-weight="700" fill="#15181d" font-family="sans-serif">S2F ↑</text>
  <text x="166" y="66" font-size="10" fill="#454c56" font-family="sans-serif">~×2</text>
  <rect x="294" y="30" width="140" height="46" rx="8" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="306" y="50" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">模型价 ↑</text>
  <text x="306" y="66" font-size="10" fill="#454c56" font-family="sans-serif">幂律跳跃</text>
  <rect x="454" y="30" width="120" height="46" rx="8" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.2"/>
  <text x="466" y="50" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">现货价 ?</text>
  <text x="466" y="66" font-size="10" fill="#454c56" font-family="sans-serif">demand 决定</text>
  <line x1="134" y1="53" x2="152" y2="53" stroke="#454c56" stroke-width="1.3" marker-end="url(#s2fG)"/>
  <line x1="274" y1="53" x2="292" y2="53" stroke="#454c56" stroke-width="1.3" marker-end="url(#s2fG)"/>
  <line x1="434" y1="53" x2="452" y2="53" stroke="#d5342c" stroke-width="1.3" stroke-dasharray="4 3" marker-end="url(#s2fR)"/>
  <rect x="154" y="110" width="280" height="46" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="166" y="130" font-size="11" font-weight="700" fill="#1d4ed8" font-family="sans-serif">ETF / 宏观 / 监管</text>
  <text x="166" y="146" font-size="10" fill="#454c56" font-family="sans-serif">需求曲线——S2F 公式外生</text>
  <line x1="294" y1="156" x2="514" y2="76" stroke="#454c56" stroke-width="1.3" marker-end="url(#s2fG)"/>
  <rect x="154" y="180" width="280" height="46" rx="8" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="166" y="200" font-size="11" font-weight="700" fill="#0f8a4d" font-family="sans-serif">log(时间)</text>
  <text x="166" y="216" font-size="10" fill="#454c56" font-family="sans-serif">与 S2F 共线 80.57% — 可能驱动伪 R²</text>
  <line x1="294" y1="203" x2="354" y2="76" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#s2fR)"/>
  <rect x="14" y="260" width="652" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="26" y="284" font-size="11" fill="#454c56" font-family="sans-serif">实线 = 供给链（可验证）；红虚线 = 断裂/共线链。①→③ 成立；③→④ 样本外不成立【分析】</text>
  <rect x="14" y="310" width="652" height="52" rx="8" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.2"/>
  <text x="26" y="332" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">2022 反例</text>
  <text x="130" y="332" font-size="11" fill="#454c56" font-family="sans-serif">S2F 随减半预期上升，BTC 从 ~$69K 跌至 ~$16K——供给叙事无法单独解释熊市</text>
  <text x="130" y="350" font-size="10" fill="#7c848f" font-family="sans-serif">Rustgi (2023) cited in NAR 2025：S2F 未预见 2022 大跌</text>
</svg>
:::

## 因果 vs 相关

| 链条 | 判定 | 证据 |
|---|---|---|
| 减半 → flow↓ | 【事实】 | Bitcoin Core 代码 |
| flow↓ → S2F↑ | 【事实】 | 算术 |
| S2F↑ → 模型价↑ | 【推论】 | 幂律定义 |
| 模型价↑ → 现货↑ | **未证实** | OOS R²=0.031 |
| S2F 图表拟合 → 预测力 | **伪相关** | time FE 后归零 |

# 隐藏关系

## 隐藏关系一：S2F 估计是时间的换皮

Shelton (2024)：S2F 模型估计值与 log(创世以来天数) Pearson 相关 = **80.57%**。加入时间固定效应 → S2F 系数**统计不显著**。

:::raw
<div class="tool">
<h3>工具 · 伪趋势探测器</h3>
<p>演示 S2F 模型价与 <strong>log(日历时间)</strong> 的高度共线——这正是伪回归警告信号。</p>
<div class="ctrl"><label>创世后年数<input type="range" id="s2f_year" min="0" max="17" step="1" value="15"><output id="s2f_yearO">2024 年</output></label></div>
<div class="readout">
<div class="ro"><span class="k">模型价 vs log(时间) 相关</span><strong id="s2f_corr">97%+</strong><span id="s2f_corrh">—</span></div>
<canvas id="s2fSpurChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="s2f_v2">高度共线</strong><span id="s2f_v2h">—</span></div>
</div>
</div>
:::

## 隐藏关系二：in-sample R² 欺骗眼睛

PlanB 原始回归 R² ≈ **95%**【待验证】——但这是对 **10 年价格水平** 的拟合。价格序列非平稳；高 R² 常见于**共同上涨趋势**，不意味着 forecast skill。

## 隐藏关系三：S2FX 金/银点不是独立样本

S2FX 把金、银市值放在同一张 log-log 图——看似「跨市场验证」，但 **n=3 资产 + 1 个 crypto**，自由度极低。金/银 S2F 本身缓慢变化，与 BTC 指数级 S2F 跳跃不可比【分析】。

## 隐藏关系四：Deflection 仍预测无力

Shelton 将模型改为预测 **return**（S2F Deflection），缓解价格水平回归问题。结果：OOS R² = **0.031**，Clark-West = **0.11**——仍无法证明 predictability【分析】。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「减半后 12 个月胜率 78%」？先和<strong>随机持币基准</strong>比——BTC 有正漂移。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="s2f_T" min="5" max="365" step="5" value="90"><output id="s2f_TO">90 日</output></label></div>
<div class="ctrl"><label>S2F 择时胜率 (%)<input type="range" id="s2f_ps" min="50" max="90" step="0.1" value="78.0"><output id="s2f_psO">78.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="s2f_mu" min="0" max="100" step="1" value="50"><output id="s2f_muO">50.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="s2f_sg" min="30" max="100" step="1" value="65"><output id="s2f_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="s2f_base">67.7%</strong><span id="s2f_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="s2f_dp">+10.3 pp</strong><span id="s2f_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="s2f_n">151</strong><span id="s2f_nh">—</span></div>
<canvas id="s2fDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="s2f_v3">超额有限</strong><span id="s2f_v3h">—</span></div>
</div>
</div>
:::

# 系统运行机制

## 供给侧：S2F 唯一确定的部分

```
flow_day = block_reward × 144
flow_year = flow_day × 365
S2F = stock / flow_year
```

第四次减半后：reward = **3.125**，flow_day = **450 BTC**，flow_year = **164,250 BTC**【事实】。stock ≈ **19.80M** → S2F = **120.6**。

**金/银对照**【待验证】：金 S2F ~**62**（年产 ~3,200t / 存量 ~197kt）；银 ~**22**。BTC 2024 后稀缺度按 S2F 计已**超过黄金**。

## 模型侧：幂律如何生成「目标价」

PlanB 回归（2019）：

> **P ≈ exp(−1.84) × S2F^3.36**

| S2F | 模型价 | 备注 |
|---|---|---|
| 22（银级） | ~$5,146 | 2017 顶附近量级 |
| 57（2020 周期） | ~$126,078 | 2021 峰 $69K = 模型的 **55%** |
| 120.6（2024 后） | ~$1,561,780 | 2026 现货 ~$95K = **6.1%** |
| 248（2028 后） | ~$17.6M | 外推——样本外可信度极低 |

## 需求侧：公式里的黑洞

S2F 原式 **零 demand 变量**。2024–2026 边际定价者转为 **美 spot ETF**（累计净流入 ~$553B【待验证】）、宏观利率、监管——任一冲击都可让现货长期偏离模型带。

# 时间演化

## 历次减半 · S2F 阶梯

| 时代 | 块奖励 | S2F | 模型价区间 | 实际周期峰 | 准确度 |
|---|---|---|---|---|---|
| 2009–2012 | 50 BTC | ~1.3 | retrofit | ~$31 (2011) | in-sample |
| 2012–2016 | 25 BTC | ~8 | retrofit | ~$1,100 (2013) | in-sample |
| 2016–2020 | 12.5 BTC | ~25 | retrofit | ~$19,700 (2017) | in-sample |
| 2020–2024 | 6.25 BTC | ~57 | $100K–$288K | ~$69,000 (2021) | **低 24–76%** |
| 2024–2028 | 3.125 BTC | ~121 | $288K–$500K+ | ~$126K (2025)【待验证】 | **远低于下限** |

## 演化时间轴

:::raw
<svg viewBox="0 0 680 190" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">S2F 模型 · 四阶段演化</text>
  <line x1="40" y1="95" x2="640" y2="95" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="90" cy="95" r="7" fill="#1d4ed8"/>
  <text x="62" y="75" font-size="10" font-weight="700" fill="#1d4ed8" font-family="sans-serif">2019</text>
  <text x="50" y="120" font-size="10" fill="#454c56" font-family="sans-serif">PlanB 发文</text>
  <text x="50" y="134" font-size="10" fill="#454c56" font-family="sans-serif">S2F 诞生</text>
  <circle cx="230" cy="95" r="7" fill="#1d4ed8"/>
  <text x="205" y="75" font-size="10" font-weight="700" fill="#1d4ed8" font-family="sans-serif">2020–21</text>
  <text x="190" y="120" font-size="10" fill="#454c56" font-family="sans-serif">S2FX + 牛市</text>
  <text x="190" y="134" font-size="10" fill="#454c56" font-family="sans-serif">拟合「完美」</text>
  <circle cx="400" cy="95" r="7" fill="#d5342c"/>
  <text x="378" y="75" font-size="10" font-weight="700" fill="#d5342c" font-family="sans-serif">2022–23</text>
  <text x="360" y="120" font-size="10" fill="#454c56" font-family="sans-serif">模型裂口扩大</text>
  <text x="360" y="134" font-size="10" fill="#454c56" font-family="sans-serif">批评声音上升</text>
  <circle cx="570" cy="95" r="7" fill="#0f8a4d"/>
  <text x="545" y="75" font-size="10" font-weight="700" fill="#0f8a4d" font-family="sans-serif">2024+</text>
  <text x="520" y="120" font-size="10" fill="#454c56" font-family="sans-serif">Shelton OOS</text>
  <text x="520" y="134" font-size="10" fill="#454c56" font-family="sans-serif">学术否定样本外</text>
  <text x="14" y="168" font-size="10.5" fill="#7c848f" font-family="sans-serif">当前阶段：模型仍传播，但统计证据已转向「供给仪表盘」而非「定价 oracle」</text>
</svg>
:::

# 利益与激励

| 角色 | 从 S2F 得到什么 | 如何扭曲讨论 |
|---|---|---|
| 持币 KOL | 「数学证明会涨」 | 只贴拟合段 log 图 |
| PlanB | 影响力、咨询 | 2026 仍提 $500K 周期均值【待验证】 |
| 矿企 IR | 长期需求叙事 | 淡化 hashprice 危机 |
| 空头/批评者 | 反向流量 | 可能低估 supply 侧真实约束 |
| 学者 | 发表显著结果 | 倾向 in-sample 报告 |

**核心激励冲突**：S2F 越被 belief，HODL 越多 → float↓ → 短期价格弹性↑——但这**不能反证** S2F 回归正确（循环论证）。

# 资源与信息流

## 资金流抽水图

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">S2F 生态 · 资源与信息流</text>
  <rect x="260" y="40" width="160" height="44" rx="8" fill="#f0f4fd" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="278" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">BTC 现货池</text>
  <text x="278" y="74" font-size="10" fill="#454c56" font-family="sans-serif">定价中枢</text>
  <rect x="40" y="120" width="130" height="40" rx="8" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.2"/>
  <text x="52" y="138" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">法币/ETF 流入</text>
  <text x="52" y="152" font-size="9.5" fill="#454c56" font-family="sans-serif">demand 侧（S2F 外）</text>
  <rect x="510" y="120" width="130" height="40" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.2"/>
  <text x="522" y="138" font-size="11" font-weight="700" fill="#1d4ed8" font-family="sans-serif">S2F 叙事流</text>
  <text x="522" y="152" font-size="9.5" fill="#454c56" font-family="sans-serif">图表/推特/YouTube</text>
  <rect x="40" y="220" width="130" height="40" rx="8" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.2"/>
  <text x="52" y="238" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">矿工 flow</text>
  <text x="52" y="252" font-size="9.5" fill="#454c56" font-family="sans-serif">~450 BTC/天</text>
  <rect x="510" y="220" width="130" height="40" rx="8" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.2"/>
  <text x="522" y="238" font-size="11" font-weight="700" fill="#0f8a4d" font-family="sans-serif">长期锁仓</text>
  <text x="522" y="252" font-size="9.5" fill="#454c56" font-family="sans-serif">强化「stock」</text>
  <defs>
    <marker id="s2fGF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#0f8a4d"/></marker>
    <marker id="s2fRF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <line x1="170" y1="140" x2="258" y2="62" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#s2fGF)"/>
  <text x="175" y="88" font-size="9" fill="#0f8a4d" font-family="sans-serif">定价主驱动</text>
  <line x1="510" y1="140" x2="422" y2="62" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#s2fGF)"/>
  <text x="430" y="88" font-size="9" fill="#1d4ed8" font-family="sans-serif">信念→HODL</text>
  <line x1="170" y1="240" x2="258" y2="82" stroke="#d5342c" stroke-width="1.5" marker-end="url(#s2fRF)"/>
  <text x="175" y="200" font-size="9" fill="#d5342c" font-family="sans-serif">S2F 分子分母</text>
  <rect x="14" y="278" width="652" height="34" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="26" y="300" font-size="11" fill="#454c56" font-family="sans-serif">S2F 只描述左下「矿工 flow」→「stock」通道；右上 demand 与左下 supply 在公式中未耦合</text>
</svg>
:::

## 信息源层级

| 层级 | 来源 | S2F 相关 |
|---|---|---|
| L0 | Bitcoin Core、区块数据 | stock/flow 精确计算 |
| L1 | Glassnode S2F Ratio | 可视化；附 PlanB 链接 |
| L2 | PlanB Medium / Twitter | 模型原点；偏 bullish |
| L3 | Shelton JRFM 2024 | 样本外检验；偏否定 |
| L4 | 社交媒体截图 | 常截断纵轴、隐藏失效段 |

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆 | 作用 | 你怎么用 |
|---|---|---|---|
| 1 | **手算 S2F** | 识破「神秘公式」 | stock÷(reward×144×365) |
| 2 | **Deflection 监控** | 现货/模型 = 偏离度 | §06 定价器；不当作买卖信号 |
| 3 | **time FE 检验** | 拆伪回归 | 回归加 log(天数) 虚拟变量 |
| 4 | **walk-forward OOS** | 识 in-sample 幻觉 | 要求 OOS R² + Clark-West |
| 5 | **对照基准** | 防漂移当 alpha | §08 漂移剥离器 |
| 6 | **区分概念 vs 回归** | Ammous 硬度 ≠ PlanB 价 | 读 The Bitcoin Standard 原意 |
| 7 | **减半日历** | supply 侧唯一确定输入 | §20 稀缺时钟 |
| 8 | **demand 仪表盘** | 补 S2F 黑洞 | ETF flow + 实际利率 |
| 9 | **样本量意识** | n=4 减半不够 | 不对周期峰做点预测 |
| 10 | **区间非点** | 防数学傲慢 | 输出情景带，不是 $500K |

# 常见认知陷阱

:::details 1. 「S2F 图表从未错过」
**错。** 2020–24 周期峰 $69K 低于模型 $100K+；2024–28 周期远低于 $288K 下限。Shelton OOS R²=0.031。
:::

:::details 2. 「R²=95% 所以模型科学」
**错。** 价格水平回归 + 共同趋势 → 伪高 R²。改预测 return 仍无效。
:::

:::details 3. 「BTC S2F 已超黄金所以必涨」
**混淆概念与因果。** 稀缺度上升是【事实】；价格路径由 demand 决定【分析】。
:::

:::details 4. 「PlanB 2019 预测 $55K 所以全对」
**cherry-pick。** 一次 in-sample 命中不能证明 OOS；2022 大幅偏离未解释。
:::

:::details 5. 「减半后 6–12 个月必涨」
**样本 n=4。** 2024 减半前已 ATH——price-in 程度史上最高【推论】。
:::

:::details 6. 「S2FX 有金/银所以跨市场验证」
**自由度太低。** 3 个金属点 + 1 条 BTC 轨迹，不是独立大样本。
:::

:::details 7. 「模型价 $156 万是目标价」
**致命外推。** 幂律斜率 3.36 在 OOS 下无约束；现货 6.1% deflection 说明方程 misspecified。
:::

:::details 8. 「批评者不懂稀缺」
**稻草人。** Ammous 本人区分硬度概念 vs PlanB 数学模型【分析】。
:::

:::details 9. 「长期必回归模型带」
**无均值回复机制。** 不像 P/E 有盈利锚；deflection 可长期扩大（2022–25 已发生）。
:::

:::details 10. 「链上 S2F 指标准则」
**指标 ≠ 模型。** Glassnode 画的是比率历史，不是 endorse PlanB 幂律。
:::

:::details 11. 「丢失币让 S2F 更高」
**方向对、幅度未知。** 丢失估计 ±30%；PlanB 用总 supply，未扣 lost coins。
:::

:::details 12. 「学术已完全否定 BTC 价值」
**过度推论。** Shelton 否定的是 **S2F 单独 predictability**，不是 BTC 整体； blended 策略 OOS alpha +1300bp【分析】。
:::

<!-- nav:落地 -->

# 从抽象到现实

## 三个检查落点

| 抽象 | 现实操作 | 频率 |
|---|---|---|
| stock / flow | mempool.space 看 reward & supply | 实时 |
| S2F 比率 | Glassnode `StockToFlowRatio` | 日 |
| 模型价 / Deflection | §06 定价器 + CoinMetrics | 周 |
| OOS 证据 | Shelton 2024 Table / Clark-West | 季度 |
| demand 侧 | ETF 净流入、DXY、实际利率 | 日 |

## 2026 年 9 月快照【待验证】

- BTC 现货约 **$95,000**（模型价 ~$156 万，Deflection **6.1%**）
- 第四次减半已过 **~17 个月**；块奖励 **3.125 BTC**
- PlanB 仍称 2024–28 周期均价可达 **~$500,000**【待验证】——与现货差距引发再辩论
- 美 spot ETF 累计净流入 **~$553B**；S2F 公式未含此项

# 从理论到行动

## 决策框架（非买卖信号）

```
① 手算当前 S2F（应 ≈ 120.6）
② 算模型价与 Deflection（知情，不下注）
③ 查 demand 仪表盘（ETF/利率/监管）
④ 问：你的 edge 是否 > 随机持币基准？（§08）
⑤ 问：策略 OOS R² 是否 > 0？time FE 是否显著？
⑥ 仓位 = f(区间, 置信度, 回撤) — 不是 f(S2F 目标价)
```

:::note green 正确用法
把 S2F 当作 **supply 侧仪表盘**——告诉你「新增流量有多小」。把 PlanB 价当作 **thought experiment 上界**，不是 base case。
:::

# 技能树

:::details L1 · 观察者
- [ ] 手算 post-2024 S2F = 120.6
- [ ] 解释 stock 与 flow 区别
- [ ] 说出金/银/BTC 的 S2F 量级
:::

:::details L2 · 分析师
- [ ] 复述 Shelton 三条批评（time FE / OOS / Deflection）
- [ ] 手算 Deflection = 现货/模型
- [ ] 用 §08 剥离 78% 胜率的漂移
:::

:::details L3 · 建模者
- [ ] 跑 time FE 思路（概念即可）
- [ ] 对比 2020 vs 2024 周期模型准确度
- [ ] 写 3 档 demand 情景补 S2F 黑洞
:::

:::details L4 · 系统设计者
- [ ] 建 supply+demand 双仪表盘
- [ ] 禁止输出单点 S2F 目标价
- [ ] 每季更新 OOS 证据表
:::

# 游戏化世界

**角色**：稀缺性审计员（Scarcity Auditor）。等级越高，越不信 log 图，越会查 OOS。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 S2F 误差 <1% | 解锁「供给层」 |
| Lv.2 | 向朋友解释 time FE 共线 | 解锁「伪趋势探测器」 |
| Lv.3 | 算出 Deflection <10% 的含义 | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周记录 ETF vs 价 | 解锁「demand 侧地图」 |
| Lv.5 | 写一页「S2F 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘价 | 7 日表 |
| 每周 | 更新 S2F & Deflection | §06 工具截图 |
| 每月 | 读一篇 S2F 批评/辩护 | 3 行摘要 |
| 每季 | 核对减半倒计时 & reward | 与官方一致 |
| 每年 | 减半后重算 S2F 阶梯 | 误差 <2% |

# 反事实模拟

:::tabs
@@情景 A · 若 S2F 样本外有效
2024 减半后 12 个月内 BTC 应沿模型带飙升 toward $288K+。实际 2025 峰 ~$126K【待验证】——**反事实已被部分 falsify**。

@@情景 B · 若无幂律，只有硬度概念
Ammous 式论证仍成立：BTC 是最高 S2F 的可验证资产。但**没有 $156 万点估计**——叙事更 modest，投机性更低。

@@情景 C · 若 demand 永久疲弱
S2F 仍随减半上升（supply 侧），现货可长期 <10% deflection——**供给叙事与价格脱钩**可持续数年（2022–23 已演示）。

@@情景 D · 若 blended OOS 策略有效
Shelton：组合 S2F+Metcalfe+sentiment OOS alpha +1300bp【分析】。说明 **signal 可能在组合中**，不在 S2F alone——反事实支持「拆模型、不盲信单图」。
:::

:::raw
<div class="tool">
<h3>工具 · 减半稀缺时钟</h3>
<p>从 2024 减半出发，看 S2F 阶梯与模型价外推。</p>
<div class="ctrl"><label>距 2024 减半（年）<input type="range" id="s2f_hl_years" min="0" max="12" step="1" value="2"><output id="s2f_hl_yearsO">2 年</output></label></div>
<div class="readout">
<div class="ro"><span class="k">stock</span><strong id="s2f_hl_stock">19.80M</strong><span id="s2f_hl_stockh">—</span></div>
<div class="ro"><span class="k">日 flow</span><strong id="s2f_hl_flow">450 BTC/天</strong><span id="s2f_hl_flowh">—</span></div>
<div class="ro"><span class="k">S2F</span><strong id="s2f_hl_sf">121</strong><span id="s2f_hl_sfh">—</span></div>
<div class="ro"><span class="k">模型价</span><strong id="s2f_hl_model">$1.56M</strong><span id="s2f_hl_modelh">—</span></div>
<canvas id="s2fHlChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="s2f_hl_v">高 S2F 时代</strong><span id="s2f_hl_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会算 S2F** | 3 天 | stock/flow/减半 | 口算 120.6 |
| **L2 会拆叙事** | 1 周 | time FE + Deflection | 漂移剥离器实操 |
| **L3 会补 demand** | 2 周 | supply+demand 双地图 | 3 情景区间 |
| **L4 会迭代系统** | 1 月+ | 禁单点目标价 | 连续 2 月无「$500K 必达」 |

# 30 分钟最小实践

**任务**：完成「S2F 三联检」——算、比、判。

1. **8 分钟 · 手算 S2F**：reward=3.125，stock=19.8M → flow=164,250 → S2F=**120.6**。
2. **7 分钟 · 模型价**：§06 定价器，读模型价 ~**$156 万** 与 Deflection **6.1%**。
3. **8 分钟 · demand 扫一眼**：查美 ETF 近 7 日净流入方向（任意公开源）。
4. **7 分钟 · 结论**：写三句话——(a) supply 侧数字 (b) 模型 vs 现货裂口 (c) demand 侧一条观察。**禁止写「应该涨到 $X」。**

**验证**：S2F 与 §06 工具默认读数误差 **<0.5**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 PlanB 2019 摘要 + Ammous 硬度段落 |
| D2 | 手算 | 四次减半 S2F 表 |
| D3 | 批评 | Shelton 2024 摘要 3 条 |
| D4 | 工具 | §06–§08 三个交互模型 |
| D5 | 历史 | 对照 2021 峰 vs 模型 |
| D6 | demand | ETF+利率 7 日日志 |
| D7 | 合成 | 1 页「S2F 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：S2F 定义 + 手算 + 金/银对照（L1）
**Week 2**：伪回归 + Deflection + 漂移剥离（L2）
**Week 3**：demand 仪表盘 + 2020/2024 周期对比（L3）
**Week 4**：个人双地图 + 季度 OOS 检查 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **S2F 比率** | stock÷flow | 与 log(时间) 共线 |
| 2 | **PlanB 幂律** | P∝S2F^3.36 | in-sample 幻觉 |
| 3 | **S2FX** | 跨资产 log-log | 自由度太低 |
| 4 | **S2F Deflection** | 预测 return | OOS R²≈0 |
| 5 | **time FE 检验** | 控共同趋势 | 必须做 |
| 6 | **walk-forward** | 真 forecast 测试 | 比 R² 重要 |
| 7 | **Clark-West** | 对比 naive 基准 | t=0.11→无效 |
| 8 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 9 | **减半阶梯** | supply 可预测部分 | ≠ 价格周期 |
| 10 | **blended OOS** | 多信号组合 | 证明组合≠S2F alone |

# 关键问题清单

:::details 供给
- 当前 S2F？2028 减半后 S2F？
- 日 flow 占 stock 的百分比？
- 丢失币是否应扣减 stock？
:::

:::details 模型
- 你的 Deflection 是多少？
- time FE 后 S2F 还显著吗？
- OOS R² 是否 beat 0？
:::

:::details demand
- ETF 30 日净流入趋势？
- 实际利率方向？
- 监管事件冲击？
:::

:::details 决策
- 你是否把模型价当目标价？
- 策略胜率是否扣过漂移？
- 样本量是否够证伪/证实？
:::

# 下一阶段探索

1. **Shelton blended 策略**：S2F+Metcalfe+sentiment 组合 OOS alpha【分析】——能否拆出 S2F 的边际贡献？
2. **active supply 修正 S2F**：用 float 替代 total stock 重新定义「有效 S2F」
3. **2028 第五次减半 falsify 实验**：提前写下 model band vs 可接受偏离
4. **亚洲 OTC demand vs S2F**：供给全球统一，需求本地化——哪边主导 marginal price？
5. **fee-era S2F**：2140 后 flow→0，S2F→∞——模型在极限下行为如何？

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| S2F 定义与减半参数 | 协议代码 | Bitcoin Core | 【事实】 |
| PlanB 幂律系数 | 博客 | PlanB Medium 2019 | 【待验证】 |
| 80.57% 时间相关 | 同行评审 | Shelton, JRFM 2024 | 【分析】 |
| OOS R²=0.031 | 同行评审 | Shelton, JRFM 2024 | 【分析】 |
| 金/银 S2F | 行业估计 | WGC / PlanB S2FX | 【待验证】 |
| 2021 峰 $69K | 市场数据 | CoinGecko 等 | 【事实】 |
| 2025 峰 ~$126K | 媒体 | Spark tracker | 【待验证】 |
| $500K 周期论 | 媒体 | Yahoo Finance 2026-03 | 【待验证】 |
| blended alpha +1300bp | 同行评审 | Shelton, JRFM 2024 | 【分析】 |
| 2022 模型失效 | 学术 | Rustgi/NAR 2025 | 【分析】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；S2F 模型、PlanB 预测、减半周期叙事均**不保证**未来价格路径。Shelton (2024) 等研究显示 S2F **样本外预测力极弱**——请勿依据幂律外推进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
