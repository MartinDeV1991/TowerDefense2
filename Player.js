const card1 = {
    x: 10,
    y: 10,
    width: 60,
    height: 75
}
const card2 = {
    x: 80,
    y: 10,
    width: 60,
    height: 75
}
const card3 = {
    x: 150,
    y: 10,
    width: 60,
    height: 75
}
const card4 = {
    x: 220,
    y: 10,
    width: 60,
    height: 75
}

const card5 = {
    x: 10,
    y: 90,
    width: 60,
    height: 75
}

let timeOut = 0;
let level = 1;
let cardImage1;
let cardImage2;
let cardImage3;
let cardImage4;
let cardImage5;

const levelCard = {
    x: 800,
    y: 10,
    width: 100,
    height: 50
}

let cannonCost = 200;
let playerCannon = false;

function chooseUnit() {
    if (collision(mouse, levelCard) && mouse.clicked && exp >= 30) {
        level = 2;
        exp -= 30;
    }

    if (timeOut > 0) timeOut--;
    if (collision(mouse, card1) && mouse.clicked) {
        chosenUnit = 1 + (level - 1) * 4;
    } else if (collision(mouse, card2) && mouse.clicked) {
        chosenUnit = 2 + (level - 1) * 4;
    } else if (collision(mouse, card3) && mouse.clicked) {
        chosenUnit = 3 + (level - 1) * 4;
    } else if (collision(mouse, card4) && mouse.clicked) {
        chosenUnit = 4 + (level - 1) * 4;
    } else {
        chosenUnit = 0;
    }

    if (chosenUnit > 0 && timeOut === 0 && !gameOver) {
        if (defenders.length <= 10) {
            unitCost = unitStats[chosenUnit - 1].cost
            if (numberOfResources >= unitCost) {
                defenders.push(new Unit(playerBase.x, playerBase.y, chosenUnit, 'defender'));
                numberOfResources -= unitCost;
                floatingMessages.push(new FloatingMessage('-' + unitCost, playerBase.x + cellSize, playerBase.y + 20, 20, 'black'));
                floatingMessages.push(new FloatingMessage('-' + unitCost, 470, 85, 30, 'red'));
            } else {
                floatingMessages.push(new FloatingMessage('need more resources', mouse.x, mouse.y, 15, 'blue'))
            }
        } else {
            floatingMessages.push(new FloatingMessage('too many units', mouse.x, mouse.y, 15, 'blue'))
        }
        timeOut = 30;
    }
    if (!playerCannon && collision(mouse, card5) && mouse.clicked && numberOfResources >= cannonCost) {
        cannons.push(new Cannon(80, 430, 'right'));
        numberOfResources -= cannonCost;
        playerCannon = true;
        
    }


    unitType1 = unitStats[(level - 1) * 4 + 0];
    unitType2 = unitStats[(level - 1) * 4 + 1];
    unitType3 = unitStats[(level - 1) * 4 + 2];
    unitType4 = unitStats[(level - 1) * 4 + 3];

    cardImage1 = unitType1.image;
    cardImage2 = unitType2.image;
    cardImage3 = unitType3.image;
    cardImage4 = unitType4.image;
    cardImage5 = cannon;

    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
    ctx.fillRect(card3.x, card3.y, card3.width, card3.height);
    ctx.fillRect(card4.x, card4.y, card4.width, card4.height);
    ctx.fillRect(card5.x, card5.y, card5.width, card5.height);
    // ctx.fillRect(levelCard.x, levelCard.y, levelCard.width, levelCard.height);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
    ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
    ctx.strokeRect(card3.x, card3.y, card3.width, card3.height);
    ctx.strokeRect(card4.x, card4.y, card4.width, card4.height);
    ctx.strokeRect(card5.x, card5.y, card5.width, card5.height);
    // ctx.strokeRect(levelCard.x, levelCard.y, levelCard.width, levelCard.height);

    ctx.drawImage(cardImage1, 0, 0, unitType1.spriteWidth, unitType1.spriteHeight, card1.x, card1.y, card1.width, card1.height);
    ctx.drawImage(cardImage2, 0, 0, unitType2.spriteWidth, unitType2.spriteHeight, card2.x + 2, card2.y, card2.width, card2.height);
    ctx.drawImage(cardImage3, 0, 0, unitType3.spriteWidth, unitType3.spriteHeight, card3.x + 2, card3.y, card3.width, card3.height);
    ctx.drawImage(cardImage4, 0, 0, unitType4.spriteWidth, unitType4.spriteHeight, card4.x + 2, card4.y, card4.width, card4.height);
    ctx.drawImage(cardImage5, card5.x - 2, card5.y + 12, card5.width, card5.height / 1.5);

    ctx.fillStyle = 'white';
    ctx.font = '12px Orbitron'
    ctx.fillText(unitType1.cost, card1.x + 2, card1.y + 10);
    ctx.fillText(unitType2.cost, card2.x + 2, card2.y + 10);
    ctx.fillText(unitType3.cost, card3.x + 2, card3.y + 10);
    ctx.fillText(unitType4.cost, card4.x + 2, card4.y + 10);
    ctx.fillText(cannonCost, card5.x + 2, card5.y + 10);

    // ctx.fillStyle = 'blue';
    // ctx.font = '22px Orbitron'
    // ctx.fillText('Level', levelCard.x + 8, levelCard.y + 33);
}