/* ============================================================
   《搜寻与匹配理论（Gale-Shapley）》主题脚本
   四个可调模型：
     1. 谁提出（经典 3×3，提出方最优）
     2. 共同质量权重 ρ（冲突何时消失）
     3. 接受方截断（2×2 医院提出）
     4. 提议次数上界 vs 同质构造
   默认读数已用 node 复算（2026-09-20）：
     模型1 男方提出 → 1.67 / 2.33 / 差距 0.67 / 提议 5 / 稳定 2
     模型2 ρ=0 与模型1相同；ρ=0.4 时稳定数降为 1、差距 0.00
     模型3 k=2 → 学生 2.00、医院 1.00、提议 2
     模型4 n=3 → 上界 9、同质 6、穷举最大 7、均秩 2.00 / 1.00
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
  };
  var BRUTE = { 2: 3, 3: 7 };

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
  function rankOf(pref, x) {
    var i = pref.indexOf(x);
    return i < 0 ? Infinity : i;
  }
  function da(propPrefs, recvPrefs) {
    var nP = propPrefs.length, nR = recvPrefs.length;
    var matchP = [], matchR = [], nextIdx = [], free = [];
    var i, proposals = 0, guard = 0;
    for (i = 0; i < nP; i++) { matchP.push(-1); nextIdx.push(0); free.push(i); }
    for (i = 0; i < nR; i++) matchR.push(-1);
    while (free.length && guard++ < 100000) {
      i = free.shift();
      if (nextIdx[i] >= propPrefs[i].length) continue;
      var j = propPrefs[i][nextIdx[i]++];
      proposals++;
      if (rankOf(recvPrefs[j], i) === Infinity) { free.push(i); continue; }
      var cur = matchR[j];
      var better = cur < 0 || rankOf(recvPrefs[j], i) < rankOf(recvPrefs[j], cur);
      if (better) {
        if (cur >= 0) { matchP[cur] = -1; free.push(cur); }
        matchR[j] = i;
        matchP[i] = j;
      } else free.push(i);
    }
    return { matchP: matchP, matchR: matchR, proposals: proposals };
  }
  function avg(xs) {
    var s = 0, i;
    for (i = 0; i < xs.length; i++) s += xs[i];
    return xs.length ? s / xs.length : 0;
  }
  function perms(a) {
    if (a.length <= 1) return [a.slice()];
    var o = [], i, p, k;
    for (i = 0; i < a.length; i++) {
      var rest = a.slice(0, i).concat(a.slice(i + 1));
      var sub = perms(rest);
      for (k = 0; k < sub.length; k++) o.push([a[i]].concat(sub[k]));
    }
    return o;
  }
  function countStable(mp, wp) {
    var n = mp.length, Ps = perms(mp.map(function (_, i) { return i; }));
    var cnt = 0, t, m, matchR, ok, i, j;
    for (t = 0; t < Ps.length; t++) {
      m = Ps[t];
      matchR = [];
      for (i = 0; i < n; i++) matchR.push(-1);
      for (i = 0; i < n; i++) matchR[m[i]] = i;
      ok = true;
      for (i = 0; i < n && ok; i++) {
        for (j = 0; j < n; j++) {
          if (rankOf(mp[i], j) < rankOf(mp[i], m[i]) && rankOf(wp[j], i) < rankOf(wp[j], matchR[j])) {
            ok = false;
            break;
          }
        }
      }
      if (ok) cnt++;
    }
    return cnt;
  }
  function axisY(ctx, pl, y1, bh, ymin, ymax, w) {
    ctx.strokeStyle = C.grid;
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    var span = ymax - ymin || 1, i, v, y;
    for (i = 0; i <= 4; i++) {
      v = ymin + (span * i) / 4;
      y = y1 - ((v - ymin) / span) * bh;
      ctx.beginPath();
      ctx.moveTo(pl, y);
      ctx.lineTo(w - 16, y);
      ctx.stroke();
      ctx.fillText(v.toFixed(2), pl - 6, y + 3);
    }
  }
  function bars(cv, items, ymin, ymax, axis) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    if (ymin == null) ymin = 0;
    if (ymax == null) {
      ymax = 1;
      items.forEach(function (it) { if (it.v > ymax) ymax = it.v; });
      ymax = ymax * 1.18;
    }
    axisY(ctx, pl, y1, bh, ymin, ymax, w);
    var barW = bw / (items.length * 1.6);
    var span = ymax - ymin || 1;
    items.forEach(function (it, i) {
      var x = pl + (i + 0.5) * (bw / items.length) - barW / 2;
      var y = y1 - ((it.v - ymin) / span) * bh;
      ctx.fillStyle = it.c;
      ctx.fillRect(x, y, barW, Math.max(2, y1 - y));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(it.lab, x + barW / 2, y1 + 13);
      var lab = it.v.toFixed(it.dp != null ? it.dp : 2);
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, Math.max(pt + 11, y - 6));
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(axis || '序位（越小越好）', pl + bw, y1 + 31);
  }

  /* ---------- 经典 3×3 ---------- */
  var MEN = [[0, 1, 2], [1, 0, 2], [0, 1, 2]];
  var WOMEN = [[1, 0, 2], [0, 1, 2], [0, 1, 2]];
  var MN = ['A', 'B', 'C'];
  var WN = ['X', 'Y', 'Z'];

  function updGs() {
    var side = +($('gs_side') && $('gs_side').value);
    if (side !== 0 && side !== 1) side = 0;
    txt($('gs_sideO'), side === 0 ? '男方' : '女方');
    var res = side === 0 ? da(MEN, WOMEN) : da(WOMEN, MEN);
    var manMatch, womanOf;
    if (side === 0) {
      manMatch = res.matchP;
    } else {
      manMatch = res.matchR;
    }
    var manRanks = [], womRanks = [], i;
    var wMatch = [-1, -1, -1];
    for (i = 0; i < 3; i++) wMatch[manMatch[i]] = i;
    for (i = 0; i < 3; i++) {
      manRanks.push(rankOf(MEN[i], manMatch[i]) + 1);
      womRanks.push(rankOf(WOMEN[i], wMatch[i]) + 1);
    }
    var pAvg = side === 0 ? avg(manRanks) : avg(womRanks);
    var rAvg = side === 0 ? avg(womRanks) : avg(manRanks);
    var gap = rAvg - pAvg;
    txt($('gs_pAvg'), pAvg.toFixed(2));
    txt($('gs_rAvg'), rAvg.toFixed(2));
    txt($('gs_gap'), gap.toFixed(2));
    txt($('gs_nProp'), String(res.proposals));
    txt($('gs_nStab'), String(countStable(MEN, WOMEN)));
    var pair = [];
    for (i = 0; i < 3; i++) pair.push(MN[i] + '–' + WN[manMatch[i]]);
    txt($('gs_match'), pair.join(' · '));
    var fixed = manMatch[2] === 2;
    var msg = (side === 0 ? '男方提出 → 男方最优、女方最劣。' : '女方提出 → 女方最优、男方最劣。')
      + (fixed ? ' C–Z 在两个稳定匹配里都不动。' : ' C 的对象变了——与本市场的格结构不符。');
    txt($('gs_vh'), msg);
    tint($('gs_vh'), C.blue);
    var items = [];
    for (i = 0; i < 3; i++) items.push({ lab: MN[i], v: manRanks[i], c: C.blue, dp: 0 });
    for (i = 0; i < 3; i++) items.push({ lab: WN[i], v: womRanks[i], c: C.amber, dp: 0 });
    bars($('gsChart'), items, 0, 3.6, '个人序位（越小越好）');
  }

  /* ---------- ρ ---------- */
  function blendMarket(rho) {
    var privM = [[3, 2, 1], [2, 3, 1], [3, 2, 1]];
    var privW = [[2, 3, 1], [3, 2, 1], [3, 2, 1]];
    var q = [1, 2, 3];
    function order(privRow) {
      var idx = [0, 1, 2];
      idx.sort(function (a, b) {
        var sa = (1 - rho) * privRow[a] + rho * q[a];
        var sb = (1 - rho) * privRow[b] + rho * q[b];
        var d = sb - sa;
        if (Math.abs(d) > 1e-9) return d;
        return a - b;
      });
      return idx;
    }
    return { mp: privM.map(order), wp: privW.map(order) };
  }
  function sideStats(mp, wp) {
    var M = da(mp, wp);
    var pRanks = [], rRanks = [], i, wOf = [-1, -1, -1];
    for (i = 0; i < 3; i++) wOf[M.matchP[i]] = i;
    for (i = 0; i < 3; i++) {
      pRanks.push(rankOf(mp[i], M.matchP[i]) + 1);
      rRanks.push(rankOf(wp[i], wOf[i]) + 1);
    }
    return { pAvg: avg(pRanks), rAvg: avg(rRanks), proposals: M.proposals, match: M.matchP };
  }
  function updRho() {
    var raw = +($('rho') && $('rho').value);
    var rho = Math.round(raw * 10) / 10;
    if (!isFinite(rho)) rho = 0;
    txt($('rhoO'), rho.toFixed(1));
    var mkt = blendMarket(rho);
    var st = sideStats(mkt.mp, mkt.wp);
    var W = da(mkt.wp, mkt.mp);
    var same = st.match.join() === W.matchR.join();
    var nStab = countStable(mkt.mp, mkt.wp);
    var gap = st.rAvg - st.pAvg;
    txt($('rho_pAvg'), st.pAvg.toFixed(2));
    txt($('rho_rAvg'), st.rAvg.toFixed(2));
    txt($('rho_gap'), gap.toFixed(2));
    txt($('rho_nStab'), String(nStab));
    txt($('rho_same'), same ? '重合' : '不同');
    var msg;
    if (nStab > 1) msg = '多个稳定匹配：谁提出，谁拿到格的优端。差距 ' + gap.toFixed(2) + ' 个序位。';
    else if (gap > 0.05) msg = '稳定匹配唯一，提出权不再改配对；但这一匹配里两侧序位仍不对称。';
    else msg = '两侧最优重合，冲突消失。ρ=0.4 起本市场只剩 1 个稳定匹配。';
    txt($('rho_vh'), msg);
    tint($('rho_vh'), nStab > 1 ? C.red : C.green);
    var ysP = [], ysR = [], k;
    for (k = 0; k <= 10; k++) {
      var s = sideStats(blendMarket(k / 10).mp, blendMarket(k / 10).wp);
      ysP.push(s.pAvg);
      ysR.push(s.rAvg);
    }
    lineRho($('rhoChart'), ysP, ysR, rho);
  }
  function lineRho(cv, ysP, ysR, rho) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 16, pt = 22, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    var ymin = 1, ymax = 2.6;
    axisY(ctx, pl, y1, bh, ymin, ymax, w);
    function sx(i) { return pl + (i / 10) * bw; }
    function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
    ctx.strokeStyle = C.axis;
    ctx.beginPath();
    ctx.moveTo(pl, y1);
    ctx.lineTo(pl + bw, y1);
    ctx.stroke();
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    [0, 5, 10].forEach(function (i) {
      ctx.fillText((i / 10).toFixed(1), sx(i), y1 + 13);
    });
    function stroke(ys, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ys.forEach(function (v, i) {
        if (i === 0) ctx.moveTo(sx(i), sy(v));
        else ctx.lineTo(sx(i), sy(v));
      });
      ctx.stroke();
      ctx.fillStyle = color;
      ys.forEach(function (v, i) { ctx.beginPath(); ctx.arc(sx(i), sy(v), 2.4, 0, 6.3); ctx.fill(); });
    }
    stroke(ysP, C.blue);
    stroke(ysR, C.amber);
    var xm = pl + rho * bw;
    ctx.strokeStyle = C.red;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(xm, pt);
    ctx.lineTo(xm, y1);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = C.red;
    ctx.textAlign = 'left';
    ctx.fillText('ρ=' + rho.toFixed(1), pl + 4, pt + 12);
    ctx.fillStyle = C.ink2;
    ctx.textAlign = 'right';
    ctx.fillText('蓝提出方 · 琥珀接受方', pl + bw, pt + 12);
    ctx.fillStyle = C.ink3;
    ctx.fillText('共同质量 ρ', pl + bw, y1 + 31);
  }

  /* ---------- 截断 ---------- */
  function updTr() {
    var k = +($('tr_k') && $('tr_k').value);
    if (k !== 1 && k !== 2) k = 2;
    txt($('tr_kO'), String(k));
    var hP = [[0, 1], [1, 0]];
    var sTrue = [[1, 0], [0, 1]];
    var sP = [sTrue[0].slice(0, k), sTrue[1].slice()];
    var r = da(hP, sP);
    var sRanks = [0, 1].map(function (s) { return rankOf(sTrue[s], r.matchR[s]) + 1; });
    var hRanks = [0, 1].map(function (h) { return rankOf(hP[h], r.matchP[h]) + 1; });
    txt($('tr_sAvg'), avg(sRanks).toFixed(2));
    txt($('tr_hAvg'), avg(hRanks).toFixed(2));
    txt($('tr_prop'), String(r.proposals));
    var hn = ['甲', '乙'], sn = ['子', '丑'];
    txt($('tr_match'), hn[0] + '–' + sn[r.matchP[0]] + ' · ' + hn[1] + '–' + sn[r.matchP[1]]);
    var msg = k === 2
      ? '如实填报：医院最优。两名学生都拿到第 2 志愿，医院都拿到第 1 志愿。'
      : '子把名单截到只留乙：配对跳到学生最优。学生均秩 2.00→1.00，医院 1.00→2.00，提议 2→4。';
    txt($('tr_vh'), msg);
    tint($('tr_vh'), k === 1 ? C.red : C.ink);
    bars($('trChart'), [
      { lab: '学生均秩', v: avg(sRanks), c: C.blue, dp: 2 },
      { lab: '医院均秩', v: avg(hRanks), c: C.amber, dp: 2 }
    ], 0, 2.8, '序位（越小越好）');
  }

  /* ---------- 提议上界 ---------- */
  function identicalCycle(n) {
    var mp = [], wp = [], seq = [], i, j, k, p;
    for (i = 0; i < n; i++) seq.push(i);
    for (i = 0; i < n; i++) mp.push(seq.slice());
    for (j = 0; j < n; j++) {
      p = [];
      for (k = 0; k < n; k++) p.push((j + k) % n);
      wp.push(p);
    }
    return { mp: mp, wp: wp };
  }
  function updBd() {
    var n = +($('bd_n') && $('bd_n').value);
    if (!(n >= 2 && n <= 6)) n = 3;
    txt($('bd_nO'), String(n));
    var mkt = identicalCycle(n);
    var r = da(mkt.mp, mkt.wp);
    var pRanks = [], recRanks = [], i, wOf = [];
    for (i = 0; i < n; i++) wOf.push(-1);
    for (i = 0; i < n; i++) wOf[r.matchP[i]] = i;
    for (i = 0; i < n; i++) {
      pRanks.push(rankOf(mkt.mp[i], r.matchP[i]) + 1);
      recRanks.push(rankOf(mkt.wp[i], wOf[i]) + 1);
    }
    var bound = n * n;
    var brute = BRUTE[n];
    txt($('bd_bound'), String(bound));
    txt($('bd_real'), String(r.proposals));
    txt($('bd_brute'), brute ? String(brute) : '未穷举');
    txt($('bd_pAvg'), avg(pRanks).toFixed(2));
    txt($('bd_rAvg'), avg(recRanks).toFixed(2));
    var msg = '同质提出方互相踩踏：均秩 (n+1)/2 = ' + avg(pRanks).toFixed(2)
      + '，接受方均秩 ' + avg(recRanks).toFixed(2)
      + '。上界 n²=' + bound + '，本构造提议 ' + r.proposals + '。';
    if (brute) msg += ' n=' + n + ' 穷举最大为 ' + brute + '，夹在构造与上界之间。';
    else msg += ' n>3 不再穷举（n=4 已是 24⁸ 个市场）。';
    txt($('bd_vh'), msg);
    tint($('bd_vh'), C.ink);
    var items = [
      { lab: '上界 n²', v: bound, c: C.amber, dp: 0 },
      { lab: '同质构造', v: r.proposals, c: C.blue, dp: 0 }
    ];
    if (brute) items.push({ lab: '穷举最大', v: brute, c: C.red, dp: 0 });
    bars($('bdChart'), items, 0, bound * 1.25, '提议次数');
  }

  function boot() { updGs(); updRho(); updTr(); updBd(); }
  bind(['gs_side'], updGs);
  bind(['rho'], updRho);
  bind(['tr_k'], updTr);
  bind(['bd_n'], updBd);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
