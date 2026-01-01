// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 20, 300);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0x404040));

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(20, 40, 20);
scene.add(light);

// Curve (Geometry of the track)
const points = [];
for (let i = 0; i < 120; i++) {
    points.push(new THREE.Vector3(
        i - 60,
        Math.sin(i * 0.25) * 8,
        Math.cos(i * 0.25) * 8
    ));
}

const curve = new THREE.CatmullRomCurve3(points);

// Track
const trackGeometry = new THREE.TubeGeometry(curve, 400, 0.5, 10, false);
const trackMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    metalness: 0.6,
    roughness: 0.3
});

const track = new THREE.Mesh(trackGeometry, trackMaterial);
scene.add(track);

// Camera animation variables
let t = 0;
let speed = 0.001;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    t += speed;
    if (t > 1) t = 0;

    const position = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    camera.position.copy(position);
    camera.lookAt(position.clone().add(tangent));

    renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
