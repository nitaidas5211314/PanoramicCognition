/* ============================================================
   《BTC 平方根定律》主题脚本
   四个可调模型：
     1. 价格冲击计算器   — I = Y·σ·(Q/V)^δ
     2. TWAP 切片优化器   — 单笔 vs 分片执行成本
     3. 参与率 crossover  — 线性区 ↔ 平方根区
     4. 漂移剥离器        — 执行策略胜率 vs 随机持币基准
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  function ncdf(x) {
    var s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2;
    var t = 1 / (1 + 0.3275911 * z);
    var y = 1 - (t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 +
            t * (-1.453152027 + t * 1.061405429))))) * Math.exp(-z * z);
    return 0.5 * (1 + s * y);
  }

  function fit(cv, cssH) {
    if (!cv) return null;
    var dpr = window.devicePixelRatio || 1;
    var w = Math.max(240, cv.clientWidth || cv.parentNode.clientWidth || 640);
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(cssH * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: cssH };
  }

  function impact(Q, V, sigma, delta, Y) {
    if (Q <= 0 || V <= 0 || sigma <= 0) return 0;
    return Y * sigma * Math.pow(Q / V, delta);
  }

  /* ══ 工具 1 · 价格冲击计算器 ══ */
  (function srlImpact() {
    var qEl = $('srl_q'), vEl = $('srl_v'), sigEl = $('srl_sig');
    var delEl = $('srl_del'), yEl = $('srl_y'), pxEl = $('srl_px');
    if (!qEl || !vEl) return;
    var qO = $('srl_qO'), vO = $('srl_vO'), sigO = $('srl_sigO');
    var delO = $('srl_delO'), yO = $('srl_yO'), pxO = $('srl_pxO');
    var impEl = $('srl_imp'), impUsdEl = $('srl_imp_usd');
    var phiEl = $('srl_phi'), vEl2 = $('srl_verdict'), vhEl = $('srl_verdict_h');
    var cv = $('srlChart');

    function zone(phi) {
      if (phi >= 0.10) return { t: '超大单区', c: '#d5342c', h: '参与率 >10%——冲击可能超线性' };
      if (phi >= 0.01) return { t: '机构区', c: '#b8730a', h: '0.01–10% 日量——平方根区最常被引用' };
      if (phi >= 0.001) return { t: '典型 metaorder', c: '#1d4ed8', h: '0.1%–1% 日量——Donier 2014 主样本区' };
      return { t: '零售碎单', c: '#454c56', h: '<0.1% 日量——更接近线性 λQ' };
    }

    function draw(phi, impPct, delta) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxPhi = 0.05;
      var sx = function (v) { return pad.l + (v / maxPhi) * iw; };
      var sy = function (v) { return pad.t + ih - Math.min(v, 0.015) / 0.015 * ih; };
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      var pts = [];
      for (var i = 0; i <= 80; i++) {
        var p = maxPhi * i / 80;
        var imp = 0.9 * 0.03 * Math.pow(p, delta);
        pts.push({ x: sx(p), y: sy(imp) });
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (pt, idx) {
        if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      if (delta !== 0.5) {
        ctx.strokeStyle = '#c9d0d9';
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        for (i = 0; i <= 80; i++) {
          p = maxPhi * i / 80;
          imp = 0.9 * 0.03 * Math.pow(p, 0.5);
          var x = sx(p), y = sy(imp);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }
      var mx = sx(Math.min(phi, maxPhi));
      var my = sy(impPct);
      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      [0.001, 0.01, 0.05].forEach(function (ref) {
        ctx.fillText((ref * 100).toFixed(1) + '%', sx(ref), y1 + 13);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('参与率 Q/V', pad.l + iw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillText('δ=' + delta.toFixed(2), w - pad.r, pad.t + 14);
      if (delta !== 0.5) {
        ctx.fillStyle = '#c9d0d9';
        ctx.fillText('δ=0.50 参考', w - pad.r, pad.t + 28);
      }
    }

    function update() {
      var Q = parseFloat(qEl.value);
      var V = parseFloat(vEl.value);
      var sigma = parseFloat(sigEl.value) / 100;
      var delta = parseFloat(delEl.value);
      var Y = parseFloat(yEl.value);
      var px = parseFloat(pxEl.value);
      var imp = impact(Q, V, sigma, delta, Y);
      var phi = Q / V;
      var z = zone(phi);
      txt(qO, Q.toFixed(0) + ' BTC');
      txt(vO, V.toLocaleString() + ' BTC/日');
      txt(sigO, (sigma * 100).toFixed(1) + '%');
      txt(delO, delta.toFixed(2));
      txt(yO, Y.toFixed(2));
      txt(pxO, '$' + px.toLocaleString());
      txt(impEl, (imp * 100).toFixed(3) + '%');
      txt(impUsdEl, '$' + Math.round(imp * px).toLocaleString());
      txt(phiEl, (phi * 100).toFixed(3) + '%');
      txt(vEl2, z.t);
      tint(vEl2, z.c);
      txt(vhEl, z.h);
      draw(phi, imp, delta);
    }
    [qEl, vEl, sigEl, delEl, yEl, pxEl].forEach(function (el) {
      el.addEventListener('input', update);
    });
    update();
  })();

  /* ══ 工具 2 · TWAP 切片优化器 ══ */
  (function srlTwap() {
    var qEl = $('srl_tw_q'), nEl = $('srl_tw_n');
    var vEl = $('srl_tw_v'), sigEl = $('srl_tw_sig'), delEl = $('srl_tw_del');
    if (!qEl || !nEl) return;
    var qO = $('srl_tw_qO'), nO = $('srl_tw_nO');
    var aggEl = $('srl_tw_agg'), twapEl = $('srl_tw_cost');
    var ratioEl = $('srl_tw_ratio'), saveEl = $('srl_tw_save');
    var vEl2 = $('srl_tw_verdict'), vhEl = $('srl_tw_verdict_h');
    var cv = $('srlTwapChart');

    function twapCost(Q, n, V, sigma, delta, Y) {
      if (n < 1) n = 1;
      var slice = Q / n;
      var total = 0;
      for (var i = 0; i < n; i++) total += impact(slice, V, sigma, delta, Y);
      return total;
    }

    function draw(n, agg, tw) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxN = 30;
      var maxImp = agg * 1.1;
      var sx = function (v) { return pad.l + (v / maxN) * iw; };
      var sy = function (v) { return pad.t + ih - (v / maxImp) * ih; };
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 1; i <= maxN; i++) {
        var Q = parseFloat(qEl.value);
        var V = parseFloat(vEl.value);
        var sigma = parseFloat(sigEl.value) / 100;
        var delta = parseFloat(delEl.value);
        var tc = twapCost(Q, i, V, sigma, delta, 0.9);
        var x = sx(i), y = sy(tc);
        if (i === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = '#d5342c';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.l, sy(agg)); ctx.lineTo(w - pad.r, sy(agg)); ctx.stroke();
      ctx.setLineDash([]);
      var nx = sx(Math.min(n, maxN));
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(nx, sy(tw), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('切片数 n', pad.l + iw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#d5342c';
      ctx.fillText('单笔', pad.l + 4, sy(agg) - 4);
    }

    function update() {
      var Q = parseFloat(qEl.value);
      var n = parseInt(nEl.value, 10);
      var V = parseFloat(vEl.value);
      var sigma = parseFloat(sigEl.value) / 100;
      var delta = parseFloat(delEl.value);
      var agg = impact(Q, V, sigma, delta, 0.9);
      var tw = twapCost(Q, n, V, sigma, delta, 0.9);
      var ratio = tw / agg;
      var save = (1 - agg / tw) * 100;
      txt(qO, Q.toFixed(0) + ' BTC');
      txt(nO, String(n));
      txt(aggEl, (agg * 100).toFixed(3) + '%');
      txt(twapEl, (tw * 100).toFixed(3) + '%');
      txt(ratioEl, ratio.toFixed(2) + '×');
      txt(saveEl, save > 0 ? '+' + save.toFixed(1) + '% 更贵' : save.toFixed(1) + '% 更贵');
      if (save > 0) {
        txt(vEl2, 'TWAP 更贵（预期）');
        tint(vEl2, '#b8730a');
        txt(vhEl, '平方根下分片 Σ√(Q/n) = √n·√Q——n 片总成本 ∝ √n');
      } else {
        txt(vEl2, '—');
        tint(vEl2, '#454c56');
        txt(vhEl, '—');
      }
      draw(n, agg, tw);
    }
    [qEl, nEl, vEl, sigEl, delEl].forEach(function (el) {
      el.addEventListener('input', update);
    });
    update();
  })();

  /* ══ 工具 3 · 参与率 crossover ══ */
  (function srlCross() {
    var etaEl = $('srl_cr_eta'), delEl = $('srl_cr_del');
    if (!etaEl) return;
    var etaO = $('srl_cr_etaO'), delO = $('srl_cr_delO');
    var linEl = $('srl_cr_lin'), srtEl = $('srl_cr_sqrt');
    var regEl = $('srl_cr_reg'), vEl2 = $('srl_cr_v'), vhEl = $('srl_cr_vh');
    var cv = $('srlCrossChart');

    function F(eta, delta) {
      var etaStar = 0.001;
      if (eta <= etaStar) return eta;
      return Math.pow(eta, delta);
    }

    function draw(eta, delta) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxEta = 0.02;
      var sx = function (v) { return pad.l + (Math.log10(v / 1e-5) / Math.log10(maxEta / 1e-5)) * iw; };
      var maxF = Math.pow(maxEta, 0.5) * 1.1;
      var sy = function (v) { return pad.t + ih - (v / maxF) * ih; };
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      var etaStar = 0.001;
      ctx.fillStyle = 'rgba(29,78,216,0.08)';
      ctx.fillRect(pad.l, pad.t, sx(etaStar) - pad.l, ih);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 100; i++) {
        var e = 1e-5 * Math.pow(maxEta / 1e-5, i / 100);
        var f = F(e, delta);
        var x = sx(e), y = sy(f);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = '#c9d0d9';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        e = 1e-5 * Math.pow(maxEta / 1e-5, i / 100);
        f = e;
        x = sx(e); y = sy(f);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      var mx = sx(eta);
      var my = sy(F(eta, delta));
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('参与率 η (log)', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var eta = parseFloat(etaEl.value) / 100;
      var delta = parseFloat(delEl.value);
      var lin = eta;
      var srt = Math.pow(eta, delta);
      var reg;
      if (eta < 0.001) reg = '线性区（η<0.1%）';
      else if (eta < 0.01) reg = 'crossover 区';
      else reg = '平方根主导区';
      txt(etaO, (eta * 100).toFixed(3) + '%');
      txt(delO, delta.toFixed(2));
      txt(linEl, (lin * 100).toFixed(4) + '%');
      txt(srtEl, (srt * 100).toFixed(4) + '%');
      txt(regEl, reg);
      txt(vEl2, reg);
      tint(vEl2, eta < 0.001 ? '#454c56' : '#1d4ed8');
      txt(vhEl, 'CFM LLOB 模型：小 η 线性，大 η ∝ η^δ');
      draw(eta, delta);
    }
    [etaEl, delEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 4 · 漂移剥离器 ══ */
  (function srlDrift() {
    var tEl = $('srl_d_T'), psEl = $('srl_d_ps');
    var muEl = $('srl_d_mu'), sgEl = $('srl_d_sg');
    if (!tEl) return;
    var tO = $('srl_d_TO'), psO = $('srl_d_psO');
    var muO = $('srl_d_muO'), sgO = $('srl_d_sgO');
    var baseEl = $('srl_d_base'), dpEl = $('srl_d_dp'), nEl = $('srl_d_n');
    var vEl2 = $('srl_d_v'), vhEl = $('srl_d_vh');
    var cv = $('srlDriftChart');

    function sampleSize(pb, ps) {
      if (ps <= pb) return Infinity;
      var z196 = 1.96, z84 = 0.84;
      return Math.ceil(Math.pow(z196 * Math.sqrt(pb * (1 - pb)) + z84 * Math.sqrt(ps * (1 - ps)), 2) / Math.pow(ps - pb, 2));
    }

    function draw(T, pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 16, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var pts = [];
      for (var t = 5; t <= 180; t += 5) {
        var z = mu * (t / 252) / (sg * Math.sqrt(t / 252));
        pts.push({ t: t, pb: ncdf(z) });
      }
      var sx = function (v) { return pad.l + (v / 180) * iw; };
      var sy = function (v) { return pad.t + ih - v * ih; };
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, idx) {
        var x = sx(p.t), y = sy(p.pb);
        if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var tx = sx(T);
      ctx.strokeStyle = '#d5342c';
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(tx, pad.t); ctx.lineTo(tx, y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('持有期（日）', pad.l + iw / 2, y1 + 24);
    }

    function update() {
      var T = parseInt(tEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var z = mu * (T / 252) / (sg * Math.sqrt(T / 252));
      var pb = ncdf(z);
      var dp = (ps - pb) * 100;
      var n = sampleSize(pb, ps);
      txt(tO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(0) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(dpEl, (dp >= 0 ? '+' : '') + dp.toFixed(1) + ' pp');
      tint(dpEl, dp >= 3 ? '#d5342c' : dp >= 0 ? '#b8730a' : '#0f8a4d');
      txt(nEl, isFinite(n) ? String(n) : '∞');
      if (dp < 2) {
        txt(vEl2, '超额微弱');
        tint(vEl2, '#454c56');
        txt(vhEl, '执行 alpha 要先减掉 BTC 正漂移基准');
      } else if (dp < 6) {
        txt(vEl2, '超额有限');
        tint(vEl2, '#b8730a');
        txt(vhEl, '需 n≈' + n + ' 次交易才谈显著性');
      } else {
        txt(vEl2, '超额可观');
        tint(vEl2, '#d5342c');
        txt(vhEl, '仍要验证样本外与冲击成本');
      }
      draw(T, pb, ps);
    }
    [tEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();
})();
