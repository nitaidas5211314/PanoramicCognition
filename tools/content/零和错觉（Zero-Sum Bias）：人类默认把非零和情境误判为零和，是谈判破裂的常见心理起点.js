/* ============================================================
   《零和错觉 Zero-Sum Bias》主题脚本
   四个可调模型：
     1. Logrolling 增益
     2. 错觉蒸发代价
     3. 威胁 → 非对称零和
     4. 提醒 × 审议 去偏
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
      ymin = Math.min.apply(null, vs.concat([0])) - 0.05;
      ymax = Math.max.apply(null, vs.concat([0])) + 0.05;
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
      var lab = (typeof it.v === 'number' ? it.v.toFixed(it.dp != null ? it.dp : 2) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }
  function fmt2(x) { return (Math.round(x * 1000) / 1000).toFixed(3).replace(/0$/, '').replace(/\.$/, '.0'); }
  function fmt2b(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function fmt0(x) { return String(Math.round(x)); }

  /* ---- 1. Logrolling ---- */
  function logroll(a, b) {
    var ua, ub;
    if (a >= b) {
      ua = a;
      ub = 1 - b;
    } else {
      ua = 1 - a;
      ub = b;
    }
    return { ua: ua, ub: ub, j: ua + ub };
  }
  function updLg() {
    var a = +$('lg_a').value, b = +$('lg_b').value;
    txt($('lg_aO'), fmt2b(a));
    txt($('lg_bO'), fmt2b(b));
    var jc = 1.0;
    var L = logroll(a, b);
    var g = L.j - jc;
    var gp = g * 100;
    txt($('lg_jc'), fmt2b(jc));
    txt($('lg_jl'), fmt2b(L.j));
    txt($('lg_g'), (g >= 0 ? '+' : '') + fmt2b(g));
    txt($('lg_gp'), fmt0(gp) + '%');
    var vh = $('lg_vh');
    if (g < 0.05) {
      txt(vh, '判定：权重接近 → 增益≈0；此时更像纯分配，守 BATNA 切饼');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：wA=' + fmt2b(a) + ' / wB=' + fmt2b(b) + ' → 增益 ' + fmt0(gp) + '%；先交换议题再谈剩余切分');
      tint(vh, C.green);
    }
    var items = [
      { lab: 'UA_log', v: L.ua, c: C.blue, dp: 2 },
      { lab: 'UB_log', v: L.ub, c: C.green, dp: 2 },
      { lab: '联合_log', v: L.j, c: C.amber, dp: 2 },
      { lab: '妥协', v: jc, c: C.ink2, dp: 2 }
    ];
    items._axis = '效用';
    bars($('lgChart'), items, 0, Math.max(2, L.j + 0.2));
  }

  /* ---- 2. Cost of bias ---- */
  function updCs() {
    var G = +$('cs_g').value, B = +$('cs_b').value, Q = +$('cs_q').value;
    txt($('cs_gO'), fmt2b(G));
    txt($('cs_bO'), fmt2b(B));
    txt($('cs_qO'), fmt2b(Q));
    var lost = G * B * (1 - Q);
    var keep = Math.max(0, G - lost);
    var rate = G > 0 ? (keep / G) * 100 : 0;
    txt($('cs_lost'), fmt2(lost));
    txt($('cs_keep'), fmt2(keep));
    txt($('cs_rate'), fmt0(rate) + '%');
    var vh = $('cs_vh');
    if (lost >= G * 0.5) {
      txt(vh, '判定：蒸发 ' + fmt2(lost) + ' ≥ 潜在增益一半——优先降信念或提信息质量');
      tint(vh, C.red);
    } else if (lost >= G * 0.25) {
      txt(vh, '判定：蒸发 ' + fmt2(lost) + '；降信念或提质量都能线性回收');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：蒸发较小（' + fmt2(lost) + '），兑现率 ' + fmt0(rate) + '%');
      tint(vh, C.green);
    }
    var items = [
      { lab: '潜在G', v: G, c: C.blue, dp: 2 },
      { lab: '蒸发', v: lost, c: C.red, dp: 3 },
      { lab: '兑现', v: keep, c: C.green, dp: 3 }
    ];
    items._axis = '剩余';
    bars($('csChart'), items, 0, Math.max(0.8, G + 0.1));
  }

  /* ---- 3. Asymmetric zero-sum ---- */
  function updAs() {
    var T = +$('as_t').value, zs = +$('as_s').value;
    txt($('as_tO'), String(T));
    txt($('as_sO'), fmt2b(zs));
    var zo = Math.min(7, 2.5 + 0.55 * T);
    var d = zo - zs;
    txt($('as_zo'), fmt2b(zo));
    txt($('as_zs'), fmt2b(zs));
    txt($('as_d'), (d >= 0 ? '+' : '') + fmt2b(d));
    var vh = $('as_vh');
    if (d > 1) {
      txt(vh, '判定：非对称 +' + fmt2b(d) + ' ——「别人损我」显著强于「我损别人」；先降威胁');
      tint(vh, C.red);
    } else if (d > 0) {
      txt(vh, '判定：轻度非对称 +' + fmt2b(d) + '；监控自我服务叙事');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：非对称已抹平或反转（' + fmt2b(d) + '）');
      tint(vh, C.green);
    }
    var items = [
      { lab: 'T', v: T, c: C.amber, dp: 0 },
      { lab: 'Zo对方', v: zo, c: C.red, dp: 2 },
      { lab: 'Zs己方', v: zs, c: C.blue, dp: 2 },
      { lab: '非对称', v: d, c: d > 0 ? C.red : C.green, dp: 2 }
    ];
    items._axis = '评分 / 差值';
    bars($('asChart'), items, Math.min(0, d) - 0.5, 7.5);
  }

  /* ---- 4. Debias ---- */
  function updDb() {
    var B0 = +$('db_b').value, r = +$('db_r').value, e = +$('db_e').value;
    var d = +$('db_d').value, f = +$('db_f').value;
    txt($('db_bO'), fmt2b(B0));
    txt($('db_rO'), fmt2b(r));
    txt($('db_eO'), fmt2b(e));
    txt($('db_dO'), fmt2b(d));
    txt($('db_fO'), fmt2b(f));
    var Bp = B0 * (1 - r * e) * (1 - d * f);
    var drop = B0 > 0 ? ((B0 - Bp) / B0) * 100 : 0;
    txt($('db_bp'), fmt2(Bp));
    txt($('db_drop'), fmt0(drop) + '%');
    var vh = $('db_vh');
    if (Bp > 0.45) {
      txt(vh, '判定：有效信念仍高（' + fmt2(Bp) + '）——加大提醒或审议剂量');
      tint(vh, C.red);
    } else if (Bp > 0.3) {
      txt(vh, '判定：有效信念 ' + fmt2(Bp) + '；提醒与审议乘性叠加中');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：有效信念降至 ' + fmt2(Bp) + '（降幅 ' + fmt0(drop) + '%）');
      tint(vh, C.green);
    }
    var items = [
      { lab: 'B0', v: B0, c: C.ink2, dp: 2 },
      { lab: '仅提醒', v: B0 * (1 - r * e), c: C.amber, dp: 3 },
      { lab: 'B′合成', v: Bp, c: C.green, dp: 3 }
    ];
    items._axis = '信念强度';
    bars($('dbChart'), items, 0, 1.05);
  }

  function boot() {
    bind(['lg_a', 'lg_b'], updLg);
    bind(['cs_g', 'cs_b', 'cs_q'], updCs);
    bind(['as_t', 'as_s'], updAs);
    bind(['db_b', 'db_r', 'db_e', 'db_d', 'db_f'], updDb);
    updLg();
    updCs();
    updAs();
    updDb();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
