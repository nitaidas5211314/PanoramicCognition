---
slug: 相关均衡（Correlated Equilibrium）：引入公共信号协调行动，可达到优于纳什均衡的结果（红绿灯原理）
title: 相关均衡（Correlated Equilibrium）：公共信号协调，可优于纳什（红绿灯原理）
subtitle: 纳什要求各方<strong>独立</strong>随机化；相关均衡允许一台「红绿灯」式公共装置给出<strong>相关</strong>建议——建议可被理性遵守，且常比混合纳什更公平、更高效。
brand_sub: Correlated Equilibrium × Mediation
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 相关均衡, Correlated Equilibrium, Aumann, 红绿灯, 公共信号, 中介, 后悔匹配]
theme_js_file: 相关均衡（Correlated Equilibrium）：引入公共信号协调行动，可达到优于纳什均衡的结果（红绿灯原理）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**相关均衡（Correlated Equilibrium, CE）**：一个关于行动组合的联合分布；一台中介（红绿灯、抛硬币、算法协调器）按该分布抽签后，向每位参与人**私下**建议一个行动。若「给定自己收到的建议，遵守建议是最优反应」，则该分布是相关均衡。【事实】

Robert Aumann（1974）《Subjectivity and correlation in randomized strategies》把「相关随机化」引入非合作博弈；红绿灯是教科书原型：一人收到「行」、另一人收到「停」，双方都愿遵守——这不是任何独立混合策略能生成的联合分布。【事实】

关键对比：混合纳什要求各方**独立**掷骰子，交叉路口的混合均衡常给出极低期望收益（甚至接近 0）并保留正的对撞概率；公平红绿灯相关均衡把期望抬高，并把对撞概率压到 0。【推论】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「再算一个纳什」，而是：**去掉独立随机化假设之后，理性还能稳定在哪些联合分布上**；以及一台可信任的公共信号装置如何把协调从「碰运气」变成「可激励兼容的建议」。

边界：

- **在界内**：联合分布上的激励约束、中介/信号设计、粗相关均衡（coarse CE）、后悔匹配与可计算性、拍卖与机制中的协调中介。
- **在界外**：具体交规条文、某一城市信号灯时序工程、某次牌局「暗号」八卦——除非压成「相关装置 + 激励相容」模型。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 带公共相关装置的均衡与激励相容建议 |
| 2 | 边界在哪 | 到「联合分布 + 条件最优反应」可操作化为止 |
| 3 | 核心对象 | 联合分布 \(D\)、建议、条件期望收益、中介 |
| 4 | 参与者 | 理性行动者 + 可被信任（或部分信任）的信号源 |
| 5 | 关键变量 | 相关结构、建议精度、服从率、支付不对称、信息私密性 |
| 6 | 可直接观察 | 信号灯、公开随机源、平台推荐、行业公约时钟 |
| 7 | 无法直接观察 | 对方是否真按建议、中介是否偏袒、私有信息 |
| 8 | 谁影响谁 | 装置相关化行动 → 条件信念更新 → 服从/偏离 → 福利 |
| 9 | 因果关系 | 相关建议 ⇒ 条件最优 ⇒ 可自我实施的协调 |
| 10 | 只是相关 | 「大家同时听广播」≠ CE；需激励约束成立【分析】 |
| 11 | 表层现象 | 红绿灯、抛硬币分角色、撮合引擎的配对建议 |
| 12 | 底层机制 | 联合分布上的线性激励不等式（可写成 LP） |
| 13 | 有反馈吗 | 有。服从沉淀为惯例；违约摧毁信号信誉 |
| 14 | 有延迟吗 | 有。新装置要时间成为共同信任的相关源 |
| 15 | 正/负反馈 | 高服从强化装置权威（正）；一次大规模闯红灯可负反馈瓦解 |

## 最关键的一句话

> 相关均衡回答的是：「若允许一台公共骰子把行动绑在一起，理性还能接受哪些绑法」——纳什只是其中「完全拆开绑」的特例。

# 为什么值得研究

:::cards g3
### 它补上「独立混合」的缺口
许多现实协调本来就靠公共时钟与信号，不是各自独立掷骰。【事实】

### 它往往严格优于混合纳什
性别战抛硬币可得 (1.5, 1.5)，高于混合纳什的 (2/3, 2/3)；红绿灯把交叉口期望从 0 抬到正值。【事实】

### 它在计算上「更像能算」
找一个 CE 可用线性规划，多项式时间；找纳什是 PPAD-完全。【事实】（Papadimitriou 等）
:::

:::note amber 最贵的一次误判
以为「发了个公共信号」就自动是相关均衡。若建议在条件期望下不激励相容（空荡路口的红灯诱惑），理性会偏离，装置变成噪音。【分析】
:::

# 世界地图

九层看相关均衡如何从「联合分布」长成「可学习的中介制度」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="ceArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制/信息设计 · 中介、BCE、拍卖协调器</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 学习动力学 · 后悔匹配 → 经验分布进 CE 集</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 计算结构 · CE∈P（LP）；Nash∈PPAD-完全</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 粗相关 · Coarse CE / Hannan 集（外部后悔）</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 激励边界 · 条件最优反应 vs 平均最优（粗）</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 经典装置 · 红绿灯 / 公平硬币 / 角色抽签</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 相关均衡 · 联合分布 + 条件激励约束</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 纳什特例 · 独立乘积分布 ⊂ CE</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 协调需求 · 相关行动可避免冲突、抬高福利</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L3→L4**：先承认纳什是特例，再引入装置。进阶卡在 **L5→L7**：分清粗/细相关，并记住「CE 可算、Nash 难算」。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="180" y="16" width="320" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">联合分布 D（行动组合上）</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">中介抽签</text><text x="130" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">给出私有建议</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">条件信念</text><text x="340" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">见建议后更新</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="550" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">激励约束</text><text x="550" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">遵守 ≥ 偏离</text>

  <line x1="280" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="100" y="200" width="200" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="200" y="230" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象：CE 定义</text>
  <rect x="380" y="200" width="200" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="480" y="230" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制：线性不等式</text>
  <rect x="240" y="280" width="200" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="310" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作：造信号 / 验服从</text>

  <line x1="200" y1="248" x2="300" y2="280" stroke="#7c848f" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="480" y1="248" x2="380" y2="280" stroke="#7c848f" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="200" y1="152" x2="200" y2="200" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="550" y1="152" x2="480" y2="200" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
</svg>
:::

# 核心参与者

| 角色 | 在系统里做什么 | 典型失败模式 |
|---|---|---|
| 行动者 | 收到建议后决定服从或偏离 | 把「平均划算」当成「条件划算」 |
| 中介 / 相关装置 | 按 \(D\) 抽签并发私有建议 | 偏袒、可被操纵、信誉破产 |
| 机制设计者 | 选择 \(D\) 与信息结构以抬高福利 | 只优化效率忘了激励约束 |
| 学习算法 | 用后悔最小化逼近 CE 集 | 只消外部后悔 → 停在粗 CE |
| 监管 / 公约 | 提供可验证的公共随机源 | 信号被俘获或不可审计 |

# 核心变量

| 变量 | 符号直觉 | 杠杆方向 |
|---|---|---|
| 联合分布 | \(D\) over \(A\) | 决定可达福利与激励松紧 |
| 建议 | \(a_i\) 私有 | 信息越多约束越细，也越易操纵 |
| 服从率 | \(f\) | \(f\!<\!1\) 时有效相关被稀释 |
| 冲突成本 | \(C\)（对撞） | \(C\) 大 → 红灯更易自我实施 |
| 通行收益 | \(G\) | 抬高 CE 期望，也抬高闯灯诱惑 |
| 相关强度 | 离乘积分布的距离 | 越强越能躲开「双开」 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="caA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="caB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="40" width="140" height="50" rx="8" fill="#15181d"/><text x="90" y="70" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">公共相关源</text>
  <rect x="200" y="40" width="140" height="50" rx="8" fill="#1d4ed8"/><text x="270" y="70" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">私有建议</text>
  <rect x="380" y="40" width="140" height="50" rx="8" fill="#0f8a4d"/><text x="450" y="70" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">条件最优</text>
  <rect x="520" y="40" width="140" height="50" rx="8" fill="#b8730a"/><text x="590" y="70" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">稳定联合行动</text>

  <line x1="160" y1="65" x2="200" y2="65" stroke="#1d4ed8" stroke-width="2" marker-end="url(#caA)"/>
  <line x1="340" y1="65" x2="380" y2="65" stroke="#1d4ed8" stroke-width="2" marker-end="url(#caA)"/>
  <line x1="520" y1="65" x2="520" y2="65" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="520" y1="65" x2="520" y2="65"></line>
  <line x1="520" y1="65" x2="560" y2="65" stroke="#1d4ed8" stroke-width="2" marker-end="url(#caA)"/>

  <path d="M590,90 C590,160 90,160 90,90" fill="none" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="5,4" marker-end="url(#caB)"/>
  <text x="340" y="175" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">负反馈：大规模偏离 → 装置信誉崩 → 退回混合纳什式混乱</text>

  <rect x="80" y="210" width="520" height="60" rx="8" fill="#f8fafc" stroke="#e2e6ec"/>
  <text x="340" y="235" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">实线＝因果推进：相关源 → 建议 → 激励相容服从 → 协调结果</text>
  <text x="340" y="255" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">红虚线＝反馈：结果反噬装置信任（闯红灯传染）</text>
</svg>
:::

# 隐藏关系

- **CE ⊃ NE**：每个纳什（含混合）对应一个乘积联合分布，自动满足 CE 约束；反之不成立——红绿灯分布无法因子分解。【事实】
- **CE ≠「合作博弈」**：不要求可转移支付或绑定合同；只要求建议在条件期望下不被单方面偏离。【分析】
- **零和不可「靠相关发财」**：二人零和里，CE 期望无法超过纳什值（Aumann 已指出）。【事实】
- **粗 CE 更大**：只要求「事先承诺永远偏离」无利可图；允许「见建议再偏」的 CE 更紧。后悔匹配对内部/交换后悔 → CE；仅外部后悔 → 粗 CE。【事实】
- **谢林点 vs 相关装置**：焦点是认知显著性；CE 是激励相容的显式（或可模拟的）随机源。焦点可作「廉价相关」，但不保证激励。【分析】

# 系统运行机制

标准定义（直条件形式）：\(D\) 是 CE，当且仅当对每个参与人 \(i\)、每个被建议行动 \(\hat a_i\)、每个替代 \(a_i^*\)：

\[
\mathbb{E}_{a\sim D}\big[u_i(a)\mid a_i=\hat a_i\big]\;\ge\;
\mathbb{E}_{a\sim D}\big[u_i(a_i^*,a_{-i})\mid a_i=\hat a_i\big].
\]

等价说法：没有任何「交换规则」\(F_i\)（把建议映射成实际行动）能提高期望收益——这与「无交换后悔（swap regret）」对齐。【事实】

红绿灯运行机制：

1. 装置以 1/2 抽 (行,停)，以 1/2 抽 (停,行)，从不抽 (行,行)。
2. 收到「行」：推断对方「停」→ 行是最优。
3. 收到「停」：推断对方「行」→ 停优于硬闯（对撞成本 \(C\)）。
4. 故服从是条件最优；期望通行收益为 \(G/2\)，对撞概率 0。

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="110" r="10" fill="#15181d"/><text x="80" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">1974</text><text x="80" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Aumann</text><text x="80" y="166" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">相关策略</text>
  <circle cx="220" cy="110" r="10" fill="#1d4ed8"/><text x="220" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">1997</text><text x="220" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Foster–Vohra</text><text x="220" y="166" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">校准→CE</text>
  <circle cx="360" cy="110" r="10" fill="#0f8a4d"/><text x="360" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">2000</text><text x="360" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Hart–Mas-Colell</text><text x="360" y="166" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">后悔匹配</text>
  <circle cx="500" cy="110" r="10" fill="#b8730a"/><text x="500" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">2006+</text><text x="500" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Nash=PPAD</text><text x="500" y="166" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">CE∈P 对照</text>
  <circle cx="620" cy="110" r="10" fill="#d5342c"/><text x="620" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">2024</text><text x="620" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">中介/线性CE</text><text x="620" y="166" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">扩展式学习</text>
  <line x1="90" y1="110" x2="210" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="230" y1="110" x2="350" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="370" y1="110" x2="490" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="510" y1="110" x2="610" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
</svg>
:::

从「存在性思想」→「学习达到」→「计算复杂度对照」→「扩展式与中介算法」——CE 从教科书概念变成多智能体学习的目标解概念。【分析】

# 利益与激励

| 主体 | 想要什么 | 与 CE 的张力 |
|---|---|---|
| 弱势方 | 公平抽签（50–50 通行） | 强势方想把质量偏向自己 |
| 强势方 | 更多「行」建议 | 过度偏斜使对方激励破裂 |
| 中介平台 | 抽成 / 流量 / 合规 | 优化目标可能偏离社会剩余 |
| 社会规划者 | 零对撞 + 高通行 | 需维持装置可信与激励松弛 |

激励相容的核心不是「平均大家都更好」，而是**每个建议实现值上**没有人想单方面换行动。【事实】

# 资源与信息流

信号与信任如何「抽水」：中介消耗公信力，产出相关行动；偏离回流摧毁库存。

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="70" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/><text x="120" y="60" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">公信力库存</text><text x="120" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">可验证随机源</text>
  <rect x="260" y="30" width="160" height="70" rx="10" fill="#15181d"/><text x="340" y="60" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">中介抽水</text><text x="340" y="80" text-anchor="middle" fill="#c5cdd8" font-size="11" font-family="sans-serif">发私有建议</text>
  <rect x="480" y="30" width="160" height="70" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/><text x="560" y="60" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">协调剩余</text><text x="560" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">少冲突·高匹配</text>

  <line x1="200" y1="65" x2="260" y2="65" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <line x1="420" y1="65" x2="480" y2="65" stroke="#0f8a4d" stroke-width="2" marker-end="url(#flA)"/>

  <rect x="160" y="160" width="360" height="70" rx="10" fill="#fff5f5" stroke="#d5342c"/><text x="340" y="190" text-anchor="middle" fill="#d5342c" font-size="13" font-weight="700" font-family="sans-serif">泄漏：条件激励破裂 / 偏袒曝光 / 不可审计</text><text x="340" y="210" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">剩余回流为混乱；公信力被抽干</text>

  <path d="M560,100 C560,140 500,160 520,160" fill="none" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="4,3" marker-end="url(#flB)"/>
  <path d="M160,195 C80,195 80,100 120,100" fill="none" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="4,3" marker-end="url(#flB)"/>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 序 | 杠杆 | 为何高杠杆 | 操作成本 |
|---|---|---|---|
| 1 | 引入可验证公共随机源 | 立刻打开 CE 可达集 | 低：公开抛币/哈希承诺 |
| 2 | 把质量放在激励松弛内 | 偏斜过度则装置崩 | 中：要算条件期望 |
| 3 | 抬高冲突成本的可观测性 | \(C\) 越大红灯越稳 | 中：执法/保证金 |
| 4 | 用交换后悔学习替代「猜纳什」 | 经验玩法收敛 CE | 中：要日志与更新 |
| 5 | 区分粗 CE 与 CE | 避免「平均不亏」自欺 | 低：概念澄清 |
| 6 | 私有建议而非公开广播 | 减少可利用的共同偏离 | 中：信道设计 |
| 7 | 审计中介无偏 | 维持服从率 \(f\) | 高：治理 |
| 8 | 默认焦点作廉价相关 | 无装置时的次优 | 低：谢林锚 |
| 9 | 零和场景别幻想相关红利 | 省下错误优化 | 低 |
| 10 | 扩展式用中介协议 | 线性 CE 等可学松弛 | 高：算法 |

# 常见认知陷阱

:::details 1. 「相关均衡 = 大家商量好合作」
CE 不需要可执行合同，只需要激励相容建议。合作博弈的绑定协议是另一条线。【分析】
:::

:::details 2. 「有公共信号就自动是 CE」
广播天气、股价、名人推文都是公共信号；若条件激励不成立，它只是噪音相关。【事实】
:::

:::details 3. 「CE 总比所有纳什都好」
CE 集包含纳什；改进针对的是**某些**低效纳什（尤其混合）。零和里甚至没有超出纳什值的空间。【事实】
:::

:::details 4. 「混合纳什的 50% 对撞直觉」
交叉口混合均衡里双方以小概率同时「行」，对撞概率是 \(q^2\)（默认 \(q=1/6\) 时约 **2.78%**），不是 50%；但期望收益仍常远低于红绿灯。【推论】
:::

:::details 5. 「公平抽签一定激励相容」
在「停-停」质量过大、对撞成本不够大时，收到「停」可能想闯——模型 3 可演示破裂。【推论】
:::

:::details 6. 「LP 能算 = 现实能执行」
计算一个 CE 容易；让人类/机构信任中介并服从是治理问题。【分析】
:::

:::details 7. 「无后悔 = 一定到 CE」
外部后悔 → 粗 CE；到 CE 需要内部/交换后悔最小化。【事实】
:::

:::details 8. 「相关就是串谋」
激励相容的红绿灯降低事故；非法价格串谋是另一类相关——合法性与福利方向不同。【分析】
:::

:::details 9. 「把 CE 收益写进商业计划当保证」
服从率 \(f<1\)、装置偏斜、信息泄露都会侵蚀纸面增益。【分析】
:::

:::details 10. 「扩展式里普通 CE 定义随便用」
序贯博弈有多种相关/通信均衡概念；2024 年工作强调中介查询与线性交换后悔等精细化。【待验证】
:::

<!-- nav:实践路径 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <rect x="20" y="30" width="200" height="180" rx="12" fill="#f8fdfa" stroke="#0f8a4d"/>
  <text x="120" y="60" text-anchor="middle" fill="#0f8a4d" font-size="14" font-weight="700" font-family="sans-serif">抽象</text>
  <text x="120" y="95" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">联合分布 D</text>
  <text x="120" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">条件激励不等式</text>
  <text x="120" y="145" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">CE ⊃ NE</text>
  <text x="120" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">粗 CE ⊃ CE</text>

  <rect x="240" y="30" width="200" height="180" rx="12" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="340" y="60" text-anchor="middle" fill="#1d4ed8" font-size="14" font-weight="700" font-family="sans-serif">机制</text>
  <text x="340" y="95" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">中介抽签</text>
  <text x="340" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">私有建议信道</text>
  <text x="340" y="145" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">后悔匹配动态</text>
  <text x="340" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">LP / 学习算法</text>

  <rect x="460" y="30" width="200" height="180" rx="12" fill="#fff7e6" stroke="#b8730a"/>
  <text x="560" y="60" text-anchor="middle" fill="#b8730a" font-size="14" font-weight="700" font-family="sans-serif">操作</text>
  <text x="560" y="95" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">角色抛硬币</text>
  <text x="560" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">轮值/信号灯规则</text>
  <text x="560" y="145" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">撮合推荐+审计</text>
  <text x="560" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">验条件不偏离</text>
</svg>
:::

# 从理论到行动

1. **先画支付矩阵**，标出纯 NE / 混合 NE 期望。
2. **设计一个相关装置**（公平硬币、轮值表、公开随机种子）。
3. **逐条检查条件激励**：每个建议实现值上，遵守 ≥ 最佳偏离。
4. **压力测试偏斜**：把概率从 50–50 挪到 70–30，看谁先想叛逃。
5. **测量服从率**；若 \(f\) 低，先修信任与惩罚，再谈优化 \(D\)。

# 技能树

:::details 基础 · 会讲红绿灯故事
能用 (行,停)/(停,行) 解释为何服从是条件最优，并对比混合纳什期望。【事实】
:::

:::details 基础 · 会写 CE 不等式
对 2×2 矩阵列出全部条件激励约束，判断候选 \(D\) 是否 CE。
:::

:::details 进阶 · 分清 CE / 粗 CE / NE
能指出：乘积分布→NE；外部后悔→粗 CE；交换后悔→CE。
:::

:::details 进阶 · 会算性别战抛硬币增益
混合纳什每人 \(2/3\)；公平相关每人 \(1.5\)；增益 \(5/6\)。【事实】
:::

:::details 专家 · 用后悔匹配做小仿真
实现 Hart–Mas-Colell 风格更新，观察经验联合分布进入 CE 集。【分析】
:::

:::details 专家 · 中介与信息设计
在不完全信息下讨论 Bayes CE / 通信均衡，并意识到样本与计算代价。【待验证】
:::

# 游戏化世界

你是一座城的「信号官」：矩阵是路口，装置是你的灯控。目标不是让某辆车永远绿灯，而是维持**激励相容的相关**——一旦有人发现「红灯时闯更划算」，系统从 CE 掉回混合混乱。经验值来自：对撞↓、通行期望↑、审计通过。

# 任务系统

| 任务 | 做什么 | 验收 |
|---|---|---|
| T1 矩阵 | 写出一个交叉口/会议室抢占的 2×2 支付 | 有 \(G,C,S\) |
| T2 混合 | 算出混合 NE 的 \(q\) 与期望 | 与公式一致 |
| T3 灯控 | 设计 50–50 相关并验激励 | 证明是 CE |
| T4 偏斜 | 把概率调到破裂点 | 找到临界 |
| T5 对照 | 用模型 1–2 读出增益数字 | 与手算一致 |

# 反事实模拟

四个可调模型：红绿灯 vs 混合纳什、性别战抛硬币、激励相容检验、服从率稀释。正文默认值已与脚本对齐。

## 可调模型 1 · 红绿灯 vs 混合纳什

懦夫/交叉口支付：

|  | 停 | 行 |
|---|---|---|
| **停** | \(S,S\) | \(0,G\) |
| **行** | \(G,0\) | \(-C,-C\) |

混合纳什：对方「行」的概率 \(q^*=(G-S)/(G-S+C)\)，期望收益 \(S(1-q^*)\)。公平相关均衡：质量仅在 (行,停) 与 (停,行) 上各 1/2，期望 \(G/2\)，对撞概率 0。默认 \(G=5,S=0,C=25\) → \(q^*=1/6\)，混合期望 **0**，CE 期望 **2.5**，混合对撞概率 **2.78%**。【推论】

:::raw
<div class="tool" id="tool_tl">
  <div class="ctrl">
    <label>通行收益 G <output id="tl_GO">5.0</output></label>
    <input type="range" id="tl_G" min="1" max="10" step="0.1" value="5.0"/>
    <label>双停收益 S <output id="tl_SO">0.0</output></label>
    <input type="range" id="tl_S" min="-1" max="3" step="0.1" value="0.0"/>
    <label>对撞成本 C <output id="tl_CO">25</output></label>
    <input type="range" id="tl_C" min="2" max="50" step="1" value="25"/>
  </div>
  <div class="readout">
    <div class="ro">混合 q*<strong id="tl_q">0.167</strong></div>
    <div class="ro">混合期望<strong id="tl_mix">0.00</strong></div>
    <div class="ro">CE 期望<strong id="tl_ce">2.50</strong></div>
    <div class="ro">增益<strong id="tl_gain">+2.50</strong></div>
    <div id="tl_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="tl_vh">G=5,S=0,C=25 → 混合 EU=0，公平灯控 EU=2.50；对撞从 2.78% 降到 0</span></div>
  </div>
  <canvas id="tlChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 性别战：混合纳什 vs 公平硬币 CE

同选歌剧 \((a,1)\)，同选球赛 \((1,b)\)，错配 0。混合纳什每人期望 \(a/(1+a)\) 与 \(b/(1+b)\)（对称时 \(a=b=2\) → **2/3**）。公平硬币在两纯 NE 间相关，每人 \((a+1)/2\)（对称时 **1.5**）。【事实】

:::raw
<div class="tool" id="tool_bos">
  <div class="ctrl">
    <label>行偏好 a <output id="bos_aO">2.0</output></label>
    <input type="range" id="bos_a" min="1.1" max="6" step="0.1" value="2.0"/>
    <label>列偏好 b <output id="bos_bO">2.0</output></label>
    <input type="range" id="bos_b" min="1.1" max="6" step="0.1" value="2.0"/>
  </div>
  <div class="readout">
    <div class="ro">混合 EU(行)<strong id="bos_mixR">0.667</strong></div>
    <div class="ro">CE EU(行)<strong id="bos_ceR">1.500</strong></div>
    <div class="ro">行增益<strong id="bos_gainR">+0.833</strong></div>
    <div class="ro">列增益<strong id="bos_gainC">+0.833</strong></div>
    <div id="bos_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="bos_vh">a=b=2：混合各 0.667 → 公平硬币各 1.500（Aumann 经典）</span></div>
  </div>
  <canvas id="bosChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 激励相容检验（会不会闯红灯）

装置质量：\(\alpha\) 在 (行,停)，\(\beta\) 在 (停,行)，\(\gamma\) 在 (停,停)，(行,行)=0。收到「行」时需 \(G\ge S\)；收到「停」时，在条件分布下遵守停 ≥ 改行。默认 \(\alpha=\beta=0.5,\gamma=0,G=5,S=0,C=25\) → **是 CE**。把 \(\gamma\) 抬高、\(C\) 降低，可看到约束破裂。【推论】

:::raw
<div class="tool" id="tool_ic">
  <div class="ctrl">
    <label>α (行,停) <output id="ic_aO">0.50</output></label>
    <input type="range" id="ic_a" min="0" max="1" step="0.01" value="0.50"/>
    <label>β (停,行) <output id="ic_bO">0.50</output></label>
    <input type="range" id="ic_b" min="0" max="1" step="0.01" value="0.50"/>
    <label>γ (停,停) <output id="ic_gO">0.00</output></label>
    <input type="range" id="ic_g" min="0" max="1" step="0.01" value="0.00"/>
    <label>G <output id="ic_GO">5.0</output></label>
    <input type="range" id="ic_G" min="1" max="10" step="0.1" value="5.0"/>
    <label>S <output id="ic_SO">0.0</output></label>
    <input type="range" id="ic_S" min="-1" max="3" step="0.1" value="0.0"/>
    <label>C <output id="ic_CO">25</output></label>
    <input type="range" id="ic_C" min="1" max="50" step="1" value="25"/>
  </div>
  <div class="readout">
    <div class="ro">归一后期望<strong id="ic_eu">2.50</strong></div>
    <div class="ro">停时遵守 EU<strong id="ic_euF">0.00</strong></div>
    <div class="ro">停时偏离 EU<strong id="ic_euD">-25.00</strong></div>
    <div class="ro">判定<strong id="ic_lab">是 CE</strong></div>
    <div id="ic_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ic_vh">质量仅在反对角线上 → 条件激励成立，是 CE</span></div>
  </div>
  <canvas id="icChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 服从率稀释相关红利

纸面 CE 期望为 \(U_{\mathrm{ce}}\)，混合底线为 \(U_{\mathrm{mix}}\)。若只有比例 \(f\) 的人服从装置、其余按混合纳什行为，有效期望近似 \(f\,U_{\mathrm{ce}}+(1-f)\,U_{\mathrm{mix}}\)（一阶示意）。默认取模型 1 的 2.50 vs 0，\(f=0.80\) → 有效 **2.00**。【假设】

:::raw
<div class="tool" id="tool_f">
  <div class="ctrl">
    <label>服从率 f <output id="f_fO">0.80</output></label>
    <input type="range" id="f_f" min="0" max="1" step="0.01" value="0.80"/>
    <label>纸面 CE 期望 <output id="f_ceO">2.50</output></label>
    <input type="range" id="f_ce" min="0" max="5" step="0.05" value="2.50"/>
    <label>混合底线 <output id="f_mixO">0.00</output></label>
    <input type="range" id="f_mix" min="-1" max="2" step="0.05" value="0.00"/>
  </div>
  <div class="readout">
    <div class="ro">有效期望<strong id="f_eff">2.00</strong></div>
    <div class="ro">红利保留<strong id="f_keep">80%</strong></div>
    <div class="ro">相对纸面缺口<strong id="f_gap">0.50</strong></div>
    <div id="f_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="f_vh">f=0.80 时有效 EU≈2.00；装置设计必须同时抓服从，不只优化纸面 D</span></div>
  </div>
  <canvas id="fChart" height="214"></canvas>
</div>
:::

:::tabs
@@装灯
模型 1：看 CE 相对混合的增益；把 C 加大，混合对撞↓但 CE 增益结构仍在。

@@抛硬币
模型 2：复现 Aumann (2,1)/(1,2) 上的 (1.5,1.5)。

@@压破裂
模型 3：抬高 γ、降低 C，直到判定变成「非 CE」——这就是空城红灯诱惑。
:::

# 四级能力路线

| 级别 | 能力 |
|---|---|
| L1 识图 | 能解释红绿灯为何是 CE 而非混合纳什 |
| L2 验算 | 能列出 2×2 的条件激励并判定 |
| L3 设计 | 能在激励松弛内偏斜质量并估服从率 |
| L4 系统 | 能把后悔学习 / 中介协议接到多代理系统 |

# 30分钟最小实践

1. 画一个「会议室投影仪抢占」2×2（抢/让）。
2. 算混合纳什期望。
3. 设计「抛硬币决定谁先用」并检查双方是否愿遵守。
4. 写下：若败者常强行开讲，装置哪些参数先坏（对应 γ↑ 或 C↓）。

成本≈0；产出是一张填完的矩阵 + 一句「是否 CE」判定。

# 7天计划

| 天 | 行动 |
|---|---|
| D1 | 精读 Aumann 红绿灯/硬币例子（或教材转述） |
| D2 | 手算本手册模型 1–2 默认值 |
| D3 | 找生活中一个「轮值/抛签」并验激励 |
| D4 | 读懂「CE∈P vs Nash PPAD」一句话含义 |
| D5 | 区分外部后悔与交换后悔 |
| D6 | 用模型 3 找到一个非 CE 的相关方案 |
| D7 | 写 200 字：你的团队缺的是焦点还是相关装置 |

# 30天计划

| 周 | 主题 | 交付 |
|---|---|---|
| W1 | 定义与经典例子 | 笔记 + 手算 |
| W2 | 学习动态 | 迷你仿真或伪代码 |
| W3 | 机制/中介 | 一个激励相容轮值规则 |
| W4 | 复盘 | 对照清单自测 10 题 |

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **条件激励 CE**：见建议后的最优反应约束。
2. **红绿灯相关**：反对角线支撑的联合分布。
3. **Aumann 硬币**：纯 NE 凸组合的可实施化。
4. **乘积嵌入**：NE ⊂ CE。
5. **粗相关均衡**：仅抗「无条件偏离」。
6. **交换后悔 ↔ CE**：学习侧刻画。
7. **LP 可计算性**：变量=行动组合概率。
8. **零和无超额**：相关不能超越纳什值。
9. **服从稀释**：\(f U_{\mathrm{ce}}+(1-f)U_{\mathrm{mix}}\)。
10. **中介信息设计**：私有建议 + 激励松弛。

# 关键问题清单

:::details Q1 这个相关方案，在每个建议实现值上还最优吗？
逐建议算条件期望，不要只看事前平均。
:::

:::details Q2 联合分布能写成独立混合的乘积吗？
能 → 其实是纳什；不能 → 才真正用到相关。
:::

:::details Q3 中介可被谁操纵？
种子、算法、运营——公信力库存是否可审计？
:::

:::details Q4 偏斜到多少激励会破？
用模型 3 扫边界，不要拍脑袋 70–30。
:::

:::details Q5 冲突成本被双方同样感知吗？
不对称感知 ≈ 不同 \(C\)，CE 可能单边破裂。
:::

:::details Q6 我们消的是外部后悔还是交换后悔？
决定收敛到粗 CE 还是 CE。
:::

:::details Q7 公开广播是否泄露可协调的共同偏离？
有时私有建议更稳。
:::

:::details Q8 零和/近零和里还在追相关红利吗？
先检查有没有理论空间。
:::

:::details Q9 服从率实测多少？
纸面增益 × \(f\) 才是运营现实。
:::

:::details Q10 这是谢林焦点还是显式装置？
焦点便宜但不保证激励；装置贵但可设计。
:::

# 下一阶段探索

- Bayes 相关均衡与拍卖中的协调中介（样本复杂度方向）。【待验证】
- 扩展式博弈的线性相关均衡与中介查询解释（ICLR 2024 脉络）。【分析】
- 与机制设计显示原理、信息设计（Bayesian persuasion）的接口。
- 多智能体 RL 里以 CE / 粗 CE 为解目标的实践取舍。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| CE 定义与硬币/相关思想 | 经典论文 | Aumann, 1974, J. Math. Econ. | 【事实】 |
| 术语「correlated equilibrium」早期用法 | 学术史 | Rosenthal 1974；2024 JME 回顾文 | 【事实】 |
| 后悔匹配 → CE | 经典论文 | Hart & Mas-Colell, Econometrica 2000 | 【事实】 |
| 校准学习与 CE | 经典论文 | Foster & Vohra, 1997 | 【事实】 |
| Nash 为 PPAD-完全；CE 可用 LP | 复杂度综述 | Daskalakis–Goldberg–Papadimitriou 等；教材/综述 | 【事实】 |
| 红绿灯/交叉口数值例子 | 教材推演 | UPenn AGT 讲义等；本手册参数自洽推演 | 【推论】 |
| 扩展式线性 CE / 中介 | 近期会议 | ICLR 2024 等 | 【分析】 |
| 拍卖中学习 BCE | 预印本 | 2020s 学习理论工作 | 【待验证】 |

标记约定：【事实】多方一致或经典原文；【分析】权威推断；【推论】由模型导出；【假设】简化；【待验证】单一或过新来源。

# 免责声明 {.appendix}

本手册为认知与决策框架说明，用于理解博弈论中的相关均衡概念与激励约束。不构成投资、法律、工程安全或交通管理建议。文中数值由示意支付矩阵推导，不代表任何真实路口、市场或平台的统计保证。涉及多代理人系统部署时，须另行做安全、合规与激励审计。
