/* ============================================================
   《人的意识与佛学的关系》主题脚本
   四个可调模型（全部真实参与计算）：

     1. 预测编码 / 造作指数   先验权重 α、先验 P、感官 S → 感知与预测误差
     2. 正念练习 vs 走神率   练习年数 → 走神率（Killingsworth 基线 47% 衰减）
     3. 非二元觉察指数       练习年数 → 内外注意 ACW 差（2025 预印本结构）
     4. 八识信息流           各层权重滑块 → 堆叠条（总和恒为 100%）

   自包含 IIFE，与页面通用脚本互不干扰。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    purple: '#6d28d9', teal: '#0d9488', grid: '#eef1f5', axis: '#e2e6ec',
    ink3: '#7c848f', ink2: '#454c56'
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
  function num(v) { return parseFloat(v); }
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  function bindRange(el, fn) {
    if (!el) return;
    el.addEventListener('input', fn);
    el.addEventListener('change', fn);
  }

  /* ══════════════════════════════════════════════════════════
     工具 1 · 预测编码 / 造作（fabrication）指数
     感知 = α·P + (1−α)·S；加权预测误差 = |P−S|·α
     ══════════════════════════════════════════════════════════ */
  (function predCoding() {
    var pEl = $('pc_prior'), sEl = $('pc_sens'), aEl = $('pc_alpha');
    if (!pEl || !sEl || !aEl) return;
    var pO = $('pc_priorO'), sO = $('pc_sensO'), aO = $('pc_alphaO');
    var percEl = $('pc_perc'), perchEl = $('pc_perch');
    var peEl = $('pc_pe'), pehEl = $('pc_peh');
    var fabEl = $('pc_fab'), fabhEl = $('pc_fabh');
    var vEl = $('pc_v'), vhEl = $('pc_vh');
    var cv = $('pcChart');

    function upd() {
      var P = num(pEl.value), S = num(sEl.value), a = num(aEl.value);
      var perc = a * P + (1 - a) * S;
      var pe = Math.abs(P - S) * a;
      var fab = a * 100;

      txt(pO, P.toFixed(0));
      txt(sO, S.toFixed(0));
      txt(aO, (a * 100).toFixed(0) + '%');
      txt(percEl, perc.toFixed(1));
      txt(perchEl, '大脑最终「看见」的刻度（先验与感官的加权）');
      txt(peEl, pe.toFixed(1));
      txt(pehEl, '|P−S|×α：执着越强，冲突越痛');
      txt(fabEl, fab.toFixed(0) + '%');
      txt(fabhEl, '自上而下权重 α，对应「遍计所执」强度');

      var label, hint, col;
      if (a >= 0.75) {
        label = '高度造作'; hint = '先验压过感官，世界被「编」进已有剧本'; col = 'var(--red)';
      } else if (a >= 0.50) {
        label = '中度混染'; hint = '感官与先验各半，仍有明显投射'; col = 'var(--amber)';
      } else {
        label = '相对如实'; hint = '感官权重上升，预测误差与造作同步下降'; col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(P, S, a, perc);
    }

    function draw(P, S, a, perc) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, H = g.h;
      clear(g);
      var pl = 56, pr = 16, y1 = H - 46, bh = y1 - 28;
      var maxV = 100;
      function sx(v) { return pl + (W - pl - pr) * v / maxV; }
      function by(v) { return y1 - bh * v / maxV; }

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (var t = 0; t <= 100; t += 25) {
        var x = sx(t);
        ctx.beginPath(); ctx.moveTo(x, 18); ctx.lineTo(x, y1); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(String(t), x, y1 + 13);
      }
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('刻度 0–100', pl + (W - pl - pr) / 2, y1 + 31);

      var bars = [
        { v: P, c: C.blue, lab: '先验 P' },
        { v: S, c: C.teal, lab: '感官 S' },
        { v: perc, c: C.purple, lab: '感知' }
      ];
      var bw = (W - pl - pr - 40) / 3;
      bars.forEach(function (b, i) {
        var x = pl + 20 + i * (bw + 10);
        var y = by(b.v);
        ctx.fillStyle = b.c;
        ctx.fillRect(x, y, bw, y1 - y);
        ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(b.lab, x + bw / 2, 14);
        var lab = b.v.toFixed(0);
        ctx.textAlign = 'center';
        var tx = x + bw / 2;
        var ty = y - 4;
        if (ty < 20) ty = y + 14;
        ctx.fillText(lab, tx, ty);
      });

      ctx.strokeStyle = C.amber; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pl, by(perc)); ctx.lineTo(W - pr, by(perc)); ctx.stroke();
      ctx.setLineDash([]);
    }

    bindRange(pEl, upd); bindRange(sEl, upd); bindRange(aEl, upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 正念练习年数 vs 走神率
     MW = 47 × e^(−0.06·years)  【基线 47% 来自 Killingsworth & Gilbert 2010】
     ══════════════════════════════════════════════════════════ */
  (function mindWander() {
    var yEl = $('mw_years');
    if (!yEl) return;
    var yO = $('mw_yearsO'), rateEl = $('mw_rate'), ratehEl = $('mw_rateh');
    var dmnEl = $('mw_dmn'), dmnhEl = $('mw_dmnh');
    var vEl = $('mw_v'), vhEl = $('mw_vh');
    var cv = $('mwChart');

    function upd() {
      var y = num(yEl.value);
      var mw = 47 * Math.exp(-0.06 * y);
      var dmn = Math.max(8, 85 * Math.exp(-0.055 * y));

      txt(yO, y.toFixed(0) + ' 年');
      txt(rateEl, mw.toFixed(1) + '%');
      txt(ratehEl, '基线 47% × e^(−0.06×年数)');
      txt(dmnEl, dmn.toFixed(0) + '%');
      txt(dmnhEl, '默认模式网络（DMN）相对活跃度指数（归一化）');

      var label, hint, col;
      if (mw <= 20) { label = '显著安定'; hint = '走神率已低于常人一半，接近长期禅修者区间'; col = 'var(--green)'; }
      else if (mw <= 35) { label = '持续改善'; hint = 'Brewer 等：经验冥想者 DMN 在任务中仍更低'; col = 'var(--amber)'; }
      else { label = '常人区间'; hint = '未系统练习时，近半清醒时间在走神'; col = 'var(--red)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(y, mw, dmn);
    }

    function draw(y, mw, dmn) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, H = g.h;
      clear(g);
      var pl = 50, pr = 16, y1 = H - 46, bh = y1 - 30;
      var T = Math.min(36, Math.max(12, Math.ceil((y + 3) / 6) * 6));
      if (T < y + 2) T = Math.min(36, Math.ceil((y + 3) / 6) * 6 + 6);

      var pts1 = [], pts2 = [];
      for (var t = 0; t <= T; t++) {
        pts1.push({ x: t, y: 47 * Math.exp(-0.06 * t) });
        pts2.push({ x: t, y: Math.max(8, 85 * Math.exp(-0.055 * t)) });
      }
      var ymax = 100;
      function sx(t) { return pl + (W - pl - pr) * t / T; }
      function sy(v) { return y1 - bh * v / ymax; }

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (var gv = 0; gv <= 100; gv += 25) {
        var yy = sy(gv);
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(W - pr, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(String(gv), pl - 4, yy + 3);
      }
      ctx.fillStyle = C.ink2; ctx.textAlign = 'center';
      ctx.fillText('练习年数', pl + (W - pl - pr) / 2, y1 + 31);

      function line(pts, color) {
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.beginPath();
        pts.forEach(function (p, i) {
          var x = sx(p.x), y = sy(p.y);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }
      line(pts1, C.blue);
      line(pts2, C.amber);

      if (y <= T) {
        ctx.fillStyle = C.red;
        ctx.beginPath(); ctx.arc(sx(y), sy(mw), 5, 0, Math.PI * 2); ctx.fill();
        ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText('当前', sx(y) + 6, sy(mw) - 6);
      }

      ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
      ctx.fillStyle = C.blue; ctx.fillText('— 走神率 %', pl + 8, 18);
      ctx.fillStyle = C.amber; ctx.fillText('— DMN 指数', pl + 88, 18);
    }

    bindRange(yEl, upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 非二元：内外注意 ACW 差
     Δ = 100 × e^(−0.10·years) ms；非二元指数 = 100 − Δ
     ══════════════════════════════════════════════════════════ */
  (function nondual() {
    var yEl = $('nd_years');
    if (!yEl) return;
    var yO = $('nd_yearsO'), diffEl = $('nd_diff'), diffhEl = $('nd_diffh');
    var scoreEl = $('nd_score'), scorehEl = $('nd_scoreh');
    var vEl = $('nd_v'), vhEl = $('nd_vh');
    var cv = $('ndChart');

    function upd() {
      var y = num(yEl.value);
      var diff = 100 * Math.exp(-0.10 * y);
      var score = 100 - diff;

      txt(yO, y.toFixed(0) + ' 年');
      txt(diffEl, diff.toFixed(1) + ' ms');
      txt(diffhEl, '内/外注意 ACW 差（2025 预印本：高阶禅修者差值更小）');
      txt(scoreEl, score.toFixed(1));
      txt(scorehEl, '100 − Δ：内外注意时间尺度趋同');

      var label, hint, col;
      if (score >= 80) { label = '内外趋同'; hint = '非二元体验：内观与外景的时间结构差缩小'; col = 'var(--green)'; }
      else if (score >= 55) { label = '边界软化'; hint = '仍有二元框架，但已开始松动'; col = 'var(--amber)'; }
      else { label = '强二元'; hint = '常人：内省与外景被清晰切割'; col = 'var(--red)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(y, diff, score);
    }

    function draw(y, diff, score) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, H = g.h;
      clear(g);
      var cx = W / 2, cy = H / 2 - 8, r = Math.min(80, W / 5);

      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, r + 28, 0, Math.PI * 2); ctx.stroke();

      var angIn = -Math.PI / 2;
      var angOut = angIn + (diff / 100) * Math.PI * 0.9;
      ctx.strokeStyle = C.blue; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, r, angIn, angIn + Math.PI * 0.45); ctx.stroke();
      ctx.strokeStyle = C.teal; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, r, angIn + Math.PI * 0.45 + (diff / 100) * 0.3, angIn + Math.PI * 0.9); ctx.stroke();

      ctx.fillStyle = C.purple; ctx.globalAlpha = 0.15 + 0.65 * (score / 100);
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = C.ink2; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('非二元 ' + score.toFixed(0), cx, cy + 4);
      ctx.font = '10px sans-serif'; ctx.fillStyle = C.ink3;
      ctx.fillText('Δ=' + diff.toFixed(0) + 'ms · ' + y + '年', cx, cy + r + 36);
    }

    bindRange(yEl, upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 八识信息流（权重滑块，归一化到 100%）
     ══════════════════════════════════════════════════════════ */
  (function eightCons() {
    var ids = ['ec5', 'ec6', 'ec7', 'ec8'];
    var labels = ['前五识', '第六识', '第七识', '第八识'];
    var els = ids.map(function (id) { return $(id); }).filter(Boolean);
    if (els.length < 4) return;
    var cv = $('ecChart');
    var outEls = ids.map(function (id) { return $(id + 'O'); });
    var vEl = $('ec_v'), vhEl = $('ec_vh');

    function raw() {
      return els.map(function (el) { return Math.max(1, num(el.value)); });
    }

    function upd() {
      var r = raw();
      var sum = r.reduce(function (a, b) { return a + b; }, 0);
      var pct = r.map(function (v) { return v / sum * 100; });
      els.forEach(function (el, i) { txt(outEls[i], pct[i].toFixed(1) + '%'); });

      var manas = pct[2], alaya = pct[3];
      var label, hint, col;
      if (manas >= 30) {
        label = '我执偏重'; hint = '末那识占比高：经验被「我」滤镜持续染色'; col = 'var(--red)';
      } else if (manas >= 18) {
        label = '常人格态'; hint = '第七识活跃但未极端——多数清醒日的默认配置'; col = 'var(--amber)';
      } else {
        label = '识流较平'; hint = '末那/阿赖耶权重下降，接近「转识」方向'; col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(pct);
    }

    function draw(pct) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, H = g.h;
      clear(g);
      var pl = 50, pr = 16, y1 = H - 46, bh = y1 - 28;
      var cols = [C.teal, C.blue, C.amber, C.purple];
      var names = ['前五识', '意', '末那', '阿赖耶'];
      var bw = (W - pl - pr - 30) / 4;

      for (var i = 0; i < 4; i++) {
        var x = pl + 10 + i * (bw + 5);
        var h = bh * pct[i] / 100;
        ctx.fillStyle = cols[i];
        ctx.fillRect(x, y1 - h, bw, h);
        ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(names[i], x + bw / 2, y1 + 13);
        ctx.fillText(pct[i].toFixed(0) + '%', x + bw / 2, y1 - h - 4);
      }
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('当前经验中各识层相对权重（归一化）', pl + (W - pl - pr) / 2, y1 + 31);
    }

    els.forEach(function (el) { bindRange(el, upd); });
    upd();
  })();
})();
