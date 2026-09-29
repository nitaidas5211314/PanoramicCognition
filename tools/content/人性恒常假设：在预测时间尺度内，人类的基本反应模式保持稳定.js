/* ============================================================
   《人性恒常假设》主题脚本
   四个可调模型：
     1. 视界–半衰期门禁（保留率 2^{-H/τ}）
     2. 潜在稳定 × 信度 → 观测再测相关
     3. 深层/表层混合保留率
     4. 冲击位移与回归
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

  function fmt1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function fmt2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function fmt3(x) { return (Math.round(x * 1000) / 1000).toFixed(3); }
  function fmt4(x) { return (Math.round(x * 10000) / 10000).toFixed(4); }
  function fmtPct1(x) { return (Math.round(x * 1000) / 10).toFixed(1) + '%'; }
  function keep(H, tau) {
    if (tau <= 0) return 0;
    return Math.pow(2, -H / tau);
  }

  /* ---------- Model 1: horizon gate ---------- */
  function m1() {
    var H = parseFloat($('hn_h').value);
    var tau = parseFloat($('hn_t').value);
    var k = keep(H, tau);
    var dec = 1 - k;
    var ratio = H / tau;
    txt($('hn_h_o'), fmt1(H));
    txt($('hn_t_o'), String(Math.round(tau)));
    txt($('hn_keep'), fmtPct1(k));
    txt($('hn_dec'), fmtPct1(dec));
    txt($('hn_ratio'), fmt2(ratio));
    var gate, msg, col;
    if (ratio <= 0.25) { gate = '通过'; col = C.green; msg = '判定：H/τ≤0.25，深层参数外推较稳妥；仍须分层与再测。'; }
    else if (ratio <= 1) { gate = '临界'; col = C.amber; msg = '判定：视界已吃掉可观半衰期——缩短 H 或改时变模型。'; }
    else { gate = '拒绝'; col = C.red; msg = '判定：H>τ，恒常假设严重违约，锁死参数会系统性打脸。'; }
    txt($('hn_gate'), gate);
    tint($('hn_gate'), col);
    txt($('hn_vh'), msg);
    tint($('hn_vh'), col);
    drawKeep(H, tau);
  }

  function drawKeep(Hcur, taucur) {
    var g = fit($('hnChart'), 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, W = g.w, H = g.h;
    var pl = 48, pr = 16, pt = 18, pb = 46;
    var bw = W - pl - pr, bh = H - pt - pb;
    var Hmax = 50;
    var xs = function (h) { return pl + (h / Hmax) * bw; };
    var ys = function (v) { return pt + bh * (1 - v); };

    ctx.strokeStyle = C.axis; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pl, pt); ctx.lineTo(pl, pt + bh); ctx.lineTo(pl + bw, pt + bh); ctx.stroke();
    ctx.strokeStyle = C.grid; ctx.setLineDash([3, 3]);
    for (var i = 1; i <= 3; i++) {
      var yy = pt + bh * i / 4;
      ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
    }
    ctx.setLineDash([]);

    // reference curves for tau=10,20,40
    var taus = [10, 20, 40];
    var cols = ['#93c5fd', C.blue, '#1e3a8a'];
    for (var ti = 0; ti < taus.length; ti++) {
      ctx.strokeStyle = cols[ti]; ctx.lineWidth = taus[ti] === taucur ? 2.5 : 1.4;
      ctx.beginPath();
      for (var h = 0; h <= Hmax; h += 0.5) {
        var x = xs(h), y = ys(keep(h, taus[ti]));
        if (h === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // current point
    var kc = keep(Hcur, taucur);
    ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.arc(xs(Hcur), ys(kc), 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (var tick = 0; tick <= 5; tick++) {
      var hv = tick * 10;
      ctx.fillText(String(hv), xs(hv), pt + bh + 13);
    }
    ctx.textAlign = 'right';
    ctx.fillText('1', pl - 6, ys(1) + 3);
    ctx.fillText('0.5', pl - 6, ys(0.5) + 3);
    ctx.fillText('0', pl - 6, ys(0) + 3);
    ctx.textAlign = 'center';
    ctx.fillText('预测视界 H（年）', pl + bw / 2, pt + bh + 31);
    ctx.save();
    ctx.translate(14, pt + bh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('保留率', 0, 0);
    ctx.restore();
  }

  /* ---------- Model 2: measurement ---------- */
  function m2() {
    var rho = parseFloat($('ms_rho').value);
    var R = parseFloat($('ms_r').value);
    var sd = parseFloat($('ms_sd').value);
    var n = parseFloat($('ms_n').value);
    var robs = rho * R;
    var loss = 1 - R;
    var ase = sd / Math.sqrt(Math.max(1, n));
    txt($('ms_rho_o'), fmt2(rho));
    txt($('ms_r_o'), fmt2(R));
    txt($('ms_sd_o'), fmt2(sd));
    txt($('ms_n_o'), String(Math.round(n)));
    txt($('ms_robs'), fmt3(robs));
    txt($('ms_loss'), fmtPct1(loss));
    txt($('ms_ase'), fmt4(ase));
    var story, msg, col;
    if (robs >= 0.5 && ase < 0.02) { story = '个体较稳 · 群体可用'; col = C.green; msg = '判定：观测相关尚可，聚合更稳——适合群体外推。'; }
    else if (robs >= 0.25) { story = '个体中等 · 群体可用'; col = C.amber; msg = '判定：r 落在文献常见带；先查 R，勿急着否定恒常。'; }
    else { story = '观测很吵 · 查信度'; col = C.red; msg = '判定：r 过低——优先提高测量，而不是改写「人性」。'; }
    txt($('ms_story'), story);
    tint($('ms_story'), col);
    txt($('ms_vh'), msg);
    tint($('ms_vh'), col);
  }

  /* ---------- Model 3: mixture ---------- */
  function m3() {
    var w = parseFloat($('mx_w').value);
    var H = parseFloat($('mx_h').value);
    var tc = parseFloat($('mx_tc').value);
    var ts = parseFloat($('mx_ts').value);
    var rc = keep(H, tc);
    var rs = keep(H, ts);
    var rm = w * rc + (1 - w) * rs;
    var err = 1 - rm;
    txt($('mx_w_o'), fmt2(w));
    txt($('mx_h_o'), String(Math.round(H)));
    txt($('mx_tc_o'), String(Math.round(tc)));
    txt($('mx_ts_o'), fmt1(ts));
    txt($('mx_rc'), fmtPct1(rc));
    txt($('mx_rs'), fmtPct1(rs));
    txt($('mx_rm'), fmtPct1(rm));
    txt($('mx_err'), fmtPct1(err));
    var msg, col;
    if (rm >= 0.7) { col = C.green; msg = '判定：混合系统仍偏恒常；表层拖累有限。'; }
    else if (rm >= 0.45) { col = C.amber; msg = '判定：表层已明显拖累——缩 H 或只外推深层块。'; }
    else { col = C.red; msg = '判定：表层主导衰减；整体外推不可锁死。'; }
    txt($('mx_vh'), msg);
    tint($('mx_vh'), col);
    drawMix(w, H, tc, ts);
  }

  function drawMix(w, Hcur, tc, ts) {
    var g = fit($('mxChart'), 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, W = g.w, Hh = g.h;
    var pl = 48, pr = 16, pt = 18, pb = 46;
    var bw = W - pl - pr, bh = Hh - pt - pb;
    var Hmax = 40;
    var xs = function (h) { return pl + (h / Hmax) * bw; };
    var ys = function (v) { return pt + bh * (1 - v); };

    ctx.strokeStyle = C.axis; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pl, pt); ctx.lineTo(pl, pt + bh); ctx.lineTo(pl + bw, pt + bh); ctx.stroke();
    ctx.strokeStyle = C.grid; ctx.setLineDash([3, 3]);
    for (var i = 1; i <= 3; i++) {
      var yy = pt + bh * i / 4;
      ctx.beginPath(); ctx.moveTo(pl, yy); ctx.lineTo(pl + bw, yy); ctx.stroke();
    }
    ctx.setLineDash([]);

    function strokeKeep(tau, color, width) {
      ctx.strokeStyle = color; ctx.lineWidth = width;
      ctx.beginPath();
      for (var h = 0; h <= Hmax; h += 0.5) {
        var x = xs(h), y = ys(keep(h, tau));
        if (h === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    strokeKeep(tc, C.green, 1.5);
    strokeKeep(ts, C.amber, 1.5);
    ctx.strokeStyle = C.blue; ctx.lineWidth = 2.4;
    ctx.beginPath();
    for (var h2 = 0; h2 <= Hmax; h2 += 0.5) {
      var rm = w * keep(h2, tc) + (1 - w) * keep(h2, ts);
      var x2 = xs(h2), y2 = ys(rm);
      if (h2 === 0) ctx.moveTo(x2, y2); else ctx.lineTo(x2, y2);
    }
    ctx.stroke();

    var rmc = w * keep(Hcur, tc) + (1 - w) * keep(Hcur, ts);
    ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.arc(xs(Hcur), ys(rmc), 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (var tick = 0; tick <= 4; tick++) {
      var hv = tick * 10;
      ctx.fillText(String(hv), xs(hv), pt + bh + 13);
    }
    ctx.fillText('视界 H（年）· 绿深层/琥珀表层/蓝混合', pl + bw / 2, pt + bh + 31);
  }

  /* ---------- Model 4: shock recovery ---------- */
  function thetaAt(t, th0, k, S, tr) {
    if (tr <= 0) return th0 + k * S;
    return th0 + k * S * Math.pow(2, -t / tr);
  }

  function m4() {
    var th0 = parseFloat($('sh_th0').value);
    var k = parseFloat($('sh_k').value);
    var S = parseFloat($('sh_s').value);
    var tr = parseFloat($('sh_tr').value);
    var t = parseFloat($('sh_t').value);
    var th = thetaAt(t, th0, k, S, tr);
    var peak = thetaAt(0, th0, k, S, tr);
    var dlt = th - th0;
    var back = 0;
    if (k * S > 0.05) {
      // k*S*2^(-t/tr) = 0.05 → t = tr * log2(k*S/0.05)
      back = tr * Math.log((k * S) / 0.05) / Math.LN2;
      if (back < 0) back = 0;
    }
    txt($('sh_th0_o'), fmt2(th0));
    txt($('sh_k_o'), fmt2(k));
    txt($('sh_s_o'), fmt2(S));
    txt($('sh_tr_o'), fmt1(tr));
    txt($('sh_t_o'), fmt1(t));
    txt($('sh_th'), fmt3(th));
    txt($('sh_peak'), fmt3(peak));
    txt($('sh_dlt'), (dlt >= 0 ? '+' : '') + fmt3(dlt));
    txt($('sh_back'), fmt1(back) + ' 年');
    var msg, col;
    if (Math.abs(dlt) < 0.05) { col = C.green; msg = '判定：已接近基线带——可考虑恢复长期参数，仍保留冲击日志。'; }
    else if (t < tr) { col = C.red; msg = '判定：仍在冲击半寿期内——禁止把 θ(t) 写成新常态。'; }
    else { col = C.amber; msg = '判定：回归中——用临时参数，到期再决定是否改长期卡。'; }
    txt($('sh_vh'), msg);
    tint($('sh_vh'), col);
    drawShock(th0, k, S, tr, t);
  }

  function drawShock(th0, k, S, tr, tcur) {
    var g = fit($('shChart'), 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, W = g.w, Hh = g.h;
    var pl = 48, pr = 16, pt = 18, pb = 46;
    var bw = W - pl - pr, bh = Hh - pt - pb;
    var Tmax = 30;
    var peak = thetaAt(0, th0, k, S, tr);
    var ymin = Math.min(th0, peak) - 0.15;
    var ymax = Math.max(th0, peak) + 0.15;
    var xs = function (tt) { return pl + (tt / Tmax) * bw; };
    var ys = function (v) { return pt + bh * (1 - (v - ymin) / (ymax - ymin)); };

    ctx.strokeStyle = C.axis; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pl, pt); ctx.lineTo(pl, pt + bh); ctx.lineTo(pl + bw, pt + bh); ctx.stroke();
    ctx.strokeStyle = C.grid; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(pl, ys(th0)); ctx.lineTo(pl + bw, ys(th0)); ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = C.blue; ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (var tt = 0; tt <= Tmax; tt += 0.25) {
      var x = xs(tt), y = ys(thetaAt(tt, th0, k, S, tr));
      if (tt === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.arc(xs(tcur), ys(thetaAt(tcur, th0, k, S, tr)), 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = C.ink3; ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (var tick = 0; tick <= 5; tick++) {
      var tv = tick * 6;
      ctx.fillText(String(tv), xs(tv), pt + bh + 13);
    }
    ctx.fillText('冲击后时间 t（年）', pl + bw / 2, pt + bh + 31);
    ctx.textAlign = 'right';
    ctx.fillText(fmt2(ymax), pl - 6, ys(ymax) + 3);
    ctx.fillText(fmt2(th0), pl - 6, ys(th0) + 3);
    ctx.fillText(fmt2(ymin), pl - 6, ys(ymin) + 3);
  }

  function all() { m1(); m2(); m3(); m4(); }

  bind(['hn_h', 'hn_t'], function () { m1(); });
  bind(['ms_rho', 'ms_r', 'ms_sd', 'ms_n'], function () { m2(); });
  bind(['mx_w', 'mx_h', 'mx_tc', 'mx_ts'], function () { m3(); });
  bind(['sh_th0', 'sh_k', 'sh_s', 'sh_tr', 'sh_t'], function () { m4(); });
  all();
})();
