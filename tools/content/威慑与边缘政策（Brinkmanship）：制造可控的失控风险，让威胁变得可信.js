/* ============================================================
   《威慑与边缘政策（Brinkmanship）》主题脚本
   四个可调模型：
     1. 临界风险 p*
     2. 自主风险累计 R
     3. 决心竞赛（谁先让）
     4. 斗鸡混策略对照
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
      ctx.fillText(v.toFixed(2), pl - 6, y + 3);
    }
  }
  function pStar(W, Cpay, D) {
    var den = W - D;
    if (Math.abs(den) < 1e-12) return 0;
    var p = (W - Cpay) / den;
    if (p < 0) return 0;
    if (p > 1) return 1;
    return p;
  }

  /* ── 1. 临界风险 p* ── */
  (function pstarTool() {
    if (!$('ps_w')) return;
    var ids = ['ps_w', 'ps_c', 'ps_d', 'ps_r'];
    var cv = $('psChart');

    function upd() {
      var W = parseFloat($('ps_w').value);
      var Cpay = parseFloat($('ps_c').value);
      var D = parseFloat($('ps_d').value);
      var R = parseFloat($('ps_r').value);
      if (Cpay > W) Cpay = W;
      txt($('ps_wO'), String(W));
      txt($('ps_cO'), String(Cpay));
      txt($('ps_dO'), String(D));
      txt($('ps_rO'), R.toFixed(2));

      var p = pStar(W, Cpay, D);
      var act, msg, col;
      if (R > p + 1e-9) {
        act = '应让步';
        msg = 'R=' + R.toFixed(2) + ' > p*=' + p.toFixed(3) + ' → 继续僵持的期望劣于让步';
        col = C.amber;
      } else if (Math.abs(R - p) < 1e-9) {
        act = '临界无差异';
        msg = 'R=p*=' + p.toFixed(3) + ' → 僵持与让步无差异';
        col = C.blue;
      } else {
        act = '可继续僵持';
        msg = 'R=' + R.toFixed(2) + ' < p*=' + p.toFixed(3) + ' → 尚未越过临界；抬风险才有逼迫力';
        col = C.green;
      }

      txt($('ps_star'), p.toFixed(3));
      txt($('ps_pct'), (p * 100).toFixed(1) + '%');
      txt($('ps_act'), act);
      txt($('ps_vh'), msg);
      tint($('ps_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 52, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = 0, ymax = Math.max(0.6, R, p) * 1.15;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);

      function bar(xCenter, val, color, lab) {
        var barW = bw / 5.2;
        var x = xCenter - barW / 2;
        var yv = y1 - ((val - ymin) / (ymax - ymin)) * bh;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, yv, barW, y1 - yv);
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        var labN = val.toFixed(3);
        var lw = ctx.measureText(labN).width;
        var lx = Math.min(Math.max(xCenter, pl + lw / 2 + 4), w - pr - lw / 2 - 4);
        ctx.fillText(labN, lx, Math.max(pt + 10, yv - 6));
        ctx.fillStyle = C.ink3;
        ctx.fillText(lab, xCenter, y1 + 18);
      }
      bar(pl + bw * 0.28, p, C.blue, 'p*');
      bar(pl + bw * 0.72, R, R > p ? C.red : C.green, 'R');

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      var yp = y1 - ((p - ymin) / (ymax - ymin)) * bh;
      ctx.beginPath();
      ctx.moveTo(pl, yp);
      ctx.lineTo(w - pr, yp);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('临界 vs 共享风险', pl + bw, pt - 6);
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('虚线 = p*', pl + 4, yp - 4);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 2. 累计自主风险 ── */
  (function cumTool() {
    if (!$('cm_r')) return;
    var ids = ['cm_r', 'cm_n', 'cm_p'];
    var cv = $('cmChart');

    function upd() {
      var r = parseFloat($('cm_r').value);
      var n = parseInt($('cm_n').value, 10);
      var p = parseFloat($('cm_p').value);
      txt($('cm_rO'), r.toFixed(2));
      txt($('cm_nO'), String(n));
      txt($('cm_pO'), p.toFixed(2));

      var R = 1 - Math.pow(1 - r, n);
      var cmp, msg, col;
      if (R > p + 1e-9) {
        cmp = '已越过';
        msg = 'R=' + (R * 100).toFixed(1) + '% > p*=' + (p * 100).toFixed(1) +
          '% → 理性对手应已考虑让步；继续加轮是双毁赌博';
        col = C.red;
      } else {
        cmp = '未越过';
        msg = 'R=' + (R * 100).toFixed(1) + '% ≤ p*=' + (p * 100).toFixed(1) +
          '% → 逼迫力不足；可增大 r 或增加轮数';
        col = C.green;
      }
      txt($('cm_R'), R.toFixed(3));
      txt($('cm_pct'), (R * 100).toFixed(1) + '%');
      txt($('cm_cmp'), cmp);
      txt($('cm_vh'), msg);
      tint($('cm_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var T = Math.max(n, 8);
      var ymax = 1;
      axisY(ctx, pl, y1, pt, bh, 0, ymax, w);

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= T; i++) {
        var Ri = 1 - Math.pow(1 - r, i);
        var x = pl + (i / T) * bw;
        var y = y1 - (Ri / ymax) * bh;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      var yp = y1 - (p / ymax) * bh;
      ctx.beginPath();
      ctx.moveTo(pl, yp);
      ctx.lineTo(w - pr, yp);
      ctx.stroke();
      ctx.setLineDash([]);

      var xN = pl + (n / T) * bw;
      var yN = y1 - (R / ymax) * bh;
      ctx.fillStyle = R > p ? C.red : C.green;
      ctx.beginPath();
      ctx.arc(xN, yN, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      for (var t = 0; t <= T; t += Math.max(1, Math.floor(T / 6))) {
        ctx.fillText(String(t), pl + (t / T) * bw, y1 + 18);
      }
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('累计风险曲线 R(n)', pl + bw, pt - 6);
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('横轴=轮数', pl + 4, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 3. 决心竞赛 ── */
  (function resolveTool() {
    if (!$('rv_wa')) return;
    var ids = ['rv_wa', 'rv_ca', 'rv_wb', 'rv_cb', 'rv_d'];
    var cv = $('rvChart');

    function upd() {
      var Wa = parseFloat($('rv_wa').value);
      var Ca = parseFloat($('rv_ca').value);
      var Wb = parseFloat($('rv_wb').value);
      var Cb = parseFloat($('rv_cb').value);
      var D = parseFloat($('rv_d').value);
      if (Ca > Wa) Ca = Wa;
      if (Cb > Wb) Cb = Wb;
      txt($('rv_waO'), String(Wa));
      txt($('rv_caO'), String(Ca));
      txt($('rv_wbO'), String(Wb));
      txt($('rv_cbO'), String(Cb));
      txt($('rv_dO'), String(D));

      var pa = pStar(Wa, Ca, D);
      var pb = pStar(Wb, Cb, D);
      var who, msg, col;
      if (Math.abs(pa - pb) < 1e-9) {
        who = '同时临界';
        msg = 'p*ₐ=p*ᵦ=' + pa.toFixed(3) + ' → 教学上同时触及；现实中信息噪声决定谁先闪';
        col = C.amber;
      } else if (pa < pb) {
        who = 'A';
        msg = 'p*ₐ=' + pa.toFixed(3) + ' < p*ᵦ=' + pb.toFixed(3) +
          ' → 风险爬升时 A 先触及临界（完全信息教学版）';
        col = C.red;
      } else {
        who = 'B';
        msg = 'p*ᵦ=' + pb.toFixed(3) + ' < p*ₐ=' + pa.toFixed(3) +
          ' → 风险爬升时 B 先触及临界（完全信息教学版）';
        col = C.blue;
      }
      txt($('rv_pa'), pa.toFixed(3));
      txt($('rv_pb'), pb.toFixed(3));
      txt($('rv_who'), who);
      txt($('rv_vh'), msg);
      tint($('rv_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 52, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymax = Math.max(0.4, pa, pb) * 1.25;
      axisY(ctx, pl, y1, pt, bh, 0, ymax, w);

      function bar(xc, val, color, lab) {
        var barW = bw / 5;
        var x = xc - barW / 2;
        var yv = y1 - (val / ymax) * bh;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, yv, barW, y1 - yv);
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(val.toFixed(3), xc, Math.max(pt + 10, yv - 6));
        ctx.fillStyle = C.ink3;
        ctx.fillText(lab, xc, y1 + 18);
      }
      bar(pl + bw * 0.3, pa, C.red, 'p*ₐ');
      bar(pl + bw * 0.7, pb, C.blue, 'p*ᵦ');
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('双方临界风险', pl + bw, pt - 6);
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('较低者先让', pl + 4, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 4. 斗鸡混策略 ── */
  (function chickenTool() {
    if (!$('ck_s')) return;
    var ids = ['ck_s', 'ck_w', 'ck_l', 'ck_k'];
    var cv = $('ckChart');

    function upd() {
      var S = parseFloat($('ck_s').value);
      var W = parseFloat($('ck_w').value);
      var L = parseFloat($('ck_l').value);
      var K = parseFloat($('ck_k').value);
      txt($('ck_sO'), S.toFixed(1));
      txt($('ck_wO'), W.toFixed(1));
      txt($('ck_lO'), L.toFixed(1));
      txt($('ck_kO'), K.toFixed(1));

      var den = S - W - L + K;
      var p = Math.abs(den) < 1e-12 ? 0.5 : (S - W) / den;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      var pp = p * p;
      var msg = '混策略撞车率 ' + (pp * 100).toFixed(1) +
        '%——边缘政策把「随机撞车」换成「可调节的共享风险」';
      var col = pp > 0.1 ? C.red : (pp > 0.04 ? C.amber : C.green);

      txt($('ck_p'), p.toFixed(3));
      txt($('ck_pp'), pp.toFixed(3));
      txt($('ck_lab'), '盲目混战');
      txt($('ck_vh'), msg);
      tint($('ck_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '双软', v: S, c: C.amber },
        { lab: '硬赢', v: W, c: C.green },
        { lab: '软输', v: L, c: C.blue },
        { lab: '撞车', v: K, c: C.red },
        { lab: 'p²×10', v: pp * 10, c: C.ink }
      ];
      var ymin = Math.min(S, W, L, K, pp * 10) - 1;
      var ymax = Math.max(S, W, L, K, pp * 10) + 1;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
      var barW = bw / (vals.length * 1.45);
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
        var lab = o.v.toFixed(2);
        var lw = ctx.measureText(lab).width;
        var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 4), w - pr - lw / 2 - 4);
        ctx.fillText(lab, lx, Math.min(top, yv) - 6);
        ctx.fillStyle = C.ink3;
        ctx.fillText(o.lab, x + barW / 2, y1 + 18);
      });
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('斗鸡支付与撞车率', pl + bw, pt - 6);
    }
    bind(ids, upd);
    upd();
  })();
})();
