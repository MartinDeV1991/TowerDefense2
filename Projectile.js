// projectiles
const magic = new Image();
magic.src = './img/Magic_Attack8.png'

class Projectile {
    constructor(x, y, power, type, speedY = 0) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 40;
        this.power = power;
        this.speed = 5;
        this.type = type;
        if (this.type === 'defender') {
            this.direction = 1;
        } else {
            this.direction = -1;
        }
        this.speedY = speedY;
    }
    update() {
        this.x += this.speed * this.direction;
        this.y += this.speedY;

    }
    draw() {
        ctx.drawImage(magic, this.x, this.y, this.width * 2, this.height);
    }
}
function handleProjectiles() {
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
        projectiles[i].draw();

        if (projectiles[i].type === 'defender') {
            for (let j = 0; j < enemies.length; j++) {
                if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])) {
                    enemies[j].health -= projectiles[i].power;
                    projectiles.splice(i, 1);
                    i--;
                }
            }
            if (projectiles[i] && collision(projectiles[i], enemyBase)) {
                enemyBase.health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        } else if (projectiles[i].type === 'enemy') {
            for (let j = 0; j < defenders.length; j++) {
                if (defenders[j] && projectiles[i] && collision(projectiles[i], defenders[j])) {
                    defenders[j].health -= projectiles[i].power;
                    projectiles.splice(i, 1);
                    i--;
                }
            }
            if (projectiles[i] && collision(projectiles[i], playerBase)) {
                playerBase.health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        }
        if (projectiles[i] && (projectiles[i].x > canvas.width + cellSize || projectiles[i].x < 0 || projectiles[i].y > canvas.height -50)) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}