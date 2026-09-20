---
slug: 有限理性与量子响应均衡（QRE）：现实中人按收益差的概率而非绝对最优选择
title: 有限理性与量子响应均衡（QRE）：现实中人按收益差的概率而非绝对最优选择
subtitle: 人不是永远选「绝对最优」，而是<strong>收益越高选得越勤</strong>——把噪声最优回应做成固定点，就是 QRE。
brand_sub: QRE × Bounded Rationality
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-20
data_asof: 2026 年 9 月
tags: [博弈论, QRE, 有限理性, Softmax, McKelvey, Palfrey, 实验经济学, logit]
theme_js_file: 有限理性与量子响应均衡（QRE）：现实中人按收益差的概率而非绝对最优选择.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**量子响应均衡（Quantal Response Equilibrium, QRE）**：把「精确最优回应」换成「按期望收益差概率化选择」——收益更高的策略被选得更勤，但更差的策略仍有正概率；均衡要求人人如此选，且信念与对方的随机选择一致。【事实】（McKelvey & Palfrey, *Games and Economic Behavior* 1995）

最常用的 **Logit QRE**：\(P(i)=\dfrac{e^{\lambda\,EU_i}}{\sum_j e^{\lambda\,EU_j}}\)。\(\lambda\to 0\) 时接近均匀乱选；\(\lambda\to\infty\) 时逼近纳什。【事实】

> 核心锋利处：**纳什说「只做最好」；QRE 说「更好更常做」——后者才能系统解释实验室里「明明知道劣势策略仍被点到」的数据。**

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的是：**有限精度决策如何与策略信念互相锁定，形成可估计、可比较静态的均衡**——不是「人非理性所以随便乱选」的借口。

边界：

- **在界内**：logit/probit 量子响应、正则 QRE、扩展型 AQRE、λ 同伦与均衡选择、实验结构估计、与 Softmax/温度的同构。
- **在界外**：替某只股票下单、具体谈判话术——除非压成「估计 λ 与支付差 → 预测选择分布」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 噪声最优回应如何构成一致信念的均衡 |
| 2 | 边界在哪 | 到「响应函数 + 固定点 + 可检验约束」可形式化为止 |
| 3 | 核心对象 | \(EU_i\)、\(\lambda\)（或 \(\mu=1/\lambda\)）、响应函数、固定点 |
| 4 | 参与者 | 受试、估计者、机制设计者、与 level-k/颤抖手对照的理论家 |
| 5 | 关键变量 | \(\lambda\)、支付差 \(\Delta\pi\)、策略数、学习经验 |
| 6 | 可直接观察 | 选择频率、跨处理比较静态、拒绝/接受率 |
| 7 | 无法直接观察 | 真实噪声分布、个体 \(\lambda\) 异质性、效用尺度 |
| 8 | 谁影响谁 | 支付差→选择概率；信念→期望支付；固定点锁死两者 |
| 9 | 因果关系 | \(\lambda\uparrow\) → 更尖锐地偏好高 EU 策略；极限逼近纳什 |
| 10 | 只是相关 | 「教育高」≠ 自动高 \(\lambda\)【分析】 |
| 11 | 表层现象 | 劣策略仍被选、旅人困境索赔偏高、匹配硬币偏离纳什混合 |
| 12 | 底层机制 | 感知/计算噪声 + 均衡一致性（或等价：扰动支付的贝叶斯博弈） |
| 13 | 有反馈吗 | 有。重复局中经验常推高有效 \(\lambda\)【事实】 |
| 14 | 有延迟吗 | 有。第一轮靠先验 \(\lambda\)；学习要若干期 |
| 15 | 正/负反馈 | 经验↑→\(\lambda\)↑→更近纳什（负向纠偏噪声）；过拟合任意噪声分布则「什么都能解释」（正反馈到空理论） |

## 最关键的一句话

> QRE 的锋利处：**把「误差」做成均衡的一部分，而不是事后补丁——但若不限制误差结构，它会失去可证伪性（Haile–Hortaçsu–Kosenok）。**

# 为什么值得研究

:::cards g3
### 它解释「知道最优却不总选」
纳什要求 \(P(\text{劣})=0\)；实验室里劣势与近劣策略常有显著正频率。Logit QRE 用 \(\lambda\) 一个参数同时拟合多格选择。【事实】（McKelvey & Palfrey 1995 及大量后续实验）

### 它把 Softmax 变成博弈固定点
机器学习里 Softmax/温度 \(T\) 与 logit 响应同型（\(\lambda\sim 1/T\)）。QRE =「人人 Softmax，且信念自洽」。【分析】

### 它有清晰的失败边界
无约束扰动分布时，QRE 可合理化**任意**正常型行为分布——必须加正则公理或跨处理约束才有实证内容。【事实】（Haile, Hortaçsu & Kosenok, *AER* 2008）
:::

:::note amber 最贵的一次误判
用「随便调一个 \(\lambda\)」把任何偏离都说成 QRE——那是事后叙事，不是预测。正则性（单调、响应、内部性）与跨博弈比较静态才是刀刃。【分析】
:::

# 世界地图

九层看 QRE 如何从统计选择长成行为博弈操作系统。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="qArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度与反馈 · 学习抬高 λ、机制设计用噪声做稳健性</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 实证边界 · Haile 批判 + 正则 QRE 公理</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 现场决策 · 估支付差与 λ，预测选择分布而非点预测</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 扩展型 AQRE · 信息集上的量子回应（1998）</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 λ-同伦 · 从均匀到纳什，常给出均衡选择路径</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 Logit QRE 固定点 · P = σ(λ·EU(P))</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 诊断游戏 · PD、旅人困境、匹配硬币、最后通牒</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 统计选择 · Luce/McFadden 量子选择、Softmax</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 问题意识 · 「绝对最优」在噪声世界里过硬</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L3→L5**：会算 logit、会找固定点、会读 λ 极限。进阶卡在 **L7–L8**：会估、会证伪、知道何时 QRE 只是故事。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="140" y="16" width="400" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">噪声最优回应 + 信念自洽 = QRE</text>

  <rect x="30" y="100" width="190" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="125" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">支付差 Δπ</text><text x="125" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">EUᵢ − EUⱼ</text>
  <rect x="245" y="100" width="190" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">Logit / Softmax</text><text x="340" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">P ∝ e^{λ·EU}</text>
  <rect x="460" y="100" width="190" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="555" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">固定点</text><text x="555" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">信念 = 真实混合</text>

  <line x1="280" y1="60" x2="125" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="555" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="80" y="200" width="220" height="52" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="190" y="222" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">λ → ∞：逼近纳什</text><text x="190" y="240" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">噪声消失</text>
  <rect x="380" y="200" width="220" height="52" rx="8" fill="#f3e8ff" stroke="#7c3aed"/><text x="490" y="222" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">无约束 → 不可证伪</text><text x="490" y="240" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">需正则 / 跨处理</text>

  <line x1="340" y1="152" x2="190" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <line x1="340" y1="152" x2="490" y2="200" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>

  <text x="340" y="300" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">抽象：有限理性 → 机制：量子回应固定点 → 操作：估 λ、读分布</text>
  <text x="340" y="330" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实线=定义展开；红/紫虚线=极限与边界反馈</text>
</svg>
:::

# 核心参与者

| 角色 | 在 QRE 系统中的位置 | 典型动作 |
|---|---|---|
| 受试 / 决策者 | 按相对 EU 概率化选择 | 不是永远最佳回应 |
| 对手（信念对象） | 其混合进入你的 EU | 你以为他 Softmax，他也是 |
| 实验者 | 设定支付、重复、信息 | 改变有效 λ 与可比静态 |
| 结构估计者 | 极大似然估 λ（或异质 λ） | 拟合选择频率 |
| 机制设计者 | 把噪声当稳健性输入 | 规则在有限 λ 下仍有效 |
| 批评者（HHK 等） | 逼问可证伪性 | 要求正则与跨处理约束 |

# 核心变量

| 变量 | 含义 | 杠杆感 |
|---|---|---|
| \(\lambda\)（或 \(\mu=1/\lambda\)） | 理性/精度参数 | \(\lambda\uparrow\) → 更尖锐 |
| \(\Delta\pi = EU_i-EU_j\) | 期望支付差 | 差越大，logit 越偏向 i |
| 策略数 \(K\) | Softmax 分母项数 | \(K\) 大时「均匀底噪」更重 |
| 支付尺度 | 效用单位 | λ 与支付尺度纠缠，不可混比【分析】 |
| 经验 / 重复 | 学习强度 | 后期 λ 常上升【事实】 |
| 误差分布族 | logit / probit / 非参 | 决定可检验内容 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="90" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">支付矩阵</text>
  <rect x="200" y="30" width="140" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="270" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">信念混合 σ₋ᵢ</text>
  <rect x="380" y="30" width="140" height="44" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="450" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">EU → Softmax</text>
  <rect x="520" y="30" width="140" height="44" rx="8" fill="#15181d"/><text x="590" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#fff" font-family="sans-serif">自身混合 σᵢ</text>

  <line x1="160" y1="52" x2="198" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="340" y1="52" x2="378" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="520" y1="52" x2="555" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="100" y="130" width="160" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="180" y="157" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">重复 / 反馈</text>
  <rect x="320" y="130" width="160" height="44" rx="8" fill="#f3e8ff" stroke="#7c3aed"/><text x="400" y="157" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">有效 λ 上升</text>
  <rect x="500" y="130" width="160" height="44" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="580" y="157" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">更近纳什</text>

  <line x1="260" y1="152" x2="318" y2="152" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="480" y1="152" x2="498" y2="152" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <path d="M590,74 C620,100 620,110 580,130" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <path d="M590,52 C640,52 640,200 200,200 C160,200 140,80 200,52" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="340" y="230" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实线：因果链；红虚线：σᵢ 回写信念（固定点）与经验抬升 λ</text>
  <text x="340" y="260" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">均衡 = 映射 σ ↦ Softmax(λ·EU(σ)) 的不动点</text>
</svg>
:::

# 隐藏关系

- **QRE ≠ 颤抖手**：颤抖手是「打算纳什、偶尔失手」的精炼；QRE 是「本来就按相对收益概率选」的替代均衡概念，可与纳什差很远。【分析】
- **QRE ≠ level-k**：level-k 是有限层递推、通常不要求固定点；QRE 是噪声下的一致信念。二者可混合，但不是同一故事。【分析】
- **结构 QRE ↔ 扰动支付贝叶斯博弈**：McKelvey–Palfrey 展示等价视角——噪声可看成私有支付扰动。【事实】
- **λ 与支付尺度纠缠**：同一行为在支付×10 时，拟合 λ 约 ÷10。跨实验直接比 λ 数字常常无效。【推论】
- **跨域同构**：Logit QRE ↔ Softmax 策略 ↔ 热力学玻尔兹曼分布 ↔ logit 离散选择 ↔ 强化学习中的 Boltzmann 探索。【分析】
- **「什么都能拟合」陷阱**：Haile et al. (2008) 证明：扰动分布足够灵活时，任何正常型选择分布都可被某 QRE 合理化。【事实】

# 系统运行机制

1. **给定他人混合** → 算各纯策略期望支付 \(EU_i\)。  
2. **量子回应**：\(P_i \propto e^{\lambda EU_i}\)（logit）或其它正则响应。  
3. **一致性**：自己的 \(P\) 必须等于他人信念中的自己——全体构成固定点。  
4. **（可选）λ-同伦**：从 \(\lambda=0\)（均匀）连续抬到大 λ，路径常收敛到某一纳什，充当选择装置。  
5. **（可选）学习**：重复观察后，有效 λ 往往上升，选择更尖锐。【事实】

:::note green 最小公式（二元）
两策略时：\(P(\text{选好的})=\dfrac{1}{1+e^{-\lambda\Delta\pi}}\)，其中 \(\Delta\pi=EU_{\text{好}}-EU_{\text{差}}\)。  
例：\(\Delta\pi=2,\lambda=1\) → \(P=1/(1+e^{-2})\approx\mathbf{0.8808}\)；\(\Delta\pi=1,\lambda=1\) → \(\approx\mathbf{0.7311}\)。【推论】
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">统计选择</text><text x="80" y="68" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Luce/McFadden</text>
  <circle cx="220" cy="110" r="10" fill="#b8730a"/><text x="220" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1995 QRE</text><text x="220" y="68" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">正规型固定点</text>
  <circle cx="360" cy="110" r="10" fill="#1d4ed8"/><text x="360" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1998 AQRE</text><text x="360" y="68" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">扩展型</text>
  <circle cx="500" cy="110" r="10" fill="#7c3aed"/><text x="500" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">2005 正则</text><text x="500" y="68" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Goeree–Holt–Palfrey</text>
  <circle cx="620" cy="110" r="10" fill="#d5342c"/><text x="620" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">2008 批判</text><text x="620" y="68" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Haile et al.</text>
  <text x="340" y="170" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实验室应用贯穿全程：旅人困境、拍卖、谈判、社会两难……</text>
  <text x="340" y="195" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">经验增加 → 估计 λ 常上升（均衡选择故事的经验脚注）</text>
</svg>
:::

# 利益与激励

| 主体 | 激励 | 对系统的影响 |
|---|---|---|
| 受试 | 赚实验币 / 少思考成本 | 产生可观测噪声选择 |
| 论文作者 | 拟合优度与故事完整性 | 可能过度调 λ / 误差族 |
| 审稿 / 批评者 | 可证伪性 | 推动正则 QRE 与跨处理设计 |
| 平台 / 机制方 | 规则在「人会出错」时仍稳 | 用 QRE 做压力测试而非假设全理性 |
| 交易 / 谈判对手 | 利用你的噪声或被你的噪声伤到 | 策略上要预测分布，不只预测众数 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="fB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
  </defs>
  <rect x="30" y="30" width="150" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="105" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">支付 / 规则</text><text x="105" y="73" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">实验者注入</text>
  <rect x="265" y="30" width="150" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">信念 σ</text><text x="340" y="73" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">信息流核心</text>
  <rect x="500" y="30" width="150" height="60" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="575" y="55" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">选择频率</text><text x="575" y="73" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">可观测输出</text>

  <line x1="180" y1="60" x2="263" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>
  <line x1="415" y1="60" x2="498" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>

  <rect x="150" y="160" width="160" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="230" y="190" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">反馈 / 经验</text>
  <rect x="370" y="160" width="160" height="50" rx="8" fill="#f3e8ff" stroke="#7c3aed"/><text x="450" y="190" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">λ 更新</text>

  <path d="M575,90 C575,130 450,130 450,160" fill="none" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#fB)"/>
  <path d="M370,185 C300,185 230,185 230,90" fill="none" stroke="#0f8a4d" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#fB)"/>
  <text x="340" y="250" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">「抽水」发生在：把选择频率只当噪声丢掉，而不回流更新信念与 λ</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆 | 为什么锋利 |
|---|---|---|
| 1 | **先算 \(\Delta\pi\)，再谈概率** | 没支付差，λ 只是装饰 |
| 2 | **把预测改成分布** | QRE 输出的是频率，不是单点「他会选 X」 |
| 3 | **盯比较静态，不盯单点拟合** | 惩罚变大 → 索赔下降（旅人困境）才是真刀【事实】 |
| 4 | **λ 与支付尺度一起报** | 否则跨场景数字不可比 |
| 5 | **用正则公理过滤故事** | 单调/响应：更好策略不能更少被选 |
| 6 | **重复局分开估 λ** | 经验会抬 λ，混在一起会糊 |
| 7 | **与 level-k / 纳什并列表** | 同数据多模型，防唯一叙事 |
| 8 | **机制压力测试用中等 λ** | 全理性设计在噪声下常碎 |
| 9 | **二元先手算 logit** | \(1/(1+e^{-\lambda\Delta})\) 是直觉锚 |
| 10 | **拒绝「任意误差族」** | 否则落入 HHK 不可证伪区 |

# 常见认知陷阱

:::details 1. 「QRE = 人非理性乱选」
乱选是 \(\lambda=0\)。有限 λ 仍然系统偏好更高 EU——是**有结构的噪声**，不是均匀噪声。【分析】
:::

:::details 2. 「拟合好 = 理论对」
单博弈单 λ 几乎总能拟合得不错；要看跨处理符号与正则约束。【事实】（Haile et al. 2008）
:::

:::details 3. 「λ 越大人越聪明」
λ 是精度/敏感度，与 IQ 不是一回事；且依赖支付尺度。【分析】
:::

:::details 4. 「QRE 精炼纳什」
它是替代/推广，不是精炼：有限 λ 的 QRE 可以远离任何纳什。【事实】
:::

:::details 5. 「和 Softmax 一样所以能直接迁移 ML 温度」
博弈里多了**固定点**：你的 Softmax 改变对方 EU。温度调参 ≠ 求均衡。【推论】
:::

:::details 6. 「劣势策略概率应为 0」
纳什如此；QRE 与数据通常否。用纳什零概率去骂受试，会错失结构。【分析】
:::

:::details 7. 「旅人困境证明纳什错了」
纳什在极限仍可能相关；实验显示**有限噪声下**索赔对惩罚参数敏感——QRE/噪声学习解释的是比较静态。【事实】（Capra et al., *AER* 1999）
:::

:::details 8. 「个体都是同一 λ」
异质性很大；非参研究显示僵化 logit+同质假设会大幅提高拒绝率。【待验证】（匹配硬币非参检验文献）
:::

:::details 9. 「扩展型直接套正规型 QRE」
动态要 AQRE：每个信息集上的量子回应，信念与策略一致。【事实】（McKelvey & Palfrey 1998）
:::

:::details 10. 「会算公式就会用」
现场难点是估 \(\Delta\pi\) 的尺度与对方 λ——公式只是第二步。【推论】
:::

<!-- nav:实践路径 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <rect x="20" y="40" width="200" height="120" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="120" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">抽象</text>
  <text x="120" y="100" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">固定点 · Softmax</text>
  <text x="120" y="120" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">λ · 正则公理</text>

  <rect x="240" y="40" width="200" height="120" rx="10" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">机制</text>
  <text x="340" y="100" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">Δπ → 选择概率</text>
  <text x="340" y="120" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">信念回写 · 学习</text>

  <rect x="460" y="40" width="200" height="120" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="560" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">操作</text>
  <text x="560" y="100" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">估差 · 读分布</text>
  <text x="560" y="120" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">比静态 · 压力测</text>
</svg>
:::

现实例子（同构）：

| 场景 | 抽象结构 | QRE 读法 |
|---|---|---|
| 会议投票 | 多选项、相对收益模糊 | 别假设全员投最优；估「差一点」的被选率 |
| 定价 / 拍卖 | 略高报仍有胜率 | 过低噪声假设会低估超报【分析】 |
| 合规抽检 | 检查博弈 | 违规率对惩罚差敏感，但不会陡降到 0 |
| 产品默认项 | Softmax 过选项 | 提高「最优项」相对效用差，比只靠教育更稳 |
| 对抗性 ML | Boltzmann 探索 | 温度 ↔ λ；对手也在适应你的随机化 |

# 从理论到行动

1. **写清策略与支付**（哪怕主观打分）。  
2. **估对方混合或对称假设** → 算 \(\Delta\pi\)。  
3. **选一个保守 λ 区间**（低/中/高三档）→ 得到选择分布带。  
4. **决策对分布做鲁棒**，不对单点「他一定选 X」下注。  
5. **有反馈就更新 λ**，不要把第一轮噪声当成永恒。

# 技能树

:::details 枝 A · 计算
二元 logit → 对称 2×2 固定点迭代 → 非对称矩阵 → 扩展型信息集（阅读级）
:::

:::details 枝 B · 实证
读选择频率 → 极大似然直觉 → 跨处理符号检验 → 正则公理自检
:::

:::details 枝 C · 对照
纳什极限 → 颤抖手精炼 → level-k / CH → 何时换模型
:::

:::details 枝 D · 应用
机制压力测试 · 谈判保留分布 · 产品选项架构 · 风控「不会为零的违规率」
:::

# 游戏化世界

你进入的世界叫 **「噪声竞技场」**：

- **主线任务**：在有限 λ 下预测对手分布，而不是猜「纳什点」。  
- **隐藏 BOSS**：HHK 龙——你的模型若能解释一切，就什么也没解释。  
- **装备**：\(\Delta\pi\) 计算器、λ 三档带、正则检查清单。  
- **经验值**：每次复盘「预测分布 vs 真实频率」的校准误差。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| T1 手算二元 logit | 给定 \(\lambda,\Delta\pi\)，P 与本手册例题一致 |
| T2 解对称 PD-QRE | 给定 λ，迭代到合作率稳定 |
| T3 读一篇实验图 | 指出哪条比较静态支持/拒绝固定误差分布 |
| T4 现场估一次 | 真实决策写出三档 λ 下的分布带 |
| T5 写拒绝理由 | 列出 3 条「此刻不该用 QRE」的条件 |

# 反事实模拟

:::tabs
@@若 λ=0
人人均匀乱选；策略优势消失，只剩运气。协调博弈塌成噪声。

@@若 λ→∞
回到纳什（或 λ-同伦选出的那个纳什）。旅人困境索赔沉底；PD 合作≈0。

@@若只调 λ 不改支付
可能「拟合」单次数据，但跨处理（惩罚↑）预测会翻车——Capra 等强调的正是惩罚参数的比较静态。【事实】

@@若误差分布任意灵活
落入 HHK：任何行为都有某个 QRE——理论失去牙齿。必须加正则或跨博弈约束。【事实】
:::

## 可调模型 1 · 二元 Logit：收益差如何变成概率

\(P=\dfrac{1}{1+e^{-\lambda\Delta\pi}}\)。默认 \(\lambda=1,\Delta\pi=2\) → \(P\approx\mathbf{88.08\%}\)。

:::raw
<div class="tool" id="tool_logit">
  <div class="ctrl">
    <label>精度 λ <output id="lg_lamO">1.00</output></label>
    <input type="range" id="lg_lam" min="0" max="5" step="0.05" value="1"/>
    <label>支付差 Δπ <output id="lg_dO">2.00</output></label>
    <input type="range" id="lg_d" min="-5" max="5" step="0.1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">P(选高EU)<strong id="lg_p">88.08%</strong></div>
    <div class="ro">P(选低EU)<strong id="lg_q">11.92%</strong></div>
    <div class="ro">λ·Δπ<strong id="lg_ld">2.00</strong></div>
    <div class="ro">等效温度 T=1/λ<strong id="lg_t">1.00</strong></div>
    <div id="lg_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="lg_vh">λ=1、Δπ=2：选「更好」的概率≈88.08%。λ→0 趋向 50%；差为负则偏好翻转。</span></div>
  </div>
  <canvas id="lgChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 囚徒困境的 Logit QRE

支付：合作/合作 3,3；合作/背叛 0,5；背叛/背叛 1,1。对称 QRE 合作率 \(p\) 满足 \(p=\sigma_\lambda(3p,\,1+4p)\) 的第一分量。  
默认 \(\lambda=0.40\) → 合作率 \(\approx\mathbf{36.66\%}\)（纳什为 0）。【推论】

:::raw
<div class="tool" id="tool_pd">
  <div class="ctrl">
    <label>精度 λ <output id="pd_lamO">0.40</output></label>
    <input type="range" id="pd_lam" min="0" max="4" step="0.05" value="0.40"/>
  </div>
  <div class="readout">
    <div class="ro">QRE 合作率<strong id="pd_p">36.66%</strong></div>
    <div class="ro">背叛率<strong id="pd_d">63.34%</strong></div>
    <div class="ro">EU(合作)<strong id="pd_euc">1.100</strong></div>
    <div class="ro">EU(背叛)<strong id="pd_eud">2.467</strong></div>
    <div id="pd_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="pd_vh">λ=0.40：合作≈36.66%。λ↑合作率下降并趋向纳什 0；λ=0 时为 50%。</span></div>
  </div>
  <canvas id="pdChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 猎鹿博弈：λ-同伦如何选均衡

```
      鹿(S)   兔(H)
鹿    5,5     0,4
兔    4,0     2,2
```
两个纯纳什：(S,S) 支付占优，(H,H) 风险占优。从均匀出发抬 λ，对称 logit QRE 趋向 **打兔**（风险占优）。默认 \(\lambda=1\) → \(P(S)\approx\mathbf{19.58\%}\)。【推论】

:::raw
<div class="tool" id="tool_stag">
  <div class="ctrl">
    <label>精度 λ <output id="st_lamO">1.00</output></label>
    <input type="range" id="st_lam" min="0" max="5" step="0.05" value="1"/>
  </div>
  <div class="readout">
    <div class="ro">P(猎鹿)<strong id="st_ps">19.58%</strong></div>
    <div class="ro">P(打兔)<strong id="st_ph">80.42%</strong></div>
    <div class="ro">EU(鹿)<strong id="st_eus">0.979</strong></div>
    <div class="ro">EU(兔)<strong id="st_euh">2.392</strong></div>
    <div id="st_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="st_vh">λ=1：猎鹿≈19.58%。λ↑进一步沉向打兔；λ=0 回到 50-50。支付占优均衡未必被同伦选中。</span></div>
  </div>
  <canvas id="stChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 「看起来优」但噪声下仍翻车

设定你以为的最优行动相对优势 \(\Delta\pi\)，以及你对对方精度 λ 的猜测。看对方选「次优」的概率——这是你做稳健设计时该预算的**失误率地板**。  
默认 \(\Delta\pi=1.5,\lambda=0.8\) → 对方仍有 \(\approx\mathbf{23.15\%}\) 概率选次优。

:::raw
<div class="tool" id="tool_floor">
  <div class="ctrl">
    <label>对方 λ <output id="fl_lamO">0.80</output></label>
    <input type="range" id="fl_lam" min="0" max="4" step="0.05" value="0.80"/>
    <label>你的优势 Δπ <output id="fl_dO">1.50</output></label>
    <input type="range" id="fl_d" min="0.1" max="6" step="0.1" value="1.5"/>
  </div>
  <div class="readout">
    <div class="ro">对方选优 P<strong id="fl_p">76.85%</strong></div>
    <div class="ro">失误地板<strong id="fl_miss">23.15%</strong></div>
    <div class="ro">λ·Δπ<strong id="fl_ld">1.20</strong></div>
    <div class="ro">要把失误压到&lt;5%需 λΔ<strong id="fl_need">≈2.94</strong></div>
    <div id="fl_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="fl_vh">默认下失误地板≈23.15%。要把 P(次优)&lt;5%，需 λ·Δπ≳2.94（logit）。加大支付差或提高对方精度，两条路。</span></div>
  </div>
  <canvas id="flChart" height="214"></canvas>
</div>
:::

:::tabs
@@一次性互动
用模型 1+4：先估 Δπ 与保守 λ，按分布做决策，不赌「他一定最优」。

@@重复有反馈
预期有效 λ 上升；早期按低 λ 预算，后期再收紧。

@@机制设计
用模型 3 的教训：支付占优不等于会被选中；用中等 λ 压力测试规则。
:::

# 四级能力路线

| 级别 | 能力 |
|---|---|
| L1 | 手算二元 logit，说出 λ→0/∞ 极限 |
| L2 | 迭代对称 2×2 QRE，对比纳什 |
| L3 | 读实验比较静态；做正则自检 |
| L4 | 现场分布预测 + 多模型对照 + 知道何时弃用 |

# 30分钟最小实践

1. 选一个真实二选一（回邮件语气 A/B、报价高低、是否催促）。  
2. 给自己打一个主观 \(\Delta\pi\)（−5…5），给对方一个保守 \(\lambda\)（如 0.5–1）。  
3. 用模型 1 算出对方选「你以为的优」的概率。  
4. 只改一件事：要么加大真实支付差，要么按失误地板做备胎。

成本≈0，产出=一张「分布带 + 失误地板」便签。

# 7天计划

| 日 | 动作 |
|---|---|
| D1 | 默写 logit 公式与二元特例 |
| D2 | 手算 PD：λ=0.4 / 1 / 2 的合作率（对照模型 2） |
| D3 | 读 McKelvey–Palfrey 1995 摘要：存在性与 λ 极限 |
| D4 | 读 Haile et al. 2008 核心论断：无约束不可证伪 |
| D5 | 用模型 3 扫 λ，记录何时 P(S)&lt;10% |
| D6 | 现场一次 30 分钟实践 |
| D7 | 写 5 条个人「适用/不适用 QRE」清单 |

# 30天计划

周1：公式与固定点直觉；周2：经典实验比较静态（旅人困境/PD）；周3：与 level-k、颤抖手对照；周4：机制/谈判中的分布预测与复盘校准。

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **Logit QRE**：\(P_i\propto e^{\lambda EU_i}\)，固定点均衡。【事实】
2. **λ 极限**：0→均匀；∞→纳什（泛型下常唯一选择）。【事实】
3. **结构 QRE / 扰动支付**：噪声 ≡ 私有支付冲击。【事实】
4. **正则 QRE**：连续、内部、响应、单调四公理。【事实】（Goeree, Holt & Palfrey 2005）
5. **扩展型 AQRE**：信息集量子回应。【事实】（1998）
6. **旅人困境噪声均衡**：索赔随惩罚参数下降。【事实】（Capra et al. 1999）
7. **HHK 不可证伪结果**：灵活扰动 → 任意行为可合理化。【事实】
8. **Softmax / 温度同构**：\(\lambda \sim 1/T\)。【分析】
9. **与 level-k 对照**：递推 vs 固定点。【分析】
10. **失误地板**：\(P(\text{次优})=1/(1+e^{\lambda\Delta\pi})\)。【推论】

# 关键问题清单

:::details Q1 我有没有写出策略与支付？
没有 Δπ，QRE 无法落地。
:::

:::details Q2 我在预测点还是分布？
QRE 要的是频率带。
:::

:::details Q3 λ 与支付尺度对齐了吗？
跨场景直接比 λ 数字通常无效。
:::

:::details Q4 有没有跨处理比较静态可检验？
只有单点拟合 → 警惕事后故事。
:::

:::details Q5 响应是否满足「更好更常选」？
违反单调/响应 → 不是正则 QRE。
:::

:::details Q6 一次性还是重复？
重复预期 λ 上升。
:::

:::details Q7 该用 QRE 还是 level-k / 纳什？
第一轮深度故事偏 level-k；噪声固定点偏 QRE；极限偏纳什。
:::

:::details Q8 扩展型信息集清楚吗？
动态博弈别硬套正规型。
:::

:::details Q9 我是否掉进「什么都能拟合」？
误差族是否被约束？
:::

:::details Q10 下一步最小复盘是什么？
30 分钟实践里的失误地板便签。
:::

# 下一阶段探索

- 与《层级推理》手册交叉：QRE×level-k 混合估计
- 与《颤抖手完美均衡》对照：精炼 vs 噪声均衡
- 与《猎鹿博弈》对照：风险占优 vs λ-同伦选择
- 现场估 λ 的简易实验（课堂 2×2 矩阵连做 10 局）

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| QRE 定义与存在性、logit 极限 | 经典理论 | McKelvey & Palfrey, *GEB* 1995 | 【事实】 |
| 扩展型 AQRE | 经典理论 | McKelvey & Palfrey, *Experimental Economics* 1998 | 【事实】 |
| 正则 QRE 四公理 | 理论回应 | Goeree, Holt & Palfrey, *Experimental Economics* 2005 | 【事实】 |
| 无约束 QRE 不可证伪 | 方法批判 | Haile, Hortaçsu & Kosenok, *AER* 2008 | 【事实】 |
| 旅人困境索赔 vs 惩罚 | 实验室 | Capra, Goeree, Gomez & Holt, *AER* 1999 | 【事实】 |
| QRE 导论与图示 | 综述/教材向 | Goeree / Holt / Palfrey 等 QRE Primer（Caltech） | 【分析】 |
| Softmax 同构讨论 | 科普/二手 | 智源社区等转述 | 【待验证】 |
| 本手册 PD/猎鹿数值 | 教学推演 | 对称 logit 固定点迭代（见可调模型） | 【推论】 |
| 匹配硬币非参检验拒绝率 | 近期实证 | 非参识别与检验 QRE 工作论文/实验 | 【待验证】 |

标记约定：【事实】多方一致或原始定义；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或转载链长。

# 免责声明 {.appendix}

本手册是认知与决策框架，不是投资建议、谈判承诺或竞赛必胜公式。实验数字来自公开论文与转述，应用现场前请核对原文、支付尺度与你的对手分布。可调模型为教学简化（对称 logit、单一 λ），不能替代正式结构估计。你需对据此采取的行动自行负责。
