
const cannonR = new Image();
cannonR.src = './img/cannon_R.png'
const cannonL = new Image();
cannonL.src = './img/cannon_L.png'
const cannon = new Image();
cannon.src = './img/cannon.png'


const troll_walk_L = new Image();
troll_walk_L.src = './img/troll_walk_L.png'
const troll_walk_R = new Image();
troll_walk_R.src = './img/troll_walk_R.png'
const troll_attack_L = new Image();
troll_attack_L.src = './img/troll_attack_L.png'
const troll_attack_R = new Image();
troll_attack_R.src = './img/troll_attack_R.png'
const troll_idle_L = new Image();
troll_idle_L.src = './img/troll_idle_L.png'
const troll_idle_R = new Image();
troll_idle_R.src = './img/troll_idle_R.png'

const orc_walk_L = new Image();
orc_walk_L.src = './img/orc_walk_L.png'
const orc_walk_R = new Image();
orc_walk_R.src = './img/orc_walk_R.png'
const orc_attack_L = new Image();
orc_attack_L.src = './img/orc_attack_L.png'
const orc_attack_R = new Image();
orc_attack_R.src = './img/orc_attack_R.png'
const orc_idle_L = new Image();
orc_idle_L.src = './img/orc_idle_L.png'
const orc_idle_R = new Image();
orc_idle_R.src = './img/orc_idle_R.png'

const shaman_walk_L = new Image();
shaman_walk_L.src = './img/shaman_walk_L.png'
const shaman_walk_R = new Image();
shaman_walk_R.src = './img/shaman_walk_R.png'
const shaman_attack_L = new Image();
shaman_attack_L.src = './img/shaman_attack_L.png'
const shaman_attack_R = new Image();
shaman_attack_R.src = './img/shaman_attack_R.png'
const shaman_idle_L = new Image();
shaman_idle_L.src = './img/shaman_idle_L.png'
const shaman_idle_R = new Image();
shaman_idle_R.src = './img/shaman_idle_R.png'


const djinn_fly_L = new Image();
djinn_fly_L.src = './img/djinn_fly_L.png'
const djinn_attack_L = new Image();
djinn_attack_L.src = './img/djinn_attack_L.png'
const djinn_idle_L = new Image();
djinn_idle_L.src = './img/djinn_idle_L.png'
const djinn_fly_R = new Image();
djinn_fly_R.src = './img/djinn_fly_R.png'
const djinn_attack_R = new Image();
djinn_attack_R.src = './img/djinn_attack_R.png'
const djinn_idle_R = new Image();
djinn_idle_R.src = './img/djinn_idle_R.png'

const magic_attack_R = new Image();
magic_attack_R.src = './img/magic_2.png'

const unitStats = [];

const unitStats1 = {
    maxFrame: 9,
    spriteWidth: 800,
    spriteHeight: 820,
    frameTimer: 5,
    hitFrame: 7,
    power: 200,
    speed: 1,
    cost: 50,
    value: 50,
    health: 2000,
    image: troll_walk_R,
    image_attack: troll_attack_R,
    image_idle: troll_idle_R,
    imageL: troll_walk_L,
    image_attackL: troll_attack_L,
    image_idleL: troll_idle_L,
    spriteWidthAttack: 1000,
    spriteHeightAttack: 820,
    maxFrameAttack: 9,
    spriteWidthIdle: 750,
    spriteHeightIdle: 820,
    maxFrameIdle: 9,
    attackType: 'melee',
}

const unitStats2 = {
    maxFrame: 6,
    spriteWidth: 672/7,
    spriteHeight: 96,
    frameTimer: 5,
    hitFrame: 3,
    power: 200,
    speed: 2,
    cost: 40,
    value: 40,
    health: 700,
    image: orc_walk_R,
    image_attack: orc_attack_R,
    image_idle: orc_idle_R,
    imageL: orc_walk_L,
    image_attackL: orc_attack_L,
    image_idleL: orc_idle_L,
    spriteWidthAttack: 384/4,
    spriteHeightAttack: 96,
    maxFrameAttack: 3,
    spriteWidthIdle: 480/5,
    spriteHeightIdle: 96,
    maxFrameIdle: 4,
    attackType: 'melee',
}

const unitStats3 = {
    maxFrame: 6,
    spriteWidth: 672/7,
    spriteHeight: 96,
    frameTimer: 5,
    hitFrame: 3,
    power: 400,
    speed: 1,
    cost: 50,
    value: 50,
    health: 500,
    image: shaman_walk_R,
    image_attack: shaman_attack_R,
    image_idle: shaman_idle_R,
    imageL: shaman_walk_L,
    image_attackL: shaman_attack_L,
    image_idleL: shaman_idle_L,
    spriteWidthAttack: 576/6,
    spriteHeightAttack: 96,
    maxFrameAttack: 5,
    spriteWidthIdle: 480/5,
    spriteHeightIdle: 96,
    maxFrameIdle: 4,
    attackType: 'melee',
}

const unitStats4 = {
    maxFrame: 3,
    spriteWidth: 512/4,
    spriteHeight: 128,
    frameTimer: 15,
    hitFrame: 3,
    power: 100,
    speed: 1,
    cost: 100,
    value: 100,
    health: 500,
    image: djinn_fly_R,
    image_attack: djinn_attack_R,
    image_idle: djinn_idle_R,
    imageL: djinn_fly_L,
    image_attackL: djinn_attack_L,
    image_idleL: djinn_idle_L,
    spriteWidthAttack: 512/4,
    spriteHeightAttack: 128,
    maxFrameAttack: 3,
    spriteWidthIdle: 384/3,
    spriteHeightIdle: 128,
    maxFrameIdle: 2,
    attackType: 'range',
}

unitStats.push(unitStats1);
unitStats.push(unitStats2);
unitStats.push(unitStats3);
unitStats.push(unitStats4);