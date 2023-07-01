// projectiles
const pea = new Image();
pea.src = './img/pea.png'

class Projectile {
    constructor(x, y, power, chosenDefender) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 20;
        this.power = power;
        this.speed = 5;
        this.chosenDefender = chosenDefender
    }
    update() {
        this.x += this.speed;
    }
    draw() {
        if (this.chosenDefender === 1) {
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.drawImage(pea, this.x, this.y, this.width * 2, this.height);
        }
    }
}
function handleProjectiles() {
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
        projectiles[i].draw();
        for (let j = 0; j < enemies.length; j++) {
            if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])) {
                enemies[j].health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        }

        if (projectiles[i] && projectiles[i].x > canvas.width + cellSize) {
            projectiles.splice(i, 1);
            i--;
        }
    }
}