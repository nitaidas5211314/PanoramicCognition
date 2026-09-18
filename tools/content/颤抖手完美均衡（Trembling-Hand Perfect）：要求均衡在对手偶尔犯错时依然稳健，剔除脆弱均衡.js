/* ============================================================
   《颤抖手完美均衡》主题脚本
   四个可调模型：
     1. 弱劣势 2×2 压力测试
     2. 进入威慑 ε 检验
     3. 承诺 C* 使威胁变完美
     4. ε-proper 失误权重直觉
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
      var lw = ctx.measureText(lab).width;
      var lx = x + barW / 2;
      var ly = o.v >= 0 ? Math.max(yv - 6, pt + 10) : Math.min(yv + 14, y1 - 4);
      ctx.fillText(lab, lx, ly);
      ctx.fillStyle = C.ink2;
      ctx.font = '10px sans-serif';
      var lines = (o.lab || '').split('\n');
      lines.forEach(function (ln, j) {
        ctx.fillText(ln, lx, y1 + 13 + j * 12);
      });
      void lw;
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('支付 / 概率', pl + bw / 2, y1 + 31);
  }

  /* ── 1. 弱劣势矩阵 ── */
  (function wd() {
    if (!$('wd_eq')) return;
    var cv = $('wdChart');
    function upd() {
      var eq = parseInt($('wd_eq').value, 10); // 0=D,R  1=U,L
      var eps = parseFloat($('wd_eps').value) / 100;
      txt($('wd_epsO'), (eps * 100).toFixed(1) + '%');
      txt($('wd_eqO'), eq === 0 ? 'D,R（脆弱）' : 'U,L（稳健）');

      var intend, deviate, gap, ok, msg, col;
      if (eq === 0) {
        // Opponent intends R, trembles to L with eps. Player intends D.
        intend = 0;
        deviate = eps * 1; // U
        gap = intend - deviate;
        ok = gap >= -1e-12;
        msg = '对手以 ε 抖到 L：选 D 得 0，选 U 得 ε=' + deviate.toFixed(3) + ' → D 非 BR，(D,R) 非完美';
        col = C.red;
      } else {
        // Opponent intends L, trembles to R with eps. Player intends U.
        intend = (1 - eps) * 1;
        deviate = 0;
        gap = intend - deviate;
        ok = gap >= -1e-12;
        msg = '对手以 ε 抖到 R：选 U 得 ' + intend.toFixed(3) + '，选 D 得 0 → U 仍是 BR，(U,L) 通过';
        col = C.green;
      }
      txt($('wd_int'), intend.toFixed(3));
      txt($('wd_dev'), deviate.toFixed(3));
      txt($('wd_gap'), (gap >= 0 ? '+' : '') + gap.toFixed(3));
      txt($('wd_br'), ok ? '是' : '否');
      tint($('wd_br'), ok ? C.green : C.red);
      txt($('wd_vh'), msg);
      tint($('wd_vh'), col);

      var ymin = Math.min(0, intend, deviate) - 0.05;
      var ymax = Math.max(0.2, intend, deviate) + 0.05;
      bars(cv, [
        { lab: '意图', v: intend, c: ok ? C.green : C.red },
        { lab: '偏离', v: deviate, c: C.amber },
        { lab: '差距', v: gap, c: C.blue }
      ], ymin, ymax);
    }
    bind(['wd_eq', 'wd_eps'], upd);
    upd();
  })();

  /* ── 2. 进入威慑 ── */
  (function en() {
    if (!$('en_eps')) return;
    var cv = $('enChart');
    function upd() {
      var eps = parseFloat($('en_eps').value) / 100;
      var M = parseFloat($('en_m').value);
      var fi = parseFloat($('en_fi').value);
      var ai = parseFloat($('en_ai').value);
      txt($('en_epsO'), (eps * 100).toFixed(1) + '%');
      txt($('en_mO'), M.toFixed(1));
      txt($('en_fiO'), fi.toFixed(1));
      txt($('en_aiO'), ai.toFixed(1));

      var ef = (1 - eps) * M + eps * fi;
      var ea = (1 - eps) * M + eps * ai;
      var gap = ea - ef;
      var perf = !(eps > 1e-12 && gap > 1e-12);
      // (Out,Fight) is perfect only if Fight remains BR under tremble — i.e. ef >= ea
      var fightBR = ef >= ea - 1e-12;
      perf = fightBR;

      txt($('en_fight'), ef.toFixed(3));
      txt($('en_accom'), ea.toFixed(3));
      txt($('en_gap'), (gap >= 0 ? '+' : '') + gap.toFixed(3));
      txt($('en_perf'), perf ? '是' : '否');
      tint($('en_perf'), perf ? C.green : C.red);
      var msg = perf
        ? ('ε=' + (eps * 100).toFixed(1) + '% 时斗争 ' + ef.toFixed(3) + ' ≥ 默许 ' + ea.toFixed(3) + ' → (Out,Fight) 对这笔颤抖仍可完美')
        : ('ε=' + (eps * 100).toFixed(1) + '% 时默许 ' + ea.toFixed(3) + ' > 斗争 ' + ef.toFixed(3) + '（差 ' + gap.toFixed(3) + '）→ 斗争非 BR，(Out,Fight) 非完美');
      txt($('en_vh'), msg);
      tint($('en_vh'), perf ? C.green : C.red);

      var ymin = Math.min(0, ef, ea, M, fi, ai) - 0.3;
      var ymax = Math.max(M, ef, ea, ai) + 0.3;
      bars(cv, [
        { lab: 'E斗争', v: ef, c: C.red },
        { lab: 'E默许', v: ea, c: C.green },
        { lab: '垄断M', v: M, c: C.amber },
        { lab: '差距', v: gap, c: C.blue }
      ], ymin, ymax);
    }
    bind(['en_eps', 'en_m', 'en_fi', 'en_ai'], upd);
    upd();
  })();

  /* ── 3. 承诺 C* ── */
  (function cm() {
    if (!$('c_c')) return;
    var cv = $('cChart');
    function upd() {
      var Cc = parseFloat($('c_c').value);
      var eps = parseFloat($('c_eps').value) / 100;
      var fi = parseFloat($('c_fi').value);
      var ai = parseFloat($('c_ai').value);
      txt($('c_cO'), Cc.toFixed(1));
      txt($('c_epsO'), (eps * 100).toFixed(1) + '%');
      txt($('c_fiO'), fi.toFixed(1));
      txt($('c_aiO'), ai.toFixed(1));

      var eff = fi + Cc;
      var star = Math.max(0, ai - fi);
      var cred = eff >= ai - 1e-12;
      // Under Out-intended with ε enter: E[Fight]=(1-ε)M + ε*eff, E[Accom]=(1-ε)M + ε*ai
      // Fight BR iff eff >= ai (same as on-path after entry) when M cancels
      var br = eff >= ai - 1e-12;

      txt($('c_eff'), eff.toFixed(1));
      txt($('c_star'), star.toFixed(1));
      txt($('c_cred'), cred ? '是' : '否');
      txt($('c_br'), br ? '是' : '否');
      tint($('c_cred'), cred ? C.green : C.red);
      tint($('c_br'), br ? C.green : C.red);
      var msg = cred
        ? ('C=' + Cc.toFixed(1) + ' ≥ C*=' + star.toFixed(1) + ' → 进入后斗争可信；任意 ε 下斗争仍是 BR，威慑可成完美')
        : ('C=' + Cc.toFixed(1) + ' < C*=' + star.toFixed(1) + ' → 进入后仍想默许；ε>0 时 (Out,Fight) 非完美');
      txt($('c_vh'), msg);
      tint($('c_vh'), cred ? C.green : C.amber);

      var ymin = Math.min(fi, ai, eff, 0) - 0.5;
      var ymax = Math.max(ai, eff, star, Cc) + 0.5;
      bars(cv, [
        { lab: 'f+C', v: eff, c: cred ? C.green : C.red },
        { lab: '默许', v: ai, c: C.amber },
        { lab: 'C*', v: star, c: C.blue },
        { lab: 'C', v: Cc, c: C.ink2 }
      ], ymin, ymax);
    }
    bind(['c_c', 'c_eps', 'c_fi', 'c_ai'], upd);
    upd();
  })();

  /* ── 4. proper 权重 ── */
  (function pr() {
    if (!$('pr_eps')) return;
    var cv = $('prChart');
    function upd() {
      var eps = parseFloat($('pr_eps').value) / 100;
      var K = parseInt($('pr_k').value, 10);
      txt($('pr_epsO'), (eps * 100).toFixed(1) + '%');
      txt($('pr_kO'), String(K));

      var uni = 1 / K;
      var Z = 0, w = 1;
      for (var i = 0; i < K; i++) {
        Z += w;
        w *= eps;
      }
      var prop = Math.pow(eps, K - 1) / Z;
      var ratio = prop > 0 ? uni / prop : Infinity;

      txt($('pr_uni'), (uni * 100).toFixed(1) + '%');
      txt($('pr_prop'), (prop * 100).toFixed(1) + '%');
      txt($('pr_ratio'), (ratio > 1000 ? '>1000' : ratio.toFixed(1)) + '×');
      txt($('pr_lab'), ratio > 5 ? '贵失误被压制' : '接近均匀');
      var msg = 'K=' + K + '、ε=' + (eps * 100).toFixed(1) + '%：均匀最差 ' + (uni * 100).toFixed(1) +
        '% vs proper ' + (prop * 100).toFixed(1) + '%（权重 ε^' + (K - 1) + ' / Z，Z=' + Z.toFixed(4) + '）';
      txt($('pr_vh'), msg);
      tint($('pr_vh'), C.blue);

      // show weights for each rank
      var vals = [];
      var ww = 1;
      for (var j = 0; j < K; j++) {
        vals.push({ lab: '秩' + j, v: ww / Z, c: j === K - 1 ? C.red : (j === 0 ? C.green : C.blue) });
        ww *= eps;
      }
      bars(cv, vals, 0, Math.max(0.2, vals[0].v) + 0.05);
    }
    bind(['pr_eps', 'pr_k'], upd);
    upd();
  })();
})();
