/* ============================================================
   《鹰鸽博弈 / 懦夫博弈 Chicken》主题脚本
   四个可调模型：
     1. Hawk–Dove ESS（V,C）
     2. Chicken 混合 NE（L,W,S）
     3. 信念阈值 q*
     4. 承诺剂量 α,ε
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
  function clampLabel(ctx, lab, x, y, align, pl, w) {
    var lw = ctx.measureText(lab).width;
    ctx.textAlign = align;
    var lx = align === 'left' ? Math.min(x, w - lw - 6) : Math.max(x, pl + 6);
    ctx.fillText(lab, lx, y);
  }
  function r1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function r2(x) { return (Math.round(x * 100) / 100).toFixed(2); }

  /* ── 1. Hawk–Dove ESS ── */
  (function hd() {
    var vEl = $('hd_v'), cEl = $('hd_c');
    if (!vEl || !cEl) return;
    var cv = $('hdChart');

    function upd() {
      var V = parseFloat(vEl.value), Cc = parseFloat(cEl.value);
      var pure = V >= Cc;
      var p = pure ? 1 : V / Cc;
      var pay = pure ? (V - Cc) / 2 : V * (Cc - V) / (2 * Cc);
      var crash = p * p;
      var allD = V / 2;
      var col = pure ? C.red : C.blue;

      txt($('hd_vO'), String(Math.round(V)));
      txt($('hd_cO'), String(Math.round(Cc)));
      txt($('hd_reg'), pure ? '纯鹰 ESS' : '混合 ESS');
      txt($('hd_p'), r2(p));
      txt($('hd_pay'), r1(pay));
      txt($('hd_crash'), r2(crash));
      tint($('hd_reg'), col);

      var msg;
      if (pure) {
        msg = 'V≥C → 纯鹰 ESS；期望支付 (V−C)/2=' + pay.toFixed(1) +
          '；撞车率 1.00（全员强硬相遇）';
      } else {
        msg = 'C>V → p*=V/C=' + p.toFixed(2) + '；期望支付 ' + pay.toFixed(1) +
          '；相对全鸽 ' + allD.toFixed(1) + ' 损失 ' + (allD - pay).toFixed(1) +
          '（演化稳定≠集体最优）';
      }
      txt($('hd_vh'), msg);
      tint($('hd_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      // bars: allD, ESS, allH
      var allH = (V - Cc) / 2;
      var vals = [allD, pay, allH];
      var labs = ['全鸽 V/2', 'ESS', '全鹰 (V−C)/2'];
      var colors = [C.green, col, C.red];
      var minV = Math.min(0, allH, pay, allD);
      var maxV = Math.max(0, allH, pay, allD, 1);
      var span = maxV - minV || 1;
      function sx(v) { return pl + ((v - minV) / span) * bw; }
      var zeroX = sx(0);
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(zeroX, pt);
      ctx.lineTo(zeroX, y1);
      ctx.stroke();

      var barH = 28, gap = 18;
      var startY = pt + 20;
      for (var i = 0; i < 3; i++) {
        var y = startY + i * (barH + gap);
        var x0 = zeroX, x1 = sx(vals[i]);
        var left = Math.min(x0, x1), right = Math.max(x0, x1);
        ctx.fillStyle = colors[i];
        ctx.fillRect(left, y, Math.max(2, right - left), barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(labs[i], pl, y - 4);
        var lab = vals[i].toFixed(1);
        ctx.fillStyle = C.ink2;
        clampLabel(ctx, lab, vals[i] >= 0 ? right + 8 : left - 8, y + barH / 2 + 4,
          vals[i] >= 0 ? 'left' : 'right', pl, w);
      }
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('期望支付对照', pl + bw / 2, y1 + 31);
    }
    bind(['hd_v', 'hd_c'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 2. Chicken mixed NE ── */
  (function ck() {
    var lEl = $('ck_l'), wEl = $('ck_w'), sEl = $('ck_s');
    if (!lEl || !wEl || !sEl) return;
    var cv = $('ckChart');

    function upd() {
      var L = parseFloat(lEl.value), W = parseFloat(wEl.value), S = parseFloat(sEl.value);
      var den = L + W - S;
      var p = den > 0 ? Math.max(0, Math.min(1, W / den)) : 1;
      var crash = p * p;
      var eu = -p * S; // at indifference
      var col = crash >= 0.2 ? C.red : (crash >= 0.1 ? C.amber : C.green);

      txt($('ck_lO'), L.toFixed(1));
      txt($('ck_wO'), W.toFixed(1));
      txt($('ck_sO'), S.toFixed(1));
      txt($('ck_p'), r2(p));
      txt($('ck_cr'), r2(crash));
      txt($('ck_eu'), r2(eu));
      tint($('ck_cr'), col);

      txt($('ck_vh'),
        'p*=W/(L+W−S)=' + p.toFixed(2) + '；独立混合下撞车率 ' + crash.toFixed(2) +
        '；均衡期望 ' + eu.toFixed(2));
      tint($('ck_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 16, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      // outcome probabilities: SS crash p^2, win 2p(1-p)/2 each side display as three bars
      var pCrash = crash;
      var pAsym = 2 * p * (1 - p);
      var pBothSoft = (1 - p) * (1 - p);
      var items = [
        { lab: '双硬撞车', v: pCrash, c: C.red },
        { lab: '一硬一软', v: pAsym, c: C.amber },
        { lab: '双方转弯', v: pBothSoft, c: C.green }
      ];
      var maxP = Math.max(0.01, pCrash, pAsym, pBothSoft);
      var barH = 32, gap = 16;
      var startY = pt + 24;
      items.forEach(function (it, i) {
        var y = startY + i * (barH + gap);
        var len = (it.v / maxP) * bw;
        ctx.fillStyle = it.c;
        ctx.fillRect(pl, y, Math.max(2, len), barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab, pl, y - 4);
        var lab = (it.v * 100).toFixed(1) + '%';
        ctx.fillStyle = C.ink2;
        clampLabel(ctx, lab, pl + len + 8, y + barH / 2 + 4, 'left', pl, w);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('混合 NE 下三种结果概率', pl + bw / 2, y1 + 31);
    }
    bind(['ck_l', 'ck_w', 'ck_s'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 3. Belief threshold ── */
  (function bel() {
    var qEl = $('bl_q'), lEl = $('bl_l'), wEl = $('bl_w'), sEl = $('bl_s');
    if (!qEl || !lEl || !wEl || !sEl) return;
    var cv = $('blChart');

    function upd() {
      var q = parseFloat(qEl.value), L = parseFloat(lEl.value);
      var W = parseFloat(wEl.value), S = parseFloat(sEl.value);
      var den = L + W - S;
      var qStar = den > 0 ? Math.max(0, Math.min(1, W / den)) : 1;
      var eS = -q * L + (1 - q) * W;
      var eW = -q * S;
      var goStraight = eS >= eW;
      var col = goStraight ? C.amber : C.green;

      txt($('bl_qO'), q.toFixed(2));
      txt($('bl_lO'), L.toFixed(1));
      txt($('bl_wO'), W.toFixed(1));
      txt($('bl_sO'), S.toFixed(1));
      txt($('bl_star'), r2(qStar));
      txt($('bl_es'), r2(eS));
      txt($('bl_ew'), r2(eW));
      txt($('bl_br'), goStraight ? '直行' : '转弯');
      tint($('bl_br'), col);

      var cmp = q < qStar - 1e-9 ? '<' : (q > qStar + 1e-9 ? '>' : '≈');
      txt($('bl_vh'),
        'q=' + q.toFixed(2) + ' ' + cmp + ' q*=' + qStar.toFixed(2) +
        ' → E(直行)=' + eS.toFixed(2) + (goStraight ? ' ≥ ' : ' < ') +
        'E(转弯)=' + eW.toFixed(2) + ' → 最优' + (goStraight ? '直行' : '转弯'));
      tint($('bl_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 16, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      // plot E(straight) and E(swerve) vs q in [0,1]
      var samples = [];
      var minY = Infinity, maxY = -Infinity;
      for (var i = 0; i <= 40; i++) {
        var qq = i / 40;
        var ys = -qq * L + (1 - qq) * W;
        var yw = -qq * S;
        samples.push({ q: qq, s: ys, w: yw });
        minY = Math.min(minY, ys, yw);
        maxY = Math.max(maxY, ys, yw);
      }
      if (maxY === minY) { maxY += 1; minY -= 1; }
      var pad = (maxY - minY) * 0.1;
      minY -= pad; maxY += pad;
      function X(qq) { return pl + qq * bw; }
      function Y(v) { return y1 - ((v - minY) / (maxY - minY)) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      for (var gline = 0; gline <= 4; gline++) {
        var gy = pt + (bh * gline) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, gy);
        ctx.lineTo(pl + bw, gy);
        ctx.stroke();
      }

      function strokeSeries(key, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        samples.forEach(function (pt2, idx) {
          var x = X(pt2.q), y = Y(pt2[key]);
          if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }
      strokeSeries('s', C.amber);
      strokeSeries('w', C.green);

      // q* and current q markers
      ctx.strokeStyle = C.blue;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(X(qStar), pt);
      ctx.lineTo(X(qStar), y1);
      ctx.stroke();
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      ctx.moveTo(X(q), pt);
      ctx.lineTo(X(q), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.blue;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('q*', X(qStar), pt + 10);
      ctx.fillStyle = C.red;
      ctx.fillText('q', X(q), pt + 10);

      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'right';
      ctx.fillText('琥珀=直行  绿=转弯', pl + bw, pt + 10);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('对方直行概率 q', pl + bw / 2, y1 + 31);
      // tick labels
      ctx.fillStyle = C.ink3;
      ctx.font = '10px sans-serif';
      [0, 0.5, 1].forEach(function (t) {
        ctx.fillText(String(t), X(t), y1 + 13);
      });
    }
    bind(['bl_q', 'bl_l', 'bl_w', 'bl_s'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 4. Commitment dose ── */
  (function cm() {
    var aEl = $('cm_a'), eEl = $('cm_e'), wEl = $('cm_w'), lEl = $('cm_l');
    if (!aEl || !eEl || !wEl || !lEl) return;
    var cv = $('cmChart');

    function upd() {
      var a = parseFloat(aEl.value), eps = parseFloat(eEl.value);
      var W = parseFloat(wEl.value), L = parseFloat(lEl.value);
      // Effective: with prob eps opponent also committed → crash -L;
      // else opponent yields → W. α scales how often you actually lock in (display only for narrative)
      var ev = (1 - eps) * W - eps * L;
      // blend with soft option if α low: with (1-α) you play mixed-like soft value ≈ -W^2/L if S=W
      var mix = L > 0 ? -(W * W) / L : 0;
      var blended = a * ev + (1 - a) * mix;
      var ok = blended > mix;
      var col = ok ? C.green : C.red;

      txt($('cm_aO'), a.toFixed(2));
      txt($('cm_eO'), eps.toFixed(2));
      txt($('cm_wO'), String(Math.round(W)));
      txt($('cm_lO'), String(Math.round(L)));
      txt($('cm_ev'), r1(blended));
      txt($('cm_mix'), r1(mix));
      txt($('cm_ok'), ok ? '是' : '否');
      tint($('cm_ok'), col);

      txt($('cm_vh'),
        'α=' + a.toFixed(2) + '、ε=' + eps.toFixed(2) +
        '：有效 EV≈α·[(1−ε)W−εL]+(1−α)·(−W²/L)=' + r1(blended) +
        (ok ? ' > ' : ' ≤ ') + '混合对照 ' + r1(mix) +
        (ok ? ' → 单方承诺划算' : ' → 不划算 / ε 过高'));
      tint($('cm_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 16, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      // EV vs ε curve at current α,W,L
      var pts = [];
      var minY = Infinity, maxY = -Infinity;
      for (var i = 0; i <= 40; i++) {
        var e = (i / 40) * 0.8;
        var raw = (1 - e) * W - e * L;
        var val = a * raw + (1 - a) * mix;
        pts.push({ e: e, v: val });
        minY = Math.min(minY, val, mix);
        maxY = Math.max(maxY, val, mix);
      }
      if (maxY === minY) { maxY += 1; minY -= 1; }
      var pad = (maxY - minY) * 0.12;
      minY -= pad; maxY += pad;
      function X(e) { return pl + (e / 0.8) * bw; }
      function Y(v) { return y1 - ((v - minY) / (maxY - minY)) * bh; }

      ctx.strokeStyle = C.grid;
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pt + (bh * gi) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, gy);
        ctx.lineTo(pl + bw, gy);
        ctx.stroke();
      }

      // mix baseline
      ctx.strokeStyle = C.ink3;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, Y(mix));
      ctx.lineTo(pl + bw, Y(mix));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (pt2, idx) {
        var x = X(pt2.e), y = Y(pt2.v);
        if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // current ε marker
      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(X(eps), Y(blended), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('虚线=混合对照', pl + bw, pt + 10);
      ctx.textAlign = 'center';
      ctx.fillText('对方也承诺的概率 ε', pl + bw / 2, y1 + 31);
      ctx.font = '10px sans-serif';
      [0, 0.4, 0.8].forEach(function (t) {
        ctx.fillText(String(t), X(t), y1 + 13);
      });
    }
    bind(['cm_a', 'cm_e', 'cm_w', 'cm_l'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();
})();
