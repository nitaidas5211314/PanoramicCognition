/* ============================================================
   《美债》主题脚本
   四个可调模型（滑块全部真实参与计算）：
     1. 久期敏感度    — 修正久期 × Δy → 价格变动
     2. 实际利率分解  — 名义 − 盈亏平衡通胀 = 实际
     3. 利息支出螺旋  — 存量 × 平均利率 + 新增赤字
     4. 曲线陡峭度    — 短端 vs 长端持有期累计回报
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', ink3: '#7c848f', ink2: '#454c56'
  };

  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }
  function num(v) { return parseFloat(v); }

  function fit(cv, cssH) {
    if (!cv) return null;
    var dpr = window.devicePixelRatio || 1;
    var w = Math.max(240, cv.clientWidth || 640);
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(cssH * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: cssH };
  }
  function clear(g) { if (g) g.ctx.clearRect(0, 0, g.w, g.h); }

  function macMod(cpnPct, ytmPct, years, freq) {
    freq = freq || 2;
    var c = cpnPct / freq / 100;
    var y = ytmPct / freq / 100;
    var n = years * freq;
    var pv = 0;
    var wtd = 0;
    var i;
    for (i = 1; i <= n; i++) {
      var cf = i === n ? c + 1 : c;
      var df = Math.pow(1 + y, -i);
      pv += cf * df;
      wtd += i * cf * df;
    }
    var mac = wtd / pv / freq;
    return { mac: mac, mod: mac / (1 + ytmPct / (freq * 100)) };
  }

  /* ══════════════════════════════════════════════════════════
     工具 1 · 久期敏感度
     ══════════════════════════════════════════════════════════ */
  (function durationTool() {
    var matEl = $('us_mat'), cpnEl = $('us_cpn'), ytmEl = $('us_ytm'), shkEl = $('us_shk');
    if (!matEl || !cpnEl || !ytmEl || !shkEl) return;
    var matO = $('us_matO'), cpnO = $('us_cpnO'), ytmO = $('us_ytmO'), shkO = $('us_shkO');
    var modEl = $('us_mod'), dpEl = $('us_dp');
    var modhEl = $('us_modh'), dphEl = $('us_dph');
    var vEl = $('us_v'), vhEl = $('us_vh');
    var cv = $('usDurChart');

    function upd() {
      var years = num(matEl.value);
      var cpn = num(cpnEl.value);
      var ytm = num(ytmEl.value);
      var shk = num(shkEl.value);
      var dm = macMod(cpn, ytm, years);
      var dP = -dm.mod * shk;

      txt(matO, years.toFixed(0) + ' 年');
      txt(cpnO, cpn.toFixed(1) + '%');
      txt(ytmO, ytm.toFixed(2) + '%');
      txt(shkO, (shk >= 0 ? '+' : '') + shk.toFixed(0) + ' bp');
      txt(modEl, dm.mod.toFixed(2));
      txt(modhEl, 'Macaulay ' + dm.mac.toFixed(2) + ' 年 · 半年付息');
      txt(dpEl, (dP >= 0 ? '+' : '') + dP.toFixed(1) + '%');
      txt(dphEl, 'ΔP/P ≈ −ModDur × Δy');

      var label, hint, col;
      if (Math.abs(dP) >= 8) {
        label = '利率冲击大'; hint = '久期 × 100bp 接近或超过 8%——长债对加息极敏感';
        col = 'var(--red)';
      } else if (Math.abs(dP) >= 4) {
        label = '中等敏感'; hint = '典型 5–10 年国债区间；配置需匹配负债期限';
        col = 'var(--amber)';
      } else {
        label = '低敏感'; hint = '短端或高票息缓冲；更像现金+而非纯利率赌注';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(years, dm.mod, dP);
    }

    function draw(years, mod, dP) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 56, pr = 20, y1 = h - 46, bw = W - pl - pr;
      var mats = [2, 5, 10, 20, 30];
      var mods = mats.map(function (m) { return macMod(4.5, 4.78, m).mod; });
      var maxM = 20;
      ctx.strokeStyle = C.grid;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 20) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxM * i / 4).toFixed(0), pl - 4, yy + 3);
      }
      var barW = bw / mats.length * 0.65;
      mods.forEach(function (m, idx) {
        var x = pl + idx * (bw / mats.length) + barW * 0.18;
        var bh = (m / maxM) * (y1 - 24);
        var isCur = Math.abs(mats[idx] - years) < 1.5;
        ctx.fillStyle = isCur ? C.red : C.blue;
        ctx.globalAlpha = isCur ? 1 : 0.45;
        ctx.fillRect(x, y1 - bh, barW, bh);
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(mats[idx] + 'Y', x + barW / 2, y1 + 13);
      });
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('修正久期（票息 4.5%、YTM 4.78%）', pl + bw / 2, y1 + 31);
    }

    [matEl, cpnEl, ytmEl, shkEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 实际利率分解
     ══════════════════════════════════════════════════════════ */
  (function realYield() {
    var nomEl = $('us_nom'), beEl = $('us_be');
    if (!nomEl || !beEl) return;
    var nomO = $('us_nomO'), beO = $('us_beO');
    var realEl = $('us_real'), spreadEl = $('us_spread');
    var realhEl = $('us_realh'), spreadhEl = $('us_sph');
    var vEl = $('us_rv'), vhEl = $('us_rvh');

    function upd() {
      var nom = num(nomEl.value);
      var be = num(beEl.value);
      var real = nom - be;

      txt(nomO, nom.toFixed(2) + '%');
      txt(beO, be.toFixed(2) + '%');
      txt(realEl, real.toFixed(2) + '%');
      txt(realhEl, '名义 10Y − TIPS 盈亏平衡');
      txt(spreadEl, (real >= 0 ? '+' : '') + real.toFixed(2) + ' pp');
      txt(spreadhEl, '实际利率 = 真实购买力回报');

      var label, hint, col;
      if (real >= 2.5) {
        label = '紧缩金融条件'; hint = '实际利率高位——压制估值与杠杆，长债吸引力来自「真实」补偿';
        col = 'var(--red)';
      } else if (real >= 0.5) {
        label = '正实际利率'; hint = '2026 年 9 月基线区间：10Y 约 4.78%、BE 约 2.17%【事实·Fed H.15】';
        col = 'var(--amber)';
      } else if (real >= -0.5) {
        label = '实际利率贴近零'; hint = '名义收益被通胀预期吃掉大半';
        col = 'var(--blue)';
      } else {
        label = '负实际利率'; hint = '持有名义国债仍可能跑输通胀——TIPS 或短端更合理';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
    }

    [nomEl, beEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 利息支出螺旋
     ══════════════════════════════════════════════════════════ */
  (function interestSpiral() {
    var debtEl = $('us_debt'), rateEl = $('us_rate'), defEl = $('us_def');
    if (!debtEl || !rateEl || !defEl) return;
    var debtO = $('us_debtO'), rateO = $('us_rateO'), defO = $('us_defO');
    var intEl = $('us_int'), shareEl = $('us_share');
    var inthEl = $('us_inth'), sharehEl = $('us_shareh');
    var vEl = $('us_iv'), vhEl = $('us_ivh');
    var cv = $('usIntChart');

    function upd() {
      var debt = num(debtEl.value);
      var rate = num(rateEl.value);
      var defPct = num(defEl.value);
      var interest = debt * rate / 100;
      var gdp = 28.5;
      var share = interest / gdp * 100;
      var defDollar = gdp * defPct / 100;

      txt(debtO, '$' + debt.toFixed(1) + ' 万亿');
      txt(rateO, rate.toFixed(1) + '%');
      txt(defO, defPct.toFixed(1) + '% GDP');
      txt(intEl, '$' + interest.toFixed(2) + ' 万亿/年');
      txt(inthEl, '公众持有 × 加权平均利率（简化）');
      txt(shareEl, share.toFixed(1) + '% GDP');
      txt(sharehEl, 'FY2025 净利息已超 $1 万亿【事实·Treasury Bulletin】');

      var label, hint, col;
      if (share >= 4) {
        label = '利息挤压'; hint = '净利息接近或超过国防支出——财政空间被「过去借债」占用';
        col = 'var(--red)';
      } else if (share >= 2.5) {
        label = '利息抬升'; hint = '高利率 + 高存量 → 即使赤字不变，利息也自我强化';
        col = 'var(--amber)';
      } else {
        label = '可控区间'; hint = '低利率时代的路径——勿当作 2026 基线';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(debt, rate, defPct, gdp);
    }

    function draw(debt0, rate, defPct, gdp) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 48, pr = 16, y1 = h - 46, bw = W - pl - pr;
      var yrs = 10;
      var ints = [], debts = [debt0];
      var d = debt0;
      for (var t = 1; t <= yrs; t++) {
        var intT = d * rate / 100;
        ints.push(intT);
        d = d + gdp * defPct / 100 + intT * 0.85;
        debts.push(d);
      }
      var maxI = Math.max.apply(null, ints) * 1.1;
      ctx.strokeStyle = C.grid;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 18) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText('$' + (maxI * i / 4).toFixed(1) + 'T', pl - 4, yy + 3);
      }
      ctx.strokeStyle = C.red; ctx.lineWidth = 2;
      ctx.beginPath();
      ints.forEach(function (v, idx) {
        var x = pl + (idx + 0.5) * bw / yrs;
        var y = y1 - (v / maxI) * (y1 - 22);
        if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.fillStyle = C.red; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('净利息路径', pl + bw, 16);
      ctx.fillStyle = C.ink2; ctx.textAlign = 'center';
      ctx.fillText('年份（简化：利息 85% 滚入新债）', pl + bw / 2, y1 + 13);
      ctx.fillText('年度净利息（万亿美元）', pl + bw / 2, y1 + 31);
    }

    [debtEl, rateEl, defEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 曲线 steepness / 持有回报
     累计回报 ≈ 票息 + 久期×Δy（一阶）
     ══════════════════════════════════════════════════════════ */
  (function curveCarry() {
    var shortEl = $('us_short'), longEl = $('us_long'), horizonEl = $('us_horizon'), dyEl = $('us_dy');
    if (!shortEl || !longEl || !horizonEl || !dyEl) return;
    var shortO = $('us_shortO'), longO = $('us_longO'), horizonO = $('us_horizonO'), dyO = $('us_dyO');
    var retSEl = $('us_retS'), retLEl = $('us_retL'), diffEl = $('us_diff');
    var retShEl = $('us_retSh'), retLhEl = $('us_retLh'), diffhEl = $('us_diffh');
    var vEl = $('us_cv'), vhEl = $('us_cvh');
    var cv = $('usCurveChart');

    function ncdf(x) {
      var s = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2;
      var t = 1 / (1 + 0.3275911 * z);
      var y = 1 - (t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 +
              t * (-1.453152027 + t * 1.061405429))))) * Math.exp(-z * z);
      return 0.5 * (1 + s * y);
    }

    function upd() {
      var ys = num(shortEl.value);
      var yl = num(longEl.value);
      var H = num(horizonEl.value);
      var dy = num(dyEl.value);
      var modL = macMod(4.5, yl, 10).mod;

      var retS = ys * H / 12;
      var retL = yl * H / 12 - modL * dy / 100;
      var diff = retL - retS;

      txt(shortO, ys.toFixed(2) + '%');
      txt(longO, yl.toFixed(2) + '%');
      txt(horizonO, H.toFixed(0) + ' 月');
      txt(dyO, (dy >= 0 ? '+' : '') + dy.toFixed(0) + ' bp');
      txt(retSEl, (retS >= 0 ? '+' : '') + retS.toFixed(2) + '%');
      txt(retShEl, '短端（3M 类）票息近似');
      txt(retLEl, (retL >= 0 ? '+' : '') + retL.toFixed(2) + '%');
      txt(retLhEl, '长端票息 − 久期×Δy（10Y 代理）');
      txt(diffEl, (diff >= 0 ? '+' : '') + diff.toFixed(2) + ' pp');
      txt(diffhEl, '长债超额 = 期限溢价 − 利率冲击');

      var mu = 0.02, sigma = 0.06, T = H / 21;
      var pb = ncdf(mu * T / (sigma * Math.sqrt(T)));

      var label, hint, col;
      if (diff < 0) {
        label = '长端跑输'; hint = '加息冲击压过长端票息—— steepening 未必利好长债';
        col = 'var(--red)';
      } else if (diff < 0.5) {
        label = '超额微薄'; hint = '对照基准：随机做多长债 60 日胜率约 ' + (pb * 100).toFixed(0) + '%（μ=2%、σ=6% 简化）';
        col = 'var(--amber)';
      } else {
        label = '期限溢价兑现'; hint = '利率稳定或下行时长端才体现 carry+roll';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(ys, yl, H, retS, retL);
    }

    function draw(ys, yl, H, retS, retL) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 72, pr = 24, y1 = h - 46, bw = W - pl - pr;
      var mid = (y1 + 20) / 2;
      var maxR = Math.max(Math.abs(retS), Math.abs(retL), 1) * 1.2;
      var sx = function (r) { return pl + (r + maxR) / (2 * maxR) * bw; };
      ctx.strokeStyle = C.grid;
      ctx.beginPath(); ctx.moveTo(sx(0), 18); ctx.lineTo(sx(0), y1); ctx.stroke();
      var rows = [
        { label: '短端', r: retS, col: C.blue },
        { label: '长端 10Y', r: retL, col: C.red }
      ];
      rows.forEach(function (row, i) {
        var y = mid - 20 + i * 44;
        ctx.fillStyle = C.ink2; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(row.label, pl - 8, y + 4);
        ctx.fillStyle = '#eef1f5';
        ctx.fillRect(pl, y - 10, bw, 20);
        var x0 = sx(Math.min(0, row.r));
        var x1 = sx(Math.max(0, row.r));
        ctx.fillStyle = row.col;
        ctx.fillRect(x0, y - 10, Math.max(2, x1 - x0), 20);
        ctx.fillStyle = row.col; ctx.textAlign = 'left';
        ctx.font = '700 11px sans-serif';
        ctx.fillText((row.r >= 0 ? '+' : '') + row.r.toFixed(2) + '%', x1 + 6, y + 4);
      });
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(H + ' 个月持有期累计回报（%）', pl + bw / 2, y1 + 13);
      ctx.fillText('负值=净亏损（利率上行冲击）', pl + bw / 2, y1 + 31);
    }

    [shortEl, longEl, horizonEl, dyEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
