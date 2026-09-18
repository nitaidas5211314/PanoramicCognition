---
slug: 共同知识（Common Knowledge）：我知道，你知道我知道，我知道你知道我知道……无限递归，这是均衡成立的前提
title: 共同知识（Common Knowledge）：我知道，你知道我知道……无限递归，这是均衡成立的前提
subtitle: 「大家都知道」只是<strong>共有知识</strong>；真正让协调、均衡与协议成立的，是无限阶的<strong>共同知识</strong>——我知道你知道我知道……。差一点，常常等于差全部。
brand_sub: Common Knowledge × Epistemic Game Theory
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 决策框架非投资建议
date: 2026-09-19
data_asof: 2026 年 9 月
tags: [博弈论, 共同知识, 认知博弈, Aumann, 协调失败, 电子邮件博弈]
theme_js_file: 共同知识（Common Knowledge）：我知道，你知道我知道，我知道你知道我知道……无限递归，这是均衡成立的前提.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

**共同知识（Common Knowledge, CK）**：事件 \(E\) 在群体中是共同知识，当且仅当人人知道 \(E\)，人人知道人人知道 \(E\)，……，无限递归。【事实】

它比「共有知识 / 相互知识（Mutual Knowledge）」强一个数量级：**共有**只要求一阶「大家都知道」；**共同**要求无穷阶。许多协调、纳什均衡辩护、协议达成，在模型里**依赖 CK 而不是 MK**——电子邮件博弈与协调进攻悖论说明：任意有限阶「几乎共同知识」仍可能与 CK 的行为预测**不连续**。【分析】

<!-- nav:世界模型 -->
# 这个领域到底是什么

研究的不是「公开信息多不多」，而是：在多人互动里，**关于他人信念的信念**如何层层嵌套，并决定谁敢走出安全行动、谁敢坚持分歧、哪种公开宣告真正改变博弈。

边界：

- **在界内**：知识算子、共有/共同知识、公共宣告、Aumann 同意定理、电子邮件博弈、蓝眼睛归纳、共同知识的理性（CKR）及其批评、公共信号与协调。
- **在界外**：具体聊天软件协议实现、法庭证据规则细节——除非压缩成「某条信息是否成为 CK」这一建模问题。

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 高阶信念如何支撑（或摧毁）协调与均衡 |
| 2 | 边界在哪 | 到「知识层级 / 公共事件 / 均衡预测」可形式化为止 |
| 3 | 核心对象 | 事件、知识算子 \(K_i\)、共有知识、共同知识、公共宣告 |
| 4 | 参与者 | 需要协调或对抗的人/组织/算法 |
| 5 | 关键变量 | 知识深度 \(k\)、消息丢失率 \(\varepsilon\)、公开性、共同先验、理性是否共同知识 |
| 6 | 可直接观察 | 公开广播、股价暴跌、监管公告、会议纪要 |
| 7 | 无法直接观察 | 他人是否真的理解、他人是否相信你知道、沉默的含义 |
| 8 | 谁影响谁 | 公开性 → 知识层级 → 可协调集合 → 均衡选择 |
| 9 | 因果关系 | 公开宣告创造 CK → 归纳时钟启动 → 同步行动 |
| 10 | 只是相关 | 「大家都听说过」≠ CK；相关但机制不同【分析】 |
| 11 | 表层现象 | 挤兑、攻城默契失败、会议「都懂了」却无人执行 |
| 12 | 底层机制 | 无限嵌套的「知道」+ 公共可达事件（Aumann meet） |
| 13 | 有反馈吗 | 有。行动本身成为公共信号，加深或摧毁 CK |
| 14 | 有延迟吗 | 有。归纳需要按夜/按轮推进；消息确认链有时滞 |
| 15 | 正/负反馈 | 恐慌自我实现是正反馈；透明公共信号常起负反馈（压低高阶不确定） |

## 最关键的一句话

> 共同知识不是信息量，而是**信息结构**：它回答「这件事是否已进入所有人关于彼此认知的公共骨架」。

# 为什么值得研究

:::cards g3
### 它把「都知道」拆穿
会议室里人人点头，往往只是 MK₁。真正敢下注的人，问的是：对方是否知道我知道……【分析】

### 它解释协调为何脆弱
Rubinstein（1989）电子邮件博弈：任意有限确认次数，唯一均衡仍可能是低效安全行动。【事实】

### 它连接金融与组织
2023 年 3 月美国银行挤兑研究指出：基本面弱很重要，但公开交易与公共信号对「是否发生挤兑」有额外协调作用。【待验证】
:::

:::note amber 最贵的一次误判
把「群发邮件」当成共同知识。群发只保证（近似）共有知识；若每人不确定别人是否打开、是否理解、是否相信别人也理解——高阶缺口仍在，协调仍可能塌。【分析】
:::

# 世界地图

九层看共同知识如何从「事件」长成「均衡语言」。

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="ckArw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
  </defs>
  <rect x="20" y="12" width="640" height="48" rx="8" fill="#15181d"/><text x="40" y="42" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L9 机制设计 · 用公共信号/制度直接制造 CK</text>
  <rect x="20" y="68" width="640" height="48" rx="8" fill="#1d4ed8"/><text x="40" y="98" font-size="14" font-weight="700" fill="#fff" font-family="sans-serif">L8 均衡辩护 · 纳什 / SPE 常隐含 CK 或近似 CK</text>
  <rect x="20" y="124" width="640" height="48" rx="8" fill="#3b6ef5"/><text x="40" y="154" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L7 共同理性 CKR · 强假设及其自洽批评</text>
  <rect x="20" y="180" width="640" height="48" rx="8" fill="#5b8def"/><text x="40" y="210" font-size="13" font-weight="700" fill="#fff" font-family="sans-serif">L6 Aumann 同意 · 共同先验 + 后验成 CK ⇒ 不能同意分歧</text>
  <rect x="20" y="236" width="640" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="40" y="266" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L5 悖论与间断 · 电子邮件 / 协调进攻：有限阶 ≠ CK</text>
  <rect x="20" y="292" width="640" height="48" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="40" y="322" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L4 公共宣告 · 把 MK 抬升为 CK 的开关</text>
  <rect x="20" y="348" width="640" height="48" rx="8" fill="#fef3c7" stroke="#b8730a"/><text x="40" y="378" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L3 共同知识 · 无限阶交叠 \(E \cap KE \cap KKE \cap \cdots\)</text>
  <rect x="20" y="404" width="640" height="48" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="40" y="434" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L2 共有知识 · 人人知道 \(E\)（仅一阶）</text>
  <rect x="20" y="460" width="640" height="48" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="40" y="490" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L1 事件与私有知识 · \(K_i E\)</text>
</svg>
:::

:::note blue 读图要点
入门卡在 **L2→L3**：多数人把「公开说过」当成共同知识，却漏掉「对方是否知道我听到了」这一阶。L5 告诉你：这一漏，在数学上可以毁掉全部协调。
:::

# 核心概念地图

从抽象定义到可操作判别。

:::raw
<svg viewBox="0 0 680 360" width="100%" style="max-width:680px">
  <defs>
    <marker id="cmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cmB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="220" y="16" width="240" height="44" rx="10" fill="#15181d"/><text x="340" y="44" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="sans-serif">事件 E</text>

  <rect x="40" y="100" width="160" height="52" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="120" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">KiE 私有知识</text>
  <rect x="260" y="100" width="160" height="52" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">MK：∩ KiE</text>
  <rect x="480" y="100" width="160" height="52" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="560" y="130" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">CK：∞ 阶</text>

  <line x1="300" y1="60" x2="120" y2="100" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="60" x2="340" y2="100" stroke="#b8730a" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="380" y1="60" x2="560" y2="100" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>

  <rect x="40" y="200" width="280" height="56" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="180" y="234" text-anchor="middle" fill="#15181d" font-size="12" font-weight="600" font-family="sans-serif">有限阶 MKk：「几乎 CK」</text>
  <rect x="360" y="200" width="280" height="56" rx="8" fill="#15181d"/><text x="500" y="234" text-anchor="middle" fill="#fff" font-size="12" font-weight="600" font-family="sans-serif">公共宣告 → 抬升为 CK</text>

  <line x1="560" y1="152" x2="500" y2="200" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#cmA)"/>
  <line x1="340" y1="152" x2="180" y2="200" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#cmB)"/>

  <text x="340" y="300" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">抽象：知识层级　·　机制：公共可达　·　操作：公开、同步、可验证确认</text>
  <text x="340" y="330" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">红色虚线：有限阶在关键协调博弈中可能与 CK 预测断裂</text>
</svg>
:::

# 核心参与者

:::cards g3
### 理论奠基者
David Lewis（1969）约定与共同知识；Robert Aumann（1976）划分与同意定理；Ariel Rubinstein（1989）电子邮件博弈。【事实】

### 应用解释者
银行挤兑 / 货币危机文献（Diamond–Dybvig、global games）；组织沟通与危机公关；计算机科学中的协调进攻问题。【分析】

### 你自己
每次会议、谈判、群聊协作，你都在制造或破坏 CK——多数时候不自觉。【推论】
:::

# 核心变量

| 变量 | 含义 | 为什么重要 |
|---|---|---|
| 知识深度 \(k\) | 「知道」嵌套层数 | \(k<\infty\) 时可能与 CK 行为不连续 |
| 消息丢失率 \(\varepsilon\) | 确认链断裂概率 | \(\varepsilon>0\) 时永远达不到真 CK |
| 公开性 | 是否同场可见 / 同步广播 | 公开宣告是抬升 MK→CK 的廉价开关 |
| 共同先验 | 是否共享先验概率 | Aumann 同意定理的前提之一 |
| 理性共同知识 | CKR 是否成立 | 许多均衡精炼隐含它；也是批评焦点 |
| 群体规模 \(N\) | 参与人数 | 蓝眼睛归纳：离开夜数 = \(N\) |

<!-- nav:机制与激励 -->
# 因果关系

因果主链：

:::raw
<div class="flow"><span>私有观察</span><i>→</i><span>共有知识</span><i>→</i><span class="hi">公共宣告</span><i>→</i><span class="hi">共同知识</span><i>→</i><span>可协调均衡</span></div>
:::

**实线因果**：公开宣告 → CK → 同步策略可行。【事实】

**红色虚线反馈**：行动结果被所有人看见 → 进一步强化（或粉碎）高阶信念——挤兑中「别人在取款」成为新的公共信号。【分析】

:::raw
<svg viewBox="0 0 680 220" width="100%" style="max-width:680px">
  <defs>
    <marker id="cfA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
    <marker id="cfB" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="40" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="100" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">公共信号</text>
  <rect x="220" y="40" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="280" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">高阶信念</text>
  <rect x="400" y="40" width="120" height="44" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="460" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">协调行动</text>
  <rect x="560" y="40" width="100" height="44" rx="8" fill="#fce8e8" stroke="#d5342c"/><text x="610" y="67" text-anchor="middle" font-size="12" font-weight="600" fill="#15181d" font-family="sans-serif">结果</text>
  <line x1="160" y1="62" x2="220" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <line x1="340" y1="62" x2="400" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <line x1="520" y1="62" x2="560" y2="62" stroke="#1d4ed8" stroke-width="1.8" marker-end="url(#cfA)"/>
  <path d="M610 84 L610 150 L100 150 L100 84" fill="none" stroke="#d5342c" stroke-width="1.8" stroke-dasharray="5,4" marker-end="url(#cfB)"/>
  <text x="340" y="175" text-anchor="middle" fill="#d5342c" font-size="12" font-family="sans-serif">反馈：结果被公开观察 → 改写下一轮高阶信念</text>
  <text x="340" y="200" text-anchor="middle" fill="#7c848f" font-size="11" font-family="sans-serif">实线=因果推进；红虚线=信念—行动反馈环</text>
</svg>
:::

# 隐藏关系

:::cards g2
### CK ≠ 信息很多
信息爆炸但各自私密，仍可能零共同知识。一条短广播胜过千封私信。【推论】

### 「几乎 CK」可以几乎无用
电子邮件博弈的间断性：概率趋近 1 的有限阶知识，行为仍可能钉在安全均衡。【事实】

### 沉默也是公共事件
蓝眼睛岛上「今晚无人离开」本身是公共信号，推进归纳。【事实】

### 股价是粗公共信号
公开交易把部分信念压成价格；2023 年挤兑研究强调公开上市银行更易被协调挤兑。【待验证】
:::

# 系统运行机制

1. **知识算子**：\(K_i E\) =「\(i\) 知道 \(E\)」。通常假设真相性、正内省等（具体公理因模型而异）。【事实】
2. **共有知识**：\(E\) 对所有 \(i\) 成立 \(K_i E\)。【事实】
3. **共同知识**：\(E\)、\(KE\)、\(KKE\)、……全部成立；等价于 Aumann 的「包含当前状态的 meet 事件」。【事实】
4. **公共宣告**：在所有人面前说 \(E\)（且人人看见人人听见）→ 典型地制造 CK。【分析】
5. **策略响应**：CK 改变可支持的均衡集合；缺 CK 时，风险主导的安全行动常胜出。【分析】

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <defs>
    <marker id="tmA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#e2e6ec" stroke-width="4"/>
  <circle cx="80" cy="100" r="10" fill="#0f8a4d"/><text x="80" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">t0 私有</text>
  <circle cx="200" cy="100" r="10" fill="#b8730a"/><text x="200" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">t1 共有</text>
  <circle cx="340" cy="100" r="10" fill="#1d4ed8"/><text x="340" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">t2 宣告</text>
  <circle cx="480" cy="100" r="10" fill="#7c3aed"/><text x="480" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">t3… 归纳</text>
  <circle cx="600" cy="100" r="10" fill="#d5342c"/><text x="600" y="70" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">tN 同步</text>
  <text x="340" y="150" text-anchor="middle" font-size="12" fill="#454c56" font-family="sans-serif">蓝眼睛：N 人 → 第 N 夜离开；缺宣告则时钟永不启动</text>
  <text x="340" y="175" text-anchor="middle" font-size="11" fill="#7c848f" font-family="sans-serif">电子邮件：确认链无限延长仍可能达不到行为意义上的 CK</text>
</svg>
:::

# 利益与激励

谁受益于制造或阻止共同知识？

| 角色 | 激励 |
|---|---|
| 协调者 / 领导 | 需要廉价 CK：公开站会、书面确认、同屏演示 |
| 投机挤兑者 | 希望「别人也会跑」成为近似 CK，自我实现 |
| 操纵者 | 散播模糊信号，阻止对手形成进攻 CK |
| 监管者 | 用强制披露、存款保险等改变公共信念结构 |
| 谈判方 | 有时故意保持私密，避免让让步成为 CK 后无法收回 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs>
    <marker id="flA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#1d4ed8"/></marker>
  </defs>
  <rect x="30" y="30" width="140" height="60" rx="8" fill="#15181d"/><text x="100" y="65" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">私有信号</text>
  <rect x="270" y="30" width="140" height="60" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="340" y="65" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">侧信道/群聊</text>
  <rect x="510" y="30" width="140" height="60" rx="8" fill="#1d4ed8"/><text x="580" y="65" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="sans-serif">公共广播</text>

  <rect x="150" y="150" width="160" height="60" rx="8" fill="#e8f8ef" stroke="#0f8a4d"/><text x="230" y="185" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">共有知识池</text>
  <rect x="370" y="150" width="160" height="60" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="450" y="185" text-anchor="middle" fill="#15181d" font-size="13" font-weight="600" font-family="sans-serif">共同知识核</text>

  <line x1="170" y1="60" x2="270" y2="60" stroke="#7c848f" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="410" y1="60" x2="510" y2="60" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="100" y1="90" x2="200" y2="150" stroke="#0f8a4d" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="340" y1="90" x2="230" y2="150" stroke="#b8730a" stroke-width="1.5" marker-end="url(#flA)"/>
  <line x1="580" y1="90" x2="480" y2="150" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <line x1="310" y1="180" x2="370" y2="180" stroke="#1d4ed8" stroke-width="2" marker-end="url(#flA)"/>
  <text x="340" y="245" text-anchor="middle" fill="#454c56" font-size="12" font-family="sans-serif">信息流「抽水」：只有进入公共广播层的内容，才稳定沉淀为共同知识核</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

按「重要性 × 杠杆率 × 可操作性 ÷ 学习成本」排序：

1. **公开同场宣告** — 成本最低的 CK 制造器
2. **可验证回执协议** — 降低 \(\varepsilon\)，但无法把有限阶变成无限阶
3. **共同书面事实清单** — 会议结束前把「我们共同认定的事实」读出来
4. **公共价格 / 仪表盘** — 把分散信念压缩成可见公共信号
5. **缩小群体 \(N\)** — 归纳与协调所需深度下降
6. **存款保险 / 最后贷款人** — 改变挤兑博弈支付，弱化对 CK 恐慌的依赖
7. **禁止私下双边确认替代公开** — 防「我以为你以为」漂移
8. **时间盒同步** — 同一时刻行动，减少高阶时滞
9. **明确「不知道」也公开** — 避免虚假 MK
10. **拆掉虚假 CK 叙事** — 质疑「大家都知道」直至指出缺口阶数

# 常见认知陷阱

:::details 陷阱 1 · 把共有知识当成共同知识
「群里都发了」≠ CK。缺的是：每人是否知道别人看见并理解。【分析】
:::

:::details 陷阱 2 · 以为多确认几轮就够了
电子邮件博弈：任意有限确认，唯一均衡仍可能是安全行动。【事实】
:::

:::details 陷阱 3 · 以为 CK 总能达到
不可靠信道 + 正丢失概率 → 严格 CK 不可达；只能谈近似。【事实】
:::

:::details 陷阱 4 · 忽略公开宣告的「内容看似无新」
蓝眼睛游客说「至少有一人蓝眼」——每人早已看见，但宣告改变了高阶结构。【事实】
:::

:::details 陷阱 5 · 把 Aumann 定理读成「现实中不能有分歧」
定理条件：共同先验 + 后验本身成 CK + 贝叶斯理性等。现实常缺共同先验或后验未成 CK。【分析】
:::

:::details 陷阱 6 · 假设共同知识的理性（CKR）总无害
批评文献指出：在某些设定下 CKR 可导致悖论或自相矛盾，不能当免费加强。【分析】
:::

:::details 陷阱 7 · 用私人聊天「对齐」替代公共对齐
双边对齐制造局部 MK，全局 CK 仍缺，大规模协调失败。【推论】
:::

:::details 陷阱 8 · 把股价下跌直接等同于基本面崩盘
公开价格也是协调装置；基本面相似却有的跑有的不跑，说明公共信号路径重要。【待验证】
:::

:::details 陷阱 9 · 认为「聪明人多」就自动有 CK
蓝眼睛假设人人逻辑完美；真实世界还缺共同知识「人人会做归纳」。【分析】
:::

:::details 陷阱 10 · 把无限递归当成无意义哲学
在关键支付结构下，无限阶不是修辞，是均衡选择的数学开关。【事实】
:::

<!-- nav:实践系统 -->
# 从抽象到现实

| 抽象 | 现实对照 |
|---|---|
| 公共宣告 | 全员大会口头宣布、监管新闻稿、同屏演示 |
| 有限阶确认 | 邮件回执、已读回执、Slack ✅ |
| 归纳时钟 | 连续多日无人行动后的「临界日」 |
| 安全行动 A | 不进攻、不取款、不切换新系统 |
| 风险行动 B | 协同进攻、挤兑、集体迁移 |

# 从理论到行动

:::cards g3
### 会前
列出必须成为 CK 的 3 条事实；设计「同场宣读」环节。【推论】

### 会中
禁止只在私聊确认关键决策；关键结论当场复述并记录。【推论】

### 会后
公开纪要 > 一对一补充。一对一只用于敏感例外，并标注「未成 CK」。【推论】
:::

# 技能树

:::details ① 基础：区分 MK / CK
能用一句话指出某个场景缺的是第几阶。【实践】
:::

:::details ② 中级：设计公共宣告
会把「看似人人已知」的信息改成公开事件。【实践】
:::

:::details ③ 高级：识别间断性
在协调博弈中，能解释为何「几乎确定对方知道」仍不够。【分析】
:::

:::details ④ 专家：机制选择
在挤兑/危机/产品发布间，选择公共信号、保险或缩小 N。【分析】
:::

# 游戏化世界

你进入一座「信念之城」：每栋楼的居民只通过窗户看见邻居，却看不见自己屋顶的颜色。城里偶尔来一位游客当众喊一句话——那句话几乎不提供新一阶信息，却能启动整座城的倒计时。你的任务不是收集情报，而是**制造或拆除共同知识开关**。

# 任务系统

| 任务 | 验收 |
|---|---|
| 找一次失败会议 | 标出至少一处「只有 MK 没有 CK」 |
| 改写一条通知 | 从群发私信改为公开频道 + 复述确认 |
| 推演蓝眼睛 N=3 | 口头讲清第 1/2/3 夜逻辑 |
| 画确认链 | 标出 \(\varepsilon\) 可能断在哪一环 |

# 反事实模拟

若没有公共宣告，蓝眼睛岛上永远没人离开——不是因为缺一阶信息，而是缺 CK。【事实】

若消息 \(\varepsilon=0\)（完美信道），电子邮件博弈的悖论消失，CK 可达。【分析】

若共同先验不成立，Aumann「不能同意分歧」不必成立——持久分歧可以理性存在。【事实】

## 可调模型 1 · 蓝眼睛归纳时钟

游客公开宣告「至少有一名蓝眼」后，若有 \(N\) 名蓝眼（且逻辑完美、规则共同知识），他们将在第 \(N\) 夜同时离开。无宣告则时钟不启动。

默认 \(N=5\) → 第 **5** 夜离开。

:::raw
<div class="tool" id="tool_eye">
  <div class="ctrl">
    <label>蓝眼人数 N <output id="eye_nO">5</output></label>
    <input type="range" id="eye_n" min="1" max="30" step="1" value="5"/>
    <label>是否公开宣告 <output id="eye_annO">是</output></label>
    <input type="range" id="eye_ann" min="0" max="1" step="1" value="1"/>
  </div>
  <div class="readout">
    <div class="ro">离开夜数<strong id="eye_night">5</strong></div>
    <div class="ro">时钟状态<strong id="eye_clock">已启动</strong></div>
    <div class="ro">所需知识深度<strong id="eye_depth">5</strong></div>
    <div id="eye_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="eye_vh">公开宣告已制造 CK「至少 1 名蓝眼」→ 归纳要求深度 5 → 第 5 夜同步离开</span></div>
  </div>
  <canvas id="eyeChart" height="214"></canvas>
</div>
:::

## 可调模型 2 · 有限阶 vs 几乎共同知识

不可靠确认：每多成功传递 1 层，知识深度 +1，存活概率 \((1-\varepsilon)^M\)。看「几乎」有多接近 1，以及它是否等于行为上的 CK（提示：在电子邮件类博弈中，不等于）。

默认 \(\varepsilon=0.05\)，\(M=20\) → 深度达 20 的概率约 **0.3585**。

:::raw
<div class="tool" id="tool_mk">
  <div class="ctrl">
    <label>丢失率 ε <output id="mk_epsO">0.05</output></label>
    <input type="range" id="mk_eps" min="0.001" max="0.20" step="0.001" value="0.05"/>
    <label>确认层数 M <output id="mk_mO">20</output></label>
    <input type="range" id="mk_m" min="1" max="80" step="1" value="20"/>
  </div>
  <div class="readout">
    <div class="ro">P(深度≥M)<strong id="mk_p">0.3585</strong></div>
    <div class="ro">是否真 CK<strong id="mk_ck">否</strong></div>
    <div class="ro">「几乎」程度<strong id="mk_almost">35.8%</strong></div>
    <div id="mk_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="mk_vh">ε=0.05、M=20 → P≈0.3585；有限阶永远不是 CK——协调博弈中可能仍钉在安全均衡</span></div>
  </div>
  <canvas id="mkChart" height="214"></canvas>
</div>
:::

## 可调模型 3 · 电子邮件式协调门槛

双方选安全 A（支付 0）或冒险 B。若对方也选 B 得 +1；若自己单独选 B 得 \(-L\)。对方选 B 的信念为 \(q\) 时，选 B 当且仅当 \(q > L/(1+L)\)。

默认 \(L=4\)，\(q=0.70\) → 门槛 \(q^*=0.80\)，应选 **A**（够「几乎」仍不够）。

:::raw
<div class="tool" id="tool_mail">
  <div class="ctrl">
    <label>单独冒险惩罚 L <output id="mail_LO">4.0</output></label>
    <input type="range" id="mail_L" min="1" max="10" step="0.1" value="4.0"/>
    <label>信念 q=对方也选 B <output id="mail_qO">0.70</output></label>
    <input type="range" id="mail_q" min="0.05" max="0.99" step="0.01" value="0.70"/>
  </div>
  <div class="readout">
    <div class="ro">门槛 q*<strong id="mail_th">0.80</strong></div>
    <div class="ro">EU(B)<strong id="mail_eu">-0.50</strong></div>
    <div class="ro">最优<strong id="mail_dec">A 安全</strong></div>
    <div id="mail_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="mail_vh">q=0.70 &lt; q*=0.80 → 选 A；EU(B)=q−L(1−q)=−0.50 &lt; 0</span></div>
  </div>
  <canvas id="mailChart" height="214"></canvas>
</div>
:::

## 可调模型 4 · Aumann 同意：后验能否「同意分歧」

两人共同先验。若两人的后验 \(p_1,p_2\) **成为共同知识**，则在定理条件下必须 \(p_1=p_2\)。若后验只是各自私有或仅共有但非 CK，则可以持续分歧。

滑动「CK 程度」：1=后验已成 CK；0=仅私有。看分歧是否被定理禁止。

:::raw
<div class="tool" id="tool_aum">
  <div class="ctrl">
    <label>后验 p₁ <output id="aum_p1O">0.70</output></label>
    <input type="range" id="aum_p1" min="0.05" max="0.95" step="0.01" value="0.70"/>
    <label>后验 p₂ <output id="aum_p2O">0.40</output></label>
    <input type="range" id="aum_p2" min="0.05" max="0.95" step="0.01" value="0.40"/>
    <label>后验成 CK 程度 <output id="aum_ckO">0.00</output></label>
    <input type="range" id="aum_ck" min="0" max="1" step="0.01" value="0.00"/>
    <label>共同先验？ <output id="aum_priorO">是</output></label>
    <input type="range" id="aum_prior" min="0" max="1" step="1" value="1"/>
  </div>
  <div class="readout">
    <div class="ro">|p₁−p₂|<strong id="aum_gap">0.30</strong></div>
    <div class="ro">定理状态<strong id="aum_st">可分歧</strong></div>
    <div class="ro">含义<strong id="aum_mean">条件未齐</strong></div>
    <div id="aum_v" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span id="aum_vh">共同先验成立，但后验未成 CK → 同意分歧不被禁止；把 CK 滑到 1 且存在差距时，定理要求后验必须相等（模型显示「违规」）</span></div>
  </div>
  <canvas id="aumChart" height="214"></canvas>
</div>
:::

:::tabs
@@无公开宣告
蓝眼睛：每人看见 N−1 个蓝眼，但缺 CK「至少 1 个」，归纳无法锚定，无人离开。

@@不可靠邮箱
确认再多，行为预测仍可能钉在 (A,A)。组织里「已读」堆成山，切换新系统仍没人先动。

@@后验成 CK
若两人真把后验变成共同知识且共享先验，持续概率分歧与定理冲突——应回头检查先验或信息是否已实质交换。
:::

# 四级能力路线

| 级别 | 能力 |
|---|---|
| L1 | 口头区分 MK 与 CK |
| L2 | 设计一次公共宣告并验证效果 |
| L3 | 用电子邮件博弈解释协调失败 |
| L4 | 在制度层选择公共信号 / 保险 / 缩 N |

# 30分钟最小实践

1. 选一件你以为「大家都知道」的事（工作或家庭）。
2. 写出：谁知道？谁知道「谁知道」？卡在第几阶？
3. 用 **2 分钟公开复述**（同场或公开频道）把它抬成近似 CK。
4. 记录：之后行动对齐是否变化。

成本≈0，产出=一张「知识阶梯」便签。

# 7天计划

| 日 | 动作 |
|---|---|
| D1 | 记录 3 条「伪共同知识」 |
| D2 | 蓝眼睛 N=2,3 口述证明 |
| D3 | 把一次关键通知改为公开宣告 |
| D4 | 画一条确认链并标 \(\varepsilon\) |
| D5 | 用模型 3 算自己的 \(q^*\) |
| D6 | 读 Aumann 同意定理条件清单 |
| D7 | 复盘：哪次对齐因 CK 改善 |

# 30天计划

周1：概念与案例；周2：会议/群聊改造；周3：协调失败复盘（项目切换、发布窗口）；周4：写一页「本团队 CK 协议」（何种决定必须公开同场确认）。

<!-- nav:模型与清单 -->
# 10 个核心模型

1. **Lewis 约定**：约定需要共同知识支撑期望一致。【事实】
2. **Aumann 划分 / meet**：CK = 包含现实状态的公共可达事件。【事实】
3. **同意定理**：共同先验 + 后验 CK ⇒ 后验相等。【事实】
4. **蓝眼睛归纳**：公共宣告启动深度为 N 的时钟。【事实】
5. **电子邮件博弈**：有限阶 ≉ CK（行为间断）。【事实】
6. **协调进攻**：将军问题——不可靠信道无法达成进攻 CK。【事实】
7. **CKR**：共同知识的理性——强工具，亦受批评。【分析】
8. **Global games**：噪声私有信号可唯一化均衡，弱化对纯 CK 的依赖。【分析】
9. **公共价格信号**：市场把信念压成可观察公共量。【分析】
10. **机制制造 CK**：披露、保险、同步仪式。【推论】

# 关键问题清单

:::details Q1 这件事是 MK 还是 CK？
数嵌套层：能否指出某一阶仍不确定？
:::

:::details Q2 缺的那一阶会不会改变最优行动？
若不会，不必强迫 CK；若会，必须公开。
:::

:::details Q3 信道 \(\varepsilon\) 是多少？
已读回执不等于理解回执。
:::

:::details Q4 是否存在更便宜的公共信号？
仪表盘、价格、公告，往往优于私聊网。
:::

:::details Q5 群体是否太大？
N 上升，归纳与协调所需深度上升。
:::

:::details Q6 我们是否误用了 Aumann？
检查共同先验与「后验是否成 CK」。
:::

:::details Q7 安全行动的支付差 \(L\) 有多大？
\(L\) 越大，\(q^*\) 越高，越难协调。
:::

:::details Q8 沉默是否已被解读为公共信号？
「没人反对」有时被当成 CK——危险。
:::

:::details Q9 是否该用制度替代信念层级？
保险、强制同步、默认选项。
:::

:::details Q10 下一步最小公开动作是什么？
30 分钟实践里的那一次复述。
:::

# 下一阶段探索

- 共同信念（common belief）对概率版放松
- Global games 与挤兑唯一均衡
- 算法代理之间的协议知识（分布式计算）
- 与「信息集」「不完全信息」手册交叉：CK 是类型/规则层，信息集是历史上的不可区分层

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 共同知识定义与同意定理 | 经典论文 | Aumann, *Agreeing to Disagree*, Ann. Statist. 1976 | 【事实】 |
| 电子邮件博弈 | 经典论文 | Rubinstein, *The Electronic Mail Game*, AER 1989 | 【事实】 |
| 共同知识哲学综述 | 百科/综述 | Stanford Encyclopedia of Philosophy, *Common Knowledge* | 【分析】 |
| 「几乎 CK」非理想化近似 | 哲学论文 | *Who’s afraid of common knowledge?*, Philosophical Studies 2024 | 【分析】 |
| CKR 批评 | 工作论文/批评 | Gintis 等关于 CKR 自洽性的讨论 | 【分析】 |
| 2023 年银行挤兑与协调 | 实证研究 | Cipriani 等 *Tracing Bank Runs in Real Time*（NY Fed / Richmond Fed WP，识别约 22 家挤兑行） | 【待验证】 |
| 实验银行协调与规模 | 实验 | *Coordination failure in experimental banks of different sizes*, JBEF 2024 | 【待验证】 |
| 蓝眼睛 / 归纳谜题 | 经典谜题传统 | 陶哲轩等传播的蓝眼棕眼问题（教学用） | 【事实】 |

标记约定：【事实】多方一致或原始定义；【分析】权威推断；【推论】本手册推导；【假设】未验证；【待验证】单一来源或转载链长。

# 免责声明 {.appendix}

本手册是认知与决策框架，不是投资建议、法律意见或危机处置预案。涉及金融市场与银行挤兑的数字来自公开研究摘要，标为【待验证】者请自行核对原文。模型中的滑块为教学简化（尤其电子邮件博弈被压成静态阈值），不能替代正式博弈论推导。你需对据此采取的行动自行负责。
