/* ============================================================
   《BTC-时间幂律模型（Power Law Theory, PLT）》主题脚本
   四个可调模型：
     1. 幂律公允价计算器  — log10 P = a + β·log10(days)
     2. 起点敏感性探测器  — 创世日平移 → 指数漂移（Stolte 批评）
     3. 漂移剥离器        — 折价抄底胜率 vs 随机持币基准
     4. 走廊位置图        — log-log 幂律带 + 现货点
   默认参数：β=5.69, logA=-16.524（Santostasi & Perrenod 2026 复现）
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  var GENESIS_MS = Date.UTC(2009, 0, 3);
  var DEFAULT_BETA = 5.69;
  var DEFAULT_LOGA = -16.524;
  var DEFAULT_SIGMA = 0.302;

  function fairPrice(days, beta, logA) {
    if (days <= 0) return 0;
    return Math.pow(10, logA + beta * Math.log10(days));
  }

  function fmtUSD(v) {
    if (!isFinite(v) || v <= 0) return '—';
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(2) + 'M';
    if (v >= 1e3) return '$' + Math.round(v).toLocaleString('en-US');
    return '$' + v.toFixed(2);
  }

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

  function olsLogLog(points) {
    var n = points.length, sx = 0, sy = 0, sxx = 0, sxy = 0;
    points.forEach(function (p) {
      var lx = Math.log10(p.x), ly = Math.log10(p.y);
      sx += lx; sy += ly; sxx += lx * lx; sxy += lx * ly;
    });
    var beta = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    var logA = (sy - beta * sx) / n;
    return { beta: beta, logA: logA };
  }

  /* ══ 工具 1 · 幂律公允价计算器 ══ */
  (function pltPricer() {
    var daysEl = $('plt_days'), betaEl = $('plt_beta'), spotEl = $('plt_spot');
    if (!daysEl || !betaEl || !spotEl) return;
    var daysO = $('plt_daysO'), betaO = $('plt_betaO'), spotO = $('plt_spotO');
    var fairEl = $('plt_fair'), fairHEl = $('plt_fairh');
    var dexEl = $('plt_dex'), dexHEl = $('plt_dexh');
    var discEl = $('plt_disc'), discHEl = $('plt_disch');
    var floorEl = $('plt_floor'), ceilEl = $('plt_ceil');
    var vEl = $('plt_v'), vhEl = $('plt_vh');
    var cv = $('pltPriceChart');

    function draw(days, beta, logA, spot, fair) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 58, r: 18, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minD = 400, maxD = Math.max(days * 1.15, 7000);
      var minP = fairPrice(minD, beta, logA) * 0.3;
      var maxP = fairPrice(maxD, beta, logA) * 2.5;
      var sx = function (d) { return pad.l + (Math.log10(d) - Math.log10(minD)) / (Math.log10(maxD) - Math.log10(minD)) * iw; };
      var sy = function (p) {
        return pad.t + (1 - (Math.log10(p) - Math.log10(minP)) / (Math.log10(maxP) - Math.log10(minP))) * ih;
      };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      var bands = [
        { sig: -DEFAULT_SIGMA, col: '#0f8a4d', dash: [4, 4] },
        { sig: 0, col: '#1d4ed8', dash: [] },
        { sig: DEFAULT_SIGMA, col: '#d5342c', dash: [4, 4] }
      ];
      bands.forEach(function (b) {
        ctx.strokeStyle = b.col;
        ctx.lineWidth = b.sig === 0 ? 2.2 : 1.2;
        ctx.setLineDash(b.dash);
        ctx.beginPath();
        for (var i = 0; i <= 50; i++) {
          var d = minD * Math.pow(maxD / minD, i / 50);
          var p = fairPrice(d, beta, logA) * Math.pow(10, b.sig);
          var x = sx(d), y = sy(p);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });
      var dx = sx(days), dy = sy(spot);
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(dx, dy, 5.5, 0, Math.PI * 2); ctx.fill();
      var fx = sx(days), fy = sy(fair);
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(fx, fy, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('log(天数)', pad.l + iw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillText('● 现货', pad.l + 4, pad.t + 12);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillText('— 公允价', pad.l + 56, pad.t + 12);
    }

    function upd() {
      var days = parseFloat(daysEl.value);
      var beta = parseFloat(betaEl.value);
      var spot = parseFloat(spotEl.value);
      var logA = DEFAULT_LOGA + (beta - DEFAULT_BETA) * 0.02;
      var fair = fairPrice(days, beta, logA);
      var dex = Math.log10(spot / fair);
      var disc = (spot / fair - 1) * 100;
      var floor = fair * Math.pow(10, -DEFAULT_SIGMA);
      var ceil = fair * Math.pow(10, DEFAULT_SIGMA);
      txt(daysO, days.toLocaleString('en-US') + ' 天');
      txt(betaO, beta.toFixed(2));
      txt(spotO, fmtUSD(spot));
      txt(fairEl, fmtUSD(fair));
      txt(fairHEl, 'log₁₀P = ' + logA.toFixed(3) + ' + ' + beta.toFixed(2) + '·log₁₀t');
      txt(dexEl, dex.toFixed(3) + ' dex');
      tint(dexEl, dex < -0.1 ? 'var(--green)' : dex > 0.1 ? 'var(--red)' : 'var(--amber)');
      txt(dexHEl, 'σ≈0.302 → 约 ' + (dex / DEFAULT_SIGMA).toFixed(1) + 'σ 偏离');
      txt(discEl, disc.toFixed(1) + '%');
      tint(discEl, disc < 0 ? 'var(--green)' : 'var(--red)');
      txt(discHEl, disc < 0 ? '低于公允价（折价区）' : '高于公允价（溢价区）');
      txt(floorEl, fmtUSD(floor));
      txt(ceilEl, fmtUSD(ceil));
      var label, hint, col;
      if (dex < -0.25) {
        label = '深度折价'; hint = '历史罕见区间；均值回归叙事最强，但无因果保证';
        col = 'var(--green)';
      } else if (dex < -0.05) {
        label = '折价区'; hint = '2026-09 典型位置（约 −0.18 dex）';
        col = 'var(--amber)';
      } else if (dex <= 0.15) {
        label = '公允附近'; hint = '走廊中段；泡沫/恐慌信号弱';
        col = 'var(--amber)';
      } else {
        label = '溢价/泡沫带'; hint = '接近 +1σ 上沿；历次周期顶多在此带';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(days, beta, logA, spot, fair);
    }
    [daysEl, betaEl, spotEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 2 · 起点敏感性探测器 ══ */
  (function originShift() {
    var shiftEl = $('plt_shift');
    if (!shiftEl) return;
    var shiftO = $('plt_shiftO');
    var betaEl = $('plt_obeta'), betaHEl = $('plt_obetah');
    var fairEl = $('plt_ofair'), fairHEl = $('plt_ofairh');
    var origEl = $('plt_orig'), origHEl = $('plt_origh');
    var vEl = $('plt_v2'), vhEl = $('plt_v2h');
    var cv = $('pltOriginChart');

    function synthSeries(originShift) {
      var pts = [];
      for (var d = 560; d <= 6465; d += 30) {
        var t = d - originShift;
        if (t < 30) continue;
        var noise = 1 + 0.18 * Math.sin(d / 400) + 0.12 * Math.sin(d / 90);
        var p = fairPrice(t, DEFAULT_BETA, DEFAULT_LOGA) * noise;
        pts.push({ x: t, y: p });
      }
      return pts;
    }

    function draw(shift, beta, fairOrig, fairShift) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minB = 4.5, maxB = 8.5;
      var sy = function (b) { return pad.t + (1 - (b - minB) / (maxB - minB)) * ih; };
      var shifts = [0, 200, 400, 600, 800, 1000];
      var betas = shifts.map(function (sh) {
        return olsLogLog(synthSeries(sh)).beta;
      });
      var curIdx = Math.round(shift / 200);
      if (curIdx > 5) curIdx = 5;
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#c9d0d9';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      betas.forEach(function (b, j) {
        var x = pad.l + (j / 5) * iw, y = sy(b);
        if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var cx = pad.l + (curIdx / 5) * iw, cy = sy(beta);
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#d5342c';
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(pad.l, sy(DEFAULT_BETA)); ctx.lineTo(w - pad.r, sy(DEFAULT_BETA)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('起点平移（天）', pad.l + iw / 2, y1 + 31);
      ctx.fillText('0', pad.l, y1 + 13);
      ctx.fillText('1000', w - pad.r, y1 + 13);
      ctx.textAlign = 'right';
      ctx.fillText('β', pad.l - 6, pad.t + 10);
      ctx.fillText(maxB.toFixed(1), pad.l - 6, pad.t + ih / 2);
    }

    function upd() {
      var shift = parseFloat(shiftEl.value);
      var pts = synthSeries(shift);
      var fit0 = olsLogLog(synthSeries(0));
      var fitS = olsLogLog(pts);
      var days = 6465 - shift;
      var fair0 = fairPrice(6465, fit0.beta, fit0.logA);
      var fairS = fairPrice(days, fitS.beta, fitS.logA);
      txt(shiftO, '+' + shift + ' 天');
      txt(betaEl, fitS.beta.toFixed(2));
      txt(betaHEl, '平移前 β=' + fit0.beta.toFixed(2) + ' → 变化 ' + (fitS.beta - fit0.beta).toFixed(2));
      txt(fairEl, fmtUSD(fairS));
      txt(fairHEl, '同一现货日，不同起点 → 公允价差 ' + ((fairS / fair0 - 1) * 100).toFixed(1) + '%');
      txt(origEl, fmtUSD(fair0));
      txt(origHEl, 'Stolte (2022)：指数可漂至 5.65–16.49【分析】');
      var label, hint, col;
      if (Math.abs(fitS.beta - fit0.beta) < 0.15) {
        label = '轻度敏感'; hint = '小范围平移；结论尚稳';
        col = 'var(--green)';
      } else if (Math.abs(fitS.beta - fit0.beta) < 0.4) {
        label = '中度敏感'; hint = 'β 已明显漂移——外推需谨慎';
        col = 'var(--amber)';
      } else {
        label = '高度敏感'; hint = '同一数据，不同起点 → 完全不同「定律」';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(shift, fitS.beta, fair0, fairS);
    }
    shiftEl.addEventListener('input', upd);
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function driftStrip() {
    var winEl = $('plt_win'), holdEl = $('plt_hold');
    if (!winEl || !holdEl) return;
    var winO = $('plt_winO'), holdO = $('plt_holdO');
    var baseEl = $('plt_base'), baseHEl = $('plt_baseh');
    var excessEl = $('plt_excess'), excessHEl = $('plt_excessh');
    var nEl = $('plt_n'), nHEl = $('plt_nh');
    var vEl = $('plt_v3'), vhEl = $('plt_v3h');

    function upd() {
      var win = parseFloat(winEl.value);
      var hold = parseFloat(holdEl.value);
      var mu = 0.50, sig = 0.65;
      var z = mu * (hold / 252) / (sig * Math.sqrt(hold / 252));
      var base = ncdf(z) * 100;
      var excess = win - base;
      var pb = base / 100, ps = win / 100, diff = ps - pb;
      var n = diff > 0.001 ? Math.ceil(Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / (diff * diff)) : 9999;
      txt(winO, win.toFixed(1) + '%');
      txt(holdO, hold + ' 日');
      txt(baseEl, base.toFixed(1) + '%');
      txt(baseHEl, 'μ=50%/年 · σ=65%/年 · 随机持币');
      txt(excessEl, (excess >= 0 ? '+' : '') + excess.toFixed(1) + ' pp');
      tint(excessEl, excess >= 8 ? 'var(--red)' : excess >= 3 ? 'var(--amber)' : 'var(--green)');
      txt(excessHEl, '表面 ' + win.toFixed(1) + '% 胜率的真实超额');
      txt(nEl, n > 5000 ? '>5000' : String(n));
      txt(nHEl, '证明超额非随机所需约样本量（双侧）');
      var label, hint, col;
      if (excess < 3) {
        label = '超额微弱'; hint = '「折价抄底」叙事可能只是漂移换皮';
        col = 'var(--green)';
      } else if (excess < 10) {
        label = '有一定超额'; hint = '需 OOS + 足够样本才可信';
        col = 'var(--amber)';
      } else {
        label = '显著超额'; hint = '仍要查是否 in-sample 过拟合';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }
    [winEl, holdEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══ 工具 4 · 走廊压缩观测 ══ */
  (function volDecay() {
    var cycleEl = $('plt_cycle');
    if (!cycleEl) return;
    var cycleO = $('plt_cycleO');
    var sigmaEl = $('plt_sigma'), sigmaHEl = $('plt_sigmah');
    var floorEl = $('plt_cfloor'), floorHEl = $('plt_cfloorh');
    var vEl = $('plt_v4'), vhEl = $('plt_v4h');
    var cv = $('pltVolChart');

    var cycleData = [
      { name: '周期 1', sigma: 0.395, floorPct: 18 },
      { name: '周期 2', sigma: 0.340, floorPct: 22 },
      { name: '周期 3', sigma: 0.290, floorPct: 28 },
      { name: '周期 4', sigma: 0.250, floorPct: 32 },
      { name: '周期 5（当前）', sigma: 0.211, floorPct: 38 }
    ];

    function draw(idx) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxS = 0.42;
      var sx = function (i) { return pad.l + (i / (cycleData.length - 1)) * iw; };
      var sy = function (v) { return pad.t + (1 - v / maxS) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      cycleData.forEach(function (c, i) {
        var x = sx(i), y = sy(c.sigma);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      cycleData.forEach(function (c, i) {
        var x = sx(i), y = sy(c.sigma);
        ctx.fillStyle = i === idx ? '#d5342c' : '#1d4ed8';
        ctx.beginPath(); ctx.arc(x, y, i === idx ? 6 : 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.name.replace('（当前）', ''), x, y1 + 13);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('残差 σ（dex）', pad.l + iw / 2, y1 + 31);
    }

    function upd() {
      var idx = parseInt(cycleEl.value, 10);
      var c = cycleData[idx];
      var fair = fairPrice(6465, DEFAULT_BETA, DEFAULT_LOGA);
      var floor = fair * Math.pow(10, -c.sigma);
      txt(cycleO, c.name);
      txt(sigmaEl, c.sigma.toFixed(3) + ' dex');
      txt(sigmaHEl, '较周期 1 压缩 ' + ((1 - c.sigma / 0.395) * 100).toFixed(0) + '%');
      txt(floorEl, fmtUSD(floor));
      txt(floorHEl, 'σ 地板约占公允价 ' + c.floorPct + '%【待验证】');
      var label, hint, col;
      if (idx >= 3) {
        label = '波动收敛期'; hint = 'ETF 时代走廊变窄——时点预测更难';
        col = 'var(--amber)';
      } else {
        label = '高波动期'; hint = '早期 cycle 带宽大，「精确顶底」错觉更强';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(idx);
    }
    cycleEl.addEventListener('input', upd);
    window.addEventListener('resize', upd);
    upd();
  })();
})();
