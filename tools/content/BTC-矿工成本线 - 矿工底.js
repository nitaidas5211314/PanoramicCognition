/* ============================================================
   《BTC-矿工成本线 / 矿工底》主题脚本
   四个可调模型：
     1. 矿工盈亏线 — 现货价 vs 现金成本 → 利润率与关机阈值
     2. Hashprice 计算器 — 价格×算力×区块奖励 → $/PH/s/日
     3. Puell 压力表 — 矿工日收入 / 年均收入 →  capitulation 区间
     4. 漂移剥离器 — Hash Ribbon 买入胜率 vs 随机持币基准
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

  function fmtUsd(v) {
    if (!isFinite(v)) return '—';
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(2) + 'M';
    if (v >= 1e3) return '$' + Math.round(v).toLocaleString('en-US');
    return '$' + v.toFixed(2);
  }

  var SUBSIDY = 3.125;
  var BLOCKS_PER_DAY = 144;

  /* ══ 工具 1 · 矿工盈亏线 ══ */
  (function minerBreakeven() {
    var pxEl = $('mc_px'), costEl = $('mc_cost');
    if (!pxEl || !costEl) return;
    var pxO = $('mc_pxO'), costO = $('mc_costO');
    var marginEl = $('mc_margin'), marginHEl = $('mc_marginh');
    var gapEl = $('mc_gap'), gapHEl = $('mc_gaph');
    var vEl = $('mc_v'), vhEl = $('mc_vh');
    var cv = $('mcChart');

    function zone(marginPct) {
      if (marginPct >= 20) return { t: '丰厚利润', c: '#d5342c', h: '矿工有强烈扩产与抛售激励' };
      if (marginPct >= 5) return { t: '温和盈利', c: '#b8730a', h: '多数高效矿场可维持运营' };
      if (marginPct >= 0) return { t: '盈亏边缘', c: '#454c56', h: '高成本矿机开始关机' };
      if (marginPct >= -15) return { t: '亏损运营', c: '#0f8a4d', h: '约 15–20% 产能可能离线【待验证】' };
      return { t: '深度 capitulation', c: '#0f8a4d', h: '历史上常对应局部底，但可持续数月' };
    }

    function draw(px, cost) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minP = 40000, maxP = 130000;
      var sx = function (v) { return pad.l + ((v - minP) / (maxP - minP)) * iw; };

      ctx.fillStyle = '#fdf3f2';
      ctx.fillRect(pad.l, pad.t, sx(cost) - pad.l, ih);
      ctx.fillStyle = '#f2f7f4';
      ctx.fillRect(sx(cost), pad.t, sx(maxP) - sx(cost), ih);

      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      [50000, 78000, 100000, 126000].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref === cost ? '#0f8a4d' : '#c9d0d9';
        ctx.setLineDash(ref === cost ? [4, 3] : []);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = ref === cost ? '#0f8a4d' : '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((ref / 1000) + 'k', x, y1 + 13);
      });

      var mx = sx(px);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(mx, pad.t + ih * 0.45, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(fmtUsd(px), mx, pad.t + ih * 0.45 - 12);

      ctx.fillStyle = '#0f8a4d';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('成本线以下', pad.l + 4, pad.t + 14);
      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      ctx.fillText('BTC 现货价 ($)', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var px = parseFloat(pxEl.value);
      var cost = parseFloat(costEl.value);
      var margin = (px - cost) / cost * 100;
      var gap = px - cost;
      var z = zone(margin);
      txt(pxO, fmtUsd(px));
      txt(costO, fmtUsd(cost));
      txt(marginEl, (margin >= 0 ? '+' : '') + margin.toFixed(1) + '%');
      tint(marginEl, margin >= 0 ? '#d5342c' : '#0f8a4d');
      txt(marginHEl, margin >= 0 ? '价高于成本' : '价低于成本');
      txt(gapEl, (gap >= 0 ? '+' : '') + fmtUsd(gap));
      txt(gapHEl, '绝对差额');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(px, cost);
    }

    pxEl.addEventListener('input', update);
    costEl.addEventListener('input', update);
    update();
    window.addEventListener('resize', update);
  })();

  /* ══ 工具 2 · Hashprice 计算器 ══ */
  (function hashpriceCalc() {
    var pxEl = $('hp_px'), hrEl = $('hp_hr'), feeEl = $('hp_fee');
    if (!pxEl || !hrEl) return;
    var pxO = $('hp_pxO'), hrO = $('hp_hrO'), feeO = $('hp_feeO');
    var hpEl = $('hp_val'), hpHEl = $('hp_valh');
    var dailyEl = $('hp_daily'), dailyHEl = $('hp_dailyh');
    var vEl = $('hp_v'), vhEl = $('hp_vh');
    var cv = $('hpChart');

    function hashprice(px, hrEH, feePct) {
      var hrPH = hrEH * 1e3;
      var dailyBtc = BLOCKS_PER_DAY * SUBSIDY * (1 + feePct / 100);
      var dailyUsd = dailyBtc * px;
      return dailyUsd / hrPH;
    }

    function zone(hp) {
      if (hp >= 55) return { t: '牛市 hashprice', c: '#d5342c', h: '2025-07 峰约 $63/PH/s/日【待验证】' };
      if (hp >= 38) return { t: '盈亏平衡上方', c: '#b8730a', h: '2026-09 回升至约 $38【待验证】' };
      if (hp >= 28) return { t: '压榨区间', c: '#454c56', h: 'Q1–Q2 2026 多数矿场承压' };
      return { t: '历史极端低', c: '#0f8a4d', h: '2026-06 月均 $27.7 创新低【待验证】' };
    }

    function draw(hp) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxH = 70;
      var sx = function (v) { return pad.l + (v / maxH) * iw; };

      var refs = [
        { v: 27.7, col: '#0f8a4d', lab: '6月低' },
        { v: 38, col: '#b8730a', lab: '9月' },
        { v: 63, col: '#d5342c', lab: '2025峰' }
      ];
      refs.forEach(function (r) {
        ctx.fillStyle = r.col + '18';
        var x0 = sx(Math.max(0, r.v - 3));
        ctx.fillRect(x0, pad.t, sx(Math.min(maxH, r.v + 3)) - x0, ih);
      });

      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      refs.forEach(function (r) {
        var x = sx(r.v);
        ctx.strokeStyle = r.col;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(r.lab, x, y1 + 13);
      });

      var mx = sx(Math.min(hp, maxH));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('$' + hp.toFixed(1), mx, pad.t + ih * 0.5);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('Hashprice ($/PH/s/日)', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var px = parseFloat(pxEl.value);
      var hr = parseFloat(hrEl.value);
      var fee = parseFloat(feeEl.value);
      var hp = hashprice(px, hr, fee);
      var dailyBtc = BLOCKS_PER_DAY * SUBSIDY * (1 + fee / 100);
      var z = zone(hp);
      txt(pxO, fmtUsd(px));
      txt(hrO, hr.toFixed(0) + ' EH/s');
      txt(feeO, fee.toFixed(1) + '%');
      txt(hpEl, '$' + hp.toFixed(2));
      txt(hpHEl, '/PH/s/日');
      txt(dailyEl, dailyBtc.toFixed(1) + ' BTC');
      txt(dailyHEl, '全网日产出（含费）');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(hp);
    }

    pxEl.addEventListener('input', update);
    hrEl.addEventListener('input', update);
    feeEl.addEventListener('input', update);
    update();
    window.addEventListener('resize', update);
  })();

  /* ══ 工具 3 · Puell 压力表 ══ */
  (function puellGauge() {
    var pEl = $('pl_val'), avgEl = $('pl_avg');
    if (!pEl) return;
    var pO = $('pl_valO'), avgO = $('pl_avgO');
    var ratioEl = $('pl_ratio'), ratioHEl = $('pl_ratioh');
    var revEl = $('pl_rev'), revHEl = $('pl_revh');
    var vEl = $('pl_v'), vhEl = $('pl_vh');
    var cv = $('plChart');

    function zone(pm) {
      if (pm >= 4) return { t: '矿工暴利', c: '#d5342c', h: '历史上常接近周期顶' };
      if (pm >= 1.5) return { t: '高于均值', c: '#b8730a', h: '扩产激励上升' };
      if (pm >= 0.75) return { t: '温和压力', c: '#454c56', h: '2025-11 Puell≈0.67【待验证】' };
      if (pm >= 0.5) return { t: ' capitulation 区', c: '#0f8a4d', h: '矿工收入显著低于年均' };
      return { t: '极端低估', c: '#0f8a4d', h: '2022 底约 0.3【待验证】' };
    }

    function draw(pm) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxP = 5;
      var sx = function (v) { return pad.l + (v / maxP) * iw; };

      var bands = [
        { lo: 0, hi: 0.5, col: '#e8f5ee' },
        { lo: 0.5, hi: 0.75, col: '#f4f6f9' },
        { lo: 0.75, hi: 1.5, col: '#fff7e6' },
        { lo: 1.5, hi: maxP, col: '#fdf3f2' }
      ];
      bands.forEach(function (b) {
        ctx.fillStyle = b.col;
        ctx.fillRect(sx(b.lo), pad.t, sx(b.hi) - sx(b.lo), ih);
      });

      [0.5, 1, 2, 4].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = '#c9d0d9';
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref), x, y1 + 13);
      });

      var mx = sx(Math.min(pm, maxP));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pm.toFixed(2), mx, pad.t + ih * 0.5 - 8);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('Puell Multiple', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var daily = parseFloat(pEl.value);
      var avg = parseFloat(avgEl.value);
      var pm = avg > 0 ? daily / avg : 0;
      var z = zone(pm);
      txt(pO, fmtUsd(daily) + '/日');
      txt(avgO, fmtUsd(avg) + '/日');
      txt(ratioEl, pm.toFixed(2));
      txt(ratioHEl, 'Puell Multiple');
      txt(revEl, (pm * 100).toFixed(0) + '%');
      txt(revHEl, '相对年均收入');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(pm);
    }

    pEl.addEventListener('input', update);
    avgEl.addEventListener('input', update);
    update();
    window.addEventListener('resize', update);
  })();

  /* ══ 工具 4 · 漂移剥离器 ══ */
  (function driftStripper() {
    var tEl = $('mc_d_T'), psEl = $('mc_d_ps'), muEl = $('mc_d_mu'), sgEl = $('mc_d_sg');
    if (!tEl) return;
    var tO = $('mc_d_TO'), psO = $('mc_d_psO'), muO = $('mc_d_muO'), sgO = $('mc_d_sgO');
    var baseEl = $('mc_d_base'), baseHEl = $('mc_d_baseh');
    var dpEl = $('mc_d_dp'), dpHEl = $('mc_d_dph');
    var nEl = $('mc_d_n'), nHEl = $('mc_d_nh');
    var vEl = $('mc_d_v'), vhEl = $('mc_d_vh');
    var cv = $('mc_dChart');

    function sampleN(pb, ps) {
      var d = ps - pb;
      if (d <= 0) return Infinity;
      var z = 1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps));
      return Math.ceil(z * z / (d * d));
    }

    function draw(pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 18, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var barH = ih * 0.35;

      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t + ih * 0.2, iw, barH);
      ctx.fillStyle = '#1d4ed8';
      var bw = (pb / 100) * iw;
      ctx.fillRect(pad.l, pad.t + ih * 0.2, bw, barH);
      ctx.fillStyle = '#d5342c';
      var sw = (ps / 100) * iw;
      ctx.fillRect(pad.l, pad.t + ih * 0.65, sw, barH);

      ctx.fillStyle = '#454c56';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('基准 ' + (pb * 100).toFixed(1) + '%', pad.l, pad.t + ih * 0.15);
      ctx.fillText('信号 ' + (ps * 100).toFixed(1) + '%', pad.l, pad.t + ih * 0.6);
      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      ctx.fillText('胜率对比', pad.l + iw / 2, y1 + 22);
    }

    function update() {
      var T = parseFloat(tEl.value);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var t = T / 252;
      var pb = ncdf(mu * t / (sg * Math.sqrt(t)));
      var dp = (ps - pb) * 100;
      var n = sampleN(pb, ps);
      txt(tO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(0) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, '随机持币基准');
      txt(dpEl, (dp >= 0 ? '+' : '') + dp.toFixed(1) + ' pp');
      tint(dpEl, dp >= 5 ? '#d5342c' : dp >= 1 ? '#b8730a' : '#454c56');
      txt(dpHEl, '真实超额');
      txt(nEl, isFinite(n) ? String(n) : '∞');
      txt(nHEl, '显著性所需样本');
      var verdict = dp < 2 ? '超额有限' : dp < 8 ? '有一定超额' : '超额显著';
      txt(vEl, verdict);
      tint(vEl, dp < 2 ? '#454c56' : '#d5342c');
      txt(vhEl, 'Hash Ribbon 历史买入约 64% 胜率【待验证】');
      draw(pb, ps);
    }

    tEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
    window.addEventListener('resize', update);
  })();
})();
