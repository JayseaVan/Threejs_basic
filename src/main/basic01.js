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
// 1. 创建一个立方体
const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
// boxGeometry.scale(0.5, 1.5, 2);
// 材质对象
var material=new THREE.MeshPhongMaterial({ // 模拟镜面反射实现高光效果
    color:0xffffff,
    specular:0x4488ee, // 高光颜色
    shininess:12 // 光照强度的系数
});
// 网格模型对象Mesh
const mesh = new THREE.Mesh(boxGeometry, material);
// mesh.scale.set(0.5, 1.5, 2)
// 将网格模型添加到场景中
scene.add(mesh);


// 2. 球体网格模型
const sphereGeometry = new THREE.SphereGeometry(60, 40, 40); // 创建一个球体
const material2 = new THREE.MeshLambertMaterial({ // 漫反射渲染
    color: 0xff00ff,
    transparent: true,
    opacity: 0.7
});
const mesh2 = new THREE.Mesh(sphereGeometry, material2); // 网格模型对象Mesh
mesh2.translateY(120); //球体网格模型沿Y轴正方向平移120
scene.add(mesh2);


// 3. 圆柱体网格模型
const cylinderGeometry = new THREE.CylinderGeometry(50, 50, 100, 25);
const material3 = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.7
});
const mesh3 = new THREE.Mesh(cylinderGeometry, material3);
mesh3.position.set(120, 0, 0);
scene.add(mesh3);


// 4. 创建一个Buffer类型几何体对象
const geometry = new THREE.BufferGeometry();
// 类型数组创建顶点位置position数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标

    0, 0, 10, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 10, //顶点6坐标
]);
// 创建属性缓冲区对象
// 3个为一组，表示一个顶点的xyz坐标
const attribute = new THREE.BufferAttribute(vertices, 3);
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribute;

// 类型数组创建顶点颜色color数据
const colors = new Float32Array([
    1, 0, 0, //顶点1颜色
    0, 1, 0, //顶点2颜色
    0, 0, 1, //顶点3颜色

    1, 1, 0, //顶点4颜色
    0, 1, 1, //顶点5颜色
    1, 0, 1, //顶点6颜色
]);
// 设置几何体attributes属性的颜色color属性
// 3个为一组,表示一个顶点的颜色数据RGB
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

// 类型数组创建顶点法向量normals数据
const normals = new Float32Array([
    0, 0, 1, //顶点1法向量
    0, 0, 1, //顶点2法向量
    0, 0, 1, //顶点3法向量

    0, 1, 0, //顶点4法向量
    0, 1, 0, //顶点5法向量
    0, 1, 0, //顶点6法向量
]);
// 设置几何体attributes属性的位置normal属性
// 3个为一组, 表示一个顶点的法向量数据
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

// 三角面（网格）渲染模式
// 材质对象
const material4 = new THREE.MeshLambertMaterial({
    color: 0x0000ff, // 三角面颜色
    // vertexColors: true,
    side: THREE.DoubleSide, // 两面可见
});
// 网格模型对象Mesh
const mesh4 = new THREE.Mesh(geometry, material4);
mesh4.position.set(-120, 0, 0);
scene.add(mesh4);

// 点材质对象
const material5 = new THREE.PointsMaterial({
    // color: 0xff0000, // 使用顶点颜色数据渲染模型，不需要再定义color属性
    vertexColors: true, // 以顶点颜色为准
    size: 10.0 // 点对象像素尺寸
});
// 点模型对象
const points = new THREE.Points(geometry, material5);
points.position.set(-240, 0, 0);
// 点对象添加到场景中
scene.add(points);

// 线条渲染模式
const material6 = new THREE.LineBasicMaterial({
    color: 0xff0000
});
const line = new THREE.Line(geometry, material6);
line.position.set(-360, 0, 0);
scene.add(line);


// 5. 声明一个几何体对象Geometry(已废弃)
/* const geometry2 = new THREE.Geometry();
// Vector3定义顶点位置坐标数据
const p1 = new THREE.Vector3(50, 0, 0); // 顶点1坐标
const p2 = new THREE.Vector3(0, 70, 0); // 顶点2坐标
const p3 = new THREE.Vector3(80, 70, 0); // 顶点3坐标
// 顶点坐标添加到geometry对象
geometry2.vertices.push(p1, p2, p3);

// Color对象表示顶点颜色数据
const color1 = new THREE.Color(0x00ff00); // 顶点1颜色——绿色
const color2 = new THREE.Color(0xff0000); // 顶点2颜色——红色
const color3 = new THREE.Color(0x0000ff); // 顶点3颜色——蓝色
// 顶点颜色数据添加到geometry对象
geometry2.colors.push(color1, color2, color3);

// 材质对象
const material7 = new THREE.MeshLambertMaterial({
    vertexColors: true,
    side: THREE.DoubleSide
})
// 网格模型对象Mesh
const mesh5 = new THREE.Mesh(geometry2, material7);
mesh5.position.set(-480, 0, 0);
scene.add(mesh5); */


/* 光源设置 */
// 点光源
const point = new THREE.PointLight(0xffffff);
// 点光源位置
point.position.set(400, 200, 300);
// 点光源添加到场景中
scene.add(point);
// 环境光    环境光颜色与网格模型的颜色进行RGB进行乘法运算
const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

// 点光源2
const point2 = new THREE.PointLight(0xffffff);
point2.position.set(-400, -200, -300);
scene.add(point2);

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
    mesh.rotateY(0.001 * t);
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