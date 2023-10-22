var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.logo-principal').appendChild(renderer.domElement);

var geometry = new THREE.PlaneGeometry(1.1, 0.4);
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load("src/img/logo.png");
var material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
  alphaTest: 0.5,
  side: THREE.DoubleSide,
});

var plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 2;

function onWindowResize() {
  var aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  var planeAspect = 1.1 / 0.4;
  plane.scale.set(
    aspect > planeAspect ? aspect / planeAspect : 1,
    aspect < planeAspect ? 1 / (aspect / planeAspect) : 1,
    1
  );
}

window.addEventListener("resize", onWindowResize, false);

function render() {
  plane.rotation.y += 0.02;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();


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
    x: "-100%",
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
  gsap.set(menuSection, { x: "-100%", opacity: 1 });
  gsap.to(menuSection, {
    x: "0%",
    opacity: 1,
    duration: 0.8,
    onStart: function () {
      menuSection.classList.add("visible");
    },
  });
}

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".imagen-final",
      start: "-200% top",
      end: "200% top",
      scrub: true,
      markers: false,
      toggleActions: "reverse play reverse play",
    },
  })
  .to(".imagen-final", {
    xPercent: -200,
    duration: 0.5,
  });



var buttonUp = document.getElementById("button-up");
buttonUp.style.transform = "scale(0)";

document.getElementById("button-up").addEventListener("click", function () {
  scrollUp();
});

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
