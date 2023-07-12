let enemyCannon = false;
let cannonSpawnRate = 0.999;

function handleEnemies() {
    
    if (frame % (enemiesInterval) === 0 && enemies.length <= 10 && !gameOver) {
        // unitType = 5
        unitType = Math.floor(Math.random() * 4 + 1);
        enemies.push(new Unit(enemyBase.x, enemyBase.y, unitType + (level - 1) * 4, 'enemy'));
        enemyPositions.push(enemyBase.y);
    }

    if (!enemyCannon && Math.random() > cannonSpawnRate) {
        cannons.push(new Cannon(1060, 430, 'left'));
        enemyCannon = true;
    }


}