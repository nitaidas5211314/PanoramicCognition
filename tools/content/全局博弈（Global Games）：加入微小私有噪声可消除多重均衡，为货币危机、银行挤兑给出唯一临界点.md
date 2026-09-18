---
slug: 全局博弈（Global Games）：加入微小私有噪声可消除多重均衡，为货币危机、银行挤兑给出唯一临界点
title: 全局博弈：微小私有噪声选出唯一临界点
subtitle: 完全信息下，货币攻击和银行挤兑在中间一段基本面上<strong>两个均衡都成立</strong>；每人只多一点私有噪声，迭代剔除就把这段压成<strong>一个可计算的临界点</strong>。
brand_sub: Global Games × Equilibrium Selection
kicker: Panoramic Cognition & Practice Engine
chips: 30 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 全局博弈, Global Games, 货币危机, 银行挤兑, 均衡选择, Morris-Shin]
theme_js_file: 全局博弈（Global Games）：加入微小私有噪声可消除多重均衡，为货币危机、银行挤兑给出唯一临界点.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**全局博弈（global game）**不是「全球博弈」，也不是全局最优。Carlsson 与 van Damme（1993）的定义是：真实支付从**一整类博弈**里随机抽出（参数 \(\theta\)），每人只看到带噪声的私有信号 \(x_i=\theta+\sigma\varepsilon_i\)。【事实】

完全信息时，货币钉住和活期存款合同在中间一段基本面上有**两个纯策略均衡**——全体攻击 / 全体不攻击，或全体挤兑 / 全体等待。任意小的私有噪声破坏「\(\theta\) 是共同知识」之后，迭代剔除严格劣势策略只留下**一个阈值**：攻击（或挤兑）当且仅当信号低于临界点。【事实】（Morris & Shin, *AER* 1998；Goldstein & Pauzner, *Journal of Finance* 2005）

本手册用的政权/挤兑教学式：成功当且仅当攻击比例 \(\alpha\ge\theta\)，攻击的成本收益比是 \(c\in(0,1)\)。平坦先验、噪声趋于 0 时，**基本面临界点 \(\theta^∗=1-c\)**，与噪声分布的形状无关。默认 \(c=0.30\) → \(\theta^∗=0.70\)：\(\theta\le 0.70\) 崩，\(\theta>0.70\) 守住。【事实】（拉普拉斯信念；Frankel, Morris & Pauzner 2003 的噪声无关选择）

把噪声从 0 再拧大一点，**崩不崩的基本面分界仍是 \(\theta^∗\)**；移动的是边际投机者的**信号阈值** \(x^∗=\theta^∗-\sigma\Phi^{-1}(c)\)。默认 \(c=0.30\)、\(\sigma=0.20\) → \(x^∗=0.8049\)。【推论】

真正把多重均衡请回来的，通常不是「噪声太小」，而是**公共信号太准**。线性投资例子里，唯一性条件是 \(\gamma(\sigma,\tau)\le 2\pi\approx 6.2832\)。【事实】（Morris & Shin 综述，公共 vs 私有信息）

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「危机会不会来」的新闻判断，而是：**当行动的收益取决于别人是否一起行动时，信息结构如何把「一整段都可能」收成「一个临界点」，以及这个临界点对成本、储备和公共广播怎么反应。**

边界：

- **在界内**：二元行动、战略互补、占优区夹着多重均衡区、私有/公共信号、拉普拉斯阈值、货币攻击、银行挤兑、债务展期、实验里的阈值策略。
- **在界外**：某国下周会不会贬值、某家银行的资本充足率测算、交易指令。那些要换数据，不能用本手册的 \(c\) 直接下单。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 不完备信息如何从多重均衡里选出唯一阈值 |
| 2 | 边界在哪 | 到「支付 + 信号结构」可写成阈值策略为止 |
| 3 | 核心对象 | \(\theta\)、信号 \(x_i\)、成本比 \(c\)、临界点 \(\theta^∗\) 或 \(\kappa\)、精度比 \(\gamma\) |
| 4 | 参与者 | 投机者、储户、央行/银行、大交易者、发布公共信号的人 |
| 5 | 关键变量 | \(c\)、私有噪声 \(\sigma\)、公共噪声 \(\tau\)、储备如何移动临界质量 |
| 6 | 可直接观察 | 利差、交易成本、提前支取罚则、官方声明、价格 |
| 7 | 无法直接观察 | 高阶信念、别人眼中的 \(\theta\)、真实临界质量函数 \(a(\theta)\) |
| 8 | 谁影响谁 | \(c\) 定 \(\theta^∗\)；公共精度定唯一还是多重；储备改的是战略反应不只是会计 |
| 9 | 因果关系 | \(c\uparrow\Rightarrow\theta^∗\downarrow\Rightarrow\) 协调型危机区间变窄 |
| 10 | 只是相关 | 「声明很响」与「危机变少」不一定同向：过准的公共信号可能恢复多重均衡【分析】 |
| 11 | 表层现象 | 几乎一样的基本面，有的钉住崩了、有的没崩；挤兑来得像突然 |
| 12 | 底层机制 | 共同知识断裂后，占优区从两端迭代咬到唯一切换点 |
| 13 | 有反馈吗 | 有。攻击成功本身制造更差的信号，引来更多攻击 |
| 14 | 有延迟吗 | 有。储备、合同、信息制度先定，危在实现 \(\theta\) 时才显现 |
| 15 | 正/负反馈 | 协调成功是正反馈；提高 \(c\) 或私有信息精度是把正反馈压回阈值的负向杠杆 |

## 最关键的一句话

> 噪声的作用不是「让人看不清所以乱选」，而是**拆掉共同知识**，让占优区的逻辑能一路传到中间，留下一个与 \(c\) 绑定的临界点。

# 为什么值得研究

:::cards g3
### 它把「太阳黑子」变成可比较的政策
Obstfeld（1996）式自我兑现危机在中间区两个均衡都对，政策几乎无法比较。Morris & Shin（1998）指出：唯一均衡依赖热钱规模和投机成本，才能讨论「加交易成本 / 加储备」【事实】

### 它给银行挤兑一个概率
Diamond–Dybvig（1983）说明挤兑可以是均衡，但算不出概率，也就无法问「银行究竟是否提高了福利」。Goldstein & Pauzner（2005）用噪声信号得到唯一阈值，挤兑概率随短期支付 \(r_1\) 上升【事实】

### 它警告「公开得越清楚越好」
私人信号把均衡收成一个；**过准的公共信号**可以把 \(\gamma\) 推过 \(2\pi\)，多重均衡回来。价格若把信息聚合得太干净，也会起同样的作用（Angeletos & Werning, *AER* 2006）【事实】
:::

:::note red 最贵的一次方向搞反
「信息越完美，越回到多重均衡」是错的。极限里**任意小的私有噪声仍然唯一**。请回多重均衡的是公共广播压过了私有信号，不是噪声消失。【事实】
:::

# 世界地图

九层：从「别人做我才划算」长到「信息制度是政策」。

:::raw
<svg viewBox="0 0 680 530" width="100%" style="max-width:680px">
  <defs>
    <marker id="ggMap" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 信息制度 · 公共广播的精度本身就是政策变量</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 失效边界 · 内生价格、非单调互补、任意高阶信念扰动</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 应用 · 货币攻击、挤兑、债务展期、最后贷款人</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 唯一阈值 · 政权模型 θ*=1−c；线性模型 κ=Φ(√γ(κ−y))</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 拉普拉斯捷径 · 临界点上把对手比例看成均匀分布</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 迭代剔除 · 占优区从两端咬进多重均衡区</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 共同知识断裂 · 私有噪声 x=θ+σε</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 三重区域 · θ 很差占优攻击 / 中间多重 / 很好占优不攻击</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 战略互补 · 别人攻击，我攻击的收益才上升</text>
</svg>
:::

:::note blue 读图要点
入门停在 **L2→L6**：先承认多重，再算 \(\theta^∗=1-c\)。进阶停在 **L8–L9**：唯一性是信息结构的性质，不是博弈矩阵的内在属性。
:::

# 核心概念地图

六个词必须分开，否则滑块会读反。

:::raw
<svg viewBox="0 0 680 340" width="100%" style="max-width:680px">
  <defs>
    <marker id="ggCpt" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="230" y="16" width="220" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">支付参数 θ</text>
  <rect x="24" y="100" width="190" height="56" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="119" y="124" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">三重区域</text><text x="119" y="142" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">完全信息 · 中间多重</text>
  <rect x="244" y="100" width="190" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="339" y="124" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">私有信号 x</text><text x="339" y="142" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">拆共同知识</text>
  <rect x="464" y="100" width="190" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="559" y="124" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">θ* = 1 − c</text><text x="559" y="142" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">基本面分界 · 不随 σ</text>
  <rect x="80" y="210" width="220" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="190" y="234" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">信号阈值 x*</text><text x="190" y="252" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">随 σ 与 c 移动</text>
  <rect x="380" y="210" width="220" height="56" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="490" y="234" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">γ ≦ 2π ?</text><text x="490" y="252" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">公共太准 → 多重回来</text>
  <line x1="300" y1="60" x2="119" y2="100" stroke="#1d4ed8" stroke-width="1.4" marker-end="url(#ggCpt)"/>
  <line x1="340" y1="60" x2="339" y2="100" stroke="#1d4ed8" stroke-width="1.4" marker-end="url(#ggCpt)"/>
  <line x1="380" y1="60" x2="559" y2="100" stroke="#1d4ed8" stroke-width="1.4" marker-end="url(#ggCpt)"/>
  <line x1="339" y1="156" x2="190" y2="210" stroke="#b8730a" stroke-width="1.4" marker-end="url(#ggCpt)"/>
  <line x1="559" y1="156" x2="490" y2="210" stroke="#d5342c" stroke-width="1.4" marker-end="url(#ggCpt)"/>
  <text x="340" y="310" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">θ* 回答「基本面多差会崩」；x* 回答「看到多差的信号才动手」；γ 回答「这套唯一性还在不在」。</text>
</svg>
:::

| 概念 | 在系统里的作用 | 不要和谁混 |
|---|---|---|
| 共同知识 | 中间区能支撑任意自洽信念的前提 | 不是「大家都听说了」 |
| 占优区 | 迭代的锚：一端必须攻击，一端必须不动 | 不是风险偏好 |
| 拉普拉斯信念 | 临界人把攻击比例看成 \(U[0,1]\) 的捷径 | 不是真的均匀先验于 \(\theta\) |
| \(\theta^∗\) | 崩与不崩的基本面分界 | 不是信号阈值 \(x^∗\) |
| \(\gamma\) | 私有噪声相对公共噪声有多大 | 不是相关系数 |

# 核心参与者

| 角色 | 在系统里做什么 | 杠杆在哪 |
|---|---|---|
| 连续统小投机者 / 储户 | 看私有信号，玩阈值策略 | 几乎不能单方面改 \(\theta^∗\)，但大众的 \(c\) 能 |
| 大交易者 | 可见的头寸改变小玩家的临界信念 | Corsetti、Dasgupta、Morris、Shin（2004）：一个大玩家可以移动小玩家的攻击区【事实】 |
| 央行 / 财政部 | 定钉住、储备、利率差（攻击的机会成本） | 储备改 \(a(\theta)\)，不只是「多一笔子弹」 |
| 银行 / 合约设计者 | 定短期支付 \(r_1\) | 流动性保险越大，挤兑阈值越差【事实】 |
| 公共信号发布者 | 官方数据、价格、全员大会 | 精度过高会破坏唯一性 |
| 实验被试 | 检验人是否真的玩阈值 | Heinemann、Nagel、Ockenfels（*Econometrica* 2004） |

# 核心变量

政权/挤兑模型（本手册模型 A）约定：

- 攻击成功 \(\iff \alpha\ge\theta\)。\(\theta\le 0\)：无人攻击也崩，攻击严格占优。\(\theta\ge 1\)：全体攻击也不崩，不攻击严格占优。\(0<\theta<1\)：完全信息下两个均衡。
- 攻击的净收益：成功得 1，再减去成本比 \(c\in(0,1)\)；不攻击得 0。无差异条件是成功概率 \(=c\)。
- 平坦先验下，边际信号的排名信念是均匀的，故 \(P(\text{成功}\mid\text{边际})=1-\theta^∗\)。令其等于 \(c\)：

\[
\theta^∗=1-c
\]

有限高斯噪声 \(\sigma>0\) 时，基本面分界**仍是** \(\theta^∗\)；信号阈值

\[
x^∗=(1-c)-\sigma\,\Phi^{-1}(c)
\]

\(c<0.5\) 时 \(\Phi^{-1}(c)<0\)，故 \(x^∗>\theta^∗\)：边际投机者要看到**比临界基本面更强**的信号才肯停手。默认 \(c=0.30\)、\(\sigma=0.20\)：\(\Phi^{-1}(0.30)=-0.5244\)，\(x^∗=0.8049\)。【推论】

线性投资模型（模型 B，用来讨论公共信号）是另一套支付：投资收益 \(\theta+\ell-1\)，不投资得 0。这里 \(\theta\) **越高越该投资**，和「\(\theta\) 越高钉住越稳」符号相反，两套滑块不能混读。公共信号均值 \(y\)、标准差 \(\tau\)，私有噪声标准差 \(\sigma\) 时

\[
\gamma=\frac{\sigma^2(\sigma^2+\tau^2)}{\tau^4(\sigma^2+2\tau^2)},\qquad \kappa=\Phi\big(\sqrt{\gamma}(\kappa-y)\big)
\]

\(\gamma\le 2\pi\) 时切换点唯一；否则对某些 \(y\) 有多个 \(\kappa\)。【事实】（Morris & Shin 综述 Proposition 3.1 的条件；方程形式按正态后验推导，见文末来源表）

| 变量 | 默认 | 动一下会发生什么 |
|---|---|---|
| \(c\) | 0.30 | \(\theta^∗\) 从 0.70 线性下降；\(c=0.50\) 时 \(\theta^∗=0.50\) |
| \(\sigma\) | 0.20 | 只移动 \(x^∗\)，不移动 \(\theta^∗\) |
| 基本面均值 \(\mu\) | 0.50 | 决定危机概率的位置，不改 \(\theta^∗\) |
| 公共标准差 \(\tau\) | 0.70 | 变小（更准）会把 \(\gamma\) 推向 \(2\pi\) |
| 公共均值 \(y\) | 0.60 | 模型 B：\(y\) 越高，投资切换点 \(\kappa\) 越低 |

# 因果关系

实线是直接因果，红色虚线是危机自己喂自己的反馈。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="ggCs" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="ggCf" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="30" width="150" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="105" y="57" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">攻击成本 c</text>
  <rect x="250" y="30" width="160" height="44" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="330" y="57" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">临界点 θ*=1−c</text>
  <rect x="480" y="30" width="160" height="44" rx="8" fill="#15181d"/><text x="560" y="57" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">协调型危机区间</text>
  <line x1="180" y1="52" x2="246" y2="52" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#ggCs)"/>
  <line x1="410" y1="52" x2="476" y2="52" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#ggCs)"/>
  <text x="214" y="44" fill="#1d4ed8" font-size="11" font-family="sans-serif">降低</text>
  <text x="430" y="44" fill="#1d4ed8" font-size="11" font-family="sans-serif">缩窄</text>

  <rect x="30" y="130" width="170" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="115" y="157" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">储备 / 最后贷款人</text>
  <rect x="250" y="130" width="170" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="335" y="157" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">临界质量 a(θ)</text>
  <line x1="200" y1="152" x2="246" y2="152" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#ggCs)"/>
  <path d="M420 152 C 470 152, 470 74, 480 74" fill="none" stroke="#1d4ed8" stroke-width="1.4" marker-end="url(#ggCs)"/>

  <rect x="30" y="230" width="170" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="115" y="257" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">私有噪声 σ</text>
  <rect x="250" y="230" width="170" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="335" y="257" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">信号阈值 x*</text>
  <line x1="200" y1="252" x2="246" y2="252" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#ggCs)"/>
  <text x="400" y="248" fill="#454c56" font-size="12" font-family="sans-serif">θ* 不动（平坦先验）</text>

  <rect x="30" y="300" width="200" height="40" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="130" y="325" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">攻击成功 → 更差的信号</text>
  <path d="M230 320 C 400 340, 560 120, 560 78" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#ggCf)"/>
</svg>
:::

:::note amber 储备的战略效应
Morris & Shin 指出：有些「加强防御」的比较静态**只通过改变投机者的均衡策略**起作用，而不是在相关状态下真的多挡住了一次攻击。把储备只当成会计库存，会算错杠杆。【分析】
:::

<!-- nav:机制与激励 -->
# 隐藏关系

同一套「带噪声的协调」在别的名字下重复出现。

| 这边的名字 | 那边的名字 | 同构在哪 |
|---|---|---|
| 拉普拉斯信念 | 拉普拉斯不充分理由原则 | 临界人把未知比例设成均匀；Morris–Shin 故意用这个名字 |
| 二人全局博弈的选择 | Harsanyi–Selten 风险占优 | 两人时阈值就是风险占优的切换点【事实】 |
| \(\theta^∗=1-c\) | 渗流 / 相变临界 | 都是「质量越过一点，宏观状态翻转」 |
| 货币攻击 | 挤兑、债务展期、政权更迭 | 都是「临界质量 vs 基本面」；符号约定要先对齐 |
| 公共信号过准 | 价格把信息聚合干净 | Angeletos–Werning：市场越能汇总信息，太阳黑子可能回来 |
| 谢林点 | 全局博弈选择 | 谢林在多重均衡**里面**找焦点；全局博弈把多重**消掉**。方向相反 |
| 无穷迭代剔除 | 实验室里的浅层推理 | 阈值策略对「别人随机」也是最优反应，所以不做无穷层也能靠近【分析】 |

:::note purple 势博弈的旁路
对称二元行动、支付只依赖别人选 1 的比例时，博弈是势博弈。势最大化与拉普拉斯行动对齐——所以「对不完备信息稳健」和「势最大」在这个类里是同一件事。【分析】（Morris–Shin 综述对 Ui 2001 的转述）
:::

# 系统运行机制

四步，缺一不可。

1. **两端被钉死。** \(\theta\) 足够差，攻击是占优策略；足够好，不攻击是占优策略。没有这两个锚，迭代没有起点。
2. **噪声切断共同知识。** 看到 \(x\) 的人知道 \(\theta\) 在附近，但不知道别人看到的是否也这么好，更不知道别人是否知道自己知道。高阶信念不能再任意指定。
3. **迭代向内咬。** 若别人在「极差」才攻击，那么「略好一点」时攻击也变成劣势，以此类推。连续统、战略互补、噪声很小时，咬到的极限与噪声分布形状无关。
4. **临界人用均匀排名。** 在切换点上，你在人群里的排名是均匀的，于是攻击比例 \(\sim U[0,1]\)。这就是拉普拉斯捷径：不必真的做无穷轮删除，直接对均匀比例求最优反应。

:::raw
<div class="flow"><span>占优区锚定</span><i>→</i><span>私有噪声</span><i>→</i><span class="hi">迭代剔除</span><i>→</i><span class="hi">θ*=1−c</span><i>→</i><span>政策可比较</span></div>
:::

银行挤兑比货币攻击多一个坎：支付不是全程战略互补（上面有一个「再差也没人跑」的区域结构不同）。Goldstein & Pauzner 仍得到唯一对称切换均衡，但不能把货币模型的证明原样贴过去。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 250" width="100%" style="max-width:680px">
  <defs>
    <marker id="ggTm" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="36" y1="46" x2="650" y2="46" stroke="#1d4ed8" stroke-width="2" marker-end="url(#ggTm)"/>
  <circle cx="56" cy="46" r="5" fill="#1d4ed8"/><text x="56" y="78" text-anchor="middle" fill="#15181d" font-size="11" font-weight="700" font-family="sans-serif">1988</text><text x="56" y="96" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">风险占优</text>
  <circle cx="140" cy="46" r="5" fill="#1d4ed8"/><text x="140" y="78" text-anchor="middle" fill="#15181d" font-size="11" font-weight="700" font-family="sans-serif">1993</text><text x="140" y="96" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">CvD 奠基</text>
  <circle cx="230" cy="46" r="5" fill="#b8730a"/><text x="230" y="78" text-anchor="middle" fill="#15181d" font-size="11" font-weight="700" font-family="sans-serif">1996</text><text x="230" y="96" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Obstfeld 多重</text>
  <circle cx="320" cy="46" r="5" fill="#d5342c"/><text x="320" y="78" text-anchor="middle" fill="#15181d" font-size="11" font-weight="700" font-family="sans-serif">1998</text><text x="320" y="96" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">货币攻击唯一</text>
  <circle cx="410" cy="46" r="5" fill="#1d4ed8"/><text x="410" y="78" text-anchor="middle" fill="#15181d" font-size="11" font-weight="700" font-family="sans-serif">2000</text><text x="410" y="96" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">定理 2 被纠正</text>
  <circle cx="500" cy="46" r="5" fill="#0f8a4d"/><text x="500" y="78" text-anchor="middle" fill="#15181d" font-size="11" font-weight="700" font-family="sans-serif">2004</text><text x="500" y="96" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">HNO 实验</text>
  <circle cx="590" cy="46" r="5" fill="#d5342c"/><text x="590" y="78" text-anchor="middle" fill="#15181d" font-size="11" font-weight="700" font-family="sans-serif">2005–07</text><text x="590" y="96" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">挤兑·价格·稳健性</text>
  <text x="40" y="150" fill="#15181d" font-size="12" font-family="sans-serif">1993 Carlsson &amp; van Damme，Econometrica：2×2 全局博弈在噪声消失时选出风险占优。</text>
  <text x="40" y="172" fill="#15181d" font-size="12" font-family="sans-serif">1998 Morris &amp; Shin，AER：投机者有微小私有噪声时，钉住有唯一临界点。</text>
  <text x="40" y="194" fill="#15181d" font-size="12" font-family="sans-serif">2004 HNO，Econometrica：约 92% 的策略符合非劣势阈值；比较静态跟全局博弈走，数值并不贴死。</text>
  <text x="40" y="216" fill="#15181d" font-size="12" font-family="sans-serif">2006–07 价格内生信息与 Weinstein–Yildiz：选择结果依附于信息结构，不是矩阵的固有标签。</text>
</svg>
:::

Heinemann（2000）指出 Morris & Shin（1998）定理 2 的方程 \(f(\theta^∗)=e^∗-2t\) **写错了**。正确的极限条件是 \((1-a(\theta^∗))(e^∗-\zeta(\theta^∗))=t\)：边际投机者对「放弃 / 捍卫」并不总是各赋 1/2，还要乘上临界质量留下的成功概率。【事实】（Morris–Shin 综述的更正；教学模型 \(a(\theta)=\theta\)、成功收益恒为 1 时，它退回 \(\theta^∗=1-t\)）

# 利益与激励

| 谁 | 表面目标 | 隐藏激励 | 对临界点的含义 |
|---|---|---|---|
| 投机者 | 攻击的期望收益 &gt; 0 | 要猜别人是否攻击，不是只猜 \(\theta\) | \(c\)（利差、税费、保证金）直接进 \(\theta^∗\) |
| 提前支取的储户 | 锁定 \(r_1\) | 别人也跑时，晚取更亏 | \(r_1\) 越高，\(\theta^∗\) 越糟【事实】 |
| 央行 | 守住钉住 | 声明要响，但响过头会变成过准公共信号 | 透明度不是单调的「越多越好」 |
| 银行股东 | 用活期合同提供流动性 | 流动性溢价的代价是内生挤兑概率 | 最优合同仍可能容忍正的恐慌概率【事实】 |
| 大玩家 | 用可见仓位赚钱 | 小玩家会把大玩家的行动当信号 | 市场结构改变小玩家临界点 |
| 研究者 | 要可比较的比较静态 | 多重均衡模型无法做政策排序 | 唯一性是分析工具，不是道德结论 |

# 资源与信息流

攻击的「抽水」不是手续费那么简单：成功时，钉住与影子价之差从捍卫者转到攻击者；失败时，成本 \(t\) 沉没。公共价格若把 \(\theta\) 报得太清楚，信息流本身会改变博弈有几个均衡。

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="ggFl" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="ggFlR" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="24" y="36" width="150" height="64" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="99" y="64" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">投机者 / 储户</text><text x="99" y="84" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">私有信号 x_i</text>
  <rect x="250" y="36" width="170" height="64" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="335" y="62" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">摩擦抽水</text><text x="335" y="82" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">交易成本 t · 利差 · 罚则</text>
  <rect x="490" y="24" width="166" height="40" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="573" y="49" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">成功：贬值差归攻击者</text>
  <rect x="490" y="76" width="166" height="40" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="573" y="101" text-anchor="middle" fill="#15181d" font-size="12" font-weight="700" font-family="sans-serif">失败：t 沉没，钉住还在</text>
  <line x1="174" y1="68" x2="246" y2="68" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#ggFl)"/>
  <line x1="420" y1="52" x2="486" y2="44" stroke="#d5342c" stroke-width="1.5" marker-end="url(#ggFlR)"/>
  <line x1="420" y1="84" x2="486" y2="96" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#ggFl)"/>
  <rect x="180" y="160" width="320" height="52" rx="8" fill="#15181d"/><text x="340" y="182" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">缓冲池：外汇储备 / 银行可变现资产</text><text x="340" y="200" text-anchor="middle" fill="#c9cdd4" font-size="11" font-family="sans-serif">它移动 a(θ)，从而移动均衡里的 θ*</text>
  <line x1="335" y1="100" x2="335" y2="156" stroke="#1d4ed8" stroke-width="1.4" marker-end="url(#ggFl)"/>
  <rect x="24" y="230" width="632" height="48" rx="8" fill="#f8f9fb" stroke="#c9cdd4"/><text x="40" y="258" fill="#15181d" font-size="12" font-family="sans-serif">旁路：价格、官宣、全员会 = 公共信号 y。τ 太小（太准）时，抽水公式还在，但均衡个数不再是 1。</text>
</svg>
:::

货币用比率 \(c=t/(\text{成功收益})\) 就够，不必先换成 ¥。若成功收益是一笔名义差额，\(c\) 是这笔差额里被成本吃掉的份额。挤兑的对应抽水是：早取的人拿走 \(r_1\)，晚取的人分剩余——早取权就是从耐心储户身上抽的流动性。

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序。分数是教学用排序，不是实证权重。【分析】

| # | 杠杆 | 为何有效 | 分数直觉 |
|---|---|---|---|
| 1 | 先画三重区域 | 没有占优锚，就没有迭代，谈不上临界点 | 最高：低成本且防伪 |
| 2 | 把行动成本写成 \(c\)，算 \(\theta^∗=1-c\) | 一个数吃掉「热钱贵不贵」 | \(c:0.30\to0.40\) 时 \(\theta^∗:0.70\to0.60\) |
| 3 | 用「只计 \(\theta\le 0\)」当基准 | 协调超额才是这套模型多出来的部分 | 默认参数下超额 74.99pp |
| 4 | 先问 \(\gamma\) 是否 \(\le 2\pi\) | 唯一性没了，后面的单一点全部作废 | 公共精度是开关 |
| 5 | 提高坏行动的 \(c\)（税、罚则、利差） | 缩小恐慌区，**不修复** \(\theta\le 0\) 的破产 | 政策级，但公式直接 |
| 6 | 私有信息保持够准 | \(\sigma\) 相对 \(\tau\) 小，\(\gamma\) 才下得来 | 比「多发公告」更反直觉 |
| 7 | 记住选择不稳健于任意信念扰动 | Weinstein & Yildiz（2007）：换高阶信念，理性化结果可以翻 | 防止把 \(\theta^∗\) 当成物理常数 |
| 8 | 储备 / 最后贷款人改 \(a(\theta)\) | 战略效应可能大于会计效应 | 要写进临界质量，不能只写余额 |
| 9 | 识别有没有大玩家 | 可见仓位会移动小玩家阈值 | 市场结构先于公式 |
| 10 | 合同里的短期支付 \(r_1\) | 流动性收益与挤兑概率交换 | Goldstein–Pauzner：最优处恐慌概率仍可为正 |

# 常见认知陷阱

:::details 陷阱 1 · 「global = 全球」
Global 指支付从一类博弈里抽取，不是国际金融专有名词。国内供应商切换、产品发布会，结构同构就能用。
:::

:::details 陷阱 2 · 噪声越小越多重
极限定理说的是：私有噪声趋于 0，均衡**仍然唯一**，并且选择结果与噪声形状无关。多重是完全信息（共同知识）的性质。
:::

:::details 陷阱 3 · 把 \(x^∗\) 当成 \(\theta^∗\)
默认 \(c=0.30\)、\(\sigma=0.20\) 时基本面分界是 0.7000，信号阈值是 0.8049。用信号阈值去报「基本面低于多少会崩」，会偏 0.1049。
:::

:::details 陷阱 4 · 只报危机概率，不报基准
\(\mu=0.50\)、\(s=0.30\)、\(c=0.25\) 时，只计基本面破产是 4.78%，算上协调是 79.77%。不减基准，79.77% 看起来像命运，其实大部分是恐慌区。
:::

:::details 陷阱 5 · 税率能治破产
\(c\) 从 0.25 到 0.40，基本面基准仍是 4.78%，协调超额从 74.99pp 降到 58.28pp。税挪的是恐慌区，不是 \(\theta\le 0\)。
:::

:::details 陷阱 6 · 公告越精确越好
模型 B 里 \(\tau\downarrow\) 会抬 \(\gamma\)。过了 \(2\pi\)，比较静态从「一个点」退回「几个点都可能」。透明度有副作用。
:::

:::details 陷阱 7 · 两套 \(\theta\) 符号混用
模型 A：\(\theta\) 越高越稳。模型 B：\(\theta\) 越高越该投资。公共信号变好时 \(\kappa\) 下降，是「更愿意投资」，不是「更愿意攻击货币」。
:::

:::details 陷阱 8 · 把 1998 年定理 2 的原式当真
\(f(\theta^∗)=e^∗-2t\) 已被 Heinemann（2000）指出有误。引用前用 \((1-a(\theta^∗))(e^∗-\zeta(\theta^∗))=t\)。
:::

:::details 陷阱 9 · 实验贴合 = 理论已证实到小数点
HNO（2004）：\(T=20\) 时不能拒绝私人信息阈值等于均衡；\(T=50\) 时阈值显著低于均衡（双侧 F，1%）。比较静态对，数值有系统偏差。【事实】
:::

:::details 陷阱 10 · 唯一阈值对一切信息结构稳健
只对「全局博弈式」的相关噪声稳健。Weinstein & Yildiz（2007）说明：在更广的高阶信念扰动下，理性化行动可以是你想要的任何一个。【事实】
:::

:::details 陷阱 11 · 银行模型可以照抄货币证明
挤兑支付不满足全程行动单调。Goldstein–Pauzner 用均匀噪声等额外结构才得到唯一切换。看到「银行」两个字就套 \(\theta^∗=1-c\)，是类比不是证明。
:::

# 从抽象到现实

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="ggLv" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="24" y="24" width="190" height="220" rx="10" fill="#f8f9fb" stroke="#c9cdd4"/>
  <text x="119" y="52" text-anchor="middle" fill="#15181d" font-size="14" font-weight="700" font-family="sans-serif">抽象</text>
  <text x="40" y="88" fill="#454c56" font-size="12" font-family="sans-serif">共同知识</text>
  <text x="40" y="114" fill="#454c56" font-size="12" font-family="sans-serif">风险占优</text>
  <text x="40" y="140" fill="#454c56" font-size="12" font-family="sans-serif">拉普拉斯行动</text>
  <text x="40" y="166" fill="#454c56" font-size="12" font-family="sans-serif">迭代剔除</text>
  <text x="40" y="192" fill="#454c56" font-size="12" font-family="sans-serif">高阶信念</text>
  <rect x="244" y="24" width="190" height="220" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="339" y="52" text-anchor="middle" fill="#15181d" font-size="14" font-weight="700" font-family="sans-serif">机制</text>
  <text x="260" y="88" fill="#15181d" font-size="12" font-family="sans-serif">私有噪声拆锚</text>
  <text x="260" y="114" fill="#15181d" font-size="12" font-family="sans-serif">两端占优区</text>
  <text x="260" y="140" fill="#15181d" font-size="12" font-family="sans-serif">均匀排名</text>
  <text x="260" y="166" fill="#15181d" font-size="12" font-family="sans-serif">θ* 与 x* 分离</text>
  <text x="260" y="192" fill="#15181d" font-size="12" font-family="sans-serif">γ 越过 2π</text>
  <rect x="464" y="24" width="190" height="220" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="559" y="52" text-anchor="middle" fill="#15181d" font-size="14" font-weight="700" font-family="sans-serif">操作</text>
  <text x="480" y="88" fill="#15181d" font-size="12" font-family="sans-serif">写出 c，算 1−c</text>
  <text x="480" y="114" fill="#15181d" font-size="12" font-family="sans-serif">对照 θ≤0 的基准</text>
  <text x="480" y="140" fill="#15181d" font-size="12" font-family="sans-serif">分辨公告是否过准</text>
  <text x="480" y="166" fill="#15181d" font-size="12" font-family="sans-serif">税只缩恐慌区</text>
  <text x="480" y="192" fill="#15181d" font-size="12" font-family="sans-serif">标出模型失效条件</text>
  <line x1="214" y1="120" x2="244" y2="120" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ggLv)"/>
  <line x1="434" y1="120" x2="464" y2="120" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ggLv)"/>
</svg>
:::

一张可带走的对照：

| 你看到的现象 | 先问的机制问题 | 今天能写下来的操作 |
|---|---|---|
| 「基本面差不多，结果天差地别」 | 当时在不在 \((0,\theta^∗)\) 恐慌区 | 估一个 \(c\)，画出 0 与 \(1-c\) |
| 官方把数据一次报完，市场反而更跳 | 公共精度是否压过私有 | 粗算 \(\sigma/\tau\)，看 \(\gamma\) 靠近哪一侧 |
| 加了税，破产的还是破产 | 税不进入 \(\theta\le 0\) | 把两种概率分开报 |
| 实验室里人不做无穷推理 | 阈值策略对随机信念也稳健 | 用比较静态检验，不要求小数点贴合 |

# 从理论到行动

不要从「预测下一次危机」开始。从**把一次协调写成三个区域**开始。

1. 写出坏行动（攻击、挤兑、集体跳槽、集体不交货）的成本比 \(c\)。分子是失败或行动本身的代价，分母是大家都做成功时的收益。保持 \(c\in(0,1)\)，否则占优区的故事要重写。
2. 计算 \(\theta^∗=1-c\)。这是教学模型的基本面分界，不是信号。
3. 单列基准：若协调完全不起作用，只有「再差也崩」的那一截（模型里 \(\theta\le 0\)）。你的故事若说不出这一截的概率，就还没资格谈恐慌溢价。
4. 问信息从哪来。若所有人都盯着同一个数（价格、全员信、官宣），先怀疑唯一性，再引用 \(\theta^∗\)。
5. 只改一个杠杆做反事实：加 \(c\)，或把公共信号变模糊一点、把私有信号变具体一点。一次只动一个，否则比较静态无法归因。

<!-- nav:实践系统 -->
# 技能树

:::details L1 · 会画区域
给定「多差就一定崩、多好就一定不崩」，画出中间段。说得出：完全信息下中间段两个均衡都成立。
:::

:::details L2 · 会算 θ*
把成本收益比估进 (0,1)，写出 \(\theta^∗=1-c\)。能解释为什么它不依赖 \(\sigma\)（平坦先验极限）。
:::

:::details L3 · 会分开 x*
用 \(x^∗=\theta^∗-\sigma\Phi^{-1}(c)\)。\(c=0.5\) 时两者重合；\(c=0.3\)、\(\sigma=0.2\) 时差 0.1049。
:::

:::details L4 · 会做基准对照
正态基本面下同时报 \(P(\theta\le 0)\) 与 \(P(\theta\le\theta^∗)\)。差额叫协调超额，不叫「模型预测的危机」。
:::

:::details L5 · 会检查唯一性开关
会算 \(\gamma\)，知道 \(2\pi\approx 6.2832\) 是分界。能举出 \(\sigma=1\)、\(\tau=0.40\)、\(y=0.50\) 时 \(\gamma=34.3277\)，三个 \(\kappa\)：0.0018、0.5000、0.9982。
:::

:::details L6 · 会指出失效
内生价格、挤兑支付非单调、高阶信念的任意扰动、实验数值偏差。四条里能默写两条，才算能用这套模型跟人争论。
:::

# 游戏化世界

你是**临界点测绘员**。地图上只有三种地形：占优攻击、恐慌带、占优安全。装备不是预言水晶，是四把尺子：\(c\)、\(\sigma\)、基准概率、\(\gamma\)。

- 安全区：你能在 10 分钟内写出 \(\theta^∗\) 并指出它不等于 \(x^∗\)。
- 迷雾：公共信号很响，你还没算 \(\gamma\) 就引用了唯一阈值。
- Boss 1：过准的价格。它看起来像「市场有效」，实际是多重均衡的传送门。
- Boss 2：Weinstein–Yildiz。你把 \(\theta^∗\) 刻在石头上，它提醒你石头只在一种信息结构里成立。
- 得分：每做一次「危机概率 − 基本面基准」，记 1 分。只报一个百分比，记 0 分。

# 任务系统

| 任务 | 完成标准 | 时间 |
|---|---|---|
| 区域草图 | 一张纸上有 0、\(1-c\)、1 三个刻度 | 15 分钟 |
| 默认复算 | \(c=0.30\) 得 0.70；\(c=0.30,\sigma=0.20\) 得 \(x^∗=0.8049\) | 15 分钟 |
| 基准卡 | 写出 4.78% vs 79.77% 这一对，并换一个 \(c\) 再算 | 20 分钟 |
| 信息结构卡 | 判断手头问题更像私有噪声还是公共广播 | 20 分钟 |
| 失效清单 | 四条失效条件写出适用的那一条 | 15 分钟 |

# 反事实模拟

:::tabs
@@把 c 从 0.25 提到 0.40
固定 \(\mu=0.50\)、\(s=0.30\)。\(\theta^∗\) 从 0.75 降到 0.60。危机概率从 79.77% 降到 63.06%。基本面基准始终 4.78%。协调超额从 74.99pp 降到 58.28pp，少 16.71pp。税没有治疗破产。【推论】

@@把 c 拧到 0.50
\(\Phi^{-1}(0.50)=0\)，于是对任意 \(\sigma\)，\(x^∗=\theta^∗=0.5000\)。噪声不再分开信号和基本面。这是检查公式是否写反的锚点。【事实】

@@公共信号压过私有
\(\sigma=1.00\)、\(\tau=0.40\)、\(y=0.50\)：\(\gamma=34.3277>6.2832\)，切换点 0.0018、0.5000、0.9982 三个都成立。此时再报「唯一临界点」是错的。【推论】

@@只信基本面
同一正态下，忽略协调会把 79.77% 说成 4.78%，少报 74.99 个百分点。这不是预测精度问题，是漏了一个通道。【推论】
:::

## 可调模型 1 · 拉普拉斯临界点 θ\* = 1 − c

拖动攻击成本比 \(c\)。默认 0.30 → \(\theta^∗=0.70\)。色带：\(\theta\le 0\) 占优攻击，\((0,\theta^∗]\) 被选为崩，\((\theta^∗,1)\) 被选为守，\(\theta\ge 1\) 占优不攻击。

:::raw
<div class="tool" id="tool_rg">
  <div class="ctrl">
    <label>成本比 c <output id="rg_cO">0.30</output></label>
    <input type="range" id="rg_c" min="0.05" max="0.95" step="0.01" value="0.30"/>
  </div>
  <div class="readout">
    <div class="ro">θ*<strong id="rg_th">0.70</strong></div>
    <div class="ro">崩的宽度<strong id="rg_atk">0.70</strong></div>
    <div class="ro">守的宽度<strong id="rg_safe">0.30</strong></div>
    <div id="rg_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="rg_vh">c=0.30 → θ*=0.70；完全信息多重区间 (0, 1)；平坦先验极限下 θ≤0.70 崩、θ&gt;0.70 守住</span></div>
  </div>
  <canvas id="rgChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 有限噪声：θ\* 不动，x\* 动

平坦先验 + 高斯私有噪声。默认 \(c=0.30\)、\(\sigma=0.20\)：\(\theta^∗=0.7000\)，\(z=\Phi^{-1}(c)=-0.5244\)，\(x^∗=0.8049\)，差距 +0.1049。把 \(c\) 拖到 0.50，差距应为 0。

:::raw
<div class="tool" id="tool_ns">
  <div class="ctrl">
    <label>成本比 c <output id="ns_cO">0.30</output></label>
    <input type="range" id="ns_c" min="0.05" max="0.95" step="0.01" value="0.30"/>
    <label>私有噪声 σ <output id="ns_sO">0.20</output></label>
    <input type="range" id="ns_s" min="0.05" max="0.80" step="0.01" value="0.20"/>
  </div>
  <div class="readout">
    <div class="ro">θ*<strong id="ns_th">0.7000</strong></div>
    <div class="ro">x*<strong id="ns_x">0.8049</strong></div>
    <div class="ro">Φ⁻¹(c)<strong id="ns_z">-0.5244</strong></div>
    <div class="ro">x*−θ*<strong id="ns_gap">+0.1049</strong></div>
    <div id="ns_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ns_vh">θ*=0.7000 不随 σ 变；x*=0.8049；Φ⁻¹(c)=-0.5244；信号比基本面 高 0.1049</span></div>
  </div>
  <canvas id="nsChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 危机概率对照「只计破产」

\(\theta\sim N(\mu,s^2)\)。危机 \(=P(\theta\le 1-c)\)，基准 \(=P(\theta\le 0)\)。默认 \(\mu=0.50\)、\(s=0.30\)、\(c=0.25\)：基准 4.78%，全局博弈 79.77%，超额 74.99pp。

:::raw
<div class="tool" id="tool_cr">
  <div class="ctrl">
    <label>基本面均值 μ <output id="cr_muO">0.50</output></label>
    <input type="range" id="cr_mu" min="-0.20" max="1.20" step="0.01" value="0.50"/>
    <label>基本面标准差 s <output id="cr_sO">0.30</output></label>
    <input type="range" id="cr_s" min="0.10" max="0.80" step="0.01" value="0.30"/>
    <label>成本比 c <output id="cr_cO">0.25</output></label>
    <input type="range" id="cr_c" min="0.05" max="0.95" step="0.01" value="0.25"/>
  </div>
  <div class="readout">
    <div class="ro">θ*<strong id="cr_th">0.75</strong></div>
    <div class="ro">基本面基准<strong id="cr_fund">4.78%</strong></div>
    <div class="ro">全局博弈<strong id="cr_gg">79.77%</strong></div>
    <div class="ro">协调超额<strong id="cr_ex">74.99pp</strong></div>
    <div id="cr_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="cr_vh">基本面基准 4.78% · 全局博弈 79.77% · 协调超额 74.99pp（θ*=0.75）</span></div>
  </div>
  <canvas id="crChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 公共信号会不会把唯一性拆掉

线性投资模型。默认 \(\sigma=0.40\)、\(\tau=0.70\)、\(y=0.60\)：\(\gamma=0.3800\)，与 \(2\pi\) 的比值 0.0605，唯一，\(\kappa=0.4674\)。把 \(\sigma\) 加大或 \(\tau\) 减小，直到判定变成「多重」。

:::raw
<div class="tool" id="tool_pb">
  <div class="ctrl">
    <label>私有噪声 σ <output id="pb_sigO">0.40</output></label>
    <input type="range" id="pb_sig" min="0.10" max="1.50" step="0.01" value="0.40"/>
    <label>公共噪声 τ <output id="pb_tauO">0.70</output></label>
    <input type="range" id="pb_tau" min="0.25" max="1.20" step="0.01" value="0.70"/>
    <label>公共均值 y <output id="pb_yO">0.60</output></label>
    <input type="range" id="pb_y" min="0.05" max="0.95" step="0.01" value="0.60"/>
  </div>
  <div class="readout">
    <div class="ro">γ<strong id="pb_g">0.3800</strong></div>
    <div class="ro">γ / 2π<strong id="pb_ratio">0.0605</strong></div>
    <div class="ro">均衡<strong id="pb_mode">唯一</strong></div>
    <div class="ro">κ<strong id="pb_k">0.4674</strong></div>
    <div id="pb_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="pb_vh">γ=0.3800 ≤ 2π=6.2832（比值 0.0605）→ 唯一均衡，κ=0.4674</span></div>
  </div>
  <canvas id="pbChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 你能做什么 | 验收 |
|---|---|---|
| 1 识区 | 画出占优 / 多重 / 占优 | 能指出完全信息的病在中间段 |
| 2 算点 | 写出 \(\theta^∗=1-c\) 与 \(x^∗\) | 默认数字 0.70 与 0.8049 手算一致 |
| 3 对照 | 危机概率减去基本面基准；会看 \(\gamma\) | 4.78% 与 79.77% 成对出现 |
| 4 知道边界 | 能拒绝误用：内生价格、挤兑非单调、信念扰动、实验偏差 | 拿一篇评论说出它攻击的是哪条假设 |

# 30分钟最小实践

成本接近 0。产出是一张可核对的半页纸。

1. 选一件本周的协调事：集体切换供应商、产品是否按期发布、或一条「挤兑/钉住」新闻。不要选纯囚徒困境（唯一均衡是背叛的那种）。
2. 用 5 分钟画三个区域：怎样算「差到不必等人也该跑」，怎样算「好到跑了也没用」。
3. 用 10 分钟估 \(c\)（失败代价 / 成功收益），写 \(\theta^∗=1-c\)。若 \(c\) 不在 (0,1)，写下为什么这件事实在不适合本模型。
4. 用 10 分钟写信息从哪来：各人各看各的，还是全员盯着同一个数。若是后者，在纸上写「先不要引用唯一临界点」。
5. 用 5 分钟写一个杠杆：提高坏行动的成本，或让私有信息更具体、公共广播别压过它。

验收：纸上有 \(\theta^∗=1-c\) 的算术，有一行基准（「若不存在协调，概率会是什么」），有一个只动一个旋钮的反事实。对得上就算完成，不要求预测成真。

# 7天计划

| 天 | 动作 | 产出 |
|---|---|---|
| 1 | 读定义：global ≠ 全球 | 用自己的话写三句 |
| 2 | 手算 \(\theta^∗=1-c\) 三个 c（0.2 / 0.3 / 0.5） | 0.80 / 0.70 / 0.50 |
| 3 | 手算一组 \(x^∗\)（c=0.3, σ=0.2） | 0.8049，并写差距来源 |
| 4 | 做基准对照（μ=0.5, s=0.3, c=0.25） | 4.78% vs 79.77% |
| 5 | 把 c 改成 0.40 重算 | 超额变为 58.28pp |
| 6 | 算一组 \(\gamma\)（σ=0.4, τ=0.7 与 σ=1, τ=0.4） | 0.3800 唯一；34.3277 多重 |
| 7 | 选一条失效文献，写它否定的假设 | 半页笔记 |

# 30天计划

| 周 | 焦点 | 完成线 |
|---|---|---|
| 第 1 周 | 模型 A 的区域、\(\theta^∗\)、\(x^∗\) | 能不看笔记推出 \(1-\theta^∗=c\) |
| 第 2 周 | 基准对照与「税不治破产」 | 能解释 16.71pp 从哪来 |
| 第 3 周 | 模型 B 与 \(2\pi\) | 能让滑块从唯一跨到多重，并读出三个 \(\kappa\) |
| 第 4 周 | 一篇应用 + 一篇批评 | 货币或挤兑一篇，Weinstein–Yildiz 或 Angeletos–Werning 一篇，各写「它保留了哪条假设」 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 式子 / 判据 | 用来做什么 |
|---|---|---|---|
| 1 | 完全信息三重区域 | \(\theta\le 0\) 占优攻击；\(\theta\ge 1\) 占优不攻击 | 先承认多重，再谈选择 |
| 2 | 拉普拉斯临界点 | \(\theta^∗=1-c\) | 政权/挤兑教学式的基本面分界 |
| 3 | 信号阈值 | \(x^∗=(1-c)-\sigma\Phi^{-1}(c)\) | 解释人在什么信号上动手 |
| 4 | 噪声无关 | \(\sigma\to 0\) 时选择不依赖噪声分布形状 | 知道极限的稳健性边界 |
| 5 | 基准对照 | \(P(\theta\le\theta^∗)-P(\theta\le 0)\) | 把协调通道从破产里拆出来 |
| 6 | 货币攻击正确式 | \((1-a(\theta^∗))(e^∗-\zeta(\theta^∗))=t\) | 避免引用 1998 年写错的定理 2 |
| 7 | 公共信息开关 | \(\gamma\le 2\pi\approx 6.2832\) | 判断唯一性是否还在 |
| 8 | 线性切换方程 | \(\kappa=\Phi(\sqrt{\gamma}(\kappa-y))\) | 读公共均值如何移动投资点 |
| 9 | 挤兑比较静态 | \(\theta^∗(r_1)\) 随短期支付上升 | 流动性保险的代价 |
| 10 | 信念扰动定理 | 更广的高阶信念可选出不同理性化行动 | 防止把阈值当成物理常数 |

# 关键问题清单

:::details 这件事情究竟是协调，还是囚徒困境？
若唯一均衡已经是「都背叛」，全局博弈没有多重可消。先判定博弈类型。
:::

:::details 占优区在哪里？
写不出「差到必须跑」和「好到不必跑」，就没有迭代的锚，\(\theta^∗\) 是装饰。
:::

:::details c 估的是比率还是情绪？
分子分母要能指认。估不出就标【假设】，不要写成【事实】。
:::

:::details 你报的是 θ* 还是 x*？
听者若拿去对基本面数据，要用 \(\theta^∗\)。信号规则才用 \(x^∗\)。
:::

:::details 基准减了没有？
任何危机概率旁边应有 \(P(\theta\le 0)\) 或你问题里真正的「必然崩」区域。
:::

:::details 公共信号准到什么程度？
价格、官宣、全员信若是共同知识级的精确，先算 \(\gamma\) 再谈唯一。
:::

:::details 储备是会计还是战略？
多出来的子弹若只在均衡策略里起作用，比较静态要写成「信心」，不要写成「挡住了那一次」。
:::

:::details 有没有大玩家？
有可见大额仓位时，小玩家的临界点不是连续统公式的原样。
:::

:::details 支付是否全程互补？
挤兑、有的政治模型不是。证明不能自动迁移。
:::

:::details 你要的稳健是哪一种？
对噪声形状稳健（Frankel–Morris–Pauzner）≠ 对任意高阶信念稳健（Weinstein–Yildiz）。
:::

# 下一阶段探索

- 原文：Carlsson & van Damme（1993）；Morris & Shin（1998）；Morris & Shin 综述 *Global Games: Theory and Applications*。
- 应用：Goldstein & Pauzner（2005）挤兑；Rochet & Vives（2004）最后贷款人；Corsetti 等（2004）大交易者。
- 批评与边界：Heinemann（2000）对定理 2 的更正；HNO（2004）实验；Angeletos & Werning（2006）价格；Weinstein & Yildiz（2007）结构定理。
- 并列手册：猎鹿博弈（风险占优）、协调与谢林点、共同知识、选美博弈。
- 不要做的事：用本页默认的 0.70 或 79.77% 去评论某一个真实市场。那些数是教学标定。【分析】

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 全局博弈定义与风险占优选择 | 经典论文 | Carlsson & van Damme, Econometrica 61(5), 1993, 989–1018 | 【事实】 |
| 货币攻击唯一均衡 | 经典论文 | Morris & Shin, AER 88(3), 1998, 587–597 | 【事实】 |
| 定理 2 原式有误及正确条件 | 综述转述 Heinemann 2000 | Morris & Shin, *Global Games: Theory and Applications* | 【事实】 |
| 噪声无关的极限选择 | 经典论文 | Frankel, Morris & Pauzner, JET 2003 | 【事实】 |
| 挤兑概率与 \(r_1\) | 经典论文 | Goldstein & Pauzner, Journal of Finance 60(3), 2005, 1293–1327 | 【事实】 |
| 实验：92% 非劣势阈值；T 与 Z 解释 83.8% / 加入控制后 91.4%；T=50 时拒绝均衡数值 | 实验论文 | Heinemann, Nagel & Ockenfels, Econometrica 72(5), 2004, 1583–1599 | 【事实】 |
| 内生价格恢复多重 | 经典论文 | Angeletos & Werning, AER 2006, *Crises and Prices* | 【事实】 |
| 高阶信念扰动 | 经典论文 | Weinstein & Yildiz, Econometrica 2007 | 【事实】 |
| 大交易者 | 经典论文 | Corsetti, Dasgupta, Morris & Shin, 2004 | 【事实】 |
| 最后贷款人 | 经典论文 | Rochet & Vives, JEEA 2004 | 【事实】 |
| \(\gamma\) 的闭式与 \(\kappa=\Phi(\sqrt{\gamma}(\kappa-y))\) | 由综述线性例子推导 | 正态后验 + 投资收益 \(\theta+\ell-1\)；唯一性 \(\gamma\le 2\pi\) 与综述一致 | 【推论】 |
| 默认数值 0.8049、4.78%、79.77%、74.99pp、0.3800、0.4674、34.3277 | 本手册标定 | Acklam 分位 + Abramowitz–Stegun 7.1.26；与页面脚本同一实现 | 【事实】 |
| 杠杆排序分数 | 教学判断 | 重要性×杠杆×可操作÷学习成本 | 【分析】 |
| 真实危机的频率、某一钉住的临界储备 | 未引用 | 本手册不报 | 【待验证】 |

标记约定：【事实】论文可核对或本页可复算；【分析】框架内判断；【推论】由模型推出；【假设】未验证；【待验证】单一来源或转述链长。

# 免责声明 {.appendix}

本手册是博弈论认知框架，**不是**投资建议、外汇或存款建议，也不是央行或银行监管意见。文中的 \(\theta^∗\)、危机概率和 \(\gamma\) 都是教学模型在指定参数下的输出。默认分布 \(\theta\sim N(0.50,0.30^2)\) 不是任何货币或银行的基本面。文中不报价格涨跌；若读者自行把结果套到行情，涨红跌绿、货币用 ¥ 的市场惯例与本文的红（危机/攻击）绿（守住）不是同一套语义。真实合同的支付往往不满足全程战略互补，公共价格也会内生。把 0.70 或 79.77% 写成对现实事件的预测，超出本文范围。
