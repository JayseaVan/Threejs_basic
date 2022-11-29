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

/* 添加物体 */
// 创建几何体
for (let i = 0; i < 50; i++) {
    // 每一个三角形需要3个顶点，每个顶点需要3个值
    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
        positionArray[j] = Math.random() * 10 - 5;
    }
    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positionArray, 3)
    );
    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5
    })
    // 根据几何体和材质创建物体
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

/* //创建一个Buffer类型几何体对象
const geometry = new THREE.BufferGeometry();
// 类型数组创建顶点数据
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
])

// itemSize = 3 因为每个顶点都是一个三元组。
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 根据几何体和材质创建物体
const mesh = new THREE.Mesh(geometry, material);

// 将几何体添加到场景中
scene.add(mesh); */



/* 使用dat.gui */



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

