const { update } = require("three/examples/jsm/libs/tween.module.js");

//Hamburger menu
let menuIcon = document.getElementsByTagName("svg")[1];
let menu = document.getElementsByClassName("menu")[0];

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    menu.classList.toggle("open");
}

//Buy section
document.getElementsByClassName('.btn').forEach(button => {
    button.addEventListener('click', function() {
        document.getElementsByClassName('.airpod-img').forEach(img => {
            img.style.opacity = 0;
        });

        const color = this.getAttribute('data-color');
        document.getElementsByClassName(`.${color}`).style.opacity = 1;
    });
});

// id: "comfort",
// position: { x: 6, y: 0.8, z: -50 },
// rotation: { x: 0, y: -0.1, z: -6.5 }