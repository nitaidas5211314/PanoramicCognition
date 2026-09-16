/* ============================================================
   《BTC 价值捕获与安全微笑曲线》主题脚本
   四个可调模型：
     1. 安全预算计算器   — 补贴+手续费 vs 市值
     2. 价值捕获微笑曲线 — 产业链各层价值占比
     3. 减半悬崖模拟器   — 手续费占比需达多少
     4. 漂移剥离器        — 安全信号胜率 vs 随机持币基准
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
    if (v >= 1e9) return '$' + (v / 1e9).toFixed(2) + 'B';
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'M';
    return '$' + v.toFixed(0);
  }

  /* ══ 工具 1 · 安全预算计算器 ══ */
  (function secBudget() {
    var priceEl = $('sc_price'), feeEl = $('sc_fee'), mcapEl = $('sc_mcap');
    if (!priceEl || !feeEl || !mcapEl) return;
    var BLOCKS = 144, SUBSIDY = 3.125;

    function update() {
      var price = parseFloat(priceEl.value) * 1000;
      var feeShare = parseFloat(feeEl.value) / 100;
      var mcap = parseFloat(mcapEl.value) * 1e12;
      var dailySub = BLOCKS * SUBSIDY * price;
      var annualSub = dailySub * 365;
      var annualTotal = feeShare >= 0.999 ? annualSub * 1000 : annualSub / (1 - feeShare);
      var annualFee = annualTotal - annualSub;
      var secPct = mcap > 0 ? annualTotal / mcap * 100 : 0;
      var attackDay = annualTotal / 365;
      txt($('sc_priceO'), '$' + (price / 1000).toFixed(0) + 'K');
      txt($('sc_feeO'), (feeShare * 100).toFixed(1) + '%');
      txt($('sc_mcapO'), fmtB(mcap));
      txt($('sc_annual'), fmtB(annualTotal));
      txt($('sc_sec'), secPct.toFixed(2) + '%');
      txt($('sc_attack'), fmtB(attackDay) + '/日');
      var z = secPct >= 1.5 ? { t: '充裕', c: '#0f8a4d', h: '高于 2024 均值 ~1.15%' }
        : secPct >= 0.8 ? { t: '中等', c: '#b8730a', h: '补贴仍主导，手续费边际' }
        : { t: '偏紧', c: '#d5342c', h: '接近安全预算悬崖【推论】' };
      txt($('sc_v'), z.t);
      tint($('sc_v'), z.c);
      txt($('sc_vh'), z.h);
      drawBudget(feeShare, secPct);
    }

    function drawBudget(feeShare, secPct) {
      var cv = $('scBudgetChart');
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var subPct = 1 - feeShare;
      var bars = [
        { label: '区块补贴', pct: subPct, col: '#1d4ed8' },
        { label: '交易手续费', pct: feeShare, col: '#b8730a' }
      ];
      var bx = pad.l, bw = iw;
      var totalH = ih * 0.7;
      var x0 = bx;
      bars.forEach(function (b) {
        var bw2 = bw * b.pct;
        ctx.fillStyle = b.col;
        ctx.fillRect(x0, pad.t + totalH * (1 - b.pct), bw2, totalH * b.pct);
        if (b.pct > 0.08) {
          ctx.fillStyle = '#fff';
          ctx.font = '11px -apple-system,sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText((b.pct * 100).toFixed(1) + '%', x0 + bw2 / 2, pad.t + totalH * (1 - b.pct / 2));
        }
        x0 += bw2;
      });
      ctx.strokeStyle = '#c9d0d9';
      ctx.strokeRect(bx, pad.t, bw, totalH);
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('安全预算占市值 ' + secPct.toFixed(2) + '%', pad.l + iw / 2, pad.t + totalH + 18);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('矿工收入结构（补贴 vs 手续费）', pad.l + iw / 2, y1 + 31);
    }

    priceEl.addEventListener('input', update);
    feeEl.addEventListener('input', update);
    mcapEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 价值捕获微笑曲线 ══ */
  (function smileCurve() {
    var holderEl = $('sm_holder'), minerEl = $('sm_miner'), infraEl = $('sm_infra');
    if (!holderEl || !minerEl || !infraEl) return;

    function update() {
      var holder = parseFloat(holderEl.value);
      var miner = parseFloat(minerEl.value);
      var infra = parseFloat(infraEl.value);
      var l1 = Math.max(1, 100 - holder - miner - infra);
      txt($('sm_holderO'), holder.toFixed(0) + '%');
      txt($('sm_minerO'), miner.toFixed(0) + '%');
      txt($('sm_infraO'), infra.toFixed(0) + '%');
      txt($('sm_l1O'), l1.toFixed(0) + '%');
      var midLow = miner + l1;
      var endsHigh = holder + infra;
      var verdict = endsHigh > midLow * 1.5
        ? { t: '典型微笑：两端高、中间低', c: '#0f8a4d', h: '协议/持币端与金融基建端捕获更多' }
        : { t: '微笑扁平化', c: '#b8730a', h: '矿工或 L1 结算份额上升——可能接近减半窗口' };
      txt($('sm_v'), verdict.t);
      tint($('sm_v'), verdict.c);
      txt($('sm_vh'), verdict.h);
      drawSmile(holder, miner, l1, infra);
    }

    function drawSmile(holder, miner, l1, infra) {
      var cv = $('smileChart');
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 20, t: 28, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var xs = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
      var ys = [holder, holder * 0.85, miner + l1, miner, l1 * 0.6 + miner * 0.4, infra];
      var maxY = Math.max.apply(null, ys) * 1.15 || 1;
      var sx = function (i) { return pad.l + xs[i] * iw; };
      var sy = function (v) { return pad.t + ih - (v / maxY) * ih; };
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      var labels = ['持币/稀缺', '自托管', '挖矿+L1', '矿机', 'L1结算', '托管/交易'];
      labels.forEach(function (lb, i) {
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(lb, sx(i), y1 + 13);
      });
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(ys[0]));
      for (var i = 1; i < xs.length; i++) {
        var cpx = (sx(i - 1) + sx(i)) / 2;
        ctx.quadraticCurveTo(cpx, sy(ys[i - 1]), sx(i), sy(ys[i]));
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      xs.forEach(function (_, i) {
        ctx.fillStyle = i === 0 || i === 5 ? '#0f8a4d' : (i === 2 || i === 3 ? '#d5342c' : '#b8730a');
        ctx.beginPath(); ctx.arc(sx(i), sy(ys[i]), 5, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('价值捕获份额（示意）', pad.l + iw / 2, y1 + 31);
    }

    holderEl.addEventListener('input', update);
    minerEl.addEventListener('input', update);
    infraEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 减半悬崖模拟器 ══ */
  (function halvingCliff() {
    var priceEl = $('hc_price'), feeEl = $('hc_fee'), targetEl = $('hc_target');
    if (!priceEl || !feeEl || !targetEl) return;
    var BLOCKS = 144;

    function subsidyAt(era) {
      return 50 / Math.pow(2, era);
    }

    function update() {
      var price = parseFloat(priceEl.value) * 1000;
      var feeNow = parseFloat(feeEl.value) / 100;
      var targetB = parseFloat(targetEl.value);
      var era2024 = 4, era2028 = 5, era2032 = 6;
      var sub24 = subsidyAt(era2024) * BLOCKS * 365 * price;
      var sub28 = subsidyAt(era2028) * BLOCKS * 365 * price;
      var sub32 = subsidyAt(era2032) * BLOCKS * 365 * price;
      var target = targetB * 1e9;
      function feeNeed(sub) {
        if (sub >= target) return 0;
        return (target - sub) / target;
      }
      var fn28 = feeNeed(sub28);
      var fn32 = feeNeed(sub32);
      var total24 = sub24 / (1 - feeNow);
      txt($('hc_priceO'), '$' + (price / 1000).toFixed(0) + 'K');
      txt($('hc_feeO'), (feeNow * 100).toFixed(1) + '%');
      txt($('hc_targetO'), '$' + targetB.toFixed(1) + 'B');
      txt($('hc_now'), fmtB(total24));
      txt($('hc_28'), (fn28 * 100).toFixed(1) + '%');
      txt($('hc_32'), (fn32 * 100).toFixed(1) + '%');
      var ok = feeNow >= fn28;
      txt($('hc_v'), ok ? '当前费率路径可维持' : '2028 前费率不足');
      tint($('hc_v'), ok ? '#0f8a4d' : '#d5342c');
      txt($('hc_vh'), ok ? '但需持续 L2/铭文类需求【假设】' : '需手续费占比升至 ' + (fn28 * 100).toFixed(0) + '%【推论】');
      drawCliff(feeNow, fn28, fn32, sub24, sub28, sub32, target);
    }

    function drawCliff(feeNow, fn28, fn32, sub24, sub28, sub32, target) {
      var cv = $('halvingChart');
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var years = ['2024', '2028', '2032'];
      var subs = [sub24, sub28, sub32];
      var maxV = target * 1.1;
      var gap = iw / (years.length - 1 || 1);
      ctx.strokeStyle = '#d5342c';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      var ty = pad.t + ih - (target / maxV) * ih;
      ctx.moveTo(pad.l, ty); ctx.lineTo(w - pad.r, ty); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#d5342c';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('目标 $' + (target / 1e9).toFixed(1) + 'B', pad.l + 4, ty - 4);
      years.forEach(function (yr, i) {
        var x = pad.l + i * gap;
        var sh = (subs[i] / maxV) * ih;
        var fh = ((subs[i] / (1 - (i === 0 ? feeNow : (i === 1 ? fn28 : fn32))) - subs[i]) / maxV) * ih;
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(x - 28, y1 - sh, 28, sh);
        ctx.fillStyle = '#b8730a';
        ctx.fillRect(x, y1 - sh - fh, 28, sh + fh);
        ctx.fillStyle = '#454c56';
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(yr, x, y1 + 13);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('蓝=补贴 · 琥珀=手续费（维持目标预算所需）', pad.l + iw / 2, y1 + 31);
    }

    priceEl.addEventListener('input', update);
    feeEl.addEventListener('input', update);
    targetEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 漂移剥离器 ══ */
  (function driftStrip() {
    var TEl = $('sc_T'), psEl = $('sc_ps'), muEl = $('sc_mu'), sgEl = $('sc_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;

    function update() {
      var T = parseFloat(TEl.value);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var z = mu * (T / 252) / (sg * Math.sqrt(T / 252));
      var pb = ncdf(z);
      var dp = ps - pb;
      var n = Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / Math.pow(ps - pb, 2);
      txt($('sc_TO'), T + ' 日');
      txt($('sc_psO'), (ps * 100).toFixed(1) + '%');
      txt($('sc_muO'), (mu * 100).toFixed(0) + '%');
      txt($('sc_sgO'), (sg * 100).toFixed(0) + '%');
      txt($('sc_base'), (pb * 100).toFixed(1) + '%');
      txt($('sc_dp'), (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      txt($('sc_n'), isFinite(n) ? String(Math.ceil(n)) : '∞');
      var verdict = dp >= 0.03
        ? { t: '有统计超额', c: '#0f8a4d', h: '但仍需 n≥' + Math.ceil(n) + ' 次独立观测' }
        : dp >= -0.03
        ? { t: '与基准相当', c: '#454c56', h: '信号可能只是漂移噪声' }
        : { t: '跑输基准', c: '#d5342c', h: '「高安全预算=看涨」需重验' };
      txt($('sc_dv'), verdict.t);
      tint($('sc_dv'), verdict.c);
      txt($('sc_dvh'), verdict.h);
      tint($('sc_dp'), dp >= 0 ? '#d5342c' : '#0f8a4d');
      drawDrift(T, pb, ps);
    }

    function drawDrift(T, pb, ps) {
      var cv = $('scDriftChart');
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 16, b: 32 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var bw = iw / 2 - 12;
      var maxP = Math.max(pb, ps, 0.55) * 1.15;
      var h1 = (pb / maxP) * ih, h2 = (ps / maxP) * ih;
      ctx.fillStyle = '#eaf0ff';
      ctx.fillRect(pad.l, pad.t + ih - h1, bw, h1);
      ctx.fillStyle = '#fff7e6';
      ctx.fillRect(pad.l + bw + 24, pad.t + ih - h2, bw, h2);
      ctx.fillStyle = '#454c56';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('基准 ' + (pb * 100).toFixed(1) + '%', pad.l + bw / 2, pad.t + ih - h1 - 6);
      ctx.fillText('信号 ' + (ps * 100).toFixed(1) + '%', pad.l + bw + 24 + bw / 2, pad.t + ih - h2 - 6);
      ctx.fillStyle = '#7c848f';
      ctx.fillText(T + ' 日持有胜率对比', pad.l + iw / 2, h - 8);
    }

    TEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();

})();
