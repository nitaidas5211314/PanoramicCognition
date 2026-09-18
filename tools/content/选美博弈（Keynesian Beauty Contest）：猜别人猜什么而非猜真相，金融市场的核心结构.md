---
slug: 选美博弈（Keynesian Beauty Contest）：猜别人猜什么而非猜真相，金融市场的核心结构
title: 选美博弈（Keynesian Beauty Contest）：猜别人猜什么而非猜真相
subtitle: 凯恩斯报纸选美：奖不在「最美」，而在<strong>猜中别人会投谁</strong>——金融市场定价的核心常常是高阶信念，不是真相本身。
brand_sub: Beauty Contest × Higher-Order Beliefs
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 选美博弈, Keynes, 高阶信念, level-k, 金融市场, Nagel, Allen-Morris-Shin]
theme_js_file: 选美博弈（Keynesian Beauty Contest）：猜别人猜什么而非猜真相，金融市场的核心结构.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**选美博弈（Keynesian Beauty Contest）**：凯恩斯《通论》第 12 章的报纸选美——参赛者不是选自己觉得最美的脸，而是选「别人最可能选的那张」。一阶是「我猜基本面」，二阶是「我猜别人猜什么」，三阶是「我猜别人猜别人猜什么」……**【事实】**（Keynes, 1936）

实验室版本是 **p-猜数游戏（guessing game）**：在 \([0,100]\) 里报一个数，最接近「全体平均数 × \(p\)」者胜。若 \(p=2/3\)、人人无限理性且共同知识，唯一纳什是 **0**；真实人第一轮往往落在 **level-1≈33.3、level-2≈22.2** 一带，几乎没人直接报 0。【事实】（Nagel, *AER* 1995）

资产市场里：短视、噪声价格、分散信息 → 今日价 ≈ 对「明日平均预期」的平均预期；**平均信念不满足迭代期望律**，公共信息被系统性超配，价格可相对基本面惯性漂移。【分析】（Allen–Morris–Shin, *RFS* 2006）

> 市场问的常常不是「值多少」，而是：**别人以为别人会出多少价**。

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「投机坏不坏」，而是：**当收益取决于他人预期时，高阶信念如何塑造价格、波动与策略深度；以及有限深度（level-k）如何解释「明明知道均衡是 0，却没人报 0」**。

边界：

- **在界内**：凯恩斯隐喻、p-猜数、level-k / 认知层级、高阶信念、公共信息超配、短视定价楔、与共同知识/协调博弈的同构。
- **在界外**：某只票的买卖点、具体荐股话术——除非压成「\(p\)、层级 \(k\)、公共信号权重、短视系数 \(\beta\)」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 猜他人预期（高阶信念）如何决定结果 |
| 2 | 边界在哪 | 到信念层级、支付规则与信息结构可形式化为止 |
| 3 | 核心对象 | \(p\)、level-k、Nash=0、公共/私人信号、\(\beta\) 短视权重 |
| 4 | 参与者 | 散户、游资、机构、做市商、媒体、指数/基准、监管 |
| 5 | 关键变量 | 推理深度 \(k\)、公共信号精度份额 \(\alpha\)、持有期/短视 \(\beta\) |
| 6 | 可直接观察 | 报价分布、成交量、媒体热度、指数成分调整、调研均值 |
| 7 | 无法直接观察 | 真实层级、他人对他人的信念、私人信息精度 |
| 8 | 谁影响谁 | 信息结构 → 超配公共；短视 → 价格楔；深度分布 → 胜出区间 |
| 9 | 因果关系 | 更高阶 → 公共权重↑；\(\beta\)↑ → 价格更跟平均意见 |
| 10 | 只是相关 | 「大家都看空」≠ 价格立刻反映基本面【分析】 |
| 11 | 表层现象 | 题材炒作、指数抱团、政策谣言脉冲、聪明钱「骑泡沫」 |
| 12 | 底层机制 | 支付绑定「猜中平均意见」而非「猜中真相」 |
| 13 | 有反馈吗 | 有。价格本身成为公共信号，再进入下一轮高阶预期 |
| 14 | 有延迟吗 | 有。基本面冲击经多层预期才渗入价格（AMS：惯性） |
| 15 | 正/负反馈 | 叙事正反馈可放大偏离；清算/到期负反馈拉回基本面 |

## 最关键的一句话

> 选美博弈的锋利处：**理性本身可以制造「偏离真相」**——只要支付函数奖励的是「猜中别人」，不是「猜中基本面」。

# 为什么值得研究

:::cards g3
### 它是金融市场的结构隐喻
凯恩斯不是在骂投机者蠢，而是指出：**当再出售价格由他人出价决定时，高阶信念进入定价方程是理性的**。【分析】

### 它有可重复的实验锚点
Nagel 1995 把隐喻变成可测的猜数游戏：均衡清晰（0），行为系统偏离（L1/L2），且多轮向均衡收敛。【事实】

### 它开相反的药方
「再多披露一点公共信息」未必消除选美——公共信号正是高阶猜测的最佳锚；但正式模型仍显示**更好披露可提高价格信息量**，不能用选美借口反透明。【分析】（Gao, *JAR* 2008）
:::

:::note amber 最贵的一次误判
把「我比别人聪明一层」当成策略——若多数人其实已经是 L2，你的 L3 可能输给「略浅一层」的赢家；深度不是单调优势。【推论】
:::

# 世界地图

九层看选美如何从报纸隐喻长成定价操作系统。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="bcArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制与披露 · 透明 vs 超配公共：药方要算清</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 资产定价 · AMS：迭代平均预期与价格惯性</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 实证/实验 · 调研 HOB、实验室知情者骑情绪</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 信息结构 · 公共信号被系统性超配</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 短视系数 β · 价格= (1−β)·基本面 + β·平均意见</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 level-k · L0=50 → Lk = p·L(k−1)；无限 → Nash</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 p-猜数 · 目标 = p × 群体均值；p&lt;1 时 NE=0</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 高阶信念 · 我猜你猜我猜……</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 凯恩斯隐喻 · 报纸选美：猜别人投谁</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L3→L4**：先会算 level-k，再谈市场。进阶卡在 **L5–L8**：短视 + 公共超配，才把隐喻接进价格。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="180" y="16" width="320" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">支付：猜中「平均意见」而非真相</text>

  <rect x="30" y="100" width="190" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="125" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">一阶信念</text><text x="125" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">我对基本面的判断</text>
  <rect x="245" y="100" width="190" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">高阶信念 HOB</text><text x="340" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">我对他人信念的信念</text>
  <rect x="460" y="100" width="190" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="555" y="122" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">level-k / Nash</text><text x="555" y="140" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">有限深度 vs 无限迭代</text>

  <line x1="280" y1="60" x2="125" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="400" y1="60" x2="555" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="80" y="200" width="220" height="52" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="190" y="222" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">公共信号超配</text><text x="190" y="240" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">猜平均意见 → 盯媒体/指数</text>
  <rect x="380" y="200" width="220" height="52" rx="8" fill="#f3e8ff" stroke="#7c3aed"/><text x="490" y="222" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">短视定价楔</text><text x="490" y="240" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">β↑ → 价离基本面</text>

  <line x1="340" y1="152" x2="190" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
  <line x1="340" y1="152" x2="490" y2="200" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>

  <text x="340" y="300" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">抽象：高阶信念 → 机制：超配公共 / 短视楔 → 操作：估 k、估 β、拆公共锚</text>
  <text x="340" y="330" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实线=定义展开；红虚线=反馈到可交易对象</text>
</svg>
:::

# 核心参与者

| 角色 | 在选美中的位置 | 典型动作 |
|---|---|---|
| L0 / 噪声交易者 | 锚在「显著点」（常取 50） | 跟标题、跟情绪 |
| L1–L2 投机者 | 猜「别人大概在哪」 | 题材博弈、短线预期差 |
| 深度迭代者 | 逼近 0 / 逼近基本面 | 易「过度聪明」输掉短局 |
| 机构 / 知情者 | 可骑情绪也可逆情绪 | 实验室：知情者会迎合浅层估值【待验证】（Hirota et al., 2024） |
| 媒体 / 指数 / 政策 | 公共信号源 | 改变「猜别人」的默认锚 |
| 基准与考核 | 制造短视 | 季度排名 → 抬高 \(\beta\) |

# 核心变量

| 变量 | 含义 | 杠杆感 |
|---|---|---|
| \(p\) | 目标=均值×\(p\)；市场里像「折现/收缩系数」 | \(p\) 越小，均衡越深、第一轮越「难猜」 |
| \(k\) | 推理层数；\(L_k=p^k\cdot L_0\) | 胜负常取决于**相对**深度，非绝对智商 |
| \(\alpha\) | 公共信号精度份额 | \(\alpha\)↑ 且阶数↑ → 公共权重逼近 1 |
| \(\beta\) | 短视/选美权重 | \(\beta\)↑ → 价格楔放大 |
| \(F\) vs \(P_{\mathrm{pub}}\) | 基本面 vs 公共叙事读数 | 二者分裂时，高阶交易最活跃 |
| 持有期 / 考核周期 | 决定有效 \(\beta\) | 越短越选美 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="90" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">支付绑平均意见</text>
  <rect x="200" y="30" width="140" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="270" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">高阶信念进入</text>
  <rect x="380" y="30" width="140" height="44" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="450" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">超配公共信号</text>
  <rect x="520" y="30" width="140" height="44" rx="8" fill="#15181d"/><text x="590" y="57" text-anchor="middle" font-size="12" font-weight="600" fill="#fff" font-family="sans-serif">价格偏离 F</text>

  <line x1="160" y1="52" x2="198" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="340" y1="52" x2="378" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="520" y1="52" x2="518" y2="52" stroke="#1d4ed8" stroke-width="1.5"/>
  <line x1="520" y1="52" x2="518" y2="52" stroke="#1d4ed8"/>
  <line x1="520" y1="52" x2="555" y2="52" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <rect x="100" y="130" width="160" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="180" y="157" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">短视 / 考核 β↑</text>
  <rect x="320" y="130" width="160" height="44" rx="8" fill="#f3e8ff" stroke="#7c3aed"/><text x="400" y="157" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">今日价盯明日均价</text>
  <rect x="500" y="130" width="160" height="44" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="580" y="157" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">惯性 / 动量外观</text>

  <line x1="260" y1="152" x2="318" y2="152" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>
  <line x1="480" y1="152" x2="498" y2="152" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cA)"/>

  <path d="M590,74 C620,100 620,110 580,130" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cB)"/>
  <text x="340" y="230" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">实线：因果链；红虚线：价格→再成公共信号→下一轮高阶预期</text>
  <text x="340" y="260" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">AMS：平均信念破坏迭代期望律 → 公共信息影响被放大</text>
</svg>
:::

# 隐藏关系

- **「更透明」与「更少选美」不是同义词**：公共信息既告知基本面，又提供「别人都会看到」的协调锚——后者喂高阶。【分析】
- **知情者不一定纠偏**：实验室里知情交易者会骑浅层误定价，放大波动。【待验证】（Hirota et al., *Pacific Economic Review* 2024）
- **一阶与高阶可分叉**：散户调研中 FOB 与 HOB 相关但非同一物（相关约 0.51）；外生抬高 FOB 增仓、抬高 HOB 减仓。【待验证】（Xiao et al., 调研+RCT）
- **深度竞赛可自我挫败**：人人多想一层，均值下移，原「最优深度」失效——像军备竞赛。【推论】
- **跨域同构**：猜数 level-k ↔ 扑克「层级思维」↔ 广告「消费者以为别人喜欢什么」↔ 标准战中的「别人会押哪套」。【分析】

# 系统运行机制

1. **设定支付**：胜负/收益绑定「接近平均意见 × \(p\)」或「卖给下一位出价者」。  
2. **形成层级**：参与者对他人深度做假设 → 产生 \(L_k\) 分布。  
3. **锚定公共**：媒体、指数、政策成为猜平均意见的廉价信号。  
4. **定价**：短视下 \(P \approx (1-\beta)F + \beta\,\overline{\text{Opinion}}\)；\(\overline{\text{Opinion}}\) 本身超配公共。  
5. **反馈**：成交价写入下一轮公共信息集；多轮实验中向均衡收敛，单轮市场常停在浅层。  
6. **清算窗口**：到期、再融资、基本面披露 → \(\beta\) 临时下降，楔收缩。

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="90" cy="110" r="10" fill="#0f8a4d"/><text x="90" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#15181d" font-family="sans-serif">隐喻</text><text x="90" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Keynes 1936</text>
  <circle cx="230" cy="110" r="10" fill="#1d4ed8"/><text x="230" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#15181d" font-family="sans-serif">实验</text><text x="230" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Nagel 1995</text>
  <circle cx="370" cy="110" r="10" fill="#b8730a"/><text x="370" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#15181d" font-family="sans-serif">定价理论</text><text x="370" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">AMS 2006</text>
  <circle cx="510" cy="110" r="10" fill="#7c3aed"/><text x="510" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#15181d" font-family="sans-serif">披露争论</text><text x="510" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">Gao 2008</text>
  <circle cx="620" cy="110" r="10" fill="#d5342c"/><text x="620" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#15181d" font-family="sans-serif">HOB 实证</text><text x="620" y="70" text-anchor="middle" font-size="11" fill="#454c56" font-family="sans-serif">2024–25</text>
  <text x="340" y="170" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">单局市场：常停在 L1–L2；重复反馈：向更深均衡挪动</text>
  <text x="340" y="195" text-anchor="middle" font-size="12" fill="#7c848f" font-family="sans-serif">政策/媒体冲击：瞬间重置「公共锚」，层级分布重洗</text>
</svg>
:::

Nagel 实验中，\(p<1\) 时各轮选择整体下移；\(p=1/2\) 第四轮过半选择 &lt;1，但仍少有人报精确 0。【事实】市场类比：重复博弈 + 反馈可「拆穿」浅层选美，但新叙事不断重启时钟。

# 利益与激励

| 主体 | 激励 | 对系统的作用 |
|---|---|---|
| 短线考核资金 | 短期相对排名 | 抬高 \(\beta\)，强化选美 |
| 媒体平台 | 点击与共同注意力 | 制造强公共锚 |
| 指数与 ETF | 被动跟成分 | 把「别人必须买」写成规则 |
| 基本面长线 | 等待楔收敛 | 承受时间风险与资金流出 |
| 监管 | 稳定与公平披露 | 增公共信息——信息角色与共同性角色缠在一起 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="fA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="fB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="100" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">私人研究</text>
  <rect x="280" y="30" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">公共媒体/政策</text>
  <rect x="520" y="30" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="580" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">价格本身</text>

  <rect x="200" y="130" width="280" height="50" rx="8" fill="#15181d"/><text x="340" y="160" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">平均意见 / 高阶预期池</text>

  <line x1="100" y1="80" x2="280" y2="130" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#fA)"/>
  <line x1="340" y1="80" x2="340" y2="130" stroke="#b8730a" stroke-width="2.5" marker-end="url(#fA)"/>
  <line x1="580" y1="80" x2="420" y2="130" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#fA)"/>

  <rect x="240" y="210" width="200" height="36" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="340" y="233" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">资金流向「被预期会涨」的标的</text>
  <line x1="340" y1="180" x2="340" y2="210" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#fB)"/>
  <text x="340" y="255" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">粗线=公共信息对平均意见权重更大（抽水效应）</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何有效 | 操作成本 |
|---|---|---|---|
| 1 | 显式估计对方 \(k\) 分布 | 决定你报哪一层 | 低：用历史/问卷近似 |
| 2 | 识别当前强公共锚 | 知道别人会盯什么 | 低：列 3 个锚并打分 |
| 3 | 拉长有效持有期（降 \(\beta\)） | 直接缩小选美楔 | 中：考核与资金结构 |
| 4 | 分离 FOB 与 HOB | 避免「我觉得低估」与「别人还会更疯」混谈 | 低：两列表 |
| 5 | 多轮反馈设计 | 实验显示收敛；投资上靠复核节奏 | 中 |
| 6 | 披露质量 vs 噪声 | 提高公共精度的信息角色 | 高：制度层 |
| 7 | 到期/事件日历 | 清算窗降低 \(\beta\) | 低 |
| 8 | 避免「深一层军备」 | 相对深度匹配 | 低：纪律 |
| 9 | 组合对冲叙事风险 | 选美仓与基本面仓分账 | 中 |
| 10 | 记录预测对象 | 「猜价」还是「猜基本面」必须写清 | 极低 |

# 常见认知陷阱

:::details 1. 「均衡是 0，所以我报 0」
忽略他人有限深度；第一轮报 0 在 Nagel 类实验中几乎必输。【事实】
:::

:::details 2. 「我比市场更深，所以稳赢」
若群体已在 L2，L4 可能更远离开奖带；深度是相对的。【推论】
:::

:::details 3. 「有基本面就不会选美」
短视 + 再出售需求本身就把高阶信念写进价格。【分析】（AMS）
:::

:::details 4. 「多披露就能消灭选美」
公共信息同时增强共同性；借口「反透明」亦不成立——正式模型仍支持更好披露提升价格信息量。【分析】（Gao 2008）
:::

:::details 5. 「机构会自动纠偏」
知情者可选择骑泡沫；纠偏不是制度必然。【待验证】
:::

:::details 6. 「高阶信念=悲观就该空仓」
HOB 与仓位关系依设定而变；RCT 显示抬高 HOB 可降股票配置，但是特定样本。【待验证】
:::

:::details 7. 「新闻热=基本面变」
热度首先是公共锚强度，其次才可能是信息。【推论】
:::

:::details 8. 「选美=非理性」
在支付绑定平均意见时，猜别人是理性策略；非理性在于误判层级分布。【分析】
:::

:::details 9. 「一次猜对证明模型」
幸存者偏差；要看事前层级假设是否可重复。【分析】
:::

:::details 10. 「p 固定不变」
制度、杠杆、衍生品与考核会改变有效 \(p\) 与 \(\beta\)。【假设】
:::

# 从抽象到现实

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <rect x="20" y="20" width="200" height="240" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="120" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">抽象层</text>
  <text x="120" y="90" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">高阶信念</text>
  <text x="120" y="120" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">level-k / Nash</text>
  <text x="120" y="150" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">迭代平均预期</text>
  <text x="120" y="180" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">公共超配</text>

  <rect x="240" y="20" width="200" height="240" rx="10" fill="#fff7e6" stroke="#b8730a"/>
  <text x="340" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">机制层</text>
  <text x="340" y="90" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">短视考核 → β</text>
  <text x="340" y="120" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">媒体/指数锚</text>
  <text x="340" y="150" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">价格反馈信号</text>
  <text x="340" y="180" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">清算窗降 β</text>

  <rect x="460" y="20" width="200" height="240" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="560" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">操作层</text>
  <text x="560" y="90" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">估 k 分布</text>
  <text x="560" y="120" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">列公共锚</text>
  <text x="560" y="150" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">分账：叙事/价值</text>
  <text x="560" y="180" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">事件前降仓β</text>
</svg>
:::

例：主题投资高潮时，\(F\) 未变而 \(P_{\mathrm{pub}}\) 飙升——模型 3 会显示楔扩大；这不是「情绪玄学」，是 \(\beta\) 与公共权重的算术。【推论】

# 从理论到行动

| 理论命题 | 行动翻译 |
|---|---|
| 第一轮别报 Nash | 先画 L0–L3，再选相对匹配层 |
| 公共信号超配 | 交易日志强制写「我在赌锚还是赌 F」 |
| \(\beta\) 决定楔 | 能控持有期就控；不能就缩小仓位 |
| 多轮收敛 | 设复核点：新信息是否改变 \(k\) 分布 |
| 披露双刃 | 读公告时问：信息增量 vs 共同注意力增量 |

<!-- nav:实践系统 -->
# 技能树

:::details 枝 A · 形式化
- 推导 \(p<1\) 时唯一 NE=0（反复剔除劣势）
- 手算 \(L_k=p^k\cdot 50\)
- 解释 AMS「平均信念破坏迭代期望」的直觉
:::

:::details 枝 B · 实验直觉
- 复述 Nagel 1995 关键数字（L1/L2 聚集、少有人报 0）
- 设计一次 10 人纸面猜数并记录均值
:::

:::details 枝 C · 市场翻译
- 把题材战写成 \((F,P_{\mathrm{pub}},\beta,k)\)
- 拆指数纳入/剔除的「强制公共需求」
:::

:::details 枝 D · 元认知
- FOB/HOB 分列
- 识别「我以为我在价值，其实在猜意见」
:::

# 游戏化世界

你进入「意见交易所」：胜负不按真相结算，而按「是否接近本局平均出价 × \(p\)」。每局公布公共标题（强锚）与可选私人备忘录（弱信号）。升级路线：从「跟锚的 L1」→「估分布的 L2」→「管理 \(\beta\) 的组合官」→「设计披露与考核的规则设计师」。Boss 关：公共锚与基本面反向时的持仓纪律。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| 手算 p=2/3 的 L0–L4 | 50 / 33.33 / 22.22 / 14.81 / 9.88（滑块 0.67≈33.50/22.45） |
| 组织一次迷你猜数 | 记录均值与赢家数，对照 L2 |
| 锚清单 | 当前市场 5 个最强公共锚 |
| 楔速算 | 默认参数算出 P=108.75、楔+8.75 |
| 案例卡 | 1 则新闻标成选美结构 |

# 反事实模拟

:::tabs
@@若所有人突然变成 L∞
p=2/3 时都报 0，游戏无趣；市场里若 \(\beta\to0\) 且共同知识基本面，选美项消失——现实考核很少允许。【推论】

@@若公共锚从 120 打到 80（F=100）
α=0.5、k=2 → 公共权重 0.875；β=0.5 时价格从偏高楔翻向偏低楔（见模型 3）。叙事反转等于重定价。【事实】（算术）

@@若考核周期从季改年
有效 \(\beta\) 下降，同样叙事下价格楔收窄——不一定改基本面，先改激励。【分析】

@@若禁止公共披露
共同性下降，但信息也枯竭；Gao 类结果警告：别把婴儿与洗澡水一起倒掉。【分析】
:::

## 可调模型 1 · level-k 猜数：p 与层级

滑块默认 \(p=0.67\)（约 \(2/3\)），\(L_0=50\) → \(L_1=33.50\)，\(L_2=22.45\)；精确 \(p=2/3\) 时为 33.33 / 22.22。无限层 → 0。拖动看「你该站在哪一层」。

:::raw
<div class="tool" id="tool_lk">
  <div class="ctrl">
    <label>p（目标=均值×p） <output id="lk_pO">0.67</output></label>
    <input type="range" id="lk_p" min="0.20" max="0.95" step="0.01" value="0.67"/>
    <label>L0 锚 <output id="lk_l0O">50</output></label>
    <input type="range" id="lk_l0" min="20" max="80" step="1" value="50"/>
    <label>你的层级 k <output id="lk_kO">2</output></label>
    <input type="range" id="lk_k" min="0" max="8" step="1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">你的报数<strong id="lk_you">22.45</strong></div>
    <div class="ro">L1<strong id="lk_l1">33.50</strong></div>
    <div class="ro">L2<strong id="lk_l2">22.45</strong></div>
    <div class="ro">Nash(∞)<strong id="lk_nash">0.00</strong></div>
    <div id="lk_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="lk_vh">默认 p=0.67≈2/3：L2=22.45；无限理性 → 0。第一轮报 0 通常过深。</span></div>
  </div>
  <canvas id="lkChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 群体混合：谁赢？

设定 L0/L1/L2 三组占比（自动归一），算群体均值与目标 \(p\times\)均值，看哪一层最接近开奖。默认 \(p=0.67\)、40%/35%/25% → 均值≈37.34，目标≈25.02，**L2 最近**（|ε|≈2.57）。【事实】（算术）

:::raw
<div class="tool" id="tool_mx">
  <div class="ctrl">
    <label>p <output id="mx_pO">0.67</output></label>
    <input type="range" id="mx_p" min="0.20" max="0.95" step="0.01" value="0.67"/>
    <label>L0 占比% <output id="mx_w0O">40</output></label>
    <input type="range" id="mx_w0" min="0" max="100" step="1" value="40"/>
    <label>L1 占比% <output id="mx_w1O">35</output></label>
    <input type="range" id="mx_w1" min="0" max="100" step="1" value="35"/>
    <label>L2 占比% <output id="mx_w2O">25</output></label>
    <input type="range" id="mx_w2" min="0" max="100" step="1" value="25"/>
  </div>
  <div class="readout">
    <div class="ro">均值<strong id="mx_mean">37.34</strong></div>
    <div class="ro">目标<strong id="mx_tgt">25.02</strong></div>
    <div class="ro">最近层<strong id="mx_win">L2</strong></div>
    <div class="ro">|误差|<strong id="mx_err">2.57</strong></div>
    <div id="mx_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="mx_vh">默认混合：目标≈25.02，L2=22.45 最近（|ε|≈2.57）。加深群体会下移目标。</span></div>
  </div>
  <canvas id="mxChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 公共超配：阶数如何吸干私人信号

教学近似：公共精度份额 \(\alpha\) 时，第 \(k\) 阶平均意见对公共的权重 \(w=1-(1-\alpha)^{k+1}\)。\(\alpha=0.5\)：k=0→0.50，k=1→0.75，k=2→0.875。【推论】（示意公式，非 AMS 全导出）

:::raw
<div class="tool" id="tool_pw">
  <div class="ctrl">
    <label>公共精度份额 α <output id="pw_aO">0.50</output></label>
    <input type="range" id="pw_a" min="0.10" max="0.90" step="0.01" value="0.50"/>
    <label>信念阶数 k <output id="pw_kO">2</output></label>
    <input type="range" id="pw_k" min="0" max="8" step="1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">公共权重 w<strong id="pw_w">0.875</strong></div>
    <div class="ro">私人权重<strong id="pw_priv">0.125</strong></div>
    <div class="ro">相对 k=0 Δw<strong id="pw_dw">+0.375</strong></div>
    <div id="pw_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="pw_vh">α=0.5、k=2 → w=0.875：猜「别人的平均意见」时，公共锚主导。</span></div>
  </div>
  <canvas id="pwChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 短视定价楔：β × 公共叙事

\(P=(1-\beta)F+\beta[(1-w)F+w\,P_{\mathrm{pub}}]\)，\(w=1-(1-\alpha)^{k+1}\)。默认 F=100、Ppub=120、α=0.5、k=2、β=0.5 → **P=108.75**，楔 **+8.75**。【事实】（算术）

:::raw
<div class="tool" id="tool_pr">
  <div class="ctrl">
    <label>基本面 F <output id="pr_fO">100</output></label>
    <input type="range" id="pr_f" min="60" max="140" step="1" value="100"/>
    <label>公共叙事 Ppub <output id="pr_pubO">120</output></label>
    <input type="range" id="pr_pub" min="60" max="160" step="1" value="120"/>
    <label>α <output id="pr_aO">0.50</output></label>
    <input type="range" id="pr_a" min="0.10" max="0.90" step="0.01" value="0.50"/>
    <label>阶数 k <output id="pr_kO">2</output></label>
    <input type="range" id="pr_k" min="0" max="6" step="1" value="2"/>
    <label>短视 β <output id="pr_bO">0.50</output></label>
    <input type="range" id="pr_b" min="0" max="1" step="0.01" value="0.50"/>
  </div>
  <div class="readout">
    <div class="ro">价格 P<strong id="pr_p">108.75</strong></div>
    <div class="ro">楔 P−F<strong id="pr_w">+8.75</strong></div>
    <div class="ro">意见权重 w<strong id="pr_ow">0.875</strong></div>
    <div class="ro">涨跌色<strong id="pr_dir">偏高</strong></div>
    <div id="pr_vline" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="pr_vh">默认：P=108.75，楔+8.75（涨红）。降 β 或让 Ppub→F 可收楔。</span></div>
  </div>
  <canvas id="prChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 | 讲清凯恩斯隐喻与 p-猜数规则 | 不与「选最美」混淆 |
| L2 | 手算 level-k 与混合赢家 | 与滑块一致 |
| L3 | 用 α、k、β 解释价格楔 | 算出 +8.75 类例子 |
| L4 | 案例拆解 + 批评过度叙事 | 标清【待验证】 |

# 30分钟最小实践

1. 纸算精确 \(p=2/3\)：L0–L4 = 50 / 33.33 / 22.22 / 14.81 / 9.88；再用滑块 p=0.67 对照（8 分钟）。  
2. 假设朋友局 40/35/25、p=0.67，算目标≈25.02，标出 L2 为相对赢家（8 分钟）。  
3. 打开模型 4：把 β 从 0.50 拖到 0.20，看楔从 +8.75 缩到 +3.50（7 分钟）。  
4. 写当前你最关心的一个标的/议题：一句话分清「我在猜 F 还是猜别人」（7 分钟）。  

产出：一张手算表 + 一句对象声明——成本接近 0，可验证。

# 7天计划

| 天 | 焦点 | 交付 |
|---|---|---|
| D1 | 隐喻与规则 | 半页转述（禁止「选最美」误读） |
| D2 | level-k | 5 组 p 的 L0–L4 表 |
| D3 | Nagel 数字 | 对照笔记 |
| D4 | 公共超配 | α–k 热力直觉 |
| D5 | 定价楔 | 3 组 (F,Ppub,β) |
| D6 | 现实案例 | 1 则新闻建模 |
| D7 | 复盘 | 陷阱清单自测 10 条 |

# 30天计划

| 周 | 主题 | 里程碑 |
|---|---|---|
| W1 | 形式与实验 | 自办 1 次猜数局 |
| W2 | 信息与披露 | 读 AMS/Gao 摘要卡 |
| W3 | 市场翻译 | 10 张案例卡 |
| W4 | 纪律系统 | FOB/HOB 分账模板固化 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 凯恩斯报纸选美 | 奖给猜中大众选票者 |
| 2 | p-猜数 | 目标=p×均值 |
| 3 | 反复剔除 → NE=0 | p&lt;1 时唯一理性共同知识解 |
| 4 | level-k | \(L_k=p^k L_0\) |
| 5 | 认知层级 / Poisson cognitive hierarchy | 对他人深度的概率分布 |
| 6 | AMS 迭代平均预期 | 平均信念破坏迭代期望律 |
| 7 | 公共信息超配 | 猜意见时抬公共权重 |
| 8 | 短视定价楔 | \(P=(1-\beta)F+\beta\,\overline{Op}\) |
| 9 | 披露双角色 | 信息 vs 共同性（Gao） |
| 10 | FOB≠HOB | 一阶与高阶可分叉并反向影响仓位 |

# 关键问题清单

:::details Q1 选美博弈是在骂市场非理性吗？
不完全是：它指出理性人在特定支付下也会猜别人。【分析】
:::

:::details Q2 为什么实验里没人第一轮报 0？
因为 0 是对「人人无限理性」的最优反应，而该前提不成立。【事实】
:::

:::details Q3 L2≈22.2 是否「正确答案」？
是常见深度，不是唯一真理；取决于真实分布。【分析】
:::

:::details Q4 金融市场的 p 是什么？
隐喻系数：折现、风险、再出售概率等压缩「猜均值」的强度。【推论】
:::

:::details Q5 公共信息是否应该减少？
选美效应存在 ≠ 应反透明；需看净信息效率。【分析】
:::

:::details Q6 如何降低自己的选美暴露？
降 \(\beta\)（更长持有/更松考核）、缩小叙事仓、强制写清预测对象。【推论】
:::

:::details Q7 高阶信念能量化吗？
可用调研/实验代理；字段证据仍粗，标【待验证】。【待验证】
:::

:::details Q8 与反射性（索罗斯）什么关系？
同属「信念↔价格」闭环；选美更强调高阶与支付结构。【分析】
:::

:::details Q9 与协调博弈/谢林点？
公共锚=显著焦点；选美是「带支付收缩」的协调。【分析】
:::

:::details Q10 算法交易会消灭选美吗？
算法可加快层级军备，也可能把公共微观结构信号变成新锚。【假设】
:::

# 下一阶段探索

- 精读 Allen–Morris–Shin (2006) 与 Nagel (1995) 原文数字表  
- 对比认知层级（Camerer et al.）与 level-k 的预测差  
- 把 ETF 纳入/剔除事件写成「强制公共需求」冲击实验  
- 自建 FOB/HOB 日记 30 天，回测「对象声明」是否降低混乱交易  

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 报纸选美隐喻 | 经典著作 | Keynes, *General Theory* (1936), Ch.12 | 【事实】 |
| p-猜数实验 | 同行评审 | Nagel, *AER* 1995 | 【事实】 |
| 迭代平均预期与公共超配 | 同行评审 | Allen, Morris, Shin, *RFS* 2006 | 【分析】 |
| 披露与效率 | 同行评审 | Gao, *JAR* 2008 | 【分析】 |
| 知情者骑情绪（实验室） | 同行评审 | Hirota et al., *Pacific Economic Review* 2024 | 【待验证】 |
| FOB/HOB 与仓位（调研+RCT） | 工作论文/会议 | Xiao et al.；相关≈0.51 | 【待验证】 |
| HOB 与非基本面投机（调研） | 工作论文 | Vasudevan et al., Shiller 调研 | 【待验证】 |
| level-k / 楔的算术例子 | 本手册推演 | 见可调模型 | 【事实】（算术）/【推论】 |

标记约定：【事实】多方一致或可复算；【分析】权威模型推断；【推论】逻辑延伸；【假设】未验证；【待验证】单线或新 empirically。

# 免责声明 {.appendix}

本手册为认知与决策训练材料，**不构成投资建议、不构成对任何证券的推荐或预测**。文中收益、价格楔、层级分布均为教学示意；真实交易涉及本金损失风险。金融市场有正漂移与制度约束，「什么都不做」亦非零基准——任何胜率/收益叙述均需自备对照。作者与引擎不对依据本文的决策承担责任。
