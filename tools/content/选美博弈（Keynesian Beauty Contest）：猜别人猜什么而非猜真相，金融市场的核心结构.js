/* ============================================================
   《选美博弈 Keynesian Beauty Contest》主题脚本
   四个可调模型：
     1. level-k 猜数
     2. 群体混合谁赢
     3. 公共信号超配权重
     4. 短视定价楔
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
  function clampLabel(ctx, lab, x, y, align, pl, w) {
    var lw = ctx.measureText(lab).width;
    ctx.textAlign = align;
    var lx = align === 'left' ? Math.min(x, w - lw - 6) : Math.max(x, pl + 6);
    ctx.fillText(lab, lx, y);
  }
  function r2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function r3(x) { return (Math.round(x * 1000) / 1000).toFixed(3); }
  function r1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function signed(x) {
    var v = Math.round(x * 100) / 100;
    return (v > 0 ? '+' : '') + v.toFixed(2);
  }
  function levelK(p, l0, k) {
    return l0 * Math.pow(p, k);
  }
  function pubW(alpha, k) {
    return 1 - Math.pow(1 - alpha, k + 1);
  }
  function priceWedge(F, Ppub, alpha, k, beta) {
    var w = pubW(alpha, k);
    var op = (1 - w) * F + w * Ppub;
    var P = (1 - beta) * F + beta * op;
    return { w: w, op: op, P: P, wedge: P - F };
  }

  /* ── 1. level-k ── */
  (function lk() {
    var pEl = $('lk_p'), l0El = $('lk_l0'), kEl = $('lk_k');
    if (!pEl || !l0El || !kEl) return;
    var cv = $('lkChart');

    function upd() {
      var p = parseFloat(pEl.value), l0 = parseFloat(l0El.value), k = parseInt(kEl.value, 10);
      var you = levelK(p, l0, k);
      var l1 = levelK(p, l0, 1), l2 = levelK(p, l0, 2);
      var nash = (p < 1) ? 0 : l0;

      txt($('lk_pO'), r2(p));
      txt($('lk_l0O'), String(Math.round(l0)));
      txt($('lk_kO'), String(k));
      txt($('lk_you'), r2(you));
      txt($('lk_l1'), r2(l1));
      txt($('lk_l2'), r2(l2));
      txt($('lk_nash'), r2(nash));

      var msg = 'p=' + r2(p) + '，L' + k + '=' + r2(you) +
        '（L1=' + r2(l1) + '，L2=' + r2(l2) + '）；无限层 → ' + r2(nash) +
        (k >= 5 ? '。过深可能远离第一轮开奖带。' : '。');
      var col = (k === 0) ? C.amber : (k <= 2 ? C.green : C.blue);
      txt($('lk_vh'), msg);
      tint($('lk_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxK = 8;
      var maxY = l0 * 1.05;
      function sx(kk) { return pl + (kk / maxK) * bw; }
      function sy(v) { return y1 - (v / maxY) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var kk = 0; kk <= maxK; kk++) {
        var vv = levelK(p, l0, kk);
        if (kk === 0) ctx.moveTo(sx(kk), sy(vv));
        else ctx.lineTo(sx(kk), sy(vv));
      }
      ctx.stroke();

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(k), sy(you), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('层级 k →', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillText('报数', pl - 6, pt + 10);
    }
    bind(['lk_p', 'lk_l0', 'lk_k'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 2. mixture winner ── */
  (function mx() {
    var pEl = $('mx_p'), w0El = $('mx_w0'), w1El = $('mx_w1'), w2El = $('mx_w2');
    if (!pEl || !w0El) return;
    var cv = $('mxChart');

    function upd() {
      var p = parseFloat(pEl.value);
      var a = parseFloat(w0El.value), b = parseFloat(w1El.value), c = parseFloat(w2El.value);
      var s = a + b + c;
      if (s <= 0) { a = 1; b = 0; c = 0; s = 1; }
      var f0 = a / s, f1 = b / s, f2 = c / s;
      var l0 = 50, l1 = levelK(p, l0, 1), l2 = levelK(p, l0, 2);
      var mean = f0 * l0 + f1 * l1 + f2 * l2;
      var tgt = p * mean;
      var d0 = Math.abs(l0 - tgt), d1 = Math.abs(l1 - tgt), d2 = Math.abs(l2 - tgt);
      var win = 'L0', err = d0, wcol = C.amber;
      if (d1 <= err) { win = 'L1'; err = d1; wcol = C.blue; }
      if (d2 <= err) { win = 'L2'; err = d2; wcol = C.green; }

      txt($('mx_pO'), r2(p));
      txt($('mx_w0O'), String(Math.round(a)));
      txt($('mx_w1O'), String(Math.round(b)));
      txt($('mx_w2O'), String(Math.round(c)));
      txt($('mx_mean'), r2(mean));
      txt($('mx_tgt'), r2(tgt));
      txt($('mx_win'), win);
      tint($('mx_win'), wcol);
      txt($('mx_err'), r2(err));

      var msg = '归一后 L0/L1/L2=' + r2(f0 * 100) + '%/' + r2(f1 * 100) + '%/' + r2(f2 * 100) +
        '% → 均值=' + r2(mean) + '，目标=' + r2(tgt) + ' → 最近 ' + win + '（|ε|=' + r2(err) + '）';
      txt($('mx_vh'), msg);
      tint($('mx_vh'), wcol);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr;
      var items = [
        { lab: 'L0=' + r2(l0), v: d0, c: C.amber },
        { lab: 'L1=' + r2(l1), v: d1, c: C.blue },
        { lab: 'L2=' + r2(l2), v: d2, c: C.green }
      ];
      var maxV = Math.max(0.01, d0, d1, d2);
      var barH = 28, gap = 16, startY = pt + 24;
      items.forEach(function (it, i) {
        var y = startY + i * (barH + gap);
        var len = (it.v / maxV) * bw * 0.92;
        ctx.fillStyle = it.c;
        ctx.fillRect(pl, y, Math.max(2, len), barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab + '  |ε|', pl, y - 4);
        var lab = r2(it.v);
        ctx.fillStyle = C.ink2;
        clampLabel(ctx, lab, pl + len + 8, y + barH / 2 + 4, 'left', pl, w);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('与目标的绝对误差（越短越近）· 目标=' + r2(tgt), pl + bw / 2, y1 + 31);
    }
    bind(['mx_p', 'mx_w0', 'mx_w1', 'mx_w2'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 3. public overweight ── */
  (function pw() {
    var aEl = $('pw_a'), kEl = $('pw_k');
    if (!aEl || !kEl) return;
    var cv = $('pwChart');

    function upd() {
      var alpha = parseFloat(aEl.value), k = parseInt(kEl.value, 10);
      var w = pubW(alpha, k);
      var w0 = pubW(alpha, 0);
      var dw = w - w0;

      txt($('pw_aO'), r2(alpha));
      txt($('pw_kO'), String(k));
      txt($('pw_w'), r3(w));
      txt($('pw_priv'), r3(1 - w));
      txt($('pw_dw'), signed(dw));
      tint($('pw_dw'), dw >= 0 ? C.red : C.green);

      var msg = 'α=' + r2(alpha) + '、k=' + k + ' → w=1-(1-α)^(k+1)=' + r3(w) +
        '（私人仅 ' + r3(1 - w) + '）；相对一阶 Δw=' + signed(dw);
      txt($('pw_vh'), msg);
      tint($('pw_vh'), w >= 0.8 ? C.red : C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, ww = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 16, y1 = h - 46;
      var bw = ww - pl - pr, bh = y1 - pt;
      var maxK = 8;
      function sx(kk) { return pl + (kk / maxK) * bw; }
      function sy(v) { return y1 - v * bh; }

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      ctx.strokeStyle = C.amber;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var kk = 0; kk <= maxK; kk++) {
        var vv = pubW(alpha, kk);
        if (kk === 0) ctx.moveTo(sx(kk), sy(vv));
        else ctx.lineTo(sx(kk), sy(vv));
      }
      ctx.stroke();

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(k), sy(w), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('阶数 k → 公共权重 w', pl + bw / 2, y1 + 31);
    }
    bind(['pw_a', 'pw_k'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 4. price wedge ── */
  (function pr() {
    var fEl = $('pr_f'), pubEl = $('pr_pub'), aEl = $('pr_a'), kEl = $('pr_k'), bEl = $('pr_b');
    if (!fEl || !pubEl || !aEl || !kEl || !bEl) return;
    var cv = $('prChart');

    function upd() {
      var F = parseFloat(fEl.value), Ppub = parseFloat(pubEl.value);
      var alpha = parseFloat(aEl.value), k = parseInt(kEl.value, 10), beta = parseFloat(bEl.value);
      var r = priceWedge(F, Ppub, alpha, k, beta);
      var hi = r.wedge >= 0;
      var col = hi ? C.red : C.green;

      txt($('pr_fO'), String(Math.round(F)));
      txt($('pr_pubO'), String(Math.round(Ppub)));
      txt($('pr_aO'), r2(alpha));
      txt($('pr_kO'), String(k));
      txt($('pr_bO'), r2(beta));
      txt($('pr_p'), r2(r.P));
      txt($('pr_w'), signed(r.wedge));
      tint($('pr_w'), col);
      txt($('pr_ow'), r3(r.w));
      txt($('pr_dir'), hi ? '偏高' : (r.wedge < 0 ? '偏低' : '持平'));
      tint($('pr_dir'), col);

      var msg = 'w=' + r3(r.w) + '，意见=' + r2(r.op) + ' → P=(1-β)F+β·Op=' + r2(r.P) +
        '，楔=' + signed(r.wedge) + (hi ? '（涨红）' : '（跌绿）');
      txt($('pr_vh'), msg);
      tint($('pr_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr;
      var items = [
        { lab: '基本面 F', v: F, c: C.ink2 },
        { lab: '平均意见', v: r.op, c: C.amber },
        { lab: '价格 P', v: r.P, c: col }
      ];
      var minV = Math.min(F, r.op, r.P) - 5;
      var maxV = Math.max(F, r.op, r.P) + 5;
      var span = Math.max(1, maxV - minV);
      var barH = 28, gap = 16, startY = pt + 24;
      function sx(v) { return pl + ((v - minV) / span) * bw; }
      items.forEach(function (it, i) {
        var y = startY + i * (barH + gap);
        var x0 = sx(Math.min(F, it.v));
        // draw from min axis
        var len = ((it.v - minV) / span) * bw;
        ctx.fillStyle = it.c;
        ctx.fillRect(pl, y, Math.max(2, len), barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab, pl, y - 4);
        var lab = r2(it.v);
        ctx.fillStyle = C.ink2;
        clampLabel(ctx, lab, pl + len + 8, y + barH / 2 + 4, 'left', pl, w);
      });
      // F marker line
      ctx.strokeStyle = C.ink3;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      var fx = sx(F);
      ctx.beginPath();
      ctx.moveTo(fx, pt);
      ctx.lineTo(fx, y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('虚线=基本面 F · 楔 ' + signed(r.wedge), pl + bw / 2, y1 + 31);
    }
    bind(['pr_f', 'pr_pub', 'pr_a', 'pr_k', 'pr_b'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();
})();
