/* ============================================================
   《BTC-LTH / STH 持仓与成本框架》主题脚本
   四个可调模型：
     1. 155 日成熟曲线    — logistic 权重 w_LTH(d)
     2. 双 cohort 成本基线 — STH/LTH realized price → MVRV
     3. 供应占比周期读数  — LTH% 与历史区间对照
     4. 漂移剥离器        — 「LTH 吸筹」信号 vs 随机持币基准
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  function wLTH(d) {
    return 1 / (1 + Math.exp(-(d - 155) / 10));
  }

  function ncdf(x) {
    var s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2;
    var t = 1 / (1 + 0.3275911 * z);
    var y = 1 - (t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 +
            t * (-1.453152027 + t * 1.061405429))))) * Math.exp(-z * z);
    return 0.5 * (1 + s * y);
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

  /* ══ 工具 1 · 155 日成熟曲线 ══ */
  (function lthMaturation() {
    var ageEl = $('lth_age');
    if (!ageEl) return;
    var ageO = $('lth_ageO');
    var wLEl = $('lth_wL'), wSEl = $('lth_wS');
    var wLhEl = $('lth_wLh'), wShEl = $('lth_wSh');
    var vEl = $('lth_mat_v'), vhEl = $('lth_mat_vh');
    var cv = $('lthMatChart');

    function phase(d, w) {
      if (w >= 0.9) return { t: '成熟 LTH', c: '#0f8a4d', h: '≥177 日约 90% 计入 LTH 供应' };
      if (w >= 0.5) return { t: '过渡区', c: '#b8730a', h: '155 日处 50/50 分割——logistic 中点' };
      if (w >= 0.1) return { t: '典型 STH', c: '#454c56', h: '高换手概率区，对波动敏感' };
      return { t: '新鲜 STH', c: '#1d4ed8', h: '刚入场或刚被 LTH 派发' };
    }

    function draw(curD) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxD = 250;
      var sx = function (v) { return pad.l + (v / maxD) * iw; };
      var sy = function (p) { return pad.t + (1 - p) * ih; };
      ctx.fillStyle = '#eaf0ff';
      ctx.fillRect(sx(0), pad.t, sx(155) - sx(0), ih);
      ctx.fillStyle = '#f2f7f4';
      ctx.fillRect(sx(155), pad.t, sx(maxD) - sx(155), ih);
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      [155, 177].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref === 155 ? '#1d4ed8' : '#0f8a4d';
        ctx.setLineDash(ref === 155 ? [] : [4, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref) + 'd', x, y1 + 13);
      });
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var d = 0; d <= maxD; d += 2) {
        var x = sx(d), y = sy(wLTH(d));
        if (d === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      var cx = sx(curD), cy = sy(wLTH(curD));
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('w=' + wLTH(curD).toFixed(2), cx, cy - 12);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('持币天数 → LTH 权重', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var d = parseInt(ageEl.value, 10);
      var w = wLTH(d);
      var p = phase(d, w);
      txt(ageO, d + ' 日');
      txt(wLEl, (w * 100).toFixed(1) + '%');
      txt(wSEl, ((1 - w) * 100).toFixed(1) + '%');
      txt(wLhEl, '计入 LTH 供应');
      txt(wShEl, '计入 STH 供应');
      txt(vEl, p.t);
      tint(vEl, p.c);
      txt(vhEl, p.h);
      draw(d);
    }

    ageEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 双 cohort 成本基线 ══ */
  (function lthCost() {
    var spotEl = $('lth_spot'), sthEl = $('lth_sthRP'), lthEl = $('lth_lthRP');
    if (!spotEl || !sthEl || !lthEl) return;
    var spotO = $('lth_spotO'), sthO = $('lth_sthRPO'), lthO = $('lth_lthRPO');
    var sthMvEl = $('lth_sthMv'), lthMvEl = $('lth_lthMv');
    var sthPhEl = $('lth_sthPh'), lthPhEl = $('lth_lthPh');
    var sprEl = $('lth_spr'), sprhEl = $('lth_sprh');
    var vEl = $('lth_cost_v'), vhEl = $('lth_cost_vh');
    var cv = $('lthCostChart');

    function draw(spot, sthRP, lthRP) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 16, t: 28, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var lo = Math.min(lthRP, sthRP) * 0.85;
      var hi = spot * 1.05;
      var sx = function (v) { return pad.l + ((v - lo) / (hi - lo)) * iw; };
      var refs = [
        { v: lthRP, col: '#0f8a4d', lab: 'LTH RP' },
        { v: sthRP, col: '#b8730a', lab: 'STH RP' },
        { v: spot, col: '#d5342c', lab: '现货' }
      ];
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      refs.forEach(function (r) {
        var x = sx(r.v);
        ctx.strokeStyle = r.col;
        ctx.lineWidth = r.lab === '现货' ? 2.5 : 1.5;
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.fillStyle = r.col;
        ctx.font = 'bold 10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('$' + Math.round(r.v / 1000) + 'K', x, pad.t - 6);
        ctx.font = '10px -apple-system,sans-serif';
        ctx.fillText(r.lab, x, y1 + 13);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('成本基线 vs 现货（cohort 分层）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var spot = parseFloat(spotEl.value);
      var sthRP = parseFloat(sthEl.value);
      var lthRP = parseFloat(lthEl.value);
      if (lthRP <= 0 || sthRP <= 0) return;
      var sthMv = spot / sthRP;
      var lthMv = spot / lthRP;
      var spr = sthRP - lthRP;
      var sprPct = (spr / lthRP) * 100;
      txt(spotO, '$' + Math.round(spot).toLocaleString('en-US'));
      txt(sthO, '$' + Math.round(sthRP).toLocaleString('en-US'));
      txt(lthO, '$' + Math.round(lthRP).toLocaleString('en-US'));
      txt(sthMvEl, sthMv.toFixed(3));
      txt(lthMvEl, lthMv.toFixed(3));
      txt(sthPhEl, '+' + ((sthMv - 1) * 100).toFixed(1) + '%');
      tint(sthPhEl, '#d5342c');
      txt(lthPhEl, '+' + ((lthMv - 1) * 100).toFixed(1) + '%');
      tint(lthPhEl, '#d5342c');
      txt(sprEl, '$' + Math.round(spr).toLocaleString('en-US') + ' (' + sprPct.toFixed(1) + '%)');
      txt(sprhEl, 'STH 成本 − LTH 成本');
      var verdict = spot < lthRP ? 'LTH 整体亏损——罕见 capitulation' :
        spot < sthRP ? 'STH 亏损、LTH 盈利——过渡压力' :
          '双 cohort 均盈利——派发风险上升';
      txt(vEl, verdict.split('——')[0]);
      tint(vEl, spot < lthRP ? '#0f8a4d' : spot < sthRP ? '#b8730a' : '#d5342c');
      txt(vhEl, verdict.split('——')[1] || verdict);
      draw(spot, sthRP, lthRP);
    }

    spotEl.addEventListener('input', update);
    sthEl.addEventListener('input', update);
    lthEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 供应占比周期读数 ══ */
  (function lthSupply() {
    var pctEl = $('lth_lthPct');
    if (!pctEl) return;
    var pctO = $('lth_lthPctO');
    var sthEl = $('lth_sthPct'), sthO = $('lth_sthPctO');
    var ratioEl = $('lth_ratio'), ratiohEl = $('lth_ratioh');
    var vEl = $('lth_sup_v'), vhEl = $('lth_sup_vh');
    var cv = $('lthSupChart');

    var refs = [
      { pct: 50, y: 2013, lab: '顶' },
      { pct: 55, y: 2017, lab: '顶' },
      { pct: 65, y: 2021, lab: '顶' },
      { pct: 73, y: 2024, lab: '顶' },
      { pct: 80, y: 2022, lab: '底' },
      { pct: 83.6, y: 2026, lab: '今' }
    ];

    function phase(p) {
      if (p >= 82) return { t: '深度吸筹/供应紧缩', c: '#0f8a4d', h: 'LTH 占比极高——2026 约 83.6%【待验证】' };
      if (p >= 75) return { t: '偏强积累', c: '#0f8a4d', h: '2022 底区 ~80%——供应向强手集中' };
      if (p >= 68) return { t: '中性偏多', c: '#454c56', h: 'LTH 与 STH 均衡过渡' };
      if (p >= 60) return { t: '派发初期', c: '#b8730a', h: 'LTH 开始向 STH 转移供应' };
      return { t: '深度派发', c: '#d5342c', h: '2013/2017 顶区 LTH 占比 <60%' };
    }

    function draw(cur) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var minP = 45, maxP = 90;
      var sx = function (v) { return pad.l + ((v - minP) / (maxP - minP)) * iw; };
      var sy = function (p) { return pad.t + (1 - (p - minP) / (maxP - minP)) * ih; };
      ctx.fillStyle = '#fdf3f2';
      ctx.fillRect(sx(minP), pad.t, sx(65) - sx(minP), ih);
      ctx.fillStyle = '#e8f5ee';
      ctx.fillRect(sx(75), pad.t, sx(maxP) - sx(75), ih);
      refs.forEach(function (r) {
        var x = sx(r.pct), y = sy(r.pct);
        ctx.fillStyle = r.lab === '顶' ? 'rgba(213,52,44,0.55)' : r.lab === '底' ? 'rgba(15,138,77,0.55)' : '#1d4ed8';
        ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(r.y), x, y + 16);
      });
      var cx = sx(cur);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx, pad.t); ctx.lineTo(cx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cur.toFixed(1) + '%', cx, pad.t - 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('LTH 供应占比 (%)', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var p = parseFloat(pctEl.value);
      var ph = phase(p);
      txt(pctO, p.toFixed(1) + '%');
      txt(sthEl, (100 - p).toFixed(1) + '%');
      txt(sthO, 'STH 供应');
      txt(ratioEl, (p / (100 - p)).toFixed(2) + ':1');
      txt(ratiohEl, 'LTH:STH 供应比');
      txt(vEl, ph.t);
      tint(vEl, ph.c);
      txt(vhEl, ph.h);
      draw(p);
    }

    pctEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 漂移剥离器 ══ */
  (function lthDrift() {
    var tEl = $('lth_T'), psEl = $('lth_ps'), muEl = $('lth_mu'), sgEl = $('lth_sg');
    if (!tEl || !psEl) return;
    var tO = $('lth_TO'), psO = $('lth_psO'), muO = $('lth_muO'), sgO = $('lth_sgO');
    var baseEl = $('lth_base'), basehEl = $('lth_baseh');
    var dpEl = $('lth_dp'), dphEl = $('lth_dph');
    var nEl = $('lth_n'), nhEl = $('lth_nh');
    var vEl = $('lth_drift_v'), vhEl = $('lth_drift_vh');
    var cv = $('lthDriftChart');

    function draw(pb, ps, T) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 16, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var sx = function (v) { return pad.l + (v / 365) * iw; };
      var sy = function (p) { return pad.t + (1 - p) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#7c848f';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (var t = 5; t <= 365; t += 5) {
        var p = ncdf(0.5 * (t / 252) / (0.65 * Math.sqrt(t / 252)));
        var x = sx(t), y = sy(p);
        if (t === 5) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      var tx = sx(T);
      ctx.strokeStyle = '#1d4ed8';
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(tx, pad.t); ctx.lineTo(tx, y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.fillRect(sx(T) - 18, sy(pb) - 4, 36, 8);
      ctx.fillStyle = '#d5342c';
      ctx.fillRect(sx(T) - 18, sy(ps) - 4, 36, 8);
    }

    function update() {
      var T = parseInt(tEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var pb = ncdf(mu * (T / 252) / (sg * Math.sqrt(T / 252)));
      var dp = ps - pb;
      var n = Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / Math.pow(ps - pb, 2);
      txt(tO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(1) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(basehEl, '随机持币基准');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp >= 3 ? '#d5342c' : dp >= 1 ? '#b8730a' : '#7c848f');
      txt(dphEl, 'LTH 吸筹信号 − 基准');
      txt(nEl, isFinite(n) ? String(Math.ceil(n)) : '∞');
      txt(nhEl, '80% 功效所需样本');
      txt(vEl, dp < 1 ? '超额微弱' : dp < 3 ? '超额有限' : '超额可观');
      tint(vEl, dp < 1 ? '#7c848f' : dp < 3 ? '#b8730a' : '#d5342c');
      txt(vhEl, 'LTH%↑ 不等于免费 alpha');
      draw(pb, ps, T);
    }

    tEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();
})();
