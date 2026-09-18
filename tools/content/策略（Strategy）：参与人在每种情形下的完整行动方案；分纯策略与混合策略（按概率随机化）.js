/* ============================================================
   《策略（Strategy）：纯策略与混合策略》主题脚本
   四个可调模型（全部真实参与计算）：
     1. 猜硬币：己方 p × 对手 q → EU 与最优反应
     2. 性别战：支付 a,b → 混合纳什 (p*,q*) 与期望支付
     3. 懦夫博弈：碰撞损失 L → 混合 Dare 概率与 EU
     4. 剪刀石头布：己方/对手混合 → 期望支付与最优纯策略
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

  /* ── 1. 猜硬币 Matching Pennies ── */
  (function mp() {
    var pEl = $('mp_p'), qEl = $('mp_q');
    if (!pEl || !qEl) return;
    var cv = $('mpChart');

    function upd() {
      var p = parseFloat(pEl.value);
      var q = parseFloat(qEl.value);
      var euH = 2 * q - 1;
      var euT = 1 - 2 * q;
      var eu = p * euH + (1 - p) * euT;
      var best = '双方无差异，可任意混合';
      var col = C.blue;
      if (euH > euT + 1e-9) { best = '最优纯策略：正面 H（EU=' + euH.toFixed(2) + '）'; col = C.red; }
      else if (euT > euH + 1e-9) { best = '最优纯策略：反面 T（EU=' + euT.toFixed(2) + '）'; col = C.green; }
      else { best = '无差异：任意混合均为最优反应（均衡要求 q*=0.50）'; col = C.blue; }

      txt($('mp_pO'), p.toFixed(2));
      txt($('mp_qO'), q.toFixed(2));
      txt($('mp_h'), euH.toFixed(2));
      txt($('mp_t'), euT.toFixed(2));
      txt($('mp_eu'), eu.toFixed(2));
      txt($('mp_vh'), best);
      tint($('mp_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = -1.05, ymax = 1.05;
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = -1; v <= 1; v += 0.5) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(1), pl - 6, y + 4);
      }
      // zero line
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, sy(0));
      ctx.lineTo(w - pr, sy(0));
      ctx.stroke();

      // EU(H) vs q
      ctx.lineWidth = 2;
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (var i = 0; i <= 100; i++) {
        var qq = i / 100;
        var x = sx(qq), yy = sy(2 * qq - 1);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
      // EU(T)
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        qq = i / 100;
        x = sx(qq); yy = sy(1 - 2 * qq);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      // current q marker
      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(q), pt);
      ctx.lineTo(sx(q), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      // your mix EU point
      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(q), sy(eu), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('红=EU(H)  绿=EU(T)', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('对手出正面概率 q', pl + bw / 2, y1 + 31);
      // ticks
      ctx.fillStyle = C.ink3;
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        var t = idx / 2;
        ctx.fillText(lab, sx(t), y1 + 13);
      });
    }
    bind(['mp_p', 'mp_q'], upd);
    upd();
  })();

  /* ── 2. 性别战 Battle of Sexes ── */
  (function bos() {
    var aEl = $('bos_a'), bEl = $('bos_b');
    if (!aEl || !bEl) return;
    var cv = $('bosChart');

    function upd() {
      // OO=(a,1), BB=(1,b)；无差异 → q*=1/(a+1), p*=b/(b+1), EU1*=a/(a+1)
      var hi = parseFloat(aEl.value);
      var lo = 1;
      var hib = parseFloat(bEl.value);
      // Row indifferent: hi*q + 0*(1-q) = 0*q + lo*(1-q) => a*q = 1*(1-q) => q = 1/(a+1)
      // Col indifferent: lo*p + 0 = 0*p + hib*(1-p) => 1*p = b*(1-p) => p = b/(b+1)
      var qStar = 1 / (hi + 1);
      var pStar = hib / (hib + 1);
      var eu1 = hi * qStar; // = a/(a+1)
      var eu2 = lo * pStar; // = pStar = b/(b+1)  when col plays Opera... wait
      // Col EU at eq when playing Opera: 1*pStar = pStar
      // Col EU when Ballet: b*(1-pStar) = same
      eu2 = pStar; // since lo=1

      txt($('bos_aO'), hi.toFixed(1));
      txt($('bos_bO'), hib.toFixed(1));
      txt($('bos_p'), pStar.toFixed(3));
      txt($('bos_q'), qStar.toFixed(3));
      txt($('bos_eu'), eu1.toFixed(3));
      txt($('bos_vh'), '混合纳什：行方 Opera p*=' + pStar.toFixed(3) + '，列方 Opera q*=' + qStar.toFixed(3) + '；行方 EU=' + eu1.toFixed(3) + '（纯协调 OO 可得 ' + hi.toFixed(1) + '）');
      tint($('bos_vh'), eu1 < hi * 0.6 ? C.amber : C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymax = Math.max(3, hi, hib) + 0.5;
      function sy(v) { return y1 - (v / ymax) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = 0; v <= ymax; v++) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(String(v), pl - 6, y + 4);
      }

      // EU(Opera) and EU(Ballet) for row vs q
      ctx.lineWidth = 2;
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (var i = 0; i <= 100; i++) {
        var qq = i / 100;
        var x = sx(qq), yy = sy(hi * qq);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        qq = i / 100;
        x = sx(qq); yy = sy(lo * (1 - qq));
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(qStar), pt);
      ctx.lineTo(sx(qStar), y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(qStar), sy(eu1), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'left';
      ctx.fillText('红=EU(Opera)  绿=EU(Ballet)  黄线=q*', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillStyle = C.ink3;
      ctx.fillText('列方选 Opera 的概率 q', pl + bw / 2, y1 + 31);
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx / 2), y1 + 13);
      });
    }
    bind(['bos_a', 'bos_b'], upd);
    upd();
  })();

  /* ── 3. 懦夫博弈 Chicken ── */
  (function ch() {
    var lEl = $('ch_L');
    if (!lEl) return;
    var cv = $('chChart');

    function upd() {
      var L = parseFloat(lEl.value);
      if (L < 1.01) L = 1.01;
      var pSwerve = (L - 1) / L;
      var pDare = 1 / L;
      var eu = pSwerve - 1; // = -1/L
      txt($('ch_LO'), L.toFixed(1));
      txt($('ch_sw'), pSwerve.toFixed(3));
      txt($('ch_dr'), pDare.toFixed(3));
      txt($('ch_eu'), eu.toFixed(3));
      txt($('ch_vh'), '混合纳什：各方 Dare 概率 = 1/L = ' + pDare.toFixed(3) + '；期望支付 = −1/L = ' + eu.toFixed(3) + '（L↑ → 更少冒险）');
      tint($('ch_vh'), L >= 8 ? C.green : C.amber);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var Lmax = 20;
      function sy(v) { return y1 - (v / 1) * bh; } // dare prob 0..1
      function sx(Lv) { return pl + ((Lv - 2) / (Lmax - 2)) * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = 0; v <= 1.001; v += 0.25) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(2), pl - 6, y + 4);
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (var i = 0; i <= 100; i++) {
        var Lv = 2 + (i / 100) * (Lmax - 2);
        var pd = 1 / Lv;
        var x = sx(Lv), yy = sy(pd);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(Math.min(L, Lmax)), sy(pDare), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'left';
      ctx.fillText('Dare 概率 = 1/L', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillStyle = C.ink3;
      ctx.fillText('碰撞损失 L', pl + bw / 2, y1 + 31);
      [2, 8, 14, 20].forEach(function (Lv) {
        ctx.fillText(String(Lv), sx(Lv), y1 + 13);
      });
    }
    bind(['ch_L'], upd);
    upd();
  })();

  /* ── 4. 剪刀石头布 RPS ── */
  (function rps() {
    var ids = ['rps_r', 'rps_p', 'rps_or', 'rps_op'];
    if (!$('rps_r')) return;
    var cv = $('rpsChart');

    function norm3(a, b) {
      var c = 1 - a - b;
      if (c < 0) {
        // clamp: keep a,b proportional on simplex edge
        var s = a + b;
        if (s <= 0) return [1 / 3, 1 / 3, 1 / 3];
        return [a / s, b / s, 0];
      }
      return [a, b, c];
    }

    function upd() {
      var you = norm3(parseFloat($('rps_r').value), parseFloat($('rps_p').value));
      var opp = norm3(parseFloat($('rps_or').value), parseFloat($('rps_op').value));
      // Payoff: Rock beats Scissors +1, loses to Paper -1, tie 0
      // EU(Rock)= 0*oppR + (-1)*oppP + (+1)*oppS
      var euR = -opp[1] + opp[2];
      var euP = opp[0] - opp[2];
      var euS = -opp[0] + opp[1];
      var eu = you[0] * euR + you[1] * euP + you[2] * euS;
      var bestV = Math.max(euR, euP, euS);
      var worstV = Math.min(euR, euP, euS);
      var best = 'R';
      if (euP >= euR && euP >= euS) best = 'P';
      if (euS >= euR && euS >= euP) best = 'S';
      if (bestV - worstV < 0.02) best = '任意（无差异）';

      txt($('rps_rO'), you[0].toFixed(3));
      txt($('rps_pO'), you[1].toFixed(3));
      txt($('rps_sO'), you[2].toFixed(3));
      txt($('rps_orO'), opp[0].toFixed(3));
      txt($('rps_opO'), opp[1].toFixed(3));
      txt($('rps_osO'), opp[2].toFixed(3));
      txt($('rps_eu'), eu.toFixed(3));
      txt($('rps_br'), best);
      var msg = '对当前对手：EU(R/P/S)=(' + euR.toFixed(2) + ',' + euP.toFixed(2) + ',' + euS.toFixed(2) + ')；最优=' + best;
      if (Math.abs(opp[0] - 1 / 3) < 0.02 && Math.abs(opp[1] - 1 / 3) < 0.02) {
        msg += ' · 对手≈均匀混合 → 你任意策略 EU≈0（纳什）';
      }
      txt($('rps_vh'), msg);
      tint($('rps_vh'), Math.abs(eu) < 0.05 ? C.blue : (eu > 0 ? C.red : C.green));

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 56, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [euR, euP, euS];
      var labs = ['R', 'P', 'S'];
      var cols = [C.red, C.blue, C.green];
      var ymax = 1.2, ymin = -1.2;
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = -1; v <= 1; v++) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(String(v), pl - 6, y + 4);
      }
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, sy(0));
      ctx.lineTo(w - pr, sy(0));
      ctx.stroke();

      var barW = bw / 5;
      for (var i = 0; i < 3; i++) {
        var cx = pl + (i + 1) * (bw / 4);
        var v0 = vals[i];
        var y0 = sy(0), yv = sy(v0);
        ctx.fillStyle = cols[i];
        ctx.fillRect(cx - barW / 2, Math.min(y0, yv), barW, Math.abs(yv - y0));
        ctx.fillStyle = C.ink;
        ctx.textAlign = 'center';
        ctx.font = '12px sans-serif';
        var lab = labs[i] + ' ' + v0.toFixed(2);
        var lw = ctx.measureText(lab).width;
        var lx = cx;
        // label above/below bar
        ctx.fillText(lab, lx, v0 >= 0 ? yv - 6 : yv + 14);
        ctx.fillStyle = C.ink3;
        ctx.fillText(labs[i], cx, y1 + 13);
      }
      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'left';
      ctx.font = '11px sans-serif';
      ctx.fillText('各纯策略对当前对手的期望支付', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillStyle = C.ink3;
      ctx.fillText('你的混合 EU = ' + eu.toFixed(3), pl + bw / 2, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();
})();
