/* 《安同良团队拆解坟包收割》主题脚本
   四个可调模型：
     1. 坟包阴跌计算器 — 追高后每日阴跌的累计回撤
     2. 漂移剥离器 — 随机做多基准 vs 信号胜率
     3. 散户-量化账本 — 非对称收益对照
     4. 高频门槛模拟 — 申报频率与监管分类
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

  /* ── 1. 坟包阴跌计算器 ── */
  (function graveCalc() {
    var dEl = $('fb_d'), nEl = $('fb_n'), pEl = $('fb_pump');
    if (!dEl || !nEl || !pEl) return;
    var dO = $('fb_dO'), nO = $('fb_nO'), pO = $('fb_pumpO');
    var lossEl = $('fb_loss'), lossHEl = $('fb_lossh');
    var netEl = $('fb_net'), netHEl = $('fb_neth');
    var vEl = $('fb_v'), vhEl = $('fb_vh');
    var cv = $('fbChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(prices) {
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

      var pumpEnd = Math.round(prices.length * 0.22);
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(prices[0]));
      for (var i = 1; i < pumpEnd; i++) ctx.lineTo(sx(i), sy(prices[i]));
      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(sx(pumpEnd), sy(prices[pumpEnd]));
      for (var j = pumpEnd + 1; j < prices.length; j++) ctx.lineTo(sx(j), sy(prices[j]));
      ctx.strokeStyle = '#0f8a4d';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = '#8a6d1f';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(sx(pumpEnd), pt);
      ctx.lineTo(sx(pumpEnd), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#7c848f';
      ctx.font = '10.5px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('放量冲高', sx(pumpEnd * 0.5), y1 + 13);
      ctx.fillText('阴跌出货', sx(pumpEnd + (prices.length - pumpEnd) * 0.5), y1 + 13);
      ctx.fillText('交易日', w / 2, y1 + 31);
    }

    function upd() {
      var d = parseFloat(dEl.value), n = parseInt(nEl.value, 10);
      var pump = parseFloat(pEl.value) / 100;
      txt(dO, d.toFixed(1) + '%');
      txt(nO, n + ' 天');
      txt(pO, (pump * 100).toFixed(0) + '%');

      var lossFromEntry = (1 - Math.pow(1 - d / 100, n)) * 100;
      var entry = 1 + pump;
      var finalP = entry * Math.pow(1 - d / 100, n);
      var netFromStart = (finalP - 1) * 100;

      txt(lossEl, '-' + lossFromEntry.toFixed(1) + '%');
      tint(lossEl, 'var(--green)');
      txt(lossHEl, '相对追入高点 · 每日跌 ' + d.toFixed(1) + '% × ' + n + ' 天');

      txt(netEl, (netFromStart >= 0 ? '+' : '') + netFromStart.toFixed(1) + '%');
      tint(netEl, netFromStart >= 0 ? 'var(--red)' : 'var(--green)');
      txt(netHEl, '若从启动前持有至阴跌结束（含冲高段）');

      var label, hint, col;
      if (lossFromEntry < 25) {
        label = '轻度磨损'; hint = '阴跌尚浅，心理煎熬大于账面亏损';
        col = 'var(--amber)';
      } else if (lossFromEntry < 40) {
        label = '典型坟包'; hint = '接近安同良团队描述的 1–3% × 20–30 天区间';
        col = 'var(--green)';
      } else {
        label = '深度收割'; hint = '跌幅已迫近止损/清仓阈值，流动性陷阱成型';
        col = '#6b3fa0';
      }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);

      var totalDays = Math.max(8, Math.round(n * 1.35));
      var pumpDays = Math.max(3, Math.round(totalDays * 0.22));
      var prices = [];
      for (var t = 0; t < pumpDays; t++) {
        prices.push(1 + pump * (t + 1) / pumpDays);
      }
      var peak = prices[prices.length - 1];
      for (var k = 1; k <= n; k++) {
        prices.push(peak * Math.pow(1 - d / 100, k));
      }
      draw(prices);
    }
    dEl.addEventListener('input', upd);
    nEl.addEventListener('input', upd);
    pEl.addEventListener('input', upd);
    upd();
  })();

  /* ── 2. 漂移剥离器 ── */
  (function driftStrip() {
    var TEl = $('fb_T'), psEl = $('fb_ps'), muEl = $('fb_mu'), sgEl = $('fb_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('fb_TO'), psO = $('fb_psO'), muO = $('fb_muO'), sgO = $('fb_sgO');
    var baseEl = $('fb_base'), baseHEl = $('fb_baseh');
    var dpEl = $('fb_dp'), dpHEl = $('fb_dph');
    var nEl = $('fb_nsamp'), nHEl = $('fb_nsamph');
    var vEl = $('fb_dv'), vhEl = $('fb_dvh');

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
      txt(baseHEl, '随机做多 · 漂移 ' + (drift * 100).toFixed(2) + '%');
      tint(baseEl, '#8a6d1f');

      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp <= 0 ? 'var(--green)' : (dp < 0.05 ? 'var(--amber)' : 'var(--red)'));
      txt(dpHEl, dp <= 0 ? '信号未跑赢「什么都不做」' : '扣除市场漂移后的净超额');

      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nHEl, n === null ? '超额非正' : '单侧 5%、检验力 80%');

      var label, hint, col;
      if (dp <= 0) { label = '无超额'; hint = '突破追涨的「胜率」可能只是市场漂移'; col = 'var(--green)'; }
      else if (dp < 0.05) { label = '超额可疑'; hint = '扣除漂移后优势很薄，易被交易成本吃掉'; col = 'var(--amber)'; }
      else if (n > 500) { label = '需大样本'; hint = '优势存在但统计上需要数百次交易才站得住'; col = '#1d4ed8'; }
      else { label = '超额可信'; hint = '相对基准有明显优势（仍不等于可交易）'; col = 'var(--red)'; }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ── 3. 散户-量化账本 ── */
  (function ledger() {
    var qEl = $('fb_qret'), rEl = $('fb_rloss'), popEl = $('fb_pop');
    if (!qEl || !rEl || !popEl) return;
    var qO = $('fb_qretO'), rO = $('fb_rlossO'), popO = $('fb_popO');
    var gapEl = $('fb_gap'), gapHEl = $('fb_gaph');
    var poolEl = $('fb_pool'), poolHEl = $('fb_poolh');
    var vEl = $('fb_lv'), vhEl = $('fb_lvh');

    function upd() {
      var q = parseFloat(qEl.value) / 100;
      var r = parseFloat(rEl.value);
      var pop = parseInt(popEl.value, 10) * 1e4;
      txt(qO, (q * 100).toFixed(1) + '%');
      txt(rO, '¥' + r.toLocaleString('zh-CN'));
      txt(popO, (pop / 1e4).toFixed(0) + ' 万');

      var qAum = 1.8e12;
      var qProfit = qAum * q;
      var rTotal = pop * r;
      var gap = qProfit + rTotal;

      txt(gapEl, '¥' + Math.abs(gap / 1e8).toFixed(0) + ' 亿');
      tint(gapEl, gap > 0 ? 'var(--red)' : 'var(--green)');
      txt(gapHEl, '量化盈利 + 散户亏损（符号相反时为正）· 简化零和视角');

      txt(poolEl, '¥' + (qProfit / 1e8).toFixed(0) + ' 亿 vs ¥' + (Math.abs(rTotal) / 1e8).toFixed(0) + ' 亿');
      txt(poolHEl, '百亿量化均值收益 × 1.8 万亿 AUM vs 散户人均亏损 × 人数');

      var label, hint, col;
      if (Math.abs(gap) < 5e10) {
        label = '数量级接近'; hint = '两侧转移在量级上可对得上（仍是【待验证】简化模型）'; col = 'var(--amber)';
      } else if (gap > 0) {
        label = '量化侧更大'; hint = '机构盈利规模超过散户亏损合计——中间有交易成本与机构间互搏'; col = 'var(--red)';
      } else {
        label = '散户侧更大'; hint = '人均亏损×人数超过量化盈利——需检查假设是否过宽'; col = '#1d4ed8';
      }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);
    }
    [qEl, rEl, popEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ── 4. 高频门槛模拟 ── */
  (function freqSim() {
    var fpsEl = $('fb_fps'), hrsEl = $('fb_hrs');
    if (!fpsEl || !hrsEl) return;
    var fpsO = $('fb_fpsO'), hrsO = $('fb_hrsO');
    var totEl = $('fb_tot'), totHEl = $('fb_toth');
    var clsEl = $('fb_cls'), clsHEl = $('fb_clsh');
    var vEl = $('fb_fv'), vhEl = $('fb_fvh');
    var TH = 300, TH_PROP = 15;

    function upd() {
      var fps = parseFloat(fpsEl.value);
      var hrs = parseFloat(hrsEl.value);
      txt(fpsO, fps.toFixed(0) + ' 笔/秒');
      txt(hrsO, hrs.toFixed(1) + ' 小时');

      var total = Math.round(fps * hrs * 3600);
      var isHF = fps >= TH;
      var wouldHF = fps >= TH_PROP;

      txt(totEl, total.toLocaleString('en-US') + ' 笔');
      txt(totHEl, hrs + ' 小时连续申报/撤单合计');

      var cls, clsH, col;
      if (isHF) {
        cls = '现行高频（≥300 笔/秒）';
        clsH = '需额外报告、异常交易从严、未来差异化收费';
        col = 'var(--red)';
      } else if (wouldHF) {
        cls = '非高频，但 ≥ 安同良建议 15 笔/秒';
        clsH = '现行规则下不算高频，政策建议区间';
        col = 'var(--amber)';
      } else {
        cls = '中低频程序化';
        clsH = '低于 15 笔/秒建议门槛 · 一般报告义务';
        col = 'var(--green)';
      }
      txt(clsEl, cls); tint(clsEl, col);
      txt(clsHEl, clsH);

      var ratio = fps / TH;
      var label = ratio >= 1 ? '卡线高频' : (ratio >= 0.9 ? '逼近红线' : '远离红线');
      txt(vEl, label);
      tint(vEl, ratio >= 1 ? 'var(--red)' : (ratio >= 0.9 ? 'var(--amber)' : 'var(--green)'));
      txt(vhEl, '当前 ' + fps + ' / 300 = ' + (ratio * 100).toFixed(0) + '% · 建议门槛 15 笔/秒');
    }
    fpsEl.addEventListener('input', upd);
    hrsEl.addEventListener('input', upd);
    upd();
  })();
})();
