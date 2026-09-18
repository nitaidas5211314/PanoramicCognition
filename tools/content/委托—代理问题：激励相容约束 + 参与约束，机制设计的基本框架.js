/* ============================================================
   《委托—代理问题：激励相容 + 参与约束》主题脚本
   四个可调模型：
     1. 双结果道德风险 · 代理成本（IC+IR 绑定）
     2. 有限责任 · 谁绑定
     3. 线性激励 β*（Holmström–Milgrom）
     4. 两类型筛选 · 信息租金
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
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.classList && t.classList.contains('tab')) setTimeout(fn, 40);
    });
    window.addEventListener('resize', function () { setTimeout(fn, 40); });
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
      ymin = Math.min.apply(null, vs.concat([0])) - 0.02;
      ymax = Math.max.apply(null, vs.concat([0])) + 0.02;
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
      var lab = (typeof it.v === 'number' ? it.v.toFixed(3) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }

  function clampPair(ph, pl) {
    if (ph <= pl + 0.05) ph = pl + 0.05;
    return { ph: ph, pl: pl };
  }

  /* ── 1. Second-best agency cost ── */
  (function sb() {
    if (!$('sb_ph')) return;
    function run() {
      var rawPh = +$('sb_ph').value, pl = +$('sb_pl').value, cH = +$('sb_c').value, ubar = +$('sb_u').value;
      var pair = clampPair(rawPh, pl); var pH = pair.ph; pl = pair.pl;
      txt($('sb_phO'), pH.toFixed(2));
      txt($('sb_plO'), pl.toFixed(2));
      txt($('sb_cO'), cH.toFixed(2));
      txt($('sb_uO'), ubar.toFixed(2));
      var dp = pH - pl;
      var rhsIR = ubar + cH;
      var rhsIC = cH / dp;
      var x0 = rhsIR - pH * rhsIC;
      var x1 = x0 + rhsIC;
      // keep utilities real: if x0<0, still show but clamp wages for display physics
      if (x0 < -1e-9) {
        // infeasible under sqrt utility with these params — push IR by raising both keeping IC
        x0 = 0;
        x1 = Math.max(rhsIC, rhsIR / pH);
      }
      var w0 = x0 * x0, w1 = x1 * x1;
      var Ew = pH * w1 + (1 - pH) * w0;
      var wFB = rhsIR * rhsIR;
      var ac = Ew - wFB;
      var piSB = pH * 1 - Ew;
      var piFB = pH * 1 - wFB;
      txt($('sb_w'), w1.toFixed(4) + ' / ' + w0.toFixed(4));
      txt($('sb_ew'), Ew.toFixed(4) + ' / ' + wFB.toFixed(4));
      txt($('sb_ac'), ac.toFixed(4));
      txt($('sb_pi'), piSB.toFixed(4));
      var vh = $('sb_vh');
      if (ac < 0.005) {
        txt(vh, '判定：代理成本接近 0 —— 激励几乎免费（似然比很大或成本很低）。');
        tint(vh, C.green);
      } else if (ac < 0.05) {
        txt(vh, '判定：典型次优 —— IC+IR 绑定，委托人付风险/激励贴水 ' + ac.toFixed(4) + '。');
        tint(vh, C.blue);
      } else {
        txt(vh, '判定：代理成本偏高 —— 考虑更好信号、监控，或放弃实施高努力。');
        tint(vh, C.amber);
      }
      var items = [
        { v: wFB, lab: 'wFB', c: C.green },
        { v: Ew, lab: 'E[w]', c: C.blue },
        { v: ac, lab: '代理成本', c: C.red },
        { v: piSB, lab: 'πSB', c: C.amber }
      ];
      items._axis = '工资 / 利润';
      bars($('sbChart'), items, -0.05, Math.max(0.3, piFB + 0.05));
    }
    bind(['sb_ph', 'sb_pl', 'sb_c', 'sb_u'], run);
    run();
  })();

  /* ── 2. Limited liability binding ── */
  (function ll() {
    if (!$('ll_ph')) return;
    function run() {
      var rawPh = +$('ll_ph').value, pl = +$('ll_pl').value, cH = +$('ll_c').value, ubar = +$('ll_u').value;
      var pair = clampPair(rawPh, pl); var pH = pair.ph; pl = pair.pl;
      txt($('ll_phO'), pH.toFixed(2));
      txt($('ll_plO'), pl.toFixed(2));
      txt($('ll_cO'), cH.toFixed(2));
      txt($('ll_uO'), ubar.toFixed(2));
      var dp = pH - pl;
      var w0 = 0;
      var x1ic = cH / dp;
      var x1 = x1ic;
      var uH = pH * x1 - cH;
      var irSlack = true;
      if (uH + 1e-9 < ubar) {
        x1 = Math.max(x1ic, (ubar + cH) / pH);
        uH = pH * x1 - cH;
        irSlack = false;
      }
      var w1 = x1 * x1;
      var Ew = pH * w1;
      var rent = uH - ubar;
      txt($('ll_w'), w1.toFixed(4));
      txt($('ll_uh'), uH.toFixed(4));
      txt($('ll_rent'), Math.max(0, rent).toFixed(4));
      var bindLab = irSlack ? 'IC 绑 · IR 松' : (Math.abs(x1 - x1ic) < 1e-9 ? 'IC+IR 同绑' : 'IR 绑 · IC 松/过强');
      // if raised above IC min, IC still satisfied (slack or bind at min)
      if (!irSlack && x1 > x1ic + 1e-9) bindLab = 'IR 绑 · IC 松';
      else if (!irSlack) bindLab = 'IC+IR 同绑';
      else bindLab = 'IC 绑 · IR 松';
      txt($('ll_bind'), bindLab);
      var vh = $('ll_vh');
      if (irSlack && rent > 0.02) {
        txt(vh, '判定：有限责任制造信息/激励租金 ' + rent.toFixed(3) + ' —— 不是「大方」，是约束产物。');
        tint(vh, C.amber);
      } else if (!irSlack) {
        txt(vh, '判定：保留效用够高，IR 吃掉租金；激励成本主要体现为更高 w₁。');
        tint(vh, C.blue);
      } else {
        txt(vh, '判定：IR 刚好贴边或租金很小。');
        tint(vh, C.green);
      }
      var items = [
        { v: w1, lab: 'w₁', c: C.blue },
        { v: Ew, lab: 'E[w]', c: C.amber },
        { v: uH, lab: '效用', c: C.green },
        { v: Math.max(0, rent), lab: '租金', c: C.red }
      ];
      items._axis = '工资 / 效用';
      bars($('llChart'), items, -0.02, Math.max(0.35, w1 + 0.05));
    }
    bind(['ll_ph', 'll_pl', 'll_c', 'll_u'], run);
    run();
  })();

  /* ── 3. Linear HM ── */
  (function hm() {
    if (!$('hm_b')) return;
    function run() {
      var B = +$('hm_b').value, r = +$('hm_r').value, c = +$('hm_c').value, sig2 = +$('hm_s').value;
      txt($('hm_bO'), B.toFixed(2));
      txt($('hm_rO'), r.toFixed(2));
      txt($('hm_cO'), c.toFixed(2));
      txt($('hm_sO'), sig2.toFixed(2));
      var beta = B / (1 + r * c * sig2);
      var e = beta / c;
      var eFB = B / c;
      var rp = 0.5 * r * beta * beta * sig2;
      var gap = (1 - e / eFB) * 100;
      txt($('hm_beta'), beta.toFixed(3));
      txt($('hm_eff'), e.toFixed(3) + ' / ' + eFB.toFixed(3));
      txt($('hm_risk'), rp.toFixed(3));
      txt($('hm_gap'), gap.toFixed(1) + '%');
      var vh = $('hm_vh');
      if (beta > 0.7) {
        txt(vh, '判定：激励很强 —— 噪声小或风险容忍高；接近完全信息。');
        tint(vh, C.green);
      } else if (beta > 0.25) {
        txt(vh, '判定：标准折中 —— β*=' + beta.toFixed(3) + '，努力缺口 ' + gap.toFixed(1) + '%。');
        tint(vh, C.blue);
      } else {
        txt(vh, '判定：弱激励区 —— 噪声/风险厌恶主导；考虑换信号或监控。');
        tint(vh, C.amber);
      }
      var items = [
        { v: beta, lab: 'β*', c: C.blue },
        { v: e, lab: 'e*', c: C.green },
        { v: eFB, lab: 'eFB', c: C.amber },
        { v: rp, lab: '风险成本', c: C.red }
      ];
      items._axis = '强度 / 努力 / 成本';
      bars($('hmChart'), items, -0.05, Math.max(eFB, 1) + 0.15);
    }
    bind(['hm_b', 'hm_r', 'hm_c', 'hm_s'], run);
    run();
  })();

  /* ── 4. Screening info rent ── */
  (function sc() {
    if (!$('sc_th')) return;
    function run() {
      var th = +$('sc_th').value, tl = +$('sc_tl').value, fh = +$('sc_fh').value;
      if (th <= tl + 0.05) th = tl + 0.05;
      if (fh > 0.95) fh = 0.95;
      if (fh < 0.05) fh = 0.05;
      var fl = 1 - fh;
      txt($('sc_thO'), th.toFixed(2));
      txt($('sc_tlO'), tl.toFixed(2));
      txt($('sc_fhO'), fh.toFixed(2));
      var qH = th;
      var qL = Math.max(0, tl - (fh / fl) * (th - tl));
      var rent = (th - tl) * qL;
      var SH = th * qH - 0.5 * qH * qH;
      var SL = tl * qL - 0.5 * qL * qL;
      var Sp = fh * (SH - rent) + fl * SL;
      var dist = tl - qL;
      txt($('sc_q'), qH.toFixed(3) + ' / ' + qL.toFixed(3));
      txt($('sc_rent'), rent.toFixed(3));
      txt($('sc_sp'), Sp.toFixed(3));
      txt($('sc_dist'), dist.toFixed(3));
      var vh = $('sc_vh');
      if (qL < 1e-6) {
        txt(vh, '判定：低类型被排除（qL=0）—— 高类型先验太大，不值得服务低类型。');
        tint(vh, C.red);
      } else if (rent > 0.5) {
        txt(vh, '判定：信息租金很重 —— 类型差大或低类型数量多。');
        tint(vh, C.amber);
      } else {
        txt(vh, '判定：经典次优 —— 高类型有效率产量，低类型向下扭曲 ' + dist.toFixed(3) + '。');
        tint(vh, C.blue);
      }
      var items = [
        { v: qH, lab: 'qH', c: C.green },
        { v: qL, lab: 'qL', c: C.blue },
        { v: rent, lab: '租金', c: C.red },
        { v: Sp, lab: '委托人剩余', c: C.amber }
      ];
      items._axis = '产量 / 租金 / 剩余';
      bars($('scChart'), items, -0.1, Math.max(th, Sp, rent) + 0.3);
    }
    bind(['sc_th', 'sc_tl', 'sc_fh'], run);
    run();
  })();
})();
