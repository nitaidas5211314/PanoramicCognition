/* ============================================================
   《BTC-S2F 存流量比模型》主题脚本
   四个可调模型：
     1. S2F 定价器      — stock / flow → S2F → PlanB 幂律价
     2. 伪趋势探测器    — S2F 估计 vs log(时间) 共线演示
     3. 漂移剥离器      — 减半/持币策略胜率 vs 随机持币基准
     4. 减半稀缺时钟    — 历次减半 S2F 阶梯演化
   PlanB 幂律：P = exp(−1.84) · S2F^3.36（2019 回归系数）
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  function planB(s2f) {
    if (s2f <= 0) return 0;
    return Math.exp(-1.84) * Math.pow(s2f, 3.36);
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

  /* ══ 工具 1 · S2F 定价器 ══ */
  (function s2fPricer() {
    var stockEl = $('s2f_stock'), rewardEl = $('s2f_reward'), actualEl = $('s2f_actual');
    if (!stockEl || !rewardEl || !actualEl) return;
    var stockO = $('s2f_stockO'), rewardO = $('s2f_rewardO'), actualO = $('s2f_actualO');
    var ratioEl = $('s2f_ratio'), ratioHEl = $('s2f_ratioh');
    var modelEl = $('s2f_model'), modelHEl = $('s2f_modelh');
    var deflEl = $('s2f_defl'), deflHEl = $('s2f_deflh');
    var vEl = $('s2f_v'), vhEl = $('s2f_vh');
    var cv = $('s2fPriceChart');

    function draw(s2f, model, actual) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 20, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var refs = [
        { label: '白银 ~22', s2f: 22, col: '#8a6d1f' },
        { label: '黄金 ~62', s2f: 62, col: '#b8730a' },
        { label: '当前 S2F', s2f: s2f, col: '#1d4ed8' }
      ];
      var maxS2F = Math.max(130, s2f * 1.05);
      var sx = function (v) { return pad.l + (v / maxS2F) * iw; };
      var prices = refs.map(function (r) { return planB(r.s2f); });
      prices.push(model, actual);
      var maxP = Math.max.apply(null, prices.filter(function (p) { return p > 0; }));
      var minP = Math.min.apply(null, prices.filter(function (p) { return p > 0; })) * 0.5;
      var sy = function (p) {
        if (p <= 0) return y1;
        return pad.t + (1 - (Math.log(p) - Math.log(minP)) / (Math.log(maxP) - Math.log(minP))) * ih;
      };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      refs.forEach(function (r) {
        var x = sx(r.s2f);
        ctx.strokeStyle = r.col;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = r.col;
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(r.label, x, pad.t - 6);
      });
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      var pts = [];
      for (var i = 0; i <= 40; i++) {
        var sf = 1 + (maxS2F - 1) * i / 40;
        pts.push({ sf: sf, p: planB(sf) });
      }
      pts.forEach(function (p, j) {
        var x = sx(p.sf), y = sy(p.p);
        if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var mx = sx(s2f), my = sy(model);
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill();
      var ax = sx(Math.min(s2f, maxS2F * 0.85)), ay = sy(actual);
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(ax, ay, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('0', pad.l, y1 + 13);
      ctx.fillText(Math.round(maxS2F), w - pad.r, y1 + 13);
      ctx.fillText('S2F 比率（对数纵轴 = 模型价）', pad.l + iw / 2, y1 + 31);
      ctx.fillStyle = '#1d4ed8';
      ctx.textAlign = 'left';
      ctx.fillText('● 模型价', pad.l + 4, pad.t + 12);
      ctx.fillStyle = '#d5342c';
      ctx.fillText('● 现货价', pad.l + 72, pad.t + 12);
    }

    function upd() {
      var stock = parseFloat(stockEl.value) * 1e6;
      var reward = parseFloat(rewardEl.value);
      var actual = parseFloat(actualEl.value);
      var flow = reward * 144 * 365;
      var s2f = stock / flow;
      var model = planB(s2f);
      var ratio = actual / model;
      txt(stockO, (stock / 1e6).toFixed(2) + 'M');
      txt(rewardO, reward + ' BTC/块');
      txt(actualO, fmtUSD(actual));
      txt(ratioEl, s2f.toFixed(1));
      txt(ratioHEl, '年产 ' + Math.round(flow).toLocaleString('en-US') + ' · 日产 ' + Math.round(reward * 144));
      txt(modelEl, fmtUSD(model));
      txt(modelHEl, 'P = e^−1.84 · S2F^3.36');
      txt(deflEl, (ratio * 100).toFixed(1) + '%');
      tint(deflEl, ratio >= 1 ? 'var(--red)' : 'var(--green)');
      txt(deflHEl, ratio >= 1 ? '现货高于模型（罕见）' : '现货低于模型（2022 后常态）');
      var label, hint, col;
      if (ratio < 0.15) {
        label = '严重折价'; hint = '模型隐含价远高于现货——样本外已多次 falsify';
        col = 'var(--green)';
      } else if (ratio < 0.6) {
        label = '显著折价'; hint = '2021 顶后典型区间；勿把 in-sample 拟合当因果';
        col = 'var(--amber)';
      } else if (ratio <= 1.05) {
        label = '贴近模型'; hint = '仅 in-sample 或极端牛市短暂出现';
        col = 'var(--red)';
      } else {
        label = '高于模型'; hint = '现货溢价——模型未捕捉到需求冲击';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(s2f, model, actual);
    }
    [stockEl, rewardEl, actualEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 2 · 伪趋势探测器 ══ */
  (function spuriousTrend() {
    var yearEl = $('s2f_year');
    if (!yearEl) return;
    var yearO = $('s2f_yearO');
    var corrEl = $('s2f_corr'), corrHEl = $('s2f_corrh');
    var vEl = $('s2f_v2'), vhEl = $('s2f_v2h');
    var cv = $('s2fSpurChart');

    function s2fAtYear(y) {
      var halvings = Math.floor((y + 0.5) / 4);
      if (halvings < 0) halvings = 0;
      if (halvings > 6) halvings = 6;
      var reward = 50 / Math.pow(2, halvings);
      var stock = 19.8 - (2028 - (2009 + y)) * 0.164;
      if (stock < 0.1) stock = 0.1 + y * 0.05;
      if (y <= 4) stock = 0.5 + y * 0.35;
      else if (y <= 8) stock = 2 + (y - 4) * 1.2;
      else if (y <= 12) stock = 6.8 + (y - 8) * 1.5;
      else stock = 12.8 + (y - 12) * 0.55;
      if (y >= 15) stock = 19.69 - (2028 - (2009 + y)) * 0.164;
      var flow = reward * 144 * 365;
      return { s2f: stock * 1e6 / flow, logT: Math.log(365.25 * (y + 0.5)), model: planB(stock * 1e6 / flow) };
    }

    function draw(curY) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var pts = [];
      var i, d, minLT = Infinity, maxLT = -Infinity, minM = Infinity, maxM = -Infinity;
      for (i = 0; i <= 17; i++) {
        d = s2fAtYear(i);
        pts.push(d);
        minLT = Math.min(minLT, d.logT); maxLT = Math.max(maxLT, d.logT);
        minM = Math.min(minM, d.model); maxM = Math.max(maxM, d.model);
      }
      var sx = function (lt) { return pad.l + (lt - minLT) / (maxLT - minLT) * iw; };
      var sy = function (p) {
        return pad.t + (1 - (Math.log(p) - Math.log(minM)) / (Math.log(maxM) - Math.log(minM))) * ih;
      };
      ctx.strokeStyle = '#eef1f5';
      for (i = 0; i <= 4; i++) {
        var gy = pad.t + ih * i / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#8a6d1f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, j) {
        var x = sx(p.logT), y = sy(p.model);
        if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var cur = s2fAtYear(curY);
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.arc(sx(cur.logT), sy(cur.model), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('log(时间)', pad.l + iw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillText('黄线 = S2F 模型价 · 横轴 = log(创世以来天数)', pad.l, pad.t + 12);
    }

    function upd() {
      var y = parseFloat(yearEl.value);
      txt(yearO, (2009 + y) + ' 年');
      var pts = [], i, d, sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0, n = 0;
      for (i = 0; i <= 17; i++) {
        d = s2fAtYear(i);
        var x = d.logT, v = Math.log(d.model);
        pts.push({ x: x, y: v });
        sumX += x; sumY += v; sumXY += x * v; sumX2 += x * x; sumY2 += v * v; n++;
      }
      var num = n * sumXY - sumX * sumY;
      var den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
      var r = den > 0 ? num / den : 0;
      txt(corrEl, (r * 100).toFixed(1) + '%');
      txt(corrHEl, 'Shelton 2024 报告 S2F 估计与 log(时间) 相关 80.57%');
      var label, hint, col;
      if (r > 0.75) {
        label = '高度共线'; hint = '加入时间固定效应后 S2F 系数常归零——可能是伪回归';
        col = 'var(--red)';
      } else if (r > 0.5) {
        label = '中度共线'; hint = '模型价与日历时间难以分离';
        col = 'var(--amber)';
      } else {
        label = '共线较弱'; hint = '仍须样本外检验，不能只看相关系数';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(y);
    }
    yearEl.addEventListener('input', upd);
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function driftStrip() {
    var TEl = $('s2f_T'), psEl = $('s2f_ps'), muEl = $('s2f_mu'), sgEl = $('s2f_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('s2f_TO'), psO = $('s2f_psO'), muO = $('s2f_muO'), sgO = $('s2f_sgO');
    var baseEl = $('s2f_base'), baseHEl = $('s2f_baseh');
    var dpEl = $('s2f_dp'), dpHEl = $('s2f_dph');
    var nEl = $('s2f_n'), nHEl = $('s2f_nh');
    var vEl = $('s2f_v3'), vhEl = $('s2f_v3h');
    var cv = $('s2fDriftChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(pb, ps) {
      if (!ctx || !cv) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 176;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 108, r: 66, t: 30, b: 34 };
      var bw = w - pad.l - pad.r;
      var x0 = 0.40, x1 = 1.0;
      var sx = function (p) { return pad.l + (p - x0) / (x1 - x0) * bw; };
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      [0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(function (g) {
        var x = sx(g);
        ctx.strokeStyle = g === 0.5 ? '#c9d0d9' : '#eef1f5';
        ctx.lineWidth = g === 0.5 ? 1.4 : 1;
        ctx.beginPath(); ctx.moveTo(x, pad.t - 6); ctx.lineTo(x, h - pad.b); ctx.stroke();
        ctx.fillStyle = '#7c848f';
        ctx.fillText((g * 100).toFixed(0) + '%', x, h - pad.b + 15);
      });
      var rows = [
        { label: '随机持币基准', p: pb, col: '#8a6d1f' },
        { label: 'S2F 择时胜率', p: ps, col: '#1d4ed8' }
      ];
      rows.forEach(function (r, i) {
        var y = pad.t + 22 + i * 58;
        ctx.fillStyle = '#454c56';
        ctx.textAlign = 'right';
        ctx.font = '12px -apple-system,sans-serif';
        ctx.fillText(r.label, pad.l - 12, y + 17);
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pad.l, y, bw, 24);
        ctx.fillStyle = r.col;
        ctx.fillRect(pad.l, y, Math.max(0, sx(r.p) - pad.l), 24);
        ctx.fillStyle = r.col;
        ctx.textAlign = 'left';
        ctx.font = '700 12.5px -apple-system,sans-serif';
        ctx.fillText((r.p * 100).toFixed(1) + '%', sx(r.p) + 7, y + 17);
      });
      var dp = ps - pb;
      ctx.strokeStyle = dp >= 0 ? '#0f8a4d' : '#d5342c';
      ctx.lineWidth = 1.6;
      var ya = pad.t + 22 + 12, yb = pad.t + 22 + 58 + 12;
      ctx.beginPath();
      ctx.moveTo(sx(pb), ya + 14); ctx.lineTo(sx(pb), yb - 14);
      ctx.moveTo(sx(ps), ya + 14); ctx.lineTo(sx(ps), yb - 14);
      ctx.stroke();
      ctx.fillStyle = dp >= 0 ? '#0f8a4d' : '#d5342c';
      ctx.font = '700 11.5px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp',
                   (sx(pb) + sx(ps)) / 2, yb + 16);
    }

    function upd() {
      var T = parseFloat(TEl.value);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      txt(TO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(1) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      var y = T / 252, drift = mu * y, sd = sg * Math.sqrt(y);
      var pb = ncdf(drift / sd);
      var dp = ps - pb;
      var n = null;
      if (dp > 1e-6) {
        var num = 1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps));
        n = Math.ceil(num * num / (dp * dp));
      }
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, '漂移 ' + (drift * 100).toFixed(2) + '% · 波动 ' + (sd * 100).toFixed(2) + '%');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp <= 0 ? 'var(--red)' : (dp < 0.03 ? 'var(--amber)' : 'var(--green)'));
      txt(dpHEl, dp <= 0 ? 'S2F 择时未跑赢随机持币' : '扣除漂移后的净优势');
      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nHEl, n === null ? '超额非正' : '单侧 5%、检验力 80%');
      var label, hint, col;
      if (dp <= 0) { label = '无超额'; hint = '减半叙事≠可交易 alpha'; col = 'var(--red)'; }
      else if (dp < 0.03) { label = '超额可疑'; hint = '样本仅 4 次减半，极易过拟合'; col = 'var(--red)'; }
      else if (dp < 0.06) { label = '超额有限'; hint = '远小于社交媒体暗示的幅度'; col = 'var(--amber)'; }
      else { label = '超额可观'; hint = '仍须 walk-forward 与 time FE 复核'; col = 'var(--green)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(pb, ps);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 4 · 减半稀缺时钟 ══ */
  (function halvingClock() {
    var yearEl = $('s2f_hl_years');
    if (!yearEl) return;
    var yearO = $('s2f_hl_yearsO');
    var stockEl = $('s2f_hl_stock'), flowEl = $('s2f_hl_flow'), sfEl = $('s2f_hl_sf');
    var stockHEl = $('s2f_hl_stockh'), flowHEl = $('s2f_hl_flowh'), sfHEl = $('s2f_hl_sfh');
    var modelEl = $('s2f_hl_model'), modelHEl = $('s2f_hl_modelh');
    var vEl = $('s2f_hl_v'), vhEl = $('s2f_hl_vh');
    var cv = $('s2fHlChart');

    var eras = [
      { y: 0, reward: 50, label: '2009' },
      { y: 4, reward: 25, label: '2012' },
      { y: 8, reward: 12.5, label: '2016' },
      { y: 12, reward: 6.25, label: '2020' },
      { y: 15, reward: 3.125, label: '2024' },
      { y: 19, reward: 1.5625, label: '2028' },
      { y: 23, reward: 0.78125, label: '2032' }
    ];

    function state(yearsAfter2024) {
      var baseYear = 2024 + yearsAfter2024;
      var halvings = 4 + Math.floor(yearsAfter2024 / 4);
      if (halvings > 10) halvings = 10;
      var reward = 50 / Math.pow(2, halvings);
      var stock = 19.6875 + yearsAfter2024 * 0.164;
      var flowDay = reward * 144;
      var s2f = stock * 1e6 / (flowDay * 365);
      return { stock: stock, flowDay: flowDay, s2f: s2f, model: planB(s2f), reward: reward };
    }

    function draw(cur) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 24, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var pts = eras.map(function (e) {
        var st = state(e.y - 15);
        return { x: e.y, s2f: st.s2f, label: e.label };
      });
      var maxX = 24, maxS2F = 520;
      var sx = function (x) { return pad.l + x / maxX * iw; };
      var sy = function (sf) { return pad.t + (1 - sf / maxS2F) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxS2F * (1 - gi / 4)), pad.l - 6, gy + 4);
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, j) {
        var x = sx(p.x), y = sy(p.s2f);
        if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      pts.forEach(function (p) {
        ctx.fillStyle = '#1d4ed8';
        ctx.beginPath();
        ctx.arc(sx(p.x), sy(p.s2f), 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#454c56';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.label, sx(p.x), y1 + 13);
      });
      var cx = sx(Math.min(24, 15 + parseFloat(yearEl.value)));
      var cy = sy(cur.s2f);
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('距 2024 减半（年）', pad.l + iw / 2, y1 + 31);
    }

    function upd() {
      var y = parseFloat(yearEl.value);
      var st = state(y);
      txt(yearO, y + ' 年');
      txt(stockEl, st.stock.toFixed(2) + 'M');
      txt(stockHEl, '硬顶 21M · 年增 ~' + (st.flowDay * 365 / 1e6 * st.stock / st.stock).toFixed(3) + 'M');
      txt(flowEl, Math.round(st.flowDay) + ' BTC/天');
      txt(flowHEl, '块奖励 ' + st.reward + ' BTC');
      txt(sfEl, Math.round(st.s2f));
      txt(sfHEl, '减半约每 4 年 ×2');
      txt(modelEl, fmtUSD(st.model));
      txt(modelHEl, '幂律外推——非点预测');
      var label, hint, col;
      if (st.s2f < 80) {
        label = '低 S2F 时代'; hint = '2016–2020 区间；模型 in-sample 拟合最好';
        col = 'var(--amber)';
      } else if (st.s2f < 200) {
        label = '高 S2F 时代'; hint = '2024 减半后；模型价与现货裂口扩大';
        col = 'var(--red)';
      } else {
        label = '极高 S2F'; hint = '2028+ 外推；样本外可信度趋近于零';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(st);
    }
    yearEl.addEventListener('input', upd);
    window.addEventListener('resize', upd);
    upd();
  })();
})();
