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
// 头部网格模型和组
var headMesh = sphereMesh(10, 0, 0, 0);
headMesh.name = "脑壳"
var leftEyeMesh = sphereMesh(1, 8, 5, 4);
leftEyeMesh.name = "左眼"
var rightEyeMesh = sphereMesh(1, 8, 5, -4);
rightEyeMesh.name = "右眼"
var headGroup = new THREE.Group();
headGroup.name = "头部"
headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
// 身体网格模型和组
var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
neckMesh.name = "脖子"
var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
bodyMesh.name = "腹部"
var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
leftLegMesh.name = "左腿"
var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
rightLegMesh.name = "右腿"
var legGroup = new THREE.Group();
legGroup.name = "腿"
legGroup.add(leftLegMesh, rightLegMesh);
var bodyGroup = new THREE.Group();
bodyGroup.name = "身体"
bodyGroup.add(neckMesh, bodyMesh, legGroup);
// 人Group
var personGroup = new THREE.Group();
personGroup.name = "人"
personGroup.add(headGroup, bodyGroup)
personGroup.translateY(50)
scene.add(personGroup);

// 球体网格模型创建函数
function sphereMesh(R, x, y, z) {
  var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
  mesh.position.set(x, y, z);
  return mesh;
}
// 圆柱体网格模型创建函数
function cylinderMesh(R, h, x, y, z) {
  var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
  mesh.position.set(x, y, z);
  return mesh;
}

scene.traverse(function(obj) {
    if (obj.type === "Group") {
      console.log(obj.name);
    }
    if (obj.type === "Mesh") {
      console.log('  ' + obj.name);
      obj.material.color.set(0xffff00);
    }
    if (obj.name === "左眼" | obj.name === "右眼") {
      obj.material.color.set(0x000000)
    }
    // 打印id属性
    console.log("id", obj.id);
    // 打印该对象的父对象
    console.log("parent", obj.parent);
    // 打印该对象的子对象
    console.log("children", obj.children);
})

// 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
var nameNode = scene.getObjectByName ( "左腿" );
nameNode.material.color.set(0xff0000);


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
    personGroup.rotateY(0.001 * t);
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