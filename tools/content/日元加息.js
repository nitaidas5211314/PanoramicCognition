/* ============================================================
   《日元加息》主题脚本
   四个可调模型：
     1. 套息收益分解器  — 利差 + 汇率变动 → 总回报
     2. 美日利差传导器  — 政策利差 × 期限 → 隐含 USD/JPY
     3. 平仓冲击估算器  — 日元升值 × 头寸 → 被迫卖压
     4. 实际利率仪表盘  — 政策利率 − 核心 CPI
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

  /* ══════════════════════════════════════════════════════════
     工具 1 · 套息收益分解器
     总回报 ≈ (r_US − r_JP) × 月/12 + USD/JPY 变动%
     USD/JPY 下跌（负值）= 日元升值 = 套息者 FX 损失
     ══════════════════════════════════════════════════════════ */
  (function carryTool() {
    var rjEl = $('cy_rj'), rusEl = $('cy_rus'), fxEl = $('cy_fx'), moEl = $('cy_mo');
    if (!rjEl || !rusEl || !fxEl || !moEl) return;
    var rjO = $('cy_rjO'), rusO = $('cy_rusO'), fxO = $('cy_fxO'), moO = $('cy_moO');
    var carryEl = $('cy_carry'), fxEl2 = $('cy_fxpl'), totEl = $('cy_total');
    var carryhEl = $('cy_carryh'), fxhEl = $('cy_fxplh'), tothEl = $('cy_totalh');
    var vEl = $('cy_v'), vhEl = $('cy_vh');
    var cv = $('cyChart');

    function upd() {
      var rj = num(rjEl.value), rus = num(rusEl.value);
      var fx = num(fxEl.value), mo = num(moEl.value);
      var carry = (rus - rj) * mo / 12;
      var total = carry + fx;

      txt(rjO, rj.toFixed(2) + '%');
      txt(rusO, rus.toFixed(2) + '%');
      txt(fxO, (fx >= 0 ? '+' : '') + fx.toFixed(1) + '%');
      txt(moO, mo.toFixed(0) + ' 月');
      txt(carryEl, (carry >= 0 ? '+' : '') + carry.toFixed(2) + '%');
      txt(carryhEl, '借日元、投美元端的年化利差 × 持有月/12');
      txt(fxEl2, (fx >= 0 ? '+' : '') + fx.toFixed(2) + '%');
      txt(fxhEl, 'USD/JPY 变动；负值 = 日元升值 = 套息 FX 损');
      txt(totEl, (total >= 0 ? '+' : '') + total.toFixed(2) + '%');
      txt(tothEl, '利差收益 + 汇率损益（简化，忽略基差）');

      var label, hint, col;
      if (total >= 2) {
        label = '套息仍有利'; hint = '利差盖过汇率逆风——但波动上升时杠杆会放大回撤';
        col = 'var(--red)';
      } else if (total >= 0) {
        label = '勉强为正'; hint = '收益薄，margin 一点波动就可能触发平仓';
        col = 'var(--amber)';
      } else if (total >= -3) {
        label = '套息转亏'; hint = '2024-08 典型区间：加息 + 日元急升 → 总回报转负';
        col = 'var(--green)';
      } else {
        label = '大幅亏损'; hint = '类似 161→141（日元 +12.4%）叠加利差仍不够补';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(rj, rus, carry, fx, total);
    }

    function draw(rj, rus, carry, fx, total) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 56, pr = 20, y1 = h - 46, bw = W - pl - pr;
      var mid = (y1 + 24) / 2;
      var maxB = 8;
      var bars = [
        { n: '利差', v: carry, col: C.blue },
        { n: '汇率', v: fx, col: fx >= 0 ? C.red : C.green },
        { n: '合计', v: total, col: total >= 0 ? C.red : C.green }
      ];
      ctx.strokeStyle = C.grid;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 20) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxB * i / 4 - maxB / 2).toFixed(0) + '%', pl - 4, yy + 3);
      }
      ctx.beginPath(); ctx.moveTo(pl, mid); ctx.lineTo(pl + bw, mid);
      ctx.strokeStyle = C.ink2; ctx.lineWidth = 1; ctx.stroke(); ctx.lineWidth = 1;
      var barW = bw / bars.length * 0.55;
      bars.forEach(function (b, idx) {
        var x = pl + idx * (bw / bars.length) + barW * 0.22;
        var bh = Math.abs(b.v) / maxB * (mid - 24);
        var y = b.v >= 0 ? mid - bh : mid;
        ctx.fillStyle = b.col;
        ctx.fillRect(x, y, barW, bh || 1);
        ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(b.n, x + barW / 2, y1 + 13);
      });
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('套息总回报分解（%）', pl + bw / 2, y1 + 31);
    }

    [rjEl, rusEl, fxEl, moEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 美日利差传导器
     隐含 USD/JPY 变动 ≈ −(i_US − i_JP) × 月/12（演示 UIP 线性近似）
     ══════════════════════════════════════════════════════════ */
  (function spreadTool() {
    var jpEl = $('sp_jp'), usEl = $('sp_us'), moEl = $('sp_mo');
    if (!jpEl || !usEl || !moEl) return;
    var jpO = $('sp_jpO'), usO = $('sp_usO'), moO = $('sp_moO');
    var sprEl = $('sp_spr'), implEl = $('sp_impl');
    var sprhEl = $('sp_sprh'), implhEl = $('sp_implh');
    var vEl = $('sp_v'), vhEl = $('sp_vh');
    var cv = $('spChart');

    function upd() {
      var jp = num(jpEl.value), us = num(usEl.value), mo = num(moEl.value);
      var spr = us - jp;
      var impl = -spr * mo / 12;

      txt(jpO, jp.toFixed(2) + '%');
      txt(usO, us.toFixed(2) + '%');
      txt(moO, mo.toFixed(0) + ' 月');
      txt(sprEl, (spr >= 0 ? '+' : '') + spr.toFixed(2) + ' pp');
      txt(sprhEl, '美 − 日政策/短端代理');
      txt(implEl, (impl >= 0 ? '+' : '') + impl.toFixed(2) + '%');
      txt(implhEl, '负值 → USD/JPY 下行 → 日元升值');

      var label, hint, col;
      if (spr >= 3.5) {
        label = '套息空间仍宽'; hint = '美日利差大——但 BOJ 加息路径会压缩 spread';
        col = 'var(--red)';
      } else if (spr >= 1.5) {
        label = '利差收窄中'; hint = '2025–26 正常化中段：carry 吸引力下降';
        col = 'var(--amber)';
      } else {
        label = '利差接近抹平'; hint = '日元融资优势消失——宏观套息难以为继';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(jp, us, mo, spr, impl);
    }

    function draw(jp, us, mo, spr, impl) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 52, pr = 16, y1 = h - 46, bw = W - pl - pr;
      var pts = [];
      var m;
      for (m = 1; m <= 24; m++) {
        pts.push({ m: m, v: -(us - jp) * m / 12 });
      }
      var T = Math.min(24, Math.max(12, Math.ceil((mo + 3) / 6) * 6));
      pts = pts.filter(function (p) { return p.m <= T; });
      var minV = Math.min.apply(null, pts.map(function (p) { return p.v; }));
      var maxV = Math.max.apply(null, pts.map(function (p) { return p.v; }));
      var pad = 0.5;
      minV -= pad; maxV += pad;
      var rng = maxV - minV || 1;
      function sx(m) { return pl + (m / T) * bw; }
      function sy(v) { return y1 - ((v - minV) / rng) * (y1 - 24); }
      ctx.strokeStyle = C.grid;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 20) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((minV + rng * i / 4).toFixed(1) + '%', pl - 4, yy + 3);
      }
      ctx.beginPath();
      pts.forEach(function (p, idx) {
        if (idx === 0) ctx.moveTo(sx(p.m), sy(p.v));
        else ctx.lineTo(sx(p.m), sy(p.v));
      });
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
      var cur = -(us - jp) * mo / 12;
      var cx = sx(mo), cy = sy(cur);
      ctx.fillStyle = C.red;
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('UIP 线性近似 · 忽略风险溢价', pl + bw, 16);
      ctx.textAlign = 'center';
      ctx.fillText('持有月数 → 隐含 USD/JPY 变动（%）', pl + bw / 2, y1 + 31);
    }

    [jpEl, usEl, moEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 平仓冲击估算器
     被迫卖压 ≈ 头寸 × 升值% × 0.25（简化杠杆系数）
     ══════════════════════════════════════════════════════════ */
  (function unwindTool() {
    var apEl = $('uw_aprec'), posEl = $('uw_pos');
    if (!apEl || !posEl) return;
    var apO = $('uw_aprecO'), posO = $('uw_posO');
    var sellEl = $('uw_sell'), usdEl = $('uw_usd');
    var sellhEl = $('uw_sellh'), usdhEl = $('uw_usdh');
    var vEl = $('uw_v'), vhEl = $('uw_vh');
    var cv = $('uwChart');

    function upd() {
      var ap = num(apEl.value), pos = num(posEl.value);
      var sell = pos * ap / 100 * 0.25;
      var usdBn = sell * 1000 / 150;

      txt(apO, ap.toFixed(1) + '%');
      txt(posO, '¥' + pos.toFixed(0) + ' 万亿');
      txt(sellEl, '¥' + sell.toFixed(2) + ' 万亿');
      txt(sellhEl, 'BIS 中值 ¥40 万亿 × 5% × 0.25 = ¥0.5 万亿【推论】');
      txt(usdEl, '$' + (usdBn * 10).toFixed(0) + ' 亿');
      txt(usdhEl, '¥' + sell.toFixed(2) + ' 万亿 ÷ 150 ≈ $' + usdBn.toFixed(1) + ' 十亿');

      var label, hint, col;
      if (ap >= 8) {
        label = '系统性 unwind 区'; hint = '接近 2024-08：TOPIX 单日 −12%、VIX 飙升';
        col = 'var(--green)';
      } else if (ap >= 4) {
        label = '显著平仓'; hint = '跨资产去杠杆——美股、EM、crypto 同步承压';
        col = 'var(--amber)';
      } else {
        label = '温和调整'; hint = '2025-12 加息后「卖事实」——头寸已部分出清';
        col = 'var(--blue)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(ap, pos, sell);
    }

    function draw(ap, pos, sell) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 56, pr = 20, y1 = h - 46, bw = W - pl - pr;
      var aps = [2, 5, 8, 12];
      var sells = aps.map(function (a) { return pos * a / 100 * 0.25; });
      var maxS = Math.max.apply(null, sells.concat([1]));
      ctx.strokeStyle = C.grid;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 20) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxS * i / 4).toFixed(1), pl - 4, yy + 3);
      }
      var barW = bw / aps.length * 0.55;
      aps.forEach(function (a, idx) {
        var s = pos * a / 100 * 0.25;
        var x = pl + idx * (bw / aps.length) + barW * 0.22;
        var bh = (s / maxS) * (y1 - 24);
        var isCur = Math.abs(a - ap) < 0.6;
        ctx.fillStyle = isCur ? C.green : C.amber;
        ctx.globalAlpha = isCur ? 1 : 0.5;
        ctx.fillRect(x, y1 - bh, barW, bh);
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('+' + a + '%', x + barW / 2, y1 + 13);
      });
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('日元升值幅度 → 估算被迫卖压（万亿日元）', pl + bw / 2, y1 + 31);
    }

    [apEl, posEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 实际利率仪表盘
     实际政策利率 ≈ 政策利率 − 核心 CPI
     ══════════════════════════════════════════════════════════ */
  (function realRateTool() {
    var polEl = $('rr_pol'), cpiEl = $('rr_cpi');
    if (!polEl || !cpiEl) return;
    var polO = $('rr_polO'), cpiO = $('rr_cpiO');
    var realEl = $('rr_real'), gapEl = $('rr_gap');
    var realhEl = $('rr_realh'), gaphEl = $('rr_gaph');
    var vEl = $('rr_v'), vhEl = $('rr_vh');
    var cv = $('rrChart');

    function upd() {
      var pol = num(polEl.value), cpi = num(cpiEl.value);
      var real = pol - cpi;
      var gap = 2.0 - pol;

      txt(polO, pol.toFixed(2) + '%');
      txt(cpiO, cpi.toFixed(1) + '%');
      txt(realEl, (real >= 0 ? '+' : '') + real.toFixed(2) + '%');
      txt(realhEl, '政策利率 − 核心 CPI（简化）');
      txt(gapEl, (gap >= 0 ? '+' : '') + gap.toFixed(2) + ' pp');
      txt(gaphEl, '距 BOJ 2% 目标的政策利率缺口');

      var label, hint, col;
      if (real >= 0) {
        label = '实际利率转正'; hint = '金融条件真正收紧——carry 融资成本上升';
        col = 'var(--red)';
      } else if (real >= -1) {
        label = '仍显著为负'; hint = '2025-12：0.75% − 2.5% = −1.75%【推论·已验算】';
        col = 'var(--amber)';
      } else {
        label = '深度负实际利率'; hint = '2016–2024 负利率时代遗留——正常化路还长';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(pol, cpi, real);
    }

    function draw(pol, cpi, real) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 56, pr = 20, y1 = h - 46, bw = W - pl - pr;
      var mid = (y1 + 24) / 2;
      var maxB = 4;
      var bars = [
        { n: '政策', v: pol, col: C.blue },
        { n: 'CPI', v: cpi, col: C.amber },
        { n: '实际', v: real, col: real >= 0 ? C.red : C.green }
      ];
      ctx.strokeStyle = C.grid;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 20) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxB * i / 4).toFixed(0) + '%', pl - 4, yy + 3);
      }
      var barW = bw / bars.length * 0.55;
      bars.forEach(function (b, idx) {
        var x = pl + idx * (bw / bars.length) + barW * 0.22;
        var bh = Math.abs(b.v) / maxB * (y1 - 24);
        var y = b.v >= 0 ? y1 - bh : y1;
        ctx.fillStyle = b.col;
        ctx.fillRect(x, y, barW, bh || 1);
        ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(b.n, x + barW / 2, y1 + 13);
      });
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('日本政策利率 vs 通胀（%）', pl + bw / 2, y1 + 31);
    }

    [polEl, cpiEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
