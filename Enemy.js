
const enemyTypes = [];

const zombie1 = {
    width: 1404,
    height: 392,
    nFrames: 6,
    src: './img/Zombie1_walk.png',
    speedMult: 1,
    attack: 0.2,
    health: 100,
    resources: 10
}
enemyTypes.push(zombie1);

const zombie2 = {
    width: 1212,
    height: 380,
    nFrames: 6,
    src: './img/Zombie2_walk.png',
    speedMult: 1,
    attack: 0.2,
    health: 100,
    resources: 10
}
enemyTypes.push(zombie2);

const zombie3 = {
    width: 1548,
    height: 433,
    nFrames: 6,
    src: './img/Zombie3_walk.png',
    speedMult: 1,
    attack: 0.2,
    health: 100,
    resources: 10
}
enemyTypes.push(zombie3);

const zombie4 = {
    width: 1464,
    height: 426,
    nFrames: 6,
    src: './img/Zombie4_walk.png',
    speedMult: 1,
    attack: 0.2,
    health: 100,
    resources: 10
}
enemyTypes.push(zombie4);

const zombie1run = {
    width: 6062,
    height: 388,
    nFrames: 14,
    src: './img/Zombie1_run.png',
    speedMult: 8,
    attack: 0.5,
    health: 120,
    resources: 50
}
enemyTypes.push(zombie1run);

const zombie1sprint = {
    width: 2598,
    height: 384,
    nFrames: 6,
    src: './img/Zombie1_sprint.png',
    speedMult: 6,
    attack: 0.4,
    health: 60,
    resources: 30
}
enemyTypes.push(zombie1sprint);

class Enemy {
    constructor(verticalPosition, type) {
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.2 + 0.4;
        this.enemyType = enemyTypes[type];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.image = new Image;
        this.image.src = this.enemyType.src;
        this.maxFrame = this.enemyType.nFrames - 1;
        this.spriteWidth = this.enemyType.width / this.enemyType.nFrames;
        this.spriteHeight = this.enemyType.height;
        this.speedX = this.speed * this.enemyType.speedMult;
        this.movement = this.speedX;
        this.attack = this.enemyType.attack;
        this.health = this.enemyType.health;
        this.maxHealth = this.health;
        this.resources = this.enemyType.resources;
        this.timeOut = 0;
        this.push = 0
    }
    update() {
        if (this.timeOut === 0) {
            this.x -= this.movement;
        }
        if (this.timeOut > 0) {
            this.timeOut--;
            this.push = this.timeOut / 60;
            this.x += this.push;
        }
        if (this.enemyType === zombie1run) {
            if (frame % 10 === 0) {
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = this.minFrame;
                if (this.frameX >= 7) this.movement = this.speedX;
                else this.movement = 0;
            }
        }
        else {
            if (frame % 10 === 0) {
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = this.minFrame;
            }
        }
    }
    draw() {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
function handleEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw();
        if (enemies[i].x < cellSize) {
            gameOver = true;
        }
        if (enemies[i].health <= 0) {
            let gainedResources = enemies[i].resources;
            floatingMessages.push(new FloatingMessage('+' + gainedResources, enemies[i].x, enemies[i].y, 30, 'black'));
            floatingMessages.push(new FloatingMessage('+' + gainedResources, 470, 85, 30, 'gold'));
            numberOfResources += gainedResources;
            score += gainedResources;
            const findThisIndex = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(findThisIndex, 1);
            enemies.splice(i, 1);
            i--;
        }
    }
    if (frame % enemiesInterval === 0 && score < winningScore) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;

        let number = Math.random() * 700;
        if (score < number) {
            type = Math.floor(Math.random() * (enemyTypes.length - 2))
        } else {
            type = Math.floor(Math.random() * 2 + (enemyTypes.length - 2))
        }
        enemies.push(new Enemy(verticalPosition, type));
        enemyPositions.push(verticalPosition);
        if (enemiesInterval > 150) enemiesInterval -= 30;
    }
}