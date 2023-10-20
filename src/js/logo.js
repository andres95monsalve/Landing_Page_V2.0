var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth * 0.4, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.PlaneGeometry(1.1, 0.4);
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('src/img/logo.png');
var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.5 });
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 2;

function render() {
    plane.rotation.y += 0.02;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
