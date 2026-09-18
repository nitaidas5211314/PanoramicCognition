---
slug: 纳什均衡（Nash Equilibrium）：给定他人策略，无人能通过单方面改变策略获益的状态；有限博弈必存在（可能是混合策略）
title: 纳什均衡（Nash Equilibrium）：给定他人策略，无人能单方面获益；有限博弈必存在
subtitle: 均衡不是「对所有人都最好」，而是<strong>无人能靠单方面偏离获利</strong>。有限博弈至少有一个（可能是混合策略）；它常与帕累托最优<strong>不重合</strong>——这才是制度与策略真正要解的题。
brand_sub: Nash Equilibrium × Non-cooperative Games
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 纳什均衡, 混合策略, 囚徒困境, 最优反应, 非合作博弈]
theme_js_file: 纳什均衡（Nash Equilibrium）：给定他人策略，无人能通过单方面改变策略获益的状态；有限博弈必存在（可能是混合策略）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**纳什均衡（Nash Equilibrium, NE）**：策略组合 \((\sigma_1^*,\ldots,\sigma_n^*)\) 是纳什均衡，当且仅当对每个参与人 \(i\)，给定他人 \(\sigma_{-i}^*\)，\(\sigma_i^*\) 是 \(i\) 的最优反应——**无人能靠单方面改变策略提高自身期望支付**。【事实】

John Nash（1950 PNAS；1951 *Annals*）证明：每个**有限**博弈（有限参与人、每人有限纯策略）至少存在一个均衡，必要时在**混合策略**中。【事实】1994 年诺贝尔经济学奖授予 Nash、Harsanyi、Selten，表彰非合作博弈均衡分析。【事实】

关键辨析：NE 是**稳定点**，不是**社会最优**。囚徒困境的（坦白，坦白）是唯一 NE，却严格劣于（合作，合作）。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「谁更聪明」，而是：在无法签订有约束力合同的互动里，**相互最优反应**如何锁定结果，以及何时锁定的是坏结果。

边界：

- **在界内**：最优反应、纯/混合 NE、存在性、多重均衡、精炼（SPNE、颤抖手）、与帕累托的关系、古诺/伯特兰等应用原型。
- **在界外**：合作博弈的核与 Shapley（另册）、具体法庭程序、某只股票的买卖点——除非压成「策略互动是否达 NE」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 非合作互动中的相互最优反应固定点 |
| 2 | 边界在哪 | 到「策略型 / 支付 / 信念一致性」可形式化为止 |
| 3 | 核心对象 | 策略型博弈、最优反应对应、均衡点、混合扩展 |
| 4 | 参与者 | 理性（或近似理性）的决策主体：人、企业、国家、算法 |
| 5 | 关键变量 | 支付矩阵、策略空间大小、信息结构、贴现因子、噪声 |
| 6 | 可直接观察 | 价格、产量、出价、公开行动、市场结果 |
| 7 | 无法直接观察 | 混合意图、对他人策略的信念、偏离动机 |
| 8 | 谁影响谁 | 他人策略 → 我的最优反应 → 他人再反应 → 固定点 |
| 9 | 因果关系 | 相互最优反应 ⇒ 无单方有利偏离 ⇒ 局部稳定 |
| 10 | 只是相关 | 「大家都这么做」≠ NE；习惯可相关但非最优反应【分析】 |
| 11 | 表层现象 | 价格战、军备竞赛、堵车、合谋破裂、猜拳随机化 |
| 12 | 底层机制 | 最优反应对应的不动点（Kakutani / Brouwer） |
| 13 | 有反馈吗 | 有。结果改写信念 → 下一期最优反应 |
| 14 | 有延迟吗 | 有。学习、调整、制度滞后使「瞬时 NE」成过程 |
| 15 | 正/负反馈 | 挤兑/价格战可正反馈；监管与合同可负反馈压坏均衡 |

## 最关键的一句话

> 纳什均衡回答的是「给定彼此预期，谁还有偏离动机」——不是「集体是否满意」。

# 为什么值得研究

:::cards g3
### 它是非合作博弈的通用语言
寡头、拍卖、谈判、军备、平台竞争——几乎所有「无法强制履约」的互动，都以 NE 为基准解。【事实】

### 它解释「理性却糟糕」
个体最优反应可以锁死集体坏结果；制度设计的任务往往是**改支付、改规则，从而改 NE**。【分析】

### 它强制你区分稳定与合意
「市场停在某点」只说明可能是 NE；要问是否帕累托改进空间、是否多重、是否需精炼。【推论】
:::

:::note amber 最贵的一次误判
把「均衡」听成「最优」。谈判桌上有人说「这是均衡解」，你要追问：对谁稳定？有没有更好的可行组合被单方激励挡住？【分析】
:::

# 世界地图

九层看纳什均衡如何从「支付矩阵」长成「制度与精炼」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="neArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 改规则以挑选合意均衡</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 精炼族 · SPNE / 颤抖手 / 序贯 / 相关均衡</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 动态与重复 · 贴现、无名氏、威胁可信性</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 不完全信息 · 贝叶斯–纳什（Harsanyi）</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 多重与选择 · 协调失败 / 谢林点 / 风险占优</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 存在性 · 有限博弈 ⇒ 混合策略 NE（Nash 1950）</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 混合扩展 · 无差异条件 + 支撑集最优反应</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 纯策略 NE · 相互最优反应的确定性行动</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 策略型博弈 · 参与人 · 策略 · 支付</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L3→L4**：许多博弈没有纯策略 NE，但混合扩展后必有；进阶卡在 **L5** 与 **L8**——找到 NE 不等于预测结果，多重与不可信威胁要另解。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="200" y="16" width="280" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">策略组合 σ</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">BRᵢ(σ₋ᵢ) 最优反应</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">σᵢ ∈ BRᵢ 相互</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">不动点 = NE</text>

  <line x1="300" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="380" y1="60" x2="550" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="200" width="280" height="56" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="180" y="234" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">NE ≠ 帕累托最优（常分离）</text>
  <rect x="360" y="200" width="280" height="56" rx="8" fill="#15181d"/><text x="500" y="234" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">有限 ⇒ ∃ 混合 NE</text>

  <line x1="340" y1="152" x2="180" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#cmB)"/>
  <line x1="550" y1="152" x2="500" y2="200" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <text x="340" y="300" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">抽象：不动点　·　机制：无差异/支撑集　·　操作：划线法、混合方程、精炼</text>
  <text x="340" y="330" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">红色虚线：稳定不等于合意——制度改的是支付与信息，不是道德劝说</text>
</svg>
:::

# 核心参与者

:::cards g3
### 理论奠基者
von Neumann–Morgenstern（1944）零和；Nash（1950/51）n 人非合作；Harsanyi 不完全信息；Selten 精炼。【事实】

### 应用解释者
产业组织（古诺/伯特兰）、拍卖与匹配、宏观政策博弈、演化博弈与 ESS、AI 多智能体。【分析】

### 你自己
定价、竞标、谈判、协作——只要对方也会反应，你就在找（或破坏）某个 NE。【推论】
:::

# 核心变量

| 变量 | 含义 | 为什么重要 |
|---|---|---|
| 支付 \(u_i\) | 结果对 \(i\) 的效用 | 改支付 = 改 NE |
| 策略空间 \(S_i\) | 可选行动/混合单纯形 | 有限性支撑存在性定理 |
| 最优反应 \(BR_i\) | 给定他人时的最优集 | NE ⟺ \(\sigma_i\in BR_i(\sigma_{-i})\) |
| 混合概率 \(p\) | 支撑集上的随机化 | 常为「让对手无差异」 |
| 均衡个数 | 0 不可能（有限）/1/多 | 多重 ⇒ 选择问题 |
| 信息结构 | 完全/不完全、完美/不完美 | 决定贝叶斯–纳什还是纯 NE |
| 贴现因子 \(\delta\) | 未来权重 | 重复博弈中合作可否成为 NE |

<!-- nav:机制与激励 -->
# 因果关系

因果主链：

:::raw
<div class="flow"><span>支付结构</span><i>→</i><span>最优反应</span><i>→</i><span class="hi">相互一致</span><i>→</i><span class="hi">纳什均衡</span><i>→</i><span>可观察结果</span></div>
:::

**实线因果**：支付与信息 → 最优反应对应 → 不动点（NE）。【事实】

**红色虚线反馈**：观察到的结果更新信念 → 改写下一期最优反应——学习动力学可收敛到、离开或在多个 NE 间摆动。【分析】

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="40" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="85" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">支付/信息</text>
  <rect x="180" y="40" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="235" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">最优反应</text>
  <rect x="330" y="40" width="110" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="385" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">不动点 NE</text>
  <rect x="480" y="40" width="160" height="44" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="560" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">价格/产量/行动</text>
  <line x1="140" y1="62" x2="180" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <line x1="290" y1="62" x2="330" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <line x1="440" y1="62" x2="480" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <path d="M560 84 L560 150 L85 150 L85 84" fill="none" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="5,4" marker-end="url(#cfB)"/>
  <text x="340" y="175" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：结果被观察 → 更新信念 → 改写下期最优反应</text>
  <text x="340" y="200" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">实线=均衡定义链；红虚线=学习/适应动力学</text>
</svg>
:::

# 隐藏关系

:::cards g2
### 混合不是「犹豫」
均衡混合常是为了让对手无差异；你随机化是为了**保护自己不被剥削**，不是因为没想清楚。【事实】

### 存在 ≠ 唯一 ≠ 可预测
有限博弈必有 NE，但可有多个；分析者与参与人都可能卡在选择问题上。【事实】

### NE 可被「相关信号」改进
Aumann 相关均衡允许公共推荐，支付可严格优于任何 NE——红绿灯即原型。【事实】

### 行为常偏离经典 NE
实验与机器学习研究显示：人类常停在 level-k / 量化反应，而非精确 NE；有报告称经典 NE 对人类行为「完整度」约 22%。【待验证】
:::

# 系统运行机制

1. **给定**他人策略信念；
2. **计算**最优反应（纯或混合）；
3. **要求**信念与他人实际策略一致；
4. **固定点**即 NE；偏离者不获利（期望意义下）。

二人零和特例：NE 与极大极小值重合，均衡支付唯一。【事实】一般非零和：均衡支付可因均衡点不同而不同。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="100" r="10" fill="#0f8a4d"/><text x="80" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1944</text><text x="80" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">vN-M 零和</text>
  <circle cx="200" cy="100" r="10" fill="#1d4ed8"/><text x="200" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1950–51</text><text x="200" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Nash 存在性</text>
  <circle cx="320" cy="100" r="10" fill="#3b6ef5"/><text x="320" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1960–70s</text><text x="320" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">精炼/贝叶斯</text>
  <circle cx="440" cy="100" r="10" fill="#b8730a"/><text x="440" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1994</text><text x="440" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">诺贝尔奖</text>
  <circle cx="580" cy="100" r="10" fill="#d5342c"/><text x="580" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">2010s–</text><text x="580" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">AI/行为偏离</text>
  <line x1="90" y1="100" x2="190" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="210" y1="100" x2="310" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="330" y1="100" x2="430" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="450" y1="100" x2="570" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
</svg>
:::

学习视角：最优反应动力学、虚构对局、演化动力学——收敛条件严格，实践中常见「近似 NE」与持续波动。【分析】

# 利益与激励

| 角色 | 想要什么 | 与 NE 的关系 |
|---|---|---|
| 参与人 | 最大化自身支付 | NE 是「无人可单方改进」的约束 |
| 监管者 | 社会效率 / 公平 | 常需改规则，把坏 NE 推走 |
| 平台/机制设计者 | 诱导合意结果 | 设计使真话/合作成为 NE |
| 分析者 | 预测与比较 | NE 是基准，不是唯一预测器 |

激励核心：**单方偏离无利**——任何「口头协议」若不改变支付或信息，就改变不了 NE。【推论】

# 资源与信息流

资金流「抽水」隐喻：坏均衡如何把社会剩余抽走。

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">潜在合作剩余</text><text x="110" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">（帕累托前沿）</text>
  <rect x="270" y="30" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">单方偏离激励</text><text x="340" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">（背叛诱惑）</text>
  <rect x="500" y="30" width="140" height="60" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="570" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">NE 锁定低效</text><text x="570" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">（剩余被抽走）</text>
  <line x1="180" y1="60" x2="270" y2="60" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#flA)"/>
  <line x1="410" y1="60" x2="500" y2="60" stroke="#d5342c" stroke-width="1.8" marker-end="url(#flB)"/>
  <rect x="150" y="140" width="380" height="70" rx="10" fill="#15181d"/><text x="340" y="170" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">信息流：信念 ↔ 策略；资源流：支付差 = 偏离租金</text>
  <text x="340" y="195" text-anchor="middle" fill="#a8b0ba" font-size="11" font-family="sans-serif">制度注入：惩罚/补贴/公开信号 → 改变租金 → 改 NE</text>
</svg>
:::

经典囚徒困境：合作剩余每边多 2（3 vs 1），但背叛诱惑把系统抽到（1,1）。【事实】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 |
|---|---|---|
| 1 | **改支付**（奖惩、补贴、罚款） | 直接移动最优反应 |
| 2 | **改信息**（披露、审计、公共信号） | 改变信念一致点 |
| 3 | **缩小策略空间**（禁用选项） | 剔除坏均衡支撑 |
| 4 | **引入相关信号**（红绿灯式推荐） | 可达优于 NE 的相关均衡 |
| 5 | **重复与贴现** | 使合作成为 NE（无名氏） |
| 6 | **承诺装置** | 让威胁/许诺可信（进 SPNE） |
| 7 | **默契焦点**（谢林点） | 多重 NE 时便宜协调 |
| 8 | **精炼筛选** | 剔除不可信/脆弱均衡 |
| 9 | **匹配对手类型** | 换博弈对象 = 换矩阵 |
| 10 | **算法噪声设计** | 多智能体中探索率改变收敛 |

# 常见认知陷阱

:::details 陷阱 1 · 把均衡当成最优
NE 只保证稳定，不保证效率。先问帕累托差距。
:::

:::details 陷阱 2 · 找不到纯策略就说「没有均衡」
有限博弈必有混合 NE。猜硬币就是标准例子。
:::

:::details 陷阱 3 · 以为混合是「随便选」
均衡混合由无差异方程钉死；偏离概率会被剥削。
:::

:::details 陷阱 4 · 用「平均历史频率」直接当 NE
频率可能是学习瞬态，未必是均衡；需检验最优反应条件。
:::

:::details 陷阱 5 · 忽略多重均衡
「算出来了一个」不等于「会实现这一个」。
:::

:::details 陷阱 6 · 动态博弈只用策略型 NE
不可信威胁可能支撑虚假 NE——需要 SPNE / 逆向归纳。
:::

:::details 陷阱 7 · 把实验室偏离当成「人不理性所以无用」
偏离模式本身可建模（QR、level-k）；NE 仍是基准。【分析】
:::

:::details 陷阱 8 · 零和直觉套到非零和
非零和里可以双赢或双输；合作空间是否存在要先看支付结构。
:::

:::details 陷阱 9 · 口头协议当约束
无强制执行的协议不改变策略型；除非改支付或信息。
:::

:::details 陷阱 10 · 无限策略空间仍套「必存在」
Nash 定理要**有限**纯策略；连续策略需额外条件（拟凹等）。【事实】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象 | 现实机制 | 可操作动作 |
|---|---|---|
| 最优反应 | 「给定对方，我怎么最好」 | 写对方策略假设再决策 |
| 混合 NE | 不可预测性 | 竞标/安检/抽检随机化 |
| 坏 NE | 价格战、公地悲剧 | 改规则或引入第三方 |
| 多重 NE | 左右行驶、技术标准 | 制造焦点或强制标准 |
| 精炼 | 威胁是否可信 | 检查偏离后是否真愿执行 |

# 从理论到行动

:::cards g3
### 诊断
画出 2×2 或简化矩阵：谁、选项、支付。标出纯 NE（划线法）。【推论】

### 干预
列杠杆：罚、奖、披露、重复、承诺——选成本最低能移动 BR 的一项。【分析】

### 验证
干预后是否还有单方偏离动机？有则未改到新 NE。【推论】
:::

# 技能树

:::details ① 基础：划线找纯 NE
对每一列标出行最优；对每一行标出列最优；双标单元格 = 纯 NE。
:::

:::details ② 中级：混合无差异方程
支撑集内纯策略期望支付相等；支撑外不优于。解 \(p^*,q^*\)。
:::

:::details ③ 高级：存在性与精炼直觉
有限 ⇒ 存在；动态用 SPNE；脆弱用颤抖手；协调用相关均衡。
:::

:::details ④ 专家：改博弈
机制设计：先定目标结果，再设计使该结果成 NE（或更好解概念）的规则。
:::

# 游戏化世界

你是「均衡测绘员」：每进入一个冲突场景，任务是标出当前 NE、帕累托前沿、以及最小成本移动路径。得分不看「说服了谁」，看「是否消除了单方偏离租金」。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| T1 找一个纯 NE | 对真实或虚构 2×2 完成划线 |
| T2 解一个混合 NE | 猜硬币或性别战争出 \(p^*,q^*\) |
| T3 量帕累托差距 | 报告 NE 支付 vs 合作支付 |
| T4 设计一次干预 | 写出改哪一格支付、为何移动 BR |
| T5 检查威胁可信 | 动态故事里标出不可信节点 |

# 反事实模拟

若禁止混合策略，猜硬币类博弈将**没有** NE——存在性依赖混合扩展。【事实】

若把囚徒困境的背叛支付从 5 降到 2.5（小于合作 3），则合作可成纯 NE。【推论】

若古诺边际成本上升，NE 产量下降、价格上升——成本冲击经最优反应传导。【事实】

## 可调模型 1 · 猜硬币：最优反应与混合 NE

标准匹配便士：匹配得 +1，否则 −1。对手出正面概率为 \(q\) 时，\(EU(H)=2q-1\)，\(EU(T)=1-2q\)。无差异 ⇒ \(q^*=1/2\)；对称地 \(p^*=1/2\)，均衡期望支付 **0**。

默认 \(p=0.50\)，\(q=0.50\) → 双方无差异，位于唯一混合 NE。

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
    <div id="mp_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="mp_vh">q=0.50 → 无差异；唯一 NE 为 (p*,q*)=(0.50,0.50)，EU=0</span></div>
  </div>
  <canvas id="mpChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 囚徒困境：NE 与帕累托差距

经典支付：合作/合作 = \(R\)，合作/背叛 = \(S\)，背叛/合作 = \(T\)，背叛/背叛 = \(P\)。当 \(T>R>P>S\) 且 \(2R>T+S\) 时，（背叛，背叛）为唯一纯 NE，合作剩余差距为 \(R-P\)。

默认 \(R=3,S=0,T=5,P=1\) → NE 支付各 **1**，帕累托差距 **2**。

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
    <div class="ro">是否经典 PD<strong id="pd_is">是</strong></div>
    <div class="ro">纯 NE<strong id="pd_ne">(D,D)</strong></div>
    <div class="ro">差距 R−P<strong id="pd_gap">2.0</strong></div>
    <div id="pd_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="pd_vh">T&gt;R&gt;P&gt;S 成立 → 唯一纯 NE=(D,D)；合作各得 3，均衡各得 1，差距 2</span></div>
  </div>
  <canvas id="pdChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 性别战：双重纯 NE + 混合

歌剧/足球：同去歌剧 (a,1)，同去足球 (1,b)，错配 (0,0)。默认 \(a=2,b=2\) 时纯 NE 为 (歌剧,歌剧) 与 (足球,足球)；混合 \(p^*=b/(1+b)=2/3\)（行去歌剧概率），\(q^*=1/(1+a)=1/3\)（列去歌剧概率），行期望支付 **2/3≈0.67**。

:::raw
<div class="tool" id="tool_bos">
  <div class="ctrl">
    <label>行偏好强度 a <output id="bos_aO">2.0</output></label>
    <input type="range" id="bos_a" min="1.1" max="5" step="0.1" value="2.0"/>
    <label>列偏好强度 b <output id="bos_bO">2.0</output></label>
    <input type="range" id="bos_b" min="1.1" max="5" step="0.1" value="2.0"/>
  </div>
  <div class="readout">
    <div class="ro">混合 p*（行歌剧）<strong id="bos_p">0.667</strong></div>
    <div class="ro">混合 q*（列歌剧）<strong id="bos_q">0.333</strong></div>
    <div class="ro">混合下 EU行<strong id="bos_eu">0.667</strong></div>
    <div id="bos_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="bos_vh">两纯 NE + 一混合；混合 EU=0.667 低于任一协调纯 NE——协调失败代价可见</span></div>
  </div>
  <canvas id="bosChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 古诺双寡头 NE

逆需求 \(P=a-b(q_1+q_2)\)，边际成本 \(c\)。对称 NE：\(q_i^*=(a-c)/(3b)\)。默认 \(a=100,b=1,c=10\) → \(q^*=30\)，\(P^*=40\)，单厂利润 **900**。

:::raw
<div class="tool" id="tool_cou">
  <div class="ctrl">
    <label>截距 a <output id="cou_aO">100</output></label>
    <input type="range" id="cou_a" min="40" max="200" step="1" value="100"/>
    <label>斜率 b <output id="cou_bO">1.0</output></label>
    <input type="range" id="cou_b" min="0.2" max="3" step="0.1" value="1.0"/>
    <label>边际成本 c <output id="cou_cO">10</output></label>
    <input type="range" id="cou_c" min="0" max="80" step="1" value="10"/>
  </div>
  <div class="readout">
    <div class="ro">q*<strong id="cou_q">30.0</strong></div>
    <div class="ro">P*<strong id="cou_P">40.0</strong></div>
    <div class="ro">利润 π*<strong id="cou_pi">900</strong></div>
    <div id="cou_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="cou_vh">对称古诺 NE：各产 30，价 40，利润 900；垄断产量会是 45——竞争把产量推高、利润压低</span></div>
  </div>
  <canvas id="couChart" height="214"></canvas>
</div>
:::

:::tabs
@@禁止随机化
猜硬币无纯 NE，定理前提被破坏——「必存在」依赖混合扩展。

@@降低背叛诱惑
把 T 滑到 ≤R，PD 结构瓦解，合作可成 NE——制度罚款的数学对应。

@@协调失败
性别战停在混合时双方都更差；谢林点 / 通信可把系统推到纯 NE。
:::

# 四级能力路线

| 级别 | 能力 |
|---|---|
| L1 | 用划线法找纯 NE，并说出「稳定≠最优」 |
| L2 | 解 2×2 混合 NE，解释无差异条件 |
| L3 | 诊断多重/动态问题，知道何时要精炼 |
| L4 | 设计最小干预使合意结果成为（近似）NE |

# 30分钟最小实践

1. 选一件真实冲突（分工、定价、约会地点、加班协作）。
2. 压成 2×2：两人、两行动、粗估支付（1–5 分即可）。
3. 划线找纯 NE；若无，写出混合直觉（谁要让谁无差异）。
4. 写一句：**若要改善结果，最小改哪一格支付或哪条信息？**

成本≈0，产出=一张「均衡诊断卡」。

# 7天计划

| 日 | 动作 |
|---|---|
| D1 | 重做猜硬币无差异推导 |
| D2 | 划线解一个自制 PD |
| D3 | 解性别战混合，对比纯 NE 支付 |
| D4 | 用模型 4 看成本冲击 |
| D5 | 找一则新闻标「坏 NE」 |
| D6 | 列出 3 个精炼关键词适用场景 |
| D7 | 复盘：本周哪次决策忽略了对方最优反应 |

# 30天计划

周1：2×2 纯/混合手算；周2：把工作中的 3 个冲突建成矩阵；周3：设计并试行一次「改支付/改信息」干预；周4：阅读一篇精炼或相关均衡短文，写半页对照笔记。

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **最优反应不动点**：\(\sigma_i\in BR_i(\sigma_{-i})\) ∀i。【事实】
2. **Nash 存在性（有限）**：Kakutani / Brouwer 证明路线。【事实】
3. **囚徒困境**：唯一 NE 严格劣于帕累托。【事实】
4. **猜硬币 / RPS**：无纯 NE，唯一对称混合。【事实】
5. **性别战 / 猎鹿**：多重 NE + 选择问题。【事实】
6. **古诺产量竞争**：连续策略下的可微 NE。【事实】
7. **贝叶斯–纳什**：不完全信息下的类型条件最优。【事实】
8. **子博弈精炼**：剔除不可信威胁。【事实】
9. **相关均衡**：公共信号改进可行支付集。【事实】
10. **演化稳定策略**：无需完全理性的稳定概念。【分析】

# 关键问题清单

:::details Q1 这是不是相互最优反应？
给定对方策略，我是否还有更好单方偏离？
:::

:::details Q2 有没有纯策略 NE？
划线法；没有则进入混合。
:::

:::details Q3 混合概率由什么钉住？
无差异方程；支撑集外是否更差？
:::

:::details Q4 NE 与帕累托差多少？
量化 \(R-P\) 或等价剩余——干预预算上限。
:::

:::details Q5 是否多重？
有几个？焦点/风险占优/通信能否选？
:::

:::details Q6 动态威胁可信吗？
需要 SPNE 吗？
:::

:::details Q7 信息是否不完全？
应升维到贝叶斯–纳什吗？
:::

:::details Q8 相关信号能否改进？
有没有便宜的「红绿灯」？
:::

:::details Q9 行为是否系统偏离 NE？
用 level-k / QR 作稳健核对。【分析】
:::

:::details Q10 最小干预是什么？
改一格支付、一条披露、一次重复承诺——选成本最低者。
:::

# 下一阶段探索

- 占优策略与反复剔除（下一队列主题）
- 子博弈精炼与逆向归纳
- 相关均衡 vs 纳什
- 行为博弈：量化反应与 level-k
- 与「共同知识」手册交叉：NE 的认知辩护常需 CKR

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 存在性定理（Kakutani） | 原始论文 | Nash, *Equilibrium points in n-person games*, PNAS 1950 | 【事实】 |
| Brouwer 版证明 | 原始论文 | Nash, *Non-Cooperative Games*, Annals of Mathematics 1951 | 【事实】 |
| 1994 诺贝尔奖 | 官方 | NobelPrize.org：Harsanyi, Nash, Selten | 【事实】 |
| 均衡精炼动机 | 官方新闻稿 | 1994 Economics Prize Press Release（多重均衡与不可信威胁） | 【分析】 |
| 混合策略教学推导 | 教材讲义 | 如 Stacchetti / Cramton 等 Matching Pennies 讲义 | 【事实】 |
| 人类偏离 NE | 实证研究摘要 | Nat. Hum. Behav. 相关报道：经典 NE 完整度约 22% 等 | 【待验证】 |
| 混合动机博弈综述 | 综述 | 混合博弈求解与应用综述（含 PD 原型与 AI 进展） | 【分析】 |
| 相关均衡概念 | 经典论文 | Aumann 相关均衡传统 | 【事实】 |

标记约定：【事实】多方一致或原始定义；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或转载链长。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，不构成投资、法律、军事或商务决策建议。博弈模型高度简化，现实中的支付、信息与理性假设常被违反；据此行动的风险由读者自行承担。涉及商业合谋等行为时，须遵守所在司法辖区的反垄断与其它强制法——模型描述不等于行动许可。
