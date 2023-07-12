class Unit {
    constructor(x, y, chosenUnit, type) {
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
        this.chosenUnit = chosenUnit;
        this.chosenUnitIndex = chosenUnit - 1;
        this.maxFrame = unitStats[this.chosenUnitIndex].maxFrame;
        this.spriteWidth = unitStats[this.chosenUnitIndex].spriteWidth;
        this.spriteHeight = unitStats[this.chosenUnitIndex].spriteHeight;
        this.frameTimer = unitStats[this.chosenUnitIndex].frameTimer;
        this.shootFrame = unitStats[this.chosenUnitIndex].shootFrame;
        this.power = unitStats[this.chosenUnitIndex].power;
        this.cost = unitStats[this.chosenUnitIndex].cost;
        this.value = unitStats[this.chosenUnitIndex].value;
        this.health = unitStats[this.chosenUnitIndex].health;
        this.startHealth = this.health;
        this.attackType = unitStats[this.chosenUnitIndex].attackType;

        this.image_walk = unitStats[this.chosenUnitIndex].image;
        this.image_attack = unitStats[this.chosenUnitIndex].image_attack;
        this.image_idle = unitStats[this.chosenUnitIndex].image_idle;
        this.image_walkL = unitStats[this.chosenUnitIndex].imageL;
        this.image_attackL = unitStats[this.chosenUnitIndex].image_attackL;
        this.image_idleL = unitStats[this.chosenUnitIndex].image_idleL;

        this.speed = unitStats[this.chosenUnitIndex].speed;
        this.hitFrame = unitStats[this.chosenUnitIndex].hitFrame;
        this.movement = this.speed
        this.type = type;
        this.collision = false;
        this.collisionOther = false;
        this.maxFrameAttack = unitStats[this.chosenUnitIndex].maxFrameAttack;
        this.spriteWidthAttack = unitStats[this.chosenUnitIndex].spriteWidthAttack;
        this.spriteHeightAttack = unitStats[this.chosenUnitIndex].spriteHeightAttack;
        this.maxFrameIdle = unitStats[this.chosenUnitIndex].maxFrameIdle;
        this.spriteWidthIdle = unitStats[this.chosenUnitIndex].spriteWidthIdle;
        this.spriteHeightIdle = unitStats[this.chosenUnitIndex].spriteHeightIdle;
        this.shoot = false;
        this.state = 'walking';
        this.attackNow = false;
        this.slow = false;

        this.fighting = false;
        if (chosenUnit === 1) this.scale = 2;
        else this.scale = 1;
    }
    draw() {
        if (this.type === 'defender') {
            this.image_attack1 = this.image_attack;
            this.image_walk1 = this.image_walk;
            this.image_idle1 = this.image_idle;
        }
        else {
            this.image_attack1 = this.image_attackL;
            this.image_walk1 = this.image_walkL;
            this.image_idle1 = this.image_idleL;
        }
        if (this.collisionOther || this.shoot) {
            ctx.drawImage(this.image_attack1, this.frameX * this.spriteWidthAttack, 0, this.spriteWidthAttack, this.spriteHeightAttack, this.x, this.y, this.width, this.height)
        } else if (this.collision) {
            ctx.drawImage(this.image_idle1, this.frameX * this.spriteWidthIdle, 0, this.spriteWidthIdle, this.spriteHeightIdle, this.x, this.y, this.width, this.height)
        } else {
            ctx.drawImage(this.image_walk1, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }

        // health bar
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x + this.width * 0.25, this.y - 15, this.width * 0.5, 10)

        if (this.type === 'defender') {
            ctx.fillStyle = 'green'
        } else {
            ctx.fillStyle = 'cyan'
        }
        ctx.fillRect(this.x + this.width * 0.25, this.y - 15, this.width * 0.5 * this.health / this.startHealth, 10)
    }
    update() {
        if (this.collisionOther || this.shoot) {
            if (this.fighting === false) {
                this.frameX = 0;
            }
            this.fighting = true;
            if (frame % this.frameTimer === 0) this.frameX++;
            if (this.frameX > this.maxFrameAttack) this.frameX = this.minFrame;

        } else if (this.collision) {
            if (this.fighting === true) {
                this.frameX = 0;
            }
            this.fighting = false;
            if (frame % this.frameTimer === 0) this.frameX++;
            if (this.frameX > this.maxFrameIdle) this.frameX = this.minFrame;
        } else {
            if (this.fighting === true) {
                this.frameX = 0;
            }
            this.fighting = false;
            if (frame % this.frameTimer === 0) this.frameX++;
            if (this.frameX > this.maxFrame) this.frameX = this.minFrame;
        }

        if (this.type === 'defender') {
            if (!this.collision && !this.collisionOther) {
                if (this.slow && this.movement > 1) {
                    this.x += this.movement * 0.49;
                } else {
                    this.x += this.movement;
                }
            }
        } else if (this.type === 'enemy') {
            if (!this.collision && !this.collisionOther) {
                if (this.slow && this.movement > 1) {
                    this.x -= this.movement * 0.49;
                }
                else {
                    this.x -= this.movement;
                }
            }
        }

        if (this.frameX === this.hitFrame && frame % this.frameTimer === 0) {
            this.attackNow = true;
        } else {
            this.attackNow = false;
        }

        if (this.shoot && this.attackNow) {
            if (this.type === 'defender') {
                projectiles.push(new Projectile(this.x + 30, this.y + 25, this.power, this.type));
            } else if (this.type === 'enemy') {
                projectiles.push(new Projectile(this.x + 30, this.y + 25, this.power, this.type));
            }
            this.shoot = false;
        }
        this.collision = false;
        this.collisionOther = false;
        this.slow = false;
    }
}

function handleCollisions() {
    for (let i = 0; i < defenders.length; i++) {
        // collision defender-enemyBase
        if (collision(defenders[i], enemyBase)) {
            defenders[i].collisionOther = true;
            if (defenders[i].attackNow && defenders[i].attackType != 'range') {
                enemyBase.health -= defenders[i].power;
            }
        }
        // collision defender-defender
        for (let j = i + 1; j < defenders.length; j++) {
            if (collision(defenders[i], defenders[j])) {
                defenders[j].collision = true;
            }
            if (collisionRange(defenders[i], defenders[j], 100)) {
                defenders[j].slow = true;
            }
        }
        // collision enemyBase in range
        if (defenders[i].attackType === 'range' && collisionRange(defenders[i], enemyBase, 300)) {
            defenders[i].shoot = true;
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        // collision enemy-playerBase
        if (collision(enemies[i], playerBase)) {
            enemies[i].collisionOther = true;
            if (enemies[i].attackNow && enemies[i].attackType != 'range') {
                playerBase.health -= enemies[i].power;
            }
        }
        // collision enemy-enemy
        for (let j = i + 1; j < enemies.length; j++) {
            if (collision(enemies[i], enemies[j])) {
                enemies[j].collision = true;
            }
            if (collisionRange(enemies[i], enemies[j], 100)) {
                enemies[j].slow = true;
            }
        }
        // collision playerBase in range
        if (enemies[i].attackType === 'range' && collisionRange(enemies[i], playerBase, 300)) {
            enemies[i].shoot = true;
        }
    }

    // collisions between player and enemy
    for (let i = 0; i < defenders.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (collision(defenders[i], enemies[j])) {
                enemies[j].collisionOther = true;
                defenders[i].collisionOther = true;

                if (enemies[j].attackNow) {
                    if (enemies[j].attackType != 'range') {
                        defenders[i].health -= enemies[j].power;
                    }
                }
                if (defenders[i].attackNow) {
                    if (defenders[i].attackType != 'range') {
                        enemies[j].health -= defenders[i].power;
                    }
                }
            }

            if (defenders[i].attackType === 'range' && (collisionRange(defenders[i], enemies[j], 300))) {
                defenders[i].shoot = true;
            }
            if (enemies[j].attackType === 'range' && (collisionRange(enemies[j], defenders[i], 300))) {
                enemies[j].shoot = true;
            }
        }
    }
    cleanUpUnits();
}

function cleanUpUnits() {
    for (let i = 0; i < defenders.length; i++) {
        if (defenders[i] && defenders[i].health <= 0) {
            defenders.splice(i, 1);
            i--;
        }
    }
    for (let j = 0; j < enemies.length; j++) {
        if (enemies[j] && enemies[j].health <= 0) {
            numberOfResources += enemies[j].value;
            exp += enemies[j].value;
            enemies.splice(j, 1);
            j--;
        }

    }
}

function handleUnits() {
    for (let i = 0; i < defenders.length; i++) {
        defenders[i].draw();
        defenders[i].update();
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        enemies[i].update();

    }
}

