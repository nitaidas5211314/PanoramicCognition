/* ============================================================
   《美元指数》主题脚本
   四个可调模型：

     1. DXY 篮子复制器   成分汇率变动 → DXY 水平与变化
     2. 欧元权重分解器   同一冲击下 DXY vs 广义指数差异
     3. 利差传导器       美欧利差 × 期限 → 隐含 USD 变动
     4. 周期定位器       相对历史高低点的位置

   自包含 IIFE。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', ink3: '#7c848f', ink2: '#454c56'
  };

  var K = 50.14348112;
  var W = { EUR: -0.576, JPY: 0.136, GBP: -0.119, CAD: 0.091, SEK: 0.042, CHF: 0.036 };
  var BASE = { EUR: 1.172, JPY: 147.5, GBP: 1.348, CAD: 1.385, SEK: 9.52, CHF: 0.798 };
  var D0 = dxy(BASE);
  var NORM = 100 / D0;

  function dxy(r) {
    return K * Math.pow(r.EUR, W.EUR) * Math.pow(r.JPY, W.JPY) *
      Math.pow(r.GBP, W.GBP) * Math.pow(r.CAD, W.CAD) *
      Math.pow(r.SEK, W.SEK) * Math.pow(r.CHF, W.CHF);
  }

  function fit(cv, cssH) {
    if (!cv) return null;
    var dpr = window.devicePixelRatio || 1;
    var w = Math.max(240, cv.clientWidth || (cv.parentNode && cv.parentNode.clientWidth) || 640);
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(cssH * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: cssH };
  }
  function clear(g) { if (g) g.ctx.clearRect(0, 0, g.w, g.h); }
  function num(v) { return parseFloat(v); }
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  /* ══════════════════════════════════════════════════════════
     工具 1 · DXY 篮子复制器
     ══════════════════════════════════════════════════════════ */
  (function basket() {
    var eurEl = $('bx_eur'), jpyEl = $('bx_jpy'), gbpEl = $('bx_gbp');
    if (!eurEl || !jpyEl || !gbpEl) return;
    var eurO = $('bx_eurO'), jpyO = $('bx_jpyO'), gbpO = $('bx_gbpO');
    var dxyEl = $('bx_dxy'), chgEl = $('bx_chg');
    var dxyhEl = $('bx_dxyh'), chghEl = $('bx_chgh');
    var vEl = $('bx_v'), vhEl = $('bx_vh');
    var cv = $('bxChart');

    function rates(eurC, jpyC, gbpC) {
      return {
        EUR: BASE.EUR * (1 + eurC / 100),
        JPY: BASE.JPY * (1 + jpyC / 100),
        GBP: BASE.GBP * (1 + gbpC / 100),
        CAD: BASE.CAD, SEK: BASE.SEK, CHF: BASE.CHF
      };
    }

    function upd() {
      var eurC = num(eurEl.value), jpyC = num(jpyEl.value), gbpC = num(gbpEl.value);
      var d = dxy(rates(eurC, jpyC, gbpC));
      var norm = d * NORM;
      var chg = (d / D0 - 1) * 100;

      txt(eurO, (eurC >= 0 ? '+' : '') + eurC.toFixed(1) + '%');
      txt(jpyO, (jpyC >= 0 ? '+' : '') + jpyC.toFixed(1) + '%');
      txt(gbpO, (gbpC >= 0 ? '+' : '') + gbpC.toFixed(1) + '%');
      txt(dxyEl, norm.toFixed(2));
      txt(dxyhEl, '基准归一化 100 = 当前篮子水平');
      txt(chgEl, (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%');
      txt(chghEl, '相对基准篮子的几何加权变化');

      var label, hint, col;
      if (chg > 1.5) {
        label = '美元走强'; hint = '成分汇率变动综合指向 DXY 上行——但需核对是否与广义指数一致';
        col = 'var(--red)';
      } else if (chg < -1.5) {
        label = '美元走弱'; hint = '欧元/英镑升值或日元贬值（USDJPY↓）通常拖累 DXY';
        col = 'var(--green)';
      } else {
        label = '窄幅波动'; hint = '三大权重合计 83%，小幅变动往往被欧元主导';
        col = 'var(--blue)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(eurC, jpyC, gbpC);
    }

    function draw(eurC, jpyC, gbpC) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, Ww = g.w, h = g.h;
      clear(g);
      var pl = 52, pr = 16, y1 = h - 46, bw = Ww - pl - pr;
      var comps = [
        { n: 'EUR', w: 57.6, c: eurC, col: C.red },
        { n: 'JPY', w: 13.6, c: jpyC, col: C.blue },
        { n: 'GBP', w: 11.9, c: gbpC, col: C.amber }
      ];
      var maxC = 5;
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 18) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxC * i / 4 - maxC / 2).toFixed(1) + '%', pl - 4, yy + 3);
      }
      var barW = bw / comps.length * 0.55;
      comps.forEach(function (c, idx) {
        var x = pl + idx * (bw / comps.length) + barW * 0.22;
        var bh = Math.abs(c.c) / maxC * (y1 - 22);
        var y = c.c >= 0 ? y1 - bh : y1;
        ctx.fillStyle = c.c >= 0 ? C.green : C.red;
        ctx.fillRect(x, y, barW, bh || 1);
        ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(c.n + ' ' + c.w.toFixed(0) + '%', x + barW / 2, y1 + 13);
      });
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('成分 3 个月变动（%）· 正值=该货币对美元升值', pl + bw / 2, y1 + 31);
    }

    [eurEl, jpyEl, gbpEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 欧元权重分解器
     DXY 变动 vs 广义指数近似变动
     ══════════════════════════════════════════════════════════ */
  (function decomp() {
    var eurEl = $('dc_eur');
    if (!eurEl) return;
    var eurO = $('dc_eurO');
    var dxyEl = $('dc_dxy'), broadEl = $('dc_broad'), gapEl = $('dc_gap');
    var dxyhEl = $('dc_dxyh'), broadhEl = $('dc_broadh'), gaphEl = $('dc_gaph');
    var vEl = $('dc_v'), vhEl = $('dc_vh');

    var EUR_DXY = 0.576, EUR_BROAD = 0.173;

    function upd() {
      var eurC = num(eurEl.value);
      var r = {
        EUR: BASE.EUR * (1 + eurC / 100),
        JPY: BASE.JPY, GBP: BASE.GBP, CAD: BASE.CAD, SEK: BASE.SEK, CHF: BASE.CHF
      };
      var dxyChg = (dxy(r) / D0 - 1) * 100;
      var broadChg = -EUR_BROAD * eurC;
      var gap = dxyChg - broadChg;

      txt(eurO, (eurC >= 0 ? '+' : '') + eurC.toFixed(1) + '%');
      txt(dxyEl, (dxyChg >= 0 ? '+' : '') + dxyChg.toFixed(2) + '%');
      txt(dxyhEl, 'DXY 几何公式 · 欧元权重 57.6%');
      txt(broadEl, (broadChg >= 0 ? '+' : '') + broadChg.toFixed(2) + '%');
      txt(broadhEl, 'Fed 广义指数近似 · 欧元权重 ~17.3%【待验证】');
      txt(gapEl, (gap >= 0 ? '+' : '') + gap.toFixed(2) + 'pp');
      txt(gaphEl, 'DXY 相对广义的「过度反应」');

      var label, hint, col;
      if (Math.abs(gap) > 2) {
        label = '指数失真显著'; hint = '仅看 DXY 会高估/低估美元对全球贸易伙伴的整体强弱';
        col = 'var(--red)';
      } else if (Math.abs(gap) > 0.8) {
        label = '权重偏差可见'; hint = '欧洲冲击占 DXY 波动大部分，但只占广义指数一小部分';
        col = 'var(--amber)';
      } else {
        label = '冲击较小'; hint = '欧元变动 <1% 时两指数差异不大';
        col = 'var(--blue)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }

    eurEl.addEventListener('input', upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 利差传导器
     简化 UIP：ΔUSD% ≈ spread × months/12
     ══════════════════════════════════════════════════════════ */
  (function carry() {
    var usEl = $('cr_us'), eaEl = $('cr_ea'), moEl = $('cr_mo');
    if (!usEl || !eaEl || !moEl) return;
    var usO = $('cr_usO'), eaO = $('cr_eaO'), moO = $('cr_moO');
    var sprEl = $('cr_spr'), implEl = $('cr_impl');
    var sprhEl = $('cr_sprh'), implhEl = $('cr_implh');
    var vEl = $('cr_v'), vhEl = $('cr_vh');
    var cv = $('crChart');

    function upd() {
      var us = num(usEl.value), ea = num(eaEl.value), mo = num(moEl.value);
      var spr = us - ea;
      var impl = spr * mo / 12;

      txt(usO, us.toFixed(2) + '%');
      txt(eaO, ea.toFixed(2) + '%');
      txt(moO, mo.toFixed(0) + ' 月');
      txt(sprEl, (spr >= 0 ? '+' : '') + spr.toFixed(2) + 'pp');
      txt(sprhEl, '美欧政策利率差（简化 2 年期代理）');
      txt(implEl, (impl >= 0 ? '+' : '') + impl.toFixed(2) + '%');
      txt(implhEl, '未覆盖利差平价隐含 USD 变动（线性近似）');

      var label, hint, col;
      if (spr > 1.5) {
        label = '美元有支撑'; hint = '正利差通常吸引资本流入、支撑 DXY——但需扣除风险溢价与干预';
        col = 'var(--red)';
      } else if (spr < -0.5) {
        label = '美元承压'; hint = '欧央行利率高于美联储时，EUR/USD 往往获支撑';
        col = 'var(--green)';
      } else {
        label = '利差中性'; hint = '2026 年美欧政策「大体持稳」假设下，利差非主驱动【分析】';
        col = 'var(--blue)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(mo, impl);
    }

    function draw(mo, impl) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, Ww = g.w, h = g.h;
      clear(g);
      var pl = 46, pr = 16, y1 = h - 46, bw = Ww - pl - pr;
      var maxM = 24, maxI = 4;
      var pts = [];
      for (var m = 1; m <= maxM; m++) {
        var us = num(usEl.value), ea = num(eaEl.value);
        pts.push({ m: m, v: (us - ea) * m / 12 });
      }
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 18) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((-maxI + maxI * 2 * i / 4).toFixed(0) + '%', pl - 4, yy + 3);
      }
      ctx.beginPath(); ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
      pts.forEach(function (p, idx) {
        var x = pl + (p.m / maxM) * bw;
        var y = y1 - ((p.v + maxI) / (2 * maxI)) * (y1 - 22);
        if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var cx = pl + (mo / maxM) * bw;
      var cy = y1 - ((impl + maxI) / (2 * maxI)) * (y1 - 22);
      ctx.fillStyle = C.red;
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('持有期限（月）', pl + bw / 2, y1 + 13);
      ctx.fillText('隐含 USD 变动（%）', pl + bw / 2, y1 + 31);
    }

    [usEl, eaEl, moEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 周期定位器
     ══════════════════════════════════════════════════════════ */
  (function cycle() {
    var lvlEl = $('cy_lvl');
    if (!lvlEl) return;
    var lvlO = $('cy_lvlO');
    var peakEl = $('cy_peak'), troughEl = $('cy_trough'), pctEl = $('cy_pct');
    var peakhEl = $('cy_peakh'), troughhEl = $('cy_troughh'), pcthEl = $('cy_pcth');
    var vEl = $('cy_v'), vhEl = $('cy_vh');
    var cv = $('cyChart');

    var PEAK = 114.0, TROUGH = 89.0, REF = 100.0;

    function upd() {
      var lvl = num(lvlEl.value);
      var fromPeak = (lvl / PEAK - 1) * 100;
      var fromTrough = (lvl / TROUGH - 1) * 100;
      var pctile = ((lvl - TROUGH) / (PEAK - TROUGH)) * 100;

      txt(lvlO, lvl.toFixed(1));
      txt(peakEl, (fromPeak >= 0 ? '+' : '') + fromPeak.toFixed(1) + '%');
      txt(peakhEl, '相对 2022 年高点 ~114');
      txt(troughEl, (fromTrough >= 0 ? '+' : '') + fromTrough.toFixed(1) + '%');
      txt(troughhEl, '相对 2008 年低点 ~89【待验证】');
      txt(pctEl, pctile.toFixed(0) + '%');
      txt(pcthEl, '在 89–114 区间内的历史分位（简化）');

      var label, hint, col;
      if (lvl >= 105) {
        label = '偏强区间'; hint = '接近 2022–2023 高位——利差与避险需求通常支撑';
        col = 'var(--red)';
      } else if (lvl <= 95) {
        label = '偏弱区间'; hint = '2025 年跌破 100 后震荡——降息周期与财政担忧压制';
        col = 'var(--green)';
      } else {
        label = '中性震荡'; hint = '96–100 是 2025–2026 主流区间【分析】';
        col = 'var(--blue)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(lvl, pctile);
    }

    function draw(lvl, pctile) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, Ww = g.w, h = g.h;
      clear(g);
      var pl = 46, pr = 16, y1 = h - 46, bw = Ww - pl - pr;
      var yMin = 85, yMax = 120;

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 18) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((yMin + (yMax - yMin) * i / 4).toFixed(0), pl - 4, yy + 3);
      }

      var milestones = [
        { y: 89, lab: '2008', col: C.green },
        { y: 100, lab: '基准', col: C.ink3 },
        { y: 114, lab: '2022', col: C.red }
      ];
      milestones.forEach(function (m) {
        var yy = y1 - ((m.y - yMin) / (yMax - yMin)) * (y1 - 22);
        ctx.strokeStyle = m.col; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = m.col; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(m.lab + ' ~' + m.y, pl + bw - 58, yy - 4);
      });

      var curY = y1 - ((lvl - yMin) / (yMax - yMin)) * (y1 - 22);
      ctx.fillStyle = C.blue;
      ctx.beginPath(); ctx.arc(pl + bw * 0.72, curY, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('DXY 水平', pl + bw / 2, y1 + 13);
      ctx.fillText('历史参考带（89–114）', pl + bw / 2, y1 + 31);
    }

    lvlEl.addEventListener('input', upd);
    upd();
  })();
})();
