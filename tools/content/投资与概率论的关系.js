/* ============================================================
   《投资与概率论的关系》主题脚本
   四个可调模型（全部真实参与计算）：

     1. 凯利仓位        f* = (p·b − q)/b，并由 g(f)=p·ln(1+fb)+q·ln(1−f) 求对数增长率
     2. 非遍历性        +50%/−40% 各半：系综平均(算术) vs 时间平均(几何)
     3. 贝叶斯后验      P(A|B) = sens·prior / (sens·prior + fpr·(1−prior))
     4. 波动拖累        几何 ≈ μ − σ²/2，(1+μ)^N vs (1+μ−σ²/2)^N

   自包含 IIFE，与页面通用脚本（进度条 / 导航高亮 / Tab）互不干扰。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f'
  };

  /* ── canvas 自适应：按设备像素比重设缓冲区，返回 CSS 像素坐标系 ── */
  function fit(cv, cssH) {
    if (!cv) return null;
    var dpr = window.devicePixelRatio || 1;
    var w = Math.max(240, cv.clientWidth || cv.parentNode.clientWidth || 640);
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(cssH * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: cssH };
  }
  function clear(g) { g.ctx.clearRect(0, 0, g.w, g.h); }
  function num(v) { return parseFloat(v); }
  /* 防御式写入：id 对不上时不要抛错 —— 一个 null 会中断整个 IIFE，
     导致后面所有工具（含 canvas）全部失效。 */
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  /* ══════════════════════════════════════════════════════════
     工具 1 · 凯利仓位
     ══════════════════════════════════════════════════════════ */
  (function kelly() {
    var pEl = $('kp_p'), bEl = $('kp_b'), kEl = $('kp_k');
    if (!pEl || !bEl || !kEl) return;
    var pO = $('kp_pO'), bO = $('kp_bO'), kO = $('kp_kO');
    var fEl = $('kp_f'), posEl = $('kp_pos'), gEl = $('kp_g');
    var fhEl = $('kp_fh'), poshEl = $('kp_posh'), ghEl = $('kp_gh');
    var vEl = $('kp_v'), vhEl = $('kp_vh');

    // 每笔下注的期望对数增长率
    function logG(p, b, f) {
      if (f <= 0) return 0;
      if (f >= 1) return p * Math.log(1 + f * b) + (1 - p) * Math.log(Math.max(1e-9, 1 - f));
      return p * Math.log(1 + f * b) + (1 - p) * Math.log(1 - f);
    }

    function upd() {
      var p = num(pEl.value) / 100;      // 胜率
      var b = num(bEl.value);            // 盈亏比（赢 b 倍下注额）
      var k = num(kEl.value);            // 凯利分数系数
      var q = 1 - p;

      pO.textContent = (p * 100).toFixed(0) + '%';
      bO.textContent = b.toFixed(1);
      kO.textContent = '× ' + k.toFixed(2);

      var fStar = (p * b - q) / b;       // 全凯利
      var neg = fStar <= 0;
      var full = Math.max(0, fStar);
      var pos = full * k;                // 实际建议仓位

      fEl.textContent = (full * 100).toFixed(1) + '%';
      fhEl.textContent = neg
        ? '期望值为负 —— 最优仓位是 0，不下注'
        : '满仓下注的数学上限（' + (p * 100).toFixed(0) + '% 胜率、' + b.toFixed(1) + ' 倍盈亏比）';

      posEl.textContent = (pos * 100).toFixed(1) + '%';
      poshEl.textContent = neg ? '无优势时，任何正仓位都是负期望'
        : '按 × ' + k.toFixed(2) + ' 缩放后的实际操作比例';

      var gNow = logG(p, b, pos);
      var gFull = logG(p, b, full);
      gEl.textContent = (gNow * 100).toFixed(3) + '%';
      ghEl.textContent = neg ? '无正期望，长期对数增长率为负'
        : '每笔的期望对数增长率；全凯利为 ' + (gFull * 100).toFixed(3) + '%';

      var label, hint;
      if (neg) {
        label = '不该下注'; hint = 'f* ≤ 0：先找优势，再谈仓位';
        tint(vEl, 'var(--red)');
      } else if (k > 1.0) {
        label = '越界了'; hint = '超过全凯利后，增长率下降、回撤上升；下注到 2f* 时增长率归零';
        tint(vEl, 'var(--red)');
      } else if (k > 0.6) {
        label = '偏激进'; hint = '接近全凯利，需要极强的参数置信度和回撤承受力';
        tint(vEl, 'var(--amber)');
      } else if (k > 0.3) {
        label = '稳健区间'; hint = '半凯利附近：保住约 3/4 的长期增长率，回撤大幅收敛';
        tint(vEl, 'var(--green)');
      } else {
        label = '很保守'; hint = '参数估计不可靠时合理；代价是放弃了可观的增长率';
        tint(vEl, 'var(--blue)');
      }
      txt(vEl, label);
      txt(vhEl, hint);
    }

    [pEl, bEl, kEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 系综平均 vs 时间平均（非遍历性）
     赌局：赢 +50% / 输 −40%，各 50%；投入比例 f
       · 系综（算术）每期乘数 = 1 + 0.05·f   ← 平行世界的平均
       · 时间（几何）每期乘数 = √((1+0.5f)(1−0.4f))  ← 你实际走的路径
     ══════════════════════════════════════════════════════════ */
  (function nonErgodic() {
    var fEl = $('ne_f'), tEl = $('ne_T');
    if (!fEl || !tEl) return;
    var fO = $('ne_fO'), tO = $('ne_TO');
    var ensEl = $('ne_ens'), typEl = $('ne_typ'), gapEl = $('ne_gap');
    var enshEl = $('ne_ensh'), typhEl = $('ne_typh'), gaphEl = $('ne_gaph');
    var vEl = $('ne_v'), vhEl = $('ne_vh');
    var cv = $('neChart');
    var PATHS = 28;

    function curve(f, T) {
      return { ens: 1 + 0.05 * f, geo: Math.sqrt((1 + 0.5 * f) * (1 - 0.4 * f)) };
    }

    function draw(f, T, g) {
      if (!cv) return;
      var s = fit(cv, 240);
      if (!s) return;
      var ctx = s.ctx, W = s.w, H = s.h;
      clear(s);
      var pad = { l: 46, r: 12, t: 16, b: 24 };
      var iw = W - pad.l - pad.r;
      var geo = g.geo, ens = g.ens;

      // 生成路径
      var paths = [], i, t;
      for (i = 0; i < PATHS; i++) {
        var v = 1, arr = new Float64Array(T + 1); arr[0] = 1;
        for (t = 1; t <= T; t++) {
          v *= (Math.random() < 0.5) ? (1 + 0.5 * f) : (1 - 0.4 * f);
          arr[t] = Math.max(v, 1e-12);
        }
        paths.push(arr);
      }
      // 纵轴（对数刻度）
      var lo = 0, hi = 0;
      for (i = 0; i < PATHS; i++) {
        for (t = 0; t <= T; t++) { var l = Math.log(paths[i][t]); if (l < lo) lo = l; }
      }
      hi = Math.max(Math.log(ens) * T, 0.15);
      lo = Math.min(lo, -0.15);
      if (hi - lo < 0.2) hi = lo + 0.2;
      var X = function (t) { return pad.l + t / T * iw; };
      var Y = function (l) { return pad.t + (hi - l) / (hi - lo) * (H - pad.t - pad.b); };

      // 网格
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.l, Y(0)); ctx.lineTo(W - pad.r, Y(0)); ctx.stroke();
      ctx.fillStyle = C.ink3; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('1×', pad.l - 6, Y(0) + 4);

      // 单条路径
      ctx.strokeStyle = 'rgba(124,132,143,.38)'; ctx.lineWidth = 1;
      for (i = 0; i < PATHS; i++) {
        ctx.beginPath();
        for (t = 0; t <= T; t++) {
          var x = X(t), y = Y(Math.log(paths[i][t]));
          if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 时间平均线（几何，向上或向下直线）
      ctx.strokeStyle = C.green; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(T), Y(T * Math.log(geo)));
      ctx.stroke();
      // 系综平均线（算术）
      ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(T), Y(T * Math.log(ens)));
      ctx.stroke();
      ctx.setLineDash([]);

      // 图例
      ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
      var eEnd = Y(T * Math.log(ens)), gEnd = Y(T * Math.log(geo));
      ctx.fillStyle = C.red;
      ctx.fillText('虚线 = 系综平均（' + Math.pow(ens, T).toFixed(2) + '×）', pad.l + 4, Math.max(pad.t + 10, Math.min(eEnd - 6, H - pad.b - 14)));
      ctx.fillStyle = C.green;
      ctx.fillText('实线 = 时间平均（' + Math.pow(geo, T).toFixed(5) + '×）', pad.l + 4, Math.min(H - pad.b - 2, Math.max(gEnd + 13, pad.t + 24)));
      ctx.fillStyle = C.ink3; ctx.textAlign = 'center';
      ctx.fillText('第 1 期', pad.l + 26, H - 7);
      ctx.fillText('第 ' + T + ' 期', W - pad.r - 30, H - 7);
    }

    function upd() {
      var f = num(fEl.value) / 100;
      var T = parseInt(tEl.value, 10);
      fO.textContent = (f * 100).toFixed(0) + '%';
      tO.textContent = T;

      var g = curve(f, T);
      var ensEnd = Math.pow(g.ens, T);
      var typEnd = Math.pow(g.geo, T);
      var gap = ensEnd / Math.max(typEnd, 1e-15);

      ensEl.textContent = ensEnd >= 1000 ? ensEnd.toExponential(2) + '×' : ensEnd.toFixed(2) + ' ×';
      enshEl.textContent = '平行世界的算术平均；每期 × ' + g.ens.toFixed(4);
      typEl.textContent = typEnd >= 1 ? typEnd.toFixed(2) + ' ×' : typEnd.toExponential(3) + '×';
      typhEl.textContent = '你实际走的那条路径；每期 × ' + g.geo.toFixed(4);
      gapEl.textContent = gap >= 1 ? gap.toExponential(2) + ' 倍' : gap.toFixed(2) + ' 倍';
      gaphEl.textContent = '「平均」与「典型」之间的裂缝';

      var label, hint;
      if (g.geo >= 1) {
        label = '正增长'; hint = '几何平均 ≥ 1：这个下注比例下，长期路径是增长的';
        tint(vEl, 'var(--green)');
      } else if (g.ens >= 1) {
        label = '平均涨、路径亏'; hint = '系综平均 ≥ 1 但几何 < 1 —— 这就是非遍历性的经典陷阱';
        tint(vEl, 'var(--red)');
      } else {
        label = '双输'; hint = '下注比例过大，连系综平均都被拖垮';
        tint(vEl, 'var(--red)');
      }
      txt(vEl, label);
      txt(vhEl, hint);
      draw(f, T, g);
    }

    [fEl, tEl].forEach(function (el) { el.addEventListener('input', upd); });
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(upd, 160); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 贝叶斯后验
     ══════════════════════════════════════════════════════════ */
  (function bayes() {
    var prEl = $('by_prior'), seEl = $('by_sens'), fpEl = $('by_fpr');
    if (!prEl || !seEl || !fpEl) return;
    var prO = $('by_priorO'), seO = $('by_sensO'), fpO = $('by_fprO');
    var postEl = $('by_post'), lrEl = $('by_lr'), naiveEl = $('by_naive');
    var posthEl = $('by_posth'), lrhEl = $('by_lrh'), naivehEl = $('by_naiveh');
    var vEl = $('by_v'), vhEl = $('by_vh');

    function upd() {
      var prior = num(prEl.value) / 100;
      var sens = num(seEl.value) / 100;
      var fpr = num(fpEl.value) / 100;

      prO.textContent = (prior * 100).toFixed(0) + '%';
      seO.textContent = (sens * 100).toFixed(0) + '%';
      fpO.textContent = (fpr * 100).toFixed(0) + '%';

      var odds = prior / (1 - prior);
      var lr = sens / fpr;
      var postOdds = odds * lr;
      var post = postOdds / (1 + postOdds);

      postEl.textContent = (post * 100).toFixed(1) + '%';
      posthEl.textContent = '看到一次正面信号之后，你该相信的概率';
      lrEl.textContent = lr.toFixed(1);
      lrhEl.textContent = '似然比 = 灵敏度 ÷ 假阳性率，信号的真实含金量';
      naiveEl.textContent = (sens * 100).toFixed(0) + '%';
      naivehEl.textContent = '只盯着信号准确率时会给出的（错误）答案';

      var ratio = post / Math.max(prior, 1e-9);
      var label, hint;
      if (post < prior) {
        label = '信号反而降信心'; hint = '似然比 < 1，这条信号更像噪音';
        tint(vEl, 'var(--red)');
      } else if (ratio < 1.3) {
        label = '几乎没动'; hint = '基础概率太低，强信号也被稀释 —— 这是最常见的误判';
        tint(vEl, 'var(--amber)');
      } else if (ratio < 3) {
        label = '温和上调'; hint = '信号有效，但不足以推翻先验';
        tint(vEl, 'var(--green)');
      } else {
        label = '实质性更新'; hint = '似然比足够强，基础概率也不太低，后验被显著改写';
        tint(vEl, 'var(--green)');
      }
      txt(vEl, label);
      txt(vhEl, hint);
    }

    [prEl, seEl, fpEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 波动拖累与复利
     几何（典型路径）≈ μ − σ²/2 ；系综期望 = (1+μ)^N
     ══════════════════════════════════════════════════════════ */
  (function volDrag() {
    var muEl = $('vd_mu'), sgEl = $('vd_sig'), nEl = $('vd_n');
    if (!muEl || !sgEl || !nEl) return;
    var muO = $('vd_muO'), sgO = $('vd_sigO'), nO = $('vd_nO');
    var dragEl = $('vd_drag'), geoEl = $('vd_geo'), gapEl = $('vd_gap');
    var draghEl = $('vd_dragh'), geohEl = $('vd_geoh'), gaphEl = $('vd_gaph');
    var vEl = $('vd_v'), vhEl = $('vd_vh');
    var cv = $('vdChart');

    function draw(mu, sig, N, geo) {
      if (!cv) return;
      var s = fit(cv, 240);
      if (!s) return;
      var ctx = s.ctx, W = s.w, H = s.h;
      clear(s);
      var pad = { l: 50, r: 12, t: 16, b: 24 };
      var iw = W - pad.l - pad.r;

      var ensEnd = Math.pow(1 + mu, N), typEnd = Math.pow(1 + geo, N);
      var hi = Math.log(Math.max(ensEnd, 1.05));
      var lo = Math.min(0, Math.log(Math.max(typEnd, 1e-6)));
      if (hi - lo < 0.2) hi = lo + 0.2;
      var X = function (n) { return pad.l + n / N * iw; };
      var Y = function (l) { return pad.t + (hi - l) / (hi - lo) * (H - pad.t - pad.b); };

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.l, Y(0)); ctx.lineTo(W - pad.r, Y(0)); ctx.stroke();
      ctx.fillStyle = C.ink3; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('1×', pad.l - 6, Y(0) + 4);

      // 差距填充
      ctx.fillStyle = 'rgba(213,52,44,.08)';
      ctx.beginPath();
      ctx.moveTo(X(0), Y(0));
      for (var n = 0; n <= N; n++) ctx.lineTo(X(n), Y(n * Math.log(1 + mu)));
      for (var m = N; m >= 0; m--) ctx.lineTo(X(m), Y(m * Math.log(Math.max(1 + geo, 1e-6))));
      ctx.closePath(); ctx.fill();

      // 系综平均曲线（红）
      ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.beginPath();
      for (var a = 0; a <= N; a++) {
        var xa = X(a), ya = Y(a * Math.log(1 + mu));
        if (a === 0) ctx.moveTo(xa, ya); else ctx.lineTo(xa, ya);
      }
      ctx.stroke(); ctx.setLineDash([]);
      // 典型路径曲线（蓝）
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2;
      ctx.beginPath();
      for (var b2 = 0; b2 <= N; b2++) {
        var xb = X(b2), yb = Y(b2 * Math.log(Math.max(1 + geo, 1e-6)));
        if (b2 === 0) ctx.moveTo(xb, yb); else ctx.lineTo(xb, yb);
      }
      ctx.stroke();

      ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
      ctx.fillStyle = C.red;
      ctx.fillText('系综平均 ' + ensEnd.toFixed(2) + '×', pad.l + 5, Math.max(pad.t + 10, Math.min(Y(N * Math.log(1 + mu)) - 6, H - pad.b - 16)));
      ctx.fillStyle = C.blue;
      ctx.fillText('典型路径 ' + typEnd.toFixed(2) + '×', pad.l + 5, Math.min(H - pad.b - 3, Math.max(Y(N * Math.log(Math.max(1 + geo, 1e-6))) + 14, pad.t + 26)));
      ctx.fillStyle = C.ink3; ctx.textAlign = 'center';
      ctx.fillText('第 0 年', pad.l + 24, H - 7);
      ctx.fillText('第 ' + N + ' 年', W - pad.r - 28, H - 7);
    }

    function upd() {
      var mu = num(muEl.value) / 100;
      var sig = num(sgEl.value) / 100;
      var N = parseInt(nEl.value, 10);

      muO.textContent = (mu * 100).toFixed(0) + '%';
      sgO.textContent = (sig * 100).toFixed(0) + '%';
      nO.textContent = N;

      var drag = sig * sig / 2;
      var geo = mu - drag;
      var ensEnd = Math.pow(1 + mu, N);
      var typEnd = Math.pow(1 + Math.max(geo, -0.95), N);
      var gap = ensEnd / Math.max(typEnd, 1e-15);

      dragEl.textContent = (drag * 100).toFixed(2) + '%';
      draghEl.textContent = 'σ²/2 = ' + (sig * 100).toFixed(0) + '%² ÷ 2，直接从算术收益里扣掉';
      geoEl.textContent = (geo * 100).toFixed(2) + '%';
      geohEl.textContent = '典型路径的年化增长率（算术 − 拖累）';
      gapEl.textContent = gap >= 1000 ? gap.toExponential(2) + ' 倍' : gap.toFixed(2) + ' 倍';
      gaphEl.textContent = '（1+' + (mu * 100).toFixed(0) + '%）^' + N + ' = ' + ensEnd.toFixed(2) +
        '× ｜ 典型路径 ' + typEnd.toFixed(2) + '×';

      var label, hint;
      if (geo <= 0) {
        label = '成长被抹平'; hint = '波动拖累吃掉了全部收益，长期典型路径不增长甚至缩水';
        tint(vEl, 'var(--red)');
      } else if (gap > 5) {
        label = '差距悬殊'; hint = '「平均」比「典型」高出 5 倍以上 —— 用期望值做个人决策会严重高估自己';
        tint(vEl, 'var(--red)');
      } else if (gap > 2) {
        label = '差距显著'; hint = '把 σ 降下来，比把 μ 提上去更容易缩短这个差距';
        tint(vEl, 'var(--amber)');
      } else {
        label = '差距可控'; hint = '波动温和或时间不长，平均与典型尚未严重脱节';
        tint(vEl, 'var(--green)');
      }
      txt(vEl, label);
      txt(vhEl, hint);
      draw(mu, sig, N, geo);
    }

    [muEl, sgEl, nEl].forEach(function (el) { el.addEventListener('input', upd); });
    var rt2;
    window.addEventListener('resize', function () { clearTimeout(rt2); rt2 = setTimeout(upd, 160); });
    upd();
  })();

})();
