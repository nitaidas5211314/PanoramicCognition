---
slug: BTC-恐惧贪婪指数与资金费率
title: BTC-恐惧贪婪指数与资金费率
subtitle: 恐惧贪婪指数是<strong>滞后情绪温度计</strong>，资金费率是<strong>杠杆拥挤税</strong>——两者共振时才值得谈反向，单指标往往是价格回声
brand_sub: Bitcoin × Sentiment × Perpetual Funding
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, 恐惧贪婪指数, 资金费率, 永续合约, 反向指标]
theme_js_file: BTC-恐惧贪婪指数与资金费率.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**Alternative.me 恐惧贪婪指数（F&G）** 把波动、动量、社交、主导率、搜索五类信号合成 **0–100** 日度读数【事实】——**0=极度恐惧，100=极度贪婪**。永续合约 **资金费率** 则是多空之间的周期性支付：正费率 = 多头付空头，基线约 **0.01%/8h（年化 10.95%）**【事实】。

社媒常把「极度恐惧买入、极度贪婪卖出」当铁律——但研究指出 **价格变动驱动指数远多于指数驱动价格**【分析】；资金费率 carry 策略在预注册检验中 **被 falsified**（单笔成本 **0.48%** > 均值 funding 收入 **0.22%**）【分析】。真正有用的是：**(1) 判 F&G 哪一分量在驱动 (2) funding z-score 是否确认拥挤 (3) 两指标是否共振 (4) 胜率是否扣过 BTC 正漂移**。

# 这个领域到底是什么

## 一句话定位

「BTC-恐惧贪婪指数与资金费率」研究的是：**用日度情绪合成指数与永续合约资金费率，刻画杠杆端拥挤与散户/衍生品情绪——并检验「极端读数反向交易」与「费率 carry/反向」在何种条件下成立、何时只是价格的滞后回声**。

:::note red 先划清边界
本手册**不提供**「F&G<25 就买入」或「费率>0.1% 就做空」的信号。F&G 是 **BTC 专用**、**日频滞后** 的情绪温度计；资金费率受 **0.01%/8h 结构正偏** 影响，长期为正不代表多头永远拥挤【事实】。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | F&G 五分量、资金费率公式、z-score 拥挤、共振反向、carry 拆解 |
| 2 | 边界在哪 | Alternative.me F&G（非 CMC 版）；CEX 永续 funding（非期权 IV） |
| 3 | 核心对象 | F&G 0–100、8h funding rate、premium index、OI、基差 |
| 4 | 参与者 | Alternative.me、Binance/OKX/Bybit MM、套利基金、散户杠杆多头 |
| 5 | 关键变量 | F&G 分量、funding rate、z-score、年化 carry、OI 变化 |
| 6 | 可观察的 | alternative.me API、Coinglass funding、交易所公示公式 |
| 7 | 不可观察但可推断 | 调查分量暂停后的权重再分配、跨所套利库存 |
| 8 | 谁影响谁 | 价格→F&G 分量→指数；溢价→funding→多头成本→去杠杆 |
| 9 | 因果 | 溢价→费率 = 【事实】；极端恐惧→见底 = 【推论】 |
| 10 | 只是相关 | F&G 与次日收益 r 弱【待验证】——共变≠预测 |
| 11 | 表层现象 | 「FG=10 必涨」「费率永远正=永远牛市」 |
| 12 | 底层机制 | 行为金融情绪 + 永续锚定现货的套利定价 |
| 13 | 反馈 | 极端恐惧报道→抄底买盘；高 funding→多头平仓→价跌 |
| 14 | 时间延迟 | F&G 日收盘更新；funding 每 8h（2025 起可动态缩至 1h） |
| 15 | 正负反馈 | 正：涨→贪婪读数↑；负：高 funding→去杠杆螺旋 |

## F&G vs 资金费率：两种「情绪」

| 维度 | 恐惧贪婪指数 | 资金费率 |
|---|---|---|
| **本质** | 多源情绪合成 | 合约溢价 + 利息的定价结果 |
| **频率** | 日度 | 8h/4h/2h/1h（2025 动态结算） |
| **方向** | 0 恐惧 ↔ 100 贪婪 | 正=多头付 / 负=空头付 |
| **BTC 专用** | 是【事实】 | 是（本手册聚焦 BTC 永续） |
| **结构偏置** | 无（各分量 0–100） | **正偏**：I=0.01%/8h 基线【事实】 |
| **典型误用** | 当日抄底 | 费率正=永远做多 |

# 为什么值得研究

## 理由一：衍生品已占加密成交量 ~93%

永续合约约占加密期货成交量 **93%**【待验证】（MDPI 2025）——**funding 是杠杆端的「心跳」**，与 F&G 这类散户情绪仪表形成 **现货叙事 + 衍生品定价** 的双轨观察。

## 理由二：两指标互补而非冗余

| 场景 | F&G | Funding | 读法 |
|---|---|---|---|
| **2022-11 底** | FG≈**20** 极度恐惧【待验证】 | funding 转负、空头付【待验证】 | 共振反向做多 |
| **2021-11 顶** | FG>**80**【待验证】 | funding **>0.05%/8h**【待验证】 | 共振反向做空 |
| **2024 牛市中段** | FG 50–70 中性偏贪 | funding 基线 **0.01%** 附近 | 无极端——不反向 |
| **费率极端但 F&G 中性** | FG≈55 | z>**2** | 仅 fade 拥挤侧 |

## 理由三：任何「胜率」都要和对照基准比

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「极度恐惧 10 日反弹 68%」真实超额 |
|---|---|---|---|
| 5 日 | — | **54.3%** | 表面 +13.7 pp |
| 10 日 | — | **56.1%** | 表面 **+11.9 pp** |
| 20 日 | — | **58.6%** | 若 70% → 真实 **+11.4 pp** |
| 40 日 | — | **62.0%** | 若 65% → 真实 **+3.0 pp** |

BTC 正漂移使 **短期反向超额看似可观、长期快速衰减**；证明显需样本 **n≈131**（68% vs 56.1%），远超历史极端恐惧事件 **~40 次**【推论】。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从价格，到情绪，到杠杆税

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">F&G + Funding · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「硬数据」，越靠下越「解读可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 现货价格层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">BTC 现货 · 指数价格 · 波动率</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">F&G 与 funding 的共同输入</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 永续溢价层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">Perp 价格 − 指数价格 → Premium Index</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">套利者锚定现货</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 资金费率层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">F = P + clamp(I−P) · 每 8h 结算</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">基线 0.01%/8h ≈ 年化 10.95%</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ F&G 分量层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">波动25% · 动量25% · 社交15% · 主导10% · 搜索10%</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">调查 15% 已暂停【事实】</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 合成指数层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">Alternative.me 日度 0–100 · BTC 专用</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">日收盘更新 · 非实时</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 拥挤/杠杆层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">OI · funding z-score · 年化 carry</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">z&gt;2 → 多头拥挤 · z&lt;−2 → 空头拥挤</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 共振信号层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">FG&lt;25 + z&lt;−1.5 → 反向做多质量↑</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">单指标极端不够</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">「FG=10 抄底」· 「费率 100% 年化」标题党</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">忽略结构正偏与样本量</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">分量→共振→漂移剥离→仓位</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">§22 四联检</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">F&G + Funding · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 市场情绪</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 杠杆拥挤</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 反向指标</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• Carry 收入</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 五分量加权</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• Premium+Interest</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 多空支付</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 去杠杆螺旋</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 读 F&G API</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 算 funding z</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• §06 分量合成</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• §20 共振判定</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#fgA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#fgA)"/>
  <defs><marker id="fgA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 做什么 | 与两指标的关系 |
|---|---|---|
| **Alternative.me** | 发布 F&G 指数 | 方法论公开；调查分量暂停【事实】 |
| **Binance / OKX / Bybit** | 永续合约 + funding 结算 | 2025 公式/动态结算升级【事实】 |
| **做市商 / 套利基金** | 现货-永续套利 | 压缩溢价 → funding 回归基线 |
| **Ethena 类协议** | Delta-neutral carry | 压缩 funding 极端【待验证】 |
| **散户杠杆多头** | 高 funding 时付息 | 拥挤侧 → 反向 fade 对象 |
| **Coinglass / CoinGlass** | Funding 聚合 | 跨所 z-score 计算 |
| **MDPI 2025 学者** | 跨所 funding 套利研究 | 17% 价差但多数扣除成本后亏损【分析】 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **F&G 指数** | 五分量加权 0–100 | 常态 **35–65** |
| **波动分量** | 当前波动 vs 30/90 日均 | 权重 **25%** |
| **动量/量分量** | 成交量+价格动量 | 权重 **25%** |
| **Funding rate** | 每 8h 结算费率 | 基线 **0.01%** |
| **Funding z** | (rate−μ)/σ 滚动 | \|z\|>**2** = 极端 |
| **年化 carry** | rate×3×365 | 基线 **10.95%** |
| **OI** | 未平仓合约 | 与 funding 共振判拥挤 |
| **Premium index** | 合约溢价率 | 驱动 funding 主变量 |

:::raw
<div class="tool">
<h3>工具 · F&G 分量合成器</h3>
<p>五分量各 <strong>0–100</strong>，按 Alternative.me 权重加权（调查 15% 已暂停不计）【事实】。</p>
<div class="ctrl"><label>波动分量<input type="range" id="fg_vol" min="0" max="100" step="1" value="30"><output id="fg_volO">30</output></label></div>
<div class="ctrl"><label>动量/量分量<input type="range" id="fg_mom" min="0" max="100" step="1" value="20"><output id="fg_momO">20</output></label></div>
<div class="ctrl"><label>社交分量<input type="range" id="fg_soc" min="0" max="100" step="1" value="36"><output id="fg_socO">36</output></label></div>
<div class="ctrl"><label>BTC 主导率分量<input type="range" id="fg_dom" min="0" max="100" step="1" value="30"><output id="fg_domO">30</output></label></div>
<div class="ctrl"><label>搜索趋势分量<input type="range" id="fg_trend" min="0" max="100" step="1" value="22"><output id="fg_trendO">22</output></label></div>
<div class="readout">
<div class="ro"><span class="k">合成指数</span><strong id="fg_index">23</strong><span id="fg_indexh">—</span></div>
<div class="ro"><span class="k">区间</span><strong id="fg_zone">极度恐惧</strong><span id="fg_zoneh">—</span></div>
<canvas id="fgChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="fg_v">情绪温度计偏冷</strong><span id="fg_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">F&G + Funding 因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="100" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="80" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 价格</text>
  <rect x="160" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="215" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">波动/成交量</text>
  <rect x="300" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="355" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">F&G 分量</text>
  <rect x="440" y="50" width="100" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="490" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">F&G 指数</text>
  <rect x="160" y="160" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="215" y="188" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">Perp 溢价</text>
  <rect x="300" y="160" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="355" y="188" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">Funding rate</text>
  <rect x="440" y="160" width="110" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="495" y="188" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">多头付息/去杠杆</text>
  <rect x="200" y="250" width="140" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="270" y="278" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">社媒反向叙事</text>
  <path d="M130 72 L160 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#fgB)"/>
  <path d="M270 72 L300 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#fgB)"/>
  <path d="M410 72 L440 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#fgB)"/>
  <path d="M80 94 L80 160 L215 160 L215 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#fgB)"/>
  <path d="M270 160 L270 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#fgB)"/>
  <path d="M410 160 L355 94" stroke="#454c56" stroke-width="1.5" marker-end="url(#fgB)"/>
  <path d="M495 204 L495 250 L340 250 L340 204" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#fgC)"/>
  <path d="M270 250 L355 94" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#fgC)"/>
  <path d="M495 94 L495 160" stroke="#d5342c" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#fgC)"/>
  <defs>
    <marker id="fgB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="fgC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
  </defs>
</svg>
:::

**读图要点**：**价格→波动/成交量→F&G** 是主因果方向【分析】——指数更多是 **温度计而非方向盘**。溢价→funding→多头成本是衍生品机械链【事实】。红色反馈：极端恐惧社媒帖→抄底；高 funding→去杠杆→价跌。

# 隐藏关系

## 隐藏关系一：价格驱动指数 > 指数驱动价格

Tradelize 2023 综述【分析】：价格变动对 F&G 的影响 **大于** F&G 对价格的预测力。波动分量（25%）和动量分量（25%）合计 **50%** 权重直接来自价格行为——**「FG=10 所以会涨」混淆了因果方向**。

## 隐藏关系二：Funding 结构正偏 ≠ 永远牛市

公式 `F = P + clamp(I−P, ±0.05%)` 中 **I=0.01%/8h**【事实】（OKX/BitMEX）。即使溢价 P≈0，费率仍 **+0.01%**——2024–25 周期 funding **绝大多数时间为正**【分析】（BitMEX Q3 2025），这是 **公式设计** 而非单纯多头狂热。

## 隐藏关系三：跨域同构

| 结构 | 本领域 | 其他领域 |
|---|---|---|
| **情绪合成指数** | F&G | CNN 股市 F&G、VIX |
| **拥挤税** | Funding rate | 股票融券费率、基差 |
| **反向极端** | FG<25 买入 | Put/Call>1.2 买 SPX |
| **Carry 衰减** | funding 套利压缩 | 外汇 carry trade 平仓 |
| **双轨确认** | F&G+funding 共振 | 价量+期权 skew 共振 |

:::raw
<div class="tool">
<h3>工具 · 资金费率累计算器</h3>
<p>仓位 × 费率/8h × 期数 → 实际支付；基线 <strong>0.01%/8h = 年化 10.95%</strong>【事实】。</p>
<div class="ctrl"><label>仓位 ($)<input type="range" id="fr_pos" min="10000" max="500000" step="5000" value="100000"><output id="fr_posO">$100,000</output></label></div>
<div class="ctrl"><label>费率/8h (%)<input type="range" id="fr_rate" min="-0.05" max="0.15" step="0.001" value="0.05"><output id="fr_rateO">0.050%</output></label></div>
<div class="ctrl"><label>持有期数 (×8h)<input type="range" id="fr_periods" min="1" max="9" step="1" value="3"><output id="fr_periodsO">3 期</output></label></div>
<div class="readout">
<div class="ro"><span class="k">累计支付</span><strong id="fr_cost">−$150</strong><span id="fr_costh">—</span></div>
<div class="ro"><span class="k">年化 carry</span><strong id="fr_annual">54.8%</strong><span id="fr_annualh">—</span></div>
<canvas id="frChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="fr_v">偏高但未极端</strong><span id="fr_vh">—</span></div>
</div>
</div>
:::

# 系统运行机制

## 四模式循环

1. **基线模式**：funding≈**0.01%/8h**，F&G **40–60** → 无极端信号
2. **贪婪拥挤模式**：FG>**75** + funding z>**+2** → 多头付高息 + 情绪过热【推论】
3. **恐惧 capitulation 模式**：FG**<25** + funding z**<−1.5** → 共振反向窗口【推论】
4. **脱钩模式**：FG 极端但 funding 中性 → **单指标不可交易**

:::note amber 2025 监管动态
OKX 2025-04 起分三批更新 funding 公式；Binance/OKX/Bybit 引入 **动态结算**（触及 cap 时缩至 1h）【事实】——极端费率持续时间缩短，z-score 策略需更新持有期。
:::

# 时间演化

## F&G + Funding 里程碑时间轴

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">F&G + Funding · 演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="70" cy="100" r="6" fill="#1d4ed8"/><text x="70" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2018-02</text><text x="70" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">F&G 上线</text>
  <circle cx="150" cy="100" r="6" fill="#d5342c"/><text x="150" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2021-11</text><text x="150" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">FG&gt;80 顶</text>
  <circle cx="250" cy="100" r="6" fill="#0f8a4d"/><text x="250" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2022-11</text><text x="250" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">FG≈20 底</text>
  <circle cx="350" cy="100" r="6" fill="#b8730a"/><text x="350" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024</text><text x="350" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">ETF 牛市 funding 基线化</text>
  <circle cx="450" cy="100" r="6" fill="#1d4ed8"/><text x="450" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2025-04</text><text x="450" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">OKX 公式更新</text>
  <circle cx="550" cy="100" r="6" fill="#b8730a"/><text x="550" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2025 Q3</text><text x="550" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">动态 1h 结算</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">从「费率极端频繁」到「套利压缩+动态结算」</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对指标的影响 |
|---|---|---|
| **Alternative.me** | 流量/API | 推极端区间标题 |
| **交易所** | 永续成交量 | funding 收入来自交易者互付【事实】 |
| **Coinglass 等** | 订阅 | 推 z-score 警报 |
| **套利基金** | 压缩价差 | 让极端 funding 更快回归 |
| **社媒 KOL** | 点击 | 「FG=历史最低」 |
| **Ethena 类** | Carry 收益 | 系统性做空 perp 收 funding |

# 资源与信息流

## Funding → 多头/空头的「抽水」

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">Funding rate → 多空抽水</text>
  <rect x="40" y="50" width="200" height="50" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="140" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">多头持仓 · 付 funding</text>
  <rect x="440" y="50" width="200" height="50" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="540" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">空头持仓 · 收 funding</text>
  <rect x="240" y="130" width="200" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="160" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">交易所撮合 · 每 8h 结算</text>
  <path d="M140 100 L140 130 L240 130 L240 155" stroke="#d5342c" stroke-width="2" fill="none" marker-end="url(#fgD)"/>
  <text x="90" y="120" font-size="10" fill="#d5342c" font-family="sans-serif">rate&gt;0 支付</text>
  <path d="M540 100 L540 130 L440 130" stroke="#0f8a4d" stroke-width="2" fill="none" marker-end="url(#fgE)"/>
  <text x="560" y="120" font-size="10" fill="#0f8a4d" font-family="sans-serif">收取</text>
  <path d="M340 180 L340 220" stroke="#7c848f" stroke-width="1.5" marker-end="url(#fgF)"/>
  <rect x="200" y="220" width="280" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="340" y="247" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">高费率 → 多头去杠杆 → 价格下行压力</text>
  <defs>
    <marker id="fgD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
    <marker id="fgE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
    <marker id="fgF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker>
  </defs>
</svg>
:::

**信息流**：现货价→溢价→funding 公式→交易所结算→Coinglass 聚合→CT 警报→交易者行为。**F&G 并行路径**：价→分量→alternative.me→社媒。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「极度恐惧 10 日反弹 <strong>68%</strong>」？先减<strong>随机持币基准 56.1%</strong>（μ=50%、σ=65%）。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="fg_T" min="5" max="40" step="5" value="10"><output id="fg_TO">10 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="fg_ps" min="50" max="95" step="0.1" value="68.0"><output id="fg_psO">68.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="fg_mu" min="0" max="100" step="1" value="50"><output id="fg_muO">50.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="fg_sg" min="30" max="100" step="1" value="65"><output id="fg_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="fg_base">56.1%</strong><span id="fg_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="fg_dp">+11.9 pp</strong><span id="fg_dph">—</span></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="fg_n">131</strong><span id="fg_nh">—</span></div>
<canvas id="fgDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="fg_drift_v">样本严重不足</strong><span id="fg_drift_vh">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **判 F&G 驱动分量** | 波动驱动 vs 社交驱动——质量不同 |
| 2 | **Funding z-score** | \|z\|>2 才谈拥挤 |
| 3 | **共振确认** | FG 极端 + funding 同向拥挤 |
| 4 | **漂移剥离胜率** | 68% 默认仅 +11.9 pp（10 日） |
| 5 | **结构正偏意识** | 0.01% 基线 ≠ 多头狂热 |
| 6 | **分解 carry** | funding-only vs price-only PnL |
| 7 | **持有期匹配** | funding 反向默认 8–24h |
| 8 | **跨所对照** | CEX 主导价格发现【分析】 |
| 9 | **写双指标日志** | 每日 FG + Binance funding |
| 10 | **30 分钟四联检** | §22 最小实践 |

# 常见认知陷阱

:::details 1. 「FG<25 就买入」
**错因**：指数 **50% 权重来自价格**——恐惧往往是跌出来的回声【分析】。**对策**：等 funding 确认空头拥挤。
:::

:::details 2. 「Funding 永远正 = 永远牛市」
**错因**：**I=0.01%/8h 结构正偏**【事实】。**对策**：看 z-score 而非符号。
:::

:::details 3. 忽视调查分量暂停
**错因**：15% 权重悬空，再分配未公开【分析】。**对策**：总分变化时查分量驱动。
:::

:::details 4. 把 CMC F&G 当 Alternative.me
**错因**：CMC 含 ETH IV、SSR 等，方法论不同【事实】。**对策**：固定数据源。
:::

:::details 5. Carry 策略不看成本
**错因**：预注册检验单笔成本 **0.48%** > 均值 funding **0.22%**【分析】。**对策**：分解 PnL。
:::

:::details 6. Funding 反向不过拟合检验
**错因**：Sharpe 0.77 仅 **125 笔**且参数优化【待验证】。**对策**：walk-forward + DSR。
:::

:::details 7. 胜率不算漂移
**错因**：10 日基准 **56.1%** 非 50%。**对策**：§12 工具。
:::

:::details 8. 单所 funding 代表全市场
**错因**：CEX-DEX 相关差 **61%**【分析】。**对策**：以 Binance 为主、跨所验证。
:::

:::details 9. 极端费率持续持有 carry
**错因**：2025 动态 1h 结算压缩极端【事实】。**对策**：缩短持有期。
:::

:::details 10. 忽视 basis drift
**错因**：SOL carry 收入 0.55% 仍亏——两腿价差 **−0.23%**【分析】。**对策**：现货-永续基差监控。
:::

:::details 11. 把 F&G 当 altcoin 情绪
**错因**：官方写明 **bitcoin only**【事实】。**对策**：山寨用其他指标。
:::

:::details 12. 共振缺失仍交易
**错因**：单指标极端历史上 false positive 多【推论】。**对策**：§20 共振判定器。
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 极度恐惧 | capitulation | FG<25 + funding z<−1.5 |
| 多头拥挤 | 高杠杆付息 | funding z>+2 + OI↑ |
| 情绪滞后 | 价跌后 FG 才低 | 波动分量骤降 |
| Carry 收入 | 收 funding | 空头 perp + 多头现货 |

# 从理论到行动

**决策漏斗**：

1. **数据源**：Alternative.me FG + Binance BTC funding
2. **分量**：哪一分量驱动 FG 变化？
3. **拥挤**：funding z 是否 |z|>2？
4. **共振**：FG 极端与 funding 同向拥挤？
5. **统计**：胜率是否扣过漂移？n 是否够？
6. **执行**：共振→考虑反向；否则→不交易

# 技能树

:::details L1 · 观察者
- [ ] 读 alternative.me 当日 FG
- [ ] 读 Coinglass 8h funding
- [ ] 说出 0.01% 基线含义
:::

:::details L2 · 分析师
- [ ] 算 funding z-score
- [ ] §06 分量合成理解 FG=23
- [ ] §12 剥离 68% 胜率
:::

:::details L3 · 建模者
- [ ] 分解 funding-only / price-only PnL
- [ ] 回测 z>2 fade（自填 n）
- [ ] 对照 F&G 共振条件
:::

:::details L4 · 系统设计者
- [ ] 多信号：FG+funding+链上
- [ ] 自动共振警报
- [ ] 季度样本外更新
:::

# 游戏化世界

**角色**：情绪-杠杆审计员（Sentiment & Leverage Auditor）。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 连续 5 天抄 FG + funding | 解锁「分量合成」 |
| Lv.2 | 识别一次结构正偏误导 | 解锁「费率计算器」 |
| Lv.3 | 算 10 日真实超额 | 解锁「漂移剥离器」 |
| Lv.4 | 判定一次共振/脱钩 | 解锁「共振判定器」 |
| Lv.5 | 写「两指标不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 FG + Binance funding + z | 7 日表 |
| 每周 | 标一次共振/脱钩 | §20 截图 |
| 每月 | 读一篇 funding 批评文 | 3 行摘要 |
| 每季 | 更新极端事件样本 n | 与 §12 对照 |
| 每年 | 对比 carry vs fade PnL | 假设日志 |

# 反事实模拟

:::tabs
@@情景 A · 若 FG 能预测价格
极端恐惧后 10 日应显著跑赢基准——扣除漂移后仅 **+11.9 pp**，且 n 需 **131** > 历史 **~40** 次【推论】→ **预测力被严重高估**。

@@情景 B · 若无结构正偏 I=0.01%
Funding 应在零附近对称——实际长期正偏【事实】→ **「永远正=牛市」叙事被 falsified**。

@@情景 C · 若 carry 无成本
Delta-neutral 收 funding 应稳定正——预注册检验 **falsified**（成本 0.48%>收入 0.22%）【分析】。

@@情景 D · 若 2025 无动态结算
极端 funding 持续数天——动态 1h 结算缩短窗口【事实】→ z>2 策略持有期须缩短。
:::

:::raw
<div class="tool">
<h3>工具 · 极端共振判定器</h3>
<p>F&G 极端 + funding z-score → 10 日内均值回归概率（模型估计）。默认 <strong>FG=18 · z=−2.5 · 持有 8h</strong>。</p>
<div class="ctrl"><label>F&G 指数<input type="range" id="fg_extreme" min="0" max="100" step="1" value="18"><output id="fg_extremeO">18</output></label></div>
<div class="ctrl"><label>Funding z-score<input type="range" id="fr_z" min="-4" max="4" step="0.1" value="-2.5"><output id="fr_zO">−2.5σ</output></label></div>
<div class="ctrl"><label>预期持有 (h)<input type="range" id="fr_hold" min="8" max="48" step="8" value="8"><output id="fr_holdO">8h</output></label></div>
<div class="readout">
<div class="ro"><span class="k">共振概率</span><strong id="fg_conf">68.0%</strong><span id="fg_confh">—</span></div>
<div class="ro"><span class="k">信号类型</span><strong id="fg_sig">恐惧+空头拥挤</strong><span id="fg_sigh">—</span></div>
<canvas id="fgConfChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="fg_conf_v">中等共振</strong><span id="fg_conf_vh">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会读数** | 3 天 | FG + funding 日表 | 口算年化 carry |
| **L2 会分解** | 1 周 | 分量 + z-score | §06–§08 工具 |
| **L3 会检验** | 2 周 | 漂移剥离 + 共振 | §12–§20 工具 |
| **L4 会迭代** | 1 月+ | 双指标系统 | 2 月日志 |

# 30 分钟最小实践

**任务**：「FG + Funding 四联检」——读、算、共振、漂移。

1. **7 分钟 · 读数**：打开 [alternative.me/crypto/fear-and-greed-index](https://alternative.me/crypto/fear-and-greed-index/) 抄当日 FG；Coinglass 抄 Binance BTC 8h funding。
2. **8 分钟 · 分量**：§06 工具，设波动 **30**、动量 **20**、社交 **36**、主导 **30**、搜索 **22** → 合成 **23**（极度恐惧）。
3. **8 分钟 · 费率**：§08 工具，仓位 **$100,000**、费率 **0.05%/8h**、**3 期** → 支付 **$150**、年化 **54.8%**。
4. **7 分钟 · 共振+漂移**：§20 设 FG=**18**、z=**−2.5** → 共振 **68.0%**；§12 设 10 日 **68%** → 基准 **56.1%**，超额 **+11.9 pp**，需 **n=131**。

**验证**：四步数字与页面默认读数误差 **<0.2 pp**；结论必含「样本不足，不交易」。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | F&G 机制 | Alternative.me 五分量 + 调查暂停 |
| D2 | Funding 公式 | OKX 文档 F=P+clamp(I−P) |
| D3 | 结构正偏 | 0.01% 基线 vs z-score |
| D4 | 工具 | §06–§12 四个模型 |
| D5 | 批评 | carry falsification 摘要 |
| D6 | 共振案例 | 2022-11 底 vs 2021-11 顶 |
| D7 | 合成 | 1 页「何时共振/脱钩」 |

# 30 天能力构建计划

**Week 1**：机制 + 日读数 + 分量合成（L1）
**Week 2**：Funding 公式 + z-score + 费率计算（L2）
**Week 3**：漂移剥离 + 共振判定 + 批评文献（L3）
**Week 4**：个人双指标日志 + 样本更新（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **F&G 五分量** | 加权 0–100 | 50% 来自价格 |
| 2 | **Funding 公式** | P + clamp(I−P) | 结构正偏 |
| 3 | **Funding z** | 拥挤度量 | 忽略基线 |
| 4 | **年化 carry** | rate×3×365 | 与 z 混淆 |
| 5 | **共振条件** | FG 极端 + z 极端 | 单指标交易 |
| 6 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 7 | **Carry 分解** | funding vs price PnL | 忽视 basis |
| 8 | **Fade 拥挤** | z>2 反向 | 过拟合 |
| 9 | **动态结算** | 1h 压缩极端 | 持有期过时 |
| 10 | **因果方向** | 价→FG | 反向因果幻觉 |

# 关键问题清单

:::details 日频
- 今日 FG 多少？哪分量变化最大？
- Binance 8h funding？z-score？
- 年化 carry 是否 >30%？
:::

:::details 共振
- FG 是否 <25 或 >75？
- funding z 是否 |z|>2？
- 两指标是否同向拥挤？
:::

:::details 统计
- 信号胜率是否扣过漂移？
- 样本 n 是否 ≥ 证明显需？
- carry 是否扣过 0.48% 成本？
:::

:::details 决策
- 共振 or 脱钩？
- 持有期是否匹配结算频率？
- ≥3 独立信号是否一致？
:::

# 下一阶段探索

1. **F&G 分量实时拆解 API**：调查暂停后权重如何再分配？【待验证】
2. **FG+funding+ETF 流三指标合成**：预测力是否超单指标？【假设】
3. **动态结算后 z>2 策略持有期优化**：8h vs 24h 样本外对比
4. **CEX-DEX funding 价差**：MDPI 两阶层结构的可交易子集
5. **Ethena 规模 vs funding 压缩**：系统性 carry 的边际效应

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| F&G 五分量权重 | 方法论 | alternative.me 官网 | 【事实】 |
| 调查 15% 暂停 | 方法论 | alternative.me / Entropikaizen 2025 | 【事实】 |
| BTC-only 指数 | 文档 | alternative.me | 【事实】 |
| Funding 公式 | 交易所文档 | OKX 2025-04 公告 | 【事实】 |
| I=0.01%/8h 基线 | 行业 | BitMEX Q3 2025 报告 | 【分析】 |
| 永续占期货 93% | 论文 | MDPI 2025 | 【待验证】 |
| Carry falsification | 预注册回测 | Mykola-Quant 2025 | 【分析】 |
| 跨所套利 17% 价差 | 论文 | MDPI 2025 | 【分析】 |
| 动态 1h 结算 | 交易所 | Binance 2025-05 / OKX 2025-09 | 【事实】 |
| 价格驱动 F&G | 综述 | Tradelize 2023 | 【分析】 |
| z>2 fade Sharpe 0.77 | 学术项目 | CFRM Strategy Project【待验证】 | 【待验证】 |
| CMC F&G 差异 | 对比 | CryptoSlate 2025 | 【事实】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币与永续合约均可出现极端波动、流动性缺口与强制平仓；恐惧贪婪指数、资金费率及任何共振统计均**不保证**未来价格路径。历史极端事件样本不足，请勿依据单一情绪或费率读数加杠杆或集中配置。永续合约在多国受严格监管或禁止，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
