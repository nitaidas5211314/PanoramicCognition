/* ============================================================
   《协调博弈与谢林点》主题脚本
   四个可调模型：
     1. ECR：显著性抬高匹配率
     2. 支付不对称摧毁焦点（AER 2008 经验近似）
     3. 猎鹿：支付占优 vs 风险占优
     4. 性别战：无焦点混合 vs 有焦点
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

  function ecrOf(f, n) {
    if (n <= 1) return 1;
    return f * f + (1 - f) * (1 - f) / (n - 1);
  }

  /* AER 2008 风格分段：δ=0 → s0；δ→1% → ~0.52；δ≥10% → ~0.50 */
  function asymEcr(deltaPct, s0) {
    var d = Math.max(0, deltaPct);
    var floor = 0.50;
    var mid = 0.52;
    if (d <= 0) return s0;
    if (d <= 1) return s0 + (mid - s0) * (d / 1);
    if (d <= 10) return mid + (floor - mid) * ((d - 1) / 9);
    return floor;
  }

  /* ── 1. ECR ── */
  (function ecrTool() {
    var nEl = $('ecr_n'), fEl = $('ecr_f');
    if (!nEl || !fEl) return;
    var cv = $('ecrChart');

    function upd() {
      var n = parseInt(nEl.value, 10);
      var f = parseFloat(fEl.value);
      var ecr = ecrOf(f, n);
      var base = 1 / n;
      var lift = base > 0 ? (ecr / base - 1) * 100 : 0;
      var col = ecr >= 0.7 ? C.green : (ecr >= 0.4 ? C.amber : C.red);

      txt($('ecr_nO'), String(n));
      txt($('ecr_fO'), f.toFixed(2));
      txt($('ecr_ecr'), ecr.toFixed(3));
      txt($('ecr_base'), base.toFixed(3));
      txt($('ecr_lift'), (lift >= 0 ? '+' : '') + lift.toFixed(0) + '%');
      txt($('ecr_vh'), 'n=' + n + ',f=' + f.toFixed(2) + ' → ECR=' + ecr.toFixed(3) + '，远高于均匀 ' + base.toFixed(3) + '；显著性把协调从「碰运气」变成「默契」');
      tint($('ecr_vh'), col);
      tint($('ecr_ecr'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      function sy(v) { return y1 - (v / 1.05) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = 0; v <= 1; v += 0.25) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(2), pl - 6, y + 4);
      }

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(base));
      ctx.lineTo(w - pr, sy(base));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      var i, ff, x, yy;
      for (i = 0; i <= 100; i++) {
        ff = i / 100;
        x = sx(ff);
        yy = sy(ecrOf(ff, n));
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(f), sy(ecr), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('蓝=ECR(f)  琥珀虚线=1/n  红点=当前', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('焦点选择率 f', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx / 2), y1 + 13);
      });
    }
    bind(['ecr_n', 'ecr_f'], upd);
    upd();
  })();

  /* ── 2. Asymmetry ── */
  (function asymTool() {
    var dEl = $('asym_d'), sEl = $('asym_s');
    if (!dEl || !sEl) return;
    var cv = $('asymChart');

    function upd() {
      var d = parseFloat(dEl.value);
      var s0 = parseFloat(sEl.value);
      var ecr = asymEcr(d, s0);
      var drop = (s0 - ecr) * 100;
      var lab, col;
      if (d < 0.5) { lab = '焦点仍强'; col = C.green; }
      else if (d < 3) { lab = '焦点崩塌中'; col = C.amber; }
      else { lab = '近乎随机'; col = C.red; }

      txt($('asym_dO'), d.toFixed(1));
      txt($('asym_sO'), s0.toFixed(2));
      txt($('asym_ecr'), ecr.toFixed(3));
      txt($('asym_drop'), drop.toFixed(1) + 'pp');
      txt($('asym_lab'), lab);
      txt($('asym_vh'), 'δ=' + d.toFixed(1) + '% → ECR≈' + ecr.toFixed(3) + '（对称基准 ' + s0.toFixed(2) + '）；' +
        (d <= 0 ? '对齐 AER 对称 ~82%' : (d <= 1.05 ? '对齐微小不对称 ~52%' : '中度不对称贴近混合 ~50%')));
      tint($('asym_vh'), col);
      tint($('asym_lab'), col);
      tint($('asym_ecr'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var xmax = 15;
      function sy(v) { return y1 - ((v - 0.4) / (1.0 - 0.4)) * bh; }
      function sx(t) { return pl + (t / xmax) * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      [0.5, 0.6, 0.7, 0.8, 0.9].forEach(function (v) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(1), pl - 6, y + 4);
      });

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      var i, dd, x, yy;
      for (i = 0; i <= 150; i++) {
        dd = i / 10;
        x = sx(dd);
        yy = sy(asymEcr(dd, s0));
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(d), sy(ecr), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('ECR vs 利益倾斜 δ（AER 风格分段近似）', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('利益倾斜 δ（%）', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '5', '10', '15'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx * 5), y1 + 13);
      });
    }
    bind(['asym_d', 'asym_s'], upd);
    upd();
  })();

  /* ── 3. Stag Hunt ── */
  (function stagTool() {
    var REl = $('stag_R'), rEl = $('stag_r'), pEl = $('stag_p');
    if (!REl || !rEl || !pEl) return;
    var cv = $('stagChart');

    function upd() {
      var R = parseFloat(REl.value);
      var r = parseFloat(rEl.value);
      var p = parseFloat(pEl.value);
      var pstar = R > 0 ? r / R : 1;
      var euS = p * R;
      var best = euS >= r - 1e-9 ? '鹿' : '兔';
      var col = best === '鹿' ? C.green : C.amber;

      txt($('stag_RO'), R.toFixed(1));
      txt($('stag_rO'), r.toFixed(1));
      txt($('stag_pO'), p.toFixed(2));
      txt($('stag_pstar'), pstar.toFixed(3));
      txt($('stag_euS'), euS.toFixed(2));
      txt($('stag_best'), best);
      txt($('stag_vh'), 'p=' + p.toFixed(2) + (p >= pstar - 1e-9 ? ' ≥ ' : ' < ') + 'p*=' + pstar.toFixed(2) +
        ' → 选' + best + '；焦点若把共同预期抬过 p*，帕累托均衡可被选中');
      tint($('stag_vh'), col);
      tint($('stag_best'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymax = Math.max(R, r) * 1.1;
      function sy(v) { return y1 - (v / ymax) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = 0; v <= ymax; v += ymax / 4) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(1), pl - 6, y + 4);
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(0));
      ctx.lineTo(sx(1), sy(R));
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(r));
      ctx.lineTo(sx(1), sy(r));
      ctx.stroke();

      ctx.strokeStyle = C.red;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(Math.min(1, Math.max(0, pstar))), pt);
      ctx.lineTo(sx(Math.min(1, Math.max(0, pstar))), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(p), sy(euS), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('绿=EU(鹿)  琥珀=EU(兔)  红虚线=p*  蓝点=当前', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('对方选鹿概率 p', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx / 2), y1 + 13);
      });
    }
    bind(['stag_R', 'stag_r', 'stag_p'], upd);
    upd();
  })();

  /* ── 4. Battle of Sexes + focal ── */
  (function bosTool() {
    var aEl = $('bos_a'), bEl = $('bos_b'), fEl = $('bos_f');
    if (!aEl || !bEl || !fEl) return;
    var cv = $('bosChart');

    function upd() {
      var a = parseFloat(aEl.value);
      var b = parseFloat(bEl.value);
      var f = parseFloat(fEl.value);
      var p = b / (1 + b);
      var q = 1 / (1 + a);
      var mix = p * q + (1 - p) * (1 - q);
      var foc = f * 1 + (1 - f) * mix;
      var lift = foc - mix;
      var col = lift >= 0.2 ? C.green : C.amber;

      txt($('bos_aO'), a.toFixed(1));
      txt($('bos_bO'), b.toFixed(1));
      txt($('bos_fO'), f.toFixed(2));
      txt($('bos_mix'), mix.toFixed(3));
      txt($('bos_foc'), foc.toFixed(3));
      txt($('bos_lift'), (lift >= 0 ? '+' : '') + lift.toFixed(3));
      txt($('bos_vh'), '混合下匹配仅 ' + mix.toFixed(3) + '；f=' + f.toFixed(2) +
        ' 的公共约定把匹配抬到 ' + foc.toFixed(3) + '——焦点的价值是「避免抛硬币」');
      tint($('bos_vh'), col);
      tint($('bos_foc'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      function sy(v) { return y1 - (v / 1.05) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = 0; v <= 1; v += 0.25) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(2), pl - 6, y + 4);
      }

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(mix));
      ctx.lineTo(w - pr, sy(mix));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      var i, ff, x, yy;
      for (i = 0; i <= 100; i++) {
        ff = i / 100;
        x = sx(ff);
        yy = sy(ff * 1 + (1 - ff) * mix);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(f), sy(foc), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('蓝=有焦点匹配率  琥珀虚线=混合匹配率', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('焦点收敛率 f', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx / 2), y1 + 13);
      });
    }
    bind(['bos_a', 'bos_b', 'bos_f'], upd);
    upd();
  })();
})();
