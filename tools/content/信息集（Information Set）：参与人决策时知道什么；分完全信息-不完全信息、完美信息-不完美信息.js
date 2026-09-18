/* ============================================================
   《信息集（Information Set）》主题脚本
   四个可调模型：
     1. VOI：完美拆开 vs 捆绑信息集
     2. 不完美信息集上的最优行动（联动模型1支付）
     3. 进入博弈：类型先验阈值
     4. 两轴分类器：完美×完全象限
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    purple: '#7c3aed', grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f',
    ink2: '#454c56', ink: '#15181d'
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
  function payoffs() {
    return {
      aL: parseFloat(($('voi_aL') || {}).value || 3),
      bL: parseFloat(($('voi_bL') || {}).value || 1),
      aR: parseFloat(($('voi_aR') || {}).value || 0),
      bR: parseFloat(($('voi_bR') || {}).value || 2)
    };
  }

  /* ── 1. VOI ── */
  (function voi() {
    var ids = ['voi_p', 'voi_aL', 'voi_bL', 'voi_aR', 'voi_bR'];
    if (!$('voi_p')) return;
    var cv = $('voiChart');
    var actUpd = null;
    window.__isActRefresh = function (fn) { actUpd = fn; };

    function upd() {
      var p = parseFloat($('voi_p').value);
      var pf = payoffs();
      var aL = pf.aL, bL = pf.bL, aR = pf.aR, bR = pf.bR;
      var perfect = p * Math.max(aL, bL) + (1 - p) * Math.max(aR, bR);
      var eA = p * aL + (1 - p) * aR;
      var eB = p * bL + (1 - p) * bR;
      var imperfect = Math.max(eA, eB);
      var value = perfect - imperfect;
      var best = eA >= eB - 1e-12 ? (eB >= eA - 1e-12 ? '无差异' : 'A') : 'B';
      var msg, col;
      if (Math.abs(eA - eB) < 1e-9) {
        msg = '不完美下最优行动 A 或 B 无差异（EU=' + imperfect.toFixed(2) + '）；拆开信息集可多得 ' + value.toFixed(2);
        col = C.blue;
      } else {
        msg = '不完美下选 ' + best + '（EU=' + imperfect.toFixed(2) + '）；完美信息 EU=' + perfect.toFixed(2) + '，信息价值=' + value.toFixed(2);
        col = value > 1e-9 ? C.amber : C.green;
      }

      txt($('voi_pO'), p.toFixed(2));
      txt($('voi_aLO'), aL.toFixed(1));
      txt($('voi_bLO'), bL.toFixed(1));
      txt($('voi_aRO'), aR.toFixed(1));
      txt($('voi_bRO'), bR.toFixed(1));
      txt($('voi_perf'), perfect.toFixed(2));
      txt($('voi_imp'), imperfect.toFixed(2));
      txt($('voi_val'), value.toFixed(2));
      txt($('voi_vh'), msg);
      tint($('voi_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [];
      for (var i = 0; i <= 100; i++) {
        var pp = i / 100;
        var pe = pp * Math.max(aL, bL) + (1 - pp) * Math.max(aR, bR);
        var ea = pp * aL + (1 - pp) * aR;
        var eb = pp * bL + (1 - pp) * bR;
        vals.push(pe, Math.max(ea, eb));
      }
      var ymin = Math.min.apply(null, vals) - 0.3;
      var ymax = Math.max.apply(null, vals) + 0.3;
      if (ymax - ymin < 1) { ymin -= 0.5; ymax += 0.5; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      var step = (ymax - ymin) / 4;
      for (var k = 0; k <= 4; k++) {
        var vv = ymin + k * step;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, y + 4);
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        pp = i / 100;
        pe = pp * Math.max(aL, bL) + (1 - pp) * Math.max(aR, bR);
        var x = sx(pp), yy = sy(pe);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        pp = i / 100;
        ea = pp * aL + (1 - pp) * aR;
        eb = pp * bL + (1 - pp) * bR;
        x = sx(pp); yy = sy(Math.max(ea, eb));
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(p), pt);
      ctx.lineTo(sx(p), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.ink;
      ctx.beginPath();
      ctx.arc(sx(p), sy(perfect), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(p), sy(imperfect), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('先验 p →', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = C.green;
      ctx.fillText('完美', w - pr, pt + 10);
      ctx.fillStyle = C.red;
      ctx.fillText('不完美', w - pr, pt + 24);

      if (typeof actUpd === 'function') actUpd();
      else if (window.__isRunAct) window.__isRunAct();
    }

    bind(ids, upd);
    upd();
    window.__isRunVoi = upd;
  })();

  /* ── 2. 最优行动（联动支付） ── */
  (function act() {
    if (!$('act_p')) return;
    var cv = $('actChart');

    function upd() {
      var p = parseFloat($('act_p').value);
      var pf = payoffs();
      var aL = pf.aL, bL = pf.bL, aR = pf.aR, bR = pf.bR;
      var eA = p * aL + (1 - p) * aR;
      var eB = p * bL + (1 - p) * bR;
      var gap = eA - eB;
      var denom = (aL - bL) - (aR - bR);
      var pStar = null;
      if (Math.abs(denom) > 1e-12) {
        pStar = (bR - aR) / denom;
      }
      var msg, col;
      if (Math.abs(gap) < 1e-9) {
        msg = '无差异：两行动期望相同；任意混合亦可' + (pStar != null ? '（临界 p*=' + pStar.toFixed(2) + '）' : '');
        col = C.blue;
      } else if (gap > 0) {
        msg = '选 A：EU(A)=' + eA.toFixed(2) + ' > EU(B)=' + eB.toFixed(2) + (pStar != null ? '（临界 p*=' + pStar.toFixed(2) + '）' : '');
        col = C.red;
      } else {
        msg = '选 B：EU(B)=' + eB.toFixed(2) + ' > EU(A)=' + eA.toFixed(2) + (pStar != null ? '（临界 p*=' + pStar.toFixed(2) + '）' : '');
        col = C.green;
      }

      txt($('act_pO'), p.toFixed(2));
      txt($('act_a'), eA.toFixed(2));
      txt($('act_b'), eB.toFixed(2));
      txt($('act_gap'), gap.toFixed(2));
      txt($('act_vh'), msg);
      tint($('act_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ys = [];
      for (var i = 0; i <= 100; i++) {
        var pp = i / 100;
        ys.push(pp * aL + (1 - pp) * aR, pp * bL + (1 - pp) * bR);
      }
      var ymin = Math.min.apply(null, ys) - 0.3;
      var ymax = Math.max.apply(null, ys) + 0.3;
      if (ymax - ymin < 1) { ymin -= 0.5; ymax += 0.5; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      var step = (ymax - ymin) / 4;
      for (var k = 0; k <= 4; k++) {
        var vv = ymin + k * step;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, y + 4);
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        pp = i / 100;
        var x = sx(pp), yy = sy(pp * aL + (1 - pp) * aR);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        pp = i / 100;
        x = sx(pp); yy = sy(pp * bL + (1 - pp) * bR);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      if (pStar != null && pStar >= 0 && pStar <= 1) {
        ctx.strokeStyle = C.purple;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(sx(pStar), pt);
        ctx.lineTo(sx(pStar), y1);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.strokeStyle = C.amber;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(sx(p), pt);
      ctx.lineTo(sx(p), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('信念 p →', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = C.red;
      ctx.fillText('EU(A)', w - pr, pt + 10);
      ctx.fillStyle = C.green;
      ctx.fillText('EU(B)', w - pr, pt + 24);
    }

    window.__isRunAct = upd;
    if (window.__isActRefresh) window.__isActRefresh(upd);
    bind(['act_p', 'voi_aL', 'voi_bL', 'voi_aR', 'voi_bR'], upd);
    upd();
  })();

  /* ── 3. 进入博弈 ── */
  (function ent() {
    if (!$('ent_q')) return;
    var cv = $('entChart');

    function upd() {
      var q = parseFloat($('ent_q').value);
      var s = parseFloat($('ent_s').value);
      var w = parseFloat($('ent_w').value);
      var eu = q * s + (1 - q) * w;
      var th = (w - 0) / (w - s);
      if (!(th >= 0 && th <= 1) || Math.abs(w - s) < 1e-12) th = 0.5;
      var enter = eu > 0;
      var msg = 'q=' + q.toFixed(2) + (enter ? ' < ' : ' ≥ ') + 'q*=' + th.toFixed(2) +
        ' → ' + (enter ? '进入' : '不进入') + '；EU=' + (eu >= 0 ? '+' : '') + eu.toFixed(2) + '（相对不进入的 0）';
      var col = enter ? C.red : C.green;

      txt($('ent_qO'), q.toFixed(2));
      txt($('ent_sO'), s.toFixed(1));
      txt($('ent_wO'), w.toFixed(1));
      txt($('ent_eu'), eu.toFixed(2));
      txt($('ent_th'), th.toFixed(2));
      txt($('ent_dec'), enter ? '进入' : '不进入');
      tint($('ent_dec'), col);
      txt($('ent_vh'), msg);
      tint($('ent_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, ww = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = ww - pl - pr, bh = y1 - pt;
      var ys = [];
      for (var i = 0; i <= 100; i++) {
        var qq = i / 100;
        ys.push(qq * s + (1 - qq) * w);
      }
      var ymin = Math.min.apply(null, ys.concat([0])) - 0.3;
      var ymax = Math.max.apply(null, ys.concat([0])) + 0.3;
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      var step = (ymax - ymin) / 4;
      for (var k = 0; k <= 4; k++) {
        var vv = ymin + k * step;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(ww - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, y + 4);
      }
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, sy(0));
      ctx.lineTo(ww - pr, sy(0));
      ctx.stroke();

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        qq = i / 100;
        var x = sx(qq), yy = sy(qq * s + (1 - qq) * w);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.strokeStyle = C.purple;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(th), pt);
      ctx.lineTo(sx(th), y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = C.amber;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(sx(q), pt);
      ctx.lineTo(sx(q), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.ink;
      ctx.beginPath();
      ctx.arc(sx(q), sy(eu), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('强类型先验 q →', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = C.blue;
      ctx.fillText('EU(进入)', ww - pr, pt + 10);
    }

    bind(['ent_q', 'ent_s', 'ent_w'], upd);
    upd();
  })();

  /* ── 4. 两轴分类器 ── */
  (function cls() {
    if (!$('cls_vis')) return;
    var cv = $('clsChart');

    function upd() {
      var vis = parseFloat($('cls_vis').value);
      var ck = parseFloat($('cls_ck').value);
      var perfect = vis >= 0.5;
      var complete = ck >= 0.5;
      var quad, ex, col;
      if (complete && perfect) {
        quad = '① 完全+完美';
        ex = '对照例：国际象棋 / 围棋（棋盘可见 + 规则与目标近似共同知识）';
        col = C.green;
      } else if (complete && !perfect) {
        quad = '② 完全+不完美';
        ex = '对照例：标准扑克规则已知但手牌不可见；同时出价的完全信息博弈';
        col = C.amber;
      } else if (!complete && perfect) {
        quad = '③ 不完全+完美';
        ex = '对照例：序贯行动且历史可见，但不知对方私有估值/风险类型';
        col = C.purple;
      } else {
        quad = '④ 不完全+不完美';
        ex = '对照例：多数拍卖与谈判——类型私有，且关键行动/信号亦不完全可见';
        col = C.red;
      }

      txt($('cls_visO'), vis.toFixed(2));
      txt($('cls_ckO'), ck.toFixed(2));
      txt($('cls_perf'), perfect ? '完美' : '不完美');
      txt($('cls_comp'), complete ? '完全' : '不完全');
      txt($('cls_quad'), quad);
      tint($('cls_quad'), col);
      txt($('cls_vh'), ex);
      tint($('cls_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 56, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      ctx.strokeStyle = C.axis;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pl, pt);
      ctx.lineTo(pl, y1);
      ctx.lineTo(pl + bw, y1);
      ctx.stroke();

      // quadrant fills
      var mx = pl + bw * 0.5, my = pt + bh * 0.5;
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = C.green;
      ctx.fillRect(mx, pt, bw * 0.5, bh * 0.5);
      ctx.fillStyle = C.amber;
      ctx.fillRect(pl, pt, bw * 0.5, bh * 0.5);
      ctx.fillStyle = C.purple;
      ctx.fillRect(mx, my, bw * 0.5, bh * 0.5);
      ctx.fillStyle = C.red;
      ctx.fillRect(pl, my, bw * 0.5, bh * 0.5);
      ctx.globalAlpha = 1;

      ctx.strokeStyle = C.grid;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(mx, pt);
      ctx.lineTo(mx, y1);
      ctx.moveTo(pl, my);
      ctx.lineTo(pl + bw, my);
      ctx.stroke();
      ctx.setLineDash([]);

      var px = pl + vis * bw;
      var py = y1 - ck * bh;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = C.ink;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('历史可见度 → 完美', pl + bw / 2, y1 + 31);
      ctx.save();
      ctx.translate(16, pt + bh / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('共同知识度 → 完全', 0, 0);
      ctx.restore();

      ctx.font = '10px sans-serif';
      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'left';
      ctx.fillText('②完全+不完美', pl + 6, pt + 14);
      ctx.textAlign = 'right';
      ctx.fillText('①完全+完美', pl + bw - 6, pt + 14);
      ctx.textAlign = 'left';
      ctx.fillText('④不完全+不完美', pl + 6, y1 - 8);
      ctx.textAlign = 'right';
      ctx.fillText('③不完全+完美', pl + bw - 6, y1 - 8);
    }

    bind(['cls_vis', 'cls_ck'], upd);
    upd();
  })();

  window.addEventListener('resize', function () {
    if (window.__isRunVoi) window.__isRunVoi();
    if (window.__isRunAct) window.__isRunAct();
    ['ent_q', 'cls_vis'].forEach(function (id) {
      var el = $(id);
      if (el) el.dispatchEvent(new Event('input'));
    });
  });
})();
