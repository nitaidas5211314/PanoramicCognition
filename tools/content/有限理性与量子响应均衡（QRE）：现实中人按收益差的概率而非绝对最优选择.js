/* ============================================================
   《有限理性与量子响应均衡（QRE）》主题脚本
   四个可调模型：
     1. 二元 Logit
     2. 囚徒困境 QRE 固定点
     3. 猎鹿 λ-同伦
     4. 失误地板
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    purple: '#7c3aed', grid: '#eef1f5', axis: '#e2e6ec',
    ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
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
  function soft(lam, eu) {
    var m = -Infinity, i;
    for (i = 0; i < eu.length; i++) if (eu[i] > m) m = eu[i];
    var ex = [], s = 0, v;
    for (i = 0; i < eu.length; i++) {
      v = Math.exp(Math.min(700, lam * (eu[i] - m)));
      ex.push(v); s += v;
    }
    return ex.map(function (x) { return x / s; });
  }
  function logitP(lam, d) {
    return 1 / (1 + Math.exp(-lam * d));
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
      ctx.fillText(v.toFixed(2), pl - 6, y + 3);
    }
  }
  function bars(cv, vals, ymin, ymax, axisTitle) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    var barW = bw / (vals.length * 1.5);
    vals.forEach(function (o, i) {
      var x = pl + (i + 0.5) * (bw / vals.length) - barW / 2;
      var y0 = y1 - ((0 - ymin) / (ymax - ymin)) * bh;
      var yv = y1 - ((o.v - ymin) / (ymax - ymin)) * bh;
      var top = Math.min(y0, yv), ht = Math.abs(y0 - yv);
      ctx.fillStyle = o.c;
      ctx.fillRect(x, top, barW, Math.max(ht, 1));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      var lab = o.labV != null ? o.labV : o.v.toFixed(3);
      var ly = o.v >= 0 ? Math.max(yv - 6, pt + 10) : Math.min(yv + 14, y1 - 4);
      ctx.fillText(lab, x + barW / 2, ly);
      ctx.fillStyle = C.ink2;
      ctx.font = '10px sans-serif';
      var lines = (o.lab || '').split('\n');
      lines.forEach(function (ln, j) {
        ctx.fillText(ln, x + barW / 2, y1 + 13 + j * 12);
      });
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(axisTitle || '数值', pl + bw, y1 + 31);
  }
  function lineChart(cv, xs, ys, ymin, ymax, xLabel) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    ctx.strokeStyle = C.blue;
    ctx.lineWidth = 2;
    ctx.beginPath();
    xs.forEach(function (x, i) {
      var px = pl + (x - xs[0]) / (xs[xs.length - 1] - xs[0] || 1) * bw;
      var py = y1 - ((ys[i] - ymin) / (ymax - ymin || 1)) * bh;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.stroke();
    // current point = last in series if marked via ys length match — caller draws marker separately via vals end
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(xLabel || 'λ', pl + bw, y1 + 31);
    ctx.textAlign = 'left';
    ctx.fillText(xs[0].toFixed(1), pl, y1 + 13);
    ctx.textAlign = 'right';
    ctx.fillText(xs[xs.length - 1].toFixed(1), pl + bw, y1 + 13);
  }

  /* ── 1. 二元 Logit ── */
  (function lg() {
    if (!$('lg_lam')) return;
    var cv = $('lgChart');
    function upd() {
      var lam = parseFloat($('lg_lam').value);
      var d = parseFloat($('lg_d').value);
      var p = logitP(lam, d);
      var q = 1 - p;
      txt($('lg_lamO'), lam.toFixed(2));
      txt($('lg_dO'), d.toFixed(1));
      txt($('lg_p'), (p * 100).toFixed(2) + '%');
      txt($('lg_q'), (q * 100).toFixed(2) + '%');
      txt($('lg_ld'), (lam * d).toFixed(2));
      txt($('lg_t'), lam > 1e-9 ? (1 / lam).toFixed(2) : '∞');
      var msg, col;
      if (Math.abs(lam) < 1e-9) {
        msg = 'λ≈0：接近均匀 50-50，支付差几乎不起作用。';
        col = C.amber;
      } else if (p >= 0.9) {
        msg = 'λ=' + lam.toFixed(2) + '、Δπ=' + d.toFixed(1) + '：选「更好」≈' + (p * 100).toFixed(2) + '%——已相当尖锐。';
        col = C.green;
      } else if (p <= 0.1) {
        msg = '支付差为负或精度把概率压向「更差」一侧：P(高EU)≈' + (p * 100).toFixed(2) + '%。';
        col = C.red;
      } else {
        msg = 'λ=' + lam.toFixed(2) + '、Δπ=' + d.toFixed(1) + '：选「更好」的概率≈' + (p * 100).toFixed(2) + '%。λ→0 趋向 50%；差为负则偏好翻转。';
        col = C.blue;
      }
      txt($('lg_vh'), msg);
      tint($('lg_vh'), col);
      bars(cv, [
        { v: p, c: C.green, lab: 'P(高EU)', labV: (p * 100).toFixed(1) + '%' },
        { v: q, c: C.red, lab: 'P(低EU)', labV: (q * 100).toFixed(1) + '%' }
      ], 0, 1, '概率');
    }
    bind(['lg_lam', 'lg_d'], upd);
    upd();
  })();

  /* ── 2. 囚徒困境 QRE ── */
  (function pd() {
    if (!$('pd_lam')) return;
    var cv = $('pdChart');
    function solve(lam) {
      var p = 0.5, i, p2;
      for (i = 0; i < 2500; i++) {
        p2 = soft(lam, [3 * p, 1 + 4 * p])[0];
        if (Math.abs(p2 - p) < 1e-14) return p2;
        p = 0.5 * p + 0.5 * p2;
      }
      return p;
    }
    function upd() {
      var lam = parseFloat($('pd_lam').value);
      var p = solve(lam);
      var euc = 3 * p, eud = 1 + 4 * p;
      txt($('pd_lamO'), lam.toFixed(2));
      txt($('pd_p'), (p * 100).toFixed(2) + '%');
      txt($('pd_d'), ((1 - p) * 100).toFixed(2) + '%');
      txt($('pd_euc'), euc.toFixed(3));
      txt($('pd_eud'), eud.toFixed(3));
      var msg, col;
      if (lam < 0.05) {
        msg = 'λ≈0：合作率接近 50%。';
        col = C.amber;
      } else if (p < 0.05) {
        msg = 'λ=' + lam.toFixed(2) + '：合作≈' + (p * 100).toFixed(2) + '%——已接近纳什（双方背叛）。';
        col = C.red;
      } else {
        msg = 'λ=' + lam.toFixed(2) + '：合作≈' + (p * 100).toFixed(2) + '%。λ↑合作率下降并趋向纳什 0；λ=0 时为 50%。';
        col = C.blue;
      }
      txt($('pd_vh'), msg);
      tint($('pd_vh'), col);
      // curve of coop vs λ
      var xs = [], ys = [], L;
      for (L = 0; L <= 4.0001; L += 0.1) {
        xs.push(L);
        ys.push(solve(L));
      }
      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 52, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = 0, ymax = 0.55;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      xs.forEach(function (x, i) {
        var px = pl + (x / 4) * bw;
        var py = y1 - ((ys[i] - ymin) / (ymax - ymin)) * bh;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      var px0 = pl + (lam / 4) * bw;
      var py0 = y1 - ((p - ymin) / (ymax - ymin)) * bh;
      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(px0, py0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('λ →', pl + bw, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillText('0', pl, y1 + 13);
      ctx.textAlign = 'right';
      ctx.fillText('4', pl + bw, y1 + 13);
      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'left';
      ctx.fillText('合作率', pl + 8, pt + 12);
    }
    bind(['pd_lam'], upd);
    upd();
  })();

  /* ── 3. 猎鹿 λ-同伦 ── */
  (function stag() {
    if (!$('st_lam')) return;
    var cv = $('stChart');
    function solve(lam) {
      var p = 0.5, i, p2;
      for (i = 0; i < 3000; i++) {
        p2 = soft(lam, [5 * p, 4 * p + 2 * (1 - p)])[0];
        if (Math.abs(p2 - p) < 1e-14) return p2;
        p = 0.7 * p + 0.3 * p2;
      }
      return p;
    }
    function upd() {
      var lam = parseFloat($('st_lam').value);
      var ps = solve(lam);
      var ph = 1 - ps;
      var eus = 5 * ps;
      var euh = 2 + 2 * ps;
      txt($('st_lamO'), lam.toFixed(2));
      txt($('st_ps'), (ps * 100).toFixed(2) + '%');
      txt($('st_ph'), (ph * 100).toFixed(2) + '%');
      txt($('st_eus'), eus.toFixed(3));
      txt($('st_euh'), euh.toFixed(3));
      var msg, col;
      if (lam < 0.05) {
        msg = 'λ≈0：回到均匀 50-50。';
        col = C.amber;
      } else if (ps < 0.05) {
        msg = 'λ=' + lam.toFixed(2) + '：猎鹿≈' + (ps * 100).toFixed(2) + '%——同伦沉向风险占优的打兔。';
        col = C.red;
      } else {
        msg = 'λ=' + lam.toFixed(2) + '：猎鹿≈' + (ps * 100).toFixed(2) + '%。λ↑进一步沉向打兔；支付占优均衡未必被同伦选中。';
        col = C.blue;
      }
      txt($('st_vh'), msg);
      tint($('st_vh'), col);
      bars(cv, [
        { v: ps, c: C.green, lab: 'P(猎鹿)', labV: (ps * 100).toFixed(1) + '%' },
        { v: ph, c: C.amber, lab: 'P(打兔)', labV: (ph * 100).toFixed(1) + '%' }
      ], 0, 1, '概率');
    }
    bind(['st_lam'], upd);
    upd();
  })();

  /* ── 4. 失误地板 ── */
  (function floor() {
    if (!$('fl_lam')) return;
    var cv = $('flChart');
    function upd() {
      var lam = parseFloat($('fl_lam').value);
      var d = parseFloat($('fl_d').value);
      var p = logitP(lam, d);
      var miss = 1 - p;
      var need = Math.log(19); // P(次优)=0.05 → e^{λΔ}=19
      txt($('fl_lamO'), lam.toFixed(2));
      txt($('fl_dO'), d.toFixed(1));
      txt($('fl_p'), (p * 100).toFixed(2) + '%');
      txt($('fl_miss'), (miss * 100).toFixed(2) + '%');
      txt($('fl_ld'), (lam * d).toFixed(2));
      txt($('fl_need'), '≈' + need.toFixed(2));
      var msg, col;
      if (miss < 0.05) {
        msg = '失误地板≈' + (miss * 100).toFixed(2) + '%——已低于 5% 门槛（需 λ·Δπ≳' + need.toFixed(2) + '）。';
        col = C.green;
      } else if (miss > 0.35) {
        msg = '失误地板≈' + (miss * 100).toFixed(2) + '% 很高：要么加大支付差，要么别假设对方很「理性」。';
        col = C.red;
      } else {
        msg = '默认逻辑：失误地板≈' + (miss * 100).toFixed(2) + '%。要把 P(次优)<5%，需 λ·Δπ≳' + need.toFixed(2) + '（logit）。加大支付差或提高对方精度，两条路。';
        col = C.blue;
      }
      txt($('fl_vh'), msg);
      tint($('fl_vh'), col);
      bars(cv, [
        { v: p, c: C.green, lab: '选优', labV: (p * 100).toFixed(1) + '%' },
        { v: miss, c: C.red, lab: '失误地板', labV: (miss * 100).toFixed(1) + '%' },
        { v: 0.05, c: C.purple, lab: '5%线', labV: '5%' }
      ], 0, 1, '概率');
    }
    bind(['fl_lam', 'fl_d'], upd);
    upd();
  })();
})();
