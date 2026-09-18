/* ============================================================
   《层级推理 k-level thinking》主题脚本
   四个可调模型：
     1. level-k 猜数塔
     2. 群体混合谁更近开奖带
     3. 认知层级 Poisson τ
     4. 「+1 层」优势扫描
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    purple: '#7c3aed', grid: '#eef1f5', axis: '#e2e6ec',
    ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
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
  }
  function r2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function r1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function pct1(x) { return (Math.round(x * 1000) / 10).toFixed(1) + '%'; }
  function levelK(p, l0, k) { return l0 * Math.pow(p, k); }
  function fact(n) {
    var r = 1, i;
    for (i = 2; i <= n; i++) r *= i;
    return r;
  }
  function poisson(tau, k) {
    return Math.exp(-tau) * Math.pow(tau, k) / fact(k);
  }

  /* ── 1. level-k 塔 ── */
  (function lk() {
    var pEl = $('lk_p'), l0El = $('lk_l0'), kEl = $('lk_k');
    if (!pEl || !l0El || !kEl) return;
    var cv = $('lkChart');

    function upd() {
      var p = parseFloat(pEl.value), l0 = parseFloat(l0El.value), k = parseInt(kEl.value, 10);
      var you = levelK(p, l0, k);
      var l1 = levelK(p, l0, 1), l2 = levelK(p, l0, 2);
      var nash = (p < 1) ? 0 : l0;

      txt($('lk_pO'), r2(p));
      txt($('lk_l0O'), String(Math.round(l0)));
      txt($('lk_kO'), String(k));
      txt($('lk_you'), r2(you));
      txt($('lk_l1'), r2(l1));
      txt($('lk_l2'), r2(l2));
      txt($('lk_nash'), r2(nash));

      var msg = 'p=' + r2(p) + '，L' + k + '=' + r2(you) +
        '（L1=' + r2(l1) + '，L2=' + r2(l2) + '）；无限层 → ' + r2(nash) +
        (k >= 5 ? '。过深可能远离第一轮开奖带。' : '。第一轮开奖带常在 L1–L3。');
      var col = (k === 0) ? C.amber : (k <= 2 ? C.green : (k <= 4 ? C.blue : C.red));
      txt($('lk_vh'), msg);
      tint($('lk_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxK = 8, maxY = l0 * 1.05;
      function sx(kk) { return pl + (kk / maxK) * bw; }
      function sy(v) { return y1 - (v / maxY) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var i = 0; i <= 4; i++) {
        var vv = maxY * (1 - i / 4);
        var yy = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
        ctx.fillText(String(Math.round(vv)), pl - 6, yy + 4);
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var kk = 0; kk <= maxK; kk++) {
        var v = levelK(p, l0, kk);
        if (kk === 0) ctx.moveTo(sx(kk), sy(v));
        else ctx.lineTo(sx(kk), sy(v));
      }
      ctx.stroke();

      ctx.fillStyle = C.green;
      ctx.beginPath();
      ctx.arc(sx(k), sy(you), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = C.red;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(nash));
      ctx.lineTo(pl + bw, sy(nash));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'center';
      ctx.font = '11px sans-serif';
      for (var t = 0; t <= maxK; t += 2) {
        ctx.fillText('L' + t, sx(t), y1 + 13);
      }
      ctx.fillStyle = C.ink3;
      ctx.fillText('推理层数 k', pl + bw / 2, y1 + 31);
    }
    bind(['lk_p', 'lk_l0', 'lk_k'], upd);
    upd();
  })();

  /* ── 2. 群体混合 ── */
  (function mix() {
    if (!$('mix_w0')) return;
    var cv = $('mixChart');

    function upd() {
      var raw = [
        parseFloat($('mix_w0').value),
        parseFloat($('mix_w1').value),
        parseFloat($('mix_w2').value),
        parseFloat($('mix_w3').value)
      ];
      var sum = raw[0] + raw[1] + raw[2] + raw[3];
      if (sum <= 0) sum = 1;
      var w = raw.map(function (x) { return x / sum; });
      var p = parseFloat($('mix_p').value);
      var k = parseInt($('mix_k').value, 10);
      var L0 = 50;
      var choices = [0, 1, 2, 3].map(function (i) { return levelK(p, L0, i); });
      var mean = w[0] * choices[0] + w[1] * choices[1] + w[2] * choices[2] + w[3] * choices[3];
      var tgt = p * mean;
      var you = levelK(p, L0, k);
      var err = Math.abs(you - tgt);

      var bestK = 0, bestE = 1e9, bi;
      for (bi = 0; bi <= 5; bi++) {
        var e = Math.abs(levelK(p, L0, bi) - tgt);
        if (e < bestE) { bestE = e; bestK = bi; }
      }

      txt($('mix_w0O'), String(Math.round(raw[0])));
      txt($('mix_w1O'), String(Math.round(raw[1])));
      txt($('mix_w2O'), String(Math.round(raw[2])));
      txt($('mix_w3O'), String(Math.round(raw[3])));
      txt($('mix_kO'), String(k));
      txt($('mix_pO'), r2(p));
      txt($('mix_mean'), r2(mean));
      txt($('mix_tgt'), r2(tgt));
      txt($('mix_you'), r2(you));
      txt($('mix_err'), r2(err));

      var msg = '归一后目标≈' + r2(tgt) + '；你 L' + k + '=' + r2(you) +
        '，|误差|=' + r2(err) + '。此混合下最优层≈L' + bestK +
        (k === bestK ? '（你已最优）。' : '（你未最优）。');
      txt($('mix_vh'), msg);
      tint($('mix_vh'), k === bestK ? C.green : C.amber);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, ww = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 18, y1 = h - 46;
      var bw = ww - pl - pr, bh = y1 - pt;
      var maxY = Math.max(L0, tgt, you) * 1.1;
      function sx(i) { return pl + ((i + 0.5) / 6) * bw; }
      function sy(v) { return y1 - (v / maxY) * bh; }
      var barW = bw / 8;

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var gi = 0; gi <= 4; gi++) {
        var gv = maxY * (1 - gi / 4);
        var gy = sy(gv);
        ctx.beginPath();
        ctx.moveTo(pl, gy);
        ctx.lineTo(pl + bw, gy);
        ctx.stroke();
        ctx.fillText(String(Math.round(gv)), pl - 6, gy + 4);
      }

      var labels = ['L0', 'L1', 'L2', 'L3', '你', '目标'];
      var vals = [choices[0], choices[1], choices[2], choices[3], you, tgt];
      var cols = [C.ink3, C.amber, C.green, C.blue, C.purple, C.red];
      var i;
      for (i = 0; i < 6; i++) {
        ctx.fillStyle = cols[i];
        var x = sx(i) - barW / 2;
        var y = sy(vals[i]);
        ctx.fillRect(x, y, barW, y1 - y);
        ctx.fillStyle = C.ink2;
        ctx.textAlign = 'center';
        ctx.font = '11px sans-serif';
        ctx.fillText(labels[i], sx(i), y1 + 13);
        var lab = r1(vals[i]);
        var lw = ctx.measureText(lab).width;
        ctx.fillStyle = C.ink;
        ctx.fillText(lab, Math.min(sx(i), ww - lw / 2 - 6), Math.max(y - 6, pt + 10));
      }
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('各层选择 vs 开奖目标', pl + bw / 2, y1 + 31);
    }
    bind(['mix_w0', 'mix_w1', 'mix_w2', 'mix_w3', 'mix_k', 'mix_p'], upd);
    upd();
  })();

  /* ── 3. Cognitive Hierarchy ── */
  (function ch() {
    if (!$('ch_tau')) return;
    var cv = $('chChart');

    function upd() {
      var tau = parseFloat($('ch_tau').value);
      var p = parseFloat($('ch_p').value);
      var l0 = parseFloat($('ch_l0').value);
      var K = 6;
      var f = [], k, h;
      for (k = 0; k <= K; k++) f.push(poisson(tau, k));
      var choices = [l0];
      for (k = 1; k <= K; k++) {
        var wsum = 0, psum = 0;
        for (h = 0; h < k; h++) {
          wsum += f[h] * choices[h];
          psum += f[h];
        }
        choices.push(p * (wsum / psum));
      }
      var mean = 0, mass = 0;
      for (k = 0; k <= K; k++) {
        mean += f[k] * choices[k];
        mass += f[k];
      }
      mean /= mass;

      txt($('ch_tauO'), r2(tau));
      txt($('ch_pO'), r2(p));
      txt($('ch_l0O'), String(Math.round(l0)));
      txt($('ch_p0'), pct1(f[0]));
      txt($('ch_p1'), pct1(f[1]));
      txt($('ch_p2'), pct1(f[2]));
      txt($('ch_mean'), r2(mean));

      var msg = 'τ=' + r2(tau) + '：P(0/1/2)=' + pct1(f[0]) + '/' + pct1(f[1]) + '/' + pct1(f[2]) +
        '；CH 均值≈' + r2(mean) + '（纯 L2=' + r2(levelK(p, l0, 2)) + ' 更极端）。';
      txt($('ch_vh'), msg);
      tint($('ch_vh'), tau < 1.2 ? C.amber : (tau < 2.2 ? C.green : C.blue));

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxF = Math.max.apply(null, f) * 1.15;
      function sx(i) { return pl + ((i + 0.5) / (K + 1)) * bw; }
      function sy(v) { return y1 - (v / maxF) * bh; }
      var barW = bw / (K + 3);

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var gi = 0; gi <= 4; gi++) {
        var gv = maxF * (1 - gi / 4);
        var gy = sy(gv);
        ctx.beginPath();
        ctx.moveTo(pl, gy);
        ctx.lineTo(pl + bw, gy);
        ctx.stroke();
        ctx.fillText(pct1(gv), pl - 4, gy + 4);
      }

      for (k = 0; k <= K; k++) {
        ctx.fillStyle = k <= 2 ? C.green : C.blue;
        var x = sx(k) - barW / 2;
        var y = sy(f[k]);
        ctx.fillRect(x, y, barW, y1 - y);
        ctx.fillStyle = C.ink2;
        ctx.textAlign = 'center';
        ctx.font = '11px sans-serif';
        ctx.fillText(String(k), sx(k), y1 + 13);
      }
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('Poisson 深度分布 f(k) · 均值标记', pl + bw / 2, y1 + 31);

      ctx.strokeStyle = C.red;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      var mx = pl + (Math.min(tau, K) / K) * bw;
      ctx.moveTo(mx, pt);
      ctx.lineTo(mx, y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.red;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('τ', Math.min(mx + 4, w - 20), pt + 12);
    }
    bind(['ch_tau', 'ch_p', 'ch_l0'], upd);
    upd();
  })();

  /* ── 4. +1 优势 ── */
  (function adv() {
    if (!$('adv_m')) return;
    var cv = $('advChart');

    function upd() {
      var m = parseInt($('adv_m').value, 10);
      var n = parseFloat($('adv_n').value) / 100;
      var p = parseFloat($('adv_p').value);
      var l0 = parseFloat($('adv_l0').value);
      var mean = n * l0 + (1 - n) * levelK(p, l0, m);
      var tgt = p * mean;
      var e0 = Math.abs(levelK(p, l0, m) - tgt);
      var e1 = Math.abs(levelK(p, l0, m + 1) - tgt);
      var e2 = Math.abs(levelK(p, l0, m + 2) - tgt);
      var best = 'm';
      var be = e0;
      if (e1 < be) { be = e1; best = 'm+1'; }
      if (e2 < be) { be = e2; best = 'm+2'; }

      txt($('adv_mO'), String(m));
      txt($('adv_nO'), String(Math.round(n * 100)));
      txt($('adv_pO'), r2(p));
      txt($('adv_l0O'), String(Math.round(l0)));
      txt($('adv_tgt'), r2(tgt));
      txt($('adv_e0'), r2(e0));
      txt($('adv_e1'), r2(e1));
      txt($('adv_e2'), r2(e2));

      var msg = '众数 m=' + m + ' 时，目标≈' + r2(tgt) +
        '；选 m / m+1 / m+2 误差=' + r2(e0) + ' / ' + r2(e1) + ' / ' + r2(e2) +
        ' → 最优相对深度 ' + best +
        (best === 'm+1' ? '——「深一层」成立。' : '——此时「+1」并非最优。');
      txt($('adv_vh'), msg);
      tint($('adv_vh'), best === 'm+1' ? C.green : C.amber);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var errs = [e0, e1, e2];
      var maxE = Math.max(errs[0], errs[1], errs[2], 0.01) * 1.2;
      function sx(i) { return pl + ((i + 0.5) / 3) * bw; }
      function sy(v) { return y1 - (v / maxE) * bh; }
      var barW = bw / 5;
      var labs = ['选 m', '选 m+1', '选 m+2'];
      var cols2 = [C.amber, C.green, C.blue];
      var i;

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var gi = 0; gi <= 4; gi++) {
        var gv = maxE * (1 - gi / 4);
        var gy = sy(gv);
        ctx.beginPath();
        ctx.moveTo(pl, gy);
        ctx.lineTo(pl + bw, gy);
        ctx.stroke();
        ctx.fillText(r1(gv), pl - 6, gy + 4);
      }

      for (i = 0; i < 3; i++) {
        ctx.fillStyle = cols2[i];
        var x = sx(i) - barW / 2;
        var y = sy(errs[i]);
        ctx.fillRect(x, y, barW, y1 - y);
        ctx.fillStyle = C.ink2;
        ctx.textAlign = 'center';
        ctx.fillText(labs[i], sx(i), y1 + 13);
        ctx.fillStyle = C.ink;
        ctx.fillText(r2(errs[i]), sx(i), Math.max(y - 6, pt + 10));
      }
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('|选择 − 目标| 误差（越小越好）', pl + bw / 2, y1 + 31);
    }
    bind(['adv_m', 'adv_n', 'adv_p', 'adv_l0'], upd);
    upd();
  })();
})();
