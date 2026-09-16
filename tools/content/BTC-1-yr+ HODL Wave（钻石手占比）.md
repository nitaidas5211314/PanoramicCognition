---
slug: BTC-1-yr+ HODL Wave（钻石手占比）
title: BTC-1-yr+ HODL Wave（钻石手占比）
subtitle: 用<strong>链上 UTXO 年龄</strong>读「钻石手」厚度——1yr+ 占比 ~61.4% 是慢变量，不是 conviction 证明，更不是择时扳机
brand_sub: Bitcoin × On-Chain × Supply Age
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, HODL Wave, 链上指标, 钻石手, Glassnode]
theme_js_file: BTC-1-yr+ HODL Wave（钻石手占比）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**1yr+ HODL Wave（钻石手占比）= 链上至少 1 年未移动的 BTC 供应 ÷ 流通供应。** Glassnode 称此指标为 **Supply Last Active 1+ Years Ago**【事实】。2026 年 6 月中旬约 **12.31M BTC（61.4%）** 落入此带【待验证】——意味着近四成供应在过去 12 个月内有过链上活动。

它度量的是 **UTXO 年龄分布**，不是持有人信念、不是交易所余额、更不是「永远不卖」的承诺【分析】。老币带增厚可反映积累与休眠；骤降常伴牛市末段老币换手——但**内置 ≥365 天滞后**，只能当宏观慢镜头，不能当周度信号。

# 这个领域到底是什么

## 一句话定位

「BTC-1yr+ HODL Wave」研究的是：**用链上币龄结构衡量长期休眠供应占比、及其在周期中的演化与误读边界**。它是 HODL Waves 家族中最常被社交媒体简称为「钻石手占比」的累积阈值指标。

:::note red 先划清边界
本手册**不提供**「1yr+ 到 X% 就买卖」的信号。年龄 ≠ 意图；丢失的私钥与坚定的 HODL 在链上看起来一模一样【事实】。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 1yr+ 供应占比定义、HODL Waves 结构、与 LTH/STH 区别、周期读法 |
| 2 | 边界在哪 | 不含订单簿；不识别场外 OTC；不证明「谁在买」 |
| 3 | 核心对象 | UTXO、币龄、供应带、累积阈值、实体调整供应 |
| 4 | 参与者 | 长期持有者、ETF 托管商、矿工、Glassnode、VanEck 链上团队、批评者 |
| 5 | 关键变量 | 1yr+%、6–12m 带、LTH 供应（155d+）、CDD、ETF 净流入 |
| 6 | 可观察的 | 链上 UTXO 集、Glassnode 面板、VanEck ChainCheck |
| 7 | 不可观察但可推断 | 丢失币占比、交易所内部划转、custody 迁移意图 |
| 8 | 谁影响谁 | 积累→年轻带→1yr 后增厚；派发→老带骤降→年轻带膨胀 |
| 9 | 因果 | 链上转移重置年龄 = 【事实】；高 1yr+→价涨 = 【推论】 |
| 10 | 只是相关 | 1yr+ 与价格周期共线——非独立领先变量 |
| 11 | 表层现象 | 「钻石手 70% 永不出售」社媒口号 |
| 12 | 底层机制 | UTXO 时钟 + 成熟滞后 + 结构性漂移（丢失币） |
| 13 | 反馈 | 厚钻石手→稀缺叙事→买盘→价涨→更多派发诱惑 |
| 14 | 时间延迟 | 今天买入需 **365 天** 才进入 1yr+ 带 |
| 15 | 正负反馈 | 正：积累增厚→供给冲击；负：牛市派发→年轻带膨胀→滞后见顶 |

## 1yr+ 与 HODL Waves / LTH 的区别

| 指标 | 口径 | 阈值 | 用途 |
|---|---|---|---|
| **1yr+ 累积** | 所有 ≥1 年未动供应 / 流通量 | 365 天 | 宏观「钻石手厚度」 |
| **HODL Waves** | 12 个**互斥**年龄带堆叠 | <1d … >10yr | 看结构迁移，非单线 |
| **LTH 供应** | 实体调整后 ≥155 天未花 | **155 天** | 行为统计分界，更灵敏 |
| **STH 供应** | <155 天 | 155 天 | 短期抛压池 |

Glassnode 指出：LTH 供应**进慢出快**——新币须沉睡 155 天才「毕业」，但一经卖出立刻归零进 STH【事实】。1yr+ 比 LTH 更钝、更滞后，但社媒传播更广【分析】。

# 为什么值得研究

## 理由一：「钻石手」是链上入门叙事的核心隐喻

不懂 1yr+ 就无法阅读 80% 的 BTC 周期推文与研报图表。它把抽象的「长期持有」变成一条可追踪的百分比曲线。

## 理由二：2024–2026 ETF 时代正在 live test 旧读法

现货 ETF 引入托管商冷钱包轮换、机构再平衡——**链上年龄可重置而无经济卖出**【分析】。VanEck 2026-06 报 1yr+ **61.4%**，同比仅 **-0.4%**——在价格大幅波动年份仍「平顶」，说明 ETF 结构正在改变传统周期振幅【待验证】。

## 理由三：学会「厚度 ≠ 择时」

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「1yr+>65% 买入 72% 胜率」真实超额 |
|---|---|---|---|
| 30 日 | — | **54.3%** | 表面 +18 pp → 真实 **+17.7 pp** |
| 90 日 | — | **67.7%** | 表面 +4 pp → 真实 **+4.3 pp** |
| 180 日 | — | **74.2%** | 表面 +2 pp → 真实 **~+2 pp** |

**任何「高钻石手占比买入」都要和对照基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 UTXO 时钟，到「钻石手」图表

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-1yr+ HODL Wave · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「链上硬数据」，越靠下越「叙事/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① UTXO 账本层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">每枚币带「上次移动」时间戳 · 供应 ~19.95M</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：年龄≠所有权、≠卖出</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 年龄分带层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">HODL Waves 12 互斥带 · 暖色=年轻 · 冷色=年老</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">1yr+ 是累积阈值，非单一色带</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 累积阈值层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">Supply Last Active 1+/2+/3+/5+ Yrs</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">5y+ 币也计入 1yr+——嵌套关系</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 实体调整层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">聚类已知交易所/矿工/ETF 实体</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：BIS 警告解读可差 6×【分析】</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 成熟滞后层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">新积累须 365 天才进 1yr+ · 天生慢变量</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：无法读「本周抄底力度」</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 结构漂移层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">丢失币永久推高 1yr+ · 长期结构性上行</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">Glassnode 称指标会自然漂移更高【事实】</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 周期对照层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">牛顶派发→1yr+ 降 · 熊底积累→1yr+ 升</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">须看 aged-in vs spent-out 构成</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「钻石手 70%」口号 · 截图单线曲线</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：混淆 1yr+ 与 LTH(155d)</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">1yr+ 当周期仪表盘，不当扳机</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">配 ETF 流、CDD、MVRV、SOPR</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">1yr+ HODL Wave · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 供给稀缺叙事</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 时间偏好分层</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 周期成熟/派发</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 库存老化模型</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• UTXO 时钟重置</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 365d 成熟闸门</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• aged-in / spent-out</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 丢失币结构性抬升</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 读 Glassnode 1yr+ 面板</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 拆 VanEck 老化表</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 配 LTH/CDD 交叉</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• §12 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#hwA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#hwA)"/>
  <defs><marker id="hwA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 1yr+ 的关系 |
|---|---|---|
| **Unchained Capital / Dhruv Bansal** | 2018 提出 HODL Waves 可视化 | 原创叙事框架【事实】 |
| **Glassnode** | 指标基础设施与实体调整 | 定义 Supply Last Active 1+ Yrs |
| **VanEck (Matthew Sigel)** | 月度 ChainCheck 老化分解 | 公开 aged-in/spent-out 表【待验证】 |
| **ETF 托管商** | 冷钱包轮换 | 可重置 UTXO 年龄而无经济卖出【推论】 |
| **长期持有者 (LTH)** | 低换手冷存储 | 驱动 1yr+ 增厚 |
| **矿工** | 新供应 + 抛售 | 持续注入年轻带 |
| **链上 KOL** | 「钻石手」传播 | 混淆年龄与信念 |
| **BIS 研究者** | 方法论批评 | 链上解读精度有限【分析】 |

# 核心变量

| 变量 | 定义 | 2026-06 量级【待验证】 |
|---|---|---|
| **1yr+ 供应占比** | ≥1 年未动 / 流通供应 | **61.4%**（12.31M BTC） |
| **<1yr 年轻供应** | 互补项 | **38.6%** |
| **6m–12m 带** | 即将「毕业」进 1yr+ | 月环比 **+31%** 成熟潮【待验证】 |
| **LTH 供应 (155d+)** | 行为分界版钻石手 | ~**~68%**【待验证】 |
| **3y–5y 带余额** | 中期老币 | 同比 **-30.7%**【待验证】 |
| **CDD** | 币天销毁 | 派发侧证 |
| **ETF 净流入** | 机构需求 | 与 1yr+ 结构交互【推论】 |

:::raw
<div class="tool">
<h3>工具 · 1yr+ 占比仪表盘</h3>
<p>读 <strong>Supply Last Active 1+ Years Ago</strong> 占流通供应比例。默认 2026-06 VanEck 报 <strong>61.4%</strong>。</p>
<div class="ctrl"><label>1yr+ 占比 (%)<input type="range" id="hodl_share_pct" min="45" max="72" step="0.1" value="61.4"><output id="hodl_share_pctO">61.4%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">年轻供应 (&lt;1yr)</span><strong id="hodl_share_young">38.6%</strong></div>
<div class="ro"><span class="k">1yr+ 绝对量</span><strong id="hodl_share_btc">12.24M BTC</strong></div>
<canvas id="hodlShareChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="hodl_share_v">偏厚钻石手</strong><span id="hodl_share_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">1yr+ HODL Wave 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="90" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">链上转移/休眠</text>
  <rect x="200" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="260" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">UTXO 年龄</text>
  <rect x="370" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="430" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">1yr+ 占比</text>
  <rect x="540" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="600" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">稀缺叙事</text>
  <rect x="120" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="190" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">熊市积累</text>
  <text x="190" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">年轻→1yr+ 成熟</text>
  <rect x="400" y="150" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="470" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">牛市派发</text>
  <text x="470" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">老币花出→年轻带胀</text>
  <rect x="260" y="250" width="160" height="44" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="340" y="278" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">365 天成熟滞后</text>
  <path d="M150 72 L200 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#hwB)"/>
  <path d="M320 72 L370 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#hwB)"/>
  <path d="M490 72 L540 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#hwB)"/>
  <path d="M190 94 L260 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#hwB)"/>
  <path d="M470 94 L430 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#hwB)"/>
  <path d="M340 150 L340 250" stroke="#454c56" stroke-width="1.5" marker-end="url(#hwB)"/>
  <path d="M600 94 L470 150" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#hwC)"/>
  <path d="M190 150 L260 94" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#hwC)"/>
  <defs>
    <marker id="hwB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="hwC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：链上转移重置 UTXO 时钟（【事实】）；1yr+ 变化滞后积累/派发 **至少 1 年**（【事实】）。红色反馈：厚钻石手叙事→买盘→价格→派发诱惑→1yr+ 未来下降。

# 隐藏关系

## 隐藏关系一：1yr+ 与价格共线 ≠ 预测力

1yr+ 是存量结构——与周期阶段高度相关，但**非价格领先指标**【分析】。2021 顶前 1yr+ 已开始下降，但领先数月而非数周【待验证】。

## 隐藏关系二：丢失币 = 永恒钻石手

Satoshi 币、早期矿工丢失钱包永远计入 1yr+，**结构性抬高底线**【推论】。Glassnode 明确：指标会随丢失币积累**自然漂移更高**【事实】——勿把长期上行误读为「越来越坚定」。

:::raw
<div class="tool">
<h3>工具 · 成熟滞后计算器</h3>
<p>新积累多久才能让 <strong>1yr+</strong> 明显增厚？内置 <strong>365 天</strong> 成熟闸门。</p>
<div class="ctrl"><label>年轻带月成熟率 (%)<input type="range" id="hodl_lag_acc" min="0.5" max="5" step="0.1" value="2.0"><output id="hodl_lag_accO">2.0%/月</output></label></div>
<div class="ctrl"><label>1yr+ 月派发率 (%)<input type="range" id="hodl_lag_spend" min="0.1" max="2" step="0.1" value="0.5"><output id="hodl_lag_spendO">0.5%/月</output></label></div>
<div class="ctrl"><label>起始 1yr+ (%)<input type="range" id="hodl_lag_start" min="50" max="68" step="0.1" value="61.4"><output id="hodl_lag_startO">61.4%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">增厚 +3pp 需</span><strong id="hodl_lag_months">—</strong><span>个月</span></div>
<div class="ro"><span class="k">预期增量</span><strong id="hodl_lag_delta">—</strong></div>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="hodl_lag_v">—</strong><span id="hodl_lag_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | 1yr+ HODL 领域 | 其他领域 |
|---|---|---|
| **库存老化** | UTXO 成熟进老带 | 应收账款账龄、葡萄酒陈年 |
| **队列延迟** | 365d 闸门 | 制造 WIP、疫苗免疫窗口 |
| **丢失库存** | 丢失币永久老带 | 报废备件、沉没成本 |
| **cohort 分析** | HODL Waves 分带 | 人口金字塔、客户留存曲线 |
| **慢变量+快反馈** | 1yr+ vs 价格 | 气候 vs 天气、库存 vs 订单 |

# 系统运行机制

## 四阶段循环

1. **积累期**：价格低迷，年轻带持续成熟进 1yr+，占比缓升（6m–12m 带先胀）
2. **厚顶期**：1yr+ 达周期高位（常 60–68%），「供应锁定」叙事最强
3. **派发期**：LTH 获利卖出，老带骤降、年轻带膨胀——**1yr+ 滞后见顶**
4. **重置期**：熊市换手完成，新积累重新开始成熟循环

:::note amber 看构成，不只看 headline
VanEck 2026-06：3y–5y 带过去一年流出 3.31M BTC 中，**55% 是 aged-out（升入更老带）**，仅 **45% 是真正 spent（转移）**【待验证】——headline 下降不等于全面抛售。
:::

# 时间演化

## 周期演化：1yr+ 与牛熊错位

| 阶段 | 年月 | 1yr+ 特征【待验证】 | 机制 |
|---|---|---|---|
| 2018 熊底 | Dec 2018 | ~55% 附近 | 积累启动，6m–12m 先胀 |
| 2021 顶 | Nov 2021 | 从高位回落 | LTH 派发，年轻带膨胀 |
| 2022 底 | Nov 2022 | 重新攀升 | 熊市静默成熟 |
| 2024 ETF | Jan 2024 | 平顶震荡 | 托管结构改变振幅 |
| 2026-06 | Jun 2026 | **61.4%** | 同比 -0.4%，近乎平顶 |

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">1yr+ HODL Wave 周期演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="100" cy="100" r="6" fill="#0f8a4d"/><text x="100" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2018底</text><text x="100" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">积累启动</text>
  <circle cx="220" cy="100" r="6" fill="#d5342c"/><text x="220" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021顶</text><text x="220" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">1yr+回落</text>
  <circle cx="340" cy="100" r="6" fill="#0f8a4d"/><text x="340" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022底</text><text x="340" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">重新增厚</text>
  <circle cx="460" cy="100" r="6" fill="#1d4ed8"/><text x="460" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">ETF</text><text x="460" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">2024-01</text>
  <circle cx="580" cy="100" r="6" fill="#b8730a"/><text x="580" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026</text><text x="580" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">61.4%平顶</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">滞后 ≥1 年 · ETF 压缩振幅 · 丢失币抬升底线</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 1yr+ 的影响 |
|---|---|---|
| **数据商** | 指标知名度→订阅 | 推「钻石手」简化叙事 |
| **ETF 发行商** | 规模增长 | 托管轮换扰动年龄结构 |
| **LTH** | 最大化终值 | 低换手→1yr+ 增厚 |
| **矿工** | 现金流 | 持续注入年轻供应 |
| **媒体/KOL** | 流量 | 「XX% 永不出售」标题党 |

# 资源与信息流

## 供应老化与派发「抽水」

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">供应老化流 · 资金流抽水图</text>
  <rect x="40" y="50" width="260" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="170" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">年轻带 &lt;1yr · 38.6%</text>
  <rect x="380" y="50" width="260" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="510" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">钻石手 1yr+ · 61.4%</text>
  <path d="M170 100 L170 140 L340 140 L510 100" stroke="#0f8a4d" stroke-width="1.5" fill="none" marker-end="url(#hwD)"/>
  <text x="250" y="135" font-size="10" fill="#0f8a4d" font-family="sans-serif">aged-in（成熟升格）</text>
  <path d="M510 100 L510 140 L340 140 L170 100" stroke="#d5342c" stroke-width="1.5" fill="none" marker-end="url(#hwE)"/>
  <text x="430" y="155" font-size="10" fill="#d5342c" font-family="sans-serif">spent-out（老币花出）</text>
  <rect x="200" y="180" width="280" height="50" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="340" y="210" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">可交易流动池 · 现货 + ETF 申赎</text>
  <text x="340" y="250" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">净流向 = aged-in − spent-out − 矿工新铸</text>
  <defs>
    <marker id="hwD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
    <marker id="hwE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**信息流路径**：全节点 → 索引商（Glassnode）→ 仪表盘/API → VanEck ChainCheck → KOL → 交易者预期。**瓶颈**：实体聚类算法不同，同指标可差数倍【分析】。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「1yr+&gt;65% 买入胜率 72%」？先和<strong>随机持币基准</strong>比——BTC 有正漂移。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="hodl_T" min="5" max="365" step="5" value="90"><output id="hodl_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="hodl_ps" min="50" max="90" step="0.1" value="72.0"><output id="hodl_psO">72.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="hodl_mu" min="0" max="100" step="1" value="50"><output id="hodl_muO">50.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="hodl_sg" min="30" max="100" step="1" value="65"><output id="hodl_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="hodl_base">67.7%</strong><span id="hodl_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="hodl_dp">+4.3 pp</strong><span id="hodl_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="hodl_n">906</strong><span id="hodl_nh">—</span></div>
<canvas id="hodlDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="hodl_v3">超额有限</strong><span id="hodl_v3h">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **分清年龄与信念** | UTXO 时钟 ≠ conviction |
| 2 | **读构成不读 headline** | aged-in vs spent-out 分解 |
| 3 | **尊重 365d 滞后** | 勿当周内信号 |
| 4 | **区分 1yr+ 与 LTH(155d)** | 两指标不可互换 |
| 5 | **配 CDD/SOPR** | 单线曲线不交易 |
| 6 | **漂移剥离胜率** | 任何信号先减基准 |
| 7 | **盯 6m–12m 先导带** | 比 1yr+ 早 6–12 个月 |
| 8 | **ETF 流交叉验证** | 托管轮换扰动年龄 |
| 9 | **写周期平顶日志** | 每季记录 1yr+ 与同比 |
| 10 | **30 分钟三联检** | 算、比、判——§22 |

# 常见认知陷阱

:::details 1. 「钻石手 = 永远不卖」
**错因**：年龄只度量休眠，丢失币与坚定 HODL 不可分。**对策**：读 spent-out 构成，不读口号。
:::

:::details 2. 「1yr+ 越高越看涨」
**错因**：丢失币结构性抬升底线；高位也可能是「涨不动了」。【对策】看增速与构成，非绝对值。
:::

:::details 3. 把 1yr+ 当领先指标
**错因**：内置 365d 滞后。**对策**：用 6m–12m 带或 LTH(155d) 作先导。
:::

:::details 4. 混淆 1yr+ 与 LTH 供应
**错因**：阈值 365d vs 155d，数值与灵敏度完全不同。**对策**：面板对照，勿混读。
:::

:::details 5. 忽视交易所内部划转
**错因**：custody 迁移重置年龄而无经济卖出【事实】。**对策**：读实体调整版 + ETF 公告。
:::

:::details 6. 「1yr+ 下降 = 立刻崩盘」
**错因**：55% 流出可能是 aged-out 升入更老带【待验证】。**对策**：VanEck 式分解表。
:::

:::details 7. 忽视丢失币漂移
**错因**：指标长期趋势上行≠信念增强。**对策**：同时看 1yr+ 与 5yr+ 利差。
:::

:::details 8. 单指标 All-in
**错因**：公开指标被 trade against。**对策**：≥3 独立信号一致。
:::

:::details 9. 把二手数字当【事实】
**错因**：61.4% 来自 VanEck 二手引用 Glassnode。【对策】：标【待验证】，回原始面板。
:::

:::details 10. 胜率不算漂移
**错因**：BTC 随机做多 90 日基准 **67.7%**。**对策**：§12 漂移剥离器。
:::

:::details 11. 用 1yr+ 做日内
**错因**：日频变化极微。**对策**：月/季尺度观察。
:::

:::details 12. 忽视 ETF 结构变迁
**错因**：机构托管改变传统周期振幅【推论】。**对策**：2024 后单独建基准。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 钻石手厚度 | 「供应被锁定」讨论 | 1yr+ = 61.4% |
| 成熟滞后 | 「抄底多久才见效」 | 6m–12m 带 +31% m/m【待验证】 |
| 派发压力 | 老币获利了结 | CDD spike、1yr+ 同比转负 |
| 结构漂移 | 丢失币底线抬升 | 5yr+ 持续上行 |

# 从理论到行动

**决策漏斗**（自上而下）：

1. **宏观**：流动性周期方向？
2. **链上结构**：1yr+ 处于历史分位？同比变幅？
3. **分解**：aged-in vs spent-out 谁主导？
4. **确认**：LTH 供应、CDD、ETF 流、SOPR 同向？
5. **执行**：仓位与持有期匹配**月/季**尺度——非阈值一碰就动

# 技能树

:::details L1 · 观察者
- [ ] 解释 1yr+ = Supply Last Active 1+ Yrs / 流通供应
- [ ] 区分 1yr+ 累积 vs HODL Waves 互斥带
- [ ] 说出 365d 成熟滞后含义
:::

:::details L2 · 分析师
- [ ] 读 VanEck 老化分解表
- [ ] 复述 2026-06 61.4% 数据与局限
- [ ] 用 §12 剥离 72% 胜率
:::

:::details L3 · 建模者
- [ ] 对比 1yr+ vs LTH(155d) 走势
- [ ] 建 6m–12m 先导仪表盘
- [ ] 写 CDD+ETF 辅助规则
:::

:::details L4 · 系统设计者
- [ ] 多信号投票系统（禁单指标）
- [ ] 每季自动记录 1yr+ 同比
- [ ] 年度回测 aged-in/spent-out 构成
:::

# 游戏化世界

**角色**：链上供应考古学家（Supply Archaeologist）。等级越高，越不信「钻石手」口号，越会看构成。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 61.4% × 19.95M ≈ 12.24M BTC | 解锁「UTXO 层」 |
| Lv.2 | 向朋友解释 365d 滞后 | 解锁「成熟计算器」 |
| Lv.3 | 算出 90 日真实超额 <5pp | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周记录 1yr+ 同比 | 解锁「老化分解」 |
| Lv.5 | 写一页「1yr+ 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘价 | 7 日表 |
| 每周 | 更新 1yr+ 与 LTH 供应 | §06 工具截图 |
| 每月 | 读一篇 HODL Wave 批评/辩护 | 3 行摘要 |
| 每季 | 核对 VanEck ChainCheck 老化表 | 与 Glassnode 误差 <1pp |
| 每年 | 记录周期 1yr+ 峰/谷 | 与 §10 表对照 |

# 反事实模拟

:::tabs
@@情景 A · 若无 365d 成熟滞后
1yr+ 将实时反映积累——指标更灵敏但也更噪。**反事实：指标设计故意钝化，不适合周度交易**。

@@情景 B · 若无丢失币
1yr+ 底线更低，周期振幅更大——当前 61% 可能相当于旧周期 55%【假设】。**结构性漂移掩盖周期位置**。

@@情景 C · 若无 ETF 托管轮换
UTXO 年龄更忠实反映持有人行为——2024 后 1yr+「平顶」可能不会出现【推论】。

@@情景 D · 若只看 LTH(155d)
对派发更敏感，可提前 6–9 个月见转折——但噪声更大，需配平滑【假设】。
:::

:::raw
<div class="tool">
<h3>工具 · 老化流动模拟器</h3>
<p>24 个月内 <strong>aged-in</strong> 与 <strong>spent-out</strong> 双轨推演 1yr+ 轨迹。</p>
<div class="ctrl"><label>年轻带月成熟率 (%)<input type="range" id="hodl_flow_mat" min="0.5" max="4" step="0.1" value="2.0"><output id="hodl_flow_matO">2.0%/月</output></label></div>
<div class="ctrl"><label>1yr+ 月派发率 (%)<input type="range" id="hodl_flow_spend" min="0.1" max="2" step="0.1" value="0.5"><output id="hodl_flow_spendO">0.5%/月</output></label></div>
<div class="ctrl"><label>起始 1yr+ (%)<input type="range" id="hodl_flow_start" min="50" max="68" step="0.1" value="61.4"><output id="hodl_flow_startO">61.4%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">24 月后 1yr+</span><strong id="hodl_flow_end">—</strong></div>
<div class="ro"><span class="k">累计 aged-in</span><strong id="hodl_flow_aged">—</strong></div>
<div class="ro"><span class="k">累计 spent-out</span><strong id="hodl_flow_spent">—</strong></div>
<canvas id="hodlFlowChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="hodl_flow_v">—</strong><span id="hodl_flow_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会读 1yr+** | 3 天 | 定义/滞后/LTH 区别 | 口算 12.24M BTC |
| **L2 会拆构成** | 1 周 | aged-in/spent-out 叙事 | 漂移剥离器实操 |
| **L3 会修偏差** | 2 周 | 6m–12m 先导 + ETF 交叉 | 双指标对照 |
| **L4 会迭代系统** | 1 月+ | 多信号+季频日志 | 连续 2 季无口号交易 |

# 30 分钟最小实践

**任务**：完成「1yr+ 三联检」——算、比、判。

1. **8 分钟 · 手算绝对量**：61.4% × 19.95M ≈ **12.25M BTC** 在 1yr+ 带。
2. **7 分钟 · 成熟滞后**：§08 计算器，月成熟 2%、派发 0.5% → 增厚 +3pp 约需 **14 个月**。
3. **8 分钟 · 漂移剥离**：§12 工具，90 日 72% 胜率 → 真实超额仅 **+4.3 pp**，需 **n≈906**。
4. **7 分钟 · 结论**：写三句话——(a) 当前 1yr+ 区间 (b) 滞后含义 (c) ETF/丢失币一条观察。**禁止写「钻石手永不出售」。**

**验证**：1yr+ 占比与 §06 默认读数误差 **<0.1pp**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Glassnode HODL Waves + 1yr+ 指南 |
| D2 | 区别 | 对照 1yr+ vs LTH(155d) 面板 |
| D3 | 批评 | Bitzo 2026 UTXO 局限文 + BIS 各 3 条 |
| D4 | 工具 | §06–§20 四个交互模型 |
| D5 | 历史 | 对照 2018/2021/2024 1yr+ 转折 |
| D6 | ETF | 记录 7 日现货 ETF 净流入 |
| D7 | 合成 | 1 页「1yr+ 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：1yr+ 定义 + 滞后 + HODL Waves 结构（L1）
**Week 2**：构成分解 + 漂移剥离 + 周期读法（L2）
**Week 3**：6m–12m 先导 + LTH 交叉 + ETF 修正（L3）
**Week 4**：个人季频仪表盘 + 同比日志 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **1yr+ 累积阈值** | ≥365d 未动 / 供应 | 含丢失币 |
| 2 | **HODL Waves** | 12 互斥年龄带 | 非单线「钻石手」 |
| 3 | **LTH/STH (155d)** | 行为统计分界 | 与 1yr+ 不可混 |
| 4 | **成熟滞后** | 365d 闸门 | 非实时信号 |
| 5 | **aged-in / spent-out** | 构成分解 | headline 误导 |
| 6 | **6m–12m 先导带** | 早 6–12 个月 | 噪声更大 |
| 7 | **CDD** | 币天销毁 | 与 1yr+ 互补 |
| 8 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 9 | **结构漂移** | 丢失币抬升底线 | 误读为信念 |
| 10 | **实体调整** | 交易所聚类 | 方法论信任 |

# 关键问题清单

:::details 链上
- 当前 1yr+ 占比？同比变幅？
- 6m–12m 带方向？LTH 供应是否一致？
- aged-in vs spent-out 谁主导？
:::

:::details 周期
- 1yr+ 处于历史分位？
- 是否在「平顶」区间？
- 5yr+ 是否持续上行（丢失币）？
:::

:::details 宏观
- ETF 7 日净流入？
- CDD 是否 spike？
- SOPR LTH 是否 >1？
:::

:::details 决策
- 信号胜率是否扣过漂移？
- 样本量是否够？
- 是否 ≥3 信号一致？
:::

# 下一阶段探索

1. **动态 LTH 阈值（114d 提案）**：比固定 155d 更灵敏？【假设】
2. **Realized Cap HODL Waves**：按成本而非年龄分带——与价格周期错位读法
3. **ETF 实体剔除版 1yr+**：托管轮换噪声能否过滤？
4. **1yr+ 分位 + MVRV 联合**：厚钻石手 + 低 MVRV 是否优于单信号？【假设】
5. **跨链对比**：ETH 1yr+ 是否有可比周期，或仅 BTC UTXO 模型有效？

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| HODL Waves 定义 | 指标文档 | Glassnode Docs | 【事实】 |
| Supply Last Active 1+ Yrs | 指标文档 | Glassnode Studio | 【事实】 |
| 2026-06 1yr+ 61.4% | 行业分析 | VanEck ChainCheck 2026-06 | 【待验证】 |
| LTH 155d 阈值 | 研究文章 | Glassnode Follow the Smart Money | 【事实】 |
| 丢失币结构漂移 | 指标文档 | Glassnode 1yr+ 说明 | 【事实】 |
| aged-in/spent-out 分解 | 行业分析 | VanEck 2026-06 老化表 | 【待验证】 |
| UTXO 年龄局限 | 媒体 | Bitzo 2026-08 | 【分析】 |
| BIS 链上精度批评 | 央行研究 | BIS 工作论文 | 【分析】 |
| 6m–12m 成熟潮 +31% m/m | 行业分析 | VanEck ChainCheck 2026-06 | 【待验证】 |
| 3y–5y 同比 -30.7% | 行业分析 | VanEck ChainCheck 2026-06 | 【待验证】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；1yr+ HODL Wave 及任何链上年龄阈值均**不保证**未来价格路径，且**无法区分**丢失币与坚定持有。历史周期读法在 ETF 时代可能**结构性失效**，请勿依据单一指标进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
