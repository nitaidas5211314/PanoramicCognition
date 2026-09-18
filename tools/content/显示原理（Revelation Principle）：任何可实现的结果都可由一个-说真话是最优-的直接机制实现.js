/* ============================================================
   《显示原理（Revelation Principle）》主题脚本
   四个可调模型：
     1. 一价 → 直接机制编译器
     2. 二价 · DSIC
     3. 两类型 IC 松弛
     4. 误报成本 · 有效真话区
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
      var lab = (typeof it.v === 'number' ? it.v.toFixed(it.dp != null ? it.dp : 3) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }

  /* ---------- 1. FPA compiler ---------- */
  function euFpa(r, v) {
    // 2 bidders uniform[0,1], direct mech simulating b(x)=x/2
    // EU(r|v) = ∫_0^r (v - r/2) dx = r*(v - r/2)
    return r * (v - r / 2);
  }
  function updCp() {
    var v = +($('cp_v') && $('cp_v').value);
    var r = +($('cp_r') && $('cp_r').value);
    txt($('cp_vO'), v.toFixed(2));
    txt($('cp_rO'), r.toFixed(2));
    var eu = euFpa(r, v);
    var truth = euFpa(v, v);
    var gap = eu - truth;
    var bid = r / 2;
    txt($('cp_eu'), eu.toFixed(3));
    txt($('cp_truth'), truth.toFixed(3));
    txt($('cp_gap'), (gap >= 0 ? '+' : '') + gap.toFixed(3));
    txt($('cp_bid'), bid.toFixed(2));
    var vh = $('cp_vh');
    if (Math.abs(r - v) < 0.015) {
      txt(vh, '判定：r≈v · 编译后说真话 BIC · 缺口≈0');
      tint(vh, C.green);
    } else if (gap < -0.001) {
      txt(vh, '判定：假话吃亏 ' + (-gap).toFixed(3) + ' · 应回到 r=v（显示原理构造）');
      tint(vh, C.red);
    } else if (gap > 0.001) {
      txt(vh, '判定：异常：假话更优 — 检查边界或公式');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：效用与真话相同');
      tint(vh, C.blue);
    }
    var items = [
      { lab: '当前EU', v: eu, c: C.blue },
      { lab: '真话EU', v: truth, c: C.green },
      { lab: '代出价', v: bid, c: C.amber }
    ];
    items._axis = '期望效用 / 出价';
    bars($('cpChart'), items, Math.min(0, eu, truth, bid) - 0.05, Math.max(eu, truth, bid, 0.35) + 0.05);
  }

  /* ---------- 2. Vickrey ---------- */
  function vickreyUtil(v, b, s) {
    if (b > s) return { win: true, pay: s, u: v - s };
    if (b < s) return { win: false, pay: 0, u: 0 };
    return { win: true, pay: s, u: v - s };
  }
  function updVk() {
    var v = +($('vk_v') && $('vk_v').value);
    var b = +($('vk_b') && $('vk_b').value);
    var s = +($('vk_s') && $('vk_s').value);
    txt($('vk_vO'), String(v));
    txt($('vk_bO'), String(b));
    txt($('vk_sO'), String(s));
    var cur = vickreyUtil(v, b, s);
    var truth = vickreyUtil(v, v, s);
    var gap = cur.u - truth.u;
    txt($('vk_res'), cur.win ? '获胜' : '落败');
    txt($('vk_pay'), cur.pay.toFixed(0) + ' / ' + cur.u.toFixed(0));
    txt($('vk_truth'), truth.u.toFixed(0));
    txt($('vk_gap'), (gap >= 0 ? '+' : '') + gap.toFixed(0));
    var vh = $('vk_vh');
    if (gap < -0.01) {
      txt(vh, '判定：假话吃亏 ' + (-gap).toFixed(0) + ' · DSIC：回到 b=v');
      tint(vh, C.red);
    } else if (Math.abs(gap) < 0.01 && b === v) {
      txt(vh, '判定：说真话 · 效用缺口 0 · 占优策略激励相容');
      tint(vh, C.green);
    } else if (Math.abs(gap) < 0.01) {
      txt(vh, '判定：效用与说真话相同（未改变胜负）');
      tint(vh, C.blue);
    } else {
      txt(vh, '判定：检查平局边界；一般假话不应严格更优');
      tint(vh, C.amber);
    }
    var items = [
      { lab: '当前效用', v: cur.u, c: C.blue, dp: 0 },
      { lab: '真话效用', v: truth.u, c: C.green, dp: 0 },
      { lab: '支付', v: cur.pay, c: C.amber, dp: 0 }
    ];
    items._axis = '效用 / 支付';
    bars($('vkChart'), items, Math.min(0, cur.u, truth.u) - 5, Math.max(cur.u, truth.u, cur.pay, 10) + 5);
  }

  /* ---------- 3. Two-type IC ---------- */
  function updIc() {
    var thL = +($('ic_thL') && $('ic_thL').value);
    var thH = +($('ic_thH') && $('ic_thH').value);
    var qL = +($('ic_qL') && $('ic_qL').value);
    var qH = +($('ic_qH') && $('ic_qH').value);
    var tL = +($('ic_tL') && $('ic_tL').value);
    var tH = +($('ic_tH') && $('ic_tH').value);
    txt($('ic_thLO'), thL.toFixed(1));
    txt($('ic_thHO'), thH.toFixed(1));
    txt($('ic_qLO'), qL.toFixed(2));
    txt($('ic_qHO'), qH.toFixed(2));
    txt($('ic_tLO'), tL.toFixed(2));
    txt($('ic_tHO'), tH.toFixed(2));
    var uH = thH * qH - tH;
    var uL = thL * qL - tL;
    var uHmim = thH * qL - tL;
    var uLmim = thL * qH - tH;
    var slackH = uH - uHmim;
    var slackL = uL - uLmim;
    var ok = slackH >= -1e-9 && slackL >= -1e-9;
    txt($('ic_h'), slackH.toFixed(2));
    txt($('ic_l'), slackL.toFixed(2));
    txt($('ic_u'), uH.toFixed(2) + ' / ' + uL.toFixed(2));
    txt($('ic_ok'), ok ? '是' : '否');
    var vh = $('ic_vh');
    if (ok) {
      txt(vh, '判定：两条 IC 松弛均 ≥0 · 该直接菜单激励相容');
      tint(vh, C.green);
    } else if (slackH < 0 && slackL < 0) {
      txt(vh, '判定：高低类型都想模仿对方 · 菜单崩溃');
      tint(vh, C.red);
    } else if (slackH < 0) {
      txt(vh, '判定：IC-H 破 · 高类型想选低套餐 · 降 t_H 或升 q_H−q_L');
      tint(vh, C.red);
    } else {
      txt(vh, '判定：IC-L 破 · 低类型想选高套餐 · 降 q_H 或调支付');
      tint(vh, C.amber);
    }
    var items = [
      { lab: 'IC-H', v: slackH, c: slackH >= 0 ? C.green : C.red },
      { lab: 'IC-L', v: slackL, c: slackL >= 0 ? C.green : C.red },
      { lab: 'U_H', v: uH, c: C.blue },
      { lab: 'U_L', v: uL, c: C.amber }
    ];
    items._axis = '松弛 / 效用';
    var ymin = Math.min(0, slackH, slackL, uH, uL) - 0.3;
    var ymax = Math.max(0, slackH, slackL, uH, uL) + 0.3;
    bars($('icChart'), items, ymin, ymax);
  }

  /* ---------- 4. Misreport cost ---------- */
  function updMc() {
    var v = +($('mc_v') && $('mc_v').value);
    var r = +($('mc_r') && $('mc_r').value);
    var c = +($('mc_c') && $('mc_c').value);
    txt($('mc_vO'), v.toFixed(2));
    txt($('mc_rO'), r.toFixed(2));
    txt($('mc_cO'), c.toFixed(2));
    var eu = euFpa(r, v);
    var cost = c * Math.abs(r - v);
    var net = eu - cost;
    var truthNet = euFpa(v, v); // truth cost 0
    var gap = net - truthNet;
    txt($('mc_eu'), eu.toFixed(3));
    txt($('mc_cost'), cost.toFixed(3));
    txt($('mc_net'), net.toFixed(3));
    txt($('mc_gap'), (gap >= 0 ? '+' : '') + gap.toFixed(3));
    var vh = $('mc_vh');
    if (Math.abs(r - v) < 0.015) {
      txt(vh, '判定：说真话 · 无误报成本 · 净效用最大候选');
      tint(vh, C.green);
    } else if (gap < -0.001) {
      txt(vh, '判定：假话净缺口 ' + gap.toFixed(3) + ' · 成本强化真话（示意）');
      tint(vh, C.red);
    } else if (gap > 0.001) {
      txt(vh, '判定：成本结构下假话净更优 — 提示：标准无成本显示原理假设已偏离');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：净效用与真话持平');
      tint(vh, C.blue);
    }
    var items = [
      { lab: 'EU毛利', v: eu, c: C.blue },
      { lab: '误报成本', v: cost, c: C.red },
      { lab: '净效用', v: net, c: C.green },
      { lab: '真话净', v: truthNet, c: C.amber }
    ];
    items._axis = '效用 / 成本';
    bars($('mcChart'), items, Math.min(0, eu, cost, net, truthNet) - 0.05, Math.max(eu, cost, net, truthNet, 0.35) + 0.05);
  }

  function boot() {
    bind(['cp_v', 'cp_r'], updCp);
    bind(['vk_v', 'vk_b', 'vk_s'], updVk);
    bind(['ic_thL', 'ic_thH', 'ic_qL', 'ic_qH', 'ic_tL', 'ic_tH'], updIc);
    bind(['mc_v', 'mc_r', 'mc_c'], updMc);
    updCp();
    updVk();
    updIc();
    updMc();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
