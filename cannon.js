
cannonType = 0;

class Cannon {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.power = 100;
        this.cost = 10;
        this.direction = direction;
    }

    draw() {
        if (this.direction === 'left') {
            ctx.drawImage(cannonL, this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(cannonR, this.x, this.y, this.width, this.height);
        }
    }
    shoot() {
        if (this.direction === 'right') {
            if (enemies.length > 0 && Math.abs(enemies[0].x - this.x) < 500) {
                projectiles.push(new Projectile(this.x + 28, this.y + 7, this.power, 'defender', 1));
            }
        } else if (this.direction === 'left') {
            if (defenders.length > 0 && Math.abs(defenders[0].x - this.x) < 500) {
                projectiles.push(new Projectile(this.x, this.y + 7, this.power, 'enemy', 1));
            }
        }
    }

}

function handleCannons() {
    if (cannons.length > 0) {
        for (let i = 0; i < cannons.length; i++) {
            cannons[i].draw();
            if (frame % 100 === 0) {
                cannons[i].shoot();
            }
        }
    }
}

let cannons = [];