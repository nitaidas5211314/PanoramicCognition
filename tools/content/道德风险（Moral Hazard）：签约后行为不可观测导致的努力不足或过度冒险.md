---
slug: 道德风险（Moral Hazard）：签约后行为不可观测导致的努力不足或过度冒险
title: 道德风险（Moral Hazard）：签约后的隐藏行动
subtitle: 签约<strong>之后</strong>行为不可观测——努力不足或过度冒险——激励兼容、风险分担与有限责任同一骨架。
brand_sub: Moral Hazard × Hidden Action
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 道德风险, 委托-代理, Holmström, 激励, 保险, 有限责任, 存款保险]
theme_js_file: 道德风险（Moral Hazard）：签约后行为不可观测导致的努力不足或过度冒险.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**道德风险（Moral Hazard）**：在**签约之后**，一方的行动（努力、谨慎、风险选择）对方观察不到或不可写入合同；于是该方按**私人边际收益**行动，系统出现努力不足、过度消费或过度冒险。【事实】

核心不是「人变坏了」，而是**不可观测行动 × 不完全承担后果**。保险降低自付 → 多用医疗；股权期权凸化 → 风险转移；存款保险削弱储户监督 → 银行主动加杠杆。【分析】

经典出处：Holmström《Moral Hazard and Observability》（Bell Journal 1979）；企业侧 Jensen–Meckling（1976）把代理成本写成所有权结构问题。与逆向选择（签约前隐藏类型）对照：时间点不同、解药不同。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「员工懒不懒、投保人坏不坏」，而是：**隐藏行动如何迫使合同在激励与保险之间折中，以及有限责任如何把折中扭成过度冒险**。

边界：

- **在界内**：努力/风险选择、可观察产出、激励强度、风险分担、有限责任、监控、声誉、监管资本。
- **在界外**：某个人该不该被开除、某张保单该不该拒赔——除非压成「激励兼容约束是否绑定」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 签约后隐藏行动如何扭曲努力与风险 |
| 2 | 边界在哪 | 到「参与 + 激励兼容 + 有限责任」可形式化为止 |
| 3 | 核心对象 | 行动、信号/产出、合同支付、代理成本 |
| 4 | 参与者 | 委托人（股东/保险人/储户）；代理人（经理/投保人/银行）；监管与审计 |
| 5 | 关键变量 | 激励强度 β、风险厌恶 r、噪声 σ²、自付比例 κ、债务面值 D |
| 6 | 可直接观察 | 产出、索赔、杠杆、不良率、薪酬结构 |
| 7 | 无法直接观察 | 真实努力、真实风险选择、真实谨慎程度 |
| 8 | 谁影响谁 | 合同 → 行动 → 产出分布 → 双方期望支付 |
| 9 | 因果关系 | 不可观测行动 ⇒ 只能按结果付酬 ⇒ 激励–保险权衡 |
| 10 | 只是相关 | 「出险多」≠ 全是道德风险（还有逆向选择）【分析】 |
| 11 | 表层现象 | 全额报销多用、股权激励后加杠杆、存款保险后风险资产升 |
| 12 | 底层机制 | 私人边际 ≠ 社会边际；凸支付放大尾部 |
| 13 | 有反馈吗 | 有。损失抬保费/资本成本，再改变行为 |
| 14 | 有延迟吗 | 有。索赔、坏账、声誉崩塌都有时滞 |
| 15 | 正/负反馈 | 损失螺旋可正反馈；免赔/监控/资本约束可负反馈 |

## 最关键的一句话

> 道德风险问的不是「对方品德如何」，而是「后果有多少仍由他自己承担」。

# 为什么值得研究

:::cards g3
### 它解释「明明合同签了仍偷懒」
固定工资下努力的边际私人收益≈0，社会边际为正——均衡努力低于有效水平。【事实】

### 它给保险与薪酬一把刻度尺
自付比例、分成比例、期权凸度：都是在调「私人边际」贴近「社会边际」。【分析】

### 它连接金融稳定与公司治理
存款保险、有限责任、高管期权——同一数学：凸化下行、放大冒险。【分析】
:::

:::note amber 最贵的一次误判
把「出险上升」全怪给逆向选择。若是道德风险，加保费会加重负担却未必矫正行为；正确杠杆是自付、监控与除外责任。【分析】
:::

# 世界地图

九层从「行动不可见」爬到「制度修复」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="mhArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度修复 · 资本约束 / 差别费率 / 追责 / 早期纠正</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 实证识别 · RAND 自付弹性 / 高免额减量 / 存保准实验</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 动态扩展 · 多期声誉 / 关系合同 / 团队道德风险</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 跨域同构 · 医保多用 / 债股冲突 / 存保冒险 / 外包偷懒</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 均衡结局 · 次优努力 / 风险转移 / 监控替代激励</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 应用原型 · 雇佣分成 · 医保自付 · 杠杆企业 · 存款银行</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 解概念 · 激励兼容 IC · 参与 IR · 一阶方法 FOA</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 机制原语 · 按结果付酬 → 激励–保险权衡 → 代理成本</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 问题原语 · 签约后隐藏行动 → 委托人只见产出分布</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2–L3**：先会写 IC/IR；进阶卡在 **L5**：有限责任把「努力不足」拧成「过度冒险」。【分析】
:::

# 核心概念地图

从抽象定义到三层操作。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="100" y="16" width="480" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">隐藏行动 → 结果合同 → 激励–保险权衡 → 代理成本</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">不可缔约的行动</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">IC · β · 有限责任</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">分成·自付·债契·监控</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="180" width="180" height="72" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">努力 e 或风险 ρ</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">私人成本 / 私人凸收益</text>
  <rect x="250" y="180" width="180" height="72" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">产出 y = e + ε</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">或项目成败分布</text>
  <rect x="460" y="180" width="180" height="72" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">工资 w(y) / 赔付</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">线性 · 期权 · 免赔</text>

  <path d="M130,252 C130,300 340,300 340,252" fill="none" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="5,4" marker-end="url(#cmB)"/>
  <text x="200" y="292" fill="#d5342c" font-size="11" font-family="sans-serif">反馈：损失 → 保费/资本成本 → 再改行动</text>

  <rect x="120" y="320" width="440" height="40" rx="8" fill="#f3f4f6" stroke="#7c848f"/><text x="340" y="345" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">跨域同构：医保自付 ↔ 分成薪酬 ↔ 债约保护 ↔ 存保差别费率</text>
</svg>
:::

# 核心参与者

| 角色 | 想要什么 | 看见什么 | 典型动作 |
|---|---|---|---|
| 委托人 | 高努力、低冒险、低代理成本 | 产出、索赔、报表 | 设计 w(y)、监控、契约条款 |
| 代理人 | 效用 − 努力成本 + 私人冒险收益 | 自己的行动与风险偏好 | 选择 e 或项目风险 |
| 第三方 | 稳定/合规/声誉 | 部分信号 | 审计、评级、监管资本 |
| 对抗者 | 利用凸支付与信息不对称 | 尾部收益 | 风险转移、费用套取 |

# 核心变量

| 变量 | 符号 | 作用 |
|---|---|---|
| 激励强度 | β | 产出每增 1，代理人多拿多少 |
| 风险厌恶 | r | 越高 → 越不愿扛噪声 → β* 越低 |
| 产出噪声 | σ² | 越高 → 绩效信号越脏 → 激励越贵 |
| 努力成本曲率 | c | e*=β/c；c 大则同样 β 换更少努力 |
| 自付比例 | κ | 保险中代理人承担的边际成本份额 |
| 债务面值 | D | 抬高有限责任凸度 → 风险转移动机 |
| 监控强度 | m | 用直接观察替代一部分绩效激励 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="120" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="57" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">隐藏行动</text>
  <rect x="180" y="30" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="57" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">结果合同</text>
  <rect x="340" y="30" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="400" y="57" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">激励强度 β</text>
  <rect x="500" y="30" width="140" height="44" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="570" y="57" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">努力 / 冒险</text>

  <line x1="140" y1="52" x2="175" y2="52" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#cA)"/>
  <line x1="300" y1="52" x2="335" y2="52" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#cA)"/>
  <line x1="460" y1="52" x2="495" y2="52" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#cA)"/>

  <rect x="100" y="130" width="160" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="180" y="157" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">风险分担成本</text>
  <rect x="360" y="130" width="160" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="440" y="157" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">有限责任凸化</text>

  <line x1="400" y1="74" x2="180" y2="130" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#cB)"/>
  <line x1="570" y1="74" x2="440" y2="130" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#cB)"/>

  <rect x="160" y="220" width="360" height="48" rx="8" fill="#15181d"/><text x="340" y="250" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">净效果：次优努力 或 对社会无效的风险转移</text>
  <line x1="180" y1="174" x2="280" y2="220" stroke="#1d4ed8" stroke-width="1.4" marker-end="url(#cA)"/>
  <line x1="440" y1="174" x2="400" y2="220" stroke="#b8730a" stroke-width="1.4" marker-end="url(#cA)"/>
</svg>
:::

因果链（实线）与反馈（红虚线）：

1. 行动不可写入合同 → 只能按产出付酬。【事实】
2. 提高 β 提振努力，但把噪声风险甩给厌恶风险的代理人。【事实】
3. 有限责任下股权似看涨期权 → 提高波动可能抬股权价值、损债权人。【事实】
4. 损失反馈抬高保费/融资成本，改变下一期行动。【分析】

# 隐藏关系

:::cards g2
### 道德风险 ≠ 逆向选择
前者是签约后隐藏行动；后者是签约前隐藏类型。同一张「出险高」表，两种机制都能生成——识别靠实验或合同变动。【事实】

### 激励与保险是一对冤家
完全保险（β=0 或 κ=0）消灭激励；完全激励（β=1 或 κ=1）消灭保险。线性合同最优激励强度 \(β^*=1/(1+rcσ^2)\)。【事实】

### 监控是激励的替代品
提高发现偷懒概率 m，可降低所需效率工资；但监控本身有成本。【分析】

### 「风险偏好」常被合同制造
同一人在固定工资下偏保守，在期权+高杠杆下偏冒险——偏好被支付凸度改写。【推论】
:::

# 系统运行机制

标准委托–代理（Holmström 1979；线性近似 Holmström–Milgrom 1987）：

1. 委托人提出 \(w=\alpha+β y\)，\(y=e+\varepsilon\)。【事实】
2. 代理人选 \(e^*=β/c\)（二次努力成本）。【事实】
3. 参与约束钉住 α；最优 \(β^*=1/(1+r c σ^2)\)。【事实】
4. 一阶方法（FOA）把 IC 换成一阶条件；近年研究表明保留效用足够高时 FOA 往往成立，过低时可能失效。【分析】【待验证】

有限责任通道：股权支付 \(\max(y-D,0)\) 对波动凸，债务 \(\min(y,D)\) 对波动凹 → 股东–经理联盟可能选社会价值更低但股权期望更高的风险项目。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t0 签约</text><text x="80" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">写 w(y)/κ/D</text>
  <circle cx="220" cy="110" r="10" fill="#1d4ed8"/><text x="220" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t1 行动</text><text x="220" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">隐藏 e 或 ρ</text>
  <circle cx="360" cy="110" r="10" fill="#b8730a"/><text x="360" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t2 结果</text><text x="360" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">产出/出险</text>
  <circle cx="500" cy="110" r="10" fill="#d5342c"/><text x="500" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t3 结算</text><text x="500" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">支付·索赔</text>
  <circle cx="620" cy="110" r="10" fill="#15181d"/><text x="620" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t4 更新</text><text x="620" y="150" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">改合同/监管</text>
  <line x1="90" y1="110" x2="205" y2="110" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="230" y1="110" x2="345" y2="110" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="370" y1="110" x2="485" y2="110" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="510" y1="110" x2="605" y2="110" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
</svg>
:::

| 阶段 | 关键延迟 | 常见误读 |
|---|---|---|
| 签约→行动 | 几乎即时 | 以为签了就对齐 |
| 行动→结果 | 季报、保单年、贷款周期 | 把噪声当努力 |
| 结果→制度 | 监管与重定价滞后 | 危机后才补资本 |

# 利益与激励

| 主体 | 激励 | 扭曲方向 |
|---|---|---|
| 固定薪代理人 | 最小化努力成本 | 偷懒 |
| 高 β / 期权持有者 | 抬高期望或波动 | 努力↑ 或 冒险↑ |
| 全额参保人 | 边际自付≈0 | 过度使用 |
| 高杠杆股东 | 看涨期权凸性 | 风险转移 |
| 受保存款银行 | 储户监督弱 | 主动加风险资产【待验证】 |

:::note red 利益冲突的尖锐点
股东与债权人：同一项目对社会可能净损失，但对股权仍可能期望为正——这是有限责任道德风险的硬核。【事实】
:::

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="fB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">委托人资源</text><text x="110" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">资本·保费池·存款</text>
  <rect x="270" y="30" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">代理人行动</text><text x="340" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">努力 / 风险选择</text>
  <rect x="500" y="30" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="570" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">产出 / 损失</text><text x="570" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">y 或索赔</text>

  <line x1="180" y1="60" x2="265" y2="60" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#fA)"/>
  <line x1="410" y1="60" x2="495" y2="60" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#fA)"/>

  <rect x="160" y="150" width="360" height="70" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="340" y="180" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">抽水：代理成本 + 无谓损失（过度使用 / 劣项目）</text><text x="340" y="202" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">流向：监控费、风险溢价、债权人减记、社会效率损失</text>

  <path d="M570,90 C570,130 480,150 420,160" fill="none" stroke="#d5342c" stroke-width="1.6" stroke-dasharray="4,3" marker-end="url(#fB)"/>
  <path d="M110,90 C110,140 200,150 220,160" fill="none" stroke="#d5342c" stroke-width="1.6" stroke-dasharray="4,3" marker-end="url(#fB)"/>
</svg>
:::

信息流：代理人私有行动；委托人得嘈杂产出；第三方审计提供可验证信号（Holmström 信息性原理：有信息量的信号应进入合同）。【事实】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何有效 | 成本 |
|---|---|---|---|
| 1 | 自付/免赔 κ | 直接拉回边际价格 | 保险价值下降 |
| 2 | 激励强度 β | 对准努力激励 | 风险分担成本 |
| 3 | 可验证信号进合同 | 降噪声、提 β 效率 | 计量与博弈 |
| 4 | 债务契约/抵押 | 压风险转移 | 融资摩擦 |
| 5 | 监控 m | 替代高 β | 监控成本 |
| 6 | 有限责任与资本 | 改变凸度 | 监管与股权稀释 |
| 7 | 差别存保费率 | 按风险定价保障 | 测定难度 |
| 8 | 声誉/重复博弈 | 贴现未来惩罚 | 需高贴现因子 |
| 9 | 团队相对绩效 | 滤掉共同冲击 | 破坏合作 |
| 10 | 除外责任/行为条款 | 切断高弹性滥用 | 执行争议 |

# 常见认知陷阱

:::details 1. 「道德风险＝道德败坏」
经济学术语描述激励扭曲，不自动等于品格审判。把问题人格化会错过合同设计。【分析】
:::

:::details 2. 「有保险就一定多用且有害」
RAND 等显示自付降低开支；但高免赔也会砍掉有价值的预防性服务——弹性≠浪费。【事实】
:::

:::details 3. 「出险高＝逆向选择」
签约前类型与签约后行为都会抬索赔。合同随机化、免赔变动、准实验才能拆开。【分析】
:::

:::details 4. 「股权激励一定对齐股东」
对齐股东可能同时伤害债权人（风险转移）。完整图要含资本结构。【事实】
:::

:::details 5. 「β 越高越好」
噪声大或代理人极风险厌恶时，高 β 的风险成本吃掉激励收益；\(β^*<1\) 是常态。【事实】
:::

:::details 6. 「监控能消灭代理问题」
监控有成本且可被对抗；最优往往是「部分监控 + 部分激励」。【分析】
:::

:::details 7. 「存款保险只防挤兑」
挤兑保险与冒险激励是一体两面；差别费率与资本约束是配套件。【分析】【待验证】
:::

:::details 8. 「线性合同太简陋」
Holmström–Milgrom 在连续时间/指数效用/正态噪声下证明线性近似合理；有限责任下最优常呈债式或封顶奖金。【事实】
:::

:::details 9. 「一阶方法永远可用」
保留效用过低、有限责任绑定时 FOA 可能失效；2024–2025 文献仍在刻画适用范围。【分析】
:::

:::details 10. 「改革只要加压惩罚」
单侧加重惩罚若不改信息结构，可能逼出隐瞒与造假，而非真努力。【推论】
:::

<!-- nav:实践落地 -->
# 从抽象到现实

| 场景 | 隐藏行动 | 典型合同杠杆 | 观察指标 |
|---|---|---|---|
| 雇佣 | 努力/质量 | 分成、股权、KPI | 产出、差错、客户评分 |
| 医保 | 就医强度 | 免赔、共付、目录 | 就诊次数、费用 |
| 车险 | 驾驶谨慎 | 无赔优待、车联网 | 出险频率 |
| 公司债 | 投资风险 | 契约、抵押、加速到期 | 杠杆、评级迁移 |
| 银行 | 资产风险 | 资本、存保费率、早期纠正 | RWA、不良、流动性 |
| 外包/平台 | 服务质量 | 保证金、抽成、差评 | 完单率、投诉 |

:::note green 对照基准
金融场景里报「激励后业绩」必须对照「无激励/低杠杆基准」。股票有漂移，表面胜率会骗人——与威科夫手册同一纪律。【分析】
:::

# 从理论到行动

1. **先定诊断**：是努力不足，还是过度冒险，还是过度使用？三者杠杆不同。
2. **画边际**：私人边际成本/收益 vs 社会边际——差距即道德风险缺口。
3. **选工具包**：κ / β / m / D-契约 / 资本 ——通常组合，不单押一个。
4. **写可验证信号**：能进合同的信息优先于「口号式文化」。
5. **设反馈窗**：季度复盘索赔/不良/努力代理指标，避免年终一次算总账。

# 技能树

:::details 主干 A · 合同建模
- A1 写出 IR 与 IC
- A2 算线性 \(β^*=1/(1+rcσ^2)\)
- A3 识别有限责任下的风险转移
:::

:::details 主干 B · 保险设计
- B1 免赔/共付对需求的一阶效应
- B2 区分道德风险与逆向选择证据
- B3 目录与除外责任的弹性管理
:::

:::details 主干 C · 治理与监管
- C1 债约与抵押清单
- C2 存保–资本–早期纠正三角
- C3 薪酬追索与双罚机制阅读
:::

:::details 主干 D · 组织落地
- D1 把 KPI 噪声测出来
- D2 监控抽样设计
- D3 30 分钟合同体检（见下）
:::

# 游戏化世界

你是「激励工程师」。地图四城：**努力城**（提高 e）、**自付城**（调 κ）、**杠杆城**（压风险转移）、**存保城**（差别费率）。每座城的 Boss 是一种认知陷阱；通关条件是用模型默认值口述对判定行。

# 任务系统

| 任务 | 目标 | 验收 |
|---|---|---|
| T1 线性激励 | 默背 β* 公式并代默认值 | β*=0.50 |
| T2 自付扫描 | 找 DWL 随 κ 下降的形态 | 与模型 2 一致 |
| T3 债务凸度 | 找 D 使股权偏好劣项目 | 与模型 3 一致 |
| T4 监控替代 | 算 m* 与效率工资 | 与模型 4 一致 |
| T5 现实拆解 | 选一份劳动合同或保单 | 标出 3 个 MH 触点 |

# 反事实模拟

四个可调模型：线性激励（Holmström–Milgrom）、保险自付无谓损失、有限责任风险转移、监控–效率工资。

:::tabs
@@模型1 线性激励 β*
产出 \(y=e+\varepsilon\)，合同 \(w=α+βy\)，努力成本 \(c e^2/2\)，风险成本 \(r β^2 σ^2/2\)。最优 \(β^*=1/(1+r c σ^2)\)，\(e^*=β^*/c\)，有效努力 \(e_{FB}=1/c\)。

:::raw
<div class="tool" id="tool-hm">
  <div class="ctrl">
    <label>风险厌恶 r <output id="hm_rO">1.00</output></label>
    <input type="range" id="hm_r" min="0.10" max="4.00" step="0.05" value="1.00"/>
    <label>努力成本曲率 c <output id="hm_cO">1.00</output></label>
    <input type="range" id="hm_c" min="0.40" max="2.50" step="0.05" value="1.00"/>
    <label>噪声方差 σ² <output id="hm_sO">1.00</output></label>
    <input type="range" id="hm_s" min="0.10" max="4.00" step="0.05" value="1.00"/>
  </div>
  <div class="readout">
    <div class="ro">β* <b id="hm_beta">0.50</b></div>
    <div class="ro">e* / eFB <b id="hm_eff">0.50 / 1.00</b></div>
    <div class="ro">风险成本 <b id="hm_risk">0.125</b></div>
    <div class="ro">努力缺口 <b id="hm_gap">50.0%</b></div>
    <div id="hm_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="hmChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型2 保险自付
线性需求：全保险用量 \(q_0\)，全自付用量 \(q_1\)。共付比例 κ 时 \(q=q_0-(q_0-q_1)κ\)。期望单位损失 L。公平保费 \((1-κ)qL\)；无谓损失近似 \(0.5(q-q_1)L(1-κ)\)（需求线与边际成本三角形）。对照 RAND：共付提高显著降开支。【事实】

:::raw
<div class="tool" id="tool-ins">
  <div class="ctrl">
    <label>自付比例 κ <output id="ins_kO">0.25</output></label>
    <input type="range" id="ins_k" min="0.00" max="1.00" step="0.01" value="0.25"/>
    <label>全保险用量 q0 <output id="ins_q0O">1.30</output></label>
    <input type="range" id="ins_q0" min="1.05" max="1.80" step="0.01" value="1.30"/>
    <label>全自付用量 q1 <output id="ins_q1O">1.00</output></label>
    <input type="range" id="ins_q1" min="0.70" max="1.20" step="0.01" value="1.00"/>
    <label>单位损失 L <output id="ins_LO">10000</output></label>
    <input type="range" id="ins_L" min="2000" max="20000" step="500" value="10000"/>
  </div>
  <div class="readout">
    <div class="ro">用量 q <b id="ins_q">1.225</b></div>
    <div class="ro">公平保费 <b id="ins_prem">9188</b></div>
    <div class="ro">自付额 <b id="ins_oop">3063</b></div>
    <div class="ro">DWL <b id="ins_dwl">844</b></div>
    <div id="ins_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="insChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型3 风险转移
安全项目：成功概率 pS、成败收益 Hs/Fs；风险项目 pR、Hr/Fr。债务面值 D。股权 \(\mathbb{E}[\max(X-D,0)]\)，债务 \(\mathbb{E}[\min(X,D)]\)。默认参数下社会偏好安全（总价值 94 vs 76），但股权偏好风险（18 vs 32）——经典风险转移。【事实】

:::raw
<div class="tool" id="tool-rs">
  <div class="ctrl">
    <label>债务面值 D <output id="rs_dO">80</output></label>
    <input type="range" id="rs_d" min="20" max="120" step="1" value="80"/>
    <label>安全成功概率 pS <output id="rs_psO">0.90</output></label>
    <input type="range" id="rs_ps" min="0.50" max="0.98" step="0.01" value="0.90"/>
    <label>风险成功概率 pR <output id="rs_prO">0.40</output></label>
    <input type="range" id="rs_pr" min="0.10" max="0.70" step="0.01" value="0.40"/>
    <label>风险成功收益 Hr <output id="rs_hrO">160</output></label>
    <input type="range" id="rs_hr" min="110" max="220" step="1" value="160"/>
  </div>
  <div class="readout">
    <div class="ro">股权 安全/风险 <b id="rs_eq">18.0 / 32.0</b></div>
    <div class="ro">债务 安全/风险 <b id="rs_debt">76.0 / 44.0</b></div>
    <div class="ro">总价值 安全/风险 <b id="rs_tot">94.0 / 76.0</b></div>
    <div class="ro">选择 <b id="rs_pick">风险（转移）</b></div>
    <div id="rs_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="rsChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型4 监控–效率工资
偷懒私人收益 B，外部工资 w0，监控成本率 cm，努力产出价值 V。IC：\(w≥w_0+B/m\)。成本 \(w_0+B/m+m\cdot c_m\)，最优 \(m^*=\sqrt{B/c_m}\)（截断到 (0,1]）。

:::raw
<div class="tool" id="tool-mon">
  <div class="ctrl">
    <label>偷懒收益 B <output id="mon_bO">4.0</output></label>
    <input type="range" id="mon_b" min="1.0" max="12.0" step="0.1" value="4.0"/>
    <label>外部工资 w0 <output id="mon_w0O">10.0</output></label>
    <input type="range" id="mon_w0" min="4.0" max="20.0" step="0.5" value="10.0"/>
    <label>监控成本率 cm <output id="mon_cmO">16.0</output></label>
    <input type="range" id="mon_cm" min="1.0" max="36.0" step="0.5" value="16.0"/>
    <label>努力价值 V <output id="mon_vO">30.0</output></label>
    <input type="range" id="mon_v" min="15.0" max="50.0" step="0.5" value="30.0"/>
  </div>
  <div class="readout">
    <div class="ro">最优 m* <b id="mon_m">0.50</b></div>
    <div class="ro">效率工资 w <b id="mon_w">18.0</b></div>
    <div class="ro">总代理成本 <b id="mon_cost">26.0</b></div>
    <div class="ro">雇佣剩余 <b id="mon_sur">4.0</b></div>
    <div id="mon_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="monChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收动作 |
|---|---|---|
| L1 识病 | 能指出「后果未完全自担」 | 用自己行业举 1 例 |
| L2 算账 | 会算 β*、DWL、风险转移 | 模型 1–3 默认值口述对 |
| L3 开方 | 能在 κ/β/m/债约中选型 | 写一页组合方案 |
| L4 治理 | 能读存保–资本–追责文件 | 对照国办保险意见条款 |

# 30分钟最小实践

选一份你正在用的合同（劳动合同、外包单、保险单、借款协议），只做三步：

1. **圈出隐藏行动**（10 分钟）：对方签约后你看不见但影响结果的 1–3 个行为。
2. **标边际自担**（10 分钟）：出了问题对方承担多少？用 κ 或 β 粗标 0–1。
3. **改一个杠杆**（10 分钟）：只改一项——加免赔、加抽检、加抵押、或把一个可验证信号写进条款。写下「改前/改后私人边际」。

验收：一张纸上有「行动 / 自担份额 / 拟改杠杆」三行，且数字能自洽。

# 7天计划

| 天 | 动作 | 产出 |
|---|---|---|
| D1 | 重算模型 1 默认与 r↑ 情景 | 笔记：β* 如何降 |
| D2 | 对照 RAND：κ 与用量 | 一句话弹性直觉 |
| D3 | 模型 3 扫描 D | 找到风险转移阈值 |
| D4 | 拆一份真实保单自付结构 | 表：κ 分段 |
| D5 | 读一篇存保–风险文献摘要 | 3 条【待验证】 |
| D6 | 设计监控抽样方案 | m 与样本量表 |
| D7 | 复盘 30 分钟实践 | 改杠杆是否可执行 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 理论骨架 | IR/IC/β* 能默写 |
| W2 | 保险与用工 | 完成 2 份合同体检 |
| W3 | 公司金融 | 债约清单 + 风险转移案例 |
| W4 | 监管与组织 | 存保/资本对照表 + 团队分享 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | Holmström 隐藏行动 | 信息性信号应进入最优合同 |
| 2 | Holmström–Milgrom 线性 | \(β^*=1/(1+rcσ^2)\) |
| 3 | Grossman–Hart 离散行动 | 用似然比对支付排序 |
| 4 | Innes 有限责任 | 风险中性+LL 下债式合同常优 |
| 5 | Jensen–Meckling 代理成本 | 债与外部股权各自的代理成本权衡 |
| 6 | 保险共付需求 | κ↑ → q↓ → DWL↓（亦损保险价值） |
| 7 | 风险转移期权 | \(\max(y-D,0)\) 凸 → 偏好波动 |
| 8 | 效率工资–监控 | \(m^*=\sqrt{B/c_m}\) |
| 9 | 多代理人相对绩效 | 滤共同冲击，防合谋 |
| 10 | 存保道德风险 | 保障削弱市场约束，需差别费率/资本 |

# 关键问题清单

:::details Q1 如何区分道德风险与逆向选择？
看信息时点与识别策略：签约前类型 vs 签约后行为；合同外生变动、随机实验、动态面板。【分析】
:::

:::details Q2 为什么最优 β 通常小于 1？
因为代理人风险厌恶且产出有噪声；完全激励等于把保险功能关掉。【事实】
:::

:::details Q3 高免额一定好吗？
降 DWL 的同时可能抑制高价值护理；要看服务弹性与健康结果。【事实】
:::

:::details Q4 期权激励会否制造冒险？
会，尤其叠加高杠杆时；需债约与风险限额对冲。【分析】
:::

:::details Q5 监控能否替代绩效工资？
部分可以；最优是成本最小化的组合。【事实】
:::

:::details Q6 一阶方法何时失效？
保留效用过低、支付有下界绑定时；需检查全局 IC。【分析】
:::

:::details Q7 存款保险必然推高银行风险吗？
理论机制清晰；中国准实验文献多报告主动冒险上升，但资本与特许权价值可缓冲——标【待验证】看样本。【待验证】
:::

:::details Q8 团队里如何防「三个和尚没水喝」？
相对绩效、分解可验证产出、或改变团队边界。【分析】
:::

:::details Q9 文化与价值观有用吗？
可降低监控成本，但不能替代可验证条款；把文化当唯一杠杆通常失败。【推论】
:::

:::details Q10 今天就能改的最小杠杆是什么？
提高一个可观察行为的自担份额，或增加一次低成本抽检。【分析】
:::

# 下一阶段探索

- 深读 Georgiadis《Contracting with Moral Hazard》综述，建立文献地图。【分析】
- 对照逆向选择手册：同一保险市场两种扭曲如何叠加。
- 进入「信息甄别 / 信号传递」：签约前工具如何与签约后激励配套。
- 监管文本：国办加强保险业监管意见中的追责、早期纠正、与风险挂钩机制。【事实】

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 隐藏行动与信息性原理 | 经典论文 | Holmström 1979 Bell Journal | 【事实】 |
| 线性激励公式 | 经典论文 | Holmström–Milgrom 1987 | 【事实】 |
| 代理成本与所有权 | 经典论文 | Jensen–Meckling 1976 JFE | 【事实】 |
| 有限责任债式合同 | 理论 | Innes 1990 及后续综述 | 【事实】 |
| 医保自付与开支 | 随机实验 | RAND Health Insurance Experiment；Manning et al. | 【事实】 |
| 高免额减量 | 自然实验 | Brot-Goldberg et al. QJE 2017（约 12–14% 开支下降） | 【事实】 |
| FOA 适用范围 | 近作 | Gutiérrez 2024；arXiv 2506.18873（2025） | 【分析】 |
| 存保与银行冒险（中国） | 实证 | IRFA 2025 等准实验文献 | 【待验证】 |
| 保险业监管 | 政策 | 国务院 2024 年加强监管、推动保险业高质量发展意见 | 【事实】 |
| 合同理论综述 | 讲义/综述 | Georgiadis, Contracting with Moral Hazard | 【分析】 |

标记约定：【事实】多方一致或经典结果；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或样本外推风险高。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，不构成投资、保险购买、信贷、劳动合规或监管合规建议。文中数值多为教学标定，不代表任何真实机构的定价或风险。涉及金融与保险决策时，请咨询具备资质的专业人士，并以现行法律法规与合同文本为准。
