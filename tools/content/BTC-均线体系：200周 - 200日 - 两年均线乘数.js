/* ============================================================
   《BTC-均线体系：200周 / 200日 / 两年均线乘数》主题脚本
   四个可调模型：
     1. 三线体制仪表盘   — 200D / 200W / 2yr MA 相对位置
     2. 200 日趋势过滤器 — 价 vs 200D + 斜率判定
     3. 200 周地板距离计 — 价/200W 比值与历史分位
     4. 两年均线乘数区   — Philip Swift 2yr MA × N
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

  function pBase(mu, sig, T) {
    return ncdf(mu * (T / 252) / (sig * Math.sqrt(T / 252)));
  }

  function sampleN(pb, ps) {
    var z196 = 1.96, z84 = 0.84;
    var num = z196 * Math.sqrt(pb * (1 - pb)) + z84 * Math.sqrt(ps * (1 - ps));
    return Math.ceil(Math.pow(num, 2) / Math.pow(ps - pb, 2));
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
    return '$' + v.toFixed(0);
  }

  function regime200d(pct, slopeUp) {
    if (pct >= 50) return { t: '过热延伸', c: '#d5342c', h: '历史晚期牛市区' };
    if (pct >= 10 && slopeUp) return { t: '健康牛市', c: '#0f8a4d', h: '+10%~+50% · 趋势向上' };
    if (pct >= -5 && pct < 10) return { t: '趋势争夺', c: '#b8730a', h: '±5% · 假突破高发' };
    if (pct >= -20) return { t: '熊市结构', c: '#1d4ed8', h: '低于 200D · 多数熊市在此' };
    return { t: 'Capitulation', c: '#0f8a4d', h: '<−20% · 历史底区' };
  }

  function zone2yr(ratio, mult) {
    if (ratio < 1) return { t: '积累区', c: '#0f8a4d', h: '价 < 2yr MA · Swift 买入区' };
    if (ratio < mult * 0.6) return { t: '中性区', c: '#1d4ed8', h: '2yr MA ~ 2yr×' + mult + ' 之间' };
    if (ratio < mult) return { t: '偏热区', c: '#b8730a', h: '接近 ' + mult + '× 上轨' };
    return { t: '周期顶区', c: '#d5342c', h: '≥ ' + mult + '× · 历史止盈参考' };
  }

  /* ══ 工具 1 · 三线体制仪表盘 ══ */
  (function tripleDash() {
    var priceEl = $('ma_price'), dEl = $('ma_200d'), wEl = $('ma_200w'), yEl = $('ma_2yr');
    if (!priceEl || !dEl || !wEl || !yEl) return;
    var priceO = $('ma_priceO'), dO = $('ma_200dO'), wO = $('ma_200wO'), yO = $('ma_2yrO');
    var rD = $('ma_rD'), rDh = $('ma_rDh');
    var rW = $('ma_rW'), rWh = $('ma_rWh');
    var rY = $('ma_rY'), rYh = $('ma_rYh');
    var align = $('ma_align'), alignh = $('ma_alignh');
    var vEl = $('ma_triple_v'), vhEl = $('ma_triple_vh');
    var cv = $('ma_tripleChart');

    function draw(ratios) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var labels = ['200D', '200W', '2yr'];
      var cols = ['#1d4ed8', '#b8730a', '#0f8a4d'];
      var maxR = 2.0;
      var barH = ih / 4;
      ratios.forEach(function (r, i) {
        var y = pad.t + i * (barH + 14);
        var bw = Math.min(r.r, maxR) / maxR * iw;
        ctx.fillStyle = '#f4f6f9';
        ctx.fillRect(pad.l, y, iw, barH);
        ctx.fillStyle = cols[i];
        ctx.fillRect(pad.l, y, bw, barH);
        ctx.fillStyle = '#15181d';
        ctx.font = 'bold 11px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(labels[i], 8, y + barH * 0.65);
        ctx.textAlign = 'right';
        ctx.fillText(r.r.toFixed(3) + '×', pad.l + iw + 4, y + barH * 0.65);
        ctx.strokeStyle = '#c9d0d9';
        ctx.setLineDash([3, 3]);
        var x1 = pad.l + (1 / maxR) * iw;
        ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1, y + barH); ctx.stroke();
        ctx.setLineDash([]);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('价格 ÷ 各均线（虚线 = 1.0×）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var price = parseFloat(priceEl.value);
      var maD = parseFloat(dEl.value);
      var maW = parseFloat(wEl.value);
      var maY = parseFloat(yEl.value);
      if (maD <= 0 || maW <= 0 || maY <= 0) return;
      var rd = price / maD;
      var rw = price / maW;
      var ry = price / maY;
      txt(priceO, fmtUsd(price));
      txt(dO, fmtUsd(maD));
      txt(wO, fmtUsd(maW));
      txt(yO, fmtUsd(maY));
      txt(rD, rd.toFixed(3) + '×');
      txt(rDh, ((rd - 1) * 100 >= 0 ? '+' : '') + ((rd - 1) * 100).toFixed(1) + '%');
      txt(rW, rw.toFixed(3) + '×');
      txt(rWh, ((rw - 1) * 100 >= 0 ? '+' : '') + ((rw - 1) * 100).toFixed(1) + '%');
      txt(rY, ry.toFixed(3) + '×');
      txt(rYh, ((ry - 1) * 100 >= 0 ? '+' : '') + ((ry - 1) * 100).toFixed(1) + '%');
      var bull = rd > 1 && rw > 1 && ry > 1;
      var bear = rd < 1 && rw < 1;
      var alignTxt = bull ? '三线多头（价>三均线）' : bear ? '双线下破（D+W）' : '均线分歧';
      var alignCol = bull ? '#0f8a4d' : bear ? '#d5342c' : '#b8730a';
      txt(align, alignTxt);
      tint(align, alignCol);
      txt(alignh, bull ? '宏观牛市结构' : bear ? '需防深跌' : '慢牛/调整常见');
      txt(vEl, bull ? '体制偏多 · 200D 作回撤支撑' : bear ? '体制偏空 · 200W 为下一锚' : '体制混合 · 看 200D 斜率');
      tint(vEl, alignCol);
      txt(vhEl, '200D=' + rd.toFixed(2) + ' · 200W=' + rw.toFixed(2) + ' · 2yr=' + ry.toFixed(2));
      draw([{ r: rd }, { r: rw }, { r: ry }]);
    }

    [priceEl, dEl, wEl, yEl].forEach(function (el) {
      el.addEventListener('input', update);
    });
    update();
  })();

  /* ══ 工具 2 · 200 日趋势过滤器 ══ */
  (function filter200d() {
    var pctEl = $('ma_d_pct'), slopeEl = $('ma_d_slope');
    if (!pctEl || !slopeEl) return;
    var pctO = $('ma_d_pctO'), slopeO = $('ma_d_slopeO');
    var regEl = $('ma_d_reg'), reghEl = $('ma_d_regh');
    var sigEl = $('ma_d_sig'), sighEl = $('ma_d_sigh');
    var vEl = $('ma_d_v'), vhEl = $('ma_d_vh');
    var cv = $('ma_dChart');

    function draw(pct) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var bands = [
        { lo: -60, hi: -20, col: '#e8f5ee' },
        { lo: -20, hi: -5, col: '#eaf0ff' },
        { lo: -5, hi: 10, col: '#fff7e6' },
        { lo: 10, hi: 50, col: '#e8f5ee' },
        { lo: 50, hi: 90, col: '#fdf3f2' }
      ];
      var minP = -60, maxP = 90;
      var sx = function (v) { return pad.l + ((v - minP) / (maxP - minP)) * iw; };
      bands.forEach(function (b) {
        ctx.fillStyle = b.col;
        ctx.fillRect(sx(b.lo), pad.t, sx(b.hi) - sx(b.lo), ih);
      });
      [-20, -5, 10, 50].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = '#c9d0d9';
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((ref > 0 ? '+' : '') + ref + '%', x, y1 + 13);
      });
      var mx = sx(pct);
      ctx.strokeStyle = '#15181d';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#15181d';
      ctx.beginPath(); ctx.arc(mx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((pct >= 0 ? '+' : '') + pct.toFixed(1) + '%', mx, pad.t + ih * 0.5 - 12);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('相对 200 日均线偏离', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var pct = parseFloat(pctEl.value);
      var slopeUp = parseInt(slopeEl.value, 10) === 1;
      txt(pctO, (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%');
      txt(slopeO, slopeUp ? '上行' : '下行');
      var reg = regime200d(pct, slopeUp);
      txt(regEl, reg.t);
      tint(regEl, reg.c);
      txt(reghEl, reg.h);
      var longSig = pct > 0 && slopeUp;
      var cashSig = pct < 0 && !slopeUp;
      txt(sigEl, longSig ? '持有多头/定投' : cashSig ? '现金/减仓参考' : '观望 · 等周线确认');
      tint(sigEl, longSig ? '#0f8a4d' : cashSig ? '#d5342c' : '#b8730a');
      txt(sighEl, '周收盘确认可减少假突破');
      txt(vEl, longSig ? '200D 过滤器：多头' : cashSig ? '200D 过滤器：空头' : '200D 过滤器：中性');
      tint(vEl, longSig ? '#0f8a4d' : cashSig ? '#d5342c' : '#b8730a');
      txt(vhEl, '偏离 ' + pct.toFixed(1) + '% · 斜率' + (slopeUp ? '↑' : '↓'));
      draw(pct);
    }

    [pctEl, slopeEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 3 · 200 周地板距离计 ══ */
  (function floor200w() {
    var ratioEl = $('ma_w_ratio');
    if (!ratioEl) return;
    var ratioO = $('ma_w_ratioO');
    var distEl = $('ma_w_dist'), disthEl = $('ma_w_disth');
    var histEl = $('ma_w_hist'), histhEl = $('ma_w_histh');
    var vEl = $('ma_w_v'), vhEl = $('ma_w_vh');
    var cv = $('ma_wChart');

    function histLabel(r) {
      if (r < 0.75) return { t: '极端低估', c: '#0f8a4d', h: '2022-11 最深 ~0.66×' };
      if (r < 0.95) return { t: '地板测试', c: '#0f8a4d', h: '2015/2018/2022 底区' };
      if (r < 1.05) return { t: '贴线震荡', c: '#b8730a', h: '2026-06 曾周线跌破' };
      if (r < 1.5) return { t: '牛市常态', c: '#1d4ed8', h: '多数牛市在此区间' };
      if (r < 2.5) return { t: '周期偏热', c: '#b8730a', h: '2024-03 约 2.28×' };
      return { t: '历史过热', c: '#d5342c', h: '2017/2021 极端带' };
    }

    function draw(ratio) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minR = 0.5, maxR = 3.0;
      var sx = function (v) { return pad.l + ((v - minR) / (maxR - minR)) * iw; };
      var zones = [
        { lo: 0.5, hi: 0.95, col: '#e8f5ee' },
        { lo: 0.95, hi: 1.05, col: '#fff7e6' },
        { lo: 1.05, hi: 2.5, col: '#eaf0ff' },
        { lo: 2.5, hi: 3.0, col: '#fdf3f2' }
      ];
      zones.forEach(function (z) {
        ctx.fillStyle = z.col;
        ctx.fillRect(sx(z.lo), pad.t, sx(z.hi) - sx(z.lo), ih);
      });
      [0.68, 1.0, 2.28].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref === 1 ? '#15181d' : '#c9d0d9';
        ctx.setLineDash(ref === 1 ? [] : [4, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ref + '×', x, y1 + 13);
      });
      var mx = sx(Math.min(Math.max(ratio, minR), maxR));
      ctx.strokeStyle = '#b8730a';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#b8730a';
      ctx.beginPath(); ctx.arc(mx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('价格 ÷ 200 周均线', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var ratio = parseFloat(ratioEl.value);
      var pct = (ratio - 1) * 100;
      txt(ratioO, ratio.toFixed(3) + '×');
      txt(distEl, (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%');
      tint(distEl, pct >= 0 ? '#0f8a4d' : '#d5342c');
      txt(disthEl, ratio < 1 ? '周线收盘低于 200W' : '高于慢速地板');
      var hist = histLabel(ratio);
      txt(histEl, hist.t);
      tint(histEl, hist.c);
      txt(histhEl, hist.h);
      txt(vEl, ratio < 1 ? '地板被破 · 非铁底' : ratio < 1.5 ? '长期多头结构' : '远离地板 · 回撤风险升');
      tint(vEl, hist.c);
      txt(vhEl, '历史约 8.7% 周线收盘低于 200W【Galaxy】');
      draw(ratio);
    }

    ratioEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 两年均线乘数区 ══ */
  (function mult2yr() {
    var priceEl = $('ma_2y_price'), maEl = $('ma_2y_ma'), multEl = $('ma_2y_mult');
    if (!priceEl || !maEl || !multEl) return;
    var priceO = $('ma_2y_priceO'), maO = $('ma_2y_maO'), multO = $('ma_2y_multO');
    var ratioEl = $('ma_2y_ratio'), ratiohEl = $('ma_2y_ratioh');
    var topEl = $('ma_2y_top'), tophEl = $('ma_2y_toph');
    var zoneEl = $('ma_2y_zone'), zonehEl = $('ma_2y_zoneh');
    var vEl = $('ma_2y_v'), vhEl = $('ma_2y_vh');
    var cv = $('ma_2yChart');

    function draw(price, ma, mult, ratio) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 16, t: 28, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var yBot = pad.t + ih * 0.72;
      var yTop = pad.t + ih * 0.18;
      var x0 = pad.l, x1 = pad.l + iw;
      ctx.fillStyle = '#e8f5ee';
      ctx.fillRect(x0, yBot - 8, iw, ih * 0.28 + 8);
      ctx.fillStyle = '#fdf3f2';
      ctx.fillRect(x0, pad.t, iw, ih * 0.22 + 8);
      ctx.strokeStyle = '#0f8a4d';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0, yBot); ctx.lineTo(x1, yBot); ctx.stroke();
      ctx.strokeStyle = '#d5342c';
      ctx.beginPath(); ctx.moveTo(x0, yTop); ctx.lineTo(x1, yTop); ctx.stroke();
      ctx.fillStyle = '#0f8a4d';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('2yr MA ' + fmtUsd(ma), x0 + 4, yBot + 14);
      ctx.fillStyle = '#d5342c';
      ctx.fillText(mult + '× = ' + fmtUsd(ma * mult), x0 + 4, yTop - 6);
      var logLo = Math.log(ma * 0.5);
      var logHi = Math.log(ma * mult * 1.2);
      var logP = Math.log(price);
      var py = pad.t + ih - ((logP - logLo) / (logHi - logLo)) * ih;
      py = Math.max(pad.t + 4, Math.min(y1 - 4, py));
      ctx.fillStyle = '#15181d';
      ctx.beginPath(); ctx.arc(pad.l + iw * 0.55, py, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(fmtUsd(price) + ' (' + ratio.toFixed(2) + '×)', pad.l + iw * 0.55 + 12, py + 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Philip Swift 2yr MA 乘数带', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var price = parseFloat(priceEl.value);
      var ma = parseFloat(maEl.value);
      var mult = parseFloat(multEl.value);
      if (ma <= 0) return;
      var ratio = price / ma;
      var top = ma * mult;
      var pctTop = (price / top) * 100;
      txt(priceO, fmtUsd(price));
      txt(maO, fmtUsd(ma));
      txt(multO, mult.toFixed(1) + '×');
      txt(ratioEl, ratio.toFixed(3) + '×');
      txt(ratiohEl, ratio < 1 ? '低于绿线 · 积累' : '高于绿线');
      txt(topEl, fmtUsd(top));
      txt(tophEl, '现价 = 上轨的 ' + pctTop.toFixed(1) + '%');
      var z = zone2yr(ratio, mult);
      txt(zoneEl, z.t);
      tint(zoneEl, z.c);
      txt(zonehEl, z.h);
      txt(vEl, ratio < 1 ? 'Swift 买入参考区' : pctTop > 80 ? '接近止盈参考带' : '持有/定投常态区');
      tint(vEl, z.c);
      txt(vhEl, '2yr=' + ratio.toFixed(2) + '× · 顶轨=' + pctTop.toFixed(0) + '%');
      draw(price, ma, mult, ratio);
    }

    [priceEl, maEl, multEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 5 · 漂移剥离器（200D 策略胜率） ══ */
  (function driftStrip() {
    var TEl = $('ma_T'), psEl = $('ma_ps'), muEl = $('ma_mu'), sgEl = $('ma_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('ma_TO'), psO = $('ma_psO'), muO = $('ma_muO'), sgO = $('ma_sgO');
    var baseEl = $('ma_base'), basehEl = $('ma_baseh');
    var dpEl = $('ma_dp'), dphEl = $('ma_dph');
    var nEl = $('ma_n'), nhEl = $('ma_nh');
    var vEl = $('ma_drift_v'), vhEl = $('ma_drift_vh');
    var cv = $('ma_driftChart');

    function draw(T, pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 16, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var bx = pad.l, bw = iw * 0.35;
      var sx = pad.l + iw * 0.55;
      var bh = ih * pb, sh = ih * ps;
      ctx.fillStyle = '#eaf0ff';
      ctx.fillRect(bx, y1 - bh, bw, bh);
      ctx.fillStyle = '#e8f5ee';
      ctx.fillRect(sx, y1 - sh, bw, sh);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('基准 ' + (pb * 100).toFixed(1) + '%', bx + bw / 2, y1 + 12);
      ctx.fillText('信号 ' + (ps * 100).toFixed(1) + '%', sx + bw / 2, y1 + 12);
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.fillText('T=' + T + ' 日', pad.l + iw / 2, pad.t + 8);
    }

    function update() {
      var T = parseInt(TEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var pb = pBase(mu, sg, T);
      var excess = ps - pb;
      var n = sampleN(pb, ps);
      txt(TO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(1) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(basehEl, 'μ=' + (mu * 100).toFixed(0) + '% σ=' + (sg * 100).toFixed(0) + '%');
      txt(dpEl, (excess >= 0 ? '+' : '') + (excess * 100).toFixed(1) + ' pp');
      tint(dpEl, excess >= 3 ? '#0f8a4d' : excess >= 1 ? '#b8730a' : '#d5342c');
      txt(dphEl, excess < 2 ? '超额微弱 · 可能是漂移' : '有一定统计意义');
      txt(nEl, String(n));
      txt(nhEl, '80% 功效双尾检验');
      txt(vEl, excess < 2 ? '表面胜率≈随机持币' : excess < 5 ? '超额有限' : '需警惕过拟合');
      tint(vEl, excess < 2 ? '#d5342c' : '#b8730a');
      txt(vhEl, '200D 策略历史胜率仅 ~23%【Boring Edge】');
      draw(T, pb, ps);
    }

    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();
})();
