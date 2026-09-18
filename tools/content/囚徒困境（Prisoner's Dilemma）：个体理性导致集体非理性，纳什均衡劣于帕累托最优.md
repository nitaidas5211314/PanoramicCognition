---
slug: 囚徒困境（Prisoner's Dilemma）：个体理性导致集体非理性，纳什均衡劣于帕累托最优
title: 囚徒困境（Prisoner's Dilemma）：个体理性锁死集体次优；NE 劣于帕累托
subtitle: 困境不是「不够聪明」，而是<strong>每人最优反应把集体推离帕累托前沿</strong>。一次性博弈锁在背叛；重复、贴现与制度才可能把合作变成自执行均衡。
brand_sub: Prisoner's Dilemma × Collective Action × Reciprocity
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 囚徒困境, 纳什均衡, 帕累托最优, 以牙还牙, 重复博弈, 公地悲剧]
theme_js_file: 囚徒困境（Prisoner's Dilemma）：个体理性导致集体非理性，纳什均衡劣于帕累托最优.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**囚徒困境（Prisoner's Dilemma, PD）**：二人同时选合作（C）或背叛（D），支付满足 \(T>R>P>S\)（且常加 \(2R>T+S\)）。每人的严格占优策略是 D，唯一纳什均衡是 \((D,D)\)，但双方都更偏好 \((C,C)\)——**纳什均衡严格帕累托劣于可行合作结果**。【事实】

经典教学参数：\(R=3,T=5,P=1,S=0\)。对合作者背叛多赚 \(T-R=2\)，对背叛者再背叛多赚 \(P-S=1\)；社会总支付从合作的 \(6\) 掉到均衡的 \(2\)，效率仅 **1/3**。【事实】

摆脱路径不靠「劝人更善良」，而靠：**重复互动 + 足够耐心（贴现 \(\delta\)）+ 可惩罚 + 可观察**；或改支付/改规则让合作变成占优或协调均衡。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「囚犯故事」，而是一类**激励结构**：个体最优反应系统性地毁坏集体可行改进——以及哪些扩展（重复、噪声、多人、制度）能改变结构本身。

边界：

- **在界内**：2×2 PD、严格占优、\((D,D)\) 为 NE、帕累托缺口、有限/无限重复、以牙还牙（TFT）、冷酷触发（grim）、无名氏定理、公地/气候/军备的 PD 同构与误用批评。
- **在界外**：具体法庭辩护词、某次谈判话术、单只证券买卖点——除非压成「是否 PD 结构 / 如何改结构」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 个体理性如何锁死集体次优，以及解锁条件 |
| 2 | 边界在哪 | 到「支付矩阵 + 信息 + 重复规则」可形式化为止 |
| 3 | 核心对象 | \(T,R,P,S\)、占优、NE、贴现、策略（TFT/grim）、监督噪声 |
| 4 | 参与者 | 理性（或有限理性）个体、企业、国家、算法 agent |
| 5 | 关键变量 | 诱惑差 \(T-R\)、惩罚差 \(P-S\)、\(\delta\)、噪声、可观察性、群体规模 |
| 6 | 可直接观察 | 公开行动、军费、排放、贡献额、协议违约记录 |
| 7 | 无法直接观察 | 意图、贴现耐心、对他人理性深度的信念 |
| 8 | 谁影响谁 | 支付 → 占优 → 一次性 NE；重复规则 → 触发策略 → 合作区间 |
| 9 | 因果关系 | \(T>R\) 且 \(P>S\) ⇒ D 严格占优 ⇒ \((D,D)\) 唯一 NE |
| 10 | 只是相关 | 「看起来像军备竞赛」≠ PD；国内政治可主导军费【分析】 |
| 11 | 表层现象 | 价格战、堵车加塞、公地过牧、气候搭便车、合谋破裂 |
| 12 | 底层机制 | 单方偏离有利可图 + 无约束力合同 +（一次性）无未来惩罚 |
| 13 | 有反馈吗 | 有。背叛触发报复；制度改变支付；信念自我实现 |
| 14 | 有延迟吗 | 有。惩罚滞后、监测时滞、声誉积累都有延迟 |
| 15 | 正/负反馈 | 报复螺旋可正反馈；监督/合同/侧面支付可负反馈 |

## 最关键的一句话

> 囚徒困境的锋利处不在「背叛可耻」，而在：**坏结果是均衡，好结果不是**——除非你改游戏。

# 为什么值得研究

:::cards g3
### 它是「理性失灵」的最小模型
用最少假设证明：局部最优反应可以全局毁坏福利——制度设计因此有理论必要性。【事实】

### 它连接微观激励与宏观合作
从双人矩阵可扩展到公共品、气候、平台合谋、算法对抗——同一数学骨架换名字。【分析】

### 它强迫区分故事与结构
大量现实被贴上 PD 标签；批评文献指出气候等更像分配冲突或协调博弈——建模错误会导出错误政策。【分析】
:::

:::note amber 最贵的一次误判
把「一次性 PD」的结论直接搬到「无限重复关系」上：后者在 \(\delta\) 足够大时，合作可以是子博弈完美均衡。反过来，把 Axelrod 锦标赛里的 TFT 当成万能政策药方，也会忽略噪声、对手种群与支付标定。【分析】
:::

# 世界地图

九层看囚徒困境如何从「一格支付」长成「制度与演化」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="pdL9" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 改支付 / 监督 / 制裁，让合作自执行</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 演化与种群 · Axelrod 锦标赛 · 噪声下的稳健策略</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 多人扩展 · 公共品 / 公地悲剧 / N 人 PD</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 不完全监督 · 噪声、误判、慷慨 TFT / Pavlov</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 无名氏定理 · 耐心足够 ⇒ 合作可成 SPE</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 重复博弈 · TFT / grim · 贴现门槛 δ*</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 有限次悖论 · 逆向归纳 ⇒ 每期都背叛</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 占优与 NE · D≻C，唯一均衡 (D,D)</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 支付结构 · T&gt;R&gt;P&gt;S（及 2R&gt;T+S）</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1→L2**：先会判定是否 PD、为何 \((D,D)\) 是唯一 NE；进阶卡在 **L4→L5**（贴现门槛）与 **L8**（TFT 不是万能药）。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="180" y="16" width="320" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">支付四元组 (T,R,P,S)</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象：占优 / NE / 帕累托</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制：触发 · 贴现 · 监督</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作：改规则 / 选对手 / 重复</text>

  <line x1="300" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="380" y1="60" x2="550" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="190" width="180" height="64" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：T&gt;R 且 P&gt;S？</text><text x="130" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">是 → 一次性锁死 DD</text>
  <rect x="250" y="190" width="180" height="64" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：δ ≥ (T−R)/(T−P)？</text><text x="340" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">是 → grim 可撑合作</text>
  <rect x="460" y="190" width="180" height="64" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：能否改支付？</text><text x="550" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">降 T / 提 P 惩罚</text>

  <line x1="130" y1="152" x2="130" y2="190" stroke="#0f8a4d" stroke-width="1.2" marker-end="url(#cmA)"/>
  <line x1="340" y1="152" x2="340" y2="190" stroke="#1d4ed8" stroke-width="1.2" marker-end="url(#cmA)"/>
  <line x1="550" y1="152" x2="550" y2="190" stroke="#b8730a" stroke-width="1.2" marker-end="url(#cmA)"/>

  <path d="M220,222 Q340,280 460,222" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="300" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：合作破裂 → 声誉/制度压力 → 再改支付</text>
</svg>
:::

# 核心参与者

| 角色 | 激励 | 在 PD 里做什么 |
|---|---|---|
| 参与人（囚犯/企业/国家） | 最大化自身支付 | 选 C 或 D；在重复中选触发策略 |
| 检察官/规则设计者 | 诱导自白或诱导合作 | 改矩阵（奖励举报、惩罚违约） |
| 监督者 | 观测行动 | 决定噪声与误报率 |
| 旁观者/公众 | 福利与公平 | 施压制度、选择退出/抵制 |
| 策略程序员（锦标赛） | 平均得分最大化 | 提交 TFT、Pavlov 等规则 |

# 核心变量

| 变量 | 符号 | 作用 |
|---|---|---|
| 合作奖励 | \(R\) | 双方合作时的单人支付 |
| 背叛诱惑 | \(T\) | 单方背叛的诱惑；\(T>R\) 驱动占优 |
| 相互惩罚 | \(P\) | 双方背叛；通常是 NE 支付 |
| 傻瓜支付 | \(S\) | 单方合作被剥削；\(P>S\) 加固背叛 |
| 贴现因子 | \(\delta\) | 未来权重；决定合作能否自执行 |
| 噪声 | \(p\) | 行动误执行概率；破坏严格 TFT |
| 群体规模 | \(N\) | 多人公共品中摊薄边际社会收益 |

:::note green 判定口诀
**PD ⇔ \(T>R>P>S\)**（常加 \(2R>T+S\) 避免轮流剥削优于相互合作）。缺任一严格不等式，就不是经典 PD。【事实】
:::

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<div class="flow"><span>支付不等式</span><i>→</i><span class="hi">D 严格占优</span><i>→</i><span class="hi">(D,D)=NE</span><i>→</i><span>帕累托缺口</span><i>→</i><span>制度/重复压力</span></div>
:::

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">T&gt;R, P&gt;S</text>
  <rect x="180" y="30" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">D≻C 占优</text>
  <rect x="340" y="30" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="400" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">(D,D) NE</text>
  <rect x="500" y="30" width="160" height="50" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="580" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">福利 2P≪2R</text>
  <line x1="140" y1="55" x2="180" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="300" y1="55" x2="340" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="460" y1="55" x2="500" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <rect x="180" y="130" width="280" height="50" rx="8" fill="#15181d"/><text x="320" y="160" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">重复 + δ≥δ* → 合作可成 SPE</text>
  <path d="M400,80 Q400,110 320,130" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cfB)"/>
  <text x="480" y="120" fill="#d5342c" font-size="11" font-family="sans-serif">反馈：改未来惩罚</text>
</svg>
:::

# 隐藏关系

- **有限理性与逆向归纳**：理论上有限次 PD 每期都背叛；实验中前期常有合作——「解开」靠声誉、颤抖手或对他人类型的信念。【事实】【分析】
- **噪声与报复螺旋**：严格 TFT 在噪声下会进入 CD/DC 交替；慷慨 TFT、Contrite TFT、Pavlov 更稳健。【事实】
- **模型即预言**：把气候硬套成「无解公地」可能自我实现——批评者称之为 self-fulfilling tragedy。【分析】
- **国内分配冲突**：Aklin & Mildenberger 等论证气候政治更常是国内输家/赢家冲突，而非单纯国际搭便车。【分析】
- **跨域同构**：PD ↔ 价格战 ↔ 军备 ↔ 公共品搭便车 ↔ 信道上的「自私路由」——同一不等式，不同名词。【推论】

# 系统运行机制

一次性 PD 的运行机制极简：

1. 同时行动（或不观察对方行动）  
2. 每人比较：若对方 C，选 D 得 \(T>R\)；若对方 D，选 D 得 \(P>S\)  
3. 双方都选 D → NE；无人愿单方改回 C（改回只得 \(S\)）  

重复 PD 加入**历史依存策略**：合作路径靠「偏离则惩罚」支撑；惩罚必须可信（子博弈完美）。冷酷触发在经典矩阵下要求 \(\delta \ge (T-R)/(T-P)=0.5\)。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="100" r="8" fill="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1950s</text><text x="80" y="140" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Flood–Dresher</text><text x="80" y="155" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">实验原型</text>
  <circle cx="220" cy="100" r="8" fill="#1d4ed8"/><text x="220" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1965</text><text x="220" y="140" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Rapoport</text><text x="220" y="155" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">PD 专著</text>
  <circle cx="360" cy="100" r="8" fill="#b8730a"/><text x="360" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1980–84</text><text x="360" y="140" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Axelrod</text><text x="360" y="155" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">TFT 两届冠军</text>
  <circle cx="500" cy="100" r="8" fill="#5b8def"/><text x="500" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1990s</text><text x="500" y="140" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Pavlov / 噪声</text><text x="500" y="155" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">演化稳健性</text>
  <circle cx="620" cy="100" r="8" fill="#15181d"/><text x="620" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">2015–24</text><text x="620" y="140" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">TFT 批评</text><text x="620" y="155" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">气候模型辩论</text>
</svg>
:::

Axelrod 第一届 14 个程序 + 随机策略循环赛，第二届 62 个条目；两届冠军均为 Anatol Rapoport 提交的 **Tit-for-Tat**（先合作，此后抄对手上一步）。【事实】后续研究指出：胜负依赖支付标定、对手种群、赛制与噪声——TFT 不是普适最优。【分析】

# 利益与激励

| 行动 | 个体激励 | 集体后果 |
|---|---|---|
| 单方背叛 | 短期多得 \(T-R\) | 对方受损 \(R-S\)，关系破裂风险 |
| 相互背叛 | 避免当傻瓜 | 每期损失 \(R-P\)（默认各损失 2） |
| 相互合作 | 需信任/惩罚支撑 | 每期社会多得 \(2(R-P)=4\) |
| 设计惩罚 | 监督成本 | 降低有效 \(T\) 或提高违约成本 |

# 资源与信息流

合作创造的「剩余」如何被抽走或锁死：

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="120" y="60" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">潜在合作剩余</text><text x="120" y="80" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">每期 2(R−P)=4</text>
  <rect x="260" y="30" width="160" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="60" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">信息流</text><text x="340" y="80" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">行动历史 / 噪声</text>
  <rect x="480" y="30" width="160" height="70" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="560" y="60" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">均衡锁死</text><text x="560" y="80" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">剩余蒸发为 0</text>
  <line x1="200" y1="65" x2="260" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="420" y1="65" x2="480" y2="65" stroke="#d5342c" stroke-width="1.5" marker-end="url(#flB)"/>
  <rect x="140" y="140" width="400" height="60" rx="8" fill="#15181d"/><text x="340" y="165" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">抽水机制：单方偏离诱惑 T−R 吸走信任</text><text x="340" y="185" text-anchor="middle" fill="#a8b0ba" font-size="11" font-family="sans-serif">惩罚通道：δ 高 → 未来损失贴现后压过诱惑</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 | 可操作性 |
|---|---|---|---|
| 1 | 把一次性改成重复 | 直接打开合作区间 | 合同续约、会员制、长期供应 |
| 2 | 提高有效 \(\delta\) | 降低 \(\delta^*\) 门槛相对感 | 缩短反馈周期、提高可见未来 |
| 3 | 降低 \(T\)（诱惑） | 可消灭严格占优 | 奖金封顶、竞业、侧面支付限制 |
| 4 | 提高违约惩罚 | 等价抬高有效 \(P\) 损失 | 保证金、托管、公开点名 |
| 5 | 改善可观察性 | 惩罚才能对准 | 审计、链上记录、第三方监测 |
| 6 | 选对手 / 退出权 | 避开 ALLD | 伙伴筛选、可终止关系 |
| 7 | 噪声容忍策略 | 避免报复螺旋 | 慷慨 TFT、先澄清再惩罚 |
| 8 | 缩小群体或分层 | 多人 PD 更难 | 小团体先行、联盟嵌套 |
| 9 | 改成协调博弈 | 若偏好已变 | 沟通、承诺、焦点 |
| 10 | 机制设计（托管） | 外部执行力 | 第三方托管、自动履约 |

# 常见认知陷阱

:::details 1. 「均衡=最优」
NE 只保证稳定，不保证合意。PD 是教科书反例。【事实】
:::

:::details 2. 「合作=不理性」
在无限重复且 \(\delta\) 足够时，合作可以是 SPE。【事实】
:::

:::details 3. 「有限次也会合作（理论）」
逆向归纳下有限完美信息 PD 唯一 SPE 是每期背叛；实验合作需另解释。【事实】
:::

:::details 4. 「TFT 永远最优」
胜负依赖对手集、支付与噪声；PLOS One / Comp Biol 后续工作削弱「普适」叙事。【分析】
:::

:::details 5. 「一切集体行动都是 PD」
 stag hunt、鸡博弈、纯分配冲突、纯协调——结构不同，药方不同。【分析】
:::

:::details 6. 「气候=无解公地」
批评指出国内分配冲突与讨价还价模型可能更贴；硬套 PD 可能自我应验。【分析】
:::

:::details 7. 「惩罚越狠越好」
过狠惩罚在噪声下误伤合作；需可恢复（forgiveness）。【推论】
:::

:::details 8. 「只要沟通就能破局」
无约束力廉价谈话在一次性 PD 中通常不够；需要承诺技术或重复。【分析】
:::

:::details 9. 「混合策略能救 PD」
经典对称 PD 的唯一 NE 是纯 \((D,D)\)，混合帮不上忙。【事实】
:::

:::details 10. 「军备一定是 TFT 军备竞赛」
经验研究常发现军费更受国内政治驱动，而非简单以牙还牙。【待验证】【分析】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象 | 现实机制 | 可操作动作 |
|---|---|---|
| \(T>R\) | 单方毁约更赚 | 找哪一项激励构成诱惑 |
| \(P>S\) | 被卖更惨 | 评估「当傻瓜」的损失 |
| \(\delta^*\) | 耐心门槛 | 算未来关系值是否压过诱惑 |
| TFT | 对等报复 | 先合作、被骗再对等、可原谅 |
| 噪声 | 误判 | 一次违约先核实再升级 |
| 公共品 MPCR | 边际人均回报 | MPCR&lt;1 时个人不愿贡献 |

# 从理论到行动

:::cards g3
### 诊断
写出 2×2：是否 \(T>R>P>S\)？社会缺口 \(2(R-P)\) 多大？【推论】

### 分流
一次性 → 改支付或引入第三方；重复 → 算 \(\delta^*\) 与监督质量。【分析】

### 设计
选最小成本杠杆：降 \(T\)、提惩罚、加密反馈、缩小圈子。【分析】
:::

# 技能树

:::details ① 基础：判定经典 PD
给定矩阵，验证四不等式；指出唯一 NE 与帕累托改进点。
:::

:::details ② 中级：算 grim 的 δ*
对任意 \(T,R,P\) 手算 \(\delta^*=(T-R)/(T-P)\)；解释不等式来源。
:::

:::details ③ 高级：策略对照
比较 TFT / grim / ALLC / ALLD / Pavlov 在无噪声与有噪声下的行为路径。
:::

:::details ④ 专家：建模批评
对气候/军备案例，论证「是 PD / 是协调 / 是分配冲突」并给出可检验差异。
:::

# 游戏化世界

你是「结构拆弹员」：每张局势图先标 \((T,R,P,S)\)，再选关卡——「一次性拆弹」（改一格支付）或「重复拆弹」（抬高 \(\delta\)、装监督器）。得分看：社会剩余恢复了多少，以及是否误用 TFT 教条。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| T1 证明占优 | 默认矩阵两行不等式证明 D≻C |
| T2 算效率 | 写出 \(2P/2R=1/3\) 与每期损失 4 |
| T3 算 δ* | 默认参数得到 0.5；改 T=4 得到 1/3 |
| T4 锦标赛直觉 | 说明 TFT vs ALLD 在 200 回合的得分结构 |
| T5 案例分流 | 自选一则新闻，判断是否真 PD |

# 反事实模拟

:::tabs
@@若降低诱惑 T
设 \(T=2.5,R=3,P=1,S=0\)：不再 \(T>R\)，D 不占优；\((C,C)\) 可成纯 NE。【推论】

@@若有限 3 次
逆向归纳：第 3 期必 D → 第 2 期必 D → 第 1 期必 D。理论预测全背叛。【事实】

@@若 δ=0.8
默认 grim：\(\delta^*=0.5\)，0.8&gt;0.5 → 相互合作可 SPE；偏离一次得 5，其后永得 1，贴现总值低于永得 3。【事实】

@@若噪声 5%
严格 TFT–TFT 易陷入交替背叛；需更慷慨或悔改型策略。【分析】
:::

## 可调模型 1 · 支付结构：是否经典 PD？

默认 \(R=3,T=5,P=1,S=0\)：严格 PD；NE 各得 **1**；相对合作每人少 **2**；社会效率 **33.3%**。

:::raw
<div class="tool" id="tool_struct">
  <div class="ctrl">
    <label>合作奖励 R <output id="st_rO">3.0</output></label>
    <input type="range" id="st_r" min="1" max="6" step="0.1" value="3.0"/>
    <label>背叛诱惑 T <output id="st_tO">5.0</output></label>
    <input type="range" id="st_t" min="1" max="8" step="0.1" value="5.0"/>
    <label>惩罚 P <output id="st_pO">1.0</output></label>
    <input type="range" id="st_p" min="0" max="4" step="0.1" value="1.0"/>
    <label>傻瓜支付 S <output id="st_sO">0.0</output></label>
    <input type="range" id="st_s" min="-2" max="3" step="0.1" value="0.0"/>
  </div>
  <div class="readout">
    <div class="ro">是 PD？<strong id="st_pd">是</strong></div>
    <div class="ro">NE 支付<strong id="st_ne">1.0</strong></div>
    <div class="ro">效率 2P/2R<strong id="st_eff">33%</strong></div>
    <div id="st_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="st_vh">T&gt;R&gt;P&gt;S 成立 → 严格 PD；唯一 NE=(D,D)，社会总支付 2 相对合作 6，效率 33%</span></div>
  </div>
  <canvas id="stChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 冷酷触发：合作所需最小贴现 δ*

激励相容：永续合作现值 \(R/(1-\delta)\) ≥ 偏离一次再永罚 \(T+\delta P/(1-\delta)\) ⇒ \(\delta \ge (T-R)/(T-P)\)。默认 **δ\*=0.50**；当你的 \(\delta=0.60\) 时合作可撑住。

:::raw
<div class="tool" id="tool_grim">
  <div class="ctrl">
    <label>合作奖励 R <output id="gr_rO">3.0</output></label>
    <input type="range" id="gr_r" min="1" max="6" step="0.1" value="3.0"/>
    <label>背叛诱惑 T <output id="gr_tO">5.0</output></label>
    <input type="range" id="gr_t" min="2" max="8" step="0.1" value="5.0"/>
    <label>惩罚 P <output id="gr_pO">1.0</output></label>
    <input type="range" id="gr_p" min="0" max="3" step="0.1" value="1.0"/>
    <label>你的贴现 δ <output id="gr_dO">0.60</output></label>
    <input type="range" id="gr_d" min="0.05" max="0.95" step="0.01" value="0.60"/>
  </div>
  <div class="readout">
    <div class="ro">δ*<strong id="gr_star">0.50</strong></div>
    <div class="ro">合作现值<strong id="gr_coop">7.50</strong></div>
    <div class="ro">偏离现值<strong id="gr_dev">6.50</strong></div>
    <div id="gr_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="gr_vh">δ=0.60 ≥ δ*=0.50 → 冷酷触发下相互合作可激励相容</span></div>
  </div>
  <canvas id="grChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 重复赛得分：TFT / ALLC / ALLD

经典 Axelrod 支付、对局长度 \(n\)（默认 200）。TFT–TFT 各得 \(3n=600\)；ALLC–ALLD：合作方 0、背叛方 \(5n=1000\)；TFT–ALLD：TFT 得 \(0+1\cdot(n-1)=199\)，ALLD 得 \(5+1\cdot(n-1)=204\)。

:::raw
<div class="tool" id="tool_tour">
  <div class="ctrl">
    <label>对局回合 n <output id="tr_nO">200</output></label>
    <input type="range" id="tr_n" min="10" max="400" step="10" value="200"/>
    <label>R <output id="tr_rO">3</output></label>
    <input type="range" id="tr_r" min="1" max="6" step="1" value="3"/>
    <label>T <output id="tr_tO">5</output></label>
    <input type="range" id="tr_t" min="2" max="8" step="1" value="5"/>
    <label>P <output id="tr_pO">1</output></label>
    <input type="range" id="tr_p" min="0" max="4" step="1" value="1"/>
  </div>
  <div class="readout">
    <div class="ro">TFT↔TFT<strong id="tr_tt">600</strong></div>
    <div class="ro">TFT vs ALLD<strong id="tr_td">199</strong></div>
    <div class="ro">ALLC vs ALLD<strong id="tr_cd">0</strong></div>
    <div id="tr_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="tr_vh">n=200：相互合作 600；TFT 对剥削者得 199（首期被剥削后对等惩罚）；纯合作者对 ALLD 得 0</span></div>
  </div>
  <canvas id="trChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 未来阴影：续局概率 w

不知何时结束时，每期以概率 \(w\) 继续，期望长度 \(1/(1-w)\)。把 \(w\) 视作有效贴现时，合作条件近似 \(w \ge (T-R)/(T-P)\)。默认 \(w=0.90\) → 期望 **10** 期，高于门槛 0.50。

:::raw
<div class="tool" id="tool_shadow">
  <div class="ctrl">
    <label>续局概率 w <output id="sh_wO">0.90</output></label>
    <input type="range" id="sh_w" min="0.10" max="0.98" step="0.01" value="0.90"/>
    <label>T <output id="sh_tO">5.0</output></label>
    <input type="range" id="sh_t" min="2" max="8" step="0.1" value="5.0"/>
    <label>R <output id="sh_rO">3.0</output></label>
    <input type="range" id="sh_r" min="1" max="6" step="0.1" value="3.0"/>
    <label>P <output id="sh_pO">1.0</output></label>
    <input type="range" id="sh_p" min="0" max="3" step="0.1" value="1.0"/>
  </div>
  <div class="readout">
    <div class="ro">期望期数<strong id="sh_len">10.0</strong></div>
    <div class="ro">门槛 w*<strong id="sh_star">0.50</strong></div>
    <div class="ro">合作？<strong id="sh_ok">是</strong></div>
    <div id="sh_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="sh_vh">w=0.90 ≥ w*=0.50，期望 10.0 期 → 「未来阴影」足够支撑合作</span></div>
  </div>
  <canvas id="shChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 | 识别 PD 与帕累托缺口 | 默写不等式 + 效率比 |
| L2 | 算 δ* 与阴影条件 | 手算与滑块一致 |
| L3 | 策略与噪声 | 说明 TFT 失效场景 |
| L4 | 案例建模批评 | 写出「非 PD」替代模型 |

# 30分钟最小实践

1. 在纸上画出默认 2×2，证明 D 严格占优，圈出帕累托改进 (C,C)（8 分钟）。  
2. 手算 \(\delta^*=(5-3)/(5-1)=0.5\)，再打开模型 2 把 δ 拖到 0.49 / 0.51 看判定翻转（10 分钟）。  
3. 模型 3 设 n=50，记录 TFT↔TFT 与 TFT vs ALLD 得分，用一句话解释「好人如何防傻瓜」（7 分钟）。  
4. 选一件身边「像 PD」的事，写清是否真满足 \(T>R>P>S\)（5 分钟）。  

产出：一张手算矩阵 + 一句案例判定——成本接近 0，可验证。

# 7天计划

| 天 | 焦点 | 交付 |
|---|---|---|
| D1 | 定义与占优 | 自造 1 个 PD 矩阵 |
| D2 | 帕累托缺口 | 计算 3 组效率比 |
| D3 | grim δ* | 5 组 (T,R,P) 表 |
| D4 | TFT 叙事与批评 | 半页笔记 |
| D5 | 噪声 | 描述一条报复螺旋 |
| D6 | 现实案例分流 | 1 则新闻建模 |
| D7 | 复盘 | 技能树自测 |

# 30天计划

| 周 | 主题 | 成果 |
|---|---|---|
| W1 | 静态 PD 熟练 | 10 个矩阵速判 |
| W2 | 重复与贴现 | δ* 计算器手熟 |
| W3 | 策略动物园 | TFT/grim/Pavlov 对照卡 |
| W4 | 应用与批评 | 气候/团队/价格战各一页 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 经典 2×2 PD | \(T>R>P>S\) ⇒ 唯一 NE 次优 |
| 2 | 占优策略求解 | 不依赖信念即可预测背叛 |
| 3 | 有限次逆向归纳 | 理论全背叛 |
| 4 | 冷酷触发 | \(\delta\ge(T-R)/(T-P)\) 撑合作 |
| 5 | 以牙还牙 TFT | 先合作、对等报复、可原谅 |
| 6 | 无名氏定理 | 足够耐心 ⇒ 多种合作支付可 SPE |
| 7 | 噪声 IPD | 需慷慨/悔改，严格 TFT 脆弱 |
| 8 | N 人公共品 | MPCR&lt;1 时贡献劣策略 |
| 9 | 公地悲剧 | 多人开放资源的 PD 族 |
| 10 | 分配冲突替代 | 气候政治的国内输家理论 |

# 关键问题清单

:::details Q1 我面对的是不是 PD？
检查四不等式与是否存在有约束力合同；否则可能是协调或谈判。
:::

:::details Q2 一次性还是重复？
有结束日且共同知识 → 警惕逆向归纳；不确定结束 → 看续局概率。
:::

:::details Q3 我的 δ 够不够？
算 \(\delta^*\)；若不够，优先缩短反馈或提高关系续存，而非空喊合作。
:::

:::details Q4 监督噪声多大？
误判率高时不要用「一叛永罚」；先核实。
:::

:::details Q5 能否改支付？
降 \(T\)、抬惩罚、引入托管，往往比道德劝说便宜。
:::

:::details Q6 对手是 ALLD 吗？
可退出则退出；不可退出则降低暴露面。
:::

:::details Q7 多人时怎么办？
缩小有效群体、分层联盟、选择性激励（Olson）。
:::

:::details Q8 TFT 该不该用？
关系长期、可观察、低噪声 → 可作默认；否则谨慎。
:::

:::details Q9 如何避免模型自我实现？
同时写「替代博弈」假设并找可区分证据。
:::

:::details Q10 成功指标是什么？
不是「对方有没有变好」，而是社会剩余是否恢复、违约率是否下降。
:::

# 下一阶段探索

- 读 Axelrod *The Evolution of Cooperation*（1984）与 2015 PLOS One 对 TFT 普适性的再分析。  
- 对照 Nowak & Sigmund 的 Pavlov / Win-Stay Lose-Shift。  
- 气候主题并行阅读：公地模型 vs Aklin–Mildenberger 分配冲突。  
- 与本引擎《纳什均衡》《占优策略》手册交叉：PD 是二者交汇的最小反例。  
- 进阶：不完全监督重复博弈、相关均衡、机制设计中的侧面支付。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| PD 支付不等式与占优 | 教材标准 | Rapoport & Chammah；主流博弈论教材 | 【事实】 |
| 经典参数 R=3,T=5,P=1,S=0 | 锦标赛设定 | Axelrod 1980/1984 计算机锦标赛 | 【事实】 |
| TFT 两届冠军 | 原始论文 | Axelrod, *J. Conflict Resolution* 1980；*Science* 1981 | 【事实】 |
| grim δ*=(T−R)/(T−P)=1/2 | 标准推导 | 重复博弈讲义 / Folk theorem 特例 | 【事实】 |
| TFT 普适性受质疑 | 同行评议 | Rapoport et al., PLOS One 2015；Harper et al., PLOS Comp Biol 2024 | 【分析】 |
| 噪声下策略 | 研究综述 | Wu & Axelrod 1995；Nowak & Sigmund 1993；arxiv 2303.03519 | 【分析】 |
| 气候≠单纯公地 | 学术批评 | Kopec；Aklin & Mildenberger 2020 *GEP* | 【分析】 |
| 军备 PD 隐喻局限 | 百科/经验 | 维基「囚徒困境」军备节；希土军费研究转述 | 【待验证】 |
| 南海「军备竞赛」表述 | 新闻 | 德媒等 2024 报道外交表述 | 【待验证】 |

标记约定：【事实】多方一致或标准定理；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或转述链长。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，不构成法律、投资、外交或军事建议。博弈模型是对激励结构的简化；现实含不完全信息、国内政治、伦理约束与制度细节。将手册结论直接用于高风险决策前，应咨询相应领域专业人士并核对一手数据。页脚「耗时」由流水线自动写入，不代表研究完备性保证。
