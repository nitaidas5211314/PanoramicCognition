---
slug: 演化稳定策略（ESS）：不要求理性，只要求可复制——策略靠淘汰而非计算而胜出
title: 演化稳定策略（ESS）：不要求理性，只要求可复制
subtitle: 策略靠<strong>淘汰</strong>而非计算而胜出——ESS 不问「你是否理性算出最优」，只问「稀有突变能否入侵」。它是纳什均衡的精炼：每个 ESS 都是对称 NE，但<strong>不是每个 NE 都能扛住漂移与入侵</strong>。
brand_sub: ESS × Evolutionary Game Theory × Replicator
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, ESS, 演化稳定策略, 复制者动态, 鹰鸽博弈, Maynard Smith, 纳什均衡精炼]
theme_js_file: 演化稳定策略（ESS）：不要求理性，只要求可复制——策略靠淘汰而非计算而胜出.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**演化稳定策略（Evolutionarily Stable Strategy, ESS）**：若几乎全体成员都采用策略 \(I\)，则任何稀有突变策略 \(J\) 在自然选择下都无法入侵——\(I\) 靠**可复制的适应度优势**站住，不要求个体会算博弈。【事实】

Maynard Smith & Price（1973 *Nature*「The Logic of Animal Conflict」）给出经典条件：对一切 \(J\neq I\)，要么 \(E(I,I)>E(J,I)\)（一阶严格优），要么 \(E(I,I)=E(J,I)\) 且 \(E(I,J)>E(J,J)\)（二阶抗漂移）。【事实】每个 ESS 都是对称纳什均衡；严格 NE 一定是 ESS；但存在「弱 NE」可被中性漂移打开缺口后被淘汰。【事实】【分析】

默认教学参数（鹰鸽）：\(V=50,\,C=100\) → 混合 ESS 的鹰频率 \(p^*=V/C=0.50\)，均衡期望支付 \(12.5\)，全鸽分享 \(25\)——群体在 ESS 上**严格帕累托劣于**全鸽。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「聪明人如何算最优」，而是：**在复制、突变与选择下，哪些行为表型能抵抗入侵**。支付被解释为适应度贡献（或相对增长率），「解」是不可入侵性，不是理性共识。

边界：

- **在界内**：ESS 定义（2.4a/b）、与 NE 的包含关系、2×2 分类、鹰鸽混合 ESS \(p^*=V/C\)、复制者动态、演化稳定态（种群多态）vs 个体混合 ESS、方法论局限（静态 vs 动态）。
- **在界外**：具体物种行为学细节、某只股票买卖点、需要完全理性共同知识的经典求解——除非压成「策略是否可入侵」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 策略/表型在选择压力下的不可入侵性 |
| 2 | 边界在哪 | 到支付 + 种群动态可形式化为止 |
| 3 | 核心对象 | ESS、突变、适应度、复制者方程、吸引盆 |
| 4 | 参与者 | 基因/文化表型、企业惯例、交易策略、制度规范 |
| 5 | 关键变量 | 支付矩阵、突变频率 \(\varepsilon\)、种群结构、学习规则 |
| 6 | 可直接观察 | 行为频率、冲突结果、市场占有率、规范遵从率 |
| 7 | 无法直接观察 | 真实适应度尺度、隐性突变池、吸引盆边界 |
| 8 | 谁影响谁 | 频率 → 相对适应度 → 频率变化 → 可否入侵 |
| 9 | 因果关系 | 一阶/二阶 ESS 条件 ⇒ 局部抗突变；动态决定能否到达 |
| 10 | 只是相关 | 「常见」≠ ESS；流行可相关于路径依赖【分析】 |
| 11 | 表层现象 | 有限打斗、礼仪化冲突、惯例、文化规范、策略淘汰 |
| 12 | 底层机制 | 相对增长率差驱动复制；不可入侵 = 局部适应度峰 |
| 13 | 有反馈吗 | 有。频率改变平均支付，再反馈到增长率 |
| 14 | 有延迟吗 | 有。世代重叠、学习滞后、制度惯性 |
| 15 | 正/负反馈 | 协调博弈可正反馈锁死；频率依赖可负反馈回 ESS |

## 最关键的一句话

> ESS 问的不是「你会不会算」，而是：**当你几乎统治种群时，稀有的另一套做法还能不能涨上来。**

# 为什么值得研究

:::cards g3
### 它卸掉「理性共同知识」的重负
动物、惯例、文化规范、算法 agent 往往不会做无限递归推理；ESS 用选择代替计算。【事实】

### 它是 NE 的锋利精炼刀
找到对称 NE 只是起点；二阶条件把「中性可漂移」的弱均衡剔掉。【分析】

### 它连接生物、制度与市场淘汰
同一数学结构出现在动物冲突、社会规范演化、市场选择假说与文化传播偏差里。【推论】
:::

:::note amber 最贵的一次误判
把「已经是纳什均衡」当成「演化上安全」。弱 NE 在理性模型里「没人有严格动机偏离」，但在复制世界里，中性突变可漂到足够多，再靠二阶劣势把在位策略吃掉。【分析】
:::

# 世界地图

九层看 ESS 如何从「适应度支付」长成「动态与制度」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="essL9" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度 / 文化 / 市场选择 · 规范与策略的长期淘汰</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 方法论边界 · 静态 ESS ≠ 动态必达（Huttegger–Zollman）</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 结构扩展 · 非对称博弈 · 有限种群 · 空间结构</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 复制者动态 · ṗ = p(f−f̄)；吸引盆决定命运</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 多态稳定态 · 遗传多态 vs 个体混合 ESS</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 二阶条件 · E(I,I)=E(J,I) 时须 E(I,J)&gt;E(J,J)</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 与 NE 关系 · ESS ⊂ 对称 NE；严格 NE ⇒ ESS</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 不可入侵定义 · 稀有突变适应度劣势</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 支付 = 适应度 · 对称两人偶遇 · 无限无性种群原型</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L4**：会写两条件、会判弱 NE；进阶卡在 **L6→L8**：ESS 只保证局部抗入侵，不保证从任意初值到达，也不穷尽所有演化显著吸引子。【分析】
:::

# 核心概念地图

从抽象定义到可操作判据。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="essCmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="essCmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="100" y="16" width="480" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">不可入侵 → 一阶/二阶条件 → 频率动态检验</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">ESS · 适应度</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">2.4a/b · 复制者</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">判矩阵 · 画轨迹</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#essCmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#essCmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#essCmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">I 统治时 J 更差</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">或平手时打 J 更强</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">E(I,I)≥E(J,I)</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">等号 ⇒ 二阶严格</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">2×2 闭式分类</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">p*=V/C · 入侵差</text>

  <path d="M130 260 v30 H340 v-30" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#essCmB)"/>
  <text x="340" y="310" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：频率变了，谁「算赢」也可能变</text>
  <rect x="160" y="330" width="360" height="36" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="340" y="353" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">静态 ESS 过关 ≠ 动态一定收敛到它</text>
</svg>
:::

# 核心参与者

:::cards g3
### 理论奠基者
John Maynard Smith、George Price（1973）；Maynard Smith《Evolution and the Theory of Games》（1982）系统化。【事实】

### 动态扩展者
Taylor & Jonker（1978）复制者动态；此后 Weibull、Hofbauer & Sigmund 等把 ESS 接到动力系统。【事实】

### 应用与批评者
行为生态学家用鹰鸽/消耗战；经济学家用演化博弈解释规范与惯例（Young 等）；哲学家批评「只做静态精炼」的方法论（Huttegger & Zollman）。【分析】

### 今日「玩家」
制度设计者、平台规则制定者、策略型交易/agent 系统、企业文化与规范变革推动者——凡关心「稀有异见能否长成主流」。【推论】
:::

# 核心变量

| 变量 | 含义 | 杠杆作用 |
|---|---|---|
| \(E(X,Y)\) | \(X\) 对 \(Y\) 的期望适应度 | ESS 条件的原材料 |
| \(\varepsilon\) | 突变/入侵者频率 | 定义要求对充分小 \(\varepsilon\) 成立 |
| \(V,C\) | 资源价值 / 打斗成本（鹰鸽） | \(p^*=V/C\)；\(V\ge C\) 时纯鹰 ESS |
| \(p\) | 某策略当前频率 | 复制者状态变量 |
| \(f-\bar f\) | 相对适应度 | 决定 \(\dot p\) 符号 |
| 种群结构 | 配对相关、空间、有限规模 | 可改写有效支付与 ESS |
| 学习/选择规则 | 复制者、最优反应、模仿 | 吸引盆可几乎不相交【分析】 |

:::note green 默认数字锚点
下文交互默认：鹰鸽 \(V=50,\,C=100\) → \(p^*=0.50\)，\(\bar f^*=12.5\)，全鸽 \(25\)，全鹰 \(-25\)；入侵者频率 \(\varepsilon=0.10\) 时，纯鹰或纯鸽相对混合 ESS 的适应度差约为 \(-1.25\)（突变更差）。【事实】
:::

# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="essCa" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="essCb" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="90" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">支付矩阵 A</text>
  <rect x="200" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="270" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">相对适应度</text>
  <rect x="380" y="30" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="450" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">频率变化 ṗ</text>
  <rect x="520" y="30" width="140" height="50" rx="8" fill="#15181d"/><text x="590" y="60" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">ESS / 淘汰</text>
  <line x1="160" y1="55" x2="198" y2="55" stroke="#1d4ed8" marker-end="url(#essCa)"/>
  <line x1="340" y1="55" x2="378" y2="55" stroke="#1d4ed8" marker-end="url(#essCa)"/>
  <line x1="520" y1="55" x2="518" y2="55" stroke="#1d4ed8"/><line x1="520" y1="55" x2="558" y2="55" stroke="#1d4ed8" marker-end="url(#essCa)"/>

  <rect x="80" y="140" width="200" height="44" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="180" y="167" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">弱 NE：E(I,I)=E(J,I)</text>
  <rect x="360" y="140" width="240" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="480" y="167" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">漂移抬高 ε → 二阶决胜负</text>
  <line x1="280" y1="162" x2="358" y2="162" stroke="#d5342c" stroke-dasharray="4 3" marker-end="url(#essCb)"/>

  <text x="340" y="230" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实线 = 因果主链；红虚线 = 反馈/漂移通道</text>
  <text x="340" y="260" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">C&gt;V ⇒ 混合 ESS；V≥C ⇒ 纯鹰 ESS（鹰鸽）</text>
</svg>
:::

因果要点：

1. **支付差驱动选择**：\(f_i>\bar f\) 的策略扩张。【事实】
2. **一阶 ESS = 严格优于一切突变（对自身）**：直接挡住入侵。【事实】
3. **二阶 ESS = 平手时打突变更狠**：挡住「先漂移、再反超」。【事实】
4. **动态路径独立**：同一 ESS 可从大吸引盆进入，也可几乎达不到——静态条件不负责「怎么到」。【分析】

# 隐藏关系

:::cards g2
### ESS ⊂ 对称 NE，但 ≠「理性共识」
ESS 的存在性证明常借用 NE 语言，但动机假设完全不同：选择替代共同知识。【事实】

### 个体混合 ESS ≠ 种群多态稳定态
严格说，ESS 是个体采用的混合策略；遗传多态可处在演化稳定**状态**，却无人采用该混合。【事实】

### 全鸽更好，却不是 ESS
鹰鸽在 \(C>V\) 时，全鸽平均支付 \(V/2\) 高于混合 ESS 的 \(V(C-V)/(2C)\)，但纯鸽可被稀有鹰入侵。【事实】

### 「无 ESS」仍可演化
猜拳式循环、集合稳定、椭圆吸引——非 ESS 吸引子可以演化显著（Huttegger & Zollman 等）。【分析】
:::

# 系统运行机制

:::tabs
@@一阶条件
\(E(I,I)>E(J,I)\)：在几乎全是 \(I\) 的世界里，突变 \(J\) 一上来就吃亏。严格纳什 ⇒ 自动满足，故严格 NE 都是 ESS。【事实】

@@二阶条件
若 \(E(I,I)=E(J,I)\)，则必须 \(E(I,J)>E(J,J)\)。否则 \(J\) 可中性漂到不可忽视的频率，再在 \(J\)-\(J\) 相遇中占优。【事实】

@@复制者方程
两策略时 \(\dot p = p(1-p)(f_1-f_2)\)。鹰鸽：\(\dot p = p(1-p)(V-Cp)/2\)。内部不动点 \(p^*=V/C\)（需 \(C>V\)）局部渐近稳定，且与混合 ESS 重合。【事实】

@@Bishop–Cannings
2×2 内部点稳定当且仅当 \(a+d < b+c\)（反协调）。协调博弈则两纯策略可为 ESS，内部点不稳定。【事实】
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="essT" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1973</text><text x="80" y="145" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">ESS 提出</text>
  <circle cx="220" cy="110" r="10" fill="#1d4ed8"/><text x="220" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1978</text><text x="220" y="145" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">复制者动态</text>
  <circle cx="360" cy="110" r="10" fill="#b8730a"/><text x="360" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1982</text><text x="360" y="145" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">专著系统化</text>
  <circle cx="500" cy="110" r="10" fill="#5b8def"/><text x="500" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1990s+</text><text x="500" y="145" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">经济/规范应用</text>
  <circle cx="620" cy="110" r="10" fill="#15181d"/><text x="620" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">2010s+</text><text x="620" y="145" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">动态方法论批评</text>
  <line x1="90" y1="110" x2="208" y2="110" stroke="#1d4ed8" marker-end="url(#essT)"/>
  <line x1="230" y1="110" x2="348" y2="110" stroke="#1d4ed8" marker-end="url(#essT)"/>
  <line x1="370" y1="110" x2="488" y2="110" stroke="#1d4ed8" marker-end="url(#essT)"/>
  <line x1="510" y1="110" x2="608" y2="110" stroke="#1d4ed8" marker-end="url(#essT)"/>
  <text x="340" y="195" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">时间轴：概念 → 动态 → 跨学科 → 边界反思</text>
</svg>
:::

种群内的时间尺度：复制者连续近似下，默认 \(V=50,C=100\)、欧拉步长 \(0.1\) 时，从 \(p=0.05\) 或 \(0.95\) 到距 \(p^*\) 约 \(0.01\) 量级只需约 **4** 步——说明该参数下回拉很强；换学习规则或弱选择，时间尺度会差数量级。【推论】【待验证】

# 利益与激励

谁在 ESS 世界里「赢」？

| 角色 | 激励 | ESS 含义 |
|---|---|---|
| 在位策略 \(I\) | 保持不可入侵 | 一阶/二阶条件成立 |
| 突变 \(J\) | 在稀有时相对适应度 >0 | 被 ESS 定义禁止 |
| 群体整体 | 往往想要更高平均支付 | 可与 ESS **冲突**（鹰鸽帕累托隙） |
| 制度设计者 | 改支付以移动 ESS | 提高 \(C\)、降低 \(V\)、改变配对 |
| 挑战者文化 | 先制造相关/聚类再扩散 | 绕开「随机稀有突变」假设【分析】 |

:::note red 激励错位
个体层面「可复制的赢」可以系统性地牺牲群体平均福利。ESS 稳定 ≠ 社会合意——这是机制设计要动手的地方。【分析】
:::

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="essFl" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="40" width="150" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="105" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">资源 V / 成本 C</text>
  <rect x="220" y="40" width="150" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="295" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">偶遇配对</text>
  <rect x="410" y="40" width="150" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="485" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">适应度结算</text>
  <rect x="265" y="150" width="150" height="60" rx="8" fill="#15181d"/><text x="340" y="185" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">频率更新</text>
  <line x1="180" y1="70" x2="218" y2="70" stroke="#1d4ed8" marker-end="url(#essFl)"/>
  <line x1="370" y1="70" x2="408" y2="70" stroke="#1d4ed8" marker-end="url(#essFl)"/>
  <line x1="485" y1="100" x2="360" y2="150" stroke="#1d4ed8" marker-end="url(#essFl)"/>
  <line x1="300" y1="150" x2="105" y2="100" stroke="#d5342c" stroke-dasharray="4 3" marker-end="url(#essFl)"/>
  <text x="340" y="240" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">信息流：谁与谁相遇、频率可见性，决定有效支付</text>
</svg>
:::

- **抽走的**：打斗成本 \(C\)、冲突损耗、错误配对带来的福利隙（ESS vs 全鸽差 \(12.5\) 在默认参数下）。【事实】
- **流入的**：资源 \(V\)、学习信号、规范制裁信息、制度规则变更。【分析】
- **关键瓶颈**：无限随机配对假设一旦被空间结构/亲缘打破，信息流改道，ESS 预测可翻转。【分析】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何锋利 | 操作提示 |
|---|---|---|---|
| 1 | 改 \(V/C\) | 直接移动 \(p^*\) | 提高冲突成本、降低争产价值 |
| 2 | 把弱 NE 升为严格 | 堵死二阶漂移 | 给偏差一点点惩罚/奖励差 |
| 3 | 改配对相关 | 合作/鸽策略可抵抗入侵 | 聚类、重复互动、声誉 |
| 4 | 扩大合意吸引盆 | 静态 ESS 不够 | 初值干预、示范、补贴过渡 |
| 5 | 选择规则设计 | 复制者≠最优反应 | 平台激励、模仿对象 |
| 6 | 突变供给管理 | \(\varepsilon\) 太大静态局部失效 | 合规、准入、实验沙盒 |
| 7 | 透明化频率 | 加速/减速收敛 | 公开占比 vs 隐蔽实验 |
| 8 | 非对称化角色 | 打破对称 ESS 框架 | 所有者–入侵者、先到后到 |
| 9 | 多群体耦合 | 改变有效矩阵 | 跨市场/跨部门联动 |
| 10 | 明确「稳定态 vs ESS」 | 避免概念误用 | 问清是个体混合还是多态 |

# 常见认知陷阱

:::details 1. 「ESS = 最理性的策略」
ESS 不要求理性计算；它要求在复制系统里扛得住突变。愚蠢但可复制的惯例可以是 ESS。【分析】
:::

:::details 2. 「是纳什均衡就演化安全」
弱 NE 允许中性替代；二阶条件失败就会被吃掉。ESS 是精炼，不是同义词。【事实】
:::

:::details 3. 「ESS 一定社会最优」
鹰鸽混合 ESS 的平均支付可远低于全鸽。稳定可以很贵。【事实】
:::

:::details 4. 「找到 ESS 就预测了结果」
还要问吸引盆、噪声、结构。静态不可入侵 ≠ 动态必达。【分析】
:::

:::details 5. 「混合 ESS 必须人人随机化」
种群半鹰半鸽的稳定态，与每个个体 50% 随机，动力学上可相似，生物学解释不同。【事实】
:::

:::details 6. 「无纯策略 ESS = 混乱」
可以有唯一混合 ESS；也可以是循环/集合稳定。先分类再下结论。【分析】
:::

:::details 7. 「把 Chicken 的承诺故事直接叫 ESS」
承诺改的是博弈本身；ESS 是给定博弈下的抗入侵性。两者相关但层级不同。【推论】
:::

:::details 8. 「有限种群照搬无限 ESS」
漂移与固定概率改变结论；小群体要用有限种群修正。【分析】
:::

:::details 9. 「文化/市场 = 基因复制者」
传递偏差、选择性模仿、制度强制会改动力学；类比有用，等式危险。【分析】
:::

:::details 10. 「二阶条件可忽略」
教学里最容易只背一阶。弱均衡案例全栽在二阶上。【事实】
:::

<!-- nav:现实映射 -->
# 从抽象到现实

| 抽象 | 现实例子 | 操作含义 |
|---|---|---|
| 混合 ESS \(p^*=V/C\) | 有限打斗、仪式化展示 | 提高「认真打」的成本可降低攻击频率 |
| 弱 NE 非 ESS | 「大家都可以、谁先变谁吃亏」的空洞惯例 | 需要一点点奖惩差才能稳住 |
| 帕累托劣 ESS | 军备/价格战强度停在痛苦均衡 | 改支付或改配对，而不是喊口号 |
| 复制者收敛 | 策略回测后资金占比迁移 | 看相对增长率，不只看绝对收益【待验证】 |
| 吸引盆 | 规范从示范社区扩散 | 先堆临界质量再谈全局 |

# 从理论到行动

:::cards g3
### 诊断题
这是对称两人偶遇吗？支付差是否频率依赖？你以为的「均衡」是严格的还是弱的？【分析】

### 计算题
写出 2×2；判纯 ESS；算内部 \(x^*=(d-b)/((a-c)+(d-b))\)；查 \(a+d?b+c\)。【事实】

### 干预题
你要移 \(p^*\)、扩吸引盆，还是制造相关配对？三者工具不同。【推论】
:::

:::raw
:::raw
<div class="tool" id="tool_cl">
  <div class="ctrl">
    <label>a（1 vs 1） <output id="cl_aO">-25</output></label>
    <input type="range" id="cl_a" min="-50" max="50" step="1" value="-25"/>
    <label>b（1 vs 2） <output id="cl_bO">50</output></label>
    <input type="range" id="cl_b" min="-50" max="50" step="1" value="50"/>
    <label>c（2 vs 1） <output id="cl_cO">0</output></label>
    <input type="range" id="cl_c" min="-50" max="50" step="1" value="0"/>
    <label>d（2 vs 2） <output id="cl_dO">25</output></label>
    <input type="range" id="cl_d" min="-50" max="50" step="1" value="25"/>
  </div>
  <div class="readout">
    <div class="ro">纯1 ESS <strong id="cl_p1">否</strong></div>
    <div class="ro">纯2 ESS <strong id="cl_p2">否</strong></div>
    <div class="ro">混合 x* <strong id="cl_x">0.50</strong></div>
    <div class="ro">内部稳定 <strong id="cl_st">是</strong></div>
    <div id="cl_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="cl_vh">默认鹰鸽：两纯皆非 ESS，混合 ESS 在 0.50</span></div>
  </div>
  <canvas id="clChart" height="214"></canvas>
</div>
:::
:::

# 技能树

:::details Ⅰ 入门：会背两条件
能陈述 2.4a/b；能说明 ESS 与理性共同知识无关；能举鹰鸽 \(p^*=V/C\)。【事实】
:::

:::details Ⅱ 熟练：会判 2×2
对任意 \(a,b,c,d\) 判定纯/混 ESS；能指出弱 NE 反例；能算帕累托隙。【事实】
:::

:::details Ⅲ 进阶：接上动态
会写复制者、画轨迹、谈吸引盆；知道静态 ESS 方法论的边界。【分析】
:::

:::details Ⅳ 迁移：改结构
会用配对相关、非对称角色、制度支付改写「什么可入侵」。【推论】
:::

# 游戏化世界

你进入的不是「智囊推演室」，而是**复制竞技场**：

- **生命值** = 相对适应度缓冲
- **经验** = 识别博弈类型（协调 / 反协调 / 困局）
- **装备** = \(V,C\) 旋钮、配对相关、奖惩差
- **Boss** = 弱均衡伪装成的「没人想动」+ 帕累托劣稳定态
- **通关** = 能解释为何某惯例扛得住异见，或设计一次改支付实验

# 任务系统

| 任务 | 难度 | 验收 |
|---|---|---|
| 用自己的话讲清 ESS 不需要理性 | ★ | 30 秒口述无「算纳什」依赖 |
| 手算默认鹰鸽 \(p^*\) 与 \(\bar f^*\) | ★ | 得 0.50 与 12.5 |
| 构造一个 NE 但非 ESS 的 2×2 | ★★ | 一阶平、二阶失败 |
| 调高 \(C\) 观察 \(p^*\) 下降 | ★★ | 滑块与公式一致 |
| 写一条「改支付移 ESS」的制度草案 | ★★★ | 含前后 \(p^*\) 对比 |

<!-- nav:模拟与实践 -->
# 反事实模拟

:::tabs
@@若冲突成本翻倍
\(C:100\to200\)，\(V=50\) → \(p^*:0.50\to0.25\)，\(\bar f^*:12.5\to18.75\)，帕累托隙 \(25-18.75=6.25\)（缩小）。【事实】

@@若资源更值钱
\(V:50\to80\)，\(C=100\) → \(p^*=0.80\)，\(\bar f^*=8\)，隙 \(40-8=32\) 扩大——更「鹰」、更痛苦。【事实】

@@若 V≥C
\(V=120,C=100\) → 纯鹰是 ESS；鸽无法入侵。世界变成永久升级。【事实】

@@若只停留在弱 NE
矩阵 \(\begin{pmatrix}1&0\\1&1\end{pmatrix}\)：策略1是对称 NE 但非 ESS；策略2是严格 NE/ESS。理性叙事说「可以停在1」，演化叙事说「撑不久」。【事实】
:::

:::raw
:::raw
<div class="tool" id="tool_hd">
  <div class="ctrl">
    <label>资源 V <output id="hd_vO">50</output></label>
    <input type="range" id="hd_v" min="10" max="150" step="1" value="50"/>
    <label>成本 C <output id="hd_cO">100</output></label>
    <input type="range" id="hd_c" min="20" max="200" step="1" value="100"/>
    <label>入侵 ε <output id="hd_eO">0.10</output></label>
    <input type="range" id="hd_e" min="0.01" max="0.40" step="0.01" value="0.10"/>
  </div>
  <div class="readout">
    <div class="ro">p* <strong id="hd_p">0.50</strong></div>
    <div class="ro">ESS 支付 <strong id="hd_m">12.5</strong></div>
    <div class="ro">全鸽支付 <strong id="hd_d">25.0</strong></div>
    <div class="ro">帕累托隙 <strong id="hd_g">12.5</strong></div>
    <div id="hd_vrow" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="hd_vh">混合 ESS；ε=0.10 时纯鹰入侵差 −1.25</span></div>
  </div>
  <canvas id="hdChart" height="214"></canvas>
</div>
:::
:::

:::raw
:::raw
<div class="tool" id="tool_rp">
  <div class="ctrl">
    <label>初值 p₀ <output id="rp_p0O">0.10</output></label>
    <input type="range" id="rp_p0" min="0.02" max="0.98" step="0.01" value="0.10"/>
    <label>资源 V <output id="rp_vO">50</output></label>
    <input type="range" id="rp_v" min="10" max="150" step="1" value="50"/>
    <label>成本 C <output id="rp_cO">100</output></label>
    <input type="range" id="rp_c" min="20" max="200" step="1" value="100"/>
  </div>
  <div class="readout">
    <div class="ro">p* <strong id="rp_ps">0.50</strong></div>
    <div class="ro">终值 p<sub>T</sub> <strong id="rp_pt">0.50</strong></div>
    <div class="ro">|p<sub>T</sub>−p*| <strong id="rp_err">0.00</strong></div>
    <div class="ro">类型 <strong id="rp_ty">混合回拉</strong></div>
    <div id="rp_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="rp_vh">从 0.10 被拉回混合 ESS 0.50</span></div>
  </div>
  <canvas id="rpChart" height="214"></canvas>
</div>
:::
:::

:::raw
:::raw
<div class="tool" id="tool_wk">
  <div class="ctrl">
    <label>E(I,I)=E(J,I) <output id="wk_eqO">1.0</output></label>
    <input type="range" id="wk_eq" min="0" max="5" step="0.1" value="1.0"/>
    <label>E(I,J) <output id="wk_ijO">0.0</output></label>
    <input type="range" id="wk_ij" min="0" max="5" step="0.1" value="0.0"/>
    <label>E(J,J) <output id="wk_jjO">1.0</output></label>
    <input type="range" id="wk_jj" min="0" max="5" step="0.1" value="1.0"/>
  </div>
  <div class="readout">
    <div class="ro">一阶（NE） <strong id="wk_ne">过</strong></div>
    <div class="ro">二阶（ESS） <strong id="wk_ess">不过</strong></div>
    <div class="ro">判定 <strong id="wk_lab">弱 NE · 非 ESS</strong></div>
    <div class="ro">二阶差额 <strong id="wk_df">-1.0</strong></div>
    <div id="wk_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="wk_vh">E(I,J)−E(J,J)=−1.0 &lt; 0 → 漂移后 J 占优</span></div>
  </div>
  <canvas id="wkChart" height="214"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收项目 |
|---|---|---|
| L1 | 概念分离 | ESS / NE / 社会最优 三者分清 |
| L2 | 计算 | 任意 2×2 分类 + 鹰鸽公式 |
| L3 | 动态 | 复制者轨迹 + 吸引盆叙事 |
| L4 | 设计 | 提出可移 ESS 或扩盆的干预并估算前后数字 |

# 30分钟最小实践

1. 选一个你关心的「惯例/策略冲突」（开会打断、价格战、开源贡献规范等）。
2. 压成 2×2：强硬/温和 或 遵守/偏离。
3. 粗估支付（相对分即可），用模型①看是否有纯/混 ESS。
4. 若像鹰鸽，估 \(V/C\)，写出「若把冲突成本提高 20%，\(p^*\) 怎么变」。
5. 产出：**一张手写矩阵 + 一个 \(p^*\)（或「纯 ESS」结论）+ 一条改支付建议**。成本接近 0，可验证。

# 7天计划

| 天 | 焦点 | 产出 |
|---|---|---|
| D1 | 定义与两条件 | 卡片：2.4a / 2.4b |
| D2 | ESS vs NE | 一个弱 NE 反例矩阵 |
| D3 | 鹰鸽公式 | \(p^*\)、\(\bar f^*\)、隙 手算 |
| D4 | 复制者 | 跑模型③ 三组初值截图笔记 |
| D5 | 跨域同构 | 写 3 条「生物↔制度↔市场」映射 |
| D6 | 方法论边界 | 读 Huttegger–Zollman 摘要三点 |
| D7 | 复盘 | 把 30 分钟实践升级成一页备忘 |

# 30天计划

- **周1**：吃透定义、包含关系、2×2 全部分类。
- **周2**：鹰鸽 + 消耗战直觉；专练帕累托劣稳定。
- **周3**：复制者与吸引盆；对比最优反应动态（只需定性）。
- **周4**：选一个真实组织惯例，做「支付审计 → ESS 诊断 → 干预试点设计」。

<!-- nav:模型与问题 -->
# 10 个核心模型

1. **ESS 两条件（Maynard Smith）** — 不可入侵的充要骨架。
2. **严格 NE ⇒ ESS** — 最快判定捷径。
3. **弱 NE 漂移缺口** — 二阶条件的存在理由。
4. **鹰鸽混合 ESS \(p^*=V/C\)** — 频率依赖冲突的闭式解。
5. **Bishop–Cannings \(a+d<b+c\)** — 2×2 内部稳定判据。
6. **复制者 \(\dot p=p(f-\bar f)\)** — 选择动力学最小模型。
7. **帕累托隙 \(\frac{V}{2}-\frac{V(C-V)}{2C}\)** — 稳定与合意的裂缝。
8. **多态稳定态 vs 个体混合 ESS** — 解释层级防混。
9. **市场/文化选择类比** — 策略占比随相对表现更新。【分析】
10. **静态精炼之限** — 非 ESS 吸引子亦可演化显著。【分析】

# 关键问题清单

:::details 我的「均衡」是严格的还是弱的？
查偏离是否严格更差。若只是一样好，立刻做二阶检验。
:::

:::details 群体平均支付能否更高？
算合意点与 ESS 点之差。差大 → 制度空间大。
:::

:::details 初值在哪个吸引盆？
协调型双 ESS 时，历史与示范决定命运。
:::

:::details 配对是随机的吗？
相关配对可救合作/鸽策略。
:::

:::details 突变是稀有随机，还是有组织扩散？
ESS 局部定义可能被「成团入侵」绕开。
:::

:::details 角色对称吗？
所有者–挑战者非对称常改结论。
:::

:::details 用的是哪一种动态？
复制者与最优反应吸引盆可几乎不交。
:::

:::details 有限种群修正要不要？
N 小则漂移主导，ESS 近似变差。
:::

:::details 我在优化个体可复制性还是群体福利？
目标函数不同，工具不同。
:::

:::details 下一步是改支付、改结构，还是改初值？
三者对应不同杠杆（见第 13 节）。
:::

# 下一阶段探索

- 非对称 ESS / 角色条件 ESS
- 演化稳定集（ES set）、中性稳定策略（NSS）
- 随机稳定均衡（Young）与规范选择
- 空间博弈与结构化种群
- 与 Tit-for-Tat / 重复博弈阴影效应的接合
- 有限理性学习与实验博弈对 ESS 预测的检验

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| ESS 定义与两条件 | 经典论文/专著 | Maynard Smith & Price 1973；Maynard Smith 1982 | 【事实】 |
| ESS ⊂ 对称 NE；严格 NE⇒ESS | 综述 | Stanford Encyclopedia「Evolutionary Game Theory」 | 【事实】 |
| 鹰鸽 \(p^*=V/C\)、\(\bar f^*=V(C-V)/(2C)\) | 教材标准结果 | 演化博弈论通行推导；本手册 node 复算 | 【事实】 |
| 复制者与内部稳定 \(a+d<b+c\) | 标准结果 | Taylor–Jonker；Bishop–Cannings | 【事实】 |
| 静态 ESS 方法论局限 | 学术批评 | Huttegger & Zollman「The Limits of ESS Methodology」等 | 【分析】 |
| 规范/制度演化应用 | 综述 | Peyton Young 社会规范综述；文化演化制度文献 | 【分析】 |
| 市场选择与复制者类比 | 研究文献 | 内生状态下的 market selection；演化金融综述 | 【待验证】 |
| 2024 鹰鸽扩展（表型依赖支付） | 期刊 | BMC Ecol Evol 等「evolutionarily stable payoff matrix」线 | 【待验证】 |

标记约定：【事实】多方一致或可复算；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单源或外推。

# 免责声明 {.appendix}

本手册为认知与实践框架，用于理解演化稳定策略、频率依赖选择与制度/策略淘汰的结构逻辑，**不构成**投资建议、交易信号、生物防治方案、军事或公共政策处方。文中数值为教学默认参数与公式复算，不代表任何真实种群、市场或组织的估计。将文化/市场类比到基因复制者时存在机制差异，决策前需结合具体结构、法律与伦理约束单独论证。
