/* ============================================================
   《囚徒困境 / Prisoner's Dilemma》主题脚本
   四个可调模型：
     1. 支付结构判定（是否 PD + 效率）
     2. 冷酷触发 δ*
     3. 重复赛得分 TFT / ALLC / ALLD
     4. 未来阴影续局概率 w
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

  /* ── 1. Structure classifier ── */
  (function struct() {
    var rEl = $('st_r'), tEl = $('st_t'), pEl = $('st_p'), sEl = $('st_s');
    if (!rEl || !tEl || !pEl || !sEl) return;
    var cv = $('stChart');

    function upd() {
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), S = parseFloat(sEl.value);
      var isPD = T > R && R > P && P > S;
      var soft = T >= R && R >= P && P >= S && !isPD;
      var gap = R - P;
      var socialC = 2 * R, socialD = 2 * P;
      var eff = socialC > 0 ? (socialD / socialC) * 100 : 0;
      var col = isPD ? C.red : (R > T && S > P ? C.green : C.amber);

      txt($('st_rO'), R.toFixed(1));
      txt($('st_tO'), T.toFixed(1));
      txt($('st_pO'), P.toFixed(1));
      txt($('st_sO'), S.toFixed(1));
      txt($('st_pd'), isPD ? '是' : (soft ? '边界/弱' : '否'));
      txt($('st_ne'), isPD || (T >= R && P >= S) ? P.toFixed(1) : '—');
      txt($('st_eff'), isPD ? (eff.toFixed(0) + '%') : '—');
      tint($('st_pd'), col);

      var msg;
      if (isPD) {
        msg = 'T>R>P>S 成立 → 严格 PD；唯一 NE=(D,D)，社会总支付 ' + socialD.toFixed(1) +
          ' 相对合作 ' + socialC.toFixed(1) + '，效率 ' + eff.toFixed(0) + '%';
      } else if (R > T && S > P) {
        msg = '合作占优区域：已离开 PD，(C,C) 可成为占优/NE';
      } else {
        msg = '不等式未齐：T−R=' + (T - R).toFixed(1) + '，R−P=' + (R - P).toFixed(1) +
          '，P−S=' + (P - S).toFixed(1) + ' → 可能是协调/鸡博弈/其他';
      }
      txt($('st_vh'), msg);
      tint($('st_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: 'T−R 诱惑', v: T - R, c: T > R ? C.red : C.green },
        { lab: 'R−P 缺口', v: gap, c: C.amber },
        { lab: 'P−S 防傻', v: P - S, c: P > S ? C.red : C.blue }
      ];
      var maxAbs = Math.max(1, Math.abs(vals[0].v), Math.abs(vals[1].v), Math.abs(vals[2].v));
      function sx(v) { return pl + bw / 2 + (v / maxAbs) * (bw / 2 - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(sx(0), pt);
      ctx.lineTo(sx(0), y1);
      ctx.stroke();

      vals.forEach(function (item, i) {
        var y = sy(i), x0 = sx(0), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(Math.min(x0, x1), y - 12, Math.abs(x1 - x0), 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        ctx.font = '12px sans-serif';
        clampLabel(ctx, item.v.toFixed(1), item.v >= 0 ? x1 + 8 : x1 - 8, y + 4,
          item.v >= 0 ? 'left' : 'right', pl, w);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('三项皆 >0 且 R>P 才是经典严格 PD', pl + bw / 2, y1 + 31);
    }
    bind(['st_r', 'st_t', 'st_p', 'st_s'], upd);
    upd();
  })();

  /* ── 2. Grim trigger δ* ── */
  (function grim() {
    var rEl = $('gr_r'), tEl = $('gr_t'), pEl = $('gr_p'), dEl = $('gr_d');
    if (!rEl || !tEl || !pEl || !dEl) return;
    var cv = $('grChart');

    function upd() {
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value), d = parseFloat(dEl.value);
      if (T <= P) T = P + 0.1;
      var star = (T - R) / (T - P);
      if (!isFinite(star) || star < 0) star = 0;
      if (star > 1) star = 1;
      var coop = R / (1 - d);
      var dev = T + d * P / (1 - d);
      var ok = d + 1e-9 >= star;
      var col = ok ? C.green : C.red;

      txt($('gr_rO'), R.toFixed(1));
      txt($('gr_tO'), T.toFixed(1));
      txt($('gr_pO'), P.toFixed(1));
      txt($('gr_dO'), d.toFixed(2));
      txt($('gr_star'), star.toFixed(2));
      txt($('gr_coop'), coop.toFixed(2));
      txt($('gr_dev'), dev.toFixed(2));
      tint($('gr_star'), C.amber);

      var msg = 'δ=' + d.toFixed(2) + (ok ? ' ≥ ' : ' < ') + 'δ*=' + star.toFixed(2) +
        (ok ? ' → 冷酷触发下相互合作可激励相容' : ' → 偏离更赚，合作撑不住');
      txt($('gr_vh'), msg);
      tint($('gr_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var n = 40, i, xd;
      var maxY = 1;
      for (i = 0; i <= n; i++) {
        xd = 0.05 + (0.9 * i) / n;
        var c = R / (1 - xd), dv = T + xd * P / (1 - xd);
        maxY = Math.max(maxY, c, dv);
      }
      function sx(x) { return pl + ((x - 0.05) / 0.9) * bw; }
      function sy(v) { return y1 - (v / maxY) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
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

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(star), pt);
      ctx.lineTo(sx(star), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(d), sy(coop), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('绿=合作现值 红=偏离 竖线=δ*', pl + bw, pt - 8);
      ctx.textAlign = 'center';
      ctx.fillText('贴现因子 δ', pl + bw / 2, y1 + 31);
      ctx.fillText('0.05', sx(0.05), y1 + 13);
      ctx.fillText('0.95', sx(0.95), y1 + 13);
      if (star >= 0.05 && star <= 0.95) {
        ctx.fillStyle = C.amber;
        ctx.fillText('δ*', sx(star), y1 + 13);
      }
    }
    bind(['gr_r', 'gr_t', 'gr_p', 'gr_d'], upd);
    upd();
  })();

  /* ── 3. Tournament scores ── */
  (function tourney() {
    var nEl = $('tr_n'), rEl = $('tr_r'), tEl = $('tr_t'), pEl = $('tr_p');
    if (!nEl || !rEl || !tEl || !pEl) return;
    var cv = $('trChart');
    var S0 = 0;

    function upd() {
      var n = parseInt(nEl.value, 10);
      var R = parseFloat(rEl.value), T = parseFloat(tEl.value), P = parseFloat(pEl.value);
      var tt = R * n;
      var td = S0 + P * (n - 1);
      var dt = T + P * (n - 1);
      var cd = S0 * n;
      var dc = T * n;
      var dd = P * n;

      txt($('tr_nO'), String(n));
      txt($('tr_rO'), String(R));
      txt($('tr_tO'), String(T));
      txt($('tr_pO'), String(P));
      txt($('tr_tt'), String(tt));
      txt($('tr_td'), String(td));
      txt($('tr_cd'), String(cd));

      var msg = 'n=' + n + '：相互合作 ' + tt + '；TFT 对剥削者得 ' + td +
        '（首期被剥削后对等惩罚）；纯合作者对 ALLD 得 ' + cd;
      txt($('tr_vh'), msg);
      tint($('tr_vh'), C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var bars = [
        { lab: 'TFT↔TFT', v: tt, c: C.green },
        { lab: 'TFT vs ALLD', v: td, c: C.amber },
        { lab: 'ALLD vs TFT', v: dt, c: C.red },
        { lab: 'ALLC vs ALLD', v: cd, c: C.ink3 },
        { lab: 'ALLD↔ALLD', v: dd, c: C.blue }
      ];
      var maxV = Math.max(1, dc, tt, dt, dd);
      var barW = bw / bars.length;
      bars.forEach(function (b, i) {
        var x = pl + i * barW + 8;
        var bhPix = (b.v / maxV) * (bh - 8);
        var y = y1 - bhPix;
        ctx.fillStyle = b.c;
        ctx.fillRect(x, y, barW - 16, bhPix);
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        var lab = String(b.v);
        var lw = ctx.measureText(lab).width;
        var lx = x + (barW - 16) / 2;
        ctx.fillText(lab, lx, Math.max(y - 4, pt + 10));
        ctx.fillStyle = C.ink3;
        ctx.font = '10px sans-serif';
        ctx.fillText(b.lab, lx, y1 + 13);
      });
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('对局累计得分（S=0）', pl + bw / 2, y1 + 31);
    }
    bind(['tr_n', 'tr_r', 'tr_t', 'tr_p'], upd);
    upd();
  })();

  /* ── 4. Shadow of the future ── */
  (function shadow() {
    var wEl = $('sh_w'), tEl = $('sh_t'), rEl = $('sh_r'), pEl = $('sh_p');
    if (!wEl || !tEl || !rEl || !pEl) return;
    var cv = $('shChart');

    function upd() {
      var w = parseFloat(wEl.value), T = parseFloat(tEl.value);
      var R = parseFloat(rEl.value), P = parseFloat(pEl.value);
      if (T <= P) T = P + 0.1;
      var star = (T - R) / (T - P);
      if (!isFinite(star) || star < 0) star = 0;
      if (star > 1) star = 1;
      var len = 1 / (1 - w);
      var ok = w + 1e-9 >= star;
      var col = ok ? C.green : C.red;

      txt($('sh_wO'), w.toFixed(2));
      txt($('sh_tO'), T.toFixed(1));
      txt($('sh_rO'), R.toFixed(1));
      txt($('sh_pO'), P.toFixed(1));
      txt($('sh_len'), len.toFixed(1));
      txt($('sh_star'), star.toFixed(2));
      txt($('sh_ok'), ok ? '是' : '否');
      tint($('sh_ok'), col);

      var msg = 'w=' + w.toFixed(2) + (ok ? ' ≥ ' : ' < ') + 'w*=' + star.toFixed(2) +
        '，期望 ' + len.toFixed(1) + ' 期 → ' +
        (ok ? '「未来阴影」足够支撑合作' : '未来太短，理性倾向背叛');
      txt($('sh_vh'), msg);
      tint($('sh_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, W = g.w, h = g.h;
      var pl = 44, pr = 16, pt = 24, y1 = h - 46;
      var bw = W - pl - pr, bh = y1 - pt;
      var maxLen = 1 / (1 - 0.98);
      function sx(x) { return pl + ((x - 0.1) / 0.88) * bw; }
      function sy(v) { return y1 - (v / maxLen) * bh; }

      ctx.strokeStyle = C.grid;
      for (var i = 0; i <= 4; i++) {
        var yy = pt + (bh * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pl, yy);
        ctx.lineTo(pl + bw, yy);
        ctx.stroke();
      }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (i = 0; i <= 50; i++) {
        var ww = 0.1 + (0.88 * i) / 50;
        var L = 1 / (1 - ww);
        if (i === 0) ctx.moveTo(sx(ww), sy(L));
        else ctx.lineTo(sx(ww), sy(L));
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(star), pt);
      ctx.lineTo(sx(star), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = ok ? C.green : C.red;
      ctx.beginPath();
      ctx.arc(sx(w), sy(len), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('期望期数 1/(1−w)', pl + bw, pt - 8);
      ctx.textAlign = 'center';
      ctx.fillText('续局概率 w', pl + bw / 2, y1 + 31);
      ctx.fillText('0.10', sx(0.1), y1 + 13);
      ctx.fillText('0.98', sx(0.98), y1 + 13);
    }
    bind(['sh_w', 'sh_t', 'sh_r', 'sh_p'], upd);
    upd();
  })();
})();
