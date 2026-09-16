/* ============================================================
   《BTC-终极对决：四年周期理论 vs. 幂律通道下轨》主题脚本
   四个可调模型：
     1. 对决仪表盘    — 峰后天数 + 现货 + σ → floor/fair/回撤/底窗
     2. 漂移剥离器    — 策略胜率 vs 随机持币基准
     3. 回撤深度仪    — 回撤% vs 历史底深度 vs floor 距离
     4. 底窗裁决器    — 周期分 vs 幂律分启发式评分
   默认参数：t=6466, β=5.688, logA=-16.493, peak=$126.3K, floor σ=0.20
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  var GENESIS_MS = Date.UTC(2009, 0, 3);
  var PEAK_DATE = Date.UTC(2025, 9, 6);
  var ASOF_MS = Date.UTC(2026, 8, 17);
  var DEFAULT_BETA = 5.688;
  var DEFAULT_LOGA = -16.493;
  var DEFAULT_PEAK = 126.3;
  var DEFAULT_SIGMA = 0.20;
  var HIST_DD = -81;

  function daysSinceGenesis(ms) {
    return Math.round((ms - GENESIS_MS) / 86400000);
  }

  function fairPrice(days, beta, logA) {
    if (days <= 0) return 0;
    return Math.pow(10, logA + beta * Math.log10(days));
  }

  function floorPrice(days, sigma, beta, logA) {
    return fairPrice(days, beta, logA) * Math.pow(10, -2 * sigma);
  }

  function fmtK(v) {
    if (!isFinite(v)) return '—';
    return '$' + v.toFixed(1) + 'K';
  }

  function fmtPct(v, digits) {
    return (v >= 0 ? '+' : '') + v.toFixed(digits || 1) + '%';
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

  function addMonths(d, m) {
    var r = new Date(d);
    r.setUTCMonth(r.getUTCMonth() + m);
    return r.getUTCFullYear() + '-' + String(r.getUTCMonth() + 1).padStart(2, '0');
  }

  /* ══ 工具 1 · 对决仪表盘 ══ */
  (function dashModel() {
    var dspEl = $('vs_dsp'), spotEl = $('vs_spot'), sigmaEl = $('vs_sigma');
    if (!dspEl || !spotEl || !sigmaEl) return;
    var dspO = $('vs_dspO'), spotO = $('vs_spotO'), sigmaO = $('vs_sigmaO');
    var cycleEl = $('vs_cycle'), cycleHEl = $('vs_cycleh');
    var ffEl = $('vs_ff'), ffHEl = $('vs_ffh');
    var ddEl = $('vs_dd'), ddHEl = $('vs_ddh');
    var vEl = $('vs_v'), vhEl = $('vs_vh');
    var cv = $('vsDashChart');

    function draw(dsp, spotK, sigma, floorK, fairK, dd) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 58, r: 18, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minP = floorK * 0.85, maxP = fairK * 1.05;
      var sy = function (p) {
        return pad.t + (1 - (Math.log10(p) - Math.log10(minP)) / (Math.log10(maxP) - Math.log10(minP))) * ih;
      };
      var levels = [
        { p: floorK, col: '#0f8a4d', lab: 'floor' },
        { p: spotK, col: '#d5342c', lab: 'spot' },
        { p: fairK, col: '#1d4ed8', lab: 'fair' },
        { p: DEFAULT_PEAK, col: '#b8730a', lab: 'peak' }
      ];
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      levels.forEach(function (lv) {
        var y = sy(lv.p);
        ctx.strokeStyle = lv.col;
        ctx.lineWidth = lv.lab === 'spot' ? 2.2 : 1.2;
        ctx.setLineDash(lv.lab === 'peak' ? [5, 4] : []);
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = lv.col;
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(lv.lab + ' $' + lv.p.toFixed(0) + 'K', pad.l + 4, y - 4);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('峰后 ' + dsp + ' 天 · 回撤 ' + fmtPct(dd), pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var dsp = +dspEl.value;
      var spotK = +spotEl.value;
      var sigma = +sigmaEl.value;
      var days = daysSinceGenesis(ASOF_MS);
      var fairK = fairPrice(days, DEFAULT_BETA, DEFAULT_LOGA) / 1000;
      var floorK = floorPrice(days, sigma, DEFAULT_BETA, DEFAULT_LOGA) / 1000;
      var dd = (spotK / DEFAULT_PEAK - 1) * 100;
      var floorGap = (spotK / floorK - 1) * 100;
      var winStart = addMonths(new Date(PEAK_DATE), 12);
      var winEnd = addMonths(new Date(PEAK_DATE), 17);
      txt(dspO, dsp + ' 天');
      txt(spotO, fmtK(spotK));
      txt(sigmaO, sigma.toFixed(2));
      txt(cycleEl, winStart + ' ~ ' + winEnd);
      txt(ffEl, fmtK(floorK) + ' / ' + fmtK(fairK));
      txt(ddEl, fmtPct(dd));
      if (dsp >= 300 && dsp <= 430) {
        txt(cycleHEl, '历史底窗核心带');
        tint(cycleHEl, '#0f8a4d');
      } else if (dsp < 300) {
        txt(cycleHEl, '底窗未到');
        tint(cycleHEl, '#7c848f');
      } else {
        txt(cycleHEl, '超出历史底窗');
        tint(cycleHEl, '#b8730a');
      }
      if (floorGap < 15) {
        txt(ffHEl, '逼近 floor');
        tint(ffHEl, '#d5342c');
      } else if (floorGap < 40) {
        txt(ffHEl, '中等距离');
        tint(ffHEl, '#b8730a');
      } else {
        txt(ffHEl, '远高于 floor');
        tint(ffHEl, '#0f8a4d');
      }
      if (dd > -35) {
        txt(ddHEl, '浅回撤');
        tint(ddHEl, '#b8730a');
      } else if (dd > -55) {
        txt(ddHEl, '中等回撤');
        tint(ddHEl, '#454c56');
      } else {
        txt(ddHEl, '深回撤');
        tint(ddHEl, '#d5342c');
      }
      if (dsp >= 300 && dsp <= 430 && dd > -45 && floorGap > 30) {
        txt(vEl, '折中浅底情景');
        txt(vhEl, '时间窗命中 · 深度偏浅 · floor 悬空');
        tint(vEl, '#b8730a');
      } else if (floorGap < 20) {
        txt(vEl, '幂律地板测试');
        txt(vhEl, '接近历史 capitulation 区');
        tint(vEl, '#d5342c');
      } else {
        txt(vEl, '对决进行中');
        txt(vhEl, '继续观察 falsify 条件');
        tint(vEl, '#1d4ed8');
      }
      draw(dsp, spotK, sigma, floorK, fairK, dd);
    }
    dspEl.addEventListener('input', update);
    spotEl.addEventListener('input', update);
    sigmaEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 漂移剥离器 ══ */
  (function driftStrip() {
    var winEl = $('vs_win'), stratEl = $('vs_strat');
    if (!winEl || !stratEl) return;
    var winO = $('vs_winO'), stratO = $('vs_stratO');
    var baseEl = $('vs_base'), baseHEl = $('vs_baseh');
    var exEl = $('vs_ex'), exHEl = $('vs_exh');
    var nEl = $('vs_n'), nHEl = $('vs_nh');
    var vEl = $('vs_dv'), vhEl = $('vs_dvh');
    var MU = 0.5, SIGMA = 0.65;

    function update() {
      var T = +winEl.value;
      var ps = +stratEl.value / 100;
      var pb = ncdf(MU * (T / 252) / (SIGMA * Math.sqrt(T / 252)));
      var ex = ps - pb;
      var n = Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / (ex * ex);
      txt(winO, T + ' 日');
      txt(stratO, (+stratEl.value).toFixed(1) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(exEl, (ex >= 0 ? '+' : '') + (ex * 100).toFixed(1) + ' pp');
      txt(nEl, isFinite(n) ? String(Math.ceil(n)) : '∞');
      if (ex < 0.05) {
        txt(vEl, '无显著超额');
        txt(vhEl, '策略≈持币');
        tint(vEl, '#7c848f');
      } else if (ex < 0.12) {
        txt(vEl, '弱超额');
        txt(vhEl, 'n=4 周期不够');
        tint(vEl, '#b8730a');
      } else {
        txt(vEl, '可观超额');
        txt(vhEl, '仍需多样本验证');
        tint(vEl, '#0f8a4d');
      }
      txt(baseHEl, 'μ=50%, σ=65%');
      txt(exHEl, ex > 0.1 ? '扣除后仍可观' : '接近噪声');
      txt(nHEl, '双侧 α=0.05, β=0.20');
    }
    winEl.addEventListener('input', update);
    stratEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 回撤深度仪 ══ */
  (function ddModel() {
    var ddEl = $('vs_ddsl'), peakEl = $('vs_peak');
    if (!ddEl || !peakEl) return;
    var ddO = $('vs_ddslO'), peakO = $('vs_peakO');
    var impliedEl = $('vs_implied'), impliedHEl = $('vs_impliedh');
    var histEl = $('vs_hist'), histHEl = $('vs_histh');
    var tofloorEl = $('vs_tofloor'), tofloorHEl = $('vs_tofloorh');
    var vEl = $('vs_ddv'), vhEl = $('vs_ddvh');
    var cv = $('vsDdChart');

    function draw(dd, spotK, floorK) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 18, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minD = -90, maxD = 0;
      var bars = [
        { d: -83, col: '#c9d0d9', lab: '2013' },
        { d: -84, col: '#c9d0d9', lab: '2017' },
        { d: -77, col: '#c9d0d9', lab: '2021' },
        { d: -48, col: '#b8730a', lab: 'C4 max' },
        { d: dd, col: '#d5342c', lab: 'NOW' }
      ];
      var sx = function (i) { return pad.l + (i + 0.5) * iw / bars.length; };
      var sy = function (d) { return pad.t + (1 - (d - minD) / (maxD - minD)) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      var bw = iw / bars.length * 0.55;
      bars.forEach(function (b, i) {
        var x = sx(i), y0 = sy(0), y1b = sy(b.d);
        ctx.fillStyle = b.col;
        ctx.fillRect(x - bw / 2, y1b, bw, y0 - y1b);
        ctx.fillStyle = '#454c56';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.lab, x, y1 + 13);
        ctx.fillText(b.d + '%', x, y1b - 4);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('峰后回撤深度对比', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var dd = +ddEl.value;
      var peakK = +peakEl.value;
      var spotK = peakK * (1 + dd / 100);
      var days = daysSinceGenesis(ASOF_MS);
      var floorK = floorPrice(days, DEFAULT_SIGMA, DEFAULT_BETA, DEFAULT_LOGA) / 1000;
      var toFloor = (spotK / floorK - 1) * 100;
      var needDrop = spotK > floorK ? -((1 - floorK / spotK) * 100) : 0;
      txt(ddO, fmtPct(dd));
      txt(peakO, fmtK(peakK));
      txt(impliedEl, fmtK(spotK));
      txt(histEl, HIST_DD + '%');
      txt(tofloorEl, fmtPct(needDrop));
      if (dd > -40) {
        txt(impliedHEl, '浅于历史底');
        txt(vEl, '浅回撤区');
        txt(vhEl, '周期深度维度待验证');
        tint(vEl, '#b8730a');
      } else if (dd > -60) {
        txt(impliedHEl, '中等回撤');
        txt(vEl, '中等回撤区');
        txt(vhEl, '向历史底靠拢');
        tint(vEl, '#454c56');
      } else {
        txt(impliedHEl, '接近历史底');
        txt(vEl, '深回撤区');
        txt(vhEl, '周期深度维度领先');
        tint(vEl, '#d5342c');
      }
      txt(histHEl, '前三次均值');
      txt(tofloorHEl, toFloor < 20 ? '逼近 floor' : 'floor 仍远');
      draw(dd, spotK, floorK);
    }
    ddEl.addEventListener('input', update);
    peakEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 底窗裁决器 ══ */
  (function verdictModel() {
    var daysEl = $('vs_bdays'), ddEl = $('vs_bdd');
    if (!daysEl || !ddEl) return;
    var daysO = $('vs_bdaysO'), ddO = $('vs_bddO');
    var csEl = $('vs_cs'), csHEl = $('vs_csh');
    var psEl = $('vs_ps'), psHEl = $('vs_psh');
    var scEl = $('vs_sc'), scHEl = $('vs_sch');
    var vEl = $('vs_bv'), vhEl = $('vs_bvh');
    var cv = $('vsVerdictChart');

    function scoreCycle(dsp, dd) {
      var timeScore = 0;
      if (dsp >= 300 && dsp <= 430) timeScore = 40;
      else if (dsp >= 250 && dsp <= 480) timeScore = 25;
      else timeScore = 10;
      var depthScore = 0;
      if (dd <= -55) depthScore = 35;
      else if (dd <= -40) depthScore = 25;
      else if (dd <= -30) depthScore = 15;
      else depthScore = 5;
      return Math.min(100, timeScore + depthScore + 15);
    }

    function scorePlt(dd) {
      var days = daysSinceGenesis(ASOF_MS);
      var floorK = floorPrice(days, DEFAULT_SIGMA, DEFAULT_BETA, DEFAULT_LOGA) / 1000;
      var spotK = DEFAULT_PEAK * (1 + dd / 100);
      var gap = (spotK / floorK - 1) * 100;
      var proxScore = 0;
      if (gap < 10) proxScore = 45;
      else if (gap < 25) proxScore = 35;
      else if (gap < 45) proxScore = 20;
      else proxScore = 8;
      var holdScore = 25;
      return Math.min(100, proxScore + holdScore + 10);
    }

    function draw(cs, ps) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 18, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var bars = [{ v: cs, col: '#1d4ed8', lab: '周期' }, { v: ps, col: '#0f8a4d', lab: '幂律' }];
      var bw = 80;
      bars.forEach(function (b, i) {
        var x = pad.l + iw * (0.3 + i * 0.4);
        var bh = (b.v / 100) * ih;
        ctx.fillStyle = b.col;
        ctx.fillRect(x - bw / 2, pad.t + ih - bh, bw, bh);
        ctx.fillStyle = '#454c56';
        ctx.font = '12px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.lab, x, y1 + 13);
        ctx.fillText(b.v, x, pad.t + ih - bh - 6);
      });
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('框架启发式得分（0–100）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var dsp = +daysEl.value;
      var dd = +ddEl.value;
      var cs = scoreCycle(dsp, dd);
      var ps = scorePlt(dd);
      var scenario = '折中浅底';
      if (cs > ps + 15 && dd <= -45) scenario = '深回撤触 floor';
      else if (ps > cs + 15 && dd > -35) scenario = '浅底悬空';
      else if (Math.abs(cs - ps) <= 10) scenario = '对决未分胜负';
      txt(daysO, dsp + ' 天');
      txt(ddO, fmtPct(dd));
      txt(csEl, String(cs));
      txt(psEl, String(ps));
      txt(scEl, scenario);
      txt(csHEl, '时间+深度维度');
      txt(psHEl, 'floor 距离+历史');
      txt(scHEl, '非交易信号');
      if (scenario === '对决未分胜负') {
        txt(vEl, '对决未分胜负');
        txt(vhEl, '2027 Q1 再裁决');
        tint(vEl, '#1d4ed8');
      } else {
        txt(vEl, '暂领先：' + (cs > ps ? '周期' : '幂律'));
        txt(vhEl, '基线：' + scenario);
        tint(vEl, cs > ps ? '#1d4ed8' : '#0f8a4d');
      }
      draw(cs, ps);
    }
    daysEl.addEventListener('input', update);
    ddEl.addEventListener('input', update);
    update();
  })();
})();
