/* ============================================================
   《BTC-Logit 曲线与分阶段假说》主题脚本
   四个可调模型：
     1. Logit 线性化器（累积采用 → logit 直线）
     2. Rogers 分阶段映射器
     3. 双阶段 Logistic 合成器（零售 / 机构）
     4. Rudd 需求乘数与相位测算器
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  var YEARS_NOW = 6465 / 365;
  var P0 = 64858;

  function logit(p) {
    var x = Math.max(1e-6, Math.min(1 - 1e-6, p));
    return Math.log(x / (1 - x));
  }

  function logisticScaled(t, Lmin, Lmax, Tstar, tOffset) {
    var tau = Tstar / 2;
    var b = Math.log((Lmax - Lmin) / Math.max(Lmin, 1e-6)) / tau;
    var rel = t - (tOffset || 0);
    return Lmin + (Lmax - Lmin) / (1 + Math.exp(-b * (rel - tau)));
  }

  function phaseCurve(t, t0, L0, L1, T) {
    var tau = T / 2;
    var b = Math.log((L1 - L0) / Math.max(L0, 1e-4)) / tau;
    var rel = t - t0;
    if (rel < 0) return L0;
    return L0 + (L1 - L0) / (1 + Math.exp(-b * (rel - tau)));
  }

  function rogersStage(pct) {
    if (pct < 2.5) return '创新者';
    if (pct < 13.5) return '早期采用';
    if (pct < 34) return '早期大众';
    if (pct < 68) return '晚期大众';
    return '落后者';
  }

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

  function ncdf(x) {
    var s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2;
    var t = 1 / (1 + 0.3275911 * z);
    var y = 1 - (t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 +
            t * (-1.453152027 + t * 1.061405429))))) * Math.exp(-z * z);
    return 0.5 * (1 + s * y);
  }

  /* ══ 工具 1 · Logit 线性化器 ══ */
  (function logitLinearizer() {
    var lminEl = $('blt_lmin'), tstarEl = $('blt_tstar');
    if (!lminEl || !tstarEl) return;
    var lminO = $('blt_lminO'), tstarO = $('blt_tstarO');
    var slopeEl = $('blt_slope'), slopehEl = $('blt_slopeh');
    var logitNowEl = $('blt_logitNow'), logitNowhEl = $('blt_logitNowh');
    var r2El = $('blt_r2'), r2hEl = $('blt_r2h');
    var vEl = $('blt_v1'), vhEl = $('blt_v1h');
    var cv = $('bltLogitChart');

    function draw(Lmin, Tstar) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxT = 22;
      var pts = [];
      for (var i = 0; i <= 50; i++) {
        var t = maxT * i / 50;
        var a = logisticScaled(t, Lmin, 0.96, Tstar, 0);
        pts.push({ t: t, y: logit(a) });
      }
      var ymin = -4, ymax = 4;
      var sx = function (t) { return pad.l + (t / maxT) * iw; };
      var sy = function (v) { return pad.t + (1 - (v - ymin) / (ymax - ymin)) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, idx) {
        var x = sx(p.t), y = sy(p.y);
        if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var tau = Tstar / 2;
      var b = Math.log((0.96 - Lmin) / Lmin) / tau;
      var tLo = Math.max(2, tau - 2), tHi = Math.min(maxT - 1, tau + 6);
      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(sx(tLo), sy(b * (logisticScaled(tLo, Lmin, 0.96, Tstar, 0) - 0.5)));
      ctx.lineTo(sx(tHi), sy(b * (logisticScaled(tHi, Lmin, 0.96, Tstar, 0) - 0.5) + b * (tau - 0.5)));
      ctx.stroke();
      ctx.setLineDash([]);
      var aNow = logisticScaled(YEARS_NOW, Lmin, 0.96, Tstar, 0);
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(sx(YEARS_NOW), sy(logit(aNow)), 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('创世后年数 t', pad.l + iw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#1d4ed8';
      ctx.fillText('— logit(A)', pad.l + 4, pad.t + 12);
      ctx.fillStyle = '#d5342c';
      ctx.fillText('— 中窗线性拟合', pad.l + 90, pad.t + 12);
    }

    function upd() {
      var Lmin = parseFloat(lminEl.value);
      var Tstar = parseFloat(tstarEl.value);
      var tau = Tstar / 2;
      var b = Math.log((0.96 - Lmin) / Lmin) / tau;
      var aNow = logisticScaled(YEARS_NOW, Lmin, 0.96, Tstar, 0);
      var norm = (aNow - Lmin) / (0.96 - Lmin) * 100;
      var t10 = tau - Math.log(9) / b;
      var t90 = tau + Math.log(9) / b;
      var ssRes = 0, ssTot = 0, mean = 0, n = 0;
      for (var t = 2; t <= 18; t += 0.5) {
        var obs = logit(logisticScaled(t, Lmin, 0.96, Tstar, 0));
        var pred = b * (t - tau);
        mean += obs; n++;
        ssRes += (obs - pred) * (obs - pred);
        ssTot += obs * obs;
      }
      mean /= n;
      for (var t2 = 2; t2 <= 18; t2 += 0.5) {
        var obs2 = logit(logisticScaled(t2, Lmin, 0.96, Tstar, 0));
        ssTot += (obs2 - mean) * (obs2 - mean);
      }
      var r2 = Math.max(0, 1 - ssRes / ssTot);
      txt(lminO, Lmin.toFixed(2));
      txt(tstarO, Tstar + ' 年');
      txt(slopeEl, b.toFixed(3));
      txt(slopehEl, 'logit 斜率 b（拐点 τ=' + tau.toFixed(1) + ' 年）');
      txt(logitNowEl, logit(aNow).toFixed(2));
      txt(logitNowhEl, 'A=' + (aNow * 100).toFixed(1) + '% · 区间渗透 ' + norm.toFixed(1) + '%');
      txt(r2El, r2.toFixed(3));
      txt(r2hEl, '10%→90% 窗：' + t10.toFixed(1) + '–' + t90.toFixed(1) + ' 年');
      var label, hint, col;
      if (norm > 85) {
        label = '单曲线近饱和'; hint = 'logit 进入平台——宜切换分阶段模型';
        col = 'var(--amber)';
      } else if (norm > 34 && norm < 68) {
        label = 'logit 中段线性'; hint = 'Rogers 晚期大众区 · 增速仍可观';
        col = 'var(--red)';
      } else if (norm >= 13.5 && norm <= 34) {
        label = '拐点邻域'; hint = 'logit 最陡 · 机构叙事主战场';
        col = 'var(--red)';
      } else {
        label = 'logit 尾段'; hint = '线性化窗口收窄 · 参数不稳';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(Lmin, Tstar);
    }
    [lminEl, tstarEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 2 · Rogers 分阶段映射器 ══ */
  (function rogersMapper() {
    var penEl = $('blt_pen');
    if (!penEl) return;
    var penO = $('blt_penO');
    var stageEl = $('blt_stage'), stagehEl = $('blt_stageh');
    var nextEl = $('blt_next'), nexthEl = $('blt_nexth');
    var logitEl = $('blt_logitPen'), logitPenhEl = $('blt_logitPenh');
    var vEl = $('blt_v2'), vhEl = $('blt_v2h');
    var cv = $('bltRogersChart');

    function nextBoundary(pct) {
      if (pct < 2.5) return { b: 2.5, name: '早期采用' };
      if (pct < 13.5) return { b: 13.5, name: '早期大众' };
      if (pct < 34) return { b: 34, name: '晚期大众' };
      if (pct < 68) return { b: 68, name: '落后者' };
      return { b: 100, name: '饱和' };
    }

    function draw(pct) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var zones = [
        { lo: 0, hi: 2.5, col: '#eaf0ff', label: '创新者' },
        { lo: 2.5, hi: 13.5, col: '#fff7e6', label: '早期采用' },
        { lo: 13.5, hi: 34, col: '#fdf3f2', label: '早期大众' },
        { lo: 34, hi: 68, col: '#f2f7f4', label: '晚期大众' },
        { lo: 68, hi: 100, col: '#f4f6f9', label: '落后者' }
      ];
      zones.forEach(function (z) {
        var x0 = pad.l + (z.lo / 100) * iw;
        var xw = ((z.hi - z.lo) / 100) * iw;
        ctx.fillStyle = z.col;
        ctx.fillRect(x0, pad.t, xw, ih);
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        if (z.hi - z.lo > 8) ctx.fillText(z.label, x0 + xw / 2, pad.t + ih + 13);
      });
      var x = pad.l + (pct / 100) * iw;
      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t + ih); ctx.stroke();
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(x, pad.t + ih / 2, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('累计渗透（%）', pad.l + iw / 2, y1 + 31);
    }

    function upd() {
      var pct = parseFloat(penEl.value);
      var nb = nextBoundary(pct);
      var gap = nb.b - pct;
      txt(penO, pct.toFixed(1) + '%');
      txt(stageEl, rogersStage(pct));
      txt(stagehEl, 'Rogers 1962 五阶段 · 机构子曲线读数');
      txt(nextEl, nb.name);
      txt(nexthEl, '距下一阶段 ' + gap.toFixed(1) + ' pp');
      txt(logitEl, logit(pct / 100).toFixed(2));
      txt(logitPenhEl, 'logit(p) · p=' + pct.toFixed(1) + '%');
      var label, hint, col;
      if (pct >= 13.5 && pct < 34) {
        label = '早期大众主战场'; hint = 'ETF/顾问渠道典型区间【推论】';
        col = 'var(--red)';
      } else if (pct >= 34 && pct < 68) {
        label = '晚期大众加速区'; hint = '2026 机构子曲线默认落点 ~48.8%【推论】';
        col = 'var(--amber)';
      } else if (pct < 13.5) {
        label = '创新/早期采用'; hint = '2009–2017 零售主导期【分析】';
        col = 'var(--green)';
      } else {
        label = '渗透尾部'; hint = '边际买家枯竭风险上升【假设】';
        col = 'var(--amber)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(pct);
    }
    penEl.addEventListener('input', upd);
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 3 · 双阶段 Logistic 合成器 ══ */
  (function dualPhase() {
    var instTEl = $('blt_instT'), dMultEl = $('blt_dMult');
    if (!instTEl || !dMultEl) return;
    var instTO = $('blt_instTO'), dMultO = $('blt_dMultO');
    var retailEl = $('blt_retailA'), retailhEl = $('blt_retailAh');
    var instEl = $('blt_instA'), insthEl = $('blt_instAh');
    var synthEl = $('blt_synthA'), synthhEl = $('blt_synthAh');
    var vEl = $('blt_v3'), vhEl = $('blt_v3h');
    var cv = $('bltDualChart');

    function draw(retail, inst, synth) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxT = 22;
      var sx = function (t) { return pad.l + (t / maxT) * iw; };
      var sy = function (v) { return pad.t + (1 - v / 0.65) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#b8730a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 60; i++) {
        var t = maxT * i / 60;
        var v = phaseCurve(t, 0, 0.008, 0.14, 11);
        var x = sx(t), y = sy(v);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = '#1d4ed8';
      ctx.beginPath();
      for (var j = 0; j <= 60; j++) {
        var t2 = maxT * j / 60;
        var v2 = phaseCurve(t2, 11, 0.14, 0.58, parseFloat(instTEl.value));
        var x2 = sx(t2), y2 = sy(v2);
        if (j === 0) ctx.moveTo(x2, y2); else ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.strokeStyle = '#0f8a4d';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      for (var k = 0; k <= 60; k++) {
        var t3 = maxT * k / 60;
        var r3 = phaseCurve(t3, 0, 0.008, 0.14, 11);
        var i3 = phaseCurve(t3, 11, 0.14, 0.58, parseFloat(instTEl.value));
        var syn = 0.35 * r3 + 0.65 * i3;
        var x3 = sx(t3), y3 = sy(syn);
        if (k === 0) ctx.moveTo(x3, y3); else ctx.lineTo(x3, y3);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('创世后年数', pad.l + iw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#b8730a';
      ctx.fillText('— 零售相', pad.l + 4, pad.t + 12);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillText('— 机构相', pad.l + 72, pad.t + 12);
      ctx.fillStyle = '#0f8a4d';
      ctx.fillText('— 合成', pad.l + 140, pad.t + 12);
      var nx = sx(YEARS_NOW);
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(nx, sy(synth), 6, 0, Math.PI * 2); ctx.fill();
    }

    function upd() {
      var instT = parseFloat(instTEl.value);
      var dMult = parseFloat(dMultEl.value);
      var retail = phaseCurve(YEARS_NOW, 0, 0.008, 0.14, 11);
      var inst = phaseCurve(YEARS_NOW, 11, 0.14, 0.58, instT);
      var synth = 0.35 * retail + 0.65 * inst;
      var instNorm = (inst - 0.14) / (0.58 - 0.14) * 100;
      txt(instTO, instT + ' 年');
      txt(dMultO, '×' + dMult);
      txt(retailEl, (retail * 100).toFixed(1) + '%');
      txt(retailhEl, '2009–2020 零售相 · 近饱和');
      txt(instEl, (inst * 100).toFixed(1) + '%');
      txt(insthEl, '机构相区间渗透 ' + instNorm.toFixed(1) + '%');
      txt(synthEl, (synth * 100).toFixed(1) + '%');
      txt(synthhEl, 'A′≈' + (synth * dMult).toFixed(2) + '（×D）');
      var label, hint, col;
      if (instNorm >= 40 && instNorm < 60) {
        label = '机构相中段'; hint = 'logit 仍陡 · ETF 时代主叙事【推论】';
        col = 'var(--red)';
      } else if (instNorm < 25) {
        label = '机构相早期'; hint = '2024 ETF 刚开启新 logistic【分析】';
        col = 'var(--green)';
      } else {
        label = '机构相后段'; hint = '关注 dA/dt 衰减与 flow 放缓【假设】';
        col = 'var(--amber)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(retail, inst, synth);
    }
    [instTEl, dMultEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══ 工具 4 · Rudd 需求乘数与相位测算器 ══ */
  (function ruddPhase() {
    var winEl = $('blt_win'), holdEl = $('blt_hold');
    if (!winEl || !holdEl) return;
    var winO = $('blt_winO'), holdO = $('blt_holdO');
    var baseEl = $('blt_base'), basehEl = $('blt_baseh');
    var excessEl = $('blt_excess'), excesshEl = $('blt_excessh');
    var nEl = $('blt_n'), nhEl = $('blt_nh');
    var vEl = $('blt_v4'), vhEl = $('blt_v4h');

    function upd() {
      var win = parseFloat(winEl.value);
      var hold = parseFloat(holdEl.value);
      var mu = 0.50, sig = 0.65;
      var z = mu * (hold / 252) / (sig * Math.sqrt(hold / 252));
      var base = ncdf(z) * 100;
      var excess = win - base;
      var pb = base / 100, ps = win / 100, diff = ps - pb;
      var n = diff > 0.001 ? Math.ceil(Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / (diff * diff)) : 9999;
      txt(winO, win.toFixed(1) + '%');
      txt(holdO, hold + ' 日');
      txt(baseEl, base.toFixed(1) + '%');
      txt(basehEl, 'μ=50%/年 · σ=65%/年 · 随机持币');
      txt(excessEl, (excess >= 0 ? '+' : '') + excess.toFixed(1) + ' pp');
      tint(excessEl, excess >= 8 ? 'var(--red)' : excess >= 3 ? 'var(--amber)' : 'var(--green)');
      txt(excesshEl, '「阶段择时」胜率须扣 drift');
      txt(nEl, n > 5000 ? '>5000' : String(n));
      txt(nhEl, '证明超额非随机（双侧）');
      var label, hint, col;
      if (excess < 3) {
        label = '超额微弱'; hint = '分阶段叙事可能只是正漂移换皮';
        col = 'var(--green)';
      } else if (excess < 10) {
        label = '超额有限'; hint = '需 n≈' + (n > 5000 ? '5000+' : n) + ' 才证显著';
        col = 'var(--amber)';
      } else {
        label = '表面显著'; hint = '仍要查是否 in-sample（仅 2 个 ETF 年）';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }
    [winEl, holdEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
