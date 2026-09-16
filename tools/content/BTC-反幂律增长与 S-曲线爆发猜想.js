/* ============================================================
   《BTC-反幂律增长与 S-曲线爆发猜想》主题脚本
   四个可调模型：
     1. 采用幂律 vs S 曲线对比器
     2. 双采用曲线模拟器
     3. 减半爆发相位计时器
     4. 爆发胜率漂移剥离器
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  var YEARS_NOW = 6465 / 365;
  var DEFAULT_BETA = 5.69;
  var DEFAULT_LOGA = -16.524;
  var FAIR = Math.pow(10, DEFAULT_LOGA + DEFAULT_BETA * Math.log10(6465));
  var SPOT = 95000;
  var K_USERS = 1e9;

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

  function logistic(years, K, r, t0) {
    return K / (1 + Math.exp(-r * (years - t0)));
  }

  function powerLawProxy(years, alpha) {
    return Math.pow(Math.max(years, 0.5), alpha);
  }

  /* ══ 工具 1 · 采用幂律 vs S 曲线对比器 ══ */
  (function adoptCompare() {
    var alphaEl = $('ipl_alpha'), rEl = $('ipl_r'), t0El = $('ipl_t0');
    if (!alphaEl || !rEl || !t0El) return;
    var alphaO = $('ipl_alphaO'), rO = $('ipl_rO'), t0O = $('ipl_t0O');
    var plPenEl = $('ipl_plPen'), plPenhEl = $('ipl_plPenh');
    var logPenEl = $('ipl_logPen'), logPenhEl = $('ipl_logPenh');
    var ratioEl = $('ipl_ratio'), ratiohEl = $('ipl_ratioh');
    var vEl = $('ipl_v1'), vhEl = $('ipl_v1h');
    var cv = $('iplAdoptChart');

    function draw(alpha, r, t0) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxY = 25;
      var sx = function (yr) { return pad.l + (yr / maxY) * iw; };
      var sy = function (v) { return pad.t + (1 - v / maxY) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 60; i++) {
        var yr = maxY * i / 60;
        var v = powerLawProxy(yr, alpha) / powerLawProxy(maxY, alpha) * maxY;
        var x = sx(yr), y = sy(Math.min(v, maxY));
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var j = 0; j <= 60; j++) {
        var yr2 = maxY * j / 60;
        var v2 = (logistic(yr2, K_USERS, r, t0) / K_USERS) * maxY;
        var x2 = sx(yr2), y2 = sy(v2);
        if (j === 0) ctx.moveTo(x2, y2); else ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      var nx = sx(YEARS_NOW);
      var plNow = powerLawProxy(YEARS_NOW, alpha) / powerLawProxy(maxY, alpha) * maxY;
      var logNow = (logistic(YEARS_NOW, K_USERS, r, t0) / K_USERS) * maxY;
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(nx, sy(Math.min(plNow, maxY)), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(nx, sy(logNow), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('创世后年数', pad.l + iw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#1d4ed8';
      ctx.fillText('— 幂律 N∝t^α', pad.l + 4, pad.t + 12);
      ctx.fillStyle = '#d5342c';
      ctx.fillText('— Logistic S', pad.l + 110, pad.t + 12);
    }

    function upd() {
      var alpha = parseFloat(alphaEl.value);
      var r = parseFloat(rEl.value);
      var t0 = parseFloat(t0El.value);
      var plNow = powerLawProxy(YEARS_NOW, alpha);
      var logNow = logistic(YEARS_NOW, K_USERS, r, t0);
      var plGrowth = alpha / YEARS_NOW;
      var logGrowth = r * (1 - logNow / K_USERS);
      var ratio = logGrowth > 0.0001 ? plGrowth / logGrowth : 99;
      txt(alphaO, alpha.toFixed(1));
      txt(rO, r.toFixed(2));
      txt(t0O, t0.toFixed(1));
      txt(plPenEl, plNow.toFixed(1));
      txt(plPenhEl, 'N∝t^' + alpha.toFixed(1) + ' 归一化');
      txt(logPenEl, (logNow / K_USERS * 100).toFixed(1) + '%');
      txt(logPenhEl, 'K=10⁹ 用户');
      txt(ratioEl, ratio.toFixed(1) + '×');
      txt(ratiohEl, 'PL 相对增速 / Logistic 相对增速');
      var label, hint, col;
      if (ratio > 3) {
        label = '反幂律占优'; hint = '采用仍加速扩张，未触 S 饱和平台';
        col = 'var(--red)';
      } else if (ratio > 1) {
        label = '过渡区'; hint = '两模型差距收窄，需更多 OOS 数据';
        col = 'var(--amber)';
      } else {
        label = 'S 曲线占优'; hint = 'Logistic 增速更快——检查 K 是否设太低';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(alpha, r, t0);
    }
    [alphaEl, rEl, t0El].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 2 · 双采用曲线模拟器 ══ */
  (function dualCurve() {
    var assetEl = $('ipl_asset'), netEl = $('ipl_net');
    if (!assetEl || !netEl) return;
    var assetO = $('ipl_assetO'), netO = $('ipl_netO');
    var synEl = $('ipl_syn'), synhEl = $('ipl_synh');
    var gapEl = $('ipl_gap'), gaphEl = $('ipl_gaph');
    var stageEl = $('ipl_stage'), stagehEl = $('ipl_stageh');
    var vEl = $('ipl_v2'), vhEl = $('ipl_v2h');
    var cv = $('iplDualChart');

    function rogersStage(p) {
      if (p < 2.5) return '创新者';
      if (p < 13.5) return '早期采用';
      if (p < 34) return '早期大众';
      if (p < 68) return '晚期大众';
      return '落后者';
    }

    function draw(asset, net, syn) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxP = 50;
      var barW = iw / 4;
      var bars = [
        { label: '资产', val: asset, col: '#1d4ed8' },
        { label: '网络', val: net, col: '#b8730a' },
        { label: '合成', val: syn, col: '#0f8a4d' }
      ];
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      bars.forEach(function (b, i) {
        var x = pad.l + (i + 0.5) * barW;
        var bh = (b.val / maxP) * ih;
        ctx.fillStyle = b.col;
        ctx.fillRect(x - barW * 0.3, pad.t + ih - bh, barW * 0.6, bh);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.label, x, y1 + 13);
        ctx.fillStyle = '#15181d';
        ctx.font = '11px -apple-system,sans-serif';
        ctx.fillText(b.val.toFixed(1) + '%', x, pad.t + ih - bh - 6);
      });
      ctx.strokeStyle = '#c9d0d9';
      ctx.setLineDash([4, 4]);
      [2.5, 13.5, 34].forEach(function (th) {
        var y = pad.t + (1 - th / maxP) * ih;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('渗透率（%）', pad.l + iw / 2, y1 + 31);
    }

    function upd() {
      var asset = parseFloat(assetEl.value);
      var net = parseFloat(netEl.value);
      var syn = asset * 0.6 + net * 0.4;
      var gap = asset - net;
      txt(assetO, asset + '%');
      txt(netO, net + '%');
      txt(synEl, syn.toFixed(1) + '%');
      txt(synhEl, '加权（资产 0.6 + 网络 0.4）');
      txt(gapEl, gap.toFixed(0) + ' pp');
      txt(gaphEl, gap > 0 ? '资产领先网络' : '网络领先资产');
      txt(stageEl, rogersStage(syn));
      txt(stagehEl, 'Rogers 五阶段 · 合成渗透 ' + syn.toFixed(1) + '%');
      var label, hint, col;
      if (Math.abs(gap) > 10) {
        label = '双曲线错位'; hint = '资产/网络不同步——单 S 曲线会误判';
        col = 'var(--amber)';
      } else if (Math.abs(gap) > 5) {
        label = '轻度错位'; hint = '关注哪条曲线在驱动边际买家';
        col = 'var(--amber)';
      } else {
        label = '曲线同步'; hint = '罕见；通常 ETF 时代资产更快';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(asset, net, syn);
    }
    [assetEl, netEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 3 · 减半爆发相位计时器 ══ */
  (function burstTimer() {
    var phiEl = $('ipl_phi'), boostEl = $('ipl_boost');
    if (!phiEl || !boostEl) return;
    var phiO = $('ipl_phiO'), boostO = $('ipl_boostO');
    var phaseEl = $('ipl_phase'), phasehEl = $('ipl_phaseh');
    var targetEl = $('ipl_target'), targethEl = $('ipl_targeth');
    var gapPEl = $('ipl_gapP'), gapPhEl = $('ipl_gapPh');
    var vEl = $('ipl_v3'), vhEl = $('ipl_v3h');
    var cv = $('iplBurstChart');

    function phaseLabel(phi) {
      if (phi < 6) return { label: '爆发前夜', hint: '供给冲击消化期' };
      if (phi < 12) return { label: '爆发早期', hint: '历史涨幅多从此启动' };
      if (phi <= 24) return { label: '爆发中段', hint: '12–24 月历史主窗' };
      if (phi <= 36) return { label: '爆发尾声', hint: '边际效应递减' };
      return { label: '窗口关闭', hint: '需等下一减半周期' };
    }

    function draw(phi, boost, target) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxPhi = 36;
      var maxP = target * 1.15;
      var sx = function (p) { return pad.l + (p / maxPhi) * iw; };
      var sy = function (pr) {
        return pad.t + (1 - (pr - FAIR * 0.5) / (maxP - FAIR * 0.5)) * ih;
      };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(29,78,216,0.08)';
      ctx.fillRect(sx(12), pad.t, sx(24) - sx(12), ih);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(sx(12), pad.t); ctx.lineTo(sx(12), pad.t + ih); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx(24), pad.t); ctx.lineTo(sx(24), pad.t + ih); ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = '#7c848f';
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(pad.l, sy(FAIR)); ctx.lineTo(w - pad.r, sy(FAIR)); ctx.stroke();
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 36; i++) {
        var p = i;
        var burst = 1 + (boost - 1) * Math.exp(-Math.pow((p - 18) / 8, 2));
        var pr = FAIR * burst;
        var x = sx(p), y = sy(pr);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(sx(phi), sy(SPOT), 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('减半后月数 φ', pad.l + iw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillText('灰线=fair', pad.l + 4, sy(FAIR) - 4);
      ctx.fillText('蓝区=历史主窗', sx(18) - 20, pad.t + 12);
    }

    function upd() {
      var phi = parseFloat(phiEl.value);
      var boost = parseFloat(boostEl.value);
      var target = FAIR * boost;
      var gapP = (SPOT / target - 1) * 100;
      var ph = phaseLabel(phi);
      txt(phiO, phi + ' 月');
      txt(boostO, boost.toFixed(1) + '×');
      txt(phaseEl, ph.label);
      txt(phasehEl, ph.hint);
      txt(targetEl, fmtUSD(target));
      txt(targethEl, 'fair ' + fmtUSD(FAIR) + ' × ' + boost.toFixed(1));
      txt(gapPEl, gapP.toFixed(1) + '%');
      tint(gapPEl, gapP < 0 ? 'var(--green)' : 'var(--red)');
      txt(gapPhEl, '现货 ' + fmtUSD(SPOT) + ' vs 隐含目标');
      var label, hint, col;
      if (phi >= 12 && phi <= 24 && gapP < -30) {
        label = '窗内但未达标'; hint = '2024 周期低弧度——爆发假说承压';
        col = 'var(--amber)';
      } else if (phi >= 12 && phi <= 24 && gapP >= -10) {
        label = '爆发兑现中'; hint = '现货接近隐含目标带';
        col = 'var(--red)';
      } else if (phi < 12) {
        label = '爆发未至'; hint = '历史主窗尚未开启';
        col = 'var(--green)';
      } else {
        label = '窗口关闭/尾声'; hint = '不宜再押第四次必涨叙事';
        col = 'var(--amber)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(phi, boost, target);
    }
    [phiEl, boostEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 4 · 爆发胜率漂移剥离器 ══ */
  (function driftStrip() {
    var winEl = $('ipl_win'), holdEl = $('ipl_hold');
    if (!winEl || !holdEl) return;
    var winO = $('ipl_winO'), holdO = $('ipl_holdO');
    var baseEl = $('ipl_base'), basehEl = $('ipl_baseh');
    var excessEl = $('ipl_excess'), excesshEl = $('ipl_excessh');
    var nEl = $('ipl_n'), nhEl = $('ipl_nh');
    var vEl = $('ipl_v4'), vhEl = $('ipl_v4h');

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
      txt(basehEl, 'μ=50%/年 · σ=65%/年 · 随机持币');
      txt(excessEl, (excess >= 0 ? '+' : '') + excess.toFixed(1) + ' pp');
      tint(excessEl, excess >= 8 ? 'var(--red)' : excess >= 3 ? 'var(--amber)' : 'var(--green)');
      txt(excesshEl, '表面 ' + win.toFixed(1) + '% 胜率的真实超额');
      txt(nEl, n > 5000 ? '>5000' : String(n));
      txt(nhEl, '证明超额非随机所需约样本量（双侧）');
      var label, hint, col;
      if (excess < 3) {
        label = '超额微弱'; hint = '「减半爆发」叙事可能只是漂移换皮';
        col = 'var(--green)';
      } else if (excess < 10) {
        label = '超额有限'; hint = '需 n≈' + (n > 5000 ? '5000+' : n) + ' 才证显著';
        col = 'var(--amber)';
      } else {
        label = '显著超额'; hint = '仍要查是否 in-sample 过拟合（仅 4 次减半）';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }
    [winEl, holdEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
