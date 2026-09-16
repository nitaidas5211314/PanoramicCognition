// 所有会落进正文的数学数字，先用 node 算出来锁定，避免先写后抽查。
const PI = Math.PI;

function poly(n){
  // 单位圆内接正 n 边形
  const perim = 2*n*Math.sin(PI/n);          // 周长
  const piPerim = n*Math.sin(PI/n);           // 由周长估计的 pi (=perim/2)
  const area = (n/2)*Math.sin(2*PI/n);        // 面积 -> pi 估计 = area
  return {n, perim, piPerim, area,
    errPerim: piPerim-PI, errArea: area-PI};
}
function polyOut(n){
  const r=poly(n);
  console.log(`n=${String(r.n).padStart(3)} 周长=${r.perim.toFixed(6)} pi估计(周长)=${r.piPerim.toFixed(6)} 误差=${r.errPerim.toExponential(3)} | 面积(pi估计)=${r.area.toFixed(6)} 误差=${r.errArea.toExponential(3)}`);
}
[3,4,6,12,24,48,96,192,384,1000,100000].forEach(polyOut);

// 阿基米德 96 边外切
function circum(n){
  return {piC:n*Math.tan(PI/n), piI:n*Math.sin(PI/n)};
}
const c96=circum(96);
console.log(`\n96-gon 内切pi估计=${c96.piI.toFixed(6)} 外切pi估计=${c96.piC.toFixed(6)} -> 区间 [${c96.piI.toFixed(4)}, ${c96.piC.toFixed(4)}]`);

// 勾股
function pyth(a,b){
  const c=Math.sqrt(a*a+b*b);
  const angA=Math.atan2(a,b)*180/PI; // a 为对边
  const angB=Math.atan2(b,a)*180/PI;
  return {c, angA, angB};
}
[ [3,4],[5,12],[8,15],[1,1],[7,24] ].forEach(([a,b])=>{
  const r=pyth(a,b);
  console.log(`勾股 ${a},${b} -> c=${r.c.toFixed(4)} 角A=${r.angA.toFixed(3)}° 角B=${r.angB.toFixed(3)}°`);
});

// 欧拉示性数：闭可定向曲面 genus g -> chi=2-2g
console.log('\nEuler χ = 2-2g:');
[0,1,2,3,4,5].forEach(g=>{
  console.log(`  g=${g}  χ=${2-2*g}`);
});
// 多面体 V-E+F
const polys=[
  ['四面体',4,6,4],
  ['立方体',8,12,6],
  ['八面体',6,12,8],
  ['十二面体',20,30,12],
  ['二十面体',12,30,20],
];
console.log('\n多面体 V-E+F:');
polys.forEach(([n,V,E,F])=>{
  console.log(`  ${n}: ${V}-${E}+${F} = ${V-E+F}`);
});

// 高斯-博内：闭曲面 ∫K dA = 2π χ
console.log('\nGauss-Bonnet 总曲率 ∫K dA = 2π χ:');
[0,1,2,3].forEach(g=>{
  const chi=2-2*g;
  console.log(`  g=${g}  χ=${chi}  总曲率=${(2*PI*chi).toFixed(4)} = ${(2*chi)}π`);
});
// 单位球面: K=1, 面积 4π -> ∫ = 4π
console.log(`  单位球面 K=1, A=4π -> ∫K dA=${ (1*4*PI).toFixed(4) } = 2πχ(=2*2*PI=${(4*PI).toFixed(4)}) 校验 ${(1*4*PI).toFixed(4)===(4*PI).toFixed(4)}`);

// 投影/灭点：相同物体 H，焦距 f，距离 D -> 像高 h'=fH/D；比 = D_ref/D
function proj(H,f,D){ return f*H/D; }
const f=50, H=1.7, Dref=2;
console.log('\n投影 像高(单位: f*H/D, 取 f=50mm,H=1.7m):');
[0.5,1,2,5,10,20].forEach(D=>{
  const h=proj(H,f,D);
  console.log(`  D=${String(D).padStart(4)}m  像高=${h.toFixed(3)}mm  相对 D=2m 的比=${(Dref/D).toFixed(3)}`);
});

// 圆锥/圆柱体积比等常规，略
// 曲率半径与引力： Schwarzschild 弱场 g=GM/r^2，几何侧用高斯-博内即可，不重复。

// 五边形/十边形角
console.log('\n正 n 边形内角 = (n-2)*180/n:');
[3,4,5,6,8,10,12].forEach(n=>console.log(`  n=${n} 内角=${((n-2)*180/n).toFixed(1)}°`));

// 球面上三角形角和 >180，双曲 <180：正曲率球面等边三角 (边长角 s) 角和 = 180+ (area/R^2)*180/π
// 给个示意：单位球面，直角三角（两直角边90°大圆）角和=270°
console.log('\n球面三角形示例：取单位球面上由两条赤道、一条经线围成的直角三角，三角和=270° (比平面多90°=面积π)');
console.log('双曲(负曲)示例：庞加莱圆盘内等边三角，角和可<180°，如 60°-ε，面积越大缺角越大');

// 信息几何：流形假设（流形学习）d 维流形嵌入 R^D, D>>d
console.log('\n流形假设示例：瑞士卷 d=2 嵌入 R^3；MNIST ~ 28*28=784 维空间但内在维数约 10-20');
