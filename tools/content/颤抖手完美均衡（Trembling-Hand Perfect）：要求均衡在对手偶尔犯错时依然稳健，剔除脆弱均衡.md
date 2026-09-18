---
slug: 颤抖手完美均衡（Trembling-Hand Perfect）：要求均衡在对手偶尔犯错时依然稳健，剔除脆弱均衡
title: 颤抖手完美均衡（Trembling-Hand Perfect）
subtitle: 均衡不能只在「对手绝不犯错」时成立——<strong>手会抖</strong>。要求策略在任意小的失误扰动下仍是最优反应，从而剔除靠弱劣势策略硬撑的脆弱均衡。
brand_sub: Trembling-Hand × Equilibrium Refinement
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 颤抖手完美, Selten, 均衡精炼, 弱劣势策略, 序贯均衡, Myerson]
theme_js_file: 颤抖手完美均衡（Trembling-Hand Perfect）：要求均衡在对手偶尔犯错时依然稳健，剔除脆弱均衡.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**颤抖手完美均衡（Trembling-Hand Perfect Equilibrium, THPE / Perfect Equilibrium）**：存在一列**完全混合**策略剖面 \(\sigma^k \to \sigma\)，使得对每个 \(k\)、每个参与人 \(i\)，极限策略 \(\sigma_i\) 仍是对扰动剖面 \(\sigma_{-i}^k\) 的最优反应。【事实】

直觉：人会「手抖」——以可忽略的概率选到非意图行动。若某个纳什均衡只在「对手绝对零失误」时才成立，它就太脆了；颤抖手要求**对任意小失误仍稳健**。【分析】

Reinhard Selten（1975，《IJGT》）在扩展式上提出完美均衡，并把 1965 年概念改称「子博弈精炼」。【事实】正常型版本剔除含**弱劣势策略**的 NE；扩展型版本对每个信息集动作加正概率扰动，极限是扩展型颤抖手完美，且蕴含序贯均衡。【事实】有限博弈至少存在一个（可能混合）颤抖手完美均衡。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「再发明一个纳什」，而是：**在多重 NE 里，哪些经得起「对手偶尔犯错」的压力测试**。它属于均衡精炼族（refinement）——SPNE 剪不可信威胁，颤抖手剪「靠零失误信念硬撑」的脆弱点。

边界：

- **在界内**：扰动博弈、完全混合策略、正常型/扩展型完美、与弱劣势/序贯/proper 的关系、进入威慑与弱劣势经典反例。
- **在界外**：某次谈判胜负预测、具体行业诉讼细节——除非压成「该 NE 是否对 ε-失误稳健」。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 对微小失误稳健的纳什均衡精炼 |
| 2 | 边界在哪 | 到「扰动极限 + 最优反应」可形式化为止 |
| 3 | 核心对象 | 扰动博弈、颤抖序列、完美均衡 |
| 4 | 参与者 | 近似理性主体：企业、国家、算法 agent、谈判方 |
| 5 | 关键变量 | 颤抖概率 ε、支付差、信息集、策略支撑 |
| 6 | 可直接观察 | 公开行动、是否执行威胁、合同违约率 |
| 7 | 无法直接观察 | 真实失误分布、离径信念、私有类型 |
| 8 | 谁影响谁 | 对手颤抖 → 期望支付扰动 → 最优反应可能翻转 |
| 9 | 因果关系 | ε>0 使弱劣势变严格劣势 ⇒ 脆弱 NE 崩溃 |
| 10 | 只是相关 | 「嘴硬」相关于威慑，但不保证对颤抖稳健【分析】 |
| 11 | 表层现象 | 空头威胁、靠「你绝不会偏离」支撑的协调 |
| 12 | 底层机制 | 完全混合扰动 + 极限最优反应 |
| 13 | 有反馈吗 | 有。失误暴露离径节点，信念与最优反应互馈 |
| 14 | 有延迟吗 | 有。学习对手失误率需要重复交互 |
| 15 | 正/负反馈 | 脆弱均衡崩溃可正反馈；承诺改支付可负反馈稳定 |

## 最关键的一句话

> 颤抖手问的不是「均衡路径上是否最优」，而是「若对手以任意小概率手抖，你的计划还是不是最优」。

# 为什么值得研究

:::cards g3
### 它给 NE 加「压力测试」
普通 NE 允许「对手绝不犯错」的刀刃信念。颤抖手强制：任意小正概率失误下仍成立。【事实】

### 它剔除弱劣势支撑的虚假稳定
二人有限正常型博弈中，完美均衡 = 无弱劣势策略的 NE（支撑意义下）。【事实】

### 它连接 SPNE → 序贯 → proper
扩展型完美 ⇒ 序贯均衡；Myerson proper 再要求「更贵的失误更罕见」。【事实】
:::

:::note amber 最贵的一次误判
把「不进入 + 威胁开战」当成稳定结果。只要进入者以 ε>0 手抖进来，在位者「开战」相对默许严格更差——该 NE 不是颤抖手完美。【推论】
:::

# 世界地图

九层看「手抖」如何从隐喻变成精炼刀。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="thArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 改支付使意图行动在颤抖下仍稳健</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 更强精炼 · Proper / Quasi-perfect / 稳定集</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 扩展型 · 信息集动作扰动 → 蕴含序贯均衡</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 与 SPNE · 完美 ⇒ 子博弈精炼，反之不必然</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 批评 · 对「哪条颤抖序列」敏感；加严格劣势策略可改集合</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 应用 · 进入威慑 / 拍卖剔弱劣势 / 空头威胁压力测试</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 判别 · 完全混合序列 + 极限策略始终是 BR</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 解概念 · 颤抖手完美 ⊂ 纳什；完全混合 NE 皆完美</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 扰动 · ε-完全混合：每个纯策略正概率</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1→L3**：会写「对手以 ε 抖到非意图行动」并比较期望支付；进阶卡在 **L5–L8**：为何还要 proper，以及正常型完美≠扩展型完美。【分析】
:::

# 核心概念地图

抽象定义 → 机制 → 操作。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="180" y="16" width="320" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">候选 NE σ（可能含弱劣势）</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">∃ σᵏ→σ，σᵢ∈BR(σ₋ᵢᵏ)</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">ε&gt;0 拉开支付差</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">删脆弱 NE / 加压测</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="60" y="190" width="560" height="70" rx="8" fill="#f8fafc" stroke="#e2e6ec"/>
  <text x="80" y="220" fill="#15181d" font-size="13" font-family="sans-serif">判别：对手以 ε 抖到「不该出现」的行动时，你的意图行动是否仍严格最优？</text>
  <text x="80" y="242" fill="#7c848f" font-size="12" font-family="sans-serif">若只有 ε=0 时才最优 → 非完美；若任意小 ε 仍最优 → 通过颤抖手压力测试</text>

  <rect x="60" y="290" width="260" height="60" rx="8" fill="#fef2f2" stroke="#d5342c"/>
  <text x="190" y="316" text-anchor="middle" fill="#d5342c" font-size="12" font-weight="700" font-family="sans-serif">脆弱 NE</text>
  <text x="190" y="336" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">依赖零失误 / 弱劣势</text>
  <rect x="360" y="290" width="260" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="490" y="316" text-anchor="middle" fill="#0f8a4d" font-size="12" font-weight="700" font-family="sans-serif">颤抖手完美</text>
  <text x="490" y="336" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">对某列颤抖极限稳健</text>
  <line x1="320" y1="320" x2="360" y2="320" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
</svg>
:::

# 核心参与者

| 角色 | 在系统里做什么 | 典型失败模式 |
|---|---|---|
| 意图行动者 | 选「想要」的纯/混合策略 | 假设对手绝不抖 |
| 颤抖对手 | 以 ε 选到非意图行动 | 被当成「类型突变」而非失误 |
| 精炼理论家 | Selten / Myerson / Kreps–Wilson | 把规范精炼当实证必然 |
| 机制设计师 | 改支付使意图行动在颤抖下仍 BR | 忽略添加劣势策略会改完美集 |
| 实验/算法 agent | 测真实失误率与学习 | 把噪声当成完全理性 NE |

# 核心变量

| 变量 | 符号直觉 | 为何重要 |
|---|---|---|
| 颤抖率 | \(\varepsilon\) | 拉开弱劣势的支付差 |
| 支付差 | \(\Delta\) | \(\Delta\cdot\varepsilon\) 决定是否翻转 BR |
| 策略支撑 | \(\mathrm{supp}(\sigma_i)\) | 完美要求支撑内行动对扰动仍最优 |
| 信息集动作 | 扩展型扰动对象 | 正常型抖「整策略」≠ 扩展型抖「动作」 |
| 失误排序 | proper 的 \(\varepsilon^k\) | 更贵失误应更稀有 |
| 完全混合 | 每纯策略 \(>0\) | 保证所有信息集可达（极限意义） |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="130" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="85" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">对手 ε-颤抖</text>
  <rect x="180" y="30" width="130" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="245" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">期望支付扰动</text>
  <rect x="340" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="410" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">弱劣势变严格差</text>
  <rect x="510" y="30" width="150" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="585" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">脆弱 NE 出局</text>
  <line x1="150" y1="55" x2="180" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>
  <line x1="310" y1="55" x2="340" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>
  <line x1="480" y1="55" x2="510" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>

  <rect x="80" y="140" width="220" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="190" y="170" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">空头开战威胁（弱劣势）</text>
  <rect x="360" y="140" width="240" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="480" y="170" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">ε&gt;0 时开战 &lt; 默许</text>
  <line x1="300" y1="165" x2="360" y2="165" stroke="#d5342c" stroke-dasharray="5 4" marker-end="url(#cfB)"/>

  <text x="340" y="240" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">实线：颤抖 → 支付差 → 精炼因果链 · 红色虚线：NE 允许、完美切断的刀刃信念</text>
  <text x="340" y="265" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">若改支付使开战在进入后仍最优，红色虚线可重新成为可信实线</text>
</svg>
:::

经典进入博弈（挑战者，在位者）：不进入 \((0,2)\)；进入＋斗争 \((-1,-1)\)；进入＋默许 \((1,1)\)。【事实】（教学约定支付）

若候选 NE =（不进入，斗争）：挑战者以 \(\varepsilon\) 抖入时，在位者期望：

- 斗争：\((1-\varepsilon)\cdot 2 + \varepsilon\cdot(-1) = 2-3\varepsilon\)
- 默许：\((1-\varepsilon)\cdot 2 + \varepsilon\cdot 1 = 2-\varepsilon\)

对任意 \(\varepsilon>0\)，\(2-\varepsilon > 2-3\varepsilon\) ⇒ 斗争不是对扰动的 BR ⇒ **非颤抖手完美**。【事实】

\(\varepsilon=0.05\) 时：斗争 1.85、默许 1.95，差距 0.10。【事实】

# 隐藏关系

| 表面 | 底下 |
|---|---|
| 「多重纳什都合理」 | 哪些只靠 ε=0 的刀刃信念？ |
| 弱劣势策略「也没关系」 | 任意小颤抖下变严格劣势 |
| SPNE 已够用 | 非单点信息集时 SPNE 精炼力弱，需颤抖手/序贯 |
| 正常型完美 | 抖的是整条策略，未必子博弈精炼【事实】 |
| 「存在某条颤抖序列」 | 批评：对序列选择敏感；proper 再加压【分析】 |

# 系统运行机制

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="80" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">取候选 NE</text><text x="80" y="90" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">σ</text>
  <rect x="170" y="40" width="120" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="230" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">构造扰动</text><text x="230" y="90" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">σᵏ 完全混合</text>
  <rect x="320" y="40" width="120" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="380" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">检验 BR</text><text x="380" y="90" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">σᵢ ∈ BR(σ₋ᵢᵏ)</text>
  <rect x="470" y="40" width="190" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="565" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">ε→0 极限</text><text x="565" y="90" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">通过 ⇒ THPE</text>
  <line x1="140" y1="75" x2="170" y2="75" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <line x1="290" y1="75" x2="320" y2="75" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <line x1="440" y1="75" x2="470" y2="75" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <text x="340" y="160" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">等价叙述：扰动博弈（只允许完全混合）的 NE 序列极限 = 完美均衡</text>
  <text x="340" y="185" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">扩展型：扰动每个信息集上的每个动作，而非整条正常型策略</text>
</svg>
:::

运行逻辑三句：

1. **扰动**：强制每个纯策略（或每个动作）正概率——世界「到处可达」。
2. **最优**：意图策略必须对扰动仍是 BR（不仅在极限上，而是沿序列）。
3. **极限**：\(\varepsilon\to 0\) 收回「几乎理性」，留下对失误稳健的点。

:::note purple 资金流抽水（激励流）
脆弱均衡把「稳定性租金」抽给会喊空头威胁的一方；颤抖手把租金抽回——要求威胁在正概率到达时仍值得执行，否则租金归「识破者」。【分析】
:::

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="pumpA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
    <marker id="pumpB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="120" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">空头威胁方</text>
  <rect x="260" y="30" width="160" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">脆弱 NE 租金</text>
  <rect x="480" y="30" width="160" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="560" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">识破/进入方</text>
  <line x1="200" y1="55" x2="260" y2="55" stroke="#d5342c" marker-end="url(#pumpA)"/>
  <line x1="420" y1="55" x2="480" y2="55" stroke="#0f8a4d" stroke-dasharray="4 3" marker-end="url(#pumpB)"/>
  <text x="340" y="120" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">无颤抖：租金流向威胁方（红色实线）</text>
  <text x="340" y="145" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">有颤抖手精炼：虚假租金被抽走，流向真实最优反应方（绿色虚线）</text>
  <text x="340" y="175" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">机制设计：沉没成本 / 合同罚则 = 把抽水方向重新接到「可信承诺」</text>
</svg>
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 160" width="100%" style="max-width:680px">
  <rect x="20" y="40" width="100" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="70" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1950–51</text><text x="70" y="85" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Nash NE</text>
  <rect x="140" y="40" width="100" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="190" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1965</text><text x="190" y="85" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Selten SPNE</text>
  <rect x="260" y="40" width="110" height="60" rx="8" fill="#1d4ed8"/><text x="315" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#fff" font-family="sans-serif">1975</text><text x="315" y="85" text-anchor="middle" font-size="11" fill="#eaf0ff" font-family="sans-serif">颤抖手完美</text>
  <rect x="390" y="40" width="100" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="440" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1978</text><text x="440" y="85" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Myerson proper</text>
  <rect x="510" y="40" width="150" height="60" rx="8" fill="#f8fafc" stroke="#e2e6ec"/><text x="585" y="65" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1982+</text><text x="585" y="85" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">序贯 / 准完美</text>
  <text x="340" y="140" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">精炼阶梯：Nash → SPNE → 颤抖手 → 序贯/proper（越往右对「失误结构」要求越细）</text>
</svg>
:::

| 阶段 | 发生了什么 |
|---|---|
| 1950s | Nash：相互最优，但不问离径与失误 |
| 1965 | Selten：子博弈精炼，剪不可信威胁 |
| 1975 | 颤抖手：失误扰动极限；旧「perfect」改称 SPNE【事实】 |
| 1978 | Myerson proper：更贵失误更稀有【事实】 |
| 1982 | Kreps–Wilson 序贯均衡：信念+序列理性；完美 ⇒ 序贯【事实】 |

# 利益与激励

| 主体 | 想要什么 | 颤抖手如何改变激励 |
|---|---|---|
| 威胁发布者 | 廉价恐吓改变路径 | ε>0 时恐吓若非 BR 则失效 |
| 潜在进入者 | 评估威胁可信度 | 用「若我误入，对方还打吗」检验 |
| 协调博弈者 | 锁定某一多重 NE | 弱劣势支撑的协调点被剔除 |
| 规则设计者 | 预测稳定结果 | 应用完美/proper 缩小预测集 |
| 算法 agent | 对抗噪声对手 | 把 ε 噪声写进训练/评估 |

# 资源与信息流

| 流 | 内容 | 卡点 |
|---|---|---|
| 支付信息 | 矩阵/树的 \(u_i\) | 估错 Δ ⇒ 误判稳健性 |
| 失误信息 | 真实 ε 分布 | 不可直接观察，需实验/历史 |
| 信念流 | 离径后「为何到达」 | 正常型完美不显式建模信念 |
| 策略流 | 意图 vs 实现行动 | 扩展型区分「计划错」与「动作抖」 |
| 精炼流 | NE → THP → proper | 计算与验证成本上升 |

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 序 | 杠杆 | 为何高杠杆 | 怎么撬 |
|---|---|---|---|
| 1 | 支付差 Δ | 决定 ε 多小就能翻转 BR | 改合同/沉没成本拉开 Δ |
| 2 | 显式 ε 压力测试 | 一眼识破脆弱 NE | 对每个候选 NE 算「抖一下」 |
| 3 | 删弱劣势 | 二人正常型几乎等于完美 | 先剔除再谈多重均衡 |
| 4 | 扩展型 vs 正常型 | 选错形式会漏/误杀 | 动态问题用扩展型扰动 |
| 5 | 承诺装置 | 把空头变可信 | 托管、罚则、公开沉没 |
| 6 | Proper 加权 | 挡「荒谬失误过大」 | 要求贵失误概率更小阶 |
| 7 | 完全混合 NE | 自动完美 | 混均常比纯脆弱点稳 |
| 8 | 信息集设计 | 决定扰动落点 | 披露/隐藏改变可达性 |
| 9 | 添加策略的敏感性 | 加严格劣势可改完美集 | 建模时固定策略空间 |
| 10 | 实验测 ε | 把规范变实证 | 用失误率校准模型 |

# 常见认知陷阱

:::details 1. 「纳什都一样稳」
多重 NE 稳定性天差地别。颤抖手专门打「刀刃信念」那一类。【分析】
:::

:::details 2. 「弱劣势无所谓，反正也是 NE」
ε>0 时弱劣势变严格差。含弱劣势的 NE（在支撑意义上）不是完美。【事实】
:::

:::details 3. 「SPNE 过了就一定完美」
完美 ⇒ SPNE，但 SPNE 未必完美；非单点信息集上差距更明显。【事实】
:::

:::details 4. 「正常型完美 = 扩展型完美」
正常型抖整条策略；扩展型抖每个信息集动作。前者甚至不必子博弈精炼。【事实】
:::

:::details 5. 「存在某条颤抖序列就够了，序列怎么选无所谓」
批评正是：对特定序列敏感。Proper 用「成本排序」约束失误。【分析】
:::

:::details 6. 「完全混合就一定是均衡」
完全混合 NE 是完美的；但完全混合策略未必是 NE。【事实】
:::

:::details 7. 「ε 要估计得很准才有用」
定性结论常对任意小 ε>0 成立（如进入博弈开战）。先做符号检验。【推论】
:::

:::details 8. 「加个严格劣势策略不影响」
Myerson 指出：完美集可能因添加严格劣势策略而改变——故提出 proper。【事实】
:::

:::details 9. 「序贯均衡更强，所以不用管颤抖手」
扩展型完美 ⇒ 序贯；但序贯只在极限要求序列理性，完美沿路径也要求 BR。【事实】
:::

:::details 10. 「人不会真的按完美均衡玩」
精炼是规范筛选器；实证要另测。但作为「别信空头威胁」的思维工具仍极强。【分析】
:::

<!-- nav:实践转化 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <rect x="30" y="40" width="180" height="100" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="120" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">抽象</text>
  <text x="120" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">σᵏ→σ 且 BR</text>
  <rect x="250" y="40" width="180" height="100" rx="10" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">机制</text>
  <text x="340" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">ε 拉开支付</text>
  <rect x="470" y="40" width="180" height="100" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="560" y="80" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">现实</text>
  <text x="560" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">威胁压力测试</text>
</svg>
:::

| 领域 | 抽象对应 | 现实操作 |
|---|---|---|
| 进入威慑 | （Out, Fight）非完美 | 问：若对方误入，我还打价格战吗？ |
| 拍卖 | 剔弱劣势投标 | 别把「零概率事件上的怪投标」当均衡故事 |
| 谈判 | 最后通牒空话 | 对方误触红线时你是否真执行惩罚 |
| 多智能体 RL | 对抗噪声策略 | 评估在 ε-随机对手下是否仍最优 |
| 合规/安全 | 误操作可达 | 规程须在「偶发违规」下仍激励相容 |

# 从理论到行动

:::flow
取候选 NE <i>→</i> 列出支撑策略 <i>→</i> 注入 ε 颤抖 <i>→</i> 重算 BR <i>→</i> {.hi}判定是否完美 <i>→</i> 必要时改支付/承诺
:::

行动清单：

1. 把局面压成支付矩阵或扩展树（哪怕 2×2）。
2. 标出所有 NE，标出含弱劣势的。
3. 对可疑点做 ε=1%、5%、10% 压力测试（见下方工具）。
4. 若不稳健：要么放弃该预测，要么加承诺改 Δ。
5. 动态局面优先用扩展型扰动思维，而非只改正常型。

## 工具 1：弱劣势矩阵压力测试

2×2 教学矩阵（U/D × L/R）：U,L→(1,1)；其余格 (0,0)。NE：\((U,L)\) 与 \((D,R)\)。后者双方皆弱劣势，**不是**完美；前者是。【事实】

:::raw
<div class="tool" id="toolWd">
  <div class="ctrl">
    <label>候选均衡 <output id="wd_eqO">D,R（脆弱）</output></label>
    <input type="range" id="wd_eq" min="0" max="1" step="1" value="0">
    <label>对手颤抖 ε <output id="wd_epsO">5.0%</output></label>
    <input type="range" id="wd_eps" min="0.1" max="30" step="0.1" value="5">
  </div>
  <div class="readout">
    <div class="ro">意图行动支付 <b id="wd_int">0.000</b></div>
    <div class="ro">偏离行动支付 <b id="wd_dev">0.050</b></div>
    <div class="ro">差距 Δ <b id="wd_gap">-0.050</b></div>
    <div class="ro">是否仍 BR <b id="wd_br">否</b></div>
    <div id="wd_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="wdChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

## 工具 2：进入威慑的颤抖手检验

标准支付：垄断 2；斗争双方 -1；默许双方 1；不进入挑战者 0。ε=5% 时 E[斗争]=1.85、E[默许]=1.95。【事实】

:::raw
<div class="tool" id="toolEn">
  <div class="ctrl">
    <label>挑战者抖入概率 ε <output id="en_epsO">5.0%</output></label>
    <input type="range" id="en_eps" min="0.1" max="40" step="0.1" value="5">
    <label>垄断利润 M <output id="en_mO">2.0</output></label>
    <input type="range" id="en_m" min="0.5" max="5" step="0.1" value="2">
    <label>斗争时在位支付 <output id="en_fiO">-1.0</output></label>
    <input type="range" id="en_fi" min="-3" max="2" step="0.1" value="-1">
    <label>默许时在位支付 <output id="en_aiO">1.0</output></label>
    <input type="range" id="en_ai" min="-1" max="3" step="0.1" value="1">
  </div>
  <div class="readout">
    <div class="ro">E[斗争] <b id="en_fight">1.850</b></div>
    <div class="ro">E[默许] <b id="en_accom">1.950</b></div>
    <div class="ro">差距（默许−斗争） <b id="en_gap">0.100</b></div>
    <div class="ro">(Out,Fight) 完美？ <b id="en_perf">否</b></div>
    <div id="en_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="enChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

## 工具 3：承诺成本 C* 使威胁变完美

进入后斗争支付变为 \(f_i+C\)；当 \(f_i+C \ge a_i\) 时威胁在到达后仍最优，从而可对颤抖稳健。默认下 \(C^*=a_i-f_i=2.0\)。【事实】

:::raw
<div class="tool" id="toolC">
  <div class="ctrl">
    <label>承诺加成 C <output id="c_cO">0.0</output></label>
    <input type="range" id="c_c" min="0" max="5" step="0.1" value="0">
    <label>颤抖 ε <output id="c_epsO">5.0%</output></label>
    <input type="range" id="c_eps" min="0.1" max="30" step="0.1" value="5">
    <label>基础斗争支付 <output id="c_fiO">-1.0</output></label>
    <input type="range" id="c_fi" min="-3" max="1" step="0.1" value="-1">
    <label>默许支付 <output id="c_aiO">1.0</output></label>
    <input type="range" id="c_ai" min="-1" max="3" step="0.1" value="1">
  </div>
  <div class="readout">
    <div class="ro">有效斗争 f+C <b id="c_eff">-1.0</b></div>
    <div class="ro">C* 门槛 <b id="c_star">2.0</b></div>
    <div class="ro">到达后可信？ <b id="c_cred">否</b></div>
    <div class="ro">颤抖下斗争仍 BR？ <b id="c_br">否</b></div>
    <div id="c_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="cChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

## 工具 4：ε-proper 失误权重直觉

Myerson：若 A 比 B 差，则 \(P(A)\le\varepsilon\cdot P(B)\)。默认 K=3、ε=10% 时，均匀抖到最差约 33.3%，proper 加权约 0.9%（\(\varepsilon^{K-1}/Z\)，Z=1.11），压缩比约 37.0×。【事实】

:::raw
<div class="tool" id="toolPr">
  <div class="ctrl">
    <label>ε（proper） <output id="pr_epsO">10.0%</output></label>
    <input type="range" id="pr_eps" min="1" max="40" step="0.1" value="10">
    <label>策略数 K <output id="pr_kO">3</output></label>
    <input type="range" id="pr_k" min="2" max="6" step="1" value="3">
  </div>
  <div class="readout">
    <div class="ro">均匀抖到最差 <b id="pr_uni">33.3%</b></div>
    <div class="ro">proper 抖到最差 <b id="pr_prop">0.9%</b></div>
    <div class="ro">压缩比 <b id="pr_ratio">37.0×</b></div>
    <div class="ro">含义 <b id="pr_lab">贵失误被压制</b></div>
    <div id="pr_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="prChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

# 技能树

:::details ① 识别弱劣势（入门）
给定矩阵，标出对某对手策略严格差、对其余不更好的策略。二人情形下这几乎就是完美检验。【事实】
:::

:::details ② 写 ε-扰动期望支付（核心）
对手意图 \(s^*\)、以 ε 抖到其他：\(u = (1-\varepsilon)u(\cdot,s^*)+\varepsilon u(\cdot,s')\)。比较意图行动是否仍最优。
:::

:::details ③ 进入博弈完美性检验（应用）
标准支付下证明（Out, Fight）对任意 ε>0 失败；（In, Accom）可通过。【事实】
:::

:::details ④ 正常型 vs 扩展型（进阶）
能说明为何「抖策略」与「抖动作」不同，以及正常型完美可能非 SPNE。【事实】
:::

:::details ⑤ 对接序贯与 proper（高阶）
陈述：扩展型完美 ⇒ 序贯；proper ⊂ 完美；proper 约束失误成本排序。【事实】
:::

:::details ⑥ 机制上「制造完美」（实践）
设计 C 使威胁在到达后仍 BR，从而使威慑路径成为完美均衡。【分析】
:::

# 游戏化世界

你是「均衡压力测试员」。每个候选纳什是一座塔：

- **绿色塔**：任意小风（ε）吹不倒 → 颤抖手完美。
- **红色塔**：只有无风天才站得住 → 脆弱 NE。
- **任务**：找出红塔，或给它加「钢筋」（改支付/承诺）变成绿塔。

Boss 战：同时面临「SPNE 通过但颤抖手失败」的信息集谜题——奖励是看穿正常型/扩展型裂缝。

# 任务系统

| 任务 | 完成标准 | 奖励（能力） |
|---|---|---|
| T1 标弱劣势 | 一张 2×2/3×3 全标对 | 入门刀 |
| T2 ε 计算 | 手算进入博弈 ε=0.05 的 1.85 vs 1.95 | 数字感 |
| T3 双 NE 判定 | 弱劣势矩阵里指出唯一完美 | 精炼直觉 |
| T4 改支付 | 找到使 Fight 稳健的最小 C | 机制感 |
| T5 对比精炼 | 用一句话区分 SPNE / THP / 序贯 / proper | 图谱 |

# 反事实模拟

:::tabs
@@若完全没有失误
理性共同知识下，弱劣势 NE 可「技术上」成立——但任何真实世界的 ε 都会掀翻它。完美精炼正是拒绝这种刀刃世界。【分析】

@@若失误很大（ε=20%）
进入例：斗争 1.40、默许 1.80，差距 0.40——脆弱性更刺眼。大噪声下「近似最优」集合可能整体平移，需另用量化稳健性。【推论】

@@若开战因沉没成本变为进入后最优
则（Out, Fight）可同时是 SPNE 与颤抖手完美——威胁不再空头。精炼不反对威慑，只反对**不可执行**的威慑。【事实】

@@若只用正常型完美分析动态博弈
可能保留非 SPNE 的点，或漏掉信息集层面的动作稳健性。动态问题应优先扩展型完美/序贯。【分析】
:::

<!-- nav:能力与计划 -->
# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 辨认 | 能说出颤抖手在筛什么 | 用进入博弈讲清 |
| L2 计算 | 会算 ε-扰动下 BR | 通过本手册 4 个工具 |
| L3 选型 | 知道何时用扩展型/proper | 指出正常型陷阱 |
| L4 设计 | 能改规则使目标均衡变完美 | 给出 C* 或合同条款 |

# 30分钟最小实践

**成本 ≈ 0，产出可验证：**

1. 画标准进入博弈树（5 分钟）。
2. 写出（Out, Fight）与（In, Accom）两个 NE 候选（5 分钟）。
3. 取 ε=0.05，手算在位者斗争 vs 默许期望（10 分钟）→ 应得到 1.85 vs 1.95。
4. 用下方「进入颤抖」滑块核对，并写一句：哪个不是完美、为什么（10 分钟）。

完成标志：纸上数字与滑块一致，并能口述「任意 ε>0 开战都更差」。

# 7天计划

| 天 | 焦点 | 产出 |
|---|---|---|
| D1 | 弱劣势识别 | 2 张练习矩阵 |
| D2 | ε-BR 计算 | 进入博弈全 ε 表 |
| D3 | 经典 2×2 脆弱 NE | 标出唯一完美点 |
| D4 | SPNE vs THP | 半页对比笔记 |
| D5 | 正常型 vs 扩展型 | 一个反例提纲 |
| D6 | Proper 直觉 | 用「贵失误更少」改写一则 |
| D7 | 真实场景压测 | 选一则新闻威胁做 ε 检验 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 计算肌肉 | 10 个矩阵的完美性判定 |
| W2 | 精炼图谱 | 自绘 Nash–SPNE–THP–序贯–proper |
| W3 | 机制设计 | 3 个「加承诺变完美」案例 |
| W4 | 迁移 | 谈判/产品/多智能体各 1 份压力测试备忘 |

<!-- nav:模型与问题 -->
# 10 个核心模型

1. **扰动博弈极限**：完美 = 扰动 NE 序列极限。【事实】
2. **弱劣势剔除（二人）**：完美 ≈ 无弱劣势 NE。【事实】
3. **进入威慑非完美**：任意 ε>0 开战劣于默许。【事实】
4. **完全混合 NE ⇒ 完美**：支撑已覆盖全部抖动。【事实】
5. **完美 ⇒ SPNE**：扩展型；反之不必然。【事实】
6. **完美 ⇒ 序贯**：Kreps–Wilson；序贯沿极限、完美沿序列。【事实】
7. **Proper ⊂ 完美**：失误按成本排序。【事实】
8. **正常型 ≠ 扩展型完美**：扰动对象不同。【事实】
9. **支付敏感性**：添加严格劣势策略可改完美集。【事实】
10. **承诺改 Δ**：使威胁在颤抖下仍 BR。【分析】

# 关键问题清单

:::details Q1 如何快速怀疑一个 NE 不完美？
看支撑里是否有弱劣势；或问「对手抖 ε 后我是否仍想选它」。
:::

:::details Q2 为什么要「存在某一列」颤抖而不是「对所有颤抖」？
定义是存在性；「对所有」过强且常不存在。Proper 等再收紧失误结构。【分析】
:::

:::details Q3 实验里人的 ε 多大？
依任务而异，属【待验证】实证问题；规范结论常对任意小 ε 成立。
:::

:::details Q4 和演化稳定 ESS 什么关系？
都谈扰动稳健，但 ESS 是种群入侵，颤抖手是理性+失误极限——同构在「局部稳健」，机制不同。【分析】
:::

:::details Q5 多智能体 RL 怎么用？
评估策略在对手 ε-随机时的后悔；避免只在精确 BR 对手上过拟合。【推论】
:::

:::details Q6 有限博弈一定存在完美均衡吗？
是。Selten：有限（完美记忆）博弈存在颤抖手完美均衡。【事实】
:::

:::details Q7 混合均衡都完美吗？
**完全混合**的 NE 是完美的；支撑未盖全的混合 NE 仍可能不完美。【事实】
:::

:::details Q8 如何对老板一句话解释？
「别信那种只有对方永远不犯错才成立的计划。」
:::

:::details Q9 和可置信威胁手册怎么接力？
SPNE 问「到节点还做不做」；颤抖手问「对方偶发到达时你是否仍想做」。
:::

:::details Q10 何时升级到 proper？
当完美仍留下「靠很蠢的失误支撑」的点，或策略空间添加敏感时。【分析】
:::

# 下一阶段探索

- 精读 Selten 1975 与 Myerson 1978 原文定义差异。
- 对照 Van Damme《Stability and Perfection of Nash Equilibria》。
- 计算：用 gambit / 自己写求解器找小博弈的完美均衡。
- 跨域：控制论里的「噪声下镇定」、工程里的「故障安全」——同构于颤抖手稳健性。【分析】
- 下一本可接力：序贯均衡、proper equilibrium、稳定集（Kohlberg–Mertens）。

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 颤抖手完美定义与存在性 | 经典论文 | Selten, R. (1975). Reexamination of the perfectness concept… *IJGT* 4:25–55 | 【事实】 |
| 弱劣势与完美关系、批评 | 教材讲义 | MWG 风格讲义（Illinois 533）；Wikipedia Trembling hand perfect equilibrium | 【事实】/【分析】 |
| Proper equilibrium | 经典论文 | Myerson, R. (1978). Refinements of the Nash equilibrium concept. *IJGT* 7:73–80 | 【事实】 |
| 完美 ⇒ 序贯；沿序列 vs 极限 | 论文/讲义 | Kreps & Wilson (1982) *Econometrica*；Cramton Econ703 note4 | 【事实】 |
| 进入威慑教学支付与非完美性 | 标准教材例 | UCLA / 微观讲义常见 (0,2)/(-1,-1)/(1,1) | 【事实】 |
| ε=0.05 → 1.85 vs 1.95 | 自算 | \(2-3\varepsilon\) vs \(2-\varepsilon\) | 【事实】 |
| 跨域同构（噪声镇定） | 作者整合 | 控制/工程类比 | 【分析】/【推论】 |

标记：【事实】多方一致或经典定义；【分析】权威梳理；【推论】由模型推出；【假设】未验证；【待验证】单一来源或实证未稳。

# 免责声明 {.appendix}

本手册为**博弈论概念的认知与实践框架**，用于理解均衡精炼与决策压力测试，**不构成**投资、法律、并购或竞争策略建议。文中数值多为教学约定支付与自算示例；现实支付、失误率与信息结构需自行核验。决策后果自负。
