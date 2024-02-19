const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 600;

let beat = new Audio();
beat.src = './AgeOfWar2.mp3';
beat.volume = 0.01;

// global variables
const cellSize = 80;
const cellGap = 3;

let numberOfResources = 300;
let enemiesInterval = 400;
let frame = 0;
let gameOver = false;
let exp = 0;
let chosenUnit = 1;
let unitCost = 0;

let gameGrid = [];
let defenders = [];
let enemies = [];
let enemyPositions = [];
let projectiles = [];
let resources = [];

let playing = false;
let firstFrame = true;

// mouse
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
    clicked: false
}

// game board
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}
class Base {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.health = 10000;
        this.startHealth = this.health;
    }
}

const playerBaseX = 0;
const playerBaseY = canvas.height - 110;
const playerBase = new Base(playerBaseX + cellSize, playerBaseY)

const enemyBaseX = canvas.width - cellSize;
const enemyBaseY = canvas.height - 110;
const enemyBase = new Base(enemyBaseX - cellSize, enemyBaseY)

const background = new Image();
background.src = './img/AgeOfWarBackground.png'

let restartTimer = 20;
let restartCount = 0;

function animate() {
    if (!gameOver) {
        requestAnimationFrame(animate);
        if (!playing && !firstFrame) return;
        else firstFrame = false;
        

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        handleCannons();
        chooseUnit();
        handleUnits();
        handleEnemies();
        handleCollisions();
        handleProjectiles();
        handleGameStatus();
        handleFloatingMessages()
        frame++;
    }

    if (collision(mouse, restartButton) && mouse.clicked && restartCount > restartTimer) {
        restart();
        restartCount = 0;
    }
    restartCount++;
}
window.addEventListener('load', function () {
    animate(0);
});

function collision(first, second) {
    if (!(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)) {
        return true;
    }
}

function collisionRange(first, second, range) {
    if (Math.abs(first.x - second.x) < range) {
        return true;
    }
}


function restart() {
    numberOfResources = 300;
    enemiesInterval = 600;
    frame = 0;
    gameOver = false;
    exp = 0;
    level = 1;
    chosenUnit = 1;
    defenders = [];
    enemies = [];
    enemyPositions = [];
    projectiles = [];
    resources = [];
    cannons = [];
    enemyCannon = false;
    playerCannon = false;
    enemyBase.health = enemyBase.startHealth;
    playerBase.health = playerBase.startHealth;
}

window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'p') playing = !playing;
    else {
        playing = true;
    }
});

canvas.addEventListener('mousedown', function () {
    playing = true;
    mouse.clicked = true;
})
canvas.addEventListener('mouseup', function () {
    mouse.clicked = false;
})

let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function () {
    mouse.x = undefined;
    mouse.y = undefined;
})

window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
})

let volume = document.getElementById('volume-slider');
volume.addEventListener("change", function (e) {
    beat.volume = e.currentTarget.value / 100;
    beat.play()
})