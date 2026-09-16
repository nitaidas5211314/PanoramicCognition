/* ============================================================
   《BTC-1-yr+ HODL Wave（钻石手占比）》主题脚本
   四个可调模型：
     1. 1yr+ 占比仪表盘   — 钻石手占比与历史区间判定
     2. 成熟滞后计算器    — 新积累多久才进入 1yr+ 波段
     3. 漂移剥离器        — 信号胜率 vs 随机持币基准
     4. 老化流动模拟器    — aged-in vs spent-out 双轨推演
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

  /* ══ 工具 1 · 1yr+ 占比仪表盘 ══ */
  (function hodlShare() {
    var pctEl = $('hodl_share_pct');
    if (!pctEl) return;
    var pctO = $('hodl_share_pctO');
    var youngEl = $('hodl_share_young');
    var btcEl = $('hodl_share_btc');
    var vEl = $('hodl_share_v'), vhEl = $('hodl_share_vh');
    var cv = $('hodlShareChart');
    var SUPPLY = 19.95;

    function zone(p) {
      if (p >= 68) return { t: '历史高位区', c: '#0f8a4d', h: '结构性漂移+积累主导；警惕「永远涨」叙事' };
      if (p >= 62) return { t: '偏厚钻石手', c: '#1d4ed8', h: '2026-06 VanEck 报 61.4%——处于偏厚区间' };
      if (p >= 55) return { t: '中性偏厚', c: '#454c56', h: '牛顶派发期常见回落至此带' };
      if (p >= 48) return { t: '派发活跃', c: '#b8730a', h: '老币换手→年轻带膨胀；非必然见顶' };
      return { t: '极端换手', c: '#d5342c', h: '1yr+ 骤降常伴牛市末段 LTH 减持' };
    }

    function draw(p) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var sx = function (v) { return pad.l + (v / 100) * iw; };
      var bands = [
        { lo: 0, hi: 48, col: '#fdf3f2' },
        { lo: 48, hi: 55, col: '#fff7e6' },
        { lo: 55, hi: 62, col: '#f4f6f9' },
        { lo: 62, hi: 68, col: '#eaf0ff' },
        { lo: 68, hi: 100, col: '#f2f7f4' }
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
      [48, 55, 62, 68].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = '#c9d0d9';
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ref + '%', x, y1 + 13);
      });
      var mx = sx(p);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(mx, pad.t + ih * 0.55, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.toFixed(1) + '%', mx, pad.t + ih * 0.55 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('1yr+ 供应占比', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var p = parseFloat(pctEl.value);
      var z = zone(p);
      var young = 100 - p;
      var btcM = SUPPLY * p / 100;
      txt(pctO, p.toFixed(1) + '%');
      txt(youngEl, young.toFixed(1) + '%');
      txt(btcEl, btcM.toFixed(2) + 'M BTC');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(p);
    }
    pctEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 成熟滞后计算器 ══ */
  (function hodlLag() {
    var accEl = $('hodl_lag_acc'), spendEl = $('hodl_lag_spend'), startEl = $('hodl_lag_start');
    if (!accEl) return;
    var accO = $('hodl_lag_accO'), spendO = $('hodl_lag_spendO'), startO = $('hodl_lag_startO');
    var monthsEl = $('hodl_lag_months'), deltaEl = $('hodl_lag_delta');
    var vEl = $('hodl_lag_v'), vhEl = $('hodl_lag_vh');

    function update() {
      var acc = parseFloat(accEl.value) / 100;
      var spend = parseFloat(spendEl.value) / 100;
      var start = parseFloat(startEl.value) / 100;
      var young = 1 - start;
      var months = 0;
      var p = start;
      while (months < 60) {
        var agedIn = young * acc;
        var spentOut = p * spend;
        young = young - agedIn + spentOut;
        p = p + agedIn - spentOut;
        months++;
        if (p >= start + 0.03) break;
      }
      var delta = (p - start) * 100;
      txt(accO, (acc * 100).toFixed(1) + '%/月');
      txt(spendO, (spend * 100).toFixed(1) + '%/月');
      txt(startO, (start * 100).toFixed(1) + '%');
      txt(monthsEl, String(months));
      txt(deltaEl, '+' + delta.toFixed(1) + ' pp');
      if (months >= 12) {
        txt(vEl, '滞后 ≥1 年');
        tint(vEl, '#b8730a');
        txt(vhEl, '新积累需满 365 天才计入 1yr+——指标天生慢变量');
      } else {
        txt(vEl, '净积累加速');
        tint(vEl, '#0f8a4d');
        txt(vhEl, '积累速率 > 派发速率时 1yr+ 持续增厚');
      }
    }
    [accEl, spendEl, startEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function hodlDrift() {
    var TEl = $('hodl_T'), psEl = $('hodl_ps'), muEl = $('hodl_mu'), sgEl = $('hodl_sg');
    if (!TEl) return;
    var TO = $('hodl_TO'), psO = $('hodl_psO'), muO = $('hodl_muO'), sgO = $('hodl_sgO');
    var baseEl = $('hodl_base'), dpEl = $('hodl_dp'), nEl = $('hodl_n');
    var basehEl = $('hodl_baseh'), dphEl = $('hodl_dph'), nhEl = $('hodl_nh');
    var vEl = $('hodl_v3'), vhEl = $('hodl_v3h');
    var cv = $('hodlDriftChart');

    function sampleN(pb, ps) {
      var num = Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2);
      var den = Math.pow(ps - pb, 2);
      return Math.ceil(num / den);
    }

    function draw(T, pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 16, b: 32 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 32;
      var maxP = 95;
      var sx = function (v) { return pad.l + (v / maxP) * iw; };
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(sx(pb), pad.t, sx(maxP) - sx(pb), ih);
      ctx.strokeStyle = '#c9d0d9';
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(sx(pb), pad.t); ctx.lineTo(sx(pb), y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('基准 ' + (pb * 100).toFixed(1) + '%', sx(pb), y1 + 12);
      var bx = sx(ps * 100);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(sx(pb * 100), pad.t + ih * 0.35, bx - sx(pb * 100), ih * 0.3);
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('信号 ' + (ps * 100).toFixed(1) + '%', (sx(pb * 100) + bx) / 2, pad.t + ih * 0.52);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.fillText('胜率对比（' + T + ' 日持有）', pad.l + iw / 2, y1 + 24);
    }

    function update() {
      var T = parseInt(TEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var pb = ncdf(mu * (T / 252) / (sg * Math.sqrt(T / 252)));
      var dp = (ps - pb) * 100;
      var n = sampleN(pb, ps);
      txt(TO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(1) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(dpEl, (dp >= 0 ? '+' : '') + dp.toFixed(1) + ' pp');
      tint(dpEl, dp >= 5 ? '#0f8a4d' : dp >= 2 ? '#b8730a' : '#454c56');
      txt(nEl, String(n));
      txt(basehEl, 'μ=' + (mu * 100).toFixed(0) + '% σ=' + (sg * 100).toFixed(0) + '% 随机做多');
      txt(dphEl, dp < 3 ? '超额微弱——可能只是漂移' : '需 n≥' + n + ' 才显著');
      txt(nhEl, 'α=0.05, power=0.8');
      if (dp < 2) { txt(vEl, '超额可忽略'); tint(vEl, '#d5342c'); txt(vhEl, '「高 1yr+ 买入」未必跑赢随机持币'); }
      else if (dp < 5) { txt(vEl, '超额有限'); tint(vEl, '#b8730a'); txt(vhEl, '样本量不足时勿过度解读'); }
      else { txt(vEl, '超额可观'); tint(vEl, '#0f8a4d'); txt(vhEl, '仍须多信号交叉验证'); }
      draw(T, pb, ps);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 4 · 老化流动模拟器 ══ */
  (function hodlFlow() {
    var matEl = $('hodl_flow_mat'), spendEl = $('hodl_flow_spend'), startEl = $('hodl_flow_start');
    if (!matEl) return;
    var matO = $('hodl_flow_matO'), spendO = $('hodl_flow_spendO'), startO = $('hodl_flow_startO');
    var endEl = $('hodl_flow_end'), agedEl = $('hodl_flow_aged'), spentEl = $('hodl_flow_spent');
    var vEl = $('hodl_flow_v'), vhEl = $('hodl_flow_vh');
    var cv = $('hodlFlowChart');

    function simulate(mat, spend, start, months) {
      var young = 1 - start, old = start;
      var agedTotal = 0, spentTotal = 0;
      var series = [old * 100];
      for (var m = 1; m <= months; m++) {
        var agedIn = young * mat;
        var spentOut = old * spend;
        agedTotal += agedIn;
        spentTotal += spentOut;
        young = young - agedIn + spentOut;
        old = old + agedIn - spentOut;
        series.push(old * 100);
      }
      return { series: series, agedTotal: agedTotal, spentTotal: spentTotal, end: old * 100 };
    }

    function draw(series) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var T = series.length - 1;
      var lo = Math.min.apply(null, series) - 2;
      var hi = Math.max.apply(null, series) + 2;
      var sy = function (v) { return pad.t + ih * (1 - (v - lo) / (hi - lo)); };
      var sx = function (i) { return pad.l + (i / T) * iw; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        var gv = lo + (hi - lo) * (1 - gi / 4);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(gv.toFixed(0) + '%', pad.l - 4, gy + 4);
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      series.forEach(function (v, i) {
        if (i === 0) ctx.moveTo(sx(i), sy(v));
        else ctx.lineTo(sx(i), sy(v));
      });
      ctx.stroke();
      var last = series[series.length - 1];
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(sx(T), sy(last), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('月数', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var mat = parseFloat(matEl.value) / 100;
      var spend = parseFloat(spendEl.value) / 100;
      var start = parseFloat(startEl.value) / 100;
      var months = 24;
      var r = simulate(mat, spend, start, months);
      txt(matO, (mat * 100).toFixed(1) + '%/月');
      txt(spendO, (spend * 100).toFixed(1) + '%/月');
      txt(startO, (start * 100).toFixed(1) + '%');
      txt(endEl, r.end.toFixed(1) + '%');
      txt(agedEl, (r.agedTotal * 100).toFixed(1) + ' pp');
      txt(spentEl, (r.spentTotal * 100).toFixed(1) + ' pp');
      var ratio = r.spentTotal > 0 ? r.agedTotal / r.spentTotal : 99;
      if (ratio > 1.2) {
        txt(vEl, '积累主导');
        tint(vEl, '#0f8a4d');
        txt(vhEl, 'aged-in > spent-out——1yr+ 趋势向上');
      } else if (ratio < 0.8) {
        txt(vEl, '派发主导');
        tint(vEl, '#d5342c');
        txt(vhEl, '老币换手>成熟——牛市末段特征');
      } else {
        txt(vEl, '均衡换手');
        tint(vEl, '#454c56');
        txt(vhEl, '占比变化缓慢——勿过度交易');
      }
      draw(r.series);
    }
    [matEl, spendEl, startEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();
})();
