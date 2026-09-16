---
slug: BTC-减半预期折现与牛市延时模型
title: BTC-减半预期折现与牛市延时模型
subtitle: 减半是<strong>可预见的供给冲击</strong>，但牛市顶往往<strong>延时 518–546 天</strong>才到——学会拆「已折现多少」与「还要等多久」
brand_sub: Bitcoin × Halving × Expectation Discounting
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, 减半, 预期折现, 牛市延时, 四年周期, ETF]
theme_js_file: BTC-减半预期折现与牛市延时模型.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**减半把日新增 BTC 从 900 砍到 450**【事实】——但这件事在代码里写死了十几年，聪明钱会在事件前**逐步折现**（K33：减半前一月平均 **+14%**【待验证】）。2024 周期史上首次**减半前即破 ATH**（3 月 ~$73K）【事实】，说明折现程度极高。

牛市顶则往往**延时**：2016 周期峰在减半后 **518** 天，2020 周期 **546** 天，均值 **532** 天 → 指向 2025 年 9–10 月【推论】；2025-10 现货峰 ~**$126K**【待验证】与 Fidelity 四年顶日历（2025-10-06 ~$126,200）几乎重合【待验证】。**折现回答「利好还剩多少」；延时回答「顶还要等多久」——两件事不能混为一谈。**

# 这个领域到底是什么

## 一句话定位

「BTC-减半预期折现与牛市延时模型」研究的是：**可预见的供给冲击如何在时间轴上被价格提前吸收，以及牛市顶点相对减半事件的系统性滞后**。它横跨 EMH（有效市场假说）、矿工经济学、周期叙事（Rekt Capital / Fidelity 四年顶）与 2024 ETF 时代的新变形。

:::note red 先划清边界
本手册**不提供**「减半后 X 天必买/必卖」信号。样本仅 **4 次减半**、峰窗 **±14 天** 仍可能 miss；ETF 时代周期形态已在变形。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 预期折现曲线、有效供给冲击、减半后峰窗延时、周期加速/减速 |
| 2 | 边界在哪 | 不含山寨币；不预测监管；不替代链上估值（MVRV/S2F） |
| 3 | 核心对象 | 块奖励 schedule、priced-in 比例、halving→peak 天数 |
| 4 | 参与者 | 矿工（forced sellers）、ETF 买家、周期分析师、套利者 |
| 5 | 关键变量 | 日 flow、折现率、加速天数、ReAccum 时长、M2 流动性 |
| 6 | 可观察的 | 减半日期、现货价、ETF 流量、期权偏度 |
| 7 | 不可观察但可推断 | 「真实」priced-in 比例、未来 demand 弹性 |
| 8 | 谁影响谁 | 预期→提前买压；减半→flow↓；流动性→延时/压缩峰窗 |
| 9 | 因果 | 减半→flow 减半 = 【事实】；折现→价涨 = 【推论】 |
| 10 | 只是相关 | 四年顶与道琼斯周期【分析】、M2 扩张 |
| 11 | 表层现象 | 「减半必涨」「已 price-in」两极争论 |
| 12 | 底层机制 | 可预见冲击 + 流动性周期 + 叙事反馈 |
| 13 | 反馈 | 提前涨→「已折现」讨论→波动率下降 |
| 14 | 时间延迟 | 峰在减半后 **518–546** 天；底可在减半前 **517** 天 |
| 15 | 正负反馈 | 正：稀缺叙事→HODL；负：利好兑现→sell the news |

# 为什么值得研究

## 理由一：2024 是「折现极限测试」

第四次减半（**2024-04-19**）前 BTC 已在 **3 月**创 ATH ~**$73,000**【事实】——此前三次减半时价格距前高仍跌 **42–53%**【事实】。Galaxy / Coinbase 均指出这是**史上最高 pre-halving 折现**【分析】。懂折现才能解释「减半后为何横盘 5 个月」。

## 理由二：延时模型给出可检验日历

Rekt Capital：峰在减半后 **518–546** 天【待验证】；JRFM (2024) 回归得 **19 个月**（2025-11）【分析】。2025-10 峰 ~$126K 若成立，则延时带**命中**——但若你 2024-05 就按「减半后 3 个月必暴涨」下注，会踏空整整一季。

## 理由三：必须和对照基准比

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「减半后 90 日 78% 胜率」真实超额 |
|---|---|---|---|
| 90 日 | — | **67.7%** | 表面 +10.3 pp → 需 **n≈151** 次才显著 |
| 180 日 | — | **74.2%** | 表面 +5.8 pp → 超额快速衰减 |
| 365 日 | — | **82.3%** | 长期持币本身极强 |

**BTC 有正漂移，基准不是 50%。** 减半日历策略的「高胜率」大半是 β，不是 α。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从协议 schedule，到折现—延时双时钟

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">减半折现·延时 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「协议硬约束」，越靠下越「行为/叙事可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 协议层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">210,000 区块/减半 · 奖励 6.25→3.125 · 日产出 ~450 BTC</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">完全可预测——EMH 的出发点</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 供给冲击层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">年减发 ~164,250 BTC · 矿工 forced sell 压力减半</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">冲击真实，但被 ETF 日流量稀释</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 预期折现层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">减半前 180 天指数折现可达 ~50%【推论】</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">2024 预涨 ATH → 折现率史上最高</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 需求承接层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">美 spot ETF 持仓 >$100B【待验证】· IBIT 可秒吞日产量</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">Hougan：supply 折现了，demand 未必</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 延时周期层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">峰：减半后 518–546 天 · 底：可提前 517 天</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">Rekt「镜像周期」【待验证】</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 宏观流动性层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">M2 扩张常领先减半 · 流动性提供牛市燃料</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">失效：2022 紧缩期减半叙事失灵</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 再积累层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">2024 ReAccum **205** 天 vs 2016/20 均值 **163** 天</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">更长横盘 = 周期「减速」+42 天</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「减半倒计时」媒体 · 矿商 IPO 叙事 · 期权偏度</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：事件日波动率未必飙升（EMH）</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">双时钟：折现仪表盘 + 延时窗 · 不对照基准不下注</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">区间思维 · n=4 样本谦卑</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">折现·延时 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 可预见冲击</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 预期折现</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 周期镜像</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 流动性滞后</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• flow 阶梯下降</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 套利者提前建仓</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• M2→risk-on 延时</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• ReAccum 蓄势</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• §06 预期折现器</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• §09 牛市延时钟</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• §08 漂移剥离器</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• ETF/矿工流量表</text>
  <defs><marker id="hdA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="214" y1="120" x2="238" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#hdA)"/>
  <line x1="440" y1="120" x2="464" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#hdA)"/>
</svg>
:::

## 跨域同构

| 本主题结构 | 其他领域 | 共同数学 |
|---|---|---|
| 预期折现 | 股息贴现 / 利率路径 | 已知现金流→提前定价 |
| 供给冲击延时 | 产能周期、OPEC 减产 | 冲击可预见，价格路径滞后 |
| 镜像周期 | 傅里叶对称、均值回归 | 底↔顶时间对称【假设】 |
| 四年顶日历 | 美国总统周期、奥运周期 | 小样本巧合风险 |
| sell the news | 财报、FDA 审批 | 事件日波动率压缩 |
| 漂移剥离 | 因子投资 α 检验 | p_base = Φ(μ√T/σ) |

# 核心参与者

| 参与者 | 与折现/延时的关系 | 激励扭曲 |
|---|---|---|
| **矿工** | 减半前囤币、减半后抛压↓ | 强调「供应危机」推销股权 |
| **ETF 发行商** | 持续买盘可覆盖日产量 | AUM 叙事→淡化周期风险 |
| **Rekt Capital 等** | 518–546 天峰窗框架 | 内容流量 vs 预测失败 |
| **K33 / Galaxy** | EMH vs 投机折现辩论 | 研究声誉 |
| **Bitwise Hougan** | supply 已折现、demand 未折现 | 产品发行方 |
| **套利者** | 提前 6–12 个月建仓 | 无动机公开折现进度 |
| **你** | 读者 | 确认偏误：持币者倾向相信延时 |

# 核心变量

| 变量 | 定义 | 2026-09 参考【待验证】 |
|---|---|---|
| **halving_date** | 第四次减半 | 2024-04-19 |
| **days_since_halving** | 距减半天数 | ~515 天 |
| **priced_in** | 市场已折现比例 | 高（pre-ATH）【推论】 |
| **peak_window** | 减半后 518–546 天 | 2025-09-19 ~ 10-17 |
| **cycle_accel** | 相对历史周期的加速天数 | 2024 初 +260d → 横盘后 +150d【待验证】 |
| **reaccum_days** | 减半后横盘蓄势 | **205**（+42 vs 均值） |
| **daily_flow** | 日挖矿产出 | **~450 BTC** |
| **etf_daily** | ETF 日均净买 | 波动大，可 >1000 BTC【待验证】 |

:::raw
<div class="tool">
<h3>工具 · 预期折现器</h3>
<p>指数折现模型：<strong>已折现 = 1 − e^(−k·t)</strong>，半衰期 180 天（k=ln2/180）。对比你设定的市场折现率。</p>
<div class="ctrl"><label>距减半（天，事件前为正）<input type="range" id="hd_days" min="30" max="540" step="1" value="180"><output id="hd_daysO">180 天</output></label></div>
<div class="ctrl"><label>市场已折现（%）<input type="range" id="hd_priced" min="0" max="100" step="1" value="55"><output id="hd_pricedO">55%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">模型折现</span><strong id="hd_disc">50.0%</strong><span id="hd_disch">—</span></div>
<div class="ro"><span class="k">有效冲击</span><strong id="hd_eff">22.5%</strong><span id="hd_effh">—</span></div>
<div class="ro"><span class="k">等效日减量</span><strong id="hd_shock">203 BTC/天</strong><span id="hd_shockh">—</span></div>
<canvas id="hdDiscChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="hd_v">折现大致均衡</strong><span id="hd_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 主因果链

:::raw
<svg viewBox="0 0 680 340" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">减半 · 因果与反馈</text>
  <rect x="30" y="50" width="120" height="36" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="44" y="74" font-size="11" font-weight="700" fill="#1d4ed8" font-family="sans-serif">可预见减半</text>
  <rect x="200" y="50" width="120" height="36" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="214" y="74" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">预期折现</text>
  <rect x="370" y="50" width="120" height="36" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="384" y="74" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">价格提前涨</text>
  <rect x="540" y="50" width="120" height="36" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="554" y="74" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">事件日平淡</text>
  <rect x="200" y="130" width="120" height="36" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="214" y="154" font-size="11" font-weight="700" fill="#1d4ed8" font-family="sans-serif">flow 减半</text>
  <rect x="370" y="130" width="120" height="36" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="384" y="154" font-size="11" font-weight="700" fill="#0f8a4d" font-family="sans-serif">矿工抛压↓</text>
  <rect x="540" y="130" width="120" height="36" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="554" y="154" font-size="11" font-weight="700" fill="#0f8a4d" font-family="sans-serif">边际供给紧</text>
  <rect x="115" y="210" width="140" height="36" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="129" y="234" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">M2 / 流动性扩张</text>
  <rect x="300" y="210" width="140" height="36" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="314" y="234" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">ReAccum 蓄势</text>
  <rect x="485" y="210" width="140" height="36" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="499" y="234" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">牛市顶（延时）</text>
  <defs>
    <marker id="hdC" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker>
    <marker id="hdR" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <line x1="150" y1="68" x2="198" y2="68" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <line x1="320" y1="68" x2="368" y2="68" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <line x1="490" y1="68" x2="538" y2="68" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <line x1="260" y1="86" x2="260" y2="128" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <line x1="320" y1="148" x2="368" y2="148" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <line x1="490" y1="148" x2="538" y2="148" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <line x1="430" y1="166" x2="555" y2="208" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <line x1="255" y1="228" x2="298" y2="228" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <line x1="440" y1="228" x2="483" y2="228" stroke="#454c56" stroke-width="1.3" marker-end="url(#hdC)"/>
  <path d="M600 86 Q640 150 600 210" fill="none" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#hdR)"/>
  <text x="618" y="150" font-size="9" fill="#d5342c" font-family="sans-serif">利好兑现</text>
  <path d="M555 246 Q400 300 200 246" fill="none" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#hdR)"/>
  <text x="340" y="318" font-size="9" fill="#d5342c" font-family="sans-serif">顶后熊市反馈</text>
</svg>
:::

| 链条 | 类型 | 强度 |
|---|---|---|
| 减半 → flow↓ | 【事实】 | 100%（代码保证） |
| 预期 → 提前涨价 | 【推论】 | 高（2024 已演示） |
| flow↓ → 价格↑ | 【推论】 | 中（需 demand 配合） |
| 流动性 → 延时顶 | 【分析】 | 中（M2 领先假说） |
| 顶 → 熊市 | 【事实】 | 历史 4/4，幅度递减 |

# 隐藏关系

1. **折现与延时是正交维度**：高折现不否定延时顶——2024 先涨后仍可在 535 天后见顶。
2. **矿工 forced sell ↓ ≠ 价格必涨**：运营费用刚性，减半后矿商可能更急于卖存量【分析】。
3. **ETF 把「日产量」变成微观单位**：IBIT 单日可买 >1 天全网产量【待验证】——供给冲击被机构化吸收。
4. **四年顶 ≈ 顶到顶 4 年**：Fidelity 用 2013/17/21/25 顶连线，与减半日历部分错位【分析】。
5. **道琼斯同步**：批评者指出 BTC 峰与 DJI 峰时间差在缩小【分析】——减半可能只是「幸运计时器」。
6. **期权市场**：K33 观察减半日 OTM call 不热 → 事件日非大波动【待验证】。

# 系统运行机制

## 三阶段循环

```
Phase A · 预期折现（减半前 6–18 个月）
  → 套利者建仓 · 媒体倒计时 · 波动率抬升
Phase B · 再积累 ReAccum（减半后 5–7 个月）
  → 2024 特例：205 天横盘 · 周期「减速」
Phase C · 抛物线 + 延时顶（减半后 15–18 个月）
  → 518–546 天窗口 · M2/ETF 共振 · 随后回撤
```

:::note blue EMH 与现实的折中
RSM (2024)：理性市场不应因可预见减半而事件前暴涨【分析】。但 K33 实证减半前一月 +14%【待验证】——**市场不完全有效，但也不无限非理性**；折现是渐进的，不是开关。
:::

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「减半后 X 日胜率 Y%」必须减去 <strong>随机持币基准</strong>（μ=50%/年, σ=65%）。</p>
<div class="ctrl"><label>持有期（交易日）<input type="range" id="ds_win" min="30" max="365" step="1" value="90"><output id="ds_winO">90 日</output></label></div>
<div class="ctrl"><label>策略胜率（%）<input type="range" id="ds_strat" min="50" max="95" step="0.1" value="78.0"><output id="ds_stratO">78.0%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="ds_base">67.7%</strong><span id="ds_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="ds_ex">+10.3 pp</strong><span id="ds_exh">—</span></div>
<div class="ro"><span class="k">显著性所需 n</span><strong id="ds_n">151</strong><span id="ds_nh">—</span></div>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ds_v">弱超额</strong><span id="ds_vh">n=4 周期不够</span></div>
</div>
</div>
:::

# 时间演化

## 四次减半对照

| 周期 | 减半日 | 减半前距 ATH | 减半→峰天数 | 峰价【待验证】 |
|---|---|---|---|---|
| 2012 | 2012-11-28 | 未破前高 | ~92→后延至 368d 周期 | ~$1,150 |
| 2016 | 2016-07-09 | −42% | **518** | ~$19,800 |
| 2020 | 2020-05-11 | −53% | **546** | ~$69,000 |
| 2024 | 2024-04-19 | **+ATH 先破** | **~535**（至 2025-10-06） | ~$126,000 |

## 演化时间轴

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">减半周期 · 演化时间轴（2024 周期示意）</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#454c56"/>
  <text x="80" y="82" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022-11</text>
  <text x="80" y="122" font-size="9" text-anchor="middle" fill="#454c56" font-family="sans-serif">熊市底</text>
  <circle cx="200" cy="100" r="6" fill="#d5342c"/>
  <text x="200" y="82" font-size="9" text-anchor="middle" fill="#d5342c" font-family="sans-serif">2024-03</text>
  <text x="200" y="122" font-size="9" text-anchor="middle" fill="#d5342c" font-family="sans-serif">pre-ATH</text>
  <circle cx="280" cy="100" r="8" fill="#1d4ed8"/>
  <text x="280" y="72" font-size="10" text-anchor="middle" font-weight="700" fill="#1d4ed8" font-family="sans-serif">2024-04-19</text>
  <text x="280" y="122" font-size="9" text-anchor="middle" fill="#1d4ed8" font-family="sans-serif">第四次减半</text>
  <rect x="300" y="88" width="80" height="24" rx="4" fill="rgba(176,115,10,0.2)" stroke="#b8730a" stroke-width="1"/>
  <text x="340" y="104" font-size="9" text-anchor="middle" fill="#a06800" font-family="sans-serif">ReAccum 205d</text>
  <circle cx="520" cy="100" r="8" fill="#d5342c"/>
  <text x="520" y="72" font-size="10" text-anchor="middle" font-weight="700" fill="#d5342c" font-family="sans-serif">2025-10</text>
  <text x="520" y="122" font-size="9" text-anchor="middle" fill="#d5342c" font-family="sans-serif">延时峰 ~$126K</text>
  <circle cx="600" cy="100" r="6" fill="#0f8a4d"/>
  <text x="600" y="82" font-size="9" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">2026?</text>
  <text x="600" y="122" font-size="9" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">回撤整理</text>
  <text x="180" y="155" font-size="9" fill="#7c848f" font-family="sans-serif">←517d→</text>
  <text x="400" y="155" font-size="9" fill="#7c848f" font-family="sans-serif">←535d→</text>
</svg>
:::

:::raw
<div class="tool">
<h3>工具 · 牛市延时钟</h3>
<p>历史峰窗 <strong>518–546</strong> 天（均值 <strong>532</strong>）。调节「周期加速」模拟 pre-ATH 带来的提前/延后。</p>
<div class="ctrl"><label>当前：减半后天数<input type="range" id="hl_days" min="100" max="600" step="1" value="515"><output id="hl_daysO">515 天</output></label></div>
<div class="ctrl"><label>周期加速（天，正值=峰提前）<input type="range" id="hl_accel" min="0" max="80" step="1" value="0"><output id="hl_accelO">0 天</output></label></div>
<div class="readout">
<div class="ro"><span class="k">预测峰日</span><strong id="hl_peak">2025-10-03</strong><span id="hl_peakh">—</span></div>
<div class="ro"><span class="k">历史峰窗</span><strong id="hl_win">2025-09-19 ~ 2025-10-17</strong><span id="hl_winh">—</span></div>
<div class="ro"><span class="k">历史样本</span><strong id="hl_hist">2016:518 · 2020:546</strong><span id="hl_histh">—</span></div>
<canvas id="hlDelayChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="hl_v">峰窗附近</strong><span id="hl_vh">回撤 ≠ 周期终结</span></div>
</div>
</div>
:::

# 利益与激励

| 角色 | 公开说法 | 真实激励 |
|---|---|---|
| 矿企 CEO | 「供应危机将至」 | 股价 / 融资 |
| ETF 营销 | 「长期配置」 | 规模增长 |
| 周期分析师 | 「518 天后见顶」 | 订阅 / 影响力 |
| 空头 | 「已 price-in」 | 做空或避险 PR |
| 多头 | 「demand 未折现」 | 加仓叙事 |
| 媒体 | 「减半倒计时」 | 点击 |

**激励扭曲结果**：折现进度被**系统性高估**（多头）或**低估**（空头）——你要自己算 §06，不信口号。

# 资源与信息流

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">减半生态 · 资源与信息流（抽水图）</text>
  <rect x="260" y="40" width="160" height="44" rx="8" fill="#f0f4fd" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="278" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">BTC 现货池</text>
  <text x="278" y="74" font-size="10" fill="#454c56" font-family="sans-serif">折现与延时在此定价</text>
  <rect x="40" y="120" width="130" height="40" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.2"/>
  <text x="52" y="138" font-size="11" font-weight="700" fill="#0f8a4d" font-family="sans-serif">ETF 净流入</text>
  <text x="52" y="152" font-size="9.5" fill="#454c56" font-family="sans-serif">可 >> 日产量</text>
  <rect x="510" y="120" width="130" height="40" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.2"/>
  <text x="522" y="138" font-size="11" font-weight="700" fill="#1d4ed8" font-family="sans-serif">折现预期流</text>
  <text x="522" y="152" font-size="9.5" fill="#454c56" font-family="sans-serif">减半前 6–12 月</text>
  <rect x="40" y="220" width="130" height="40" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.2"/>
  <text x="52" y="238" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">矿工抛压</text>
  <text x="52" y="252" font-size="9.5" fill="#454c56" font-family="sans-serif">~450 BTC/天</text>
  <rect x="510" y="220" width="130" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.2"/>
  <text x="522" y="238" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">宏观流动性</text>
  <text x="522" y="252" font-size="9.5" fill="#454c56" font-family="sans-serif">M2 / 利率</text>
  <defs>
    <marker id="hdGF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#0f8a4d"/></marker>
    <marker id="hdRF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <line x1="170" y1="140" x2="258" y2="62" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#hdGF)"/>
  <text x="175" y="88" font-size="9" fill="#0f8a4d" font-family="sans-serif">吸收日产量</text>
  <line x1="510" y1="140" x2="422" y2="62" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdGF)"/>
  <text x="430" y="88" font-size="9" fill="#1d4ed8" font-family="sans-serif">提前折现</text>
  <line x1="170" y1="240" x2="258" y2="82" stroke="#d5342c" stroke-width="1.5" marker-end="url(#hdRF)"/>
  <text x="175" y="200" font-size="9" fill="#d5342c" font-family="sans-serif">结构性卖压</text>
  <line x1="510" y1="240" x2="422" y2="82" stroke="#b8730a" stroke-width="1.5" marker-end="url(#hdGF)"/>
  <text x="430" y="200" font-size="9" fill="#b8730a" font-family="sans-serif">延时牛市燃料</text>
</svg>
:::

:::raw
<div class="tool">
<h3>工具 · 供需平衡仪</h3>
<p>减半后<strong>有效冲击</strong>取决于矿工抛压能否被 ETF/OTC 吸收。</p>
<div class="ctrl"><label>矿工日抛压（BTC）<input type="range" id="sd_miner" min="200" max="900" step="5" value="450"><output id="sd_minerO">450 BTC</output></label></div>
<div class="ctrl"><label>ETF 日净买（BTC）<input type="range" id="sd_etf" min="0" max="2000" step="10" value="680"><output id="sd_etfO">680 BTC</output></label></div>
<div class="ctrl"><label>OTC/其他净买（BTC）<input type="range" id="sd_otc" min="0" max="1000" step="10" value="120"><output id="sd_otcO">120 BTC</output></label></div>
<div class="readout">
<div class="ro"><span class="k">日净吸收</span><strong id="sd_net">+350 BTC/天</strong><span id="sd_neth">—</span></div>
<div class="ro"><span class="k">ETF/矿工比</span><strong id="sd_ratio">1.51×</strong><span id="sd_ratioh">—</span></div>
<canvas id="sdBalChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="sd_v">需求 > 结构性抛压</strong><span id="sd_vh">减半冲击易被吸收</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

| # | 杠杆 | 作用 | 你怎么用 |
|---|---|---|---|
| 1 | **双时钟思维** | 拆折现 vs 延时 | 减半前看 §06，减半后看 §09 |
| 2 | **对照基准** | 防漂移当 alpha | §08 漂移剥离器 |
| 3 | **ETF 流量** | demand 是否承接 | §12 供需平衡仪 |
| 4 | **历史峰窗** | 518–546 天带 | 输出区间，非单点 |
| 5 | **pre-ATH 信号** | 折现程度温度计 | 2024 为极端案例 |
| 6 | **ReAccum 时长** | 周期加速/减速 | >180 天 = 减速 |
| 7 | **M2 仪表盘** | 延时燃料 | Look Into Bitcoin 对照图 |
| 8 | **期权偏度** | 事件日风险定价 | 减半周 put/call |
| 9 | **样本谦卑** | n=4 | 不对第五次减半做点预测 |
| 10 | **写反事实日志** | 迭代模型 | 每季记录偏差 |

# 常见认知陷阱

:::details 1. 「减半当天必暴涨」
**错。** EMH + K33 期权数据：事件日常平淡。利好在**之前**折现。
:::

:::details 2. 「已 price-in 所以减半无用」
**片面。** Hougan：supply 折现 ≠ demand 折现。flow↓ 仍改变边际均衡。
:::

:::details 3. 「518 天是精确闹钟」
**错。** 区间 ±14 天，样本 n=2（2016/20）。2025 实际 ~535 天。
:::

:::details 4. 「四年周期永远有效」
**待验证。** Fidelity 顶到顶 4 年命中 2025，但机制可能是宏观而非减半。
:::

:::details 5. 「矿工抛压减半 = 价格翻倍」
**需求函数缺失。** 无买盘时 flow↓ 只降波动，不抬价。
:::

:::details 6. 「pre-ATH = 牛市已结束」
**错。** 2024 pre-ATH 后仍涨至 $126K。高折现 ≠ 无延时顶。
:::

:::details 7. 「ETF 杀死周期」
**过度。** ETF 改变形态，未废除流动性驱动峰顶。
:::

:::details 8. 「减半策略 80% 胜率」
**未扣漂移。** 90 日基准 67.7%，真实超额或仅 +10 pp。
:::

:::details 9. 「学术回归 19 个月必到顶」
**JRFM 单篇。** 一条回归线，自由度极低。
:::

:::details 10. 「与道琼斯同步 = 减半无用」
**非此即彼。** 可能**共同驱动**（流动性），非减半单独有效。
:::

:::details 11. 「横盘 5 个月 = 周期死了」
**2024 教训。** 更长 ReAccum 后仍可抛物线。
:::

:::details 12. 「折现 100% 所以卖」
**无工具可测 100%。** 折现不可观测，只有代理指标。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实操作 | 频率 |
|---|---|---|
| 折现进度 | §06 工具 + pre-ATH 距离 | 周 |
| 延时峰窗 | §09 牛市延时钟 | 月 |
| ETF 吸收 | Farside / 发行方数据 | 日 |
| 矿工抛压 | 算 450×卖出比例 | 月 |
| 宏观燃料 | 美 M2 YoY、实际利率 | 周 |

## 2026-09 快照【待验证】

- 第四次减半已过 **~17 个月**；距 2025-10 峰 **~11 个月**
- 现货 ~**$95,000**，较峰 **−24.6%**（涨红跌绿：回撤为绿）
- ETF 时代：交易所储备多年低位，「浮动供应」收缩
- 下一次减半 **~2028**——第五次是**样本外**终极测试

# 从理论到行动

```
① 减半前 12 个月：跑 §06，记录折现 vs 模型
② 减半日：不赌事件日波动；看期权偏度
③ 减半后 0–6 月：盯 ReAccum 时长（>180d = 减速）
④ 减半后 12–18 月：§09 峰窗 ±30 天，配合 MVRV/宏观
⑤ 任何「胜率」：§08 扣漂移
⑥ 仓位 = f(区间, 置信度) — 不是 f(倒计时天数)
```

:::note green 正确用法
把本模型当作 **双时钟仪表盘**——左盘「利好剩多少」，右盘「顶还有多远」。两盘**独立读数**，不要合成一个「减半分数」。
:::

# 技能树

:::details L1 · 观察者
- [ ] 说出四次减半日期
- [ ] 解释 flow 900→450
- [ ] 背出 518–546 峰窗
:::

:::details L2 · 分析师
- [ ] 手算指数折现 180 天 = 50%
- [ ] 用 §08 剥离 78% 胜率
- [ ] 解释 2024 pre-ATH 含义
:::

:::details L3 · 建模者
- [ ] 建个人折现日志（每月）
- [ ] 对比 M2 与减半滞后
- [ ] 写 2028 第五次 falsify 条件
:::

:::details L4 · 系统设计者
- [ ] 双时钟 + 链上 + 宏观三表
- [ ] 禁止单点顶预测
- [ ] 每季更新样本表
:::

# 游戏化世界

**角色**：周期计时员（Cycle Chronometer）。左腕折现盘，右腕延时盘。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 535 天峰日 | 解锁「折现层」 |
| Lv.2 | 向朋友解释 EMH 悖论 | 解锁「延时钟」 |
| Lv.3 | 记录 4 周 ETF/矿工比 | 解锁「供需仪」 |
| Lv.4 | 写反事实：若 2024 未 pre-ATH | 解锁「镜像周期」 |
| Lv.5 | 一页「第五次减半假设」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 价 + ETF 流向 | 7 日表 |
| 每周 | 更新 §06 折现读数 | 截图 |
| 每月 | 重算减半后天数 & 峰窗 | §09 |
| 每季 | 对比实际 vs 518–546 带 | 偏差日志 |
| 每次减半 | 更新四代对照表 | 误差 <3 天 |

# 反事实模拟

:::tabs
@@情景 A · 若 2024 未 pre-ATH
减半后或再现「三个月暴涨」旧剧本；折现率低，事件日波动更大。与实际「五个月横盘」形成对照——**demand 结构变了**。

@@情景 B · 若 ETF 不存在
450 BTC/日减量或无法被单日吸收，价格对 flow 更敏感；延时峰或更早触发（供给弹性更低）。

@@情景 C · 若 518 天模板失效
2025 未创新高 → 四年周期叙事重大 falsify。你应转向纯宏观/链上框架，而非微调天数。

@@情景 D · 若折现达 100% 仍涨
证明 **demand 折现通道独立**——Hougan 论点的极端版。supply 故事结束，liquidity 故事继续。
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会读日历** | 3 天 | 减半日 + 峰窗 | 口算 532 天 |
| **L2 会拆双时钟** | 1 周 | 折现 + 延时 | 三工具实操 |
| **L3 会接 demand** | 2 周 | ETF + M2 面板 | 7 日流量日志 |
| **L4 会迭代** | 1 月+ | 2028 falsify 清单 | 一季偏差 <15% |

# 30 分钟最小实践

**任务**：「减半双时钟三联检」

1. **8 分钟 · 折现**：§06 设「距减半 180 天、市场折现 55%」→ 模型折现应 **50.0%**，有效冲击 **22.5%**。
2. **7 分钟 · 延时**：§09 设减半后 **515** 天、加速 **0** 天 → 预测峰 **2025-10-03**，处于历史带内。
3. **8 分钟 · 基准**：§08 设 90 日、胜率 **78%** → 基准 **67.7%**，超额 **+10.3 pp**，n≈**151**。
4. **7 分钟 · 结论**：三句话——(a) 折现与模型差 (b) 是否在峰窗 (c) 策略是否 beat 基准。**禁止写「必涨到 $X」。**

**验证**：三工具默认读数与上文误差 **<0.2 pp**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Fidelity 四年周期 + Chainalysis 减半 |
| D2 | 折现 | EMH vs K33 + §06 |
| D3 | 延时 | Rekt 518–546 + §09 |
| D4 | demand | ETF 7 日 + §12 |
| D5 | 批评 | 领英 OK「打碎周期论」摘要 |
| D6 | 基准 | §08 多组 μ/σ |
| D7 | 合成 | 1 页双时钟笔记 |

# 30 天能力构建计划

**Week 1**：减半机制 + 四代表（L1）
**Week 2**：折现模型 + 漂移剥离（L2）
**Week 3**：延时峰窗 + ETF/M2（L3）
**Week 4**：个人双时钟系统 + 2028 假设（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **指数折现** | 1−e^(−kt) | k 不可直接观测 |
| 2 | **有效供给冲击** | (1−π)×Δflow | π 是信念不是事实 |
| 3 | **518–546 峰窗** | 减半后延时顶 | n=2 |
| 4 | **镜像周期** | 底 517d 前 / 顶 548d 后 | 巧合风险 |
| 5 | **四年顶日历** | 顶到顶 ~4 年 | 与减半错位 |
| 6 | **ReAccum 减速** | 横盘越久加速越少 | 2024 +42d |
| 7 | **ETF 吸收** | 日买/日产量 | 流量波动 |
| 8 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 9 | **EMH 折中** | 渐进折现 | 非 0/1 |
| 10 | **sell the news** | 事件日平淡 | 不等于熊市 |

# 关键问题清单

:::details 折现
- 当前距下次减半多久？已折现多少（代理）？
- pre-ATH 是否出现？
- 期权偏度是否看涨？
:::

:::details 延时
- 减半后天数？是否在 518–546 带？
- ReAccum 是否 >180 天？
- M2 方向？
:::

:::details demand
- ETF 7 日净流入？
- 矿工/ETF 日比？
- 交易所储备趋势？
:::

:::details 决策
- 策略胜率是否扣过漂移？
- 样本 n 是否够？
- 是否把区间当单点？
:::

# 下一阶段探索

1. **第五次减半（~2028）**：提前写下折现/延时 falsify 条件
2. **折现率估计器**：用期权隐含波动 + 远期曲线反推 π
3. **M2 领先滞后回归**：量化 liquidity vs halving 方差分解
4. **矿股 vs spot 折现差**：forced seller 视角的跨市场套利
5. **与 PLT/S2F 耦合**：供给时钟 + 估值时钟三联表

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 2024-04-19 第四次减半 | 链上 | Bitcoin Core | 【事实】 |
| flow 900→450 BTC/日 | 协议计算 | 区块奖励 | 【事实】 |
| pre-ATH ~$73K (2024-03) | 市场 | CoinGecko 等 | 【事实】 |
| 峰 518/546 天 | 分析师 | Rekt Capital 2024 | 【待验证】 |
| 2025-10 峰 ~$126K | 媒体 | Look Into Bitcoin / Fidelity | 【待验证】 |
| K33 减半前一月 +14% | 研报 | K33 Research 2024 | 【待验证】 |
| Hougan demand 未折现 | 媒体 | CryptoSlate / Bitwise | 【分析】 |
| JRFM 19 个月峰 | 同行评审 | JRFM 2024 vol.17 | 【分析】 |
| ETF >$100B | 行业 | BingX / Galaxy 2025 | 【待验证】 |
| ReAccum 205 vs 163 天 | 分析师 | Rekt Capital | 【待验证】 |
| EMH 减半悖论 | 学术 | RSM Discovery 2024 | 【分析】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的回撤；减半周期、预期折现与延时顶模型均基于**仅 4 次历史样本**，不保证 2028 第五次减半仍有效。请勿依据日历倒计时进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
