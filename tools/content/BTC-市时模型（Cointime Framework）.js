/* ============================================================
   《BTC-市时模型（Cointime Framework）》主题脚本
   四个可调模型：
     1. AVIV 比值计算器     — Active Cap ÷ Investor Cap
     2. 活跃度与供应分割器  — Liveliness → Active/Vaulted Supply
     3. AVIV vs MVRV 对照器 — 两套成本基线偏离并排读
     4. 漂移剥离器          — AVIV 信号胜率 vs 随机持币基准
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

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

  function fmtT(v) {
    if (!isFinite(v)) return '—';
    return '$' + (v >= 1 ? v.toFixed(2) : v.toFixed(3)) + 'T';
  }

  function avivZone(a) {
    if (a >= 2.5) return { t: '历史过热区', c: '#d5342c', h: '≥2.5 为白皮书建议顶区，样本极少【待验证】' };
    if (a >= 1.5) return { t: '偏热', c: '#d5342c', h: '活跃投资者显著盈利，抛压激励上升' };
    if (a >= 1.0) return { t: '温和溢价', c: '#b8730a', h: '活跃供应整体盈利，接近均衡上方' };
    if (a >= 0.55) return { t: '折价区', c: '#0f8a4d', h: '活跃投资者整体亏损，历史底区参考 <0.55' };
    return { t: '深度 capitulation', c: '#0f8a4d', h: '<0.55 为白皮书建议底区，可横盘数月' };
  }

  /* ══ 工具 1 · AVIV 比值计算器 ══ */
  (function ctAviv() {
    var mcapEl = $('ct_mcap'), livEl = $('ct_liv'), invEl = $('ct_inv');
    if (!mcapEl || !livEl || !invEl) return;
    var mcapO = $('ct_mcapO'), livO = $('ct_livO'), invO = $('ct_invO');
    var avivEl = $('ct_aviv'), avivHEl = $('ct_avivh');
    var tmmpEl = $('ct_tmmp'), tmmpHEl = $('ct_tmmph');
    var profitEl = $('ct_profit'), profitHEl = $('ct_profith');
    var vEl = $('ct_aviv_v'), vhEl = $('ct_aviv_vh');
    var cv = $('ctAvivChart');
    var SUPPLY = 19.8;

    function draw(aviv) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxA = 3.2;
      var sx = function (v) { return pad.l + (v / maxA) * iw; };
      var bands = [
        { lo: 0, hi: 0.55, col: '#e8f5ee', label: '<0.55' },
        { lo: 0.55, hi: 1, col: '#f4f6f9', label: '0.55–1' },
        { lo: 1, hi: 2.5, col: '#fff7e6', label: '1–2.5' },
        { lo: 2.5, hi: maxA, col: '#fdf3f2', label: '>2.5' }
      ];
      bands.forEach(function (b) {
        ctx.fillStyle = b.col;
        ctx.fillRect(sx(b.lo), pad.t, sx(b.hi) - sx(b.lo), ih);
      });
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      [0.55, 1, 2.5].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref >= 2.5 || ref <= 0.55 ? '#d5342c' : '#c9d0d9';
        ctx.setLineDash(ref === 1 ? [] : [4, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref), x, y1 + 13);
      });
      var mx = sx(Math.min(aviv, maxA));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(mx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AVIV ' + aviv.toFixed(2), mx, pad.t + ih * 0.5 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('AVIV 比值（True Market Deviation）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var mcap = parseFloat(mcapEl.value);
      var liv = parseFloat(livEl.value);
      var inv = parseFloat(invEl.value);
      if (inv <= 0) return;
      var activeCap = mcap * liv;
      var aviv = activeCap / inv;
      var activeSupply = liv * SUPPLY;
      var tmmp = (inv * 1e12) / (activeSupply * 1e6);
      var spot = (mcap * 1e12) / (SUPPLY * 1e6);
      var profit = (aviv - 1) * 100;
      var z = avivZone(aviv);
      txt(mcapO, fmtT(mcap));
      txt(livO, (liv * 100).toFixed(1) + '%');
      txt(invO, fmtT(inv));
      txt(avivEl, aviv.toFixed(2));
      txt(avivHEl, 'Active Cap ÷ Investor Cap');
      txt(tmmpEl, '$' + Math.round(tmmp).toLocaleString('en-US'));
      txt(tmmpHEl, 'True Market Mean Price = Inv÷ActiveSupply');
      txt(profitEl, (profit >= 0 ? '+' : '') + profit.toFixed(1) + '%');
      tint(profitEl, profit >= 0 ? '#d5342c' : '#0f8a4d');
      txt(profitHEl, '活跃投资者未实现盈亏 · 现价 $' + Math.round(spot).toLocaleString('en-US'));
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(aviv);
    }

    mcapEl.addEventListener('input', update);
    livEl.addEventListener('input', update);
    invEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 活跃度与供应分割器 ══ */
  (function ctLiv() {
    var livEl = $('ct_liv2'), supplyEl = $('ct_supply');
    if (!livEl || !supplyEl) return;
    var livO = $('ct_liv2O'), supplyO = $('ct_supplyO');
    var activeEl = $('ct_active_s'), vaultedEl = $('ct_vault_s');
    var vaultPctEl = $('ct_vault_pct');
    var vEl = $('ct_liv_v'), vhEl = $('ct_liv_vh');
    var cv = $('ctLivChart');

    function draw(liv, active, vaulted) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 28, b: 46 };
      var iw = w - pad.l - pad.r;
      var y1 = h - 46;
      var barH = 48;
      var y = pad.t + 30;
      var aw = iw * liv;
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(pad.l, y, aw, barH);
      ctx.fillStyle = '#c9d0d9';
      ctx.fillRect(pad.l + aw, y, iw - aw, barH);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      if (aw > 60) ctx.fillText('Active ' + active.toFixed(2) + 'M', pad.l + aw / 2, y + 30);
      if (iw - aw > 60) ctx.fillText('Vaulted ' + vaulted.toFixed(2) + 'M', pad.l + aw + (iw - aw) / 2, y + 30);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('供应分割（Liveliness=' + liv.toFixed(2) + '）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var liv = parseFloat(livEl.value);
      var supply = parseFloat(supplyEl.value);
      var active = supply * liv;
      var vaulted = supply * (1 - liv);
      txt(livO, liv.toFixed(3));
      txt(supplyO, supply.toFixed(1) + 'M BTC');
      txt(activeEl, active.toFixed(2) + 'M');
      txt(vaultedEl, vaulted.toFixed(2) + 'M');
      txt(vaultPctEl, ((1 - liv) * 100).toFixed(1) + '%');
      var msg = liv >= 0.65 ? '偏高：老币换手活跃，典型牛市/派发' :
        liv <= 0.58 ? '偏低：囤积主导，典型积累期' : '中性区间';
      txt(vEl, msg);
      tint(vEl, liv >= 0.65 ? '#d5342c' : liv <= 0.58 ? '#0f8a4d' : '#454c56');
      txt(vhEl, 'Liveliness 近单调上升，跨年代比较需分位读法');
      draw(liv, active, vaulted);
    }

    livEl.addEventListener('input', update);
    supplyEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · AVIV vs MVRV 对照器 ══ */
  (function ctCmp() {
    var mcapEl = $('ct_cmp_mcap'), livEl = $('ct_cmp_liv'), rcapEl = $('ct_cmp_rcap'), invEl = $('ct_cmp_inv');
    if (!mcapEl || !livEl || !rcapEl || !invEl) return;
    var mcapO = $('ct_cmp_mcapO'), livO = $('ct_cmp_livO'), rcapO = $('ct_cmp_rcapO'), invO = $('ct_cmp_invO');
    var avivEl = $('ct_cmp_aviv'), mvrvEl = $('ct_cmp_mvrv');
    var diffEl = $('ct_cmp_diff'), diffHEl = $('ct_cmp_diffh');
    var vEl = $('ct_cmp_v'), vhEl = $('ct_cmp_vh');
    var cv = $('ctCmpChart');

    function draw(aviv, mvrv) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxV = 3.0;
      var sx = function (v) { return pad.l + (v / maxV) * iw; };
      var cy = pad.t + ih * 0.55;
      ctx.strokeStyle = '#c9d0d9';
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(sx(1), pad.t); ctx.lineTo(sx(1), y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('1.0', sx(1), y1 + 13);
      var ax = sx(Math.min(aviv, maxV));
      var mx = sx(Math.min(mvrv, maxV));
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(pad.l, cy - 28, ax - pad.l, 22);
      ctx.fillStyle = '#b8730a';
      ctx.fillRect(pad.l, cy + 8, mx - pad.l, 22);
      ctx.fillStyle = '#15181d';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('AVIV ' + aviv.toFixed(2), pad.l + 4, cy - 12);
      ctx.fillText('MVRV ' + mvrv.toFixed(2), pad.l + 4, cy + 24);
      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      ctx.fillText('两套估值偏离并排', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var mcap = parseFloat(mcapEl.value);
      var liv = parseFloat(livEl.value);
      var rcap = parseFloat(rcapEl.value);
      var inv = parseFloat(invEl.value);
      if (rcap <= 0 || inv <= 0) return;
      var aviv = (mcap * liv) / inv;
      var mvrv = mcap / rcap;
      var diff = mvrv - aviv;
      txt(mcapO, fmtT(mcap));
      txt(livO, (liv * 100).toFixed(1) + '%');
      txt(rcapO, fmtT(rcap));
      txt(invO, fmtT(inv));
      txt(avivEl, aviv.toFixed(2));
      txt(mvrvEl, mvrv.toFixed(2));
      txt(diffEl, (diff >= 0 ? '+' : '') + diff.toFixed(2));
      tint(diffEl, diff > 0.15 ? '#d5342c' : diff < -0.15 ? '#0f8a4d' : '#454c56');
      txt(diffHEl, 'MVRV−AVIV：正值说明 UTXO 分母更低（含休眠币）');
      var msg = diff > 0.2 ? 'MVRV 显著高于 AVIV：休眠/丢失币压低 Realized Cap' :
        diff < -0.1 ? 'AVIV 高于 MVRV：活跃供应估值偏热' : '两者接近：活跃与全供应结构均衡';
      txt(vEl, msg);
      tint(vEl, '#454c56');
      txt(vhEl, 'Cointime 框架核心卖点：剥离非经济供应');
      draw(aviv, mvrv);
    }

    mcapEl.addEventListener('input', update);
    livEl.addEventListener('input', update);
    rcapEl.addEventListener('input', update);
    invEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 漂移剥离器 ══ */
  (function ctDrift() {
    var TEl = $('ct_T'), psEl = $('ct_ps'), muEl = $('ct_mu'), sgEl = $('ct_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('ct_TO'), psO = $('ct_psO'), muO = $('ct_muO'), sgO = $('ct_sgO');
    var baseEl = $('ct_base'), baseHEl = $('ct_baseh');
    var dpEl = $('ct_dp'), dpHEl = $('ct_dph');
    var nEl = $('ct_n'), nHEl = $('ct_nh');
    var vEl = $('ct_drift_v'), vhEl = $('ct_drift_vh');
    var cv = $('ctDriftChart');

    function pBase(mu, sg, T) {
      return ncdf(mu * (T / 252) / (sg * Math.sqrt(T / 252)));
    }

    function draw(T, pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 18, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var pts = [];
      for (var t = 5; t <= 365; t += 5) {
        pts.push({ t: t, b: pBase(parseFloat(muEl.value) / 100, parseFloat(sgEl.value) / 100, t) });
      }
      var maxT = 365;
      var sx = function (t) { return pad.l + (t / maxT) * iw; };
      var sy = function (p) { return pad.t + ih * (1 - p); };
      ctx.strokeStyle = '#c9d0d9';
      ctx.beginPath();
      pts.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(sx(p.t), sy(p.b));
        else ctx.lineTo(sx(p.t), sy(p.b));
      });
      ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(sx(T), sy(pb), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(sx(T), sy(ps / 100), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('持有期（日）', pad.l + iw / 2, h - 8);
    }

    function update() {
      var T = parseInt(TEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var pb = pBase(mu, sg, T);
      var dp = ps - pb;
      var n = Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / Math.pow(dp, 2);
      txt(TO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(0) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, '随机持币 ' + T + ' 日基准');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp >= 0.05 ? '#d5342c' : '#454c56');
      txt(dpHEl, '信号胜率 − 基准');
      txt(nEl, isFinite(n) && n > 0 ? String(Math.ceil(n)) : '—');
      txt(nHEl, '证明超额非随机所需样本（双侧 α=0.05, β=0.2）');
      var msg = dp < 0.03 ? '超额可忽略' : dp < 0.08 ? '超额有限' : '超额显著但需大样本';
      txt(vEl, msg);
      tint(vEl, dp < 0.03 ? '#454c56' : '#b8730a');
      txt(vhEl, 'AVIV<0.55 抄底叙事也要扣漂移');
      draw(T, pb, ps * 100);
    }

    TEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();
})();
