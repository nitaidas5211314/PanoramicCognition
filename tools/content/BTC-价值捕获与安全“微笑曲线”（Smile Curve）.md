---
slug: BTC-价值捕获与安全“微笑曲线”（Smile Curve）
title: BTC-价值捕获与安全“微笑曲线”（Smile Curve）
subtitle: 用<strong>产业链微笑曲线</strong>读 BTC 谁赚钱、谁买单安全——L1 矿工在谷底，<strong>持币者与金融基建</strong>在两端；减半窗口则是<strong>安全预算的 U 形谷</strong>
brand_sub: Bitcoin × Value Chain × Security Budget
kicker: Panoramic Cognition & Practice Engine
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [比特币, 微笑曲线, 安全预算, 价值捕获, 减半]
theme_js_file: BTC-价值捕获与安全“微笑曲线”（Smile Curve）.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->

# 一句话理解

**微笑曲线有两条：价值捕获微笑 + 安全预算微笑。** 施振荣（1992）观察 PC 产业：研发与品牌两端附加值高，制造环节在谷底【事实】。映射到 BTC：**持币稀缺溢价（左端）** 与 **托管/交易/信贷基建（右端）** 捕获绝大部分经济租；**PoW 挖矿与裸 L1 结算（中间）** 利润率最薄——2025 年示意模型下矿工+结算仅占链上价值流 **~3%**，持币升值占 **~97%**【推论】。

另一条：**安全预算 = 区块补贴 + 手续费**，决定 51% 攻击成本。补贴每四年减半，手续费尚未稳定接替——2024 后手续费仅占矿工收入 **~3%**【待验证】，形成 **「减半悬崖谷」**：2028 若要保持 **$15.6B** 级安全支出，手续费占比需升至 **~50%**【推论】——比当前高一个数量级。

# 这个领域到底是什么

## 一句话定位

研究 **BTC 生态里价值与安全的空间分布**：谁在产业链上赚钱（微笑曲线），谁为网络安全持续付费（安全预算），两者如何互相牵制。

:::note red 先划清边界
本手册**不提供**买卖信号。微笑曲线是**结构框架**，不是估值公式；安全预算讨论的是**流量成本**（Budish 2025 QJE），不是「市值的 X% 永远安全」。
:::

## 回答 15 个问题

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | 价值捕获分布、安全预算演化、减半悬崖、L2 费回流 |
| 2 | 边界在哪 | 不含具体矿机选股；不预测监管；不替代链上指标手册 |
| 3 | 核心对象 | 补贴、手续费、算力、市值、产业链各层利润率 |
| 4 | 参与者 | 矿工/矿池、ETF 发行商、交易所、托管行、L2 运营方、持币者 |
| 5 | 关键变量 | Security Budget、Fee Share、Hashrate、Market Cap、Value Capture |
| 6 | 可观察的 | 区块奖励、日手续费、算力、ETF AUM、交易所收入 |
| 7 | 不可观察但可推断 | 闪电网络费（不进矿工口袋）、OTC 结算、矿机折旧 |
| 8 | 谁影响谁 | 价格→矿工收入→算力→安全；L2 扩容→链上费压力↓【推论】 |
| 9 | 因果 | 补贴↓→名义安全↓ = 【事实】；费市自动补齐 = 【假设】 |
| 10 | 只是相关 | 算力与价格：价格→算力强，算力→价格弱【分析】 |
| 11 | 表层现象 | 「BTC 涨=网络更安全」「L2=救比特币」口号 |
| 12 | 底层机制 | 自由进入挖矿 + 流量安全成本 + 产业链租分配 |
| 13 | 反馈 | 涨价→算力↑→安全↑→信心↑→涨价（正）；L2 分流→费↓→安全↓（负） |
| 14 | 时间延迟 | 减半冲击 3–6 月算力调整；ETF 囤币使费市滞后数年 |
| 15 | 正负反馈 | 正：减半后价格翻倍惯例；负：费占比不足→算力出清 |

## 两条微笑曲线

| 曲线 | X 轴 | Y 轴 | 谷底在哪 |
|---|---|---|---|
| **价值捕获微笑** | 产业链位置（稀缺→挖矿→L1→基建） | 经济租/利润率 | 挖矿 + 裸 L1 结算 |
| **安全预算微笑** | 时间（减半周期） | 安全支出/市值 | 补贴骤降、手续费未接替的窗口 |

# 为什么值得研究

## 理由一：回答「BTC 涨了，谁真赚钱？」

2025 年 BTC 从约 **$25K** 升至 **$100K+**【待验证】，但矿工年收入仅 **~$16B**（含 **3%** 手续费），BlackRock IBIT 等 ETF 管理费 **~$1.6B/年**【推论】——**升值 captured 在持币端，不在生产端**。

## 理由二：安全预算是 BTC 唯一的「运营成本」

Eric Budish（QJE 2025）证明：PoW 安全需要**持续流量支付**，与攻击收益线性相关【事实】。2026 年安全预算 **~$16.1B**，占市值 **1.20%**【推论】——较 2015 年 **8.75%** 大幅压缩【待验证】。

## 理由三：2028–2032 是 live test 窗口

James O'Beirne 等 Core 开发者警告：2028 补贴降至 **1.5625 BTC/块** 时，若价格不翻倍，名义安全腰斩【分析】。Messari、SatoshiBench 均将下一减半标为关键观测点【分析】。

| 持有期 | BTC μ=50%/年 σ=65% | **随机持币基准** | 「安全预算同比+20% 后 90 日胜率 58%」真实超额 |
|---|---|---|---|
| 30 日 | — | **54.3%** | 表面 +3.7 pp → 真实 **+0.0 pp**（噪声内） |
| 90 日 | — | **67.7%** | 表面 −9.7 pp → 真实 **−9.7 pp** |
| 180 日 | — | **74.2%** | 低安全预算分位 80% 胜率 → 真实 **+5.8 pp**【假设】 |

**任何「安全预算信号」都要和对照基准比**——BTC 有正漂移。

<!-- nav:世界模型 -->

# 世界地图

## 九层结构：从 PoW 安全，到产业链微笑

:::raw
<svg viewBox="0 0 680 560" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 微笑曲线 · 九层世界地图</text>
  <text x="14" y="34" font-size="11" fill="#7c848f" font-family="sans-serif">越靠上越「协议硬约束」，越靠下越「金融基建可选择」</text>
  <rect x="14" y="46" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="68" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">① 共识层</text>
  <text x="148" y="68" font-size="11.5" fill="#454c56" font-family="sans-serif">PoW · 21M 上限 · 每 10 分钟一块</text>
  <text x="148" y="84" font-size="11" fill="#7c848f" font-family="sans-serif">失效：量子威胁 ECDLP【待验证】</text>
  <rect x="14" y="100" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="122" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">② 安全预算层</text>
  <text x="148" y="122" font-size="11.5" fill="#454c56" font-family="sans-serif">补贴 3.125 BTC + 手续费 ~3%</text>
  <text x="148" y="138" font-size="11" fill="#7c848f" font-family="sans-serif">年预算 ~$16.1B · 占市值 1.20%</text>
  <rect x="14" y="154" width="652" height="48" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.4"/>
  <text x="30" y="176" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">③ 算力市场层</text>
  <text x="148" y="176" font-size="11.5" fill="#454c56" font-family="sans-serif">自由进入 · 价格→算力单向因果为主</text>
  <text x="148" y="192" font-size="11" fill="#7c848f" font-family="sans-serif">RESUNE 均衡【分析】arXiv:2508.06071</text>
  <rect x="14" y="208" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="230" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">④ 价值捕获左端</text>
  <text x="148" y="230" font-size="11.5" fill="#454c56" font-family="sans-serif">稀缺溢价 · 自托管 · 结算终局性</text>
  <text x="148" y="246" font-size="11" fill="#7c848f" font-family="sans-serif">微笑曲线高点：持币升值 ~97% 价值流【推论】</text>
  <rect x="14" y="262" width="652" height="48" rx="10" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.4"/>
  <text x="30" y="284" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑤ 价值捕获谷底</text>
  <text x="148" y="284" font-size="11.5" fill="#454c56" font-family="sans-serif">ASIC 挖矿 · 裸 L1 出块 · 薄利竞争</text>
  <text x="148" y="300" font-size="11" fill="#7c848f" font-family="sans-serif">矿工占价值流 ~2.6%【推论】</text>
  <rect x="14" y="316" width="652" height="48" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.4"/>
  <text x="30" y="338" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑥ 费用市场层</text>
  <text x="148" y="338" font-size="11.5" fill="#454c56" font-family="sans-serif">Ordinals/Runes 尖峰 · L2 批量结算</text>
  <text x="148" y="354" font-size="11" fill="#7c848f" font-family="sans-serif">2024 Q2 费曾超补贴 · 后回落【待验证】</text>
  <rect x="14" y="370" width="652" height="48" rx="10" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="392" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑦ 价值捕获右端</text>
  <text x="148" y="392" font-size="11.5" fill="#454c56" font-family="sans-serif">ETF 托管 · 交易所 · 信贷/质押</text>
  <text x="148" y="408" font-size="11" fill="#7c848f" font-family="sans-serif">「Layer Above the Lock」金融租【分析】</text>
  <rect x="14" y="424" width="652" height="48" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.4"/>
  <text x="30" y="446" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑧ L2 分流层</text>
  <text x="148" y="446" font-size="11.5" fill="#454c56" font-family="sans-serif">闪电（费不进矿工）vs 合并挖矿 L2</text>
  <text x="148" y="462" font-size="11" fill="#7c848f" font-family="sans-serif">扩容悖论：活性↑ 可能 安全预算↓【分析】</text>
  <rect x="14" y="478" width="652" height="48" rx="10" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="30" y="500" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">⑨ 决策层</text>
  <text x="148" y="500" font-size="11.5" fill="#454c56" font-family="sans-serif">同时看价值落点 + 安全流量是否可持续</text>
  <text x="148" y="516" font-size="11" fill="#7c848f" font-family="sans-serif">减半窗口 = 两条曲线的交汇风险点</text>
</svg>
:::

# 核心概念地图

## 抽象 ↔ 机制 ↔ 操作

:::raw
<svg viewBox="0 0 680 300" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">微笑曲线 · 三层映射</text>
  <rect x="14" y="36" width="200" height="220" rx="10" fill="#f0f4fd" stroke="#c3d1f0" stroke-width="1.3"/>
  <text x="28" y="58" font-size="12" font-weight="700" fill="#1d4ed8" font-family="sans-serif">抽象</text>
  <text x="28" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 微笑曲线</text>
  <text x="28" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 安全预算</text>
  <text x="28" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 流量信任成本</text>
  <text x="28" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 产业链租</text>
  <rect x="240" y="36" width="200" height="220" rx="10" fill="#fff7e6" stroke="#f0dcb4" stroke-width="1.3"/>
  <text x="254" y="58" font-size="12" font-weight="700" fill="#a06800" font-family="sans-serif">机制</text>
  <text x="254" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 补贴减半 SCHEDULE</text>
  <text x="254" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 自由进入挖矿</text>
  <text x="254" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• L2 费分流/回流</text>
  <text x="254" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 金融基建垄断租</text>
  <rect x="466" y="36" width="200" height="220" rx="10" fill="#f2f7f4" stroke="#b8dcc8" stroke-width="1.3"/>
  <text x="480" y="58" font-size="12" font-weight="700" fill="#0f8a4d" font-family="sans-serif">操作</text>
  <text x="480" y="82" font-size="11" fill="#454c56" font-family="sans-serif">• 算安全预算占比</text>
  <text x="480" y="102" font-size="11" fill="#454c56" font-family="sans-serif">• 画产业链微笑</text>
  <text x="480" y="122" font-size="11" fill="#454c56" font-family="sans-serif">• 减半悬崖压力测试</text>
  <text x="480" y="142" font-size="11" fill="#454c56" font-family="sans-serif">• 漂移剥离胜率</text>
  <path d="M214 146 L240 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#scA)"/>
  <path d="M440 146 L466 146" stroke="#7c848f" stroke-width="1.5" marker-end="url(#scA)"/>
  <defs><marker id="scA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7c848f"/></marker></defs>
</svg>
:::

# 核心参与者

| 角色 | 价值捕获位置 | 与安全预算关系 |
|---|---|---|
| **持币者（含 ETF）** | 微笑左端：稀缺溢价 | 不直接付费；间接受益于安全 |
| **矿工/矿池** | 谷底：竞争化生产 | **直接领取**补贴+手续费 |
| **ASIC 厂商** | 谷底上游：卖铲子 | 费市萎缩→矿机需求↓【推论】 |
| **ETF 托管行** | 右端：管理费 | 依赖 L1 终局性，不补安全预算 |
| **交易所** | 右端：交易费 | 内部结算不进链上费市 |
| **闪电 LSP** | 右端：路由费 | **零回流**矿工【事实】 |
| **合并挖矿 L2** | 右端候选 | 设计费可 100% 回流矿工【假设】 |
| **研究者** | 上游：协议设计 | Budish/RESUNE 定义约束 |

# 核心变量

| 变量 | 定义 | 2026-09 量级【待验证】 |
|---|---|---|
| **Block Subsidy** | 每块新发行 BTC | **3.125 BTC** |
| **Daily Subsidy** | 144 块 × 补贴 × 价 | **~$42.8M**（$95K） |
| **Fee Share** | 手续费÷总矿工收入 | **~3.0%** |
| **Security Budget** | 年矿工总收入 | **~$16.1B** |
| **Sec / MCap** | 安全预算÷市值 | **~1.20%** |
| **Attack Cost/Day** | 年预算÷365（51% 粗估） | **~$44.1M/日** |
| **Hashrate** | 全网算力 | **~750 EH/s**【待验证】 |

:::raw
<div class="tool">
<h3>工具 · 安全预算计算器</h3>
<p>手算 <strong>年安全预算 = 日补贴 ÷ (1 − 费占比)</strong>。默认 2026-09：$95K · 费占比 3% · 市值 $1.34T。</p>
<div class="ctrl"><label>BTC 价格 ($K)<input type="range" id="sc_price" min="40" max="150" step="1" value="95"><output id="sc_priceO">$95K</output></label></div>
<div class="ctrl"><label>手续费占比 (%)<input type="range" id="sc_fee" min="0.5" max="50" step="0.1" value="3.0"><output id="sc_feeO">3.0%</output></label></div>
<div class="ctrl"><label>市值 ($T)<input type="range" id="sc_mcap" min="0.5" max="3" step="0.01" value="1.34"><output id="sc_mcapO">$1.34T</output></label></div>
<div class="readout">
<div class="ro"><span class="k">年安全预算</span><strong id="sc_annual">$16.09B</strong></div>
<div class="ro"><span class="k">占市值</span><strong id="sc_sec">1.20%</strong></div>
<div class="ro"><span class="k">攻击成本粗估</span><strong id="sc_attack">$44.1M/日</strong></div>
<canvas id="scBudgetChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="sc_v">中等</strong><span id="sc_vh">—</span></div>
</div>
</div>
:::

# 因果关系

## 因果链与反馈

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">因果图 · 实线=因果 · 红虚线=反馈</text>
  <rect x="30" y="50" width="110" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="85" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 价格</text>
  <rect x="170" y="50" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="230" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">矿工收入</text>
  <rect x="320" y="50" width="110" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="375" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">算力/安全</text>
  <rect x="460" y="50" width="110" height="44" rx="8" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.3"/>
  <text x="515" y="78" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">持币信心</text>
  <rect x="170" y="150" width="130" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="235" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">区块补贴</text>
  <text x="235" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(每 4 年减半)</text>
  <rect x="340" y="150" width="130" height="44" rx="8" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.3"/>
  <text x="405" y="170" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">链上手续费</text>
  <text x="405" y="186" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(L2/铭文驱动)</text>
  <rect x="200" y="250" width="160" height="44" rx="8" fill="#fff7e6" stroke="#b8730a" stroke-width="1.3"/>
  <text x="280" y="270" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">金融基建租</text>
  <text x="280" y="286" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">(微笑右端)</text>
  <path d="M140 72 L170 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#scB)"/>
  <path d="M290 72 L320 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#scB)"/>
  <path d="M430 72 L460 72" stroke="#454c56" stroke-width="1.5" marker-end="url(#scB)"/>
  <path d="M515 94 L85 94 L85 50" stroke="#0f8a4d" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#scC)"/>
  <path d="M235 150 L235 94" stroke="#d5342c" stroke-width="1.5" marker-end="url(#scD)"/>
  <path d="M405 150 L290 94" stroke="#d5342c" stroke-width="1.5" marker-end="url(#scD)"/>
  <path d="M515 94 L280 250" stroke="#b8730a" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#scE)"/>
  <defs>
    <marker id="scB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#454c56"/></marker>
    <marker id="scC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0f8a4d"/></marker>
    <marker id="scD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker>
    <marker id="scE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#b8730a"/></marker>
  </defs>
</svg>
:::

**读图要点**：价格→收入→算力是主链【分析】（RESUNE, arXiv:2508.06071）。补贴 SCHEDULE 外生下降形成安全谷；L2 若分流链上费，与补贴下降形成**双重挤压**【推论】。

# 隐藏关系

## 隐藏关系一：价值微笑 ≠ 安全微笑

| 维度 | 价值捕获微笑 | 安全预算曲线 |
|---|---|---|
| 赢家 | 持币者、托管/交易所 | 全网（若预算够） |
| 输家 | 矿工（薄利） | 所有用户（若预算崩） |
| 时间性 | 牛市左端更陡 | 减半后中段更陡 |

**持币者赚最多，却不为安全直接付费**——这是 BTC 经济模型的核心张力【分析】。

## 隐藏关系二：L2 的三难

| L2 类型 | 扩容 | 费回流矿工 | 例子 |
|---|---|---|---|
| 闪电网络 | 强 | **无** | LSP 收路由费 |
| 侧链/联邦 | 中 | 通常无 | Liquid, RSK |
| 合并挖矿 L2 | 强 | **可 100%** | BIP300 类方案【假设】 |
| Rollup 批量结算 | 强 | 部分（L1 结算费） | Stacks, Merlin【待验证】 |

Blockspace 文（2025）估算：合并挖矿 L2 单笔 **$0.10** × 千万级 TPS 潜力 vs L1 每块 **$200–300** 费上限【待验证】——**费市规模差 3–4 个数量级**。

:::raw
<div class="tool">
<h3>工具 · 价值捕获微笑曲线</h3>
<p>调节产业链各层价值份额，观察<strong>两端高、中间低</strong>是否成立。默认示意 2025 牛市结构。</p>
<div class="ctrl"><label>持币/稀缺端 (%)<input type="range" id="sm_holder" min="50" max="98" step="1" value="85"><output id="sm_holderO">85%</output></label></div>
<div class="ctrl"><label>挖矿端 (%)<input type="range" id="sm_miner" min="1" max="20" step="1" value="3"><output id="sm_minerO">3%</output></label></div>
<div class="ctrl"><label>金融基建端 (%)<input type="range" id="sm_infra" min="1" max="30" step="1" value="5"><output id="sm_infraO">5%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">L1 结算（残差）</span><strong id="sm_l1O">7%</strong></div>
<canvas id="smileChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="sm_v">典型微笑：两端高、中间低</strong><span id="sm_vh">—</span></div>
</div>
</div>
:::

## 隐藏关系三：跨域同构

| 结构 | BTC 微笑曲线 | 其他领域 |
|---|---|---|
| **微笑曲线** | 持币/基建 vs 挖矿 | 台积电晶圆代工 vs 苹果设计 |
| **流量安全成本** | 持续矿工支付 | Budish：vs 法治固定成本 |
| **铁路+地产** | Layer Above the Lock | 东京铁路公司做沿线开发 |
| **O 型环** | 协议层不可贸易优势 | 21M 上限+PoW 共识 |

# 系统运行机制

## 四阶段循环

1. **补贴主导期**（2009–2020）：安全预算随补贴 SCHEDULE 上升，费占比 <5%
2. **费市觉醒期**（2021–2024）：Ordinals/Runes 尖峰，费曾 **>50%** 块收入【待验证】
3. **减半悬崖谷**（2024–2032）：补贴骤降，费占比需从 **3%→50%** 才能维持预算【推论】
4. **费市稳态或出清**：要么 L2 批量结算撑起费市，要么算力下降找新均衡【假设】

:::note amber 扩容悖论
高效 L2 降低单笔链上成本 → 可能**减少**总手续费 → 与「费市接替补贴」目标冲突【分析】。合并挖矿是少数同时追求扩容+费回流的架构。
:::

# 时间演化

## 安全预算占市值：长期下行

| 年份 | 市值【待验证】 | 安全预算 | 安全 % |
|---|---|---|---|
| 2015 | $4B | $350M | **8.75%** |
| 2018 | $130B | $5.5B | **~4.0%** |
| 2021 | $1T | $17B | **1.7%** |
| 2024 | $1.3T | $15B | **1.15%** |
| 2026 | $1.34T | $16.1B | **1.20%** |

**趋势**：市值涨快于安全预算 → 攻击成本占保护价值比例持续下降【分析】——Budish 称之为流量信任对规模经济的不利【事实】。

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">安全预算演化时间轴</text>
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#0f8a4d"/><text x="80" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2016</text><text x="80" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">补贴98%</text>
  <circle cx="180" cy="100" r="6" fill="#0f8a4d"/><text x="180" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2020</text><text x="180" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">费5%</text>
  <circle cx="280" cy="100" r="6" fill="#b8730a"/><text x="280" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2024</text><text x="280" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">减半</text>
  <circle cx="400" cy="100" r="6" fill="#d5342c"/><text x="400" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2028</text><text x="400" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">悬崖?</text>
  <circle cx="520" cy="100" r="6" fill="#d5342c"/><text x="520" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2032</text><text x="520" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">费需35%+</text>
  <circle cx="600" cy="100" r="6" fill="#7c848f"/><text x="600" y="82" font-size="10" text-anchor="middle" fill="#454c56" font-family="sans-serif">2140</text><text x="600" y="130" font-size="9" text-anchor="middle" fill="#7c848f" font-family="sans-serif">零补贴</text>
  <text x="340" y="170" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">补贴 SCHEDULE 下行 · 手续费接替是未证假设</text>
</svg>
:::

# 利益与激励

| 利益方 | 激励 | 对微笑曲线的影响 |
|---|---|---|
| **持币者** | 升值最大化 | 强化左端；不愿高链上费 |
| **矿工** | 收入最大化 | 推合并挖矿 L2、反对大区块 |
| **ETF 发行商** | AUM×费率 | 强化右端；囤币降链上活动 |
| **交易所** | 交易量×费率 | 内部账本分流费市 |
| **闪电 LSP** | 路由费 | 右端获利、矿工零分成 |
| **Core 开发者** | 协议稳健 | 谨慎改共识费规则 |

# 资源与信息流

## 价值流与安全费「抽水」

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <text x="14" y="18" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">BTC 价值流 → 安全费抽水图</text>
  <rect x="40" y="50" width="600" height="50" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="80" font-size="12" text-anchor="middle" fill="#454c56" font-family="sans-serif">BTC 年度价值创造 ~$600B+ 升值【推论】</text>
  <rect x="40" y="120" width="180" height="36" rx="6" fill="#f2f7f4" stroke="#0f8a4d" stroke-width="1.2"/>
  <text x="130" y="143" font-size="11" text-anchor="middle" fill="#0f8a4d" font-family="sans-serif">持币升值 ~97%</text>
  <rect x="240" y="120" width="140" height="36" rx="6" fill="#fff7e6" stroke="#b8730a" stroke-width="1.2"/>
  <text x="310" y="143" font-size="11" text-anchor="middle" fill="#b8730a" font-family="sans-serif">ETF/交易所 ~0.6%</text>
  <rect x="400" y="120" width="120" height="36" rx="6" fill="#fdf3f2" stroke="#d5342c" stroke-width="1.2"/>
  <text x="460" y="143" font-size="11" text-anchor="middle" fill="#d5342c" font-family="sans-serif">矿工 ~2.6%</text>
  <rect x="540" y="120" width="100" height="36" rx="6" fill="#f4f6f9" stroke="#c9d0d9" stroke-width="1.2"/>
  <text x="590" y="143" font-size="11" text-anchor="middle" fill="#7c848f" font-family="sans-serif">L1结算残差</text>
  <path d="M460 156 L460 200 L340 200 L340 230" stroke="#d5342c" stroke-width="1.5" fill="none" marker-end="url(#scF)"/>
  <rect x="240" y="230" width="200" height="40" rx="8" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.3"/>
  <text x="340" y="248" font-size="11" text-anchor="middle" fill="#454c56" font-family="sans-serif">安全预算抽水</text>
  <text x="340" y="262" font-size="10" text-anchor="middle" fill="#7c848f" font-family="sans-serif">仅矿工收入 $16.1B → 攻击成本上限</text>
  <text x="520" y="195" font-size="10" fill="#d5342c" font-family="sans-serif">仅 2.6% 价值流</text>
  <text x="130" y="195" font-size="10" fill="#0f8a4d" font-family="sans-serif">不付安全费</text>
  <defs><marker id="scF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#d5342c"/></marker></defs>
</svg>
:::

**信息流**：mempool.space / mempool 费率 → 矿池策略 → 算力部署；ETF 持仓报告 → 链上活跃度预期 → 费市定价。**瓶颈**：闪电/交易所内部流量不可见。

:::raw
<div class="tool">
<h3>工具 · 减半悬崖模拟器</h3>
<p>若要保持 <strong>$15.6B</strong> 级年安全预算，2028/2032 各需多少<strong>手续费占比</strong>？</p>
<div class="ctrl"><label>BTC 价格 ($K)<input type="range" id="hc_price" min="40" max="200" step="1" value="95"><output id="hc_priceO">$95K</output></label></div>
<div class="ctrl"><label>当前费占比 (%)<input type="range" id="hc_fee" min="1" max="30" step="0.1" value="3.0"><output id="hc_feeO">3.0%</output></label></div>
<div class="ctrl"><label>目标预算 ($B)<input type="range" id="hc_target" min="8" max="25" step="0.1" value="15.6"><output id="hc_targetO">$15.6B</output></label></div>
<div class="readout">
<div class="ro"><span class="k">当前年预算</span><strong id="hc_now">$16.09B</strong></div>
<div class="ro"><span class="k">2028 所需费占比</span><strong id="hc_28">50.0%</strong></div>
<div class="ro"><span class="k">2032 所需费占比</span><strong id="hc_32">75.0%</strong></div>
<canvas id="halvingChart" height="214" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="hc_v">2028 前费率不足</strong><span id="hc_vh">—</span></div>
</div>
</div>
:::

<!-- nav:杠杆与陷阱 -->

# 关键杠杆点

按 **重要性 × 杠杆率 × 可操作性 ÷ 学习成本** 排序：

| # | 杠杆点 | 动作 |
|---|---|---|
| 1 | **分清两条微笑曲线** | 价值捕获 ≠ 安全可持续 |
| 2 | **算 Sec/MCap 趋势** | 1.20% 且下行 = 红旗 |
| 3 | **跟踪 Fee Share 周线** | mempool + 矿池数据 |
| 4 | **识别 L2 费回流路径** | 闪电 0% vs 合并挖矿 100% |
| 5 | **减半日历压力测试** | §12 悬崖模拟器 |
| 6 | **读 Budish 流量成本** | 攻击收益≠市值 |
| 7 | **漂移剥离任何信号** | 安全预算↑ 不等于 超额收益 |
| 8 | **对照 ETF 囤币效应** | 链上活动↓ → 费市萎缩 |
| 9 | **监控算力 3 月均线** | 价格滞后出清指标 |
| 10 | **30 分钟双曲线体检** | §22 最小实践 |

# 常见认知陷阱

:::details 1. 「BTC 涨 = 网络更安全」
**错因**：市值涨快于安全预算（1.20% vs 2015 年 8.75%）。**对策**：看 Sec/MCap 而非绝对算力。
:::

:::details 2. 「矿工赚很多 = BTC 很健康」
**错因**：矿工仅占价值流 ~2.6%【推论】，且利润率薄。**对策**：看安全预算绝对额与费占比。
:::

:::details 3. 「闪电扩容 = 利好矿工」
**错因**：闪电费 **100% 给 LSP**，不进安全预算【事实】。**对策**：区分 L2 架构。
:::

:::details 4. 「减半必涨，安全无忧」
**错因**：RESUNE 模型预测减半 ceteris paribus 收缩算力与价格【分析】。**对策**：减半是供给冲击，非纯利好。
:::

:::details 5. 把市值当攻击收益
**错因**：Budish：攻击者目标是可双花**流量**，非全部市值。**对策**：用 V_attack 而非 MCap。
:::

:::details 6. 「费市会自动接替补贴」
**错因**：2024 后费占比回落至 ~3%【待验证】，Ordinals 尖峰未持续。**对策**：看 12 个月均线。
:::

:::details 7. 忽视 ETF 对费市的挤压
**错因**：囤币降低链上结算需求 → 费市萎缩【推论】。**对策**：ETF 流 + 链上活动联读。
:::

:::details 8. 「微笑曲线 = 永远成立」
**错因**：合并挖矿 L2 可能抬高中间段。**对策**：随架构演化更新曲线。
:::

:::details 9. 单看算力绝对值
**错因**：算力高但 Sec/MCap 低 = 相对不安全。**对策**：算力×电价÷市值。
:::

:::details 10. 胜率不算漂移
**错因**：BTC 随机做多 90 日基准 **67.7%**。**对策**：§12 漂移剥离器。
:::

:::details 11. 把二手「97% 补贴」当永久
**错因**：费占比已从 <1% 升至尖峰 50%+【待验证】，均值仍低。**对策**：标【待验证】，看分布非极值。
:::

:::details 12. 「安全预算问题 = BTC 将死」
**错因**：多种均衡路径（价格翻倍、费市、算力出清）。【分析】**对策**：情景分析而非单点预测。
:::

:::raw
<div class="tool">
<h3>工具 · 漂移剥离器</h3>
<p>「安全预算同比+20% 后看涨」？先和<strong>随机持币基准</strong>比。</p>
<div class="ctrl"><label>持有期（日）<input type="range" id="sc_T" min="5" max="365" step="5" value="90"><output id="sc_TO">90 日</output></label></div>
<div class="ctrl"><label>信号胜率 (%)<input type="range" id="sc_ps" min="30" max="90" step="0.1" value="58.0"><output id="sc_psO">58.0%</output></label></div>
<div class="ctrl"><label>年化漂移 μ (%)<input type="range" id="sc_mu" min="0" max="100" step="1" value="50"><output id="sc_muO">50%</output></label></div>
<div class="ctrl"><label>年化波动 σ (%)<input type="range" id="sc_sg" min="30" max="100" step="1" value="65"><output id="sc_sgO">65%</output></label></div>
<div class="readout">
<div class="ro"><span class="k">随机持币基准</span><strong id="sc_base">67.7%</strong></div>
<div class="ro"><span class="k">真实超额</span><strong id="sc_dp">-9.7 pp</strong></div>
<div class="ro"><span class="k">所需样本 n</span><strong id="sc_n">111</strong></div>
<canvas id="scDriftChart" height="176" style="width:100%;grid-column:1/-1"></canvas>
<div style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><strong id="sc_dv">跑输基准</strong><span id="sc_dvh">—</span></div>
</div>
</div>
:::

<!-- nav:落地 -->

# 从抽象到现实

| 抽象 | 现实映射 | 可观察代理 |
|---|---|---|
| 价值微笑左端 | 持币升值 | BTC 年涨幅 vs 矿工收入 |
| 价值微笑谷底 | 挖矿薄利 | 矿企毛利率、算力价 |
| 价值微笑右端 | 金融基建租 | ETF 费率×AUM、交易所收入 |
| 安全预算谷 | 减半后费不足 | Fee Share 12 周均线 |
| 攻击成本 | 51% 粗估 | 年预算÷365 |

# 从理论到行动

**决策漏斗**（自上而下）：

1. **结构**：价值捕获在微笑哪一端？我在哪一端暴露？
2. **安全**：Sec/MCap 趋势向上还是向下？
3. **减半**：下一窗口费占比需达多少？（§12 模拟器）
4. **L2**：活动走哪条费回流路径？
5. **执行**：安全信号先漂移剥离——不单独交易

# 技能树

:::details L1 · 观察者
- [ ] 手算日补贴 = 144×3.125×$95K = $42.8M
- [ ] 解释微笑曲线两端 vs 谷底
- [ ] 说出安全预算两个来源
:::

:::details L2 · 分析师
- [ ] 算 Sec/MCap = 1.20%
- [ ] 复述 2028 费占比 50% 压力测试
- [ ] 区分闪电 vs 合并挖矿 L2
:::

:::details L3 · 建模者
- [ ] 建 Fee Share 12 周仪表盘
- [ ] 写 ETF 囤币→费市情景表
- [ ] 配 MVRV + 安全预算双读
:::

:::details L4 · 系统设计者
- [ ] 多信号（安全+估值+流量）投票
- [ ] 每减半周期更新微笑曲线参数
- [ ] 季度回测 Sec/MCap 信号
:::

# 游戏化世界

**角色**：产业链地图绘制者（Chain Cartographer）。等级越高，越能同时看见「谁赚钱」与「谁买单安全」。

| 等级 | 任务 | 奖励 |
|---|---|---|
| Lv.1 | 手算安全预算误差 <2% | 解锁「补贴层」 |
| Lv.2 | 向朋友解释价值微笑 vs 安全谷 | 解锁「捕获曲线」 |
| Lv.3 | 算出 2028 费占比需求 50% | 解锁「悬崖模拟器」 |
| Lv.4 | 连续 4 周记录 Fee Share | 解锁「L2 分流图」 |
| Lv.5 | 写一页「两条微笑如何冲突」 | 通关 |

# 任务系统

| 类型 | 任务 | 验证 |
|---|---|---|
| 每日 | 记录 BTC 价 +  mempool 高费 | 7 日表 |
| 每周 | 更新 Fee Share 估算 | §06 工具截图 |
| 每月 | 读一篇安全预算文 | 3 行摘要 |
| 每季 | 核对 Messari/Blockchair 矿工收入 | 与手算误差 <5% |
| 每减半 | 跑 §12 悬崖模拟器 | 存档参数 |

# 反事实模拟

:::tabs
@@情景 A · 若费市成功接替补贴
2032 费占比 **35%+**，安全预算维持 $15B+。反事实需 **L2 批量结算 + 铭文类持续需求**【假设】——2024 尖峰后回落使此情景存疑。

@@情景 B · 若价格停滞过减半
2028 补贴减半、价格不动 → 名义安全腰斩 → 算力 3–6 月出清 **30–40%**【推论】。RESUNE 模型支持收缩均衡【分析】。

@@情景 C · 若闪电主导扩容
链上活动下降、Fee Share <1% → 安全预算悬崖加深。**合并挖矿 L2 成为矿工唯一盟友**【推论】。

@@情景 D · 若 ETF 持续囤币
右端价值捕获强化、左端升值加速，但链上费市萎缩 → **价值微笑更陡、安全谷更深**【推论】——两条曲线背离加剧。
:::

<!-- nav:路径 -->

# 四级能力路线

| 级别 | 时间 | 目标 | 检验 |
|---|---|---|---|
| **L1 会算预算** | 3 天 | 补贴+费+Sec% | 口算 $16.1B |
| **L2 会画微笑** | 1 周 | 价值捕获分布 | 捕获曲线实操 |
| **L3 会测悬崖** | 2 周 | 减半压力测试 | 2028 费占比 50% |
| **L4 会迭代系统** | 1 月+ | 双曲线+漂移剥离 | 连续 2 月日志 |

# 30 分钟最小实践

**任务**：完成「双微笑体检」——算、画、判。

1. **8 分钟 · 算安全预算**：144×3.125×$95K×365÷(1−0.03) = **$16.09B**；÷$1.34T = **1.20%**。
2. **7 分钟 · 画价值微笑**：§08 工具，默认持币 85%/矿工 3%/基建 5% → 典型微笑。
3. **8 分钟 · 测减半悬崖**：§12 工具，2028 需费占比 **50.0%** vs 当前 **3%**。
4. **7 分钟 · 漂移剥离**：§14 工具，90 日 58% 胜率 → 真实超额 **−9.7 pp**。**禁止写「安全预算高=必涨」。**

**验证**：年预算与 §06 默认读数误差 **<$0.2B**。

# 7 天计划

| 天 | 主题 | 动作 |
|---|---|---|
| D1 | 微笑曲线 | 读施振荣原文摘要 + Layer Above the Lock |
| D2 | 安全预算 | SatoshiBench 补贴 SCHEDULE + 手算 |
| D3 | 批评 | Budish QJE 2025 三方程 + 流量成本 |
| D4 | 工具 | §06–§14 四个交互模型 |
| D5 | L2 | 对比闪电 vs 合并挖矿费回流 |
| D6 | 数据 | 记录 7 日 Fee Share + ETF 流 |
| D7 | 合成 | 1 页「两条微笑如何互相牵制」 |

# 30 天能力构建计划

**Week 1**：微笑曲线 + 安全预算定义 + 手算（L1）
**Week 2**：减半悬崖 + Fee Share 追踪 + 漂移剥离（L2）
**Week 3**：L2 分流 + ETF 效应 + RESUNE 论文摘要（L3）
**Week 4**：个人双曲线仪表盘 + 减半日历（L4）

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 | 最大坑 |
|---|---|---|---|
| 1 | **价值捕获微笑** | 两端高、中间低 | 忽视 L2 改变曲线 |
| 2 | **安全预算** | 补贴+手续费 | 只看绝对额不看占比 |
| 3 | **Sec / MCap** | 安全占市值比 | 长期下行被忽视 |
| 4 | **减半悬崖** | 补贴 SCHEDULE 外生下降 | 假设价格必翻倍 |
| 5 | **Fee Share** | 费÷总收入 | 被 Ordinals 尖峰误导 |
| 6 | **RESUNE 均衡** | 价格→算力单向 | 减半收缩预测 |
| 7 | **Budish 流量成本** | 持续支付信任 | 用市值代替 V_attack |
| 8 | **L2 费回流矩阵** | 闪电 0% vs 合并挖矿 | 混淆扩容与安全 |
| 9 | **Layer Above** | 金融基建租 | 与矿工利益无关 |
| 10 | **对照基准** | 随机持币胜率 | μ,σ 敏感 |

# 关键问题清单

:::details 安全
- 当前 Fee Share 12 周均值？
- Sec/MCap 同比变了吗？
- 算力 3 月均线方向？
:::

:::details 价值捕获
- 我在微笑哪一端暴露？
- ETF AUM 增速 vs 链上活动？
- 矿工收入/市值比？
:::

:::details 减半
- 距下次减半几天？
- 维持预算需费占比多少？
- 价格翻倍假设成立吗？
:::

:::details 决策
- 信号胜率扣过漂移了吗？
- L2 活动走哪条费路径？
- 是否 ≥3 独立信号？
:::

# 下一阶段探索

1. **合并挖矿 L2 能否重塑微笑谷底？** BIP300/CUSF 激活进度【待验证】
2. **AI/HPC 矿场转型**：算力复用能否补贴安全预算？【假设】
3. **实体调整 Fee Share**：剔除铭文投机后的「有机费市」
4. **Sec/MCap 与 MVRV 联合分位**：估值与安全分裂时如何加权？
5. **后量子迁移成本**：是否构成新的安全预算项？【待验证】

<!-- nav:附录 -->

# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 微笑曲线概念 | 产业理论 | Stan Shih / Acer 1992 | 【事实】 |
| 安全预算定义 | 行业站 | SatoshiBench / BTC.network | 【事实】 |
| Budish 流量成本 | 学术论文 | QJE 2025, 140(1):1-62 | 【事实】 |
| RESUNE 均衡 | 预印本 | arXiv:2508.06071 | 【分析】 |
| 2024 后 Fee Share ~3% | 数据站 | Pine Analytics / Blockchair【待验证】 | 【待验证】 |
| Sec/MCap 历史序列 | 教材 | Elementary Bitcoin Ch.38 | 【待验证】 |
| Ordinals/Runes 费尖峰 | 行业研报 | Messari 2024 Q2 | 【待验证】 |
| Layer Above 框架 | 分析文 | hari.computer 2025 | 【分析】 |
| 闪电费不进矿工 | 行业文 | Bitcoin Mining Investor 2025 | 【事实】 |
| 合并挖矿 L2 潜力 | 行业文 | Blockspace 2025 | 【待验证】 |
| 2028 费占比压力测试 | 本手册计算 | §12 默认参数 | 【推论】 |

# 免责声明 {.appendix}

本手册仅供研究与学习，**不构成任何投资建议**。比特币极高波动，可能发生 >50% 的 drawdown；安全预算、微笑曲线及任何产业链分析均**不保证**未来价格或网络安全水平。减半后手续费能否接替区块补贴是**未证假设**；历史「减半必涨」叙事多次依赖价格翻倍，不可外推。中国大陆对虚拟货币相关业务有严格监管，请遵守当地法律法规。作者不对使用本手册造成的任何损失负责。
