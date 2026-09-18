/* ============================================================
   《机制设计（Mechanism Design）：反向博弈论》主题脚本
   四个可调模型：
     1. 二价拍卖 · 说真话激励
     2. Myerson 保留价 · 期望收入
     3. VCG 公共品 · Clarke 支付
     4. Bulow–Klemperer · 多一人 vs 最优保留价
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

  /* ---------- 1. Vickrey ---------- */
  function vickreyUtil(v, b, s) {
    if (b > s) return { win: true, pay: s, u: v - s };
    if (b < s) return { win: false, pay: 0, u: 0 };
    // tie: treat as win with pay s (conservative display)
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
    if (gap > 0.01) {
      txt(vh, '判定：当前出价优于说真话 — 检查是否平局边界；一般应 ≤0');
      tint(vh, C.amber);
    } else if (Math.abs(gap) < 0.01 && b === v) {
      txt(vh, '判定：说真话 · 效用缺口 0 · DSIC 成立');
      tint(vh, C.green);
    } else if (gap < -0.01) {
      txt(vh, '判定：假话吃亏 ' + (-gap).toFixed(0) + ' · 应回到 b=v');
      tint(vh, C.red);
    } else {
      txt(vh, '判定：效用与说真话相同（可能未改变胜负）');
      tint(vh, C.blue);
    }
    var items = [
      { lab: '当前效用', v: cur.u, c: C.blue, dp: 0 },
      { lab: '真话效用', v: truth.u, c: C.green, dp: 0 },
      { lab: '支付', v: cur.pay, c: C.amber, dp: 0 }
    ];
    items._axis = '效用 / 支付';
    bars($('vkChart'), items, Math.min(0, cur.u, truth.u) - 5, Math.max(cur.u, truth.u, cur.pay, 10) + 5);
  }

  /* ---------- 2. Myerson SPA + reserve ---------- */
  function spaRev(n, r, trials) {
    trials = trials || 40000;
    var sum = 0, i, j, vs, hi, lo;
    for (i = 0; i < trials; i++) {
      vs = [];
      for (j = 0; j < n; j++) vs.push(Math.random());
      vs.sort(function (a, b) { return b - a; });
      hi = vs[0];
      lo = n >= 2 ? vs[1] : 0;
      if (hi < r) sum += 0;
      else if (n === 1) sum += r;
      else if (lo >= r) sum += lo;
      else sum += r;
    }
    return sum / trials;
  }
  var myCache = {};
  function spaRevCached(n, r) {
    var key = n + ':' + r.toFixed(2);
    if (myCache[key] == null) myCache[key] = spaRev(n, r, 50000);
    return myCache[key];
  }
  function updMy() {
    var n = +($('my_n') && $('my_n').value);
    var r = +($('my_r') && $('my_r').value);
    txt($('my_nO'), String(n));
    txt($('my_rO'), r.toFixed(2));
    var rev = spaRevCached(n, r);
    var r0 = spaRevCached(n, 0);
    var lift = r0 > 1e-9 ? (rev - r0) / r0 * 100 : 0;
    var phi = 2 * r - 1;
    txt($('my_rev'), rev.toFixed(3));
    txt($('my_r0'), r0.toFixed(3));
    txt($('my_lift'), (lift >= 0 ? '+' : '') + lift.toFixed(1) + '%');
    txt($('my_phi'), phi.toFixed(2));
    var vh = $('my_vh');
    if (Math.abs(r - 0.5) < 0.015 && n >= 1) {
      txt(vh, '判定：r≈0.5 使 φ(r)=0 · 规则分布下收入最优保留价');
      tint(vh, C.green);
    } else if (phi < 0) {
      txt(vh, '判定：φ(r)<0 · 保留价偏低，低类型仍可能成交');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：φ(r)>0 · 保留价偏高侧，成交率下降换单笔抽成');
      tint(vh, C.blue);
    }
    var items = [
      { lab: '当前E[收入]', v: rev, c: C.blue },
      { lab: 'r=0对照', v: r0, c: C.ink3 },
      { lab: 'φ(r)', v: phi, c: phi >= 0 ? C.green : C.red }
    ];
    items._axis = '期望收入 / 虚拟值';
    bars($('myChart'), items, Math.min(0, phi) - 0.05, Math.max(rev, r0, 0.55) + 0.05);
  }

  /* ---------- 3. VCG public good ---------- */
  function updVc() {
    var v1 = +($('vc_v1') && $('vc_v1').value);
    var v2 = +($('vc_v2') && $('vc_v2').value);
    var C0 = +($('vc_c') && $('vc_c').value);
    txt($('vc_v1O'), v1.toFixed(1));
    txt($('vc_v2O'), v2.toFixed(1));
    txt($('vc_cO'), C0.toFixed(1));
    var build = (v1 + v2) >= C0;
    var p1 = build ? Math.max(0, C0 - v2) : 0;
    var p2 = build ? Math.max(0, C0 - v1) : 0;
    var sur = build ? (v1 + v2 - C0) : 0;
    var sump = p1 + p2;
    txt($('vc_build'), build ? '是' : '否');
    txt($('vc_pay'), p1.toFixed(1) + ' / ' + p2.toFixed(1));
    txt($('vc_sur'), sur.toFixed(1));
    txt($('vc_sum'), sump.toFixed(1));
    var vh = $('vc_vh');
    if (!build) {
      txt(vh, '判定：不建造 · 社会剩余 0 · 支付全 0');
      tint(vh, C.ink3);
    } else if (sump + 1e-9 < C0) {
      txt(vh, '判定：建造 · 支付合计 ' + sump.toFixed(1) + ' < 成本 ' + C0.toFixed(1) + ' · 预算缺口需补贴');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：建造 · Clarke 支付覆盖成本 · 效率+DSIC');
      tint(vh, C.green);
    }
    var items = [
      { lab: 'p₁', v: p1, c: C.blue },
      { lab: 'p₂', v: p2, c: C.blue },
      { lab: '剩余', v: sur, c: C.green },
      { lab: '成本C', v: C0, c: C.amber }
    ];
    items._axis = '支付 / 剩余 / 成本';
    bars($('vcChart'), items, 0, Math.max(C0, sur, p1, p2, 1) * 1.15);
  }

  /* ---------- 4. Bulow-Klemperer ---------- */
  function updBk() {
    var n = +($('bk_n') && $('bk_n').value);
    txt($('bk_nO'), String(n));
    var opt = spaRevCached(n, 0.5);
    var more = spaRevCached(n + 1, 0);
    var diff = more - opt;
    txt($('bk_opt'), opt.toFixed(3));
    txt($('bk_more'), more.toFixed(3));
    txt($('bk_diff'), (diff >= 0 ? '+' : '') + diff.toFixed(3));
    var rec = diff >= 0 ? '优先扩场' : '精修保留价';
    txt($('bk_rec'), rec);
    var vh = $('bk_vh');
    if (diff >= 0) {
      txt(vh, '判定：n+1 无保留价 ≥ n 人 r=0.5 · 扩场杠杆更强');
      tint(vh, C.green);
    } else {
      txt(vh, '判定：此参数下最优保留价略优 · 检查模拟噪声或扩场成本');
      tint(vh, C.amber);
    }
    var items = [
      { lab: 'n人·r=0.5', v: opt, c: C.blue },
      { lab: 'n+1·r=0', v: more, c: C.green },
      { lab: '差额', v: diff, c: diff >= 0 ? C.green : C.red }
    ];
    items._axis = '期望收入';
    bars($('bkChart'), items, Math.min(0, diff) - 0.05, Math.max(opt, more) + 0.08);
  }

  function boot() {
    bind(['vk_v', 'vk_b', 'vk_s'], updVk);
    bind(['my_n', 'my_r'], updMy);
    bind(['vc_v1', 'vc_v2', 'vc_c'], updVc);
    bind(['bk_n'], updBk);
    updVk();
    updMy();
    updVc();
    updBk();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
