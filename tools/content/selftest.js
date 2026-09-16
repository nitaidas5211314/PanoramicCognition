/* 自测用主题脚本：验证 theme_js_file 注入与 canvas 绘制 */
(function () {
  'use strict';

  // Acklam 近似：标准正态分位数
  function normInv(p) {
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
             1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00],
        b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
             6.680131188771972e+01, -1.328068155288572e+01],
        c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
             -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00],
        d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00,
             3.754408661907416e+00],
        pl = 0.02425, ph = 1 - pl, q, r, x;
    if (p <= 0) return -8;
    if (p >= 1) return 8;
    if (p < pl) {
      q = Math.sqrt(-2 * Math.log(p));
      x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
          ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    } else if (p <= ph) {
      q = p - 0.5; r = q * q;
      x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
          (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
           ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    return x;
  }

  var G = 0.5772156649;   // Euler–Mascheroni

  /* 假策略定理：K 次独立试验下，最大 Sharpe 的期望 */
  function expectedMaxZ(K) {
    var k = Math.max(2, K);
    return (1 - G) * normInv(1 - 1 / k) + G * normInv(1 - 1 / (k * Math.E));
  }

  var nEl = document.getElementById('st_n');
  var nOut = document.getElementById('st_nO');
  var zEl = document.getElementById('st_z');
  var hintEl = document.getElementById('st_hint');
  var cv = document.getElementById('stChart');
  var ctx = cv.getContext('2d');

  var K_LIST = [1, 10, 100, 1000, 10000];

  function draw(K) {
    var W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    var pad = { l: 40, r: 14, t: 14, b: 26 };
    var xs = [], ys = [];
    for (var i = 0; i < K_LIST.length; i++) {
      xs.push(Math.log10(K_LIST[i]));
      ys.push(expectedMaxZ(K_LIST[i]));
    }
    var yMax = Math.max(2.2, ys[ys.length - 1] * 1.1);
    var X = function (v) { return pad.l + (v - xs[0]) / (xs[xs.length - 1] - xs[0]) * (W - pad.l - pad.r); };
    var Y = function (v) { return H - pad.b - v / yMax * (H - pad.t - pad.b); };

    ctx.strokeStyle = '#e2e6ec'; ctx.lineWidth = 1;
    for (var g = 0; g <= 4; g++) {
      var gy = Y(yMax * g / 4);
      ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(W - pad.r, gy); ctx.stroke();
      ctx.fillStyle = '#7c848f'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText((yMax * g / 4).toFixed(1), pad.l - 6, gy + 4);
    }
    ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (var j = 0; j < xs.length; j++) {
      if (j === 0) ctx.moveTo(X(xs[j]), Y(ys[j])); else ctx.lineTo(X(xs[j]), Y(ys[j]));
    }
    ctx.stroke();
    ctx.fillStyle = '#1d4ed8';
    for (var m = 0; m < xs.length; m++) {
      ctx.beginPath(); ctx.arc(X(xs[m]), Y(ys[m]), 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#454c56'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(K_LIST[m] >= 1000 ? (K_LIST[m] / 1000) + 'k' : String(K_LIST[m]), X(xs[m]), H - 8);
      ctx.fillStyle = '#1d4ed8';
    }
  }

  function upd() {
    var idx = Math.max(0, parseInt(nEl.value, 10) - 1);
    var K = K_LIST[Math.min(idx, K_LIST.length - 1)];
    nOut.textContent = K;
    var z = expectedMaxZ(K);
    zEl.textContent = z.toFixed(2);
    hintEl.textContent = K >= 1000
      ? '门槛高到常规回测无法自证'
      : (K >= 100 ? '已进入需要 3σ 才有意义的量级' : '试验次数少，门槛温和');
    draw(K);
  }

  if (nEl) { nEl.addEventListener('input', upd); upd(); }
})();
