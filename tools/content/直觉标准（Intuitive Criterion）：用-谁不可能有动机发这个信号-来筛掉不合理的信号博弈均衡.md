---
slug: 直觉标准（Intuitive Criterion）：用-谁不可能有动机发这个信号-来筛掉不合理的信号博弈均衡
title: 直觉标准（Intuitive Criterion）
subtitle: 用<strong>「谁不可能有动机发这个信号」</strong>筛掉不合理的离径信念——从而剔除依赖恐吓信念支撑的混同与过度分离。
brand_sub: Intuitive Criterion × Signaling Refinement
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 直觉标准, Cho-Kreps, 信号博弈, 均衡精炼, Spence, Beer-Quiche, D1]
theme_js_file: 直觉标准（Intuitive Criterion）：用-谁不可能有动机发这个信号-来筛掉不合理的信号博弈均衡.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**直觉标准（Intuitive Criterion, IC）**：对信号博弈的完美贝叶斯/序贯均衡做精炼——若某个离径消息 \(m'\) 对某些类型是**均衡占优**（无论接收方怎么反应，偏离都不会更好），就把这些类型从后验里剔除；若在剩余类型支撑的最优反应下，仍有类型严格受益于偏离，则该均衡**失败直觉标准**。【事实】

一句话口诀：**「谁绝不可能想发这个信号？先把他们排除；剩下的人里，若还有人能靠被正确识别而赚钱，原来的均衡就不合理。」**【分析】

经典出处：Cho & Kreps（1987）《Signaling Games and Stable Equilibria》，*QJE* 102(2):179–221；啤酒–乳蛋饼（Beer–Quiche）与 Spence 教育信号是教科书例子。【事实】两类型 Spence 下，IC 常剔除全部混同与过度分离，只留**最小成本分离（Riley outcome）**；三类型及以上时 IC 往往不够力，需 Banks–Sobel **D1 / Divinity**。【事实】【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是再发明一个均衡，而是：**当贝叶斯法则在零概率路径上失效时，如何用「谁有动机偏离」的前向归纳，限制离径信念，从而筛掉大量形式上成立、故事上荒谬的信号均衡**。

边界：

- **在界内**：均衡占优、两步检验、混同/分离精炼、与 D1/Divinity/稳定结果的嵌套、Beer–Quiche 与 Spence 应用。
- **在界外**：某次招聘「学历是否水分」、某次 IPO 路演话术真假——除非压成「离径信念是否被 IC 允许」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 用动机筛信念的信号均衡精炼 |
| 2 | 边界在哪 | 到「均衡占优 → 限制 μ → 再查偏离」可形式化为止 |
| 3 | 核心对象 | 类型集 \(T\)、消息 \(m\)、离径信念 \(\mu\)、均衡支付 \(u^*\) |
| 4 | 参与者 | 发送方（知情）、接收方（行动）、建模者/监管者 |
| 5 | 关键变量 | 先验、信号成本、类型生产力、离径 \(m'\)、BR 集 |
| 6 | 可直接观察 | 学历、早餐选择、质保条款、广告强度 |
| 7 | 无法直接观察 | 真实类型、离径信念、对方是否「恐吓」 |
| 8 | 谁影响谁 | 均衡故事 → 离径 μ → 是否敢偏离 → 均衡是否站住 |
| 9 | 因果关系 | 均衡占优 ⇒ 剔除类型 ⇒ 收紧 BR ⇒ 可能推翻均衡 |
| 10 | 只是相关 | 「看起来不合理」≠ 已形式化失败 IC【分析】 |
| 11 | 表层现象 | 混同靠「偏离=坏人」恐吓；教育过度军备 |
| 12 | 底层机制 | 前向归纳 + 均衡占优 |
| 13 | 有反馈吗 | 有。信念改写最优行动，行动改写谁敢说话 |
| 14 | 有延迟吗 | 有。市场学习、教育投资、声誉建立有时滞 |
| 15 | 正/负反馈 | 信号军备可正反馈浪费；精炼可负反馈压回 Riley |

## 最关键的一句话

> 直觉标准问的是：「这个离径信号，有没有人**无论你怎么想**都不会想发？若有——请先别冤枉剩下的人。」

# 为什么值得研究

:::cards g3
### 它杀掉「恐吓信念」均衡
PBE 允许用「偏离一定是低类型」支撑混同；IC 说：若低类型连最乐观信念下都不想偏，这种恐吓不成立。【事实】

### 它把连续统均衡压到 Riley
两类型 Spence：混同与过度分离通常全灭，只留最小成本分离——可检验的预测。【事实】

### 它暴露自己的边界
三类型时 IC 常无力；这不是失败，而是告诉你何时升级到 D1。【分析】
:::

:::note amber 最贵的一次误判
看见「人人都不读书也能成均衡」，就当真以为市场不需要信号。那往往靠「敢读书=低能」的离径恐吓——IC 专门拆这种故事。【推论】
:::

# 世界地图

九层从「PBE 过多」爬到「精炼族谱」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="icArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 更强精炼 · D1 / Divinity / 稳定结果 / NWBR</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 应用族 · Spence 教育 · Beer–Quiche · 进入威慑 · 货币信号</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 边界 · ≥3 类型时 IC 常不够 → 升级 D1</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 预测 · 两类型单调信号 → 常唯一 Riley 结果</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 第二步 · 在剩余类型 BR 下，是否有类型严格受益偏离</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 第一步 · 均衡占优：谁对 m′ 无论 BR 都不会更好</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 病症 · 离径信念自由 → 混同 / 过度分离成堆</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 母语 · 信号博弈 + PBE / 序贯均衡</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 问题 · 零概率路径上贝叶斯沉默，信念可任意编</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L4→L5** 两步检验；进阶卡在 **L7**：知道何时 IC「说完了」还要上 D1。【分析】
:::

# 核心概念地图

抽象 → 机制 → 操作。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="120" y="16" width="440" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">动机筛信念 → 收紧 BR → 推翻荒谬均衡</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">前向归纳精炼</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">均衡占优 · 两步 IC</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">学历·啤酒·质保</text>

  <line x1="300" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="380" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">类型 t 对 m′</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">是否均衡占优</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">μ 只放在</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">非占优类型上</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">BR(μ) 下</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">有人严格受益？</text>

  <line x1="220" y1="215" x2="250" y2="215" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="430" y1="215" x2="460" y2="215" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <path d="M550 250 Q340 320 130 250" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="310" text-anchor="middle" fill="#d5342c" font-size="11" font-family="sans-serif">是 → 均衡失败 IC（红色虚线反馈）</text>
</svg>
:::

# 核心参与者

:::cards g3
### 发送方（Sender）
私有类型 \(t\)，选消息 \(m\)。关心：均衡支付 vs 偏离后在「合理信念」下的支付。【分析】

### 接收方（Receiver）
看 \(m\)，形成 \(\mu(\cdot|m)\)，选行动 \(a\)。IC 不改他的理性，只限制他**可以讲什么故事**。【分析】

### 精炼者 / 建模者
在均衡菜单里做选择。IC 是弱精炼；不够时换 D1，而不是硬编故事。【推论】
:::

# 核心变量

| 变量 | 含义 | 杠杆 |
|---|---|---|
| \(u^*(t)\) | 类型 \(t\) 的均衡支付 | 比较偏离收益的基准 |
| \(m'\) | 离径消息 | IC 检验的对象 |
| \(T(m')\) | 对 \(m'\) 非均衡占优的类型集 | 信念支撑只能落在这里 |
| \(BR(T',m')\) | 接收方对支撑 \(T'\) 的最优反应集 | 第二步扫描空间 |
| \(D_t(m')\) | 使 \(t\) 严格想偏离的接收方行动集 | 通往 D1 的更细度量 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">候选 PBE</text>
  <rect x="180" y="40" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">挑离径 m′</text>
  <rect x="340" y="40" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="410" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">剔均衡占优型</text>
  <rect x="520" y="40" width="140" height="50" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="590" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">查是否有人赚</text>
  <line x1="140" y1="65" x2="180" y2="65" stroke="#1d4ed8" marker-end="url(#cA)"/>
  <line x1="300" y1="65" x2="340" y2="65" stroke="#1d4ed8" marker-end="url(#cA)"/>
  <line x1="480" y1="65" x2="520" y2="65" stroke="#1d4ed8" marker-end="url(#cA)"/>
  <path d="M590 90 Q340 180 80 90" fill="none" stroke="#d5342c" stroke-dasharray="5 4" marker-end="url(#cB)"/>
  <text x="340" y="160" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">有人严格受益 → 否决该 PBE（反馈）</text>
  <text x="340" y="220" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">无人受益 → 对该 m′ 通过；所有离径都过 → 通过 IC</text>
  <text x="340" y="250" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">实线=因果步骤；红虚线=否决反馈</text>
</svg>
:::

因果链（实线）与否决反馈（红虚线）必须分清：IC 不创造新均衡，只**删除**不合理的。【分析】

# 隐藏关系

:::cards g2
### IC ⊂「稳定」直觉，但弱于稳定集
Cho–Kreps 把 IC 表述为 Kohlberg–Mertens 稳定思想的一个**可操作推论**；通过 IC ≠ 完整稳定。【事实】【分析】

### 「直觉」不等于「行为真实」
IC 是规范精炼：假设共同知识理性与前向归纳。实验室里人未必讲完整「演讲」。【分析】

### 与廉价交谈不同
Cheap talk 无成本；IC 针对的是**有成本信号**里离径信念问题。别混用工具箱。【推论】
:::

# 系统运行机制

## 正式两步（发送方类型有限）

对候选均衡与离径 \(m'\)：

1. **均衡占优**：若对类型 \(t\)，对接收方一切最优反应 \(a\in BR(T,m')\)，都有 \(u(t,m',a)\le u^*(t)\)，则 \(t\) 被剔除（严格版用 \(<\)）。得到剩余集合 \(T(m')\)。
2. **否决检验**：若存在 \(t\in T(m')\)，使得对一切 \(a\in BR(T(m'),m')\) 都有 \(u(t,m',a)>u^*(t)\)（或存在使其严格更好的 BR），则均衡**失败 IC**。【事实】

:::note purple 口语版「演讲」
高类型可以说：「请注意，低类型发 \(m'\) 哪怕被当成高类型也不划算；所以若你看见 \(m'\)，应相信是我——而若你相信我，我就真的想发。」若这话成立，原均衡垮掉。【分析】
:::

## 可调模型 1：Spence 混同的 IC 杀伤区间

设定：生产力 \(y_H,y_L\)，成本 \(c(e,t)=e/t\)（\(t_H>t_L\)），混同在 \(e=0\)，工资 \(w_p=\pi y_H+(1-\pi)y_L\)。对离径教育 \(e'\)：

- 低类型均衡占优，若即便拿 \(y_H\)：\(y_H-e'/t_L < w_p\) ⇒ \(e'>(y_H-w_p)t_L\)
- 高类型在被认出时受益，若：\(y_H-e'/t_H > w_p\) ⇒ \(e'<(y_H-w_p)t_H\)

默认 \(y_H=4,y_L=1,\pi=0.5,t_H=2,t_L=1\) ⇒ \(w_p=2.5\)，IC 在 \(e'\in(1.5,\,3)\) 杀掉混同。【事实】

:::raw
<div class="tool" id="tool-pool">
  <h3>模型 1 · 混同均衡的 IC 杀伤区间</h3>
  <div class="ctrl">
    <label>高类型生产力 y<sub>H</sub> <output id="ic_yhO">4.0</output></label>
    <input type="range" id="ic_yh" min="2" max="8" step="0.1" value="4">
    <label>低类型生产力 y<sub>L</sub> <output id="ic_ylO">1.0</output></label>
    <input type="range" id="ic_yl" min="0.5" max="3" step="0.1" value="1">
    <label>高类型先验 π <output id="ic_piO">50%</output></label>
    <input type="range" id="ic_pi" min="10" max="90" step="1" value="50">
    <label>离径教育 e′ <output id="ic_eO">2.0</output></label>
    <input type="range" id="ic_e" min="0.1" max="6" step="0.1" value="2">
  </div>
  <div class="readout">
    <div class="ro">混同工资 w<sub>p</sub><strong id="ic_wp">2.50</strong></div>
    <div class="ro">低类型占优门槛 e<sub>L</sub><strong id="ic_el">1.50</strong></div>
    <div class="ro">高类型受益上限 e<sub>H</sub><strong id="ic_eh">3.00</strong></div>
    <div class="ro">IC 判定<strong id="ic_verdict">杀掉混同</strong></div>
    <div id="ic_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:var(--ink2)"></div>
  </div>
  <canvas id="icChart" height="214"></canvas>
</div>
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="100" r="8" fill="#0f8a4d"/><text x="80" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1973</text><text x="80" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Spence</text><text x="80" y="156" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">信号模型</text>
  <circle cx="220" cy="100" r="8" fill="#1d4ed8"/><text x="220" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1982</text><text x="220" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Kreps–Wilson</text><text x="220" y="156" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">序贯均衡</text>
  <circle cx="360" cy="100" r="8" fill="#b8730a"/><text x="360" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1986–87</text><text x="360" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">KM 稳定</text><text x="360" y="156" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">+ Cho–Kreps IC</text>
  <circle cx="500" cy="100" r="8" fill="#d5342c"/><text x="500" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1987–88</text><text x="500" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Banks–Sobel</text><text x="500" y="156" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Divinity / D1</text>
  <circle cx="620" cy="100" r="8" fill="#15181d"/><text x="620" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">今</text><text x="620" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">教材标配</text><text x="620" y="156" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">IO / 劳动 / 金融</text>
  <line x1="88" y1="100" x2="212" y2="100" stroke="#1d4ed8" marker-end="url(#tmA)"/>
  <line x1="228" y1="100" x2="352" y2="100" stroke="#1d4ed8" marker-end="url(#tmA)"/>
  <line x1="368" y1="100" x2="492" y2="100" stroke="#1d4ed8" marker-end="url(#tmA)"/>
  <line x1="508" y1="100" x2="612" y2="100" stroke="#1d4ed8" marker-end="url(#tmA)"/>
</svg>
:::

# 利益与激励

| 角色 | 想要什么 | IC 如何改激励 |
|---|---|---|
| 高类型 | 被识别、少浪费信号 | IC 支持最小成本分离，反对靠恐吓维持的廉价混同 |
| 低类型 | 混进高池、少付成本 | IC 削弱「人人装普通人」故事，逼真分离 |
| 雇主/买方 | 正确分类 | 离径信念更「可讲清楚」 |
| 建模者 | 可证伪预测 | 从连续统均衡收到 Riley 点 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="30" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="100" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">类型私信</text><text x="100" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">t ∈ {H,L,…}</text>
  <rect x="220" y="30" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="290" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">信号成本</text><text x="290" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">教育 / 质保 / 啤酒</text>
  <rect x="410" y="30" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="480" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">公开消息</text><text x="480" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">m 被观察</text>
  <rect x="560" y="30" width="100" height="60" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="610" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">行动</text><text x="610" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">工资/决斗</text>
  <line x1="170" y1="60" x2="220" y2="60" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <line x1="360" y1="60" x2="410" y2="60" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <line x1="550" y1="60" x2="560" y2="60" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <rect x="120" y="140" width="440" height="80" rx="10" fill="#15181d"/><text x="340" y="175" text-anchor="middle" fill="#fff" font-size="13" font-family="sans-serif">IC 抽走的「资源」不是钱，而是不合理的离径信念配额</text><text x="340" y="198" text-anchor="middle" fill="#a8b0ba" font-size="11" font-family="sans-serif">信念被占优论证抽干 → 恐吓均衡失血 → 只剩可讲清故事的结果</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 |
|---|---|---|
| 1 | 先写清 \(u^*(t)\) | 没有均衡支付就无法谈占优 |
| 2 | 单交叉 / 成本排序 | 决定谁更容易偏离 |
| 3 | 挑对离径 \(m'\) | 杀混同常靠「中等强度信号」 |
| 4 | 两步不要颠倒 | 先剔人再查 BR，顺序错就错判 |
| 5 | 类型个数 | 2 → IC 常够；≥3 → 准备 D1 |
| 6 | Riley 点 \(e^*\) | 过度分离的对照锚 |
| 7 | 接收方 BR 集是否连续 | 影响「对一切 BR 都更好」的强度 |
| 8 | 与筛选对照 | 谁出题（screening）改变精炼对象 |
| 9 | 实验可观察代理 | 学历、质保、自购当作 \(m\) |
| 10 | 承认 IC 边界 | 避免把「过不了 IC」误当成「无均衡」 |

# 常见认知陷阱

:::details 陷阱 1：把任意「听起来合理」的信念叫 IC
IC 有形式定义。口头合理性不够；要做均衡占优检验。【分析】
:::

:::details 陷阱 2：以为 IC 总会给出唯一均衡
两类型单调信号常唯一；多类型、非单调时可能仍多。【事实】
:::

:::details 陷阱 3：用 IC 否定所有混同
有些参数下混同可通过；先算再喊。【推论】
:::

:::details 陷阱 4：把均衡占优当成普通占优
均衡占优相对**该均衡支付**与 **BR 集**，不是任意行动。【事实】
:::

:::details 陷阱 5：忘记第二步
只剔除类型却不检查「剩余人是否想偏」，等于半套 IC。【分析】
:::

:::details 陷阱 6：用恐吓信念讲故事却自称「精炼」
「敢偏离=坏人」恰是 IC 要拆的对象。【推论】
:::

:::details 陷阱 7：三类型仍死磕 IC
教材明确：此时常需 D1。【事实】
:::

:::details 陷阱 8：混淆 IC 与颤抖手
颤抖手靠策略扰动；IC 靠动机演讲。机制不同。【分析】
:::

:::details 陷阱 9：把 Riley 结果当成「无浪费」
最小成本分离仍可能浪费资源；只是相对过度分离更省。【事实】
:::

:::details 陷阱 10：把实验室违背当成理论破产
IC 是规范解概念；行为偏离是另一层问题。【分析】
:::

<!-- nav:实践转化 -->
# 从抽象到现实

:::cards g2
### 招聘学历军备
「大家都得卷研究生」可能是过度分离；IC 视角：是否存在更低学历水平，高能力敢用、低能力连被当成高能力也不划算？【推论】

### 创业融资信号
创始人自投、长锁定期：问「骗子模仿是否亏」。若模仿仍赚，信号未过激励相容，更谈不上精炼。【分析】

### 产品质保
超长质保：低质厂商期望索赔若盖不住溢价，则高质可「演讲」证明偏离质保条款者更可能是高质。【推论】

### Beer–Quiche 式声誉
强者选「对弱者不舒服」的行动当信号；弱者不会模仿——IC 选「都喝啤酒」而非「都吃乳蛋饼」。【事实】
:::

# 从理论到行动

## 可调模型 2：Beer–Quiche 哪个混同活下来

支付约定（Cho–Kreps）：喜欢的早餐 +1，避免决斗 +2。粗暴型（Surly）爱啤酒，软弱型（Wimp）爱乳蛋饼；进入者只想打软弱型。先验 Surly 常取 0.9。【事实】

- **乳蛋饼混同**：路径上不决斗；离径啤酒被当成软弱 → 决斗。均衡支付 Surly=2、Wimp=3。但 Surly 若被认出喝啤酒可不决斗得 3>2；Wimp 即便被当成 Surly 喝啤酒最多 2<3 → 均衡占优。IC **杀掉乳蛋饼混同**。
- **啤酒混同**：通常通过 IC。【事实】

:::raw
<div class="tool" id="tool-bq">
  <h3>模型 2 · Beer–Quiche：先验如何改变「谁更敢演讲」</h3>
  <div class="ctrl">
    <label>Surly 先验 p<sub>S</sub> <output id="bq_pO">90%</output></label>
    <input type="range" id="bq_p" min="50" max="95" step="1" value="90">
    <label>避免决斗价值 D <output id="bq_dO">2.0</output></label>
    <input type="range" id="bq_d" min="1" max="3" step="0.1" value="2">
    <label>偏好早餐价值 B <output id="bq_bO">1.0</output></label>
    <input type="range" id="bq_b" min="0.5" max="2" step="0.1" value="1">
  </div>
  <div class="readout">
    <div class="ro">乳蛋饼混同下 Surly 支付<strong id="bq_sq">2.00</strong></div>
    <div class="ro">Surly 啤酒+不被打<strong id="bq_sb">3.00</strong></div>
    <div class="ro">Wimp 啤酒乐观上限<strong id="bq_wb">2.00</strong></div>
    <div class="ro">IC 对乳蛋饼混同<strong id="bq_verdict">否决</strong></div>
    <div id="bq_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:var(--ink2)"></div>
  </div>
  <canvas id="bqChart" height="214"></canvas>
</div>
:::

## 可调模型 3：过度分离 vs Riley

低类型 \(e_L=0\) 拿 \(y_L\)；高类型分离教育 \(e_H\)。Riley：低类型对模仿刚好无差异 → \(e^*=(y_H-y_L)t_L\)（本参数化 \(t_L=1\) 时 \(e^*=y_H-y_L\)）。若 \(e_H>e^*\)，高类型可演讲偏向 \(e^*\)：低类型连被当成高也不划算。【事实】

默认 \(y_H=4,y_L=1\) ⇒ \(e^*=3\)；\(e_H=4\) 时高类型 Riley 支付 2.5 > 过度分离 2.0，低类型模仿 Riley 支付 1 = 均衡，严格版用略低 \(e\)。【事实】

:::raw
<div class="tool" id="tool-riley">
  <h3>模型 3 · 过度分离会被 IC 打回 Riley</h3>
  <div class="ctrl">
    <label>y<sub>H</sub> <output id="ry_yhO">4.0</output></label>
    <input type="range" id="ry_yh" min="2" max="8" step="0.1" value="4">
    <label>y<sub>L</sub> <output id="ry_ylO">1.0</output></label>
    <input type="range" id="ry_yl" min="0.5" max="3" step="0.1" value="1">
    <label>高类型教育 e<sub>H</sub> <output id="ry_eO">4.0</output></label>
    <input type="range" id="ry_e" min="0.5" max="8" step="0.1" value="4">
    <label>高类型成本参数 t<sub>H</sub> <output id="ry_thO">2.0</output></label>
    <input type="range" id="ry_th" min="1.2" max="4" step="0.1" value="2">
  </div>
  <div class="readout">
    <div class="ro">Riley e*<strong id="ry_star">3.00</strong></div>
    <div class="ro">高类型均衡支付<strong id="ry_uh">2.00</strong></div>
    <div class="ro">高类型在 e* 支付<strong id="ry_uhs">2.50</strong></div>
    <div class="ro">IC 判定<strong id="ry_verdict">否决过度分离</strong></div>
    <div id="ry_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:var(--ink2)"></div>
  </div>
  <canvas id="ryChart" height="214"></canvas>
</div>
:::

## 可调模型 4：类型数与精炼升级

:::raw
<div class="tool" id="tool-n">
  <h3>模型 4 · 类型个数：IC 够不够？</h3>
  <div class="ctrl">
    <label>发送方类型数 n <output id="n_nO">2</output></label>
    <input type="range" id="n_n" min="2" max="6" step="1" value="2">
    <label>是否单调信号（单交叉） <output id="n_scO">是</output></label>
    <input type="range" id="n_sc" min="0" max="1" step="1" value="1">
  </div>
  <div class="readout">
    <div class="ro">建议精炼<strong id="n_tool">直觉标准 IC</strong></div>
    <div class="ro">唯一性预期<strong id="n_uniq">常唯一 Riley</strong></div>
    <div class="ro">IC 力度评分<strong id="n_score">0.90</strong></div>
    <div class="ro">下一步<strong id="n_next">保持 IC 即可</strong></div>
    <div id="n_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:var(--ink2)"></div>
  </div>
  <canvas id="nChart" height="214"></canvas>
</div>
:::

评分启发式（教学用，非定理）：单调 + \(n=2\) → 0.90；每加一类型约 −0.18；非单调再 −0.25；低于 0.5 建议 D1。【假设】

# 技能树

:::details ① 信号博弈与 PBE 母语（入门）
会写类型、消息、信念、序贯理性；能找出至少一个混同与一个分离 PBE。
:::

:::details ② 均衡占优计算（核心）
给定 \(u^*\) 与 BR 集，判断类型对 \(m'\) 是否均衡占优。
:::

:::details ③ 完整两步 IC（核心）
对候选均衡跑完两步，给出「通过 / 失败」与反例偏离。
:::

:::details ④ Spence / Beer–Quiche 标准应用（应用）
默写两例的结论：混同与过度分离命运、Riley 存活。
:::

:::details ⑤ D1 / Divinity 升级（进阶）
当 \(T(m')\) 仍含多类型时，用「谁在更多 BR 上受益」进一步剔人。
:::

:::details ⑥ 跨域翻译（实践）
把质保、自购、学历军备写成 IC 可检的小模型。
:::

# 游戏化世界

你是「均衡审计员」。每个候选 PBE 是一座城；离径信念是城墙上的裂缝。IC 是你的测谎仪：先问「谁绝不会爬墙」，再问「剩下的人爬上去是否赚」——赚则拆城。

# 任务系统

| 任务 | 目标 | 验收 |
|---|---|---|
| T1 | 用默认参数复算混同杀伤区间 (1.5, 3) | 与模型 1 一致 |
| T2 | 口述 Beer–Quiche 为何否决乳蛋饼混同 | 含「Wimp 均衡占优」 |
| T3 | 找一个 \(e_H>e^*\) 并证明 IC 否决 | 写出两边支付 |
| T4 | 解释为何 \(n=3\) 要考虑 D1 | 引用「多类型都可能受益」 |
| T5 | 把一次真实「信号」写成 6 行 IC 备忘 | 含 \(u^*\)、\(m'\)、占优、结论 |

# 反事实模拟

:::tabs
@@若没有 IC
PBE 菜单膨胀：混同靠恐吓、分离过度军备都「合法」。预测力崩溃——什么结果都能讲故事。【分析】

@@若只用普通占优
过弱：很多类型在任意行动下不占优，但相对均衡支付已占优。IC 的「均衡」二字不可省。【事实】

@@若跳到稳定集
更强、更难算。IC 是可教可算的中间站；应用论文大量停在 IC/D1。【分析】

@@若类型连续统
技术更重（通常用 D1 类微分条件）。直觉仍是「谁更想偏离」。【推论】
:::

<!-- nav:能力路线 -->
# 四级能力路线

| 级别 | 能力 | 标志 |
|---|---|---|
| L1 | 能解释 IC 一句话口诀 | 不与颤抖手混淆 |
| L2 | 能手算两类型 Spence IC | 得出 Riley |
| L3 | 能独立审计 Beer–Quiche | 写出演讲 |
| L4 | 知道何时升级 D1 | 三类型例子不慌 |

# 30分钟最小实践

1. 选一个你关心的信号（学历 / 质保 / 加班文化）。（5 分）
2. 粗定两类型与一个混同故事。（5 分）
3. 设计一个离径 \(m'\)，算「低类型最乐观是否仍亏」「高类型被认出是否赚」。（15 分）
4. 写下：该混同是否被 IC 恐吓拆穿。（5 分）

验收：一张卡片上有数字，而不是只有形容词。

# 7天计划

| 天 | 主题 |
|---|---|
| D1 | 重读信号传递手册的分离 IC |
| D2 | 手算本手册模型 1 默认点 |
| D3 | 精读 Beer–Quiche 支付表 |
| D4 | 过度分离 → Riley |
| D5 | 对照一篇 IC vs D1 讲义 |
| D6 | 真实案例 6 行审计 |
| D7 | 复盘：哪步最易错 |

# 30天计划

| 周 | 焦点 |
|---|---|
| W1 | PBE 母语 + IC 两步自动化 |
| W2 | Spence 全菜单精炼 |
| W3 | D1 入门与三类型例子 |
| W4 | 跨域：产品/劳动/融资各一案 |

# 10 个核心模型

1. **均衡占优**：相对 \(u^*\) 与 BR 的偏离不值
2. **IC 两步**：剔人 → 查是否有人赚
3. **恐吓信念**：用离径惩罚支撑混同
4. **Riley outcome**：最小成本分离
5. **Beer–Quiche**：偏好异质 + 决斗
6. **单交叉**：成本排序支撑分离
7. **D1**：按「受益 BR 集合」强弱剔人
8. **Divinity**：似然比不增的弱化版
9. **稳定结果**：KM 更强目标
10. **前向归纳**：从偏离意图倒推信念

# 关键问题清单

:::details Q1：IC 是解概念还是检验？
对已给 PBE/SE 的精炼检验；通过者组成更小预测集。【事实】
:::

:::details Q2：与序贯均衡什么关系？
SE 约束信念来自颤抖极限；IC 进一步用动机 speach。可叠加。【分析】
:::

:::details Q3：为何两类型够用 IC？
常只剩一类非占优偏离者，信念被钉死，第二步直接否决混同/过度分离。【事实】
:::

:::details Q4：三类型为何失灵？
多个类型都可能非占优，IC 不区分「谁更像偏离者」。【事实】
:::

:::details Q5：Riley 一定帕累托最优吗？
相对其他分离更省信号，但相对完全信息仍可能浪费。【分析】
:::

:::details Q6：实验支持吗？
混合证据；当作用规范工具，行为另测。【待验证】
:::

:::details Q7：廉价交谈能用 IC 吗？
标准 IC 为有成本信号设计；cheap talk 用另套精炼（如 neologism）。【分析】
:::

:::details Q8：失败 IC 是否意味无预测？
意味该均衡不合理；可能仍有其他均衡通过。【推论】
:::

:::details Q9：中文「直觉标准」是否标准译名？
教材亦用「直观标准」「直觉准则」；英文 Intuitive Criterion。【事实】
:::

:::details Q10：和「显示原理」冲突吗？
不冲突：显示原理关于机制直接显示；IC 关于给定信号博弈的均衡选择。【分析】
:::

# 下一阶段探索

- 精读 Cho & Kreps（1987）原文 Beer–Quiche 节
- 做三类型 Spence + D1 习题（Muñoz-Garcia 讲义）
- 对照 Banks & Sobel（1987）Divinity
- 把本手册模型接到「信号传递」手册的分离计算器上
- 阅读近期「persuasive selection」等对 Stiglitz 批评的回应【待验证】

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| IC 定义与 Beer–Quiche | 期刊论文 | Cho & Kreps, QJE 1987 | 【事实】 |
| Divinity / D1 | 期刊论文 | Banks & Sobel, Econometrica 1987 | 【事实】 |
| Spence 模型 | 期刊论文 | Spence, QJE 1973 | 【事实】 |
| IC vs D1 教学例子 | 教学论文 | Sobel 等 / Muñoz-Garcia 讲义；BEJEAP 教学文 | 【分析】 |
| 默认数值 \(y_H=4\) 等 | 教学参数化 | 本手册自洽设定 | 【假设】 |
| 类型数评分启发式 | 教学近似 | 非定理 | 【假设】 |
| 行为实验吻合度 | 综述零散 | 未做元分析 | 【待验证】 |

标记：【事实】多方一致或经典原文；【分析】权威推导；【推论】本手册推导；【假设】未验证设定；【待验证】单一/间接来源。

# 免责声明 {.appendix}

本手册为博弈论与信息经济学**认知与教学框架**，不是投资、招聘、融资或诉讼建议。文中数值为可复算的教学参数，不代表任何真实市场的校准。决策请结合完备信息、专业意见与你自己的激励约束。
