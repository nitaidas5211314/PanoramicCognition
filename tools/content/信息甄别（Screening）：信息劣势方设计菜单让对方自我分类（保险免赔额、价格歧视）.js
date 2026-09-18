/* ============================================================
   《信息甄别（Screening）》主题脚本
   四个可调模型：
     1. 保险：H-IC 下 L 的最大保障
     2. Mussa–Rosen 质量菜单扭曲
     3. 分离存在性 λ*
     4. 免赔档自我选择
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
      ymin = Math.min.apply(null, vs.concat([0])) - 0.2;
      ymax = Math.max.apply(null, vs.concat([0])) + 0.2;
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
      var lab = (typeof it.v === 'number' ? it.v.toFixed(2) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }

  function ce(p, prem, q, W, L, g) {
    var rem = L - q;
    var Ew = W - prem - p * rem;
    var Var = p * (1 - p) * rem * rem;
    return Ew - (g / 2) * Var;
  }

  function maxQL(pH, pL, W, L, g) {
    var premH = pH * L;
    var ceH = ce(pH, premH, L, W, L, g);
    var lo = 0, hi = L, mid, i;
    for (i = 0; i < 56; i++) {
      mid = (lo + hi) / 2;
      if (ce(pH, pL * mid, mid, W, L, g) <= ceH + 1e-10) lo = mid;
      else hi = mid;
    }
    return lo;
  }

  /* ── 1. 保险保障上限 ── */
  (function insurance() {
    if (!$('ins_pH')) return;
    var ids = ['ins_pH', 'ins_pL', 'ins_L', 'ins_g'];
    var cv = $('insChart');
    var W = 100;

    function upd() {
      var pH = parseFloat($('ins_pH').value);
      var pL = parseFloat($('ins_pL').value);
      var L = parseFloat($('ins_L').value);
      var g = parseFloat($('ins_g').value);
      txt($('ins_pHO'), pH.toFixed(2));
      txt($('ins_pLO'), pL.toFixed(2));
      txt($('ins_LO'), L.toFixed(0));
      txt($('ins_gO'), g.toFixed(2));

      var msg, col;
      if (!(pH > pL)) {
        msg = '需要 pH > pL，否则类型差为零，无法甄别';
        col = C.red;
        txt($('ins_premH'), '—');
        txt($('ins_qL'), '—');
        txt($('ins_premL'), '—');
        txt($('ins_gap'), '—');
        txt($('ins_vh'), msg);
        tint($('ins_vh'), col);
        return;
      }

      var premH = pH * L;
      var qL = maxQL(pH, pL, W, L, g);
      var premL = pL * qL;
      var ceL = ce(pL, premL, qL, W, L, g);
      var ceLfull = ce(pL, pL * L, L, W, L, g);
      var gap = ceLfull - ceL;
      var ded = L - qL;

      txt($('ins_premH'), premH.toFixed(2));
      txt($('ins_qL'), qL.toFixed(2));
      txt($('ins_premL'), premL.toFixed(2));
      txt($('ins_gap'), gap.toFixed(2));

      msg = 'H 全保公平价 ' + premH.toFixed(2) + '；L 最大保障 ' + qL.toFixed(2) +
        '（等效免赔≈' + ded.toFixed(2) + '），相对全保 CE 损失 ' + gap.toFixed(2) +
        '——这是阻止 H 伪装的信息代价';
      col = C.green;
      txt($('ins_vh'), msg);
      tint($('ins_vh'), col);

      var items = [
        { lab: 'qH=L', v: L, c: C.red },
        { lab: 'qLmax', v: qL, c: C.blue },
        { lab: '免赔', v: ded, c: C.amber },
        { lab: 'CE损失', v: gap, c: C.green }
      ];
      items._axis = '保障 / 损失';
      bars(cv, items, 0, Math.max(L, gap) * 1.08);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 2. Mussa–Rosen ── */
  (function mussa() {
    if (!$('mr_thH')) return;
    var ids = ['mr_thH', 'mr_thL', 'mr_lam'];
    var cv = $('mrChart');

    function upd() {
      var thH = parseFloat($('mr_thH').value);
      var thL = parseFloat($('mr_thL').value);
      var lam = parseFloat($('mr_lam').value);
      txt($('mr_thHO'), thH.toFixed(1));
      txt($('mr_thLO'), thL.toFixed(1));
      txt($('mr_lamO'), lam.toFixed(2));

      var msg, col;
      if (!(thH > thL)) {
        msg = '需要 θH > θL（单交叉/类型排序）';
        col = C.red;
        txt($('mr_vh'), msg);
        tint($('mr_vh'), col);
        return;
      }

      var qH = thH;
      var qL = thL - (lam / (1 - lam)) * (thH - thL);
      if (qL < 0) qL = 0;
      var tL = thL * qL;
      var tH = tL + thH * (qH - qL);
      var rent = (thH - thL) * qL;
      var pi = lam * (tH - qH * qH / 2) + (1 - lam) * (tL - qL * qL / 2);
      var qLfb = thL;
      var tLfb = thL * qLfb;
      var tHfb = thH * qH;
      var pifb = lam * (tHfb - qH * qH / 2) + (1 - lam) * (tLfb - qLfb * qLfb / 2);
      var distort = qLfb - qL;

      txt($('mr_qH'), qH.toFixed(2));
      txt($('mr_qL'), qL.toFixed(2));
      txt($('mr_rent'), rent.toFixed(2));
      txt($('mr_pi'), pi.toFixed(2) + ' / ' + pifb.toFixed(2));

      if (qL <= 1e-9) {
        msg = '低类型被完全挤出（qL=0）：λ 太高或类型差太大，只服务高类型更划算';
        col = C.amber;
      } else {
        msg = 'qH=' + qH.toFixed(2) + ' 保持有效；qL 从一阶 ' + qLfb.toFixed(2) +
          ' 扭曲到 ' + qL.toFixed(2) + '（↓' + distort.toFixed(2) + '），信息租金 ' +
          rent.toFixed(2) + '，利润为完全歧视的 ' + ((100 * pi) / pifb).toFixed(0) + '%';
        col = C.green;
      }
      txt($('mr_vh'), msg);
      tint($('mr_vh'), col);

      var items = [
        { lab: 'qH', v: qH, c: C.green },
        { lab: 'qL', v: qL, c: C.blue },
        { lab: 'qL_FB', v: qLfb, c: C.amber },
        { lab: '租金', v: rent, c: C.red }
      ];
      items._axis = '质量 / 租金';
      bars(cv, items, 0, Math.max(qH, qLfb, rent) * 1.1);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 3. 存在性 λ* ── */
  (function exist() {
    if (!$('ex_lam')) return;
    var ids = ['ex_lam', 'ex_pH', 'ex_pL', 'ex_g'];
    var cv = $('exChart');
    var W = 100, L = 50;

    function upd() {
      var lam = parseFloat($('ex_lam').value);
      var pH = parseFloat($('ex_pH').value);
      var pL = parseFloat($('ex_pL').value);
      var g = parseFloat($('ex_g').value);
      txt($('ex_lamO'), lam.toFixed(2));
      txt($('ex_pHO'), pH.toFixed(2));
      txt($('ex_pLO'), pL.toFixed(2));
      txt($('ex_gO'), g.toFixed(2));

      var msg, col;
      if (!(pH > pL)) {
        msg = '需要 pH > pL';
        col = C.red;
        txt($('ex_vh'), msg);
        tint($('ex_vh'), col);
        return;
      }

      var qL = maxQL(pH, pL, W, L, g);
      var premL = pL * qL;
      var ceSep = ce(pL, premL, qL, W, L, g);
      var pbar = lam * pH + (1 - lam) * pL;
      var cePool = ce(pL, pbar * L, L, W, L, g);
      /* λ*：使 W - pbar*L = ceSep ⇒ pbar = (W-ceSep)/L */
      var pbarStar = (W - ceSep) / L;
      var lstar = (pbarStar - pL) / (pH - pL);
      if (lstar < 0) lstar = 0;
      if (lstar > 1) lstar = 1;
      var sepOk = ceSep + 1e-9 >= cePool;

      txt($('ex_pbar'), pbar.toFixed(3));
      txt($('ex_ces'), ceSep.toFixed(2) + ' / ' + cePool.toFixed(2));
      txt($('ex_lstar'), lstar.toFixed(3));
      txt($('ex_ok'), sepOk ? '分离较稳' : '混同威胁');
      tint($('ex_ok'), sepOk ? C.green : C.red);

      if (sepOk) {
        msg = '当前 λ=' + lam.toFixed(2) + ' ≥ 约 λ*=' + lstar.toFixed(3) +
          '：L 更偏好分离合约（CE ' + ceSep.toFixed(2) + ' ≥ 混同 ' + cePool.toFixed(2) +
          '），奶油撇脂/混同吸引力较弱';
        col = C.green;
      } else {
        msg = '当前 λ=' + lam.toFixed(2) + ' < λ*≈' + lstar.toFixed(3) +
          '：L 更想要平均费率全保（CE 混同 ' + cePool.toFixed(2) + ' > 分离 ' +
          ceSep.toFixed(2) + '）——经典 RS 下分离易被威胁';
        col = C.red;
      }
      txt($('ex_vh'), msg);
      tint($('ex_vh'), col);

      var items = [
        { lab: 'CE分离', v: ceSep, c: C.blue },
        { lab: 'CE混同', v: cePool, c: C.red },
        { lab: 'λ', v: lam, c: C.amber },
        { lab: 'λ*', v: lstar, c: C.green }
      ];
      items._axis = 'CE / 占比';
      bars(cv, items, 0, Math.max(ceSep, cePool, 1) * 1.02);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 4. 免赔档自选 ── */
  (function deductible() {
    if (!$('ded_DA')) return;
    var ids = ['ded_DA', 'ded_DB', 'ded_dP', 'ded_pH', 'ded_pL'];
    var cv = $('dedChart');

    function cost(p, D, prem) {
      return prem + p * D;
    }

    function upd() {
      var DA = parseFloat($('ded_DA').value);
      var DB = parseFloat($('ded_DB').value);
      var dP = parseFloat($('ded_dP').value);
      var pH = parseFloat($('ded_pH').value);
      var pL = parseFloat($('ded_pL').value);
      txt($('ded_DAO'), DA.toFixed(0));
      txt($('ded_DBO'), DB.toFixed(0));
      txt($('ded_dPO'), dP.toFixed(0));
      txt($('ded_pO'), pH.toFixed(2) + ' / ' + pL.toFixed(2));

      var msg, col;
      if (!(DB > DA)) {
        msg = '需要 DB > DA（高免赔档才构成残缺保障）';
        col = C.red;
        txt($('ded_vh'), msg);
        tint($('ded_vh'), col);
        return;
      }
      if (!(pH > pL)) {
        msg = '需要 pH > pL';
        col = C.red;
        txt($('ded_vh'), msg);
        tint($('ded_vh'), col);
        return;
      }

      /* 规范化：A 保费 = dP，B 保费 = 0（只看差） */
      var premA = dP, premB = 0;
      var cHA = cost(pH, DA, premA), cHB = cost(pH, DB, premB);
      var cLA = cost(pL, DA, premA), cLB = cost(pL, DB, premB);
      var pickH = cHA <= cHB ? 'A' : 'B';
      var pickL = cLA <= cLB ? 'A' : 'B';
      var saveH = cHB - cHA; /* >0 表示选 A 更省 */
      var sep = pickH === 'A' && pickL === 'B';

      txt($('ded_pickH'), pickH);
      txt($('ded_pickL'), pickL);
      txt($('ded_saveH'), saveH.toFixed(0));
      txt($('ded_ok'), sep ? '是' : '否');
      tint($('ded_ok'), sep ? C.green : C.red);

      if (sep) {
        msg = '分离成立：H 选低免赔 A（相对 B 期望成本低 ' + saveH.toFixed(0) +
          '），L 选高免 B。价差 Δπ=' + dP.toFixed(0) + ' 落在分离区间内';
        col = C.green;
      } else if (pickH === 'B' && pickL === 'B') {
        msg = '双双选 B：保费差太大 / 免赔差太小，高风险也宁愿扛免赔——低免赔档卖不动';
        col = C.amber;
      } else if (pickH === 'A' && pickL === 'A') {
        msg = '双双选 A：保费差太小，低风险也买低免赔——菜单失去甄别力（混同到 A）';
        col = C.red;
      } else {
        msg = '交叉错配：H→' + pickH + '、L→' + pickL + '（非预期分离方向），检查参数单调性';
        col = C.red;
      }
      txt($('ded_vh'), msg);
      tint($('ded_vh'), col);

      var items = [
        { lab: 'H@A', v: cHA, c: C.red },
        { lab: 'H@B', v: cHB, c: '#f5a8a4' },
        { lab: 'L@A', v: cLA, c: C.blue },
        { lab: 'L@B', v: cLB, c: '#93c5fd' }
      ];
      items._axis = '期望总成本';
      var mx = Math.max(cHA, cHB, cLA, cLB);
      bars(cv, items, 0, mx * 1.1);
    }
    bind(ids, upd);
    upd();
  })();
})();
