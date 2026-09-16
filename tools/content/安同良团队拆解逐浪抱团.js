/* 《安同良团队拆解逐浪抱团》主题脚本
   四个可调模型：
     1. 助涨-踩踏双相波 — 同质化量化助涨后同步止损
     2. 同步止损连锁 — 触发机构数与额外卖压
     3. 漂移剥离器 — 趋势策略 vs 随机做多基准
     4. 热点逐浪温度计 — 板块热度 × 散户情绪 → 抱团风险
*/
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

  /* ── 1. 助涨-踩踏双相波 ── */
  (function waveChart() {
    var tEl = $('wl_trend'), qEl = $('wl_q'), hEl = $('wl_h'), cEl = $('wl_crash');
    if (!tEl || !qEl || !hEl || !cEl) return;
    var tO = $('wl_trendO'), qO = $('wl_qO'), hO = $('wl_hO'), cO = $('wl_crashO');
    var upEl = $('wl_up'), upHEl = $('wl_uph');
    var dnEl = $('wl_dn'), dnHEl = $('wl_dnh');
    var vEl = $('wl_v'), vhEl = $('wl_vh');
    var cv = $('wlChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(prices, split) {
      if (!ctx || !prices.length) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pl = 44, pr = 16, pt = 18, y1 = h - 46, bw = w - pl - pr;
      var bh = y1 - pt;
      var lo = Math.min.apply(null, prices), hi = Math.max.apply(null, prices);
      var pad = (hi - lo) * 0.08 || 0.02;
      lo -= pad; hi += pad;
      var sx = function (i) { return pl + i / (prices.length - 1) * bw; };
      var sy = function (v) { return pt + (hi - v) / (hi - lo) * bh; };

      ctx.strokeStyle = '#eef1f5';
      ctx.lineWidth = 1;
      for (var g = 0; g <= 4; g++) {
        var y = pt + g / 4 * bh;
        ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(w - pr, y); ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(sx(0), sy(prices[0]));
      for (var i = 1; i <= split; i++) ctx.lineTo(sx(i), sy(prices[i]));
      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(sx(split), sy(prices[split]));
      for (var j = split + 1; j < prices.length; j++) ctx.lineTo(sx(j), sy(prices[j]));
      ctx.strokeStyle = '#0f8a4d';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = '#8a6d1f';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(sx(split), pt);
      ctx.lineTo(sx(split), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#7c848f';
      ctx.font = '10.5px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('助涨段', sx(split * 0.5), y1 + 13);
      ctx.fillText('同步踩踏', sx(split + (prices.length - split) * 0.5), y1 + 13);
      ctx.fillText('交易日', w / 2, y1 + 31);
    }

    function upd() {
      var trendDays = parseInt(tEl.value, 10);
      var q = parseFloat(qEl.value) / 100;
      var homo = parseFloat(hEl.value) / 100;
      var crashBase = parseFloat(cEl.value) / 100;
      txt(tO, trendDays + ' 日');
      txt(qO, (q * 100).toFixed(0) + '%');
      txt(hO, (homo * 100).toFixed(0) + '%');
      txt(cO, (crashBase * 100).toFixed(1) + '%');

      var baseDaily = 0.008;
      var amp = q * homo * 2;
      var dailyUp = baseDaily * (1 + amp);
      var cumUp = (Math.pow(1 + dailyUp, trendDays) - 1) * 100;

      var crashDays = 8;
      var dailyDn = crashBase * q * homo;
      var cumDn = (1 - Math.pow(1 - dailyDn, crashDays)) * 100;

      txt(upEl, '+' + cumUp.toFixed(1) + '%');
      tint(upEl, 'var(--red)');
      txt(upHEl, trendDays + ' 日助涨 · 日均 +' + (dailyUp * 100).toFixed(2) + '%');

      txt(dnEl, '-' + cumDn.toFixed(1) + '%');
      tint(dnEl, 'var(--green)');
      txt(dnHEl, crashDays + ' 日同步止损 · 日均 -' + (dailyDn * 100).toFixed(2) + '%');

      var label, hint, col;
      if (cumUp > 25 && cumDn > 8) {
        label = '典型逐浪抱团'; hint = '助涨快、反转踩踏猛——团队描述的双相结构';
        col = 'var(--red)';
      } else if (cumUp > 15) {
        label = '助涨主导'; hint = '同质化追涨仍在，反转段尚浅';
        col = 'var(--amber)';
      } else {
        label = '弱抱团'; hint = '量化参与度或同质性较低，波动接近普通趋势';
        col = '#1d4ed8';
      }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);

      var prices = [1];
      for (var d = 1; d <= trendDays; d++) prices.push(prices[prices.length - 1] * (1 + dailyUp));
      var peak = prices[prices.length - 1];
      for (var k = 1; k <= crashDays; k++) prices.push(peak * Math.pow(1 - dailyDn, k));
      draw(prices, trendDays);
    }
    [tEl, qEl, hEl, cEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ── 2. 同步止损连锁 ── */
  (function cascade() {
    var nEl = $('wl_n'), hEl = $('wl_ch'), sEl = $('wl_stop');
    if (!nEl || !hEl || !sEl) return;
    var nO = $('wl_nO'), hO = $('wl_chO'), sO = $('wl_stopO');
    var trEl = $('wl_trig'), trHEl = $('wl_trigh');
    var imEl = $('wl_imp'), imHEl = $('wl_imph');
    var vEl = $('wl_cv'), vhEl = $('wl_cvh');

    function upd() {
      var n = parseInt(nEl.value, 10);
      var homo = parseFloat(hEl.value) / 100;
      var stop = parseFloat(sEl.value) / 100;
      txt(nO, n + ' 家');
      txt(hO, (homo * 100).toFixed(0) + '%');
      txt(sO, (stop * 100).toFixed(1) + '%');

      var triggered = Math.round(n * homo);
      var impactPer = 0.045;
      var extraDrop = triggered * impactPer;

      txt(trEl, triggered + ' / ' + n);
      txt(trHEl, '回撤 ≥ ' + (stop * 100).toFixed(1) + '% 时同步触发（同质化模型）');

      txt(imEl, '-' + extraDrop.toFixed(2) + '%/日');
      tint(imEl, 'var(--green)');
      txt(imHEl, '额外卖压近似 · 不含散户跟风');

      var label, hint, col;
      if (triggered >= 30 && extraDrop >= 1.2) {
        label = '踩踏风险高'; hint = '央广评论所述「个体理性、集体非理性」正反馈区';
        col = 'var(--red)';
      } else if (triggered >= 15) {
        label = '中度连锁'; hint = '部分机构同步减仓，波动放大但未失控';
        col = 'var(--amber)';
      } else {
        label = '分散退出'; hint = '策略异质性较高，同步性弱';
        col = 'var(--green)';
      }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);
    }
    [nEl, hEl, sEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ── 3. 漂移剥离器 ── */
  (function driftStrip() {
    var TEl = $('wl_T'), psEl = $('wl_ps'), muEl = $('wl_mu'), sgEl = $('wl_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('wl_TO'), psO = $('wl_psO'), muO = $('wl_muO'), sgO = $('wl_sgO');
    var baseEl = $('wl_base'), baseHEl = $('wl_baseh');
    var dpEl = $('wl_dp'), dpHEl = $('wl_dph');
    var nEl = $('wl_nsamp'), nHEl = $('wl_nsamph');
    var vEl = $('wl_dv'), vhEl = $('wl_dvh');

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

      txt(baseEl, (pb * 100).toFixed(2) + '%');
      txt(baseHEl, '随机做多 · μ=' + (mu * 100).toFixed(0) + '% σ=' + (sg * 100).toFixed(0) + '%');
      tint(baseEl, '#8a6d1f');

      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp <= 0 ? 'var(--green)' : (dp < 0.05 ? 'var(--amber)' : 'var(--red)'));
      txt(dpHEl, dp <= 0 ? '趋势策略未跑赢基准' : '扣除漂移后的净超额');

      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nHEl, n === null ? '超额非正' : '单侧 5%、检验力 80%');

      var label, hint, col;
      if (dp <= 0) { label = '无超额'; hint = '「追涨胜率」可能只是市场正漂移'; col = 'var(--green)'; }
      else if (dp < 0.05) { label = '超额可疑'; hint = '优势薄，易被同步踩踏与成本吃掉'; col = 'var(--amber)'; }
      else if (n > 500) { label = '需大样本'; hint = '统计上需数百次交易才站得住'; col = '#1d4ed8'; }
      else { label = '超额可信'; hint = '相对基准有明显优势（仍≠可安全追涨）'; col = 'var(--red)'; }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ── 4. 热点逐浪温度计 ── */
  (function hotIndex() {
    var heatEl = $('wl_heat'), sentEl = $('wl_sent'), syncEl = $('wl_sync');
    if (!heatEl || !sentEl || !syncEl) return;
    var heatO = $('wl_heatO'), sentO = $('wl_sentO'), syncO = $('wl_syncO');
    var scoreEl = $('wl_score'), scoreHEl = $('wl_scoreh');
    var phaseEl = $('wl_phase'), phaseHEl = $('wl_phaseh');
    var vEl = $('wl_hv'), vhEl = $('wl_hvh');

    function upd() {
      var heat = parseFloat(heatEl.value);
      var sent = parseFloat(sentEl.value);
      var sync = parseFloat(syncEl.value) / 100;
      txt(heatO, heat.toFixed(0));
      txt(sentO, sent.toFixed(0));
      txt(syncO, (sync * 100).toFixed(0) + '%');

      var raw = Math.sqrt(heat * sent) * sync;
      var score = Math.min(100, raw);

      txt(scoreEl, score.toFixed(0));
      tint(scoreEl, score >= 70 ? 'var(--red)' : (score >= 45 ? 'var(--amber)' : 'var(--green)'));
      txt(scoreHEl, '√(热度×情绪)×策略同质性 · 0–100');

      var phase, phaseH, col;
      if (score >= 75) {
        phase = '退潮前夜'; phaseH = '助涨段末端：散户信心最足时模型易反向';
        col = 'var(--red)';
      } else if (score >= 50) {
        phase = '逐浪中段'; phaseH = '量化与散户同向追涨，波动被放大';
        col = 'var(--amber)';
      } else if (score >= 25) {
        phase = '酝酿期'; phaseH = '热点刚起，同质性尚未拉满';
        col = '#1d4ed8';
      } else {
        phase = '冷区'; phaseH = '抱团因子弱，更像普通波动';
        col = 'var(--green)';
      }
      txt(phaseEl, phase); tint(phaseEl, col);
      txt(phaseHEl, phaseH);

      var label = score >= 70 ? '高危抱团' : (score >= 45 ? '中度逐浪' : '低危');
      txt(vEl, label);
      tint(vEl, score >= 70 ? 'var(--red)' : (score >= 45 ? 'var(--amber)' : 'var(--green)'));
      txt(vhEl, '团队叙事：差公司沾热点也可被「一波波推上去」【分析】');
    }
    [heatEl, sentEl, syncEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
