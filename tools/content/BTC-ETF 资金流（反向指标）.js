/* ============================================================
   《BTC-ETF 资金流（反向指标）》主题脚本
   四个可调模型：
     1. 日流噪声比      — |流|/现货日量 → 信号等级
     2. 干净连出判定器  — streak + 干净度 → 见底概率
     3. 漂移剥离器      — 反向胜率 vs 随机持币基准
     4. 周流价格脉冲    — 周净流 → 预期 1 周回报
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

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* ══ 工具 1 · 日流噪声比 ══ */
  (function noiseRatio() {
    var flowEl = $('etf_flow'), volEl = $('etf_vol');
    if (!flowEl || !volEl) return;
    var flowO = $('etf_flowO'), volO = $('etf_volO');
    var ratioEl = $('etf_ratio'), ratioHEl = $('etf_ratioh');
    var gradeEl = $('etf_grade'), gradeHEl = $('etf_gradeh');
    var vEl = $('etf_noise_v'), vhEl = $('etf_noise_vh');
    var cv = $('etfNoiseChart');

    function grade(r) {
      if (r >= 8) return { t: '高冲击', c: '#d5342c', h: '流/量≥8%——单日可独立影响价格', v: '可看单日方向', vh: '仍建议确认 streak' };
      if (r >= 5) return { t: '偏高', c: '#b8730a', h: '流/量 5–8%——信号质量中等偏上', v: '结合 IBIT 方向', vh: 'ex-GBTC 确认' };
      if (r >= 3) return { t: '中等噪声', c: '#454c56', h: '流/量 3–5%——行业典型区间', v: '需看 streak 结构', vh: '单日勿交易' };
      return { t: '低信号', c: '#7c848f', h: '流/量<3%——几乎淹没在现货噪声里', v: '忽略单日', vh: '等周尺度' };
    }

    function draw(ratio) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxR = 12;
      var sx = function (v) { return pad.l + (v / maxR) * iw; };
      var zones = [
        { lo: 0, hi: 3, col: '#f4f6f9', lab: '<3%' },
        { lo: 3, hi: 5, col: '#fff7e6', lab: '3–5%' },
        { lo: 5, hi: 8, col: '#fdf3f2', lab: '5–8%' },
        { lo: 8, hi: maxR, col: '#fde8e8', lab: '>8%' }
      ];
      zones.forEach(function (z) {
        ctx.fillStyle = z.col;
        ctx.fillRect(sx(z.lo), pad.t, sx(z.hi) - sx(z.lo), ih);
      });
      [3, 5, 8].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref >= 5 ? '#d5342c' : '#c9d0d9';
        ctx.setLineDash(ref >= 5 ? [] : [3, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(ref) + '%', x, y1 + 13);
      });
      var rx = sx(Math.min(ratio, maxR));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(rx, pad.t); ctx.lineTo(rx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(rx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ratio.toFixed(2) + '%', rx, pad.t + ih * 0.5 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('|ETF 流| ÷ 现货日成交量', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var flow = parseFloat(flowEl.value);
      var vol = parseFloat(volEl.value);
      var ratio = Math.abs(flow) / (vol * 1000) * 100;
      var g = grade(ratio);
      txt(flowO, (flow >= 0 ? '+' : '−') + '$' + Math.abs(Math.round(flow)) + 'M');
      txt(volO, '$' + vol.toFixed(1) + 'B');
      txt(ratioEl, ratio.toFixed(2) + '%');
      txt(ratioHEl, '|流|=' + Math.abs(flow).toFixed(0) + 'M · 量=' + vol.toFixed(1) + 'B');
      txt(gradeEl, g.t);
      tint(gradeEl, g.c);
      txt(gradeHEl, g.h);
      txt(vEl, g.v);
      txt(vhEl, g.vh);
      draw(ratio);
    }

    flowEl.addEventListener('input', update);
    volEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 干净连出判定器 ══
     校准：3+ 日历史 11/14=78.6%；默认 5 日/100% 干净/$2.97B → ~83% */
  (function streakMeter() {
    var streakEl = $('etf_streak'), cleanEl = $('etf_clean'), cumEl = $('etf_cum');
    if (!streakEl || !cleanEl || !cumEl) return;
    var streakO = $('etf_streakO'), cleanO = $('etf_cleanO'), cumO = $('etf_cumO');
    var probEl = $('etf_prob'), probHEl = $('etf_probh');
    var typeEl = $('etf_sigtype'), typeHEl = $('etf_sigtypeh');
    var vEl = $('etf_streak_v'), vhEl = $('etf_streak_vh');
    var cv = $('etfStreakChart');

    function prob(days, cleanPct, cumB) {
      var c = cleanPct / 100;
      if (days < 3) return 0.50 + 0.02 * days;
      return clamp(0.586 + 0.048 * (days - 3) + 0.12 * c + 0.015 * Math.min(cumB, 4), 0.45, 0.92);
    }

    function sigType(days, cleanPct) {
      var c = cleanPct / 100;
      if (days < 3) return { t: '噪声区', h: '连出<3 日——历史样本不纳入 11/14' };
      if (c >= 0.95) return { t: '干净 capitulation', h: '零流入连出——机构 unanimous 撤退' };
      if (c >= 0.6) return { t: '偏干净', h: '多数日出流，偶有散点流入' };
      return { t: '混合净流出', h: '分歧市场—— headline 净出但仍有买盘' };
    }

    function verdict(p, days, c) {
      if (days < 3) return { t: '样本外', h: '等待 streak≥3 再谈反向' };
      if (c < 60) return { t: '反向禁用', h: '混合窗口——用动量或观望' };
      if (p >= 0.80) return { t: '高反向质量', h: '结构类似 2026-05 10 日连出' };
      if (p >= 0.70) return { t: '中等反向质量', h: '需配宏观与链上确认' };
      return { t: '弱反向', h: '幅度/天数不足' };
    }

    function draw(p, days) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 20, t: 24, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var hist = 0.786;
      ctx.fillStyle = '#eef1f5';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.strokeStyle = '#c9d0d9';
      for (var i = 0; i <= 4; i++) {
        var gy = pad.t + ih * i / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      var sx = function (v) { return pad.l + v * iw; };
      [0.5, hist, 0.92].forEach(function (ref, idx) {
        var x = sx(ref);
        ctx.strokeStyle = ref === hist ? '#b8730a' : '#c9d0d9';
        ctx.setLineDash(ref === hist ? [4, 3] : []);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = ref === hist ? '#b8730a' : '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((ref * 100).toFixed(1) + '%', x, y1 + 13);
        if (ref === hist) {
          ctx.fillStyle = '#b8730a';
          ctx.font = '9px -apple-system,sans-serif';
          ctx.fillText('3+日 11/14', x, pad.t - 6);
        }
      });
      var px = sx(p);
      ctx.fillStyle = p >= hist ? '#0f8a4d' : '#d5342c';
      ctx.fillRect(pad.l, pad.t + ih * 0.55, px - pad.l, 22);
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('P=' + (p * 100).toFixed(1) + '% · ' + days + ' 日 streak', pad.l + 6, pad.t + ih * 0.55 + 16);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('5–10 日内见底概率（模型估计）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var days = parseInt(streakEl.value, 10);
      var clean = parseFloat(cleanEl.value);
      var cum = parseFloat(cumEl.value);
      var p = prob(days, clean, cum);
      var st = sigType(days, clean);
      var vd = verdict(p, days, clean);
      txt(streakO, days + ' 日');
      txt(cleanO, clean.toFixed(0) + '%');
      txt(cumO, '$' + cum.toFixed(2) + 'B');
      txt(probEl, (p * 100).toFixed(1) + '%');
      txt(probHEl, '历史 3+ 日样本 11/14=78.6%【待验证】');
      txt(typeEl, st.t);
      txt(typeHEl, st.h);
      txt(vEl, vd.t);
      tint(vEl, vd.t.indexOf('高') >= 0 ? '#0f8a4d' : (vd.t.indexOf('禁用') >= 0 ? '#d5342c' : '#b8730a'));
      txt(vhEl, vd.h);
      draw(p, days);
    }

    streakEl.addEventListener('input', update);
    cleanEl.addEventListener('input', update);
    cumEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function driftStrip() {
    var TEl = $('etf_T'), psEl = $('etf_ps'), muEl = $('etf_mu'), sgEl = $('etf_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('etf_TO'), psO = $('etf_psO'), muO = $('etf_muO'), sgO = $('etf_sgO');
    var baseEl = $('etf_base'), baseHEl = $('etf_baseh');
    var dpEl = $('etf_dp'), dpHEl = $('etf_dph');
    var nEl = $('etf_n'), nHEl = $('etf_nh');
    var vEl = $('etf_drift_v'), vhEl = $('etf_drift_vh');
    var cv = $('etfDriftChart');

    function draw(pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
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
        { label: '随机持币基准', p: pb, col: '#8a6d1f' },
        { label: '反向信号胜率', p: ps, col: '#1d4ed8' }
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

    function update() {
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
      var n = null;
      if (dp > 1e-6) {
        var num = 1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps));
        n = Math.ceil(num * num / (dp * dp));
      }
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, 'μ=' + (mu * 100).toFixed(0) + '% · σ=' + (sg * 100).toFixed(0) + '% · ' + T + ' 日');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp <= 0 ? 'var(--red)' : (dp < 0.05 ? 'var(--amber)' : 'var(--green)'));
      txt(dpHEl, dp <= 0 ? '反向信号未跑赢随机持币' : '扣除漂移后的净优势');
      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nHEl, n === null ? '超额非正' : '单侧 5%、检验力 80%');
      var label, hint;
      if (n !== null && n > 14) {
        label = '超额可观但 n=14';
        hint = '证明显需 n=' + n + '，历史仅 14 次 3+ 日样本';
      } else if (dp >= 0.15) {
        label = '超额大';
        hint = '统计上 attractive，但 regime 可能变';
      } else if (dp >= 0.05) {
        label = '超额中等';
        hint = '扣除漂移后仍有 edge，注意交易成本';
      } else {
        label = '超额有限';
        hint = '接近随机，勿重仓';
      }
      txt(vEl, label);
      txt(vhEl, hint);
      draw(pb, ps);
    }

    TEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 周流价格脉冲 ══
     校准：周流 −$1500M → 预期 −1.8%（IRF 峰值 ~1.2% 日频外推） */
  (function weeklyPulse() {
    var wEl = $('etf_weekly');
    if (!wEl) return;
    var wO = $('etf_weeklyO');
    var retEl = $('etf_wret'), retHEl = $('etf_wreth');
    var readEl = $('etf_wread'), readHEl = $('etf_wreadh');
    var vEl = $('etf_weekly_v'), vhEl = $('etf_weekly_vh');
    var cv = $('etfWeeklyChart');

    function expectedRet(weeklyM) {
      return clamp(weeklyM / 833, -2.5, 2.5);
    }

    function read(ret, w) {
      if (Math.abs(w) < 300) return { t: '中性', h: '周流 |W|<$300M——常态噪声', v: '极端周流才显著', vh: '勿 overtrade' };
      if (ret >= 1.5) return { t: '动量偏多', h: '大幅净流入——趋势跟随读法', v: '跟流做多（趋势段）', vh: '非 capitulation 反向' };
      if (ret <= -1.5) return { t: '动量偏空', h: '大幅净流出——趋势跟随读法', v: '谨慎或等干净 streak', vh: '若干净连出≥5 日转反向' };
      return { t: '弱信号', h: '周流中等——方向参考', v: '配日 streak 结构', vh: '单周不决策' };
    }

    function draw(ret, weekly) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 16, t: 28, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var midY = pad.t + ih / 2;
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.strokeStyle = '#c9d0d9';
      ctx.beginPath(); ctx.moveTo(pad.l, midY); ctx.lineTo(w - pad.r, midY); ctx.stroke();
      var maxRet = 2.5;
      var sy = function (r) { return midY - (r / maxRet) * (ih / 2 - 8); };
      var barW = Math.min(80, iw * 0.35);
      var bx = pad.l + iw / 2 - barW / 2;
      var top = sy(Math.max(0, ret)), bot = sy(Math.min(0, ret));
      ctx.fillStyle = ret >= 0 ? '#d5342c' : '#0f8a4d';
      if (ret >= 0) ctx.fillRect(bx, top, barW, midY - top);
      else ctx.fillRect(bx, midY, barW, bot - midY);
      ctx.fillStyle = ret >= 0 ? '#d5342c' : '#0f8a4d';
      ctx.font = 'bold 13px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((ret >= 0 ? '+' : '') + ret.toFixed(1) + '%', bx + barW / 2, ret >= 0 ? top - 8 : bot + 18);
      ctx.fillStyle = '#454c56';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('W=' + (weekly >= 0 ? '+' : '−') + '$' + Math.abs(Math.round(weekly)) + 'M', pad.l + iw / 2, pad.t + ih + 2);
      [-2.5, -1.2, 0, 1.2, 2.5].forEach(function (r) {
        var y = sy(r);
        ctx.strokeStyle = '#eef1f5';
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
        ctx.fillStyle = '#7c848f';
        ctx.font = '9px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((r > 0 ? '+' : '') + r.toFixed(1) + '%', pad.l - 6, y + 3);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('预期 1 周 BTC 回报（模型）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var w = parseFloat(wEl.value);
      var ret = expectedRet(w);
      var rd = read(ret, w);
      txt(wO, (w >= 0 ? '+' : '−') + '$' + Math.abs(Math.round(w)).toLocaleString('en-US') + 'M');
      txt(retEl, (ret >= 0 ? '+' : '') + ret.toFixed(1) + '%');
      tint(retEl, ret >= 0 ? '#d5342c' : '#0f8a4d');
      txt(retHEl, '线性近似 · IRF 峰值 ~1.2%【分析】');
      txt(readEl, rd.t);
      txt(readHEl, rd.h);
      txt(vEl, rd.v);
      txt(vhEl, rd.vh);
      draw(ret, w);
    }

    wEl.addEventListener('input', update);
    update();
  })();
})();
