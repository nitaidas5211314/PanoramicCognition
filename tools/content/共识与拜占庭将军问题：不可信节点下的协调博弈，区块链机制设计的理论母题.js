/* ============================================================
   《共识与拜占庭将军问题》主题脚本
   四个可调模型：
     1. 口头消息阈值 n≥3f+1
     2. OM(m) 消息复杂度
     3. Nakamoto 确认深度 (q/p)^k
     4. 安全预算 1/3 vs 1/2
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
      ctx.fillText(v >= 1000 ? v.toFixed(0) : (Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2)), pl - 6, y + 3);
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
      var lab = (typeof it.v === 'number'
        ? (it.fmt ? it.fmt(it.v) : it.v.toFixed(it.dp != null ? it.dp : 2))
        : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }

  function omMsgs(n, m) {
    n = Math.max(1, Math.floor(n));
    m = Math.max(0, Math.floor(m));
    if (m === 0) return n - 1;
    if (n <= 1) return 0;
    var s = n - 1;
    for (var i = 0; i < n - 1; i++) s += omMsgs(n - 1, m - 1);
    return s;
  }
  function fmtInt(x) {
    if (x >= 1e6) return (x / 1e6).toFixed(2) + 'M';
    if (x >= 1e4) return (x / 1e3).toFixed(1) + 'k';
    return String(Math.round(x));
  }

  /* ---------- 1. Threshold ---------- */
  function updThr() {
    var f = +(($('thr_f') && $('thr_f').value) || 0);
    var n = +(($('thr_n') && $('thr_n').value) || 1);
    var nmin = 3 * f + 1;
    var q = 2 * f + 1;
    var fmax = Math.floor((n - 1) / 3);
    txt($('thr_fO'), String(f));
    txt($('thr_nO'), String(n));
    txt($('thr_nmin'), String(nmin));
    txt($('thr_q'), String(q));
    txt($('thr_fmax'), String(Math.max(0, fmax)));
    var ok = n >= nmin;
    var vh = $('thr_vh');
    if (ok) {
      txt(vh, 'n=' + n + ' ≥ 3·' + f + '+1=' + nmin + ' → 口头消息模型下可解；法定人数 ' + q + '，任意两法定人数相交于至少 1 名忠诚者');
      tint(vh, C.green);
    } else {
      txt(vh, 'n=' + n + ' < n*=' + nmin + ' → 口头消息下无解；一个叛徒即可在边界情形制造忠诚者分歧');
      tint(vh, C.red);
    }
    bars($('thrChart'), [
      { lab: 'n*', v: nmin, c: C.blue, dp: 0 },
      { lab: 'n 实际', v: n, c: ok ? C.green : C.red, dp: 0 },
      { lab: '2f+1', v: q, c: C.amber, dp: 0 },
      { lab: 'f_max(n)', v: Math.max(0, fmax), c: C.ink2, dp: 0 }
    ], 0, Math.max(nmin, n, q, 4) * 1.15);
  }

  /* ---------- 2. OM messages ---------- */
  function updOm() {
    var m = +(($('om_m') && $('om_m').value) || 0);
    var n = +(($('om_n') && $('om_n').value) || 1);
    txt($('om_mO'), String(m));
    txt($('om_nO'), String(n));
    var msgs = omMsgs(n, m);
    var base = omMsgs(Math.max(n, 4), 1);
    var ratio = base > 0 ? msgs / base : 0;
    txt($('om_msgs'), fmtInt(msgs));
    var ok = n >= 3 * m + 1;
    txt($('om_ok'), ok ? '是' : '否');
    txt($('om_ratio'), ratio >= 100 ? ratio.toFixed(0) + '×' : ratio.toFixed(1) + '×');
    var vh = $('om_vh');
    if (!ok) {
      txt(vh, 'n=' + n + ' < 3m+1=' + (3 * m + 1) + ' → 即使算出消息数，口头 OM(m) 也不保证正确');
      tint(vh, C.red);
    } else {
      txt(vh, 'OM(' + m + ')、n=' + n + ' → ≈' + fmtInt(msgs) + ' 条；经典教学算法，生产上需 PBFT/HotStuff 类优化');
      tint(vh, msgs > 5000 ? C.amber : C.green);
    }
    var m0 = omMsgs(n, 0), m1 = omMsgs(n, Math.min(1, m)), m2 = omMsgs(n, Math.min(2, m)), cur = msgs;
    bars($('omChart'), [
      { lab: 'OM(0)', v: m0, c: C.ink3, dp: 0, fmt: fmtInt },
      { lab: 'OM(1)', v: omMsgs(n, 1), c: C.blue, dp: 0, fmt: fmtInt },
      { lab: 'OM(2)', v: omMsgs(n, 2), c: C.amber, dp: 0, fmt: fmtInt },
      { lab: '当前', v: cur, c: C.red, dp: 0, fmt: fmtInt }
    ], 0, Math.max(omMsgs(n, Math.max(m, 2)), 10) * 1.1);
  }

  /* ---------- 3. Nakamoto ---------- */
  function updNk() {
    var a = +(($('nk_a') && $('nk_a').value) || 0.3);
    var k = +(($('nk_k') && $('nk_k').value) || 6);
    var p = 1 - a;
    var r = a / p;
    var P = Math.pow(r, k);
    txt($('nk_aO'), a.toFixed(2));
    txt($('nk_kO'), String(k));
    txt($('nk_ratio'), r.toFixed(4));
    txt($('nk_p'), P < 1e-6 ? P.toExponential(2) : P.toFixed(6));
    var band = P >= 0.05 ? '高' : (P >= 0.01 ? '中' : '低');
    txt($('nk_band'), band);
    var vh = $('nk_vh');
    txt(vh, 'α=' + a.toFixed(2) + '、k=' + k + ' → P≈' + (P < 1e-6 ? P.toExponential(2) : P.toFixed(6)) + '；教学近似 (q/p)^k，不是比特币精确公式');
    tint(vh, band === '高' ? C.red : (band === '中' ? C.amber : C.green));
    var ks = [1, 3, 6, k, Math.min(30, k + 6)];
    var uniq = [];
    ks.forEach(function (x) { if (uniq.indexOf(x) < 0) uniq.push(x); });
    uniq.sort(function (x, y) { return x - y; });
    var items = uniq.map(function (kk) {
      return { lab: 'k=' + kk, v: Math.pow(r, kk), c: kk === k ? C.red : C.blue, dp: 6 };
    });
    items._axis = 'P≈(q/p)^k';
    var ymax = Math.max(items[0].v * 1.15, 0.01);
    bars($('nkChart'), items, 0, ymax);
  }

  /* ---------- 4. Budget ---------- */
  function updBud() {
    var a = +(($('bud_a') && $('bud_a').value) || 0.2);
    var bft = 1 / 3 - a;
    var nk = 0.5 - a;
    txt($('bud_aO'), a.toFixed(2));
    txt($('bud_bft'), bft.toFixed(3));
    txt($('bud_nk'), nk.toFixed(3));
    var st, col;
    if (a >= 0.5) { st = '双阈值外'; col = C.red; }
    else if (a >= 1 / 3) { st = '破 BFT、仍<1/2'; col = C.amber; }
    else { st = '双阈值内'; col = C.green; }
    txt($('bud_st'), st);
    var vh = $('bud_vh');
    if (a >= 0.5) {
      txt(vh, 'α=' + a.toFixed(2) + ' ≥ 1/2 → Nakamoto 启发式与经典 BFT 阈值均被突破');
    } else if (a >= 1 / 3) {
      txt(vh, 'α=' + a.toFixed(2) + ' ≥ 1/3 → 经典 BFT 安全叙事先破；若协议是 Nakamoto 族，仍可能有余量至 1/2');
    } else {
      txt(vh, 'α=' + a.toFixed(2) + '：低于 1/3 与 1/2 → 两类经典故事都仍有余量；α≥1/3 时经典 BFT 安全叙事先破');
    }
    tint(vh, col);
    bars($('budChart'), [
      { lab: 'α', v: a, c: C.red, dp: 2 },
      { lab: '1/3', v: 1 / 3, c: C.amber, dp: 3 },
      { lab: '1/2', v: 0.5, c: C.blue, dp: 2 },
      { lab: 'BFT余量', v: bft, c: bft >= 0 ? C.green : C.red, dp: 3 },
      { lab: 'NK余量', v: nk, c: nk >= 0 ? C.green : C.red, dp: 3 }
    ], Math.min(bft, nk, 0) - 0.05, 0.55);
  }

  function updAll() { updThr(); updOm(); updNk(); updBud(); }
  bind(['thr_f', 'thr_n'], updThr);
  bind(['om_m', 'om_n'], updOm);
  bind(['nk_a', 'nk_k'], updNk);
  bind(['bud_a'], updBud);
  updAll();
})();
