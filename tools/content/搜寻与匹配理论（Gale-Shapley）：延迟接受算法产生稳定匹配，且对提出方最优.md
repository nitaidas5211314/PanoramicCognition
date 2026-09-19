---
slug: 搜寻与匹配理论（Gale-Shapley）：延迟接受算法产生稳定匹配，且对提出方最优
title: 搜寻与匹配理论（Gale–Shapley）
subtitle: 延迟接受<strong>总能</strong>给出稳定匹配，而且这个匹配对<strong>提出方最优</strong>、对接受方最劣——谁先开口，谁站在稳定匹配格的有利一端。
brand_sub: Gale–Shapley × Market Design
kicker: Panoramic Cognition & Practice Engine
chips: 30 节骨架 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-20
data_asof: 2026 年 9 月
tags: [博弈论, 匹配理论, Gale-Shapley, 延迟接受, 稳定匹配, 市场设计, NRMP, 择校]
theme_js_file: 搜寻与匹配理论（Gale-Shapley）：延迟接受算法产生稳定匹配，且对提出方最优.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**延迟接受（deferred acceptance, DA）**对任意严格偏好都停机，并交出一个**稳定匹配**：不存在一对「彼此都更想在一起、却没被配在一起」的人。【事实】

Gale 与 Shapley 1962 年证明的第二句话更锋利：若由一方提出、另一方暂留最优并拒绝其余，则结果是**提出方最优**的稳定匹配——每个提出者拿到的对象，都不差于他在**任何一个**其他稳定匹配里的对象；同时它是**接受方最劣**的稳定匹配。【事实】

谁取得提出权，谁就站在稳定匹配格的优端。这不是谈判话术，是算法的选择。

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么海投简历」，而是：两边各有偏好（学校还有配额）时，有没有一套规则，使配对**稳定**，并且能事先说清**稳定解里哪一端对谁有利**。

队列标题里的「搜寻与匹配」在劳动经济学里常指 Diamond–Mortensen–Pissarides 的失业搜寻。本手册**不**走那条线。边界钉在 Gale–Shapley：双边匹配、阻塞对、延迟接受、提出方最优。失业的保留工资、匹配函数 m(u,v) 只在「同名不同构」里点一次，避免走错门。【分析】

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 双边（或多对一）偏好下，如何得到稳定匹配，以及稳定解之间谁占优 |
| 2 | 边界在哪 | 到「偏好 + 配额 + 稳定」为止；价格、工资竞价、单边室友问题另算 |
| 3 | 核心对象 | 提出者、接受者、偏好序、阻塞对、暂定保留、稳定匹配格 |
| 4 | 参与者 | 申请者与项目/学校；清算所设计者；被算法忽略的旁观者（落空者、农村医院） |
| 5 | 关键变量 | 谁提出、名单是否完整、偏好是否严格、配额、夫妻等联合约束 |
| 6 | 可直接观察 | 最终配对、名单长度、提议轮次、哪些岗位空着 |
| 7 | 无法直接观察 | 真实偏好（提交的名单可能已截断）、场外私下承诺 |
| 8 | 谁影响谁 | 提出权 → 选中格的哪一端 → 两侧序位；接受方截断可把结果从另一端拽过来 |
| 9 | 因果关系 | 延迟接受 ⇒ 稳定且提出方最优；提出方 ⇒ 说真话是占优策略 |
| 10 | 只是相关 | 「匹配率高」≠ 稳定；「学生满意」≠ 对学校策略防操纵 |
| 11 | 表层现象 | 住院医配对、择校、器官交换的规则争论 |
| 12 | 底层机制 | 暂定接受把拒绝推迟到信息到齐；被拒绝者沿名单下移 |
| 13 | 有反馈吗 | 有。不稳定会诱使场外重新签约，清算所被弃用 |
| 14 | 有延迟吗 | 有。一轮暂定保留要等后续更好的提议才翻盘，最终才转正 |
| 15 | 正/负反馈 | 稳定 → 参与者留在场内（正）；接受方觉得吃亏 → 游说改提出方或退出（负） |

## 最关键的一句话

> 稳定回答「会不会被拆散」；提出方最优回答「在所有不拆散的方案里，利益站在谁那边」。

# 为什么值得研究

:::cards g3
### 存在性不再是信仰
任意两边人数相等、偏好严格且完整时，稳定匹配一定存在，因为 DA 一定停机并给出一个。【事实】人数不等或有人不可接受时，稳定匹配仍存在，但有人落空——落空者集合在所有稳定匹配里相同（农村医院定理的一人版）。【事实】

### 提出权是可设计的杠杆
同一套偏好，男方提出与女方提出可以选出格的两端。经典 3×3 里两端的平均序位是 **1.67** 与 **2.33**，差 **0.67** 个序位（按未舍入的 2/3 显示；1.67 与 2.33 相减会得到 0.66，那是舍入）。【事实】

### 说真话只保护一边
提出方在 DA 下如实排序是占优策略；不存在「总稳定、且两边都不敢撒谎」的机制（Roth 1982）。【事实】
:::

:::note amber 最贵的一次误判
把「稳定」听成「公平」或「学生帕累托最优」。稳定只禁止阻塞对。择校里学生提出的 DA 可以对学生不帕累托有效；2025 年的一篇预印本进一步争辩：连那些帕累托改进 DA 的机制，也消不掉序位低效与隔离。【待验证】
:::

# 世界地图

九层从「两边各有一张名单」爬到「清算所该把提出权交给谁」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="gsMap" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度现场 · NRMP 1998 · 纽约 2003 · 波士顿 2005</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 市场设计 · 把提出权交给需要被保护的一侧</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 激励边界 · 一边可防操纵；两边同时防操纵且总稳定：不可能</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 格 · 稳定匹配在提出方偏好下成格，两端即两侧最优</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 最优性 · 提出方最优 = 接受方最劣</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 算法 · 沿名单下移；对方暂留当前最优、拒绝其余</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 稳定 · 没有阻塞对；不稳定会从场外拆散清算所</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 偏好与配额 · 严格序、可接受集、医院响应偏好</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 原语 · 两边代理人 + 谁提出</text>
</svg>
:::

:::note blue 读图要点
入门停在 **L3–L5**：会手跑 3 人 DA，能指出提出方均秩 1.67、接受方 2.33。设计停在 **L7–L9**：提出权是政策，不是中性技术；大市场里两端差距可以小到几乎看不见，小例子里的 0.67 不能外推。【分析】
:::

# 核心概念地图

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="gsAbsA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="gsAbsB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="80" y="16" width="520" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">偏好 → 延迟接受 → 稳定匹配格的一端</text>
  <rect x="40" y="86" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="110" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="128" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">稳定 · 格 · 最优</text>
  <rect x="250" y="86" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="110" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="128" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">暂定保留 · 拒绝下移</text>
  <rect x="460" y="86" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="110" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="128" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">谁提出 · 截断 · 清算所</text>
  <line x1="280" y1="60" x2="130" y2="86" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#gsAbsA)"/>
  <line x1="340" y1="60" x2="340" y2="86" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#gsAbsA)"/>
  <line x1="400" y1="60" x2="550" y2="86" stroke="#b8730a" stroke-width="1.5" marker-end="url(#gsAbsA)"/>
  <rect x="40" y="176" width="180" height="64" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="202" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">阻塞对 = 0</text><text x="130" y="222" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">否则场外重签</text>
  <rect x="250" y="176" width="180" height="64" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="202" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">每对至多提议一次</text><text x="340" y="222" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">停机 ≤ n² 次</text>
  <rect x="460" y="176" width="180" height="64" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="202" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">序位 1.67 vs 2.33</text><text x="550" y="222" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">经典 3×3 的两端</text>
  <line x1="130" y1="142" x2="130" y2="176" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#gsAbsA)"/>
  <line x1="340" y1="142" x2="340" y2="176" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#gsAbsA)"/>
  <line x1="550" y1="142" x2="550" y2="176" stroke="#b8730a" stroke-width="1.5" marker-end="url(#gsAbsA)"/>
  <path d="M220 208 H250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#gsAbsB)"/>
  <path d="M430 208 H460" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#gsAbsB)"/>
  <text x="340" y="276" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红虚线 = 反馈：接受方吃亏 → 截断或游说改提出方 → 格的另一端</text>
  <text x="340" y="308" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">同构：阻塞对 ≈ 纳什可偏离 · 提出权 ≈ 先动选均衡 · 暂定保留 ≈ 可撤销要约</text>
  <text x="340" y="336" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">不同构：DMP 搜寻是连续时间的匹配函数，不是这张离散格</text>
</svg>
:::

# 核心参与者

| 角色 | 目标 | 信息位置 | 典型动作 |
|---|---|---|---|
| 提出方 | 在稳定解里尽量靠前 | 知己偏好；不知对方真实序 | 沿名单提议；DA 下应说真话 |
| 接受方 | 少被「最劣稳定解」锁死 | 看到谁来提议 | 暂留最优；有时截断名单 |
| 清算所 | 场内稳定、可解释、少被博弈 | 收到的是提交名单，不是真实偏好 | 选定谁提出、如何破平局 |
| 配额机构（医院/学校） | 招满且质量高 | 对申请者的优先级 | 响应偏好下按序录取至配额 |
| 落空者 / 农村医院 | 不想在所有稳定解里都空着 | 往往最后才发现空缺是结构性的 | 改补贴或配额，而不是改提出方 |
| 夫妻等联合体 | 两份工作一起算 | 联合偏好可以让稳定解消失 | 需 Roth–Peranson 式扩展，不再有存在性保证 |

# 核心变量

| 变量 | 度量 | 为何关键 | 杠杆方向 |
|---|---|---|---|
| 谁提出 | 男/女、学生/医院 | 直接选定格的一端 | 设计时先写进规则，不要事后解释 |
| 平均序位 | 1 = 最爱 | 小例子里两端差 0.67 | 与「什么都不做的另一端」对照，不单报胜率 |
| 稳定匹配个数 | 本市场穷举 | 只有 1 个时，提出权不改变配对 | ρ≥0.4 的混合市场降为 1 |
| 提议次数 | 每对至多 1 次 | 上界 n²；n=3 穷举最大 7 | 用来证明停机，不用来比较福利 |
| 名单长度 / 截断 | k = 1 或 2 | 接受方可借截断跳端 | 医院提出的 2×2：k=1 把学生均秩从 2 打到 1 |
| 配额与响应性 | 医院对个人的排序可提升到集合 | 农村医院定理的前提 | 配额 1 时响应性自动成立 |
| 平局 | 学校对大批学生无差异 | 破平局方式会碰策略防操纵 | 择校文献的单独一章，别假装严格偏好 |
| 共同质量 ρ | 0 到 1，步长 0.1 | 偏好越齐，格越塌成一点 | 本页 ρ=0 有 2 个稳定解，ρ=0.4 起只剩 1 个 |
| 约束（夫妻） | 联合名单 | 稳定匹配可以不存在 | 先问存在，再谈最优 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="gsCauA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="gsCauB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="30" width="140" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="100" y="52" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">严格偏好</text><text x="100" y="70" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">可接受集</text>
  <rect x="220" y="30" width="150" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="295" y="52" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">延迟接受</text><text x="295" y="70" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">暂留 · 拒绝</text>
  <rect x="420" y="30" width="150" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="495" y="52" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">稳定 + 提出方最优</text><text x="495" y="70" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">接受方最劣</text>
  <line x1="170" y1="56" x2="220" y2="56" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#gsCauA)"/>
  <line x1="370" y1="56" x2="420" y2="56" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#gsCauA)"/>
  <rect x="220" y="140" width="150" height="52" rx="8" fill="#fee2e2" stroke="#d5342c"/><text x="295" y="162" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">接受方截断</text><text x="295" y="180" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">k=2 → k=1</text>
  <rect x="420" y="140" width="150" height="52" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="495" y="162" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">跳到另一端</text><text x="495" y="180" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">学生 2.00→1.00</text>
  <path d="M495 82 C495 110 370 110 295 140" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#gsCauB)"/>
  <line x1="370" y1="166" x2="420" y2="166" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#gsCauB)"/>
  <text x="340" y="230" text-anchor="middle" fill="#1d4ed8" font-size="12" font-family="sans-serif">实线因果：算法 ⇒ 稳定且提出方最优（Gale–Shapley 1962）</text>
  <text x="340" y="254" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红虚线反馈：接受方用截断把市场拽向自己的最优端</text>
  <text x="340" y="278" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">相关但非因果：「匹配率」高，只说明名额填了，不说明没有阻塞对</text>
</svg>
:::

三条要分开记：

1. **偏好严格 + DA ⇒ 稳定且提出方最优。** 证明要点：算法只会拒绝「在任何稳定匹配里都不可能」的对象，所以留下的就是提出者在稳定集里的最好对象。【事实】
2. **提出方最优 ⇒ 接受方最劣。** 同一匹配，不是另一个算法。女方提出才走到另一端。【事实】
3. **接受方截断 ⇒ 可能离开这一端。** 2×2 医院提出、学生如实申报时配对是医院最优；学生子把名单截到只剩乙，市场跳到学生最优。这是机制反馈，不是偏好变了。【事实】

# 隐藏关系

:::cards g2
### 提出方最优是格的一端
经典市场只有两个稳定匹配：男方提出得到 A–X、B–Y、C–Z；女方提出得到 A–Y、B–X、C–Z。C–Z **两边都不动**。稳定匹配在提出方偏好下成格（常归功于 Conway，经由 Knuth 传播）：两端就是两侧最优。【事实】

### 农村空缺换不了端
医生甲只接受城X，城X不接受甲；乙：城X > 城Y > 乡；丙：城Y > 城X。城X 偏好丙 > 乙，城Y 偏好乙 > 丙，乡接受甲和乙。穷举仅两个稳定匹配：医生提出是「乙–城X、丙–城Y」（3 次提议），医院提出是「乙–城Y、丙–城X」（4 次提议）。甲两次都落空，乡两次都空。乙和丙的序位从 1 变成 2，乡的名册不变。【事实】

### 说真话 ≈ 显示原理的一侧
DA 让提出方的占优策略就是报真序（Dubins–Freedman 1981；Roth 1982）。这和「直接机制里说真话」是同一结构，但**只覆盖提出的那一边**。【事实】

### 与失业搜寻只共享一个词
DMP 的匹配函数描述的是摩擦市场上「相遇率」；Gale–Shapley 描述的是相遇之后**如何不再被拆散**。把保留工资代进 DA，或把阻塞对说成失业率，都是范畴错误。【分析】
:::

跨域同构：阻塞对 ↔ 纳什均衡里的单方面偏离；提出权 ↔ 先动者在多重均衡里点名；暂定接受 ↔ 可撤销要约；农村医院定理 ↔ 「比较静态救不了结构性短缺」；稳定解计数是 #P 完全（Irving & Leather 1986）↔ 计数复杂性。【事实】

# 系统运行机制

```
收集两边名单与配额
  → 指定谁提出
  → 提出者向名单上一个尚未拒绝自己的对象提议
  → 接受者在「新提议 + 当前暂定对象」里留下最优，拒绝其余（多对一则留到配额）
  → 被拒绝者继续下移
  → 无人再被拒绝时，暂定转为最终匹配
  → 检查：阻塞对是否为空；落空集合是否与另一端相同
```

:::note green 运行时检查清单
1. 偏好是否严格？有大量平局就不要直接套「策略防操纵」的教科书句子。
2. 谁提出写进了规则没有？没写，最优性就没有归属。
3. 停机：每对至多提议一次，次数 ≤ n²。
4. 手算结束时，逐对检查阻塞；经典 3×3 的两个匹配都应是 0 个阻塞对。
5. 若有人落空，换提出方再跑一次：落空者应仍落空（农村医院定理）。
:::

经典 3×3 的偏好（序位 1 最好）：

| 人 | 偏好 |
|---|---|
| A | X > Y > Z |
| B | Y > X > Z |
| C | X > Y > Z |
| X | B > A > C |
| Y | A > B > C |
| Z | A > B > C |

男方提出走到 A–X、B–Y、C–Z，提议 **5** 次，男方序位 1、1、3（均 **1.67**），女方序位 2、2、3（均 **2.33**）。女方提出走到 A–Y、B–X、C–Z，数字对调，提议也是 5 次。全部 6 个完美匹配里，稳定的只有这 2 个。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 230" width="100%" style="max-width:680px">
  <defs>
    <marker id="gsTime" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="36" y1="108" x2="648" y2="108" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="70" cy="108" r="9" fill="#0f8a4d"/><text x="70" y="46" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1950s</text><text x="70" y="64" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">NRMP</text><text x="70" y="148" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">先有算法</text>
  <circle cx="175" cy="108" r="9" fill="#1d4ed8"/><text x="175" y="46" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1962</text><text x="175" y="64" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Gale–Shapley</text><text x="175" y="148" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">稳定+最优</text>
  <circle cx="280" cy="108" r="9" fill="#b8730a"/><text x="280" y="46" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1982–86</text><text x="280" y="64" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Roth</text><text x="280" y="148" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">激励·农村</text>
  <circle cx="400" cy="108" r="9" fill="#1d4ed8"/><text x="400" y="46" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1998</text><text x="400" y="64" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">申请者提出</text><text x="400" y="148" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">NRMP 改规则</text>
  <circle cx="510" cy="108" r="9" fill="#d5342c"/><text x="510" y="46" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">2003–06</text><text x="510" y="64" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">择校</text><text x="510" y="148" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">纽约·波士顿</text>
  <circle cx="610" cy="108" r="9" fill="#15181d"/><text x="610" y="46" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">2012</text><text x="610" y="64" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">诺奖</text><text x="610" y="148" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Roth·Shapley</text>
  <text x="340" y="190" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">实践早于定理：清算所先跑起来，1984 年才被认出就是延迟接受</text>
  <text x="340" y="212" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">Gale 2008 年去世，2012 年奖发给 Roth 与 Shapley</text>
</svg>
:::

演化逻辑：1950 年代初美国住院医匹配已经在用后来被证明等价于医院提出型 DA 的程序；1962 年才有存在性与最优性；1982 年补上「不能两边都防操纵」；1984 年 Roth 把 NRMP 认出来；1986 年农村医院定理说明换端救不了招不满的医院；1997 年 5 月 NRMP 理事会改用申请者提出，1998 年匹配起执行；纽约高中 2003 年（2004 年入学）、波士顿 2005–06 学年改掉不防操纵的「波士顿机制」。【事实】

# 利益与激励

| 主体 | 想要什么 | 规则如何偏他 | 扭曲 |
|---|---|---|---|
| 提出方 | 稳定集里的最好对象 | DA 把最优端给他，并让他说真话 | 小市场里优势明显；大市场可能只影响极少数人 |
| 接受方 | 躲开最劣端 | 对方提出时，截断有时能跳端 | 截断赌错就会落空，期望上常常害大于利 |
| 医院/项目 | 旧 NRMP 由自己提出 | 1998 年前站在优端 | 申请者怀疑系统，信任本身是市场资产 |
| 学生/家庭 | 不用「博弈」择校 | 学生提出的 DA 让真序成为占优策略 | 波士顿机制惩罚把真实第二志愿写在第二位的人 |
| 农村医院 | 换算法以招到人 | 定理说招不满者的名册在所有稳定解里相同 | 把政治压力用在错误的杠杆上 |
| 夫妻 | 两地同时可接受 | 联合偏好可让稳定匹配不存在 | 强行套单人 DA 会在约束上沉默失败 |

Roth 与 Peranson 用 1987 及 1993–1996 年真实名单比较新旧算法：**不到 1/1000** 的申请者会配到不同项目（**<0.1%**）。选择申请者提出，主要是把原则站到申请者一边，不是因为两端在大市场里差得很远。【事实】

Rees-Jones 调查 2012 年 NRMP（23 所医学院，n=558）：**83.33%** 认为自己如实填报；**5.38%** 归因于策略，**0.36%** 归因于失误，**10.93%** 为其他原因。非如实合计 16.67 个百分点，作者概括为约 17%。随后的激励实验里，1714 名刚参加过匹配的医学生中有 **23%** 在类匹配任务里谎报。【事实】策略防操纵消除的是「撒谎的收益」，不是「撒谎的冲动」。

# 资源与信息流

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="gsFlA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
    <marker id="gsFlB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="36" y="28" width="170" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="121" y="56" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">真实偏好</text><text x="121" y="78" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">脑子里的序</text>
  <rect x="255" y="28" width="170" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="56" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">提交名单</text><text x="340" y="78" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">清算所看见的</text>
  <rect x="474" y="28" width="170" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="559" y="56" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">稳定匹配</text><text x="559" y="78" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">格的一端</text>
  <line x1="206" y1="63" x2="255" y2="63" stroke="#0f8a4d" stroke-width="2" marker-end="url(#gsFlA)"/>
  <line x1="425" y1="63" x2="474" y2="63" stroke="#0f8a4d" stroke-width="2" marker-end="url(#gsFlA)"/>
  <path d="M559 98 Q559 150 121 168" fill="none" stroke="#0f8a4d" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#gsFlA)"/>
  <text x="340" y="188" text-anchor="middle" fill="#0f8a4d" font-size="12" font-family="sans-serif">绿：提出方说真话时，名单 = 真实偏好，最优端回流给提出方</text>
  <rect x="150" y="214" width="380" height="44" rx="8" fill="#fee2e2" stroke="#d5342c"/><text x="340" y="241" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红抽水：接受方在最劣端白白让出 0.67 个序位（经典 3×3）</text>
</svg>
:::

信息瓶颈不在公式，在**提交名单 ≠ 真实偏好**。波士顿旧机制（尽快满足第一志愿，名额立刻锁死）惩罚把心仪但难进的学校放在第一位的家庭：第二志愿可能已被「把它写成第一」的人占满。学生提出的 DA 把暂定保留留到最后，第一志愿写错不再有策略收益，所以真序成为占优策略。【事实】

抽水的对照基准不是「50% 公平」，而是**格的另一端**。经典 3×3 里提出方均秩 1.67、接受方 2.33，超额就是这 0.67。NRMP 历史名单上两端差异 **<0.1%** 的人——小黑板例题的福利转移，不能当成大市场的效果量级。【事实】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 序 | 杠杆点 | 为何高杠杆 | 操作 |
|---|---|---|---|
| 1 | 先写明谁提出 | 一句话选定格的哪一端 | 规则文本里出现「applicant-proposing」或相反 |
| 2 | 只向提出方保证说真话 | 另一边没有这个定理 | 咨询口径不要说「谁都不用博弈」 |
| 3 | 用截断测试接受方 | 2×2 里 k=1 把学生均秩从 2.00 打到 1.00 | 先跑如实，再删掉接受方的次优项 |
| 4 | 先问稳定解是否存在 | 夫妻联合偏好可以让稳定集为空 | 有联合约束就别承诺「DA 一定有解」 |
| 5 | 农村空缺不要换端 | 招不满者的名册在所有稳定解相同 | 改补贴、配额、偏好，而不是改提出方 |
| 6 | 平局单独处理 | 大量无差异会碰到策略防操纵 | 择校要写清破平局，不要假装严格序 |
| 7 | 不稳定会拆市场 | 英国部分地区用不稳定算法后清算所失败 | 先查阻塞对，再谈满意度 |
| 8 | 波士顿机制是反面教材 | 立即接受惩罚说实话 | 家庭指南应改成「按真序填」仅当机制是 DA |
| 9 | 稳定 ≠ 学生帕累托最优 | DA 可以留下学生之间的改进循环 | 效率修补（如 EADA）要单独报价，并交出稳定性 |
| 10 | 大市场两端可能几乎重合 | NRMP 上 <0.1% 的人结果不同 | 用历史名单做对照，别拿 3 人例题吓委员会 |

# 常见认知陷阱

:::details 1. 「稳定就是公平」
稳定只说没有阻塞对。经典例里女方在男方最优下均秩 2.33，比自己提出时的 1.67 更差，匹配却是稳定的。【事实】
:::

:::details 2. 「两边都会拿到自己的最优」
最优性是零和的：提出方最优同时是接受方最劣。不存在一个稳定匹配让两边同时达到自己的最优端，除非稳定匹配只有一个。【事实】
:::

:::details 3. 「谁先提议谁吃亏，因为暴露了偏好」
方向反了。在 DA 里先提议的一侧拿走优端，而且说真话是占优策略。吃亏的是只能拒绝、不能发起的那一侧。【事实】
:::

:::details 4. 「暂定接受等于已经录取」
暂定就是算法名字里的 deferred：后来出现更好的提议，先前的对象会被拒。把第一轮保留当成合同，会误读整个过程。【事实】
:::

:::details 5. 「换谁提出就能让农村医院招满人」
Roth 1986：严格偏好、医院偏好响应时，任一稳定匹配里招不满的医院，在所有稳定匹配中拿到同一组人。本页例题里乡医院两次都空，城市医院只是对调乙和丙。【事实】
:::

:::details 6. 「申请者在 NRMP 里博弈名单能捞到好处」
1998 年起是申请者提出。说真话是占优策略。调查仍看到约 17% 的人自述没有如实填（细表 16.67 个百分点，n=558），其中 5.38% 明确说是在策略行为——收益上这是白忙。【事实】
:::

:::details 7. 「截断总是聪明的」
只在你处于接受方、且截掉的那些对象确实不是你在自己最优端里的对象时，截断才可能跳端。截掉真正想要的，结果是落空。Roth 等对历史名单的结论是：策略行为帮到你的机会远小于害到你。【事实】
:::

:::details 8. 「小例子的 0.67 序位差会在全国匹配里重演」
同一篇比较：新旧算法下不到千分之一的申请者结果不同。例题用来理解格，不用来估算政策效果。【事实】
:::

:::details 9. 「DA 对学生帕累托最优」
学校有自己的优先级时，学生提出的 DA 稳定且对学生策略防操纵，但仍可能存在让部分学生更好、无人更差、却破坏稳定的循环。效率与稳定在这里分离。【分析】
:::

:::details 10. 「有夫妻也能直接跑 Gale–Shapley」
只要夫妻的联合偏好不是「各自偏好的响应版本」，就可以构造出没有任何稳定匹配的市场（Klaus & Klijn 2005；Roth 1984 的更早反例）。存在性不是免费的。【事实】
:::

:::details 11. 「提议次数越多，匹配越好」
上界 n² 只证明停机。同质偏好构造里 n=3 提议 6 次，提出方均秩 2.00、接受方 1.00——次数中等，福利却全偏向不互相踩踏的那一侧。【事实】
:::

:::details 12. 「搜寻与匹配 = 把失业率代进这个算法」
DMP 与 Gale–Shapley 解决的是不同方程。本手册的杠杆是提出权与阻塞对，不是匹配函数弹性。【分析】
:::

<!-- nav:实践落地 -->
# 从抽象到现实

| 抽象 | 机制 | 现实操作 |
|---|---|---|
| 阻塞对 | 两人互偏好于现状 | 清算所是否会被场外协议拆掉 |
| 延迟接受 | 暂留最优、拒绝其余 | 住院医匹配、学生提出的择校 |
| 提出方最优 | 格的优端 | 规则里「谁提出」那一行 |
| 接受方截断 | 缩短可接受集 | 旧算法下「别把保底写太长」的民间传说 |
| 农村医院定理 | 空缺集合不变 | 偏远项目招不满时别先改算法 |
| 波士顿机制 | 第一志愿立刻锁死 | 家庭被迫把「进得去的」写成第一 |
| 策略防操纵 | 真序是占优策略 | 只有提出方被定理覆盖 |
| #P 完全 | 数清稳定解很难 | 不要承诺「列出全部稳定方案」 |

# 从理论到行动

1. 画两边名单，标出谁提出。没标就先别讨论公平。
2. 用手跑 DA 到停，记下提议次数和每人序位。
3. 换提出方再跑。若配对不变，告诉委托人「这个市场没有最优性争议」；若变了，把两端序位并排。
4. 对接受方做一次截断：删掉当前匹配及更差项之外的「策略性缩短」，看自己是否变好。变好，就说明你站在吃亏的一端。
5. 列出落空者，换端再看。落空者仍在，就去改偏好或配额。
6. 若有夫妻、平局、非响应优先级，把「定理不再原样成立」写进备忘录第一行。

# 技能树

:::details 主干 A · 能手跑
3 人完整偏好，两边各跑一遍 DA，阻塞对检查为 0。验收：男方提出配对 A–X、B–Y、C–Z，提议 5 次。
:::

:::details 主干 B · 能读格
指出两个稳定匹配，算出均秩 1.67 与 2.33，解释为何 C–Z 不动。
:::

:::details 主干 C · 能做激励
说清提出方为何不该撒谎；用 2×2 演示接受方截断（学生均秩 2.00 → 1.00）。
:::

:::details 主干 D · 能做比较静态
换 ρ 或换谁提出，判断「配对变了」还是「只是序位数字变了」。ρ=0.4 时本页市场稳定数变为 1。
:::

:::details 主干 E · 能翻译制度
把 NRMP 1998、波士顿机制、农村医院定理映射到「谁提出 / 是否稳定 / 空缺是否结构性」。
:::

:::details 主干 F · 能拒绝误用
夫妻、平局、学生帕累托、DMP 搜寻，四扇门都知道不该推。
:::

# 游戏化世界

把匹配想成一局只允许「暂定约会」的游戏：提出方每回合向名单上的下一个人发出邀请，接受方手里永远只留当前最好的那张邀请，其余撕掉。游戏结束时没有人手里捏着一张「我俩都更想在一起」的未使用邀请——这就是稳定。

你选边站。选提出方，结局是优端（经典局均秩 1.67），而且你没有动机虚报技能树。选接受方，你看着优端被拿走（均秩 2.33），唯一的非常规操作是缩短自己的可接受列表，有时能把整局拽到另一结局，也会把自己玩到无人邀请。农村医院是那个在两个结局里都空着的副本：换阵营开局也刷不出人。

# 任务系统

| 任务 | 产出 | 验收 |
|---|---|---|
| T1 手跑男方提出 | 5 步提议草稿 | 配对 A–X · B–Y · C–Z |
| T2 手跑女方提出 | 另一张草稿 | A–Y · B–X · C–Z，C–Z 仍在 |
| T3 均秩 | 两边各 3 个序位 | 1.67 对 2.33，差距按 2/3 记为 0.67 |
| T4 截断 | k=2 与 k=1 两行 | 学生均秩 2.00 → 1.00，提议 2 → 4 |
| T5 农村 | 两个稳定匹配 | 乡两次都空，城市对调 |
| T6 上界 | n=3 的三个数 | 上界 9，同质构造 6，穷举最大 7 |

# 反事实模拟

四个模型都参与计算：谁提出、共同质量 ρ、接受方截断、提议上界。序位越小越好。差距用未舍入均值再保留两位，所以 2.33 与 1.67 的差显示为 **0.67** 而不是 0.66。

:::tabs
@@模型1 谁提出
经典 3×3。默认男方提出：配对 A–X · B–Y · C–Z，提出方均秩 **1.67**，接受方 **2.33**，差距 **0.67**，提议 **5**，稳定匹配 **2** 个。拨到女方：配对变为 A–Y · B–X · C–Z，数字对调，C–Z 仍在。【事实】

:::raw
<div class="tool" id="tool-gs">
  <div class="ctrl">
    <label>谁提出 <output id="gs_sideO">男方</output></label>
    <input type="range" id="gs_side" min="0" max="1" step="1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">提出方均秩 <b id="gs_pAvg">1.67</b></div>
    <div class="ro">接受方均秩 <b id="gs_rAvg">2.33</b></div>
    <div class="ro">差距（未舍入） <b id="gs_gap">0.67</b></div>
    <div class="ro">提议次数 <b id="gs_nProp">5</b></div>
    <div class="ro">稳定匹配数 <b id="gs_nStab">2</b></div>
    <div class="ro">配对 <b id="gs_match">A–X · B–Y · C–Z</b></div>
    <div id="gs_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="gsChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型2 共同质量 ρ
私人偏好是上面的经典序，再混入「下标越大越受两边喜欢」的共同质量，权重 ρ（0–1，步长 0.1）。默认 ρ=0：与模型 1 相同，两侧最优**不同**，稳定数 2，差距 0.67。ρ=0.4：稳定数降为 **1**，两边均秩都是 **1.67**，提出权不再改变配对。ρ=1：唯一匹配，两边均秩 **2.00**，提议 6 次。【推论】

:::raw
<div class="tool" id="tool-rho">
  <div class="ctrl">
    <label>共同质量 ρ <output id="rhoO">0.0</output></label>
    <input type="range" id="rho" min="0" max="1" step="0.1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">提出方均秩 <b id="rho_pAvg">1.67</b></div>
    <div class="ro">接受方均秩 <b id="rho_rAvg">2.33</b></div>
    <div class="ro">差距 <b id="rho_gap">0.67</b></div>
    <div class="ro">稳定数 <b id="rho_nStab">2</b></div>
    <div class="ro">两侧最优 <b id="rho_same">不同</b></div>
    <div id="rho_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="rhoChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型3 接受方截断
医院甲偏好子 > 丑，医院乙偏好丑 > 子；子偏好乙 > 甲，丑偏好甲 > 乙。医院提出。默认名单长度 k=2（如实）：配对甲–子 · 乙–丑，学生均秩 **2.00**，医院均秩 **1.00**，提议 **2**。k=1（子只留下乙）：配对甲–丑 · 乙–子，学生 **1.00**，医院 **2.00**，提议 **4**。丑什么都没做，也一起变好——截断撬动的是整端，不是一个人的私房话。【事实】

:::raw
<div class="tool" id="tool-tr">
  <div class="ctrl">
    <label>子的名单长度 k <output id="tr_kO">2</output></label>
    <input type="range" id="tr_k" min="1" max="2" step="1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">学生均秩 <b id="tr_sAvg">2.00</b></div>
    <div class="ro">医院均秩 <b id="tr_hAvg">1.00</b></div>
    <div class="ro">提议次数 <b id="tr_prop">2</b></div>
    <div class="ro">配对 <b id="tr_match">甲–子 · 乙–丑</b></div>
    <div id="tr_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="trChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型4 提议次数上界
每对至多提议一次，硬上界 n²。同质构造：所有提出者偏好完全相同（0>1>…），接受者 j 最偏好提出者 j。提议次数为 n(n+1)/2，提出方均秩 (n+1)/2，接受方均秩恒为 1.00——互相踩踏的一侧吃亏。默认 n=3：上界 **9**，构造 **6**，穷举最大 **7**（n=2 穷举 16 个市场最大 3 次；n=3 穷举 46656 个市场最大 7 次），均秩 **2.00 / 1.00**。n>3 不再穷举。【事实】

:::raw
<div class="tool" id="tool-bd">
  <div class="ctrl">
    <label>市场规模 n <output id="bd_nO">3</output></label>
    <input type="range" id="bd_n" min="2" max="6" step="1" value="3"/>
  </div>
  <div class="readout">
    <div class="ro">上界 n² <b id="bd_bound">9</b></div>
    <div class="ro">同质构造 <b id="bd_real">6</b></div>
    <div class="ro">穷举最大 <b id="bd_brute">7</b></div>
    <div class="ro">提出/接受均秩 <b id="bd_pAvg">2.00</b> / <b id="bd_rAvg">1.00</b></div>
    <div id="bd_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="bdChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收动作 |
|---|---|---|
| L1 识骨 | 能定义阻塞对，能口述 DA 一步 | 用一句话说明暂定 ≠ 录取 |
| L2 算账 | 手跑经典 3×3 的两端 | 读数与页面默认 1.67 / 2.33 / 5 次一致 |
| L3 对照 | 会把截断、农村空缺、ρ 塌缩分开 | 指出哪次换端改变配对、哪次不改变 |
| L4 设计 | 能写一页「谁提出、为何、定理在哪失效」 | 同事可按备忘录复算 2×2 截断 |

# 30分钟最小实践

准备一张纸，不要开页面。

1. 写下 A/B/C 与 X/Y/Z 的偏好（见「系统运行机制」那张表）。
2. 男方提出：所有人先向第一志愿提议，女方只暂留更好的，被拒者下移。你应在第 5 次提议后得到 A–X、B–Y、C–Z。
3. 给每人打序位：男 1、1、3，女 2、2、3。均秩 5/3 与 7/3。
4. 女方提出，得到 A–Y、B–X、C–Z。确认 C 仍然配 Z。
5. 打开本页模型 1，默认读数应为提出方 1.67、接受方 2.33、差距 0.67、提议 5。对不上就重跑，不要改页面迁就。

成本接近 0。验收就是这四个数字。

# 7天计划

| 天 | 动作 | 完成标准 |
|---|---|---|
| 1 | 手跑经典 3×3 两端 | 与 T1–T3 一致 |
| 2 | 穷举 6 个完美匹配，划掉不稳定的 | 只剩 2 个 |
| 3 | 纸上做 2×2 截断 | 学生均秩 2→1，提议 2→4 |
| 4 | 写农村例的两行匹配 | 乡两次为空 |
| 5 | 读诺奖普及页：NRMP 为何改成申请者提出 | 能用自己的话讲 <0.1% |
| 6 | 拨 ρ 从 0 到 1，记下稳定数从 2 变 1 的位置 | 应在 0.4 |
| 7 | 用一段话向非专业的人解释「谁提出」 | 对方能复述「优端 / 最劣端」 |

# 30天计划

| 周 | 主题 | 产出 |
|---|---|---|
| 第 1 周 | 一人一对的 DA 与格 | 经典例手算无误 |
| 第 2 周 | 激励：占优策略与截断 | 2×2 能脱稿 |
| 第 3 周 | 多对一与农村医院定理 | 能陈述前提（严格、响应） |
| 第 4 周 | 制度三则：NRMP、波士顿、夫妻无解 | 一页备忘录，每则标明定理在哪失效 |

每天仍只加一个小例子，不收集新名词。第 4 周的验收是：给一个虚构招生办写 15 行建议，第一行是谁提出，最后一行是「哪些约束让存在性失效」。

# 10 个核心模型

| # | 模型 | 一句话 | 在本页的落点 |
|---|---|---|---|
| 1 | 阻塞对 | 稳定 = 不存在互偏好于现状的未配对手 | 两个经典匹配都要检查 |
| 2 | 延迟接受 | 暂留最优，拒绝其余，被拒者下移 | 提议 5 次走到男方最优 |
| 3 | 提出方最优 | 每个提出者都不差于任何其他稳定解 | 均秩 1.67 而非 2.33 |
| 4 | 接受方最劣 | 同一匹配的另一面 | 女方 2.33；换提出方才翻盘 |
| 5 | 稳定匹配格 | 两端即两侧最优，中间可有其他稳定解 | 本例只有两端；C–Z 是不动点 |
| 6 | 一侧策略防操纵 | 提出方说真话是占优策略 | 1998 年后对 NRMP 申请者成立 |
| 7 | 双边不可能 | 没有总稳定且两边都防操纵的机制 | Roth 1982 |
| 8 | 截断 | 接受方缩短名单，有时跳到自己的优端 | k=1 时学生均秩 1.00 |
| 9 | 农村医院 | 招不满者的名册在所有稳定解中相同 | 乡两次都空 |
| 10 | 停机上界 | 每对至多一次，≤ n²；n=3 穷举最大 7 | 模型 4 默认 9 / 6 / 7 |

随机严格偏好的有限样本（mulberry32 种子 20260920，每个 n 做 2000 个市场，男方提出）供量级感，不是定理：n=3 时提出方均秩 1.455、接受方 1.728、平均提议 4.37、两端不一致的市场占 27.2%；n=6 时为 1.945、2.617、11.67、60.1%。方向与「提出方远好于接受方、且 n 越大冲突越常见」一致，数字以这次种子为准。【推论】

# 关键问题清单

:::details 这个市场有几个稳定匹配？
若只有 1 个，提出权不改变配对，最优性争论可以结束。本页 ρ=0 有 2 个，ρ=0.4 起有 1 个。
:::

:::details 规则写的是谁提出？
没写，就还没选择格的哪一端。NRMP 1998 年写的是申请者。
:::

:::details 我正在给谁承诺「说真话」？
只应承诺给提出方。对接受方，这句话是错的。
:::

:::details 接受方截断会不会让他变好？
先跑如实再跑截断。2×2 默认从学生均秩 2.00 到 1.00；截错则可能落空。
:::

:::details 落空者换一端还在不在？
还在，就是结构性空缺。去看补贴和配额。
:::

:::details 有没有联合约束？
夫妻、捆绑志愿会让稳定集变空。先举反例，再谈算法。
:::

:::details 学校侧是偏好还是行政优先级？有没有大量平局？
有，则「策略防操纵」要按择校文献重述，不能照搬婚姻模型的严格序。
:::

:::details 委员会用的效果量是 3 人例题还是历史名单？
例题差距 0.67 个序位；NRMP 历史比较是 <0.1% 的人结果不同。两数都要报，不能只报好看的那个。
:::

:::details 提议次数被当成福利了吗？
次数只证明停机。福利看序位和落空，不看轮次。
:::

:::details 这是 Gale–Shapley 还是 DMP 搜寻？
若问题是失业率与空缺的流量，换手册。若问题是配对会不会被拆散、谁站在优端，留在这里。
:::

# 下一阶段探索

- **多对一与响应偏好**：把配额写进 DA，核对农村医院定理的前提是否一句不落。
- **平局与择校**：学生提出的 DA、最高优先循环（TTC）、效率调整的 DA（EADA）各自牺牲什么。
- **夫妻与存在性**：用一个 4 医院的小反例说服自己「稳定集可以是空的」。
- **大市场渐近**：Pittel 等人关于随机偏好下两侧序位约在 log n 与 n/log n 的结果，用来约束本页 2000 次模拟的解读，而不是替代它。
- **实施**：名单界面、建议文案、申诉规则。Rees-Jones 的 23% 提醒：定理成立之后，说明书仍会失败。

# 数据来源与标记约定 {.appendix}

标记：【事实】一手论文或本页穷举可复算；【分析】机制比较；【推论】有限样本模拟或由公式直接算出、但不是外部统计；【待验证】预印本或转述链。

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| DA 存在稳定匹配且对提出者最优 | 论文 | Gale & Shapley, AMM, 1962 | 【事实】 |
| 不能两边都策略防操纵；提出方可以 | 论文 | Roth, Math. Oper. Res., 1982；Dubins & Freedman, 1981 | 【事实】 |
| NRMP 与 DA 的关系；农村医院定理 | 论文 | Roth 1984；Roth, Econometrica, 1986 | 【事实】 |
| 1998 年改申请者提出；差异 <0.1% | 论文 | Roth, JAMA, 1997；Roth & Peranson, AER, 1999 | 【事实】 |
| 诺奖表述、1950 年代清算所、英国不稳定算法失败 | 机构 | Nobel Prize 2012 新闻稿与普及页 | 【事实】 |
| 纽约 2003、波士顿 2005–06、波士顿机制 | 论文 | Roth NBER w13225；Abdulkadiroğlu–Pathak–Roth–Sönmez | 【事实】 |
| 夫妻可使稳定集为空 | 论文 | Roth 1984；Klaus & Klijn 2005 | 【事实】 |
| 计数稳定匹配为 #P 完全 | 论文 | Irving & Leather, SIAM J. Comput., 1986 | 【事实】 |
| 谎报自述 83.33/5.38/0.36/10.93%（n=558）；实验 23%（n=1714） | 论文 | Rees-Jones；Rees-Jones & Skowronek 2018 | 【事实】 |
| 1.67/2.33/0.67、截断 2.00→1.00、穷举最大 3 与 7、乡医院两次为空 | 本页复算 | 见主题脚本与文中步骤 | 【事实】 |
| 种子 20260920 的 2000 次随机市场 | 模拟 | 本手册 mulberry32 | 【推论】 |
| 帕累托改进去不掉序位低效 | 预印本 | arXiv:2506.11660（2025） | 【待验证】 |

# 免责声明 {.appendix}

本手册是认知与演算框架，不是招生、招聘、医疗匹配或任何市场的操作建议，也不是投资建议。延迟接受的最优性依赖严格偏好、谁提出、以及没有破坏存在性的联合约束；正文里的 0.67 个序位是 3 人例题，NRMP 历史比较里两端差异小于 0.1% 的申请者，两者不可互换引用。截断示例用来暴露接受方的激励，不构成「缩短志愿表」的建议——截错会落空。农村医院定理说的是稳定解之间的不变性，不评价区域医疗政策。涉及真实名单、平局、夫妻与配额时，以原始规则和原始论文为准，用本页模型复核小例子，不要把滑块读数外推成全国效果。
