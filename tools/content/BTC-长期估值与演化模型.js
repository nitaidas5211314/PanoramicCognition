/* ============================================================
   《BTC-长期估值与演化模型》主题脚本
   四个可调模型：
     1. 漂移剥离器    — 随机持币基准 vs 模型「胜率」
     2. 流动供给压力  — 简化 Rudd-Porter 均衡价
     3. 矿工成本地板  — hashprice 与电力成本
     4. 减半稀缺时钟  — stock / flow / S2F 演化
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

  /* ══ 工具 1 · 漂移剥离器 ══ */
  (function driftStrip() {
    var TEl = $('btc_T'), psEl = $('btc_ps'), muEl = $('btc_mu'), sgEl = $('btc_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('btc_TO'), psO = $('btc_psO'), muO = $('btc_muO'), sgO = $('btc_sgO');
    var baseEl = $('btc_base'), baseHEl = $('btc_baseh');
    var dpEl = $('btc_dp'), dpHEl = $('btc_dph');
    var nEl = $('btc_n'), nHEl = $('btc_nh');
    var vEl = $('btc_v'), vhEl = $('btc_vh');
    var cv = $('btcDriftChart');
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
        { label: '模型报告胜率', p: ps, col: '#1d4ed8' }
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
      txt(baseHEl, '漂移 ' + (drift * 100).toFixed(2) + '% · 波动 ' +
                   (sd * 100).toFixed(2) + '% · ' + T + ' 日');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp <= 0 ? 'var(--red)' : (dp < 0.03 ? 'var(--amber)' : 'var(--green)'));
      txt(dpHEl, dp <= 0 ? '模型没有跑赢"什么都不做"' : '扣除漂移后的净优势');
      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nHEl, n === null ? '超额非正' : '单侧 5%、检验力 80%');
      var label, hint, col;
      if (dp <= 0) { label = '无超额'; hint = '扣掉漂移后跑输随机持币'; col = 'var(--red)'; }
      else if (dp < 0.03) { label = '超额可疑'; hint = '很容易被交易成本与样本内过拟合吃掉'; col = 'var(--red)'; }
      else if (dp < 0.06) { label = '超额有限'; hint = '远小于表面胜率暗示的幅度'; col = 'var(--amber)'; }
      else { label = '超额可观'; hint = '仍须核对样本外与制度摩擦'; col = 'var(--green)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(pb, ps);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 2 · 流动供给压力 ══ */
  (function liquidSupply() {
    var L0El = $('liq_L0'), LEl = $('liq_L'), rhoEl = $('liq_rho'), DEl = $('liq_D');
    if (!L0El || !LEl || !rhoEl || !DEl) return;
    var L0O = $('liq_L0O'), LO = $('liq_LO'), rhoO = $('liq_rhoO'), DO = $('liq_DO');
    var pEl = $('liq_p'), pHEl = $('liq_ph');
    var mEl = $('liq_m'), mHEl = $('liq_mh');
    var vEl = $('liq_v'), vhEl = $('liq_vh');
    var cv = $('liqChart');
    var P0 = 64858;

    function draw(L0, L, rho, D, price) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 18, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var pts = [], i, lq;
      for (i = 0; i <= 40; i++) {
        lq = L0 - (L0 - L) * i / 40;
        if (lq < 1e6) lq = 1e6;
        var pr = P0 * Math.pow(L0 / lq, 1 / rho) * (D / 20);
        pts.push({ lq: lq / 1e6, pr: pr });
      }
      var maxP = Math.max.apply(null, pts.map(function (p) { return p.pr; }));
      var minP = Math.min(P0 * 0.5, Math.min.apply(null, pts.map(function (p) { return p.pr; })));
      var sx = function (lq) { return pad.l + (lq - 8) / (L0 / 1e6 - 8) * iw; };
      var sy = function (pr) { return pad.t + (1 - (pr - minP) / (maxP - minP)) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (i = 0; i <= 4; i++) {
        var gy = pad.t + ih * i / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, j) {
        var x = sx(p.lq), y = sy(p.pr);
        if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var cx = sx(L / 1e6), cy = sy(price);
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('8M', pad.l, y1 + 13);
      ctx.fillText((L0 / 1e6).toFixed(0) + 'M', w - pad.r, y1 + 13);
      ctx.fillText('流动供给（百万 BTC）', pad.l + iw / 2, y1 + 31);
    }

    function upd() {
      var L0 = parseFloat(L0El.value) * 1e6;
      var L = parseFloat(LEl.value) * 1e6;
      var rho = parseFloat(rhoEl.value);
      var D = parseFloat(DEl.value);
      txt(L0O, (L0 / 1e6).toFixed(1) + 'M');
      txt(LO, (L / 1e6).toFixed(1) + 'M');
      txt(rhoO, rho.toFixed(2));
      txt(DO, D.toFixed(0));
      var price = P0 * Math.pow(L0 / L, 1 / rho) * (D / 20);
      var mult = price / P0;
      txt(pEl, '$' + Math.round(price).toLocaleString('en-US'));
      txt(pHEl, '相对 2024 减半基准 × ' + mult.toFixed(2));
      txt(mEl, '×' + mult.toFixed(2));
      txt(mHEl, 'ρ 越小 → 供给收缩对价格越敏感');
      var label, hint, col;
      if (L < 2e6) { label = '右尾区'; hint = 'Rudd-Porter：L<2M 时超线性风险集中'; col = 'var(--red)'; }
      else if (mult > 50) { label = '极度乐观'; hint = '参数组合已接近论文右尾情景'; col = 'var(--amber)'; }
      else if (mult > 5) { label = '强稀缺溢价'; hint = '需求与供给收缩同时成立时的均衡'; col = 'var(--green)'; }
      else { label = '温和溢价'; hint = '供给机制 alone 解释不了大牛市'; col = 'var(--blue)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(L0, L, rho, D, price);
    }
    [L0El, LEl, rhoEl, DEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 3 · 矿工成本地板 ══ */
  (function minerFloor() {
    var hEl = $('mn_hash'), eEl = $('mn_elec'), effEl = $('mn_eff'), pEl = $('mn_price');
    if (!hEl || !eEl || !effEl || !pEl) return;
    var hO = $('mn_hashO'), eO = $('mn_elecO'), effO = $('mn_effO'), pO = $('mn_priceO');
    var cEl = $('mn_cost'), cHEl = $('mn_costh');
    var mEl = $('mn_margin'), mHEl = $('mn_marginh');
    var bEl = $('mn_be'), bHEl = $('mn_beh');
    var vEl = $('mn_v'), vhEl = $('mn_vh');

    function upd() {
      var hashprice = parseFloat(hEl.value);
      var elec = parseFloat(eEl.value) / 100;
      var eff = parseFloat(effEl.value);
      var btcP = parseFloat(pEl.value);
      txt(hO, '$' + hashprice.toFixed(0) + '/PH/天');
      txt(eO, '¥' + (elec * 7.2).toFixed(2) + '/kWh');
      txt(effO, eff.toFixed(0) + ' J/TH');
      txt(pO, '$' + btcP.toLocaleString('en-US'));
      var kwPerPH = eff * 1000 / 1000;
      var dailyElec = kwPerPH * 24 * elec;
      var margin = hashprice - dailyElec;
      var blocksPerDay = 144;
      var subsidy = 3.125;
      var fees = 0.027;
      var dailySubsidyUSD = (subsidy + fees) * blocksPerDay * btcP;
      var networkPH = 1.1e6;
      var impliedHashprice = dailySubsidyUSD / networkPH;
      var breakEvenPrice = dailyElec * networkPH / ((subsidy + fees) * blocksPerDay);
      txt(cEl, '$' + dailyElec.toFixed(2) + '/PH/天');
      txt(cHEl, '电力成本 · 隐含 hashprice $' + impliedHashprice.toFixed(1));
      txt(mEl, (margin >= 0 ? '+' : '') + '$' + margin.toFixed(2));
      tint(mEl, margin >= 0 ? 'var(--green)' : 'var(--red)');
      txt(mHEl, margin >= 0 ? '当前 hashprice 高于电力成本' : '挖矿现金亏损');
      txt(bEl, '$' + Math.round(breakEvenPrice).toLocaleString('en-US'));
      txt(bHEl, '仅覆盖电力、不含设备折旧');
      var label, hint, col;
      if (margin < 0) { label = '亏损开采'; hint = '2025 年 Q4 hashprice 曾低至 $35/PH/天'; col = 'var(--red)'; }
      else if (margin < 15) { label = '盈亏平衡'; hint = 'CoinShares：Q2 公开矿企现金成本约 $74,600/BTC'; col = 'var(--amber)'; }
      else { label = '有现金利润'; hint = '不等于全成本盈利——折旧与融资另算'; col = 'var(--green)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }
    [hEl, eEl, effEl, pEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══ 工具 4 · 减半稀缺时钟 ══ */
  (function halvingClock() {
    var yEl = $('hl_years');
    if (!yEl) return;
    var yO = $('hl_yearsO');
    var sEl = $('hl_stock'), fEl = $('hl_flow'), sfEl = $('hl_sf');
    var sHEl = $('hl_stockh'), fHEl = $('hl_flowh'), sfHEl = $('hl_sfh');
    var vEl = $('hl_v'), vhEl = $('hl_vh');
    var cv = $('hlChart');

    function stockAtYear(y) {
      var start = 19.69, daily = 450, halv = [0, 4, 8, 12, 16, 20, 24, 28, 32];
      var stock = start, day = 0, hi = 0;
      while (day < y * 365) {
        var reward = 3.125 / Math.pow(2, hi);
        stock += reward * 144;
        day += 1;
        if (day % (210000 / 144 * 1) === 0 && hi < 3) hi++;
      }
      return { stock: stock, flow: 450 / Math.pow(2, Math.min(3, Math.floor(y / 4))) };
    }

    function draw(y) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 46, r: 16, t: 18, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var pts = [], i, t;
      for (i = 0; i <= y; i++) {
        var st = stockAtYear(i);
        pts.push({ t: i, sf: st.stock * 1e6 / (st.flow * 365) });
      }
      var maxSF = Math.max.apply(null, pts.map(function (p) { return p.sf; }));
      var sx = function (t) { return pad.l + t / y * iw; };
      var sy = function (sf) { return pad.t + (1 - sf / maxSF) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (i = 0; i <= 4; i++) {
        var gy = pad.t + ih * i / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, j) {
        var x = sx(p.t), yy = sy(p.sf);
        if (j === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      });
      ctx.stroke();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('0', pad.l, y1 + 13);
      ctx.fillText(y + ' 年', w - pad.r, y1 + 13);
      ctx.fillText('距 2024 减半（年）', pad.l + iw / 2, y1 + 31);
    }

    function upd() {
      var y = parseFloat(yEl.value);
      txt(yO, y.toFixed(0) + ' 年');
      var st = stockAtYear(y);
      var sf = st.stock * 1e6 / (st.flow * 365);
      txt(sEl, st.stock.toFixed(2) + 'M');
      txt(sHEl, '总存量 · 硬顶 21M');
      txt(fEl, st.flow.toFixed(0) + ' BTC/天');
      txt(fHEl, '第 ' + (Math.floor(y / 4) + 5) + ' 次减半后');
      txt(sfEl, sf.toFixed(0));
      txt(sfHEl, 'Shelton：S2F 与 log(时间) 相关 80.57%');
      var label = sf > 200 ? 'S2F 陡升' : 'S2F 缓升';
      var hint = sf > 200 ? '稀缺叙事最强——也是伪回归风险最高' : '供给冲击边际递减';
      txt(vEl, label); txt(vhEl, hint);
      tint(vEl, sf > 200 ? 'var(--amber)' : 'var(--blue)');
      draw(y);
    }
    yEl.addEventListener('input', upd);
    window.addEventListener('resize', upd);
    upd();
  })();
})();
