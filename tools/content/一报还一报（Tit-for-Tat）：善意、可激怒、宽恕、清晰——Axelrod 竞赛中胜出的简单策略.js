/* ============================================================
   《一报还一报 / Tit-for-Tat》主题脚本
   四个可调模型：
     1. 对局模拟器 TFT vs 对手
     2. 噪声与慷慨 GTFT
     3. 集体稳定 w*
     4. 四性体检
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
  };
  var R0 = 3, T0 = 5, P0 = 1, S0 = 0;
  var OPP_NAMES = ['TFT', 'ALLD', 'ALLC', 'RANDOM', 'GRIM'];

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
  function clampLabel(ctx, lab, x, y, align, pl, w) {
    var lw = ctx.measureText(lab).width;
    ctx.textAlign = align;
    var lx = align === 'left' ? Math.min(x, w - lw - 6) : Math.max(x, pl + 6);
    ctx.fillText(lab, lx, y);
  }
  function pay(a, b) {
    if (a === 'C' && b === 'C') return [R0, R0];
    if (a === 'D' && b === 'C') return [T0, S0];
    if (a === 'C' && b === 'D') return [S0, T0];
    return [P0, P0];
  }

  /* ── 1. Matchup simulator ── */
  (function matchup() {
    var oppEl = $('m_opp'), nEl = $('m_n');
    if (!oppEl || !nEl) return;
    var cv = $('mChart');

    function moveOpp(kind, i, prevA, histB) {
      if (kind === 0) return i === 0 ? 'C' : prevA;           // TFT
      if (kind === 1) return 'D';                              // ALLD
      if (kind === 2) return 'C';                              // ALLC
      if (kind === 3) return (Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1 > 0.5 ? 'C' : 'D'; // deterministic pseudo-random
      // GRIM
      if (i === 0) return 'C';
      for (var k = 0; k < histB.length; k++) if (histB[k] === 'D') return 'D';
      // wait histB is opponent's own? We need whether TFT (A) ever defected.
      return 'C';
    }

    function play(kind, N) {
      var sa = 0, sb = 0, ha = [], hb = [];
      var prevA = 'C', prevB = 'C';
      var seriesA = [0], seriesB = [0];
      for (var i = 0; i < N; i++) {
        var ma = (i === 0) ? 'C' : prevB; // TFT
        var mb;
        if (kind === 0) mb = (i === 0) ? 'C' : prevA;
        else if (kind === 1) mb = 'D';
        else if (kind === 2) mb = 'C';
        else if (kind === 3) {
          // stable pseudo-random in [0,1)
          var x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
          mb = (x - Math.floor(x)) < 0.5 ? 'C' : 'D';
        } else {
          // GRIM: defect forever if A ever defected
          var grim = false;
          for (var k = 0; k < ha.length; k++) if (ha[k] === 'D') { grim = true; break; }
          mb = grim ? 'D' : 'C';
        }
        var p = pay(ma, mb);
        sa += p[0]; sb += p[1];
        ha.push(ma); hb.push(mb);
        prevA = ma; prevB = mb;
        seriesA.push(sa); seriesB.push(sb);
      }
      return { sa: sa, sb: sb, seriesA: seriesA, seriesB: seriesB };
    }

    function upd() {
      var kind = parseInt(oppEl.value, 10);
      var N = parseInt(nEl.value, 10);
      var res = play(kind, N);
      var diff = res.sa - res.sb;
      var avg = res.sa / N;
      var col = diff >= 0 ? C.green : C.red;

      txt($('m_oppO'), OPP_NAMES[kind]);
      txt($('m_nO'), String(N));
      txt($('m_tft'), String(res.sa));
      txt($('m_oppS'), String(res.sb));
      txt($('m_avg'), avg.toFixed(3));
      txt($('m_diff'), (diff >= 0 ? '+' : '') + diff);
      tint($('m_diff'), col);

      var msg;
      if (kind === 1) {
        msg = '对 ALLD：首步吃 S，其后锁 P → TFT=' + res.sa + '，ALLD=' + res.sb + '（单场落后，但未被持续剥削）';
      } else if (kind === 0 || kind === 2 || kind === 4) {
        msg = '对 ' + OPP_NAMES[kind] + '：全程相互合作，双方各 ' + res.sa + '（上限 ' + (3 * N) + '）';
      } else {
        msg = '对 RANDOM：得分随伪随机序列波动；TFT 场均 ' + avg.toFixed(3) + '（合作基准 3.0）';
      }
      txt($('m_vh'), msg);
      tint($('m_vh'), C.ink2);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxY = Math.max(1, res.seriesA[N], res.seriesB[N]);
      function sx(i) { return pl + (i / N) * bw; }
      function sy(v) { return y1 - (v / maxY) * bh; }

      ctx.strokeStyle = C.axis;
      ctx.strokeRect(pl, pt, bw, bh);

      function drawSeries(arr, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        for (var i = 0; i <= N; i++) {
          var x = sx(i), y = sy(arr[i]);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      drawSeries(res.seriesA, C.blue);
      drawSeries(res.seriesB, C.amber);

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('TFT', pl, pt - 8);
      ctx.fillStyle = C.blue;
      ctx.fillRect(pl + 28, pt - 16, 12, 3);
      ctx.fillStyle = C.ink3;
      ctx.fillText('对手', pl + 50, pt - 8);
      ctx.fillStyle = C.amber;
      ctx.fillRect(pl + 78, pt - 16, 12, 3);

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('累计得分随步数（蓝=TFT，琥珀=对手）', pl + bw / 2, y1 + 31);
    }
    bind(['m_opp', 'm_n'], upd);
    upd();
  })();

  /* ── 2. Noise + generosity ── */
  (function noise() {
    var eEl = $('n_eps'), qEl = $('n_q'), sEl = $('n_steps');
    if (!eEl || !qEl || !sEl) return;
    var cv = $('nChart');

    function sim(eps, q, steps, seed) {
      var s = seed | 0;
      function rnd() {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
      }
      var intentA = 'C', intentB = 'C';
      var sa = 0, sb = 0;
      var bucket = [0, 0, 0, 0]; // CC CD DC DD counts of realized
      for (var i = 0; i < steps; i++) {
        var oa = rnd() < eps ? (intentA === 'C' ? 'D' : 'C') : intentA;
        var ob = rnd() < eps ? (intentB === 'C' ? 'D' : 'C') : intentB;
        var p = pay(oa, ob);
        sa += p[0]; sb += p[1];
        if (oa === 'C' && ob === 'C') bucket[0]++;
        else if (oa === 'C' && ob === 'D') bucket[1]++;
        else if (oa === 'D' && ob === 'C') bucket[2]++;
        else bucket[3]++;
        // next intent: GTFT based on observed opponent action
        intentA = (ob === 'C') ? 'C' : (rnd() < q ? 'C' : 'D');
        intentB = (oa === 'C') ? 'C' : (rnd() < q ? 'C' : 'D');
      }
      return { a: sa / steps, b: sb / steps, bucket: bucket };
    }

    function upd() {
      var eps = parseFloat(eEl.value) / 100;
      var q = parseFloat(qEl.value);
      var steps = parseInt(sEl.value, 10);
      var res = sim(eps, q, steps, 42);
      var floor = (R0 + S0 + T0 + P0) / 4;
      var rel = (res.a / R0) * 100;
      var col = res.a >= 2.7 ? C.green : (res.a >= 2.4 ? C.amber : C.red);

      txt($('n_epsO'), (eps * 100).toFixed(1));
      txt($('n_qO'), q.toFixed(2));
      txt($('n_stepsO'), String(steps));
      txt($('n_a'), res.a.toFixed(3));
      txt($('n_b'), res.b.toFixed(3));
      txt($('n_rel'), rel.toFixed(1) + '%');
      txt($('n_floor'), floor.toFixed(2));
      tint($('n_a'), col);

      var msg;
      if (eps < 1e-9) {
        msg = 'ε=0：两 GTFT/TFT 锁定相互合作，期均 ≈ 3.00';
      } else if (q < 1e-9) {
        msg = '严格 TFT + 噪声：易入交替螺旋，期均靠近理论底 ' + floor.toFixed(2) + '（当前 ' + res.a.toFixed(3) + '）';
      } else {
        msg = '慷慨 q=' + q.toFixed(2) + ' 打断螺旋：期均 ' + res.a.toFixed(3) + '（相对无噪声 ' + rel.toFixed(1) + '%）';
      }
      txt($('n_vh'), msg);
      tint($('n_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var labs = ['CC', 'CD', 'DC', 'DD'];
      var cols = [C.green, C.amber, C.blue, C.red];
      var maxB = Math.max(1, res.bucket[0], res.bucket[1], res.bucket[2], res.bucket[3]);
      var barW = bw / 4 * 0.6;
      for (var i = 0; i < 4; i++) {
        var cx = pl + (i + 0.5) * (bw / 4);
        var bhgt = (res.bucket[i] / maxB) * (bh - 8);
        ctx.fillStyle = cols[i];
        ctx.fillRect(cx - barW / 2, y1 - bhgt, barW, bhgt);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labs[i], cx, y1 + 14);
        var lab = String(res.bucket[i]);
        clampLabel(ctx, lab, cx, y1 - bhgt - 6, 'left', pl, w);
      }
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('实现结果频次（种子固定，滑块可复现）', pl + bw / 2, y1 + 31);
    }
    bind(['n_eps', 'n_q', 'n_steps'], upd);
    upd();
  })();

  /* ── 3. Collective stability w* ── */
  (function wst() {
    var rEl = $('w_r'), tEl = $('w_t'), pEl = $('w_p'), sEl = $('w_s'), wEl = $('w_w');
    if (!rEl || !tEl || !pEl || !sEl || !wEl) return;
    var cv = $('wChart');

    function upd() {
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), S = parseFloat(sEl.value);
      var w = parseFloat(wEl.value);
      if (T <= P) T = P + 0.05;
      if (R <= S) R = S + 0.05;
      var a = (T - R) / (T - P);
      var b = (T - R) / (R - S);
      if (!isFinite(a) || a < 0) a = 0;
      if (!isFinite(b) || b < 0) b = 0;
      if (a > 1) a = 1;
      if (b > 1) b = 1;
      var star = Math.max(a, b);
      var ok = w + 1e-9 >= star;
      var col = ok ? C.green : C.red;

      txt($('w_rO'), R.toFixed(1));
      txt($('w_tO'), T.toFixed(1));
      txt($('w_pO'), P.toFixed(1));
      txt($('w_sO'), S.toFixed(1));
      txt($('w_wO'), w.toFixed(2));
      txt($('w_star'), star.toFixed(3));
      txt($('w_a'), a.toFixed(3));
      txt($('w_b'), b.toFixed(3));
      txt($('w_ok'), ok ? '可稳定' : '不稳定');
      tint($('w_ok'), col);

      var msg = ok
        ? 'w=' + w.toFixed(2) + ' ≥ w*=' + star.toFixed(3) + ' → TFT 种群可抵抗经典入侵路径（教学条件）'
        : 'w=' + w.toFixed(2) + ' < w*=' + star.toFixed(3) + ' → 阴影不足，剥削/交替偏离有利可图';
      txt($('w_vh'), msg);
      tint($('w_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, ww = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = ww - pl - pr, bh = y1 - pt;
      function sx(v) { return pl + v * bw; }
      function sy(v) { return y1 - v * bh; } // unused vertical

      // horizontal gauge 0..1
      ctx.fillStyle = C.grid;
      ctx.fillRect(pl, pt + bh * 0.35, bw, bh * 0.3);
      ctx.fillStyle = ok ? 'rgba(15,138,77,0.25)' : 'rgba(213,52,44,0.2)';
      ctx.fillRect(pl, pt + bh * 0.35, star * bw, bh * 0.3);

      // w* marker
      ctx.strokeStyle = C.amber;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(star), pt + 8);
      ctx.lineTo(sx(star), y1 - 4);
      ctx.stroke();
      ctx.fillStyle = C.amber;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      var starLab = 'w* ' + star.toFixed(2);
      var sxStar = sx(star);
      var lw = ctx.measureText(starLab).width;
      ctx.fillText(starLab, Math.min(Math.max(sxStar, pl + lw / 2), pl + bw - lw / 2), pt + 18);

      // w marker
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      ctx.moveTo(sx(w), pt + 8);
      ctx.lineTo(sx(w), y1 - 4);
      ctx.stroke();
      ctx.fillStyle = C.blue;
      var wLab = 'w ' + w.toFixed(2);
      lw = ctx.measureText(wLab).width;
      ctx.fillText(wLab, Math.min(Math.max(sx(w), pl + lw / 2), pl + bw - lw / 2), y1 + 14);

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('续局概率轴：琥珀色=门槛 w*，蓝色=当前 w', pl + bw / 2, y1 + 31);
    }
    bind(['w_r', 'w_t', 'w_p', 'w_s', 'w_w'], upd);
    upd();
  })();

  /* ── 4. Four properties scorecard ── */
  (function four() {
    var nEl = $('f_n'), rEl = $('f_r'), gEl = $('f_g'), cEl = $('f_c');
    if (!nEl || !rEl || !gEl || !cEl) return;
    var cv = $('fChart');
    var names = ['善意', '可激怒', '宽恕', '清晰'];

    function upd() {
      var vals = [
        parseFloat(nEl.value),
        parseFloat(rEl.value),
        parseFloat(gEl.value),
        parseFloat(cEl.value)
      ];
      var sum = vals[0] + vals[1] + vals[2] + vals[3];
      var avg = sum / 4;
      var minI = 0;
      for (var i = 1; i < 4; i++) if (vals[i] < vals[minI]) minI = i;
      var sim = Math.round(avg * 10);
      var col = avg >= 7.5 ? C.green : (avg >= 5 ? C.amber : C.red);

      txt($('f_nO'), String(vals[0]));
      txt($('f_rO'), String(vals[1]));
      txt($('f_gO'), String(vals[2]));
      txt($('f_cO'), String(vals[3]));
      txt($('f_avg'), avg.toFixed(1));
      txt($('f_min'), names[minI] + ' ' + vals[minI]);
      txt($('f_sim'), sim + '%');
      txt($('f_focus'), names[minI]);
      tint($('f_avg'), col);
      tint($('f_focus'), C.amber);

      var tips = [
        '开局少挖坑、默认履约',
        '违约要有即时成比例回应',
        '对方改回后停止惩罚',
        '把规则写清楚让对方可读'
      ];
      txt($('f_vh'), '最短板「' + names[minI] + '」→ ' + tips[minI] + '。均分 ' + avg.toFixed(1) + ' / 10。');
      tint($('f_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 56, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxV = 10;
      var barH = bh / 4 * 0.55;
      for (var j = 0; j < 4; j++) {
        var y = pt + (j + 0.5) * (bh / 4);
        var bwgt = (vals[j] / maxV) * bw;
        ctx.fillStyle = j === minI ? C.amber : C.blue;
        ctx.fillRect(pl, y - barH / 2, bwgt, barH);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(names[j], pl - 8, y + 4);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, String(vals[j]), pl + bwgt + 8, y + 4, 'left', pl, w);
      }
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('四性雷达条：琥珀=当前最短板', pl + bw / 2, y1 + 31);
    }
    bind(['f_n', 'f_r', 'f_g', 'f_c'], upd);
    upd();
  })();
})();
