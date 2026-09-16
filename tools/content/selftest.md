---
slug: selftest
title: 构建器自测
subtitle: 覆盖全部语法组件的<strong>端到端验证</strong>用例
brand_sub: Build × Verify
chips: 4 节 · 语法自测 | 1 个可调模型 | 数据截至 2026-09
date: 2026-09-16
data_asof: 2026 年 9 月
tags: [自测, 构建器]
theme_js_file: selftest.js
md_raw: hint
---

# 一句话理解

这个文件用来验证构建器把内容源正确渲染成 HTML 与 Markdown 两种格式。

它覆盖：front matter、nav 分组、note 容器、cards 网格、details 折叠、tabs 面板、raw 注入、表格后处理、来源标签、附录编号。

# 基础元素

普通段落含 **加粗**、*斜体*、`行内代码`、[链接](https://example.com)。

来源标记测试：【事实】多方一致、【分析】机构判断、【推论】本手册推导、【假设】未验证、【待验证】单一来源。

## 二级子标题

### 三级子标题

1. 有序列表第一项
2. 有序列表第二项

- 无序列表第一项
- 无序列表第二项

> 这是一个引用块。

| 变量 | 可观察性 | 说明 |
|---|---|---|
| 价格 | 直接可观察 | 每笔成交都记录 |
| 信号 | 需推断 | 从成交结构反推 |

:::note red 风险提示
表格首列应当自动加上 `k` 类，整张表应当被 `.tw` 包裹以支持窄屏滚动。
:::

:::cards g3
### 第一张卡
默认配色，验证卡片网格。

### 第二张卡 {.danger}
危险配色。

### 第三张卡 {.accent}
强调配色。
:::

:::details 折叠卡标题
这里的内容默认隐藏，点击摘要展开。
:::

:::tabs
@@方案 A
选择方案 A 的结果。

@@方案 B
选择方案 B 的结果。

@@什么都不做
基线情形。
:::

# 视觉与交互

下面验证 raw 注入：一张内联 SVG 和一个可调模型。

:::raw
<svg viewBox="0 0 680 150" width="100%" style="max-width:680px">
  <rect x="10" y="30" width="150" height="60" rx="10" fill="#eaf0ff" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="85" y="66" text-anchor="middle" font-size="14" fill="#15181d" font-family="sans-serif">输入</text>
  <line x1="170" y1="60" x2="250" y2="60" stroke="#7c848f" stroke-width="1.5" marker-end="url(#ar)"/>
  <rect x="260" y="30" width="150" height="60" rx="10" fill="#fff7e6" stroke="#b8730a" stroke-width="1.5"/>
  <text x="335" y="66" text-anchor="middle" font-size="14" fill="#15181d" font-family="sans-serif">机制</text>
  <line x1="420" y1="60" x2="500" y2="60" stroke="#7c848f" stroke-width="1.5" marker-end="url(#ar)"/>
  <rect x="510" y="30" width="150" height="60" rx="10" fill="#e8f6ef" stroke="#0f8a4d" stroke-width="1.5"/>
  <text x="585" y="66" text-anchor="middle" font-size="14" fill="#15181d" font-family="sans-serif">结果</text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
    <path d="M0,0 L7,3 L0,6 z" fill="#7c848f"/></marker></defs>
</svg>
:::

:::raw
<div class="tool">
  <div class="ctrls">
    <div class="ctrl">
      <label for="st_n">试验次数 K</label>
      <input type="range" id="st_n" min="1" max="5" step="1" value="2">
      <output id="st_nO">100</output>
    </div>
  </div>
  <canvas id="stChart" width="640" height="220" style="width:100%;max-width:640px"></canvas>
  <div class="readout">
    <div class="ro"><div class="lbl">期望最大 Z</div><div class="val" id="st_z">1.00</div><div class="hint" id="st_hint">—</div></div>
  </div>
</div>
:::

# 附录：来源清单 {.appendix}

| 内容 | 来源类型 | 具体来源 | 标记 |
|---|---|---|---|
| 构建器自测 | 内部 | 本地验证用例 | 【事实】 |
