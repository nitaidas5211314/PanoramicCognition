---
slug: 极大极小定理（Minimax, von Neumann）：二人零和博弈中-最大化最小收益-与-最小化最大损失-必然相等，博弈论的起点定理
title: 极大极小定理（Minimax）：max min = min max，博弈论的起点
subtitle: 二人零和里，「最大化最坏收益」与「最小化最坏损失」在混合策略下<strong>必然相等</strong>——博弈有唯一价值；这是 von Neumann 1928 年证明的起点定理。
brand_sub: Minimax × Zero-Sum × von Neumann 1928
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 极大极小定理, Minimax, von Neumann, 零和博弈, 混合策略, 鞍点]
theme_js_file: 极大极小定理（Minimax, von Neumann）：二人零和博弈中-最大化最小收益-与-最小化最大损失-必然相等，博弈论的起点定理.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**极大极小定理（von Neumann Minimax Theorem, 1928）**：对任意有限二人零和博弈，行参与人在混合策略上「最大化最坏期望收益」等于列参与人「最小化最坏期望损失」——两边达到同一数值 \(v\)，称为**博弈的价值（value）**。【事实】

形式写法：若支付矩阵为 \(A\)，混合单纯形为 \(X,Y\)，则

\[\max_{x\in X}\min_{y\in Y} x^\top A y \;=\; \min_{y\in Y}\max_{x\in X} x^\top A y \;=\; v.\]

实现 \(v\) 的混合策略称为**最优策略（minimax / maximin strategies）**；在二人零和里，它们恰好是纳什均衡。【事实】

von Neumann 后来说：没有这一定理，就谈不上博弈的理论——「在证明它之前，我觉得没什么值得发表」。【待验证】（引述见 Kuhn 等人对 von Neumann 工作的综述转述）

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么赢某盘棋」，而是：**对抗性互动是否存在可担保的公平价格**——你保证至少拿到 \(v\)，对手保证你至多拿到 \(v\)，两边夹死。

边界：

- **在界内**：有限二人零和、纯策略鞍点 vs 混合扩展、安全水平、对偶 LP、与纳什的重合、Sion 等推广、搜索树中的 minimax / α-β。
- **在界外**：非零和「双赢」谈判、三人及以上联盟、具体某只股票买卖点——除非压成「对抗担保值是多少」。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 对抗下是否存在唯一可担保价值 \(v\) |
| 2 | 边界在哪 | 到「支付矩阵 + 混合单纯形」可形式化为止 |
| 3 | 核心对象 | 支付矩阵 \(A\)、安全水平、价值、最优混合、鞍点 |
| 4 | 参与者 | 行玩家（最大化）、列玩家（最小化）、规则设计者、算法 |
| 5 | 关键变量 | 矩阵元、混合概率、纯策略 gap、分支因子、搜索深度 |
| 6 | 可直接观察 | 比分、出价、招法选择、公开随机化频率 |
| 7 | 无法直接观察 | 真实混合意图、对方是否理性、实现噪声 |
| 8 | 谁影响谁 | 你的混合钉住对方最坏回应 → 对方混合钉住你的上界 |
| 9 | 因果关系 | 凸紧致 + 双线性支付 ⇒ maxmin = minmax |
| 10 | 只是相关 | 「常赢」≠ 达到价值；可能剥削了非最优对手 |
| 11 | 表层现象 | 猜拳、网球发球、军备对抗、棋类引擎剪枝 |
| 12 | 底层机制 | 鞍点 / 分离超平面 / LP 对偶 / 不动点 |
| 13 | 有反馈吗 | 有。结果更新信念 → 再调混合；偏离被剥削 |
| 14 | 有延迟吗 | 有。学习与实现误差使「瞬时价值」成过程 |
| 15 | 正/负反馈 | 可预测模式被剥削为正反馈；最优混合压剥削为负反馈 |

## 最关键的一句话

> 极大极小不是「最悲观的人赢」，而是证明：**对抗双方各自最坏情形下的最优，夹出同一个公平价格 \(v\)**。

# 为什么值得研究

:::cards g3
### 它是博弈论的数学出生证明
1928 年定理把「策略对抗」从轶事变成可证明对象；1944 *Theory of Games* 以此为基石。【事实】

### 它把「安全」变成可计算量
不问「若对方配合会怎样」，只问「对方全力伤害我时我能保多少」——保险、安检、对抗搜索同构。【分析】

### 它连接均衡、对偶与算法
零和 NE = 最优混合；价值 = LP 对偶间隙为零；棋类 α-β 是树上的同一逻辑。【事实】
:::

:::note amber 最贵的一次误判
在**非零和**里套用极大极小：把对方当绝对敌人，放弃正和交易——你得到的是「对抗担保」，却可能毁掉更大的联合剩余。先判类型（见《零和 vs 非零和》），再决定是否用 minimax。【分析】
:::

# 世界地图

九层看极大极小如何从「不等式」长成「算法与制度」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="mmArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 多智能体 / 对抗学习 · 从精确值到近似可利用度</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 搜索算法 · Minimax 树 + α-beta 剪枝</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 推广 · Sion / 无限策略 / 连续支付拟凹拟凸</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 计算 · 线性规划对偶：maxmin = minmax = v</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 与纳什重合 · 零和 NE 支付唯一且等于 v</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 定理 · 有限二人零和：max min = min max（混合）</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 混合扩展 · 安全水平曲线相交 → 鞍点</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 纯策略 · 常有 maxmin &lt; minmax（存在 gap）</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 二人零和 · 支付矩阵 A · 一方所得=另一方所失</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L3→L4**：纯策略常有缺口，混合把缺口夹死；进阶卡在 **L6→L8**——同一数学既是 LP 对偶，也是棋类引擎剪枝。
:::

# 核心概念地图

从抽象等式到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="180" y="16" width="320" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">支付矩阵 A（行得 = −列得）</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">maxmin 安全水平</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">minmax 上界</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">相等 ⇒ 价值 v</text>

  <line x1="280" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="200" width="280" height="56" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="180" y="234" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">纯策略常 gap：maxmin &lt; minmax</text>
  <rect x="360" y="200" width="280" height="56" rx="8" fill="#15181d"/><text x="500" y="234" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">混合后 gap=0 · 鞍点</text>

  <line x1="130" y1="152" x2="180" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#cmB)"/>
  <line x1="550" y1="152" x2="500" y2="200" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <text x="340" y="300" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">抽象：maxmin=minmax　·　机制：无差异/对偶　·　操作：解 2×2、LP、树上剪枝</text>
  <text x="340" y="330" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">红色虚线：纯策略缺口——混合的存在理由，不是「犹豫」</text>
</svg>
:::

# 核心参与者

:::cards g3
### 理论奠基者
Émile Borel 先讨论混合但未完成一般证明；von Neumann 1928 完成；Ville 1938 给出更初等证明；Morgenstern 1944 共著推广到经济行为。【事实】

### 算法与实证者
Shannon 棋类搜索；Knuth–Moore α-β；O'Neill / Brown–Rosenthal 实验检验；Walker–Wooders 温网发球近似 minimax。【事实】

### 你自己
抽检、竞标、对抗谈判、安全策略——只要「对方想伤害你的期望」，你就在算安全水平。【推论】
:::

# 核心变量

| 变量 | 含义 | 为什么重要 |
|---|---|---|
| 支付矩阵 \(A\) | 行对列的收益 | 改元 = 改价值与最优混合 |
| 混合 \(x,y\) | 单纯形上的概率 | 实现安全水平的工具 |
| 安全水平 \( \underline{v}(x)\) | \(\min_y x^\top Ay\) | 行玩家「最坏担保」 |
| 上界 \( \overline{v}(y)\) | \(\max_x x^\top Ay\) | 列玩家「最坏封顶」 |
| 价值 \(v\) | \(\underline{v}=\overline{v}\) | 定理的输出 |
| 纯策略 gap | \(\min\max-\max\min\)（纯） | 衡量「多需要混合」 |
| 可利用度 | 相对最优的期望损失 | 偏离 \(x^*\) 的代价 |
| 分支因子 / 深度 | 博弈树宽度与层数 | α-β 节省量级 |

<!-- nav:机制与激励 -->
# 因果关系

因果主链：

:::raw
<div class="flow"><span>零和矩阵 A</span><i>→</i><span>混合扩展</span><i>→</i><span class="hi">maxmin=minmax</span><i>→</i><span class="hi">价值 v</span><i>→</i><span>最优策略 / NE</span></div>
:::

**实线因果**：双线性期望支付 + 紧致凸策略集 ⇒ 鞍点存在 ⇒ 价值唯一。【事实】

**红色虚线反馈**：对方观察到你的可预测偏差 → 调整剥削 → 你的实现支付低于 \(v\)——偏离最优混合会被惩罚。【分析】

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="40" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="85" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">矩阵 A</text>
  <rect x="180" y="40" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="235" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">混合 x,y</text>
  <rect x="330" y="40" width="110" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="385" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">鞍点 v</text>
  <rect x="480" y="40" width="160" height="44" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="560" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">实现支付 / 招法</text>
  <line x1="140" y1="62" x2="180" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <line x1="290" y1="62" x2="330" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <line x1="440" y1="62" x2="480" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <path d="M560 84 L560 150 L85 150 L85 84" fill="none" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="5,4" marker-end="url(#cfB)"/>
  <text x="340" y="175" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：可预测偏差被观察 → 剥削 → 实现支付 &lt; v</text>
  <text x="340" y="200" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">实线=定理定义链；红虚线=行为/学习动力学</text>
</svg>
:::

# 隐藏关系

:::cards g2
### 先手不等于优势
不等式恒有 \(\max\min \le \min\max\)：「后动优势」直觉。定理说混合后两端相等——**信息优势被随机化抵消到价值上**。【事实】

### 最优混合常让对手无差异
\(x^*\) 往往使列的支撑纯策略期望相同；你不是「随便摇」，是在**封死对方的剥削方向**。【事实】

### 零和 NE 支付唯一
一般博弈多重 NE 可有不同支付；二人零和所有 NE 支付都等于 \(v\)——预测支付比预测行动更稳。【事实】

### 实验常拒绝精确混合
O'Neill（1987）及 Brown–Rosenthal（1990）重检：实验室选择常呈序列相关，不完全符合独立混合。【事实】温网发球等专业场景更接近。【分析】
:::

# 系统运行机制

1. **扩展**到混合策略（单纯形）；
2. **计算**每个混合的安全水平 \(\underline{v}(x)=\min_j (Ax)_j\)（对纯最优回应即可）；
3. **最大化**安全水平得 \(\underline{v}^*\)；对称地列最小化上界得 \(\overline{v}^*\)；
4. **定理保证** \(\underline{v}^*=\overline{v}^*=v\)；最优对 \((x^*,y^*)\) 为鞍点，亦即 NE。

2×2 闭式（\(A=\begin{bmatrix}a&b\\c&d\end{bmatrix}\)，分母 \(\Delta=a-b-c+d\neq0\)）：

\[p^*=\frac{d-c}{\Delta},\quad q^*=\frac{d-b}{\Delta},\quad v=\frac{ad-bc}{\Delta}.\]

经典例 \(A=\begin{bmatrix}2&-1\\-1&1\end{bmatrix}\)：\(p^*=q^*=0.4\)，\(v=0.2\)；纯策略 gap 为 \(1-(-1)=2\)。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="70" cy="100" r="10" fill="#0f8a4d"/><text x="70" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1921–27</text><text x="70" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Borel 混合</text>
  <circle cx="170" cy="100" r="10" fill="#1d4ed8"/><text x="170" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1928</text><text x="170" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">vN 定理</text>
  <circle cx="270" cy="100" r="10" fill="#3b6ef5"/><text x="270" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1938</text><text x="270" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Ville 初等证</text>
  <circle cx="370" cy="100" r="10" fill="#5b8def"/><text x="370" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1944</text><text x="370" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">TGEB 成书</text>
  <circle cx="470" cy="100" r="10" fill="#b8730a"/><text x="470" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1950</text><text x="470" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Shannon 搜索</text>
  <circle cx="580" cy="100" r="10" fill="#d5342c"/><text x="580" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1975+</text><text x="580" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">α-β / 实验</text>
  <line x1="80" y1="100" x2="160" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="180" y1="100" x2="260" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="280" y1="100" x2="360" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="380" y1="100" x2="460" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
  <line x1="480" y1="100" x2="570" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#tmA)"/>
</svg>
:::

后续：Sion（1958）等推广；Nash（1950）把存在性扩到非零和；现代引擎在 Shannon 类型 A/B 搜索上叠 NNUE / MCTS，但零和叶子回传仍是 minimax 逻辑。【分析】

# 利益与激励

| 角色 | 想要什么 | 与极大极小的关系 |
|---|---|---|
| 行玩家 | 提高最坏期望 | 求 \(x^*\) 使安全水平 = \(v\) |
| 列玩家 | 压低最坏期望 | 求 \(y^*\) 使上界 = \(v\) |
| 旁观者/裁判 | 公平可预期 | 价值 \(v\) 是「合理赔率」 |
| 算法工程师 | 少算节点仍正确 | α-β 保最优、砍冗余 |
| 非理性对手 | （未最优化） | 你仍至少得 \(v\)；或可超额剥削 |

激励核心：**担保不依赖对方善意**——只依赖对方「会选对你最坏的回应」。【推论】

# 资源与信息流

资金流「抽水」隐喻：纯策略缺口如何被混合「填平」，以及偏离如何被抽走超额。

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="140" height="60" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="110" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">纯策略 gap</text><text x="110" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">maxmin&lt;minmax</text>
  <rect x="270" y="30" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">混合填平</text><text x="340" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">两端夹到 v</text>
  <rect x="500" y="30" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="570" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">担保价值 v</text><text x="570" y="75" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">可交易/可定价</text>
  <line x1="180" y1="60" x2="270" y2="60" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#flA)"/>
  <line x1="410" y1="60" x2="500" y2="60" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#flA)"/>
  <rect x="150" y="140" width="380" height="70" rx="10" fill="#15181d"/><text x="340" y="170" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">信息流：随机化隐藏意图；资源流：偏离租金被对手抽走</text>
  <text x="340" y="195" text-anchor="middle" fill="#a8b0ba" font-size="11" font-family="sans-serif">例：[[2,-1],[-1,1]] 纯 gap=2，混合后 v=0.2</text>
</svg>
:::

经典矩阵上：纯策略安全水平只有 **−1**，混合后抬到 **0.2**——「随机化把最坏情形抬了 1.2」。【事实】


<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 |
|---|---|---|
| 1 | **先判是否零和** | 类型错则整套工具错位 |
| 2 | **算出价值 \(v\)** | 给出可担保基准，避免赌「对方犯错」 |
| 3 | **解最优混合 \(x^*\)** | 直接消除可利用度 |
| 4 | **改支付矩阵元** | 规则/奖惩改 \(v\) 与支撑集 |
| 5 | **缩小策略空间** | 剔除被严格支配的行动 |
| 6 | **隐藏随机源** | 防止对方读模式 |
| 7 | **α-β + 着法排序** | 同算力下更深搜索 |
| 8 | **对偶/LP 建模** | 大矩阵可计算 |
| 9 | **利用对方偏离** | 仅当确认非最优时超额 |
| 10 | **实验校准** | 专业场景 vs 实验室：勿外推过度 |

# 常见认知陷阱

:::details 陷阱 1 · 把极大极小当成「永远悲观」
它是对抗契约下的最优，不是性格悲观。非对抗场景应换工具。
:::

:::details 陷阱 2 · 纯策略找不到鞍点就说「没解」
定理保证混合后有解；缺口正是混合的理由。
:::

:::details 陷阱 3 · 以为 50-50 总是最优
只有对称矩阵（如猜硬币）如此；例题 \(p^*=0.4\)，不是 0.5。
:::

:::details 陷阱 4 · 把频率当独立混合
序列相关（赢后继续同一招）会被剥削；minimax 要求不可预测性。
:::

:::details 陷阱 5 · 零和直觉套到贸易/协作
正和交易被当成抢份额——毁掉 \(v\) 之外的剩余。【分析】
:::

:::details 陷阱 6 · 以为达到 \(v\) 就是「赢了」
\(v\) 可能是负的：最优只是「输得最少」。
:::

:::details 陷阱 7 · 忽略实现误差
理论混合要求精确概率；手指习惯与伪随机会留下可利用度。【分析】
:::

:::details 陷阱 8 · 把实验室拒绝当成定理破产
定理是规范/存在性结果；行为是否逼近是实证问题。【事实】
:::

:::details 陷阱 9 · 树上评价值当成真值
有限深度 + 启发评价只是近似 minimax；叶子错则整棵错。【分析】
:::

:::details 陷阱 10 · 多人零和直接套二人公式
三人以上常数和需另套解概念；不可直接抄 2×2 闭式。【事实】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象 | 现实机制 | 可操作动作 |
|---|---|---|
| 价值 \(v\) | 公平赔率 / 保本线 | 先算担保再谈冒险 |
| 最优混合 | 抽检、发球、出拳随机化 | 用真随机或洗牌 |
| 安全水平曲线 | 「最坏回应」压力测试 | 对每个方案问最坏 |
| α-β | 引擎剪枝 | 好着法先搜 |
| 可利用度 | 被读牌/被针对 | 审计自己的模式 |

# 从理论到行动

:::cards g3
### 诊断
写出对抗矩阵（或简化 2×2）。算纯 maxmin / minmax；看 gap。【推论】

### 求解
解混合 \(p^*,q^*,v\)（2×2 闭式或 LP）。写下「我保证至少 \(v\)」。【事实】

### 执行与审计
按 \(p^*\) 随机化；每周检查频率与序列相关；偏离则修。【分析】
:::

# 技能树

:::details ① 基础：纯策略鞍点与 gap
对矩阵算每行最小值取 max、每列最大值取 min；相等则有纯鞍点。
:::

:::details ② 中级：2×2 闭式与安全水平图
会用 \(p^*,q^*,v\) 公式；会画 \(\underline{v}(p)=\min_j(Ap)_j\) 并找峰。
:::

:::details ③ 高级：LP 对偶与零和 NE
把 maxmin / minmax 写成线性规划；理解与纳什重合。
:::

:::details ④ 专家：搜索树与行为校准
实现/理解 α-β；区分规范最优与实证逼近。
:::

# 游戏化世界

你是「价值仲裁员」：每个对抗场景，任务是标出纯策略 gap、混合价值 \(v\)、以及自己相对 \(x^*\) 的可利用度。得分不看「赢了几局」，看「最坏情形是否守住 \(v\)」。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| T1 算纯 gap | 对自制 2×2 报告 maxmin、minmax、gap |
| T2 解混合 | 写出 \(p^*,q^*,v\) 并验算无差异 |
| T3 画安全水平 | 至少 5 个 \(p\) 点，标出峰值 |
| T4 测可利用度 | 故意偏 \(p^*\) 0.2，算最坏损失增量 |
| T5 场景迁移 | 把一次真实对抗压成矩阵并给出 \(v\) |

# 反事实模拟

若禁止混合：许多矩阵无鞍点，定理失败——「有价值」依赖随机化。【事实】

若对手固定非最优：你的最优回应可超过 \(v\)；但若对方随后学习，超额消失。【推论】

若着法排序极差：α-β 退化成接近全树搜索，算力被浪费。【事实】

## 可调模型 1 · 安全水平 vs 混合概率

矩阵 \(A=\begin{bmatrix}2&-1\\-1&1\end{bmatrix}\)。行出上行概率为 \(p\) 时，对列两纯策略期望为 \(E_L=3p-1\)，\(E_R=1-2p\)，安全水平 \(\underline{v}(p)=\min(E_L,E_R)\)。峰值在 \(p^*=0.40\)，\(\underline{v}=0.20\)；纯策略端点只有 \(-1\)。

:::raw
<div class="tool" id="tool_sec">
  <div class="ctrl">
    <label>上行混合概率 p <output id="sec_pO">0.40</output></label>
    <input type="range" id="sec_p" min="0" max="1" step="0.01" value="0.40"/>
  </div>
  <div class="readout">
    <div class="ro">E vs L<strong id="sec_el">0.20</strong></div>
    <div class="ro">E vs R<strong id="sec_er">0.20</strong></div>
    <div class="ro">安全水平<strong id="sec_v">0.20</strong></div>
    <div id="sec_row" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="sec_vh">p=0.40 → 无差异，安全水平达峰值 0.20（=博弈价值）</span></div>
  </div>
  <canvas id="secChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 任意 2×2 求解器

滑块改 \(a,b,c,d\)，即时给出 \(p^*,q^*,v\) 与纯策略 gap。默认 \((2,-1,-1,1)\) → \(p^*=0.40,q^*=0.40,v=0.20\)，纯 gap **2.00**。

:::raw
<div class="tool" id="tool_22">
  <div class="ctrl">
    <label>a（上行左）<output id="m22_aO">2.0</output></label>
    <input type="range" id="m22_a" min="-3" max="5" step="0.1" value="2.0"/>
    <label>b（上行右）<output id="m22_bO">-1.0</output></label>
    <input type="range" id="m22_b" min="-3" max="5" step="0.1" value="-1.0"/>
    <label>c（下行左）<output id="m22_cO">-1.0</output></label>
    <input type="range" id="m22_c" min="-3" max="5" step="0.1" value="-1.0"/>
    <label>d（下行右）<output id="m22_dO">1.0</output></label>
    <input type="range" id="m22_d" min="-3" max="5" step="0.1" value="1.0"/>
  </div>
  <div class="readout">
    <div class="ro">p*<strong id="m22_p">0.400</strong></div>
    <div class="ro">q*<strong id="m22_q">0.400</strong></div>
    <div class="ro">价值 v<strong id="m22_v">0.200</strong></div>
    <div class="ro">纯 gap<strong id="m22_gap">2.00</strong></div>
    <div id="m22_row" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="m22_vh">混合最优：p*=0.40, q*=0.40, v=0.20；纯策略 gap=2.00</span></div>
  </div>
  <canvas id="m22Chart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 偏离可利用度

固定上述默认矩阵与 \(p^*=0.40\)。你选实际 \(p\)，对手选最坏纯回应时，你的支付相对 \(v\) 的缺口即**可利用度**。默认 \(p=0.40\) → 缺口 **0**；若 \(p=0.70\)，安全水平 \(-0.40\)，缺口 **0.60**。

:::raw
<div class="tool" id="tool_exp">
  <div class="ctrl">
    <label>你的实际上行概率 p <output id="exp_pO">0.40</output></label>
    <input type="range" id="exp_p" min="0" max="1" step="0.01" value="0.40"/>
  </div>
  <div class="readout">
    <div class="ro">安全水平<strong id="exp_sec">0.20</strong></div>
    <div class="ro">价值 v<strong id="exp_val">0.20</strong></div>
    <div class="ro">可利用度<strong id="exp_gap">0.00</strong></div>
    <div id="exp_row" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="exp_vh">p=0.40 = p* → 可利用度 0；守住价值</span></div>
  </div>
  <canvas id="expChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 博弈树：Minimax vs α-β（理想排序）

分支因子 \(b\)、深度 \(n\) 时，全 minimax 叶子约 \(b^n\)；理想着法排序下 α-β 约 \(b^{\lceil n/2\rceil}+b^{\lfloor n/2\rfloor}-1\)。默认 \(b=35,n=6\)（国际象棋量级示意）→ 全树约 **1.84×10⁹**，理想 α-β 约 **8.57×10⁴**，节省比约 **21438×**。【推论】（实际引擎介于两者之间，依赖排序质量。）

:::raw
<div class="tool" id="tool_ab">
  <div class="ctrl">
    <label>分支因子 b <output id="ab_bO">35</output></label>
    <input type="range" id="ab_b" min="2" max="40" step="1" value="35"/>
    <label>深度 n <output id="ab_nO">6</output></label>
    <input type="range" id="ab_n" min="2" max="8" step="1" value="6"/>
  </div>
  <div class="readout">
    <div class="ro">全 Minimax<strong id="ab_full">1.84e9</strong></div>
    <div class="ro">理想 α-β<strong id="ab_ab">8.57e4</strong></div>
    <div class="ro">节省比<strong id="ab_ratio">21438×</strong></div>
    <div id="ab_row" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ab_vh">b=35,n=6：理想剪枝把叶子从约 1.84e9 压到 8.57e4</span></div>
  </div>
  <canvas id="abChart" height="214"></canvas>
</div>
:::

:::tabs
@@禁止混合
纯策略常有 gap，无统一价值——定理前提被拆掉。

@@对手变笨
固定非最优 \(y\) 时你可超过 \(v\)；一旦对方学会，超额归零。

@@着法乱序
α-β 节省崩溃，算力换深度失败——排序是杠杆。
:::

# 四级能力路线

| 级别 | 能力 |
|---|---|
| L1 | 解释 maxmin≤minmax，并算出纯 gap |
| L2 | 手算 2×2 的 \(p^*,q^*,v\)，画安全水平 |
| L3 | 把大矩阵建成 LP；解释与零和 NE 重合 |
| L4 | 在真实对抗中执行混合并审计可利用度；理解 α-β |

# 30分钟最小实践

1. 选一件真实「对抗」（猜拳习惯、抽检、议价底线、球赛发球侧）。
2. 压成 2×2，粗填支付（−2…+2 即可）。
3. 算纯 gap；若 gap>0，用闭式或模型 2 求 \(v\) 与 \(p^*\)。
4. 写一句：**我的担保价值是 ____；若我总选纯策略 X，最坏会少拿 ____。**

成本≈0，产出=一张「对抗担保卡」。

# 7天计划

| 日 | 动作 |
|---|---|
| D1 | 重做例题 \([[2,-1],[-1,1]]\) 推导 |
| D2 | 自制矩阵算纯 gap + 混合 |
| D3 | 用模型 3 测三种偏离的可利用度 |
| D4 | 读 α-β 直觉，调模型 4 |
| D5 | 找一则「被读模式」案例笔记 |
| D6 | 对照《零和 vs 非零和》：何时不该用 minimax |
| D7 | 复盘：本周哪次决策没有问「最坏回应」 |

# 30天计划

周1：2×2 手算与安全水平图；周2：把工作中 3 个对抗建成矩阵并给出 \(v\)；周3：选一个场景执行随机化并记录频率；周4：阅读一篇实验批评（如 Brown–Rosenthal）半页笔记 + 对照专业场景。

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **Max-min 不等式**：恒有 \(\max\min\le\min\max\)。【事实】
2. **von Neumann 定理（1928）**：有限二人零和混合后相等。【事实】
3. **博弈价值 \(v\)**：双方可强制的唯一期望支付。【事实】
4. **鞍点 / 最优策略**：实现 \(v\) 的混合对。【事实】
5. **2×2 闭式**：\(p^*,q^*,v\) 用行列式型公式。【事实】
6. **LP 对偶表述**：行最大化下界、列最小化上界。【事实】
7. **零和 = 纳什特例**：最优混合即 NE，支付唯一。【事实】
8. **可利用度**：相对 \(v\) 的安全水平缺口。【推论】
9. **Minimax 搜索树**：极大–极小交替回传。【事实】
10. **α-β 剪枝**：不漏最优的分支界定。【事实】

# 关键问题清单

:::details Q1 这是不是二人零和（或常数和）？
不是则勿直接套极大极小当唯一解。
:::

:::details Q2 纯策略有没有鞍点？
有则 \(v\) 在纯策略达到；无则看 gap。
:::

:::details Q3 混合价值是多少？
算出 \(v\) 与 \(x^*,y^*\)。
:::

:::details Q4 我的实际频率距 \(x^*\) 多远？
估计可利用度。
:::

:::details Q5 随机化是否独立、不可预测？
查序列相关与可观察习惯。
:::

:::details Q6 对手是否接近最优？
非最优时可超额，但勿把侥幸当策略。
:::

:::details Q7 矩阵是否被规则改写？
奖惩、禁用选项如何移动 \(v\)。
:::

:::details Q8 需要搜索树吗？
序贯完美信息零和 → minimax / α-β。
:::

:::details Q9 行为证据支持吗？
实验室 vs 专业领域分开看。【分析】
:::

:::details Q10 最小干预是什么？
改一格支付、引入真随机、或先搜好着法。
:::

# 下一阶段探索

- 与《零和 vs 非零和》对照：类型开关
- 纳什均衡：非零和一般化
- 占优策略与反复剔除：简化矩阵
- 线性规划与对偶：计算大游戏
- 行为博弈：混合假设的实验边界

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 1928 定理原文 | 原始论文 | J. von Neumann, *Zur Theorie der Gesellschaftsspiele*, Math. Ann. 100 (1928) | 【事实】 |
| 定理地位与引述 | 综述 | Kuhn / AMS Bulletin 等对 von Neumann 博弈论工作的评述 | 【分析】 / 引述【待验证】 |
| 1944 成书 | 专著 | von Neumann & Morgenstern, *Theory of Games and Economic Behavior* | 【事实】 |
| Ville 初等证明 | 历史 | J. Ville, 1938；后续初等化传统 | 【事实】 |
| Sion 推广 | 论文 | M. Sion, *On general minimax theorems*, Pacific J. Math. 1958 | 【事实】 |
| 2×2 数值例 | 本手册推导 | \(A=[[2,-1],[-1,1]]\) → \(v=0.2,p^*=q^*=0.4\) | 【推论】 |
| O'Neill 实验 | 实验 | B. O'Neill, PNAS 1987 | 【事实】 |
| 实验重检 | 计量 | Brown & Rosenthal, *Econometrica* 1990 | 【事实】 |
| 温网发球 | 实证 | Walker & Wooders, AER 2001 | 【分析】 |
| α-β 复杂度 | 算法 | Knuth–Moore；Chess Programming Wiki 表述 | 【事实】 |
| 现代棋类引擎 | 技术综述 | Shannon 类型 A/B；Stockfish α-β+NNUE；AlphaZero MCTS 等 | 【分析】 |
| 2024 无搜索蒸馏 | 预印本/会议 | ChessBench 等将 Stockfish 价值近似蒸馏进 Transformer | 【待验证】 |

标记约定：【事实】多方一致或原始定义；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或转载链长。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，不构成投资、法律、军事、竞赛或商务决策建议。博弈模型高度简化；现实支付、信息与理性假设常被违反。把极大极小用于非零和场景可能导致系统性误判。据此行动的风险由读者自行承担。涉及监控、对抗或可能违法的用途时，须遵守所在司法辖区法律——模型描述不等于行动许可。
