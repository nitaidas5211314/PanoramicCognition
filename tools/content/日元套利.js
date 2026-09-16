/* ============================================================
   《日元套利》主题脚本
   四个可调模型：
     1. 杠杆套息回报器  — 利差 + 汇率 × 杠杆 → 总回报
     2. 尾部崩盘回收器  — 捡硬币月数 vs 一次崩盘
     3. VIX 联动估算器   — ΔVIX × beta → 日元升值 → 套息损失
     4. 对照基准计算器  — p_base 与超额显著性样本量
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

  function normCdf(x) {
    var t = 1 / (1 + 0.2316419 * Math.abs(x));
    var d = 0.3989423 * Math.exp(-x * x / 2);
    var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x >= 0 ? 1 - p : p;
  }

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
     工具 1 · 杠杆套息回报器
     总回报 ≈ L × [(r_US − r_JP) × 月/12 + USD/JPY 变动%]
     ══════════════════════════════════════════════════════════ */
  (function levCarryTool() {
    var rjEl = $('ct_rj'), rusEl = $('ct_rus'), fxEl = $('ct_fx');
    var moEl = $('ct_mo'), levEl = $('ct_lev');
    if (!rjEl || !rusEl || !fxEl || !moEl || !levEl) return;
    var rjO = $('ct_rjO'), rusO = $('ct_rusO'), fxO = $('ct_fxO');
    var moO = $('ct_moO'), levO = $('ct_levO');
    var carryEl = $('ct_carry'), fxEl2 = $('ct_fxpl'), totEl = $('ct_total');
    var carryhEl = $('ct_carryh'), fxhEl = $('ct_fxplh'), tothEl = $('ct_totalh');
    var vEl = $('ct_v'), vhEl = $('ct_vh');
    var cv = $('ctChart');

    function upd() {
      var rj = num(rjEl.value), rus = num(rusEl.value);
      var fx = num(fxEl.value), mo = num(moEl.value), lev = num(levEl.value);
      var carry = lev * (rus - rj) * mo / 12;
      var fxpl = lev * fx;
      var total = carry + fxpl;

      txt(rjO, rj.toFixed(2) + '%');
      txt(rusO, rus.toFixed(2) + '%');
      txt(fxO, (fx >= 0 ? '+' : '') + fx.toFixed(1) + '%');
      txt(moO, mo.toFixed(0) + ' 月');
      txt(levO, lev.toFixed(0) + '×');
      txt(carryEl, (carry >= 0 ? '+' : '') + carry.toFixed(2) + '%');
      txt(carryhEl, '杠杆 × 年化利差 × 月/12');
      txt(fxEl2, (fxpl >= 0 ? '+' : '') + fxpl.toFixed(2) + '%');
      txt(fxhEl, '杠杆 × USD/JPY 变动（负=日元升值）');
      txt(totEl, (total >= 0 ? '+' : '') + total.toFixed(2) + '%');
      txt(tothEl, '利差收益 + 汇率损益（简化，忽略基差与 margin）');

      var label, hint, col;
      if (total >= 5) {
        label = '高杠杆仍盈利'; hint = '顺风局——但负偏度尾部一次可抹平数年「捡硬币」';
        col = 'var(--red)';
      } else if (total >= 0) {
        label = '勉强为正'; hint = '收益薄，波动上升时 margin 极易触发平仓';
        col = 'var(--amber)';
      } else if (total >= -15) {
        label = '套息转亏'; hint = '2024-08 典型：加息 + 日元急升 + 高杠杆';
        col = 'var(--green)';
      } else {
        label = '杠杆放大崩盘'; hint = '类似 8× 杠杆 + 日元升值 9% → 总回报深度为负';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(carry, fxpl, total);
    }

    function draw(carry, fxpl, total) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 56, pr = 20, y1 = h - 46, bw = W - pl - pr;
      var mid = (y1 + 24) / 2;
      var maxB = Math.max(20, Math.abs(carry), Math.abs(fxpl), Math.abs(total)) * 1.15;
      var bars = [
        { n: '利差', v: carry, col: C.blue },
        { n: '汇率', v: fxpl, col: fxpl >= 0 ? C.red : C.green },
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
      ctx.fillText('杠杆套息总回报分解（%）', pl + bw / 2, y1 + 31);
    }

    [rjEl, rusEl, fxEl, moEl, levEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 尾部崩盘回收器
     每月捡硬币 m% vs 一次崩盘 c% → 需几个月回本
     ══════════════════════════════════════════════════════════ */
  (function tailTool() {
    var monEl = $('ct_tc_mon'), crashEl = $('ct_tc_crash');
    if (!monEl || !crashEl) return;
    var monO = $('ct_tc_monO'), crashO = $('ct_tc_crashO');
    var recEl = $('ct_tc_rec'), ratioEl = $('ct_tc_ratio');
    var rechEl = $('ct_tc_rech'), ratiohEl = $('ct_tc_ratioh');
    var vEl = $('ct_tc_v'), vhEl = $('ct_tc_vh');
    var cv = $('ct_tcChart');

    function upd() {
      var mon = num(monEl.value), crash = num(crashEl.value);
      var rec = crash > 0 ? Math.ceil(crash / mon) : 0;
      var ratio = crash > 0 ? (crash / mon).toFixed(1) : '—';

      txt(monO, mon.toFixed(2) + '%/月');
      txt(crashO, crash.toFixed(1) + '%');
      txt(recEl, rec + ' 个月');
      txt(rechEl, '崩盘损失 ÷ 月均 carry 收益（线性近似）');
      txt(ratioEl, ratio + ' : 1');
      txt(ratiohEl, '一次崩盘 = ' + ratio + ' 个月「捡硬币」');

      var label, hint, col;
      if (rec <= 6) {
        label = '尾部尚可承受'; hint = '但崩盘往往发生在杠杆放大后——实际损失更大';
        col = 'var(--amber)';
      } else if (rec <= 24) {
        label = '典型负偏度'; hint = 'Bruschi et al.：高 carry 货币崩盘与 VIX 上升同步';
        col = 'var(--green)';
      } else {
        label = '蒸汽机碾压'; hint = '数年微利一次抹平——BIS「nickels vs steamroller」';
        col = 'var(--green)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(mon, crash, rec);
    }

    function draw(mon, crash, rec) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 52, pr = 16, y1 = h - 46, bw = W - pl - pr;
      var T = Math.min(36, Math.max(12, Math.ceil((rec + 3) / 6) * 6));
      var cum = 0, pts = [];
      for (var t = 0; t <= T; t++) {
        if (t === Math.min(6, T)) cum -= crash;
        else if (t > 0) cum += mon;
        pts.push({ t: t, v: cum });
      }
      var minV = Math.min.apply(null, pts.map(function (p) { return p.v; }));
      var maxV = Math.max.apply(null, pts.map(function (p) { return p.v; }));
      var pad = 0.3;
      minV -= pad; maxV += pad;
      var rng = maxV - minV || 1;
      function sx(t) { return pl + (t / T) * bw; }
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
        if (idx === 0) ctx.moveTo(sx(p.t), sy(p.v));
        else ctx.lineTo(sx(p.t), sy(p.v));
      });
      ctx.strokeStyle = C.blue; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
      var crashT = Math.min(6, T);
      ctx.fillStyle = C.green;
      ctx.beginPath(); ctx.arc(sx(crashT), sy(pts[crashT].v), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('第 6 月崩盘示意', pl + bw, 16);
      ctx.textAlign = 'center';
      ctx.fillText('月数 → 累计回报（%）', pl + bw / 2, y1 + 31);
    }

    [monEl, crashEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · VIX 联动估算器
     ΔJPY% ≈ −beta × ΔVIX；套息损失 ≈ 头寸 × ΔJPY% × 0.25
     ══════════════════════════════════════════════════════════ */
  (function vixTool() {
    var dvEl = $('ct_vx_dv'), betaEl = $('ct_vx_beta'), posEl = $('ct_vx_pos');
    if (!dvEl || !betaEl || !posEl) return;
    var dvO = $('ct_vx_dvO'), betaO = $('ct_vx_betaO'), posO = $('ct_vx_posO');
    var jpyEl = $('ct_vx_jpy'), lossEl = $('ct_vx_loss');
    var jpyhEl = $('ct_vx_jpyh'), losshEl = $('ct_vx_lossh');
    var vEl = $('ct_vx_v'), vhEl = $('ct_vx_vh');
    var cv = $('ct_vxChart');

    function upd() {
      var dv = num(dvEl.value), beta = num(betaEl.value), pos = num(posEl.value);
      var jpy = beta * dv;
      var loss = pos * jpy / 100 * 0.25;

      txt(dvO, (dv >= 0 ? '+' : '') + dv.toFixed(0));
      txt(betaO, beta.toFixed(2) + '%/VIX');
      txt(posO, '¥' + pos.toFixed(0) + ' 万亿');
      txt(jpyEl, '+' + jpy.toFixed(1) + '%');
      txt(jpyhEl, '日元升值 ≈ beta × ΔVIX（经验代理）');
      txt(lossEl, '¥' + loss.toFixed(2) + ' 万亿');
      txt(losshEl, '头寸 × 升值% × 0.25 杠杆系数');

      var label, hint, col;
      if (dv >= 15) {
        label = '系统性 unwind'; hint = '2024-08：VIX 飙升 + 日元急升 + 全球 equity 共振';
        col = 'var(--green)';
      } else if (dv >= 8) {
        label = '显著去杠杆'; hint = 'Bruschi：carry 在 VIX 上升期平均亏损';
        col = 'var(--amber)';
      } else {
        label = '温和波动'; hint = 'carry 顺风——但拥挤度上升会放大下次冲击';
        col = 'var(--blue)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(dv, beta, jpy, loss);
    }

    function draw(dv, beta, jpy, loss) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 56, pr = 20, y1 = h - 46, bw = W - pl - pr;
      var dvs = [];
      var j = -5;
      while (j <= 25) { dvs.push(j); j += 5; }
      var jpys = dvs.map(function (d) { return beta * d; });
      var maxJ = Math.max.apply(null, jpys.map(Math.abs).concat([1]));
      var barW = bw / dvs.length * 0.55;
      ctx.strokeStyle = C.grid;
      for (var i = 0; i <= 4; i++) {
        var yy = y1 - (y1 - 20) * i / 4;
        ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((maxJ * i / 4).toFixed(1) + '%', pl - 4, yy + 3);
      }
      dvs.forEach(function (d, idx) {
        var jv = beta * d;
        var x = pl + idx * (bw / dvs.length) + barW * 0.22;
        var bh = Math.abs(jv) / maxJ * (y1 - 24);
        var isCur = Math.abs(d - dv) < 2.6;
        ctx.fillStyle = jv >= 0 ? C.green : C.red;
        ctx.globalAlpha = isCur ? 1 : 0.45;
        ctx.fillRect(x, y1 - bh, barW, bh || 1);
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('Δ' + d, x + barW / 2, y1 + 13);
      });
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('VIX 变动 → 隐含日元升值（%）', pl + bw / 2, y1 + 31);
    }

    [dvEl, betaEl, posEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 对照基准计算器
     p_base = Φ(μ·√T/σ)；n = (1.96√p_b(1−p_b)+0.84√p_s(1−p_s))²/(p_s−p_b)²
     ══════════════════════════════════════════════════════════ */
  (function benchTool() {
    var psEl = $('ct_bm_ps'), muEl = $('ct_bm_mu'), sigEl = $('ct_bm_sig'), tEl = $('ct_bm_t');
    if (!psEl || !muEl || !sigEl || !tEl) return;
    var psO = $('ct_bm_psO'), muO = $('ct_bm_muO'), sigO = $('ct_bm_sigO'), tO = $('ct_bm_tO');
    var pbEl = $('ct_bm_pb'), exEl = $('ct_bm_ex'), nEl = $('ct_bm_n');
    var pbhEl = $('ct_bm_pbh'), exhEl = $('ct_bm_exh'), nhEl = $('ct_bm_nh');
    var vEl = $('ct_bm_v'), vhEl = $('ct_bm_vh');
    var cv = $('ct_bmChart');

    function upd() {
      var ps = num(psEl.value) / 100, mu = num(muEl.value) / 100;
      var sig = num(sigEl.value) / 100, T = num(tEl.value);
      var pb = normCdf(mu * (T / 252) / (sig * Math.sqrt(T / 252)));
      var excess = (ps - pb) * 100;
      var diff = ps - pb;
      var n = diff > 0.001
        ? Math.pow(1.96 * Math.sqrt(pb * (1 - pb)) + 0.84 * Math.sqrt(ps * (1 - ps)), 2) / Math.pow(diff, 2)
        : Infinity;

      txt(psO, (ps * 100).toFixed(1) + '%');
      txt(muO, (mu * 100).toFixed(0) + '%');
      txt(sigO, (sig * 100).toFixed(0) + '%');
      txt(tO, T.toFixed(0) + ' 日');
      txt(pbEl, (pb * 100).toFixed(2) + '%');
      txt(pbhEl, '随机做多基准胜率（正漂移）');
      txt(exEl, (excess >= 0 ? '+' : '') + excess.toFixed(1) + ' pp');
      txt(exhEl, '策略胜率 − 基准');
      txt(nEl, n === Infinity ? '∞' : Math.ceil(n).toString());
      txt(nhEl, '证明超额非随机所需样本量（α=0.05, power=0.8）');

      var label, hint, col;
      if (excess <= 0) {
        label = '跑输基准'; hint = '表面胜率可能低于「什么都不做」';
        col = 'var(--green)';
      } else if (excess < 5) {
        label = '超额偏薄'; hint = '需 n>' + (n === Infinity ? '∞' : Math.ceil(n)) + ' 才显著';
        col = 'var(--amber)';
      } else if (excess < 10) {
        label = '有超额但需验证'; hint = '40 日基准 58.76%——别被 65% 胜率迷惑';
        col = 'var(--amber)';
      } else {
        label = '超额较厚'; hint = '仍要减基准——μ/σ 假设一变结论就变';
        col = 'var(--red)';
      }
      txt(vEl, label); txt(vhEl, hint); tint(vEl, col);
      draw(pb, ps, T);
    }

    function draw(pb, ps, T) {
      if (!cv) return;
      var g = fit(cv, 214); if (!g) return;
      var ctx = g.ctx, W = g.w, h = g.h;
      clear(g);
      var pl = 56, pr = 20, y1 = h - 24, bh = y1 - 40;
      var barW = (W - pl - pr) / 2 * 0.6;
      var bars = [
        { n: '基准 p_base', v: pb * 100, col: C.ink3 },
        { n: '策略 p_s', v: ps * 100, col: C.red }
      ];
      bars.forEach(function (b, idx) {
        var x = pl + idx * (barW + 40) + 20;
        var hgt = b.v / 100 * bh;
        ctx.fillStyle = b.col;
        ctx.fillRect(x, y1 - hgt, barW, hgt);
        ctx.fillStyle = C.ink2; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(b.n, x + barW / 2, y1 + 14);
        ctx.fillText(b.v.toFixed(1) + '%', x + barW / 2, y1 - hgt - 6);
      });
      ctx.strokeStyle = C.grid;
      ctx.beginPath(); ctx.moveTo(pl, y1); ctx.lineTo(W - pr, y1); ctx.stroke();
      ctx.fillStyle = C.ink2; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('持有 ' + T + ' 日 · 胜率对照', pl + (W - pl - pr) / 2, 18);
    }

    [psEl, muEl, sigEl, tEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();
})();
