---
slug: 零和 vs 非零和：零和下合作无空间，非零和下存在正和交易，判断博弈类型是第一步
title: 零和 vs 非零和：先判类型，再谈合作
subtitle: 二人零和下「帮对方」=「伤害自己」；非零和下存在<strong>正和交易</strong>——把可变的饼当成固定的饼，是最贵的建模错误。
brand_sub: Zero-Sum × Variable-Sum × First Discriminant
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 零和, 非零和, 正和交易, 常数和, 谈判, 零和思维]
theme_js_file: 零和 vs 非零和：零和下合作无空间，非零和下存在正和交易，判断博弈类型是第一步.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**零和（zero-sum）**：每个结果上各方支付之和恒为 0（或恒为常数 \(C\)，称常数和；策略上与零和等价）。一人多得，另一人必少得——**合作没有增量空间**，理性目标等价于「最小化对方」。【事实】

**非零和 / 可变和（non-zero-sum / variable-sum）**：不同结果上的联合支付可变。其中**正和结果**（联合支付上升）使「对你有利的安排」可以同时对对方有利——**正和交易**存在；囚徒困境、贸易、整合谈判都属于这一族。【事实】

因此：判断博弈类型是第一步。类型错了，后面的「该不该合作、怎么谈判、如何竞争」全会偏航。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是口号「双赢 / 你死我活」，而是**支付结构的可加性**：联合支付是否随策略组合变化，以及这种变化如何决定「合作有没有数学空间」。

边界：

- **在界内**：二人零和与常数和、极小极大定理、可变和分类（正和/负和）、贸易剩余、整合式 vs 分配式谈判、零和思维（BZSG）作为认知偏差、与 PD/协调/鸡博弈的嵌套关系。
- **在界外**：具体牌局绝招、某只股票买卖点、某次外交密谈话术——除非压成「联合支付是否可变 / 误判代价多大」。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 何时合作无空间、何时存在正和交易，以及如何先判别 |
| 2 | 边界在哪 | 到「支付矩阵 + 联合支付函数」可形式化为止 |
| 3 | 核心对象 | 联合支付 \(S(s)=u_1+u_2\)、常数和、可变和、剩余、均衡概念切换 |
| 4 | 参与者 | 双方玩家、谈判者、规则设计者、旁观市场 |
| 5 | 关键变量 | \(S\) 的方差/极差、交易估值差 \(V-C\)、议题偏好互补度、误判率 |
| 6 | 可直接观察 | 价格、份额、比分、合同条款、公开支付 |
| 7 | 无法直接观察 | 对方真实估值、是否把互动当零和、隐藏议题 |
| 8 | 谁影响谁 | 支付结构 → 解概念（极小极大 vs 纳什）→ 行为空间 |
| 9 | 因果关系 | \(S\) 恒定 ⇒ 无帕累托改进空间；\(S\) 可变 ⇒ 可搜正和结果 |
| 10 | 只是相关 | 「竞争激烈」≠ 零和；市场份额战可近似常数和，但品类扩张不是 |
| 11 | 表层现象 | 价格战、配额争夺、贸易双赢、议题交换、零和话术 |
| 12 | 底层机制 | 资源是否创造/销毁；偏好是否互补；合同是否可扩大饼 |
| 13 | 有反馈吗 | 有。零和心态压缩信息交换 → 更难发现正和 |
| 14 | 有延迟吗 | 有。信任与互补偏好发现常滞后于首轮对抗 |
| 15 | 正/负反馈 | 误判零和 → 隐瞒信息 → 证实「果然是对抗」为正反馈 |

## 最关键的一句话

> 零和下合作无空间，不是道德失败，是**联合支付不可变**；非零和下存在正和交易，第一步是**先算 \(S\) 会不会变**。

# 为什么值得研究

:::cards g3
### 它是策略工具箱的「类型开关」
零和用极小极大；可变和用纳什、帕累托、谈判理论。开关打错，解法整套错位。【事实】

### 它解释「好心办坏事」与「冷酷却共赢」
零和里帮对方=害自己；正和里自利可兼容他利——道德直觉必须服从结构。【分析】

### 它连接数学与日常误判
体育、选举局部像零和；贸易、知识、多数谈判常是可变和。把后者当前者，系统性毁剩余。【分析】
:::

:::note amber 最贵的一次误判
把「估值 \(V>C\) 的潜在交易」当成零和砍价：信息全藏、极端开价、拒绝议题交换——联合剩余 \(V-C\) 整块蒸发。哈佛谈判项目强调：多数谈判并非纯分配，整合空间常被零和迷思堵死。【分析】
:::

# 世界地图

九层看「和」如何从一条定义长成谈判与心态。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="zsL9" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 改规则创造正和（托管、补贴、侧支付）</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 零和思维 BZSG · 跨文化信念如何压缩合作</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 整合谈判 · 议题交换把饼做大</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 经典可变和 · PD / 协调 / 鸡博弈嵌套</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 纳什存在性 · 可变和的解概念切换</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 贸易与剩余 · V−C&gt;0 即正和交易空间</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 极小极大定理 · 二人零和的「值」</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 常数和 ≡ 零和（仿射变换）</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 定义 · 联合支付 S 是否恒定</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1→L2**：会算 \(S\)、会把「份额合计 100%」还原成零和；进阶卡在 **L4→L7**（发现剩余）与 **L8**（别让心态把结构锁死）。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="160" y="16" width="360" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">联合支付 S(s)=u₁(s)+u₂(s)</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象：恒定 vs 可变</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制：极小极大 / 纳什</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作：搜正和 / 防误判</text>

  <line x1="280" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="190" width="180" height="64" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：所有结果 S 相同？</text><text x="130" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">是 → 零和/常数和</text>
  <rect x="250" y="190" width="180" height="64" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：是否存在 S 更大？</text><text x="340" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">是 → 正和空间</text>
  <rect x="460" y="190" width="180" height="64" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：我是否在当零和打？</text><text x="550" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">查信息是否被藏起</text>

  <line x1="130" y1="152" x2="130" y2="190" stroke="#0f8a4d" stroke-width="1.2" marker-end="url(#cmA)"/>
  <line x1="340" y1="152" x2="340" y2="190" stroke="#1d4ed8" stroke-width="1.2" marker-end="url(#cmA)"/>
  <line x1="550" y1="152" x2="550" y2="190" stroke="#b8730a" stroke-width="1.2" marker-end="url(#cmA)"/>

  <path d="M220,222 Q340,280 460,222" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="300" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：误判零和 → 藏信息 → 更难发现正和</text>
</svg>
:::

# 核心参与者

| 角色 | 激励 | 在「和」结构里做什么 |
|---|---|---|
| 玩家 A / B | 最大化自身 \(u_i\) | 在零和中对立；在正和中可协调 |
| 谈判者 | 扩大己方份额 +（可选）扩大饼 | 分配式砍价 vs 整合式交换 |
| 规则设计者 | 诱导合意结果 | 引入侧支付、托管、补贴改变 \(S\) |
| 市场 / 旁观者 | 价格发现 | 把双边剩余外化为可观测交易 |
| 心态持有者 | 认知节约 | BZSG 高者更倾向把一切当对抗 |

# 核心变量

| 变量 | 符号 | 作用 |
|---|---|---|
| 联合支付 | \(S(s)\) | 类型判别的核心；恒定⇔零和/常数和 |
| 常数 | \(C\) | 常数和水平；减 \(C/2\) 可化零和 |
| 买方估值 / 卖方成本 | \(V,C\) | 贸易剩余 \(V-C\)；\(>0\) 即正和空间 |
| 成交价 | \(P\) | 分配剩余：买方 \(V-P\)，卖方 \(P-C\) |
| 议题估值矩阵 | \(v_{i,j}\) | 互补偏好驱动整合增益 |
| 误判率 | \(p_{\mathrm{mis}}\) | 把正和当零和的概率；期望损失 \(p\cdot S\) |

:::note green 判定口诀
**先算每个结果的 \(S\)**：全相同 → 零和/常数和（合作无增量）；有高有低 → 可变和，去找 \(\max S\) 那一格是不是可达。【事实】
:::

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<div class="flow"><span>支付矩阵</span><i>→</i><span class="hi">算联合 S</span><i>→</i><span class="hi">恒定？</span><i>→</i><span>是：极小极大 / 否：搜正和</span><i>→</i><span>策略与话术</span></div>
:::

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="80" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">列出 u₁,u₂</text>
  <rect x="180" y="30" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="240" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">计算各格 S</text>
  <rect x="340" y="30" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="400" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">恒定？</text>
  <rect x="500" y="20" width="160" height="70" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="580" y="48" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">是→零和·无增量</text><text x="580" y="68" text-anchor="middle" fill="#15181d" font-size="11" font-weight="600" font-family="sans-serif">否→可变和·可正和</text>
  <line x1="140" y1="55" x2="180" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="300" y1="55" x2="340" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="460" y1="55" x2="500" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <rect x="180" y="130" width="280" height="50" rx="8" fill="#15181d"/><text x="320" y="160" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">误判反馈：当零和打 → 藏信息 → 正和不可达</text>
  <path d="M580,90 Q580,120 460,140" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cfB)"/>
  <text x="500" y="125" fill="#d5342c" font-size="11" font-family="sans-serif">心态回路</text>
</svg>
:::

# 隐藏关系

- **常数和 ≡ 零和**：\(u_1+u_2=C\) 时，令 \(u_1'=u_1-C/2\) 即得零和；策略最优反应不变。【事实】
- **可变和里仍可有局部对抗**：PD 中 \((D,C)\) 对背叛者更好，但社会总支付可低于 \((C,C)\)——「非零和 ≠ 自动和谐」。【事实】
- **n 人非零和可嵌入 n+1 人零和**：冯·诺依曼–摩根斯特恩引入「虚拟玩家」吸收总盈亏——技术上有用，日常诊断仍应直接看真实 \(S\)。【事实】【分析】
- **股票市场常被误标零和**：二级市场交易在忽略创造价值与时间时像转移，但上市公司现金流增长使整体可正和——「股市=赌场」是典型零和谬误。【分析】
- **跨域同构**：零和 ↔ 份额争夺 ↔ 选举座位；正和 ↔ 贸易 ↔ 知识复制 ↔ 议题互补谈判。【推论】

# 系统运行机制

**零和运行**：

1. 写出矩阵；验证每格 \(u_1=-u_2\)（或 \(S=C\)）  
2. 求极小极大值 \(v\)；均衡策略使期望支付为 \(v\)  
3. 「合作」不能抬高双方期望之和——只能重新分配谁更接近 \(v\)

**可变和运行**：

1. 写出各结果 \(S\)；标出 \(\max S\) 与 \(\min S\)  
2. 问：\(\max S\) 对应的结果是否是纳什？若否，缺口来自激励还是协调  
3. 若存在 \(V>C\) 类剩余，谈判/交易是把剩余从 0 抬到 \(V-C\) 的过程

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <text x="340" y="24" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">资金/价值流：正和交易如何「抽水造饼」</text>
  <rect x="40" y="50" width="140" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">卖方成本 C</text><text x="110" y="95" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">机会成本</text>
  <rect x="250" y="50" width="180" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">成交 · 剩余 V−C</text><text x="340" y="95" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">按 P 分配</text>
  <rect x="500" y="50" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="570" y="75" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">买方估值 V</text><text x="570" y="95" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">愿付上限</text>
  <line x1="180" y1="80" x2="250" y2="80" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="430" y1="80" x2="500" y2="80" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <text x="340" y="150" text-anchor="middle" fill="#0f8a4d" font-size="12" font-family="sans-serif">默认例：V=100, C=40, P=70 → 买方+30 · 卖方+30 · 联合+60</text>
  <text x="340" y="175" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">若当零和拒谈：联合剩余归零（损失 60）</text>
</svg>
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 160" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="80" x2="640" y2="80" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="80" cy="80" r="10" fill="#0f8a4d"/><text x="80" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1928</text><text x="80" y="115" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">von Neumann</text><text x="80" y="130" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">极小极大</text>
  <circle cx="220" cy="80" r="10" fill="#1d4ed8"/><text x="220" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1944</text><text x="220" y="115" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">TGEB</text><text x="220" y="130" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">合作扩展</text>
  <circle cx="360" cy="80" r="10" fill="#b8730a"/><text x="360" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1950</text><text x="360" y="115" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Nash</text><text x="360" y="130" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">可变和均衡</text>
  <circle cx="500" cy="80" r="10" fill="#3b6ef5"/><text x="500" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1980s</text><text x="500" y="115" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">Axelrod</text><text x="500" y="130" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">IPD 合作</text>
  <circle cx="620" cy="80" r="10" fill="#d5342c"/><text x="620" y="50" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">2015+</text><text x="620" y="115" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">BZSG</text><text x="620" y="130" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">心态测量</text>
</svg>
:::

1928 极小极大锁住二人零和；1944《博弈论与经济行为》把故事推向 n 人与合作；1950 纳什为可变和提供非合作解；1980 年代 Axelrod 展示非零和重复互动中合作可演化；2015 起 BZSG 量表把「把人生当零和」测成可跨文化比较的信念。【事实】【分析】

# 利益与激励

| 结构 | 个体激励 | 集体含义 |
|---|---|---|
| 严格零和 | 提高己方=压低对方 | 无帕累托改进；旁观者福利也不变（转移） |
| 正和可达 | 可同时抬高双方（若激励相容） | 剩余可创造；关键是可达性与分配 |
| 负和陷阱 | 冲突升级双方都亏 | 战争、恶性价格战、报复螺旋 |
| 可变和+占优背叛 | 个体仍可能选毁饼策略 | 典型 PD：非零和但均衡次优 |

激励设计的杠杆：不是劝人「别零和」，而是**改变 \(S\) 的形状**或**改变可达 \(\max S\) 的激励**。【分析】

# 资源与信息流

:::raw
<svg viewBox="0 0 680 210" width="100%" style="max-width:680px">
  <defs>
    <marker id="rsA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="rsB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="30" width="160" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">私有估值 V,C</text><text x="110" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">信息源</text>
  <rect x="260" y="30" width="160" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">披露 / 报价</text><text x="340" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">信息通道</text>
  <rect x="490" y="30" width="160" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="570" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">成交剩余</text><text x="570" y="80" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">资源创造</text>
  <line x1="190" y1="65" x2="260" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#rsA)"/>
  <line x1="420" y1="65" x2="490" y2="65" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#rsA)"/>
  <rect x="160" y="130" width="360" height="50" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="340" y="160" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">零和心态切断披露 → 通道堵塞 → 剩余无法显化</text>
  <path d="M340,100 Q340,120 340,130" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#rsB)"/>
</svg>
:::

资源流：在正和交易里，价值从「未实现偏好」变成「已实现剩余」；信息流是催化剂。零和竞争里，信息多用于欺骗与隐瞒，因披露常削弱己方份额。【分析】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 |
|---|---|---|
| 1 | **先算联合支付表** | 30 秒可排除整类错误策略 |
| 2 | **区分「份额战」与「品类战」** | 份额近似常数和；品类扩张可变和 |
| 3 | **写出 V 与 C（或等价估值）** | 直接暴露正和空间是否存在 |
| 4 | **议题拆分与交换** | 偏好互补时整合增益立现（例：10+10 vs 12） |
| 5 | **BATNA 准备** | 谈不成时的最佳替代，防止被迫接受负和 |
| 6 | **侧支付 / 托管** | 把激励不相容变成可转移效用 |
| 7 | **重复与声誉** | 可变和中把一次性背叛变贵 |
| 8 | **降低 BZSG 话术** | 改变团队默认叙事，恢复信息披露 |
| 9 | **改规则而非改性格** | 机制设计直接重塑 \(S\) |
| 10 | **明确何时该零和打** | 决赛、配额、固定预算——该硬就硬 |

# 常见认知陷阱

:::details 1. 「竞争激烈 = 零和」
假。两家外卖可同时因品类增长而增收；激烈≠联合支付恒定。【分析】
:::

:::details 2. 「非零和 = 双赢自动发生」
假。PD 是非零和，均衡仍可双输相对合作。【事实】
:::

:::details 3. 「谈判一定是分固定饼」
分配式谈判假设饼固定；整合式谈判先造饼。多数真实谈判是混合物。【分析】
:::

:::details 4. 「股市是零和」
忽略企业创造现金流与长期增长时的典型谬误。【分析】
:::

:::details 5. 「帮对方就是软弱」
仅在零和成立；正和里帮助对方扩大饼可提高己方绝对收益。【推论】
:::

:::details 6. 「常数和不是零和，所以有合作空间」
策略上等价；\(C\) 只是标度，不创造帕累托改进。【事实】
:::

:::details 7. 「道德劝说能把零和变正和」
不能。要变 \(S\)，得改技术、合同或偏好定义，不是改口号。【分析】
:::

:::details 8. 「我感到被占便宜 ⇒ 一定是零和」
嫉妒与相对效用会把正和交互体验成零和（Axelrod：「不要嫉妒」）。【分析】
:::

:::details 9. 「国际政治全是零和」
安全困境局部像；贸易与气候减缓常有正和/负和混合层。【分析】【待验证】
:::

:::details 10. 「先合作再判断类型」
顺序反了。类型未明时的无条件合作，在真零和里是单向输血。【推论】
:::

<!-- nav:实践路径 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="abA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="40" width="180" height="100" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="75" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">抽象</text><text x="110" y="100" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">S 恒定？</text><text x="110" y="120" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">max S 可达？</text>
  <rect x="250" y="40" width="180" height="100" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="75" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">机制</text><text x="340" y="100" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">极小极大 / 纳什</text><text x="340" y="120" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">整合交换</text>
  <rect x="480" y="40" width="180" height="100" rx="10" fill="#fff7e6" stroke="#b8730a"/><text x="570" y="75" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">操作</text><text x="570" y="100" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">列矩阵·估 V,C</text><text x="570" y="120" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">拆议题·备 BATNA</text>
  <line x1="200" y1="90" x2="250" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#abA)"/>
  <line x1="430" y1="90" x2="480" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#abA)"/>
</svg>
:::

| 现实场景 | 更像哪种 | 操作含义 |
|---|---|---|
| 足球决赛晋级 | 零和（名额） | 不谈「双赢晋级」 |
| 跨境苹果换香蕉 | 正和贸易 | 先确认比较优势 |
| 部门抢同一预算包 | 近似常数和 | 先争总量扩张再分配 |
| 薪资+远程+职级套餐 | 可变和谈判 | 用低成本高价值项交换 |
| 价格战打到亏损 | 负和 | 停损或行业协调（注意反垄断） |

# 从理论到行动

1. **列结果**：至少 4 个可能结局，估双方支付（粗估即可）。  
2. **算 \(S\)**：看是否恒定；若不恒定，标出最大 \(S\)。  
3. **判激励**：最大 \(S\) 是否个人理性可达；若否，找侧支付/重复/改规则。  
4. **选话术**：真零和 → 清晰对抗、保密；真正和 → 披露互补偏好、交换议题。  
5. **写 BATNA**：防止在负和里硬耗。

# 技能树

:::details ① 辨识（L1）
能对 2×2 矩阵手算四格 \(S\)，口答「零和 / 常数和 / 可变和」。
:::

:::details ② 变换（L2）
能把市场份额（合计 100）改写成零和支付并解释为何策略等价。
:::

:::details ③ 剩余（L3）
给定 \(V,C,P\)，能算买方/卖方/联合剩余并判断交易是否可行。
:::

:::details ④ 嵌套（L4）
能指出 PD 为何是非零和却仍可能均衡次优。
:::

:::details ⑤ 整合（L5）
能设计两个议题的交换方案，算出相对「各切一半」的增益。
:::

:::details ⑥ 心态（L6）
能识别团队 BZSG 话术，并改写成「先查 \(S\)」流程。
:::

:::details ⑦ 设计（L7）
能提出一条改 \(S\) 的规则（托管、保证金、补贴）并预测均衡移动。
:::

# 游戏化世界

你进入「类型峡谷」：每扇门后是一场互动。门楣不写答案，只给你支付表。选错类型，技能卡（合作/欺骗/交换）会灰掉。Boss 是「零和幻影」——它把所有门刷成红黑对决皮肤，你必须用 \(S\) 验算破隐身。

# 任务系统

| 任务 | 难度 | 完成标准 |
|---|---|---|
| 手算猜硬币矩阵 \(S\) | ★ | 四格皆 0 |
| 手算经典 PD 的 \(S\) | ★★ | 得到 6,5,5,2 |
| 编一笔 \(V>C\) 交易 | ★★ | 写出剩余分配 |
| 找一则「零和话术」新闻 | ★★★ | 给出替代可变和模型 |
| 双议题整合练习 | ★★★ | 增益 \(\ge 20\%\) 相对均分 |

# 反事实模拟

:::tabs
@@若把贸易当零和
双方隐瞒估值、极端开价。\(V=100,C=40\) 的潜在剩余 60 可能整块消失；期望损失 \(\approx p_{\mathrm{mis}}\times 60\)。

@@若把决赛当正和
劝两队「一起晋级」——规则不允许。浪费沟通预算，该用的竞争资源被稀释。

@@若只改心态不改矩阵
团队喊双赢，但预算包固定且无扩张项——常数和仍在，冲突改头换面回来。

@@若引入侧支付
PD 中若背叛者需向合作者支付足够转移，可把 \((C,C)\) 变成激励相容——结构从「可变和但坏均衡」被推近「正和可达」。
:::

:::raw
<div class="tool" id="tool-sum">
  <h3>模型 1 · 联合支付类型判定</h3>
  <p class="hint">输入 2×2 四个结果的联合支付 S。看是否常数和，以及正和空间（max−min）。默认对照：猜硬币全 0；也可改成 PD 的 6/5/5/2。</p>
  <div class="ctrl">
    <label>S₁₁（行1列1）<input type="range" id="sm_s11" min="-20" max="40" step="0.5" value="0"><output id="sm_s11O">0</output></label>
    <label>S₁₂<input type="range" id="sm_s12" min="-20" max="40" step="0.5" value="0"><output id="sm_s12O">0</output></label>
    <label>S₂₁<input type="range" id="sm_s21" min="-20" max="40" step="0.5" value="0"><output id="sm_s21O">0</output></label>
    <label>S₂₂<input type="range" id="sm_s22" min="-20" max="40" step="0.5" value="0"><output id="sm_s22O">0</output></label>
  </div>
  <div class="readout">
    <div class="ro">类型 <b id="sm_kind">零和（常数=0）</b></div>
    <div class="ro">max S <b id="sm_max">0</b></div>
    <div class="ro">min S <b id="sm_min">0</b></div>
    <div class="ro">正和空间 <b id="sm_span">0</b></div>
    <div id="sm_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">拖动滑块观察类型切换</div>
  </div>
  <canvas id="smChart" height="214"></canvas>
</div>
:::

:::raw
<div class="tool" id="tool-trade">
  <h3>模型 2 · 正和交易剩余（V−C）</h3>
  <p class="hint">买方估值 V、卖方成本 C、成交价 P。联合剩余 = V−C；买方 V−P，卖方 P−C。默认 V=100, C=40, P=70 → 各 +30，联合 +60。</p>
  <div class="ctrl">
    <label>买方估值 V<input type="range" id="tr_v" min="20" max="200" step="1" value="100"><output id="tr_vO">100</output></label>
    <label>卖方成本 C<input type="range" id="tr_c" min="0" max="180" step="1" value="40"><output id="tr_cO">40</output></label>
    <label>成交价 P<input type="range" id="tr_p" min="0" max="200" step="1" value="70"><output id="tr_pO">70</output></label>
  </div>
  <div class="readout">
    <div class="ro">联合剩余 <b id="tr_joint">60</b></div>
    <div class="ro">买方 <b id="tr_buy">30</b></div>
    <div class="ro">卖方 <b id="tr_sell">30</b></div>
    <div class="ro">可行？ <b id="tr_ok">是</b></div>
    <div id="tr_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">正和交易成立：双方剩余皆 ≥ 0</div>
  </div>
  <canvas id="trChart" height="214"></canvas>
</div>
:::

:::raw
<div class="tool" id="tool-mis">
  <h3>模型 3 · 零和误判的期望损失</h3>
  <p class="hint">若把一笔潜在正和交易当成零和而拒谈，损失整块剩余。期望损失 = p_mis × 剩余。默认 p=35%, S=60 → 期望损失 21。</p>
  <div class="ctrl">
    <label>误判为零和的概率 p<input type="range" id="ms_p" min="0" max="100" step="1" value="35"><output id="ms_pO">35%</output></label>
    <label>潜在联合剩余 S<input type="range" id="ms_s" min="0" max="200" step="1" value="60"><output id="ms_sO">60</output></label>
  </div>
  <div class="readout">
    <div class="ro">期望损失 <b id="ms_loss">21</b></div>
    <div class="ro">达成时剩余 <b id="ms_keep">39</b></div>
    <div id="ms_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">每 100 次同类机会，约 35 次整块蒸发</div>
  </div>
  <canvas id="msChart" height="214"></canvas>
</div>
:::

:::raw
<div class="tool" id="tool-integ">
  <h3>模型 4 · 整合谈判 vs 各议题均分</h3>
  <p class="hint">两人两项议题的估值。整合：每项给估值更高者；均分基准：每项按双方估值之和的一半计。默认 (10,2)×(2,10) → 整合 20 vs 均分 12，增益 +8。</p>
  <div class="ctrl">
    <label>甲对 A<input type="range" id="ig_a1" min="0" max="20" step="0.5" value="10"><output id="ig_a1O">10</output></label>
    <label>甲对 B<input type="range" id="ig_b1" min="0" max="20" step="0.5" value="2"><output id="ig_b1O">2</output></label>
    <label>乙对 A<input type="range" id="ig_a2" min="0" max="20" step="0.5" value="2"><output id="ig_a2O">2</output></label>
    <label>乙对 B<input type="range" id="ig_b2" min="0" max="20" step="0.5" value="10"><output id="ig_b2O">10</output></label>
  </div>
  <div class="readout">
    <div class="ro">整合总价值 <b id="ig_int">20</b></div>
    <div class="ro">均分基准 <b id="ig_dist">12</b></div>
    <div class="ro">增益 <b id="ig_gain">+8</b></div>
    <div class="ro">分配 <b id="ig_who">A→甲 · B→乙</b></div>
    <div id="ig_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">偏好互补越强，零和式「逐项硬切」越亏</div>
  </div>
  <canvas id="igChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 辨识 | 会算 \(S\)、分类型 | 3 个矩阵 5 分钟内判对 |
| L2 应用 | 贸易剩余与误判代价 | 手算与模型 2/3 一致 |
| L3 整合 | 议题交换设计 | 增益可解释 |
| L4 设计 | 改规则创造正和 | 写出一条可执行机制 |

# 30分钟最小实践

1. 选一件本周真实互动（谈薪、分工、采购），列出 ≥3 个可能结局（8 分钟）。  
2. 粗估各方支付，算 \(S\)，写下类型判定一句话（7 分钟）。  
3. 若可变和：估一个 \(V,C\) 或两个议题估值，用手算模型 2 或 4（10 分钟）。  
4. 对照：若我默认当零和打，会丢掉哪块剩余？（5 分钟）  

产出：一张手写支付草表 + 一句类型判定——成本接近 0。

# 7天计划

| 天 | 焦点 | 交付 |
|---|---|---|
| D1 | 定义与 \(S\) | 3 个手算矩阵 |
| D2 | 常数和变换 | 份额→零和一例 |
| D3 | 贸易剩余 | 2 笔 V,C,P |
| D4 | PD 嵌套 | 说明「非零和仍可坏」 |
| D5 | 整合谈判 | 双议题增益表 |
| D6 | 误判代价 | 估 p_mis |
| D7 | 复盘 | 技能树自测 |

# 30天计划

| 周 | 主题 | 成果 |
|---|---|---|
| W1 | 类型判别熟练 | 15 个场景速判卡 |
| W2 | 剩余与谈判 | 3 次真实小谈判复盘 |
| W3 | 可变和族谱 | PD/协调/鸡博弈对照 |
| W4 | 心态与机制 | 团队话术审计 + 一条改规则提案 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 零和定义 | 每结果 \(u_1+u_2=0\) |
| 2 | 常数和等价 | \(S=C\) ≡ 零和（仿射） |
| 3 | 极小极大 | 二人零和有值 \(v\) |
| 4 | 可变和 | \(S\) 随结果变 |
| 5 | 正和交易 | \(V>C\) ⇒ 剩余可创造 |
| 6 | 分配 vs 整合 | 切饼 vs 做饼 |
| 7 | PD 嵌套 | 非零和仍可均衡次优 |
| 8 | 误判期望损失 | \(p_{\mathrm{mis}}\times S\) |
| 9 | BZSG | 把社会关系当零和的信念 |
| 10 | 侧支付改 \(S\) | 转移效用扩大可达集 |

# 关键问题清单

:::details Q1 我面对的是不是零和？
列出主要结果的联合支付；全相同才是（或常数和）。
:::

:::details Q2 常数和有没有合作空间？
策略上没有帕累托增量；只能谈分配与外部把饼做大。
:::

:::details Q3 非零和是否该无条件合作？
先看最大 \(S\) 是否激励相容；PD 提醒：结构允许双赢不等于均衡双赢。
:::

:::details Q4 如何发现正和？
问「有没有一方廉价、另一方高价的议题？」→ 交换。
:::

:::details Q5 信息该不该披露？
真零和：谨慎；真正和且需匹配偏好：有策略地披露互补项。
:::

:::details Q6 BATNA 怎么用？
谈不成时的最佳替代定底线，避免在负和里硬耗。
:::

:::details Q7 团队总说「抢资源」怎么办？
先验证预算包是否真固定；若固定，把扩张项（增收、提效）单列成新议题。
:::

:::details Q8 何时该残酷竞争？
名额固定、规则零和、无法侧支付——用极小极大思维，别自我感动。
:::

:::details Q9 如何测自己有没有 BZSG？
回顾上周三次冲突：有几次没算 \(S\) 就进入你死我活叙事？
:::

:::details Q10 成功指标是什么？
不是「对方输了」，而是：该零和时接近值 \(v\)，该正和时实现的剩余占比。
:::

# 下一阶段探索

- 精读 von Neumann–Morgenstern *Theory of Games and Economic Behavior* 中零和与特征函数章节。  
- 对照本引擎《囚徒困境》《纳什均衡》《帕累托最优》：把「和」的类型嵌进解概念。  
- 谈判：Harvard Negotiation Project / BATNA 与整合谈判案例（含戴维营式「主权 vs 安全」互补）。  
- 心理学：Różycka-Tran 等 BZSG 跨文化研究（37 国量表）。  
- 进阶：可转移效用合作博弈、核与沙普利值——正和如何在联盟内分配。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 零和/常数和定义与等价 | 教材标准 | 博弈论讲义；LibreTexts 二人零和导论 | 【事实】 |
| 极小极大定理（1928） | 经典定理 | von Neumann；TGEB 传统 | 【事实】 |
| 纳什将理论扩展到非零和 | 经典论文 | Nash 1950/1951；Crawford 综述讲义 | 【事实】 |
| 囚徒困境为非零和经典 | 教材/百科 | 支付可加且非常数；Wikipedia Zero-sum game | 【事实】 |
| 贸易与正和直觉 | 论述 | Pinker Edge.org「Positive-Sum Games」等 | 【分析】 |
| 谈判零和迷思与 BATNA | 管理实践 | 《哈佛商业评论》谈判迷思整理（HBR 台湾等） | 【分析】 |
| 整合谈判 / 戴维营互补议题 | 谈判史转述 | 哈佛谈判项目传统案例转述 | 【待验证】 |
| BZSG 量表与跨文化 | 同行评议 | Różycka-Tran et al., JCCP 2015；后续不变性/幸福感研究 | 【事实】【分析】 |
| IPD 中合作演化 | 经典+新研 | Axelrod 1984；Harper et al. PLOS Comp Biol 2024 | 【事实】【分析】 |
| 「股市零和」批评 | 百科/评论 | Wikipedia Zero-sum fallacy 条目 | 【分析】 |

标记约定：【事实】多方一致或标准定理；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或转述链长。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，不构成法律、投资、外交、谈判代理或商业建议。博弈模型是对激励结构的简化；现实含不完全信息、制度约束、伦理与执法风险。将手册结论直接用于高风险决策前，应咨询相应领域专业人士并核对一手数据。页脚「耗时」由流水线自动写入，不代表研究完备性保证。
