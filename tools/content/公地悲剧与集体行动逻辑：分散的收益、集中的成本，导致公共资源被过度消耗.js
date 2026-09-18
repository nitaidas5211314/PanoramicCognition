/* ============================================================
   《公地悲剧与集体行动逻辑》主题脚本
   四个可调模型：
     1. 牧场过牧比 Xn/Xs = 2N/(N+1)
     2. 奥尔森账 B/N + S ? C
     3. 线性公共品 MPCR 缺口
     4. 渔场再生 vs 总捕捞
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

  /* ── 1. Pasture overgrazing ── */
  (function pasture() {
    var nEl = $('pa_n'), vEl = $('pa_v0'), dEl = $('pa_d');
    if (!nEl || !vEl || !dEl) return;
    var cv = $('paChart');

    function upd() {
      var N = parseFloat(nEl.value), V0 = parseFloat(vEl.value), d = parseFloat(dEl.value);
      if (d < 0.05) d = 0.05;
      var Xs = V0 / (2 * d);
      var Xn = (N / (N + 1)) * (V0 / d);
      var ratio = (2 * N) / (N + 1);
      var rentS = Xs * (V0 - d * Xs);
      var rentN = Xn * (V0 - d * Xn);
      var col = ratio > 1.7 ? C.red : (ratio > 1.4 ? C.amber : C.green);

      txt($('pa_nO'), String(N));
      txt($('pa_v0O'), V0.toFixed(1));
      txt($('pa_dO'), d.toFixed(2));
      txt($('pa_xs'), Xs.toFixed(2));
      txt($('pa_xn'), Xn.toFixed(2));
      txt($('pa_ratio'), ratio.toFixed(3));
      tint($('pa_ratio'), col);

      var msg = 'N=' + N + '：Xn/Xs=' + ratio.toFixed(3) +
        '；社会租 ' + rentS.toFixed(1) + '，纳什租 ' + rentN.toFixed(1) +
        (rentN < rentS * 0.5 ? ' → 租值消散明显' : ' → 仍有部分租');
      txt($('pa_vh'), msg);
      tint($('pa_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '社会 Xs', v: Xs, c: C.green },
        { lab: '纳什 Xn', v: Xn, c: C.red },
        { lab: '上限 2·Xs', v: 2 * Xs, c: C.amber }
      ];
      var vmax = Math.max(vals[0].v, vals[1].v, vals[2].v, 1);
      function sx(v) { return pl + (v / vmax) * (bw - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      vals.forEach(function (item, i) {
        var y = sy(i), x0 = pl, x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(x0, y - 12, Math.max(2, x1 - x0), 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(2), x1 + 8, y + 4, 'left', pl, w);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('总量（头/单位）', pl + bw / 2, y1 + 31);
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
    bind(['pa_n', 'pa_v0', 'pa_d'], upd);
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
      var act = net > 0;
      var col = act ? C.green : C.red;

      txt($('ol_bO'), String(Math.round(B)));
      txt($('ol_cO'), String(Math.round(Ccost)));
      txt($('ol_nO'), String(N));
      txt($('ol_sO'), String(Math.round(S)));
      txt($('ol_share'), share.toFixed(1));
      txt($('ol_net'), (net >= 0 ? '+' : '') + net.toFixed(1));
      txt($('ol_act'), act ? '是' : '否');
      tint($('ol_act'), col);
      tint($('ol_net'), col);

      var msg = 'B/N+S=' + (share + S).toFixed(1) + (act ? ' ≥ ' : ' < ') + 'C=' + Ccost +
        (act ? ' → 理性参与' : ' → 理性不参与（典型大集团搭便车）');
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

      // threshold line at C
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
      ctx.fillText('激励分量（参与门槛=成本线）', pl + bw / 2, y1 + 31);
    }
    bind(['ol_b', 'ol_c', 'ol_n', 'ol_s'], upd);
    upd();
  })();

  /* ── 3. Public goods MPCR ── */
  (function pg() {
    var mEl = $('pg_m'), nEl = $('pg_n');
    if (!mEl || !nEl) return;
    var cv = $('pgChart');

    function upd() {
      var m = parseFloat(mEl.value), N = parseFloat(nEl.value);
      var inv = 1 / N;
      var soc = m > inv;
      var pri = m > 1;
      var gap = soc && !pri;
      var col = gap ? C.red : (pri ? C.green : C.amber);

      txt($('pg_mO'), m.toFixed(2));
      txt($('pg_nO'), String(N));
      txt($('pg_inv'), inv.toFixed(2));
      txt($('pg_soc'), soc ? '是' : '否');
      txt($('pg_pri'), pri ? '是' : '否');
      tint($('pg_soc'), soc ? C.green : C.amber);
      tint($('pg_pri'), pri ? C.green : C.red);

      var msg;
      if (gap) {
        msg = '1/N=' + inv.toFixed(2) + ' < m=' + m.toFixed(2) + ' ≤ 1 → 经典搭便车缺口：集体理性要贡献，个体理性不贡献';
      } else if (pri) {
        msg = 'm=' + m.toFixed(2) + ' > 1 → 贡献是私人占优，缺口关闭';
      } else {
        msg = 'm=' + m.toFixed(2) + ' ≤ 1/N=' + inv.toFixed(2) + ' → 连社会也不该（在此线性模型下）强制贡献';
      }
      txt($('pg_vh'), msg);
      tint($('pg_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 36, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxM = 1.5;

      function sx(v) { return pl + (v / maxM) * bw; }
      function sy(v) { return y1 - (v / maxM) * bh; } // unused vertical

      // zones
      var x0 = pl, xInv = sx(inv), x1 = sx(1), xMax = sx(maxM);
      ctx.fillStyle = 'rgba(184,115,10,0.15)';
      ctx.fillRect(x0, pt, Math.max(0, xInv - x0), bh);
      ctx.fillStyle = 'rgba(213,52,44,0.18)';
      ctx.fillRect(xInv, pt, Math.max(0, x1 - xInv), bh);
      ctx.fillStyle = 'rgba(15,138,77,0.15)';
      ctx.fillRect(x1, pt, Math.max(0, xMax - x1), bh);

      // marker for m
      var xm = sx(Math.min(m, maxM));
      ctx.strokeStyle = C.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xm, pt);
      ctx.lineTo(xm, y1);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = C.ink;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('m=' + m.toFixed(2), xm, pt - 8);

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MPCR 轴：黄=社会也不要 · 红=缺口 · 绿=私人也要', pl + bw / 2, y1 + 31);
      [[inv, '1/N'], [1, '1']].forEach(function (pair) {
        var xx = sx(pair[0]);
        ctx.fillStyle = C.ink2;
        ctx.font = '10px sans-serif';
        ctx.fillText(pair[1], xx, y1 + 13);
      });
    }
    bind(['pg_m', 'pg_n'], upd);
    upd();
  })();

  /* ── 4. Fishery stock ── */
  (function fish() {
    var rEl = $('fi_r'), kEl = $('fi_k'), nEl = $('fi_n'), hEl = $('fi_h');
    if (!rEl || !kEl || !nEl || !hEl) return;
    var cv = $('fiChart');

    function steady(r, K, H) {
      var MSY = r * K / 4;
      if (H > MSY + 1e-9) return { MSY: MSY, high: null, low: null, ok: false };
      if (Math.abs(H - MSY) < 1e-9) return { MSY: MSY, high: K / 2, low: K / 2, ok: true };
      var disc = 1 - 4 * H / (r * K);
      if (disc < 0) return { MSY: MSY, high: null, low: null, ok: false };
      var s = Math.sqrt(disc);
      return { MSY: MSY, high: (K / 2) * (1 + s), low: (K / 2) * (1 - s), ok: true };
    }

    function upd() {
      var r = parseFloat(rEl.value), K = parseFloat(kEl.value);
      var N = parseFloat(nEl.value), h = parseFloat(hEl.value);
      var H = N * h;
      var st = steady(r, K, H);
      var col = st.ok ? (H > st.MSY * 0.85 ? C.amber : C.green) : C.red;

      txt($('fi_rO'), r.toFixed(2));
      txt($('fi_kO'), String(Math.round(K)));
      txt($('fi_nO'), String(N));
      txt($('fi_hO'), h.toFixed(1));
      txt($('fi_H'), H.toFixed(1));
      txt($('fi_msy'), st.MSY.toFixed(1));
      txt($('fi_ss'), st.high != null ? st.high.toFixed(1) : '无');
      tint($('fi_ss'), col);

      var msg;
      if (!st.ok) {
        msg = 'H=' + H.toFixed(1) + ' > MSY=' + st.MSY.toFixed(1) + ' → 无正稳态，开放获取路径指向崩溃';
      } else {
        msg = 'H=' + H.toFixed(1) + ' < MSY=' + st.MSY.toFixed(1) +
          ' → 存在高稳态约 ' + st.high.toFixed(1) + '；继续加船/加网将逼近崩溃阈值';
      }
      txt($('fi_vh'), msg);
      tint($('fi_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, hgt = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = hgt - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      // plot g(S) and H line
      var nPts = 60;
      var gMax = st.MSY;
      function sx(S) { return pl + (S / K) * bw; }
      function sy(v) { return y1 - (v / (gMax * 1.15 || 1)) * bh; }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= nPts; i++) {
        var S = (K * i) / nPts;
        var gv = r * S * (1 - S / K);
        var x = sx(S), y = sy(gv);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.lineWidth = 1;

      // H horizontal
      ctx.strokeStyle = C.red;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(H));
      ctx.lineTo(pl + bw, sy(H));
      ctx.stroke();
      ctx.setLineDash([]);

      // MSY marker
      ctx.strokeStyle = C.amber;
      ctx.beginPath();
      ctx.moveTo(sx(K / 2), pt);
      ctx.lineTo(sx(K / 2), y1);
      ctx.stroke();

      if (st.high != null) {
        ctx.fillStyle = C.green;
        ctx.beginPath();
        ctx.arc(sx(st.high), sy(H), 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('再生 g(S)', pl + bw, pt + 12);
      ctx.fillStyle = C.red;
      ctx.fillText('H=' + H.toFixed(1), pl + bw, sy(H) - 6);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('存量 S（承载力 K=' + Math.round(K) + '）', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'center';
      ctx.fillText('0', pl, y1 + 13);
      ctx.fillText(String(Math.round(K)), pl + bw, y1 + 13);
    }
    bind(['fi_r', 'fi_k', 'fi_n', 'fi_h'], upd);
    upd();
  })();
})();
