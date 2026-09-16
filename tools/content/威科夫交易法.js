/* ============================================================
   《威科夫交易法》主题脚本
   四个可调模型：
     1. 五步法通关器   — 五步加权得分与放行阈值
     2. 三态仓位上限   — 区间/拉升/下跌三态下的风险预算
     3. 入场路径期望   — Spring / LPS / SOS 追价 摩擦后期望值
     4. 仓位计算器     — 账户 × 风险% ÷ 每股风险 → 股数
   自包含 IIFE，与页面通用脚本隔离。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  /* ══════════════════════════════════════════════════════════
     工具 1 · 五步法通关器
     权重：趋势 25% · 相对强度 20% · 因果 20% · 赔率 20% · 止损 15%
     放行阈值：加权分 ≥ 3.5 且五步均 ≥ 2
     ══════════════════════════════════════════════════════════ */
  (function fiveStep() {
    var ids = ['wt_t', 'wt_rs', 'wt_c', 'wt_rr', 'wt_st'];
    var els = ids.map($);
    if (els.some(function (e) { return !e; })) return;
    var outs = ['wt_tO', 'wt_rsO', 'wt_cO', 'wt_rrO', 'wt_stO'].map($);
    var scEl = $('wt_score'), scHEl = $('wt_scoreh');
    var vEl = $('wt_v'), vhEl = $('wt_vh');
    var cv = $('wtChart');
    var ctx = cv ? cv.getContext('2d') : null;
    var W = [0.25, 0.20, 0.20, 0.20, 0.15];
    var labels = ['趋势', '相对强度', '因果', '赔率', '止损'];

    function draw(scores, total) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 72, r: 24, t: 28, b: 46 };
      var bw = w - pad.l - pad.r;
      var y1 = h - pad.b;
      var barH = 22, gap = 8;
      ctx.font = '11px -apple-system,sans-serif';

      // 放行线 3.5
      var x35 = pad.l + 3.5 / 5 * bw;
      ctx.strokeStyle = '#0f8a4d';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x35, pad.t - 4);
      ctx.lineTo(x35, y1 + 6);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#0f8a4d';
      ctx.textAlign = 'center';
      ctx.fillText('放行 3.5', x35, pad.t - 10);

      scores.forEach(function (s, i) {
        var y = pad.t + i * (barH + gap);
        ctx.fillStyle = '#454c56';
        ctx.textAlign = 'right';
        ctx.fillText(labels[i], pad.l - 10, y + 15);
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pad.l, y, bw, barH);
        var col = s < 2 ? '#d5342c' : (s >= 4 ? '#0f8a4d' : '#8a6d1f');
        ctx.fillStyle = col;
        ctx.fillRect(pad.l, y, s / 5 * bw, barH);
        ctx.fillStyle = col;
        ctx.textAlign = 'left';
        ctx.font = '700 11px -apple-system,sans-serif';
        ctx.fillText(s.toFixed(0), pad.l + s / 5 * bw + 6, y + 15);
        ctx.font = '11px -apple-system,sans-serif';
      });

      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      [0, 1, 2, 3, 4, 5].forEach(function (g) {
        ctx.fillText(String(g), pad.l + g / 5 * bw, y1 + 13);
      });
      ctx.fillStyle = '#454c56';
      ctx.font = '10.5px -apple-system,sans-serif';
      ctx.fillText('单项得分（0–5）', pad.l + bw / 2, y1 + 31);
    }

    function upd() {
      var scores = els.map(function (el) { return parseFloat(el.value); });
      scores.forEach(function (s, i) { txt(outs[i], s.toFixed(0) + ' 分'); });
      var total = 0;
      W.forEach(function (w, i) { total += w * scores[i]; });
      var minS = Math.min.apply(null, scores);
      var pass = total >= 3.5 && minS >= 2;

      txt(scEl, total.toFixed(2));
      tint(scEl, pass ? 'var(--green)' : (total >= 3.0 ? 'var(--amber)' : 'var(--red)'));
      txt(scHEl, '加权总分 · 最低单项 ' + minS.toFixed(0));

      var label, hint, col;
      if (pass) {
        label = '可进入交易计划';
        hint = '五步均达标，下一步写证伪条件与仓位';
        col = 'var(--green)';
      } else if (minS < 2) {
        label = '单项否决';
        hint = '有单项 < 2 分，威科夫原意是「有一项不过关就不做」';
        col = 'var(--red)';
      } else if (total < 3.5) {
        label = '总分不足';
        hint = '加权分 < 3.5，赔率或因果可能撑不起这笔交易';
        col = 'var(--amber)';
      } else {
        label = '边缘';
        hint = '勉强过关，建议缩小仓位或等待更好设置';
        col = 'var(--amber)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(scores, total);
    }

    els.forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 三态仓位上限
     区间：风险预算 × probe 系数（默认 0.5）
     拉升：风险预算 × 1.0；下跌：0
     ══════════════════════════════════════════════════════════ */
  (function phaseCap() {
    var phEl = $('wt_ph'), rbEl = $('wt_rb'), prEl = $('wt_pr');
    if (!phEl || !rbEl || !prEl) return;
    var phO = $('wt_phO'), rbO = $('wt_rbO'), prO = $('wt_prO');
    var capEl = $('wt_cap'), capHEl = $('wt_caph');
    var pctEl = $('wt_pct'), pctHEl = $('wt_pcth');
    var vEl = $('wt_pv'), vhEl = $('wt_pvh');

    var phases = [
      { id: 'tr', name: '交易区间', mult: 0.5, hint: '试探仓：Spring 后小仓，LPS 前不加满' },
      { id: 'mu', name: '拉升段', mult: 1.0, hint: '标准风险预算：顺势持有，回踩加仓' },
      { id: 'md', name: '下跌段', mult: 0, hint: '多头风险预算归零；空头另计' }
    ];

    function upd() {
      var pi = parseInt(phEl.value, 10);
      var rb = parseFloat(rbEl.value) / 100;
      var probe = parseFloat(prEl.value) / 100;
      var ph = phases[pi];
      var mult = ph.id === 'tr' ? probe : ph.mult;
      var cap = rb * mult;

      txt(phO, ph.name);
      txt(rbO, (rb * 100).toFixed(1) + '%');
      txt(prO, (probe * 100).toFixed(0) + '%');
      txt(capEl, (cap * 100).toFixed(2) + '%');
      tint(capEl, cap <= 0 ? 'var(--red)' : (cap < rb * 0.6 ? 'var(--amber)' : 'var(--green)'));
      txt(capHEl, ph.hint);

      var acct = 100000;
      txt(pctEl, '¥' + Math.round(acct * cap).toLocaleString('en-US'));
      txt(pctHEl, '示例账户 ¥100,000 的本笔最大风险金额');

      var label, hint, col;
      if (ph.id === 'md') {
        label = '不做多头';
        hint = '下跌段的首要规则是保护资本，不是找底';
        col = 'var(--red)';
      } else if (ph.id === 'tr' && probe < 0.4) {
        label = '极保守试探';
        hint = '适合 Phase B 尚未出现 Spring 的阶段';
        col = 'var(--amber)';
      } else if (ph.id === 'tr') {
        label = '区间标准试探';
        hint = 'Spring 确认后可按此预算建仓，等 LPS 再加';
        col = '';
      } else {
        label = '拉升标准仓';
        hint = 'LPS 或突破回踩确认后，可用全额风险预算';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }

    phEl.addEventListener('input', upd);
    rbEl.addEventListener('input', upd);
    prEl.addEventListener('input', upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 入场路径期望
     E = p·W − (1−p)·L − 2·摩擦
     ══════════════════════════════════════════════════════════ */
  (function entryPath() {
    var typEl = $('wt_et');
    if (!typEl) return;
    var pEl = $('wt_ep'), wEl = $('wt_ew'), lEl = $('wt_el'), fEl = $('wt_ef');
    var typO = $('wt_etO'), pO = $('wt_epO'), wO = $('wt_ewO'), lO = $('wt_elO'), fO = $('wt_efO');
    var eEl = $('wt_ee'), eHEl = $('wt_eeh');
    var beEl = $('wt_be'), beHEl = $('wt_beh');
    var vEl = $('wt_ev'), vhEl = $('wt_evh');
    var cv = $('wtEChart');
    var ctx = cv ? cv.getContext('2d') : null;

    var presets = [
      { name: 'Spring 潜伏', p: 48, w: 12, l: 5, f: 0.10 },
      { name: 'LPS 回踩', p: 58, w: 9, l: 4, f: 0.05 },
      { name: 'SOS 追突破', p: 52, w: 7, l: 6, f: 0.20 }
    ];

    function draw(cur, all) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 108, r: 56, t: 30, b: 46 };
      var bw = w - pad.l - pad.r;
      var y1 = h - pad.b;
      var maxE = 0.05;
      all.forEach(function (a) { if (a.e > maxE) maxE = a.e; });
      maxE = Math.max(maxE, 0.04);

      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      for (var g = 0; g <= 4; g++) {
        var v = g * maxE / 4;
        var x = pad.l + v / maxE * bw;
        ctx.strokeStyle = '#eef1f5';
        ctx.beginPath(); ctx.moveTo(x, pad.t - 6); ctx.lineTo(x, y1); ctx.stroke();
        ctx.fillText((v * 100).toFixed(1) + '%', x, y1 + 13);
      }
      ctx.fillStyle = '#454c56';
      ctx.fillText('摩擦后期望值', pad.l + bw / 2, y1 + 31);

      var barH = 36, gap = 14;
      all.forEach(function (a, i) {
        var y = pad.t + 10 + i * (barH + gap);
        var col = a.name === cur.name ? '#1d4ed8' : '#8a6d1f';
        ctx.fillStyle = '#454c56';
        ctx.textAlign = 'right';
        ctx.fillText(a.name, pad.l - 10, y + 22);
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pad.l, y, bw, barH);
        ctx.fillStyle = a.e >= 0 ? '#0f8a4d' : '#d5342c';
        var bw2 = Math.max(0, a.e / maxE * bw);
        ctx.fillRect(pad.l, y, bw2, barH);
        ctx.fillStyle = col;
        ctx.textAlign = 'left';
        ctx.font = '700 11.5px -apple-system,sans-serif';
        var tx = pad.l + bw2 + 6;
        var lab = (a.e * 100).toFixed(2) + '%';
        var tw = ctx.measureText(lab).width;
        if (tx + tw > w - pad.r) { ctx.textAlign = 'right'; tx = w - pad.r; }
        ctx.fillText(lab, tx, y + 22);
        ctx.font = '11px -apple-system,sans-serif';
      });
    }

    function calc(p, w, l, f) {
      p /= 100; w /= 100; l /= 100; f /= 100;
      return p * w - (1 - p) * l - 2 * f;
    }

    function upd() {
      var pi = parseInt(typEl.value, 10);
      var pr = presets[pi];
      if (typEl.dataset.user !== '1') {
        pEl.value = pr.p; wEl.value = pr.w; lEl.value = pr.l; fEl.value = pr.f;
      }
      var p = parseFloat(pEl.value), w = parseFloat(wEl.value);
      var l = parseFloat(lEl.value), f = parseFloat(fEl.value);
      txt(typO, pr.name);
      txt(pO, p.toFixed(0) + '%');
      txt(wO, w.toFixed(1) + '%');
      txt(lO, l.toFixed(1) + '%');
      txt(fO, f.toFixed(2) + '%');

      var e = calc(p, w, l, f);
      var be = l / (w + l);
      txt(eEl, (e * 100).toFixed(2) + '%');
      tint(eEl, e >= 0.02 ? 'var(--green)' : (e >= 0 ? 'var(--amber)' : 'var(--red)'));
      txt(eHEl, 'E = p·W − (1−p)·L − 2×摩擦');

      txt(beEl, (be * 100).toFixed(1) + '%');
      txt(beHEl, '盈亏平衡胜率 = L ÷ (W+L)');

      var all = presets.map(function (x) {
        return { name: x.name, e: calc(x.p, x.w, x.l, x.f) };
      });
      var cur = { name: pr.name, e: e };

      var label, hint, col;
      if (e < 0) {
        label = '期望为负'; hint = '扣除摩擦后长期必亏，无论形态多漂亮';
        col = 'var(--red)';
      } else if (e < 0.01) {
        label = '边缘'; hint = '略正但极易被一次滑点抹平';
        col = 'var(--amber)';
      } else if (pi === 2) {
        label = '追价惩罚重'; hint = 'SOS 当日追入：胜率略高但赢幅小、摩擦大';
        col = 'var(--amber)';
      } else if (pi === 1) {
        label = '威科夫首选路径'; hint = 'LPS 回踩：胜率与赔率结构最均衡';
        col = 'var(--green)';
      } else {
        label = '高赔率低胜率'; hint = 'Spring 潜伏适合小仓试探，不宜重仓';
        col = '';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(cur, all);
    }

    typEl.addEventListener('input', function () { typEl.dataset.user = '0'; upd(); });
    [pEl, wEl, lEl, fEl].forEach(function (el) {
      el.addEventListener('input', function () { typEl.dataset.user = '1'; upd(); });
    });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 仓位计算器
     股数 = floor(账户 × 风险% ÷ (入场 − 止损))
     ══════════════════════════════════════════════════════════ */
  (function posCalc() {
    var aEl = $('wt_acct'), rEl = $('wt_risk'), eEl = $('wt_ent'), sEl = $('wt_stop');
    if (!aEl || !rEl || !eEl || !sEl) return;
    var aO = $('wt_acctO'), rO = $('wt_riskO'), eO = $('wt_entO'), sO = $('wt_stopO');
    var shEl = $('wt_sh'), shHEl = $('wt_shh');
    var pvEl = $('wt_pv2'), pvHEl = $('wt_pv2h');
    var raEl = $('wt_ra'), raHEl = $('wt_rah');
    var vEl = $('wt_sv'), vhEl = $('wt_svh');

    function upd() {
      var acct = parseFloat(aEl.value);
      var risk = parseFloat(rEl.value) / 100;
      var entry = parseFloat(eEl.value);
      var stop = parseFloat(sEl.value);

      txt(aO, '¥' + acct.toLocaleString('en-US'));
      txt(rO, (risk * 100).toFixed(1) + '%');
      txt(eO, '¥' + entry.toFixed(2));
      txt(sO, '¥' + stop.toFixed(2));

      var rps = entry - stop;
      var shares = rps > 0 ? Math.floor(acct * risk / rps) : 0;
      var posVal = shares * entry;
      var riskAmt = shares * rps;
      var posPct = acct > 0 ? posVal / acct : 0;

      txt(shEl, shares.toLocaleString('en-US') + ' 股');
      txt(shHEl, '每股风险 ¥' + (rps > 0 ? rps.toFixed(2) : '—'));

      txt(pvEl, '¥' + Math.round(posVal).toLocaleString('en-US'));
      txt(pvHEl, '占账户 ' + (posPct * 100).toFixed(1) + '%');

      txt(raEl, '¥' + Math.round(riskAmt).toLocaleString('en-US'));
      txt(raHEl, '实际风险 ' + (acct > 0 ? (riskAmt / acct * 100).toFixed(2) : '0') + '%');

      var label, hint, col;
      if (rps <= 0) {
        label = '止损无效'; hint = '止损必须低于入场价';
        col = 'var(--red)';
      } else if (posPct > 0.35) {
        label = '仓位过重'; hint = '单笔暴露 > 35%，止损太近或账户风险% 设太高';
        col = 'var(--red)';
      } else if (posPct > 0.25) {
        label = '偏高'; hint = '建议检查止损是否过紧，或降低风险%';
        col = 'var(--amber)';
      } else {
        label = '结构合理'; hint = '仓位由止损距离反推，而非由「信心」决定';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }

    [aEl, rEl, eEl, sEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

})();
