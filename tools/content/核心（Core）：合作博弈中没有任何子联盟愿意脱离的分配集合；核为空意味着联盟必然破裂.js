/* ============================================================
   《核心（Core）》主题脚本
   四个可调模型：
     1. 三人盈余分配核检验
     2. 对称两两联盟 Bondareva 阈值
     3. 手套市场核
     4. 多数博弈 ε-核
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
      ymin = Math.min.apply(null, vs.concat([0])) - 0.05;
      ymax = Math.max.apply(null, vs.concat([0])) + 0.05;
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
      var lab = (typeof it.v === 'number' ? it.v.toFixed(it.dp != null ? it.dp : 2) : String(it.v));
      var lw = ctx.measureText(lab).width;
      var lx = Math.min(Math.max(x + barW / 2, pl + lw / 2 + 2), w - pr - lw / 2 - 2);
      ctx.fillText(lab, lx, top - 6);
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(items._axis || '数值', pl + bw, y1 + 31);
  }

  /* —— 模型 A：盈余核检验 —— */
  function updateCore() {
    var x1 = +($('x1') && $('x1').value);
    var x2 = +($('x2') && $('x2').value);
    var x3 = 6 - x1 - x2;
    if ($('x1_o')) txt($('x1_o'), x1.toFixed(1));
    if ($('x2_o')) txt($('x2_o'), x2.toFixed(1));
    if ($('x3_o')) txt($('x3_o'), x3.toFixed(1));
    if ($('x3disp')) $('x3disp').value = Math.max(0, Math.min(6, x3));

    var e12 = 4 - (x1 + x2);
    var e13 = 3 - (x1 + x3);
    var e23 = 2 - (x2 + x3);
    var e1 = 0 - x1, e2 = 0 - x2, e3 = 0 - x3;
    var maxe = Math.max(e12, e13, e23, e1, e2, e3);
    var feasible = x3 >= -1e-9 && x1 >= -1e-9 && x2 >= -1e-9;
    var inCore = feasible && maxe <= 1e-9;

    txt($('ro_x3'), x3.toFixed(2));
    txt($('ro_maxe'), maxe.toFixed(2));
    tint($('ro_maxe'), maxe > 1e-9 ? C.red : C.green);
    txt($('ro_incore'), !feasible ? '无效（x₃<0）' : (inCore ? '是' : '否'));
    tint($('ro_incore'), inCore ? C.green : C.red);

    var verdict = $('core_v');
    if (verdict) {
      var msg = !feasible
        ? 'x₁+x₂>6，效率无法满足，先缩小份额。'
        : (inCore
          ? '所有超额≤0：该点在核内。沙普利值 (2.5, 2.0, 1.5) 亦在核内。'
          : '最大超额来自阻塞联盟；调整份额或承认需制度补丁。');
      verdict.innerHTML = '<span style="color:' + (inCore && feasible ? C.green : C.amber) + '">' + msg + '</span>';
    }

    var items = [
      { lab: 'e₁₂', v: e12, c: e12 > 0 ? C.red : C.green, dp: 2 },
      { lab: 'e₁₃', v: e13, c: e13 > 0 ? C.red : C.green, dp: 2 },
      { lab: 'e₂₃', v: e23, c: e23 > 0 ? C.red : C.green, dp: 2 },
      { lab: 'x₁', v: x1, c: C.blue, dp: 2 },
      { lab: 'x₂', v: x2, c: C.blue, dp: 2 },
      { lab: 'x₃', v: x3, c: C.blue, dp: 2 }
    ];
    items._axis = '超额 / 份额';
    bars($('coreChart'), items, Math.min(-1, maxe, x3) - 0.2, Math.max(4.5, x1, x2, x3) + 0.2);
  }

  /* —— 模型 B：Bondareva —— */
  function updateBal() {
    var a = +($('a_pair') && $('a_pair').value);
    var vn = +($('vn') && $('vn').value);
    txt($('a_o'), a.toFixed(1));
    txt($('vn_o'), vn.toFixed(1));
    var bal = 1.5 * a;
    var gap = bal - vn;
    var empty = gap > 1e-9;
    var border = Math.abs(gap) <= 1e-9;

    txt($('ro_bal'), bal.toFixed(2));
    txt($('ro_gap'), gap.toFixed(2));
    tint($('ro_gap'), empty ? C.red : (border ? C.amber : C.green));
    txt($('ro_empty'), empty ? '空' : (border ? '非空（边界）' : '非空'));
    tint($('ro_empty'), empty ? C.red : C.green);

    var verdict = $('bal_v');
    if (verdict) {
      var thr = (2 * vn / 3);
      var msg = empty
        ? 'α=½ 覆盖三对：1.5a > v(N) ⇒ 不平衡 ⇒ 核空。对称阈值 a ≤ ' + thr.toFixed(2) + '。'
        : (border
          ? '恰在 Bondareva 边界：核缩为（可能退化的）集合。'
          : '1.5a ≤ v(N)，该对称平衡族不证空；对对称博弈此条件亦充分。');
      verdict.innerHTML = '<span style="color:' + (empty ? C.red : C.green) + '">' + msg + '</span>';
    }

    var items = [
      { lab: '1.5a', v: bal, c: empty ? C.red : C.amber, dp: 2 },
      { lab: 'v(N)', v: vn, c: C.blue, dp: 2 },
      { lab: '缺口', v: gap, c: empty ? C.red : C.green, dp: 2 },
      { lab: '阈值a', v: 2 * vn / 3, c: C.ink2, dp: 2 }
    ];
    items._axis = '平衡检验';
    bars($('balChart'), items);
  }

  /* —— 模型 C：手套 —— */
  function updateGlove() {
    var L = +($('L_n') && $('L_n').value);
    var R = +($('R_n') && $('R_n').value);
    var pv = +($('pair_v') && $('pair_v').value);
    txt($('L_o'), String(L));
    txt($('R_o'), String(R));
    txt($('pair_o'), pv.toFixed(1));

    var pairs = Math.min(L, R);
    var vn = pairs * pv;
    var scarceIsL = L < R;
    var scarceIsR = R < L;
    var equal = L === R;
    var scarcePay = equal ? pv / 2 : pv;
    var abundPay = equal ? pv / 2 : 0;
    var scarceN = equal ? L : (scarceIsL ? L : R);
    var abundN = equal ? 0 : (scarceIsL ? R : L);

    txt($('ro_vnG'), vn.toFixed(2));
    txt($('ro_scarce'), scarcePay.toFixed(2));
    txt($('ro_abund'), abundPay.toFixed(2));

    var verdict = $('glove_v');
    if (verdict) {
      var msg;
      if (equal) {
        msg = 'L=R：核为任意把每对价值在左右之间分割且同侧玩家等份的分配；图示取对称各 ' + (pv / 2).toFixed(2) + '。';
      } else if (scarceIsL) {
        msg = '左手稀缺：核中每个左手得 ' + pv.toFixed(2) + '，右手得 0。过剩侧无谈判力。';
      } else {
        msg = '右手稀缺：核中每个右手得 ' + pv.toFixed(2) + '，左手得 0。';
      }
      verdict.innerHTML = '<span style="color:' + C.blue + '">' + msg + '</span>';
    }

    var items = [
      { lab: 'v(N)', v: vn, c: C.blue, dp: 2 },
      { lab: '稀缺/人', v: scarcePay, c: C.amber, dp: 2 },
      { lab: '过剩/人', v: abundPay, c: C.green, dp: 2 },
      { lab: '配对数', v: pairs, c: C.ink2, dp: 0 }
    ];
    items._axis = '手套核';
    bars($('gloveChart'), items, -0.05, Math.max(vn, pv) + 0.2);
  }

  /* —— 模型 D：ε-核 —— */
  function updateEps() {
    var eps = +($('eps') && $('eps').value);
    txt($('eps_o'), eps.toFixed(3));
    var eq = 1 / 3;
    txt($('eq_o'), eq.toFixed(3));
    var pairGot = 2 * eq;
    var pairNeed = 1 - eps;
    var epsStar = 1 / 3;
    // 等分在 ε-核内 ⇔ ε ≥ 1/3（避免 0.333 因 step 吸附仍略小于 1/3）
    var ok = eps + 1e-12 >= epsStar;

    txt($('ro_pairNeed'), pairNeed.toFixed(3));
    txt($('ro_epsOk'), ok ? '是' : '否');
    tint($('ro_epsOk'), ok ? C.green : C.red);
    txt($('ro_epsStar'), epsStar.toFixed(3));

    var verdict = $('eps_v');
    if (verdict) {
      var msg = ok
        ? 'ε ≥ ε*=1/3：等分落入 ε-核；least-core 在 ε* 处非空，核仁即等分。'
        : 'ε < 1/3：等分被二人联盟阻塞。把滑块拖到 ≥ 0.334。';
      verdict.innerHTML = '<span style="color:' + (ok ? C.green : C.red) + '">' + msg + '</span>';
    }

    var items = [
      { lab: '二人所得', v: pairGot, c: C.blue, dp: 3 },
      { lab: '1−ε', v: pairNeed, c: ok ? C.green : C.red, dp: 3 },
      { lab: 'ε', v: eps, c: C.amber, dp: 3 },
      { lab: 'ε*', v: epsStar, c: C.ink2, dp: 3 }
    ];
    items._axis = 'ε-核';
    bars($('epsChart'), items, -0.02, 1.05);
  }

  function all() {
    updateCore();
    updateBal();
    updateGlove();
    updateEps();
  }

  bind(['x1', 'x2'], updateCore);
  bind(['a_pair', 'vn'], updateBal);
  bind(['L_n', 'R_n', 'pair_v'], updateGlove);
  bind(['eps'], updateEps);
  all();
})();
