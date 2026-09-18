---
slug: 沙普利值（Shapley Value）：合作博弈中按边际贡献分配收益的唯一公平解
title: 沙普利值（Shapley Value）
subtitle: 合作博弈里按<strong>边际贡献</strong>分配收益的唯一公平解——公理钉死公式，排列平均给出直觉；从手套博弈到 SHAP、电力成本分摊。
brand_sub: Shapley Value × Cooperative Games
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 合作博弈, 沙普利值, Shapley, 核, SHAP, 成本分摊, 权力指数]
theme_js_file: 沙普利值（Shapley Value）：合作博弈中按边际贡献分配收益的唯一公平解.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**沙普利值（Shapley value）**是可转移效用（TU）合作博弈上的**唯一**单值解：它把大联盟总剩余 \(v(N)\) 分给每个参与人，使分配同时满足效率、对称、虚拟人零份额与可加性（或 Young 的强单调性）。【事实】

公式上，参与人 \(i\) 拿到的是**对所有可能加入顺序的平均边际贡献**：

\[\phi_i(v)=\sum_{S\subseteq N\setminus\{i\}}\frac{|S|!\,(|N|-|S|-1)!}{|N|!}\bigl(v(S\cup\{i\})-v(S)\bigr)\]

Lloyd Shapley 1953 年提出；2012 年与 Roth 同获诺贝尔经济学奖（稳定匹配与市场设计相关贡献，沙普利值是其合作博弈工具箱的核心构件）。【事实】

与相邻概念分工：**核（core）**问「联盟会不会拆伙」；沙普利值问「事先公平份额该是多少」——核可空、可很大，沙普利值**永远唯一存在**。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么谈判压价」，而是：给定特征函数 \(v:2^N\to\mathbb{R}\)（每个联盟能创造多少可转移价值），有没有一套**公理上唯一**的事前分配规则，把 \(v(N)\) 分给个人。

边界：

- **在界内**：TU 合作博弈、特征函数、边际贡献、公理刻画、权力指数、成本分摊、特征归因（SHAP）。
- **在界外**：非合作讨价还价话术、股权对赌条款措辞——除非压成 \(v(S)\) 与解概念。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 合作剩余如何按「贡献」唯一分配 |
| 2 | 边界在哪 | 到「特征函数 + 单值解」为止；谈判过程可另建模 |
| 3 | 核心对象 | \(N,v\)、联盟、边际贡献、公理、近似算法 |
| 4 | 参与者 | 合作方；设计者/监管者；旁观者（纳税人、未入盟者） |
| 5 | 关键变量 | 超可加性、凸性、联盟值可观测性、计算预算 |
| 6 | 可直接观察 | 合同份额、分账单、SHAP 条形图、投票席位 |
| 7 | 无法直接观察 | 真实 \(v(S)\)、反事实「若缺席」的产量 |
| 8 | 谁影响谁 | \(v\) 形状 → 边际分布 → \(\phi\) → 是否愿入盟 |
| 9 | 因果关系 | 公理约束 ⇒ 唯一 \(\phi\)；凸性 ⇒ \(\phi\in\) 核 |
| 10 | 只是相关 | 「贡献大」≠「谈判力强」；沙普利是规范解，非预测均衡【分析】 |
| 11 | 表层现象 | 合伙利润、机场跑道费、输电成本、特征重要性 |
| 12 | 底层机制 | 均匀随机排列上的期望边际贡献 |
| 13 | 有反馈吗 | 有。份额不公 → 退出 → \(v\) 崩塌 → 需改规则或补贴 |
| 14 | 有延迟吗 | 有。动态联盟、学习 \(v\)、重复合作改变有效特征函数 |
| 15 | 正/负反馈 | 互补性强 → 大联盟稳；可加性被滥用 → 「假公平」拆伙 |

## 最关键的一句话

> 沙普利值不问「谁嗓门大」，而问：在所有同样可能的加入顺序里，你平均让联盟多赚了多少。

# 为什么值得研究

:::cards g3
### 它把「公平」钉成可检验公式
效率+对称+虚拟人+可加性 ⇒ 唯一解；Young (1985) 用强单调性替换可加性与虚拟人，结论不变。【事实】

### 它同时服务规范与计算
成本分摊、投票权力、机器学习归因（SHAP, Lundberg & Lee 2017）共用同一数学骨架。【事实】

### 它暴露「看起来公平」的陷阱
平均分、按投入比例、按最后边际——都可能违反对称或单调性；手套博弈里「稀缺左手」拿走 2/3。【分析】
:::

:::note amber 最贵的一次误判
把沙普利值当「谈判会收敛到的点」。它是**公理公平基准**，不是非合作均衡预测；核为空时大联盟本就不稳，\(\phi\) 仍存在但可能留不住人。【分析】
:::

# 世界地图

九层从「特征函数」爬到「制度与近似」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="svArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度军备 · 合谋防范 / 改进沙普利 / 监管分摊规则</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 实证与现场 · 电力成本 / 共享储能 / SHAP 产品化</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 计算与近似 · 采样 / 聚类 / TreeSHAP / 约束剪枝</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 跨域同构 · 利润 · 成本 · 权力 · 特征归因</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 与核的关系 · 凸 ⇒ φ∈核；核空时仍有 φ</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 经典游戏 · 手套 / 机场 / 加权投票 / 盈余分享</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 公理 · 效率·对称·虚拟人·可加 / Young 强单调</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 排列直觉 · n! 条加入路径上的平均边际</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 原语 · 参与人 N + 特征函数 v(S)</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2–L4**：会手算 3 人博弈、认手套与机场；进阶卡在 **L5** 与 **L7**——何时 \(\phi\) 在核内，以及 \(n\) 一大如何近似而不把「公平」算歪。【分析】
:::

# 核心概念地图

从抽象公平到可操作账单。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="80" y="16" width="520" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">公理公平 → φ(v) → 账单 / 权力 / 特征归因</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">效率·对称·单调</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">边际贡献期望</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">分账·投票·SHAP</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">v(S) 联盟值</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">可观测或反事实</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">排列平均</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">或加权子集公式</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">φᵢ 份额</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Σφᵢ=v(N)</text>

  <line x1="130" y1="146" x2="130" y2="180" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="146" x2="340" y2="180" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="550" y1="146" x2="550" y2="180" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <path d="M220 215 H250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <path d="M430 215 H460" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="280" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红虚线 = 反馈：份额不公 → 退出/合谋 → 改 v 或改分配规则</text>
  <text x="340" y="310" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">跨域同构：利润分享≈成本分摊（符号翻转）· 投票权力≈关键玩家</text>
  <text x="340" y="340" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">SHAP：特征=玩家 · 预测=联盟值 · 基线=E[f]</text>
</svg>
:::

# 核心参与者

| 角色 | 目标 | 信息位置 | 典型工具 |
|---|---|---|---|
| 合作方 / 玩家 | max 自身份额且愿留在大联盟 | 常知己方成本，不知全 \(v\) | 合同、退出威胁 |
| 规则设计者 | 公平 + 激励入盟 + 可计算 | 定义 \(v\) 或强制披露 | 沙普利、核、改进沙普利 |
| 监管 / 电网调度 | 成本因果、系统稳定 | 负荷与潮流数据 | Aumann–Shapley、分区分摊 |
| 模型解释者 | 归因可信、可审计 | 模型与背景分布 | SHAP / TreeSHAP |
| 旁观者 | 少承担外部性 | 常被忽略 | 预算平衡、补贴上限 |

# 核心变量

| 变量 | 符号/度量 | 为何关键 | 杠杆方向 |
|---|---|---|---|
| 联盟值 | \(v(S)\) | 一切边际由此出 | 测准反事实比争论公式更重要 |
| 人数 | \(n=\|N\|\) | 精确计算 \(O(2^n)\) | \(n>20\) 必须近似【事实】 |
| 超可加性 | \(v(S\cup T)\ge v(S)+v(T)\) | 大联盟有意义 | 无则先别谈公平分 |
| 凸性 | 边际递增 | \(\phi\) 在核内 | 互补业务优先 |
| 对称类 | 可互换玩家 | 强制等份额 | 别把「岗位不同」硬对称 |
| 虚拟人 | 边际恒 0 | 份额必须 0 | 揪出挂名股东 |
| 配额/权重 | 投票游戏 | 权力≠票权比例 | 看关键性而非席位 |
| 近似误差 | \(\|\hat\phi-\phi\|\) | 大 \(n\) 的真实风险 | 报告置信区间 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="40" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">技术/互补</text>
  <rect x="180" y="40" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">特征函数 v</text>
  <rect x="340" y="40" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="400" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">边际贡献</text>
  <rect x="500" y="40" width="140" height="50" rx="8" fill="#15181d"/><text x="570" y="70" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">沙普利 φ</text>

  <line x1="140" y1="65" x2="180" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="300" y1="65" x2="340" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="460" y1="65" x2="500" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="180" y="160" width="120" height="50" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="240" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">核 / 稳定</text>
  <rect x="340" y="160" width="120" height="50" rx="8" fill="#fee2e2" stroke="#d5342c"/><text x="400" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">退出威胁</text>
  <rect x="500" y="160" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="570" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">入盟决策</text>

  <line x1="240" y1="90" x2="240" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="400" y1="90" x2="400" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="570" y1="90" x2="570" y2="160" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="300" y1="185" x2="340" y2="185" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <line x1="460" y1="185" x2="500" y2="185" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>

  <path d="M570 210 Q340 280 80 90" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <text x="340" y="300" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：退出改变可行联盟 → 重估 v → 新的 φ</text>
</svg>
:::

因果链（实线）与反馈（红虚线）必须分清：

1. **技术互补 → \(v\)**：没有协同就没有可分剩余。【分析】
2. **\(v\) → 边际 → \(\phi\)**：公式是定义，不是谈判结果。【事实】
3. **\(\phi\) vs 核**：凸博弈中 \(\phi\) 在核内，稳定与公平可兼得；核空时「公平账单」仍可能被否决。【事实】
4. **退出反馈**：有人拿得少就走人，\(v(N)\) 本身变化——这是系统动力学，不是公理失效。【推论】

# 隐藏关系

:::cards g2
### 稀缺 complementarity ≠ 票权
手套博弈：一只左手套配两只右手套，左手套主拿 **2/3**，两只右手套各 **1/6**——不是「三人均分」。【事实】

### 可加性是「计算简单」公理
把两盘生意加总，份额也应加总。Young 证明：可换成功「边际不降则份额不降」的强单调性，更贴「贡献应得」。【事实】

### 权力指数暴露「关键少数」
权重 (50,50,1)、配额 51 的投票：三人 Shapley–Shubik 权力各 **1/3**——小股东成关键玩家。【事实】

### SHAP 继承假设债务
条件期望 vs 介入期望、特征相关时「缺失」如何填——公理公平仍在，但 \(v\) 的定义已掺入建模选择。【分析】
:::

跨域同构速记：凯利公式里的「边际信息」↔ 沙普利的「边际贡献」；信道容量的「增加一比特」↔ 特征加入对预测的增益；生态位的「关键种」↔ 投票关键玩家。【推论】

# 系统运行机制

标准流水线：

```
定义玩家与可转移货币 → 估计/声明 v(S)
    → 选择解概念（沙普利 / 核 / 核仁）
    → 精确或近似计算 φ
    → 对照：个人理性、核约束、政治可接受性
    → 签约或迭代修正 v / 规则
```

:::note green 运行时检查清单
1. \(v(\emptyset)=0\)？货币单位统一？  
2. 超可加吗？若否，大联盟故事不成立。  
3. 需要稳定还是只要公平基准？核空则先谈补贴或缩小 \(N\)。  
4. \(n\) 能否精确算？不能则选采样并报告误差。  
5. 输出 \(\sum\phi_i=v(N)\) 是否数值闭合？  
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1953</text><text x="80" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Shapley</text><text x="80" y="150" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">公理价值</text>
  <circle cx="200" cy="110" r="10" fill="#1d4ed8"/><text x="200" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1954</text><text x="200" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">S–S 权力</text><text x="200" y="150" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">投票指数</text>
  <circle cx="320" cy="110" r="10" fill="#b8730a"/><text x="320" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1973</text><text x="320" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">机场博弈</text><text x="320" y="150" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Littlechild</text>
  <circle cx="440" cy="110" r="10" fill="#1d4ed8"/><text x="440" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">1985</text><text x="440" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Young</text><text x="440" y="150" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">强单调性</text>
  <circle cx="560" cy="110" r="10" fill="#d5342c"/><text x="560" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">2017+</text><text x="560" y="68" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">SHAP</text><text x="560" y="150" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">ML 归因</text>
  <text x="340" y="200" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">并行支线：电力 Aumann–Shapley（2000s）→ 中国共享储能改进沙普利（2024–2025）</text>
</svg>
:::

演化逻辑：先钉公理（1953）→ 权力与成本特例 → 去掉可加性仍唯一（Young）→ 计算瓶颈催生采样与结构化精确算法 → ML 把「玩家」换成特征，把沙普利值推成解释性基础设施。【分析】

# 利益与激励

| 主体 | 想要什么 | 可能扭曲 |
|---|---|---|
| 稀缺互补方 | 高边际溢价（手套左） | 夸大「缺我就崩」 |
| 可替代方 | 压低对方独特性 | 隐瞒真实替代成本 |
| 大股东 | 权力≈股权 | 拒绝看关键性指数 |
| 平台/电网 | 可计算 + 少投诉 | 用粗糙均摊冒充沙普利 |
| 模型方 | SHAP「看起来科学」 | 操纵背景分布改归因 |

激励相容提醒：沙普利值本身**不**解决「谎报 \(v(S)\)」——那是机制设计层；合作博弈常假设 \(v\) 已知或由第三方核定。【分析】

# 资源与信息流

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0f8a4d"/></marker>
    <marker id="fB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="160" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="120" y="60" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">投入 / 产能</text><text x="120" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">各玩家资源</text>
  <rect x="260" y="30" width="160" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="60" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">联盟生产</text><text x="340" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">v(S) 剩余池</text>
  <rect x="480" y="30" width="160" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="560" y="60" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">沙普利分账</text><text x="560" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">φᵢ 回流</text>

  <line x1="200" y1="65" x2="260" y2="65" stroke="#0f8a4d" stroke-width="2" marker-end="url(#fA)"/>
  <line x1="420" y1="65" x2="480" y2="65" stroke="#0f8a4d" stroke-width="2" marker-end="url(#fA)"/>
  <path d="M560 100 Q560 180 120 180 Q120 100 120 100" fill="none" stroke="#0f8a4d" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#fA)"/>
  <text x="340" y="200" text-anchor="middle" fill="#0f8a4d" font-size="12" font-family="sans-serif">绿：剩余回流激励继续投入</text>

  <rect x="200" y="220" width="280" height="40" rx="8" fill="#fee2e2" stroke="#d5342c"/><text x="340" y="245" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红抽水：均摊 / 最后边际定价 → 稀缺方补贴可替代方</text>
</svg>
:::

信息流瓶颈：真正难的是**反事实 \(v(S)\)**（缺某机组、缺某特征时的系统值），不是公式。电力文献用最优潮流、机会约束调度估计联盟成本；ML 用背景样本近似「缺特征」。【分析】

中国场景【待验证】：台区分布式新能源共享储能合作中，有研究称联盟净收益可提升约 **6.64%**，并用贡献度修正沙普利；区域电力市场联合出清算例中总成本约降 **3%**、切负荷约降 **80%**，再按沙普利分增益——数字来自单篇论文算例，落地需独立复核。

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 序 | 杠杆点 | 为何高杠杆 | 操作 |
|---|---|---|---|
| 1 | 把争论从「谁该拿」改成「\(v(S)\) 表」 | 公式已唯一，争议多在输入 | 先填 3–5 人联盟表 |
| 2 | 检查超可加与凸性 | 决定大联盟是否该存在、φ 是否在核 | 算两两合并增益 |
| 3 | 用手套思维找稀缺方 | 避免平均主义毁掉互补 | 标出不可替代资源 |
| 4 | 权力 ≠ 股权 | 关键玩家被低估会拆伙 | 算 Shapley–Shubik |
| 5 | 机场分段收费 | 成本因果直觉清晰 | 按机型所需长度分段 |
| 6 | Young 强单调性作沟通话术 | 比「可加性」更好懂 | 「贡献不降份额不降」 |
| 7 | \(n\) 一大立刻换近似 | 精确算会假精确 | 采样 + 误差条 |
| 8 | SHAP 前固定背景分布 | 背景一改归因大变 | 文档化基线选择 |
| 9 | 对照核约束 | 公平账单也可能被否决 | 画核与 φ 位置 |
| 10 | 改进沙普利要透明权重 | 熵权/风险因子可成黑箱 | 公布修正因子来源 |

# 常见认知陷阱

:::details 1. 「公平就是平均分」
对称公理只要求**可互换**玩家等份；异质互补下平均分违反边际逻辑。手套：均分每人 1/3，但左手套应得 2/3。【事实】
:::

:::details 2. 「按投入比例分」
投入是成本侧；价值在联盟产出侧。沉没投入高但边际贡献低的人，沙普利份额可以很低。【分析】
:::

:::details 3. 「按最后加入时的边际分」
最后边际依赖路径；沙普利是**所有路径平均**。只认「收官一击」会奖励排队策略。【事实】
:::

:::details 4. 「沙普利值 = 谈判结果」
它是规范基准。现实谈判还受外部选择、耐心、不完全信息影响。【分析】
:::

:::details 5. 「核非空 ⇒ 沙普利最稳」
核非空只说明存在稳定分配集合；φ 是其中一点（凸时）或可能在核外（非凸）。【事实】
:::

:::details 6. 「票权比例 = 权力」
(50,50,1) 配额 51：权力各 1/3，不是 50:50:1。【事实】
:::

:::details 7. 「SHAP 数字就是因果效应」
SHAP 是合作博弈归因，不等于 do-演算因果效应；相关特征会混淆。【分析】
:::

:::details 8. 「\(n=30\) 也能精确算」
\(2^{30}\approx10^9\) 次联盟求值，实务上不可行；声称「精确沙普利」多半在撒谎或用了特殊结构。【事实】
:::

:::details 9. 「可加性太数学，可丢掉」
丢掉可加性却保留效率+对称+强单调，仍唯一得到沙普利——不是可有可无的装饰。【事实】
:::

:::details 10. 「改进沙普利一定更公平」
引入风险、稳定性权重后，公理唯一性通常被破坏；必须说明牺牲了哪条公理、换来什么。【分析】
:::

:::details 11. 「虚拟人拿一点辛苦费」
公理要求边际恒零者份额为零；「意思意思」会破坏唯一性并激励挂名。【推论】
:::

:::details 12. 「成本分摊用利润公式直接套」
成本博弈常取 \(c(S)\)，沙普利分的是成本；符号与个人理性表述要翻转，别把「多拿」说成「多亏」。【分析】
:::

<!-- nav:实践落地 -->
# 从抽象到现实

| 抽象 | 机制 | 现实操作 |
|---|---|---|
| \(v(S)\) | 联盟价值 | 合伙利润、联合调度节省、模型预测 |
| 边际贡献 | \(v(S\cup i)-v(S)\) | 「没你时系统差多少」 |
| \(\phi_i\) | 公平份额 | 分红、电费分摊、特征重要性 |
| 核 | 稳定集 | 无人有动机带队出走的分配集 |
| 简单博弈 | 0-1 胜利 | 议案是否通过 |
| Aumann–Shapley | 连续玩家极限 | 输电服务成本微量分摊 |

# 从理论到行动

1. **写清 \(N\)**：谁算玩家？客户算不算？  
2. **建最小 \(v\) 表**：全体子集或结构化生成器（机场、投票）。  
3. **算 \(\phi\)** 并与均分、按投入对照。  
4. **核检验**：若有人联盟被剥削，谈补贴或改成员。  
5. **规模化**：采样 / 聚类 / 利用单调性与非紧约束剪枝（电力拥堵成本文献可把计算量压到原问题的约 20% 仍保持精确，【待验证】方法依赖 OPF 结构）。  
6. **沟通**：用「平均边际」讲故事，用公理挡「凭什么」。

# 技能树

:::details 主干 A · 公理与公式
会陈述四公理；会写排列公式与子集加权公式；能证明三人手套。
:::

:::details 主干 B · 经典游戏
手套、机场（Littlechild–Owen）、加权投票 Shapley–Shubik、盈余分享。
:::

:::details 主干 C · 核与凸性
会检查个人/联盟理性；知凸 ⇒ φ∈核；能举核空例子的直觉。
:::

:::details 主干 D · 计算
精确枚举、蒙特卡洛排列采样、结构化算法；会报误差。
:::

:::details 主干 E · 应用翻译
成本分摊、供应链、电力、SHAP；能指出 \(v\) 如何估计。
:::

:::details 主干 F · 批评与替代
Banzhaf（不要求效率）、核仁、改进沙普利；知道何时不该用 φ。
:::

# 游戏化世界

把合作项目当成副本：玩家是职业卡片，\(v(S)\) 是组队通关奖励。你的任务不是喊「我输出最高」，而是收集所有组队记录，证明你的**平均补刀**最高——这就是沙普利。稀缺坦克（左手套）天然吃溢价；三个输出位均分会让坦克退游，副本崩盘。

# 任务系统

| 任务 | 产出 | 验收 |
|---|---|---|
| T1 手套手算 | 6 条排列边际表 | φ=(2/3,1/6,1/6) |
| T2 机场分段 | 机型成本 → 收费 | 与模型默认一致 |
| T3 权力指数 | 权重+配额 → SS | (50,50,1) 各 1/3 |
| T4 盈余对照 | 均分 vs φ | 指出谁被均分剥削 |
| T5 核草图 | 三人不等式 | 判断 φ 是否可行 |
| T6 现实拆解 | 一份合伙或分账单 | 标出隐含 \(v\) |

# 反事实模拟

四个可调模型：手套/三人盈余、机场成本、Shapley–Shubik 权力、协同强度分解。

:::tabs
@@模型1 三人盈余 · 手套极限
三人 A/B/C。单人价值 0；两两合作创造 `pAB/pAC/pBC`；大联盟 `G`。拖动三对协同与总剩余，看 φ。默认 pAB=0,pAC=0,pBC=0,G=1 → 退化需至少一对；设 pAB=1,pAC=1,pBC=0,G=1 即**手套**（A 为左），φ≈ **0.667 / 0.167 / 0.167**。默认盈余 pAB=6,pAC=8,pBC=10,G=24 → φ≈ **7.00 / 8.00 / 9.00**。【推论】

:::raw
<div class="tool" id="tool-gl">
  <div class="ctrl">
    <label>v({A,B}) <output id="gl_abO">6</output></label>
    <input type="range" id="gl_ab" min="0" max="30" step="1" value="6"/>
    <label>v({A,C}) <output id="gl_acO">8</output></label>
    <input type="range" id="gl_ac" min="0" max="30" step="1" value="8"/>
    <label>v({B,C}) <output id="gl_bcO">10</output></label>
    <input type="range" id="gl_bc" min="0" max="30" step="1" value="10"/>
    <label>v(N) 大联盟 <output id="gl_gO">24</output></label>
    <input type="range" id="gl_g" min="0" max="60" step="1" value="24"/>
  </div>
  <div class="readout">
    <div class="ro">φ(A) <b id="gl_a">7.00</b></div>
    <div class="ro">φ(B) <b id="gl_b">8.00</b></div>
    <div class="ro">φ(C) <b id="gl_c">9.00</b></div>
    <div class="ro">均分对照 <b id="gl_eq">8.00</b></div>
    <div id="gl_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="glChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型2 机场跑道费
机型 1–4 所需跑道成本递增 `c₁≤c₂≤c₃≤c₄`。Littlechild–Owen 分段收费 ≡ 沙普利成本分摊。默认成本 2,5,9,14 → 各付 **0.50 / 1.50 / 3.50 / 8.50**（合计 14）。【事实】

:::raw
<div class="tool" id="tool-ap">
  <div class="ctrl">
    <label>机型1 成本 c₁ <output id="ap_c1O">2</output></label>
    <input type="range" id="ap_c1" min="1" max="20" step="1" value="2"/>
    <label>机型2 成本 c₂ <output id="ap_c2O">5</output></label>
    <input type="range" id="ap_c2" min="1" max="30" step="1" value="5"/>
    <label>机型3 成本 c₃ <output id="ap_c3O">9</output></label>
    <input type="range" id="ap_c3" min="1" max="40" step="1" value="9"/>
    <label>机型4 成本 c₄ <output id="ap_c4O">14</output></label>
    <input type="range" id="ap_c4" min="1" max="50" step="1" value="14"/>
  </div>
  <div class="readout">
    <div class="ro">收费 1/2 <b id="ap_p12">0.50 / 1.50</b></div>
    <div class="ro">收费 3/4 <b id="ap_p34">3.50 / 8.50</b></div>
    <div class="ro">合计（应=c₄） <b id="ap_sum">14.00</b></div>
    <div class="ro">分段增量 <b id="ap_seg">2+3+4+5</b></div>
    <div id="ap_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="apChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型3 Shapley–Shubik 权力
四人权重与配额。默认 w=(40,30,20,10), q=51 → 权力约 **0.417 / 0.250 / 0.250 / 0.083**。切换到「关键少数」预设：w=(50,50,1), q=51 → 各 **0.333**。【事实】

:::raw
<div class="tool" id="tool-ss">
  <div class="ctrl">
    <label>权重 w₁ <output id="ss_w1O">40</output></label>
    <input type="range" id="ss_w1" min="1" max="60" step="1" value="40"/>
    <label>权重 w₂ <output id="ss_w2O">30</output></label>
    <input type="range" id="ss_w2" min="1" max="60" step="1" value="30"/>
    <label>权重 w₃ <output id="ss_w3O">20</output></label>
    <input type="range" id="ss_w3" min="0" max="60" step="1" value="20"/>
    <label>权重 w₄ <output id="ss_w4O">10</output></label>
    <input type="range" id="ss_w4" min="0" max="60" step="1" value="10"/>
    <label>配额 q <output id="ss_qO">51</output></label>
    <input type="range" id="ss_q" min="1" max="120" step="1" value="51"/>
  </div>
  <div class="readout">
    <div class="ro">φ₁ / φ₂ <b id="ss_p12">0.417 / 0.250</b></div>
    <div class="ro">φ₃ / φ₄ <b id="ss_p34">0.250 / 0.083</b></div>
    <div class="ro">股权比例对照 <b id="ss_eq">按权重归一</b></div>
    <div class="ro">权力合计 <b id="ss_sum">1.000</b></div>
    <div id="ss_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="ssChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::

@@模型4 协同强度 β
三人独立产出 a,b,c，每对额外协同 β（\(v(S)=\sum a_i+\beta\cdot\binom{|S|}{2}\)）。β=0 时 φ=独立产出；β 增大时每人额外拿等额协同（三人时每人 +β）。默认 a=10,b=20,c=30,β=5 → φ= **15 / 25 / 35**（大联盟值 75）。【推论】

:::raw
<div class="tool" id="tool-sy">
  <div class="ctrl">
    <label>A 独立产出 <output id="sy_aO">10</output></label>
    <input type="range" id="sy_a" min="0" max="50" step="1" value="10"/>
    <label>B 独立产出 <output id="sy_bO">20</output></label>
    <input type="range" id="sy_b" min="0" max="50" step="1" value="20"/>
    <label>C 独立产出 <output id="sy_cO">30</output></label>
    <input type="range" id="sy_c" min="0" max="50" step="1" value="30"/>
    <label>两两协同 β <output id="sy_betaO">5</output></label>
    <input type="range" id="sy_beta" min="0" max="30" step="1" value="5"/>
  </div>
  <div class="readout">
    <div class="ro">φ(A/B/C) <b id="sy_phi">15 / 25 / 35</b></div>
    <div class="ro">v(N) <b id="sy_vn">75</b></div>
    <div class="ro">协同总池 3β <b id="sy_pool">15</b></div>
    <div class="ro">每人协同份额 <b id="sy_share">5</b></div>
    <div id="sy_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">判定加载中…</div>
  </div>
  <canvas id="syChart" height="214" style="width:100%;margin-top:8px"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收动作 |
|---|---|---|
| L1 识骨 | 能解释排列平均与四公理 | 对外讲清「不是均分」 |
| L2 算账 | 会算 3–4 人经典游戏 | 模型默认值口述对 |
| L3 对照 | 会比核、均分、股权、Banzhaf | 指出案例该用哪种 |
| L4 设计 | 能定义 \(v\) + 选算法 + 写一页分账说明 | 同事可按说明复算 |

# 30分钟最小实践

1. 选一个真实三人合作（项目分红、合租公共开支、家庭旅行 AA）。  
2. 写出 \(v(\{i\})\)、三对 \(v(\{i,j\})\)、\(v(N)\)（可用「省下的钱/多赚的钱」）。  
3. 用本手册模型 1 算出 φ，并与「三人均分」并排。  
4. 写下：谁被均分剥削了？若按 φ 分，谁可能反对？核是否可能空？  
5. 产出：一页「\(v\) 表 + φ + 均分差 + 一句决策」。

# 7天计划

| 天 | 焦点 | 产出 |
|---|---|---|
| D1 | 公理与手套 | 手算表 |
| D2 | 机场与成本因果 | 分段费 |
| D3 | 投票权力 | SS vs 股权 |
| D4 | 核与凸性 | 不等式草图 |
| D5 | 采样近似直觉 | n=10 思想实验 |
| D6 | SHAP 一篇笔记 | 背景分布选择 |
| D7 | 复盘最小实践 | 修订 \(v\) |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 公式与经典游戏 | 四个模型默认值倒背 |
| W2 | 稳定与替代解 | 核/核仁/Banzhaf 对照一页 |
| W3 | 领域翻译 | 选电力或合伙做完整 \(v\) |
| W4 | 计算与沟通 | 近似方案 + 对外说明 PPT |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 沙普利值 φ | 随机排列上的期望边际贡献 |
| 2 | 四公理刻画 | 效率·对称·虚拟人·可加 ⇒ 唯一 |
| 3 | Young 强单调 | 边际不降 ⇒ 份额不降，仍唯一 |
| 4 | 核 | 无联盟可改进的分配集 |
| 5 | 凸博弈 | 边际递增 ⇒ φ∈核 |
| 6 | 手套博弈 | 稀缺互补的溢价实验 |
| 7 | 机场博弈 | 分段成本 = 沙普利 |
| 8 | Shapley–Shubik | 简单博弈上的权力指数 |
| 9 | Banzhaf | 摆动联盟计数，一般不效率归一 |
| 10 | SHAP | 特征=玩家的预测归因 |

# 关键问题清单

:::details Q1 沙普利值和纳什均衡是一回事吗？
不是。纳什是非合作策略均衡；沙普利是合作剩余的规范分配。可并存于更大故事，但解概念不同。【事实】
:::

:::details Q2 为什么一定要可加性？
它保证「生意分开算再加总」与「合并算」一致。若不喜欢它，用 Young 的强单调性，结论仍是沙普利。【事实】
:::

:::details Q3 核空了还能用沙普利吗？
能作为公平基准，但不能保证大联盟稳定；可能需要旁支付、缩小联盟或改 \(v\)。【分析】
:::

:::details Q4 和 Banzhaf 怎么选？
要效率（分尽 \(v(N)\)）→ 沙普利；只关心摆动影响力且接受总权力不归一 → Banzhaf 族。【分析】
:::

:::details Q5 成本分摊会不会让小用户吃亏？
机场例子里小飞机只付共用短跑道段；大飞机付自己引起的增量——符合成本因果。【事实】
:::

:::details Q6 SHAP 能替代因果推断吗？
不能。它回答「在选定 \(v\) 下的公平归因」，不自动回答干预效应。【分析】
:::

:::details Q7 \(n\) 很大怎么办？
排列采样、分层采样、聚类代表玩家、利用优化问题非紧约束剪枝；报告误差。【事实】
:::

:::details Q8 改进沙普利还算不算沙普利？
引入额外因子后通常失去公理唯一性；应称为「加权/修正分配」，并披露牺牲了哪条公理。【分析】
:::

:::details Q9 如何防止谎报联盟值？
沙普利不解决激励相容；需机制设计、第三方审计或可验证数据（如调度日志）。【分析】
:::

:::details Q10 合伙合同里怎么写？
可写「按附件特征函数的沙普利值分配；\(v\) 由年度审计核定；争议时先核对 \(v\) 再争论公式」。【推论】
:::

# 下一阶段探索

- 核仁（nucleolus）：最小化最大不满，另一单值解。  
- Aumann–Shapley 价格：连续商品/潮流的无穷小分摊。  
- 不可转移效用（NTU）价值与谈判解。  
- 动态/图限制联盟（Myerson value）。  
- 与 VCG 外部性支付的同构与差异。  
- 中国电力共享储能「改进沙普利」案例的独立复算。

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 沙普利公理与公式 | 经典论文 | Shapley 1953, *Contributions to the Theory of Games II* | 【事实】 |
| Young 强单调刻画 | 期刊 | Young 1985, *Int. J. Game Theory* | 【事实】 |
| 排列/期望边际表述 | 综述 | Hart, *Shapley value* 词条类综述 | 【事实】 |
| SHAP 统一框架 | 会议论文 | Lundberg & Lee, NIPS 2017 | 【事实】 |
| 机场博弈 | 经典应用 | Littlechild & Owen 1973 等 | 【事实】 |
| 输电/拥堵成本沙普利 | 期刊 | IEEE TPWRS / Applied Energy 等应用文 | 【分析】 |
| 计算复杂度与近似 | 运筹/电力 | 采样 SV；拥堵成本剪枝至约 20% 算力 | 【待验证】 |
| 中国共享储能/区域市场算例 | 中文期刊算例 | 储能科学与技术、中国电力等 2024–2025 | 【待验证】 |
| 手套/权力数值 | 本手册推演 | node 验算 | 【推论】 |

标记约定：【事实】多方一致或原始定义；【分析】权威推导或机构判断；【推论】由模型推出；【假设】未验证；【待验证】单篇算例或转引链过长。

# 免责声明 {.appendix}

本手册为认知与实践框架，**不构成**投资、法律、审计或监管合规建议。沙普利值是规范分配基准，不保证现实谈判或市场出清结果。电力、合伙、算法归因等场景的数字多来自公开论文算例或教学推演，落地前须用自有数据与法务/合规流程复核。互动模型中的默认参数仅为教学演示。
