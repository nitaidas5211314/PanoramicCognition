/* ============================================================
   《逆向归纳（Backward Induction）》主题脚本
   四个可调模型：
     1. Race-to-N 必胜剩余
     2. 短蜈蚣 + 继续噪声
     3. 有限 PD 瓦解时钟
     4. 有限轮交替出价
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
      ctx.fillText(v.toFixed(1), pl - 6, y + 3);
    }
  }

  function losingSet(N, m) {
    var lose = {};
    var n, k, nxt, canWin;
    for (n = N - 1; n >= 0; n--) {
      canWin = false;
      for (k = 1; k <= m; k++) {
        nxt = n + k;
        if (nxt >= N) { canWin = true; break; }
        if (lose[nxt]) { canWin = true; break; }
      }
      if (!canWin) lose[n] = true;
    }
    return lose;
  }

  /* ── 1. Race-to-N ── */
  (function race() {
    if (!$('rc_n')) return;
    var ids = ['rc_n', 'rc_m', 'rc_s'];
    var cv = $('rcChart');

    function upd() {
      var N = parseInt($('rc_n').value, 10);
      var m = parseInt($('rc_m').value, 10);
      var s = parseInt($('rc_s').value, 10);
      if (s > N - 1) {
        s = N - 1;
        $('rc_s').value = String(s);
      }
      $('rc_s').max = String(Math.max(0, N - 1));
      txt($('rc_nO'), String(N));
      txt($('rc_mO'), String(m));
      txt($('rc_sO'), String(s));

      var lose = losingSet(N, m);
      var mod = m + 1;
      var isLose = !!lose[s];
      var target = null;
      var k;
      if (s >= N) {
        target = '—';
      } else {
        for (k = 1; k <= m; k++) {
          var nxt = s + k;
          if (nxt >= N || lose[nxt]) {
            target = nxt >= N ? N : nxt;
            break;
          }
        }
        if (target === null) target = '无（已败）';
      }

      txt($('rc_mod'), String(mod));
      txt($('rc_lose'), isLose ? '是' : '否');
      txt($('rc_to'), String(target));
      var msg;
      var col;
      if (s >= N) {
        msg = '已达终点';
        col = C.ink3;
      } else if (isLose) {
        msg = 's=' + s + ' 是失败位：任意加 1…' + m + ' 都会把对手送进可胜位';
        col = C.red;
      } else {
        msg = 's=' + s + ' 非失败位：应走到 ' + target + '，把对手留在失败位（模 ' + mod + '）';
        col = C.green;
      }
      txt($('rc_vh'), msg);
      tint($('rc_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 36, pr = 16, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var i, x, y;
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('位置 0…N−1（红=失败位）', pl + bw, pt - 8);

      for (i = 0; i < N; i++) {
        x = pl + ((i + 0.5) / N) * bw;
        y = y1 - bh * 0.35;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(2.5, Math.min(6, bw / N * 0.35)), 0, Math.PI * 2);
        ctx.fillStyle = lose[i] ? C.red : C.green;
        ctx.globalAlpha = i === s ? 1 : 0.45;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      // current marker
      x = pl + ((s + 0.5) / N) * bw;
      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, pt + 4);
      ctx.lineTo(x, y1);
      ctx.stroke();
      ctx.fillStyle = C.blue;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('s=' + s, x, pt + 14);

      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('0', pl + (0.5 / N) * bw, y1 + 13);
      ctx.fillText(String(N - 1), pl + ((N - 0.5) / N) * bw, y1 + 13);
      ctx.fillText('位置', pl + bw / 2, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 2. Centipede + noise ── */
  (function cent() {
    if (!$('ce_c')) return;
    var cv = $('ceChart');
    var tm = [2, 3, 4, 5];
    var to = [0, 1, 2, 3];
    var fin = [6, 4];

    function expected(c) {
      var pr = 1, e1 = 0, e2 = 0, i, take, p1m;
      var pNode = [];
      for (i = 0; i < 4; i++) {
        take = 1 - c;
        pNode.push(pr * take);
        p1m = (i % 2 === 0);
        if (p1m) {
          e1 += pr * take * tm[i];
          e2 += pr * take * to[i];
        } else {
          e2 += pr * take * tm[i];
          e1 += pr * take * to[i];
        }
        pr *= c;
      }
      e1 += pr * fin[0];
      e2 += pr * fin[1];
      return { e1: e1, e2: e2, pFirst: 1 - c, pEnd: pr, pNode: pNode };
    }

    function upd() {
      var c = parseFloat($('ce_c').value);
      txt($('ce_cO'), c.toFixed(2));
      var r = expected(c);
      txt($('ce_p1'), r.pFirst.toFixed(2));
      txt($('ce_e1'), r.e1.toFixed(2));
      txt($('ce_e2'), r.e2.toFixed(2));
      var msg = 'c=' + c.toFixed(2) + '：P(第一步拿)=' + r.pFirst.toFixed(2) +
        '；E=( ' + r.e1.toFixed(2) + ', ' + r.e2.toFixed(2) + ' )；纯 BI 为 c=0 → (2,0)';
      txt($('ce_vh'), msg);
      tint($('ce_vh'), c < 0.15 ? C.amber : (c > 0.7 ? C.green : C.blue));

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: 'P(拿1)', v: r.pNode[0], c: C.amber },
        { lab: 'P(拿2)', v: r.pNode[1], c: C.red },
        { lab: 'P(拿3)', v: r.pNode[2], c: C.blue },
        { lab: 'P(拿4)', v: r.pNode[3], c: C.green },
        { lab: 'P(终点)', v: r.pEnd, c: C.ink }
      ];
      var ymax = Math.max(0.2, Math.max.apply(null, vals.map(function (o) { return o.v; })) * 1.15);
      axisY(ctx, pl, y1, pt, bh, 0, ymax, w);
      var barW = bw / (vals.length * 1.5);
      vals.forEach(function (o, i) {
        var x = pl + (i + 0.5) * (bw / vals.length) - barW / 2;
        var yv = y1 - (o.v / ymax) * bh;
        ctx.fillStyle = o.c;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, yv, barW, Math.max(2, y1 - yv));
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        var lab = o.v.toFixed(2);
        var lw = ctx.measureText(lab).width;
        var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 4), w - pr - lw / 2 - 4);
        ctx.fillText(lab, lx, yv - 6);
        ctx.fillStyle = C.ink3;
        ctx.fillText(o.lab, x + barW / 2, y1 + 13);
      });
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('各节点「拿走」概率质量', pl + bw, pt - 6);
      ctx.fillText('概率', pl + bw, y1 + 31);
    }
    bind(['ce_c'], upd);
    upd();
  })();

  /* ── 3. Finite PD ── */
  (function fpd() {
    if (!$('fp_n')) return;
    var ids = ['fp_n', 'fp_r', 'fp_p'];
    var cv = $('fpChart');

    function upd() {
      var N = parseInt($('fp_n').value, 10);
      var R = parseFloat($('fp_r').value);
      var P = parseFloat($('fp_p').value);
      txt($('fp_nO'), String(N));
      txt($('fp_rO'), R.toFixed(1));
      txt($('fp_pO'), P.toFixed(1));
      var bi = N * P;
      var cc = N * R;
      var gap = cc - bi;
      txt($('fp_bi'), bi.toFixed(1));
      txt($('fp_cc'), cc.toFixed(1));
      txt($('fp_gap'), gap.toFixed(1));
      var msg = '已知 N=' + N + ' ⇒ BI 每期背叛，总支付 ' + bi.toFixed(1) +
        '；幻想全合作 ' + cc.toFixed(1) + '，缺口 ' + gap.toFixed(1) + '（非均衡）';
      txt($('fp_vh'), msg);
      tint($('fp_vh'), gap > 0 ? C.red : C.ink3);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      // cumulative: BI flat at P each period; fantasy R each period
      var tmax = N;
      var ymin = 0;
      var ymax = Math.max(cc, bi, 1) * 1.1;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
      function sx(t) { return pl + (t / tmax) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.red;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(0));
      ctx.lineTo(sx(N), sy(bi));
      ctx.stroke();

      ctx.strokeStyle = C.green;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(0));
      ctx.lineTo(sx(N), sy(cc));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('累计支付：红=BI 全背叛，绿虚=幻想全合作', pl + bw, pt - 6);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('期数 t', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'left';
      ctx.fillText('0', pl, y1 + 13);
      ctx.textAlign = 'right';
      ctx.fillText(String(N), pl + bw, y1 + 13);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 4. Alternating offers ── */
  (function barg() {
    if (!$('bg_s')) return;
    var ids = ['bg_s', 'bg_d', 'bg_t'];
    var cv = $('bgChart');

    function altOffer(S, delta, T) {
      var v1, v2, t, cont1, cont2;
      if (T % 2 === 1) { v1 = S; v2 = 0; }
      else { v1 = 0; v2 = S; }
      for (t = T - 1; t >= 1; t--) {
        cont1 = delta * v1;
        cont2 = delta * v2;
        if (t % 2 === 1) {
          v1 = S - cont2;
          v2 = cont2;
        } else {
          v2 = S - cont1;
          v1 = cont1;
        }
      }
      return { v1: v1, v2: v2 };
    }

    function upd() {
      var S = parseFloat($('bg_s').value);
      var d = parseFloat($('bg_d').value);
      var T = parseInt($('bg_t').value, 10);
      txt($('bg_sO'), String(S));
      txt($('bg_dO'), d.toFixed(2));
      txt($('bg_tO'), String(T));
      var r = altOffer(S, d, T);
      var lim = S / (1 + d);
      txt($('bg_first'), r.v1.toFixed(1));
      txt($('bg_second'), r.v2.toFixed(1));
      txt($('bg_lim'), lim.toFixed(1));
      var msg = 'T=' + T + ',δ=' + d.toFixed(2) + '：先手 ' + r.v1.toFixed(1) +
        ' / 后手 ' + r.v2.toFixed(1) + '；无限极限先手≈' + lim.toFixed(1);
      txt($('bg_vh'), msg);
      tint($('bg_vh'), C.blue);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var tmax = 20;
      var ymin = 0, ymax = S * 1.05;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
      function sx(t) { return pl + (t / tmax) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      var tt;
      for (tt = 1; tt <= tmax; tt++) {
        var rr = altOffer(S, d, tt);
        var x = sx(tt), y = sy(rr.v1);
        if (tt === 1) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(1), sy(lim));
      ctx.lineTo(sx(tmax), sy(lim));
      ctx.stroke();
      ctx.setLineDash([]);

      // marker at current T
      var cur = altOffer(S, d, T);
      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(T), sy(cur.v1), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('先手份额随 T（黄虚=无限极限）', pl + bw, pt - 6);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('轮次 T', pl + bw / 2, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();
})();
