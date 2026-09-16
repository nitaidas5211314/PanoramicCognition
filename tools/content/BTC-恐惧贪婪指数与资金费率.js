/* ============================================================
   《BTC-恐惧贪婪指数与资金费率》主题脚本
   四个可调模型：
     1. F&G 分量合成器    — 五分量加权 → 0–100 指数
     2. 资金费率累计算器  — 仓位 × 费率 × 期数 → 成本/收入
     3. 漂移剥离器        — 极端恐惧反弹胜率 vs 随机持币基准
     4. 极端共振判定器    — F&G + funding z → 反向信号质量
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

  /* ══ 工具 1 · F&G 分量合成器 ══
     权重：波动25% 动量25% 社交15% 主导10% 搜索10%（调查15%已暂停） */
  (function fgSynth() {
    var volEl = $('fg_vol'), momEl = $('fg_mom'), socEl = $('fg_soc');
    var domEl = $('fg_dom'), trendEl = $('fg_trend');
    /* 默认分量 → 合成 ≈23（极度恐惧区） */
    if (!volEl || !momEl || !socEl || !domEl || !trendEl) return;
    var volO = $('fg_volO'), momO = $('fg_momO'), socO = $('fg_socO');
    var domO = $('fg_domO'), trendO = $('fg_trendO');
    var idxEl = $('fg_index'), idxHEl = $('fg_indexh');
    var zoneEl = $('fg_zone'), zoneHEl = $('fg_zoneh');
    var vEl = $('fg_v'), vhEl = $('fg_vh');
    var cv = $('fgChart');
    var W = [0.25, 0.25, 0.15, 0.10, 0.10];

    function zone(s) {
      if (s <= 24) return { t: '极度恐惧', c: '#0f8a4d', h: '0–24 · 反向叙事常在此激活', v: '情绪温度计偏冷', vh: '须配 funding 与链上' };
      if (s <= 49) return { t: '恐惧', c: '#454c56', h: '25–49 · 偏弱但未极端', v: '观察分量来源', vh: '波动驱动 vs 社交驱动' };
      if (s <= 74) return { t: '贪婪', c: '#b8730a', h: '50–74 · 偏热', v: '顺周期情绪', vh: '勿单独做空' };
      return { t: '极度贪婪', c: '#d5342c', h: '75–100 · 过热警告区', v: '反向空头叙事区', vh: '2021 顶常>80' };
    }

    function draw(scores, total) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 88, r: 20, t: 24, b: 46 };
      var iw = w - pad.l - pad.r;
      var y1 = h - 46;
      var labels = ['波动', '动量', '社交', '主导', '搜索'];
      var cols = ['#1d4ed8', '#b8730a', '#7c3aed', '#0f8a4d', '#d5342c'];
      var barH = 22, gap = 8;
      var maxS = 100;
      scores.forEach(function (sc, i) {
        var y = pad.t + i * (barH + gap);
        var bw = (sc / maxS) * iw;
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pad.l, y, iw, barH);
        ctx.fillStyle = cols[i];
        ctx.fillRect(pad.l, y, bw, barH);
        ctx.fillStyle = '#454c56';
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(labels[i], pad.l - 8, y + 15);
        ctx.textAlign = 'left';
        ctx.fillText(sc.toFixed(0), pad.l + bw + 4, y + 15);
      });
      var tx = pad.l + (total / maxS) * iw;
      ctx.strokeStyle = '#15181d';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(tx, pad.t - 4); ctx.lineTo(tx, pad.t + 5 * (barH + gap)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('合成 ' + total.toFixed(0), tx, pad.t - 8);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('各分量 0–100 · 加权合成 F&G 指数', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var scores = [
        parseFloat(volEl.value), parseFloat(momEl.value),
        parseFloat(socEl.value), parseFloat(domEl.value),
        parseFloat(trendEl.value)
      ];
      var total = 0;
      for (var i = 0; i < 5; i++) total += scores[i] * W[i];
      total = clamp(total, 0, 100);
      var z = zone(total);
      txt(volO, scores[0].toFixed(0));
      txt(momO, scores[1].toFixed(0));
      txt(socO, scores[2].toFixed(0));
      txt(domO, scores[3].toFixed(0));
      txt(trendO, scores[4].toFixed(0));
      txt(idxEl, total.toFixed(0));
      txt(idxHEl, '五分量加权（调查 15% 已暂停不计）');
      txt(zoneEl, z.t);
      tint(zoneEl, z.c);
      txt(zoneHEl, z.h);
      txt(vEl, z.v);
      txt(vhEl, z.vh);
      draw(scores, total);
    }

    [volEl, momEl, socEl, domEl, trendEl].forEach(function (el) {
      el.addEventListener('input', update);
    });
    update();
  })();

  /* ══ 工具 2 · 资金费率累计算器 ══ */
  (function frCalc() {
    var posEl = $('fr_pos'), rateEl = $('fr_rate'), perEl = $('fr_periods');
    if (!posEl || !rateEl || !perEl) return;
    var posO = $('fr_posO'), rateO = $('fr_rateO'), perO = $('fr_periodsO');
    var costEl = $('fr_cost'), costHEl = $('fr_costh');
    var annualEl = $('fr_annual'), annualHEl = $('fr_annualh');
    var vEl = $('fr_v'), vhEl = $('fr_vh');
    var cv = $('frChart');

    function update() {
      var pos = parseFloat(posEl.value);
      var rate = parseFloat(rateEl.value) / 100;
      var periods = parseInt(perEl.value, 10);
      var cost = pos * rate * periods;
      var daily = rate * 3;
      var annual = daily * 365 * 100;
      var isLongPay = rate > 0;
      txt(posO, '$' + pos.toLocaleString('en-US'));
      txt(rateO, (rate * 100).toFixed(3) + '%');
      txt(perO, periods + ' 期');
      txt(costEl, (isLongPay ? '−' : '+') + '$' + Math.abs(Math.round(cost)).toLocaleString('en-US'));
      tint(costEl, isLongPay ? '#0f8a4d' : '#d5342c');
      txt(costHEl, (isLongPay ? '多头支付' : '空头支付') + ' · ' + periods + '×8h');
      txt(annualEl, annual.toFixed(1) + '%');
      tint(annualEl, annual > 30 ? '#d5342c' : annual > 15 ? '#b8730a' : '#454c56');
      txt(annualHEl, '日化 ' + (daily * 100).toFixed(3) + '% × 365');
      if (annual > 50) {
        txt(vEl, '杠杆多头难持续');
        txt(vhEl, '年化>' + annual.toFixed(0) + '%——拥挤平仓风险↑');
      } else if (annual > 15) {
        txt(vEl, '偏高但未极端');
        txt(vhEl, '关注 z-score 是否>2');
      } else {
        txt(vEl, '接近基线 10.95%');
        txt(vhEl, '0.01%/8h 结构正偏——常态');
      }
      drawFr(cv, rate * 100, annual);
    }

    function drawFr(cv, ratePct, annual) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxA = 120;
      var sx = function (v) { return pad.l + (v / maxA) * iw; };
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.fillStyle = '#fff7e6';
      ctx.fillRect(sx(0), pad.t, sx(10.95) - sx(0), ih);
      ctx.fillStyle = '#fdf3f2';
      ctx.fillRect(sx(30), pad.t, sx(maxA) - sx(30), ih);
      [10.95, 30, 60].forEach(function (ref) {
        var x = sx(ref);
        ctx.strokeStyle = ref === 10.95 ? '#0f8a4d' : '#c9d0d9';
        ctx.setLineDash(ref === 10.95 ? [4, 3] : []);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ref + '%', x, y1 + 13);
      });
      var ax = sx(Math.min(annual, maxA));
      ctx.strokeStyle = annual > 30 ? '#d5342c' : '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(ax, pad.t); ctx.lineTo(ax, y1); ctx.stroke();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(annual.toFixed(1) + '% 年化', ax, pad.t + ih * 0.5 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillText('费率 ' + ratePct.toFixed(3) + '%/8h → 年化 carry', pad.l + iw / 2, y1 + 31);
    }

    posEl.addEventListener('input', update);
    rateEl.addEventListener('input', update);
    perEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function driftStrip() {
    var TEl = $('fg_T'), psEl = $('fg_ps'), muEl = $('fg_mu'), sgEl = $('fg_sg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('fg_TO'), psO = $('fg_psO'), muO = $('fg_muO'), sgO = $('fg_sgO');
    var baseEl = $('fg_base'), baseHEl = $('fg_baseh');
    var dpEl = $('fg_dp'), dpHEl = $('fg_dph');
    var nEl = $('fg_n'), nHEl = $('fg_nh');
    var vEl = $('fg_drift_v'), vhEl = $('fg_drift_vh');
    var cv = $('fgDriftChart');

    function pBase(mu, sig, T) {
      return ncdf(mu * (T / 252) / (sig * Math.sqrt(T / 252)));
    }

    function nReq(pb, ps) {
      if (ps <= pb) return Infinity;
      var a = 1.96 * Math.sqrt(pb * (1 - pb));
      var b = 0.84 * Math.sqrt(ps * (1 - ps));
      return Math.ceil(Math.pow(a + b, 2) / Math.pow(ps - pb, 2));
    }

    function update() {
      var T = parseInt(TEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sig = parseFloat(sgEl.value) / 100;
      var pb = pBase(mu, sig, T);
      var dp = ps - pb;
      var n = nReq(pb, ps);
      txt(TO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(1) + '%');
      txt(sgO, (sig * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, 'Φ(μ·√T/σ) · T=' + T);
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp >= 0.05 ? '#d5342c' : dp >= 0.02 ? '#b8730a' : '#7c848f');
      txt(dpHEl, '信号胜率 − 随机持币基准');
      txt(nEl, isFinite(n) ? String(n) : '∞');
      txt(nHEl, 'α=0.05 · power=80%');
      if (!isFinite(n) || n > 80) {
        txt(vEl, '样本严重不足');
        txt(vhEl, '极端恐惧事件 n≈40 << 需 n=' + (isFinite(n) ? n : '∞'));
      } else if (n > 40) {
        txt(vEl, '超额可观但难证实');
        txt(vhEl, '需 n=' + n + ' · 历史样本不够');
      } else {
        txt(vEl, '统计上可检验');
        txt(vhEl, '但仍需 out-of-sample');
      }
      drawDrift(cv, pb, ps, T);
    }

    function drawDrift(cv, pb, ps, T) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 20, t: 20, b: 40 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 40;
      var sx = function (v) { return pad.l + v * iw; };
      ctx.fillStyle = '#eef1f5';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      var bx = sx(pb), sx2 = sx(ps);
      ctx.fillStyle = '#eaf0ff';
      ctx.fillRect(bx, pad.t, sx2 - bx, ih);
      ctx.strokeStyle = '#0f8a4d';
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(bx, pad.t); ctx.lineTo(bx, y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#0f8a4d';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('基准 ' + (pb * 100).toFixed(1) + '%', bx, y1 + 13);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(pad.l, pad.t + ih * 0.55, sx2 - pad.l, 20);
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('信号 ' + (ps * 100).toFixed(1) + '% · +' + ((ps - pb) * 100).toFixed(1) + 'pp · T=' + T + 'd', pad.l + 4, pad.t + ih * 0.55 + 14);
    }

    TEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 极端共振判定器 ══
     F&G 极端 + funding z → 反向信号质量 */
  (function confluence() {
    var fgEl = $('fg_extreme'), zEl = $('fr_z'), holdEl = $('fr_hold');
    if (!fgEl || !zEl || !holdEl) return;
    var fgO = $('fg_extremeO'), zO = $('fr_zO'), holdO = $('fr_holdO');
    var confEl = $('fg_conf'), confHEl = $('fg_confh');
    var sigEl = $('fg_sig'), sigHEl = $('fg_sigh');
    var vEl = $('fg_conf_v'), vhEl = $('fg_conf_vh');
    var cv = $('fgConfChart');

    function quality(fg, z, hold) {
      var q = 0.40;
      if (fg <= 15) q += 0.22;
      else if (fg <= 24) q += 0.14;
      else if (fg <= 35) q += 0.06;
      else if (fg >= 75) q += 0.14;
      else if (fg >= 85) q += 0.20;
      if (z <= -2) q += 0.12;
      else if (z <= -1) q += 0.05;
      else if (z >= 2) q += 0.12;
      else if (z >= 1) q += 0.05;
      if (hold >= 16) q += 0.04;
      else if (hold >= 8) q += 0.02;
      return clamp(q, 0.35, 0.88);
    }

    function sigType(fg, z) {
      if (fg <= 24 && z <= -1.5) return { t: '恐惧+空头拥挤', h: '经典反向做多共振', c: '#0f8a4d' };
      if (fg <= 24) return { t: '恐惧但未拥挤', h: 'F&G 单独——质量中等', c: '#454c56' };
      if (fg >= 75 && z >= 1.5) return { t: '贪婪+多头拥挤', h: '反向做空共振', c: '#d5342c' };
      if (fg >= 75) return { t: '贪婪但未拥挤', h: '费率未确认——谨慎', c: '#b8730a' };
      if (Math.abs(z) >= 2) return { t: '费率极端中性 F&G', h: '仅 fade 拥挤侧', c: '#1d4ed8' };
      return { t: '无极端共振', h: '两指标均未极端——不交易', c: '#7c848f' };
    }

    function verdict(q, fg, z) {
      if (fg > 24 && fg < 75 && Math.abs(z) < 1.5) return { t: '信号关闭', h: '等待极端共振' };
      if (q >= 0.72) return { t: '高共振质量', h: '结构类似 2022-11 底 / 2021-11 顶' };
      if (q >= 0.58) return { t: '中等共振', h: '须配链上/宏观确认' };
      return { t: '弱共振', h: '单指标极端不够' };
    }

    function update() {
      var fg = parseFloat(fgEl.value);
      var z = parseFloat(zEl.value);
      var hold = parseInt(holdEl.value, 10);
      var q = quality(fg, z, hold);
      var st = sigType(fg, z);
      var vd = verdict(q, fg, z);
      txt(fgO, String(Math.round(fg)));
      txt(zO, (z >= 0 ? '+' : '') + z.toFixed(1) + 'σ');
      txt(holdO, hold + 'h');
      txt(confEl, (q * 100).toFixed(1) + '%');
      txt(confHEl, '10 日内均值回归概率（模型）');
      txt(sigEl, st.t);
      tint(sigEl, st.c);
      txt(sigHEl, st.h);
      txt(vEl, vd.t);
      txt(vhEl, vd.h);
      drawConf(cv, fg, z, q);
    }

    function drawConf(cv, fg, z, q) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 48, t: 28, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var cx = pad.l + (fg / 100) * iw;
      var cy = pad.t + ih * 0.5 - (z / 4) * ih * 0.4;
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(pad.l, pad.t, iw, ih);
      ctx.fillStyle = 'rgba(15,138,77,0.12)';
      ctx.fillRect(pad.l, pad.t + ih * 0.55, iw * 0.28, ih * 0.45);
      ctx.fillStyle = 'rgba(213,52,44,0.12)';
      ctx.fillRect(pad.l + iw * 0.72, pad.t, iw * 0.28, ih * 0.45);
      ctx.strokeStyle = '#c9d0d9';
      ctx.beginPath(); ctx.moveTo(pad.l, cy); ctx.lineTo(pad.l + iw, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, pad.t); ctx.lineTo(cx, y1); ctx.stroke();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('F&G', pad.l + iw / 2, y1 + 31);
      ctx.save();
      ctx.translate(pad.l - 12, pad.t + ih / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('funding z', 0, 0);
      ctx.restore();
      var r = 8 + q * 14;
      ctx.fillStyle = q >= 0.72 ? '#0f8a4d' : q >= 0.58 ? '#b8730a' : '#7c848f';
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText((q * 100).toFixed(0) + '%', cx, cy + 4);
      ctx.fillStyle = '#15181d';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('FG=' + Math.round(fg) + ' · z=' + z.toFixed(1), pad.l + 4, pad.t + 14);
    }

    fgEl.addEventListener('input', update);
    zEl.addEventListener('input', update);
    holdEl.addEventListener('input', update);
    update();
  })();
})();
