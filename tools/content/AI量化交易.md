---
slug: AI量化交易
title: AI量化交易
subtitle: 把机器学习当成<strong>假设生成器</strong>而非预言机——真正决定盈亏的，是搜索纪律、成本结构与对手适应，而不是模型架构有多炫。
brand_sub: AI × Quantitative Trading
chips: 28 节 · 交互式 | 4 个可调模型 | 数据截至 2026-09 | 非投资建议
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [人工智能, 量化交易, 机器学习, 程序化交易]
theme_js_file: AI量化交易.js
md_raw: hint
md_raw_hint: （此处含交互模型与示意图，见 HTML 版）
footer_note: 本手册的目标不是替你做判断，而是帮你建立一套可以自己不断运行、探索和更新的思考系统。
---

<!-- nav:入口 -->
# 一句话理解

AI 量化交易 ≠ 用神经网络预测股价。

它是一套**用算法自动发现、验证、执行交易规则**的系统工程：数据 → 特征 → 模型 → 信号 → 组合 → 执行 → 风控 → 监控 → 再训练。

AI 在这里最值钱的能力不是「猜得准」，而是**在海量假设空间里快速试错、并用纪律筛掉绝大多数假阳性**。

# 这个领域到底是什么

## 边界与核心对象

| 维度 | 界定 |
|---|---|
| **是什么** | 用机器学习、深度学习、强化学习、大语言模型等 AI 技术，在金融市场数据中自动发现可交易规律，并程序化执行 |
| **不是什么** | 不是「AI 荐股 App」、不是保证收益的「智能投顾话术」、也不是 ChatGPT 随口给的买卖建议 |
| **核心对象** | 信号（alpha）、特征、标签、模型、组合权重、订单、成本、风险预算 |
| **时间尺度** | 从毫秒级高频到月度再平衡，AI 方法覆盖全谱系，但**有效机制因尺度而异** |

## 十五个问题，先建立世界模型

| # | 问题 | 回答 |
|---|---|---|
| 1 | 研究什么 | AI 如何在有限样本、非平稳、对抗性环境中产生可交易的预测与决策 |
| 2 | 边界在哪 | 到「模型输出直接下单」为止；合规、牌照、投资者适当性是外生约束 |
| 3 | 核心对象 | 特征矩阵 X、标签 y、损失函数、回测引擎、执行算法 |
| 4 | 参与者 | 量化私募、券商自营、高频做市商、散户、数据商、云算力商、监管 |
| 5 | 关键变量 | IC/IR、换手率、容量、过拟合概率 PBO、延迟、数据质量 |
| 6 | 可观察 | 行情、财务、另类数据、订单簿、模型日志、实盘滑点 |
| 7 | 不可观察 | 对手模型、真实拥挤度、未来制度变化、标签噪声结构 |
| 8 | 谁影响谁 | 信号→订单→价格→新数据→再训练，形成闭环 |
| 9 | 因果关系 | 信息优势→可预测收益（在成本覆盖前） |
| 10 | 只是相关 | 「AI 基金」名称与业绩（营销相关≠因果） |
| 11 | 表层现象 | 回测曲线、Sharpe、最大回撤、论文里的 IC |
| 12 | 底层机制 | 谁在什么约束下、用什么搜索过程、付多少成本换多少信号 |
| 13 | 反馈 | 策略流行→alpha 衰减；监管收紧→速度红利消失 |
| 14 | 延迟 | 从因子发表到被套利，历史上以年计，现在以月计 |
| 15 | 正负反馈 | 正：趋势自我强化；负：拥挤导致坍塌 |

# 为什么值得研究

## 三个理由

:::cards g3
### AI 把搜索成本压到接近零
传统量化靠人脑想因子，一天几个；AutoML / LLM Agent 一天可试几千个配置。【推论】搜索爆炸的同时，**假阳性也爆炸**——这正是 Bailey & López de Prado 的 PBO 框架要解决的问题。

### 生产证据与论文证据严重背离
2026 年 arXiv 对 3,505 个 LLM 交易代理的实测：41% 胜率，低于散户基准 50%；43% 仓位曾浮盈 +300bp 却最终亏损平仓【事实】。论文里的 Sharpe 2.5 与生产里的零边际，差距来自**成本、执行、过拟合、对手适应**。

### 监管已把 AI 量化纳入制度化轨道
中国《证券市场程序化交易管理规定》2024 年 10 月实施，2025 年沪深北细则落地，2026 年吴清主席明确「深化细化高频量化监管」【事实】。不懂规则，技术再强也可能一票否决。
:::

## 一个必须接受的坏消息

**绝大多数回测漂亮的 AI 策略，在样本外跑不赢「什么都不做」。**

Quantopian 888 个策略 cohort 研究显示：回测 Sharpe 对样本外表现的 R² 接近 0【事实】。你看到的「AI 战胜市场」叙事，很大概率是**搜索 + 幸存者偏差**的产物，而非模型真的「学会了」市场。

<!-- nav:世界模型 -->
# 世界地图

## 九层拆解

:::details Level 0 · 现象层
K 线、新闻标题「AI 基金年化 50%」、券商 App 里的「智能选股」。这一层信息密度最低，且充满营销偏差。
:::

:::details Level 1 · 数据层
Tick、分钟线、财报、舆情、卫星图、供应链、订单簿。AI 的「燃料」。Garbage in, garbage out——标签泄露、幸存者偏差、前视偏差，在这一层就已注定结局。
:::

:::details Level 2 · 特征层
技术指标、基本面比率、嵌入向量、图网络节点、LLM 提取的事件因子。特征工程是隐性搜索：每试一个特征组合，都在增加多重检验负担。
:::

:::details Level 3 · 模型层
线性回归、树模型、LSTM、Transformer、强化学习策略网络、多智能体研究流水线。模型是函数逼近器，不是「市场真理」。
:::

:::details Level 4 · 信号层
预测收益、排名、分类概率、交易方向。IC=0.05 已算不错，IC=0.10 在日频上非常罕见。
:::

:::details Level 5 · 组合层
权重优化、风险平价、约束（行业、换手、杠杆）。Grinold-Kahn：策略 Sharpe ≈ IC × √N。
:::

:::details Level 6 · 执行层
TWAP/VWAP、智能路由、拆单、暗池。LLM Agent 研究显示：中位杠杆 5× 且波动率盲【事实】。
:::

:::details Level 7 · 生态层
因子拥挤、策略同质化、监管、算力军备竞赛。当所有人都用 Transformer 挖 alpha，alpha 就变成「公共品」。
:::

:::details Level 8 · 元层
搜索过程本身、发表偏差、商业叙事、投资者认知。**这一层决定你该不该相信下面所有层的数据。**
:::

:::raw
<svg viewBox="0 0 680 520" width="100%" style="max-width:680px">
  <defs>
    <marker id="aiA" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#7c848f"/></marker>
    <marker id="aiR" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="20" y="16" width="640" height="44" rx="8" fill="#f0f4ff" stroke="#1d4ed8"/><text x="36" y="44" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">L0 现象 · L1 数据 · L2 特征 · L3 模型 · L4 信号 · L5 组合 · L6 执行 · L7 生态 · L8 元认知</text>
  <rect x="80" y="72" width="520" height="420" rx="12" fill="#fafbfc" stroke="#c9d0d9"/>
  <text x="100" y="100" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">九层世界地图（AI 量化全栈）</text>
  <rect x="100" y="116" width="480" height="36" rx="6" fill="#eef1f5"/><text x="116" y="140" font-size="11" fill="#454c56" font-family="sans-serif">L8 元层：搜索偏差 · 叙事 · 监管议程</text>
  <rect x="100" y="160" width="480" height="36" rx="6" fill="#fde8e6"/><text x="116" y="184" font-size="11" fill="#454c56" font-family="sans-serif">L7 生态：拥挤 · 衰减 · 算力竞争 · 政策</text>
  <rect x="100" y="204" width="480" height="36" rx="6" fill="#fff7e6"/><text x="116" y="228" font-size="11" fill="#454c56" font-family="sans-serif">L6 执行：滑点 · 冲击 · 杠杆 · 爆仓</text>
  <rect x="100" y="248" width="480" height="36" rx="6" fill="#f8fdfa"/><text x="116" y="272" font-size="11" fill="#454c56" font-family="sans-serif">L5 组合：权重 · 风险预算 · 换手约束</text>
  <rect x="100" y="292" width="480" height="36" rx="6" fill="#eaf0ff"/><text x="116" y="316" font-size="11" fill="#454c56" font-family="sans-serif">L4 信号：IC · 衰减 · 稳定性</text>
  <rect x="100" y="336" width="480" height="36" rx="6" fill="#f0f4ff"/><text x="116" y="360" font-size="11" fill="#454c56" font-family="sans-serif">L3 模型：ML/DL/RL/LLM Agent</text>
  <rect x="100" y="380" width="480" height="36" rx="6" fill="#fafbfc" stroke="#c9d0d9"/><text x="116" y="404" font-size="11" fill="#454c56" font-family="sans-serif">L2 特征 · L1 数据 · L0 现象</text>
  <line x1="580" y1="354" x2="620" y2="180" stroke="#d5342c" stroke-dasharray="5 4" marker-end="url(#aiR)"/>
  <text x="590" y="270" font-size="10" fill="#d5342c" font-family="sans-serif" transform="rotate(90 590 270)">再训练闭环</text>
</svg>
:::

# 核心概念地图

:::raw
<svg viewBox="0 0 680 280" width="100%" style="max-width:680px">
  <defs><marker id="aiB" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#1d4ed8"/></marker></defs>
  <rect x="20" y="30" width="190" height="220" rx="10" fill="#f0f4ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="40" y="58" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">抽象概念</text>
  <text x="40" y="88" font-size="12" fill="#454c56" font-family="sans-serif">· 过拟合 / PBO</text>
  <text x="40" y="112" font-size="12" fill="#454c56" font-family="sans-serif">· 探索-利用权衡</text>
  <text x="40" y="136" font-size="12" fill="#454c56" font-family="sans-serif">· 非平稳性</text>
  <text x="40" y="160" font-size="12" fill="#454c56" font-family="sans-serif">· 对抗适应</text>
  <text x="40" y="184" font-size="12" fill="#454c56" font-family="sans-serif">· 多重检验</text>
  <text x="40" y="208" font-size="12" fill="#454c56" font-family="sans-serif">· 信号衰减</text>
  <rect x="245" y="30" width="190" height="220" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.5"/>
  <text x="265" y="58" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">市场机制</text>
  <text x="265" y="88" font-size="12" fill="#454c56" font-family="sans-serif">· 搜索→假阳性膨胀</text>
  <text x="265" y="112" font-size="12" fill="#454c56" font-family="sans-serif">· 拥挤→IC 归零</text>
  <text x="265" y="136" font-size="12" fill="#454c56" font-family="sans-serif">· 制度变更→分布漂移</text>
  <text x="265" y="160" font-size="12" fill="#454c56" font-family="sans-serif">· 做市商学习→价差</text>
  <text x="265" y="184" font-size="12" fill="#454c56" font-family="sans-serif">· 监管→速度税</text>
  <text x="265" y="208" font-size="12" fill="#454c56" font-family="sans-serif">· 成本→负和抽水</text>
  <rect x="470" y="30" width="190" height="220" rx="10" fill="#f8fdfa" stroke="#0f8a4d" stroke-width="1.5"/>
  <text x="490" y="58" font-size="14" font-weight="700" fill="#15181d" font-family="sans-serif">可执行操作</text>
  <text x="490" y="88" font-size="12" fill="#454c56" font-family="sans-serif">· Walk-forward 验证</text>
  <text x="490" y="112" font-size="12" fill="#454c56" font-family="sans-serif">· 报告全部试次 K</text>
  <text x="490" y="136" font-size="12" fill="#454c56" font-family="sans-serif">· 监控 IC 滚动趋势</text>
  <text x="490" y="160" font-size="12" fill="#454c56" font-family="sans-serif">· 换手×成本预算</text>
  <text x="490" y="184" font-size="12" fill="#454c56" font-family="sans-serif">· 程序化交易报备</text>
  <text x="490" y="208" font-size="12" fill="#454c56" font-family="sans-serif">· 决策日志 + 熔断</text>
  <line x1="210" y1="140" x2="245" y2="140" stroke="#1d4ed8" marker-end="url(#aiB)"/>
  <line x1="435" y1="140" x2="470" y2="140" stroke="#1d4ed8" marker-end="url(#aiB)"/>
</svg>
:::

| 术语 | 含义 | 为什么重要 |
|---|---|---|
| **IC** | 预测值与实际收益的秩相关 | 策略理论的「信噪比」 |
| **IR** | IC 均值 / IC 标准差 | 衡量信号稳定性 |
| **PBO** | 回测过拟合概率 | 试次越多，越需要这个校正 |
| **Walk-forward** | 滚动训练-测试 | 比单次 hold-out 更接近实盘 |
| **Alpha 衰减** | 信号随时间弱化 | AI 策略的「半衰期」 |

# 核心参与者

:::cards g3
### 量化私募 / 自营
真正的 AI 量化主战场。有数据预算、算力、合规团队。头部机构 2026 年普遍部署 LLM 辅助研究 Agent【分析】。

### 券商与金融科技
提供程序化交易通道、算法单、托管与报备系统。2026 年监管要求取消专属交易网关、搬离交易所机房【事实】——速度红利被系统性压缩。

### 散户与「AI 荐股」
最容易被叙事吸引、也最缺乏搜索纪律的群体。2025 年证监会处罚多起以「量化投资」名义非法荐股案【事实】。

### 监管（CSRC / 交易所）
不是旁观者，是有目标函数的参与者。高频认定标准：每秒 300 笔或单日 2 万笔【事实】。
:::

# 核心变量

| 变量 | 典型量级 | 调节方向 |
|---|---|---|
| IC | 0.02–0.10（日频） | 特征质量、标签设计 |
| 策略广度 N | 50–500 只股票 | 分散 vs 聚焦 |
| 年化换手 | 2×–20× | 信号频率 |
| 单边成本 | 3–30 bp | 佣金+冲击+印花税 |
| 搜索试次 K | 10–10,000+ | AutoML/网格搜索 |

:::note amber 数字纪律
IC=0.08、N=200 时，理论 gross Sharpe ≈ 0.08×√200 = **1.13**。若年化换手 5×、单边成本 10bp，成本拖累 ≈ **1.0**（夏普单位），净 Sharpe 仅 **0.13**。
:::

# 因果关系

:::raw
<svg viewBox="0 0 680 320" width="100%" style="max-width:680px">
  <defs>
    <marker id="aiC" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#454c56"/></marker>
    <marker id="aiCr" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker>
  </defs>
  <rect x="40" y="40" width="120" height="44" rx="8" fill="#eaf0ff" stroke="#1d4ed8"/><text x="56" y="68" font-size="12" fill="#15181d" font-family="sans-serif">数据质量</text>
  <rect x="200" y="40" width="120" height="44" rx="8" fill="#fff7e6" stroke="#b8730a"/><text x="216" y="68" font-size="12" fill="#15181d" font-family="sans-serif">特征/搜索</text>
  <rect x="360" y="40" width="120" height="44" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/><text x="376" y="68" font-size="12" fill="#15181d" font-family="sans-serif">模型信号</text>
  <rect x="520" y="40" width="120" height="44" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="536" y="68" font-size="12" fill="#15181d" font-family="sans-serif">净收益</text>
  <line x1="160" y1="62" x2="200" y2="62" stroke="#454c56" marker-end="url(#aiC)"/>
  <line x1="320" y1="62" x2="360" y2="62" stroke="#454c56" marker-end="url(#aiC)"/>
  <line x1="480" y1="62" x2="520" y2="62" stroke="#454c56" marker-end="url(#aiC)"/>
  <path d="M 580 100 Q 340 200 160 84" fill="none" stroke="#d5342c" stroke-dasharray="5 4" marker-end="url(#aiCr)"/>
  <text x="300" y="220" font-size="11" fill="#d5342c" font-family="sans-serif">订单→价格→新数据（再训练闭环）</text>
</svg>
:::

| 关系 | 类型 | 说明 |
|---|---|---|
| 搜索试次 → 报告 Sharpe | 因果 | K=1000 时噪声期望最佳 Sharpe≈3.26 |
| 换手 → 成本拖累 | 因果 | 5×换手、10bp 单边 → 1.0 夏普单位拖累 |
| AI 名称 → 高收益 | 相关≠因果 | 营销叙事，需独立审计 |

# 隐藏关系

| 金融 AI 量化 | 其他领域 | 共同结构 |
|---|---|---|
| 多重回测试次 | 临床试验多重终点 | 试越多，假阳性越多 |
| PBO / Deflated Sharpe | 粒子物理 5σ 发现 | 必须校正搜索空间 |
| Alpha 衰减 | 生态位饱和 | 参与者增多→回报下降 |
| Walk-forward | 时序交叉验证 | 时间顺序不可打乱 |

:::note purple 隐藏关系：AI 研究 Agent ≠ 赚钱 Agent
AQuA（2026）论文报告 held-out Sharpe 2.0–2.5【待验证】；但同期 LLM 实盘 Agent 研究显示零方向性边际【事实】。差距在执行、成本、风控与过拟合。
:::

# 系统运行机制

<div class="flow"><span class="hi">数据采集</span><i>→</i><span>清洗对齐</span><i>→</i><span>特征工程</span><i>→</i><span>模型训练</span><i>→</i><span>信号生成</span><i>→</i><span>组合优化</span><i>→</i><span>算法执行</span><i>→</i><span>绩效归因</span><i>→</i><span class="hi">再训练</span></div>

**关键卡点**：样本外闸门（walk-forward）+ 成本闸门（扣费后仍为正）。

## 可调模型 1 · 漂移剥离器

:::raw
<div class="tool">
<div class="ctrl"><label>持有期 T（交易日）<input type="range" id="ai_T" min="5" max="60" step="5" value="40"><output id="ai_TO">40 日</output></label></div>
<div class="ctrl"><label>策略报告胜率<input type="range" id="ai_ps" min="50" max="80" step="0.1" value="65.1"><output id="ai_psO">65.1%</output></label></div>
<div class="ctrl"><label>市场年化漂移 μ<input type="range" id="ai_mu" min="0" max="25" step="0.5" value="10"><output id="ai_muO">10.0%</output></label></div>
<div class="ctrl"><label>年化波动 σ<input type="range" id="ai_sg" min="10" max="35" step="1" value="18"><output id="ai_sgO">18%</output></label></div>
<canvas id="aiChart" height="176" style="width:100%;margin-top:12px"></canvas>
<div class="readout">
<div class="ro"><span class="k">随机做多基准</span><strong id="ai_base">58.8%</strong><span id="ai_baseh" class="sub"></span></div>
<div class="ro"><span class="k">超额胜率</span><strong id="ai_dp">+6.3 pp</strong><span id="ai_dph" class="sub"></span></div>
<div class="ro"><span class="k">所需样本量</span><strong id="ai_n">464</strong><span id="ai_nh" class="sub"></span></div>
<div class="ro" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span class="k">判定</span><strong id="ai_v">尚可</strong><span id="ai_vh" class="sub"></span></div>
</div>
</div>
:::

μ=10%、σ=18%、T=40 日时，随机做多基准胜率 **58.76%**——「65.1% 胜率」的真实超额只有 **6.3pp**。

# 时间演化

:::raw
<svg viewBox="0 0 680 200" width="100%" style="max-width:680px">
  <line x1="40" y1="100" x2="640" y2="100" stroke="#c9d0d9" stroke-width="2"/>
  <circle cx="80" cy="100" r="6" fill="#1d4ed8"/><text x="48" y="130" font-size="10" fill="#15181d" font-family="sans-serif">2010 ML</text>
  <circle cx="200" cy="100" r="6" fill="#1d4ed8"/><text x="168" y="130" font-size="10" fill="#15181d" font-family="sans-serif">2015 DL</text>
  <circle cx="340" cy="100" r="6" fill="#b8730a"/><text x="308" y="130" font-size="10" fill="#15181d" font-family="sans-serif">2020 另类数据</text>
  <circle cx="480" cy="100" r="6" fill="#b8730a"/><text x="448" y="130" font-size="10" fill="#15181d" font-family="sans-serif">2024 程序化新规</text>
  <circle cx="600" cy="100" r="6" fill="#d5342c"/><text x="568" y="130" font-size="10" fill="#15181d" font-family="sans-serif">2026 LLM实测</text>
</svg>
:::

# 利益与激励

| 参与者 | 激励 | 对 AI 量化的影响 |
|---|---|---|
| 量化私募 | 管理费 + 业绩提成 | 有动力夸大回测、隐藏试次 |
| 数据商 | 卖另类数据订阅 | 样本偏差、过拟合温床 |
| 云厂商 | 卖算力 | 算得越多越赚钱≠投资者赚钱 |
| 监管 | 市场公平与稳定 | 2026 压缩速度红利 |
| 散户 | 追求「智能」捷径 | 最易购买叙事而非审计 |

# 资源与信息流

:::raw
<svg viewBox="0 0 680 260" width="100%" style="max-width:680px">
  <defs><marker id="aiD" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 z" fill="#d5342c"/></marker></defs>
  <rect x="240" y="30" width="200" height="60" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="2"/>
  <text x="340" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="#15181d" font-family="sans-serif">投资者资金池</text>
  <rect x="60" y="130" width="130" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="125" y="160" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">佣金+印花税</text>
  <rect x="220" y="130" width="130" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="285" y="160" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">冲击成本</text>
  <rect x="380" y="130" width="130" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="445" y="160" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">管理费</text>
  <rect x="540" y="130" width="130" height="50" rx="8" fill="#fde8e6" stroke="#d5342c"/><text x="605" y="160" text-anchor="middle" font-size="11" fill="#15181d" font-family="sans-serif">数据+算力</text>
  <line x1="280" y1="90" x2="125" y2="130" stroke="#d5342c" marker-end="url(#aiD)"/>
  <line x1="340" y1="90" x2="285" y2="130" stroke="#d5342c" marker-end="url(#aiD)"/>
  <line x1="400" y1="90" x2="445" y2="130" stroke="#d5342c" marker-end="url(#aiD)"/>
  <line x1="460" y1="90" x2="605" y2="130" stroke="#d5342c" marker-end="url(#aiD)"/>
  <rect x="200" y="210" width="280" height="40" rx="8" fill="#f8fdfa" stroke="#0f8a4d"/>
  <text x="340" y="236" text-anchor="middle" font-size="12" fill="#15181d" font-family="sans-serif">剩余 ≈ 净 alpha（若存在）</text>
</svg>
:::

<!-- nav:杠杆与陷阱 -->
# 关键杠杆点

| # | 杠杆点 | 为什么杠杆率高 | 怎么操作 |
|---|---|---|---|
| 1 | **搜索纪律** | 决定 90% 的回测是真是假 | 记录试次 K，用 PBO/DSR 校正 |
| 2 | **成本闸门** | 唯一确定的 alpha | IC×√N 必须大于换手×成本 |
| 3 | **Walk-forward** | 比单次切分更接近实盘 | 滚动训练，禁止打乱时序 |
| 4 | 漂移基准对照 | 剥离 β 后的真实超额 | 用工具 1 算 p_base |
| 5 | IC 衰减监控 | 策略寿命预警 | 滚动 6 个月 IC 趋势 |
| 6 | 合规报备 | 一票否决项 | 程序化交易先报告后交易 |
| 7 | 执行风控 | LLM Agent 最大死因 | 杠杆上限、波动率缩放 |
| 8 | 数据审计 | 标签泄露一次性杀死策略 | 特征时间戳 vs 标签时间戳 |
| 9 | 容量约束 | 规模杀死 alpha | 冲击成本反推上限 |
| 10 | 叙事免疫力 | 抵抗「AI 年化 50%」 | 要求审计报告与完整试次 |

## 可调模型 2 · 试次惩罚器

:::raw
<div class="tool">
<div class="ctrl"><label>搜索试次 K<input type="range" id="ai_K" min="10" max="1000" step="10" value="100"><output id="ai_KO">100</output></label></div>
<div class="ctrl"><label>报告 Sharpe<input type="range" id="ai_sr" min="5" max="40" step="1" value="25"><output id="ai_srO">2.50</output></label></div>
<canvas id="aiTrialsChart" height="214" style="width:100%;margin-top:12px"></canvas>
<div class="readout">
<div class="ro"><span class="k">噪声期望最佳 Sharpe</span><strong id="ai_em">2.53</strong><span id="ai_emh" class="sub"></span></div>
<div class="ro"><span class="k">超额（报告−噪声）</span><strong id="ai_gap">-0.03</strong><span id="ai_gaph" class="sub"></span></div>
<div class="ro" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span class="k">判定</span><strong id="ai_tv">可疑</strong><span id="ai_tvh" class="sub"></span></div>
</div>
</div>
:::

K=100 时，纯噪声策略的期望最佳 Sharpe ≈ **2.53**。

## 可调模型 3 · IC→净夏普

:::raw
<div class="tool">
<div class="ctrl"><label>IC<input type="range" id="ai_icv" min="2" max="15" step="0.5" value="8"><output id="ai_icO">8.0%</output></label></div>
<div class="ctrl"><label>广度 N<input type="range" id="ai_Nv" min="50" max="500" step="10" value="200"><output id="ai_NO">200</output></label></div>
<div class="ctrl"><label>年化换手<input type="range" id="ai_to" min="1" max="15" step="0.5" value="5"><output id="ai_toO">5.0×</output></label></div>
<div class="ctrl"><label>单边成本<input type="range" id="ai_cps" min="3" max="30" step="1" value="10"><output id="ai_cO">10 bp</output></label></div>
<div class="readout">
<div class="ro"><span class="k">理论 gross Sharpe</span><strong id="ai_gross">1.13</strong><span id="ai_grossh" class="sub"></span></div>
<div class="ro"><span class="k">成本拖累（夏普单位）</span><strong id="ai_cost">1.00</strong><span id="ai_costh" class="sub"></span></div>
<div class="ro"><span class="k">净 Sharpe</span><strong id="ai_net">0.13</strong><span id="ai_neth" class="sub"></span></div>
<div class="ro" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span class="k">判定</span><strong id="ai_iv">脆弱</strong><span id="ai_ivh" class="sub"></span></div>
</div>
</div>
:::

# 常见认知陷阱

:::details 陷阱 1 · 把回测 Sharpe 当能力
K=1000 时噪声期望最佳 Sharpe 已达 3.26。不披露试次，等于不披露证据。
:::

:::details 陷阱 2 · 把论文当实盘
AQuA 报告 walk-forward Sharpe 2.0【待验证】；LLM 实盘 Agent 零边际【事实】。
:::

:::details 陷阱 3 · 忽视漂移基准
40 日持有、μ=10% 时随机做多胜率 58.76%，不是 50%。
:::

:::details 陷阱 4 · 标签泄露
用未来信息训练——IC 虚高，实盘归零。
:::

:::details 陷阱 5 · 随机交叉验证
金融时序不能 shuffle。随机 CV 会引入前视偏差。
:::

:::details 陷阱 6 · 把 LLM 当分析师
生产研究显示 49.3% 曾浮盈 +300bp 的仓位最终亏损平仓。
:::

:::details 陷阱 7 · 追「AI 基金」营销
Omphalos、Vertus、I Know First 等自称 AI 业绩惊人【待验证】——单一来源数字默认打折。
:::

:::details 陷阱 8 · 忽视换手
IC=0.08、N=200 的 gross Sharpe 1.13，5×换手 10bp 后净 Sharpe 仅 0.13。
:::

:::details 陷阱 9 · 速度即护城河
2026 年监管压缩主机托管与专属网关。
:::

:::details 陷阱 10 · 把相关当因果
「AI 持仓与上涨同时出现」不等于 AI 导致了上涨。
:::

:::details 陷阱 11 · 样本内调参
在测试集上反复调参 = 把测试集变成训练集。
:::

:::details 陷阱 12 · 不做空失败记录
Quantopian 研究：回测指标几乎不预测样本外。
:::

<!-- nav:落地 -->
# 从抽象到现实

:::tabs
@@过拟合 → 试次账本
**抽象**：搜索 K 次，必然有人「中彩票」。

**操作**：每次实验记一笔；用工具 2 估算噪声门槛。
@@
@@IC → 成本闸门
**抽象**：IC×√N 是理论上限，换手×成本是确定性扣减。

**操作**：用工具 3，任何策略先过成本闸门再谈上线。
@@
@@LLM Agent → 风控优先
**机制**：生产数据显示杠杆波动率盲、止盈纪律差。

**操作**：硬编码最大杠杆、波动率缩放、强制止损 bracket。
@@
:::

# 从理论到行动

```
假设 → 特征 → 模型 → Walk-forward → 成本校正 → 小资金试点 → 监控 IC → 迭代或下线
```

:::cards g3
### 今天
用工具 1 算一个「AI 策略胜率」的真实超额。

### 本周
估计搜索试次 K，用工具 2 看噪声门槛。

### 本月
建立 IC / 换手 / 成本三维监控表。
:::

# 技能树

:::details L1 认知（1–2 周）
- 区分回测 / 纸面 / 实盘
- 理解 IC、Sharpe、换手、成本的关系
- 读 Bailey PBO 论文摘要
:::

:::details L2 方法（1–2 月）
- 实现 purged walk-forward CV
- 手写 Grinold-Kahn IC→Sharpe
- 搭建试次账本
:::

:::details L3 系统（3–6 月）
- 完整研究流水线
- 绩效归因与 IC 衰减监控
- 合规报备流程
:::

:::details L4 生态（6 月+）
- 评估另类数据 ROI
- 多策略组合与风险预算
:::

# 游戏化世界

**角色**：AI 量化研究员。**Boss 战**：「披露全部 847 次试次后，Sharpe 从 2.8 降到 0.4」——击败方式：事前记录。

# 任务系统

| 等级 | 任务 | 奖励 |
|---|---|---|
| 日常 | 记录今日 IC 滚动值 | +10 算力 |
| 周常 | 完成一次 walk-forward 切片 | +50 信誉 |
| 主线 | 搭建扣费后仍为正的策略 | 解锁「实盘试点」 |
| 隐藏 | 发现自己的标签泄露 | +100 诚实 |

# 反事实模拟

:::tabs
@@如果我披露全部试次
Sharpe 可能从 2.5 降到 0.5 以下——但这是诚实起点。
@@
@@如果我把换手降一半
净 Sharpe 可能从 0.13 升到 0.63（IC=0.08, N=200）——降频 often beats 更复杂模型。
@@
@@如果监管禁止当前执行方式
依赖速度的策略直接归零。
@@
@@如果我用 LLM 全自动交易
生产证据：胜率 41%，低于基准——除非补齐风控与执行。
@@
:::

## 可调模型 4 · 样本量门槛

:::raw
<div class="tool">
<div class="ctrl"><label>报告胜率<input type="range" id="ai_wr" min="52" max="75" step="0.1" value="65.1"><output id="ai_wrO">65.1%</output></label></div>
<div class="ctrl"><label>声称超额（pp）<input type="range" id="ai_edge" min="1" max="15" step="0.1" value="6.3"><output id="ai_edgeO">6.3 pp</output></label></div>
<canvas id="aiSampleChart" height="214" style="width:100%;margin-top:12px"></canvas>
<div class="readout">
<div class="ro"><span class="k">所需交易次数</span><strong id="ai_sn">464</strong><span id="ai_snh" class="sub"></span></div>
<div class="ro"><span class="k">经验检验力</span><strong id="ai_pwr">65%</strong><span id="ai_pwrh" class="sub"></span></div>
<div class="ro" style="grid-column:1/-1;display:flex;gap:12px;align-items:baseline"><span class="k">判定</span><strong id="ai_sv">中等</strong><span id="ai_svh" class="sub"></span></div>
</div>
</div>
:::

<!-- nav:路径 -->
# 四级能力路线

| 级别 | 标志 | 能做什么 |
|---|---|---|
| L1 | 能算成本与基准 | 识别明显骗局叙事 |
| L2 | 能跑 walk-forward | 独立评估一个 AI 策略报告 |
| L3 | 能建完整流水线 | 小资金实盘试点 |
| L4 | 能设计搜索纪律 | 机构级研究治理 |

# 30 分钟最小实践

1. **5 分钟**：假设 Sharpe=2.5 的 AI 策略。
2. **5 分钟**：保守填 K=100。
3. **10 分钟**：打开工具 2，看噪声期望 Sharpe（≈2.53）与差距。
4. **5 分钟**：写下结论。
5. **5 分钟**：问「有没有全部试次记录？」——没有则【待验证】。

# 7 天实践计划

| 天 | 任务 |
|---|---|
| 1 | 工具 1：算漂移基准与真实超额 |
| 2 | 工具 3：IC/换手/成本敏感性 |
| 3 | 读 Bailey PBO 摘要 + 工具 2 |
| 4 | 画「数据→信号→执行」流水线 |
| 5 | 查程序化交易报备要求 |
| 6 | 标注一个 AI 量化营销案例 |
| 7 | 写一页检查清单 |

# 30 天能力构建计划

:::tabs
@@第 1 周
完成 7 天计划；建立试次账本模板
@@
@@第 2 周
实现 walk-forward；计算滚动 IC
@@
@@第 3 周
读 Quantopian 888 策略论文；读 LLM Agent 生产论文
@@
@@第 4 周
整合检查清单；用四个工具评估真实案例
@@
:::

# 最值得掌握的 10 个核心模型

| # | 模型 | 一句话 |
|---|---|---|
| 1 | Grinold-Kahn | Sharpe ≈ IC × √N |
| 2 | PBO / CSCV | 回测过拟合概率 |
| 3 | Deflated Sharpe | 校正试次后的 Sharpe |
| 4 | Walk-forward | 时序样本外验证 |
| 5 | 漂移基准 Φ | 随机做多胜率 > 50% |
| 6 | 成本拖累 | 换手 × 单边成本 × 2 |
| 7 | Alpha 衰减 | 拥挤导致 IC 下降 |
| 8 | 标签泄露检测 | 时间戳对齐审计 |
| 9 | 探索-利用 | 算力分配博弈 |
| 10 | 监管博弈 | 速度红利→合规成本 |

# 关键问题清单

:::details 评估 AI 策略前必问
1. 总共试了几次（K）？报告全部试次了吗？
2. Walk-forward 还是单次 hold-out？
3. 扣费后 Sharpe 还是正的吗？
4. IC 最近 6 个月趋势如何？
5. 合规报备完成了吗？
6. 收益来源是谁的亏损？
7. 规模扩大 10 倍还能活吗？
8. 有没有独立审计？
9. 标签有没有泄露？
10. 失败策略有没有被隐藏？
:::

# 下一阶段探索方向

:::cards g2
### 技术
- Purged k-fold CV（López de Prado）
- 在线学习与非平稳适应
- LLM 做研究助手而非直接下单

### 监管
- 2026 高频公平性细则演进
- 期货程序化交易统一框架
:::

:::note green 最后一句
AI 量化最大的敌人不是「模型不够强」，而是**你在不知不觉中撒了多少谎**——对数据、对试次、对成本、对基准。把搜索纪律当作第一性原理，AI 才是杠杆。
:::

<!-- nav:附录 -->
# 数据来源与标记约定 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 程序化交易管理规定 | 监管公告 | 证监会，2024-05-11 | 【事实】 |
| 高频认定 300 笔/秒 | 监管细则 | 沪深北交易所，2025-04 | 【事实】 |
| Quantopian 888 策略 | 学术论文 | SSRN 2745220 | 【事实】 |
| PBO / CSCV | 学术论文 | Bailey et al. | 【事实】 |
| LLM Agent 生产实测 | 学术论文 | arXiv:2609.05663 | 【事实】 |
| AQuA 研究系统 | 学术论文 | arXiv:2608.12841 | 【待验证】 |

# 免责声明 {.appendix}

本手册仅供学习与研究，**不构成任何投资建议**。金融市场存在风险，AI 量化策略的历史回测不代表未来表现。程序化交易须遵守当地法律法规，完成必要报备。作者不对因使用本手册内容而产生的任何损失承担责任。投资有风险，入市需谨慎。
