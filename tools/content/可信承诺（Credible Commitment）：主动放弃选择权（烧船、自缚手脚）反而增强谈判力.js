/* ============================================================
   《可信承诺（Credible Commitment）》主题脚本
   四个可调模型：
     1. 鸡博弈烧桥
     2. 谈判承诺：单方 vs 双边冲突
     3. 时间不一致通胀偏见
     4. 人质保证金 H*
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

  /* ── 1. 鸡博弈烧桥 ── */
  (function chicken() {
    if (!$('ch_burn')) return;
    var ids = ['ch_ss', 'ch_win', 'ch_lose', 'ch_crash', 'ch_burn'];
    var cv = $('chChart');

    function upd() {
      var ss = parseFloat($('ch_ss').value);
      var win = parseFloat($('ch_win').value);
      var lose = parseFloat($('ch_lose').value);
      var crash = parseFloat($('ch_crash').value);
      var burn = parseInt($('ch_burn').value, 10) === 1;
      txt($('ch_ssO'), ss.toFixed(1));
      txt($('ch_winO'), win.toFixed(1));
      txt($('ch_loseO'), lose.toFixed(1));
      txt($('ch_crashO'), crash.toFixed(1));
      txt($('ch_burnO'), burn ? '是' : '否');

      var act, opp, pay, msg, col;
      if (burn) {
        act = '直行（已承诺）';
        if (lose >= crash - 1e-9) {
          opp = '软化';
          pay = win;
          msg = '烧桥后对手比较软化 ' + lose.toFixed(1) + ' vs 撞车 ' + crash.toFixed(1) +
            ' → 必软化；你得 ' + win.toFixed(1);
          col = C.green;
        } else {
          opp = '直行（撞车）';
          pay = crash;
          msg = '异常：软化支付低于撞车，对手也硬刚 → 双方 ' + crash.toFixed(1);
          col = C.red;
        }
      } else {
        act = '可软可硬（未承诺）';
        opp = '不确定';
        pay = ss;
        msg = '无烧桥：可能协调在双软 ' + ss.toFixed(1) + '，或混策略面临撞车 ' +
          crash.toFixed(1) + '；承诺可把结果锁到硬对软 ' + win.toFixed(1);
        col = C.amber;
      }

      txt($('ch_act'), act);
      txt($('ch_opp'), opp);
      txt($('ch_pay'), pay.toFixed(1));
      txt($('ch_vh'), msg);
      tint($('ch_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [
        { lab: '双软', v: ss, c: C.amber },
        { lab: '硬对软', v: win, c: C.green },
        { lab: '软对硬', v: lose, c: C.blue },
        { lab: '撞车', v: crash, c: C.red },
        { lab: '你当前', v: pay, c: burn ? C.green : C.amber }
      ];
      var ymin = Math.min(ss, win, lose, crash, pay) - 1;
      var ymax = Math.max(ss, win, lose, crash, pay) + 1;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
      var barW = bw / (vals.length * 1.45);
      vals.forEach(function (o, i) {
        var x = pl + (i + 0.5) * (bw / vals.length) - barW / 2;
        var y0 = y1 - ((0 - ymin) / (ymax - ymin)) * bh;
        var yv = y1 - ((o.v - ymin) / (ymax - ymin)) * bh;
        var top = Math.min(y0, yv), bot = Math.max(y0, yv);
        ctx.fillStyle = o.c;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x, top, barW, Math.max(2, bot - top));
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.ink;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        var lab = o.v.toFixed(1);
        var lw = ctx.measureText(lab).width;
        var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 4), w - pr - lw / 2 - 4);
        ctx.fillText(lab, lx, Math.min(top, yv) - 6);
        ctx.fillStyle = C.ink3;
        ctx.fillText(o.lab, x + barW / 2, y1 + 18);
      });
      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('鸡博弈支付比较', pl + bw, pt - 6);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 2. 谈判承诺 ── */
  (function bargain() {
    if (!$('bg_q')) return;
    var ids = ['bg_s', 'bg_d', 'bg_q', 'bg_mode'];
    var cv = $('bgChart');

    function euBilateral(S, d, q) {
      var conf = q * q;
      var aOnly = q * (1 - q);
      var bOnly = (1 - q) * q;
      var bothFlex = (1 - q) * (1 - q);
      var eu = conf * 0 + aOnly * d + bOnly * (S - d) + bothFlex * (S / 2);
      return { conf: conf, eu: eu };
    }

    function upd() {
      var S = parseFloat($('bg_s').value);
      var d = parseFloat($('bg_d').value);
      var q = parseFloat($('bg_q').value);
      var mode = parseInt($('bg_mode').value, 10);
      if (d > S) d = S;
      txt($('bg_sO'), String(S));
      txt($('bg_dO'), String(d));
      txt($('bg_qO'), q.toFixed(2));
      txt($('bg_modeO'), String(mode));

      var base = S / 2;
      var conf, eu, msg, col;
      if (mode === 0) {
        conf = 0;
        eu = d;
        msg = '单方 q=1 要价 ' + d + '：对方得 ' + (S - d) + ' ≥ 0 → 接受；你得 ' +
          d + '（对半基准 ' + base.toFixed(1) + '）';
        col = eu >= base ? C.green : C.amber;
      } else {
        var r = euBilateral(S, d, q);
        conf = r.conf;
        eu = r.eu;
        msg = '双边 q=' + q.toFixed(2) + ' 各要 ' + d + '：冲突 ' + conf.toFixed(2) +
          '；EU=' + eu.toFixed(1) + (eu < base ? ' < ' : ' ≥ ') + base.toFixed(1) +
          (eu < base ? ' → 互绑过狠反而更差' : ' → 仍优于对半');
        col = eu < base ? C.red : C.green;
      }

      txt($('bg_conf'), conf.toFixed(2));
      txt($('bg_eu'), eu.toFixed(1));
      txt($('bg_base'), base.toFixed(1));
      txt($('bg_vh'), msg);
      tint($('bg_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = 0, ymax = S * 1.05;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);

      function sx(qv) { return pl + ((qv - 0.1) / 0.9) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(base));
      ctx.lineTo(pl + bw, sy(base));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = C.amber;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('对半 ' + base.toFixed(0), pl + 4, sy(base) - 4);

      ctx.strokeStyle = C.blue;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 90; i++) {
        var qv = 0.1 + (i / 90) * 0.9;
        var ev = euBilateral(S, d, qv).eu;
        var x = sx(qv), y = sy(ev);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = C.red;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (var j = 0; j <= 90; j++) {
        var q2 = 0.1 + (j / 90) * 0.9;
        var cf = q2 * q2 * S;
        var x2 = sx(q2), y2 = sy(cf);
        if (j === 0) ctx.moveTo(x2, y2); else ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      var cur = mode === 1 ? eu : d;
      ctx.fillStyle = C.green;
      ctx.beginPath();
      ctx.arc(mode === 1 ? sx(q) : pl + bw * 0.5, sy(cur), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('蓝：双边EU(q) · 红：冲突损失尺度 q²·S', pl + bw, pt - 8);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('粘住概率 q', pl + bw / 2, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 3. 时间不一致 ── */
  (function timeInc() {
    if (!$('ti_chi')) return;
    var ids = ['ti_chi', 'ti_com'];
    var cv = $('tiChart');

    function upd() {
      var chi = parseFloat($('ti_chi').value);
      var com = parseInt($('ti_com').value, 10) === 1;
      txt($('ti_chiO'), chi.toFixed(1));
      txt($('ti_comO'), com ? '是' : '否');

      var piDisc = chi;
      var LDisc = 0.5 * chi * chi;
      var pi = com ? 0 : piDisc;
      var L = com ? 0 : LDisc;
      var save = LDisc - L;

      txt($('ti_pi'), pi.toFixed(1));
      txt($('ti_L'), L.toFixed(1));
      txt($('ti_save'), save.toFixed(1));
      var msg = com
        ? ('承诺锁定 π=0，L=0；裁量会选 π=χ=' + chi.toFixed(1) + '，L=' + LDisc.toFixed(1) +
          ' → 承诺节省 ' + save.toFixed(1))
        : ('裁量均衡 π=χ=' + chi.toFixed(1) + '，L=' + L.toFixed(1) +
          '；打开承诺可把损失降到 0');
      txt($('ti_vh'), msg);
      tint($('ti_vh'), com ? C.green : C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var chiMax = 10;
      var ymin = 0, ymax = 0.5 * chiMax * chiMax * 1.05;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);

      function sx(c) { return pl + (c / chiMax) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.red;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 0; i <= 100; i++) {
        var c = (i / 100) * chiMax;
        var Lv = 0.5 * c * c;
        var x = sx(c), y = sy(Lv);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = C.green;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(0));
      ctx.lineTo(pl + bw, sy(0));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = com ? C.green : C.red;
      ctx.beginPath();
      ctx.arc(sx(chi), sy(L), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('红：裁量损失 ½χ² · 绿：承诺 L=0', pl + bw, pt - 8);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('诱惑强度 χ', pl + bw / 2, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();

  /* ── 4. 人质 H* ── */
  (function hostage() {
    if (!$('hs_h')) return;
    var ids = ['hs_g', 'hs_t', 'hs_h'];
    var cv = $('hsChart');

    function upd() {
      var G = parseFloat($('hs_g').value);
      var T = parseFloat($('hs_t').value);
      var H = parseFloat($('hs_h').value);
      txt($('hs_gO'), G.toFixed(1));
      txt($('hs_tO'), T.toFixed(1));
      txt($('hs_hO'), H.toFixed(1));

      var Hstar = Math.max(0, T - G);
      var net = T - H;
      var ok = G >= net - 1e-9;
      txt($('hs_star'), Hstar.toFixed(1));
      txt($('hs_ok'), ok ? '是' : '否');
      txt($('hs_net'), net.toFixed(1));
      var msg = 'H=' + H.toFixed(1) + (ok ? ' ≥ ' : ' < ') + 'H*=' + Hstar.toFixed(1) +
        ' → 背叛净得 T−H=' + net.toFixed(1) + (ok ? ' ≤ ' : ' > ') + '合作 G=' + G.toFixed(1) +
        (ok ? ' → 合作可信' : ' → 仍会背叛');
      txt($('hs_vh'), msg);
      tint($('hs_vh'), ok ? C.green : C.red);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var hMax = 20;
      var ymin = Math.min(0, G, T - hMax) - 1;
      var ymax = Math.max(G, T, net) + 2;
      axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);

      function sx(hv) { return pl + (hv / hMax) * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.green;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(G));
      ctx.lineTo(sx(hMax), sy(G));
      ctx.stroke();

      ctx.strokeStyle = C.red;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(0), sy(T));
      ctx.lineTo(sx(hMax), sy(T - hMax));
      ctx.stroke();

      if (Hstar <= hMax) {
        ctx.strokeStyle = C.amber;
        ctx.beginPath();
        ctx.moveTo(sx(Hstar), pt);
        ctx.lineTo(sx(Hstar), y1);
        ctx.stroke();
        ctx.fillStyle = C.amber;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('H*=' + Hstar.toFixed(1), sx(Hstar), pt - 4);
      }

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(H), sy(net), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('绿：合作G · 红：背叛净得T−H · 点：当前', pl + bw, pt - 8);
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('人质 H', pl + bw / 2, y1 + 31);
    }
    bind(ids, upd);
    upd();
  })();
})();
