// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 导入GSAP动画库
// import gsap from 'gsap';

// 导入dat.gui
// import * as dat from 'dat.gui';

/* 创建场景对象 */
const scene = new THREE.Scene();

/* 创建网格模型 */
// 1. 创建一个圆弧
const geometry = new THREE.BufferGeometry();
// 参数：0, 0圆弧坐标原点x，y;  100：圆弧半径;    0, 2 * Math.PI：圆弧起始角度
const arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
// getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
// 分段数50，返回51个顶点
const points = arc.getPoints(50);
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry.setFromPoints(points);
console.log(geometry.attributes.position);
// 材质对象
const material = new THREE.LineBasicMaterial({
    color: 0x000000
});

// 网格模型对象Line
const line = new THREE.Line(geometry, material);

// line的本地坐标设置为(50, 0, 0)
line.position.set(50, 0, 0);
const group = new THREE.Group();
// group本地坐标设置和line一样设置为(50, 0, 0)
// line父对象设置position会影响得到line的世界坐标
group.position.set(50, 0, 0);
group.add(line);
scene.add(group);

// .position属性获得本地坐标
console.log("本地坐标", line.position);

// getWorldPosition()方法获得世界坐标
// 该语句默认在threejs渲染的过程中执行,如果渲染之前想获得世界矩阵属性、世界位置属性等属性，需要通过代码更新
scene.updateMatrixWorld(true);
const worldPosition = new THREE.Vector3();
line.getWorldPosition(worldPosition);
console.log("世界坐标", worldPosition);

// 将网格模型添加到场景中
scene.add(line);

// 2. 创建一条直线
var geometry2 = new THREE.BufferGeometry();
var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
// 三维直线LineCurve3
var LineCurve = new THREE.LineCurve3(p1, p2);
// 二维直线LineCurve
var LineCurve = new THREE.LineCurve(new THREE.Vector2(50, 0), new THREE.Vector2(0, 70));
var pointArr = LineCurve.getPoints(10);
geometry2.setFromPoints(pointArr);
var material2 = new THREE.LineBasicMaterial({
    color: 0xffff00,
});//材质对象
//线条模型对象
var strictLine = new THREE.Line(geometry2, material2);
scene.add(strictLine); //线条对象添加到场景中


// 3. 创建一条样条曲线
const geometry3 = new THREE.BufferGeometry();
// 三维样条曲线 Catmuull-Rom算法
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50, 20, 90),
    new THREE.Vector3(-10, 40, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(70, 0, 80)
]);
// getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
// 分段数100，返回101个顶点
const points3 = curve.getPoints(100);
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry3.setFromPoints(points3);
// 材质对象
const material3 = new THREE.LineBasicMaterial({
    color: 0xff0000
});
const splineCurve = new THREE.Line(geometry3, material3);
scene.add(splineCurve);


// 4. 创建一条贝塞尔曲线
const geometry4 = new THREE.BufferGeometry();
var point1 = new THREE.Vector3(-80, 0, 0);
var point2 = new THREE.Vector3(-40, 100, 0);
var point3 = new THREE.Vector3(40, 100, 0);
var point4 = new THREE.Vector3(80, 0, 0);
// 三维二次贝赛尔曲线
var curve2 = new THREE.QuadraticBezierCurve3(point1, point2, point3, point4);

// getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
// 分段数100，返回101个顶点
const points4 = curve2.getPoints(100);
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry4.setFromPoints(points4);
// 材质对象
const material4 = new THREE.LineBasicMaterial({
    color: 0x0000ff
});
const BezierCurve = new THREE.Line(geometry4, material4);
scene.add(BezierCurve);


// 5. 多个线条组合曲线 CurvePath
var geometry5 = new THREE.BufferGeometry(); //声明一个几何体对象BufferGeometry
// 绘制一个U型轮廓
var R = 80;//圆弧半径
var arc2 = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
// 半圆弧的一个端点作为直线的一个端点
var line1 = new THREE.LineCurve(new THREE.Vector2(R, 200, 0), new THREE.Vector2(R, 0, 0));
var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 200, 0));
// 创建组合曲线对象CurvePath
var CurvePath = new THREE.CurvePath();
// 把多个线条插入到CurvePath中
CurvePath.curves.push(line1, arc2, line2);
//分段数200
var points5 = CurvePath.getPoints(200);
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry5.setFromPoints(points5);
//材质对象
var material5 = new THREE.LineBasicMaterial({
    color: 0x00ffff
});
//线条模型对象
var curvePath = new THREE.Line(geometry5, material5);
scene.add(curvePath); //线条对象添加到场景中


// 6. 样条曲面生成圆管案例 (曲线路径管道成型)
const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, -50, -50),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(8, 50, 50),
    new THREE.Vector3(-5, 0, 100)
])
// path:路径;   40：沿着轨迹细分数;  2：管道半径;   25：管道截面圆细分数;
const geometry6 = new THREE.TubeGeometry(path, 40, 2, 25);
//材质对象
var material6 = new THREE.LineBasicMaterial({
    color: 0xffff00
});
//线条模型对象
var tubeGeometry = new THREE.Line(geometry6, material6);
scene.add(tubeGeometry); //线条对象添加到场景中


// 7. CurvePath多段路径生成管道案例 (曲线路径管道成型)
var po1 = new THREE.Vector3(-85.35, -35.36)
var po2 = new THREE.Vector3(-50, 0, 0);
var po3 = new THREE.Vector3(0, 50, 0);
var po4 = new THREE.Vector3(50, 0, 0);
var po5 = new THREE.Vector3(85.35, -35.36);
const line3 = new THREE.LineCurve3(po1, po2);
const curve3 = new THREE.CatmullRomCurve3([po2, po3, po4]);
const line4 = new THREE.LineCurve3(po4, po5);
const curvePath2 = new THREE.CurvePath();
curvePath2.curves.push(line3, curve3, line4);
const geometry7 = new THREE.TubeGeometry(curvePath2, 100, 5, 25, false);
//材质对象
var material7 = new THREE.LineBasicMaterial({
    color: 0xff0000
});
//线条模型对象
var tubeGeometry2 = new THREE.Line(geometry7, material7);
scene.add(tubeGeometry2); //线条对象添加到场景中


// 8. 创建旋转网格模型
const points8 = [
    new THREE.Vector2(50, 60),
    new THREE.Vector2(25, 0),
    new THREE.Vector2(50, -60)
];
// LatheGeometry可以利用已有的二维数据生成三维顶点数据，二维数据可以通过二维向量对象Vector2定义，也可以通过3D曲线或2D线条轮廓生成。 LatheGeometry的二维坐标数据默认绕y轴旋转。
// 格式：LatheGeometry(points, segments, phiStart, phiLength)
const geometry8 = new THREE.LatheGeometry(points8, 30);
// 材质对象
const material8 = new THREE.MeshPhongMaterial({
    color: 0x0000ff, // 三角面颜色
    side: THREE.DoubleSide // 两面可见
});
// 线条模式渲染(查看细分数)
material8.wireframe = true;
// 旋转网格模型对象
const mesh = new THREE.Mesh(geometry8, material8);
scene.add(mesh);


// 9. 创建旋转网格模型————(样条曲线插值计算)
// 创建Shape对象
const shape = new THREE.Shape();
// 定位定点
const points9 = [
    new THREE.Vector2(50, 60),
    new THREE.Vector2(25, 0),
    new THREE.Vector2(50, -60)
];
// 顶点带入样条插值计算函数
shape.splineThru(points9);
// 插值计算细分数20
const splinePoints = shape.getPoints(20);
// 旋转造型
const geometry9 = new THREE.LatheGeometry(splinePoints, 30);
// 材质对象
const material9 = new THREE.MeshPhongMaterial({
    color: 0xdddddd, // 三角面颜色
    side: THREE.DoubleSide // 两面可见
});
// 线条模式渲染(查看细分数)
material8.wireframe = true;
// 旋转网格模型对象
const mesh2 = new THREE.Mesh(geometry9, material9);
// scene.add(mesh2);


// 10. Shape对象和轮廓填充ShapeGeometry
const points10 = [
    new THREE.Vector2(-50, -50),
    new THREE.Vector2(-60, 0),
    new THREE.Vector2(0, 50),
    new THREE.Vector2(60, 0),
    new THREE.Vector2(50, -50),
    new THREE.Vector2(-50, -50),
]
// 通过顶点定义轮廓
const shape2 = new THREE.Shape(points10);
// shape可以理解为一个需要填充轮廓
// 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
const geometry10 = new THREE.ShapeGeometry(shape2, 25);
geometry10.rotateX(Math.PI / 2);
// 材质对象
const material10 = new THREE.MeshPhongMaterial({
    color: 0x23a9f2, // 三角面颜色
    side: THREE.DoubleSide // 两面可见
});
// 网格模型对象
const plan1 = new THREE.Mesh(geometry10, material10);
scene.add(plan1);


// 10.2 圆弧轮廓
// shape对象
const shape3 = new THREE.Shape();
// 外轮廓
shape3.absarc(200, 0, 100, 0, 2 * Math.PI);
// 内轮廓1
const path1 = new THREE.Path();
path1.arc(200, 0, 40, 0, 2 * Math.PI);
// 内轮廓2
const path2 = new THREE.Path();
path2.arc(280, 0, 10, 0, 2 * Math.PI);
// 内轮廓3
const path3 = new THREE.Path();
path3.arc(120, 0, 10, 0, 2 * Math.PI);
// 三个内轮廓分别插入到holes属性中
shape3.holes.push(path1, path2, path3);
const geometry11 = new THREE.ShapeGeometry(shape3, 25);
geometry11.rotateX(Math.PI / 2);
// 网格模型对象
const plan2 = new THREE.Mesh(geometry11, material10);
scene.add(plan2);


// 11. 拉伸扫描成型ExtrudeGeometry
const shpae4 = new THREE.Shape();
// 四条直线绘制一个矩形轮廓
shpae4.moveTo(0, 0); //起点
shpae4.lineTo(0, 10);
shpae4.lineTo(10, 10);
shpae4.lineTo(10, 0);
shpae4.lineTo(0, 0);
// 创建轮廓的扫描轨迹(3D样条曲线)
const curve4 = new THREE.CatmullRomCurve3([
    new THREE.Vector3( -10, -50, -50 ),
    new THREE.Vector3( 10, 0, 0 ),
    new THREE.Vector3( 8, 50, 50 ),
    new THREE.Vector3( -5, 0, 100)
]);
// 拉伸造型
const geometry12 = new THREE.ExtrudeGeometry(
    shpae4, // 二维轮廓
    {
        // amount: 120, // 拉伸长度
        bevelEnabled: false, // 无倒角
        extrudePath: curve4, // 选择扫描轨迹
        steps: 50 // 扫描方向细分数
    }
);
const material12 = new THREE.MeshPhongMaterial({
    color: 0x23a9f2, // 颜色
    side: THREE.DoubleSide // 两面可见
});
// 网格模型对象
const mesh3 = new THREE.Mesh(geometry12, material12);
scene.add(mesh3);




/* 光源设置 */
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源位置
directionalLight.position.set(60, 100, 40);
scene.add(directionalLight);



/* 相机设置 */
const width = window.innerWidth;
const height = window.innerHeight;
// 窗口宽高比
const k = width / height;
// 三维场景显示范围控制系数,系数越大,显示的范围越大
const s = 200;
// 创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// 设置相机位置
camera.position.set(200, 300, 200);
// 设置相机方向(指向的场景对象)
camera.lookAt(scene.position);


/* 创建渲染对象 */
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
// 设置渲染区域尺寸
renderer.setSize(width, height);
// 设置背景颜色
renderer.setClearColor(0xb9d3ff, 1);
// body元素中插入canvas对象
document.body.appendChild(renderer.domElement);

/* 设置均匀旋转动画 */
// 上次时间
let T0 = new Date();
function render() {
    // 本次时间
    let T1 = new Date();
    // 时间差
    let t = T1 - T0;
    // 把本次时间赋值给上次时间
    T0 = T1;
    // 请求再次执行渲染函数render
    requestAnimationFrame(render);
    // 执行渲染操作: 指定场景 / 相机作为参数
    renderer.render(scene, camera);
    // 旋转角速度0.001弧度每毫秒
    // line.rotateY(0.001 * t);
}
render();

// 创建控件对象
const controls = new OrbitControls(camera, renderer.domElement);
// 监听鼠标,键盘事件 (已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数)
// controls.addEventListener('change', render);

// 设置控制器阻尼，让控制器更有真实效果
controls.enableDamping = true;

/* 辅助坐标系 */
// 参数250表示坐标系大小，可以根据场景大小去设置
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);