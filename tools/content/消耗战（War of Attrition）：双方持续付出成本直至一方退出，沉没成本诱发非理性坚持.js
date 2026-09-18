/* ============================================================
   《消耗战 War of Attrition》主题脚本
   四个可调模型：
     1. 对称 ESS（V → 时长 / 危险率 / 耗散）
     2. 无纯 ESS（固定 m 被入侵）
     3. 企业消耗战（c, Π）
     4. 沉没成本幻觉（λV−c vs L）
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
  function r1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function r2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function r3(x) { return (Math.round(x * 1000) / 1000).toFixed(3); }
  function clampLabel(ctx, lab, x, y, align, pl, w) {
    var lw = ctx.measureText(lab).width;
    ctx.textAlign = align;
    var lx = align === 'left' ? Math.min(x, w - lw - 6) : Math.max(x, pl + 6);
    ctx.fillText(lab, lx, y);
  }

  /* ── 1. Symmetric ESS ── */
  (function ess() {
    var vEl = $('ess_v');
    if (!vEl) return;
    var cv = $('essChart');

    function upd() {
      var V = parseFloat(vEl.value);
      var ex = V;
      var emin = V / 2;
      var lam = 1 / V;
      var pay = 0;
      var med = V * Math.log(2);
      var p10 = Math.exp(-10 / V);
      var pCont5 = Math.exp(-2 * 5 / V);

      txt($('ess_vO'), r1(V));
      txt($('ess_ex'), r1(ex));
      txt($('ess_emin'), r1(emin));
      txt($('ess_lam'), r3(lam));
      txt($('ess_pay'), r2(pay));

      var msg = 'V=' + r1(V) + ' → E[X]=' + r1(ex) + '，E[对局]=' + r1(emin) +
        '，中位数=' + r1(med) + '；P(对局>5)=' + r2(pCont5) +
        '；总期望耗散=V，个人E[支付]=0';
      txt($('ess_vh'), msg);
      tint($('ess_vh'), C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var xmax = Math.max(12, Math.ceil((V * 3) / 6) * 6);
      var ymax = 1 / V * 1.15;

      function sx(x) { return pl + (x / xmax) * bw; }
      function sy(y) { return y1 - (y / ymax) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 1;
      for (var i = 0; i <= 6; i++) {
        var xx = sx((xmax / 6) * i);
        ctx.beginPath(); ctx.moveTo(xx, pt); ctx.lineTo(xx, y1); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(String(Math.round((xmax / 6) * i)), xx, y1 + 13);
      }
      ctx.fillStyle = C.ink2; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('坚持成本 x', pl + bw / 2, y1 + 31);

      ctx.strokeStyle = C.blue; ctx.lineWidth = 2; ctx.beginPath();
      for (var t = 0; t <= xmax; t += xmax / 200) {
        var dens = Math.exp(-t / V) / V;
        var X = sx(t), Y = sy(dens);
        if (t === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.stroke();

      // mean marker
      ctx.strokeStyle = C.amber; ctx.setLineDash([4, 3]); ctx.beginPath();
      ctx.moveTo(sx(ex), pt); ctx.lineTo(sx(ex), y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.amber; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('E[X]=' + r1(ex), sx(ex), pt + 12);

      // contest mean
      ctx.strokeStyle = C.green; ctx.setLineDash([4, 3]); ctx.beginPath();
      ctx.moveTo(sx(emin), pt); ctx.lineTo(sx(emin), y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.green; ctx.font = '11px sans-serif';
      var lab = 'E[min]=' + r1(emin);
      var lx = sx(emin);
      if (Math.abs(sx(ex) - lx) < 50) lx = sx(emin) + (emin < ex ? -40 : 40);
      ctx.textAlign = 'center';
      ctx.fillText(lab, lx, pt + 26);

      ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('p(x)=(1/V)e^(−x/V)', pl + bw, pt + 12);
    }
    bind(['ess_v'], upd);
    upd();
  })();

  /* ── 2. No pure ESS ── */
  (function pure() {
    var mEl = $('pure_m'), vEl = $('pure_v');
    if (!mEl || !vEl) return;
    var cv = $('pureChart');

    function upd() {
      var m = parseFloat(mEl.value), V = parseFloat(vEl.value);
      var res = V / 2 - m;
      var mut = V - m; // m+eps vs m
      var adv = mut - res; // = V/2
      var zero = 0; // strategy 0 vs m: lose immediately, payoff 0
      var zeroBeats = zero > res;

      txt($('pure_mO'), r1(m));
      txt($('pure_vO'), r1(V));
      txt($('pure_res'), r1(res));
      txt($('pure_mut'), r1(mut));
      txt($('pure_adv'), r1(adv));
      txt($('pure_zero'), r1(zero));
      tint($('pure_adv'), C.red);
      tint($('pure_res'), res < 0 ? C.red : C.green);

      var msg;
      if (m > V / 2 && zeroBeats) {
        msg = '居民互遇支付 ' + r1(res) + ' < 0 → 零策略（立即退出）也能入侵；同时 m+ε 对固定 m 优势恒为 V/2=' + r1(V / 2);
      } else {
        msg = 'm=' + r1(m) + ' → 突变 m+ε 支付 ' + r1(mut) + '，居民 ' + r1(res) +
          '，优势 = V/2 = ' + r1(adv) + '；无纯 ESS';
      }
      txt($('pure_vh'), msg);
      tint($('pure_vh'), C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [res, mut, zero];
      var labs = ['居民互遇', '略长突变', '零策略'];
      var colors = [C.amber, C.red, C.green];
      var minV = Math.min(0, res, mut, zero);
      var maxV = Math.max(0.1, res, mut, zero);
      var span = maxV - minV || 1;
      function sx(v) { return pl + ((v - minV) / span) * bw; }
      var zeroX = sx(0);
      var barH = 28, gap = 18;
      var startY = pt + 20;

      ctx.strokeStyle = C.axis; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(zeroX, pt); ctx.lineTo(zeroX, y1); ctx.stroke();

      for (var i = 0; i < 3; i++) {
        var y = startY + i * (barH + gap);
        var x0 = sx(0), x1 = sx(vals[i]);
        ctx.fillStyle = colors[i];
        ctx.fillRect(Math.min(x0, x1), y, Math.abs(x1 - x0), barH);
        ctx.fillStyle = C.ink; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(labs[i], pl, y - 4);
        var lab = r1(vals[i]);
        ctx.fillStyle = C.ink2;
        clampLabel(ctx, lab, vals[i] >= 0 ? x1 + 8 : x1 - 8, y + barH / 2 + 4,
          vals[i] >= 0 ? 'left' : 'right', pl, w);
      }
      ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('期望支付（对固定种群 m）', pl + bw / 2, y1 + 31);
    }
    bind(['pure_m', 'pure_v'], upd);
    upd();
  })();

  /* ── 3. Firm war of attrition ── */
  (function firm() {
    var cEl = $('firm_c'), piEl = $('firm_pi');
    if (!cEl || !piEl) return;
    var cv = $('firmChart');

    function upd() {
      var c = parseFloat(cEl.value), Pi = parseFloat(piEl.value);
      var h = c / Pi;
      var dur = Pi / (2 * c);
      var tot = 2 * c * dur; // = Pi
      var ratio = tot / Pi;

      txt($('firm_cO'), r1(c));
      txt($('firm_piO'), String(Math.round(Pi)));
      txt($('firm_h'), r3(h));
      txt($('firm_dur'), r1(dur));
      txt($('firm_tot'), r1(tot));
      txt($('firm_ratio'), r2(ratio));
      tint($('firm_ratio'), Math.abs(ratio - 1) < 0.01 ? C.amber : C.blue);

      var msg = 'h=c/Π=' + r3(h) + '；E[期数]=' + r1(dur) +
        '；双方总期望成本=' + r1(tot) + ' ≈ Π（对称完全信息租金打光）';
      txt($('firm_vh'), msg);
      tint($('firm_vh'), C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, hgt = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = hgt - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var T = Math.max(12, Math.ceil((dur * 3 + 3) / 6) * 6);
      function sx(t) { return pl + (t / T) * bw; }
      function sy(p) { return y1 - p * bh; }

      // survival of contest P(min > t) = exp(-2 h t)
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1;
      for (var i = 0; i <= 6; i++) {
        var xx = sx((T / 6) * i);
        ctx.beginPath(); ctx.moveTo(xx, pt); ctx.lineTo(xx, y1); ctx.stroke();
        ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(String(Math.round((T / 6) * i)), xx, y1 + 13);
      }
      ctx.fillStyle = C.ink2; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('对峙期数 t', pl + bw / 2, y1 + 31);

      ctx.strokeStyle = C.blue; ctx.lineWidth = 2; ctx.beginPath();
      for (var t = 0; t <= T; t += T / 200) {
        var surv = Math.exp(-2 * h * t);
        var X = sx(t), Y = sy(surv);
        if (t === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(sx(dur), pt); ctx.lineTo(sx(dur), y1); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.amber; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('E[t]=' + r1(dur), sx(dur), pt + 12);

      ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('P(仍在对峙)', pl + bw, pt + 12);
    }
    bind(['firm_c', 'firm_pi'], upd);
    upd();
  })();

  /* ── 4. Sunk cost illusion ── */
  (function sunk() {
    var vEl = $('sunk_v'), cEl = $('sunk_c'), lEl = $('sunk_l'), LEl = $('sunk_L');
    if (!vEl || !cEl || !lEl || !LEl) return;
    var cv = $('sunkChart');

    function upd() {
      var V = parseFloat(vEl.value), c = parseFloat(cEl.value);
      var lam = parseFloat(lEl.value), L = parseFloat(LEl.value);
      var rat = lam * V - c;
      var fall = lam * V - c - L; // wrong: treat L as extra loss to "recover"
      var decide = rat >= 0;
      var decide2 = fall >= 0;

      txt($('sunk_vO'), r1(V));
      txt($('sunk_cO'), r1(c));
      txt($('sunk_lO'), r2(lam));
      txt($('sunk_LO'), String(Math.round(L)));
      txt($('sunk_rat'), r2(rat));
      txt($('sunk_fall'), r2(fall));
      txt($('sunk_dec'), decide ? '续战' : '停止');
      txt($('sunk_dec2'), decide2 ? '续战' : '停止');
      tint($('sunk_dec'), decide ? C.green : C.red);
      tint($('sunk_dec2'), decide2 ? C.amber : C.red);
      tint($('sunk_rat'), decide ? C.green : C.red);

      var msg = 'λV=' + r2(lam * V) + (decide ? ' ≥ ' : ' < ') + 'c=' + r1(c) +
        ' → 理性' + (decide ? '续战' : '停止') + '；L=' + Math.round(L) +
        ' 不改变该不等式' +
        (decide !== decide2 ? '——若把 L 塞进公式会误判为' + (decide2 ? '续战' : '停止') : '');
      txt($('sunk_vh'), msg);
      tint($('sunk_vh'), decide !== decide2 ? C.red : (decide ? C.green : C.amber));

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 16, pt = 18, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [lam * V, c, L, rat];
      var labs = ['λV 收益', '瞬时成本 c', '沉没 L(禁)', '理性 λV−c'];
      var colors = [C.blue, C.amber, C.ink3, decide ? C.green : C.red];
      var minV = Math.min(0, vals[0], vals[1], vals[2], vals[3]);
      var maxV = Math.max(0.1, vals[0], vals[1], vals[2], vals[3]);
      var span = maxV - minV || 1;
      function sx(v) { return pl + ((v - minV) / span) * bw; }
      var zeroX = sx(0);
      var barH = 22, gap = 14;
      var startY = pt + 16;

      ctx.strokeStyle = C.axis; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(zeroX, pt); ctx.lineTo(zeroX, y1); ctx.stroke();

      for (var i = 0; i < 4; i++) {
        var y = startY + i * (barH + gap);
        var x0 = sx(0), x1 = sx(vals[i]);
        ctx.globalAlpha = i === 2 ? 0.45 : 1;
        ctx.fillStyle = colors[i];
        ctx.fillRect(Math.min(x0, x1), y, Math.abs(x1 - x0) || 1, barH);
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(labs[i], pl, y - 3);
        clampLabel(ctx, r2(vals[i]), vals[i] >= 0 ? x1 + 8 : x1 - 8, y + barH / 2 + 4,
          vals[i] >= 0 ? 'left' : 'right', pl, w);
      }
      ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('续战只比较 λV 与 c；L 灰色表示禁止入式', pl + bw / 2, y1 + 31);
    }
    bind(['sunk_v', 'sunk_c', 'sunk_l', 'sunk_L'], upd);
    upd();
  })();
})();
