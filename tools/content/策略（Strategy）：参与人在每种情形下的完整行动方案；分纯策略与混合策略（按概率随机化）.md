---
slug: 策略（Strategy）：参与人在每种情形下的完整行动方案；分纯策略与混合策略（按概率随机化）
title: 策略（Strategy）：参与人在每种情形下的完整行动方案；分纯策略与混合策略（按概率随机化）
subtitle: 策略不是「招数清单」，而是<strong>每种情形下的完整行动方案</strong>。纯策略确定性选一条路；混合策略按概率随机化——在猜硬币、点球、价格战里，随机化往往不是软弱，而是让对手无法剥削你的唯一稳定解。
brand_sub: Strategy × Pure & Mixed
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 策略, 纯策略, 混合策略, 纳什均衡]
theme_js_file: 策略（Strategy）：参与人在每种情形下的完整行动方案；分纯策略与混合策略（按概率随机化）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**策略（Strategy）** 是参与人在**每一种可能情形**下「我会怎么做」的完整说明书：纯策略把某一行动钉死为概率 1；混合策略给行动集上的概率分布，按分布随机抽签。

三层含义：

1. **完整性**：策略必须覆盖信息集上的每一个决策点——不是只写「开场出石头」，而是「若对方上轮出布则……」。【事实】
2. **纯 vs 混合**：纯策略是混合策略的退化特例（某行动概率 1，其余 0）。【事实】
3. **均衡语言**：有限策略型博弈**至少存在一个**纳什均衡（可能必须是混合的）——Nash (1950)。猜硬币没有纯策略均衡，却有唯一的 (½,½) 混合均衡。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

这里研究的不是「商业计划书写法」，而是博弈模型里的**选择对象**：参与人到底在选什么、随机化意味着什么、何时必须随机。

边界：

- **在界内**：策略型 / 展开型表述、纯策略与混合策略、支集（support）、行为策略、最优反应、混合纳什的无差异条件。
- **在界外**：具体行业战术细节、脑科学里的「随机数如何生成」——除非压缩成可写入模型的混合或纯化故事。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 策略如何形式化，以及纯/混合如何支撑预测与设计 |
| 2 | 边界在哪 | 到「行动×信息上的（随机）规则可写入」为止 |
| 3 | 核心对象 | 行动集、策略集、混合单纯形、支集、期望支付 |
| 4 | 参与者 | 需要选完整计划的人/组织/算法 |
| 5 | 关键变量 | 行动数、支付不对称、可观测历史、私有冲击、重复次数 |
| 6 | 可直接观察 | 实际行动频率、胜率、报价分布 |
| 7 | 无法直接观察 | 「心里是否真在掷骰子」、层级信念、私有类型 |
| 8 | 谁影响谁 | 他人混合 → 我的期望支付 → 我的最优反应 → 他人无差异条件 |
| 9 | 因果关系 | 改变支付矩阵 → 混合频率跳变；信息公开 → 策略空间变大 |
| 10 | 只是相关 | 「看起来在随机」也可能是私有信息下的纯策略（纯化）【分析】 |
| 11 | 表层现象 | 点球左右、价格战促销频率、竞价抖动 |
| 12 | 底层机制 | 无差异条件 + 支集外行动不被使用 |
| 13 | 有反馈吗 | 有。被读懂的「伪随机」会被剥削 → 频率被拉回 |
| 14 | 有延迟吗 | 有。学习混合、建立不可预测声誉都要时间 |
| 15 | 正/负反馈 | 「大家都盯同一招」是正反馈崩盘；套利式最优反应是负反馈 |

## 最关键的一句话

> 策略回答的是「**在模型允许的每一种情形下，你承诺怎么选**」；混合策略回答的是「**当你无法用纯策略稳住对手时，如何让对方对剥削你无利可图**」。

# 为什么值得研究

:::cards g3
### 没有策略，均衡无处安放
纳什、占优、子博弈精炼，比较的都是**策略剖面**，不是单次行动。把「出石头」当成策略，展开型博弈会立刻说不清。

### 它解释「为什么理性人要掷硬币」
猜硬币、剪刀石头布、点球：纯策略均衡不存在或极不稳定；混合让对手对你支集内行动**无差异**。【事实】

### 它直接接到市场、谈判、AI
做市抖动、A/B 流量分配、多智能体策略网络的随机策略（stochastic policy），都是混合策略的工程孪生。
:::

:::note amber 一个必须先吞下的区分
「混合」在数学上是概率分布；在解释上至少有三条路：（1）真随机；（2）人群中纯策略的比例；（3）Harsanyi 纯化——私有支付扰动下各自选纯策略，外人只看到频率。【分析】别把三条路当成互相否定，它们回答的是不同问题。
:::

# 世界地图

九层看「策略」如何从行动清单长成可计算对象。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="sArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 改写策略空间与信息本身</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 均衡精炼 · 颤抖手 / 恰当均衡 / 稳定集</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 解释层 · 真随机 / 人群比例 / Harsanyi 纯化</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 展开型 · 行为策略 vs 混合策略（Kuhn）</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 混合纳什 · 无差异条件 + 支集外不被用</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 最优反应对应 · BRᵢ(σ₋ᵢ) 可多值</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 混合单纯形 Δ(Sᵢ) · 概率分布</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 纯策略集 Sᵢ · 完整行动方案</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 行动与信息集 · 情形如何被切开</text>
</svg>
:::

:::note blue 读图要点
入门最常卡在 **L2→L3**：以为策略=行动。猜硬币里「出正面」是行动；策略是「以概率 p 出正面」或展开型里每个信息集的完整规定。
:::

# 核心概念地图

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="220" y="16" width="240" height="48" rx="10" fill="#15181d"/><text x="340" y="46" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" font-family="sans-serif">策略 Strategy</text>

  <rect x="30" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="120" y="132" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">纯策略 sᵢ ∈ Sᵢ</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="132" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">混合 σᵢ ∈ Δ(Sᵢ)</text>
  <rect x="470" y="100" width="180" height="52" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="560" y="132" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">支集 support(σᵢ)</text>

  <line x1="300" y1="64" x2="120" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="340" y1="64" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="380" y1="64" x2="560" y2="100" stroke="#d5342c" stroke-width="1.5" marker-end="url(#cB)"/>

  <rect x="80" y="200" width="520" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="340" y="232" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">无差异条件：支集内纯策略期望支付相等且 ≥ 支集外</text>
  <line x1="120" y1="152" x2="200" y2="200" stroke="#7c848f" stroke-width="1.2"/>
  <line x1="340" y1="152" x2="340" y2="200" stroke="#7c848f" stroke-width="1.2"/>
  <line x1="560" y1="152" x2="480" y2="200" stroke="#7c848f" stroke-width="1.2"/>

  <rect x="140" y="290" width="400" height="48" rx="8" fill="#f3f4f6"/><text x="340" y="320" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">混合纳什 = 每人的 σᵢ 都是对 σ₋ᵢ 的最优反应</text>
</svg>
:::

| 概念 | 在系统里的作用 | 常见误读 |
|---|---|---|
| 纯策略 | 确定性完整方案 | 「等于行动」——展开型中策略远多于行动 |
| 混合策略 | 纯策略上的概率分布 | 「随便乱选」——均衡混合有精确频率 |
| 支集 | 正概率行动集合 | 支集外行动可以「更差」但不能「更好」 |
| 无差异 | 混合均衡的充要枢纽 | 「无所谓所以乱选」——频率由**让对手无差异**决定 |
| 行为策略 | 每个信息集独立随机 | 与混合策略在完美回忆下等价（Kuhn）【事实】 |

# 核心参与者

:::cards g2
### 理论建模者
写 Sᵢ 与支付矩阵的人。漏写信息集上的 contingency，策略空间就假。

### 现场决策者
点球主罚、交易员、谈判代表。他们可能「感觉在随机」，也可能按私有状态选纯策略——外人看到的是频率。【分析】

### 对手与剥削者
任何能读你模式的人。你的「伪随机」（如总是 R→P→S 循环）会被最优反应吃掉。

### 算法策略
强化学习的 stochastic policy、做市随机抖动：工程上显式混合，理论上就是 Δ(A)。
:::

# 核心变量

| 变量 | 符号直觉 | 杠杆作用 |
|---|---|---|
| 纯策略数 | \|Sᵢ\| | 指数膨胀（展开型）；计算与学习成本↑ |
| 混合概率 | p, q, … | 均衡频率；错 0.1 就可能被系统性剥削 |
| 支付不对称 | a, b, L | 直接决定 p*（性别战 q*=1/(a+1)；懦夫 Dare*=1/L）【推论】 |
| 支集大小 | \|supp\| | 完全混合 vs 半混合；精炼常筛掉弱劣支集 |
| 可预测性 | 自相关 | 序列相关 → 偏离独立混合 → 被读懂 |
| 私有冲击 | εᵢ | 纯化：外人眼里的「混合」来自未见类型 |

:::note green 数字锚点（先算后写）
标准猜硬币（匹配得 +1）：均衡 q*=½，EU*=0。若对手出正面概率 q=0.60，则 EU(H)=+0.20、EU(T)=−0.20——**必须**改打纯正面，继续 50-50 只会把优势丢光。【推论】
性别战 OO=(2,1)、BB=(1,2)：混合纳什行方 Opera p*=⅔、列方 Opera q*=⅓，各方 EU*=⅔（小于协调成功时的 2 或 1）。【推论】
懦夫博弈碰撞损失 L：Dare 概率 =1/L；L=10 → Dare*=0.10，EU*=−0.10。【推论】
:::

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="ca1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#15181d"/></marker>
    <marker id="ca2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="90" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">支付矩阵</text>
  <rect x="190" y="30" width="140" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="260" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">无差异方程</text>
  <rect x="360" y="30" width="140" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="430" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">均衡混合 σ*</text>
  <rect x="530" y="30" width="130" height="44" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="595" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">频率被观察</text>
  <line x1="160" y1="52" x2="188" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#ca1)"/>
  <line x1="330" y1="52" x2="358" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#ca1)"/>
  <line x1="500" y1="52" x2="528" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#ca1)"/>

  <path d="M595,74 C595,160 90,160 90,74" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#ca2)"/>
  <text x="340" y="175" text-anchor="middle" font-size="12" fill="#d5342c" font-family="sans-serif">反馈：偏离频率 → 对手改最优反应 → 把你拉回（或崩到纯均衡）</text>

  <rect x="80" y="210" width="520" height="70" rx="10" fill="#f3f4f6"/>
  <text x="340" y="240" text-anchor="middle" font-size="13" font-weight="600" fill="#15181d" font-family="sans-serif">因果（实线）vs 误读</text>
  <text x="340" y="262" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">「我随机是因为无所谓」← 错；均衡里你随机是为了让**对手**无所谓【分析】</text>
</svg>
:::

关键因果链：

1. **支付 → 无差异 → 频率**：你选 p 是为了让对手对她的支集内行动无差异；不是「自我表达」。
2. **可预测 → 被剥削**：序列相关破坏独立混合假设。
3. **信息结构 → 策略空间**：完美回忆下行为策略够用；不完美回忆则混合与行为策略可能分叉。

# 隐藏关系

:::cards g2
### 混合 ↔ 信道加密
不可预测性 = 不给对手信息。同构于「别让窃听者从密文推断明文」。【分析】

### 混合 ↔ 投资组合分散
支集上的概率类似仓位权重；无差异条件类似「边际贡献被拉平」。但博弈里权重由**对手支付**决定，不是由你的方差厌恶单独决定。【推论】

### 纯化 ↔ 隐变量
Harsanyi (1973)：小的独立私有支付扰动下，几乎所有混合均衡可被纯策略贝叶斯均衡逼近。【事实】外人看见的「掷骰子」可能是未见类型。

### 人群解释 ↔ 演化稳定
随机抽对手时，混合可解读为人群中纯类型比例；与 ESS 叙事相连。【分析】
:::

:::note purple 跨域同构（本手册高光）
**让对手无差异** ≈ 定价里让边际客户在买/不买间无差异 ≈ 安全检查里让攻击者对「攻哪扇门」无差异。同一数学：最优混合把对手的最优反应对应「撑满」。
:::

# 系统运行机制

标准求解流水线（2×2）：

```
支付矩阵 → 找纯策略纳什（互为最优反应）
         → 若无（或不唯一想要混合）→ 设支集
         → 写无差异方程解 p*,q*
         → 检查支集外行动不更好
         → 解释：真随机 / 人群 / 纯化
```

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#15181d"/></marker>
  </defs>
  <rect x="20" y="40" width="110" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="75" y="70" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">写矩阵</text>
  <rect x="160" y="40" width="110" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="215" y="70" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">查纯均衡</text>
  <rect x="300" y="40" width="110" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="355" y="70" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">无差异</text>
  <rect x="440" y="40" width="110" height="50" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="495" y="70" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">得 σ*</text>
  <rect x="580" y="40" width="80" height="50" rx="8" fill="#15181d"/><text x="620" y="70" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#fff">验证</text>
  <line x1="130" y1="65" x2="158" y2="65" stroke="#15181d" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="270" y1="65" x2="298" y2="65" stroke="#15181d" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="410" y1="65" x2="438" y2="65" stroke="#15181d" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="550" y1="65" x2="578" y2="65" stroke="#15181d" stroke-width="1.5" marker-end="url(#flA)"/>
  <text x="340" y="140" text-anchor="middle" font-size="13" fill="#454c56" font-family="sans-serif">猜硬币：无纯均衡 → q*=½ → EU*=0 → 任何偏离可被对手剥削</text>
  <text x="340" y="170" text-anchor="middle" font-size="13" fill="#454c56" font-family="sans-serif">性别战：两纯均衡 + 一混合；混合 EU*=⅔ &lt; 协调成功时的支付</text>
  <text x="340" y="200" text-anchor="middle" font-size="12" fill="#7c848f" font-family="sans-serif">资金/注意力流：可预测模式 → 被收割；不可预测性是「防御性资源」</text>
</svg>
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="100" r="8" fill="#1d4ed8"/><text x="80" y="60" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">1944</text><text x="80" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">von Neumann</text><text x="80" y="156" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">混合最小最大</text>
  <circle cx="220" cy="100" r="8" fill="#1d4ed8"/><text x="220" y="60" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">1950</text><text x="220" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">Nash 存在性</text><text x="220" y="156" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">有限博弈</text>
  <circle cx="360" cy="100" r="8" fill="#b8730a"/><text x="360" y="60" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">1973</text><text x="360" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">Harsanyi</text><text x="360" y="156" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">纯化定理</text>
  <circle cx="500" cy="100" r="8" fill="#0f8a4d"/><text x="500" y="60" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">2002</text><text x="500" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">点球实证</text><text x="500" y="156" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">Chiappori 等</text>
  <circle cx="620" cy="100" r="8" fill="#d5342c"/><text x="620" y="60" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">今</text><text x="620" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">多智能体</text><text x="620" y="156" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">随机策略</text>
</svg>
:::

学习动态：虚构博弈（fictitious play）、强化学习都会把频率推向（或环绕）混合纳什；有限样本噪声使「看起来未均衡」很常见。【分析】

# 利益与激励

| 角色 | 想要什么 | 策略上的含义 |
|---|---|---|
| 你 | 提高自己 EU、降低被剥削 | 不可预测 + 对冲对手最优反应 |
| 对手 | 读你的模式 | 逼你暴露序列相关 |
| 协调博弈中的双方 | 落到「好」的纯均衡 | 混合往往是**差**的折中（性别战 EU*=⅔） |
| 机制设计者 | 诱导想要的行动分布 | 改支付或信息，而不是喊「请随机」 |

:::note red 激励扭曲
在性别战里，混合纳什的期望支付低于成功协调的纯均衡——若有廉价谈话或惯例，参与人有激励**逃离混合**。【分析】
:::

# 资源与信息流

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <defs>
    <marker id="resA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
    <marker id="resB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="70" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/><text x="120" y="60" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">你的行动流</text><text x="120" y="80" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">频率 / 序列</text>
  <rect x="260" y="30" width="160" height="70" rx="10" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="60" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">对手推断</text><text x="340" y="80" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">估计 p̂</text>
  <rect x="480" y="30" width="160" height="70" rx="10" fill="#fce8e8" stroke="#d5342c"/><text x="560" y="60" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">剥削 / 收割</text><text x="560" y="80" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">选 BR(p̂)</text>
  <line x1="200" y1="65" x2="258" y2="65" stroke="#d5342c" stroke-width="1.5" marker-end="url(#resA)"/>
  <line x1="420" y1="65" x2="478" y2="65" stroke="#d5342c" stroke-width="1.5" marker-end="url(#resA)"/>

  <rect x="160" y="150" width="360" height="60" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="340" y="175" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">防御资源：熵 / 不可预测性</text>
  <text x="340" y="195" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">独立混合把信息「抽干」；模式化则把优势泵给对手</text>
  <line x1="560" y1="100" x2="400" y2="150" stroke="#0f8a4d" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#resB)"/>
</svg>
:::

信息流方向：你的历史 → 对手信念 → 对手策略 → 你的支付。混合策略是在这条管道上装「噪声源」。

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按 重要性×杠杆率×可操作性÷学习成本 排序：

| # | 杠杆点 | 为何高杠杆 | 上手成本 |
|---|---|---|---|
| 1 | 先写清策略空间（含 contingency） | 空间错则一切解错 | 低 |
| 2 | 无差异方程（让对手无差异） | 直接给出 p* | 中 |
| 3 | 检查序列相关 | 现实里最常见的「假混合」 | 低 |
| 4 | 支付校准（a,b,L） | 频率对支付极度敏感 | 中 |
| 5 | 选择解释（真随机/人群/纯化） | 决定你要改行为还是改信息 | 中 |
| 6 | 惯例与廉价谈话（逃离坏混合） | 性别战类协调 | 低 |
| 7 | 支集外检验 | 防止假均衡 | 中 |
| 8 | 展开型用行为策略 | 降维、可学习 | 中 |
| 9 | 精炼（剔弱劣混合） | 多均衡筛选 | 高 |
| 10 | 机制改写策略集 | 从根上改游戏 | 高 |

# 常见认知陷阱

:::details 1. 把行动当成策略
展开型里策略是「每个信息集的规定」。只说「开局攻击」会漏掉后手 contingency。

:::

:::details 2. 「混合=随便」
均衡混合频率由无差异精确决定。猜硬币必须 ≈½；偏到 0.6 就被打。

:::

:::details 3. 「我无差异所以掷硬币」← 因果说反了
你无差异是均衡的**结果**；你选择的频率是为了让**对手**无差异。

:::

:::details 4. 忽略纯策略均衡的存在
性别战有两个纯均衡；只算混合会漏掉「惯例协调」这条路。

:::

:::details 5. 把实验室偏离当成「人不懂混合」
也可能是社会偏好、风险态度、或学习未收敛。【分析】

:::

:::details 6. 伪随机循环
R→P→S 循环熵看起来高，但对懂模式的对手可预测。要独立同分布或密码学级 RNG。

:::

:::details 7. 纯化与真随机互斥论
Harsanyi 纯化说明「可以不必真随机」；不证明「现实中从不随机」。点球等高激励对抗中，真混合证据更强。【事实】

:::

:::details 8. 零和直觉滥用于协调博弈
零和里混合常是「唯一稳定解」；协调博弈里混合常是「糟糕折中」。

:::

:::details 9. 忘记支集外条件
只解无差异、不检查「不用的行动是否其实更好」→ 假均衡。

:::

:::details 10. 把混合纳什的 EU 当成「你该满足的收益」
性别战混合 EU*=⅔，但若能协调到 OO，行方得 2。混合是冲突下的稳定点，不是理想点。
:::

<!-- nav:实践系统 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <rect x="30" y="30" width="180" height="200" rx="12" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="120" y="60" text-anchor="middle" font-size="14" font-weight="700" font-family="sans-serif" fill="#15181d">抽象</text>
  <text x="120" y="100" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">σ ∈ Δ(S)</text>
  <text x="120" y="125" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">无差异</text>
  <text x="120" y="150" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">Nash 存在</text>
  <text x="120" y="175" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">纯化</text>

  <rect x="250" y="30" width="180" height="200" rx="12" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="60" text-anchor="middle" font-size="14" font-weight="700" font-family="sans-serif" fill="#15181d">机制</text>
  <text x="340" y="100" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">期望支付线性</text>
  <text x="340" y="125" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">BR 对应</text>
  <text x="340" y="150" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">学习动态</text>
  <text x="340" y="175" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">信息反馈</text>

  <rect x="470" y="30" width="180" height="200" rx="12" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="560" y="60" text-anchor="middle" font-size="14" font-weight="700" font-family="sans-serif" fill="#15181d">操作</text>
  <text x="560" y="100" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">算 p*</text>
  <text x="560" y="125" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">查自相关</text>
  <text x="560" y="150" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">设 RNG</text>
  <text x="560" y="175" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">建惯例</text>
</svg>
:::

| 现实场景 | 抽象对象 | 操作抓手 |
|---|---|---|
| 足球点球 | 匹配型零和混合 | 左右频率≈均衡；避免踢法惯性【事实】Chiappori–Levitt–Groseclose (2002) 等实证与混合预测一致 |
| 价格促销 | 混合「促/不促」 | 用支付校准频率，防被对手盯死 |
| 安全巡检 | 混合巡查路线 | 让攻击者对入口无差异 |
| 产品 A/B | 流量混合 | 注意：这是实验设计，不是纳什混合——别混用解释 |

# 从理论到行动

1. **画 2×2**：先写清你的两个行动、对手两个行动、支付。
2. **找纯均衡**：互为最优反应的格子。
3. **需要混合时**：列无差异方程，解 p*；用本页工具验算。
4. **落地**：若真对抗，用独立随机源；若协调，优先惯例而非混合。
5. **复盘**：统计频率与自相关，对比 p*。

# 技能树

:::details 基础 · 识别与翻译
- 区分行动 / 纯策略 / 混合策略 / 行为策略
- 会画策略型矩阵与简单展开型
- 能指出猜硬币为何无纯均衡

:::

:::details 中级 · 计算
- 手算 2×2 混合纳什（无差异）
- 检查支集条件
- 计算偏离后的最优反应与后悔

:::

:::details 高级 · 解释与设计
- 纯化 / 人群 / 真随机三解释切换
- Kuhn 定理适用边界（完美回忆）
- 用惯例、信息、支付改写「坏混合」
:::

# 游戏化世界

把学习策略想象成一张地图：

| 区域 | 怪物 | 通关条件 |
|---|---|---|
| 纯策略平原 | 「只会一种开局」怪 | 写出含 contingency 的完整策略 |
| 无差异沼泽 | 「随便选」迷雾 | 解出正确 p* 并解释「为谁无差异」 |
| 伪随机丛林 | 循环模式蛇 | 用独立抽样通过自相关检验 |
| 协调双峰山 | 两纯一混合 | 选惯例登上高峰，不困在混合谷底 |
| 纯化迷雾 | 「到底掷没掷骰子」 | 能用私有类型故事重述同一频率 |

# 任务系统

| 任务 | 难度 | 产出 | 验收 |
|---|---|---|---|
| T1 默写猜硬币均衡 | ★ | 卡片 | q*=½, EU*=0 |
| T2 手算性别战混合 | ★★ | 草稿 | p*=⅔, q*=⅓, EU*=⅔ |
| T3 懦夫 L=10 | ★★ | 数字 | Dare*=0.10 |
| T4 用工具把对手 q 调到 0.6 | ★ | 截图 | 显示最优纯 H |
| T5 统计自己 30 次 RPS | ★★ | 表 | 频率+自相关 |
| T6 找一个「该协调不该混合」案例 | ★★★ | 短文 | 对比混合 EU vs 协调支付 |

# 反事实模拟

:::tabs
@@若对手固定出正面 60%
猜硬币中你应 100% 出正面，EU=+0.20；继续 50-50 则 EU=0，把免费优势扔掉。【推论】

@@若性别战能廉价谈话
双方可协调到某一纯均衡，EU 升至 2 或 1，严格优于混合的 ⅔。【推论】

@@若碰撞损失 L→∞
懦夫博弈中 Dare*→0，近似「几乎总是躲闪」——极端风险压扁冒险激励。【推论】

@@若只有纯化、禁止真随机
均衡频率仍可出现，但来自私有冲击阈值；设计者应关心类型分布，而不是 RNG。【分析】
:::

## 可调模型 1 · 猜硬币：你的混合 × 对手混合

匹配得 +1、不匹配 −1。看对手 q 如何决定你该不该坚持 50-50。

:::raw
<div class="tool" id="tool_mp">
  <div class="ctrl">
    <label>你出正面概率 p <output id="mp_pO">0.50</output></label>
    <input type="range" id="mp_p" min="0" max="1" step="0.01" value="0.50"/>
    <label>对手出正面概率 q <output id="mp_qO">0.50</output></label>
    <input type="range" id="mp_q" min="0" max="1" step="0.01" value="0.50"/>
  </div>
  <div class="readout">
    <div class="ro">EU(H)<strong id="mp_h">0.00</strong></div>
    <div class="ro">EU(T)<strong id="mp_t">0.00</strong></div>
    <div class="ro">你的期望<strong id="mp_eu">0.00</strong></div>
    <div id="mp_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="mp_vh">无差异：任意混合均为最优反应（均衡要求 q*=0.50）</span></div>
  </div>
  <canvas id="mpChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 性别战：支付不对称 → 混合纳什

OO=(a,1)，BB=(1,b)。默认 a=2,b=2 → p*=⅔, q*=⅓, 行方 EU*=⅔。

:::raw
<div class="tool" id="tool_bos">
  <div class="ctrl">
    <label>行方偏好强度 a（OO 支付） <output id="bos_aO">2.0</output></label>
    <input type="range" id="bos_a" min="1.1" max="5" step="0.1" value="2.0"/>
    <label>列方偏好强度 b（BB 支付） <output id="bos_bO">2.0</output></label>
    <input type="range" id="bos_b" min="1.1" max="5" step="0.1" value="2.0"/>
  </div>
  <div class="readout">
    <div class="ro">行方 Opera p*<strong id="bos_p">0.667</strong></div>
    <div class="ro">列方 Opera q*<strong id="bos_q">0.333</strong></div>
    <div class="ro">行方 EU*<strong id="bos_eu">0.667</strong></div>
    <div id="bos_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="bos_vh">混合纳什：行方 Opera p*=0.667，列方 Opera q*=0.333；行方 EU=0.667（纯协调 OO 可得 2.0）</span></div>
  </div>
  <canvas id="bosChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 懦夫博弈：碰撞损失 L

支付：双方躲闪 (0,0)；一方 Dare 得 +1 / 对方 −1；双 Dare 得 (−L,−L)。Dare*=1/L。

:::raw
<div class="tool" id="tool_ch">
  <div class="ctrl">
    <label>碰撞损失 L <output id="ch_LO">10.0</output></label>
    <input type="range" id="ch_L" min="2" max="20" step="0.1" value="10.0"/>
  </div>
  <div class="readout">
    <div class="ro">Swerve 概率<strong id="ch_sw">0.900</strong></div>
    <div class="ro">Dare 概率<strong id="ch_dr">0.100</strong></div>
    <div class="ro">期望支付<strong id="ch_eu">-0.100</strong></div>
    <div id="ch_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ch_vh">混合纳什：各方 Dare 概率 = 1/L = 0.100；期望支付 = −1/L = −0.100（L↑ → 更少冒险）</span></div>
  </div>
  <canvas id="chChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 剪刀石头布：混合对混合

零和 RPS。对手均匀 (⅓,⅓,⅓) 时你任意策略 EU=0；对手偏科时，支集外最优纯策略立刻出现。

:::raw
<div class="tool" id="tool_rps">
  <div class="ctrl">
    <label>你 · 石头 <output id="rps_rO">0.333</output></label>
    <input type="range" id="rps_r" min="0" max="1" step="0.001" value="0.333"/>
    <label>你 · 布 <output id="rps_pO">0.333</output></label>
    <input type="range" id="rps_p" min="0" max="1" step="0.001" value="0.333"/>
    <label>对手 · 石头 <output id="rps_orO">0.333</output></label>
    <input type="range" id="rps_or" min="0" max="1" step="0.001" value="0.333"/>
    <label>对手 · 布 <output id="rps_opO">0.333</output></label>
    <input type="range" id="rps_op" min="0" max="1" step="0.001" value="0.333"/>
  </div>
  <div class="readout">
    <div class="ro">你的剪刀<strong id="rps_sO">0.334</strong></div>
    <div class="ro">对手剪刀<strong id="rps_osO">0.334</strong></div>
    <div class="ro">你的 EU<strong id="rps_eu">0.000</strong></div>
    <div class="ro">最优纯策略<strong id="rps_br">任意（无差异）</strong></div>
    <div id="rps_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="rps_vh">对当前对手：EU(R/P/S)≈(0,0,0)；最优=任意（无差异） · 对手≈均匀混合 → 你任意策略 EU≈0（纳什）</span></div>
  </div>
  <canvas id="rpsChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 标志性产出 |
|---|---|---|
| L1 识别 | 区分行动/策略/混合；指出有无纯均衡 | 一页策略空间图 |
| L2 计算 | 独立解 2×2 混合纳什 | 与工具误差 &lt; 0.01 |
| L3 诊断 | 用频率与自相关检验「假混合」 | 复盘表 |
| L4 设计 | 用惯例/信息/支付逃离坏混合或稳定好混合 | 机制备选方案 |

# 30分钟最小实践

**今天就能做（成本≈0）：**

1. 用硬币做 20 次「猜硬币」对战（或单人模拟对手固定 50%）。
2. 记录自己出正面的次数与「连续同面」次数。
3. 对照：均衡应约 10/20；若连续同面过多，说明你有惯性。
4. 打开本页工具 1，把 q 调到 0.60，确认最优反应变为纯 H。
5. 写一句：**「我随机是为了让对手无差异，不是因为我无所谓。」**

验收：能口头推导 q*=½，并能解释 q=0.6 时为何必须改纯策略。

# 7天计划

| 天 | 主题 | 产出 |
|---|---|---|
| D1 | 纯 vs 混合定义 + 猜硬币 | 卡片 |
| D2 | 无差异方程手算 | 性别战草稿 |
| D3 | 懦夫博弈与 L | 对照工具 3 |
| D4 | RPS 30 次自检 | 频率表 |
| D5 | 读点球实证摘要 | 5 条笔记 |
| D6 | 纯化 vs 真随机 | 对比段 |
| D7 | 找生活中的协调 vs 对抗 | 案例页 |

# 30天计划

| 周 | 焦点 | 里程碑 |
|---|---|---|
| W1 | 计算肌肉 | 5 个 2×2 全手算+工具复核 |
| W2 | 实证直觉 | 点球/网球发球文献笔记 |
| W3 | 展开型 | 一棵树：纯策略枚举 vs 行为策略 |
| W4 | 设计 | 为一个协调问题设计「惯例」、为一个对抗问题设计「混合规程」 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 策略型博弈 | 同时选策略，支付由剖面决定 |
| 2 | 纯策略纳什 | 互为最优反应的行动剖面 |
| 3 | 混合策略纳什 | 概率剖面互为最优反应 |
| 4 | 无差异条件 | 支集内 EU 相等 |
| 5 | 最小最大（零和） | 混合保证安全水平 |
| 6 | 性别战 | 协调 + 冲突偏好 → 两纯一混合 |
| 7 | 懦夫博弈 |  Brinkmanship；Dare*=1/L |
| 8 | Harsanyi 纯化 | 混合≈未见私有冲击下的纯选择极限 |
| 9 | Kuhn 行为策略 | 完美回忆下等价于混合 |
| 10 | 学习动态 | 频率调整趋向/环绕均衡 |

# 关键问题清单

:::details Q1 策略和行动差在哪？
行动是某一信息集上的选择；策略是**所有**信息集上的完整规定（或混合）。

:::

:::details Q2 为什么要混合？
没有纯策略均衡，或纯均衡不稳定/可被剥削；混合让对手无法通过偏离获益。

:::

:::details Q3 混合时我真的对行动无差异吗？
在均衡上是的——这是数学性质。你仍必须按正确频率混合，否则对手会偏离剥削你。

:::

:::details Q4 频率由谁决定？
主要由**对手的支付**通过无差异方程决定，不是由你的「性格」。

:::

:::details Q5 性别战该不该玩混合？
若能协调，不应满足于混合；混合是无法协调时的稳定点，EU 更差。

:::

:::details Q6 纯化是不是否定了随机？
否。它提供另一种微观基础；高激励对抗中仍有真混合证据。

:::

:::details Q7 如何检验自己在混合？
频率接近 p*，且选择近似序列无关（无惯性、无严格交替）。

:::

:::details Q8 多人博弈混合怎么算？
原理相同但方程维数上升；常用算法（支撑枚举、Lemke–Howson 等）。【分析】

:::

:::details Q9 算法里的 softmax 策略算混合吗？
是随机策略；是否为纳什混合要另验最优反应条件。

:::

:::details Q10 下一步学什么？
纳什均衡精炼、展开型与 SPNE、贝叶斯纳什——队列后续主题正覆盖。
:::

# 下一阶段探索

- **收益/支付（Payoff）**：策略比较的尺子——矩阵里的数字从哪来。
- **纳什均衡**：策略剖面何时互为最优反应。
- **占优策略**：不依赖对手时仍成立的策略。
- **信息集与共同知识**：策略空间如何被信息切开。

本手册把「选什么」的对象钉死了；下一本把「值多少」钉死。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 纯/混合策略定义、支集、混合纳什 | 教材/讲义 | MIT 17.810 讲义；IISc 博弈论讲义；标准教材定义 | 【事实】 |
| 有限博弈混合纳什存在性 | 经典论文 | Nash (1950) | 【事实】 |
| 无差异充要条件 | 教材 | 混合扩展标准定理 | 【事实】 |
| Harsanyi 纯化 | 论文 | Harsanyi (1973)；百科与综述转述 | 【事实】 |
| 纯化条件与局限 | 综述 | Reny–Robson 等讨论；弱劣策略纯化困难 | 【分析】 |
| 点球混合实证 | 期刊 | Chiappori, Levitt, Groseclose, AER 2002（法意联赛点球样本） | 【事实】 |
| 猜硬币/性别战/懦夫数值 | 自算 | 无差异方程；node 验算 | 【推论】 |
| 跨域同构（加密/组合/巡检） | 类比 | 作者归纳 | 【分析】 |
| 行为实验对混合的偏离 | 文献印象 | 学习/噪声/社会偏好等多解释 | 【待验证】 |

标记约定：【事实】多方一致或经典定理；【分析】权威判断或稳健推论框架；【推论】由模型推导的数字；【假设】未验证；【待验证】单一来源或转述链长。

# 免责声明 {.appendix}

本手册是博弈论概念的认知与实践框架，用于理解策略形式化、混合均衡与相关解释，**不是**投资建议、赌博必胜法或任何对抗性场景的操作保证。文中数值来自标准教学例子与公开学术文献，现实支付矩阵、对手类型与制度约束会导致结论变化。体育与市场案例仅作机制说明；请勿将均衡频率误当成「保证收益」。决策后果由读者自行承担。
