/* ============================================================
   《安妮·杜克的决策科学》主题脚本
   四个可调模型（滑块全部真实参与计算）：
     A 四象限结果机   — r = q + ε，看结果能携带多少决策信息
     B 校准器         — 公平赔率下的对赌期望值，暴露过度自信
     C 沉没成本剥离器 — 已投入不进入任何公式
     D 停损时点模拟器 — Δ(t) 穿零线的时点 vs 情绪退出时点
   自包含 IIFE，与页面通用脚本隔离。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }
  function fmt(n) { return n.toLocaleString('en-US'); }

  var INK = '#15181d', INK2 = '#454c56', INK3 = '#7c848f',
      LINE = '#eef1f5', BLUE = '#1d4ed8', GREEN = '#0f8a4d',
      RED = '#d5342c', AMBER = '#a06800', PURPLE = '#6b3fa0';

  /* 标准正态 CDF，Abramowitz & Stegun 7.1.26，|误差| < 7.5e-8 */
  function ncdf(x) {
    var s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2;
    var t = 1 / (1 + 0.3275911 * z);
    var y = 1 - (t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 +
            t * (-1.453152027 + t * 1.061405429))))) * Math.exp(-z * z);
    return 0.5 * (1 + s * y);
  }

  /* 为 canvas 准备按 DPR 缩放的绘图上下文 */
  function prep(cv, h) {
    if (!cv) return null;
    var dpr = window.devicePixelRatio || 1;
    var w = cv.clientWidth || 600;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return { ctx: ctx, w: w, h: h };
  }

  /* 横向条形（从 x0 向右/向左画） */
  function bar(ctx, x0, y, len, h, col) {
    ctx.fillStyle = col;
    ctx.fillRect(Math.min(x0, x0 + len), y, Math.abs(len), h);
  }

  /* ══════════════════════════════════════════════════════════
     工具 A · 四象限结果机
     单次结果 r = q + ε，ε ~ N(0, σ)
     P(好结果) = Φ((q − 50)/σ)
     P(单次胜出) = Φ(gap / (σ√2))
     识别差距所需样本 n = 2σ²(z_{0.975}+z_{0.8})² / gap²
     ══════════════════════════════════════════════════════════ */
  (function quadMachine() {
    var qEl = $('adq_q'), gEl = $('adq_gap'), sEl = $('adq_sig');
    if (!qEl || !gEl || !sEl) return;
    var qO = $('adq_qO'), gO = $('adq_gapO'), sO = $('adq_sigO');
    var pgEl = $('adq_pgood'), pgHEl = $('adq_pgoodh');
    var pwEl = $('adq_pwin'), pwHEl = $('adq_pwinh');
    var nEl = $('adq_n'), nHEl = $('adq_nh');
    var vEl = $('adq_v'), vhEl = $('adq_vh');
    var cv = $('adqChart');
    var H = 200;

    function draw(pg, pw) {
      var c = prep(cv, H);
      if (!c) return;
      var ctx = c.ctx, w = c.w;
      var pl = 132, pr = 74, top = 40, bh = 30;
      var bw = w - pl - pr;
      var sx = function (p) { return pl + Math.max(0, Math.min(1, p)) * bw; };

      // 0/50/100 刻度
      ctx.font = '10.5px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      [0, 0.25, 0.5, 0.75, 1].forEach(function (g) {
        var x = sx(g);
        ctx.strokeStyle = g === 0.5 ? '#c9d0d9' : LINE;
        ctx.lineWidth = g === 0.5 ? 1.4 : 1;
        ctx.beginPath(); ctx.moveTo(x, top - 8); ctx.lineTo(x, top + bh * 2 + 22); ctx.stroke();
        ctx.fillStyle = INK3;
        ctx.fillText((g * 100) + '%', x, top + bh * 2 + 36);
      });
      ctx.fillStyle = RED; ctx.textAlign = 'left';
      ctx.fillText('50% 好坏结果分界', sx(0.5) + 5, top - 12);

      var rows = [
        { label: '单次拿到好结果', p: pg, col: BLUE },
        { label: '单次赢过对手', p: pw, col: PURPLE }
      ];
      rows.forEach(function (r, i) {
        var y = top + i * (bh + 26);
        ctx.fillStyle = INK2;
        ctx.textAlign = 'right';
        ctx.font = '12px -apple-system,sans-serif';
        ctx.fillText(r.label, pl - 12, y + bh / 2 + 4);
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pl, y, bw, bh);
        bar(ctx, pl, y, sx(r.p) - pl, bh, r.col);
        ctx.fillStyle = r.col;
        ctx.textAlign = 'left';
        ctx.font = '700 12.5px -apple-system,sans-serif';
        ctx.fillText((r.p * 100).toFixed(1) + '%', sx(r.p) + 8, y + bh / 2 + 5);
      });

      ctx.fillStyle = INK3;
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('条形越短 = 从这个结果里能读出的"水平"越少', pl, top + bh * 2 + 62);
    }

    function upd() {
      var q = parseFloat(qEl.value), gap = parseFloat(gEl.value), sig = parseFloat(sEl.value);
      txt(qO, q + ' 分'); txt(gO, gap + ' 分'); txt(sO, sig + ' 分');

      var pg = ncdf((q - 50) / sig);
      var pw = ncdf(gap / (sig * Math.SQRT2));
      var n = Math.ceil(2 * sig * sig * Math.pow(1.96 + 0.84, 2) / (gap * gap));
      n = Math.max(1, n);

      txt(pgEl, (pg * 100).toFixed(1) + '%');
      tint(pgEl, pg >= 0.8 ? GREEN : (pg >= 0.6 ? AMBER : RED));
      txt(pgHEl, '约每 ' + (1 / (1 - pg)).toFixed(1) + ' 次里有 1 次好决策显示成坏结果');

      txt(pwEl, (pw * 100).toFixed(1) + '%');
      tint(pwEl, pw >= 0.75 ? GREEN : (pw >= 0.6 ? AMBER : RED));
      txt(pwHEl, pw >= 0.75 ? '差距大到单次也看得出来' : '真实更强，单次未必赢');

      txt(nEl, n > 200000 ? '> 20 万' : fmt(n));
      tint(nEl, n <= 30 ? GREEN : (n <= 300 ? AMBER : RED));
      txt(nHEl, n > 200000 ? '这个差距在可预见的时间内无法分辨'
                           : '双侧 5%、检验力 80% 所需独立观测');

      var label, hint, col;
      if (pw >= 0.75) {
        label = '结果可信区'; col = GREEN;
        hint = '运气波动相对差距很小，单次结果已经能说明问题';
      } else if (pw >= 0.6) {
        label = '半信区'; col = AMBER;
        hint = '要几十到几百次才能看清差距，单次输赢不能下结论';
      } else {
        label = '运气主导区'; col = RED;
        hint = '单次结果几乎无法区分好坏决策，用结果评判决策等于抛硬币';
      }
      if (n > 1000) { col = RED; label = '结果无信息'; hint = '所需样本量已超出可承受范围，只能靠过程评判'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(pg, pw);
    }

    [qEl, gEl, sEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 B · 校准器
     声明置信度 c → 公平赔率 = 押 1 赢 (1−c)/c
     实际正确率 a → 期望收益 EV = a·(1−c)/c − (1−a)
     校准缺口 gap = c − a
     ══════════════════════════════════════════════════════════ */
  (function calibrator() {
    var cEl = $('adc_c'), aEl = $('adc_a'), nEl = $('adc_n');
    if (!cEl || !aEl || !nEl) return;
    var cO = $('adc_cO'), aO = $('adc_aO'), nO = $('adc_nO');
    var gapEl = $('adc_gap'), gapHEl = $('adc_gaph');
    var evEl = $('adc_ev'), evHEl = $('adc_evh');
    var msEl = $('adc_miss'), msHEl = $('adc_missh');
    var vEl = $('adc_v'), vhEl = $('adc_vh');
    var cv = $('adcChart');
    var H = 200;

    function draw(c, a) {
      var g = prep(cv, H);
      if (!g) return;
      var ctx = g.ctx, w = g.w;
      var pl = 44, pr = 26, top = 26, pb = 34;
      var bw = w - pl - pr, bh = H - top - pb;
      var x0 = 50, x1 = 100, y0 = 40, y1 = 100;
      var sx = function (v) { return pl + (v - x0) / (x1 - x0) * bw; };
      var sy = function (v) { return top + bh - (v - y0) / (y1 - y0) * bh; };

      // 网格
      ctx.font = '10px -apple-system,sans-serif';
      ctx.strokeStyle = LINE; ctx.lineWidth = 1;
      [60, 70, 80, 90, 100].forEach(function (v) {
        ctx.beginPath(); ctx.moveTo(sx(v), top); ctx.lineTo(sx(v), top + bh); ctx.stroke();
        ctx.fillStyle = INK3; ctx.textAlign = 'center';
        ctx.fillText(v + '%', sx(v), top + bh + 15);
      });
      [50, 60, 70, 80, 90].forEach(function (v) {
        if (v < y0 || v > y1) return;
        ctx.beginPath(); ctx.moveTo(pl, sy(v)); ctx.lineTo(pl + bw, sy(v)); ctx.stroke();
        ctx.fillStyle = INK3; ctx.textAlign = 'right';
        ctx.fillText(v + '%', pl - 6, sy(v) + 3.5);
      });

      // 完美校准线
      ctx.strokeStyle = '#c9d0d9'; ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(sx(50), sy(50)); ctx.lineTo(sx(100), sy(100)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = INK3; ctx.textAlign = 'left'; ctx.font = '10.5px -apple-system,sans-serif';
      ctx.fillText('完美校准线', sx(88), sy(96) - 6);

      // 缺口竖线
      if (Math.abs(c - a) > 0.4) {
        ctx.strokeStyle = c > a ? RED : AMBER; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(sx(c), sy(c)); ctx.lineTo(sx(c), sy(a)); ctx.stroke();
      }
      // 你的点
      ctx.fillStyle = c > a ? RED : (c < a - 4 ? AMBER : GREEN);
      ctx.beginPath(); ctx.arc(sx(c), sy(a), 5.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = INK2; ctx.textAlign = 'left';
      ctx.font = '700 11.5px -apple-system,sans-serif';
      ctx.fillText('你在这里', sx(c) + 9, sy(a) + 4);

      ctx.fillStyle = INK3; ctx.textAlign = 'left';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('横轴：你说出的置信度　纵轴：实际发生的频率', pl, top + bh + 30);
    }

    function upd() {
      var c = parseFloat(cEl.value) / 100, a = parseFloat(aEl.value) / 100, n = parseFloat(nEl.value);
      txt(cO, (c * 100).toFixed(0) + '%');
      txt(aO, (a * 100).toFixed(0) + '%');
      txt(nO, fmt(n) + ' 次');

      var gap = (c - a) * 100;
      var odds = (1 - c) / c;                     // 押 1 赢 odds
      var ev = a * odds - (1 - a);
      var miss = Math.max(0, Math.round(n * (c - a)));

      txt(gapEl, (gap >= 0 ? '+' : '') + gap.toFixed(0) + ' pp');
      tint(gapEl, gap > 10 ? RED : (gap > 3 ? AMBER : (gap < -5 ? BLUE : GREEN)));
      txt(gapHEl, gap > 10 ? '明显过度自信' : (gap < -5 ? '过度保守：你比自己以为的准' : '差距不大'));

      txt(evEl, (ev >= 0 ? '+' : '') + ev.toFixed(2));
      tint(evEl, ev >= 0 ? GREEN : RED);
      txt(evHEl, '公平赔率 ' + (1 / odds).toFixed(2) + ':1，押 1 单位');

      txt(msEl, fmt(miss) + ' 次');
      tint(msEl, miss === 0 ? GREEN : (miss <= n * 0.1 ? AMBER : RED));
      txt(msHEl, '在 ' + fmt(n) + ' 次"很确定"里，实际会错这么多次');

      var label, hint, col;
      if (gap > 10) {
        label = '过度自信'; col = RED;
        hint = '你的报价高于你的胜率——有人愿意接单，长期就是你亏';
      } else if (gap > 3) {
        label = '轻度过度自信'; col = AMBER;
        hint = '缺口不大，但足以让对赌的期望值变负';
      } else if (gap < -5) {
        label = '校准偏保守'; col = BLUE;
        hint = '你低估了自己：代价是错过本来该下注的机会';
      } else {
        label = '校准良好'; col = GREEN;
        hint = '你的自信与真实准确率大致匹配，可以做决定';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(c * 100, a * 100);
    }

    [cEl, aEl, nEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 C · 沉没成本剥离器
     继续 EV = p × 回报 − 月成本 × 月数
     退出 EV = 替代月期望 × 月数
     已投入 s 不进入任何一个公式
     ══════════════════════════════════════════════════════════ */
  (function sunkStripper() {
    var sEl = $('ads_s'), cEl = $('ads_c'), mEl = $('ads_m');
    var pEl = $('ads_p'), rEl = $('ads_r'), aEl = $('ads_alt');
    if (!sEl || !cEl || !mEl || !pEl || !rEl || !aEl) return;
    var sO = $('ads_sO'), cO = $('ads_cO'), mO = $('ads_mO');
    var pO = $('ads_pO'), rO = $('ads_rO'), aO = $('ads_altO');
    var goEl = $('ads_go'), goHEl = $('ads_goh');
    var quEl = $('ads_quit'), quHEl = $('ads_quith');
    var dfEl = $('ads_diff'), dfHEl = $('ads_diffh');
    var vEl = $('ads_v'), vhEl = $('ads_vh');
    var cv = $('adsChart');
    var H = 200;

    function draw(go, quit, sunk) {
      var g = prep(cv, H);
      if (!g) return;
      var ctx = g.ctx, w = g.w;
      var pl = 118, pr = 112, top = 40, bh = 30;
      var bw = w - pl - pr;
      var mx = Math.max(Math.abs(go), Math.abs(quit), 1) * 1.12;
      // 0 点落在靠左 34% 处，负值向左伸展
      var negRoom = bw * 0.34;
      var zero = pl + negRoom;
      var sx = function (v) {
        return zero + v / mx * (v >= 0 ? (pl + bw - zero) : negRoom);
      };

      // 0 轴
      ctx.strokeStyle = '#c9d0d9'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(zero, top - 8); ctx.lineTo(zero, top + bh * 2 + 20); ctx.stroke();
      ctx.fillStyle = INK3; ctx.font = '10.5px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('0', zero, top + bh * 2 + 34);

      var rows = [
        { label: '继续做下去', v: go, col: go >= 0 ? GREEN : RED },
        { label: '现在退出', v: quit, col: quit >= 0 ? GREEN : RED }
      ];
      rows.forEach(function (rr, i) {
        var y = top + i * (bh + 26);
        ctx.fillStyle = INK2;
        ctx.textAlign = 'right';
        ctx.font = '12px -apple-system,sans-serif';
        ctx.fillText(rr.label, pl - 12, y + bh / 2 + 4);
        bar(ctx, zero, y, sx(rr.v) - zero, bh, rr.col);
        var lab = (rr.v >= 0 ? '+' : '') + rr.v.toFixed(0) + ' 万';
        ctx.font = '700 12.5px -apple-system,sans-serif';
        var lw = ctx.measureText(lab).width;
        if (rr.v >= 0) {
          ctx.fillStyle = rr.col; ctx.textAlign = 'left';
          ctx.fillText(lab, Math.min(sx(rr.v) + 8, w - lw - 6), y + bh / 2 + 5);
        } else {
          ctx.fillStyle = rr.col; ctx.textAlign = 'right';
          ctx.fillText(lab, Math.max(sx(rr.v) - 8, lw + 6), y + bh / 2 + 5);
        }
      });

      // 沉没成本提示条（灰色、斜纹感）
      var ys = top + bh * 2 + 46;
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pl, ys, w - pl - pr, 22);
      ctx.strokeStyle = '#d9dee6'; ctx.lineWidth = 1;
      ctx.strokeRect(pl + 0.5, ys + 0.5, w - pl - pr - 1, 21);
      ctx.fillStyle = INK3; ctx.textAlign = 'left';
      ctx.font = '11.5px -apple-system,sans-serif';
      ctx.fillText('已投入 ' + sunk + ' 万 —— 不参与上面任何一条的计算', pl + 10, ys + 15);
    }

    function upd() {
      var s = parseFloat(sEl.value), c = parseFloat(cEl.value), m = parseFloat(mEl.value);
      var p = parseFloat(pEl.value) / 100, r = parseFloat(rEl.value), alt = parseFloat(aEl.value);

      txt(sO, fmt(s) + ' 万'); txt(cO, c + ' 万/月'); txt(mO, m + ' 个月');
      txt(pO, (p * 100).toFixed(0) + '%'); txt(rO, fmt(r) + ' 万'); txt(aO, alt + ' 万/月');

      var go = p * r - c * m;
      var quit = alt * m;
      var diff = quit - go;

      txt(goEl, (go >= 0 ? '+' : '') + go.toFixed(0) + ' 万');
      tint(goEl, go >= 0 ? GREEN : RED);
      txt(goHEl, '胜率 × 回报 − 未来 ' + m + ' 个月投入');

      txt(quEl, (quit >= 0 ? '+' : '') + quit.toFixed(0) + ' 万');
      tint(quEl, quit >= 0 ? GREEN : RED);
      txt(quHEl, alt + ' 万/月 × ' + m + ' 个月');

      txt(dfEl, (diff >= 0 ? '+' : '') + diff.toFixed(0) + ' 万');
      tint(dfEl, diff > 0 ? RED : (diff < 0 ? GREEN : INK));
      txt(dfHEl, diff > 0 ? '退出比继续多出的期望值' : '继续比退出多出的期望值');

      var label, hint, col;
      if (diff > 0) {
        label = '应当退出'; col = RED;
        hint = '继续的期望值更低——把它改成"今天从零开始"再问一次';
      } else if (diff > -Math.max(30, Math.abs(go) * 0.1)) {
        label = '接近无差异'; col = AMBER;
        hint = '两条路差不多时倾向于退出：拖延的成本是非对称的';
      } else {
        label = '继续更优'; col = GREEN;
        hint = '数字支持继续，但请确认概率用的是外部视角';
      }
      if (go < 0 && quit < 0) { label = '两个都差'; col = AMBER; hint = '两边都是负期望——找第三条路'; }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(go, quit, fmt(s));
    }

    [sEl, cEl, mEl, pEl, rEl, aEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 D · 停损时点模拟器
     p(t) = max(0, p₀ − d·t)
     Δ(t) = p(t) × 回报 − (月成本 + 替代月期望) × t
     t* = Δ(t) 保持为正的最后一个时点
     ══════════════════════════════════════════════════════════ */
  (function stopLossTimer() {
    var pEl = $('adt_p0'), dEl = $('adt_d'), cEl = $('adt_c');
    var rEl = $('adt_r'), aEl = $('adt_a'), lEl = $('adt_lag');
    if (!pEl || !dEl || !cEl || !rEl || !aEl || !lEl) return;
    var pO = $('adt_p0O'), dO = $('adt_dO'), cO = $('adt_cO');
    var rO = $('adt_rO'), aO = $('adt_aO'), lO = $('adt_lagO');
    var tEl = $('adt_t'), tHEl = $('adt_th');
    var eEl = $('adt_emo'), eHEl = $('adt_emoh');
    var kEl = $('adt_cost'), kHEl = $('adt_costh');
    var vEl = $('adt_v'), vhEl = $('adt_vh');
    var cv = $('adtChart');
    var H = 210;

    function delta(t, p0, d, c, r, a) {
      var p = Math.max(0, p0 - d * t);
      return p * r - (c + a) * t;
    }

    function draw(p0, d, c, r, a, ts, emo) {
      var g = prep(cv, H);
      if (!g) return;
      var ctx = g.ctx, w = g.w;
      var pl = 52, pr = 30, top = 30, pb = 36;
      var bw = w - pl - pr, bh = H - top - pb;
      // x 轴范围跟着情绪退出点走，避免关键区间被压扁
      var T = Math.min(36, Math.max(12, Math.ceil((Math.min(emo, 36) + 3) / 6) * 6));
      var sx = function (t) { return pl + t / T * bw; };

      var vals = [], lo = 0, hi = 0, i;
      for (i = 0; i <= 160; i++) {
        var t = i * T / 160;
        var v = delta(t, p0, d, c, r, a);
        vals.push([t, v]);
        if (v < lo) lo = v;
        if (v > hi) hi = v;
      }
      var pad = (hi - lo) * 0.12 || 1;
      lo -= pad; hi += pad;
      var sy = function (v) { return top + bh - (v - lo) / (hi - lo) * bh; };

      // 网格
      ctx.font = '10px -apple-system,sans-serif';
      ctx.strokeStyle = LINE; ctx.lineWidth = 1;
      for (i = 0; i <= 6; i++) {
        var tt = i * T / 6;
        ctx.beginPath(); ctx.moveTo(sx(tt), top); ctx.lineTo(sx(tt), top + bh); ctx.stroke();
        ctx.fillStyle = INK3; ctx.textAlign = 'center';
        ctx.fillText(tt + '月', sx(tt), top + bh + 15);
      }
      ctx.strokeStyle = '#c9d0d9'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(pl, sy(0)); ctx.lineTo(pl + bw, sy(0)); ctx.stroke();
      ctx.fillStyle = INK3; ctx.textAlign = 'right';
      ctx.fillText('0', pl - 5, sy(0) + 3.5);

      // 拖延区阴影
      var xa = sx(Math.min(ts, T)), xb = sx(Math.min(emo, T));
      if (xb > xa) {
        ctx.fillStyle = 'rgba(213,52,44,.08)';
        ctx.fillRect(xa, top, xb - xa, bh);
      }

      // Δ(t) 曲线
      ctx.strokeStyle = BLUE; ctx.lineWidth = 2;
      ctx.beginPath();
      vals.forEach(function (p, k) {
        var X = sx(p[0]), Y = sy(p[1]);
        if (k === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      });
      ctx.stroke();

      // t* 与情绪时点
      function marker(t, col, label, up) {
        if (t > T) return;
        var X = sx(t);
        ctx.strokeStyle = col; ctx.lineWidth = 1.6;
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(X, top - 4); ctx.lineTo(X, top + bh); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = col; ctx.textAlign = 'center';
        ctx.font = '700 11px -apple-system,sans-serif';
        ctx.fillText(label, X, up ? top - 9 : top + bh - 6);
      }
      marker(ts, GREEN, '理性退出 ' + ts.toFixed(1) + ' 月', true);
      if (emo > ts) marker(emo, RED, '感觉可以退 ' + emo.toFixed(1) + ' 月', false);

      ctx.fillStyle = INK3; ctx.textAlign = 'right';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('纵轴：继续 EV − 退出 EV（万元）', pl + bw, top - 10);
    }

    function upd() {
      var p0 = parseFloat(pEl.value) / 100, d = parseFloat(dEl.value) / 100;
      var c = parseFloat(cEl.value), r = parseFloat(rEl.value);
      var a = parseFloat(aEl.value), lag = parseFloat(lEl.value);

      txt(pO, (p0 * 100).toFixed(0) + '%');
      txt(dO, (d * 100).toFixed(1) + ' pp/月');
      txt(cO, c + ' 万/月');
      txt(rO, fmt(r) + ' 万');
      txt(aO, a + ' 万/月');
      txt(lO, lag + ' 个月');

      // 解析求解 t*：Δ(t) = p₀R − (dR + C + A)·t = 0
      var dR = d * r;
      var denom = dR + c + a;
      var ts = denom > 0 ? (p0 * r) / denom : 0;
      if (d > 0) ts = Math.min(ts, p0 / d);      // 成功率归零之后必然为负
      ts = Math.max(0, Math.min(ts, 36));
      var emo = ts + lag;
      var cost = lag * (c + a);

      txt(tEl, ts.toFixed(1) + ' 月');
      tint(tEl, ts === 0 ? RED : GREEN);
      txt(tHEl, ts === 0 ? '现在已经不该继续了' : 'Δ(t) 穿过零线的时刻');

      txt(eEl, emo.toFixed(1) + ' 月');
      tint(eEl, lag === 0 ? GREEN : RED);
      txt(eHEl, lag === 0 ? '你完全是按数字走的' : '叠加 ' + lag + ' 个月的情绪滞后');

      txt(kEl, cost.toFixed(0) + ' 万');
      tint(kEl, cost === 0 ? GREEN : (cost > 100 ? RED : AMBER));
      txt(kHEl, lag + ' 个月 × (' + c + ' + ' + a + ') 万/月');

      var label, hint, col;
      if (ts <= 0) {
        label = '已过理性退出点'; col = RED;
        hint = '每多留一个月都在减少期望值——条件是现在就开始准备资源去向';
      } else if (lag >= 6) {
        label = '拖延成本很高'; col = AMBER;
        hint = '现在写下退场条件，就等于把这 ' + cost.toFixed(0) + ' 万买回来';
      } else {
        label = '仍在窗口内'; col = GREEN;
        hint = '还有 ' + ts.toFixed(1) + ' 个月的合理继续期，现在正好写退场条件';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);

      draw(p0, d, c, r, a, ts, emo);
    }

    [pEl, dEl, cEl, rEl, aEl, lEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

})();
