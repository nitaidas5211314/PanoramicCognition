/* ============================================================
   《无知公理（不可观测性原理）》主题脚本
   四个可调模型：
     1. 知晓泄漏 ω → 观测率偏离
     2. Goodhart 倒 U：优化压力 vs 真目标
     3. Lucas 漂移：政策显著度改写弹性
     4. 自我实现 vs 自我挫败对照
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

  function fmt1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function fmt2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function fmt3(x) { return (Math.round(x * 1000) / 1000).toFixed(3); }
  function fmtPct1(x) { return (Math.round(x * 1000) / 10).toFixed(1) + '%'; }
  function fmtPct0(x) { return Math.round(x * 100) + '%'; }

  function pushAmt(w, r, s) { return Math.min(1, w * r * s); }
  function pDefeat(p, push) { return p + (1 - 2 * p) * push; }
  function pFulfill(p, push) { return p + (1 - p) * push; }
  function gGoal(O, b, c) { return b * O - c * O * O; }

  /* ---------- Model 1: awareness leak ---------- */
  function m1() {
    var p = parseFloat($('ig_p').value);
    var w = parseFloat($('ig_w').value);
    var r = parseFloat($('ig_r').value);
    var s = parseFloat($('ig_s').value);
    var push = pushAmt(w, r, s);
    var po = pDefeat(p, push);
    var err = Math.abs(po - p);
    var fit = 1 - err;
    txt($('ig_p_o'), fmt2(p));
    txt($('ig_w_o'), fmtPct0(w));
    txt($('ig_r_o'), fmtPct0(r));
    txt($('ig_s_o'), fmt2(s));
    txt($('ig_pobs'), fmt3(po));
    txt($('ig_err'), fmt3(err));
    txt($('ig_fit'), fmtPct1(fit));
    txt($('ig_push'), fmt3(push));
    var msg;
    if (err < 0.02) { msg = '判定：泄漏尚小，预测大致仍可用；继续盯 ω。'; tint($('ig_vh'), C.green); }
    else if (err < 0.08) { msg = '判定：偏误已可察觉；发布前必须做反应剧本。'; tint($('ig_vh'), C.amber); }
    else { msg = '判定：无知公理严重违约——统计相关正在瓦解。'; tint($('ig_vh'), C.red); }
    txt($('ig_vh'), msg);
    drawIg(p, r, s, w);
  }

  function drawIg(p, r, s, wCur) {
    var g = fit($('igChart'), 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, W = g.w, H = g.h;
    var pl = 48, pr = 16, pt = 18, pb = 46;
    var bw = W - pl - pr, bh = H - pt - pb;
    var xs = function (w) { return pl + w * bw; };
    var ymax = 0.35;
    var ys = function (e) { return pt + bh * (1 - Math.min(ymax, e) / ymax); };

    ctx.strokeStyle = C.axis; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pl, pt); ctx.lineTo(pl, pt + bh); ctx.lineTo(pl + bw, pt + bh); ctx.stroke();

    ctx.strokeStyle = C.grid; ctx.setLineDash([3, 3]);
    for (var i = 1; i <= 3; i++) {
      var yy = pt + bh * i / 4;
      ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 0; i <= 100; i++) {
      var w = i / 100;
      var e = Math.abs(pDefeat(p, pushAmt(w, r, s)) - p);
      var x = xs(w), y = ys(e);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    var eCur = Math.abs(pDefeat(p, pushAmt(wCur, r, s)) - p);
    ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.arc(xs(wCur), ys(eCur), 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('0', xs(0), pt + bh + 13);
    ctx.fillText('0.5', xs(0.5), pt + bh + 13);
    ctx.fillText('1', xs(1), pt + bh + 13);
    ctx.fillText('知晓率 ω', pl + bw / 2, pt + bh + 31);
    ctx.save();
    ctx.translate(14, pt + bh / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('|p′−p|', 0, 0);
    ctx.restore();
    ctx.textAlign = 'left';
    ctx.fillText('偏误随 ω', pl + 8, pt + 12);
  }

  /* ---------- Model 2: Goodhart ---------- */
  function m2() {
    var O = parseFloat($('gh_o').value);
    var b = parseFloat($('gh_b').value);
    var c = parseFloat($('gh_c').value);
    var G = gGoal(O, b, c);
    var Ostar = b / (2 * c);
    var Gmax = gGoal(Ostar, b, c);
    var rel = Gmax > 0 ? Math.max(0, G / Gmax) : 0;
    txt($('gh_o_o'), fmt1(O));
    txt($('gh_b_o'), fmt2(b));
    txt($('gh_c_o'), fmt2(c));
    txt($('gh_g'), fmt2(G));
    txt($('gh_ostar'), fmt2(Ostar));
    txt($('gh_gmax'), fmt2(Gmax));
    txt($('gh_rel'), fmtPct0(rel));
    var msg;
    if (O <= Ostar * 0.85) { msg = '判定：仍在上升段——优化尚利真目标。'; tint($('gh_vh'), C.green); }
    else if (O <= Ostar * 1.15) { msg = '判定：接近峰值——再加压收益很小、风险陡增。'; tint($('gh_vh'), C.amber); }
    else { msg = '判定：已过 Goodhart 峰——继续优化在伤害真目标。'; tint($('gh_vh'), C.red); }
    txt($('gh_vh'), msg);
    drawGh(O, b, c, Ostar);
  }

  function drawGh(Ocur, b, c, Ostar) {
    var g = fit($('ghChart'), 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, W = g.w, H = g.h;
    var pl = 48, pr = 16, pt = 18, pb = 46;
    var bw = W - pl - pr, bh = H - pt - pb;
    var Omax = 8;
    var GmaxPlot = Math.max(0.5, gGoal(Ostar, b, c) * 1.15);
    var GminPlot = Math.min(-0.5, gGoal(Omax, b, c));
    var xs = function (O) { return pl + (O / Omax) * bw; };
    var ys = function (G) { return pt + bh * (1 - (G - GminPlot) / (GmaxPlot - GminPlot)); };

    ctx.strokeStyle = C.axis; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pl, pt); ctx.lineTo(pl, pt + bh); ctx.lineTo(pl + bw, pt + bh); ctx.stroke();

    // zero line
    if (GminPlot < 0 && GmaxPlot > 0) {
      ctx.strokeStyle = C.grid; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(pl, ys(0)); ctx.lineTo(pl + bw, ys(0)); ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 0; i <= 80; i++) {
      var O = (i / 80) * Omax;
      var G = gGoal(O, b, c);
      var x = xs(O), y = ys(G);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // peak marker
    ctx.strokeStyle = C.amber; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(xs(Ostar), pt); ctx.lineTo(xs(Ostar), pt + bh); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.arc(xs(Ocur), ys(gGoal(Ocur, b, c)), 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('0', xs(0), pt + bh + 13);
    ctx.fillText('4', xs(4), pt + bh + 13);
    ctx.fillText('8', xs(8), pt + bh + 13);
    ctx.fillText('优化压力 O', pl + bw / 2, pt + bh + 31);
    ctx.textAlign = 'left';
    ctx.fillText('G(O)·峰=' + fmt2(Ostar), pl + 8, pt + 12);
  }

  /* ---------- Model 3: Lucas ---------- */
  function m3() {
    var beta = parseFloat($('lu_b').value);
    var gamma = parseFloat($('lu_g').value);
    var sal = parseFloat($('lu_s').value);
    var bp = beta * (1 - gamma * sal);
    var loss = beta === 0 ? 0 : (beta - bp) / beta;
    var err = Math.abs(beta - bp); // Δpolicy = 1
    txt($('lu_b_o'), fmt2(beta));
    txt($('lu_g_o'), fmt2(gamma));
    txt($('lu_s_o'), fmt2(sal));
    txt($('lu_bp'), fmt3(bp));
    txt($('lu_loss'), fmtPct1(loss));
    txt($('lu_err'), fmt3(err));
    var ok, col;
    if (loss < 0.1) { ok = '较稳'; col = C.green; }
    else if (loss < 0.25) { ok = '临界'; col = C.amber; }
    else { ok = '危险'; col = C.red; }
    txt($('lu_ok'), ok);
    tint($('lu_ok'), col);
    txt($('lu_vh'), '判定：显著度 ' + fmt2(sal) + ' 时，用旧 β 外推的单位政策误差≈' + fmt3(err) + '。');
    tint($('lu_vh'), col);
  }

  /* ---------- Model 4: fulfill vs defeat ---------- */
  function m4() {
    var p = parseFloat($('rf_p').value);
    var w = parseFloat($('rf_w').value);
    var r = parseFloat($('rf_r').value);
    var s = parseFloat($('rf_s').value);
    var push = pushAmt(w, r, s);
    var pd = pDefeat(p, push);
    var pf = pFulfill(p, push);
    txt($('rf_p_o'), fmt2(p));
    txt($('rf_w_o'), fmtPct0(w));
    txt($('rf_r_o'), fmtPct0(r));
    txt($('rf_s_o'), fmt2(s));
    txt($('rf_def'), fmt3(pd));
    txt($('rf_ful'), fmt3(pf));
    txt($('rf_de'), fmt3(Math.abs(pd - p)));
    txt($('rf_fe'), fmt3(Math.abs(pf - p)));
    txt($('rf_vh'), '判定：挫败与实现符号相反（' + fmt3(pd) + ' vs ' + fmt3(pf) + '）；先分清激励再谈治理。');
    tint($('rf_vh'), C.blue);
  }

  function all() { m1(); m2(); m3(); m4(); }

  bind(['ig_p', 'ig_w', 'ig_r', 'ig_s'], m1);
  bind(['gh_o', 'gh_b', 'gh_c'], m2);
  bind(['lu_b', 'lu_g', 'lu_s'], m3);
  bind(['rf_p', 'rf_w', 'rf_r', 'rf_s'], m4);
  all();
})();
