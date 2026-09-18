---
slug: 逆向归纳（Backward Induction）：从最后一步倒推，动态博弈的标准求解思路
title: 逆向归纳（Backward Induction）：从终局倒推，求解动态博弈
subtitle: 别从开局空想「我会怎样」——先问<strong>最后动手的人会选什么</strong>，再一层层往回折叠。有限完美信息下，这就是 SPNE 的标准算法。
brand_sub: Backward Induction × Sequential Rationality
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 逆向归纳, 动态博弈, SPNE, 蜈蚣博弈, 序贯理性, Zermelo]
theme_js_file: 逆向归纳（Backward Induction）：从最后一步倒推，动态博弈的标准求解思路.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**逆向归纳（Backward Induction, BI）**：在有限、完美信息的扩展式博弈中，从**紧邻终点**的决策节点开始，假定该节点的行动者选对自己支付最高的行动，把该节点「折叠」成已决支付向量；再对前一层节点重复，直到初始节点。【事实】

它不是一种「感觉」，而是一套**算法**：输出的策略组合在完美信息有限博弈中就是子博弈精炼纳什均衡（SPNE）。【事实】冯·诺依曼与摩根斯特恩（1944）已用类似倒推思路处理零和形式博弈；当代教科书则把它写成序贯理性的操作性程序。【分析】

张力也在这里：逻辑上严密的倒推，在蜈蚣博弈、有限次囚徒困境里常与直觉和实验相冲突——McKelvey & Palfrey（1992）662 局实验中，仅约 **5.6%**（37/662）在第一步就「拿走」。【事实】【待验证：复现实验参数差异会影响收敛速度】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「谁更聪明」，而是：给定**共同知识的序贯理性**，有限博弈树如何被唯一（或几乎唯一）地剪成一条均衡路径——以及当前提失效时，算法预测如何系统性偏离现实。

边界：

- **在界内**：完美信息有限树、笔终节点、折叠支付、与 SPNE 的等价、取胜位置（race / Nim 类）、交替出价、有限重复 PD 的逐期瓦解、蜈蚣悖论、与动态规划 / 逆行分析的同构。
- **在界外**：无限期博弈的完整求解（需一次性偏离原则等）、不完美信息下信息集内的信念更新（需序贯/完美贝叶斯均衡）、具体棋谱开局库——除非压成「终局赋值 → 回传」的计算问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 从终局倒推的求解程序及其认识论前提 |
| 2 | 边界在哪 | 到「有限完美信息树 + 节点最优」可形式化为止 |
| 3 | 核心对象 | 博弈树、笔终节点、折叠支付、BI 路径、策略（含离径） |
| 4 | 参与者 | 序贯行动的理性主体；实验中的有限理性受试者 |
| 5 | 关键变量 | 树高、支付差、贴现、共同知识深度、噪声/颤抖 |
| 6 | 可直接观察 | 公开行动、终局结果、实验中的停止节点 |
| 7 | 无法直接观察 | 对他人理性层数的信念、离径反事实推理 |
| 8 | 谁影响谁 | 后动最优 → 前动预期 → 路径；噪声改预期 |
| 9 | 因果关系 | 每节点最优 + 共同知识 ⇒ BI 解 = SPNE |
| 10 | 只是相关 | 「经验丰富」相关于更接近 BI，但非充分【分析】 |
| 11 | 表层现象 | 谈判末日通牒、有限期合作崩溃、开局就拆台 |
| 12 | 底层机制 | 序贯理性的递归展开（从叶子到根） |
| 13 | 有反馈吗 | 有。实验学习使行为向 BI 靠拢；声誉打断纯 BI |
| 14 | 有延迟吗 | 有。推理深度、计算时间、贴现都引入延迟 |
| 15 | 正/负反馈 | 互信可正反馈延长合作；已知终点负反馈瓦解合作 |

## 最关键的一句话

> 逆向归纳问的不是「开局我想要什么」，而是「若博弈真的走到最后一节点，理性人会留下什么——然后把这个答案当作前一节点的环境」。

# 为什么值得研究

:::cards g3
### 它是动态博弈的「默认编译器」
进入威慑、斯塔克伯格、有限轮讨价还价——课堂与论文先跑 BI，再谈精炼与扩展。【事实】

### 它暴露共同知识理性的代价
算法本身没错；错的是默认「人人知道人人理性到无限层」。蜈蚣与有限 PD 把这代价摆上台面。【分析】

### 它跨域同构到 DP 与残局库
Bellman 动态规划、国际象棋残局逆行分析，数学上都是「终态赋值 → 回传最优」。【分析】
:::

:::note amber 最贵的一次误判
把「有限次、已知终点的合作关系」当成无限重复来经营：BI 预言最后一期背叛，并向前传染——若你不改终点信息或支付，只靠道德劝说，结构会赢过愿望。【推论】
:::

# 世界地图

九层看「倒推」如何从叶子长成制度与悖论。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="biL9" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 改终点/支付/信息，让合作不被倒推杀死</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 计算同构 · 动态规划 · 棋类残局逆行分析</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 无限期衔接 · 一次性偏离原则（BI 不够用）</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 不完美信息 · 信息集阻塞朴素 BI</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 悖论与实验 · 蜈蚣 / 有限 PD / 连锁店</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 应用原型 · 进入 / 讨价还价 / Race-to-N</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 算法步骤 · 笔终节点 → 折叠 → 直至根</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 解概念挂钩 · BI 解 = 完美信息有限博弈的 SPNE</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 前提 · 有限树 · 完美信息 · 共同知识理性</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1→L3**：会手算小树；进阶卡在 **L5**（理论 vs 行为）与 **L8**（把 BI 当成计算思想，而不只是经济学名词）。
:::

# 核心概念地图

从「序贯理性」到「可执行的倒推」。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="biCmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="biCmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="180" y="16" width="320" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">序贯理性（每信息集局部最优）</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">共同知识下的递归最优</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">笔终最优 → 向前折叠</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">画树 / 标箭头 / 读路径</text>

  <line x1="300" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#biCmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#biCmA)"/>
  <line x1="380" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#biCmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">BI 解</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">= 完美信息有限 SPNE</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">失败模式</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">信息集 / 无限期 / 无共同知识</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">行为偏离</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">利他 / level-k / QRE</text>

  <path d="M130,146 L130,180" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#biCmA)"/>
  <path d="M340,146 L340,180" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#biCmA)"/>
  <path d="M550,146 L550,180" stroke="#b8730a" stroke-width="1.5" marker-end="url(#biCmA)"/>

  <rect x="120" y="290" width="440" height="56" rx="10" fill="#fef2f2" stroke="#d5342c"/><text x="340" y="316" text-anchor="middle" fill="#d5342c" font-size="13" font-weight="700" font-family="sans-serif">反馈：实验里合作多于 BI → 动摇「共同知识理性」信念</text><text x="340" y="334" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">红虚线：行为反噬理论前提（不是算术错误）</text>
  <line x1="340" y1="250" x2="340" y2="290" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#biCmB)"/>
</svg>
:::

# 核心参与者

| 角色 | 在系统里做什么 | 典型动机 |
|---|---|---|
| 理论家（Selten / Aumann 等） | 定义精炼、共同知识与 BI 的充要条件 | 解概念自洽 |
| 应用建模者 | 把谈判、进入、竞标写成有限树并倒推 | 可计算的预测 |
| 实验受试者 | 在蜈蚣等游戏中暴露偏离 | 收益 + 公平 + 信念 |
| 算法 / 引擎 | 残局库、搜索中的倒推赋值 | 胜负最优 |
| 机制设计师 | 故意模糊终点或改支付，阻断有害倒推 | 维持合作 |

:::note purple 关键分工
理论家提供「何时 BI 等于 SPNE」；实验者提供「人何时不按 BI 走」；设计师提供「如何让结构不强迫坏倒推」。三者缺一，手册会退化成背定义。【分析】
:::

# 核心变量

| 变量 | 符号/度量 | 为何关键 |
|---|---|---|
| 树高 / 期数 | \(H\) / \(T\) | 决定倒推层数；\(T\) 已知则有限 PD 全背叛 |
| 支付差 | \(\Delta u\) | 节点上「拿」与「过」的差距；差越大 BI 越「硬」 |
| 贴现 | \(\delta\) | 讨价还价里把未来折现进当期报价 |
| 继续噪声 | \(c\) | 行为模型：BI 应「拿」时仍继续的概率 |
| 共同知识深度 | 认知阶 | 深度有限 → level-k，不必走满 BI |
| 信息完美性 | 单点信息集？ | 否 → 朴素 BI 失效 |
| 终点是否共同知识 | 是/否 | 「可能还有一期」可拯救合作 |

# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="biCfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="biCfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="90" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">有限完美信息树</text>
  <rect x="200" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="270" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">笔终节点最优</text>
  <rect x="380" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="450" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">逐层折叠</text>
  <rect x="520" y="30" width="140" height="50" rx="8" fill="#15181d"/><text x="590" y="60" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">BI 路径 / SPNE</text>

  <line x1="160" y1="55" x2="198" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#biCfA)"/>
  <line x1="340" y1="55" x2="378" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#biCfA)"/>
  <line x1="520" y1="55" x2="528" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#biCfA)"/>

  <rect x="80" y="140" width="160" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="160" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">共同知识理性</text>
  <rect x="320" y="140" width="200" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="420" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">信念破缺 / 利他 / 噪声</text>

  <line x1="240" y1="165" x2="318" y2="165" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#biCfB)"/>
  <path d="M160,140 L160,100 L270,80" fill="none" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#biCfA)"/>
  <path d="M420,140 L420,100 L450,80" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#biCfB)"/>

  <rect x="140" y="230" width="400" height="60" rx="10" fill="#f8fafa" stroke="#7c848f"/><text x="340" y="258" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">实线 = 因果链（树 + 理性 → BI 解）</text><text x="340" y="278" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">红虚线 = 反馈：行为偏离削弱「共同知识」前提</text>
</svg>
:::

因果主链：**树结构 + 每节点最优 + 共同知识** ⇒ BI 解。相关但非因果：「受试者学过博弈论」与「更接近 BI」常相关，但决定项仍是激励与信念结构。【分析】

# 隐藏关系

:::cards g2
### BI ↔ 动态规划
同一数学：状态价值 = max/min 后继价值。棋类残局库、库存 MDP，换了支付语言。【分析】

### BI ↔ 共同知识
Aumann（1995）等表明：共同知识理性与 BI 结果紧密纠缠；蜈蚣上「实质理性」与「物质理性」的区分很细。【事实】

### 有限重复 PD ↔ 蜈蚣
都是「终点背叛向前传染」。一个在矩阵重复上，一个在单条增长链上。【分析】

### Zermelo 线 ↔ 现代 SPE
有限完美信息存在纯策略均衡的思想可追溯 Zermelo（1913）棋类论证；严格无限棋需额外处理重复。【事实】【分析】
:::

# 系统运行机制

标准机械步骤（完美信息、有限）：

1. 找出所有**笔终节点**（下一步即终点）。
2. 该节点行动者在可选行动中取**自身支付最大**者（无差异时可多选）。
3. 用所选行动的支付向量**替换**该节点，视作新的终点。
4. 对缩小后的树重复，直至根。
5. 沿途选出的行动构成策略；路径上的支付即 BI 结果。

:::flow
<span>笔终最优</span><i>→</i><span class="hi">折叠节点</span><i>→</i><span>前移一层</span><i>→</i><span>直至根</span><i>→</i><span>BI = SPNE</span>
:::

无差异时可能多个 BI 解；每个仍是 SPNE。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="biTmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="70" cy="100" r="8" fill="#0f8a4d"/><text x="70" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1913</text><text x="70" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Zermelo 棋</text>
  <circle cx="180" cy="100" r="8" fill="#0f8a4d"/><text x="180" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1944</text><text x="180" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">vN-M 倒推</text>
  <circle cx="300" cy="100" r="8" fill="#1d4ed8"/><text x="300" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1965</text><text x="300" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Selten 精炼</text>
  <circle cx="420" cy="100" r="8" fill="#1d4ed8"/><text x="420" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1981/82</text><text x="420" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Rosenthal 蜈蚣</text>
  <circle cx="540" cy="100" r="8" fill="#b8730a"/><text x="540" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1992</text><text x="540" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">M&amp;P 实验</text>
  <circle cx="620" cy="100" r="8" fill="#15181d"/><text x="620" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">今</text><text x="620" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">QRE/level-k</text>
  <line x1="78" y1="100" x2="172" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#biTmA)"/>
</svg>
:::

叙事主线：先有棋类确定性思想 → 形式化倒推 → 精炼概念 → 悖论游戏 → 实验系统偏离 → 有限理性模型解释偏离。【分析】

# 利益与激励

| 主体 | 想要什么 | BI 如何改变激励 |
|---|---|---|
| 先动者 | 锁定有利路径 | 必须按后动真实最优来预期，不能靠空吓 |
| 后动者 | 在到达节点时最优 | 离径计划被强制「可执行」 |
| 合作盟友 | 延长互惠 | 已知终点使背叛激励向前传导 |
| 实验者 | 识别理论 | 用支付与重复操纵「靠近 BI」的速度 |
| 平台/规则制定者 | 稳定交易 | 隐藏或随机化终点，削弱末日效应 |

# 资源与信息流

倒推消耗的「资源」主要是**推理与共同知识**，不是现金——但支付流决定折叠方向。

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="biFlA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="30" width="120" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="90" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">终点支付</text><text x="90" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">叶子 u(·)</text>
  <rect x="200" y="30" width="120" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="260" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">节点选择</text><text x="260" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">argmax</text>
  <rect x="370" y="30" width="120" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="430" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">折叠向量</text><text x="430" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">上传一层</text>
  <rect x="530" y="30" width="120" height="70" rx="8" fill="#15181d"/><text x="590" y="60" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">根支付</text><text x="590" y="80" text-anchor="middle" fill="#a0a8b4" font-size="11" font-family="sans-serif">BI 结果</text>
  <line x1="150" y1="65" x2="198" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#biFlA)"/>
  <line x1="320" y1="65" x2="368" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#biFlA)"/>
  <line x1="490" y1="65" x2="528" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#biFlA)"/>

  <rect x="100" y="150" width="480" height="70" rx="10" fill="#f8fafa" stroke="#7c848f"/><text x="340" y="180" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">信息流：共同知识理性是「燃料」——油尽则算法预测熄火</text><text x="340" y="202" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">支付流决定折叠方向；信念流决定人是否愿意按折叠行动</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 | 可操作性 |
|---|---|---|---|
| 1 | 改「终点是否已知」 | 直接切断有限倒推传染 | 合同写成滚动续约 |
| 2 | 改末日支付 | 让最后一期合作仍最优 | 托管、押金、第三方 |
| 3 | 缩小支付差 \(\Delta u\) | 降低「拿」的诱惑 | 分成、保险 |
| 4 | 增加推理噪声可见性 | 使对方不敢假定完美 BI | 披露类型/历史 |
| 5 | 先做承诺沉没 | 改变后动节点支付 | 产能、合同违约金 |
| 6 | 缩短树但保留不确定性 | 减少层数却保留「也许还有」 | 随机停止规则 |
| 7 | 训练对手做 BI | 在零和/比赛中提高胜率 | Race-to-N 练习 |
| 8 | 用 DP 软件化 | 大状态空间可算 | 残局库思想 |
| 9 | 引入旁支付 | 把帕累托改进内部化 | 转移支付 |
| 10 | 限制行动集 | 删除有害离径选项 | 规则设计 |

# 常见认知陷阱

:::details 1. 「BI 算出来不好，所以算法错了」
错。错的是前提（共同知识理性）或建模（树不完整）。算术与前提要分开审。【分析】
:::

:::details 2. 「从第一期直觉出发」
开局直觉常忽略后动最优。必须先钉死后动，再回头。【事实】
:::

:::details 3. 「有限次合作可以用无限次公式」
有限已知 \(T\) 的 PD，冷酷策略无法在末期自我执行；BI 给出每期背叛。【事实】
:::

:::details 4. 「NE 路径对了就够」
离径写「若你偏离我就自杀式报复」可能是 NE 但非 BI/SPNE。【事实】
:::

:::details 5. 「实验偏离 = 人非理性到不可建模」
level-k、QRE、利他偏好都能系统解释蜈蚣偏离；不是噪音垃圾。【分析】
:::

:::details 6. 「象棋严格等于课堂 BI」
正式规则下重复可使棋接近无限；严格 BI 需有限化或 Kalmár 式论证。【事实】
:::

:::details 7. 「无差异时随便标一个」
无差异产生多个 BI 解；应用里要声明选择规则（或混合）。【事实】
:::

:::details 8. 「不完美信息也能逐节点倒推」
信息集含多节点时，最优取决于信念——朴素 BI 不够。【事实】
:::

:::details 9. 「倒推只适用于两人零和」
一般和、多人完美信息有限树同样可 BI（存在性有保证）。【事实】
:::

:::details 10. 「教过一次就不会再犯末日效应」
组织里换人、换任期，终点重新变尖；制度要反复修。【推论】
:::

<!-- nav:实践转化 -->
# 从抽象到现实

| 抽象 | 现实对应 | 操作提示 |
|---|---|---|
| 笔终节点 | 合同最后一期、任期末年、系列赛最后一场 | 单独设计末日激励 |
| 折叠支付 | 「若谈判破裂，对方会要什么」 | 先写破裂点再写开价 |
| BI 路径 | 进入者预见到在位者会默许 | 别用不可执行的价格战威胁 |
| 继续噪声 \(c\) | 「对方可能心软/出错」 | 用小 \(c\) 做敏感性，而非当 0 |
| Race 必胜点 | 资源争夺中的关键存量门槛 | 先占模数意义下的关键剩余 |

# 从理论到行动

:::flow
<span>画树</span><i>→</i><span>标支付</span><i>→</i><span class="hi">从末日倒推</span><i>→</i><span>读路径</span><i>→</i><span>问前提是否成立</span><i>→</i><span>改结构或改预期</span>
:::

行动清单：

1. 任何「分多期」的冲突，先写出**最后一期**双方最优。
2. 检查你的威胁在到达节点时是否仍最优；否则换承诺工具。
3. 若需要合作，优先动杠杆 1–3（终点、末日支付、\(\Delta u\)），而非口号。

# 技能树

:::details 第 1 层 · 手算小树
会画 2–3 层进入博弈或最后通牒，标出 BI 箭头。
:::

:::details 第 2 层 · 识别必胜/必败位
Race-to-N、简单取物：会算模 \(m+1\) 的关键剩余。
:::

:::details 第 3 层 · 讨价还价倒推
有限轮交替出价：会用 \(\delta\) 从末日回传份额。
:::

:::details 第 4 层 · 有限重复瓦解
能解释为何已知 \(T\) 的 PD 全背叛，并设计滚动终点。
:::

:::details 第 5 层 · 悖论诊断
蜈蚣上区分「算法结论」与「共同知识失败」。
:::

:::details 第 6 层 · 与精炼族对话
知道 BI 不够时换 SPE 验证、PBE、颤抖手。
:::

:::details 第 7 层 · 计算化
能把问题写成 DP / 逆行分析状态赋值。
:::

# 游戏化世界

把你的真实冲突想成一张**有限树地图**：每间房是节点，宝箱是支付，怪物是后动者的最优反应。通关方式不是从大门冲进去，而是先传送到**最后一间房**看怪物吃哪只宝箱，再一间间往回解锁。蜈蚣副本里，理论通关是「第一间就开门拿走小宝箱」——但多数玩家会继续走，因为他们赌后面的人也会继续。【分析】

# 任务系统

| 任务 | 完成标准 | 奖励（能力） |
|---|---|---|
| 手算进入树 | 标出威胁是否可信 + BI 路径 | 威胁审计 |
| Race-21 | 先手按必胜策略赢 3 局 | 模数直觉 |
| 改写合同终点 | 提出滚动续约或随机审查 | 反瓦解设计 |
| 蜈蚣对照 | 写出 BI 预测 vs 你的真实选择 | 前提敏感度 |
| 复盘一次谈判 | 用倒推重写「破裂点 → 开价」 | 报价纪律 |

<!-- nav:反事实与模型 -->
# 反事实模拟

若改变关键前提，BI 世界会怎样？

:::tabs
@@终点变为不确定
有限 PD 的「最后一期背叛」失去锚点；合作区间可能重开（仍需监督与耐心）。【分析】

@@末日支付改为合作更优
倒推在末期选合作，传染方向反转——结构比说教有效。【推论】

@@对方有 ε 概率非 BI
先动者可能愿意「过」：预期收益可超过立刻拿。见下方继续噪声模型。【分析】

@@信息变为不完美
朴素 BI 停用；需要信念与精炼均衡。【事实】
:::

## 模型 1 · Race-to-N（必胜剩余）

目标数 \(N\)，每步可加 \(1..m\)。失败位满足「无论怎么走都把对手送进成功位」。默认 \(N=21,m=3\) 时失败位为 \(1,5,9,13,17\)；从 0 出发先手应走到 **1**，之后总把对手留在失败位。【事实】

:::raw
<div class="tool" id="tool_race">
  <div class="ctrl">
    <label>目标 N <output id="rc_nO">21</output></label>
    <input type="range" id="rc_n" min="10" max="60" step="1" value="21"/>
    <label>每步上限 m <output id="rc_mO">3</output></label>
    <input type="range" id="rc_m" min="2" max="10" step="1" value="3"/>
    <label>当前点数 s <output id="rc_sO">0</output></label>
    <input type="range" id="rc_s" min="0" max="59" step="1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">模数 m+1<strong id="rc_mod">4</strong></div>
    <div class="ro">是否失败位<strong id="rc_lose">否</strong></div>
    <div class="ro">建议走到<strong id="rc_to">1</strong></div>
    <div id="rc_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="rc_vh">从 0 应加到 1（失败位留给对手）</span></div>
  </div>
  <canvas id="rcChart" height="214"></canvas>
</div>
:::

## 模型 2 · 短蜈蚣 + 继续噪声

四节点线性蜈蚣：在节点拿走得 \((2,0)/(1,3)/(4,2)/(3,5)\)，四次都「过」则 \((6,4)\)。纯 BI：节点 4 拿 → … → 节点 1 拿，结果 \((2,0)\)。若每人在应「拿」时仍以概率 \(c\) 继续，则期望支付与「第一步就拿」概率随 \(c\) 上升。【分析】

:::raw
<div class="tool" id="tool_cent">
  <div class="ctrl">
    <label>继续噪声 c <output id="ce_cO">0.50</output></label>
    <input type="range" id="ce_c" min="0" max="0.95" step="0.05" value="0.50"/>
  </div>
  <div class="readout">
    <div class="ro">P(第一步拿)<strong id="ce_p1">0.50</strong></div>
    <div class="ro">E[支付₁]<strong id="ce_e1">2.31</strong></div>
    <div class="ro">E[支付₂]<strong id="ce_e2">1.56</strong></div>
    <div id="ce_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ce_vh">c=0.50：BI 的「必拿」被软化；双方期望都高于纯 BI 的 (2,0) 中的零方</span></div>
  </div>
  <canvas id="ceChart" height="214"></canvas>
</div>
:::

## 模型 3 · 有限 PD 瓦解时钟

\(R=3,T=5,P=1,S=0\)。已知共 \(N\) 期时，BI 预言**每期都背叛**，总支付 \(N\cdot P\)。若误以为「还能合作到最后一期前」，那是愿望不是均衡。【事实】

:::raw
<div class="tool" id="tool_fpd">
  <div class="ctrl">
    <label>已知期数 N <output id="fp_nO">10</output></label>
    <input type="range" id="fp_n" min="2" max="30" step="1" value="10"/>
    <label>合作支付 R <output id="fp_rO">3</output></label>
    <input type="range" id="fp_r" min="2" max="6" step="0.1" value="3"/>
    <label>惩罚支付 P <output id="fp_pO">1</output></label>
    <input type="range" id="fp_p" min="0" max="3" step="0.1" value="1"/>
  </div>
  <div class="readout">
    <div class="ro">BI 总支付<strong id="fp_bi">10.0</strong></div>
    <div class="ro">幻想全合作<strong id="fp_cc">30.0</strong></div>
    <div class="ro">缺口<strong id="fp_gap">20.0</strong></div>
    <div id="fp_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="fp_vh">已知终点 ⇒ 从第 N 期向前，合作无法在 BI 下自执行</span></div>
  </div>
  <canvas id="fpChart" height="214"></canvas>
</div>
:::

## 模型 4 · 有限轮交替出价

饼 \(S\)，贴现 \(\delta\)，轮次 \(T\)（奇数轮玩家 1 出价）。从末日「提议者通吃」倒推。默认 \(S=100,\delta=0.90,T=2\) → 先手仅 **10.0**，后手 **90.0**；无限极限先手份额 \(S/(1+\delta)\approx 52.6\)。【事实】

:::raw
<div class="tool" id="tool_barg">
  <div class="ctrl">
    <label>饼 S <output id="bg_sO">100</output></label>
    <input type="range" id="bg_s" min="10" max="200" step="1" value="100"/>
    <label>贴现 δ <output id="bg_dO">0.90</output></label>
    <input type="range" id="bg_d" min="0.50" max="0.99" step="0.01" value="0.90"/>
    <label>轮次 T <output id="bg_tO">2</output></label>
    <input type="range" id="bg_t" min="1" max="20" step="1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">先手份额<strong id="bg_first">10.0</strong></div>
    <div class="ro">后手份额<strong id="bg_second">90.0</strong></div>
    <div class="ro">无限极限<strong id="bg_lim">52.6</strong></div>
    <div id="bg_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="bg_vh">T=2,δ=0.90：末日对手拿 100，本期须分给对手 90 → 先手仅 10</span></div>
  </div>
  <canvas id="bgChart" height="214"></canvas>
</div>
:::

<!-- nav:能力与计划 -->
# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 识图 | 能指出笔终节点并手算 | 3 节点树不错标 |
| L2 应用 | Race / 讨价还价 / 进入 | 滑块结论与手算一致 |
| L3 诊断 | 分开「算法」与「前提」 | 能讲清蜈蚣悖论 |
| L4 设计 | 改终点与支付以阻断坏倒推 | 交出一份合同条款草案 |

# 30分钟最小实践

1. 画一棵「你 vs 对手」的两层树（进入/默许/斗争，或分钱接受/拒绝）。
2. 只从最后节点倒推，用红笔标 BI 路径。
3. 问一句：路径上的威胁，若真到达，你还执行吗？
4. 写下一条可在本周改的结构（押金 / 续约 / 减小 \(\Delta u\)）。

成本≈0；产出=一页树 + 一条结构改动。【分析】

# 7天计划

| 天 | 练习 | 产出 |
|---|---|---|
| D1 | 手算最后通牒 + 进入树 | 两张标注图 |
| D2 | Race-21 对战 10 局 | 记录是否按失败位走 |
| D3 | 读蜈蚣：BI vs 直觉 | 半页对照 |
| D4 | 有限 PD 瓦解故事复述 | 能讲清「为何从末日坏起」 |
| D5 | 交替出价 T=1,2,5 | 表格式份额 |
| D6 | 挑一段真实谈判倒推复盘 | 破裂点清单 |
| D7 | 设计「反瓦解」条款 | 3 条可执行规则 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 算法肌肉 | 10 棵树无支付算术错误 |
| W2 | 应用原型 | 完成讨价还价 + Race 熟练 |
| W3 | 悖论与实验 | 摘要 M&P 1992 与一种行为模型 |
| W4 | 机制设计 | 把一个真实有限合作改成「终点不确定/有押金」 |

# 10 个核心模型

1. **笔终折叠**：局部最优 → 节点终态化  
2. **BI = 完美信息有限 SPNE**  
3. **Race / 模 \(m+1\)** 必胜剩余  
4. **进入威慑可信性**（斗争支付 ≥ 默许）  
5. **有限交替出价** 回传份额  
6. **有限 PD 瓦解**  
7. **蜈蚣纯 BI 结局**（第一步拿）  
8. **继续噪声 / level-k** 软化  
9. **动态规划同构**  
10. **终点随机化** 反瓦解  

# 关键问题清单

:::details 为什么倒推从最后开始，而不是从第一期「规划」？
因为后动的最优是前动的约束；从前往后容易把愿望当成对手的行动。【分析】
:::

:::details BI 和 SPNE 是同一个东西吗？
在完美信息有限博弈中，BI 解就是 SPNE；SPNE 定义更宽，可覆盖一些不完美信息子博弈。【事实】
:::

:::details 无差异怎么办？
可有多个 BI 解；需额外选择规则或允许混合。【事实】
:::

:::details 为什么实验室不在第一步结束蜈蚣？
信念异质、利他、错误、学习——2020 年左右文献倾向 level-k 与 QRE 解释大部分非均衡，偏好模型贡献较小。【分析】【待验证：具体样本依赖】
:::

:::details 有限次囚徒困境有没有合作均衡？
在完全理性 + 共同知识 + 已知 \(T\) 下，BI/SPNE 是每期背叛。放松前提才可能。【事实】
:::

:::details 棋类能「从最后一步」解开吗？
残局可以逆行分析；整盘国际象棋因规则接近无限需有限化或另证。【事实】
:::

:::details 倒推需要共同知识到第几层？
认识论文献很细；直观上「对理性的共同知识」越浅，越早偏离纯 BI。【分析】
:::

:::details 如何对老板解释「别做不可置信威胁」？
问：若对方真进来，我们按威胁打价格战是否仍比默许更划算？不划算就不要写进计划。【推论】
:::

:::details 滚动合同为什么有用？
它削弱「确定的最后一期」，让倒推失去尖锐终点。【分析】
:::

:::details 学 BI 会让人变得更「冷血」吗？
它让人先看清结构；也可以用同一工具设计让合作自执行的结构——刀可解剖也可缝合。【分析】
:::

# 下一阶段探索

- 精读：Selten 子博弈精炼、Aumann 共同知识与 BI、Rosenthal 蜈蚣原文  
- 相邻手册：SPNE、共同知识、囚徒困境、信息集  
- 计算：用一张纸实现 3–4 层树的自动折叠，或极小残局 DP  
- 行为：对比一次真实小组游戏中的停止节点与 BI 预测  

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| BI 程序与 SPE 关系 | 教材/综述 | MIT 14.12 讲义；OSU Peck 讲义；Wikipedia Backward induction / SPE | 【事实】 |
| vN-M 倒推思想 | 经典著作 | von Neumann & Morgenstern (1944) | 【事实】 |
| Selten 精炼 | 学术史 | Selten 1965/1975；1994 诺奖 | 【事实】 |
| 蜈蚣提出 | 论文 | Rosenthal (1981) JET；教学常称 centipede | 【事实】 |
| 蜈蚣实验 | 论文 | McKelvey & Palfrey (1992) Econometrica：662 局中 37 局第一步结束 | 【事实】 |
| 共同知识与 BI | 论文 | Aumann (1995) GEB 等 | 【事实】 |
| 行为解释 | 综述/实证 | level-k、QRE；Games & Econ Behav. 2020 蜈蚣非均衡分解 | 【分析】【待验证】 |
| 棋与 BI 界限 | 论文 | Ewerhart (2002) GEB；Chess Programming Wiki Retrograde Analysis | 【事实】【分析】 |
| Race / 模数取胜 | 教学法 | MIT 14.12「取到 100」类练习 | 【事实】 |
| 讨价还价数值 | 自算 | \(S=100,\delta=0.9,T=2\) → (10,90)；极限 \(100/1.9\approx52.6\) | 【事实】 |

标记约定：【事实】多方一致或可复核；【分析】权威 ped 判断；【推论】由模型推出；【假设】未验证；【待验证】单来源或参数敏感。

# 免责声明 {.appendix}

本手册是认知与决策框架教学材料，**不构成**投资、法律、采购或谈判的专业意见。文中数值为教学推演与公开文献摘要，不保证适用于你的具体合同或市场。涉及真实利害时，请自行建模并咨询合格专业人士。实验统计（如 5.6%）依赖原研究设计，迁移到其他支付与被试时需重新核验。
