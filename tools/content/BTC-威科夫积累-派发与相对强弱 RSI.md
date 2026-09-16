---
slug: BTC-威科夫积累-派发与相对强弱 RSI
title: BTC-威科夫积累/派发与相对强弱 RSI
subtitle: 把比特币的<strong>区间结构、量价事件与 RSI 动量</strong>焊成一套可证伪的读盘系统——<strong>威科夫告诉你「主力在干什么」，RSI 告诉你「这件事有没有力气」</strong>
brand_sub: Bitcoin × Wyckoff × RSI
kicker: Panoramic Cognition & Practice Engine
chips: 27 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, 威科夫, RSI, 相对强弱, 加密市场, 技术分析]
theme_js_file: BTC-威科夫积累-派发与相对强弱 RSI.js
md_raw: hint
md_raw_hint: （此处含交互图表与可调模型，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

# 一句话理解

**在比特币上读威科夫，不是找「庄家」，而是在一个 24 小时、全球联动的市场里，用区间 + 量价事件推断大资金是在收货还是在出货；RSI 与相对强弱，则是这套推断的「力气计」——告诉你动量有没有跟上价格叙事。**

三根支柱：

| 支柱 | 在 BTC 上意味着什么 | 观测入口 |
|---|---|---|
| 威科夫结构 | 吸筹/派发/再吸筹的区间与事件序列 | 周线区间、Spring/UTAD、SOS/SOW |
| RSI 动量 | 涨跌的「速度」是否衰竭或加速 | RSI(14)、背离、50 中轴 |
| 相对强弱 | BTC 相对加密大盘是否还在「带队」 | BTC.D、ETH/BTC、个股/指数比 |

**最锋利的组合**：区间底部 + Spring + 看涨 RSI 背离 + 相对强度回升 → 高置信吸筹剧本；区间顶部 + UTAD + 看跌背离 + BTC 涨而山寨不涨 → 高置信派发剧本。

**最危险的误用**：单独拿 RSI&lt;30 或 RSI&gt;70 当买卖信号——【分析】2023 年 PMC 发表的加密货币 RSI 回测显示，传统超买超卖在加密市场风险极高，趋势行情里 RSI 可长期钝化。

---

<!-- nav:入口 -->

# 这个领域到底是什么

## 一句话边界

本手册研究的**不是**「比特币明天涨到多少」，而是：**在给定价格区间里，供给与需求的相对强弱如何演化，以及 RSI/相对强弱能否为威科夫事件提供独立确认。**

## 用 15 个问题划定边界

| 问题 | 答案 |
|---|---|
| 研究什么 | BTC 周线/日线级别的交易区间、威科夫事件、RSI 与相对强弱的三重交叉验证 |
| 边界在哪 | 不管链上基本面叙事、不管监管政策细节；只读**可观测的价格量行为** |
| 核心对象 | 「复合人」在 BTC 上的建仓/出货痕迹；ETF 与 OTC 是当代复合人的新面孔 |
| 参与者 | 现货 ETF 发行方、矿工、长期持有者、杠杆散户、做市商、稳定币发行方 |
| 核心变量 | 区间边界、量比、RSI(14)、BTC.D、ETH/BTC、永续资金费率 |
| 可观察 | K 线、成交量、RSI、Dominance、链上交易所净流入（辅助） |
| 不可观察但可推断 | 大户成本区、剩余可卖库存、是否处于 Phase C |
| 谁影响谁 | 宏观流动性 → BTC 趋势 → 山寨滞后跟涨/跟跌 → RSI 与情绪反馈 |
| 确定因果 | 供应枯竭（缩量回踩）+ 动量回升（RSI 背离）→ 少量买盘即可推价 |
| 只是相关 | 「RSI 超卖」与「马上反弹」——相关，但趋势里可连续超卖数周 |
| 表层现象 | Spring、UTAD、SOS、LPSY 等标签 |
| 底层机制 | 筹码从「对价格敏感的手」转移到「对价格不敏感的手」 |
| 反馈 | 突破 → 吸引杠杆 → 加速；假突破 → 爆仓 → 反向加速 |
| 时间延迟 | BTC 周线吸筹可持续 3–18 个月；日线 Spring 到 SOS 可仅 2–8 周 |
| 正负反馈 | ETF 净流入正反馈；清算级联负反馈 |

## BTC 与股市的三个结构性差异

| 维度 | 股市（威科夫原境） | BTC |
|---|---|---|
| 交易时间 | 有收盘 | **24/7**，周末也有 Spring |
| 杠杆工具 | 保证金有限 | 永续合约、高杠杆、资金费率 |
| 信息层 | 财报、监管 | 链上数据、ETF 流量、矿工抛压 |

【推论】**Spring 在 BTC 上往往更「尖锐」**——杠杆清算可在数小时内完成，回收速度比传统股票快一个数量级；但**区间边界也更常被「插针」测试**，需要放宽「收回」的时间窗口到日线收盘而非 intraday。

---

# 为什么值得研究

## 四个理由

:::cards g2
### BTC 是威科夫思想的「压力测试场」
24 小时交易 + 高波动 + 全球散户，让「复合人」痕迹既更明显（清算瀑布），也更容易被误读（每一根针都可事后叫 Spring）。

### RSI 给威科夫补上「力气」这一维
同样一个 Spring，若 RSI 在低位形成**看涨背离**（价格新低、RSI 抬高），回收可信度显著高于 RSI 同步创新低的情形。【待验证】BeInCrypto 对 2021 年 BTC 吸筹段的案例回顾支持这一组合，但缺乏系统回测。

### 相对强弱是 BTC 周期的「罗盘」
BTC.D 从 63% 回落到 50% 区间时，往往对应资金从 BTC 向山寨轮动。【待验证】crypto.news 2026 年中期数据：BTC.D 处于 50% 中段、山寨季指数 &lt;40，说明「BTC 带队、山寨滞后」仍是主流结构。

### 失败模式可被清晰枚举
把「标签通胀」「RSI 钝化」「宏观一票否决」写进检查清单，比泛泛的「技术分析」更可迭代。
:::

:::note amber 一句话定性
这不是预测 BTC 价格的系统，而是一套**在区间里写剧本、用 RSI 和相对强弱做确认、用证伪条件管风险**的读盘框架。
:::

---

<!-- nav:世界模型 -->

# 世界地图

:::raw
<svg viewBox="0 0 680 620" width="100%" style="max-width:680px">
  <text x="12" y="18" font-size="12.5" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 威科夫 × RSI 九层世界（自上而下）</text>
  <rect x="12" y="32" width="656" height="52" rx="9" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="26" y="52" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">L1 · 全球宏观流动性</text>
  <text x="26" y="70" font-size="10.5" fill="#454c56" font-family="sans-serif">美联储利率 · 美元流动性 · 风险资产偏好 — 决定 BTC Beta，威科夫无法对抗</text>
  <rect x="12" y="92" width="656" height="52" rx="9" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="26" y="112" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">L2 · 加密大盘结构</text>
  <text x="26" y="130" font-size="10.5" fill="#454c56" font-family="sans-serif">总市值趋势 · BTC.D · 稳定币供给 — 决定「只做 BTC」还是「做山寨相对强度」</text>
  <rect x="12" y="152" width="656" height="52" rx="9" fill="#f7f6f2" stroke="#ded8c4" stroke-width="1.3"/>
  <text x="26" y="172" font-size="12" font-weight="700" fill="#8a6d1f" font-family="sans-serif">L3 · 资金流与 ETF 层</text>
  <text x="26" y="190" font-size="10.5" fill="#454c56" font-family="sans-serif">现货 ETF 净流入/流出 · 矿工抛压 · 交易所余额 — 当代「复合人」的订单流</text>
  <rect x="12" y="212" width="656" height="52" rx="9" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.3"/>
  <text x="26" y="232" font-size="12" font-weight="700" fill="#d5342c" font-family="sans-serif">L4 · BTC 周线结构层</text>
  <text x="26" y="250" font-size="10.5" fill="#454c56" font-family="sans-serif">吸筹 / 派发 / 再吸筹的大区间 — 决定本周期做多还是防守</text>
  <rect x="12" y="272" width="656" height="52" rx="9" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.3"/>
  <text x="26" y="292" font-size="12" font-weight="700" fill="#d5342c" font-family="sans-serif">L5 · 日线交易区间层</text>
  <text x="26" y="310" font-size="10.5" fill="#454c56" font-family="sans-serif">当前矩形上下沿 — 所有 Spring/UTAD 都附着在此</text>
  <rect x="12" y="332" width="656" height="52" rx="9" fill="#f6f2fb" stroke="#dccdf0" stroke-width="1.3"/>
  <text x="26" y="352" font-size="12" font-weight="700" fill="#6b3fa0" font-family="sans-serif">L6 · 威科夫事件序列层</text>
  <text x="26" y="370" font-size="10.5" fill="#454c56" font-family="sans-serif">SC→AR→ST→Spring/UTAD→SOS/SOW→LPS/LPSY — 顺序即信息</text>
  <rect x="12" y="392" width="656" height="52" rx="9" fill="#f2f8fb" stroke="#c4dde9" stroke-width="1.3"/>
  <text x="26" y="412" font-size="12" font-weight="700" fill="#1a6d8a" font-family="sans-serif">L7 · RSI 与背离层</text>
  <text x="26" y="430" font-size="10.5" fill="#454c56" font-family="sans-serif">RSI(14) 水平、斜率、与价格的背离 — 动量是否支持结构叙事</text>
  <rect x="12" y="452" width="656" height="52" rx="9" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="26" y="472" font-size="12" font-weight="700" fill="#454c56" font-family="sans-serif">L8 · 执行与杠杆层</text>
  <text x="26" y="490" font-size="10.5" fill="#454c56" font-family="sans-serif">永续仓位、资金费率、清算簇 — 你的下单会改变被观测对象</text>
  <rect x="12" y="512" width="656" height="60" rx="9" fill="#fff8ec" stroke="#f0dcb4" stroke-width="1.4"/>
  <text x="26" y="532" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">L9 · 你的持仓与叙事层</text>
  <text x="26" y="550" font-size="10.5" fill="#454c56" font-family="sans-serif">持有多头时更容易把震荡读成吸筹；空仓时更容易把再吸筹读成派发</text>
  <text x="26" y="566" font-size="10.5" fill="#a06800" font-family="sans-serif">→ 先写证伪条件，再允许自己「看见」形态</text>
  <text x="12" y="614" font-size="10.5" fill="#7c848f" font-family="sans-serif">L1–L3 约束 L4–L6；L7 独立验证 L6；L9 污染以上所有层的读数</text>
</svg>
:::

---

# 核心概念地图

## 威科夫四阶段（BTC 语境）

| 阶段 | 复合人在做什么 | BTC 上常见痕迹 | RSI 典型读数 |
|---|---|---|---|
| 吸筹 Accumulation | 低位分批买入 | 宽幅震荡、下跌缩量、Spring | 30–45 区钝化后抬升 |
| 拉升 Markup | 趋势跟随 | 突破区间、回踩 LPS | RSI 50 上方、未长期 &gt;70 |
| 派发 Distribution | 高位分批卖出 | 上冲回落、UTAD、SOW | 70 上方钝化或顶背离 |
| 下跌 Markdown | 趋势做空 | 跌破区间、反弹无力 | RSI &lt;50 且背离失效 |

## 三种区间类型（最易混淆）

| 类型 | 前置趋势 | 突破后通常 | 误判代价 |
|---|---|---|---|
| 吸筹 | 长期下跌后 | 新一轮 Markup | 过早做空 |
| 再吸筹 Re-accumulation | 上涨中途横盘 | 趋势延续 | 过早止盈 |
| 派发 | 长期上涨后 | Markdown | 过早抄底 |

【分析】2024 年 BTC 在 $53,000–$74,000 的横盘，市场同时存在「派发」与「再吸筹」两种解读；**直到区间向上突破或向下跌破，统计上仍无法区分**——这是威科夫在 BTC 上最诚实的局限。

## RSI 在体系中的位置

| 用法 | 正确 | 错误 |
|---|---|---|
| 确认 Spring | 价格新低 + RSI 抬高（看涨背离） | RSI&lt;30 就买入 |
| 确认 UTAD | 价格新高 + RSI 走低（看跌背离） | RSI&gt;70 就做空 |
| 趋势过滤 | 周线 RSI &gt;50 才做多吸筹突破 | 忽略趋势单向钝化 |
| 相对强弱 | BTC RSI 强于 ETH 同期 | 只看 BTC 绝对 RSI |

**RSI 公式**（标准 14 期）：先算平均涨幅 $\overline{g}$ 与平均跌幅 $\overline{l}$，$RS=\overline{g}/\overline{l}$，$RSI=100-100/(1+RS)$。【事实】定义来自 Wilder，Investopedia 等教科书一致。

---

# 核心参与者

| 参与者 | 目标函数 | 在威科夫叙事中的角色 | 可观测代理 |
|---|---|---|---|
| 现货 ETF 授权参与者 | 套利申赎、管理规模 | 大规模「被动复合人」 | 每日净流入、溢价/折价 |
| 矿工 | 覆盖运营成本 | 结构性卖压（尤其在减半前后） | 矿工钱包流出、算力 |
| 长期持有者 (LTH) | 跨周期配置 | 吸筹阶段的供给吸收者 | 链上 LTH 供应变化 |
| 杠杆散户 | 短期收益 | Spring/UTAD 的流动性提供者 | 清算量、持仓量 OI |
| 做市商 | 赚价差、控库存 | 努力与结果律里的「吸收」 | 订单簿深度、点差 |
| 稳定币发行方 | 维持锚定与规模 | 间接流动性阀门 | USDT/USDC 市值 |

【推论】2024 年 1 月现货 BTC ETF 通过后，**「复合人」不再只是 OTC 大户**——ETF 申赎机制使传统金融的日内流量成为 BTC 量价的一部分，威科夫读盘必须多看一层 ETF 流量，而不能只盯交易所 K 线。

---

# 核心变量

| 变量 | 定义 | 威科夫用途 | RSI/RS 用途 |
|---|---|---|---|
| 区间上沿 $R$ | 至少两次被拒绝的高点 | 派发测试、SOS 突破位 | 突破时 RSI 是否同步新高 |
| 区间下沿 $S$ | 至少两次获支撑的低点 | Spring 测试位 | Spring 时 RSI 是否背离 |
| 量比 $v$ | 当日量 ÷ 20 日均量 | 努力与结果 | 不直接进 RSI，但验证背离 |
| RSI(14) | 14 期相对强弱 | 动量确认 | 核心输出 |
| BTC.D | BTC 市值 ÷ 加密总市值 | 资金是否还在 BTC | 与 RSI 交叉：BTC 涨但 RSI 与 BTC.D 同弱 → 虚假强度 |
| ETH/BTC | 以太相对比特币 | 山寨轮动领先指标 | ETH/BTC RSI 常领先 BTC.D 2–4 周【待验证】 |
| 资金费率 | 永续多空平衡 | 极端正费率 → 多头拥挤 | 与 RSI&gt;70 共振时警惕 UTAD |

---

# 因果关系

## 吸筹链条（因果方向）

```
宏观流动性宽松 → ETF/OTC 净流入 → 区间下沿缩量止跌
→ Spring 洗杠杆 → RSI 看涨背离 → SOS 放量突破
→ LPS 缩量回踩 → Markup 延续
```

## 派发链条

```
流动性收紧或利好出尽 → 区间上沿放量滞涨 → UTAD 假突破
→ RSI 看跌背离 → SOW 跌破区间 → LPSY 无力反弹 → Markdown
```

## 因果图（实线 = 因果，虚线 = 反馈）

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="bwkA" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#454c56"/>
    </marker>
    <marker id="bwkAr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#d5342c"/>
    </marker>
  </defs>
  <text x="12" y="18" font-size="12" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 吸筹因果与反馈（简化）</text>
  <rect x="20" y="40" width="100" height="36" rx="6" fill="#f0f4fd" stroke="#c3d1f0"/>
  <text x="70" y="63" text-anchor="middle" font-size="11" fill="#1d4ed8" font-family="sans-serif">流动性</text>
  <rect x="160" y="40" width="100" height="36" rx="6" fill="#f2f7f4" stroke="#c6dcc9"/>
  <text x="210" y="63" text-anchor="middle" font-size="11" fill="#0f8a4d" font-family="sans-serif">净流入</text>
  <rect x="300" y="40" width="100" height="36" rx="6" fill="#fdf3f2" stroke="#f0cdc9"/>
  <text x="350" y="63" text-anchor="middle" font-size="11" fill="#d5342c" font-family="sans-serif">缩量止跌</text>
  <rect x="440" y="40" width="100" height="36" rx="6" fill="#f6f2fb" stroke="#dccdf0"/>
  <text x="490" y="63" text-anchor="middle" font-size="11" fill="#6b3fa0" font-family="sans-serif">Spring</text>
  <rect x="560" y="40" width="100" height="36" rx="6" fill="#f2f8fb" stroke="#c4dde9"/>
  <text x="610" y="63" text-anchor="middle" font-size="11" fill="#1a6d8a" font-family="sans-serif">RSI 背离</text>
  <line x1="120" y1="58" x2="158" y2="58" stroke="#454c56" stroke-width="1.5" marker-end="url(#bwkA)"/>
  <line x1="260" y1="58" x2="298" y2="58" stroke="#454c56" stroke-width="1.5" marker-end="url(#bwkA)"/>
  <line x1="400" y1="58" x2="438" y2="58" stroke="#454c56" stroke-width="1.5" marker-end="url(#bwkA)"/>
  <line x1="540" y1="58" x2="558" y2="58" stroke="#454c56" stroke-width="1.5" marker-end="url(#bwkA)"/>
  <rect x="200" y="120" width="120" height="36" rx="6" fill="#fff8ec" stroke="#f0dcb4"/>
  <text x="260" y="143" text-anchor="middle" font-size="11" fill="#a06800" font-family="sans-serif">SOS 突破</text>
  <rect x="360" y="120" width="120" height="36" rx="6" fill="#f0f4fd" stroke="#c3d1f0"/>
  <text x="420" y="143" text-anchor="middle" font-size="11" fill="#1d4ed8" font-family="sans-serif">Markup</text>
  <line x1="610" y1="76" x2="610" y2="200" x2="610" y2="200" stroke="#454c56" stroke-width="1.5"/>
  <line x1="610" y1="200" x2="260" y2="200" stroke="#454c56" stroke-width="1.5"/>
  <line x1="260" y1="200" x2="260" y2="156" stroke="#454c56" stroke-width="1.5" marker-end="url(#bwkA)"/>
  <line x1="320" y1="138" x2="358" y2="138" stroke="#454c56" stroke-width="1.5" marker-end="url(#bwkA)"/>
  <path d="M 420 156 Q 420 220 350 250" fill="none" stroke="#d5342c" stroke-width="1.4" stroke-dasharray="5,4" marker-end="url(#bwkAr)"/>
  <text x="380" y="248" font-size="10" fill="#d5342c" font-family="sans-serif">正反馈：突破吸引杠杆</text>
  <path d="M 490 76 Q 520 100 540 200" fill="none" stroke="#d5342c" stroke-width="1.4" stroke-dasharray="5,4" marker-end="url(#bwkAr)"/>
  <text x="530" y="190" font-size="10" fill="#d5342c" font-family="sans-serif">负反馈：假突破爆仓</text>
  <rect x="20" y="260" width="640" height="44" rx="6" fill="#f4f6f9" stroke="#c9d0d9"/>
  <text x="340" y="286" text-anchor="middle" font-size="10.5" fill="#454c56" font-family="sans-serif">仅相关非因果：RSI&lt;30 与「马上反弹」— 在 Markdown 可连续数周成立</text>
</svg>
:::

---

# 隐藏关系

## 同构 1：Spring ↔ 流动性掠夺 ↔ RSI 背离

| 领域 | 表面事件 | 底层结构 |
|---|---|---|
| 威科夫 | Spring 跌破支撑收回 | 触发止损簇、吸收浮筹 |
| 微观结构 | 流动性空洞 + 快速回补 | 大单吃单后价格反弹 |
| RSI | 价格新低、动量抬高 | 下跌「速度」放缓，≠ 已反转 |

## 同构 2：凯利仓位 ↔ 威科夫赔率 ↔ RSI 过滤

只在 **盈亏比 &gt; 2** 且 **RSI 确认** 时下注，等价于在边缘为正时放大仓位——与凯利准则「只在期望为正时参与」同构。

## 同构 3：BTC.D ↔ 生态位相对强度

威科夫强调个股的**相对强度**；在加密市场，**BTC.D 就是 BTC 的相对强度指数**。吸筹阶段 BTC 常先涨（BTC.D 升），山寨季则 BTC.D 降而总市值升。

## 隐藏关系：ETF 流量与「努力与结果」

【待验证】ETF 大幅净流入日，若 BTC 涨幅很小（大努力小结果），可能是授权参与者在**对冲申购**而非趋势买盘——这与威科夫「吸收」读法一致，但与「利好必涨」叙事冲突。

:::raw
<div class="tool">
  <div class="tool-hd"><h4>工具 1 · RSI 背离强度计：价格与动量是否「说两套话」</h4></div>
  <p class="tool-sub">输入两段价格变化与对应 RSI 变化，计算背离强度分（0–100）。<b>看涨背离</b>：价格走低而 RSI 抬高；<b>看跌背离</b>：价格走高而 RSI 降低。在 Spring/UTAD 附近，强度 &gt;60 才视为有效确认。</p>
  <canvas id="bwk_rsiChart" height="214" style="height:214px;margin:4px 0 10px"></canvas>
  <div class="ctrl">
    <label for="bwk_p1">价格变化 1（%）</label>
    <input type="range" id="bwk_p1" min="-15" max="5" step="0.1" value="-5.0">
    <output id="bwk_p1O">-5.0%</output>
  </div>
  <div class="ctrl">
    <label for="bwk_r1">RSI 变化 1（点）</label>
    <input type="range" id="bwk_r1" min="-15" max="15" step="0.1" value="4.0">
    <output id="bwk_r1O">+4.0</output>
  </div>
  <div class="ctrl">
    <label for="bwk_p2">价格变化 2（%）</label>
    <input type="range" id="bwk_p2" min="-10" max="8" step="0.1" value="-2.5">
    <output id="bwk_p2O">-2.5%</output>
  </div>
  <div class="ctrl">
    <label for="bwk_r2">RSI 变化 2（点）</label>
    <input type="range" id="bwk_r2" min="-15" max="15" step="0.1" value="5.5">
    <output id="bwk_r2O">+5.5</output>
  </div>
  <div class="readout">
    <div class="ro"><div class="lbl">背离类型</div><div class="val" id="bwk_divType">看涨背离</div><div class="hint" id="bwk_divTypeh">价格下行、RSI 抬升</div></div>
    <div class="ro"><div class="lbl">背离强度</div><div class="val" id="bwk_divScore">73</div><div class="hint" id="bwk_divScoreh">0–100，越高越可靠</div></div>
    <div class="ro"><div class="lbl">隐含 RSI 斜率差</div><div class="val" id="bwk_slope">+2.2</div><div class="hint" id="bwk_slopeh">RSI 变化率 − 价格变化率（归一化）</div></div>
    <div class="ro" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">
      <div class="lbl" style="min-width:52px">判断</div>
      <div class="val" id="bwk_div_v" style="font-size:15px">有效确认</div>
      <div class="hint" id="bwk_div_vh" style="margin-top:0">可纳入 Spring 剧本，仍需量能配合</div>
    </div>
  </div>
</div>
:::

**默认读数示例**：价格两段合计走低约 7.5%，RSI 合计抬高约 9.5 点 → 强度约 73 分，属「可纳入 Spring 剧本」档。**若价格与 RSI 同向新低，强度接近 0**——此时 Spring 更像真破位。

---

# 系统运行机制

## Phase A–E 在 BTC 上的运行逻辑

| Phase | 吸筹/再吸筹 | 派发 | RSI 辅助 |
|---|---|---|---|
| A | SC/BC 放量，AR 定界 | BC 见顶，AR 定上沿 | 极值后首次背离萌芽 |
| B | 横盘换手，主力吃货 | 横盘出货，反弹缩量 | 40–60 区间震荡 |
| C | **Spring**（可选） | **UTAD**（可选） | 背离最常用窗口 |
| D | SOS + LPS | SOW + LPSY | 突破后 RSI 能否站稳 50 |
| E | Markup | Markdown | 趋势钝化或崩溃 |

【事实】Wyckoff Analytics 官方说明：Spring 与 UTAD **不是必需元素**——没有 Spring 的吸筹 schematic 同样有效；**把「必须有 Spring」当成规则，是散户教程最常见的简化错误**。

## 资金流抽水图（派发阶段）

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <text x="12" y="18" font-size="12" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 派发阶段资金流（简化抽水图）</text>
  <rect x="40" y="40" width="600" height="80" rx="8" fill="#fdf3f2" stroke="#f0cdc9" stroke-width="1.3"/>
  <text x="340" y="62" text-anchor="middle" font-size="11" font-weight="700" fill="#d5342c" font-family="sans-serif">交易区间（派发 TR）</text>
  <text x="80" y="88" font-size="10" fill="#454c56" font-family="sans-serif">散户 + 杠杆多头</text>
  <text x="520" y="88" font-size="10" fill="#454c56" font-family="sans-serif">ETF/OTC/早期持有者</text>
  <path d="M 200 100 L 480 100" stroke="#d5342c" stroke-width="2" marker-end="url(#pumpR)"/>
  <defs><marker id="pumpR" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#d5342c"/></marker></defs>
  <text x="340" y="115" text-anchor="middle" font-size="10" fill="#d5342c" font-family="sans-serif">筹码 + 法币流向复合人</text>
  <rect x="120" y="140" width="440" height="50" rx="6" fill="#f4f6f9" stroke="#c9d0d9"/>
  <text x="340" y="162" text-anchor="middle" font-size="10.5" fill="#454c56" font-family="sans-serif">抽水机制：上涨缩量（努力小结果小）· 下跌放量（供应主导）</text>
  <text x="340" y="178" text-anchor="middle" font-size="10.5" fill="#454c56" font-family="sans-serif">UTAD 假突破：最后一次高价出货 · RSI 顶背离同步</text>
  <rect x="200" y="210" width="280" height="36" rx="6" fill="#f0f4fd" stroke="#c3d1f0"/>
  <text x="340" y="233" text-anchor="middle" font-size="11" fill="#1d4ed8" font-family="sans-serif">Phase E：Markdown · 杠杆级联清算</text>
</svg>
:::

---

# 时间演化

## BTC 历史上的威科夫争议案例

| 时期 | 区间（约） | 主流解读 | 结果 | RSI/RS 注记 |
|---|---|---|---|---|
| 2021.02–05 | $47k–$64k | 派发 | 跌破后跌至 $29k | 顶区 RSI 钝化后快速下穿 50 |
| 2024.03–08 | $53k–$74k | 再吸筹 vs 派发并存 | 【待验证】后续向上突破 | 夏季 Spring 测试 $53.4k 时 RSI 背离被广泛讨论 |
| 2025.01 | 上冲 $109k 后回落 | 派发 Upthrust | 【分析】多家指向 Phase D、目标 $70k–$86k | RSI 高位背离与 LPSY 无力反弹 |

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="12" y="18" font-size="12.5" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 威科夫周期演化时间轴（示意，非精确比例）</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="7" fill="#0f8a4d"/>
  <text x="80" y="82" text-anchor="middle" font-size="9" fill="#0f8a4d" font-family="sans-serif">2018–20</text>
  <text x="80" y="125" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">吸筹</text>
  <circle cx="200" cy="100" r="7" fill="#d5342c"/>
  <text x="200" y="82" text-anchor="middle" font-size="9" fill="#d5342c" font-family="sans-serif">2020–21</text>
  <text x="200" y="125" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">Markup</text>
  <circle cx="320" cy="100" r="7" fill="#8a6d1f"/>
  <text x="320" y="82" text-anchor="middle" font-size="9" fill="#8a6d1f" font-family="sans-serif">2021–22</text>
  <text x="320" y="125" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">派发→Markdown</text>
  <circle cx="440" cy="100" r="7" fill="#0f8a4d"/>
  <text x="440" y="82" text-anchor="middle" font-size="9" fill="#0f8a4d" font-family="sans-serif">2022–24</text>
  <text x="440" y="125" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">再吸筹争议</text>
  <circle cx="560" cy="100" r="7" fill="#8a6d1f"/>
  <text x="560" y="82" text-anchor="middle" font-size="9" fill="#8a6d1f" font-family="sans-serif">2025</text>
  <text x="560" y="125" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">派发争议</text>
  <text x="340" y="165" text-anchor="middle" font-size="10" fill="#7c848f" font-family="sans-serif">每一段「争议区间」都是方法试金石：事后标签永远比事前容易</text>
</svg>
:::

**演化规律**：BTC 减半周期约 4 年，与威科夫「大级别吸筹—拉升—派发」在时间上常重叠，但**不同步**——不要用减半日历替代区间读盘。

---

# 利益与激励

| 主体 | 激励 | 如何扭曲你的读盘 | 对冲 |
|---|---|---|---|
| 分析师/KOL | 流量、返佣 | 任何走势都能套威科夫标签 | 只看可证伪条件 |
| 交易所 | 交易量、爆仓 | 鼓励杠杆在 Spring/UTAD 边缘开仓 | 降低杠杆、等 LPS |
| ETF 发行方 | 规模、管理费 | 强调长期持有、淡化区间风险 | 独立看净流入与价格位移 |
| 你自己 | 回本、踏空恐惧 | 持仓方向污染结构判断 | 先写证伪合同 |

---

# 资源与信息流

## 抽象 ↔ 机制 ↔ 操作 三层映射

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="12" y="18" font-size="12" font-weight="700" fill="#15181d" font-family="sans-serif">抽象概念 → 底层机制 → 可执行操作</text>
  <rect x="20" y="40" width="190" height="200" rx="8" fill="#f0f4fd" stroke="#c3d1f0"/>
  <text x="115" y="62" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象层</text>
  <text x="35" y="88" font-size="10" fill="#454c56" font-family="sans-serif">· 吸筹 / 派发</text>
  <text x="35" y="108" font-size="10" fill="#454c56" font-family="sans-serif">· 相对强弱</text>
  <text x="35" y="128" font-size="10" fill="#454c56" font-family="sans-serif">· 动量衰竭</text>
  <text x="35" y="148" font-size="10" fill="#454c56" font-family="sans-serif">· 复合人</text>
  <rect x="245" y="40" width="190" height="200" rx="8" fill="#f2f7f4" stroke="#c6dcc9"/>
  <text x="340" y="62" text-anchor="middle" font-size="11" font-weight="700" fill="#0f8a4d" font-family="sans-serif">机制层</text>
  <text x="260" y="88" font-size="10" fill="#454c56" font-family="sans-serif">· 止损簇触发与回收</text>
  <text x="260" y="108" font-size="10" fill="#454c56" font-family="sans-serif">· 供应吸收 vs 释放</text>
  <text x="260" y="128" font-size="10" fill="#454c56" font-family="sans-serif">· RSI 涨跌速度差</text>
  <text x="260" y="148" font-size="10" fill="#454c56" font-family="sans-serif">· BTC 资金轮动</text>
  <rect x="470" y="40" width="190" height="200" rx="8" fill="#fff8ec" stroke="#f0dcb4"/>
  <text x="565" y="62" text-anchor="middle" font-size="11" font-weight="700" fill="#a06800" font-family="sans-serif">操作层</text>
  <text x="485" y="88" font-size="10" fill="#454c56" font-family="sans-serif">· 画周线区间</text>
  <text x="485" y="108" font-size="10" fill="#454c56" font-family="sans-serif">· 标 Spring + 背离</text>
  <text x="485" y="128" font-size="10" fill="#454c56" font-family="sans-serif">· 等 SOS→LPS 入场</text>
  <text x="485" y="148" font-size="10" fill="#454c56" font-family="sans-serif">· 看 BTC.D 过滤</text>
  <text x="485" y="168" font-size="10" fill="#454c56" font-family="sans-serif">· 写证伪 + 仓位</text>
  <line x1="210" y1="140" x2="243" y2="140" stroke="#454c56" stroke-width="1.3"/>
  <line x1="435" y1="140" x2="468" y2="140" stroke="#454c56" stroke-width="1.3"/>
</svg>
:::

## 信息源优先级

| 优先级 | 来源 | 用途 |
|---|---|---|
| 1 | 周线/日线 K 线 + 量 | 区间与事件 |
| 2 | RSI(14) + BTC.D / ETH/BTC | 动量与相对强弱 |
| 3 | ETF 日净流入、资金费率 | 当代订单流 |
| 4 | 链上 LTH、交易所余额 | 辅助验证，非主信号 |
| 5 | 社交媒体威科夫 counts | **仅作假设**，需自行验证 |

---

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

| # | 杠杆点 | 为什么杠杆高 | 落地动作 |
|---|---|---|---|
| 1 | **周线定多空，日线找事件** | 一次性过滤 80% 逆势交易 | 周线区间不明则不做 |
| 2 | **Spring/UTAD 必须配 RSI 背离** | 把假突破与真洗盘分开一档 | 背离强度 &lt;40 则观望 |
| 3 | **进场点后移到 LPS/LPSY 后** | 避开最大爆仓区 | 突破日不追 |
| 4 | **用 BTC.D 过滤山寨威科夫** | 山寨吸筹常随 BTC 错杀 | BTC.D 急升时慎做多山寨 |
| 5 | **开仓前写证伪条件** | 对抗 L9 持仓偏见 | 价格/时间/RSI 三选一写清 |
| 6 | **先算赔率再算故事** | 形态会骗人，赔率不会 | 盈亏比 &lt;2 不做 |
| 7 | **对照随机做多基准胜率** | BTC 正漂移使「60% 胜率」缩水 | 用工具 3 剥漂移 |
| 8 | **记录每笔含失败** | 唯一真实胜率来源 | 一行日记 |
| 9 | **宏观 L1 一票否决** | 2020.03、2022 全结构失效 | 极端波动周减仓 |
| 10 | **RSI 周期与持仓周期对齐** | 日线 Spring 用 RSI(14)；周线用 RSI(14) 或 21 | 周期错配则信号无效 |

---

# 常见认知陷阱

:::details 陷阱 1 · 把 RSI 超买超卖当反转信号
**症状**：RSI&gt;70 做空、RSI&lt;30 做多，在 BTC 趋势里连续亏损。

**机制**：【分析】PMC 2023 年加密货币 RSI 研究表明，传统阈值在趋势市场高波动环境下失效；BTC 牛市可 RSI&gt;70 维持数周。

**对冲**：RSI 只作**背离与 50 中轴**工具，不作绝对阈值。
:::

:::details 陷阱 2 · 每一个跌破都叫 Spring
**症状**：杠杆清算后反弹 1 根 K 线就标注 Spring。

**机制**：真 Spring 需**收盘收回区间内** + 缩量 + 最好在 Phase C。【事实】Wyckoff Analytics：Spring 是测试供应，不是 intraday 插针。

**对冲**：用工具 4 打质量分，&lt;50 则标「待观察」。
:::

:::details 陷阱 3 · 忽视再吸筹与派发的对称性
**症状**：牛市横盘一律当「洗盘」，熊市横盘一律当「筑底」。

**机制**：再吸筹与派发在 K 线上几乎相同，区别在**前置趋势与突破方向**。

**对冲**：先答「前面是 Markup 还是 Markdown？」再贴标签。
:::

:::details 陷阱 4 · 相对强弱只看 BTC 自己
**症状**：BTC 横盘微涨，以为强势，实则山寨暴涨 BTC 跑输。

**机制**：BTC.D 下降 + 总市值上升 = 资金轮动，不是 BTC 带队。

**对冲**：同时打开 BTC.D 与 ETH/BTC。
:::

:::details 陷阱 5 · 漂移幻觉（「胜率 62%」）
**症状**：回测胜率 62%，以为显著优于随机。

**机制**：BTC 年化漂移约 45%、波动 55% 时，**持有 20 日随机做多基准胜率已达 59.1%**——真实超额仅约 2.9pp，需约 2259 次交易才能统计证明。

**对冲**：用工具 3，超额 &lt;3pp 默认无效。
:::

:::details 陷阱 6 · ETF 利好 = SOS
**症状**：ETF 通过日追涨，随后长期横盘。

**机制**：消息日往往是**情绪 BC**，不是结构 SOS。

**对冲**：消息日后等 LPS，不看首日 K 线。
:::

:::details 陷阱 7 · 多时间框架 RSI 打架
**症状**：日线背离但周线 RSI 下行，仍做多。

**机制**：大周期动量压制小周期背离。

**对冲**：周线 RSI 方向与交易方向一致才开仓。
:::

:::details 陷阱 8 · 忽视资金费率极端
**症状**：Spring 做多同时费率 0.1%/8h。

**机制**：多头拥挤时 Spring 易变「多杀多」起点。

**对冲**：费率 &gt;0.05%/8h 时减仓或观望。
:::

:::details 陷阱 9 · 样本 = 自己记得的几次
**症状**：「上次 Spring 都涨了」。

**机制**：幸存者偏差 + 无记录。

**对冲**：遮图测验 20 次 + 记录表。
:::

:::details 陷阱 10 · 把分析师目标价当因果计数
**症状**：「威科夫目标 $144k」满仓。

**机制**：P&amp;F 计数是**机制推导的上限**，不是承诺；且 BTC 波动大，格值选取主观。

**对冲**：目标价 ×0.7 再算赔率，&lt;2 不做。
:::

:::details 陷阱 11 · 链上叙事覆盖量价
**症状**：LTH 增持所以忽略 SOW。

**机制**：链上与价格可长期背离；威科夫读的是**成交**。

**对冲**：链上仅作二级确认，不否决价量。
:::

:::details 陷阱 12 · 24/7 市场不设时间证伪
**症状**：横盘三个月仍「等 SOS」。

**机制**：机会成本 + 结构可能已失效。

**对冲**：20 个交易日无进展则作废假设。
:::

---

# 从抽象到现实

## 案例骨架：2024 再吸筹叙事（【待验证】）

【待验证】Cointelegraph 2024 年 8 月报道：BTC 或处于再吸筹 Test 阶段，测试 Spring 低点约 $53,400，若突破 $74,000 则进入 SOS。【分析】同期 RSI 从超卖区抬升、与价格形成背离的讨论增多——**这是「结构 + 动量」组合的典型教科书描述，不是事后确认的事实**。

读盘清单：

1. 周线区间是否清晰？上下沿各至少 2 次触碰
2. 跌破 $53.4k 是否**收盘收回**？量能是否低于 SC？
3. RSI 在第二次探底时是否高于第一次？
4. 突破 $74k 是否量比 &gt;1.5？回踩是否 LPS？

**任一否 → 降级为「观望」**。

---

# 从理论到行动

## 决策表（BTC 专用）

| 结构 | RSI | 相对强弱 | 行动 |
|---|---|---|---|
| Spring + 收回 | 看涨背离 &gt;60 分 | BTC.D 企稳或 ETH/BTC 见底 | 等 SOS→LPS 轻仓试多 |
| 横盘 Phase B | 40–60 | 无方向 | **不交易** |
| UTAD | 看跌背离 | BTC 涨、山寨更强（BTC.D 降） | 不追多，考虑减仓 |
| SOW 跌破 | RSI &lt;45 且无背离 | BTC.D 升（资金回流 BTC 避险） | 不做多，等待新区间 |

:::raw
<div class="tool">
  <div class="tool-hd"><h4>工具 2 · 威科夫相位置信度：吸筹 vs 派发（0–100）</h4></div>
  <p class="tool-sub">用<strong>位置分位、上涨/下跌量比、RSI 水平</strong>三因素估计当前更像吸筹还是派发。不是自动标签机——输出 &lt;55 分时必须标「不确定」。</p>
  <div class="ctrl">
    <label for="bwk_pos">价格在区间中的位置（%）</label>
    <input type="range" id="bwk_pos" min="0" max="100" step="1" value="28">
    <output id="bwk_posO">28%（偏下）</output>
  </div>
  <div class="ctrl">
    <label for="bwk_vUp">上涨日量比（均量倍数）</label>
    <input type="range" id="bwk_vUp" min="0.3" max="3" step="0.1" value="0.8">
    <output id="bwk_vUpO">0.8×</output>
  </div>
  <div class="ctrl">
    <label for="bwk_vDn">下跌日量比（均量倍数）</label>
    <input type="range" id="bwk_vDn" min="0.3" max="3" step="0.1" value="1.4">
    <output id="bwk_vDnO">1.4×</output>
  </div>
  <div class="ctrl">
    <label for="bwk_rsiLv">RSI(14) 当前值</label>
    <input type="range" id="bwk_rsiLv" min="20" max="80" step="0.5" value="38">
    <output id="bwk_rsiLvO">38</output>
  </div>
  <div class="readout">
    <div class="ro"><div class="lbl">吸筹置信度</div><div class="val" id="bwk_acc">60</div><div class="hint" id="bwk_acch">0=纯派发，100=纯吸筹</div></div>
    <div class="ro"><div class="lbl">派发置信度</div><div class="val" id="bwk_dist">40</div><div class="hint" id="bwk_disth">100 − 吸筹置信度</div></div>
    <div class="ro"><div class="lbl">量价信号</div><div class="val" id="bwk_vq" style="font-size:14px">跌放量涨缩量</div><div class="hint" id="bwk_vqh">偏吸筹特征</div></div>
    <div class="ro" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">
      <div class="lbl" style="min-width:52px">判断</div>
      <div class="val" id="bwk_phase_v" style="font-size:15px">偏吸筹</div>
      <div class="hint" id="bwk_phase_vh" style="margin-top:0">需 Spring/SOS 事件确认，不可直接满仓</div>
    </div>
  </div>
</div>
:::

**默认读数**：位置 28%、涨缩量 0.8×、跌放量 1.4×、RSI 38 → 吸筹置信度约 **60**，属「偏吸筹但需事件确认」——与 2024 年夏季 BTC 叙事方向一致，**不构成投资建议**。

---

# 技能树

| 层级 | 能力 | 达标检验 |
|---|---|---|
| L1 | 画 BTC 周线区间 | 两人独立画出的边界相差 &lt;5% |
| L2 | 标 Spring/UTAD/SOS/SOW | 能说出每一标签的量价依据 |
| L3 | 手算 RSI(14) 与背离 | 与软件值误差 &lt;1 点 |
| L4 | 读 BTC.D + ETH/BTC | 能判断当前是 Regime 1–4 哪一种 |
| L5 | 写完整证伪合同 | 含价格、时间、RSI 三条之一 |
| L6 | 记录 30 笔统计胜率 | 有真实超额 vs 基准的计算 |

---

# 游戏化世界

**角色**：你是「区间侦探」，在「Compound City」地图上解锁五个关卡——**画界 → 找 Spring → 验背离 → 等 LPS → 写复盘**。

| 关卡 | 任务 | 奖励（自我约定） |
|---|---|---|
| 1-1 | 找出 2024 BTC 区间的上下沿 | 允许自己看一次分析师观点 |
| 1-2 | 标出 3 个历史 Spring，遮图验证 | 解锁「工具 4」 |
| 2-1 | 连续 7 天记录 RSI+结构 | 解锁「相对强弱」章节重读 |
| Boss | 30 笔实盘或模拟记录 | 才有资格调整个人规则 |

---

# 任务系统

| 频率 | 任务 | 产出 |
|---|---|---|
| 每日 | 更新 BTC 区间与 RSI | 一行状态：Phase / RSI / BTC.D |
| 每周 | 遮图测验 5 次 | 命中率 |
| 每月 | 用工具 3 复核策略超额 | 是否仍 &gt;3pp |
| 每季 | 对照链上 + ETF 流量 | 一份矛盾清单 |

---

# 反事实模拟

:::tabs
@@情景 A：Spring 完美但 RSI 无背离
**假设**：价格跌破区间 2.5% 后 2 日收回，量能 0.7×，但 RSI 创新低。

**后果**：【推论】历史上此类「结构对、动量错」案例后续 SOS 成功率低于「结构+背离双确认」情形——应降仓位 50% 或等二次测试。

**洞察**：威科夫事件与 RSI 是**独立证据源**，缺一不否决但应打折。
@@情景 B：RSI 背离但无 Spring
**假设**：区间中部 RSI 看涨背离，价格未测下沿。

**后果**：可能是**下跌中继**而非吸筹末端——背离在中继段常见。

**洞察**：背离必须发生在**区间下沿 30% 分位以内**才纳入吸筹剧本（杠杆点 4）。
@@情景 C：BTC 派发但山寨暴涨
**假设**：BTC 周线 UTAD，ETH 突破新高，BTC.D 快速下降。

**后果**：组合若全仓 BTC 多头受损；若持有山寨则可能阶段性盈利——**派发是 BTC 结构，不一定是全市场结构**。

**洞察**：威科夫要**按标的分别画区间**；BTC 派发 + 山寨吸筹可并存。
@@情景 D：ETF 连续净流入但价格横盘
**假设**：一周净流入 $1B+，BTC 波动 &lt;3%，RSI 50 附近。

**后果**：大努力小结果 → 吸收或对冲申购，**不是 SOS**。

**洞察**：努力与结果律优先于叙事；净流入需配价格位移。
:::

---

# 四级能力路线

| 级别 | 时间 | 标志 |
|---|---|---|
| 新手 | 0–6 周 | 能画区间 + 读出 RSI，不急于下单 |
| 进阶 | 2–4 月 | 背离 + 相位工具与手动判断一致率 &gt;70% |
| 熟练 | 6–12 月 | 30+ 笔记录，算清真实超额 |
| 专家 | 1 年+ | 能明确说「当前环境威科夫降权，改用 X」 |

---

<!-- nav:路径 -->

# 30 分钟最小实践

## 今天就做：BTC 威科夫-RSI 一页纸

**成本**：0 元，30 分钟，TradingView 或同类免费图表即可。

### 步骤

1. **（5 分钟）** 打开 BTC/USDT **周线**，画最近 12 个月的矩形区间。
2. **（5 分钟）** 切日线，标当前处于 Phase A–E 哪一段；若说不清，写「Phase B 不确定」。
3. **（8 分钟）** 加 RSI(14)，比较最近两个局部低点：价格与 RSI 是否背离？用工具 1 估强度。
4. **（7 分钟）** 打开 BTC.D，写一句：BTC 相对加密大盘是走强还是走弱？
5. **（5 分钟）** 写证伪条件一行，例如：「若周线收盘跌破 $X 或 20 日内 RSI 续创新低，放弃吸筹假设。」

### 产出

一张截图 + 五句文字：**区间、Phase、背离分、BTC.D 方向、证伪条件**——30 天后回看，这是你的第一个可验证数据点。

---

# 7 天实践计划

| 天 | 任务 | 时间 |
|---|---|---|
| D1 | 完成上一节一页纸 | 30 min |
| D2 | 复盘 2021 BTC 派发段，标 UTAD+RSI | 30 min |
| D3 | 复盘 2024 再吸筹争议，列正反证据 | 30 min |
| D4 | 遮图测验 10 次（只给左 70% K 线） | 30 min |
| D5 | 手算 5 日 RSI 与软件对照 | 30 min |
| D6 | 用工具 2/4 给 3 个历史 Spring 打分 | 30 min |
| D7 | 写本周最不确定的一个问题 | 30 min |

---

# 30 天能力构建计划

| 周 | 重点 | 达标 |
|---|---|---|
| W1 | 区间 + Phase 语言 | 能盲画 2024 区间 |
| W2 | RSI 背离 | 10 次背离判断有记录 |
| W3 | 相对强弱 BTC.D | 能解释当前 Regime |
| W4 | 证伪 + 记录 | ≥10 笔含失败样本 |

---

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | 四阶段循环 | 吸筹→Markup→派发→Markdown |
| 2 | Phase A–E | 事件顺序约束假设 |
| 3 | Spring / UTAD | 假突破测试供应/需求 |
| 4 | 努力与结果 | 量比 vs 波幅 |
| 5 | RSI(14) 公式 | 动量速度，非价格 |
| 6 | 看涨/看跌背离 | 价格与动量语义分裂 |
| 7 | BTC.D 四 Regime | 资金轮动的宏观 RSI |
| 8 | 随机做多基准 | 剥离 BTC 正漂移 |
| 9 | 盈亏比门槛 | 期望为正的前提 |
| 10 | 证伪合同 | L9 偏见的唯一解药 |

---

# 关键问题清单

:::details 结构
- 周线区间上下沿各被测试了几次？
- 当前更靠近再吸筹还是派发？前置趋势是什么？
- 最近是否有 Spring/UTAD？是否收盘确认？
:::

:::details 动量与相对强弱
- RSI 在最近两个同向极值是否背离？
- 周线 RSI 与日线 RSI 是否同向？
- BTC.D 与 ETH/BTC 指向同一叙事吗？
:::

:::details 风险与统计
- 盈亏比是否 ≥2？
- 策略胜率扣掉 20 日基准后是否仍 &gt;3pp？
- 证伪条件是否可观测且会在 20 日内触发？
:::

---

# 下一阶段探索

1. **订单流与威科夫**：把 CVD、足迹图接入 Spring 识别（L8 层）
2. **链上 + 结构**：LTH 变化率作为 Phase B 长度的贝叶斯先验
3. **跨品种配对**：ETH/BTC 区间与 BTC 区间共振交易
4. **机器学习辅助**：用标注好的 Spring 数据集训练分类器——**仅作排序，不作黑箱**
5. **回测纪律**：按 PMC 2023 框架系统测试「背离+Spring」vs 纯 Spring

---

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| Wyckoff Spring/UTAD 定义 | 方法论原文 | Wyckoff Analytics 官网 | 【事实】 |
| 2024 BTC 再吸筹报道 | 媒体 | Cointelegraph / TradingView 2024-08 | 【待验证】 |
| 2025 派发解读 | 媒体 | Cointelegraph / cryptonews.net 2025 | 【分析】 |
| RSI 定义与公式 | 教科书 | Investopedia RSI 条目 | 【事实】 |
| 加密货币 RSI 回测 | 学术论文 | PMC9920669, 2023 | 【事实】 |
| BTC.D 与山寨季 | 行业分析 | crypto.news 2026 中期综述 | 【待验证】 |
| 随机做多基准公式 | 项目内推导 | 全景引擎 SKILL §1 | 【推论】 |
| ETF 流量影响 | 行业观察 | 多家 2024–2025 报道 | 【分析】 |

标记说明：**【事实】** 可核对一手来源；**【分析】** 机构或作者判断；**【推论】** 本手册推导；**【假设】** 待检验；**【待验证】** 二手数据或争议案例。

---

# 免责声明 {.appendix}

本手册仅供学习与研究，**不构成任何投资建议**。比特币及衍生品波动极大，杠杆可能导致本金全部损失。文中历史案例、胜率与超额收益均来自特定样本与假设，**过去表现不代表未来结果**。作者不对依据本手册做出的任何交易决策承担责任。请在充分了解风险、遵守当地法规的前提下独立决策。

:::raw
<div class="tool">
  <div class="tool-hd"><h4>工具 3 · BTC 漂移剥离器：「62% 胜率」还剩多少超额</h4></div>
  <p class="tool-sub">BTC 长期正漂移使「持有 N 日随机做多」的胜率远高于 50%。默认参数：年化漂移 45%、波动 55%（【待验证】来自近年 BTC 波动率共识区间）。</p>
  <canvas id="bwk_driftChart" height="176" style="height:176px;margin:4px 0 10px"></canvas>
  <div class="ctrl">
    <label for="bwk_dT">持有期（交易日）</label>
    <input type="range" id="bwk_dT" min="5" max="60" step="1" value="20">
    <output id="bwk_dTO">20 日</output>
  </div>
  <div class="ctrl">
    <label for="bwk_dps">策略报告胜率</label>
    <input type="range" id="bwk_dps" min="50" max="80" step="0.1" value="62.0">
    <output id="bwk_dpsO">62.0%</output>
  </div>
  <div class="ctrl">
    <label for="bwk_dmu">BTC 年化漂移</label>
    <input type="range" id="bwk_dmu" min="0" max="80" step="1" value="45">
    <output id="bwk_dmuO">45%</output>
  </div>
  <div class="ctrl">
    <label for="bwk_dsg">BTC 年化波动</label>
    <input type="range" id="bwk_dsg" min="30" max="90" step="1" value="55">
    <output id="bwk_dsgO">55%</output>
  </div>
  <div class="readout">
    <div class="ro"><div class="lbl">随机做多基准</div><div class="val" id="bwk_dbase">59.1%</div><div class="hint" id="bwk_dbaseh">相同持有期、相同漂移假设</div></div>
    <div class="ro"><div class="lbl">真实超额</div><div class="val" id="bwk_ddp">+2.9 pp</div><div class="hint" id="bwk_ddph">策略胜率 − 基准</div></div>
    <div class="ro"><div class="lbl">证明非随机所需样本</div><div class="val" id="bwk_dn">2259</div><div class="hint" id="bwk_dnh">单侧 5%、检验力 80%</div></div>
    <div class="ro" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">
      <div class="lbl" style="min-width:52px">判断</div>
      <div class="val" id="bwk_d_v" style="font-size:15px">超额可疑</div>
      <div class="hint" id="bwk_d_vh" style="margin-top:0">2.9pp 易被成本与过拟合吞噬</div>
    </div>
  </div>
</div>

<div class="tool">
  <div class="tool-hd"><h4>工具 4 · Spring/UTAD 质量分（BTC 波动校准）</h4></div>
  <p class="tool-sub">针对 BTC 略放宽深度最优区间（1%–4%）。跌破深度、收回速度、量能三因子合成 0–100 分。</p>
  <div class="ctrl">
    <label for="bwk_spd">跌破/突破深度（%）</label>
    <input type="range" id="bwk_spd" min="0.5" max="12" step="0.1" value="2.5">
    <output id="bwk_spdO">2.5%</output>
  </div>
  <div class="ctrl">
    <label for="bwk_spt">收回/回落 K 线数</label>
    <input type="range" id="bwk_spt" min="1" max="10" step="1" value="2">
    <output id="bwk_sptO">2 根</output>
  </div>
  <div class="ctrl">
    <label for="bwk_spv">测试日量比</label>
    <input type="range" id="bwk_spv" min="0.3" max="4" step="0.1" value="0.8">
    <output id="bwk_spvO">0.8×</output>
  </div>
  <div class="readout">
    <div class="ro"><div class="lbl">质量分</div><div class="val" id="bwk_spScore">83.0</div><div class="hint" id="bwk_spScoreh">Spring 越高越好；UTAD 时反向理解</div></div>
    <div class="ro"><div class="lbl">深度/速度/量能</div><div class="val" id="bwk_spParts" style="font-size:14px">0.95 / 0.51 / 1.00</div><div class="hint" id="bwk_spPartsh">分项 0–1</div></div>
    <div class="ro"><div class="lbl">BTC 最优深度</div><div class="val" id="bwk_spOpt" style="font-size:14px">1%–4%</div><div class="hint" id="bwk_spOpth">较股票略宽</div></div>
    <div class="ro" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline">
      <div class="lbl" style="min-width:52px">判断</div>
      <div class="val" id="bwk_sp_v" style="font-size:15px">高质量 Spring</div>
      <div class="hint" id="bwk_sp_vh" style="margin-top:0">等 SOS 突破 + RSI&gt;50 再考虑入场</div>
    </div>
  </div>
</div>
:::
