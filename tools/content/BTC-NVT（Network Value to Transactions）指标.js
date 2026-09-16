/* ============================================================
   《BTC-NVT 指标》主题脚本
   四个可调模型：
     1. 原始 NVT 计算器   — 市值 ÷ 日链上转账额
     2. NVT Signal 仪表盘 — 90 日成交量均线平滑版
     3. 漂移剥离器        — NVT 分位信号 vs 随机持币基准
     4. 阈值漂移衰减器    — 历次周期顶/底 NVTS 与 45/150 阈
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

  function fmtB(v) {
    if (!isFinite(v)) return '—';
    if (v >= 1e12) return '$' + (v / 1e12).toFixed(2) + 'T';
    if (v >= 1e9) return '$' + (v / 1e9).toFixed(1) + 'B';
    return '$' + (v / 1e6).toFixed(0) + 'M';
  }

  /* ══ 工具 1 · 原始 NVT 计算器 ══ */
  (function nvtRaw() {
    var mcapEl = $('nvt_mcap'), volEl = $('nvt_vol');
    if (!mcapEl || !volEl) return;
    var mcapO = $('nvt_mcapO'), volO = $('nvt_volO');
    var nvtEl = $('nvt_ratio'), nvtHEl = $('nvt_ratioh');
    var velEl = $('nvt_vel'), velHEl = $('nvt_velh');
    var vEl = $('nvt_v'), vhEl = $('nvt_vh');
    var cv = $('nvtChart');

    function zone(n) {
      if (n >= 250) return { t: '极端高估', c: '#d5342c', h: '2017 顶约 322——投机溢价主导' };
      if (n >= 150) return { t: '偏高', c: '#d5342c', h: 'NVTS 经典超买区上沿' };
      if (n >= 100) return { t: '本周期常态偏高', c: '#b8730a', h: 'ETF 时代 NVT 常 >100【分析】' };
      if (n >= 45) return { t: '中性', c: '#454c56', h: 'Kalichkin 经典正常带' };
      return { t: '低估区', c: '#0f8a4d', h: '<45 历史上对应积累窗口' };
    }

    function draw(nvt) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxN = 350;
      var sx = function (v) { return pad.l + (v / maxN) * iw; };
      var bands = [
        { lo: 0, hi: 45, col: '#e8f5ee', label: '<45' },
        { lo: 45, hi: 150, col: '#f4f6f9', label: '45–150' },
        { lo: 150, hi: 250, col: '#fff7e6', label: '150–250' },
        { lo: 250, hi: maxN, col: '#fdf3f2', label: '>250' }
      ];
      bands.forEach(function (b) {
        ctx.fillStyle = b.col;
        ctx.fillRect(sx(b.lo), pad.t, sx(b.hi) - sx(b.lo), ih);
      });
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      [45, 150, 250].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref >= 150 ? '#d5342c' : '#c9d0d9';
        ctx.setLineDash(ref >= 150 ? [4, 3] : []);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref), x, y1 + 13);
      });
      var nx = sx(Math.min(nvt, maxN));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(nx, pad.t); ctx.lineTo(nx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(nx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('NVT ' + nvt.toFixed(1), nx, pad.t + ih * 0.5 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('原始 NVT（日频）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var mcap = parseFloat(mcapEl.value) * 1e12;
      var vol = parseFloat(volEl.value) * 1e9;
      if (vol <= 0) return;
      var nvt = mcap / vol;
      var velocity = (vol / mcap) * 365;
      var z = zone(nvt);
      txt(mcapO, fmtB(mcap));
      txt(volO, fmtB(vol));
      txt(nvtEl, nvt.toFixed(1));
      txt(nvtHEl, '市值 ÷ 日链上转账额');
      txt(velEl, velocity.toFixed(2) + '×/年');
      txt(velHEl, '货币速度 ≈ 1/NVT×365');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(nvt);
    }

    mcapEl.addEventListener('input', update);
    volEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · NVT Signal 仪表盘 ══ */
  (function nvtSignal() {
    var mcapEl = $('nvt_s_mcap'), volEl = $('nvt_s_vol'), smoothEl = $('nvt_s_smooth');
    if (!mcapEl || !volEl) return;
    var mcapO = $('nvt_s_mcapO'), volO = $('nvt_s_volO'), smoothO = $('nvt_s_smoothO');
    var nvtsEl = $('nvt_nvts'), nvtsHEl = $('nvt_nvtsh');
    var rawEl = $('nvt_raw_cmp'), rawHEl = $('nvt_raw_cmph');
    var bandEl = $('nvt_s_band'), bandHEl = $('nvt_s_bandh');
    var vEl = $('nvt_s_v'), vhEl = $('nvt_s_vh');
    var cv = $('nvtSignalChart');

    function band(n) {
      if (n >= 150) return { t: '高估区（>150）', c: '#d5342c', b: '≥150' };
      if (n >= 45) return { t: '中性区（45–150）', c: '#454c56', b: '45–150' };
      return { t: '低估区（<45）', c: '#0f8a4d', b: '<45' };
    }

    function draw(nvts) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxN = 350;
      var sx = function (v) { return pad.l + (v / maxN) * iw; };
      ctx.fillStyle = '#e8f5ee';
      ctx.fillRect(sx(0), pad.t, sx(45) - sx(0), ih);
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(sx(45), pad.t, sx(150) - sx(45), ih);
      ctx.fillStyle = '#fdf3f2';
      ctx.fillRect(sx(150), pad.t, sx(maxN) - sx(150), ih);
      [45, 150].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref >= 150 ? '#d5342c' : '#0f8a4d';
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = ref >= 150 ? '#d5342c' : '#0f8a4d';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref), x, y1 + 13);
      });
      var peaks = [
        { n: 322.6, y: 2017 }, { n: 273.1, y: 2021 }, { n: 131.4, y: 2022 },
        { n: 136.0, y: 2024 }
      ];
      peaks.forEach(function (p) {
        var x = sx(p.n), py = pad.t + ih - (p.n / maxN) * ih * 0.75;
        ctx.fillStyle = 'rgba(213,52,44,0.55)';
        ctx.beginPath(); ctx.arc(x, py, 4, 0, Math.PI * 2); ctx.fill();
      });
      var nx = sx(Math.min(nvts, maxN));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(nx, pad.t); ctx.lineTo(nx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('NVTS ' + nvts.toFixed(1), nx, pad.t - 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('NVT Signal（90 日平滑）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var mcap = parseFloat(mcapEl.value) * 1e12;
      var dailyVol = parseFloat(volEl.value) * 1e9;
      var smooth = parseFloat(smoothEl.value);
      if (dailyVol <= 0 || smooth <= 0) return;
      var vol90 = dailyVol * smooth;
      var rawNvt = mcap / dailyVol;
      var nvts = mcap / vol90;
      var b = band(nvts);
      txt(mcapO, fmtB(mcap));
      txt(volO, fmtB(dailyVol));
      txt(smoothO, (smooth * 100).toFixed(0) + '%');
      txt(nvtsEl, nvts.toFixed(1));
      txt(nvtsHEl, '市值 ÷ 90 日量均线');
      txt(rawEl, rawNvt.toFixed(1));
      txt(rawHEl, '原始 NVT 对照');
      txt(bandEl, b.b);
      txt(bandHEl, b.t);
      txt(vEl, b.t);
      tint(vEl, b.c);
      txt(vhEl, '2022 底 131.4 从未触 <45——阈在漂移');
      draw(nvts);
    }

    mcapEl.addEventListener('input', update);
    volEl.addEventListener('input', update);
    smoothEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function nvtDrift() {
    var tEl = $('nvt_T'), psEl = $('nvt_ps'), muEl = $('nvt_mu'), sgEl = $('nvt_sg');
    if (!tEl || !psEl) return;
    var tO = $('nvt_TO'), psO = $('nvt_psO'), muO = $('nvt_muO'), sgO = $('nvt_sgO');
    var baseEl = $('nvt_base'), baseHEl = $('nvt_baseh');
    var dpEl = $('nvt_dp'), dpHEl = $('nvt_dph');
    var nEl = $('nvt_n'), nHEl = $('nvt_nh');
    var vEl = $('nvt_v3'), vhEl = $('nvt_v3h');
    var cv = $('nvtDriftChart');

    function draw(pb, ps, T) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 16, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var pts = [];
      for (var t = 5; t <= 365; t += 5) pts.push({ t: t, p: ncdf(0.5 * (t / 252) / (0.65 * Math.sqrt(t / 252))) });
      var sx = function (v) { return pad.l + (v / 365) * iw; };
      var sy = function (p) { return pad.t + (1 - p) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#7c848f';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      pts.forEach(function (p, i) {
        var x = sx(p.t), y = sy(p.p);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var tx = sx(T);
      ctx.strokeStyle = '#1d4ed8';
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(tx, pad.t); ctx.lineTo(tx, y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.fillRect(sx(T) - 18, sy(pb) - 4, 36, 8);
      ctx.fillStyle = ps >= pb ? '#d5342c' : '#0f8a4d';
      ctx.fillRect(sx(T) - 18, sy(ps) - 4, 36, 8);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('基准', sx(T), sy(pb) - 8);
      ctx.fillStyle = ps >= pb ? '#d5342c' : '#0f8a4d';
      ctx.fillText('信号', sx(T), sy(ps) + 16);
    }

    function update() {
      var T = parseInt(tEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var pb = ncdf(mu * (T / 252) / (sg * Math.sqrt(T / 252)));
      var dp = ps - pb;
      var n = Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / Math.pow(ps - pb, 2);
      txt(tO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(1) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, '随机持币基准');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp >= 3 ? '#d5342c' : dp >= 1 ? '#b8730a' : dp < 0 ? '#0f8a4d' : '#7c848f');
      txt(dpHEl, '信号胜率 − 基准');
      txt(nEl, isFinite(n) && n > 0 ? String(Math.ceil(n)) : '∞');
      txt(nHEl, '80% 功效所需样本');
      var verdict = dp < 0 ? '跑输基准' : dp < 3 ? '超额有限' : '超额可观';
      txt(vEl, verdict);
      tint(vEl, dp < 0 ? '#0f8a4d' : dp < 3 ? '#b8730a' : '#d5342c');
      txt(vhEl, '高 NVT 分位 90 日胜率仅 40%');
      draw(pb, ps, T);
    }

    tEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 阈值漂移衰减器 ══ */
  (function nvtPeak() {
    var eraEl = $('nvt_era');
    if (!eraEl) return;
    var eraO = $('nvt_eraO');
    var peakEl = $('nvt_peak_nvts'), peakHEl = $('nvt_peak_nvtsh');
    var thrEl = $('nvt_peak_thr'), thrHEl = $('nvt_peak_thrh');
    var vEl = $('nvt_peak_v'), vhEl = $('nvt_peak_vh');
    var cv = $('nvtPeakChart');

    var cycles = [
      { y: 2017, nvts: 322.6, type: '顶', thr: 150 },
      { y: 2018, nvts: 50.0, type: '底', thr: 45 },
      { y: 2021, nvts: 273.1, type: '顶', thr: 150 },
      { y: 2022, nvts: 131.4, type: '底', thr: 45 },
      { y: 2026, nvts: 224.1, type: '现', thr: 150 }
    ];

    function draw(idx) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxN = 350;
      var bw = iw / cycles.length * 0.55;
      var gap = iw / cycles.length;
      cycles.forEach(function (c, i) {
        var x = pad.l + gap * i + gap * 0.22;
        var bh = (c.nvts / maxN) * ih;
        var col = c.type === '顶' ? 'rgba(213,52,44,0.65)' : c.type === '底' ? 'rgba(15,138,77,0.65)' : '#1d4ed8';
        ctx.fillStyle = i === idx ? '#1d4ed8' : col;
        ctx.fillRect(x, y1 - bh, bw, bh);
        ctx.fillStyle = '#15181d';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.nvts.toFixed(0), x + bw / 2, y1 - bh - 4);
        ctx.fillStyle = '#7c848f';
        ctx.fillText(String(c.y), x + bw / 2, y1 + 13);
      });
      var thrY = y1 - (cycles[idx].thr / maxN) * ih;
      ctx.strokeStyle = cycles[idx].type === '底' ? '#0f8a4d' : '#d5342c';
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, thrY); ctx.lineTo(w - pad.r, thrY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = cycles[idx].type === '底' ? '#0f8a4d' : '#d5342c';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('阈 ' + cycles[idx].thr, pad.l + 4, thrY - 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('NVT Signal 周期读数', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var idx = parseInt(eraEl.value, 10);
      var c = cycles[idx];
      txt(eraO, c.y + ' · ' + c.type);
      txt(peakEl, c.nvts.toFixed(1));
      txt(peakHEl, c.type + ' 读数');
      txt(thrEl, String(c.thr));
      txt(thrHEl, c.type === '底' ? '低估阈 45' : '高估阈 150');
      var msg = c.type === '底' && c.nvts > 45 ? '阈已漂移——未触 <45' : c.type === '顶' ? '顶读数逐轮递减' : '当前偏高区';
      txt(vEl, msg);
      tint(vEl, c.type === '底' && c.nvts > 45 ? '#b8730a' : '#454c56');
      txt(vhEl, '2022 底 131.4 是阈失效最清晰案例');
      draw(idx);
    }

    eraEl.addEventListener('input', update);
    update();
  })();
})();
