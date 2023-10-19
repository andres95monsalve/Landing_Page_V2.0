let camera, scene, renderer;
let isUserInteracting = false,
  lon = 90,
  lat = 0,
  phi = 0,
  theta = 0,
  target = new THREE.Vector3();

function init() {
  let container;
  container = document.querySelector("#container");
  camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    1,
    1100
  );
  scene = new THREE.Scene();
  const materials = [
    loadTexture("space4.jpg"),
    loadTexture("space2.jpg"),
    loadTexture("space1.jpg"),
    loadTexture("space6.jpg"),
    loadTexture("space3.jpg"),
    loadTexture("space5.jpg"),
  ];
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(300, 300, 300, 7, 7, 7),
    new THREE.MultiMaterial(materials)
  );
  mesh.scale.x = -1;
  scene.add(mesh);
  for (let i = 0, l = mesh.geometry.vertices.length; i < l; i++) {
    const vertex = mesh.geometry.vertices[i];
    vertex.normalize();
    vertex.multiplyScalar(550);
  }
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);
  document.addEventListener("mousedown", onDocumentMouseDown, {
    passive: false,
  });
  document.addEventListener("mousemove", onDocumentMouseMove, {
    passive: false,
  });
  document.addEventListener("mouseup", onDocumentMouseUp, { passive: false });
  document.addEventListener("touchstart", onDocumentTouchStart, {
    passive: false,
  });
  document.addEventListener("touchmove", onDocumentTouchMove, {
    passive: false,
  });
  window.addEventListener("resize", onWindowResize, { passive: false });
  document.body.style.cursor = "default"; // Desactivar el mouse en el objeto 3D
}
init();

function onWindowResize() {
  const container = document.querySelector("#container");
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function loadTexture(path) {
  const imgPath = "src/" + "img/" + path;
  const texture = new THREE.Texture();
  const material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
  const image = new Image();
  image.onload = function () {
    texture.image = this;
    texture.needsUpdate = true;
  };
  image.src = imgPath;
  return material;
}

function update() {
  if (isUserInteracting === false) {
    lon += 0.1;
  }
  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);
  target.x = 500 * Math.sin(phi) * Math.cos(theta);
  target.y = 500 * Math.cos(phi);
  target.z = 500 * Math.sin(phi) * Math.sin(theta);
  camera.position.copy(target).negate();
  camera.lookAt(target);
  renderer.render(scene, camera);
}

function onDocumentMouseDown(e) {
  isUserInteracting = true;
  lon = (e.clientX / window.innerWidth) * 360 - 180;
  lat = -(e.clientY / window.innerHeight) * 180 + 90;
}

function onDocumentMouseMove(e) {
  if (isUserInteracting === true) {
    lon = (e.clientX / window.innerWidth) * 360 - 180;
    lat = -(e.clientY / window.innerHeight) * 180 + 90;
  }
}

function onDocumentMouseUp() {
  isUserInteracting = false;
}

function onDocumentTouchStart(e) {
  if (e.touches.length == 1) {
    lon = (e.touches[0].pageX / window.innerWidth) * 360 - 180;
    lat = -(e.touches[0].pageY / window.innerHeight) * 180 + 90;
  }
}

function onDocumentTouchMove(e) {
  if (e.touches.length == 1) {
    lon = (e.touches[0].pageX / window.innerWidth) * 360 - 180;
    lat = -(e.touches[0].pageY / window.innerHeight) * 180 + 90;
  }
}

function animate() {
  requestAnimationFrame(animate);
  update();
}
animate();

const menuBtn = document.getElementById("menuBtn");
const menuSection = document.getElementById("menu");
menuBtn.addEventListener("click", toggleMenu);
document.body.addEventListener("click", function (event) {
  if (!menuSection.contains(event.target) && event.target !== menuBtn) {
    hideMenu();
  }
});

function toggleMenu() {
  if (menuSection.classList.contains("visible")) {
    hideMenu();
  } else {
    showMenu();
  }
}

function hideMenu() {
  gsap.to(menuSection, {
    opacity: 0,
    duration: 0.8,
    onComplete: function () {
      menuSection.classList.remove("visible");
      menuSection.innerHTML = "";
    },
  });
}

function showMenu() {
  const menuItems = [
    { text: "Proyectos", link: "https://www.facebook.com" },
    { text: "Publicaciones", link: "https://www.twitter.com" },
    { text: "FAQ", link: "https://www.google.com" },
    { text: "Carreras", link: "https://www.google.com" },
    { text: "Quienes Somos", link: "https://www.google.com" },
    { text: "Contacto", link: "https://www.google.com" },
  ];
  menuSection.innerHTML = menuItems
    .map(
      (item) => `<li><a href="${item.link}" class="texto">${item.text}</a></li>`
    )
    .join("");
  gsap.set(menuSection, { opacity: 1 });
  gsap.to(menuSection, {
    opacity: 1,
    duration: 0.8,
    onStart: function () {
      menuSection.classList.add("visible");
    },
  });
}

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".imagen-final",
    start: "-50% left",
    end: "200% center",
    scrub: true,
    markers: false,
    toggleActions: "play reverse play reverse",
  },
});

tl.to(".imagen-final", {
  x: 800,
  duration: 0.5,
});

var buttonUp = document.getElementById("button-up");
buttonUp.style.transform = "scale(0)";

document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp() {
  var currentScroll = document.documentElement.scrollTop;

  if (currentScroll > 0) {
    window.requestAnimationFrame(scrollUp);
    window.scrollTo(0, currentScroll - currentScroll / 10);
  }
}

window.onscroll = function () {
  var scroll = document.documentElement.scrollTop;

  if (scroll > 800) {
    buttonUp.style.transform = "scale(1)";
  } else {
    buttonUp.style.transform = "scale(0)";
  }
};
