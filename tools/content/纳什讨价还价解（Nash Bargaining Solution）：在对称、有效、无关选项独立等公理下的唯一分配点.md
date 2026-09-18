---
slug: 纳什讨价还价解（Nash Bargaining Solution）：在对称、有效、无关选项独立等公理下的唯一分配点
title: 纳什讨价还价解（Nash Bargaining Solution）
subtitle: 在<strong>对称、帕累托有效、无关选项独立、仿射不变</strong>四公理下，可行协议中最大化纳什乘积 \((u_1-d_1)(u_2-d_2)\) 的唯一分配点——从工资谈判到专利许可、转让定价。
brand_sub: Nash Bargaining × Cooperative Games
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 讨价还价, 纳什解, Nash Bargaining, 公理, Rubinstein, Kalai-Smorodinsky, 剩余分配]
theme_js_file: 纳什讨价还价解（Nash Bargaining Solution）：在对称、有效、无关选项独立等公理下的唯一分配点.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**纳什讨价还价解（Nash bargaining solution, NBS）**是二人讨价还价问题 \((S,d)\) 上的**唯一**单值解：在紧凸可行集 \(S\) 与破裂点 \(d\) 下，它挑出最大化**纳什乘积**的协议

\[\max_{(u_1,u_2)\in S,\,u\ge d}\;(u_1-d_1)(u_2-d_2)\]

并被证明是同时满足**帕累托有效（PO）、对称（SYM）、正仿射变换不变（INV）、无关选项独立（IIA）**四公理的唯一映射。【事实】

John Nash 1950 年论文 *The Bargaining Problem*（*Econometrica*）给出公理刻画；1953 年又给出需求博弈的非合作极限解释。Harsanyi 指出它与 Zeuthen 的让步规则等价。【事实】

与相邻概念分工：**纳什均衡**问「策略是否互为最佳反应」；**沙普利值**问「多人合作剩余按边际怎么分」；NBS 问「**两人**在给定可行效用集与外部选项下，公理上应落在哪一点」。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么开口要价」的话术，而是：给定双方能共同达到的效用集合 \(S\) 与达不成协议时的效用 \(d\)，有没有一套**公理上唯一**的规则，挑出协议点 \(f(S,d)\in S\)。

边界：

- **在界内**：二人合作讨价还价、公理解、广义纳什（不对称权重）、与 Rubinstein 交替出价的极限联系、与 Kalai–Smorodinsky（KS）对照。
- **在界外**：多方联盟稳定（核）、特征函数多人分账（沙普利）、法庭判决措辞——除非压成 \((S,d)\) 与解概念。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 二人如何唯一、公平地分配合作剩余 |
| 2 | 边界在哪 | 到「可行效用集 + 破裂点 + 公理解」为止；过程可另建非合作模型 |
| 3 | 核心对象 | \(S,d\)、纳什乘积、四公理、广义权重 \(\tau\)、乌托邦点 |
| 4 | 参与者 | 谈判双方；仲裁者/监管；旁观者（消费者、未入局第三方） |
| 5 | 关键变量 | 破裂点、可行前沿形状、风险态度、贴现/破裂风险、议价力 |
| 6 | 可直接观察 | 合同价、分成比例、工资、许可费、成交区间 |
| 7 | 无法直接观察 | 真实效用刻度、私下外部选项、对方耐心 |
| 8 | 谁影响谁 | \(d\)↑ → 己方份额↑；前沿扩张 → 双方都可能改善 |
| 9 | 因果关系 | 四公理 ⇒ 唯一 NBS；δ→1 的交替出价 ⇒ 逼近 NBS【事实】 |
| 10 | 只是相关 | 「嗓门大」≠议价力；议价力应进 \(d\) 或 \(\tau\)，不是进口号【分析】 |
| 11 | 表层现象 | 五五开、先开高价、僵局、仲裁 |
| 12 | 底层机制 | 最大化超额效用乘积（几何上最大面积矩形） |
| 13 | 有反馈吗 | 有。份额不公 → 拒签/诉讼 → 改变有效 \(S\) 或 \(d\) |
| 14 | 有延迟吗 | 有。拖延本身折现剩余；Rubinstein 把耐心写进均衡 |
| 15 | 正/负反馈 | 改善外部选项强化地位；虚假威胁若被识破则 \(d\) 回落 |

## 最关键的一句话

> NBS 不问「谁更会吵架」，而问：在所有不低于破裂点的可行协议里，哪一点让双方**超额效用的乘积**最大——四条公理把它钉死。

# 为什么值得研究

:::cards g3
### 它把「公平成交」钉成可复算点
PO+SYM+INV+IIA ⇒ 唯一解；公式就是纳什乘积，白板可验。【事实】

### 它同时服务规范与预测
既是仲裁基准，又在耐心趋于无限耐心时与交替出价 SPE 极限重合（Binmore–Rubinstein–Wolinsky 1986）。【事实】

### 它暴露「五五开」的陷阱
分的是**扣除双方外部选项后的剩余**，不是总蛋糕；许可费案例里剩余可能只有 \$1，五五开后一方仍拿 \$8.5。【分析】
:::

:::note amber 最贵的一次误判
把「50/50」当成 NBS，却忘了先减破裂点。专利诉讼里原告专家常引用纳什却只对总利润五五开——LESI 明确批评：应分的是合作收益减去双方保留收益后的**剩余**。【事实】
:::

# 世界地图

九层从「破裂点」爬到「制度与多方扩展」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="nbArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度军备 · 仲裁规则 / 转让定价 / 反垄断纵向议价</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 实证与现场 · 工资合同 / 许可费 / 并购区间 / Nash-in-Nash</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 非合作基础 · Rubinstein 交替出价 · BRW 极限 · 需求博弈</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 跨域同构 · 几何平均 · 凯利/信道 · 风险分担</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 竞争解 · Kalai–Smorodinsky · 均等收益 · 核仁（多人）</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 经典算例 · 分蛋糕 · 许可剩余 · 非对称前沿 · 工资乘积</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 公理 · PO · SYM · INV · IIA（及对 IIA 的批评）</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 几何直觉 · 最大面积轴对齐矩形 · 纳什乘积等高线</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 原语 · 可行集 S（紧凸）+ 破裂点 d</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1–L4**：会画 \(S\)、标 \(d\)、手算线性前沿上的 NBS；进阶卡在 **L5** 与 **L7**——何时改用 KS，以及贴现因子如何映射到议价力。【分析】
:::

# 核心概念地图

从公理公平到可操作成交价。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="80" y="16" width="520" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">公理 → 纳什乘积最大化 → 合同价 / 分成 / 许可费</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">PO·SYM·INV·IIA</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">max (u−d) 乘积</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">价格·工资·特许费</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">S 与 d</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">可行集·外部选项</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">NBS 点</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">或广义 τ-Nash</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">成交映射</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">效用→货币</text>

  <line x1="130" y1="146" x2="130" y2="180" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="146" x2="340" y2="180" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="550" y1="146" x2="550" y2="180" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <path d="M220 215 H250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <path d="M430 215 H460" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="280" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红虚线 = 反馈：拒签/诉讼 → 改 d 或改 S → 新的 NBS</text>
  <text x="340" y="310" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">跨域同构：几何平均分配 · 风险中性下线性货币分剩余</text>
  <text x="340" y="340" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">Nash 计划：公理解 ↔ 非合作极限（需求博弈 / 交替出价）</text>
</svg>
:::

# 核心参与者

| 角色 | 目标 | 信息位置 | 典型工具 |
|---|---|---|---|
| 买方 / 资方 | max 己方超额效用 | 知己方 \(d\)，猜对方 | 外部报价、拖延、BATNA |
| 卖方 / 劳方 | max 己方超额效用 | 对称 | 罢工威胁、替代客户 |
| 仲裁者 | 选「公理公平」点 | 需双方披露 \(S,d\) | NBS / KS / 均等收益 |
| 监管 / 税务 | 独立交易原则、防利润转移 | 可比交易稀缺时用议价模型 | 转让定价中的 NBS【分析】 |
| 旁观者 | 少承担外部性 | 常被忽略 | 消费者剩余、第三方效应 |

# 核心变量

| 变量 | 符号/度量 | 为何关键 | 杠杆方向 |
|---|---|---|---|
| 破裂点 | \(d=(d_1,d_2)\) | 一切超额由此量 | 改善 BATNA 直接抬份额 |
| 可行集 | \(S\) 紧凸 | 决定前沿与乌托邦 | 创造协同 = 扩大 \(S\) |
| 纳什乘积 | \((u_1-d_1)(u_2-d_2)\) | 目标函数 | 在前沿上求切点 |
| 议价权重 | \(\tau\in(0,1)\) | 广义纳什 | \(\tau\)↑ → 方 1 份额↑ |
| 贴现因子 | \(\delta_i\) | Rubinstein 耐心 | \(\delta\to1\) → 逼近对称 NBS |
| 乌托邦点 | \(a(S,d)\) | KS 用它 | 个人最大值影响 KS，不影响 IIA 路径下的 NBS |
| 风险态度 | 效用凹性 | 改变 \(S\) 形状 | 更厌恶风险者常吃亏【分析】 |
| 货币转移 | 可转移效用 | 线性前沿 \(u_1+u_2=\pi\) | 此时 NBS = 均分剩余 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">BATNA / 技术</text>
  <rect x="180" y="40" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">S 与 d</text>
  <rect x="340" y="40" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="400" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">纳什乘积</text>
  <rect x="500" y="40" width="140" height="50" rx="8" fill="#15181d"/><text x="570" y="70" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">NBS 协议</text>

  <line x1="140" y1="65" x2="180" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="300" y1="65" x2="340" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="460" y1="65" x2="500" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="180" y="160" width="120" height="50" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="240" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">耐心 δ</text>
  <rect x="340" y="160" width="120" height="50" rx="8" fill="#fee2e2" stroke="#d5342c"/><text x="400" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">拒签/拖延</text>
  <rect x="500" y="160" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="570" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">再谈判</text>

  <line x1="240" y1="90" x2="240" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="400" y1="90" x2="400" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="570" y1="90" x2="570" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="300" y1="185" x2="340" y2="185" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <line x1="460" y1="185" x2="500" y2="185" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>

  <path d="M570 210 Q340 280 80 90" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <text x="340" y="300" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：拖延消耗剩余 → 改变有效 δ 与 d → 新协议点</text>
</svg>
:::

因果链（实线）与反馈（红虚线）必须分清：

1. **BATNA/协同 → \((S,d)\)**：没有正剩余（个人理性集为空）就没有协议。【分析】
2. **\((S,d)\) → 乘积最大化 → NBS**：公理钉死映射。【事实】
3. **耐心/破裂风险 → 非合作份额**：再映射回广义纳什权重。【事实】
4. **反馈**：拒签改变威胁点；拖延折现蛋糕。

# 隐藏关系

- **IIA 与「全局选项」张力**：缩小可行集若砍掉对方乌托邦，NBS 可能不变——Kalai–Smorodinsky (1975) 据此换公理。【事实】
- **效用刻度假装客观**：INV 说仿射变换不改解，但把「货币」当效用时，风险态度已被藏进 \(S\)。【分析】
- **五五开幻觉**：对称 + 可转移效用 ⇒ 均分**剩余**；若 \(d\) 不对称，绝对份额也不对称。【推论】
- **与沙普利的同构**：二人 TU 下，NBS 均分剩余 \(\Leftrightarrow\) 沙普利（两人时边际贡献平均）。【推论】
- **Nash-in-Nash**：多方双边议价里「每对 NBS + 对其他对取纳什」成了实证产业组织常用简约式（Collard-Wexler et al.）。【分析】

# 系统运行机制

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="30" width="140" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="100" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">披露 / 估计</text><text x="100" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Ŝ, d̂</text>
  <rect x="200" y="30" width="140" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="270" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">选解概念</text><text x="270" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">NBS / KS / τ</text>
  <rect x="370" y="30" width="140" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="440" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">算协议点</text><text x="440" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">u* → 价格</text>
  <rect x="540" y="30" width="110" height="70" rx="8" fill="#15181d"/><text x="595" y="70" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">签约</text>
  <line x1="170" y1="65" x2="200" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="340" y1="65" x2="370" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="510" y1="65" x2="540" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <rect x="120" y="150" width="440" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/>
  <text x="340" y="180" text-anchor="middle" fill="#15181d" font-size="13" font-family="sans-serif">运行约束：个人理性 u≥d · 帕累托前沿 · 效用可比仅到仿射</text>
  <text x="340" y="202" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">失败模式：虚报 d · 误把总利润当剩余 · 用错 IIA/IM 语境</text>
</svg>
:::

系统稳态：双方接受 \(u^*\)，没有单方能在可行集内同时改善自己且不损对方（弱帕累托）。扰动来自 \(d\) 的重新评估与 \(S\) 的技术冲击。

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="100" r="8" fill="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1950 公理</text>
  <circle cx="200" cy="100" r="8" fill="#1d4ed8"/><text x="200" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1953 需求博弈</text>
  <circle cx="320" cy="100" r="8" fill="#b8730a"/><text x="320" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1975 KS</text>
  <circle cx="440" cy="100" r="8" fill="#1d4ed8"/><text x="440" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1982 Rubinstein</text>
  <circle cx="560" cy="100" r="8" fill="#15181d"/><text x="560" y="70" text-anchor="middle" fill="#fff" font-size="11" font-family="sans-serif"></text>
  <text x="560" y="70" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1986 BRW</text>
  <text x="340" y="150" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">公理 → 批评与替代 → 非合作微观基础 → 应用建模指南</text>
  <text x="340" y="175" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">之后：不对称纳什、Nash-in-Nash、实验检验 IIA vs IM</text>
</svg>
:::

短周期：一轮谈判里，提议—拒绝—折现。长周期：产业里议价制度（强制仲裁、冷却期）改变有效 \(\delta\) 与 \(d\)。

# 利益与激励

| 主体 | 激励 | 扭曲风险 |
|---|---|---|
| 强 BATNA 方 | 抬高 \(d\) 逼份额 | 虚报外部选项 |
| 弱方 | 寻求仲裁/监管保护 | 过度依赖「公平」口号而无数字 |
| 代理人（律师/投行） | 按成交或按争议收费 | 拖延耗剩余 |
| 税务当局 | 防利润转移 | 机械套 NBS 忽视可比法【分析】 |

线性货币、风险中性时：激励兼容的核心是**诚实披露 \(d\)**——而这正是机制设计要另做的事；NBS 本身不解决谎报。【分析】

# 资源与信息流

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <defs>
    <marker id="resA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="resB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="40" width="160" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="120" y="75" text-anchor="middle" fill="#15181d" font-size="13" font-family="sans-serif">合作剩余池 π</text>
  <rect x="260" y="20" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="330" y="50" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">方1：d₁+份额</text>
  <rect x="260" y="90" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="330" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">方2：d₂+份额</text>
  <rect x="460" y="40" width="160" height="60" rx="8" fill="#fee2e2" stroke="#d5342c"/><text x="540" y="75" text-anchor="middle" fill="#15181d" font-size="13" font-family="sans-serif">谈判成本/拖延</text>
  <line x1="200" y1="60" x2="260" y2="45" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#resA)"/>
  <line x1="200" y1="80" x2="260" y2="115" stroke="#b8730a" stroke-width="1.5" marker-end="url(#resA)"/>
  <path d="M400 45 Q500 0 540 40" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#resB)"/>
  <text x="340" y="190" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">信息流：BATNA 证据 · 协同测算 · 效用/风险偏好（常缺失）</text>
  <text x="340" y="215" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">抽水：信息不对称租金、代理费、时间折现——缩小可分剩余</text>
</svg>
:::

资源流的关键不对称：谁掌握「外部选项可验证证据」，谁就能合法上移 \(d\)。信息流若断裂，双方在错误的 \((S,d)\) 上算「公平」，签约后才发现剩余为负。【分析】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 | 操作 |
|---|---|---|---|
| 1 | 写清并抬高真实 BATNA | \(d\) 一阶决定份额 | 备选报价书面化 |
| 2 | 先算剩余再谈比例 | 避免五五开总利润 | 一页剩余表 |
| 3 | 创造协同扩大 \(S\) | 做大蛋糕双方可改善 | 联合成本/收入模型 |
| 4 | 选对解概念（NBS vs KS） | IIA 争议场景改 KS | 看乌托邦是否被砍 |
| 5 | 用 \(\tau\) 编码不对称力 | 比空谈「强势」可复算 | 由 δ 或制度校准 |
| 6 | 缩短回合间隔 | δ→1 时份额趋于对称 NBS | 冷却期/截止时钟设计 |
| 7 | 可验证披露 | 降低谎报 \(d\) | 第三方审计、托管 |
| 8 | 风险分担条款 | 改变有效效用前沿 | 或有支付、里程碑 |
| 9 | 仲裁条款预载解 | 事前承诺减少事中扯皮 | 合同写「按 NBS 仲裁」 |
| 10 | 多方时谨慎套用 | Nash-in-Nash 有微观条件 | 读 Collard-Wexler 等 |

# 常见认知陷阱

:::details 陷阱1：把总利润五五开叫「纳什」
错。应分 \(π-d_1-d_2\)。许可例：总利 \$10，保留 \$8+\$1，剩余 \$1 → \$8.5 / \$1.5，不是 \$5/\$5。【事实】
:::

:::details 陷阱2：忽略破裂点不对称
\(d=(2,1)\)、蛋糕 10 → NBS 为 **5.5 / 4.5**，不是 5/5。【推论】
:::

:::details 陷阱3：把 NBS 当「谈判一定会到的点」
它是公理/极限基准；现实有行为偏差、不完全信息、代理问题。【分析】
:::

:::details 陷阱4：效用与货币混用却忘风险态度
凹效用使前沿弯曲，均分货币 ≠ 均分效用。【分析】
:::

:::details 陷阱5：迷信 IIA「砍掉无关选项不影响」
若砍的是对方最佳期望，实验与 KS 理论都质疑其规范性。【事实】
:::

:::details 陷阱6：用嗓门代理议价力
议价力应进入 \(d\) 或 \(\tau\)；嗓门只是廉价谈话。【分析】
:::

:::details 陷阱7：多人场景直接两两 NBS 却无视外部性
需 Nash-in-Nash 或合作解；随意两两乘积可能不一致。【分析】
:::

:::details 陷阱8：把 Rubinstein 先手优势当成永久特权
δ→1 时先手优势消失，逼近对称 NBS。【事实】
:::

:::details 陷阱9：转让定价机械套 NBS 替代可比法
可比交易优先；NBS 是稀缺可比时的辅助/复核。【分析】
:::

:::details 陷阱10：以为对称公理要求「人一样强」
对称是「问题本身对称则解对称」；问题不对称时解也不对称。【事实】
:::

<!-- nav:实践 -->
# 从抽象到现实

| 抽象 | 机制 | 操作 |
|---|---|---|
| \((S,d)\) | 可行效用与威胁点 | 列出成交区间与 BATNA 现金流 |
| 纳什乘积 | 几何平均公平 | 电子表格最大化 \((u_1-d_1)(u_2-d_2)\) |
| IIA | 局部无关选项 | 问：砍掉的选项是否改变「期望锚」？ |
| \(\tau\)-Nash | 加权乘积 | 用相对耐心或制度权重校准 |
| BRW 极限 | 交替出价→公理解 | 用 δ 解释为何接近五五剩余 |

# 从理论到行动

1. **建表**：合作总价值、各方单干价值、可分剩余。  
2. **算点**：对称 NBS 与（如有）不对称 \(\tau\)。  
3. **对照**：KS（看乌托邦）、均分总蛋糕（暴露陷阱）。  
4. **映射货币**：把 \(u^*\) 译成价格/工资/费率。  
5. **压力测试**：\(d\) ±10%、π ±10%，看份额弹性。  
6. **写入流程**：下次谈判议程第一项是「核对剩余表」，不是「先喊价」。

# 技能树

:::details 主干 A · 公理与公式
四公理、存在唯一、纳什乘积、矩形几何。
:::

:::details 主干 B · 算例手算
线性前沿、许可剩余、工资乘积、非对称二次前沿。
:::

:::details 主干 C · 竞争解
KS、均等收益增益、独裁解；何时换轨。
:::

:::details 主干 D · 非合作基础
Rubinstein、BRW、需求博弈；δ 与 \(\tau\) 对照。
:::

:::details 主干 E · 应用翻译
许可、并购、工资、转让定价、双边寡头。
:::

:::details 主干 F · 批评与边界
IIA 争议、实验、多人扩展、激励相容缺口。
:::

# 游戏化世界

把谈判当成合作副本：\(d\) 是「不组队时的单刷收益」，\(S\) 是组队可达成的奖励集合。NBS 不是把 Boss 掉落五五开，而是先各自拿走单刷保底，再把**多出来的那部分**按乘积最大来分。虚报单刷收益 = 伪造装备评分，仲裁者（副本规则）若信了，队友会退队——剩余归零。

# 任务系统

| 任务 | 产出 | 验收 |
|---|---|---|
| T1 线性分蛋糕 | π,d → NBS | 默认 10;(2,1)→5.5/4.5 |
| T2 许可剩余 | 保留收益表 | 8.5/1.5 |
| T3 二次前沿 | NBS vs KS | ≈0.577/0.667 vs 0.618/0.618 |
| T4 Rubinstein | δ→份额 | δ=0.9→先手≈52.6% |
| T5 现实拆解 | 一份合同 | 标出隐含 \(S,d\) |
| T6 对照陷阱 | 五五总利 vs NBS | 写出差额 |

# 反事实模拟

四个可调模型：剩余分割、不对称权重、Nash vs KS、Rubinstein 耐心。

:::tabs
@@模型1 剩余分割（经典 NBS）
可转移效用：总蛋糕 `π`，破裂点 `d₁,d₂`。剩余 \(s=π-d_1-d_2\)（须 ≥0）。对称 NBS：**\(d_1+s/2\)** 与 **\(d_2+s/2\)**。默认 π=10, d=(2,1) → **5.50 / 4.50**，乘积 **12.25**。【推论】

:::raw
<div class="tool" id="tool-sp">
  <div class="ctrl">
    <label>总蛋糕 π <output id="sp_piO">10</output></label>
    <input type="range" id="sp_pi" min="1" max="40" step="0.5" value="10"/>
    <label>破裂点 d₁ <output id="sp_d1O">2</output></label>
    <input type="range" id="sp_d1" min="0" max="20" step="0.5" value="2"/>
    <label>破裂点 d₂ <output id="sp_d2O">1</output></label>
    <input type="range" id="sp_d2" min="0" max="20" step="0.5" value="1"/>
  </div>
  <div class="readout">
    <div class="ro">剩余 s <b id="sp_s">7.00</b></div>
    <div class="ro">方1 / 方2 <b id="sp_u">5.50 / 4.50</b></div>
    <div class="ro">纳什乘积 <b id="sp_prod">12.25</b></div>
    <div class="ro">五五总蛋糕对照 <b id="sp_half">5.00 / 5.00</b></div>
    <div id="sp_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="spChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型2 广义纳什（议价权重 τ）
最大化 \((u_1-d_1)^\tau(u_2-d_2)^{1-\tau}\)。线性前沿上：方1拿 \(d_1+\tau\cdot s\)。默认 π=10,d=(2,1),τ=0.67 → 约 **6.69 / 3.31**。【推论】

:::raw
<div class="tool" id="tool-gn">
  <div class="ctrl">
    <label>总蛋糕 π <output id="gn_piO">10</output></label>
    <input type="range" id="gn_pi" min="1" max="40" step="0.5" value="10"/>
    <label>d₁ <output id="gn_d1O">2</output></label>
    <input type="range" id="gn_d1" min="0" max="20" step="0.5" value="2"/>
    <label>d₂ <output id="gn_d2O">1</output></label>
    <input type="range" id="gn_d2" min="0" max="20" step="0.5" value="1"/>
    <label>方1 权重 τ <output id="gn_tO">0.67</output></label>
    <input type="range" id="gn_t" min="0.05" max="0.95" step="0.01" value="0.67"/>
  </div>
  <div class="readout">
    <div class="ro">方1 / 方2 <b id="gn_u">6.69 / 3.31</b></div>
    <div class="ro">剩余中方1占比 <b id="gn_share">67%</b></div>
    <div class="ro">对称对照 τ=0.5 <b id="gn_sym">5.50 / 4.50</b></div>
    <div class="ro">加权乘积 <b id="gn_prod">—</b></div>
    <div id="gn_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="gnChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型3 Nash vs Kalai–Smorodinsky
前沿 \(u_2=1-u_1^2\)（\(u_1\in[0,1]\)），\(d=(0,0)\)。NBS ≈ **0.577 / 0.667**（乘积≈0.385）；KS 沿乌托邦对角线得 **0.618 / 0.618**。可调曲率 \(k\)：\(u_2=1-u_1^k\)。【推论】

:::raw
<div class="tool" id="tool-ks">
  <div class="ctrl">
    <label>前沿指数 k <output id="ks_kO">2.0</output></label>
    <input type="range" id="ks_k" min="1.2" max="4" step="0.1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">Nash u₁/u₂ <b id="ks_n">0.577 / 0.667</b></div>
    <div class="ro">KS u₁/u₂ <b id="ks_ks">0.618 / 0.618</b></div>
    <div class="ro">Nash 乘积 <b id="ks_np">0.385</b></div>
    <div class="ro">|Δu₁| <b id="ks_du">0.041</b></div>
    <div id="ks_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="ksChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型4 Rubinstein 耐心 → 纳什极限
双方贴现 \(\delta_1,\delta_2\)。方1先手均衡份额 \((1-\delta_2)/(1-\delta_1\delta_2)\)。δ₁=δ₂=0.9 → **0.526**；δ→1 → **0.5**（对称 NBS）。【事实】

:::raw
<div class="tool" id="tool-rb">
  <div class="ctrl">
    <label>方1 贴现 δ₁ <output id="rb_d1O">0.90</output></label>
    <input type="range" id="rb_d1" min="0.50" max="0.99" step="0.01" value="0.90"/>
    <label>方2 贴现 δ₂ <output id="rb_d2O">0.90</output></label>
    <input type="range" id="rb_d2" min="0.50" max="0.99" step="0.01" value="0.90"/>
  </div>
  <div class="readout">
    <div class="ro">方1 先手份额 <b id="rb_x">0.526</b></div>
    <div class="ro">方2 份额 <b id="rb_y">0.474</b></div>
    <div class="ro">对称 NBS 对照 <b id="rb_nbs">0.500</b></div>
    <div class="ro">|先手−0.5| <b id="rb_gap">0.026</b></div>
    <div id="rb_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="rbChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收动作 |
|---|---|---|
| L1 识骨 | 能陈述四公理与乘积公式 | 对外讲清「不是总蛋糕五五开」 |
| L2 算账 | 会算线性/许可/二次前沿 | 模型默认值口述对 |
| L3 对照 | 会比 KS、Rubinstein、τ-Nash | 指出案例该用哪种 |
| L4 设计 | 能建剩余表 + 选解 + 写进合同附件 | 同事可按说明复算 |

# 30分钟最小实践

1. 选一场真实二人谈判（房租续约、项目分成、二手成交）。  
2. 写出各方 BATNA（年化或一次性现金）与合作总价值。  
3. 用模型 1 算 NBS，并与「总价五五开」并排。  
4. 若一方明显更有耐心/制度优势，用模型 2 试 τ=0.6–0.7。  
5. 产出：一页「剩余表 + NBS + 五五差 + 一句下一步要价」。

# 7天计划

| 天 | 焦点 | 产出 |
|---|---|---|
| D1 | 公理与乘积几何 | 手绘矩形 |
| D2 | 线性 + 许可算例 | 两张表 |
| D3 | KS 对照 | 二次前沿图 |
| D4 | Rubinstein | δ 扫描笔记 |
| D5 | 工资/并购一篇翻译 | 隐含 \(d\) |
| D6 | IIA 批评精读 | 半页立场 |
| D7 | 复盘最小实践 | 修订剩余表 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 公式与经典算例 | 四个模型默认值倒背 |
| W2 | 竞争解与实验 | NBS vs KS 一页对照 |
| W3 | 非合作基础 | BRW 论点口述 |
| W4 | 领域落地 | 选许可或合伙写完整附件 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 纳什乘积 | \(\max(u_1-d_1)(u_2-d_2)\) |
| 2 | 四公理刻画 | PO·SYM·INV·IIA ⇒ 唯一 NBS |
| 3 | 广义纳什 | 权重 \(\tau\) 编码议价力 |
| 4 | 可转移效用特例 | 均分剩余 \(s=π-d_1-d_2\) |
| 5 | Kalai–Smorodinsky | 用个人单调性替换 IIA |
| 6 | Rubinstein 交替出价 | SPE 份额由贴现决定 |
| 7 | BRW 极限 | 短回合 → 逼近 NBS |
| 8 | Zeuthen–Harsanyi | 让步规则与 NBS 等价 |
| 9 | 需求博弈（Nash 1953） | 不确定可行集时的非合作极限 |
| 10 | Nash-in-Nash | 多对双边议价的应用简约式 |

# 关键问题清单

:::details Q1 纳什讨价还价解和纳什均衡是一回事吗？
不是。纳什均衡是策略互为最佳反应；NBS 是合作讨价还价的公理分配点。二者可通过「纳什计划」联系，但解概念不同。【事实】
:::

:::details Q2 为什么一定要 IIA？
它保证「大集合里选中的点，在缩小后仍含该点的子集里仍被选中」。仲裁语境下自然；描述真实议价时争议大，KS 用个人单调性替换它。【事实】
:::

:::details Q3 什么时候用 KS 而不是 NBS？
当「对方最佳期望被砍掉却份额不变」让你觉得不公时；或实验/规范上更重视乌托邦比例。【分析】
:::

:::details Q4 不对称权重 τ 从哪来？
可从相对贴现、破裂风险、制度议价力估计；也可由事后校准。需披露，避免事后调参。【分析】
:::

:::details Q5 和沙普利值怎么选？
二人 TU 剩余分配二者常重合；三人及以上有外部联盟时优先合作博弈工具（沙普利/核）。【分析】
:::

:::details Q6 效用不能比怎么办？
INV 只允许仿射；若只观测货币，需假设风险中性或显式建模效用。【分析】
:::

:::details Q7 先手一定赚更多吗？
有限耐心下是；δ→1 时先手优势趋于 0。【事实】
:::

:::details Q8 转让定价能直接用 NBS 定特许费吗？
可作稀缺可比时的参考/复核，不能替代法定可比方法与文档义务。【分析】
:::

:::details Q9 多方并购怎么用？
简单两两 NBS 可能忽略交叉外部性；需联盟价值或 Nash-in-Nash 类结构。【分析】
:::

:::details Q10 合同里怎么写？
可写「争议时由仲裁员根据附件剩余表按纳什乘积最大化确定分成；破裂点以附件 BATNA 证据为准」。【推论】
:::

# 下一阶段探索

- 实验讨价还价：IIA vs 个人单调性的实验室证据。  
- 不完全信息讨价还价与推迟协议。  
- NTU（不可转移效用）讨价还价解族。  
- 随机破裂风险模型与时间偏好模型的对照（BRW）。  
- 纵向结构中的 Nash-in-Nash 实证（医院—保险、制造商—零售）。  
- 与「核」「核仁」在多人剩余分配上的分工。

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 四公理与纳什乘积 | 经典论文 | Nash 1950, *The Bargaining Problem*, Econometrica 18(2) | 【事实】 |
| 需求博弈极限 | 经典论文 | Nash 1953, *Two-Person Cooperative Games* | 【事实】 |
| KS 替代公理 | 期刊 | Kalai & Smorodinsky 1975, *Econometrica* | 【事实】 |
| 交替出价 SPE | 期刊 | Rubinstein 1982 | 【事实】 |
| 公理↔策略极限 | 期刊 | Binmore, Rubinstein & Wolinsky 1986, *RAND J. Econ.* | 【事实】 |
| Zeuthen 等价 | 综述/经典 | Harsanyi 对 Zeuthen 的整理 | 【事实】 |
| 许可剩余五五开误用 | 行业文 | LESI *The Nash Bargaining Solution* | 【分析】 |
| 转让定价应用 | 专业分析 | Tax Notes 等转让定价讨论文 | 【分析】 |
| Nash-in-Nash 微观基础 | 工作论文 | Collard-Wexler, Gowrisankaran, Lee (NBER w20641) | 【分析】 |
| 工资乘积有效合同 | 教科书表述 | 工会—厂商 \((U-U_0)(P-P_0)\) | 【分析】 |
| 本手册默认数值 | 推演 | node 验算 | 【推论】 |

标记约定：【事实】多方一致或原始定义；【分析】权威推导或机构判断；【推论】由模型推出；【假设】未验证；【待验证】单篇算例或转引链过长。

# 免责声明 {.appendix}

本手册为认知与实践框架，**不构成**投资、法律、税务、劳动争议或监管合规建议。纳什讨价还价解是规范/极限基准，不保证现实谈判结果。许可费、转让定价、并购估值等场景的数字多为教学推演或公开二手讨论，落地前须用自有数据与合格专业意见复核。互动模型中的默认参数仅为演示。
