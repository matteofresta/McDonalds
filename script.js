// Burger-Menü Funktionalität
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');
const body = document.body;

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burgerMenu.classList.toggle('open');
    body.classList.toggle('menu-open');

    // Zugänglichkeit: Attribute ändern
    const isOpen = navLinks.classList.contains('open');
    burgerMenu.setAttribute('aria-expanded', isOpen);

    // Icon ändern
    const icon = burgerMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Dropdown-Menü für mobile Ansicht
const dropdowns = document.querySelectorAll('.nav-links .dropdown > a');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        }
    });
});

// 3D-Burger-Animation
// Szene, Kamera und Renderer erstellen
const scene = new THREE.Scene();
scene.background = null;

const canvasContainer = document.getElementById('burger-animation');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
canvasContainer.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(90, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

// AmbientLight hinzufügen für allgemeine Beleuchtung
const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

// PointLight für zusätzliche Beleuchtung
const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(5, 10, 10);
scene.add(pointLight);

// GLTFLoader verwenden, um das 3D-Modell zu laden
const loader = new THREE.GLTFLoader();
loader.load('model/delicious_hamburger.glb', function (gltf) {
    const hamburger = gltf.scene;
    scene.add(hamburger);
    hamburger.position.set(0, -1, 0);
    hamburger.scale.set(5, 5, 5);

    // Rotation im Animations-Loop
    function animate() {
        requestAnimationFrame(animate);
        hamburger.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function(error) {
    console.error(error);
});

// Kamera-Position für Top-Front-Ansicht
camera.position.set(0, 0, 4.7);

// Fenstergröße anpassen
window.addEventListener('resize', () => {
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
});
