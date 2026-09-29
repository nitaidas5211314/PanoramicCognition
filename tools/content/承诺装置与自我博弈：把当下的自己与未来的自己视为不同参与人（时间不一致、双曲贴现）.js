/* ============================================================
   《承诺装置与自我博弈》主题脚本
   四个可调模型：
     1. β–δ 偏好反转
     2. 指数 / 双曲 / 准双曲贴现曲线
     3. 承诺溢价（锁定 LL）
     4. 天真 vs 成熟拖延路径
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var C = {
    red: '#d5342c', green: '#0f8a4d', blue: '#1d4ed8', amber: '#b8730a',
    purple: '#7c3aed', grid: '#eef1f5', axis: '#e2e6ec',
    ink3: '#7c848f', ink2: '#454c56', ink: '#15181d'
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
  function pow(d, k) { return Math.pow(d, k); }

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

  function bars(cv, vals, ymin, ymax, axisTitle) {
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
      var lab = o.labV != null ? o.labV : o.v.toFixed(2);
      var ly = o.v >= 0 ? Math.max(yv - 6, pt + 10) : Math.min(yv + 14, y1 - 4);
      ctx.fillText(lab, x + barW / 2, ly);
      ctx.fillStyle = C.ink2;
      ctx.font = '10px sans-serif';
      (o.lab || '').split('\n').forEach(function (ln, j) {
        ctx.fillText(ln, x + barW / 2, y1 + 13 + j * 12);
      });
    });
    ctx.fillStyle = C.ink3;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(axisTitle || '', pl + bw, y1 + 31);
  }

  function lineChart(cv, series, tmax, ymin, ymax, legend) {
    var g = fit(cv, 214);
    if (!g) return;
    clear(g);
    var ctx = g.ctx, w = g.w, h = g.h;
    var pl = 48, pr = 16, pt = 20, y1 = h - 46;
    var bw = w - pl - pr, bh = y1 - pt;
    axisY(ctx, pl, y1, pt, bh, ymin, ymax, w);
    ctx.strokeStyle = C.grid;
    ctx.fillStyle = C.ink3;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    var ticks = 6;
    for (var i = 0; i <= ticks; i++) {
      var t = (tmax * i) / ticks;
      var x = pl + (t / tmax) * bw;
      ctx.beginPath();
      ctx.moveTo(x, pt);
      ctx.lineTo(x, y1);
      ctx.stroke();
      ctx.fillText(String(Math.round(t)), x, y1 + 13);
    }
    ctx.fillStyle = C.ink3;
    ctx.textAlign = 'right';
    ctx.font = '11px sans-serif';
    ctx.fillText('期数 t', pl + bw, y1 + 31);

    series.forEach(function (s) {
      ctx.beginPath();
      ctx.strokeStyle = s.c;
      ctx.lineWidth = 2;
      for (var t = 0; t <= tmax; t++) {
        var v = s.f(t);
        var x = pl + (t / tmax) * bw;
        var y = y1 - ((v - ymin) / (ymax - ymin)) * bh;
        if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    if (legend && legend.length) {
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      var lx = pl + 8, ly = pt + 4;
      legend.forEach(function (L, i) {
        ctx.fillStyle = L.c;
        ctx.fillRect(lx, ly + i * 16, 12, 3);
        ctx.fillStyle = C.ink2;
        ctx.fillText(L.lab, lx + 18, ly + 6 + i * 16);
      });
    }
  }

  /* ── 1. Preference reversal ── */
  (function rev() {
    var bEl = $('rv_b'), dEl = $('rv_d'), ssEl = $('rv_ss'), llEl = $('rv_ll'), gEl = $('rv_g');
    if (!bEl || !dEl || !ssEl || !llEl || !gEl) return;
    var cv = $('rvChart');

    function upd() {
      var beta = parseFloat(bEl.value);
      var delta = parseFloat(dEl.value);
      var ss = parseFloat(ssEl.value);
      var ll = parseFloat(llEl.value);
      var gap = parseFloat(gEl.value);

      var uSS0 = beta * pow(delta, 1) * ss;
      var uLL0 = beta * pow(delta, 1 + gap) * ll;
      var uSS1 = ss;
      var uLL1 = beta * pow(delta, gap) * ll;
      var plan = uLL0 >= uSS0 ? 'LL' : 'SS';
      var act = uLL1 >= uSS1 ? 'LL' : 'SS';
      var bstar = ss / (pow(delta, gap) * ll);
      var dstar = Math.pow(ss / ll, 1 / gap);

      txt($('rv_bO'), beta.toFixed(2));
      txt($('rv_dO'), delta.toFixed(2));
      txt($('rv_ssO'), String(Math.round(ss)));
      txt($('rv_llO'), String(Math.round(ll)));
      txt($('rv_gO'), String(Math.round(gap)));
      txt($('rv_uSS0'), uSS0.toFixed(1));
      txt($('rv_uLL0'), uLL0.toFixed(1));
      txt($('rv_uSS1'), uSS1.toFixed(1));
      txt($('rv_uLL1'), uLL1.toFixed(1));
      txt($('rv_bstar'), bstar.toFixed(3));
      txt($('rv_dstar'), dstar.toFixed(3));

      var msg, col;
      if (plan !== act) {
        msg = '判定：远看选 ' + plan + '，临近翻成 ' + act + ' —— 时间不一致';
        col = C.red;
      } else if (plan === 'LL') {
        msg = '判定：远近都选 LL —— 当前参数下无反转（β 够大或 δ 够高）';
        col = C.green;
      } else {
        msg = '判定：远近都选 SS —— 大奖不够吸引或耐心不足';
        col = C.amber;
      }
      txt($('rv_vh'), msg);
      tint($('rv_vh'), col);

      var ymax = Math.max(uSS0, uLL0, uSS1, uLL1, 1) * 1.15;
      bars(cv, [
        { v: uSS0, c: C.amber, lab: '远看\nSS', labV: uSS0.toFixed(1) },
        { v: uLL0, c: C.blue, lab: '远看\nLL', labV: uLL0.toFixed(1) },
        { v: uSS1, c: C.red, lab: '临近\nSS', labV: uSS1.toFixed(1) },
        { v: uLL1, c: C.green, lab: '临近\nLL', labV: uLL1.toFixed(1) }
      ], 0, ymax, '效用');
    }
    bind(['rv_b', 'rv_d', 'rv_ss', 'rv_ll', 'rv_g'], upd);
    upd();
  })();

  /* ── 2. Discount curves ── */
  (function disc() {
    var rEl = $('dc_r'), kEl = $('dc_k'), bEl = $('dc_b'), dEl = $('dc_d');
    if (!rEl || !kEl || !bEl || !dEl) return;
    var cv = $('dcChart');

    function upd() {
      var r = parseFloat(rEl.value);
      var k = parseFloat(kEl.value);
      var beta = parseFloat(bEl.value);
      var delta = parseFloat(dEl.value);
      function expD(t) { return Math.exp(-r * t); }
      function hypD(t) { return 1 / (1 + k * t); }
      function qdD(t) { return t === 0 ? 1 : beta * pow(delta, t); }

      txt($('dc_rO'), r.toFixed(2));
      txt($('dc_kO'), k.toFixed(2));
      txt($('dc_bO'), beta.toFixed(2));
      txt($('dc_dO'), delta.toFixed(2));
      txt($('dc_e1'), expD(1).toFixed(3));
      txt($('dc_h1'), hypD(1).toFixed(3));
      txt($('dc_q1'), qdD(1).toFixed(3));
      txt($('dc_e10'), expD(10).toFixed(3));
      txt($('dc_h10'), hypD(10).toFixed(3));
      txt($('dc_q10'), qdD(10).toFixed(3));

      var drop = 1 - qdD(1);
      var msg = drop > 0.25
        ? '判定：准双曲在 t=0→1 陡降 ' + (drop * 100).toFixed(1) + '%（β 洞），其后近似指数'
        : '判定：β 接近 1，准双曲接近指数；现时洞较小';
      txt($('dc_vh'), msg);
      tint($('dc_vh'), drop > 0.25 ? C.amber : C.green);

      lineChart(cv, [
        { c: C.blue, f: expD },
        { c: C.amber, f: hypD },
        { c: C.red, f: qdD }
      ], 30, 0, 1.05, [
        { c: C.blue, lab: '指数 e^{−rt}' },
        { c: C.amber, lab: '双曲 1/(1+kt)' },
        { c: C.red, lab: '准双曲 βδᵗ' }
      ]);
    }
    bind(['dc_r', 'dc_k', 'dc_b', 'dc_d'], upd);
    upd();
  })();

  /* ── 3. Commitment WTP ── */
  (function wtp() {
    var bEl = $('wt_b'), dEl = $('wt_d'), ssEl = $('wt_ss'), llEl = $('wt_ll'), gEl = $('wt_g'), cEl = $('wt_c');
    if (!bEl || !dEl || !ssEl || !llEl || !gEl || !cEl) return;
    var cv = $('wtChart');

    function upd() {
      var beta = parseFloat(bEl.value);
      var delta = parseFloat(dEl.value);
      var ss = parseFloat(ssEl.value);
      var ll = parseFloat(llEl.value);
      var gap = parseFloat(gEl.value);
      var fee = parseFloat(cEl.value);

      var uSS0 = beta * pow(delta, 1) * ss;
      var uLL0 = beta * pow(delta, 1 + gap) * ll;
      var uSS1 = ss;
      var uLL1 = beta * pow(delta, gap) * ll;
      var reverses = (uLL0 >= uSS0) && (uLL1 < uSS1);
      var without = reverses ? uSS0 : Math.max(uSS0, uLL0);
      var withC = uLL0;
      var gross = withC - without;
      var net = gross - fee;
      // fee paid at t=0 in utils (pedagogical: 1 util ≈ 1 money unit of prize scale)

      txt($('wt_bO'), beta.toFixed(2));
      txt($('wt_dO'), delta.toFixed(2));
      txt($('wt_ssO'), String(Math.round(ss)));
      txt($('wt_llO'), String(Math.round(ll)));
      txt($('wt_gO'), String(Math.round(gap)));
      txt($('wt_cO'), fee.toFixed(1));
      txt($('wt_no'), without.toFixed(1));
      txt($('wt_yes'), withC.toFixed(1));
      txt($('wt_gross'), gross.toFixed(2));
      txt($('wt_net'), net.toFixed(2));
      txt($('wt_pct'), without > 0 ? ((gross / without) * 100).toFixed(1) + '%' : '—');

      var msg, col;
      if (!reverses) {
        msg = '判定：当前参数下不会翻盘，承诺装置无增量价值（毛溢价≤0）';
        col = C.amber;
      } else if (net > 0) {
        msg = '判定：成熟者应购买该锁（净溢价 ' + net.toFixed(2) + ' > 0）';
        col = C.green;
      } else {
        msg = '判定：锁太贵——毛溢价 ' + gross.toFixed(2) + ' 盖不住手续费 ' + fee.toFixed(1);
        col = C.red;
      }
      txt($('wt_vh'), msg);
      tint($('wt_vh'), col);

      var ymax = Math.max(without, withC, fee, 1) * 1.2;
      bars(cv, [
        { v: without, c: C.amber, lab: '无锁\n效用', labV: without.toFixed(1) },
        { v: withC, c: C.blue, lab: '有锁\n效用', labV: withC.toFixed(1) },
        { v: fee, c: C.red, lab: '手续费\nc', labV: fee.toFixed(1) },
        { v: net, c: net >= 0 ? C.green : C.red, lab: '净溢价', labV: net.toFixed(2) }
      ], Math.min(0, net) * 1.1, ymax, '效用');
    }
    bind(['wt_b', 'wt_d', 'wt_ss', 'wt_ll', 'wt_g', 'wt_c'], upd);
    upd();
  })();

  /* ── 4. Naive vs sophisticated procrastination ── */
  (function prg() {
    var bEl = $('pg_b'), cEl = $('pg_c'), vEl = $('pg_v'), tEl = $('pg_t');
    if (!bEl || !cEl || !vEl || !tEl) return;
    var cv = $('pgChart');

    function upd() {
      var beta = parseFloat(bEl.value);
      var c = parseFloat(cEl.value);
      var v = parseFloat(vEl.value);
      var T = parseInt(tEl.value, 10);
      // δ = 1 for pedagogy. Do today: -c + β v; patient: -c + v
      var now = -c + beta * v;
      var pat = -c + v;
      var willWhenPresent = now >= 0;

      // Naive: believes future β̂=1, so believes "tomorrow will do" whenever pat>0
      // Each day before T: if now<0 and pat>0 → delay. At T: do if now>=0 else fail.
      var naiveDay = null;
      var naiveFail = false;
      if (pat <= 0) {
        naiveFail = true; // even patient self never wants to
      } else if (willWhenPresent) {
        naiveDay = 1; // would do immediately
      } else {
        // delays until T
        if (willWhenPresent) naiveDay = T;
        else {
          // at T still now<0 → fail unless we force completion for reward
          // Pedagogical: last day still evaluates -c+βv; if <0 abandon
          naiveFail = true;
          naiveDay = null;
        }
        // Actually if now<0 every day including T, naive fails.
        // Classic OR: on last day reward is lost if not done, so compare -c+βv vs 0 → still may fail.
        // Alternative classic: naive delays to T and DOES it because believes only one day left and reward requires it —
        // but with same payoff, still -c+βv vs 0.
        // Better pedagogy used in many textbooks: naive delays until deadline, then does if -c+βv ≥ 0.
        // If -c+βv < 0 always, show failure.
        // If we assume at deadline the outside option is losing v forever from long-run view...
        // Simpler: naive completion day = T if pat>0 (they plan to do "tomorrow" until last day, then do if now>=0 else fail)
        if (pat > 0 && !willWhenPresent) {
          // dragged to T
          if (willWhenPresent) {
            naiveDay = T;
            naiveFail = false;
          } else {
            // still won't at T
            naiveDay = T;
            naiveFail = true;
          }
        }
      }

      // Recompute naive path cleanly:
      // Days 1..T-1: delay if now < 0 (and believe tomorrow does since pat > 0)
      // Day T: do if now >= 0 else fail
      naiveFail = false;
      naiveDay = null;
      if (pat <= 0) {
        naiveFail = true;
      } else if (willWhenPresent) {
        naiveDay = 1;
      } else {
        // delay to T
        if (-c + beta * v >= 0) {
          naiveDay = T;
        } else {
          naiveDay = T;
          naiveFail = true;
        }
      }

      // Sophisticated with δ=1, outside option 0:
      // Backward: at T do iff now>=0. At t<T: do now if now >= β * (continuation)
      // Continuation if will do later: β*(-c+v) wait: utility of "do tomorrow" from today = β*(-c + v) if reward same period as cost next day...
      // With cost and reward simultaneous when done: doing later gives β * ( -c + v ) from today if δ=1.
      // Doing now: -c + v... but then no present bias on tradeoff!
      // Stick to delayed reward: do at τ → -c at τ, +v at τ (same) with present bias only via... 
      // Standard OR instantaneous cost, delayed reward one period:
      // From t, do now: -c + β v
      // Do tomorrow: β (-c + v)  if δ=1 and reward when done next morning? 
      // Use: do tomorrow continuation value = β * max(do payoff tomorrow, ...)
      // For sophisticated: at T, do if -c+βv >= 0.
      // At t<T, compare do now (-c+βv) vs delay (β * V_{t+1}) where V is continuation utility from t+1's perspective... 
      // Actually continuation from today of tomorrow's outcome: if tomorrow does, today gets β*(-c) + β*v? 
      // Clean: reward v received same period as cost (effort good). Present bias on relative to future leisure.
      // O'Donoghue-Rabin: activity yields cost c and reward v, both instantaneous when performed.
      // Then from period t: doing now gives -c+v (no β!); doing future gives βδ^k (-c+v).
      // Present bias then causes PREMATURE completion of rewarding tasks and DELAY of costly tasks when rewards/costs timed differently.
      // Costly task: cost now, reward later → our now = -c+βv.

      // Sophisticated strategy (δ=1): 
      // Will do at T iff now>=0. If now<0 at all dates, never do (soph also fails) OR soph may do earlier? 
      // If now<0 always, nobody does.
      // If now>=0, soph does at first opportunity (day 1).
      // Interesting case: now < 0 but pat > 0 — only deadline pressure... without changing payoffs, neither does until forced.
      // Add: not completing by T yields long-run loss; at T compare -c+βv vs 0.

      var sophDay = null;
      var sophFail = false;
      if (willWhenPresent) {
        sophDay = 1;
      } else if (pat <= 0) {
        sophFail = true;
      } else {
        // Partial sophistication story: sophisticated knows future selves also have now<0,
        // so "waiting for tomorrow" is fantasy. Without a harder lock, also fails — unless
        // they can commit. Here we show: soph predicts failure and seeks commitment;
        // without commitment, same failure. With "must pick a day" commitment, picks day 1
        // from long-run view when pat>0: long-run u = -c+v each day same when δ=1.
        sophFail = true; // no commitment → correctly anticipates never
        sophDay = null;
      }

      // Long-run utility (β=1, δ=1): complete → -c+v; fail → 0
      var lrComplete = -c + v;
      var lrNaive = naiveFail ? 0 : lrComplete;
      var lrSophCommit = (!sophFail || pat > 0) && pat > 0 ? lrComplete : 0;
      // Gap: value of becoming sophisticated enough to commit and do on day 1
      var gap = (pat > 0 && !willWhenPresent) ? lrComplete - lrNaive : (willWhenPresent ? 0 : 0);
      if (naiveFail && pat > 0) gap = lrComplete; // commitment saves full surplus
      if (!naiveFail && willWhenPresent) gap = 0;
      if (!naiveFail && naiveDay === T && pat > 0) {
        // naive eventually does on T — same LR utility when δ=1
        gap = 0;
      }

      // Refine naive when now<0 but we treat deadline as forcing a choice do vs 0:
      // already done. When now>=0 only on... never if beta fixed.

      // Special case for demo defaults β=0.5,c=6,v=10: now=-1, pat=+4
      // Naive delays to T and fails (now still -1). Soph without commit also fails.
      // Commitment value = lrComplete = 4.

      txt($('pg_bO'), beta.toFixed(2));
      txt($('pg_cO'), c.toFixed(1));
      txt($('pg_vO'), v.toFixed(1));
      txt($('pg_tO'), String(T));
      txt($('pg_now'), (now >= 0 ? '+' : '') + now.toFixed(2));
      txt($('pg_pat'), (pat >= 0 ? '+' : '') + pat.toFixed(2));

      if (pat <= 0) {
        txt($('pg_naive'), '永不（连耐心自我都拒）');
        txt($('pg_soph'), '永不');
      } else if (willWhenPresent) {
        txt($('pg_naive'), '第 1 天');
        txt($('pg_soph'), '第 1 天');
      } else if (naiveFail) {
        txt($('pg_naive'), '拖到第 ' + T + ' 天仍失败');
        txt($('pg_soph'), '预见到失败 → 需求诺后第 1 天做');
      } else {
        txt($('pg_naive'), '第 ' + naiveDay + ' 天');
        txt($('pg_soph'), '第 1 天（若可承诺）');
      }

      var gapShow = (pat > 0 && !willWhenPresent) ? lrComplete.toFixed(2) + '（承诺挽救的长期剩余）' : '0（无需承诺或无法完成）';
      txt($('pg_gap'), gapShow);

      var msg, col;
      if (pat <= 0) {
        msg = '判定：任务本身不值得（−c+v≤0），不是现时偏差问题';
        col = C.amber;
      } else if (willWhenPresent) {
        msg = '判定：β 够大，当下就会做——承诺装置多余';
        col = C.green;
      } else if (naiveFail) {
        msg = '判定：天真会日复一日「明天再做」，直到截止日仍因 −c+βv<0 失败；成熟者应在第 0 天买锁';
        col = C.red;
      } else {
        msg = '判定：天真拖到截止日才做；成熟者可能更早或买锁';
        col = C.amber;
      }
      txt($('pg_vh'), msg);
      tint($('pg_vh'), col);

      // Chart: per-day "do now" payoff and patient bar
      var vals = [];
      for (var day = 1; day <= T; day++) {
        var isNaiveMark = (!willWhenPresent && pat > 0 && day === T);
        var isSophMark = (pat > 0 && day === 1 && !willWhenPresent);
        vals.push({
          v: now,
          c: isNaiveMark ? C.red : (day === 1 && willWhenPresent ? C.green : C.blue),
          lab: 'D' + day,
          labV: now.toFixed(1)
        });
      }
      // Add patient reference as last bar
      vals.push({ v: pat, c: C.amber, lab: '耐心\n−c+v', labV: pat.toFixed(1) });
      var ymin = Math.min(0, now, pat) - 1;
      var ymax = Math.max(0, now, pat) + 1;
      bars(cv, vals, ymin, ymax, '当日期效用');
    }
    bind(['pg_b', 'pg_c', 'pg_v', 'pg_t'], upd);
    upd();
  })();
})();
