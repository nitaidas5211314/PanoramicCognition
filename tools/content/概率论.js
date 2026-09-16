/* ============================================================
   《概率论》主题脚本
   四个可调模型（全部真实参与计算，无假滑块）：

     1. 贝叶斯后验 PPV      基础概率 / 灵敏度 / 特异度 → 阳性预测值
                          演示「强信号被低基础概率压垮」
     2. 大数定律收敛        n 次伯努利抽样 → 样本均值散点 + 95% 正态带收窄
     3. 生日悖论           n 人 → 撞生日概率（组合概率）
     4. 凯利 / 遍历性      p 胜率 / b 赔率 → 几何增长率最大化仓位 f*

   自包含 IIFE，与页面通用脚本（进度条 / 导航高亮 / Tab）互不干扰。
   正态分位数用 Abramowitz-Stegun 7.1.26 的 CDF + Newton 反演实现（零依赖）。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56'
  };

  /* ── canvas 自适应：按设备像素比重设缓冲区，返回 CSS 像素坐标系 ── */
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
  function num(v) { return parseFloat(v); }
  /* 防御式写入：id 对不上时不要抛错 —— 一个 null 会中断整个 IIFE，
     导致后面所有工具（含 canvas）全部失效。 */
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  /* ── 标准正态 CDF：Abramowitz-Stegun 7.1.26（误差 < 7.5e-8）── */
  function normCdf(x) {
    if (x < 0) return 1 - normCdf(-x);
    var t = 1 / (1 + 0.2316419 * x);
    var d = 0.3989422804014327 * Math.exp(-x * x / 2);
    var p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return 1 - p;
  }
  /* 逆：Newton 迭代（零依赖，已验证 normInv(0.975)=1.95996，normInv(0.995)=2.57583）*/
  function normInv(p) {
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;
    var x = 0;
    for (var i = 0; i < 60; i++) {
      var f = normCdf(x) - p;
      if (Math.abs(f) < 1e-12) break;
      var pdf = 0.3989422804014327 * Math.exp(-x * x / 2);
      if (pdf === 0) break;
      x = x - f / pdf;
      if (x < -12) x = -12;
      if (x > 12) x = 12;
    }
    return x;
  }
  var Z = normInv(0.975); // ≈ 1.95996，用于 95% 带

  /* ══════════════════════════════════════════════════════════
     工具 1 · 贝叶斯后验（阳性预测值 PPV）
     ══════════════════════════════════════════════════════════ */
  (function bayes() {
    var pEl = $('by_prior'), sEl = $('by_sens'), spEl = $('by_spec');
    if (!pEl || !sEl || !spEl) return;
    var pO = $('by_priorO'), sO = $('by_sensO'), spO = $('by_specO');
    var postEl = $('by_post'), posthEl = $('by_posth');
    var lrEl = $('by_lr'), lrhEl = $('by_lrh');
    var naiveEl = $('by_naive'), naivehEl = $('by_naiveh');
    var vEl = $('by_v'), vhEl = $('by_vh');
    var cv = $('byChart');

    function upd() {
      var prior = num(pEl.value) / 100;
      var sens = num(sEl.value) / 100;
      var spec = num(spEl.value) / 100;
      var fpr = 1 - spec;

      txt(pO, (prior * 100).toFixed(0) + '%');
      txt(sO, (sens * 100).toFixed(0) + '%');
      txt(spO, (spec * 100).toFixed(0) + '%');

      var numP = sens * prior;
      var den = numP + fpr * (1 - prior);
      var post = numP / den;                 // PPV
      var lr = sens / fpr;                   // 似然比 LR+

      txt(postEl, (post * 100).toFixed(1) + '%');
      txt(posthEl, '看到一次阳性信号后，该病/事件真实存在的概率');
      txt(lrEl, lr.toFixed(1));
      txt(lrhEl, '灵敏度 ÷ 假阳性率 = 这条信号的真实含金量');
      txt(naiveEl, (sens * 100).toFixed(0) + '%');
      txt(naivehEl, '只看「信号准确率」时会脱口而出的错误答案');

      var label, hint, col;
      if (post >= 0.5) { label = '结论可信'; hint = '后验过半，阳性信号足以支撑重注'; col = 'var(--green)'; }
      else if (post >= 0.2) { label = '值得注意但远非确凿'; hint = '信号有效，但单次阳性远未定案'; col = 'var(--amber)'; }
      else if (post >= 0.05) { label = '信号被基础概率压垮'; hint = '后验仍远低于直觉——低基础概率把强信号稀释了'; col = 'var(--red)'; }
      else { label = '几乎可忽略'; hint = '基础概率太低，即便高灵敏度也几乎无解药'; col = 'var(--red)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(prior, post);
    }

    function draw(prior, post) {
      if (!cv) return;
      var g = fit(cv, 200); if (!g) return;
      var ctx = g.ctx, W = g.w, H = g.h;
      clear(g);
      var padL = 70, padR = 16, padT = 18, padB = 30;
      var plotW = W - padL - padR;
      var maxV = 1.0;
      var rows = [
        { lab: '基础概率', v: prior, c: C.ink3 },
        { lab: '阳性预测值', v: post, c: C.red }
      ];
      var band = (H - padT - padB) / rows.length;
      var by = function (i) { return padT + band * i + band / 2; };
      ctx.fillStyle = C.ink2; ctx.font = '12px sans-serif'; ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      rows.forEach(function (r, i) {
        ctx.fillText(r.lab, padL - 10, by(i));
      });
      ctx.textAlign = 'left';
      rows.forEach(function (r, i) {
        var bw = plotW * (r.v / maxV);
        ctx.fillStyle = r.c;
        ctx.fillRect(padL, by(i) - 11, Math.max(1, bw), 22);
        // 数值标签：靠右时反算并 clamp，避免裁出画布
        var lab = (r.v * 100).toFixed(r.v < 0.1 ? 1 : 0) + '%';
        var lw = ctx.measureText(lab).width;
        var tx = padL + bw + 8;
        if (tx + lw > W - padR) tx = padL + bw - lw - 6;
        ctx.fillStyle = C.ink2;
        ctx.fillText(lab, Math.max(padL + 4, tx), by(i));
      });
      ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('先验只是「事前信念」，后验才是「看到证据后的信念」', W / 2, H - 8);
    }

    [pEl, sEl, spEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 大数定律收敛（伯努利 p=0.5 抽样）
     ══════════════════════════════════════════════════════════ */
  (function lln() {
    var nEl = $('lln_n');
    if (!nEl) return;
    var nO = $('lln_nO'), meanEl = $('lln_mean'), meanhEl = $('lln_meanh');
    var seEl = $('lln_se'), sehEl = $('lln_seh');
    var vEl = $('lln_v'), vhEl = $('lln_vh');
    var cv = $('llnChart');

    function seq(n) {
      // 伯努利(0.5) 前缀和 → 样本均值
      var s = 0, out = new Float64Array(n + 1); out[0] = 0.5;
      for (var i = 1; i <= n; i++) {
        s += (Math.random() < 0.5) ? 1 : 0;
        out[i] = s / i;
      }
      return out;
    }

    function draw(n, mean, se) {
      if (!cv) return;
      var g = fit(cv, 260); if (!g) return;
      var ctx = g.ctx, W = g.w, H = g.h;
      clear(g);
      var padL = 44, padR = 14, padT = 14, padB = 26;
      var iw = W - padL - padR, ih = H - padT - padB;
      var lo = 0, hi = 1;
      var X = function (i) { return padL + i / n * iw; };
      var Y = function (v) { return padT + (hi - v) / (hi - lo) * ih; };

      // 网格 + 0.5 基线
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, Y(0.5)); ctx.lineTo(W - padR, Y(0.5)); ctx.stroke();
      ctx.fillStyle = C.ink3; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('0.5', padL - 6, Y(0.5) + 4);
      ctx.fillText('1.0', padL - 6, Y(1) + 4);
      ctx.fillText('0', padL - 6, Y(0) + 4);

      // 95% 正态带：± Z * 0.5/sqrt(i)
      ctx.fillStyle = 'rgba(29,78,216,.08)';
      ctx.beginPath();
      for (var i = 1; i <= n; i++) { var up = 0.5 + Z * 0.5 / Math.sqrt(i); ctx.lineTo(X(i), Y(up)); }
      for (var j = n; j >= 1; j--) { var dn = 0.5 - Z * 0.5 / Math.sqrt(j); ctx.lineTo(X(j), Y(dn)); }
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(29,78,216,.5)'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
      ctx.beginPath();
      for (var a = 1; a <= n; a++) { var up2 = 0.5 + Z * 0.5 / Math.sqrt(a); if (a === 1) ctx.moveTo(X(a), Y(up2)); else ctx.lineTo(X(a), Y(up2)); }
      ctx.stroke();
      ctx.beginPath();
      for (var b = 1; b <= n; b++) { var dn2 = 0.5 - Z * 0.5 / Math.sqrt(b); if (b === 1) ctx.moveTo(X(b), Y(dn2)); else ctx.lineTo(X(b), Y(dn2)); }
      ctx.stroke(); ctx.setLineDash([]);

      // 样本均值路径
      var path = seq(n);
      ctx.strokeStyle = C.red; ctx.lineWidth = 1.6; ctx.beginPath();
      for (var k = 1; k <= n; k++) { var x = X(k), y = Y(path[k]); if (k === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke();

      ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('第 1 次', padL + 22, H - 7);
      ctx.fillText('第 ' + n + ' 次', W - padR - 30, H - 7);
      ctx.textAlign = 'left';
      ctx.fillStyle = C.red; ctx.fillText('样本均值', padL + 6, padT + 12);
      ctx.fillStyle = 'rgba(29,78,216,.8)'; ctx.fillText('±95% 正态带', padL + 6, padT + 26);
    }

    function upd() {
      var n = parseInt(nEl.value, 10);
      txt(nO, n);
      var path = seq(n);
      var mean = path[n];
      var se = 0.5 / Math.sqrt(n);
      txt(meanEl, mean.toFixed(3));
      txt(meanhEl, '本次模拟的末次样本均值（每次重绘略有不同）');
      txt(seEl, '±' + (Z * se).toFixed(3));
      txt(sehEl, '理论 95% 带的半宽 = ' + Z.toFixed(2) + ' × 0.5/√n；n 越大越窄');

      var label, hint, col;
      if (n < 50) { label = '收敛缓慢'; hint = '样本少时，单次结果可以离真值很远'; col = 'var(--red)'; }
      else if (n < 500) { label = '肉眼可见收窄'; hint = '带已明显变细，均值被拉向 0.5'; col = 'var(--amber)'; }
      else { label = '已相当稳定'; hint = '大样本下，均值几乎被锁在真值附近'; col = 'var(--green)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(n, mean, se);
    }

    nEl.addEventListener('input', upd);
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(upd, 160); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 生日悖论（组合概率）
     ══════════════════════════════════════════════════════════ */
  (function birthday() {
    var nEl = $('bd_n');
    if (!nEl) return;
    var nO = $('bd_nO'), pEl = $('bd_p'), phEl = $('bd_ph');
    var vEl = $('bd_v'), vhEl = $('bd_vh');
    var cv = $('bdChart');

    function prob(n) {
      var p = 1;
      for (var i = 0; i < n; i++) p *= (365 - i) / 365;
      return 1 - p;
    }

    function draw(n, p) {
      if (!cv) return;
      var g = fit(cv, 250); if (!g) return;
      var ctx = g.ctx, W = g.w, H = g.h;
      clear(g);
      var padL = 40, padR = 16, padT = 14, padB = 28;
      var iw = W - padL - padR, ih = H - padT - padB;
      var nMax = 80;
      var X = function (k) { return padL + k / nMax * iw; };
      var Y = function (v) { return padT + (1 - v) * ih; };

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      [0, 0.25, 0.5, 0.75, 1].forEach(function (v) {
        ctx.beginPath(); ctx.moveTo(padL, Y(v)); ctx.lineTo(W - padR, Y(v)); ctx.stroke();
      });
      ctx.fillStyle = C.ink3; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('100%', padL - 6, Y(1) + 3);
      ctx.fillText('50%', padL - 6, Y(0.5) + 3);
      ctx.fillText('0', padL - 6, Y(0) + 3);
      // 50% 参考线
      ctx.strokeStyle = C.amber; ctx.setLineDash([5, 4]); ctx.beginPath();
      ctx.moveTo(padL, Y(0.5)); ctx.lineTo(W - padR, Y(0.5)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = C.amber; ctx.textAlign = 'left'; ctx.fillText('50% 警戒线', padL + 4, Y(0.5) - 5);

      // 曲线
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2; ctx.beginPath();
      for (var k = 2; k <= nMax; k++) {
        var x = X(k), y = Y(prob(k));
        if (k === 2) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 当前 n 的标记
      if (n <= nMax) {
        var cx = X(n), cy = Y(p);
        ctx.fillStyle = C.red;
        ctx.beginPath(); ctx.arc(cx, cy, 4.5, 0, Math.PI * 2); ctx.fill();
        var lab = (p * 100).toFixed(1) + '%';
        var lw = ctx.measureText(lab).width;
        var tx = cx + 8; if (tx + lw > W - padR) tx = cx - lw - 8;
        ctx.fillStyle = C.red; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(lab, tx, cy - 6);
      }
      ctx.fillStyle = C.ink3; ctx.textAlign = 'center'; ctx.font = '11px sans-serif';
      ctx.fillText('人数 →', W - padR - 24, H - 8);
    }

    function upd() {
      var n = parseInt(nEl.value, 10);
      txt(nO, n);
      var p = prob(n);
      txt(pEl, (p * 100).toFixed(1) + '%');
      txt(phEl, 'n 人中至少两人生日相同的概率 = 1 − ∏(365−i)/365');

      var label, hint, col;
      if (p < 0.1) { label = '几乎不会撞'; hint = '人数很少时，撞生日是小概率'; col = 'var(--green)'; }
      else if (p < 0.5) { label = '意外地可能'; hint = '直觉往往低估——23 人已过半'; col = 'var(--amber)'; }
      else if (p < 0.9) { label = '极可能'; hint = '50 人时撞生日概率已逼近 97%'; col = 'var(--red)'; }
      else { label = '几乎必然'; hint = '人数足够大时，撞生日几乎是确定事件'; col = 'var(--red)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(n, p);
    }

    nEl.addEventListener('input', upd);
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(upd, 160); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 凯利 / 遍历性（几何增长率最大化仓位）
     ══════════════════════════════════════════════════════════ */
  (function kelly() {
    var pEl = $('kl_p'), bEl = $('kl_b');
    if (!pEl || !bEl) return;
    var pO = $('kl_pO'), bO = $('kl_bO');
    var fEl = $('kl_f'), fhEl = $('kl_fh');
    var gEl = $('kl_g'), ghEl = $('kl_gh');
    var g2El = $('kl_g2'), g2hEl = $('kl_g2h');
    var vEl = $('kl_v'), vhEl = $('kl_vh');
    var cv = $('klChart');

    function logG(p, b, f) {
      if (f <= 0) return 0;
      if (f >= 1) return p * Math.log(1 + f * b) + (1 - p) * Math.log(Math.max(1e-9, 1 - f));
      return p * Math.log(1 + f * b) + (1 - p) * Math.log(1 - f);
    }

    function draw(p, b, fStar) {
      if (!cv) return;
      var g = fit(cv, 250); if (!g) return;
      var ctx = g.ctx, W = g.w, H = g.h;
      clear(g);
      var padL = 44, padR = 16, padT = 14, padB = 28;
      var iw = W - padL - padR, ih = H - padT - padB;
      var fMax = Math.min(1, b > 0 ? 1 : 1);
      if (fMax <= 0) fMax = 1;
      var Y = function (v) { return padT + (1 - v) * ih; };
      // g 的纵轴范围：取 [g(0)=0, g(f*)] 自适应；先算峰值
      var peak = 0;
      for (var f = 0.001; f <= fMax; f += 0.001) { var gg = logG(p, b, f); if (gg > peak) peak = gg; }
      var top = Math.max(peak * 1.15, 1e-4);
      var X = function (f) { return padL + f / fMax * iw; };
      var Yg = function (v) { return padT + (1 - v / top) * ih; };

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      ctx.fillStyle = C.ink3; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('0', padL - 6, Y(0) + 4);

      // g(f) 曲线
      ctx.strokeStyle = C.green; ctx.lineWidth = 2; ctx.beginPath();
      var first = true;
      for (var f2 = 0; f2 <= fMax + 1e-9; f2 += fMax / 200) {
        var x = X(f2), y = Yg(logG(p, b, f2));
        if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // f* 与 2f* 标记
      if (fStar > 0 && fStar <= fMax) {
        var xf = X(fStar);
        ctx.strokeStyle = C.blue; ctx.setLineDash([4, 3]); ctx.beginPath();
        ctx.moveTo(xf, padT); ctx.lineTo(xf, Y(0)); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = C.blue; ctx.textAlign = 'center'; ctx.font = '10.5px sans-serif';
        ctx.fillText('f*', xf, padT + 11);
        var x2 = X(Math.min(2 * fStar, fMax));
        ctx.strokeStyle = C.red; ctx.setLineDash([4, 3]); ctx.beginPath();
        ctx.moveTo(x2, padT); ctx.lineTo(x2, Y(0)); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = C.red; ctx.fillText('2f*', x2, padT + 24);
      }
      ctx.fillStyle = C.ink3; ctx.textAlign = 'center'; ctx.font = '11px sans-serif';
      ctx.fillText('下注比例 f →', W - padR - 40, H - 8);
      ctx.fillStyle = C.green; ctx.textAlign = 'left'; ctx.fillText('每笔期望对数增长率 g(f)', padL + 4, padT + 12);
    }

    function upd() {
      var p = num(pEl.value) / 100;
      var b = num(bEl.value);
      if (b <= 0) b = 0.1;
      var q = 1 - p;
      txt(pO, (p * 100).toFixed(0) + '%');
      txt(bO, b.toFixed(1));

      var fStar = (p * b - q) / b;        // 全凯利
      var neg = fStar <= 0;
      var full = Math.max(0, fStar);
      var gNow = logG(p, b, full);
      var gOver = logG(p, b, Math.min(2 * full, 1));

      txt(fEl, (full * 100).toFixed(1) + '%');
      txt(fhEl, neg ? '期望值为负，最优仓位 = 0' : '全凯利：几何增长率最大化的下注比例');
      txt(gEl, (gNow * 100).toFixed(3) + '%');
      txt(ghEl, '每笔的期望对数增长率 g(f*) —— 长期复合增速的引擎');
      txt(g2El, (gOver * 100).toFixed(3) + '%');
      txt(g2hEl, '下注 2f*：增长率回落甚至转负——过度下注反被惩罚');

      var label, hint, col;
      if (neg) { label = '无正期望'; hint = 'f* ≤ 0：先找优势，再谈仓位'; col = 'var(--red)'; }
      else if (full < 0.05) { label = '谨慎下注'; hint = '优势微弱，小仓位试水'; col = 'var(--amber)'; }
      else if (full <= 0.25) { label = '凯利区间'; hint = '半凯利附近：保住约 3/4 增速，回撤大幅收敛'; col = 'var(--green)'; }
      else { label = '高杠杆区'; hint = '满仓凯利波动剧烈，实战多用分数凯利'; col = 'var(--amber)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(p, b, full);
    }

    [pEl, bEl].forEach(function (el) { el.addEventListener('input', upd); });
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(upd, 160); });
    upd();
  })();

})();
