/* ============================================================
   《BTC-彩虹图（Rainbow Chart）》主题脚本
   四个可调模型：
     1. 彩虹带定位器   — log 回归 + 九带 + canvas
     2. 版本再校准冲击 — V1 / V2 / Dynamic 中轴对比
     3. 漂移剥离器     — 蓝带策略胜率 vs 随机持币基准
     4. 历史顶底落带   — 周期事件带号分布
   默认：Dynamic a=2.4612, b=-16.4337, t=6466, spot=95000
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  var GENESIS_MS = Date.UTC(2009, 0, 3);
  var DEFAULT_A = 2.4612;
  var DEFAULT_B = -16.4337;
  var DEFAULT_DAYS = 6466;
  var DEFAULT_SPOT = 95000;
  var BAND_STEP = 0.1;

  var VERSIONS = [
    { name: 'V1 (2014)', a: 2.9065, b: -19.493 },
    { name: 'V2 (2022-11)', a: 2.6618, b: -17.0184 },
    { name: 'Dynamic (2026)', a: 2.4612, b: -16.4337 }
  ];

  var BAND_LABELS = [
    '1 · 甩卖', '2 · 买入', '3 · 积累', '4 · 仍便宜', '5 · HODL',
    '6 · 泡沫？', '7 · FOMO', '8 · 认真卖', '9 · 最大泡沫'
  ];

  var BAND_COLORS = [
    '#1e3a8a', '#2563eb', '#0f8a4d', '#22c55e', '#eab308',
    '#f97316', '#ef4444', '#dc2626', '#991b1b'
  ];

  var EVENTS = [
    { label: '2013-12 顶', days: 1800, price: 1121, ret6m: -45 },
    { label: '2015-01 底', days: 2200, price: 172, ret6m: 120 },
    { label: '2017-12 顶', days: 3265, price: 19424, ret6m: -65 },
    { label: '2018-12 底', days: 3637, price: 3217, ret6m: 180 },
    { label: '2021-11 顶', days: 4698, price: 67145, ret6m: -45 },
    { label: '2022-11 底', days: 5065, price: 16304, ret6m: 85 },
    { label: '2024-03 高', days: 5535, price: 73098, ret6m: 15 },
    { label: '2026-09 现货', days: 6466, price: 95000, ret6m: null }
  ];

  function fairPrice(days, a, b) {
    if (days <= 0) return 0;
    return Math.pow(10, a * Math.log(days) + b);
  }

  function bandOffset(delta) {
    var thresholds = [-0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4];
    for (var i = 0; i < 9; i++) {
      if (delta <= thresholds[i]) return i + 1;
    }
    return 9;
  }

  function deltaOf(spot, fair) {
    if (spot <= 0 || fair <= 0) return 0;
    return Math.log10(spot / fair);
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

  /* ══ 工具 1 · 彩虹带定位器 ══ */
  (function bandLocator() {
    var daysEl = $('rb_days'), spotEl = $('rb_spot'), aEl = $('rb_a');
    if (!daysEl || !spotEl || !aEl) return;
    var daysO = $('rb_daysO'), spotO = $('rb_spotO'), aO = $('rb_aO');
    var fairEl = $('rb_fair'), fairHEl = $('rb_fairh');
    var deltaEl = $('rb_delta'), deltaHEl = $('rb_deltah');
    var bandEl = $('rb_band'), bandHEl = $('rb_bandh');
    var discEl = $('rb_disc'), discHEl = $('rb_disch');
    var vEl = $('rb_v'), vhEl = $('rb_vh');
    var cv = $('rbBandChart');

    function draw(days, a, b, spot, fair, delta, band) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 58, r: 18, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minD = 400, maxD = Math.max(days * 1.12, 7000);
      var minP = fairPrice(minD, a, b) * Math.pow(10, -0.55);
      var maxP = fairPrice(maxD, a, b) * Math.pow(10, 0.55);
      var sx = function (d) {
        return pad.l + (Math.log10(d) - Math.log10(minD)) / (Math.log10(maxD) - Math.log10(minD)) * iw;
      };
      var sy = function (p) {
        return pad.t + (1 - (Math.log10(p) - Math.log10(minP)) / (Math.log10(maxP) - Math.log10(minP))) * ih;
      };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      for (var k = -4; k <= 4; k++) {
        ctx.strokeStyle = BAND_COLORS[k + 4];
        ctx.lineWidth = k === 0 ? 2.2 : 1.1;
        ctx.setLineDash(k === 0 ? [] : [3, 3]);
        ctx.beginPath();
        for (var i = 0; i <= 40; i++) {
          var d = minD * Math.pow(maxD / minD, i / 40);
          var p = fairPrice(d, a, b) * Math.pow(10, k * BAND_STEP);
          var x = sx(d), y = sy(p);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }
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
      ctx.fillStyle = '#454c56';
      ctx.fillText('带 ' + band + ' · ' + BAND_LABELS[band - 1].split(' · ')[1], pad.l + 4, pad.t + 12);
    }

    function upd() {
      var days = parseFloat(daysEl.value);
      var spot = parseFloat(spotEl.value);
      var a = parseFloat(aEl.value);
      var b = DEFAULT_B + (a - DEFAULT_A) * 0.8;
      var fair = fairPrice(days, a, b);
      var delta = deltaOf(spot, fair);
      var band = bandOffset(delta);
      var disc = (spot / fair - 1) * 100;
      txt(daysO, days.toLocaleString('en-US') + ' 天');
      txt(spotO, fmtUSD(spot));
      txt(aO, a.toFixed(4));
      txt(fairEl, fmtUSD(fair));
      txt(fairHEl, 'log₁₀P = ' + a.toFixed(4) + '·ln(t) ' + (b >= 0 ? '+' : '') + b.toFixed(4));
      txt(deltaEl, delta.toFixed(3) + ' dex');
      tint(deltaEl, delta < -0.1 ? 'var(--green)' : delta > 0.1 ? 'var(--red)' : 'var(--amber)');
      txt(deltaHEl, '相对中轴 ' + (delta < 0 ? '偏冷' : '偏热'));
      txt(bandEl, BAND_LABELS[band - 1]);
      txt(bandHEl, '带 ' + band + '/9 · 带宽 0.1 dex');
      txt(discEl, disc.toFixed(1) + '%');
      tint(discEl, disc < 0 ? 'var(--green)' : 'var(--red)');
      txt(discHEl, disc < 0 ? '低于中轴' : '高于中轴');
      var label, hint, col;
      if (band <= 2) {
        label = '深度偏冷'; hint = '历史罕见区；2022 曾破带 1';
        col = 'var(--green)';
      } else if (band <= 4) {
        label = '偏冷区'; hint = '2026-09 典型位置（带 4）';
        col = 'var(--green)';
      } else if (band === 5) {
        label = '中轴附近'; hint = 'HODL 带；趋势中性';
        col = 'var(--amber)';
      } else if (band <= 7) {
        label = '偏热区'; hint = '周期中段常见';
        col = 'var(--amber)';
      } else {
        label = '过热区'; hint = '历次顶多在带 8–9';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(days, a, b, spot, fair, delta, band);
    }
    [daysEl, spotEl, aEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 2 · 版本再校准冲击 ══ */
  (function versionImpact() {
    var verEl = $('rb_ver'), spotEl = $('rb_vspot');
    if (!verEl || !spotEl) return;
    var verO = $('rb_verO');
    var fairEl = $('rb_vfair'), fairHEl = $('rb_vfairh');
    var bandEl = $('rb_vband'), bandHEl = $('rb_vbandh');
    var ratioEl = $('rb_vratio'), ratioHEl = $('rb_vratioh');
    var vEl = $('rb_v2'), vhEl = $('rb_v2h');
    var cv = $('rbVerChart');

    function draw(spot, fairs) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 70, r: 18, t: 22, b: 46 };
      var y1 = h - 46;
      var maxF = Math.max(fairs[0], fairs[1], fairs[2], spot) * 1.1;
      var barW = (w - pad.l - pad.r - 40) / 4;
      var labels = ['V1', 'V2', 'Dynamic', '现货'];
      var vals = [fairs[0], fairs[1], fairs[2], spot];
      var cols = ['#991b1b', '#f97316', '#1d4ed8', '#d5342c'];
      vals.forEach(function (v, i) {
        var x = pad.l + i * (barW + 10);
        var bh = (h - pad.t - 46) * (v / maxF);
        var y = y1 - bh;
        ctx.fillStyle = cols[i];
        ctx.fillRect(x, y, barW, bh);
        ctx.fillStyle = '#454c56';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barW / 2, y1 + 13);
        ctx.fillText(fmtUSD(v), x + barW / 2, y - 4);
      });
      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      ctx.fillText('中轴价对比（t=6466）', pad.l + (w - pad.l - pad.r) / 2, y1 + 31);
    }

    function upd() {
      var vi = parseInt(verEl.value, 10);
      var spot = parseFloat(spotEl.value);
      var v = VERSIONS[vi];
      var fairV1 = fairPrice(DEFAULT_DAYS, VERSIONS[0].a, VERSIONS[0].b);
      var fairV2 = fairPrice(DEFAULT_DAYS, VERSIONS[1].a, VERSIONS[1].b);
      var fairDyn = fairPrice(DEFAULT_DAYS, VERSIONS[2].a, VERSIONS[2].b);
      var fair = fairPrice(DEFAULT_DAYS, v.a, v.b);
      var delta = deltaOf(spot, fair);
      var band = bandOffset(delta);
      var ratio = (fair / fairV1 - 1) * 100;
      txt(verO, v.name);
      txt(spotO, fmtUSD(spot));
      txt(fairEl, fmtUSD(fair));
      txt(fairHEl, 'a=' + v.a + ', b=' + v.b);
      txt(bandEl, String(band));
      txt(bandHEl, BAND_LABELS[band - 1]);
      txt(ratioEl, ratio.toFixed(1) + '%');
      tint(ratioEl, ratio < 0 ? 'var(--green)' : 'var(--red)');
      txt(ratioHEl, 'Dynamic 中轴仅为 V1 的 ' + (fairDyn / fairV1 * 100).toFixed(1) + '%');
      var label, hint;
      if (vi === 0) {
        label = 'V1 过于乐观'; hint = '现货仅为 V1 中轴的 ' + (spot / fairV1 * 100).toFixed(1) + '%';
      } else if (vi === 1) {
        label = 'V2 更保守'; hint = '2022 破带后发布';
      } else {
        label = 'Dynamic 更贴近现货'; hint = 'R²≈94.3% 全样本 refit';
      }
      txt(vEl, label); txt(vhEl, hint);
      draw(spot, [fairV1, fairV2, fairDyn]);
    }
    var spotO = $('rb_vspotO');
    [verEl, spotEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function driftStrip() {
    var winEl = $('rb_win'), holdEl = $('rb_hold');
    if (!winEl || !holdEl) return;
    var winO = $('rb_winO'), holdO = $('rb_holdO');
    var baseEl = $('rb_base'), baseHEl = $('rb_baseh');
    var excessEl = $('rb_excess'), excessHEl = $('rb_excessh');
    var nEl = $('rb_n'), nHEl = $('rb_nh');
    var vEl = $('rb_v3'), vhEl = $('rb_v3h');
    var mu = 0.50, sigma = 0.65;

    function upd() {
      var ps = parseFloat(winEl.value) / 100;
      var T = parseFloat(holdEl.value);
      var pb = ncdf(mu * (T / 252) / (sigma * Math.sqrt(T / 252)));
      var excess = (ps - pb) * 100;
      var n = Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) /
              Math.pow(ps - pb, 2);
      if (!isFinite(n) || n < 0) n = Infinity;
      txt(winO, (ps * 100).toFixed(1) + '%');
      txt(holdO, T + ' 日');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, 'μ=50%/年 · σ=65%/年 · T=' + T);
      txt(excessEl, (excess >= 0 ? '+' : '') + excess.toFixed(1) + ' pp');
      tint(excessEl, excess >= 5 ? 'var(--red)' : excess >= 2 ? 'var(--amber)' : 'var(--green)');
      txt(excessHEl, excess >= 0 ? '策略优于随机持币' : '策略跑输随机持币');
      txt(nEl, isFinite(n) ? String(Math.ceil(n)) : '∞');
      txt(nHEl, '90% 功效 · α=5% · 证超额显著');
      var label, hint;
      if (excess >= 8) {
        label = '超额显著'; hint = '但仍需 OOS 验证';
      } else if (excess >= 2) {
        label = '超额有限'; hint = '默认 72%/90 日 ≈ +4.3 pp';
      } else if (excess >= 0) {
        label = '边际超额'; hint = '接近 drift 噪声';
      } else {
        label = '无超额'; hint = '策略不如随机持币';
      }
      txt(vEl, label); txt(vhEl, hint);
    }
    [winEl, holdEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══ 工具 4 · 历史顶底落带 ══ */
  (function histBands() {
    var evtEl = $('rb_evt');
    if (!evtEl) return;
    var evtO = $('rb_evtO');
    var priceEl = $('rb_eprice'), priceHEl = $('rb_epriceh');
    var bandEl = $('rb_eband'), bandHEl = $('rb_ebandh');
    var retEl = $('rb_eret'), retHEl = $('rb_ereth');
    var vEl = $('rb_v4'), vhEl = $('rb_v4h');
    var cv = $('rbHistChart');

    function draw(curIdx) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 18, t: 22, b: 46 };
      var y1 = h - 46;
      var barW = (w - pad.l - pad.r) / EVENTS.length - 4;
      EVENTS.forEach(function (ev, i) {
        var fair = fairPrice(ev.days, DEFAULT_A, DEFAULT_B);
        var delta = deltaOf(ev.price, fair);
        var band = bandOffset(delta);
        var x = pad.l + i * (barW + 4);
        var bh = (h - pad.t - 46) * (band / 9);
        var y = y1 - bh;
        ctx.fillStyle = i === curIdx ? BAND_COLORS[band - 1] : '#c9d0d9';
        ctx.fillRect(x, y, barW, bh);
        ctx.fillStyle = '#454c56';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(band), x + barW / 2, y - 3);
      });
      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      ctx.fillText('带号（1=冷 · 9=热）', pad.l + (w - pad.l - pad.r) / 2, y1 + 31);
    }

    function upd() {
      var idx = parseInt(evtEl.value, 10);
      var ev = EVENTS[idx];
      var fair = fairPrice(ev.days, DEFAULT_A, DEFAULT_B);
      var delta = deltaOf(ev.price, fair);
      var band = bandOffset(delta);
      txt(evtO, ev.label);
      txt(priceEl, fmtUSD(ev.price));
      txt(priceHEl, 't=' + ev.days + ' · fair=' + fmtUSD(fair));
      txt(bandEl, String(band));
      txt(bandHEl, BAND_LABELS[band - 1] + ' · δ=' + delta.toFixed(2));
      if (ev.ret6m === null) {
        txt(retEl, '—'); txt(retHEl, '尚未发生');
      } else {
        txt(retEl, (ev.ret6m >= 0 ? '+' : '') + ev.ret6m + '%');
        tint(retEl, ev.ret6m >= 0 ? 'var(--red)' : 'var(--green)');
        txt(retHEl, '6 个月后涨跌【待验证】');
      }
      var label, hint;
      if (band <= 2) {
        label = '极端偏冷'; hint = '历史大底常见';
      } else if (band <= 4) {
        label = '偏冷但未极端'; hint = '可停留 1–2 年';
      } else if (band >= 8) {
        label = '周期顶区'; hint = '顶后可再涨数月';
      } else {
        label = '中性带'; hint = '方向信号弱';
      }
      txt(vEl, label); txt(vhEl, hint);
      draw(idx);
    }
    evtEl.addEventListener('input', upd);
    window.addEventListener('resize', upd);
    upd();
  })();
})();
