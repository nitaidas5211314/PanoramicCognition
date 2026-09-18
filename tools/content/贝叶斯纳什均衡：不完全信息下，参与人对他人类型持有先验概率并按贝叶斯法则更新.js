/* ============================================================
   《贝叶斯纳什均衡》主题脚本
   四个可调模型（全部真实参与计算）：
     1. 进入威慑：强硬先验 α → EU(进入) 与阈值
     2. 一价 IPV：n,v → b*, EU
     3. 贝叶斯更新：π,q → 后验
     4. 不完全信息古诺：p,c1,a → q1*, q2(L/H), P
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

  /* ── 1. Entry deterrence ── */
  (function ent() {
    var aEl = $('ent_a');
    if (!aEl) return;
    var cv = $('entChart');

    function upd() {
      var a = parseFloat(aEl.value);
      var eu = 1 - 2 * a;
      var enter = eu >= -1e-12;
      var col = enter ? C.red : C.green;
      var act = enter ? '进入' : '不进入';
      var th = a < 0.5 - 1e-12 ? 'α<阈值' : (a > 0.5 + 1e-12 ? 'α>阈值' : 'α=阈值（无差异）');

      txt($('ent_aO'), a.toFixed(2));
      txt($('ent_eu'), eu.toFixed(2));
      txt($('ent_th'), th);
      txt($('ent_act'), act);
      txt($('ent_vh'), 'α=' + a.toFixed(2) + ' → EU(进入)=' + eu.toFixed(2) +
        (enter ? '≥0 → 进入' : '<0 → 不进入') + '；强硬战、软弱容纳');
      tint($('ent_vh'), col);

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
        ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(pl + bw, y); ctx.stroke();
        ctx.fillText(v.toFixed(1), pl - 6, y + 3);
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(1));
      ctx.lineTo(sx(1), sy(-1));
      ctx.stroke();

      ctx.strokeStyle = C.ink3;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(pl, sy(0)); ctx.lineTo(pl + bw, sy(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx(0.5), pt); ctx.lineTo(sx(0.5), y1); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(a), sy(eu), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('α（强硬先验）', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillText('α*=0.5', sx(0.5) - 4, pt + 12);
      ctx.textAlign = 'left';
      ctx.fillStyle = C.blue;
      ctx.fillText('EU=1−2α', pl + 8, pt + 12);
    }
    bind(['ent_a'], upd);
    upd();
  })();

  /* ── 2. First-price auction ── */
  (function fpa() {
    var nEl = $('fpa_n'), vEl = $('fpa_v');
    if (!nEl || !vEl) return;
    var cv = $('fpaChart');

    function upd() {
      var n = parseInt(nEl.value, 10);
      var v = parseFloat(vEl.value);
      var b = ((n - 1) / n) * v;
      var sh = v - b;
      var pwin = Math.pow(v, n - 1);
      var eu = (v - b) * pwin;

      txt($('fpa_nO'), String(n));
      txt($('fpa_vO'), v.toFixed(2));
      txt($('fpa_b'), b.toFixed(2));
      txt($('fpa_sh'), sh.toFixed(2));
      txt($('fpa_eu'), eu.toFixed(3));
      txt($('fpa_vh'), 'n=' + n + ',v=' + v.toFixed(2) + ' → b*=' + b.toFixed(2) +
        '（报真值的 ' + ((100 * (n - 1) / n).toFixed(0)) + '%），EU=' + eu.toFixed(3) +
        '；n↑ 则压价↓、竞争↑');
      tint($('fpa_vh'), C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      function sx(t) { return pl + t * bw; }
      function sy(u) { return y1 - u * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var u = 0; u <= 1; u += 0.25) {
        var y = sy(u);
        ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(pl + bw, y); ctx.stroke();
        ctx.fillText(u.toFixed(2), pl - 6, y + 3);
      }

      ctx.strokeStyle = C.ink3;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(sx(0), sy(0)); ctx.lineTo(sx(1), sy(1)); ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var t = 0; t <= 1.001; t += 0.02) {
        var bt = ((n - 1) / n) * t;
        if (t === 0) ctx.moveTo(sx(t), sy(bt));
        else ctx.lineTo(sx(t), sy(bt));
      }
      ctx.stroke();

      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(v), sy(b), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'center';
      ctx.fillText('估值 v', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillStyle = C.blue;
      ctx.fillText('b*=((n−1)/n)v', pl + 8, pt - 8);
      ctx.fillStyle = C.ink3;
      ctx.fillText('虚线=报真值', pl + 140, pt - 8);
    }
    bind(['fpa_n', 'fpa_v'], upd);
    upd();
  })();

  /* ── 3. Bayes update ── */
  (function bay() {
    var pEl = $('bay_p'), qEl = $('bay_q');
    if (!pEl || !qEl) return;
    var cv = $('bayChart');

    function upd() {
      var p = parseFloat(pEl.value);
      var q = parseFloat(qEl.value);
      var num = p * q;
      var den = p * q + (1 - p) * (1 - q);
      var post = den > 0 ? num / den : p;
      var L = (1 - q) < 1e-12 ? Infinity : q / (1 - q);
      var d = post - p;
      var dStr = (d >= 0 ? '+' : '') + d.toFixed(3);

      txt($('bay_pO'), p.toFixed(2));
      txt($('bay_qO'), q.toFixed(2));
      txt($('bay_post'), post.toFixed(3));
      txt($('bay_L'), (L === Infinity ? '∞' : L.toFixed(2)));
      txt($('bay_d'), dStr);
      txt($('bay_vh'), 'π=' + p.toFixed(2) + ',q=' + q.toFixed(2) + ' → 后验 ' +
        post.toFixed(3) + '（' + dStr + '）；精度越高，同先验下后验越极端');
      tint($('bay_vh'), d > 0.05 ? C.red : (d < -0.05 ? C.green : C.blue));

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      function sx(t) { return pl + t * bw; }
      function sy(u) { return y1 - u * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var u = 0; u <= 1; u += 0.25) {
        var y = sy(u);
        ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(pl + bw, y); ctx.stroke();
        ctx.fillText(u.toFixed(2), pl - 6, y + 3);
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var t = 0.02; t <= 0.98; t += 0.02) {
        var pt2 = (t * q) / (t * q + (1 - t) * (1 - q));
        if (t <= 0.021) ctx.moveTo(sx(t), sy(pt2));
        else ctx.lineTo(sx(t), sy(pt2));
      }
      ctx.stroke();

      ctx.strokeStyle = C.ink3;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(sx(0), sy(0)); ctx.lineTo(sx(1), sy(1)); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.arc(sx(p), sy(post), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'center';
      ctx.fillText('先验 π', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillStyle = C.blue;
      ctx.fillText('后验曲线（固定 q）', pl + 8, pt + 4);
    }
    bind(['bay_p', 'bay_q'], upd);
    upd();
  })();

  /* ── 4. Incomplete-info Cournot ── */
  (function cou() {
    var pEl = $('cou_p'), cEl = $('cou_c'), aEl = $('cou_a');
    if (!pEl || !cEl || !aEl) return;
    var cv = $('couChart');
    var cL = 10, cH = 40;

    function upd() {
      var p = parseFloat(pEl.value);
      var c1 = parseFloat(cEl.value);
      var a = parseFloat(aEl.value);
      var Ec = p * cL + (1 - p) * cH;
      var q1 = (a - 2 * c1 + Ec) / 3;
      var q2L = (a - cL - q1) / 2;
      var q2H = (a - cH - q1) / 2;
      var Eq2 = p * q2L + (1 - p) * q2H;
      var P = a - (q1 + Eq2);
      if (q1 < 0) q1 = 0;
      if (q2L < 0) q2L = 0;
      if (q2H < 0) q2H = 0;

      txt($('cou_pO'), p.toFixed(2));
      txt($('cou_cO'), String(Math.round(c1)));
      txt($('cou_aO'), String(Math.round(a)));
      txt($('cou_q1'), q1.toFixed(2));
      txt($('cou_q2'), q2L.toFixed(2) + ' / ' + q2H.toFixed(2));
      txt($('cou_P'), P.toFixed(2));
      txt($('cou_vh'), 'E[c₂]=' + Ec.toFixed(1) + ' → q₁*=' + q1.toFixed(2) +
        '；p↑（对手更可能低成本）→ 你减产、期望价下降');
      tint($('cou_vh'), C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 24, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [q1, q2L, q2H];
      var labs = ['q₁*', 'q₂(低)', 'q₂(高)'];
      var cols = [C.blue, C.green, C.red];
      var vmax = Math.max(40, Math.ceil(Math.max.apply(null, vals) * 1.15));

      function sx(v) { return pl + (v / vmax) * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var i = 0; i <= 4; i++) {
        var vv = (vmax * i) / 4;
        var x = sx(vv);
        ctx.beginPath(); ctx.moveTo(x, pt); ctx.lineTo(x, y1); ctx.stroke();
      }

      var barH = 28, gap = 18;
      var startY = pt + 18;
      for (var j = 0; j < 3; j++) {
        var y = startY + j * (barH + gap);
        var val = vals[j];
        ctx.fillStyle = cols[j];
        ctx.fillRect(pl, y, Math.max(0, sx(val) - pl), barH);
        ctx.fillStyle = C.ink;
        ctx.textAlign = 'left';
        ctx.font = '12px sans-serif';
        ctx.fillText(labs[j], pl + 4, y - 4);
        var lab = val.toFixed(2);
        ctx.font = '11px sans-serif';
        var lw = ctx.measureText(lab).width;
        var lx = Math.min(sx(val) + 8, w - lw - 6);
        if (sx(val) - pl < lw + 16) lx = Math.max(pl + 4, sx(val) - lw - 6);
        ctx.fillStyle = C.ink2;
        ctx.fillText(lab, lx, y + barH / 2 + 4);
      }

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'center';
      ctx.fillText('产量', pl + bw / 2, y1 + 31);
    }
    bind(['cou_p', 'cou_c', 'cou_a'], upd);
    upd();
  })();
})();
