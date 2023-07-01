const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;

let numberOfResources = 300;
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
let score = 0;
const winningScore = 2000;
let chosenDefender = 1;
let defenderCost = 0;

let gameGrid = [];
let defenders = [];
let enemies = [];
let enemyPositions = [];
let projectiles = [];
let resources = [];

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
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw() {
        if (mouse.x && mouse.y && collision(this, mouse)) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}
function createGrid() {
    for (let y = cellSize; y < canvas.height; y += cellSize) {
        for (let x = cellSize; x < canvas.width; x += cellSize) {
            gameGrid.push(new Cell(x, y));
        }
    }
}
function handleGameGrid() {
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw();
    }
}

const background = new Image();
background.src = './img/background.jpg'

createGrid();

let restartTimer = 20;
let restartCount = 0

function animate() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
        ctx.drawImage(background, 350, 0, 700, 600, 0, 0, canvas.width, canvas.height)


        handleGameGrid();
        handleDefenders();
        handleResources();
        handleProjectiles();
        chooseDefender();
        handleEnemies();
        handleGameStatus();
        handleFloatingMessages()
        frame++;
    }

    if (collision(mouse, restartButton) && mouse.clicked && restartCount > restartTimer) {
        restart();
        restartCount = 0;
    }
    restartCount++;
    requestAnimationFrame(animate);
}
animate(0);

function collision(first, second) {
    if (!(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)) {
        return true;
    }
}

function restart() {
    numberOfResources = 300;
    enemiesInterval = 600;
    frame = 0;
    gameOver = false;
    score = 0;
    chosenDefender = 1;
    defenders = [];
    enemies = [];
    enemyPositions = [];
    projectiles = [];
    resources = [];
}


canvas.addEventListener('click', function () {
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    if (gridPositionY < cellSize) return;
    if (gridPositionX < cellSize) return;
    for (let i = 0; i < defenders.length; i++) {
        if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) {
            return;
        }
    }
    if (chosenDefender === 1) {
        defenderCost = 100;
    } else if (chosenDefender === 2) {
        defenderCost = 150;
    } else if (chosenDefender === 3) {
        defenderCost = 30;
    }

    if (numberOfResources >= defenderCost) {
        defenders.push(new Defender(gridPositionX, gridPositionY, chosenDefender));
        numberOfResources -= defenderCost;
        floatingMessages.push(new FloatingMessage('-' + defenderCost, gridPositionX + cellSize, gridPositionY + 20, 20, 'black'));
        floatingMessages.push(new FloatingMessage('-' + defenderCost, 470, 85, 30, 'red'));
    } else {
        floatingMessages.push(new FloatingMessage('need more resources', mouse.x, mouse.y, 15, 'blue'))
    }
});

canvas.addEventListener('mousedown', function () {
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

