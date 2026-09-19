/* ============================================================
   《先动优势与后动优势》主题脚本
   三个可调模型（滑块都进入闭式，不用假读数）：
     1. 线性需求斯塔克伯格 vs 古诺（可成本不对称）
     2. 两状态需求：先动承诺、后动观察实现值
     3. 差异化价格：战略互补下的后动优势
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
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
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }
  function bind(ids, fn) {
    ids.forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input', fn);
      el.addEventListener('change', fn);
    });
  }
  function f2(x) { return Number(x).toFixed(2); }
  function f1(x) { return Number(x).toFixed(1); }

  function yGrid(ctx, pl, pr, y1, pt, bh, ymin, ymax, w) {
    ctx.strokeStyle = C.grid;
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    var span = ymax - ymin || 1;
    for (var i = 0; i <= 4; i++) {
      var v = ymin + (span * i) / 4;
      var y = y1 - ((v - ymin) / span) * bh;
      ctx.beginPath();
      ctx.moveTo(pl, y);
      ctx.lineTo(w - pr, y);
      ctx.stroke();
      ctx.fillText(v.toFixed(1), pl - 6, y + 3);
    }
  }

  /* ── 1. Stackelberg vs Cournot ── */
  function stackEq(a, cL, cF) {
    var b = 1;
    var qL = (a - 2 * cL + cF) / (2 * b);
    var qF = (a + 2 * cL - 3 * cF) / (4 * b);
    var regime = 'interior';
    if (!(qF > 1e-9) || !(qL > 1e-9)) {
      regime = 'block';
      qF = 0;
      qL = Math.max(0, (a - cL) / (2 * b));
    }
    var P = a - b * (qL + qF);
    var piL = (P - cL) * qL;
    var piF = (P - cF) * qF;
    var q1 = Math.max(0, (a - 2 * cL + cF) / (3 * b));
    var q2 = Math.max(0, (a - 2 * cF + cL) / (3 * b));
    var Pc = a - b * (q1 + q2);
    var pi1 = (Pc - cL) * q1;
    var piM = (function () {
      var qM = Math.max(0, (a - cL) / (2 * b));
      return (a - b * qM - cL) * qM;
    })();
    return { regime: regime, qL: qL, qF: qF, P: P, piL: piL, piF: piF, pi1: pi1, piM: piM, q1: q1 };
  }

  (function stackTool() {
    if (!$('sk_a')) return;
    var cv = $('skChart');
    function upd() {
      var a = parseFloat($('sk_a').value);
      var cL = parseFloat($('sk_cL').value);
      var cF = parseFloat($('sk_cF').value);
      txt($('sk_aO'), f1(a));
      txt($('sk_cLO'), f1(cL));
      txt($('sk_cFO'), f1(cF));
      var r = stackEq(a, cL, cF);
      txt($('sk_qL'), f2(r.qL));
      txt($('sk_qF'), f2(r.qF));
      txt($('sk_piL'), f2(r.piL));
      txt($('sk_piF'), f2(r.piF));
      txt($('sk_piC'), f2(r.pi1));
      var ex = r.regime === 'interior' && r.pi1 > 1e-9 ? (r.piL / r.pi1 - 1) * 100 : NaN;
      txt($('sk_ex'), isFinite(ex) ? ex.toFixed(1) + '%' : '—');
      var msg, col;
      if (r.regime !== 'interior') {
        msg = '跟随者最优产量 ≤ 0：进入被封锁，先动者拿垄断利润 ' + f2(r.piL) + '（不是「打败了对手」，是对手不进来）';
        col = C.amber;
      } else if (r.piL > r.piF + 1e-6) {
        msg = '先动 ' + f2(r.piL) + ' > 后动 ' + f2(r.piF) + '；相对自家古诺 ' + f2(r.pi1) + ' 仍高 ' + ex.toFixed(1) + '%（内点恒为 9/8）';
        col = C.green;
      } else if (r.piF > r.piL + 1e-6) {
        msg = '成本劣势盖过承诺：后动 ' + f2(r.piF) + ' > 先动 ' + f2(r.piL) + '；但相对自家古诺仍高 ' + ex.toFixed(1) + '%';
        col = C.red;
      } else {
        msg = '两边利润持平 ' + f2(r.piL) + '；相对古诺 ' + ex.toFixed(1) + '%';
        col = C.blue;
      }
      txt($('sk_vh'), msg);
      tint($('sk_vh'), col);
      tint($('sk_piL'), r.piL >= r.piF ? C.green : C.red);
      tint($('sk_piF'), r.piF > r.piL ? C.green : C.ink);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var items = [
        { lab: '垄断', v: r.piM, c: C.ink2 },
        { lab: '古诺', v: r.pi1, c: C.amber },
        { lab: '先动', v: r.piL, c: C.red },
        { lab: '后动', v: r.piF, c: C.blue }
      ];
      var ymin = 0;
      var ymax = Math.max(0.1, r.piM, r.pi1, r.piL, r.piF) * 1.18;
      yGrid(ctx, pl, pr, y1, pt, bh, ymin, ymax, w);
      var span = ymax - ymin || 1;
      function sy(v) { return y1 - ((v - ymin) / span) * bh; }
      var slot = bw / items.length;
      var barW = Math.min(46, slot * 0.55);
      items.forEach(function (it, i) {
        var x = pl + slot * i + (slot - barW) / 2;
        var y = sy(it.v);
        ctx.fillStyle = it.c;
        ctx.fillRect(x, y, barW, Math.max(1, y1 - y));
        ctx.fillStyle = C.ink2;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(it.lab, x + barW / 2, y1 + 13);
        var lab = f1(it.v);
        ctx.font = '11px sans-serif';
        var ty = y - 4;
        if (ty < pt + 10) ty = y + 12;
        ctx.fillStyle = C.ink;
        ctx.fillText(lab, x + barW / 2, ty);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('利润（b=1）', pl + bw / 2, y1 + 31);
    }
    bind(['sk_a', 'sk_cL', 'sk_cF'], upd);
    upd();
  })();

  /* ── 2. Two-state demand, follower observes ── */
  function infoEq(thH, thL, p) {
    var hi = Math.max(thH, thL);
    var lo = Math.min(thH, thL);
    if (hi - lo < 0.05) hi = lo + 0.5;
    var mu = p * hi + (1 - p) * lo;
    var qInt = mu / 2;
    var qL, regime;
    if (qInt <= lo + 1e-9) {
      qL = qInt;
      regime = 'interior';
    } else {
      var qC = (p * hi / 2 + (1 - p) * lo) / (2 - p);
      if (qC >= lo - 1e-9) {
        qL = Math.min(qC, hi);
        regime = 'corner';
      } else {
        qL = lo;
        regime = 'boundary';
      }
    }
    function qF(th) { return Math.max(0, (th - qL) / 2); }
    function piL(th) { return qL * (th - qL - qF(th)); }
    function piF(th) { var q = qF(th); return q * (th - qL - q); }
    return {
      hi: hi, lo: lo, mu: mu, qL: qL, regime: regime,
      eL: p * piL(hi) + (1 - p) * piL(lo),
      eF: p * piF(hi) + (1 - p) * piF(lo),
      qFH: qF(hi), qFL: qF(lo),
      pLow: lo - qL - qF(lo)
    };
  }

  (function infoTool() {
    if (!$('in_h')) return;
    var cv = $('inChart');
    function upd() {
      var thH = parseFloat($('in_h').value);
      var thL = parseFloat($('in_l').value);
      var p = parseFloat($('in_p').value);
      txt($('in_hO'), f1(thH));
      txt($('in_lO'), f1(thL));
      txt($('in_pO'), p.toFixed(2));
      var r = infoEq(thH, thL, p);
      var gap = r.eF - r.eL;
      txt($('in_qL'), f2(r.qL));
      txt($('in_eL'), f2(r.eL));
      txt($('in_eF'), f2(r.eF));
      txt($('in_gap'), (gap >= 0 ? '+' : '') + f2(gap));
      var msg, col;
      var tail = r.regime === 'interior' ? '内点 qL=μ/2' : '低需求角点（跟随者停产）';
      if (r.pLow < -0.05) tail += '；坏状态下价格为负，这是线性需求的角点，不是数据错误';
      if (gap > 0.02) {
        msg = '后动优势：E[πF]=' + f2(r.eF) + ' > E[πL]=' + f2(r.eL) + '，差额 ' + f2(gap) + '。' + tail;
        col = C.blue;
      } else if (gap < -0.02) {
        msg = '先动优势：E[πL]=' + f2(r.eL) + ' > E[πF]=' + f2(r.eF) + '，承诺仍值钱。' + tail;
        col = C.green;
      } else {
        msg = '刀口：两边期望利润都是 ' + f2(r.eL) + '。' + tail;
        col = C.amber;
      }
      if (thH < thL) msg = '已按高需求>低需求重排。' + msg;
      txt($('in_vh'), msg);
      tint($('in_vh'), col);
      tint($('in_eL'), r.eL >= r.eF ? C.green : C.ink);
      tint($('in_eF'), r.eF > r.eL ? C.blue : C.ink);
      tint($('in_gap'), gap > 0.02 ? C.blue : (gap < -0.02 ? C.green : C.amber));

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 22, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var x0 = r.lo + 0.4;
      var x1 = Math.max(r.hi + 2, r.lo + 8, 18);
      var pts = [];
      var steps = 80;
      var ymin = 0, ymax = 1;
      for (var i = 0; i <= steps; i++) {
        var x = x0 + (x1 - x0) * i / steps;
        var e = infoEq(x, r.lo, p);
        pts.push({ x: x, eL: e.eL, eF: e.eF });
        ymax = Math.max(ymax, e.eL, e.eF);
      }
      ymax *= 1.12;
      var spanY = ymax - ymin || 1;
      var spanX = x1 - x0 || 1;
      function sx(x) { return pl + ((x - x0) / spanX) * bw; }
      function sy(v) { return y1 - ((v - ymin) / spanY) * bh; }
      yGrid(ctx, pl, pr, y1, pt, bh, ymin, ymax, w);
      ctx.strokeStyle = C.axis;
      ctx.beginPath(); ctx.moveTo(pl, y1); ctx.lineTo(pl + bw, y1); ctx.stroke();
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      for (var k = 0; k <= 4; k++) {
        var xv = x0 + spanX * k / 4;
        ctx.fillText(xv.toFixed(0), sx(xv), y1 + 13);
      }
      function stroke(key, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (var j = 0; j < pts.length; j++) {
          var X = sx(pts[j].x), Y = sy(pts[j][key]);
          if (j === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
        }
        ctx.stroke();
      }
      stroke('eL', C.red);
      stroke('eF', C.blue);
      var cross = null;
      for (var t = 1; t < pts.length; t++) {
        var d0 = pts[t - 1].eF - pts[t - 1].eL;
        var d1 = pts[t].eF - pts[t].eL;
        if (d0 <= 0 && d1 > 0) { cross = pts[t].x; break; }
      }
      ctx.setLineDash([4, 3]);
      if (cross !== null) {
        ctx.strokeStyle = C.amber;
        ctx.beginPath();
        ctx.moveTo(sx(cross), pt); ctx.lineTo(sx(cross), y1); ctx.stroke();
      }
      ctx.strokeStyle = C.ink;
      ctx.beginPath();
      ctx.moveTo(sx(r.hi), pt); ctx.lineTo(sx(r.hi), y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = C.ink;
      var lx = Math.min(sx(r.hi) + 4, pl + bw - 36);
      ctx.fillText('当前', lx, pt + 11);
      if (cross !== null && Math.abs(sx(cross) - sx(r.hi)) > 36) {
        ctx.fillStyle = C.amber;
        ctx.textAlign = 'center';
        ctx.fillText('持平', sx(cross), pt + 11);
      }
      ctx.textAlign = 'right';
      ctx.fillStyle = C.red;
      ctx.fillText('先动 Eπ', pl + bw, pt + 11);
      ctx.fillStyle = C.blue;
      ctx.fillText('后动 Eπ', pl + bw, pt + 24);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('高需求 θH（θL 与 p 固定）', pl + bw / 2, y1 + 31);
    }
    bind(['in_h', 'in_l', 'in_p'], upd);
    upd();
  })();

  /* ── 3. Differentiated Bertrand, sequential prices ── */
  function priceEq(alpha, c, g) {
    var delta = 1 - g * g / 2;
    var pL = (alpha + (g / 2) * (alpha + c) + delta * c) / (2 * delta);
    var pF = (alpha + c + g * pL) / 2;
    var qL = alpha - pL + g * pF;
    var qF = alpha - pF + g * pL;
    var pS = (alpha + c) / (2 - g);
    var qS = alpha - pS * (1 - g);
    return {
      pL: pL, pF: pF, qL: qL, qF: qF,
      piL: (pL - c) * qL, piF: (pF - c) * qF, piS: (pS - c) * qS, pS: pS
    };
  }

  (function priceTool() {
    if (!$('pr_a')) return;
    var cv = $('prChart');
    function upd() {
      var alpha = parseFloat($('pr_a').value);
      var c = parseFloat($('pr_c').value);
      var g = parseFloat($('pr_g').value);
      if (c > alpha - 0.6) c = alpha - 0.6;
      txt($('pr_aO'), f1(alpha));
      txt($('pr_cO'), f1(c));
      txt($('pr_gO'), g.toFixed(2));
      var r = priceEq(alpha, c, g);
      var gap = r.piF - r.piL;
      txt($('pr_piL'), f2(r.piL));
      txt($('pr_piF'), f2(r.piF));
      txt($('pr_piS'), f2(r.piS));
      txt($('pr_gap'), (gap >= 0 ? '+' : '') + f2(gap));
      var msg = '战略互补：后动 ' + f2(r.piF) + ' ，先动 ' + f2(r.piL) + ' ，同时 ' + f2(r.piS) +
        '。后动−先动 = ' + f2(gap) + '；先动−同时 = ' + f2(r.piL - r.piS) +
        '。γ 越大，跟价的优势越大。';
      txt($('pr_vh'), msg);
      tint($('pr_vh'), gap > 0.05 ? C.blue : C.amber);
      tint($('pr_piF'), C.blue);
      tint($('pr_gap'), gap > 0 ? C.blue : C.red);

      var gph = fit(cv, 214);
      if (!gph) return;
      clear(gph);
      var ctx = gph.ctx, w = gph.w, h = gph.h;
      var pl = 48, pr = 16, pt = 22, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var x0 = 0.1, x1 = 0.85;
      var pts = [];
      var ymin = 0, ymax = 0.05;
      for (var i = 0; i <= 60; i++) {
        var x = x0 + (x1 - x0) * i / 60;
        var e = priceEq(alpha, c, x);
        var dFL = e.piF - e.piL;
        var dLS = e.piL - e.piS;
        pts.push({ x: x, dFL: dFL, dLS: dLS });
        ymax = Math.max(ymax, dFL, dLS);
        ymin = Math.min(ymin, dFL, dLS);
      }
      var pad = (ymax - ymin) * 0.15 || 0.2;
      ymax += pad; ymin -= pad * 0.3;
      var spanY = ymax - ymin || 1;
      var spanX = x1 - x0;
      function sx(x) { return pl + ((x - x0) / spanX) * bw; }
      function sy(v) { return y1 - ((v - ymin) / spanY) * bh; }
      yGrid(ctx, pl, pr, y1, pt, bh, ymin, ymax, w);
      ctx.strokeStyle = C.axis;
      ctx.beginPath(); ctx.moveTo(pl, y1); ctx.lineTo(pl + bw, y1); ctx.stroke();
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      for (var k = 0; k <= 4; k++) {
        var xv = x0 + spanX * k / 4;
        ctx.fillText(xv.toFixed(2), sx(xv), y1 + 13);
      }
      function stroke(key, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (var j = 0; j < pts.length; j++) {
          var X = sx(pts[j].x), Y = sy(pts[j][key]);
          if (j === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
        }
        ctx.stroke();
      }
      stroke('dFL', C.blue);
      stroke('dLS', C.amber);
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = C.ink;
      ctx.beginPath();
      ctx.moveTo(sx(g), pt); ctx.lineTo(sx(g), y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.textAlign = 'left';
      ctx.fillStyle = C.ink;
      ctx.fillText('当前', Math.min(sx(g) + 4, pl + bw - 28), pt + 11);
      ctx.textAlign = 'right';
      ctx.fillStyle = C.blue;
      ctx.fillText('后动−先动', pl + bw, pt + 11);
      ctx.fillStyle = C.amber;
      ctx.fillText('先动−同时', pl + bw, pt + 24);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('差异化 γ', pl + bw / 2, y1 + 31);
    }
    bind(['pr_a', 'pr_c', 'pr_g'], upd);
    upd();
  })();
})();
