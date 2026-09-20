/* ============================================================
   《共同代理与多任务委托》主题脚本
   四个可调模型：
     1. 注意力挤出（配置）
     2. 最优 β_m*
     3. Goodhart 仪表盘
     4. 岗位设计：捆绑 vs 拆分
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
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.classList && t.classList.contains('tab')) setTimeout(fn, 40);
    });
    window.addEventListener('resize', function () { setTimeout(fn, 40); });
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
  function bars(cv, items, ymin, ymax) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    if (ymin == null || ymax == null) {
      var vs = items.map(function (x) { return x.v; });
      ymin = Math.min.apply(null, vs.concat([0])) - 0.02;
      ymax = Math.max.apply(null, vs.concat([0])) + 0.02;
      if (ymax <= ymin) { ymax = ymin + 1; }
    }
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    var barW = bw / (items.length * 1.45);
    var span = ymax - ymin || 1;
    items.forEach(function (it, i) {
      var x = pl + (i + 0.5) * (bw / items.length) - barW / 2;
      var y = y1 - ((it.v - ymin) / span) * bh;
      var zeroY = y1 - ((0 - ymin) / span) * bh;
      var top = Math.min(y, zeroY), bot = Math.max(y, zeroY);
      ctx.fillStyle = it.c;
      ctx.fillRect(x, top, barW, Math.max(2, bot - top));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(it.lab, x + barW / 2, y1 + 13);
      var lab = (typeof it.v === 'number' ? it.v.toFixed(3) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }
  function lineChart(cv, series, xmin, xmax, ymin, ymax, xLabel) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    ctx.strokeStyle = C.axis;
    ctx.beginPath();
    ctx.moveTo(pl, y1);
    ctx.lineTo(pl + bw, y1);
    ctx.stroke();
    var xspan = xmax - xmin || 1, yspan = ymax - ymin || 1;
    function X(x) { return pl + ((x - xmin) / xspan) * bw; }
    function Y(v) { return y1 - ((v - ymin) / yspan) * bh; }
    series.forEach(function (s) {
      ctx.strokeStyle = s.c;
      ctx.lineWidth = 2;
      ctx.beginPath();
      s.pts.forEach(function (p, i) {
        var x = X(p[0]), y = Y(p[1]);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      if (s.mark != null) {
        var mx = X(s.mark), my = Y(s.markY);
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(s.markLab || '', Math.min(mx + 6, pl + bw - 40), my - 6);
      }
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(xLabel || '', pl + bw, y1 + 31);
  }

  function alloc(b1, b2, g) {
    g = Math.min(0.9, Math.max(0, g));
    var d = 1 - g * g;
    var t1 = (b1 - g * b2) / d;
    var t2 = (b2 - g * b1) / d;
    if (t1 < 0) { t1 = 0; t2 = Math.max(0, b2); }
    if (t2 < 0) { t2 = 0; t1 = Math.max(0, b1); }
    return { t1: t1, t2: t2 };
  }

  /* ── 1. Attention crowding ── */
  (function al() {
    if (!$('al_bm')) return;
    function run() {
      var bm = +$('al_bm').value, bu = +$('al_bu').value, g = +$('al_g').value;
      txt($('al_bmO'), bm.toFixed(2));
      txt($('al_buO'), bu.toFixed(2));
      txt($('al_gO'), g.toFixed(2));
      var a = alloc(bm, bu, g);
      var el = g / (1 - g * g);
      txt($('al_tm'), a.t1.toFixed(3));
      txt($('al_tu'), a.t2.toFixed(3));
      txt($('al_el'), el.toFixed(3));
      var verdict, col;
      if (a.t2 < 0.05 && bm > bu) {
        verdict = '判定：难测努力被挤近零——典型 KPI 扭曲区';
        col = C.red;
      } else if (Math.abs(a.t1 - a.t2) < 0.08) {
        verdict = '判定：配置较均衡；若真价值偏难测，可再降 β_m';
        col = C.green;
      } else if (a.t1 > a.t2) {
        verdict = '判定：注意力偏向可测；挤出弹性 ≈ ' + el.toFixed(2);
        col = C.amber;
      } else {
        verdict = '判定：难测占优（内在动机/主观激励仍在）';
        col = C.blue;
      }
      txt($('al_v'), verdict);
      tint($('al_v'), col);
      var items = [
        { lab: 't_m 可测', v: a.t1, c: C.blue },
        { lab: 't_u 难测', v: a.t2, c: C.amber }
      ];
      items._axis = '努力水平';
      bars($('alChart'), items, 0, Math.max(1.2, a.t1, a.t2) * 1.15);
    }
    bind(['al_bm', 'al_bu', 'al_g'], run);
    run();
  })();

  /* ── 2. Optimal beta ── */
  (function op() {
    if (!$('op_Bm')) return;
    function netV(bm, Bu, Bm, g, iota, rs) {
      var a = alloc(bm, iota, g);
      return Bm * a.t1 + Bu * a.t2 - 0.5 * rs * bm * bm;
    }
    function run() {
      var Bm = +$('op_Bm').value, Bu = +$('op_Bu').value;
      var g = +$('op_g').value, iota = +$('op_i').value, rs = +$('op_rs').value;
      txt($('op_BmO'), Bm.toFixed(2));
      txt($('op_BuO'), Bu.toFixed(2));
      txt($('op_gO'), g.toFixed(2));
      txt($('op_iO'), iota.toFixed(2));
      txt($('op_rsO'), rs.toFixed(2));
      var best = 0, bestV = -1e9, pts = [];
      for (var b = 0; b <= 1.5 + 1e-9; b += 0.01) {
        var v = netV(b, Bu, Bm, g, iota, rs);
        pts.push([b, v]);
        if (v > bestV) { bestV = v; best = b; }
      }
      var v90 = netV(0.9, Bu, Bm, g, iota, rs);
      txt($('op_bstar'), best.toFixed(2));
      txt($('op_vmax'), bestV.toFixed(3));
      txt($('op_v90'), v90.toFixed(3));
      var verdict, col;
      if (best < 0.05) {
        verdict = '判定：最优接近固定工资（β≈0）——难测价值与替代足够强';
        col = C.green;
      } else if (best < 0.35) {
        verdict = '判定：宜弱激励；强 KPI（0.9）相对最优损失 ' + (bestV - v90).toFixed(3);
        col = C.amber;
      } else {
        verdict = '判定：可测维主导，中强激励合理；仍须监控挤出';
        col = C.blue;
      }
      txt($('op_v'), verdict);
      tint($('op_v'), col);
      var ymin = Math.min.apply(null, pts.map(function (p) { return p[1]; }));
      var ymax = Math.max.apply(null, pts.map(function (p) { return p[1]; }));
      var pad = (ymax - ymin) * 0.12 || 0.05;
      lineChart($('opChart'), [{
        c: C.blue, pts: pts, mark: best, markY: bestV, markLab: 'β*'
      }], 0, 1.5, ymin - pad, ymax + pad, 'β_m →');
    }
    bind(['op_Bm', 'op_Bu', 'op_g', 'op_i', 'op_rs'], run);
    run();
  })();

  /* ── 3. Goodhart dashboard ── */
  (function gh() {
    if (!$('gh_b')) return;
    function run() {
      var b = +$('gh_b').value, iota = +$('gh_i').value;
      var Bm = +$('gh_Bm').value, g = +$('gh_g').value;
      var Bu = 1 - Bm;
      txt($('gh_bO'), b.toFixed(2));
      txt($('gh_iO'), iota.toFixed(2));
      txt($('gh_BmO'), Bm.toFixed(2));
      txt($('gh_gO'), g.toFixed(2));
      var a = alloc(b, iota, g);
      var meas = a.t1;
      var tru = Bm * a.t1 + Bu * a.t2;
      var gap = meas - tru;
      txt($('gh_meas'), meas.toFixed(3));
      txt($('gh_true'), tru.toFixed(3));
      txt($('gh_gap'), gap.toFixed(3));
      var verdict, col;
      if (gap > 0.15 && a.t2 < 0.08) {
        verdict = '判定：测度虚胖且难测枯竭——Goodhart 高危';
        col = C.red;
      } else if (gap > 0.05) {
        verdict = '判定：报表好于真价值；加码会扩大虚胖缺口';
        col = C.amber;
      } else if (gap < -0.05) {
        verdict = '判定：测度低估真价值（难测贡献未被合同看见）';
        col = C.blue;
      } else {
        verdict = '判定：测度与真价值大致同向';
        col = C.green;
      }
      txt($('gh_v'), verdict);
      tint($('gh_v'), col);
      var items = [
        { lab: '测度', v: meas, c: C.red },
        { lab: '真价值', v: tru, c: C.green },
        { lab: 't_u', v: a.t2, c: C.amber }
      ];
      items._axis = '水平';
      bars($('ghChart'), items, Math.min(0, meas, tru, a.t2) - 0.05, Math.max(meas, tru, a.t2, 0.5) * 1.15);
    }
    bind(['gh_b', 'gh_i', 'gh_Bm', 'gh_g'], run);
    run();
  })();

  /* ── 4. Job design ── */
  (function jb() {
    if (!$('jb_b')) return;
    function run() {
      var b = +$('jb_b').value, bs = +$('jb_bs').value;
      var Bm = +$('jb_Bm').value, Bu = 1 - Bm;
      var g = +$('jb_g').value, iota = +$('jb_i').value;
      txt($('jb_bO'), b.toFixed(2));
      txt($('jb_bsO'), bs.toFixed(2));
      txt($('jb_BmO'), Bm.toFixed(2));
      txt($('jb_BuO'), Bu.toFixed(2));
      txt($('jb_gO'), g.toFixed(2));
      txt($('jb_iO'), iota.toFixed(2));
      // bundled: one agent, beta on measurable only, iota soft on hard
      var ab = alloc(b, iota * 0.5, g); // bundled: intrinsic diluted by conflict
      var vb = Bm * ab.t1 + Bu * ab.t2 - 0.5 * b * b;
      // separated: measurable agent gets bs, hard-measure agent keeps iota fully, no cross γ
      var tm = Math.max(0, bs); // single-task: t=β under unit cost
      var tu = Math.max(0, iota);
      var vs = Bm * tm + Bu * tu - 0.5 * bs * bs;
      var gain = vs - vb;
      txt($('jb_vb'), vb.toFixed(3));
      txt($('jb_vs'), vs.toFixed(3));
      txt($('jb_gain'), (gain >= 0 ? '+' : '') + gain.toFixed(3));
      var verdict, col;
      if (gain > 0.05) {
        verdict = '判定：拆分显著更优——用专岗恢复强激励合法性';
        col = C.green;
      } else if (gain > 0) {
        verdict = '判定：拆分略优；还要计入协调成本（模型未内生）';
        col = C.amber;
      } else {
        verdict = '判定：捆绑不差；若协调成本高可维持综合岗 + 弱激励';
        col = C.blue;
      }
      txt($('jb_v'), verdict);
      tint($('jb_v'), col);
      var items = [
        { lab: '捆绑 V', v: vb, c: C.amber },
        { lab: '拆分 V', v: vs, c: C.green },
        { lab: '捆绑 t_u', v: ab.t2, c: C.red },
        { lab: '拆分 t_u', v: tu, c: C.blue }
      ];
      items._axis = '价值 / 努力';
      bars($('jbChart'), items, null, null);
    }
    bind(['jb_b', 'jb_bs', 'jb_Bm', 'jb_g', 'jb_i'], run);
    run();
  })();
})();
