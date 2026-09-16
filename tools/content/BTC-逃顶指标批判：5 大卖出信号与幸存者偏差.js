/* ============================================================
   《BTC-逃顶指标批判》主题脚本
   四个可调模型：
     1. 五大信号阈值衰减器 — 历次周期顶值 vs 固定阈
     2. 幸存者偏差探测器 — 多指标试错 → 假阳性概率
     3. 漂移剥离器 — 逃顶信号胜率 vs 随机持币基准
     4. 样本量门槛计算器 — 证明超额所需 n
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

  function EmaxZ(K) {
    if (K < 2) return 0;
    var a = Math.sqrt(2 * Math.log(K));
    var b = (Math.log(Math.log(K)) + Math.log(4 * Math.PI)) / (2 * a);
    return a - b;
  }

  var SIGNALS = [
    { name: 'Pi Cycle', key: 'pi', peaks: [1, 1, 1, 0, 0, 0], thr: 1, unit: '交叉', desc: '111d MA 上穿 2×350d MA' },
    { name: 'MVRV Z', key: 'z', peaks: [10.4, 7.98, 6.9, 3.54, 2.97, 2.69], thr: 7, unit: 'σ', desc: '固定阈 +7σ' },
    { name: 'Mayer', key: 'mm', peaks: [5.8, 2.8, 2.4, 2.1, 1.8], thr: 2.4, unit: '×', desc: '价格 ÷ 200d MA' },
    { name: '彩虹带', key: 'rb', peaks: [9, 9, 8, 6, 5], thr: 8, unit: '带', desc: '第 8–9 带（泡沫区）' },
    { name: '恐贪指数', key: 'fg', peaks: [95, 94, 84, 78, 72], thr: 90, unit: '分', desc: '≥90 极度贪婪' }
  ];
  var ERA_LABELS = ['2013', '2017', '2021-02', '2021-11', '2024', '2025'];

  /* ══ 工具 1 · 五大信号阈值衰减器 ══ */
  (function decayTool() {
    var sigEl = $('top_sig'), eraEl = $('top_era');
    if (!sigEl || !eraEl) return;
    var sigO = $('top_sigO'), eraO = $('top_eraO');
    var peakEl = $('top_peak'), peakHEl = $('top_peakh');
    var thrEl = $('top_thr'), thrHEl = $('top_thrh');
    var gapEl = $('top_gap'), gapHEl = $('top_gaph');
    var vEl = $('top_v'), vhEl = $('top_vh');
    var cv = $('topDecayChart');

    function draw(sig, era, peak, thr) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 24, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var peaks = sig.peaks.filter(function (p) { return p !== null; });
      var maxV = Math.max(sig.thr * 1.15, Math.max.apply(null, peaks) * 1.1, 1);
      var sx = function (i) { return pad.l + (i / (peaks.length - 1)) * iw; };
      var sy = function (v) { return pad.t + ih - (v / maxV) * ih; };

      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }

      var thrY = sy(sig.thr);
      ctx.strokeStyle = '#d5342c';
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, thrY); ctx.lineTo(w - pad.r, thrY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#d5342c';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('旧阈 ' + sig.thr + sig.unit, w - pad.r, thrY - 5);

      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      peaks.forEach(function (p, i) {
        var x = sx(i), y = sy(p);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      peaks.forEach(function (p, i) {
        var x = sx(i), y = sy(p);
        var hit = p >= sig.thr;
        ctx.fillStyle = hit ? '#d5342c' : '#b8730a';
        ctx.beginPath(); ctx.arc(x, y, i === era ? 7 : 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ERA_LABELS[i] || '', x, y1 + 13);
      });

      var ex = sx(era), ey = sy(peak);
      ctx.strokeStyle = '#15181d';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 2]);
      ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex, y1); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(sig.name + ' 周期峰值 vs 固定阈值', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var si = parseInt(sigEl.value, 10);
      var ei = parseInt(eraEl.value, 10);
      var sig = SIGNALS[si];
      var peaks = sig.peaks.filter(function (p) { return p !== null; });
      var peak = peaks[ei];
      var gap = peak - sig.thr;
      var hit = peak >= sig.thr;
      txt(sigO, sig.name);
      txt(eraO, ERA_LABELS[ei] || '');
      txt(peakEl, peak + sig.unit);
      txt(peakHEl, sig.desc);
      txt(thrEl, sig.thr + sig.unit);
      txt(thrHEl, hit ? '本周期触发' : '本周期未触发');
      tint(thrEl, hit ? '#d5342c' : '#0f8a4d');
      txt(gapEl, (gap >= 0 ? '+' : '') + gap.toFixed(1) + sig.unit);
      tint(gapEl, gap >= 0 ? '#d5342c' : '#0f8a4d');
      txt(gapHEl, '峰值 − 旧阈');
      if (hit) {
        txt(vEl, '阈值仍被触及');
        tint(vEl, '#d5342c');
        txt(vhEl, '但峰值趋势递减——下轮可能 miss');
      } else {
        txt(vEl, '固定阈已失效');
        tint(vEl, '#d5342c');
        txt(vhEl, '2025 峰未触发——幸存者叙事破裂');
      }
      draw(sig, ei, peak, sig.thr);
    }

    sigEl.addEventListener('input', update);
    eraEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 幸存者偏差探测器 ══ */
  (function survTool() {
    var kEl = $('top_k'), tEl = $('top_t');
    if (!kEl || !tEl) return;
    var kO = $('top_kO'), tO = $('top_tO');
    var emaxEl = $('top_emax'), emaxHEl = $('top_emaxh');
    var pfpEl = $('top_pfp'), pfpHEl = $('top_pfph');
    var vEl = $('top_surv_v'), vhEl = $('top_surv_vh');
    var cv = $('topSurvChart');

    function draw(K, emax) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxK = 200;
      var sx = function (v) { return pad.l + (v / maxK) * iw; };
      var sy = function (v) { return pad.t + ih - (v / 5) * ih; };

      ctx.fillStyle = '#fdf3f2';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }

      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var k = 2; k <= maxK; k += 2) {
        var x = sx(k), y = sy(EmaxZ(k));
        if (k === 2) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      var kx = sx(K), ey = sy(emax);
      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(kx, pad.t); ctx.lineTo(kx, ey); ctx.stroke();
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(kx, ey, 6, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('K', kx, y1 + 13);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#15181d';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('试错指标数 K → 偶然最优 E[max Z]', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var K = parseInt(kEl.value, 10);
      var T = parseInt(tEl.value, 10);
      var emax = EmaxZ(K);
      var pfp = 1 - Math.pow(0.5, T);
      txt(kO, String(K));
      txt(tO, T + ' 周期');
      txt(emaxEl, emax.toFixed(2) + 'σ');
      txt(emaxHEl, 'K=' + K + ' 时偶然「最优」Z 期望');
      txt(pfpEl, (pfp * 100).toFixed(1) + '%');
      txt(pfpHEl, '至少 1 次「命中」的概率（独立 50%）');
      if (K >= 50) {
        txt(vEl, '高度可疑');
        tint(vEl, '#d5342c');
        txt(vhEl, '从 ' + K + ' 个指标里挑「从未失手」≈ 数据挖掘');
      } else if (K >= 20) {
        txt(vEl, '需谨慎');
        tint(vEl, '#b8730a');
        txt(vhEl, 'E[maxZ]=' + emax.toFixed(2) + '——偶然也能很好看');
      } else {
        txt(vEl, '样本偏少');
        tint(vEl, '#454c56');
        txt(vhEl, '但 n=' + T + ' 周期仍不足以证伪');
      }
      draw(K, emax);
    }

    kEl.addEventListener('input', update);
    tEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function driftTool() {
    var tEl = $('top_dT'), psEl = $('top_dps'), muEl = $('top_dmu'), sgEl = $('top_dsg');
    if (!tEl || !psEl) return;
    var tO = $('top_dTO'), psO = $('top_dpsO'), muO = $('top_dmuO'), sgO = $('top_dsgO');
    var baseEl = $('top_dbase'), baseHEl = $('top_dbaseh');
    var dpEl = $('top_ddp'), dpHEl = $('top_ddph');
    var vEl = $('top_dv'), vhEl = $('top_dvh');
    var cv = $('topDriftChart');

    function pBase(mu, sig, T) {
      var x = (mu / 100) * (T / 252) / ((sig / 100) * Math.sqrt(T / 252));
      return ncdf(x);
    }

    function draw(T, pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 16, t: 18, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var bw = iw * 0.35;
      var gap = iw * 0.15;
      var x1 = pad.l, x2 = pad.l + bw + gap;
      var maxH = 0.95;

      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(x1, pad.t, bw, ih);
      ctx.fillStyle = '#eaf0ff';
      ctx.fillRect(x2, pad.t, bw, ih);

      var h1 = (pb / maxH) * ih, h2 = (ps / maxH) * ih;
      ctx.fillStyle = '#7c848f';
      ctx.fillRect(x1 + bw * 0.15, pad.t + ih - h1, bw * 0.7, h1);
      ctx.fillStyle = ps > pb ? '#d5342c' : '#0f8a4d';
      ctx.fillRect(x2 + bw * 0.15, pad.t + ih - h2, bw * 0.7, h2);

      ctx.fillStyle = '#454c56';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((pb * 100).toFixed(1) + '%', x1 + bw / 2, pad.t + ih - h1 - 6);
      ctx.fillText((ps * 100).toFixed(1) + '%', x2 + bw / 2, pad.t + ih - h2 - 6);
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillStyle = '#7c848f';
      ctx.fillText('随机持币', x1 + bw / 2, y1 + 12);
      ctx.fillText('逃顶信号', x2 + bw / 2, y1 + 12);
    }

    function update() {
      var T = parseFloat(tEl.value);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value);
      var sg = parseFloat(sgEl.value);
      var pb = pBase(mu, sg, T);
      var dp = (ps - pb) * 100;
      txt(tO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, mu.toFixed(0) + '%');
      txt(sgO, sg + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, 'μ=' + mu + '% σ=' + sg + '%');
      txt(dpEl, (dp >= 0 ? '+' : '') + dp.toFixed(1) + ' pp');
      tint(dpEl, dp >= 0.03 ? '#d5342c' : dp >= 0 ? '#b8730a' : '#0f8a4d');
      txt(dpHEl, '信号胜率 − 基准');
      if (dp < 3) {
        txt(vEl, '超额微弱');
        tint(vEl, '#b8730a');
        txt(vhEl, '表面胜率多半来自 BTC 正漂移');
      } else if (dp < 8) {
        txt(vEl, '有一定超额');
        tint(vEl, '#d5342c');
        txt(vhEl, '但仍需大样本验证（见工具 4）');
      } else {
        txt(vEl, '超额显著');
        tint(vEl, '#d5342c');
        txt(vhEl, '问：是否过拟合/幸存者筛选？');
      }
      draw(T, pb, ps);
    }

    tEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 样本量门槛计算器 ══ */
  (function sampleTool() {
    var pbEl = $('top_pb'), psEl = $('top_ps2'), alphaEl = $('top_alpha');
    if (!pbEl || !psEl) return;
    var pbO = $('top_pbO'), psO2 = $('top_ps2O'), alphaO = $('top_alphaO');
    var nEl = $('top_n'), nHEl = $('top_nh');
    var vEl = $('top_nv'), vhEl = $('top_nvh');
    var cv = $('topSampleChart');

    function sampleN(pb, ps) {
      var z196 = 1.96, z84 = 0.84;
      var diff = ps - pb;
      if (diff <= 0) return Infinity;
      var num = z196 * Math.sqrt(pb * (1 - pb)) + z84 * Math.sqrt(ps * (1 - ps));
      return Math.ceil(num * num / (diff * diff));
    }

    function draw(n, cycles) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 18, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var maxN = Math.min(500, Math.max(n, 100));
      var sx = function (v) { return pad.l + (v / maxN) * iw; };

      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      var nx = sx(Math.min(n, maxN));
      ctx.fillStyle = n <= cycles ? '#e8f5ee' : '#fdf3f2';
      ctx.fillRect(pad.l, pad.t, nx - pad.l, ih);
      ctx.fillStyle = n <= cycles ? '#0f8a4d' : '#d5342c';
      ctx.fillRect(nx - 2, pad.t, 4, ih);

      var cx = sx(cycles);
      ctx.strokeStyle = '#1d4ed8';
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(cx, pad.t); ctx.lineTo(cx, y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#1d4ed8';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('BTC ~' + cycles + ' 周期', cx, y1 + 12);

      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('所需样本 n=' + (isFinite(n) ? n : '∞'), pad.l + iw / 2, pad.t - 4);
    }

    function update() {
      var pb = parseFloat(pbEl.value) / 100;
      var ps = parseFloat(psEl.value) / 100;
      var alpha = parseFloat(alphaEl.value) / 100;
      var n = sampleN(pb, ps);
      var cycles = 4;
      txt(pbO, (pb * 100).toFixed(1) + '%');
      txt(psO2, (ps * 100).toFixed(1) + '%');
      txt(alphaO, (alpha * 100).toFixed(0) + '%');
      if (!isFinite(n)) {
        txt(nEl, '∞');
        txt(nHEl, '信号未优于基准');
        txt(vEl, '无统计意义');
        tint(vEl, '#0f8a4d');
        txt(vhEl, '逃顶信号跑输随机卖出');
      } else {
        txt(nEl, String(n));
        txt(nHEl, 'α=' + (alpha * 100) + '% 功效下证明超额');
        if (n > 50) {
          txt(vEl, '样本严重不足');
          tint(vEl, '#d5342c');
          txt(vhEl, 'BTC 仅 ~4 完整周期，n 需 ' + n);
        } else if (n > cycles) {
          txt(vEl, '周期不够');
          tint(vEl, '#d5342c');
          txt(vhEl, '需要 ' + n + ' 次，历史只有 ~' + cycles);
        } else {
          txt(vEl, '勉强可检');
          tint(vEl, '#b8730a');
          txt(vhEl, '但仍有过拟合风险');
        }
      }
      draw(isFinite(n) ? n : 500, cycles);
    }

    pbEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    alphaEl.addEventListener('input', update);
    update();
  })();

})();
