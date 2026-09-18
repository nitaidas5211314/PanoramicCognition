---
slug: 消耗战（War of Attrition）：双方持续付出成本直至一方退出，沉没成本诱发非理性坚持
title: 消耗战（War of Attrition）
subtitle: 双方持续付出成本直至一方退出——均衡上<strong>没有纯坚持时长</strong>，唯一混合 ESS 是负指数分布；期望支付归零，沉没成本在理性续战决策里<strong>不该出现</strong>，却在现实里诱发非理性坚持。
brand_sub: War of Attrition × ESS × Sunk Cost
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 消耗战, War of Attrition, ESS, 沉没成本, 全支付拍卖, Maynard Smith]
theme_js_file: 消耗战（War of Attrition）：双方持续付出成本直至一方退出，沉没成本诱发非理性坚持.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**消耗战（War of Attrition）**：两个对手各自选定「最多愿意坚持到多贵」；谁先退出谁输，双方都支付**已经发生的成本**（等于较短那一方的坚持成本），胜者再拿走资源价值 \(V\)。【事实】

Maynard Smith（1974）证明：任何固定坚持成本 \(m\) 都不是 ESS——略长一点的突变体能入侵；唯一混合 ESS 是负指数密度 \(p(x)=(1/V)e^{-x/V}\)。在此 ESS 上，计划坚持的期望 \(E[X]=V\)，对局实际持续时间 \(E[\min(X_1,X_2)]=V/2\)，**每个参与人期望支付恰好为 0**（租金完全耗散）。【事实】

默认教学参数 \(V=10\)：\(P(X>5)=e^{-0.5}\approx0.6065\)，\(P(\text{对局}>5)=e^{-1}\approx0.3679\)，中位数坚持 \(V\ln2\approx6.93\)。理性续战只看「对手下一刻退出的危险率 × \(V\)」是否覆盖瞬时成本——**已花掉的钱不进公式**；沉没成本谬误正是把已付成本塞回决策。【事实】【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「谁更狠」，而是：**在持续支付流成本的僵持里，什么坚持规则不可被入侵，以及人为什么会在租金已耗尽后还加码**。

边界：

- **在界内**：对称消耗战 ESS、负指数无记忆、租金耗散、非对称角色（所有者/入侵者）、与全支付拍卖的对照、企业退出战、诉讼/军备僵持、沉没成本与承诺升级。
- **在界外**：具体物种打斗解剖学、某场商业并购的胜负预测、需要多阶段谈判细节的鲁宾斯坦议价——除非压成「坚持成本 vs 奖品」的消耗结构。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 僵持中退出时机的策略与演化稳定分布 |
| 2 | 边界在哪 | 到支付 = \(V\) − 较短坚持成本 可形式化为止 |
| 3 | 核心对象 | 坚持成本 \(x\)、资源 \(V\)、ESS 密度、危险率、租金耗散 |
| 4 | 参与者 | 动物个体、企业、诉讼当事人、游说者、谈判双方 |
| 5 | 关键变量 | \(V\)、成本流率 \(c\)、信息不对称、角色不对称、退出期权 |
| 6 | 可直接观察 | 对局时长、累计花费、谁先退出、市场份额争夺时长 |
| 7 | 无法直接观察 | 私有估值、真实危险率信念、面子/声誉效用 |
| 8 | 谁影响谁 | 双方坚持分布 → 时长 → 成本 → 谁赢 → 策略更新 |
| 9 | 因果关系 | 无纯 ESS ⇒ 必须混合；指数 ESS ⇒ 期望支付 0 |
| 10 | 只是相关 | 「打得久」≠「更有价值」；也可能是估值接近【分析】 |
| 11 | 表层现象 | 对峙、价格战、专利诉讼、军备竞赛、拖延谈判 |
| 12 | 底层机制 | 第二价格式成本（付较短者）+ 频率依赖选择 |
| 13 | 有反馈吗 | 有。越久越「已投入太多」→ 行为上更难退出（心理） |
| 14 | 有延迟吗 | 有。信息揭示、融资约束、董事会决策周期 |
| 15 | 正/负反馈 | 沉没成本心理正反馈加码；理性危险率平衡可负反馈截断 |

## 最关键的一句话

> 消耗战的均衡不是「比谁更能忍」，而是：**忍的分布必须让任何固定忍法都占不到便宜——结果是大家把奖品价值在期望上打光。**

# 为什么值得研究

:::cards g3
### 它解释「为什么没有固定坚持时长」
任何 \(m\) 都会被 \(m+\varepsilon\) 入侵；混合 ESS 是数学必然，不是「动物很随机」。【事实】

### 它把沉没成本谬误钉在公式上
续战条件里没有 \(L(t)\)（已付成本）；把 \(L(t)\) 写进去，就是在偏离 ESS/理性。【分析】

### 它同构拍卖、退出战与诉讼
全支付拍卖、双寡头消耗、专利诉讼和解时刻——同一「双方都付钱、一人拿走奖」结构。【推论】
:::

:::note amber 最贵的一次误判
「已经打了这么久，再撑一下对方就会退。」在对称 ESS 下危险率是常数 \(1/V\)，**与已经打了多久无关**（无记忆）。用「已经很久」推断「对方快退」是在赌一个模型禁止的相关。【分析】
:::

# 世界地图

九层看消耗战如何从「支付规则」长到「制度与心理」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="woaL9" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度出口 · 角色惯例、第三方仲裁、承诺装置打断僵持</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 行为扭曲 · 沉没成本、过度自信、承诺升级</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 应用同构 · 企业退出战、诉讼、游说、军备</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 机制对照 · 消耗战 vs 全支付拍卖（赢家付第二价 vs 自出价）</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 非对称 · 所有者/入侵者 · 谁更有赚头谁该赢</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 租金耗散 · E[支付]=0 · 总期望成本 = V</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 混合 ESS · p(x)=(1/V)e^{−x/V} · 无记忆危险率 1/V</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 无纯 ESS · 任何固定 m 可被 m+ε 入侵</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 支付规则 · 胜者 V−min · 负者 −min · 平局均分</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L4**：接受「必须混合」和「期望净收益为零」；进阶卡在 **L5→L8**：角色不对称可缩短冲突，行为偏差可把租金耗散推到超过 \(V\)。【分析】
:::

# 核心概念地图

从抽象支付到可操作的危险率检验。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="woaCmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="woaCmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="80" y="16" width="520" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">支付规则 → 混合 ESS → 危险率/退出检验</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">V · 坚持 x · 耗散</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">指数 ESS · λ=1/V</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">忽略沉没 · 估 λ</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#woaCmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#woaCmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#woaCmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">胜者付「第二价」</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">成本 = 负者坚持</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">E[时长]=V/2</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">E[支付]=0</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">续战：λV ≥ c</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">L(t) 不进式</text>

  <path d="M130 246 L130 280 L340 280 L340 250" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#woaCmB)"/>
  <text x="200" y="272" fill="#d5342c" font-size="11" font-family="sans-serif">心理把 L(t) 塞回 → 过度坚持</text>

  <rect x="100" y="310" width="480" height="50" rx="8" fill="#f3f5f8" stroke="#e2e6ec"/><text x="340" y="340" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">跨域同构：动物展示 · 价格战 · 专利诉讼 · 美元拍卖 · 游说竞赛</text>
</svg>
:::

# 核心参与者

:::cards g2
### 对称对手
估值与成本结构相同。理论基准：混合 ESS、完全租金耗散。【事实】

### 非对称角色
所有者 vs 入侵者、在位 vs 进入、资金充裕 vs 紧绷。连续成本下，ESS 通常把资源判给「更有赚头或成本更低」的一方。【事实】【分析】

### 拍卖人 / 奖品设计者
全支付与消耗战可提高卖方收益（相对标准拍卖，在关联信号等条件下）。【待验证】Krishna & Morgan（1997）。

### 第三方打断者
仲裁、监管、停火协议、董事会「止损授权」——改变博弈规则，而不是在同一条消耗曲线上加码。【分析】
:::

# 核心变量

| 变量 | 符号 | 系统中的作用 |
|---|---|---|
| 资源价值 | \(V\) | 奖品大小；ESS 尺度；危险率 \(1/V\) |
| 计划坚持成本 | \(x\) | 纯策略；混合时从 \(p(x)\) 抽样 |
| 实际对局成本 | \(\min(x_1,x_2)\) | 双方共同支付的「第二价」 |
| 成本流率 | \(c\) | 单位时间成本；企业战里 \(h=c/\Pi\) |
| 已付沉没 | \(L(t)\) | 理性续战**不应**依赖；行为上常依赖 |
| 退出危险率 | \(\lambda\) | ESS 下常数 \(1/V\)；无记忆 |
| 角色误差 | \(\varepsilon\) | 认错所有者/入侵者可打开悖论性 ESS 窗口【分析】 |

# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="woaCa" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="woaCb" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="120" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="80" y="58" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">双方抽 x</text>
  <rect x="180" y="30" width="120" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="58" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">对局时长</text>
  <rect x="340" y="30" width="120" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="400" y="58" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">双方付 min</text>
  <rect x="500" y="30" width="140" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="570" y="58" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">胜者 +V</text>

  <line x1="140" y1="54" x2="180" y2="54" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#woaCa)"/>
  <line x1="300" y1="54" x2="340" y2="54" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#woaCa)"/>
  <line x1="460" y1="54" x2="500" y2="54" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#woaCa)"/>

  <rect x="180" y="140" width="160" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="260" y="168" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">种群策略分布</text>
  <rect x="400" y="140" width="160" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="480" y="168" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">适应度 / 利润</text>

  <line x1="260" y1="78" x2="260" y2="140" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#woaCa)"/>
  <line x1="340" y1="164" x2="400" y2="164" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#woaCa)"/>
  <path d="M480 188 L480 250 L260 250 L260 188" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#woaCb)"/>
  <text x="370" y="242" fill="#d5342c" font-size="11" font-family="sans-serif">选择反馈 → 推向指数 ESS</text>

  <rect x="20" y="270" width="640" height="36" rx="6" fill="#f3f5f8"/><text x="340" y="293" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实线 = 单次对局因果；红虚线 = 种群层面频率依赖</text>
</svg>
:::

关键因果链：

1. **支付定义** → 略长者总占固定 \(m\) 的便宜 → 无纯 ESS。【事实】
2. **无原子混合** + 无差异条件 → 负指数唯一 ESS（Bishop & Cannings 1978）。【事实】
3. **指数无记忆** → 「已坚持多久」不改变续战最优（给定对称）。【事实】
4. **行为层把 \(L(t)\) 加回** → 危险率被低估或奖品被高估 → 超长僵持。【分析】

# 隐藏关系

:::cards g2
### 第二价格结构藏在时间里
消耗战赢家支付的是对手退出时的成本，等价于「第二高出价」——与英式/二价拍卖同构，只是双方都付钱。【事实】

### 无记忆 ≈ 无法从时长推断
指数分布的危险率恒定：时长本身不提供「对方快撑不住」的证据。【事实】

### 对称完美信息下的「零期望」
能抢到奖品的概率优势，在期望上正好被成本吃掉——这不是bug，是均衡。【事实】

### 沉没成本与「完成效应」纠缠
实验与元分析显示：人们继续失败项目，既因已投入，也因「快做完了」的动机（Arkes & Blumer；后续元分析）。【待验证】
:::

# 系统运行机制

:::flow
选择坚持分布 `hi` → 相遇对局 → 付 min 成本 → 适应度更新 → ESS 检验
:::

运行要点：

1. **个体层**：抽一个最大成本 \(x\)（或等价地以常数危险率决定每时点是否退出）。
2. **对局层**：较短者决定时长；双方付该成本；较长者得 \(V\)。
3. **种群层**：任何偏离指数的分布可被合适突变入侵，直到回到 \(p(x)=(1/V)e^{-x/V}\)。【事实】
4. **行为层**：若决策者盯着累计亏损加码，系统离开 ESS，进入「美元拍卖式」过度竞价区。【分析】

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="woaT" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="2"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">t0 相遇</text>
  <circle cx="200" cy="110" r="10" fill="#1d4ed8"/><text x="200" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">对峙升温</text>
  <circle cx="340" cy="110" r="10" fill="#b8730a"/><text x="340" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">成本累积</text>
  <circle cx="480" cy="110" r="10" fill="#d5342c"/><text x="480" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">一方退出</text>
  <circle cx="600" cy="110" r="10" fill="#15181d"/><text x="600" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">奖品易手</text>
  <line x1="90" y1="110" x2="190" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#woaT)"/>
  <line x1="210" y1="110" x2="330" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#woaT)"/>
  <line x1="350" y1="110" x2="470" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#woaT)"/>
  <line x1="490" y1="110" x2="590" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#woaT)"/>
  <text x="340" y="50" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">对称 ESS：时长 ~ Exp(rate=2/V)，均值 V/2；危险率不随已用时间上升</text>
  <text x="340" y="75" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">行为扭曲：已用时间 ↑ → 主观「再撑一下」↑ → 尾部变厚</text>
</svg>
:::

演化三阶段（种群尺度）：固定坚持流行 → 略长突变入侵 → 分布扩散至指数 ESS。企业尺度：进入重叠市场 → 价格/广告消耗 → 一方退出或兼并打断。【分析】

# 利益与激励

| 角色 | 想要什么 | 激励扭曲 |
|---|---|---|
| 参与者 | 得 \(V\) 且少付成本 | 高估自己危险率优势；沉没成本合理化 |
| 代理人（经理） | 证明「没放弃」 | 用公司的钱买个人声誉【分析】 |
| 律师/顾问 | 拉长计费时长 | 与尽早和解激励冲突【分析】 |
| 奖品设计者 | 最大化总出价 | 选用全支付/消耗结构【待验证】 |
| 旁观者社会 | 减少无谓损失 | 推动惯例、仲裁、止损规则 |

:::note red 代理人陷阱
消耗战最毒的版本往往不是两个主人在打，而是**两个代理人用别人的资源证明自己没错**——私人收益（面子）进入 \(V\)，社会成本留在 \(c\)。【分析】
:::

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="woaF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
    <marker id="woaFg" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
  </defs>
  <rect x="40" y="30" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="110" y="65" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">甲方金库</text>
  <rect x="500" y="30" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="570" y="65" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">乙方金库</text>
  <rect x="240" y="20" width="200" height="80" rx="8" fill="#15181d"/><text x="340" y="55" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">奖品池 V</text><text x="340" y="78" text-anchor="middle" fill="#9aa3ad" font-size="11" font-family="sans-serif">唯一有社会价值的块</text>

  <path d="M110 90 L110 150 L300 150 L300 100" fill="none" stroke="#d5342c" stroke-width="2" marker-end="url(#woaF)"/>
  <path d="M570 90 L570 150 L380 150 L380 100" fill="none" stroke="#d5342c" stroke-width="2" marker-end="url(#woaF)"/>
  <text x="340" y="175" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">双方持续抽血 → 耗散池（广告/诉讼/军备）</text>

  <rect x="200" y="195" width="280" height="44" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="340" y="222" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">均衡上期望总抽血 ≈ V（对称 ESS）</text>
</svg>
:::

信息流：对称完全信息下，时长**不**揭示新信息（无记忆）；不完全信息下，坚持本身是信号——高估值者更愿坚持，时长开始携带信息，耗散可变为部分。【事实】【分析】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按 重要性×杠杆率×可操作性÷学习成本 排序：

| # | 杠杆 | 为什么锋利 | 操作成本 |
|---|---|---|---|
| 1 | **事前写死止损线** | 把 \(L(t)\) 从决策里物理切除 | 低：纸面规则 |
| 2 | **重估前方 \(V\) 与 \(c\)，忽略已付** | 直接对齐理性续战条件 | 低：清单 |
| 3 | **制造不对称惯例** | 所有者优先等可缩短冲突 | 中：需共同知识 |
| 4 | **引入第三方裁决** | 改变博弈，而非加码 | 中 |
| 5 | **降低代理人私人 \(V\)** | 拆掉「用公款买面子」 | 高：治理 |
| 6 | **提高己方成本透明度** | 让对方看到你的危险率可信 | 中 |
| 7 | **缩小奖品或拆分奖品** | 降低 \(V\) → 缩短期望时长 | 视场景 |
| 8 | **承诺装置（预授权退出）** | 实验显示可抑制沉没成本敏感【待验证】 | 中 |
| 9 | **改机制：别用全支付结构** | 游说/军备式机制天然耗散 | 高 |
| 10 | **校准「对方快退」信念** | 对称下危险率常数，防幻觉 | 低 |

# 常见认知陷阱

:::details 1. 「已经投入这么多，不能停」
沉没成本谬误经典句。理性公式里没有 \(L(t)\)。Arkes & Blumer（1985）定义：一旦投入金钱/努力/时间，更倾向继续。【事实】
:::

:::details 2. 「打得越久，对方越快放弃」
对称 ESS 无记忆：危险率不随时长上升。专利诉讼研究中曾观察到和解危险率近似与已进行时长无关（MBA 讲义引 Myhrvold 等）【待验证】——与指数结构一致。
:::

:::details 3. 「固定坚持 m* = V/2 最稳」
\(E(m,m)=V/2-m\)；任何 \(m+\varepsilon\) 对固定 \(m\) 的期望严格更好。不存在纯 ESS。【事实】
:::

:::details 4. 「赢了就赚了 V」
忽略已付成本。对称 ESS 上期望净收益为 0；「赢」在平均意义上只是拿回成本。【事实】
:::

:::details 5. 「加码成本流能逼退对方」
把 \(c\) 从 1 加到 2，对称模型里期望支付不变、只是时间尺度压缩——耗散总量仍对齐奖品。【分析】（见 Morgan 讲义直觉）
:::

:::details 6. 「我对 V 的估值更高所以一定该打到底」
若对方成本更低或更有耐心，高估值仍可能该早退；非对称 ESS 看的是「相对赚头」，不是单边 \(V\)。【分析】
:::

:::details 7. 「消耗战 = 鹰鸽」
鹰鸽是离散升级/伤害；消耗战是连续坚持成本。解的结构不同（混合点质量 vs 指数密度）。【事实】
:::

:::details 8. 「全支付拍卖和消耗战一样」
都让失败者付钱；但赢家在消耗战付第二价，在全支付付自己的出价。收益排序在关联信息下可不同。【事实】
:::

:::details 9. 「实验室里人会收敛到 ESS」
Gneezy & Smorodinsky 等全支付实验常见过度出价，总收益可达奖品 2–3 倍。【事实】行为层常偏离。
:::

:::details 10. 「停战=认输=永久弱势」
退出消耗战是支付已实现损失、停止未来耗散；与「能力信号」混淆会导致为声誉继续流血。【分析】
:::

<!-- nav:现实映射 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="woaM" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="40" y="20" width="180" height="70" rx="8" fill="#15181d"/><text x="130" y="50" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">抽象</text><text x="130" y="70" text-anchor="middle" fill="#9aa3ad" font-size="11" font-family="sans-serif">V, x, ESS, λ</text>
  <rect x="250" y="20" width="180" height="70" rx="8" fill="#1d4ed8"/><text x="340" y="50" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">机制</text><text x="340" y="70" text-anchor="middle" fill="#eaf0ff" font-size="11" font-family="sans-serif">第二价成本·耗散</text>
  <rect x="460" y="20" width="180" height="70" rx="8" fill="#0f8a4d"/><text x="550" y="50" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">操作</text><text x="550" y="70" text-anchor="middle" fill="#e8f8ef" font-size="11" font-family="sans-serif">止损·估危险率</text>
  <line x1="220" y1="55" x2="250" y2="55" stroke="#1d4ed8" stroke-width="2" marker-end="url(#woaM)"/>
  <line x1="430" y1="55" x2="460" y2="55" stroke="#1d4ed8" stroke-width="2" marker-end="url(#woaM)"/>

  <rect x="40" y="120" width="600" height="160" rx="10" fill="#f8fdfa" stroke="#e2e6ec"/>
  <text x="60" y="150" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">映射例句</text>
  <text x="60" y="178" fill="#454c56" font-size="12" font-family="sans-serif">动物展示对峙 → x = 时间/能量；V = 领地/配偶</text>
  <text x="60" y="202" fill="#454c56" font-size="12" font-family="sans-serif">双寡头价格战 → c = 每期亏损；Π = 垄断租金</text>
  <text x="60" y="226" fill="#454c56" font-size="12" font-family="sans-serif">专利诉讼 → c = 律师费+ distraction；V = 专利租</text>
  <text x="60" y="250" fill="#454c56" font-size="12" font-family="sans-serif">美元拍卖/便士拍卖 → 显式全支付 + 沉没成本敏感</text>
</svg>
:::

HBS 案例「Hold or Fold?」指出：任意事先承诺的坚持时长都能被「再多撑 ε」合理化——这正是无纯 ESS 在商业语言里的回声。【分析】

# 从理论到行动

:::tabs
@@识别结构
问四件事：是否双方持续付成本？是否一人拿走奖品？退出是否可由单方决定？已付成本是否不可收回？四者皆是 → 按消耗战建模，而不是按「谁更勇敢」叙事。

@@校准数字
写下前方 \(V\)（还能带来的净值）、流成本 \(c\)、主观危险率 \(\hat\lambda\)。续战仅当 \(\hat\lambda \cdot V \ge c\)。把已付 \(L\) 写在纸上但圈起来标注「禁止进入不等式」。

@@设计出口
止损授权、第三方调解、角色惯例（先占者优先）、拆分奖品降低 \(V\)。优先改规则，其次改信念，最后才是「再撑一下」。

@@防代理人
若决策者不是出资人：要求书面说明「若换成今天才开工，是否仍进入」——把沉没成本从合理化话术里抽掉。
:::

# 技能树

:::details Lv1 概念辨识
能区分消耗战 / 鹰鸽 / 囚徒困境 / 标准拍卖；能写出支付 \(V-\min\)。【事实】
:::

:::details Lv2 ESS 推导直觉
说明为何无纯 ESS；写出 \(p(x)=(1/V)e^{-x/V}\) 与 \(E[\text{支付}]=0\)。【事实】
:::

:::details Lv3 危险率决策
在真实冲突里列出 \(V,c,\hat\lambda\)，做一次忽略沉没的续战判定。
:::

:::details Lv4 非对称与机制
能讨论所有者惯例、消耗战 vs 全支付、不完全信息下的部分耗散。【分析】
:::

:::details Lv5 治理设计
能为组织设计止损、预授权退出、代理人激励隔离。
:::

# 游戏化世界

你掉进一个叫 **「耗散平原」** 的世界：每一步双方都掉血，先撑不住的人失去中央水晶 \(V\)。平原的物理定律是负指数——**地图不告诉你对方还剩多少血**。唯一稳定的生存法则是随机化离场时刻；任何「我固定撑到 7」都会被「撑到 7.1」的人收割。平原边缘有三座塔：**止损塔**（预写退出）、**仲裁塔**（第三方打断）、**角色塔**（所有者优先）。大多数新手死在第四座幻觉塔：**「已经掉了这么多血，水晶快到手了」**。

# 任务系统

| 任务 | 目标 | 验收 |
|---|---|---|
| 主线 1 | 用 \(V=10\) 手算 \(E[X],E[\min],P(X>10)\) | 10 / 5 / 0.3679 |
| 主线 2 | 找一件正在拖延的争执，写续战不等式 | 纸面含 \(V,c,\lambda\)，无 \(L\) |
| 支线 A | 对比一次价格战新闻与消耗战清单 | 四要素打勾表 |
| 支线 B | 读懂「第二价成本」一句话 | 能向他人复述 |
| 日常 | 任何「不能白费」念头触发 10 秒冷静 | 重写前方净值 |

<!-- nav:模拟与实践 -->
# 反事实模拟

下面四个工具都参与真计算（见 HTML 版滑块）。

:::raw
<div class="tool" id="tool-ess">
  <h3>模型 1 · 对称 ESS：价值 V 如何缩放时长与耗散</h3>
  <div class="ctrl">
    <label>资源价值 V <output id="ess_vO">10</output></label>
    <input type="range" id="ess_v" min="2" max="40" step="0.5" value="10"/>
  </div>
  <div class="readout">
    <div class="ro">E[计划坚持] <b id="ess_ex">10.0</b></div>
    <div class="ro">E[对局时长] <b id="ess_emin">5.0</b></div>
    <div class="ro">危险率 λ <b id="ess_lam">0.100</b></div>
    <div class="ro">E[支付] <b id="ess_pay">0.00</b></div>
    <div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ess_vh" style="font-size:13px;color:#1d4ed8">V=10 → 指数 ESS；总期望耗散 = V；个人期望净收益 = 0</span></div>
  </div>
  <canvas id="essChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

:::raw
<div class="tool" id="tool-pure">
  <h3>模型 2 · 为何没有纯 ESS：固定 m 被 m+ε 入侵</h3>
  <div class="ctrl">
    <label>种群固定坚持 m <output id="pure_mO">6</output></label>
    <input type="range" id="pure_m" min="0" max="20" step="0.5" value="6"/>
    <label>资源 V <output id="pure_vO">10</output></label>
    <input type="range" id="pure_v" min="2" max="30" step="0.5" value="10"/>
  </div>
  <div class="readout">
    <div class="ro">居民互遇支付 <b id="pure_res">−1.0</b></div>
    <div class="ro">略长突变支付 <b id="pure_mut">4.0</b></div>
    <div class="ro">入侵优势 <b id="pure_adv">5.0</b></div>
    <div class="ro">零策略 vs 居民 <b id="pure_zero">0.0</b></div>
    <div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="pure_vh" style="font-size:13px;color:#d5342c">m=6&lt;∞ → 突变 m+ε 优势 = V/2 = 5.0；无纯 ESS</span></div>
  </div>
  <canvas id="pureChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

:::raw
<div class="tool" id="tool-firm">
  <h3>模型 3 · 企业消耗战：流成本 c 与垄断租金 Π</h3>
  <div class="ctrl">
    <label>每期对峙成本 c <output id="firm_cO">2</output></label>
    <input type="range" id="firm_c" min="0.5" max="10" step="0.5" value="2"/>
    <label>胜者垄断租金 Π <output id="firm_piO">20</output></label>
    <input type="range" id="firm_pi" min="4" max="60" step="1" value="20"/>
  </div>
  <div class="readout">
    <div class="ro">退出危险率 h <b id="firm_h">0.100</b></div>
    <div class="ro">E[对峙期数] <b id="firm_dur">5.0</b></div>
    <div class="ro">双方总期望成本 <b id="firm_tot">20.0</b></div>
    <div class="ro">耗散比 <b id="firm_ratio">1.00</b></div>
    <div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="firm_vh" style="font-size:13px;color:#1d4ed8">对称完全信息基准：h=c/Π，总耗散≈Π（租金打光）</span></div>
  </div>
  <canvas id="firmChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

:::raw
<div class="tool" id="tool-sunk">
  <h3>模型 4 · 沉没成本幻觉：L 不该进入续战</h3>
  <div class="ctrl">
    <label>前方净值 V <output id="sunk_vO">10</output></label>
    <input type="range" id="sunk_v" min="1" max="30" step="0.5" value="10"/>
    <label>瞬时成本 c <output id="sunk_cO">1</output></label>
    <input type="range" id="sunk_c" min="0.2" max="5" step="0.1" value="1"/>
    <label>主观危险率 λ <output id="sunk_lO">0.12</output></label>
    <input type="range" id="sunk_l" min="0.02" max="0.5" step="0.01" value="0.12"/>
    <label>已付沉没 L（仅展示） <output id="sunk_LO">8</output></label>
    <input type="range" id="sunk_L" min="0" max="40" step="1" value="8"/>
  </div>
  <div class="readout">
    <div class="ro">理性续战指标 λV−c <b id="sunk_rat">0.20</b></div>
    <div class="ro">谬误指标（把 L 当损失） <b id="sunk_fall">−7.80</b></div>
    <div class="ro">理性建议 <b id="sunk_dec">续战</b></div>
    <div class="ro">若用 L 误判 <b id="sunk_dec2">停</b></div>
    <div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="sunk_vh" style="font-size:13px;color:#0f8a4d">λV=1.20 ≥ c=1.0 → 理性续战；L=8 不改变该不等式</span></div>
  </div>
  <canvas id="sunkChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 标志性产出 |
|---|---|---|
| L1 识结构 | 认出消耗战四要素 | 一页对照表 |
| L2 算均衡 | 会用指数 ESS 与耗散比 | 手算与滑块一致 |
| L3 做决策 | 忽略沉没的续战判定 | 真实案例纸面不等式 |
| L4 改规则 | 止损/仲裁/角色惯例 | 可执行的出口设计 |

# 30分钟最小实践

1. **5 分钟**：选一件你正在「再坚持一下」的事（项目、争论、订阅、持仓叙事皆可）。
2. **10 分钟**：只写三个数——前方还能带来的净值 \(V\)、继续下去的单位成本 \(c\)、你对「对方/情况下一刻好转」的主观概率强度 \(\hat\lambda\)（没有对手就用「环境好转危险率」）。
3. **5 分钟**：算 \(\hat\lambda V - c\)。\(L=\)已花多少写在旁边但划掉。
4. **10 分钟**：若指标为负，写下一句退出执行句（取消、和解、止损单）；若为正，写下一句「重新评估日期」而不是「无限再撑」。

验收：纸上有三个数、一个不等式、一个执行句；\(L\) 被明确排除。

# 7天计划

| 天 | 练习 |
|---|---|
| D1 | 重算 \(V=10\) 的 ESS 四个数字（E[X], E[min], λ, 支付） |
| D2 | 用模型 2 感受「任何 m 都被入侵」 |
| D3 | 找一则价格战/诉讼新闻，标四要素 |
| D4 | 对自己的一件事做沉没成本隔离练习 |
| D5 | 写一条止损/退出预授权 |
| D6 | 对比消耗战 vs 全支付：赢家付什么 |
| D7 | 复盘：哪次「再撑一下」其实指标已为负 |

# 30天计划

- **第 1 周**：吃透对称 ESS 与无纯策略（手册 + 滑块）。
- **第 2 周**：收集 3 个现实消耗战案例，统一用 \(V,c,\lambda\) 记账。
- **第 3 周**：设计组织级出口（止损权限、第三方条款）。
- **第 4 周**：做一次「代理人隔离」——若你是出资人，要求决策备忘录写「今日零基是否仍进入」。

<!-- nav:模型与问题 -->
# 10 个核心模型

1. **对称消耗战支付**：胜 \(V-\min\)，负 \(-\min\)。
2. **无纯 ESS**：\(m+\varepsilon\) 入侵任意固定 \(m\)。
3. **负指数混合 ESS**：\(p(x)=(1/V)e^{-x/V}\)。
4. **无记忆危险率**：\(\lambda=1/V\)。
5. **租金完全耗散**：\(E[\text{支付}]=0\)，总期望成本 \(=V\)。
6. **对局时长**：\(\min\sim\mathrm{Exp}(2/V)\)，均值 \(V/2\)。
7. **企业战危险率**：\(h=c/\Pi\)。
8. **第二价成本结构**：与二价拍卖同构、双方付款。
9. **非对称惯例**：连续成本下资源归相对优势角色。
10. **沉没成本隔离**：续战条件 \(\lambda V\ge c\)，不含 \(L(t)\)。

# 关键问题清单

:::details Q1 为什么动物不「约好只展示很短」？
短展示约定不是 ESS：稍微多展示者会赢走资源。群体最优 ≠ 演化稳定。【事实】
:::

:::details Q2 期望支付为 0，为什么还要打？
若不打，突变「略打一点」会偷走资源；均衡是「不得不随机化」，不是「乐意打光」。【分析】
:::

:::details Q3 和懦夫博弈（Chicken）什么关系？
Chicken/鹰鸽是离散行动；消耗战是连续坚持。都关于升级与先退，但数学解不同。【事实】
:::

:::details Q4 不完全信息会改善耗散吗？
通常带来部分揭示与部分耗散；高类型坚持更久。对称完全信息的「打光」是基准上界直觉。【分析】
:::

:::details Q5 为什么诉讼常常拖很久？
结构像消耗战；律师激励、信息不对称、沉没成本心理叠加。【分析】
:::

:::details Q6 止损会不会变成「可被利用的软」？
可能。需要同时管理声誉与规则：公开的是「原则」，不是「软靶」。可用第三方触发降低被剥削。【分析】
:::

:::details Q7 全支付实验为何过度出价？
损失厌恶、沉没成本敏感、高兴感等行为因素；收入可达奖品数倍。【事实】【待验证】幅度依设计而变。
:::

:::details Q8 Bourgeois「所有者赢」一定出现吗？
在离散鹰鸽非对称里常见；连续消耗战在角色识别近乎完美时，通常是「常识性」把资源给优势角色，悖论性 ESS 需要额外离散承诺结构。【事实】【分析】
:::

:::details Q9 如何估计主观 λ？
用历史类似冲突的退出频率，或把「我觉得对方再撑一周的概率」换成危险率；写范围而非单点。【分析】
:::

:::details Q10 今天就能做的最小干预是什么？
预写止损句 + 续战不等式把 \(L\) 划掉。见 §22。【分析】
:::

# 下一阶段探索

- Bishop & Cannings（1978）广义消耗战与有限策略收敛。
- Krishna & Morgan（1997）消耗战与全支付的收益排序。
- 行为：Augenblick 便士拍卖中的沉没成本；慈善全支付中的承诺装置。
- 相邻手册：ESS、鹰鸽/Chicken、拍卖与收益等价、可信承诺、BATNA。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 消耗战模型与无纯 ESS | 经典论文 | Maynard Smith & Price 1973 *Nature*；Maynard Smith 1974 *JTB* | 【事实】 |
| 负指数唯一 ESS | 经典论文 | Bishop & Cannings 1978 *JTB*；Cannings 讲义 | 【事实】 |
| 消耗战 vs 全支付收益 | 理论论文 | Krishna & Morgan 1997 | 【事实】【分析】 |
| 非对称消耗战 | 理论论文 | Hammerstein & Parker 1982；Maynard Smith & Parker 1976 | 【事实】 |
| 沉没成本定义与升级 | 行为文献 | Arkes & Blumer 1985；Staw 1976；元分析 2014 | 【事实】【待验证】 |
| 全支付过度出价 | 实验 | Gneezy & Smorodinsky 等 | 【事实】 |
| 企业消耗战直觉 | 教学讲义 | Morgan (Haas) War of Attrition notes；HBS Hold or Fold | 【分析】 |
| 手册默认数值 V=10 | 教学设定 | 本文验算 | 【事实】 |

标记约定：【事实】多方一致或可直接从模型推出；【分析】权威推演/教材共识；【推论】跨域类比；【假设】未验证机制；【待验证】单一来源或实验幅度依赖设计。

# 免责声明 {.appendix}

本手册是博弈论与决策框架的认知训练材料，**不是**投资建议、法律意见、商业尽调结论或谈判代理方案。模型高度简化；真实冲突含声誉、流动性、法律约束与代理人问题。数字为教学默认值与经典结果复算，不构成对任何具体争端结局的预测。你需对自身决策独立负责。
