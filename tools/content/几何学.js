/* ============================================================
   几何学 主题脚本
   四个可调模型（滑块全部真实参与计算）：
     1. 正多边形逼近圆   — n, R → 周长/面积/π估计/误差
     2. 勾股/相似三角形  — a, b → 斜边/角度/相似比，实时画图
     3. 投影与灭点       — D → 像高/比/视角（clamp D>=0.5 防除零）
     4. 曲面欧拉示性数    — g → χ=2-2g / 名称 / 总曲率 2πχ
   自包含 IIFE，与页面通用脚本隔离。
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  function txt(el, s) { if (el) el.textContent = s; }
  function tint(el, c) { if (el) el.style.color = c; }

  /* 通用：在画布上画一个会被 clamp 的数值标签，防止文字画出边界 */
  function label(ctx, s, x, y, w, align, fill) {
    ctx.font = '11px -apple-system,Helvetica,Arial,sans-serif';
    ctx.fillStyle = fill || '#23324a';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    var tw = ctx.measureText(s).width;
    var lx = x;
    if (align === 'left') lx = Math.min(x, w - tw - 4);
    else if (align === 'right') lx = Math.max(x, tw + 4);
    ctx.fillText(s, lx, y);
  }

  var PI = Math.PI;

  /* ══════════════════════════════════════════════════════════
     工具 1 · 正多边形逼近圆
     ══════════════════════════════════════════════════════════ */
  (function polyTool() {
    var nEl = $('poly_n'), rEl = $('poly_r');
    if (!nEl || !rEl) return;
    var nO = $('poly_nO'), rO = $('poly_rO');
    var cv = $('polyChart'), ctx = cv ? cv.getContext('2d') : null;
    var vPerim = $('poly_perim_v'), hPerim = $('poly_perim_h');
    var vArea = $('poly_area_v'), hArea = $('poly_area_h');
    var vPi = $('poly_pi_v'), hPi = $('poly_pi_h');
    var vErr = $('poly_err_v'), hErr = $('poly_err_h');
    var vJ = $('poly_v'), hJ = $('poly_vh');

    function draw(n, R) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 210;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var cx = w / 2, cy = h / 2 + 6, sc = Math.min(w, h) * 0.40 / R;
      // 外接圆
      ctx.beginPath();
      ctx.arc(cx, cy, R * sc, 0, 2 * PI);
      ctx.strokeStyle = '#9fb3d1'; ctx.lineWidth = 1; ctx.stroke();
      // 内接正 n 边形
      ctx.beginPath();
      for (var k = 0; k <= n; k++) {
        var a = 2 * PI * k / n - PI / 2;
        var x = cx + R * sc * Math.cos(a), y = cy + R * sc * Math.sin(a);
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(143,191,143,0.25)';
      ctx.strokeStyle = '#3a7a3a'; ctx.lineWidth = 1.5; ctx.fill(); ctx.stroke();
      label(ctx, 'n = ' + n + '  边', 10, 16, w, 'left', '#23324a');
    }

    function update() {
      var n = Math.max(3, Math.round(parseFloat(nEl.value) || 3));
      var R = Math.max(0.1, parseFloat(rEl.value) || 1);
      txt(nO, String(n));
      txt(rO, R.toFixed(1));
      var perim = 2 * n * R * Math.sin(PI / n);
      var area = (n / 2) * R * R * Math.sin(2 * PI / n);
      var piEst = n * R * Math.sin(PI / n);
      var err = piEst - PI;
      txt(vPerim, perim.toFixed(4));
      txt(vArea, area.toFixed(4));
      txt(vPi, piEst.toFixed(6));
      txt(vErr, (err >= 0 ? '+' : '') + err.toExponential(3));
      tint(vErr, Math.abs(err) < 1e-3 ? '#1f7a3a' : '#b0323a');
      txt(hPerim, '2n·R·sin(π/n)');
      txt(hArea, '(n/2)·R²·sin(2π/n)');
      txt(hPi, 'n·R·sin(π/n)');
      txt(hErr, '估计值 − π');
      if (Math.abs(err) < 1e-4) {
        txt(vJ, '已非常接近 π');
        txt(hJ, 'n=' + n + ' 时误差 ' + err.toExponential(2));
      } else {
        txt(vJ, 'n 越大越接近 π');
        txt(hJ, '当前误差 ' + err.toExponential(2) + '，仍差一个 ε');
      }
      draw(n, R);
    }
    nEl.addEventListener('input', update);
    rEl.addEventListener('input', update);
    update();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 2 · 勾股 / 相似三角形
     ══════════════════════════════════════════════════════════ */
  (function pyTool() {
    var aEl = $('py_a'), bEl = $('py_b');
    if (!aEl || !bEl) return;
    var aO = $('py_aO'), bO = $('py_bO');
    var cv = $('pyChart'), ctx = cv ? cv.getContext('2d') : null;
    var vC = $('py_c_v'), hC = $('py_c_h');
    var vA = $('py_aAng_v'), hA = $('py_aAng_h');
    var vB = $('py_bAng_v'), hB = $('py_bAng_h');
    var vR = $('py_ratio_v'), hR = $('py_ratio_h');
    var vJ = $('py_v'), hJ = $('py_vh');

    function draw(a, b, c) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 210;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var sc = (Math.min(w, h) * 0.78) / Math.max(a, b, 1);
      var ox = 28, oy = h - 24;
      var x1 = ox, y1 = oy, x2 = ox + b * sc, y2 = oy, x3 = ox, y3 = oy - a * sc;
      ctx.beginPath();
      ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.closePath();
      ctx.fillStyle = 'rgba(207,227,245,0.4)';
      ctx.strokeStyle = '#2f6f9f'; ctx.lineWidth = 1.6; ctx.fill(); ctx.stroke();
      label(ctx, 'a=' + a.toFixed(1), x3 - 4, (y1 + y3) / 2, w, 'right', '#1f3350');
      label(ctx, 'b=' + b.toFixed(1), (x1 + x2) / 2, y2 + 14, w, 'center', '#1f3350');
      label(ctx, 'c=' + c.toFixed(2), (x2 + x3) / 2 - 6, (y2 + y3) / 2, w, 'left', '#b0323a');
    }

    function update() {
      var a = Math.max(1, parseFloat(aEl.value) || 1);
      var b = Math.max(1, parseFloat(bEl.value) || 1);
      txt(aO, a.toFixed(1));
      txt(bO, b.toFixed(1));
      var c = Math.sqrt(a * a + b * b);
      var angA = Math.atan2(a, b) * 180 / PI;
      var angB = Math.atan2(b, a) * 180 / PI;
      var ratio = b / a;
      txt(vC, c.toFixed(4));
      txt(vA, angA.toFixed(3) + '°');
      txt(vB, angB.toFixed(3) + '°');
      txt(vR, ratio.toFixed(4));
      txt(hC, '√(a²+b²)');
      txt(hA, 'atan(a/b)');
      txt(hB, 'atan(b/a)');
      txt(hR, '决定形状，与大小无关');
      txt(vJ, '形状由比例 b/a 决定');
      txt(hJ, '相似三角形：角相同，边成比例');
      draw(a, b, c);
    }
    aEl.addEventListener('input', update);
    bEl.addEventListener('input', update);
    update();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 3 · 投影与灭点（clamp D>=0.5 防除零）
     ══════════════════════════════════════════════════════════ */
  (function projTool() {
    var dEl = $('proj_D');
    if (!dEl) return;
    var dO = $('proj_DO');
    var cv = $('projChart'), ctx = cv ? cv.getContext('2d') : null;
    var vH = $('proj_h_v'), hH = $('proj_h_h');
    var vR = $('proj_ratio_v'), hR = $('proj_ratio_h');
    var vA = $('proj_angle_v'), hA = $('proj_angle_h');
    var vJ = $('proj_v'), hJ = $('proj_vh');
    var f = 50, H = 1.7;

    function draw(D) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 210;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var groundY = h - 40;
      // 地面
      ctx.beginPath(); ctx.moveTo(20, groundY); ctx.lineTo(w - 20, groundY);
      ctx.strokeStyle = '#9fb3d1'; ctx.lineWidth = 1; ctx.stroke();
      // 两个物体：近(D=1) 远(D= 当前 D 但用相对基准 2 演示)
      var refD = 2;
      var nearX = 70, farX = Math.min(w - 60, 70 + (refD / Math.max(D, 0.5)) * 18);
      var nearH = Math.min(150, f * H / 1 * (h / 170));   // 示意
      var farH = Math.min(150, f * H / Math.max(D, 0.5) * (h / 170));
      ctx.fillStyle = 'rgba(143,191,143,0.55)';
      ctx.fillRect(nearX - 12, groundY - nearH, 24, nearH);
      ctx.fillStyle = 'rgba(180,160,220,0.55)';
      ctx.fillRect(farX - 12, groundY - farH, 24, farH);
      label(ctx, '近 (D=1m) 像高大', nearX, groundY - nearH - 10, w, 'center', '#1f3a1f');
      label(ctx, '远 (D=' + D.toFixed(1) + 'm) 像高小', farX, groundY - farH - 10, w, 'center', '#3a2150');
      // 灭点虚线：两杆顶向远方收敛
      ctx.beginPath();
      ctx.setLineDash([5, 4]);
      ctx.moveTo(nearX, groundY - nearH); ctx.lineTo(w - 10, groundY - 4);
      ctx.moveTo(farX, groundY - farH); ctx.lineTo(w - 10, groundY - 4);
      ctx.strokeStyle = '#b0323a'; ctx.lineWidth = 1; ctx.stroke();
      ctx.setLineDash([]);
      label(ctx, '灭点（无穷远线投影）', w - 12, groundY - 16, w, 'right', '#b0323a');
    }

    function update() {
      var D = Math.max(0.5, parseFloat(dEl.value) || 2);
      txt(dO, D.toFixed(1));
      var hImg = f * H / D;               // mm
      var ratio = 2 / D;                 // 相对 D=2m
      var ang = 2 * Math.atan2(H / 2, D) * 180 / PI;
      txt(vH, hImg.toFixed(3) + ' mm');
      txt(vR, ratio.toFixed(3));
      txt(vA, ang.toFixed(2) + '°');
      txt(hH, 'f·H/D');
      txt(hR, '2/D');
      txt(hA, '2·atan(H/2D)');
      txt(vJ, '近大远小 = 投影失真');
      txt(hJ, 'D=1m 像高≈D=2m 的 ' + (2 / 1).toFixed(1) + ' 倍；D=10m 仅 ' + (2 / 10).toFixed(2) + ' 倍');
      draw(D);
    }
    dEl.addEventListener('input', update);
    update();
  })();

  /* ══════════════════════════════════════════════════════════
     工具 4 · 曲面欧拉示性数 χ = 2 - 2g
     ══════════════════════════════════════════════════════════ */
  (function eulTool() {
    var gEl = $('eul_g');
    if (!gEl) return;
    var gO = $('eul_gO');
    var cv = $('eulChart'), ctx = cv ? cv.getContext('2d') : null;
    var vChi = $('eul_chi_v'), hChi = $('eul_chi_h');
    var vName = $('eul_name_v'), hName = $('eul_name_h');
    var vK = $('eul_totalK_v'), hK = $('eul_totalK_h');
    var vJ = $('eul_v'), hJ = $('eul_vh');

    var NAMES = ['球面', '环面', '双环面', '三环面', '四环面', '五环面'];

    function draw(g) {
      if (!ctx) return;
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth || 600, h = 210;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var cx = w / 2, cy = h / 2;
      if (g === 0) {
        ctx.beginPath(); ctx.arc(cx, cy, 60, 0, 2 * PI);
        ctx.fillStyle = 'rgba(207,227,245,0.5)'; ctx.strokeStyle = '#2f6f9f'; ctx.lineWidth = 2; ctx.fill(); ctx.stroke();
        label(ctx, '球面（0 个洞）', cx, cy + 80, w, 'center', '#1f3350');
      } else {
        // 画一个带 g 个把手的环面示意：外环 + g 个内圈
        ctx.beginPath();
        ctx.ellipse(cx, cy, 95, 55, 0, 0, 2 * PI);
        ctx.fillStyle = 'rgba(231,217,245,0.5)'; ctx.strokeStyle = '#7a3fb0'; ctx.lineWidth = 2; ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, cy, 42, 24, 0, 0, 2 * PI);
        ctx.fillStyle = '#fff'; ctx.fill(); ctx.stroke();
        for (var i = 0; i < g; i++) {
          var hxx = g === 1 ? cx : (cx - 78 + i * (156 / (g - 1)));
          ctx.beginPath();
          ctx.arc(hxx, cy - 50, 13, 0, 2 * PI);
          ctx.fillStyle = 'rgba(123,63,176,0.35)'; ctx.fill();
          ctx.strokeStyle = '#7a3fb0'; ctx.lineWidth = 1.4; ctx.stroke();
        }
        label(ctx, 'g = ' + g + ' 个洞', cx, cy + 84, w, 'center', '#3a2150');
      }
    }

    function update() {
      var g = Math.max(0, Math.min(5, Math.round(parseFloat(gEl.value) || 0)));
      txt(gO, String(g));
      var chi = 2 - 2 * g;
      var K = 2 * PI * chi;
      txt(vChi, String(chi));
      txt(vName, NAMES[g] || ('g=' + g + ' 曲面'));
      txt(vK, (K >= 0 ? '' : '') + K.toFixed(4) + ' = ' + (chi >= 0 ? '' : '−') + Math.abs(chi) + 'π');
      tint(vChi, chi === 0 ? '#b0323a' : '#1f7a3a');
      txt(hChi, '2−2g');
      txt(hName, '球面/环面/双环面…');
      txt(hK, '高斯-博内：∫K dA = 2πχ');
      txt(vJ, '洞越多，χ 越小');
      txt(hJ, '局部曲率之和被拓扑 χ 锁定');
      draw(g);
    }
    gEl.addEventListener('input', update);
    update();
  })();

})();
