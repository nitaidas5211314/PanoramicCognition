/* ============================================================
   《全局博弈 Global Games》主题脚本
   四个可调模型：
     1. 政权/挤兑：拉普拉斯临界点 θ* = 1 − c
     2. 有限噪声：基本面临界点不动，信号阈值 x* 移动
     3. 危机概率 vs 只计基本面破产的基准
     4. 公共 vs 私有精度：γ ≦ 2π 才唯一
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56', ink: '#15181d',
    wash: 'rgba(213,52,44,0.13)', washG: 'rgba(15,138,77,0.12)'
  };
  var TWOPI = 2 * Math.PI;

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
  function r4(x) { return (Math.round(x * 10000) / 10000).toFixed(4); }
  function pct(x) { return (x * 100).toFixed(2) + '%'; }

  function normInv(p) {
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
      1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    var b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
      6.680131188771972e+01, -1.328068155288572e+01];
    var c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
      -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    var d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00,
      3.754408661907416e+00];
    var pl = 0.02425, ph = 1 - pl, q, r, x;
    if (p <= 0) return -8;
    if (p >= 1) return 8;
    if (p < pl) {
      q = Math.sqrt(-2 * Math.log(p));
      x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    } else if (p <= ph) {
      q = p - 0.5; r = q * q;
      x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    return x;
  }
  /* Abramowitz–Stegun 7.1.26 */
  function Phi(x) {
    var t = 1 / (1 + 0.2316419 * Math.abs(x));
    var dens = 0.3989422804014327 * Math.exp(-x * x / 2);
    var p = dens * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return x >= 0 ? 1 - p : p;
  }
  function gammaOf(sig, tau) {
    var s2 = sig * sig, t2 = tau * tau;
    return (s2 * (s2 + t2)) / (t2 * t2 * (s2 + 2 * t2));
  }
  function rootsOf(g, y) {
    var sg = Math.sqrt(Math.max(g, 0));
    function f(k) { return Phi(sg * (k - y)) - k; }
    var roots = [], N = 8000, prevK = 0, prev = f(0);
    if (Math.abs(prev) < 1e-6) roots.push(0);
    for (var i = 1; i <= N; i++) {
      var k = i / N, v = f(k);
      if (prev * v < 0) {
        var lo = prevK, hi = k, flo = prev;
        for (var it = 0; it < 50; it++) {
          var mid = (lo + hi) / 2, fm = f(mid);
          if (flo * fm <= 0) hi = mid; else { lo = mid; flo = fm; }
        }
        roots.push((lo + hi) / 2);
      } else if (Math.abs(v) < 1e-8) roots.push(k);
      prev = v; prevK = k;
    }
    var out = [];
    roots.forEach(function (r) {
      if (!out.length || Math.abs(r - out[out.length - 1]) > 1e-3) out.push(r);
    });
    return out;
  }

  /* ── 1. Laplacian threshold ── */
  (function rg() {
    var cEl = $('rg_c');
    if (!cEl) return;
    var cv = $('rgChart');
    function upd() {
      var c = parseFloat(cEl.value);
      var th = 1 - c;
      txt($('rg_cO'), r2(c));
      txt($('rg_th'), r2(th));
      txt($('rg_atk'), r2(th));
      txt($('rg_safe'), r2(c));
      var msg = 'c=' + r2(c) + ' → θ*=' + r2(th) + '；完全信息多重区间 (0, 1)；平坦先验极限下 θ≤' + r2(th) + ' 崩、θ>' + r2(th) + ' 守住';
      txt($('rg_vh'), msg);
      tint($('rg_vh'), C.ink2);
      tint($('rg_th'), C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 16, pr = 16, y1 = h - 46;
      var bw = w - pl - pr;
      var x0 = -0.25, x1 = 1.25;
      function sx(v) { return pl + (v - x0) / (x1 - x0) * bw; }
      var top = 28, barH = 46;
      function band(a, b, col) {
        var xa = sx(Math.max(x0, a)), xb = sx(Math.min(x1, b));
        ctx.fillStyle = col;
        ctx.fillRect(xa, top, Math.max(1, xb - xa), barH);
      }
      band(x0, 0, '#7f1d1d');
      band(0, th, C.red);
      band(th, 1, C.green);
      band(1, x1, '#14532d');
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      if (sx(0) - sx(x0) > 36) ctx.fillText('占优攻击', (sx(x0) + sx(0)) / 2, top + 28);
      if (sx(th) - sx(0) > 52) ctx.fillText('被选中：崩', (sx(0) + sx(th)) / 2, top + 28);
      if (sx(1) - sx(th) > 52) ctx.fillText('被选中：守', (sx(th) + sx(1)) / 2, top + 28);
      if (sx(x1) - sx(1) > 36) ctx.fillText('占优不攻击', (sx(1) + sx(x1)) / 2, top + 28);

      ctx.strokeStyle = C.ink;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sx(th), top - 4);
      ctx.lineTo(sx(th), top + barH + 8);
      ctx.stroke();
      ctx.fillStyle = C.ink;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('θ*=' + r2(th), sx(th), top + barH + 24);

      var ticks = [-0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2];
      ctx.strokeStyle = C.axis;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pl, y1);
      ctx.lineTo(pl + bw, y1);
      ctx.stroke();
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ticks.forEach(function (t) {
        var x = sx(t);
        ctx.strokeStyle = C.axis;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y1 + 5);
        ctx.stroke();
        ctx.fillStyle = C.ink3;
        ctx.textAlign = 'center';
        ctx.fillText(t.toFixed(1), x, y1 + 13);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('基本面 θ（越高越强）', pl + bw / 2, y1 + 31);
    }
    bind(['rg_c'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 2. Finite noise: x* moves, θ* fixed ── */
  (function ns() {
    var cEl = $('ns_c'), sEl = $('ns_s');
    if (!cEl || !sEl) return;
    var cv = $('nsChart');
    function upd() {
      var c = Math.min(0.98, Math.max(0.02, parseFloat(cEl.value)));
      var sig = Math.max(0.05, parseFloat(sEl.value));
      var th = 1 - c;
      var z = normInv(c);
      var xs = th - sig * z;
      var gap = xs - th;
      txt($('ns_cO'), r2(parseFloat(cEl.value)));
      txt($('ns_sO'), r2(sig));
      txt($('ns_th'), r4(th));
      txt($('ns_x'), r4(xs));
      txt($('ns_z'), r4(z));
      txt($('ns_gap'), (gap >= 0 ? '+' : '') + r4(gap));
      tint($('ns_th'), C.red);
      tint($('ns_x'), C.blue);
      var msg = 'θ*=' + r4(th) + ' 不随 σ 变；x*=' + r4(xs) + '；Φ⁻¹(c)=' + r4(z) + '；信号比基本面 ' + (gap >= 0 ? '高 ' : '低 ') + r4(Math.abs(gap));
      txt($('ns_vh'), msg);
      tint($('ns_vh'), C.ink2);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 46, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var x0 = -0.15, x1 = 1.35, y0 = -0.05, y1v = 1.15;
      function sx(v) { return pl + (v - x0) / (x1 - x0) * bw; }
      function sy(v) { return y1 - (v - y0) / (y1v - y0) * bh; }

      ctx.fillStyle = C.wash;
      ctx.fillRect(sx(x0), sy(y1v), Math.max(0, sx(th) - sx(x0)), sy(y0) - sy(y1v));

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      for (var t = 0; t <= 1.2; t += 0.2) {
        ctx.beginPath();
        ctx.moveTo(pl, sy(t));
        ctx.lineTo(pl + bw, sy(t));
        ctx.stroke();
      }
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, y1);
      ctx.lineTo(pl + bw, y1);
      ctx.moveTo(pl, pt);
      ctx.lineTo(pl, y1);
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(0));
      ctx.lineTo(sx(1), sy(1));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      var started = false;
      for (var i = 0; i <= 80; i++) {
        var thv = x0 + (x1 - x0) * i / 80;
        var al = Phi((xs - thv) / sig);
        var X = sx(thv), Y = sy(al);
        if (!started) { ctx.moveTo(X, Y); started = true; }
        else ctx.lineTo(X, Y);
      }
      ctx.stroke();

      ctx.strokeStyle = C.red;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sx(th), pt);
      ctx.lineTo(sx(th), y1);
      ctx.stroke();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('α 与临界质量', pl + bw, pt + 2);
      ctx.textAlign = 'left';
      ctx.fillStyle = C.blue;
      ctx.fillText('攻击比例', pl + 6, pt + 2);

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      [0, 0.5, 1].forEach(function (tv) {
        ctx.fillText(tv.toFixed(1), pl - 6, sy(tv) + 4);
      });
      ctx.textAlign = 'center';
      [0, 0.35, 0.7, 1.05].forEach(function (tv) {
        ctx.fillText(tv.toFixed(2), sx(tv), y1 + 13);
      });
      ctx.fillText('基本面 θ', pl + bw / 2, y1 + 31);
    }
    bind(['ns_c', 'ns_s'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 3. Crisis prob vs fundamentals-only baseline ── */
  (function cr() {
    var muEl = $('cr_mu'), sEl = $('cr_s'), cEl = $('cr_c');
    if (!muEl || !sEl || !cEl) return;
    var cv = $('crChart');
    function upd() {
      var mu = parseFloat(muEl.value);
      var s = Math.max(0.05, parseFloat(sEl.value));
      var c = parseFloat(cEl.value);
      var th = 1 - c;
      var pFund = Phi((0 - mu) / s);
      var pGG = Phi((th - mu) / s);
      var ex = pGG - pFund;
      txt($('cr_muO'), r2(mu));
      txt($('cr_sO'), r2(s));
      txt($('cr_cO'), r2(c));
      txt($('cr_th'), r2(th));
      txt($('cr_fund'), pct(pFund));
      txt($('cr_gg'), pct(pGG));
      txt($('cr_ex'), (ex * 100).toFixed(2) + 'pp');
      tint($('cr_fund'), C.ink2);
      tint($('cr_gg'), C.red);
      tint($('cr_ex'), ex > 0.01 ? C.red : C.green);
      var msg = '基本面基准 ' + pct(pFund) + ' · 全局博弈 ' + pct(pGG) + ' · 协调超额 ' + (ex * 100).toFixed(2) + 'pp（θ*=' + r2(th) + '）';
      txt($('cr_vh'), msg);
      tint($('cr_vh'), C.ink2);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 16, pr = 16, y1 = h - 46;
      var bw = w - pl - pr;
      var items = [
        { lab: '只计基本面破产 θ≤0', v: pFund, col: C.ink3 },
        { lab: '全局博弈危机 θ≤θ*', v: pGG, col: C.red }
      ];
      var maxV = Math.max(0.08, items[0].v, items[1].v);
      var barH = 36, gap = 18, startY = 36;
      items.forEach(function (it, i) {
        var y = startY + i * (barH + gap);
        var len = (it.v / maxV) * (bw - 70);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab, pl, y - 4);
        ctx.fillStyle = it.col;
        ctx.fillRect(pl, y, Math.max(2, len), barH);
        var lab = (it.v * 100).toFixed(2) + '%';
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        clampLabel(ctx, lab, pl + len + 8, y + barH / 2 + 4, 'left', pl, w);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('危机概率对照（θ ~ 正态）', pl + bw / 2, y1 + 31);
    }
    bind(['cr_mu', 'cr_s', 'cr_c'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 4. Public vs private precision ── */
  (function pb() {
    var sEl = $('pb_sig'), tEl = $('pb_tau'), yEl = $('pb_y');
    if (!sEl || !tEl || !yEl) return;
    var cv = $('pbChart');
    function upd() {
      var sig = Math.max(0.08, parseFloat(sEl.value));
      var tau = Math.max(0.2, parseFloat(tEl.value));
      var y = parseFloat(yEl.value);
      var g = gammaOf(sig, tau);
      var ratio = g / TWOPI;
      var unique = g <= TWOPI + 1e-9;
      var roots = rootsOf(g, y);
      var kLab = roots.length ? roots.map(function (r) { return r4(r); }).join(' · ') : '—';
      txt($('pb_sigO'), r2(sig));
      txt($('pb_tauO'), r2(tau));
      txt($('pb_yO'), r2(y));
      txt($('pb_g'), g >= 100 ? g.toFixed(1) : r4(g));
      txt($('pb_ratio'), r4(ratio));
      txt($('pb_mode'), unique ? '唯一' : '多重');
      txt($('pb_k'), kLab);
      tint($('pb_mode'), unique ? C.green : C.red);
      tint($('pb_g'), unique ? C.green : C.red);
      var msg = 'γ=' + (g >= 100 ? g.toFixed(1) : r4(g)) + (unique ? ' ≤ ' : ' > ') + '2π=' + TWOPI.toFixed(4) +
        '（比值 ' + r4(ratio) + '）→ ' + (unique ? '唯一均衡' : '多重切换均衡') + '，κ=' + kLab;
      txt($('pb_vh'), msg);
      tint($('pb_vh'), unique ? C.green : C.red);

      var cvg = fit(cv, 214);
      if (!cvg) return;
      clear(cvg);
      var ctx = cvg.ctx, w = cvg.w, h = cvg.h;
      var pl = 46, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      function sx(v) { return pl + v * bw; }
      function sy(v) { return y1 - v * bh; }

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75].forEach(function (t) {
        ctx.beginPath();
        ctx.moveTo(pl, sy(t));
        ctx.lineTo(pl + bw, sy(t));
        ctx.stroke();
      });
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, y1);
      ctx.lineTo(pl + bw, y1);
      ctx.moveTo(pl, pt);
      ctx.lineTo(pl, y1);
      ctx.stroke();

      ctx.strokeStyle = C.ink3;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(0));
      ctx.lineTo(sx(1), sy(1));
      ctx.stroke();
      ctx.setLineDash([]);

      var sg = Math.sqrt(Math.max(g, 0));
      ctx.strokeStyle = unique ? C.blue : C.red;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 120; i++) {
        var k = i / 120;
        var br = Phi(sg * (k - y));
        var X = sx(k), Y = sy(br);
        if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.stroke();

      roots.forEach(function (r) {
        var br = Phi(sg * (r - y));
        ctx.fillStyle = unique ? C.green : C.amber;
        ctx.beginPath();
        ctx.arc(sx(r), sy(Math.max(0, Math.min(1, br))), 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(unique ? '最优反应（唯一）' : '最优反应（多交点）', pl + bw, pt + 2);
      ctx.textAlign = 'right';
      [0, 0.5, 1].forEach(function (tv) {
        ctx.fillText(tv.toFixed(1), pl - 6, sy(tv) + 4);
      });
      ctx.textAlign = 'center';
      [0, 0.25, 0.5, 0.75, 1].forEach(function (tv) {
        ctx.fillText(tv.toFixed(2), sx(tv), y1 + 13);
      });
      ctx.fillText('后验切换点 κ', pl + bw / 2, y1 + 31);
    }
    bind(['pb_sig', 'pb_tau', 'pb_y'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();
})();
