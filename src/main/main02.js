// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 导入GSAP动画库
import gsap from 'gsap';

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
// cube.position.x = 3;

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
// 设置控制器阻尼，让控制器更有真实效果
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// 设置 GSAP 动画
let animate1 = gsap.to(cube.position, { 
    x: 5, 
    duration: 5, 
    ease: "sine.in", 
    repeat: -1, // 设置重复次数，无限循环-1
    yoyo: true, // 往返运动
    // delay: 2, // 延迟2秒运动
    onComplete: () => {
        console.log("动画完成");
    },
    onStart: () => {
        console.log("动画开始");
    }
});
let animate2 = gsap.to(cube.rotation, { 
    x: 2 * Math.PI, 
    duration: 5, 
    ease: "power1.inOut", 
    repeat: -1,
});

window.addEventListener("dblclick", () => {
    if (animate1.isActive()) {
        animate1.pause();
        animate2.pause();
    } else {
        animate1.resume();
        animate2.resume();
    }
})

function render() {
    /* 获取时钟运行的总时长 */
    // let time = clock.getElapsedTime();
    // console.log("时钟运行的总时长", time);
    /* 两次获取时间的间隔时长 */
    // let deltaTime = clock.getDelta();
    // console.log("两次获取时间的间隔时长", deltaTime);

    // controls.enableDamping === true 被启用，必须在动画循环里调用.update()。
    controls.update();

    renderer.render(scene, camera);
    // 渲染下一帧时调用render函数
    requestAnimationFrame(render);
}
// 初始渲染时调用render函数
render();


// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
});

