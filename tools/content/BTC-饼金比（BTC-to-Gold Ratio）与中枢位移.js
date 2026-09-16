/* ============================================================
   《BTC-饼金比与中枢位移》主题脚本
   四个可调模型：
     1. 饼金比计算器     — BTC ÷ 金价/盎司 → 相对购买力
     2. 中枢位移仪表盘   — 滚动中枢 + Z 偏离 + 位移速度
     3. 漂移剥离器       — 比值信号胜率 vs 随机持币基准
     4. 回撤修复模拟器   — 从谷底修复至目标比值的腿分解
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

  /* ══ 工具 1 · 饼金比计算器 ══ */
  (function ratioCalc() {
    var btcEl = $('bgr_btc'), goldEl = $('bgr_gold');
    if (!btcEl || !goldEl) return;
    var btcO = $('bgr_btcO'), goldO = $('bgr_goldO');
    var ratioEl = $('bgr_ratio'), ratioHEl = $('bgr_ratioh');
    var chgEl = $('bgr_chg'), chgHEl = $('bgr_chgh');
    var vEl = $('bgr_v'), vhEl = $('bgr_vh');
    var cv = $('bgrChart');
    var REF = 17.71;

    function zone(r) {
      if (r >= 28) return { t: '周期极值区', c: '#d5342c', h: '2025-10 峰约 28.8 oz——黄金相对弱势' };
      if (r >= 20) return { t: '偏强区', c: '#b8730a', h: 'BTC 显著跑赢黄金' };
      if (r >= 15) return { t: '中枢附近', c: '#454c56', h: '2026-09 读数约 17.7 oz，修复中' };
      if (r >= 12) return { t: '低位支撑区', c: '#0f8a4d', h: '2026-02 谷底约 12.3 oz——历次危机更高低点' };
      return { t: '极端低估', c: '#0f8a4d', h: '低于 2017 前水平——罕见' };
    }

    function draw(r) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 48, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var maxR = 35;
      var sx = function (v) { return pad.l + (v / maxR) * iw; };
      var bands = [
        { lo: 0, hi: 12, col: '#e8f5ee', label: '<12' },
        { lo: 12, hi: 18, col: '#f4f6f9', label: '12–18' },
        { lo: 18, hi: 28, col: '#fff7e6', label: '18–28' },
        { lo: 28, hi: maxR, col: '#fdf3f2', label: '>28' }
      ];
      bands.forEach(function (b) {
        ctx.fillStyle = b.col;
        ctx.fillRect(sx(b.lo), pad.t, sx(b.hi) - sx(b.lo), ih);
      });
      [12.31, 17.71, 28.79].forEach(function (ref, i) {
        var x = sx(ref);
        ctx.strokeStyle = i === 0 ? '#0f8a4d' : (i === 1 ? '#1d4ed8' : '#d5342c');
        ctx.setLineDash(i === 1 ? [] : [4, 3]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#7c848f';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ref.toFixed(1), x, y1 + 13);
      });
      var mx = sx(Math.min(r, maxR));
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(mx, pad.t); ctx.lineTo(mx, y1); ctx.stroke();
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath(); ctx.arc(mx, pad.t + ih * 0.5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#15181d';
      ctx.font = 'bold 12px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(r.toFixed(2) + ' oz', mx, pad.t + ih * 0.5 - 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('1 BTC 可买黄金（盎司）', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var btc = parseFloat(btcEl.value);
      var gold = parseFloat(goldEl.value);
      if (gold <= 0) return;
      var r = btc / gold;
      var chg = (r / REF - 1) * 100;
      var z = zone(r);
      txt(btcO, '$' + btc.toLocaleString('en-US', { maximumFractionDigits: 0 }));
      txt(goldO, '$' + gold.toLocaleString('en-US', { maximumFractionDigits: 0 }) + '/oz');
      txt(ratioEl, r.toFixed(2) + ' oz');
      txt(ratioHEl, '每 1 BTC 可买 ' + r.toFixed(2) + ' 盎司黄金');
      txt(chgEl, (chg >= 0 ? '+' : '') + chg.toFixed(1) + '%');
      txt(chgHEl, '相对 2026-09 基准 ' + REF + ' oz');
      txt(vEl, z.t);
      tint(vEl, z.c);
      txt(vhEl, z.h);
      draw(r);
    }

    btcEl.addEventListener('input', update);
    goldEl.addEventListener('input', update);
    update();
  })();

  /* ══ 工具 2 · 中枢位移仪表盘 ══ */
  (function centerShift() {
    var curEl = $('bgr_cur'), oldEl = $('bgr_old'), newEl = $('bgr_new'), stdEl = $('bgr_std');
    if (!curEl || !oldEl || !newEl || !stdEl) return;
    var curO = $('bgr_curO'), oldO = $('bgr_oldO'), newO = $('bgr_newO'), stdO = $('bgr_stdO');
    var zOldEl = $('bgr_zold'), zNewEl = $('bgr_znew');
    var shiftEl = $('bgr_shift'), shiftHEl = $('bgr_shifth');
    var vEl = $('bgr_v2'), vhEl = $('bgr_v2h');
    var cv = $('bgrCenterChart');

    function draw(cur, oldC, newC, std) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 52, r: 16, t: 22, b: 46 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 46;
      var lo = Math.min(oldC, newC, cur) - 2 * std;
      var hi = Math.max(oldC, newC, cur) + 2 * std;
      var sx = function (v) { return pad.l + ((v - lo) / (hi - lo)) * iw; };
      ctx.fillStyle = '#f4f6f9';
      ctx.fillRect(sx(oldC - std), pad.t, sx(oldC + std) - sx(oldC - std), ih);
      ctx.fillStyle = '#eaf0ff';
      ctx.fillRect(sx(newC - std), pad.t, sx(newC + std) - sx(newC - std), ih);
      [oldC, newC].forEach(function (c, i) {
        var x = sx(c);
        ctx.strokeStyle = i === 0 ? '#b8730a' : '#1d4ed8';
        ctx.setLineDash([5, 4]);
        ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, y1); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = i === 0 ? '#b8730a' : '#1d4ed8';
        ctx.font = '10px -apple-system,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((i === 0 ? '旧中枢 ' : '新中枢 ') + c.toFixed(1), x, pad.t + 12);
      });
      var cx = sx(cur);
      ctx.strokeStyle = '#15181d';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx, pad.t); ctx.lineTo(cx, y1); ctx.stroke();
      ctx.fillStyle = '#15181d';
      ctx.beginPath(); ctx.arc(cx, pad.t + ih * 0.55, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cur.toFixed(1), cx, pad.t + ih * 0.55 + 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('中枢位移 · 当前读数 vs 滚动均值', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var cur = parseFloat(curEl.value);
      var oldC = parseFloat(oldEl.value);
      var newC = parseFloat(newEl.value);
      var std = parseFloat(stdEl.value);
      if (std <= 0) return;
      var zOld = (cur - oldC) / std;
      var zNew = (cur - newC) / std;
      var shift = newC - oldC;
      txt(curO, cur.toFixed(2) + ' oz');
      txt(oldO, oldC.toFixed(1) + ' oz');
      txt(newO, newC.toFixed(1) + ' oz');
      txt(stdO, '±' + std.toFixed(1) + ' oz');
      txt(zOldEl, (zOld >= 0 ? '+' : '') + zOld.toFixed(2) + 'σ');
      txt(zNewEl, (zNew >= 0 ? '+' : '') + zNew.toFixed(2) + 'σ');
      txt(shiftEl, (shift >= 0 ? '+' : '') + shift.toFixed(1) + ' oz');
      txt(shiftHEl, '中枢下移 ' + Math.abs(shift).toFixed(1) + ' oz = 结构性位移');
      var msg, col, hint;
      if (Math.abs(zNew) < 0.5) {
        msg = '贴近新中枢'; col = '#454c56';
        hint = '均值回归叙事在此成立——但中枢本身在动';
      } else if (zNew < -1) {
        msg = '低于新中枢'; col = '#0f8a4d';
        hint = '相对新均衡偏低——逆向布局窗口（半衰期 ~216 日【待验证】）';
      } else {
        msg = '高于新中枢'; col = '#d5342c';
        hint = '相对新均衡偏高——黄金弱势或 BTC 过热';
      }
      txt(vEl, msg);
      tint(vEl, col);
      txt(vhEl, hint);
      draw(cur, oldC, newC, std);
    }

    [curEl, oldEl, newEl, stdEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 3 · 漂移剥离器 ══ */
  (function driftStrip() {
    var tEl = $('bgr_T'), psEl = $('bgr_ps'), muEl = $('bgr_mu'), sgEl = $('bgr_sg');
    if (!tEl || !psEl || !muEl || !sgEl) return;
    var tO = $('bgr_TO'), psO = $('bgr_psO'), muO = $('bgr_muO'), sgO = $('bgr_sgO');
    var baseEl = $('bgr_base'), dpEl = $('bgr_dp'), nEl = $('bgr_n');
    var vEl = $('bgr_v3'), vhEl = $('bgr_v3h');
    var cv = $('bgrDriftChart');

    function sampleN(pb, ps) {
      var d = ps - pb;
      if (d <= 0) return Infinity;
      var a = 1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps));
      return Math.ceil(a * a / (d * d));
    }

    function draw(pb, ps, T) {
      var s = fit(cv, 176);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 44, r: 12, t: 18, b: 36 };
      var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
      var y1 = h - 36;
      var maxP = 1;
      var sx = function (v) { return pad.l + (v / maxP) * iw; };
      var sy = function (p) { return pad.t + (1 - p) * ih; };
      ctx.strokeStyle = '#eef1f5';
      for (var gi = 0; gi <= 4; gi++) {
        var gy = pad.t + ih * gi / 4;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }
      var bx = sx(pb), sx2 = sx(ps);
      ctx.fillStyle = '#c9d0d9';
      ctx.fillRect(bx, sy(pb), sx2 - bx, sy(0) - sy(pb));
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(pad.l, sy(pb) - 2, bx - pad.l, 4);
      ctx.fillStyle = '#d5342c';
      ctx.fillRect(bx, sy(ps) - 2, sx2 - bx, 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('基准 ' + (pb * 100).toFixed(1) + '%', (pad.l + bx) / 2, y1);
      ctx.fillText('信号 ' + (ps * 100).toFixed(1) + '%', (bx + sx2) / 2, y1);
      ctx.fillStyle = '#15181d';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(T + ' 日持有 · 超额 = 信号 − 基准', pad.l + iw / 2, pad.t - 4);
    }

    function update() {
      var T = parseInt(tEl.value, 10);
      var ps = parseFloat(psEl.value) / 100;
      var mu = parseFloat(muEl.value) / 100;
      var sg = parseFloat(sgEl.value) / 100;
      var pb = ncdf(mu * (T / 252) / (sg * Math.sqrt(T / 252)));
      var dp = (ps - pb) * 100;
      var n = sampleN(pb, ps);
      txt(tO, T + ' 日');
      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(0) + '%');
      txt(sgO, (sg * 100).toFixed(0) + '%');
      txt(baseEl, (pb * 100).toFixed(1) + '%');
      txt(dpEl, (dp >= 0 ? '+' : '') + dp.toFixed(1) + ' pp');
      txt(nEl, isFinite(n) ? String(n) : '∞');
      var msg, col, hint;
      if (dp < 3) {
        msg = '超额有限'; col = '#b8730a';
        hint = '「比值触底买 BTC」的真实 alpha 可能被漂移吃掉';
      } else if (dp < 8) {
        msg = '中等超额'; col = '#454c56';
        hint = '需 n≥' + n + ' 次独立信号才谈统计显著';
      } else {
        msg = '显著超额'; col = '#0f8a4d';
        hint = '但仍需确认中枢未继续下移';
      }
      txt(vEl, msg);
      tint(vEl, col);
      txt(vhEl, hint);
      draw(pb, ps, T);
    }

    [tEl, psEl, muEl, sgEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();

  /* ══ 工具 4 · 回撤修复模拟器 ══ */
  (function recoverySim() {
    var troughEl = $('bgr_trough'), curEl = $('bgr_rcur');
    var btcEl = $('bgr_rbtc'), goldEl = $('bgr_rgold');
    if (!troughEl || !curEl || !btcEl || !goldEl) return;
    var troughO = $('bgr_troughO'), curO = $('bgr_rcurO');
    var btcLegEl = $('bgr_btcleg'), goldLegEl = $('bgr_goldleg');
    var recEl = $('bgr_rec'), recHEl = $('bgr_rech');
    var vEl = $('bgr_v4'), vhEl = $('bgr_v4h');
    var cv = $('bgrRecChart');

    function draw(trough, cur, btcPct, goldPct) {
      var s = fit(cv, 214);
      if (!s) return;
      var ctx = s.ctx, w = s.w, h = s.h;
      ctx.clearRect(0, 0, w, h);
      var pad = { l: 56, r: 16, t: 28, b: 46 };
      var iw = w - pad.l - pad.r;
      var y1 = h - 46;
      var barH = 36, gap = 20;
      var yTrough = pad.t + 20, yCur = yTrough + barH + gap;
      var maxR = 32;
      var sx = function (v) { return pad.l + (v / maxR) * iw; };
      ctx.fillStyle = '#e8f5ee';
      ctx.fillRect(pad.l, yTrough, sx(trough) - pad.l, barH);
      ctx.fillStyle = '#0f8a4d';
      ctx.fillRect(pad.l, yTrough, sx(trough) - pad.l, barH);
      ctx.fillStyle = '#eaf0ff';
      ctx.fillRect(pad.l, yCur, sx(cur) - pad.l, barH);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(pad.l, yCur, sx(cur) - pad.l, barH);
      ctx.fillStyle = '#454c56';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('谷底 ' + trough.toFixed(2), pad.l - 6, yTrough + barH / 2 + 4);
      ctx.fillText('当前 ' + cur.toFixed(2), pad.l - 6, yCur + barH / 2 + 4);
      ctx.fillStyle = '#7c848f';
      ctx.font = '10px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('BTC ' + (btcPct >= 0 ? '+' : '') + btcPct.toFixed(0) + '%', pad.l + iw * 0.35, yCur + barH + 14);
      ctx.fillText('黄金 ' + (goldPct >= 0 ? '+' : '') + goldPct.toFixed(0) + '%', pad.l + iw * 0.65, yCur + barH + 14);
      ctx.fillStyle = '#7c848f';
      ctx.font = '11px -apple-system,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('修复分解：BTC 腿 vs 黄金腿', pad.l + iw / 2, y1 + 31);
    }

    function update() {
      var trough = parseFloat(troughEl.value);
      var cur = parseFloat(curEl.value);
      var btcPct = parseFloat(btcEl.value);
      var goldPct = parseFloat(goldEl.value);
      var rec = (cur / trough - 1) * 100;
      var implied = (1 + btcPct / 100) / (1 + goldPct / 100);
      txt(troughO, trough.toFixed(2) + ' oz');
      txt(curO, cur.toFixed(2) + ' oz');
      txt(btcLegEl, (btcPct >= 0 ? '+' : '') + btcPct.toFixed(0) + '%');
      txt(goldLegEl, (goldPct >= 0 ? '+' : '') + goldPct.toFixed(0) + '%');
      txt(recEl, '+' + rec.toFixed(1) + '%');
      txt(recHEl, '自谷底修复 · 腿乘积≈' + implied.toFixed(2) + '（应≈' + (cur / trough).toFixed(2) + '）');
      var msg, col, hint;
      if (goldPct < -5 && btcPct < 10) {
        msg = '黄金腿主导修复'; col = '#b8730a';
        hint = '2026-02→09 模式：金价回落贡献 > BTC 上涨';
      } else if (btcPct > 15) {
        msg = 'BTC 腿主导修复'; col = '#d5342c';
        hint = '真反转需 BTC 持续跑赢——非仅靠黄金回调';
      } else {
        msg = '双腿均衡'; col = '#454c56';
        hint = '修复可持续性需观察下一腿来源';
      }
      txt(vEl, msg);
      tint(vEl, col);
      txt(vhEl, hint);
      draw(trough, cur, btcPct, goldPct);
    }

    [troughEl, curEl, btcEl, goldEl].forEach(function (el) { el.addEventListener('input', update); });
    update();
  })();
})();
