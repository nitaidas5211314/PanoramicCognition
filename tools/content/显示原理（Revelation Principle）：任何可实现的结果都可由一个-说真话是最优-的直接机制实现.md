---
slug: 显示原理（Revelation Principle）：任何可实现的结果都可由一个-说真话是最优-的直接机制实现
title: 显示原理（Revelation Principle）
subtitle: 任何可实现的结果，都可由一个<strong>「说真话是最优」</strong>的直接机制复制——它压缩搜索空间，不保证目标可实现，也不等于「请大家报类型」。
brand_sub: Revelation Principle × Mechanism Design
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 机制设计, 显示原理, 启示原理, 激励相容, DSIC, BIC, Myerson, Gibbard]
theme_js_file: 显示原理（Revelation Principle）：任何可实现的结果都可由一个-说真话是最优-的直接机制实现.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**显示原理（Revelation Principle，亦称启示原理）**：若某个（可能很复杂的）机制在某一均衡下实现了社会选择函数 \(f\)，则存在一个**直接机制**——每人只报告自己的类型——使**说真话是同一解概念下的均衡**，且均衡结果与原机制一致。【事实】

直觉一句：**机制替你撒谎**——把原均衡策略 \(s_i(\theta_i)\) 编译进规则里，参与人只需交真实类型，由机制代跑 \(s_i\)。偏离真话 ≈ 在原机制里偏离均衡，因此不划算。【事实】

它**不说**「所有目标都能实现」，也**不说**「现场必须让人填类型表」。它说的是：**找最优机制时，可无损失地限缩到「直接 + 激励相容」这一子类。**【分析】

与相邻手册分工：《机制设计》讲整座大厦；《委托—代理》讲 IC+IR 约束语言；本手册专剖显示原理本身——构造、版本、适用边界与失效条件。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么让人诚实」，而是：**在私人信息与自利下，哪些均衡结果可以「无损失地」写成说真话的直接机制；何时这种压缩失败。**

边界：

- **在界内**：直接/间接机制、DSIC / BIC、均衡复制、搜索空间压缩、失效条件（误报成本、部分可验证、多设计者竞争、不完全承诺）。
- **在界外**：某次谈判话术、企业文化「鼓励透明」——除非压成「消息空间—结果函数—解概念」三元组。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 均衡可实施结果 ↔ 直接 IC 机制的等价性 |
| 2 | 边界在哪 | 到「解概念下的均衡复制」为止；不含「道德劝说」 |
| 3 | 核心对象 | 类型 θ、消息空间 M、策略 s、结果 g、目标 f |
| 4 | 参与者 | 设计者；持私人类型的参与人；有时多个竞争设计者 |
| 5 | 关键变量 | 解概念强度、误报可行性/成本、承诺能力、通信约束 |
| 6 | 可直接观察 | 出价、选票、表单填写、成交价 |
| 7 | 无法直接观察 | 真实类型、均衡选择、侧合同 |
| 8 | 谁影响谁 | 原机制均衡 → 编译为直接机制 → 真话均衡复制结果 |
| 9 | 因果关系 | 均衡最优 ⇒ 代跑该均衡的直接机制中真话最优 |
| 10 | 只是相关 | 「规则简单」≠「显示原理适用」；简单间接机制可能更易懂 |
| 11 | 表层现象 | 密封拍卖、报税、保险菜单、平台评分规则 |
| 12 | 底层机制 | 构造性证明：把 \(s(\theta)\) 嵌进直接机制 |
| 13 | 有反馈吗 | 有。参与人发现漏洞 → 改规则 → 新均衡需重新编译 |
| 14 | 有延迟吗 | 有。动态/多阶段机制的显示原理版本更强、更脆 |
| 15 | 正/负反馈 | 合谋可掏空「单人 IC」；审计降低误报可行性 |

## 最关键的一句话

> 显示原理是**分析工具**（压缩可行集），不是**实施说明书**（现场格式可以仍是升价、菜单、多轮竞价）。

# 为什么值得研究

:::cards g3
### 它把「无限规则」变成可优化问题
任意消息空间的机制空间巨大；显示原理允许只在直接 IC 机制上做约束优化（如 Myerson 最优拍卖）。【事实】

### 它解释「一价也有真话版」
一价密封拍卖均衡里人人压价；编译后得到「报估值、付 \(b(r)\)」的直接 BIC 机制——结果同分布。【事实】

### 它标出理论的断裂点
误报有成本、类型不可任意声称、多卖方竞争、设计者承诺不足——显示原理可能失效，此时必须搜间接机制。【分析】
:::

:::note amber 最贵的一次误读
把显示原理读成「请所有人申报真实类型」。诺贝尔委员会与教材强调的是**无损失限缩分析范围**；现场常翻译成英式升价、同时升价、活动规则（activity rules）等，降低认知负担并保留激励性质。【分析】
:::

# 世界地图

九层从「问题原语」爬到「失效与军备」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="rpArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 失效前沿 · 误报成本 / 竞争机制 / 计算与通信约束</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 现场翻译 · 升价拍卖 / 活动规则 / 迭代 VCG</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 应用层 · 最优拍卖 · 监管 · 公共品 · 匹配</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 跨域同构 · 编译器 · API 门面 · 报税简化</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 解概念梯 · DSIC ⊃ EPIC ⊃ BIC（越强越稳、集合越小）</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 经典例 · Vickrey DSIC · 一价→直接 BIC 编译</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 构造核 · 「机制替你撒谎」· 均衡策略内嵌</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 定理陈述 · 间接可实施 ⇒ 存在直接 IC 复制</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 问题原语 · 类型 θ · 机制 (M,g) · 社会选择 f</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2–L4**：会陈述定理、会手算「一价编译」与二价说真话；进阶卡在 **L5** 与 **L9**——换解概念时结论怎么变，以及哪些现实摩擦让「无损失限缩」失效。【分析】
:::

# 核心概念地图

抽象定理 → 构造机制 → 操作清单。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="80" y="16" width="520" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">间接机制 + 均衡 s → 直接机制 + 真话 ≈ 同结果</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">可实施性 / 无损失</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">编译 s(θ) 进规则</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">搜 IC · 再译现场</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">类型空间 Θ</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">消息 = 报告 θ̂</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">IC 约束</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">DSIC 或 BIC</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">失效探针</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">成本·验证·竞争</text>

  <line x1="130" y1="146" x2="130" y2="180" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="146" x2="340" y2="180" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="550" y1="146" x2="550" y2="180" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <path d="M220 215 H250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <path d="M430 215 H460" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="280" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红虚线 = 反馈：IC 松弛 / 失效暴露 → 改假设或改搜间接机制</text>
  <text x="340" y="310" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">跨域同构：显示原理 ≈「把策略折叠进接口」的编译器</text>
  <text x="340" y="340" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">Gibbard 占优版 · Myerson 贝叶斯版 · 动态广义版</text>
</svg>
:::

# 核心参与者

| 角色 | 目标 | 信息位置 | 与显示原理的关系 |
|---|---|---|---|
| 机制设计者 | 在 IC（及 IR 等）下优化目标 | 不知私人类型 | 用原理压缩候选机制集 |
| 参与人 | max 自身期望效用 | 持有 θ | 在直接机制中选择报告 θ̂ |
| 理论史贡献者 | 形式化「无损失」 | — | Gibbard（占优）；Dasgupta–Hammond–Maskin、Holmström、Myerson 等（贝叶斯）【事实】 |
| 算法/市场工程师 | 可计算、可沟通的现场格式 | 部分可观测 | 常把直接 IC 结果**再翻译**成间接机制 |
| 批评者 / 前沿 | 找失效条件 | 模型假设外 | 误报成本、竞争机制、计算约束【分析】 |

Allan Gibbard（1973）给出占优策略版本；贝叶斯版本由多人独立推进，Myerson 将其推到广泛应用（拍卖、规制）。【事实】

# 核心变量

| 变量 | 含义 | 杠杆方向 |
|---|---|---|
| 消息空间 \(M_i\) | 参与人可发送的信号 | 间接机制任意；直接机制 \(M_i=\Theta_i\) |
| 均衡策略 \(s_i(\theta_i)\) | 原机制中的均衡行为 | 编译对象；被嵌进直接机制 |
| 解概念 | DSIC / EPIC / BIC | 越强，原理结论越「稳健」，可实施集越小 |
| 误报图 / 成本 | 谁能声称何种类型、撒谎代价 | 成本/限制破坏「无损失」时原理失效 |
| 承诺 | 设计者能否兑现规则 | 不完全承诺可破坏标准形式 |
| 设计者个数 | 单机制 vs 竞争机制 | 多设计者时类型空间本身纠缠【分析】 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="40" width="130" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="85" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">间接机制 M</text>
  <rect x="180" y="40" width="130" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="245" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">均衡 s(θ)</text>
  <rect x="340" y="40" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="410" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">直接机制 M*</text>
  <rect x="510" y="40" width="150" height="50" rx="8" fill="#15181d"/><text x="585" y="70" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">真话 ⇒ 同结果</text>
  <line x1="150" y1="65" x2="180" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="310" y1="65" x2="340" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="480" y1="65" x2="510" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="160" y="140" width="320" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="320" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">偏离真话 ≈ 在 M 中偏离 s · 故不优</text>
  <path d="M245 90 V140" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <path d="M410 90 V140" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>

  <rect x="80" y="230" width="520" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="255" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">因果核：均衡最优性被「编译」成激励相容</text>
  <text x="340" y="275" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">实线=构造链 · 红虚线=激励反馈（假话=原偏离）</text>
</svg>
:::

因果主链：存在均衡实施 → 可构造直接 IC 机制复制该均衡路径上的结果。【事实】

# 隐藏关系

:::cards g2
### 显示原理 ≠ 「人们会诚实」
它保证存在一个使诚实成为均衡的直接机制；不保证参与人理解、不保证唯一均衡、不保证合谋后仍诚实。【事实】

### 「一价不诚实」与「可编译为诚实」不矛盾
一价均衡策略压价；直接机制问估值、按 \(b(\hat v)\) 代出价——报告真实估值是 BIC。【事实】

### 实施理论比显示原理更苛刻
显示原理管「某个均衡」；Maskin 式实施要「所有均衡都好」或排除坏均衡——集合更小。【事实】

### 计算批评打的是「中心负担」
最优真话机制对中心可能 NP-hard；不诚实机制可把难算任务甩给参与人——目标值在无限算力下相同，有限算力下可不同。【分析】
:::

# 系统运行机制

标准构造（占优或贝叶斯版本同构）：

1. 给定机制 \(M=(M_i,g)\) 与均衡 \(s\)；
2. 定义直接机制：每人报告 \(\hat\theta_i\in\Theta_i\)；
3. 令结果 \(g^*( \hat\theta ) = g\big(s(\hat\theta)\big)\)——用报告类型代入均衡策略再跑原结果函数；
4. 证明：若有人在 \(M^*\) 中谎报有利，则其在 \(M\) 中偏离 \(s\) 也有利——矛盾。【事实】

:::note green 口诀
**先找到他们会怎么玩，再替他们这么玩。** 显示原理是「策略内嵌」，不是「道德升级」。
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="40" width="100" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="70" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1973</text><text x="70" y="90" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Gibbard 占优</text>
  <rect x="150" y="40" width="120" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="210" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1977–81</text><text x="210" y="90" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">贝叶斯扩展</text>
  <rect x="300" y="40" width="120" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="360" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1981–86</text><text x="360" y="90" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Myerson 应用</text>
  <rect x="450" y="40" width="100" height="70" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="500" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">2007</text><text x="500" y="90" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">诺奖背书</text>
  <rect x="580" y="40" width="80" height="70" rx="8" fill="#15181d"/><text x="620" y="70" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif">2010s+</text><text x="620" y="90" text-anchor="middle" fill="#9aa3ad" font-size="10" font-family="sans-serif">失效论</text>
  <line x1="120" y1="75" x2="150" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="270" y1="75" x2="300" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="420" y1="75" x2="450" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="550" y1="75" x2="580" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <text x="340" y="150" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">从「压缩工具」到「标出假设」：误报成本、竞争机制、计算约束</text>
  <text x="340" y="175" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">现场：迭代 VCG / 活动规则仍援引显示原理论证激励</text>
</svg>
:::

2007 年诺奖通俗材料明确：显示原理使「在巨大机制类中寻优」变为「在直接 IC 子类中寻优」。【事实】近年工作强调：报告有成本、部分可验证、多机制竞争时，原理可能失败。【分析】

# 利益与激励

| 主体 | 想要什么 | 显示原理如何改变激励叙事 |
|---|---|---|
| 设计者 | 少搜、可证最优 | 合法忽略「奇奇怪怪的消息游戏」 |
| 参与人 | 少算、少猜 | 直接 IC 降低策略复杂度（尤其 DSIC） |
| 平台 | 收入 + 体验 | 理论用直接机制算最优，产品用间接 UI |
| 合谋者 | 绕过单人 IC | 原理不管侧支付；合谋需另加约束 |
| 监管 | 可审计规则 | 「报类型」易审计；升价过程要另留痕迹 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="fB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="30" width="140" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="100" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">私人类型 θ</text>
  <rect x="220" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="290" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">报告 θ̂ / 消息</text>
  <rect x="410" y="30" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="480" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">分配·支付</text>
  <rect x="560" y="30" width="90" height="50" rx="8" fill="#15181d"/><text x="605" y="60" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">福利</text>
  <line x1="170" y1="55" x2="220" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>
  <line x1="360" y1="55" x2="410" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>
  <line x1="550" y1="55" x2="560" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>

  <rect x="120" y="120" width="440" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="340" y="150" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">信息租金：为买真话，设计者让出部分剩余（抽水口）</text>
  <path d="M290 80 V120" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#fB)"/>
  <path d="M480 80 V120" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#fB)"/>

  <text x="340" y="210" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">显示原理不消灭租金——它只保证「可用直接 IC 描述同一租金结构」</text>
  <text x="340" y="235" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">资金流：参与人 ←租金← 设计者目标（收入/效率）之间的权衡仍在</text>
</svg>
:::

信息从私人类型流向报告，再流向分配与支付；显示原理保证这条流在「真话直接机制」中可被复现，不保证租金为零。【推论】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为什么杠杆高 | 怎么撬 |
|---|---|---|---|
| 1 | 先定解概念 | DSIC 与 BIC 的可行集不同 | 写清「占优还是贝叶斯」再设计 |
| 2 | 会编译一价→直接 | 理解构造就懂半个原理 | 手算 EU(r\|v)=r(v−r/2) |
| 3 | 分清「分析」与「UI」 | 避免强迫报类型 | 理论用直接，产品用升价/菜单 |
| 4 | 检查误报可行性 | 原理失效的主开关 | 画「谁能声称何种类型」 |
| 5 | 单均衡 vs 实施 | 坏均衡会毁现场 | 需要时上 Maskin/精炼 |
| 6 | 合谋与假名 | 单人 IC 挡不住 | 另加防合谋约束 |
| 7 | 通信/计算预算 | 直接报告类型可能爆炸 | 多轮elicitation、近似机制 |
| 8 | 承诺可信度 | 事后改规则毁 IC | 规则预承诺、第三方托管 |
| 9 | 先验质量（BIC） | BIC 依赖信念 | 缺先验时偏 DSIC/稳健机制 |
| 10 | 活动规则 | 迭代拍卖保激励 | 显示偏好活动规则 |

# 常见认知陷阱

:::details 陷阱1：显示原理 = 人们应该说真话
错。它是存在性与搜索压缩；诚实是被设计出来的均衡性质，不是规范命令。【事实】

:::

:::details 陷阱2：既然有直接机制，现场就该填类型表
错。类型空间可能巨大、难懂；升价等间接格式可实现同一结果且更易用。【分析】

:::

:::details 陷阱3：一价拍卖违背显示原理
错。一价有非真话均衡；原理说可编译成真话直接机制，二者兼容。【事实】

:::

:::details 陷阱4：显示原理保证目标可实现
错。不可实施的 \(f\) 仍然不可实施；原理只说「可实施 ⇒ 有直接 IC 版」。【事实】

:::

:::details 陷阱5：BIC 与 DSIC 一样稳
错。BIC 依赖共同先验与期望；换信念可能破。DSIC 信念无关。【事实】

:::

:::details 陷阱6：忽略「某个均衡」限定
原理对选定的均衡路径成立；其他均衡可能很糟。【事实】

:::

:::details 陷阱7：有误报成本仍套标准原理
可能失效：间接机制可利用「必须付撒谎成本」做筛选，直接真话机制付不出同等筛选。【分析】

:::

:::details 陷阱8：多卖方各出机制仍用单设计者原理
竞争机制下类型/策略空间纠缠，标准形式可能不够。【分析】

:::

:::details 陷阱9：把计算复杂度当细节
中心算不动最优真话机制时，「无损失」只在无限算力世界成立。【分析】

:::

:::details 陷阱10：混淆显示原理与 VCG/Myerson
后者是具体机制族；前者是关于「机制类」的元定理。Myerson 最优拍卖**使用**显示原理，不等于显示原理本身。【事实】
:::

<!-- nav:实践转化 -->
# 从抽象到现实

| 抽象 | 现实例子 | 操作含义 |
|---|---|---|
| 间接机制 + 均衡 | 一价密封、英式升价 | 先找均衡，再决定是否编译 |
| 直接 IC | 二价/Vickrey、报菜单选合同 | 分析与证明的主战场 |
| 编译 | 「代出价」机器 | 报 v，机制出 b(v) |
| 失效：部分可验证 | 学历造假有成本、年龄可核实 | 不能假设任意误报 |
| 现场翻译 | 频谱时钟拍卖 + 活动规则 | 保留激励，降低elicitation |

# 从理论到行动

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="opA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="40" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="90" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">1 写清 f 与解概念</text>
  <rect x="190" y="40" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="260" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">2 在直接 IC 上寻优</text>
  <rect x="360" y="40" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="430" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">3 探针失效假设</text>
  <rect x="530" y="40" width="130" height="60" rx="8" fill="#15181d"/><text x="595" y="75" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">4 译成现场格式</text>
  <line x1="160" y1="70" x2="190" y2="70" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#opA)"/>
  <line x1="330" y1="70" x2="360" y2="70" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#opA)"/>
  <line x1="500" y1="70" x2="530" y2="70" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#opA)"/>
  <text x="340" y="140" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">每步产出：一页目标卡 → 直接机制草图 → 失效清单 → UI/规则书</text>
  <text x="340" y="170" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">跳过第 3 步是最常见翻车：把课堂定理直接贴进有核实成本的场景</text>
</svg>
:::

# 技能树

:::details S1 陈述（必需）
能用一句话说清：可实施 ⇒ 存在直接 IC 复制；并指出「不保证可实施」。【事实】

:::

:::details S2 构造
给定一价两人均匀 [0,1] 均衡 \(b(v)=v/2\)，写出直接机制并验证真话最大化期望效用。【事实】

:::

:::details S3 解概念切换
同一例子在 DSIC（二价）与 BIC（一价编译）下的差别：是否需要先验。【事实】

:::

:::details S4 失效诊断
能列出至少四条失效路径：误报成本、部分可验证、竞争机制、不完全承诺。【分析】

:::

:::details S5 现场翻译
把直接 IC 结果改写成升价/菜单，并说明激励是否保留。【分析】
:::

# 游戏化世界

把机制设计想象成「规则编辑器」沙盒：

- **主线任务**：为给定 \(f\) 找到直接 IC 机制（或证明不存在）。
- **副本**：一价编译器、二价试炼、IC 松弛迷宫、失效沼泽。
- **Boss**：合谋卡特尔 + 假名小号——单人显示原理通关后仍可能翻车。
- **成就**：首次手算编译成功；首次指出某招标文件误用「请报真实成本」。

# 任务系统

| 任务 | 产出 | 验收 |
|---|---|---|
| T1 口述定理 | 30 秒版本 + 反例「不保证可实施」 | 听者能复述 |
| T2 一价编译 | EU 表：真话 vs 两种谎报 | 真话严格最优（内点） |
| T3 二价 DSIC | 固定对手价，扫出价 | 假话效用 ≤ 真话 |
| T4 IC 松弛 | 两类型 (q,t) 算两条 IC | 符号与模型一致 |
| T5 失效清单 | 自己场景的 5 条摩擦 | 至少 1 条触及误报限制 |
| T6 规则拆解 | 一份真实拍卖/招标 | 标出是否依赖显示原理叙事 |

# 反事实模拟

四个可调模型：一价→直接编译、二价 DSIC、两类型 IC 松弛、误报成本下的「有效真话区」。

:::tabs
@@模型1 一价编译器
两人 i.i.d. 均匀 [0,1] 一价密封拍卖，对称 BNE \(b(v)=v/2\)。直接机制：报告 \(r\)，代出 \(b(r)=r/2\)；对手说真话时代价期望效用 \(\mathrm{EU}(r\mid v)=r(v-r/2)\)。对固定 \(v\)，\(r^*=v\)。默认 \(v=0.80,r=0.80\) → EU=**0.320**；若 \(r=0.50\) → EU=**0.275**。【推论】

:::raw
<div class="tool" id="tool-cp">
  <div class="ctrl">
    <label>真实估值 v <output id="cp_vO">0.80</output></label>
    <input type="range" id="cp_v" min="0.10" max="1.00" step="0.01" value="0.80"/>
    <label>报告类型 r <output id="cp_rO">0.80</output></label>
    <input type="range" id="cp_r" min="0.00" max="1.00" step="0.01" value="0.80"/>
  </div>
  <div class="readout">
    <div class="ro">EU(r\|v) <b id="cp_eu">0.320</b></div>
    <div class="ro">EU(v\|v) 真话 <b id="cp_truth">0.320</b></div>
    <div class="ro">缺口（假−真） <b id="cp_gap">0.000</b></div>
    <div class="ro">代出价 b(r)=r/2 <b id="cp_bid">0.40</b></div>
    <div id="cp_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="cpChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型2 二价 · DSIC
单物品二价：胜者付对手价 \(s\)。占优：\(b=v\)。默认 \(v=80,b=80,s=55\) → 效用 **25**；压价到 50 若仍高于 55 则同效用，若低于则效用 **0**。【事实】

:::raw
<div class="tool" id="tool-vk">
  <div class="ctrl">
    <label>真实估值 v <output id="vk_vO">80</output></label>
    <input type="range" id="vk_v" min="10" max="100" step="1" value="80"/>
    <label>你的出价 b <output id="vk_bO">80</output></label>
    <input type="range" id="vk_b" min="0" max="100" step="1" value="80"/>
    <label>对手出价 s <output id="vk_sO">55</output></label>
    <input type="range" id="vk_s" min="0" max="100" step="1" value="55"/>
  </div>
  <div class="readout">
    <div class="ro">结果 <b id="vk_res">获胜</b></div>
    <div class="ro">支付 / 效用 <b id="vk_pay">55 / 25</b></div>
    <div class="ro">真话效用 <b id="vk_truth">25</b></div>
    <div class="ro">缺口（假−真） <b id="vk_gap">0</b></div>
    <div id="vk_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="vkChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型3 两类型 IC 松弛
拟线性 \(u=\theta q-t\)。默认 \(\theta_L=2,\theta_H=5,q_L=0.40,q_H=1.00,t_L=0.80,t_H=3.20\) → IC-H 松弛 **0.60**，IC-L 松弛 **1.20**（均 ≥0，激励相容）。拖动分配/支付看哪条先破。【推论】

:::raw
<div class="tool" id="tool-ic">
  <div class="ctrl">
    <label>θ_L <output id="ic_thLO">2.0</output></label>
    <input type="range" id="ic_thL" min="0.5" max="4" step="0.1" value="2"/>
    <label>θ_H <output id="ic_thHO">5.0</output></label>
    <input type="range" id="ic_thH" min="2" max="8" step="0.1" value="5"/>
    <label>q_L <output id="ic_qLO">0.40</output></label>
    <input type="range" id="ic_qL" min="0" max="1" step="0.05" value="0.40"/>
    <label>q_H <output id="ic_qHO">1.00</output></label>
    <input type="range" id="ic_qH" min="0" max="1" step="0.05" value="1.00"/>
    <label>t_L <output id="ic_tLO">0.80</output></label>
    <input type="range" id="ic_tL" min="0" max="5" step="0.1" value="0.80"/>
    <label>t_H <output id="ic_tHO">3.20</output></label>
    <input type="range" id="ic_tH" min="0" max="8" step="0.1" value="3.20"/>
  </div>
  <div class="readout">
    <div class="ro">IC-H 松弛 <b id="ic_h">0.60</b></div>
    <div class="ro">IC-L 松弛 <b id="ic_l">1.20</b></div>
    <div class="ro">U_H / U_L <b id="ic_u">1.80 / 0.00</b></div>
    <div class="ro">是否 IC <b id="ic_ok">是</b></div>
    <div id="ic_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="icChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型4 误报成本 · 有效真话区
在编译后的直接机制上，谎报额外成本 \(c\cdot|r-v|\)（示意）。真实 EU′=EU−成本。默认 \(v=0.80,r=0.50,c=0.20\) → 纯 EU 缺口 −0.045，再扣成本 0.06，总缺口更负——成本强化真话；但若原机制依赖「必须付谎成本」做筛选，标准显示原理叙事可能不够。【假设】

:::raw
<div class="tool" id="tool-mc">
  <div class="ctrl">
    <label>真实估值 v <output id="mc_vO">0.80</output></label>
    <input type="range" id="mc_v" min="0.10" max="1.00" step="0.01" value="0.80"/>
    <label>报告 r <output id="mc_rO">0.50</output></label>
    <input type="range" id="mc_r" min="0.00" max="1.00" step="0.01" value="0.50"/>
    <label>单位误报成本 c <output id="mc_cO">0.20</output></label>
    <input type="range" id="mc_c" min="0.00" max="1.00" step="0.01" value="0.20"/>
  </div>
  <div class="readout">
    <div class="ro">EU 毛利 <b id="mc_eu">0.275</b></div>
    <div class="ro">误报成本 <b id="mc_cost">0.060</b></div>
    <div class="ro">净效用 <b id="mc_net">0.215</b></div>
    <div class="ro">相对真话净缺口 <b id="mc_gap">-0.105</b></div>
    <div id="mc_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="mcChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收动作 |
|---|---|---|
| L1 识骨 | 能区分直接/间接、IC/可实施 | 拆一份规则书的三元组 |
| L2 算账 | 会算编译 EU 与二价效用 | 模型默认值口述对 |
| L3 诊断 | 会列失效条件并对照场景 | 5 分钟给出「能否套原理」 |
| L4 设计 | 直接 IC 草图 + 现场翻译 + 攻击面 | 同事可按稿推演一轮 |

# 30分钟最小实践

1. 选一个你熟悉的分配场景（会议室、团购、内部招标、家庭旅行目的地）。
2. 用 8 分钟写：参与人、私人信息、目标 \(f\)、打算用的解概念（占优/贝叶斯）。
3. 用 12 分钟：若已有「大家会怎么玩」的直觉，尝试写成直接规则（报类型 → 结果）；用数字检查至少一次谎报是否更赚。
4. 用 10 分钟列失效探针：误报是否可被核实？有没有侧合同？设计者会不会事后改规则？

验收：一页纸上有「真话效用 ≥ 假话效用」的对照，以及至少两条失效探针打勾或打叉。【分析】

# 7天计划

| 天 | 焦点 | 产出 |
|---|---|---|
| D1 | 本手册 L1–L4 + 诺奖通俗段 | 定理卡 + 反例卡 |
| D2 | 手算一价编译与二价 | 两道题全对 |
| D3 | 两类型 IC 松弛 | 会改参数破/修复 IC |
| D4 | 读一篇失效论文摘要 | 半页笔记（成本/竞争/计算任选） |
| D5 | 拆真实拍卖或招标公告 | 标注是否误用「报真实」 |
| D6 | 现场翻译练习 | 直接机制 → 升价/菜单草案 |
| D7 | 复盘 + 30 分钟实践升级 | 一页机制+失效清单 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 定理与构造 | 编译与 DSIC 默认可心算 |
| W2 | 解概念与实施 | 能讲清 BIC vs DSIC vs 实施 |
| W3 | 失效与前沿 | 能对场景做「原理适用性」评级 |
| W4 | 完整小设计 | 目标→直接 IC→翻译→攻击→修订 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 显示原理 | 可实施 ⇒ 存在直接 IC 复制 |
| 2 | 直接机制 | 消息空间 = 类型空间 |
| 3 | 激励相容 | 真话是均衡（占优或贝叶斯） |
| 4 | 策略编译 | \(g^*(\hat\theta)=g(s(\hat\theta))\) |
| 5 | DSIC 版（Gibbard） | 占优实施 ↔ 占优真话直接机制 |
| 6 | BIC 版（Myerson 等） | 贝叶斯实施 ↔ BIC 直接机制 |
| 7 | Vickrey | 付第二价 ⇒ 说真话占优 |
| 8 | 一价编译 | \(b(v)=v/2\) 嵌入后真话 BIC |
| 9 | 收益等价 | 同分配+边界 ⇒ 同期望支付（经直接机制视角） |
| 10 | 失效探针 | 成本·验证·竞争·承诺·计算 |

# 关键问题清单

:::details Q1 我需要的是某个均衡，还是所有均衡都好？
只要「能出现」→ 显示原理够用；要「不会出现坏均衡」→ 上实施理论。【事实】

:::

:::details Q2 用 DSIC 还是 BIC？
要信念无关、更易向非专家解释 → 偏 DSIC；要更大设计空间、有可靠先验 → BIC。【分析】

:::

:::details Q3 参与人能任意谎报类型吗？
若否（证件、审计、部分可验证），不要盲目套标准原理。【分析】

:::

:::details Q4 撒谎有金钱/时间/法律成本吗？
有则可能改变最优机制形态；间接机制或更优。【分析】

:::

:::details Q5 是否只有一个机制设计者？
平台竞争、多卖方同时报价时，谨慎外推单设计者结论。【分析】

:::

:::details Q6 类型维度是否高到报不全？
考虑多轮elicitation、近似、或结构化消息。【分析】

:::

:::details Q7 现场 UI 是否必须「报类型」？
通常不必；保留激励地翻译成升价/菜单即可。【事实】

:::

:::details Q8 合谋空间多大？
侧支付存在时，单人显示原理的「真话」可能集体背叛。【分析】

:::

:::details Q9 设计者承诺是否可信？
事后重新谈判会毁事前 IC。【事实】

:::

:::details Q10 中心算力是否撑得住最优真话机制？
算不动时，「无损失限缩到真话机制」在工程上可能是损失。【分析】
:::

# 下一阶段探索

- 对照《机制设计》手册的 VCG/Myerson 专节：把显示原理当作它们的「许可证」。
- 对照《委托—代理》：同一套 IC 语言，舞台从合同菜单转到规则空间。
- 精读：Gibbard（1973）；Myerson（1979/1981）；Nobel 2007 advanced information 中显示原理一节。
- 失效方向：Kephart–Conitzer 误报成本；竞争机制文献；计算机制设计对「真话教条」的批评。
- 现场：迭代 VCG / 活动规则如何在援引显示原理的同时降低elicitation 负担。【分析】

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 显示原理定义与构造直觉 | 教材/讲义 | Brown CSCI 机制设计讲义；Yale 机制设计笔记 | 【事实】 |
| 占优版本归属 Gibbard（1973） | 经典/百科 | Wikipedia Revelation principle；教材共识 | 【事实】 |
| 贝叶斯版本多人独立贡献 | 官方 | Nobel 2007 advanced info：Dasgupta–Hammond–Maskin、Holmström、Myerson 等 | 【事实】 |
| Myerson 将原理用于拍卖与规制 | 官方/经典 | Nobel 2007；Myerson 1979/1981 | 【事实】 |
| 「机制替你撒谎」构造叙述 | 教材 | 标准证明的教学转述 | 【事实】 |
| 一价两人均匀均衡 b=v/2 与 EU=r(v−r/2) | 标准推导 | 拍卖理论教材；本手册 node 验算 | 【事实】 |
| 误报成本/部分可验证下原理可能失效 | 学术 | Kephart–Conitzer EC；Green–Laffont 等部分可验证传统 | 【分析】 |
| 竞争机制下标准形式可能不够 | 学术 | Peck 等竞争机制讨论 | 【分析】 |
| 计算与通信约束下的批评 | 学术 | Conitzer 等 computational criticisms | 【分析】 |
| 迭代 VCG 仍援引显示原理 | 学术 | 2025 迭代 Vickrey/LP 文献论述 | 【待验证】 |
| 行动格式策略下的失效主张 | 预印本 | arXiv 讨论；建模依赖强 | 【待验证】 |

标记约定：【事实】多方一致或经典定理；【分析】权威判断或结构化推理；【推论】由模型推出；【假设】示意性未验证；【待验证】单一来源或前沿主张。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，**不构成**投资、采购、招标、拍卖策略、定价或法律建议。显示原理依赖偏好域、信息结构、误报可行性、承诺与理性假设；现实中的合谋、核实技术、计算限制与组织政治可能导致「无损失限缩」不再成立。任何将本手册用于商业竞价或公共资源配置的决策，应另行咨询具备资质的专业人士并完成独立尽职调查。作者与发布方不对依据本手册采取的行动承担损失责任。
