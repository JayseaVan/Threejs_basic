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
const boxGeometry = new THREE.BoxGeometry(40, 100, 40);
// 材质对象
var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
});
// 网格模型对象Mesh
const mesh = new THREE.Mesh(boxGeometry, material);
// 将网格模型添加到场景中
scene.add(mesh);

// 设置产生投影的网格模型
mesh.castShadow = true;


/* 创建一个平面几何体作为投影面 */
const planeGeometry = new THREE.PlaneGeometry(300, 200);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x999999
});
// 平面网格模型作为投影面
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
planeMesh.rotateX(-Math.PI / 2);
planeMesh.position.y = -50;

// 设置接收阴影的投影面
planeMesh.receiveShadow = true;


/* 光源设置 */
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源位置
directionalLight.position.set(60, 100, 40);
scene.add(directionalLight);

// 设置用于计算阴影的光源对象
directionalLight.castShadow = true;

// 设置计算阴影的区域，最好刚好紧密包围在对象周围
// 计算阴影的区域过大：模糊  过小：看不到或显示不完整
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 300;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -100;
// 设置mapSize属性可以使阴影更清晰，不那么模糊
// directionalLight.shadow.mapSize.set(1024, 1024);

// console.log(directionalLight.shadow.camera);

// 聚光光源
/* const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(50, 90, 50);
spotLight.angle = Math.PI / 6;
scene.add(spotLight);

spotLight.castShadow = true;

spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 200;
spotLight.shadow.camera.fov = 20; */


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

//Create a helper for the shadow camera (optional)
// const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
// scene.add( helper );


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