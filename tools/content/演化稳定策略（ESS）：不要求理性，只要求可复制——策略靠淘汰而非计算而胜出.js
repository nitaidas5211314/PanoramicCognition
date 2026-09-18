/* ============================================================
   《演化稳定策略 ESS》主题脚本
   四个可调模型：
     1. 2×2 ESS 分类器
     2. 鹰鸽 ESS / 帕累托隙 / 入侵差
     3. 复制者轨迹
     4. 弱 NE vs ESS 二阶解剖
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
  function r2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function r1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function yn(b) { return b ? '是' : '否'; }
  function clampLabel(ctx, lab, x, y, align, pl, w) {
    var lw = ctx.measureText(lab).width;
    ctx.textAlign = align;
    var lx = align === 'left' ? Math.min(x, w - lw - 6) : Math.max(x, pl + 6);
    ctx.fillText(lab, lx, y);
  }

  function classify(a, b, c, d) {
    var pure1 = (a > c) || (a === c && b > d);
    var pure2 = (d > b) || (d === b && c > a);
    var den = (a - c) + (d - b);
    var xStar = Math.abs(den) < 1e-12 ? NaN : (d - b) / den;
    var stable = (a + d) < (b + c);
    var interior = isFinite(xStar) && xStar > 0 && xStar < 1 && stable;
    return { pure1: pure1, pure2: pure2, xStar: xStar, stable: stable, interior: interior };
  }

  /* ── 1. 2×2 classifier ── */
  (function cl() {
    var aEl = $('cl_a'), bEl = $('cl_b'), cEl = $('cl_c'), dEl = $('cl_d');
    if (!aEl || !bEl || !cEl || !dEl) return;
    var cv = $('clChart');

    function upd() {
      var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
      var c = parseFloat(cEl.value), d = parseFloat(dEl.value);
      var r = classify(a, b, c, d);
      txt($('cl_aO'), String(a));
      txt($('cl_bO'), String(b));
      txt($('cl_cO'), String(c));
      txt($('cl_dO'), String(d));
      txt($('cl_p1'), yn(r.pure1));
      txt($('cl_p2'), yn(r.pure2));
      tint($('cl_p1'), r.pure1 ? C.green : C.ink3);
      tint($('cl_p2'), r.pure2 ? C.green : C.ink3);
      var xOk = isFinite(r.xStar) && r.xStar > 0 && r.xStar < 1;
      txt($('cl_x'), xOk ? r2(r.xStar) : (isFinite(r.xStar) ? r2(r.xStar) + '·界外' : '—'));
      txt($('cl_st'), yn(r.stable));
      tint($('cl_st'), r.stable ? C.green : C.amber);

      var msg, col = C.blue;
      if (r.interior) {
        msg = '混合 ESS 在 x*=' + r2(r.xStar) + '（策略1频率）；a+d=' + r1(a + d) + ' < b+c=' + r1(b + c);
        col = C.green;
      } else if (r.pure1 && r.pure2) {
        msg = '双纯 ESS（协调型）：内部点不稳定，历史/初值选均衡';
        col = C.amber;
      } else if (r.pure1) {
        msg = '纯策略1 是 ESS' + (r.pure2 ? '' : '；策略2 不可入侵阻挡失败');
        col = C.green;
      } else if (r.pure2) {
        msg = '纯策略2 是 ESS';
        col = C.green;
      } else {
        msg = '无纯 ESS' + (xOk ? '，且内部不稳定——检查是否循环/其他结构' : '，内部点不在 (0,1)');
        col = C.red;
      }
      txt($('cl_vh'), msg);
      tint($('cl_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr;
      var items = [
        { lab: '纯1', v: r.pure1 ? 1 : 0, c: C.green },
        { lab: '纯2', v: r.pure2 ? 1 : 0, c: C.blue },
        { lab: '混ESS', v: r.interior ? 1 : 0, c: C.amber },
        { lab: '内稳', v: r.stable ? 1 : 0, c: C.ink2 }
      ];
      var barH = 28, gap = 14, startY = pt + 20;
      items.forEach(function (it, i) {
        var y = startY + i * (barH + gap);
        var len = it.v * bw * 0.85;
        ctx.fillStyle = C.grid;
        ctx.fillRect(pl, y, bw * 0.85, barH);
        ctx.fillStyle = it.c;
        ctx.fillRect(pl, y, Math.max(it.v ? 8 : 0, len), barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab + (it.v ? ' ✓' : ' ·'), pl, y - 4);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ESS 分类指示（1=成立）', pl + bw / 2, y1 + 31);
    }
    bind(['cl_a', 'cl_b', 'cl_c', 'cl_d'], upd);
    upd();
  })();

  /* ── 2. Hawk–Dove ── */
  (function hd() {
    var vEl = $('hd_v'), cEl = $('hd_c'), eEl = $('hd_e');
    if (!vEl || !cEl || !eEl) return;
    var cv = $('hdChart');

    function fitQ(q, pop, V, C) {
      // expected payoff of playing Hawk with prob q against pop Hawk-freq
      var fH = pop * (V - C) / 2 + (1 - pop) * V;
      var fD = (1 - pop) * V / 2;
      return q * fH + (1 - q) * fD;
    }

    function upd() {
      var V = parseFloat(vEl.value), Ccost = parseFloat(cEl.value), eps = parseFloat(eEl.value);
      txt($('hd_vO'), String(V));
      txt($('hd_cO'), String(Ccost));
      txt($('hd_eO'), r2(eps));

      var pureHawk = V >= Ccost;
      var pStar = pureHawk ? 1 : V / Ccost;
      var meanESS, dovePay = V / 2, gap, msg, col;
      if (pureHawk) {
        meanESS = (V - Ccost) / 2;
        gap = dovePay - meanESS;
        msg = 'V≥C → 纯鹰 ESS；全鹰支付 ' + r1(meanESS) + '；鸽无法入侵';
        col = C.red;
      } else {
        meanESS = V * (Ccost - V) / (2 * Ccost);
        gap = dovePay - meanESS;
        var popH = (1 - eps) * pStar + eps * 1;
        var popD = (1 - eps) * pStar + eps * 0;
        var dH = fitQ(1, popH, V, Ccost) - fitQ(pStar, popH, V, Ccost);
        var dD = fitQ(0, popD, V, Ccost) - fitQ(pStar, popD, V, Ccost);
        msg = '混合 ESS；ε=' + r2(eps) + ' 时纯鹰入侵差 ' + r2(dH) + '，纯鸽入侵差 ' + r2(dD);
        col = (dH < 0 && dD < 0) ? C.green : C.amber;
      }

      txt($('hd_p'), r2(pStar));
      txt($('hd_m'), r1(meanESS));
      txt($('hd_d'), r1(dovePay));
      txt($('hd_g'), r1(gap));
      tint($('hd_g'), gap > 0.05 ? C.red : C.ink);
      txt($('hd_vh'), msg);
      tint($('hd_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 52, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr;
      var items = [
        { lab: 'ESS 支付', v: meanESS, c: C.amber },
        { lab: '全鸽支付', v: dovePay, c: C.green },
        { lab: '帕累托隙', v: Math.max(0, gap), c: C.red }
      ];
      var maxV = Math.max(0.01, dovePay, Math.abs(meanESS), gap);
      var minV = Math.min(0, meanESS);
      var span = Math.max(0.01, maxV - minV);
      var barH = 32, gapY = 18, startY = pt + 24;
      items.forEach(function (it, i) {
        var y = startY + i * (barH + gapY);
        var zeroX = pl + ((0 - minV) / span) * bw;
        var x2 = pl + ((it.v - minV) / span) * bw;
        var left = Math.min(zeroX, x2), width = Math.max(2, Math.abs(x2 - zeroX));
        ctx.fillStyle = it.c;
        ctx.fillRect(left, y, width, barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab, pl, y - 4);
        var lab = r1(it.v);
        ctx.fillStyle = C.ink2;
        clampLabel(ctx, lab, x2 + 8, y + barH / 2 + 4, 'left', pl, w);
      });
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl + ((0 - minV) / span) * bw, pt);
      ctx.lineTo(pl + ((0 - minV) / span) * bw, y1);
      ctx.stroke();
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('支付对照（涨红跌绿语义：隙越大越痛苦）', pl + bw / 2, y1 + 31);
    }
    bind(['hd_v', 'hd_c', 'hd_e'], upd);
    upd();
  })();

  /* ── 3. Replicator trajectory ── */
  (function rp() {
    var p0El = $('rp_p0'), vEl = $('rp_v'), cEl = $('rp_c');
    if (!p0El || !vEl || !cEl) return;
    var cv = $('rpChart');

    function traj(p0, V, Ccost, steps, dt) {
      var out = [p0], p = p0, i;
      for (i = 0; i < steps; i++) {
        var dp;
        if (V >= Ccost) {
          // pure hawk ESS: dp/dt = p(1-p)(V - C*p)/2 still, but equilibrium at 1
          dp = p * (1 - p) * (V - Ccost * p) / 2;
        } else {
          dp = p * (1 - p) * (V - Ccost * p) / 2;
        }
        p = Math.max(1e-6, Math.min(1 - 1e-6, p + dt * dp));
        out.push(p);
      }
      return out;
    }

    function upd() {
      var p0 = parseFloat(p0El.value), V = parseFloat(vEl.value), Ccost = parseFloat(cEl.value);
      txt($('rp_p0O'), r2(p0));
      txt($('rp_vO'), String(V));
      txt($('rp_cO'), String(Ccost));
      var pureHawk = V >= Ccost;
      var pStar = pureHawk ? 1 : V / Ccost;
      var series = traj(p0, V, Ccost, 60, 0.08);
      var pT = series[series.length - 1];
      var err = Math.abs(pT - pStar);
      var ty = pureHawk ? '趋纯鹰' : '混合回拉';
      txt($('rp_ps'), r2(pStar));
      txt($('rp_pt'), r2(pT));
      txt($('rp_err'), r2(err));
      txt($('rp_ty'), ty);
      tint($('rp_ty'), pureHawk ? C.red : C.green);
      var msg = pureHawk
        ? 'V≥C：从 ' + r2(p0) + ' 推向纯鹰 ESS'
        : '从 ' + r2(p0) + ' 被拉回混合 ESS ' + r2(pStar);
      txt($('rp_vh'), msg);
      tint($('rp_vh'), C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 14, pt = 16, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var T = series.length - 1;
      function sx(t) { return pl + (t / T) * bw; }
      function sy(p) { return y1 - p * bh; }
      // grid
      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      var gi;
      for (gi = 0; gi <= 4; gi++) {
        var gy = y1 - (gi / 4) * bh;
        ctx.beginPath();
        ctx.moveTo(pl, gy);
        ctx.lineTo(pl + bw, gy);
        ctx.stroke();
        ctx.fillStyle = C.ink3;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(r2(gi / 4), pl - 6, gy + 3);
      }
      // p* line
      ctx.strokeStyle = C.amber;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(pStar));
      ctx.lineTo(pl + bw, sy(pStar));
      ctx.stroke();
      ctx.setLineDash([]);
      // trajectory
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      series.forEach(function (p, t) {
        var x = sx(t), y = sy(p);
        if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.fillStyle = C.green;
      ctx.beginPath();
      ctx.arc(sx(0), sy(p0), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(T), sy(pT), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('p*= ' + r2(pStar), pl + bw - 4, sy(pStar) - 6);
      ctx.textAlign = 'center';
      ctx.fillText('时间步 →', pl + bw / 2, y1 + 31);
      ctx.fillText('鹰频率 p', pl + bw / 2, pt - 2);
    }
    bind(['rp_p0', 'rp_v', 'rp_c'], upd);
    upd();
  })();

  /* ── 4. Weak NE vs ESS ── */
  (function wk() {
    var eqEl = $('wk_eq'), ijEl = $('wk_ij'), jjEl = $('wk_jj');
    if (!eqEl || !ijEl || !jjEl) return;
    var cv = $('wkChart');

    function upd() {
      var eq = parseFloat(eqEl.value); // E(I,I)=E(J,I)
      var ij = parseFloat(ijEl.value);
      var jj = parseFloat(jjEl.value);
      txt($('wk_eqO'), r1(eq));
      txt($('wk_ijO'), r1(ij));
      txt($('wk_jjO'), r1(jj));
      // First order: E(I,I) >= E(J,I). Here they are set equal by construction → NE passes (weak)
      var nePass = true;
      var df = ij - jj;
      var essPass = df > 0; // need E(I,J) > E(J,J)
      // If we allowed E(I,I) > E(J,I) it would be strict; here equality → need second order
      txt($('wk_ne'), '过（弱）');
      tint($('wk_ne'), C.amber);
      txt($('wk_ess'), essPass ? '过' : '不过');
      tint($('wk_ess'), essPass ? C.green : C.red);
      txt($('wk_df'), r1(df));
      tint($('wk_df'), df > 0 ? C.green : C.red);
      var lab = essPass ? '弱一阶 + 二阶成立 → ESS' : '弱 NE · 非 ESS';
      txt($('wk_lab'), lab);
      tint($('wk_lab'), essPass ? C.green : C.red);
      var msg = 'E(I,J)−E(J,J)=' + r1(df) + (df > 0 ? ' > 0 → 抗漂移' : ' < 0 → 漂移后 J 占优');
      if (Math.abs(df) < 1e-9) msg = '二阶差额≈0 → 仍非严格 ESS（中性）';
      txt($('wk_vh'), msg);
      tint($('wk_vh'), essPass ? C.green : C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 52, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr;
      var items = [
        { lab: 'E(I,·)平手值', v: eq, c: C.blue },
        { lab: 'E(I,J)', v: ij, c: C.amber },
        { lab: 'E(J,J)', v: jj, c: C.red },
        { lab: '二阶差额', v: df, c: df > 0 ? C.green : C.red }
      ];
      var maxV = Math.max(0.01, eq, ij, jj, Math.abs(df));
      var minV = Math.min(0, df, ij, jj, eq);
      var span = Math.max(0.01, maxV - minV);
      var barH = 28, gapY = 14, startY = pt + 20;
      items.forEach(function (it, i) {
        var y = startY + i * (barH + gapY);
        var zeroX = pl + ((0 - minV) / span) * bw;
        var x2 = pl + ((it.v - minV) / span) * bw;
        var left = Math.min(zeroX, x2), width = Math.max(2, Math.abs(x2 - zeroX));
        ctx.fillStyle = C.grid;
        ctx.fillRect(pl, y, bw, barH);
        ctx.fillStyle = it.c;
        ctx.fillRect(left, y, width, barH);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.lab, pl, y - 4);
        clampLabel(ctx, r1(it.v), x2 + 6, y + barH / 2 + 4, 'left', pl, w);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('一阶已平手时，二阶差额决定能否叫 ESS', pl + bw / 2, y1 + 31);
    }
    bind(['wk_eq', 'wk_ij', 'wk_jj'], upd);
    upd();
  })();
})();
