const SPOKE_INTERVAL = 1400;
const SPOKE_LIFETIME = 17000;

let stage;
document.addEventListener('DOMContentLoaded', function () {
    stage = document.getElementById('stage');
    createSpoke();
    mainLoop();
});

const sourceImages = ['images/spoke_big_01.png', 'images/spoke_big_02.png'];

const spokes = [];
const startTime = Date.now();
let lastSpokeCreated = 0;
function mainLoop() {
    const timeSinceLastSpoke = Date.now() - lastSpokeCreated;
    if (timeSinceLastSpoke > SPOKE_INTERVAL) {
        createSpoke();
    }
    requestAnimationFrame(mainLoop);
}

function createSpoke() {
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
        stage.prepend(image);
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

    lastSpokeCreated = Date.now();
}
