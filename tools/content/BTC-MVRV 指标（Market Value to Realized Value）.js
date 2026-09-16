/* ============================================================
   《BTC-MVRV 指标》主题脚本
   四个可调模型：
     1. MVRV 比值计算器   — 市值 / 已实现市值 → 未实现盈亏
     2. MVRV Z-Score 仪表盘 — 标准化偏离与区间判定
     3. 漂移剥离器        — MVRV 信号胜率 vs 随机持币基准
     4. 周期峰值衰减器    — 历次 Z-Score 顶与阈值漂移
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

  function fmtT(v) {
    if (!isFinite(v)) return '—';
    return '$' + (v >= 1 ? v.toFixed(2) : v.toFixed(3)) + 'T';
  }

  /* ══ 工具 1 · MVRV 比值计算器 ══ */
  (function mvrvRatio() {
    var mcapEl = $('mvrv_mcap'), rcapEl = $('mvrv_rcap');
    if (!mcapEl || !rcapEl) return;
    var mcapO = $('mvrv_mcapO'), rcapO = $('mvrv_rcapO');
    var ratioEl = $('mvrv_ratio'), ratioHEl = $('mvrv_ratioh');
    var profitEl = $('mvrv_profit'), profitHEl = $('mvrv_profith');
    var rpxEl = $('mvrv_realized_px'), rpxHEl = $('mvrv_realized_pxh');
    var vEl = $('mvrv_v'), vhEl = $('mvrv_vh');
    var cv = $('mvrvChart');
    var SUPPLY = 19.8;

    function zone(m) {
      if (m >= 3.5) return { t: '历史过热区', c: '#d5342c', h: '≥3.5 为 2010s 顶区参考，ETF 时代常未触达' };
      if (m >= 2.5) return { t: '偏热', c: '#d5342c', h: '2025 峰约 2.52——已低于旧顶阈值' };
      if (m >= 1.5) return { t: '温和盈利', c: '#b8730a', h: '平均持有者约 +50% 未实现盈利' };
      if (m >= 1.0) return { t: '盈亏平衡上方', c: '#454c56', h: '网络整体仍盈利，抛压温和' };
      return { t: ' capitulation 区', c: '#0f8a4d', h: '<1 历史上常对应熊市底，但可横盘数月' };
    }

    function draw(mvrv) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxM = 4.2;
      var sx = function (v) { return pad.l + (v / maxM) * iw; };
      var bands = [
        { lo: 0, hi: 1, col: '#e8f5ee', label: '<1' },
        { lo: 1, hi: 2, col: '#f4f6f9', label: '1–2' },
        { lo: 2, hi: 3.5, col: '#fff7e6', label: '2–3.5' },
        { lo: 3.5, hi: maxM, col: '#fdf3f2', label: '>3.5' }
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
      [1, 2, 3.5].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref >= 3.5 ? '#d5342c' : '#c9d0d9';
        ctx.setLineDash(ref >= 3.5 ? [4, 3] : []);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref), x, y1 + 13);
      });
      var mx = sx(Math.min(mvrv, maxM));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(mx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MVRV ' + mvrv.toFixed(2), mx, pad.t + ih * 0.5 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MVRV 比值', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var mcap = parseFloat(mcapEl.value);
      var rcap = parseFloat(rcapEl.value);
      if (rcap <= 0) return;
      var mvrv = mcap / rcap;
      var profit = (mvrv - 1) * 100;
      var rpx = (rcap * 1e12) / (SUPPLY * 1e6);
      var z = zone(mvrv);
      txt(mcapO, fmtT(mcap));
      txt(rcapO, fmtT(rcap));
      txt(ratioEl, mvrv.toFixed(2));
      txt(ratioHEl, '市值 ÷ 已实现市值');
      txt(profitEl, (profit >= 0 ? '+' : '') + profit.toFixed(1) + '%');
      tint(profitEl, profit >= 0 ? '#d5342c' : '#0f8a4d');
      txt(profitHEl, '网络未实现盈亏');
      txt(rpxEl, '$' + Math.round(rpx).toLocaleString('en-US'));
      txt(rpxHEl, '已实现价格 ≈ RV÷供应');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(mvrv);
    }

    mcapEl.addEventListener('input', update);
    rcapEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · MVRV Z-Score 仪表盘 ══ */
  (function mvrvZ() {
    var mvrvEl = $('mvrv_z_mvrv'), meanEl = $('mvrv_z_mean'), stdEl = $('mvrv_z_std');
    if (!mvrvEl || !meanEl || !stdEl) return;
    var mvrvO = $('mvrv_z_mvrvO'), meanO = $('mvrv_z_meanO'), stdO = $('mvrv_z_stdO');
    var zEl = $('mvrv_z_z'), zHEl = $('mvrv_z_zh');
    var bandEl = $('mvrv_z_band'), bandHEl = $('mvrv_z_bandh');
    var vEl = $('mvrv_z_v'), vhEl = $('mvrv_z_vh');
    var cv = $('mvrvZChart');

    function zBand(z) {
      if (z >= 7) return { t: '极端高估（2010s 顶区）', c: '#d5342c', b: '≥+7σ' };
      if (z >= 3) return { t: '偏热', c: '#d5342c', b: '+3σ ~ +7σ' };
      if (z >= 1) return { t: '高于均值', c: '#b8730a', b: '+1σ ~ +3σ' };
      if (z >= 0) return { t: '均值附近', c: '#454c56', b: '0 ~ +1σ' };
      if (z >= -0.5) return { t: '偏低估', c: '#0f8a4d', b: '−0.5σ ~ 0' };
      return { t: '深度价值区', c: '#0f8a4d', b: '< −0.5σ' };
    }

    function draw(z) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minZ = -2, maxZ = 11;
      var sx = function (v) { return pad.l + ((v - minZ) / (maxZ - minZ)) * iw; };
      var refs = [
        { z: -0.5, col: '#0f8a4d', lab: '底区' },
        { z: 0, col: '#7c848f', lab: '0' },
        { z: 1, col: '#b8730a', lab: '+1' },
        { z: 3, col: '#d5342c', lab: '+3' },
        { z: 7, col: '#d5342c', lab: '+7' }
      ];
      ctx.fillStyle = '#e8f5ee';
      ctx.fillRect(sx(minZ), pad.t, sx(0) - sx(minZ), ih);
      ctx.fillStyle = '#fdf3f2';
      ctx.fillRect(sx(3), pad.t, sx(maxZ) - sx(3), ih);
      refs.forEach(function (r) {
        var x = sx(r.z);
        ctx.strokeStyle = r.col;
        ctx.setLineDash(r.z === 7 ? [4, 3] : []);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = r.col;
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(r.lab, x, y1 + 13);
      });
      var peaks = [
        { z: 8.68, y: 2013 }, { z: 7.98, y: 2013 }, { z: 10.4, y: 2017 },
        { z: 6.9, y: 2021 }, { z: 3.54, y: 2021 }, { z: 2.97, y: 2024 }
      ];
      peaks.forEach(function (p) {
        var x = sx(p.z), y = pad.t + ih - ((p.z - minZ) / (maxZ - minZ)) * ih * 0.7;
        ctx.fillStyle = 'rgba(213,52,44,0.55)';
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      });
      var zx = sx(Math.max(minZ, Math.min(maxZ, z)));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(zx, pad.t); ctx.lineTo(zx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Z=' + z.toFixed(2), zx, pad.t - 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('Z-Score（标准差）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var mvrv = parseFloat(mvrvEl.value);
      var mean = parseFloat(meanEl.value);
      var std = parseFloat(stdEl.value);
      if (std <= 0) return;
      var z = (mvrv - mean) / std;
      var b = zBand(z);
      txt(mvrvO, mvrv.toFixed(2));
      txt(meanO, mean.toFixed(2));
      txt(stdO, std.toFixed(2));
      txt(zEl, (z >= 0 ? '+' : '') + z.toFixed(2) + 'σ');
      tint(zEl, z >= 3 ? '#d5342c' : z <= 0 ? '#0f8a4d' : '#454c56');
      txt(zHEl, '(MVRV−均值)÷标准差');
      txt(bandEl, b.b);
      txt(bandHEl, b.t);
      txt(vEl, b.t);
      tint(vEl, b.c);
      txt(vhEl, '峰值 Z 逐周期衰减——勿死守 +7');
      draw(z);
    }

    mvrvEl.addEventListener('input', update);
    meanEl.addEventListener('input', update);
    stdEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function mvrvDrift() {
    var tEl = $('mvrv_T'), psEl = $('mvrv_ps'), muEl = $('mvrv_mu'), sgEl = $('mvrv_sg');
    if (!tEl || !psEl) return;
    var tO = $('mvrv_TO'), psO = $('mvrv_psO'), muO = $('mvrv_muO'), sgO = $('mvrv_sgO');
    var baseEl = $('mvrv_base'), baseHEl = $('mvrv_baseh');
    var dpEl = $('mvrv_dp'), dpHEl = $('mvrv_dph');
    var nEl = $('mvrv_n'), nHEl = $('mvrv_nh');
    var vEl = $('mvrv_v3'), vhEl = $('mvrv_v3h');
    var cv = $('mvrvDriftChart');

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
      ctx.fillStyle = '#d5342c';
      ctx.fillRect(sx(T) - 18, sy(ps) - 4, 36, 8);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('基准', sx(T), sy(pb) - 8);
      ctx.fillStyle = '#d5342c';
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
      tint(dpEl, dp >= 3 ? '#d5342c' : dp >= 1 ? '#b8730a' : '#7c848f');
      txt(dpHEl, '信号胜率 − 基准');
      txt(nEl, isFinite(n) ? String(Math.ceil(n)) : '∞');
      txt(nHEl, '80% 功效所需样本');
      var verdict = dp < 1 ? '超额微弱' : dp < 3 ? '超额有限' : '超额可观';
      txt(vEl, verdict);
      tint(vEl, dp < 1 ? '#7c848f' : dp < 3 ? '#b8730a' : '#d5342c');
      txt(vhEl, 'MVRV<1 买入≠免费 alpha');
      draw(pb, ps, T);
    }

    tEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 周期峰值衰减器 ══ */
  (function mvrvPeak() {
    var eraEl = $('mvrv_era');
    if (!eraEl) return;
    var eraO = $('mvrv_eraO');
    var peakEl = $('mvrv_peak_z'), peakHEl = $('mvrv_peak_zh');
    var thrEl = $('mvrv_peak_thr'), thrHEl = $('mvrv_peak_thrh');
    var vEl = $('mvrv_peak_v'), vhEl = $('mvrv_peak_vh');
    var cv = $('mvrvPeakChart');

    var cycles = [
      { y: 2013, mvrv: 5.8, z: 8.68, thr: 3.5 },
      { y: 2017, mvrv: 4.7, z: 10.4, thr: 3.5 },
      { y: 2021, mvrv: 3.7, z: 6.9, thr: 3.5 },
      { y: 2024, mvrv: 2.52, z: 2.97, thr: 2.5 },
      { y: 2026, mvrv: 1.5, z: 1.0, thr: 2.5 }
    ];

    function draw(idx) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxZ = 11;
      var bw = iw / cycles.length * 0.55;
      var gap = iw / cycles.length;
      cycles.forEach(function (c, i) {
        var x = pad.l + gap * i + gap * 0.22;
        var bh = (c.z / maxZ) * ih;
        ctx.fillStyle = i === idx ? '#1d4ed8' : 'rgba(213,52,44,0.65)';
        ctx.fillRect(x, y1 - bh, bw, bh);
        ctx.fillStyle = '#15181d';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.z.toFixed(1), x + bw / 2, y1 - bh - 4);
        ctx.fillStyle = '#7c848f';
        ctx.fillText(String(c.y), x + bw / 2, y1 + 13);
      });
      var thrY = y1 - (cycles[idx].thr / maxZ) * ih * (maxZ / 3.5);
      ctx.strokeStyle = '#b8730a';
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, thrY); ctx.lineTo(w - pad.r, thrY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#b8730a';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('阈值 ' + cycles[idx].thr, pad.l + 4, thrY - 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('周期顶 Z-Score', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var idx = parseInt(eraEl.value, 10);
      var c = cycles[idx];
      txt(eraO, c.y + ' 周期');
      txt(peakEl, '+' + c.z.toFixed(2) + 'σ');
      txt(peakHEl, 'MVRV 峰 ' + c.mvrv.toFixed(2));
      txt(thrEl, String(c.thr));
      txt(thrHEl, idx >= 3 ? 'ETF 时代重校准' : '传统 3.5 顶阈');
      txt(vEl, idx >= 3 ? '阈值需下移' : '旧阈仍适用');
      tint(vEl, idx >= 3 ? '#b8730a' : '#454c56');
      txt(vhEl, '+7 自 2017 后再未触发');
      draw(idx);
    }

    eraEl.addEventListener('input', update);
    update();
  })();
})();
