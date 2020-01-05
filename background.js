const body = document.querySelector('body');
const IMG_NUMBER = 3;

function drawBackground(random_num) {
    const img = new Image();
    img.src = `images/ ${random_num}.jpg`
    img.classList.add('background');
    body.prepend(img);
}

function genRandomNum() {
    return Math.floor(Math.random() * IMG_NUMBER);
}

function init() {
    const random_num = genRandomNum();
    drawBackground(random_num);
}

init();