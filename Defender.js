
const defender1 = new Image();
defender1.src = './img/plant.png'
const defender2 = new Image();
defender2.src = './img/peashooter.png'
const defender3 = new Image();
defender3.src = './img/cactus_idle.png'

const defenderStats = [];

const defenderStats1 = {
    maxFrame: 1,
    spriteWidth: 167,
    spriteHeight: 243,
    frameTimer: 30,
    shootFrame: 1,
    shootOffset: 45,
    power: 10,
    cost: 100,
    health: 100,
    image: defender1,
}
defenderStats.push(defenderStats1);

const defenderStats2 = {
    maxFrame: 2,
    spriteWidth: 96 / 3,
    spriteHeight: 31,
    frameTimer: 20,
    shootFrame: 1,
    shootOffset: 15,
    power: 20,
    cost: 150,
    health: 100,
    image: defender2,
}
defenderStats.push(defenderStats2);

const defenderStats3 = {
    maxFrame: 3,
    spriteWidth: 157 / 4,
    spriteHeight: 36,
    frameTimer: 15,
    shootFrame: 8,
    shootOffset: 0,
    power: 30,
    cost: 30,
    health: 100,
    image: defender3,
}
defenderStats.push(defenderStats3);

class Defender {
    constructor(x, y, chosenDefender) {
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.shooting = false;
        this.shootNow = false;
        this.projectiles = [];
        this.timer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.damaged = false;
        this.chosenDefender = chosenDefender;
        this.chosenDefenderIndex = chosenDefender - 1;
        this.maxFrame = defenderStats[this.chosenDefenderIndex].maxFrame;
        this.spriteWidth = defenderStats[this.chosenDefenderIndex].spriteWidth;
        this.spriteHeight = defenderStats[this.chosenDefenderIndex].spriteHeight;
        this.frameTimer = defenderStats[this.chosenDefenderIndex].frameTimer;
        this.shootFrame = defenderStats[this.chosenDefenderIndex].shootFrame;
        this.power = defenderStats[this.chosenDefenderIndex].power;
        this.cost = defenderStats[this.chosenDefenderIndex].cost;
        this.health = defenderStats[this.chosenDefenderIndex].health;
        this.shootOffset = defenderStats[this.chosenDefenderIndex].shootOffset;
        this.image = defenderStats[this.chosenDefenderIndex].image
    }
    draw() {
        ctx.fillStyle = 'gold';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    update() {
        if (frame % this.frameTimer === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            if (this.frameX === this.shootFrame) this.shootNow = true;
        }

        if (this.shooting && this.shootNow) {
            projectiles.push(new Projectile(this.x + 70, this.y + this.shootOffset, this.power, this.chosenDefender));
            this.shootNow = false;
        }
        else {
            this.timer = 0;
        }

        if (this.timeOut === 0) this.damaged = false;
        else if (this.timeOut > 0) {
            this.timeOut--;
        }
    }
}

function handleDefenders() {
    for (let i = 0; i < defenders.length; i++) {
        defenders[i].draw();
        defenders[i].update();
        if (enemyPositions.indexOf(defenders[i].y) !== -1) {
            defenders[i].shooting = true;
        }
        else {
            defenders[i].shooting = false;
        }
        for (let j = 0; j < enemies.length; j++) {
            if (defenders[i] && collision(defenders[i], enemies[j])) {
                if (defenders[i].chosenDefender === 3) {
                    enemies[j].timeOut = 120;
                    if (defenders[i].damaged === false) {
                        defenders[i].health -= 50;
                        enemies[j].health -= defenders[i].power;
                    }
                    defenders[i].timeOut = 60;
                    defenders[i].damaged = true;
                } else {
                    enemies[j].movement = 0;
                }
                defenders[i].health -= enemies[j].attack;
            } else enemies[j].movements = enemies[j].speed;
            if (defenders[i] && defenders[i].health <= 0) {
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed * enemies[j].enemyType.speedMult;
            }
        }
    }
}

const card1 = {
    x: 10,
    y: 10,
    width: 70,
    height: 85
}
const card2 = {
    x: 90,
    y: 10,
    width: 70,
    height: 85
}
const card3 = {
    x: 170,
    y: 10,
    width: 70,
    height: 85
}

function chooseDefender() {
    let card1stroke = 'black';
    let card2stroke = 'black';
    let card3stroke = 'black';
    if (collision(mouse, card1) && mouse.clicked) {
        chosenDefender = 1;
    } else if (collision(mouse, card2) && mouse.clicked) {
        chosenDefender = 2;
    } else if (collision(mouse, card3) && mouse.clicked) {
        chosenDefender = 3;
    }
    if (chosenDefender === 1) {
        card1stroke = 'gold';
        card2stroke = 'black';
        card3stroke = 'black';
    } else if (chosenDefender === 2) {
        card1stroke = 'black';
        card2stroke = 'gold';
        card3stroke = 'black';
    } else {
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'gold';
    }

    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    ctx.strokeStyle = card1stroke;
    ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
    ctx.drawImage(defender1, 0, 0, 167, 243, card1.x, card1.y, card1.width, card1.height);
    ctx.fillStyle = 'white';
    ctx.font = '12px Orbitron'
    ctx.fillText('100', card1.x + 2, card1.y + 10);

    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
    ctx.strokeStyle = card2stroke;
    ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
    ctx.drawImage(defender2, 0, 0, 96 / 3, 31, card2.x + 2, card2.y, card2.width, card2.height);
    ctx.fillStyle = 'white';
    ctx.fillText('150', card2.x + 2, card2.y + 10);

    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(card3.x, card3.y, card3.width, card3.height);
    ctx.strokeStyle = card3stroke;
    ctx.strokeRect(card3.x, card3.y, card3.width, card3.height);
    ctx.drawImage(defender3, 0, 0, 157 / 4, 36, card3.x + 2, card3.y, card3.width, card3.height);
    ctx.fillStyle = 'white';
    ctx.fillText('30', card3.x + 2, card3.y + 10);

}