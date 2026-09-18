/* ============================================================
   《威胁点 / BATNA》主题脚本
   四个可调模型：
     1. ZOPA 探测器
     2. 威胁点抬升 → NBS 份额
     3. 外部选项原则（deal-me-out vs split-the-difference）
     4. 保留价校准
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
      ctx.fillText(v.toFixed(1), pl - 6, y + 3);
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
      ymin = Math.min.apply(null, vs.concat([0])) - 0.5;
      ymax = Math.max.apply(null, vs.concat([0])) + 0.5;
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
  function fmt1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function fmt2(x) { return (Math.round(x * 100) / 100).toFixed(2); }

  /* ---- 1. ZOPA ---- */
  function updZp() {
    var rs = +$('zp_rs').value, rb = +$('zp_rb').value;
    txt($('zp_rsO'), String(rs));
    txt($('zp_rbO'), String(rb));
    var w = rb - rs;
    var mid = (rs + rb) / 2;
    var ok = w >= 0;
    txt($('zp_w'), ok ? String(w) : String(w));
    txt($('zp_mid'), ok ? fmt1(mid) : '—');
    txt($('zp_st'), ok ? '有成交区间' : '无 ZOPA');
    var vh = $('zp_vh');
    if (ok) {
      txt(vh, '判定：Rs≤Rb → 存在 ZOPA；成交价应落在 [' + rs + ', ' + rb + ']，中点参考 ' + fmt1(mid));
      tint(vh, C.green);
    } else {
      txt(vh, '判定：Rs>Rb → 无重叠；应改议题、改善 BATNA，或各自走掉（勿硬压）');
      tint(vh, C.red);
    }
    var items = [
      { lab: 'Rs', v: rs, c: C.amber, dp: 0 },
      { lab: '中点', v: ok ? mid : 0, c: C.blue, dp: 1 },
      { lab: 'Rb', v: rb, c: C.green, dp: 0 },
      { lab: '宽度', v: w, c: ok ? C.blue : C.red, dp: 0 }
    ];
    items._axis = '价格 / 宽度';
    var ymin = Math.min(rs, rb, 0) - 5;
    var ymax = Math.max(rs, rb, Math.abs(w)) + 5;
    bars($('zpChart'), items, ymin, ymax);
  }

  /* ---- 2. Threat-point lift / NBS ---- */
  function updLf() {
    var pi = +$('lf_pi').value, d1 = +$('lf_d1').value, d2 = +$('lf_d2').value;
    txt($('lf_piO'), fmt1(pi));
    txt($('lf_d1O'), fmt1(d1));
    txt($('lf_d2O'), fmt1(d2));
    var s = pi - d1 - d2;
    var ok = s >= -1e-9;
    if (!ok) s = 0;
    var u1 = d1 + s / 2, u2 = d2 + s / 2;
    var half = pi / 2;
    txt($('lf_s'), fmt2(s));
    txt($('lf_u'), fmt2(u1) + ' / ' + fmt2(u2));
    txt($('lf_vs'), fmt2(u1 - half) + ' / ' + fmt2(u2 - half));
    var vh = $('lf_vh');
    if (!ok) {
      txt(vh, '判定：剩余为负，个人理性集为空，无协议');
      tint(vh, C.red);
    } else {
      txt(vh, '判定：抬高 d₁ 缩小剩余，但己方绝对份额通常上升（默认 20→40 时 +10）');
      tint(vh, C.green);
    }
    var items = [
      { lab: 'd₁', v: d1, c: C.amber, dp: 1 },
      { lab: 'u₁', v: u1, c: C.blue, dp: 2 },
      { lab: 'u₂', v: u2, c: C.green, dp: 2 },
      { lab: '剩余', v: s, c: ok ? C.ink2 : C.red, dp: 2 }
    ];
    items._axis = '效用 / 份额';
    bars($('lfChart'), items, 0, Math.max(pi, u1, u2) + 5);
  }

  /* ---- 3. Outside option principle ---- */
  function updOp() {
    var pi = +$('op_pi').value, e1 = +$('op_e1').value, e2 = +$('op_e2').value;
    txt($('op_piO'), fmt1(pi));
    txt($('op_e1O'), fmt1(e1));
    txt($('op_e2O'), fmt1(e2));
    var b1 = pi / 2, b2 = pi / 2;
    /* deal-me-out: start from equal split; if ei > bi, give ei and residual to other (efficient) */
    var d1 = b1, d2 = b2;
    if (e1 > b1 && e2 > b2) {
      /* both prefer outside — no interior deal better for both; mark infeasible-ish */
      d1 = e1; d2 = e2;
    } else if (e1 > b1) {
      d1 = e1; d2 = pi - e1;
    } else if (e2 > b2) {
      d2 = e2; d1 = pi - e2;
    }
    var dmoOk = d1 + d2 <= pi + 1e-9 && d1 >= e1 - 1e-9 && d2 >= e2 - 1e-9;
    /* split-the-difference: treat e as threat point */
    var sur = pi - e1 - e2;
    var stdOk = sur >= -1e-9;
    var s1 = stdOk ? e1 + sur / 2 : NaN;
    var s2 = stdOk ? e2 + sur / 2 : NaN;

    txt($('op_base'), fmt2(b1) + ' / ' + fmt2(b2));
    txt($('op_dmo'), dmoOk ? fmt2(d1) + ' / ' + fmt2(d2) : '无可行协议');
    txt($('op_std'), stdOk ? fmt2(s1) + ' / ' + fmt2(s2) : '剩余为负');

    var vh = $('op_vh');
    if (e1 <= b1 && e2 <= b2) {
      txt(vh, '判定：外部选项均不超过无选项均衡 → deal-me-out 与基准相同（选项「不咬住」）');
      tint(vh, C.blue);
    } else if (dmoOk && stdOk) {
      txt(vh, '判定：选项咬住后，deal-me-out 与 split-the-difference 分差可达 ' +
        fmt2(Math.abs(s1 - d1)) + '（默认 15）——混用会系统性误判份额');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：外部选项过高，检查是否真有共同剩余可分');
      tint(vh, C.red);
    }

    var items = [
      { lab: '基准1', v: b1, c: C.ink3, dp: 2 },
      { lab: 'DMO1', v: dmoOk ? d1 : 0, c: C.blue, dp: 2 },
      { lab: 'STD1', v: stdOk ? s1 : 0, c: C.amber, dp: 2 },
      { lab: 'DMO2', v: dmoOk ? d2 : 0, c: C.green, dp: 2 }
    ];
    items._axis = '方1/方2 份额';
    bars($('opChart'), items, 0, pi + 5);
  }

  /* ---- 4. Reservation calibration ---- */
  function updRs() {
    var b = +$('rs_b').value, c = +$('rs_c').value, a = +$('rs_a').value, o = +$('rs_o').value;
    txt($('rs_bO'), fmt1(b));
    txt($('rs_cO'), fmt1(c));
    txt($('rs_aO'), fmt1(a));
    txt($('rs_oO'), fmt1(o));
    /* 求职：更高更好 → R = BATNA + 转换成本 + 调整；报价需 ≥ R */
    var R = b + c + a;
    var gap = o - R;
    txt($('rs_r'), fmt1(R));
    txt($('rs_gap'), fmt1(gap));
    var accept = gap >= -1e-9;
    txt($('rs_dec'), accept ? '可接受（≥保留价）' : '应拒绝或再谈');
    var vh = $('rs_vh');
    if (accept) {
      txt(vh, '判定：报价 ' + fmt1(o) + ' ≥ 保留价 ' + fmt1(R) + ' → 相对 BATNA 不亏（仍可继续要目标价）');
      tint(vh, C.green);
    } else {
      txt(vh, '判定：报价低于保留价 ' + fmt1(-gap) + ' → 执行 BATNA 更优（默认 70 vs 75）');
      tint(vh, C.red);
    }
    var items = [
      { lab: 'BATNA', v: b, c: C.ink3, dp: 1 },
      { lab: 'R', v: R, c: C.amber, dp: 1 },
      { lab: '报价', v: o, c: accept ? C.green : C.red, dp: 1 },
      { lab: '差额', v: gap, c: accept ? C.blue : C.red, dp: 1 }
    ];
    items._axis = '货币单位';
    var ymin = Math.min(b, R, o, gap, 0) - 2;
    var ymax = Math.max(b, R, o, Math.abs(gap)) + 2;
    bars($('rsChart'), items, ymin, ymax);
  }

  function refreshAll() {
    updZp(); updLf(); updOp(); updRs();
  }

  bind(['zp_rs', 'zp_rb'], updZp);
  bind(['lf_pi', 'lf_d1', 'lf_d2'], updLf);
  bind(['op_pi', 'op_e1', 'op_e2'], updOp);
  bind(['rs_b', 'rs_c', 'rs_a', 'rs_o'], updRs);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshAll);
  } else {
    refreshAll();
  }
})();
