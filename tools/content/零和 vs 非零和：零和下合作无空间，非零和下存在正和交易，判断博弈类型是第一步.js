/* ============================================================
   《零和 vs 非零和》主题脚本
   四个可调模型：
     1. 联合支付类型判定
     2. 正和交易剩余 V−C
     3. 零和误判期望损失
     4. 整合谈判 vs 均分
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

  /* ── 1. Sum-type classifier ── */
  (function sumType() {
    var ids = ['sm_s11', 'sm_s12', 'sm_s21', 'sm_s22'];
    if (!$('sm_s11')) return;
    var cv = $('smChart');

    function upd() {
      var vals = ids.map(function (id) { return parseFloat($(id).value); });
      ids.forEach(function (id, i) { txt($(id + 'O'), vals[i].toFixed(1)); });
      var mx = Math.max.apply(null, vals);
      var mn = Math.min.apply(null, vals);
      var span = mx - mn;
      var uniq = {};
      vals.forEach(function (v) { uniq[v.toFixed(6)] = true; });
      var nUniq = Object.keys(uniq).length;
      var isConst = nUniq === 1;
      var kind, col;
      if (isConst && Math.abs(vals[0]) < 1e-9) {
        kind = '零和（常数=0）';
        col = C.red;
      } else if (isConst) {
        kind = '常数和（≡零和）';
        col = C.amber;
      } else if (mn >= 0) {
        kind = '可变和 · 全程非负';
        col = C.green;
      } else if (mx <= 0) {
        kind = '可变和 · 全程非正';
        col = C.amber;
      } else {
        kind = '可变和 · 可正可负';
        col = C.blue;
      }

      txt($('sm_kind'), kind);
      txt($('sm_max'), mx.toFixed(1));
      txt($('sm_min'), mn.toFixed(1));
      txt($('sm_span'), span.toFixed(1));
      tint($('sm_kind'), col);

      var msg;
      if (isConst && Math.abs(vals[0]) < 1e-9) {
        msg = '四格联合支付皆 0 → 严格零和：合作无增量空间，适用极小极大。';
      } else if (isConst) {
        msg = '联合支付恒为 ' + vals[0].toFixed(1) + ' → 常数和，策略上等价于零和（平移即可）。';
      } else {
        msg = '联合支付随结果变化（极差 ' + span.toFixed(1) + '）。正和空间 = max−min；去检查 max 格是否激励可达。';
      }
      txt($('sm_vh'), msg);
      tint($('sm_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 48, pr = 20, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var labs = ['S₁₁', 'S₁₂', 'S₂₁', 'S₂₂'];
      var maxAbs = Math.max(1, Math.abs(mx), Math.abs(mn));
      function sx(v) { return pl + bw / 2 + (v / maxAbs) * (bw / 2 - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 4); }

      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(sx(0), pt);
      ctx.lineTo(sx(0), y1);
      ctx.stroke();

      vals.forEach(function (v, i) {
        var y = sy(i), x0 = sx(0), x1 = sx(v);
        var barC = Math.abs(v - mx) < 1e-9 && span > 0 ? C.green : (v < 0 ? C.red : C.blue);
        ctx.fillStyle = barC;
        ctx.fillRect(Math.min(x0, x1), y - 10, Math.abs(x1 - x0) || 2, 20);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(labs[i], pl, y - 14);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, v.toFixed(1), v >= 0 ? x1 + 8 : x1 - 8, y + 4,
          v >= 0 ? 'left' : 'right', pl, w);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('联合支付 S（相对 0）', pl + bw / 2, y1 + 31);
    }

    bind(ids, upd);
    upd();
  })();

  /* ── 2. Trade surplus ── */
  (function trade() {
    if (!$('tr_v')) return;
    var cv = $('trChart');

    function upd() {
      var V = parseFloat($('tr_v').value);
      var Cc = parseFloat($('tr_c').value);
      var P = parseFloat($('tr_p').value);
      txt($('tr_vO'), V.toFixed(0));
      txt($('tr_cO'), Cc.toFixed(0));
      txt($('tr_pO'), P.toFixed(0));

      var joint = V - Cc;
      var buy = V - P;
      var sell = P - Cc;
      var feasible = V >= Cc && P >= Cc && P <= V;
      var pos = joint > 0;

      txt($('tr_joint'), joint.toFixed(0));
      txt($('tr_buy'), buy.toFixed(0));
      txt($('tr_sell'), sell.toFixed(0));
      txt($('tr_ok'), feasible ? '是' : '否');

      var col = feasible && pos ? C.green : (feasible ? C.amber : C.red);
      tint($('tr_ok'), col);
      tint($('tr_joint'), pos ? C.green : C.red);

      var msg;
      if (!pos) {
        msg = 'V≤C → 无正和空间（联合剩余 ' + joint.toFixed(0) + '）。强行成交是负和或零创造。';
      } else if (!feasible) {
        msg = '存在正和空间 ' + joint.toFixed(0) + '，但 P 落在 [C,V]=[' + Cc + ',' + V + '] 之外 → 至少一方拒绝。';
      } else {
        msg = '正和交易成立：联合 +' + joint.toFixed(0) + '，买方 +' + buy.toFixed(0) + '，卖方 +' + sell.toFixed(0) + '。若当零和拒谈，这整块蒸发。';
      }
      txt($('tr_vh'), msg);
      tint($('tr_vh'), col);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 56, pr = 24, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var items = [
        { lab: '联合 V−C', v: joint, c: pos ? C.green : C.red },
        { lab: '买方 V−P', v: buy, c: buy >= 0 ? C.blue : C.red },
        { lab: '卖方 P−C', v: sell, c: sell >= 0 ? C.amber : C.red }
      ];
      var maxAbs = Math.max(1, Math.abs(joint), Math.abs(buy), Math.abs(sell));
      function sx(v) { return pl + bw / 2 + (v / maxAbs) * (bw / 2 - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(sx(0), pt);
      ctx.lineTo(sx(0), y1);
      ctx.stroke();

      items.forEach(function (item, i) {
        var y = sy(i), x0 = sx(0), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(Math.min(x0, x1), y - 12, Math.abs(x1 - x0) || 2, 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(0), item.v >= 0 ? x1 + 8 : x1 - 8, y + 4,
          item.v >= 0 ? 'left' : 'right', pl, w);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('剩余分配（元）', pl + bw / 2, y1 + 31);
    }

    bind(['tr_v', 'tr_c', 'tr_p'], upd);
    upd();
  })();

  /* ── 3. Mislabel cost ── */
  (function mis() {
    if (!$('ms_p')) return;
    var cv = $('msChart');

    function upd() {
      var p = parseFloat($('ms_p').value) / 100;
      var S = parseFloat($('ms_s').value);
      txt($('ms_pO'), (p * 100).toFixed(0) + '%');
      txt($('ms_sO'), S.toFixed(0));

      var loss = p * S;
      var keep = (1 - p) * S;
      txt($('ms_loss'), loss.toFixed(1));
      txt($('ms_keep'), keep.toFixed(1));
      tint($('ms_loss'), C.red);
      tint($('ms_keep'), C.green);

      var msg = '期望损失 = ' + (p * 100).toFixed(0) + '% × ' + S.toFixed(0) + ' = ' +
        loss.toFixed(1) + '。每 100 次同类机会，约 ' + Math.round(p * 100) +
        ' 次因「当零和拒谈」整块蒸发。';
      txt($('ms_vh'), msg);
      tint($('ms_vh'), loss > keep ? C.red : C.amber);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 56, pr = 24, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var items = [
        { lab: '期望损失 p·S', v: loss, c: C.red },
        { lab: '期望保留 (1−p)·S', v: keep, c: C.green }
      ];
      var maxV = Math.max(1, S);
      function sx(v) { return pl + (v / maxV) * (bw - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 2); }

      items.forEach(function (item, i) {
        var y = sy(i), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(pl, y - 14, Math.max(2, x1 - pl), 28);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 18);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(1), x1 + 8, y + 4, 'left', pl, w);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('相对潜在剩余 S=' + S.toFixed(0), pl + bw / 2, y1 + 31);
    }

    bind(['ms_p', 'ms_s'], upd);
    upd();
  })();

  /* ── 4. Integrative negotiation ── */
  (function integ() {
    if (!$('ig_a1')) return;
    var cv = $('igChart');

    function upd() {
      var a1 = parseFloat($('ig_a1').value);
      var b1 = parseFloat($('ig_b1').value);
      var a2 = parseFloat($('ig_a2').value);
      var b2 = parseFloat($('ig_b2').value);
      txt($('ig_a1O'), a1.toFixed(1));
      txt($('ig_b1O'), b1.toFixed(1));
      txt($('ig_a2O'), a2.toFixed(1));
      txt($('ig_b2O'), b2.toFixed(1));

      var aTo1 = a1 >= a2;
      var bTo1 = b1 >= b2;
      var integTotal = (aTo1 ? a1 : a2) + (bTo1 ? b1 : b2);
      var dist = 0.5 * (a1 + a2) + 0.5 * (b1 + b2);
      var gain = integTotal - dist;
      var who = 'A→' + (aTo1 ? '甲' : '乙') + ' · B→' + (bTo1 ? '甲' : '乙');

      txt($('ig_int'), integTotal.toFixed(1));
      txt($('ig_dist'), dist.toFixed(1));
      txt($('ig_gain'), (gain >= 0 ? '+' : '') + gain.toFixed(1));
      txt($('ig_who'), who);
      tint($('ig_gain'), gain > 0 ? C.green : (gain < 0 ? C.red : C.ink));

      var msg;
      if (gain > 0.05) {
        msg = '偏好互补：整合 ' + integTotal.toFixed(1) + ' vs 均分基准 ' + dist.toFixed(1) +
          '，增益 ' + gain.toFixed(1) + '。零和式逐项硬切会丢掉这块。';
      } else if (gain < -0.05) {
        msg = '当前估值下「给高估值者」未优于均分基准（少见，检查估值对称）。';
      } else {
        msg = '增益接近 0：两项偏好不够互补，整合空间有限。';
      }
      txt($('ig_vh'), msg);
      tint($('ig_vh'), gain > 0 ? C.green : C.amber);

      var g = fit(cv, 214);
      if (!g) return;
      clear(g);
      var ctx = g.ctx, w = g.w, h = g.h;
      var pl = 56, pr = 24, pt = 28, y1 = h - 46;
      var bw = w - pl - pr, bh = y1 - pt;
      var items = [
        { lab: '整合总价值', v: integTotal, c: C.green },
        { lab: '均分基准', v: dist, c: C.amber },
        { lab: '增益', v: gain, c: gain >= 0 ? C.blue : C.red }
      ];
      var maxAbs = Math.max(1, Math.abs(integTotal), Math.abs(dist), Math.abs(gain));
      function sx(v) { return pl + bw / 2 + (v / maxAbs) * (bw / 2 - 8); }
      function sy(i) { return pt + (i + 0.5) * (bh / 3); }

      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      ctx.moveTo(sx(0), pt);
      ctx.lineTo(sx(0), y1);
      ctx.stroke();

      items.forEach(function (item, i) {
        var y = sy(i), x0 = sx(0), x1 = sx(item.v);
        ctx.fillStyle = item.c;
        ctx.fillRect(Math.min(x0, x1), y - 12, Math.abs(x1 - x0) || 2, 24);
        ctx.fillStyle = C.ink2;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.lab, pl, y - 16);
        ctx.fillStyle = C.ink;
        clampLabel(ctx, item.v.toFixed(1), item.v >= 0 ? x1 + 8 : x1 - 8, y + 4,
          item.v >= 0 ? 'left' : 'right', pl, w);
      });

      ctx.fillStyle = C.ink3;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('价值（相对 0）', pl + bw / 2, y1 + 31);
    }

    bind(['ig_a1', 'ig_b1', 'ig_a2', 'ig_b2'], upd);
    upd();
  })();
})();
