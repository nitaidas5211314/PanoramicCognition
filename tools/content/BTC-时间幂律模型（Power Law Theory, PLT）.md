---
slug: BTC-时间幂律模型（Power Law Theory, PLT）
title: BTC-时间幂律模型（Power Law Theory, PLT）
subtitle: 比特币价格与<strong>创世以来天数</strong>在双对数坐标上近似直线——PLT 把它从曲线拟合推进到机制理论，但 2026 年仍低于公允价 <strong>34%</strong>，时点预测已多次失手
brand_sub: Bitcoin × Power Law × Time
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, 幂律, PLT, Santostasi, 估值走廊]
theme_js_file: BTC-时间幂律模型（Power Law Theory, PLT）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**PLT（Power Law Theory）主张：BTC 价格 P 与网络年龄 t（创世块以来天数）满足幂律关系 `P ∝ t^β`，双对数图上 β≈5.69，R²≈0.96【分析】。** 2026-09-16 网络年龄 **6465 天**，模型公允价约 **$143,925**，现货约 **$95,000**，偏离 **−0.180 dex（折价 34.0%）**【推论】。

与 S2F 不同，PLT 的输入主要是**时间**而非稀缺比率；支持者（Santostasi、Perrenod）给出采用率×Metcalfe 的机制分解【分析】，批评者（Stolte、Morris）指出**起点平移可让指数漂到 5.65–16.49**【分析】。**历史描述强，因果与时点预测仍待证伪。**

# 这个领域到底是什么

## 一句话定位

「BTC-时间幂律模型」研究的是：**比特币长期价格是否随网络年龄按可重复的幂律缩放增长，以及这条规律能否转化为可操作的走廊、地板与周期时钟**。它由物理学家 Giovanni Santostasi 在 2015 年前后提出，2024–2026 年随《The Physics of Bitcoin》与 Santostasi & Perrenod (2026) 论文再度升温。

:::note red 先划清边界
本手册**不提供**「按 PLT 应在 $X」的买卖指令。幂律是**描述性规律 + 机制假说**；2026 年 1 月 **$210K 周期顶**预测已失手（现货 ~$96K）【待验证】——时点外推必须附失败记录。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | log-log 回归、β 指数、走廊带、机制分解、样本外与伪回归检验 |
| 2 | 边界在哪 | 不含短线指标；不预测监管黑天鹅；不替代风险管理 |
| 3 | 核心对象 | 价格 P、网络年龄 t、指数 β、残差 σ（dex）、公允价走廊 |
| 4 | 参与者 | Santostasi、Perrenod、Burger、Stolte、Morris、ETF 机构、矿工 |
| 5 | 关键变量 | β、logA、σ_dex、折价%、减半相位、地址采用率 N |
| 6 | 可观察的 | 日收盘价、创世日计数、链上地址/算力、残差分位数 |
| 7 | 不可观察但可推断 | 真实采用者数、丢失币、OTC 流量 |
| 8 | 谁影响谁 | 采用↑→N↑→P↑（Metcalfe）；难度调整→算力幂律；**t 与 P 共趋势** |
| 9 | 因果 | 难度调整/减半=【事实】；P∝t^5.69=【推论】；Granger 方向未完全确立【待验证】 |
| 10 | 只是相关 | 价格与日历时间、与算力、与地址数均强相关 |
| 11 | 表层现象 | log-log 直线、四年周期顶底落在走廊内 |
| 12 | 底层机制 | 无标度网络采用 + 广义 Metcalfe + 挖矿物理地板 |
| 13 | 反馈 | 涨价→媒体→采用加速；折价→「历史性抄底窗口」叙事 |
| 14 | 时间延迟 | 机制传导以年计；**时点顶底预测误差可达数月** |
| 15 | 正负反馈 | 正：信仰强化→长期持有；负：预测失手→模型信誉损伤 |

## 核心公式

| 形式 | 表达式 | 典型参数【待验证】 |
|---|---|---|
| 线性（回归用） | log₁₀P = a + β·log₁₀t | β=**5.69**, a≈−16.524 |
| 幂律 | P = A·t^β | A≈10^a |
| 走廊（±1σ） | P_floor = P_fair · 10^−σ | σ≈**0.302 dex** |
| DN 三轨 | support = fair÷2.2, resist = fair×2.2 | 简化版 |
| 机制分解 | β ≈ β_A × β_M | 3 × 1.84 ≈ **5.52**【分析】 |

# 为什么值得研究

## 理由一：PLT 是 post-S2F 时代最「耐打」的长线框架

PlanB 的 S2F 在 2022 后严重偏离【分析】；PLT 因**对数减速**（同样 β，涨幅随 t 增大而放缓）避免了 S2F 的荒谬终端价【推论】。btcpowerlaw.nl 独立复现：β=5.694，Engle-Granger 协整 p=**0.025**，残差 ADF p=**0.006**【分析】——**共趋势存在，但不等于可交易 alpha**。

## 理由二：2026 是 falsify 窗口

| 预测来源 | 内容 | 2026 结果 |
|---|---|---|
| Santostasi (2024) | 2026-01 周期顶 ~**$210K** | 未达；现货 ~$96K【待验证】 |
| CryptoPotato (2024) | 2025-11 顶 ~**$218,875** | 未验证/失手【待验证】 |
| 公允价线 | 2026-09 fair ~**$144K** | 现货折价 **34%**【推论】 |

**学会读「失手记录」比学会读 log 图更重要。**

## 理由三：对照基准剥离「抄底胜率」幻觉

BTC 有正漂移。μ=50%/年、σ=65%/年时：

| 持有期 | 随机持币基准胜率 | 「90 日 78% 折价抄底」真实超额 |
|---|---|---|
| 30 日 | **60.5%** | 表面 +17.5 pp → 真实约 **+17.5 pp**（若胜率属实） |
| 90 日 | **67.7%** | 表面 +10.3 pp |
| 180 日 | **74.2%** | 表面 +3.8 pp |
| 365 日 | **82.3%** | 长期持有基准已很高 |

**任何「历史折价区 100% 一年后上涨」统计，都要问：是否只是 drift + 小样本？**

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从创世块，到走廊交易

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-PLT · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「数学/协议约束」，越靠下越「叙事/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 时间原点层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">创世 2009-01-03 · t=天数 · 起点选择影响 β【分析】</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：平移 200 天 → β 可漂 0.3+</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 幂律回归层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">log₁₀P = a + β·log₁₀t · R²≈0.96 · 6 个数量级</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">失效：高 R² ≠ 因果 · sigmoid 替代同样拟合【分析】</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 机制理论层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">N∝t³ · P∝N^1.84 · 难度调整 → 算力幂律</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">失效：β=β_A×β_M 是代数恒等式，非独立证据【分析】</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 走廊带层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">±σ_dex · fair/2.2~fair×2.2 · 波动逐周期压缩</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：σ 从 0.395→0.211 dex，「地板」依赖结构假设</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 周期时钟层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">减半后 ~525 日顶 · ~365 日底 · Bitcoin Clock</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：Pi/MVRV 等指标逐周期衰减【分析】</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 统计检验层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">协整 · 残差平稳 · walk-forward · 起点敏感性</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">支持：非纯伪回归；反对：外推唯一性未证</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 制度层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">ETF 托管 · 波动收敛 · 机构 dampening 2025【待验证】</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">失效：「机构化 = 更贴 fair 线」尚无定论</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">$10M@2045 · 「物理定律」叙事 · YouTube 复兴</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：只展示拟合段 · 隐藏预测失手</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">走廊分位 · 禁止单点时顶 · 对照基准 · OOS 日记</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">把 PLT 当风险地图，不当水晶球</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">PLT 概念 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 无标度增长</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 网络效应</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 物理系统类比</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 时间翻译对称</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• N∝t^β_A</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• P∝N^β_M</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 难度→算力幂律</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• OLS log-log 拟合</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 算 t 与 fair</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 读 dex 偏离</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 走廊分位建仓</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 起点敏感性测试</text>
  <defs><marker id="pltA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="214" y1="120" x2="238" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#pltA)"/>
  <line x1="440" y1="120" x2="464" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#pltA)"/>
</svg>
:::

## 跨域同构

| PLT 结构 | 其他领域 | 共同数学 |
|---|---|---|
| P∝t^β | 城市规模、公司营收 | 超线性缩放 · 警惕伪回归 |
| Metcalfe N² | 电信/社交网络估值 | 用户数→价值超线性 |
| 波动逐周期压缩 | 成熟资产隐波下降 | σ 随制度化收窄 |
| 起点敏感性 | 物理标度律拟合 | 截距/原点任意性 |
| 走廊均值回归 | Bollinger/估值带 | 价格围绕趋势振荡 |
| S 曲线被幂律替代 | 病毒传播+抑制机制 | 曲率机制→幂律尾 |

# 核心参与者

| 参与者 | 与 PLT 的关系 | 激励扭曲 |
|---|---|---|
| **Giovanni Santostasi** | PLT 提出者，《The Physics of Bitcoin》 | 著作销量 vs 科学声誉 |
| **Fred Krueger** | 数学建模、传播 | 影响力 |
| **Stephen Perrenod** | 协整/平稳性辩护【分析】 | 与 Santostasi 合著 |
| **Harold Burger** | 2019 实证走廊 β≈5.85 | 早期可视化 |
| **Tim Stolte (Amdax)** | 系统批评起点与伪回归 | 资管立场 |
| **James Morris** | 「占星术」式宽区间批评 | 媒体流量 |
| **ETF 发行人** | 借用长线叙事 | AUM |
| **你** | 读者/投资者 | 折价区确认偏误 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **t** | 创世以来天数 | **6465** |
| **β** | 幂律指数 | **5.69**（区间 5.6–5.9） |
| **P_fair** | 10^(a+β·log₁₀t) | **$143,925** |
| **P_spot** | 现货 | **~$95,000** |
| **dex 偏离** | log₁₀(P_spot/P_fair) | **−0.180** |
| **σ_resid** | 残差标准差 | **0.302 dex** |
| **floor −1σ** | P_fair·10^−σ | **$71,802** |
| **support** | fair÷2.2 | **$65,420** |
| **β 分解** | β_A≈3, β_M≈1.84 | 积≈**5.52**【分析】 |

:::raw
<div class="tool">
<h3>工具 · 幂律公允价计算器</h3>
<p>调节网络年龄、指数 β 与现货，即时算公允价与 dex 偏离。</p>
<div class="ctrl"><label>网络年龄 t（天）<input type="range" id="plt_days" min="2000" max="8000" step="1" value="6465"><output id="plt_daysO">6465 天</output></label></div>
<div class="ctrl"><label>幂律指数 β<input type="range" id="plt_beta" min="5.4" max="6.2" step="0.01" value="5.69"><output id="plt_betaO">5.69</output></label></div>
<div class="ctrl"><label>现货价（USD）<input type="range" id="plt_spot" min="20000" max="250000" step="500" value="95000"><output id="plt_spotO">$95,000</output></label></div>
<div class="readout">
<div class="ro"><span class="k">公允价</span><strong id="plt_fair">$143,925</strong><span id="plt_fairh">—</span></div>
<div class="ro"><span class="k">dex 偏离</span><strong id="plt_dex">−0.180 dex</strong><span id="plt_dexh">—</span></div>
<div class="ro"><span class="k">折价</span><strong id="plt_disc">−34.0%</strong><span id="plt_disch">—</span></div>
<div class="ro"><span class="k">−1σ 地板</span><strong id="plt_floor">$71,802</strong><span id="plt_ceil">$288,493</span></div>
<canvas id="pltPriceChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="plt_v">折价区</strong><span id="plt_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 实线因果与虚线反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">PLT 因果图（实线=主张因果 · 红虚线=反馈/争议）</text>
  <rect x="40" y="50" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="95" y="76" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">网络年龄 t</text>
  <rect x="200" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="255" y="76" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">采用者 N</text>
  <rect x="360" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="415" y="76" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">哈希率 H</text>
  <rect x="520" y="50" width="110" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="575" y="76" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">价格 P</text>
  <defs><marker id="pltC1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="150" y1="72" x2="198" y2="72" stroke="#454c56" stroke-width="1.3" marker-end="url(#pltC1)"/>
  <line x1="310" y1="72" x2="358" y2="72" stroke="#454c56" stroke-width="1.3" marker-end="url(#pltC1)"/>
  <line x1="470" y1="72" x2="518" y2="72" stroke="#454c56" stroke-width="1.3" marker-end="url(#pltC1)"/>
  <line x1="95" y1="94" x2="575" y2="130" stroke="#454c56" stroke-width="1.3" marker-end="url(#pltC1)"/>
  <text x="330" y="125" font-size="10" fill="#454c56" font-family="sans-serif">P ∝ t^β（PLT 主主张）</text>
  <line x1="575" y1="94" x2="255" y2="130" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#pltC1)"/>
  <text x="400" y="155" font-size="10" fill="#d5342c" font-family="sans-serif">涨价→FOMO→采用（反馈）</text>
  <line x1="575" y1="94" x2="415" y2="130" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#pltC1)"/>
  <text x="500" y="175" font-size="10" fill="#d5342c" font-family="sans-serif">涨价→挖矿利润→算力↑</text>
  <rect x="40" y="200" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="110" y="226" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">难度调整</text>
  <rect x="220" y="200" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="290" y="226" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">区块奖励递减</text>
  <rect x="400" y="200" width="140" height="44" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="470" y="226" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">ETF/宏观需求</text>
  <line x1="110" y1="200" x2="415" y2="94" stroke="#0f8a4d" stroke-width="1.1" marker-end="url(#pltC1)"/>
  <line x1="470" y1="200" x2="575" y2="94" stroke="#7c848f" stroke-width="1.1" marker-end="url(#pltC1)"/>
  <text x="14" y="280" font-size="10.5" fill="#7c848f" font-family="sans-serif">争议：t→P 可能是共同趋势；需求侧（ETF）不在原始 PLT 方程中</text>
</svg>
:::

**三条因果链：**

1. **t → N → P**（机制派）：采用按 t^3，Metcalfe 给 P∝N^1.84【分析】。
2. **t → P**（简约派）：直接回归，协整检验支持长期关系【分析】。
3. **ETF/宏观 → P**（制度派）：2024–2025 主导边际买家【待验证】——可解释「低于 fair 线」。

# 隐藏关系

| 隐藏关系 | 表面看 | 实际机制 |
|---|---|---|
| β 稳定 | 「物理常数」 | 从 5.98→5.68 持续漂移【待验证】 |
| 折价=机会 | 历史 100% 回升 | 可能只是正漂移 + 生存者叙事 |
| 与 S2F 对立 | 二选一 | 都与时间强相关；PLT 更保守 |
| 矿工地板 | 物理底价 | σ 地板随周期变化 0.395→0.211 |
| 协整=可交易 | 统计显著 | walk-forward 才验 alpha |
| $10M@2045 | 精确预测 | 2045 fair ~$8.17M（β=5.69）【推论】 |

:::raw
<div class="tool">
<h3>工具 · 起点敏感性探测器</h3>
<p>平移回归起点，观察 β 与公允价如何漂移——Stolte 批评的核心操作化。</p>
<div class="ctrl"><label>起点平移（天）<input type="range" id="plt_shift" min="0" max="1000" step="50" value="0"><output id="plt_shiftO">+0 天</output></label></div>
<div class="readout">
<div class="ro"><span class="k">拟合 β</span><strong id="plt_obeta">5.69</strong><span id="plt_obetah">—</span></div>
<div class="ro"><span class="k">平移后公允价</span><strong id="plt_ofair">$143,925</strong><span id="plt_ofairh">—</span></div>
<div class="ro"><span class="k">创世起点公允价</span><strong id="plt_orig">$143,925</strong><span id="plt_origh">—</span></div>
<canvas id="pltOriginChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="plt_v2">轻度敏感</strong><span id="plt_v2h">—</span></div>
</div>
</div>
:::

# 系统运行机制

## PLT 如何「运转」

```text
每日收盘价 → 更新 t → 重算 P_fair = 10^(a+β·log₁₀t)
           → 算 dex = log₁₀(P/P_fair) → 映射到走廊分位
           → 叠加周期时钟（减半相位）→ 形成「区间」而非点估计
           → 与 ETF/利率/波动制度交叉验证
```

**关键：PLT 是慢变量系统**——公允价每天只上移约 **0.04%**（t 增 1 天，β=5.69），而现货日波动常 **>3%**。**信号噪声比极低，不适合短线。**

## 与 S2F 的运行差异

| 维度 | S2F | PLT |
|---|---|---|
| 主输入 | stock/flow | 天数 t |
| 增长速度 | 指数外推 | 幂律减速 |
| 终端价 | 荒谬高 | 高但较克制 |
| 样本外 | 已严重偏离 | 走廊仍大致包容 |
| 机制 | 稀缺 | 采用+时间缩放 |

# 时间演化

## 演化时间轴

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">PLT 演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#1d4ed8"/>
  <text x="80" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2009</text>
  <text x="80" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">创世</text>
  <circle cx="180" cy="100" r="6" fill="#1d4ed8"/>
  <text x="180" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2015</text>
  <text x="180" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">Santostasi</text>
  <circle cx="300" cy="100" r="6" fill="#b8730a"/>
  <text x="300" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2018</text>
  <text x="300" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">reddit 模型</text>
  <circle cx="420" cy="100" r="6" fill="#b8730a"/>
  <text x="420" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2024</text>
  <text x="420" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">YouTube 复兴</text>
  <circle cx="520" cy="100" r="6" fill="#d5342c"/>
  <text x="520" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2026</text>
  <text x="520" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">$210K 失手</text>
  <circle cx="600" cy="100" r="6" fill="#0f8a4d"/>
  <text x="600" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2045?</text>
  <text x="600" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">~$8.2M fair</text>
  <text x="14" y="165" font-size="10.5" fill="#7c848f" font-family="sans-serif">β 估计：5.98 (2015) → 5.85 (Burger 2019) → 5.69 (2026)【待验证】</text>
  <text x="14" y="185" font-size="10.5" fill="#7c848f" font-family="sans-serif">σ：0.395 (周期1) → 0.211 (周期5)【分析】</text>
</svg>
:::

## 四阶段成熟度

| 阶段 | 年代 | 特征 | PLT 角色 |
|---|---|---|---|
| 混沌期 | 2009–2012 | 无交易所定价 | 数据不可用 |
| 发现期 | 2013–2017 | log-log 直线显现 | 曲线拟合 |
| 叙事期 | 2018–2023 | 与 S2F 并存 | 保守走廊 |
| 检验期 | 2024– | 学术辩护+失手记录 | 机制 vs 描述之争 |

# 利益与激励

| 利益方 | 从 PLT 得到什么 | 如何扭曲 |
|---|---|---|
| 长期持有者 | 「时间站在我这边」 | 忽视时点风险 |
| 内容创作者 | 震撼标题（$10M） | 隐藏置信区间 |
| 卖方研究 | 长线背书 | 不披露样本外 |
| 批评者 | 流量/差异化 | 可能低估协整证据 |
| 矿工 | 地板价叙事 | 混淆 σ 地板与成本 |

# 资源与信息流

## 资金流与注意力抽水

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">PLT 叙事 · 资金流抽水图</text>
  <rect x="40" y="50" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="100" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">散户储蓄</text>
  <rect x="220" y="50" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="280" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">「折价抄底」</text>
  <rect x="400" y="50" width="120" height="50" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="460" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">BTC 现货</text>
  <rect x="220" y="150" width="120" height="50" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="280" y="178" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">媒体/课程</text>
  <rect x="400" y="150" width="120" height="50" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="460" y="178" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">交易手续费</text>
  <defs><marker id="pltP1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker></defs>
  <line x1="160" y1="75" x2="218" y2="75" stroke="#d5342c" stroke-width="1.5" marker-end="url(#pltP1)"/>
  <line x1="340" y1="75" x2="398" y2="75" stroke="#d5342c" stroke-width="1.5" marker-end="url(#pltP1)"/>
  <line x1="280" y1="100" x2="280" y2="148" stroke="#7c848f" stroke-width="1.2" marker-end="url(#pltP1)"/>
  <line x1="460" y1="100" x2="460" y2="148" stroke="#7c848f" stroke-width="1.2" marker-end="url(#pltP1)"/>
  <text x="14" y="230" font-size="10.5" fill="#7c848f" font-family="sans-serif">抽水点：把「34% 折价」包装成无风险套利；忽略杠杆爆仓与多年横盘</text>
</svg>
:::

**信息源分级：**

| 级别 | 来源 | 可信度 |
|---|---|---|
| A | 原始日价 + 自算回归 | 【事实】可复现 |
| B | Santostasi & Perrenod (2026) | 【分析】需读局限章节 |
| C | btcpowerlaw.nl 复现报告 | 【分析】独立验证 |
| D | 社交媒体「必达 $X」 | 【待验证】默认打折 |

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 为何关键 | 今日可做 |
|---|---|---|---|
| 1 | **算 dex 分位** | 把价转化为相对位置 | §06 计算器 |
| 2 | **起点敏感性** | 一行代码 falsify「常数 β」 | §08 工具 |
| 3 | **对照基准** | 剥离 drift 幻觉 | §09 漂移剥离器 |
| 4 | **读失手记录** | 2026 $210K | 建预测日志 |
| 5 | **σ 周期压缩** | 解释「越来越窄」 | §10 工具 |
| 6 | **机制分解验证** | β_A×β_M 是否独立 | 查地址数据 |
| 7 | **walk-forward** | 真预测检验 | 留 20% 样本 |
| 8 | **与 ETF flow 交叉** | 解释折价 | 周度记录 |
| 9 | **禁止单点时顶** | 避免爆仓 | 写进规则 |
| 10 | **仓位≤Kelly/2** | 幂律≠确定性 | 风险预算 |

# 常见认知陷阱

:::details 陷阱 1 · 「log 图直线 = 物理定律」
双对数线性只说明**缩放关系**，不证明生成机制。城市规模、公司营收也有类似直线【分析】。
:::

:::details 陷阱 2 · 「R²=0.96 所以必涨」
价格水平回归的 R² 在共趋势序列上**inflate**。要问：残差是否平稳？OOS 是否 beat naive？【分析】
:::

:::details 陷阱 3 · 「β=5.69 是常数」
从 5.98→5.68 漂移；平移起点 β 可变 0.3+【待验证】。**常数叙事 oversell。**
:::

:::details 陷阱 4 · 「折价 34% = 安全抄底」
2022 折价更深，恢复耗时 **12+ 月**；杠杆者仍爆仓【事实】。
:::

:::details 陷阱 5 · 「协整 = 交易信号」
Engle-Granger p=0.025 只说明长期关系【分析】；**不保证下月 alpha**。
:::

:::details 陷阱 6 · 「$210K 只是迟到」
宽化预测 = 降低 falsifiability；**记为 partially falsified**【推论】。
:::

:::details 陷阱 7 · 「PLT 与 S2F 互斥」
都与时间共线；可同时「错」或「部分对」【分析】。
:::

:::details 陷阱 8 · 「历史折价区 100% 胜率」
未扣 drift；样本选择性；**需 OOS + 基准**【分析】。
:::

:::details 陷阱 9 · 「机制分解 = 双重验证」
β=β_A×β_M 是代数恒等式【分析】；独立预测才算验证。
:::

:::details 陷阱 10 · 「2045 $10M 很精确」
β=5.69 时 2045 fair ~**$8.17M**【推论】；Morris：区间太宽像占星【分析】。
:::

:::details 陷阱 11 · 「波动收敛 = 更安全」
σ↓ 也可能意味 **低回报 decade**【假设】。
:::

:::details 陷阱 12 · 「矿工地板 = 模型地板」
σ 地板是统计带，非电力成本【分析】。
:::

# 从抽象到现实

| 抽象主张 | 现实映射 | 可观测指标 |
|---|---|---|
| P∝t^5.69 | 长期 CAGR 递减但仍正 | 5 年滚动 CAGR |
| 折价均值回归 | 2022–2026 低于 fair | dex 时间序列 |
| 周期顶 ~525 日 post-halving | 2025 顶是否贴合 | 减半日历 |
| 波动压缩 | ETF 后波动下降【待验证】 | 实现波动率 |
| 机制 N∝t³ | 活跃地址增长 | 链上地址 stock |

# 从理论到行动

## 决策框架（非信号）

1. **定位**：算 dex → 若在 −0.25 以下，属历史罕见折价带【推论】。
2. **验证**：查 ETF 7 日 flow + 利率方向——需求是否支撑回归。
3. **规模**：即使相信均值回归，仓位用 **½-Kelly** 或更低。
4. ** falsify 条件**：若 dex < −0.35 持续 18 月 → 下调 β 或放弃 PLT 交易含义。
5. **禁止**：单点时顶、杠杆抄底、把 fair 当 guarantee。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「折价抄底」策略胜率必须减去随机持币基准（μ=50%/年，σ=65%/年）。</p>
<div class="ctrl"><label>策略胜率（%）<input type="range" id="plt_win" min="50" max="95" step="0.5" value="78"><output id="plt_winO">78.0%</output></label></div>
<div class="ctrl"><label>持有期（日）<input type="range" id="plt_hold" min="30" max="365" step="5" value="90"><output id="plt_holdO">90 日</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="plt_base">67.7%</strong><span id="plt_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="plt_excess">+10.3 pp</strong><span id="plt_excessh">—</span></div>
<div class="ro"><span class="k">所需样本量</span><strong id="plt_n">151</strong><span id="plt_nh">—</span></div>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="plt_v3">有一定超额</strong><span id="plt_v3h">—</span></div>
</div>
</div>
:::

# 技能树

:::details L1 · 观察者
- [ ] 手算 t=6465 与 fair≈$144K
- [ ] 解释 dex 与 σ 的含义
- [ ] 说出 PLT 与 S2F 的一个区别
:::

:::details L2 · 分析师
- [ ] 复述 Stolte 起点批评
- [ ] 手算折价 34%
- [ ] 用漂移剥离器算 90 日超额
:::

:::details L3 · 建模者
- [ ] 跑起点敏感性工具
- [ ] 读协整 vs OOS 区别
- [ ] 写 2026 $210K 失手摘要
:::

:::details L4 · 系统设计者
- [ ] 建 dex+ETF 双仪表盘
- [ ] 禁止单点时顶规则
- [ ] 季度更新 β 与 σ
:::

# 游戏化世界

**角色**：走廊导航员（Corridor Navigator）。等级越高，越不信单点预测，越会查失手记录。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 fair 误差 <2% | 解锁「回归层」 |
| Lv.2 | 向朋友解释 dex | 解锁「起点探测器」 |
| Lv.3 | 列出 3 条 PLT 失手 | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周记录 dex | 解锁「σ 压缩图」 |
| Lv.5 | 写「PLT 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘与 dex | 7 日表 |
| 每周 | 更新 fair 与分位 | §06 截图 |
| 每月 | 读一篇支持/批评文 | 3 行摘要 |
| 每季 | 复核 β 估计是否漂移 | 与官方差 <0.05 |
| 每年 | 对照预测日志 | 命中率诚实记录 |

# 反事实模拟

:::tabs
@@情景 A · 若 PLT 因果成立
2026 应在 fair ~$144K 附近，折价逐步收敛。现货 $95K → 需 **+51%** 才回归 fair【推论】。**时间不确定**——可能 6 月，也可能 36 月。

@@情景 B · 若 β 继续下行
fair 曲线 flatten，2045 目标从 $10M 降至 ~$5M【假设】。长期持有者回报下降，但「失手」压力减轻。

@@情景 C · 若 ETF 需求永久疲弱
dex 可长期 <−0.25——**供给叙事与时间叙事同时失效**于价格【假设】。2022–2026 已是部分演示。

@@情景 D · 若仅描述、无 alpha
协整成立但 walk-forward 不 beat buy-and-hold——PLT 只做 **风险地图**，不做交易圣杯【分析】。最可能的中性结局。
:::

:::raw
<div class="tool">
<h3>工具 · 走廊波动压缩观测</h3>
<p>逐周期残差 σ 下降，解释「精确顶底」为何越来越难。</p>
<div class="ctrl"><label>减半周期<input type="range" id="plt_cycle" min="0" max="4" step="1" value="4"><output id="plt_cycleO">周期 5（当前）</output></label></div>
<div class="readout">
<div class="ro"><span class="k">残差 σ</span><strong id="plt_sigma">0.211 dex</strong><span id="plt_sigmah">—</span></div>
<div class="ro"><span class="k">σ 地板价</span><strong id="plt_cfloor">—</strong><span id="plt_cfloorh">—</span></div>
<canvas id="pltVolChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="plt_v4">波动收敛期</strong><span id="plt_v4h">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会算 fair** | 3 天 | t、β、dex | 口算 $144K |
| **L2 会拆批评** | 1 周 | 起点+伪回归 | 探测器实操 |
| **L3 会验样本外** | 2 周 | walk-forward 思路 | 预测日志 |
| **L4 会建系统** | 1 月+ | dex+flow 仪表盘 | 禁单点时顶 |

# 30 分钟最小实践

**任务**：完成「PLT 三联检」——算、敏、判。

1. **8 分钟 · 手算 fair**：t=6465，β=5.69，logA=−16.524 → fair≈**$143,925**。
2. **7 分钟 · dex**：现货 $95,000 → dex=**−0.180**，折价 **34.0%**。
3. **8 分钟 · 敏感性**：§08 起点探测器，平移 +400 天看 β 变化。
4. **7 分钟 · 结论**：写三句话——(a) 你在走廊哪分位 (b) 一条批评 (c) 一条支持。**禁止写「必涨到 fair」。**

**验证**：fair 与 §06 默认读数误差 **<1%**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Santostasi 摘要 + 公式 |
| D2 | 手算 | t/fair/dex 表 |
| D3 | 批评 | Stolte + Morris 各 3 条 |
| D4 | 工具 | §06–§10 四个交互模型 |
| D5 | 对比 | PLT vs S2F 一页 |
| D6 | 失手 | 整理 $210K 预测 vs 现实 |
| D7 | 合成 | 「PLT 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：公式 + 手算 + 走廊概念（L1）
**Week 2**：批评文献 + 起点敏感性 + 漂移剥离（L2）
**Week 3**：协整/OOS 概念 + ETF 交叉（L3）
**Week 4**：个人 dex 仪表盘 + 预测日志（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **幂律 P∝t^β** | 双对数直线 | 共趋势 |
| 2 | **dex 偏离** | log₁₀(P/P_fair) | 忽略 σ 带宽 |
| 3 | **σ 走廊** | ±0.302 dex | 逐周期压缩 |
| 4 | **Metcalfe 分解** | N∝t³, P∝N^1.84 | 代数恒等式 |
| 5 | **协整检验** | 长期关系 | ≠ 交易 alpha |
| 6 | **起点敏感性** | 平移 t₀ | β 可漂 3× |
| 7 | **减半时钟** | ~525 日顶 | 指标衰减 |
| 8 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 9 | **walk-forward** | 真 OOS | 比 R² 重要 |
| 10 | **波动衰减** | σ 0.395→0.211 | 地板假设 |

# 关键问题清单

:::details 模型
- 你用的 β 和起点 t₀ 是什么？
- dex 处于历史哪个分位？
- 上次时点预测是否失手？
:::

:::details 机制
- 地址增长是否支持 N∝t³？
- Granger：N→P 还是 P→N？
- ETF flow 能否解释当前折价？
:::

:::details 风险
- 若 dex 再扩 −0.1，你扛得住吗？
- 杠杆抄底爆仓价在哪？
- 样本量够证「抄底策略」吗？
:::

:::details 决策
- 你把 fair 当目标还是上限？
- 策略胜率扣过 drift 吗？
- 有书面 falsify 条件吗？
:::

# 下一阶段探索

1. **Santostasi & Perrenod (2026) 全文**：机制章节 vs 统计局限章节对照读
2. **arXiv 2605.21316**：幂律 vs sigmoid 判别检验【分析】
3. **Bitcoin Clock 论文 (2607.26188)**：减半相位 null 检验
4. **与 ETH 对照**：幂律是否跨链复制
5. **2028 减半 falsify 实验**：提前写下 dex 与顶底可接受区间

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 创世日 2009-01-03 | 协议 | Bitcoin 白皮书/区块 | 【事实】 |
| β=5.69, R²=0.961 | 论文 | Santostasi & Perrenod 2026 | 【分析】 |
| 协整 p=0.025, ADF p=0.006 | 复现 | btcpowerlaw.nl Paper 6 | 【分析】 |
| $210K@2026-01 | 媒体 | Cointelegraph 2024-03 | 【待验证】 |
| 2026 现货 ~$95K | 市场 | CoinGecko 等 | 【待验证】 |
| β 5.98→5.68 漂移 | 博客 | bitcoinandmarkets.com | 【待验证】 |
| Stolte 批评 | 行业 | Amdax Medium 2022 | 【分析】 |
| Morris「占星」批评 | 媒体 | Cointelegraph 2024 | 【分析】 |
| σ 周期衰减 | 研究 | BTC Power Law Observatory | 【分析】 |
| 机制 β=3×1.84 | 论文 | Santostasi Medium PLT | 【分析】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；幂律模型、$10M@2045 等长线叙事**不保证**未来价格路径。学术与行业批评指出 PLT 存在起点敏感性、伪回归与预测失手记录——请勿依据公允价线进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
