---
slug: 免费搭便车（Free Riding）：集体收益不可排他时，个体最优是不出力，团队规模越大越严重
title: 免费搭便车（Free Riding）：集体收益不可排他时，个体最优是不出力
subtitle: 公共物品的收益<strong>挡不住外人</strong>，成本却压在贡献者身上——理性人的最优动作往往是「让别人干」；团队越大，个人份额越薄，搭便车越严重。
brand_sub: Free Riding × Public Goods × Group Size
kicker: Panoramic Cognition & Practice Engine
chips: 30 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-30
data_asof: 2026 年 9 月
tags: [搭便车, 免费搭车, Free Riding, 公共物品, 奥尔森, VCM, MPCR, 集体行动, 团队偷懒]
theme_js_file: 免费搭便车（Free Riding）：集体收益不可排他时，个体最优是不出力，团队规模越大越严重.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**免费搭便车（Free Riding）**：当集体收益具有**不可排他性**（不出力也能享受），且个人贡献的私人回报低于成本时，理性个体的最优策略是**少出力或不出力**——让别人扛成本、自己坐享其成。【事实】

这与「公地悲剧」是同一激励家族的**镜像**：公地悲剧是**过度取用**（竞争性资源）；搭便车是**供给不足**（非排他收益的公共品）。奥尔森（1965）进一步指出：集团越大，个人份额越薄、边际贡献越难被察觉，搭便车越严重——除非有**选择性激励**或强制。【事实】

默认线性公共品（VCM）：禀赋 \(e=20\)、人数 \(N=4\)、边际人均回报 \(\mathrm{MPCR}=0.4\)。全不贡献各得 **20**；全贡献各得 **32**（集体多赚 48）；你单独全贡献则你得 **8**、别人各得 **28**——私人理性绝不贡献，集体理性要求全贡献。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「谁品德差」，而是一套可算账的激励结构：

1. **公共物品 / 集体物品**：消费上难排他（你用我不减，或减得很少）→ 不付费也能用。
2. **搭便车**：享受收益但不承担相应成本（或不按份额承担）。
3. **规模效应（奥尔森）**：\(N\) 变大 → 个人分得的收益份额 \(B/N\) 变小、组织成本上升、贡献可观测性下降 → 自愿供给更难。

边界：

- **在界内**：线性公共品博弈、奥尔森集团理论、VCM 实验、选择性激励、惩罚/奖励、团队生产偷懒、开源维护、气候协定中的国家搭便车。
- **在界外**：单纯道德谴责、某次开会「谁没发言」的八卦、与激励无关的能力不足——除非能压成「收益不可排他 + 成本私人化」结构。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 不可排他收益下，为何个体最优 = 不出力，以及何种规则扭转 |
| 2 | 边界在哪 | 到「收益属性 + MPCR/份额 + 监测制裁 + 规模」可建模为止 |
| 3 | 核心对象 | 公共物品、MPCR、搭便车、选择性激励、条件合作、惩罚 |
| 4 | 参与者 | 团队成员、贡献者、搭便车者、管理者、协会、国家、开源维护者 |
| 5 | 关键变量 | \(N\)、MPCR、\(B/N\)、监测成本、制裁强度、贴现因子、异质性 |
| 6 | 可直接观察 | 贡献额、出勤、代码提交、会费、减排承诺兑现率 |
| 7 | 无法直接观察 | 真实努力、对他人互惠的信念、隐性规范 |
| 8 | 谁影响谁 | 收益属性→私人激励→贡献→总量→信念→下一轮贡献 |
| 9 | 因果关系 | \(\mathrm{MPCR}<1\) ⇒ 贡献是劣势策略（线性 VCM） |
| 10 | 只是相关 | 「没人干活」≠ 搭便车；可能是能力、信息或目标冲突【分析】 |
| 11 | 表层现象 | 会议沉默、共同文档空白、开源 issue 堆积、气候谈判拖延 |
| 12 | 底层机制 | 正外部性被私人化不足；成本贴在贡献者，收益摊给全体 |
| 13 | 有反馈吗 | 有。贡献下降→互惠信念崩塌→更多人搭便车（正反馈） |
| 14 | 有延迟吗 | 有。信任崩塌快、重建慢；制度学习有时滞 |
| 15 | 正/负反馈 | 无惩罚的衰减是正反馈；分级制裁与可见贡献是负反馈 |

## 最关键的一句话

> 搭便车不是性格缺陷的别名，而是 **「私人边际回报 < 私人边际成本」** 时的理性解；要改行为，先改这笔账。

# 为什么值得研究

:::cards g3
### 它是组织失败的默认诊断
从项目组到行业协会，最常见的「说好一起做、最后没人做」都能压成同一结构。【分析】

### 它解释「大未必强」
人数增加看似力量变大，却往往让每人更划算去偷懒——奥尔森对「共同利益自动组织」的修正。【事实】

### 它连接实验与制度
实验室 VCM 给出可重复数字；奥斯特罗姆与选择性激励给出可操作解药——不只停留在抱怨。【事实】
:::

:::note amber 和公地悲剧怎么区分
公地悲剧：竞争性资源 + 开放获取 → **拿太多**。搭便车：不可排他收益 → **给太少**。同一家族，药方侧重点不同：前者重边界与取用规则，后者重贡献可见、选择性激励与惩罚。【分析】
:::

# 世界地图

九层看搭便车如何从「一个人的账」长成「全球协议的僵局」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="frL9" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 全球公共品 · 气候 / 防疫 · 国家级搭便车</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 协会与国家 · 强制会费、税收、配额与俱乐部物品</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 制度设计 · 选择性激励 · 奥斯特罗姆监测/分级制裁</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 重复与声誉 · 条件合作、贴现、无名氏定理边界</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 实验层 · VCM 衰减 · 惩罚可托底（~50%→18% vs 可至~70%）</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 奥尔森规模 · B/N 变薄 · 特权集团 vs 潜在集团</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 线性公共品 · MPCR&lt;1 占优不贡献 · 社会要 MPCR·N&gt;1</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 激励算术 · 私人 Δ = −1+MPCR · 社会 Δ = −1+MPCR·N</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 收益属性 · 不可排他（或排他成本极高）</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1–L3**（会不会算私人 Δ 与社会 Δ）；进阶卡在 **L4–L5**（规模与实验衰减）；应用卡在 **L7–L9**（选择性激励与全球尺度）。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="frCmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="frCmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="140" y="16" width="400" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">核心：不可排他收益 + 私人成本</text>

  <rect x="30" y="100" width="190" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="125" y="125" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象</text><text x="125" y="143" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">公共物品 / 集体物品</text>
  <rect x="245" y="100" width="190" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="125" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制</text><text x="340" y="143" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">MPCR&lt;1 · B/N&lt;C</text>
  <rect x="460" y="100" width="190" height="56" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="555" y="125" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作</text><text x="555" y="143" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">可见贡献·惩罚·S 激励</text>

  <line x1="220" y1="128" x2="245" y2="128" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frCmA)"/>
  <line x1="435" y1="128" x2="460" y2="128" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frCmA)"/>

  <rect x="80" y="200" width="220" height="64" rx="8" fill="#fff" stroke="#d5342c"/><text x="190" y="228" text-anchor="middle" fill="#d5342c" font-size="12" font-weight="700" font-family="sans-serif">个体最优：不贡献</text><text x="190" y="248" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">私人 Δ = −1+MPCR &lt; 0</text>
  <rect x="380" y="200" width="220" height="64" rx="8" fill="#fff" stroke="#0f8a4d"/><text x="490" y="228" text-anchor="middle" fill="#0f8a4d" font-size="12" font-weight="700" font-family="sans-serif">集体最优：全贡献</text><text x="490" y="248" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">社会 Δ = −1+MPCR·N &gt; 0</text>

  <path d="M190 264 C190 300 490 300 490 264" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#frCmB)"/>
  <text x="340" y="318" text-anchor="middle" fill="#d5342c" font-size="11" font-family="sans-serif">缺口 = 社会Δ − 私人Δ = MPCR·(N−1) → 随 N 放大</text>
</svg>
:::

默认参数下：私人 Δ = \(−1+0.4=−0.6\)，社会 Δ = \(−1+1.6=+0.6\)，缺口 = **1.2**（每多贡献 1 单位）。【事实】

# 核心参与者

| 角色 | 想要什么 | 面临的激励 | 典型动作 |
|---|---|---|---|
| 潜在贡献者 | 集体成功 + 自己少亏 | MPCR&lt;1 时贡献亏钱 | 观望、匹配他人最低贡献 |
| 搭便车者 | 享受集体收益 | 不贡献私人回报更高 | 隐身、只消费不投入 |
| 特权成员（Olson） | 集体品对他私人价值高 | 即使独自供给也划算 | 小集团「剥削」大集团的反向：大集团搭小集团的便车【分析】 |
| 管理者 / 协会 | 供给达成 + 合法性 | 监测贵、惩罚有政治成本 | 设会费、荣誉、门槛、退出威胁 |
| 条件合作者 | 公平下的互惠 | 他人贡献下降则跟降 | 第一轮约 40–60% 禀赋，随后衰减【待验证】 |
| 外部权威 | 秩序 / 税收 | 信息与执行成本 | 强制税、配额、披露 |

# 核心变量

| 变量 | 符号 | 为何关键 | 可调杠杆 |
|---|---|---|---|
| 人数 | \(N\) | 摊薄份额、降低可察性 | 拆小组、嵌套治理 |
| 边际人均回报 | MPCR \(m\) | \(m<1\) 则贡献劣势 | 提高回报率、缩小有效 \(N\) |
| 集体总收益 | \(B\) | 决定 \(B/N\) | 提高可见价值 |
| 私人成本 | \(C\) | 参与门槛 | 降成本、工具化、模板化 |
| 选择性激励 | \(S\) | 只给参与者的额外奖/惩 | 荣誉、分成、否决权、罚款 |
| 监测成本 | \(c_m\) | 看不见就罚不准 | 过程可见、轻量互评 |
| 贴现 / 重复 | \(\delta\) | 未来阴影支撑合作 | 固定搭档、长周期项目 |
| 异质性 | Gini 等 | 不平等常削弱合作【待验证】 | 规则公平、贡献权重 |

:::note green 一个好用的代理指标
Weimann 等（2019）用 **MPCR 距离** \(d=m-1/N\)：\(d\) 越大，合作的「集体好处」越显著。\(d=0\) 时贡献对谁都无益；\(d\ge 1\) 时社会困境消失（私人也愿贡献）。【分析】
:::

# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="frCfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="frCfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">不可排他</text>
  <rect x="180" y="30" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">私人Δ&lt;0</text>
  <rect x="340" y="30" width="120" height="50" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="400" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">少贡献</text>
  <rect x="500" y="30" width="140" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="570" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">供给不足</text>
  <line x1="140" y1="55" x2="180" y2="55" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frCfA)"/>
  <line x1="300" y1="55" x2="340" y2="55" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frCfA)"/>
  <line x1="460" y1="55" x2="500" y2="55" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frCfA)"/>

  <rect x="180" y="140" width="140" height="50" rx="8" fill="#fff" stroke="#7c848f"/><text x="250" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">信念：他人也少给</text>
  <rect x="360" y="140" width="140" height="50" rx="8" fill="#fff" stroke="#7c848f"/><text x="430" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">条件合作退潮</text>
  <line x1="400" y1="80" x2="250" y2="140" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#frCfB)"/>
  <line x1="320" y1="165" x2="360" y2="165" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#frCfB)"/>
  <line x1="430" y1="190" x2="400" y2="80" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="340" y="250" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红色虚线 = 信念—贡献正反馈（衰减螺旋）</text>
  <text x="340" y="275" text-anchor="middle" fill="#1d4ed8" font-size="12" font-family="sans-serif">蓝色实线 = 结构因果（属性→激励→行为→结果）</text>
</svg>
:::

# 隐藏关系

:::cards g2
### 大集团搭小集团的便车
奥尔森：小的「特权集团」因私人利益大而先组织起来；广大的潜在受益者反而等待——表面是弱者受害，机制上是**集中利益组织更快**。【事实】【分析】

### 「看起来在合作」的假象
第一轮贡献常达禀赋的约一半，容易误判「人天生合作」；无惩罚时多轮后常掉到约 **18%** 量级——稳态才是诊断对象。【待验证】

### 领导力的半衰期
2023 年层级/领导类公共品元分析：多数层级设计对合作的提振**短暂**；能跨轮次托住贡献的，主要是**惩罚权**，而非口号式领导。【待验证】

### 开源的「免费」不是免费
最终用户搭便车在开源里几乎必然；真正伤可持续的是**企业吃肉不回馈维护**，许可与双轨商业化是选择性激励变体。【分析】
:::

# 系统运行机制

标准线性自愿贡献机制（VCM）：

\[
\pi_i = e - c_i + m\sum_{j=1}^{N} c_j
\]

- **私人多贡献 1**：Δπ = \(−1+m\)。若 \(m<1\)，占优策略是 \(c_i=0\)。
- **社会多贡献 1**：Δ社会 = \(−1+mN\)。若 \(mN>1\)，社会最优是全贡献。
- **经典困境区**：\(1/N < m < 1\)。

默认 \(N=4,m=0.4\)：私人 Δ=**−0.6**，社会 Δ=**+0.6**；全合作相对全背叛每人多 **12**（20→32）。【事实】

奥尔森账本（是否参与集体行动）：

\[
\frac{B}{N}+S \;\gtrless\; C
\]

\(B=1000,C=50,N=100,S=0\) → 份额 10 &lt; 50 → **不参与**；临界规模 \(N^*=B/C=20\)；要把 \(N=100\) 撬动，需 \(S\ge 40\)。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="frEvA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="2"/>
  <circle cx="80" cy="110" r="8" fill="#1d4ed8"/><text x="80" y="90" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">t0 启动</text><text x="80" y="140" text-anchor="middle" fill="#7c848f" font-size="10" font-family="sans-serif">高预期贡献</text>
  <circle cx="220" cy="110" r="8" fill="#3b6ef5"/><text x="220" y="90" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">t1 显影</text><text x="220" y="140" text-anchor="middle" fill="#7c848f" font-size="10" font-family="sans-serif">谁在出力可见</text>
  <circle cx="360" cy="110" r="8" fill="#b8730a"/><text x="360" y="90" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">t2 分化</text><text x="360" y="140" text-anchor="middle" fill="#7c848f" font-size="10" font-family="sans-serif">条件合作退潮</text>
  <circle cx="500" cy="110" r="8" fill="#d5342c"/><text x="500" y="90" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">t3 稳态</text><text x="500" y="140" text-anchor="middle" fill="#7c848f" font-size="10" font-family="sans-serif">低贡献/僵局</text>
  <circle cx="620" cy="110" r="8" fill="#0f8a4d"/><text x="620" y="90" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">干预</text><text x="620" y="140" text-anchor="middle" fill="#7c848f" font-size="10" font-family="sans-serif">惩罚/S/拆组</text>
  <line x1="88" y1="110" x2="212" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frEvA)"/>
  <line x1="228" y1="110" x2="352" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frEvA)"/>
  <line x1="368" y1="110" x2="492" y2="110" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frEvA)"/>
  <line x1="508" y1="110" x2="612" y2="110" stroke="#0f8a4d" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#frEvA)"/>
  <text x="340" y="190" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">无惩罚基线：贡献常从约 50% 禀赋滑向约 18%；引入有效惩罚可托至约 65–70% 量级【待验证】</text>
</svg>
:::

# 利益与激励

| 策略 | 私人账 | 集体账 | 何时占优 |
|---|---|---|---|
| 全搭便车 | 稳拿 \(e\) | 公共品≈0 | \(m<1\) 的一次性博弈 |
| 无条件贡献 | 常亏 | 抬总量 | 利他/身份动机，或 \(m\ge1\) |
| 条件合作 | 匹配他人 | 依赖信念 | 重复、可见、公平规范 |
| 惩罚搭便车 | 付惩罚成本 | 抬未来贡献 | 惩罚有效且可协调 |
| 收取 \(S\)（荣誉/分成） | 参与者净激励↑ | 供给↑ | \(B/N+S>C\) |

「剥削」叙事要小心：有时是**少数人在供给、多数人在搭**——奥尔森意义上的特权集团先动。【分析】

# 资源与信息流

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="frFlA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="frFlB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="40" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">个人禀赋 e</text>
  <rect x="270" y="40" width="140" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="68" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">公共账户</text><text x="340" y="88" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">Σc → ×m 返还</text>
  <rect x="500" y="40" width="140" height="60" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="570" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">全体到手</text>
  <line x1="180" y1="70" x2="270" y2="70" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frFlA)"/>
  <line x1="410" y1="70" x2="500" y2="70" stroke="#1d4ed8" stroke-width="2" marker-end="url(#frFlA)"/>
  <text x="340" y="28" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">贡献流（实线）</text>

  <rect x="270" y="160" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="185" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">信息：谁出了多少</text><text x="340" y="205" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">可见 → 可惩罚</text>
  <path d="M110 100 L110 190 L270 190" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#frFlB)"/>
  <path d="M570 100 L570 190 L410 190" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#frFlB)"/>
  <text x="340" y="255" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">虚线：若贡献不可见，返还仍发生，但惩罚与互惠断链 → 抽水失效</text>
</svg>
:::

资金/努力的「抽水」方向：从贡献者口袋 → 公共账户 → **均匀**流回全体（含未贡献者）。信息流决定第二轮还能不能抽回来。【分析】

<!-- nav:杠杆与行动 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」粗排：

| # | 杠杆 | 为什么锋利 | 成本感 |
|---|---|---|---|
| 1 | 提高有效 MPCR / 缩小有效 \(N\) | 直接改私人 Δ | 中：拆组、提高回报 |
| 2 | 贡献可见化 | 激活条件合作与声誉 | 低：看板、提交记录 |
| 3 | 选择性激励 \(S\) | 把奥尔森账掰过阈值 | 中：分成、荣誉、权限 |
| 4 | 低成本惩罚 / 分级制裁 | 实验上最能托住多轮贡献 | 中高：需合法性 |
| 5 | 固定搭档 / 重复互动 | 提高有效贴现 | 低 |
| 6 | 门槛公共品 + 退款规则 | 把困境部分改成协调 | 中 |
| 7 | 边界与成员资格 | 俱乐部化，降低外人搭车 | 中 |
| 8 | 互评 / 同行分配 | DAO、开源积分的变体 | 中：防抱团 |
| 9 | 强制（税/会费） | 大集团底线供给 | 高：政治成本 |
| 10 | 叙事与身份 | 改变效用里的「规范项」 | 低但不稳 |

# 常见认知陷阱

:::details 1. 「人坏才会搭便车」
错。\(m<1\) 时搭便车是占优策略；好人在坏激励下也会看起来像坏人。【事实】
:::

:::details 2. 「人多力量大，所以大团队更合作」
奥尔森指出相反方向：大集团更难自愿供给；力量被摊薄。【事实】
:::

:::details 3. 「第一轮贡献一半说明没问题」
基线实验常见随后滑向约两成禀赋；要用稳态而不是首轮。【待验证】
:::

:::details 4. 「只要有领导就行」
元分析提示：层级/领导提振常短暂；缺惩罚权时未必优于无领导基线。【待验证】
:::

:::details 5. 「公开批评一次就能根治」
过重一次性羞辱会破坏合法性；奥斯特罗姆强调**分级**制裁。【分析】
:::

:::details 6. 「开源允许免费用 = 鼓励搭便车到底」
对最终用户，免费是设计；对企业不回馈维护，伤的是供给端可持续。【分析】
:::

:::details 7. 「惩罚总是好事」
反社会惩罚、报复性惩罚会降低效率；需要规则约束谁可罚、罚多少。【分析】
:::

:::details 8. 「私有化一切就能消灭搭便车」
纯私有把公共品变成俱乐部/市场品，可能失掉非排他目标本身（如基础科研、防疫）。【分析】
:::

:::details 9. 「观测到低贡献 = 搭便车」
也可能是协调失败、能力不足、目标不清；先分清机制再开药。【分析】
:::

:::details 10. 「全球气候 = 放大版村庄灌溉」
尺度一变，监测、退出、嵌套与国家能力全部换挡；直接套八原则会低估国家级搭便车。【分析】
:::

<!-- nav:实践转化 -->
# 从抽象到现实

:::cards g3
### 团队文档 / 共享仓库
收益：人人可用的知识库。成本：写作与整理。不可排他 → 常见「只读不写」。杠杆：轮值 + 可见提交 + 与绩效弱挂钩（\(S\)）。

### 行业协会游说
大行业共同利益极强，但单个企业份额薄 → 小企业搭大企业便车，或全体等待「龙头」出钱。【分析】

### 开源核心维护
用户与外围开发者大量搭便车；公司用开源省研发却不雇维护者。对策：许可证双轨、开放核心、基金会会费。【分析】

### 会议室沉默
发言有私人风险（被盯、被否），收益是集体澄清——典型轻度公共品。杠杆：轮流、书面预提交、限时。

### 小区公共维修
受益面广、出资难收齐。杠杆：业委会强制分摊、公示、与物业费捆绑。

### 国家减排承诺
大气不可排他；单国减排成本私有、收益全球摊。监测与俱乐部（边境调节）是规模化 \(S\)。【分析】
:::

# 从理论到行动

.flow 诊断链：

:::raw
<div class="flow"><span>收益不可排他？</span><i>→</i><span class="hi">算私人Δ</span><i>→</i><span>是否 m&lt;1</span><i>→</i><span>看 N 与可见性</span><i>→</i><span>选杠杆：拆组 / S / 罚 / 强制</span></div>
:::

行动清单（本周可启动）：

1. 把「大家一起做」改写成：**产出是什么、谁付钱、谁看得见**。
2. 若 \(N>8\) 且贡献不可见，优先**拆成 3–5 人小组**并固定搭档。
3. 给贡献者一项只有他们能拿的 \(S\)（权限、署名、分成、否决）。
4. 设**轻量违约后果**（失去轮次权益），避免一上来道德审判。
5. 记录两周贡献率，看是首轮幻觉还是稳态塌陷。

# 技能树

:::details ① 识别公共物品属性（入门）
会判断：这件收益挡不挡得住外人？竞争不竞争？→ 定位搭便车 vs 公地悲剧。
:::

:::details ② 会算 VCM / MPCR（入门）
能手算私人 Δ、社会 Δ，指出是否落在 \(1/N<m<1\)。
:::

:::details ③ 奥尔森账本（中级）
会算 \(B/N+S\gtrless C\)、\(N^*\)，能设计最小 \(S\)。
:::

:::details ④ 实验阅读力（中级）
知道基线衰减与惩罚托底的量级差异；不把首轮当结论。
:::

:::details ⑤ 可见性设计（中级）
看板、提交、互评、审计——让贡献可被低成本观测。
:::

:::details ⑥ 分级制裁与合法性（高级）
警告→限制权益→开除；配套低成本争议解决。
:::

:::details ⑦ 机制选型（高级）
在强制税、俱乐部、门槛公共品、重复博弈之间按尺度选型。
:::

:::details ⑧ 跨尺度迁移（高级）
知道村庄规则哪些能上到平台/国家，哪些必须嵌套与主权工具。
:::

# 游戏化世界

你是「集体行动建筑师」。世界里每个任务点都是一个公共账户：你的技能点花在**提高 m、降低有效 N、增加 S、布置监测**。经验值来自「稳态贡献率」而不是「启动仪式热闹程度」。隐藏 Boss 是**规模幻觉**——把 100 人群聊当成 4 人小队用。

# 任务系统

| 任务 | 目标 | 验收 |
|---|---|---|
| T1 点名结构 | 找一个正在「一起做」的事 | 写出收益是否可排他 |
| T2 算一笔账 | 估计 m 或 B/N 与 C | 私人 Δ 或奥尔森净激励有数 |
| T3 可见性改造 | 24h 内加一项公开进度 | 至少一人贡献可被第三方看到 |
| T4 最小 S | 设计一项只奖贡献者的权利 | 参与者能说清「我多拿了什么」 |
| T5 稳态复查 | 两周后再测贡献 | 对比首周 vs 次周，而非只看启动日 |

# 反事实模拟

:::tabs
@@若把 N=4 扩到 N=20，m 不变
私人 Δ 仍为 −0.6，但每人更难被看见；条件合作更脆。社会 Δ 升到 −1+8=+7——**集体更需要合作，个体更不想当那个冤大头**。缺口从 1.2 扩到 7.6。

@@若只加领导、不加惩罚
短线或许可抬贡献；多轮后常回到无领导基线附近——元分析对「领导神话」不友好。【待验证】

@@若 S 刚好补到阈值
\(N=100,B=1000,C=50\) 时 \(S=40\) 使净激励为 0；\(S=50\) 净激励 +10 → 理性参与。差 10 单位选择性激励，就能从「潜在集团」跨过门槛。【事实】

@@若贡献完全匿名
惩罚与互惠失去瞄准；衰减螺旋更快。匿名适合防报复，不适合托供给——除非另有强制。
:::

## 模型 A · VCM 账本（私人 Δ vs 社会 Δ）

默认 \(e=20,N=4,m=0.4\)：全背叛各 20；全合作各 32；你单独全出则你 8、别人 28。

:::raw
<div class="tool" id="tool_vcm">
  <div class="ctrl">
    <label>人数 N <output id="vc_nO">4</output></label>
    <input type="range" id="vc_n" min="2" max="20" step="1" value="4"/>
    <label>MPCR m <output id="vc_mO">0.40</output></label>
    <input type="range" id="vc_m" min="0.05" max="1.50" step="0.05" value="0.40"/>
    <label>禀赋 e <output id="vc_eO">20</output></label>
    <input type="range" id="vc_e" min="5" max="50" step="1" value="20"/>
    <label>你的贡献 c <output id="vc_cO">0</output></label>
    <input type="range" id="vc_c" min="0" max="50" step="1" value="0"/>
    <label>他人人均贡献 <output id="vc_oO">0</output></label>
    <input type="range" id="vc_o" min="0" max="50" step="1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">你的收益<strong id="vc_pi">20.0</strong></div>
    <div class="ro">私人 Δ<strong id="vc_pri">-0.60</strong></div>
    <div class="ro">社会 Δ<strong id="vc_soc">+0.60</strong></div>
    <div class="ro">缺口<strong id="vc_gap">1.20</strong></div>
    <div id="vc_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="vc_vh">m=0.40&lt;1：占优不贡献；m·N=1.60&gt;1：社会要全贡献 → 经典搭便车缺口</span></div>
  </div>
  <canvas id="vcChart" height="214"></canvas>
</div>
:::

## 模型 B · 奥尔森账本（B/N + S ≷ C）

\(B=1000,C=50,N=100,S=0\) → 净激励 **−40**（不参与）；\(N^*=20\)；\(S\ge40\) 才能在 N=100 时打平。

:::raw
<div class="tool" id="tool_olson">
  <div class="ctrl">
    <label>集体收益 B <output id="ol_bO">1000</output></label>
    <input type="range" id="ol_b" min="100" max="5000" step="50" value="1000"/>
    <label>私人成本 C <output id="ol_cO">50</output></label>
    <input type="range" id="ol_c" min="5" max="200" step="5" value="50"/>
    <label>人数 N <output id="ol_nO">100</output></label>
    <input type="range" id="ol_n" min="2" max="500" step="1" value="100"/>
    <label>选择性激励 S <output id="ol_sO">0</output></label>
    <input type="range" id="ol_s" min="0" max="120" step="1" value="0"/>
  </div>
  <div class="readout">
    <div class="ro">份额 B/N<strong id="ol_share">10.0</strong></div>
    <div class="ro">净激励<strong id="ol_net">-40.0</strong></div>
    <div class="ro">临界 N*<strong id="ol_nstar">20.0</strong></div>
    <div class="ro">参与？<strong id="ol_act">否</strong></div>
    <div id="ol_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ol_vh">B/N+S=10.0 &lt; C=50 → 理性不参与（大集团搭便车）</span></div>
  </div>
  <canvas id="olChart" height="214"></canvas>
</div>
:::

## 模型 C · MPCR 距离与困境区

\(d=m-1/N\)。落在 \(1/N<m<1\) 为经典困境；\(d\) 越大，合作的集体好处越「显眼」。

:::raw
<div class="tool" id="tool_dist">
  <div class="ctrl">
    <label>MPCR m <output id="ds_mO">0.40</output></label>
    <input type="range" id="ds_m" min="0.05" max="1.50" step="0.05" value="0.40"/>
    <label>人数 N <output id="ds_nO">4</output></label>
    <input type="range" id="ds_n" min="2" max="100" step="1" value="4"/>
  </div>
  <div class="readout">
    <div class="ro">1/N<strong id="ds_inv">0.250</strong></div>
    <div class="ro">d=m−1/N<strong id="ds_d">0.150</strong></div>
    <div class="ro">区制<strong id="ds_zone">经典困境</strong></div>
    <div id="ds_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ds_vh">1/N=0.25 &lt; m=0.40 &lt; 1 → 社会要贡献、私人不贡献（d=0.150）</span></div>
  </div>
  <canvas id="dsChart" height="214"></canvas>
</div>
:::

## 模型 D · 多轮衰减 vs 惩罚托底（示意）

示意曲线：无惩罚从约 50% 滑向约 18%；有惩罚从约 55% 升至约 70% 再缓降至约 65%（元分析量级，【待验证】）。

:::raw
<div class="tool" id="tool_decay">
  <div class="ctrl">
    <label>轮次 T <output id="de_tO">10</output></label>
    <input type="range" id="de_t" min="4" max="20" step="1" value="10"/>
    <label>惩罚强度 <output id="de_pO">0</output></label>
    <input type="range" id="de_p" min="0" max="1" step="0.05" value="0"/>
    <label>首轮贡献% <output id="de_sO">50</output></label>
    <input type="range" id="de_s" min="20" max="80" step="1" value="50"/>
  </div>
  <div class="readout">
    <div class="ro">末轮贡献%<strong id="de_end">18.1</strong></div>
    <div class="ro">相对首轮<strong id="de_chg">-31.9pp</strong></div>
    <div class="ro">模式<strong id="de_mode">基线衰减</strong></div>
    <div id="de_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="de_vh">惩罚=0：示意末轮约 18.1%（首轮 50%）→ 典型搭便车螺旋</span></div>
  </div>
  <canvas id="deChart" height="214"></canvas>
</div>
:::

<!-- nav:能力与计划 -->
# 四级能力路线

| 级别 | 能力 | 你能交付什么 |
|---|---|---|
| L1 识别 | 说出是否公共物品 + 是否像搭便车 | 一页诊断 |
| L2 计算 | VCM / 奥尔森账手算与工具一致 | 带数字的改造建议 |
| L3 干预 | 落地可见性 + S + 轻制裁 | 两周稳态贡献改善 |
| L4 制度 | 为不同尺度选型（小组/协会/平台/国家） | 可复制的规则草稿 |

# 30分钟最小实践

1. 选一件「本该大家做」的事（共享文档、值班、开源小模块）。
2. 填三格：收益挡得住外人吗？我出力的私人成本？别人能否看见？
3. 用下面「VCM 账本」或「奥尔森账本」滑块估一笔（或纸算：私人 Δ=−1+m）。
4. 只改一件事：要么**公开进度**，要么加一项**只给贡献者的 S**。
5. 写下今日基线：过去 7 天谁贡献了什么（可很粗）。7 天后再看一眼。

成本≈0；产出=一页带数字的诊断 + 一个可见性或 S 改动。

# 7天计划

| 天 | 动作 |
|---|---|
| D1 | 完成 30 分钟实践，锁定对象 |
| D2 | 估算 N、m 或 B、C，跑通两个滑块 |
| D3 | 上线最小可见性（看板一列即可） |
| D4 | 设计并宣布一项 S |
| D5 | 与 1–2 名成员对齐「什么叫贡献」 |
| D6 | 记录本周贡献清单 |
| D7 | 复盘：首日预期 vs 实际；是否开始衰减 |

# 30天计划

| 周 | 焦点 | 验收 |
|---|---|---|
| W1 | 诊断 + 可见性 | 贡献可被第三方点名 |
| W2 | S 激励上线 | 参与者能复述激励 |
| W3 | 轻制裁/权益规则 | 有一次「未贡献→失去某权益」的演练（可模拟） |
| W4 | 稳态对比 | 贡献率/次数相对 W1 的变化写进一页报告 |

# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 线性 VCM | \(\pi=e-c+m\sum c\)；\(m<1\) 占优不贡献 |
| 2 | 社会 vs 私人 Δ | 缺口 \(=m(N-1)\)，随 N 放大 |
| 3 | 奥尔森阈值 | \(B/N+S\gtrless C\)；\(N^*=B/C\) |
| 4 | 特权 vs 潜在集团 | 小集团易组织，大集团易搭车 |
| 5 | MPCR 距离 \(d=m-1/N\) | 显著度代理；\(d\) 大则更易感到合作有用 |
| 6 | 条件合作 | 匹配他人；无支撑则衰减 |
| 7 | 惩罚托底 | 实验中少有机制能像有效惩罚那样跨轮托住贡献 |
| 8 | 选择性激励 | 把公共品局部改成俱乐部品 |
| 9 | 门槛公共品 | 达到阈值才生产；协调+搭便车双结构 |
| 10 | 嵌套/多中心 | 大问题拆成可监测的小公共品层 |

# 关键问题清单

:::details Q1 我们这事到底是不是公共物品？
收益能否排除不付费者？若能轻易排除，更像俱乐部/市场，不是经典搭便车。
:::

:::details Q2 私人 Δ 是不是已经 ≥0？
若 \(m\ge1\)，问题可能是协调或信息，不是搭便车。
:::

:::details Q3 N 是否大到份额无感？
算 \(B/N\) 与 \(N^*\)；大于临界就准备 S 或强制。
:::

:::details Q4 贡献看得见吗？
看不见则惩罚与互惠失灵。
:::

:::details Q5 我们在看首轮还是稳态？
用第 2–4 周数据，不要用启动仪式。
:::

:::details Q6 有没有合法的轻制裁？
无后果的「望天收」很难对抗占优策略。
:::

:::details Q7 S 是否真的选择性？
人人有份的「集体奖金」仍是公共品，扳不动奥尔森账。
:::

:::details Q8 是否误用领导替代制度？
领导发言 ≠ 惩罚权与规则。
:::

:::details Q9 异质性是否在腐蚀合作？
资源差过大时，富者少出、贫者无力，需单独设计权重。【待验证】
:::

:::details Q10 尺度是否需要嵌套？
百人群聊解决不了的，拆小组 + 上层接口。
:::

# 下一阶段探索

- 与《公地悲剧与集体行动逻辑》对照：取用过度 vs 供给不足。
- 深入：重复博弈与阴影效应、机制设计、奥斯特罗姆八原则在数字社群的迁移。
- 实验：自办迷你 VCM（巧克力/点数版）看首轮与第四轮差异。
- 争议前沿：不平等如何削弱公共品贡献；层级设计的边界。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 奥尔森集体行动逻辑、规模与选择性激励 | 经典著作 | Olson, *The Logic of Collective Action* (1965) | 【事实】 |
| 免费搭车问题概念梳理 | 哲学/综述 | Stanford Encyclopedia of Philosophy, Free Rider Problem | 【分析】 |
| 线性公共品与 MPCR 框架 | 实验经济学惯例 | VCM 标准设定；手册内默认 e=20,N=4,m=0.4 为演算 | 【事实】 |
| 大群体公共品与 Olson 假说再检验 | 实验论文 | Weimann et al., *Public good provision by large groups* (2019), EER | 【待验证】 |
| 集体行动五十年评论（规模命题边界） | 综述 | Sandler, *Collective action: fifty years later*, Public Choice | 【分析】 |
| 层级/领导对 PGG 合作的元分析 | 元分析 | *Journal of Behavioral and Experimental Economics* (2023)：惩罚可托住，领导效应多短暂；基线约 50%→18%，惩罚条件可至约 70% 量级 | 【待验证】 |
| 禀赋不平等与贡献 | 元数据集研究 | 异质性公共品实验元数据（2024 前后工作论文/发表） | 【待验证】 |
| 奥斯特罗姆治理原则 | 经典 | Ostrom, *Governing the Commons* (1990)；Wilson/Ostrom/Cox 原则推广 | 【事实】 |
| 开源与团队搭便车案例 | 产业观察 | 开源可持续性讨论、DAO 互评机制评论等 | 【分析】 |

标记约定：【事实】多方一致或可复核演算；【分析】权威框架下的推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或实验外推需谨慎。

# 免责声明 {.appendix}

本手册是认知与决策训练材料，**不是**管理咨询结论、法律意见或投资建议。文中实验百分比来自文献量级摘要，换被试、换参数会变；组织现场决策请结合本地约束与专业意见。互动模型为教学简化（线性 VCM / 奥尔森阈值），现实还有声誉、身份、法律与技术摩擦。
