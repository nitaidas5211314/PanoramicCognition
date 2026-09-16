/* 《高勝算決策》主题脚本 —— 四组可调模型
   1) 結果的信噪比    2) 賭注校準台    3) 求真小組的定價    4) 心理時間旅行
   全部为纯计算 + Canvas 绘制，无外部依赖。 */
(function () {
  'use strict';

  // ══════════ 通用 ══════════
  function $(id) { return document.getElementById(id); }
  function set(id, s) { var e = $(id); if (e) e.textContent = s; }
  var C = {
    ink: '#0f172a', mut: '#64748b', line: '#e2e8f0',
    blue: '#2563eb', amber: '#d97706', green: '#059669',
    red: '#dc2626', purple: '#7c3aed', slate: '#94a3b8'
  };
  function label(ctx, t, x, y, color, size, align, weight) {
    ctx.fillStyle = color || C.mut;
    ctx.font = (weight || '400') + ' ' + (size || 11) + 'px -apple-system,"PingFang SC","Helvetica Neue",Arial,sans-serif';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(t, x, y);
  }
  function prep(cv, h) {
    if (!cv) return null;
    var dpr = window.devicePixelRatio || 1;
    var w = cv.clientWidth || cv.parentNode.clientWidth || 600;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    cv.style.height = h + 'px';
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx: ctx, w: w, h: h };
  }
  function grid(ctx, x0, y0, x1, y1, rows) {
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    for (var i = 0; i <= rows; i++) {
      var y = y0 + (y1 - y0) * i / rows;
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    }
  }

  // ══════════ 数值工具：ln Γ、二项 PMF、孔多塞 ══════════
  function lgamma(x) {
    var g = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
             12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
    x -= 1;
    var a = 0.99999999999980993, t = x + 7.5;
    for (var i = 0; i < 8; i++) a += g[i] / (x + i + 1);
    return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }
  function binomPMF(n, p) {
    var out = new Float64Array(n + 1);
    if (p <= 0) { out[0] = 1; return out; }
    if (p >= 1) { out[n] = 1; return out; }
    var k0 = Math.floor((n + 1) * p); if (k0 > n) k0 = n; if (k0 < 0) k0 = 0;
    out[k0] = Math.exp(lgamma(n + 1) - lgamma(k0 + 1) - lgamma(n - k0 + 1) +
                       k0 * Math.log(p) + (n - k0) * Math.log(1 - p));
    for (var k = k0; k > 0; k--) out[k - 1] = out[k] * k / (n - k + 1) * (1 - p) / p;
    for (var j = k0; j < n; j++) out[j + 1] = out[j] * (n - j) / (j + 1) * p / (1 - p);
    return out;
  }
  function condorcet(n, p) {
    if (n <= 1) return p;
    var m = binomPMF(n, p), s = 0, half = Math.floor(n / 2);
    for (var k = half + 1; k <= n; k++) s += m[k];
    return s;
  }
  // 判别准确率：两个对称决策者 pG / 1-pG，先验各半，成功过半判为「好」
  function accN(n, pG) {
    var pB = 1 - pG, mG = binomPMF(n, pG), mB = binomPMF(n, pB);
    var a = 0, half = n / 2;
    for (var k = 0; k <= n; k++) a += (k > half ? 0.5 * mG[k] : 0.5 * mB[k]);
    return a;
  }
  var accCache = {};
  function needN(pG, target) {
    var key = pG + '|' + target;
    if (accCache[key]) return accCache[key];
    var lo = 1, hi = 4000;
    if (accN(hi, pG) < target) { accCache[key] = null; return null; }
    while (lo < hi) { var mid = (lo + hi) >> 1; if (accN(mid, pG) >= target) hi = mid; else lo = mid + 1; }
    accCache[key] = lo;
    return lo;
  }
  var pct = function (x, d) { return (x * 100).toFixed(d === undefined ? 2 : d); };
  var sgn = function (x, d) { return (x >= 0 ? '+' : '−') + Math.abs(x).toFixed(d === undefined ? 2 : d); };

  // ══════════════════════════════════════════════
  // 模型一 · 結果的信噪比
  // ══════════════════════════════════════════════
  var tbChart = $('tbChart');
  function renderTB() {
    var pG = +$('tb_pG').value / 100, n = +$('tb_n').value;
    set('tb_pGO', (pG * 100).toFixed(0) + '%');
    set('tb_nO', n + ' 次');

    var acc = accN(n, pG);
    var n90 = needN(pG, 0.90), n95 = needN(pG, 0.95);

    set('tb_post', pct(pG, 1) + '%');
    set('tb_sig', '±' + ((pG - 0.5) * 100).toFixed(1) + ' pp');
    set('tb_fail', pct(1 - pG, 1) + '%');
    set('tb_acc', pct(acc, 1) + '%');
    set('tb_need', n90 ? n90 + ' 次' : '> 4000 次');
    set('tb_need95', n95 ? n95 + ' 次' : '> 4000 次');

    var vd;
    if (acc < 0.60) vd = n + ' 次结果只有 ' + pct(acc, 1) + '% 的判别力——几乎等于瞎猜，你却在用它下结论';
    else if (acc < 0.80) vd = n + ' 次结果只够判到 ' + pct(acc, 1) + '%——结果论不是懒，是样本不够';
    else if (acc < 0.95) vd = n + ' 次结果能判到 ' + pct(acc, 1) + '%，但这要求你做满 ' + n + ' 次同质的重复决策';
    else vd = '要 ' + n + ' 次才判到 ' + pct(acc, 1) + '%——绝大多数人一辈子攒不到这个样本量';
    set('tb_vd', vd);

    var p = prep(tbChart, 214); if (!p) return;
    var ctx = p.ctx, w = p.w, h = p.h;
    var x0 = 46, x1 = w - 14, y0 = 22, y1 = h - 46;
    var lo = 0.5, hi = 1.0;
    var X = function (k) { return x0 + (Math.log(k) / Math.log(300)) * (x1 - x0); };
    var Y = function (v) { return y1 - (v - lo) / (hi - lo) * (y1 - y0); };

    grid(ctx, x0, y0, x1, y1, 5);
    [0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(function (v) {
      label(ctx, (v * 100) + '%', x0 - 6, Y(v), C.mut, 9.5, 'right');
    });
    [1, 3, 10, 30, 100, 300].forEach(function (k) {
      label(ctx, String(k), X(k), y1 + 13, C.mut, 9.5, 'center');
    });
    label(ctx, '累積的決策次數（對數尺度）', (x0 + x1) / 2, y1 + 31, C.mut, 10, 'center');

    // 瞎猜基线
    ctx.strokeStyle = C.slate; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(x0, Y(0.5)); ctx.lineTo(x1, Y(0.5)); ctx.stroke();
    ctx.setLineDash([]);
    label(ctx, '瞎猜 = 50%', x0 + 6, Y(0.5) - 9, C.slate, 9.5, 'left');

    // 判别准确率曲线
    ctx.strokeStyle = C.blue; ctx.lineWidth = 2.2; ctx.beginPath();
    var started = false;
    for (var k = 1; k <= 300; k++) {
      var v = accN(k, pG);
      if (!started) { ctx.moveTo(X(k), Y(v)); started = true; } else ctx.lineTo(X(k), Y(v));
    }
    ctx.stroke();

    // 90% / 95% 参考线
    [[0.90, C.amber, '90%'], [0.95, C.green, '95%']].forEach(function (t) {
      ctx.strokeStyle = t[1]; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(x0, Y(t[0])); ctx.lineTo(x1, Y(t[0])); ctx.stroke();
      ctx.setLineDash([]);
      label(ctx, t[2], x1 - 4, Y(t[0]) - 9, t[1], 9.5, 'right');
    });

    // 当前点
    var cx = X(n), cy = Y(acc);
    ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; ctx.stroke();
    label(ctx, n + ' 次 → ' + pct(acc, 1) + '%',
          cx > (x0 + x1) / 2 ? cx - 10 : cx + 10, cy - 12, C.red, 10.5,
          cx > (x0 + x1) / 2 ? 'right' : 'left', '700');

    // 标注
    label(ctx, '好決策勝率 ' + pct(pG, 0) + '% / 壞決策 ' + pct(1 - pG, 0) + '%',
          x0, y0 - 11, C.ink, 11, 'left', '700');
  }

  // ══════════════════════════════════════════════
  // 模型二 · 賭注校準台
  // ══════════════════════════════════════════════
  var cbChart = $('cbChart');
  function brier(c, a) { return a * (1 - c) * (1 - c) + (1 - a) * c * c; }
  function renderCB() {
    var c = +$('cb_c').value / 100, a = +$('cb_a').value / 100;
    set('cb_cO', (c * 100).toFixed(0) + '%');
    set('cb_aO', (a * 100).toFixed(0) + '%');

    var b = brier(c, a), best = a * (1 - a), gap = b - best;
    var odds = (1 - c) / c, ev = a * odds - (1 - a);

    set('cb_brier', b.toFixed(4));
    set('cb_best', best.toFixed(4));
    set('cb_gap', '+' + gap.toFixed(4));
    set('cb_vs', (b >= 0.25 ? '劣於基線 +' : '優於基線 −') + Math.abs(b - 0.25).toFixed(4));
    set('cb_odds', odds.toFixed(2) + ' : 1');
    set('cb_ev', sgn(ev * 100, 1) + '%');

    var vd;
    var d = c - a;
    if (d > 0.10) vd = '說 ' + pct(c, 0) + '% 實際只對 ' + pct(a, 0) + '%——Brier 比沉默更差，每注虧掉本金的 ' + Math.abs(ev * 100).toFixed(0) + '%';
    else if (d > 0.03) vd = '輕度過度自信（+' + (d * 100).toFixed(0) + 'pp）——把報價下調到 ' + pct(a, 0) + '% 就回到最優';
    else if (d < -0.03) vd = '過度謙虛（' + (d * 100).toFixed(0) + 'pp）——你低估了自己，報 ' + pct(a, 0) + '% 才是最優';
    else vd = '校準良好（落差 ' + Math.abs(d * 100).toFixed(1) + 'pp）——報價與命中率基本吻合';
    set('cb_vd', vd);

    var p = prep(cbChart, 210); if (!p) return;
    var ctx = p.ctx, w = p.w, h = p.h;
    var x0 = 48, x1 = w - 14, y0 = 22, y1 = h - 46;
    var lo = 0.5, hi = 1.0, vlo = 0, vhi = 0.46;
    var X = function (v) { return x0 + (v - lo) / (hi - lo) * (x1 - x0); };
    var Y = function (v) { return y1 - (v - vlo) / (vhi - vlo) * (y1 - y0); };

    grid(ctx, x0, y0, x1, y1, 4);
    [0, 0.1, 0.2, 0.3, 0.4].forEach(function (v) { label(ctx, v.toFixed(1), x0 - 6, Y(v), C.mut, 9.5, 'right'); });
    [0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(function (v) { label(ctx, (v * 100) + '%', X(v), y1 + 13, C.mut, 9.5, 'center'); });
    label(ctx, '你報出的把握程度', (x0 + x1) / 2, y1 + 31, C.mut, 10, 'center');
    label(ctx, 'Brier 分數', x0, y0 - 12, C.mut, 10, 'left');

    // 0.25 基线
    ctx.strokeStyle = C.slate; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(x0, Y(0.25)); ctx.lineTo(x1, Y(0.25)); ctx.stroke();
    ctx.setLineDash([]);
    label(ctx, '0.25 = 永遠說 50%', x1 - 4, Y(0.25) - 9, C.slate, 9.5, 'right');

    // Brier(c, a) 曲线
    ctx.strokeStyle = C.blue; ctx.lineWidth = 2.2; ctx.beginPath();
    for (var i = 0; i <= 120; i++) {
      var cc = lo + (hi - lo) * i / 120, yy = Y(brier(cc, a));
      if (i === 0) ctx.moveTo(X(cc), yy); else ctx.lineTo(X(cc), yy);
    }
    ctx.stroke();

    // 最优点
    ctx.fillStyle = C.green;
    ctx.beginPath(); ctx.arc(X(a), Y(best), 5, 0, 6.2832); ctx.fill();
    label(ctx, '最優：誠實報 ' + pct(a, 0) + '%', X(a) + 8, Y(best) + 13, C.green, 10, 'left', '700');

    // 当前点
    ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.arc(X(c), Y(b), 5, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; ctx.stroke();
    label(ctx, c > 0.82 ? '你的報價 ' + pct(c, 0) + '%' : '你的報價 ' + pct(c, 0) + '%',
          X(c) + (c > 0.82 ? -8 : 8), Y(b) - 13, C.red, 10.5,
          c > 0.82 ? 'right' : 'left', '700');

    label(ctx, '實際命中率 ' + pct(a, 0) + '%', x0, y0 - 11, C.ink, 11, 'left', '700');
  }

  // ══════════════════════════════════════════════
  // 模型三 · 求真小組的定價
  // ══════════════════════════════════════════════
  var podChart = $('podChart');
  function renderPOD() {
    var n = +$('pod_n').value, p = +$('pod_p').value / 100, rho = +$('pod_rho').value / 100;
    set('pod_nO', n + ' 人');
    set('pod_pO', (p * 100).toFixed(0) + '%');
    set('pod_rhoO', (rho * 100).toFixed(0) + '%');

    var ind = condorcet(n, p);
    var act = (1 - rho) * ind + rho * p;
    var gain = act - p, gainIdeal = ind - p;
    var lost = gainIdeal > 0 ? 1 - gain / gainIdeal : 0;

    set('pod_ind', pct(ind) + '%');
    set('pod_act', pct(act) + '%');
    set('pod_gain', sgn(gain * 100) + ' pp');
    set('pod_lost', '−' + pct(lost, 1));

    // 等效独立人数
    var eq = null;
    for (var k = 1; k <= 401; k += 2) { if (condorcet(k, p) >= act - 1e-12) { eq = k; break; } }
    set('pod_equiv', eq ? eq + ' 人' : '> 401 人');

    var vd;
    if (rho >= 0.9) vd = 'ρ=' + pct(rho, 0) + '：全組共享同一個盲區，' + n + ' 人小組等於一個人';
    else if (lost >= 0.5) vd = n + ' 人小組因 ρ=' + pct(rho, 0) + ' 縮水 ' + pct(lost, 0) + '，只值 ' + (eq || '?') + ' 個獨立的人';
    else if (lost >= 0.2) vd = n + ' 人小組因 ρ=' + pct(rho, 0) + ' 縮水到相當於 ' + (eq || '?') + ' 個獨立的人——增益打了 ' + pct(1 - lost, 0) + ' 折';
    else vd = '相關性很低——' + n + ' 人小組基本拿到了孔多塞上限，增益 ' + sgn(gain * 100) + 'pp';
    set('pod_vd', vd);

    var pp = prep(podChart, 214); if (!pp) return;
    var ctx = pp.ctx, w = pp.w, h = pp.h;
    var x0 = 46, x1 = w - 14, y0 = 22, y1 = h - 46;
    var NMAX = 21, vlo = 0.5, vhi = 1.0;
    var X = function (v) { return x0 + (v - 1) / (NMAX - 1) * (x1 - x0); };
    var Y = function (v) { return y1 - (v - vlo) / (vhi - vlo) * (y1 - y0); };

    grid(ctx, x0, y0, x1, y1, 5);
    [0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(function (v) { label(ctx, (v * 100) + '%', x0 - 6, Y(v), C.mut, 9.5, 'right'); });
    [1, 3, 5, 7, 9, 11, 15, 21].forEach(function (v) { label(ctx, String(v), X(v), y1 + 13, C.mut, 9.5, 'center'); });
    label(ctx, '小組成員數', (x0 + x1) / 2, y1 + 31, C.mut, 10, 'center');

    // 单人水平
    ctx.strokeStyle = C.slate; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(x0, Y(p)); ctx.lineTo(x1, Y(p)); ctx.stroke();
    ctx.setLineDash([]);
    label(ctx, '單個成員 ' + pct(p, 0) + '%', x1 - 4, Y(p) - 9, C.slate, 9.5, 'right');

    // 独立曲线
    ctx.strokeStyle = C.green; ctx.lineWidth = 2.2; ctx.beginPath();
    for (var k2 = 1; k2 <= NMAX; k2 += 2) {
      var v2 = condorcet(k2, p), xx = X(k2), yy = Y(v2);
      if (k2 === 1) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    }
    ctx.stroke();
    label(ctx, 'ρ=0（理想獨立）', X(15) + 4, Y(condorcet(15, p)) - 12, C.green, 10, 'left', '700');

    // 实际曲线
    ctx.strokeStyle = C.red; ctx.lineWidth = 2.4; ctx.beginPath();
    for (var k3 = 1; k3 <= NMAX; k3 += 2) {
      var v3 = (1 - rho) * condorcet(k3, p) + rho * p, xx3 = X(k3), yy3 = Y(v3);
      if (k3 === 1) ctx.moveTo(xx3, yy3); else ctx.lineTo(xx3, yy3);
    }
    ctx.stroke();
    label(ctx, 'ρ=' + pct(rho, 0) + '（你的小組）', X(15) + 4,
          Y((1 - rho) * condorcet(15, p) + rho * p) + 12, C.red, 10, 'left', '700');

    // 当前点
    ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.arc(X(n), Y(act), 5, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6; ctx.stroke();
    label(ctx, n + ' 人 → ' + pct(act, 1) + '%', X(n) + 8, Y(act) + 12,
          C.red, 10.5, 'left', '700');
  }

  // ══════════════════════════════════════════════
  // 模型四 · 心理時間旅行
  // ══════════════════════════════════════════════
  var tttChart = $('tttChart');
  function renderTTT() {
    var beta = +$('ttt_beta').value / 100;
    var delta = +$('ttt_delta').value / 100;
    var amt = +$('ttt_amt').value;
    set('ttt_betaO', beta.toFixed(2));
    set('ttt_deltaO', delta.toFixed(2));
    set('ttt_amtO', String(amt));

    var D = function (t) { return t <= 0 ? 1 : beta * Math.pow(delta, t); };
    var t10m = 10 / (365 * 24 * 60), t10mo = 10 / 12, t10y = 10;

    set('ttt_m10', (amt * D(t10m)).toFixed(2));
    set('ttt_m10m', (amt * D(t10mo)).toFixed(2));
    set('ttt_y10', (amt * D(t10y)).toFixed(2));
    var r1 = Math.pow(1 / D(1), 1) - 1;
    set('ttt_rate', pct(r1, 1) + '%');
    set('ttt_fork', pct(1 - beta, 0) + '%');

    var vd;
    var fork = 1 - beta;
    if (fork >= 0.45) vd = 'β=' + beta.toFixed(2) + '：未來的你只認 ' + pct(beta, 0) + ' 的帳，' + pct(fork, 0) + ' 的長期正確專案會被現在的你否掉——先上承諾裝置';
    else if (fork >= 0.15) vd = 'β=' + beta.toFixed(2) + '：' + pct(fork, 0) + ' 的長期正確專案被否掉，10-10-10 就是那 ' + pct(fork, 0) + ' 的找回器';
    else if (fork > 0.02) vd = 'β=' + beta.toFixed(2) + '：現時偏誤很輕，你基本上能和未來的自己達成一致（僅否掉 ' + pct(fork, 0) + '）';
    else vd = 'β=' + beta.toFixed(2) + '：無現時偏誤，未來與現在等價——這是一條純指數折現曲線';
    set('ttt_vd', vd);

    var p = prep(tttChart, 214); if (!p) return;
    var ctx = p.ctx, w = p.w, h = p.h;
    var x0 = 46, x1 = w - 14, y0 = 22, y1 = h - 46;
    // 时间轴：1 分钟 → 30 年，对数
    var TMIN = 1 / (365 * 24 * 60), TMAX = 30;
    var lmin = Math.log(TMIN), lmax = Math.log(TMAX);
    var X = function (t) { return x0 + (Math.log(t) - lmin) / (lmax - lmin) * (x1 - x0); };
    var Y = function (v) { return y1 - v * (y1 - y0); };

    grid(ctx, x0, y0, x1, y1, 4);
    [0, 0.25, 0.5, 0.75, 1.0].forEach(function (v) { label(ctx, v.toFixed(2), x0 - 6, Y(v), C.mut, 9.5, 'right'); });
    var ticks = [[1 / (365 * 24 * 60), '1分'], [1 / 24, '1時'], [1, '1天'], [1 / 12, '1月'], [1, '1年'], [10, '10年'], [30, '30年']];
    ticks.forEach(function (t) { label(ctx, t[1], X(t[0]), y1 + 13, C.mut, 9.5, 'center'); });
    label(ctx, '延遲時間（對數尺度）', (x0 + x1) / 2, y1 + 31, C.mut, 10, 'center');

    // 参考：纯指数（β=1）
    ctx.strokeStyle = C.slate; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    for (var i = 0; i <= 160; i++) {
      var t = Math.exp(lmin + (lmax - lmin) * i / 160), v = Math.pow(delta, t);
      var xx = X(t), yy = Y(v);
      if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    }
    ctx.stroke(); ctx.setLineDash([]);
    label(ctx, 'β=1（理性人：δ 的純指數）', X(3) + 4, Y(Math.pow(delta, 3)) + 13, C.slate, 9.5, 'left');

    // 准双曲曲线
    ctx.strokeStyle = C.purple; ctx.lineWidth = 2.4; ctx.beginPath();
    for (var j = 0; j <= 160; j++) {
      var t2 = Math.exp(lmin + (lmax - lmin) * j / 160), v2 = beta * Math.pow(delta, t2);
      var xx2 = X(t2), yy2 = Y(v2);
      if (j === 0) ctx.moveTo(xx2, yy2); else ctx.lineTo(xx2, yy2);
    }
    ctx.stroke();

    // β 断层：今天与「明天」之间的断崖
    var fx = x0 + 6;
    ctx.strokeStyle = C.red; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(fx, Y(1)); ctx.lineTo(fx, Y(beta)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fx - 3.5, Y(1) + 5); ctx.lineTo(fx, Y(1)); ctx.lineTo(fx + 3.5, Y(1) + 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fx - 3.5, Y(beta) - 5); ctx.lineTo(fx, Y(beta)); ctx.lineTo(fx + 3.5, Y(beta) - 5); ctx.stroke();
    label(ctx, 'β 斷層', fx + 7, (Y(1) + Y(beta)) / 2, C.red, 9.5, 'left', '700');

    // 三个 10-10-10 点
    [[t10m, '10 分鐘', C.amber], [t10mo, '10 個月', C.blue], [t10y, '10 年', C.green]].forEach(function (pt) {
      var px = X(pt[0]), py = Y(D(pt[0]));
      ctx.fillStyle = pt[2];
      ctx.beginPath(); ctx.arc(px, py, 4.5, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4; ctx.stroke();
      label(ctx, pt[1] + ' ' + (amt * D(pt[0])).toFixed(1), px, py - 12, pt[2], 10, 'center', '700');
    });
  }

  // ══════════ 绑定与初始化 ══════════
  var bindings = [
    ['tb_pG', renderTB], ['tb_n', renderTB],
    ['cb_c', renderCB], ['cb_a', renderCB],
    ['pod_n', renderPOD], ['pod_p', renderPOD], ['pod_rho', renderPOD],
    ['ttt_beta', renderTTT], ['ttt_delta', renderTTT], ['ttt_amt', renderTTT]
  ];
  bindings.forEach(function (b) {
    var el = $(b[0]);
    if (el) el.addEventListener('input', b[1]);
  });

  function renderAll() { renderTB(); renderCB(); renderPOD(); renderTTT(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
  window.addEventListener('resize', renderAll);
  window.addEventListener('load', renderAll);
})();
