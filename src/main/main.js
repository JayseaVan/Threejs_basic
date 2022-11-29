// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';
import { Vector2 } from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 导入GSAP动画库
// import gsap from 'gsap';

// 导入dat.gui
// import * as dat from 'dat.gui';

/* 创建场景对象 */
const scene = new THREE.Scene();

/* 创建网格模型 */
// 创建一个canvas对象，并绘制一些轮廓
var canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 128;
var c = canvas.getContext('2d');
// 矩形区域填充背景
c.fillStyle = "#007acc";
c.fillRect(0, 0, 512, 128);
    c.beginPath();
// 文字
c.beginPath();
c.translate(256,64);
c.fillStyle = "#000000"; //文本填充颜色
c.font = "bold 48px 宋体"; //字体样式设置
c.textBaseline = "middle"; //文本与fillText定义的纵坐标
c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
c.fillText("Canvas", 0, 0);

// canvas画布对象作为CanvasTexture的参数重建一个纹理对象
// canvas画布可以理解为一张图片
const texture = new THREE.CanvasTexture(canvas);
//打印纹理对象的image属性
// console.log(texture.image);
//矩形平面
const geometry = new THREE.PlaneGeometry(128, 32);

const material = new THREE.MeshPhongMaterial({
    map: texture, // 设置纹理贴图
});
// 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);



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