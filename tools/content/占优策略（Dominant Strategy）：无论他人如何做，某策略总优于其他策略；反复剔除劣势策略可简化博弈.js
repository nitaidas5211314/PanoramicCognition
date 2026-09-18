/* ============================================================
   《占优策略 / IESDS》主题脚本
   四个可调模型：
     1. 囚徒困境：严格占优判定
     2. IESDS 三轮收缩
     3. 弱占优删除顺序
     4. 二价拍卖 DSIC
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

  /* ── 1. Prisoner's Dilemma dominance ── */
  (function pd() {
    var rEl = $('pd_r'), tEl = $('pd_t'), pEl = $('pd_p'), sEl = $('pd_s');
    if (!rEl || !tEl || !pEl || !sEl) return;
    var cv = $('pdChart');

    function upd() {
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), S = parseFloat(sEl.value);
      var dVsC = T > R, dVsD = P > S;
      var strict = dVsC && dVsD;
      var weak = (T >= R && P >= S) && (T > R || P > S) && !strict;
      var dom, col, eq;
      if (strict) { dom = '是（严格）'; col = C.red; eq = '(D,D)'; }
      else if (weak) { dom = '弱占优'; col = C.amber; eq = '(D,D)弱'; }
      else if (R > T && S > P) { dom = '否；C占优'; col = C.green; eq = '(C,C)'; }
      else { dom = '否（无占优）'; col = C.blue; eq = '需划线/混合'; }

      var gap = R - P;
      txt($('pd_rO'), R.toFixed(1));
      txt($('pd_tO'), T.toFixed(1));
      txt($('pd_pO'), P.toFixed(1));
      txt($('pd_sO'), S.toFixed(1));
      txt($('pd_dom'), dom);
      txt($('pd_eq'), eq);
      txt($('pd_gap'), gap.toFixed(1));
      tint($('pd_dom'), col);

      var msg;
      if (strict) {
        msg = 'T>R 且 P>S → 坦白严格占优；唯一占优均衡=(D,D)，相对合作差距 ' + gap.toFixed(1);
      } else if (weak) {
        msg = '弱占优成立但非严格——剔除时勿与严格 IESDS 混用';
      } else if (R > T && S > P) {
        msg = '合作反而占优：支付已离开经典 PD 区域';
      } else {
        msg = '对合作者 Δ=' + (T - R).toFixed(1) + '，对背叛者 Δ=' + (P - S).toFixed(1) + ' → 无（严格）占优，需用最优反应/NE';
      }
      txt($('pd_vh'), msg);
      tint($('pd_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '对C: T−R', v: T - R, c: T > R ? C.red : C.green },
        { lab: '对D: P−S', v: P - S, c: P > S ? C.red : C.green },
        { lab: 'R−P 差距', v: gap, c: C.amber }
      ];
      var maxAbs = Math.max(1, Math.abs(vals[0].v), Math.abs(vals[1].v), Math.abs(vals[2].v));
      function sx(v) { return pl + bw / 2 + (v / maxAbs) * (bw / 2 - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(sx(0), pt);
      ctx.lineTo(sx(0), y1);
      ctx.stroke();

      vals.forEach(function (item, i) {
        var y = sy(i), x0 = sx(0), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(Math.min(x0, x1), y - 12, Math.abs(x1 - x0), 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        var lab = item.v.toFixed(1);
        ctx.font = '12px sans-serif';
        var lw = ctx.measureText(lab).width;
        ctx.textAlign = item.v >= 0 ? 'left' : 'right';
        var lx = item.v >= 0 ? Math.min(x1 + 8, w - lw - 6) : Math.max(x1 - 8, pl + 6);
        ctx.fillStyle = C.ink;
        ctx.fillText(lab, lx, y + 4);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Δ>0 表示「坦白更好」的一边', pl + bw / 2, y1 + 31);
    }
    bind(['pd_r', 'pd_t', 'pd_p', 'pd_s'], upd);
    upd();
  })();

  /* ── 2. IESDS stepper ── */
  (function ie() {
    var kEl = $('ie_k');
    if (!kEl) return;
    var cv = $('ieChart');
    var rows = ['U', 'M', 'D'], cols = ['L', 'M', 'R'];
    // [rowPay, colPay]
    var G = [
      [[1, 0], [1, 2], [0, 1]],
      [[0, 3], [0, 1], [2, 0]],
      [[0, 1], [0, 0], [1, -1]]
    ];
    var stages = [
      { r: [0, 1, 2], c: [0, 1, 2], drop: '（尚未开始）', msg: '完整矩阵 3×3。拖动滑块观察严格 IESDS 如何逐轮收缩到 (U,M)。' },
      { r: [0, 1, 2], c: [0, 1], drop: '列 R（被列 M 严格占优）', msg: '第1轮：列支付 M=(2,1,0) ≻ R=(1,0,−1) 处处严格 → 删 R。' },
      { r: [0], c: [0, 1], drop: '行 M、D（被行 U 严格占优）', msg: '第2轮：缩后 U=(1,1) ≻ M=(0,0) 且 ≻ D=(0,0) → 删 M、D。' },
      { r: [0], c: [1], drop: '列 L（被列 M 严格占优）', msg: '第3轮：仅剩行 U 时列 M 得 2 > 列 L 得 0 → 删 L。幸存 (U,M)=(1,2)。' }
    ];

    function upd() {
      var k = parseInt(kEl.value, 10);
      var st = stages[k];
      txt($('ie_kO'), String(k));
      txt($('ie_rows'), st.r.map(function (i) { return rows[i]; }).join(', '));
      txt($('ie_cols'), st.c.map(function (i) { return cols[i]; }).join(', '));
      txt($('ie_drop'), st.drop);
      txt($('ie_vh'), st.msg);
      tint($('ie_vh'), k === 3 ? C.green : C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 56, pr = 16, pt = 24, y1 = h - 46;
      var aliveR = {}; st.r.forEach(function (i) { aliveR[i] = 1; });
      var aliveC = {}; st.c.forEach(function (i) { aliveC[i] = 1; });
      var cellW = (w - pl - pr) / 3, cellH = (y1 - pt) / 3;

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          var x = pl + j * cellW, y = pt + i * cellH;
          var on = aliveR[i] && aliveC[j];
          ctx.fillStyle = on ? '#e8f8ef' : '#f1f3f5';
          ctx.strokeStyle = on ? C.green : C.axis;
          ctx.lineWidth = on ? 2 : 1;
          ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);
          ctx.strokeRect(x + 2, y + 2, cellW - 4, cellH - 4);
          ctx.fillStyle = on ? C.ink : C.ink3;
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(G[i][j][0] + ',' + G[i][j][1], x + cellW / 2, y + cellH / 2 + 4);
        }
      }
      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (i = 0; i < 3; i++) ctx.fillText(rows[i], pl - 8, pt + (i + 0.5) * cellH + 4);
      ctx.textAlign = 'center';
      for (j = 0; j < 3; j++) ctx.fillText(cols[j], pl + (j + 0.5) * cellW, y1 + 14);
      ctx.fillStyle = C.ink3;
      ctx.fillText('绿色=仍幸存的格子', pl + (w - pl - pr) / 2, y1 + 31);
    }
    bind(['ie_k'], upd);
    upd();
  })();

  /* ── 3. Weak dominance order ── */
  (function wk() {
    var mEl = $('wk_mode');
    if (!mEl) return;
    var cv = $('wkChart');

    function upd() {
      var mode = parseInt(mEl.value, 10);
      txt($('wk_modeO'), mode === 0 ? '先删行B' : '先删列R叙事');
      var steps, surv, warn, msg, col;
      if (mode === 0) {
        steps = 'B弱劣 → 删B；后 L弱≻R → 删R';
        surv = '(T, L)';
        warn = '弱剔除';
        msg = '模式0：先删行B再删列R → (T,L)。支付上 T 对 L 严格更好、对 R 无差别——典型弱占优。';
        col = C.amber;
      } else {
        steps = '先谈列：R 对行无严格贡献 → 叙事删R；再删B';
        surv = '(T, L)（同点异路）';
        warn = '顺序敏感';
        msg = '模式1：改叙述顺序仍可能落到同一点，但一般矩阵上弱剔除可改写幸存集并删掉部分 NE——实践默认只用严格。';
        col = C.red;
      }
      txt($('wk_steps'), steps);
      txt($('wk_surv'), surv);
      txt($('wk_warn'), warn);
      txt($('wk_vh'), msg);
      tint($('wk_warn'), col);
      tint($('wk_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 70, pr = 20, pt = 30, y1 = h - 46;
      var cells = [
        [{ p: '1,1', on: true }, { p: '0,0', on: mode === 0 }],
        [{ p: '0,0', on: false }, { p: '0,0', on: false }]
      ];
      // mode0 after: only TL; during illustration show TL alive always, TR maybe, bottom dead
      if (mode === 1) {
        cells = [
          [{ p: '1,1', on: true }, { p: '0,0', on: false }],
          [{ p: '0,0', on: false }, { p: '0,0', on: false }]
        ];
      }
      var cw = (w - pl - pr) / 2, ch = (y1 - pt) / 2;
      var labelsR = ['T', 'B'], labelsC = ['L', 'R'];
      for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
          var x = pl + j * cw, y = pt + i * ch;
          var on = cells[i][j].on;
          ctx.fillStyle = on ? '#eaf0ff' : '#f1f3f5';
          ctx.strokeStyle = on ? C.blue : C.axis;
          ctx.lineWidth = on ? 2 : 1;
          ctx.fillRect(x + 4, y + 4, cw - 8, ch - 8);
          ctx.strokeRect(x + 4, y + 4, cw - 8, ch - 8);
          ctx.fillStyle = on ? C.ink : C.ink3;
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(cells[i][j].p, x + cw / 2, y + ch / 2 + 5);
        }
      }
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      for (i = 0; i < 2; i++) ctx.fillText(labelsR[i], pl - 10, pt + (i + 0.5) * ch + 4);
      ctx.textAlign = 'center';
      for (j = 0; j < 2; j++) ctx.fillText(labelsC[j], pl + (j + 0.5) * cw, y1 + 14);
      ctx.fillStyle = C.ink3;
      ctx.fillText('蓝色=弱剔除后强调的幸存格', pl + (w - pl - pr) / 2, y1 + 31);
    }
    bind(['wk_mode'], upd);
    upd();
  })();

  /* ── 4. Vickrey second-price ── */
  (function vc() {
    var vEl = $('vc_v'), bEl = $('vc_b'), mEl = $('vc_m');
    if (!vEl || !bEl || !mEl) return;
    var cv = $('vcChart');

    function util(v, b, m) {
      if (b > m) return v - m;
      return 0;
    }

    function upd() {
      var v = parseFloat(vEl.value), b = parseFloat(bEl.value), m = parseFloat(mEl.value);
      var u = util(v, b, m);
      var ut = util(v, v, m);
      var win = b > m;
      txt($('vc_vO'), String(Math.round(v)));
      txt($('vc_bO'), String(Math.round(b)));
      txt($('vc_mO'), String(Math.round(m)));
      txt($('vc_win'), win ? '是' : '否');
      txt($('vc_u'), u.toFixed(0));
      txt($('vc_truth'), ut.toFixed(0));
      tint($('vc_u'), u > 0 ? C.red : (u < 0 ? C.green : C.ink2));

      var msg;
      var col = C.blue;
      if (Math.abs(b - v) < 1e-9) {
        msg = 'b=v=' + Math.round(v) + '，m=' + Math.round(m) + ' → ' + (win ? ('成交，付 ' + Math.round(m) + '，效用 ' + u.toFixed(0)) : '未成交，效用 0') + '；偏离报价无法在所有 m 下改进';
        col = C.green;
      } else if (b < v && m > b && m < v) {
        msg = '压价导致未成交：相对报真值损失潜在效用 ' + (v - m).toFixed(0);
        col = C.red;
      } else if (b > v && m > v && m < b) {
        msg = '抬价买到价高于估值：效用 ' + u.toFixed(0) + '（报真值本可避开）';
        col = C.red;
      } else {
        msg = '当前效用 ' + u.toFixed(0) + '，报真值效用 ' + ut.toFixed(0) + '；二价下报真值弱占优';
        col = u >= ut ? C.green : C.amber;
      }
      txt($('vc_vh'), msg);
      tint($('vc_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var mMax = 200;
      function sx(mm) { return pl + (mm / mMax) * bw; }
      function sy(uu) {
        var ymin = -40, ymax = 120;
        return y1 - ((uu - ymin) / (ymax - ymin)) * bh;
      }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var uu = -40; uu <= 120; uu += 40) {
        var y = sy(uu);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(String(uu), pl - 6, y + 4);
      }

      // utility if bid = b, as function of m
      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      var i, mm, uu2, x;
      for (i = 0; i <= 200; i++) {
        mm = i;
        uu2 = util(v, b, mm);
        x = sx(mm);
        if (i === 0) ctx.moveTo(x, sy(uu2)); else ctx.lineTo(x, sy(uu2));
      }
      ctx.stroke();

      // truthful
      ctx.strokeStyle = C.green;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      for (i = 0; i <= 200; i++) {
        mm = i;
        uu2 = util(v, v, mm);
        x = sx(mm);
        if (i === 0) ctx.moveTo(x, sy(uu2)); else ctx.lineTo(x, sy(uu2));
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // current m marker
      ctx.strokeStyle = C.amber;
      ctx.beginPath();
      ctx.moveTo(sx(m), pt);
      ctx.lineTo(sx(m), y1);
      ctx.stroke();
      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(m), sy(u), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('蓝=当前b · 绿虚=报真值 · 横轴m', w - pr, y1 + 31);
    }
    bind(['vc_v', 'vc_b', 'vc_m'], upd);
    upd();
  })();
})();
