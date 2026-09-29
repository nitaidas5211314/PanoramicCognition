/* ============================================================
   《免费搭便车 Free Riding》主题脚本
   四个可调模型：
     1. VCM 账本（私人 Δ / 社会 Δ / 收益）
     2. 奥尔森账本（B/N+S ≷ C）
     3. MPCR 距离与困境区
     4. 多轮衰减 vs 惩罚托底（示意）
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
  function signed(x, d) {
    d = d == null ? 2 : d;
    var s = x.toFixed(d);
    return (x > 0 ? '+' : '') + s;
  }

  /* ── 1. VCM ledger ── */
  (function vcm() {
    var nEl = $('vc_n'), mEl = $('vc_m'), eEl = $('vc_e'), cEl = $('vc_c'), oEl = $('vc_o');
    if (!nEl || !mEl || !eEl || !cEl || !oEl) return;
    var cv = $('vcChart');

    function upd() {
      var N = parseFloat(nEl.value);
      var m = parseFloat(mEl.value);
      var e = parseFloat(eEl.value);
      var c = Math.min(parseFloat(cEl.value), e);
      var o = Math.min(parseFloat(oEl.value), e);
      cEl.value = String(c);
      oEl.value = String(o);

      var sum = c + (N - 1) * o;
      var pi = e - c + m * sum;
      var pri = -1 + m;
      var soc = -1 + m * N;
      var gap = soc - pri; // = m*(N-1)
      var allDef = e;
      var allCoop = e - e + m * (N * e);
      var col = (m < 1 && m * N > 1) ? C.red : (m >= 1 ? C.green : C.amber);

      txt($('vc_nO'), String(N));
      txt($('vc_mO'), m.toFixed(2));
      txt($('vc_eO'), String(Math.round(e)));
      txt($('vc_cO'), String(Math.round(c)));
      txt($('vc_oO'), String(Math.round(o)));
      txt($('vc_pi'), pi.toFixed(1));
      txt($('vc_pri'), signed(pri));
      txt($('vc_soc'), signed(soc));
      txt($('vc_gap'), gap.toFixed(2));
      tint($('vc_pri'), pri < 0 ? C.red : C.green);
      tint($('vc_soc'), soc > 0 ? C.green : C.red);
      tint($('vc_gap'), col);

      var msg;
      if (m < 1 && m * N > 1) {
        msg = 'm=' + m.toFixed(2) + '<1：占优不贡献；m·N=' + (m * N).toFixed(2) + '>1：社会要全贡献 → 经典搭便车缺口';
      } else if (m >= 1) {
        msg = 'm≥1：私人也愿贡献（社会困境消失）；全合作收益 ' + allCoop.toFixed(1);
      } else {
        msg = 'm·N=' + (m * N).toFixed(2) + '≤1：连社会都不该贡献（公共品太弱）';
      }
      msg += '｜当前你收益 ' + pi.toFixed(1) + '（全叛 ' + allDef.toFixed(1) + ' / 全合 ' + allCoop.toFixed(1) + '）';
      txt($('vc_vh'), msg);
      tint($('vc_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '你的收益', v: pi, c: C.blue },
        { lab: '全背叛', v: allDef, c: C.amber },
        { lab: '全合作', v: allCoop, c: C.green }
      ];
      var vmax = Math.max(vals[0].v, vals[1].v, vals[2].v, 1);
      function sx(v) { return pl + (v / vmax) * (bw - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      vals.forEach(function (item, i) {
        var y = sy(i), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(pl, y - 12, Math.max(2, x1 - pl), 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(1), x1 + 8, y + 4, 'left', pl, w);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('收益（私人Δ=' + signed(pri) + '，社会Δ=' + signed(soc) + '）', pl + bw / 2, y1 + 31);
      for (var t = 0; t <= 4; t++) {
        var tv = (vmax * t) / 4;
        var xx = sx(tv);
        ctx.strokeStyle = C.axis;
        ctx.beginPath();
        ctx.moveTo(xx, y1);
        ctx.lineTo(xx, y1 + 4);
        ctx.stroke();
        ctx.fillStyle = C.ink3;
        ctx.textAlign = 'center';
        ctx.fillText(tv.toFixed(0), xx, y1 + 13);
      }
    }
    bind(['vc_n', 'vc_m', 'vc_e', 'vc_c', 'vc_o'], upd);
    upd();
  })();

  /* ── 2. Olson ledger ── */
  (function olson() {
    var bEl = $('ol_b'), cEl = $('ol_c'), nEl = $('ol_n'), sEl = $('ol_s');
    if (!bEl || !cEl || !nEl || !sEl) return;
    var cv = $('olChart');

    function upd() {
      var B = parseFloat(bEl.value), Ccost = parseFloat(cEl.value);
      var N = parseFloat(nEl.value), S = parseFloat(sEl.value);
      var share = B / N;
      var net = share + S - Ccost;
      var act = net >= 0;
      var nstar = Ccost > 0 ? B / Ccost : Infinity;
      // With S: effective participate if B/N + S >= C; for S < C, N* = B/(C-S)
      var nstarS = (Ccost - S) > 1e-9 ? B / (Ccost - S) : Infinity;
      var col = act ? C.green : C.red;

      txt($('ol_bO'), String(Math.round(B)));
      txt($('ol_cO'), String(Math.round(Ccost)));
      txt($('ol_nO'), String(N));
      txt($('ol_sO'), String(Math.round(S)));
      txt($('ol_share'), share.toFixed(1));
      txt($('ol_net'), (net >= 0 ? '+' : '') + net.toFixed(1));
      txt($('ol_nstar'), isFinite(nstar) ? nstar.toFixed(1) : '∞');
      txt($('ol_act'), act ? '是' : '否');
      tint($('ol_act'), col);
      tint($('ol_net'), col);

      var msg = 'B/N+S=' + (share + S).toFixed(1) + (act ? ' ≥ ' : ' < ') + 'C=' + Ccost +
        (act ? ' → 理性参与' : ' → 理性不参与（大集团搭便车）');
      if (!act && isFinite(nstarS)) {
        msg += '｜S 不变时临界人数≈' + nstarS.toFixed(1) + '（无 S 时 N*=' + nstar.toFixed(1) + '）';
      } else if (act) {
        msg += '｜无 S 临界 N*=' + nstar.toFixed(1);
      }
      txt($('ol_vh'), msg);
      tint($('ol_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '份额 B/N', v: share, c: C.blue },
        { lab: '+ 选择性 S', v: S, c: C.amber },
        { lab: '成本 C', v: Ccost, c: C.red }
      ];
      var vmax = Math.max(vals[0].v, vals[1].v, vals[2].v, share + S, 1);
      function sx(v) { return pl + (v / vmax) * (bw - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      vals.forEach(function (item, i) {
        var y = sy(i), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(pl, y - 12, Math.max(2, x1 - pl), 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(1), x1 + 8, y + 4, 'left', pl, w);
      });

      var xc = sx(Ccost);
      ctx.strokeStyle = C.red;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(xc, pt);
      ctx.lineTo(xc, y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('激励分量（门槛=成本线）', pl + bw / 2, y1 + 31);
      for (var t = 0; t <= 4; t++) {
        var tv = (vmax * t) / 4;
        var xx = sx(tv);
        ctx.strokeStyle = C.axis;
        ctx.beginPath();
        ctx.moveTo(xx, y1);
        ctx.lineTo(xx, y1 + 4);
        ctx.stroke();
        ctx.fillStyle = C.ink3;
        ctx.textAlign = 'center';
        ctx.fillText(tv.toFixed(0), xx, y1 + 13);
      }
    }
    bind(['ol_b', 'ol_c', 'ol_n', 'ol_s'], upd);
    upd();
  })();

  /* ── 3. MPCR distance ── */
  (function dist() {
    var mEl = $('ds_m'), nEl = $('ds_n');
    if (!mEl || !nEl) return;
    var cv = $('dsChart');

    function upd() {
      var m = parseFloat(mEl.value), N = parseFloat(nEl.value);
      var inv = 1 / N;
      var d = m - inv;
      var zone, col, msg;
      if (m >= 1) {
        zone = '无困境';
        col = C.green;
        msg = 'm≥1：私人也愿贡献；d=' + d.toFixed(3);
      } else if (m * N <= 1) {
        zone = '公共品过弱';
        col = C.amber;
        msg = 'm·N≤1：社会也不该贡献；1/N=' + inv.toFixed(3) + '，m=' + m.toFixed(2);
      } else {
        zone = '经典困境';
        col = C.red;
        msg = '1/N=' + inv.toFixed(3) + ' < m=' + m.toFixed(2) + ' < 1 → 社会要贡献、私人不贡献（d=' + d.toFixed(3) + '）';
      }

      txt($('ds_mO'), m.toFixed(2));
      txt($('ds_nO'), String(N));
      txt($('ds_inv'), inv.toFixed(3));
      txt($('ds_d'), d.toFixed(3));
      txt($('ds_zone'), zone);
      tint($('ds_zone'), col);
      tint($('ds_d'), d > 0.3 ? C.green : (d > 0 ? C.amber : C.red));
      txt($('ds_vh'), msg);
      tint($('ds_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      // Draw zones on m-axis conceptually as bars: inv, m, 1
      var vals = [
        { lab: '1/N', v: inv, c: C.amber },
        { lab: 'MPCR m', v: m, c: C.blue },
        { lab: '门槛 1', v: 1, c: C.ink3 }
      ];
      var vmax = Math.max(1.5, m, inv);
      function sx(v) { return pl + (v / vmax) * (bw - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      vals.forEach(function (item, i) {
        var y = sy(i), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(pl, y - 12, Math.max(2, x1 - pl), 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(3), x1 + 8, y + 4, 'left', pl, w);
      });

      // shade dilemma interval note
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('标尺：困境区约在 1/N 与 1 之间（d=m−1/N=' + d.toFixed(3) + '）', pl + bw / 2, y1 + 31);
      for (var t = 0; t <= 4; t++) {
        var tv = (vmax * t) / 4;
        var xx = sx(tv);
        ctx.strokeStyle = C.axis;
        ctx.beginPath();
        ctx.moveTo(xx, y1);
        ctx.lineTo(xx, y1 + 4);
        ctx.stroke();
        ctx.fillStyle = C.ink3;
        ctx.textAlign = 'center';
        ctx.fillText(tv.toFixed(2), xx, y1 + 13);
      }
    }
    bind(['ds_m', 'ds_n'], upd);
    upd();
  })();

  /* ── 4. Decay vs punishment (schematic) ── */
  (function decay() {
    var tEl = $('de_t'), pEl = $('de_p'), sEl = $('de_s');
    if (!tEl || !pEl || !sEl) return;
    var cv = $('deChart');

    function pathAt(round, T, start, p) {
      // baseline asymptote ~18; punishment asymptote ~65, peak ~70 mid
      var baseEnd = 18;
      var punEnd = 65;
      var punPeak = 70;
      var base = start + (baseEnd - start) * (1 - Math.exp(-6.0 * (round - 1) / Math.max(1, T - 1)));
      // punishment: rise then slight drop
      var x = (round - 1) / Math.max(1, T - 1);
      var pun = start + (punPeak - start) * (1 - Math.exp(-3.0 * x));
      if (x > 0.55) {
        pun = punPeak + (punEnd - punPeak) * ((x - 0.55) / 0.45);
      }
      return (1 - p) * base + p * pun;
    }

    function upd() {
      var T = parseFloat(tEl.value);
      var p = parseFloat(pEl.value);
      var start = parseFloat(sEl.value);
      var end = pathAt(T, T, start, p);
      var chg = end - start;
      var mode = p < 0.15 ? '基线衰减' : (p < 0.6 ? '混合托底' : '惩罚托底');
      var col = end < 30 ? C.red : (end < 55 ? C.amber : C.green);

      txt($('de_tO'), String(T));
      txt($('de_pO'), p.toFixed(2));
      txt($('de_sO'), String(Math.round(start)));
      txt($('de_end'), end.toFixed(1));
      txt($('de_chg'), (chg >= 0 ? '+' : '') + chg.toFixed(1) + 'pp');
      txt($('de_mode'), mode);
      tint($('de_end'), col);
      tint($('de_chg'), chg >= 0 ? C.green : C.red);
      tint($('de_mode'), col);

      var msg = '惩罚=' + p.toFixed(2) + '：示意末轮约 ' + end.toFixed(1) + '%（首轮 ' + start + '%）' +
        (p < 0.15 ? ' → 典型搭便车螺旋' : ' → 惩罚提高稳态贡献（示意量级，待验证）');
      txt($('de_vh'), msg);
      tint($('de_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = 0, ymax = 100;
      function sx(r) { return pl + ((r - 1) / Math.max(1, T - 1)) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      // grid
      ctx.strokeStyle = C.grid;
      for (var gv = 0; gv <= 100; gv += 25) {
        ctx.beginPath();
        ctx.moveTo(pl, sy(gv));
        ctx.lineTo(pl + bw, sy(gv));
        ctx.stroke();
        ctx.fillStyle = C.ink3;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(String(gv), pl - 6, sy(gv) + 3);
      }

      // baseline reference (p=0) dashed
      ctx.strokeStyle = C.ink3;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      for (var r = 1; r <= T; r++) {
        var yb = pathAt(r, T, start, 0);
        var x = sx(r), y = sy(yb);
        if (r === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // current path
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (r = 1; r <= T; r++) {
        var yc = pathAt(r, T, start, p);
        x = sx(r); y = sy(yc);
        if (r === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.lineWidth = 1;

      // end marker
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(sx(T), sy(end), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('虚线=无惩罚参照', pl + bw, pt - 8);
      ctx.textAlign = 'center';
      ctx.fillText('轮次（贡献占禀赋 %）', pl + bw / 2, y1 + 31);
      var step = T <= 10 ? 1 : 2;
      for (r = 1; r <= T; r += step) {
        ctx.strokeStyle = C.axis;
        ctx.beginPath();
        ctx.moveTo(sx(r), y1);
        ctx.lineTo(sx(r), y1 + 4);
        ctx.stroke();
        ctx.fillStyle = C.ink3;
        ctx.textAlign = 'center';
        ctx.fillText(String(r), sx(r), y1 + 13);
      }
    }
    bind(['de_t', 'de_p', 'de_s'], upd);
    upd();
  })();
})();
