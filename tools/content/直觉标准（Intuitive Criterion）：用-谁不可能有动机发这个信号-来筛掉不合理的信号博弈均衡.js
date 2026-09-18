/* ============================================================
   《直觉标准 Intuitive Criterion》主题脚本
   四个可调模型：
     1. Spence 混同 IC 杀伤区间
     2. Beer–Quiche 乳蛋饼混同否决
     3. 过度分离 vs Riley
     4. 类型数 → 精炼升级启发式
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
  function bars(cv, vals, ymin, ymax, axisLab) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    var barW = bw / (vals.length * 1.5);
    vals.forEach(function (o, i) {
      var x = pl + (i + 0.5) * (bw / vals.length) - barW / 2;
      var y0 = y1 - ((0 - ymin) / (ymax - ymin)) * bh;
      var yv = y1 - ((o.v - ymin) / (ymax - ymin)) * bh;
      var top = Math.min(y0, yv), ht = Math.abs(y0 - yv);
      ctx.fillStyle = o.c;
      ctx.fillRect(x, top, barW, Math.max(ht, 1));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      var lab = (typeof o.labN === 'string') ? o.labN : o.v.toFixed(2);
      var lx = x + barW / 2;
      var ly = o.v >= 0 ? Math.max(yv - 6, pt + 10) : Math.min(yv + 14, y1 - 4);
      ctx.fillText(lab, lx, ly);
      ctx.fillStyle = C.ink2;
      ctx.font = '10px sans-serif';
      var lines = (o.lab || '').split('\n');
      lines.forEach(function (ln, j) {
        ctx.fillText(ln, lx, y1 + 13 + j * 12);
      });
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(axisLab || '数值', pl + bw / 2, y1 + 31);
  }

  /* ── 1. 混同 IC 杀伤 ── */
  (function pool() {
    if (!$('ic_yh')) return;
    var cv = $('icChart');
    var tH = 2, tL = 1;
    function upd() {
      var yH = parseFloat($('ic_yh').value);
      var yL = parseFloat($('ic_yl').value);
      var pi = parseFloat($('ic_pi').value) / 100;
      var e = parseFloat($('ic_e').value);
      txt($('ic_yhO'), yH.toFixed(1));
      txt($('ic_ylO'), yL.toFixed(1));
      txt($('ic_piO'), Math.round(pi * 100) + '%');
      txt($('ic_eO'), e.toFixed(1));

      var wp = pi * yH + (1 - pi) * yL;
      var eL = (yH - wp) * tL;
      var eH = (yH - wp) * tH;
      var uPoolH = wp;
      var uDevH = yH - e / tH;
      var uDevLbest = yH - e / tL;
      var lowED = uDevLbest < uPoolH - 1e-12;
      var highGain = uDevH > uPoolH + 1e-12;
      var kill = lowED && highGain && e > eL && e < eH;

      var verdict, color;
      if (kill) {
        verdict = '杀掉混同';
        color = C.red;
      } else if (!lowED && highGain) {
        verdict = '低类型未占优 · 未否决';
        color = C.amber;
      } else if (lowED && !highGain) {
        verdict = '高类型不赚钱 · 未否决';
        color = C.amber;
      } else {
        verdict = '未触发 IC 否决';
        color = C.green;
      }

      txt($('ic_wp'), wp.toFixed(2));
      txt($('ic_el'), eL.toFixed(2));
      txt($('ic_eh'), eH.toFixed(2));
      txt($('ic_verdict'), verdict);
      tint($('ic_verdict'), color);
      var msg = 'w_p=' + wp.toFixed(2) + '；低类型最乐观支付 ' + uDevLbest.toFixed(2) +
        (lowED ? ' < ' : ' ≥ ') + '混同 ' + uPoolH.toFixed(2) +
        '；高类型被认出 ' + uDevH.toFixed(2) +
        (highGain ? ' > ' : ' ≤ ') + '混同。杀伤开区间 (' + eL.toFixed(2) + ', ' + eH.toFixed(2) + ')。';
      txt($('ic_vh'), msg);
      tint($('ic_vh'), color);

      bars(cv, [
        { lab: 'w_p', v: wp, c: C.amber },
        { lab: 'e′', v: e, c: C.blue },
        { lab: 'e_L门', v: eL, c: C.ink3 },
        { lab: 'e_H门', v: eH, c: C.green },
        { lab: '高偏离\n支付', v: uDevH, c: highGain ? C.red : C.ink2 }
      ], 0, Math.max(yH, eH, e, wp) + 0.5, '工资 / 教育水平');
    }
    bind(['ic_yh', 'ic_yl', 'ic_pi', 'ic_e'], upd);
    upd();
  })();

  /* ── 2. Beer–Quiche ── */
  (function bq() {
    if (!$('bq_p')) return;
    var cv = $('bqChart');
    function upd() {
      var pS = parseFloat($('bq_p').value) / 100;
      var D = parseFloat($('bq_d').value);
      var B = parseFloat($('bq_b').value);
      txt($('bq_pO'), Math.round(pS * 100) + '%');
      txt($('bq_dO'), D.toFixed(1));
      txt($('bq_bO'), B.toFixed(1));

      // Quiche pooling: both quiche, no duel on path; duel after beer
      // Surly likes beer: eq payoff = 0*B + D = D (gets preferred? no, quiche)
      // Surly quiche + no duel = D (no breakfast bonus)
      // Wimp quiche + no duel = B + D
      var uSq = D;           // Surly in quiche pool
      var uSb = B + D;       // Surly beer + no duel (if believed surly)
      var uWq = B + D;       // Wimp in quiche pool
      var uWbBest = D;       // Wimp beer + no duel (optimistic: believed surly, no preferred breakfast)
      // Actually: Wimp prefers quiche. Beer + no duel = 0 + D = D; Quiche eq = B+D
      // Surly: Beer + no duel = B+D; Quiche eq = D

      var surlyWants = uSb > uSq + 1e-12;
      var wimpED = uWbBest < uWq - 1e-12;
      var fail = surlyWants && wimpED;

      // Beer pooling typically survives when prior high enough that receiver doesn't duel after beer
      // Fight threshold: duel if μ(wimp) high. Enterant wants duel vs wimp.
      // Simplified display: IC on quiche pool

      txt($('bq_sq'), uSq.toFixed(2));
      txt($('bq_sb'), uSb.toFixed(2));
      txt($('bq_wb'), uWbBest.toFixed(2));
      var verd = fail ? '否决' : '未否决';
      txt($('bq_verdict'), verd);
      tint($('bq_verdict'), fail ? C.red : C.green);

      var msg = '乳蛋饼混同：Surly 支付 ' + uSq.toFixed(2) +
        '；若喝啤酒且不被打得 ' + uSb.toFixed(2) +
        (surlyWants ? ' → 想演讲偏离' : ' → 不想偏') +
        '。Wimp 乐观啤酒支付 ' + uWbBest.toFixed(2) + ' vs 均衡 ' + uWq.toFixed(2) +
        (wimpED ? ' → 均衡占优。' : ' → 未占优。') +
        '先验 p_S=' + (pS * 100).toFixed(0) + '%（影响决斗 BR，不改本支付比较）。';
      txt($('bq_vh'), msg);
      tint($('bq_vh'), fail ? C.red : C.green);

      bars(cv, [
        { lab: 'Surly\n乳蛋饼*', v: uSq, c: C.amber },
        { lab: 'Surly\n啤酒乐观', v: uSb, c: C.red },
        { lab: 'Wimp\n乳蛋饼*', v: uWq, c: C.green },
        { lab: 'Wimp\n啤酒乐观', v: uWbBest, c: C.blue },
        { lab: 'p_S', v: pS, c: C.ink3 }
      ], 0, Math.max(uSb, uWq, D + B, 1) + 0.3, '支付 / 先验');
    }
    bind(['bq_p', 'bq_d', 'bq_b'], upd);
    upd();
  })();

  /* ── 3. Riley vs over-signaling ── */
  (function riley() {
    if (!$('ry_yh')) return;
    var cv = $('ryChart');
    var tL = 1;
    function upd() {
      var yH = parseFloat($('ry_yh').value);
      var yL = parseFloat($('ry_yl').value);
      var eH = parseFloat($('ry_e').value);
      var tH = parseFloat($('ry_th').value);
      txt($('ry_yhO'), yH.toFixed(1));
      txt($('ry_ylO'), yL.toFixed(1));
      txt($('ry_eO'), eH.toFixed(1));
      txt($('ry_thO'), tH.toFixed(1));

      var eStar = (yH - yL) * tL;
      var uH = yH - eH / tH;
      var uHs = yH - eStar / tH;
      var uL = yL;
      var uLmimicStar = yH - eStar / tL;
      // For e' slightly below eH toward eStar: low ED if yH - e'/tL <= yL when e'>=eStar
      // IC kills over-sep if eH > eStar and high prefers eStar when believed high,
      // and low does not gain from eStar even if believed high: uLmimicStar <= uL
      var over = eH > eStar + 1e-9;
      var highPrefers = uHs > uH + 1e-12;
      var lowED = uLmimicStar <= uL + 1e-9;
      var kill = over && highPrefers && lowED;

      var verd = !over ? '已在 Riley 或以下' : (kill ? '否决过度分离' : '未完全否决');
      var color = kill ? C.red : (over ? C.amber : C.green);

      txt($('ry_star'), eStar.toFixed(2));
      txt($('ry_uh'), uH.toFixed(2));
      txt($('ry_uhs'), uHs.toFixed(2));
      txt($('ry_verdict'), verd);
      tint($('ry_verdict'), color);

      var msg = 'e*=' + eStar.toFixed(2) + '（低类型模仿无差异：' + uLmimicStar.toFixed(2) +
        ' vs 均衡 ' + uL.toFixed(2) + '）。高类型在 e_H 支付 ' + uH.toFixed(2) +
        '，在 e* 支付 ' + uHs.toFixed(2) +
        (kill ? ' → 可演讲打回 Riley。' : '。');
      txt($('ry_vh'), msg);
      tint($('ry_vh'), color);

      bars(cv, [
        { lab: 'e_H', v: eH, c: C.blue },
        { lab: 'e*', v: eStar, c: C.green },
        { lab: 'u_H(e_H)', v: uH, c: C.amber },
        { lab: 'u_H(e*)', v: uHs, c: kill ? C.red : C.ink2 }
      ], 0, Math.max(eH, eStar, uHs, yH) + 0.4, '教育 / 支付');
    }
    bind(['ry_yh', 'ry_yl', 'ry_e', 'ry_th'], upd);
    upd();
  })();

  /* ── 4. 类型数启发式 ── */
  (function ntype() {
    if (!$('n_n')) return;
    var cv = $('nChart');
    function upd() {
      var n = parseInt($('n_n').value, 10);
      var sc = parseInt($('n_sc').value, 10);
      txt($('n_nO'), String(n));
      txt($('n_scO'), sc ? '是' : '否');

      var score = 0.90 - 0.18 * (n - 2);
      if (!sc) score -= 0.25;
      if (score < 0) score = 0;
      if (score > 1) score = 1;

      var tool, uniq, next, color;
      if (n <= 2 && sc) {
        tool = '直觉标准 IC';
        uniq = '常唯一 Riley';
        next = '保持 IC 即可';
        color = C.green;
      } else if (score >= 0.5) {
        tool = 'IC 为主 · 备 D1';
        uniq = '可能仍多';
        next = '先跑 IC，残留再用 D1';
        color = C.amber;
      } else {
        tool = 'D1 / Divinity';
        uniq = 'IC 往往不够';
        next = '直接上 D1';
        color = C.red;
      }

      txt($('n_tool'), tool);
      txt($('n_uniq'), uniq);
      txt($('n_score'), score.toFixed(2));
      txt($('n_next'), next);
      tint($('n_tool'), color);
      tint($('n_score'), color);

      var msg = '教学启发式：score = 0.90 − 0.18×(n−2)' + (sc ? '' : ' − 0.25') +
        ' = ' + score.toFixed(2) + '。非定理；两类型单调信号是 IC 的主场。';
      txt($('n_vh'), msg);
      tint($('n_vh'), color);

      bars(cv, [
        { lab: 'n', v: n, c: C.blue, labN: String(n) },
        { lab: 'IC力度', v: score, c: color },
        { lab: '单交叉', v: sc ? 1 : 0, c: sc ? C.green : C.red, labN: sc ? '1' : '0' },
        { lab: 'D1需求', v: Math.max(0, 1 - score), c: C.amber }
      ], 0, Math.max(6, n) * 0.2 + 1, '评分 / 类型数');
    }
    bind(['n_n', 'n_sc'], upd);
    upd();
  })();
})();
