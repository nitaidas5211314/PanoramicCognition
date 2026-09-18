---
slug: 协调博弈与谢林点（Schelling Point）：多重均衡时，人们靠显著的共同焦点自发协调
title: 协调博弈与谢林点（Schelling Point）：多重均衡时，靠显著共同焦点自发协调
subtitle: 纳什只告诉你「哪些组合稳定」；当稳定点有很多个时，人们靠<strong>显著性（salience）</strong>收敛到同一个——这就是谢林点。对称时它很强；收益稍不对称，焦点可瞬间失效。
brand_sub: Schelling Point × Coordination Games
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 协调博弈, 谢林点, 焦点, Schelling, 多重均衡, 显著性]
theme_js_file: 协调博弈与谢林点（Schelling Point）：多重均衡时，人们靠显著的共同焦点自发协调.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**谢林点（Schelling point / focal point）**：在无法通信的纯协调（或近纯协调）博弈里，某个均衡因其**显著性（salience）**——文化、历史、标签、对称、先例——成为彼此预期的「对方也会选它」的共同焦点，从而把多重纳什均衡收敛到一个。【事实】

Thomas Schelling《冲突的策略》（*The Strategy of Conflict*, 1960）提出：人们往往能「在不知道对方会选什么的情况下，猜到对方会猜自己猜什么」。经典思想实验：纽约见面——多数人选正午 + Grand Central 问讯处；红蓝方格——多数人选唯一的红格。【事实】

关键边界：焦点在**支付对称**时极强（实验期望协调率常 >80%）；一旦出现**哪怕极小的支付不对称**，标签显著性常被支付显著性抢走，期望协调率可跌到接近混合均衡的 ~50%。【事实】（Crawford–Gneezy–Rottenstreich, *AER* 2008）

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么算纳什均衡」，而是：当纳什均衡**不止一个**且支付无法挑出唯一解时，**共享的认知结构**如何完成均衡选择。

边界：

- **在界内**：纯协调、猎鹿、性别战、默契谈判、标签显著性、团队推理、level-k、先例与公约、公共信号当焦点。
- **在界外**：单均衡的占优解算、具体城市导游、某币种炒作口号——除非压成「多重均衡如何被选中」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 多重均衡下的默契协调与焦点选择 |
| 2 | 边界在哪 | 到「显著性 / 标签 / 预期嵌套」可操作化为止 |
| 3 | 核心对象 | 协调博弈、均衡集合、显著性、共同预期 |
| 4 | 参与者 | 需对齐行动却难（或不能）通信的人/组织/算法 |
| 5 | 关键变量 | 选项数、显著性强度、支付对称性、先例、沟通带宽 |
| 6 | 可直接观察 | 标签、地标、默认规则、历史份额、公开锚点 |
| 7 | 无法直接观察 | 对方脑中的显著性排序、高阶预期 |
| 8 | 谁影响谁 | 显著线索 → 共同预期 → 均衡选择 → 先例强化 |
| 9 | 因果关系 | 共享显著性 ⇒ 收敛期望 ⇒ 协调成功 |
| 10 | 只是相关 | 「大家都选过」≠ 焦点；相关但可能是支付驱动【分析】 |
| 11 | 表层现象 | 见面地点、行业标准、键盘布局、链上最长链、语言拼写 |
| 12 | 底层机制 | 显著性 + 高阶信念（「我想你也觉得它显著」） |
| 13 | 有反馈吗 | 有。成功协调沉淀为先例，强化下一轮焦点 |
| 14 | 有延迟吗 | 有。新文化/新标签要时间成为共同显著 |
| 15 | 正/负反馈 | 标准锁定是正反馈；支付冲突可负反馈摧毁焦点 |

## 最关键的一句话

> 谢林点回答的是「在众多稳定点里，哪一个会被共同看见」——不是「哪一个对社会最优」。

# 为什么值得研究

:::cards g3
### 它补上纳什的缺口
纳什存在性不保证唯一性。没有焦点理论，多重均衡博弈在预测上几乎空白。【分析】

### 它解释「无通信的秩序」
货币、交通规则、技术标准、见面惯例——大量秩序来自默契而非合同。【事实】

### 它警告「焦点很脆」
对称实验里很灵的标签，在微小利益冲突下可失效——谈判与机制设计不能迷信「大家都懂」。【事实】
:::

:::note amber 最贵的一次误判
以为「有个明显默认选项」就等于协调成功。若对方因一点点额外利益觉得「该我占优」，你的显著性对他可能只是噪音。【分析】
:::

# 世界地图

九层看谢林点如何从「标签」长成「制度与锁定」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="spArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 故意制造公共焦点（锚点/默认/标准）</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 制度锁定 · 路径依赖、网络效应、切换成本</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 冲突协调 · 默契谈判、势力范围、边缘政策</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 认知模型 · 团队推理 / level-k / 可变框架</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 脆弱边界 · 支付不对称摧毁标签焦点（AER 2008）</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 实验核校 · Mehta–Starmer–Sugden 激励实验</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 谢林点 · 显著性引导的均衡选择</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 多重 NE · 纯协调 / 猎鹿 / 性别战</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 协调需求 · 对齐行动才有正支付</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L3**：先承认「多个稳定点」，再问「显著性选哪一个」。进阶卡在 **L5**：把「焦点万能」打回原形。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="200" y="16" width="280" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">多重纳什均衡集合</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">支付无法挑唯一</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">共享显著性线索</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="550" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">收敛共同预期</text>

  <line x1="280" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="200" width="280" height="56" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="180" y="234" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">支付不对称 → 焦点失效</text>
  <rect x="360" y="200" width="280" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="500" y="234" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">先例/标准 → 锁定焦点</text>

  <line x1="340" y1="152" x2="180" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#cmB)"/>
  <line x1="340" y1="152" x2="500" y2="200" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="120" y="290" width="440" height="48" rx="8" fill="#f8fafc" stroke="#94a3b8"/><text x="340" y="320" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">操作层：找唯一显著线索 · 或主动制造公共锚点</text>
</svg>
:::

抽象层是「均衡选择问题」；机制层是「显著性如何进入预期」；操作层是「找焦点或造焦点」。

# 核心参与者

| 角色 | 在系统里做什么 |
|---|---|
| 协调双方（或多方） | 在无法通信时选择行动，靠共享线索对齐 |
| 标签/环境设计师 | 无意或有意地提供显著性（地图、UI 默认、法规默认） |
| 先例与标准制定者 | 把一次协调写进历史，降低下一轮搜寻成本 |
| 实验经济学家 | 测量焦点在对称/不对称下的真实效力 |
| 理论家（Sugden / Bacharach / Crawford 等） | 形式化显著性、团队推理、level-k |
| 「搅局者」 | 用微小利益差或新标签破坏旧焦点 |

# 核心变量

| 变量 | 符号直觉 | 为何关键 |
|---|---|---|
| 选项数 | \(n\) | 均匀随机时匹配率仅 \(1/n\) |
| 焦点选择率 | \(f\) | 双方独立以 \(f\) 选焦点时，期望协调率可远高于 \(1/n\) |
| 支付对称性 | \(\delta\) | \(\delta=0\) 焦点强；\(\delta\) 极小即可大幅降效 |
| 显著性类型 | 标签/对称/先例/唯一性 | 不同类型在冲突时互相竞争 |
| 沟通带宽 | 0 / 廉价谈 / 有约束力 | 通信可替代或强化焦点 |
| 文化共享度 | 共同背景知识 | 跨文化时「明显」不再明显 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="caA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="caB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="80" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">共享线索</text>
  <rect x="180" y="30" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="240" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">共同预期</text>
  <rect x="340" y="30" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="400" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">选同一均衡</text>
  <rect x="500" y="30" width="140" height="50" rx="8" fill="#15181d"/><text x="570" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#fff" font-family="sans-serif">协调成功</text>
  <line x1="140" y1="55" x2="180" y2="55" stroke="#1d4ed8" stroke-width="2" marker-end="url(#caA)"/>
  <line x1="300" y1="55" x2="340" y2="55" stroke="#1d4ed8" stroke-width="2" marker-end="url(#caA)"/>
  <line x1="460" y1="55" x2="500" y2="55" stroke="#1d4ed8" stroke-width="2" marker-end="url(#caA)"/>

  <rect x="180" y="160" width="160" height="50" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="260" y="190" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">支付不对称 δ</text>
  <rect x="400" y="160" width="160" height="50" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="480" y="190" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">焦点失效/错配</text>
  <line x1="260" y1="160" x2="260" y2="80" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="5,3" marker-end="url(#caB)"/>
  <line x1="340" y1="185" x2="400" y2="185" stroke="#d5342c" stroke-width="2" marker-end="url(#caB)"/>

  <text x="40" y="270" font-size="12" fill="#454c56" font-family="sans-serif">实线=因果链；红虚线=反馈干扰（利益冲突打断预期收敛）</text>
</svg>
:::

因果主链：**线索 → 预期 → 选择 → 成功**。隐藏杀手是支付显著性与标签显著性的竞争。

# 隐藏关系

- **焦点 ≠ 最优**：红格并不比蓝格支付更高，它只是更「跳眼」。【事实】
- **一级显著 vs 二级显著**：Mehta 等区分「我对什么显著」与「我认为对方会对什么显著」——真正管用的常是后者。【分析】
- **团队推理 vs 个体最优反应**：Schelling 更接近「我们一起找一个突显方案」；level-k 则从天真 L0 往上推。两者在对称与不对称下解释力不同。【分析】
- **先例是焦点工厂**：一次成功协调把随机结果变成下一轮的显著性。【推论】
- **区块链最长链**：挖矿协议存在多均衡；参考实现与最长链规则充当焦点，但分叉/太阳黑子仍可能触发另一均衡。【分析】（Biais 等 *RFS*「区块链民间定理」）

# 系统运行机制

```
无法通信的协调需求
        ↓
识别候选均衡集合（全是 NE）
        ↓
扫描共享显著性（唯一性/对称/文化/先例）
        ↓
形成「你也会选它」的共同预期
        ↓
对齐行动 → 成功则沉淀先例；失败则换线索或求通信
```

:::note purple 与共同知识的接口
焦点要工作，至少需要对线索的**近似共同知识**：「我看见红格」不够，还要「我知道你也看见、且你知道我看见」。细节见《共同知识》手册。【分析】
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1960</text><text x="80" y="150" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Schelling</text><text x="80" y="168" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">提出焦点</text>
  <circle cx="220" cy="110" r="10" fill="#1d4ed8"/><text x="220" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1994</text><text x="220" y="150" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Mehta 等</text><text x="220" y="168" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">激励实验</text>
  <circle cx="360" cy="110" r="10" fill="#b8730a"/><text x="360" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">2005</text><text x="360" y="150" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">诺贝尔奖</text><text x="360" y="168" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Schelling</text>
  <circle cx="500" cy="110" r="10" fill="#d5342c"/><text x="500" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">2008</text><text x="500" y="150" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">AER</text><text x="500" y="168" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">焦点脆弱</text>
  <circle cx="620" cy="110" r="10" fill="#15181d"/><text x="620" y="60" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">2010s+</text><text x="620" y="150" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">链/平台</text><text x="620" y="168" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">标准即焦点</text>
</svg>
:::

从思想实验 → 实验室确认 → 发现边界条件 → 进入数字协议与平台默认设计。

# 利益与激励

| 参与方 | 激励 | 扭曲风险 |
|---|---|---|
| 对称协调者 | 最大化匹配概率 | 过度自信「我的显著=你的显著」 |
| 不对称支付方 | 想协调在对自己更有利的均衡 | 破坏标签焦点，导致双输 |
| 平台/标准方 | 锁定用户到自家默认 | 用假「自然焦点」掩盖锁定 |
| 监管者 | 指定默认规则降低协调成本 | 选错默认造成长期路径依赖 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="40" width="140" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="100" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">文化/标签库</text><text x="100" y="92" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">共享显著性原料</text>
  <rect x="220" y="40" width="140" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="290" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">预期市场</text><text x="290" y="92" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">猜你猜我</text>
  <rect x="410" y="40" width="140" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="480" y="70" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">行动对齐</text><text x="480" y="92" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">匹配成功</text>
  <rect x="560" y="40" width="90" height="70" rx="8" fill="#15181d"/><text x="605" y="80" text-anchor="middle" font-size="12" font-weight="600" fill="#fff" font-family="sans-serif">先例</text>
  <line x1="170" y1="75" x2="220" y2="75" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <line x1="360" y1="75" x2="410" y2="75" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <line x1="550" y1="75" x2="560" y2="75" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <path d="M605,110 Q340,210 100,110" fill="none" stroke="#0f8a4d" stroke-width="1.8" stroke-dasharray="4,3" marker-end="url(#flA)"/>
  <text x="340" y="200" text-anchor="middle" font-size="11" fill="#0f8a4d" font-family="sans-serif">成功先例回流，强化下一轮标签库</text>
  <text x="40" y="245" font-size="11" fill="#454c56" font-family="sans-serif">「抽水」也可发生：平台把自然焦点换成自家默认，抽取锁定租金【分析】</text>
</svg>
:::

信息流的核心资产是**共享显著性**；回流的是**先例**；可能被抽走的是**默认权**。

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」粗排：

| 序 | 杠杆 | 为何高杠杆 |
|---|---|---|
| 1 | **制造唯一公共锚点** | 一个突显默认可把 \(1/n\) 抬到接近 1 |
| 2 | **消除支付不对称冲突** | 微小 δ 可毁掉焦点——先对齐利益再靠标签 |
| 3 | **写清先例** | 「上次怎么做的」常是最强焦点 |
| 4 | **压缩选项数** | \(n\) 下降直接抬高随机匹配底线 |
| 5 | **廉价但公共的通信** | 一句话可替代复杂显著性推理 |
| 6 | **对称化标签** | 让「公平分割」成为显著规则 |
| 7 | **跨文化校准** | 换语境时重测「什么算明显」 |
| 8 | **时间锚** | 「正午」「整点」比任意时刻显著 |
| 9 | **视觉唯一性** | 唯一红格、唯一大按钮 |
| 10 | **拒绝假焦点** | 识破被设计来锁定你的「自然默认」 |

# 常见认知陷阱

:::details 陷阱 1 · 把「我想到的」当成「共同显著」
显著性是群体属性。你的灵感若无法被对方一眼看见，就不是谢林点。【分析】
:::

:::details 陷阱 2 · 以为焦点永远有效
AER 2008：芝加哥摩天楼对称时期望协调率约 **82%**；支付改为 \$100 vs \$101 后约 **52%**——接近抛硬币。【事实】
:::

:::details 陷阱 3 · 混淆协调与冲突
性别战里双方都想匹配，但偏好不同；焦点若与利益冲突，可能帮倒忙。【分析】
:::

:::details 陷阱 4 · 迷信「数学最优均衡」
风险占优与支付占优可以分家；人们未必选帕累托更好的那个。【事实】
:::

:::details 陷阱 5 · 忽视文化时效
Grand Central 在 1960 年代美国学生中显著；换城市、换世代，答案会变。【事实】
:::

:::details 陷阱 6 · 选项越多越「聪明」
无焦点时匹配率 ≈ \(1/n\)；堆选项是在惩罚协调。【推论】
:::

:::details 陷阱 7 · 把沉默当同意焦点
「大家都没反对」≠ 共同预期已收敛。【分析】
:::

:::details 陷阱 8 · 用私有暗号当焦点
只有你方懂的梗，对方看不到——不是公共显著性。【推论】
:::

:::details 陷阱 9 · 忽视二级显著性
真正要问：「对方会认为什么对双方都显著？」【分析】
:::

:::details 陷阱 10 · 把标准锁定当自然秩序
QWERTY、某链的「正统」、某 App 默认——往往是路径依赖，不是上帝选择。【分析】
:::

<!-- nav:实践路径 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <rect x="20" y="40" width="180" height="120" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="110" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">抽象</text>
  <text x="110" y="100" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">多重 NE</text>
  <text x="110" y="120" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">显著性</text>
  <text x="110" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">共同预期</text>

  <rect x="250" y="40" width="180" height="120" rx="10" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">机制</text>
  <text x="340" y="100" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">标签竞争</text>
  <text x="340" y="120" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">先例强化</text>
  <text x="340" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">不对称摧毁</text>

  <rect x="480" y="40" width="180" height="120" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="570" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">操作</text>
  <text x="570" y="100" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">造锚点</text>
  <text x="570" y="120" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">减选项</text>
  <text x="570" y="140" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">先对齐利益</text>
</svg>
:::

# 从理论到行动

| 理论判断 | 行动 |
|---|---|
| 纯协调、利益一致 | 找/造一个唯一显著选项 |
| 有微小利益冲突 | 先谈利益或引入公平焦点，别只丢标签 |
| 跨文化/新团队 | 不要假设「显然」；显式约定 |
| 标准战争 | 评估锁定租金与切换成本，不只看技术优劣 |
| 可通信 | 一句公共确认往往优于复杂猜心 |

# 技能树

:::details 枝 1 · 识别博弈类型
纯协调 / 猎鹿 / 性别战 / 囚徒困境——先分类再谈焦点。
:::

:::details 枝 2 · 显著性审计
列出选项，标「唯一性、对称、先例、文化」四维得分。
:::

:::details 枝 3 · 二级预期练习
写：「我认为对方会认为我们都会选 ___，因为 ___。」
:::

:::details 枝 4 · 不对称压力测试
给焦点选项加 1% 利益倾斜，重新预测协调率。
:::

:::details 枝 5 · 造锚能力
在会议、产品、谈判里设计一个不可忽略的默认。
:::

:::details 枝 6 · 跨域同构
货币、协议、交通规则、约会地点——同一数学结构。
:::

# 游戏化世界

你进入「默契之城」：市民不能通话，只能靠路牌、钟楼与旧俗对齐。任务是提高全城匹配率，同时提防商人偷偷给某个路口加「额外小费」——那会毁掉旧焦点。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| T1 分类 | 把本周 3 个冲突标成协调/冲突型 |
| T2 审计 | 对一次约会或会议做显著性四维表 |
| T3 实验 | 与朋友做「选同一数字」小实验，记录命中率 |
| T4 造锚 | 在团队里设立一个显式默认（时间/工具/模板） |
| T5 压力测 | 找一个「看起来明显」的默认，问：若利益差 1% 还成立吗？ |

# 反事实模拟

下面四个模型把「显著性 → 协调率」「不对称 → 崩溃」「猎鹿风险」「性别战焦点」算清楚。正文数字与滑块默认已对齐。

## 可调模型 1 · 显著性如何抬高匹配率

双方独立以概率 \(f\) 选焦点选项，否则在其余 \(n-1\) 个选项上均匀随机。期望协调率：

\[
\mathrm{ECR}=f^{2}+\frac{(1-f)^{2}}{n-1}
\]

均匀无焦点时 \(\mathrm{ECR}=1/n\)。默认 \(n=4,f=0.90\) → ECR=**0.813**（对比均匀 **0.250**）。Schelling 正面/反面：\(f=36/42\approx0.857\) 时（\(n=2\)）ECR=**0.755**。【推论】【事实】

:::raw
<div class="tool" id="tool_ecr">
  <div class="ctrl">
    <label>选项数 n <output id="ecr_nO">4</output></label>
    <input type="range" id="ecr_n" min="2" max="12" step="1" value="4"/>
    <label>焦点选择率 f <output id="ecr_fO">0.90</output></label>
    <input type="range" id="ecr_f" min="0.05" max="0.99" step="0.01" value="0.90"/>
  </div>
  <div class="readout">
    <div class="ro">期望协调率 ECR<strong id="ecr_ecr">0.813</strong></div>
    <div class="ro">均匀底线 1/n<strong id="ecr_base">0.250</strong></div>
    <div class="ro">相对提升<strong id="ecr_lift">+225%</strong></div>
    <div id="ecr_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ecr_vh">n=4,f=0.90 → ECR=0.813，远高于均匀 0.250；显著性把协调从「碰运气」变成「默契」</span></div>
  </div>
  <canvas id="ecrChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 支付不对称摧毁焦点

用分段经验近似刻画 Crawford 等芝加哥摩天楼结果：对称（δ=0）ECR≈**82%**；微小不对称（δ≈1%，如 \$100 vs \$101）≈**52%**；中度（δ≈10%，\$100 vs \$110）≈**50%**。【事实】滑块 δ 为「对焦点均衡的相对利益倾斜（%）」。

:::raw
<div class="tool" id="tool_asym">
  <div class="ctrl">
    <label>利益倾斜 δ(%) <output id="asym_dO">0.0</output></label>
    <input type="range" id="asym_d" min="0" max="15" step="0.1" value="0.0"/>
    <label>对称时标签效力 s0 <output id="asym_sO">0.82</output></label>
    <input type="range" id="asym_s" min="0.60" max="0.95" step="0.01" value="0.82"/>
  </div>
  <div class="readout">
    <div class="ro">期望协调率<strong id="asym_ecr">0.820</strong></div>
    <div class="ro">相对对称跌幅<strong id="asym_drop">0.0pp</strong></div>
    <div class="ro">判定<strong id="asym_lab">焦点仍强</strong></div>
    <div id="asym_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="asym_vh">δ=0 → ECR≈0.82（对齐 AER 对称处理）；把 δ 推到 1 看崩溃</span></div>
  </div>
  <canvas id="asymChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 猎鹿：支付占优 vs 风险占优

猎鹿（Stag Hunt）：都猎鹿得 \(R\)，都猎兔得 \(r\)，一人猎鹿一人猎兔则猎鹿方得 0、猎兔方得 \(r\)。两纯 NE：(鹿,鹿) 支付占优；(兔,兔) 常风险占优。若对方选鹿概率为 \(p\)，选鹿的期望为 \(pR\)；选兔稳得 \(r\)。临界 \(p^*=r/R\)。默认 \(R=5,r=2\) → \(p^*=0.40\)；若你估计对方只以 0.35 选鹿，理性选兔——**帕累托更好的均衡可能落空**。【事实】

:::raw
<div class="tool" id="tool_stag">
  <div class="ctrl">
    <label>猎鹿奖励 R <output id="stag_RO">5.0</output></label>
    <input type="range" id="stag_R" min="2" max="10" step="0.1" value="5.0"/>
    <label>猎兔稳得 r <output id="stag_rO">2.0</output></label>
    <input type="range" id="stag_r" min="0.5" max="4" step="0.1" value="2.0"/>
    <label>你估计对方选鹿 p <output id="stag_pO">0.50</output></label>
    <input type="range" id="stag_p" min="0" max="1" step="0.01" value="0.50"/>
  </div>
  <div class="readout">
    <div class="ro">临界 p*<strong id="stag_pstar">0.400</strong></div>
    <div class="ro">EU(鹿)<strong id="stag_euS">2.50</strong></div>
    <div class="ro">你的最优<strong id="stag_best">鹿</strong></div>
    <div id="stag_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="stag_vh">p=0.50 ≥ p*=0.40 → 选鹿；焦点若把共同预期抬过 p*，帕累托均衡可被选中</span></div>
  </div>
  <canvas id="stagChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 性别战：无焦点 vs 有焦点

歌剧/足球：同歌剧 (a,1)，同足球 (1,b)，错配 0。无焦点时停在混合：行以 \(p^*=b/(1+b)\) 去歌剧，列以 \(q^*=1/(1+a)\) 去歌剧，匹配率 \(pq+(1-p)(1-q)\)。有公共焦点（如「今晚看球」成为显著约定）时，双方以概率 \(f\) 收敛到同一纯 NE，匹配率 ≈ \(f+(1-f)\cdot\)混合匹配率。默认 \(a=2,b=2,f=0.80\) → 混合匹配率 **0.444**（\(4/9\)），有焦点后 ≈ **0.889**。【推论】

:::raw
<div class="tool" id="tool_bos">
  <div class="ctrl">
    <label>行偏好 a <output id="bos_aO">2.0</output></label>
    <input type="range" id="bos_a" min="1.1" max="5" step="0.1" value="2.0"/>
    <label>列偏好 b <output id="bos_bO">2.0</output></label>
    <input type="range" id="bos_b" min="1.1" max="5" step="0.1" value="2.0"/>
    <label>焦点收敛率 f <output id="bos_fO">0.80</output></label>
    <input type="range" id="bos_f" min="0" max="1" step="0.01" value="0.80"/>
  </div>
  <div class="readout">
    <div class="ro">混合匹配率<strong id="bos_mix">0.444</strong></div>
    <div class="ro">有焦点匹配率<strong id="bos_foc">0.889</strong></div>
    <div class="ro">提升<strong id="bos_lift">+0.444</strong></div>
    <div id="bos_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="bos_vh">混合下匹配仅 0.444；f=0.80 的公共约定把匹配抬到 0.889——焦点的价值是「避免抛硬币」</span></div>
  </div>
  <canvas id="bosChart" height="214"></canvas>
</div>
:::

:::tabs
@@对称纯协调
拉高模型 1 的 f，看 ECR 相对 1/n 的跃升——这是谢林点的主场。

@@加 1% 利益差
把模型 2 的 δ 推到 1.0，ECR 跌向 ~0.52——标签还在，协调已近随机。

@@猎鹿过临界
模型 3：把 p 压到 p* 以下，理性弃鹿——没有焦点抬预期，帕累托均衡失踪。
:::

# 四级能力路线

| 级别 | 能力 |
|---|---|
| L1 | 说出谢林点定义，举一个生活例子 |
| L2 | 区分支付占优 / 风险占优 / 标签焦点 |
| L3 | 用对称性与 δ 预测焦点是否可靠 |
| L4 | 设计最小公共锚点，并做不对称压力测试 |

# 30分钟最小实践

1. 选一件需要默契对齐的事（见面点、文件命名、周会工具）。
2. 列出 ≥3 个可行选项；标出「最显著的一个」及理由（唯一/先例/文化）。
3. 问：若对方因 1% 私利偏好另一选项，协调还成立吗？
4. 写下一句**显式约定**（把焦点变成公共知识）。

成本≈0，产出=一张「焦点诊断卡」。

# 7天计划

| 日 | 动作 |
|---|---|
| D1 | 重做「红格/纽约见面」思想实验并记录你的答案 |
| D2 | 用模型 1 算一次你团队选项的 ECR |
| D3 | 读 AER 2008 摘要：82%→52% |
| D4 | 给一个默认规则做 δ 压力测试 |
| D5 | 在跨部门沟通里显式指定一个锚点 |
| D6 | 猎鹿：找一个「怕对方不来」而选保守的例子 |
| D7 | 复盘：本周哪次协调靠焦点、哪次靠通信 |

# 30天计划

周1：每日一个生活协调案例建档；周2：在工作流里设立 2 个显式默认并观察违规率；周3：对一个标准/工具选择做锁定成本估算；周4：写一页「焦点失效事后复盘」（利益差、文化差、假显著）。

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **纯协调匹配**：支付只取决于是否相同。【事实】
2. **谢林焦点选择**：显著性收敛预期。【事实】
3. **ECR 公式**：\(f^{2}+(1-f)^{2}/(n-1)\)。【推论】
4. **猎鹿**：支付占优 vs 风险占优。【事实】
5. **性别战**：冲突性协调 + 双重纯 NE。【事实】
6. **标签 vs 支付显著性竞争**（AER 2008）。【事实】
7. **团队推理**：问「对我们好的突显方案」。【分析】
8. **level-k + L0 显著性**。【分析】
9. **先例/公约演化**（Lewis 传统）。【分析】
10. **协议焦点**（如最长链规则）。【分析】

# 关键问题清单

:::details Q1 这是不是多重均衡？
若只有一个 NE，焦点理论不是主矛盾。
:::

:::details Q2 利益是否近似对称？
不对称时先处理利益，再谈标签。
:::

:::details Q3 什么线索对双方都显著？
写出来；无法写清则焦点不可靠。
:::

:::details Q4 选项能否减少？
每减一个，均匀底线上升。
:::

:::details Q5 有没有便宜的公共通信？
有则优先用通信制造 CK 焦点。
:::

:::details Q6 先例是什么？
上次成功的对齐方式往往是最强锚。
:::

:::details Q7 是否跨文化？
重新测显著性，勿移植「显然」。
:::

:::details Q8 谁在设计默认？
默认可能是锁定工具，而不只是协调工具。
:::

:::details Q9 风险占优是否压过支付占优？
猎鹿类要单独算 p*。
:::

:::details Q10 失败后如何重建焦点？
公开复盘 + 新的唯一锚点 + 短暂通信。
:::

# 下一阶段探索

- 《纳什均衡》：多重均衡的数学背景
- 《共同知识》：焦点所需的认知层级
- 《囚徒困境》与猎鹿：合作结构对照
- 相关均衡：用公共信号系统化「造焦点」
- 演化博弈与公约形成（Lewis / Young）

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 焦点/谢林点定义与纽约实验 | 原著 | Schelling, *The Strategy of Conflict*, Harvard UP, 1960 | 【事实】 |
| Heads 选择 36/42 | 原著/二手转述 | Schelling 1960；百科与实验文献转述 | 【事实】 |
| 激励下的标签显著性 | 实验论文 | Mehta, Starmer, Sugden, *Theory and Decision* 1994；*AER* 1994 | 【事实】 |
| 对称 ~82%、微小不对称 ~52% | 实验论文 | Crawford, Gneezy, Rottenstreich, *AER* 2008 | 【事实】 |
| 焦点与高风险谈判 | 学术通讯 | AEA Research Highlights 对 Sugden 等谈判实验的介绍 | 【分析】 |
| 区块链多均衡与分叉 | 期刊论文 | Biais et al., *The Blockchain Folk Theorem*, RFS 2019 | 【分析】 |
| 挖矿策略焦点 | 工作论文 | Kroll, Davey, Felten 等对 Bitcoin 挖矿博弈的讨论 | 【待验证】 |
| 团队推理传统 | 理论文献 | Sugden；Bacharach 可变框架理论 | 【分析】 |
| Myerson 对 Schelling 的解读 | 讲义/论文 | Myerson, *Learning from Schelling's Strategy of Conflict* | 【分析】 |

标记约定：【事实】多方一致或原始定义/实验；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或转载链长。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，不构成投资、法律、军事、外交或商务决策建议。博弈模型高度简化；现实中的显著性、文化与支付常被误判。据此行动的风险由读者自行承担。涉及合谋、操纵市场默认或利用信息不对称锁定用户时，须遵守所在司法辖区的强制法——模型描述不等于行动许可。
