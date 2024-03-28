console.log('Hello');

const SPOKE_INTERVAL = 1000;
const SPOKE_LIFETIME = 17000;

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

const sourceImages = ['images/spoke_big_01.png', 'images/spoke_big_02.png'];

const spokes = [];
const startTime = Date.now();
let lastSpokeCreated = 0;
function mainLoop() {
    const timeSinceLastSpoke = Date.now() - lastSpokeCreated;
    // console.log(timeSinceLastSpoke);
    if (timeSinceLastSpoke > SPOKE_INTERVAL) {
        createSpoke();
    }
    requestAnimationFrame(mainLoop);
}

function createSpoke() {
    console.log('createSpoke');
    const image = new Image();
    const imageIndex = Math.floor(Math.random() * sourceImages.length);
    image.src = sourceImages[imageIndex];

    const rotate = Math.random() * 360;
    image.style.rotate = `${rotate}deg`;
    image.onload = function () {
        const spoke = {
            image,
            createdAt: Date.now(),
        };
        document.body.prepend(image);
        image.className = 'spokeImage';
        spokes.push(spoke);
        console.log(spoke);
    };

    // trim completed spokes
    for (let i = 0; i < spokes.length; i++) {
        const spoke = spokes[i];
        const age = Date.now() - spoke.createdAt;
        if (age > SPOKE_LIFETIME) {
            console.log('removing spoke with age', age);
            spokes.splice(i, 1);
            i--;
        }
    }

    // z-sorting
    // spokes.forEach((s, i) => {
    //     debugger;
    //     s.image.style.zIndex = spokes.length - i;
    // });

    lastSpokeCreated = Date.now();
}

// function drawScene() {
//     // console.log('drawScene', spokes.length);
//     let ctx = canvas.getContext('2d');

//     // ctx.fillStyle = 'white';
//     // ctx.fillRect(0, 0, 100, 100);
//     spokes.forEach(spoke => {
//         const width = spoke.image.naturalWidth * spoke.scale;
//         const height = spoke.image.naturalHeight * spoke.scale;
//         // console.log('width', width, 'height', height);
//         ctx.drawImage(spoke.image, 0, 0, width, height);
//         // ctx.drawImage(spoke.image, 0, 0);
//     });
// }
