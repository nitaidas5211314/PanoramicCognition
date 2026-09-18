---
slug: 子博弈精炼纳什均衡（SPNE）：用逆向归纳法剔除-不可置信的威胁-，动态博弈的核心解法
title: 子博弈精炼纳什均衡（SPNE）：剔除不可置信威胁
subtitle: 动态博弈里，纳什均衡不够——<strong>每个子博弈都要是均衡</strong>。逆向归纳从终局往回推，把「吓你一下、真到节点却不愿执行」的威胁剪掉。
brand_sub: SPNE × Dynamic Games
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, SPNE, 子博弈精炼, 逆向归纳, 不可置信威胁, Selten, 进入威慑]
theme_js_file: 子博弈精炼纳什均衡（SPNE）：用逆向归纳法剔除-不可置信的威胁-，动态博弈的核心解法.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**子博弈精炼纳什均衡（Subgame Perfect Nash Equilibrium, SPNE / SPE）**：策略组合在**原博弈的每一个子博弈**上都构成纳什均衡——包括均衡路径**从未到达**的分支。【事实】

直觉：策略是「每种历史下的完整行动计划」。普通 NE 只要求「路径上」没人想偏离；SPNE 还要求「若偏离真的发生、落到某节点，那里的计划仍然相互最优」。于是**不可置信的威胁**被剔除。【分析】

Reinhard Selten 在 1965 年寡头动态定价论文中引入子博弈完美思想；1975 年再引入颤抖手完美，并把旧概念正式称为「子博弈精炼」。【事实】1994 年诺贝尔经济学奖授予 Nash、Harsanyi、Selten。【事实】

有限完美信息博弈中，**逆向归纳（backward induction）**求出的解就是 SPNE；有限期完美信息博弈至少存在一个纯策略 SPNE（Zermelo–Kuhn 线）。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「谁嗓门大」，而是：在**序贯**互动里，哪些「威胁 / 承诺」在节点真到达时仍值得执行，以及如何用规则与沉没成本把空话变成可信计划。

边界：

- **在界内**：扩展式、子博弈定义、SPNE、逆向归纳、一次性偏离原则、进入威慑、承诺行动、连锁店悖论与蜈蚣博弈张力、与颤抖手/序贯均衡的关系。
- **在界外**：具体行业诉讼文书、某次并购谈判的胜负预测——除非压成「威胁是否可置信 / 子博弈是否均衡」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 动态博弈中剔除不可信威胁后的稳定策略组合 |
| 2 | 边界在哪 | 到「子博弈 + 每子博弈 NE」可形式化为止 |
| 3 | 核心对象 | 扩展式树、子博弈、策略（含离径计划）、SPNE |
| 4 | 参与者 | 序贯行动的理性主体：企业、国家、谈判方、算法 agent |
| 5 | 关键变量 | 行动顺序、支付、贴现、信息集是否单点、承诺成本 |
| 6 | 可直接观察 | 公开行动、价格战是否开打、合同条款、产能沉没 |
| 7 | 无法直接观察 | 离径信念、私人类型、执行威胁时的真实痛苦 |
| 8 | 谁影响谁 | 后动者最优 → 先动者预期 → 路径选择；威胁改激励 |
| 9 | 因果关系 | 子博弈理性 ⇒ 威胁可信或被剪掉 ⇒ 路径与支付锁定 |
| 10 | 只是相关 | 「嘴上强硬」相关于威慑成功，但相关≠可信【分析】 |
| 11 | 表层现象 | 恐吓、空头支票、最后通牒、价格战姿态、报复声明 |
| 12 | 底层机制 | 每节点最优反应 + 共同知识理性（逆向归纳） |
| 13 | 有反馈吗 | 有。声誉与类型信念把「一次博弈」串成动态 |
| 14 | 有延迟吗 | 有。承诺建设、产能投放、法律执行都有时滞 |
| 15 | 正/负反馈 | 报复螺旋可正反馈；第三方托管/合同可负反馈固化可信 |

## 最关键的一句话

> SPNE 问的不是「威胁听起来狠不狠」，而是「若对方真把你逼到那个节点，你还会不会按威胁执行」。

# 为什么值得研究

:::cards g3
### 它修掉 NE 的「离径胡扯」
普通 NE 允许策略在未达节点写荒谬计划，只要路径上碰巧自洽。SPNE 强制离径也理性。【事实】

### 它是动态经济学的默认解概念
进入威慑、斯塔克伯格、讨价还价、有限重复博弈——教科书先求 SPNE。【事实】

### 它把「可信承诺」变成可操作问题
想改变均衡？别只会喊；去改支付、加沉没成本、引入第三方——让威胁在子博弈里真成最优。【分析】
:::

:::note amber 最贵的一次误判
把「宣布价格战」当成威慑成功。若进入后打价格战对你比默许更亏，理性进入者会识破并进入；你的 NE「不进入＋威胁开战」不是 SPNE。【推论】
:::

# 世界地图

九层看威胁如何从「话术」变成「子博弈里的最优行动」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="spArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制与承诺设计 · 改支付使威胁/承诺可信</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 精炼族衔接 · 颤抖手 / 序贯 / 完美贝叶斯</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 无限期与重复 · 一次性偏离原则 / 无名氏</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 不完全信息 · 子博弈变少，需贝叶斯精炼</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 悖论与张力 · 连锁店 / 蜈蚣 / 有限重复 PD</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 应用原型 · 进入威慑 / 斯塔克伯格 / 讨价还价</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 求解工具 · 逆向归纳（有限完美信息）</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 解概念 · 每个子博弈都是 NE ⇒ SPNE</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 扩展式 · 节点 · 信息集 · 子博弈切割</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1→L3**：先会切子博弈、再会逆向归纳；进阶卡在 **L5**：理论 SPNE 与实验/直觉常打架——那不是「算错了」，是共同知识理性与有限理性的边界。【分析】
:::

# 核心概念地图

从抽象定义到三层操作。

:::raw
<svg viewBox="0 0 680 380" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="200" y="16" width="280" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">策略组合 σ（含离径计划）</text>

  <rect x="40" y="90" width="180" height="56" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象层</text><text x="130" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">∀ 子博弈 g：σ|g ∈ NE(g)</text>
  <rect x="250" y="90" width="180" height="56" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制层</text><text x="340" y="132" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">终局最优 → 向前折叠</text>
  <rect x="460" y="90" width="180" height="56" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="114" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作层</text><text x="550" y="132" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">剪不可信枝 / 加承诺</text>

  <line x1="300" y1="60" x2="130" y2="90" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="90" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="380" y1="60" x2="550" y2="90" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="60" y="190" width="560" height="70" rx="8" fill="#f8fafc" stroke="#e2e6ec"/>
  <text x="80" y="220" fill="#15181d" font-size="13" font-family="sans-serif">判别：进入后「开战」支付 &lt; 「默许」？→ 开战威胁不可信 → 剪枝 → 进入者进入</text>
  <text x="80" y="242" fill="#7c848f" font-size="12" font-family="sans-serif">承诺：沉没产能 / 第三方赌注 / 合同罚则 → 改子博弈支付 → 威胁变可信</text>

  <rect x="60" y="290" width="260" height="60" rx="8" fill="#fef2f2" stroke="#d5342c"/>
  <text x="190" y="316" text-anchor="middle" fill="#d5342c" font-size="12" font-weight="700" font-family="sans-serif">NE 但非 SPNE</text>
  <text x="190" y="336" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">离径写「亏本开战」</text>
  <rect x="360" y="290" width="260" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="490" y="316" text-anchor="middle" fill="#0f8a4d" font-size="12" font-weight="700" font-family="sans-serif">SPNE</text>
  <text x="490" y="336" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">每个节点计划可自我执行</text>
  <line x1="320" y1="320" x2="360" y2="320" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cmB)"/>
</svg>
:::

# 核心参与者

| 角色 | 在系统里做什么 | 典型失败模式 |
|---|---|---|
| 先动者 | 选路径，预期后动者的**真实**最优 | 相信对手的空头威胁 |
| 后动者 | 在到达的子博弈里最大化 | 事前喊狠话、事到临头软化 |
| 承诺工程师 | 改支付/信息使威胁可信 | 承诺成本高于收益却仍沉没 |
| 理论家 / 实验者 | 定义 SPNE；测 BI 是否描述人 | 把规范解当成实证必然 |
| 监管 / 第三方 | 提供可验证惩罚与托管 | 执行不可信 → 承诺塌方 |

# 核心变量

| 变量 | 符号直觉 | 为何重要 |
|---|---|---|
| 行动顺序 | 谁先谁后 | 决定子博弈结构与先发优势 |
| 节点支付 | \(u_i(h)\) | 决定「执行威胁是否最优」 |
| 贴现因子 | \(\delta\) | 无限期里支撑惩罚/合作 |
| 信息集 | 单点 vs 多点 | 非单点则子博弈稀缺，SPNE 精炼力弱 |
| 承诺成本 | \(C\) | \(C\) 足够大才能把开战变成最优 |
| 剩余期数 | \(T\) | 有限重复从末日解绑 |

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="90" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">终局节点最优</text>
  <rect x="200" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="270" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">前一层折叠预期</text>
  <rect x="380" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="450" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">路径与支付锁定</text>
  <rect x="540" y="30" width="120" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="600" y="60" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">SPNE</text>
  <line x1="160" y1="55" x2="200" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>
  <line x1="340" y1="55" x2="380" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>
  <line x1="520" y1="55" x2="540" y2="55" stroke="#1d4ed8" marker-end="url(#cfA)"/>

  <rect x="80" y="140" width="200" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="180" y="170" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">空头威胁（离径开战）</text>
  <rect x="360" y="140" width="220" height="50" rx="8" fill="#fef2f2" stroke="#d5342c"/><text x="470" y="170" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">进入后子博弈非 NE</text>
  <line x1="280" y1="165" x2="360" y2="165" stroke="#d5342c" stroke-dasharray="5 4" marker-end="url(#cfB)"/>

  <text x="340" y="240" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">实线：逆向归纳因果链 · 红色虚线：NE 允许、SPNE 切断的反馈幻觉</text>
  <text x="340" y="265" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">承诺 C 足够大时，红色虚线可被「改支付」重新接成可信实线</text>
</svg>
:::

经典进入博弈（挑战者，在位者）：不进入 \((0,2)\)；进入＋斗争 \((-1,-1)\)；进入＋默许 \((1,1)\)。【事实】（教科书标准支付，具体数字是教学约定）

- 进入后子博弈：默许 \(1 > -1\) 斗争 → 在位者必默许。
- 挑战者预期默许：进入得 \(1 > 0\) → 进入。
- **唯一 SPNE**：进入＋默许。  
- 「不进入＋斗争威胁」可以是 NE（路径上未开战），但**不是** SPNE。【事实】

# 隐藏关系

| 表面 | 底下 |
|---|---|
| 「我们绝不容忍进入」 | 进入后打起来是否对自己更优？ |
| 多重 NE | 哪些依赖不可信离径计划？ |
| 有限次合作承诺 | 末日背叛 → 向前解绑（unraveling） |
| 先发优势 | 后动者反应函数被先动者内化（斯塔克伯格） |
| 谈判底线宣言 | 无沉没承诺时只是 cheap talk |

跨域同构：SPNE 的「离径也要最优」≈ 动态规划的最优性原理 ≈ 合同里「或有条款必须可执行」≈ 代码里「异常分支也要有定义行为」。【推论】

# 系统运行机制

1. **切树**：从某单点信息集出发、不切开其他信息集 → 得到子博弈。  
2. **求局部 NE**：每个子博弈内相互最优反应。  
3. **逆向归纳**（有限完美信息）：从终端决策结向前折叠。  
4. **一次性偏离检验**（无限期）：任何单期偏离都不划算 ⇒ SPE（单偏离原则）。【事实】  
5. **精炼不够时升级**：不完美信息 → 完美贝叶斯 / 序贯均衡；「几乎不犯错」→ 颤抖手。【事实】

:::note purple 子博弈定义提醒
信息集若跨越多节点且不能干净切开，则「从中间切开」不构成子博弈——此时 SPNE 的剪枝力变弱，必须引入信念。【事实】
:::

# 时间演化

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="70" cy="110" r="8" fill="#0f8a4d"/><text x="70" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1913</text><text x="70" y="88" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Zermelo</text>
  <circle cx="180" cy="110" r="8" fill="#0f8a4d"/><text x="180" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1950s</text><text x="180" y="88" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Nash NE</text>
  <circle cx="300" cy="110" r="8" fill="#1d4ed8"/><text x="300" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1965</text><text x="300" y="88" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Selten SP</text>
  <circle cx="420" cy="110" r="8" fill="#1d4ed8"/><text x="420" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1975</text><text x="420" y="88" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">颤抖手</text>
  <circle cx="520" cy="110" r="8" fill="#b8730a"/><text x="520" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1978</text><text x="520" y="88" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">连锁店</text>
  <circle cx="610" cy="110" r="8" fill="#d5342c"/><text x="610" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">1994</text><text x="610" y="88" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">Nobel</text>
  <text x="340" y="160" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">1980s–：Kreps–Wilson 声誉修补连锁店；Binmore 等批评蜈蚣中的逆向归纳</text>
  <text x="340" y="185" text-anchor="middle" font-size="12" fill="#7c848f" font-family="sans-serif">今日：机制设计与实验博弈并行——规范解 + 有限理性补丁</text>
</svg>
:::

# 利益与激励

| 主体 | 想要什么 | SPNE 如何改写激励 |
|---|---|---|
| 在位者 | 阻止进入、保垄断租 | 仅靠嘴炮不够；需承诺使开战成为进入后最优 |
| 进入者 | 分一杯羹 | 看穿不可信威胁 → 大胆进入 |
| 谈判提议方 | 更大份额 | 有限轮次 BI 决定报价；耐心（δ）是筹码 |
| 政策制定者 | 可信规则 | 「相机抉择」若事后想反悔，事前承诺失效 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="40" width="150" height="70" rx="8" fill="#15181d"/><text x="105" y="70" text-anchor="middle" fill="#fff" font-size="13" font-weight="700" font-family="sans-serif">垄断租 / 饼</text><text x="105" y="92" text-anchor="middle" fill="#9aa3ad" font-size="11" font-family="sans-serif">待分配剩余</text>
  <rect x="260" y="40" width="150" height="70" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="335" y="70" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">威胁信号</text><text x="335" y="92" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">cheap talk 或承诺</text>
  <rect x="490" y="40" width="160" height="70" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="570" y="70" text-anchor="middle" fill="#15181d" font-size="13" font-weight="700" font-family="sans-serif">沉没成本 C</text><text x="570" y="92" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">改子博弈支付</text>
  <line x1="180" y1="75" x2="260" y2="75" stroke="#1d4ed8" marker-end="url(#flA)"/>
  <line x1="410" y1="75" x2="490" y2="75" stroke="#1d4ed8" marker-end="url(#flA)"/>

  <rect x="120" y="160" width="440" height="60" rx="8" fill="#f8fafc" stroke="#e2e6ec"/>
  <text x="340" y="185" text-anchor="middle" fill="#15181d" font-size="13" font-family="sans-serif">信息流：后动支付被先动者「抽水」进预期 → 路径选择</text>
  <text x="340" y="205" text-anchor="middle" fill="#7c848f" font-size="12" font-family="sans-serif">资源流：可信承诺消耗真实资源（产能/保证金），换取均衡移动</text>
</svg>
:::

进入威慑的「抽水」逻辑：在位者若能可信地让进入后斗争成为最优，挑战者预期净收益转负，垄断租被「威胁」护住——但护住的代价是事前烧掉可置信的 \(C\)。【分析】

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| # | 杠杆 | 为何高杠杆 | 操作 |
|---|---|---|---|
| 1 | 改进入后支付 | 直接决定威胁是否 SPNE | 沉没产能、专有合同、第三方罚金 |
| 2 | 缩短/延长博弈长度 | 有限 \(T\) 解绑；无限打开合作集 | 合同期限、续约条款 |
| 3 | 贴现 δ | 耐心改变讨价还价与惩罚力度 | 利率、政治任期、资金成本 |
| 4 | 信息结构 | 多点信息集削弱 SPNE | 披露、审计、可验证信号 |
| 5 | 先动权 | 斯塔克伯格份额 | 产能抢先、议程设置 |
| 6 | 外部托管 | 把执行外包给可信第三方 | 托管账户、智能合约、监管 |
| 7 | 类型不确定性 | 小概率「疯子」可撑声誉威慑 | Kreps–Wilson 式声誉【分析】 |
| 8 | 重复互动场域 | 把一次性变重复 | 平台评分、长期客户 |
| 9 | 策略语言精度 | 写全离径计划 | 预案表：若对方进，我… |
| 10 | 实验校准 | 知道 BI 何时失灵 | 小样本预演谈判 |

# 常见认知陷阱

:::details ① 「有威胁就有威慑」
威胁必须在到达节点时仍最优。否则是 cheap talk。【分析】
:::

:::details ② 把 NE 当 SPNE
路径上自洽 ≠ 每个子博弈均衡。进入博弈的「不进入＋开战」是典型反例。【事实】
:::

:::details ③ 忽略离径计划
策略必须回答「如果对方真进来怎么办」。只写均衡路径动作不算完整策略。【事实】
:::

:::details ④ 有限重复幻想合作
阶段博弈唯一 NE 时，有限次重复的唯一 SPNE 是每期都玩该 NE（末日解绑）。【事实】
:::

:::details ⑤ 蜈蚣博弈里「理论错了」
BI 预测立即停止；实验常继续。争论在共同知识理性与反事实信念，不是四则运算错。【分析】
:::

:::details ⑥ 承诺成本为零
口头「我发誓打价格战」不改支付，SPNE 不变。【推论】
:::

:::details ⑦ 混淆完美与完全信息
完美信息≈知历史；完全信息≈知支付。SPNE 定义在扩展式上，两者别混。【事实】
:::

:::details ⑧ 无限期仍用末端逆向归纳
无最后一期 → 用一次性偏离原则 / 动态规划，不要假装有末日。【事实】
:::

:::details ⑨ 子博弈切错
切开信息集就不叫子博弈；其上的「局部 NE」无定义。【事实】
:::

:::details ⑩ 把 SPNE 当唯一预测
多重 SPNE 常见（尤其无限重复）；还需选择标准或聚点。【分析】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象 | 现实对应 |
|---|---|
| 进入＋斗争/默许 | 新品牌进场，在位者是否开价格战 |
| 承诺赌注 C | 违约金、专有投资、公开押金 |
| 斯塔克伯格先动 | 产能抢先、标准制定抢先 |
| 有限轮次报价 | 融资谈判 deadline、拍卖轮次 |
| 连锁店多市场 | 连锁品牌在各城市面对本地进入者 |
| 蜈蚣继续 | 信任逐步加码的合作项目 |

# 从理论到行动

1. 画扩展式：节点、行动、支付。  
2. 标出所有子博弈。  
3. 从终端做逆向归纳（或检验一次性偏离）。  
4. 列出所有 NE，划掉非 SPNE。  
5. 若想要的结果不是 SPNE：设计承诺改支付，再重算。  
6. 对照实验/历史：BI 是否在该语境可信。

# 技能树

:::details ① 入门：会切子博弈
给定小树，标出所有合法子博弈；说明为何某切法非法。
:::

:::details ② 入门：进入博弈手算
默许 vs 斗争比较 → 挑战者进入 → 唯一 SPNE。
:::

:::details ③ 进阶：承诺临界 C*
\(C \ge u(\text{默许})-u(\text{斗争})\) 使斗争可信；默认教学支付下 \(C^*\!=\!2\)。
:::

:::details ④ 进阶：有限讨价还价 BI
\(T\) 轮、饼 \(S\)、贴现 \(\delta\)：从末日「提议方拿全部」向前折。
:::

:::details ⑤ 进阶：斯塔克伯格 vs 古诺
内化反应函数；默认 \(a\!=\!10,b\!=\!1,c\!=\!2\)：先动利润 8 vs 古诺各约 7.11。
:::

:::details ⑥ 专家：连锁店悖论
论证有限 \(N\) 市场为何 SPNE 每期进入＋默许；指出声誉修补方向。
:::

:::details ⑦ 专家：蜈蚣与共同知识
复述 Binmore / Aumann 争论的核心：离径反事实信念。【分析】
:::

:::details ⑧ 专家：精炼阶梯
说明何时 SPNE 不够、要上完美贝叶斯或颤抖手。
:::

# 游戏化世界

你是「威胁鉴定师」：每张局势卡先问「若真到那一节点，执行方还赚吗？」——赚则可信（绿），不赚则剪枝（红）。加分项：用最小 \(C\) 把红威胁洗成绿。

# 任务系统

| 任务 | 完成标准 |
|---|---|
| T1 切子博弈 | 自画 1 棵 3 层树并标子博弈 |
| T2 进入 SPNE | 手算唯一 SPNE 与被剔除的 NE |
| T3 算 C* | 默许−斗争差 = 临界承诺 |
| T4 讨价还价 | \(T=2,\delta=0.9,S=100\) 得先手份额 10 |
| T5 案例 | 一则商业「威慑」新闻：可信/不可信判定 |

# 反事实模拟

:::tabs
@@若斗争支付升到 +2
进入后斗争优于默许 → 威胁可信 → SPNE 转为不进入（若进入支付仍负）。【推论】

@@若加入承诺 C=2.5
默许净支付 \(1-2.5=-1.5 < -1\) 斗争 → 可信；挑战者不进入。【事实】

@@若有限 5 次价格战威胁
无类型不确定时，末日默许向前解绑 → 每期进入＋默许（连锁店逻辑）。【事实】

@@若 δ→1 的无限谈判
交替报价收敛到 Rubinstein 份额 \(1/(1+\delta)\)；δ=0.9 时先手约 **52.6%**。【事实】
:::

## 可调模型 1 · 进入威慑：威胁可信吗？

默认：垄断租 \(M=2\)；斗争 \((E_f,I_f)=(-1,-1)\)；默许 \((1,1)\)。斗争对在位者不可信 → SPNE = **进入＋默许**，支付 \((1,1)\)。

:::raw
<div class="tool" id="tool_entry">
  <div class="ctrl">
    <label>垄断租 M（不进入时在位） <output id="en_mO">2.0</output></label>
    <input type="range" id="en_m" min="0" max="5" step="0.1" value="2.0"/>
    <label>斗争：进入者 <output id="en_feO">-1.0</output></label>
    <input type="range" id="en_fe" min="-3" max="2" step="0.1" value="-1.0"/>
    <label>斗争：在位者 <output id="en_fiO">-1.0</output></label>
    <input type="range" id="en_fi" min="-3" max="3" step="0.1" value="-1.0"/>
    <label>默许：进入者 / 在位 <output id="en_aeO">1.0</output></label>
    <input type="range" id="en_ae" min="-1" max="3" step="0.1" value="1.0"/>
    <label>默许：在位者 <output id="en_aiO">1.0</output></label>
    <input type="range" id="en_ai" min="-1" max="3" step="0.1" value="1.0"/>
  </div>
  <div class="readout">
    <div class="ro">威胁可信？<strong id="en_cred">否</strong></div>
    <div class="ro">进入？<strong id="en_ent">是</strong></div>
    <div class="ro">SPNE 支付<strong id="en_pay">(1.0, 1.0)</strong></div>
    <div id="en_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="en_vh">进入后默许 1.0 &gt; 斗争 -1.0 → 威胁不可信；进入者进入，SPNE=(进入,默许)</span></div>
  </div>
  <canvas id="enChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 承诺赌注：最小 C* 使开战可信

默许时在位者若需支付赌注 \(C\)（或等价沉没），净支付 \(a_I-C\)。可信条件：\(f_I \ge a_I-C\) ⇒ \(C \ge a_I-f_I\)。默认 \(a_I=1,f_I=-1\) → **C\*=2.0**；你设 \(C=2.5\) 时威胁变可信，进入被吓退。

:::raw
<div class="tool" id="tool_commit">
  <div class="ctrl">
    <label>默许支付 aᵢ <output id="cm_aiO">1.0</output></label>
    <input type="range" id="cm_ai" min="-1" max="3" step="0.1" value="1.0"/>
    <label>斗争支付 fᵢ <output id="cm_fiO">-1.0</output></label>
    <input type="range" id="cm_fi" min="-3" max="2" step="0.1" value="-1.0"/>
    <label>承诺成本 C <output id="cm_cO">2.5</output></label>
    <input type="range" id="cm_c" min="0" max="5" step="0.1" value="2.5"/>
    <label>进入者默许所得 aₑ <output id="cm_aeO">1.0</output></label>
    <input type="range" id="cm_ae" min="-1" max="3" step="0.1" value="1.0"/>
    <label>进入者斗争所得 fₑ <output id="cm_feO">-1.0</output></label>
    <input type="range" id="cm_fe" min="-3" max="2" step="0.1" value="-1.0"/>
  </div>
  <div class="readout">
    <div class="ro">C*<strong id="cm_star">2.0</strong></div>
    <div class="ro">可信？<strong id="cm_ok">是</strong></div>
    <div class="ro">均衡路径<strong id="cm_path">不进入</strong></div>
    <div id="cm_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="cm_vh">C=2.5 ≥ C*=2.0 → 进入后斗争优于默许；进入者预期净收益&lt;0 → 不进入（在位者无需真开战）</span></div>
  </div>
  <canvas id="cmChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 有限轮次讨价还价（逆向归纳）

饼 \(S=100\)，贴现 \(\delta\)，轮次 \(T\)。末日提议方拿 \(S\)；向前折：每期提议方留给对手 \(\delta\times\)（对手下期作为提议方所得）。默认 \(\delta=0.90,T=2\) → 先手份额 **10.0**；\(T=3\) → **91.0**；\(T\to\infty\) 趋向 \(S/(1+\delta)\approx 52.6\)。

:::raw
<div class="tool" id="tool_barg">
  <div class="ctrl">
    <label>饼 S <output id="bg_sO">100</output></label>
    <input type="range" id="bg_s" min="10" max="200" step="1" value="100"/>
    <label>贴现 δ <output id="bg_dO">0.90</output></label>
    <input type="range" id="bg_d" min="0.50" max="0.99" step="0.01" value="0.90"/>
    <label>轮次 T <output id="bg_tO">2</output></label>
    <input type="range" id="bg_t" min="1" max="20" step="1" value="2"/>
  </div>
  <div class="readout">
    <div class="ro">先手份额<strong id="bg_first">10.0</strong></div>
    <div class="ro">后手份额<strong id="bg_second">90.0</strong></div>
    <div class="ro">无限极限<strong id="bg_lim">52.6</strong></div>
    <div id="bg_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="bg_vh">T=2,δ=0.90：末日对手拿 100，本期须分给对手 90 → 先手仅 10；拉长 T 或提高 δ 改变份额</span></div>
  </div>
  <canvas id="bgChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · 斯塔克伯格先动 vs 古诺同时

线性逆需求 \(P=a-b(q_1+q_2)\)，边际成本 \(c\)。古诺对称 \(q=(a-c)/(3b)\)；斯塔克伯格先动 \(q_L=(a-c)/(2b)\)，后动 \(q_F=(a-c)/(4b)\)。默认 \(a=10,b=1,c=2\)：先动利润 **8.00**，后动 **4.00**，古诺各 **7.11**。

:::raw
<div class="tool" id="tool_stack">
  <div class="ctrl">
    <label>需求截距 a <output id="sk_aO">10.0</output></label>
    <input type="range" id="sk_a" min="4" max="20" step="0.1" value="10.0"/>
    <label>斜率 b <output id="sk_bO">1.0</output></label>
    <input type="range" id="sk_b" min="0.2" max="3" step="0.1" value="1.0"/>
    <label>边际成本 c <output id="sk_cO">2.0</output></label>
    <input type="range" id="sk_c" min="0" max="8" step="0.1" value="2.0"/>
  </div>
  <div class="readout">
    <div class="ro">先动 π<sub>L</sub><strong id="sk_pl">8.00</strong></div>
    <div class="ro">后动 π<sub>F</sub><strong id="sk_pf">4.00</strong></div>
    <div class="ro">古诺 π<sub>C</sub><strong id="sk_pc">7.11</strong></div>
    <div id="sk_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="sk_vh">序贯产量的 SPNE：先动者内化后动反应，产量高于古诺；后动利润低于古诺</span></div>
  </div>
  <canvas id="skChart" height="214"></canvas>
</div>
:::

# 四级能力路线

| 级别 | 能力 | 检验 |
|---|---|---|
| L1 | 定义 SPNE 并剪不可信威胁 | 进入博弈口算 |
| L2 | 承诺 C* 与讨价还价 BI | 与滑块一致 |
| L3 | 斯塔克伯格 / 有限重复解绑 | 手算默认参数 |
| L4 | 悖论与精炼升级 | 写半页连锁店或蜈蚣评论 |

# 30分钟最小实践

1. 在纸上画出默认进入树，标出两个 NE，划掉非 SPNE（8 分钟）。  
2. 手算 \(C^*=1-(-1)=2\)，打开模型 2 把 \(C\) 拖过 2.0 看路径翻转（8 分钟）。  
3. 模型 3 设 \(T=2\) 与 \(T=3\)，记录先手 10.0 与 91.0，用一句话解释「奇数轮先手优势」（7 分钟）。  
4. 选一则「我们绝不容忍…」的商业声明，写一句可信/不可信判定（7 分钟）。  

产出：一棵手绘树 + 一句案例判定——成本接近 0，可验证。

# 7天计划

| 天 | 焦点 | 交付 |
|---|---|---|
| D1 | 定义与子博弈 | 自切 2 棵树 |
| D2 | 进入博弈 | NE vs SPNE 对照表 |
| D3 | 承诺 C* | 5 组支付临界表 |
| D4 | 讨价还价 BI | T=1…5 份额表 |
| D5 | 斯塔克伯格 | 与古诺对照 |
| D6 | 连锁店悖论 | 半页笔记 |
| D7 | 复盘 | 技能树自测 |

# 30天计划

| 周 | 主题 | 成果 |
|---|---|---|
| W1 | SPNE 基本功 | 10 个小树速解 |
| W2 | 承诺与谈判 | C* + 讨价还价熟练 |
| W3 | 应用与悖论 | 进入/连锁店/蜈蚣卡 |
| W4 | 精炼阶梯 | 何时升级贝叶斯/颤抖手 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | SPNE 定义 | 每个子博弈都是 NE |
| 2 | 逆向归纳 | 有限完美信息的标准算法 |
| 3 | 进入威慑 | 剪不可信价格战 |
| 4 | 承诺行动 | \(C\ge a_I-f_I\) 使威胁可信 |
| 5 | 斯塔克伯格 | 序贯产量 SPNE ≠ 古诺 |
| 6 | 有限讨价还价 | 从末日份额向前折 |
| 7 | Rubinstein 极限 | \(1/(1+\delta)\) |
| 8 | 有限重复解绑 | 阶段唯一 NE ⇒ 每期重复它 |
| 9 | 连锁店悖论 | 多市场有限进入仍解绑 |
| 10 | 一次性偏离原则 | 无限期 SPE 检验工具 |

# 关键问题清单

:::details Q1 对方的威胁到达节点时还最优吗？
比较执行与不执行的支付；不优则不可信。
:::

:::details Q2 我写的策略含离径计划吗？
对每个未达信息集给出行动，否则不是完整策略。
:::

:::details Q3 这是 NE 还是 SPNE？
检查每个子博弈；尤其是均衡路径未达的那些。
:::

:::details Q4 如何让威胁变可信？
沉没成本、合同罚则、第三方、改变行动顺序。
:::

:::details Q5 有限还是无限视野？
有限用逆向归纳；无限用单偏离 + 贴现。
:::

:::details Q6 信息完美吗？
不完美则子博弈可能很少，需信念精炼。
:::

:::details Q7 为何实验不跟 BI？
共同知识理性、利他、错误、声誉——单列假设，勿假装「理论算错」。【分析】
:::

:::details Q8 多重 SPNE 怎么选？
聚点、风险占优、谈判力、外生制度。
:::

:::details Q9 与颤抖手什么关系？
颤抖手 ⇒ SPNE；SPNE 不必是颤抖手完美。【事实】
:::

:::details Q10 今天最小实践是什么？
画一棵进入树并算 C*——见第 22 节。
:::

# 下一阶段探索

- 完美贝叶斯均衡与信号博弈  
- 颤抖手完美与适当均衡  
- 无限重复与无名氏定理细节  
- 行为博弈：认知层次、量化反应  
- 机制设计：如何设计使合意结果成为唯一 SPNE  

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| SPNE 定义与逆向归纳 | 教材 / 百科共识 | 扩展式博弈标准定义；Wikipedia “Subgame perfect equilibrium” 综述 | 【事实】 |
| Selten 1965 / 1975 | 原始论文 | 《Oligopolmodell mit Nachfrageträgheit》(1965)；IJGT 1975 颤抖手论文 | 【事实】 |
| 1994 诺贝尔奖 | 官方 | NobelPrize / BonnEconLab Selten 页 | 【事实】 |
| 进入博弈教学支付 | 教材惯例 | 知经等中文讲义常用 (0,2)/(-1,-1)/(1,1) | 【事实】 |
| 连锁店悖论 | 原始论文 | Selten 1978 *Theory and Decision* | 【事实】 |
| 声誉修补 | 经典论文 | Kreps–Wilson–Milgrom–Roberts 1982 线 | 【分析】 |
| 蜈蚣与 BI 批评 | 学术争论 | Rosenthal 蜈蚣；Binmore / Aumann 关于共同知识理性 | 【分析】 |
| 有限重复 PD 唯一 SPE | 教材定理 | 阶段博弈唯一纯 NE ⇒ 有限重复每期该 NE | 【事实】 |
| Rubinstein 份额 | 标准结果 | 对称 δ 下先手 \(1/(1+\delta)\) | 【事实】 |
| 斯塔克伯格默认数值 | 自算 | \(a=10,b=1,c=2\) 解析解 | 【事实】 |

标记约定：【事实】多方一致或可核验原文；【分析】权威判断/主流解释；【推论】由模型推出；【假设】未验证；【待验证】单一来源或转载链过长。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，**不是**投资、法律、竞争策略或商业咨询建议。文中数值多为教学约定或解析示例，不代表任何真实市场预测。将 SPNE 用于商业决策时，须自行核验支付、信息与制度约束；模型误设（尤其是「威胁可信性」）可能导致严重误判。作者与引擎不对依据本手册采取的行动承担责任。
