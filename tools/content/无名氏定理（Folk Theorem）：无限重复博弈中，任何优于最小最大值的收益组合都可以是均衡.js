/* ============================================================
   《无名氏定理（Folk Theorem）》主题脚本
   四个可调模型：
     1. 目标支付门槛 δ* = (T−v)/(T−p)
     2. Friedman (p=e) vs 完整 Folk (p=m)
     3. 有限惩罚 L 期（大棒胡萝卜）
     4. PD 可行–个人理性集 V*
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
  function dstar(T, v, p) {
    if (!(T > p)) return 1;
    var s = (T - v) / (T - p);
    if (!isFinite(s)) return 1;
    if (s < 0) return 0;
    if (s > 1) return 1;
    return s;
  }
  function clampLabel(ctx, lab, x, y, align, pl, w) {
    var lw = ctx.measureText(lab).width;
    ctx.textAlign = align;
    var lx = align === 'left' ? Math.min(x, w - lw - 6) : Math.max(x, pl + 6);
    ctx.fillText(lab, lx, y);
  }

  /* ── 1. Target payoff δ* ── */
  (function dstarTool() {
    var tEl = $('d_t'), vEl = $('d_v'), pEl = $('d_p'), dEl = $('d_d');
    if (!tEl || !vEl || !pEl || !dEl) return;
    var cv = $('dChart');

    function upd() {
      var T = parseFloat(tEl.value), v = parseFloat(vEl.value);
      var p = parseFloat(pEl.value), d = parseFloat(dEl.value);
      if (v <= p) v = p + 0.05;
      if (T <= v) T = v + 0.05;
      var star = dstar(T, v, p);
      var ac = v;
      var ad = (1 - d) * T + d * p;
      var gap = d - star;
      var ok = d + 1e-9 >= star;
      var col = ok ? C.green : C.red;

      txt($('d_tO'), T.toFixed(1));
      txt($('d_vO'), v.toFixed(1));
      txt($('d_pO'), p.toFixed(1));
      txt($('d_dO'), d.toFixed(2));
      txt($('d_star'), star.toFixed(2));
      txt($('d_ac'), ac.toFixed(2));
      txt($('d_ad'), ad.toFixed(2));
      txt($('d_gap'), (gap >= 0 ? '+' : '') + gap.toFixed(2));
      tint($('d_star'), C.amber);
      tint($('d_gap'), col);

      var msg = 'δ=' + d.toFixed(2) + (ok ? ' ≥ ' : ' < ') + 'δ*=' + star.toFixed(2) +
        (ok ? ' → 目标 v 可被冷酷/永久惩罚支撑' : ' → 偏离更赚，耐心不够');
      txt($('d_vh'), msg);
      tint($('d_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var n = 40, i, xv, maxY = 1;
      for (i = 0; i <= n; i++) {
        xv = 1.05 + (4.5 * i) / n;
        if (xv > p + 0.05 && xv < T - 0.05) {
          maxY = Math.max(maxY, dstar(T, xv, p));
        }
      }
      maxY = Math.max(maxY, 1);
      function sx(x) { return pl + ((x - 1.05) / 4.5) * bw; }
      function sy(val) { return y1 - (val / maxY) * bh; }

      ctx.strokeStyle = C.grid;
      for (i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      ctx.strokeStyle = C.amber;
      ctx.lineWidth = 2;
      ctx.beginPath();
      var started = false;
      for (i = 0; i <= n; i++) {
        xv = 1.05 + (4.5 * i) / n;
        if (xv <= p + 0.02 || xv >= T - 0.02) continue;
        var yv = dstar(T, xv, p);
        if (!started) { ctx.moveTo(sx(xv), sy(yv)); started = true; }
        else ctx.lineTo(sx(xv), sy(yv));
      }
      ctx.stroke();

      ctx.strokeStyle = C.blue;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(d));
      ctx.lineTo(pl + bw, sy(d));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(sx(v), sy(star), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('目标平均支付 v', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillText('δ*', pl - 6, pt + 10);
      clampLabel(ctx, 'δ=' + d.toFixed(2), pl + bw - 4, sy(d) - 6, 'right', pl, w);
    }
    bind(['d_t', 'd_v', 'd_p', 'd_d'], upd);
    upd();
  })();

  /* ── 2. Friedman vs full Folk ── */
  (function friedTool() {
    var tEl = $('f_t'), vEl = $('f_v'), eEl = $('f_e'), mEl = $('f_m'), dEl = $('f_d');
    if (!tEl || !vEl || !eEl || !mEl || !dEl) return;
    var cv = $('fChart');

    function upd() {
      var T = parseFloat(tEl.value), v = parseFloat(vEl.value);
      var e = parseFloat(eEl.value), m = parseFloat(mEl.value), d = parseFloat(dEl.value);
      if (m > e) { var tmp = m; m = e; e = tmp; }
      if (v <= e) v = e + 0.05;
      if (T <= v) T = v + 0.05;
      var fr = dstar(T, v, e);
      var fo = dstar(T, v, m);
      var diff = fr - fo;
      var okF = d + 1e-9 >= fr;
      var okO = d + 1e-9 >= fo;
      var col = okF ? C.green : (okO ? C.amber : C.red);

      txt($('f_tO'), T.toFixed(1));
      txt($('f_vO'), v.toFixed(1));
      txt($('f_eO'), e.toFixed(1));
      txt($('f_mO'), m.toFixed(1));
      txt($('f_dO'), d.toFixed(2));
      txt($('f_fr'), fr.toFixed(2));
      txt($('f_fo'), fo.toFixed(2));
      txt($('f_diff'), diff.toFixed(2));
      tint($('f_fr'), C.blue);
      tint($('f_fo'), C.green);

      var msg;
      if (okF) msg = 'δ 同时过 Friedman 与完整 Folk → 两种惩罚技术都能撑 v';
      else if (okO) msg = 'δ 仅过完整 Folk（需可信最小最大）→ Nash 威胁不够深';
      else msg = 'δ 两者都不够 → 需抬耐心或加深惩罚或降低目标';
      txt($('f_vh'), msg);
      tint($('f_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 50, pr = 16, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [fr, fo, d];
      var maxY = Math.max(1, vals[0], vals[1], vals[2]);
      function barX(i) { return pl + (bw * (i + 0.2)) / 3; }
      function barW() { return bw * 0.5 / 3; }
      function sy(val) { return y1 - (val / maxY) * bh; }

      ctx.strokeStyle = C.grid;
      var i;
      for (i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      var labels = ['Friedman', '完整 Folk', '当前 δ'];
      var colors = [C.blue, C.green, C.amber];
      for (i = 0; i < 3; i++) {
        var x = barX(i), bwBar = barW(), y = sy(vals[i]);
        ctx.fillStyle = colors[i];
        ctx.fillRect(x, y, bwBar, y1 - y);
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        var lab = vals[i].toFixed(2);
        var lx = Math.min(x + bwBar / 2, w - 20);
        ctx.fillText(lab, lx, Math.max(y - 6, pt + 10));
        ctx.fillStyle = C.ink2;
        ctx.fillText(labels[i], x + bwBar / 2, y1 + 16);
      }
      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'center';
      ctx.fillText('临界贴现 / 当前贴现', pl + bw / 2, y1 + 31);
    }
    bind(['f_t', 'f_v', 'f_e', 'f_m', 'f_d'], upd);
    upd();
  })();

  /* ── 3. Stick and carrot ── */
  (function carrotTool() {
    var tEl = $('c_t'), vEl = $('c_v'), mEl = $('c_m'), lEl = $('c_l'), dEl = $('c_d');
    if (!tEl || !vEl || !mEl || !lEl || !dEl) return;
    var cv = $('cChart');

    function Vpun(m, v, L, d) {
      var dL = Math.pow(d, L);
      return (1 - dL) * m + dL * v;
    }
    function devAvg(T, m, v, L, d) {
      return (1 - d) * T + d * Vpun(m, v, L, d);
    }
    function findStar(T, v, m, L) {
      var lo = 0.01, hi = 0.999, k, mid;
      if (devAvg(T, m, v, L, 0.999) > v + 1e-9) return 1;
      if (devAvg(T, m, v, L, 0.01) <= v) return 0.01;
      for (k = 0; k < 50; k++) {
        mid = (lo + hi) / 2;
        if (devAvg(T, m, v, L, mid) <= v) hi = mid;
        else lo = mid;
      }
      return hi;
    }

    function upd() {
      var T = parseFloat(tEl.value), v = parseFloat(vEl.value);
      var m = parseFloat(mEl.value), L = parseInt(lEl.value, 10);
      var d = parseFloat(dEl.value);
      if (v <= m) v = m + 0.05;
      if (T <= v) T = v + 0.05;
      var star = findStar(T, v, m, L);
      var vp = Vpun(m, v, L, d);
      var da = devAvg(T, m, v, L, d);
      var inf = dstar(T, v, m);
      var ok = da <= v + 1e-9;
      var col = ok ? C.green : C.red;

      txt($('c_tO'), T.toFixed(1));
      txt($('c_vO'), v.toFixed(1));
      txt($('c_mO'), m.toFixed(1));
      txt($('c_lO'), String(L));
      txt($('c_dO'), d.toFixed(2));
      txt($('c_star'), star.toFixed(2));
      txt($('c_vp'), da.toFixed(2));
      txt($('c_inf'), inf.toFixed(2));
      tint($('c_star'), C.amber);

      var msg = '偏离平均=' + da.toFixed(2) + (ok ? ' ≤ ' : ' > ') + 'v=' + v.toFixed(1) +
        ' · δ*≈' + star.toFixed(2) + '（L→∞ 时 → ' + inf.toFixed(2) + '）';
      txt($('c_vh'), msg);
      tint($('c_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var Ls = [], stars = [], i, Lmax = 20, maxY = 1;
      for (i = 1; i <= Lmax; i++) {
        Ls.push(i);
        var s = findStar(T, v, m, i);
        stars.push(s);
        maxY = Math.max(maxY, s);
      }
      function sx(Lv) { return pl + ((Lv - 1) / (Lmax - 1)) * bw; }
      function sy(val) { return y1 - (val / maxY) * bh; }

      ctx.strokeStyle = C.grid;
      for (i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      ctx.strokeStyle = C.ink3;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(inf));
      ctx.lineTo(pl + bw, sy(inf));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (i = 0; i < Ls.length; i++) {
        if (i === 0) ctx.moveTo(sx(Ls[i]), sy(stars[i]));
        else ctx.lineTo(sx(Ls[i]), sy(stars[i]));
      }
      ctx.stroke();

      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(sx(L), sy(star), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('惩罚期数 L', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillText('δ*', pl - 6, pt + 10);
      clampLabel(ctx, '冷酷极限', pl + bw - 4, sy(inf) - 6, 'right', pl, w);
    }
    bind(['c_t', 'c_v', 'c_m', 'c_l', 'c_d'], upd);
    upd();
  })();

  /* ── 4. PD feasible IR set ── */
  (function setTool() {
    var xEl = $('s_x'), yEl = $('s_y'), mEl = $('s_m');
    if (!xEl || !yEl || !mEl) return;
    var cv = $('sChart');
    // Convex hull vertices of PD payoffs (3,3),(5,0),(0,5),(1,1)
    var HULL = [[5, 0], [3, 3], [0, 5], [1, 1]];

    function cross(o, a, b) {
      return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }
    function inHull(pt, hull) {
      var n = hull.length, i, c;
      var sign = 0;
      for (i = 0; i < n; i++) {
        c = cross(hull[i], hull[(i + 1) % n], pt);
        if (Math.abs(c) < 1e-9) continue;
        if (sign === 0) sign = c > 0 ? 1 : -1;
        else if ((c > 0 ? 1 : -1) !== sign) return false;
      }
      return true;
    }

    function upd() {
      var x = parseFloat(xEl.value), y = parseFloat(yEl.value), m = parseFloat(mEl.value);
      var feas = inHull([x, y], HULL);
      var ir = x + 1e-9 >= m && y + 1e-9 >= m;
      var ok = feas && ir;
      var col = ok ? C.green : C.red;

      txt($('s_xO'), x.toFixed(1));
      txt($('s_yO'), y.toFixed(1));
      txt($('s_mO'), m.toFixed(1));
      txt($('s_feas'), feas ? '是' : '否');
      txt($('s_ir'), ir ? '是' : '否');
      txt($('s_ok'), ok ? '是' : '否');
      tint($('s_feas'), feas ? C.green : C.red);
      tint($('s_ir'), ir ? C.green : C.red);
      tint($('s_ok'), col);

      var msg = ok
        ? '(x,y)=(' + x.toFixed(1) + ',' + y.toFixed(1) + ') ∈ V* → Folk 意义上「可能」是均衡支付'
        : '(x,y)=(' + x.toFixed(1) + ',' + y.toFixed(1) + ') ∉ V* → ' +
          (!feas ? '不可行（出凸包）' : '低于最小最大（非个人理性）');
      txt($('s_vh'), msg);
      tint($('s_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 20, pt = 20, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var xmin = -0.2, xmax = 5.4, ymin = -0.2, ymax = 5.4;
      function sx(px) { return pl + ((px - xmin) / (xmax - xmin)) * bw; }
      function sy(py) { return y1 - ((py - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.grid;
      var i;
      for (i = 0; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(sx(i), sy(ymin));
        ctx.lineTo(sx(i), sy(ymax));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(sx(xmin), sy(i));
        ctx.lineTo(sx(xmax), sy(i));
        ctx.stroke();
      }

      // IR region shade (above m)
      ctx.fillStyle = 'rgba(15,138,77,0.08)';
      ctx.fillRect(sx(m), sy(ymax), sx(xmax) - sx(m), sy(m) - sy(ymax));

      // Hull
      ctx.beginPath();
      ctx.moveTo(sx(HULL[0][0]), sy(HULL[0][1]));
      for (i = 1; i < HULL.length; i++) ctx.lineTo(sx(HULL[i][0]), sy(HULL[i][1]));
      ctx.closePath();
      ctx.fillStyle = 'rgba(29,78,216,0.15)';
      ctx.fill();
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.stroke();

      // IR lines
      ctx.strokeStyle = C.green;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(m), sy(ymin));
      ctx.lineTo(sx(m), sy(ymax));
      ctx.moveTo(sx(xmin), sy(m));
      ctx.lineTo(sx(xmax), sy(m));
      ctx.stroke();
      ctx.setLineDash([]);

      // Point
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(sx(x), sy(y), 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('玩家1支付 x', pl + bw / 2, y1 + 31);
      ctx.save();
      ctx.translate(14, pt + bh / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('玩家2支付 y', 0, 0);
      ctx.restore();
    }
    bind(['s_x', 's_y', 's_m'], upd);
    upd();
  })();
})();
