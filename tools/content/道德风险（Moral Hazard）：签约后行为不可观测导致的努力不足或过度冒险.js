/* ============================================================
   《道德风险（Moral Hazard）》主题脚本
   四个可调模型：
     1. Holmström–Milgrom 线性激励 β*
     2. 保险自付无谓损失
     3. 有限责任风险转移
     4. 监控–效率工资
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

  /* ── 1. Holmström–Milgrom ── */
  (function hm() {
    if (!$('hm_r')) return;
    var ids = ['hm_r', 'hm_c', 'hm_s'];
    var cv = $('hmChart');
    function upd() {
      var r = parseFloat($('hm_r').value);
      var c = parseFloat($('hm_c').value);
      var s2 = parseFloat($('hm_s').value);
      txt($('hm_rO'), r.toFixed(2));
      txt($('hm_cO'), c.toFixed(2));
      txt($('hm_sO'), s2.toFixed(2));

      var beta = 1 / (1 + r * c * s2);
      var e = beta / c;
      var eFB = 1 / c;
      var risk = 0.5 * r * beta * beta * s2;
      var gap = (1 - e / eFB) * 100;
      var ceSB = e - 0.5 * c * e * e - risk;
      var ceFB = eFB - 0.5 * c * eFB * eFB; // FB 若完全保险且可观察努力，无风险成本

      txt($('hm_beta'), beta.toFixed(2));
      txt($('hm_eff'), e.toFixed(2) + ' / ' + eFB.toFixed(2));
      txt($('hm_risk'), risk.toFixed(3));
      txt($('hm_gap'), gap.toFixed(1) + '%');
      var vh = $('hm_vh');
      txt(vh, '判定：激励强度 β*=' + beta.toFixed(2) + ' · CE次优 ' + ceSB.toFixed(3) + ' / 可观察努力 ' + ceFB.toFixed(3) + ' · 代理效率损失 ' + (ceFB - ceSB).toFixed(3));
      tint(vh, beta >= 0.7 ? C.green : (beta >= 0.4 ? C.amber : C.red));

      var items = [
        { lab: 'β*', v: beta, c: C.blue },
        { lab: 'e*', v: e, c: C.amber },
        { lab: 'eFB', v: eFB, c: C.green },
        { lab: '风险成本', v: risk, c: C.red }
      ];
      items._axis = '激励 / 努力 / 成本';
      bars(cv, items, null, null);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 2. 保险自付 ── */
  (function ins() {
    if (!$('ins_k')) return;
    var ids = ['ins_k', 'ins_q0', 'ins_q1', 'ins_L'];
    var cv = $('insChart');
    function upd() {
      var k = parseFloat($('ins_k').value);
      var q0 = parseFloat($('ins_q0').value);
      var q1 = parseFloat($('ins_q1').value);
      var L = parseFloat($('ins_L').value);
      if (q1 > q0) q1 = q0;
      txt($('ins_kO'), k.toFixed(2));
      txt($('ins_q0O'), q0.toFixed(2));
      txt($('ins_q1O'), q1.toFixed(2));
      txt($('ins_LO'), String(Math.round(L)));

      var q = q0 - (q0 - q1) * k;
      var total = q * L;
      var prem = (1 - k) * total;
      var oop = k * total;
      var dwl = 0.5 * (q - q1) * L * (1 - k);

      txt($('ins_q'), q.toFixed(3));
      txt($('ins_prem'), String(Math.round(prem)));
      txt($('ins_oop'), String(Math.round(oop)));
      txt($('ins_dwl'), String(Math.round(dwl)));
      var vh = $('ins_vh');
      var msg = k < 0.05
        ? '近全保险：用量接近峰值，DWL 最大'
        : (k > 0.85 ? '高自付：DWL 很小，保险价值也弱' : '中间共付：在保险价值与抑制过度使用之间折中');
      txt(vh, '判定：' + msg + ' · 过度用量 ' + (q - q1).toFixed(3));
      tint(vh, dwl > 800 ? C.red : (dwl > 200 ? C.amber : C.green));

      var items = [
        { lab: '用量q', v: q, c: C.blue },
        { lab: '保费/千', v: prem / 1000, c: C.amber },
        { lab: '自付/千', v: oop / 1000, c: C.ink2 },
        { lab: 'DWL/千', v: dwl / 1000, c: C.red }
      ];
      items._axis = '用量 · 金额(千)';
      bars(cv, items, null, null);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 3. 风险转移 ── */
  (function rs() {
    if (!$('rs_d')) return;
    var ids = ['rs_d', 'rs_ps', 'rs_pr', 'rs_hr'];
    var cv = $('rsChart');
    var Hs = 100, Fs = 40, Fr = 20;
    function eqPay(p, H, F, D) {
      return p * Math.max(H - D, 0) + (1 - p) * Math.max(F - D, 0);
    }
    function debtPay(p, H, F, D) {
      return p * Math.min(H, D) + (1 - p) * Math.min(F, D);
    }
    function tot(p, H, F) {
      return p * H + (1 - p) * F;
    }
    function upd() {
      var D = parseFloat($('rs_d').value);
      var pS = parseFloat($('rs_ps').value);
      var pR = parseFloat($('rs_pr').value);
      var Hr = parseFloat($('rs_hr').value);
      txt($('rs_dO'), String(Math.round(D)));
      txt($('rs_psO'), pS.toFixed(2));
      txt($('rs_prO'), pR.toFixed(2));
      txt($('rs_hrO'), String(Math.round(Hr)));

      var eS = eqPay(pS, Hs, Fs, D);
      var eR = eqPay(pR, Hr, Fr, D);
      var dS = debtPay(pS, Hs, Fs, D);
      var dR = debtPay(pR, Hr, Fr, D);
      var tS = tot(pS, Hs, Fs);
      var tR = tot(pR, Hr, Fr);
      var pickRisky = eR > eS + 1e-9;
      var socialSafe = tS > tR + 1e-9;

      txt($('rs_eq'), eS.toFixed(1) + ' / ' + eR.toFixed(1));
      txt($('rs_debt'), dS.toFixed(1) + ' / ' + dR.toFixed(1));
      txt($('rs_tot'), tS.toFixed(1) + ' / ' + tR.toFixed(1));
      txt($('rs_pick'), pickRisky ? '风险' + (socialSafe ? '（转移）' : '') : '安全');
      var vh = $('rs_vh');
      var verdict;
      if (pickRisky && socialSafe) verdict = '股权选风险、社会选安全 → 经典风险转移';
      else if (!pickRisky && socialSafe) verdict = '激励对齐：股权与社会都偏好安全';
      else if (pickRisky && !socialSafe) verdict = '风险项目社会价值也更高（非转移）';
      else verdict = '股权选安全但社会偏好风险（少见参数区）';
      txt(vh, '判定：' + verdict + ' · Δ股权 ' + (eR - eS).toFixed(1) + ' · Δ社会 ' + (tS - tR).toFixed(1));
      tint(vh, pickRisky && socialSafe ? C.red : C.green);

      var items = [
        { lab: '股-安全', v: eS, c: C.green },
        { lab: '股-风险', v: eR, c: C.red },
        { lab: '债-安全', v: dS, c: C.blue },
        { lab: '债-风险', v: dR, c: C.amber }
      ];
      items._axis = '期望支付';
      bars(cv, items, null, null);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 4. 监控–效率工资 ── */
  (function mon() {
    if (!$('mon_b')) return;
    var ids = ['mon_b', 'mon_w0', 'mon_cm', 'mon_v'];
    var cv = $('monChart');
    function upd() {
      var B = parseFloat($('mon_b').value);
      var w0 = parseFloat($('mon_w0').value);
      var cm = parseFloat($('mon_cm').value);
      var V = parseFloat($('mon_v').value);
      txt($('mon_bO'), B.toFixed(1));
      txt($('mon_w0O'), w0.toFixed(1));
      txt($('mon_cmO'), cm.toFixed(1));
      txt($('mon_vO'), V.toFixed(1));

      var mStar = Math.sqrt(B / Math.max(cm, 1e-9));
      var m = Math.min(1, Math.max(0.05, mStar));
      var w = w0 + B / m;
      var cost = w + m * cm;
      var sur = V - cost;
      var hire = sur > 0;

      txt($('mon_m'), m.toFixed(2));
      txt($('mon_w'), w.toFixed(1));
      txt($('mon_cost'), cost.toFixed(1));
      txt($('mon_sur'), sur.toFixed(1));
      var vh = $('mon_vh');
      txt(vh, '判定：' + (hire ? '雇佣划算' : '不雇（成本≥价值）') +
        ' · 未截断 m*=' + mStar.toFixed(2) +
        (mStar > 1 ? '（已截到 1）' : '') +
        ' · 监控费 ' + (m * cm).toFixed(1));
      tint(vh, hire ? C.green : C.red);

      var items = [
        { lab: 'm', v: m, c: C.blue },
        { lab: '工资w', v: w, c: C.amber },
        { lab: '总成本', v: cost, c: C.red },
        { lab: '价值V', v: V, c: C.green }
      ];
      items._axis = '监控 / 工资 / 成本';
      bars(cv, items, null, null);
    }
    bind(ids, upd);
    upd();
  })();
})();
