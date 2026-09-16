---
slug: BTC-饼金比（BTC-to-Gold Ratio）与中枢位移
title: BTC-饼金比（BTC-to-Gold Ratio）与中枢位移
subtitle: 用<strong>1 BTC 能买几盎司黄金</strong>读相对强弱——中枢不是固定均值，而是随宏观周期<strong>结构性位移</strong>的滚动均衡
brand_sub: Bitcoin × Gold × Macro Rotation
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, 黄金, 饼金比, 宏观轮动, 中枢位移]
theme_js_file: BTC-饼金比（BTC-to-Gold Ratio）与中枢位移.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**饼金比 = BTC 美元价 ÷ 黄金美元价/盎司。** 它回答的不是「BTC 涨没涨」，而是「**相对黄金，BTC 是否在赢**」【事实】。2025-10 峰 **28.8 oz** → 2026-02 谷 **12.3 oz**（**−57%** 回撤）→ 2026-09 修复至 **17.7 oz**【待验证】——修复主因是**金价回落**而非 BTC 突破【分析】。

「**中枢位移**」= 滚动均衡中心本身在动：历次危机留下**更高低点**（2.7→3.4→9.1→12.4 oz），但 2024–2026 周期**高点下移**（37→28.8 oz）【推论】。勿把 200 周均线当永恒中枢——它也在位移。

# 这个领域到底是什么

## 一句话定位

「BTC-饼金比与中枢位移」研究的是：**用 BTC/黄金相对价格比衡量数字资产 vs 传统避险资产的轮动位置，以及滚动均衡中心如何随宏观 regime 结构性迁移**。它是宏观风险偏好仪表盘，不是 BTC 美元牛熊的替代品。

:::note red 先划清边界
本手册**不提供**「比值到 X 就换仓」的信号。比值度量**相对表现**；何时轮动取决于流动性、地缘与行为，不是一条静态阈值线。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 饼金比定义、中枢位移、周期高低点、修复腿分解 |
| 2 | 边界在哪 | 不含白银/铜比价；不预测地缘；不替代现货技术分析 |
| 3 | 核心对象 | BTC 价、金价/oz、比值、滚动中枢、Z 偏离、位移速度 |
| 4 | 参与者 | 宏观基金、央行购金、ETF 发行商、ByteTree/WisdomTree 模型方、技术分析师 |
| 5 | 关键变量 | 比值、200 周均线、9/21 周 EMA、ETF 流量、实际利率、美元 |
| 6 | 可观察的 | 现货价、LBMA/COMEX 金价、ETF 持仓、周/月 K 线 |
| 7 | 不可观察但可推断 | 央行隐性购金、场外 OTC 流量、机构再平衡触发点 |
| 8 | 谁影响谁 | 风险偏好↑→BTC 跑赢→比值↑；避险↑→黄金跑赢→比值↓ |
| 9 | 因果 | 两资产独立定价→比值=相对强弱 = 【事实】；比值→BTC 美元牛 = 【推论】 |
| 10 | 只是相关 | 比值与 BTC 美元价高度共线——黄金波动可「掩盖」BTC 弱势 |
| 11 | 表层现象 | 「数字黄金」叙事、396 日周期对称、均值回归口号 |
| 12 | 底层机制 | 流动性周期 + 避险偏好 + 机构配置再平衡 |
| 13 | 反馈 | 比值低→媒体唱衰→抛压→比值更低，直至黄金过热回调 |
| 14 | 时间延迟 | 半衰期约 **216 日**【待验证】——均值回归极慢 |
| 15 | 正负反馈 | 正：BTC 跑赢→FOMO→比值更高；负：黄金狂飙→比值崩塌 |

## 饼金比 vs 其他读法

| 读法 | 公式/定义 | 用途 |
|---|---|---|
| **饼金比** | BTC ÷ (金价/oz) | 相对购买力；跨周期可比 |
| **BiG 模型** | WisdomTree 宏观公允比【分析】 | 2026-03 公允 **21.1** vs 实际 **15.6** oz |
| **幂律残差** | log(比值) − OLS(年龄)【待验证】 | 长期趋势剥离后的低估度 |
| **9/21 周 EMA** | 快慢线金叉/死叉 | 相对周期拐点信号【分析】 |
| **396 日周期** | 历次熊市长度对称【待验证】 | TradingShot 框架 |

# 为什么值得研究

## 理由一：比值是「风险偏好」的干净读数

Delphi Digital 指出：BTC 相对黄金走强常反映**流动性改善与风险 appetite 回升**；走弱则反映避险主导【分析】。只看 BTC 美元价会漏掉「黄金也在涨」的相对弱势。

## 理由二：2024–2026 是中枢位移的 live test

| 时点 | 比值 (oz) | 背景 |
|---|---|---|
| 2024-12 峰【待验证】 | **~37.3** | BTC >$106K，数字黄金叙事巅峰 |
| 2025-10-28【待验证】 | **28.8** | BTC $114K，金价 $3,966 |
| 2026-02-25 谷【待验证】 | **12.3** | BTC $64K，金价 $5,206 |
| 2026-09【待验证】 | **17.7** | BTC $78K，金价 ~$4,400 |

**高点下移 + 低点上移** = 中枢在收敛/位移，不是简单围绕 20 oz 振荡。

## 理由三：学会「对照基准」

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「比值触底买 BTC 72% 胜率」真实超额 |
|---|---|---|---|
| 30 日 | — | **60.5%** | 表面 +11.5 pp → 真实 **+11.5 pp** |
| 90 日 | — | **67.7%** | 表面 +4.3 pp → 真实 **+4.3 pp** |
| 180 日 | — | **74.2%** | 表面 +2 pp → 真实 **~+2 pp** |

**任何「比值信号」都要和随机持币基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从现货定价，到中枢位移

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-饼金比 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「硬价格」，越靠下越「中枢/叙事可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 现货定价层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">BTC 现货 · LBMA/COMEX 金价 · 24/7 vs 交易时段</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：不同金价基准（期货/现货）差 1–2%</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 比值计算层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">饼金比 = BTC ÷ 金价/oz · 无量纲</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">消除美元计价噪声——读相对强弱</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 宏观驱动层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">实际利率 · 美元 · 地缘 · 流动性</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">两资产同受宏观，但敏感度不同</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 流量结构层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">BTC ETF 净流入 · 黄金 ETF 流出 · 央行购金</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">2026-03 ETF 持仓分化确认相对拐点【待验证】</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 技术结构层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">更低高点/更高低点 · 200 周均线 · 穹顶阻力</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">Kinesis：跌破 25 oz = 新低确认【分析】</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 中枢均衡层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">滚动均值/中位数 · BiG 公允 · 幂律趋势</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">中枢本身在位移——非固定 20 oz</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 周期信号层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">9/21 周 EMA · 396 日熊周期 · CCI 月线</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">金叉后历史涨幅 25%–641%【待验证】</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 叙事传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「数字黄金」· Morris 40+ oz 目标 · 均值回归口号</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：协整检验 p=0.44，无稳健均值回归【分析】</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">比值当轮动仪表盘，不当单点触发器</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">中枢位移 + 腿分解 + 对照基准</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">饼金比 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 相对强弱</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 中枢位移</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 风险偏好</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 均值回归（弱）</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 流动性周期</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• ETF 再平衡</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 避险轮动</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 双腿定价</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 算比值 + 腿分解</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 盯 9/21 周 EMA</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 读 ETF 流量差</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#bgA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#bgA)"/>
  <defs><marker id="bgA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与饼金比的关系 |
|---|---|---|
| **Charlie Morris (ByteTree)** | 追踪比值全历史 | 更高低点叙事；下周期目标 40+ oz【待验证】 |
| **Delphi Digital** | 9/21 周 EMA 框架 | 宏观风险偏好仪表盘 |
| **WisdomTree (BiG 模型)** | 宏观公允比值 | 2026-03 公允 21.1 vs 实际 15.6 oz |
| **央行** | 持续购金 | 金价结构性买盘→压制比值【分析】 |
| **BTC/黄金 ETF 发行商** | 机械再平衡 | 流量分化确认相对拐点 |
| **TradingShot** | 396 日周期 | 熊周期长度对称【待验证】 |
| **批评者 (WEEX 等)** | 协整检验 | p=0.44，无稳健协整【分析】 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **BTC 现货价** | 美元计价 | ~$77,928 |
| **金价** | 美元/盎司 | ~$4,400 |
| **饼金比** | 前者 ÷ 后者 | **17.71 oz** |
| **周期高点** | 2025-10-28 | **28.79 oz** |
| **周期低点** | 2026-02-25 | **12.31 oz** |
| **回撤幅度** | 峰→谷 | **−57.2%** |
| **修复幅度** | 谷→今 | **+43.9%** |
| **200 周均线偏离** | 2026-01 | **−17%**【待验证】 |
| **BiG 公允比** | WisdomTree 模型 | **~21.1 oz**【待验证】 |

:::raw
<div class="tool">
<h3>工具 · 饼金比计算器</h3>
<p>手算 <strong>比值 = BTC 价 ÷ 金价/oz</strong>。默认 2026-09 参数。</p>
<div class="ctrl"><label>BTC ($)<input type="range" id="bgr_btc" min="50000" max="120000" step="100" value="77928"><output id="bgr_btcO">$77,928</output></label></div>
<div class="ctrl"><label>黄金 ($/oz)<input type="range" id="bgr_gold" min="3500" max="5500" step="10" value="4400"><output id="bgr_goldO">$4,400/oz</output></label></div>
<div class="readout">
<div class="ro"><span class="k">饼金比</span><strong id="bgr_ratio">17.71 oz</strong><span id="bgr_ratioh">—</span></div>
<div class="ro"><span class="k">相对基准</span><strong id="bgr_chg">+0.0%</strong><span id="bgr_chgh">—</span></div>
<canvas id="bgrChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="bgr_v">中枢附近</strong><span id="bgr_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">饼金比因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="85" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">宏观流动性</text>
  <rect x="170" y="50" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="225" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 需求</text>
  <rect x="310" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="365" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 价格</text>
  <rect x="450" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="505" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">饼金比</text>
  <rect x="560" y="50" width="100" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="610" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">轮动决策</text>
  <rect x="30" y="150" width="110" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="85" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">地缘/避险</text>
  <text x="85" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">冲击</text>
  <rect x="170" y="150" width="110" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="225" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">黄金需求</text>
  <rect x="310" y="150" width="110" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="365" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">金价</text>
  <rect x="170" y="250" width="140" height="44" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="240" y="270" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">ETF 流量差</text>
  <text x="240" y="286" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">BTC 入/黄金出</text>
  <path d="M140 72 L170 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#bgB)"/>
  <path d="M280 72 L310 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#bgB)"/>
  <path d="M420 72 L450 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#bgB)"/>
  <path d="M560 72 L560 72" stroke="#454c56" stroke-width="1.5"/>
  <path d="M505 94 L505 150 L365 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#bgB)"/>
  <path d="M140 172 L170 172" stroke="#d5342c" stroke-width="1.5" marker-end="url(#bgC)"/>
  <path d="M280 172 L310 172" stroke="#d5342c" stroke-width="1.5" marker-end="url(#bgC)"/>
  <path d="M420 172 L450 94" stroke="#d5342c" stroke-width="1.5" marker-end="url(#bgC)"/>
  <path d="M610 94 L610 250 L310 250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#bgC)"/>
  <defs>
    <marker id="bgB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="bgC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：比值由**双腿**共同决定——BTC 涨不够、黄金狂飙，比值照样崩（2025-10→2026-02）。红色反馈：比值极低→媒体唱衰→BTC 抛压，直至黄金均值回归。

# 隐藏关系

## 隐藏关系一：比值与 BTC 美元价共线 ≠ 独立信号

Kinesis 指出：BTC 波动远大于黄金，两图常同向——**比值下跌时，BTC 美元牛市也难持续**【分析】。把比值当「独立于 BTC 的信号」会重复计入价格信息。

## 隐藏关系二：协整不存在，均值回归极弱

Engle-Granger 全样本 p=**0.44**【待验证】；31 个两年滚动窗口无一显著。比值 ADF 勉强平稳（p=**0.034**），但半衰期 **~216 日**【待验证】——慢到几乎无交易价值。

:::raw
<div class="tool">
<h3>工具 · 中枢位移仪表盘</h3>
<p>比较<strong>当前读数</strong>相对<strong>旧中枢</strong>与<strong>新中枢</strong>的 Z 偏离——中枢位移改变「高估/低估」判定。</p>
<div class="ctrl"><label>当前比值 (oz)<input type="range" id="bgr_cur" min="10" max="30" step="0.1" value="17.7"><output id="bgr_curO">17.7 oz</output></label></div>
<div class="ctrl"><label>旧中枢 (oz)<input type="range" id="bgr_old" min="15" max="35" step="0.5" value="25.0"><output id="bgr_oldO">25.0 oz</output></label></div>
<div class="ctrl"><label>新中枢 (oz)<input type="range" id="bgr_new" min="10" max="25" step="0.5" value="16.0"><output id="bgr_newO">16.0 oz</output></label></div>
<div class="ctrl"><label>波动带 σ (oz)<input type="range" id="bgr_std" min="3" max="12" step="0.5" value="8.0"><output id="bgr_stdO">±8.0 oz</output></label></div>
<div class="readout">
<div class="ro"><span class="k">Z（旧中枢）</span><strong id="bgr_zold">−0.91σ</strong><span>—</span></div>
<div class="ro"><span class="k">Z（新中枢）</span><strong id="bgr_znew">+0.21σ</strong><span>—</span></div>
<div class="ro"><span class="k">中枢位移</span><strong id="bgr_shift">−9.0 oz</strong><span id="bgr_shifth">—</span></div>
<canvas id="bgrCenterChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="bgr_v2">贴近新中枢</strong><span id="bgr_v2h">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | 饼金比领域 | 其他领域 |
|---|---|---|
| **相对强弱** | BTC/Gold | 股债比、铜金比、EUR/USD |
| **中枢位移** | 滚动均值迁移 | 通胀目标漂移、利率中枢 |
| **双腿分解** | BTC 腿 + 黄金腿 | 汇率 = 两国利率差 |
| **半衰期** | ~216 日 | 信用利差均值回归 |
| **更高低点** | 危机底部序列 | 技术支撑位抬升 |

# 系统运行机制

## 四阶段相对周期

1. **BTC 主导期**：流动性宽松，比值突破 20+ oz，数字黄金叙事升温
2. **黄金追赶期**：避险/通胀担忧，金价跑赢，比值回落
3. **双杀期**：流动性收紧，BTC 跌 + 黄金涨，比值崩塌（2025-10→2026-02）
4. **修复期**：黄金均值回归 + BTC 企稳，比值回升——但需分辨**哪条腿在干活**

:::note amber 修复 ≠ 反转
TokenIntel（2026-05）：2026-02 后比值从 12.3→16.9 的修复**几乎全靠金价回落**（−14%），BTC 仅 +22% 仍远低于峰【分析】。下一腿需 BTC **主动跑赢**。
:::

# 时间演化

## 危机更高低点与高点下移

| 事件 | 年月 | 比值 (oz) | 备注 |
|---|---|---|---|
| 首次 >1 oz | 2017-03 | **1.0** | 里程碑【待验证】 |
| 中期周期 | 2019 | **2.7** | 2018 熊后恢复 |
| COVID 冲击 | 2020-03 | **3.4** | 危机低点 |
| FTX 崩盘 | 2022-11 | **9.1** | 加密特有冲击 |
| 周期峰 | 2024-12 | **~37.3** | 叙事巅峰【待验证】 |
| 局部峰 | 2025-10-28 | **28.8** | BTC $114K |
| 周期谷 | 2026-02-25 | **12.3** | 更高低点确认 |
| 当前 | 2026-09 | **17.7** | 修复中 |

**396 日熊周期**：TradingShot 称 2014 以来每次熊市持续 **396 日**，2025-01 峰→2026-03 完成【待验证】。

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">饼金比 · 演化时间轴</text>
  <line x1="40" y1="120" x2="640" y2="120" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="60" cy="120" r="5" fill="#0f8a4d"/><text x="60" y="100" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2017</text><text x="60" y="145" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">1 oz</text>
  <circle cx="140" cy="120" r="5" fill="#0f8a4d"/><text x="140" y="100" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2020</text><text x="140" y="145" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">3.4</text>
  <circle cx="240" cy="120" r="5" fill="#0f8a4d"/><text x="240" y="100" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022</text><text x="240" y="145" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">9.1</text>
  <circle cx="360" cy="80" r="6" fill="#d5342c"/><text x="360" y="60" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024-12</text><text x="360" y="100" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">37.3</text>
  <circle cx="440" cy="95" r="5" fill="#d5342c"/><text x="440" y="75" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2025-10</text><text x="440" y="115" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">28.8</text>
  <circle cx="500" cy="140" r="6" fill="#0f8a4d"/><text x="500" y="160" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026-02</text><text x="500" y="180" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">12.3</text>
  <circle cx="600" cy="115" r="5" fill="#1d4ed8"/><text x="600" y="95" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026-09</text><text x="600" y="140" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">17.7</text>
  <path d="M60 120 Q200 110 360 80 Q480 100 500 140 Q550 125 600 115" stroke="#1d4ed8" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
  <text x="340" y="190" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">更高低点抬升 · 高点下移 · 中枢位移</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对比值叙事的影响 |
|---|---|---|
| **BTC ETF 发行商** | 规模增长 | 推「数字黄金」相对优势 |
| **黄金矿业/ETF** | 金价维持高位 | 强调 BTC 波动与监管风险 |
| **央行** | 储备多元化 | 持续购金→金价地板 |
| **宏观基金** | 轮动 alpha | 9/21 EMA 等公开信号被 front-run |
| **数据/研报商** | 流量 | 放大 396 日/40 oz 等吸引眼球数字 |

# 资源与信息流

## 资金流：BTC ETF vs 黄金 ETF 轮动

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">ETF 流量分化 → 饼金比修复（资金流抽水图）</text>
  <rect x="40" y="50" width="280" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="180" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC ETF · 30 日 +12,909 BTC</text>
  <rect x="360" y="50" width="280" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="500" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">黄金 ETF · 30 日 −793K oz</text>
  <path d="M180 100 L180 140 L340 140 L340 180" stroke="#1d4ed8" stroke-width="1.5" fill="none" marker-end="url(#bgD)"/>
  <path d="M500 100 L500 140 L340 140" stroke="#b8730a" stroke-width="1.5" fill="none" marker-end="url(#bgE)"/>
  <rect x="240" y="180" width="200" height="50" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="340" y="205" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">相对轮动池</text>
  <text x="340" y="222" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">饼金比修复燃料</text>
  <text x="120" y="135" font-size="10" fill="#1d4ed8" font-family="sans-serif">净流入</text>
  <text x="520" y="135" font-size="10" fill="#b8730a" font-family="sans-serif">净流出</text>
  <defs>
    <marker id="bgD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/></marker>
    <marker id="bgE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#b8730a"/></marker>
  </defs>
</svg>
:::

**信息流路径**：现货/期货交易所 → 价格指数 → 比值图表 → 研报/KOL → 机构再平衡 → ETF 流量。**瓶颈**：金价基准（LBMA vs COMEX vs 期货）可差 1–2%【分析】。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「比值触底买 BTC 胜率 72%」？先和<strong>随机持币基准</strong>比——BTC 有正漂移。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="bgr_T" min="5" max="365" step="5" value="90"><output id="bgr_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="bgr_ps" min="50" max="90" step="0.1" value="72.0"><output id="bgr_psO">72.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="bgr_mu" min="0" max="100" step="1" value="50"><output id="bgr_muO">50%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="bgr_sg" min="30" max="100" step="1" value="65"><output id="bgr_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="bgr_base">67.7%</strong><span>—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="bgr_dp">+4.3 pp</strong><span>—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="bgr_n">59</strong><span>—</span></div>
<canvas id="bgrDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="bgr_v3">超额有限</strong><span id="bgr_v3h">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **分清相对 vs 绝对** | 比值涨 ≠ BTC 美元牛；看腿分解 |
| 2 | **跟踪中枢位移** | 用滚动 200 周均值，勿死守旧中枢 |
| 3 | **读 9/21 周 EMA** | 金叉=相对周期拐点【分析】 |
| 4 | **配 ETF 流量差** | BTC 入 + 黄金出 = 确认 |
| 5 | **BiG 公允偏离** | 实际 vs 模型公允比 |
| 6 | **漂移剥离胜率** | 任何信号先减基准 |
| 7 | **半衰期意识** | 216 日→别指望快回归 |
| 8 | **写腿分解日志** | 每次修复记录 BTC% vs 金% |
| 9 | **多场景压力测试** | 通胀冲击/ risk-off/ 无冲击 |
| 10 | **30 分钟三联检** | 算、比、判——§22 |

# 常见认知陷阱

:::details 1. 「BTC 涨 = 饼金比涨」
**错因**：黄金同涨可压制比值。**对策**：永远看双腿。
:::

:::details 2. 「均值回归一定发生」
**错因**：协整 p=0.44；半衰期 216 日【待验证】。**对策**：当中枢位移框架，非固定均值。
:::

:::details 3. 「12 oz 铁底」
**错因**：更高低点序列仍在形成，但不保证不再破。**对策**：看 9/21 EMA + 流量确认。
:::

:::details 4. 「396 日周期精确重复」
**错因**：样本 n=4；过度拟合【待验证】。**对策**：当参考，不当定律。
:::

:::details 5. 把 Morris 40 oz 目标当【事实】
**错因**：单一来源外推【待验证】。**对策**：标【待验证】，自建情景。
:::

:::details 6. 忽视修复腿来源
**错因**：2026 修复靠金价跌，非 BTC 牛。**对策**：§工具 4 腿分解。
:::

:::details 7. 用日线比值做日内
**错因**：半衰期数月。**对策**：周/月尺度。
:::

:::details 8. 忽视央行购金结构买盘
**错因**：金价地板抬高→比值天花板下移【推论】。**对策**：配 WGC 季度数据。
:::

:::details 9. 单指标 All-in
**错因**：公开信号被 trade against。**对策**：≥3 独立确认。
:::

:::details 10. 胜率不算漂移
**错因**：90 日随机持币基准 67.7%。**对策**：§12 漂移剥离器。
:::

:::details 11. 把 BiG 公允当精确预测
**错因**：模型依赖宏观假设【分析】。**对策**：看情景概率，非单点。
:::

:::details 12. 忽视穹顶/下降阻力
**错因**：Kinesis 指出仍处下降通道【分析】。**对策**：突破 20+ oz 才谈趋势反转。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 相对强弱 | BTC vs 黄金 ETF 表现 | 30 日相对收益 |
| 中枢 | 200 周均线 / BiG 公允 | TradingView 周线 |
| 位移 | 高点下移 + 低点上移 | 历次危机底部列表 |
| 修复腿 | 金价跌 vs BTC 涨 | 月度腿分解表 |
| 风险偏好 | 信用利差、VIX | FRED / Bloomberg |

# 从理论到行动

## 决策流程（非信号）

```
每周五 → 算饼金比 → 比滚动中枢 Z 偏离
       → 查 9/21 周 EMA 距离金叉还有几周
       → 读 BTC/黄金 ETF 30 日流量差
       → 腿分解：过去 30 日 BTC% vs 金%
       → 写 1 句判断：修复靠哪条腿？中枢是否在位移？
```

:::raw
<div class="tool">
<h3>工具 · 回撤修复模拟器</h3>
<p>分解<strong>谷底→当前</strong>修复：BTC 腿 vs 黄金腿各占多少。</p>
<div class="ctrl"><label>谷底比值 (oz)<input type="range" id="bgr_trough" min="10" max="15" step="0.1" value="12.3"><output id="bgr_troughO">12.3 oz</output></label></div>
<div class="ctrl"><label>当前比值 (oz)<input type="range" id="bgr_rcur" min="14" max="22" step="0.1" value="17.7"><output id="bgr_rcurO">17.7 oz</output></label></div>
<div class="ctrl"><label>BTC 腿 (%)<input type="range" id="bgr_rbtc" min="-30" max="50" step="1" value="22"><output id="bgr_btcleg">+22%</output></label></div>
<div class="ctrl"><label>黄金腿 (%)<input type="range" id="bgr_rgold" min="-30" max="30" step="1" value="-14"><output id="bgr_goldleg">−14%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">总修复</span><strong id="bgr_rec">+43.9%</strong><span id="bgr_rech">—</span></div>
<canvas id="bgrRecChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="bgr_v4">黄金腿主导修复</strong><span id="bgr_v4h">—</span></div>
</div>
</div>
:::

# 技能树

:::details L1 · 观察者（能算能读）
- 手算饼金比 = BTC ÷ 金价/oz
- 读懂 5 张必画 SVG
- 区分【事实】【推论】【待验证】
:::

:::details L2 · 关联者（能连能比）
- 腿分解：BTC% × 金% = 比值变化
- 中枢位移：旧中枢 Z vs 新中枢 Z
- 漂移剥离：信号胜率 − 随机基准
:::

:::details L3 · 模拟者（能演能测）
- 跑 BiG 三情景（无冲击/通胀/risk-off）
- 模拟 9/21 EMA 金叉后历史涨幅分布
- 压力测试：BTC −30% + 金 +20% → 比值？
:::

:::details L4 · 实践者（能记能迭代）
- 每周五比值 + 腿分解日志
- 30 天中枢位移追踪表
- 季度回顾：预测 vs 实际哪条腿主导
:::

# 游戏化世界

**角色**：宏观轮动侦探。你身处「金银双城」——BTC 城（高波动、高 β）与黄金城（避险、央行后盾）。**饼金比**是两城之间的汇率。

| 关卡 | 任务 | 奖励 |
|---|---|---|
| 1 | 算出今日饼金比 | 解锁「腿分解」技能 |
| 2 | 识别当前修复靠哪条腿 | 解锁「中枢位移」视野 |
| 3 | 预测 9/21 EMA 金叉日期 | 解锁「情景模拟」 |
| 4 | 连续 4 周日志无遗漏 | 解锁「漂移剥离」大师 |

**Boss 战**：在「双杀期」保持冷静——比值暴跌时分辨是黄金狂飙还是 BTC 崩盘，选择正确对冲腿。

# 任务系统

| 频率 | 任务 | 产出 |
|---|---|---|
| 每日 | 记录 BTC、金价、比值 | 电子表格 1 行 |
| 每周 | 腿分解 + 9/21 EMA 距离 | 周报 1 段 |
| 每月 | 比 BiG 公允偏离 | 月度偏差表 |
| 每季 | 回顾中枢是否位移 | 季度复盘 1 页 |

# 反事实模拟

:::tabs
@@情景 A · 黄金继续回调
金价从 $4,400 再跌 **10%** 至 $3,960，BTC 横盘 $78K：
- 新比值 = 78000/3960 = **19.7 oz**（+11%）
- **结论**：仅靠黄金腿可推比值至 20 附近，但非可持续牛市【推论】

@@情景 B · BTC 突破 $90K
BTC 涨至 $90,000，金价维持 $4,400：
- 新比值 = 90000/4400 = **20.5 oz**
- **结论**：突破 20 oz 穹顶阻力——趋势反转首证【分析】

@@情景 C · 双杀再现
BTC 跌至 $60K（−23%），金价涨至 $5,000（+14%）：
- 新比值 = 60000/5000 = **12.0 oz**
- **结论**：跌破 12.3 前低——中枢下移确认，更高低点叙事破灭【推论】

@@情景 D · 流动性宽松双赢
BTC +30% 至 $101K，金价持平：
- 新比值 = 101000/4400 = **23.0 oz**
- **结论**：接近 2025 局部峰，9/21 EMA 金叉后典型路径【待验证】
:::

# 四级能力路线

| 级别 | 能力 | 检验标准 |
|---|---|---|
| **L1 观察** | 算比值、读图表 | 30 秒内手算今日比值 |
| **L2 关联** | 腿分解、中枢 Z | 解释 2026 修复主因 |
| **L3 模拟** | 三情景压力测试 | 写出双杀情景比值 |
| **L4 实践** | 周日志 + 漂移剥离 | 连续 4 周无遗漏 |

# 30分钟最小实践

**目标**：建立你的第一张「饼金比 + 中枢」快照。

1. **5 分钟 · 算**：查 BTC 现货价与金价（CoinGecko + Kitco），手算比值
2. **10 分钟 · 比**：在工具 2 输入当前比值、旧中枢 25、新中枢 16、σ=8——记录 Z（旧）与 Z（新）
3. **10 分钟 · 腿分解**：查过去 30 日 BTC% 与金价%——判断修复靠哪条腿
4. **5 分钟 · 写**：一句话——「当前比值 __ oz，相对新中枢 __σ，修复主因是 __ 腿」

**验证**：把快照存进 `logs/` 或笔记；一周后重算，看中枢是否继续位移。

# 7天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 手算 3 个历史时点比值（2025-10/2026-02/今日） |
| D2 | 世界地图 | 默画九层结构关键词 |
| D3 | 因果 | 画双腿因果图（纸笔即可） |
| D4 | 中枢位移 | 工具 2 扫一遍 old=20/25/30 三种旧中枢 |
| D5 | 腿分解 | 工具 4 复现 2026-02→09 修复 |
| D6 | 漂移剥离 | 工具 3 试 90 日/180 日持有期 |
| D7 | 复盘 | 写 200 字：比值是均值回归还是中枢位移？ |

# 30天计划

| 周 | 重点 | 交付物 |
|---|---|---|
| W1 | 基础计算 + 历史高低点 | 10 个时点比值表 |
| W2 | 中枢位移 + Z 偏离 | 滚动 200 周均线偏离图（TradingView） |
| W3 | ETF 流量 + 9/21 EMA | 周线截图 + 金叉倒计时估算 |
| W4 | 综合日志 + 情景模拟 | 4 篇周报 + 1 份三情景压力测试 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | **饼金比** | BTC ÷ 金价/oz = 相对购买力 |
| 2 | **中枢位移** | 滚动均衡中心随 regime 迁移 |
| 3 | **腿分解** | 比值变 = BTC 腿 ÷ 黄金腿 |
| 4 | **9/21 周 EMA** | 相对周期金叉/死叉 |
| 5 | **396 日周期** | 熊周期长度对称【待验证】 |
| 6 | **BiG 公允比** | 宏观条件隐含公允比值 |
| 7 | **更高低点** | 危机底部序列抬升 |
| 8 | **半衰期** | 均值回归速度 ~216 日【待验证】 |
| 9 | **漂移剥离** | 信号胜率 − 随机持币基准 |
| 10 | **三情景矩阵** | 无冲击 / 通胀 / risk-off |

# 关键问题清单

:::details 读数层
- 今日饼金比是多少？相对 2026-09 基准 17.7 偏离多少？
- 过去 30 日修复靠 BTC 腿还是黄金腿？
- 当前比值在 200 周均线上方还是下方？
:::

:::details 结构层
- 旧中枢（~25 oz）与新中枢（~16 oz）哪个更适用？
- 9/21 周 EMA 距金叉还有几周？
- BiG 公允比 vs 实际：偏离有多大？
:::

:::details 风险层
- 若双杀再现（BTC −20% + 金 +10%），比值去哪？
- 央行购金放缓会改变金价地板吗？
- 协整不存在——你的均值回归假设站得住吗？
:::

:::details 行动层
- 比值信号的真实超额（扣除漂移）是多少？
- 需要多少独立样本才谈统计显著？
- 你的 30 分钟快照写了吗？
:::

# 下一阶段探索

1. **饼银比 / 铜金比**：扩展相对价值矩阵——BTC 是否只对黄金特殊？
2. **期权隐含相关**：BTC-Gold correlation 是否可交易？
3. **链上 + 宏观**：MVRV 与饼金比联合读周期——同向还是背离？
4. **中国视角**：沪金/离岸 BTC 比值 vs 国际比值价差
5. **机器学习**：中枢位移可用 HMM/regime switch 自动识别吗？

# 附录：数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 2025-10 比值 28.79 | 计算 | TokenIntel 2026-05-18 | 【待验证】 |
| 2026-02 谷底 12.31 | 计算 | TokenIntel / Bitcoin Weigh-In | 【待验证】 |
| 2026-09 比值 17.71 | 计算 | Bitcoin Weigh-In 月终数据 | 【待验证】 |
| 协整 p=0.44 | 学术检验 | WEEX 2026 转载 | 【分析】 |
| 半衰期 216 日 | 统计 | WEEX 2026 转载 | 【待验证】 |
| BiG 公允 21.1 | 模型 | WisdomTree 2026-03 | 【分析】 |
| 9/21 EMA 框架 | 研报 | Delphi Digital / KuCoin | 【分析】 |
| 396 日周期 | 技术分析 | TradingShot / FXStreet | 【待验证】 |
| Morris 40+ oz 目标 | 机构观点 | ByteTree / EarnPark | 【待验证】 |
| ETF 流量分化 | 市场数据 | Cointelegraph 2026-03 | 【待验证】 |

标记约定：**【事实】**一手或多源一致；**【分析】**机构判断；**【推论】**逻辑推导；**【假设】**未验证；**【待验证】**单一来源或二手链过长。

# 附录：免责声明 {.appendix}

本手册仅供认知与实践框架参考，**不构成任何投资建议**。BTC 与黄金均存在价格波动、流动性、监管与地缘风险。历史比值、周期对称与均值回归不构成未来表现保证。交互模型使用简化假设，结果可能与实际市场显著偏离。任何配置决策应结合自身风险承受能力，必要时咨询持牌专业人士。
