/* 《停損的勝算》主题脚本 · 自包含 IIFE，与页面通用脚本隔离
   数字纪律：本文件算出的每个数都必须与正文一致。
   停損蒙特卡洛参数与正文完全相同：μ=10%、σ=18%、252 交易日、2 万条路径、种子 20260916。 */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }
  /* 负数用 U+2212 减号，与正文排版一致 */
  function num(v, d) { return (v < 0 ? '−' : '') + Math.abs(v).toFixed(d); }

  var INK = '#0f1115', MUT = '#5b6472', LINE = '#d8dee8';
  var BLUE = '#2563eb', RED = '#dc2626', GREEN = '#059669', AMBER = '#d97706', PURPLE = '#7c3aed';

  /* ── 通用：canvas 上屏 ────────────────────────────────────────── */
  function fit(cv) {
    var dpr = window.devicePixelRatio || 1;
    var w = cv.clientWidth || 640;
    var h = parseInt(cv.getAttribute('height'), 10) || 180;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }
  function clear(ctx, w, h) { ctx.clearRect(0, 0, w, h); }
  function label(ctx, s, x, y, color, size, align, weight) {
    ctx.fillStyle = color || INK;
    ctx.font = (weight ? weight + ' ' : '') + (size || 11) + 'px system-ui,-apple-system,"PingFang SC",sans-serif';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(s, x, y);
  }
  function clampTag(ctx, s, x, y, color) {
    ctx.font = '600 11px system-ui,-apple-system,"PingFang SC",sans-serif';
    var tw = ctx.measureText(s).width;
    var lx = Math.max(4, Math.min(x, 636 - tw));
    label(ctx, s, lx, y, color, 11, 'left', '600');
  }

  /* ── 随机数：与验证脚本逐位一致 ──────────────────────────────── */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  var N = 20000, T = 252, SEED = 20260916;
  var MU_A = 0.10, SD_A = 0.18;
  var muD = MU_A / 252, sdD = SD_A / Math.sqrt(252);
  var Z = null;                     // 预计算的标准正态矩阵（Float32Array, N×T）

  function buildZ() {
    var rnd = mulberry32(SEED);
    var z = new Float32Array(N * T);
    var i = 0;
    for (var k = 0; k < N; k++) {
      for (var t = 0; t < T; t++) {
        var u = 0, v = 0;
        while (u === 0) u = rnd();
        while (v === 0) v = rnd();
        z[i++] = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
      }
    }
    return z;
  }

  /* 停損 vs 买入持有：同一批路径上跑两种规则，配对比较 */
  function simStop(L, rb) {
    if (!Z) Z = buildZ();
    var rbd = rb / 252;
    var bhSum = 0, slSum = 0, hit = 0, bhWin = 0, slWin = 0;
    var tailBH = [], tailSL = [], ddBH = [], ddSL = [];
    for (var k = 0; k < N; k++) {
      var base = k * T;
      // 买入持有
      var c = 0, pk = -1e9, dd = 0;
      for (var t = 0; t < T; t++) {
        c += muD + Z[base + t] * sdD;
        if (c > pk) pk = c;
        if (pk - c > dd) dd = pk - c;
      }
      // 停損：累计对数收益 <= -L 触发，之后转避险资产
      var c2 = 0, pk2 = -1e9, dd2 = 0, didExit = false;
      for (var t2 = 0; t2 < T; t2++) {
        if (!didExit) {
          c2 += muD + Z[base + t2] * sdD;
          if (c2 > pk2) pk2 = c2;
          if (pk2 - c2 > dd2) dd2 = pk2 - c2;
          if (c2 <= -L) didExit = true;
        } else {
          c2 += rbd;
        }
      }
      bhSum += c; slSum += c2;
      if (didExit) hit++;
      if (c > 0) bhWin++;
      if (c2 > 0) slWin++;
      tailBH.push(c); tailSL.push(c2); ddBH.push(dd); ddSL.push(dd2);
    }
    tailBH.sort(function (a, b) { return a - b; });
    tailSL.sort(function (a, b) { return a - b; });
    ddBH.sort(function (a, b) { return a - b; });
    ddSL.sort(function (a, b) { return a - b; });
    var q = function (arr, p) { return arr[Math.min(arr.length - 1, Math.max(0, Math.floor(p * (arr.length - 1))))]; };
    var f = function (x) { return Math.expm1(x) * 100; };
    return {
      bh: f(bhSum / N), sl: f(slSum / N),
      hit: hit / N * 100,
      p5bh: f(q(tailBH, 0.05)), p5sl: f(q(tailSL, 0.05)),
      p95bh: f(q(tailBH, 0.95)), p95sl: f(q(tailSL, 0.95)),
      dd50bh: q(ddBH, 0.50) * 100, dd50sl: q(ddSL, 0.50) * 100,
      dd95bh: q(ddBH, 0.95) * 100, dd95sl: q(ddSL, 0.95) * 100,
      winBH: bhWin / N * 100, winSL: slWin / N * 100
    };
  }

  /* ── 工具 1 · 停損价码 ────────────────────────────────────────── */
  var cur1 = null;
  function drawStop(st, L) {
    var cv = $('slChart'); if (!cv) return;
    var g = fit(cv), ctx = g.ctx, w = g.w, h = g.h;
    clear(ctx, w, h);

    var padL = 104, padR = 14, padT = 30, gap = 26;
    var panelW = (w - padL - padR - gap) / 2;
    var data = [
      { t: '期望收益（越高越好）', a: st.bh, b: st.sl, ca: BLUE, cb: AMBER },
      { t: '第 5 百分位（越靠右越好）', a: st.p5bh, b: st.p5sl, ca: BLUE, cb: GREEN }
    ];

    for (var i = 0; i < 2; i++) {
      var d = data[i], x0 = padL + i * (panelW + gap);
      label(ctx, d.t, x0, padT - 14, MUT, 11, 'left', '600');

      var lo = Math.min(0, d.a, d.b), hi = Math.max(0, d.a, d.b);
      var span = (hi - lo) || 1;
      lo -= span * 0.12; hi += span * 0.18;
      var zero = x0 + (0 - lo) / (hi - lo) * panelW;

      // 零轴线
      ctx.strokeStyle = LINE; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(zero, padT - 2); ctx.lineTo(zero, h - 26); ctx.stroke();

      var bh = 16, tops = [padT + 6, padT + 6 + bh + 16];
      var vals = [d.a, d.b], cols = [d.ca, d.cb], names = ['买持', '停損'];
      ctx.font = '600 11px system-ui,-apple-system,"PingFang SC",sans-serif';
      var vw = Math.max(ctx.measureText('+' + Math.abs(d.a).toFixed(1) + '%').width,
                        ctx.measureText('−' + Math.abs(d.a).toFixed(1) + '%').width);
      for (var j = 0; j < 2; j++) {
        var y = tops[j], xv = x0 + (vals[j] - lo) / (hi - lo) * panelW;
        var left = Math.min(zero, xv), bw = Math.abs(xv - zero);
        ctx.fillStyle = cols[j];
        ctx.globalAlpha = 0.85;
        ctx.fillRect(left, y, bw, bh);
        ctx.globalAlpha = 1;
        var s = (vals[j] > 0 ? '+' : '−') + Math.abs(vals[j]).toFixed(1) + '%';
        // 名称与数值都排在面板左侧之外，数值靠右、名称在数值左边——不会与条形重叠
        ctx.font = '600 11px system-ui,-apple-system,"PingFang SC",sans-serif';
        label(ctx, s, x0 - 10, y + bh / 2, cols[j], 11, 'right', '700');
        label(ctx, names[j], x0 - 10 - vw - 8, y + bh / 2, MUT, 10, 'right');
      }
      label(ctx, '0', zero, h - 14, MUT, 10, 'center');
    }
    label(ctx, '停損阈值 ' + (L * 100).toFixed(0) + '%', w - padR, padT - 14, INK, 11, 'right', '700');
  }

  function renderStop() {
    var el = $('sl_L'); if (!el) return;
    var L = parseFloat(el.value) / 100;
    var brb = $('sl_rb');
    var rb = brb ? parseFloat(brb.value) / 100 : 0;
    txt($('sl_LO'), (L * 100).toFixed(0) + '%');
    if (brb) txt($('sl_rbO'), (rb * 100).toFixed(rb === 0 ? 0 : 1) + '%' + (rb === 0 ? '（现金）' : ''));

    var st = simStop(L, rb);
    cur1 = st;
    txt($('sl_bh'), '+' + st.bh.toFixed(1) + '%');
    txt($('sl_sl'), '+' + st.sl.toFixed(1) + '%');
    var prem = st.sl - st.bh;
    txt($('sl_prem'), (prem >= 0 ? '+' : '−') + Math.abs(prem).toFixed(2) + ' pp');
    tint($('sl_prem'), prem >= 0 ? GREEN : RED);
    txt($('sl_hit'), st.hit.toFixed(1) + '%');
    txt($('sl_p5'), num(st.p5bh, 1) + '% → ' + num(st.p5sl, 1) + '%');
    txt($('sl_win'), st.winBH.toFixed(1) + '% → ' + st.winSL.toFixed(1) + '%');

    var gain = st.p5sl - st.p5bh;
    var vd, col;
    if (prem >= 0) { vd = '停止溢酬转正：' + prem.toFixed(2) + 'pp 增益'; col = GREEN; }
    else if (Math.abs(prem) < 0.5) { vd = '接近中性：保费 ' + Math.abs(prem).toFixed(2) + 'pp'; col = AMBER; }
    else { vd = '买左尾保险，保费 ' + Math.abs(prem).toFixed(2) + 'pp，尾部改善 ' + gain.toFixed(1) + 'pp'; col = RED; }
    txt($('sl_vd'), vd);
    tint($('sl_vd'), col);
    drawStop(st, L);
  }

  /* ── 工具 2 · 回本账 ──────────────────────────────────────────── */
  function drawBack(x) {
    var cv = $('rbChart'); if (!cv) return;
    var g = fit(cv), ctx = g.ctx, w = g.w, h = g.h;
    clear(ctx, w, h);

    var padL = 48, padR = 16, padT = 26, padB = 28;
    var pw = w - padL - padR, ph = h - padT - padB;
    var xa = 0.05, xb = 0.80, ya = 0, yb = 4.0;   // 需要涨幅 0–400%
    var sx = function (v) { return padL + (v - xa) / (xb - xa) * pw; };
    var sy = function (v) { return padT + ph - (Math.min(v, yb) - ya) / (yb - ya) * ph; };

    // 网格
    ctx.strokeStyle = LINE; ctx.lineWidth = 1;
    for (var i = 0; i <= 4; i++) {
      var y = padT + ph * i / 4;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
      label(ctx, (400 - 100 * i) + '%', padL - 6, y, MUT, 10, 'right');
    }
    for (var jj = 0; jj <= 3; jj++) {
      var x = padL + pw * jj / 3;
      var lv = (xa + (xb - xa) * jj / 3) * 100;
      label(ctx, lv.toFixed(0) + '%', x, h - 12, MUT, 10, 'center');
    }

    // 曲线
    ctx.strokeStyle = RED; ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (var s = 0; s <= 150; s++) {
      var xv = xa + (xb - xa) * s / 150;
      var need = xv / (1 - xv);
      var px = sx(xv), py = sy(need);
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 当前位置
    var need0 = x / (1 - x);
    var mx = sx(x), my = sy(need0);
    ctx.strokeStyle = AMBER; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(mx, padT); ctx.lineTo(mx, padT + ph); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = AMBER;
    ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill();
    label(ctx, '亏 ' + (x * 100).toFixed(0) + '% → 要涨 +' + (need0 * 100).toFixed(1) + '%',
          Math.min(mx + 10, w - padR - 150), my - 14, AMBER, 11, 'left', '700');

    label(ctx, '需要涨幅 x/(1−x)', padL, padT - 12, RED, 11, 'left', '600');
    label(ctx, '当前亏损幅度 →', w - padR, h - 12, MUT, 10, 'right');
  }

  function renderBack() {
    var el = $('rb_x'); if (!el) return;
    var x = parseFloat(el.value) / 100;
    txt($('rb_xO'), (x * 100).toFixed(0) + '%');
    var need = x / (1 - x);
    var ln = -Math.log(1 - x);
    var days = ln / muD;
    txt($('rb_need'), '+' + (need * 100).toFixed(1) + '%');
    txt($('rb_ln'), ln.toFixed(4));
    txt($('rb_y'), (days / 252).toFixed(2) + ' 年');
    txt($('rb_ref'), '+' + (need * 100).toFixed(1) + '%');
    var vd, col;
    if (days / 252 < 2) { vd = '回本要 ' + (days / 252).toFixed(1) + ' 年——还能忍'; col = GREEN; }
    else if (days / 252 < 5) { vd = '回本要 ' + (days / 252).toFixed(1) + ' 年——这期间的机会成本才是真浪费'; col = AMBER; }
    else { vd = '回本要 ' + (days / 252).toFixed(1) + ' 年——「撑着」已经不是选择，是放弃其他所有选择'; col = RED; }
    txt($('rb_vd'), vd);
    tint($('rb_vd'), col);
    drawBack(x);
  }

  /* ── 工具 3 · 处置效应判定 ────────────────────────────────────── */
  function renderDisp() {
    var ep = $('de_pgr'), el = $('de_plr'); if (!ep || !el) return;
    var pgr = parseFloat(ep.value) / 100, plr = parseFloat(el.value) / 100;
    txt($('de_pgrO'), (pgr * 100).toFixed(1) + '%');
    txt($('de_plrO'), (plr * 100).toFixed(1) + '%');

    if (plr <= 0) {
      txt($('de_r'), '∞');
      txt($('de_cmp'), '没卖过亏损');
      txt($('de_mix'), '100%');
      txt($('de_vd'), '你从不实现亏损——这是处置效应的极端形态');
      tint($('de_vd'), RED);
      return;
    }
    var r = pgr / plr;
    txt($('de_r'), r.toFixed(2));
    var base = 1.51;
    var cmp, ccol;
    if (r > base * 1.3) { cmp = '高于样本均值 ' + ((r / base - 1) * 100).toFixed(0) + '%'; ccol = RED; }
    else if (r > base) { cmp = '略高于样本均值'; ccol = AMBER; }
    else if (r > base * 0.8) { cmp = '与样本均值持平'; ccol = AMBER; }
    else { cmp = '低于样本均值（更健康）'; ccol = GREEN; }
    txt($('de_cmp'), cmp); tint($('de_cmp'), ccol);
    txt($('de_mix'), (pgr / (pgr + plr) * 100).toFixed(1) + '%');

    var vd, col;
    if (r > 1.2) { vd = '典型处置效应——你在砍盈利、留亏损'; col = RED; }
    else if (r > 1.05) { vd = '轻微卖盈守亏，值得盯住'; col = AMBER; }
    else if (r > 0.95) { vd = '接近中性 ✔ 卖出行为与盈亏无关'; col = GREEN; }
    else { vd = '反向：你先砍亏损、留盈利'; col = GREEN; }
    txt($('de_vd'), vd);
    tint($('de_vd'), col);
  }

  /* ── 工具 4 · 37% 最优停止 ────────────────────────────────────── */
  function P(n, r) {
    var s = 0;
    for (var i = r; i <= n; i++) s += 1 / (i - 1);
    return (r - 1) / n * s;
  }
  function drawOpt(n, bestR, bestP) {
    var cv = $('osChart'); if (!cv) return;
    var g = fit(cv), ctx = g.ctx, w = g.w, h = g.h;
    clear(ctx, w, h);

    var padL = 46, padR = 16, padT = 26, padB = 28;
    var pw = w - padL - padR, ph = h - padT - padB;
    var sx = function (frac) { return padL + frac * pw; };
    var sy = function (p) { return padT + ph - (p - 0.15) / (0.42 - 0.15) * ph; };

    ctx.strokeStyle = LINE; ctx.lineWidth = 1;
    for (var i = 0; i <= 3; i++) {
      var y = padT + ph * i / 3;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
      label(ctx, (42 - 9 * i) + '%', padL - 6, y, MUT, 10, 'right');
    }
    for (var jj = 0; jj <= 4; jj++) {
      var x = padL + pw * jj / 4;
      label(ctx, (jj * 25) + '%', x, h - 12, MUT, 10, 'center');
    }

    // 曲线：观察期比例 → 成功率（抽样绘制，n 较大时按比例采样）
    var steps = 160;
    ctx.strokeStyle = BLUE; ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (var s = 1; s <= steps; s++) {
      var frac = s / steps * 0.95;
      var r = Math.max(2, Math.round(frac * n));
      if (r > n) r = n;
      var p = P(n, r) * 100;
      var px = sx(frac), py = sy(p / 100);
      if (s === 1) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 最优点
    var fx = sx((bestR - 1) / n), fy = sy(bestP / 100);
    ctx.strokeStyle = AMBER; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(fx, padT); ctx.lineTo(fx, padT + ph); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = AMBER;
    ctx.beginPath(); ctx.arc(fx, fy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = '600 11px system-ui,-apple-system,"PingFang SC",sans-serif';
    var tag = '最优：观察 ' + ((bestR - 1) / n * 100).toFixed(1) + '% → 成功率 ' + (bestP * 100).toFixed(2) + '%';
    var tw = ctx.measureText(tag).width;
    label(ctx, tag, Math.max(4, Math.min(fx + 10, 636 - tw)), fy - 15, AMBER, 11, 'left', '600');

    label(ctx, '成功率', padL - 6, padT - 12, BLUE, 11, 'left', '600');
    label(ctx, '观察期占比 →', w - padR, h - 12, MUT, 10, 'right');
  }

  function renderOpt() {
    var el = $('os_n'); if (!el) return;
    var n = parseInt(el.value, 10);
    txt($('os_nO'), n + ' 个');
    var bestP = 0, bestR = 0;
    for (var r = 2; r <= n; r++) { var p = P(n, r); if (p > bestP) { bestP = p; bestR = r; } }
    txt($('os_r'), '前 ' + (bestR - 1) + ' 个');
    txt($('os_ratio'), ((bestR - 1) / n * 100).toFixed(1) + '%');
    txt($('os_p'), (bestP * 100).toFixed(2) + '%');
    txt($('os_vd'), '前 ' + (bestR - 1) + ' 个只观察，第 ' + bestR + ' 个起第一个超越基准就收（成功率 ' + (bestP * 100).toFixed(2) + '%）');
    drawOpt(n, bestR, bestP);
  }

  /* ── 绑定 ─────────────────────────────────────────────────────── */
  function bind(id, fn) {
    var el = $(id);
    if (!el) return;
    el.addEventListener('input', fn);
    el.addEventListener('change', fn);
  }

  function init() {
    bind('sl_L', renderStop);
    bind('sl_rb', renderStop);
    bind('rb_x', renderBack);
    bind('de_pgr', renderDisp);
    bind('de_plr', renderDisp);
    bind('os_n', renderOpt);

    // 立即用真实计算值覆盖 HTML 里的硬编码初值
    try { renderStop(); } catch (e) { txt($('sl_vd'), '模型初始化失败：' + e.message); }
    try { renderBack(); } catch (e) { txt($('rb_vd'), '模型初始化失败：' + e.message); }
    try { renderDisp(); } catch (e) { txt($('de_vd'), '模型初始化失败：' + e.message); }
    try { renderOpt(); } catch (e) { txt($('os_vd'), '模型初始化失败：' + e.message); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
