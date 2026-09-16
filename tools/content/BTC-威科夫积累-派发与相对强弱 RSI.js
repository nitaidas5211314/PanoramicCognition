/* BTC 威科夫 × RSI 主题脚本 — 4 个可调模型 */
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

  /* 工具 1 · RSI 背离强度计 */
  (function rsiDiv() {
    var p1El = $('bwk_p1'), r1El = $('bwk_r1'), p2El = $('bwk_p2'), r2El = $('bwk_r2');
    if (!p1El || !r1El || !p2El || !r2El) return;
    var p1O = $('bwk_p1O'), r1O = $('bwk_r1O'), p2O = $('bwk_p2O'), r2O = $('bwk_r2O');
    var typeEl = $('bwk_divType'), typehEl = $('bwk_divTypeh');
    var scoreEl = $('bwk_divScore'), scorehEl = $('bwk_divScoreh');
    var slopeEl = $('bwk_slope'), slopehEl = $('bwk_slopeh');
    var vEl = $('bwk_div_v'), vhEl = $('bwk_div_vh');
    var cv = $('bwk_rsiChart');
    var ctx = cv ? cv.getContext('2d') : null;

    function draw(p1, p2, r1, r2, score, bull) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 214;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var pl = 56, pr = 24, pt = 28, pb = 46;
      var bw = w - pl - pr, bh = h - pt - pb;
      var y1 = h - pb;

      ctx.strokeStyle = '#eef1f5';
      ctx.lineWidth = 1;
      for (var g = 0; g <= 4; g++) {
        var gy = pt + bh * g / 4;
        ctx.beginPath(); ctx.moveTo(pl, gy); ctx.lineTo(w - pr, gy); ctx.stroke();
      }

      var px = [pl + bw * 0.2, pl + bw * 0.55, pl + bw * 0.85];
      var priceY = [
        pt + bh * 0.35,
        pt + bh * (0.35 + Math.max(-0.25, Math.min(0.25, (-p1 - p2) / 40))),
        pt + bh * (0.35 + Math.max(-0.25, Math.min(0.35, (-p1 - p2) / 30)))
      ];
      var rsiBase = 42;
      var ry = [
        pt + bh * (1 - (rsiBase + r1 * 0.8) / 100),
        pt + bh * (1 - (rsiBase + r1 + r2 * 0.5) / 100 * 0.95),
        pt + bh * (1 - (rsiBase + r1 + r2) / 100 * 0.9)
      ];

      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px[0], priceY[0]);
      ctx.lineTo(px[1], priceY[1]);
      ctx.lineTo(px[2], priceY[2]);
      ctx.stroke();

      ctx.strokeStyle = '#1d4ed8';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(px[0], ry[0]);
      ctx.lineTo(px[1], ry[1]);
      ctx.lineTo(px[2], ry[2]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = '11px -apple-system,sans-serif';
      ctx.fillStyle = '#d5342c';
      ctx.textAlign = 'left';
      ctx.fillText('价格', pl, pt - 8);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillText('RSI', pl + 36, pt - 8);

      ctx.fillStyle = '#7c848f';
      ctx.textAlign = 'center';
      ctx.fillText('时间 →', pl + bw / 2, y1 + 31);
      ['T1', 'T2', 'T3'].forEach(function (lab, i) {
        ctx.fillText(lab, px[i], y1 + 13);
      });

      ctx.fillStyle = bull ? '#0f8a4d' : '#d5342c';
      ctx.textAlign = 'right';
      ctx.font = '700 12px -apple-system,sans-serif';
      ctx.fillText('强度 ' + score, w - pr, pt + 14);
    }

    function upd() {
      var p1 = parseFloat(p1El.value), r1 = parseFloat(r1El.value);
      var p2 = parseFloat(p2El.value), r2 = parseFloat(r2El.value);
      txt(p1O, (p1 >= 0 ? '+' : '') + p1.toFixed(1) + '%');
      txt(r1O, (r1 >= 0 ? '+' : '') + r1.toFixed(1));
      txt(p2O, (p2 >= 0 ? '+' : '') + p2.toFixed(1) + '%');
      txt(r2O, (r2 >= 0 ? '+' : '') + r2.toFixed(1));

      var priceSlope = p1 + p2;
      var rsiSlope = r1 + r2;
      var normSlope = rsiSlope - priceSlope * 0.6;

      var bull = priceSlope < -0.5 && rsiSlope > 0.5;
      var bear = priceSlope > 0.5 && rsiSlope < -0.5;
      var raw = bull ? (rsiSlope - priceSlope * 0.5) : (bear ? (-rsiSlope + priceSlope * 0.5) : Math.abs(normSlope) * 0.3);
      var score = Math.round(Math.min(100, Math.max(0, raw * 5.5)));

      if (bull) {
        txt(typeEl, '看涨背离');
        txt(typehEl, '价格下行、RSI 抬升');
      } else if (bear) {
        txt(typeEl, '看跌背离');
        txt(typehEl, '价格上行、RSI 走低');
      } else {
        txt(typeEl, '无显著背离');
        txt(typehEl, '价格与动量方向一致');
      }

      txt(scoreEl, String(score));
      txt(scorehEl, '0–100，越高越可靠');
      txt(slopeEl, (normSlope >= 0 ? '+' : '') + normSlope.toFixed(1));
      txt(slopehEl, 'RSI 变化率 − 价格变化率（归一化）');

      var label, hint, col;
      if (score >= 65) {
        label = '有效确认'; hint = '可纳入 Spring/UTAD 剧本，仍需量能配合'; col = 'var(--green)';
      } else if (score >= 40) {
        label = '弱背离'; hint = '仅作观察，不作为单独入场依据'; col = 'var(--amber)';
      } else {
        label = '无效'; hint = '动量未支持结构叙事'; col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(p1, p2, r1, r2, score, bull);
    }

    [p1El, r1El, p2El, r2El].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* 工具 2 · 威科夫相位置信度 */
  (function phaseScore() {
    var posEl = $('bwk_pos'), vUpEl = $('bwk_vUp'), vDnEl = $('bwk_vDn'), rsiEl = $('bwk_rsiLv');
    if (!posEl || !vUpEl || !vDnEl || !rsiEl) return;
    var posO = $('bwk_posO'), vUpO = $('bwk_vUpO'), vDnO = $('bwk_vDnO'), rsiO = $('bwk_rsiLvO');
    var accEl = $('bwk_acc'), acchEl = $('bwk_acch');
    var distEl = $('bwk_dist'), disthEl = $('bwk_disth');
    var vqEl = $('bwk_vq'), vqhEl = $('bwk_vqh');
    var vEl = $('bwk_phase_v'), vhEl = $('bwk_phase_vh');

    function upd() {
      var pos = parseFloat(posEl.value);
      var vUp = parseFloat(vUpEl.value), vDn = parseFloat(vDnEl.value);
      var rsi = parseFloat(rsiEl.value);

      txt(posO, pos + '%' + (pos < 35 ? '（偏下）' : pos > 65 ? '（偏上）' : '（中部）'));
      txt(vUpO, vUp.toFixed(1) + '×');
      txt(vDnO, vDn.toFixed(1) + '×');
      txt(rsiO, rsi.toFixed(1));

      var posScore = (100 - pos) * 0.35;
      var volScore = (vDn - vUp) * 18 + (vDn < 1 ? 8 : 0) + (vUp < 1 ? 8 : 0);
      var rsiScore = rsi < 45 ? (45 - rsi) * 0.6 : rsi > 60 ? -(rsi - 60) * 0.8 : 5;
      var acc = Math.round(Math.min(100, Math.max(0, posScore + volScore + rsiScore + 12)));
      var dist = 100 - acc;

      txt(accEl, String(acc));
      txt(acchEl, '0=纯派发，100=纯吸筹');
      txt(distEl, String(dist));
      txt(disthEl, '100 − 吸筹置信度');

      var vqLab, vqHint;
      if (vDn > vUp * 1.1 && vUp < 1.1) {
        vqLab = '跌放量涨缩量'; vqHint = '偏吸筹特征';
      } else if (vUp > vDn * 1.1 && vDn < 1.1) {
        vqLab = '涨放量跌缩量'; vqHint = '偏派发特征';
      } else {
        vqLab = '量价均衡'; vqHint = 'Phase B 典型，方向不明';
      }
      txt(vqEl, vqLab); txt(vqhEl, vqHint);

      var label, hint, col;
      if (acc >= 65) {
        label = '偏吸筹'; hint = '需 Spring/SOS 事件确认，不可直接满仓'; col = 'var(--green)';
      } else if (acc <= 35) {
        label = '偏派发'; hint = '警惕 UTAD/SOW，不宜盲目抄底'; col = 'var(--red)';
      } else {
        label = '不确定'; hint = 'Phase B 中段，等待 Phase C 事件'; col = 'var(--amber)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }

    [posEl, vUpEl, vDnEl, rsiEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* 工具 3 · BTC 漂移剥离器 */
  (function driftStrip() {
    var TEl = $('bwk_dT'), psEl = $('bwk_dps'), muEl = $('bwk_dmu'), sgEl = $('bwk_dsg');
    if (!TEl || !psEl || !muEl || !sgEl) return;
    var TO = $('bwk_dTO'), psO = $('bwk_dpsO'), muO = $('bwk_dmuO'), sgO = $('bwk_dsgO');
    var baseEl = $('bwk_dbase'), basehEl = $('bwk_dbaseh');
    var dpEl = $('bwk_ddp'), dphEl = $('bwk_ddph');
    var nEl = $('bwk_dn'), nhEl = $('bwk_dnh');
    var vEl = $('bwk_d_v'), vhEl = $('bwk_d_vh');
    var cv = $('bwk_driftChart');
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
        { label: '策略报告胜率', p: ps, col: '#1d4ed8' }
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
      txt(muO, (mu * 100).toFixed(0) + '%');
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
      txt(basehEl, '漂移 ' + (drift * 100).toFixed(2) + '% · 波动 ' + (sd * 100).toFixed(2) + '%');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp <= 0 ? 'var(--red)' : (dp < 0.03 ? 'var(--amber)' : 'var(--green)'));
      txt(dphEl, dp <= 0 ? '策略未跑赢随机做多' : '扣除漂移后的净优势');
      txt(nEl, n === null ? '∞' : n.toLocaleString('en-US'));
      txt(nhEl, n === null ? '超额非正' : '单侧 5%、检验力 80%');

      var label, hint, col;
      if (dp <= 0) {
        label = '无超额'; hint = '扣掉漂移后跑输随机做多'; col = 'var(--red)';
      } else if (dp < 0.03) {
        label = '超额可疑'; hint = (dp * 100).toFixed(1) + 'pp 易被成本与过拟合吞噬'; col = 'var(--red)';
      } else if (dp < 0.06) {
        label = '超额有限'; hint = '有优势但远小于表面胜率暗示'; col = 'var(--amber)';
      } else {
        label = '超额显著'; hint = '仍须核对成本与样本外'; col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(pb, ps);
    }

    [TEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', upd); });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* 工具 4 · Spring/UTAD 质量分 */
  (function springScore() {
    var dEl = $('bwk_spd'), tEl = $('bwk_spt'), vEl = $('bwk_spv');
    if (!dEl || !tEl || !vEl) return;
    var dO = $('bwk_spdO'), tO = $('bwk_sptO'), vO = $('bwk_spvO');
    var scoreEl = $('bwk_spScore'), scorehEl = $('bwk_spScoreh');
    var partsEl = $('bwk_spParts'), partshEl = $('bwk_spPartsh');
    var optEl = $('bwk_spOpt'), opthEl = $('bwk_spOpth');
    var vvEl = $('bwk_sp_v'), vvhEl = $('bwk_sp_vh');

    function upd() {
      var d = parseFloat(dEl.value), t = parseFloat(tEl.value), v = parseFloat(vEl.value);
      txt(dO, d.toFixed(1) + '%');
      txt(tO, t + ' 根');
      txt(vO, v.toFixed(1) + '×');

      var ds = Math.exp(-Math.pow((d - 2.5) / 2.4, 2));
      var ss = Math.exp(-t / 3);
      var vs = 1 / (1 + 1.2 * Math.max(0, v - 1));
      var score = 100 * (0.4 * ds + 0.35 * ss + 0.25 * vs);

      txt(scoreEl, score.toFixed(1));
      txt(scorehEl, 'Spring 越高越好；UTAD 时反向理解');
      txt(partsEl, ds.toFixed(2) + ' / ' + ss.toFixed(2) + ' / ' + vs.toFixed(2));
      txt(partshEl, '分项 0–1');
      txt(optEl, '1%–4%');
      txt(opthEl, '较股票略宽');

      var label, hint, col;
      if (score >= 75) {
        label = '高质量 Spring'; hint = '等 SOS 突破 + RSI>50 再考虑入场'; col = 'var(--green)';
      } else if (score >= 50) {
        label = '中等质量'; hint = '需二次测试或更强背离确认'; col = 'var(--amber)';
      } else {
        label = '低质量 / 疑似真破位'; hint = '不宜按 Spring 建仓'; col = 'var(--red)';
      }
      txt(vvEl, label); txt(vvhEl, hint); tint(vvEl, col);
    }

    [dEl, tEl, vEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
