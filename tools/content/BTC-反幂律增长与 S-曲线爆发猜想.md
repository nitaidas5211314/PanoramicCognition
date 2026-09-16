---
slug: BTC-反幂律增长与 S-曲线爆发猜想
title: BTC-反幂律增长与 S-曲线爆发猜想
subtitle: 采用率按 <strong>N∝t^α</strong> 减速扩张而非饱和 S 曲线，但价格却在减半/ETF 窗口叠出局部爆发——2026 年双曲线资产渗透 <strong>18%</strong>、网络仅 <strong>5%</strong>，二者合成才是完整图景
brand_sub: Bitcoin × Power Law × S-Curve Burst
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, 反幂律, S曲线, 采用率, 爆发猜想]
theme_js_file: BTC-反幂律增长与 S-曲线爆发猜想.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**「反幂律增长」不是说 BTC 不涨，而是说采用率 N 按 `N∝t^α`（α≈1.2–1.8）扩张——增速随时间递减，但不设固定天花板，与 Bass/Gompertz S 曲线的「饱和平台」对立【分析】。** 「S-曲线爆发猜想」则主张：在幂律底噪上，减半、ETF、主权储备等事件叠出**局部 S 形跃迁**，三层 sigmoid 堆叠在样本内与 `P∝t^5.69` 几乎不可区分【分析】。

2026-09-16：网络年龄 **6465 天**；幂律公允价 **$143,925**，现货 **~$95,000**（折价 **34.0%**）【待验证】。资产叙事渗透约 **18%**（早期大众），支付网络约 **5%**（创新者边缘）【推论】——**两条 S 曲线不同步，才是「爆发」与「平台」并存的钥匙。**

# 这个领域到底是什么

## 一句话定位

本主题研究的是：**比特币长期增长究竟更像「永不饱和的减速幂律」，还是「多层嵌套的 S 曲线爆发」？** 它把 Santostasi 的 PLT（价格∝时间幂律）、Athey 等人的 Gompertz 病毒模型、Michael Levin 的「双采用曲线」，以及 arXiv 2605.21316 的 sigmoid 堆叠判别检验，放进同一操作框架。

:::note red 先划清边界
「反幂律」≠ 看空 BTC。「爆发猜想」≠ 保证下轮暴涨。本手册**不提供**买卖点，只帮你分辨：**哪条曲线在说话、爆发窗口是否已关闭、统计上能否区分幂律与 S 曲线。**
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 采用率幂律 vs S 曲线饱和；局部爆发窗口；双曲线（资产/网络）合成 |
| 2 | 边界在哪 | 不含短线技术指标；不预测监管黑天鹅；不替代仓位管理 |
| 3 | 核心对象 | N(t)、P(t)、爆发相位 φ、渗透率 p、堆叠 sigmoid 权重 |
| 4 | 参与者 | Santostasi、Athey、Levin、Pecere、ETF 发行人、主权买家、矿工 |
| 5 | 关键变量 | α、β、K（饱和上限）、r（扩散速率）、减半相位、ETF flow |
| 6 | 可观察的 | 活跃地址、ETF 持仓、算力、价格、减半日历 |
| 7 | 不可观察但可推断 | 真实持有人数（含托管）、长期支付意愿、主权战略储备规模 |
| 8 | 谁影响谁 | 资产叙事→价格→网络开发；减半→供给冲击→爆发叙事 |
| 9 | 因果 | 难度调整抑制 S 曲线饱和=【分析】；爆发→价格=【推论】；因果方向未完全确立【待验证】 |
| 10 | 只是相关 | 地址数与价格、时间与价格、减半与涨幅均强相关 |
| 11 | 表层现象 | 四年一轮暴涨、ETF 后波动收窄、log-log 直线 |
| 12 | 底层机制 | 网络效应 + 供给递减 + 制度接纳的阶段性跃迁 |
| 13 | 反馈 | 涨价→FOMO→采用加速（正）；监管→恐慌→爆发夭折（负） |
| 14 | 时间延迟 | 减半到价格顶中位 **~18 月**【待验证】；ETF 效应 **6–12 月**【待验证】 |
| 15 | 正负反馈 | 正：叙事强化→机构入场；负：高渗透→边际买家枯竭【假设】 |

## 核心公式对照

| 模型 | 表达式 | 2026 年读数【待验证/推论】 |
|---|---|---|
| **采用幂律** | N ∝ t^α | α≈**1.5** → 相对渗透代理 **74.5**（归一化） |
| **价格幂律** | P = A·t^β | β=**5.69** → fair **$143,925** |
| **Logistic S** | N = K/(1+e^{−r(t−t₀)}) | K=10⁹ 时渗透 **96.8%**【推论】——与链上观测矛盾 |
| **Gompertz** | N = K·e^{−e^{−r(t−t₀)}} | 90% 饱和约在 **2060**【推论】 |
| **三层 sigmoid 堆叠** | P ∝ Σ wᵢ·σᵢ(t) | 样本内 adj≈**0.948**，与 PL 价差 **<6%**【分析】 |
| **反幂律增速** | g(t) ∝ t^{−γ} | γ≈**0.3** → 有效 α≈**0.70**（更慢）【假设】 |
| **Metcalfe 合成** | P∝N^β_M, N∝t^α | β_M≈1.84 → 合成 β≈**2.76**，低于价格 β【分析】 |

# 为什么值得研究

## 理由一：2026 是「模型选边」窗口

arXiv 2605.21316 结论尖锐：**视觉上的 log-log 直线，既不能证明结构幂律，也不能排除多层 sigmoid【分析】**。ETF 时代波动 σ 从 **0.395→0.211 dex**（压缩 **47%**）——爆发幅度变小，**更需要分曲线读渗透，而不是单条 S 曲线判顶【推论】。**

## 理由二：双曲线错位解释「资产热、支付冷」

| 曲线 | 2026 渗透【推论】 | 所处阶段 | 含义 |
|---|---|---|---|
| **BTC 资产**（储值） | **~18%** | 早期大众 | ETF/主权叙事驱动 |
| **BTC 网络**（支付） | **~5%** | 创新者→早期采用 | 闪电/L2 仍边缘 |
| **合成** | **~12%** | 早期采用中段 | 整体仍早，但**子曲线不同步** |

Levin 框架【分析】：资产曲线可**拉动**网络曲线，但不必等网络饱和才涨价——这直接挑战「单一 S 曲线判顶」。

## 理由三：对照基准剥离「爆发胜率」幻觉

μ=**50%/年**、σ=**65%/年** 时，随机持币基准胜率：

| 持有期 | 基准胜率 | 「爆发窗口 72% 胜率」真实超额 | 证明超额所需 n |
|---|---|---|---|
| 30 日 | **60.5%** | +11.5 pp | ~**280** |
| 90 日 | **67.7%** | +4.3 pp | ~**906** |
| 180 日 | **74.2%** | −2.2 pp（跑输） | — |
| 365 日 | **82.3%** | −10.3 pp（跑输） | — |

**爆发叙事在短持有期看似有效，拉长后常被正漂移吞噬【分析】。**

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从幂律底噪，到局部爆发

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">反幂律 × S-爆发 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">上层=慢变量底噪 · 下层=快变量爆发与叙事</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 协议层</text>
  <text x="120" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">2100 万上限 · 难度调整 · 每 10 分钟一块【事实】</text>
  <text x="120" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：分叉/升级改变规则（极少）</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 反幂律采用层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">N∝t^α · α≈1.2–1.8 · 增速递减但无固定 K【分析】</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">失效：地址≠用户 · ETF 托管扭曲计数</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 价格幂律层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">P∝t^5.69 · fair $144K · 长程 rangefinder【分析】</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">失效：与 sigmoid 堆叠样本内不可分</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ S-曲线饱和层</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">Gompertz/Logistic · Athey 病毒模型 · K=全球人口子集【分析】</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：BTC 跨国界 · 托管账户重复计数</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 双采用曲线层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">资产 18% vs 网络 5% · 波浪式互推【推论】</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：渗透定义主观 · 无官方统计</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 爆发窗口层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">减半后 ~18 月 · ETF 上市 · 主权储备新闻【待验证】</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">失效：2024 减半后顶延迟/低于预期</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 统计判别层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">CSN 尾部分布 · sigmoid 堆叠 · walk-forward OOS【分析】</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">结论：弱结构、强预测（12–24 月）· 短端输给 naive</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 制度摩擦层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">监管 · 托管 · 税务 · 能源叙事【事实/分析】</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">摩擦=抑制因子，使纯 S 曲线难以封顶</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">分曲线读渗透 · 爆发相位表 · 禁止单曲线判顶</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">合成框架：底噪幂律 + 局部 S 爆发 + 双曲线错位</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">反幂律 × S-爆发 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 减速扩张无顶</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 局部相变爆发</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 双曲线错位</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 模型不可辨识</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 难度→算力反馈</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 减半供给冲击</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• ETF 边际买家</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• Metcalfe 超线性</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 算 α 与渗透</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 读减半相位</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 对比 PL vs S</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 爆发窗口清单</text>
  <defs><marker id="iplA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="214" y1="120" x2="238" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#iplA)"/>
  <line x1="440" y1="120" x2="464" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#iplA)"/>
</svg>
:::

## 跨域同构

| 本主题结构 | 其他领域 | 共同数学 |
|---|---|---|
| N∝t^α 反饱和 | 城市规模律、公司营收 | 超线性缩放 · 慢尾巴 |
| 局部 S 爆发 | 技术采用 Bass 模型 | 创新者→大众跃迁 |
| 双曲线错位 | 5G 网络 vs 5G 应用 | 基础设施先于使用场景 |
| sigmoid 堆叠≈幂律 | 深度学习激活叠加 | 多组分曲线拟合不可辨识 |
| 减半周期爆发 | 农产品季节性 | 供给冲击 + 预期前置 |
| 波动 σ 压缩 | 成熟股票隐波下降 | 制度化降低振幅 |

# 核心参与者

| 参与者 | 立场 | 激励扭曲 |
|---|---|---|
| **Giovanni Santostasi** | 反 S 曲线：难度调整→幂律【分析】 | 著作与 PLT 声誉 |
| **Susan Athey et al.** | Gompertz 病毒式传播【分析】 | 学术模型简洁性 |
| **Michael Levin** | 双采用曲线（资产/网络）【分析】 | 风投叙事 |
| **Andrea Pecere** | 博弈均衡→幂律非 S【分析】 | 理论统一野心 |
| **arXiv 2605.21316 作者** | 幂律弱结构、强预测【分析】 | 方法论中立 |
| **ETF 发行人** | 借用「早期渗透」叙事 | AUM 费用 |
| **主权/企业储备买家** | 触发资产曲线跃迁【待验证】 | 地缘多元化 |
| **批评者（Stolte/Morris）** | 模型不可交易【分析】 | 差异化研究 |
| **你** | 读者/投资者 | 爆发确认偏误 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证/推论】 |
|---|---|---|
| **t** | 创世以来天数 | **6465** |
| **α** | 采用幂律指数 | **1.5**（区间 1.2–1.8） |
| **β** | 价格幂律指数 | **5.69** |
| **P_fair** | A·t^β | **$143,925** |
| **P_spot** | 现货 | **~$95,000** |
| **p_asset** | 资产叙事渗透率 | **~18%**【推论】 |
| **p_network** | 支付网络渗透率 | **~5%**【推论】 |
| **φ_halving** | 减半后月数 | 2024-04 减半 → **~17 月** |
| **σ_burst** | 爆发期实现波动 | 高于 σ_cycle=**0.211 dex**【待验证】 |
| **K_gompertz** | Gompertz 饱和上限 | 10⁹ 用户 → 90% 在 **2060**【推论】 |

:::raw
<div class="tool">
<h3>工具 · 采用幂律 vs S 曲线对比器</h3>
<p>调节采用指数 α 与 Logistic 参数，看 17.7 年（6465 天）处谁更接近「现实渗透」。</p>
<div class="ctrl"><label>幂律指数 α<input type="range" id="ipl_alpha" min="0.8" max="2.2" step="0.1" value="1.5"><output id="ipl_alphaO">1.5</output></label></div>
<div class="ctrl"><label>Logistic 扩散 r<input type="range" id="ipl_r" min="0.1" max="0.6" step="0.05" value="0.35"><output id="ipl_rO">0.35</output></label></div>
<div class="ctrl"><label>拐点年 t₀<input type="range" id="ipl_t0" min="4" max="14" step="0.5" value="8"><output id="ipl_t0O">8</output></label></div>
<div class="readout">
<div class="ro"><span class="k">幂律渗透代理</span><strong id="ipl_plPen">74.5</strong><span id="ipl_plPenh">N∝t^α 归一化</span></div>
<div class="ro"><span class="k">Logistic 渗透</span><strong id="ipl_logPen">96.8%</strong><span id="ipl_logPenh">K=10⁹ 用户</span></div>
<div class="ro"><span class="k">相对增速比 PL/S</span><strong id="ipl_ratio">7.5×</strong><span id="ipl_ratioh">PL 仍更快扩张</span></div>
<canvas id="iplAdoptChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ipl_v1">反幂律占优</strong><span id="ipl_v1h">—</span></div>
</div>
</div>
:::

# 因果关系

## 实线因果与虚线反馈

:::raw
<svg viewBox="0 0 680 340" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">因果图（实线=主张 · 红虚线=反馈/争议）</text>
  <rect x="30" y="50" width="100" height="40" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="80" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">时间 t</text>
  <rect x="160" y="50" width="100" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="210" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">采用 N</text>
  <rect x="290" y="50" width="100" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="340" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">网络价值</text>
  <rect x="420" y="50" width="100" height="40" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="470" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">价格 P</text>
  <rect x="550" y="50" width="100" height="40" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="600" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">爆发事件</text>
  <defs><marker id="iplC1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="130" y1="70" x2="158" y2="70" stroke="#454c56" stroke-width="1.2" marker-end="url(#iplC1)"/>
  <line x1="260" y1="70" x2="288" y2="70" stroke="#454c56" stroke-width="1.2" marker-end="url(#iplC1)"/>
  <line x1="390" y1="70" x2="418" y2="70" stroke="#454c56" stroke-width="1.2" marker-end="url(#iplC1)"/>
  <line x1="80" y1="90" x2="470" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#iplC1)"/>
  <text x="260" y="115" font-size="9" fill="#454c56" font-family="sans-serif">P∝t^β 直接通道</text>
  <line x1="600" y1="90" x2="470" y2="120" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#iplC1)"/>
  <text x="540" y="145" font-size="9" fill="#d5342c" font-family="sans-serif">减半/ETF→跃迁</text>
  <line x1="470" y1="90" x2="210" y2="130" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#iplC1)"/>
  <text x="320" y="155" font-size="9" fill="#d5342c" font-family="sans-serif">涨价→FOMO→采用</text>
  <rect x="30" y="180" width="130" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="95" y="204" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">难度调整</text>
  <rect x="190" y="180" width="130" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="255" y="204" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">监管摩擦</text>
  <rect x="350" y="180" width="130" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="415" y="204" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">托管/ETF</text>
  <line x1="95" y1="180" x2="210" y2="90" stroke="#0f8a4d" stroke-width="1.1" marker-end="url(#iplC1)"/>
  <text x="120" y="175" font-size="9" fill="#0f8a4d" font-family="sans-serif">抑制 S 饱和</text>
  <line x1="415" y1="180" x2="340" y2="90" stroke="#7c848f" stroke-width="1.1" marker-end="url(#iplC1)"/>
  <text x="14" y="260" font-size="10.5" fill="#7c848f" font-family="sans-serif">核心争议：爆发是独立因果，还是幂律底噪上的残差波动？</text>
  <text x="14" y="280" font-size="10.5" fill="#7c848f" font-family="sans-serif">Granger 检验：地址→价格 与 价格→地址 方向未完全确立【待验证】</text>
</svg>
:::

**三条因果链：**

1. **t → N → P**（反幂律派）：采用按 t^α 扩张，Metcalfe 放大到价格【分析】。
2. **事件 → 局部 S → P**（爆发派）：减半/ETF 在短窗内制造 logistic 跃迁【推论】。
3. **资产曲线 → 网络曲线**（双曲线派）：储值叙事先走，支付场景滞后【分析】。

# 隐藏关系

| 隐藏关系 | 表面看 | 实际机制 |
|---|---|---|
| 「S 曲线快饱和」 | Logistic 96%+ | K 设太大/地址重复计数【分析】 |
| 「幂律永远涨」 | fair 2045 **$8.17M** | β 漂移 + 爆发幅度压缩【推论】 |
| 「减半必暴涨」 | 历史四次 | 2024 周期顶延迟/偏低【待验证】 |
| 「ETF=新 S 拐点」 | 2024 1 月上市 | 价格已 PRE-run，后续 flow 减弱【待验证】 |
| 两模型对立 | PL vs S 二选一 | sigmoid 堆叠样本内等价【分析】 |
| 渗透 18% | 还很早 | 仅资产曲线；网络 5% 拖累支付叙事【推论】 |

:::raw
<div class="tool">
<h3>工具 · 双采用曲线模拟器</h3>
<p>资产曲线与网络曲线渗透不同步时，「整体 S 曲线」落在哪一段？</p>
<div class="ctrl"><label>资产渗透（%）<input type="range" id="ipl_asset" min="5" max="40" step="1" value="18"><output id="ipl_assetO">18%</output></label></div>
<div class="ctrl"><label>网络渗透（%）<input type="range" id="ipl_net" min="1" max="25" step="1" value="5"><output id="ipl_netO">5%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">合成渗透</span><strong id="ipl_syn">12.8%</strong><span id="ipl_synh">加权平均（资产 0.6 + 网络 0.4）</span></div>
<div class="ro"><span class="k">错位度</span><strong id="ipl_gap">13 pp</strong><span id="ipl_gaph">资产领先网络</span></div>
<div class="ro"><span class="k">Rogers 阶段</span><strong id="ipl_stage">早期采用</strong><span id="ipl_stageh">—</span></div>
<canvas id="iplDualChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ipl_v2">双曲线错位</strong><span id="ipl_v2h">—</span></div>
</div>
</div>
:::

# 系统运行机制

## 合成框架如何运转

```text
每日 → 更新 t、地址/ETF 数据
     → 轨道 A：算 N_pl = t^α 与渗透代理
     → 轨道 B：标定局部 sigmoid 相位（减半月数 φ、ETF 上市日）
     → 轨道 C：读双曲线 p_asset、p_network
     → 合成：底噪 fair = A·t^β；爆发溢价 = f(φ, flow)
     → 决策：只在「爆发窗开启 + 折价 dex」叠加时提高观察频率——不是自动买入
```

**关键节奏：**

| 节奏 | 周期 | 驱动 | 2026 状态 |
|---|---|---|---|
| 幂律底噪 | 年 | t 递增 | fair 日上移 **0.04%** |
| 减半爆发 | ~4 年 | 供给冲击 | 2024 后 **~17 月**，顶未确认【待验证】 |
| ETF 脉冲 | 季 | 机构 flow | 波动收窄【待验证】 |
| 主权新闻 | 不定 | 资产曲线跃迁 | 零星【待验证】 |

## PL vs S：谁在下指令？

| 维度 | 反幂律（N∝t^α） | S 曲线（Logistic） | 2026 证据【分析/推论】 |
|---|---|---|---|
| 长期形状 | 无顶减速 | 趋近 K | 地址仍扩张 → 反饱和 |
| 短期预测 | 弱（1–3 月） | 拐点附近较强 | 爆发窗仍有效 |
| 可辨识性 | 与 sigmoid 堆叠难分 | 同左 | arXiv 2605.21316 |
| 操作含义 | 长跑仓位逻辑 | 波段爆发逻辑 | **需合成** |

# 时间演化

## 演化时间轴

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">反幂律 × S-爆发 · 演化时间轴</text>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="70" cy="110" r="5" fill="#1d4ed8"/><text x="70" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2009</text><text x="70" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">创世</text>
  <circle cx="150" cy="110" r="5" fill="#1d4ed8"/><text x="150" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2012</text><text x="150" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">减半1·爆发</text>
  <circle cx="230" cy="110" r="5" fill="#b8730a"/><text x="230" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2016</text><text x="230" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">减半2</text>
  <circle cx="310" cy="110" r="5" fill="#b8730a"/><text x="310" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2020</text><text x="310" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">减半3·DeFi</text>
  <circle cx="400" cy="110" r="6" fill="#d5342c"/><text x="400" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2024</text><text x="400" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">ETF+减半4</text>
  <circle cx="500" cy="110" r="6" fill="#d5342c"/><text x="500" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2026</text><text x="500" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">顶未确认</text>
  <circle cx="590" cy="110" r="5" fill="#0f8a4d"/><text x="590" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2028</text><text x="590" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">减半5?</text>
  <path d="M 150 110 Q 200 70 250 110" fill="none" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="4,3"/>
  <path d="M 310 110 Q 360 65 410 110" fill="none" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="4,3"/>
  <text x="14" y="165" font-size="10" fill="#7c848f" font-family="sans-serif">红弧=历史爆发窗口（减半后 12–24 月）· 2024–2026 弧度偏低【待验证】</text>
  <text x="14" y="185" font-size="10" fill="#7c848f" font-family="sans-serif">α：1.2→1.5→? · σ：0.395→0.211 dex（爆发幅度收敛）</text>
  <text x="14" y="205" font-size="10" fill="#7c848f" font-family="sans-serif">Gompertz 90% 饱和：~2060【推论】——与「永不饱和幂律」并存张力</text>
</svg>
:::

## 四阶段合成史

| 阶段 | 年代 | 主导模型 | 特征 |
|---|---|---|---|
| 病毒期 | 2009–2013 | S 曲线萌芽 | 极陡爆发、无机构 |
| 幂律显现 | 2014–2019 | log-log 直线 | Burger 走廊、与 S 争论起 |
| 双曲线分化 | 2020–2023 | 资产>>网络 | 机构储值 vs 支付停滞 |
| 不可辨识期 | 2024– | PL vs sigmoid 堆叠 | ETF 波动压缩、预测更难 |

# 利益与激励

| 利益方 | 从「爆发猜想」得到什么 | 扭曲方式 |
|---|---|---|
| 长期持有者 | 「还早，18%」 | 忽视网络曲线滞后 |
| 交易员 | 减半日历波段 | 过拟合四次样本 |
| ETF 营销 | 「机构 S 拐点」 | 不提 PRE-run |
| 学术 PL 派 | 长跑 rangefinder | 淡化 OOS 短端失效 |
| 学术 S 派 | 可饱和叙事 | K 难估、地址失真 |
| 批评者 | 「都不可交易」 | 忽视 12–24 月 RMSE 优势【分析】 |

# 资源与信息流

## 资金流与注意力抽水

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">S-爆发叙事 · 资金流抽水图</text>
  <rect x="40" y="50" width="110" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="95" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">散户 FOMO</text>
  <rect x="190" y="50" width="120" height="48" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="250" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">「减半爆发」</text>
  <rect x="350" y="50" width="110" height="48" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="405" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">杠杆多头</text>
  <rect x="490" y="50" width="110" height="48" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="545" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">ETF 做市商</text>
  <rect x="190" y="140" width="120" height="48" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="250" y="168" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">KOL/课程</text>
  <rect x="350" y="140" width="110" height="48" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="405" y="168" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">交易所</text>
  <defs><marker id="iplP1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker></defs>
  <line x1="150" y1="74" x2="188" y2="74" stroke="#d5342c" stroke-width="1.5" marker-end="url(#iplP1)"/>
  <line x1="310" y1="74" x2="348" y2="74" stroke="#d5342c" stroke-width="1.5" marker-end="url(#iplP1)"/>
  <line x1="460" y1="74" x2="488" y2="74" stroke="#7c848f" stroke-width="1.2" marker-end="url(#iplP1)"/>
  <line x1="250" y1="98" x2="250" y2="138" stroke="#7c848f" stroke-width="1.2" marker-end="url(#iplP1)"/>
  <line x1="405" y1="98" x2="405" y2="138" stroke="#7c848f" stroke-width="1.2" marker-end="url(#iplP1)"/>
  <text x="14" y="230" font-size="10.5" fill="#7c848f" font-family="sans-serif">抽水点：把「四次减半都涨」包装成第五次必涨；忽视 2024–2026 低弧度</text>
</svg>
:::

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 为何关键 | 今日可做 |
|---|---|---|---|
| 1 | **分曲线读渗透** | 避免单 S 曲线误判 | §08 双曲线工具 |
| 2 | **减半相位表** | 爆发窗开启/关闭 | §10 爆发计时器 |
| 3 | **PL vs S 对比** | 识破模型营销 | §06 对比器 |
| 4 | **对照基准** | 爆发胜率去漂移 | §16 漂移剥离 |
| 5 | **sigmoid 堆叠意识** | 理解不可辨识 | 读 arXiv 摘要 |
| 6 | **dex + 相位叠加** | 折价区≠自动买 | 双条件清单 |
| 7 | **σ 压缩跟踪** | 爆发幅度变小 | 波动周记 |
| 8 | **ETF flow 交叉** | 资产曲线燃料 | 周度记录 |
| 9 | **Granger 方向** | N→P 还是 P→N | 查论文表 |
| 10 | **书面 falsify** | 2028 减半检验 | 预测日志 |

# 常见认知陷阱

:::details 陷阱 1 · 「S 曲线快满了」
用 K=全球人口设 Logistic 会得到 96%+ 渗透【推论】——**地址≠人，托管重复计数**。反幂律派：难度调整让「天花板」不断上移【分析】。
:::

:::details 陷阱 2 · 「幂律 = 物理定律」
log-log 直线 + 三层 sigmoid **样本内等价**【分析】。要问 walk-forward，不问 R²。
:::

:::details 陷阱 3 · 「减半第五次必暴涨」
n=**4** 次事件，统计无力【分析】；2024 周期已显示**低弧度**【待验证】。
:::

:::details 陷阱 4 · 「18% 还很早 = 必涨」
仅资产曲线；网络 **5%** 拖累支付叙事。早期大众≠无回撤【推论】。
:::

:::details 陷阱 5 · 「爆发胜率 72%」
90 日基准 **67.7%** → 真实超额仅 **+4.3 pp**，需 n≈**906**【分析】。
:::

:::details 陷阱 6 · 「ETF = 新 S 拐点」
上市前已 PRE-run；后续 flow 可负【待验证】。
:::

:::details 陷阱 7 · 「Gompertz 2060 饱和」
与幂律无顶**逻辑冲突**——可能两模型各对一段【分析】。
:::

:::details 陷阱 8 · 「双曲线=两倍机会」
错位也可能=**叙事分裂**（储值牛、支付熊）【假设】。
:::

:::details 陷阱 9 · 「折价 34% + 爆发窗 = 无风险」
2022 更深折价，杠杆者仍爆仓【事实】。
:::

:::details 陷阱 10 · 「α 是常数」
ETF 扭曲地址；α 可漂 **1.2→1.8**【待验证】。
:::

:::details 陷阱 11 · 「短窗 PL 失效 = 模型死了」
arXiv：PL 在 **12–24 月** RMSE 最低【分析】——**时间尺度匹配**。
:::

:::details 陷阱 12 · 「合成框架=万事通」
不可辨识时，** humility + 仓位上限** 比精确拟合更重要【推论】。
:::

# 从抽象到现实

| 抽象主张 | 现实映射 | 可观测指标 |
|---|---|---|
| N∝t^1.5 | 地址/算力长期上升 | 年化地址增速 |
| 局部 S 爆发 | 减半后 12–24 月 | 减半月数 φ |
| 双曲线错位 | ETF 持仓↑、支付占比低 | ETF AUM vs 链上支付量 |
| σ 压缩 | 波动下降 | 60 日实现波动 |
| 不可辨识 | 多模型同价区 | walk-forward 日志 |

# 从理论到行动

## 决策框架（非信号）

1. **分曲线**：资产渗透 vs 网络渗透各写一档【推论】。
2. **标相位**：减半后月数 φ；ETF 上市后天数。
3. **叠条件**：仅当 dex<−0.15 **且** φ∈[12,24] 月 → 提高观察频率（非自动买）。
4. **规模**：爆发押注 ≤ **½-Kelly**；Kelly（p=65%, b=2.5）≈**51%** → 上限 **~25%**【推论】。
5. **falsify**：若 2028 减半后 24 月仍 dex<−0.20 → 下调爆发假设权重。

:::raw
<div class="tool">
<h3>工具 · 减半爆发相位计时器</h3>
<p>2024-04 减半为锚，观察历史爆发窗（12–24 月）与当前相位。</p>
<div class="ctrl"><label>减半后月数 φ<input type="range" id="ipl_phi" min="0" max="36" step="1" value="17"><output id="ipl_phiO">17 月</output></label></div>
<div class="ctrl"><label>历史爆发幅度乘数<input type="range" id="ipl_boost" min="1.5" max="4" step="0.1" value="2.5"><output id="ipl_boostO">2.5×</output></label></div>
<div class="readout">
<div class="ro"><span class="k">相位判定</span><strong id="ipl_phase">爆发中段</strong><span id="ipl_phaseh">12–24 月历史主窗</span></div>
<div class="ro"><span class="k">隐含目标价</span><strong id="ipl_target">$239,813</strong><span id="ipl_targeth">fair × boost（示意）</span></div>
<div class="ro"><span class="k">现货差距</span><strong id="ipl_gapP">−60.4%</strong><span id="ipl_gapPh">相对隐含目标</span></div>
<canvas id="iplBurstChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ipl_v3">窗内但未达标</strong><span id="ipl_v3h">—</span></div>
</div>
</div>
:::

# 技能树

:::details L1 · 观察者
- [ ] 说出反幂律 vs S 饱和的一个区别
- [ ] 读出资产 18% / 网络 5% 错位
- [ ] 找到 2024 减半日期
:::

:::details L2 · 分析师
- [ ] 手算 t^1.5 渗透代理
- [ ] 解释减半相位 17 月含义
- [ ] 用漂移剥离器算爆发超额
:::

:::details L3 · 建模者
- [ ] 跑 PL vs S 对比器
- [ ] 读 arXiv sigmoid 堆叠结论
- [ ] 写 2024 低弧度摘要
:::

:::details L4 · 系统设计者
- [ ] 建双曲线+相位仪表盘
- [ ] 2028 falsify 清单
- [ ] 禁止「第五次必涨」规则
:::

# 游戏化世界

**角色**：曲线合成师（Curve Synthesist）。同时驾驭幂律底噪与 S 爆发脉冲。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 区分 PL 与 Logistic | 解锁「对比器」 |
| Lv.2 | 标定减半 φ | 解锁「相位计时器」 |
| Lv.3 | 双曲线错位>10pp 解读 | 解锁「漂移剥离」 |
| Lv.4 | 连续 4 周记录相位+dex | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 φ 与 dex | 7 日表 |
| 每周 | ETF flow + 实现波动 | 截图 |
| 每月 | 更新 α 估计 | 与上月比 |
| 每季 | 读支持/批评各 1 篇 | 3 行摘要 |
| 每减半 | 写下爆发可接受区间 | 2028 对照 |

# 反事实模拟

:::tabs
@@情景 A · 若反幂律成立、无局部爆发
价格紧贴 fair 线，年化波动低。2026 现货 $95K 接近 fair $144K 的 **−34%** 折价将逐步收敛——**时间不确定**【推论】。

@@情景 B · 若 S 爆发主导
2024–2026 应见 **2.5×** fair 脉冲 → 目标 **~$240K**【推论】。现货未达 → **2024 爆发假说 partially falsified**【待验证】。

@@情景 C · 若双曲线持续错位
资产渗透→30%，网络仍<15%：价格可涨，支付叙事疲软【假设】。「数字黄金」成立、「全球货币」延期。

@@情景 D · 若仅不可辨识、无 alpha
PL 与 sigmoid 堆叠 OOS 均不 beat buy-and-hold——框架只做**风险地图**【分析】。最中性结局。
:::

:::raw
<div class="tool">
<h3>工具 · 爆发胜率漂移剥离器</h3>
<p>「减半爆发策略」胜率必须减去随机持币基准（μ=50%/年，σ=65%/年）。</p>
<div class="ctrl"><label>策略胜率（%）<input type="range" id="ipl_win" min="50" max="95" step="0.5" value="72"><output id="ipl_winO">72.0%</output></label></div>
<div class="ctrl"><label>持有期（日）<input type="range" id="ipl_hold" min="30" max="365" step="5" value="90"><output id="ipl_holdO">90 日</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="ipl_base">67.7%</strong><span id="ipl_baseh">μ=50%/年 · σ=65%/年</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="ipl_excess">+4.3 pp</strong><span id="ipl_excessh">—</span></div>
<div class="ro"><span class="k">所需样本量</span><strong id="ipl_n">906</strong><span id="ipl_nh">证明超额非随机（双侧）</span></div>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="ipl_v4">超额有限</strong><span id="ipl_v4h">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会分曲线** | 3 天 | 资产 vs 网络 | 口算 18%/5% |
| **L2 会标相位** | 1 周 | φ 与爆发窗 | 计时器实操 |
| **L3 会拆胜率** | 2 周 | 漂移剥离 | n≈906 手算 |
| **L4 会建系统** | 1 月+ | 双曲线+相位+dex 盘 | 2028 falsify |

# 30 分钟最小实践

**任务**：「双曲线三联检」——分、相、剥。

1. **8 分钟 · 分曲线**：§08 设资产 18%、网络 5%，读合成 **12.8%** 与错位 **13 pp**。
2. **7 分钟 · 标相位**：§16 减半计时器 φ=**17** → 判定「爆发中段」；隐含目标 **~$240K** vs 现货 **$95K**。
3. **8 分钟 · 对比模型**：§06 α=1.5 vs Logistic → PL 增速仍为 S 的 **~7.5×**【推论】。
4. **7 分钟 · 剥漂移**：§20 胜率 72%、90 日 → 超额 **+4.3 pp**，n≈**906**。

**验证**：合成渗透与 §08 默认读数误差 **<0.5 pp**；超额与 §20 一致。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 定义 | 读 Levin 双曲线 + Santostasi 反 S |
| D2 | 手算 | t^α、fair、dex 表 |
| D3 | 批评 | arXiv 2605.21316 摘要 |
| D4 | 工具 | §06–§20 四个交互模型 |
| D5 | 历史 | 四次减半弧度对比 |
| D6 | 2024 | 低弧度案例摘要 |
| D7 | 合成 | 「底噪+爆发」一页结论 |

# 30 天能力构建计划

**Week 1**：反幂律公式 + 双曲线 + dex（L1）
**Week 2**：减半相位 + PL vs S + 漂移剥离（L2）
**Week 3**：sigmoid 堆叠 + ETF 交叉 + σ 压缩（L3）
**Week 4**：个人仪表盘 + 2028 falsify 日志（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **N∝t^α** | 反饱和采用 | 地址≠用户 |
| 2 | **Logistic S** | 局部爆发 | K 难定 |
| 3 | **Gompertz** | 病毒式增长 | 2060 饱和与幂律冲突 |
| 4 | **双采用曲线** | 资产/网络错位 | 渗透主观 |
| 5 | **P∝t^β** | 价格底噪 | 与 sigmoid 不可分 |
| 6 | **sigmoid 堆叠** | 多相位合成 | 过拟合 |
| 7 | **减半相位 φ** | 爆发日历 | n=4 太弱 |
| 8 | **dex 偏离** | 折价深度 | 非买入信号 |
| 9 | **对照基准** | 漂移剥离 | μ,σ 敏感 |
| 10 | **walk-forward** | 真 OOS | 比 in-sample 重要 |

# 关键问题清单

:::details 模型
- 你看的是哪条曲线（资产/网络/合成）？
- α 与 β 来源？是否 OOS？
- PL 与 sigmoid 堆叠能否区分？
:::

:::details 爆发
- 当前 φ 在 12–24 月窗内吗？
- 2024 低弧度如何解释？
- 爆发幅度是否随 σ 压缩下降？
:::

:::details 风险
- 折价 + 杠杆爆仓价？
- 爆发胜率扣过 drift 吗？
- 2028 falsify 条件写了吗？
:::

:::details 决策
- 仓位是否 ≤½-Kelly？
- 是否把「18% 还早」当 guarantee？
- 网络 5% 滞后是否纳入？
:::

# 下一阶段探索

1. **arXiv 2605.21316 全文**：sigmoid 堆叠 vs PL 判别协议
2. **Athey et al. SSRN 3356098**：Gompertz 与 Metcalfe 推导
3. **Pecere 幂律博弈论文**：为何均衡产生 t^α 而非 S
4. **Levin 双曲线系列**：资产/网络渗透操作化
5. **2028 减半 falsify 实验**：提前写 dex、φ、涨幅可接受区间

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 创世日 2009-01-03 | 协议 | Bitcoin 区块 | 【事实】 |
| β=5.69, fair $144K | 论文 | Santostasi & Perrenod 2026 | 【分析】 |
| sigmoid 堆叠不可分 | 论文 | arXiv 2605.21316 | 【分析】 |
| Gompertz/病毒模型 | 学术 | Athey et al. SSRN 3356098 | 【分析】 |
| 双采用曲线 | 行业 | Michael Levin Medium | 【分析】 |
| 幂律博弈均衡 | 学术 | Pecere / BBR Issue #21 | 【分析】 |
| α≈1.2–1.8 | 研究 | 链上地址/算力拟合 | 【待验证】 |
| 2026 现货 ~$95K | 市场 | CoinGecko 等 | 【待验证】 |
| ETF 2024-01 上市 | 监管 | SEC 批准 | 【事实】 |
| 2024-04 第四次减半 | 协议 | Bitcoin 区块高度 | 【事实】 |
| S2F 与 log(time) 相关 80.6% | 论文 | Shelton 2024 | 【分析】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；反幂律增长、S-曲线爆发、减半波段等叙事**不保证**未来价格路径。学术研究表明幂律与 sigmoid 堆叠在样本内不可辨识，爆发策略胜率需扣除随机持币基准。请勿依据单一曲线或减半日历进行杠杆交易。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
