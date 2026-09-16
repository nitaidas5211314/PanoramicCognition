/* ============================================================
   《K线分析》主题脚本
   四个可调模型：
     1. 漂移剥离器    — 形态胜率 vs 随机做多基准
     2. K 线力量计    — 实体/影线比例 → 多空力量分
     3. 期望计算器    — 胜率 × 盈亏比 − 成本
     4. 形态挖掘警示  — 多重检验下的假阳性期望
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

  /* ── 工具 1 · 漂移剥离器 ── */
  (function driftStrip() {
    var TEl = $('kl_T'), psEl = $('kl_ps'), muEl = $('kl_mu'), sgEl = $('kl_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('kl_TO'), psO = $('kl_psO'), muO = $('kl_muO'), sgO = $('kl_sgO');
    var baseEl = $('kl_base'), baseHEl = $('kl_baseh');
    var dpEl = $('kl_dp'), dpHEl = $('kl_dph');
    var nEl = $('kl_n'), nHEl = $('kl_nh');
    var vEl = $('kl_dv'), vhEl = $('kl_dvh');
    var cv = $('klDriftChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(pb, ps) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 176;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 108, r: 66, t: 30, b: 34 };
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
        ctx.fillText((g * 100).toFixed(0) + '%', x, h - pad.b + 15);
      });
      var rows = [
        { label: '随机做多基准', p: pb, col: '#8a6d1f' },
        { label: '形态报告胜率', p: ps, col: '#1d4ed8' }
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
      ctx.strokeStyle = dp >= 0 ? '#d5342c' : '#0f8a4d';
      ctx.lineWidth = 1.6;
      var ya = pad.t + 22 + 12, yb = pad.t + 22 + 58 + 12;
      ctx.beginPath();
      ctx.moveTo(sx(pb), ya + 14); ctx.lineTo(sx(pb), yb - 14);
      ctx.moveTo(sx(ps), ya + 14); ctx.lineTo(sx(ps), yb - 14);
      ctx.stroke();
      ctx.fillStyle = dp >= 0 ? '#d5342c' : '#0f8a4d';
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
      var y = T / 252, drift = mu * y, sd = sg * Math.sqrt(y);
      var pb = ncdf(drift / sd);
      var dp = ps - pb;
      var n = null;
      if (dp > 1e-6) {
        var num = 1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps));
        n = Math.ceil(num * num / (dp * dp));
      }
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, '漂移 ' + (drift * 100).toFixed(2) + '% · 波动 ' + (sd * 100).toFixed(2) + '%');
      tint(baseEl, '#8a6d1f');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp <= 0 ? 'var(--green)' : (dp < 0.03 ? 'var(--amber)' : 'var(--red)'));
      txt(dpHEl, dp <= 0 ? '形态没有跑赢"什么都不做"' : '扣除漂移后的净优势');
      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nHEl, n === null ? '超额非正，无法证明优势' : '单侧 5%、检验力 80%');
      var label, hint, col;
      if (dp <= 0) { label = '无超额'; hint = '扣掉漂移后跑输随机做多'; col = 'var(--green)'; }
      else if (dp < 0.03) { label = '超额可疑'; hint = '很容易被交易成本吃掉'; col = 'var(--amber)'; }
      else if (dp < 0.06) { label = '超额有限'; hint = '有优势但远小于表面胜率暗示'; col = 'var(--amber)'; }
      else { label = '超额显著'; hint = '仍须核对样本外与成本'; col = 'var(--red)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(pb, ps);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ── 工具 2 · K 线力量计 ── */
  (function bodyMeter() {
    var oEl = $('kl_O'), hEl = $('kl_H'), lEl = $('kl_L'), cEl = $('kl_C');
    if (!oEl || !hEl || !lEl || !cEl) return;
    var oO = $('kl_OO'), hO = $('kl_HO'), lO = $('kl_LO'), cO = $('kl_CO');
    var brEl = $('kl_br'), brhEl = $('kl_brh');
    var strEl = $('kl_str'), strhEl = $('kl_strh');
    var vEl = $('kl_bv'), vhEl = $('kl_bvh');
    var cv = $('klBodyChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function drawCandle(O, H, L, C) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 24, t: 20, b: 46 };
      var y1 = h - 46;
      var plotH = y1 - pad.t;
      var lo = L - 1, hi = H + 1;
      var sy = function (p) { return pad.t + (hi - p) / (hi - lo) * plotH; };
      var cx = w * 0.5, bw = Math.min(48, w * 0.12);
      var bull = C >= O;
      var col = bull ? '#d5342c' : '#0f8a4d';
      ctx.strokeStyle = col; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, sy(H)); ctx.lineTo(cx, sy(L)); ctx.stroke();
      var top = sy(Math.max(O, C)), bot = sy(Math.min(O, C));
      ctx.fillStyle = col;
      ctx.fillRect(cx - bw / 2, top, bw, Math.max(2, bot - top));
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      ['O ' + O.toFixed(1), 'H ' + H.toFixed(1), 'L ' + L.toFixed(1), 'C ' + C.toFixed(1)].forEach(function (t, i) {
        ctx.fillText(t, pad.l + i * 72, y1 + 13);
      });
      ctx.fillStyle = '#454c56';
      ctx.fillText('单根 K 线结构示意（涨红跌绿）', w / 2, y1 + 31);
    }

    function upd() {
      var O = parseFloat(oEl.value), H = parseFloat(hEl.value);
      var L = parseFloat(lEl.value), C = parseFloat(cEl.value);
      if (H < Math.max(O, C)) H = Math.max(O, C);
      if (L > Math.min(O, C)) L = Math.min(O, C);
      if (H <= L) { H = L + 0.5; }
      txt(oO, O.toFixed(1)); txt(hO, H.toFixed(1));
      txt(lO, L.toFixed(1)); txt(cO, C.toFixed(1));
      var rng = H - L;
      var body = Math.abs(C - O) / rng;
      var upSh = (H - Math.max(O, C)) / rng;
      var loSh = (Math.min(O, C) - L) / rng;
      var closePos = (C - L) / rng;
      var dir = C >= O ? 1 : -1;
      var strength = dir * (body * closePos + loSh * 0.35 - upSh * 0.25);
      txt(brEl, (body * 100).toFixed(1) + '%');
      txt(brhEl, '上影 ' + (upSh * 100).toFixed(0) + '% · 下影 ' + (loSh * 100).toFixed(0) + '%');
      txt(strEl, (strength >= 0 ? '+' : '') + strength.toFixed(3));
      tint(strEl, strength > 0.15 ? 'var(--red)' : (strength < -0.15 ? 'var(--green)' : '#454c56'));
      txt(strhEl, '实体×收盘位置 + 下影×0.35 − 上影×0.25');
      var label, hint;
      if (strength > 0.35) { label = '强势多头'; hint = '仍需趋势环境确认，单根不构成信号'; }
      else if (strength > 0.15) { label = '偏多'; hint = '买盘占优但可能被次日覆盖'; }
      else if (strength > -0.15) { label = '均衡/犹豫'; hint = '十字星类：方向未定'; }
      else if (strength > -0.35) { label = '偏空'; hint = '卖压占优但需看位置'; }
      else { label = '强势空头'; hint = '大实体阴线：趋势延续概率高于反转'; }
      txt(vEl, label); txt(vhEl, hint);
      drawCandle(O, H, L, C);
    }
    [oEl, hEl, lEl, cEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ── 工具 3 · 期望计算器 ── */
  (function expectancy() {
    var psEl = $('kl_eps'), wEl = $('kl_win'), lEl = $('kl_loss'), cEl = $('kl_cost');
    if (!psEl || !wEl || !lEl || !cEl) return;
    var psO = $('kl_epsO'), wO = $('kl_winO'), lO = $('kl_lossO'), cO = $('kl_costO');
    var eEl = $('kl_E'), ehEl = $('kl_Eh');
    var beEl = $('kl_be'), behEl = $('kl_beh');
    var rrEl = $('kl_rr'), rrhEl = $('kl_rrh');
    var vEl = $('kl_ev'), vhEl = $('kl_evh');

    function upd() {
      var ps = parseFloat(psEl.value) / 100;
      var W = parseFloat(wEl.value) / 100;
      var L = parseFloat(lEl.value) / 100;
      var cost = parseFloat(cEl.value) / 100;
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(wO, (W * 100).toFixed(1) + '%');
      txt(lO, (L * 100).toFixed(1) + '%');
      txt(cO, (cost * 100).toFixed(2) + '%');
      var rr = L > 0 ? W / L : 0;
      var be = rr > 0 ? L / (W + L) : 1;
      var E = ps * W - (1 - ps) * L - cost;
      txt(eEl, (E >= 0 ? '+' : '') + (E * 100).toFixed(2) + '%');
      tint(eEl, E > 0 ? 'var(--red)' : 'var(--green)');
      txt(ehEl, 'E = p×赢 − (1−p)×输 − 成本');
      txt(beEl, (be * 100).toFixed(1) + '%');
      txt(behEl, '盈亏平衡胜率 = 输 ÷ (赢+输)');
      txt(rrEl, rr.toFixed(2));
      txt(rrhEl, '平均盈利 ÷ 平均亏损');
      var label, hint, col;
      if (E <= 0) { label = '负期望'; hint = '长期执行必然亏损'; col = 'var(--green)'; }
      else if (E < 0.003) { label = '边缘正期望'; hint = '极易被滑点与冲击成本抹平'; col = 'var(--amber)'; }
      else if (ps < be) { label = '赔率救场'; hint = '胜率低于平衡线，靠大赢小输维持'; col = 'var(--amber)'; }
      else { label = '正期望'; hint = '仍须样本外验证与仓位纪律'; col = 'var(--red)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }
    [psEl, wEl, lEl, cEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ── 工具 4 · 形态挖掘警示 ── */
  (function fdrWarn() {
    var nEl = $('kl_patN'), aEl = $('kl_alpha'), tEl = $('kl_trials');
    if (!nEl || !aEl || !tEl) return;
    var nO = $('kl_patNO'), aO = $('kl_alphaO'), tO = $('kl_trialsO');
    var fpEl = $('kl_fp'), fphEl = $('kl_fph');
    var bonEl = $('kl_bon'), bonhEl = $('kl_bonh');
    var vEl = $('kl_fv'), vhEl = $('kl_fvh');
    var cv = $('klFdrChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(fp, sig) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 24, t: 28, b: 46 };
      var y1 = h - 46, bh = y1 - pad.t - 8;
      var maxV = Math.max(fp + sig, 1);
      var sx = function (i, n) { return pad.l + i * (w - pad.l - pad.r) / (n - 1 || 1); };
      var bars = [
        { label: '期望假阳性', v: fp, col: '#d5342c' },
        { label: '显著门槛(1)', v: sig, col: '#1d4ed8' }
      ];
      bars.forEach(function (b, i) {
        var x = pad.l + i * ((w - pad.l - pad.r) / 2 + 20);
        var bw = (w - pad.l - pad.r) / 2 - 40;
        var bh2 = (b.v / maxV) * bh;
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(x, pad.t, bw, bh);
        ctx.fillStyle = b.col;
        ctx.fillRect(x, pad.t + bh - bh2, bw, bh2);
        ctx.fillStyle = '#454c56';
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.label, x + bw / 2, pad.t - 8);
        ctx.font = '700 12px -apple-system,sans-serif';
        ctx.fillStyle = b.col;
        ctx.fillText(b.v.toFixed(1), x + bw / 2, pad.t + bh - bh2 - 6);
      });
      ctx.fillStyle = '#454c56';
      ctx.textAlign = 'center';
      ctx.fillText('在「形态无效」的零假设下，测试 N 个形态期望出现 α×N 个假阳性', w / 2, y1 + 31);
    }

    function upd() {
      var N = parseFloat(nEl.value);
      var alpha = parseFloat(aEl.value) / 100;
      var trials = parseFloat(tEl.value);
      txt(nO, N + ' 种');
      txt(aO, (alpha * 100).toFixed(1) + '%');
      txt(tO, trials + ' 次回测');
      var fp = N * alpha;
      var bon = alpha / N;
      var cumFp = fp * trials;
      txt(fpEl, fp.toFixed(1) + ' 个');
      txt(fphEl, '单次扫描 · 累计 ' + trials + ' 次 ≈ ' + cumFp.toFixed(0) + ' 个假阳性');
      txt(bonEl, (bon * 100).toFixed(3) + '%');
      txt(bonhEl, 'Bonferroni 校正后单次检验门槛');
      var label, hint, col;
      if (fp >= 3) { label = '高危挖掘'; hint = '你「发现」的形态多半只是噪声'; col = 'var(--green)'; }
      else if (fp >= 1) { label = '谨慎'; hint = '至少期待 1 个假阳性，须样本外验证'; col = 'var(--amber)'; }
      else { label = '相对克制'; hint = '形态库仍须预注册，不能事后挑选'; col = 'var(--red)'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(fp, 1);
    }
    [nEl, aEl, tEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();
})();
