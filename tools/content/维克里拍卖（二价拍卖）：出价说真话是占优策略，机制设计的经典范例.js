/* ============================================================
   《维克里拍卖（二价拍卖）》主题脚本
   四个可调模型：
     1. 占优 · 说真话（dom）
     2. 期望收益 · 竞争人数（rev）
     3. VCG 外生性 = 二价（vcg）
     4. 卖方幽灵标（sh）
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

  function spaOutcome(v, b, s) {
    if (b > s) return { win: true, pay: s, u: v - s };
    return { win: false, pay: 0, u: 0 };
  }

  /* ---------- 1. Dominance ---------- */
  function updDom() {
    var v = +($('dom_v') && $('dom_v').value) || 80;
    var b = +($('dom_b') && $('dom_b').value);
    var s = +($('dom_s') && $('dom_s').value);
    txt($('dom_vO'), String(v));
    txt($('dom_bO'), String(b));
    txt($('dom_sO'), String(s));
    var cur = spaOutcome(v, b, s);
    var truth = spaOutcome(v, v, s);
    var gap = cur.u - truth.u;
    txt($('dom_res'), cur.win ? '获胜' : '未获胜');
    txt($('dom_pay'), cur.pay + ' / ' + cur.u);
    txt($('dom_truth'), String(truth.u));
    txt($('dom_gap'), (gap >= 0 ? '+' : '') + gap);
    if (gap < 0) {
      txt($('dom_vh'), '判定：假话严格更差 · 被真话弱占优');
      tint($('dom_vh'), C.red);
    } else if (b === v) {
      txt($('dom_vh'), '判定：b=v 真话 · 弱占优策略（本局效用最优）');
      tint($('dom_vh'), C.green);
    } else {
      txt($('dom_vh'), '判定：假话本局效用未更差，但存在其他 s 使假话吃亏');
      tint($('dom_vh'), C.amber);
    }
    var items = [
      { lab: '假话效用', v: cur.u, c: C.amber, dp: 0 },
      { lab: '真话效用', v: truth.u, c: C.green, dp: 0 },
      { lab: '缺口', v: gap, c: gap < 0 ? C.red : C.blue, dp: 0 }
    ];
    items._axis = '效用';
    bars($('domChart'), items, Math.min(-5, gap - 5, cur.u - 5), Math.max(40, truth.u + 10, cur.u + 10));
  }

  /* ---------- 2. Revenue ---------- */
  function updRev() {
    var n = +($('rev_n') && $('rev_n').value) || 5;
    txt($('rev_nO'), String(n));
    var R = (n - 1) / (n + 1);
    var Emax = n / (n + 1);
    var rent = Emax - R;
    txt($('rev_R'), R.toFixed(4));
    txt($('rev_max'), Emax.toFixed(4));
    txt($('rev_rent'), rent.toFixed(4));
    txt($('rev_ret'), '相同');
    txt($('rev_vh'), '判定：R=(n−1)/(n+1) · 与一价 BNE 期望收益锁定（RET）');
    tint($('rev_vh'), C.green);
    var items = [
      { lab: 'E[次高]=R', v: R, c: C.green, dp: 4 },
      { lab: 'E[最高]', v: Emax, c: C.blue, dp: 4 },
      { lab: '信息租金', v: rent, c: C.amber, dp: 4 }
    ];
    items._axis = '期望值（U[0,1]）';
    bars($('revChart'), items, 0, 1.05);
  }

  /* ---------- 3. VCG = second price ---------- */
  function updVcg() {
    var a = +($('vcg_a') && $('vcg_a').value) || 100;
    var b = +($('vcg_b') && $('vcg_b').value) || 70;
    var c = +($('vcg_c') && $('vcg_c').value) || 40;
    txt($('vcg_aO'), String(a));
    txt($('vcg_bO'), String(b));
    txt($('vcg_cO'), String(c));
    var arr = [
      { name: 'A', v: a },
      { name: 'B', v: b },
      { name: 'C', v: c }
    ];
    arr.sort(function (x, y) { return y.v - x.v; });
    var win = arr[0];
    var second = arr[1].v;
    var u = win.v - second;
    txt($('vcg_win'), win.name);
    txt($('vcg_pay'), String(second));
    txt($('vcg_u'), String(u));
    txt($('vcg_sw'), String(win.v));
    txt($('vcg_vh'), '判定：VCG 外生性支付 = 次高估值 = 二价 · 有效配置给 ' + win.name);
    tint($('vcg_vh'), C.green);
    var items = [
      { lab: 'A', v: a, c: win.name === 'A' ? C.green : C.blue, dp: 0 },
      { lab: 'B', v: b, c: win.name === 'B' ? C.green : C.blue, dp: 0 },
      { lab: 'C', v: c, c: win.name === 'C' ? C.green : C.blue, dp: 0 },
      { lab: '支付', v: second, c: C.amber, dp: 0 }
    ];
    items._axis = '估值 / 支付';
    bars($('vcgChart'), items, 0, Math.max(160, a, b, c) + 10);
  }

  /* ---------- 4. Shill / phantom bid ---------- */
  function updShill() {
    var v = +($('sh_v') && $('sh_v').value) || 80;
    var b = +($('sh_b') && $('sh_b').value) || 80;
    var s = +($('sh_s') && $('sh_s').value) || 55;
    var f = +($('sh_f') && $('sh_f').value) || 70;
    txt($('sh_vO'), String(v));
    txt($('sh_bO'), String(b));
    txt($('sh_sO'), String(s));
    txt($('sh_fO'), String(f));
    var honest = spaOutcome(v, b, s);
    var eff = Math.max(s, f);
    var cheated = spaOutcome(v, b, eff);
    var drain = honest.u - cheated.u;
    txt($('sh_uh'), String(honest.u));
    txt($('sh_uc'), String(cheated.u));
    txt($('sh_drain'), String(drain));
    txt($('sh_eff'), String(eff));
    if (drain > 0) {
      txt($('sh_vh'), '判定：幽灵标抽走租金 ' + drain + ' · 真话激励的前提（支付由真实竞争决定）被破坏');
      tint($('sh_vh'), C.red);
    } else if (f <= s) {
      txt($('sh_vh'), '判定：幽灵标 ≤ 真实次高 · 本局无额外伤害');
      tint($('sh_vh'), C.green);
    } else {
      txt($('sh_vh'), '判定：抬价未改变本局效用（可能因已输掉）');
      tint($('sh_vh'), C.amber);
    }
    var items = [
      { lab: '诚实效用', v: honest.u, c: C.green, dp: 0 },
      { lab: '被骗效用', v: cheated.u, c: C.amber, dp: 0 },
      { lab: '被抽走', v: drain, c: C.red, dp: 0 }
    ];
    items._axis = '效用';
    bars($('shChart'), items, Math.min(-5, cheated.u - 5), Math.max(40, honest.u + 10));
  }

  function boot() {
    bind(['dom_v', 'dom_b', 'dom_s'], updDom);
    bind(['rev_n'], updRev);
    bind(['vcg_a', 'vcg_b', 'vcg_c'], updVcg);
    bind(['sh_v', 'sh_b', 'sh_s', 'sh_f'], updShill);
    updDom();
    updRev();
    updVcg();
    updShill();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
