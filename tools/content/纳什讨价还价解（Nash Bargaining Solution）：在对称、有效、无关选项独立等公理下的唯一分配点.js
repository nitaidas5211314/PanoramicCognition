/* ============================================================
   《纳什讨价还价解（Nash Bargaining Solution）》主题脚本
   四个可调模型：
     1. 剩余分割（经典对称 NBS）
     2. 广义纳什（权重 τ）
     3. Nash vs Kalai–Smorodinsky
     4. Rubinstein 耐心 → 纳什极限
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
    ctx.fillText(items._axis || '效用 / 份额', pl + bw, y1 + 31);
  }

  function fmt2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function fmt3(x) { return (Math.round(x * 1000) / 1000).toFixed(3); }

  /* ---- 1. Surplus split ---- */
  function updSp() {
    var pi = +$('sp_pi').value, d1 = +$('sp_d1').value, d2 = +$('sp_d2').value;
    txt($('sp_piO'), pi.toFixed(1));
    txt($('sp_d1O'), d1.toFixed(1));
    txt($('sp_d2O'), d2.toFixed(1));
    var s = pi - d1 - d2;
    var ok = s >= -1e-9;
    if (!ok) s = 0;
    var u1 = d1 + s / 2, u2 = d2 + s / 2;
    var prod = (u1 - d1) * (u2 - d2);
    txt($('sp_s'), fmt2(s));
    txt($('sp_u'), fmt2(u1) + ' / ' + fmt2(u2));
    txt($('sp_prod'), fmt2(prod));
    txt($('sp_half'), fmt2(pi / 2) + ' / ' + fmt2(pi / 2));
    var vh = $('sp_vh');
    if (!ok) {
      txt(vh, '剩余为负：个人理性集为空，无协议');
      tint(vh, C.red);
    } else {
      var gap = Math.abs(u1 - pi / 2);
      txt(vh, '判定：均分剩余（非总蛋糕）· 相对五五总价偏差 ' + fmt2(gap));
      tint(vh, gap > 0.05 ? C.amber : C.green);
    }
    bars($('spChart'), [
      { lab: '方1 NBS', v: u1, c: C.blue, dp: 2 },
      { lab: '方2 NBS', v: u2, c: C.amber, dp: 2 },
      { lab: '方1 五五总', v: pi / 2, c: '#93c5fd', dp: 2 },
      { lab: '方2 五五总', v: pi / 2, c: '#fcd34d', dp: 2 }
    ], 0, Math.max(pi, u1, u2) * 1.05);
  }

  /* ---- 2. Generalized Nash ---- */
  function updGn() {
    var pi = +$('gn_pi').value, d1 = +$('gn_d1').value, d2 = +$('gn_d2').value, t = +$('gn_t').value;
    txt($('gn_piO'), pi.toFixed(1));
    txt($('gn_d1O'), d1.toFixed(1));
    txt($('gn_d2O'), d2.toFixed(1));
    txt($('gn_tO'), t.toFixed(2));
    var s = pi - d1 - d2;
    var ok = s >= -1e-9;
    if (!ok) s = 0;
    var u1 = d1 + t * s, u2 = d2 + (1 - t) * s;
    var e1 = Math.max(u1 - d1, 0), e2 = Math.max(u2 - d2, 0);
    var wprod = (e1 > 0 && e2 > 0) ? Math.pow(e1, t) * Math.pow(e2, 1 - t) : 0;
    var s1 = d1 + 0.5 * s, s2 = d2 + 0.5 * s;
    txt($('gn_u'), fmt2(u1) + ' / ' + fmt2(u2));
    txt($('gn_share'), Math.round(t * 100) + '%');
    txt($('gn_sym'), fmt2(s1) + ' / ' + fmt2(s2));
    txt($('gn_prod'), fmt3(wprod));
    var vh = $('gn_vh');
    if (!ok) {
      txt(vh, '剩余为负：无协议');
      tint(vh, C.red);
    } else {
      txt(vh, '判定：τ=' + t.toFixed(2) + ' → 方1多拿剩余的 ' + Math.round(t * 100) + '%');
      tint(vh, Math.abs(t - 0.5) > 0.15 ? C.amber : C.green);
    }
    bars($('gnChart'), [
      { lab: '方1 τ-Nash', v: u1, c: C.blue, dp: 2 },
      { lab: '方2 τ-Nash', v: u2, c: C.amber, dp: 2 },
      { lab: '方1 对称', v: s1, c: '#93c5fd', dp: 2 },
      { lab: '方2 对称', v: s2, c: '#fcd34d', dp: 2 }
    ], 0, Math.max(pi, u1, u2) * 1.05);
  }

  /* ---- 3. Nash vs KS ---- */
  function nashOnPower(k) {
    // max u * (1-u^k), u in [0,1]
    var best = -1, bu = 0, bv = 0;
    for (var i = 0; i <= 10000; i++) {
      var u = i / 10000;
      var v = 1 - Math.pow(u, k);
      if (v < 0) continue;
      var p = u * v;
      if (p > best) { best = p; bu = u; bv = v; }
    }
    return { u: bu, v: bv, p: best };
  }
  function ksOnPower(k) {
    // utopia (1,1), line v=u; intersect u = 1 - u^k
    // solve u^k + u - 1 = 0
    var lo = 0, hi = 1;
    for (var it = 0; it < 60; it++) {
      var mid = (lo + hi) / 2;
      if (Math.pow(mid, k) + mid - 1 > 0) hi = mid; else lo = mid;
    }
    var u = (lo + hi) / 2;
    return { u: u, v: u };
  }
  function updKs() {
    var k = +$('ks_k').value;
    txt($('ks_kO'), k.toFixed(1));
    var n = nashOnPower(k);
    var ks = ksOnPower(k);
    txt($('ks_n'), fmt3(n.u) + ' / ' + fmt3(n.v));
    txt($('ks_ks'), fmt3(ks.u) + ' / ' + fmt3(ks.v));
    txt($('ks_np'), fmt3(n.p));
    txt($('ks_du'), fmt3(Math.abs(n.u - ks.u)));
    var vh = $('ks_vh');
    var du = Math.abs(n.u - ks.u);
    txt(vh, du < 0.01 ? '判定：两解几乎重合' : '判定：IIA 路径(Nash)与乌托邦比例(KS)分叉 Δu₁=' + fmt3(du));
    tint(vh, du < 0.01 ? C.green : C.amber);

    // chart: curve + two points as bars for u1 comparison + products sense
    var g = fit($('ksChart'), 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 44, pr = 16, pt = 20, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    // draw frontier
    ctx.strokeStyle = C.grid;
    ctx.beginPath();
    for (var gi = 0; gi <= 4; gi++) {
      var yy = pt + (bh * gi) / 4;
      ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy);
    }
    ctx.stroke();
    ctx.strokeStyle = C.blue;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 0; i <= 200; i++) {
      var u = i / 200;
      var v = 1 - Math.pow(u, k);
      var x = pl + u * bw;
      var y = y1 - v * bh;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // utopia diagonal
    ctx.strokeStyle = C.amber;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(pl, y1);
    ctx.lineTo(pl + bw, pt);
    ctx.stroke();
    ctx.setLineDash([]);
    // points
    function dot(u, v, col, lab) {
      var x = pl + u * bw, y = y1 - v * bh;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      var labx = Math.min(x + 8, pl + bw - 40);
      ctx.fillText(lab, labx, y - 8);
    }
    dot(n.u, n.v, C.blue, 'Nash');
    dot(ks.u, ks.v, C.amber, 'KS');
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('u₁ →', pl + bw / 2, y1 + 13);
    ctx.textAlign = 'right';
    ctx.fillText('前沿 u₂=1−u₁^k · 虚线=乌托邦对角', pl + bw, y1 + 31);
  }

  /* ---- 4. Rubinstein ---- */
  function updRb() {
    var d1 = +$('rb_d1').value, d2 = +$('rb_d2').value;
    txt($('rb_d1O'), d1.toFixed(2));
    txt($('rb_d2O'), d2.toFixed(2));
    var den = 1 - d1 * d2;
    var x = den > 1e-12 ? (1 - d2) / den : 0.5;
    var y = 1 - x;
    txt($('rb_x'), fmt3(x));
    txt($('rb_y'), fmt3(y));
    txt($('rb_nbs'), '0.500');
    txt($('rb_gap'), fmt3(Math.abs(x - 0.5)));
    var vh = $('rb_vh');
    var gap = Math.abs(x - 0.5);
    txt(vh, gap < 0.02 ? '判定：接近对称 NBS（短回合/高耐心极限）' : '判定：耐心差或有限 δ 造成先手偏离 0.5');
    tint(vh, gap < 0.02 ? C.green : C.amber);
    bars($('rbChart'), [
      { lab: '方1 SPE', v: x, c: C.blue, dp: 3 },
      { lab: '方2 SPE', v: y, c: C.amber, dp: 3 },
      { lab: '对称 NBS', v: 0.5, c: C.green, dp: 3 }
    ], 0, 1);
  }

  function all() { updSp(); updGn(); updKs(); updRb(); }
  bind(['sp_pi', 'sp_d1', 'sp_d2'], updSp);
  bind(['gn_pi', 'gn_d1', 'gn_d2', 'gn_t'], updGn);
  bind(['ks_k'], updKs);
  bind(['rb_d1', 'rb_d2'], updRb);
  all();
})();
