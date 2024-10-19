//Hamburger menu
let menuIcon = document.getElementsByTagName("svg")[1];
let menu = document.getElementsByClassName("menu")[0];

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    menu.classList.toggle("open");
}

//Buy section
let selectedColor = null;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.airpod-img').forEach(img => {
            img.style.opacity = '0';
        });

        const color = this.getAttribute('data-color');
        selectedColor = color;

        const selectedImg = document.querySelector(`.airpod-img.${color}`);
        if (selectedImg) {
            selectedImg.style.opacity = '1';
        }
    });
});

document.querySelector('.addBtn').addEventListener('click', function () {
    if (!selectedColor) {
        alert("Please select a color before adding to bag.");
        return;
    }

    const event = new CustomEvent('addToBag', { detail: { color: selectedColor } });
    window.dispatchEvent(event);
});

//Footer links 
document.querySelectorAll('.linkSection h6').forEach((h6) => {
    h6.addEventListener('click', function () {
      this.parentElement.classList.toggle('active');
    });
  });
