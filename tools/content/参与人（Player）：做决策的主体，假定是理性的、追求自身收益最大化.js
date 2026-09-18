/* ============================================================
   《参与人（Player）》主题脚本
   四个可调模型（全部真实参与计算）：
     1. 囚徒困境：信念 p → EU(合作/背叛) 与占优差距
     2. 最后通牒：报价 o × 拒绝阈值 τ → 成交与支付
     3. Level-k 选美：λ、k、L0 → 猜测路径
     4. CRRA 彩票：风险厌恶 r → 确定性等价与风险溢价
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
  function axisBottom(g, y1) {
    var ctx = g.ctx, w = g.w;
    ctx.strokeStyle = C.axis;
    ctx.beginPath();
    ctx.moveTo(40, y1);
    ctx.lineTo(w - 16, y1);
    ctx.stroke();
  }

  /* ── 1. 囚徒困境最优反应 ── */
  (function pd() {
    var pEl = $('pd_p');
    if (!pEl) return;
    var cv = $('pdChart');

    function upd() {
      var p = parseFloat(pEl.value);
      var euC = 3 * p;
      var euD = 1 + 4 * p;
      var gap = euD - euC; // = 1+p
      txt($('pd_pO'), p.toFixed(2));
      txt($('pd_c'), euC.toFixed(2));
      txt($('pd_d'), euD.toFixed(2));
      txt($('pd_gap'), gap.toFixed(2));
      txt($('pd_vh'), '背叛严格占优（差距 = 1+p = ' + gap.toFixed(2) + ' > 0）');
      tint($('pd_vh'), C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymax = 6;
      function sy(v) { return y1 - (v / ymax) * bh; }
      function sx(t) { return pl + t * bw; } // t in [0,1] for p axis demo

      // grid
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

      // EU curves vs p
      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      for (var i = 0; i <= 100; i++) {
        var pp = i / 100;
        var x = sx(pp);
        var y = sy(3 * pp);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        pp = i / 100;
        x = sx(pp);
        y = sy(1 + 4 * pp);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // current p marker
      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(p), pt);
      ctx.lineTo(sx(p), y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(p), sy(euC), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(p), sy(euD), 4, 0, Math.PI * 2);
      ctx.fill();

      axisBottom(g, y1);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('0', sx(0), y1 + 13);
      ctx.fillText('0.5', sx(0.5), y1 + 13);
      ctx.fillText('1', sx(1), y1 + 13);
      ctx.fillText('对手合作概率 p', pl + bw / 2, y1 + 31);

      ctx.textAlign = 'left';
      ctx.fillStyle = C.blue;
      ctx.fillText('EU(合作)=3p', pl + 8, pt + 4);
      ctx.fillStyle = C.red;
      ctx.fillText('EU(背叛)=1+4p', pl + 120, pt + 4);
    }
    bind(['pd_p'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 2. 最后通牒 ── */
  (function ug() {
    var oEl = $('ug_o'), tEl = $('ug_t');
    if (!oEl || !tEl) return;
    var cv = $('ugChart');
    var pie = 100;

    function upd() {
      var o = parseFloat(oEl.value);
      var tau = parseFloat(tEl.value);
      var accept = o >= tau;
      var prop = accept ? pie - o : 0;
      var resp = accept ? o : 0;
      txt($('ug_oO'), String(Math.round(o)));
      txt($('ug_tO'), String(Math.round(tau)));
      txt($('ug_acc'), accept ? '接受' : '拒绝');
      tint($('ug_acc'), accept ? C.green : C.red);
      txt($('ug_prop'), String(prop));
      tint($('ug_prop'), prop > 0 ? C.red : C.ink2); // 涨红：提议者拿走
      txt($('ug_resp'), String(resp));
      tint($('ug_resp'), resp > 0 ? C.green : C.ink2);
      txt($('ug_vh'), accept
        ? ('o=' + Math.round(o) + ' ≥ τ=' + Math.round(tau) + ' → 成交；提议者 ' + prop + ' / 回应者 ' + resp)
        : ('o=' + Math.round(o) + ' < τ=' + Math.round(tau) + ' → 拒绝；双方 0（惩罚代价）'));
      tint($('ug_vh'), accept ? C.green : C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 24, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      function sx(v) { return pl + (v / pie) * bw; }
      function sy(v) { return y1 - (v / pie) * bh; }

      // grid
      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = 0; v <= 100; v += 25) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(String(v), pl - 6, y + 4);
      }

      // bars: prop / resp
      var barW = 48;
      var x0 = pl + bw * 0.28;
      var x1 = pl + bw * 0.62;
      ctx.fillStyle = accept ? '#fce8e8' : C.grid;
      ctx.fillRect(x0 - barW / 2, sy(prop), barW, y1 - sy(prop));
      ctx.fillStyle = accept ? '#e8f8ef' : C.grid;
      ctx.fillRect(x1 - barW / 2, sy(resp), barW, y1 - sy(resp));

      // tau line
      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(tau), pt);
      ctx.lineTo(sx(tau), y1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.amber;
      ctx.textAlign = 'center';
      ctx.fillText('τ=' + Math.round(tau), sx(tau), pt - 6);

      // offer marker on axis conceptually as label
      ctx.fillStyle = C.blue;
      ctx.fillText('o=' + Math.round(o), sx(o), y1 + 13);

      axisBottom(g, y1);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('支付（总额 100）', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'center';
      ctx.fillStyle = C.ink2;
      ctx.fillText('提议者', x0, y1 + 13);
      ctx.fillText('回应者', x1, y1 + 13);

      // value labels with clamp
      ctx.font = '12px sans-serif';
      ctx.fillStyle = C.ink;
      var lab1 = String(prop), lab2 = String(resp);
      ctx.textAlign = 'center';
      ctx.fillText(lab1, x0, sy(prop) - 6);
      ctx.fillText(lab2, x1, sy(resp) - 6);
    }
    bind(['ug_o', 'ug_t'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 3. Level-k 选美 ── */
  (function lk() {
    var lEl = $('lk_l'), kEl = $('lk_k'), bEl = $('lk_b');
    if (!lEl || !kEl || !bEl) return;
    var cv = $('lkChart');

    function chain(lambda, L0, K) {
      var a = [L0];
      for (var i = 1; i <= K; i++) a.push(lambda * a[i - 1]);
      return a;
    }

    function upd() {
      var lambda = parseFloat(lEl.value);
      var k = parseInt(kEl.value, 10);
      var L0 = parseFloat(bEl.value);
      var a = chain(lambda, L0, 8);
      var guess = a[k];
      txt($('lk_lO'), lambda.toFixed(3));
      txt($('lk_kO'), String(k));
      txt($('lk_bO'), String(Math.round(L0)));
      txt($('lk_guess'), guess.toFixed(1));
      txt($('lk_l1'), a[1].toFixed(1));
      txt($('lk_inf'), '0.0');
      txt($('lk_vh'), 'L' + k + ' ≈ ' + guess.toFixed(1) + '（λ=' + lambda.toFixed(3) + ', L0=' + Math.round(L0) + '）；L1=' + a[1].toFixed(1) + ', L2=' + a[2].toFixed(1));
      tint($('lk_vh'), C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxK = 8;
      var ymax = Math.max(L0, 1) * 1.05;
      function sx(ki) { return pl + (ki / maxK) * bw; }
      function sy(v) { return y1 - (v / ymax) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var gi = 0; gi <= 4; gi++) {
        var vv = ymax * gi / 4;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(0), pl - 6, y + 4);
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= maxK; i++) {
        var x = sx(i), yy = sy(a[i]);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      for (i = 0; i <= maxK; i++) {
        ctx.fillStyle = i === k ? C.amber : C.blue;
        ctx.beginPath();
        ctx.arc(sx(i), sy(a[i]), i === k ? 5 : 3, 0, Math.PI * 2);
        ctx.fill();
      }

      axisBottom(g, y1);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      for (i = 0; i <= maxK; i += 2) ctx.fillText('L' + i, sx(i), y1 + 13);
      ctx.fillText('推理层级 k', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = C.ink2;
      ctx.fillText('猜测', pl + bw - 4, pt + 4);
    }
    bind(['lk_l', 'lk_k', 'lk_b'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();

  /* ── 4. CRRA 确定性等价 ── */
  (function ce() {
    var rEl = $('ce_r'), hiEl = $('ce_hi'), loEl = $('ce_lo');
    if (!rEl || !hiEl || !loEl) return;
    var cv = $('ceChart');

    function u(w, r) {
      if (w <= 0) return -Infinity;
      if (Math.abs(r - 1) < 1e-9) return Math.log(w);
      return Math.pow(w, 1 - r) / (1 - r);
    }
    function ceFromEu(eu, r) {
      if (Math.abs(r - 1) < 1e-9) return Math.exp(eu);
      return Math.pow((1 - r) * eu, 1 / (1 - r));
    }

    function upd() {
      var r = parseFloat(rEl.value);
      var hi = parseFloat(hiEl.value);
      var lo = parseFloat(loEl.value);
      if (lo >= hi) lo = hi - 1;
      var p = 0.5;
      var ev = p * hi + (1 - p) * lo;
      var eu = p * u(hi, r) + (1 - p) * u(lo, r);
      var ce = ceFromEu(eu, r);
      var rp = ev - ce;
      txt($('ce_rO'), r.toFixed(2));
      txt($('ce_hiO'), String(Math.round(hi)));
      txt($('ce_loO'), String(Math.round(lo)));
      txt($('ce_ev'), ev.toFixed(1));
      txt($('ce_ce'), ce.toFixed(1));
      txt($('ce_rp'), rp.toFixed(1));
      txt($('ce_vh'), r < 0.05
        ? '近似风险中性：CE ≈ EV = ' + ev.toFixed(1)
        : ('r=' + r.toFixed(2) + ' → CE≈' + ce.toFixed(1) + '，风险溢价≈' + rp.toFixed(1) + '（相对 EV=' + ev.toFixed(1) + '）'));
      tint($('ce_vh'), rp > 0.05 ? C.amber : C.green);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var rMax = 3;
      // curve CE(r) for fixed lottery
      var pts = [];
      var ceMin = Infinity, ceMax = -Infinity;
      for (var i = 0; i <= 60; i++) {
        var rr = (i / 60) * rMax;
        var eui = p * u(hi, rr) + (1 - p) * u(lo, rr);
        var cei = ceFromEu(eui, rr);
        pts.push({ r: rr, ce: cei });
        if (cei < ceMin) ceMin = cei;
        if (cei > ceMax) ceMax = cei;
      }
      var ymin = Math.min(lo, ceMin) * 0.95;
      var ymax = Math.max(ev, ceMax) * 1.05;
      function sx(rr) { return pl + (rr / rMax) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var gi = 0; gi <= 4; gi++) {
        var vv = ymin + (ymax - ymin) * gi / 4;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(0), pl - 6, y + 4);
      }

      // EV line
      ctx.strokeStyle = C.ink3;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(ev));
      ctx.lineTo(w - pr, sy(ev));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (i = 0; i < pts.length; i++) {
        var x = sx(pts[i].r), yy = sy(pts[i].ce);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(r), sy(ce), 5, 0, Math.PI * 2);
      ctx.fill();

      axisBottom(g, y1);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('0', sx(0), y1 + 13);
      ctx.fillText('1.5', sx(1.5), y1 + 13);
      ctx.fillText('3', sx(3), y1 + 13);
      ctx.fillText('相对风险厌恶 r', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = C.ink2;
      ctx.fillText('CE 曲线（虚线=EV）', pl + bw - 4, pt + 4);
    }
    bind(['ce_r', 'ce_hi', 'ce_lo'], upd);
    upd();
    window.addEventListener('resize', upd);
  })();
})();
