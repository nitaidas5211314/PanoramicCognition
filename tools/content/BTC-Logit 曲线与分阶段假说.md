---
slug: BTC-Logit 曲线与分阶段假说
title: BTC-Logit 曲线与分阶段假说
subtitle: 把累积采用率做 <strong>logit 线性化</strong> 后，Rogers 五阶段不再是口号——2026 年机构子曲线渗透 <strong>48.8%</strong>、合成 <strong>27.7%</strong>，单条 Logistic 在 <strong>17.7</strong> 年处已近饱和
brand_sub: Bitcoin × Logit × Phased Adoption
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, Logit, Logistic, Rogers, 分阶段假说]
theme_js_file: BTC-Logit 曲线与分阶段假说.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**Logit 曲线 = 对累积采用率做 `logit(p)=ln(p/(1−p))` 后，S 形扩散在图上变成近似直线——这是 Rudd-Porter 供需框架、Bass 扩散模型和 Rogers 分阶段假说的共同数学底座【分析】。** 2026-09-16：网络年龄 **17.71 年**；若用单条 Logistic（L_min=0.04、T*=18）读数，区间渗透已达 **95.4%**——**明显过高**【推论】。分阶段假说更合理：零售相 **13.2%** 近饱和，**2020 起机构相**渗透 **48.8%**（Rogers **晚期大众**中段），加权合成 **27.7%**【推论】——ETF 不是「新 S 曲线起点」，而是**第二条 logistic 的拐点邻域**。

# 这个领域到底是什么

## 一句话定位

本主题研究：**如何用 logit 变换把 BTC 采用率拆成可估计、可分段、可对照的阶段假说**——而不是再画一条好看的 S 曲线。核心工具链：Logistic 累积函数 → logit 线性化 → Rogers 百分位分界 → 多相 logistic 堆叠（零售 / 机构 / 主权）→ Rudd `A′(t)` 需求乘数。

:::note red 先划清边界
「分阶段」≠ 保证下一段必涨。「logit 直线」≠ 价格直线——**价格还叠了供给稀缺、流动性和投机残差**。本手册**不提供**买卖点，只帮你回答：**当前落在哪一段 logistic、参数是否过饱和、阶段叙事有没有统计超额。**
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | logit 线性化、Rogers 阶段映射、多相 logistic、Rudd A′(t) |
| 2 | 边界在哪 | 不含短线技术指标；不预测监管黑天鹅；不替代仓位管理 |
| 3 | 核心对象 | p(t)、logit(p)、阶段边界、L_min/T*、Bass p/q |
| 4 | 参与者 | Rudd & Porter、Rogers、Bass、ETF 发行人、顾问渠道、主权买家 |
| 5 | 关键变量 | L_min、T*、b（logit 斜率）、τ（拐点）、D、ρ |
| 6 | 可观察的 | ETF AUM、顾问配置比例、链上活跃地址、现货 flow |
| 7 | 不可观察但可推断 | 真实持有人（含托管）、各阶段边际买家弹性 |
| 8 | 谁影响谁 | 监管清晰→机构相 b 增大；涨价→FOMO→零售相尾部 |
| 9 | 因果 | logit 线性段→可预测采用增速=【分析】；阶段→价格=【推论】 |
| 10 | 只是相关 | 地址增长与价格、ETF flow 与波动均强相关 |
| 11 | 表层现象 | 「ETF=机构元年」、四年周期钝化、波动压缩 |
| 12 | 底层机制 | 扩散方程 + 网络效应 + 供给无弹性 |
| 13 | 反馈 | 机构入场→合法性→零售跟进（正）；高渗透→logit 平台（负） |
| 14 | 时间延迟 | ETF 批准到 flow 峰值 **6–12 月**【待验证】；顾问配置滞后 **1–2 年**【待验证】 |
| 15 | 正负反馈 | 正：监管→ETF→顾问；负：logit 近饱和→dA/dt→0 |

## 核心公式对照

| 模型 | 表达式 | 2026 年读数【待验证/推论】 |
|---|---|---|
| **Logistic 累积** | A(t)=L_min+(L_max−L_min)/(1+e^{−b(t−τ)}) | L_min=0.04,T*=18 → A=**91.6%**（过高） |
| **Logit 变换** | ℓ=logit(A)=ln(A/(1−A)) | 机构相 A=0.355 → ℓ=**−0.60** |
| **10%→90% 窗** | t_{k}=τ−ln(1/k−1)/b | **2.7–15.3 年**（T*=18） |
| **Bass 扩散** | f/(1−F)=p+qF | p=0.03,q=0.38 → t*=**6.19 年** |
| **Rudd A′** | A′(t)=D·A(t) | D=20,A=0.277 → A′=**5.54** |
| **双相合成** | 0.35·零售+0.65·机构 | 合成 **27.7%**【推论】 |
| **Rogers 映射** | 百分位阶段分界 | 机构相 **48.8%**→**晚期大众** |

# 为什么值得研究

## 理由一：单条 Logistic 在 2026 年已「数学饱和」

Rudd-Porter 默认 L_min=0.05、T*=14【分析】：到 **17.71 年**区间渗透 **98.8%**——与「ETF 才刚开始」的叙事矛盾。**不是模型错了，是用法错了**：BTC 至少有两条独立 logistic（零售 / 机构）【推论】。logit 变换的第一功用，就是**一眼识别「是否该换相」**。

## 理由二：阶段边界是百分位约定，不是自然定律

Findings (2025) 指出：Rogers 的「涌现→快速增长→成熟」边界，本质是 **logistic 百分位窗口的人为约定**——10%–90%、15%–85%、拐点切线对应 **11.92%–88.08%** 不等【分析】。把 ETF 上市当「t=0 新曲线」，必须**显式声明**你用的是哪条百分位规则——否则无法与他人对表。

## 理由三：对照基准剥离「阶段择时」幻觉

μ=**50%/年**、σ=**65%/年** 时，随机持币基准胜率：

| 持有期 | 基准胜率 | 「阶段策略 71% 胜率」真实超额 | 证明超额所需 n |
|---|---|---|---|
| 30 日 | **60.5%** | +10.5 pp | ~**320** |
| 90 日 | **67.7%** | +3.3 pp | ~**1559** |
| 180 日 | **74.2%** | −3.2 pp（跑输） | — |
| 365 日 | **82.3%** | −11.3 pp（跑输） | — |

**短窗「阶段超额」常被正漂移吞噬【分析】。**

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 logit 变换，到分阶段假说

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">Logit × 分阶段 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">上层=数学骨架 · 下层=BTC 制度演化与决策</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 数学层</text>
  <text x="108" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">logit ↔ logistic 互逆 · b=斜率 · τ=拐点【事实】</text>
  <text x="108" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：p→0/1 时 logit 发散，须 clamp</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② Rogers 阶段层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">2.5/13.5/34/68% 百分位分界【分析】</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">失效：跨国别渗透不同步</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 零售相 Logistic</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">2009–2020 · A→13.2% 近饱和【推论】</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">失效：早期地址≠用户</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 机构相 Logistic</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">2020– · ETF/顾问 · 区间渗透 48.8%【推论】</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">失效：flow 可逆（净流出）</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ Bass 创新/模仿层</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">p=创新系数 · q=口碑 · t*=6.19 年【分析】</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">失效：q 随监管突变</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ Rudd 供需层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">A′(t)=D·A(t) · L_min/T* 定形【分析】</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">失效：D 无客观校准</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 价格残差层</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">采用≠价格 · 流动性/杠杆/情绪【分析】</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">短端 Metcalfe 弱成立【待验证】</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ 制度摩擦层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">SEC ETF 2024-01 · 顾问配置 2%【事实/待验证】</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">摩擦改变 b 但不改变 logit 形状</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">先判单/多相 · 再读 logit 斜率 · 最后扣 drift</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">禁止把 95% 单曲线渗透当「还早」</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">Logit × 分阶段 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• logit 直线化</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 百分位阶段</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 多相 logistic</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• A′ 需求放大</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• ETF 渠道扩容</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 顾问口碑 q</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 托管降低摩擦</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 流动性溢价</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#c6dcc9" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 画 logit–t 图</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 标 Rogers 阶段</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 拆零售/机构相</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 扣 drift 胜率</text>
  <defs><marker id="bltA" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="214" y1="120" x2="238" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#bltA)"/>
  <line x1="440" y1="120" x2="464" y2="120" stroke="#454c56" stroke-width="1.2" marker-end="url(#bltA)"/>
</svg>
:::

## 跨域同构

| 本主题结构 | 其他领域 | 共同数学 |
|---|---|---|
| logit 线性化 | 流行病学感染率、Hubbert 油气 | 累积 S 曲线 → 直线拟合 |
| Rogers 百分位阶段 | 5G 基站部署、疫苗接种 | 人为分界 ≠ 物理拐点 |
| Bass p/q | 消费品扩散、App 下载 | 创新者 vs 模仿者 |
| 多相 logistic | 多波疫情、技术换代 | 相位叠加/切换 |
| Rudd A′(t) | 新兴市场渗透率乘数 | 需求曲线平移 |
| logit 平台 | 债券收益率饱和 | 边际增速→0 |

# 核心参与者

| 参与者 | 立场 | 激励扭曲 |
|---|---|---|
| **Rudd & Porter** | 单 logistic A(t) 嵌入供需【分析】 | 学术模型简洁 |
| **Rogers (1962)** | 五阶段扩散理论【事实】 | 边界是约定 |
| **Frank Bass** | p/q 分解创新模仿【分析】 | 参数时变 |
| **BlackRock/ETF 发行人** | 「机构元年」叙事 | AUM 费用 |
| **财务顾问** | 2% 配置建议【待验证】 | 合规>收益 |
| **Chainalysis** | 全球采用指数 + 机构子指数【分析】 | 数据付费 |
| **Blockware** | 四年周期结束论【分析】 | 研究品牌 |
| **批评者** | 地址≠采用、单曲线过饱和【分析】 | 差异化 |
| **你** | 读者/投资者 | 阶段确认偏误 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证/推论】 |
|---|---|---|
| **t** | 创世以来年数 | **17.71** |
| **L_min** | logistic 下限（起步渗透） | Rudd 默认 **0.04–0.05** |
| **T*** | 至饱和年数 | **14–18 年**（模型参数） |
| **b** | logit 斜率 | T*=18,L_min=0.04 → **0.366** |
| **τ** | 拐点 T*/2 | **9.0 年**（约 2018） |
| **p_inst** | 机构相区间渗透 | **48.8%**【推论】 |
| **A_synth** | 双相合成采用 | **27.7%**【推论】 |
| **D** | Rudd 需求乘数 | **10–100**（情景） |
| **ETF AUM** | 美国现货 ETF 规模 | **~$120–180B**【待验证】 |

:::raw
<div class="tool">
<h3>工具 · Logit 线性化器</h3>
<p>调节 L_min 与 T*，观察 logit(A) 是否仍在中窗保持直线——单曲线近饱和时应切换分阶段模型。</p>
<div class="ctrl"><label>L_min<input type="range" id="blt_lmin" min="0.01" max="0.08" step="0.01" value="0.04"><output id="blt_lminO">0.04</output></label></div>
<div class="ctrl"><label>T*（饱和年数）<input type="range" id="blt_tstar" min="10" max="22" step="1" value="18"><output id="blt_tstarO">18 年</output></label></div>
<div class="readout">
<div class="ro"><span class="k">logit 斜率 b</span><strong id="blt_slope">0.366</strong><span id="blt_slopeh">拐点 τ=9.0 年</span></div>
<div class="ro"><span class="k">当前 logit(A)</span><strong id="blt_logitNow">2.35</strong><span id="blt_logitNowh">—</span></div>
<div class="ro"><span class="k">中窗 R²</span><strong id="blt_r2">0.992</strong><span id="blt_r2h">10%→90% 时间窗</span></div>
<canvas id="bltLogitChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="blt_v1">单曲线近饱和</strong><span id="blt_v1h">—</span></div>
</div>
</div>
:::

# 因果关系

## 实线因果与虚线反馈

:::raw
<svg viewBox="0 0 680 340" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">因果图（实线=主张 · 红虚线=反馈/争议）</text>
  <rect x="30" y="50" width="100" height="40" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="80" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">制度事件</text>
  <rect x="160" y="50" width="100" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="210" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">相切换</text>
  <rect x="290" y="50" width="100" height="40" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="340" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">logit 斜率 b</text>
  <rect x="420" y="50" width="100" height="40" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="470" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">A′(t)</text>
  <rect x="550" y="50" width="100" height="40" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="600" y="74" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">价格 P</text>
  <defs><marker id="bltC1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker></defs>
  <line x1="130" y1="70" x2="158" y2="70" stroke="#454c56" stroke-width="1.2" marker-end="url(#bltC1)"/>
  <line x1="260" y1="70" x2="288" y2="70" stroke="#454c56" stroke-width="1.2" marker-end="url(#bltC1)"/>
  <line x1="390" y1="70" x2="418" y2="70" stroke="#454c56" stroke-width="1.2" marker-end="url(#bltC1)"/>
  <line x1="520" y1="70" x2="548" y2="70" stroke="#454c56" stroke-width="1.2" marker-end="url(#bltC1)"/>
  <line x1="470" y1="90" x2="340" y2="130" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#bltC1)"/>
  <text x="400" y="125" font-size="9" fill="#d5342c" font-family="sans-serif">涨价→FOMO</text>
  <line x1="600" y1="90" x2="210" y2="130" stroke="#d5342c" stroke-width="1.2" stroke-dasharray="5,4" marker-end="url(#bltC1)"/>
  <text x="400" y="145" font-size="9" fill="#d5342c" font-family="sans-serif">财富效应→顾问推荐</text>
  <rect x="30" y="180" width="130" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="95" y="204" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">监管/ETF</text>
  <rect x="190" y="180" width="130" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="255" y="204" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">托管基础设施</text>
  <rect x="350" y="180" width="130" height="40" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="415" y="204" text-anchor="middle" font-size="10" fill="#15181d" font-family="sans-serif">杠杆投机</text>
  <line x1="95" y1="180" x2="210" y2="90" stroke="#0f8a4d" stroke-width="1.1" marker-end="url(#bltC1)"/>
  <text x="120" y="175" font-size="9" fill="#0f8a4d" font-family="sans-serif">抬升机构相 b</text>
  <line x1="415" y1="180" x2="470" y2="90" stroke="#7c848f" stroke-width="1.1" marker-end="url(#bltC1)"/>
  <text x="14" y="260" font-size="10.5" fill="#7c848f" font-family="sans-serif">核心争议：A′(t) 因果驱动价格，还是价格反向塑造 A(t)？【待验证】</text>
  <text x="14" y="280" font-size="10.5" fill="#7c848f" font-family="sans-serif">ETF 研究：政府因素 β=0.409、机构中介 β=0.298 显著【分析】</text>
</svg>
:::

**三条因果链：**

1. **制度→相切换→b 增大**（分阶段派）：ETF 批准打开机构相，logit 进入新线性段【分析】。
2. **A′(t)→P**（Rudd 派）：需求乘数 × 流动性比率^1/ρ 定均衡价【分析】。
3. **P→A**（反馈派）：涨价驱动 FOMO 与顾问配置——**双向 Granger 未完全确立**【待验证】。

# 隐藏关系

| 隐藏关系 | 表面看 | 实际机制 |
|---|---|---|
| 「ETF=第 5 阶段起点」 | 2024 新叙事 | 机构相 2020 已启动，ETF 是 **b 放大器**【推论】 |
| 「logit 还陡」 | 价格应暴涨 | 机构相 dA/dt 年化仅 **~5%**【推论】 |
| 「单曲线 95%」 | 快饱和 | 参数 L_min/T* 设定问题，非链上事实【分析】 |
| 「顾问 2%」 | 渗透很低 | 2%×可投资资产池 >> 当前 ETF 规模【推论】 |
| 「波动压缩」 | 风险消失 | 相对自身历史压缩，相对股票仍高【分析】 |
| Bass t*=6.2 年 | 与 17 年矛盾 | Bass 是**单产品周期**，不是全史【分析】 |

:::raw
<div class="tool">
<h3>工具 · Rogers 分阶段映射器</h3>
<p>拖动累计渗透率，对照 Rogers 1962 五阶段百分位边界，并读出对应 logit(p)。</p>
<div class="ctrl"><label>累计渗透（%）<input type="range" id="blt_pen" min="1" max="80" step="0.5" value="48.8"><output id="blt_penO">48.8%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">Rogers 阶段</span><strong id="blt_stage">晚期大众</strong><span id="blt_stageh">—</span></div>
<div class="ro"><span class="k">下一阶段</span><strong id="blt_next">落后者</strong><span id="blt_nexth">距下一阶段 19.2 pp</span></div>
<div class="ro"><span class="k">logit(p)</span><strong id="blt_logitPen">-0.05</strong><span id="blt_logitPenh">—</span></div>
<canvas id="bltRogersChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="blt_v2">晚期大众加速区</strong><span id="blt_v2h">—</span></div>
</div>
</div>
:::

# 系统运行机制

## 分阶段假说如何运转

```text
每日/每周 → 更新 ETF flow、顾问调研、地址代理
         → 步骤1：单曲线 logit–t 图 → 是否近饱和？
         → 步骤2：若饱和 → 拆零售相/机构相，各自标定 L0,L1,T
         → 步骤3：读机构相 Rogers 阶段 + logit 斜率 b
         → 步骤4：A′=D·A_synth → 对照 Rudd 价格带（非精确预测）
         → 步骤5：任何「阶段胜率」扣 drift → 样本量门槛
```

**关键节奏：**

| 节奏 | 周期 | 驱动 | 2026 状态 |
|---|---|---|---|
| 零售相 | 2009–2020 | 口碑/挖矿/交易所 | **近饱和 ~13%**【推论】 |
| 机构相 | 2020– | ETF/顾问/国库 | **区间 48.8%**【推论】 |
| logit 斜率 | 年 | b·A(1−A) | 机构相仍正但递减 |
| 价格残差 | 日–月 | 杠杆/情绪 | 与 A′ 经常背离【待验证】 |

## 单相 vs 多相：决策分叉

| 维度 | 单条 Logistic | 分阶段 Logistic | 2026 读数 |
|---|---|---|---|
| 17.7 年渗透 | **95%+** | 合成 **27.7%** | 多相更贴近叙事 |
| logit 可用性 | 平台区，b 失真 | 机构相仍在线性窗 | 宜用多相 |
| 数据需求 | 低 | 高（需分渠道） | ETF 数据可部分代理 |
| 犯错模式 | 「还早」误判 | 参数过多过拟合 |  humility |

# 时间演化

## 演化时间轴

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">Logit × 分阶段 · 演化时间轴</text>
  <line x1="40" y1="110" x2="640" y2="110" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="70" cy="110" r="5" fill="#b8730a"/><text x="70" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2009</text><text x="70" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">零售相 t₀</text>
  <circle cx="180" cy="110" r="5" fill="#b8730a"/><text x="180" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2013</text><text x="180" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">logit 陡升</text>
  <circle cx="280" cy="110" r="5" fill="#b8730a"/><text x="280" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2017</text><text x="280" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">零售拐点</text>
  <circle cx="380" cy="110" r="6" fill="#1d4ed8"/><text x="380" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2020</text><text x="380" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">机构相启动</text>
  <circle cx="460" cy="110" r="6" fill="#1d4ed8"/><text x="460" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2024</text><text x="460" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">ETF·b 跳升</text>
  <circle cx="540" cy="110" r="6" fill="#d5342c"/><text x="540" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2026</text><text x="540" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">机构 48.8%</text>
  <circle cx="610" cy="110" r="5" fill="#0f8a4d"/><text x="610" y="92" text-anchor="middle" font-size="9" fill="#454c56" font-family="sans-serif">2032</text><text x="610" y="130" text-anchor="middle" font-size="8" fill="#7c848f" font-family="sans-serif">机构相 τ?</text>
  <path d="M 70 110 Q 180 60 280 110" fill="none" stroke="#b8730a" stroke-width="1.5"/>
  <path d="M 380 110 Q 470 65 540 110" fill="none" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="14" y="165" font-size="10" fill="#7c848f" font-family="sans-serif">橙=零售相 logistic · 蓝=机构相 logistic · 2024 ETF 抬升 b 而非重置 t₀【推论】</text>
  <text x="14" y="185" font-size="10" fill="#7c848f" font-family="sans-serif">10%→90% 主窗（T*=18）：2.7–15.3 年 · 零售相已走完</text>
  <text x="14" y="205" font-size="10" fill="#7c848f" font-family="sans-serif">Bass t*=6.19 年 ≈ 单次产品扩散，不可外推全史</text>
</svg>
:::

## 四阶段假说（操作版）

| 阶段 | 年代 | Rogers | logit 特征 | 边际买家 |
|---|---|---|---|---|
| **P0 密码朋克** | 2009–2012 | 创新者 | logit 极低 | 矿工/极客 |
| **P1 零售扩散** | 2013–2019 | 早期采用→大众 | b 最大 | 交易所散户 |
| **P2 机构管道** | 2020–2023 | 早期大众 | 新相 b 重建 | 对冲基金/家族办 |
| **P3 ETF 大众化** | 2024– | 晚期大众 | b 仍正但递减 | 顾问/退休账户【推论】 |

# 利益与激励

| 利益方 | 从「分阶段」得到什么 | 扭曲方式 |
|---|---|---|
| ETF 发行人 | 「P3 才刚开始」 | 忽视 P2 已走 4 年 |
| 顾问渠道 | 2% 配置故事 | 合规慢于叙事 |
| 长期持有者 | 「合成才 27%」 | 忽视参数主观 |
| 学术 Rudd 派 | 可发表供需模型 | D 无客观锚 |
| 批评者 | 「全不可证」 | 忽视 logit 诊断价值 |
| 媒体 | 「机构元年」标题 | 单相/多相混用 |

# 资源与信息流

## 资金流与注意力抽水

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">分阶段叙事 · 资金流抽水图</text>
  <rect x="40" y="50" width="110" height="48" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="95" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">散户 FOMO</text>
  <rect x="190" y="50" width="120" height="48" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="250" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">「ETF 元年」</text>
  <rect x="350" y="50" width="110" height="48" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="405" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">阶段择时课</text>
  <rect x="490" y="50" width="110" height="48" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="545" y="78" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">ETF 做市商</text>
  <rect x="190" y="140" width="120" height="48" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="250" y="168" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">研究订阅</text>
  <rect x="350" y="140" width="110" height="48" rx="8" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.3"/>
  <text x="405" y="168" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">交易所</text>
  <defs><marker id="bltP1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker></defs>
  <line x1="150" y1="74" x2="188" y2="74" stroke="#d5342c" stroke-width="1.5" marker-end="url(#bltP1)"/>
  <line x1="310" y1="74" x2="348" y2="74" stroke="#d5342c" stroke-width="1.5" marker-end="url(#bltP1)"/>
  <line x1="460" y1="74" x2="488" y2="74" stroke="#7c848f" stroke-width="1.2" marker-end="url(#bltP1)"/>
  <line x1="250" y1="98" x2="250" y2="138" stroke="#7c848f" stroke-width="1.2" marker-end="url(#bltP1)"/>
  <text x="14" y="230" font-size="10.5" fill="#7c848f" font-family="sans-serif">抽水点：把「单曲线 95%」与「合成 27%」选择性混用，制造「永远还早」或「永远太晚」</text>
</svg>
:::

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 为何关键 | 今日可做 |
|---|---|---|---|
| 1 | **logit–t 诊断** | 单/多相分叉 | §06 线性化器 |
| 2 | **Rogers 百分位** | 阶段对表 | §08 映射器 |
| 3 | **零售/机构拆相** | 修正饱和幻觉 | §12 双相合成 |
| 4 | **10%–90% 时间窗** | 参数可解释 | 读 t10/t90 |
| 5 | **A′=D·A** | 连接供需 | §12 D 滑块 |
| 6 | **drift 剥离** | 阶段胜率验真 | §20 测算器 |
| 7 | **ETF flow 代理** | 机构相观测 | 周度记录 |
| 8 | **b 衰减监控** | 预判平台 | dA/dt 日记 |
| 9 | **Bass p/q 对照** | 防混淆周期 | 区分产品/全史 |
| 10 | **书面 falsify** | 2032 机构 τ | 预测日志 |

# 常见认知陷阱

:::details 陷阱 1 · 「一条 S 曲线读到底」
L_min=0.04,T*=18 → 17.7 年处 **95.4%**【推论】。这不是 BTC「快满了」，是**模型设定错了相**【分析】。
:::

:::details 陷阱 2 · 「logit 直线 = 价格直线」
logit 只线性化**采用率**，价格还叠流动性稀缺与投机【分析】。Rudd 框架里 P∝A′^(1/ρ)【分析】。
:::

:::details 陷阱 3 · 「ETF=全新 Rogers 创新者阶段」
ETF 是机构相（2020 起）的 **b 跳升**，不是从零开始【推论】。P2 已走 ~6 年。
:::

:::details 陷阱 4 · 「Rogers 边界是自然规律」
10%–90%、15%–85% 都是**百分位约定**【分析】。对表时必须声明规则。
:::

:::details 陷阱 5 · 「阶段策略 71% 胜率」
90 日基准 **67.7%** → 超额仅 **+3.3 pp**，n≈**1559**【分析】。
:::

:::details 陷阱 6 · 「Bass t*=6 年证明还早」
Bass t* 是**单次产品扩散峰值时间**，不是创世至饱和【分析】。不可外推。
:::

:::details 陷阱 7 · 「机构 48.8% = 全局 48.8%」
48.8% 是**机构子曲线区间渗透**，合成仅 **27.7%**【推论】。
:::

:::details 陷阱 8 · 「logit 越大越好」
logit 高意味着 p 接近 1——**增速反而放缓**【事实】。看 b·p(1−p)。
:::

:::details 陷阱 9 · 「A′=20 就能算精确价格」
D 是情景参数【分析】；流动性、ρ 同样敏感。Rudd 是**框架**不是水晶球。
:::

:::details 陷阱 10 · 「波动压缩 = 阶段失效」
Blockware：相对自身历史压缩，非相对股票【分析】。机构相可「低波动上涨」。
:::

:::details 陷阱 11 · 「地址增长 = 采用」
托管重复计数、ETF 不增地址【事实】。机构相需用 **AUM/顾问配置** 代理。
:::

:::details 陷阱 12 · 「分阶段 = 万事通」
参数翻倍 → 过拟合风险。**单相 logit 诊断 + 多相 humility** 更稳【推论】。
:::

# 从抽象到现实

| 抽象主张 | 现实映射 | 可观测指标 |
|---|---|---|
| logit 线性段 | ETF 净流入稳定期 | 周度 net flow |
| 机构相 48.8% | 顾问推荐 20%×2% | PlanAdviser 调研【待验证】 |
| 零售相饱和 | 交易所散户占比降 | CEX 零售 flow |
| b 衰减 | 采用增速放缓 | dA/dt 季度估算 |
| A′ 跳升 | 主权/企业储备新闻 | 公开持仓公告 |

# 从理论到行动

## 决策框架（非信号）

1. **诊断**：画单曲线 logit–t → 近饱和则拆相。
2. **映射**：机构子曲线读 Rogers 阶段（默认 **48.8%**）。
3. **合成**：0.35·零售 + 0.65·机构 → **27.7%** 基准【推论】。
4. **对照**：任何阶段择时胜率扣 drift（§20）。
5. **falsify**：若 2032 机构相渗透 <60% 且 ETF flow 连续 3 季净流出 → 下调 b 估计。

:::raw
<div class="tool">
<h3>工具 · 双阶段 Logistic 合成器</h3>
<p>零售相（2009–2020）与机构相（2020–）分别标定，合成采用率并乘以 Rudd 需求因子 D。</p>
<div class="ctrl"><label>机构相 T*（年）<input type="range" id="blt_instT" min="8" max="18" step="1" value="14"><output id="blt_instTO">14 年</output></label></div>
<div class="ctrl"><label>需求乘数 D<input type="range" id="blt_dMult" min="5" max="40" step="1" value="20"><output id="blt_dMultO">×20</output></label></div>
<div class="readout">
<div class="ro"><span class="k">零售相 A</span><strong id="blt_retailA">13.2%</strong><span id="blt_retailAh">近饱和</span></div>
<div class="ro"><span class="k">机构相 A</span><strong id="blt_instA">35.5%</strong><span id="blt_instAh">区间渗透 48.8%</span></div>
<div class="ro"><span class="k">合成 A</span><strong id="blt_synthA">27.7%</strong><span id="blt_synthAh">A′≈5.54（×D）</span></div>
<canvas id="bltDualChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="blt_v3">机构相中段</strong><span id="blt_v3h">—</span></div>
</div>
</div>
:::

# 技能树

:::details L1 · 观察者
- [ ] 写出 logit(p) 公式
- [ ] 说出 Rogers 五个阶段名
- [ ] 辨认单曲线过饱和症状
:::

:::details L2 · 分析师
- [ ] 手算 10%–90% 时间窗
- [ ] 解释零售/机构拆相理由
- [ ] 用 drift 剥离器读超额
:::

:::details L3 · 建模者
- [ ] 跑通四个交互工具
- [ ] 读 Rudd MDPI 2025 摘要
- [ ] 标定机构相 L0,L1,T
:::

:::details L4 · 系统设计者
- [ ] 建 logit–t + Rogers 仪表盘
- [ ] 2032 falsify 清单
- [ ] 禁止混用单/合成渗透
:::

# 游戏化世界

**角色**：相位判读师（Phase Reader）。在 logit 直线与 Rogers 百分位之间导航。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 画 logit–t 识别平台 | 解锁「线性化器」 |
| Lv.2 | 标 Rogers 阶段 | 解锁「映射器」 |
| Lv.3 | 拆零售/机构双相 | 解锁「合成器」 |
| Lv.4 | 连续 4 周记录 b 与 flow | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 ETF net flow | 5 日表 |
| 每周 | 更新机构相渗透估计 | 与上周比 |
| 每月 | 重画 logit–t | 是否需拆相 |
| 每季 | 读 Rudd/Chainalysis 各 1 份 | 3 行摘要 |
| 每年 | 对照 Rogers 阶段迁移 | 阶段是否跳档 |

# 反事实模拟

:::tabs
@@情景 A · 若坚持单曲线 L_min=0.04,T*=18
17.7 年处渗透 **95.4%** → logit 进入平台，结论「快饱和」——与 ETF 叙事冲突，**迫使你放弃单相**【推论】。

@@情景 B · 若分阶段成立、机构相 T*=14
当前机构区间 **48.8%**（晚期大众），合成 **27.7%**——「还早」但**增速已递减**（dA/dt≈5%/年）【推论】。价格路径温和上行，非爆发【假设】。

@@情景 C · 若 ETF flow 2026–2027 持续净流出
机构相 b 转负，logit 曲线弯折——**P3 假说 falsified**【假设】。价格更多回归流动性/情绪驱动。

@@情景 D · 若顾问配置从 2%→5%
机构相 L1 上调，合成渗透跳升 **~8 pp**——logit 斜率短期再陡，A′ 跳升【推论】。制度变量>D 叙事。
:::

:::raw
<div class="tool">
<h3>工具 · 阶段择时胜率漂移剥离器</h3>
<p>「按 Rogers 阶段择时」的胜率必须减去随机持币基准（μ=50%/年，σ=65%/年）。</p>
<div class="ctrl"><label>策略胜率（%）<input type="range" id="blt_win" min="50" max="95" step="0.5" value="71"><output id="blt_winO">71.0%</output></label></div>
<div class="ctrl"><label>持有期（日）<input type="range" id="blt_hold" min="30" max="365" step="5" value="90"><output id="blt_holdO">90 日</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="blt_base">67.7%</strong><span id="blt_baseh">μ=50%/年 · σ=65%/年</span></div>
<div class="ro"><span class="k">真实超额</span><strong id="blt_excess">+3.3 pp</strong><span id="blt_excessh">—</span></div>
<div class="ro"><span class="k">所需样本量</span><strong id="blt_n">1559</strong><span id="blt_nh">证明超额非随机（双侧）</span></div>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="blt_v4">超额有限</strong><span id="blt_v4h">—</span></div>
</div>
</div>
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会 logit** | 3 天 | 画 logit–t、识平台 | 口算 logit(0.35) |
| **L2 会分相** | 1 周 | 零售/机构拆相 | 合成 27.7% |
| **L3 会映射** | 2 周 | Rogers + Rudd A′ | 机构 48.8% 阶段 |
| **L4 会建系统** | 1 月+ | 仪表盘 + falsify | 2032 检验 |

# 30 分钟最小实践

**任务**：「logit 三联检」——线性、映射、剥离。

1. **10 分钟 · logit 诊断**：§06 设 L_min=0.04、T*=18 → 读区间渗透 **95.4%** → 判定「单曲线近饱和，需拆相」。
2. **8 分钟 · Rogers 映射**：§08 渗透 **48.8%** → 阶段「晚期大众」，距落后者 **19.2 pp**。
3. **7 分钟 · 双相合成**：§16 默认 → 合成 **27.7%**，A′≈**5.54**（D=20）。
4. **5 分钟 · drift 剥离**：§20 胜率 71%、90 日 → 超额 **+3.3 pp**，n≈**1559**。

**验证**：合成渗透与 §16 默认读数误差 **<0.5 pp**；超额与 §20 一致。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | logit 数学 | 推导 logit↔logistic |
| D2 | Rogers | 五阶段百分位表 |
| D3 | Rudd | 读 MDPI 2025 摘要 |
| D4 | 工具 | §06–§20 四个模型 |
| D5 | 历史 | 标 2009/2020/2024 三相 |
| D6 | 数据 | ETF AUM + 顾问调研 |
| D7 | 合成 | 一页「单相 vs 多相」结论 |

# 30 天能力构建计划

**Week 1**：logit 公式 + Rogers 映射 + 单曲线诊断（L1）
**Week 2**：零售/机构拆相 + Rudd A′ + 10%–90% 窗（L2）
**Week 3**：ETF flow 代理 + b 衰减 + Bass 对照（L3）
**Week 4**：个人仪表盘 + 2032 falsify 日志（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **logit 变换** | S 曲线变直线 | p→0/1 发散 |
| 2 | **Logistic 累积** | A(t) 饱和 | 单相过饱和 |
| 3 | **Rogers 五阶段** | 百分位分界 | 非自然律 |
| 4 | **Bass p/q** | 创新/模仿 | 不可外推全史 |
| 5 | **双相 logistic** | 零售+机构 | 参数主观 |
| 6 | **Rudd A′(t)** | D·A 需求 | D 无锚 |
| 7 | **10%–90% 窗** | 可解释时长 | 约定选择 |
| 8 | **dA/dt 衰减** | 边际增速 | 与价格脱钩 |
| 9 | **对照基准** | drift 剥离 | μ,σ 敏感 |
| 10 | **阶段 falsify** | 2032 检验 | 需提前书写 |

# 关键问题清单

:::details 模型
- 你用的是单曲线还是多相 logistic？
- logit–t 是否已进入平台？
- L_min、T* 依据是什么？
:::

:::details 阶段
- 机构子曲线落在哪个 Rogers 阶段？
- ETF 是 b 跳升还是新 t₀？
- 合成渗透与全局渗透是否混用？
:::

:::details 风险
- 阶段胜率扣过 drift 吗？
- dA/dt 是否已接近 0？
- 2032 falsify 条件写了吗？
:::

:::details 决策
- 仓位是否与「27% 还早」解耦？
- A′ 情景 D 是否声明？
- 顾问配置上行是否纳入？
:::

# 下一阶段探索

1. **Rudd & Porter MDPI 2025**：L_min/T*/D 完整供需校准
2. **Findings 2025 logit 阶段分界**：百分位约定比较
3. **Chainalysis 2025 机构子指数**：机构相实证代理
4. **Bass/DIMORA 包**：p/q 时变估计
5. **2032 机构相 τ 检验**：提前写渗透/flow 可接受区间

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| logit↔logistic 数学 | 教科书 | 标准统计变换 | 【事实】 |
| Rudd L_min/T*/D 框架 | 论文 | MDPI JRFM 2025 | 【分析】 |
| Rogers 五阶段百分位 | 学术 | Rogers 1962; Findings 2025 | 【分析】 |
| Bass p/q 模型 | 学术 | Bass 1969 | 【分析】 |
| ETF 2024-01 批准 | 监管 | SEC | 【事实】 |
| 顾问 20% 推荐/2% 配置 | 调研 | PlanAdviser Q4 2024 | 【待验证】 |
| 北美 ETF AUM ~$179B | 行业 | Chainalysis 2025 | 【待验证】 |
| 机构相参数 48.8%/27.7% | 模型推论 | 本手册双相标定 | 【推论】 |
| μ=50%/σ=65% 基准 | 模型假设 | 2026 高波动加密环境 | 【假设】 |
| ETF 政府/机构 β 系数 | 论文 | MDPI JRFM 2025 ETP 研究 | 【分析】 |

# 免责声明 {.appendix}

本手册仅供学习与认知框架构建，**不构成任何投资建议**。比特币与相关衍生品具有极高波动性和监管不确定性；文中模型参数（L_min、T*、D、合成权重等）多为【推论】或【假设】，历史拟合不保证未来有效。任何交易决策应基于您自身的风险承受能力，并咨询持牌专业人士。作者不对依据本手册做出的投资行为承担任何责任。
