/* ============================================================
   《BTC-URPD 已实现价格分布》主题脚本
   四个可调模型：
     1. URPD 成本基线地图   — 厚/薄区识别与支撑阻力读数
     2. 币数 vs 投入资本加权 — 峰值位移对比
     3. 漂移剥离器          — 厚区反弹胜率 vs 随机持币基准
     4. 分桶透镜            — ATH 分桶 vs ±2% 百分比分桶
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

  function fmtK(v) {
    if (!isFinite(v)) return '—';
    if (v >= 1000) return '$' + (v / 1000).toFixed(1) + 'K';
    return '$' + Math.round(v);
  }

  /* 简化 URPD：12 个价格桶（下界 K）与供应占比 % */
  var BUCKETS = [
    { lo: 15000, pct: 4.2 },
    { lo: 22000, pct: 8.6 },
    { lo: 28000, pct: 6.1 },
    { lo: 35000, pct: 5.4 },
    { lo: 45000, pct: 7.8 },
    { lo: 53000, pct: 11.2 },
    { lo: 62000, pct: 9.5 },
    { lo: 70000, pct: 2.1 },
    { lo: 78000, pct: 1.4 },
    { lo: 85000, pct: 3.8 },
    { lo: 95000, pct: 5.2 },
    { lo: 110000, pct: 4.6 }
  ];

  function bucketHi(i) {
    return i < BUCKETS.length - 1 ? BUCKETS[i + 1].lo : BUCKETS[i].lo * 1.15;
  }

  /* ══ 工具 1 · URPD 成本基线地图 ══ */
  (function urpdMap() {
    var spotEl = $('urpd_spot'), athEl = $('urpd_ath');
    if (!spotEl || !athEl) return;
    var spotO = $('urpd_spotO'), athO = $('urpd_athO');
    var supEl = $('urpd_sup'), supHEl = $('urpd_suph');
    var resEl = $('urpd_res'), resHEl = $('urpd_resh');
    var thinEl = $('urpd_thin'), thinHEl = $('urpd_thinh');
    var belowEl = $('urpd_below'), belowHEl = $('urpd_belowh');
    var vEl = $('urpd_v'), vhEl = $('urpd_vh');
    var cv = $('urpdChart');

    function thickBelow(spot) {
      var best = null;
      BUCKETS.forEach(function (b, i) {
        var hi = bucketHi(i);
        if (hi <= spot && b.pct >= 6.5) {
          if (!best || b.pct > best.pct) best = { lo: b.lo, hi: hi, pct: b.pct };
        }
      });
      return best;
    }

    function thickAbove(spot) {
      var best = null;
      BUCKETS.forEach(function (b, i) {
        var hi = bucketHi(i);
        if (b.lo >= spot && b.pct >= 4.5) {
          if (!best || b.lo < best.lo) best = { lo: b.lo, hi: hi, pct: b.pct };
        }
      });
      return best;
    }

    function thinnestGap(spot) {
      var gap = null;
      BUCKETS.forEach(function (b, i) {
        var hi = bucketHi(i);
        if (b.lo <= spot && hi >= spot && b.pct < 2.5) {
          gap = { lo: b.lo, hi: hi, pct: b.pct };
        }
      });
      if (!gap) {
        BUCKETS.forEach(function (b, i) {
          var hi = bucketHi(i);
          if (b.lo > spot && b.pct < 2.0) {
            if (!gap || b.lo < gap.lo) gap = { lo: b.lo, hi: hi, pct: b.pct };
          }
        });
      }
      return gap;
    }

    function supplyBelow(spot) {
      var s = 0;
      BUCKETS.forEach(function (b, i) {
        if (bucketHi(i) <= spot) s += b.pct;
        else if (b.lo < spot) s += b.pct * (spot - b.lo) / (bucketHi(i) - b.lo);
      });
      return s;
    }

    function draw(spot, ath) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxP = 12;
      var minX = 10000, maxX = Math.max(ath * 1.05, 120000);
      var sx = function (p) { return pad.l + ((p - minX) / (maxX - minX)) * iw; };
      var sy = function (v) { return y1 - (v / maxP) * ih; };

      BUCKETS.forEach(function (b, i) {
        var hi = bucketHi(i);
        var x0 = sx(b.lo), x1 = sx(hi);
        var col = b.pct >= 8 ? '#d5342c' : b.pct >= 5 ? '#b8730a' : '#c9d0d9';
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.75;
        ctx.fillRect(x0, sy(b.pct), x1 - x0 - 1, y1 - sy(b.pct));
        ctx.globalAlpha = 1;
      });

      var spx = sx(spot);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(spx, pad.t); ctx.lineTo(spx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('现货', spx, pad.t - 4);

      ctx.strokeStyle = '#7c848f';
      ctx.setLineDash([3, 3]);
      var apx = sx(ath);
      ctx.beginPath(); ctx.moveTo(apx, pad.t); ctx.lineTo(apx, y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#7c848f';
      ctx.fillText('ATH', apx, pad.t - 4);

      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      [30000, 60000, 90000].forEach(function (p) {
        if (p < minX || p > maxX) return;
        var x = sx(p);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((p / 1000) + 'K', x, y1 + 13);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('价格桶下界（示意）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var spot = parseFloat(spotEl.value);
      var ath = parseFloat(athEl.value);
      txt(spotO, fmtK(spot));
      txt(athO, fmtK(ath));
      var sup = thickBelow(spot);
      var res = thickAbove(spot);
      var thin = thinnestGap(spot);
      var below = supplyBelow(spot);
      if (sup) {
        txt(supEl, fmtK(sup.lo) + '–' + fmtK(sup.hi));
        txt(supHEl, '供应 ' + sup.pct.toFixed(1) + '% · 厚区支撑候选');
        tint(supEl, '#0f8a4d');
      } else {
        txt(supEl, '无明显厚区');
        txt(supHEl, '现货下方无 ≥6.5% 供应簇');
        tint(supEl, '#7c848f');
      }
      if (res) {
        txt(resEl, fmtK(res.lo) + '–' + fmtK(res.hi));
        txt(resHEl, '供应 ' + res.pct.toFixed(1) + '% · 阻力候选');
        tint(resEl, '#d5342c');
      } else {
        txt(resEl, '薄阻力区');
        txt(resHEl, '上方无显著成本簇——路径阻力低');
        tint(resEl, '#1d4ed8');
      }
      if (thin) {
        txt(thinEl, fmtK(thin.lo) + '–' + fmtK(thin.hi));
        txt(thinHEl, '仅 ' + thin.pct.toFixed(1) + '% 供应 · 易快速穿越');
      } else {
        txt(thinEl, '—');
        txt(thinHEl, '现货附近无极端薄区');
      }
      txt(belowEl, below.toFixed(1) + '%');
      txt(belowHEl, '成本基线位于现货下方的供应占比');
      var verdict = thin && thin.lo <= spot ? '低阻力通道' : (sup ? '下方有厚垫' : '均衡分布');
      txt(vEl, verdict);
      tint(vEl, verdict.indexOf('低阻力') >= 0 ? '#1d4ed8' : '#454c56');
      txt(vhEl, 'URPD 读法：厚区=反应带，薄区=加速带，非预测');
      draw(spot, ath);
    }

    spotEl.addEventListener('input', update);
    athEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 币数 vs 投入资本加权 ══ */
  (function urpdIC() {
    var spotEl = $('urpd_ic_spot');
    if (!spotEl) return;
    var spotO = $('urpd_ic_spotO');
    var cntEl = $('urpd_ic_cnt'), cntHEl = $('urpd_ic_cnth');
    var icEl = $('urpd_ic_ic'), icHEl = $('urpd_ic_ich');
    var shiftEl = $('urpd_ic_shift'), shiftHEl = $('urpd_ic_shifth');
    var vEl = $('urpd_ic_v'), vhEl = $('urpd_ic_vh');
    var cv = $('urpdICChart');

    function icPct(b) {
      return b.pct * b.lo;
    }

    function draw() {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxCnt = 12, maxIc = 0;
      var icVals = BUCKETS.map(icPct);
      icVals.forEach(function (v) { if (v > maxIc) maxIc = v; });
      var n = BUCKETS.length;
      var bw = iw / n - 4;
      BUCKETS.forEach(function (b, i) {
        var x = pad.l + i * (iw / n) + 2;
        var hCnt = (b.pct / maxCnt) * ih;
        var hIc = (icPct(b) / maxIc) * ih;
        ctx.fillStyle = '#c9d0d9';
        ctx.fillRect(x, y1 - hCnt, bw, hCnt);
        ctx.fillStyle = '#d5342c';
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, y1 - hIc, bw, hIc);
        ctx.globalAlpha = 1;
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('灰=币数加权  红=资本加权', pad.l, pad.t - 4);
      ctx.textAlign = 'center';
      ctx.fillText('价格桶（示意）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var spot = parseFloat(spotEl.value);
      txt(spotO, fmtK(spot));
      var bestCnt = BUCKETS[0], bestIc = BUCKETS[0];
      var bestCntV = 0, bestIcV = 0;
      BUCKETS.forEach(function (b) {
        if (b.pct > bestCntV) { bestCntV = b.pct; bestCnt = b; }
        var ic = icPct(b);
        if (ic > bestIcV) { bestIcV = ic; bestIc = b; }
      });
      txt(cntEl, fmtK(bestCnt.lo));
      txt(cntHEl, bestCnt.pct.toFixed(1) + '% 供应 · 币数峰值');
      txt(icEl, fmtK(bestIc.lo));
      txt(icHEl, '资本权重峰值 · 高价小量可追上');
      var shift = bestIc.lo - bestCnt.lo;
      txt(shiftEl, (shift >= 0 ? '+' : '') + fmtK(shift).replace('$', ''));
      txt(shiftHEl, 'IC 峰值相对币数峰值位移');
      tint(shiftEl, shift > 5000 ? '#d5342c' : '#454c56');
      txt(vEl, shift > 8000 ? '读 IC 版' : '两版接近');
      txt(vhEl, '结构意义判断优先看投入资本加权 URPD');
      draw();
    }

    spotEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function urpdDrift() {
    var tEl = $('urpd_T'), psEl = $('urpd_ps'), muEl = $('urpd_mu'), sgEl = $('urpd_sg');
    if (!tEl || !psEl) return;
    var tO = $('urpd_TO'), psO = $('urpd_psO'), muO = $('urpd_muO'), sgO = $('urpd_sgO');
    var baseEl = $('urpd_base'), baseHEl = $('urpd_baseh');
    var dpEl = $('urpd_dp'), dpHEl = $('urpd_dph');
    var nEl = $('urpd_n'), nHEl = $('urpd_nh');
    var vEl = $('urpd_dv'), vhEl = $('urpd_dvh');
    var cv = $('urpdDriftChart');

    function draw(T, pb, ps) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 16, b: 32 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 32;
      var pts = [];
      for (var t = 5; t <= 180; t += 5) {
        var mu = parseFloat(muEl.value) / 100;
        var sig = parseFloat(sgEl.value) / 100;
        var z = mu * (t / 252) / (sig * Math.sqrt(t / 252));
        pts.push({ t: t, pb: ncdf(z) });
      }
      var sx = function (v) { return pad.l + (v / 180) * iw; };
      var sy = function (v) { return y1 - v * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#c9d0d9';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      pts.forEach(function (p, i) {
        var x = sx(p.t), y = sy(p.pb);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.strokeStyle = '#d5342c';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pad.l, sy(ps)); ctx.lineTo(w - pad.r, sy(ps));
      ctx.stroke();
      ctx.setLineDash([]);
      var bx = sx(T);
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(bx, sy(pb), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('持有期 T', pad.l + iw / 2, y1 + 22);
    }

    function update() {
      var T = parseFloat(tEl.value);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sig = parseFloat(sgEl.value) / 100;
      var z = mu * (T / 252) / (sig * Math.sqrt(T / 252));
      var pb = ncdf(z);
      var dp = ps - pb;
      var diff = Math.max(dp, 0.001);
      var n = Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / Math.pow(diff, 2);
      txt(tO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(0) + '%');
      txt(sgO, (sig * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(baseHEl, '随机持币 ' + T + ' 日基准');
      txt(dpEl, (dp >= 0 ? '+' : '') + (dp * 100).toFixed(1) + ' pp');
      tint(dpEl, dp >= 5 ? '#d5342c' : dp >= 2 ? '#b8730a' : '#454c56');
      txt(dpHEl, '厚区反弹策略表面胜率 − 基准');
      txt(nEl, isFinite(n) ? String(Math.ceil(n)) : '—');
      txt(nHEl, '证明 ' + (dp * 100).toFixed(1) + 'pp 超额所需样本（双侧）');
      var verdict = dp < 3 ? '超额有限' : dp < 6 ? '需大样本' : '表面可观';
      txt(vEl, verdict);
      txt(vhEl, dp < 3 ? 'URPD 水平不宜替代漂移对照' : '仍须行为指标确认吸收');
      draw(T, pb, ps);
    }

    tEl.addEventListener('input', update);
    psEl.addEventListener('input', update);
    muEl.addEventListener('input', update);
    sgEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 分桶透镜 ══ */
  (function urpdPart() {
    var spotEl = $('urpd_part_spot'), athEl = $('urpd_part_ath');
    if (!spotEl || !athEl) return;
    var spotO = $('urpd_part_spotO'), athO = $('urpd_part_athO');
    var athWEl = $('urpd_part_athW'), athWHEl = $('urpd_part_athWh');
    var pctWEl = $('urpd_part_pctW'), pctWHEl = $('urpd_part_pctWh');
    var nearEl = $('urpd_part_near'), nearHEl = $('urpd_part_nearh');
    var vEl = $('urpd_part_v'), vhEl = $('urpd_part_vh');

    function update() {
      var spot = parseFloat(spotEl.value);
      var ath = parseFloat(athEl.value);
      var athW = ath / 100;
      var pctW = spot * 0.02;
      var athIdx = Math.floor(spot / athW);
      var pctIdx = 50;
      txt(spotO, fmtK(spot));
      txt(athO, fmtK(ath));
      txt(athWEl, '$' + Math.round(athW).toLocaleString('en-US'));
      txt(athWHEl, '0→ATH 均分 100 桶 · 现货落在第 ' + athIdx + ' 桶');
      txt(pctWEl, '$' + Math.round(pctW).toLocaleString('en-US'));
      txt(pctWHEl, '±2% 共 100 桶 · 现货居中第 ' + pctIdx + ' 桶');
      var ratio = pctW / athW;
      txt(nearEl, ratio.toFixed(2) + '×');
      txt(nearHEl, '百分比分桶局部放大倍数');
      var lens = ratio > 1.2 ? '用 % 分区看近端' : '用 ATH 分区看全史';
      txt(vEl, lens);
      txt(vhEl, ratio > 1.2 ? '现货附近细节：% 分区桶宽更窄' : '远端结构：ATH 分区覆盖全周期');
    }

    spotEl.addEventListener('input', update);
    athEl.addEventListener('input', update);
    update();
  })();
})();
