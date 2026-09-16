/* ============================================================
   《BTC-链上与周期技术指标》主题脚本
   四个可调模型：
     1. 链上信号栈     — MVRV → NUPL + SOPR + Z 过热计数
     2. 减半周期时钟   — 距减半日数 vs 历史峰延迟
     3. Pi Cycle 距离计 — 111 DMA vs 350×2 间距
     4. 漂移剥离器     — 周期信号胜率 vs 随机持币基准
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

  function fmtK(v) {
    return '$' + Math.round(v).toLocaleString('en-US');
  }

  /* ══ 工具 1 · 链上信号栈 ══ */
  (function signalStack() {
    var mvrvEl = $('bc_mvrv'), soprEl = $('bc_sopr'), zEl = $('bc_z');
    if (!mvrvEl || !soprEl || !zEl) return;
    var mvrvO = $('bc_mvrvO'), soprO = $('bc_soprO'), zO = $('bc_zO');
    var nuplEl = $('bc_nupl'), nuplHEl = $('bc_nuplh');
    var zoneEl = $('bc_zone'), zoneHEl = $('bc_zoneh');
    var hotEl = $('bc_hot'), hotHEl = $('bc_hoth');
    var vEl = $('bc_stack_v'), vhEl = $('bc_stack_vh');
    var cv = $('bc_stackChart');

    function nuplZone(n) {
      if (n >= 0.75) return { z: 'Euphoria', c: '#d5342c', h: '历史顶区参考；2025 未 sustained 达此' };
      if (n >= 0.5) return { z: 'Belief/Greed', c: '#d5342c', h: '偏高；需配 SOPR 与 Pi' };
      if (n >= 0.25) return { z: 'Optimism', c: '#b8730a', h: '2026-09 默认区' };
      if (n >= 0) return { z: 'Hope/Fear', c: '#454c56', h: '低盈利；常对应调整' };
      return { z: 'Capitulation', c: '#0f8a4d', h: '全网整体亏损' };
    }

    function draw(mvrv, z, hot) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var refs = [
        { lo: 0, hi: 1, col: '#e8f5ee', label: 'MVRV<1' },
        { lo: 1, hi: 2, col: '#f4f6f9', label: '1–2' },
        { lo: 2, hi: 3.5, col: '#fff7e6', label: '2–3.5' },
        { lo: 3.5, hi: 4.2, col: '#fdf3f2', label: '>3.5' }
      ];
      var maxM = 4.2;
      var sx = function (v) { return pad.l + (v / maxM) * iw; };
      refs.forEach(function (b) {
        ctx.fillStyle = b.col;
        ctx.fillRect(sx(b.lo), pad.t, sx(b.hi) - sx(b.lo), ih);
      });
      [1, 2, 3.5].forEach(function (r) {
        var x = sx(r);
        ctx.strokeStyle = r >= 3.5 ? '#d5342c' : '#c9d0d9';
        ctx.setLineDash(r >= 3.5 ? [4, 3] : []);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(r), x, y1 + 13);
      });
      var mx = sx(Math.min(mvrv, maxM));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('MVRV ' + mvrv.toFixed(2), pad.l, pad.t - 4);
      ctx.fillStyle = hot >= 2 ? '#d5342c' : '#454c56';
      ctx.textAlign = 'right';
      ctx.fillText('过热 ' + hot + '/3 · Z=' + (z >= 0 ? '+' : '') + z.toFixed(2), w - pad.r, pad.t - 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MVRV 带 · 顶阈 3.5（ETF 时代常未触达）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var mvrv = parseFloat(mvrvEl.value);
      var sopr = parseFloat(soprEl.value);
      var z = parseFloat(zEl.value);
      var nupl = (mvrv - 1) / mvrv;
      var zinfo = nuplZone(nupl);
      var hot = 0;
      if (mvrv >= 2.5) hot++;
      if (nupl >= 0.5) hot++;
      if (z >= 2.5) hot++;
      txt(mvrvO, mvrv.toFixed(2));
      txt(soprO, sopr.toFixed(2));
      txt(zO, (z >= 0 ? '+' : '') + z.toFixed(2) + 'σ');
      txt(nuplEl, (nupl * 100).toFixed(1) + '%');
      txt(nuplHEl, 'NUPL=(MVRV−1)/MVRV');
      txt(zoneEl, zinfo.z);
      tint(zoneEl, zinfo.c);
      txt(zoneHEl, zinfo.h);
      txt(hotEl, hot + ' / 3');
      txt(hotHEl, 'MVRV≥2.5 · NUPL≥0.5 · Z≥2.5');
      var verdict = hot >= 2 ? '栈偏热 · 警惕派发' : hot === 1 ? '单票过热 · 勿独断' : '周期未完成（链上视角）';
      var vcol = hot >= 2 ? '#d5342c' : hot === 1 ? '#b8730a' : '#0f8a4d';
      txt(vEl, verdict);
      tint(vEl, vcol);
      txt(vhEl, 'SOPR=' + sopr.toFixed(2) + (sopr < 0.98 ? ' · 亏损转移' : sopr > 1.02 ? ' · 盈利转移' : ' · 平衡'));
      draw(mvrv, z, hot);
    }
    [mvrvEl, soprEl, zEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 2 · 减半周期时钟 ══ */
  (function halvingClock() {
    var daysEl = $('bc_hdays');
    if (!daysEl) return;
    var daysO = $('bc_hdaysO'), peakEl = $('bc_hpeak'), peakHEl = $('bc_hpeakh');
    var phaseEl = $('bc_hphase'), phaseHEl = $('bc_hphaseh');
    var vEl = $('bc_h_v'), vhEl = $('bc_h_vh');
    var cv = $('bc_hChart');
    var PEAKS = [
      { era: '2016 周期', days: 518, label: '2017 顶' },
      { era: '2020 周期', days: 548, label: '2021 顶' },
      { era: '2024 周期', days: 570, label: '2025 顶' }
    ];

    function phase(d) {
      if (d < 200) return { t: '减半后早期', c: '#454c56', h: '供应冲击消化期' };
      if (d < 450) return { t: '扩张中段', c: '#b8730a', h: '历史强势段' };
      if (d < 570) return { t: '接近典型峰位', c: '#d5342c', h: '2016–2024 峰延迟 518–570 日' };
      if (d < 750) return { t: '峰后调整', c: '#1d4ed8', h: '2026-09：881 日在此区' };
      return { t: '深周期后段', c: '#0f8a4d', h: '距下次减半渐近' };
    }

    function draw(days) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 20, t: 28, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxD = 900;
      var sx = function (d) { return pad.l + (d / maxD) * iw; };
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      PEAKS.forEach(function (p) {
        var x = sx(p.days);
        ctx.strokeStyle = '#d5342c';
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.days + 'd', x, y1 + 13);
        ctx.fillText(p.label, x, pad.t - 6);
      });
      var dx = sx(days);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(dx, pad.t); ctx.lineTo(dx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(dx, pad.t + ih * 0.55, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('当前 ' + days + ' 日', dx, pad.t + ih * 0.55 - 12);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('距第四减半（2024-04-19）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var days = parseInt(daysEl.value, 10);
      var ph = phase(days);
      txt(daysO, days + ' 日');
      txt(peakEl, '570 日');
      txt(peakHEl, '2024 周期 Nov 2025【待验证】');
      txt(phaseEl, ph.t);
      tint(phaseEl, ph.c);
      txt(phaseHEl, ph.h);
      var vtxt = days > 570 ? '已过典型峰延迟 · 调整/再定价阶段' : days > 450 ? '进入历史顶窗口' : '周期早中段';
      txt(vEl, vtxt);
      tint(vEl, days > 570 ? '#1d4ed8' : days > 450 ? '#d5342c' : '#454c56');
      txt(vhEl, '第四周期涨幅远低于 2020【待验证】');
      draw(days);
    }
    daysEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · Pi Cycle 距离计 ══ */
  (function piCycle() {
    var d111El = $('bc_d111'), d350El = $('bc_d350');
    if (!d111El || !d350El) return;
    var d111O = $('bc_d111O'), d350O = $('bc_d350O');
    var gapEl = $('bc_pigap'), gapHEl = $('bc_pigaph');
    var stEl = $('bc_pist'), stHEl = $('bc_pisth');
    var vEl = $('bc_pi_v'), vhEl = $('bc_pi_vh');
    var cv = $('bc_piChart');

    function draw(d111, d350x2, crossed) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 32, b: 46 };
      var iw = w - pad.l - pad.r;
      var y1 = h - 46;
      var y111 = 80, y350 = 140;
      var minP = Math.min(d111, d350x2) * 0.92;
      var maxP = Math.max(d111, d350x2) * 1.08;
      var sx = function (p) { return pad.l + ((p - minP) / (maxP - minP)) * iw; };
      ctx.strokeStyle = '#eef1f5';
      ctx.beginPath(); ctx.moveTo(pad.l, y111); ctx.lineTo(w - pad.r, y111); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad.l, y350); ctx.lineTo(w - pad.r, y350); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('111 DMA', pad.l - 6, y111 + 4);
      ctx.fillStyle = '#b8730a';
      ctx.fillText('350×2 DMA', pad.l - 6, y350 + 4);
      var x111 = sx(d111), x350 = sx(d350x2);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x111, y111 - 8); ctx.lineTo(x111, y111 + 8); ctx.stroke();
      ctx.strokeStyle = '#b8730a';
      ctx.beginPath(); ctx.moveTo(x350, y350 - 8); ctx.lineTo(x350, y350 + 8); ctx.stroke();
      if (crossed) {
        ctx.strokeStyle = '#d5342c';
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(x111, y111); ctx.lineTo(x350, y350); ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Pi Cycle · 111 须上穿 350×2', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var d111 = parseFloat(d111El.value);
      var d350 = parseFloat(d350El.value);
      var crossed = d111 >= d350;
      var gap = crossed ? ((d111 - d350) / d350 * 100) : ((d350 - d111) / d111 * 100);
      txt(d111O, fmtK(d111));
      txt(d350O, fmtK(d350));
      if (crossed) {
        txt(gapEl, '+' + gap.toFixed(1) + '%');
        txt(gapHEl, '111 高于 350×2 · Pi 触发');
        txt(stEl, '已交叉');
        tint(stEl, '#d5342c');
        txt(stHEl, '2024-03 曾误报 · 须栈内确认');
        txt(vEl, 'Pi 信号 · 勿一票否决');
        tint(vEl, '#d5342c');
      } else {
        txt(gapEl, '+' + gap.toFixed(1) + '%');
        txt(gapHEl, '111 低于 350×2 · 间距');
        txt(stEl, '未交叉');
        tint(stEl, '#0f8a4d');
        txt(stHEl, '2026-07 宽距状态【待验证】');
        txt(vEl, '宽距 · 非顶区');
        tint(vEl, '#0f8a4d');
      }
      txt(vhEl, '默认 85000/90000 → +5.9%');
      draw(d111, d350, crossed);
    }
    [d111El, d350El].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 4 · 漂移剥离器 ══ */
  (function driftStrip() {
    var TEl = $('bc_T'), psEl = $('bc_ps'), muEl = $('bc_mu'), sgEl = $('bc_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('bc_TO'), psO = $('bc_psO'), muO = $('bc_muO'), sgO = $('bc_sgO');
    var baseEl = $('bc_base'), baseHEl = $('bc_baseh');
    var dpEl = $('bc_dp'), dpHEl = $('bc_dph');
    var nEl = $('bc_n'), nHEl = $('bc_nh');
    var vEl = $('bc_drift_v'), vhEl = $('bc_drift_vh');
    var cv = $('bc_driftChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(pb, ps) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 176;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 108, r: 66, t: 30, b: 34 };
      var bw = w - pad.l - pad.r;
      var x0 = 0.40, x1 = 1.0;
      var sx = function (p) { return pad.l + (p - x0) / (x1 - x0) * bw; };
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      [0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(function (g) {
        var x = sx(g);
        ctx.strokeStyle = g === 0.5 ? '#c9d0d9' : '#eef1f5';
        ctx.lineWidth = g === 0.5 ? 1.4 : 1;
        ctx.beginPath(); ctx.moveTo(x, pad.t - 6); ctx.lineTo(x, h - pad.b); ctx.stroke();
        ctx.fillStyle = '#7c848f';
        ctx.fillText((g * 100).toFixed(0) + '%', x, h - pad.b + 15);
      });
      var rows = [
        { label: '随机持币基准', p: pb, col: '#8a6d1f' },
        { label: '周期信号胜率', p: ps, col: '#1d4ed8' }
      ];
      rows.forEach(function (r, i) {
        var y = pad.t + 22 + i * 58;
        ctx.fillStyle = '#454c56';
        ctx.textAlign = 'right';
        ctx.font = '12px -apple-system,sans-serif';
        ctx.fillText(r.label, pad.l - 12, y + 17);
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pad.l, y, bw, 24);
        ctx.fillStyle = r.col;
        ctx.fillRect(pad.l, y, Math.max(0, sx(r.p) - pad.l), 24);
        ctx.fillStyle = r.col;
        ctx.textAlign = 'left';
        ctx.font = '700 12.5px -apple-system,sans-serif';
        var lab = (r.p * 100).toFixed(1) + '%';
        var lx = Math.min(sx(r.p) + 7, w - pad.r - ctx.measureText(lab).width - 4);
        ctx.fillText(lab, lx, y + 17);
      });
    }

    function update() {
      var T = parseInt(TEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var pb = ncdf(mu * (T / 252) / (sg * Math.sqrt(T / 252)));
      var dp = ps - pb;
      var n = dp > 0 ? Math.ceil(Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / (dp * dp)) : Infinity;
      txt(TO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(1) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, 'Φ(μ·√T/σ)');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp >= 0.05 ? '#0f8a4d' : dp >= 0 ? '#b8730a' : '#d5342c');
      txt(dpHEl, '信号 − 基准');
      txt(nEl, isFinite(n) ? String(n) : '∞');
      txt(nHEl, 'α=5% · 80% 检验力');
      var vtxt = dp < 0.02 ? '几乎无超额' : dp < 0.05 ? '超额有限' : '超额尚可 · 仍要 n 够';
      txt(vEl, vtxt);
      tint(vEl, dp < 0.02 ? '#d5342c' : dp < 0.05 ? '#b8730a' : '#0f8a4d');
      txt(vhEl, 'BTC μ=50% σ=65% 默认');
      draw(pb, ps);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();
})();
