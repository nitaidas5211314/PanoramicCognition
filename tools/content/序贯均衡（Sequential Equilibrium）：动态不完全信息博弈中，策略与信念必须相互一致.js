/* ============================================================
   《序贯均衡》主题脚本
   四个可调模型：
     1. 路径贝叶斯后验
     2. 离径颤抖比一致性
     3. 序贯理性门槛
     4. SE μ vs 任意 PBE 故事 μ
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
  function bars(cv, vals, ymin, ymax) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 52, pr = 20, pt = 24, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    var barW = bw / (vals.length * 1.5);
    vals.forEach(function (o, i) {
      var x = pl + (i + 0.5) * (bw / vals.length) - barW / 2;
      var y0 = y1 - ((0 - ymin) / (ymax - ymin)) * bh;
      var yv = y1 - ((o.v - ymin) / (ymax - ymin)) * bh;
      var top = Math.min(y0, yv), ht = Math.abs(y0 - yv);
      ctx.fillStyle = o.c;
      ctx.fillRect(x, top, barW, Math.max(ht, 1));
      ctx.fillStyle = C.ink;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      var lab = o.v.toFixed(3);
      var lx = x + barW / 2;
      var ly = o.v >= 0 ? Math.max(yv - 6, pt + 10) : Math.min(yv + 14, y1 - 4);
      ctx.fillText(lab, lx, ly);
      ctx.fillStyle = C.ink2;
      ctx.font = '10px sans-serif';
      var lines = (o.lab || '').split('\n');
      lines.forEach(function (ln, j) {
        ctx.fillText(ln, lx, y1 + 13 + j * 12);
      });
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('概率 / 支付', pl + bw / 2, y1 + 31);
  }

  /* ── 1. 路径贝叶斯 ── */
  (function bay() {
    if (!$('bay_pi')) return;
    var cv = $('bayChart');
    function upd() {
      var pi = parseFloat($('bay_pi').value) / 100;
      var a = parseFloat($('bay_a').value) / 100;
      txt($('bay_piO'), Math.round(pi * 100) + '%');
      txt($('bay_aO'), Math.round(a * 100) + '%');

      var den = pi + (1 - pi) * a;
      var mu = den > 0 ? pi / den : 0;
      var lr = a > 1e-12 ? 1 / a : Infinity;
      var lift = mu - pi;
      var info;
      if (a < 1e-9) info = '完全分离';
      else if (Math.abs(a - 1) < 1e-9) info = '完全混同';
      else info = '部分分离';

      txt($('bay_mu'), mu.toFixed(4));
      txt($('bay_lr'), lr > 100 ? '>100' : lr.toFixed(3));
      txt($('bay_lift'), (lift >= 0 ? '+' : '') + lift.toFixed(4));
      txt($('bay_info'), info);
      var msg = 'π=' + (pi * 100).toFixed(0) + '%、α=' + (a * 100).toFixed(0) +
        '% → μ(H|S)=' + mu.toFixed(4) + '（分母 π+(1-π)α=' + den.toFixed(4) + '）';
      txt($('bay_vh'), msg);
      tint($('bay_vh'), C.blue);

      bars(cv, [
        { lab: '先验π', v: pi, c: C.amber },
        { lab: '后验μ', v: mu, c: C.green },
        { lab: 'α', v: a, c: C.blue },
        { lab: '提升', v: lift, c: lift >= 0 ? C.red : C.green }
      ], Math.min(0, lift) - 0.05, Math.max(1, pi, mu, a) + 0.05);
    }
    bind(['bay_pi', 'bay_a'], upd);
    upd();
  })();

  /* ── 2. 颤抖比离径 ── */
  (function trem() {
    if (!$('tr_pi')) return;
    var cv = $('trChart');
    function upd() {
      var pi = parseFloat($('tr_pi').value) / 100;
      var r = parseFloat($('tr_r').value);
      txt($('tr_piO'), Math.round(pi * 100) + '%');
      txt($('tr_rO'), r.toFixed(2));

      var mu = (pi * r) / (pi * r + (1 - pi));
      var cmp = Math.abs(mu - pi) < 1e-9 ? '= 先验' : (mu > pi ? '> 先验' : '< 先验');

      txt($('tr_mu'), mu.toFixed(3));
      txt($('tr_lo'), '→ 0');
      txt($('tr_hi'), '→ 1');
      txt($('tr_cmp'), cmp);
      var msg = 'r=' + r.toFixed(2) + ' → μ=' + mu.toFixed(3) +
        '；r=1 时回到先验 ' + pi.toFixed(3) + '。一致性把离径信念钉在颤抖比上。';
      txt($('tr_vh'), msg);
      tint($('tr_vh'), Math.abs(mu - pi) < 0.02 ? C.green : C.amber);

      bars(cv, [
        { lab: '先验π', v: pi, c: C.amber },
        { lab: 'μ(r)', v: mu, c: C.green },
        { lab: 'r/(1+r)', v: r / (1 + r), c: C.blue }
      ], 0, 1.05);
    }
    bind(['tr_pi', 'tr_r'], upd);
    upd();
  })();

  /* ── 3. 序贯理性 ── */
  (function seq() {
    if (!$('sq_mu')) return;
    var cv = $('sqChart');
    function upd() {
      var mu = parseFloat($('sq_mu').value) / 100;
      var uh = parseFloat($('sq_uh').value);
      var ul = parseFloat($('sq_ul').value);
      txt($('sq_muO'), Math.round(mu * 100) + '%');
      txt($('sq_uhO'), uh.toFixed(1));
      txt($('sq_ulO'), ul.toFixed(1));

      var eu = mu * uh + (1 - mu) * ul;
      var ac = 0;
      var star = null;
      if (Math.abs(uh - ul) > 1e-12) {
        star = ul / (ul - uh);
      }
      var fight = eu >= ac - 1e-12;
      var starTxt = (star === null || star < 0 || star > 1) ? '—' : star.toFixed(3);

      txt($('sq_eu'), eu.toFixed(3));
      txt($('sq_ac'), ac.toFixed(3));
      txt($('sq_star'), starTxt);
      txt($('sq_br'), fight ? '斗争' : '默许');
      tint($('sq_br'), fight ? C.red : C.green);
      var msg = fight
        ? ('μ=' + mu.toFixed(2) + ' 时 EU[斗争]=' + eu.toFixed(3) + ' ≥ 0 → 序贯理性选斗争' +
          (star !== null && star >= 0 && star <= 1 ? '（门槛 μ*=' + star.toFixed(3) + '）' : ''))
        : ('μ=' + mu.toFixed(2) + ' 时 EU[斗争]=' + eu.toFixed(3) + ' < 0 → 序贯理性选默许' +
          (star !== null && star >= 0 && star <= 1 ? '（门槛 μ*=' + star.toFixed(3) + '）' : ''));
      txt($('sq_vh'), msg);
      tint($('sq_vh'), fight ? C.red : C.green);

      var ymin = Math.min(eu, ac, uh, ul, 0) - 0.3;
      var ymax = Math.max(eu, ac, uh, ul, 0) + 0.3;
      bars(cv, [
        { lab: 'EU斗争', v: eu, c: fight ? C.red : C.amber },
        { lab: 'EU默许', v: ac, c: C.green },
        { lab: 'u_H', v: uh, c: C.ink2 },
        { lab: 'u_L', v: ul, c: C.blue }
      ], ymin, ymax);
    }
    bind(['sq_mu', 'sq_uh', 'sq_ul'], upd);
    upd();
  })();

  /* ── 4. SE vs PBE 故事 ── */
  (function gap() {
    if (!$('gp_pi')) return;
    var cv = $('gpChart');
    function upd() {
      var pi = parseFloat($('gp_pi').value) / 100;
      var r = parseFloat($('gp_r').value);
      var st = parseFloat($('gp_st').value) / 100;
      var th = parseFloat($('gp_th').value) / 100;
      txt($('gp_piO'), Math.round(pi * 100) + '%');
      txt($('gp_rO'), r.toFixed(2));
      txt($('gp_stO'), Math.round(st * 100) + '%');
      txt($('gp_thO'), Math.round(th * 100) + '%');

      var se = (pi * r) / (pi * r + (1 - pi));
      var gapv = Math.abs(se - st);
      var fightSE = se <= th + 1e-12;
      var fightST = st <= th + 1e-12;
      var same = fightSE === fightST;

      txt($('gp_se'), se.toFixed(3));
      txt($('gp_story'), st.toFixed(3));
      txt($('gp_gap'), gapv.toFixed(3));
      txt($('gp_same'), same ? '是' : '否');
      tint($('gp_same'), same ? C.green : C.red);
      var msg = same
        ? ('μ_SE=' + se.toFixed(3) + ' 与故事 ' + st.toFixed(3) + ' 相对门槛 ' + th.toFixed(2) +
          ' 给出相同行动（' + (fightSE ? '斗争' : '默许') + '）——故事碰巧与 SE 同侧')
        : ('μ_SE=' + se.toFixed(3) + '→' + (fightSE ? '斗争' : '默许') +
          '，故事 μ=' + st.toFixed(3) + '→' + (fightST ? '斗争' : '默许') +
          '：行动翻转——该故事可作为弱 PBE，但未必是一致 SE');
      txt($('gp_vh'), msg);
      tint($('gp_vh'), same ? C.green : C.red);

      bars(cv, [
        { lab: 'μ_SE', v: se, c: C.green },
        { lab: '故事', v: st, c: C.red },
        { lab: '门槛', v: th, c: C.amber },
        { lab: '|差|', v: gapv, c: C.blue }
      ], 0, 1.05);
    }
    bind(['gp_pi', 'gp_r', 'gp_st', 'gp_th'], upd);
    upd();
  })();
})();
