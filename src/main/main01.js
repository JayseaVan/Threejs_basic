// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /
    window.innerHeight, 0.1, 1000); // 透视摄像机

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(geometry, material);

// 修改物体位置
cube.position.x = 3;

// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染器的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render(time) {
    // console.log(time);
    // cube.position.x += 0.01;
    // cube.rotation.x += 0.01;
    // if (cube.position.x > 5) {
    //     cube.position.x = 0;
    // }

    let t = time / 1000 % 5;
    cube.position.x = t * 1;
    cube.rotation.x = t * 1;

    renderer.render(scene, camera);
    // 渲染下一帧时调用render函数
    requestAnimationFrame(render);
}
// 初始渲染时调用render函数
render();
