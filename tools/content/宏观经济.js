/* ============================================================
   《宏观经济》主题脚本
   四个可调模型（全部真实参与计算）：

     1. 财政乘数        MPC → 乘数 → ΔY = m·ΔG
     2. 泰勒规则        通胀缺口 + 产出缺口 → 政策利率
     3. 债务动态        r、g、初级赤字 → 债务/GDP 路径
     4. 菲利普斯曲线    失业缺口 → 通胀（预期增强型）

   自包含 IIFE，与页面通用脚本互不干扰。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56'
  };

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
     工具 1 · 财政乘数
     ══════════════════════════════════════════════════════════ */
  (function fiscal() {
    var mpcEl = $('fm_mpc'), dGEl = $('fm_dG');
    if (!mpcEl || !dGEl) return;
    var mpcO = $('fm_mpcO'), dGO = $('fm_dGO');
    var multEl = $('fm_mult'), dYEl = $('fm_dY');
    var multhEl = $('fm_multh'), dYhEl = $('fm_dYh');
    var vEl = $('fm_v'), vhEl = $('fm_vh');
    var cv = $('fmChart');

    function upd() {
      var mpc = num(mpcEl.value) / 100;
      var dG = num(dGEl.value);
      var mult = 1 / (1 - mpc);
      var dY = mult * dG;

      txt(mpcO, (mpc * 100).toFixed(0) + '%');
      txt(dGO, '¥' + dG.toFixed(0) + ' 亿');
      txt(multEl, mult.toFixed(2));
      txt(multhEl, '1 ÷ (1 − MPC)，凯恩斯简单乘数');
      txt(dYEl, '¥' + dY.toFixed(0) + ' 亿');
      txt(dYhEl, 'ΔY = 乘数 × ΔG（封闭经济、无挤出假设）');

      var label, hint, col;
      if (mpc >= 0.9) {
        label = '乘数极大'; hint = 'MPC 接近 1 时，小财政支出撬动大 GDP——但也意味着挤出与通胀风险同步放大';
        col = 'var(--red)';
      } else if (mpc >= 0.7) {
        label = '典型区间'; hint = '多数发达经济体短期 MPC 在 0.6–0.8；中国消费偏弱时有效乘数可能更低【分析】';
        col = 'var(--amber)';
      } else if (mpc >= 0.4) {
        label = '偏保守'; hint = '高储蓄社会或流动性陷阱下，财政刺激效率下降';
        col = 'var(--blue)';
      } else {
        label = '刺激乏力'; hint = '乘数 < 2：每 ¥1 财政支出难撬动 ¥2 GDP，需配合货币政策疏通传导';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(mpc, mult);
    }

    function draw(mpc, mult) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 52, pr = 16, y1 = h - 46, bw = W - pl - pr;
      var maxM = 10;
      var bars = [];
      for (var m = 0.1; m <= 0.95; m += 0.05) {
        bars.push({ m: m, v: 1 / (1 - m) });
      }
      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      for (var i = 0; i <= 5; i++) {
        var yy = y1 - (y1 - 18) * i / 5;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxM * i / 5).toFixed(0), pl - 4, yy + 3);
      }
      var barW = bw / bars.length * 0.7;
      bars.forEach(function (b, idx) {
        var x = pl + idx * (bw / bars.length) + barW * 0.15;
        var bh = (b.v / maxM) * (y1 - 22);
        var isCur = Math.abs(b.m - mpc) < 0.03;
        ctx.fillStyle = isCur ? C.red : C.blue;
        ctx.globalAlpha = isCur ? 1 : 0.45;
        ctx.fillRect(x, y1 - bh, barW, bh);
        ctx.globalAlpha = 1;
      });
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('边际消费倾向 MPC', pl + bw / 2, y1 + 13);
      ctx.fillText('财政乘数 1/(1−MPC)', pl + bw / 2, y1 + 31);
    }

    [mpcEl, dGEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 泰勒规则
     i = r* + π + 0.5(π−π*) + 0.5·gap
     ══════════════════════════════════════════════════════════ */
  (function taylor() {
    var piEl = $('tr_pi'), gapEl = $('tr_gap');
    if (!piEl || !gapEl) return;
    var piO = $('tr_piO'), gapO = $('tr_gapO');
    var iEl = $('tr_i'), realEl = $('tr_real');
    var ihEl = $('tr_ih'), realhEl = $('tr_realh');
    var vEl = $('tr_v'), vhEl = $('tr_vh');

    var RSTAR = 2, PISTAR = 2;

    function upd() {
      var pi = num(piEl.value);
      var gap = num(gapEl.value);
      var i = RSTAR + pi + 0.5 * (pi - PISTAR) + 0.5 * gap;
      var real = i - pi;

      txt(piO, pi.toFixed(1) + '%');
      txt(gapO, (gap >= 0 ? '+' : '') + gap.toFixed(1) + 'pp');
      txt(iEl, i.toFixed(2) + '%');
      txt(ihEl, 'r*(' + RSTAR + '%) + π + 0.5(π−π*) + 0.5·缺口');
      txt(realEl, real.toFixed(2) + '%');
      txt(realhEl, '政策利率 − 通胀 = 实际利率');

      var label, hint, col;
      if (pi > PISTAR + 1.5 && gap > 0) {
        label = '明显紧缩'; hint = '通胀与产出双热：央行需加息压制需求';
        col = 'var(--red)';
      } else if (pi < PISTAR - 0.5 && gap < 0) {
        label = '宽松取向'; hint = '通胀低于目标且产出缺口为负：降息窗口打开';
        col = 'var(--green)';
      } else if (Math.abs(pi - PISTAR) < 0.5 && Math.abs(gap) < 0.5) {
        label = '中性区间'; hint = '通胀与产出接近目标：政策可维持观望';
        col = 'var(--blue)';
      } else {
        label = '权衡两难'; hint = '通胀与产出信号冲突——这正是 2021–2023 全球央行的困境';
        col = 'var(--amber)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }

    [piEl, gapEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 债务动态
     d_{t+1} = d_t·(1+r)/(1+g) + pd
     ══════════════════════════════════════════════════════════ */
  (function debt() {
    var dEl = $('dd_d'), rEl = $('dd_r'), gEl = $('dd_g'), pdEl = $('dd_pd');
    if (!dEl || !rEl || !gEl || !pdEl) return;
    var dO = $('dd_dO'), rO = $('dd_rO'), gO = $('dd_gO'), pdO = $('dd_pdO');
    var d10El = $('dd_d10'), deltaEl = $('dd_delta');
    var d10hEl = $('dd_d10h');
    var vEl = $('dd_v'), vhEl = $('dd_vh');
    var cv = $('ddChart');
    var YEARS = 15;

    function path(d0, r, g, pd) {
      var arr = [d0], d = d0;
      for (var y = 1; y <= YEARS; y++) {
        d = d * (1 + r / 100) / (1 + g / 100) + pd;
        arr.push(d);
      }
      return arr;
    }

    function upd() {
      var d0 = num(dEl.value);
      var r = num(rEl.value);
      var g = num(gEl.value);
      var pd = num(pdEl.value);
      var arr = path(d0, r, g, pd);
      var spread = r - g;
      var delta1 = arr[1] - arr[0];

      txt(dO, d0.toFixed(0) + '%');
      txt(rO, r.toFixed(1) + '%');
      txt(gO, g.toFixed(1) + '%');
      txt(pdO, (pd >= 0 ? '+' : '') + pd.toFixed(1) + 'pp');
      txt(d10El, arr[10].toFixed(1) + '%');
      txt(d10hEl, '10 年后债务/GDP（初级赤字每年 ' + pd.toFixed(1) + 'pp）');
      txt(deltaEl, (delta1 >= 0 ? '+' : '') + delta1.toFixed(2) + 'pp');
      txt($('dd_deltah'), '明年债务率变化 ≈ (r−g)×d + 初级赤字');

      var label, hint, col;
      if (spread > 1 && pd > 1) {
        label = '债务螺旋风险'; hint = 'r>g 且初级赤字为正：债务率趋向加速上升';
        col = 'var(--red)';
      } else if (spread < 0 && pd <= 0) {
        label = '可持续'; hint = 'r<g 且财政盈余：债务率可自然下降（日本曾长期例外）';
        col = 'var(--green)';
      } else if (spread > 0 && pd <= 0) {
        label = '勉强平衡'; hint = '初级盈余抵消 r−g 拖累，但政策空间狭窄';
        col = 'var(--amber)';
      } else {
        label = '温和上升'; hint = '增长对冲部分利息负担，但需关注利差突变';
        col = 'var(--blue)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(arr, r, g);
    }

    function draw(arr, r, g) {
      if (!cv) return;
      var s = fit(cv, 214); if (!s) return;
      var ctx = s.ctx, W = s.w, h = s.h;
      clear(s);
      var pl = 46, pr = 12, y1 = h - 46, bw = W - pl - pr;
      var maxD = Math.max.apply(null, arr) * 1.08;
      var minD = Math.min(0, Math.min.apply(null, arr) - 5);
      var range = maxD - minD;

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 18) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((minD + range * i / 4).toFixed(0) + '%', pl - 4, yy + 3);
      }

      ctx.beginPath();
      ctx.strokeStyle = C.red; ctx.lineWidth = 2;
      arr.forEach(function (v, t) {
        var x = pl + (t / YEARS) * bw;
        var y = y1 - ((v - minD) / range) * (y1 - 22);
        if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      for (var t = 0; t <= YEARS; t += 5) {
        ctx.fillText('T+' + t, pl + (t / YEARS) * bw, y1 + 13);
      }
      ctx.fillText('债务/GDP 路径（%）', pl + bw / 2, y1 + 31);
    }

    [dEl, rEl, gEl, pdEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 菲利普斯曲线
     π = π_e + α(u* − u)
     ══════════════════════════════════════════════════════════ */
  (function phillips() {
    var uEl = $('pc_u'), alphaEl = $('pc_alpha');
    if (!uEl || !alphaEl) return;
    var uO = $('pc_uO'), alphaO = $('pc_alphaO');
    var piEl = $('pc_pi'), gapEl = $('pc_gap');
    var pihEl = $('pc_pih'), gaphEl = $('pc_gaph');
    var vEl = $('pc_v'), vhEl = $('pc_vh');
    var cv = $('pcChart');

    var USTAR = 5, PIE = 2;

    function upd() {
      var u = num(uEl.value);
      var alpha = num(alphaEl.value);
      var ugap = USTAR - u;
      var pi = PIE + alpha * ugap;

      txt(uO, u.toFixed(1) + '%');
      txt(alphaO, alpha.toFixed(2));
      txt(piEl, pi.toFixed(2) + '%');
      txt(pihEl, 'π_e(' + PIE + '%) + α·(u*−u)，u*=' + USTAR + '%');
      txt(gapEl, (ugap >= 0 ? '+' : '') + ugap.toFixed(1) + 'pp');
      txt(gaphEl, '失业缺口：正值=劳动力市场偏紧');

      var label, hint, col;
      if (u < USTAR - 0.5) {
        label = '通胀上行压力'; hint = '失业率低于自然率：工资-物价螺旋风险上升';
        col = 'var(--red)';
      } else if (u > USTAR + 1) {
        label = '通缩/低通胀'; hint = '劳动力市场偏松：类似中国 2024–2025 的物价疲软【分析】';
        col = 'var(--green)';
      } else {
        label = '接近均衡'; hint = '失业在自然率附近：通胀主要由预期与供给冲击驱动';
        col = 'var(--blue)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(u, alpha);
    }

    function draw(u, alpha) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 46, pr = 16, y1 = h - 46, bw = W - pl - pr;
      var uMin = 2, uMax = 10;
      var piMin = -1, piMax = 8;

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 18) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((piMin + (piMax - piMin) * i / 4).toFixed(0) + '%', pl - 4, yy + 3);
      }

      function sx(uu) { return pl + (uu - uMin) / (uMax - uMin) * bw; }
      function sy(pp) { return y1 - (pp - piMin) / (piMax - piMin) * (y1 - 22); }

      ctx.beginPath();
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
      for (var uu = uMin; uu <= uMax; uu += 0.1) {
        var pp = PIE + alpha * (USTAR - uu);
        if (uu === uMin) ctx.moveTo(sx(uu), sy(pp)); else ctx.lineTo(sx(uu), sy(pp));
      }
      ctx.stroke();

      var piCur = PIE + alpha * (USTAR - u);
      ctx.fillStyle = C.red;
      ctx.beginPath(); ctx.arc(sx(u), sy(piCur), 5, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('失业率 u (%)', pl + bw / 2, y1 + 13);
      ctx.fillText('通胀率 π (%)', pl + bw / 2, y1 + 31);
    }

    [uEl, alphaEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
