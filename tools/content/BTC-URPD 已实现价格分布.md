---
slug: BTC-URPD 已实现价格分布
title: BTC-URPD 已实现价格分布
subtitle: 把全网持仓画成<strong>成本基线直方图</strong>——厚区是反应带、薄区是加速带，但<strong>不预测</strong>顶底
brand_sub: Bitcoin × On-Chain × Cost Basis
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, URPD, 链上指标, 成本基线, Glassnode]
theme_js_file: BTC-URPD 已实现价格分布.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**URPD（UTXO Realized Price Distribution）= 按「每枚币上次链上转移时的价格」把当前供应画成直方图。** 横轴是价格桶下界，纵轴是该桶内的 BTC 数量（或占比）【事实】。**高柱 = 大量筹码在该价位换手 = 成本簇**；价格回到该簇时，持有者盈亏结构相似，市场更可能出现**吸收或抛压**——但这是**反应概率**，不是预言【推论】。

Glassnode 2020 年由 Renato Shirakashi 引入【事实】；有 **ATH 分桶**（0→历史高点均分 100 桶）与 **±2% 百分比分桶**（以收盘价为中心各 50 桶）两种透镜【事实】。2026 年 9 月现货约 **$77.4K**、已实现价格约 **$53.2K**【待验证】——URPD 回答的不是「贵不贵」，而是**「下一档厚/薄区在哪」**。

# 这个领域到底是什么

## 一句话定位

「BTC-URPD」研究的是：**用链上 UTXO 成本基线的空间分布，识别支撑/阻力反应带、薄区加速通道，及其与 MVRV、HODL Waves、CBD 的关系与边界**。它是 MVRV（标量）的「展开版」——从全网平均成本到**每一档价位的筹码堆叠**。

:::note red 先划清边界
URPD **不提供**「到 X 美元必反弹/必见顶」的信号。它刻画**存量筹码的成本地图**；是否变现取决于流动性、宏观与行为，须配 SOPR、aSOPR、实现盈亏等行为指标确认【分析】。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | URPD 定义、两种分桶、实体调整、厚/薄区读法 |
| 2 | 边界在哪 | 不含订单簿深度；不预测监管；不替代 K 线结构 |
| 3 | 核心对象 | UTXO、价格桶、供应柱、现货价、ATH |
| 4 | 参与者 | Glassnode、链上 KOL、ETF 做市商、批评者、数据索引商 |
| 5 | 关键变量 | 桶宽、供应占比、现货位置、IC 加权、实体调整 |
| 6 | 可观察的 | 链上 UTXO 集、Glassnode Studio/API、现货价 |
| 7 | 不可观察但可推断 | 交易所内部划转、丢失币、OTC 真实成本 |
| 8 | 谁影响谁 | 换手→桶迁移；价格→触及桶→行为反应 |
| 9 | 因果 | UTXO 按转移价分桶 = 【事实】；厚区=支撑 = 【推论】 |
| 10 | 只是相关 | 柱高与历史高低点常重合——后验叙事风险 |
| 11 | 表层现象 | 「$82K 无阻力」「$30K 铁底」社交媒体图 |
| 12 | 底层机制 | 成本锚定 + 盈亏同质→集体行为趋同 |
| 13 | 反馈 | 薄区快速穿越→波动放大→更多换手→重画 URPD |
| 14 | 时间延迟 | URPD 无时间轴——静态快照，需 CBD 补演化 |
| 15 | 正负反馈 | 正：厚区吸收→企稳；负：薄区穿透→止损连锁 |

## URPD 与邻近指标

| 指标 | 维度 | 与 URPD 关系 |
|---|---|---|
| **Realized Price** | 标量（全网均值） | URPD 的加权平均 ≈ Realized Price |
| **MVRV** | 标量（偏离倍数） | MVRV 告诉你偏离多少；URPD 告诉你**偏离发生在哪些价位** |
| **HODL Waves** | 年龄分布 | 年龄×价格：实体调整 URPD × LTH/STH 分层 |
| **CBD** | 价格×时间热力图 | URPD 的时序升级版【事实】 |
| **URPD IC** | 资本加权 | 币数峰值 ≠ 美元投入峰值【分析】 |

# 为什么值得研究

## 理由一：把「成本基线」从一条线展开成一张地图

MVRV 只说全网平均盈利 **+45%**（2026-09 现货/已实现 ≈ 1.45）【待验证】——URPD 进一步显示：**$53K 附近供应柱最厚（~11%）**，而 **$70–78K 区间柱极薄（<2%）**【推论·示意模型】。这是「下一档结构障碍」的链上语言。

## 理由二：2024–2026 ETF 时代重画筹码分布

机构 ETF 持续换手，把供应从低价桶**抬升**到 $50–70K 新区【推论】。Glassnode Finance Bridge #3 指出：$15–25K 为长期坚守区、$28–31K 为风险带、上方 $30K+ 为 2021–22 周期筹码【分析】——**地图随周期迁移，不能死记旧价位**。

## 理由三：学会「水平 ≠ 预测」+ 对照基准

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「厚区反弹 62% 胜率」真实超额 |
|---|---|---|---|
| 20 日 | — | **58.6%** | 表面 +3.4 pp → 真实 **+3.4 pp** |
| 40 日 | — | **62.0%** | 表面 +5.0 pp → 真实 **+5.0 pp** |
| 90 日 | — | **67.7%** | 表面 +2.0 pp → 真实 **~-0.7 pp** |

**任何「URPD 支撑有效」叙事都要和对照基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 UTXO 账本，到 URPD 直方图

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC-URPD · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「链上硬数据」，越靠下越「读图/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① UTXO 账本层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">每枚币记录上次转移价 · 供应 ~19.8M</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：丢失币、交易所池化地址</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 分桶聚合层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">URPD(price bucket) = Σ 桶内 UTXO 价值</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">横轴标签 = 桶下界【事实】</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 分桶透镜层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">ATH 100 桶 vs ±2%×100 桶</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">全史结构 vs 近端放大</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 实体调整层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">剔除交易所内部划转 · 同实体归并</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：实体聚类启发式误差</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 厚/薄结构层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">高柱=成本簇 · 低柱=薄区/加速带</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">非因果预测——反应概率</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 行为确认层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">SOPR、aSOPR、实现盈亏、CDD</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">吸收 vs 派发须行为证伪</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 加权变体层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">币数 URPD vs URPD IC（投入资本）</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">低价大量 ≠ 高价少量（美元）</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「无阻力至 $82K」链上 KOL 图</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：静态图忽略时间维</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">URPD 当地图，不当触发器</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">厚/薄 + 行为 + 漂移对照</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">URPD 概念 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 成本基线分布</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 支撑/阻力概率</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 筹码堆积</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 路径依赖</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• UTXO 按转移价分桶</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 同质盈亏→集体行为</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 薄区供给冲击大</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 换手迁移柱位</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dfc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 标厚/薄区清单</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 配 SOPR 确认</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 选 ATH/% 透镜</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• §12 漂移剥离</text>
  <path d="M214 140 L240 140" stroke="#454c56" stroke-width="1.5" marker-end="url(#urA)"/>
  <path d="M440 140 L466 140" stroke="#454c56" stroke-width="1.5" marker-end="url(#urA)"/>
  <defs><marker id="urA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 URPD 的关系 |
|---|---|---|
| **Glassnode** | 指标定义、实体调整、CBD 演进 | URPD 原创平台【事实】 |
| **CryptoQuant / BGeometrics** | 第三方 URPD 图 | 分桶细节可能不同【待验证】 |
| **链上 KOL** | 解读厚/薄区路径 | 放大「无阻力」叙事 |
| **ETF 授权参与者** | 机械再平衡买盘 | 持续把供应迁入新桶【推论】 |
| **批评者（BIS 等）** | 链上精度方法论 | 转账≠经济行为，误差可达数倍【分析】 |

# 核心变量

| 变量 | 符号/口径 | 2026-09 参考【待验证】 | 读法 |
|---|---|---|---|
| 现货价 | Spot | ~$77,400 | 蓝线在 URPD 上的位置 |
| 已实现价格 | RP | ~$53,200 | 直方图加权重心 |
| ATH | 历史高点 | ~$126,000 | ATH 分桶上界 |
| ATH 桶宽 | ATH÷100 | **$1,260**/桶 | 远端分辨率粗 |
| % 桶宽 | Spot×2% | **~$1,548**/桶 | 近端放大 |
| 厚区阈值 | 供应占比 | ≥6–8% | 反应带候选 |
| 薄区阈值 | 供应占比 | <2% | 加速带候选 |
| LTH 已实现价 | — | ~$49,400 | 厚区常在其上方 |
| STH 已实现价 | — | ~$71,000 | 现货上方抛压区 |

:::raw
<div class="tool">
<h3>工具 · URPD 成本基线地图</h3>
<p>示意直方图：拖动<strong>现货价</strong>，读最近厚支撑、薄阻力与下方供应占比。默认现货 <strong>$77,400</strong>、ATH <strong>$126,000</strong>。</p>
<div class="ctrl"><label>现货价 ($K)<input type="range" id="urpd_spot" min="40000" max="120000" step="100" value="77400"><output id="urpd_spotO">$77.4K</output></label></div>
<div class="ctrl"><label>ATH ($K)<input type="range" id="urpd_ath" min="100000" max="150000" step="500" value="126000"><output id="urpd_athO">$126.0K</output></label></div>
<div class="readout">
<div class="ro"><span class="k">下方厚支撑</span><strong id="urpd_sup">—</strong><span id="urpd_suph">—</span></div>
<div class="ro"><span class="k">上方厚阻力</span><strong id="urpd_res">—</strong><span id="urpd_resh">—</span></div>
<div class="ro"><span class="k">最近薄区</span><strong id="urpd_thin">—</strong><span id="urpd_thinh">—</span></div>
<div class="ro"><span class="k">下方供应占比</span><strong id="urpd_below">—</strong><span id="urpd_belowh">—</span></div>
<canvas id="urpdChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="urpd_v">—</strong><span id="urpd_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">URPD 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="90" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">链上换手</text>
  <rect x="200" y="50" width="130" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="265" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">UTXO 重定价</text>
  <rect x="380" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="440" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">URPD 柱迁移</text>
  <rect x="530" y="50" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="590" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">厚/薄结构</text>
  <rect x="120" y="150" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="190" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货触及桶区</text>
  <rect x="320" y="150" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="390" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">盈亏同质反应</text>
  <rect x="500" y="150" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="570" y="178" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">吸收/抛压</text>
  <path d="M150 72 L200 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#urB)"/>
  <path d="M330 72 L380 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#urB)"/>
  <path d="M500 72 L530 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#urB)"/>
  <path d="M590 94 L590 150 L460 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#urB)"/>
  <path d="M190 150 L265 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#urB)"/>
  <path d="M260 172 L320 172" stroke="#454c56" stroke-width="1.5" marker-end="url(#urB)"/>
  <path d="M460 172 L500 172" stroke="#454c56" stroke-width="1.5" marker-end="url(#urB)"/>
  <path d="M390 194 L265 94" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#urC)"/>
  <path d="M570 194 L440 72" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#urC)"/>
  <defs>
    <marker id="urB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="urC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：换手改变柱位（慢）；价格触及柱区触发行为（快）。红色反馈：薄区穿透→波动→更多换手→URPD 重画。

# 隐藏关系

## 隐藏关系一：URPD 与 MVRV 是同一数据的两张脸

MVRV = 现货 ÷ Realized Price = **直方图的一阶矩比值**【事实】。MVRV 1.45 只告诉你「平均盈利 45%」；URPD 告诉你**盈利集中在哪些价位**——$53K 厚柱 vs $95K 残余柱，含义完全不同【分析】。

## 隐藏关系二：币数峰值 ≠ 资本峰值

1 BTC @ $10K 与 0.1 BTC @ $100K 币数差 10×，但**投入资本相等**【事实】。TBL 框架的 **URPD IC** 按美元加权——结构意义判断应优先读 IC 版【分析】。

:::raw
<div class="tool">
<h3>工具 · 币数 vs 投入资本加权</h3>
<p>灰柱=币数加权 URPD，红柱=资本加权（示意）。峰值位移揭示「大量低价老币」与「美元风险集中」的差异。</p>
<div class="ctrl"><label>现货价 ($)<input type="range" id="urpd_ic_spot" min="50000" max="100000" step="500" value="77400"><output id="urpd_ic_spotO">$77,400</output></label></div>
<div class="readout">
<div class="ro"><span class="k">币数峰值桶</span><strong id="urpd_ic_cnt">—</strong><span id="urpd_ic_cnth">—</span></div>
<div class="ro"><span class="k">资本峰值桶</span><strong id="urpd_ic_ic">—</strong><span id="urpd_ic_ich">—</span></div>
<div class="ro"><span class="k">峰值位移</span><strong id="urpd_ic_shift">—</strong><span id="urpd_ic_shifth">—</span></div>
<canvas id="urpdICChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="urpd_ic_v">—</strong><span id="urpd_ic_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | URPD 领域 | 其他领域 |
|---|---|---|
| **分布 vs 均值** | URPD vs Realized Price | 收入分布 vs 人均收入 |
| **直方图峰值** | 成本簇 | 期权 Gamma 墙、成交量分布 |
| **薄区穿透** | 低供应柱 | 流动性真空、订单簿缺口 |
| **静态快照缺陷** | URPD 无时间轴 | CBD / 热力图补演化 |
| **实体归并** | Entity-adjusted URPD | 基金合并报表 vs 账户流水 |

# 系统运行机制

## 四阶段：筹码地图如何随周期变形

1. **熊市吸筹**：低价桶柱增高（$15–25K），现货在柱群下方或边缘
2. **复苏换手**：供应从低价桶**迁移**至 $40–55K，Realized Price 抬升
3. **牛市扩散**：新柱在现货附近形成；旧高价柱（$90K+）变「远期阻力」
4. **派发重定价**：高位换手增加 → 现货附近柱变厚 → 或跌破厚区进入薄区下跌

:::note amber URPD 是快照
每日收盘更新，但**不记录柱位如何移动过来**。要看演化，用 Glassnode **CBD（Cost Basis Distribution）** 热力图【事实】。
:::

# 时间演化

## 从 URPD 到 CBD：补上时间维

| 阶段 | 工具 | 能力 |
|---|---|---|
| 2020 | URPD 引入 | 空间分布快照 |
| 2023–24 | Entity-adjusted URPD | 剔除交易所噪声 |
| 2024+ | CBD 热力图 + Quantiles | 价格×时间演化【事实】 |

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">URPD 工具演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="100" cy="100" r="6" fill="#1d4ed8"/><text x="100" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2020</text><text x="100" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">URPD 发布</text>
  <circle cx="220" cy="100" r="6" fill="#b8730a"/><text x="220" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021</text><text x="220" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">$60K 厚柱</text>
  <circle cx="340" cy="100" r="6" fill="#d5342c"/><text x="340" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022</text><text x="340" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">低价吸筹峰</text>
  <circle cx="460" cy="100" r="6" fill="#0f8a4d"/><text x="460" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024</text><text x="460" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ETF 重定价</text>
  <circle cx="580" cy="100" r="6" fill="#1d4ed8"/><text x="580" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2025+</text><text x="580" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">CBD 普及</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">地图随换手迁移 · 旧价位不可死记</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 URPD 的影响 |
|---|---|---|
| **数据商** | 高级图表→订阅 | 推 Entity-adjusted / CBD 升级 |
| **多头 KOL** | 流量、带货 | 强调「上方薄区=无阻力」 |
| **空头 KOL** | 流量 | 强调「下方厚区=铁底」 |
| **ETF 发行商** | 规模 | 持续买盘迁入 $50–70K 桶 |
| **交易者** | Alpha | 公开厚区→被 front-run |

# 资源与信息流

## 成本基线「抽水」：从厚区到薄区

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">URPD 厚/薄区 · 资金流抽水图</text>
  <rect x="40" y="50" width="180" height="50" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="130" y="80" font-size="11" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">厚区 $53K · 11% 供应</text>
  <rect x="250" y="50" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="310" y="80" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货 $77K</text>
  <rect x="400" y="50" width="180" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="490" y="72" font-size="11" text-anchor="middle" fill="#1d4ed8" font-family="sans-serif">薄区 $70–78K</text>
  <text x="490" y="88" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">&lt;2% 供应 · 低吸收</text>
  <path d="M130 100 L130 140 L310 140 L310 100" stroke="#0f8a4d" stroke-width="1.5" fill="none" marker-end="url(#urD)"/>
  <path d="M310 100 L310 180 L490 180 L490 100" stroke="#1d4ed8" stroke-width="1.5" fill="none" marker-end="url(#urE)"/>
  <rect x="200" y="200" width="280" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="340" y="228" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">薄区穿透 → 波动放大 → 换手重画 URPD</text>
  <text x="180" y="165" font-size="10" fill="#0f8a4d" font-family="sans-serif">吸收/托底</text>
  <text x="420" y="165" font-size="10" fill="#1d4ed8" font-family="sans-serif">加速/低阻力</text>
  <defs>
    <marker id="urD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
    <marker id="urE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/></marker>
  </defs>
</svg>
:::

**信息流**：全节点 → 索引（Glassnode）→ URPD API → KOL 截图 → 交易者预期 → 现货订单。**瓶颈**：实体聚类与交易所池化规则不公开，不同平台柱形可差 **10–30%**【假设】。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「厚区触及反弹胜率 62%」？先和<strong>随机持币基准</strong>比——默认持有 <strong>20 日</strong>、μ=50%、σ=65%。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="urpd_T" min="5" max="180" step="5" value="20"><output id="urpd_TO">20 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="urpd_ps" min="50" max="80" step="0.1" value="62.0"><output id="urpd_psO">62.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="urpd_mu" min="0" max="100" step="1" value="50"><output id="urpd_muO">50%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="urpd_sg" min="30" max="100" step="1" value="65"><output id="urpd_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="urpd_base">58.6%</strong><span id="urpd_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="urpd_dp">+3.4 pp</strong><span id="urpd_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="urpd_n">1632</strong><span id="urpd_nh">—</span></div>
<canvas id="urpdDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="urpd_dv">超额有限</strong><span id="urpd_dvh">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **分清地图与预测** | URPD 标厚/薄，不标顶底 |
| 2 | **选对透镜** | 全史用 ATH 桶；近端用 ±2% 桶 |
| 3 | **读 IC 加权版** | 结构意义看美元，不看币数 |
| 4 | **行为确认** | SOPR≈1 + 实现盈亏判吸收/派发 |
| 5 | **配 MVRV/RP** | 标量 + 分布 = 完整成本视图 |
| 6 | **漂移剥离胜率** | 任何「支撑有效」先减基准 |
| 7 | **实体调整** | 交易所池化会伪造柱位 |
| 8 | **CBD 补时间** | 看柱位迁移，不看单日快照 |
| 9 | **写厚/薄清单** | 每周更新 3 厚 + 2 薄 |
| 10 | **30 分钟三联检** | 标、证、比——§22 |

# 常见认知陷阱

:::details 1. 「URPD 预测支撑阻力」
**错因**：柱高只说明成本集中，不保证反应。【事实】Glassnode 与 The Markets Unplugged 均强调须行为确认。**对策**：配 aSOPR。
:::

:::details 2. 「上方薄 = 必涨到下一厚区」
**错因**：薄区低吸收≠单向上涨；亦可快速下跌【分析】。**对策**：看趋势与宏观流动性。
:::

:::details 3. 「$82K 无阻力」断章取义
**错因**：2025 年 Ali Martinez 基于**当时** URPD 快照【待验证】——地图每日变。**对策**：标注数据日期。
:::

:::details 4. 把 URPD 当领先指标
**错因**：柱位由历史换手决定，是 lagging 结构。**对策**：配 ETF 流、价格结构。
:::

:::details 5. 忽视实体调整
**错因**：交易所冷钱包内部划转制造假柱【分析】。**对策**：读 Entity-adjusted URPD。
:::

:::details 6. 只用币数版忽略 IC
**错因**：低价 Satoshi 币抬高远端柱【推论】。**对策**：§07 IC 工具对照。
:::

:::details 7. 死守旧周期价位
**错因**：2022 厚区在 $15–25K，2026 重心移至 $50K+【推论】。**对策**：每季重标清单。
:::

:::details 8. 混淆 URPD 与成交量分布
**错因**：URPD 是**存量**成本，不是成交量【事实】。**对策**：理解 UTXO 语义。
:::

:::details 9. 单指标 All-in
**错因**：公开厚区被 trade against。**对策**：≥3 独立信号。
:::

:::details 10. 胜率不算漂移
**错因**：20 日随机做多基准 **58.6%**。**对策**：§12 漂移剥离器。
:::

:::details 11. 忽视 CBD 时间维
**错因**：URPD 无法看柱位演化【事实】。**对策**：热力图跟踪迁移。
:::

:::details 12. ATH 桶近端分辨率不足
**错因**：ATH=$126K 时桶宽仅 **$1,260**【推论】——现货附近细节模糊。**对策**：切换 % 分桶。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 成本簇 | 「很多人在 $53K 买过」 | URPD $53K 柱 ~11%【示意】 |
| 薄区通道 | 「$74K  rejection 可能虚」 | $70–78K 柱 <2%【推论】 |
| 厚垫 | 熊市抄底区 | $45–55K 多柱叠加 |
| 远期阻力 | 2021 顶买家 | $90–100K 残余柱 |

# 从理论到行动

**决策漏斗**（自上而下）：

1. **宏观**：流动性与风险偏好方向？
2. **标量**：MVRV、Realized Price、STH/LTH RP 位置？
3. **分布**：URPD 厚/薄区清单（ATH + % 双透镜）？
4. **行为**：触及厚/薄区时 aSOPR、实现盈亏方向？
5. **执行**：仓位匹配结构尺度——非见柱就动

# 技能树

:::details L1 · 观察者
- [ ] 解释 URPD 横纵轴含义
- [ ] 区分 ATH 桶 vs % 桶
- [ ] 说出厚区/薄区定义
:::

:::details L2 · 分析师
- [ ] 标 3 个厚区 + 2 个薄区
- [ ] 对照 MVRV 与 URPD 重心
- [ ] 用 §12 剥离 62% 胜率
:::

:::details L3 · 建模者
- [ ] 对比 Raw vs Entity-adjusted
- [ ] 读 URPD IC 峰值位移
- [ ] 配 CBD 热力图看迁移
:::

:::details L4 · 系统设计者
- [ ] 多信号投票（URPD+SOPR+ETF）
- [ ] 每周自动更新厚/薄清单
- [ ] 季度回测「支撑触及」超额
:::

# 游戏化世界

**角色**：成本地图测绘员（Cost Cartographer）。等级越高，越不信「无阻力」口号，越会追行为确认。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手画简化 URPD 五柱 | 解锁「分桶层」 |
| Lv.2 | 向朋友解释厚≠预测 | 解锁「地图工具」 |
| Lv.3 | 算出 20 日真实超额 <4pp | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周更新厚/薄清单 | 解锁「IC 加权」 |
| Lv.5 | 写一页「URPD 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘价 | 7 日表 |
| 每周 | 更新 URPD 厚/薄清单 | §06 工具截图 |
| 每月 | 读一篇 URPD/CBD 研报 | 3 行摘要 |
| 每季 | ATH 与 % 双透镜对照 | 差异 <2 个厚区 |
| 每年 | 记录周期柱位迁移 | 与 §10 对照 |

# 反事实模拟

:::tabs
@@情景 A · 若 URPD 真能预测顶底
每次触及厚区应 100% 反弹。实际 2022 $20K 厚区仍跌破再磨底数月——**预测失败，反应概率成立**。

@@情景 B · 若无 ETF 买盘重定价
$50–70K 柱应更薄，现货上方阻力更近。ETF 持续换手**抬高中间桶**【推论】——反事实支持读 Entity-adjusted。

@@情景 C · 若只用 ATH 分桶
现货 $77K 附近细节被 $1,260 桶宽平滑。切换 **±2% 分桶**后局部薄区才可见【事实】——双透镜必要。

@@情景 D · 若有 CBD 时间维
可看到 2024 吸筹如何从 $28K 桶**迁移**至 $55K——URPD 单日快照无法讲述此故事【事实】。
:::

:::raw
<div class="tool">
<h3>工具 · 分桶透镜</h3>
<p>同一现货下，<strong>ATH 分桶</strong>与<strong>±2% 百分比分桶</strong>的分辨率差异。默认现货 <strong>$77,400</strong>、ATH <strong>$126,000</strong>。</p>
<div class="ctrl"><label>现货价 ($)<input type="range" id="urpd_part_spot" min="50000" max="110000" step="500" value="77400"><output id="urpd_part_spotO">$77,400</output></label></div>
<div class="ctrl"><label>ATH ($)<input type="range" id="urpd_part_ath" min="100000" max="140000" step="500" value="126000"><output id="urpd_part_athO">$126,000</output></label></div>
<div class="readout">
<div class="ro"><span class="k">ATH 桶宽</span><strong id="urpd_part_athW">$1,260</strong><span id="urpd_part_athWh">—</span></div>
<div class="ro"><span class="k">% 桶宽 (±2%)</span><strong id="urpd_part_pctW">$1,548</strong><span id="urpd_part_pctWh">—</span></div>
<div class="ro"><span class="k">放大倍数</span><strong id="urpd_part_near">1.23×</strong><span id="urpd_part_nearh">—</span></div>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="urpd_part_v">用 % 分区看近端</strong><span id="urpd_part_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会读图** | 3 天 | 轴、桶、厚/薄 | 口答 URPD 定义 |
| **L2 会标区** | 1 周 | 双透镜 + 清单 | 漂移剥离器实操 |
| **L3 会证伪** | 2 周 | SOPR + IC + Entity | 触及厚区行为记录 |
| **L4 会迭代** | 1 月+ | URPD+CBD 系统 | 连续 2 月清单 |

# 30 分钟最小实践

**任务**：完成「URPD 三联检」——标、证、比。

1. **8 分钟 · 标厚/薄**：§06 地图工具，现货 $77,400 → 下方厚支撑 **$45–53K**，上方厚阻力 **$85–95K**，薄区 **$70–78K**。
2. **7 分钟 · 选透镜**：§20 分桶工具，ATH 桶宽 **$1,260** vs % 桶宽 **$1,548**（1.23× 近端放大）。
3. **8 分钟 · 比漂移**：§12 工具，20 日 62% 胜率 → 基准 **58.6%**，真实超额 **+3.4 pp**，需 **n≈1632**。
4. **7 分钟 · 证行为**：写三句话——(a) 下一厚区在哪 (b) 最近薄区含义 (c) 须看什么行为指标。**禁止写「必涨到 $82K」。**

**验证**：下方供应占比与 §06 默认读数误差 **<0.5 pp**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Glassnode URPD 指南 |
| D2 | 分桶 | ATH vs % 各截一张图 |
| D3 | 批评 | BIS 链上精度 + URPD 局限 |
| D4 | 工具 | §06–§20 四个交互模型 |
| D5 | 对照 | URPD vs MVRV vs HODL Waves |
| D6 | 行为 | 记录 aSOPR 与厚区触及 |
| D7 | 合成 | 1 页「URPD 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：URPD 定义 + 分桶 + 手标厚/薄（L1）
**Week 2**：IC 加权 + 漂移剥离 + Entity-adjusted（L2）
**Week 3**：SOPR 配证 + CBD 热力图入门（L3）
**Week 4**：个人厚/薄清单 + 季度迁移 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **URPD 直方图** | 按转移价分桶的供应分布 | 非预测 |
| 2 | **ATH 分桶** | 0→ATH 均分 100 桶 | 近端分辨率粗 |
| 3 | **% 分桶** | ±2%×100 近端放大 | 失全史视野 |
| 4 | **厚/薄区** | 高柱=反应带 | 后验叙事 |
| 5 | **Entity-adjusted** | 剔交易所噪声 | 聚类启发式 |
| 6 | **URPD IC** | 资本加权峰值 | 与币数版混淆 |
| 7 | **CBD 热力图** | 价格×时间演化 | 学习成本高 |
| 8 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 9 | **SOPR 确认** | 吸收 vs 派发 | 单独也不足 |
| 10 | **MVRV+URPD** | 标量+分布 | 重复计价格 |

# 关键问题清单

:::details 链上结构
- 现货在哪几个桶之间？
- 最近下方厚区供应占比？
- ATH vs % 透镜厚区是否一致？
:::

:::details 行为确认
- 触及厚区时 aSOPR 是否 ≈1？
- 实现盈亏净正还是净负？
- ETF 7 日净流入方向？
:::

:::details 方法边界
- 是否读了 Entity-adjusted 版？
- IC 峰值是否位移？
- CBD 是否显示柱位迁移？
:::

:::details 决策
- 信号胜率是否扣过漂移？
- 样本量是否够？
- 是否 ≥3 信号一致？
:::

# 下一阶段探索

1. **CBD Quantiles 自动化**：100 分位线密集区能否替代手工读 URPD？
2. **URPD + 期权 Gamma**：链上厚区与 Deribit 墙是否共振？【假设】
3. **STH/LTH 分层 URPD**：Glassnode Entity URPD by holder duration 的领先性检验
4. **ETH URPD 可比性**：账户链分桶与 UTXO 分桶差异
5. **机器学习厚区触及**：特征=柱高+斜率+SOPR，标签=5 日收益——超额是否 >3pp？

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| URPD 定义与公式 | 指标文档 | Glassnode Docs, Apr 2020 | 【事实】 |
| ATH / % 分桶规则 | 指标文档 | Glassnode Studio | 【事实】 |
| Entity-adjusted URPD | 研报 | Glassnode Finance Bridge #3 | 【分析】 |
| CBD 演进 | 研报 | Glassnode「Investor Cost Basis」2024 | 【事实】 |
| URPD IC 加权 | 行业框架 | The Bitcoin Layer | 【分析】 |
| 2026-09 现货/RP | 数据站 | MacroMicro / Glassnode | 【待验证】 |
| $82K 薄阻力叙事 | 媒体 | TradingView/NewsBTC 引 Ali Martinez | 【待验证】 |
| 支撑≠预测 | 教程 | The Markets Unplugged | 【分析】 |
| BIS 链上精度批评 | 央行研究 | BIS 工作论文 | 【分析】 |
| HODL vs Realized Cap Waves | 指标文档 | Glassnode Docs | 【事实】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；URPD 及任何链上成本分布均**不保证**未来价格路径。厚区/薄区读法描述的是**历史筹码结构**，须与行为指标及宏观流动性交叉验证。历史价位（如 $15K 铁底、$82K 无阻力）随换手**持续迁移**，请勿依据单一快照进行杠杆交易。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
