/* ============================================================
   《威科夫操盘法》主题脚本
   四个可调模型（滑块全部真实参与计算）：
     1. 漂移剥离器    — 随机做多基准胜率与真实超额
     2. 因果计数器    — P&F 横向列数 → 目标价 → 赔率
     3. 努力与结果    — e = 波幅比 ÷ 量比，叠加价格位置
     4. 弹簧质量分    — 深度 / 速度 / 量能 三因子合成
   自包含 IIFE，与页面通用脚本隔离。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  /* 标准正态 CDF，Abramowitz & Stegun 7.1.26，|误差| < 7.5e-8 */
  function ncdf(x) {
    var s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2;
    var t = 1 / (1 + 0.3275911 * z);
    var y = 1 - (t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 +
            t * (-1.453152027 + t * 1.061405429))))) * Math.exp(-z * z);
    return 0.5 * (1 + s * y);
  }

  /* ══════════════════════════════════════════════════════════
     工具 4 · 漂移剥离器
     随机做多基准胜率 p_b = Φ( μ·(T/252) ÷ (σ·√(T/252)) )
     超额 Δp = p_s − p_b；所需样本按单侧 α=5%、检验力 80%
     n = (1.96·√(p_b(1−p_b)) + 0.84·√(p_s(1−p_s)))² ÷ Δp²
     ══════════════════════════════════════════════════════════ */
  (function driftStrip() {
    var TEl = $('wf_T'), psEl = $('wf_ps'), muEl = $('wf_mu'), sgEl = $('wf_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('wf_TO'), psO = $('wf_psO'), muO = $('wf_muO'), sgO = $('wf_sgO');
    var baseEl = $('wf_base'), baseHEl = $('wf_baseh');
    var dpEl = $('wf_dp'), dpHEl = $('wf_dph');
    var nEl = $('wf_n'), nHEl = $('wf_nh');
    var vEl = $('wf_v'), vhEl = $('wf_vh');
    var cv = $('wfChart');
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
      var x0 = 0.40, x1 = 1.0;                       // 展示 40%–100%
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

      // 50% 参考线标注
      ctx.fillStyle = '#d5342c';
      ctx.textAlign = 'left';
      ctx.fillText('50%（无漂移时的公平线）', sx(0.5) + 4, pad.t - 12);

      var rows = [
        { label: '随机做多基准', p: pb, col: '#8a6d1f' },
        { label: '信号报告胜率', p: ps, col: '#1d4ed8' }
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

      // 超额区间标注
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
      var drift = mu * y, sd = sg * Math.sqrt(y);
      var pb = ncdf(drift / sd);
      var dp = ps - pb;

      var n = null;
      if (dp > 1e-6) {
        var num = 1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps));
        n = Math.ceil(num * num / (dp * dp));
      }

      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, '漂移 ' + (drift * 100).toFixed(2) + '% · 波动 ' +
                   (sd * 100).toFixed(2) + '% · ' + T + ' 日');
      tint(baseEl, '#8a6d1f');

      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp <= 0 ? 'var(--red)' : (dp < 0.03 ? 'var(--amber)' : 'var(--green)'));
      txt(dpHEl, dp <= 0 ? '信号没有跑赢"什么都不做"'
                         : '扣除市场漂移后的净优势');

      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nHEl, n === null ? '超额非正，再多样本也无法证明优势'
                           : '单侧 5%、检验力 80% 的比例检验');

      var label, hint, col;
      if (dp <= 0) {
        label = '无超额'; hint = '扣掉漂移后不但没有优势，还跑输了随机做多';
        col = 'var(--red)';
      } else if (dp < 0.03) {
        label = '超额可疑'; hint = '这点差距很容易被交易成本吃掉，不要当成优势';
        col = 'var(--red)';
      } else if (dp < 0.06) {
        label = '超额真实但有限'; hint = '信号确实有效，但幅度远小于表面胜率暗示的';
        col = 'var(--amber)';
      } else {
        label = '超额显著'; hint = '扣除漂移后仍有可观优势，仍须核对成本与样本外表现';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(pb, ps);
    }

    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 1 · 因果计数器
     目标价 = 基准价 + 横向列数 × (基准价×格值%) × 转向值
     盈亏比 = 上方空间 ÷ 止损幅度；盈亏平衡胜率 = 1 ÷ (1 + 盈亏比)
     ══════════════════════════════════════════════════════════ */
  (function causeCount() {
    var cEl = $('pf_cols'), bEl = $('pf_box'), rEl = $('pf_rev'),
        lEl = $('pf_line'), sEl = $('pf_stop');
    if (!cEl || !bEl || !rEl || !lEl || !sEl) return;
    var cO = $('pf_colsO'), bO = $('pf_boxO'), rO = $('pf_revO'),
        lO = $('pf_lineO'), sO = $('pf_stopO');
    var tEl = $('pf_target'), tHEl = $('pf_targeth');
    var gEl = $('pf_gain'), gHEl = $('pf_gainh');
    var rrEl = $('pf_rr'), rrHEl = $('pf_rrh');
    var pEl = $('pf_p'), pHEl = $('pf_ph');
    var vEl = $('pf_v'), vhEl = $('pf_vh');

    function upd() {
      var cols = parseFloat(cEl.value);
      var boxPct = parseFloat(bEl.value) / 100;
      var rev = parseFloat(rEl.value);
      var line = parseFloat(lEl.value);
      var stopPct = parseFloat(sEl.value) / 100;

      txt(cO, cols + ' 列');
      txt(bO, (boxPct * 100).toFixed(1) + '%');
      txt(rO, rev + ' 格');
      txt(lO, '¥' + line.toFixed(0));
      txt(sO, (stopPct * 100).toFixed(0) + '%');

      var boxPrice = line * boxPct;
      var target = line + cols * boxPrice * rev;
      var gain = target / line - 1;
      var rr = gain / stopPct;
      var p = 1 / (1 + rr);

      txt(tEl, '¥' + target.toFixed(2));
      tint(tEl, 'var(--red)');
      txt(tHEl, '单格 ¥' + boxPrice.toFixed(3) + ' × ' + cols + ' 列 × ' + rev + ' 格');

      txt(gEl, '+' + (gain * 100).toFixed(1) + '%');
      tint(gEl, 'var(--red)');
      txt(gHEl, '距计数基准价 ¥' + line.toFixed(0));

      txt(rrEl, rr.toFixed(2));
      tint(rrEl, rr >= 3 ? 'var(--green)' : (rr >= 2 ? '' : 'var(--red)'));
      txt(rrHEl, '空间 ' + (gain * 100).toFixed(1) + '% ÷ 止损 ' +
                  (stopPct * 100).toFixed(0) + '%');

      txt(pEl, (p * 100).toFixed(1) + '%');
      txt(pHEl, '1 ÷ (1 + ' + rr.toFixed(2) + ')');

      var label, hint, col;
      if (rr < 1) {
        label = '赔率倒挂'; hint = '目标空间还不到止损空间，这笔交易无论形态多好都不该做';
        col = 'var(--red)';
      } else if (rr < 2) {
        label = '赔率偏薄'; hint = '盈亏平衡胜率偏高，需要你的真实胜率明显高于它';
        col = 'var(--red)';
      } else if (rr < 4) {
        label = '赔率可接受'; hint = '盈亏平衡胜率处于常见区间，可进入下一步核查事件序列';
        col = 'var(--amber)';
      } else {
        label = '赔率充裕'; hint = '止损空间相对目标空间很小，容错空间充足';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }

    [cEl, bEl, rEl, lEl, sEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 努力与结果
     效率 e = 波幅比 ÷ 量比；相同信号在区间底/顶含义相反
     ══════════════════════════════════════════════════════════ */
  (function effortResult() {
    var vEl = $('er_vol'), sEl = $('er_spread'), pEl = $('er_pos');
    if (!vEl || !sEl || !pEl) return;
    var vO = $('er_volO'), sO = $('er_spreadO'), pO = $('er_posO');
    var eEl = $('er_e'), eHEl = $('er_eh');
    var qEl = $('er_q'), qHEl = $('er_qh');
    var rdEl = $('er_read'), rdHEl = $('er_readh');
    var vvEl = $('er_v'), vvhEl = $('er_vh');

    function upd() {
      var v = parseFloat(vEl.value);
      var s = parseFloat(sEl.value);
      var pos = parseFloat(pEl.value);

      txt(vO, v.toFixed(1) + '×');
      txt(sO, s.toFixed(1) + '×');
      txt(pO, pos.toFixed(0) + '%（' +
          (pos < 33 ? '近底部' : (pos > 67 ? '近顶部' : '区间中段')) + '）');

      var e = s / v;
      txt(eEl, e.toFixed(2));
      txt(eHEl, '波幅比 ' + s.toFixed(1) + ' ÷ 量比 ' + v.toFixed(1) +
                (e < 1 ? ' → 结果小于努力' : (e > 1 ? ' → 结果大于努力' : ' → 努力与结果相当')));
      tint(eEl, e < 0.7 ? 'var(--red)' : (e > 1.4 ? 'var(--green)' : ''));

      // 量价四象限
      var q, qh;
      if (v > 1 && s < 1) { q = '吸收'; qh = '大努力 / 小结果 —— 有对手盘在吃'; }
      else if (v > 1 && s >= 1) { q = '推进'; qh = '大努力 / 大结果 —— 方向已明'; }
      else if (v <= 1 && s > 1) { q = '滑行'; qh = '小努力 / 大结果 —— 无人挡路'; }
      else { q = '沉寂'; qh = '小努力 / 小结果 —— 无人关注'; }
      txt(qEl, q); txt(qHEl, qh);

      // 位置修正
      var rd, rdh, verdict, vh, col;
      var isBottom = pos < 33, isTop = pos > 67;
      if (q === '吸收') {
        if (isBottom) { rd = '吸筹嫌疑'; rdh = '区间底部的吸收 = 恐慌盘被接走'; }
        else if (isTop) { rd = '派发嫌疑'; rdh = '区间顶部的吸收 = 买盘被喂给派发方'; }
        else { rd = '中继换手'; rdh = '区间中段的吸收 = 换手，方向未定'; }
      } else if (q === '滑行') {
        if (isBottom) { rd = '供应枯竭'; rdh = '小幅波动即能上行 = 卖压很薄'; }
        else if (isTop) { rd = '谨慎对待'; rdh = '高位缩量新高 = 可能无人接盘，也可能是伪装'; }
        else { rd = '无阻力推进'; rdh = '轻量上行 = 趋势健康但缺少确认'; }
      } else if (q === '推进') {
        rd = isTop ? '放量冲顶' : (isBottom ? '放量止跌' : '趋势推进');
        rdh = isTop ? '高位放量 = 需警惕高潮式派发'
                    : (isBottom ? '低位放量 = 恐慌高潮，可能是 SC' : '量价同步，方向有效');
      } else {
        rd = '无信号'; rdh = '量价双低 = 本轮数据不提供判断依据';
      }
      txt(rdEl, rd); txt(rdHEl, rdh);

      if (q === '吸收' && isBottom) { verdict = '偏多信号'; vh = '需 SOS 放量突破确认后才成立'; col = 'var(--green)'; }
      else if (q === '吸收' && isTop) { verdict = '偏空信号'; vh = '派发嫌疑，反弹即减仓'; col = 'var(--red)'; }
      else if (q === '滑行' && isBottom) { verdict = '偏多信号'; vh = '供应枯竭，但需成交量回升才算确认'; col = 'var(--green)'; }
      else if (q === '滑行' && isTop) { verdict = '中性偏空'; vh = '缩量新高在趋势末端是常见陷阱'; col = 'var(--amber)'; }
      else if (q === '推进' && isTop) { verdict = '中性偏空'; vh = '高位放量往往是交棒而不是起跑'; col = 'var(--amber)'; }
      else if (q === '推进') { verdict = '偏多信号'; vh = '量价同步，可作为趋势延续证据'; col = 'var(--green)'; }
      else { verdict = '无信号'; vh = '保持观察，不要从低信息量数据里编结论'; col = ''; }
      txt(vvEl, verdict); txt(vvhEl, vh); tint(vvEl, col);
    }

    [vEl, sEl, pEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 弹簧质量分
     深度分 = exp(−((d−2)/2.2)²)   最优 2%，过深即真破位
     速度分 = exp(−t/3)            越快收回越像洗盘
     量能分 = 1/(1+1.2·max(0,v−1)) 缩量才是洗盘
     ══════════════════════════════════════════════════════════ */
  (function springScore() {
    var dEl = $('sp_d'), tEl = $('sp_t'), vEl = $('sp_v');
    if (!dEl || !tEl || !vEl) return;
    var dO = $('sp_dO'), tO = $('sp_tO'), vO = $('sp_vO');
    var scEl = $('sp_score'), scHEl = $('sp_scoreh');
    var ptEl = $('sp_parts'), ptHEl = $('sp_partsh');
    var opEl = $('sp_opt'), opHEl = $('sp_opth');
    var vvEl = $('sp_v_v'), vvhEl = $('sp_v_vh');

    function upd() {
      var d = parseFloat(dEl.value);
      var t = parseFloat(tEl.value);
      var v = parseFloat(vEl.value);

      txt(dO, d.toFixed(1) + '%');
      txt(tO, t + ' 根');
      txt(vO, v.toFixed(1) + '×');

      var ds = Math.exp(-Math.pow((d - 2) / 2.2, 2));
      var rs = Math.exp(-t / 3);
      var vs = 1 / (1 + 1.2 * Math.max(0, v - 1));
      var score = 100 * (0.30 * ds + 0.35 * rs + 0.35 * vs);

      txt(scEl, score.toFixed(1));
      tint(scEl, score >= 75 ? 'var(--green)'
                  : (score >= 55 ? '' : (score >= 35 ? 'var(--amber)' : 'var(--red)')));
      txt(scHEl, '深度 30% ＋ 速度 35% ＋ 量能 35%');
      txt(ptEl, ds.toFixed(2) + ' / ' + rs.toFixed(2) + ' / ' + vs.toFixed(2));
      txt(ptHEl, '深度分 / 速度分 / 量能分');

      // 深度诊断
      var optTxt, optHint;
      if (d < 1) { optTxt = '偏浅'; optHint = '未有效触发止损簇，浮筹还在，洗盘不彻底'; }
      else if (d <= 3) { optTxt = '1%–3%'; optHint = '最优区间：刚刚够触发止损，又不构成有效破位'; }
      else if (d <= 6) { optTxt = '偏深'; optHint = '深度已超出洗盘范畴，更可能是真实破位的开始'; }
      else { optTxt = '过深'; optHint = '大概率不是 Spring，而是有效跌破，不要逆势接'; }
      txt(opEl, optTxt); txt(opHEl, optHint);

      var label, hint, col;
      if (score >= 75) { label = '高质量弹簧'; hint = '三因子均健康，等待 SOS 放量突破后介入'; col = 'var(--green)'; }
      else if (score >= 55) { label = '可接受'; hint = '有明显短板，需额外确认（如 SOS 量比 > 1.5）'; col = 'var(--amber)'; }
      else if (score >= 35) { label = '质量偏低'; hint = '更可能是噪声或真实破位，建议放弃'; col = 'var(--amber)'; }
      else { label = '高失败风险'; hint = '这个"假跌破"大概率是真跌破，不做'; col = 'var(--red)'; }
      txt(vvEl, label); txt(vvhEl, hint); tint(vvEl, col);
    }

    [dEl, tEl, vEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

})();
