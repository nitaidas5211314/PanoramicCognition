/* ============================================================
   《帕累托最优 / Pareto Optimality》主题脚本
   四个可调模型：
     1. 埃奇沃思配置：是否帕累托 / 是否在核内
     2. PD 中 NE vs 帕累托缺口
     3. 卡尔多–希克斯 vs 帕累托
     4. 加权社会福利在前沿上选点
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

  /* ── 1. Edgeworth: Cobb-Douglas a=b=0.5, totals X=Y=10 ── */
  (function edge() {
    var xEl = $('ed_x'), yEl = $('ed_y'), exEl = $('ed_ex'), eyEl = $('ed_ey');
    if (!xEl || !yEl || !exEl || !eyEl) return;
    var cv = $('edChart');
    var X = 10, Y = 10;

    function uA(x, y) { return Math.sqrt(Math.max(1e-9, x) * Math.max(1e-9, y)); }
    function uB(x, y) { return Math.sqrt(Math.max(1e-9, X - x) * Math.max(1e-9, Y - y)); }
    function mrsA(x, y) { return y / Math.max(1e-9, x); }
    function mrsB(x, y) { return (Y - y) / Math.max(1e-9, X - x); }

    function upd() {
      var x = parseFloat(xEl.value), y = parseFloat(yEl.value);
      var ex = parseFloat(exEl.value), ey = parseFloat(eyEl.value);
      var ua = uA(x, y), ub = uB(x, y);
      var ua0 = uA(ex, ey), ub0 = uB(ex, ey);
      var ma = mrsA(x, y), mb = mrsB(x, y);
      // Equal Cobb-Douglas: interior PO ≈ diagonal y≈x
      var isPO = Math.abs(y - x) < 0.15 || x <= 0.02 || x >= X - 0.02;
      var inCore = isPO && ua + 1e-9 >= ua0 && ub + 1e-9 >= ub0;
      var gapMRS = ma - mb;
      var col = isPO ? (inCore ? C.green : C.amber) : C.red;

      txt($('ed_xO'), x.toFixed(1));
      txt($('ed_yO'), y.toFixed(1));
      txt($('ed_exO'), ex.toFixed(1));
      txt($('ed_eyO'), ey.toFixed(1));
      txt($('ed_ua'), ua.toFixed(2));
      txt($('ed_ub'), ub.toFixed(2));
      txt($('ed_po'), isPO ? '是' : '否');
      txt($('ed_core'), inCore ? '是' : '否');
      tint($('ed_po'), isPO ? C.green : C.red);
      tint($('ed_core'), inCore ? C.green : C.amber);

      var msg;
      if (!isPO) {
        msg = '当前不在合同曲线：MRS_A=' + ma.toFixed(2) + ' ≠ MRS_B=' + mb.toFixed(2) +
          '（差 ' + gapMRS.toFixed(2) + '）→ 存在互利贸易透镜';
      } else if (inCore) {
        msg = '帕累托有效且相对禀赋无人受损：uA=' + ua.toFixed(2) + '≥' + ua0.toFixed(2) +
          '，uB=' + ub.toFixed(2) + '≥' + ub0.toFixed(2) + ' → 落在核（合同曲线段）内';
      } else {
        msg = '帕累托有效，但相对禀赋有人受损：uA ' + ua.toFixed(2) + ' vs 禀赋 ' + ua0.toFixed(2) +
          '；uB ' + ub.toFixed(2) + ' vs ' + ub0.toFixed(2) + ' → 有效但未必自愿可达';
      }
      txt($('ed_vh'), msg);
      tint($('ed_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 40, pr = 16, pt = 20, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      function sx(v) { return pl + (v / X) * bw; }
      function sy(v) { return y1 - (v / Y) * bh; }

      ctx.strokeStyle = C.axis;
      ctx.strokeRect(pl, pt, bw, bh);
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(0));
      ctx.lineTo(sx(X), sy(Y));
      ctx.stroke();
      ctx.lineWidth = 1;
      var xLo = ua0, xHi = X - ub0;
      if (xHi > xLo) {
        ctx.strokeStyle = C.green;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(sx(xLo), sy(xLo));
        ctx.lineTo(sx(xHi), sy(xHi));
        ctx.stroke();
        ctx.lineWidth = 1;
      }
      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(ex), sy(ey), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(sx(x), sy(y), 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('A 的 x₁（商品1）', pl + bw / 2, y1 + 31);
      ctx.save();
      ctx.translate(14, pt + bh / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('A 的 x₂', 0, 0);
      ctx.restore();
      ctx.textAlign = 'left';
      ctx.fillStyle = C.ink2;
      ctx.fillText('蓝=合同曲线 · 绿粗=核 · 琥珀点=禀赋 · 色点=当前配置', pl, pt + 12);
    }
    bind(['ed_x', 'ed_y', 'ed_ex', 'ed_ey'], upd);
    upd();
  })();

  /* ── 2. NE vs Pareto gap in PD ── */
  (function gap() {
    var rEl = $('gp_r'), tEl = $('gp_t'), pEl = $('gp_p'), sEl = $('gp_s');
    if (!rEl || !tEl || !pEl || !sEl) return;
    var cv = $('gpChart');

    function upd() {
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), S = parseFloat(sEl.value);
      var isPD = T > R && R > P && P > S;
      var neSum = 2 * P, poSum = 2 * R, waste = poSum - neSum;
      var eff = poSum > 0 ? (neSum / poSum) * 100 : 0;
      var col = isPD ? C.red : C.amber;

      txt($('gp_rO'), R.toFixed(1));
      txt($('gp_tO'), T.toFixed(1));
      txt($('gp_pO'), P.toFixed(1));
      txt($('gp_sO'), S.toFixed(1));
      txt($('gp_ne'), neSum.toFixed(1));
      txt($('gp_po'), poSum.toFixed(1));
      txt($('gp_eff'), isPD ? (eff.toFixed(0) + '%') : '—');
      tint($('gp_eff'), col);

      var msg = isPD
        ? '严格 PD：唯一 NE 总支付 ' + neSum.toFixed(1) + '，帕累托改进 (C,C) 总支付 ' + poSum.toFixed(1) +
          '，浪费 ' + waste.toFixed(1) + '（效率 ' + eff.toFixed(0) + '%）——NE 与帕累托经常不重合'
        : '不等式未齐，未必是 PD；帕累托–纳什缺口公式仅在 T>R>P>S 时如此解读';
      txt($('gp_vh'), msg);
      tint($('gp_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: 'NE 总支付 2P', v: neSum, c: C.red },
        { lab: '帕累托 (C,C) 2R', v: poSum, c: C.green },
        { lab: '浪费 2(R−P)', v: waste, c: C.amber }
      ];
      var vmax = Math.max(1, poSum, neSum, Math.abs(waste));
      vals.forEach(function (item, i) {
        var y = pt + (i + 0.5) * (bh / 3);
        var bar = (Math.max(0, item.v) / vmax) * (bw - 8);
        ctx.fillStyle = item.c;
        ctx.fillRect(pl, y - 12, bar, 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(1), pl + bar + 8, y + 4, 'left', pl, w);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('社会总支付对比（默认 2 vs 6，效率 33%）', pl + bw / 2, y1 + 31);
    }
    bind(['gp_r', 'gp_t', 'gp_p', 'gp_s'], upd);
    upd();
  })();

  /* ── 3. Kaldor-Hicks vs Pareto ── */
  (function kh() {
    var wEl = $('kh_w'), lEl = $('kh_l'), cEl = $('kh_c');
    if (!wEl || !lEl || !cEl) return;
    var cv = $('khChart');

    function upd() {
      var W = parseFloat(wEl.value), L = parseFloat(lEl.value), Cpay = parseFloat(cEl.value);
      var net = W - L;
      var potential = W >= L;
      var winOK = (W - Cpay) >= -1e-9;
      var loseOK = (-L + Cpay) >= -1e-9;
      var actualPI = winOK && loseOK && Cpay + 1e-9 >= L && Cpay - 1e-9 <= W && (W > 0 || L === 0);
      var col = actualPI ? C.green : (potential ? C.amber : C.red);

      txt($('kh_wO'), W.toFixed(0));
      txt($('kh_lO'), L.toFixed(0));
      txt($('kh_cO'), Cpay.toFixed(0));
      txt($('kh_net'), net.toFixed(0));
      txt($('kh_pot'), potential ? '是' : '否');
      txt($('kh_act'), actualPI ? '是' : '否');
      tint($('kh_pot'), potential ? C.amber : C.red);
      tint($('kh_act'), actualPI ? C.green : C.red);

      var msg;
      if (L <= 0 && W > 0) {
        msg = '无人受损且有人受益 → 本身就是帕累托改进（不必谈补偿）';
        col = C.green;
      } else if (actualPI) {
        msg = '已支付补偿 C=' + Cpay.toFixed(0) + ' ≥ L=' + L.toFixed(0) + ' 且 ≤ W=' + W.toFixed(0) +
          ' → 事后变为帕累托改进；赢家净剩 ' + (W - Cpay).toFixed(0);
      } else if (potential) {
        msg = '卡尔多–希克斯潜在改进：赢家可补偿输家（W≥L，净值 ' + net.toFixed(0) +
          '），但实际 C=' + Cpay.toFixed(0) + ' 不足/未付 → 仍有人受损，非帕累托改进';
      } else {
        msg = '连潜在补偿都不够：W=' + W.toFixed(0) + ' < L=' + L.toFixed(0) + ' → KH 与帕累托皆否决';
      }
      txt($('kh_vh'), msg);
      tint($('kh_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '赢家增益 W', v: W, c: C.green },
        { lab: '输家损失 L', v: L, c: C.red },
        { lab: '实际补偿 C', v: Cpay, c: C.blue },
        { lab: '社会净值 W−L', v: net, c: net >= 0 ? C.amber : C.red }
      ];
      var maxAbs = Math.max(1, Math.abs(W), Math.abs(L), Math.abs(Cpay), Math.abs(net));
      function sx(v) { return pl + bw / 2 + (v / maxAbs) * (bw / 2 - 8); }
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(sx(0), pt);
      ctx.lineTo(sx(0), y1);
      ctx.stroke();
      vals.forEach(function (item, i) {
        var y = pt + (i + 0.5) * (bh / 4);
        var x0 = sx(0), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(Math.min(x0, x1), y - 10, Math.abs(x1 - x0), 20);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 14);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(0), item.v >= 0 ? x1 + 8 : x1 - 8, y + 4,
          item.v >= 0 ? 'left' : 'right', pl, w);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('默认机场例：W=170 L=100 C=0 → KH 是、帕累托否', pl + bw / 2, y1 + 31);
    }
    bind(['kh_w', 'kh_l', 'kh_c'], upd);
    upd();
  })();

  /* ── 4. Weighted SWF on frontier ── */
  (function swf() {
    var lEl = $('sw_lam');
    if (!lEl) return;
    var cv = $('swChart');
    var X = 10;

    function upd() {
      var lam = parseFloat(lEl.value);
      var x = Math.min(X - 0.05, Math.max(0.05, X * lam));
      var uA = Math.log(x), uB = Math.log(X - x);
      var W = lam * uA + (1 - lam) * uB;
      var col = C.blue;

      txt($('sw_lamO'), lam.toFixed(2));
      txt($('sw_x'), x.toFixed(2));
      txt($('sw_ua'), uA.toFixed(3));
      txt($('sw_ub'), uB.toFixed(3));
      txt($('sw_w'), W.toFixed(3));

      var msg = 'λ=' + lam.toFixed(2) + ' → 前沿上取 A 的份额 x₁=x₂=' + x.toFixed(2) +
        '（对数效用合同曲线）。λ↑ 把点推向 A；λ=0.5 为功利主义中点；这只选前沿上的点，不创造帕累托改进。';
      txt($('sw_vh'), msg);
      tint($('sw_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 24, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var pts = [];
      for (var i = 1; i < 100; i++) {
        var t = i / 10;
        pts.push({ ua: Math.log(t), ub: Math.log(X - t), t: t });
      }
      var minU = Math.log(0.1), maxU = Math.log(9.9);
      function px(ua) { return pl + ((ua - minU) / (maxU - minU)) * bw; }
      function py(ub) { return y1 - ((ub - minU) / (maxU - minU)) * bh; }
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(px(p.ua), py(p.ub));
        else ctx.lineTo(px(p.ua), py(p.ub));
      });
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(px(uA), py(uB), 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.green;
      ctx.beginPath();
      ctx.arc(px(Math.log(5)), py(Math.log(5)), 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('横轴 uA=ln x · 纵轴 uB=ln(10−x) · 红=λ 选点 · 绿=λ=0.5', pl + bw / 2, y1 + 31);
    }
    bind(['sw_lam'], upd);
    upd();
  })();
})();
