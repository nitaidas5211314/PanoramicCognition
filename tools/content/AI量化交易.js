/* ============================================================
   《AI量化交易》主题脚本
   四个可调模型：
     1. 漂移剥离器    — 随机做多基准胜率与真实超额
     2. 试次惩罚器    — K 次搜索下的期望最大 Sharpe（假策略定理）
     3. IC→净夏普     — IC × √N − 成本拖累
     4. 样本量门槛    — 证明超额非随机的最小交易次数
   自包含 IIFE，与页面通用脚本隔离。
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

  function normInv(p) {
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285084469e+02,
      1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    var b = [-5.447609879822406e+01, 1.615858368565017e+02, -1.556989798598866e+02,
      6.680131188771972e+01, -1.328068155288572e+01];
    var c = [-7.784894002430293e-03, -3.223964580411618e-01, -2.400758277161838e+00,
      -2.549339604087274e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    var d = [7.784695709091636e-03, 3.222671870999424e-01, 2.445134137142996e+00,
      3.754408661907416e+00];
    var pl = 0.02425, ph = 1 - pl, q, r;
    if (p < pl) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    if (p > ph) {
      q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }

  function eMaxZ(K) {
    var gamma = 0.5772156649;
    return (1 - gamma) * normInv(1 - 1 / K) + gamma * normInv(1 - 1 / (K * Math.E));
  }

  /* ══════════════════════════════════════════════════════════
     工具 1 · 漂移剥离器
     ══════════════════════════════════════════════════════════ */
  (function driftStrip() {
    var TEl = $('ai_T'), psEl = $('ai_ps'), muEl = $('ai_mu'), sgEl = $('ai_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('ai_TO'), psO = $('ai_psO'), muO = $('ai_muO'), sgO = $('ai_sgO');
    var baseEl = $('ai_base'), baseHEl = $('ai_baseh');
    var dpEl = $('ai_dp'), dpHEl = $('ai_dph');
    var nEl = $('ai_n'), nHEl = $('ai_nh');
    var vEl = $('ai_v'), vhEl = $('ai_vh');
    var cv = $('aiChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(pb, ps) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 176;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 108, r: 66, t: 30, b: 46 };
      var bw = w - pad.l - pad.r;
      var x0 = 0.40, x1 = 1.0;
      var sx = function (p) { return pad.l + (p - x0) / (x1 - x0) * bw; };
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      [0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(function (g) {
        var x = sx(g);
        ctx.strokeStyle = g === 0.5 ? '#c9d0d9' : '#eef1f5';
        ctx.lineWidth = g === 0.5 ? 1.4 : 1;
        ctx.beginPath(); ctx.moveTo(x, pad.t - 6); ctx.lineTo(x, h - pad.b); ctx.stroke();
        ctx.fillStyle = '#7c848f';
        ctx.fillText((g * 100).toFixed(0) + '%', x, h - pad.b + 13);
      });
      ctx.fillStyle = '#454c56';
      ctx.textAlign = 'center';
      ctx.fillText('胜率', (pad.l + w - pad.r) / 2, h - pad.b + 31);
      var rows = [
        { label: '随机做多基准', p: pb, col: '#8a6d1f' },
        { label: 'AI 策略报告胜率', p: ps, col: '#1d4ed8' }
      ];
      rows.forEach(function (r, i) {
        var y = pad.t + 22 + i * 58;
        ctx.fillStyle = '#454c56';
        ctx.textAlign = 'right';
        ctx.font = '12px -apple-system,sans-serif';
        ctx.fillText(r.label, pad.l - 12, y + 17);
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pad.l, y, bw, 24);
        ctx.fillStyle = r.col;
        ctx.fillRect(pad.l, y, Math.max(0, sx(r.p) - pad.l), 24);
        ctx.fillStyle = r.col;
        ctx.textAlign = 'left';
        ctx.font = '700 12.5px -apple-system,sans-serif';
        ctx.fillText((r.p * 100).toFixed(1) + '%', sx(r.p) + 7, y + 17);
      });
      var dp = ps - pb;
      ctx.strokeStyle = dp >= 0 ? '#0f8a4d' : '#d5342c';
      ctx.lineWidth = 1.6;
      var ya = pad.t + 22 + 12, yb = pad.t + 22 + 58 + 12;
      ctx.beginPath();
      ctx.moveTo(sx(pb), ya + 14); ctx.lineTo(sx(pb), yb - 14);
      ctx.moveTo(sx(ps), ya + 14); ctx.lineTo(sx(ps), yb - 14);
      ctx.stroke();
      ctx.fillStyle = dp >= 0 ? '#0f8a4d' : '#d5342c';
      ctx.font = '700 11.5px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp',
        (sx(pb) + sx(ps)) / 2, yb + 16);
    }

    function upd() {
      var T = parseFloat(TEl.value);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      txt(TO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(1) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      var y = T / 252;
      var pb = ncdf(mu * y / (sg * Math.sqrt(y)));
      var dp = ps - pb;
      var n = dp > 0.001 ? Math.ceil(
        Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / dp / dp
      ) : Infinity;
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, 'μ=' + (mu * 100).toFixed(0) + '% σ=' + (sg * 100).toFixed(0) + '% 持有 ' + T + ' 日');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      txt(dpHEl, dp >= 0 ? '相对基准的超额胜率' : '跑输随机做多');
      txt(nEl, n === Infinity ? '—' : n.toLocaleString());
      txt(nHEl, n === Infinity ? '无正超额，无需样本量' : '单侧 α=5%、检验力 80% 所需交易次数');
      var label, hint, col;
      if (dp < 0) { label = '跑输基准'; hint = '报告胜率低于随机做多'; col = 'var(--green)'; }
      else if (dp < 0.03) { label = '边际'; hint = '超额太薄，成本可能吃掉全部'; col = 'var(--amber)'; }
      else if (dp < 0.08) { label = '尚可'; hint = '有超额但需足够样本验证'; col = 'var(--amber)'; }
      else { label = '显著'; hint = '超额可观，仍要排除过拟合'; col = 'var(--red)'; }
      txt(vEl, label); tint(vEl, col); txt(vhEl, hint);
      draw(pb, ps);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 试次惩罚器
     ══════════════════════════════════════════════════════════ */
  (function trialsPen() {
    var kEl = $('ai_K'), srEl = $('ai_sr');
    if (!kEl || !srEl) return;
    var kO = $('ai_KO'), srO = $('ai_srO');
    var emEl = $('ai_em'), emhEl = $('ai_emh');
    var gapEl = $('ai_gap'), gaphEl = $('ai_gaph');
    var vEl = $('ai_tv'), vhEl = $('ai_tvh');
    var cv = $('aiTrialsChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(K, em, sr) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pl = 52, pr = 24, y1 = h - 46;
      var bw = w - pl - pr;
      var Kmax = 1000;
      var sy = function (z) { return 20 + (y1 - 20) * (1 - z / 4); };
      ctx.strokeStyle = '#eef1f5';
      ctx.lineWidth = 1;
      [0, 1, 2, 3, 4].forEach(function (g) {
        var y = sy(g);
        ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(w - pr, y); ctx.stroke();
        ctx.fillStyle = '#7c848f'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(g.toFixed(0), pl - 6, y + 4);
      });
      ctx.beginPath(); ctx.strokeStyle = '#8a6d1f'; ctx.lineWidth = 2;
      for (var k = 2; k <= Kmax; k += 4) {
        var x = pl + (k / Kmax) * bw, y = sy(eMaxZ(k));
        if (k === 2) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      var kx = pl + (K / Kmax) * bw;
      var ky = sy(em), sy2 = sy(sr);
      ctx.strokeStyle = '#d5342c'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx, sy2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#1d4ed8'; ctx.beginPath(); ctx.arc(kx, sy2, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#8a6d1f'; ctx.beginPath(); ctx.arc(kx, ky, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#454c56'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('试次 K', (pl + w - pr) / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillText('E[max Sharpe]', pl - 6, 14);
    }

    function upd() {
      var K = parseInt(kEl.value, 10);
      var sr = parseFloat(srEl.value) / 10;
      var em = eMaxZ(K);
      var gap = sr - em;
      txt(kO, K.toLocaleString());
      txt(srO, sr.toFixed(2));
      txt(emEl, em.toFixed(2));
      txt(emhEl, 'K=' + K + ' 次搜索下，纯噪声策略的期望最佳 Sharpe');
      txt(gapEl, (gap >= 0 ? '+' : '') + gap.toFixed(2));
      txt(gaphEl, gap > 0 ? '报告值高于噪声期望，但仍可能是运气' : '报告值未超过噪声期望');
      var label, hint, col;
      if (gap < 0) { label = '可疑'; hint = 'Sharpe 未超过试次惩罚门槛'; col = 'var(--green)'; }
      else if (gap < 0.5) { label = '边缘'; hint = '略超噪声期望，需 walk-forward 验证'; col = 'var(--amber)'; }
      else if (gap < 1.0) { label = '尚可'; hint = '超额可观，报告全部试次'; col = 'var(--amber)'; }
      else { label = '亮眼'; hint = '仍要排除数据泄露与幸存者偏差'; col = 'var(--red)'; }
      txt(vEl, label); tint(vEl, col); txt(vhEl, hint);
      draw(K, em, sr);
    }
    [kEl, srEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · IC→净夏普
     ══════════════════════════════════════════════════════════ */
  (function icCalc() {
    var icEl = $('ai_icv'), nEl = $('ai_Nv'), toEl = $('ai_to'), cEl = $('ai_cps');
    if (!icEl || !nEl || !toEl || !cEl) return;
    var icO = $('ai_icO'), nO = $('ai_NO'), toO = $('ai_toO'), cO = $('ai_cO');
    var grossEl = $('ai_gross'), grosshEl = $('ai_grossh');
    var costEl = $('ai_cost'), costhEl = $('ai_costh');
    var netEl = $('ai_net'), nethEl = $('ai_neth');
    var vEl = $('ai_iv'), vhEl = $('ai_ivh');

    function upd() {
      var ic = parseFloat(icEl.value) / 100;
      var N = parseInt(nEl.value, 10);
      var to = parseFloat(toEl.value);
      var cps = parseFloat(cEl.value) / 10000;
      txt(icO, (ic * 100).toFixed(1) + '%');
      txt(nO, N.toLocaleString());
      txt(toO, to.toFixed(1) + '×');
      txt(cO, (cps * 10000).toFixed(0) + ' bp');
      var gross = ic * Math.sqrt(N);
      var cost = to * cps * 2;
      var net = gross - cost;
      txt(grossEl, gross.toFixed(2));
      txt(grosshEl, 'IC × √N，Grinold-Kahn 近似');
      txt(costEl, cost.toFixed(2));
      txt(costhEl, '年化拖累 ≈ 换手率 × 单边成本 × 2');
      txt(netEl, net.toFixed(2));
      txt(nethEl, net > 0 ? '扣费后仍有正夏普' : '成本吃掉全部信号');
      var label, hint, col;
      if (net < 0) { label = '不可行'; hint = '成本超过信号贡献'; col = 'var(--green)'; }
      else if (net < 0.5) { label = '脆弱'; hint = '略正，对成本极敏感'; col = 'var(--amber)'; }
      else if (net < 1.5) { label = '可行'; hint = '有经济意义，需监控衰减'; col = 'var(--amber)'; }
      else { label = '强劲'; hint = '理论夏普高，警惕过拟合 IC'; col = 'var(--red)'; }
      txt(vEl, label); tint(vEl, col); txt(vhEl, hint);
    }
    [icEl, nEl, toEl, cEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 样本量门槛（与工具 1 联动逻辑）
     ══════════════════════════════════════════════════════════ */
  (function sampleGate() {
    var wrEl = $('ai_wr'), edgeEl = $('ai_edge');
    if (!wrEl || !edgeEl) return;
    var wrO = $('ai_wrO'), edgeO = $('ai_edgeO');
    var nEl = $('ai_sn'), nhEl = $('ai_snh');
    var pwrEl = $('ai_pwr'), pwrhEl = $('ai_pwrh');
    var vEl = $('ai_sv'), vhEl = $('ai_svh');
    var cv = $('aiSampleChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function nReq(pb, ps) {
      var dp = ps - pb;
      if (dp <= 0) return Infinity;
      return Math.ceil(
        Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / dp / dp
      );
    }

    function draw(pb, ps, n) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pl = 56, pr = 20, y1 = h - 46, bw = w - pl - pr;
      var edges = [0.02, 0.03, 0.05, 0.08, 0.10, 0.15];
      var maxN = 2000;
      ctx.strokeStyle = '#eef1f5';
      edges.forEach(function () {});
      ctx.beginPath(); ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2;
      edges.forEach(function (e, i) {
        var nn = nReq(pb, pb + e);
        var x = pl + Math.min(nn, maxN) / maxN * bw;
        var y = 30 + i * 28;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      var nx = pl + Math.min(n, maxN) / maxN * bw;
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(nx, 30 + edges.indexOf(parseFloat(edgeEl.value) / 100) * 28 || 56, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#454c56'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('所需交易次数', (pl + w - pr) / 2, y1 + 31);
    }

    function upd() {
      var wr = parseFloat(wrEl.value) / 100;
      var edge = parseFloat(edgeEl.value) / 100;
      var pb = wr - edge;
      if (pb < 0.5) pb = 0.5;
      var ps = wr;
      var n = nReq(pb, ps);
      txt(wrO, (wr * 100).toFixed(1) + '%');
      txt(edgeO, (edge * 100).toFixed(1) + ' pp');
      txt(nEl, n === Infinity ? '—' : n.toLocaleString());
      txt(nhEl, '证明 ' + (edge * 100).toFixed(1) + 'pp 超额所需次数');
      var pwr = n <= 100 ? 0.95 : n <= 300 ? 0.80 : n <= 600 ? 0.65 : 0.50;
      txt(pwrEl, (pwr * 100).toFixed(0) + '%');
      txt(pwrhEl, '经验检验力（α=5% 单侧）');
      var label, hint, col;
      if (n > 800) { label = '需长期'; hint = '样本需求大，短期难验证'; col = 'var(--amber)'; }
      else if (n > 300) { label = '中等'; hint = '约 1–2 年日频可积累'; col = 'var(--amber)'; }
      else { label = '可验证'; hint = '样本需求合理'; col = 'var(--red)'; }
      txt(vEl, label); tint(vEl, col); txt(vhEl, hint);
      draw(pb, ps, n);
    }
    [wrEl, edgeEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
