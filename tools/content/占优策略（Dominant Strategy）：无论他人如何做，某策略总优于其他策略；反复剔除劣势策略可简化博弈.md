---
slug: 占优策略（Dominant Strategy）：无论他人如何做，某策略总优于其他策略；反复剔除劣势策略可简化博弈
title: 占优策略（Dominant Strategy）：无论他人如何做总更优；反复剔除可简化博弈
subtitle: 占优回答的不是「给定对方我会怎样」，而是<strong>无论对方怎样，我都不必改口</strong>。没有占优时，反复剔除严格劣势策略（IESDS）把博弈削到理性可辩护的核——它是纳什之前、也常常比纳什更硬的筛子。
brand_sub: Dominant Strategy × IESDS × Mechanism Design
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 占优策略, IESDS, 严格劣势, 理性化, DSIC, 机制设计]
theme_js_file: 占优策略（Dominant Strategy）：无论他人如何做，某策略总优于其他策略；反复剔除劣势策略可简化博弈.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**占优策略（Dominant Strategy）**：对参与人 \(i\)，策略 \(s_i^*\) 是（严格）占优的，当且仅当对任意其他策略 \(s_i\)、任意他人策略组合 \(s_{-i}\)，都有 \(u_i(s_i^*,s_{-i}) > u_i(s_i,s_{-i})\)——**无论他人怎么做，选它都严格更好**。【事实】

弱占优把 \(>\) 换成 \(\ge\)，并要求至少在某一 \(s_{-i}\) 上严格更好。【事实】

**反复剔除严格劣势策略（IESDS）**：一轮轮删掉「被某策略（可混合）严格占优」的纯策略；有限博弈有限步终止。若只剩一个策略组合，它必是唯一纳什均衡。【事实】

关键对照：占优策略均衡 ⊆ 纳什均衡；猜硬币无占优、无纯 NE，但仍有混合 NE。囚徒困境双方「坦白」既是严格占优，也是唯一 NE。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「最聪明的反应」，而是：**不依赖对他人信念的最优**——以及当没有这种「无条件最优」时，共同知识下的理性如何通过剔除把策略空间收窄。

边界：

- **在界内**：严格/弱占优、劣势策略、IESDS / IEWDS、理性化（rationalizability）、占优策略均衡、机制设计中的 DSIC（占优策略激励相容）。
- **在界外**：具体某次谈判话术、单只证券买卖点——除非压成「支付矩阵里是否存在占优 / 能否 IESDS 求解」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 不依赖信念的策略排序，以及迭代剔除的预测力 |
| 2 | 边界在哪 | 到「策略型 + 支付比较」可形式化为止 |
| 3 | 核心对象 | 占优/劣势关系、剔除序列、幸存策略集、DSIC 机制 |
| 4 | 参与者 | 理性（及共同知识理性）的决策主体 |
| 5 | 关键变量 | 支付差、策略个数、严格 vs 弱、混合占优、信息 |
| 6 | 可直接观察 | 公开规则、出价、是否选「无条件更优」选项 |
| 7 | 无法直接观察 | 对他人理性深度的信念、level-k 层次 |
| 8 | 谁影响谁 | 支付结构 → 占优关系 → 剔除 → 幸存集 → 可预测结果 |
| 9 | 因果关系 | 严格劣势 ⇒ 理性永不选 ⇒ 可安全删除 |
| 10 | 只是相关 | 「大家常选某选项」≠ 占优；习惯可相关但非占优【分析】 |
| 11 | 表层现象 | 囚徒坦白、二价拍卖报真值、投票中的策略投票 |
| 12 | 底层机制 | 逐点支付比较；共同知识理性 ↔ IESDS（二人有限） |
| 13 | 有反馈吗 | 有。剔除改变对手可行集 → 新的占优关系显现 |
| 14 | 有延迟吗 | 有。认知深度有限时，只完成有限轮剔除 |
| 15 | 正/负反馈 | 坏占优可锁死低效（PD）；机制改支付可创造合意占优 |

## 最关键的一句话

> 占优说的是「不用猜对方」；IESDS 说的是「猜到对方也理性、也知道你理性……之后，还剩什么」。

# 为什么值得研究

:::cards g3
### 它是最强的预测器
有严格占优时，只需理性假设即可预测——不必假设信念一致或均衡。【事实】

### 它是解博弈的手术刀
IESDS 常先于划线法：删掉不可能的策略，矩阵变小，NE 更好找。【分析】

### 它是机制设计的金标准
DSIC（占优策略激励相容）让真话/目标行为不依赖对他人的猜测——Vickrey / VCG 走这条路。【事实】
:::

:::note amber 最贵的一次误判
把「弱占优」当成「严格占优」乱剔：弱剔除顺序可影响结果，甚至删掉某些纳什均衡。【事实】
:::

# 世界地图

九层看占优如何从「两格比较」长成「机制金标准」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="dsArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · DSIC / VCG：让真话成为占优</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 认知层级 · level-k / 有限深度剔除</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 理性化 · 幸存策略 = 共同知识理性的含义</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 混合占优 · 纯策略可被混合严格占优</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 弱占优陷阱 · IEWDS 顺序依赖 / 可能删 NE</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 IESDS · 反复剔除严格劣势（有限步、保 NE）</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 占优策略均衡 · 每人占优 ⇒ 必为 NE</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 严格 vs 弱 · 逐对手策略比较支付</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 策略型博弈 · 参与人 · 策略 · 支付矩阵</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L3→L4**：先会比两行，再认占优均衡，再跑 IESDS；进阶卡在 **L5**（弱剔除危险）与 **L9**（把占优写进规则）。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="180" y="16" width="320" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">支付矩阵 uᵢ(sᵢ, s₋ᵢ)</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">逐列比较行支付</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">严格/弱占优关系</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">IESDS 幸存集</text>

  <line x1="300" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="380" y1="60" x2="550" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="200" width="280" height="56" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="180" y="234" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">弱剔除：顺序敏感 · 可删 NE</text>
  <rect x="360" y="200" width="280" height="56" rx="8" fill="#15181d"/><text x="500" y="234" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">严格剔除：保全部 NE</text>

  <line x1="340" y1="152" x2="180" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#cmB)"/>
  <line x1="550" y1="152" x2="500" y2="200" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <text x="340" y="300" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">抽象：∀s₋ᵢ 的支付序　·　机制：迭代删除　·　操作：比矩阵、跑 IESDS、验 DSIC</text>
  <text x="340" y="330" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">红色虚线：弱占优「看起来无害」却能改写均衡集合</text>
</svg>
:::

# 核心参与者

:::cards g3
### 理论奠基者
von Neumann 零和中的占优直觉；非合作框架下严格/弱占优与 IESDS；Pearce / Bernheim 理性化；Aumann 共同知识。【事实】

### 机制设计者
Vickrey（二价拍卖）、Clarke–Groves（VCG）：把「报真值」做成弱/严格占优策略。【事实】

### 你自己
只要选项里存在「无论对方怎样都更好」的行动，占优就替你省掉猜心；否则用 IESDS 缩小战场。【推论】
:::

# 核心变量

| 变量 | 含义 | 为什么重要 |
|---|---|---|
| 支付差 \(\Delta\) | 两策略在同一 \(s_{-i}\) 下的效用差 | \(\Delta>0\) 处处 ⇒ 严格占优 |
| 严格 / 弱 | \(>\) 处处 vs \(\ge\)+某处 \(>\) | 决定剔除是否安全 |
| 策略数 \(\|S_i\|\) | 每人纯策略个数 | 越大越可能需要混合占优 / 多轮剔除 |
| 剔除轮次 \(k\) | IESDS 已完成的轮数 | 对应「\(k\) 阶共同知识理性」 |
| 幸存集 | 未被删掉的策略 | 理性化策略；含全部 NE 支撑 |
| 混合权重 | 占优方可为混合策略 | 有的纯策略只被混合严格占优 |
| 机制支付规则 \(p\) | 报价 → 谁赢、付多少 | 决定报真值是否 DSIC |

<!-- nav:机制与激励 -->
# 因果关系

因果主链：

:::raw
<div class="flow"><span>支付结构</span><i>→</i><span>占优/劣势关系</span><i>→</i><span class="hi">IESDS</span><i>→</i><span class="hi">幸存集</span><i>→</i><span>可预测结果</span></div>
:::

**实线因果**：支付比较 → 劣势策略 → 理性删除 →（共同知识下）迭代删除 → 幸存策略。【事实】

**红色虚线反馈**：观察到的「对方仍玩劣势策略」更新你对对方理性深度的信念 → 你可能停止在有限轮剔除（level-k）。【分析】

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="40" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="85" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">支付矩阵</text>
  <rect x="180" y="40" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="235" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">占优关系</text>
  <rect x="330" y="40" width="110" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="385" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">IESDS</text>
  <rect x="480" y="40" width="160" height="44" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="560" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">幸存 / 均衡</text>
  <line x1="140" y1="62" x2="180" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <line x1="290" y1="62" x2="330" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <line x1="440" y1="62" x2="480" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <path d="M560 84 L560 150 L85 150 L85 84" fill="none" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="5,4" marker-end="url(#cfB)"/>
  <text x="340" y="175" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：对方「不理性深度」→ 你停止在第 k 轮剔除</text>
  <text x="340" y="200" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">实线=规范剔除链；红虚线=有限认知动力学</text>
</svg>
:::

# 隐藏关系

:::cards g2
### 占优 ⇒ NE，NE ⇏ 占优
占优策略均衡一定是纳什；纳什只需「给定对方最优」，不必「对所有对方最优」。【事实】

### 严格剔除不删 NE
任何纳什均衡（含混合）的支撑里，都不会出现被严格占优的纯策略。【事实】

### 弱剔除可以删 NE
IEWDS 的结果依赖删除顺序；至少保留一个 NE，但不保证保留全部。【事实】

### 二人有限：IESDS ↔ 理性化
在二人有限博弈中，幸存纯策略与理性化策略一致（允许信念相关时需细读教材条件）。【分析】
:::

# 系统运行机制

1. **比较**：对每一对己方策略，扫遍他人所有纯策略（必要时再考虑混合占优）；
2. **标记**：严格劣势者标记删除；
3. **收缩**：在缩小后的博弈上重复；
4. **终止**：无人可删 ⇒ 幸存集；若单点 ⇒ 唯一 NE。

有限博弈中，严格剔除的最终幸存集**与删除顺序无关**（可每轮删全部，也可一次删一个）。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="70" cy="100" r="10" fill="#0f8a4d"/><text x="70" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1944</text><text x="70" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">vN-M 零和</text>
  <circle cx="180" cy="100" r="10" fill="#1d4ed8"/><text x="180" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1950s</text><text x="180" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">占优/NE 分流</text>
  <circle cx="300" cy="100" r="10" fill="#3b6ef5"/><text x="300" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1961</text><text x="300" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Vickrey 二价</text>
  <circle cx="430" cy="100" r="10" fill="#b8730a"/><text x="430" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1980s</text><text x="430" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">理性化理论</text>
  <circle cx="560" cy="100" r="10" fill="#d5342c"/><text x="560" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">2000s–</text><text x="560" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">DSIC/算法机制</text>
  <line x1="80" y1="100" x2="170" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="190" y1="100" x2="290" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="310" y1="100" x2="420" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="440" y1="100" x2="550" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
</svg>
:::

实验视角：受试者常只完成有限轮剔除（p-beauty contest 的典型 level-1/2），完整 IESDS 是共同知识理性的极限，不是实验室默认。【分析】

# 利益与激励

| 角色 | 想要什么 | 与占优的关系 |
|---|---|---|
| 参与人 | 少猜心、保底最优 | 有占优则直接选；无则看幸存集 |
| 机制设计者 | 诱导真话/目标行为 | 追求 DSIC：目标策略成占优 |
| 监管者 | 减少策略性操纵 | 改规则使操纵不再占优 |
| 分析者 | 可证伪的预测 | 先找占优，再 IESDS，最后才 NE |

激励核心：**严格劣势策略的租金为负**——理性参与人不会为「可能用上」而保留它。【推论】

# 资源与信息流

「抽水」隐喻：当坏选项成为占优，社会剩余如何被抽走。

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">合作剩余</text><text x="110" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">（各得 R=3）</text>
  <rect x="270" y="30" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">占优背叛</text><text x="340" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">（T=5&gt;R）</text>
  <rect x="500" y="30" width="140" height="60" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="570" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">锁定 (P,P)</text><text x="570" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">（各得 1）</text>
  <line x1="180" y1="60" x2="270" y2="60" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#flA)"/>
  <line x1="410" y1="60" x2="500" y2="60" stroke="#d5342c" stroke-width="1.8" marker-end="url(#flB)"/>
  <rect x="150" y="140" width="380" height="70" rx="10" fill="#15181d"/><text x="340" y="170" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">信息流：共同知识理性加深 → 多一轮剔除</text>
  <text x="340" y="195" text-anchor="middle" fill="#a8b0ba" font-size="11" font-family="sans-serif">资源流：占优差 Δ = 偏离「合作」的单方租金</text>
</svg>
:::

经典囚徒困境：\(T=5>R=3>P=1>S=0\)，「坦白」严格占优「抵赖」；社会从各 3 抽到各 1，单边差距 **2**。【事实】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 |
|---|---|---|
| 1 | **改支付使合意行动占优** | 直接创造 DSIC / 消掉坏占优 |
| 2 | **只做严格剔除** | 保 NE、顺序无关 |
| 3 | **先 IESDS 再求 NE** | 降维，少解方程 |
| 4 | **识别混合占优** | 纯比纯漏删时的补刀 |
| 5 | **限制策略空间** | 删掉可被利用的劣势选项 |
| 6 | **公开规则与支付** | 让占优关系成为共同知识 |
| 7 | **二价/VCG 类支付** | 报真值成弱占优 |
| 8 | **提高对方理性深度** | 教育/重复使剔除轮次加深 |
| 9 | **避免弱剔除赌顺序** | 防误删均衡 |
| 10 | **用实验校准 level-k** | 预测真实人停在第几轮 |

# 常见认知陷阱

:::details 陷阱 1 · 把「最优反应」说成「占优」
最优反应依赖对方策略；占优要求对**所有**对方策略都最优。猜硬币两边都有最优反应，但无人占优。
:::

:::details 陷阱 2 · 弱占优当严格占优删
弱剔除顺序可变结果，且可能删掉某些 NE。默认只用严格。【事实】
:::

:::details 陷阱 3 · 以为无占优 = 无法分析
无占优仍可 IESDS；再不行才上划线 / 混合 NE。
:::

:::details 陷阱 4 · 只比「平均」不比「逐列」
占优是逐个 \(s_{-i}\) 比较，不是对信念取期望后再比（那是最优反应）。
:::

:::details 陷阱 5 · 忽略混合策略占优
有的纯策略不被任何纯策略占优，却被某个混合严格占优——不删会错。
:::

:::details 陷阱 6 · 把 IESDS 幸存集当成「唯一预测」
幸存集可很大；它排除不可能，不自动给出单点预测。
:::

:::details 陷阱 7 · 假设实验室里人人完成无限剔除
p-beauty contest 显示多数人停在有限层。【分析】
:::

:::details 陷阱 8 · 一口价拍卖里「报真值总是占优」
一价密封拍卖中报真值一般**不是**占优；二价才是（弱）占优。【事实】
:::

:::details 陷阱 9 · 占优均衡一定帕累托最优
囚徒困境反例：占优均衡严格劣于合作。【事实】
:::

:::details 陷阱 10 · 连续策略空间直接套「有限 IESDS」
有限性保证有限步终止；连续统要额外结构（如单调性）。【事实】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象 | 现实机制 | 可操作动作 |
|---|---|---|
| 严格占优 | 「反正都更好」的选项 | 合同条款里找无条件更优条款 |
| IESDS | 删掉不可能的还价/出价 | 谈判前划掉不可理喻选项 |
| 弱占优 | 二价拍卖报真值 | 知道「不必猜第二高价」 |
| DSIC | 机制让真话占优 | 设计规则而非劝说诚实 |
| level-k | 对手只剔 k 轮 | 按对手深度而非无限理性行动 |

# 从理论到行动

:::cards g3
### 诊断
画出矩阵：对每一行，问「是否存在另一行在每一列都严格更高？」【推论】

### 收缩
跑 IESDS（只用严格）；写下每轮删除理由。【推论】

### 设计
若结果坏：改哪一格支付能让好行动变成占优？成本最低的一格是杠杆。【分析】
:::

# 技能树

:::details ① 基础：严格占优一眼识
2×2 矩阵上标出是否存在占优策略；写出 ∀ 列的不等式。
:::

:::details ② 中级：IESDS 手算
3×3 上按轮删除；验证最终点是 NE；说明为何弱剔除要谨慎。
:::

:::details ③ 高级：混合占优与理性化
检查「纯不占优但混合占优」；把幸存集与理性化、NE 支撑对照。
:::

:::details ④ 专家：DSIC 机制草图
给定分配目标，设计支付使目标报告成弱占优（二价/VCG 直觉）。
:::

# 游戏化世界

你是「劣势猎手」：每张支付矩阵是一张地图，严格劣势是必须清除的迷雾。得分不看「猜中对方」，看「用最少轮次剔到不可再小的核」，以及「是否误用弱剔除」。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| T1 找占优 | 在 PD 中证明坦白严格占优 |
| T2 跑 IESDS | 对本手册 3×3 示例写出三轮删除 |
| T3 对照 NE | 说明猜硬币为何无占优仍有混合 NE |
| T4 弱剔除警告 | 举一个顺序影响结果的 2×2 |
| T5 DSIC 直觉 | 用二价拍卖数字说明报真值不吃亏 |

# 反事实模拟

若把 PD 的 \(T\) 降到 \(2.5<R=3\)，则坦白不再占优，合作可成纯 NE。【推论】

若只允许有限 1 轮剔除，本手册 3×3 在删掉 R 后仍留 U/M/D×L/M——预测集显著大于完整 IESDS。【事实】

若把二价改成一价，报真值失去占优地位，最优报价依赖对他人估值的信念。【事实】

## 可调模型 1 · 囚徒困境：何时「坦白」严格占优

经典条件：\(T>R>P>S\)。默认 \(R=3,T=5,P=1,S=0\)：对合作者 \(5>3\)，对背叛者 \(1>0\)，双边严格占优；均衡各得 **1**，相对合作差距 **2**。

:::raw
<div class="tool" id="tool_pd">
  <div class="ctrl">
    <label>合作奖励 R <output id="pd_rO">3.0</output></label>
    <input type="range" id="pd_r" min="1" max="6" step="0.1" value="3.0"/>
    <label>背叛诱惑 T <output id="pd_tO">5.0</output></label>
    <input type="range" id="pd_t" min="1" max="8" step="0.1" value="5.0"/>
    <label>惩罚 P <output id="pd_pO">1.0</output></label>
    <input type="range" id="pd_p" min="0" max="4" step="0.1" value="1.0"/>
    <label>傻瓜支付 S <output id="pd_sO">0.0</output></label>
    <input type="range" id="pd_s" min="-2" max="3" step="0.1" value="0.0"/>
  </div>
  <div class="readout">
    <div class="ro">D≻C？<strong id="pd_dom">是（严格）</strong></div>
    <div class="ro">占优均衡<strong id="pd_eq">(D,D)</strong></div>
    <div class="ro">R−P<strong id="pd_gap">2.0</strong></div>
    <div id="pd_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="pd_vh">T&gt;R 且 P&gt;S → 坦白严格占优；唯一占优均衡=(D,D)，相对合作差距 2.0</span></div>
  </div>
  <canvas id="pdChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · IESDS 三轮收缩（固定教学矩阵）

矩阵（行 U/M/D，列 L/M/R；格内为行,列支付）：

|  | L | M | R |
|---|---|---|---|
| U | 1,0 | 1,2 | 0,1 |
| M | 0,3 | 0,1 | 2,0 |
| D | 0,1 | 0,0 | 1,−1 |

严格 IESDS：第 1 轮删 **R**（被列 M 严格占优）→ 第 2 轮删 **M、D**（被行 U 严格占优）→ 第 3 轮删 **L**（被列 M 严格占优）→ 幸存 **(U,M)**，支付 **(1,2)**。滑块选择「看到第几轮」。

:::raw
<div class="tool" id="tool_ie">
  <div class="ctrl">
    <label>剔除进行到第几轮 <output id="ie_kO">0</output></label>
    <input type="range" id="ie_k" min="0" max="3" step="1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">幸存行<strong id="ie_rows">U, M, D</strong></div>
    <div class="ro">幸存列<strong id="ie_cols">L, M, R</strong></div>
    <div class="ro">本轮删除<strong id="ie_drop">（尚未开始）</strong></div>
    <div id="ie_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ie_vh">完整矩阵 3×3。拖动滑块观察严格 IESDS 如何逐轮收缩到 (U,M)。</span></div>
  </div>
  <canvas id="ieChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 弱占优：删除顺序可以改写结局

教学矩阵（行支付；列玩家对称兴趣较弱，只看行玩家）：

|  | L | R |
|---|---|---|
| T | 1, 1 | 0, 0 |
| B | 0, 0 | 0, 0 |

对行玩家：T **弱**占优 B（对 L 严格更好，对 R 一样）。若先删 B，再看列：L 弱占优 R → 常得到 (T,L)。若先从列侧以不同弱理由开删，幸存集可以不同——**这就是弱剔除危险的最小模型**。滑块切换「先删谁」。

:::raw
<div class="tool" id="tool_wk">
  <div class="ctrl">
    <label>删除顺序模式 <output id="wk_modeO">先删行B</output></label>
    <input type="range" id="wk_mode" min="0" max="1" step="1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">步骤<strong id="wk_steps">B弱劣 → 删B；后 L弱≻R → 删R</strong></div>
    <div class="ro">幸存<strong id="wk_surv">(T, L)</strong></div>
    <div class="ro">警示<strong id="wk_warn">弱剔除</strong></div>
    <div id="wk_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="wk_vh">模式0：先删行B再删列R → (T,L)。模式1：先强调列侧弱关系，叙事顺序改变——实践中应避免依赖弱剔除。</span></div>
  </div>
  <canvas id="wkChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 二价拍卖：报真值为何（弱）占优

你的估值 \(v\)，报价 \(b\)，他人最高价 \(m\)。二价规则：若 \(b>m\) 则赢得物品并支付 \(m\)，效用 \(v-m\)；否则效用 0。默认 \(v=100,m=60,b=100\) → 效用 **40**；压价到 50 会输掉本可到手的 40；抬价到 120 且 \(m=110\) 时效用 **−10**。

:::raw
<div class="tool" id="tool_vc">
  <div class="ctrl">
    <label>你的估值 v <output id="vc_vO">100</output></label>
    <input type="range" id="vc_v" min="20" max="200" step="1" value="100"/>
    <label>你的报价 b <output id="vc_bO">100</output></label>
    <input type="range" id="vc_b" min="0" max="200" step="1" value="100"/>
    <label>他人最高价 m <output id="vc_mO">60</output></label>
    <input type="range" id="vc_m" min="0" max="200" step="1" value="60"/>
  </div>
  <div class="readout">
    <div class="ro">是否成交<strong id="vc_win">是</strong></div>
    <div class="ro">你的效用<strong id="vc_u">40</strong></div>
    <div class="ro">报真值效用<strong id="vc_truth">40</strong></div>
    <div id="vc_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="vc_vh">b=v=100，m=60 → 成交，付 60，效用 40；偏离报价无法在所有 m 下改进</span></div>
  </div>
  <canvas id="vcChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 | 识别严格占优 | PD 书面证明 |
| L2 | 手算 IESDS | 3×3 三轮删除正确 |
| L3 | 分清弱/严 + 混合占优 | 指出一处弱剔除风险 |
| L4 | DSIC 直觉 | 说明二价为何报真值 |

# 30分钟最小实践

1. 在纸上画本手册 PD 默认矩阵，用两行不等式证明坦白严格占优（5 分钟）。  
2. 对 IESDS 3×3 矩阵，不看答案写出第 1 轮删除（10 分钟）。  
3. 打开 HTML 滑块核对第 2–3 轮，记录与手算差异（10 分钟）。  
4. 用二价模型故意设 \(b=50,v=100,m=60\)，写下一句「我损失了多少潜在效用」（5 分钟）。  

产出：一张手算稿 + 一句「严格 vs 弱」警示——成本接近 0，可验证。

# 7天计划

| 天 | 焦点 | 交付 |
|---|---|---|
| D1 | 严格占优定义 | 2 个自造 2×2 |
| D2 | PD 变体 | 调 T 使占优消失 |
| D3 | IESDS | 完整三轮 |
| D4 | 弱剔除 | 写风险备忘 |
| D5 | 与 NE 对照 | 猜硬币短文 |
| D6 | 二价拍卖 | 5 组 (v,b,m) 表 |
| D7 | 复盘 | 技能树自测 |

# 30天计划

每周一个主题：周1 定义与 PD；周2 IESDS 与理性化；周3 弱剔除与实验 level-k；周4 机制 DSIC 小品（二价/简单 VCG 故事）。月末：独立完成一份「某制度是否 DSIC」一页评估。

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **严格占优**：\(\forall s_{-i}: u_i(s_i^*,s_{-i})>u_i(s_i,s_{-i})\)  
2. **弱占优**：\(\ge\) 处处且 \(>\) 某处  
3. **占优策略均衡**：每人都选占优策略  
4. **IESDS**：迭代删严格劣势  
5. **IEWDS**：迭代删弱劣势（慎用）  
6. **理性化**：共同知识理性下的幸存策略  
7. **混合占优**：混合可严格占优纯策略  
8. **DSIC**：目标策略在机制中为占优  
9. **Vickrey 二价**：报真值弱占优  
10. **level-k**：有限深度剔除的行为模型  

# 关键问题清单

:::details Q1 占优和最优反应差在哪？
占优 = 对所有对方策略最优；最优反应 = 对某一信念/某一对方策略最优。
:::

:::details Q2 为什么严格剔除不删 NE？
若均衡里正概率使用某纯策略，它必须是对均衡信念的最优反应，故不可能被严格占优。【事实】
:::

:::details Q3 弱剔除为何危险？
顺序可变；可删掉某些 NE；只保证至少一个 NE 幸存。【事实】
:::

:::details Q4 IESDS 唯一幸存是否一定是 NE？
是；且是唯一 NE。【事实】
:::

:::details Q5 没有占优策略怎么办？
跑 IESDS；再划线找纯 NE；再解混合。
:::

:::details Q6 二人与多人 IESDS 一样吗？
程序一样；与理性化的精确等价关系在多人时更细（相关信念等）。【分析】
:::

:::details Q7 二价拍卖报真值是严格还是弱占优？
一般为**弱**占优：某些 \(m\) 下偏离无差别。【事实】
:::

:::details Q8 一价拍卖能 DSIC 吗？
标准一价下报真值不是占优；真相揭示需不同支付规则。【事实】
:::

:::details Q9 实验里人为何「不占优」？
利他、错误、有限深度、支付太小——用行为模型补，不否定占优作为规范基准。【分析】
:::

:::details Q10 如何把坏占优改掉？
改支付（罚/奖）、禁策略、或改成重复博弈改变阶段占优结构。
:::

# 下一阶段探索

- 与《纳什均衡》对照：占优是更强解概念，NE 是更广解概念。  
- 深入理性化、相关均衡、可证实现（implementation）。  
- 算法机制设计：近似 DSIC、简单 vs 最优拍卖。  
- 实验：p-beauty contest 与 level-k 估计。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 严格/弱占优与 IESDS 定义 | 教材/综述 | Osborne《Introduction to Game Theory》；Wikipedia Strategic dominance；MIT 14.12 讲义 | 【事实】 |
| 严格剔除保 NE、弱剔除顺序敏感 | 教材定理 | 标准博弈论教材命题（Osborne–Rubinstein 等） | 【事实】 |
| 囚徒困境占优结构 | 经典例子 | Flood–Dresher / Tucker 叙述；支付 \(T>R>P>S\) | 【事实】 |
| 理性化与 IESDS | 学术 | Bernheim / Pearce；MIT OCW Rationalizability 讲义 | 【事实】 |
| Vickrey / VCG 与 DSIC | 机制设计 | Vickrey 1961；Clarke–Groves；现代 AGT 讲义（Stanford/Brown） | 【事实】 |
| 本手册 3×3 IESDS 数值 | 自构教学矩阵 | 经 node 逐轮复核：删 R→删 M,D→删 L→(U,M)=(1,2) | 【事实】 |
| 实验室有限剔除 | 文献综述口径 | p-beauty contest / level-k 实验传统 | 【分析】/【待验证】 |
| 标记约定 | 本引擎 | 【事实】【分析】【推论】【假设】【待验证】 | — |

# 免责声明 {.appendix}

本手册为博弈论与机制设计的认知与练习框架，用于理解占优、IESDS 与 DSIC 的结构关系，**不构成**投资、投标、谈判或法律建议。真实世界的支付、信息与执行约束会使「纸面占优」失效；涉及金钱、合规与契约时，请以可执行规则与专业意见为准。交互模型中的数值为教学默认值，可调但不保证匹配任一实证场景。
