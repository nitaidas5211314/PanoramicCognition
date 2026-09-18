/* ============================================================
   《赢家诅咒（Winner's Curse）》主题脚本
   四个可调模型：
     1. 胜者高估 bias
     2. 下调出价 shade
     3. 人数放大 nfx
     4. 并购傲慢 ma
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
  };

  /* E[max of n i.i.d. N(0,1)] for n=2..12 */
  var EMAX = [0.5642, 0.8463, 1.0294, 1.163, 1.2672, 1.3522, 1.4236, 1.485, 1.5388, 1.5864, 1.6292];
  function eMaxN(n) {
    n = Math.max(2, Math.min(12, Math.round(n)));
    return EMAX[n - 2];
  }

  function phi(x) { return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI); }
  function Phi(x) {
    var t = 1 / (1 + 0.2316419 * Math.abs(x));
    var d = 0.3989423 * Math.exp(-x * x / 2);
    var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - p : p;
  }

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
      ctx.fillText(v.toFixed(1), pl - 6, y + 3);
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
      ymin = Math.min.apply(null, vs.concat([0])) - 0.5;
      ymax = Math.max.apply(null, vs.concat([0])) + 0.5;
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
      var lab = (typeof it.v === 'number' ? it.v.toFixed(it.dp != null ? it.dp : 1) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }

  /* ---- 1 bias ---- */
  function updBias() {
    var n = +$('bias_n').value, s = +$('bias_s').value, V = +$('bias_v').value;
    txt($('bias_nO'), n); txt($('bias_sO'), s); txt($('bias_vO'), V);
    var z = eMaxN(n);
    var over = s * z;
    var pi = -over;
    var pct = (over / V) * 100;
    txt($('bias_z'), z.toFixed(3));
    txt($('bias_over'), over.toFixed(1));
    txt($('bias_pi'), pi.toFixed(1));
    txt($('bias_pct'), pct.toFixed(1) + '%');
    var vh = $('bias_vh');
    if (over > V * 0.25) {
      txt(vh, '判定：高估超过 V 的 25%——天真出价极危险，必须大幅下调。');
      tint(vh, C.red);
    } else if (over > V * 0.12) {
      txt(vh, '判定：中等诅咒强度——下调表应写进标书硬门槛。');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：相对温和——仍应用条件价值，勿按信号原价出价。');
      tint(vh, C.green);
    }
    var items = [
      { lab: '高估', v: over, c: C.red, dp: 1 },
      { lab: '天真利润', v: pi, c: C.amber, dp: 1 },
      { lab: '0基准', v: 0, c: C.blue, dp: 1 }
    ];
    items._axis = '相对真值 V';
    bars($('biasChart'), items, Math.min(pi, -1) - 2, Math.max(over, 1) + 2);
  }

  /* ---- 2 shade ---- */
  function updShade() {
    var X = +$('sh_x').value, n = +$('sh_n').value, s = +$('sh_s').value;
    txt($('sh_xO'), X); txt($('sh_nO'), n); txt($('sh_sO'), s);
    var d = s * eMaxN(n);
    var b = X - d;
    txt($('sh_d'), d.toFixed(1));
    txt($('sh_b'), b.toFixed(1));
    txt($('sh_naive'), String(X));
    txt($('sh_gap'), d.toFixed(1));
    var vh = $('sh_vh');
    if (b <= 0) {
      txt(vh, '判定：条件价值≤0——在此 n、σ 下不应参与（或先降噪/合信息）。');
      tint(vh, C.red);
    } else if (d / X > 0.25) {
      txt(vh, '判定：下调超过信号的 25%——竞争/噪声过强，优先改格式或共享信息。');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：建议出价上限 = 条件价值 ' + b.toFixed(1) + '（再视一价战略略压）。');
      tint(vh, C.green);
    }
    var items = [
      { lab: '信号X', v: X, c: C.blue, dp: 1 },
      { lab: '条件价值', v: b, c: C.green, dp: 1 },
      { lab: '下调', v: d, c: C.red, dp: 1 }
    ];
    items._axis = '出价尺度';
    bars($('shChart'), items, 0, Math.max(X, b, d) * 1.1);
  }

  /* ---- 3 nfx ---- */
  function updNfx() {
    var a = +$('nfx_a').value, b = +$('nfx_b').value, s = +$('nfx_s').value;
    txt($('nfx_aO'), a); txt($('nfx_bO'), b); txt($('nfx_sO'), s);
    var za = eMaxN(a), zb = eMaxN(b);
    var pa = -s * za, pb = -s * zb;
    var diff = pb - pa;
    txt($('nfx_pa'), pa.toFixed(1));
    txt($('nfx_pb'), pb.toFixed(1));
    txt($('nfx_diff'), diff.toFixed(1));
    txt($('nfx_z'), za.toFixed(3) + ' / ' + zb.toFixed(3));
    var vh = $('nfx_vh');
    if (diff < -5) {
      txt(vh, '判定：B 市场天真亏损明显更深——人数↑放大诅咒（实验室大市场同向）。');
      tint(vh, C.red);
    } else if (Math.abs(diff) < 2) {
      txt(vh, '判定：两档人数差异不大——仍应用条件化，勿因「差不多」跳过下调。');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：人数结构已改变期望亏损幅度，标书应按实际 n 重算。');
      tint(vh, C.green);
    }
    var items = [
      { lab: 'n=' + a, v: pa, c: C.amber, dp: 1 },
      { lab: 'n=' + b, v: pb, c: C.red, dp: 1 },
      { lab: '0基准', v: 0, c: C.blue, dp: 1 }
    ];
    items._axis = '天真期望利润';
    bars($('nfxChart'), items, Math.min(pa, pb, -1) - 2, 2);
  }

  /* ---- 4 ma ---- */
  function updMa() {
    var M = +$('ma_m').value, s = +$('ma_s').value, p = +$('ma_p').value;
    txt($('ma_mO'), M); txt($('ma_sO'), s); txt($('ma_pO'), p);
    var thr = M * (1 + p / 100);
    var a = (thr - M) / s;
    var surv = Math.max(1e-12, 1 - Phi(a));
    var prob = surv * 100;
    var err = s * phi(a) / surv;
    txt($('ma_prob'), prob.toFixed(1) + '%');
    txt($('ma_err'), '+' + err.toFixed(1));
    txt($('ma_thr'), thr.toFixed(0));
    txt($('ma_pct'), '+' + ((err / M) * 100).toFixed(1) + '%');
    var vh = $('ma_vh');
    if (err / M > 0.2) {
      txt(vh, '判定：条件于「愿意出溢价」，期望估值误差已很大——傲慢通道开通。');
      tint(vh, C.red);
    } else if (prob < 15) {
      txt(vh, '判定：出价稀少但一旦出价误差偏右——需红队挑战协同故事。');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：筛选仍在，但强度可控——对照不收购基准再拍板。');
      tint(vh, C.green);
    }
    var items = [
      { lab: '门槛', v: thr - M, c: C.blue, dp: 1 },
      { lab: '条件误差', v: err, c: C.red, dp: 1 },
      { lab: 'σ', v: s, c: C.amber, dp: 1 }
    ];
    items._axis = '相对市值的点数';
    bars($('maChart'), items, 0, Math.max(thr - M, err, s) * 1.15);
  }

  function all() { updBias(); updShade(); updNfx(); updMa(); }

  bind(['bias_n', 'bias_s', 'bias_v'], updBias);
  bind(['sh_x', 'sh_n', 'sh_s'], updShade);
  bind(['nfx_a', 'nfx_b', 'nfx_s'], updNfx);
  bind(['ma_m', 'ma_s', 'ma_p'], updMa);
  all();
})();
