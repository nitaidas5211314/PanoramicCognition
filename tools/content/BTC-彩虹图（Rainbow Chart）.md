---
slug: BTC-彩虹图（Rainbow Chart）
title: BTC-彩虹图（Rainbow Chart）
subtitle: 对数回归 + 九色情绪带把 BTC 长期走势变成「温度计」——<strong>2026-09 现货 $95K 落在第 4 带「仍便宜」</strong>，但 2022 与 2026 两次跌破地板证明它<strong>不是预言机</strong>
brand_sub: Bitcoin × Log Regression × Sentiment Bands
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-17
data_asof: 2026 年 9 月
tags: [比特币, 彩虹图, 对数回归, 估值带, 周期情绪]
theme_js_file: BTC-彩虹图（Rainbow Chart）.js
md_raw: hint
md_raw_hint: （此处含交互模型与彩虹带图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**BTC 彩虹图 = 对数回归中轴 + 九条等距 log₁₀ 偏移带**：`log₁₀P = a·ln(t) + b`，九带各差 **0.1 dex（≈1.26×）**，冷色=历史便宜区、暖色=历史过热区【分析】。2026-09-17 网络年龄 **6466 天**，动态回归公允中轴 **$145,091**，现货 **$95,000** → 偏移 **−0.184 dex**，落在 **第 4 带「仍便宜 / Undervalued」**【推论】。

它始于 2014 Reddit **meme**（azop 上色 + trolololo 公式），2019 Rohmeo 合并为 BlockchainCenter 经典版，2022 FTX 崩盘**击穿最蓝带**后推出 V2，再升级为**动态幂律回归（R²≈94.3%）**【事实】。Eric Wall 曾用它嘲讽 S2F——**彩色带是情绪漫画，不是水晶球**【分析】。

# 这个领域到底是什么

## 一句话定位

「BTC-彩虹图」研究的是：**如何把比特币全历史价格映射到一条对数减速趋势线上，并用固定宽度的彩色带标记「相对历史常态偏冷/偏热」的位置**。核心输出不是点预测，而是**区间定位 + 周期情绪语境**。

:::note red 先划清边界
BlockchainCenter 作者 Rohmeo 原话：「**从未是严肃预测工具，是看历史的 fun way**」「**不能用彩虹预测价格**」【事实】。本手册**不提供**买卖信号；任何「进蓝带必涨」都必须扣掉 BTC 正漂移基准（§09）。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | log 回归系数、九带偏移、版本迭代（V1/V2/Dynamic）、样本外失效 |
| 2 | 边界在哪 | 不含链上微观结构；不预测黑天鹅；不替代仓位管理 |
| 3 | 核心对象 | 中轴价 P_fair、偏移 δ=log₁₀(P/P_fair)、带号 1–9、R² |
| 4 | 参与者 | azop、trolololo、Rohmeo、Eric Wall、PlanB/S2F 阵营、ETF 机构 |
| 5 | 关键变量 | a、b、δ、带宽 0.1 dex、现货、减半相位 |
| 6 | 可观察的 | 日收盘价、带标签、历史顶底落带记录 |
| 7 | 不可观察但可推断 | 真实「公允」需求、OTC 流量、丢失币 |
| 8 | 谁影响谁 | 采用↑→价↑→带上移；带标签→叙事→散户行为 |
| 9 | 因果 | ln(t)→P 是【推论】；带色→买卖是【假设】 |
| 10 | 只是相关 | 带号与后续回报相关，但含 drift 与过拟合 |
| 11 | 表层现象 | 周期顶多在红带、底多在蓝带 |
| 12 | 底层机制 | 采用率对数增长 + 波动均值回归叙事 |
| 13 | 反馈 | 蓝带→「历史性抄底」→买盘；红带→FOMO/分发 |
| 14 | 时间延迟 | 带色滞后于顶底 **数周至数月** |
| 15 | 正负反馈 | 正：信仰强化；负：破带→模型信誉损伤→再校准 |

## 核心公式

| 形式 | 表达式 | 典型参数【待验证】 |
|---|---|---|
| 动态回归（2026） | log₁₀P = **2.4612**·ln(t) − **16.4337** | R²≈**0.961** |
| V1 经典（2014） | log₁₀P = **2.9065**·ln(t) − **19.493** | 偏乐观 |
| Bitbo 减半锚 | log₁₀P = **2.6521**·ln(t) − **18.163** | 仅用 3 次减半价 |
| 中轴 | P_fair = 10^(a·ln(t)+b) | t=6466 → **$145,091** |
| 第 k 带上沿 | P_k = P_fair · 10^(k·0.1) | k∈[−4,+4] |
| 偏移 | δ = log₁₀(P_spot/P_fair) | **−0.184** |

# 为什么值得研究

## 理由一：post-S2F 时代最「出圈」的长线情绪工具

PlanB 的 S2F 在 2022 后严重偏离【分析】；Eric Wall 2020 起用彩虹图**反讽**「任何 log 模型都能画漂亮曲线」【事实】。但它比 S2F 更诚实：**作者自己说不是预测工具**，且 2022 破带后公开再校准【事实】——这是罕见的「模型自我 falsify 记录」。

## 理由二：2022 与 2026 两次「破彩虹」是教科书级 epistemology 案例

| 事件 | 现象 | 模型响应 |
|---|---|---|
| 2022-11 FTX 后 | 现货 **$16,304** 击穿 V1 最蓝带 | 发布 **V2**（更保守曲线）【事实】 |
| 2026-06 | 现货 **~$62,500** 再破 Dynamic 地板 | 作者推 **Dynamic Rainbow** R²=94.3%【待验证】 |
| 共同教训 | 破带 ≠ BTC 归零 | 带是**事后拟合**，可移动 |

## 理由三：对照基准剥离「蓝带胜率」幻觉

BTC 有正漂移。μ=50%/年、σ=65%/年时：

| 持有期 | 随机持币基准胜率 | 「蓝带 90 日 72% 胜率」真实超额 |
|---|---|---|
| 30 日 | **60.5%** | 若 72% → **+11.5 pp** |
| 90 日 | **67.7%** | 若 72% → **+4.3 pp** |
| 180 日 | **74.2%** | 若 78% → **+3.8 pp** |
| 365 日 | **82.3%** | 长期持有基准已很高 |

**任何「历史蓝带 100% 一年后上涨」统计，都要问：是否只是 drift + 小样本？**

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 meme 到决策

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 彩虹图 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「数学/历史拟合」，越靠下越「叙事/行为可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 时间原点层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">创世 2009-01-03 · t=天数 · 起点平移可改 a,b【分析】</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：2012 前数据稀疏 → 拟合不稳</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 对数回归层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">log₁₀P = a·ln(t)+b · OLS 全样本 · R²≈0.94–0.96</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">失效：高 R² = 共趋势 · 非因果</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 九带偏移层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">±0.1 dex 步长 · 每带 ≈1.26× · 蓝→红情绪梯度</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">失效：带宽固定 · 波动率制度变化</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 版本迭代层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">V1(2014) → V2(2022-11) → Dynamic(2026) · 再校准</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：事后调整 =  hindsight bias</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 周期锚点层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">减半 HPR 变体 · 顶多在红带 · 底多在蓝带</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：2021 双顶 · 2024 ETF 周期变形</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 统计检验层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">walk-forward · 带内回报分布 · 破带频率</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">支持：描述强；反对：OOS alpha 未证</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 制度层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">ETF 2024+ · 机构 dampening · 四年周期弱化【待验证】</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">失效：ETF flow 不在原始方程</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 传播层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">meme → Eric Wall 反 S2F → 中文社群「彩虹底」</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">失效：只展示拟合段 · 隐藏破带与再校准</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">带号定位 · 禁止单带买卖 · 对照基准 · 破带日记</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">把彩虹当体温计，不当天气预报</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">彩虹图 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 对数减速增长</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 均值回归带</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 情绪光谱</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• meme 传播</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• OLS log 回归</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 固定 dex 偏移</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 全样本再拟合</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 顶底落带统计</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 算 δ 与带号</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 比对 V1/V2</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 扣 drift 基准</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 记录破带事件</text>
  <defs><marker id="rbA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="214" y1="120" x2="238" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#rbA)"/>
  <line x1="440" y1="120" x2="464" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#rbA)"/>
</svg>
:::

## 跨域同构

| 彩虹结构 | 其他领域 | 共同数学 |
|---|---|---|
| 九色情绪带 | Bollinger / Keltner 通道 | 趋势 ± k·σ |
| log 回归中轴 | PLT 幂律、S2F | 时间→价格缩放 |
| 0.1 dex 等距 | 地震里氏刻度 | 对数等距分级 |
| 再校准 V2 | 多重检验 p-hacking | 事后调参拟合更好 |
| 破带事件 | 期权 barrier breach | 阈值触发叙事切换 |
| meme→工具 | 凯利/反身性流行 | 简化模型出圈 |

# 核心参与者

| 参与者 | 与彩虹图的关系 | 激励扭曲 |
|---|---|---|
| **azop** | 2014 Reddit 彩虹上色 meme | 社区娱乐 |
| **trolololo** | Bitcointalk log 回归公式 | 科学 vs hopium |
| **Rohmeo (BlockchainCenter)** | 2019 合并 + V2 + Dynamic | 流量与信誉 |
| **Eric Wall** | 2020 反 S2F 传播 | 讽刺 vs 意外带货 |
| **PlanB / S2F 阵营** | 被彩虹「对比羞辱」的对象 | 模型面子 |
| **Ryan Lee (Bitget)** | 2026：有用参考但非预测【分析】 | 交易所立场 |
| **Emad Shahin (Ethra)** | 「拟合回归+幽默感」【分析】 | 媒体流量 |
| **你** | 读者/投资者 | 蓝带确认偏误 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **t** | 创世以来天数 | **6466** |
| **a, b** | 动态回归系数 | **2.4612**, **−16.4337** |
| **P_fair** | 中轴价 | **$145,091** |
| **P_spot** | 现货 | **~$95,000** |
| **δ 偏移** | log₁₀(P_spot/P_fair) | **−0.184** |
| **带号** | 1–9 情绪带 | **第 4 带** |
| **带 3 上沿** | fair·10^−0.2 | **$91,546** |
| **带 4 上沿** | fair·10^−0.1 | **$115,250** |
| **V1 中轴** | 旧公式同 t | **$1,022,211**（过高） |

:::raw
<div class="tool">
<h3>工具 · 彩虹带定位器</h3>
<p>输入网络年龄、现货与中轴系数，即时算 δ、带号与九带价格表。</p>
<div class="ctrl"><label>网络年龄 t（天）<input type="range" id="rb_days" min="2000" max="8000" step="1" value="6466"><output id="rb_daysO">6466 天</output></label></div>
<div class="ctrl"><label>现货价 USD<input type="range" id="rb_spot" min="15000" max="200000" step="500" value="95000"><output id="rb_spotO">$95,000</output></label></div>
<div class="ctrl"><label>回归斜率 a<input type="range" id="rb_a" min="2.2" max="2.9" step="0.0001" value="2.4612"><output id="rb_aO">2.4612</output></label></div>
<div class="readout">
<div class="ro"><span class="k">中轴 P_fair</span><strong id="rb_fair">$145,091</strong><span id="rb_fairh">—</span></div>
<div class="ro"><span class="k">偏移 δ</span><strong id="rb_delta">−0.184 dex</strong><span id="rb_deltah">—</span></div>
<div class="ro"><span class="k">带号</span><strong id="rb_band">4 · 仍便宜</strong><span id="rb_bandh">—</span></div>
<div class="ro"><span class="k">折价</span><strong id="rb_disc">−34.5%</strong><span id="rb_disch">—</span></div>
<canvas id="rbBandChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="rb_v">偏冷区</strong><span id="rb_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 实线因果与虚线反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">彩虹图因果（实线=主张 · 红虚线=反馈/争议）</text>
  <rect x="40" y="50" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="95" y="76" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">网络年龄 t</text>
  <rect x="200" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="255" y="76" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">回归中轴</text>
  <rect x="360" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="415" y="76" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">九色带</text>
  <rect x="520" y="50" width="110" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="575" y="76" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">现货 P</text>
  <defs><marker id="rbC1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="150" y1="72" x2="198" y2="72" stroke="#454c56" stroke-width="1.3" marker-end="url(#rbC1)"/>
  <line x1="310" y1="72" x2="358" y2="72" stroke="#454c56" stroke-width="1.3" marker-end="url(#rbC1)"/>
  <line x1="470" y1="72" x2="518" y2="72" stroke="#454c56" stroke-width="1.3" marker-end="url(#rbC1)"/>
  <line x1="95" y1="94" x2="575" y2="130" stroke="#454c56" stroke-width="1.3" marker-end="url(#rbC1)"/>
  <text x="330" y="125" font-size="10" fill="#454c56" font-family="sans-serif">t → fair → 带边界（每日上移）</text>
  <line x1="575" y1="94" x2="415" y2="130" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#rbC1)"/>
  <text x="500" y="155" font-size="10" fill="#d5342c" font-family="sans-serif">P 破带 → 再校准（反馈）</text>
  <line x1="415" y1="94" x2="255" y2="130" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#rbC1)"/>
  <text x="320" y="175" font-size="10" fill="#d5342c" font-family="sans-serif">蓝带标签 → 「抄底」叙事 → 买盘</text>
  <rect x="40" y="200" width="140" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="110" y="226" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">ETF/宏观</text>
  <rect x="220" y="200" width="140" height="44" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="290" y="226" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">交易所暴雷</text>
  <rect x="400" y="200" width="140" height="44" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="470" y="226" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">减半周期</text>
  <line x1="110" y1="200" x2="575" y2="94" stroke="#0f8a4d" stroke-width="1.1" marker-end="url(#rbC1)"/>
  <line x1="290" y1="200" x2="575" y2="94" stroke="#d5342c" stroke-width="1.1" marker-end="url(#rbC1)"/>
  <text x="14" y="280" font-size="10.5" fill="#7c848f" font-family="sans-serif">争议：带色→行为是叙事反馈；ETF/暴雷不在回归方程却驱动破带</text>
</svg>
:::

**三条因果链：**

1. **t → fair → 带**（模型派）：中轴每日上移约 **0.03%**，带边界同比例上移【推论】。
2. **带色 → 叙事 → 流量**（行为派）：蓝带触发「历史性底部」内容传播【分析】。
3. **破带 → 再校准 → R²↑**（元模型）：2022/2026 破带推动 V2/Dynamic【事实】——**这是 hindsight 机制，不是预测机制**。

# 隐藏关系

| 隐藏关系 | 表面看 | 实际机制 |
|---|---|---|
| 彩虹 vs S2F | 彩虹「更准」 | 两者都与 t 共线；彩虹更常再校准 |
| 蓝带=底 | 四次周期有效 | 2022 击穿后带整体下移 |
| R²=94% | 科学严谨 | 全样本 in-sample；walk-forward 未公开 |
| Eric Wall 讽刺 | 贬低所有模型 | 反而扩大彩虹传播 |
| Dynamic 自更新 | 永不过时 | 每次破带都移动 goalpost |
| 带内 100% 胜率 | 神指标 | 未扣 drift；样本 n 小 |

:::raw
<div class="tool">
<h3>工具 · 版本再校准冲击</h3>
<p>V1 过于乐观；V2/Dynamic 下调中轴。看同一现货在不同版本的带号差异。</p>
<div class="ctrl"><label>版本<input type="range" id="rb_ver" min="0" max="2" step="1" value="2"><output id="rb_verO">Dynamic (2026)</output></label></div>
<div class="ctrl"><label>现货 USD<input type="range" id="rb_vspot" min="15000" max="150000" step="500" value="95000"><output id="rb_vspotO">$95,000</output></label></div>
<div class="readout">
<div class="ro"><span class="k">该版中轴</span><strong id="rb_vfair">$145,091</strong><span id="rb_vfairh">—</span></div>
<div class="ro"><span class="k">该版带号</span><strong id="rb_vband">4</strong><span id="rb_vbandh">—</span></div>
<div class="ro"><span class="k">相对 V1 中轴</span><strong id="rb_vratio">−85.8%</strong><span id="rb_vratioh">—</span></div>
<canvas id="rbVerChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="rb_v2">Dynamic 更贴近现货</strong><span id="rb_v2h">—</span></div>
</div>
</div>
:::

# 系统运行机制

## 彩虹图如何「运转」

```text
每日收盘价 → 更新 t → 重算 P_fair = 10^(a·ln(t)+b)
           → 算 δ = log₁₀(P/P_fair) → 映射带号 1–9
           → 叠加减半相位 / ETF flow 交叉验证
           → 若破带 → 社区争论 → 可能触发公式再校准
```

**关键：中轴是慢变量**——fair 日增幅约 **0.03%**，现货日波动常 **>3%**。**带号周度才稳定，不适合日内交易。**

## 九带标签（BlockchainCenter 经典）

| 带号 | δ 阈值 | 标签 | 历史顶底锚点【待验证】 |
|---|---|---|---|
| 1 | ≤−0.4 | 甩卖 / Capitulation | 2022-11 **$16.3K** |
| 2 | ≤−0.3 | 买入 / Deep Value | 2015 底 **$172** |
| 3 | ≤−0.2 | 积累 / Accumulate | 2018 底 **$3.2K** |
| 4 | ≤−0.1 | 仍便宜 / Still cheap | **2026-09 ~$95K** |
| 5 | ≤0.0 | HODL | 中轴附近 |
| 6 | ≤+0.1 | 泡沫？ | 2024-03 **$73K** |
| 7 | ≤+0.2 | FOMO 加剧 | — |
| 8 | ≤+0.3 | 认真卖 | — |
| 9 | ≤+0.4 | 最大泡沫 | 2017/2021 顶 **Band 9** |

# 时间演化

## 演化时间轴

:::raw
<svg viewBox="0 0 680 240" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">彩虹图演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#1d4ed8"/>
  <text x="80" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2014</text>
  <text x="80" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">azop meme</text>
  <circle cx="160" cy="100" r="6" fill="#1d4ed8"/>
  <text x="160" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2014</text>
  <text x="160" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">trolololo</text>
  <circle cx="260" cy="100" r="6" fill="#b8730a"/>
  <text x="260" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2019</text>
  <text x="260" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">Rohmeo 合并</text>
  <circle cx="360" cy="100" r="6" fill="#b8730a"/>
  <text x="360" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2020</text>
  <text x="360" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">Eric Wall</text>
  <circle cx="460" cy="100" r="6" fill="#d5342c"/>
  <text x="460" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2022-11</text>
  <text x="460" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">破带→V2</text>
  <circle cx="560" cy="100" r="6" fill="#d5342c"/>
  <text x="560" y="82" text-anchor="middle" font-size="10" fill="#454c56" font-family="sans-serif">2026</text>
  <text x="560" y="125" text-anchor="middle" font-size="9" fill="#7c848f" font-family="sans-serif">Dynamic R²94%</text>
  <text x="14" y="165" font-size="10.5" fill="#7c848f" font-family="sans-serif">V1 中轴 @6466d: ~$1.02M → Dynamic: ~$145K（下调 **85.8%**）【推论】</text>
  <text x="14" y="185" font-size="10.5" fill="#7c848f" font-family="sans-serif">周期顶：2013/2017/2021 均触 Band 9；底：2015/2018/2022 触 Band 1–3</text>
</svg>
:::

# 利益与激励

| 利益方 | 从彩虹图得到什么 | 如何扭曲 |
|---|---|---|
| 长期持有者 | 「时间+颜色站我这边」 | 忽视破带与再校准 |
| BlockchainCenter | 流量 king | Dynamic 仍可能再改 |
| 内容创作者 | 「进蓝带啦！」 | 隐藏 drift 基准 |
| 批评者 (Protos) | 「所有模型被摧毁」 | 忽视描述价值 |
| 交易所分析师 | 长线参考话术 | 不披露 in-sample |
| 你 | 一眼看冷热 | 把 meme 当 alpha |

# 资源与信息流

## 资金流与注意力抽水

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">彩虹叙事 · 资金流抽水图</text>
  <rect x="40" y="50" width="120" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="100" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">散户储蓄</text>
  <rect x="220" y="50" width="120" height="50" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="280" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">「蓝带抄底」</text>
  <rect x="400" y="50" width="120" height="50" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="460" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">BTC 现货</text>
  <rect x="220" y="150" width="120" height="50" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="280" y="178" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">图表站/课程</text>
  <rect x="400" y="150" width="120" height="50" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="460" y="178" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">交易手续费</text>
  <defs><marker id="rbP1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker></defs>
  <line x1="160" y1="75" x2="218" y2="75" stroke="#d5342c" stroke-width="1.5" marker-end="url(#rbP1)"/>
  <line x1="340" y1="75" x2="398" y2="75" stroke="#d5342c" stroke-width="1.5" marker-end="url(#rbP1)"/>
  <line x1="280" y1="100" x2="280" y2="148" stroke="#7c848f" stroke-width="1.2" marker-end="url(#rbP1)"/>
  <line x1="460" y1="100" x2="460" y2="148" stroke="#7c848f" stroke-width="1.2" marker-end="url(#rbP1)"/>
  <text x="14" y="230" font-size="10.5" fill="#7c848f" font-family="sans-serif">抽水点：把「第 4 带」包装成无风险底部；忽略 2022 破带与杠杆爆仓</text>
</svg>
:::

**信息源分级：**

| 级别 | 来源 | 可信度 |
|---|---|---|
| A | BlockchainCenter 方法论页 | 【事实】作者自述 |
| B | btcoak.com  nightly refit | 【分析】可复现 |
| C | Coin Bureau / ZipMex 教程 | 【分析】二手整合 |
| D | 「彩虹底必涨」社媒 | 【待验证】默认打折 |

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 为何关键 | 今日可做 |
|---|---|---|---|
| 1 | **算 δ 与带号** | 价→相对位置 | §06 定位器 |
| 2 | **读破带史** | 2022/2026 falsify | 建事件表 |
| 3 | **对照基准** | 剥离 drift | §16 漂移剥离器 |
| 4 | **比 V1/V2/Dynamic** | 看穿再校准 | §08 版本工具 |
| 5 | **禁止单带买卖** | 带可停留 2 年+ | 写进规则 |
| 6 | **walk-forward** | 真 OOS | 留 20% 样本 |
| 7 | **与 ETF/MVRV 交叉** | 解释偏离 | 双仪表盘 |
| 8 | **识 meme 起源** | 降维期望 | 读 Rohmeo 原文 |
| 9 | **带宽固定假设** | σ 制度变化 | 记录实现波动 |
| 10 | **仓位≤½-Kelly** | 彩虹≠确定性 | 风险预算 |

# 常见认知陷阱

:::details 陷阱 1 · 「九色带 = 九个精确目标价」
每带宽 **0.1 dex（≈26%）**，带内仍可有 **±30%** 波动【分析】。带是**区间**，不是点。
:::

:::details 陷阱 2 · 「R²=94% 所以必涨」
全样本 in-sample R²【分析】。2022 破带后才出 V2——**事后拟合永远好看**。
:::

:::details 陷阱 3 · 「进蓝带 = 安全底」
2022 **$16K** 击穿 Band 1；2026 **$62.5K** 再破 Dynamic 底【待验证】。**底可下移**。
:::

:::details 陷阱 4 · 「Eric Wall 推荐所以可信」
他用来**嘲讽** S2F【事实】——讽刺传播 ≠ 科学背书。
:::

:::details 陷阱 5 · 「V2 解决了过拟合」
V2 仍用全历史 refit【分析】；Dynamic 更频繁移动 goalpost。
:::

:::details 陷阱 6 · 「Band 9 = 必卖顶」
2021 在 Band 9 **停留数月**后才跌【事实】；timing 无效。
:::

:::details 陷阱 7 · 「彩虹 vs PLT 二选一」
数学同源（log 时间回归）【分析】；可同时「部分有用」。
:::

:::details 陷阱 8 · 「历史蓝带 100% 胜率」
未扣 drift（365 日基准 **82.3%**）；样本选择性【分析】。
:::

:::details 陷阱 9 · 「再校准 = 科学进步」
也可能是 **hindsight bias** 维持 meme 生命【分析】。
:::

:::details 陷阱 10 · 「Dynamic 永不过时」
每次新低/新高都改曲线——**falsifiability 下降**【推论】。
:::

:::details 陷阱 11 · 「颜色=客观估值」
标签是**人为幽默**（「Seriously, sell!」）【事实】，非市场共识。
:::

:::details 陷阱 12 · 「ETF 时代仍适用四年带」
机构化或弱化 boom-bust【待验证】——2024–2026 带号分布已变。
:::

# 从抽象到现实

| 抽象主张 | 现实映射 | 可观测指标 |
|---|---|---|
| log 减速增长 | 长期 CAGR 下降但仍正 | 5 年滚动 CAGR |
| 蓝带均值回归 | 2022–2026 低于 fair | δ 时间序列 |
| 红带=周期顶 | 2017/2021 触 Band 9 | 顶后 6 月回报 |
| 破带→再校准 | V2/Dynamic 发布 | 公式变更日志 |
| meme→工具 | 中文「彩虹底」热搜 | 搜索指数 |

# 从理论到行动

## 决策框架（非信号）

1. **定位**：算 δ → 若在带 1–3，属历史偏冷【推论】；**2026-09 带 4 属温和偏冷**。
2. **验证**：查 ETF 7 日 flow + MVRV——需求是否支撑回归。
3. **规模**：即使相信均值回归，仓位用 **½-Kelly** 或更低。
4. **falsify 条件**：若 δ < −0.35 持续 12 月且 ETF 净流出 → 下调模型权重。
5. **禁止**：单带梭哈、杠杆抄底、把 fair 当 guarantee。

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「蓝带策略」胜率必须减去随机持币基准（μ=50%/年，σ=65%/年）。</p>
<div class="ctrl"><label>策略胜率（%）<input type="range" id="rb_win" min="50" max="95" step="0.5" value="72"><output id="rb_winO">72.0%</output></label></div>
<div class="ctrl"><label>持有期（日）<input type="range" id="rb_hold" min="30" max="365" step="5" value="90"><output id="rb_holdO">90 日</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="rb_base">67.7%</strong><span id="rb_baseh">—</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="rb_excess">+4.3 pp</strong><span id="rb_excessh">—</span></div>
<div class="ro"><span class="k">所需样本量</span><strong id="rb_n">911</strong><span id="rb_nh">—</span></div>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="rb_v3">超额有限</strong><span id="rb_v3h">—</span></div>
</div>
</div>
:::

# 技能树

:::details L1 · 观察者
- [ ] 手算 t=6466 与 fair≈$145K
- [ ] 解释 δ 与带号
- [ ] 说出彩虹图与 S2F 的一个区别
:::

:::details L2 · 分析师
- [ ] 复述 2022 破带 → V2 链条
- [ ] 手算折价 34.5%
- [ ] 用漂移剥离器算 90 日超额
:::

:::details L3 · 建模者
- [ ] 比 V1/V2/Dynamic 三版带号
- [ ] 读 walk-forward vs in-sample 区别
- [ ] 写 Rohmeo「不是预测工具」引用
:::

:::details L4 · 系统设计者
- [ ] 建 δ+ETF 双仪表盘
- [ ] 禁止单带买卖规则
- [ ] 季度记录公式是否变更
:::

# 游戏化世界

**角色**：彩虹导航员（Rainbow Navigator）。等级越高，越不信单色信号，越会查破带史。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算 fair 误差 <2% | 解锁「回归层」 |
| Lv.2 | 向朋友解释 δ | 解锁「带定位器」 |
| Lv.3 | 列出 3 次破带事件 | 解锁「版本冲击器」 |
| Lv.4 | 连续 4 周记录带号 | 解锁「漂移剥离器」 |
| Lv.5 | 写「彩虹不能回答什么」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 收盘与带号 | 7 日表 |
| 每周 | 更新 fair 与 δ | §06 截图 |
| 每月 | 读一篇支持/批评文 | 3 行摘要 |
| 每季 | 核对公式是否变更 | 与 BlockchainCenter 差 <1% |
| 每年 | 对照破带日记 | 诚实记录 |

# 反事实模拟

:::tabs
@@情景 A · 若彩虹描述力持续
2026 带 4 偏冷，均值回归需 **+52%** 才回 fair【推论】。**时间不确定**——带 4 可停留 18+ 月（如 2018–2019）。

@@情景 B · 若 ETF 需求永久疲弱
δ 长期 <−0.25——**带整体下移**或频繁破带【假设】。Dynamic 曲线越改越低。

@@情景 C · 若仅 meme、无 alpha
带号与 drift 高度共线——彩虹只做 **情绪体温计**，不做交易圣杯【分析】。最可能中性结局。

@@情景 D · 若 2026 破带后放弃模型
社群转向 MVRV/ETF flow——彩虹退居「历史文物」【假设】。meme 生命周期结束。
:::

:::raw
<div class="tool">
<h3>工具 · 历史顶底落带分布</h3>
<p>拖动周期索引，看历次顶/底落在哪一带——理解「带号≠时点」。</p>
<div class="ctrl"><label>周期事件<input type="range" id="rb_evt" min="0" max="7" step="1" value="7"><output id="rb_evtO">2026-09 现货</output></label></div>
<div class="readout">
<div class="ro"><span class="k">事件价</span><strong id="rb_eprice">$95,000</strong><span id="rb_epriceh">—</span></div>
<div class="ro"><span class="k">当时带号</span><strong id="rb_eband">4</strong><span id="rb_ebandh">—</span></div>
<div class="ro"><span class="k">6 月后涨跌</span><strong id="rb_eret">—</strong><span id="rb_ereth">—</span></div>
<canvas id="rbHistChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="rb_v4">偏冷但未极端</strong><span id="rb_v4h">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会算带号** | 3 天 | t、fair、δ | 口算 $145K |
| **L2 会拆批评** | 1 周 | 破带+再校准 | 版本工具实操 |
| **L3 会验样本外** | 2 周 | walk-forward 思路 | 预测日志 |
| **L4 会建系统** | 1 月+ | δ+flow 仪表盘 | 禁单带买卖 |

# 30 分钟最小实践

**任务**：完成「彩虹三联检」——算、版、判。

1. **8 分钟 · 手算 fair**：t=6466，a=2.4612，b=−16.4337 → fair≈**$145,091**。
2. **7 分钟 · δ 与带号**：现货 $95,000 → δ=**−0.184**，带 **4**。
3. **8 分钟 · 版本冲击**：§08 切 V1，看中轴 **$1.02M** 与现货比值 **9.3%**。
4. **7 分钟 · 结论**：写三句话——(a) 你在哪带 (b) 一次破带史 (c) 一条批评。**禁止写「必涨回 fair」。**

**验证**：fair 与 §06 默认读数误差 **<1%**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 起源 | 读 Rohmeo 自述 + azop meme |
| D2 | 手算 | t/fair/δ/带号表 |
| D3 | 批评 | Protos + ZipMex 各 3 条 |
| D4 | 工具 | §06–§20 四个交互模型 |
| D5 | 对比 | 彩虹 vs PLT vs S2F 一页 |
| D6 | 破带 | 整理 2022/2026 事件 |
| D7 | 合成 | 「彩虹能/不能回答什么」 |

# 30 天能力构建计划

**Week 1**：公式 + 手算 + 九带概念（L1）
**Week 2**：破带史 + 版本冲击 + 漂移剥离（L2）
**Week 3**：in-sample/OOS 概念 + ETF 交叉（L3）
**Week 4**：个人 δ 仪表盘 + 破带日记（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **log 回归中轴** | log₁₀P=a·ln(t)+b | 共趋势 |
| 2 | **δ 偏移** | log₁₀(P/P_fair) | 忽略带宽 |
| 3 | **九带 0.1 dex** | 每带 ≈1.26× | 固定带宽 |
| 4 | **V1→V2→Dynamic** | 再校准链 | hindsight |
| 5 | **破带 falsify** | 2022/2026 | 再移动 goalpost |
| 6 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |
| 7 | **walk-forward** | 真 OOS | 比 R² 重要 |
| 8 | **meme 传播** | azop→Wall | 讽刺变带货 |
| 9 | **顶底落带** | Band 9/1–3 | timing 无效 |
| 10 | **ETF 制度冲击** | 四年周期弱化 | 未入方程 |

# 关键问题清单

:::details 模型
- 你用的 a,b 来自哪一版（V1/V2/Dynamic）？
- δ 处于哪一带？公式最近变过吗？
- 上次破带后模型怎么改的？
:::

:::details 机制
- 破带是价格错还是带错？
- ETF flow 能否解释当前 δ？
- walk-forward 跑过吗？
:::

:::details 风险
- 若 δ 再扩 −0.1，你扛得住吗？
- 杠杆抄底爆仓价在哪？
- 样本量够证「蓝带策略」吗？
:::

:::details 决策
- 你把 fair 当目标还是参考？
- 策略胜率扣过 drift 吗？
- 有书面 falsify 条件吗？
:::

# 下一阶段探索

1. **BlockchainCenter Dynamic 方法论**：R²=94.3% 的计算窗口与更新频率
2. **Bitbo HPR 变体**：减半锚定 vs 全样本回归对照
3. **与 MVRV/ETF 手册交叉**：本系列 § 其他 BTC 主题
4. **2028 破带 falsify 实验**：提前写下可接受 δ 区间
5. **中文社群「彩虹底」叙事审计**：统计帖 vs 基准

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 创世日 2009-01-03 | 协议 | Bitcoin 区块 | 【事实】 |
| azop 2014 meme | 社区 | Reddit | 【事实】 |
| trolololo 公式 | 论坛 | Bitcointalk 2014 | 【事实】 |
| V1 y=2.9065ln(x)−19.493 | 图表站 | BlockchainCenter | 【事实】 |
| V2 2022-11-21 | 图表站 | BlockchainCenter 公告 | 【事实】 |
| Dynamic R²=94.3% | 社区 | blockchaincenter_de Reddit 2026 | 【待验证】 |
| a=2.4612, b=−16.4337 | 复现 | btcoak.com 2026-09 | 【分析】 |
| 2022 底 $16,304 Band 1 | 市场 | CoinGecko 等 | 【待验证】 |
| 2026 破带 ~$62.5K | 媒体 | CoinDesk 2026-06 | 【待验证】 |
| Eric Wall 反 S2F | 媒体 | Twitter 2020 | 【事实】 |
| Protos「模型被摧毁」 | 媒体 | protos.com 2023 | 【分析】 |
| Rohmeo「不是预测工具」 | 作者 | BlockchainCenter FAQ | 【事实】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；彩虹图、对数回归带等长线工具**不保证**未来价格路径。作者与多方批评指出彩虹图存在 in-sample 拟合、破带后再校准与 hindsight bias——请勿依据带色进行杠杆交易或集中配置。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
