---
slug: 共同代理与多任务委托：可测任务被过度激励，不可测任务被忽视（教育、KPI 扭曲的根源）
title: 共同代理与多任务委托：可测任务被过度激励
subtitle: 当代理人同时做多件事，只给<strong>可测任务</strong>强激励，就会系统性挤出<strong>不可测但更重要</strong>的任务——教育应试、KPI 崇拜、医患博弈同构。
brand_sub: Multitask Agency × KPI Distortion
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 组织设计框架非投资建议
date: 2026-09-20
data_asof: 2026 年 9 月
tags: [博弈论, 多任务委托, Holmström-Milgrom, KPI, Goodhart, Campbell, 教育, 激励扭曲]
theme_js_file: 共同代理与多任务委托：可测任务被过度激励，不可测任务被忽视（教育、KPI 扭曲的根源）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**多任务委托代理（Multitask Principal–Agent）**：代理人同时承担多项任务，而不同任务的**可测性**不对称。给可测任务加码，会把稀缺注意力从难测任务上抽走——哪怕后者对委托人更有价值。【事实】

Holmström–Milgrom（1991）的核心结论不是「别用激励」，而是：

> **对任一活动的最优激励强度，随与之竞争注意力的其他活动「越难测」而下降。** 当难测任务足够重要时，**固定工资（弱激励）可以是最优**——反对「用考试分数发奖金」的人，与合同理论站在同一侧。【事实】

表层现象叫 KPI 扭曲、应试教育、刷单、唯论文；底层机制是同一把刀：**激励在重新分配注意力，而不只是抬总努力**。

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「怎么定 KPI 才公平」，而是：**在多维努力与不对称测量下，激励如何扭曲努力配置，以及如何用合同、岗位设计、所有权把扭曲压回去**。

边界：

- **在界内**：努力替代/互补、测量噪声、激励强度平衡、岗位拆分、资产所有权、公共部门弱激励。
- **在界外**：某次绩效面谈话术、某张 KPI 表的排版——除非压成「哪项可测、哪项被挤、β 该升还是降」。

与相邻主题分工：单任务道德风险讲「努力不足」；本手册讲「努力错位」。Baker（1992）补一句：即使风险中性，**错误的绩效指标**也会制造扭曲。【事实】

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 多任务下激励如何配置注意力 |
| 2 | 边界在哪 | 到「测量—激励—配置—价值」闭环可形式化 |
| 3 | 核心对象 | 任务集、可测信号、激励向量 β、岗位边界 |
| 4 | 参与者 | 委托人；多任务代理人；多委托人（公共部门） |
| 5 | 关键变量 | β_i、σ_i²、替代强度 γ、任务价值 B_i |
| 6 | 可直接观察 | 考试分、论文数、销售额、点击率、处理时长 |
| 7 | 无法直接观察 | 深层教学、护理质量、创新探索、诚信、协作 |
| 8 | 谁影响谁 | β → 努力配置 → 可测分↑ / 真价值? → 委托人收益 |
| 9 | 因果关系 | 可测性不对称 ⇒ 激励不对称 ⇒ 配置扭曲 |
| 10 | 只是相关 | 「高绩效文化」≠ 多任务已平衡【分析】 |
| 11 | 表层现象 | 应试、唯 KPI、刷指标、重科研轻教学 |
| 12 | 底层机制 | 注意力预算 + 局部激励梯度 |
| 13 | 有反馈吗 | 有。指标被博弈后更失真（Goodhart / Campbell）【事实】 |
| 14 | 有延迟吗 | 有。难测任务往往是长期资产（声誉、能力、文化） |
| 15 | 正/负反馈 | 指标崇拜可正反馈崩溃；岗位拆分/弱激励可负反馈矫正 |

## 最关键的一句话

> 先问「哪些重要任务测不准」，再决定能不能对可测项加码——否则你在用奖金买一份更漂亮、更空心的报表。

# 为什么值得研究

:::cards g3
### 它解释「激励越强，结果越糟」
单任务直觉：β↑ → 努力↑ → 价值↑。多任务里：β_可测↑ → 可测↑、难测↓ → **总价值可能下降**。【事实】

### 它是教育与组织的共用操作系统
应试、高校「重科研轻教学」、医院按项目收费、客服按通话量、平台按点击——同一结构。【分析】

### 它连接 2016 诺奖与日常 KPI
Holmström 合同理论的多任务分支，直接回答「为什么公司里激励条款比教科书少」。【事实】
:::

:::note amber 最贵的一次误判
把「难测任务做得差」当成「人懒、文化差」，于是继续加可测 KPI——等于在油门上再踩一脚，把剩余注意力也轧扁。【分析】
:::

# 世界地图

九层从「注意力预算」爬到「制度与指标治理」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="mtArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 制度层 · 考核立法 / 审计 / 指标治理 / 反博弈</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 实证识别 · 高利害考试 / 工厂多任务实验 / 公共部门案例</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 动态扩展 · 关系合同 / 职业关注 / 多委托人 Dixit</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 跨域同构 · 教育 · 医疗 · 研发 · 客服 · ESG 指标</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 均衡结局 · 可测过度 · 难测枯竭 · 指标失真</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 应用原型 · 教师 / 医生 / 销售 / 公务员 / 平台运营</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 解概念 · 弱激励最优 · 激励平衡 · 岗位拆分 · 所有权</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 机制原语 · 注意力替代 γ · 信号噪声 σ · 价值权重 B</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 问题原语 · 多任务 + 可测性不对称 + 稀缺注意力</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2–L3**：会算「加 β 会挤谁」；进阶卡在 **L5–L7**：识别指标已失真，并在岗位设计/弱激励/主观评价间选型。【分析】
:::

# 核心概念地图

从抽象价值到可操作旋钮。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="60" y="16" width="560" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">真价值 V=Σ Bᵢ tᵢ  ←  激励 β 只钉住可测信号 x</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">多维努力配置</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">β · σ · γ · 岗位</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">KPI·拆岗·弱激励</text>

  <line x1="280" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="180" width="180" height="70" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">可测 t_m / 难测 t_u</text><text x="130" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">注意力互相挤占</text>
  <rect x="250" y="180" width="180" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">线性合同 + 风险</text><text x="340" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">β* 随难测性下降</text>
  <rect x="460" y="180" width="180" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="208" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">诊断三问</text><text x="550" y="228" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">测得准？挤谁？值多少？</text>

  <line x1="130" y1="146" x2="130" y2="180" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="146" x2="340" y2="180" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="550" y1="146" x2="550" y2="180" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <path d="M220 215 H250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <path d="M430 215 H460" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <text x="340" y="280" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">红虚线 = 反馈：指标被博弈 → 信号更噪 → 更应弱化 β</text>
  <text x="340" y="310" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">跨域同构：Goodhart「测度变目标即失效」≈ 多任务挤出</text>
  <text x="340" y="340" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">Campbell 定律 ≈ 高利害社会指标的腐败压力【事实】</text>
</svg>
:::

# 核心参与者

| 角色 | 目标 | 信息位置 | 典型工具 |
|---|---|---|---|
| 委托人（校长/CEO/监管） | max 多维真价值 | 只看见部分信号 | 合同、KPI、拆岗、所有权 |
| 代理人（教师/员工） | max 报酬 − 努力成本 | 知道自己如何分配时间 | 应试、刷数、表面合规 |
| 多委托人（Dixit） | 各自维度互相冲突 | 公共部门尤甚 | 互相否决 → 弱激励【事实】 |
| 审计 / 公众 | 防止指标腐败 | 事后抽检 | 多指标、过程审计 |

# 核心变量

| 变量 | 符号 | 系统作用 |
|---|---|---|
| 可测努力 / 难测努力 | \(t_m, t_u\) | 配置结果；真价值 \(V=B_m t_m+B_u t_u\) |
| 激励强度 | \(\beta_m, \beta_u\) | 局部梯度；难测常 \(\beta_u\approx 0\) |
| 替代强度 | \(\gamma\in[0,1)\) | 越大，加 \(\beta_m\) 越狠挤 \(t_u\) |
| 测量噪声 | \(\sigma_m^2,\sigma_u^2\) | \(\sigma_u\to\infty\) 时难测不可缔约 |
| 任务价值 | \(B_m,B_u\) | 委托人真正在乎的权重 |
| 内在动机 | \(\iota\) | 职业伦理底仓；可被强外激励挤出【分析】 |
| 风险厌恶 × 噪声 | \(r\sigma^2\) | 抬高激励的保险成本 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="130" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="85" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">可测性不对称</text>
  <rect x="180" y="30" width="130" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="245" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">只给 β_m 加码</text>
  <rect x="340" y="30" width="130" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="405" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">注意力重配</text>
  <rect x="500" y="30" width="150" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="575" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">t_m↑ t_u↓</text>

  <line x1="150" y1="55" x2="180" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="310" y1="55" x2="340" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="470" y1="55" x2="500" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>

  <rect x="100" y="140" width="150" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="175" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">报表 / 分数变好看</text>
  <rect x="320" y="140" width="150" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="395" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">真价值可能下降</text>
  <rect x="500" y="140" width="150" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="575" y="170" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">再加码 / 指标腐败</text>

  <line x1="575" y1="80" x2="575" y2="140" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="250" y1="165" x2="320" y2="165" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <path d="M575 190 V250 H245 V80" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" fill="none" marker-end="url(#cfB)"/>
  <text x="340" y="280" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">实线因果；红虚线 = Goodhart 正反馈（越考核越失真）</text>
  <text x="340" y="305" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">Holmström–Milgrom：难测任务重要 ⇒ 可测项也应弱激励【事实】</text>
</svg>
:::

因果链（压缩版）：

1. 任务竞争同一注意力预算（\(\gamma>0\)）；
2. 只有 \(x_m\) 进入合同 ⇒ \(\beta_m\) 成为局部最陡梯度；
3. \(t_m\) 上升、\(t_u\) 被挤；
4. 报表改善掩盖真价值损失；委托人误读为「激励有效」再加码。

# 隐藏关系

:::cards g2
### 关系 1：弱激励是功能，不是偷懒
固定工资在多任务世界里保护难测维度——反对「绩效主义原教旨」的理论依据。【事实】

### 关系 2：岗位设计 = 激励工具
把易测与难测拆到不同人/岗，才能对易测岗给强激励而不伤害难测。【事实】

### 关系 3：所有权替代测量
资产增值难测时，让代理人持有资产回报，可内生化维护激励（HM 1991 第二支柱）。【事实】

### 关系 4：多委托人互相否决
Dixit（2002）：公共部门多任务 + 多利益相关方 ⇒ 高能激励几乎必然制造功能障碍。【事实】

### 关系 5：内在动机是「隐形 β_u」
职业伦理等价于难测任务的软激励；外激励过强可能挤出（crowding-out）。【分析】

### 关系 6：指标失真有时滞
短期分数上涨与长期能力折旧不同步——政治周期偏好前者。【推论】
:::

# 系统运行机制

最小工作模型（二次成本 + 交叉替代）：

\(C(t_m,t_u)=\frac{t_m^2+t_u^2}{2}+\gamma t_m t_u,\ 0\le\gamma<1\)

代理人面对 \(w=\alpha+\beta_m x_m+\beta_u x_u\)（难测时常 \(\beta_u=0\) 或仅剩内在 \(\iota\)），一阶条件给出：

\(t_m=\frac{\beta_m-\gamma\beta_u}{1-\gamma^2},\quad t_u=\frac{\beta_u-\gamma\beta_m}{1-\gamma^2}\)

（边界处截断为非负。）要点：

- \(\partial t_u/\partial\beta_m=-\gamma/(1-\gamma^2)<0\)：加可测激励**直接减少**难测努力；
- \(\gamma=0.5\) 时，\(\partial t_u/\partial\beta_m=-0.667\)，\(\partial t_m/\partial\beta_m=1.333\)——挤出弹性很大。【事实】

委托人目标（示意）：

\(\max_{\beta}\; B_m t_m+B_u t_u-\frac12 r\sigma_m^2\beta_m^2\)

当 \(B_u\) 高、\(\gamma\) 高、\(\sigma_u\) 大时，最优 \(\beta_m\) 可以是 **0**。教育型参数（\(B_m=0.45,B_u=0.55,\gamma=0.5,\iota=0.25,r\sigma^2=1\)）下，数值最优 \(\beta_m^*=0\)，净价值 \(0.1375\)；若强行 \(\beta_m=0.9\)，难测努力被挤到 0，报表好看但激励的保险成本与配置扭曲同时恶化。【推论】

:::raw
<div class="tool" id="tool_alloc">
  <h3>可调模型 1 · 注意力挤出（多任务配置）</h3>
  <div class="ctrl">
    <label>可测激励 β_m <output id="al_bmO">0.90</output></label>
    <input type="range" id="al_bm" min="0" max="1.5" step="0.05" value="0.90">
    <label>难测激励 β_u（含内在动机） <output id="al_buO">0.20</output></label>
    <input type="range" id="al_bu" min="0" max="1" step="0.05" value="0.20">
    <label>替代强度 γ <output id="al_gO">0.50</output></label>
    <input type="range" id="al_g" min="0" max="0.85" step="0.05" value="0.50">
  </div>
  <div class="readout">
    <div class="ro">可测努力 t_m <b id="al_tm">—</b></div>
    <div class="ro">难测努力 t_u <b id="al_tu">—</b></div>
    <div class="ro">挤出比 |Δt_u/Δβ_m| <b id="al_el">—</b></div>
    <div id="al_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"></div>
  </div>
  <canvas id="alChart" height="214"></canvas>
</div>
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="200" x2="640" y2="200" stroke="#e2e6ec" stroke-width="2"/>
  <circle cx="80" cy="200" r="8" fill="#0f8a4d"/><text x="80" y="230" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">T0 引入KPI</text>
  <circle cx="200" cy="160" r="8" fill="#1d4ed8"/><text x="200" y="145" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">分数↑</text><text x="200" y="230" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">T1 报表蜜月</text>
  <circle cx="340" cy="120" r="8" fill="#b8730a"/><text x="340" y="105" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">教学变窄</text><text x="340" y="230" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">T2 挤出显形</text>
  <circle cx="480" cy="90" r="8" fill="#d5342c"/><text x="480" y="75" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">指标被博弈</text><text x="480" y="230" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">T3 Goodhart</text>
  <circle cx="600" cy="140" r="8" fill="#7c848f"/><text x="600" y="125" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">改革/回摆</text><text x="600" y="230" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">T4 弱化或拆岗</text>
  <path d="M88 195 L192 165" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tmA)"/>
  <path d="M208 155 L332 125" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tmA)"/>
  <path d="M348 115 L472 95" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tmA)"/>
  <path d="M488 95 L592 135" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tmA)"/>
  <text x="340" y="40" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">典型时间线：蜜月 → 挤出 → 指标腐败 → 被迫回调</text>
</svg>
:::

Nichols & Berliner 等对高利害考试的综述表明：课程窄化、teaching to the test、甚至舞弊，是高利害量化指标的系统性后果，而不是个别「师德问题」。【待验证】（具体比例随国家与学段变化，不宜当作全球常数。）

# 利益与激励

| 主体 | 显性激励 | 隐性激励 | 扭曲方向 |
|---|---|---|---|
| 学校管理者 | 排名、拨款、问责 | 政治任期 | 推可测分数 |
| 教师 | 奖金、评职称 | 职业声誉、内在动机 | 向考试科目倾斜 |
| 学生/家长 | 升学 | 长期能力 | 短期分 vs 长期成长冲突 |
| 企业中层 | KPI 奖金 | 晋升锦标赛 | 刷可控指标 |
| 监管者 | 「可问责」政绩 | 避免丑闻 | 偏好可审计数字 |

:::note red 激励冲突的核心
管理者的「可展示政绩」与组织的「难测真价值」往往负相关——多任务模型预测的不是偶尔失灵，而是**结构性地偏好可测**。【分析】
:::

# 资源与信息流

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="30" y="40" width="140" height="70" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="100" y="70" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">注意力 / 时间</text><text x="100" y="92" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">稀缺总预算</text>
  <rect x="270" y="20" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="50" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">可测任务池</text>
  <rect x="270" y="90" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">难测任务池</text>
  <rect x="500" y="20" width="150" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="575" y="50" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">KPI / 分数</text>
  <rect x="500" y="90" width="150" height="50" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="575" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">真价值 / 长期资产</text>

  <line x1="170" y1="60" x2="270" y2="45" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <line x1="170" y1="90" x2="270" y2="115" stroke="#b8730a" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#flA)"/>
  <line x1="410" y1="45" x2="500" y2="45" stroke="#d5342c" stroke-width="2" marker-end="url(#flB)"/>
  <line x1="410" y1="115" x2="500" y2="115" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#flA)"/>

  <rect x="150" y="190" width="380" height="70" rx="8" fill="#15181d"/><text x="340" y="220" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">奖金 / 排名 / 拨款  ←抽水←  只认可测池的产出</text><text x="340" y="242" text-anchor="middle" fill="#9aa3ad" font-size="11" font-family="sans-serif">信息流：难测池的信号进不了合同 → 资源被可测池虹吸</text>
</svg>
:::

资源流一句话：**钱跟着指标走；注意力跟着钱走；难测任务既没信号也没钱。**

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 秩 | 杠杆 | 为什么高杠杆 | 操作入口 |
|---|---|---|---|
| 1 | 先列难测清单再定 β | 防止对空心指标加码 | 写「不可牺牲清单」 |
| 2 | 降低可测项激励强度 | HM 核心药方 | 固定工资 + 主观评价 |
| 3 | 岗位拆分（易测/难测分离） | 恢复强激励的合法域 | 专岗 vs 综合岗 |
| 4 | 多指标 + 低权重 | 提高博弈成本 | 仪表盘而非北极星 |
| 5 | 过程审计 / 抽检 | 部分恢复难测可验证性 | 课堂观察、病例抽查 |
| 6 | 资产/剩余索取权 | 内生化长期维护 | 合伙、长期激励 |
| 7 | 保护内在动机 | 守住隐形 β_u | 少用侮辱性计件 |
| 8 | 缩短反馈但拉长考核窗 | 抗政治周期 | 多年度评估 |
| 9 | 相对绩效慎用于多任务 | 噪音大时加剧博弈 | 标尺竞争适用边界 |
| 10 | 指标日落条款 | 对抗 Goodhart 老化 | 每 12–24 月轮换 |

:::raw
<div class="tool" id="tool_opt">
  <h3>可调模型 2 · 最优可测激励 β_m*</h3>
  <div class="ctrl">
    <label>可测价值 B_m <output id="op_BmO">0.45</output></label>
    <input type="range" id="op_Bm" min="0.1" max="1" step="0.05" value="0.45">
    <label>难测价值 B_u <output id="op_BuO">0.55</output></label>
    <input type="range" id="op_Bu" min="0.1" max="1" step="0.05" value="0.55">
    <label>替代 γ <output id="op_gO">0.50</output></label>
    <input type="range" id="op_g" min="0" max="0.85" step="0.05" value="0.50">
    <label>难测底仓 ι <output id="op_iO">0.25</output></label>
    <input type="range" id="op_i" min="0" max="0.8" step="0.05" value="0.25">
    <label>风险成本 rσ² <output id="op_rsO">1.00</output></label>
    <input type="range" id="op_rs" min="0.2" max="3" step="0.1" value="1.0">
  </div>
  <div class="readout">
    <div class="ro">最优 β_m* <b id="op_bstar">—</b></div>
    <div class="ro">最大净价值 <b id="op_vmax">—</b></div>
    <div class="ro">若 β=0.9 的净价值 <b id="op_v90">—</b></div>
    <div id="op_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"></div>
  </div>
  <canvas id="opChart" height="214"></canvas>
</div>
:::

# 常见认知陷阱

:::details 1. 「有指标总比没指标好」
错。错误指标 + 高利害 = 比没指标更糟（配置扭曲 + 信号腐蚀）。【分析】
:::

:::details 2. 「分数涨了就是教育变好了」
分数是 \(x_m\)，不是 \(V\)。蜜月期最容易自欺。【事实】
:::

:::details 3. 「不愿意绩效工资 = 抵制改革」
可能是理性保护难测任务——与 HM 1991 同向。【事实】
:::

:::details 4. 「再加一个 KPI 就能补上漏洞」
新 KPI 仍占注意力；KPI 森林会制造新的可测偏置。【分析】
:::

:::details 5. 「销售提成很成功，所以教师也该提成」
销售的难测维相对弱；教学的难测维是主菜。结构不同，药不能照搬。【分析】
:::

:::details 6. 「把难测也量化就完了」
强行量化会把难测变成可测的赝品（rubric 游戏）。【推论】
:::

:::details 7. 「内在动机靠洗脑」
内在动机会被侮辱性外激励挤出；制度要先「不伤害」。【分析】
:::

:::details 8. 「只要权重设对就行」
权重写在纸上，梯度写在钱上——代理人跟的是钱的梯度。【事实】
:::

:::details 9. 「公共部门就该学习企业 KPI」
Dixit：多委托人下高能激励尤其危险。【事实】
:::

:::details 10. 「发现问题就加大处罚」
处罚加在可测违规上，可能进一步把行为赶进更难审计的灰色区。【推论】
:::

:::details 11. 「北极星指标能对齐组织」
单指标在多任务世界几乎必然制造目标替代（Campbell / Goodhart）。【事实】
:::

<!-- nav:现实与行动 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="abA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="30" width="200" height="220" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="120" y="60" text-anchor="middle" fill="#0f8a4d" font-size="13" font-weight="700" font-family="sans-serif">抽象</text>
  <text x="120" y="100" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">β 改变努力配置</text>
  <text x="120" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">γ 决定挤出强度</text>
  <text x="120" y="160" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">B_u 高 ⇒ β_m 宜弱</text>
  <text x="120" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">拆岗恢复强激励域</text>

  <rect x="240" y="30" width="200" height="220" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="340" y="60" text-anchor="middle" fill="#1d4ed8" font-size="13" font-weight="700" font-family="sans-serif">机制</text>
  <text x="340" y="100" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">合同只写可验证项</text>
  <text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">主观评价补难测</text>
  <text x="340" y="160" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">关系合同 / 声誉</text>
  <text x="340" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">所有权内生化长期</text>

  <rect x="460" y="30" width="200" height="220" rx="10" fill="#fff7e6" stroke="#b8730a"/>
  <text x="560" y="60" text-anchor="middle" fill="#b8730a" font-size="13" font-weight="700" font-family="sans-serif">操作</text>
  <text x="560" y="100" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">列不可牺牲清单</text>
  <text x="560" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">砍单一高利害指标</text>
  <text x="560" y="160" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">易测岗 / 难测岗拆开</text>
  <text x="560" y="190" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">指标设日落期</text>

  <line x1="220" y1="140" x2="240" y2="140" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#abA)"/>
  <line x1="440" y1="140" x2="460" y2="140" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#abA)"/>
</svg>
:::

| 领域 | 可测 | 常被挤的难测 | 典型扭曲 |
|---|---|---|---|
| K-12 教育 | 统考分 | 创造力、品格、实验课 | teaching to the test【事实】 |
| 高校 | 论文/项目 | 教学投入、 mentorship | 重科研轻教学【分析】 |
| 医疗 | 项目量、药占比 | 沟通、过度医疗抑制 | 诱导需求【待验证】 |
| 客服 | 通话量、AHT | 一次解决率、温度 | 催挂电话 |
| 研发 | 提交数、故事点 | 探索、技术债偿还 | 局部最优刷点 |
| ESG | 披露分项 | 真实减排/治理 | 评级游戏【分析】 |

# 从理论到行动

:::flow
<span>列出任务</span><i>→</i><span>标可测性</span><i>→</i><span class="hi">标真价值 B</span><i>→</i><span>画挤出风险</span><i>→</i><span>选：弱激励 / 拆岗 / 多指标</span>
:::

行动清单（个人/管理者通用）：

1. 写一张两列表：可测 vs 难测，并给 \(B\) 粗分；
2. 对 \(B_u\) 高且 \(\gamma\) 高的组合，**禁止**单一高利害奖金；
3. 能拆岗就拆；不能拆就降 β、加主观与抽检；
4. 给每个指标写「失效征兆」与日落日。

# 技能树

:::details Ⅰ 识别层
会指出任何绩效方案里的「可测/难测」分裂；能讲清 HM 一句话结论。
:::

:::details Ⅱ 建模层
会用 \(t_m,t_u,\gamma,\beta\) 估计挤出方向；会比较「加码 vs 弱化」的净值。
:::

:::details Ⅲ 设计层
能提出拆岗方案、多指标权重、主观评价治理（防裙带）。
:::

:::details Ⅳ 治理层
能设计指标审计、日落、反博弈机制；能在多委托人下谈判弱激励共识。
:::

# 游戏化世界

你扮演「制度设计师」。地图上有两座矿：**金矿（可测）**与**黑土（难测）**。你只能给金矿发镐——镐越利，黑土越荒。通关条件不是金矿产量最高，而是 **金+土的加权总分** 最高。隐藏 BOSS 叫 Goodhart：当你把金矿产量设为唯一通关条件，金矿数字会飙，地图真实肥力下降。

# 任务系统

| 任务 | 难度 | 产出 |
|---|---|---|
| 解剖自己团队的 5 个 KPI | ★☆☆ | 可测/难测表 |
| 找一个「分数涨、体验跌」案例 | ★★☆ | 挤出叙事 |
| 设计一版「弱激励 + 抽检」替代案 | ★★★ | 一页纸方案 |
| 推动一个指标日落 | ★★★★ | 制度改动 |

# 反事实模拟

:::tabs
@@若只强化可测激励
报表蜜月 → 难测枯竭 → 指标博弈 → 信任崩溃。教育型参数下 \(\beta_m=0.9\) 常把 \(t_u\) 挤到 0。【推论】

@@若改为固定工资 + 抽检
短期可测分可能下降，难测维回升；适合 \(B_u\) 高的岗位。HM 明示此为可能最优。【事实】

@@若拆成两个专岗
易测岗可给强 β；难测岗用职业规范/主观评价。强激励重新变得「合法」。【事实】

@@若再加 10 个 KPI
注意力碎片化；出现「KPI 森林」——每个都弱，但整体仍偏可测、且协调成本爆炸。【分析】
:::

:::raw
<div class="tool" id="tool_gh">
  <h3>可调模型 3 · Goodhart 仪表盘（测度 vs 真价值）</h3>
  <div class="ctrl">
    <label>可测激励 β_m <output id="gh_bO">0.80</output></label>
    <input type="range" id="gh_b" min="0" max="1.5" step="0.05" value="0.80">
    <label>难测底仓 ι <output id="gh_iO">0.25</output></label>
    <input type="range" id="gh_i" min="0" max="0.8" step="0.05" value="0.25">
    <label>真价值中可测权重 B_m <output id="gh_BmO">0.40</output></label>
    <input type="range" id="gh_Bm" min="0.1" max="0.9" step="0.05" value="0.40">
    <label>替代 γ <output id="gh_gO">0.50</output></label>
    <input type="range" id="gh_g" min="0" max="0.85" step="0.05" value="0.50">
  </div>
  <div class="readout">
    <div class="ro">测度分数（≈t_m） <b id="gh_meas">—</b></div>
    <div class="ro">真价值 V <b id="gh_true">—</b></div>
    <div class="ro">虚胖缺口 测度−V <b id="gh_gap">—</b></div>
    <div id="gh_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"></div>
  </div>
  <canvas id="ghChart" height="214"></canvas>
</div>
:::

<!-- nav:能力与计划 -->
# 四级能力路线

| 级别 | 名称 | 你能做到 |
|---|---|---|
| L1 | 侦察兵 | 指出任何方案的可测偏置 |
| L2 | 分析师 | 用挤出弹性讲清「为什么越奖越歪」 |
| L3 | 设计师 | 交付弱激励/拆岗/多指标可执行方案 |
| L4 | 治理者 | 建立指标生命周期与反博弈制度 |

# 30分钟最小实践

1. 选一个你正在用的绩效规则（工作/学习/家庭家务也行）；
2. 列出 ≥4 项任务，标「可测 / 难测」与粗 \(B\)；
3. 圈出 \(B\) 高且难测的 1–2 项——问：当前激励是否在挤它们？
4. 写下一句改动：**降某个 β / 拆某岗 / 加一次抽检**；
5. 把改动告诉一个利益相关者，收集 1 条反对意见（这是压力测试）。

成本≈0；产出=一张可验证的「挤出风险表」。

# 7天计划

| 天 | 主题 | 交付 |
|---|---|---|
| D1 | 读 HM 1991 引言与命题直觉 | 5 条笔记 |
| D2 | 解剖本团队 KPI | 可测/难测表 |
| D3 | 跑本页三个滑块 | 截图+参数记录 |
| D4 | 找一个 Goodhart 案例 | 200 字 |
| D5 | 草拟弱激励替代 | 一页纸 |
| D6 | 讨论拆岗可行性 | 利弊表 |
| D7 | 复盘：哪条杠杆最可行 | 决策 |

# 30天计划

| 周 | 焦点 | 里程碑 |
|---|---|---|
| W1 | 诊断 | 完成全量 KPI 审计 |
| W2 | 设计 | 2 套替代机制（弱激励 / 拆岗） |
| W3 | 试点 | 选 1 个低风险单元试点 2 周 |
| W4 | 固化 | 写指标日落与抽检SOP |

<!-- nav:模型与下一步 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | Holmström–Milgrom 多任务 | 难测重要 ⇒ 可测也应弱激励 |
| 2 | 注意力替代 \(\gamma\) | 加 \(\beta_m\) 直接减 \(t_u\) |
| 3 | Baker 绩效测度扭曲 | 错指标在风险中性下仍扭曲 |
| 4 | Goodhart 定律 | 测度变目标即失效 |
| 5 | Campbell 定律 | 高利害社会指标易腐败 |
| 6 | 岗位设计分离 | 易测/难测拆开以恢复强激励 |
| 7 | 资产所有权 | 难测增值靠剩余索取权 |
| 8 | Dixit 公共部门 | 多委托人 ⇒ 宜弱激励 |
| 9 | 内在动机挤出 | 过强外激励伤害 \(\iota\) |
| 10 | 关系合同 | 主观评价 + 声誉补契约空洞 |

:::raw
<div class="tool" id="tool_job">
  <h3>可调模型 4 · 岗位设计：捆绑 vs 拆分</h3>
  <div class="ctrl">
    <label>捆绑时 β_m <output id="jb_bO">0.70</output></label>
    <input type="range" id="jb_b" min="0" max="1.2" step="0.05" value="0.70">
    <label>拆分后易测岗 β_m <output id="jb_bsO">0.70</output></label>
    <input type="range" id="jb_bs" min="0" max="1.2" step="0.05" value="0.70">
    <label>B_m / B_u <output id="jb_BmO">0.45</output> / <output id="jb_BuO">0.55</output></label>
    <input type="range" id="jb_Bm" min="0.1" max="0.9" step="0.05" value="0.45">
    <label>捆绑替代 γ <output id="jb_gO">0.55</output></label>
    <input type="range" id="jb_g" min="0" max="0.85" step="0.05" value="0.55">
    <label>难测岗内在 ι <output id="jb_iO">0.35</output></label>
    <input type="range" id="jb_i" min="0.05" max="0.8" step="0.05" value="0.35">
  </div>
  <div class="readout">
    <div class="ro">捆绑净价值 <b id="jb_vb">—</b></div>
    <div class="ro">拆分净价值 <b id="jb_vs">—</b></div>
    <div class="ro">拆分增益 <b id="jb_gain">—</b></div>
    <div id="jb_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap"></div>
  </div>
  <canvas id="jbChart" height="214"></canvas>
</div>
:::

# 关键问题清单

:::details 我的岗位有几项难测任务？B_u 是否被系统性低估？
:::

:::details 当前唯一高利害指标是什么？失效征兆出现了吗？
:::

:::details 若把 β_m 砍半，最怕丢的是什么？那是真价值还是报表？
:::

:::details 能否把易测工作外包/专岗化，让核心岗回到弱激励？
:::

:::details 主观评价的治理（多评委、抽样、申诉）准备好了吗？
:::

:::details 公共部门场景是否误用了企业式高能 KPI？
:::

:::details 内在动机还在吗？最近的计件/排名是否在挤出它？
:::

:::details 指标的日落日写在哪？谁有权杀死一个 KPI？
:::

:::details 多委托人是否在互相否决，导致「只能搞形式指标」？
:::

:::details 长期资产（文化、安全、信任）有没有代理人？
:::

# 下一阶段探索

- 精读 Holmström–Milgrom（1991）全文与 Holmström–Milgrom（1987）线性合同基础；
- Baker（1992）*Incentive Contracts and Performance Measurement*；
- Dixit（2002）公共部门激励综述；
- 与「关系合同 / 声誉模型」手册交叉：主观评价如何自我执行；
- 实证：Hong et al. 中国工厂多任务田野实验等——测「加码可测是否伤害难测」。【待验证】

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 多任务激励与弱激励最优 | 经典论文 | Holmström & Milgrom, JLEO 1991 | 【事实】 |
| 绩效测度不等于目标 | 经典论文 | Baker, JPE 1992 | 【事实】 |
| 测度变目标即失效 | 方法论/转述 | Goodhart 1975；Strathern 转述 | 【事实】 |
| 高利害社会指标腐败 | 方法论 | Campbell 定律；教育应用综述 | 【事实】/【待验证】 |
| 公共部门宜弱激励 | 综述 | Dixit, JHR 2002 | 【事实】 |
| 高校重科研轻教学 | 政策评论/中文转述 | 高教评价机制讨论 | 【分析】 |
| 本页数值算例 | 自建示意模型 | 二次成本+交叉 γ；非实证估计 | 【推论】 |

标记约定：【事实】多方一致或经典原文；【分析】权威推断；【推论】模型推导；【假设】未验证；【待验证】单一来源或外推过强。

# 免责声明 {.appendix}

本手册为**组织激励与机制设计学习框架**，用于理解多任务下的激励扭曲，不构成任何人力资源管理、薪酬方案、教育政策或投资建议。文中数值为教学示意，不能直接当作某机构的最优合同参数。真实制度设计需结合劳动法规、治理结构与现场约束另行论证。
