console.log('Hello');

let canvas;

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('mainCanvas');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // let ctx = canvas.getContext("2d");
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    createSpoke();
    // setInterval(drawScene, 1000 / 60);
    mainLoop();
});

function mainLoop() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawScene();
    requestAnimationFrame(mainLoop);
}

const spokes = [];

function createSpoke() {
    const image = new Image();
    image.src = 'images/spoke01.png';
    image.onload = function () {
        console.log('image loaded');
        const initialScaleX = window.innerWidth / image.naturalWidth; // / window.innerWidth;
        const initialScaleY = window.innerHeight / image.naturalHeight; // / window.innerHeight;
        const initialScale = Math.min(initialScaleX, initialScaleY);

        const spoke = {
            image,
            initialScale,
            scale: initialScale,
        };
        spokes.push(spoke);
        console.log(spoke);
    };
}

function drawScene() {
    console.log('drawScene', spokes.length);
    let ctx = canvas.getContext('2d');

    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, 100, 100);
    spokes.forEach(spoke => {
        const width = spoke.image.naturalWidth * spoke.scale;
        const height = spoke.image.naturalHeight * spoke.scale;
        // console.log('width', width, 'height', height);
        ctx.drawImage(spoke.image, 0, 0, width, height);
        // ctx.drawImage(spoke.image, 0, 0);
    });
}
