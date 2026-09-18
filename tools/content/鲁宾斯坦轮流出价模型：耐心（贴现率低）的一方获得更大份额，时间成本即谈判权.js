/* ============================================================
   《鲁宾斯坦轮流出价模型》主题脚本
   四个可调模型：
     1. 轮流出价份额（δ1,δ2,π）
     2. 共同耐心与先手溢价
     3. 连续时间极限 ↔ 广义纳什
     4. 固定每期成本极端解
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
  };

  function fit(cv, cssH) {
    if (!cv) return null;
    var dpr = window.devicePixelRatio || 1;
    var w = Math.max(240, cv.clientWidth || (cv.parentNode && cv.parentNode.clientWidth) || 640);
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(cssH * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: cssH };
  }
  function clear(g) { if (g) g.ctx.clearRect(0, 0, g.w, g.h); }
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }
  function bind(ids, fn) {
    ids.forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input', fn);
      el.addEventListener('change', fn);
    });
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.classList && t.classList.contains('tab')) setTimeout(fn, 40);
    });
    window.addEventListener('resize', function () { setTimeout(fn, 40); });
  }
  function axisY(ctx, pl, y1, pt, bh, ymin, ymax, w) {
    ctx.strokeStyle = C.grid;
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    var span = ymax - ymin || 1;
    for (var i = 0; i <= 4; i++) {
      var v = ymin + (span * i) / 4;
      var y = y1 - ((v - ymin) / span) * bh;
      ctx.beginPath();
      ctx.moveTo(pl, y);
      ctx.lineTo(w - 16, y);
      ctx.stroke();
      ctx.fillText(v.toFixed(2), pl - 6, y + 3);
    }
  }
  function bars(cv, items, ymin, ymax) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    if (ymin == null || ymax == null) {
      var vs = items.map(function (x) { return x.v; });
      ymin = Math.min.apply(null, vs.concat([0])) - 0.02;
      ymax = Math.max.apply(null, vs.concat([0])) + 0.02;
      if (ymax <= ymin) { ymax = ymin + 1; }
    }
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    var barW = bw / (items.length * 1.45);
    var span = ymax - ymin || 1;
    items.forEach(function (it, i) {
      var x = pl + (i + 0.5) * (bw / items.length) - barW / 2;
      var y = y1 - ((it.v - ymin) / span) * bh;
      var zeroY = y1 - ((0 - ymin) / span) * bh;
      var top = Math.min(y, zeroY), bot = Math.max(y, zeroY);
      ctx.fillStyle = it.c;
      ctx.fillRect(x, top, barW, Math.max(2, bot - top));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(it.lab, x + barW / 2, y1 + 13);
      var lab = (typeof it.v === 'number' ? it.v.toFixed(it.dp != null ? it.dp : 2) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '份额 / 支付', pl + bw, y1 + 31);
  }

  function pct(x) { return (x * 100).toFixed(2) + '%'; }
  function fmt2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function fmt3(x) { return (Math.round(x * 1000) / 1000).toFixed(3); }

  function x1Star(d1, d2) {
    var den = 1 - d1 * d2;
    if (den <= 1e-12) return 0.5;
    return (1 - d2) / den;
  }

  /* —— 1. 轮流出价份额 —— */
  function updRb() {
    var d1 = parseFloat(($('rb_d1') || {}).value || 0.9);
    var d2 = parseFloat(($('rb_d2') || {}).value || 0.9);
    var pi = parseFloat(($('rb_pi') || {}).value || 1);
    txt($('rb_d1O'), d1.toFixed(2));
    txt($('rb_d2O'), d2.toFixed(2));
    txt($('rb_piO'), pi.toFixed(2));
    var x1 = x1Star(d1, d2);
    var x2 = 1 - x1;
    txt($('rb_x1'), pct(x1));
    txt($('rb_x2'), pct(x2));
    txt($('rb_m1'), fmt2(pi * x1));
    txt($('rb_m2'), fmt2(pi * x2));
    var vh = $('rb_vh');
    if (x1 > 0.55) {
      txt(vh, '判定：先手优势明显（或后手更不耐心）· 时间成本即谈判权');
      tint(vh, C.red);
    } else if (x1 < 0.45) {
      txt(vh, '判定：后手更耐心，先手权被耐心差反噬');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：接近均分 · 双方耐心接近或都很高');
      tint(vh, C.green);
    }
    var items = [
      { lab: '先手', v: pi * x1, c: C.red, dp: 2 },
      { lab: '后手', v: pi * x2, c: C.green, dp: 2 },
      { lab: '五五对照', v: pi * 0.5, c: C.blue, dp: 2 }
    ];
    items._axis = '货币支付（π×份额）';
    bars($('rbChart'), items, 0, pi * 1.05);
  }

  /* —— 2. 先手溢价曲线 —— */
  function updFm() {
    var d = parseFloat(($('fm_d') || {}).value || 0.9);
    txt($('fm_dO'), d.toFixed(2));
    var x1 = 1 / (1 + d);
    var x2 = 1 - x1;
    var prem = (x1 - 0.5) * 100;
    var r = 1 / d - 1;
    txt($('fm_x1'), pct(x1));
    txt($('fm_x2'), pct(x2));
    txt($('fm_prem'), (prem >= 0 ? '+' : '') + prem.toFixed(2) + 'pp');
    txt($('fm_r'), (r * 100).toFixed(2) + '%');
    var vh = $('fm_vh');
    if (d >= 0.95) {
      txt(vh, '判定：双方很耐心 · 先手溢价趋近 0 · 通向纳什对称解');
      tint(vh, C.green);
    } else if (d <= 0.5) {
      txt(vh, '判定：双方都很急 · 先手溢价很大 · 像「短视最后通牒」');
      tint(vh, C.red);
    } else {
      txt(vh, '判定：中等耐心 · 先手仍有几个百分点优势');
      tint(vh, C.blue);
    }
    var g = fit($('fmChart'), 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    var ymin = 0.45, ymax = 0.75;
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    ctx.strokeStyle = C.blue;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 0; i <= 100; i++) {
      var di = 0.05 + (0.94 * i) / 100;
      var xi = 1 / (1 + di);
      var xx = pl + (i / 100) * bw;
      var yy = y1 - ((xi - ymin) / (ymax - ymin)) * bh;
      if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    }
    ctx.stroke();
    ctx.strokeStyle = C.ink3;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    var y50 = y1 - ((0.5 - ymin) / (ymax - ymin)) * bh;
    ctx.moveTo(pl, y50);
    ctx.lineTo(pl + bw, y50);
    ctx.stroke();
    ctx.setLineDash([]);
    var cx = pl + ((d - 0.05) / 0.94) * bw;
    var cy = y1 - ((x1 - ymin) / (ymax - ymin)) * bh;
    ctx.fillStyle = C.red;
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('横轴 δ →   纵轴先手份额', pl + bw, y1 + 31);
    ctx.textAlign = 'left';
    ctx.fillText('50% 均分线', pl + 4, y50 - 6);
  }

  /* —— 3. 连续时间极限 —— */
  function updCt() {
    var r1 = parseFloat(($('ct_r1') || {}).value || 0.1);
    var r2 = parseFloat(($('ct_r2') || {}).value || 0.1);
    var dt = parseFloat(($('ct_dt') || {}).value || 0.1);
    txt($('ct_r1O'), r1.toFixed(2));
    txt($('ct_r2O'), r2.toFixed(2));
    txt($('ct_dtO'), dt.toFixed(2));
    var d1 = Math.exp(-r1 * dt);
    var d2 = Math.exp(-r2 * dt);
    var x = x1Star(d1, d2);
    var lim = r2 / (r1 + r2);
    txt($('ct_d1'), fmt3(d1));
    txt($('ct_d2'), fmt3(d2));
    txt($('ct_x'), pct(x));
    txt($('ct_lim'), pct(lim));
    var gap = Math.abs(x - lim) * 100;
    var vh = $('ct_vh');
    if (gap < 0.5) {
      txt(vh, '判定：离散 SPE 已贴紧极限 · 可视作广义纳什权重');
      tint(vh, C.green);
    } else if (dt >= 0.5) {
      txt(vh, '判定：间隔偏大 · 离散先手效应仍明显（差 ' + gap.toFixed(2) + 'pp）');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：逼近中 · |SPE−极限|=' + gap.toFixed(2) + 'pp');
      tint(vh, C.blue);
    }
    var items = [
      { lab: '离散SPE', v: x, c: C.red, dp: 3 },
      { lab: '极限NBS', v: lim, c: C.blue, dp: 3 },
      { lab: '均分', v: 0.5, c: C.green, dp: 3 }
    ];
    items._axis = '先手份额';
    bars($('ctChart'), items, 0, 1);
  }

  /* —— 4. 固定成本 —— */
  function updFc() {
    var c1 = parseFloat(($('fc_c1') || {}).value || 0.1);
    var c2 = parseFloat(($('fc_c2') || {}).value || 0.2);
    txt($('fc_c1O'), c1.toFixed(2));
    txt($('fc_c2O'), c2.toFixed(2));
    var x, y, note, col;
    if (c1 < c2 - 1e-9) {
      x = 1; y = 0;
      note = 'c₁<c₂ → 先手通吃';
      col = C.red;
    } else if (c1 > c2 + 1e-9) {
      x = c2; y = 1 - c2;
      note = 'c₁>c₂ → 先手只拿 c₂';
      col = C.amber;
    } else {
      x = Math.max(c1, 0.5);
      y = 1 - x;
      note = 'c₁=c₂ → 多重均衡（示意取中高）';
      col = C.blue;
    }
    txt($('fc_x'), pct(x));
    txt($('fc_y'), pct(y));
    txt($('fc_note'), note);
    // 对照：把 c 粗映射为「每期损失率」近似 δ≈1-c（仅示意）
    var d1a = Math.max(0.05, Math.min(0.99, 1 - c1));
    var d2a = Math.max(0.05, Math.min(0.99, 1 - c2));
    var xd = x1Star(d1a, d2a);
    txt($('fc_vs'), '若 δ≈1−c → 贴现模型先手 ' + pct(xd));
    var vh = $('fc_vh');
    txt(vh, '判定：' + note + ' · 固定成本模型比贴现模型更极端');
    tint(vh, col);
    var items = [
      { lab: '固定成本·先手', v: x, c: C.red, dp: 2 },
      { lab: '固定成本·后手', v: y, c: C.green, dp: 2 },
      { lab: '贴现近似·先手', v: xd, c: C.blue, dp: 2 }
    ];
    items._axis = '份额';
    bars($('fcChart'), items, 0, 1.05);
  }

  function boot() {
    bind(['rb_d1', 'rb_d2', 'rb_pi'], updRb);
    bind(['fm_d'], updFm);
    bind(['ct_r1', 'ct_r2', 'ct_dt'], updCt);
    bind(['fc_c1', 'fc_c2'], updFc);
    updRb();
    updFm();
    updCt();
    updFc();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
