---
slug: 收益-支付（Payoff）：结果对每个参与人的效用值，博弈的本质是-收益矩阵-而非道德评价
title: 收益/支付（Payoff）：结果对每个参与人的效用值，博弈的本质是"收益矩阵"而非道德评价
subtitle: 矩阵格里的数字不是「谁对谁错」，而是<strong>每个参与人对该结果的效用</strong>。博弈论比的是收益矩阵；道德评价、金钱账面、社会偏好——全都可以写进矩阵，但写错了，整盘推理都会精密地错。
brand_sub: Payoff × Utility Matrix
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 收益, 支付, 效用, 收益矩阵]
theme_js_file: 收益-支付（Payoff）：结果对每个参与人的效用值，博弈的本质是-收益矩阵-而非道德评价.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**收益/支付（Payoff）** 是结果对每个参与人的**效用值**：策略剖面落定后，每人得到一个数字；这些数字排成矩阵（或函数），就是整盘博弈的「计分板」。

三层含义：

1. **效用，不是道德分**：背叛在囚徒困境里得分高，不代表「背叛是对的」——只代表在该模型写下的偏好里，背叛支付更高。【事实】
2. **矩阵决定游戏类型**：同样两个行动标签「合作/背叛」，改一下数字，可以从囚徒困境变成猎鹿、懦夫或和谐博弈。【事实】
3. **尺度有规矩**：序数效用只保排序；von Neumann–Morgenstern（vNM）基数效用允许期望运算，且只在**正仿射变换** \(u' = au + b\ (a>0)\) 下等价。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

这里研究的不是「怎么算谁更赚钱」，而是：**结果如何被翻译成可比的数字，以及这些数字如何决定最优反应与均衡**。

边界：

- **在界内**：支付函数 \(u_i\)、策略型矩阵、期望支付、序数/基数、零和与常和、可转移效用（TU）与不可转移效用（NTU）、社会偏好改写矩阵。
- **在界外**：会计科目细节、税法条文、神经奖赏回路——除非被压缩成可写入 \(u_i\) 的维度。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 支付如何表示偏好，以及矩阵如何决定博弈结构 |
| 2 | 边界在哪 | 到「结果→效用数字」可写入为止；无法写入的动机只能当外生噪声 |
| 3 | 核心对象 | 结果、支付函数、矩阵格、期望支付、仿射类 |
| 4 | 参与者 | 凡承担后果的人/组织/算法——每人一张「计分尺」 |
| 5 | 关键变量 | \(T,R,P,S\)、风险态度、利他权重 \(\alpha\)、转移可行性、信息 |
| 6 | 可直接观察 | 金钱、刑期、得分、实验转移额——**都是代理，不是效用本身** |
| 7 | 无法直接观察 | 真实 \(u_i\)、人际可比性、私有参考点 |
| 8 | 谁影响谁 | 策略剖面 → 结果 → 支付 → 最优反应 → 他人支付（闭环） |
| 9 | 因果关系 | 改矩阵 → 占优/均衡可能跳变；改 \(\alpha\) → 同一金钱矩阵变另一种游戏 |
| 10 | 只是相关 | 「账面利润高」与「决策者更偏好」——代理与效用常脱钩【分析】 |
| 11 | 表层现象 | 合作/背叛、竞价、军备、价格战 |
| 12 | 底层机制 | 给定信念下最大化期望支付（或行为替代规则） |
| 13 | 有反馈吗 | 有。支付被观察 → 信念/规范更新 → 下一期有效支付可能变 |
| 14 | 有延迟吗 | 有。声誉、制度、习惯把远期支付折现进今天的有效 \(u\) |
| 15 | 正/负反馈 | 「人人盯短期支付」可螺旋恶化；惩罚规范可把背叛支付压下去 |

## 最关键的一句话

> 支付回答的是「**在这个模型里，每个结果对每个参与人值多少**」；博弈论比较的是收益矩阵，不是人格的道德评分表。

# 为什么值得研究

:::cards g3
### 它是策略比较的唯一尺子
没有支付，就没有「更好」「最优反应」「均衡」。策略剖面要能排序，必须先有 \(u_i\)。

### 它决定你玩的是哪一种游戏
斯坦福百科对囚徒困境的标准结构是 \(T>R>P>S\)（诱惑>奖励>惩罚>傻瓜）；MIT 17.810 讲义强调：只要保序，具体数字可变，结构不变。【事实】换序，游戏类型就变。

### 它直接接到谈判、机制、AI 奖励
合同设计改的是支付；对齐问题改的是奖励函数——二者都是「改矩阵」，不是「讲道理」。
:::

:::note amber 一个必须先吞下的区分
「参与人最大化支付」在标准表述里近乎同义反复：支付就是用来描述一致选择的尺子。【分析】真正的问题从来不是「人会不会最大化」，而是：**你写进矩阵的东西，是否抓住了决策者在乎的维度**。金钱矩阵上的「背叛占优」+ 现实里的合作，往往是效用写漏了公平/重复/声誉。
:::

# 世界地图

九层看「支付」如何从结果长成可计算对象。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="payArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 直接改写支付与可行集</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 合作博弈 · TU / NTU · Shapley / 核</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 行为支付 · 前景理论 / 参考点 / 概率加权</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 社会偏好 · 利他 / 公平 / 相对地位改写矩阵</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 期望支付 · 混合策略下的 EU</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 尺度规矩 · 序数 vs vNM 基数 · 正仿射等价</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 策略型矩阵 · 每格一个支付向量 (u₁,…,uₙ)</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 结果空间 · 策略剖面映射到物理/制度结果</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 偏好原语 · 什么更好、差多少、能否期望</text>
</svg>
:::

:::note blue 读图要点
入门最常卡在 **L2→L3**：把「坐牢年数」「利润万元」直接当效用。代理可以进矩阵，但要声明尺度假设；否则混合纳什的无差异方程会变成假精确。
:::

# 核心概念地图

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="pcA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="pcB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="220" y="16" width="240" height="48" rx="10" fill="#15181d"/><text x="340" y="46" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" font-family="sans-serif">支付 Payoff</text>

  <rect x="30" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="120" y="132" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">结果 ω</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="132" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">效用 uᵢ(ω)</text>
  <rect x="470" y="100" width="180" height="52" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="560" y="132" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">矩阵 / 函数</text>

  <line x1="300" y1="64" x2="120" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#pcA)"/>
  <line x1="340" y1="64" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#pcA)"/>
  <line x1="380" y1="64" x2="560" y2="100" stroke="#d5342c" stroke-width="1.5" marker-end="url(#pcB)"/>

  <rect x="80" y="200" width="220" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="190" y="230" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">序数：只保排序</text>
  <rect x="380" y="200" width="220" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="490" y="230" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">vNM 基数：可算 EU</text>

  <rect x="140" y="280" width="400" height="48" rx="8" fill="#f3f4f6"/><text x="340" y="310" text-anchor="middle" fill="#454c56" font-size="13" font-family="sans-serif">最优反应 / 均衡 = 在支付尺子上比大小</text>
</svg>
:::

| 概念 | 在系统里的作用 | 常见误读 |
|---|---|---|
| 支付 / 效用 | 偏好的数字表示 | 「快乐值」或「道德分」 |
| 收益矩阵 | 策略剖面 → 支付向量 | 「现实利润表」 |
| 序数效用 | 纯策略比较够用 | 「数字大小无意义」——相对大小仍有意义 |
| vNM 基数 | 混合与风险下的期望 | 「绝对零点像温度」——无；可平移缩放 |
| 正仿射变换 | 保期望排序与最优反应 | 「任意单调变换都行」——混合时不行 |

# 核心参与者

这里的「参与者」是元层面的：谁在真实世界里定义、改写、承受支付。

:::cards g2
### 决策主体本人
效用是**各自**的。A 的 5 与 B 的 5 默认不可比；人际比较需要额外假设（合作博弈 NTU 扩展里的权重）。【事实】

### 机制设计者 / 平台 / 监管
改规则 = 改可行结果与支付。罚金、补贴、排名算法都是「外生改矩阵」。

### 实验者与建模者
实验室用金钱诱导偏好；建模者把故事压成 \(T,R,P,S\)。诱导失败或压缩失真，是支付层最常见的系统性误差。【分析】

### 算法与多智能体
奖励函数 \(r(s,a)\) 就是支付。奖励错设（reward misspecification）= 写错矩阵后的工程灾难。
:::

# 核心变量

| 变量 | 符号 | 为何关键 | 可观测代理 |
|---|---|---|---|
| 诱惑 / 奖励 / 惩罚 / 傻瓜 | \(T,R,P,S\) | 决定 2×2 对称博弈类型 | 刑期、奖金、实验点数 |
| 仿射尺度 | \(a>0,b\) | 改标尺不改（vNM）最优反应 | 货币单位、零点平移 |
| 混合概率 | \(p,q\) | 期望支付的权重 | 行动频率 |
| 利他/公平权重 | \(\alpha,\beta\) | 金钱 PD 可变成非 PD | 实验转移、问卷 |
| 风险态度 | \(r\)（如 CRRA） | 金钱≠效用；CE 与 RP | 彩票选择 |
| 可转移性 | TU vs NTU | 旁支付能否一比一转移效用 | 合同、现金、不可分物品 |
| 贴现因子 | \(\delta\) | 重复博弈把未来支付折进今天 | 关系长度、利率 |

# 因果关系

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="cauA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cauB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="90" y="60" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">偏好 / 规范</text>
  <rect x="200" y="30" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="270" y="60" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">支付矩阵</text>
  <rect x="380" y="30" width="140" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="450" y="60" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">最优反应</text>
  <rect x="520" y="30" width="140" height="50" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="590" y="60" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">均衡结果</text>

  <line x1="160" y1="55" x2="200" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cauA)"/>
  <line x1="340" y1="55" x2="380" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cauA)"/>
  <line x1="520" y1="55" x2="560" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cauA)"/>

  <path d="M590,80 C590,160 90,160 90,80" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#cauB)"/>
  <text x="340" y="175" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#d5342c">反馈：结果 → 规范/信念 → 有效支付再写</text>

  <rect x="40" y="210" width="600" height="50" rx="8" fill="#f3f4f6"/>
  <text x="340" y="240" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#454c56">实线 = 因果主链 · 红虚线 = 反馈（声誉、制度、学习改写有效 u）</text>
</svg>
:::

**硬因果**：矩阵改变 → 占优关系与纳什集可跳变（例如 \(P\) 与 \(S\) 对调，PD 变 Chicken）。【事实】

**软相关**：观察到「合作率高」不等于「支付写成了和谐博弈」——也可能是重复、惩罚、选择偏差。【分析】

# 隐藏关系

:::cards g2
### 金钱矩阵 ≠ 效用矩阵
CORE 教材用利他偏好展示：同一害虫控制金钱支付，引入对对方收入的关心后，主导策略可从「喷农药」翻成「综合防治」。【事实】表面 PD，效用层可能不是。

### 序数够用 vs 基数必需
纯策略占优与纯纳什只依赖排序；**混合**依赖支付的相对间距（无差异方程）。把序数矩阵拿去解混合，是隐藏错误。【事实】

### 人际不可比是默认
各自 \(u_i\) 的正仿射变换独立进行；「总福利 = 相加」需要 TU 或显式权重。【事实】

### Allais / 前景理论打的是「期望」层
Allais (1953) 挑战独立公理；Kahneman–Tversky (1979) 用确定性效应与价值函数解释。【事实】近年元分析称 Allais 对设计敏感；也有高激励实验发现偏离不减反增。【待验证】规范模型仍多用 EU；描述模型常换前景理论。
:::

# 系统运行机制

标准策略型博弈：\(G=\{S_1,\ldots,S_n; u_1,\ldots,u_n\}\)。【事实】

运行闭环：

1. 每人选策略（纯或混合）→ 得到策略剖面 \(\sigma\)。
2. 对每人算期望支付 \(EU_i(\sigma)\)。
3. 最优反应：\(BR_i(\sigma_{-i})=\arg\max EU_i\)。
4. 纳什：\(\sigma_i\in BR_i(\sigma_{-i})\) 对所有 \(i\)。

**支付在每一步都是比较的介质**。改 \(u\) 而不改 \(S\)，游戏可以面目全非；改标签（「合作」叫「忠诚」）而不改数字，游戏不变。

:::note purple 跨域同构
支付矩阵 ↔ 强化学习奖励表 ↔ 合同条款的或有支付 ↔ 进化博弈的适应度。同一数学对象：状态/策略 → 标量回报。改奖励 = 改选择压力。
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="evA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="80" cy="100" r="10" fill="#15181d"/><text x="80" y="60" text-anchor="middle" font-size="12" font-weight="700" font-family="sans-serif" fill="#15181d">1944</text><text x="80" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">vNM 效用</text>
  <circle cx="200" cy="100" r="10" fill="#1d4ed8"/><text x="200" y="60" text-anchor="middle" font-size="12" font-weight="700" font-family="sans-serif" fill="#15181d">1950s</text><text x="200" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">Nash / PD 结构</text>
  <circle cx="320" cy="100" r="10" fill="#3b6ef5"/><text x="320" y="60" text-anchor="middle" font-size="12" font-weight="700" font-family="sans-serif" fill="#15181d">1953</text><text x="320" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">Allais 悖论</text>
  <circle cx="440" cy="100" r="10" fill="#b8730a"/><text x="440" y="60" text-anchor="middle" font-size="12" font-weight="700" font-family="sans-serif" fill="#15181d">1979</text><text x="440" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">前景理论</text>
  <circle cx="560" cy="100" r="10" fill="#0f8a4d"/><text x="560" y="60" text-anchor="middle" font-size="12" font-weight="700" font-family="sans-serif" fill="#15181d">今</text><text x="560" y="140" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#454c56">社会偏好·RL 奖励</text>
  <line x1="90" y1="100" x2="190" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#evA)"/>
  <line x1="210" y1="100" x2="310" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#evA)"/>
  <line x1="330" y1="100" x2="430" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#evA)"/>
  <line x1="450" y1="100" x2="550" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#evA)"/>
</svg>
:::

单次博弈里支付是静态的；重复与演化里，**有效支付**随规范与信念漂移——今天的「背叛红利」可能被明天的惩罚贴现掉。

# 利益与激励

| 角色 | 想要的支付形态 | 典型手段 |
|---|---|---|
| 自利参与人 | 抬高己方格、压低对方诱惑 | 威胁、承诺、旁支付 |
| 机制设计者 | 让诚实/效率成为高支付格 | 税收、匹配、产权 |
| 合谋方 | 把外部人支付做成「傻瓜」 | 排他协议 |
| 监管 | 把社会损害写进私人支付 | 罚金、披露、责任 |

激励兼容的本质：**让你希望对方选的行动，恰好也是对方支付意义上的最优反应**——改的是矩阵，不是口号。

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="120" y="65" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">可观察代理</text>
  <text x="120" y="110" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#7c848f">钱 / 分 / 刑期</text>

  <rect x="260" y="30" width="160" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="65" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">效用翻译</text>
  <text x="340" y="110" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#7c848f">风险·公平·参考点</text>

  <rect x="480" y="30" width="160" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="560" y="65" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">收益矩阵</text>
  <text x="560" y="110" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#7c848f">策略推理入口</text>

  <line x1="200" y1="60" x2="260" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="420" y1="60" x2="480" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>

  <rect x="140" y="150" width="400" height="70" rx="8" fill="#fce8e8" stroke="#d5342c"/>
  <text x="340" y="180" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">旁支付 / TU 转移</text>
  <text x="340" y="205" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">现金可一比一搬效用；情感、地位、不可分物 → NTU</text>

  <path d="M560,90 C600,140 480,150 420,170" fill="none" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#flB)"/>
</svg>
:::

信息流：他人支付通常不可直接读，只能从选择反推；共同知识假设「大家都知道矩阵」——现实中矩阵本身常是私有信息（不完备信息博弈）。

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何锋利 | 操作成本 |
|---|---|---|---|
| 1 | 重写支付维度 | 加公平/声誉可消灭伪 PD | 中：要测量 |
| 2 | 改 \(T,R,P,S\) 间距 | 游戏类型跳变 | 低：纸上推演 |
| 3 | 正仿射标准化 | 消掉假精度、统一比较 | 低 |
| 4 | 引入旁支付（TU） | 把冲突变成可分配剩余 | 中：合同 |
| 5 | 重复 + 贴现 | 把未来惩罚写进今天 EU | 中 |
| 6 | 信息公开 | 减少「猜错对方矩阵」 | 中 |
| 7 | 限制策略集 | 删掉高诱惑行动 | 高：制度 |
| 8 | 风险态度校准 | 金钱→效用的曲率 | 中：实验/问卷 |
| 9 | 参考点管理 | 前景理论下损益框架 | 中 |
| 10 | 奖励函数审计（AI） | 防规格错误 | 高：工程 |

# 常见认知陷阱

:::details 1. 把支付当成道德评分
矩阵里背叛分高 ≠ 背叛「应该」。模型描述激励，不颁发奖状。

:::

:::details 2. 金钱 = 效用
忽略风险态度、公平、相对地位。最后通牒拒绝正额报价，在纯金钱效用下「非理性」，在含公平的效用下完全理性。【事实】

:::

:::details 3. 序数矩阵上硬算混合
无差异方程需要间距。任意严格递增变换会改变混合均衡频率。【事实】

:::

:::details 4. 人际比较偷运进模型
「A 的 3 比 B 的 5 更惨」需要额外公理；默认不允许。

:::

:::details 5. 标签绑架数字
把行动叫「合作」就以为支付该写成 PD。先定数字结构，再贴标签。

:::

:::details 6. 仿射变换「随便乘负数」
\(a<0\) 会反转偏好，毁掉博弈。只允许 \(a>0\)。【事实】

:::

:::details 7. 零和妄想
商业与政治多数是变和；把变和当零和，会系统性错过共赢格。

:::

:::details 8. 忽略 TU/NTU
以为总能「私了」把效用挪走；不可分物品与情感偏好下旁支付无效。

:::

:::details 9. 用一次博弈支付解释重复互动
Axelrod 式合作依赖未来阴影；单次矩阵的背叛占优不能直接外推。【分析】

:::

:::details 10. 把行为偏离一律叫「非理性」
可能是矩阵写错、概率加权、或 Level-k——先修支付与信念，再贴标签。
:::

<!-- nav:实践 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <rect x="20" y="40" width="180" height="140" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="110" y="85" text-anchor="middle" font-size="14" font-weight="700" font-family="sans-serif" fill="#15181d">抽象</text>
  <text x="110" y="115" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">uᵢ, 矩阵</text>
  <text x="110" y="140" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">仿射类</text>

  <rect x="250" y="40" width="180" height="140" rx="10" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="85" text-anchor="middle" font-size="14" font-weight="700" font-family="sans-serif" fill="#15181d">机制</text>
  <text x="340" y="115" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">占优 / 无差异</text>
  <text x="340" y="140" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">均衡跳变</text>

  <rect x="480" y="40" width="180" height="140" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="570" y="85" text-anchor="middle" font-size="14" font-weight="700" font-family="sans-serif" fill="#15181d">操作</text>
  <text x="570" y="115" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">写 2×2</text>
  <text x="570" y="140" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#454c56">测 α / 改规则</text>
</svg>
:::

| 现实场景 | 抽象对象 | 操作抓手 |
|---|---|---|
| 价格战 | 变和矩阵，低价格诱惑高 | 重写「叛价」支付（忠诚计划、惩罚条款） |
| 团队摸鱼 | PD 结构 | 提高 \(R\)（奖金共享）或降低 \(T\)（可观察偷懒） |
| 军备竞赛 | 常接近 Chicken / PD 变体 | 核查降低信息不对称，改有效 \(T\) |
| RL 推荐 | 奖励 = 支付 | 审计代理指标是否对齐长期价值 |
| 谈判破裂 | NTU 可行集太小 | 引入可转移剩余或扩大蛋糕 |

# 从理论到行动

1. **列出结果**：双方各两个行动 → 四格故事（不是先填数字）。
2. **先填代理，再声明尺度**：金钱/刑期，并注明「暂当 vNM 效用」或「仅序数」。
3. **分类**：用 \(T,R,P,S\) 判定 PD / 猎鹿 / 懦夫 / 其他（本页工具 1）。
4. **敏感性**：做一次正仿射（工具 2），确认纯策略结论不变；若要混合，锁定基数。
5. **社会偏好探针**：问「若对方多得 1，我愿意牺牲多少」→ 估 \(\alpha\)（工具 4）。
6. **才谈均衡**：矩阵稳了再算纳什。

# 技能树

:::details 基础 · 读写矩阵
- 会写 2×2 双支付矩阵
- 区分代理与效用
- 用排序判定占优

:::

:::details 中级 · 尺度与期望
- 正仿射变换手算
- 混合下 EU 计算
- 识别 PD/猎鹿/懦夫

:::

:::details 高级 · 改写与设计
- 社会偏好改矩阵
- TU/NTU 选择
- 机制上改支付实现目标均衡
:::

# 游戏化世界

| 区域 | 怪物 | 通关条件 |
|---|---|---|
| 道德迷雾 | 「背叛=坏人」咒 | 用矩阵重述激励，去掉道德词 |
| 金钱沼泽 | 「利润即效用」泥怪 | 写出风险/公平修正后的 \(u\) |
| 序数悬崖 | 假混合计算 | 证明间距被变换破坏 |
| 类型丛林 | 同名不同戏 | 用 \(T,R,P,S\) 正确分类 |
| 转移神殿 | 强行 TU | 指出不可分物/情感障碍 |

# 任务系统

| 任务 | 难度 | 产出 | 验收 |
|---|---|---|---|
| T1 默写 PD 不等式 | ★ | 卡片 | \(T>R>P>S\) 且常加 \(2R>T+S\) |
| T2 仿射 \(a=2,b=10\) | ★ | 数字 | (5,3,1,0)→(20,16,12,10)，占优不变 |
| T3 猎鹿无差异 | ★★ | 草稿 | \(p^*=0.6\)（本手册默认矩阵） |
| T4 工具 4 找 \(\alpha\) 临界 | ★★ | 截图 | \(\alpha>0.25\) 背叛不再双场景占优 |
| T5 生活 2×2 | ★★★ | 一页 | 标明代理 vs 效用假设 |
| T6 指出一个假零和 | ★★ | 短文 | 变和共赢格何在 |

# 反事实模拟

:::tabs
@@若把 PD 的 P 与 S 对调
结构变为 Chicken（冲突最差）；纯纳什从互叛变为「一人冒险一人躲闪」的两均衡。【推论】

@@若 α=1（完全利他）
默认金钱 PD 上，合作可成占优；「困境」消失——改的是效用，不是人性突变。【推论】

@@若只允许序数、禁止基数
仍可谈纯占优与纯纳什；混合纳什失去唯一数值解。【事实】

@@若旁支付零成本（TU）
许多冲突变成「先最大化总剩余再分配」；Shapley 等分配概念变得可直接用。【分析】
:::

## 可调模型 1 · 2×2 分类器：T/R/P/S

对称博弈：双方合作得 \(R\)，单方背叛得 \(T\)/对方 \(S\)，双叛得 \(P\)。看不等式如何决定游戏类型。

:::raw
<div class="tool" id="tool_cls">
  <div class="ctrl">
    <label>诱惑 T <output id="cls_tO">5.0</output></label>
    <input type="range" id="cls_t" min="0" max="10" step="0.1" value="5.0"/>
    <label>奖励 R <output id="cls_rO">3.0</output></label>
    <input type="range" id="cls_r" min="0" max="10" step="0.1" value="3.0"/>
    <label>惩罚 P <output id="cls_pO">1.0</output></label>
    <input type="range" id="cls_p" min="0" max="10" step="0.1" value="1.0"/>
    <label>傻瓜 S <output id="cls_sO">0.0</output></label>
    <input type="range" id="cls_s" min="0" max="10" step="0.1" value="0.0"/>
  </div>
  <div class="readout">
    <div class="ro">类型<strong id="cls_type">囚徒困境 PD</strong></div>
    <div class="ro">2R−(T+S)<strong id="cls_gap">1.0</strong></div>
    <div class="ro">排序<strong id="cls_ord">T&gt;R&gt;P&gt;S</strong></div>
    <div id="cls_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="cls_vh">T&gt;R&gt;P&gt;S 且 2R&gt;T+S → 标准囚徒困境：背叛严格占优，但互合帕累托优于互叛</span></div>
  </div>
  <canvas id="clsChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 正仿射变换：标尺变了，最优反应呢？

对行方面临的四个支付做 \(u'=au+b\)（列方同理可独立）。看占优与排序是否保持。

:::raw
<div class="tool" id="tool_aff">
  <div class="ctrl">
    <label>斜率 a（须 &gt;0） <output id="aff_aO">2.00</output></label>
    <input type="range" id="aff_a" min="0.1" max="5" step="0.1" value="2.0"/>
    <label>平移 b <output id="aff_bO">10.0</output></label>
    <input type="range" id="aff_b" min="-20" max="20" step="0.5" value="10.0"/>
  </div>
  <div class="readout">
    <div class="ro">原点 (T,R,P,S)<strong id="aff_src">5, 3, 1, 0</strong></div>
    <div class="ro">变换后<strong id="aff_dst">20.0, 16.0, 12.0, 10.0</strong></div>
    <div class="ro">占优关系<strong id="aff_dom">不变：仍 D≻C</strong></div>
    <div id="aff_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="aff_vh">正仿射变换保持支付差的符号与期望排序 → 最优反应集不变（a=2, b=10）</span></div>
  </div>
  <canvas id="affChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 混合期望支付：p × q

行混合：以上概率 \(p\) 选「上」；列以上概率 \(q\) 选「左」。矩阵为行支付：上左=3、上右=0、下左=5、下右=1（经典 PD 行视角）。

:::raw
<div class="tool" id="tool_eu">
  <div class="ctrl">
    <label>你选「上/合作」概率 p <output id="eu_pO">0.50</output></label>
    <input type="range" id="eu_p" min="0" max="1" step="0.01" value="0.50"/>
    <label>对方选「左/合作」概率 q <output id="eu_qO">0.50</output></label>
    <input type="range" id="eu_q" min="0" max="1" step="0.01" value="0.50"/>
  </div>
  <div class="readout">
    <div class="ro">EU(上)<strong id="eu_up">1.50</strong></div>
    <div class="ro">EU(下)<strong id="eu_dn">3.00</strong></div>
    <div class="ro">你的期望<strong id="eu_mix">2.25</strong></div>
    <div id="eu_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="eu_vh">EU(下)−EU(上)=1.50&gt;0 → 最优纯策略=下/背叛（PD 中背叛占优）</span></div>
  </div>
  <canvas id="euChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 利他权重 α：金钱 PD → 效用游戏

金钱：CC=(3,3), CD=(0,5), DC=(5,0), DD=(1,1)。效用 \(u_i = \pi_i + \alpha\pi_{-i}\)。看 \(\alpha\) 如何拆掉「背叛占优」。

:::raw
<div class="tool" id="tool_al">
  <div class="ctrl">
    <label>利他权重 α <output id="al_aO">0.00</output></label>
    <input type="range" id="al_a" min="0" max="1" step="0.01" value="0.00"/>
  </div>
  <div class="readout">
    <div class="ro">u(CC)<strong id="al_cc">3.00</strong></div>
    <div class="ro">u(CD)<strong id="al_cd">0.00</strong></div>
    <div class="ro">u(DC)<strong id="al_dc">5.00</strong></div>
    <div class="ro">u(DD)<strong id="al_dd">1.00</strong></div>
    <div id="al_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="al_vh">α=0：仍为金钱 PD，背叛严格占优 · 临界：α&gt;0.25 时对「对方背叛」不再偏好互叛；α≥2/3 时合作占优</span></div>
  </div>
  <canvas id="alChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 标志性产出 |
|---|---|---|
| L1 识别 | 读矩阵；代理≠效用；非道德化 | 一页「故事→数字」翻译 |
| L2 计算 | 仿射、EU、\(T,R,P,S\) 分类 | 与工具误差 &lt; 0.01 |
| L3 诊断 | 发现假 PD / 假零和 / 假混合 | 诊断备忘 |
| L4 设计 | 改支付实现目标均衡 | 机制或合同草案 |

# 30分钟最小实践

**今天就能做（成本≈0）：**

1. 选一件真实冲突（家务、排期、报价），画 2×2，先写四格故事。
2. 用代理数字填 \(T,R,P,S\)，在工具 1 看类型。
3. 用工具 2 做一次 \(a=2,b=10\)，确认「谁更好」的结论不变。
4. 问自己：若 \(\alpha=0.3\)，对方多得是否让你愿意少得？用工具 4 看结构是否变。
5. 写一句：**「我比较的是收益矩阵，不是道德勋章。」**

验收：能口头说出 PD 的四个不等式，并能解释为何仿射不改变占优。

# 7天计划

| 天 | 主题 | 产出 |
|---|---|---|
| D1 | 支付定义 + 非道德化 | 卡片 |
| D2 | 序数 vs vNM | 对照表 |
| D3 | 手算仿射与分类 | 与工具 1–2 核对 |
| D4 | 混合 EU | 工具 3 十条滑块记录 |
| D5 | 社会偏好 | α 临界笔记 |
| D6 | Allais / 前景理论摘要 | 5 条 |
| D7 | 生活案例 TU/NTU | 一页 |

# 30天计划

| 周 | 焦点 | 里程碑 |
|---|---|---|
| W1 | 矩阵读写与分类 | 10 个 2×2 分类无误 |
| W2 | 尺度与期望 | 独立推导无差异 |
| W3 | 行为与社会偏好 | 重写 3 个「假 PD」 |
| W4 | 设计 | 为一个团队问题提交「改支付」方案 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 策略型支付函数 | \(u_i:S\to\mathbb{R}\) |
| 2 | 收益矩阵 | 有限博弈的表格表示 |
| 3 | 囚徒困境结构 | \(T>R>P>S\)（常加 \(2R>T+S\)） |
| 4 | 正仿射等价 | \(u'=au+b,\ a>0\) 保 vNM 决策 |
| 5 | 期望支付 | 混合下的概率加权和 |
| 6 | 零和 / 常和 | 支付之和为 0 或常数 |
| 7 | 社会偏好变换 | \(u=\pi+\alpha\pi_{-}\) 可改游戏类型 |
| 8 | TU vs NTU | 效用可否旁支付转移 |
| 9 | 前景理论价值 | 损益参考点 + 概率加权（描述） |
| 10 | 机制即改支付 | 规则改变可行结果与 \(u\) |

# 关键问题清单

:::details Q1 支付和效用是一回事吗？
在博弈论语用里常混用：支付函数就是把结果映到效用数字。日常「报酬」只是常见代理。

:::

:::details Q2 为什么说本质是矩阵不是道德？
因为预测与设计只依赖激励结构；道德语言不改变最优反应，除非写进效用。

:::

:::details Q3 数字可以随便变吗？
纯策略结论：保序即可。混合与风险：需 vNM 基数，且只在正仿射类内自由。

:::

:::details Q4 两人的「3」能比吗？
默认不能。人际比较要额外假设或 TU 结构。

:::

:::details Q5 如何判断是不是真 PD？
看效用层是否 \(T>R>P>S\)；只看金钱或标签不够。

:::

:::details Q6 Allais 悖论否定博弈论吗？
否定的是「EU 总是好的描述模型」的强主张；规范分析与许多应用仍用 EU，并可用前景理论做描述补丁。【分析】

:::

:::details Q7 零和游戏现实中多吗？
严格零和少；常和与变和更常见。零和是有用的极限模型（匹配、罚点球）。

:::

:::details Q8 什么时候必须用基数？
要算期望、混合纳什、风险态度、讨价还价的某些解时。

:::

:::details Q9 如何估 α？
实验选择、问卷权衡、或从可观察转移反推——都有噪声，标【待验证】。

:::

:::details Q10 下一步学什么？
纳什均衡、占优策略、信息与贝叶斯支付——队列后续主题。
:::

# 下一阶段探索

- **纳什均衡**：支付给定后，策略剖面何时互为最优反应。
- **占优策略**：不依赖对手信念的支付优势。
- **信息与类型**：支付依赖私有类型时的贝叶斯博弈。
- **机制设计**：反向工程——从目标均衡反推该写什么支付。

本手册把「值多少」的尺子钉死了；下一本把「谁也不想单方面偏离」钉死。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| vNM 期望效用表示与正仿射唯一性 | 经典/百科 | von Neumann & Morgenstern (1944)；Stanford 百科 Expected Utility；IISc 效用讲义 | 【事实】 |
| 策略型博弈 \(G=\{S_i;u_i\}\) | 讲义 | MIT 17.810 Lecture 2 | 【事实】 |
| 囚徒困境 \(T>R>P>S\) | 百科/教材 | Stanford 百科 Prisoner's Dilemma；Osborne 教材 | 【事实】 |
| 社会偏好改写主导策略 | 教材 | CORE *The Economy* 害虫控制/利他例子 | 【事实】 |
| 原始支付 vs 效用 PD 非合同 | 论文 | 「adversarial preference」类工作（原始 PD 不保证效用 PD） | 【分析】 |
| Allais 悖论与前景理论 | 经典 | Allais (1953)；Kahneman & Tversky (1979) | 【事实】 |
| Allais 稳健性 / 高激励 | 期刊/工作论文 | Blavatskyy–Ortmann–Panchenko 元分析；高激励 Allais 实验（偏离或增） | 【待验证】 |
| TU / Shapley / NTU 扩展 | 综述 | Serrano 等合作博弈讲义；Hart 等 NTU value | 【事实】 |
| 仿射与 α 临界数值 | 自算 | node 验算：α&gt;1/4、α≥2/3；默认 PD EU 等 | 【推论】 |
| 跨域同构（RL 奖励等） | 类比 | 作者归纳 | 【分析】 |

标记约定：【事实】多方一致或经典定理；【分析】权威判断或稳健框架；【推论】由模型推导；【假设】未验证；【待验证】单一来源或结果依赖设计。

# 免责声明 {.appendix}

本手册是博弈论概念的认知与实践框架，用于理解支付/效用、收益矩阵与相关尺度约定，**不是**投资建议、谈判话术保证、赌博策略或任何对抗场景的操作保证。文中数值来自标准教学例子与公开学术文献；现实偏好、制度约束与测量误差会导致矩阵与结论变化。请勿将模型支付误当成道德判决或保证收益。决策后果由读者自行承担。
