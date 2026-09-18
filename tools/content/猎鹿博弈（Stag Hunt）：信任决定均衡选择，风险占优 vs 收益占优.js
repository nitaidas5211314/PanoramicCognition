/* ============================================================
   《猎鹿博弈 Stag Hunt》主题脚本
   四个可调模型：
     1. 支付矩阵 → q* / 吸引盆 / 风险占优
     2. 信念 q 与最优反应
     3. 垫高 S vs 做大 R
     4. 配对相关 ρ
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
  function r2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function r1(x) { return (Math.round(x * 10) / 10).toFixed(1); }

  function qStar(R, T, P, S) {
    var den = R - S + P - T;
    if (Math.abs(den) < 1e-12) return NaN;
    return (P - S) / den;
  }
  function lossProd(R, T, P, S) {
    var leaveStag = (R - T) * (R - T);
    var leaveHare = (P - S) * (P - S);
    return { leaveStag: leaveStag, leaveHare: leaveHare };
  }

  /* ── 1. Matrix explorer ── */
  (function mx() {
    var rEl = $('mx_r'), tEl = $('mx_t'), pEl = $('mx_p'), sEl = $('mx_s');
    if (!rEl || !tEl || !pEl || !sEl) return;
    var cv = $('mxChart');

    function upd() {
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), S = parseFloat(sEl.value);
      var q = qStar(R, T, P, S);
      var lp = lossProd(R, T, P, S);
      var hareRD = lp.leaveHare > lp.leaveStag;
      var stagRD = lp.leaveStag > lp.leaveHare;
      var rdLab = hareRD ? '猎兔' : (stagRD ? '猎鹿' : '打平');
      var col = hareRD ? C.amber : (stagRD ? C.green : C.blue);
      var qOk = isFinite(q) && q >= 0 && q <= 1;
      var qCl = qOk ? Math.max(0, Math.min(1, q)) : 0.5;
      var bs = qOk ? (1 - qCl) : NaN;
      var bh = qOk ? qCl : NaN;

      txt($('mx_rO'), r1(R));
      txt($('mx_tO'), r1(T));
      txt($('mx_pO'), r1(P));
      txt($('mx_sO'), r1(S));
      txt($('mx_q'), qOk ? r2(qCl) : '—');
      txt($('mx_bs'), qOk ? r2(bs) : '—');
      txt($('mx_bh'), qOk ? r2(bh) : '—');
      txt($('mx_rd'), rdLab);
      tint($('mx_rd'), col);

      var msg;
      if (!qOk) {
        msg = '分母接近 0 或 q* 越界：请调整支付，保持猎鹿型 R>T≥P>S。';
        col = C.red;
      } else {
        msg = 'q*=' + r2(qCl) + '；损失积 兔' + r1(lp.leaveHare) + ' vs 鹿' + r1(lp.leaveStag) +
          ' → ' + rdLab + '风险占优；猎兔盆 ' + r2(bh);
      }
      txt($('mx_vh'), msg);
      tint($('mx_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr;
      var items = [
        { lab: '猎鹿吸引盆', v: qOk ? bs : 0, c: C.green },
        { lab: '猎兔吸引盆', v: qOk ? bh : 0, c: C.amber }
      ];
      var maxV = Math.max(0.01, items[0].v, items[1].v);
      var barH = 36, gap = 22, startY = pt + 28;
      items.forEach(function (it, i) {
        var y = startY + i * (barH + gap);
        var len = (it.v / maxV) * bw;
        ctx.fillStyle = it.c;
        ctx.fillRect(pl, y, Math.max(2, len), barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab, pl, y - 4);
        var lab = (it.v * 100).toFixed(0) + '%';
        ctx.fillStyle = C.ink2;
        clampLabel(ctx, lab, pl + len + 8, y + barH / 2 + 4, 'left', pl, w);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('吸引盆对照（混合均衡两侧）', pl + bw / 2, y1 + 31);
    }
    bind(['mx_r', 'mx_t', 'mx_p', 'mx_s'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 2. Belief best response ── */
  (function bl() {
    var qEl = $('bl_q'), rEl = $('bl_r'), tEl = $('bl_t'), pEl = $('bl_p'), sEl = $('bl_s');
    if (!qEl || !rEl) return;
    var cv = $('blChart');

    function upd() {
      var q = parseFloat(qEl.value), R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), S = parseFloat(sEl.value);
      var star = qStar(R, T, P, S);
      var eS = q * R + (1 - q) * S;
      var eH = q * T + (1 - q) * P;
      var preferStag = eS >= eH;
      var col = preferStag ? C.green : C.amber;

      txt($('bl_qO'), r2(q));
      txt($('bl_rO'), r1(R));
      txt($('bl_tO'), r1(T));
      txt($('bl_pO'), r1(P));
      txt($('bl_sO'), r1(S));
      txt($('bl_star'), isFinite(star) ? r2(star) : '—');
      txt($('bl_es'), r2(eS));
      txt($('bl_eh'), r2(eH));
      txt($('bl_br'), preferStag ? '猎鹿' : '猎兔');
      tint($('bl_br'), col);

      var cmp = preferStag ? '≥' : '<';
      var msg = 'q=' + r2(q) + (isFinite(star) ? (' ' + (q >= star ? '≥' : '<') + ' q*=' + r2(star)) : '') +
        ' → E(鹿)=' + r2(eS) + ' ' + cmp + ' E(兔)=' + r2(eH) + ' → 最优' + (preferStag ? '猎鹿' : '猎兔');
      txt($('bl_vh'), msg);
      tint($('bl_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 16, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var minY = Math.min(0, S, P, T, R) - 0.5;
      var maxY = Math.max(S, P, T, R) + 0.5;
      function sx(qq) { return pl + qq * bw; }
      function sy(v) { return y1 - ((v - minY) / (maxY - minY)) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      // E(stag) and E(hare) lines
      ctx.strokeStyle = C.green;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(S));
      ctx.lineTo(sx(1), sy(R));
      ctx.stroke();
      ctx.strokeStyle = C.amber;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(P));
      ctx.lineTo(sx(1), sy(T));
      ctx.stroke();

      if (isFinite(star) && star >= 0 && star <= 1) {
        ctx.strokeStyle = C.blue;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(sx(star), pt);
        ctx.lineTo(sx(star), y1);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = C.blue;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('q*', sx(star), pt + 10);
      }

      ctx.fillStyle = C.ink;
      ctx.beginPath();
      ctx.arc(sx(q), sy(eS), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.ink2;
      ctx.beginPath();
      ctx.arc(sx(q), sy(eH), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('绿=E(鹿) 琥珀=E(兔)', pl + bw, pt + 10);
      ctx.textAlign = 'center';
      ctx.fillText('信念 q → 期望支付', pl + bw / 2, y1 + 31);
    }
    bind(['bl_q', 'bl_r', 'bl_t', 'bl_p', 'bl_s'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 3. R vs S levers ── */
  (function lv() {
    var rEl = $('lv_r'), sEl = $('lv_s');
    if (!rEl || !sEl) return;
    var cv = $('lvChart');
    var T = 3, P = 3;

    function upd() {
      var R = parseFloat(rEl.value), S = parseFloat(sEl.value);
      var q = qStar(R, T, P, S);
      var q0 = qStar(4, T, P, 0);
      var qR6 = qStar(6, T, P, 0);
      var qS1 = qStar(4, T, P, 1);
      var dlt = (isFinite(q) && isFinite(q0)) ? (q - q0) : NaN;
      var col = (isFinite(q) && q <= 0.5) ? C.green : (isFinite(q) && q < 0.75 ? C.blue : C.amber);

      txt($('lv_rO'), r1(R));
      txt($('lv_sO'), r1(S));
      txt($('lv_q'), isFinite(q) ? r2(q) : '—');
      txt($('lv_r6'), r2(qR6));
      txt($('lv_s1'), r2(qS1));
      txt($('lv_d'), isFinite(dlt) ? ((dlt >= 0 ? '+' : '') + r2(dlt)) : '—');
      tint($('lv_q'), col);

      txt($('lv_vh'),
        '当前 q*=' + (isFinite(q) ? r2(q) : '—') +
        '；对照「R=6→' + r2(qR6) + '」「S=1→' + r2(qS1) +
        '」——垫高残值与做大饼都有效');
      tint($('lv_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr;
      var vals = [
        { lab: '当前', v: isFinite(q) ? q : 0, c: col },
        { lab: '默认 0.75', v: 0.75, c: C.ink3 },
        { lab: 'R=6', v: qR6, c: C.green },
        { lab: 'S=1', v: qS1, c: C.blue }
      ];
      var maxV = 1;
      var barH = 22, gap = 12, startY = pt + 20;
      vals.forEach(function (it, i) {
        var y = startY + i * (barH + gap);
        var len = (it.v / maxV) * bw;
        ctx.fillStyle = it.c;
        ctx.fillRect(pl, y, Math.max(2, len), barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab, pl, y - 3);
        var lab = r2(it.v);
        ctx.fillStyle = C.ink2;
        clampLabel(ctx, lab, pl + len + 8, y + barH / 2 + 4, 'left', pl, w);
      });
      // 0.5 reference
      var x05 = pl + 0.5 * bw;
      ctx.strokeStyle = C.red;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x05, pt);
      ctx.lineTo(x05, y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.red;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('0.50', x05, pt + 10);

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('q* 越低越好（门槛）', pl + bw / 2, y1 + 31);
    }
    bind(['lv_r', 'lv_s'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 4. Assortative matching ── */
  (function as() {
    var rhoEl = $('as_rho'), pEl = $('as_p'), qEl = $('as_q');
    if (!rhoEl || !pEl || !qEl) return;
    var cv = $('asChart');

    function upd() {
      var rho = parseFloat(rhoEl.value), p = parseFloat(pEl.value), qstar = parseFloat(qEl.value);
      var r = rho + (1 - rho) * p;
      var gap = r - qstar;
      var ok = r >= qstar;
      var col = ok ? C.green : C.amber;

      txt($('as_rhoO'), r2(rho));
      txt($('as_pO'), r2(p));
      txt($('as_qO'), r2(qstar));
      txt($('as_r'), r2(r));
      txt($('as_gap'), (gap >= 0 ? '+' : '') + r2(gap));
      txt($('as_ok'), ok ? '是' : '否');
      tint($('as_ok'), col);

      txt($('as_vh'),
        'r=ρ+(1−ρ)p=' + r2(r) + (ok ? ' ≥ ' : ' < ') + 'q*=' + r2(qstar) +
        ' → 局部猎鹿' + (ok ? '可维持' : '尚不可维持') + (ok ? '' : '；提高 ρ 或 p'));
      tint($('as_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      function sx(x) { return pl + x * bw; }
      function sy(v) { return y1 - v * bh; }

      // r vs rho curve at fixed p
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 100; i++) {
        var rr = i / 100;
        var rv = rr + (1 - rr) * p;
        var x = sx(rr), y = sy(rv);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // q* horizontal
      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(qstar));
      ctx.lineTo(pl + bw, sy(qstar));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.ink;
      ctx.beginPath();
      ctx.arc(sx(rho), sy(r), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('曲线：固定 p 下 r(ρ)', pl, pt + 12);
      ctx.textAlign = 'right';
      ctx.fillText('琥珀线 = q*', pl + bw, pt + 12);
      ctx.textAlign = 'center';
      ctx.fillText('同型配对强度 ρ', pl + bw / 2, y1 + 31);
    }
    bind(['as_rho', 'as_p', 'as_q'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();
})();
