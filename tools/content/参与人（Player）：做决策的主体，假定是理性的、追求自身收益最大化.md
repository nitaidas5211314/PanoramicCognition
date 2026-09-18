---
slug: 参与人（Player）：做决策的主体，假定是理性的、追求自身收益最大化
title: 参与人（Player）：做决策的主体，假定是理性的、追求自身收益最大化
subtitle: 博弈论里的「人」不是真人画像，而是一条<strong>建模约定</strong>——偏好一致、信念更新、选择最优反应。用错它会把实验里的公平感当成「非理性」；用对它，你能把对手、自己、算法都放进同一张决策图。
brand_sub: Player × Rational Choice
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 参与人, 理性选择, 有限理性, 行为实验]
theme_js_file: 参与人（Player）：做决策的主体，假定是理性的、追求自身收益最大化.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**参与人（Player）** 不是「聪明、自私的真人」，而是博弈模型里的**决策节点**：有可选行动、有偏好（效用）、有关于他人的信念，并在给定信念下选对自己最好的策略。

这句话拆开有三层：

1. **建模原语**：没有参与人，就没有策略、均衡、信息结构——后面一切都无处挂载。
2. **理性是技术约定**：在信念 μ 下选最大化期望效用的行动；不是道德评价，也不是智商声明。【事实】
3. **「收益最大化」里的收益可以是任何东西**：金钱、相对地位、公平感、声誉、算法目标函数——效用函数写进什么，「理性」就最大化什么。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

这里研究的不是「人为什么做决策」的全部心理学，而是：**当多个决策主体的结果相互依赖时，一个可用的主体模型长什么样**。

边界很清楚：

- **在界内**：偏好、信念、信息、策略、最优反应、均衡的认识论条件。
- **在界外**：大脑神经回路、企业文化细节、具体法规条文——除非它们被压缩成偏好或约束。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 作为决策主体的参与人如何被形式化，以及该形式化如何支撑预测与设计 |
| 2 | 边界在哪 | 到「偏好与信念可被写入模型」为止；无法写入的动机只能当外生噪声或另建模型 |
| 3 | 核心对象 | 行动集、策略、效用、信念、信息划分、类型 |
| 4 | 参与者 | 人类、企业、算法、国家——凡能选行动并承担后果的实体 |
| 5 | 关键变量 | 理性深度、信念精度、信息私有度、贴现因子、风险态度、社会偏好权重 |
| 6 | 可直接观察 | 选择、报价、接受/拒绝、出价序列、实验中的转移额 |
| 7 | 无法直接观察 | 真实效用、私有信息、层级信念（我猜你猜我……） |
| 8 | 谁影响谁 | 他人策略 → 我的支付 → 我的最优反应 → 他人支付（闭环） |
| 9 | 因果关系 | 信念改变 → 最优反应改变（明确）；支付矩阵改变 → 均衡可能跳变 |
| 10 | 只是相关 | 「看起来自私」与「真的只关心钱」——最后通牒拒绝可能是公平，也可能是Spite【分析】 |
| 11 | 表层现象 | 合作/背叛、还价、投票、竞价、算法对冲 |
| 12 | 底层机制 | 给定信息与信念的期望效用最大化（或有限理性替代规则） |
| 13 | 有反馈吗 | 有。行动被观察 → 信念更新 → 下一期行动 |
| 14 | 有延迟吗 | 有。学习、声誉、制度适应都以时间计 |
| 15 | 正/负反馈 | 协调博弈是正反馈；套利与惩罚规范常是负反馈 |

## 最关键的一句话

> 参与人假设回答的是「**在模型里谁在选、按什么规则选**」，不是「现实中的人是否完美」。

把假设当成对人性的赞美或谴责，是后面几乎所有认知陷阱的入口。

# 为什么值得研究

:::cards g3
### 它是所有策略推理的挂钩点
没有参与人，就没有「最优反应」；没有最优反应，纳什均衡、占优策略、逆向归纳都无处安放。学博弈论却跳过参与人定义，等于学力学却不定义质点。

### 它决定你何时该信模型、何时该改模型
最后通牒实验里，提议者常报出总额的 30%–50%，回应者常拒绝低于约 20% 的报价——与「最小正报价 + 接受任意正额」的纯自利纳什预测系统性偏离【事实】。这不是「博弈论破产」，而是**效用函数写错了**（漏了公平/相对地位）。

### 它直接迁移到市场、谈判、AI 对齐
量化交易对手、并购出价方、多智能体强化学习里的 agent，都是「参与人」的实例。搞清假设边界，比背十个均衡概念更能避免用错工具。
:::

:::note amber 一个必须先吞下的区分
Stanford 百科对效用的当代用法指出：自 Samuelson 以降，「代理人最大化效用」在标准表述里近乎**同义反复**——效用就是用来描述一致选择的那根尺子【分析】。所以争论「人是不是真的在最大化效用」常常是伪问题；真正的问题是：**你写进效用的东西，是否抓住了决策者在乎的维度**。
:::

# 世界地图

九层看「参与人」如何从抽象假设落到可操作对象。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="pArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度与规则制定者 · 改写游戏本身</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 多主体系统 · 市场 / 平台 / 多智能体</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 重复博弈与声誉 · 贴现因子 δ 决定「要不要今天背叛」</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 信念层级 · 我猜你猜我（认知层次 / 共同知识）</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 信息结构 · 完美/不完美、完备/不完备、私有类型</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 决策规则 · EU 最大化 / 最大最小 / 满意化 / Level-k</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 偏好与效用 · 自利 / 公平 / 风险态度 / 时间偏好</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 行动与策略集 · 纯策略 / 混合 / 行为策略</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 参与人身份 · 谁选、选了谁承担后果</text>
</svg>
:::

:::note blue 读图要点
大多数入门错误发生在 **L3–L4**：把「收益=金钱」写死，却用 L6 的复杂信念去推理——结果模型精密地错。先问效用里装了什么，再问算多深。
:::

# 核心概念地图

:::raw
<svg viewBox="0 0 680 340" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="240" y="20" width="200" height="56" rx="10" fill="#15181d"/><text x="340" y="54" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" font-family="sans-serif">参与人 Player</text>

  <rect x="40" y="120" width="160" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="120" y="150" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">行动集 Aᵢ</text>
  <rect x="260" y="120" width="160" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="150" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">效用 uᵢ</text>
  <rect x="480" y="120" width="160" height="50" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="560" y="150" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">信念 μᵢ</text>

  <line x1="300" y1="76" x2="140" y2="120" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="340" y1="76" x2="340" y2="120" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="380" y1="76" x2="540" y2="120" stroke="#d5342c" stroke-width="1.5" marker-end="url(#cB)"/>

  <rect x="140" y="220" width="400" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="340" y="250" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">最优反应 BRᵢ(μ) = argmax EUᵢ(· ; μ)</text>
  <line x1="120" y1="170" x2="280" y2="220" stroke="#7c848f" stroke-width="1.2"/>
  <line x1="340" y1="170" x2="340" y2="220" stroke="#7c848f" stroke-width="1.2"/>
  <line x1="560" y1="170" x2="400" y2="220" stroke="#7c848f" stroke-width="1.2"/>

  <rect x="180" y="290" width="320" height="40" rx="8" fill="#f3f4f6"/><text x="340" y="315" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">均衡 = 信念与策略相互支持的不动点</text>
</svg>
:::

| 概念 | 在系统里的作用 | 常见误读 |
|---|---|---|
| 理性 | 按既定决策规则选最优 | 「冷酷自私」 |
| 效用 | 偏好的数字表示 | 「快乐值」或「金钱」 |
| 信念 | 对他人策略/类型的概率评估 | 「必须正确」——错的信念下仍可理性 |
| 最优反应 | 给定信念的最佳策略集 | 「唯一答案」——可多值 |
| 共同知识 | 大家知道、且知道大家知道…… | 「纳什必需」——Aumann–Brandenburger (1995) 表明两人情形只需相互知识等更弱条件【事实】 |

# 核心参与者

这里的「参与者」是元层面的：谁在真实世界里扮演 Player 角色。

:::cards g2
### 人类决策者
实验室被试、谈判代表、交易员。可观察选择，效用需推断。行为博弈反复显示：纯金钱自利预测常失败，但「理性 + 更丰富偏好」仍可用。【事实】

### 组织与法人
公司、基金、政府部门。常被建模为单一参与人，但内部代理问题会撕裂「一个效用」假设——这是组织博弈的入口。

### 算法与 AI agent
强化学习策略、做市算法、推荐系统。目标函数显式写在代码里，反而更接近经典「理性参与人」；风险是**目标写错**而非算力不足。

### 模型构建者（你）
你选择写进模型的参与人集合与效用。遗漏关键参与人（如监管、做市商）比算错均衡更致命。
:::

# 核心变量

| 变量 | 符号直觉 | 杠杆作用 |
|---|---|---|
| 行动集大小 | \|Aᵢ\| | 太大 → 计算不可行 → 逼出有限理性 |
| 风险态度 | 相对风险厌恶 r | 同一彩票，r↑ → 确定性等价↓（见工具 4） |
| 贴现因子 | δ | 重复博弈里合作门槛：经典 PD 中 TFT 可持续需 δ ≥ 0.5（T=5,R=3,P=1）【推论】 |
| 信念精度 | μ 的集中度 | 信念错 → 「理性地」走错路 |
| 推理深度 | Level-k 的 k | 选美竞赛：λ=2/3、L0=50 → L1≈33.3、L2≈22.2、L3≈14.8【事实】（计算） |
| 公平权重 | α / 拒绝阈值 τ | 最后通牒：τ≈20 时常拒绝；提议中位常在 40–50【待验证】（跨研究区间） |
| 信息私有度 | 类型空间 | 不完备信息 → 贝叶斯博弈 |

:::note green 数字锚点（先算后写）
囚徒困境标准支付（合作/背叛：3/3，0/5，5/0，1/1）下，若对手合作概率为 p，则 EU(合作)=3p，EU(背叛)=1+4p，**差距恒为 1+p > 0**——单次博弈里背叛严格占优，与 p 无关。【推论】
:::

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="ca1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#15181d"/></marker>
    <marker id="ca2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="30" width="130" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="95" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">信息到达</text>
  <rect x="200" y="30" width="130" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="265" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">信念更新</text>
  <rect x="370" y="30" width="130" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="435" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">最优反应</text>
  <rect x="540" y="30" width="110" height="44" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="595" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">支付实现</text>
  <line x1="160" y1="52" x2="198" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#ca1)"/>
  <line x1="330" y1="52" x2="368" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#ca1)"/>
  <line x1="500" y1="52" x2="538" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#ca1)"/>

  <path d="M595,74 C595,160 95,160 95,74" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#ca2)"/>
  <text x="340" y="175" text-anchor="middle" font-size="12" fill="#d5342c" font-family="sans-serif">反馈：支付与行动被他人观察 → 改写下一期信念</text>

  <rect x="80" y="210" width="520" height="70" rx="10" fill="#f3f4f6"/>
  <text x="340" y="240" text-anchor="middle" font-size="13" font-weight="600" fill="#15181d" font-family="sans-serif">因果链（实线）vs 相关陷阱（易混）</text>
  <text x="340" y="262" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">「拒绝低报价」≠「一定追求公平」——也可能是相对优势（Spite）动机【分析】</text>
</svg>
:::

## 明确因果

1. **支付矩阵改变 → 最优反应集改变**（定义性）。
2. **信念改变 → 在同一矩阵下选择可变**（期望效用定义）。
3. **可观察行动 → 他人贝叶斯更新**（在共同先验假设下）。

## 相关但非必然因果

- 出价慷慨 ↔ 恐惧被拒（最后通牒里独裁者博弈出价更低，说明恐惧与公平并存）【事实】。
- 「算得更深」↔「赚得更多」：选美竞赛里过深推理会猜向 0，但实验人群常停在低 k【待验证】。

# 隐藏关系

:::cards g2
### 效用同构：看起来利他，其实仍在最大化
把「对方收益」写进自己的 uᵢ，行为变「亲社会」，数学上仍是理性参与人。隐藏关系是：**规范争论常可改写成偏好争论**。

### 理性共同知识的强度被高估
Aumann & Brandenburger (1995)：两人博弈中，支付、理性、猜想的**相互知识**即可支撑纳什；共同知识主要在 n≥3 时以「猜想的共同知识」形式出现【事实】。

### 程序理性 vs 实质理性（Simon）
Herbert Simon 批评：经典博弈参与人假设具备完备信息与无限计算；真实主体在复杂树（如下棋）里只能搜索局部，用**满意化（satisficing）**而非全局最大化【分析】。隐藏关系：同一「理性」词覆盖了两种完全不同的能力主张。

### 惩罚者异质
Scientific Reports 研究显示：最后通牒里拒绝不公平报价者，既有独裁者博弈中也慷慨的亲社会惩罚者，也有独裁时给 0 的Spite惩罚者——**同行为，不同参与人类型**【事实】。
:::

# 系统运行机制

抽象层 → 机制层 → 操作层的三层映射：

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="m1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="20" width="200" height="220" rx="12" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="120" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">抽象</text>
  <text x="120" y="80" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">偏好 ≿</text>
  <text x="120" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">理性公理</text>
  <text x="120" y="130" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">共同/相互知识</text>
  <text x="120" y="155" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">均衡概念</text>

  <rect x="240" y="20" width="200" height="220" rx="12" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">机制</text>
  <text x="340" y="80" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">期望效用</text>
  <text x="340" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">最优反应动态</text>
  <text x="340" y="130" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">贝叶斯更新</text>
  <text x="340" y="155" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">Level-k / QRE</text>

  <rect x="460" y="20" width="200" height="220" rx="12" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="560" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">操作</text>
  <text x="560" y="80" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">写清对手效用</text>
  <text x="560" y="105" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">估计信念 p</text>
  <text x="560" y="130" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">选 BR 或满意解</text>
  <text x="560" y="155" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">用实验校准 τ,k,r</text>

  <line x1="220" y1="130" x2="238" y2="130" stroke="#7c848f" stroke-width="1.5" marker-end="url(#m1)"/>
  <line x1="440" y1="130" x2="458" y2="130" stroke="#7c848f" stroke-width="1.5" marker-end="url(#m1)"/>
</svg>
:::

## 运行节奏（单次互动）

```
观察到的历史 → 形成 μ → 计算 BR(μ) → 执行 → 产生公共/私有信号 → 循环
```

若决策规则从 EU 换成「满意化」或「启发式」，同一支付矩阵可走出完全不同路径——**参与人模块是可替换的引擎零件**。

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="t1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="110" r="10" fill="#1d4ed8"/><text x="80" y="70" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1944</text><text x="80" y="145" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">vN-M</text><text x="80" y="162" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">期望效用公理</text>
  <circle cx="200" cy="110" r="10" fill="#1d4ed8"/><text x="200" y="70" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1950s</text><text x="200" y="145" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Nash / Simon</text><text x="200" y="162" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">均衡 vs 有限理性</text>
  <circle cx="340" cy="110" r="10" fill="#b8730a"/><text x="340" y="70" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1982</text><text x="340" y="145" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Güth UG</text><text x="340" y="162" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">实验冲击自利</text>
  <circle cx="480" cy="110" r="10" fill="#0f8a4d"/><text x="480" y="70" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">1995</text><text x="480" y="145" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Aumann-B</text><text x="480" y="162" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">认识论条件</text>
  <circle cx="600" cy="110" r="10" fill="#d5342c"/><text x="600" y="70" text-anchor="middle" font-size="11" font-weight="600" fill="#15181d" font-family="sans-serif">2000s+</text><text x="600" y="145" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">行为/算法</text><text x="600" y="162" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">QRE · MARL</text>
  <line x1="90" y1="110" x2="190" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#t1)"/>
  <line x1="210" y1="110" x2="330" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#t1)"/>
  <line x1="350" y1="110" x2="470" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#t1)"/>
  <line x1="490" y1="110" x2="590" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#t1)"/>
</svg>
:::

演化不是「理性假设被推翻」，而是**参与人模块不断被特化**：社会偏好、量子响应（QRE）、认知层次、以及代码里的显式 reward。

# 利益与激励

谁从「坚持经典理性参与人」中获益？谁从「改写参与人」中获益？

| 主体 | 激励 | 风险 |
|---|---|---|
| 理论家 | 简洁、可证均衡 | 过度抽象，预测失灵 |
| 机制设计师 | 用理性反应设计拍卖/匹配 | 参与人不按模型反应 → 机制失灵 |
| 实验学家 | 揭示偏好异质性 | 实验室效应外推 |
| 交易员/谈判者 | 用对手模型获利 | 镜像谬误：以为对手与己同构 |
| AI 对齐研究者 | 目标可写清 | 错误目标被「完美理性」执行得更狠 |

:::note red 激励扭曲警示
若你的绩效只考核「短期金钱」，你的参与人模型会被环境**训练成**短视自利——这不是人性注定，是激励塑造的效用。【推论】
:::

# 资源与信息流

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="f1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
    <marker id="f2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="40" y="40" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="75" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">支付 / 筹码</text>
  <rect x="270" y="40" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="75" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">参与人 i</text>
  <rect x="500" y="40" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="570" y="75" text-anchor="middle" font-size="13" font-weight="600" font-family="sans-serif" fill="#15181d">参与人 j</text>

  <line x1="180" y1="70" x2="268" y2="70" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#f1)"/>
  <line x1="410" y1="55" x2="498" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#f2)"/>
  <line x1="498" y1="85" x2="410" y2="85" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#f2)"/>
  <text x="450" y="42" font-size="11" fill="#1d4ed8" font-family="sans-serif">行动</text>
  <text x="450" y="108" font-size="11" fill="#1d4ed8" font-family="sans-serif">观察</text>

  <rect x="120" y="160" width="440" height="90" rx="10" fill="#f3f4f6"/>
  <text x="340" y="190" text-anchor="middle" font-size="13" font-weight="600" fill="#15181d" font-family="sans-serif">抽水层（常被忽略的「第零个参与人」）</text>
  <text x="340" y="215" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">平台抽成 · 交易所费用 · 实验被试费预算 · 算力成本</text>
  <text x="340" y="235" text-anchor="middle" font-size="12" fill="#7c848f" font-family="sans-serif">它们改变净支付，从而改变最优反应——却很少被画进 2×2 矩阵</text>
</svg>
:::

信息流的关键不对称：

- **私有类型**流向行动，再经行动部分泄露；
- **公共信号**同步所有人的信念更新；
- **噪声**保护信息优势，也制造错误理性行为。

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 序 | 杠杆点 | 为何高杠杆 | 起步动作 |
|---|---|---|---|
| 1 | 重写效用维度 | 一个公平项可翻转 UG 预测 | 问：对手还在乎相对地位吗？ |
| 2 | 显式化信念 μ | 多数「非理性」其实是错信念 | 写出「我认为他选 X 的概率」 |
| 3 | 限定推理深度 k | 比假设共同知识更贴近实验室 | 用 Level-1/2 做默认对手模型 |
| 4 | 改信息结构 | 同一偏好，不同信息 → 不同均衡 | 问：谁先动、谁看见什么 |
| 5 | 引入贴现 δ | 单次背叛 vs 重复合作分界 | 估计关系是否「还会再见」 |
| 6 | 换决策规则 | EU → 满意化 / maximin | 复杂树上停止全局最优幻想 |
| 7 | 识别参与人集合 | 漏掉监管/平台会错整盘 | 列出所有能改支付的实体 |
| 8 | 校准风险态度 r | 同一期望值，选择可反转 | 用确定性等价直觉估 r |
| 9 | 分离类型（异质） | 平均行为掩盖双峰 | 不要只用均值拟合 |
| 10 | 机制侧约束行动集 | 缩小 Aᵢ 比教育理性更有效 | 设计默认选项与承诺装置 |

# 常见认知陷阱

:::details 1. 把理性当成道德指控
「他不理性」常被用作骂人。技术含义只是：行为与给定决策规则不一致。先问规则写没写对。
:::

:::details 2. 默认收益=金钱
实验室与职场里，面子、公平、相对排名经常进效用。金钱自利是**特例**，不是定义。
:::

:::details 3. 混淆「错信念」与「非理性」
在错误 μ 下最大化 EU，仍然理性。该更新的是信念模型，不是扔掉优化。
:::

:::details 4. 以为纳什需要共同知识的理性
两人情形下条件更弱（Aumann–Brandenburger）。过度堆共同知识会让模型不必要地脆弱。【事实】
:::

:::details 5. 用单次 UG 拒绝证明「人非理性」
拒绝低报价可被公平偏好或 Spite 偏好理性化。关键是识别类型，而非放弃参与人框架。【分析】
:::

:::details 6. 镜像谬误
默认对手与自己同效用、同深度。选美竞赛与交易里这是亏损加速器。
:::

:::details 7. 无限计算能力幻觉
象棋合法着法约数十，完整策略树天文数字。Simon：好棋手通常只认真展开约 6–12 个候选【待验证】（de Groot 经典观察量级）。
:::

:::details 8. 把均衡当预测的唯一候选
多均衡时，参与人模型不告诉你「会落在哪」——需要学习动态、焦点或制度。
:::

:::details 9. 忽略抽水参与人
费用、税收、平台佣金改变净支付。矩阵写的是毛额时，BR 可能全错。
:::

:::details 10. 用结果倒推参与人质量
好决策可以因方差变坏结果。评估应看信息集与规则一致性，而非单次盈亏。
:::

:::details 11. 「算法是理性的所以安全」
算法更接近经典参与人；若目标函数错位，理性只是高效地做错事。
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象概念 | 现实对应 | 操作含义 |
|---|---|---|
| 参与人 i | 谈判对手 / 竞争对手基金 / RL agent | 先命名「谁在选」 |
| 效用 uᵢ | KPI、奖金、相对排名、价值观 | 访谈或从行为反推维度 |
| 信念 μ | 「我觉得他会砍价」 | 写成概率，避免形容词 |
| 最优反应 | 报价、仓位、同意/拒绝 | 可计算或可模拟 |
| 有限理性 | 时间不够、菜单太长 | 换满意化或缩小菜单 |
| 类型 | 公平型 vs Spite 型 | 用第二个游戏（如独裁者）鉴别 |

## 跨域同构（同一数学结构，不同名字）

| 结构 | 博弈论 | 其他领域 |
|---|---|---|
| 期望效用最大化 | 理性参与人 | 强化学习中的 reward 最大化 |
| 最优反应不动点 | 纳什 | 宏观一致预期、流量均衡 |
| 层次信念 | Level-k / 共同知识 | 扑克「他知道我知道」、安全多方计算 |
| 满意化 | Simon 程序理性 | 启发式搜索、早停 |
| 社会偏好 | Fehr-Schmidt 等 | 互惠利他、规范执行 |

# 从理论到行动

:::flow
定义参与人集合 <i>→</i> 写出效用维度 <i>→</i> 估计信念与深度 <i>→</i> 计算/模拟 BR <i>→</i> 对照数据校准 <i>→</i> 改机制或改策略
:::

## 行动清单（按场景）

1. **谈判前**：对方还在乎面子吗？关系是否重复（δ）？
2. **产品机制**：用户是 EU 最大化还是默认选项驱动？
3. **交易对手**：其 KPI 是绝对 PnL 还是相对排名？
4. **团队决策**：把组织拆成多个参与人，而不是一个「公司效用」。

# 技能树

:::details 🌱 基础：能陈述参与人三件套
行动集、效用、信念。能指出一个现实冲突里这三者各是什么。
:::

:::details 🌿 进阶：能算简单最优反应
给定 2×2 与 p，比较 EU；能解释为何单次 PD 背叛占优（差距 1+p）。
:::

:::details 🌳 熟练：能改效用解释实验
用公平阈值 τ 重述 UG；知道独裁者 vs 最后通牒出价差的含义。
:::

:::details 🏔️ 专家：能处理认知层次与认识论
Level-k、相互/共同知识条件；知道何时不该假设共同知识理性。
:::

:::details 🚀 大师：能设计参与人模块
在机制设计或多智能体系统里，显式选择决策规则并做稳健性测试（错信念、异质类型）。
:::

# 游戏化世界

把「参与人实验室」当成可探索地图：

:::cards g3
### 新手村 · 单人决策
无对手。只练风险态度与时间偏好。通关条件：能口述确定性等价。

### 平原 · 2×2 同时行动
PD、协调、斗鸡。通关条件：独立算出 BR 表。

### 山地 · 序贯与逆向归纳
最后通牒、进入威慑。通关条件：写出子博弈完美路径。

### 迷宫 · 不完备信息
类型与信号。通关条件：画一条信念更新路径。

### Boss · 异质人群
公平/Spite/自利混合。通关条件：设计第二个游戏做类型分离。
:::

# 任务系统

| 任务 | 难度 | 产出 | 验收 |
|---|---|---|---|
| T1 给当前冲突命名参与人 | ★ | 名单 ≥3 | 含「抽水者」则加分 |
| T2 写对方效用的 3 个维度 | ★★ | 清单 | 至少一个非金钱 |
| T3 估一个信念 p 并算 BR | ★★ | 算式 | 与工具 1 一致 |
| T4 做一次纸面 UG | ★★★ | 报价+阈值 | 记录是否拒绝 |
| T5 Level-k 猜数 | ★★ | 提交数字 | 对照工具 3 |
| T6 找一个「理性但错信念」案例 | ★★★ | 短复盘 | 分清规则 vs 信念 |

# 反事实模拟

:::tabs
@@若效用只有金钱
经典预测：UG 报价趋近最小正额，回应者接受任意正额。实验室系统偏离 → 说明该反事实世界与人类被试世界不同。【事实】

@@若对方是 Level-1
选美竞赛 λ=2/3、L0 均值 50 → 对方猜 ≈33.3。你若是 Level-2，应报 ≈22.2。若你误以为对方是纳什（0），你会报太低而偏离人群。【推论】

@@若关系无限重复且 δ≥0.5
在标准 PD 支付下，TFT 类策略可支撑合作；单次博弈的「背叛占优」不再是唯一相关故事。【推论】

@@若决策规则改为满意化
参与人找到「足够好」即停。复杂问题里预测从「全局最优」变为「依赖搜索顺序与抱负水平」——更接近组织现实。【分析】
:::

## 可调模型 1 · 信念 → 最优反应（囚徒困境）

给定对手合作概率 p，比较合作与背叛的期望效用（支付：C/C=3，C/D=0，D/C=5，D/D=1）。

:::raw
<div class="tool" id="tool_pd">
  <div class="ctrl">
    <label>对手合作概率 p <output id="pd_pO">0.50</output></label>
    <input type="range" id="pd_p" min="0" max="1" step="0.01" value="0.50"/>
  </div>
  <div class="readout">
    <div class="ro">EU(合作)<strong id="pd_c">1.50</strong></div>
    <div class="ro">EU(背叛)<strong id="pd_d">3.00</strong></div>
    <div class="ro">优势差距<strong id="pd_gap">1.50</strong></div>
    <div id="pd_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="pd_vh">背叛严格占优（差距 = 1+p &gt; 0）</span></div>
  </div>
  <canvas id="pdChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 最后通牒：报价 × 拒绝阈值

总额 100。回应者在报价 &lt; τ 时拒绝；双方得 0。看「自利报价」与「怕拒/公平」如何互动。

:::raw
<div class="tool" id="tool_ug">
  <div class="ctrl">
    <label>提议者报价 o <output id="ug_oO">40</output></label>
    <input type="range" id="ug_o" min="0" max="100" step="1" value="40"/>
    <label>拒绝阈值 τ <output id="ug_tO">20</output></label>
    <input type="range" id="ug_t" min="0" max="100" step="1" value="20"/>
  </div>
  <div class="readout">
    <div class="ro">是否成交<strong id="ug_acc">接受</strong></div>
    <div class="ro">提议者所得<strong id="ug_prop">60</strong></div>
    <div class="ro">回应者所得<strong id="ug_resp">40</strong></div>
    <div id="ug_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ug_vh">o≥τ → 成交；实验室常见 τ 约 20、o 约 40–50【待验证】</span></div>
  </div>
  <canvas id="ugChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · Level-k 选美竞赛

猜 λ × 平均分（默认 λ=2/3），L0 基准为区间中点 50。看推理深度如何把数字压向 0。

:::raw
<div class="tool" id="tool_lk">
  <div class="ctrl">
    <label>乘数 λ <output id="lk_lO">0.667</output></label>
    <input type="range" id="lk_l" min="0.100" max="0.900" step="0.001" value="0.667"/>
    <label>你的层级 k <output id="lk_kO">2</output></label>
    <input type="range" id="lk_k" min="0" max="8" step="1" value="2"/>
    <label>L0 基准 <output id="lk_bO">50</output></label>
    <input type="range" id="lk_b" min="0" max="100" step="1" value="50"/>
  </div>
  <div class="readout">
    <div class="ro">你的猜测<strong id="lk_guess">22.2</strong></div>
    <div class="ro">L1<strong id="lk_l1">33.4</strong></div>
    <div class="ro">L∞ 极限<strong id="lk_inf">0.0</strong></div>
    <div id="lk_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="lk_vh">默认：L2 ≈ 22.2（λ=0.667≈2/3, L0=50）</span></div>
  </div>
  <canvas id="lkChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 风险态度：彩票的确定性等价

50% 得 100、50% 得 20（期望值 60）。CRRA 效用下看风险厌恶如何压低 CE。

:::raw
<div class="tool" id="tool_ce">
  <div class="ctrl">
    <label>相对风险厌恶 r <output id="ce_rO">0.50</output></label>
    <input type="range" id="ce_r" min="0" max="3" step="0.05" value="0.50"/>
    <label>高结果 <output id="ce_hiO">100</output></label>
    <input type="range" id="ce_hi" min="30" max="200" step="1" value="100"/>
    <label>低结果 <output id="ce_loO">20</output></label>
    <input type="range" id="ce_lo" min="1" max="80" step="1" value="20"/>
  </div>
  <div class="readout">
    <div class="ro">期望值 EV<strong id="ce_ev">60.0</strong></div>
    <div class="ro">确定性等价 CE<strong id="ce_ce">52.4</strong></div>
    <div class="ro">风险溢价<strong id="ce_rp">7.6</strong></div>
    <div id="ce_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ce_vh">r=0 → CE=EV；r=0.5 → CE≈52.4（RP≈7.6）</span></div>
  </div>
  <canvas id="ceChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 标志性产出 |
|---|---|---|
| L1 识别 | 指出谁是参与人、收益是否仅金钱 | 冲突参与人图 |
| L2 计算 | 独立完成 BR / 简单逆向归纳 | 手算与工具误差 &lt; 0.1 |
| L3 校准 | 用数据估 τ、k、r、δ | 一页校准备忘 |
| L4 设计 | 改行动集或信息结构以改变均衡 | 机制/策略备选方案 |

# 30分钟最小实践

**目标**：把眼前一个真实冲突，压缩成「参与人卡」。

1. **5 分钟**：列出 ≥3 个参与人（含可能抽水者）。
2. **10 分钟**：为主要对手写效用三维度（至少一维非金钱）。
3. **10 分钟**：估一个 p 或 τ，用本页工具 1 或 2 算最优反应。
4. **5 分钟**：写一句「若我的信念错 ±0.2，结论是否翻转？」

验收：你有一张卡，上面有名字、效用维度、一个数字信念、一句敏感性结论。成本：¥0。

# 7天计划

| 天 | 焦点 | 练习 |
|---|---|---|
| D1 | 三件套 | 复述行动/效用/信念，各举一例 |
| D2 | 占优与 BR | 手算 PD 在 p=0.3/0.7 的 EU，对照工具 1 |
| D3 | UG | 与朋友做一次纸面最后通牒，记录 o 与是否拒绝 |
| D4 | Level-k | 猜 λ=2/3 选美，先盲猜再看工具 3 |
| D5 | 风险 | 用工具 4 找让你「CE≈心里价位」的 r |
| D6 | 重复博弈 | 估计一段关系的 δ：还会再见吗？ |
| D7 | 复盘 | 找一个「我以为他非理性」的案例，改写为效用或信念问题 |

# 30天计划

:::cards g3
### 第 1 周 · 语言
每天识别一个决策主体，写三件套。禁止使用「他不理性」除非指出哪条规则被违反。

### 第 2 周 · 计算
完成 10 个 2×2 BR；3 个序贯逆向归纳；2 次 Level-k 预测并对照真实他人猜测。

### 第 3 周 · 校准
收集或引用一组 UG/独裁者公开结果，估 τ 与公平权重；写半页「金钱自利预测误差」。

### 第 4 周 · 迁移
把框架用到工作中一次真实谈判或产品决策；提交前后对比：改了哪一维效用或信息。
:::

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **期望效用参与人**：在信念下最大化 EU。
2. **纳什参与人闭环**：策略是相互最优反应。
3. **贝叶斯参与人**：对类型有先验并更新。
4. **Level-k 参与人**：有限深度最优反应链。
5. **QRE 参与人**：更好的行动被更频繁选择，但非完美。
6. **社会偏好参与人**：效用含他人收益或不平等厌恶。
7. **满意化参与人**：达到抱负水平即停。
8. **最大最小参与人**：按最坏情形优化（极端不确定性）。
9. **贴现重复参与人**：δ 权衡今日背叛与明日惩罚。
10. **算法参与人**：显式 reward + 约束下的优化器。

# 关键问题清单

:::details 这个参与人的行动集是否被我漏写了？
遗漏「退出」「公开羞辱」「引入第三方」等行动会改变整个博弈。
:::

:::details 效用里是否只剩金钱？
检查相对地位、公平、延迟成本、认知负担。
:::

:::details 我的信念有没有写成概率？
「他大概会同意」无法进入 EU；换成 p=0.65 才能算。
:::

:::details 这是单次还是重复？
δ 与声誉可翻转占优策略。
:::

:::details 信息是谁先看到的？
同时行动 vs 序贯，均衡概念不同。
:::

:::details 人群是同质还是异质？
均值模型可能掩盖双峰（公平惩罚 vs Spite）。
:::

:::details 我是否把错信念当成了非理性？
先画信念更新，再谈决策规则。
:::

:::details 有没有第零个抽水参与人？
费用与平台规则是否进了净支付。
:::

:::details 计算是否可行？
不可行时，经典理性假设本身失效，应换程序理性。
:::

:::details 若信念偏移 0.2，结论是否稳健？
不稳健的 BR 不能当行动依据，只能当假设。
:::

# 下一阶段探索

- 读 Osborne & Rubinstein《A Course in Game Theory》开篇论理性行为；对照 Myerson 对理性决策者的定义。【分析】
- 精读 Aumann–Brandenburger (1995) 认识论条件——专门清理「共同知识迷信」。
- 做或复现小型 UG + 独裁者双游戏，尝试分离亲社会惩罚与 Spite。
- 在工作中选一个多智能体/多部门冲突，画参与人图并改一个信息结构做 A/B。
- 延伸：量子响应均衡（QRE）、心理博弈（belief-dependent utility）、AI 对齐中的目标错置。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 理性/效用的当代技术定义 | 哲学百科 | Stanford Encyclopedia of Philosophy, Game Theory | 【分析】 |
| 理性决策者形式定义 | 教材 | Myerson; Osborne & Rubinstein（经 ProofWiki 转述） | 【事实】 |
| 共同/相互知识与纳什条件 | 论文 | Aumann & Brandenburger, Econometrica 1995 | 【事实】 |
| 有限理性与满意化 | 学术批评 | Herbert Simon 系列论述；JEBO 综述其对博弈论遗产 | 【分析】 |
| 最后通牒典型报价/拒绝 | 实验综述与科普综述 | Güth et al. 传统结果；iMotions 综述区间 30–50% / 拒 &lt;20% | 【待验证】 |
| 独裁者出价低于最后通牒 | 实验 | Forsythe et al. 等；后续 MTurk 研究复述 | 【事实】 |
| 公平与 Spite 惩罚者共存 | 实验 | Branas-Garza et al., Scientific Reports | 【事实】 |
| 损益域行为差异 | 实验 | Games 期刊损失域独裁/最后通牒研究 | 【事实】 |
| Level-k / 选美数字 | 计算 | λ=2/3、L0=50 → L1=33.3、L2=22.2（本手册工具） | 【推论】 |
| PD 占优差距 1+p | 计算 | 标准支付矩阵手算 | 【推论】 |
| TFT 的 δ 门槛 0.5 | 计算 | (T−R)/(T−P)=(5−3)/(5−1) | 【推论】 |
| CRRA 确定性等价 | 计算 | r=0.5 时 CE≈52.36，RP≈7.64（EV=60） | 【推论】 |

标记约定：【事实】多方一致或可复核原文；【分析】权威梳理/判断；【推论】由模型或算术推出；【假设】未验证；【待验证】二手区间或单一链条。

# 免责声明 {.appendix}

本手册是**决策与建模框架**学习材料，不是投资建议、法律意见或对任何个人/机构的行为预测保证。

- 文中实验百分比多为文献常见区间，跨文化、跨筹码、跨程序会变化；行动前应核对一手研究。
- 交互工具中的数值是教学用参数化模型，不构成对真实对手行为的保证。
- 「理性参与人」是模型假设，将假设误当作道德判断或市场必然，可能导致严重决策失误。
- 涉及真实金钱、合同或安全关键系统时，请咨询具备资质的专业人士，并做独立尽职调查。
