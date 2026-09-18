---
slug: 层级推理（k-level thinking）：多数人只推理 1–2 层，深一层即有优势
title: 层级推理（k-level thinking）：多数人只推理 1–2 层，深一层即有优势
subtitle: 多数人停在 L1–L2；在一次性策略互动里，<strong>相对深一层</strong>常常比「无限理性」更赚——但过深也会输掉。
brand_sub: Level-k × Cognitive Hierarchy
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, level-k, 认知层级, Nagel, Camerer, 有限理性, 选美博弈, 策略思维]
theme_js_file: 层级推理（k-level thinking）：多数人只推理 1–2 层，深一层即有优势.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**层级推理（level-k / k-level thinking）**：把「我以为别人怎么想」拆成有限层——L0 不策略化（常取均匀/显著锚），Lk 假设别人最多做到 L(k−1) 并对其最优回应。实验里大多数人落在 **1–2 层**；纳什要求的无限迭代很少在第一轮出现。【事实】（Nagel, *AER* 1995；Stahl & Wilson, 1994/95）

**认知层级（Cognitive Hierarchy, CH）** 更精细：Lk 不只盯「全是 L(k−1)」，而是按 Poisson 分布对 0…k−1 的混合最优回应；跨大量实验，平均思考步数 \(\tau\) 的中位数约 **1.65**，常用全能猜测 \(\tau\approx 1.5\)。【事实】（Camerer, Ho & Chong, *QJE* 2004）

> 优势不在「想得无限深」，而在：**比对手群体的众数再深约一层，且别深过开奖带。**

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的是：**有限策略深度如何系统偏离纳什均衡，以及相对深度如何决定一次性博弈中的胜负**——不是教你「永远多想一层就赢」。

边界：

- **在界内**：level-k、CH、迭代最优回应 vs 迭代剔除劣势、猜数/选美、11–20 游戏、拍卖中的 level-k 争论、与共同知识/高阶信念的关系。
- **在界外**：某只股票买卖点、具体谈判话术——除非压成「估计对方 k 分布 → 选自己的相对深度」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 有限层策略推理如何塑造行为与相对优势 |
| 2 | 边界在哪 | 到「深度分布 + 最优回应规则」可形式化为止 |
| 3 | 核心对象 | L0 锚、\(k\)、\(p\)、\(\tau\)、IBR vs ID、相对深度 |
| 4 | 参与者 | L0–Lk 类型、纳什型、实验受试、交易员/谈判者 |
| 5 | 关键变量 | 深度 \(k\)、群体深度分布、支付对深度的敏感度 |
| 6 | 可直接观察 | 选择分布、尖峰（33/22）、均值、重复局收敛路径 |
| 7 | 无法直接观察 | 真实内在 \(k\)、信念是否「我比别人深一层」 |
| 8 | 谁影响谁 | L0 锚 → 整条 Lk 塔；\(\tau\) → 预测均值；相对 k → 谁赢 |
| 9 | 因果关系 | 更深 → 更靠近均衡；**相对**更深 → 更靠近当期目标 |
| 10 | 只是相关 | 「教育程度高」≠ 自动更高 k【分析】 |
| 11 | 表层现象 | 猜数扎堆 22/33、谈判里「我以为你以为」、题材炒作深度竞赛 |
| 12 | 底层机制 | 工作记忆约束 + 「我最深」信念 + 最优回应递推 |
| 13 | 有反馈吗 | 有。重复博弈中观测更新有效深度，趋向均衡 |
| 14 | 有延迟吗 | 有。第一轮靠先验深度；学习要若干期 |
| 15 | 正/负反馈 | 深度军备竞赛可自我挫败；公开反馈负向拉回均衡 |

## 最关键的一句话

> level-k 的锋利处：**纳什描述的是「无限互相正确」的固定点；level-k 描述的是「有限层、且自认最深」的递推路径——后者才解释第一轮数据。**

# 为什么值得研究

:::cards g3
### 它解释「明明知道均衡却不报」
p-猜数纳什是 0，但第一轮尖峰在 L1≈33.3、L2≈22.2；报纸实验均值约 19，离 0 很远。【事实】（Nagel 1995；Thaler FT 1997 均值 18.91）

### 它把「聪明」变成可操作相对量
优势来自相对深度，不是绝对智商。群体若停在 L1，L2 常赢；若群体已是 L2–L3，再冲 L6 可能输掉。【推论】

### 它有清晰的失败边界
拍卖等环境中，校准到 1–3 层的 level-k 可能系统性失准；不能当万能有限理性插件。【分析】（Itzhak & Rasooly, *JPE* 2023「Going…Going…Wrong」）
:::

:::note amber 最贵的一次误判
把自己的「多想两层」当成绝对优势——若对手分布已更深，或环境根本不是 IBR 结构，你会输给浅层众数或完全不同的机制。【推论】
:::

# 世界地图

九层看层级推理如何从实验分类长成决策操作系统。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="lkArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度与反馈 · 重复局、披露、学习方向理论</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 应用边界 · 猜数/协调强，拍卖等处可翻车</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 现场决策 · 估对方众数 k，选相对 +1</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 认知层级 CH · Poisson τ，混合低层而非只盯 k−1</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 相对深度 · 谁更接近 p×群体均值谁赢</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 level-k 塔 · Lk = p^k · L0（IBR）</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 诊断游戏 · p-猜数、11–20、选美隐喻</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 有限理性前提 · 工作记忆限制迭代步数</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 问题意识 · 「别人会怎么想我怎么想」</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L3→L5**：会算塔、会比误差。进阶卡在 **L6–L8**：CH 参数化 + 知道哪里不能硬套。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="160" y="16" width="360" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">有限层最优回应（非无限共同知识理性）</text>

  <rect x="30" y="100" width="190" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="125" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">L0 锚</text><text x="125" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">均匀/显著点（常=50）</text>
  <rect x="245" y="100" width="190" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">level-k / IBR</text><text x="340" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Lk 盯全是 L(k−1)</text>
  <rect x="460" y="100" width="190" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="555" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">CH / Poisson τ</text><text x="555" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">混合 0…k−1</text>

  <line x1="280" y1="60" x2="125" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="555" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="80" y="200" width="220" height="52" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="190" y="222" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">相对深度优势</text><text x="190" y="240" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">比众数 +1 常更近目标</text>
  <rect x="380" y="200" width="220" height="52" rx="8" fill="#f3e8ff" stroke="#7c3aed"/><text x="490" y="222" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">过深陷阱</text><text x="490" y="240" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">冲向 0 / 均衡可能输掉</text>

  <line x1="340" y1="152" x2="190" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <line x1="340" y1="152" x2="490" y2="200" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>

  <text x="340" y="300" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">抽象：有限迭代 → 机制：IBR/CH 塔 → 操作：估众数 k、选相对深度</text>
  <text x="340" y="330" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实线=定义展开；红虚线=反馈到胜负</text>
</svg>
:::

# 核心参与者

| 角色 | 在层级系统中的位置 | 典型动作 |
|---|---|---|
| L0 | 非策略化 / 显著锚 | 报 50、跟标题、跟默认选项 |
| L1 | 对 L0 最优回应 | 猜数报 ≈33；「别人会跟风」 |
| L2–L3 | 实验众数带 | 报 ≈22 / ≈15；多数报纸实验尖峰区 |
| 深迭代者 / 「纳什型」 | 逼近均衡 | 易过度聪明，第一轮输掉 |
| 实验者 / 设计者 | 设定 p、反馈、重复 | 改变有效深度分布 |
| 对手群体 | 你的真实「环境分布」 | 决定 +1 是否仍是优势 |

# 核心变量

| 变量 | 含义 | 杠杆感 |
|---|---|---|
| \(L_0\) | 非策略锚（猜数常取 50） | 整座塔的起点 |
| \(p\) | 目标 = 均值 × \(p\) | \(p\) 越小，同层数值越低、塔越「陡」 |
| \(k\) | 你的推理层数 | 绝对深度；胜负看相对 |
| \(\tau\) | CH 的平均思考步数 | \(\tau\uparrow\) → 预测均值下移、更近均衡 |
| 群体深度分布 | 各 Lk 占比 | 决定开奖带落在哪一层附近 |
| 重复次数 / 反馈 | 学习强度 | 第一轮靠先验；多轮趋向均衡 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="90" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">L0 锚 + 支付规则</text>
  <rect x="200" y="30" width="140" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="270" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">有限层 IBR/CH</text>
  <rect x="380" y="30" width="140" height="44" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="450" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">选择分布尖峰</text>
  <rect x="520" y="30" width="140" height="44" rx="8" fill="#15181d"/><text x="590" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#fff" font-family="sans-serif">相对深度定胜负</text>

  <line x1="160" y1="52" x2="198" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="340" y1="52" x2="378" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="520" y1="52" x2="555" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="100" y="130" width="160" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="180" y="157" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">公开反馈 / 重复</text>
  <rect x="320" y="130" width="160" height="44" rx="8" fill="#f3e8ff" stroke="#7c3aed"/><text x="400" y="157" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">有效深度上移</text>
  <rect x="500" y="130" width="160" height="44" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="580" y="157" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">向均衡收敛</text>

  <line x1="260" y1="152" x2="318" y2="152" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="480" y1="152" x2="498" y2="152" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <path d="M590,74 C620,100 620,110 580,130" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <text x="340" y="230" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实线：因果链；红虚线：结果分布→被观察→下一期信念更新</text>
  <text x="340" y="260" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">Nagel：多轮靠近均衡，但不等于每人稳步「多想一层」</text>
</svg>
:::

# 隐藏关系

- **IBR ≠ 迭代剔除劣势（ID）**：猜数里两者路径不同；数据更贴 IBR（从 50 起步的最优回应），而非从 100 往下剔。【事实】（Nagel 1995；Ho, Camerer & Weigelt 等）
- **「我比别人深一层」是模型内置信念**：Lk 默认别人 ≤k−1；这解释异质性，也解释为何很少人直接到均衡。【分析】
- **CH 比纯 level-k 更「谦虚」**：同层玩家承认存在多种更浅类型，选择往往不如纯 Lk 极端。【事实】（Camerer et al. 2004）
- **深度竞赛可自我挫败**：人人多想一层，均值下移，原最优深度失效——像军备竞赛。【推论】
- **跨域同构**：猜数 level-k ↔ 扑克「层级思维」↔ 广告「消费者以为别人喜欢什么」↔ 标准战「别人会押哪套」↔ 共同知识有限阶。【分析】
- **拍卖不是自动推广场**：有理论用 level-k 解释赢家诅咒，也有实验强烈拒绝校准后的 level-k。【分析】（Crawford & Iriberri 2007 vs Itzhak & Rasooly 2023）

# 系统运行机制

1. **设定锚与规则**：L0 如何选、支付如何依赖他人行动。  
2. **分层递推**：每人停在某 \(k\)，按 IBR 或 CH 规则选行动。  
3. **聚合出目标**：如 \(p\times\) 均值；相对误差决定胜负。  
4. **（可选）反馈**：公布均值/赢家 → 更新对他人深度的信念。  
5. **重复**：有效深度分布漂移，常向均衡靠拢，但不保证每人 \(k\) 单调上升。【事实】（Nagel 1995）

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">t=0 先验</text><text x="80" y="92" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">L1/L2 尖峰</text>
  <rect x="190" y="40" width="120" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="250" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">t=1 反馈</text><text x="250" y="92" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">看见均值</text>
  <rect x="360" y="40" width="120" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="420" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">t=2–3 漂移</text><text x="420" y="92" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">向均衡靠</text>
  <rect x="530" y="40" width="130" height="70" rx="8" fill="#15181d"/><text x="595" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#fff" font-family="sans-serif">稳态附近</text><text x="595" y="92" text-anchor="middle" font-size="11" fill="#cbd5e1" font-family="sans-serif">或新冲击重置</text>
  <line x1="140" y1="75" x2="188" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="310" y1="75" x2="358" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="480" y1="75" x2="528" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <text x="340" y="160" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">一次性决策吃「先验深度分布」；多轮决策吃「反馈后的有效深度」</text>
  <text x="340" y="190" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">换人群 / 换规则 ≈ 重置到 t=0</text>
</svg>
:::

# 利益与激励

| 角色 | 想要什么 | 如何利用层级 |
|---|---|---|
| 一次性参赛者 | 靠近当期目标 | 估众数 k，取相对 +1 |
| 「炫技深思者」 | 展示理性 | 易报过深，输掉奖金 |
| 平台/实验者 | 测深度或娱乐 | 设 p、奖品、是否给例子 |
| 市场庄家/知情者 | 吃浅层误定价 | 骑 L0–L1 情绪（选美场景）【分析】 |
| 组织协调者 | 对齐行动 | 用公共反馈抬高有效共同深度 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="30" width="140" height="60" rx="8" fill="#15181d"/><text x="100" y="65" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">私人直觉/锚</text>
  <rect x="270" y="30" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="65" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">对他人深度的信念</text>
  <rect x="510" y="30" width="140" height="60" rx="8" fill="#1d4ed8"/><text x="580" y="65" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">公开均值/赢家</text>

  <rect x="150" y="150" width="160" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="230" y="185" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">行动选择 Lk</text>
  <rect x="370" y="150" width="160" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="450" y="185" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">聚合目标/开奖</text>

  <line x1="170" y1="60" x2="270" y2="60" stroke="#7c848f" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="410" y1="60" x2="510" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="100" y1="90" x2="200" y2="150" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="340" y1="90" x2="230" y2="150" stroke="#b8730a" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="580" y1="90" x2="480" y2="150" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <line x1="310" y1="180" x2="370" y2="180" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <text x="340" y="245" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">信息流「抽水」：公开反馈把分散的深度信念压成下一期共同锚</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

1. **先估对方众数层，再选相对 +1** — 比盲目加深更稳  
2. **识别 L0 锚** — 锚错了，整座塔歪  
3. **分清一次性 vs 重复** — 重复局优先吃反馈，不炫技  
4. **用 CH 的 \(\tau\approx 1.5\) 做默认先验** — 无数据时的全能猜测【分析】  
5. **检查支付是否真是「猜平均意见」结构** — 否则 level-k 可能不适用  
6. **避免深度军备竞赛** — 人人加深时改估分布，勿死守旧 k  
7. **用小样本尖峰诊断** — 33/22 类尖峰是 IBR 指纹  
8. **设计公开反馈** — 组织里抬高有效共同深度  
9. **知道拍卖等失败域** — 换模型（QRE、cursed beliefs 等）【分析】  
10. **写清「我假设别人停在哪」** — 把隐性信念显性化，可复盘  

# 常见认知陷阱

:::details 陷阱 1 · 把纳什当第一轮预测
均衡是固定点，不是多数人第一轮落点。【事实】
:::

:::details 陷阱 2 · 「我想得越深越聪明」
过深可远离开奖带；相对深度才重要。【推论】
:::

:::details 陷阱 3 · 假设别人和你一样深
Lk 的标准假设恰恰相反：别人更浅。若人人同深，模型要改成对称信念。【分析】
:::

:::details 陷阱 4 · 混淆 IBR 与迭代剔除
从 50 最优回应 ≠ 从 100 剔劣势；预测尖峰位置不同。【事实】
:::

:::details 陷阱 5 · 把实验室 τ 直接搬到任意现场
τ 因游戏、被试池而异；中位数 ~1.65 是跨样本汇总，不是你这场的真理。【待验证】（应用时需重估）
:::

:::details 陷阱 6 · 用 level-k 解释一切偏离均衡
拍卖实验显示校准 level-k 可系统性失败。【分析】（JPE 2023）
:::

:::details 陷阱 7 · 忽视例子与框架效应
FT 给例子会压低 >50 的占比；指令改变 L0。【事实】（Bosch-Domènech et al.）
:::

:::details 陷阱 8 · 把「理论家更低均值」当成你该报 0
理论家群体 Level-Max 比例更高，但你的对手若不是理论家，跟他们报 0 会输。【推论】
:::

:::details 陷阱 9 · 重复局仍按第一轮先验打
反馈已经移动目标；坚持旧 k 是懒惰，不是稳健。【分析】
:::

:::details 陷阱 10 · 把选美隐喻当成反透明借口
层级推理解释行为，不自动支持「少披露」；披露效应要单独建模。【分析】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象 | 现实对照 |
|---|---|
| L0 锚 | 「大家会从中位数/整数好看数起」 |
| L1 | 「别人会跟热搜/默认选项」 |
| L2 | 「别人会猜别人跟热搜」 |
| 相对 +1 | 谈判/竞标里比对手群体深一层报价 |
| 过深 | 报基本面真理，但短期价格由浅层意见决定 |
| 公开反馈 | 公布上期均价、中标价、投票分布 |

# 从理论到行动

:::cards g3
### 决策前
写下：对方最可能停在哪一层？证据是什么？【推论】

### 决策中
选「众数 +1」的行动；同时设止损——若反馈显示更深，立刻上调。【推论】

### 决策后
对照实际开奖带，更新你的 τ / 众数估计，不更新自尊心。【推论】
:::

# 技能树

:::details ① 基础：会算 p-猜数塔
给定 \(p,L_0\)，口算 L1–L3，并指出纳什。【实践】
:::

:::details ② 中级：估相对深度
给一个混合分布，算出目标并比较各 k 的误差。【实践】
:::

:::details ③ 高级：IBR vs CH
解释为何同 τ 下 CH 选择不如纯 Lk 极端。【分析】
:::

:::details ④ 专家：适用域判断
能说明何时换 QRE / 学习模型 / 均衡模型。【分析】
:::

# 游戏化世界

你进入「深度竞技场」：每名选手自带一个头盔层数灯。灯太暗，你被浅层浪潮吞没；灯太亮，你独自冲向虚空均衡，奖金落在身后的人群带里。裁判偶尔公开上期均值——灯会集体闪烁上移。你的任务不是点亮最多灯，而是**亮得刚刚好比人群众数多一格**。

# 任务系统

| 任务 | 验收 |
|---|---|
| 口算塔 | \(p=2/3,L_0=50\) → L1/L2/L3 数正确 |
| 诊断一场会议 | 标出至少一处 L0/L1/L2 发言 |
| 估对手众数 | 写下一句可证伪的「众数=Lk」假设 |
| 复盘一次输掉的「过深」 | 说明当时目标带在哪一层 |

# 反事实模拟

若人人无限理性且此为共同知识 → 猜数报 0；真实报纸实验均值 ~19，说明共同知识理性在第一轮不成立。【事实】

若你的对手全是理论家（高 Level-Max 占比）→ 「+1 相对浅层」策略失效，应更靠近均衡。【分析】（Bosch-Domènech 等对理论家样本的分解）

若环境是某些拍卖结构 → 即使用 level-k 拟合也需不合理的超高层，模型解释力崩溃，应换工具。【分析】（Itzhak & Rasooly 2023）

## 可调模型 1 · level-k 猜数塔

\(L_k = L_0 \cdot p^k\)。默认 \(p=0.67\)（≈2/3），\(L_0=50\)，你的层数 \(k=2\) → **22.45**（L1=33.50，L2=22.45；无限层 → 0）。

:::raw
<div class="tool" id="tool_lk">
  <div class="ctrl">
    <label>p（目标=均值×p） <output id="lk_pO">0.67</output></label>
    <input type="range" id="lk_p" min="0.30" max="0.95" step="0.01" value="0.67"/>
    <label>L0 锚 <output id="lk_l0O">50</output></label>
    <input type="range" id="lk_l0" min="10" max="100" step="1" value="50"/>
    <label>你的层数 k <output id="lk_kO">2</output></label>
    <input type="range" id="lk_k" min="0" max="8" step="1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">你的数 L<sub>k</sub><strong id="lk_you">22.45</strong></div>
    <div class="ro">L1<strong id="lk_l1">33.50</strong></div>
    <div class="ro">L2<strong id="lk_l2">22.45</strong></div>
    <div class="ro">纳什（无限）<strong id="lk_nash">0.00</strong></div>
    <div id="lk_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="lk_vh">p=0.67，L2=22.45（L1=33.50，L2=22.45）；无限层 → 0.00。第一轮开奖带常在 L1–L3。</span></div>
  </div>
  <canvas id="lkChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 群体混合：谁更接近开奖带

设定 L0–L3 占比（自动归一），目标 = \(p\times\) 群体均值。比较你选的层数与目标的绝对误差——**误差最小者赢**。

默认占比 20%/35%/30%/15%，\(p=0.67\) → 均值≈30.71，目标≈**20.58**；此时 **L2 误差≈1.87 最小**（印证「比众数深一层」）。

:::raw
<div class="tool" id="tool_mix">
  <div class="ctrl">
    <label>L0 占比% <output id="mix_w0O">20</output></label>
    <input type="range" id="mix_w0" min="0" max="80" step="1" value="20"/>
    <label>L1 占比% <output id="mix_w1O">35</output></label>
    <input type="range" id="mix_w1" min="0" max="80" step="1" value="35"/>
    <label>L2 占比% <output id="mix_w2O">30</output></label>
    <input type="range" id="mix_w2" min="0" max="80" step="1" value="30"/>
    <label>L3 占比% <output id="mix_w3O">15</output></label>
    <input type="range" id="mix_w3" min="0" max="80" step="1" value="15"/>
    <label>你的层数 <output id="mix_kO">2</output></label>
    <input type="range" id="mix_k" min="0" max="5" step="1" value="2"/>
    <label>p <output id="mix_pO">0.67</output></label>
    <input type="range" id="mix_p" min="0.40" max="0.90" step="0.01" value="0.67"/>
  </div>
  <div class="readout">
    <div class="ro">群体均值<strong id="mix_mean">30.71</strong></div>
    <div class="ro">目标 p×均值<strong id="mix_tgt">20.58</strong></div>
    <div class="ro">你的数<strong id="mix_you">22.45</strong></div>
    <div class="ro">|误差|<strong id="mix_err">1.87</strong></div>
    <div id="mix_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="mix_vh">归一后目标≈20.58；你 L2=22.45，|误差|=1.87。在默认混合下 L2 最优。</span></div>
  </div>
  <canvas id="mixChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 认知层级 Poisson τ

\(f(k)=e^{-\tau}\tau^k/k!\)。Step-k 对归一化后的 0…k−1 混合做最优回应（猜数：乘 \(p\)）。默认 \(\tau=1.5\) → P(0…3)≈**22.3% / 33.5% / 25.1% / 12.6%**，截断至 k≤6 的预测群体均值约 **33.66**（p=0.67）。

:::raw
<div class="tool" id="tool_ch">
  <div class="ctrl">
    <label>平均步数 τ <output id="ch_tauO">1.50</output></label>
    <input type="range" id="ch_tau" min="0.3" max="4.0" step="0.05" value="1.50"/>
    <label>p <output id="ch_pO">0.67</output></label>
    <input type="range" id="ch_p" min="0.40" max="0.90" step="0.01" value="0.67"/>
    <label>L0 锚 <output id="ch_l0O">50</output></label>
    <input type="range" id="ch_l0" min="20" max="80" step="1" value="50"/>
  </div>
  <div class="readout">
    <div class="ro">P(k=0)<strong id="ch_p0">22.3%</strong></div>
    <div class="ro">P(k=1)<strong id="ch_p1">33.5%</strong></div>
    <div class="ro">P(k=2)<strong id="ch_p2">25.1%</strong></div>
    <div class="ro">CH 预测均值<strong id="ch_mean">33.66</strong></div>
    <div id="ch_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ch_vh">τ=1.50：多数质量在 0–2 步；CH 均值≈33.66（纯 L2=22.45 更极端）。</span></div>
  </div>
  <canvas id="chChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 「+1 层」优势扫描

固定群体为「众数层 = m」的简化：占比集中在 Lm（可混一点 L0）。比较你选 \(m\)、\(m+1\)、\(m+2\) 对目标的误差——看 **+1 是否真的最小误差**。

默认众数 m=1，L0 噪声 15%，其余在 Lm → 目标≈**24.10**；选 m+1 误差≈**1.66** 最小（+1 常胜）。

:::raw
<div class="tool" id="tool_adv">
  <div class="ctrl">
    <label>众数层 m <output id="adv_mO">1</output></label>
    <input type="range" id="adv_m" min="0" max="3" step="1" value="1"/>
    <label>L0 噪声占比% <output id="adv_nO">15</output></label>
    <input type="range" id="adv_n" min="0" max="40" step="1" value="15"/>
    <label>p <output id="adv_pO">0.67</output></label>
    <input type="range" id="adv_p" min="0.40" max="0.90" step="0.01" value="0.67"/>
    <label>L0 锚 <output id="adv_l0O">50</output></label>
    <input type="range" id="adv_l0" min="20" max="80" step="1" value="50"/>
  </div>
  <div class="readout">
    <div class="ro">目标<strong id="adv_tgt">24.10</strong></div>
    <div class="ro">|err| 选 m<strong id="adv_e0">9.40</strong></div>
    <div class="ro">|err| 选 m+1<strong id="adv_e1">1.66</strong></div>
    <div class="ro">|err| 选 m+2<strong id="adv_e2">9.07</strong></div>
    <div id="adv_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="adv_vh">众数 m=1 时，目标≈24.10；选 m+1 误差≈1.66 最小——「深一层」成立；若噪声或 m 变化，最优相对深度会变。</span></div>
  </div>
  <canvas id="advChart" height="214"></canvas>
</div>
:::

:::tabs
@@第一轮猜数
用模型 1+2：先算塔，再按你对人群的混合猜测选相对深度；别直接报 0。

@@重复多轮
公开均值后，把「众数 m」上调或改用学习规则；坚持第一轮 k 会落后。

@@换到拍卖
先问：支付结构是否支持 IBR 指纹？若否，不要硬套 level-k 讲故事。
:::

# 四级能力路线

| 级别 | 能力 |
|---|---|
| L1 | 口算 L0–L3 塔并指出纳什 |
| L2 | 估对手众数并选相对 +1 |
| L3 | 用 CH/τ 做先验，区分 IBR 与 ID |
| L4 | 判断适用域，失败时换模型 |

# 30分钟最小实践

1. 找一个「猜别人会怎么选」的真实场景（会议投票、团购选项、竞标心理价）。
2. 写下 L0 锚、你猜的众数层 m、你的行动（是否 m+1）。
3. 事后只记一件事：开奖带更靠近哪一层。
4. 更新便签上的 m——不更新「我很聪明」叙事。

成本≈0，产出=一张「相对深度」复盘卡。

# 7天计划

| 日 | 动作 |
|---|---|
| D1 | 默写 \(p=2/3\) 塔 L0–L4 |
| D2 | 读 Nagel 1995 摘要：IBR vs 均衡 |
| D3 | 用模型 2 调三种混合，找谁赢 |
| D4 | 估一次真实决策的对方 m |
| D5 | 对比 CH τ=1.0/1.5/2.0 均值 |
| D6 | 找一个「过深输掉」的案例 |
| D7 | 写 5 条个人「适用/不适用」清单 |

# 30天计划

周1：塔与尖峰直觉；周2：相对深度实战（工作/消费决策）；周3：CH 与学习（重复互动）；周4：边界案例（拍卖/谈判）与模型切换规则。

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **level-k（Stahl–Wilson / Nagel）**：Lk 对 L(k−1) 最优回应。【事实】
2. **p-猜数 / 选美实验**：\(L_k=p^k L_0\)，纳什 0（p\<1）。【事实】
3. **迭代最优回应 IBR**：从显著锚起步的有限递推。【事实】
4. **迭代剔除劣势 ID**：另一条通往均衡的路径，数据拟合较差。【事实】
5. **认知层级 CH**：Poisson \(\tau\) + 混合低层。【事实】
6. **相对深度优势**：误差最小化常落在众数 +1。【推论】
7. **学习方向 / 重复局收敛**：反馈移动有效深度。【分析】
8. **高阶信念 / 共同知识有限阶**：level-k 是可操作截断。【分析】
9. **level-k 拍卖理论**：可解释部分偏离，但非万能。【分析】
10. **模型失败检验**：超高拟合 k、口头协议不符 → 弃用。【分析】

# 关键问题清单

:::details Q1 这是一次性还是重复？
一次性吃先验；重复吃反馈。
:::

:::details Q2 L0 锚是什么？
中位数、整数、默认选项、媒体显著点？
:::

:::details Q3 对方众数大概在哪一层？
有尖峰证据还是纯猜测？
:::

:::details Q4 我是否在炫技过深？
若行动接近均衡但对手很浅，准备好输掉。
:::

:::details Q5 支付是否「猜平均意见」同构？
否则 level-k 故事可能是修辞。
:::

:::details Q6 该用纯 Lk 还是 CH？
需要混合低层时用 CH；教学演示用纯塔更清晰。
:::

:::details Q7 τ 我有数据吗？
无数据先用 1.5，有数据重估。【分析】
:::

:::details Q8 指令/例子有没有扭曲 L0？
框架效应会改变整座塔。
:::

:::details Q9 这是不是已知失败域（如某些拍卖）？
是则换工具，勿硬拗。
:::

:::details Q10 下一步最小复盘是什么？
30 分钟实践里的相对深度卡。
:::

# 下一阶段探索

- 与《选美博弈》手册交叉：市场短视 β、公共信号超配
- 与《共同知识》手册交叉：有限阶 vs 无限 CK
- Quantal Response（QRE）与 level-k 的混合
- 现场估 τ 的简易实验设计（课堂/团队小游戏）

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 猜数实验与 level 尖峰 | 经典实验 | Nagel, *Unraveling in Guessing Games*, AER 1995 | 【事实】 |
| 早期 level-k 结构 | 经典实验 | Stahl & Wilson, 1994/1995 | 【事实】 |
| 认知层级 Poisson τ | 经典理论+估计 | Camerer, Ho & Chong, *QJE* 2004；τ 中位≈1.65，全能≈1.5 | 【事实】 |
| 报纸/FT 猜数 | 大规模实验 | Thaler FT 1997 均值 18.91、赢家约 13；后续均值 17.3 | 【事实】 |
| 报纸与实验室统合 | 统计综合 | Bosch-Domènech et al., *AER*（One, Two, Three, Infinity…） | 【事实】 |
| level-k 拍卖理论 | 理论 | Crawford & Iriberri, *Econometrica* 2007 | 【分析】 |
| level-k 拍卖实验拒绝 | 实验批评 | Itzhak & Rasooly, *JPE* 2023 *Going…Going…Wrong* | 【分析】 |
| 本手册混合示例误差 | 教学推演 | 默认 20/35/30/15、p=0.67 混合下 L2 误差最小 | 【推论】 |

标记约定：【事实】多方一致或原始定义；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或转载链长。

# 免责声明 {.appendix}

本手册是认知与决策框架，不是投资建议、谈判承诺或竞赛必胜公式。实验数字来自公开论文与转述，应用现场前请核对原文与你的对手分布。可调模型为教学简化（尤其群体混合与「众数+噪声」），不能替代正式估计。你需对据此采取的行动自行负责。
