---
slug: 赢家诅咒（Winner's Curse）：共同价值拍卖中出价最高者往往是高估最多者，需事前下调报价
title: 赢家诅咒（Winner's Curse）
subtitle: 共同价值拍卖里，<strong>出价最高者往往是高估最多者</strong>——「中标」本身是坏消息；理性人必须事前下调报价，否则赢了却亏钱。
brand_sub: Winner's Curse × Common-Value Auctions
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 拍卖理论, 赢家诅咒, 共同价值, 逆向选择, 出价下调, 并购溢价, 实验经济学]
theme_js_file: 赢家诅咒（Winner's Curse）：共同价值拍卖中出价最高者往往是高估最多者，需事前下调报价.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**赢家诅咒（Winner's Curse）**：在**共同价值**拍卖中，标的对所有人事后价值大致相同，但事前每人只有带噪声的估值。谁赢了，往往就是谁估得最高——于是**中标本身透露「你偏乐观」**。若不把这条逆向选择信息算进出价，系统性地**赢了却赚不到预期利润，甚至亏钱**。【事实】

解药不是「别赢」，而是**事前下调（bid shading）**：出价应对齐 \(\mathbb{E}[V\mid \text{我的信号},\text{且我会赢}]\)，而不是无条件估计 \(\mathbb{E}[V\mid \text{我的信号}]\)。竞争者越多、噪声越大，下调幅度越大。【事实】

术语有两层：业界/实验里「诅咒」指**没下调、亏了钱**；部分理论文献用同一词指「条件期望与无条件期望之差」本身——读文献时先分清作者说的是**失败行为**还是**应修正的统计量**。【分析】

与相邻手册：《拍卖理论与收益等价》讲四标准格式何时同收益；《维克里拍卖》讲私有价值下真话占优；本手册专剖**共同价值下的逆向选择**——油气租赁、并购、招聘抢人、AI 算力军备，结构同构。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么把东西拍贵」，而是：**当价值共享、信号有噪时，胜出事件如何扭曲你对价值的信念，以及理性出价必须如何条件化。**

边界：

- **在界内**：共同/关联价值、顺序统计量、条件期望下调、实验室与油田证据、并购傲慢假说、公开信息与拍卖格式如何缓解/加剧诅咒。
- **在界外**：纯私有价值里的「压价技巧」、企业文化口号式「别太乐观」——除非压成「信号—胜出事件—条件价值—出价」链条。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 共同价值拍卖中胜出带来的逆向选择与理性下调 |
| 2 | 边界在哪 | 到「信念更新 + 出价规则 + 实证/实验」；不含具体行业钻探术 |
| 3 | 核心对象 | 共同价值 \(V\)、私人信号 \(X_i\)、竞买人数 \(n\)、噪声 \(\sigma\) |
| 4 | 参与者 | 竞买人、卖方、分析师/地质队、监管、实验被试 |
| 5 | 关键变量 | \(n\)、\(\sigma\)、先验、拍卖格式（密封一价/英式）、公开信息 |
| 6 | 可直接观察 | 出价、成交价、事后产量/回报、实验利润 |
| 7 | 无法直接观察 | 真实 \(V\)、每人信号、是否做了条件化 |
| 8 | 谁影响谁 | \(n\uparrow,\sigma\uparrow\) → 胜者高估更极端 → 需更大下调 |
| 9 | 因果关系 | 胜出 ⇒ 你的信号常为最高阶统计量 ⇒ \(E[V\mid win]<E[V\mid X_i]\) |
| 10 | 只是相关 | 「溢价高」≠一定诅咒（也可能真协同）；需对照基准 |
| 11 | 表层现象 | 油田低回报、罐子拍卖亏钱、并购方股价跌 |
| 12 | 底层机制 | 顺序统计量 + 忽略条件化 = 系统性负利润 |
| 13 | 有反馈吗 | 有。亏损→学习/破产→幸存者更保守；卖方收入短期可能因诅咒抬高 |
| 14 | 有延迟吗 | 有。储量/协同事后才知；实验室即时结算 |
| 15 | 正/负反馈 | 经验与破产淘汰可缓解；竞争加剧可重新点燃诅咒 |

## 最关键的一句话

> 「我赢了」在共同价值世界里是坏消息——先假设你的估计是全场最高，再决定愿付多少。

# 为什么值得研究

:::cards g3
### 它是拍卖理论的分水岭
私有价值下维克里可真话；共同价值下一价密封里「报估计」会系统亏损。格式选择、信息公开、人数效应全改写。【事实】

### 它在实验室几乎「必现」
罐子拍卖、矿物权实验：新手持续负利润；人数从 3–4 升到 6–7，经验被试利润可从正变近零/负。【事实】

### 它跨域同构极强
油气租赁、公司并购（傲慢假说）、自由球员合同、出版预付金、招聘抢人、算力军备——结构都是「最高信号者得标」。【分析】
:::

:::note amber 最贵的一次误读
把「赢家诅咒」理解成「拍卖不公平」或「别参与」。正确动作是**参与但条件化出价**；完全退出是把租金留给仍会下调的对手。【分析】
:::

# 世界地图

九层从「共同价值原语」爬到「场域与政策」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="wcLArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 场域 · 并购 / 招聘 / 军备竞赛叙事 · 监管与披露</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 缓解器 · 英式信息公开 · 联合竞标 · 经验与破产淘汰</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 实证层 · OCS 租赁 · 实验室 · 并购事件研究</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 跨域同构 · 逆向选择 · 顺序统计 · 傲慢假说</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 均衡层 · 对称 BNE：按 E[V｜信号且临界胜出] 出价</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 行为层 · 忽略条件化 → 负利润「诅咒」</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 统计核 · 胜者 ≈ 最高信号 · E[V｜win] &lt; E[V｜X]</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 信号层 · Xᵢ = V + εᵢ · 无偏但有噪</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 价值原语 · 共同价值 V（事后对人人近似相同）</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2–L4**：会算「最高信号偏差」、会说「中标是坏消息」；进阶在 **L5** 与 **L8**——写出条件化出价，并知道英式升价如何释放对手信息以缓解诅咒。【分析】
:::

# 核心概念地图

抽象统计 → 机制出价 → 操作清单。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="wcCmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="wcCmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="60" y="16" width="560" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">信号 → 胜出筛选 → 条件价值 → 下调出价</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">顺序统计 / 条件期望</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">一价密封 · 英式学习</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">估 σ·n · 写下调表</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#wcCmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#wcCmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#wcCmA)"/>

  <rect x="40" y="180" width="180" height="72" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">无条件：E[V｜X]=X*</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">*平坦先验示意</text>
  <rect x="250" y="180" width="180" height="72" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">条件：E[V｜X,win]&lt;X</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">下调幅度随 n,σ</text>
  <rect x="460" y="180" width="180" height="72" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">出价 ≤ 条件价值</text><text x="550" y="228" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">再加战略压价</text>

  <path d="M130,252 L130,280 L340,280 L340,300" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#wcCmB)"/>
  <rect x="180" y="308" width="320" height="48" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="340" y="338" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">反馈：忽略条件化 → 负利润 → 学习或出局</text>
</svg>
:::

# 核心参与者

| 角色 | 目标 | 信息 | 典型动作 |
|---|---|---|---|
| 竞买人 | 最大化 \(E[\pi\mid win]\) | 私人信号 \(X_i\) | 下调 / 合谋 / 退出 |
| 卖方 | 收益与出清 | 可释公共信息 | 选格式、披露、入场门槛 |
| 分析师 / 地质队 | 估 \(V\) | 模型与样本 | 给无条件估计（易被直接当出价） |
| 董事会 / CEO | 增长叙事、控制权 | 内部乐观偏差 | 并购溢价（傲慢通道） |
| 实验被试 | 现金利润 | 受控信号 | 展示诅咒稳健性 |
| 监管 | 公平、反串标 | 事后审计 | 租赁规则、并购披露 |

# 核心变量

| 变量 | 符号直觉 | 为何重要 |
|---|---|---|
| 共同价值 | \(V\) | 事后人人相同；诅咒的舞台 |
| 私人信号 | \(X_i=V+\varepsilon_i\) | 无偏但有噪；胜者筛选极值 |
| 噪声 | \(\sigma\) | 越大，最高信号越离谱 |
| 人数 | \(n\) | 越大，最高阶统计量越大 |
| 先验 | 对 \(V\) 的信念 | 决定贝叶斯收缩强度 |
| 拍卖格式 | 一价密封 / 英式 | 英式释放对手信息，常缓解诅咒 |
| 公开信息 | 公共信号 | 降不确定；若已有诅咒，对卖方收入效应可反向 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="wcCaA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="wcCaB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="90" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">共同 V + 噪声</text>
  <rect x="200" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="270" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">最高信号胜出</text>
  <rect x="380" y="30" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="450" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">E[V｜win]&lt;X</text>
  <rect x="520" y="30" width="140" height="50" rx="8" fill="#15181d"/><text x="590" y="60" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">须下调出价</text>
  <line x1="160" y1="55" x2="200" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#wcCaA)"/>
  <line x1="340" y1="55" x2="380" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#wcCaA)"/>
  <line x1="520" y1="55" x2="520" y2="55" stroke="#1d4ed8" stroke-width="1.5"/>
  <path d="M450,80 L450,100 L590,100 L590,80" fill="none" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#wcCaA)"/>

  <rect x="80" y="160" width="160" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="160" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">按 X 原价出价</text>
  <rect x="320" y="160" width="160" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="400" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">赢时系统性高估</text>
  <rect x="520" y="160" width="140" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="590" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">负期望利润</text>
  <line x1="240" y1="185" x2="320" y2="185" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#wcCaB)"/>
  <line x1="480" y1="185" x2="520" y2="185" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#wcCaB)"/>

  <rect x="140" y="250" width="400" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="277" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">蓝实线=理性路径；红虚线=忽略条件化的诅咒路径</text>
</svg>
:::

**主因果（实线）**：共同价值 + 噪声信号 → 最高信号者更易胜出 → 条件期望低于信号 → 理性下调。【事实】

**反馈（红虚线）**：若按信号原价密封一价出价，胜出利润期望为负——这就是业界说的「你赢了，你亏了，你诅咒」。【事实】

# 隐藏关系

| 表层说法 | 隐藏结构 |
|---|---|
| 「出价最高的人最懂行」 | 也可能是**噪声最大的乐观者** |
| 「竞争越激烈越好」 | 对卖方短期抬价；对买方诅咒更深 |
| 「有经验就不会中招」 | 小市场可缓解；人数一升诅咒可回潮（实验室）【事实】 |
| 「公开信息总抬卖方收入」 | 无诅咒时抬；有诅咒时公开信息可**降**卖方收入（被试更敢出）【事实】 |
| 「并购溢价=协同」 | 也可能是**估值误差的右尾被选中**（傲慢） |
| 「二价就没事」 | 共同价值下二价仍有信息问题；英式因公开退出而不同 |
| 「别参与就安全」 | 放弃正 NPV 交易；正确是条件化 |

# 系统运行机制

**教学用矿物权模型（示意）**：

1. 真实价值 \(V\) 对所有人相同，事前未知。
2. 每人独立得到 \(X_i=V+\varepsilon_i\)，\(\varepsilon_i\sim\mathcal{N}(0,\sigma^2)\)（无偏）。
3. 密封一价：出价最高者得标并付自己的价。
4. **天真策略** \(b_i=X_i\)：胜者近似拥有 \(\max_i X_i\)，其期望高估约 \(\sigma\cdot\mathbb{E}[Z_{(n)}]\)，其中 \(Z_{(n)}\) 为 \(n\) 个标准正态的最大值。【推论】
5. **理性策略**：令出价对齐「信号为最高时」的条件价值，并再按一价战略压价。

默认数值：\(V=100\)，\(\sigma=20\)，\(n=5\) → \(\mathbb{E}[Z_{(5)}]\approx 1.163\) → 胜者期望高估约 **23.3**；若按最高信号原价成交，期望利润约 **−23.3**（相对真 \(V\)）。【推论】

**Capen–Clapp–Campbell（1971）**：墨西哥湾 OCS 密封租赁中，行业回报常低于目标；他们强调「赢的往往是高估最多者」，并建议系统下调。【事实】Thaler 等转述：有竞争标的上，次高价平均约只有最高价的 **2/3** 量级——出价分歧本身很大。【待验证】

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="wcTArw" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="70" cy="110" r="10" fill="#0f8a4d"/><text x="70" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1971</text><text x="70" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">CCC 油田论文</text>
  <circle cx="200" cy="110" r="10" fill="#1d4ed8"/><text x="200" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1983</text><text x="200" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">罐子拍卖实验</text>
  <circle cx="330" cy="110" r="10" fill="#1d4ed8"/><text x="330" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1986</text><text x="330" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Kagel–Levin；Roll</text>
  <circle cx="460" cy="110" r="10" fill="#b8730a"/><text x="460" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1988+</text><text x="460" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Thaler 异象专栏</text>
  <circle cx="590" cy="110" r="10" fill="#d5342c"/><text x="590" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">2000s–</text><text x="590" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">并购检验争议</text>
  <text x="340" y="170" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">从石油工程直觉 → 实验室稳健现象 → 公司金融「傲慢」叙事</text>
  <text x="340" y="195" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">【事实】CCC 1971；Bazerman–Samuelson 1983；Kagel–Levin AER 1986；Roll 1986；Thaler JEP 1988</text>
</svg>
:::

Bazerman & Samuelson（1983）课堂罐子拍卖：真值 \$8，平均估计约 \$5.13（偏低），但平均胜出价约 **\$10.01**，胜者平均亏约 **\$2.01**，逾半数拍卖胜者亏损。【事实】Kagel & Levin（1986）：经验被试在 **3–4** 人市场可获正利润（约 \$4.32 量级报道），**6–7** 人市场利润骤降（约 \$0.54）并再现更强诅咒。【事实】【待验证：美元精确值以原文表为准】

# 利益与激励

| 主体 | 激励 | 与诅咒的张力 |
|---|---|---|
| 买方分析师 | 报「最佳点估计」 | 点估计被直接当出价 → 诅咒 |
| 买方决策者 | 赢下交易、叙事 | 赢的效用 ≠ 股东 NPV |
| 卖方 | 高成交价 | 买方诅咒可抬短期收入 |
| 联合竞标方 | 分摊信息 | 降有效 \(n\)，缓和极值 |
| 投资人 | 事后回报 | 惩罚过度乐观收购方 |
| 实验者 | 识别机制 | 用破产/经验分离学习 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="wcFArw" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="40" y="30" width="120" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="100" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">信号 Xᵢ</text><text x="100" y="73" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">私有、有噪</text>
  <rect x="280" y="30" width="120" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">拍卖筛选</text><text x="340" y="73" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">max 胜出</text>
  <rect x="520" y="30" width="120" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="580" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">现金流出</text><text x="580" y="73" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">付价 ≥ 真值?</text>
  <line x1="160" y1="60" x2="280" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#wcFArw)"/>
  <line x1="400" y1="60" x2="520" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#wcFArw)"/>
  <text x="340" y="20" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">信息流被「胜出」截断放大；支付流单向抽出</text>

  <rect x="100" y="140" width="480" height="90" rx="10" fill="#f8f9fb" stroke="#e2e6ec"/>
  <text x="340" y="170" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">「抽水」发生在条件化失败时</text>
  <text x="340" y="195" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">卖方抽走的是买方对极值信号的过度支付</text>
  <text x="340" y="215" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">英式公开退出 = 把对手信号灌回信息流，减轻抽水【分析】</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 | 怎么撬 |
|---|---|---|---|
| 1 | 先判定：共同 vs 私有价值 | 决定要不要诅咒框架 | 一页「事后价值是否共享」 |
| 2 | 强制条件化检查表 | 把「若我最高」写进标书 | 出价 = f(X,n,σ) |
| 3 | 估计 \(\sigma\) 与 \(n\) | 下调幅度的两根轴 | 历史分歧、竞品名单 |
| 4 | 选英式 / 披露公共信息 | 降信息不对称 | 共同价值优先公开学习 |
| 5 | 联合竞标 / 信息池 | 降有效竞争极值 | 合规前提下共享信号 |
| 6 | 分离「估计」与「出价」 | 防分析师点估计直通 | 流程闸门 |
| 7 | 对照「不买」基准 | 并购勿只看赢了没 | 收购方 CAR、协同实现率 |
| 8 | 人数敏感压力测试 | 6–7 人市场实验室易翻车 | 情景：n±50% |
| 9 | 破产/止损纪律 | 实验室靠淘汰改善 | 仓位上限 |
| 10 | 董事会挑战乐观 | 打通傲慢通道 | 红队估值、独立顾问 |

# 常见认知陷阱

:::details 陷阱1：「我的模型无偏，所以出价=估计」
无偏是对**随机一次估计**；拍卖只在你最高时成交——条件分布已偏。【事实】
:::

:::details 陷阱2：「人越多越好办，竞争出真价」
人多抬高最高阶统计量；天真买方诅咒更深。【事实】
:::

:::details 陷阱3：「二价拍卖没有赢家诅咒」
支付规则不同，但共同价值下信息问题仍在；英式因公开信息更常被讨论为缓解器。【分析】
:::

:::details 陷阱4：「有经验就不会亏」
小 \(n\) 可缓解；\(n\) 增大诅咒可回潮（Kagel–Levin）。【事实】
:::

:::details 陷阱5：「公开信息总对卖方有利」
已有诅咒时，公开信息可能让被试出得更猛，卖方收入反而降。【事实】
:::

:::details 陷阱6：「字段里经济学家说不存在，所以是假的」
理论均衡无「持续亏损」；实验室与部分字段显示学习慢、破产筛选。【分析】
:::

:::details 陷阱7：「并购溢价高=协同大」
也可能是估值误差被拍卖选中（Roll 傲慢假说）；需事后绩效对照。【分析】
:::

:::details 陷阱8：「下调就是懦弱，会输掉好资产」
目标是 \(E[\pi\mid win]\ge 0\)，不是胜率最大；过度下调另当别论。【推论】
:::

:::details 陷阱9：「罐子实验不现实」
它把共同价值与噪声纯化；机制同构到租赁/并购。【分析】
:::

:::details 陷阱10：「AI/算力军备不是拍卖」
资本支出竞速仍是「最高乐观者先下注」；共同价值是未来现金流。【假设】
:::

<!-- nav:实践转化 -->
# 从抽象到现实

| 抽象 | 现实翻译 |
|---|---|
| \(E[V\mid X,win]<X\) | 油田：中标后再看储量常「没那么多」 |
| \(\sigma\cdot E[Z_{(n)}]\) | 竞标人数翻倍 → 下调表加码 |
| 罐子 \$10 胜出/\$8 真值 | 课堂：看得见的亏 \$2 |
| 英式信息公开 | 现场喊价观察对手退出 |
| 傲慢假说 | 收购方付过高溢价，目标股东受益 |
| 联合竞标 | 财团共享地震资料 |

:::note green 对照基准（别只报「赢了」）
胜率、得标次数不是目标。基准是：**条件于得标，利润是否 ≥ 不参与（0）**；并购则对照收购方异常收益与「不收购」。【分析】
:::

# 从理论到行动

1. **写清价值类型**：共同 / 私有 / 混合。
2. **列出 \(n\) 与信号分歧史**（估 \(\sigma\)）。
3. **用顺序统计下调**：先算 \(\sigma E[Z_{(n)}]\) 作下限修正。
4. **再叠加一价战略压价**（若格式是一价）。
5. **能公开学就用英式或披露**。
6. **事后复盘**：得标项目 IRR vs 标书假设——专查「赢时高估」。

# 技能树

:::details S1 一句话
能向同事说清：「中标=坏消息，要事前下调。」【事实】
:::

:::details S2 共同 vs 私有
给三个案例分类，并指出诅咒是否适用。【分析】
:::

:::details S3 顺序统计手算
对给定 \(n,\sigma\) 算出胜者期望高估 \(\sigma E[Z_{(n)}]\)。【推论】
:::

:::details S4 出价表
把「估计→条件价值→密封出价」写成一页流程。【分析】
:::

:::details S5 并购红队
用傲慢清单挑战溢价：协同可测吗？不买的 NPV？【分析】
:::

# 游戏化世界

- **主线**：矿物权密封场，用下调通关正期望利润。
- **副本**：罐子拍卖、人数骤增、公开信息陷阱、并购溢价 Boss。
- **Boss**：经验队在 7 人市场再度亏损——迫使你改格式或合信息。
- **成就**：首次把分析师「点估计」拦在出价闸门外；首次用 \(E[Z_{(n)}]\) 改标书。

# 任务系统

| 任务 | 产出 | 验收 |
|---|---|---|
| T1 电梯稿 | 共同价值+坏消息+下调 | 外行复述 |
| T2 高估表 | n=3,5,8 的 \(\sigma E[Z_{(n)}]\) | 与手册默认一致 |
| T3 罐子复盘 | 解释 \$10 vs \$8 | 点出逆向选择 |
| T4 格式选择 | 密封 vs 英式备忘 | 共同价值优先公开 |
| T5 并购对照 | 溢价 vs 收购方 CAR | 不单看「赢了」 |
| T6 真实标书 | 一页条件化检查表 | 含 n、σ、下调格 |

# 反事实模拟

四个可调模型：胜者高估、下调出价、人数放大、并购傲慢筛选。

:::tabs
@@模型1 胜者高估（顺序统计）
\(n\) 人独立 \(\mathcal{N}(0,\sigma^2)\) 误差，胜者期望高估 \(\approx\sigma\cdot\mathbb{E}[Z_{(n)}]\)。默认 \(n=5,\sigma=20\) → \(\mathbb{E}[Z_{(5)}]\approx\mathbf{1.163}\) → 高估 **23.3**；相对 \(V=100\)，天真成交期望利润 **−23.3**。【推论】

:::raw
<div class="tool" id="tool-bias">
  <div class="ctrl">
    <label>竞买人数 n <output id="bias_nO">5</output></label>
    <input type="range" id="bias_n" min="2" max="12" step="1" value="5"/>
    <label>信号噪声 σ <output id="bias_sO">20</output></label>
    <input type="range" id="bias_s" min="5" max="40" step="1" value="20"/>
    <label>真值 V（示意） <output id="bias_vO">100</output></label>
    <input type="range" id="bias_v" min="50" max="200" step="1" value="100"/>
  </div>
  <div class="readout">
    <div class="ro">E[Z<sub>(n)</sub>] <b id="bias_z">1.163</b></div>
    <div class="ro">胜者期望高估 <b id="bias_over">23.3</b></div>
    <div class="ro">天真期望利润 <b id="bias_pi">-23.3</b></div>
    <div class="ro">高估/V <b id="bias_pct">23.3%</b></div>
    <div id="bias_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="biasChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型2 下调出价
平坦先验示意下，条件价值 \(\approx X-\sigma E[Z_{(n)}]\)；再取「条件价值」为理性上限出价（忽略额外一价战略压价）。默认 \(X=120,n=5,\sigma=20\) → 下调 **23.3** → 建议出价上限 **96.7**。【推论】

:::raw
<div class="tool" id="tool-shade">
  <div class="ctrl">
    <label>你的信号 X <output id="sh_xO">120</output></label>
    <input type="range" id="sh_x" min="60" max="180" step="1" value="120"/>
    <label>竞买人数 n <output id="sh_nO">5</output></label>
    <input type="range" id="sh_n" min="2" max="12" step="1" value="5"/>
    <label>噪声 σ <output id="sh_sO">20</output></label>
    <input type="range" id="sh_s" min="5" max="40" step="1" value="20"/>
  </div>
  <div class="readout">
    <div class="ro">下调幅度 <b id="sh_d">23.3</b></div>
    <div class="ro">条件价值≈出价上限 <b id="sh_b">96.7</b></div>
    <div class="ro">天真出价(=X) <b id="sh_naive">120</b></div>
    <div class="ro">差额 <b id="sh_gap">23.3</b></div>
    <div id="sh_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="shChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型3 人数放大（实验室结构）
固定 \(\sigma=20,V=100\)：比较不同 \(n\) 下天真期望利润。默认对照 \(n=3\) → **−16.9** 与 \(n=7\) → **−27.0**——人数↑，诅咒更深（与 Kagel–Levin「大市场更糟」同向）。【推论】【分析】

:::raw
<div class="tool" id="tool-nfx">
  <div class="ctrl">
    <label>人数 A <output id="nfx_aO">3</output></label>
    <input type="range" id="nfx_a" min="2" max="12" step="1" value="3"/>
    <label>人数 B <output id="nfx_bO">7</output></label>
    <input type="range" id="nfx_b" min="2" max="12" step="1" value="7"/>
    <label>噪声 σ <output id="nfx_sO">20</output></label>
    <input type="range" id="nfx_s" min="5" max="40" step="1" value="20"/>
  </div>
  <div class="readout">
    <div class="ro">A 天真利润 <b id="nfx_pa">-16.9</b></div>
    <div class="ro">B 天真利润 <b id="nfx_pb">-27.0</b></div>
    <div class="ro">差额 B−A <b id="nfx_diff">-10.1</b></div>
    <div class="ro">E[Z] A/B <b id="nfx_z">0.846 / 1.352</b></div>
    <div id="nfx_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="nfxChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型4 并购傲慢筛选
目标市值 \(M\)，估值误差 \(\varepsilon\sim\mathcal{N}(0,\sigma)\)，仅当估计 \(M+\varepsilon>M(1+p_{\min})\) 才出价（最低溢价门槛）。默认 \(M=100,\sigma=15,p_{\min}=20\%\) → 出价概率约 **9.1%**，条件于出价的期望溢价误差约 **+27.0**（点）——右尾被选中。【推论】

:::raw
<div class="tool" id="tool-ma">
  <div class="ctrl">
    <label>目标市值 M <output id="ma_mO">100</output></label>
    <input type="range" id="ma_m" min="50" max="200" step="1" value="100"/>
    <label>估值噪声 σ <output id="ma_sO">15</output></label>
    <input type="range" id="ma_s" min="5" max="40" step="1" value="15"/>
    <label>最低溢价门槛 % <output id="ma_pO">20</output></label>
    <input type="range" id="ma_p" min="0" max="50" step="1" value="20"/>
  </div>
  <div class="readout">
    <div class="ro">出价概率 <b id="ma_prob">9.1%</b></div>
    <div class="ro">条件期望误差 <b id="ma_err">+27.0</b></div>
    <div class="ro">门槛估计 <b id="ma_thr">120</b></div>
    <div class="ro">相对 M <b id="ma_pct">+27.0%</b></div>
    <div id="ma_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="maChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收 |
|---|---|---|
| L1 识咒 | 说出共同价值+坏消息 | 不与「别参与」混淆 |
| L2 会算 | 用 \(n,\sigma\) 算高估与下调 | 与模型1–2一致 |
| L3 选制 | 共同价值下优先公开学习格式 | 能写密封/英式对照 |
| L4 治组织 | 估计与出价分离+并购红队 | 流程落地一页纸 |

# 30分钟最小实践

1. 选一件你近期「竞价式」决策（竞标、抢人、并购意向、甚至抢限量）。（5 分）
2. 写：共同价值成分有多高？信号噪声从何而来？对手大约几人？（10 分）
3. 用本手册模型1：代入 \(n,\sigma\)，算出胜者期望高估。（10 分）
4. 把「条件价值」写进出价上限；若超过，明确接受「可能输」。（5 分）

验收：一页纸上有 \(n,\sigma\)、高估数、下调后上限——不是口号。【分析】

# 7天计划

| 天 | 动作 |
|---|---|
| D1 | 精读 CCC 1971 摘要 + Thaler JEP 异象文结构 |
| D2 | 手算 n=3,5,8 的 \(E[Z_{(n)}]\) 表 |
| D3 | 复盘罐子实验数字（\$8 / \$10.01） |
| D4 | 对比密封一价 vs 英式：信息流差异一页 |
| D5 | 找一例并购：溢价 vs 收购方公告日反应 |
| D6 | 写组织闸门：估计≠出价 |
| D7 | 用四个滑块各跑 3 组参数，记直觉校准 |

# 30天计划

| 周 | 主题 | 产出 |
|---|---|---|
| W1 | 统计核 | 自建 \(E[Z_{(n)}]\) 速查表 |
| W2 | 实验室 | 读书笔记：Kagel–Levin 人数效应 |
| W3 | 字段 | OCS/行业租赁或采购案例一则 |
| W4 | 组织 | 并购/竞标条件化检查表 v1 + 复盘会 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 共同价值 | 事后 \(V\) 共享，事前信号有噪 |
| 2 | 顺序统计诅咒 | 胜者 ≈ 最高信号 |
| 3 | 条件期望下调 | \(E[V\mid X,win]<E[V\mid X]\) |
| 4 | 人数放大 | \(n\uparrow\Rightarrow E[Z_{(n)}]\uparrow\) |
| 5 | 噪声放大 | \(\sigma\uparrow\Rightarrow\) 高估绝对值↑ |
| 6 | 矿物权 BNE | 按临界胜出条件化出价 |
| 7 | 英式信息外溢 | 公开退出缓解诅咒 |
| 8 | 公开信息双刃 | 有诅咒时卖方收入可降 |
| 9 | 傲慢假说 | 并购溢价含估值误差右尾 |
| 10 | 学习与破产 | 经验+出局改变市场平均 |

# 关键问题清单

:::details Q1 这是共同价值还是私有价值？
决定诅咒框架是否成立。【分析】
:::

:::details Q2 我的点估计无偏吗？胜出后还无偏吗？
后者才是出价该用的。【事实】
:::

:::details Q3 \(n\) 与 \(\sigma\) 各是多少？
下调的两根轴。【推论】
:::

:::details Q4 格式能否释放对手信息？
英式/多轮常优于纯密封。【分析】
:::

:::details Q5 估计流程是否直通出价？
要闸门。【分析】
:::

:::details Q6 赢的效用是否混入叙事/控制权？
委托代理放大诅咒。【分析】
:::

:::details Q7 不参与的 NPV 对照算了吗？
基准是 0，不是「赢了」。【分析】
:::

:::details Q8 联合信息是否合规可行？
降有效极值。【分析】
:::

:::details Q9 事后复盘是否专查「赢时高估」？
否则组织不学习。【分析】
:::

:::details Q10 我在读文献时，「诅咒」指亏损还是指条件差？
术语分裂。【事实】
:::

# 下一阶段探索

- 关联价值（affiliated values）与联动原理（linkage）：英式为何常抬卖方收入。【事实】
- 钱包博弈（wallet game）作为二人共同价值教学。【事实】
- 字段识别难题：低回报是诅咒还是卡特尔协调叙事？（Kagel 综述的争议）【分析】
- 多单位 / 组合拍卖中的诅咒变体。【分析】
- 与《逆向选择》《拍卖理论》《维克里拍卖》手册交叉阅读。【分析】

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 诅咒概念起源 | 行业论文 | Capen, Clapp, Campbell, *JPT* 1971 | 【事实】 |
| 罐子实验 | 实验 | Bazerman & Samuelson 1983；Thaler JEP 1988 转述 | 【事实】 |
| 人数效应 | 实验 | Kagel & Levin, *AER* 1986 | 【事实】 |
| 次高/最高≈2/3 | 二手转述 | Thaler 等对早期租赁出价分歧的描述 | 【待验证】 |
| 并购傲慢 | 理论/实证 | Roll, *Journal of Business* 1986；后续混合证据 | 【分析】 |
| \(E[Z_{(n)}]\) 表 | 自算 | 标准正态最大值数值积分（本手册脚本） | 【推论】 |
| 教学下调公式 | 示意模型 | \(X-\sigma E[Z_{(n)}]\)（平坦先验+胜者为最高信号） | 【推论】 |
| AI 军备类比 | 评论 | 公开财经评论中的隐喻用法 | 【假设】 |

标记：【事实】一手/多方一致；【分析】权威判断或机制推理；【推论】由模型导出；【假设】未验证；【待验证】单一来源或转述链。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，**不构成**投资、并购、投标或采购建议。交互模型为教学简化（正态误差、平坦先验、忽略部分战略压价），数值用于建立直觉，不替代尽职调查、工程估值或法律合规审查。字段拍卖与并购结果受制度、合谋、融资约束等多重因素影响，不能单用「赢家诅咒」一句话解释。你需对自己的出价与交易决策负责。
