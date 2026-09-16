---
slug: BTC-市时模型（Cointime Framework）
title: BTC-市时模型（Cointime Framework）
subtitle: 用<strong>coinblock 时间权重</strong>重建 BTC 供应经济学——AVIV 比 MVRV 更贴近「活供应」成本基线，但 2.5/0.55 阈仍缺样本外验证
brand_sub: Bitcoin × Cointime Economics × On-Chain
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, Cointime, AVIV, Liveliness, Glassnode, ARK Invest]
theme_js_file: BTC-市时模型（Cointime Framework）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**Cointime Economics（市时经济学）** 用 **coinblock**（1 BTC × 1 区块高度）替代「每枚 UTXO 等权」，把供应切成 **Active（活跃）** 与 **Vaulted（封存）** 两区【事实】。核心市时指标 **AVIV**（Active-Value-to-Investor-Value）= 活跃市值 ÷ 投资者市值，长期均值约 **1.0**——读法类似 MVRV，但分母是 **Investor Cap**（Realized Cap 减 Thermo Cap），分子只计 **Liveliness × 供应** 的经济活跃部分【事实】。

2026-09 Glassnode 读数 AVIV **~0.84**、Liveliness **~0.64**【待验证】——活跃投资者整体略亏，与 MVRV **~1.50**（全网仍盈利）形成对照：**休眠/丢失币抬高了传统 MVRV 的「虚假繁荣」**【推论】。白皮书建议顶区 **>2.5**、底区 **<0.55**【待验证】——仅 3–4 个周期样本，须当概率区间而非硬开关。

# 这个领域到底是什么

## 一句话定位

「BTC-市时模型」研究的是：**如何用 block-height 时间权重（而非 UTXO 等权）分割 BTC 供应、重建成本基线与估值偏离，并据此做周期定位**。2022–2023 年由 **ARK Invest（David Puell）** 与 **Glassnode（James Check）** 联合发布白皮书【事实】；Tamás Blummer 2018 年的 **Liveliness** 是其数学基石【事实】。

:::note red 先划清边界
本手册**不提供**「AVIV 到 X 就买卖」的信号。Cointime 框架改善的是**供应分割与成本基线估计**；何时变现仍取决于流动性、宏观与行为，不是一条静态阈值线。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | coinblock 框架、Liveliness/Vaultedness、AVIV、True Market Mean Price |
| 2 | 边界在哪 | 不含订单簿微观；不预测监管；不替代现货技术分析 |
| 3 | 核心对象 | Coinblocks Created/Destroyed/Stored、Active Supply、Investor Cap |
| 4 | 参与者 | Puell/Check、Blummer、Glassnode、ARK、批评者（Ledger School 等） |
| 5 | 关键变量 | Liveliness、AVIV、TMMP、Cointime Price、Cointime NVT/RVT |
| 6 | 可观察的 | Glassnode Cointime 面板、链上原始序列（blockheight、CBD、CBC） |
| 7 | 不可观察但可推断 | 真正丢失 vs 长期囤币、OTC 真实成本 |
| 8 | 谁影响谁 | 老币移动→Liveliness↑→Active Cap 结构变→AVIV 重估 |
| 9 | 因果 | 链上转移销毁 coinblock = 【事实】；AVIV 顶→价跌 = 【推论】 |
| 10 | 只是相关 | AVIV 分子含现价，与价格机械共线 |
| 11 | 表层现象 | 「AVIV 比 MVRV 更准」营销话术 |
| 12 | 底层机制 | 时间权重供应分割 + 投资者成本基线 + 均值回归叙事 |
| 13 | 反馈 | 高 AVIV→获利抛压→价格回落→AVIV 下行 |
| 14 | 时间延迟 | Investor Cap 仅随链上转移慢变；Liveliness 近单调 |
| 15 | 正负反馈 | 正：盈利扩张→FOMO；负：<1 capitulation→抄底叙事 |

## 核心公式速查

| 指标 | 公式 | 含义 |
|---|---|---|
| **Coinblock** | 1 BTC × 1 区块 | 最小时间-价值单位【事实】 |
| **Liveliness** | Σ销毁 coinblocks ÷ Σ创建 coinblocks | 网络「活跃度」，0–1 渐近【事实】 |
| **Vaultedness** | 1 − Liveliness | 封存供应占比【事实】 |
| **Active Supply** | Liveliness × 流通供应 | 经济活跃供应【事实】 |
| **Active Cap** | 市值 × Liveliness | 活跃部分美元估值【事实】 |
| **Investor Cap** | Realized Cap − Thermo Cap | 二级市场投资者成本基线【事实】 |
| **TMMP** | Investor Cap ÷ Active Supply | True Market Mean Price【事实】 |
| **AVIV** | Active Cap ÷ Investor Cap = 现价 ÷ TMMP | True Market Deviation【事实】 |
| **Cointime Price** | cumsum(Price×CBD) ÷ cumsum(Stored) | Blummer Price，UTXO Realized 的市时版【事实】 |

# 为什么值得研究

## 理由一：MVRV 的「已知缺陷」有了系统化补丁

传统 Realized Price 把丢失币、创世块、深度冷存储与昨日换手**等权计入**【分析】——Puell/Check 论证这会**低估**活跃投资者真实成本基线，并**掩盖**熊市未实现亏损【事实】。Cointime 用同一套最小输入（blockheight、CBD、流通供应、现价）即可派生整套指标，计算比逐 UTXO 遍历轻量【事实】。

## 理由二：AVIV 的均值回归叙事比「地板模型」更对称

批评者指出 Cointime Price（Blummer Price）更像**下限锚**而非双向公允价【分析】；AVIV 围绕 **1.0** 振荡，顶 **>2.5**、底 **<0.55** 双侧区间【待验证】——比「价格不应长期低于 Cointime Price」的单边假设更保守【分析】。

## 理由三：2024–2026 是 live test 窗口

2024 年 12 月 AVIV 曾升至历史过热关联区【待验证】；2026-09 回落至 **~0.84**【待验证】——与 MVRV **~1.50** 并存说明：**全供应仍盈利，但活跃 cohort 已略亏**。学会同时读两套指标，才能识别「休眠币扭曲」。

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「AVIV<0.55 买 75% 胜率」真实超额 |
|---|---|---|---|
| 90 日 | — | **67.7%** | 表面 +7.3 pp → 真实 **+7.3 pp**（仍需 n≈**309**） |
| 180 日 | — | **74.2%** | 表面 +5 pp → 真实 **~+5 pp** |

**任何 AVIV 底买顶卖都要和对照基准比**——BTC 有正漂移，基准不是 50%。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 coinblock 原语，到 AVIV 市时仪表盘

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">Cointime Framework · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「链上硬数据」，越靠下越「阈值/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 区块时间层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">block-height 替代不规则时间戳 · coinblock 原语</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：非真实时钟，是建模选择</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② Coinblock 流层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">Created / Destroyed / Stored · 三态守恒</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">老币移动 → 大量 CBD → 经济权重大</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 供应分割层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">Liveliness 0.64 · Vaultedness 0.36【待验证】</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">Vaulted 含丢失币+冷存储——非可观测分类</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 投资者成本层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">Investor Cap = Realized Cap − Thermo Cap</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">剔除矿工发行收入，隔离二级市场成本</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 公允价层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">TMMP · Cointime Price（Blummer Price）</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">Realized Price 的市时加权修正版</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ AVIV 偏离层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">Active Cap ÷ Investor Cap · 均值≈1.0</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">顶 2.5 / 底 0.55【待验证】· 样本外未验证</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 吞吐估值层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">Cointime NVT/RVT · 90 日 CBD 平滑</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">传统 NVT 的市时修正，波动更稳【分析】</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「比 MVRV 更准」· Glassnode 付费图表</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：无正式 head-to-head 回测【分析】</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">AVIV 当周期仪表盘 + MVRV 交叉验证</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">概率读法 · 漂移剥离 · 多信号</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">Cointime 概念 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 时间即经济权重</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 活跃/封存二分</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 均值回归</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 供应经济学</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• coinblock 销毁/存储</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• Liveliness 分割供应</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• Investor Cap 成本基线</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• AVIV 振荡围绕 1</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 读 Glassnode AVIV</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 对照 MVRV 差分</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 盯 Liveliness 趋势</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#ctA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#ctA)"/>
  <defs><marker id="ctA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与 Cointime 的关系 |
|---|---|---|
| **David Puell (ARK)** | 链上分析师、白皮书主笔 | 框架共创者；2021 提出 Investor Cap【事实】 |
| **James Check (Glassnode)** | Lead Analyst | 技术实现、Version II 专版白皮书【事实】 |
| **Tamás Blummer** | Liveliness 发明者 (2018) | Cointime Price 以「Blummer Price」纪念【事实】 |
| **Glassnode** | 数据基础设施 | Cointime 图表套件、API【事实】 |
| **ARK Invest** | 发布方、BTC 方向性持仓 | 商业利益→读者应保持怀疑【分析】 |
| **批评者 (Ledger School 等)** | 方法论审计 | 指出样本外未验证、无正式 MVRV 对照【分析】 |
| **Dilutionproof 等社区** | 深度书评 | AVIV 比 Cointime Price 叙事更对称【分析】 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **Liveliness** | CBD 累计 ÷ CBC 累计 | **0.639** |
| **Vaultedness** | 1 − Liveliness | **0.361** |
| **Active Supply** | Liveliness × ~19.8M | **~12.7M BTC** |
| **Investor Cap** | Realized Cap − Thermo Cap | **~$1.02T** |
| **Active Cap** | 市值 × Liveliness | **~$0.86T** |
| **AVIV** | Active Cap ÷ Investor Cap | **0.84** |
| **TMMP** | Investor Cap ÷ Active Supply | **~$80,300** |
| **MVRV（对照）** | 市值 ÷ Realized Cap | **~1.50** |

:::raw
<div class="tool">
<h3>工具 · AVIV 比值计算器</h3>
<p>手算 <strong>AVIV = Active Cap ÷ Investor Cap</strong>，并推导 True Market Mean Price。</p>
<div class="ctrl"><label>市值 ($T)<input type="range" id="ct_mcap" min="0.8" max="2.5" step="0.001" value="1.340"><output id="ct_mcapO">$1.34T</output></label></div>
<div class="ctrl"><label>Liveliness<input type="range" id="ct_liv" min="0.50" max="0.75" step="0.001" value="0.639"><output id="ct_livO">63.9%</output></label></div>
<div class="ctrl"><label>Investor Cap ($T)<input type="range" id="ct_inv" min="0.6" max="1.5" step="0.001" value="1.020"><output id="ct_invO">$1.02T</output></label></div>
<div class="readout">
<div class="ro"><span class="k">AVIV</span><strong id="ct_aviv">0.84</strong><span id="ct_avivh">—</span></div>
<div class="ro"><span class="k">TMMP</span><strong id="ct_tmmp">$80,618</strong><span id="ct_tmmph">—</span></div>
<div class="ro"><span class="k">活跃投资者盈亏</span><strong id="ct_profit">-16.1%</strong><span id="ct_profith">—</span></div>
<canvas id="ctAvivChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ct_aviv_v">折价区</strong><span id="ct_aviv_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">Cointime 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="20" y="50" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="75" y="78" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">链上转移</text>
  <rect x="160" y="50" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="215" y="78" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">Coinblocks Destroyed</text>
  <rect x="300" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="355" y="78" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">Liveliness ↑</text>
  <rect x="440" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="495" y="78" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">Active Cap 结构</text>
  <rect x="560" y="50" width="100" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="610" y="78" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">AVIV</text>
  <rect x="160" y="150" width="130" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="225" y="170" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">Investor Cap</text>
  <text x="225" y="186" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(Realized−Thermo)</text>
  <rect x="340" y="150" width="120" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="400" y="178" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">TMMP</text>
  <rect x="200" y="250" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="270" y="270" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">抛压/抄底</text>
  <text x="270" y="286" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(AVIV 极端激励)</text>
  <path d="M130 72 L160 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#ctB)"/>
  <path d="M270 72 L300 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#ctB)"/>
  <path d="M410 72 L440 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#ctB)"/>
  <path d="M550 72 L560 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#ctB)"/>
  <path d="M215 94 L225 150" stroke="#454c56" stroke-width="1.5" marker-end="url(#ctB)"/>
  <path d="M290 172 L340 172" stroke="#454c56" stroke-width="1.5" marker-end="url(#ctB)"/>
  <path d="M400 150 L400 94 L495 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#ctB)"/>
  <path d="M610 94 L610 250 L340 250" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#ctC)"/>
  <path d="M270 250 L355 94" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#ctC)"/>
  <defs>
    <marker id="ctB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="ctC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：链上转移同时推高 Liveliness（老币移动权重更大）与 Investor Cap（重定价成本基线）——两条路径对 AVIV 的拉动**方向不定**。红色反馈：AVIV 极端 → 行为响应 → 价格与转移模式改变。

# 隐藏关系

## 隐藏关系一：AVIV 与 MVRV 的「剪刀差」

当 MVRV **>1** 而 AVIV **<1**（如 2026-09 的 1.50 vs 0.84）时，说明**休眠/丢失供应中的未实现盈利**抬高了全网 MVRV，而**活跃投资者已整体亏损**【推论】。这是 Cointime 框架最有价值的读法——不是替代 MVRV，而是**解释分歧**。

:::raw
<div class="tool">
<h3>工具 · 活跃度与供应分割器</h3>
<p><strong>Liveliness</strong> 把流通供应切成 Active 与 Vaulted 两区（和为 100%）。</p>
<div class="ctrl"><label>Liveliness<input type="range" id="ct_liv2" min="0.50" max="0.75" step="0.001" value="0.639"><output id="ct_liv2O">0.639</output></label></div>
<div class="ctrl"><label>流通供应 (M BTC)<input type="range" id="ct_supply" min="19.0" max="21.0" step="0.01" value="19.80"><output id="ct_supplyO">19.8M BTC</output></label></div>
<div class="readout">
<div class="ro"><span class="k">Active Supply</span><strong id="ct_active_s">12.65M</strong><span>经济活跃</span></div>
<div class="ro"><span class="k">Vaulted Supply</span><strong id="ct_vault_s">7.15M</strong><span id="ct_vault_pct">36.1%</span></div>
<canvas id="ctLivChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ct_liv_v">中性区间</strong><span id="ct_liv_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系二：Vaulted ≠ 丢失

白皮书将 Vaulted 定义为封存供应，但**真正丢失的币与「十年未动的巨鲸」被归入同一桶**【分析】。Ledger School 批评：这是假设而非观测【分析】。Patient LTH 明天即可卖出——Active/Vaulted 分割是**经济先验**，不是链上标签。

## 隐藏关系三：跨域同构

| 结构 | Cointime 领域 | 其他领域 |
|---|---|---|
| **时间加权存量** | coinblock / Liveliness | 存货账龄、应收账款账龄 |
| **活跃/休眠二分** | Active vs Vaulted | 银行活期/定期、GPU 利用率 |
| **成本基线偏离** | AVIV 围绕 1 | MVRV、PB、信用利差 |
| **均值回归振荡器** | AVIV | VIX 分位、利率 Z-Score |
| **吞吐/估值比** | Cointime NVT | 传统 NVT、市盈率 |

:::raw
<div class="tool">
<h3>工具 · AVIV vs MVRV 对照器</h3>
<p>同一市值下，两套成本基线给出的<strong>偏离度差</strong>揭示休眠币扭曲。</p>
<div class="ctrl"><label>市值 ($T)<input type="range" id="ct_cmp_mcap" min="0.8" max="2.5" step="0.001" value="1.340"><output id="ct_cmp_mcapO">$1.34T</output></label></div>
<div class="ctrl"><label>Liveliness<input type="range" id="ct_cmp_liv" min="0.50" max="0.75" step="0.001" value="0.639"><output id="ct_cmp_livO">63.9%</output></label></div>
<div class="ctrl"><label>Realized Cap ($T)<input type="range" id="ct_cmp_rcap" min="0.5" max="1.5" step="0.001" value="0.893"><output id="ct_cmp_rcapO">$0.893T</output></label></div>
<div class="ctrl"><label>Investor Cap ($T)<input type="range" id="ct_cmp_inv" min="0.6" max="1.5" step="0.001" value="1.020"><output id="ct_cmp_invO">$1.02T</output></label></div>
<div class="readout">
<div class="ro"><span class="k">AVIV</span><strong id="ct_cmp_aviv">0.84</strong><span>市时偏离</span></div>
<div class="ro"><span class="k">MVRV</span><strong id="ct_cmp_mvrv">1.50</strong><span>UTXO 偏离</span></div>
<div class="ro"><span class="k">差分</span><strong id="ct_cmp_diff">+0.66</strong><span id="ct_cmp_diffh">—</span></div>
<canvas id="ctCmpChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ct_cmp_v">—</strong><span id="ct_cmp_vh">—</span></div>
</div>
</div>
:::

# 系统运行机制

## 四阶段循环（AVIV 视角）

1. **积累期**：Liveliness 缓降或横盘，Vaultedness 高，AVIV 从底部回升向 1.0
2. **扩张期**：价格升、Active Cap 扩，AVIV 突破 1.0 向 1.5+
3. **派发期**：老币移动→Liveliness spike，AVIV 冲 **>2.5** 参考区【待验证】，获利了结
4. **清算期**：AVIV **<1** 甚至 **<0.55**，活跃投资者整体亏损，抄底叙事

:::note amber Liveliness 的「慢」
Liveliness 是**累计比率**，近单调上升（2023 约 0.60 → 2026 约 0.64）【待验证】。跨年代直接比较 AVIV 绝对值会被结构性趋势污染——宜用**滚动分位**读法【分析】。
:::

# 时间演化

## 历史 AVIV 极端与周期对照

| 阶段 | 年月 | AVIV 区间【待验证】 | 备注 |
|---|---|---|---|
| 2013 顶 | Nov 2013 | >2.5 | 白皮书回溯 |
| 2017 顶 | Dec 2017 | >2.5 | 与 MVRV 顶共振 |
| 2021 顶 | Nov 2021 | ~2.0–2.5 | 低于 2017 极端 |
| 2022 底 | Nov 2022 | <0.55 | 熊市 capitulation |
| 2024 顶 | Dec 2024 | 逼近过热区 | 后回落 |
| 2026-09 | Sep 2026 | **~0.84** | 活跃 cohort 略亏 |

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">AVIV 周期演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#d5342c"/><text x="80" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2013</text><text x="80" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">>2.5</text>
  <circle cx="180" cy="100" r="6" fill="#d5342c"/><text x="180" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2017</text><text x="180" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">>2.5</text>
  <circle cx="300" cy="100" r="6" fill="#d5342c"/><text x="300" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021</text><text x="300" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">~2.3</text>
  <circle cx="380" cy="100" r="6" fill="#0f8a4d"/><text x="380" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022</text><text x="380" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif"><0.55</text>
  <circle cx="480" cy="100" r="6" fill="#b8730a"/><text x="480" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024</text><text x="480" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">过热</text>
  <circle cx="600" cy="100" r="6" fill="#1d4ed8"/><text x="600" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2026</text><text x="600" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">0.84</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">顶区阈值或下移 · Liveliness 结构性上升 · 须分位读法</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对 Cointime 的影响 |
|---|---|---|
| **Glassnode** | 高级图表订阅 | 推 Cointime 套件为 MVRV 升级版 |
| **ARK Invest** | BTC 敞口 + 研究品牌 | 白皮书信心与持仓方向一致【分析】 |
| **链上 KOL** | 流量 | 简化 AVIV 为买卖开关 |
| **批评者** | 方法论声誉 | 强调样本外未验证 |
| **长期囤币者** | 低换手 | 抬 Vaultedness、压低 Active Cap |

# 资源与信息流

## 活跃估值与投资者成本「抽水」

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">Active Cap vs Investor Cap（资金流抽水图）</text>
  <rect x="40" y="50" width="280" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="180" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">Active Cap ~$0.86T</text>
  <rect x="360" y="50" width="280" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="500" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">Investor Cap ~$1.02T</text>
  <text x="340" y="120" font-size="11" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">AVIV = 0.84 → 活跃部分折价 16%</text>
  <rect x="120" y="140" width="440" height="36" rx="6" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.2"/>
  <text x="340" y="163" font-size="11" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">Vaulted ~7.15M BTC（36%）不参与 Active Cap 分子</text>
  <path d="M180 100 L180 140" stroke="#1d4ed8" stroke-width="1.5" marker-end="url(#ctD)"/>
  <path d="M500 100 L500 140" stroke="#b8730a" stroke-width="1.5" marker-end="url(#ctE)"/>
  <rect x="240" y="200" width="200" height="40" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="340" y="225" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">现货流动性池 · 抛压/承接</text>
  <text x="100" y="175" font-size="10" fill="#1d4ed8" font-family="sans-serif">可交易估值</text>
  <text x="520" y="175" font-size="10" fill="#b8730a" font-family="sans-serif">投资者成本</text>
  <defs>
    <marker id="ctD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/></marker>
    <marker id="ctE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#b8730a"/></marker>
  </defs>
</svg>
:::

**信息流路径**：全节点 → 索引商（Glassnode）→ Cointime 面板/API → 研报/KOL → 交易者预期 → 现货/ETF 订单流。**瓶颈**：Thermo Cap、实体调整口径各平台略有差异【分析】。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「AVIV&lt;0.55 抄底胜率 75%」？先和<strong>随机持币基准</strong>比。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="ct_T" min="5" max="365" step="5" value="90"><output id="ct_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="ct_ps" min="50" max="90" step="0.1" value="75.0"><output id="ct_psO">75.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="ct_mu" min="0" max="100" step="1" value="50"><output id="ct_muO">50%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="ct_sg" min="30" max="100" step="1" value="65"><output id="ct_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="ct_base">67.7%</strong><span id="ct_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="ct_dp">+7.3 pp</strong><span id="ct_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="ct_n">309</strong><span id="ct_nh">—</span></div>
<canvas id="ctDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ct_drift_v">超额有限</strong><span id="ct_drift_vh">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **同时读 AVIV 与 MVRV** | 剪刀差揭示休眠币扭曲 |
| 2 | **用分位替代 2.5/0.55 绝对阈** | 样本仅 3–4 周期 |
| 3 | **理解 Vaulted 假设** | 丢失≠冷存储，勿当观测事实 |
| 4 | **盯 Liveliness 趋势** | 老币移动预警派发 |
| 5 | **读 TMMP 作成本线** | 比 Realized Price 更贴近活跃 cohort |
| 6 | **配 Cointime NVT** | 估值/吞吐背离侧证 |
| 7 | **漂移剥离胜率** | 任何底买叙事先减基准 |
| 8 | **样本量意识** | 7pp 超额需 n>300 |
| 9 | **读批评文献** | Ledger School / Dilutionproof |
| 10 | **30 分钟三联检** | 算、比、判——§22 |

# 常见认知陷阱

:::details 1. 「AVIV 比 MVRV 更准」已证明
**错因**：白皮书用「seems to」而非正式回测；无 head-to-head 误差指标【分析】。**对策**：当互补透镜，非替代。
:::

:::details 2. 「2.5 必顶 / 0.55 必底」
**错因**：阈值拟合全历史，无样本外检验【分析】。**对策**：滚动分位 + 概率读法。
:::

:::details 3. 「AVIV<1 = 立刻抄底」
**错因**：2022 年 <0.55 区域持续数月【待验证】。**对策**：区间不是时点。
:::

:::details 4. 忽视 Liveliness 结构性上升
**错因**：累计指标近单调，污染跨周期比较【分析】。**对策**：3 年滚动分位。
:::

:::details 5. 把 Vaulted 当「永久丢失」
**错因**：含可卖的长期持有者【分析】。**对策**：配 LTH 流出数据。
:::

:::details 6. 忽视 ARK 方向性利益
**错因**：发布方持有 BTC 敞口【分析】。**对策**：独立验证，读批评。
:::

:::details 7. 把 Cointime Price 当 AVIV
**错因**：前者偏地板锚，后者是双向振荡器【分析】。**对策**：分清指标族。
:::

:::details 8. 单指标 All-in
**错因**：公开指标被 trade against。**对策**：≥3 独立信号。
:::

:::details 9. 用 AVIV 做日内
**错因**：Investor Cap 日变化极慢。**对策**：周期尺度工具。
:::

:::details 10. 忽视 ETF 时代结构变迁
**错因**：机构流改变换手与成本基线【推论】。**对策**：配 ETF 净流入。
:::

:::details 11. 胜率不算漂移
**错因**：90 日随机做多基准 **67.7%**。**对策**：§12 漂移剥离器。
:::

:::details 12. 把白皮书免责声明当摆设
**错因**：全文 17 处「past performance」提示【事实】。**对策**：当真。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 经济活跃供应 | 真正参与定价的 BTC | Active Supply ~12.7M |
| 投资者成本基线 | 二级市场买入均价 | TMMP ~$80.3K |
| 估值偏离 | 贵/便宜讨论 | AVIV 0.84 = 活跃 cohort 折价 |
| 老币移动 | 派发预警 | Liveliness spike + CDD |

# 从理论到行动

**决策漏斗**（自上而下）：

1. **宏观**：流动性周期方向？
2. **链上**：AVIV 处于历史分位？与 MVRV 剪刀差方向？
3. **结构**：Liveliness 趋势、Vaulted 是否异常？
4. **确认**：ETF 流、Cointime NVT、价格结构同向？
5. **执行**：仓位匹配周期尺度——非阈值一碰就动

# 技能树

:::details L1 · 观察者
- [ ] 解释 coinblock 与 Liveliness 定义
- [ ] 手算 AVIV = 0.86÷1.02 ≈ 0.84
- [ ] 说出 AVIV=1 的含义
:::

:::details L2 · 分析师
- [ ] 对照 AVIV 与 MVRV 剪刀差
- [ ] 复述 2.5/0.55 样本外批评
- [ ] 用 §12 剥离 75% 胜率
:::

:::details L3 · 建模者
- [ ] 建 AVIV 3 年分位仪表盘
- [ ] 读 Cointime NVT 与经典 NVT 差
- [ ] 写 Liveliness+CDD 辅助规则
:::

:::details L4 · 系统设计者
- [ ] 多信号投票（AVIV+MVRV+ETF）
- [ ] 每周期记录 AVIV 峰谷
- [ ] 季度回测阈值漂移
:::

# 游戏化世界

**角色**：市时审计员（Cointime Auditor）。等级越高，越不信「更准」营销，越会看剪刀差。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 AVIV 误差 <2% | 解锁「coinblock 层」 |
| Lv.2 | 向朋友解释 Vaulted 假设 | 解锁「供应分割器」 |
| Lv.3 | 算出 90 日真实超额 | 解锁「漂移剥离器」 |
| Lv.4 | 连续 4 周记录 AVIV+MVRV | 解锁「对照器」 |
| Lv.5 | 写一页「Cointime 不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘价 | 7 日表 |
| 每周 | 更新 AVIV & Liveliness | Glassnode 截图 |
| 每月 | 读一篇 Cointime 批评/辩护 | 3 行摘要 |
| 每季 | 核对 TMMP 与手算 | 误差 <3% |
| 每年 | 记录周期 AVIV 峰谷 | 与 §10 表对照 |

# 反事实模拟

:::tabs
@@情景 A · 若 AVIV 2.5 顶阈仍有效
2024-12 应触 2.5 后暴跌。实际仅「逼近过热」后回落【待验证】——**顶阈可能已下移**。

@@情景 B · 若无 Cointime 框架
分析师仍用 MVRV 1.50 判断「温和盈利」，**看不到活跃 cohort 已亏损**——反事实支持保留 AVIV 作第二透镜。

@@情景 C · 若 Vaulted 全为丢失币
AVIV 分母更小、读数更高——**当前 0.84 可能低估风险**【假设】。

@@情景 D · 若只用 Cointime Price 地板
单边「不破 Blummer Price」假设在熊市可能过早乐观【分析】——AVIV 双侧区间更保守。
:::

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会算 AVIV** | 3 天 | Active/Investor Cap、TMMP | 口算 0.84 |
| **L2 会读剪刀差** | 1 周 | AVIV vs MVRV 叙事 | 对照器实操 |
| **L3 会修偏差** | 2 周 | 分位阈 + Liveliness 趋势 | 3 年窗口 |
| **L4 会迭代系统** | 1 月+ | 多信号 + 季度校准 | 连续 2 月无口诀交易 |

# 30 分钟最小实践

**任务**：完成「Cointime 三联检」——算、比、判。

1. **8 分钟 · 手算 AVIV**：Active Cap $1.34T×0.639 = **$0.856T** ÷ Investor Cap $1.02T = **0.84**。
2. **7 分钟 · 剪刀差**：§08 对照器，MVRV **1.50** − AVIV **0.84** = **+0.66**——休眠币抬升 MVRV。
3. **8 分钟 · 漂移剥离**：§12 工具，90 日 75% 胜率 → 真实超额 **+7.3 pp**，需 **n≈309**。
4. **7 分钟 · 结论**：写三句话——(a) 当前 AVIV 区间 (b) 与 MVRV 分歧含义 (c) 2.5/0.55 是否仍适用。**禁止写「AVIV 更准所以必涨」。**

**验证**：AVIV 与 §06 默认读数误差 **<0.02**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 ARK 白皮书摘要 + Glassnode 导论 |
| D2 | 手算 | Active/Investor Cap、TMMP、AVIV |
| D3 | 批评 | Ledger School + Dilutionproof 各 3 条 |
| D4 | 工具 | §06–§12 四个交互模型 |
| D5 | 历史 | 对照 2017/2021/2022/2024 AVIV 峰谷 |
| D6 | 交叉 | 同屏读 AVIV + MVRV + ETF 流 |
| D7 | 合成 | 1 页「Cointime 能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：coinblock + Liveliness + AVIV 手算（L1）
**Week 2**：剪刀差 + 样本外批评 + 漂移剥离（L2）
**Week 3**：分位阈 + Cointime NVT + Liveliness 趋势（L3）
**Week 4**：个人 AVIV 仪表盘 + 季度校准 habit（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **Coinblock** | 1 BTC × 1 区块 | 非真实时钟 |
| 2 | **Liveliness** | 销毁/创建累计比 | 近单调上升 |
| 3 | **Vaultedness** | 1 − Liveliness | 丢失≠冷存储 |
| 4 | **Investor Cap** | Realized − Thermo | 口径平台差异 |
| 5 | **TMMP** | Inv Cap ÷ Active Supply | 慢变量 |
| 6 | **AVIV** | Active Cap ÷ Inv Cap | 样本外未验证 |
| 7 | **Cointime Price** | Blummer Price | 偏地板锚 |
| 8 | **Cointime NVT** | Active Cap ÷ CBD 吞吐 | 与经典 NVT 并存 |
| 9 | **AVIV−MVRV 剪刀差** | 休眠币扭曲探测器 | 需双指标 |
| 10 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |

# 关键问题清单

:::details 链上
- 当前 AVIV？Liveliness？TMMP？
- AVIV 与 MVRV 差多少？
- Cointime NVT 方向？
:::

:::details 阈值
- 本周期 AVIV 峰是多少？
- 2.5/0.55 是否仍合理？
- 3 年分位处于何位置？
:::

:::details 宏观
- ETF 7 日净流入？
- 全球流动性方向？
- 老币移动（CDD）是否 spike？
:::

:::details 决策
- 信号胜率是否扣过漂移？
- 样本量是否够？
- 是否 ≥3 信号一致？
:::

# 下一阶段探索

1. **AVIV 分位 + ETF 流**：2026 AVIV<1 与 ETF 净流入能否共振见底？【假设】
2. **正式 head-to-head**：AVIV vs MVRV vs Adjusted-MVRV 样本外误差——社区尚未完成【待验证】
3. **ETH/LTC 案例**：白皮书已做跨资产，BTC 阈值能否迁移？【假设】
4. **Liveliness 二阶导**：增速而非绝对值，能否领先 AVIV 转折？【假设】
5. **Thermo Cap 敏感性**：矿工收入口径变化对 Investor Cap 的冲击

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| Cointime 框架定义 | 白皮书 | ARK×Glassnode 2023 | 【事实】 |
| AVIV / TMMP 公式 | 指标文档 | Glassnode Studio | 【事实】 |
| Liveliness 原创 | 博客/代码 | Tamás Blummer 2018 | 【事实】 |
| 2.5/0.55 阈 | 白皮书/评论 | ARK 白皮书 / Ledger School | 【待验证】 |
| 2026-09 AVIV ~0.84 | 数据平台 | Glassnode indicators.Aviv | 【待验证】 |
| 2026 Liveliness ~0.639 | 数据平台 | Glassnode Liveliness | 【待验证】 |
| 样本外未验证批评 | 评论 | Ledger School 2025 | 【分析】 |
| Dilutionproof 书评 | 社区 | Medium 2023 | 【分析】 |
| 2024-12 AVIV 过热 | 媒体 | CryptoRank 2024 | 【待验证】 |
| Investor Cap 定义 | 白皮书 | Puell ARK 2021 | 【事实】 |
| blocktime vs clocktime | 评论 | Patrick47f Substack | 【分析】 |
| 17 处免责声明 | 白皮书 | ARK PDF 原文 | 【事实】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；AVIV、Liveliness 及任何链上阈值均**不保证**未来价格路径。Cointime Economics 白皮书明确提示该框架在发布时**尚未被广泛采用**，2.5/0.55 等阈值**未经样本外验证**，请勿依据单一指标进行杠杆交易或集中配置。ARK Invest 在发布时持有比特币相关敞口，读者应独立判断。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
