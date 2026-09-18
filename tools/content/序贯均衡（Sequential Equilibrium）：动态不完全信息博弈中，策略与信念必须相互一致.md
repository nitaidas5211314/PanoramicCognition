---
slug: 序贯均衡（Sequential Equilibrium）：动态不完全信息博弈中，策略与信念必须相互一致
title: 序贯均衡（Sequential Equilibrium）
subtitle: 动态不完全信息里，<strong>策略与信念必须相互一致</strong>——路径上贝叶斯更新，离径信念是「完全混合扰动」的极限；每个信息集上给定信念仍要序贯理性。
brand_sub: Sequential Equilibrium × Belief Consistency
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 序贯均衡, Kreps, Wilson, 信念一致性, PBE, 不完全信息]
theme_js_file: 序贯均衡（Sequential Equilibrium）：动态不完全信息博弈中，策略与信念必须相互一致.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**序贯均衡（Sequential Equilibrium, SE）**：扩展型博弈上的一个**评估（assessment）**——行为策略剖面 \(\pi\) 与信念系统 \(\mu\)——同时满足：【事实】

1. **序贯理性（sequential rationality）**：在每一个信息集上，给定 \(\mu\) 与对手后续策略，自己的续贯策略最大化期望支付。
2. **一致性（consistency）**：\((\mu,\pi)\) 是某列**完全混合**策略 \(\pi^k\to\pi\) 及其贝叶斯信念 \(\mu^k\) 的极限。

直觉：均衡不仅要「路径上对」，还要回答「若出现零概率事件，你会怎么想、怎么做」——且离径信念不能任意编造，必须能被「越来越小的失误」合理化。【分析】

Kreps & Wilson（1982, *Econometrica* 50(4):863–894）提出；有限扩展型博弈至少存在一个序贯均衡；每个扩展型颤抖手完美均衡都是序贯均衡，但反之不必然。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是再发明一个纳什，而是：**在不完美信息动态博弈中，如何同时规定策略与离径信念，使二者相互支撑、且信念可被扰动极限约束**。它填补了 SPNE 在「非单点信息集」上失效的空白，并把 PBE 里往往任意的离径信念收紧。

边界：

- **在界内**：评估、信念系统、序贯理性、一致性、与 PBE/颤抖手/proper 的嵌套、信号传递与声誉应用。
- **在界外**：某次诉讼胜负预测、具体股价「庄家类型」实时识别——除非压成「策略+信念+一致性」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 策略与信念互相一致的动态解概念 |
| 2 | 边界在哪 | 到「评估 + 序贯理性 + 一致性」可形式化为止 |
| 3 | 核心对象 | 评估 \((\mu,\pi)\)、信息集、完全混合扰动序列 |
| 4 | 参与者 | 持私人信息的动态决策者：企业、竞标者、谈判方、算法 agent |
| 5 | 关键变量 | 先验、信号策略、离径颤抖比、后验 \(\mu\)、续贯支付 |
| 6 | 可直接观察 | 公开行动、信号、进入/退出、价格战是否发生 |
| 7 | 无法直接观察 | 真实类型、离径信念、失误结构 |
| 8 | 谁影响谁 | 策略 → 可达概率 → 信念；信念 → 最优续贯 → 策略 |
| 9 | 因果关系 | 完全混合扰动 ⇒ 贝叶斯 \(\mu^k\) ⇒ 极限一致性 ⇒ 约束离径 |
| 10 | 只是相关 | 「看起来合理的故事」≠ 一致评估【分析】 |
| 11 | 表层现象 | 分离/混同信号、空头威胁、声誉捕食 |
| 12 | 底层机制 | 评估的序贯理性 + 扰动极限一致性 |
| 13 | 有反馈吗 | 有。行动更新信念，信念改写后续最优 |
| 14 | 有延迟吗 | 有。声誉积累、学习失误率需要重复 |
| 15 | 正/负反馈 | 声誉可正反馈；披露与承诺可负反馈纠偏 |

## 最关键的一句话

> 序贯均衡问的是：「给定我在这个信息集上的信念，我的计划还最优吗？而这个信念，是否能被一列越来越小的失误所逼近？」

# 为什么值得研究

:::cards g3
### 它给离径信念加「物理约束」
PBE 常允许任意离径信念；SE 要求信念是完全混合策略贝叶斯更新的极限。【事实】

### 它比颤抖手更容易检验
Kreps–Wilson：验证 SE 通常远比验证完美均衡省事；有限博弈存在性有保证。【事实】

### 它是信号与声誉的母语
Spence 信号、进入威慑、连锁店悖论的不完全信息版，都用 SE/PBE 语言写均衡。【分析】
:::

:::note amber 最贵的一次误判
看见「零概率偏离」就随口编一个惩罚信念（「一定是坏人」），再宣称均衡。那可能是 PBE，却不是 SE——一致性可能禁止这种信念。【推论】
:::

# 世界地图

九层看「信念」如何从自由变量变成受约束对象。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="seArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 更强精炼 · 扩展型完美 / Proper / 稳定结果 / CSE</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 应用族 · 信号传递 · 声誉捕食 · 进入威慑 · 拍卖动态</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 与颤抖手 · 完美 ⇒ SE；SE 只在极限要求理性，完美沿途也要求</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 与 PBE · SE ⊂ PBE（一般）；差距在离径信念约束强度</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 存在性 · 有限扩展型 ⇒ ∃ SE；策略剖面是 SPNE</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 一致性 · πᵏ 完全混合 → μᵏ 贝叶斯 → (μ,π)=极限</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 序贯理性 · 每个信息集上给定 μ 的续贯最优</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 评估 · 策略 π + 信念系统 μ（每个信息集上节点分布）</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 问题 · 不完美信息：多节点信息集，SPNE 精炼力不足</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L4**：会写评估、会做路径上贝叶斯、会用颤抖比约束离径；进阶卡在 **L6–L7**：SE 与 PBE、完美的精确差距。【分析】
:::

# 核心概念地图

抽象定义 → 机制 → 操作。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="160" y="16" width="360" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">评估 (μ, π)：信念 × 策略</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">序贯理性 + 一致性</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">扰动极限逼近 μ</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">验 BR / 验颤抖比</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="60" y="190" width="560" height="70" rx="8" fill="#f8fafc" stroke="#e2e6ec"/>
  <text x="80" y="220" fill="#15181d" font-size="13" font-family="sans-serif">判别两问：① 给定 μ，每个信息集上的行动是否最优？② 该 μ 能否由某列完全混合 πᵏ 的贝叶斯极限得到？</text>
  <text x="80" y="242" fill="#7c848f" font-size="12" font-family="sans-serif">只过① ≈ 弱 PBE；①+② = 序贯均衡（教学口径）</text>

  <rect x="60" y="290" width="260" height="60" rx="8" fill="#fef2f2" stroke="#d5342c"/>
  <text x="190" y="316" text-anchor="middle" fill="#d5342c" font-size="12" font-weight="700" font-family="sans-serif">任意离径信念</text>
  <text x="190" y="336" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">可撑起「假威胁」PBE</text>
  <rect x="360" y="290" width="260" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="490" y="316" text-anchor="middle" fill="#0f8a4d" font-size="12" font-weight="700" font-family="sans-serif">一致离径信念</text>
  <text x="490" y="336" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">颤抖比极限约束</text>
  <line x1="320" y1="320" x2="360" y2="320" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
</svg>
:::

# 核心参与者

| 角色 | 在系统里做什么 | 典型失败模式 |
|---|---|---|
| 策略制定者 | 选每个信息集上的行动分布 | 只优化路径，忽略离径 |
| 信念持有者 | 在每个信息集上赋节点概率 | 离径任意编「坏人故事」 |
| 自然 / 类型 | 抽私人类型，制造不完全信息 | 被当成确定已知 |
| 精炼理论家 | Kreps–Wilson / Selten / Fudenberg–Tirole | 把规范精炼当实证必然 |
| 实验 / CSE 研究者 | 测诅咒信念、声誉偏离 | 用 SE 硬套有限理性数据 |

# 核心变量

| 变量 | 符号直觉 | 为何重要 |
|---|---|---|
| 行为策略 | \(\pi_i(a\mid h)\) | 每个信息集上的行动分布 |
| 信念 | \(\mu(x\mid h)\) | 信息集 \(h\) 上节点 \(x\) 的概率 |
| 先验 | \(\pi\)（类型） | 路径上贝叶斯的起点 |
| 颤抖比 | \(r=\varepsilon_H/\varepsilon_L\) | 决定离径后验极限 |
| 后验 | \(\mu\) | 序贯理性的输入 |
| 可达概率 | \(P^\pi(h)\) | \(>0\) 时信念由贝叶斯钉死 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="130" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="85" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">完全混合 πᵏ</text>
  <rect x="180" y="30" width="130" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="245" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">处处贝叶斯 μᵏ</text>
  <rect x="340" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="410" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">极限 (μ,π)</text>
  <rect x="510" y="30" width="150" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="585" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">一致性成立</text>
  <line x1="150" y1="55" x2="180" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>
  <line x1="310" y1="55" x2="340" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>
  <line x1="480" y1="55" x2="510" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>

  <rect x="80" y="140" width="220" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="190" y="170" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">给定 μ 的续贯最优</text>
  <rect x="360" y="140" width="240" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="480" y="170" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">序贯理性 ⇒ SE 候选</text>
  <line x1="300" y1="165" x2="360" y2="165" stroke="#1d4ed8" marker-end="url(#cfA)"/>

  <text x="340" y="240" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">实线：扰动 → 信念极限 → 一致性 · 红色虚线：无扰动约束时「任意 μ」可撑假威胁</text>
  <text x="340" y="265" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">结构一致性（structural consistency）是必要但非充分；SE 用扰动极限收紧</text>
  <line x1="190" y1="190" x2="245" y2="30" stroke="#d5342c" stroke-dasharray="5 4" marker-end="url(#cfB)" opacity="0"/>
</svg>
:::

教学公式（两类型离径信号 \(S'\)，均衡下双方几乎不发）：

\[
\mu(H\mid S')=\lim_{k\to\infty}\frac{\pi\,\varepsilon_H^k}{\pi\,\varepsilon_H^k+(1-\pi)\,\varepsilon_L^k}=\frac{\pi\,r}{\pi\,r+(1-\pi)},\quad r=\lim\frac{\varepsilon_H^k}{\varepsilon_L^k}
\]

若 \(r=1\)（同等相对失误），离径后验回到先验 \(\pi\)；若 \(r\to 0\)（H 相对几乎不抖），则 \(\mu\to 0\)。【事实】

默认 \(\pi=0.3\)：\(r=1\Rightarrow\mu=0.300\)；\(r=0.1\Rightarrow\mu=0.041\)；\(r=10\Rightarrow\mu=0.811\)。【事实】

# 隐藏关系

| 表面 | 底下 |
|---|---|
| 「信念随便设」 | SE 要求存在颤抖序列逼近 |
| PBE 与 SE「差不多」 | 一般 SE 真包含于 PBE；差距可实质【事实】 |
| SPNE 已够 | 多节点信息集不是子博弈根，SPNE 无力【事实】 |
| 完美更强所以只用完美 | SE 更易验证；完美沿扰动路径也要 BR【事实】 |
| 零概率事件「不会发生」 | 均衡推理必须规定「若发生」 |

# 系统运行机制

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="80" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">写策略 π</text><text x="80" y="90" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">行为策略</text>
  <rect x="170" y="40" width="120" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="230" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">路径贝叶斯</text><text x="230" y="90" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">钉死 on-path μ</text>
  <rect x="320" y="40" width="120" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="380" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">离径用颤抖</text><text x="380" y="90" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">定 μ 极限</text>
  <rect x="470" y="40" width="190" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="565" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">验序贯理性</text><text x="565" y="90" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">处处 BR ⇒ SE</text>
  <line x1="140" y1="75" x2="170" y2="75" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <line x1="290" y1="75" x2="320" y2="75" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <line x1="440" y1="75" x2="470" y2="75" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <text x="340" y="160" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">运行三句：路径上贝叶斯钉死；离径用相对失误率；每个信息集给定信念最优</text>
  <text x="340" y="185" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">完美均衡额外要求：沿整条扰动序列策略始终是精确 BR（不只极限）</text>
</svg>
:::

:::note purple 资金流抽水（激励流）
「任意离径信念」把威胁租金抽给会讲故事的一方；一致性把租金抽回——威胁信念必须能被共同的失误结构支撑，否则虚假租金归识破者。【分析】
:::

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="pumpA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
    <marker id="pumpB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="120" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">任意信念方</text>
  <rect x="260" y="30" width="160" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">威胁/信号租金</text>
  <rect x="480" y="30" width="160" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="560" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">一致约束方</text>
  <line x1="200" y1="55" x2="260" y2="55" stroke="#d5342c" marker-end="url(#pumpA)"/>
  <line x1="420" y1="55" x2="480" y2="55" stroke="#0f8a4d" stroke-dasharray="4 3" marker-end="url(#pumpB)"/>
  <text x="340" y="120" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">弱 PBE：租金可流向「会编离径故事」的一方（红）</text>
  <text x="340" y="145" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">SE 一致性：租金被颤抖极限抽走，流向可共同合理化的评估（绿虚）</text>
  <text x="340" y="175" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">机制含义：披露、菜单甄别、承诺 = 减少对任意离径信念的依赖</text>
</svg>
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 160" width="100%" style="max-width:680px">
  <rect x="20" y="40" width="100" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="70" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1950–51</text><text x="70" y="85" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Nash NE</text>
  <rect x="130" y="40" width="100" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="180" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1965/75</text><text x="180" y="85" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">SPNE / 完美</text>
  <rect x="250" y="40" width="120" height="60" rx="8" fill="#1d4ed8"/><text x="310" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#fff" font-family="sans-serif">1982</text><text x="310" y="85" text-anchor="middle" font-size="11" fill="#eaf0ff" font-family="sans-serif">Kreps–Wilson SE</text>
  <rect x="390" y="40" width="110" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="445" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1991</text><text x="445" y="85" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">F–T PBE 澄清</text>
  <rect x="520" y="40" width="140" height="60" rx="8" fill="#f8fafc" stroke="#e2e6ec"/><text x="590" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">2024–25</text><text x="590" y="85" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">稳定结果 / CSE</text>
  <text x="340" y="140" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">精炼阶梯：NE → SPNE → PBE → SE → 扩展型完美 / proper（约束递增）</text>
</svg>
:::

| 阶段 | 发生了什么 |
|---|---|
| 1950s | Nash：相互最优，不问动态离径 |
| 1965–75 | Selten：SPNE 与颤抖手完美 |
| 1982 | Kreps–Wilson：评估 + 一致性；声誉与连锁店【事实】 |
| 1991 前后 | Fudenberg–Tirole 等澄清 PBE 定义层次【分析】 |
| 2016–2024 | Bonanno 等刻画 PBE–SE 间隙；Sequentially Stable Outcomes（2024）【事实】 |
| 2025 | Cursed Sequential Equilibrium（*AER*）：有限理性诅咒信念【事实】【待验证：期刊页码以正式刊为准】 |

# 利益与激励

| 主体 | 想要什么 | SE 如何改变激励 |
|---|---|---|
| 信号发送者 | 用行动改变对方信念 | 信念更新规则被一致性钉死 |
| 信号接收者 | 在后验下最优反应 | 离径不能随意「惩罚信念」 |
| 在位者 / 进入者 | 威慑或试探 | 声誉策略须序贯理性 |
| 机制设计师 | 缩小预测集 | 用 SE 剔任意离径支撑的假均衡 |
| 实验者 | 解释偏离 SE 的数据 | CSE 等行为扩展 |

# 资源与信息流

| 流 | 内容 | 卡点 |
|---|---|---|
| 类型信息 | 私人成本/质量/强弱势 | 不可直接观察 |
| 信号流 | 教育、价格、广告、战斗 | 成本结构决定可分离性 |
| 信念流 | 先验 → 后验 → 离径 μ | 零概率处贝叶斯失效 |
| 颤抖流 | 相对失误率 \(r\) | 不可观察，需理论/实验假设 |
| 精炼流 | PBE → SE → 完美 | 验证成本上升 |

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 序 | 杠杆 | 为何高杠杆 | 怎么撬 |
|---|---|---|---|
| 1 | 显式写评估 \((\mu,\pi)\) | 强迫信念与策略成对出现 | 每个信息集列出 μ 与行动 |
| 2 | 路径上贝叶斯钉死 | 消除一半自由度 | 先算 \(P(h)>0\) 处的后验 |
| 3 | 颤抖比 \(r\) | 一参数决定离径 μ | 问「哪类人更易误触」 |
| 4 | 序贯理性门槛 \(\mu^*\) | 一眼看威胁是否可信 | 算 EU(fight)≥EU(accom) 的 μ |
| 5 | SE vs 任意 PBE | 识破假威胁故事 | 问该 μ 能否由扰动极限来 |
| 6 | 分离 vs 混同 | 决定信息是否披露 | 改信号成本结构 |
| 7 | 承诺 / 沉没成本 | 改续贯支付，放宽理性 | 合同罚则、公开投资 |
| 8 | 信息集设计 | 改变可达与更新 | 披露、审计、菜单 |
| 9 | 与 SPNE 对照 | 完美信息时 SE≈SPNE | 先判信息结构 |
| 10 | 行为扩展（CSE） | 解释实验偏离 | 加入诅咒参数 χ |

# 常见认知陷阱

:::details 1. 「纳什路径对了就够」
动态不完全信息必须规定离径信念与续贯最优，否则威胁可空头。【事实】
:::

:::details 2. 「SPNE 已经精炼完了」
多节点信息集不是子博弈；SPNE 在那里没有额外约束。【事实】
:::

:::details 3. 「PBE = SE」
一般 SE 是 PBE 的真精炼；PBE 的离径信念可更任意。【事实】
:::

:::details 4. 「离径信念可以随便设成惩罚」
SE 一致性可能禁止「看到偏离就 μ=1 坏人」这类故事，除非颤抖比支持。【推论】
:::

:::details 5. 「一致性就是结构一致性」
结构一致性较弱；Kreps–Wilson 一致性是扰动极限，更强。【事实】
:::

:::details 6. 「SE 与颤抖手完美一样」
完美 ⇒ SE；SE 只在极限要求序贯理性，完美要求扰动路径上始终 BR。【事实】
:::

:::details 7. 「零概率事件不需要建模」
均衡推理的核心恰恰是反事实：「若到达，你会怎么做」。【分析】
:::

:::details 8. 「后验可以不服从贝叶斯」
路径上 \(P(h)>0\) 时必须贝叶斯；否则连弱 PBE 都不满足。【事实】
:::

:::details 9. 「人真的按 SE 玩」
SE 是规范筛选器；实验室常见偏离，CSE 等尝试解释。【分析】
:::

:::details 10. 「算不出颤抖序列就没法用」
操作上先钉路径贝叶斯 + 序贯理性，再对可疑离径 μ 问「相对失误率是否合理」。【推论】
:::

<!-- nav:实践转化 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <rect x="30" y="40" width="180" height="100" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="120" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">抽象</text>
  <text x="120" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">(μ,π) 一致+理性</text>
  <rect x="250" y="40" width="180" height="100" rx="10" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">机制</text>
  <text x="340" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">贝叶斯+颤抖极限</text>
  <rect x="470" y="40" width="180" height="100" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="560" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">现实</text>
  <text x="560" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">信号/威慑压力测</text>
</svg>
:::

| 领域 | 抽象对应 | 现实操作 |
|---|---|---|
| 学历信号 | Spence：教育成本分离类型 | 问证书是否真降低模仿成本 |
| 进入威慑 | 声誉捕食 SE | 若对手「误进入」，你是否真打价格战 |
| 谈判 | 离径惩罚信念 | 违约后的信念是否可用失误合理化 |
| 平台审核 | 信号+后验 | 异常行为后验是否贝叶斯一致 |
| 多智能体 | 策略+信念状态 | 把信念显式进状态，别只存策略 |

# 从理论到行动

:::flow
画扩展树 <i>→</i> 写策略 π <i>→</i> 路径贝叶斯钉 μ <i>→</i> 离径用颤抖比 <i>→</i> {.hi}验序贯理性 <i>→</i> 对照任意 PBE
:::

行动清单：

1. 把局面压成带信息集的扩展树（哪怕两类型两行动）。
2. 写出候选行为策略，标出 \(P(h)>0\) 的信息集。
3. 对正概率信息集用贝叶斯算 μ（工具 1）。
4. 对零概率信息集用相对失误率 \(r\) 定 μ（工具 2）。
5. 给定 μ 验接收方最优（工具 3）；对照「任意 μ」的 PBE 故事（工具 4）。

## 工具 1：路径上贝叶斯后验

发送者类型 H 先验 \(\pi\)，发信号 S 的概率：H 为 1，L 为 \(\alpha\)。后验 \(\mu(H\mid S)=\pi/(\pi+(1-\pi)\alpha)\)。默认 \(\pi=0.3,\alpha=0.5\Rightarrow\mu=0.4615\)。【事实】

:::raw
<div class="tool" id="toolBay">
  <div class="ctrl">
    <label>先验 π=P(H) <output id="bay_piO">30%</output></label>
    <input type="range" id="bay_pi" min="5" max="95" step="1" value="30">
    <label>L 发 S 的概率 α <output id="bay_aO">50%</output></label>
    <input type="range" id="bay_a" min="0" max="100" step="1" value="50">
  </div>
  <div class="readout">
    <div class="ro">后验 μ(H\|S) <b id="bay_mu">0.4615</b></div>
    <div class="ro">似然比 L(S\|H)/L(S\|L) <b id="bay_lr">2.000</b></div>
    <div class="ro">相对先验提升 <b id="bay_lift">+0.1615</b></div>
    <div class="ro">信息性 <b id="bay_info">部分分离</b></div>
    <div id="bay_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="bayChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

## 工具 2：离径信念的颤抖比一致性

均衡下几乎无人发 \(S'\)。相对失误率 \(r=\varepsilon_H/\varepsilon_L\) 决定 \(\mu=\pi r/(\pi r+(1-\pi))\)。默认 \(\pi=0.3,r=1\Rightarrow\mu=0.300\)。【事实】

:::raw
<div class="tool" id="toolTrem">
  <div class="ctrl">
    <label>先验 π <output id="tr_piO">30%</output></label>
    <input type="range" id="tr_pi" min="5" max="95" step="1" value="30">
    <label>相对失误比 r=ε_H/ε_L <output id="tr_rO">1.00</output></label>
    <input type="range" id="tr_r" min="0.05" max="20" step="0.05" value="1">
  </div>
  <div class="readout">
    <div class="ro">一致离径 μ <b id="tr_mu">0.300</b></div>
    <div class="ro">若 r→0（H 几乎不抖） <b id="tr_lo">→ 0</b></div>
    <div class="ro">若 r→∞（H 更易抖） <b id="tr_hi">→ 1</b></div>
    <div class="ro">相对先验 <b id="tr_cmp">= 先验</b></div>
    <div id="tr_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="trChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

## 工具 3：序贯理性门槛

接收方：斗争支付对 H 为 \(u_H\)、对 L 为 \(u_L\)；默许为 0。EU[斗争]=\(\mu u_H+(1-\mu)u_L\)。默认 \(u_H=-1,u_L=1\Rightarrow\) 门槛 \(\mu^*=0.5\)；\(\mu=0.30\) 时 EU=+0.400，选斗争。【事实】

:::raw
<div class="tool" id="toolSeq">
  <div class="ctrl">
    <label>信念 μ=P(H) <output id="sq_muO">30%</output></label>
    <input type="range" id="sq_mu" min="0" max="100" step="1" value="30">
    <label>对 H 斗争支付 <output id="sq_uhO">-1.0</output></label>
    <input type="range" id="sq_uh" min="-3" max="2" step="0.1" value="-1">
    <label>对 L 斗争支付 <output id="sq_ulO">1.0</output></label>
    <input type="range" id="sq_ul" min="-2" max="3" step="0.1" value="1">
  </div>
  <div class="readout">
    <div class="ro">EU[斗争] <b id="sq_eu">0.400</b></div>
    <div class="ro">EU[默许] <b id="sq_ac">0.000</b></div>
    <div class="ro">门槛 μ* <b id="sq_star">0.500</b></div>
    <div class="ro">序贯最优 <b id="sq_br">斗争</b></div>
    <div id="sq_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="sqChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

## 工具 4：SE 一致 μ vs 任意 PBE μ

固定颤抖比给出的 SE 信念 \(\mu_{SE}\)，对比你手填的「故事信念」\(\mu_{story}\)。若两者差大，且故事支撑不同行动，则该故事可能是 PBE 但非 SE。【分析】

:::raw
<div class="tool" id="toolGap">
  <div class="ctrl">
    <label>先验 π <output id="gp_piO">30%</output></label>
    <input type="range" id="gp_pi" min="5" max="95" step="1" value="30">
    <label>颤抖比 r <output id="gp_rO">1.00</output></label>
    <input type="range" id="gp_r" min="0.05" max="20" step="0.05" value="1">
    <label>故事信念 μ_story <output id="gp_stO">90%</output></label>
    <input type="range" id="gp_st" min="0" max="100" step="1" value="90">
    <label>门槛 μ*（斗争） <output id="gp_thO">50%</output></label>
    <input type="range" id="gp_th" min="5" max="95" step="1" value="50">
  </div>
  <div class="readout">
    <div class="ro">μ_SE <b id="gp_se">0.300</b></div>
    <div class="ro">μ_story <b id="gp_story">0.900</b></div>
    <div class="ro">|差距| <b id="gp_gap">0.600</b></div>
    <div class="ro">行动是否一致 <b id="gp_same">否</b></div>
    <div id="gp_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="gpChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

# 技能树

:::details ① 扩展树与信息集
能画多节点信息集，区分完美/不完美、完全/不完全信息。【事实】
:::

:::details ② 行为策略
在每个信息集上写行动分布，而不是只写终点路径。【事实】
:::

:::details ③ 路径贝叶斯
\(P(h)>0\) 时用定义算条件概率，不凭感觉。【事实】
:::

:::details ④ 序贯理性
给定 μ 比较续贯期望支付，找出 BR。【事实】
:::

:::details ⑤ 一致性直觉
用相对失误率解释离径 μ，而非任意赋值。【分析】
:::

:::details ⑥ SE vs PBE 辨析
能举「PBE 但非 SE」的信念故事（教学级）。【分析】
:::

:::details ⑦ 与颤抖手/SPNE 嵌套
记住：完美 ⇒ SE ⇒（通常）PBE；SE 策略是 SPNE。【事实】
:::

:::details ⑧ 信号博弈分类
分离 / 混同 / 半分离；单交叉条件直觉。【事实】
:::

:::details ⑨ 声誉模型入口
Kreps–Wilson 连锁店：小概率强硬类型如何支撑捕食。【事实】
:::

:::details ⑩ 行为扩展意识
知道 CSE 等放松「正确推断行动—类型相关」。【待验证】
:::

# 游戏化世界

你进入「信念竞技场」：每个关卡给你一棵带信息集的树。胜负不看路径支付高低，而看你能否提交一份**通过序贯理性与一致性检查**的评估。随意编「坏人信念」会被裁判（一致性）判负。

# 任务系统

| 任务 | 目标 | 验收 |
|---|---|---|
| T1 | 画一个两类型信号树 | 含自然、发送、接收信息集 |
| T2 | 算一条混同路径的后验 | 与工具 1 一致 |
| T3 | 用 r 定一个离径 μ | 写出极限公式 |
| T4 | 给定 μ 验接收方 BR | 报告 EU 与门槛 |
| T5 | 找一个「故事 μ」与 μ_SE 分歧 | 说明行动是否翻转 |
| T6 | 对照进入博弈的颤抖手手册 | 一句话区分 SE vs 完美 |
| T7 | 读 Kreps–Wilson 摘要定义 | 能复述 assessment |
| T8 | 用现实案例套评估语言 | 写出 π、信号、μ、行动 |

# 反事实模拟

:::tabs
@@若离径信念完全任意
弱 PBE 膨胀：许多空头威胁可被「惩罚信念」支撑；预测集过大，几乎什么故事都能讲。【分析】

@@若要求一致性（SE）
离径 μ 被颤抖比约束；部分假威胁出局；仍可能比完美均衡宽松。【事实】

@@若升级到扩展型完美
沿扰动序列处处 BR；集合更小，验证更难；Kreps–Wilson 强调 SE「远更易验证」。【事实】

@@若参与人「诅咒」相关
CSE：低估行动与类型相关 → 声誉更难建立、进入更多——实验室模式常见。【事实】【待验证：效应量依实验】
:::

<!-- nav:能力路线 -->
# 四级能力路线

| 级别 | 能力 | 你能交付什么 |
|---|---|---|
| L1 识记 | 说出 SE 两条件 | 30 秒电梯稿 |
| L2 计算 | 路径贝叶斯 + 序贯理性 | 完整作业级算例 |
| L3 精炼 | 用颤抖比约束离径并对比 PBE | 挑剔假均衡故事 |
| L4 迁移 | 信号/声誉/机制里选用 SE | 建模备忘录 |

# 30分钟最小实践

成本≈0，产出可验证：

1. 选一个你最近遇到的「威胁/信号」故事（工作或新闻，10 分钟）。
2. 压成：类型两档、一个信号、一个响应（5 分钟）。
3. 用工具 1–3 算出路径后验、一个离径 μ（设 \(r=1\)）、响应是否 BR（10 分钟）。
4. 用工具 4 把「故事里的坏人信念」拖到极端，看行动是否翻转（5 分钟）。
5. 写下结论一句：该故事是 SE 候选，还是仅靠任意离径的 PBE 故事？

# 7天计划

| 天 | 焦点 | 产出 |
|---|---|---|
| D1 | 重画信息集与评估定义 | 一页笔记 |
| D2 | 路径贝叶斯三道题 | 与工具 1 对答案 |
| D3 | 序贯理性与 μ* | 工具 3 截图 |
| D4 | 颤抖比离径 | 工具 2 三组 r |
| D5 | SE vs PBE | 工具 4 一例分歧 |
| D6 | 读 Wikipedia/教材 SE 节 | 对照本手册标记 |
| D7 | 现实案例评估 | 半页备忘录 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 定义与计算 | 独立完成混同/分离算例 |
| W2 | 精炼嵌套 | 一张 SE–PBE–完美对照表 |
| W3 | 信号与声誉 | 解读一个经典模型的评估 |
| W4 | 迁移 | 把本职场景写成评估 + 压力测试 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 评估 \((\mu,\pi)\) | 信念与策略成对 |
| 2 | 序贯理性 | 每个信息集给定 μ 最优 |
| 3 | 一致性 | 完全混合扰动的贝叶斯极限 |
| 4 | 路径贝叶斯 | \(P>0\) 处信念钉死 |
| 5 | 颤抖比 \(r\) | 离径后验的充分统计（两类型） |
| 6 | SE ⊂ PBE | 一般真包含 |
| 7 | 完美 ⇒ SE | 更强，更难验 |
| 8 | 分离/混同 | 信号均衡类型 |
| 9 | 声誉捕食 | 小概率强硬类型支撑战斗 |
| 10 | CSE | 诅咒信念下的序贯扩展 |

# 关键问题清单

:::details Q1 为什么 SPNE 不够？
非单点信息集不是子博弈根，SPNE 无额外约束。【事实】
:::

:::details Q2 SE 一定存在吗？
有限扩展型博弈：是。【事实】
:::

:::details Q3 每个 SE 都是 NE 吗？
是；且策略剖面是 SPNE。【事实】
:::

:::details Q4 为何引入信念？
离径无法用策略本身的贝叶斯更新；必须显式 μ。【事实】
:::

:::details Q5 一致性直观是什么？
「偏离像极小独立失误」，相对速率决定后验。【分析】
:::

:::details Q6 和直觉标准（intuitive criterion）什么关系？
直觉标准等是信号博弈上对 PBE/SE 的进一步精炼，另册。【分析】
:::

:::details Q7 完美信息时 SE 是什么？
与 SPNE 一致（信念平凡）。【事实】
:::

:::details Q8 为何说 SE 比完美好用？
验证成本更低，同时保留对离径的纪律。【事实】
:::

:::details Q9 实验室偏离怎么办？
考虑学习、诅咒信念（CSE）、量化反应等行为解。【分析】
:::

:::details Q10 最小实践卡在哪？
不会写离径 μ：先设 \(r=1\)（回到先验），再讨论是否合理。【推论】
:::

# 下一阶段探索

- 精读 Kreps–Wilson（1982）一致性拓扑与存在性证明草图。
- 对照 Bonanno（2016/）对 PBE–SE 间隙的「无极限」刻画。【待验证】
- 进入 Spence / Cho–Kreps 直觉标准 / Banks–Sobel 神谕精炼。
- 读 *Sequentially Stable Outcomes*（Econometrica 2024）看结果层面的稳定。【事实】
- 行为线：Cursed Sequential Equilibrium（AER 2025）与实验。【事实】

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| SE 定义、存在性、与完美关系 | 经典论文 | Kreps & Wilson, *Econometrica* 1982, 50(4):863–894 | 【事实】 |
| Wikipedia 综述（SE vs PBE） | 百科综述 | Sequential equilibrium 条目 | 【分析】 |
| PBE–SE 间隙 | 期刊 | Bonanno 等, *Games* 2016「Exploring the Gap…」 | 【事实】 |
| 完美 vs SE（ε-最优沿途） | 讲义/论文 | Cramton 精炼讲义；Halpern 等非标准概率刻画 | 【分析】 |
| Sequentially Stable Outcomes | 期刊 | *Econometrica* 2024 | 【事实】 |
| CSE | 期刊 | Fong–Lin–Palfrey, *AER* 2025 | 【事实】 |
| 教学数值（π,α,r,μ*） | 自算 | 本手册 node 验算 | 【事实】 |
| 中文教材口径（精炼贝叶斯） | 教学 PDF | 人大等「不完全信息动态博弈」讲义 | 【分析】 |

标记：【事实】可多方核对；【分析】权威整理；【推论】本手册推导；【假设】未验证；【待验证】单源或转载链。

# 免责声明 {.appendix}

本手册为博弈论概念的认知与实践框架，用于训练「策略—信念一致性」思维，**不是**投资、法律、商业谈判的操作建议，也不构成对任何市场结果的预测。文中支付与概率均为教学约定数字；将模型套用于现实决策时，须自行核验信息结构、先验与激励，并承担相应风险。
