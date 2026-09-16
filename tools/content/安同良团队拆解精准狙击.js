/* 《安同良团队拆解精准狙击》主题脚本
   四个可调模型：
     1. 支撑位击穿连锁 — 砸穿关键价位触发止损簇
     2. T+1 锁仓陷阱 — 涨停追入次日无法当日退出
     3. 融券砸盘放大 — 现货下跌 + 融券卖压叠加
     4. 漂移剥离器 — 涨停追击胜率 vs 随机做多基准
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

  /* ── 1. 支撑位击穿连锁 ── */
  (function supportBreak() {
    var eEl = $('jz_entry'), bEl = $('jz_brk'), sEl = $('jz_stop');
    if (!eEl || !bEl || !sEl) return;
    var eO = $('jz_entryO'), bO = $('jz_brkO'), sO = $('jz_stopO');
    var lossEl = $('jz_loss'), lossHEl = $('jz_lossh');
    var casEl = $('jz_cas'), casHEl = $('jz_cash');
    var vEl = $('jz_sv'), vhEl = $('jz_svh');
    var cv = $('jzChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(S, E, B, cascadeEnd) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pl = 44, pr = 16, pt = 18, y1 = h - 46, bw = w - pl - pr;
      var bh = y1 - pt;
      var lo = Math.min(S, B, cascadeEnd) * 0.97;
      var hi = Math.max(E, S) * 1.02;
      var sy = function (v) { return pt + (hi - v) / (hi - lo) * bh; };

      ctx.strokeStyle = '#eef1f5';
      ctx.lineWidth = 1;
      for (var g = 0; g <= 4; g++) {
        var y = pt + g / 4 * bh;
        ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(w - pr, y); ctx.stroke();
      }

      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#8a6d1f';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(pl, sy(S));
      ctx.lineTo(w - pr, sy(S));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#8a6d1f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('支撑位 S', pl + 4, sy(S) - 5);

      var pts = [
        { x: pl, v: S * 1.02, c: '#d5342c' },
        { x: pl + bw * 0.35, v: E, c: '#d5342c' },
        { x: pl + bw * 0.55, v: B, c: '#0f8a4d' },
        { x: w - pr, v: cascadeEnd, c: '#0f8a4d' }
      ];
      ctx.beginPath();
      ctx.moveTo(pts[0].x, sy(pts[0].v));
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, sy(pts[i].v));
      ctx.strokeStyle = '#454c56';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.fillStyle = '#d5342c';
      ctx.beginPath();
      ctx.arc(pts[1].x, sy(pts[1].v), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      ctx.fillText('追入 E', pts[1].x, sy(pts[1].v) - 10);

      ctx.fillStyle = '#7c848f';
      ctx.fillText('砸穿', pts[2].x, y1 + 13);
      ctx.fillText('止损连锁', pts[3].x - 30, y1 + 13);
      ctx.fillText('价格', w / 2, y1 + 31);
    }

    function upd() {
      var entryPrem = parseFloat(eEl.value);
      var brk = parseFloat(bEl.value);
      var stop = parseFloat(sEl.value);
      txt(eO, entryPrem.toFixed(1) + '%');
      txt(bO, brk.toFixed(1) + '%');
      txt(sO, stop.toFixed(0) + '%');

      var S = 100;
      var E = S * (1 + entryPrem / 100);
      var B = S * (1 - brk / 100);
      var loss = (E - B) / E * 100;
      var cascade = stop / 100 * brk * 0.5;
      var total = loss + cascade;
      var cascadeEnd = B * (1 - cascade / 100);

      txt(lossEl, '-' + loss.toFixed(1) + '%');
      tint(lossEl, 'var(--green)');
      txt(lossHEl, '从追入点 E 至击穿支撑位 B');

      txt(casEl, '-' + total.toFixed(1) + '%');
      tint(casEl, 'var(--green)');
      txt(casHEl, '含止损簇连锁约 -' + cascade.toFixed(2) + '% 额外下压');

      var label, hint, col;
      if (total < 4) {
        label = '轻度击穿'; hint = '止损簇未充分触发，恐慌有限';
        col = 'var(--amber)';
      } else if (total < 8) {
        label = '典型狙击'; hint = '接近团队描述的「砸穿支撑→恐慌抛售」区间';
        col = 'var(--green)';
      } else {
        label = '深度连锁'; hint = '止损密集区被击穿，流动性瞬间蒸发';
        col = '#6b3fa0';
      }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);

      draw(S, E, B, cascadeEnd);
    }
    [eEl, bEl, sEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ── 2. T+1 锁仓陷阱 ── */
  (function t1Trap() {
    var cEl = $('jz_chase'), gEl = $('jz_gap');
    if (!cEl || !gEl) return;
    var cO = $('jz_chaseO'), gO = $('jz_gapO');
    var lossEl = $('jz_t1loss'), lossHEl = $('jz_t1lossh');
    var lockEl = $('jz_lock'), lockHEl = $('jz_lockh');
    var vEl = $('jz_tv'), vhEl = $('jz_tvh');

    function upd() {
      var chase = parseFloat(cEl.value);
      var gap = parseFloat(gEl.value);
      txt(cO, '+' + chase.toFixed(1) + '%');
      txt(gO, gap.toFixed(1) + '%');

      var buy = 1 + chase / 100;
      var open = buy * (1 + gap / 100);
      var loss = (buy - open) / buy * 100;
      var lockHrs = 4.5;

      txt(lossEl, '-' + loss.toFixed(1) + '%');
      tint(lossEl, 'var(--green)');
      txt(lossHEl, '涨停日追入 → 次日开盘相对成本');

      txt(lockEl, lockHrs + ' 小时');
      txt(lockHEl, 'T+1 当日无法卖出 · 隔夜风险敞口');

      var label, hint, col;
      if (loss < 3) {
        label = '可控回撤'; hint = '次日低开有限，但规则风险仍在';
        col = 'var(--amber)';
      } else if (loss < 7) {
        label = '典型锁仓'; hint = '涨停追入 + 次日低开 — 团队描述的 T+1 困境';
        col = 'var(--green)';
      } else {
        label = '隔夜重创'; hint = '追在情绪顶点，次日踩踏';
        col = '#6b3fa0';
      }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);
    }
    cEl.addEventListener('input', upd);
    gEl.addEventListener('input', upd);
    upd();
  })();

  /* ── 3. 融券砸盘放大 ── */
  (function shortAmp() {
    var bEl = $('jz_base'), rEl = $('jz_ratio'), mEl = $('jz_mult');
    if (!bEl || !rEl || !mEl) return;
    var bO = $('jz_baseO'), rO = $('jz_ratioO'), mO = $('jz_multO');
    var ampEl = $('jz_amp'), ampHEl = $('jz_amph');
    var feeEl = $('jz_fee'), feeHEl = $('jz_feeh');
    var vEl = $('jz_rv'), vhEl = $('jz_rvh');

    function upd() {
      var base = parseFloat(bEl.value);
      var ratio = parseFloat(rEl.value);
      var mult = parseFloat(mEl.value);
      txt(bO, base.toFixed(1) + '%');
      txt(rO, ratio.toFixed(1) + '%');
      txt(mO, mult.toFixed(0) + '×');

      var amp = base * (1 + ratio / 100 * mult);
      var fee = ratio * 0.08;

      txt(ampEl, amp.toFixed(2) + '%');
      tint(ampEl, 'var(--green)');
      txt(ampHEl, '现货跌幅 × (1 + 融券占比 × 放大系数)');

      txt(feeEl, fee.toFixed(2) + '%/年');
      txt(feeHEl, '融券成本示意 · 限空政策下可得性下降【分析】');

      var label, hint, col;
      if (Math.abs(amp) < 3) {
        label = '弱放大'; hint = '融券可得性低或砸盘力度有限';
        col = 'var(--amber)';
      } else if (Math.abs(amp) < 6) {
        label = '典型砸盘'; hint = '现货下跌 + 融券卖压叠加';
        col = 'var(--green)';
      } else {
        label = '强共振'; hint = '限空前的高融券标的 · 团队「限空」建议针对此层';
        col = '#6b3fa0';
      }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);
    }
    [bEl, rEl, mEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ── 4. 漂移剥离器 ── */
  (function driftStrip() {
    var TEl = $('jz_T'), psEl = $('jz_ps'), muEl = $('jz_mu'), sgEl = $('jz_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('jz_TO'), psO = $('jz_psO'), muO = $('jz_muO'), sgO = $('jz_sgO');
    var baseEl = $('jz_basep'), baseHEl = $('jz_baseph');
    var dpEl = $('jz_dp'), dpHEl = $('jz_dph');
    var nEl = $('jz_nsamp'), nHEl = $('jz_nsamph');
    var vEl = $('jz_dv'), vhEl = $('jz_dvh');

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
      txt(dpHEl, dp <= 0 ? '涨停追击未跑赢「什么都不做」' : '扣除市场漂移后的净超额');

      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nHEl, n === null ? '超额非正' : '单侧 5%、检验力 80%');

      var label, hint, col;
      if (dp <= 0) { label = '无超额'; hint = '涨停追击的「胜率」可能只是市场漂移'; col = 'var(--green)'; }
      else if (dp < 0.05) { label = '超额可疑'; hint = '扣除漂移后优势很薄，易被 T+1 隔夜吃掉'; col = 'var(--amber)'; }
      else if (n > 500) { label = '需大样本'; hint = '优势存在但统计上需要数百次交易才站得住'; col = '#1d4ed8'; }
      else { label = '超额可信'; hint = '相对基准有明显优势（仍不等于可交易）'; col = 'var(--red)'; }
      txt(vEl, label); tint(vEl, col);
      txt(vhEl, hint);
    }
    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
