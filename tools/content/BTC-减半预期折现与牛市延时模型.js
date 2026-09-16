/* ============================================================
   《BTC-减半预期折现与牛市延时模型》主题脚本
   四个可调模型：
     1. 预期折现器    — 距减半天数 → 已折现比例 → 有效供给冲击
     2. 牛市延时钟    — 减半后天数 + 周期加速 → 预测峰窗
     3. 漂移剥离器    — 减半择时胜率 vs 随机持币基准
     4. 供需平衡仪    — 矿工日抛压 vs ETF/净需求吸收
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  var HALVING_2024 = new Date('2024-04-19T00:00:00Z');

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

  function fmtDate(d) {
    return d.getUTCFullYear() + '-' +
      String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
      String(d.getUTCDate()).padStart(2, '0');
  }

  function addDays(d, n) {
    var r = new Date(d);
    r.setUTCDate(r.getUTCDate() + n);
    return r;
  }

  /* ══ 工具 1 · 预期折现器 ══ */
  (function discountModel() {
    var daysEl = $('hd_days'), pricedEl = $('hd_priced');
    if (!daysEl || !pricedEl) return;
    var daysO = $('hd_daysO'), pricedO = $('hd_pricedO');
    var discEl = $('hd_disc'), discHEl = $('hd_disch');
    var effEl = $('hd_eff'), effHEl = $('hd_effh');
    var shockEl = $('hd_shock'), shockHEl = $('hd_shockh');
    var vEl = $('hd_v'), vhEl = $('hd_vh');
    var cv = $('hdDiscChart');

    var K_HALF = Math.log(2) / 180;

    function draw(days, priced, modelDisc) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 18, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxD = 540;
      var sx = function (d) { return pad.l + (d / maxD) * iw; };
      var sy = function (p) { return pad.t + (1 - p) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 60; i++) {
        var d = maxD * i / 60;
        var p = 1 - Math.exp(-K_HALF * d);
        var x = sx(d), y = sy(p);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      var mx = sx(days), my = sy(modelDisc);
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill();
      var ux = sx(days), uy = sy(priced);
      ctx.fillStyle = '#0f8a4d';
      ctx.beginPath(); ctx.arc(ux, uy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('距减半（天）', pad.l + iw / 2, y1 + 31);
      ctx.save();
      ctx.translate(14, pad.t + ih / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('已折现比例', 0, 0);
      ctx.restore();
    }

    function update() {
      var days = +daysEl.value;
      var priced = +pricedEl.value / 100;
      var modelDisc = 1 - Math.exp(-K_HALF * days);
      var effShock = (1 - priced) * 0.5;
      var dailyCut = 450;
      txt(daysO, days + ' 天');
      txt(pricedO, (+pricedEl.value).toFixed(0) + '%');
      txt(discEl, (modelDisc * 100).toFixed(1) + '%');
      txt(effEl, (effShock * 100).toFixed(1) + '%');
      txt(shockEl, Math.round(dailyCut * effShock * 2) + ' BTC/天');
      var gap = priced - modelDisc;
      if (gap > 0.08) {
        txt(discHEl, '市场折现 > 模型 → 可能过热');
        txt(effHEl, '剩余冲击偏小');
        txt(shockHEl, '供给侧利好已消化');
        txt(vEl, '偏「已 price-in」');
        txt(vhEl, '后续边际利好有限');
        tint(vEl, '#d5342c');
      } else if (gap < -0.08) {
        txt(discHEl, '市场折现 < 模型 → 仍有空间');
        txt(effHEl, '有效冲击偏大');
        txt(shockHEl, '事件后或仍有买盘');
        txt(vEl, '偏「未充分折现」');
        txt(vhEl, '注意 demand 能否承接');
        tint(vEl, '#0f8a4d');
      } else {
        txt(discHEl, '与指数折现模型接近');
        txt(effHEl, '中性区间');
        txt(shockHEl, '—');
        txt(vEl, '折现大致均衡');
        txt(vhEl, '—');
        tint(vEl, '#454c56');
      }
      draw(days, priced, modelDisc);
    }

    daysEl.addEventListener('input', update);
    pricedEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 牛市延时钟 ══ */
  (function delayClock() {
    var daysEl = $('hl_days'), accelEl = $('hl_accel');
    if (!daysEl || !accelEl) return;
    var daysO = $('hl_daysO'), accelO = $('hl_accelO');
    var peakEl = $('hl_peak'), peakHEl = $('hl_peakh');
    var winEl = $('hl_win'), winHEl = $('hl_winh');
    var histEl = $('hl_hist'), histHEl = $('hl_histh');
    var vEl = $('hl_v'), vhEl = $('hl_vh');
    var cv = $('hlDelayChart');

    var HIST = [518, 546];

    function draw(daysAfter, accel, peakDays) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 18, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxD = 600;
      var sx = function (d) { return pad.l + (d / maxD) * iw; };
      var midY = pad.t + ih / 2;
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(29,78,216,0.12)';
      ctx.fillRect(sx(518), pad.t, sx(546) - sx(518), ih);
      ctx.strokeStyle = '#1d4ed8';
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(sx(518), pad.t); ctx.lineTo(sx(518), y1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx(546), pad.t); ctx.lineTo(sx(546), y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = '#d5342c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(0), midY);
      ctx.lineTo(sx(daysAfter), midY);
      ctx.stroke();
      ctx.fillStyle = '#d5342c';
      ctx.beginPath(); ctx.arc(sx(daysAfter), midY, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0f8a4d';
      ctx.beginPath(); ctx.arc(sx(peakDays), midY - 20, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('518d', sx(518), y1 + 13);
      ctx.fillText('546d', sx(546), y1 + 13);
      ctx.fillText('减半后天数', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var daysAfter = +daysEl.value;
      var accel = +accelEl.value;
      var basePeak = 532;
      var peakDays = Math.max(400, Math.min(580, basePeak - accel));
      var peakDate = addDays(HALVING_2024, peakDays);
      var lo = addDays(HALVING_2024, 518);
      var hi = addDays(HALVING_2024, 546);
      txt(daysO, daysAfter + ' 天');
      txt(accelO, accel + ' 天');
      txt(peakEl, fmtDate(peakDate));
      txt(winEl, fmtDate(lo) + ' ~ ' + fmtDate(hi));
      txt(histEl, '2016:518 · 2020:546 · 均值532');
      var remain = peakDays - daysAfter;
      if (remain > 60) {
        txt(peakHEl, '距预测峰还有 ~' + remain + ' 天');
        txt(winHEl, '历史带仍有效');
        txt(histHEl, '样本 n=2，区间非点');
        txt(vEl, '牛市延时进行中');
        txt(vhEl, '勿把日历当闹钟');
        tint(vEl, '#1d4ed8');
      } else if (remain > -30) {
        txt(peakHEl, '处于历史峰窗');
        txt(winHEl, '高波动区');
        txt(histHEl, '2025-10 峰 ~$126K【待验证】');
        txt(vEl, '峰窗附近');
        txt(vhEl, '回撤 ≠ 周期终结');
        tint(vEl, '#d5342c');
      } else {
        txt(peakHEl, '已过模型峰窗 ' + Math.abs(remain) + ' 天');
        txt(winHEl, '周期形态可能变形');
        txt(histHEl, 'ETF 时代延时风险↑');
        txt(vEl, '延时模型衰减区');
        txt(vhEl, '换用宏观/链上信号');
        tint(vEl, '#a06800');
      }
      draw(daysAfter, accel, peakDays);
    }

    daysEl.addEventListener('input', update);
    accelEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function driftStrip() {
    var winEl = $('ds_win'), stratEl = $('ds_strat');
    if (!winEl || !stratEl) return;
    var winO = $('ds_winO'), stratO = $('ds_stratO');
    var baseEl = $('ds_base'), baseHEl = $('ds_baseh');
    var exEl = $('ds_ex'), exHEl = $('ds_exh');
    var nEl = $('ds_n'), nHEl = $('ds_nh');
    var vEl = $('ds_v'), vhEl = $('ds_vh');

    function update() {
      var T = +winEl.value;
      var ps = +stratEl.value / 100;
      var mu = 0.50, sig = 0.65;
      var pb = ncdf(mu * (T / 252) / (sig * Math.sqrt(T / 252)));
      var ex = ps - pb;
      var n = Math.ceil(Math.pow(
        (1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps))) / (ps - pb), 2
      ));
      txt(winO, T + ' 日');
      txt(stratO, (ps * 100).toFixed(1) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(exEl, (ex >= 0 ? '+' : '') + (ex * 100).toFixed(1) + ' pp');
      txt(nEl, isFinite(n) && n > 0 ? String(n) : '—');
      if (ex < 0.03) {
        txt(baseHEl, '策略跑输随机持币');
        txt(exHEl, '表面胜率可能是漂移');
        txt(nHEl, '—');
        txt(vEl, '无显著超额');
        txt(vhEl, '减半日历 ≠ alpha');
        tint(vEl, '#d5342c');
      } else if (ex < 0.08) {
        txt(baseHEl, '超额边际');
        txt(exHEl, '需大样本验证');
        txt(nHEl, '约需 ' + n + ' 次独立周期');
        txt(vEl, '弱超额');
        txt(vhEl, 'n=4 周期不够');
        tint(vEl, '#a06800');
      } else {
        txt(baseHEl, '显著高于基准');
        txt(exHEl, '仍须 OOS');
        txt(nHEl, '约需 ' + n + ' 次');
        txt(vEl, '表面可观');
        txt(vhEl, '警惕过拟合 4 个样本');
        tint(vEl, '#0f8a4d');
      }
    }

    winEl.addEventListener('input', update);
    stratEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 4 · 供需平衡仪 ══ */
  (function supplyDemand() {
    var minerEl = $('sd_miner'), etfEl = $('sd_etf'), otcEl = $('sd_otc');
    if (!minerEl || !etfEl || !otcEl) return;
    var minerO = $('sd_minerO'), etfO = $('sd_etfO'), otcO = $('sd_otcO');
    var netEl = $('sd_net'), netHEl = $('sd_neth');
    var ratioEl = $('sd_ratio'), ratioHEl = $('sd_ratioh');
    var vEl = $('sd_v'), vhEl = $('sd_vh');
    var cv = $('sdBalChart');

    function draw(miner, etf, otc, net) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 20, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var items = [
        { label: '矿工抛压', v: miner, col: '#d5342c' },
        { label: 'ETF 净买', v: etf, col: '#0f8a4d' },
        { label: 'OTC/其他', v: otc, col: '#1d4ed8' }
      ];
      var maxV = Math.max(miner, etf, otc, 1) * 1.15;
      var barH = ih / 3.5;
      items.forEach(function (it, i) {
        var y = pad.t + i * (barH + 14);
        var bw = (it.v / maxV) * iw;
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pad.l, y, iw, barH);
        ctx.fillStyle = it.col;
        ctx.fillRect(pad.l, y, bw, barH);
        ctx.fillStyle = '#454c56';
        ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(it.label, pad.l, y - 4);
        var lab = it.v.toFixed(0) + ' BTC';
        ctx.textAlign = bw > 40 ? 'right' : 'left';
        var tx = bw > 40 ? pad.l + bw - 6 : pad.l + bw + 8;
        ctx.fillStyle = bw > 40 ? '#fff' : '#454c56';
        ctx.fillText(lab, tx, y + barH / 2 + 4);
      });
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('日流量（BTC）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var miner = +minerEl.value;
      var etf = +etfEl.value;
      var otc = +otcEl.value;
      var net = etf + otc - miner;
      var ratio = miner > 0 ? etf / miner : 0;
      txt(minerO, miner + ' BTC');
      txt(etfO, etf + ' BTC');
      txt(otcO, otc + ' BTC');
      txt(netEl, (net >= 0 ? '+' : '') + net.toFixed(0) + ' BTC/天');
      txt(ratioEl, ratio.toFixed(2) + '×');
      if (net > 200) {
        txt(netHEl, '净吸收强劲');
        txt(ratioHEl, 'ETF 可覆盖矿工');
        txt(vEl, '需求 > 结构性抛压');
        txt(vhEl, '减半冲击易被吸收');
        tint(vEl, '#0f8a4d');
      } else if (net > 0) {
        txt(netHEl, '温和正吸收');
        txt(ratioHEl, '边际偏紧');
        txt(vEl, '均衡偏买');
        txt(vhEl, '—');
        tint(vEl, '#1d4ed8');
      } else {
        txt(netHEl, '抛压 > 吸收');
        txt(ratioHEl, '供给压力显性');
        txt(vEl, '折现或 demand 不足');
        txt(vhEl, '价格承压');
        tint(vEl, '#d5342c');
      }
      draw(miner, etf, otc, net);
    }

    minerEl.addEventListener('input', update);
    etfEl.addEventListener('input', update);
    otcEl.addEventListener('input', update);
    update();
  })();
})();
