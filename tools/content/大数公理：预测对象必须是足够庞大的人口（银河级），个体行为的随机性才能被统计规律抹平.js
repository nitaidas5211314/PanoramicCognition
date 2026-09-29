/* ============================================================
   《大数公理》主题脚本
   四个可调模型：
     1. ε–δ 样本量（切比雪夫 vs 正态）
     2. 频率 SE / 切比雪夫上界随 n
     3. 保险：人均 CoV vs 聚合 SD
     4. 个体最优正确率 vs 银河级频率 SE
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

  function erf(x) {
    var sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    var t = 1 / (1 + p * x);
    var y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }
  function phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  function normInv(p) {
    if (p <= 0 || p >= 1) return NaN;
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577459627691e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    var b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    var c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    var d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    var plow = 0.02425, phigh = 1 - plow, q, r;
    if (p < plow) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    if (p <= phigh) {
      q = p - 0.5; r = q * q;
      return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    }
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }

  function fmt1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function fmt2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function fmt3(x) { return (Math.round(x * 1000) / 1000).toFixed(3); }
  function fmt4(x) { return (Math.round(x * 10000) / 10000).toFixed(4); }
  function fmt0(x) { return String(Math.round(x)); }
  function fmtSci(x) {
    if (x >= 0.01) return fmt4(x);
    return x.toExponential(2);
  }

  /* ---------- Model 1 ---------- */
  function m1() {
    var p = parseFloat($('ll_p').value);
    var eps = parseFloat($('ll_eps').value);
    var delta = parseFloat($('ll_delta').value);
    var v = p * (1 - p);
    var nCheb = Math.ceil(v / (eps * eps * delta));
    var z = normInv(1 - delta / 2);
    var nNorm = Math.ceil(Math.pow(z * Math.sqrt(v) / eps, 2));
    var ratio = nCheb / Math.max(1, nNorm);
    txt($('ll_p_o'), fmt2(p));
    txt($('ll_eps_o'), fmt2(eps));
    txt($('ll_delta_o'), fmt2(delta));
    txt($('ll_ncheb'), fmt0(nCheb));
    txt($('ll_nnorm'), fmt0(nNorm));
    txt($('ll_ratio'), fmt1(ratio) + '×');
    txt($('ll_var'), fmt3(v));
    var msg = '切比雪夫保证分布无关；正态更省样但依赖近似。省样约 ' + fmt1(ratio) + '×。';
    txt($('ll_vh'), msg);
    tint($('ll_vh'), ratio > 4 ? C.amber : C.green);
  }

  /* ---------- Model 2 ---------- */
  function m2() {
    var p = parseFloat($('ll2_p').value);
    var n = parseFloat($('ll2_n').value);
    var eps = parseFloat($('ll2_eps').value);
    var v = p * (1 - p);
    var se = Math.sqrt(v / n);
    var cheb = Math.min(1, v / (n * eps * eps));
    var z = eps / se;
    var ptail = 2 * (1 - phi(z));
    txt($('ll2_p_o'), fmt2(p));
    txt($('ll2_n_o'), fmt0(n));
    txt($('ll2_eps_o'), fmt2(eps));
    txt($('ll2_se'), fmt4(se));
    txt($('ll2_cheb'), fmt3(cheb));
    txt($('ll2_z'), fmt2(z));
    txt($('ll2_ptail'), (ptail * 100).toFixed(2) + '%');
    var ok = cheb <= 0.05;
    txt($('ll2_vh'), ok
      ? '切比雪夫上界 ≤5%：以该界衡量已较稳'
      : '切比雪夫上界仍偏松/偏高：可加大 n 或放宽 ε');
    tint($('ll2_vh'), ok ? C.green : C.amber);

    var cv = $('ll2Chart');
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    var nMax = 20000;
    var ymax = Math.sqrt(v / 50) * 1.15;
    function sx(nn) { return pl + (nn / nMax) * bw; }
    function sy(val) { return y1 - (val / ymax) * bh; }
    ctx.strokeStyle = C.grid;
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    for (var i = 0; i <= 4; i++) {
      var vv = (ymax * i) / 4;
      var y = sy(vv);
      ctx.beginPath();
      ctx.moveTo(pl, y);
      ctx.lineTo(w - 16, y);
      ctx.stroke();
      ctx.fillText(vv.toFixed(3), pl - 6, y + 3);
    }
    ctx.strokeStyle = C.blue;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var nn = 50; nn <= nMax; nn += 50) {
      var yv = Math.sqrt(v / nn);
      var x = sx(nn);
      var y = sy(yv);
      if (nn === 50) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = C.amber;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(pl, sy(eps));
    ctx.lineTo(w - 16, sy(eps));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = C.red;
    ctx.beginPath();
    ctx.arc(sx(n), sy(se), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (var tick = 0; tick <= 4; tick++) {
      var tn = (nMax * tick) / 4;
      ctx.fillText(fmt0(tn), sx(tn), y1 + 13);
    }
    ctx.textAlign = 'right';
    ctx.fillText('SE vs n（虚线=ε）', pl + bw, y1 + 31);
  }

  /* ---------- Model 3 ---------- */
  function m3() {
    var mu = parseFloat($('ll3_mu').value);
    var sig = parseFloat($('ll3_sig').value);
    var n = parseFloat($('ll3_n').value);
    var sdAvg = sig / Math.sqrt(n);
    var cov = sdAvg / mu;
    var sdAgg = sig * Math.sqrt(n);
    var eAgg = mu * n;
    txt($('ll3_mu_o'), fmt0(mu));
    txt($('ll3_sig_o'), fmt0(sig));
    txt($('ll3_n_o'), fmt0(n));
    txt($('ll3_cov'), fmt3(cov));
    txt($('ll3_sdavg'), fmt1(sdAvg));
    txt($('ll3_sdagg'), fmt0(sdAgg));
    txt($('ll3_eagg'), fmt0(eAgg));
    txt($('ll3_vh'), '人均更稳（CoV↓），但聚合 SD 随 √n 上升——资本要盖的是后者');
    tint($('ll3_vh'), cov < 0.1 ? C.green : C.amber);

    var cv = $('ll3Chart');
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    var items = [
      { lab: '人均CoV', v: cov, c: C.blue, dp: 3 },
      { lab: 'σ/μ', v: sig / mu, c: C.amber, dp: 2 },
      { lab: '聚合SD/E', v: sdAgg / eAgg, c: C.red, dp: 3 }
    ];
    var ymin = 0;
    var ymax = Math.max(items[0].v, items[1].v, items[2].v) * 1.25 || 1;
    ctx.strokeStyle = C.grid;
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    for (var i = 0; i <= 4; i++) {
      var vv = ymin + ((ymax - ymin) * i) / 4;
      var y = y1 - ((vv - ymin) / (ymax - ymin)) * bh;
      ctx.beginPath();
      ctx.moveTo(pl, y);
      ctx.lineTo(w - 16, y);
      ctx.stroke();
      ctx.fillText(vv.toFixed(2), pl - 6, y + 3);
    }
    var barW = bw / (items.length * 1.45);
    items.forEach(function (it, i) {
      var x = pl + (i + 0.5) * (bw / items.length) - barW / 2;
      var y = y1 - ((it.v - ymin) / (ymax - ymin)) * bh;
      ctx.fillStyle = it.c;
      ctx.fillRect(x, y, barW, Math.max(2, y1 - y));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(it.lab, x + barW / 2, y1 + 13);
      var lab = it.v.toFixed(it.dp);
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, y - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.textAlign = 'right';
    ctx.fillText('相对波动（无量纲）', pl + bw, y1 + 31);
  }

  /* ---------- Model 4 ---------- */
  function m4() {
    var p = parseFloat($('ll4_p').value);
    var logn = parseFloat($('ll4_logn').value);
    var n = Math.pow(10, logn);
    var ind = Math.max(p, 1 - p);
    var se = Math.sqrt(p * (1 - p) / n);
    var invSqrt = 1 / Math.sqrt(n);
    txt($('ll4_p_o'), fmt2(p));
    txt($('ll4_logn_o'), fmt1(logn));
    txt($('ll4_ind'), (ind * 100).toFixed(1) + '%');
    txt($('ll4_n'), n >= 1e6 ? n.toExponential(0) : fmt0(n));
    txt($('ll4_se'), fmtSci(se));
    txt($('ll4_rse'), fmt4(invSqrt));
    var galaxy = logn >= 10;
    txt($('ll4_vh'), galaxy
      ? '银河量级：频率几乎钉死，但个体正确率仍是 ' + (ind * 100).toFixed(1) + '%'
      : '个体正确率不随 n 变；只有频率 SE 下降');
    tint($('ll4_vh'), galaxy ? C.blue : C.ink2);
  }

  function all() { m1(); m2(); m3(); m4(); }

  bind(['ll_p', 'll_eps', 'll_delta'], function () { m1(); });
  bind(['ll2_p', 'll2_n', 'll2_eps'], function () { m2(); });
  bind(['ll3_mu', 'll3_sig', 'll3_n'], function () { m3(); });
  bind(['ll4_p', 'll4_logn'], function () { m4(); });
  all();
})();
