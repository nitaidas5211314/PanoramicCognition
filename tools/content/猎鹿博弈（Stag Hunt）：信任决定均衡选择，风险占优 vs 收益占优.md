---
slug: 猎鹿博弈（Stag Hunt）：信任决定均衡选择，风险占优 vs 收益占优
title: 猎鹿博弈（Stag Hunt）：信任决定均衡选择
subtitle: 两个纳什均衡并存——<strong>猎鹿收益占优、猎兔风险占优</strong>；选哪一个，由「你多信对方会来」决定，不是由道德口号决定。
brand_sub: Stag Hunt × Risk vs Payoff Dominance
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 猎鹿博弈, Stag Hunt, 风险占优, 收益占优, 信任, 协调, Skyrms]
theme_js_file: 猎鹿博弈（Stag Hunt）：信任决定均衡选择，风险占优 vs 收益占优.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**猎鹿博弈（Stag Hunt）**（亦称保证型博弈 / assurance game、信任困境）：两人可合作猎鹿（高收益但需对方配合），或独自猎兔（低收益但安全）。存在**两个纯策略纳什均衡**——(鹿,鹿) **收益占优（payoff dominant）**，(兔,兔) **风险占优（risk dominant）**；另有一个混合纳什。默认 Skyrms 教学矩阵：鹿–鹿 **4**、兔–兔 **3**、单方猎鹿 **0**、单方猎兔 **3** → 只有当你相信对方选鹿的概率 \(q \ge q^*=0.75\) 时，猎鹿才划算。【事实】

卢梭《论人类不平等的起源》里的打猎寓言是叙事源头；现代形式化强调：理性并不自动选帕累托更优的均衡——**战略不确定性**把人推向安全的低均衡。【事实】（Skyrms, *The Stag Hunt and the Evolution of Social Structure*, 2004）

与囚徒困境的锋利分野：PD 唯一 NE 是相互背叛；猎鹿的两个 NE **都是互不背叛的稳定点**——卡住的不是「防人剥削」，而是「没人敢先给对方信心」。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「合作好不好」，而是：**当高效合作与安全自保同为均衡时，信任（信念）如何决定均衡选择，以及何种结构能把社会从猎兔推到猎鹿**。

边界：

- **在界内**：2×2 猎鹿支付、\(q^*\)、Harsanyi–Selten 风险占优、收益占优、吸引盆、保证/承诺装置、演化与配对结构（Skyrms）、与 PD / Chicken / 纯协调的判定。
- **在界外**：具体项目排期话术、某次融资谈判脚本——除非压成「\(R,T,P,S\) / 信念 \(q\) / 垫高失败残值」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 收益占优 vs 风险占优下的均衡选择与信任门槛 |
| 2 | 边界在哪 | 到支付矩阵 + 信念/演化规则可形式化为止 |
| 3 | 核心对象 | \(R,T,P,S\)、\(q^*\)、风险/收益占优、吸引盆 |
| 4 | 参与者 | 猎人、团队成员、标准采纳者、国家、算法 agent |
| 5 | 关键变量 | 对方合作信念 \(q\)、失败残值 \(S\)、合作红利 \(R-P\)、沟通/承诺 |
| 6 | 可直接观察 | 先例、押金、分阶段交付、公开时程、共同期限 |
| 7 | 无法直接观察 | 对方真实 \(q\)、主观风险厌恶、高阶信念 |
| 8 | 谁影响谁 | 支付 → \(q^*\)；信念 \(q\) → 最优反应；结构 → 吸引盆大小 |
| 9 | 因果关系 | \(q \ge q^*\) ⇒ 猎鹿最优；\((P-S)>(R-T)\) ⇒ 兔风险占优 |
| 10 | 只是相关 | 「大家口头说要合作」≠ 已越过 \(q^*\)【分析】 |
| 11 | 表层现象 | 项目搁浅、标准锁定在次优、联盟迟迟不开工 |
| 12 | 底层机制 | 协调失败：双方都愿合作，却因互不确信而选安全 |
| 13 | 有反馈吗 | 有。成功猎鹿沉淀信任；失败强化猎兔惯例 |
| 14 | 有延迟吗 | 有。信任与先例要时间积累 |
| 15 | 正/负反馈 | 信任正反馈锁定高效均衡；一次背信可负反馈跌回猎兔 |

## 最关键的一句话

> 猎鹿问的不是「合作值不值」，而是：**你对对方会来的把握，有没有跨过那个可算的门槛 \(q^*\)**。

# 为什么值得研究

:::cards g3
### 它是社会契约的最小模型
Skyrms 主张：自然状态≈风险占优的猎兔，社会契约≈收益占优的猎鹿——问题是**如何迁移**，不是「要不要合作」。【分析】

### 它纠正「饼够大就会自动合作」
默认矩阵里 4>3，但 \(q^*=0.75\)：报酬本身推不动任何人；安全格常常赢。【事实】

### 它开相反的药方
PD 要监督与惩罚；猎鹿要**保证、承诺、先例、垫高失败残值**——药开错，越治越僵。【推论】
:::

:::note amber 最贵的一次误判
把猎鹿当成囚徒困境：加码惩罚「不合作」，却忘了双方已经都在均衡里——真正缺的是让 \(q\) 越过 \(q^*\) 的保证装置。【分析】
:::

# 世界地图

九层看猎鹿如何从支付格长成信任操作系统。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="shArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 押金/分阶段/公共焦点把 q 推过 q*</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 社会结构 · 配对相关、社群、网络（Skyrms）</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 实验核校 · Van Huyck / Battalio 协调失败与优化激励</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 均衡选择 · Harsanyi–Selten 风险占优 vs 收益占优</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 信念门槛 · q* = (P−S)/(R−S+P−T)</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 吸引盆 · 猎兔盆 0.75 vs 猎鹿盆 0.25（默认）</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 双纯 NE · (鹿,鹿) 收益占优；(兔,兔) 风险占优</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 支付矩阵 · R&gt;T≥P&gt;S（经典 4,3,3,0）</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 合作需求 · 对齐才有高收益，不对齐有安全退路</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L3→L5**：先承认两个稳定点，再算 \(q^*\)。进阶卡在 **L8–L9**：信任不是口号，是结构与装置。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="200" y="16" width="280" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">猎鹿支付矩阵 (R,T,P,S)</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">收益占优 (鹿,鹿)</text><text x="130" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">R≥R，Pareto 更优</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">风险占优 (兔,兔)</text><text x="340" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">偏差损失积更大</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="550" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">信念门槛 q*</text><text x="550" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">(P−S)/(R−S+P−T)</text>

  <line x1="280" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="90" y="200" width="200" height="48" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="190" y="230" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">q &lt; q* → 猎兔最优</text>
  <rect x="390" y="200" width="200" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="490" y="230" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">q ≥ q* → 猎鹿最优</text>

  <line x1="340" y1="152" x2="190" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <line x1="340" y1="152" x2="490" y2="200" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="140" y="290" width="400" height="48" rx="8" fill="#f8f9fb" stroke="#c9cdd4"/><text x="340" y="320" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">杠杆：抬高 R · 垫高 S · 抬高对方可见承诺 → 降低 q*</text>
</svg>
:::

# 核心参与者

| 角色 | 动机 | 在系统中的作用 |
|---|---|---|
| 潜在合作方 | 既要红利又怕独自扛损 | 信念 \(q\) 的载体 |
| 召集人 / 锚点 | 降低战略不确定性 | 公共信号、共同期限 |
| 担保方 | 垫高失败残值 \(S\) 或惩罚背信 | 改变 \(q^*\) 本身 |
| 先例 / 惯例 | 把历史成功变成共同知识 | 抬高先验 \(q\) |
| 旁观者 / 市场 | 解读「谁先承诺」 | 声誉反馈 |

# 核心变量

| 变量 | 符号 | 默认 | 方向直觉 |
|---|---|---|---|
| 双方猎鹿支付 | \(R\) | 4 | 越大 → \(q^*\) 越低 |
| 对方猎鹿你猎兔 | \(T\) | 3 | 越大 → 猎兔越诱人（抬高 \(q^*\)） |
| 双方猎兔支付 | \(P\) | 3 | 安全基准；越大越难启动合作 |
| 你猎鹿对方猎兔 | \(S\) | 0 | 失败残值；垫高可降低 \(q^*\) |
| 对方选鹿信念 | \(q\) | — | \(q\ge q^*\) 才选鹿 |
| 门槛信念 | \(q^*\) | 0.75 | \((P-S)/(R-S+P-T)\) |
| 猎鹿吸引盆 | \(1-q^*\) | 0.25 | 默认小于猎兔盆 |

:::note green 默认数字纪律
全文默认 Skyrms 矩阵 \(R=4,T=3,P=3,S=0\) → \(q^*=0.75\)，猎兔吸引盆 **0.75**，猎鹿吸引盆 **0.25**；均匀信念 \(q=0.5\) 时 \(E(\text{鹿})=2 < E(\text{兔})=3\)。【事实】
:::

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="90" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">支付 (R,T,P,S)</text>
  <rect x="200" y="30" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="270" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">算出 q*</text>
  <rect x="380" y="30" width="140" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="450" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">信念 q vs q*</text>
  <rect x="520" y="30" width="140" height="50" rx="8" fill="#15181d"/><text x="590" y="60" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">选鹿或选兔</text>
  <line x1="160" y1="55" x2="200" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="340" y1="55" x2="380" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="450" y1="55" x2="520" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="80" y="140" width="160" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="160" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">战略不确定性高</text>
  <rect x="320" y="140" width="160" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="400" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">落入猎兔均衡</text>
  <rect x="500" y="140" width="160" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="580" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">先例锁定低效</text>
  <line x1="160" y1="80" x2="160" y2="140" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <line x1="240" y1="165" x2="320" y2="165" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <line x1="480" y1="165" x2="500" y2="165" stroke="#b8730a" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>

  <rect x="200" y="230" width="280" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="340" y="260" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">保证装置抬高可见 q / 垫高 S → 跃迁到猎鹿</text>
  <line x1="590" y1="80" x2="340" y2="230" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cA)"/>
</svg>
:::

# 隐藏关系

- **风险占优 ≠ 道德上「胆小」**：它是偏差损失积的比较——默认离开 (兔,兔) 的损失积 \(9\)，离开 (鹿,鹿) 仅 \(1\)。【事实】
- **PD 的影子**：若把「未来重复」折进支付，许多 PD 在策略空间上会**变形为猎鹿**——合作问题从「防剥削」变成「给信心」。【分析】（Skyrms）
- **谢林点只在对称时够用**：猎鹿常有支付不对称或战略不确定性，单靠标签焦点不够，需要保证装置。【分析】
- **实验并不总选风险占优**：Rankin–Van Huyck–Battalio 等显示，相似猎鹿序列下惯例可偏向**收益占优**；优化激励强弱也会改结果。【事实】【待验证：具体实验室份额外推到田野】

# 系统运行机制

默认支付矩阵（行玩家支付）：

|  | 对方猎鹿 | 对方猎兔 |
|---|---|---|
| 你猎鹿 | \(R=4\) | \(S=0\) |
| 你猎兔 | \(T=3\) | \(P=3\) |

1. **两个纯 NE**：双方都选鹿；双方都选兔。单方面偏离都会吃亏。  
2. **混合 NE**：双方以概率 \(q^*=0.75\) 选鹿（在此无差异）。  
3. **最优反应**：\(E(\text{鹿})=qR+(1-q)S\)，\(E(\text{兔})=qT+(1-q)P\)；当 \(q \ge q^*\) 选鹿。  
4. **风险占优判定（对称 2×2）**：比较离开两均衡的偏差损失积——\((P-S)^2\) vs \((R-T)^2\)；默认 \(9>1\)，(兔,兔) 风险占优。【事实】（Harsanyi & Selten, 1988）

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="70" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t0 陌生</text><text x="80" y="90" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">q 低 → 猎兔</text>
  <rect x="180" y="40" width="120" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="240" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t1 试探</text><text x="240" y="90" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">小额保证</text>
  <rect x="340" y="40" width="120" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="400" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t2 先例</text><text x="400" y="90" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">成功抬高 q</text>
  <rect x="500" y="40" width="160" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="580" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t3 猎鹿惯例</text><text x="580" y="90" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">吸引盆翻转</text>
  <line x1="140" y1="75" x2="180" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="300" y1="75" x2="340" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <line x1="460" y1="75" x2="500" y2="75" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tA)"/>
  <text x="340" y="160" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">一次重大背信可沿虚线跌回 t0（负反馈）</text>
  <path d="M580 110 Q340 200 80 110" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5 4"/>
</svg>
:::

复制子直觉：猎鹿策略频率 \(p\) 高于 \(q^*\) 时倾向爬向 1，低于则滑向 0——**门槛本身就是分水岭**。【推论】

# 利益与激励

| 行动 | 私人激励 | 集体后果 |
|---|---|---|
| 坚持猎兔 | 最坏也是 \(P\)，安全 | 社会剩余停在低均衡 |
| 单方猎鹿 | 冒 \(S\) 的风险 | 若对方跟进则双方得 \(R\) |
| 提供可见保证 | 短期成本（押金/曝光） | 抬高对方 \(q\)，促成跃迁 |
| 伪装高 \(q\) | 诱对方先动 | 一次背信摧毁吸引盆 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
    <marker id="fB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="120" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">合作红利池</text><text x="120" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">潜在 2R vs 2P</text>
  <rect x="260" y="30" width="160" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">信任 / 信念 q</text><text x="340" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">不可直接观测</text>
  <rect x="480" y="30" width="160" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="560" y="55" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">保证装置</text><text x="560" y="75" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">押金·分期·锚点</text>
  <line x1="200" y1="60" x2="260" y2="60" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#fA)"/>
  <line x1="420" y1="60" x2="480" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>

  <rect x="150" y="140" width="380" height="80" rx="8" fill="#f8f9fb" stroke="#c9cdd4"/><text x="340" y="175" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">信息流：可见承诺 → 抬高对方 q → 解锁红利池</text>
  <text x="340" y="200" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">抽水方向：战略不确定性把剩余抽回猎兔均衡（虚线）</text>
  <path d="M120 90 Q120 180 150 180" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#fB)"/>
</svg>
:::

默认剩余缺口：全猎鹿人均 4，全猎兔人均 3，**每人少 1、合计少 2**——不是因为有人背叛，而是因为没人敢信。【推论】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何有效 | 成本 |
|---|---|---|---|
| 1 | 算清并公示 \(q^*\) | 把「感觉不放心」变成可争论的数 | 低 |
| 2 | 垫高失败残值 \(S\) | 直接降低 \(q^*\)（\(S:0\to1\) → \(q^*:0.75\to0.667\)） | 中 |
| 3 | 抬高合作红利 \(R\) | \(R=6\) 时 \(q^*=0.50\)，风险占优打平 | 中高 |
| 4 | 可见的单方保证 | 抬高对方主观 \(q\)，不改矩阵也能跃迁 | 中 |
| 5 | 分阶段小猎鹿 | 用小成功抬先验，再开大项目 | 低 |
| 6 | 共同期限 / 召集人 | 降低战略不确定性（谢林式焦点） | 低 |
| 7 | 配对相关（只与同类合作） | Skyrms：社会结构可放大猎鹿吸引盆 | 高 |
| 8 | 降低安全选项 \(P\) 的相对吸引力 | 使「待着不动」变贵 | 政策级 |
| 9 | 优化激励设计（实验启示） | 加大「对最佳反应的金钱激励」可改协调结果 | 中【待验证】 |
| 10 | 防止一次背信清零 | 保护吸引盆，避免跌回 t0 | 中 |

# 常见认知陷阱

:::details 陷阱 1 · 「饼够大就会自动合作」
4>3 仍可能全员猎兔。报酬占优不解战略不确定性。
:::

:::details 陷阱 2 · 把猎鹿当成囚徒困境
PD 唯一 NE 是背叛；猎鹿两个 NE 都「不背叛」。药方相反。
:::

:::details 陷阱 3 · 以为风险占优=胆小可耻
风险占优是偏差损失积比较，不是性格审判。
:::

:::details 陷阱 4 · 口头承诺当 \(q\) 已够
未经代价的话不抬 \(q\)；要看可见沉没成本。
:::

:::details 陷阱 5 · 只做大项目不做小保证
\(q^*\) 高时，一步到位的大猎鹿最容易集体失败。
:::

:::details 陷阱 6 · 迷信「理论必选风险占优」
实验室惯例可偏向收益占优；田野外推须标【待验证】。
:::

:::details 陷阱 7 · 忽略 \(S\)（失败残值）
同样 \(R,P\)，垫高 \(S\) 比空喊愿景更能降门槛。
:::

:::details 陷阱 8 · 把 Chicken 的「示弱」逻辑套过来
Chicken 怕双硬；猎鹿怕「我硬（猎鹿）你软（猎兔）」。结构不同。
:::

:::details 陷阱 9 · 人数一多仍用两人 \(q^*\)
多方猎鹿门槛通常更苛刻——一人缺席可毁局。【分析】
:::

:::details 陷阱 10 · 用惩罚当唯一工具
惩罚适合 PD 剥削；猎鹿更需要保证与先例。惩罚过猛可能摧毁试探性合作。
:::

# 从抽象到现实

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="mA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="20" width="180" height="240" rx="10" fill="#f8f9fb" stroke="#c9cdd4"/>
  <text x="120" y="50" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">抽象</text>
  <text x="120" y="100" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">双 NE</text>
  <text x="120" y="140" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">q* 门槛</text>
  <text x="120" y="180" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">风险 vs 收益占优</text>
  <text x="120" y="220" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">吸引盆</text>

  <rect x="250" y="20" width="180" height="240" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="340" y="50" text-anchor="middle" fill="#1d4ed8" font-size="12" font-family="sans-serif">机制</text>
  <text x="340" y="100" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">战略不确定性</text>
  <text x="340" y="140" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">保证 / 先例</text>
  <text x="340" y="180" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">配对结构</text>
  <text x="340" y="220" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">优化激励</text>

  <rect x="470" y="20" width="180" height="240" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="560" y="50" text-anchor="middle" fill="#0f8a4d" font-size="12" font-family="sans-serif">操作</text>
  <text x="560" y="100" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">标 R,T,P,S</text>
  <text x="560" y="140" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">算 q* 与盆</text>
  <text x="560" y="180" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">设计垫高 S</text>
  <text x="560" y="220" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">小步先例</text>

  <line x1="210" y1="140" x2="250" y2="140" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#mA)"/>
  <line x1="430" y1="140" x2="470" y2="140" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#mA)"/>
</svg>
:::

现实同构：联合研发、开源标准采纳、联盟作战、夫妻共同创业、「谁先全职投入」——高效结果都需要对方配合，单独行动有安全退路。【分析】

# 从理论到行动

| 理论构件 | 行动翻译 |
|---|---|
| 收益占优 | 写清「做成了每人多得多少」 |
| 风险占优 | 写清「对方不来时你最坏多少」 |
| \(q^*\) | 开会先报门槛，再谈愿景 |
| 垫高 \(S\) | 预留残值、可撤销试点、保险 |
| 可见保证 | 押金、公开里程碑、第三方托管 |
| 吸引盆 | 用小成功扩大猎鹿盆，再加码 |

<!-- nav:实践系统 -->
# 技能树

:::details 枝 1 · 矩阵识别
能在 5 分钟内判定：猎鹿 / PD / Chicken / 纯协调。
:::

:::details 枝 2 · 门槛计算
熟记 \(q^*=(P-S)/(R-S+P-T)\)，能手算默认 0.75。
:::

:::details 枝 3 · 占优判别
会用偏差损失积比较风险占优；能指出何时 \(R=6\) 打平。
:::

:::details 枝 4 · 装置设计
能提出至少两种降低 \(q^*\) 或抬高 \(q\) 的装置。
:::

:::details 枝 5 · 实验素养
知道实验室不总选风险占优，外推标【待验证】。
:::

# 游戏化世界

把团队协作当成开放世界：主线任务是「把 \(q\) 推过 \(q^*\)」；支线是「垫高 \(S\)」「攒先例」；Boss 是「一次背信清零」。死亡不是背叛惩罚，而是**永久停在猎兔村**。

# 任务系统

| 任务 | 验收 |
|---|---|
| 手算默认 \(q^*\) | 写出 0.75 与 EU 对照 |
| 改一个参数降门槛 | 报告新 \(q^*\) |
| 写一份保证清单 | ≥3 条可见装置 |
| 案例建模 | 1 则真实合作卡顿标成猎鹿 |
| 与 PD 对照卡 | 半页差异 |

# 反事实模拟

:::tabs
@@若把 R 从 4 提到 6
\(q^*=(3-0)/(6-0+3-3)=0.50\)；偏差损失积打平——风险占优不再单方面偏向猎兔。合作启动显著更容易。【事实】

@@若把失败残值 S 从 0 垫到 1
\(q^*=2/3\approx0.667\)；猎鹿盆从 0.25 扩到 ≈0.333。不必把饼做很大，先垫摔下去的位置。【事实】

@@若信念卡在 q=0.50
\(E(\text{鹿})=2<E(\text{兔})=3\)——理性选兔。喊「大家要有信心」无效，除非改支付或提供可见证据抬 \(q\)。【推论】

@@若误开 PD 药方
加强惩罚「不合作」却不提供保证：试探性猎鹿被吓回去，吸引盆更偏向猎兔。【假设】
:::

## 可调模型 1 · 支付矩阵 → q*、吸引盆、风险占优

拖动 \(R,T,P,S\)（约束保持猎鹿型：\(R>T\ge P>S\) 尽量由滑块范围守护）。默认 \(4,3,3,0\) → \(q^*=0.75\)，猎兔风险占优，盆 0.75 / 0.25。

:::raw
<div class="tool" id="tool_mx">
  <div class="ctrl">
    <label>双方猎鹿 R <output id="mx_rO">4.0</output></label>
    <input type="range" id="mx_r" min="2" max="12" step="0.1" value="4"/>
    <label>你兔对方鹿 T <output id="mx_tO">3.0</output></label>
    <input type="range" id="mx_t" min="1" max="10" step="0.1" value="3"/>
    <label>双方猎兔 P <output id="mx_pO">3.0</output></label>
    <input type="range" id="mx_p" min="1" max="10" step="0.1" value="3"/>
    <label>你鹿对方兔 S <output id="mx_sO">0.0</output></label>
    <input type="range" id="mx_s" min="-2" max="5" step="0.1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">q*<strong id="mx_q">0.75</strong></div>
    <div class="ro">猎鹿盆<strong id="mx_bs">0.25</strong></div>
    <div class="ro">猎兔盆<strong id="mx_bh">0.75</strong></div>
    <div class="ro">风险占优<strong id="mx_rd">猎兔</strong></div>
    <div id="mx_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="mx_vh">默认：q*=0.75；损失积 兔9 vs 鹿1 → 猎兔风险占优；猎兔盆 0.75</span></div>
  </div>
  <canvas id="mxChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 信念 q：最优反应何时翻到猎鹿

对方以概率 \(q\) 选鹿：比较 \(E(\text{鹿})\) 与 \(E(\text{兔})\)。默认支付下阈值 0.75；拖动 \(q\) 看翻转。

:::raw
<div class="tool" id="tool_bl">
  <div class="ctrl">
    <label>信念 q（对方猎鹿） <output id="bl_qO">0.50</output></label>
    <input type="range" id="bl_q" min="0" max="1" step="0.01" value="0.50"/>
    <label>R <output id="bl_rO">4.0</output></label>
    <input type="range" id="bl_r" min="2" max="12" step="0.1" value="4"/>
    <label>T <output id="bl_tO">3.0</output></label>
    <input type="range" id="bl_t" min="1" max="10" step="0.1" value="3"/>
    <label>P <output id="bl_pO">3.0</output></label>
    <input type="range" id="bl_p" min="1" max="10" step="0.1" value="3"/>
    <label>S <output id="bl_sO">0.0</output></label>
    <input type="range" id="bl_s" min="-2" max="5" step="0.1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">阈值 q*<strong id="bl_star">0.75</strong></div>
    <div class="ro">E(鹿)<strong id="bl_es">2.00</strong></div>
    <div class="ro">E(兔)<strong id="bl_eh">3.00</strong></div>
    <div class="ro">最优<strong id="bl_br">猎兔</strong></div>
    <div id="bl_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="bl_vh">q=0.50 &lt; q*=0.75 → E(鹿)=2.00 &lt; E(兔)=3.00 → 最优猎兔</span></div>
  </div>
  <canvas id="blChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 垫高残值 vs 做大饼：两种降门槛路径

固定 \(T=3,P=3\)，比较「抬高 \(R\)」与「垫高 \(S\)」对 \(q^*\) 的效果。默认对照：\(R=4,S=0\) → 0.75；目标线可看何时降到 0.50。

:::raw
<div class="tool" id="tool_lv">
  <div class="ctrl">
    <label>合作红利 R <output id="lv_rO">4.0</output></label>
    <input type="range" id="lv_r" min="3" max="12" step="0.1" value="4"/>
    <label>失败残值 S <output id="lv_sO">0.0</output></label>
    <input type="range" id="lv_s" min="-1" max="2.5" step="0.1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">当前 q*<strong id="lv_q">0.75</strong></div>
    <div class="ro">仅抬 R→6<strong id="lv_r6">0.50</strong></div>
    <div class="ro">仅垫 S→1<strong id="lv_s1">0.67</strong></div>
    <div class="ro">相对默认 Δ<strong id="lv_d">0.00</strong></div>
    <div id="lv_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="lv_vh">当前 q*=0.75；对照「R=6→0.50」「S=1→0.67」——垫高残值与做大饼都有效</span></div>
  </div>
  <canvas id="lvChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 配对相关 ρ：熟人圈如何放大猎鹿

简化 Skyrms 直觉：若你选鹿，对方也选鹿的条件概率为 \(r=\rho+(1-\rho)p_{\mathrm{pop}}\)（\(\rho\) 为同型配对强度，\(p_{\mathrm{pop}}\) 为种群猎鹿比例）。当 \(r\ge q^*\) 时，猎鹿在局部可自我维持。默认 \(q^*=0.75\)，\(p_{\mathrm{pop}}=0.40\)，\(\rho=0.40\) → \(r=0.64\) 仍低于门槛；\(\rho=0.90\) → \(r=0.94\) 可维持。【推论】

:::raw
<div class="tool" id="tool_as">
  <div class="ctrl">
    <label>同型配对 ρ <output id="as_rhoO">0.40</output></label>
    <input type="range" id="as_rho" min="0" max="1" step="0.01" value="0.40"/>
    <label>种群猎鹿比 p <output id="as_pO">0.40</output></label>
    <input type="range" id="as_p" min="0" max="1" step="0.01" value="0.40"/>
    <label>门槛 q* <output id="as_qO">0.75</output></label>
    <input type="range" id="as_q" min="0.3" max="0.95" step="0.01" value="0.75"/>
  </div>
  <div class="readout">
    <div class="ro">条件 r<strong id="as_r">0.64</strong></div>
    <div class="ro">相对门槛<strong id="as_gap">-0.11</strong></div>
    <div class="ro">局部可维持<strong id="as_ok">否</strong></div>
    <div id="as_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="as_vh">r=ρ+(1−ρ)p=0.64 &lt; q*=0.75 → 局部猎鹿尚不可维持；提高 ρ 或 p</span></div>
  </div>
  <canvas id="asChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 | 识别猎鹿 vs PD / Chicken | 说出 NE 个数与危险点 |
| L2 | 手算 \(q^*\)、吸引盆、风险占优 | 与滑块一致 |
| L3 | 设计降门槛装置 | 给出 R 路径与 S 路径各一 |
| L4 | 案例建模与实验外推批评 | 标【待验证】处说得清 |

# 30分钟最小实践

1. 纸上写出默认矩阵，标两个纯 NE 与 \(q^*=0.75\)（8 分钟）。  
2. 手算 \(R=6\) 与 \(S=1\) 的新 \(q^*\)（0.50 与 ≈0.67），用模型 1/3 核对（8 分钟）。  
3. 模型 2：把 \(q\) 从 0.50 拖到 0.80，确认翻转在 0.75（7 分钟）。  
4. 选一件身边「大家都想做成却迟迟不开工」的事，用一句话判定是否猎鹿，并写一条保证装置（7 分钟）。  

产出：一张手算矩阵 + 一句案例判定——成本接近 0，可验证。

# 7天计划

| 天 | 焦点 | 交付 |
|---|---|---|
| D1 | 矩阵与双 NE | 自造 1 个猎鹿矩阵 |
| D2 | \(q^*\) 公式 | 5 组参数表 |
| D3 | 风险 vs 收益占优 | 半页判别卡 |
| D4 | 与 PD / Chicken 对照 | 三列差异表 |
| D5 | 保证装置 | 清单 ≥5 条 |
| D6 | 现实案例 | 1 则新闻/职场建模 |
| D7 | 复盘 | 技能树自测 |

# 30天计划

| 周 | 主题 | 成果 |
|---|---|---|
| W1 | 静态猎鹿熟练 | 10 个矩阵速判 |
| W2 | 占优与实验文献 | 阅读笔记 1 页 |
| W3 | 装置与先例设计 | 团队试点方案 |
| W4 | 社会结构 / 配对 | Skyrms 要点卡 + 1 应用 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 猎鹿支付 | \(R>T\ge P>S\)；默认 4,3,3,0 |
| 2 | 双纯 NE | (鹿,鹿) 与 (兔,兔) |
| 3 | 信念门槛 | \(q^*=(P-S)/(R-S+P-T)\) |
| 4 | 收益占优 | (鹿,鹿) Pareto 优于 (兔,兔) |
| 5 | 风险占优 | 偏差损失积更大者；(兔,兔) 常胜 |
| 6 | 吸引盆 | 猎兔盆 \(q^*\)，猎鹿盆 \(1-q^*\) |
| 7 | 保证装置 | 抬 \(q\) 或改 \(S,R\) 以降门槛 |
| 8 | 垫高残值 | \(S\uparrow\) ⇒ \(q^*\downarrow\) |
| 9 | 配对相关 | \(\rho\) 提高条件合作概率 |
| 10 | 与 PD 分流 | NE 个数与药方方向是第一刀 |

# 关键问题清单

:::details Q1 我面对的是猎鹿还是 PD？
看「相互不合作」是否为唯一 NE：是 → 偏 PD；若相互合作与相互安全都是 NE → 偏猎鹿。
:::

:::details Q2 现在该不该先动猎鹿？
估 \(q\) 与 \(q^*\)；\(q<q^*\) 时先动是亏的——先改装置再先动。
:::

:::details Q3 如何降低 q*？
优先垫高 \(S\)、抬高 \(R\)；其次降低 \(P\) 的相对吸引力。
:::

:::details Q4 口头说「我一定来」够不够？
不够。需要可见沉没成本、第三方或分阶段交付。
:::

:::details Q5 风险占优是否总赢？
理论选择准则偏向它时更「安全」；实验中惯例可偏向收益占优——分清规范与描述。【事实】【待验证外推】
:::

:::details Q6 和谢林点什么关系？
谢林点帮对称协调收敛；猎鹿常需额外保证，因失败代价不对称地砸在「先信者」身上。
:::

:::details Q7 人数变多怎么办？
多方猎鹿通常提高有效门槛；更依赖召集人、公共监控与小圈子试点。【分析】
:::

:::details Q8 商业合伙怎么用？
标定「做成分红 / 对方不投入时你的沉没」；用分期出资与回购条款垫高 \(S\)、抬可见 \(q\)。
:::

:::details Q9 为何「愿景大会」常失败？
只抬叙事中的 \(R\)，不碰 \(q\) 与 \(S\)；听众理性地继续猎兔。
:::

:::details Q10 数字不可信怎么办？
先做不等式（\(q\) 是否可能 ≥ 粗估 \(q^*\)），再做点估计；二手实验份额标【待验证】。
:::

# 下一阶段探索

- 深入：Skyrms《The Stag Hunt and the Evolution of Social Structure》；Harsanyi & Selten《A General Theory of Equilibrium Selection in Games》。  
- 并列手册：囚徒困境、协调与谢林点、鹰鸽/Chicken、可信承诺。  
- 批评线：把一切集体行动失败都猎鹿化的过度建模；实验到田野的外部效度。【分析】

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 卢梭猎鹿寓言与现代博弈形式化 | 一手/经典 | Rousseau *Discourse on Inequality*；Skyrms 论文/书 (2001/2004) | 【事实】 |
| 默认支付与风险占优叙述 | 教材/讲义 | Skyrms *The Stag Hunt*；中英文维基 Stag hunt | 【事实】 |
| \(q^*\) 与收益/风险占优定义 | 经典文献 | Harsanyi & Selten (1988)；风险占优条目 | 【事实】 |
| 实验室协调与优化激励 | 实验论文 | Battalio–Samuelson–Van Huyck；Rankin–Van Huyck–Battalio (GEB 2000) | 【事实】 |
| 田野份额外推 | 转述 | 本手册不引用单一田野百分比 | 【待验证】 |
| 配对相关 ρ 公式 | 简化推论 | 教学用 Skyrms 直觉近似，非完整演化模型 | 【推论】 |
| 本手册默认数值 | 教学标定 | 自洽手算 + 可调模型 | 【事实】 |

标记约定：【事实】多方一致或可复算；【分析】权威框架下的判断；【推论】由模型推出；【假设】未验证；【待验证】单一来源或转载链长。

# 免责声明 {.appendix}

本手册是认知与决策框架教程，**不是**管理咨询、法律、投资或政策建议。真实组织中的支付、信息与约束远比 2×2 矩阵复杂；任何把寓言或实验直接当作行动指令的做法都超出本文范围。读者须自行承担应用风险。
