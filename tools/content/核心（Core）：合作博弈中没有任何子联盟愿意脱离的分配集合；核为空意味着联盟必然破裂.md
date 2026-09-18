---
slug: 核心（Core）：合作博弈中没有任何子联盟愿意脱离的分配集合；核为空意味着联盟必然破裂
title: 核心（Core）
subtitle: 合作博弈里<strong>没有任何子联盟愿意脱离</strong>的分配集合——核为空意味着大联盟必然破裂；Bondareva–Shapley 给出充要条件。
brand_sub: Core × Cooperative Games
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 合作博弈, 核心, Core, Bondareva-Shapley, 空核, 核仁, 联盟稳定]
theme_js_file: 核心（Core）：合作博弈中没有任何子联盟愿意脱离的分配集合；核为空意味着联盟必然破裂.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**核心（core）**是可转移效用（TU）合作博弈上的**稳定分配集合**：在效率约束 \(x(N)=v(N)\) 下，对每一个子联盟 \(S\)，其成员合计所得不少于他们单干能创造的价值——\(\sum_{i\in S}x_i\ge v(S)\)。Gillies（1953）形式化；它是联盟稳定性的标准解概念。【事实】

核可以**很大**（一整块多面体），也可以**为空**。空核不是数学事故：三人多数博弈 \(v(\{i\})=0\)、任意两人 \(v=1\)、大联盟 \(v(N)=1\) 的核必空——任何分法都会被某个二人联盟否决。【事实】

Bondareva（1963）与 Shapley（1967）独立给出充要条件：核非空 **当且仅当** 博弈**平衡（balanced）**——任何「分数覆盖」玩家的联盟加权值之和不超过 \(v(N)\)。【事实】

与相邻概念分工：**沙普利值**问「事前公平份额」；**核**问「事后会不会拆伙」；核空时沙普利值仍存在，但可能留不住人。**核仁（nucleolus）**在核非空时落在核内，核空时给出「最不不满」的近似。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么把饼分漂亮」，而是：给定特征函数 \(v:2^N\to\mathbb{R}\)，有没有**任何**一种把 \(v(N)\) 分给个人的方案，使得**没有任何子联盟**有动机带着自己的 \(v(S)\) 出走。

边界：

- **在界内**：TU 合作博弈、特征函数、分配/估算（imputation）、阻塞联盟、平衡性、ε-核、核仁、凸博弈、市场博弈。
- **在界外**：非合作讨价还价话术、股权对赌措辞——除非压成 \(v(S)\) 与稳定性检验。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 大联盟分配能否抵抗一切子联盟的退出威胁 |
| 2 | 边界在哪 | 到「特征函数 + 稳定集」为止；谈判过程可另建模 |
| 3 | 核心对象 | \(N,v\)、分配 \(x\)、超额 \(e(S,x)\)、平衡权重 |
| 4 | 参与者 | 合作方；规则设计者；旁观者（被分摊成本的人） |
| 5 | 关键变量 | 超可加性、凸性、平衡性、互补结构、退出成本 |
| 6 | 可直接观察 | 合同份额、合资分红、成本分摊单、投票多数 |
| 7 | 无法直接观察 | 真实 \(v(S)\)、隐性侧支付、未来报复能力 |
| 8 | 谁影响谁 | \(v\) 形状 → 核空/非空 → 是否需制度补丁 |
| 9 | 因果关系 | 不平衡 ⇒ 核空；凸 ⇒ 核非空且含沙普利值 |
| 10 | 只是相关 | 「大家口头同意」≠「核非空」；合同可短时维系空核局面【分析】 |
| 11 | 表层现象 | 合资散伙、多数派轮流分赃、手套/鞋市场极端份额 |
| 12 | 底层机制 | 线性不等式组可行域；对偶即平衡条件 |
| 13 | 有反馈吗 | 有。拆伙改变可行联盟 → 重估 \(v\) → 新核 |
| 14 | 有延迟吗 | 有。重复博弈、惩罚条款、沉淀成本可「补」空核 |
| 15 | 正/负反馈 | 互补增强 → 核放大；多数循环 → 核塌缩 |

## 最关键的一句话

> 核不问「公不公平」，而问：有没有哪怕一种分法，让所有子联盟都觉得「留下来不亏」。

# 为什么值得研究

:::cards g3
### 它是联盟稳定的最低门槛
没有核内点，任何提案都能被某个联盟严格改进——合资、成本分摊、多数决策都会陷入「永远有人想拆台」。【分析】

### 它给出可检验的充要条件
Bondareva–Shapley：平衡 ⇔ 核非空。不必穷举所有分配，可用线性规划/对偶判定。【事实】

### 它暴露「空核 ≠ 不能合作」
空核只说明**无免疫阻塞的分配**；长期合同、退出罚金、重复交互、平台治理仍可维系合作。【分析】
:::

:::note amber 最贵的一次误判
把「签了合同」当成「核非空」。合同只是当期约束；若 \(v\) 结构本身不平衡，条款一松或外部机会一变，拆伙逻辑立刻复活。【分析】
:::

# 世界地图

九层从「特征函数」爬到「制度补丁」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="coreArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度军备 · 退出罚金 / 重复博弈 / 平台治理补空核</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 实证与现场 · 合资拆伙 / 成本分摊争议 / 多数议会</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 计算 · LP 求核 / 采样超额 / 大 n 近似</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 跨域同构 · 稳定匹配 · 竞争均衡 · 网络流</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 解概念家族 · 核 · ε-核 · 核仁 · 沙普利值</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 经典例子 · 多数博弈空核 / 手套极端核 / 凸博弈</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 判定定理 · Bondareva–Shapley 平衡性</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 定义 · 效率 + 联盟理性（无阻塞）</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 原语 · 参与人 N + 特征函数 v(S)</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2–L4**：会检验三人分配是否在核内、认多数空核与手套极端核；进阶卡在 **L3** 与 **L5**——平衡判定，以及核空时用 ε-核/核仁做「最稳近似」。【分析】
:::

# 核心概念地图

从稳定定义到可操作检验。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="80" y="16" width="520" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">稳定分配 → 核 C(v) → 空则制度补丁 / ε-核 / 核仁</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">无阻塞 · 效率</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">线性不等式 / 对偶</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">分账·合资·投票</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">v(S) 联盟值</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">退出外部选择</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">x 分配向量</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Σxᵢ=v(N)</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">超额 e(S,x)</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">v(S)−x(S)≤0</text>

  <line x1="130" y1="146" x2="130" y2="180" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="146" x2="340" y2="180" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="550" y1="146" x2="550" y2="180" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <path d="M220 215 H250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <path d="M430 215 H460" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="280" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红虚线 = 反馈：正超额 → 阻塞 → 拆伙 → 重写 v 或加制度</text>
  <text x="340" y="310" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">跨域同构：核≈无套利包 / 竞争均衡分配 / 稳定匹配阻隔对</text>
  <text x="340" y="340" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">空核 ≈ 循环多数 ≈ 预算不够付所有威胁</text>
</svg>
:::

# 核心参与者

| 角色 | 目标 | 信息位置 | 典型工具 |
|---|---|---|---|
| 合作方 / 玩家 | max 自身份额且不被挤出 | 常知己方外部选择 | 退出威胁、侧支付 |
| 规则设计者 | 核非空 + 可计算 + 可执行 | 定义 \(v\) 或强制披露 | 凸化结构、ε-核、罚金 |
| 多数派 / 关键联盟 | 用阻塞力抽租 | 知投票/互补结构 | 轮流结盟、否决权 |
| 稀缺资源方 | 占核的极端点 | 知供需不对称 | 手套博弈式要价 |
| 旁观者 / 纳税人 | 少承担外部性 | 常被忽略 | 预算上限、补贴审计 |

# 核心变量

| 变量 | 符号/度量 | 为何关键 | 杠杆方向 |
|---|---|---|---|
| 联盟值 | \(v(S)\) | 阻塞力的来源 | 测准外部选择比争论公式更重要 |
| 分配 | \(x\in\mathbb{R}^n\) | 核的候选点 | 先满足效率再查超额 |
| 超额 | \(e(S,x)=v(S)-x(S)\) | \(>0\) 即可阻塞 | 核 ⇔ 一切超额 ≤ 0 |
| 平衡权重 | \(\alpha(S)\ge 0\) | 判定核是否空 | 找违反的平衡族即证空核 |
| 超可加性 | \(v(S\cup T)\ge v(S)+v(T)\) | 大联盟有意义 | 无则先别谈核 |
| 凸性 | 边际递增 | 充分 ⇒ 核非空 | 互补业务优先 |
| 最小 ε | least-core 半径 | 核空时的「不稳程度」 | ε 越小越好补 |
| 退出成本 | 合同罚金等 | 有效抬高 \(v\) 外留存 | 可人为「造核」 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">技术/互补</text>
  <rect x="180" y="40" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">特征函数 v</text>
  <rect x="340" y="40" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="400" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">平衡性</text>
  <rect x="500" y="40" width="140" height="50" rx="8" fill="#15181d"/><text x="570" y="70" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">核 C(v)</text>

  <line x1="140" y1="65" x2="180" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="300" y1="65" x2="340" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="460" y1="65" x2="500" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="180" y="160" width="120" height="50" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="240" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">分配提案 x</text>
  <rect x="340" y="160" width="120" height="50" rx="8" fill="#fee2e2" stroke="#d5342c"/><text x="400" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">阻塞联盟</text>
  <rect x="500" y="160" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="570" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">拆伙 / 重谈</text>

  <line x1="240" y1="90" x2="240" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="400" y1="90" x2="400" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="570" y1="90" x2="570" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="300" y1="185" x2="340" y2="185" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <line x1="460" y1="185" x2="500" y2="185" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>

  <path d="M570 210 Q340 280 80 90" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <text x="340" y="300" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：拆伙改变可行联盟 → 重估 v → 新的核（或仍空）</text>
</svg>
:::

因果链（实线）与反馈（红虚线）必须分清：

1. **技术互补 → \(v\)**：没有协同就没有可分剩余，也谈不上稳定。【分析】
2. **\(v\) → 平衡性 → 核**：Bondareva–Shapley 把「结构」钉成充要条件。【事实】
3. **提案 \(x\) → 超额 → 阻塞**：正超额联盟是拆伙的直接扳机。【事实】
4. **反馈**：拆伙后外部选择变化，\(v\) 重写，核可能从空变非空，或反过来。【推论】

# 隐藏关系

:::cards g2
### 核与竞争均衡
可交换经济里，竞争均衡分配落在核内；人多时核「收缩」向竞争均衡（Debreu–Scarf 型结果的直观）。【分析】

### 核与沙普利值
凸博弈 ⇒ 沙普利值 ∈ 核；一般博弈沙普利值可能在核外——公平与稳定可分叉。【事实】

### 核与核仁
核非空 ⇒ 核仁 ∈ 核；核空 ⇒ 核仁仍唯一存在，落在最小 ε-核中。【事实】

### 空核与循环多数
奇数人简单多数「分一块饼」：核空，与 Condorcet 循环同构——总有多数想改方案。【分析】
:::

:::note purple 跨域同构（本手册最锋利的刀）
**空核** ↔ **预算不够同时满足所有威胁** ↔ **套利机会未消除** ↔ **匹配市场里的阻隔对**。同一数学：一组不等式无解。【推论】
:::

# 系统运行机制

核的运转可以压成一条流水线：

:::raw
<div class="flow">
  <span>写清 v(S)</span><i>→</i>
  <span>效率：Σx=v(N)</span><i>→</i>
  <span>查一切超额</span><i>→</i>
  <span class="hi">核空？</span><i>→</i>
  <span>平衡检验 / LP</span><i>→</i>
  <span>ε-核·核仁·制度</span>
</div>
:::

| 环节 | 机制 | 失败模式 |
|---|---|---|
| 特征函数 | 每个 \(S\) 的可转移价值 | 估错外部选择 → 假核/假空 |
| 效率 | 分光大联盟剩余 | 「留公共池」伪装稳定 |
| 联盟理性 | \(x(S)\ge v(S)\) | 漏检某个 \(S\) |
| 平衡判定 | \(\sum\alpha(S)v(S)\le v(N)\) | 只查整数划分不够 |
| 补丁 | ε、罚金、重复博弈 | 补丁本身改变有效 \(v\) |

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="50" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t0 建盟</text><text x="80" y="70" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">估 v · 提案</text>
  <circle cx="220" cy="110" r="10" fill="#1d4ed8"/><text x="220" y="50" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t1 检验</text><text x="220" y="70" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">超额扫描</text>
  <circle cx="360" cy="110" r="10" fill="#b8730a"/><text x="360" y="50" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t2 冲击</text><text x="360" y="70" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">外部机会变</text>
  <circle cx="500" cy="110" r="10" fill="#d5342c"/><text x="500" y="50" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t3 危机</text><text x="500" y="70" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">核变空/变点</text>
  <circle cx="620" cy="110" r="10" fill="#15181d"/><text x="620" y="50" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t4 修补</text><text x="620" y="70" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">罚金·ε·重谈</text>
  <text x="340" y="170" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">核是状态变量：同一合同在不同外部选择下可从「稳」翻成「必裂」</text>
  <text x="340" y="195" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">延迟：诉讼/罚金使短期表现像有核，长期仍服从结构</text>
</svg>
:::

# 利益与激励

| 行动者 | 激励 | 对核的影响 |
|---|---|---|
| 强互补方 | 做大 \(v(N)\) | 扩大可行核 |
| 可自成对的多数 | 保持两两 \(v\) 高 | 推高平衡加权和 → 易空核 |
| 稀缺侧（手套左手） | 占核的极端点 | 核缩成单点，他方份额→0 |
| 设计者 | 凸化 / 加退出成本 | 人造非空核 |
| 短期机会主义者 | 吃超额再跑 | 加速空核暴露 |

:::note red 激励冲突的硬事实
核关心的是**联盟**激励，不是个人道德。一个「好人」若所在二人联盟超额为正，理性仍驱动他参与阻塞——除非制度改变有效 \(v\)。【分析】
:::

# 资源与信息流

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="fB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="30" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="100" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">创造剩余</text><text x="100" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">v(N) 总饼</text>
  <rect x="220" y="30" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="290" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">分配管道</text><text x="290" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">x₁…xₙ</text>
  <rect x="410" y="30" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="480" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">威胁池</text><text x="480" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">各 S 的 v(S)</text>
  <rect x="560" y="30" width="90" height="60" rx="8" fill="#fee2e2" stroke="#d5342c"/><text x="605" y="65" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">阻塞</text>

  <line x1="170" y1="60" x2="220" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>
  <line x1="360" y1="60" x2="410" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>
  <line x1="550" y1="60" x2="560" y2="60" stroke="#d5342c" stroke-width="1.5" marker-end="url(#fB)"/>

  <rect x="120" y="140" width="440" height="90" rx="10" fill="#f8fafc" stroke="#e2e6ec"/>
  <text x="340" y="175" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">资金流抽水图：饼只有 v(N)，威胁合计可「虚要」更多</text>
  <text x="340" y="200" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">三人多数：三对各要 1，加权和 1.5 &gt; v(N)=1 → 抽空 → 核空</text>
  <text x="340" y="222" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">信息流：谁知道真实 v(S)，谁就能更准地发起阻塞或防御</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 秩 | 杠杆点 | 为何杠杆大 | 操作成本 |
|---|---|---|---|
| 1 | 把 \(v(S)\) 测准 | 假数据 → 假稳定 | 中：反事实实验 |
| 2 | 改联盟结构（凸化） | 充分条件直接造核 | 高：业务重组 |
| 3 | 退出罚金 / 重复博弈 | 有效抬高留存 | 中：合同设计 |
| 4 | 选核内点而非任意公平 | 公平公式可能在核外 | 低：先查核 |
| 5 | 用平衡族证空 | 比穷举分配快 | 低：三人手算 |
| 6 | ε-核 / 核仁 | 空核时的最小让步 | 中：LP |
| 7 | 限制可形成联盟 | 缩小约束集 | 政策/平台规则 |
| 8 | 侧支付通道 | TU 假设的现实版 | 法律边界 |
| 9 | 信息披露 | 减少「假 v」谈判 | 中 |
| 10 | 稀缺侧识别 | 手套核极端点 | 低：看供需 |

# 常见认知陷阱

:::details 1. 「核非空 = 合作一定发生」
核非空只保证**存在**稳定分配，不保证谈判会选中它；多重核点时仍可能谈崩。【分析】
:::

:::details 2. 「空核 = 不可能合作」
空核 = 无免疫阻塞的分配。合同、声誉、罚金、平台规则可改变有效博弈。【分析】
:::

:::details 3. 「平均分一定在核内」
三人多数平均分 \((1/3,1/3,1/3)\)：任二人合计 \(2/3<1\)，三对全部阻塞。平均分甚至是「最不坏」的核仁，但仍不在核内。【事实】
:::

:::details 4. 「沙普利值稳住大联盟」
沙普利值永远存在，但可不在核内；核空时它无法阻止拆伙。【事实】
:::

:::details 5. 「超可加 ⇒ 核非空」
超可加只说明大联盟「值得形成」，不保证稳定分配存在。多数博弈常取超可加仍空核。【事实】
:::

:::details 6. 「人多了核更大」
交换经济里人多时核往往**收缩**；手套市场右侧过剩时核缩成给稀缺侧的单点。【分析】
:::

:::details 7. 「个人理性够了」
估算集要求 \(x_i\ge v(\{i\})\)；核还要求一切 \(S\)，漏掉二人联盟是最常见翻车。【分析】
:::

:::details 8. 「平衡性太抽象，可忽略」
三人多数用 \(\alpha=1/2\) 覆盖三对：加权和 \(1.5>1\)，立刻证空——抽象条件有手算版。【事实】
:::

:::details 9. 「核仁能创造核」
核仁最小化不满，不能把空核变非空；它只选最小 ε-核里的一点。【事实】
:::

:::details 10. 「TU 侧支付现实中免费」
法律、税收、信任摩擦使侧支付有成本；实际更接近 NTU，Scarf 平衡性只给充分条件。【分析】
:::

:::details 11. 「合同签署日核就冻结了」
外部选择一变，\(v\) 重写，昨日核内点今日可被阻塞。【推论】
:::

<!-- nav:实践落地 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="mA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="80" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="120" y="65" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">抽象</text><text x="120" y="88" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">C(v) 多面体</text>
  <rect x="260" y="30" width="160" height="80" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="65" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">机制</text><text x="340" y="88" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">超额·平衡·ε</text>
  <rect x="480" y="30" width="160" height="80" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="560" y="65" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">操作</text><text x="560" y="88" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">条款·分账表</text>
  <line x1="200" y1="70" x2="260" y2="70" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#mA)"/>
  <line x1="420" y1="70" x2="480" y2="70" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#mA)"/>
  <text x="340" y="160" text-anchor="middle" fill="#15181d" font-size="13" font-family="sans-serif">例：三人创业股权 → 估两两单干估值 → 扫超额 → 核空则加回购/竞业/分期归属</text>
  <text x="340" y="190" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">例：成本分摊 → 先查核是否非空，再在核内选沙普利或核仁</text>
  <text x="340" y="220" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">例：议会分预算 → 简单多数常空核，需超级多数或议程规则</text>
</svg>
:::

# 从理论到行动

1. **列出玩家与所有非空联盟的 \(v(S)\)**（三人：7 个数）。
2. **提案一个效率分配**，算每个 \(S\) 的超额。
3. **若有正超额**：改分配或承认结构问题。
4. **若怎么改都有正超额**：用平衡权重证空核，转 ε-核/制度。
5. **核非空**：在核内用沙普利值或核仁做焦点选择。
6. **写入退出成本**，使有效博弈尽量平衡。

# 技能树

:::details 叶子 · 能手算三人核
给定 \(v\)，判断一点是否在核内；会举多数空核与手套单点核。【实践】
:::

:::details 枝干 · 会用 Bondareva–Shapley
构造平衡权重证空；理解凸 ⇒ 核非空；区分超可加与平衡。【分析】
:::

:::details 树干 · 空核补丁设计
ε-核、核仁、合同罚金、重复博弈折扣因子如何改变有效稳定。【分析】
:::

:::details 冠层 · 现场建模
把合资/分摊/投票压成 \(v\)，做敏感性（外部选择 ±10%）并报告核是否翻转。【实践】
:::

# 游戏化世界

你是**联盟稳定官**：每关一个特征函数。目标不是「分得大家开心」，而是**找到核内点**；若核空，用最少的 ε 或罚金「造出」非空 ε-核。评分：最小 ε、条款简洁度、对 \(v\) 扰动的稳健性。

# 任务系统

| 任务 | 产出 | 验收 |
|---|---|---|
| T1 多数博弈 | 证明核空 | 写出 \(\alpha=1/2\) 加权和 1.5>1 |
| T2 盈余博弈 | 找一个核点 | \(v_{12}=4,v_{13}=3,v_{23}=2,v_N=6\) 如 (3,2,1) |
| T3 手套 | 写出核 | 1 左 2 右、配对值 1 → 核={(1,0,0)} |
| T4 沙普利对照 | 算 φ 是否在核 | 同上盈余 φ=(2.5,2,1.5)∈核 |
| T5 最小 ε | 多数博弈 | ε\* = 1/3，核仁=(1/3,1/3,1/3) |

# 反事实模拟

四个可调模型：分配是否在核、二人联盟值抬高何时空核、手套供需、ε-核半径。

:::tabs
@@模型 A · 三人分配核检验
:::raw
<div class="tool" id="toolCoreCheck">
  <div class="ctrl">
    <label>玩家1 份额 x₁ <output id="x1_o">2.0</output></label>
    <input type="range" id="x1" min="0" max="6" step="0.1" value="2">
    <label>玩家2 份额 x₂ <output id="x2_o">2.0</output></label>
    <input type="range" id="x2" min="0" max="6" step="0.1" value="2">
    <label>玩家3 份额 x₃（自动 = 6−x₁−x₂） <output id="x3_o">2.0</output></label>
    <input type="range" id="x3disp" min="0" max="6" step="0.1" value="2" disabled>
  </div>
  <p style="font-size:12px;color:var(--ink3);margin:0 0 8px">固定盈余博弈：v({i})=0，v({1,2})=4，v({1,3})=3，v({2,3})=2，v(N)=6。拖动 x₁、x₂，x₃ 自动补足效率。</p>
  <div class="readout">
    <div class="ro">x₃<strong id="ro_x3">2.00</strong></div>
    <div class="ro">最大超额<strong id="ro_maxe">—</strong></div>
    <div class="ro">核内？<strong id="ro_incore">—</strong></div>
    <div id="core_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"></div>
  </div>
  <canvas id="coreChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型 B · 抬高两两联盟 · 空核阈值
:::raw
<div class="tool" id="toolBondareva">
  <div class="ctrl">
    <label>两两联盟值 a（对称） <output id="a_o">4.0</output></label>
    <input type="range" id="a_pair" min="0" max="8" step="0.1" value="4">
    <label>大联盟 v(N) <output id="vn_o">6.0</output></label>
    <input type="range" id="vn" min="1" max="12" step="0.1" value="6">
  </div>
  <p style="font-size:12px;color:var(--ink3);margin:0 0 8px">v({i})=0，v({i,j})=a，v(N) 可调。对称平衡权重 α=1/2 覆盖三对：加权和 = 1.5a。与 v(N) 比较判定。</p>
  <div class="readout">
    <div class="ro">1.5a<strong id="ro_bal">6.00</strong></div>
    <div class="ro">缺口 1.5a−v(N)<strong id="ro_gap">0.00</strong></div>
    <div class="ro">核<strong id="ro_empty">非空边界</strong></div>
    <div id="bal_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"></div>
  </div>
  <canvas id="balChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型 C · 手套市场
:::raw
<div class="tool" id="toolGlove">
  <div class="ctrl">
    <label>左手玩家数 L <output id="L_o">1</output></label>
    <input type="range" id="L_n" min="1" max="5" step="1" value="1">
    <label>右手玩家数 R <output id="R_o">2</output></label>
    <input type="range" id="R_n" min="1" max="5" step="1" value="2">
    <label>每对价值 <output id="pair_o">1.0</output></label>
    <input type="range" id="pair_v" min="0.5" max="5" step="0.5" value="1">
  </div>
  <p style="font-size:12px;color:var(--ink3);margin:0 0 8px">v(S)=配对价值×可配对数。稀缺侧拿走全部配对剩余；过剩侧核内份额为 0。【分析】</p>
  <div class="readout">
    <div class="ro">v(N)<strong id="ro_vnG">1.00</strong></div>
    <div class="ro">稀缺侧每人<strong id="ro_scarce">1.00</strong></div>
    <div class="ro">过剩侧每人<strong id="ro_abund">0.00</strong></div>
    <div id="glove_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"></div>
  </div>
  <canvas id="gloveChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型 D · ε-核与多数博弈
:::raw
<div class="tool" id="toolEps">
  <div class="ctrl">
    <label>ε 松弛 <output id="eps_o">0.334</output></label>
    <input type="range" id="eps" min="0" max="1" step="0.001" value="0.334">
    <label>等分时每人份额（固定 1/3） <output id="eq_o">0.333</output></label>
    <input type="range" id="eq_dummy" min="0" max="1" step="0.001" value="0.333" disabled>
  </div>
  <p style="font-size:12px;color:var(--ink3);margin:0 0 8px">三人多数：v({i})=0，v(二人)=1，v(N)=1。ε-核要求 x(S)≥v(S)−ε。等分进入 ε-核的最小 ε 为 ε*=1/3≈0.333；滑块默认 0.334（step=0.001 能精确表示的略上界）。【事实】</p>
  <div class="readout">
    <div class="ro">二人门槛 1−ε<strong id="ro_pairNeed">0.666</strong></div>
    <div class="ro">ε-核含等分？<strong id="ro_epsOk">是</strong></div>
    <div class="ro">ε*<strong id="ro_epsStar">0.333</strong></div>
    <div id="eps_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"></div>
  </div>
  <canvas id="epsChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 标志性产出 |
|---|---|---|
| L1 识核 | 定义 + 三人手检 | 一张超额表 |
| L2 判空 | Bondareva 手算 | 空核证明一段 |
| L3 选型 | 核内选点 / ε-核 | 分账方案 + 理由 |
| L4 造核 | 合同与结构改造 | 条款使有效博弈平衡 |

# 30分钟最小实践

选一个真实三人协作（项目分红、合租押金分配、小组奖金）。

1. 写下每人单干、两两、三人的「可创造价值」（主观估即可，标【假设】）。
2. 提案一种分法，填超额表（7 行）。
3. 若有正超额：改一版分配；若仍空，计算对称情形下 \(1.5a\) 与 \(v(N)\)。
4. 产出：一页纸「核检报告」+ 一条制度补丁（罚金或分期）。

验收：别人能按你的表复算最大超额。

# 7天计划

| 天 | 焦点 | 交付 |
|---|---|---|
| D1 | 定义与超额 | 手算多数空核 |
| D2 | 盈余核点 | 找到 ≥2 个核顶点 |
| D3 | 手套 | 改变 L/R 看核如何跳 |
| D4 | 沙普利 vs 核 | 同一 \(v\) 对照 |
| D5 | Bondareva | 对称 a 扫阈值 |
| D6 | ε-核 / 核仁 | 多数 ε*=1/3 |
| D7 | 真实案例 | 30 分钟实践落盘 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 基础例子 | 5 个经典博弈核状态卡片 |
| W2 | 判定定理 | 独立证明 2 个空核 + 2 个非空 |
| W3 | 补丁工具箱 | ε、罚金、重复博弈折扣各一则 |
| W4 | 现场项目 | 一份合资/分摊核分析备忘录 |

# 10 个核心模型

1. **核定义**：效率 + 联盟理性。
2. **超额**：\(e(S,x)=v(S)-x(S)\)。
3. **Bondareva–Shapley**：平衡 ⇔ 核非空。
4. **三人多数空核**：\(1.5>1\)。
5. **手套/鞋市场**：稀缺侧独占。
6. **凸博弈**：核非空且含沙普利值。
7. **ε-核 / least-core**：最小松弛。
8. **核仁**：字典序最小化超额向量。
9. **Debreu–Scarf 直觉**：复制经济核收缩。
10. **有效博弈**：罚金改变 \(v\) 以造核。

# 关键问题清单

:::details Q1 核和纳什均衡什么关系？
核是合作（联盟）稳定；纳什是非合作（单人偏离）。同一情境可同时用两者，但对象不同。【分析】
:::

:::details Q2 为什么奇数简单多数常空核？
任意过半联盟要走全部剩余，对称过半联盟的加权需求超过 \(v(N)\)。【事实】
:::

:::details Q3 超可加但空核，大联盟还会形成吗？
可能短期形成，但不存在稳定分法；需制度或改 \(v\)。【分析】
:::

:::details Q4 核很大时选哪个点？
焦点：沙普利值（若在核内）、核仁、谈判力、现状点。【分析】
:::

:::details Q5 NTU 呢？
Scarf：平衡 ⇒ 核非空（充分不必需）；侧支付受限时更易空核。【事实】
:::

:::details Q6 计算复杂度？
一般核成员检验与相关问题随联盟数指数增长；小 \(n\) 用 LP，大 \(n\) 需结构。【待验证】
:::

:::details Q7 空核时沙普利值还有用吗？
有——作公平基准与归因；但不能替代稳定性补丁。【分析】
:::

:::details Q8 如何快速怀疑空核？
多个高价值、高度重叠的联盟，其「分数覆盖」加权和明显大于 \(v(N)\)。【推论】
:::

:::details Q9 核仁一定公平吗？
核仁最小化最不满联盟，是稳定取向的单点解，不必满足沙普利公理。【分析】
:::

:::details Q10 现实里侧支付不合法怎么办？
按 NTU 或加可行转移约束；可能需非货币补偿（股权归属节奏、决策权）。【分析】
:::

# 下一阶段探索

- 精读 Bondareva (1963) / Shapley (1967) 与 Kannai 综述章。【事实】
- 对照本引擎《沙普利值》手册：同一 \(v\) 上画核与 \(\phi\)。
- 延伸：kernel、bargaining set、稳定匹配中的核、网络博弈的核。
- 计算：小规模用线性规划求核顶点；核仁用序贯 LP。

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 核的定义 | 经典文献 | Gillies 1953；教材标准定义 | 【事实】 |
| Bondareva–Shapley | 原始定理 | Bondareva 1963；Shapley 1967 Naval Res. Logist. | 【事实】 |
| 三人多数空核 | 标准例子 | Serrano 讲义；IISc / 多校讲义 | 【事实】 |
| 手套/鞋市场核 | 教科书例子 | Wikipedia Core (game theory)；匹配市场 | 【事实】 |
| Scarf NTU | 定理 | Scarf 1967 | 【事实】 |
| 核仁性质 | 文献 | Schmeidler 1969；后续综述 | 【事实】 |
| 空核≠不能合作 | 解释 | 产业组织/合同理论常用补丁 | 【分析】 |
| 交互模型数值 | 自洽推算 | 本手册 node 验算 | 【推论】 |
| 大 n 复杂度 | 计算博弈论 | 多类游戏 NP-hard 结果 | 【待验证】 |

标记约定：【事实】多方一致或原始定理；【分析】权威解释性判断；【推论】由定义推出；【假设】未验证；【待验证】单一来源或前沿计算结论。

# 免责声明 {.appendix}

本手册是**决策与分析框架**，不是法律意见、投资建议或任何合资/分摊方案的保证。特征函数 \(v(S)\) 在现实中常含主观估计与制度摩擦；核非空不保证谈判成功，空核也不禁止一切合作。涉及股权、劳动合同、反垄断与侧支付合法性时，请咨询合格专业人士。作者与平台不对依据本手册做出的决策承担责任。
