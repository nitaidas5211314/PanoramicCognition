---
slug: 机制设计（Mechanism Design）：反向博弈论——先设定想要的结果，再设计让理性人自愿达成它的规则
title: 机制设计（Mechanism Design）：反向博弈论
subtitle: 先设定想要的结果，再设计规则——让理性人<strong>自愿</strong>把信息吐出来、把行动对齐目标；2007 诺奖的骨架是启示原理、实施理论与最优拍卖。
brand_sub: Mechanism Design × Reverse Game Theory
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 机制设计, 启示原理, VCG, Myerson拍卖, 实施理论, Hurwicz, Maskin, Myerson]
theme_js_file: 机制设计（Mechanism Design）：反向博弈论——先设定想要的结果，再设计让理性人自愿达成它的规则.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**机制设计（Mechanism Design）**是**反向博弈论**：不预测「给定规则下均衡是什么」，而是**先选定社会目标**（效率、收入、公平、公共品供给……），再设计消息空间、分配规则与支付规则，使理性参与人的均衡行为恰好实现该目标。【事实】

2007 年诺贝尔经济学奖授予 Leonid Hurwicz、Eric Maskin、Roger Myerson，「for having laid the foundations of mechanism design theory」。【事实】核心三件套：

1. **激励相容（IC）**：说真话 / 选合意行动是均衡；
2. **启示原理（Revelation Principle）**：最优机制可限缩为「直接、激励相容」机制；
3. **实施理论（Implementation）**：不仅「能出现」合意结果，还要排除坏均衡（Maskin）。

与相邻主题分工：委托—代理手册专讲 IC+IR 约束骨架；本手册专讲**规则空间本身**——拍卖、投票、公共品、匹配、平台——以及「什么目标根本不可实施」。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么说服人」，而是：**在私人信息与自利激励下，哪些社会选择函数可被机制实施，实施它们的信息租金 / 效率损失有多大**。

边界：

- **在界内**：社会选择函数、直接/间接机制、DSIC / BIC、VCG、Myerson 最优拍卖、实施、不可能性定理。
- **在界外**：某次投标话术、某份股权行权日——除非压成「消息—分配—支付」三元组与 IC 检验。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 设计规则使均衡结果落在目标集合 |
| 2 | 边界在哪 | 到「可形式化的消息、分配、支付 + 解概念」为止 |
| 3 | 核心对象 | 类型、消息、分配规则 \(x\)、支付规则 \(p\)、目标 \(f\) |
| 4 | 参与者 | 机制设计者；持私人信息的参与人；有时还有旁观者（纳税人） |
| 5 | 关键变量 | 信息结构、偏好域、解概念（占优/贝叶斯）、预算平衡 |
| 6 | 可直接观察 | 出价、投票、成交价、中标者、公开规则 |
| 7 | 无法直接观察 | 真实估值、真实偏好、合谋意图 |
| 8 | 谁影响谁 | 规则 → 策略均衡 → 分配与支付 → 福利/收入 |
| 9 | 因果关系 | 私人信息 + 自利 ⇒ 必须付租金或扭曲分配才能抽取真相 |
| 10 | 只是相关 | 「规则复杂」≠「激励相容」；繁琐常掩盖可操纵性【分析】 |
| 11 | 表层现象 | 拍卖保留价、广告竞价、频谱牌照、学校匹配、碳配额 |
| 12 | 底层机制 | 约束优化：max 目标 s.t. IC（及 IR、预算、可行性） |
| 13 | 有反馈吗 | 有。参与人学习规则漏洞 → 设计者改规则（军备竞赛） |
| 14 | 有延迟吗 | 有。动态机制、声誉、重复拍卖改变静态 IC |
| 15 | 正/负反馈 | 合谋可正反馈掏空机制；透明+审计可负反馈 |

## 最关键的一句话

> 机制设计问的不是「他们会不会配合」，而是「在他们只为自己算账时，哪套规则仍能把结果钉在目标上」。

# 为什么值得研究

:::cards g3
### 它把「制度」变成可计算对象
市场、投票、监管、平台抽成——全是消息—分配—支付的实例；可比、可证、可改进。【事实】

### 它同时告诉你「能做到」与「做不到」
VCG 证明准线性偏好下效率可 DSIC 实施；Gibbard–Satterthwaite 证明一般投票域上策略证明几乎只剩独裁。【事实】

### 它是数字经济的操作系统
搜索广告、频谱拍卖、云计算现货、碳市场、匹配入学——设计失误以十亿计。【分析】
:::

:::note amber 最贵的一次误判
把「效率最优的直接机制」直接当「现实中该用的拍卖格式」。启示原理说的是**分析可限缩**，不是「请参与人申报类型」；落地常要翻译成英式升价、同时升价、GSP 等间接机制，并处理合谋、预算约束与明显策略证明（OSP）。【分析】
:::

# 世界地图

九层从「目标函数」爬到「制度军备」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="mdArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度军备 · 合谋防范 / 监管修订 / 平台规则迭代</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 实证与现场 · 频谱拍卖 / 广告竞价 / 匹配市场</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 稳健与明显性 · 信念无关 / OSP / 近似最优</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 跨域同构 · 拍卖 · 投票 · 公共品 · 合同 · 匹配</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 目标权衡 · 效率 vs 收入 vs 公平 vs 预算平衡</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 经典机制 · Vickrey / VCG / Myerson 保留价</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 解概念 · DSIC · BIC · 实施（Maskin）</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 启示原理 · 直接机制 + 激励相容即可搜最优</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 问题原语 · 目标 f + 私人类型 θ + 自利策略</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2–L4**：会用启示原理把问题压成直接机制，并算清 Vickrey/Myerson；进阶卡在 **L5** 与 **L7**——效率与收入不可兼得时如何取舍，以及参与人「看不懂」时 DSIC 是否还够用。【分析】
:::

# 核心概念地图

从抽象目标到可操作规则。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="100" y="16" width="480" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">目标 f(θ) → 机制 (M,g) → 均衡结果 = f</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">社会选择 / 可实施性</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">启示 · IC · 支付</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">拍卖·投票·匹配·监管</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">类型 θ 私人</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">不可强制披露</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">直接机制</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">报告 → (x,p)</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">间接翻译</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">升价/GSP/时钟</text>

  <line x1="130" y1="146" x2="130" y2="180" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="146" x2="340" y2="180" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="550" y1="146" x2="550" y2="180" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <path d="M220 215 H250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <path d="M430 215 H460" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="280" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红虚线 = 反馈：操纵/合谋暴露 → 改支付或改域假设</text>
  <text x="340" y="310" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">跨域同构：IC≈「说谎不划算」· 保留价≈「虚拟估值截断」</text>
  <text x="340" y="340" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">VCG 抽外部性 · Myerson 卖虚拟福利 · Maskin 剔坏均衡</text>
</svg>
:::

# 核心参与者

| 角色 | 目标 | 信息位置 | 典型工具 |
|---|---|---|---|
| 机制设计者 | max 福利 / 收入 / 公平指标 | 通常不知私人类型 | 规则书、保留价、支付公式 |
| 参与人 | max 自身效用 | 持有类型 θ | 出价、投票、报告、是否参与 |
| 旁观者 / 纳税人 | 承担赤字或享受剩余 | 常被忽略 | 预算平衡、补贴上限 |
| 监管者 | 防合谋、防掠夺、护竞争 | 强制披露与审计 | 拍卖规则备案、反垄断 |

Hurwicz（1960s 起）：把「机制」形式化为消息交换 + 结果函数；激励相容成为核心约束。【事实】

# 核心变量

| 变量 | 含义 | 杠杆方向 |
|---|---|---|
| 偏好域 | 允许的类型集合 | 域越窄，可实施目标越多（单峰 → 中位数投票） |
| 解概念 | DSIC / BIC / NE 实施 | 越强越稳健，可实施集合越小 |
| 支付工具 | 是否允许准线性转移 | 有转移 → VCG 逃出 G–S；无转移 → 投票不可能 |
| 虚拟估值 \(\phi(v)\) | \(v-(1-F)/f\) | Myerson：按 \(\phi\) 分配 = 收入最优 |
| 保留价 / 门槛 | 截断低类型 | 抬收入、损效率；均匀 [0,1] 最优保留价 **1/2** |
| 预算平衡 | \(\sum p_i \ge\) 成本 | 常与效率+IC 冲突（公共品） |
| 合谋空间 | 侧支付、假名 | VCG 对合谋脆弱；需改格式 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">私人类型 θ</text>
  <rect x="180" y="40" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">消息 / 出价</text>
  <rect x="340" y="40" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="400" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">分配 x · 支付 p</text>
  <rect x="500" y="40" width="160" height="50" rx="8" fill="#15181d"/><text x="580" y="70" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">福利 / 收入</text>
  <line x1="140" y1="65" x2="180" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="300" y1="65" x2="340" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="460" y1="65" x2="500" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="180" y="140" width="280" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="320" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">IC 约束：说谎收益 ≤ 真话收益</text>
  <path d="M240 90 V140" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <path d="M400 90 V140" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>

  <rect x="100" y="230" width="480" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="255" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">设计者选 (x,p) 使 IC 成立且目标最优</text>
  <text x="340" y="275" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">实线=因果链 · 红虚线=激励反馈（可操纵则改支付）</text>
</svg>
:::

因果主链：信息不对称 → 必须用支付/扭曲购买真话 → 效率或收入出现次优缺口。【推论】

# 隐藏关系

:::cards g2
### 启示原理 ≠ 「请大家报类型」
它是**搜索空间压缩定理**：任意间接机制的均衡结果，可被某个直接 IC 机制复制。设计者仍常实施升价拍卖等「好懂」的间接形式。【事实】

### VCG 逃出 G–S，靠的是域限制 + 转移支付
Gibbard–Satterthwaite：一般域、确定性、满射、策略证明 ⇒ 独裁。VCG 依赖**准线性**偏好与货币转移，不在 G–S 假设内。【事实】

### 收入最优常故意牺牲效率
Myerson：按虚拟估值 \(\phi\) 分配；\(\phi(v)<0\) 时宁可不卖。均匀 [0,1] 单物品 i.i.d.：最优 = 二价 + 保留价 1/2。【事实】

### 「多一个竞买人」可替代最优机制
Bulow–Klemperer：在规则条件下，多招一名竞买人跑无保留价 Vickrey，期望收入不低于少一人的最优拍卖。【事实】
:::

# 系统运行机制

标准三步（诺贝尔委员会表述）：

1. **预测**：给定规则，用博弈论求均衡行为；
2. **评价**：按目标函数给结果打分；
3. **优化**：在激励约束下选规则——启示原理把第 3 步变成「在直接 IC 机制上优化」。【事实】

运行时闭环：

:::note teal 运行闭环
设定目标 f → 选解概念 → 写 IC/IR → 求最优直接机制 → 翻译为现场格式 → 观测操纵 → 修订
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="70" cy="100" r="10" fill="#0f8a4d"/><text x="70" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1960s</text><text x="70" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Hurwicz</text><text x="70" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">机制形式化</text>
  <circle cx="200" cy="100" r="10" fill="#1d4ed8"/><text x="200" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1970s</text><text x="200" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">启示原理</text><text x="200" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Gibbard/Myerson</text>
  <circle cx="330" cy="100" r="10" fill="#1d4ed8"/><text x="330" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1981</text><text x="330" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Myerson</text><text x="330" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">最优拍卖</text>
  <circle cx="460" cy="100" r="10" fill="#b8730a"/><text x="460" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1990s+</text><text x="460" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">频谱/匹配</text><text x="460" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">现场大规模</text>
  <circle cx="590" cy="100" r="10" fill="#15181d"/><text x="590" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">2007→今</text><text x="590" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">诺奖/OSP</text><text x="590" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">算法机制</text>
</svg>
:::

Vickrey（1961）二价拍卖 → Clarke（1971）/ Groves（1973）推广为 VCG；FCC 等 1990 年代起大规模频谱拍卖把理论推到现场。【事实】

# 利益与激励

| 主体 | 公开说辞 | 真实激励 | 对机制的压力 |
|---|---|---|---|
| 卖方 / 政府 | 效率与公平 | 收入、政治可辩护性 | 要保留价、要简单 |
| 高估值买方 | 公平竞争 | 少付钱、排挤对手 | 压低报价、合谋、假名 |
| 低估值买方 | 参与机会 | 信息租金或被扭曲出局 | 抱怨「门槛太高」 |
| 平台 | 生态繁荣 | 抽成与广告收入 | GSP/VCG 变体、质量分 |
| 设计顾问 | 科学最优 | 可落地与可解释 | 简单近似 > 复杂最优 |

激励不相容的制度，长期会被「套利者」教育成另一套制度。【推论】

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
    <marker id="fB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="140" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">私人估值</text><text x="110" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">信息源</text>
  <rect x="270" y="30" width="140" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">机制黑箱</text><text x="340" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">x(·), p(·)</text>
  <rect x="500" y="30" width="140" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="570" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">物品 / 席位</text><text x="570" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">实物流</text>
  <line x1="180" y1="55" x2="270" y2="55" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#fA)"/>
  <line x1="410" y1="55" x2="500" y2="55" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#fA)"/>
  <text x="340" y="20" text-anchor="middle" fill="#0f8a4d" font-size="11" font-family="sans-serif">报告 / 出价（信息流）</text>

  <rect x="270" y="150" width="140" height="70" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="340" y="180" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">支付抽水</text><text x="340" y="200" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">p → 卖方/国库</text>
  <path d="M340 100 V150" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#fB)"/>
  <text x="420" y="130" fill="#d5342c" font-size="11" font-family="sans-serif">货币流（可含信息租金）</text>
  <text x="340" y="250" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">VCG：支付 = 你加给别人的外部性；Myerson：抽虚拟福利</text>
</svg>
:::

信息向上汇聚，物品按规则分配，货币按支付规则抽走——**抽水量**就是激励成本。【分析】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何锋利 | 操作提示 |
|---|---|---|---|
| 1 | 先写清目标 f | 效率/收入/公平互相冲突 | 一页写「最大化什么、容忍什么损失」 |
| 2 | 选解概念强度 | DSIC 稳健但苛刻 | 高风险用占优；重复场景可 BIC |
| 3 | 启示原理做搜索 | 避免穷举间接格式 | 先求最优直接，再翻译 |
| 4 | 保留价 / 虚拟估值 | 收入侧主旋钮 | 均匀先验先试 r=垄断价 |
| 5 | 多招竞买人 | 常优于精修机制 | Bulow–Klemperer 思维 |
| 6 | 偏好域假设 | 决定可能性边界 | 单峰？准线性？相关价值？ |
| 7 | 支付可验证性 | 防假名与合谋 | 身份、保证金、事后审计 |
| 8 | 明显策略证明 | 降低认知失败 | 二价密封在单物品上 OSP |
| 9 | 简单近似机制 | 复杂最优难落地 | 「简单 vs 最优」文献 |
| 10 | 实施/多重均衡 | Maskin 单调性 | 检查坏均衡是否可被踢掉 |

# 常见认知陷阱

:::details 1. 把纳什预测当成机制设计
给定规则求均衡是「正向」博弈；机制设计是改规则。混用会导致「既然均衡糟糕，人不够理性」——其实该改支付。【分析】

:::

:::details 2. 以为说真话机制「不需要钱」
VCG/Myerson 用支付买激励；没有转移支付时，一般域上策略证明几乎不可能（G–S）。【事实】

:::

:::details 3. 把启示原理当成操作手册
直接机制是分析工具；现场参与人常拒绝「申报类型」，需要时钟拍卖等翻译。【分析】

:::

:::details 4. 只看效率，不看收入与政治约束
政府拍卖常被要求「卖个好价钱」；纯 VCG 可能低收入甚至收入怪癖（多一人收入下降）。【待验证】

:::

:::details 5. 忽略合谋与假名
VCG 对合谋脆弱；多物品假名可操纵。理论 DSIC ≠ 抗合谋。【事实】

:::

:::details 6. 用「平均出价」当估值
收益等价等结论依赖模型；现场有共同价值、预算约束、声誉——先验错则保留价错。【分析】

:::

:::details 7. 以为保留价越高越好
均匀 [0,1] 单买家：r*(1−r) 在 r=0.5 最大；再高成交概率崩塌。【事实】

:::

:::details 8. 把 GSP 广告当成 VCG
广义二价（GSP）不是 DSIC；实践靠质量分与学习，不能用 VCG 定理直接背书。【事实】

:::

:::details 9. 忽视「参与人不懂」
Li（2017）明显策略证明：二价单物品 OSP，多物品福利最优且败者零支付时 OSP 失败。【事实】

:::

:::details 10. 目标未定义就上算法
「用 AI 优化拍卖」若目标函数含糊，优化的是代理指标而非社会目标。【推论】
:::

<!-- nav:实践落地 -->
# 从抽象到现实

| 抽象构件 | 现实对应 |
|---|---|
| 类型 θ | 估值、成本、偏好序、点击价值 |
| 直接机制 | 「报你的值」的密封投标（分析用） |
| 间接机制 | 英式拍卖、同时升价、GSP、Deferred Acceptance |
| VCG 支付 | 二价、Clarke 枢轴税、部分广告结算 |
| 虚拟估值门槛 | 保留价、准入门槛、质量加权 |
| 实施 | 章程写死决胜规则，避免「再协商」坏均衡 |

跨域同构：拍卖的保留价 ↔ 保险免赔 ↔ 平台最低抽成 ↔ 监管最低资本——都是「截断低类型 / 买激励」。【分析】

# 从理论到行动

1. **一句话目标**：效率？收入？覆盖？写出可测指标。
2. **信息图**：谁知道什么、何时知道。
3. **解概念**：占优还是贝叶斯？参与人是否老练？
4. **基准机制**：Vickrey / 邮资定价 / 随机独裁——先有可辩护基准。
5. **扭曲清单**：保留价、配额、预留份额——每条写清代价。
6. **攻击面**：合谋、假名、预算、后悔、诉讼。
7. **翻译与试点**：间接格式 + 小流量 A/B 或实验室。
8. **迭代**：把操纵事件写进规则补丁，而不是道德谴责。

# 技能树

:::details S1 语言层
会区分机制 / 博弈 / 社会选择函数；会写 (x,p)；会陈述 IC。【验收】用 5 句话解释启示原理给非技术同事。

:::

:::details S2 经典机制层
会证二价说真话；会算 Clarke 支付；会写 \(\phi(v)\) 并求 \(\phi(r)=0\)。【验收】均匀 [0,1] 口述保留价 1/2 与二人期望收入 5/12。

:::

:::details S3 权衡层
会解释效率—收入权衡；会用 Bulow–Klemperer 做「招人 vs 精修」决策。【验收】给案例选「加竞买人」或「加保留价」。

:::

:::details S4 不可能性与域
知道 G–S、预算平衡冲突、Maskin 单调性直觉。【验收】说明为何 VCG 不受 G–S 直接打击。

:::

:::details S5 现场工程层
能把直接机制译成升价/匹配程序；能列合谋与 OSP 检查表。【验收】一页频谱/广告/校招机制评审意见。
:::

# 游戏化世界

你是「规则建筑师」。关卡：柠檬车拍卖 → 公共品筹资 → 双物品合谋攻击 → 监管要求收入下限。经验值来自：**在攻击下目标仍成立的次数**，不是规则有多炫。

# 任务系统

| 任务 | 产出 | 验收 |
|---|---|---|
| T1 二价手算 | 估值表 + 真话/假话效用 | 假话效用 ≤ 真话 |
| T2 Myerson 保留价 | 给定 F 求 r* | \(\phi(r^*)=0\) |
| T3 VCG 公共品 | 两人估值与成本 → 支付 | 与模型默认一致 |
| T4 攻击演练 | 写出一种合谋或假名 | 指出 DSIC 哪条被绕过 |
| T5 目标声明 | 半页 f 与不可接受损失 | 同事能复述 |
| T6 现实拆解 | 一份招标文件 | 标出消息/分配/支付 |

# 反事实模拟

四个可调模型：二价激励、Myerson 保留价收入、VCG 公共品枢轴支付、Bulow–Klemperer「多一人」。

:::tabs
@@模型1 二价 · 说真话
单物品密封二价：最高价获胜，付第二高价。占优策略：出价 = 真实估值。拖动「你的估值 / 你的出价 / 对手最高价」，看真话与假话效用差。默认 v=80, b=80, s=60 → 获胜、支付 60、效用 **20**；若改 b=50 而 s=60 则落败效用 **0**。【推论】

:::raw
<div class="tool" id="tool-vk">
  <div class="ctrl">
    <label>你的真实估值 v <output id="vk_vO">80</output></label>
    <input type="range" id="vk_v" min="10" max="100" step="1" value="80"/>
    <label>你的出价 b <output id="vk_bO">80</output></label>
    <input type="range" id="vk_b" min="0" max="100" step="1" value="80"/>
    <label>对手最高出价 s <output id="vk_sO">60</output></label>
    <input type="range" id="vk_s" min="0" max="100" step="1" value="60"/>
  </div>
  <div class="readout">
    <div class="ro">结果 <b id="vk_res">获胜</b></div>
    <div class="ro">支付 / 效用 <b id="vk_pay">60 / 20</b></div>
    <div class="ro">若改报 b′=v 效用 <b id="vk_truth">20</b></div>
    <div class="ro">效用缺口（假−真） <b id="vk_gap">0</b></div>
    <div id="vk_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="vkChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型2 Myerson 保留价
n 名竞买人 i.i.d. 均匀 [0,1]，二价 + 保留价 r。虚拟估值 \(\phi(v)=2v-1\)，\(\phi(r)=0\Rightarrow r^*=0.5\)。默认 n=2,r=0.5 → 期望收入约 **0.417**（理论 5/12）；r=0 时约 **0.333**（理论 1/3）。【事实】

:::raw
<div class="tool" id="tool-my">
  <div class="ctrl">
    <label>竞买人数 n <output id="my_nO">2</output></label>
    <input type="range" id="my_n" min="1" max="8" step="1" value="2"/>
    <label>保留价 r <output id="my_rO">0.50</output></label>
    <input type="range" id="my_r" min="0.00" max="0.90" step="0.01" value="0.50"/>
  </div>
  <div class="readout">
    <div class="ro">E[收入]（模拟） <b id="my_rev">0.417</b></div>
    <div class="ro">r=0 对照 <b id="my_r0">0.333</b></div>
    <div class="ro">相对提升 <b id="my_lift">+25.2%</b></div>
    <div class="ro">φ(r)=2r−1 <b id="my_phi">0.00</b></div>
    <div id="my_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="myChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型3 VCG 公共品 · Clarke
两人公共项目成本 C，估值 v₁,v₂。若 v₁+v₂≥C 则建造；i 的 Clarke 支付 = max(0, C−v₋ᵢ)（建造时）。默认 v₁=8,v₂=6,C=10 → 建造，支付 **4 与 2**，社会剩余 **4**。【推论】

:::raw
<div class="tool" id="tool-vc">
  <div class="ctrl">
    <label>估值 v₁ <output id="vc_v1O">8.0</output></label>
    <input type="range" id="vc_v1" min="0" max="20" step="0.5" value="8"/>
    <label>估值 v₂ <output id="vc_v2O">6.0</output></label>
    <input type="range" id="vc_v2" min="0" max="20" step="0.5" value="6"/>
    <label>项目成本 C <output id="vc_cO">10.0</output></label>
    <input type="range" id="vc_c" min="1" max="30" step="0.5" value="10"/>
  </div>
  <div class="readout">
    <div class="ro">是否建造 <b id="vc_build">是</b></div>
    <div class="ro">支付 p₁ / p₂ <b id="vc_pay">4.0 / 2.0</b></div>
    <div class="ro">社会剩余 <b id="vc_sur">4.0</b></div>
    <div class="ro">支付合计（可有缺口） <b id="vc_sum">6.0</b></div>
    <div id="vc_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="vcChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型4 多一人 vs 最优保留价
Bulow–Klemperer 直觉：n+1 人无保留价二价 vs n 人最优保留价（此处 r=0.5）。默认比较 n=2 最优 vs n=3 无保留：后者期望收入约 **0.50**，前者约 **0.417**——多一人更赚。【事实】

:::raw
<div class="tool" id="tool-bk">
  <div class="ctrl">
    <label>基准人数 n <output id="bk_nO">2</output></label>
    <input type="range" id="bk_n" min="1" max="6" step="1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">n 人 · r=0.5 <b id="bk_opt">0.417</b></div>
    <div class="ro">n+1 人 · r=0 <b id="bk_more">0.500</b></div>
    <div class="ro">差额（多一人−最优） <b id="bk_diff">+0.083</b></div>
    <div class="ro">建议 <b id="bk_rec">优先扩场</b></div>
    <div id="bk_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="bkChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收动作 |
|---|---|---|
| L1 识骨 | 能指出规则里的消息/分配/支付 | 拆一份招标文件 |
| L2 算账 | 会算二价效用、保留价、Clarke 支付 | 模型默认值口述对 |
| L3 权衡 | 会在效率/收入/简单性间取舍 | 3 分钟给案例选机制族 |
| L4 设计 | 能写一页机制说明 + 攻击面 | 同事按说明可模拟一轮 |

# 30分钟最小实践

1. 选一个你熟悉的分配场景（会议室预订、团购、内部招标、家庭旅行决策）。
2. 用 10 分钟写：参与人、私人信息、目标 f（一句话）。
3. 用 10 分钟设计「密封报价 + 二价」或「报估值 + Clarke」最小规则。
4. 用 10 分钟做一次桌面推演：每人试一次谎报，记录谁受益——若谎报严格更赚，改支付直到说真话不吃亏。

验收：一张纸上有「真话效用 ≥ 假话效用」的数字对照。【分析】

# 7天计划

| 天 | 焦点 | 产出 |
|---|---|---|
| D1 | 诺奖通俗文 + 本手册 L1–L3 | 术语卡 12 张 |
| D2 | 手算二价与 VCG 公共品 | 两道题满分 |
| D3 | Myerson \(\phi\) 与保留价 | 一个分布的 r* |
| D4 | 读一篇简单 vs 最优 | 半页笔记 |
| D5 | 拆真实拍卖公告 | 标注三元组 |
| D6 | 合谋/假名头脑风暴 | 攻击清单 |
| D7 | 复盘 + 30 分钟实践升级版 | 一页机制草稿 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 经典机制 | 二价、VCG、Myerson 默认可心算 |
| W2 | 不可能性与域 | 能解释 G–S 与 VCG 逃逸 |
| W3 | 现场格式 | 升价/匹配/广告之一深挖 |
| W4 | 完整小设计 | 目标→机制→攻击→修订闭环 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 启示原理 | 最优可在直接 IC 机制中搜索 |
| 2 | 激励相容 | 真话是均衡（占优或贝叶斯） |
| 3 | Vickrey 二价 | 付第二高价 ⇒ 说真话占优 |
| 4 | VCG / Groves | 付外部性 ⇒ 效率 + DSIC（准线性） |
| 5 | Myerson 引理 | E[收入]=E[虚拟福利] |
| 6 | 虚拟估值 \(\phi\) | 收入最优按 \(\phi\) 分配 |
| 7 | 收益等价 | 同分配+边界 ⇒ 同期望收入 |
| 8 | Bulow–Klemperer | 多一人常优于精修最优 |
| 9 | Gibbard–Satterthwaite | 一般投票域策略证明≈独裁 |
| 10 | Maskin 实施 | 合意结果须排除坏均衡 |

# 关键问题清单

:::details Q1 我的目标是效率还是收入？
写下来；二者冲突时先定权重，再选 VCG 族或 Myerson 族。【分析】

:::

:::details Q2 参与人是否理解占优策略？
若否，考虑英式拍卖或 OSP 友好格式，而不是复杂密封直接机制。【分析】

:::

:::details Q3 先验 F 从哪来？
错先验 → 错保留价；可用非参或「简单机制」对先验更稳健。【待验证】

:::

:::details Q4 有没有货币转移？
无转移则小心 G–S；有准线性转移才谈 VCG。【事实】

:::

:::details Q5 预算必须平衡吗？
公共品常无法同时效率+IC+预算平衡；要明确谁补缺口。【事实】

:::

:::details Q6 合谋空间多大？
侧支付、行业协会、多账号——DSIC 挡不住。【分析】

:::

:::details Q7 相关价值还是独立私有价值？
矿物权/频谱常有共同价值成分，胜利诅咒改变策略。【分析】

:::

:::details Q8 监管要的是收入下限还是配置效率？
决定保留价与预留份额政治约束。【分析】

:::

:::details Q9 间接翻译是否保持 IC？
升价拍卖在 IPV 下可实现 Vickrey 结果；改错细节会破。【事实】

:::

:::details Q10 失败时改规则还是训参与人？
优先改规则；把「教育用户」当辅助。【推论】
:::

# 下一阶段探索

- 与《委托—代理：IC+IR》对照：同一约束语言，不同应用舞台（合同 vs 规则空间）。
- 深入匹配市场（Gale–Shapley）、动态机制、算法机制设计（逼近比）。
- 阅读 Nobel 2007 通俗说明与 Myerson（1981）*Optimal Auction Design* 导读。
- 关注明显策略证明（OSP）与「简单 vs 最优」前沿对平台规则的含义。【分析】

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 2007 诺奖授予 Hurwicz/Maskin/Myerson | 官方 | NobelPrize.org 新闻稿与通俗说明 | 【事实】 |
| 启示原理与实施理论定位 | 官方/教材 | Nobel 2007 Popular information；标准教材 | 【事实】 |
| Vickrey–Clarke–Groves 机制 | 经典论文/综述 | Vickrey 1961；Clarke 1971；Groves 1973 | 【事实】 |
| Myerson 最优拍卖与虚拟估值 | 经典论文 | Myerson (1981) Math. Oper. Res.；均匀 [0,1] 例 | 【事实】 |
| 二人均匀二价+保留价收入 5/12 | 标准推导 | 课堂/教材一致结果；本手册模拟复核 | 【事实】 |
| Bulow–Klemperer 多一人结论 | 经典论文 | Bulow & Klemperer；Roughgarden 等综述 | 【事实】 |
| Gibbard–Satterthwaite 不可能 | 经典定理 | Gibbard 1973；Satterthwaite 1975 | 【事实】 |
| OSP 与多物品限制 | 学术 | Li (2015/2017)；Ashlagi–Gonczarowski 等 | 【事实】 |
| 频谱拍卖现场复杂性 | 政策/学术 | FCC 实践；Cramton 等 package bidding 讨论 | 【分析】 |
| GSP 非 DSIC | 产业/学术 | 搜索广告机制文献共识 | 【事实】 |

标记约定：【事实】多方一致或经典定理；【分析】权威判断或结构化推理；【推论】由模型推出；【假设】未验证；【待验证】单一来源或易过时数字。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，**不构成**投资、采购、招标、拍卖策略或法律建议。机制设计模型依赖偏好域、信息结构与理性假设；现实中的合谋、预算、共同价值、政治约束与认知限制可能导致结论偏移。任何将本手册用于商业竞价或公共资源配置的决策，应另行咨询具备资质的专业人士并完成独立尽职调查。作者与发布方不对依据本手册采取的行动承担损失责任。
