/* ============================================================
   《声誉模型（Kreps-Wilson）》主题脚本
   四个可调模型（滑块都进入计算）：
     1. 弱在位者序贯均衡支付 vs 完全信息基准 0
     2. 被挑战时战斗的净收益，以及严格值得战斗的最小剩余期数
     3. Fudenberg–Levine 标准化支付下界 vs 极小最大 0 与斯塔克尔伯格 a
     4. 贴现因子相对 1/a 与 1/(a+1) 的体制
   支付归一与 Kreps & Wilson (1982, JET) 图 1 一致：
   退出得 a，默许得 0，战斗得 −1；进入者无差异当 P(战)=b。
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
  function near(x, y) {
    return Math.abs(x - y) <= 1e-8 * Math.max(1, Math.abs(y));
  }
  function kOf(p, b) {
    if (!(p > 0) || !(b > 0) || !(b < 1)) return Infinity;
    var n = 1, bn = b;
    while (bn >= p - 1e-12 && n < 8000) { n++; bn *= b; }
    return n;
  }
  function V(n, p, a, b, memo) {
    var key = n + '|' + p.toExponential(10);
    if (memo[key] !== undefined) return memo[key];
    var val;
    if (n <= 0 || p <= 1e-15) val = 0;
    else if (n === 1) {
      if (p > b + 1e-10) val = a;
      else if (p < b - 1e-10) val = 0;
      else val = 1;
    } else {
      var bn = Math.pow(b, n);
      var bnm1 = Math.pow(b, n - 1);
      if (p > bn + 1e-10) val = a + V(n - 1, p, a, b, memo);
      else if (p < bn - 1e-10) {
        if (p > bnm1 + 1e-10) val = -1 + V(n - 1, p, a, b, memo);
        else val = 0;
      } else val = (1 / a) * (a + V(n - 1, p, a, b, memo));
    }
    memo[key] = val;
    return val;
  }
  function fightNet(n, p, a, b) {
    if (n <= 1) return { net: -1, cont: 0, mode: '最后一期必让', pp: 0 };
    var bnm1 = Math.pow(b, n - 1);
    var pp, mode;
    if (p <= 1e-15) { pp = 0; mode = '已知软弱'; }
    else if (p + 1e-12 >= bnm1) { pp = p; mode = '纯策略战斗'; }
    else { pp = bnm1; mode = '无差异混合'; }
    var cont = V(n - 1, pp, a, b, {});
    return { net: -1 + cont, cont: cont, mode: mode, pp: pp };
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
  function bars(cv, vals, ymin, ymax, xlab) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 22, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    var span = (ymax - ymin) || 1;
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    if (ymin < 0 && ymax > 0) {
      var y0 = y1 - ((0 - ymin) / span) * bh;
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, y0);
      ctx.lineTo(w - 16, y0);
      ctx.stroke();
    }
    var barW = bw / (vals.length * 1.55);
    vals.forEach(function (o, i) {
      var x = pl + (i + 0.5) * (bw / vals.length) - barW / 2;
      var yBase = y1 - ((0 - ymin) / span) * bh;
      var yv = y1 - ((o.v - ymin) / span) * bh;
      var top = Math.min(yBase, yv), ht = Math.abs(yBase - yv);
      ctx.fillStyle = o.c;
      ctx.fillRect(x, top, barW, Math.max(ht, 1));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      var lab = o.v.toFixed(o.d != null ? o.d : 2);
      var tw = ctx.measureText(lab).width;
      var lx = Math.max(pl + tw / 2, Math.min(x + barW / 2, w - 8 - tw / 2));
      var ly = o.v >= 0 ? Math.max(yv - 6, pt + 11) : Math.min(yv + 13, y1 - 2);
      ctx.fillText(lab, lx, ly);
      ctx.fillStyle = C.ink2;
      ctx.font = '10px sans-serif';
      var lines = (o.lab || '').split('\n');
      lines.forEach(function (ln, j) {
        ctx.fillText(ln, x + barW / 2, y1 + 13 + j * 11);
      });
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(xlab, pl + bw, y1 + 31);
  }

  /* ── 1. 均衡支付 vs 基准 0 ── */
  (function kw() {
    if (!$('kw_d')) return;
    function upd() {
      var d = parseFloat($('kw_d').value) / 100;
      var b = parseFloat($('kw_b').value) / 100;
      var a = parseFloat($('kw_a').value);
      var N = parseInt($('kw_N').value, 10);
      txt($('kw_dO'), (d * 100).toFixed(0) + '%');
      txt($('kw_bO'), b.toFixed(2));
      txt($('kw_aO'), a.toFixed(1));
      txt($('kw_NO'), String(N));
      var k = kOf(d, b);
      var pay = V(N, d, a, b, {});
      var D = (N >= k) ? (N - k + 1) : 0;
      var base = 0;
      txt($('kw_k'), String(k));
      txt($('kw_D'), String(D));
      txt($('kw_V'), pay.toFixed(1));
      txt($('kw_base'), base.toFixed(1));
      txt($('kw_ex'), (pay - base).toFixed(1));
      var msg = 'δ=' + d.toFixed(2) + '、b=' + b.toFixed(2) + '、a=' + a.toFixed(1) +
        '、N=' + N + ' → k=' + k + '，威慑期 ' + D +
        '，支付 ' + pay.toFixed(1) + '，完全信息基准 0.0，超额 ' + (pay - base).toFixed(1);
      txt($('kw_vh'), msg);
      tint($('kw_vh'), pay > base + 1e-9 ? C.blue : C.amber);
      var ymax = Math.max(a, pay, 1) * 1.18;
      bars($('kwChart'), [
        { v: base, c: C.ink3, lab: '基准 0', d: 1 },
        { v: pay, c: C.blue, lab: '声誉支付', d: 1 },
        { v: 0, c: C.red, lab: '默许归零', d: 1 }
      ], 0, ymax, '期望支付合计');
    }
    bind(['kw_d', 'kw_b', 'kw_a', 'kw_N'], upd);
    upd();
  })();

  /* ── 2. 一次战斗是否值得 ── */
  (function fight() {
    if (!$('fight_n')) return;
    function upd() {
      var n = parseInt($('fight_n').value, 10);
      var d = parseFloat($('fight_d').value) / 100;
      var b = parseFloat($('fight_b').value) / 100;
      var a = parseFloat($('fight_a').value);
      txt($('fight_nO'), String(n));
      txt($('fight_dO'), (d * 100).toFixed(0) + '%');
      txt($('fight_bO'), b.toFixed(2));
      txt($('fight_aO'), a.toFixed(1));
      var r = fightNet(n, d, a, b);
      txt($('fight_net'), r.net.toFixed(1));
      txt($('fight_cont'), r.cont.toFixed(1));
      txt($('fight_mode'), r.mode);
      var thr = null, thrNet = null;
      for (var t = 2; t <= 60; t++) {
        var nt = fightNet(t, d, a, b).net;
        if (nt > 1e-8) { thr = t; thrNet = nt; break; }
      }
      txt($('fight_thr'), thr == null ? '60 期内无' : (thr + '（净 ' + thrNet.toFixed(1) + '）'));
      var msg = '剩余 ' + n + ' 期被挑战：战斗净收益 ' + r.net.toFixed(1) +
        ' = −1 + 续贯 ' + r.cont.toFixed(1) + '；' + r.mode +
        (r.net > 1e-8 ? '，严格值得付这 1 单位成本' : '，不严格优于直接默许');
      txt($('fight_vh'), msg);
      tint($('fight_vh'), r.net > 1e-8 ? C.blue : (r.net < -1e-8 ? C.red : C.amber));
      var xs = [], i;
      var nMax = Math.max(12, Math.min(24, n + 2));
      for (i = 2; i <= nMax; i++) xs.push(i);
      var nets = xs.map(function (t) { return fightNet(t, d, a, b).net; });
      var ymin = 0, ymax = 1;
      nets.forEach(function (v) { if (v < ymin) ymin = v; if (v > ymax) ymax = v; });
      var pad = (ymax - ymin) * 0.12 || 1;
      ymin -= pad; ymax += pad;
      var g = fit($('fightChart'), 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 52, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
      var span = ymax - ymin || 1;
      function sx(i) { return pl + (xs.length <= 1 ? bw / 2 : (i / (xs.length - 1)) * bw); }
      function sy(v) { return y1 - ((v - ymin) / span) * bh; }
      var yZero = sy(0);
      ctx.strokeStyle = C.axis;
      ctx.beginPath(); ctx.moveTo(pl, yZero); ctx.lineTo(pl + bw, yZero); ctx.stroke();
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      nets.forEach(function (v, i) {
        if (i === 0) ctx.moveTo(sx(i), sy(v));
        else ctx.lineTo(sx(i), sy(v));
      });
      ctx.stroke();
      ctx.lineWidth = 1;
      var hi = xs.indexOf(n);
      if (hi >= 0) {
        ctx.fillStyle = C.red;
        ctx.beginPath();
        ctx.arc(sx(hi), sy(nets[hi]), 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = C.ink3;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      xs.forEach(function (t, i) {
        if (t === 2 || t === n || t === xs[xs.length - 1] || t % 4 === 0) {
          ctx.fillText(String(t), sx(i), y1 + 13);
        }
      });
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('剩余期数 n（含本期）', pl + bw, y1 + 31);
    }
    bind(['fight_n', 'fight_d', 'fight_b', 'fight_a'], upd);
    upd();
  })();

  /* ── 3. FL 下界 ── */
  (function fl() {
    if (!$('fl_mu')) return;
    function upd() {
      var mu = parseFloat($('fl_mu').value) / 100;
      var q = parseFloat($('fl_q').value) / 100;
      var delta = parseFloat($('fl_delta').value) / 100;
      var a = parseFloat($('fl_a').value);
      txt($('fl_muO'), (mu * 100).toFixed(0) + '%');
      txt($('fl_qO'), q.toFixed(2));
      txt($('fl_deltaO'), delta.toFixed(2));
      txt($('fl_aO'), a.toFixed(1));
      var ratio = Math.log(mu) / Math.log(q);
      var K = Math.max(0, Math.floor(ratio + 1e-9));
      var dK = Math.pow(delta, K);
      var v = -1 + (a + 1) * dK;
      var gap = (a + 1) * (1 - dK);
      var share = a !== 0 ? v / a : 0;
      txt($('fl_K'), String(K));
      txt($('fl_v'), v.toFixed(4));
      txt($('fl_gap'), gap.toFixed(4));
      txt($('fl_share'), (share * 100).toFixed(2) + '%');
      var msg = 'μ=' + mu.toFixed(2) + '、q=' + q.toFixed(2) + ' → 至多 K=' + K +
        ' 期对手不最佳反应；δ=' + delta.toFixed(2) + ' 时下界 ' + v.toFixed(4) +
        '，斯塔克尔伯格 ' + a.toFixed(1) + '，缺口 ' + gap.toFixed(4) +
        '；极小最大基准是 0，不是战斗胜率';
      txt($('fl_vh'), msg);
      tint($('fl_vh'), C.blue);
      var ymin = Math.min(0, v, -0.2);
      var ymax = Math.max(a, v, 0) * 1.2 + 0.2;
      bars($('flChart'), [
        { v: 0, c: C.ink3, lab: '极小最大', d: 2 },
        { v: v, c: C.blue, lab: '声誉下界', d: 2 },
        { v: a, c: C.amber, lab: 'Stackelberg', d: 2 }
      ], ymin, ymax, '标准化每期支付');
    }
    bind(['fl_mu', 'fl_q', 'fl_delta', 'fl_a'], upd);
    upd();
  })();

  /* ── 4. 贴现体制 ── */
  (function rho() {
    if (!$('rho_a')) return;
    function upd() {
      var a = parseFloat($('rho_a').value);
      var rho = parseFloat($('rho_r').value) / 100;
      txt($('rho_aO'), a.toFixed(1));
      txt($('rho_rO'), rho.toFixed(2));
      var hi = 1 / a;
      var lo = 1 / (a + 1);
      var mid = hi - lo;
      var reg, col;
      if (rho > hi + 1e-12) { reg = '简单均衡'; col = C.blue; }
      else if (rho < lo - 1e-12) { reg = '声誉塌缩'; col = C.red; }
      else { reg = '大 n 仍威慑'; col = C.amber; }
      txt($('rho_hi'), hi.toFixed(4));
      txt($('rho_lo'), lo.toFixed(4));
      txt($('rho_mid'), mid.toFixed(4));
      txt($('rho_reg'), reg);
      tint($('rho_reg'), col);
      var msg = 'a=' + a.toFixed(1) + '：ρ>' + hi.toFixed(4) + ' 时路径与不贴现情形相同（进入者混合概率要改）；ρ<' +
        lo.toFixed(4) + ' 时弱类型一遇进入就默许。当前 ρ=' + rho.toFixed(2) + ' → ' + reg;
      txt($('rho_vh'), msg);
      tint($('rho_vh'), col);
      bars($('rhoChart'), [
        { v: lo, c: C.red, lab: '塌缩上沿', d: 4 },
        { v: hi, c: C.amber, lab: '简单下沿', d: 4 },
        { v: rho, c: C.blue, lab: '当前 ρ', d: 4 }
      ], 0, 1.05, '贴现因子');
    }
    bind(['rho_a', 'rho_r'], upd);
    upd();
  })();
})();
