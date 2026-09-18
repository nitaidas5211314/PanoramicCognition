/* ============================================================
   《相关均衡（Correlated Equilibrium）》主题脚本
   四个可调模型：
     1. 红绿灯 vs 混合纳什
     2. 性别战：混合 vs 公平硬币 CE
     3. 激励相容检验
     4. 服从率稀释
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
  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }

  function chicken(G, S, Ccost) {
    var den = G - S + Ccost;
    if (den <= 1e-12) den = 1e-12;
    var q = clamp((G - S) / den, 0, 1);
    var euMix = S * (1 - q);
    var euCE = G / 2;
    var crashMix = q * q;
    return { q: q, euMix: euMix, euCE: euCE, gain: euCE - euMix, crashMix: crashMix };
  }

  function bos(a, b) {
    var mixR = a / (1 + a);
    var mixC = b / (1 + b);
    var ceR = (a + 1) / 2;
    var ceC = (1 + b) / 2;
    return { mixR: mixR, mixC: mixC, ceR: ceR, ceC: ceC, gainR: ceR - mixR, gainC: ceC - mixC };
  }

  function icCheck(G, S, Ccost, a, b, g) {
    var sum = a + b + g;
    if (sum <= 1e-12) sum = 1e-12;
    a /= sum; b /= sum; g /= sum;
    var okGo = G >= S - 1e-9;
    var denom = b + g;
    var euF = 0, euD = 0, okStop = true;
    if (denom > 1e-12) {
      var pGo = b / denom, pStop = g / denom;
      euF = S * pStop;
      euD = G * pStop - Ccost * pGo;
      okStop = euF >= euD - 1e-9;
    } else {
      okStop = true;
      euF = 0;
      euD = -Ccost;
    }
    var eu = a * G + b * 0 + g * S;
    return {
      a: a, b: b, g: g,
      okGo: okGo, okStop: okStop, isCE: okGo && okStop,
      eu: eu, euF: euF, euD: euD
    };
  }

  /* ── 1. Traffic light ── */
  (function tlTool() {
    var gEl = $('tl_G'), sEl = $('tl_S'), cEl = $('tl_C');
    if (!gEl || !sEl || !cEl) return;
    var cv = $('tlChart');

    function upd() {
      var G = parseFloat(gEl.value), S = parseFloat(sEl.value), Cc = parseFloat(cEl.value);
      var r = chicken(G, S, Cc);
      var col = r.gain > 0.05 ? C.green : (r.gain >= 0 ? C.amber : C.red);

      txt($('tl_GO'), G.toFixed(1));
      txt($('tl_SO'), S.toFixed(1));
      txt($('tl_CO'), String(Cc));
      txt($('tl_q'), r.q.toFixed(3));
      txt($('tl_mix'), r.euMix.toFixed(2));
      txt($('tl_ce'), r.euCE.toFixed(2));
      txt($('tl_gain'), (r.gain >= 0 ? '+' : '') + r.gain.toFixed(2));
      txt($('tl_vh'),
        'G=' + G.toFixed(1) + ',S=' + S.toFixed(1) + ',C=' + Cc +
        ' → 混合 EU=' + r.euMix.toFixed(2) + '，公平灯控 EU=' + r.euCE.toFixed(2) +
        '；对撞从 ' + (r.crashMix * 100).toFixed(2) + '% 降到 0');
      tint($('tl_vh'), col);
      tint($('tl_gain'), col);
      tint($('tl_ce'), C.green);
      tint($('tl_mix'), C.amber);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [r.euMix, r.euCE];
      var labels = ['混合纳什', '公平 CE'];
      var colors = [C.amber, C.green];
      var vmax = Math.max(0.5, Math.max(vals[0], vals[1]) * 1.25);
      var vmin = Math.min(0, Math.min(vals[0], vals[1]) * 1.25);
      function sy(v) { return y1 - ((v - vmin) / (vmax - vmin || 1)) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var i = 0; i <= 4; i++) {
        var vv = vmin + (vmax - vmin) * i / 4;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, y + 4);
      }
      if (vmin < 0 && vmax > 0) {
        ctx.strokeStyle = C.axis;
        ctx.beginPath();
        ctx.moveTo(pl, sy(0));
        ctx.lineTo(w - pr, sy(0));
        ctx.stroke();
      }

      var barW = bw / 5;
      for (var j = 0; j < 2; j++) {
        var x0 = pl + bw * (j + 1) / 3 - barW / 2;
        var y0 = sy(Math.max(0, vals[j]));
        var yb = sy(Math.min(0, vals[j]));
        ctx.fillStyle = colors[j];
        ctx.fillRect(x0, Math.min(y0, yb), barW, Math.abs(y0 - yb) || 2);
        ctx.fillStyle = C.ink;
        ctx.textAlign = 'center';
        ctx.font = '12px sans-serif';
        var lab = vals[j].toFixed(2);
        var lw = ctx.measureText(lab).width;
        var tx = x0 + barW / 2;
        var ty = vals[j] >= 0 ? y0 - 8 : yb + 14;
        ctx.fillText(lab, tx, ty);
        ctx.fillStyle = C.ink2;
        ctx.fillText(labels[j], tx, y1 + 13);
        void lw;
      }
      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('期望收益对照（对撞：混合 ' + (r.crashMix * 100).toFixed(2) + '% → CE 0）', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('解概念', pl + bw / 2, y1 + 31);
    }
    bind(['tl_G', 'tl_S', 'tl_C'], upd);
    upd();
  })();

  /* ── 2. Battle of Sexes ── */
  (function bosTool() {
    var aEl = $('bos_a'), bEl = $('bos_b');
    if (!aEl || !bEl) return;
    var cv = $('bosChart');

    function upd() {
      var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
      var r = bos(a, b);
      var col = r.gainR > 0.05 ? C.green : C.amber;

      txt($('bos_aO'), a.toFixed(1));
      txt($('bos_bO'), b.toFixed(1));
      txt($('bos_mixR'), r.mixR.toFixed(3));
      txt($('bos_ceR'), r.ceR.toFixed(3));
      txt($('bos_gainR'), (r.gainR >= 0 ? '+' : '') + r.gainR.toFixed(3));
      txt($('bos_gainC'), (r.gainC >= 0 ? '+' : '') + r.gainC.toFixed(3));
      txt($('bos_vh'),
        'a=' + a.toFixed(1) + ', b=' + b.toFixed(1) +
        '：混合行 ' + r.mixR.toFixed(3) + ' / 列 ' + r.mixC.toFixed(3) +
        ' → 公平硬币行 ' + r.ceR.toFixed(3) + ' / 列 ' + r.ceC.toFixed(3));
      tint($('bos_vh'), col);
      tint($('bos_ceR'), C.green);
      tint($('bos_gainR'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var series = [
        { lab: '混合·行', v: r.mixR, c: C.amber },
        { lab: 'CE·行', v: r.ceR, c: C.green },
        { lab: '混合·列', v: r.mixC, c: C.amber },
        { lab: 'CE·列', v: r.ceC, c: C.blue }
      ];
      var vmax = Math.max(1, Math.max(r.mixR, r.mixC, r.ceR, r.ceC) * 1.15);
      function sy(v) { return y1 - (v / vmax) * bh; }
      function sx(i) { return pl + (i + 0.5) * bw / 4; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var t = 0; t <= 4; t++) {
        var vv = vmax * t / 4;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, y + 4);
      }

      var barW = bw / 7;
      series.forEach(function (s, i) {
        var x = sx(i) - barW / 2;
        var y = sy(s.v);
        ctx.fillStyle = s.c;
        ctx.fillRect(x, y, barW, y1 - y);
        ctx.fillStyle = C.ink;
        ctx.textAlign = 'center';
        ctx.font = '11px sans-serif';
        var lab = s.v.toFixed(2);
        var tw = ctx.measureText(lab).width;
        var tx = clamp(sx(i), pl + tw / 2 + 2, w - pr - tw / 2 - 2);
        ctx.fillText(lab, tx, y - 6);
        ctx.fillStyle = C.ink2;
        ctx.fillText(s.lab, sx(i), y1 + 13);
      });
      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Aumann 硬币：相关实施纯 NE 凸组合', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('参与人 × 解概念', pl + bw / 2, y1 + 31);
    }
    bind(['bos_a', 'bos_b'], upd);
    upd();
  })();

  /* ── 3. Incentive check ── */
  (function icTool() {
    var aEl = $('ic_a'), bEl = $('ic_b'), gEl = $('ic_g');
    var GEl = $('ic_G'), SEl = $('ic_S'), CEl = $('ic_C');
    if (!aEl || !bEl || !gEl || !GEl || !SEl || !CEl) return;
    var cv = $('icChart');

    function upd() {
      var a = parseFloat(aEl.value), b = parseFloat(bEl.value), g0 = parseFloat(gEl.value);
      var G = parseFloat(GEl.value), S = parseFloat(SEl.value), Cc = parseFloat(CEl.value);
      var r = icCheck(G, S, Cc, a, b, g0);
      var col = r.isCE ? C.green : C.red;
      var lab = r.isCE ? '是 CE' : '非 CE';
      if (!r.okGo && !r.okStop) lab = '非 CE（双破）';
      else if (!r.okGo) lab = '非 CE（行建议破）';
      else if (!r.okStop) lab = '非 CE（停建议破）';

      txt($('ic_aO'), a.toFixed(2));
      txt($('ic_bO'), b.toFixed(2));
      txt($('ic_gO'), g0.toFixed(2));
      txt($('ic_GO'), G.toFixed(1));
      txt($('ic_SO'), S.toFixed(1));
      txt($('ic_CO'), String(Cc));
      txt($('ic_eu'), r.eu.toFixed(2));
      txt($('ic_euF'), r.euF.toFixed(2));
      txt($('ic_euD'), r.euD.toFixed(2));
      txt($('ic_lab'), lab);
      txt($('ic_vh'),
        '归一 (α,β,γ)=(' + r.a.toFixed(2) + ',' + r.b.toFixed(2) + ',' + r.g.toFixed(2) +
        ')；停时遵守 ' + r.euF.toFixed(2) + ' vs 偏离 ' + r.euD.toFixed(2) + ' → ' + lab);
      tint($('ic_vh'), col);
      tint($('ic_lab'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [r.euF, r.euD];
      var labels = ['遵守·停', '偏离·行'];
      var colors = [C.blue, r.euD > r.euF + 1e-9 ? C.red : C.green];
      var vmax = Math.max(1, Math.max(Math.abs(vals[0]), Math.abs(vals[1]), 0.5) * 1.25);
      var vmin = -vmax;
      if (vals[0] >= 0 && vals[1] >= 0) { vmin = 0; vmax = Math.max(1, Math.max(vals[0], vals[1]) * 1.25); }
      function sy(v) { return y1 - ((v - vmin) / (vmax - vmin || 1)) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var i = 0; i <= 4; i++) {
        var vv = vmin + (vmax - vmin) * i / 4;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, y + 4);
      }
      if (vmin < 0 && vmax > 0) {
        ctx.strokeStyle = C.axis;
        ctx.beginPath();
        ctx.moveTo(pl, sy(0));
        ctx.lineTo(w - pr, sy(0));
        ctx.stroke();
      }

      var barW = bw / 5;
      for (var j = 0; j < 2; j++) {
        var x0 = pl + bw * (j + 1) / 3 - barW / 2;
        var yTop = sy(Math.max(0, vals[j]));
        var yBot = sy(Math.min(0, vals[j]));
        ctx.fillStyle = colors[j];
        ctx.fillRect(x0, Math.min(yTop, yBot), barW, Math.max(2, Math.abs(yTop - yBot)));
        ctx.fillStyle = C.ink;
        ctx.textAlign = 'center';
        ctx.font = '12px sans-serif';
        var labn = vals[j].toFixed(2);
        var tw = ctx.measureText(labn).width;
        var tx = clamp(x0 + barW / 2, pl + tw / 2, w - pr - tw / 2);
        ctx.fillText(labn, tx, vals[j] >= 0 ? yTop - 8 : yBot + 14);
        ctx.fillStyle = C.ink2;
        ctx.fillText(labels[j], x0 + barW / 2, y1 + 13);
      }
      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('收到「停」时的条件期望对照 · ' + lab, pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('策略修改', pl + bw / 2, y1 + 31);
    }
    bind(['ic_a', 'ic_b', 'ic_g', 'ic_G', 'ic_S', 'ic_C'], upd);
    upd();
  })();

  /* ── 4. Follow rate dilution ── */
  (function fTool() {
    var fEl = $('f_f'), ceEl = $('f_ce'), mixEl = $('f_mix');
    if (!fEl || !ceEl || !mixEl) return;
    var cv = $('fChart');

    function upd() {
      var f = parseFloat(fEl.value);
      var uce = parseFloat(ceEl.value);
      var umix = parseFloat(mixEl.value);
      var eff = f * uce + (1 - f) * umix;
      var keep = (Math.abs(uce - umix) < 1e-12) ? 100 : (100 * (eff - umix) / (uce - umix));
      var gap = uce - eff;
      var col = f >= 0.75 ? C.green : (f >= 0.4 ? C.amber : C.red);

      txt($('f_fO'), f.toFixed(2));
      txt($('f_ceO'), uce.toFixed(2));
      txt($('f_mixO'), umix.toFixed(2));
      txt($('f_eff'), eff.toFixed(2));
      txt($('f_keep'), keep.toFixed(0) + '%');
      txt($('f_gap'), gap.toFixed(2));
      txt($('f_vh'),
        'f=' + f.toFixed(2) + ' 时有效 EU≈' + eff.toFixed(2) +
        '；装置设计必须同时抓服从，不只优化纸面 D');
      tint($('f_vh'), col);
      tint($('f_eff'), col);
      tint($('f_keep'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymax = Math.max(uce, umix, eff, 0.5) * 1.15;
      var ymin = Math.min(uce, umix, eff, 0) - 0.1;
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin || 1)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var i = 0; i <= 4; i++) {
        var vv = ymin + (ymax - ymin) * i / 4;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, y + 4);
      }

      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = C.amber;
      ctx.beginPath();
      ctx.moveTo(pl, sy(umix));
      ctx.lineTo(w - pr, sy(umix));
      ctx.stroke();
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      ctx.moveTo(pl, sy(uce));
      ctx.lineTo(w - pr, sy(uce));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      for (var k = 0; k <= 100; k++) {
        var ff = k / 100;
        var ee = ff * uce + (1 - ff) * umix;
        var x = sx(ff), yy = sy(ee);
        if (k === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(f), sy(eff), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('蓝=有效EU(f)  绿虚=纸面CE  琥珀虚=混合底线', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('服从率 f', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx / 2), y1 + 13);
      });
    }
    bind(['f_f', 'f_ce', 'f_mix'], upd);
    upd();
  })();
})();
