/* ============================================================
   《子博弈精炼纳什均衡（SPNE）》主题脚本
   四个可调模型：
     1. 进入威慑：威胁是否可信 → SPNE 路径
     2. 承诺赌注：C* 与是否吓退进入
     3. 有限轮次讨价还价：逆向归纳份额
     4. 斯塔克伯格 vs 古诺
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
  function axisY(ctx, pl, y1, pt, bh, ymin, ymax, w) {
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
      ctx.lineTo(w - 16, y);
      ctx.stroke();
      ctx.fillText(v.toFixed(1), pl - 6, y + 3);
    }
  }

  /* ── 1. 进入威慑 ── */
  (function entry() {
    var ids = ['en_m', 'en_fe', 'en_fi', 'en_ae', 'en_ai'];
    if (!$('en_m')) return;
    var cv = $('enChart');

    function upd() {
      var M = parseFloat($('en_m').value);
      var fe = parseFloat($('en_fe').value);
      var fi = parseFloat($('en_fi').value);
      var ae = parseFloat($('en_ae').value);
      var ai = parseFloat($('en_ai').value);
      txt($('en_mO'), M.toFixed(1));
      txt($('en_feO'), fe.toFixed(1));
      txt($('en_fiO'), fi.toFixed(1));
      txt($('en_aeO'), ae.toFixed(1));
      txt($('en_aiO'), ai.toFixed(1));

      var credible = fi >= ai - 1e-9;
      var enterPay = credible ? fe : ae;
      var enter = enterPay > 0;
      var path, pe, pi, col;
      if (!credible) {
        path = '进入+默许';
        pe = ae; pi = ai;
        col = C.blue;
      } else if (enter) {
        path = '进入+斗争';
        pe = fe; pi = fi;
        col = C.red;
      } else {
        path = '不进入（威胁可信）';
        pe = 0; pi = M;
        col = C.green;
      }

      txt($('en_cred'), credible ? '是' : '否');
      txt($('en_ent'), enter ? '是' : '否');
      txt($('en_pay'), '(' + pe.toFixed(1) + ', ' + pi.toFixed(1) + ')');
      var msg = credible
        ? ('进入后斗争 ' + fi.toFixed(1) + ' ≥ 默许 ' + ai.toFixed(1) + ' → 威胁可信；进入者比较 ' + enterPay.toFixed(1) + ' 与 0 → ' + (enter ? '进入' : '不进入') + '；SPNE=' + path)
        : ('进入后默许 ' + ai.toFixed(1) + ' > 斗争 ' + fi.toFixed(1) + ' → 威胁不可信；进入者进入，SPNE=(进入,默许)');
      txt($('en_vh'), msg);
      tint($('en_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '不进入\n(0,M)', v: M, c: C.amber },
        { lab: '斗争\n在位', v: fi, c: C.red },
        { lab: '默许\n在位', v: ai, c: C.green },
        { lab: 'SPNE\n在位π', v: pi, c: C.blue }
      ];
      var ymin = Math.min(0, fi, ai, M, pi) - 0.5;
      var ymax = Math.max(0, fi, ai, M, pi) + 0.5;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
      var barW = bw / (vals.length * 1.4);
      vals.forEach(function (o, i) {
        var x = pl + (i + 0.5) * (bw / vals.length) - barW / 2;
        var y0 = y1 - ((0 - ymin) / (ymax - ymin)) * bh;
        var yv = y1 - ((o.v - ymin) / (ymax - ymin)) * bh;
        var top = Math.min(y0, yv), bot = Math.max(y0, yv);
        ctx.fillStyle = o.c;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, top, barW, Math.max(2, bot - top));
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        var lab = o.v.toFixed(1);
        var lw = ctx.measureText(lab).width;
        var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 4), w - pr - lw / 2 - 4);
        ctx.fillText(lab, lx, Math.min(top, yv) - 6);
        ctx.fillStyle = C.ink3;
        ctx.fillText(o.lab.split('\n')[0], x + barW / 2, y1 + 13);
        ctx.fillText(o.lab.split('\n')[1] || '', x + barW / 2, y1 + 26);
      });
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('在位者支付比较（威胁可信性）', pl + bw, pt - 6);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 2. 承诺 C* ── */
  (function commit() {
    if (!$('cm_c')) return;
    var ids = ['cm_ai', 'cm_fi', 'cm_c', 'cm_ae', 'cm_fe'];
    var cv = $('cmChart');

    function upd() {
      var ai = parseFloat($('cm_ai').value);
      var fi = parseFloat($('cm_fi').value);
      var c = parseFloat($('cm_c').value);
      var ae = parseFloat($('cm_ae').value);
      var fe = parseFloat($('cm_fe').value);
      txt($('cm_aiO'), ai.toFixed(1));
      txt($('cm_fiO'), fi.toFixed(1));
      txt($('cm_cO'), c.toFixed(1));
      txt($('cm_aeO'), ae.toFixed(1));
      txt($('cm_feO'), fe.toFixed(1));

      var cStar = ai - fi;
      var netAcc = ai - c;
      var credible = fi >= netAcc - 1e-9;
      var enterPay = credible ? fe : ae;
      var stayOut = enterPay <= 0;
      var path = !credible ? '进入+默许' : (stayOut ? '不进入' : '进入+斗争');
      var col = credible && stayOut ? C.green : (credible ? C.amber : C.red);

      txt($('cm_star'), cStar.toFixed(1));
      txt($('cm_ok'), credible ? '是' : '否');
      txt($('cm_path'), path);
      var msg = 'C*=' + cStar.toFixed(1) + '；默许净支付 ' + netAcc.toFixed(1) +
        (credible ? ' ≤ 斗争 ' + fi.toFixed(1) + ' → 可信' : ' > 斗争 ' + fi.toFixed(1) + ' → 仍不可信') +
        '；进入者预期 ' + enterPay.toFixed(1) + ' → ' + path;
      txt($('cm_vh'), msg);
      tint($('cm_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var cMax = 5;
      var ymin = Math.min(fi, ai - cMax, -1) - 0.3;
      var ymax = Math.max(fi, ai, 1) + 0.3;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);

      function sx(cv_) { return pl + (cv_ / cMax) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.green;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(ai));
      ctx.lineTo(sx(cMax), sy(ai - cMax));
      ctx.stroke();

      ctx.strokeStyle = C.red;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(fi));
      ctx.lineTo(sx(cMax), sy(fi));
      ctx.stroke();
      ctx.setLineDash([]);

      if (cStar >= 0 && cStar <= cMax) {
        ctx.strokeStyle = C.amber;
        ctx.beginPath();
        ctx.moveTo(sx(cStar), pt);
        ctx.lineTo(sx(cStar), y1);
        ctx.stroke();
        ctx.fillStyle = C.amber;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('C*=' + cStar.toFixed(1), sx(cStar), pt - 4);
      }
      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(c), sy(netAcc), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('绿：默许净支付 a−C · 红：斗争 · 点：当前 C', pl + bw, pt - 10);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('承诺成本 C', pl + bw / 2, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 3. 讨价还价 ── */
  (function barg() {
    if (!$('bg_t')) return;
    var ids = ['bg_s', 'bg_d', 'bg_t'];
    var cv = $('bgChart');

    function firstShare(S, d, T) {
      var prop = S;
      for (var k = 1; k < T; k++) {
        prop = S - d * prop;
      }
      return prop;
    }

    function upd() {
      var S = parseFloat($('bg_s').value);
      var d = parseFloat($('bg_d').value);
      var T = parseInt($('bg_t').value, 10);
      txt($('bg_sO'), String(S));
      txt($('bg_dO'), d.toFixed(2));
      txt($('bg_tO'), String(T));

      var first = firstShare(S, d, T);
      var second = S - first;
      var lim = S / (1 + d);
      txt($('bg_first'), first.toFixed(1));
      txt($('bg_second'), second.toFixed(1));
      txt($('bg_lim'), lim.toFixed(1));
      var msg = 'T=' + T + ',δ=' + d.toFixed(2) + '：先手 ' + first.toFixed(1) +
        '，后手 ' + second.toFixed(1) + '；无限极限 S/(1+δ)=' + lim.toFixed(1);
      txt($('bg_vh'), msg);
      tint($('bg_vh'), Math.abs(first - lim) < S * 0.05 ? C.green : C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var Tmax = 20;
      var ymin = 0, ymax = S * 1.05;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);

      function sx(t) { return pl + ((t - 1) / (Tmax - 1)) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(lim));
      ctx.lineTo(pl + bw, sy(lim));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.amber;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('极限 ' + lim.toFixed(1), pl + 4, sy(lim) - 4);

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var t = 1; t <= Tmax; t++) {
        var v = firstShare(S, d, t);
        var x = sx(t), y = sy(v);
        if (t === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(T), sy(first), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('先手份额随 T（δ 固定）', pl + bw, pt - 8);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('轮次 T', pl + bw / 2, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 4. 斯塔克伯格 ── */
  (function stack() {
    if (!$('sk_a')) return;
    var ids = ['sk_a', 'sk_b', 'sk_c'];
    var cv = $('skChart');

    function upd() {
      var a = parseFloat($('sk_a').value);
      var b = parseFloat($('sk_b').value);
      var c = parseFloat($('sk_c').value);
      txt($('sk_aO'), a.toFixed(1));
      txt($('sk_bO'), b.toFixed(1));
      txt($('sk_cO'), c.toFixed(1));

      var margin = a - c;
      if (margin <= 0 || b <= 0) {
        txt($('sk_pl'), '—');
        txt($('sk_pf'), '—');
        txt($('sk_pc'), '—');
        txt($('sk_vh'), '需要 a>c 且 b>0，否则市场无正产量');
        tint($('sk_vh'), C.red);
        return;
      }
      var qC = margin / (3 * b);
      var pC = a - b * 2 * qC;
      var piC = (pC - c) * qC;
      var qL = margin / (2 * b);
      var qF = (margin - b * qL) / (2 * b);
      var pS = a - b * (qL + qF);
      var piL = (pS - c) * qL;
      var piF = (pS - c) * qF;

      txt($('sk_pl'), piL.toFixed(2));
      txt($('sk_pf'), piF.toFixed(2));
      txt($('sk_pc'), piC.toFixed(2));
      var msg = 'qL=' + qL.toFixed(2) + ', qF=' + qF.toFixed(2) + ', P=' + pS.toFixed(2) +
        '；古诺各 q=' + qC.toFixed(2) + ' π=' + piC.toFixed(2) +
        ' → 先动优势 ' + (piL - piC).toFixed(2);
      txt($('sk_vh'), msg);
      tint($('sk_vh'), piL >= piC ? C.green : C.amber);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '先动 πL', v: piL, c: C.blue },
        { lab: '后动 πF', v: piF, c: C.amber },
        { lab: '古诺 πC', v: piC, c: C.green }
      ];
      var ymin = 0;
      var ymax = Math.max(piL, piF, piC, 1) * 1.15;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
      var barW = bw / (vals.length * 1.5);
      vals.forEach(function (o, i) {
        var x = pl + (i + 0.5) * (bw / vals.length) - barW / 2;
        var yv = y1 - ((o.v - ymin) / (ymax - ymin)) * bh;
        ctx.fillStyle = o.c;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, yv, barW, y1 - yv);
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        var lab = o.v.toFixed(2);
        ctx.fillText(lab, x + barW / 2, yv - 6);
        ctx.fillStyle = C.ink3;
        ctx.fillText(o.lab, x + barW / 2, y1 + 18);
      });
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('利润：斯塔克伯格 SPNE vs 古诺 NE', pl + bw, pt - 6);
    }
    bind(ids, upd);
    upd();
  })();
})();
