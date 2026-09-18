/* ============================================================
   《纳什均衡》主题脚本
   四个可调模型（全部真实参与计算）：
     1. 猜硬币 Matching Pennies：p,q → EU 与最优反应
     2. 囚徒困境：R,S,T,P → 是否 PD、纯 NE、帕累托差距
     3. 性别战：a,b → 混合 (p*,q*) 与期望支付
     4. 古诺双寡头：a,b,c → q*,P*,π*
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

  /* ── 1. Matching Pennies ── */
  (function mp() {
    var pEl = $('mp_p'), qEl = $('mp_q');
    if (!pEl || !qEl) return;
    var cv = $('mpChart');

    function upd() {
      var p = parseFloat(pEl.value);
      var q = parseFloat(qEl.value);
      var euH = 2 * q - 1;
      var euT = 1 - 2 * q;
      var eu = p * euH + (1 - p) * euT;
      var best, col;
      if (euH > euT + 1e-9) { best = '最优纯策略：正面 H（EU=' + euH.toFixed(2) + '）→ 非均衡除非对手也偏离'; col = C.red; }
      else if (euT > euH + 1e-9) { best = '最优纯策略：反面 T（EU=' + euT.toFixed(2) + '）→ 非均衡除非对手也偏离'; col = C.green; }
      else { best = '无差异：任意混合均为最优反应；唯一 NE 要求 (p*,q*)=(0.50,0.50)，EU=0'; col = C.blue; }

      txt($('mp_pO'), p.toFixed(2));
      txt($('mp_qO'), q.toFixed(2));
      txt($('mp_h'), euH.toFixed(2));
      txt($('mp_t'), euT.toFixed(2));
      txt($('mp_eu'), eu.toFixed(2));
      txt($('mp_vh'), 'q=' + q.toFixed(2) + ' → ' + best);
      tint($('mp_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = -1.05, ymax = 1.05;
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }
      function sx(t) { return pl + t * bw; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var v = -1; v <= 1; v += 0.5) {
        var y = sy(v);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(1), pl - 6, y + 4);
      }
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(pl, sy(0));
      ctx.lineTo(w - pr, sy(0));
      ctx.stroke();

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      var i, qq, x, yy;
      for (i = 0; i <= 100; i++) {
        qq = i / 100;
        x = sx(qq); yy = sy(2 * qq - 1);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        qq = i / 100;
        x = sx(qq); yy = sy(1 - 2 * qq);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(q), pt);
      ctx.lineTo(sx(q), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(q), sy(eu), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('红=EU(H)  绿=EU(T)  蓝点=你的混合EU', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillText('对手出正面概率 q', pl + bw / 2, y1 + 31);
      ctx.fillStyle = C.ink3;
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx / 2), y1 + 13);
      });
    }
    bind(['mp_p', 'mp_q'], upd);
    upd();
  })();

  /* ── 2. Prisoner's Dilemma ── */
  (function pd() {
    var rEl = $('pd_r'), tEl = $('pd_t'), pEl = $('pd_p'), sEl = $('pd_s');
    if (!rEl || !tEl || !pEl || !sEl) return;
    var cv = $('pdChart');

    function upd() {
      var R = parseFloat(rEl.value);
      var T = parseFloat(tEl.value);
      var P = parseFloat(pEl.value);
      var S = parseFloat(sEl.value);
      var isPD = (T > R && R > P && P > S && (2 * R > T + S));
      var gap = R - P;

      // Pure NE scan for 2x2 symmetric-ish labeling:
      // Row/Col choose C or D. Payoffs as classic.
      // (C,C)=(R,R), (C,D)=(S,T), (D,C)=(T,S), (D,D)=(P,P)
      var cells = [
        { name: '(C,C)', r: R, c: R },
        { name: '(C,D)', r: S, c: T },
        { name: '(D,C)', r: T, c: S },
        { name: '(D,D)', r: P, c: P }
      ];
      // Best responses
      // If col C: row prefers C iff R>=T else D; if col D: row prefers C iff S>=P else D
      // Symmetric for col.
      var neList = [];
      function brRow(colC) {
        if (colC) return R >= T ? 'C' : 'D';
        return S >= P ? 'C' : 'D';
      }
      function brCol(rowC) {
        if (rowC) return R >= T ? 'C' : 'D';
        return S >= P ? 'C' : 'D';
      }
      [['C', 'C'], ['C', 'D'], ['D', 'C'], ['D', 'D']].forEach(function (pair) {
        var rr = pair[0], cc = pair[1];
        if (brRow(cc === 'C') === rr && brCol(rr === 'C') === cc) neList.push('(' + rr + ',' + cc + ')');
      });
      var neStr = neList.length ? neList.join(' · ') : '无纯 NE';
      var col = isPD ? C.red : C.blue;
      var verdict;
      if (isPD) verdict = 'T>R>P>S 成立 → 唯一纯 NE=(D,D)；合作各得 ' + R.toFixed(1) + '，均衡各得 ' + P.toFixed(1) + '，差距 ' + gap.toFixed(1);
      else if (neList.length === 1 && neList[0] === '(C,C)') verdict = '结构已非经典 PD：合作成为纯 NE';
      else verdict = '非经典 PD 条件；纯 NE：' + neStr + '；R−P=' + gap.toFixed(1);

      txt($('pd_rO'), R.toFixed(1));
      txt($('pd_tO'), T.toFixed(1));
      txt($('pd_pO'), P.toFixed(1));
      txt($('pd_sO'), S.toFixed(1));
      txt($('pd_is'), isPD ? '是' : '否');
      txt($('pd_ne'), neStr);
      txt($('pd_gap'), gap.toFixed(1));
      txt($('pd_vh'), verdict);
      tint($('pd_vh'), col);
      tint($('pd_is'), isPD ? C.red : C.green);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 24, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var vals = [R, P, Math.max(0, gap)];
      var labs = ['合作 R', 'NE 的 P', '差距 R−P'];
      var colors = [C.green, C.amber, C.red];
      var vmax = Math.max(1, R, T, P, Math.abs(S), gap) * 1.15;
      function sy(v) { return y1 - (v / vmax) * bh; }
      var barW = bw / 5;
      ctx.fillStyle = C.ink2;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('支付对比（单边）', pl, 16);

      for (var i = 0; i < 3; i++) {
        var x0 = pl + (i + 0.7) * (bw / 3);
        var v = vals[i];
        var yTop = sy(Math.max(0, v));
        ctx.fillStyle = colors[i];
        ctx.fillRect(x0 - barW / 2, yTop, barW, y1 - yTop);
        ctx.fillStyle = C.ink;
        ctx.textAlign = 'center';
        var lab = v.toFixed(1);
        var lw = ctx.measureText(lab).width;
        var lx = Math.min(Math.max(x0, pl + lw / 2 + 4), w - pr - lw / 2 - 4);
        ctx.fillText(lab, lx, yTop - 6);
        ctx.fillStyle = C.ink3;
        ctx.fillText(labs[i], x0, y1 + 13);
      }
      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('改 T 或提高对背叛的惩罚即可移动 NE', pl + bw / 2, y1 + 31);
    }
    bind(['pd_r', 'pd_t', 'pd_p', 'pd_s'], upd);
    upd();
  })();

  /* ── 3. Battle of Sexes ── */
  (function bos() {
    var aEl = $('bos_a'), bEl = $('bos_b');
    if (!aEl || !bEl) return;
    var cv = $('bosChart');

    function upd() {
      var a = parseFloat(aEl.value);
      var b = parseFloat(bEl.value);
      var pStar = b / (1 + b);
      var qStar = 1 / (1 + a);
      var euRow = a * qStar; // = 1 - qStar
      var euPureOO = a;
      var euPureFF = 1;

      txt($('bos_aO'), a.toFixed(1));
      txt($('bos_bO'), b.toFixed(1));
      txt($('bos_p'), pStar.toFixed(3));
      txt($('bos_q'), qStar.toFixed(3));
      txt($('bos_eu'), euRow.toFixed(3));
      var msg = '两纯 NE：(歌剧,歌剧) 行得 ' + euPureOO.toFixed(1) + '；(足球,足球) 行得 ' + euPureFF.toFixed(1) +
        '；混合 EU行=' + euRow.toFixed(3) + '（协调失败更差）';
      txt($('bos_vh'), msg);
      tint($('bos_vh'), C.amber);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymax = Math.max(a, b, 1) * 1.2;
      function sy(v) { return y1 - (v / ymax) * bh; }
      function sx(t) { return pl + t * bw; }

      // EU_row(O)=a*q, EU_row(F)=1-q vs q
      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var gv = 0; gv <= ymax + 1e-9; gv += ymax / 4) {
        var y = sy(gv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(gv.toFixed(1), pl - 6, y + 4);
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      var i, q, x, yy;
      for (i = 0; i <= 100; i++) {
        q = i / 100;
        x = sx(q); yy = sy(a * q);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        q = i / 100;
        x = sx(q); yy = sy(1 - q);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(qStar), pt);
      ctx.lineTo(sx(qStar), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(qStar), sy(euRow), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'left';
      ctx.fillText('红=EU行(歌剧)  绿=EU行(足球)  虚线=q*', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillStyle = C.ink3;
      ctx.fillText('列去歌剧概率 q', pl + bw / 2, y1 + 31);
      ['0', '0.5', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab, sx(idx / 2), y1 + 13);
      });
    }
    bind(['bos_a', 'bos_b'], upd);
    upd();
  })();

  /* ── 4. Cournot ── */
  (function cou() {
    var aEl = $('cou_a'), bEl = $('cou_b'), cEl = $('cou_c');
    if (!aEl || !bEl || !cEl) return;
    var cv = $('couChart');

    function upd() {
      var a = parseFloat(aEl.value);
      var b = parseFloat(bEl.value);
      var c = parseFloat(cEl.value);
      var margin = a - c;
      var qStar, Pstar, pi, qm, msg, col;
      if (margin <= 0 || b <= 0) {
        qStar = 0; Pstar = a; pi = 0; qm = 0;
        msg = 'a≤c：无正产量 NE（市场无利可图）';
        col = C.red;
      } else {
        qStar = margin / (3 * b);
        Pstar = a - b * (2 * qStar);
        pi = (Pstar - c) * qStar;
        qm = margin / (2 * b);
        msg = '对称古诺 NE：各产 ' + qStar.toFixed(1) + '，价 ' + Pstar.toFixed(1) +
          '，利润 ' + pi.toFixed(0) + '；垄断产量会是 ' + qm.toFixed(1) + '——竞争把产量推高、利润压低';
        col = C.blue;
      }

      txt($('cou_aO'), String(Math.round(a)));
      txt($('cou_bO'), b.toFixed(1));
      txt($('cou_cO'), String(Math.round(c)));
      txt($('cou_q'), qStar.toFixed(1));
      txt($('cou_P'), Pstar.toFixed(1));
      txt($('cou_pi'), pi.toFixed(0));
      txt($('cou_vh'), msg);
      tint($('cou_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      // Best response q1(q2)=(a-c)/ (2b) - q2/2
      var qMax = margin > 0 ? margin / b : 1;
      function br(q2) { return Math.max(0, margin / (2 * b) - q2 / 2); }
      function sx(q) { return pl + (q / qMax) * bw; }
      function sy(q) { return y1 - (q / qMax) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var i = 0; i <= 4; i++) {
        var qq = (qMax * i) / 4;
        var y = sy(qq);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(qq.toFixed(0), pl - 6, y + 4);
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        var q2 = (qMax * i) / 100;
        var q1 = br(q2);
        var x = sx(q2), yy = sy(q1);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
      // BR2 as q2(q1) drawn in (q2,q1) space: q1 on y, q2 on x → q2=br(q1) means x=br(y)
      ctx.strokeStyle = C.green;
      ctx.beginPath();
      for (i = 0; i <= 100; i++) {
        var q1b = (qMax * i) / 100;
        var q2b = br(q1b);
        x = sx(q2b); yy = sy(q1b);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      if (margin > 0) {
        ctx.fillStyle = C.blue;
        ctx.beginPath();
        ctx.arc(sx(qStar), sy(qStar), 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = C.ink2;
      ctx.textAlign = 'left';
      ctx.fillText('红=BR₁(q₂)  绿=BR₂  蓝点=对称NE', pl, 16);
      ctx.textAlign = 'center';
      ctx.fillStyle = C.ink3;
      ctx.fillText('对手产量 q₂', pl + bw / 2, y1 + 31);
      ['0', '½', '1'].forEach(function (lab, idx) {
        ctx.fillText(lab + '·q̄', sx((qMax * idx) / 2), y1 + 13);
      });
    }
    bind(['cou_a', 'cou_b', 'cou_c'], upd);
    upd();
  })();
})();
