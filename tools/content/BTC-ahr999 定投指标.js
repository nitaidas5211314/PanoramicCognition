/* ============================================================
   《BTC-ahr999 定投指标》主题脚本
   四个可调模型：
     1. AHR999 公式计算器   — 现价 / GMA200 × 现价 / 指数增长估值
     2. 区间判定仪表盘      — 0.45 / 1.2 阈值与历史分布
     3. 漂移剥离器          — 抄底信号胜率 vs 随机持币基准
     4. 周期振幅压缩器      — 牛熊振幅收窄对阈值的影响
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  function expGrowth(coinAge) {
    if (coinAge <= 0) return NaN;
    return Math.pow(10, 5.84 * Math.log10(coinAge) - 17.01);
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

  function fmtUsd(v) {
    if (!isFinite(v)) return '—';
    if (v >= 1000) return '$' + Math.round(v).toLocaleString('en-US');
    return '$' + v.toFixed(2);
  }

  function zone(ahr) {
    if (ahr < 0.45) return { t: '抄底区', c: '#0f8a4d', h: '<0.45 · 历史约 8.5% 时间' };
    if (ahr < 1.2) return { t: '定投区', c: '#1d4ed8', h: '0.45–1.2 · 历史约 46.3% 时间' };
    if (ahr < 5) return { t: '谨慎区', c: '#b8730a', h: '1.2–5 · 历史约 29.3% 时间' };
    return { t: '泡沫区', c: '#d5342c', h: '>5 · 九神原框架不考虑卖出' };
  }

  /* ══ 工具 1 · AHR999 公式计算器 ══ */
  (function ahrCalc() {
    var priceEl = $('ahr_price'), gmaEl = $('ahr_gma'), ageEl = $('ahr_age');
    if (!priceEl || !gmaEl || !ageEl) return;
    var priceO = $('ahr_priceO'), gmaO = $('ahr_gmaO'), ageO = $('ahr_ageO');
    var r1El = $('ahr_r1'), r1hEl = $('ahr_r1h');
    var r2El = $('ahr_r2'), r2hEl = $('ahr_r2h');
    var fitEl = $('ahr_fit'), fithEl = $('ahr_fith');
    var ahrEl = $('ahr_val'), ahrhEl = $('ahr_valh');
    var vEl = $('ahr_v'), vhEl = $('ahr_vh');
    var cv = $('ahrChart');

    function draw(ahr) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxA = 6;
      var sx = function (v) { return pad.l + (Math.min(v, maxA) / maxA) * iw; };
      var bands = [
        { lo: 0, hi: 0.45, col: '#e8f5ee' },
        { lo: 0.45, hi: 1.2, col: '#eaf0ff' },
        { lo: 1.2, hi: 5, col: '#fff7e6' },
        { lo: 5, hi: maxA, col: '#fdf3f2' }
      ];
      bands.forEach(function (b) {
        ctx.fillStyle = b.col;
        ctx.fillRect(sx(b.lo), pad.t, sx(b.hi) - sx(b.lo), ih);
      });
      [0.45, 1.2, 5].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref === 0.45 ? '#0f8a4d' : ref === 1.2 ? '#1d4ed8' : '#d5342c';
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref), x, y1 + 13);
      });
      var mx = sx(ahr);
      ctx.strokeStyle = '#15181d';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#15181d';
      ctx.beginPath(); ctx.arc(mx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ahr.toFixed(3), mx, pad.t + ih * 0.5 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AHR999 指数', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var price = parseFloat(priceEl.value);
      var gma = parseFloat(gmaEl.value);
      var age = parseInt(ageEl.value, 10);
      var fitVal = expGrowth(age);
      if (gma <= 0 || fitVal <= 0) return;
      var r1 = price / gma;
      var r2 = price / fitVal;
      var ahr = r1 * r2;
      var z = zone(ahr);
      txt(priceO, fmtUsd(price));
      txt(gmaO, fmtUsd(gma));
      txt(ageO, age + ' 天');
      txt(r1El, r1.toFixed(3));
      txt(r1hEl, '现价 ÷ GMA200');
      txt(r2El, r2.toFixed(3));
      txt(r2hEl, '现价 ÷ 指数增长估值');
      txt(fitEl, fmtUsd(fitVal));
      txt(fithEl, '10^(5.84·log₁₀(币龄)−17.01)');
      txt(ahrEl, ahr.toFixed(3));
      txt(ahrhEl, '两比值之积');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(ahr);
    }

    priceEl.addEventListener('input', update);
    gmaEl.addEventListener('input', update);
    ageEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 区间判定仪表盘 ══ */
  (function ahrZone() {
    var ahrEl = $('ahr_z_val');
    if (!ahrEl) return;
    var ahrO = $('ahr_z_valO');
    var pctEl = $('ahr_z_pct'), pcthEl = $('ahr_z_pcth');
    var histEl = $('ahr_z_hist'), histhEl = $('ahr_z_histh');
    var vEl = $('ahr_z_v'), vhEl = $('ahr_z_vh');
    var cv = $('ahrZoneChart');

    function histPct(ahr) {
      if (ahr < 0.45) return 4.25;
      if (ahr < 1.2) return 27.4;
      if (ahr < 5) return 65;
      return 92;
    }

    function draw(ahr) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 16, t: 28, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var bars = [
        { lo: 0, hi: 0.45, pct: 8.5, col: '#0f8a4d', label: '抄底' },
        { lo: 0.45, hi: 1.2, pct: 46.3, col: '#1d4ed8', label: '定投' },
        { lo: 1.2, hi: 5, pct: 29.3, col: '#b8730a', label: '谨慎' },
        { lo: 5, hi: 12, pct: 15.9, col: '#d5342c', label: '>5' }
      ];
      var maxA = 12;
      var sx = function (v) { return pad.l + (v / maxA) * iw; };
      bars.forEach(function (b) {
        var x0 = sx(b.lo), x1 = sx(b.hi);
        ctx.fillStyle = b.col + '33';
        ctx.fillRect(x0, pad.t, x1 - x0, ih);
        ctx.fillStyle = b.col;
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.label + ' ' + b.pct + '%', (x0 + x1) / 2, pad.t + 14);
      });
      var mx = sx(Math.min(ahr, maxA));
      ctx.strokeStyle = '#15181d';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('当前 ' + ahr.toFixed(2), mx, y1 - 6);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('历史时间占比（九神 2019 统计）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var ahr = parseFloat(ahrEl.value);
      var z = zone(ahr);
      var hp = histPct(ahr);
      txt(ahrO, ahr.toFixed(2));
      txt(pctEl, hp.toFixed(1) + '%');
      txt(pcthEl, '近似历史分位（5 年滚动参考）');
      txt(histEl, z.t);
      tint(histEl, z.c);
      txt(histhEl, z.h);
      txt(vEl, ahr < 0.45 ? '深度低估' : ahr < 1.2 ? '可定投' : '偏热');
      tint(vEl, z.c);
      txt(vhEl, 'Cycle 4 顶仅 ~1.16，上阈已失效');
      draw(ahr);
    }

    ahrEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function ahrDrift() {
    var TEl = $('ahr_T'), psEl = $('ahr_ps'), muEl = $('ahr_mu'), sgEl = $('ahr_sg');
    if (!TEl || !psEl) return;
    var TO = $('ahr_TO'), psO = $('ahr_psO'), muO = $('ahr_muO'), sgO = $('ahr_sgO');
    var baseEl = $('ahr_base'), basehEl = $('ahr_baseh');
    var dpEl = $('ahr_dp'), dphEl = $('ahr_dph');
    var nEl = $('ahr_n'), nhEl = $('ahr_nh');
    var vEl = $('ahr_v3'), vhEl = $('ahr_v3h');
    var cv = $('ahrDriftChart');

    function sampleN(pb, ps) {
      var diff = ps - pb;
      if (diff <= 0.001) return Infinity;
      var z = 1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps));
      return Math.ceil((z * z) / (diff * diff));
    }

    function draw(T, pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 16, t: 20, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var pts = [];
      for (var t = 5; t <= 365; t += 5) {
        var tt = t / 252;
        var mu = parseFloat(muEl.value) / 100;
        var sg = parseFloat(sgEl.value) / 100;
        pts.push({ t: t, p: ncdf(mu * tt / (sg * Math.sqrt(tt))) });
      }
      var maxP = 0.95;
      var sx = function (t) { return pad.l + (t / 365) * iw; };
      var sy = function (p) { return pad.t + ih - (p / maxP) * ih; };
      ctx.strokeStyle = '#c9d0d9';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#7c848f';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pad.l, sy(0.5));
      ctx.lineTo(w - pad.r, sy(0.5));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = '#454c56';
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(sx(p.t), sy(p.p));
        else ctx.lineTo(sx(p.t), sy(p.p));
      });
      ctx.stroke();
      var tx = sx(T);
      var ty = sy(pb);
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(tx, ty, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(tx, sy(ps), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('持有期（日）', pad.l + iw / 2, h - 8);
    }

    function update() {
      var T = parseInt(TEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var tt = T / 252;
      var pb = ncdf(mu * tt / (sg * Math.sqrt(tt)));
      var dp = (ps - pb) * 100;
      var n = sampleN(pb, ps);
      txt(TO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(0) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(basehEl, '随机持币 p_base');
      txt(dpEl, (dp >= 0 ? '+' : '') + dp.toFixed(1) + ' pp');
      tint(dpEl, dp >= 3 ? '#0f8a4d' : dp >= 0 ? '#b8730a' : '#d5342c');
      txt(dphEl, '信号胜率 − 基准');
      txt(nEl, isFinite(n) ? String(n) : '∞');
      txt(nhEl, '证明 6pp 超额所需次数');
      var verdict = dp >= 6 ? '超额显著' : dp >= 2 ? '超额有限' : '接近基准';
      txt(vEl, verdict);
      tint(vEl, dp >= 6 ? '#0f8a4d' : '#b8730a');
      txt(vhEl, 'ahr999<0.45 底信号历史有效，但顶信号已失效');
      draw(T, pb, ps);
    }

    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 4 · 周期振幅压缩器 ══ */
  (function ahrAmp() {
    var botEl = $('ahr_amp_bot'), topEl = $('ahr_amp_top');
    if (!botEl || !topEl) return;
    var botO = $('ahr_amp_botO'), topO = $('ahr_amp_topO');
    var ratioEl = $('ahr_amp_ratio'), ratiohEl = $('ahr_amp_ratioh');
    var ahrBotEl = $('ahr_amp_ahrbot'), ahrTopEl = $('ahr_amp_ahrtop');
    var vEl = $('ahr_amp_v'), vhEl = $('ahr_amp_vh');
    var cv = $('ahrAmpChart');

    function draw(bot, top, amp) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 16, t: 28, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var cycles = [
        { name: 'C1', amp: 22, bot: 0.3, top: 12 },
        { name: 'C2', amp: 11, bot: 0.35, top: 6.5 },
        { name: 'C3', amp: 6, bot: 0.42, top: 2.7 },
        { name: 'C4', amp: amp, bot: bot, top: top }
      ];
      var maxAmp = 24;
      var barW = iw / cycles.length * 0.6;
      var gap = iw / cycles.length;
      cycles.forEach(function (c, i) {
        var cx = pad.l + gap * i + gap / 2;
        var bh = (c.amp / maxAmp) * ih;
        var col = i === 3 ? '#1d4ed8' : '#c9d0d9';
        ctx.fillStyle = col;
        ctx.fillRect(cx - barW / 2, y1 - bh, barW, bh);
        ctx.fillStyle = '#454c56';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.name, cx, y1 + 13);
        ctx.fillText(c.amp.toFixed(1) + '×', cx, y1 - bh - 6);
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.fillText(c.bot + '–' + c.top, cx, y1 - bh - 18);
      });
      ctx.strokeStyle = '#0f8a4d';
      ctx.setLineDash([3, 3]);
      var y045 = y1 - (0.45 / 12) * ih * (24 / maxAmp);
      ctx.beginPath(); ctx.moveTo(pad.l, y045); ctx.lineTo(w - pad.r, y045); ctx.stroke();
      ctx.strokeStyle = '#d5342c';
      var y12 = y1 - (1.2 / 12) * ih * (24 / maxAmp);
      ctx.beginPath(); ctx.moveTo(pad.l, y12); ctx.lineTo(w - pad.r, y12); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('周期振幅（牛顶 ahr ÷ 熊底 ahr 近似）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var bot = parseFloat(botEl.value);
      var top = parseFloat(topEl.value);
      if (bot <= 0) return;
      var amp = top / bot;
      txt(botO, bot.toFixed(2));
      txt(topO, top.toFixed(2));
      txt(ratioEl, amp.toFixed(1) + '×');
      txt(ratiohEl, '振幅 = 顶 ÷ 底');
      txt(ahrBotEl, bot.toFixed(2));
      txt(ahrTopEl, top.toFixed(2));
      var msg = amp < 3 ? '阈值几乎无法区分牛熊' : amp < 8 ? '上阈 1.2 可能失效' : '阈值区分度尚可';
      txt(vEl, msg);
      tint(vEl, amp < 3 ? '#d5342c' : '#b8730a');
      txt(vhEl, 'Cycle 4 振幅 ~2×，ATH 时 ahr 仅 1.16');
      draw(bot, top, amp);
    }

    botEl.addEventListener('input', update);
    topEl.addEventListener('input', update);
    update();
  })();
})();
