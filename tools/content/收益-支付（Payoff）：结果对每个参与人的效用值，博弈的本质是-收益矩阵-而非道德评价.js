/* ============================================================
   《收益/支付（Payoff）》主题脚本
   四个可调模型（全部真实参与计算）：
     1. T/R/P/S 游戏类型分类器 + 条形图
     2. 正仿射变换：a,b → 变换后支付与占优是否保持
     3. 混合期望支付：PD 行矩阵 × (p,q)
     4. 利他 α：金钱 PD → 效用矩阵结构
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

  function barChart(cv, labels, values, colors) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 48, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    var vmax = Math.max(0.01, Math.max.apply(null, values.map(Math.abs)));
    var ymin = Math.min(0, Math.min.apply(null, values));
    var ymax = Math.max(0, Math.max.apply(null, values));
    var span = Math.max(0.01, ymax - ymin);
    // pad
    ymax += span * 0.08;
    ymin -= span * 0.08;
    span = ymax - ymin;
    function sy(v) { return y1 - ((v - ymin) / span) * bh; }
    function sx(i) { return pl + (i + 0.5) * (bw / labels.length); }

    ctx.strokeStyle = C.grid;
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    for (var gi = 0; gi <= 4; gi++) {
      var gv = ymin + (span * gi) / 4;
      var gy = sy(gv);
      ctx.beginPath();
      ctx.moveTo(pl, gy);
      ctx.lineTo(w - pr, gy);
      ctx.stroke();
      ctx.fillText(gv.toFixed(1), pl - 6, gy + 4);
    }
    // zero line
    if (ymin < 0 && ymax > 0) {
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, sy(0));
      ctx.lineTo(w - pr, sy(0));
      ctx.stroke();
    }

    var barW = Math.min(56, bw / labels.length * 0.55);
    for (var i = 0; i < labels.length; i++) {
      var x = sx(i);
      var y0 = sy(0);
      var yv = sy(values[i]);
      var top = Math.min(y0, yv);
      var bhBar = Math.abs(y0 - yv);
      ctx.fillStyle = colors[i] || C.blue;
      ctx.fillRect(x - barW / 2, top, barW, Math.max(1, bhBar));
      ctx.fillStyle = C.ink;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      var lab = values[i].toFixed(2);
      var lw = ctx.measureText(lab).width;
      var lx = x;
      var ly = values[i] >= 0 ? top - 6 : top + bhBar + 14;
      ctx.fillText(lab, lx, ly);
      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.fillText(labels[i], x, y1 + 13);
    }
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('支付值', pl + bw / 2, y1 + 31);
  }

  /* ── 1. T/R/P/S 分类器 ── */
  (function cls() {
    var tEl = $('cls_t'), rEl = $('cls_r'), pEl = $('cls_p'), sEl = $('cls_s');
    if (!tEl) return;
    var cv = $('clsChart');

    function classify(T, R, P, S) {
      var ord = [
        { k: 'T', v: T }, { k: 'R', v: R }, { k: 'P', v: P }, { k: 'S', v: S }
      ].sort(function (a, b) { return b.v - a.v || a.k.localeCompare(b.k); });
      var rank = ord.map(function (o) { return o.k; }).join('>');
      var gap = 2 * R - (T + S);
      var type = '其他 / 未命名结构';
      var tip = '未落入经典命名区；请看排序与 2R−(T+S)';
      var color = C.ink2;

      if (T > R && R > P && P > S) {
        type = '囚徒困境 PD';
        tip = 'T>R>P>S' + (gap > 0 ? ' 且 2R>T+S' : '（但 2R≤T+S，重复/利他更敏感）') + ' → 背叛严格占优，互合帕累托优于互叛';
        color = C.red;
      } else if (T > R && R > S && S > P) {
        type = '懦夫博弈 Chicken';
        tip = 'T>R>S>P → 冲突(双「直」)最差；两纯纳什为「一勇一躲」';
        color = C.amber;
      } else if (R > T && T > P && P > S) {
        type = '猎鹿 / 保证博弈 Stag Hunt';
        tip = 'R>T>P>S → 互合是风险主导的帕累托优均衡；也存在互叛均衡';
        color = C.green;
      } else if (R > T && T > S && S > P) {
        type = '和谐 / 无冲突';
        tip = '合作相关支付整体靠前 → 合作易成占优或帕累托显然';
        color = C.green;
      } else if (T > P && P > R && R > S) {
        type = '死锁 Deadlock';
        tip = 'T>P>R>S → 背叛仍诱人且互合并不帕累托优';
        color = C.red;
      }

      return { type: type, tip: tip, color: color, rank: rank, gap: gap };
    }

    function upd() {
      var T = parseFloat(tEl.value), R = parseFloat(rEl.value);
      var P = parseFloat(pEl.value), S = parseFloat(sEl.value);
      txt($('cls_tO'), T.toFixed(1));
      txt($('cls_rO'), R.toFixed(1));
      txt($('cls_pO'), P.toFixed(1));
      txt($('cls_sO'), S.toFixed(1));
      var c = classify(T, R, P, S);
      txt($('cls_type'), c.type);
      txt($('cls_gap'), c.gap.toFixed(1));
      txt($('cls_ord'), c.rank.split('').join('').replace(/>/g, '>') === c.rank ? c.rank : c.rank);
      // rank already like T>R>P>S
      txt($('cls_ord'), c.rank);
      txt($('cls_vh'), c.tip);
      tint($('cls_vh'), c.color);
      tint($('cls_type'), c.color);
      barChart(cv, ['T', 'R', 'P', 'S'], [T, R, P, S], [C.red, C.green, C.amber, C.blue]);
    }
    bind(['cls_t', 'cls_r', 'cls_p', 'cls_s'], upd);
    upd();
  })();

  /* ── 2. 正仿射变换 ── */
  (function aff() {
    var aEl = $('aff_a'), bEl = $('aff_b');
    if (!aEl) return;
    var cv = $('affChart');
    var src = [5, 3, 1, 0]; // T,R,P,S

    function upd() {
      var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
      txt($('aff_aO'), a.toFixed(2));
      txt($('aff_bO'), b.toFixed(1));
      var dst = src.map(function (x) { return a * x + b; });
      txt($('aff_src'), src.join(', '));
      txt($('aff_dst'), dst.map(function (x) { return x.toFixed(1); }).join(', '));

      // Dominates: D≻C iff T>R and P>S (for row vs col C and D)
      var domSrc = src[0] > src[1] && src[2] > src[3];
      var domDst = dst[0] > dst[1] && dst[2] > dst[3];
      var same = (domSrc === domDst) && (Math.sign(src[0] - src[1]) === Math.sign(dst[0] - dst[1])) &&
        (Math.sign(src[2] - src[3]) === Math.sign(dst[2] - dst[3]));
      var msgDom = same
        ? (domDst ? '不变：仍 D≻C' : '不变：仍非 D≻C')
        : '异常：符号应保持（检查 a>0）';
      txt($('aff_dom'), msgDom);
      tint($('aff_dom'), same ? C.green : C.red);

      var tip = a > 0
        ? ('正仿射变换保持支付差的符号与期望排序 → 最优反应集不变（a=' + a.toFixed(2) + ', b=' + b.toFixed(1) + '）')
        : 'a≤0 会破坏或反转偏好，不是合法的 vNM 再参数化';
      txt($('aff_vh'), tip);
      tint($('aff_vh'), a > 0 ? C.green : C.red);

      barChart(cv, ['T\'', 'R\'', 'P\'', 'S\''], dst, [C.red, C.green, C.amber, C.blue]);
    }
    bind(['aff_a', 'aff_b'], upd);
    upd();
  })();

  /* ── 3. 混合期望支付 ── */
  (function eu() {
    var pEl = $('eu_p'), qEl = $('eu_q');
    if (!pEl) return;
    var cv = $('euChart');
    // Row payoffs: Up-Left=3, Up-Right=0, Down-Left=5, Down-Right=1
    var A11 = 3, A12 = 0, A21 = 5, A22 = 1;

    function upd() {
      var p = parseFloat(pEl.value), q = parseFloat(qEl.value);
      txt($('eu_pO'), p.toFixed(2));
      txt($('eu_qO'), q.toFixed(2));
      var euUp = q * A11 + (1 - q) * A12;
      var euDn = q * A21 + (1 - q) * A22;
      var euMix = p * euUp + (1 - p) * euDn;
      txt($('eu_up'), euUp.toFixed(2));
      txt($('eu_dn'), euDn.toFixed(2));
      txt($('eu_mix'), euMix.toFixed(2));
      var gap = euDn - euUp; // = 1 + q  for this matrix?  (5q+1-q) - 3q = 1+ q +4q wait
      // euDn - euUp = (5q+1-q) - 3q = (4q+1) - 3q = q+1
      var br = gap > 1e-9 ? '下/背叛' : (gap < -1e-9 ? '上/合作' : '无差异');
      var tip = 'EU(下)−EU(上)=' + gap.toFixed(2) +
        (gap > 0 ? ' >0 → 最优纯策略=下/背叛（PD 中背叛占优）' :
          gap < 0 ? ' <0 → 最优=上/合作' : ' =0 → 无差异');
      txt($('eu_vh'), tip);
      tint($('eu_vh'), gap > 0 ? C.red : (gap < 0 ? C.green : C.amber));

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymax = 6, ymin = 0;
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; } // t = q in [0,1]

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var gi = 0; gi <= 6; gi++) {
        var gy = sy(gi);
        ctx.beginPath();
        ctx.moveTo(pl, gy);
        ctx.lineTo(w - pr, gy);
        ctx.stroke();
        ctx.fillText(String(gi), pl - 6, gy + 4);
      }

      // curves EU(up), EU(dn) vs q
      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      for (var i = 0; i <= 50; i++) {
        var qq = i / 50;
        var y = qq * A11 + (1 - qq) * A12;
        var X = sx(qq), Y = sy(y);
        if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.stroke();
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (i = 0; i <= 50; i++) {
        qq = i / 50;
        y = qq * A21 + (1 - qq) * A22;
        X = sx(qq); Y = sy(y);
        if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
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

      // mix point
      ctx.fillStyle = C.ink;
      ctx.beginPath();
      ctx.arc(sx(q), sy(euMix), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      for (var ti = 0; ti <= 4; ti++) {
        var tv = ti / 4;
        ctx.fillText(tv.toFixed(2), sx(tv), y1 + 13);
      }
      ctx.fillStyle = C.ink3;
      ctx.fillText('对方合作概率 q', pl + bw / 2, y1 + 31);

      // legend
      ctx.textAlign = 'left';
      ctx.fillStyle = C.blue;
      ctx.fillText('EU(上/合作)', pl + 8, pt + 4);
      ctx.fillStyle = C.red;
      ctx.fillText('EU(下/背叛)', pl + 8, pt + 20);
    }
    bind(['eu_p', 'eu_q'], upd);
    upd();
  })();

  /* ── 4. 利他 α ── */
  (function al() {
    var aEl = $('al_a');
    if (!aEl) return;
    var cv = $('alChart');

    function upd() {
      var a = parseFloat(aEl.value);
      txt($('al_aO'), a.toFixed(2));
      // money: CC=3,3 CD=0,5 DC=5,0 DD=1,1
      var uCC = 3 + 3 * a;
      var uCD = 0 + 5 * a;
      var uDC = 5 + 0 * a;
      var uDD = 1 + 1 * a;
      txt($('al_cc'), uCC.toFixed(2));
      txt($('al_cd'), uCD.toFixed(2));
      txt($('al_dc'), uDC.toFixed(2));
      txt($('al_dd'), uDD.toFixed(2));

      var domVsC = uDC >= uCC - 1e-12; // prefer D when other C
      var domVsD = uDD >= uCD - 1e-12; // prefer D when other D
      var coopDom = (uCC >= uDC - 1e-12) && (uCD >= uDD - 1e-12);

      var tip, color;
      if (coopDom) {
        tip = 'α=' + a.toFixed(2) + '：合作占优（α≥2/3 区域）——金钱 PD 在效用层消失';
        color = C.green;
      } else if (domVsC && domVsD) {
        tip = 'α=' + a.toFixed(2) + '：仍为效用 PD，背叛严格占优 · 临界：α>0.25 时对「对方背叛」不再偏好互叛；α≥2/3 时合作占优';
        color = C.red;
      } else if (domVsC && !domVsD) {
        tip = 'α=' + a.toFixed(2) + '：对「对方合作」仍想背叛，但对「对方背叛」不再偏好互叛（α>0.25）——结构已离开标准 PD';
        color = C.amber;
      } else {
        tip = 'α=' + a.toFixed(2) + '：混合动机区——需看具体最优反应对应';
        color = C.amber;
      }
      txt($('al_vh'), tip);
      tint($('al_vh'), color);

      barChart(cv, ['u(CC)', 'u(CD)', 'u(DC)', 'u(DD)'], [uCC, uCD, uDC, uDD],
        [C.green, C.blue, C.red, C.amber]);
    }
    bind(['al_a'], upd);
    upd();
  })();
})();
