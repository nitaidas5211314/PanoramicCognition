/* ============================================================
   《逆向选择（Adverse Selection）》主题脚本
   四个可调模型：
     1. 离散柠檬市场
     2. 连续质量螺旋
     3. 保险死亡螺旋
     4. 信贷利率筛选
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
  function lineChart(cv, pts, ymin, ymax, yLabel) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    if (ymin == null || ymax == null) {
      var ys = pts.map(function (p) { return p.y; });
      ymin = Math.min.apply(null, ys.concat([0]));
      ymax = Math.max.apply(null, ys.concat([0.1]));
      var pad = (ymax - ymin) * 0.1 || 0.1;
      ymin -= pad; ymax += pad;
    }
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    var n = Math.max(1, pts.length - 1);
    var span = ymax - ymin || 1;
    ctx.strokeStyle = C.blue;
    ctx.lineWidth = 2;
    ctx.beginPath();
    pts.forEach(function (p, i) {
      var x = pl + (i / n) * bw;
      var y = y1 - ((p.y - ymin) / span) * bh;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    pts.forEach(function (p, i) {
      var x = pl + (i / n) * bw;
      var y = y1 - ((p.y - ymin) / span) * bh;
      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      if (i === 0 || i === pts.length - 1 || i % 2 === 0) {
        ctx.fillStyle = C.ink3;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(p.x), x, y1 + 13);
      }
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(yLabel || '价格 / 均值', pl + bw, y1 + 31);
  }

  /* ── 1. 离散柠檬 ── */
  (function lemon() {
    if (!$('lm_lam')) return;
    var ids = ['lm_lam', 'lm_vsP', 'lm_vbL', 'lm_vbP'];
    var cv = $('lmChart');
    function upd() {
      var lam = parseFloat($('lm_lam').value);
      var vsP = parseFloat($('lm_vsP').value);
      var vbL = parseFloat($('lm_vbL').value);
      var vbP = parseFloat($('lm_vbP').value);
      var vsL = 0;
      txt($('lm_lamO'), lam.toFixed(2));
      txt($('lm_vsPO'), vsP.toFixed(1));
      txt($('lm_vbLO'), vbL.toFixed(1));
      txt($('lm_vbPO'), vbP.toFixed(1));

      var pbar = lam * vbL + (1 - lam) * vbP;
      var peach = pbar + 1e-12 >= vsP;
      var lemonOk = pbar + 1e-12 >= vsL;
      var peq, surplus, who;
      if (peach && lemonOk) {
        peq = pbar; surplus = lam * (vbL - vsL) + (1 - lam) * (vbP - vsP); who = '混同：柠檬+桃子都成交';
      } else if (lemonOk && !peach) {
        peq = vbL; surplus = lam * (vbL - vsL); who = '桃子退出 · 仅柠檬市场';
      } else {
        peq = 0; surplus = 0; who = '无交易';
      }
      var full = lam * (vbL - vsL) + (1 - lam) * (vbP - vsP);
      var eff = full > 1e-12 ? surplus / full : 0;
      var lost = (!peach && lemonOk) ? (1 - lam) * (vbP - vsP) : 0;

      txt($('lm_pbar'), pbar.toFixed(2));
      txt($('lm_peq'), peq.toFixed(2));
      txt($('lm_sur'), surplus.toFixed(2) + ' / ' + full.toFixed(2));
      txt($('lm_eff'), (eff * 100).toFixed(1) + '%');
      var vh = $('lm_vh');
      txt(vh, '判定：' + who + ' · 损失的桃子剩余 ' + lost.toFixed(2));
      tint(vh, peach ? C.green : C.red);

      var items = [
        { lab: '一口价', v: pbar, c: C.blue },
        { lab: '均衡价', v: peq, c: peach ? C.green : C.red },
        { lab: 'AS剩余', v: surplus, c: C.amber },
        { lab: 'FB剩余', v: full, c: C.ink2 }
      ];
      items._axis = '价格 / 剩余';
      bars(cv, items, null, null);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 2. 连续质量螺旋 ── */
  (function unravel() {
    if (!$('un_b')) return;
    var ids = ['un_b', 'un_q', 'un_n'];
    var cv = $('unChart');
    function upd() {
      var beta = parseFloat($('un_b').value);
      var Qmax = parseFloat($('un_q').value);
      var n = parseInt($('un_n').value, 10);
      txt($('un_bO'), beta.toFixed(2));
      txt($('un_qO'), Qmax.toFixed(1));
      txt($('un_nO'), String(n));

      var mean = Qmax / 2;
      var pts = [{ x: 0, y: mean, kind: 'mean' }];
      var pricePts = [];
      var i, p, newMean;
      for (i = 0; i < n; i++) {
        p = beta * mean;
        if (p <= 0) { p = 0; newMean = 0; }
        else if (p >= Qmax) newMean = Qmax / 2;
        else newMean = p / 2;
        pricePts.push({ x: i + 1, y: p });
        mean = newMean;
        pts.push({ x: i + 1, y: mean });
        if (p < 1e-6) break;
      }
      var pf = pricePts.length ? pricePts[pricePts.length - 1].y : 0;
      var mf = pts[pts.length - 1].y;
      var collapsing = beta < 2 - 1e-9;
      var status = collapsing ? (pf < 0.05 * Qmax ? '近乎崩溃' : '螺旋收缩') : (Math.abs(beta - 2) < 1e-9 ? '刀口均衡 β=2' : 'β≥2：迭代不强制归零');

      txt($('un_m0'), (Qmax / 2).toFixed(2));
      txt($('un_pf'), pf.toFixed(2));
      txt($('un_mf'), mf.toFixed(2));
      txt($('un_ok'), status);
      var vh = $('un_vh');
      txt(vh, '判定：β=' + beta.toFixed(2) + (collapsing ? ' < 2 → 经典螺旋趋向萎缩' : ' → 教学连续模型不强制崩盘'));
      tint(vh, collapsing ? C.red : C.green);

      // plot prices over iterations
      var series = pricePts.length ? pricePts : [{ x: 1, y: 0 }];
      lineChart(cv, series, 0, Math.max(Qmax * beta / 2, pf, 0.5), '迭代报价 p');
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 3. 保险死亡螺旋 ── */
  (function death() {
    if (!$('ds_lam')) return;
    var ids = ['ds_lam', 'ds_pL', 'ds_pH', 'ds_L', 'ds_R'];
    var cv = $('dsChart');
    function upd() {
      var lamH = parseFloat($('ds_lam').value);
      var pL = parseFloat($('ds_pL').value);
      var pH = parseFloat($('ds_pH').value);
      if (pH < pL) { pH = pL; $('ds_pH').value = pH; }
      var L = parseFloat($('ds_L').value);
      var R = parseFloat($('ds_R').value);
      txt($('ds_lamO'), lamH.toFixed(2));
      txt($('ds_pO'), pL.toFixed(2) + ' / ' + pH.toFixed(2));
      txt($('ds_LO'), String(Math.round(L)));
      txt($('ds_RO'), String(Math.round(R)));

      var avg = lamH * pH + (1 - lamH) * pL;
      var pool = avg * L;
      var wL = pL * L + R;
      var wH = pH * L + R;
      var lowStays = wL + 1e-9 >= pool;
      var highStays = wH + 1e-9 >= pool;
      var eq, who;
      if (lowStays && highStays) { eq = pool; who = '混同池稳定'; }
      else if (!lowStays && highStays) { eq = pH * L; who = '死亡螺旋 → 仅高风险'; }
      else if (lowStays && !highStays) { eq = pL * L; who = '仅低风险（异常）'; }
      else { eq = 0; who = '双方退出 · 崩溃'; }
      var Rcrit = L * lamH * (pH - pL);

      txt($('ds_pool'), pool.toFixed(0));
      txt($('ds_wL'), wL.toFixed(0));
      txt($('ds_eq'), eq.toFixed(0));
      txt($('ds_rc'), Rcrit.toFixed(0));
      var vh = $('ds_vh');
      txt(vh, '判定：' + who + (lowStays ? '' : ' · R 需 ≥ ' + Rcrit.toFixed(0) + ' 才能留住低风险'));
      tint(vh, lowStays ? C.green : C.red);

      var items = [
        { lab: '池保费', v: pool, c: C.blue },
        { lab: '低愿付', v: wL, c: lowStays ? C.green : C.red },
        { lab: '高愿付', v: wH, c: C.amber },
        { lab: '均衡保费', v: eq, c: C.ink2 }
      ];
      items._axis = '保费 / 愿付（元）';
      bars(cv, items, null, null);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 4. 信贷利率筛选 ── */
  (function credit() {
    if (!$('cr_r')) return;
    var ids = ['cr_r', 'cr_share', 'cr_c', 'cr_Rs', 'cr_Rr'];
    var cv = $('crChart');
    var qs = 0.92, qr = 0.55;
    function upd() {
      var r = parseFloat($('cr_r').value);
      var shareR = parseFloat($('cr_share').value);
      var Ccol = parseFloat($('cr_c').value);
      var Rs = parseFloat($('cr_Rs').value);
      var Rr = parseFloat($('cr_Rr').value);
      txt($('cr_rO'), r.toFixed(2));
      txt($('cr_shareO'), shareR.toFixed(2));
      txt($('cr_cO'), Ccol.toFixed(2));
      txt($('cr_RO'), Rs.toFixed(2) + ' / ' + Rr.toFixed(2));

      var sNPV = qs * (Rs - (1 + r)) - (1 - qs) * Ccol;
      var rNPV = qr * (Rr - (1 + r)) - (1 - qr) * Ccol;
      var sA = sNPV >= -1e-12;
      var rA = rNPV >= -1e-12;
      var fail = null, pool = '无人申请', profit = null;
      if (sA && rA) {
        fail = shareR * (1 - qr) + (1 - shareR) * (1 - qs);
        pool = '双方申请';
      } else if (rA) {
        fail = 1 - qr;
        pool = '仅风险项目';
      } else if (sA) {
        fail = 1 - qs;
        pool = '仅安全项目';
      }
      if (fail != null) profit = (1 - fail) * (1 + r) + fail * Ccol - 1;

      txt($('cr_who'), (sA ? '是' : '否') + ' / ' + (rA ? '是' : '否'));
      txt($('cr_fail'), fail == null ? '—' : (fail * 100).toFixed(1) + '%');
      txt($('cr_pi'), profit == null ? '—' : profit.toFixed(3));
      txt($('cr_sNPV'), sNPV.toFixed(3));
      var vh = $('cr_vh');
      txt(vh, '判定：' + pool + (sA ? '' : ' · 安全项目已被利率挤出'));
      tint(vh, sA && rA ? C.green : (rA && !sA ? C.red : C.amber));

      var items = [
        { lab: '安全NPV', v: sNPV, c: sA ? C.green : C.red },
        { lab: '风险NPV', v: rNPV, c: rA ? C.amber : C.red },
        { lab: '违约率', v: fail == null ? 0 : fail, c: C.blue },
        { lab: '银行利润', v: profit == null ? 0 : profit, c: profit != null && profit >= 0 ? C.green : C.red }
      ];
      items._axis = 'NPV / 违约率 / 利润';
      bars(cv, items, null, null);
    }
    bind(ids, upd);
    upd();
  })();

  /* Tab 切换后按真实 clientWidth 重绘 */
  document.querySelectorAll('.tabs .tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTimeout(function () {
        ['lm_lam', 'un_b', 'ds_lam', 'cr_r'].forEach(function (id) {
          var el = $(id);
          if (el) el.dispatchEvent(new Event('input'));
        });
      }, 30);
    });
  });
})();
