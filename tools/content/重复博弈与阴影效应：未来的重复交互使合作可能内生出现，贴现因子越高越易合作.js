/* ============================================================
   《重复博弈与阴影效应》主题脚本
   四个可调模型：
     1. 冷酷触发 δ* 与现值
     2. TFT 集体稳定 w*
     3. 几何续局阴影长度
     4. 连续贴现 δ=e^(-rΔt)
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
  function clampLabel(ctx, lab, x, y, align, pl, w) {
    var lw = ctx.measureText(lab).width;
    ctx.textAlign = align;
    var lx = align === 'left' ? Math.min(x, w - lw - 6) : Math.max(x, pl + 6);
    ctx.fillText(lab, lx, y);
  }

  /* ── 1. Grim trigger ── */
  (function grim() {
    var rEl = $('g_r'), tEl = $('g_t'), pEl = $('g_p'), dEl = $('g_d');
    if (!rEl || !tEl || !pEl || !dEl) return;
    var cv = $('gChart');

    function upd() {
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), d = parseFloat(dEl.value);
      if (!(T > P)) T = P + 0.1;
      var star = (T - R) / (T - P);
      if (!isFinite(star) || star < 0) star = 0;
      if (star > 1) star = 1;
      var coop = R / (1 - d);
      var dev = T + d * P / (1 - d);
      var ac = R;
      var ad = (1 - d) * T + d * P;
      var ok = d + 1e-9 >= star;
      var col = ok ? C.green : C.red;

      txt($('g_rO'), R.toFixed(1));
      txt($('g_tO'), T.toFixed(1));
      txt($('g_pO'), P.toFixed(1));
      txt($('g_dO'), d.toFixed(2));
      txt($('g_star'), star.toFixed(2));
      txt($('g_coop'), coop.toFixed(2));
      txt($('g_dev'), dev.toFixed(2));
      txt($('g_ac'), ac.toFixed(2));
      txt($('g_ad'), ad.toFixed(2));
      tint($('g_star'), C.amber);

      var msg = 'δ=' + d.toFixed(2) + (ok ? ' ≥ ' : ' < ') + 'δ*=' + star.toFixed(2) +
        (ok ? ' → 冷酷触发下相互合作激励相容' : ' → 偏离更赚，阴影不够厚');
      txt($('g_vh'), msg);
      tint($('g_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var n = 40, i, xd, maxY = 1;
      for (i = 0; i <= n; i++) {
        xd = 0.05 + (0.9 * i) / n;
        maxY = Math.max(maxY, R / (1 - xd), T + xd * P / (1 - xd));
      }
      function sx(x) { return pl + ((x - 0.05) / 0.9) * bw; }
      function sy(v) { return y1 - (v / maxY) * bh; }

      ctx.strokeStyle = C.grid;
      for (i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      ctx.strokeStyle = C.green;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (i = 0; i <= n; i++) {
        xd = 0.05 + (0.9 * i) / n;
        var yv = R / (1 - xd);
        if (i === 0) ctx.moveTo(sx(xd), sy(yv));
        else ctx.lineTo(sx(xd), sy(yv));
      }
      ctx.stroke();

      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (i = 0; i <= n; i++) {
        xd = 0.05 + (0.9 * i) / n;
        var yv2 = T + xd * P / (1 - xd);
        if (i === 0) ctx.moveTo(sx(xd), sy(yv2));
        else ctx.lineTo(sx(xd), sy(yv2));
      }
      ctx.stroke();

      if (star >= 0.05 && star <= 0.95) {
        ctx.strokeStyle = C.amber;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(sx(star), pt);
        ctx.lineTo(sx(star), y1);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = C.amber;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('δ*', sx(star), pt - 6);
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sx(d), pt);
      ctx.lineTo(sx(d), y1);
      ctx.stroke();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('绿=合作现值 红=偏离现值', pl + bw, pt - 8);
      ctx.textAlign = 'center';
      ctx.fillText('贴现因子 δ', pl + bw / 2, y1 + 31);
    }
    bind(['g_r', 'g_t', 'g_p', 'g_d'], upd);
    upd();
  })();

  /* ── 2. TFT collective stability ── */
  (function tft() {
    var rEl = $('t_r'), tEl = $('t_t'), pEl = $('t_p'), sEl = $('t_s'), wEl = $('t_w');
    if (!rEl || !tEl || !pEl || !sEl || !wEl) return;
    var cv = $('tChart');

    function upd() {
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), S = parseFloat(sEl.value);
      var w = parseFloat(wEl.value);
      var a = (T > P) ? (T - R) / (T - P) : 1;
      var b = (R > S) ? (T - R) / (R - S) : 1;
      if (!isFinite(a) || a < 0) a = 0;
      if (!isFinite(b) || b < 0) b = 0;
      if (a > 1) a = 1;
      if (b > 1) b = 1;
      var star = Math.max(a, b);
      var en = 1 / (1 - w);
      var ok = w + 1e-9 >= star;
      var col = ok ? C.green : C.red;

      // Payoffs vs TFT (undiscounted sum style / (1-w) normalized avg)
      var vSelf = R; // mutual TFT average
      var vAlld = (1 - w) * T + w * P;
      var vAlt = (1 - w) * (T + w * S) / (1 + w); // (T+wS)/(1+w) average form
      // Actually average of alternating: (T+S)/2 when w→1; exact avg with discount:
      // V = (1-w)(T + w S)/(1-w^2) = (T + w S)/(1+w)
      vAlt = (T + w * S) / (1 + w);

      txt($('t_rO'), R.toFixed(1));
      txt($('t_tO'), T.toFixed(1));
      txt($('t_pO'), P.toFixed(1));
      txt($('t_sO'), S.toFixed(1));
      txt($('t_wO'), w.toFixed(2));
      txt($('t_a'), a.toFixed(2));
      txt($('t_b'), b.toFixed(2));
      txt($('t_star'), star.toFixed(2));
      txt($('t_en'), en.toFixed(2));
      tint($('t_star'), C.amber);

      var msg = 'w=' + w.toFixed(2) + (ok ? ' ≥ ' : ' < ') + 'w*=' + star.toFixed(2) +
        '｜对TFT平均：互惠 ' + vSelf.toFixed(2) +
        ' / ALLD ' + vAlld.toFixed(2) +
        ' / 交替 ' + vAlt.toFixed(2) +
        (ok ? ' → TFT 集体稳定区间内' : ' → 可被 ALLD 或交替策略侵入');
      txt($('t_vh'), msg);
      tint($('t_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, ww = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = ww - pl - pr, bh = y1 - pt;
      var items = [
        { lab: '互惠 TFT', v: vSelf, c: C.green },
        { lab: 'ALLD 入侵', v: vAlld, c: C.red },
        { lab: '交替入侵', v: vAlt, c: C.amber }
      ];
      var maxAbs = Math.max(1, Math.abs(items[0].v), Math.abs(items[1].v), Math.abs(items[2].v));
      function sx(v) { return pl + bw / 2 + (v / maxAbs) * (bw / 2 - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(sx(0), pt);
      ctx.lineTo(sx(0), y1);
      ctx.stroke();

      items.forEach(function (item, i) {
        var y = sy(i), x0 = sx(0), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(Math.min(x0, x1), y - 12, Math.abs(x1 - x0), 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(2), item.v >= 0 ? x1 + 8 : x1 - 8, y + 4,
          item.v >= 0 ? 'left' : 'right', pl, ww);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('对 TFT 的平均支付（归一化）；w≥w* 时互惠不劣于入侵', pl + bw / 2, y1 + 31);
    }
    bind(['t_r', 't_t', 't_p', 't_s', 't_w'], upd);
    upd();
  })();

  /* ── 3. Shadow length ── */
  (function shadow() {
    var wEl = $('s_w'), thEl = $('s_th');
    if (!wEl || !thEl) return;
    var cv = $('sChart');

    function upd() {
      var w = parseFloat(wEl.value), th = parseFloat(thEl.value);
      if (w >= 0.999) w = 0.999;
      var en = 1 / (1 - w);
      var gap = w - th;
      var ok = gap >= 0;
      var st = en >= 10 ? '厚' : (en >= 3 ? '中' : '薄');
      var col = ok ? C.green : C.red;

      txt($('s_wO'), w.toFixed(2));
      txt($('s_thO'), th.toFixed(2));
      txt($('s_en'), en.toFixed(2));
      txt($('s_gap'), (gap >= 0 ? '+' : '') + gap.toFixed(2));
      txt($('s_st'), st);
      tint($('s_st'), en >= 10 ? C.green : (en >= 3 ? C.amber : C.red));
      tint($('s_gap'), col);

      var msg = '续局 w=' + w.toFixed(2) + ' → 期望 ' + en.toFixed(2) + ' 回合；相对门槛 ' +
        th.toFixed(2) + (ok ? ' 已越过 → 阴影足以支撑该门槛策略' : ' 未越过 → 合作难自执行');
      txt($('s_vh'), msg);
      tint($('s_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, ww = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 24, y1 = h - 46;
      var bw = ww - pl - pr, bh = y1 - pt;
      var n = 50, i, xw, maxY = 1;
      for (i = 0; i <= n; i++) {
        xw = 0.1 + (0.89 * i) / n;
        maxY = Math.max(maxY, 1 / (1 - xw));
      }
      // cap display for readability
      var yMax = Math.min(maxY, 40);
      function sx(x) { return pl + ((x - 0.1) / 0.89) * bw; }
      function sy(v) { return y1 - (Math.min(v, yMax) / yMax) * bh; }

      ctx.strokeStyle = C.grid;
      for (i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (i = 0; i <= n; i++) {
        xw = 0.1 + (0.89 * i) / n;
        var yv = 1 / (1 - xw);
        if (i === 0) ctx.moveTo(sx(xw), sy(yv));
        else ctx.lineTo(sx(xw), sy(yv));
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(sx(th), pt);
      ctx.lineTo(sx(th), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(sx(w), sy(en), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('E[N]=1/(1−w)', pl + bw, pt - 8);
      ctx.textAlign = 'center';
      ctx.fillText('续局概率 w（黄线=对照门槛）', pl + bw / 2, y1 + 31);
    }
    bind(['s_w', 's_th'], upd);
    upd();
  })();

  /* ── 4. Continuous discount ── */
  (function cont() {
    var rEl = $('c_r'), dtEl = $('c_dt'), thEl = $('c_th');
    if (!rEl || !dtEl || !thEl) return;
    var cv = $('cChart');

    function upd() {
      var r = parseFloat(rEl.value), dt = parseFloat(dtEl.value), th = parseFloat(thEl.value);
      if (r < 0.001) r = 0.001;
      var d = Math.exp(-r * dt);
      var maxDt = -Math.log(th) / r;
      var ok = d + 1e-12 >= th;
      var col = ok ? C.green : C.red;

      txt($('c_rO'), r.toFixed(2));
      txt($('c_dtO'), dt.toFixed(2));
      txt($('c_thO'), th.toFixed(2));
      txt($('c_d'), d.toFixed(3));
      txt($('c_max'), maxDt.toFixed(2));
      txt($('c_ok'), ok ? '是' : '否');
      tint($('c_ok'), col);
      tint($('c_d'), ok ? C.green : C.amber);

      var msg = 'r=' + r.toFixed(2) + '，Δt=' + dt.toFixed(2) + ' 年 → δ=' + d.toFixed(3) +
        (ok ? ' ≥ ' : ' < ') + 'δ*=' + th.toFixed(2) +
        '｜要过线，间隔至多 ' + maxDt.toFixed(2) + ' 年';
      txt($('c_vh'), msg);
      tint($('c_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, ww = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 24, y1 = h - 46;
      var bw = ww - pl - pr, bh = y1 - pt;
      var xMax = Math.max(5, dt * 1.4, maxDt * 1.1);
      var n = 50, i, xd;
      function sx(x) { return pl + (x / xMax) * bw; }
      function sy(v) { return y1 - v * bh; }

      ctx.strokeStyle = C.grid;
      for (i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (i = 0; i <= n; i++) {
        xd = (xMax * i) / n;
        var yv = Math.exp(-r * xd);
        if (i === 0) ctx.moveTo(sx(xd), sy(yv));
        else ctx.lineTo(sx(xd), sy(yv));
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(th));
      ctx.lineTo(pl + bw, sy(th));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(sx(dt), sy(d), 5, 0, Math.PI * 2);
      ctx.fill();

      if (maxDt <= xMax) {
        ctx.strokeStyle = C.green;
        ctx.beginPath();
        ctx.moveTo(sx(maxDt), pt);
        ctx.lineTo(sx(maxDt), y1);
        ctx.stroke();
      }

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('δ=e^(−rΔt)', pl + bw, pt - 8);
      ctx.textAlign = 'center';
      ctx.fillText('互动间隔 Δt（年）；黄线=δ*，绿线=最大间隔', pl + bw / 2, y1 + 31);
    }
    bind(['c_r', 'c_dt', 'c_th'], upd);
    upd();
  })();
})();
