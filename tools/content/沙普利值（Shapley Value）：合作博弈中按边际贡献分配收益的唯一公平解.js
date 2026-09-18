/* ============================================================
   《沙普利值（Shapley Value）》主题脚本
   四个可调模型：
     1. 三人盈余 / 手套极限
     2. 机场跑道费（Littlechild–Owen）
     3. Shapley–Shubik 权力指数
     4. 协同强度 β 分解
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

  function fact(n) {
    var r = 1;
    for (var i = 2; i <= n; i++) r *= i;
    return r;
  }
  function popcount(S) {
    var c = 0;
    while (S) { c += S & 1; S >>= 1; }
    return c;
  }
  function shapley(n, v) {
    var phi = new Array(n);
    for (var i = 0; i < n; i++) phi[i] = 0;
    var N = 1 << n;
    for (var i = 0; i < n; i++) {
      for (var S = 0; S < N; S++) {
        if (S & (1 << i)) continue;
        var s = popcount(S);
        var w = fact(s) * fact(n - s - 1) / fact(n);
        phi[i] += w * (v(S | (1 << i)) - v(S));
      }
    }
    return phi;
  }

  /* ---------- 1. 三人盈余 ---------- */
  function updGl() {
    var ab = +($('gl_ab') && $('gl_ab').value);
    var ac = +($('gl_ac') && $('gl_ac').value);
    var bc = +($('gl_bc') && $('gl_bc').value);
    var g = +($('gl_g') && $('gl_g').value);
    txt($('gl_abO'), String(ab));
    txt($('gl_acO'), String(ac));
    txt($('gl_bcO'), String(bc));
    txt($('gl_gO'), String(g));
    var v = function (S) {
      var A = !!(S & 1), B = !!(S & 2), C = !!(S & 4);
      var cnt = (A ? 1 : 0) + (B ? 1 : 0) + (C ? 1 : 0);
      if (cnt <= 1) return 0;
      if (cnt === 2) {
        if (A && B) return ab;
        if (A && C) return ac;
        if (B && C) return bc;
      }
      return g;
    };
    var phi = shapley(3, v);
    var eq = g / 3;
    txt($('gl_a'), phi[0].toFixed(2));
    txt($('gl_b'), phi[1].toFixed(2));
    txt($('gl_c'), phi[2].toFixed(2));
    txt($('gl_eq'), eq.toFixed(2));
    var maxGap = Math.max(Math.abs(phi[0] - eq), Math.abs(phi[1] - eq), Math.abs(phi[2] - eq));
    var vh = $('gl_vh');
    if (Math.abs(phi[0] + phi[1] + phi[2] - g) > 1e-6) {
      txt(vh, '⚠ 效率未闭合：Σφ ≠ v(N)');
      tint(vh, C.red);
    } else if (maxGap < 0.05) {
      txt(vh, '判定：接近均分——协同较对称，稀缺溢价不明显');
      tint(vh, C.green);
    } else if (phi[0] > eq + 0.5 && phi[0] >= phi[1] && phi[0] >= phi[2]) {
      txt(vh, '判定：A 相对均分获溢价（稀缺/高协同侧）');
      tint(vh, C.amber);
    } else if (phi[1] > eq + 0.5 && phi[1] >= phi[0] && phi[1] >= phi[2]) {
      txt(vh, '判定：B 相对均分获溢价');
      tint(vh, C.amber);
    } else if (phi[2] > eq + 0.5) {
      txt(vh, '判定：C 相对均分获溢价');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：Σφ=v(N) 效率成立；与均分差反映边际结构');
      tint(vh, C.blue);
    }
    var items = [
      { lab: 'φA', v: phi[0], c: C.blue, dp: 2 },
      { lab: 'φB', v: phi[1], c: C.amber, dp: 2 },
      { lab: 'φC', v: phi[2], c: C.green, dp: 2 },
      { lab: '均分', v: eq, c: C.ink3, dp: 2 }
    ];
    items._axis = '份额';
    var mx = Math.max(g / 2, Math.max.apply(null, phi.concat([eq])), 1);
    bars($('glChart'), items, 0, mx * 1.15);
  }

  /* ---------- 2. 机场 ---------- */
  function airportPay(costs) {
    var n = costs.length;
    var seg = [costs[0]];
    for (var i = 1; i < n; i++) seg.push(Math.max(0, costs[i] - costs[i - 1]));
    var pay = new Array(n);
    for (var i = 0; i < n; i++) pay[i] = 0;
    for (var k = 0; k < n; k++) {
      var share = seg[k] / (n - k);
      for (var i = k; i < n; i++) pay[i] += share;
    }
    return { seg: seg, pay: pay };
  }
  function updAp() {
    var raw = [
      +($('ap_c1') && $('ap_c1').value),
      +($('ap_c2') && $('ap_c2').value),
      +($('ap_c3') && $('ap_c3').value),
      +($('ap_c4') && $('ap_c4').value)
    ];
    // enforce nondecreasing costs for display (clamp upward)
    var c = [raw[0]];
    for (var i = 1; i < 4; i++) c[i] = Math.max(raw[i], c[i - 1]);
    txt($('ap_c1O'), String(c[0]));
    txt($('ap_c2O'), String(c[1]));
    txt($('ap_c3O'), String(c[2]));
    txt($('ap_c4O'), String(c[3]));
    var r = airportPay(c);
    txt($('ap_p12'), r.pay[0].toFixed(2) + ' / ' + r.pay[1].toFixed(2));
    txt($('ap_p34'), r.pay[2].toFixed(2) + ' / ' + r.pay[3].toFixed(2));
    var sum = r.pay[0] + r.pay[1] + r.pay[2] + r.pay[3];
    txt($('ap_sum'), sum.toFixed(2));
    txt($('ap_seg'), r.seg.map(function (x) { return x.toFixed(0); }).join('+'));
    var vh = $('ap_vh');
    if (Math.abs(sum - c[3]) > 1e-6) {
      txt(vh, '⚠ 合计 ≠ c₄，检查成本序列');
      tint(vh, C.red);
    } else if (raw[1] < raw[0] || raw[2] < raw[1] || raw[3] < raw[2]) {
      txt(vh, '判定：已把成本单调化（cₖ≥cₖ₋₁）；小机型只付共用段');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：分段收费 ≡ 沙普利成本分摊；合计 = 最长跑道成本');
      tint(vh, C.green);
    }
    var items = [
      { lab: '机1', v: r.pay[0], c: C.green, dp: 2 },
      { lab: '机2', v: r.pay[1], c: C.blue, dp: 2 },
      { lab: '机3', v: r.pay[2], c: C.amber, dp: 2 },
      { lab: '机4', v: r.pay[3], c: C.red, dp: 2 }
    ];
    items._axis = '收费';
    bars($('apChart'), items, 0, Math.max(c[3], 1) * 0.9);
  }

  /* ---------- 3. Shapley–Shubik ---------- */
  function updSs() {
    var w = [
      +($('ss_w1') && $('ss_w1').value),
      +($('ss_w2') && $('ss_w2').value),
      +($('ss_w3') && $('ss_w3').value),
      +($('ss_w4') && $('ss_w4').value)
    ];
    var q = +($('ss_q') && $('ss_q').value);
    txt($('ss_w1O'), String(w[0]));
    txt($('ss_w2O'), String(w[1]));
    txt($('ss_w3O'), String(w[2]));
    txt($('ss_w4O'), String(w[3]));
    txt($('ss_qO'), String(q));
    var v = function (S) {
      var sum = 0;
      for (var i = 0; i < 4; i++) if (S & (1 << i)) sum += w[i];
      return sum >= q ? 1 : 0;
    };
    var phi = shapley(4, v);
    var wsum = w[0] + w[1] + w[2] + w[3];
    var eq = wsum > 0 ? w.map(function (x) { return x / wsum; }) : [0, 0, 0, 0];
    txt($('ss_p12'), phi[0].toFixed(3) + ' / ' + phi[1].toFixed(3));
    txt($('ss_p34'), phi[2].toFixed(3) + ' / ' + phi[3].toFixed(3));
    txt($('ss_eq'), eq.map(function (x) { return x.toFixed(2); }).join('/'));
    var psum = phi[0] + phi[1] + phi[2] + phi[3];
    txt($('ss_sum'), psum.toFixed(3));
    var vh = $('ss_vh');
    var crit = Math.abs(phi[0] - phi[1]) < 0.02 && Math.abs(phi[1] - phi[2]) < 0.02 && w[2] <= 2;
    if (Math.abs(psum - 1) > 1e-6 && Math.abs(psum) > 1e-6) {
      // if nobody can reach quota, all zero
      if (psum < 1e-9) {
        txt(vh, '判定：无人可达配额——权力全为 0（提高权重或降低 q）');
        tint(vh, C.red);
      } else {
        txt(vh, '⚠ 权力未归一');
        tint(vh, C.red);
      }
    } else if (psum < 1e-9) {
      txt(vh, '判定：无人可达配额——权力全为 0');
      tint(vh, C.red);
    } else if (Math.abs(phi[0] - 1 / 3) < 0.02 && Math.abs(phi[1] - 1 / 3) < 0.02 && Math.abs(phi[2] - 1 / 3) < 0.02 && w[3] === 0) {
      txt(vh, '判定：三人关键对称——小权重也可与大权重权力相等');
      tint(vh, C.amber);
    } else if (Math.max.apply(null, phi.map(function (p, i) { return Math.abs(p - eq[i]); })) > 0.08) {
      txt(vh, '判定：权力显著偏离股权比例——看关键性而非席位');
      tint(vh, C.amber);
    } else {
      txt(vh, '判定：Shapley–Shubik = 简单博弈上的沙普利值；Σφ=1');
      tint(vh, C.green);
    }
    var items = [
      { lab: 'P1', v: phi[0], c: C.blue, dp: 3 },
      { lab: 'P2', v: phi[1], c: C.amber, dp: 3 },
      { lab: 'P3', v: phi[2], c: C.green, dp: 3 },
      { lab: 'P4', v: phi[3], c: C.red, dp: 3 }
    ];
    items._axis = '权力';
    bars($('ssChart'), items, 0, Math.max(0.5, Math.max.apply(null, phi) * 1.2));
  }

  /* ---------- 4. 协同 β ---------- */
  function updSy() {
    var a = +($('sy_a') && $('sy_a').value);
    var b = +($('sy_b') && $('sy_b').value);
    var c = +($('sy_c') && $('sy_c').value);
    var beta = +($('sy_beta') && $('sy_beta').value);
    txt($('sy_aO'), String(a));
    txt($('sy_bO'), String(b));
    txt($('sy_cO'), String(c));
    txt($('sy_betaO'), String(beta));
    var standalone = [a, b, c];
    var v = function (S) {
      var sum = 0, cnt = 0;
      for (var i = 0; i < 3; i++) if (S & (1 << i)) { sum += standalone[i]; cnt++; }
      return sum + beta * cnt * (cnt - 1) / 2;
    };
    var phi = shapley(3, v);
    var vn = v(7);
    var pool = 3 * beta;
    var share = beta; // each gets +beta when |N|=3 pairwise model
    txt($('sy_phi'), phi.map(function (x) { return x.toFixed(0); }).join(' / '));
    txt($('sy_vn'), vn.toFixed(0));
    txt($('sy_pool'), pool.toFixed(0));
    txt($('sy_share'), share.toFixed(0));
    var vh = $('sy_vh');
    var ok = Math.abs(phi[0] - (a + beta)) < 1e-6 && Math.abs(phi[1] - (b + beta)) < 1e-6 && Math.abs(phi[2] - (c + beta)) < 1e-6;
    if (!ok) {
      txt(vh, '判定：φᵢ = 独立产出 + β（三人两两协同模型）');
      tint(vh, C.blue);
    } else if (beta === 0) {
      txt(vh, '判定：无协同——沙普利退化为独立产出');
      tint(vh, C.ink2);
    } else {
      txt(vh, '判定：协同池 3β 由三人均分边际，每人 +β；独立产出原样保留');
      tint(vh, C.green);
    }
    var items = [
      { lab: 'φA', v: phi[0], c: C.blue, dp: 1 },
      { lab: 'φB', v: phi[1], c: C.amber, dp: 1 },
      { lab: 'φC', v: phi[2], c: C.green, dp: 1 },
      { lab: 'a', v: a, c: C.ink3, dp: 0 },
      { lab: 'b', v: b, c: C.ink3, dp: 0 },
      { lab: 'c', v: c, c: C.ink3, dp: 0 }
    ];
    items._axis = '产出/份额';
    bars($('syChart'), items, 0, Math.max(vn, 1) * 0.7);
  }

  function updAll() {
    updGl();
    updAp();
    updSs();
    updSy();
  }

  bind(['gl_ab', 'gl_ac', 'gl_bc', 'gl_g'], updGl);
  bind(['ap_c1', 'ap_c2', 'ap_c3', 'ap_c4'], updAp);
  bind(['ss_w1', 'ss_w2', 'ss_w3', 'ss_w4', 'ss_q'], updSs);
  bind(['sy_a', 'sy_b', 'sy_c', 'sy_beta'], updSy);
  updAll();
})();
