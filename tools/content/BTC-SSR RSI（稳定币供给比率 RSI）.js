/* ============================================================
   《BTC-SSR RSI》主题脚本
   四个可调模型：
     1. SSR 购买力计算器   — 市值比 → 购买力百分比
     2. SSR RSI 动量仪表盘 — Wilder RSI(14) 于 SSR 序列
     3. 漂移剥离器         — 信号胜率 vs 随机持币基准
     4. 结构漂移对照器     — 跨周期绝对 SSR 不可比
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

  function wilderRsi(vals, period) {
    if (vals.length < period + 1) return null;
    var ag = 0, al = 0;
    for (var i = 1; i <= period; i++) {
      var d = vals[i] - vals[i - 1];
      if (d > 0) ag += d; else al -= d;
    }
    ag /= period; al /= period;
    var rs = al === 0 ? 100 : ag / al;
    return 100 - 100 / (1 + rs);
  }

  /* ══ 工具 1 · SSR 购买力计算器 ══ */
  (function ssrCalc() {
    var btcEl = $('ssr_btc'), stabEl = $('ssr_stab');
    if (!btcEl || !stabEl) return;
    var btcO = $('ssr_btcO'), stabO = $('ssr_stabO');
    var ratioEl = $('ssr_ratio'), ratioHEl = $('ssr_ratioh');
    var powerEl = $('ssr_power'), powerHEl = $('ssr_powerh');
    var vEl = $('ssr_v'), vhEl = $('ssr_vh');
    var cv = $('ssrChart');

    function zone(ssr) {
      if (ssr <= 5) return { t: '极端充裕（后 2022 常态）', c: '#0f8a4d', h: '稳定币相对 BTC 体量极大——勿与 2018 的 SSR=87 横比' };
      if (ssr <= 12) return { t: '充裕区', c: '#0f8a4d', h: '2022 底 ~4.1 · 2026 常态 ~9–11【待验证】' };
      if (ssr <= 50) return { t: '中性偏紧', c: '#454c56', h: '稳定币购买力中等——需看净流入方向' };
      if (ssr <= 200) return { t: '偏紧（前 2022 常态）', c: '#b8730a', h: '2018 底 SSR≈87——绝对值已结构性失效' };
      return { t: '极度紧缩', c: '#d5342c', h: '稳定币池极薄——仅适用于早期周期语境' };
    }

    function draw(ssr) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxS = 200;
      var sx = function (v) { return pad.l + (Math.min(v, maxS) / maxS) * iw; };
      var bands = [
        { lo: 0, hi: 12, col: '#e8f5ee', label: '≤12' },
        { lo: 12, hi: 50, col: '#f4f6f9', label: '12–50' },
        { lo: 50, hi: 200, col: '#fff7e6', label: '50–200' }
      ];
      bands.forEach(function (b) {
        ctx.fillStyle = b.col;
        ctx.fillRect(sx(b.lo), pad.t, sx(b.hi) - sx(b.lo), ih);
      });
      [12, 50].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref === 12 ? '#0f8a4d' : '#c9d0d9';
        ctx.setLineDash(ref === 12 ? [4, 3] : []);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref), x, y1 + 13);
      });
      var nx = sx(ssr);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(nx, pad.t); ctx.lineTo(nx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(nx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SSR ' + ssr.toFixed(2), nx, pad.t + ih * 0.5 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('稳定币供给比率（绝对值）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var btc = parseFloat(btcEl.value) * 1e12;
      var stab = parseFloat(stabEl.value) * 1e9;
      if (stab <= 0) return;
      var ssr = btc / stab;
      var power = 100 / ssr;
      var z = zone(ssr);
      txt(btcO, fmtB(btc));
      txt(stabO, fmtB(stab));
      txt(ratioEl, ssr.toFixed(2));
      txt(ratioHEl, 'BTC 市值 ÷ 稳定币市值');
      txt(powerEl, power.toFixed(2) + '%');
      txt(powerHEl, '≈ 稳定币可买 BTC 供应的比例');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(ssr);
    }

    btcEl.addEventListener('input', update);
    stabEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · SSR RSI 动量仪表盘 ══ */
  (function ssrRsi() {
    var baseEl = $('ssr_r_base'), dropEl = $('ssr_r_drop'), daysEl = $('ssr_r_days');
    if (!baseEl || !dropEl) return;
    var baseO = $('ssr_r_baseO'), dropO = $('ssr_r_dropO'), daysO = $('ssr_r_daysO');
    var rsiEl = $('ssr_r_rsi'), rsiHEl = $('ssr_r_rsih');
    var zoneEl = $('ssr_r_zone'), zoneHEl = $('ssr_r_zoneh');
    var vEl = $('ssr_r_v'), vhEl = $('ssr_r_vh');
    var cv = $('ssrRsiChart');

    function rsiZone(r) {
      if (r <= 20) return { t: '绿区（极度超卖）', c: '#0f8a4d', z: '20–30 绿区下沿' };
      if (r <= 30) return { t: '绿区（超卖）', c: '#0f8a4d', z: 'CryptoQuant 绿区 20–30' };
      if (r >= 80) return { t: '红区（极度超买）', c: '#d5342c', z: '红区 70–80 上沿' };
      if (r >= 70) return { t: '红区（超买）', c: '#d5342c', z: '稳定币相对 BTC 快速萎缩' };
      return { t: '中性带', c: '#454c56', z: '30–70 无极端动量' };
    }

    function buildSeries(base, dropPct) {
      var n = 15, vals = [base];
      for (var i = 1; i < n; i++) {
        var step = (dropPct / 100) / (n - 1);
        var bump = (i % 3 === 0) ? 0.004 : -step * 1.1;
        vals.push(vals[i - 1] * (1 + bump));
      }
      return vals;
    }

    function draw(vals, rsi) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minV = Math.min.apply(null, vals) * 0.95;
      var maxV = Math.max.apply(null, vals) * 1.05;
      var sx = function (i) { return pad.l + (i / (vals.length - 1)) * iw; };
      var sy = function (v) { return pad.t + (1 - (v - minV) / (maxV - minV)) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      vals.forEach(function (v, i) {
        var x = sx(i), y = sy(v);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var rBandH = 36;
      var rY = pad.t - 4;
      ctx.fillStyle = '#e8f5ee';
      ctx.fillRect(pad.l, rY, iw * 0.2, rBandH);
      ctx.fillStyle = '#fdf3f2';
      ctx.fillRect(pad.l + iw * 0.7, rY, iw * 0.3, rBandH);
      var rx = pad.l + (rsi / 100) * iw;
      ctx.strokeStyle = rsi <= 30 ? '#0f8a4d' : rsi >= 70 ? '#d5342c' : '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(rx, rY); ctx.lineTo(rx, rY + rBandH); ctx.stroke();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('RSI ' + rsi.toFixed(1), rx, rY + rBandH + 12);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('SSR 序列（蓝线）+ RSI 位置', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var base = parseFloat(baseEl.value);
      var drop = parseFloat(dropEl.value);
      var days = parseInt(daysEl.value, 10);
      var vals = buildSeries(base, drop);
      var rsi = wilderRsi(vals, 14);
      if (rsi === null) rsi = 50;
      var z = rsiZone(rsi);
      txt(baseO, base.toFixed(2));
      txt(dropO, drop.toFixed(1) + '%');
      txt(daysO, days + ' 日');
      txt(rsiEl, rsi.toFixed(1));
      txt(rsiHEl, 'Wilder RSI(14) 作用于 SSR');
      txt(zoneEl, z.z);
      txt(zoneHEl, z.t);
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, 'SSR 跌 → RSI 低 → 绿区；≠ 立刻反弹');
      draw(vals, rsi);
    }

    baseEl.addEventListener('input', update);
    dropEl.addEventListener('input', update);
    daysEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function ssrDrift() {
    var tEl = $('ssr_T'), psEl = $('ssr_ps'), muEl = $('ssr_mu'), sgEl = $('ssr_sg');
    if (!tEl || !psEl) return;
    var tO = $('ssr_TO'), psO = $('ssr_psO'), muO = $('ssr_muO'), sgO = $('ssr_sgO');
    var baseEl = $('ssr_base'), baseHEl = $('ssr_baseh');
    var dpEl = $('ssr_dp'), dpHEl = $('ssr_dph');
    var nEl = $('ssr_n'), nHEl = $('ssr_nh');
    var vEl = $('ssr_v3'), vhEl = $('ssr_v3h');
    var cv = $('ssrDriftChart');

    function draw(pb, ps, T) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 16, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var pts = [];
      for (var t = 5; t <= 365; t += 5) {
        pts.push({ t: t, p: ncdf(0.10 * (t / 252) / (0.18 * Math.sqrt(t / 252))) });
      }
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
      txt(nEl, isFinite(n) && n > 0 ? String(Math.ceil(n)) : '∞');
      txt(nHEl, '80% 功效所需样本');
      var verdict = dp < 0 ? '跑输基准' : dp < 2 ? '超额微弱' : dp < 5 ? '超额有限' : '超额可观';
      txt(vEl, verdict);
      tint(vEl, dp < 0 ? '#7c848f' : dp < 2 ? '#b8730a' : '#d5342c');
      txt(vhEl, 'osc90d<−0.25 仅 58%——扣漂移后常为负超额');
      draw(pb, ps, T);
    }

    tEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 结构漂移对照器 ══ */
  (function ssrStruct() {
    var eraEl = $('ssr_era');
    if (!eraEl) return;
    var eraO = $('ssr_eraO');
    var rawEl = $('ssr_raw'), rawHEl = $('ssr_rawh');
    var oscEl = $('ssr_osc'), oscHEl = $('ssr_osch');
    var vEl = $('ssr_struct_v'), vhEl = $('ssr_struct_vh');
    var cv = $('ssrStructChart');

    var eras = [
      { y: '2018 底', ssr: 87.73, osc: -0.567, note: '购买力仅 1.14%——与 2022 不可横比' },
      { y: '2020 夏', ssr: 188, osc: -0.841, note: '前 2022 均值 ~188【分析】' },
      { y: '2022 底', ssr: 4.12, osc: -0.567, note: '购买力 24.3%——结构跃迁' },
      { y: '2024 顶', ssr: 11, osc: 0.597, note: 'ETF 需求绕过稳定币——振荡器仍高' },
      { y: '2026 常态', ssr: 9.36, osc: -0.265, note: 'SSR 9.36 但 USDT 净流出【待验证】' }
    ];

    function draw(idx) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxS = 200;
      var barW = iw / eras.length * 0.55;
      eras.forEach(function (e, i) {
        var cx = pad.l + (i + 0.5) * (iw / eras.length);
        var bh = (Math.min(e.ssr, maxS) / maxS) * ih * 0.85;
        var col = e.ssr > 50 ? '#b8730a' : '#0f8a4d';
        ctx.fillStyle = i === idx ? '#1d4ed8' : col;
        ctx.globalAlpha = i === idx ? 1 : 0.55;
        ctx.fillRect(cx - barW / 2, y1 - bh, barW, bh);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#454c56';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(e.ssr < 20 ? e.ssr.toFixed(1) : Math.round(e.ssr), cx, y1 - bh - 6);
        ctx.fillStyle = '#7c848f';
        ctx.fillText(e.y, cx, y1 + 13);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('各周期绝对 SSR（柱高）——须配振荡器', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var idx = parseInt(eraEl.value, 10);
      var e = eras[idx];
      txt(eraO, e.y);
      txt(rawEl, e.ssr < 20 ? e.ssr.toFixed(2) : String(Math.round(e.ssr)));
      txt(rawHEl, '绝对 SSR');
      txt(oscEl, (e.osc >= 0 ? '+' : '') + e.osc.toFixed(3));
      tint(oscEl, e.osc >= 0.5 ? '#d5342c' : e.osc <= -0.25 ? '#0f8a4d' : '#454c56');
      txt(oscHEl, '对应振荡器读数【待验证】');
      txt(vEl, e.ssr > 50 ? '前 2022 高绝对值' : '后 2022 低绝对值');
      tint(vEl, e.ssr > 50 ? '#b8730a' : '#0f8a4d');
      txt(vhEl, e.note);
      draw(idx);
    }

    eraEl.addEventListener('input', update);
    update();
  })();
})();
