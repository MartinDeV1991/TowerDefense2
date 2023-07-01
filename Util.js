// Floating Messages
const floatingMessages = [];
class FloatingMessage {
    constructor(value, x, y, size, color) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.color = color;
        this.opacity = 1;
    }
    update() {
        this.y -= 0.3;
        this.lifeSPan += 1;
        if (this.opacity > 0.03) this.opacity -= 0.03;
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = this.size + 'px Orbitron';
        ctx.fillText(this.value, this.x, this.y);
        ctx.globalAlpha = 1;
    }
}
function handleFloatingMessages() {
    for (let i = 0; i < floatingMessages.length; i++) {
        floatingMessages[i].update();
        floatingMessages[i].draw();
        if (floatingMessages[i].lifeSpan >= 50) {
            floatingMessages.splice(i, 1);
            i--;
        }
    }
}

const restartButton = {
    x: 900 - 130,
    y: 10,
    width: 100,
    height: 50
}

// utilities
function handleGameStatus() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    ctx.fillText('Resources: ' + numberOfResources, 300, 80);
    ctx.fillText('Score: ' + score, 300, 40);
    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '60px Orbitron';
        ctx.fillText('Game Over', 170, 330);
    }
    if (score > winningScore && enemies.length === 0) {
        ctx.fillStyle = 'white';
        ctx.font = '60px Orbitron';
        ctx.fillText('LEVEL COMPLETE', 130, 300);
        ctx.font = '30px Orbitron';
        ctx.fillText('You win with ' + score + ' points!', 170, 340);
    }

    let restartButtonStroke = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.2';
    ctx.fillRect(restartButton.x, restartButton.y, restartButton.width, restartButton.height);
    ctx.strokeStyle = restartButtonStroke;
    ctx.strokeRect(restartButton.x, restartButton.y, restartButton.width, restartButton.height);
    ctx.fillStyle = 'rgba(4,41,117,1';
    ctx.font = '22px Orbitron';
    ctx.fillText('restart', restartButton.x + 8, restartButton.y + 33);
}
