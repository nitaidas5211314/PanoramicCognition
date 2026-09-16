/* ============================================================
   《量化交易与博弈论的关系》主题脚本
   四个可调模型：
     1. 凯尔 λ        — 订单流的价格冲击
     2. 少数者博弈    — 策略拥挤与可预测性消灭
     3. Alpha 衰减    — 拥挤度对超额收益的侵蚀
     4. 负和抽水      — 换手率与交易成本拖累
   自包含 IIFE，与页面通用脚本隔离。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  /* ══════════════════════════════════════════════════════════
     工具 1 · 凯尔 λ = σv / (2σu)
     ══════════════════════════════════════════════════════════ */
  (function kyle() {
    var sv = $('ky_sv'), su = $('ky_su'), pr = $('ky_p');
    if (!sv || !su || !pr) return;
    var svO = $('ky_svO'), suO = $('ky_suO'), prO = $('ky_pO');
    var lEl = $('ky_l'), lhEl = $('ky_lh'), impEl = $('ky_imp'), imp2El = $('ky_imp2');
    var vEl = $('ky_v'), vhEl = $('ky_vh');

    function upd() {
      var sigmaV = parseFloat(sv.value);              // 元/股
      var sigmaU = parseFloat(su.value) * 1e4;        // 万股 → 股
      var price = parseFloat(pr.value);               // 元

      svO.textContent = sigmaV.toFixed(1);
      suO.textContent = Math.round(parseFloat(su.value));
      prO.textContent = Math.round(price);

      // λ = σv / (2σu)
      var lambda = sigmaV / (2 * sigmaU);
      var impact = lambda * 1e6;                      // 100 万股净买入
      var pct = impact / price * 100;

      lEl.textContent = lambda.toExponential(2);
      lhEl.textContent = '每 1 股净买入推动价格上升 ' + lambda.toExponential(2) + ' 元';
      impEl.textContent = impact.toFixed(3) + ' 元';
      imp2El.textContent = '占股价 ' + pct.toFixed(2) + '%';

      var label, hint;
      if (pct < 0.5) {
        label = '良好'; hint = '冲击成本可接受，容量较宽';
        vEl.style.color = 'var(--green)';
      } else if (pct < 2) {
        label = '一般'; hint = '冲击开始显著，大单需要拆分执行';
        vEl.style.color = 'var(--amber)';
      } else if (pct < 5) {
        label = '较差'; hint = '单笔大单会明显推价，必须用算法执行';
        vEl.style.color = 'var(--amber)';
      } else {
        label = '很差'; hint = '流动性稀薄，策略容量将受严格限制';
        vEl.style.color = 'var(--red)';
      }
      vEl.textContent = label;
      vhEl.textContent = hint;
    }

    [sv, su, pr].forEach(function (el) {
      el.addEventListener('input', upd);
    });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 少数者博弈
     每轮各参与者用累计得分最高的策略行动，站在少数一方者得分。
     ══════════════════════════════════════════════════════════ */
  (function minorityGame() {
    var nEl = $('mg_n'), mEl = $('mg_m');
    if (!nEl || !mEl) return;
    var nO = $('mg_nO'), mO = $('mg_mO');
    var cv = $('mgChart');
    var volEl = $('mg_vol'), volhEl = $('mg_volh');
    var randEl = $('mg_rand'), vEl = $('mg_v'), vhEl = $('mg_vh');
    var ctx = cv ? cv.getContext('2d') : null;

    var N_LIST = [11, 51, 101, 201, 501];
    var T = 400;       // 模拟轮数
    var S = 2;         // 每个参与者持有的策略数

    function run(N, M) {
      var histSize = 1 << M;                  // 2^M
      var mask = histSize - 1;
      var strat = [], score = [];
      var i, s, h;

      for (i = 0; i < N; i++) {
        var rows = [];
        for (s = 0; s < S; s++) {
          var row = new Int8Array(histSize);
          for (h = 0; h < histSize; h++) row[h] = Math.random() < 0.5 ? -1 : 1;
          rows.push(row);
        }
        strat.push(rows);
        score.push(new Float64Array(S));
      }

      var history = 0;
      var series = new Float64Array(T);
      var sum = 0, sumSq = 0;

      for (var t = 0; t < T; t++) {
        var A = 0, best = new Int8Array(N);
        for (i = 0; i < N; i++) {
          var b = 0;
          if (S > 1 && score[i][1] > score[i][0]) b = 1;
          best[i] = b;
          A += strat[i][b][history];
        }
        // 收益：站在少数一方得正分
        for (i = 0; i < N; i++) {
          score[i][best[i]] += -strat[i][best[i]][history] * A / N;
        }

        var ratio = A / N;
        series[t] = ratio;
        sum += ratio;
        sumSq += ratio * ratio;

        var bit = A > 0 ? 1 : 0;
        history = ((history << 1) | bit) & mask;
      }

      var mean = sum / T;
      var variance = sumSq / T - mean * mean;
      return { series: series, vol: Math.sqrt(Math.max(0, variance)) };
    }

    function draw(res, N) {
      if (!ctx) return;
      var W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      var pad = { l: 40, r: 12, t: 14, b: 24 };
      var mid = pad.t + (H - pad.t - pad.b) / 2;
      var halfH = (H - pad.t - pad.b) / 2;

      // 网格与刻度
      ctx.strokeStyle = '#eef1f5'; ctx.lineWidth = 1;
      [0.25, 0.5, 0.75].forEach(function (f) {
        var y = pad.t + (H - pad.t - pad.b) * f;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
      });
      // 50% 中线（多数方恰好一半 = 无偏）
      ctx.strokeStyle = '#e2e6ec'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pad.l, mid); ctx.lineTo(W - pad.r, mid); ctx.stroke();
      ctx.fillStyle = '#7c848f'; ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('0', pad.l - 6, mid + 4);
      ctx.fillText('+25%', pad.l - 6, pad.t + 14);
      ctx.fillText('-25%', pad.l - 6, H - pad.b - 4);

      // 随机基准带（±1σ = 1/√N）
      var sigma = 1 / Math.sqrt(N);
      ctx.fillStyle = 'rgba(29,78,216,.07)';
      ctx.fillRect(pad.l, mid - sigma * halfH / 0.4, W - pad.r - pad.l, 2 * sigma * halfH / 0.4);

      // 时间序列
      var scale = halfH / 0.4;    // y 轴范围 ±0.4
      ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (var t = 0; t < T; t++) {
        var x = pad.l + t / (T - 1) * (W - pad.l - pad.r);
        var y = mid - Math.max(-0.4, Math.min(0.4, res.series[t])) * scale;
        if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#7c848f'; ctx.font = '10.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('第 1 轮', pad.l + 26, H - 7);
      ctx.fillText('第 ' + T + ' 轮', W - pad.r - 34, H - 7);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#1d4ed8';
      ctx.fillText('蓝带 = 纯随机时的 ±1σ（' + (sigma * 100).toFixed(1) + '%）', pad.l + 4, pad.t + 10);
    }

    function upd() {
      var ni = parseInt(nEl.value, 10) - 1;
      ni = Math.max(0, Math.min(N_LIST.length - 1, ni));
      var N = N_LIST[ni];
      var M = parseInt(mEl.value, 10);

      nO.textContent = N;
      mO.textContent = M;

      var res = run(N, M);
      draw(res, N);

      var rand = 1 / Math.sqrt(N);            // 纯随机基准波动
      volEl.textContent = (res.vol * 100).toFixed(2) + '%';
      volhEl.textContent = '系统性偏离 50% 的幅度（N=' + N + '，M=' + M + '）';
      randEl.textContent = (rand * 100).toFixed(2) + '%';

      var ratio = res.vol / rand, label, hint;
      if (ratio < 0.75) {
        label = '自组织收敛'; hint = '参与者行为相互抵消，市场比随机更"平"';
        vEl.style.color = 'var(--green)';
      } else if (ratio < 1.05) {
        label = '接近随机'; hint = '可预测性已被套利压力消灭';
        vEl.style.color = 'var(--accent)';
      } else {
        label = '偏离放大'; hint = '参与者太少或策略太弱，波动反而更高';
        vEl.style.color = 'var(--amber)';
      }
      vEl.textContent = label;
      vhEl.textContent = hint;
    }

    [nEl, mEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · Alpha 衰减
     remain = exp(-k · crowding)，k 由"发表后收益低 58%"标定
     ══════════════════════════════════════════════════════════ */
  (function alphaDecay() {
    var cEl = $('ad_c'), aEl = $('ad_a');
    if (!cEl || !aEl) return;
    var cO = $('ad_cO'), aO = $('ad_aO');
    var remEl = $('ad_rem'), remhEl = $('ad_remh');
    var newEl = $('ad_new'), newhEl = $('ad_newh');
    var costEl = $('ad_cost'), costhEl = $('ad_costh');

    var K = -Math.log(0.42);   // ≈ 0.8675，锚点：拥挤度 1 时剩余 42%

    function upd() {
      var c = parseFloat(cEl.value);
      var alpha = parseFloat(aEl.value);

      cO.textContent = c.toFixed(2);
      aO.textContent = Math.round(alpha);

      var remain = Math.exp(-K * c);
      var after = alpha * remain;
      // 参考成本：年双边换手 600%、单边 12bp → 0.72%
      var cost = 6 * 0.0012 * 100;
      var net = after - cost;

      remEl.textContent = (remain * 100).toFixed(1) + '%';
      remhEl.textContent = remain > 0.8 ? '基本未被侵蚀'
        : remain > 0.5 ? '已损失约一半'
        : remain > 0.25 ? '损失超过七成' : '基本只剩残余';

      newEl.textContent = after.toFixed(2) + '%';
      newhEl.textContent = '原始 ' + alpha.toFixed(0) + '% → 衰减后 ' + after.toFixed(2) + '%';

      costEl.textContent = net.toFixed(2) + '%';
      costhEl.textContent = '已扣除年双边换手 600%、单边 12bp 的 0.72% 成本';

      if (net <= 0) costEl.style.color = 'var(--red)';
      else if (net < after * 0.5) costEl.style.color = 'var(--amber)';
      else costEl.style.color = '';
    }

    [cEl, aEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 负和抽水
     年化拖累 = 年双边换手倍数 × 单边成本
     ══════════════════════════════════════════════════════════ */
  (function negativeSum() {
    var tEl = $('ns_t'), cEl = $('ns_c');
    if (!tEl || !cEl) return;
    var tO = $('ns_tO'), cO = $('ns_cO');
    var dragEl = $('ns_drag'), draghEl = $('ns_dragh');
    var needEl = $('ns_need'), sharpeEl = $('ns_sharpe'), sharpehEl = $('ns_sharpeh');

    var VOL = 0.20;   // 假设年化波动 20%

    function upd() {
      var turn = parseFloat(tEl.value);      // %
      var bp = parseFloat(cEl.value);        // bp

      tO.textContent = Math.round(turn) + '%';
      cO.textContent = Math.round(bp);

      // 600% × 12bp：6 × 0.0012 = 0.0072 → 0.72%
      var drag = turn / 100 * bp / 10000 * 100;
      var sharpe = drag / 100 / VOL;

      dragEl.textContent = drag.toFixed(2) + '%';
      draghEl.textContent = '每天约 ' + (drag / 244).toFixed(3) + '%（按 244 个交易日）';
      needEl.textContent = drag.toFixed(2) + '%';

      sharpeEl.textContent = sharpe.toFixed(2) + ' 点';
      sharpehEl.textContent = sharpe < 0.1 ? '几乎无感'
        : sharpe < 0.3 ? '已吃掉可观的一部分'
        : sharpe < 0.6 ? '严重拖累' : '足以让多数策略失去意义';

      sharpeEl.style.color = sharpe < 0.1 ? 'var(--green)'
        : sharpe < 0.3 ? 'var(--amber)' : 'var(--red)';
    }

    [tEl, cEl].forEach(function (el) { el.addEventListener('input', upd); });
    upd();
  })();

})();
