/* ============================================================
   《共同知识 Common Knowledge》主题脚本
   四个可调模型：
     1. 蓝眼睛归纳时钟
     2. 有限阶 / 几乎共同知识
     3. 电子邮件式协调门槛
     4. Aumann 同意（后验 CK）
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    purple: '#7c3aed', grid: '#eef1f5', axis: '#e2e6ec', ink3: '#7c848f',
    ink2: '#454c56', ink: '#15181d'
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

  /* ── 1. 蓝眼睛 ── */
  (function eye() {
    if (!$('eye_n')) return;
    var cv = $('eyeChart');
    function upd() {
      var n = parseInt($('eye_n').value, 10);
      var ann = parseInt($('eye_ann').value, 10) === 1;
      var night = ann ? n : null;
      var msg, col;
      if (ann) {
        msg = '公开宣告已制造 CK「至少 1 名蓝眼」→ 归纳要求深度 ' + n + ' → 第 ' + n + ' 夜同步离开';
        col = C.green;
      } else {
        msg = '无公开宣告：每人看见 ' + Math.max(0, n - 1) + ' 个蓝眼（一阶信息在），但 CK 未建立 → 归纳时钟不启动，无人离开';
        col = C.red;
      }
      txt($('eye_nO'), String(n));
      txt($('eye_annO'), ann ? '是' : '否');
      txt($('eye_night'), ann ? String(n) : '—');
      txt($('eye_clock'), ann ? '已启动' : '未启动');
      txt($('eye_depth'), ann ? String(n) : '0');
      txt($('eye_vh'), msg);
      tint($('eye_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxN = 30;
      function sx(t) { return pl + (t / maxN) * bw; }
      function sy(v) { return y1 - (v / maxN) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var k = 0; k <= 5; k++) {
        var vv = (maxN / 5) * k;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(String(Math.round(vv)), pl - 6, y + 4);
      }

      // leave-night = N if announced, else 0 line
      ctx.lineWidth = 2;
      ctx.strokeStyle = ann ? C.green : C.red;
      ctx.beginPath();
      for (var i = 1; i <= maxN; i++) {
        var lv = ann ? i : 0;
        var x = sx(i), yy = sy(lv);
        if (i === 1) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(n), pt);
      ctx.lineTo(sx(n), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = ann ? C.green : C.red;
      ctx.beginPath();
      ctx.arc(sx(n), sy(ann ? n : 0), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('蓝眼人数 N →', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = ann ? C.green : C.red;
      ctx.fillText(ann ? '离开夜=N' : '无人离开', w - pr, pt + 12);
    }
    bind(['eye_n', 'eye_ann'], upd);
    upd();
  })();

  /* ── 2. 几乎 CK ── */
  (function mk() {
    if (!$('mk_eps')) return;
    var cv = $('mkChart');
    function upd() {
      var eps = parseFloat($('mk_eps').value);
      var M = parseInt($('mk_m').value, 10);
      var p = Math.pow(1 - eps, M);
      var msg = 'ε=' + eps.toFixed(3) + '、M=' + M + ' → P≈' + p.toFixed(4) +
        '；有限阶永远不是 CK——协调博弈中可能仍钉在安全均衡';
      var col = p > 0.9 ? C.amber : (p > 0.5 ? C.blue : C.red);
      txt($('mk_epsO'), eps.toFixed(3));
      txt($('mk_mO'), String(M));
      txt($('mk_p'), p.toFixed(4));
      txt($('mk_ck'), '否');
      txt($('mk_almost'), (100 * p).toFixed(1) + '%');
      txt($('mk_vh'), msg);
      tint($('mk_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var maxM = 80;
      function sx(t) { return pl + (t / maxM) * bw; }
      function sy(v) { return y1 - v * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var k = 0; k <= 4; k++) {
        var vv = k / 4;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(2), pl - 6, y + 4);
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = C.blue;
      ctx.beginPath();
      for (var i = 0; i <= maxM; i++) {
        var pp = Math.pow(1 - eps, i);
        var x = sx(i), yy = sy(pp);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      // CK ideal = 1 horizontal
      ctx.strokeStyle = C.green;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pl, sy(1));
      ctx.lineTo(w - pr, sy(1));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(M), pt);
      ctx.lineTo(sx(M), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(M), sy(p), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('确认层数 M →', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = C.green;
      ctx.fillText('真 CK=1', w - pr, pt + 12);
      ctx.fillStyle = C.blue;
      ctx.fillText('P(深度≥M)', w - pr, pt + 26);
    }
    bind(['mk_eps', 'mk_m'], upd);
    upd();
  })();

  /* ── 3. 邮件协调门槛 ── */
  (function mail() {
    if (!$('mail_L')) return;
    var cv = $('mailChart');
    function upd() {
      var L = parseFloat($('mail_L').value);
      var q = parseFloat($('mail_q').value);
      var th = L / (1 + L);
      var eu = q * 1 + (1 - q) * (-L);
      var chooseB = q > th + 1e-12;
      var dec = chooseB ? 'B 冒险' : (Math.abs(q - th) < 1e-9 ? '无差异' : 'A 安全');
      var msg = 'q=' + q.toFixed(2) + (chooseB ? ' > ' : ' < ') + 'q*=' + th.toFixed(2) +
        ' → 选 ' + (chooseB ? 'B' : 'A') + '；EU(B)=q−L(1−q)=' + eu.toFixed(2) + (eu >= 0 ? ' ≥' : ' <') + ' 0';
      if (Math.abs(q - th) < 1e-9) {
        msg = 'q=q*=' + th.toFixed(2) + ' → 无差异；EU(B)=0';
      }
      var col = chooseB ? C.red : C.green;
      txt($('mail_LO'), L.toFixed(1));
      txt($('mail_qO'), q.toFixed(2));
      txt($('mail_th'), th.toFixed(2));
      txt($('mail_eu'), eu.toFixed(2));
      txt($('mail_dec'), dec);
      txt($('mail_vh'), msg);
      tint($('mail_vh'), col);
      tint($('mail_dec'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 24, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var ymin = -L - 0.5, ymax = 1.5;
      function sx(t) { return pl + t * bw; }
      function sy(v) { return y1 - ((v - ymin) / (ymax - ymin)) * bh; }

      ctx.strokeStyle = C.grid;
      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (var k = 0; k <= 4; k++) {
        var vv = ymin + (ymax - ymin) * k / 4;
        var y = sy(vv);
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(w - pr, y);
        ctx.stroke();
        ctx.fillText(vv.toFixed(1), pl - 6, y + 4);
      }

      // EU(A)=0
      ctx.strokeStyle = C.green;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pl, sy(0));
      ctx.lineTo(w - pr, sy(0));
      ctx.stroke();

      // EU(B)
      ctx.strokeStyle = C.red;
      ctx.beginPath();
      for (var i = 0; i <= 100; i++) {
        var qq = i / 100;
        var e = qq - L * (1 - qq);
        var x = sx(qq), yy = sy(e);
        if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();

      // threshold
      ctx.strokeStyle = C.amber;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(sx(th), pt);
      ctx.lineTo(sx(th), y1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sx(q), pt);
      ctx.lineTo(sx(q), y1);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = C.red;
      ctx.beginPath();
      ctx.arc(sx(q), sy(eu), 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('信念 q →', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = C.green;
      ctx.fillText('EU(A)=0', w - pr, pt + 12);
      ctx.fillStyle = C.red;
      ctx.fillText('EU(B)', w - pr, pt + 26);
    }
    bind(['mail_L', 'mail_q'], upd);
    upd();
  })();

  /* ── 4. Aumann ── */
  (function aum() {
    if (!$('aum_p1')) return;
    var cv = $('aumChart');
    function upd() {
      var p1 = parseFloat($('aum_p1').value);
      var p2 = parseFloat($('aum_p2').value);
      var ck = parseFloat($('aum_ck').value);
      var prior = parseInt($('aum_prior').value, 10) === 1;
      var gap = Math.abs(p1 - p2);
      var ckYes = ck >= 0.99;
      var st, mean, msg, col;
      if (!prior) {
        st = '可分歧';
        mean = '缺共同先验';
        msg = '共同先验不成立 → Aumann 同意定理不适用；持久分歧可以理性存在';
        col = C.amber;
      } else if (!ckYes) {
        st = '可分歧';
        mean = '条件未齐';
        msg = '共同先验成立，但后验未成 CK → 同意分歧不被禁止；把 CK 滑到 1 且存在差距时，定理要求后验必须相等（模型显示「违规」）';
        col = C.blue;
      } else if (gap < 0.015) {
        st = '一致';
        mean = '符合定理';
        msg = '后验已成 CK 且 |p₁−p₂|≈0 → 符合「不能同意分歧」';
        col = C.green;
      } else {
        st = '违规';
        mean = '定理禁止';
        msg = '后验已成 CK + 共同先验，但 |p₁−p₂|=' + gap.toFixed(2) + ' > 0 → 与同意定理冲突（应已通过信息交换抹平，或检查建模假设）';
        col = C.red;
      }
      txt($('aum_p1O'), p1.toFixed(2));
      txt($('aum_p2O'), p2.toFixed(2));
      txt($('aum_ckO'), ck.toFixed(2));
      txt($('aum_priorO'), prior ? '是' : '否');
      txt($('aum_gap'), gap.toFixed(2));
      txt($('aum_st'), st);
      txt($('aum_mean'), mean);
      txt($('aum_vh'), msg);
      tint($('aum_vh'), col);
      tint($('aum_st'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;

      // number line 0-1 for posteriors
      ctx.strokeStyle = C.axis;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pl, pt + bh * 0.55);
      ctx.lineTo(w - pr, pt + bh * 0.55);
      ctx.stroke();

      function sx(p) { return pl + p * bw; }
      var midY = pt + bh * 0.55;

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      for (var t = 0; t <= 4; t++) {
        var pv = t / 4;
        ctx.beginPath();
        ctx.moveTo(sx(pv), midY - 5);
        ctx.lineTo(sx(pv), midY + 5);
        ctx.strokeStyle = C.axis;
        ctx.stroke();
        ctx.fillText(pv.toFixed(2), sx(pv), midY + 20);
      }

      ctx.fillStyle = C.blue;
      ctx.beginPath();
      ctx.arc(sx(p1), midY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.purple;
      ctx.beginPath();
      ctx.arc(sx(p2), midY, 7, 0, Math.PI * 2);
      ctx.fill();

      // gap bar
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(Math.min(p1, p2)), midY - 28);
      ctx.lineTo(sx(Math.max(p1, p2)), midY - 28);
      ctx.stroke();

      ctx.fillStyle = C.ink3;
      ctx.textAlign = 'center';
      ctx.fillText('后验轴（蓝=p₁，紫=p₂）', pl + bw / 2, y1 + 31);
      ctx.textAlign = 'right';
      ctx.fillStyle = col;
      ctx.fillText(st + ' · CK=' + ck.toFixed(2), w - pr, pt + 12);
    }
    bind(['aum_p1', 'aum_p2', 'aum_ck', 'aum_prior'], upd);
    upd();
  })();
})();
