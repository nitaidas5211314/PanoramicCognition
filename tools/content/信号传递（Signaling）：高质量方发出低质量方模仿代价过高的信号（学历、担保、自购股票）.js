/* ============================================================
   《信号传递（Signaling）》主题脚本
   四个可调模型：
     1. 离散分离均衡 IC 检验
     2. 连续教育：最小成本分离 e*
     3. 质保 / 担保信号
     4. 自购股票：押注可信度
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
  };

  function fit(cv, cssH) {
    if (!cv) return null;
    var dpr = window.devicePixelRatio || 1;
    var w = Math.max(240, cv.clientWidth || (cv.parentNode && cv.parentNode.clientWidth) || 640);
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(cssH * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: cssH };
  }
  function clear(g) { if (g) g.ctx.clearRect(0, 0, g.w, g.h); }
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }
  function bind(ids, fn) {
    ids.forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input', fn);
      el.addEventListener('change', fn);
    });
  }
  function axisY(ctx, pl, y1, pt, bh, ymin, ymax, w) {
    ctx.strokeStyle = C.grid;
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    var span = ymax - ymin || 1;
    for (var i = 0; i <= 4; i++) {
      var v = ymin + (span * i) / 4;
      var y = y1 - ((v - ymin) / span) * bh;
      ctx.beginPath();
      ctx.moveTo(pl, y);
      ctx.lineTo(w - 16, y);
      ctx.stroke();
      ctx.fillText(v.toFixed(2), pl - 6, y + 3);
    }
  }
  function bars(cv, items, ymin, ymax) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    if (ymin == null || ymax == null) {
      var vs = items.map(function (x) { return x.v; });
      ymin = Math.min.apply(null, vs) - 0.2;
      ymax = Math.max.apply(null, vs) + 0.2;
      if (ymax <= ymin) { ymax = ymin + 1; }
    }
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    var barW = bw / (items.length * 1.45);
    var span = ymax - ymin || 1;
    items.forEach(function (it, i) {
      var x = pl + (i + 0.5) * (bw / items.length) - barW / 2;
      var y = y1 - ((it.v - ymin) / span) * bh;
      var zeroY = y1 - ((0 - ymin) / span) * bh;
      var top = Math.min(y, zeroY), bot = Math.max(y, zeroY);
      ctx.fillStyle = it.c;
      ctx.fillRect(x, top, barW, Math.max(2, bot - top));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(it.lab, x + barW / 2, y1 + 13);
      var lab = (typeof it.v === 'number' ? it.v.toFixed(2) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('净效用 / 成本', pl + bw, y1 + 31);
  }

  /* ── 1. 离散分离 IC ── */
  (function discrete() {
    if (!$('sg_yH')) return;
    var ids = ['sg_yH', 'sg_yL', 'sg_cH', 'sg_cL'];
    var cv = $('sgChart');

    function upd() {
      var yH = parseFloat($('sg_yH').value);
      var yL = parseFloat($('sg_yL').value);
      var cH = parseFloat($('sg_cH').value);
      var cL = parseFloat($('sg_cL').value);
      txt($('sg_yHO'), yH.toFixed(2));
      txt($('sg_yLO'), yL.toFixed(2));
      txt($('sg_cHO'), cH.toFixed(2));
      txt($('sg_cLO'), cL.toFixed(2));

      var uH = yH - cH;
      var uL = yL;
      var mimic = yH - cL;
      var icH = uH + 1e-12 >= uL;
      var icL = uL + 1e-12 >= mimic;
      var ok = icH && icL;
      var gap = yH - yL;

      txt($('sg_uH'), uH.toFixed(2));
      txt($('sg_uL'), uL.toFixed(2));
      txt($('sg_mim'), mimic.toFixed(2));
      txt($('sg_ok'), ok ? '分离成立' : '分离失败');
      tint($('sg_ok'), ok ? C.green : C.red);

      var msg, col;
      if (ok) {
        msg = 'IC 成立：cH=' + cH.toFixed(2) + ' ≤ Δy=' + gap.toFixed(2) +
          ' ≤ cL=' + cL.toFixed(2) + ' → H 发信号得 ' + uH.toFixed(2) +
          '，L 模仿得 ' + mimic.toFixed(2) + ' ≤ ' + uL.toFixed(2);
        col = C.green;
      } else if (!icL) {
        msg = 'L 愿模仿：yH−cL=' + mimic.toFixed(2) + ' > yL=' + uL.toFixed(2) +
          ' → 信号被污染，分离崩溃';
        col = C.red;
      } else {
        msg = 'H 不愿发信号：yH−cH=' + uH.toFixed(2) + ' < yL=' + uL.toFixed(2) +
          ' → 高类型放弃分离';
        col = C.amber;
      }
      txt($('sg_vh'), msg);
      tint($('sg_vh'), col);

      bars(cv, [
        { lab: 'H发信号', v: uH, c: C.green },
        { lab: 'L不发', v: uL, c: C.blue },
        { lab: 'L模仿', v: mimic, c: C.red },
        { lab: 'Δy', v: gap, c: C.amber }
      ], Math.min(uH, uL, mimic, 0) - 0.3, Math.max(uH, uL, mimic, gap) + 0.3);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 2. 连续最小成本分离 ── */
  (function continuous() {
    if (!$('ed_yH')) return;
    var ids = ['ed_yH', 'ed_yL', 'ed_thH', 'ed_thL'];
    var cv = $('edChart');

    function upd() {
      var yH = parseFloat($('ed_yH').value);
      var yL = parseFloat($('ed_yL').value);
      var thH = parseFloat($('ed_thH').value);
      var thL = parseFloat($('ed_thL').value);
      txt($('ed_yHO'), yH.toFixed(2));
      txt($('ed_yLO'), yL.toFixed(2));
      txt($('ed_thHO'), thH.toFixed(2));
      txt($('ed_thLO'), thL.toFixed(2));

      var d = yH - yL;
      var eMin = d * thL;
      var eMax = d * thH;
      var feas = eMin <= eMax + 1e-12 && thH > thL;
      var eStar = feas ? eMin : NaN;
      var costH = feas ? eStar / thH : NaN;
      var uH = feas ? yH - costH : NaN;
      var waste = feas ? costH : NaN;

      txt($('ed_emin'), feas ? eStar.toFixed(2) : '—');
      txt($('ed_emax'), feas ? eMax.toFixed(2) : '—');
      txt($('ed_waste'), feas ? waste.toFixed(2) : '—');
      txt($('ed_uH'), feas ? uH.toFixed(2) : '—');

      var msg, col;
      if (!(thH > thL)) {
        msg = '单交叉失败：θH 必须 > θL（高类型边际教育成本更低）';
        col = C.red;
      } else if (!feas) {
        msg = '区间空：eMin=' + eMin.toFixed(2) + ' > eMax=' + eMax.toFixed(2);
        col = C.red;
      } else {
        msg = '最小成本分离 e*=' + eStar.toFixed(2) +
          '（∈[' + eMin.toFixed(2) + ',' + eMax.toFixed(2) + ']）；H 信号成本 ' +
          waste.toFixed(2) + '，净效用 ' + uH.toFixed(2) + '；相对完备信息浪费 ' + waste.toFixed(2);
        col = C.green;
      }
      txt($('ed_vh'), msg);
      tint($('ed_vh'), col);

      if (feas) {
        bars(cv, [
          { lab: 'e*', v: eStar, c: C.blue },
          { lab: 'eMax', v: eMax, c: C.amber },
          { lab: 'H成本', v: waste, c: C.red },
          { lab: 'H净效', v: uH, c: C.green },
          { lab: 'L工资', v: yL, c: C.ink2 }
        ], 0, Math.max(eMax, uH, yH) + 0.3);
      } else {
        bars(cv, [
          { lab: 'eMin', v: eMin, c: C.red },
          { lab: 'eMax', v: eMax, c: C.amber }
        ], Math.min(0, eMin, eMax) - 0.2, Math.max(eMin, eMax, 1) + 0.2);
      }
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 3. 质保信号 ── */
  (function warranty() {
    if (!$('wr_pH')) return;
    var ids = ['wr_pH', 'wr_pL', 'wr_R', 'wr_prem'];
    var cv = $('wrChart');

    function upd() {
      var pH = parseFloat($('wr_pH').value) / 100;
      var pL = parseFloat($('wr_pL').value) / 100;
      var R = parseFloat($('wr_R').value);
      var prem = parseFloat($('wr_prem').value);
      txt($('wr_pHO'), (pH * 100).toFixed(1) + '%');
      txt($('wr_pLO'), (pL * 100).toFixed(1) + '%');
      txt($('wr_RO'), '¥' + R.toFixed(0));
      txt($('wr_premO'), '¥' + prem.toFixed(0));

      var cH = pH * R;
      var cL = pL * R;
      var netH = prem - cH;
      var netL = prem - cL;
      var sep = netH >= -1e-9 && netL < -1e-9;

      txt($('wr_cH'), '¥' + cH.toFixed(0));
      txt($('wr_cL'), '¥' + cL.toFixed(0));
      txt($('wr_netH'), '¥' + netH.toFixed(0));
      txt($('wr_ok'), sep ? '可分离' : '不可分离');
      tint($('wr_ok'), sep ? C.green : C.red);

      var msg, col;
      if (sep) {
        msg = 'H 期望保修成本 ¥' + cH.toFixed(0) + ' ≤ 溢价 ¥' + prem.toFixed(0) +
          '，L 成本 ¥' + cL.toFixed(0) + ' > 溢价 → 低质方模仿亏钱，信号可信';
        col = C.green;
      } else if (netL >= 0) {
        msg = 'L 也能赚：溢价 ¥' + prem.toFixed(0) + ' ≥ L 成本 ¥' + cL.toFixed(0) +
          ' → 质保被模仿，信号失效';
        col = C.red;
      } else {
        msg = 'H 也不愿提供：溢价 ¥' + prem.toFixed(0) + ' < H 成本 ¥' + cH.toFixed(0) +
          ' → 无人发信号';
        col = C.amber;
      }
      txt($('wr_vh'), msg);
      tint($('wr_vh'), col);

      bars(cv, [
        { lab: 'H成本', v: cH, c: C.green },
        { lab: 'L成本', v: cL, c: C.red },
        { lab: '溢价', v: prem, c: C.blue },
        { lab: 'H净', v: netH, c: netH >= 0 ? C.green : C.amber },
        { lab: 'L净', v: netL, c: netL >= 0 ? C.red : C.ink2 }
      ], Math.min(0, cH, cL, prem, netH, netL) - 20, Math.max(cH, cL, prem, netH, netL) + 20);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 4. 自购押注 ── */
  (function stake() {
    if (!$('st_amt')) return;
    var ids = ['st_amt', 'st_down', 'st_gain'];
    var cv = $('stChart');

    function upd() {
      var amt = parseFloat($('st_amt').value);
      var down = parseFloat($('st_down').value) / 100;
      var gain = parseFloat($('st_gain').value);
      txt($('st_amtO'), '¥' + amt.toFixed(0) + '万');
      txt($('st_downO'), (down * 100).toFixed(0) + '%');
      txt($('st_gainO'), '¥' + gain.toFixed(0) + '万');

      var cost = amt * down;
      var ok = cost + 1e-12 >= gain;
      var margin = cost - gain;

      txt($('st_cost'), '¥' + cost.toFixed(1) + '万');
      txt($('st_marg'), '¥' + margin.toFixed(1) + '万');
      txt($('st_ok'), ok ? '可信' : '不可信');
      tint($('st_ok'), ok ? C.green : C.red);

      var msg, col;
      if (ok) {
        msg = '假信号期望自损 ¥' + cost.toFixed(1) + '万 ≥ 假信号收益 ¥' +
          gain.toFixed(1) + '万 → 低质/虚假方不愿模仿，自购可加强信号';
        col = C.green;
      } else {
        msg = '假信号仍划算：自损 ¥' + cost.toFixed(1) + '万 < 收益 ¥' +
          gain.toFixed(1) + '万 → 「口嗨回购+象征性买入」可被模仿';
        col = C.red;
      }
      txt($('st_vh'), msg);
      tint($('st_vh'), col);

      bars(cv, [
        { lab: '自损成本', v: cost, c: C.red },
        { lab: '假信号利', v: gain, c: C.amber },
        { lab: '可信余量', v: margin, c: ok ? C.green : C.red }
      ], Math.min(0, cost, gain, margin) - 2, Math.max(cost, gain, margin, 1) + 2);
    }
    bind(ids, upd);
    upd();
  })();
})();
