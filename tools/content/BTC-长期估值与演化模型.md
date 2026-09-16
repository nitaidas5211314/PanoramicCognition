---
slug: BTC-长期估值与演化模型
title: BTC-长期估值与演化模型
subtitle: 比特币的长期价格不是「一个公式算出来的」，而是<strong>固定供给 × 流动供给 × 需求曲线 × 矿工地板 × 制度摩擦</strong>五层机制叠出的均衡——本手册教你怎么拆、怎么验、怎么不被 S2F 图表骗。
brand_sub: Bitcoin × Valuation × Evolution
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, 估值, S2F, 减半, 矿工, ETF]
theme_js_file: BTC-长期估值与演化模型.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**BTC 的长期估值 = 在 2100 万枚硬顶约束下，每日新增流量 shrinking + 流动供给被锁仓 + 边际买家愿意付的美元 ÷ 可交易 float。** 减半只改 supply 侧的一个旋钮；真正决定价格路径的是 demand 曲线形状、流动供给收缩速度，以及矿工/ETF/监管构成的制度摩擦。

2024 年 4 月第四次减半后，日产量约 **450 BTC**、流通量约 **19.69M**【事实】。2025 年网络算力突破 **1.1 ZH/s**，手续费占区块奖励不足 **1%**【待验证】——矿工几乎完全靠补贴 + 币价活命。Shelton (2024) 对 S2F 模型的正式检验显示：样本内显著，**加入时间固定效应后系数归零**，样本外 OOS R² 仅 **0.031**、Clark-West t 统计量 **0.11**【分析】。

所以这份手册的主线：**把「稀缺叙事」拆成可观测变量，把每个估值公式放进对照基准里验。**

# 这个领域到底是什么

## 一句话定位

「BTC 长期估值与演化模型」研究的是：**在供给几乎完全可预测的前提下，价格如何在 decades 尺度上形成、漂移、崩溃与再生**。它不是技术分析，也不是链上指标大全——它是一套**机制地图 + 可 falsify 的量化框架**。

:::note red 先划清边界
本手册**不提供**「2030 年 BTC = $X」的确定性预测。任何给出单点目标价而不附参数区间、样本外检验与对照基准的模型，默认当作叙事而非科学。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 比特币长期均衡价形成机制、减半周期演化、估值模型有效性 |
| 2 | 边界在哪 | 不含短线交易信号；不预测监管突变；不讨论具体交易所操作 |
| 3 | 核心对象 | UTXO 存量、流动供给 float、日产量 flow、边际需求曲线 |
| 4 | 参与者 | 矿工、长期持有者、ETF/机构、交易所、稳定币通道、监管者 |
| 5 | 关键变量 | stock、flow、S2F、liquid supply、hashprice、ETF 净流入、real rate |
| 6 | 可观察的 | 链上 UTXO 年龄、算力/难度、ETF 持仓、现货价、手续费占比 |
| 7 | 不可观察但可推断 | 真实 float、丢失币数量、场外 OTC 流量、矿工卖压 |
| 8 | 谁影响谁 | 减半→flow↓→S2F↑；锁仓→float↓→价格弹性↑；算力↑→安全↑→叙事↑ |
| 9 | 因果 | 流动供给收缩 + 需求上升 → 均衡价上升；**减半 alone 不保证涨价** |
| 10 | 只是相关 | S2F 与价格、算力与价格、ETF 流入与次日涨跌——多数只是共趋势 |
| 11 | 表层现象 | 四年周期、减半 rally、ETF 获批、矿工投降 |
| 12 | 底层机制 | 垂直供给曲线 + CES/logistic 需求 + 非线性锁仓 + 矿工成本地板 |
| 13 | 反馈 | 涨价→矿工卖压↑→短期供给↑；锁仓→float↓→波动↑→吸引投机 |
| 14 | 时间延迟 | 减半影响 6–18 个月；ETF 机构化以年计；丢失币估计误差以 decade 计 |
| 15 | 正负反馈 | 正：FOMO→锁仓→更稀缺；负：高算力→成本地板→矿工抛售 |

## 三类模型必须分开

:::cards g3
### 供给派（S2F / 减半）

「越挖越少 → 越贵。」

**强项**：2100 万硬顶是代码级【事实】。**弱项**：S2F 与 log(时间) 相关 **80.57%**【分析】——可能只是时间趋势的换皮。

### 需求派（Metcalfe / 采用曲线）

「网络越大 → 越贵。」

**强项**：用户数与市值有经济直觉。**弱项**：Shanaev et al. (2019) 指出高 R² 可能来自**共同随机趋势**【分析】。

### 均衡派（Rudd-Porter / ARK）

「供给垂直 + 需求曲线交点。」

**强项**：参数可解释、可 stress test。**弱项**：参数不确定度极大——2036 年 50% 分位 **$517 万** vs 基准情景差一个数量级【待验证】。
:::

# 为什么值得研究

## 理由一：供给侧几乎完全可计算

全球 99% 的资产供给由人类/央行决定；BTC 的 **flow 由代码写死**。第四次减半（2024-04-20）后 block reward = **3.125 BTC**，日产量 ≈ **450 BTC**【事实】。这意味着你可以**精确画出未来 115 年的 supply 路径**——这是任何其他资产做不到的。

| 减半次序 | 预计时间 | 日产量 (BTC) | 存量约 (M) | S2F |
|---|---|---|---|---|
| 第 4 次（已过） | 2024-04 | 450 | 19.69 | **120** |
| 第 5 次 | ~2028-04 | 225 | 20.34 | **248** |
| 第 6 次 | ~2032-04 | 113 | 20.67 | **503** |

**S2F 翻倍不等于价格翻倍**——这是本手册要反复锤的一点。

## 理由二：估值模型的「伪精确」最危险

S2F 图表在社交媒体上传播极广，但 Shelton (2024) 的 walk-forward 检验表明：**样本外无法拒绝「无预测力」原假设**。更致命的是：S2F 估计值与「创世块以来天数的对数」Pearson 相关 **80.57%**——你其实在用时间预测时间。

:::note amber 对照基准（金融类硬要求）
BTC 有正漂移。随机持币 90 日、假设 μ=50%/年、σ=65%/年，基准胜率约 **67.7%**（见 §8 工具）。一个「90 日胜率 78%」的策略，真实超额约 **+10.3 pp**——不是 +28 pp。
:::

## 理由三：2024–2026 是制度拐点

2024-01-11 美国 spot BTC ETF 上市，累计净流入约 **$553 亿**【待验证】。2025 年 Q4 BTC ETF 资产规模多次突破 **$1000 亿**【待验证】。同时 2025 年矿工经历「史上最难盈利期」：hashprice 最低 **$35/PH/天**、公开矿企 Q2 现金挖矿成本约 **$74,600/BTC**【待验证】。

**供给可算 + 需求制度化 + 矿工地板抬升**——三层同时动，正是建立演化模型的窗口期。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从代码硬顶，到你的仓位

:::raw
<svg viewBox="0 0 680 580" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 长期估值 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「代码/物理约束」，越靠下越「行为/制度可选择」</text>
  <rect x="14" y="46" width="652" height="52" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="70" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 协议层</text>
  <text x="148" y="70" font-size="11.5" fill="#454c56" font-family="sans-serif">2100 万硬顶 · 减半时间表 · 210,000 区块/次</text>
  <text x="148" y="88" font-size="11" fill="#7c848f" font-family="sans-serif">失效：软分叉改规则（极低概率但非零）</text>
  <rect x="14" y="102" width="652" height="52" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="126" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 供给层</text>
  <text x="148" y="126" font-size="11.5" fill="#454c56" font-family="sans-serif">stock / flow / S2F · 矿工产出 · 丢失币</text>
  <text x="148" y="144" font-size="11" fill="#7c848f" font-family="sans-serif">失效：把 S2F 当因果——可能只是时间代理变量</text>
  <rect x="14" y="158" width="652" height="52" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="182" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 流动供给层</text>
  <text x="148" y="182" font-size="11.5" fill="#454c56" font-family="sans-serif">float / liveliness · 长期持有者锁仓 · ETF 托管</text>
  <text x="148" y="200" font-size="11" fill="#7c848f" font-family="sans-serif">失效：把总流通量当可交易量——Rudd-Porter 核心修正</text>
  <rect x="14" y="214" width="652" height="52" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="238" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 需求层</text>
  <text x="148" y="238" font-size="11.5" fill="#454c56" font-family="sans-serif">采用曲线 · 机构配置 · 替代资产竞争 · 实际利率</text>
  <text x="148" y="256" font-size="11" fill="#7c848f" font-family="sans-serif">失效：Metcalfe N² 在 crisis 期崩溃</text>
  <rect x="14" y="270" width="652" height="52" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="294" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 矿工经济层</text>
  <text x="148" y="294" font-size="11.5" fill="#454c56" font-family="sans-serif">hashprice · 电力成本 · 难度 · 手续费占比</text>
  <text x="148" y="312" font-size="11" fill="#7c848f" font-family="sans-serif">失效：2025 手续费 &lt;1%——安全预算靠补贴，非内生</text>
  <rect x="14" y="326" width="652" height="52" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="350" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 均衡层</text>
  <text x="148" y="350" font-size="11.5" fill="#454c56" font-family="sans-serif">垂直供给 + 需求曲线交点 · 非线性锁仓反馈</text>
  <text x="148" y="368" font-size="11" fill="#7c848f" font-family="sans-serif">失效：线性外推 S2F 幂律——右尾风险被低估/高估都可能</text>
  <rect x="14" y="382" width="652" height="52" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="406" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 制度层</text>
  <text x="148" y="406" font-size="11.5" fill="#454c56" font-family="sans-serif">ETF 托管 · 税收 · 跨境资本管制 · CLARITY 法案</text>
  <text x="148" y="424" font-size="11" fill="#7c848f" font-family="sans-serif">失效：把美国 ETF 当全球需求——亚非 OTC 仍是大头</text>
  <rect x="14" y="438" width="652" height="52" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="462" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 叙事层</text>
  <text x="148" y="462" font-size="11.5" fill="#454c56" font-family="sans-serif">数字黄金 · S2F 图表 · 超级周期 · 末日溢价</text>
  <text x="148" y="480" font-size="11" fill="#7c848f" font-family="sans-serif">失效：叙事可以脱离基本面运行 6–18 个月</text>
  <rect x="14" y="494" width="652" height="52" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="518" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="518" font-size="11.5" fill="#454c56" font-family="sans-serif">仓位 · 再平衡 · 对照基准 · 样本外检验</text>
  <text x="148" y="536" font-size="11" fill="#7c848f" font-family="sans-serif">失效：用模型点估计下注——忽略参数不确定性</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作 三层映射

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">抽象概念 → 底层机制 → 可观测操作</text>
  <rect x="14" y="36" width="200" height="240" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 稀缺性</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 网络效应</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 安全预算</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 货币溢价</text>
  <text x="28" y="162" font-size="11" fill="#454c56" font-family="sans-serif">• 机构化</text>
  <rect x="240" y="36" width="200" height="240" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• flow 指数衰减</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• float 收缩弹性</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 算力-难度博弈</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• ETF 托管沉淀</text>
  <text x="254" y="162" font-size="11" fill="#454c56" font-family="sans-serif">• 实际利率贴现</text>
  <rect x="466" y="36" width="200" height="240" rx="10" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 查 UTXO 年龄分布</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 跟踪 ETF 净流入</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 读 hashprice 指数</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 算矿工 break-even</text>
  <text x="480" y="162" font-size="11" fill="#454c56" font-family="sans-serif">• 跑 walk-forward</text>
  <line x1="214" y1="120" x2="238" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#btcArr)"/>
  <line x1="440" y1="120" x2="464" y2="120" stroke="#454c56" stroke-width="1.2"/>
  <defs><marker id="btcArr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
</svg>
:::

## 跨域同构

| BTC 概念 | 其他领域 | 共同结构 |
|---|---|---|
| S2F 稀缺性 | 贵金属 stock/flow | 垂直供给 + 存量远大于流量 |
| 减半周期 | 产能投资长周期 | 供给冲击滞后于价格信号 |
| Metcalfe N² | 网络平台估值 | 用户数 → 价值超线性（危机时失效） |
| 矿工成本地板 | 石油边际成本曲线 | 高成本产能决定短期供给弹性 |
| ETF 净流入 | 被动资金 flow | 价格影响 demand 曲线截距 |
| 流动供给 | 流通股 vs 总股本 | float 才是定价分母 |

# 核心参与者

| 参与者 | 目标函数 | 对长期估值的影响 |
|---|---|---|
| **矿工** | 最大化 hashprice − 成本 | 提供安全预算；亏损时卖 BTC 形成地板压力 |
| **长期持有者 (LTH)** | 抗通胀/配置 | 锁仓 → float↓ → 价格弹性↑ |
| **ETF/机构** | 风险调整后收益、合规 | 2024 起成为边际定价者；流动受交易日约束 |
| **交易所/做市商** | 手续费、价差 | 提供流动性；极端行情时抽干 depth |
| **稳定币通道** | 法币↔crypto 桥梁 | 亚洲 OTC 主通道；受监管与银行通道影响 |
| **监管者** | 金融稳定、反洗钱 | 决定 ETF/托管/挖矿合法性与资本准入 |
| **叙事传播者** | 流量、影响力 | S2F/超级周期图表；不创造需求但影响短期 flow |

# 核心变量

| 变量 | 符号 | 可观测性 | 2025–2026 量级【待验证】 |
|---|---|---|---|
| 总存量 | stock | 链上精确 | ~19.9M BTC |
| 日产量 | flow | 精确 | ~450 BTC/天 |
| 存量/流量比 | S2F | 精确计算 | ~120 |
| 流动供给 | L | 估计 | 8M–16.5M（模型假设区间） |
| 网络算力 | H | 精确 | ~1.1 ZH/s |
| hashprice | HP | 精确 | $35–64/PH/天 |
| ETF 净流入 | F_ETF | 精确（美） | 日度 ±$1–5 亿 |
| 手续费占比 | f_fee | 精确 | <1% of block reward |
| 实际利率 | r_real | 宏观 | 驱动机会成本与 risk-off |

# 因果关系

:::raw
<svg viewBox="0 0 680 400" width="100%" style="max-width:680px">
  <defs>
    <marker id="btcG" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker>
    <marker id="btcR" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="14" y="24" width="130" height="50" rx="8" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.2"/>
  <text x="26" y="44" font-size="11" font-weight="700" fill="#1d4ed8" font-family="sans-serif">① 减半</text>
  <text x="26" y="60" font-size="10" fill="#454c56" font-family="sans-serif">flow ↓ 50%</text>
  <rect x="164" y="24" width="130" height="50" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="176" y="44" font-size="11" font-weight="700" fill="#15181d" font-family="sans-serif">② S2F ↑</text>
  <text x="176" y="60" font-size="10" fill="#454c56" font-family="sans-serif">稀缺叙事</text>
  <rect x="314" y="24" width="130" height="50" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="326" y="44" font-size="11" font-weight="700" fill="#15181d" font-family="sans-serif">③ 预期/叙事</text>
  <text x="326" y="60" font-size="10" fill="#454c56" font-family="sans-serif">非 guaranteed</text>
  <rect x="464" y="24" width="130" height="50" rx="8" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.2"/>
  <text x="476" y="44" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">④ 价格</text>
  <text x="476" y="60" font-size="10" fill="#454c56" font-family="sans-serif">均衡结果</text>
  <line x1="144" y1="49" x2="162" y2="49" stroke="#454c56" stroke-width="1.3" marker-end="url(#btcG)"/>
  <line x1="294" y1="49" x2="312" y2="49" stroke="#454c56" stroke-width="1.3" marker-end="url(#btcG)"/>
  <line x1="444" y1="49" x2="462" y2="49" stroke="#454c56" stroke-width="1.3" marker-end="url(#btcG)"/>
  <rect x="164" y="110" width="280" height="50" rx="8" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="176" y="130" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">⑤ 锁仓 / ETF 托管</text>
  <text x="176" y="146" font-size="10" fill="#454c56" font-family="sans-serif">liquid supply ↓ → 价格弹性 ↑（Rudd-Porter 核心）</text>
  <rect x="164" y="190" width="280" height="50" rx="8" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="176" y="210" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">⑥ 机构需求 / 采用</text>
  <text x="176" y="226" font-size="10" fill="#454c56" font-family="sans-serif">需求曲线右移（ARK TAM × 渗透率）</text>
  <rect x="164" y="270" width="280" height="50" rx="8" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="176" y="290" font-size="11" font-weight="700" fill="#0f8a4d" font-family="sans-serif">⑦ 矿工卖压</text>
  <text x="176" y="306" font-size="10" fill="#454c56" font-family="sans-serif">hashprice < 成本 → 强制卖出（负向供给 shock）</text>
  <line x1="304" y1="160" x2="304" y2="188" stroke="#454c56" stroke-width="1.3" marker-end="url(#btcG)"/>
  <line x1="304" y1="240" x2="304" y2="268" stroke="#454c56" stroke-width="1.3" marker-end="url(#btcG)"/>
  <line x1="444" y1="135" x2="520" y2="49" stroke="#454c56" stroke-width="1.3" marker-end="url(#btcG)"/>
  <line x1="444" y1="215" x2="520" y2="49" stroke="#454c56" stroke-width="1.3" marker-end="url(#btcG)"/>
  <line x1="444" y1="295" x2="520" y2="74" stroke="#d5342c" stroke-width="1.3" stroke-dasharray="4 3" marker-end="url(#btcR)"/>
  <path d="M530,74 C560,120 560,200 530,295" fill="none" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5 4" marker-end="url(#btcR)"/>
  <text x="470" y="340" font-size="10.5" fill="#d5342c" font-family="sans-serif">反馈：涨价 → 矿工扩产 → 算力↑ → hashprice↓ → 卖压↑</text>
  <rect x="14" y="350" width="652" height="38" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="26" y="374" font-size="11" fill="#454c56" font-family="sans-serif">实线 = 因果链；红虚线 = 负反馈。①→④  alone 在样本外不显著【分析】——必须同时看 ⑤⑥⑦</text>
</svg>
:::

## 因果 vs 相关

| 关系 | 性质 | 说明 |
|---|---|---|
| 减半 → flow 减半 | 【事实】代码级因果 | 唯一无争议的 supply 因果 |
| S2F ↑ → 价格 ↑ | **伪因果/共趋势** | 80.57% 与 log(时间) 相关【分析】 |
| float ↓ → 波动 ↑ | 【分析】机制合理 | Rudd-Porter 弹性公式支撑 |
| ETF 流入 → 次日涨 | **只是相关** | 2026 年多次「流入日仍跌」 |
| 算力 ↑ → 价格 ↑ | **只是相关** | 算力跟随价格滞后调整 |

# 隐藏关系

## 隐藏关系一：S2F 其实是时间趋势的换皮

Shelton (2024) 发现 S2F 模型估计值与 log(创世以来天数) 的 Pearson 相关 = **80.57%**。加入时间固定效应后，S2F 系数**统计不显著**。

:::note red 这意味着什么
任何「S2F 预测价格」的回归，可能只是在说「BTC 上线越久越贵」——这不需要 S2F 变量。样本外 OOS R² = **0.031**，Clark-West t = **0.11**，无法拒绝无预测力。
:::

## 隐藏关系二：总供给 ≠ 定价分母

ARK Big Ideas 2025 指出：2030 年总 supply ~20.5M，但 **active supply**（liveliness 加权 float）可能只有 **60%**【待验证】。用总 supply 做分母会**系统性低估**单位 BTC 的稀缺溢价。

## 隐藏关系三：矿工在 ATH 年亏损

2025 年 BTC 多次创新高，但 hashprice 11 月低至 **$35/PH/天**（年内峰值 $64 的 **−45%**）【待验证】。手续费贡献 <1%，安全预算几乎全靠 block subsidy——**「价格越高越安全」的叙事忽略了算力竞赛的内卷**。

## 隐藏关系四：对照基准——随机持币也会「赢」

| 持有期 | BTC 漂移 μ=50% | σ=65% | **随机持币基准** | 模型报 78% 时真实超额 |
|---|---|---|---|---|
| 30 日 | — | — | **60.5%** | 表面 +28 pp → 真实 **+17.5 pp** |
| 90 日 | — | — | **67.7%** | 表面 +28 pp → 真实 **+10.3 pp** |
| 180 日 | — | — | **74.2%** | 表面 +30 pp → 真实 **+3.8 pp** |

**证明 78% 胜率非随机所需样本**（vs 67.7% 基准）：约 **152** 次独立观测（单侧 5%、80% 检验力）。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>任何 BTC「策略胜率」都要和<strong>随机持币基准</strong>比——BTC 有正漂移，基准不是 50%。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="btc_T" min="5" max="365" step="5" value="90"><output id="btc_TO">90 日</output></label></div>
<div class="ctrl"><label>模型报告胜率 (%)<input type="range" id="btc_ps" min="50" max="90" step="0.1" value="78.0"><output id="btc_psO">78.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="btc_mu" min="0" max="100" step="1" value="50"><output id="btc_muO">50.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="btc_sg" min="30" max="100" step="1" value="65"><output id="btc_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="btc_base">67.7%</strong><span id="btc_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="btc_dp">+10.3 pp</strong><span id="btc_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="btc_n">152</strong><span id="btc_nh">—</span></div>
<canvas id="btcDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="btc_v">超额有限</strong><span id="btc_vh">—</span></div>
</div>
</div>
:::

# 系统运行机制

## 供给：垂直曲线

BTC 的 supply 曲线在短期几乎**完全无弹性**：日增 ~450 BTC，不管价格高低。2140 年后 flow → 0，只剩手续费激励（若届时安全模型仍成立）。

## 需求：三类曲线

1. **配置需求**（ETF/机构）：跟实际利率、风险预算、合规通道负相关
2. **投机需求**（杠杆/衍生品）：跟波动率、社交媒体正相关；marginal buyer 常是衍生品
3. **价值存储需求**（LTH）：跟通胀预期、地缘风险正相关；体现为 UTXO 长期不动

## 均衡：Rudd-Porter 框架

Rudd & Porter (2025) 的简化均衡价：

> P(t) = A′(t) · P₀ · [L₀ / L(t)]^(1/ρ)

- P₀ = $64,858（2024 减半日价）【事实】
- L₀ ≈ 流动供给初始值；L(t) 随锁仓每日收缩
- A′(t) = logistic 采用曲线 × 需求乘数 D
- ρ = 跨期替代弹性（越大 → 供给收缩对价格越不敏感）

Monte Carlo 至 2036-04：**50% 分位价 > $517 万**【待验证】——但参数 uncertainty 极大，右尾（L < 2M BTC）才出现 hyperbolic 路径。

# 时间演化

## 四阶段演化时间轴

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 长期演化 · 四阶段时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="8" fill="#1d4ed8"/>
  <text x="50" y="80" font-size="10" font-weight="700" fill="#1d4ed8" font-family="sans-serif">2009–2017</text>
  <text x="40" y="130" font-size="10" fill="#454c56" font-family="sans-serif">极客/暗网</text>
  <text x="40" y="144" font-size="10" fill="#454c56" font-family="sans-serif">高波动实验期</text>
  <circle cx="220" cy="100" r="8" fill="#1d4ed8"/>
  <text x="180" y="80" font-size="10" font-weight="700" fill="#1d4ed8" font-family="sans-serif">2017–2021</text>
  <text x="170" y="130" font-size="10" fill="#454c56" font-family="sans-serif">ICO/杠杆周期</text>
  <text x="170" y="144" font-size="10" fill="#454c56" font-family="sans-serif">叙事驱动暴涨暴跌</text>
  <circle cx="400" cy="100" r="8" fill="#d5342c"/>
  <text x="365" y="80" font-size="10" font-weight="700" fill="#d5342c" font-family="sans-serif">2021–2024</text>
  <text x="350" y="130" font-size="10" fill="#454c56" font-family="sans-serif">机构入场/ETF 预期</text>
  <text x="350" y="144" font-size="10" fill="#454c56" font-family="sans-serif">矿工资本化</text>
  <circle cx="580" cy="100" r="8" fill="#0f8a4d"/>
  <text x="545" y="80" font-size="10" font-weight="700" fill="#0f8a4d" font-family="sans-serif">2024–2036</text>
  <text x="530" y="130" font-size="10" fill="#454c56" font-family="sans-serif">ETF 制度化</text>
  <text x="530" y="144" font-size="10" fill="#454c56" font-family="sans-serif">供给可算·需求可建模</text>
  <text x="14" y="178" font-size="10.5" fill="#7c848f" font-family="sans-serif">当前处于第四阶段起点——估值从「叙事」转向「均衡模型」，但叙事仍占短期主导</text>
</svg>
:::

## 减半周期 ≠ 价格周期

历史上有「减半后 12–18 月见顶」的模式，但样本只有 **4 次**，统计功效极低【推论】。2024 第四次减半前价格已 ATH——**「减半涨价」叙事被 price-in 的程度从未如此高**。

# 利益与激励

| 角色 | 激励 | 对模型的扭曲 |
|---|---|---|
| S2F 传播者 | 流量、影响力 | 只展示 in-sample 拟合，隐藏 time FE 检验 |
| 矿企 CEO | 股价、融资 | 强调 BTC 长期价值，淡化 hashprice 危机 |
| ETF 发行商 | AUM、管理费 | 强调配置必要性，淡化波动与 drawdown |
| 学术研究者 | 发表、引用 | 倾向报告显著 in-sample 结果 |
| 你 | 财富增值 | 倾向相信符合仓位的模型 |

**谁受益**：已经持有 BTC 的人从任何「长期上涨」叙事中受益。**谁承担代价**：在 narrative peak 入场、用杠杆放大的人。

# 资源与信息流

## 资金流抽水图

:::raw
<svg viewBox="0 0 680 340" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 生态 · 资源与信息流（资金流抽水）</text>
  <rect x="260" y="40" width="160" height="44" rx="8" fill="#f0f4fd" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="278" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">BTC 现货池</text>
  <text x="278" y="74" font-size="10" fill="#454c56" font-family="sans-serif">定价中枢</text>
  <rect x="40" y="120" width="120" height="40" rx="8" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.2"/>
  <text x="52" y="138" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">法币入口</text>
  <text x="52" y="152" font-size="9.5" fill="#454c56" font-family="sans-serif">ETF/交易所/OTC</text>
  <rect x="520" y="120" width="120" height="40" rx="8" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.2"/>
  <text x="532" y="138" font-size="11" font-weight="700" fill="#0f8a4d" font-family="sans-serif">长期锁仓</text>
  <text x="532" y="152" font-size="9.5" fill="#454c56" font-family="sans-serif">LTH/ETF/丢失</text>
  <rect x="40" y="220" width="120" height="40" rx="8" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.2"/>
  <text x="52" y="238" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">矿工产出</text>
  <text x="52" y="252" font-size="9.5" fill="#454c56" font-family="sans-serif">~450 BTC/天</text>
  <rect x="520" y="220" width="120" height="40" rx="8" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.2"/>
  <text x="532" y="238" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">抽水节点</text>
  <text x="532" y="252" font-size="9.5" fill="#454c56" font-family="sans-serif">手续费/Spread</text>
  <line x1="160" y1="140" x2="258" y2="62" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#btcGF)"/>
  <text x="180" y="88" font-size="9" fill="#0f8a4d" font-family="sans-serif">+$553亿 ETF【待验证】</text>
  <line x1="520" y1="140" x2="422" y2="62" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#btcGF)"/>
  <text x="430" y="88" font-size="9" fill="#0f8a4d" font-family="sans-serif">float ↓</text>
  <line x1="160" y1="240" x2="258" y2="82" stroke="#d5342c" stroke-width="1.5" marker-end="url(#btcRF)"/>
  <text x="170" y="200" font-size="9" fill="#d5342c" font-family="sans-serif">卖压</text>
  <line x1="340" y1="84" x2="340" y2="118" stroke="#d5342c" stroke-width="1.2" marker-end="url(#btcRF)"/>
  <text x="348" y="108" font-size="9" fill="#d5342c" font-family="sans-serif">交易费 0.1–0.2%</text>
  <line x1="420" y1="240" x2="340" y2="84" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#btcRF)"/>
  <text x="400" y="200" font-size="9" fill="#d5342c" font-family="sans-serif">ETF 0.2–0.5%/年</text>
  <defs>
    <marker id="btcGF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#0f8a4d"/></marker>
    <marker id="btcRF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="14" y="290" width="652" height="38" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="26" y="314" font-size="11" fill="#454c56" font-family="sans-serif">长期持有者锁仓是「静默抽水」——减少 float 但不离开系统；矿工/ETF/交易所是「显性抽水」</text>
</svg>
:::

## 信息源层级

| 层级 | 来源 | 延迟 | 可靠度 |
|---|---|---|---|
| L0 | 比特币核心代码、区块数据 | 10 分钟 | 【事实】 |
| L1 | CoinMetrics/Glassnode 链上指标 | 小时 | 【分析】 |
| L2 | ETF 托管报告、13F | 日–季 | 【事实】/【待验证】 |
| L3 | 社交媒体 S2F 图表 | 实时 | 【假设】 |
| L4 | 机构目标价（ARK 等） | 月 | 【待验证】 |

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序的 10 个杠杆：

| # | 杠杆点 | 为什么重要 | 你怎么用 |
|---|---|---|---|
| 1 | **区分 float vs stock** | 定价分母错 → 一切估值错 | 查 UTXO 年龄 + liveliness |
| 2 | **对照基准（随机持币）** | 防止把漂移当 alpha | §8 漂移剥离器 |
| 3 | **样本外 walk-forward** | in-sample R² 无意义 | 要求 OOS R² + Clark-West |
| 4 | **时间固定效应检验** | 识别伪回归 | S2F 加入 log(time) FE |
| 5 | **hashprice 监控** | 矿工地板 = 短期供给弹性 | Luxor/CoinShares 指数 |
| 6 | **ETF 净流入** | 2024+ 边际定价者 | Farside/SoSoValue 日度 |
| 7 | **参数 stress test** | Rudd-Porter 右尾在 L<2M | 扫 D、ρ、withdrawal |
| 8 | **手续费占比** | 长期安全预算指标 | 链上 fee/reward 比 |
| 9 | **实际利率** | 机会成本驱动配置需求 | Fed 点阵 + TIPS |
| 10 | **仓位非预测** | 模型给区间不给点 | 用区间 + 凯利缩放 |

:::raw
<div class="tool">
<h3>工具 · 流动供给压力（Rudd-Porter 简化）</h3>
<p>P = P₀ · (L₀/L)^(1/ρ) · (D/20)。默认 P₀ = $64,858（2024 减半日）。</p>
<div class="ctrl"><label>初始流动供给 L₀ (M)<input type="range" id="liq_L0" min="10" max="16" step="0.1" value="14.0"><output id="liq_L0O">14.0M</output></label></div>
<div class="ctrl"><label>当前流动供给 L (M)<input type="range" id="liq_L" min="2" max="16" step="0.1" value="10.0"><output id="liq_LO">10.0M</output></label></div>
<div class="ctrl"><label>跨期替代弹性 ρ<input type="range" id="liq_rho" min="0.5" max="3" step="0.05" value="1.50"><output id="liq_rhoO">1.50</output></label></div>
<div class="ctrl"><label>需求乘数 D<input type="range" id="liq_D" min="10" max="100" step="1" value="30"><output id="liq_DO">30</output></label></div>
<div class="readout">
<div class="ro"><span class="k">均衡价</span><strong id="liq_p">$121,751</strong><span id="liq_ph">—</span></div>
<div class="ro"><span class="k">相对基准</span><strong id="liq_m">×1.88</strong><span id="liq_mh">—</span></div>
<canvas id="liqChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="liq_v">温和溢价</strong><span id="liq_vh">—</span></div>
</div>
</div>
:::

# 常见认知陷阱

:::details 1. 「S2F 图表从未错过」
**错。** 2021 年后 S2F 隐含价远高于实际价。Shelton (2024) 正式拒绝样本外预测力。图表只展示 in-sample 拟合。
:::

:::details 2. 「减半必涨」
**错。** 减半只改 supply 侧；2024 减半前价格已 ATH。样本 n=4，不构成统计证据。
:::

:::details 3. 「算力越高越安全所以越贵」
**半错。** 算力跟随价格滞后调整；2025 算力 1.1 ZH/s 时 hashprice 创新低——内卷不创造需求。
:::

:::details 4. 「ETF 流入 = 明天涨」
**错。** 2026 年 9 月：$4.6 亿流出周与 $1.6 亿流入日都出现过，价格仍跌【待验证】。
:::

:::details 5. 「ARK $710 万是科学预测」
**错。** 那是 bull/base/bear 情景假设的乘积——TAM × 渗透率 ÷ supply。改一个假设差 10 倍。
:::

:::details 6. 「Metcalfe N² 证明网络价值」
**过拟合风险。** Shanaev et al. (2019) 指出高 R² 可能来自共同趋势；危机期 N² 关系崩溃。
:::

:::details 7. 「丢失的 BTC 让 S2F 更高」
**方向对、幅度未知。** Satoshi 币 ~1M【待验证】；丢失币估计误差 ±30%，不宜精确建模。
:::

:::details 8. 「长期只涨因为通胀」
**忽略 drawdown。** 2018 年 −84%、2022 年 −77%。非遍历：路径依赖，一次归零即 game over。
:::

:::details 9. 「链上指标领先价格」
**多数滞后或共趋势。** 活跃地址、NVT 在 bull 顶/底都曾被证伪。
:::

:::details 10. 「模型算出的价格是目标价」
**致命混淆。** Rudd-Porter 2036 中位数 $517 万是**参数分布的 50 分位**，不是 point forecast。
:::

:::details 11. 「中国禁挖所以 supply 更少」
**错。** 算力迁移，全球 hash 不减；中国政策影响的是地理分布与电力成本。
:::

:::details 12. 「手续费终将替代 subsidy」
**未验证。** 2025 手续费 <1%；2140 年前 subsidy 仍主导。安全预算转型是 open question。
:::

<!-- nav:落地 -->

# 从抽象到现实

## 三个模型的现实映射

| 抽象 | 现实数据 | 更新频率 |
|---|---|---|
| stock / flow | blockchain.com / mempool.space | 实时 |
| liquid supply | CoinMetrics Liveliness / ARK active supply | 周 |
| 需求曲线 | ETF flow + stablecoin supply + 搜索指数 | 日 |
| 矿工地板 | hashprice Index (Luxor) | 日 |
| 制度摩擦 | SEC/CFTC 公告、FOMC | 事件驱动 |

## 2026 年 9 月快照【待验证】

- BTC 现货约 **$95,000–115,000** 区间波动
- 美 spot ETF 净资产 **>$1000 亿**，累计净流入 **~$553 亿**
- 网络算力 **~1.1 ZH/s**，难度 **~142T**
- hashprice **$38–52/PH/天**（年内低点 $35）
- CLARITY 法案程序动议 **49:50 未通过**——监管不确定性回升

# 从理论到行动

## 决策框架（不是买卖信号）

```
① 更新 supply 路径（精确，5 分钟）
② 估计 float 区间（不确定，看 UTXO 年龄 + ETF 托管）
③ 选需求情景（bear/base/bull 三档，不选单点）
④ 算矿工 floor（hashprice vs 电力成本）
⑤ 与当前价比：溢价/折价区间
⑥ 对照基准检验：你的「优势」是否 > 随机持币
⑦ 仓位 = f(区间宽度, 置信度, 回撤承受) — 不是 f(目标价)
```

:::raw
<div class="tool">
<h3>工具 · 矿工成本地板</h3>
<p>hashprice = (subsidy + fees) × BTC 价 ÷ 全网算力。2025 Q2 公开矿企现金成本约 $74,600/BTC【待验证】。</p>
<div class="ctrl"><label>hashprice ($/PH/天)<input type="range" id="mn_hash" min="20" max="80" step="1" value="50"><output id="mn_hashO">$50/PH/天</output></label></div>
<div class="ctrl"><label>电价 ($/kWh)<input type="range" id="mn_elec" min="3" max="12" step="0.1" value="5.0"><output id="mn_elecO">¥0.36/kWh</output></label></div>
<div class="ctrl"><label>能效 (J/TH)<input type="range" id="mn_eff" min="10" max="30" step="1" value="15"><output id="mn_effO">15 J/TH</output></label></div>
<div class="ctrl"><label>BTC 价格 ($)<input type="range" id="mn_price" min="40000" max="150000" step="1000" value="95000"><output id="mn_priceO">$95,000</output></label></div>
<div class="readout">
<div class="ro"><span class="k">电力成本</span><strong id="mn_cost">$18.00/PH/天</strong><span id="mn_costh">—</span></div>
<div class="ro"><span class="k">现金 margin</span><strong id="mn_margin">+$32.00</strong><span id="mn_marginh">—</span></div>
<div class="ro"><span class="k">电力 break-even 价</span><strong id="mn_be">$43,623</strong><span id="mn_beh">—</span></div>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="mn_v">有现金利润</strong><span id="mn_vh">—</span></div>
</div>
</div>
:::

# 技能树

:::details L1 · 观察者（能读 supply）
- [ ] 手算第四次减半后的 S2F（应得 ~120）
- [ ] 解释 stock 与 flow 的区别
- [ ] 找到 blockchain.com 的 supply 曲线
:::

:::details L2 · 分析师（能拆模型）
- [ ] 复述 Shelton 对 S2F 的三条批评
- [ ] 手算随机持币 90 日基准胜率（μ=50%, σ=65% → 67.7%）
- [ ] 解释 Rudd-Porter 公式中 ρ 的含义
:::

:::details L3 · 建模者（能 stress test）
- [ ] 用 §13 工具扫 L 从 14M → 8M 的价格弹性
- [ ] 对比 ARK bear/base/bull 三情景假设差异
- [ ] 跑一次 walk-forward 思路（训练/测试分割）
:::

:::details L4 · 系统设计者（能迭代）
- [ ] 建立自己的「supply + float + demand + floor」仪表盘
- [ ] 每季度更新参数分布，不更新点估计
- [ ] 用对照基准检验任何新「alpha 叙事」
:::

# 游戏化世界

**角色**：BTC 生态架构师。你的「技能点」不是预测价格，而是**维护一张活的机制地图**。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 正确计算当前 S2F | 解锁「供给层」地图 |
| Lv.2 | 识别一个 S2F 帖子的统计缺陷 | 解锁「漂移剥离器」 |
| Lv.3 | 用 3 组参数跑 Rudd-Porter 区间 | 解锁「右尾警报」 |
| Lv.4 | 连续 4 周跟踪 ETF flow vs 价格 | 解锁「制度层」事件卡 |
| Lv.5 | 写一份「2036 情景区间」而非目标价 | 通关 |

# 任务系统

| 任务类型 | 示例 | 验证标准 |
|---|---|---|
| 每日 | 记录 ETF 净流入 + BTC 收盘价 | 表格 7 日 |
| 每周 | 更新 hashprice + 难度 | 截图或 API |
| 每月 | 重估 float 区间 | 写 3 行结论 |
| 每季 | 对照 ARK/Rudd 假设变化 | 差异清单 |
| 每年 | 减半后 supply 路径复核 | 与代码一致 |

# 反事实模拟

:::tabs
@@情景 A · 若无 ETF
2024-01 没有 spot ETF 批准。机构配置需求曲线左移：ARK 情景渗透率假设可能低 **30–50%**【推论】。价格路径更低波动、更低均值——但 OTC 通道可能部分替代。

@@情景 B · 若 S2F 为真
S2F 系数在 sample外仍显著，2032 年 S2F=503 隐含价应达极高水平（幂律外推）。实际上 2022–2023 S2F 模型已严重偏离——反事实已被 reality falsify。

@@情景 C · 若手续费永不回升
subsidy → 0 后（2140+），若 fee < 安全所需，算力撤离 → 安全下降 → 价值存储叙事崩溃。这是**最远的尾部风险**，但协议层必须面对。

@@情景 D · 若 L < 2M
Rudd-Porter Monte Carlo：liquid supply 跌破 2M BTC 且 withdrawal 不敏感时，价格路径 hyperbolic【分析】。反事实问：什么机制会加速锁仓到 2M 以下？
:::

:::raw
<div class="tool">
<h3>工具 · 减半稀缺时钟</h3>
<p>精确计算 stock/flow/S2F 演化，并可视化 S2F 上升速度。</p>
<div class="ctrl"><label>距 2024 减半（年）<input type="range" id="hl_years" min="0" max="12" step="1" value="4"><output id="hl_yearsO">4 年</output></label></div>
<div class="readout">
<div class="ro"><span class="k">存量 stock</span><strong id="hl_stock">20.34M</strong><span id="hl_stockh">—</span></div>
<div class="ro"><span class="k">日产量 flow</span><strong id="hl_flow">225 BTC/天</strong><span id="hl_flowh">—</span></div>
<div class="ro"><span class="k">S2F</span><strong id="hl_sf">248</strong><span id="hl_sfh">—</span></div>
<canvas id="hlChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="hl_v">S2F 陡升</strong><span id="hl_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 读懂 supply** | 1 周 | 能解释减半、S2F、硬顶 | 口算当前 S2F |
| **L2 拆穿叙事** | 2 周 | 掌握对照基准 + time FE | 漂移剥离器实操 |
| **L3 建均衡区间** | 1 月 | Rudd-Porter + ARK 三情景 | 输出区间不是点 |
| **L4 运行系统** | 3 月+ | 季度更新机制地图 | 连续 2 季无「目标价」表述 |

# 30 分钟最小实践

**任务**：用公开数据完成一次「supply + float + floor」三联检。

1. **5 分钟 · supply**：打开 mempool.space，记录当前 block reward、距下次减半区块数、估算 S2F。
2. **10 分钟 · float**：查 CoinMetrics「Supply Last Active 1+ Year Ago」占比，估算 float ≈ 总量 × (1 − 长期不动占比)。
3. **10 分钟 · floor**：查 hashprice（Luxor 或 CoinShares），用 §16 工具输入你的电价，看 margin 正负。
4. **5 分钟 · 结论**：写三句话——(a) supply 路径 (b) float 方向 (c) 矿工 pressure。**禁止写目标价。**

**验证**：把你的 S2F 与手册工具 §20 减半时钟交叉核对，误差应 <5%。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | supply 层 | 手画 2024→2036 supply 曲线 |
| D2 | S2F 批判 | 读 Shelton 2024 摘要，写 3 条批评 |
| D3 | float | 跟踪 UTXO 年龄分布 7 日变化 |
| D4 | 矿工 | 记录 hashprice + 难度 7 日 |
| D5 | ETF | 记录美 ETF 净流入 7 日 |
| D6 | 均衡 | 用 §13 工具跑 3 组 (L, D, ρ) |
| D7 | 合成 | 写 1 页「机制地图」不含目标价 |

# 30 天能力构建计划

**Week 1**：supply + S2F 解构（L1）
**Week 2**：float + 矿工 floor（L2）
**Week 3**：Rudd-Porter + ARK 情景对比（L3）
**Week 4**：建立个人仪表盘 + 对照基准 habit（L4）

每周交付物：一张更新机制图 + 一段「本周 float/floor 变化」日志。

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **Stock-Flow** | 存量/流量比衡量稀缺 | 与 log(时间) 共线 |
| 2 | **减半时间表** | 供给冲击的可预测部分 | 需求不保证跟随 |
| 3 | **Rudd-Porter 均衡** | 垂直供给 × 需求曲线 | 参数 uncertainty |
| 4 | **ARK TAM 渗透** | 机构配置 × 市场规模 | 渗透率拍脑袋 |
| 5 | **Metcalfe N²** | 网络价值超线性 | 危机期失效 |
| 6 | **Power Law 时间** | 价格 ∝ t^α | OOS 弱于 in-sample |
| 7 | **hashprice 地板** | 矿工成本约束短期供给 | 不含折旧/融资 |
| 8 | **Liveliness / float** | 真实可交易供给 | 估计误差大 |
| 9 | **ETF flow 定价** | 边际买家制度化 | flow ≠ 涨跌 |
| 10 | **对照基准** | 随机持币胜率 | 参数 μ, σ 敏感 |

# 关键问题清单

:::details 供给
- 当前 S2F 是多少？第五次减半后变为多少？
- 日产量占 stock 的百分比？
- 丢失/Satoshi 币占总量比例？
:::

:::details 需求
- ETF 近 30 日净流入趋势？
- stablecoin 总市值变化？
- 实际利率方向？
:::

:::details 模型检验
- 这个模型的 OOS R² 是多少？
- 加入 time FE 后系数还显著吗？
- 样本外是否 beat「今天的价格」naive 基准？
:::

:::details 风险
- 当前 premium vs Rudd-Porter base case？
- hashprice 是否低于 median 矿企成本？
- 你的仓位是否依赖单点目标价？
:::

# 下一阶段探索

1. **Shelton 式 blended OOS 策略**：S2F + Metcalfe + sentiment 组合在样本外 CAPM alpha +1300bp【分析】——组合 vs 单因子。
2. **Power Law 的 CSN 结构检验**：arXiv 2605.21316 对 time-power-law 的形式检验——弱结构、强预测的矛盾如何解？
3. **2140 安全预算转型**：fee market 能否支撑 >500 EH/s？协议层改动风险？
4. **亚洲 OTC vs 美 ETF**：谁才是 marginal pricer？数据缺口在哪里？
5. **BTC 与实际利率的时变 beta**：2022–2024「数字黄金」叙事 vs 2025 risk-on 重定价。

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 第四次减半参数 | 协议代码 | Bitcoin Core | 【事实】 |
| S2F 样本外检验 | 同行评审 | Shelton, JRFM 2024 | 【分析】 |
| 80.57% 时间相关 | 同行评审 | Shelton, JRFM 2024 | 【分析】 |
| Rudd-Porter 2036 分位 | 同行评审 | JRFM 2025, 18(10):570 | 【待验证】 |
| ARK 2030 情景 | 机构报告 | ARK Big Ideas 2025 | 【待验证】 |
| hashprice / 算力 | 行业报告 | CoinShares Q4 2025, Luxor | 【待验证】 |
| ETF 累计流入 | 媒体/聚合 | CryptoBriefing, Farside | 【待验证】 |
| 矿工 Q2 成本 | 行业报告 | CoinShares Mining Report | 【待验证】 |
| 2026 ETF 流出周 | 媒体 | btc.network 2026-09 | 【待验证】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；历史减半周期、S2F 拟合、机构目标价均**不保证**未来表现。估值模型的参数 uncertainty 往往大于点估计本身——请勿依据本手册任何数字进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。

