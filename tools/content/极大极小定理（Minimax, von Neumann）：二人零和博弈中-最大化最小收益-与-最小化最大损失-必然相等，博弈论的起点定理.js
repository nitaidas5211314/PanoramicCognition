/* ============================================================
   《极大极小定理 Minimax》主题脚本
   四个可调模型（全部真实参与计算）：
     1. 安全水平 vs p（经典矩阵）
     2. 任意 2×2 求解器
     3. 偏离可利用度
     4. Minimax vs α-β 节点数
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
  function sci(n) {
    if (!isFinite(n)) return '∞';
    if (n >= 1e6) return n.toExponential(2).replace('+', '');
    if (n >= 1000) return n.toExponential(2).replace('+', '');
    return String(Math.round(n));
  }

  /* ── shared classic matrix helpers ── */
  function eL(p) { return 3 * p - 1; }
  function eR(p) { return 1 - 2 * p; }
  function sec(p) { return Math.min(eL(p), eR(p)); }
  var VSTAR = 0.2, PSTAR = 0.4;

  function solve2x2(a, b, c, d) {
    var den = a - b - c + d;
    var maxmin = Math.max(Math.min(a, b), Math.min(c, d));
    var minmax = Math.min(Math.max(a, c), Math.max(b, d));
    var gap = minmax - maxmin;
    if (Math.abs(den) < 1e-12) {
      // degenerate: try pure saddle
      var pureV = (Math.abs(maxmin - minmax) < 1e-12) ? maxmin : NaN;
      return { den: den, p: NaN, q: NaN, v: pureV, maxmin: maxmin, minmax: minmax, gap: gap, deg: true };
    }
    var p = (d - c) / den;
    var q = (d - b) / den;
    var v = (a * d - b * c) / den;
    // clamp display if outside [0,1] (dominated cases still formal)
    return { den: den, p: p, q: q, v: v, maxmin: maxmin, minmax: minmax, gap: gap, deg: false };
  }

  /* ── 1. Security level ── */
  (function secTool() {
    var pEl = $('sec_p');
    if (!pEl) return;
    var cv = $('secChart');

    function upd() {
      var p = parseFloat(pEl.value);
      var el = eL(p), er = eR(p), s = Math.min(el, er);
      var col, verdict;
      if (Math.abs(p - PSTAR) < 0.015 && Math.abs(el - er) < 0.03) {
        verdict = 'p=' + p.toFixed(2) + ' → 无差异，安全水平达峰值 0.20（=博弈价值）';
        col = C.blue;
      } else if (s < VSTAR - 1e-9) {
        verdict = 'p=' + p.toFixed(2) + ' → 安全水平 ' + s.toFixed(2) + ' < v=0.20；对手选最坏纯策略即可剥削';
        col = C.red;
      } else {
        verdict = 'p=' + p.toFixed(2) + ' → 安全水平 ' + s.toFixed(2);
        col = C.amber;
      }
      txt($('sec_pO'), p.toFixed(2));
      txt($('sec_el'), el.toFixed(2));
      txt($('sec_er'), er.toFixed(2));
      txt($('sec_v'), s.toFixed(2));
      txt($('sec_vh'), verdict);
      tint($('sec_vh'), col);
      tint($('sec_v'), s >= VSTAR - 1e-9 ? C.green : C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = -1.2, ymax = 2.2;
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var vv = -1; vv <= 2; vv += 1) {
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(String(vv), pl - 6, y + 4);
      }
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, sy(0));
      ctx.lineTo(w - pr, sy(0));
      ctx.stroke();

      // E_L, E_R, security envelope
      var i, pp, x, yy;
      ctx.lineWidth = 2;
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        pp = i / 100; x = sx(pp); yy = sy(eL(pp));
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        pp = i / 100; x = sx(pp); yy = sy(eR(pp));
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        pp = i / 100; x = sx(pp); yy = sy(sec(pp));
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

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(p), sy(s), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(PSTAR), sy(VSTAR), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('红=E_L  绿=E_R  蓝=安全水平  琥珀点=最优', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('上行混合概率 p', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '0.4', '1'].forEach(function (lab, idx) {
        var t = idx === 1 ? 0.4 : idx / 2;
        if (idx === 2) t = 1;
        ctx.fillText(lab, sx(t), y1 + 13);
      });
    }
    bind(['sec_p'], upd);
    upd();
  })();

  /* ── 2. 2×2 solver ── */
  (function m22() {
    var aEl = $('m22_a'), bEl = $('m22_b'), cEl = $('m22_c'), dEl = $('m22_d');
    if (!aEl || !bEl || !cEl || !dEl) return;
    var cv = $('m22Chart');

    function upd() {
      var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
      var c = parseFloat(cEl.value), d = parseFloat(dEl.value);
      var sol = solve2x2(a, b, c, d);
      txt($('m22_aO'), a.toFixed(1));
      txt($('m22_bO'), b.toFixed(1));
      txt($('m22_cO'), c.toFixed(1));
      txt($('m22_dO'), d.toFixed(1));
      txt($('m22_gap'), sol.gap.toFixed(2));

      var verdict, col;
      if (sol.deg || !isFinite(sol.p)) {
        txt($('m22_p'), '—');
        txt($('m22_q'), '—');
        txt($('m22_v'), isFinite(sol.v) ? sol.v.toFixed(3) : '—');
        if (Math.abs(sol.gap) < 1e-9) {
          verdict = '退化/纯鞍点：纯 gap≈0，价值≈' + sol.maxmin.toFixed(2);
          col = C.green;
        } else {
          verdict = '分母≈0 或公式退化：纯 maxmin=' + sol.maxmin.toFixed(2) + '，minmax=' + sol.minmax.toFixed(2);
          col = C.amber;
        }
      } else {
        txt($('m22_p'), sol.p.toFixed(3));
        txt($('m22_q'), sol.q.toFixed(3));
        txt($('m22_v'), sol.v.toFixed(3));
        var pin = sol.p >= -0.05 && sol.p <= 1.05 && sol.q >= -0.05 && sol.q <= 1.05;
        if (pin) {
          verdict = '混合最优：p*=' + sol.p.toFixed(2) + ', q*=' + sol.q.toFixed(2) + ', v=' + sol.v.toFixed(2) + '；纯策略 gap=' + sol.gap.toFixed(2);
          col = C.blue;
        } else {
          verdict = '形式解 p*=' + sol.p.toFixed(2) + ', q*=' + sol.q.toFixed(2) + ' 越出 [0,1]——存在纯策略支配，请看纯鞍/边界';
          col = C.amber;
        }
      }
      txt($('m22_vh'), verdict);
      tint($('m22_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      // security curve for row mix p against this matrix
      function rowSec(p) {
        var e1 = p * a + (1 - p) * c;
        var e2 = p * b + (1 - p) * d;
        return Math.min(e1, e2);
      }
      var samples = [];
      var i, p, s, smin = Infinity, smax = -Infinity;
      for (i = 0; i <= 100; i++) {
        p = i / 100; s = rowSec(p);
        samples.push(s);
        if (s < smin) smin = s;
        if (s > smax) smax = s;
      }
      var pad = Math.max(0.3, (smax - smin) * 0.15);
      var ymin = smin - pad, ymax = smax + pad;
      if (ymax - ymin < 0.5) { ymin -= 0.5; ymax += 0.5; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      var ticks = 4, ti, tv;
      for (ti = 0; ti <= ticks; ti++) {
        tv = ymin + (ymax - ymin) * ti / ticks;
        ctx.beginPath();
        ctx.moveTo(pl, sy(tv));
        ctx.lineTo(w - pr, sy(tv));
        ctx.stroke();
        ctx.fillText(tv.toFixed(1), pl - 6, sy(tv) + 4);
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        var x = sx(i / 100), yy = sy(samples[i]);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      // mark peak
      var bestI = 0, bestS = samples[0];
      for (i = 1; i <= 100; i++) if (samples[i] > bestS) { bestS = samples[i]; bestI = i; }
      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(bestI / 100), sy(bestS), 5, 0, Math.PI * 2);
      ctx.fill();

      if (isFinite(sol.v)) {
        ctx.strokeStyle = C.green;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pl, sy(sol.v));
        ctx.lineTo(w - pr, sy(sol.v));
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('蓝=行安全水平  琥珀=峰值  绿虚线=v', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('上行混合概率 p', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx / 2), y1 + 13);
      });
    }
    bind(['m22_a', 'm22_b', 'm22_c', 'm22_d'], upd);
    upd();
  })();

  /* ── 3. Exploitability ── */
  (function expTool() {
    var pEl = $('exp_p');
    if (!pEl) return;
    var cv = $('expChart');

    function upd() {
      var p = parseFloat(pEl.value);
      var s = sec(p);
      var gap = VSTAR - s;
      if (gap < 0) gap = 0;
      var col, verdict;
      if (gap < 1e-9) {
        verdict = 'p=' + p.toFixed(2) + ' = p* → 可利用度 0；守住价值';
        col = C.green;
      } else {
        verdict = 'p=' + p.toFixed(2) + ' → 安全水平 ' + s.toFixed(2) + '，相对 v 可利用度 ' + gap.toFixed(2) + '（对手最坏回应）';
        col = C.red;
      }
      txt($('exp_pO'), p.toFixed(2));
      txt($('exp_sec'), s.toFixed(2));
      txt($('exp_val'), VSTAR.toFixed(2));
      txt($('exp_gap'), gap.toFixed(2));
      txt($('exp_vh'), verdict);
      tint($('exp_vh'), col);
      tint($('exp_gap'), gap < 1e-9 ? C.green : C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 24, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = -1.2, ymax = 0.5;
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var vv = -1; vv <= 0.4; vv += 0.4) {
        ctx.beginPath();
        ctx.moveTo(pl, sy(vv));
        ctx.lineTo(w - pr, sy(vv));
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, sy(vv) + 4);
      }

      ctx.strokeStyle = C.green;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(VSTAR));
      ctx.lineTo(w - pr, sy(VSTAR));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      var i, pp;
      for (i = 0; i <= 100; i++) {
        pp = i / 100;
        var x = sx(pp), yy = sy(sec(pp));
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      // exploitability bar from s up to v at current p
      ctx.fillStyle = 'rgba(213,52,44,0.25)';
      var x0 = sx(p);
      ctx.fillRect(x0 - 8, sy(VSTAR), 16, sy(s) - sy(VSTAR));

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(p), sy(s), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(PSTAR), sy(VSTAR), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('蓝=安全水平  绿虚线=v  红柱=可利用度', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('实际上行概率 p', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '0.4', '1'].forEach(function (lab, idx) {
        var t = idx === 0 ? 0 : (idx === 1 ? 0.4 : 1);
        ctx.fillText(lab, sx(t), y1 + 13);
      });
    }
    bind(['exp_p'], upd);
    upd();
  })();

  /* ── 4. Alpha-beta ── */
  (function abTool() {
    var bEl = $('ab_b'), nEl = $('ab_n');
    if (!bEl || !nEl) return;
    var cv = $('abChart');

    function abBest(b, n) {
      return Math.pow(b, Math.ceil(n / 2)) + Math.pow(b, Math.floor(n / 2)) - 1;
    }
    function upd() {
      var b = parseInt(bEl.value, 10);
      var n = parseInt(nEl.value, 10);
      var full = Math.pow(b, n);
      var ab = abBest(b, n);
      var ratio = full / ab;
      txt($('ab_bO'), String(b));
      txt($('ab_nO'), String(n));
      txt($('ab_full'), sci(full));
      txt($('ab_ab'), sci(ab));
      txt($('ab_ratio'), (ratio >= 100 ? Math.round(ratio) : ratio.toFixed(1)) + '×');
      var verdict = 'b=' + b + ',n=' + n + '：理想剪枝把叶子从约 ' + sci(full) + ' 压到 ' + sci(ab);
      txt($('ab_vh'), verdict);
      tint($('ab_vh'), C.blue);
      tint($('ab_ratio'), C.green);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 56, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      // log scale bars
      var logF = Math.log10(Math.max(full, 1));
      var logA = Math.log10(Math.max(ab, 1));
      var maxL = Math.max(logF, logA, 1);
      function barH(logv) { return (logv / maxL) * (bh - 10); }

      var barW = Math.min(120, bw * 0.28);
      var x1 = pl + bw * 0.22;
      var x2 = pl + bw * 0.62;
      var h1 = barH(logF), h2 = barH(logA);

      ctx.fillStyle = C.red;
      ctx.fillRect(x1, y1 - h1, barW, h1);
      ctx.fillStyle = C.green;
      ctx.fillRect(x2, y1 - h2, barW, h2);

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('全 Minimax', x1 + barW / 2, y1 + 13);
      ctx.fillText('理想 α-β', x2 + barW / 2, y1 + 13);
      ctx.fillText(sci(full), x1 + barW / 2, y1 - h1 - 6);
      ctx.fillText(sci(ab), x2 + barW / 2, y1 - h2 - 6);

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'left';
      ctx.fillText('纵轴≈log₁₀(叶子数)；红=全搜 绿=理想剪枝', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('搜索规模对比（示意）', pl + bw / 2, y1 + 31);
    }
    bind(['ab_b', 'ab_n'], upd);
    upd();
  })();
})();
