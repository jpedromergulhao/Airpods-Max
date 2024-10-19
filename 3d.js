import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const width = window.innerWidth, height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
document.getElementsByClassName("container3d")[0].appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
camera.position.z = 13;

const scene = new THREE.Scene();
let airPod;

const loader = new GLTFLoader();
loader.load("./assets/airpods_max_clone.glb",
    function (gltf) {
        airPod = gltf.scene;
        scene.add(airPod);
        airPod.position.set(3.6, -0.4, -30);
        airPod.rotation.set(0, 3.8, 0);
        airPod.visible = true;
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

let arrPosition = [
    { id: "header", position: { x: 3.6, y: -0.4, z: -30 }, rotation: { x: 0, y: 3.8, z: 0 } },
    { id: "design", position: { x: -2.5, y: 0, z: -30 }, rotation: { x: 0, y: 3.2, z: 0 } },
    { id: "sound", position: { x: 3, y: 0, z: -40 }, rotation: { x: 0, y: 1.5, z: 0 } },
    { id: "comfort", position: { x: 5.6, y: 0.9, z: -50 }, rotation: { x: -0.02, y: 3.05, z: 0.2 } },
    { id: "battery", position: { x: -3, y: 0, z: -30 }, rotation: { x: 0, y: 2.5, z: 0 } },
];

const moveModel = () => {
    const sections = document.getElementsByClassName("section");
    let currentSection;

    Array.from(sections).forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
            currentSection = section.id;
        }
    });

    let positionActive = arrPosition.findIndex(obj => obj.id === currentSection);

    if (positionActive !== -1 && airPod) {
        let newCoordinates = arrPosition[positionActive];
        gsap.to(airPod.position, {
            x: newCoordinates.position.x,
            y: newCoordinates.position.y,
            z: newCoordinates.position.z,
            duration: 2,
            ease: "power1.out"
        });
        gsap.to(airPod.rotation, {
            x: newCoordinates.rotation.x,
            y: newCoordinates.rotation.y,
            z: newCoordinates.rotation.z,
            duration: 2,
            ease: "power1.out"
        });
    }
};

const buySection = document.getElementById('buy');
const buySectionPosition = buySection.offsetTop - window.innerHeight * 0.5;

const batterySection = document.getElementById('battery');
const batterySectionPosition = batterySection.offsetTop - window.innerHeight * 0.1;

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= buySectionPosition && airPod) {
        gsap.to(airPod, { duration: 0.1, opacity: 0, onComplete: () => airPod.visible = false });
    }

    if (scrollPosition < batterySectionPosition && airPod && !airPod.visible) {
        airPod.visible = true;
        gsap.to(airPod, { duration: 1, opacity: 1 });
    }

    if (airPod) {
        moveModel();
    }
});


// const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
// const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

// renderer.setAnimationLoop( animate );

// // animation

// function animate( time ) {

// 	mesh.rotation.x = time / 2000;
// 	mesh.rotation.y = time / 1000;


// }