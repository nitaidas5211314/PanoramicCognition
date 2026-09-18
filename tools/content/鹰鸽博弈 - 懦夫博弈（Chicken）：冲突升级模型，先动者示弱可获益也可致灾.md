---
slug: 鹰鸽博弈 - 懦夫博弈（Chicken）：冲突升级模型，先动者示弱可获益也可致灾
title: 鹰鸽博弈 / 懦夫博弈（Chicken）：冲突升级模型
subtitle: 先动示弱可避灾也可被剥削——<strong>相互强硬不是均衡，却是最贵的事故通道</strong>；ESS 频率与混合纳什把「升级冲动」压回可计算的概率。
brand_sub: Hawk–Dove × Chicken × Conflict Escalation
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非政策建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 鹰鸽博弈, 懦夫博弈, Chicken, ESS, 冲突升级, 边缘政策, Maynard Smith]
theme_js_file: 鹰鸽博弈 - 懦夫博弈（Chicken）：冲突升级模型，先动者示弱可获益也可致灾.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**鹰鸽博弈（Hawk–Dove）** 与 **懦夫博弈（Chicken）** 是同一族**反协调博弈**：两人争夺资源或面子，强硬（鹰 / 直行）遇上强硬会两败俱伤；一方强硬、一方示弱时强硬方赢、示弱方丢面子但活着。经典结论：**相互强硬不是纳什均衡**——均衡是「一人硬、一人软」的两个纯策略 NE，或双方以概率 \(p^*=V/C\)（资源价值 / 冲突成本）选强硬的混合 NE；在演化博弈中，该混合策略也是 **ESS**。【事实】

默认教学参数：资源 \(V=50\)、冲突成本 \(C=100\) → 鹰频率 \(p^*=0.50\)，均衡期望支付 **12.5**（全鸽分享得 25，全鹰互伤得 −25）；鹰–鹰相遇率 \(p^{*2}=0.25\)。【事实】

与囚徒困境的锋利分野：PD 里「相互背叛」是唯一 NE；Chicken 里「相互冲撞」是最差结果却**不是** NE——真正危险的是**信念错位与承诺装置**把双方同时推向强硬。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「谁更勇敢」，而是：**当相互升级代价极高时，理性（或演化）如何分配强硬与示弱，以及先动示弱何时避灾、何时被剥削**。

边界：

- **在界内**：2×2 Hawk–Dove / Chicken 支付、混合 NE / ESS、\(p^*=V/C\)、复制子动力学、承诺（扔方向盘）、边缘政策同构、与 PD / 协调博弈的判定。
- **在界外**：具体作战计划、某次谈判话术脚本——除非压成「\(V,C\) / 信念 \(q\) / 承诺是否可信」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 高代价冲突下强硬与示弱的均衡分配 |
| 2 | 边界在哪 | 到支付矩阵 + 信念/演化规则可形式化为止 |
| 3 | 核心对象 | \(V,C\)、鹰/鸽或直行/转弯、混合 \(p^*\)、ESS、承诺 |
| 4 | 参与者 | 动物个体、谈判方、国家、司机、算法 agent |
| 5 | 关键变量 | \(V/C\)、对方强硬信念 \(q\)、承诺强度、信息噪声 |
| 6 | 可直接观察 | 封锁、最后通牒、公开时限、动员、肢体冲突 |
| 7 | 无法直接观察 | 真实 \(C\)、决心、对事故概率的主观判断 |
| 8 | 谁影响谁 | \(V,C\) → \(p^*\)；信念 \(q\) → 最优反应；承诺 → 对方被迫示弱 |
| 9 | 因果关系 | \(C>V\) ⇒ 混合 ESS；\(V\ge C\) ⇒ 纯鹰 ESS |
| 10 | 只是相关 | 「姿态强硬」相关于危机结果，≠ 已进入正确博弈类【分析】 |
| 11 | 表层现象 | 对峙、边缘试探、面子战、价格战互不相让 |
| 12 | 底层机制 | 反协调：最好是对方软你硬；最差是双硬 |
| 13 | 有反馈吗 | 有。声誉、报复、种群频率都反馈 |
| 14 | 有延迟吗 | 有。信号解读与升级阶梯有时滞 |
| 15 | 正/负反馈 | 误判可正反馈撞车；热线/降级阶梯可负反馈 |

## 最关键的一句话

> Chicken 问的不是「你敢不敢硬」，而是：**在对方也可能硬的世界里，你的最优强硬概率该是多少——以及你有没有把方向盘扔出窗外。**

# 为什么值得研究

:::cards g3
### 它是冲突升级的最小模型
用两个参数 \(V,C\) 就把「何时该硬、何时该软」压成可算的频率与临界信念。【事实】

### 它连接生物演化与人类危机
Maynard Smith & Price（1973）的动物冲突逻辑，与 Schelling 的边缘政策、古巴危机叙事同构。【分析】

### 它纠正对「示弱」的道德化
先动示弱可以是理性避灾；也可以是被承诺装置剥削。关键是结构，不是勇气标签。【推论】
:::

:::note amber 最贵的一次误判
把 Chicken 当成 PD：以为「双硬」是稳定均衡而「必须更硬才能赢」。其实双硬不稳定——真正把双方锁死在冲撞上的，是错误信念、不可撤销承诺，或把博弈改写成了别的结构。【分析】
:::

# 世界地图

九层看鹰鸽/Chicken 如何从支付格长成冲突操作系统。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="hdL9" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 战略稳定 · 军控 / 热线 / 事故通道治理</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 边缘政策 · Schelling：留给机会的威胁</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 承诺装置 · 扔方向盘 / 烧桥 / 公开绑定受众</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 不完全信息 · 对方决心未知 → 信念 q 驱动</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 演化动态 · 复制子：ṗ ∝ p(1−p)(V−pC)</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 ESS · C&gt;V 时 p*=V/C；V≥C 时纯鹰</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 混合 NE · 两纯 NE + 一对称混合</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 反协调结构 · 最好你硬他软；最差双硬</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 支付原语 · HH=(V−C)/2，HD=V，DH=0，DD=V/2</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1→L4**：先会写矩阵、算 \(p^*=V/C\)；进阶卡在 **L6→L8**：信念与承诺如何把「理论上不稳定的双硬」变成现实灾难。【分析】
:::

# 核心概念地图

从抽象定义到三层操作。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="hdCmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="hdCmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="120" y="16" width="440" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">V,C → p* / 信念 q → 硬或软 / 承诺改博弈</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">反协调 · ESS</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">p*=V/C · 无差异</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">估 V/C · 控承诺</text>

  <line x1="300" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#hdCmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdCmA)"/>
  <line x1="380" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#hdCmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">资源价值 V</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">冲突成本 C</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">混合频率 p*</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">撞车率 p*²</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">示弱时机</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">扔方向盘风险</text>

  <path d="M130 250 V300 H340" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#hdCmB)"/>
  <text x="200" y="290" fill="#d5342c" font-size="11" font-family="sans-serif">反馈：双硬事故抬高主观 C</text>

  <rect x="100" y="320" width="480" height="40" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="340" y="345" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">跨域同构：动物争斗 · 核危机 · 谈判最后通牒 · 价格死磕</text>
</svg>
:::

# 核心参与者

| 角色 | 动机 | 在系统中的作用 |
|---|---|---|
| 鹰 / 直行者 | 独占资源或面子 | 抬高冲突频率；对鸽剥削 |
| 鸽 / 转弯者 | 避伤、保留基线支付 | 降低撞车率；可能被剥削 |
| 承诺装置 | 删除己方软化选项 | 迫使对方进入「你硬我软」纯 NE |
| 旁观者 / 受众 | 声誉赏罚 | 改变有效 \(V\)（面子）与 \(C\)（公开失败成本） |
| 演化种群 | 频率依赖选择 | 把个体策略推到 ESS 附近 |

# 核心变量

| 变量 | 含义 | 杠杆方向 |
|---|---|---|
| \(V\) | 资源/胜利价值 | ↑ → \(p^*\)↑，更易强硬 |
| \(C\) | 双硬时的伤害成本 | ↑ → \(p^*\)↓，冲突减少 |
| \(p^*\) | ESS/混合 NE 强硬概率 | \(C>V\) 时 \(=V/C\) |
| \(q\) | 你对对方强硬的信念 | \(q>q^*\) 则应示弱 |
| \(p^{*2}\) | 随机配对下的撞车率 | 衡量系统事故负荷 |
| 承诺强度 | 无法软化的程度 | 把博弈推向不对称纯 NE |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="hdCa" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="hdCb" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="120" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="58" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">V, C</text>
  <rect x="180" y="30" width="120" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="58" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">p*=V/C</text>
  <rect x="340" y="30" width="140" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="410" y="58" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">强硬频率</text>
  <rect x="520" y="30" width="140" height="48" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="590" y="58" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">撞车率 p²</text>

  <line x1="140" y1="54" x2="180" y2="54" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdCa)"/>
  <line x1="300" y1="54" x2="340" y2="54" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdCa)"/>
  <line x1="480" y1="54" x2="520" y2="54" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdCa)"/>

  <rect x="20" y="130" width="160" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="100" y="158" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">信念 q vs q*</text>
  <rect x="220" y="130" width="160" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="300" y="158" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">硬 / 软最优反应</text>
  <rect x="420" y="130" width="220" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="530" y="158" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">不对称纯 NE 或混合</text>

  <line x1="180" y1="154" x2="220" y2="154" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdCa)"/>
  <line x1="380" y1="154" x2="420" y2="154" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdCa)"/>

  <path d="M590 78 V110 H100 V130" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#hdCb)"/>
  <text x="320" y="105" fill="#d5342c" font-size="11" font-family="sans-serif">事故抬升主观 C → 下一轮 p* 下降（负反馈）</text>

  <rect x="80" y="220" width="520" height="56" rx="8" fill="#15181d"/><text x="340" y="242" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">承诺装置：删除「软」→ 对方若理性必软；双方同时承诺 → 灾难通道打开</text>
  <text x="340" y="262" text-anchor="middle" fill="#a8b0ba" font-size="11" font-family="sans-serif">红色虚线 = 反馈；实线 = 因果主链</text>
</svg>
:::

因果主链：\(C>V\) ⇒ 无纯策略 ESS ⇒ 混合 \(p^*=V/C\) ⇒ 期望冲突以 \(p^{*2}\) 发生。旁链：若你相信对方强硬概率 \(q>q^*\)，最优反应是示弱——先动示弱可避灾。【事实】

# 隐藏关系

- **示弱 ≠ 弱者**：在 \(q\) 高时示弱是最优反应；在对方已承诺时示弱是被迫理性。【分析】
- **提高 \(C\) 比道德劝说更有效**：冲突成本上升直接压低 \(p^*\) 与撞车率（\(V=50,C:100→200\) 时 \(p^*:0.50→0.25\)，撞车率 \(0.25→0.0625\)）。【事实】
- **Chicken 与 Hawk–Dove 数学同构、叙事不同**：生物侧强调频率依赖与 ESS；政治侧强调面子、承诺与边缘。【事实】
- **与雪堆博弈（Snowdrift）常被并列**：合作成本分摊的叙事不同，但 2×2 反协调骨架相近。【待验证】

# 系统运行机制

1. **支付生成**：资源 \(V\)、互伤 \(C\) 写入 2×2。  
2. **均衡筛选**：\(C>V\) 时两纯 NE + 混合；\(V\ge C\) 时纯鹰。  
3. **信念层**：一次性人类博弈靠 \(q\)；演化靠种群频率。  
4. **承诺层**：单方扔方向盘 → 逼出不对称纯 NE；双方扔 → 高概率灾难。  
5. **反馈层**：事故抬高主观 \(C\) 或制度惩罚 → 下一轮 \(p^*\) 下降。

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="hdT" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="2"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">t0 全鸽</text>
  <text x="80" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">可被鹰入侵</text>
  <circle cx="220" cy="110" r="10" fill="#1d4ed8"/><text x="220" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">t1 鹰上升</text>
  <text x="220" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">剥削鸽群</text>
  <circle cx="360" cy="110" r="10" fill="#b8730a"/><text x="360" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">t2 近 p*</text>
  <text x="360" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">无差异</text>
  <circle cx="500" cy="110" r="10" fill="#d5342c"/><text x="500" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">t3 超调</text>
  <text x="500" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">互伤过多</text>
  <circle cx="620" cy="110" r="10" fill="#0f8a4d"/><text x="620" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">t∞ ESS</text>
  <text x="620" y="156" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">p*=V/C</text>
  <path d="M90 110 H210" fill="none" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdT)"/>
  <path d="M230 110 H350" fill="none" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdT)"/>
  <path d="M370 110 H490" fill="none" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdT)"/>
  <path d="M510 110 H610" fill="none" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdT)"/>
  <text x="340" y="40" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">复制子：鹰过多 → 期望低于鸽 → 频率回落</text>
  <text x="340" y="58" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">E(H)−E(D) ∝ (V−pC)；符号决定涨跌</text>
</svg>
:::

人类危机时间线更短：对峙 → 信号试探 → 承诺/边缘 → 一方示弱或事故。古巴导弹危机常被当作动态 Chicken / 消耗战叙事（量化风险估计多为【待验证】）。【分析】

# 利益与激励

| 主体 | 想要什么 | 扭曲风险 |
|---|---|---|
| 强硬派受众 | 面子与威慑声誉 | 抬高有效 \(V\)，逼领导人承诺 |
| 规避灾难派 | 压低撞车概率 | 被对手读成软弱可欺 |
| 第三方调停 | 提高双方主观 \(C\) | 可能同时抬高 \(V\)（象征价值） |
| 演化个体 | 相对适应度 | 短期互伤仍可被频率选择稳定 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="hdFl" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="40" y="30" width="140" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">资源池 V</text>
  <rect x="270" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">对峙场</text>
  <rect x="500" y="30" width="140" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="570" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">伤害池 C</text>

  <line x1="180" y1="55" x2="270" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#hdFl)"/>
  <line x1="410" y1="55" x2="500" y2="55" stroke="#d5342c" stroke-width="1.5" marker-end="url(#hdFl)"/>

  <rect x="100" y="120" width="200" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="200" y="147" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">信号：动员 / 时限 / 姿态</text>
  <rect x="380" y="120" width="200" height="44" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="480" y="147" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">信息：热线 / 核查 / 保证</text>

  <rect x="140" y="190" width="400" height="44" rx="8" fill="#15181d"/><text x="340" y="217" text-anchor="middle" fill="#fff" font-size="12" font-family="sans-serif">抽水路径：双硬把价值从「可分配的 V」抽进「沉没的 C」</text>
</svg>
:::

信息流决定信念 \(q\)；资源流决定谁拿走 \(V\)；伤害流在双硬时把福利抽进废墟。【分析】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 |
|---|---|---|
| 1 | 诚实估计 \(V/C\) | 直接决定 \(p^*\) 与是否该硬 |
| 2 | 抬高双方主观 \(C\) | 制度/核查/军控压冲突频率 |
| 3 | 校准信念 \(q\) | 避免「以为对方会软」的对称硬 |
| 4 | 单方承诺的剂量 | 可逼对方软，过量则互锁 |
| 5 | 给对方「软得有面子」的下台阶 | 降低对方示弱的声誉成本 |
| 6 | 切断事故通道 | 减少 Schelling 式「留给机会」的失控 |
| 7 | 受众管理 | 防止国内政治把 \(V\) 虚高 |
| 8 | 重复互动阴影 | 把一次性 Chicken 嵌进关系 |
| 9 | 第三方担保 | 改变支付或提供保证 |
| 10 | 明确博弈类型 | 先排除误用 PD/协调标签 |

# 常见认知陷阱

:::details 1. 把 Chicken 当成囚徒困境
PD：双背叛是唯一 NE。Chicken：双硬最差但不是 NE。对策错了会「为稳定均衡而加码强硬」。
:::

:::details 2. 「示弱=永远吃亏」
仅当对方会软时，强硬才优；\(q>q^*\) 时应软。默认经典参数 \(q^*=0.50\)。
:::

:::details 3. 崇拜「扔方向盘」
单方承诺有力；双方同时承诺是灾难配方。边缘政策成功时风险不兑现——幸存者偏差巨大。【分析】
:::

:::details 4. 忽略 \(V\ge C\) 的纯鹰区
资源极贵或伤害被低估时，全强硬是 ESS——「和平混合」假设崩塌。
:::

:::details 5. 用故事代替支付
「像古巴」≠ 已标定 \(V,C,q\)。无数字的类比是修辞。【分析】
:::

:::details 6. 混淆 ESS 与福利最优
ESS 期望支付常低于全鸽分享（默认 12.5 vs 25）——演化稳定 ≠ 集体最优。【事实】
:::

:::details 7. 以为混合策略要「掷硬币表演」
混合 NE 是无差异条件；现实中可由多态种群或私有化随机化实现。
:::

:::details 8. 把撞车率当成「对方坏」
对称混合下撞车率 \(p^{*2}\) 是结构产物，不是单方道德失败。
:::

:::details 9. 忽视受众抬高的面子 V
公开羞辱对手等于抬高对方 \(V\)，可能抬高其强硬概率。
:::

:::details 10. 线性外推历史危机
动态 Chicken / 消耗战模型对古巴危机的风险数值高度依赖假设，宜标【待验证】。【待验证】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象 | 机制 | 操作 |
|---|---|---|
| \(V\) | 胜利价值 | 列出「赢了多得什么」 |
| \(C\) | 双硬伤害 | 列出「都硬会毁什么」 |
| \(p^*=V/C\) | 强硬频率 | 算该硬的先验比例 |
| \(q\) | 对方强硬信念 | 写三档：低/中/高 |
| 承诺 | 删软选项 | 检查是否已烧桥 |
| 下台阶 | 降对方示弱成本 | 设计可宣称的「胜利叙事」 |

# 从理论到行动

1. **判定博弈类**：是否反协调（双硬最差、一硬一软最好）？  
2. **估 \(V,C\)**：量级对即可；算 \(p^*\) 与撞车率。  
3. **估 \(q\)**：若 \(q>q^*\)，准备有面子的示弱路径。  
4. **管承诺**：能逼对方软的最小承诺；禁止对称扔盘。  
5. **抬 \(C\) / 降虚高 \(V\)**：制度、核查、冷处理受众情绪。

# 技能树

:::details ① 入门：会画矩阵
默写 HH/HD/DH/DD，指出两个纯 NE 与混合。
:::

:::details ② 熟练：会算 p* 与撞车率
给定 \(V,C\)，30 秒内给出 \(p^*\)、\(p^{*2}\)、ESS 支付。
:::

:::details ③ 进阶：信念阈值
用 \(q^*=W/(L+W-S)\)（Chicken 标定）判断硬/软。
:::

:::details ④ 专家：案例分流
对新闻写出「Chicken / PD / 协调」对照表与可检验差异。
:::

# 游戏化世界

你是「冲突降噪员」：每张对峙图先标 \(V,C\)，再选关卡——「频率关」（把 \(p^*\) 压下去）或「信念关」（校准 \(q\)）。双硬撞车扣大分；成功给对方下台阶加分。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| T1 默写支付 | 写出默认 \(V=50,C=100\) 矩阵四格 |
| T2 算 ESS | \(p^*=0.50\)，支付 12.5，撞车 0.25 |
| T3 改 C | \(C=200\) 时 \(p^*=0.25\)，撞车 0.0625 |
| T4 信念阈值 | 经典 Chicken \(q^*=0.50\)；商务例 \(L=100,W=40,S=10\) → \(q^*\approx0.308\) |
| T5 案例分流 | 自选一则对峙新闻，判定博弈类 |

# 反事实模拟

:::tabs
@@若把 C 翻倍
\(V=50,C:100→200\)：\(p^*:0.50→0.25\)，ESS 支付 \(12.5→18.75\)，撞车率 \(0.25→0.0625\)。抬高冲突成本既降频率又提高均衡福利。【事实】

@@若 V≥C
\(V=120,C=100\)：纯鹰 ESS，期望支付 \((V-C)/2=10\)。资源极贵或伤害被低估时，「和平混合」消失。【事实】

@@若双方都扔方向盘
对称承诺删除「软」→ 只剩双硬通道；理论 Chicken 的「双硬非均衡」被装置改写为几乎必然灾难。【分析】

@@若只给对方下台阶
降低对方示弱的声誉成本 ≈ 降低其有效 \(V\) 或提高其软的支付 → 更容易落入「你硬他软」的安全纯 NE。【推论】
:::

## 可调模型 1 · 鹰鸽 ESS：V、C → p* / 支付 / 撞车率

默认 \(V=50,C=100\)：混合 ESS，\(p^*=0.50\)，期望支付 **12.5**，鹰–鹰相遇率 **0.25**。全鸽分享得 25；全鹰互伤得 −25。

:::raw
<div class="tool" id="tool_hd">
  <div class="ctrl">
    <label>资源价值 V <output id="hd_vO">50</output></label>
    <input type="range" id="hd_v" min="5" max="150" step="1" value="50"/>
    <label>冲突成本 C <output id="hd_cO">100</output></label>
    <input type="range" id="hd_c" min="10" max="250" step="1" value="100"/>
  </div>
  <div class="readout">
    <div class="ro">体制<strong id="hd_reg">混合 ESS</strong></div>
    <div class="ro">p* 鹰<strong id="hd_p">0.50</strong></div>
    <div class="ro">ESS 支付<strong id="hd_pay">12.5</strong></div>
    <div class="ro">撞车率 p²<strong id="hd_crash">0.25</strong></div>
    <div id="hd_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="hd_vh">C&gt;V → p*=V/C=0.50；期望支付 12.5；相对全鸽 25 损失 12.5（演化稳定≠集体最优）</span></div>
  </div>
  <canvas id="hdChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · Chicken 混合：撞车损失 L、胜利 W、示弱羞耻 S

支付约定：双直行 −L；你直行对方转弯得 +W、对方 −S；双方转弯 0。混合 NE：直行概率 \(p^*=W/(L+W-S)\)。默认 \(L=2,W=1,S=1\) → \(p^*=0.50\)，撞车概率 **0.25**。

:::raw
<div class="tool" id="tool_ck">
  <div class="ctrl">
    <label>双硬损失 L <output id="ck_lO">2.0</output></label>
    <input type="range" id="ck_l" min="1" max="50" step="0.5" value="2"/>
    <label>单方胜利 W <output id="ck_wO">1.0</output></label>
    <input type="range" id="ck_w" min="0.5" max="20" step="0.5" value="1"/>
    <label>示弱羞耻 S <output id="ck_sO">1.0</output></label>
    <input type="range" id="ck_s" min="0" max="20" step="0.5" value="1"/>
  </div>
  <div class="readout">
    <div class="ro">p* 直行<strong id="ck_p">0.50</strong></div>
    <div class="ro">撞车 p²<strong id="ck_cr">0.25</strong></div>
    <div class="ro">期望支付<strong id="ck_eu">-0.50</strong></div>
    <div id="ck_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ck_vh">p*=W/(L+W−S)=0.50；独立混合下撞车率 0.25；均衡期望 −0.50</span></div>
  </div>
  <canvas id="ckChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 信念阈值：对方强硬概率 q 决定你该硬还是软

对方以概率 \(q\) 直行时：\(E(\text{直行})= -q L+(1-q)W\)，\(E(\text{转弯})= -q S\)。当 \(q>q^*=W/(L+W-S)\) 时应转弯。默认经典参数 \(q^*=0.50\)；拖动你的信念看最优反应翻转。

:::raw
<div class="tool" id="tool_bel">
  <div class="ctrl">
    <label>信念 q（对方直行） <output id="bl_qO">0.40</output></label>
    <input type="range" id="bl_q" min="0" max="1" step="0.01" value="0.40"/>
    <label>L <output id="bl_lO">2.0</output></label>
    <input type="range" id="bl_l" min="1" max="50" step="0.5" value="2"/>
    <label>W <output id="bl_wO">1.0</output></label>
    <input type="range" id="bl_w" min="0.5" max="20" step="0.5" value="1"/>
    <label>S <output id="bl_sO">1.0</output></label>
    <input type="range" id="bl_s" min="0" max="20" step="0.5" value="1"/>
  </div>
  <div class="readout">
    <div class="ro">阈值 q*<strong id="bl_star">0.50</strong></div>
    <div class="ro">E(直行)<strong id="bl_es">-0.20</strong></div>
    <div class="ro">E(转弯)<strong id="bl_ew">-0.40</strong></div>
    <div class="ro">最优<strong id="bl_br">直行</strong></div>
    <div id="bl_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="bl_vh">q=0.40 &lt; q*=0.50 → E(直行)=-0.20 &gt; E(转弯)=-0.40 → 最优直行</span></div>
  </div>
  <canvas id="blChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 承诺剂量：单方烧桥的期望值

你以强度 \(\alpha\)「扔方向盘」（对方相信你无法转弯的概率）。对方若理性：在 \(\alpha\) 高时选择转弯，你期望约 \((1-\varepsilon)W-\varepsilon L\)（\(\varepsilon\) 为对方也已承诺的概率）。默认 \(W=10,L=100,\varepsilon=0.05,\alpha=0.90\)：有效 EV≈**4.0**（\(\alpha\cdot[(1-\varepsilon)W-\varepsilon L]+(1-\alpha)\cdot(-W^2/L)\)）；若 \(\varepsilon\) 升到 0.30，有效 EV≈**−20.8**——对称承诺迅速变负。混合对照（取 \(S=W\)）为 **−1.0**。【推论】

:::raw
<div class="tool" id="tool_cm">
  <div class="ctrl">
    <label>承诺可信度 α <output id="cm_aO">0.90</output></label>
    <input type="range" id="cm_a" min="0" max="1" step="0.01" value="0.90"/>
    <label>对方也承诺 ε <output id="cm_eO">0.05</output></label>
    <input type="range" id="cm_e" min="0" max="0.80" step="0.01" value="0.05"/>
    <label>胜利 W <output id="cm_wO">10</output></label>
    <input type="range" id="cm_w" min="1" max="50" step="1" value="10"/>
    <label>灾难 L <output id="cm_lO">100</output></label>
    <input type="range" id="cm_l" min="10" max="500" step="5" value="100"/>
  </div>
  <div class="readout">
    <div class="ro">承诺 EV<strong id="cm_ev">4.0</strong></div>
    <div class="ro">混合对照<strong id="cm_mix">-1.0</strong></div>
    <div class="ro">是否划算<strong id="cm_ok">是</strong></div>
    <div id="cm_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="cm_vh">α=0.90、ε=0.05：有效 EV≈4.0 &gt; 混合对照 −1.0 → 单方承诺划算；抬高 ε 会翻转</span></div>
  </div>
  <canvas id="cmChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 | 识别 Chicken / HD 与 PD 差异 | 指出双硬是否为 NE |
| L2 | 手算 \(p^*\)、撞车率、ESS 支付 | 与滑块一致 |
| L3 | 信念阈值与承诺剂量 | 说出何时该软、何时不该扔盘 |
| L4 | 现实案例建模批评 | 写出替代博弈类与证据 |

# 30分钟最小实践

1. 纸上写出 \(V=50,C=100\) 支付矩阵，标两个纯 NE 与混合 \(p^*=0.5\)（8 分钟）。  
2. 手算 \(C=200\) 时 \(p^*=0.25\)、撞车 \(0.0625\)、支付 18.75，用模型 1 核对（8 分钟）。  
3. 模型 3：把 \(q\) 从 0.40 拖到 0.60，记录最优反应翻转点是否在 0.50（7 分钟）。  
4. 选一件身边「互不相让」的事，用一句话判定是 Chicken 还是 PD（7 分钟）。  

产出：一张手算矩阵 + 一句案例判定——成本接近 0，可验证。

# 7天计划

| 天 | 焦点 | 交付 |
|---|---|---|
| D1 | 矩阵与 NE | 自造 1 个 Chicken 矩阵 |
| D2 | ESS 公式 | 5 组 (V,C) 表 |
| D3 | 与 PD 对照 | 半页差异清单 |
| D4 | 信念阈值 | 3 个 q 场景 |
| D5 | 承诺陷阱 | 描述对称扔盘风险 |
| D6 | 现实案例 | 1 则新闻建模 |
| D7 | 复盘 | 技能树自测 |

# 30天计划

| 周 | 主题 | 成果 |
|---|---|---|
| W1 | 静态 HD/Chicken 熟练 | 10 个矩阵速判 |
| W2 | 演化与复制子直觉 | 手绘 p 轨迹草图 |
| W3 | 信念与承诺 | 边缘政策对照卡 |
| W4 | 应用与批评 | 谈判/价格战/外交各一页 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | Hawk–Dove 支付 | HH=(V−C)/2，HD=V，DH=0，DD=V/2 |
| 2 | 混合 ESS | \(C>V\) 时 \(p^*=V/C\) |
| 3 | 纯鹰 ESS | \(V\ge C\) 时全强硬 |
| 4 | Chicken 混合 | \(p^*=W/(L+W-S)\)，撞车 \(p^{*2}\) |
| 5 | 两纯 NE | (硬,软) 与 (软,硬) |
| 6 | 信念阈值 | \(q>q^*\) ⇒ 示弱最优 |
| 7 | 复制子动态 | \(\dot p \propto p(1-p)(V-pC)\) |
| 8 | 承诺装置 | 单方扔盘逼软；双方扔盘致灾 |
| 9 | 边缘政策同构 | 共享失控风险 ≈ 动态 Chicken |
| 10 | 与 PD 分流 | 双硬是否为 NE 是第一刀 |

# 关键问题清单

:::details Q1 我面对的是 Chicken 还是 PD？
看双硬（双背叛）是不是均衡：是 → 偏 PD；不是且一硬一软最好 → 偏 Chicken。
:::

:::details Q2 现在该示弱吗？
估 \(q\) 与 \(q^*\)；\(q>q^*\) 且能保留面子时，先动示弱是理性避灾。
:::

:::details Q3 如何压低冲突频率？
优先抬高真实/主观 \(C\)（伤害、制裁、核查），其次降低虚高面子 \(V\)。
:::

:::details Q4 能不能扔方向盘？
仅当对方尚未对称承诺、且你估 \(\varepsilon\) 足够低；否则 EV 快速变负。
:::

:::details Q5 ESS 支付为何低于全鸽？
频率依赖稳定的是不可入侵性，不是社会剩余最大化；默认缺口 12.5 vs 25。
:::

:::details Q6 混合策略要公开随机吗？
理论要求无差异；实践可用多态、私钥随机或行为噪声近似。
:::

:::details Q7 为何「加码强硬」常失败？
若对方同步加码，你在推高 \(p^{*2}\)；若已进入纯鹰区，没有「再硬一点就均衡」的空间。
:::

:::details Q8 和边缘政策什么关系？
边缘政策是动态/概率化的 Chicken：用共享失控风险代替确定性互毁威胁。【分析】
:::

:::details Q9 商务谈判怎么用？
把「谈崩损失 L、多要到的条款 W、示弱面子 S」标定后算 \(p^*\)；给对方下台阶往往比互扔最后通牒便宜。
:::

:::details Q10 数字不可信怎么办？
先做量级与不等式（\(C>V\)？），再做点估计；二手危机概率一律【待验证】。
:::

# 下一阶段探索

- 深入：Maynard Smith《演化与博弈论》；War of Attrition；非对称 Hawk–Dove（资源持有者效应）。  
- 并列手册：威慑与边缘政策、可信承诺、囚徒困境、协调与谢林点。  
- 批评线：把国际危机过度 Chicken 化的史学争议；实验博弈中人是否真按混合 NE 行动。【分析】

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| Hawk–Dove 支付与 ESS \(p^*=V/C\) | 经典文献 | Maynard Smith & Price (1973) *Nature*；Maynard Smith 教材章节 | 【事实】 |
| ESS 定义与 \(C>V\) 混合 / \(V>C\) 纯鹰 | 教材/讲义 | Cannings 演化冲突讲义；UMD ESS 讲义 | 【事实】 |
| Chicken 与 Hawk–Dove 同构表述 | 百科/综述 | 中英文维基「胆小鬼博弈 / Chicken (game)」 | 【事实】 |
| 边缘政策「留给机会的威胁」 | 一手文献 | Schelling (1959/1960) RAND 手稿与《冲突的战略》 | 【事实】 |
| 古巴危机作动态 Chicken 的数值风险 | 个案模型 | Duke/McAdams 等工作论文式重建 | 【待验证】 |
| 本手册默认数值（V=50,C=100 等） | 教学标定 | 自洽手算 + 可调模型 | 【事实】 |
| 承诺 EV 近似 (1−ε)W−εL | 简化推论 | 用于剂量直觉，非完整贝叶斯危机模型 | 【推论】 |

标记约定：【事实】多方一致或可复算；【分析】权威框架下的判断；【推论】由模型推出；【假设】未验证；【待验证】单一来源或转载链长。

# 免责声明 {.appendix}

本手册是认知与决策框架教程，**不是**外交、军事、法律或投资建议。国际危机与商业冲突的真实支付、信息与约束远比 2×2 矩阵复杂；任何把历史类比直接当作行动指令的做法都超出本文范围。读者须自行承担应用风险。
