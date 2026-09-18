---
slug: 信息集（Information Set）：参与人决策时知道什么；分完全信息-不完全信息、完美信息-不完美信息
title: 信息集（Information Set）：参与人决策时知道什么；分完全信息/不完全信息、完美信息/不完美信息
subtitle: 信息集回答的是「轮到你时，你<strong>分不清自己站在哪几个历史节点上</strong>」。完美/不完美切的是历史是否可见；完全/不完全切的是支付与类型是否共同知识——两轴正交，混为一谈会把整棵博弈树读歪。
brand_sub: Information Set × Perfect & Complete
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 信息集, 完美信息, 完全信息, 贝叶斯博弈]
theme_js_file: 信息集（Information Set）：参与人决策时知道什么；分完全信息-不完全信息、完美信息-不完美信息.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**信息集（Information Set）** 是扩展式博弈里、某个参与人在决策瞬间**无法相互区分**的决策节点集合：同一信息集内，可选行动必须相同，否则行动菜单本身就会泄露节点身份。【事实】

两轴正交、不可互换：

1. **完美 / 不完美**：每个信息集是否都是单点？是 → 完美信息（看得见全部既往历史）；否 → 不完美信息。【事实】
2. **完全 / 不完全**：支付、类型与规则是否共同知识？是 → 完全信息；否 → 不完全信息（Harsanyi 用「自然抽类型」把它改写成完全但不完美）。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「情报部门如何搜集资料」，而是：在正式博弈模型里，**参与人决策时所依据的可观察划分**如何切开历史空间，并由此决定策略对象、子博弈切法、均衡精炼是否可用。

边界：

- **在界内**：信息集定义与画法、完美/不完美、完全/不完全、完美回忆、行为策略与 Kuhn 等价、Harsanyi 变换、子博弈与信息集切割规则。
- **在界外**：具体加密协议实现、脑科学中的「记忆编码」——除非压缩成「完美回忆是否成立」这一条建模假设。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 决策时「知道什么 / 分不清什么」如何进入模型 |
| 2 | 边界在哪 | 到「节点划分 + 行动一致性 + 信念更新」可形式化为止 |
| 3 | 核心对象 | 历史、决策节点、信息集、信念、行为策略 |
| 4 | 参与者 | 需要在不确定性下选行动的人/组织/算法 |
| 5 | 关键变量 | 信息集大小、先验、信号精度、是否完美回忆、类型空间 |
| 6 | 可直接观察 | 公开历史、公开报价、棋盘局势 |
| 7 | 无法直接观察 | 私牌、对方类型、对方私有信号、遗忘的细节 |
| 8 | 谁影响谁 | 信息公开规则 → 信息集粗细 → 策略空间 → 均衡预测 |
| 9 | 因果关系 | 合并节点 → 策略 contingency 减少 → SPE 可能失效 |
| 10 | 只是相关 | 「同时行动」常画成虚线信息集，但也可改写为序贯+不可见【分析】 |
| 11 | 表层现象 | 扑克暗牌、同时出价、谈判藏底线 |
| 12 | 底层机制 | 不可区分性 + 行动菜单一致性 + 贝叶斯信念 |
| 13 | 有反馈吗 | 有。信号、声誉、泄露会 refinement 信息集 |
| 14 | 有延迟吗 | 有。信息到达滞后本身就是信息集结构 |
| 15 | 正/负反馈 | 信息军备竞赛是正反馈；公共信号收敛信念是负反馈 |

## 最关键的一句话

> 信息集不是「你拥有的数据量」，而是「**在模型允许的观察下，你仍无法排除的历史集合**」；完美/完全是两条不同的尺子。

# 为什么值得研究

:::cards g3
### 它决定你在「选什么」
策略是**每个信息集**上的行动（或混合）。信息集画错，策略空间整棵树都错。【事实】

### 它决定哪些均衡概念可用
完美信息 → 反向归纳 / SPE 干净；信息集跨子树 → 许多「子博弈」切不下去。【事实】

### 它把「不知道对方类型」变成可算对象
不完全信息经 Harsanyi 变换 → 完全但不完美：自然先动，类型进信息集。【事实】
:::

:::note amber 最贵的一次混用
说「国际象棋是完全信息」常常其实想说**完美信息**（棋盘可见）。完全信息强调的是：双方偏好与规则是共同知识——而真实棋手的风险态度、时间压力偏好未必共同知识。【分析】术语混用会让后续贝叶斯博弈章节全线错位。
:::

# 世界地图

九层看「信息集」如何从节点集合长成均衡语言。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="isArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 改写信息公开规则本身</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 精炼 · 序贯均衡 / 完美贝叶斯 / 颤抖手</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 Harsanyi · 不完全 → 完全但不完美</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 Kuhn · 完美回忆下混合 ≡ 行为策略</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 信念系统 · 信息集上的贝叶斯后验</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 两轴分类 · 完美×完全 正交矩阵</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 策略对象 · 每个信息集规定一个行动/混合</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 信息集 · 不可区分节点 + 行动一致</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 历史与节点 · 扩展式博弈树</text>
</svg>
:::

:::note blue 读图要点
入门最常卡在 **L4**：把「看不见历史」和「不知道支付」当成同一种无知。扑克主要是不完美（牌面）；拍卖常是不完全（估值类型）。
:::

# 核心概念地图

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="icA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="icB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="200" y="12" width="280" height="48" rx="10" fill="#15181d"/><text x="340" y="42" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" font-family="sans-serif">信息集 Iᵢ</text>

  <rect x="20" y="90" width="190" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="115" y="125" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">单点 → 完美</text>
  <rect x="245" y="90" width="190" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="125" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">多点 → 不完美</text>
  <rect x="470" y="90" width="190" height="56" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="565" y="125" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">行动菜单一致</text>

  <line x1="300" y1="60" x2="115" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#icA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#icA)"/>
  <line x1="380" y1="60" x2="565" y2="90" stroke="#d5342c" stroke-width="1.5" marker-end="url(#icB)"/>

  <rect x="40" y="190" width="280" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="180" y="225" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">完全：支付/类型共同知识</text>
  <rect x="360" y="190" width="280" height="56" rx="8" fill="#f3e8ff" stroke="#7c3aed"/><text x="500" y="225" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">不完全：类型私有 → Harsanyi</text>

  <rect x="120" y="290" width="440" height="56" rx="8" fill="#f3f4f6"/><text x="340" y="325" text-anchor="middle" fill="#454c56" font-size="13" font-family="sans-serif">两轴正交：可出现「完全但不完美」「不完全且完美」</text>
</svg>
:::

| 概念 | 在系统里的作用 | 常见误读 |
|---|---|---|
| 信息集 | 决策时的不可区分历史包 | 「等于你知道的全部事实」——其实是划分 |
| 完美信息 | 全体信息集单点 | 「等于完全信息」 |
| 完全信息 | 结构与支付共同知识 | 「等于看得见棋盘」 |
| 完美回忆 | 不遗忘自己曾知/曾选 | 默认成立；扑克记牌失误=建模偏离【分析】 |
| 行为策略 | 每个信息集独立随机 | 无完美回忆时未必等价于混合（Kuhn）【事实】 |

# 核心参与者

:::cards g2
### 建模者
决定哪些历史被虚线圈在一起。圈错 = 把「看不见」写成「看见」，或反过来。

### 现场决策者
牌手、谈判代表、投标人。他们实际记得什么，决定完美回忆是否近似成立。

### 「自然」（Nature）
发牌、抽类型、制造公共/私有信号。Harsanyi 变换的第一推动者。【事实】

### 机制设计师
决定披露规则：公开报价、暗标、强制审计——直接改写信息集粗细。
:::

# 核心变量

| 变量 | 符号直觉 | 杠杆作用 |
|---|---|---|
| 信息集大小 | \|I\| | \|I\|=1 完美；\|I\|>1 必须带信念 |
| 先验 / 后验 | μ(h\|I) | 决定不完美下的最优行动 |
| 信号精度 | 似然比 | 把粗信息集「几乎」拆开 |
| 类型空间 | Tᵢ | 不完全信息的状态变量 |
| 共同先验 | p(t) | Harsanyi 一致性；否则信念层级爆炸【分析】 |
| 回忆完备性 | 完美回忆否 | 决定 Kuhn 等价是否成立 |

:::note green 数字锚点（先算后写）
性别战：完美信息序贯 → 先手选 Opera，后手跟随，支付 (2,1)；若后手信息集把两历史圈在一起（等价同时动），混合纳什各方 EU\*=⅔。【推论】
信息价值默认例：信念 p=0.5，左节点 (A,B)=(3,1)，右节点 (0,2) → 完美信息 EU=2.5，不完美 EU=1.5，**信息价值 = 1.0**。【推论】
进入博弈：在位者强类型先验 q，进入 EU=1−2q；q&lt;0.5 进入，q=0.3 → EU=+0.40；q=0.6 → EU=−0.20。【推论】
:::

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="isca1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#15181d"/></marker>
    <marker id="isca2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="90" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">观察规则</text>
  <rect x="190" y="30" width="140" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="260" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">信息集划分</text>
  <rect x="360" y="30" width="140" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="430" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">策略空间</text>
  <rect x="530" y="30" width="130" height="44" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="595" y="57" text-anchor="middle" font-size="12" font-weight="600" font-family="sans-serif" fill="#15181d">均衡预测</text>
  <line x1="160" y1="52" x2="188" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#isca1)"/>
  <line x1="330" y1="52" x2="358" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#isca1)"/>
  <line x1="500" y1="52" x2="528" y2="52" stroke="#15181d" stroke-width="1.5" marker-end="url(#isca1)"/>

  <path d="M595,74 C595,160 90,160 90,74" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#isca2)"/>
  <text x="340" y="175" text-anchor="middle" font-size="12" fill="#d5342c" font-family="sans-serif">反馈：均衡行为可成为新信号 → 未来信息集被内生细化</text>

  <rect x="80" y="210" width="520" height="70" rx="10" fill="#f3f4f6"/>
  <text x="340" y="240" text-anchor="middle" font-size="13" font-weight="600" fill="#15181d" font-family="sans-serif">因果（实线）vs 误读</text>
  <text x="340" y="262" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">「信息多＝支付高」← 未必；有时公开信息消灭信息租金【分析】</text>
</svg>
:::

关键因果链：

1. **观察规则 → 信息集**：看不见的边，用虚线把节点捆在一起。
2. **信息集 → 策略**：策略只在信息集上定义，不能对「分不清的两个节点」给不同行动。
3. **信息集 → 子博弈**：子博弈不能切开信息集；否则 SPE 定义失效。【事实】
4. **类型先验 → 信念 → 行动**：不完全信息下，进入/出价/叫牌由后验驱动。

# 隐藏关系

- **同时行动 ≈ 序贯 + 大信息集**：剪刀石头布可画成「A 先选、B 看不见」。【事实】
- **不完全 ↔ 不完美（经变换）**：Harsanyi 把「不知道类型」变成「自然已抽、你看不见」。【事实】
- **信息价值可为负（战略意义上）**：对全体公开同一信号，可能毁掉你的信息优势；个体 VOI 仍非负，集体可能陷入「透明度诅咒」。【分析】
- **遗忘制造新信息集**：不完美回忆把本可单点的历史重新合并——Kuhn 等价可能破裂。【事实】

# 系统运行机制

扩展式博弈的运转可以压成一条流水线：

:::raw
<div class="flow">
  <span>自然/先手</span><i>→</i>
  <span>历史展开</span><i>→</i>
  <span class="hi">到达信息集</span><i>→</i>
  <span>信念更新</span><i>→</i>
  <span>行为策略抽签</span><i>→</i>
  <span>支付实现</span>
</div>
:::

运行约束：

1. **一致性**：同一 I 上行动集相同。
2. **贝叶斯纪律**：在正概率路径上，信念 = 条件概率。
3. **完美回忆（常用假设）**：到达 I 时，记得自己此前行动与曾获信息。
4. **共同知识底层**：完全信息要求规则与支付共同知识；否则先做类型化。【事实】

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tev" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="110" r="10" fill="#0f8a4d"/><text x="80" y="50" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">1944</text><text x="80" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">vNM 扩展式</text>
  <circle cx="220" cy="110" r="10" fill="#1d4ed8"/><text x="220" y="50" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">1953</text><text x="220" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Kuhn 定理</text>
  <circle cx="360" cy="110" r="10" fill="#b8730a"/><text x="360" y="50" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">1967–68</text><text x="360" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Harsanyi 变换</text>
  <circle cx="500" cy="110" r="10" fill="#7c3aed"/><text x="500" y="50" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">1980s</text><text x="500" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">序贯/完美贝叶斯</text>
  <circle cx="620" cy="110" r="10" fill="#d5342c"/><text x="620" y="50" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">今</text><text x="620" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">不完美信息 AI</text>
  <text x="340" y="170" text-anchor="middle" font-size="12" fill="#7c848f" font-family="sans-serif">时间轴：从「画出虚线」到「大规模不完美信息博弈求解」</text>
  <text x="340" y="195" text-anchor="middle" font-size="12" fill="#7c848f" font-family="sans-serif">【事实】节点为学科史共识锚点；AI 应用为【分析】概括</text>
</svg>
:::

# 利益与激励

谁想让信息集变细或变粗？

| 角色 | 激励 | 典型动作 |
|---|---|---|
| 有私有优势者 | 保持粗信息集（对方看不见） | 藏牌、暗标、拖延披露 |
| 弱势方 | 逼迫公开 / 引入第三方审计 | 要求透明、强制报告 |
| 平台/监管 | 有时要透明（防操纵），有时要隐私 | 披露规则、延迟披露 |
| 协调博弈中的双方 | 可能自愿缩小信息差 | 廉价谈话、标准合同 |

:::note purple 激励扭曲
让对方「看起来知道得更多」本身可以是策略：虚张声势改变对方信念，而不改变物理历史。【分析】
:::

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="flowA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flowB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="100" y="60" text-anchor="middle" font-size="13" font-weight="600" fill="#15181d" font-family="sans-serif">自然 / 类型</text>
  <rect x="280" y="30" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="60" text-anchor="middle" font-size="13" font-weight="600" fill="#15181d" font-family="sans-serif">私有信号</text>
  <rect x="520" y="30" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="580" y="60" text-anchor="middle" font-size="13" font-weight="600" fill="#15181d" font-family="sans-serif">公开历史</text>
  <line x1="160" y1="55" x2="278" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flowA)"/>
  <line x1="400" y1="55" x2="518" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flowA)"/>

  <rect x="160" y="140" width="360" height="70" rx="10" fill="#fce8e8" stroke="#d5342c"/>
  <text x="340" y="172" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">抽水点：信息租金</text>
  <text x="340" y="195" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">谁控制「哪些边可见」，谁就切割期望支付</text>

  <path d="M100,80 C100,120 200,140 220,140" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#flowB)"/>
  <path d="M580,80 C580,120 480,140 460,140" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#flowB)"/>
</svg>
:::

信息流三件套：**私有类型流**（不完全）、**行动历史流**（完美性）、**信念流**（均衡精炼的载体）。资金/支付只是终端接口；真正被「抽水」的往往是信息优势折现成的期望支付差。

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 序 | 杠杆 | 为何高杠杆 | 可操作性 |
|---|---|---|---|
| 1 | 先画对信息集 | 后面策略/均衡全建在这上面 | 高：纸笔画树 |
| 2 | 分清完美 vs 完全 | 避免整章术语错位 | 高：一张 2×2 表 |
| 3 | 信念写进决策 | 不完美下没有「无信念最优」 | 中：先用离散两节点 |
| 4 | Harsanyi 变换 | 把「不知道」变成可算树 | 中：加自然节点 |
| 5 | 检查子博弈切割 | 防止伪 SPE | 中：虚线不跨切 |
| 6 | 完美回忆假设体检 | 决定能否用行为策略 | 中：问「会不会忘」 |
| 7 | 披露规则设计 | 直接改 \|I\| | 低–中：制度约束 |
| 8 | 信号精度 | 近似拆开信息集 | 中：校准似然 |
| 9 | 廉价谈话协议 | 协调类缩小有效信息差 | 中 |
| 10 | 记录与审计 | 事后把不完美变可验证 | 中 |

# 常见认知陷阱

:::details 陷阱 1 · 完美 = 完全
最常见。棋盘可见是完美；支付共同知识是完全。国际象棋通常两者兼有；扑克通常完全（规则已知）但不完美。【事实】

:::

:::details 陷阱 2 · 信息集 = 「我知道的清单」
信息集是**划分**：强调分不清什么，不是百科词条长度。

:::

:::details 陷阱 3 · 同时行动就「没有扩展式」
可以画扩展式，用虚线把后手两个节点捆成一个信息集。【事实】

:::

:::details 陷阱 4 · 有了纳什就不用管信息
同一支付矩阵，信息结构一变（序贯可见 vs 不可见），均衡集合与福利可完全不同（性别战）。【推论】

:::

:::details 陷阱 5 · 不完全信息无法建模
Harsanyi (1967–68) 给出标准路径：类型 + 共同先验 + 自然先动。【事实】

:::

:::details 陷阱 6 · 行为策略总等于混合策略
需要完美回忆；缺了它，等价性可失败（Kuhn）。【事实】

:::

:::details 陷阱 7 · 子博弈到处可切
信息集被切开就不构成合法子博弈。【事实】

:::

:::details 陷阱 8 · 「信息披露越多越好」
战略互动中，强制透明可能消灭信息租金、改变参与激励。【分析】

:::

:::details 陷阱 9 · 信念可以随便编
均衡路径上必须贝叶斯一致；非路径信念受精炼约束（直觉标准等）。【分析】

:::

:::details 陷阱 10 · 现实记性 ≈ 完美回忆
牌桌疲劳、组织失忆会引入不完美回忆——模型预测需打折。【待验证】场景依赖强。
:::

<!-- nav:实践系统 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <rect x="30" y="30" width="180" height="220" rx="12" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="120" y="60" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">抽象</text>
  <text x="120" y="100" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">信息集 I</text>
  <text x="120" y="125" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">完美/完全</text>
  <text x="120" y="150" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">信念 μ</text>
  <text x="120" y="175" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">Harsanyi</text>

  <rect x="250" y="30" width="180" height="220" rx="12" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="60" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">机制</text>
  <text x="340" y="100" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">不可区分性</text>
  <text x="340" y="125" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">贝叶斯更新</text>
  <text x="340" y="150" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">策略 contingency</text>
  <text x="340" y="175" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">信息租金</text>

  <rect x="470" y="30" width="180" height="220" rx="12" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="560" y="60" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">操作</text>
  <text x="560" y="100" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">画树+虚线</text>
  <text x="560" y="125" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">填 2×2 分类</text>
  <text x="560" y="150" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">算 VOI</text>
  <text x="560" y="175" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">设计披露</text>
</svg>
:::

| 现实场景 | 抽象对象 | 操作抓手 |
|---|---|---|
| 扑克 | 不完美信息 + 通常完全 | 记牌≈缩小有效 \|I\| |
| 暗标拍卖 | 不完全（估值类型） | 报信策略；机制比价 |
| 谈判藏底线 | 不完全 | 试探性报价当信号 |
| 围棋/象棋 | 完美+（近似）完全 | 反向归纳直觉 |
| 同时定价 | 完全但不完美 | 用混合或相关均衡语言 |

# 从理论到行动

1. **写清决策点**：谁动、看见什么。
2. **画节点，圈信息集**：虚线 = 分不清。
3. **贴标签**：完美？完全？完美回忆？
4. **需要类型就加自然**：先验写在边上。
5. **再谈均衡**：纳什 / SPE / PBE，按结构选用。
6. **用本页工具**验 VOI 与进入阈值。

# 技能树

:::details 基础 · 识别
- 在树上指出信息集
- 判断完美/不完美、完全/不完全
- 解释性别战「虚线」如何改变预测

:::

:::details 中级 · 计算
- 两节点信息集上算最优行动
- 计算信息价值（完美 vs 捆绑）
- 做简单 Harsanyi 变换草图

:::

:::details 高级 · 精炼与设计
- 检查子博弈合法性
- 陈述 Kuhn 适用条件
- 设计披露规则并预测均衡移动
:::

# 游戏化世界

| 区域 | 怪物 | 通关条件 |
|---|---|---|
| 术语沼泽 | 「完美完全一体」泥怪 | 独立举出 2×2 四格例子 |
| 虚线森林 | 假同时行动树 | 正确圈信息集 |
| 信念迷雾 | 「随便猜」幽灵 | 写出贝叶斯后验 |
| 类型神殿 | 不完全信息恐惧 | 完成一次 Harsanyi 变换 |
| 回忆废墟 | 遗忘诅咒 | 指出 Kuhn 是否还能用 |

# 任务系统

| 任务 | 难度 | 产出 | 验收 |
|---|---|---|---|
| T1 默写信息集两条件 | ★ | 卡片 | 同参与人 + 不可区分 + 行动一致 |
| T2 填 2×2 分类表 | ★★ | 表 | 每格一例 |
| T3 手算 VOI 默认例 | ★★ | 数字 | 价值=1.0 |
| T4 进入阈值 | ★ | 数字 | q*=0.5；q=0.3 进入 |
| T5 性别战对比 | ★★ | 短文 | (2,1) vs EU=⅔ |
| T6 画一棵扑克简化树 | ★★★ | 草图 | 至少一处 \|I\|&gt;1 |

# 反事实模拟

:::tabs
@@若后手看得见先手（性别战）
信息集裂成单点 → 先手优势，SPE 到 (Opera, Opera)=(2,1)，不再困在混合 ⅔。【推论】

@@若强制公开全部类型
不完全→完全；信息租金可能消失，参与约束与报价策略整体重写。【分析】

@@若玩家会遗忘自己上轮行动
完美回忆破裂 → 行为策略与混合可能不等价，求解工具要换。【事实】

@@若信号完美揭示节点
不完美信息集退化为单点，VOI 被「用尽」，战略回到完美信息分支。【推论】
:::

## 可调模型 1 · 信息价值：完美拆开 vs 捆绑信息集

两节点 L/R，先验 P(L)=p。行动 A/B 在两节点支付不同。完美信息：各节点选更好的；不完美：同一行动用于两节点。

默认：p=0.5，(A,B)\_L=(3,1)，(A,B)\_R=(0,2) → 完美 2.5、不完美 1.5、价值 **1.0**。

:::raw
<div class="tool" id="tool_voi">
  <div class="ctrl">
    <label>先验 P(L)=p <output id="voi_pO">0.50</output></label>
    <input type="range" id="voi_p" min="0.05" max="0.95" step="0.01" value="0.50"/>
    <label>节点 L：A 的支付 <output id="voi_aLO">3.0</output></label>
    <input type="range" id="voi_aL" min="-2" max="10" step="0.1" value="3.0"/>
    <label>节点 L：B 的支付 <output id="voi_bLO">1.0</output></label>
    <input type="range" id="voi_bL" min="-2" max="10" step="0.1" value="1.0"/>
    <label>节点 R：A 的支付 <output id="voi_aRO">0.0</output></label>
    <input type="range" id="voi_aR" min="-2" max="10" step="0.1" value="0.0"/>
    <label>节点 R：B 的支付 <output id="voi_bRO">2.0</output></label>
    <input type="range" id="voi_bR" min="-2" max="10" step="0.1" value="2.0"/>
  </div>
  <div class="readout">
    <div class="ro">完美信息 EU<strong id="voi_perf">2.50</strong></div>
    <div class="ro">不完美 EU<strong id="voi_imp">1.50</strong></div>
    <div class="ro">信息价值<strong id="voi_val">1.00</strong></div>
    <div id="voi_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="voi_vh">不完美下最优行动 A 或 B 无差异（EU=1.50）；拆开信息集可多得 1.00</span></div>
  </div>
  <canvas id="voiChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 不完美信息集上的最优行动

同一支付结构，只调信念 p：看 EU(A)、EU(B) 与临界信念。

临界：令 p·aL+(1−p)·aR = p·bL+(1−p)·bR ⇒ 默认参数下 p\*=0.50。

:::raw
<div class="tool" id="tool_act">
  <div class="ctrl">
    <label>信念 P(L)=p <output id="act_pO">0.50</output></label>
    <input type="range" id="act_p" min="0.05" max="0.95" step="0.01" value="0.50"/>
    <label>aL / bL / aR / bR（与模型1联动显示）</label>
  </div>
  <div class="readout">
    <div class="ro">EU(A)<strong id="act_a">1.50</strong></div>
    <div class="ro">EU(B)<strong id="act_b">1.50</strong></div>
    <div class="ro">差距 A−B<strong id="act_gap">0.00</strong></div>
    <div id="act_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="act_vh">无差异：两行动期望相同；任意混合亦可（临界 p*=0.50）</span></div>
  </div>
  <canvas id="actChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 进入博弈：类型先验阈值

在位者强类型先验 q。进入者：遇强 −1，遇弱 +1，不进入 0。EU(In)=1−2q；进入当且仅当 q&lt;0.5。

:::raw
<div class="tool" id="tool_ent">
  <div class="ctrl">
    <label>强类型先验 q <output id="ent_qO">0.30</output></label>
    <input type="range" id="ent_q" min="0.05" max="0.95" step="0.01" value="0.30"/>
    <label>遇强支付 <output id="ent_sO">-1.0</output></label>
    <input type="range" id="ent_s" min="-5" max="0" step="0.1" value="-1.0"/>
    <label>遇弱支付 <output id="ent_wO">1.0</output></label>
    <input type="range" id="ent_w" min="0" max="5" step="0.1" value="1.0"/>
  </div>
  <div class="readout">
    <div class="ro">EU(进入)<strong id="ent_eu">0.40</strong></div>
    <div class="ro">临界 q*<strong id="ent_th">0.50</strong></div>
    <div class="ro">决策<strong id="ent_dec">进入</strong></div>
    <div id="ent_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="ent_vh">q=0.30 &lt; q*=0.50 → 进入；EU=+0.40（相对不进入的 0）</span></div>
  </div>
  <canvas id="entChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 两轴分类器：场景落在哪一格

调「历史可见度」与「类型/支付是否共同知识」两个滑块，看场景落入完美×完全矩阵的哪一格，并给出教学对照例。

:::raw
<div class="tool" id="tool_cls">
  <div class="ctrl">
    <label>历史可见度（1=完美，0=很不完美） <output id="cls_visO">1.00</output></label>
    <input type="range" id="cls_vis" min="0" max="1" step="0.01" value="1.00"/>
    <label>结构共同知识度（1=完全，0=很不完全） <output id="cls_ckO">1.00</output></label>
    <input type="range" id="cls_ck" min="0" max="1" step="0.01" value="1.00"/>
  </div>
  <div class="readout">
    <div class="ro">完美性<strong id="cls_perf">完美</strong></div>
    <div class="ro">完全性<strong id="cls_comp">完全</strong></div>
    <div class="ro">象限<strong id="cls_quad">① 完全+完美</strong></div>
    <div id="cls_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="cls_vh">对照例：国际象棋 / 围棋（棋盘可见 + 规则与目标近似共同知识）</span></div>
  </div>
  <canvas id="clsChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 标志性产出 |
|---|---|---|
| L1 识别 | 指出信息集；分清两轴 | 一页分类表 |
| L2 计算 | VOI、临界信念、进入阈值 | 与工具误差 &lt; 0.01 |
| L3 翻译 | 现实场景 → 扩展式草图 | 含虚线与自然节点 |
| L4 设计 | 改披露规则并预测均衡移动 | 机制备选+福利直觉 |

# 30分钟最小实践

**今天就能做（成本≈0）：**

1. 在纸上画「性别战」两版：后手看得见 / 看不见（虚线）。
2. 写出两版预测：(2,1) SPE vs 混合 EU=⅔。
3. 打开本页模型 1，确认默认信息价值=1.00。
4. 把模型 3 的 q 从 0.30 拖到 0.60，观察「进入→不进入」。
5. 写一句：**「完美描述历史可见；完全描述类型与支付是否共同知识。」**

验收：能独立举出 2×2 四格各一例，并能口述 VOI=1.0 的来历。

# 7天计划

| 天 | 主题 | 产出 |
|---|---|---|
| D1 | 定义 + 两轴 | 分类表 |
| D2 | 性别战两树 | 草图 |
| D3 | VOI 手算+工具 | 数字页 |
| D4 | 进入博弈 | 阈值推导 |
| D5 | Harsanyi 变换 | 一页笔记 |
| D6 | Kuhn / 完美回忆 | 对比段 |
| D7 | 生活案例归档 | 3 个场景卡片 |

# 30天计划

| 周 | 焦点 | 里程碑 |
|---|---|---|
| W1 | 画树肌肉 | 10 棵含信息集的树 |
| W2 | 信念与 VOI | 5 个数值练习全过 |
| W3 | 不完全信息 | 拍卖/谈判各一则 Harsanyi 草图 |
| W4 | 精炼入门 | 读懂「为何要 PBE/序贯均衡」并写半页 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 信息集 | 不可区分决策节点的集合 |
| 2 | 完美信息 | 全体信息集单点 |
| 3 | 完全信息 | 支付与规则共同知识 |
| 4 | 不完美信息扩展式 | 虚线连接同信息集 |
| 5 | 行为策略 | 每个信息集上的独立随机 |
| 6 | Kuhn 定理 | 完美回忆下混合≡行为 |
| 7 | Harsanyi 变换 | 不完全→完全但不完美 |
| 8 | 子博弈 | 不能切开信息集的子树 |
| 9 | 完美贝叶斯 / 序贯均衡 | 策略+信念的联合精炼 |
| 10 | 信息价值 | 拆开信息集带来的期望增益 |

# 关键问题清单

:::details Q1 信息集到底是什么？
某参与人决策时无法区分的节点集合；节点须属同一人，且行动菜单相同。【事实】

:::

:::details Q2 完美和完全差在哪？
完美：历史是否可见；完全：支付/类型是否共同知识。正交。【事实】

:::

:::details Q3 为什么同时博弈要画虚线？
把「后手看不见先手」编码为多节点信息集。【事实】

:::

:::details Q4 不完全信息是不是没救？
不是。Harsanyi 用自然抽类型 + 共同先验改写。【事实】

:::

:::details Q5 什么时候不能用反向归纳？
存在非单点信息集、或子博弈切不动时，经典反向归纳不够，需更一般均衡概念。【分析】

:::

:::details Q6 Kuhn 定理要什么条件？
完美回忆（通常还讨论有限博弈）。【事实】

:::

:::details Q7 信息价值会不会为负？
单人决策框架下标准 VOI≥0；战略互动中「被迫公开」可损害某方。【分析】

:::

:::details Q8 扑克是完全还不完美？
通常规则与支付结构已知（偏完全），但手牌不可见（不完美）。若还不知对方风险偏好，则叠加不完全。【分析】

:::

:::details Q9 信念从哪来？
先验 + 贝叶斯更新；均衡外信念由精炼约束。【分析】

:::

:::details Q10 下一步学什么？
贝叶斯纳什、完美贝叶斯均衡、信号博弈、机制设计中的信息披露。
:::

# 下一阶段探索

- **策略（Strategy）**：信息集上如何规定完整行动方案（纯/混合/行为）。
- **纳什均衡与精炼**：有了信息结构之后，哪些剖面站得住。
- **信号博弈**：内生产生信息集信念的经典舞台。
- **机制设计**：直接选择「让谁看见什么」。

本手册把「决策时知道什么」钉死；下一本把「在每个信息集上如何承诺行动」钉死。

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 信息集定义（同参与人、不可区分、行动一致） | 教材/讲义 | MIT 17.810 Lecture 4；Osborne–Rubinstein 相关章节转述 | 【事实】 |
| 完美 vs 不完全信息区分 | 诺奖讲演/百科 | Harsanyi Nobel Lecture；Wikipedia Perfect / Complete information | 【事实】 |
| 信息范畴：perfect / complete / certainty / asymmetric | 课程讲义 | Slantchev UCSD PS203b Extensive-Form notes | 【事实】 |
| Kuhn 定理（完美回忆下混合≡行为） | 经典结果 | Kuhn (1953)；教材综述 | 【事实】 |
| Harsanyi 变换与贝叶斯博弈 | 经典论文 | Harsanyi (1967–68) Management Science 系列；Nobel Lecture | 【事实】 |
| 性别战信息集例子 | 百科/教材 | 中文维基「信息集」性别战两树；标准教材 | 【事实】 |
| VOI / 进入阈值数值 | 自算 | node 验算默认参数 | 【推论】 |
| 战略透明度与信息租金 | 机制设计直觉 | 作者归纳 | 【分析】 |
| 现实遗忘 ≈ 不完美回忆程度 | 行为观察 | 场景依赖 | 【待验证】 |

标记约定：【事实】多方一致或经典定理；【分析】权威判断或稳健框架；【推论】由模型推导的数字；【假设】未验证；【待验证】单一来源或转述链长。

# 免责声明 {.appendix}

本手册是博弈论「信息集 / 完美信息 / 完全信息」概念的认知与实践框架，用于建立扩展式建模与分类直觉，**不是**投资建议、谈判话术保证、赌博必胜法或任何对抗性场景的操作保证。文中数值来自标准教学例子与公开学术文献；现实信息结构、类型分布与制度约束会导致结论变化。棋牌与市场案例仅作机制说明。决策后果由读者自行承担。
