/* ============================================================
   《拍卖理论与收益等价定理》主题脚本
   四个可调模型：
     1. 收益等价计算器（均匀 IPV）
     2. 一价压价 vs 期望支付
     3. Myerson 保留价
     4. 风险厌恶破等价（示意）
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
      var lab = (typeof it.v === 'number' ? it.v.toFixed(it.dp != null ? it.dp : 3) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }

  /* ---- helpers: uniform [0,1] IPV ---- */
  function R0(n) { return (n - 1) / (n + 1); }
  function shade(n) { return (n - 1) / n; }
  function Qwin(v, n) { return Math.pow(v, n - 1); }
  function mPay(v, n) { return shade(n) * Math.pow(v, n); }
  function Uex(v, n) { return Qwin(v, n) * v - mPay(v, n); }
  function phi(v) { return 2 * v - 1; }

  /** Myerson revenue with reserve r, uniform[0,1], n bidders */
  function revReserve(n, r) {
    if (r <= 0) return R0(n);
    if (r >= 1) return 0;
    var steps = 8000, dv = (1 - r) / steps, s = 0, i, v, F;
    for (i = 0; i < steps; i++) {
      v = r + (i + 0.5) * dv;
      F = v;
      s += phi(v) * Math.pow(F, n - 1) * dv;
    }
    return n * s;
  }

  /* ---------- 1. RET calculator ---------- */
  function updRe() {
    var n = +($('re_n') && $('re_n').value) || 5;
    txt($('re_nO'), String(n));
    var R = R0(n);
    var sh = shade(n);
    txt($('re_R'), R.toFixed(4));
    txt($('re_shade'), sh.toFixed(4) + '  (b=(n-1)/n · v)');
    txt($('re_spa'), R.toFixed(4) + '  (=E[次高])');
    txt($('re_vh'), '判定：英/荷/一/二价期望收益锁定同一 R · RET 成立');
    tint($('re_vh'), C.green);
    var items = [
      { lab: '英式', v: R, c: C.blue, dp: 4 },
      { lab: '荷式', v: R, c: C.amber, dp: 4 },
      { lab: '一价', v: R, c: C.red, dp: 4 },
      { lab: '二价', v: R, c: C.green, dp: 4 }
    ];
    items._axis = '期望卖方收益 R';
    bars($('reChart'), items, 0, Math.max(0.95, R + 0.08));
  }

  /* ---------- 2. Shade ---------- */
  function updSh() {
    var v = +($('sh_v') && $('sh_v').value);
    var n = +($('sh_n') && $('sh_n').value) || 3;
    txt($('sh_vO'), v.toFixed(2));
    txt($('sh_nO'), String(n));
    var b = shade(n) * v;
    var Q = Qwin(v, n);
    var m = mPay(v, n);
    var U = Uex(v, n);
    txt($('sh_b'), b.toFixed(4));
    txt($('sh_Q'), Q.toFixed(4));
    txt($('sh_m'), m.toFixed(4));
    txt($('sh_U'), U.toFixed(4));
    var vh = $('sh_vh');
    txt(vh, '判定：一价报 b、二价报 v · 期望支付 m 相同（RET）· 剩余 U=∫Q');
    tint(vh, C.green);
    var items = [
      { lab: '估值 v', v: v, c: C.ink2, dp: 3 },
      { lab: '一价 b', v: b, c: C.red, dp: 3 },
      { lab: '期望支付 m', v: m, c: C.blue, dp: 3 },
      { lab: '剩余 U', v: U, c: C.green, dp: 3 }
    ];
    items._axis = '水平';
    bars($('shChart'), items, 0, Math.max(1.02, v + 0.05));
  }

  /* ---------- 3. Reserve ---------- */
  function updRs() {
    var n = +($('rs_n') && $('rs_n').value) || 2;
    var r = +($('rs_r') && $('rs_r').value);
    txt($('rs_nO'), String(n));
    txt($('rs_rO'), r.toFixed(2));
    var Rbase = R0(n);
    var Rr = revReserve(n, r);
    var lift = Rr - Rbase;
    var ph = phi(r);
    txt($('rs_R0'), Rbase.toFixed(4));
    txt($('rs_Rr'), Rr.toFixed(4));
    txt($('rs_lift'), (lift >= 0 ? '+' : '') + lift.toFixed(4) + '  (' + ((lift / (Rbase || 1)) * 100).toFixed(1) + '%)');
    txt($('rs_phi'), ph.toFixed(3));
    var vh = $('rs_vh');
    if (Math.abs(r - 0.5) < 0.02 && n === 2) {
      txt(vh, '判定：r≈0.5 · n=2 · 接近最优 · 理论 R=5/12≈0.4167');
      tint(vh, C.green);
    } else if (Math.abs(ph) < 0.05) {
      txt(vh, '判定：φ(r)≈0 · 接近该分布下的最优保留价');
      tint(vh, C.green);
    } else if (ph < 0) {
      txt(vh, '判定：φ(r)<0 · 保留价偏低，仍在「负虚拟价值」区成交');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：φ(r)>0 · 保留价偏高，可能过度排除交易');
      tint(vh, C.amber);
    }
    var items = [
      { lab: '无保留 R₀', v: Rbase, c: C.ink2, dp: 4 },
      { lab: 'R(r)', v: Rr, c: C.blue, dp: 4 },
      { lab: '最优参考', v: revReserve(n, 0.5), c: C.green, dp: 4 }
    ];
    items._axis = '期望收益';
    bars($('rsChart'), items, 0, Math.max(0.9, Math.max(Rbase, Rr) + 0.08));
  }

  /* ---------- 4. Break RET (schematic risk aversion) ---------- */
  function updBr() {
    var n = +($('br_n') && $('br_n').value) || 3;
    var rho = +($('br_rho') && $('br_rho').value);
    txt($('br_nO'), String(n));
    txt($('br_rhoO'), rho.toFixed(2));
    var Rbase = R0(n);
    // κ calibrated so rho=1 → about +18% for typical n (teaching schematic)
    var kappa = 0.18;
    var Rf = Rbase * (1 + rho * kappa);
    var Rs = Rbase; // SPA strategy unchanged under risk aversion
    var gap = Rf - Rs;
    txt($('br_R0'), Rbase.toFixed(4));
    txt($('br_Rf'), Rf.toFixed(4));
    txt($('br_Rs'), Rs.toFixed(4));
    txt($('br_gap'), '+' + gap.toFixed(4) + '  (+' + ((gap / (Rbase || 1)) * 100).toFixed(1) + '%)');
    var vh = $('br_vh');
    if (rho < 0.05) {
      txt(vh, '判定：ρ≈0 · 回到 RET · 一价≈二价');
      tint(vh, C.green);
    } else {
      txt(vh, '判定：厌恶↑ → 一价更激进 → 一价示意收入 > 二价（【假设】示意）');
      tint(vh, C.amber);
    }
    var items = [
      { lab: 'RET 基准', v: Rbase, c: C.ink2, dp: 4 },
      { lab: '一价示意', v: Rf, c: C.red, dp: 4 },
      { lab: '二价示意', v: Rs, c: C.green, dp: 4 }
    ];
    items._axis = '期望收益';
    bars($('brChart'), items, 0, Math.max(0.95, Rf + 0.08));
  }

  function updAll() { updRe(); updSh(); updRs(); updBr(); }

  bind(['re_n'], updRe);
  bind(['sh_v', 'sh_n'], updSh);
  bind(['rs_n', 'rs_r'], updRs);
  bind(['br_n', 'br_rho'], updBr);
  updAll();
})();
