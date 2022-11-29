// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 导入GSAP动画库
import gsap from 'gsap';

// 导入dat.gui
import * as dat from 'dat.gui';

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

/* 使用dat.gui */
const gui = new dat.GUI();
// 改变物体在x轴的位置
gui.add(cube.position, "x").min(0).max(5).step(0.01).name("移动X轴").onFinishChange((value) => {
    console.log("完全停下来: ", value);
});
// 修改物体颜色
const params = {
    color: '#ffff00',
    fn: () => {
        gsap.to(cube.position, {x: 5, duration: 2, yoyo: true, repeat: -1});
    }
}
gui.addColor(params, "color").onChange((value) => {
    cube.material.color.set(value);
})
gui.add(cube, "visible").name("是否显示物体");

// 设置选项框
const folder = gui.addFolder("设置立方体");
folder.add(cube.material, "wireframe");
// 设置按钮点击触发某个事件
folder.add(params, "fn").name("立方体运动");


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


window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    // 双击控制屏幕进入全屏/退出全屏
    if (!fullScreenElement) {
        // 让画布对象全屏
        renderer.domElement.requestFullscreen();
    } else {
        // 退出全屏，使用document对象
        document.exitFullscreen();
    }
})

function render() {
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

