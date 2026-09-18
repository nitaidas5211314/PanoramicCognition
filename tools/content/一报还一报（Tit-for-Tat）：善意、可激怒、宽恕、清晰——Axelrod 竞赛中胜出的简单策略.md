---
slug: 一报还一报（Tit-for-Tat）：善意、可激怒、宽恕、清晰——Axelrod 竞赛中胜出的简单策略
title: 一报还一报（Tit-for-Tat）：善意、可激怒、宽恕、清晰
subtitle: Axelrod 迭代囚徒困境竞赛中，最简单的规则——<strong>先合作，此后复制对方上一步</strong>——两次夺冠。它从不「赢过」对手，却靠诱发合作拿总分；噪声一来，同一规则会掉进报复螺旋。
brand_sub: Tit-for-Tat × Reciprocity × Axelrod Tournament
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [以牙还牙, Tit-for-Tat, Axelrod, 囚徒困境, 互惠, 合作演化, 噪声, Pavlov]
theme_js_file: 一报还一报（Tit-for-Tat）：善意、可激怒、宽恕、清晰——Axelrod 竞赛中胜出的简单策略.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**一报还一报（Tit-for-Tat, TFT）**：第一步合作（C）；此后每一步做对方上一步做过的事——对方合作你就合作，对方背叛你就背叛。【事实】

它由多伦多大学的 Anatol Rapoport 提交，在 Robert Axelrod 1980 年两轮迭代囚徒困境计算机锦标赛中**两次夺冠**（第一轮 14 个程序、第二轮 62 个程序且参赛者已知 TFT 胜出）。标准支付 \(R=3,T=5,P=1,S=0\)、每局 200 步时，TFT 场均约 **504** 分（双方始终合作上限 600）。【事实】

Axelrod 总结其稳健成功靠四性：**善意（nice）**——从不先背叛；**可激怒（provocable）**——立刻惩罚；**宽恕（forgiving）**——惩罚一次即停；**清晰（clear）**——对手能读懂并适应。【分析】

关键修正：零噪声下 TFT 极强；有执行/感知误差时，两 TFT 会进入 CD/DC 交替，长期期望每期仅 \((R+S+T+P)/4=\mathbf{2.25}\)（相对合作的 3）。慷慨 TFT、Contrite TFT、Pavlov（Win-Stay Lose-Shift）因此登场。【事实】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「以牙还牙」这句俗语，而是一类**历史依存互惠规则**：在重复囚徒困境（IPD）里，如何用极短记忆诱发并维持合作——以及它在噪声、种群漂移、支付标定下何时失效。

边界：

- **在界内**：TFT 及其变体（TFTT、GTFT、Contrite TFT）、Axelrod 锦标赛与生态模拟、集体稳定条件 \(w^*\)、噪声报复螺旋、与 grim / Pavlov / ALLD 的对照、壕沟「live and let live」等互惠案例与误用批评。
- **在界外**：一次性谈判话术、私人恩怨报复心理、某次外交声明——除非压成「规则、可观察性、续局概率、噪声」的建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 最短记忆互惠如何诱发合作，以及失效边界 |
| 2 | 边界在哪 | 到策略规则 + 支付 + 噪声 + 种群可形式化为止 |
| 3 | 核心对象 | TFT、四性、IPD 支付、噪声、续局 \(w\)、变体策略 |
| 4 | 参与者 | 策略程序员、演化种群中的个体、国家/企业/算法 agent |
| 5 | 关键变量 | \(T,R,P,S\)、\(w\)/\(\delta\)、误差率 \(\varepsilon\)、慷慨度 \(q\) |
| 6 | 可直接观察 | 行动序列、锦标赛总分、违约记录、互动频率 |
| 7 | 无法直接观察 | 意图、真实耐心、误判信念、对手策略复杂度 |
| 8 | 谁影响谁 | 首步善意 → 合作开局；惩罚 → 抑制剥削；宽恕 → 止住螺旋 |
| 9 | 因果关系 | 复制上一步 ⇒ 对 TFT 镜像合作；对 ALLD 被锁在 \(P\) |
| 10 | 只是相关 | 「对等报复文化」≠ TFT；TFT 从不先打，且惩罚有限【分析】 |
| 11 | 表层现象 | 回头客诚信、价格战停火、壕沟互不狙击、平台信誉分 |
| 12 | 底层机制 | 让剥削的短期收益被未来惩罚贴现掉，且规则可识别 |
| 13 | 有反馈吗 | 有。合作自我强化；一次误伤可正反馈成报复螺旋 |
| 14 | 有延迟吗 | 有。监测滞后削弱「可激怒」；声誉传播延迟削弱阴影 |
| 15 | 正/负反馈 | 误伤螺旋正反馈；慷慨/对质（contrition）负反馈 |

## 最关键的一句话

> TFT 赢的不是「比对手多拿分」，而是**让对手愿意跟你一起拿高分**——它几乎从不在双边对局里领先，却在循环赛里总分第一。

# 为什么值得研究

:::cards g3
### 它是互惠的最小可执行程序
两行规则就能把「合作、惩罚、宽恕」编进策略——可教学、可模拟、可嵌入制度设计。【事实】

### 它连接竞赛、演化与制度
锦标赛给出「什么得分高」；演化给出「什么能站住」；噪声文献给出「什么在真实世界更稳健」。【分析】

### 它强迫你看见「简单」的边界
零噪声冠军 ≠ 噪声冠军；集体稳定 ≠ 演化稳定；故事案例 ≠ PD 结构。【分析】
:::

:::note amber 最贵的一次误判
把「以牙还牙」理解成「永远加倍报复」或「先下手为强」——那是 ALLD 或惩罚螺旋，恰恰违反 TFT 的善意与有限宽恕。【分析】
:::

# 世界地图

九层看 TFT 如何从两行规则长成合作演化与制度。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="tfL9" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 拉长阴影 / 降噪声 / 改支付 / 可识别身份</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 噪声稳健 · GTFT / Contrite TFT / Pavlov（WSLS）</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 演化与漂移 · ALLC 入侵风险 · 集体稳定 vs ESS</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 生态模拟 · 高分策略互相喂分 · 「不赢对手却赢总分」</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 Axelrod 锦标赛 · 两轮夺冠 · 四性总结</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 集体稳定 · w* = max((T−R)/(T−P),(T−R)/(R−S)) = 2/3</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 对局剖面 · vs TFT/ALLC/ALLD/RANDOM 的得分结构</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 四性 · 善意 · 可激怒 · 宽恕 · 清晰</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 规则内核 · 首步 C，此后复制对方上一步</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L1→L2**：先会写规则、会辨四性；进阶卡在 **L4**（续局门槛）与 **L8**（噪声下别死磕严格 TFT）。
:::

# 核心概念地图

从两行规则到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="tfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="tfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="160" y="16" width="360" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">TFT = 首 C + 镜像上一步</text>

  <rect x="40" y="100" width="180" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="130" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">抽象：四性 / 互惠 / 记忆-1</text>
  <rect x="250" y="100" width="180" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">机制：诱发合作 · 止住剥削</text>
  <rect x="460" y="100" width="180" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">操作：选对手 · 控噪声 · 改 w</text>

  <line x1="280" y1="60" x2="130" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#tfA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#tfA)"/>
  <line x1="400" y1="60" x2="550" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#tfA)"/>

  <rect x="40" y="190" width="180" height="64" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="130" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：是否先背叛？</text><text x="130" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">否 → 善意成立</text>
  <rect x="250" y="190" width="180" height="64" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：w ≥ 2/3？</text><text x="340" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">是 → 集体可稳定</text>
  <rect x="460" y="190" width="180" height="64" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="550" y="218" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">问：ε 是否可忽略？</text><text x="550" y="238" text-anchor="middle" fill="#454c56" font-size="11" font-family="sans-serif">否 → 加慷慨/对质</text>

  <line x1="130" y1="152" x2="130" y2="190" stroke="#0f8a4d" stroke-width="1.2" marker-end="url(#tfA)"/>
  <line x1="340" y1="152" x2="340" y2="190" stroke="#1d4ed8" stroke-width="1.2" marker-end="url(#tfA)"/>
  <line x1="550" y1="152" x2="550" y2="190" stroke="#b8730a" stroke-width="1.2" marker-end="url(#tfA)"/>

  <path d="M220,222 Q340,280 460,222" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#tfB)"/>
  <text x="340" y="300" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：误伤 → 交替报复 → 需宽恕机制打断</text>
</svg>
:::

# 核心参与者

| 角色 | 激励 | 在 TFT 世界里做什么 |
|---|---|---|
| Anatol Rapoport | 和平研究 + 策略简洁 | 提交两行规则的 TFT |
| Robert Axelrod | 理解合作如何涌现 | 办锦标赛、做生态模拟、提炼四性 |
| 其他参赛策略 | 最大化循环赛总分 | 尝试剥削、试探、复杂启发式 |
| ALLD / 剥削者 | 吃傻瓜 | 对 TFT 首步得 \(T\)，此后锁 \(P\) |
| ALLC / 无条件合作者 | （或漂移）始终合作 | 被 Pavlov 剥削；与 TFT 镜像得 \(R\) |
| 制度设计者 | 提高合作稳态 | 拉长阴影、降噪声、提高身份可识别 |

# 核心变量

| 变量 | 符号 | 作用 |
|---|---|---|
| 合作奖励 | \(R\) | TFT–TFT 稳态每期支付（经典 = 3） |
| 背叛诱惑 | \(T\) | 单方剥削收益；抬高集体稳定门槛 |
| 相互惩罚 | \(P\) | 对 ALLD 的长期支付（经典 = 1） |
| 傻瓜支付 | \(S\) | 被剥削；TFT 只在首步对 ALLD 吃一次 |
| 续局概率 | \(w\) | 未来阴影；TFT 集体稳定需 \(w\ge 2/3\)（经典支付） |
| 误差率 | \(\varepsilon\) | 执行/感知噪声；触发报复螺旋 |
| 慷慨度 | \(q\) | GTFT：观测到 D 后仍以 \(q\) 概率回 C |

:::note green 判定口诀
**TFT ⇔ 首 C + 复制对方上一步**。缺「首 C」就不是善意策略；缺「只罚一步」就不是宽恕策略。【事实】
:::

<!-- nav:机制与激励 -->
# 因果关系

:::raw
<div class="flow"><span>首步 C</span><i>→</i><span class="hi">善意开局</span><i>→</i><span>镜像回应</span><i>→</i><span class="hi">诱发合作 / 抑制剥削</span><i>→</i><span>循环赛高总分</span></div>
:::

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="30" width="130" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="85" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">对手上一步</text>
  <rect x="180" y="30" width="130" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="245" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">TFT 复制</text>
  <rect x="340" y="30" width="130" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="405" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">即时奖惩</text>
  <rect x="500" y="30" width="160" height="50" rx="8" fill="#fde8e8" stroke="#d5342c"/><text x="580" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">总分 / 生态份额</text>
  <line x1="150" y1="55" x2="180" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="310" y1="55" x2="340" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <line x1="470" y1="55" x2="500" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cfA)"/>
  <rect x="180" y="130" width="280" height="50" rx="8" fill="#15181d"/><text x="320" y="160" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">噪声 ε → 交替 CD/DC → 需慷慨/对质打断</text>
  <path d="M405,80 Q405,110 320,130" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cfB)"/>
  <text x="500" y="120" fill="#d5342c" font-size="11" font-family="sans-serif">反馈：误伤螺旋</text>
</svg>
:::

# 隐藏关系

- **从不赢对手却赢锦标赛**：TFT 对任何对手的得分 ≤ 对手得分（最多追平）；它靠与其他「善意」策略互相喂 \(R\) 拉高平均分。【事实】
- **Tit-for-Two-Tats 的反事实**：Axelrod 指出若第一轮有人提交「连续两次 D 才报复」的 TFTT，它本可夺冠——宽恕度与剥削风险之间有权衡。【分析】
- **噪声下的数学暴跌**：无限重复、对称误差时，两 TFT 期望每期 \((R+S+T+P)/4=2.25\)，相对无噪声的 3 掉约 **25%**。【事实】
- **Pavlov 的双重优势**：Win-Stay Lose-Shift 能纠错，也能剥削 ALLC，从而减缓「合作者漂移 → 招来 ALLD」的路径。【事实】
- **跨域同构**：TFT ↔ TCP 拥塞控制的 AIMD 互惠 ↔ 免疫系统的「识别-记忆-再响应」 ↔ 贸易报复条款的对称升级——都是**条件反应 + 有限惩罚**。【推论】

# 系统运行机制

零噪声 IPD 中 TFT 的运行极简：

1. \(t=1\)：出 C  
2. \(t\ge 2\)：出对方在 \(t-1\) 的行动  
3. 对另一 TFT / ALLC / grim（未触发）：全程 \(R\)  
4. 对 ALLD：\(t=1\) 得 \(S\)，之后每期 \(P\)（经典 200 步总分 **199**；ALLD 得 **204**）  
5. 循环赛目标是**平均分**，不是单场「赢对面」

有噪声时多一步：观测/执行翻转 → 对方惩罚 → 你惩罚其惩罚 → **交替缺陷**直至再翻转或引入宽恕。

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="evA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="3"/>
  <circle cx="80" cy="100" r="10" fill="#0f8a4d"/><text x="80" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1980-1</text><text x="80" y="78" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">14 程序</text><text x="80" y="140" text-anchor="middle" fill="#0f8a4d" font-size="11" font-family="sans-serif">TFT 夺冠</text>
  <circle cx="220" cy="100" r="10" fill="#1d4ed8"/><text x="220" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1980-2</text><text x="220" y="78" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">62 程序</text><text x="220" y="140" text-anchor="middle" fill="#1d4ed8" font-size="11" font-family="sans-serif">TFT 再冠</text>
  <circle cx="360" cy="100" r="10" fill="#b8730a"/><text x="360" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1984</text><text x="360" y="78" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">专著</text><text x="360" y="140" text-anchor="middle" fill="#b8730a" font-size="11" font-family="sans-serif">四性 + 阴影</text>
  <circle cx="500" cy="100" r="10" fill="#d5342c"/><text x="500" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">1990s</text><text x="500" y="78" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">噪声</text><text x="500" y="140" text-anchor="middle" fill="#d5342c" font-size="11" font-family="sans-serif">GTFT/Pavlov</text>
  <circle cx="620" cy="100" r="10" fill="#15181d"/><text x="620" y="60" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">今</text><text x="620" y="78" text-anchor="middle" fill="#454c56" font-size="10" font-family="sans-serif">多智能体</text><text x="620" y="140" text-anchor="middle" fill="#15181d" font-size="11" font-family="sans-serif">算法互惠</text>
  <line x1="90" y1="100" x2="210" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#evA)"/>
  <line x1="230" y1="100" x2="350" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#evA)"/>
  <line x1="370" y1="100" x2="490" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#evA)"/>
  <line x1="510" y1="100" x2="610" y2="100" stroke="#1d4ed8" stroke-width="2" marker-end="url(#evA)"/>
</svg>
:::

| 阶段 | 发生什么 | 对 TFT 的含义 |
|---|---|---|
| 锦标赛期 | 零噪声、固定对手池 | TFT 靠四性拿总分 |
| 理论提炼期 | 集体稳定、阴影效应 | \(w^*\!=\!2/3\) 成为教学标尺 |
| 噪声期 | 误差、感知混淆 | 严格 TFT 脆弱；变体崛起 |
| 多智能体期 | 算法定价、平台信誉 | 规则要可审计、可降噪 |

# 利益与激励

| 主体 | 想要什么 | TFT 如何对齐 / 冲突 |
|---|---|---|
| 善意策略簇 | 互相拿 \(R\) | TFT 是簇内「好公民」 |
| 剥削者 | 吃 \(T\) | TFT 立刻惩罚，长期锁 \(P\) |
| 锦标赛选手 | 平均分最高 | 复杂策略常因「不够清晰」互相误伤 |
| 种群中的 TFT | 抵抗入侵 | 对 ALLD 尚可；对 ALLC 漂移+噪声更弱 |
| 政策制定者 | 社会合作 | 可借用互惠，但须处理噪声与身份 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="flB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="30" width="140" height="50" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="110" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">行动可观察</text>
  <rect x="270" y="30" width="140" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="340" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">记忆长度 = 1</text>
  <rect x="500" y="30" width="140" height="50" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="570" y="60" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">支付流 R/T/P/S</text>
  <line x1="180" y1="55" x2="270" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="410" y1="55" x2="500" y2="55" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <rect x="150" y="130" width="380" height="70" rx="8" fill="#15181d"/><text x="340" y="160" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">信息瓶颈：只看上一步 · 资源瓶颈：未来阴影 w</text><text x="340" y="182" text-anchor="middle" fill="#9aa3ad" font-size="11" font-family="sans-serif">噪声污染观测 → 支付从 R 抽向 (R+S+T+P)/4</text>
  <path d="M340,80 L340,130" fill="none" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#flB)"/>
</svg>
:::

TFT 几乎不消耗信息：只要上一行动可信。**抽水点**是噪声与不可识别身份——一旦「你是谁」模糊，互惠无法对准同一对手，阴影塌缩。

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

| 序 | 杠杆 | 为何有效 | 成本 |
|---|---|---|---|
| 1 | **拉长阴影 \(w\)** | 抬高偏离的未来成本，TFT 才站得住 | 中：要真的重复见面 |
| 2 | **降低噪声 \(\varepsilon\)** | 直接切断报复螺旋 | 中：监测、确认、对质 |
| 3 | **坚持善意开局** | 避免不必要冲突，进入高分簇 | 低 |
| 4 | **有限、对称惩罚** | 可激怒但不永久记仇 | 低 |
| 5 | **规则清晰可预测** | 对手（与自己）能适应 | 低 |
| 6 | **适度慷慨 \(q\)** | 噪声环境下恢复合作 | 低–中：防被剥削 |
| 7 | **身份可识别** | 惩罚对准施害者而非路人 | 中 |
| 8 | **分阶段交付** | 把大背叛拆成可 reciprocal 的小步 | 中 |
| 9 | **选对手池** | 远离 ALLD 主导的环境 | 视场景 |
| 10 | **必要时换 Pavlov/GTFT** | 当 \(\varepsilon\) 不可压时换规则 | 中：要会诊断 |

# 常见认知陷阱

:::details 1. 「以牙还牙 = 先下手 / 加倍报复」
TFT **从不先背叛**，且只复制一步，不是 2-for-1 血仇。【事实】
:::

:::details 2. 「TFT 总能战胜对手」
双边对局里它几乎从不领先；锦标赛赢的是**平均分**。【事实】
:::

:::details 3. 「锦标赛冠军 = 普适最优」
对手池、噪声、支付标定一变，排名就变；第二轮已知 TFT 仍夺冠，说明稳健，不证明万能。【分析】
:::

:::details 4. 「有噪声也继续严格镜像」
严格 TFT 在误差下期望掉到 2.25；需要慷慨或对质。【事实】
:::

:::details 5. 「宽恕 = 无底线」
TFT 的宽恕是「惩罚一次后若对方改回就跟回」；不是忽略持续剥削。【分析】
:::

:::details 6. 「复杂策略一定更强」
Axelrod 的惊讶点：最简单程序赢了专家提交的复杂规则——清晰本身是资产。【事实】
:::

:::details 7. 「壕沟停火证明 TFT 万能」
「live and let live」是互惠案例，但是否严格 PD、指挥部突袭如何破坏阴影，存在史学与方法论争论。【待验证】【分析】
:::

:::details 8. 「集体稳定 = 演化稳定」
TFT 种群可被 ALLC 漂移削弱，再被 ALLD 入侵；Pavlov 在部分设定下更抗漂移。【事实】
:::

:::details 9. 「无限宽恕的 TFTT 总更好」
反事实里 TFTT 可赢第一轮，但在更多剥削者的池子里可能被吃；宽恕有最优区间。【分析】
:::

:::details 10. 「把商业竞争都叫成 TFT」
许多冲突是鸡博弈、协调或零和，不是 IPD；乱贴标签会导出错误报复政策。【分析】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs>
    <marker id="mapA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="20" y="20" width="200" height="240" rx="10" fill="#e8f8ef" stroke="#0f8a4d"/>
  <text x="120" y="50" text-anchor="middle" fill="#0f8a4d" font-size="13" font-weight="700" font-family="sans-serif">抽象</text>
  <text x="120" y="90" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">首 C + 镜像</text>
  <text x="120" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">四性</text>
  <text x="120" y="150" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">w* / ε</text>
  <text x="120" y="180" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">诱发合作</text>

  <rect x="240" y="20" width="200" height="240" rx="10" fill="#eaf0ff" stroke="#1d4ed8"/>
  <text x="340" y="50" text-anchor="middle" fill="#1d4ed8" font-size="13" font-weight="700" font-family="sans-serif">机制</text>
  <text x="340" y="90" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">重复见面</text>
  <text x="340" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">可观察行动</text>
  <text x="340" y="150" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">对称有限惩罚</text>
  <text x="340" y="180" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">确认降噪</text>

  <rect x="460" y="20" width="200" height="240" rx="10" fill="#fff7e6" stroke="#b8730a"/>
  <text x="560" y="50" text-anchor="middle" fill="#b8730a" font-size="13" font-weight="700" font-family="sans-serif">操作</text>
  <text x="560" y="90" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">合同分期</text>
  <text x="560" y="120" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">SLA + 对等条款</text>
  <text x="560" y="150" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">误伤对质通道</text>
  <text x="560" y="180" text-anchor="middle" fill="#15181d" font-size="12" font-family="sans-serif">信誉身份绑定</text>

  <line x1="220" y1="140" x2="240" y2="140" stroke="#1d4ed8" stroke-width="2" marker-end="url(#mapA)"/>
  <line x1="440" y1="140" x2="460" y2="140" stroke="#1d4ed8" stroke-width="2" marker-end="url(#mapA)"/>
</svg>
:::

# 从理论到行动

| 理论命题 | 行动翻译 |
|---|---|
| 善意 | 新关系默认履约 / 共享，不先挖坑 |
| 可激怒 | 违约有即时、成比例的回应（暂停优惠、催收、对等关税） |
| 宽恕 | 对方回到履约轨道后，停止惩罚，不永久拉黑（除非持续剥削） |
| 清晰 | 规则写清楚：触发条件、惩罚幅度、恢复条件 |
| 降噪 | 重大行动前二次确认；区分「迟交」与「欺诈」 |
| 抬 \(w\) | 把一锤子买卖改成多期合作 / 会员 / 分期交付 |

# 技能树

:::details Lv1 会写规则
能用自然语言与伪代码写出 TFT；能与 ALLD/ALLC/随机对照手算 5–10 步。【事实】
:::

:::details Lv2 会算门槛
能算经典支付下 \(w^*=2/3\)、grim 的 \(\delta^*=0.5\)；能解释为何不同。【事实】
:::

:::details Lv3 会诊断噪声
看到交替背叛序列能识别「可能是误伤螺旋」而非「对方变坏了」。【分析】
:::

:::details Lv4 会选变体
按 \(\varepsilon\) 与对手池在 TFT / GTFT / Contrite / Pavlov 间切换。【分析】
:::

:::details Lv5 会改结构
不只选策略，还能改 \(w\)、可观察性、支付（机制设计）。【分析】
:::

# 游戏化世界

把 IPD 想成开放世界：你是记忆长度为 1 的互惠旅人。主线任务是**在循环赛里活到高平均分**；支线是识别噪声副本、逃离 ALLD 巢穴、组建善意公会。Boss 不是「最狠的背叛者」，而是**让你误判并自我螺旋的噪声**。

# 任务系统

| 任务 | 目标 | 验收 |
|---|---|---|
| 新手村 | 手算 TFT vs ALLD 前 5 步 | 写出支付序列 |
| 主线 | 用下方滑块跑完 200 步对局 | 读数与手算一致 |
| 支线·噪声 | \(\varepsilon=5\%\) 时比较 \(q=0\) 与 \(q=0.3\) | 人均期收益回升 |
| 支线·门槛 | 调 \(T,R\) 看 \(w^*\) 变化 | 能口述公式 |
| 周常 | 把一段真实冲突压成「是否 IPD + 四性清单」 | 一页笔记 |

# 反事实模拟

:::tabs
@@对局模拟器
固定支付 \(R=3,T=5,P=1,S=0\)。选对手与步数，看 TFT 累计得分——注意：**对 ALLD「输掉」单场，仍可能在多种对手混合时平均分领先**。

:::raw
<div class="tool" id="toolMatch">
  <div class="ctrl">
    <label>对手策略 <output id="m_oppO">ALLD</output>
      <input type="range" id="m_opp" min="0" max="4" step="1" value="1">
    </label>
    <label>步数 N <output id="m_nO">200</output>
      <input type="range" id="m_n" min="20" max="400" step="10" value="200">
    </label>
  </div>
  <div class="readout">
    <div class="ro">TFT 总分 <b id="m_tft">199</b></div>
    <div class="ro">对手总分 <b id="m_oppS">204</b></div>
    <div class="ro">TFT 场均 <b id="m_avg">0.995</b></div>
    <div class="ro">分差 TFT−对手 <b id="m_diff">−5</b></div>
    <div id="m_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="mChart" height="214" style="width:100%;display:block"></canvas>
</div>
:::

@@噪声与慷慨
两 TFT（或 GTFT）互相对局：误差率 \(\varepsilon\) 与慷慨度 \(q\)（观测到 D 后仍以 \(q\) 回 C）。无噪声时期望 3；严格 TFT 噪声下逼近 2.25。

:::raw
<div class="tool" id="toolNoise">
  <div class="ctrl">
    <label>误差率 ε (%) <output id="n_epsO">5.0</output>
      <input type="range" id="n_eps" min="0" max="20" step="0.5" value="5">
    </label>
    <label>慷慨度 q <output id="n_qO">0.00</output>
      <input type="range" id="n_q" min="0" max="0.5" step="0.05" value="0">
    </label>
    <label>模拟步数 <output id="n_stepsO">2000</output>
      <input type="range" id="n_steps" min="200" max="5000" step="100" value="2000">
    </label>
  </div>
  <div class="readout">
    <div class="ro">A 期均 <b id="n_a">—</b></div>
    <div class="ro">B 期均 <b id="n_b">—</b></div>
    <div class="ro">相对无噪声 <b id="n_rel">—</b></div>
    <div class="ro">理论噪声底 <b id="n_floor">2.25</b></div>
    <div id="n_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="nChart" height="214" style="width:100%;display:block"></canvas>
</div>
:::

@@集体稳定 w*
TFT 在「几乎全是 TFT」的种群里抵抗少数入侵者的经典条件：\(w \ge \max\!\big(\frac{T-R}{T-P},\frac{T-R}{R-S}\big)\)。标准支付下 = **2/3**。

:::raw
<div class="tool" id="toolW">
  <div class="ctrl">
    <label>R <output id="w_rO">3.0</output>
      <input type="range" id="w_r" min="1" max="6" step="0.1" value="3">
    </label>
    <label>T <output id="w_tO">5.0</output>
      <input type="range" id="w_t" min="2" max="10" step="0.1" value="5">
    </label>
    <label>P <output id="w_pO">1.0</output>
      <input type="range" id="w_p" min="0" max="4" step="0.1" value="1">
    </label>
    <label>S <output id="w_sO">0.0</output>
      <input type="range" id="w_s" min="-2" max="2" step="0.1" value="0">
    </label>
    <label>实际 w <output id="w_wO">0.70</output>
      <input type="range" id="w_w" min="0.05" max="0.99" step="0.01" value="0.70">
    </label>
  </div>
  <div class="readout">
    <div class="ro">w* <b id="w_star">0.667</b></div>
    <div class="ro">(T−R)/(T−P) <b id="w_a">0.500</b></div>
    <div class="ro">(T−R)/(R−S) <b id="w_b">0.667</b></div>
    <div class="ro">判定 <b id="w_ok">稳定</b></div>
    <div id="w_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="wChart" height="214" style="width:100%;display:block"></canvas>
</div>
:::

@@四性体检
把一段关系压成四性打分（0–10）。总分低不代表「道德差」，而代表**互惠机器缺零件**。

:::raw
<div class="tool" id="toolFour">
  <div class="ctrl">
    <label>善意 nice <output id="f_nO">8</output>
      <input type="range" id="f_n" min="0" max="10" step="1" value="8">
    </label>
    <label>可激怒 retal <output id="f_rO">7</output>
      <input type="range" id="f_r" min="0" max="10" step="1" value="7">
    </label>
    <label>宽恕 forgive <output id="f_gO">6</output>
      <input type="range" id="f_g" min="0" max="10" step="1" value="6">
    </label>
    <label>清晰 clear <output id="f_cO">9</output>
      <input type="range" id="f_c" min="0" max="10" step="1" value="9">
    </label>
  </div>
  <div class="readout">
    <div class="ro">四性均分 <b id="f_avg">7.5</b></div>
    <div class="ro">最短板 <b id="f_min">宽恕 6</b></div>
    <div class="ro">TFT 相似度 <b id="f_sim">75%</b></div>
    <div class="ro">建议焦点 <b id="f_focus">—</b></div>
    <div id="f_vh" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline;font-size:13px;color:#454c56"></div>
  </div>
  <canvas id="fChart" height="214" style="width:100%;display:block"></canvas>
</div>
:::
:::

# 四级能力路线

| 级别 | 能力 | 验收标准 |
|---|---|---|
| L1 识记 | 能陈述规则与四性 | 30 秒口述无漏 |
| L2 计算 | 能算对局分与 \(w^*\) | 与滑块/手算一致 |
| L3 诊断 | 能区分剥削与误伤螺旋 | 给序列能定性 |
| L4 设计 | 能改 \(w\)/\(\varepsilon\)/变体 | 写出一页干预方案 |

# 30分钟最小实践

1. **5 分钟**：列出一个你会反复遇到的人对人关系（同事交接、供应商、开源维护者）。  
2. **10 分钟**：用四性体检滑块自评现状；记下最短板。  
3. **10 分钟**：设计一条「可激怒但不永久」的规则（触发条件 + 惩罚 + 恢复条件），写进备忘录。  
4. **5 分钟**：加一条降噪动作（例如争议前先书面确认事实）。  

验收：你有一张可执行的互惠卡片，而不是一句「以后要硬气」。

# 7天计划

| 天 | 主题 | 产出 |
|---|---|---|
| D1 | 规则与四性 | 闪卡 8 张 |
| D2 | 对局手算 | TFT vs ALLD/ALLC 各 10 步 |
| D3 | 滑块对局 | 记录 4 种对手的总分 |
| D4 | \(w^*\) | 改 T、R 各三次，记门槛 |
| D5 | 噪声 | \(\varepsilon,q\) 网格 3×3 观察 |
| D6 | 案例 | 壕沟停火或平台信誉：对照四性 |
| D7 | 复盘 | 一页「我的互惠规则 v0.1」 |

# 30天计划

| 周 | 焦点 | 里程碑 |
|---|---|---|
| W1 | 形式化 | 独立推导 \(w^*\)，默写噪声期望 2.25 |
| W2 | 变体 | 比较 TFT/GTFT/Pavlov 伪代码 |
| W3 | 实地 | 选一段真实合作，落地「惩罚-恢复」条款 |
| W4 | 机制 | 提出一项抬 \(w\) 或降 \(\varepsilon\) 的结构改动并试行两周 |

<!-- nav:模型与清单 -->
# 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | TFT 规则 | 首 C，此后镜像 |
| 2 | 四性 | 善意·可激怒·宽恕·清晰 |
| 3 | 支付四元组 | \(T>R>P>S\)（及 \(2R>T+S\)） |
| 4 | 锦标赛总分 | 赢平均，不赢单场 |
| 5 | 集体稳定 \(w^*\) | \(\max(\frac{T-R}{T-P},\frac{T-R}{R-S})\) |
| 6 | 噪声底 | \((R+S+T+P)/4\) |
| 7 | GTFT | 对 D 以 \(q\) 宽恕 |
| 8 | Contrite TFT | 「我若误伤则不报复对方的报复」 |
| 9 | Pavlov / WSLS | 赢则留、输则换；可纠错可剥削 ALLC |
| 10 | 阴影效应 | 未来权重决定互惠能否站住 |

# 关键问题清单

:::details Q1 TFT 和「复仇」有何不同？
TFT 不先打、惩罚幅度等于对方上一步、对方改回就跟回；复仇常升级、延迟、对准身份而非行动。【分析】
:::

:::details Q2 为什么第二轮知道 TFT 能赢还有人输给它？
复杂策略彼此误伤、或试图剥削善意簇时被惩罚；清晰与善意仍是高分簇入场券。【分析】
:::

:::details Q3 经典 200 步 TFT vs ALLD 为什么是 199 : 204？
首步 \(S=0\) vs \(T=5\)，后 199 步双方 \(P=1\) → \(0+199=199\) 对 \(5+199=204\)。【事实】
:::

:::details Q4 \(w^*=2/3\) 从哪来？
标准支付下 \(\frac{T-R}{T-P}=\frac{2}{4}=0.5\)，\(\frac{T-R}{R-S}=\frac{2}{3}\)；取 max。【事实】
:::

:::details Q5 噪声期望为什么是 2.25？
交替与随机化使四种结果 CC/CD/DC/DD 等权，均值 \((3+0+5+1)/4\)。【事实】
:::

:::details Q6 何时改用 Pavlov？
需要纠错且担心 ALLC 漂移时；注意交替 PD 与同时 PD 结论不同。【分析】
:::

:::details Q7 TFT 是纳什均衡策略吗？
在重复 PD 中，TFT 策略对在足够 \(w\) 下可支撑合作路径；一次性 PD 里纯 TFT 不适用（无历史）。【事实】
:::

:::details Q8 「永不原谅」的 grim 是否更好？
对剥削更狠，但噪声下更易锁死在 \(P\)；宽恕与威慑之间需权衡。【分析】
:::

:::details Q9 如何把 TFT 用到管理而不变成整人？
惩罚对事不对人、幅度预告、恢复条件明确、重大处分前降噪核实。【分析】
:::

:::details Q10 Axelrod 的结论有哪些主要批评？
锦标赛生态依赖对手池；演化稳定性与噪声稳健性后续文献有修正；现实案例是否 PD 存疑。【分析】
:::

# 下一阶段探索

- 读 Axelrod《The Evolution of Cooperation》锦标赛章 + 噪声应对论文（Generous / Contrite / Pavlov）  
- 与本系列《囚徒困境》《重复博弈与阴影效应》《无名氏定理》对照：TFT 是策略实例，阴影是条件，无名氏是均衡集合  
- 进阶：有限状态自动机、直接 vs 间接互惠、多智能体强化学习中的互惠涌现  

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| TFT 规则与两轮夺冠 | 期刊论文 | Axelrod, *J. Conflict Resolution* 1980（Effective Choice / More Effective Choice） | 【事实】 |
| 场均约 504、支付 3/5/1/0、200 步 | 专著/二手整理 | Axelrod 1984；PPE Review 等转述 | 【事实】【待验证】（504 为文献常用转述） |
| 四性总结 | 专著 | Axelrod, *The Evolution of Cooperation* | 【分析】（作者归纳） |
| TFTT 反事实可赢第一轮 | 专著/Heritage 叙述 | Axelrod 分析；U-M Heritage Project | 【分析】 |
| 噪声期望 (R+S+T+P)/4 | 理论 | Nowak & Sigmund 等；Imhof et al. 综述 | 【事实】 |
| Pavlov / WSLS 优于噪声 TFT | 期刊 | Nowak & Sigmund, *Nature* 1993 等 | 【事实】 |
| Generous / Contrite 应对噪声 | 期刊 | Axelrod 等；Bendor / Wu-Axelrod 噪声锦标赛文献 | 【分析】 |
| 壕沟 live and let live | 历史案例 | Axelrod 1984 Ch.4；后续 PD 适用性批评 | 【分析】【待验证】 |
| \(w^*=2/3\) | 教材推导 | 标准 IPD 集体稳定条件 | 【事实】 |

标记约定：【事实】多方一致或可推导；【分析】权威归纳；【推论】跨域类比；【假设】未验证；【待验证】单一转述链。

# 免责声明 {.appendix}

本手册为认知与决策框架学习材料，不构成法律、外交、投资、人力资源处分或任何对抗性行动建议。把博弈论隐喻映射到现实冲突时，须单独验证是否满足囚徒困境支付结构、可观察性与重复条件；错误建模可能导致不当报复或合作崩盘。读者应自行承担应用风险。
