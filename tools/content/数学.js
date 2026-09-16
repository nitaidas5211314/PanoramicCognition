/* ============================================================
   《数学》主题脚本
   四个可调模型（滑块全部真实参与计算）：
     1. 组合爆炸     — 符号数 S × 公式长 L → 候选命题数（指数爆炸）
     2. 连续增长 e   — n 步 → (1+1/n)^n 与 e 的误差
     3. 素数计数     — x → π(x) 与 x/ln x 的相对误差曲线
     4. 不动点收敛   — 初值 x0 → x=cos(x) 收敛轨迹
   自包含 IIFE，与页面通用脚本隔离。零依赖，正态分位用二分法对
   Abramowitz–Stegun ncdf 求逆（验证：normInv(0.975)=1.95996）。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  /* 标准正态 CDF，Abramowitz & Stegun 7.1.26，|误差| < 7.5e-8 */
  function ncdf(x) {
    var s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2;
    var t = 1 / (1 + 0.3275911 * z);
    var y = 1 - (t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 +
            t * (-1.453152027 + t * 1.061405429))))) * Math.exp(-z * z);
    return 0.5 * (1 + s * y);
  }

  /* 正态分位数：对 ncdf 二分求逆（零依赖、无 CDN，可验证） */
  function normInv(p) {
    if (p <= 0) return -8;
    if (p >= 1) return 8;
    var lo = -8, hi = 8, m;
    for (var i = 0; i < 80; i++) { m = (lo + hi) / 2; if (ncdf(m) < p) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }

  /* ════════════════════════════════════════════════
     工具① · 组合爆炸
     candidates = Σ_{k=1}^{L} S^k = S(S^L-1)/(S-1)
     ════════════════════════════════════════════════ */
  (function comboExplosion() {
    var SE = $('m1_S'), LE = $('m1_L');
    if (!SE || !LE) return;
    var SO = $('m1_SO'), LO = $('m1_LO');
    var cE = $('m1_c'), logE = $('m1_log'), zE = $('m1_z'), vE = $('m1_v');
    var cv = $('m1Chart'), ctx = cv ? cv.getContext('2d') : null;
    var FP = 0.7390851332151607;

    function draw(S, L, log10) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 150;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      var pad = { l: 120, r: 30, t: 18, b: 30 }, bw = w - pad.l - pad.r;
      var maxLog = 40;
      var humanLog = 6;
      function bar(y, logv, col, label) {
        var len = Math.max(2, (logv / maxLog) * bw);
        ctx.fillStyle = col; ctx.fillRect(pad.l, y, len, 22);
        ctx.fillStyle = '#2b3340'; ctx.font = '11px -apple-system,sans-serif';
        var lab = label + ' (10^' + logv.toFixed(2) + ')';
        var tw = ctx.measureText(lab).width;
        ctx.textAlign = 'left';
        if (pad.l + len + 8 + tw > w - pad.r) { ctx.textAlign = 'right'; ctx.fillText(lab, pad.l + len - 8, y + 16); }
        else ctx.fillText(lab, pad.l + len + 8, y + 16);
      }
      bar(pad.t, humanLog, '#c9d3e0', '人一生可读≈10^6');
      bar(pad.t + 36, log10, '#3b6fb0', '候选命题');
      ctx.fillStyle = '#7c848f'; ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('横轴=log₁₀(量级)，满刻度 10^40；蓝条越出灰条越远=越需机器/结构筛选', pad.l, h - 8);
    }

    function upd() {
      var S = parseInt(SE.value, 10), L = parseInt(LE.value, 10);
      if (!(S >= 2)) S = 2; if (!(L >= 1)) L = 1;
      txt(SO, S); txt(LO, L);
      var cand = S === 1 ? L : S * (Math.pow(S, L) - 1) / (S - 1);
      var log10 = Math.log10(cand);
      var fmt = cand >= 1e6 ? cand.toExponential(3) : Math.round(cand).toLocaleString('en-US');
      txt(cE, fmt);
      txt(logE, log10.toFixed(3));
      txt(zE, normInv(0.975).toFixed(5));
      var ratio = Math.pow(10, Math.max(0, log10 - 6));
      txt(vE, '候选命题数已是"人一生可读 10^6 条"的约 ' + (ratio >= 1000 ? ratio.toExponential(2) : ratio.toFixed(1)) +
               ' 倍——靠人海战术不现实，必须靠同构/不变量筛选或机器形式化搜索');
      tint(vE, log10 > 6 ? 'var(--red)' : 'var(--green)');
      draw(S, L, log10);
    }
    [SE, LE].forEach(function (e) { e.addEventListener('input', upd); });
    window.addEventListener('resize', upd); upd();
  })();

  /* ════════════════════════════════════════════════
     工具② · 连续增长 e 的极限
     val=(1+1/n)^n，err=e−val
     ════════════════════════════════════════════════ */
  (function eLimit() {
    var nE = $('m2_n'); if (!nE) return;
    var nO = $('m2_nO'), valE = $('m2_val'), errE = $('m2_err'), vE = $('m2_v');
    var cv = $('m2Chart'), ctx = cv ? cv.getContext('2d') : null;
    var E = Math.E;

    function draw(n, err) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 160;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      var pad = { l: 64, r: 18, t: 16, b: 34 }, pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
      // 采样 log-n 曲线
      var pts = [], maxErr = 0, nMax = 1000;
      for (var k = 0; k <= 60; k++) {
        var nn = Math.max(1, Math.round(Math.exp(k / 60 * Math.log(nMax))));
        var e2 = E - Math.pow(1 + 1 / nn, nn);
        if (e2 > maxErr) maxErr = e2;
        pts.push([nn, e2]);
      }
      if (err > maxErr) maxErr = err;
      var sx = function (nn) { return pad.l + (Math.log(nn) / Math.log(nMax)) * pw; };
      var sy = function (e2) { return pad.t + ph - (e2 / (maxErr || 1)) * ph; };
      ctx.strokeStyle = '#eef1f5'; ctx.lineWidth = 1;
      for (var g = 0; g <= 4; g++) {
        var yy = pad.t + ph - g / 4 * ph;
        ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(pad.l + pw, yy); ctx.stroke();
        ctx.fillStyle = '#7c848f'; ctx.font = '9px -apple-system,sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxErr * g / 4).toExponential(1), pad.l - 6, yy + 3);
      }
      ctx.strokeStyle = '#3b6fb0'; ctx.lineWidth = 2; ctx.beginPath();
      pts.forEach(function (p, i) { var X = sx(p[0]), Y = sy(p[1]); if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
      ctx.stroke();
      // 标记当前 n
      var Xn = sx(n), Yn = sy(err);
      ctx.strokeStyle = '#d5632c'; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(Xn, pad.t); ctx.lineTo(Xn, pad.t + ph); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#d5632c'; ctx.beginPath(); ctx.arc(Xn, Yn, 3.5, 0, 7); ctx.fill();
      ctx.fillStyle = '#7c848f'; ctx.font = '10px -apple-system,sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('横轴=log n（1→1000），纵轴=与 e 的误差；误差随 n 反比下降', pad.l, h - 8);
    }

    function upd() {
      var n = parseInt(nE.value, 10); if (!(n >= 1)) n = 1;
      var val = Math.pow(1 + 1 / n, n), err = E - val;
      txt(nO, n); txt(valE, val.toFixed(6));
      txt(errE, err.toExponential(3));
      txt(vE, n >= 1000 ? 'n=1000 时误差仅 ' + (err * 1000).toFixed(3) + '‰，已逼近 e；要到 1e-6 需 n≈1.4×10⁶'
                        : '误差随 n 反比缩小；n 越大越接近 e≈2.71828');
      tint(vE, 'var(--green)');
      draw(n, err);
    }
    nE.addEventListener('input', upd); window.addEventListener('resize', upd); upd();
  })();

  /* ════════════════════════════════════════════════
     工具③ · 素数计数 π(x) ≈ x/ln x 的误差
     ════════════════════════════════════════════════ */
  (function primeCount() {
    var xE = $('m3_x'); if (!xE) return;
    var xO = $('m3_xO'), piE = $('m3_pi'), apE = $('m3_approx'), relE = $('m3_rel'), vE = $('m3_v');
    var cv = $('m3Chart'), ctx = cv ? cv.getContext('2d') : null;

    function sievePi(N) {
      var s = new Uint8Array(N + 1), cnt = new Int32Array(N + 1);
      var c = 0;
      for (var i = 2; i <= N; i++) {
        if (!s[i]) { c++; for (var j = 2 * i; j <= N; j += i) s[j] = 1; }
        cnt[i] = c;
      }
      return cnt;
    }

    function draw(X, cnt) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 160;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 18, t: 16, b: 34 }, pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
      var xMin = 100, rels = [], maxAbs = 0;
      for (var k = 0; k <= 60; k++) {
        var xx = Math.round(Math.exp(Math.log(xMin) + k / 60 * (Math.log(X) - Math.log(xMin))));
        if (xx < 2) continue;
        var pi = cnt[xx], approx = xx / Math.log(xx), rel = (approx - pi) / pi * 100;
        if (Math.abs(rel) > maxAbs) maxAbs = Math.abs(rel);
        rels.push([xx, rel]);
      }
      if (maxAbs <= 0) maxAbs = 1;
      var sx = function (xx) { return pad.l + (Math.log(xx) / Math.log(X)) * pw; };
      var sy = function (rel) { return pad.t + ph / 2 - (rel / maxAbs) * (ph / 2 - 4); };
      // 0 线
      ctx.strokeStyle = '#c9d0d9'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(pad.l, sy(0)); ctx.lineTo(pad.l + pw, sy(0)); ctx.stroke();
      ctx.fillStyle = '#7c848f'; ctx.font = '9px -apple-system,sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('0%', pad.l - 6, sy(0) + 3);
      ctx.strokeStyle = '#3b6fb0'; ctx.lineWidth = 2; ctx.beginPath();
      rels.forEach(function (p, i) { var X2 = sx(p[0]), Y2 = sy(p[1]); if (i) ctx.lineTo(X2, Y2); else ctx.moveTo(X2, Y2); });
      ctx.stroke();
      ctx.fillStyle = '#7c848f'; ctx.font = '10px -apple-system,sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('横轴=log x，纵轴=相对误差%；x/ln x 在可见范围系统性低估 π(x)', pad.l, h - 8);
    }

    function upd() {
      var X = parseInt(xE.value, 10); if (!(X >= 100)) X = 100;
      var cnt = sievePi(X);
      var pi = cnt[X], approx = X / Math.log(X), rel = (approx - pi) / pi * 100;
      txt(xO, X.toLocaleString('en-US')); txt(piE, pi.toLocaleString('en-US'));
      txt(apE, approx.toFixed(1)); txt(relE, rel.toFixed(2) + '%');
      txt(vE, rel < 0 ? 'x/ln x 低估 π(x) 约 ' + Math.abs(rel).toFixed(1) + '%——简单公式逼近复杂分布的代价；x 越大相对误差越小'
                        : 'x/ln x 已逼近 π(x)');
      tint(vE, rel < 0 ? 'var(--amber)' : 'var(--green)');
      draw(X, cnt);
    }
    xE.addEventListener('input', upd); window.addEventListener('resize', upd); upd();
  })();

  /* ════════════════════════════════════════════════
     工具④ · 不动点迭代收敛  x_{k+1}=cos(x_k)
     ════════════════════════════════════════════════ */
  (function fixedPoint() {
    var x0E = $('m4_x0'); if (!x0E) return;
    var x0O = $('m4_x0O'), fpE = $('m4_fp'), itE = $('m4_it'), vE = $('m4_v');
    var cv = $('m4Chart'), ctx = cv ? cv.getContext('2d') : null;
    var FP = 0.7390851332151607;

    function draw(traj) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 170;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 18, t: 16, b: 30 }, pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
      var N = traj.length, xmin = 0, xmax = 1;
      var sx = function (i) { return pad.l + (N <= 1 ? 0 : i / (N - 1)) * pw; };
      var sy = function (xv) { return pad.t + ph - (xv - xmin) / (xmax - xmin) * ph; };
      // 固定点参考线
      ctx.strokeStyle = '#d5632c'; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(pad.l, sy(FP)); ctx.lineTo(pad.l + pw, sy(FP)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#d5632c'; ctx.font = '9px -apple-system,sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('不动点 ' + FP.toFixed(6), pad.l + 4, sy(FP) - 4);
      // 轨迹
      ctx.strokeStyle = '#3b6fb0'; ctx.lineWidth = 2; ctx.beginPath();
      traj.forEach(function (xv, i) { var X2 = sx(i), Y2 = sy(xv); if (i) ctx.lineTo(X2, Y2); else ctx.moveTo(X2, Y2); });
      ctx.stroke();
      ctx.fillStyle = '#3b6fb0'; traj.forEach(function (xv, i) { ctx.beginPath(); ctx.arc(sx(i), sy(xv), 2.4, 0, 7); ctx.fill(); });
      ctx.fillStyle = '#7c848f'; ctx.font = '10px -apple-system,sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('横轴=迭代步数，纵轴=x_k；任意初值都殊途同归于不动点', pad.l, h - 8);
    }

    function upd() {
      var x0 = parseFloat(x0E.value);
      txt(x0O, x0.toFixed(2));
      var x = x0, traj = [x], it = 0;
      while (Math.abs(x - FP) > 1e-9 && it < 300) { x = Math.cos(x); traj.push(x); it++; }
      txt(fpE, FP.toFixed(8)); txt(itE, String(it));
      txt(vE, '初值 ' + x0.toFixed(2) + ' 经 ' + it + ' 步收敛到 ' + FP.toFixed(8) +
               '——均衡、定价稳定、梯度下降都是同一形态');
      tint(vE, 'var(--green)');
      draw(traj);
    }
    x0E.addEventListener('input', upd); window.addEventListener('resize', upd); upd();
  })();

})();
