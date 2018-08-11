import Enemy from "./enemy";

class EnemyManager {

    constructor(player, scene, wave) {
        this.player = player;
        this.scene = scene;
        this.nrOfEnemies = 1 + wave;
        this.enemiesCreated = 0;
        this.totalEnemies = 10 + (5 * wave);

        this.enemies = [];
        this.enemyIndex = 0;
        this.activeEnemies = 0;

        this.enemyGroup = this.scene.add.group();

        this.scene.physics.add.overlap(this.enemyGroup, this.player.bullets, this.enemyHit, null, this);
    }

    update(delta, time) {
      for(let enemy of this.enemyGroup.children.entries) {
        enemy.update(delta, time);
      }
    }

    generateEnemy() {
        if (this.enemyGroup.children.entries.length < this.nrOfEnemies && this.totalEnemies > this.enemiesCreated) {
            let pos = this.getRandPosition();
            this.enemyGroup.add(new Enemy(this.player, this.scene, pos[0], pos[1]).setScale(2), true);
            this.enemiesCreated++;
        }
    }

    enemyHit(enemy, bullet) {
        enemy.takeDamage(1);

        bullet.disable();
    }

    getRandPosition() {
        let side = Math.floor(Math.random() * 4);
        let coords = [0, 0];
        if (side == 0) {
            coords = [Math.floor(Math.random() * 640), Math.floor(Math.random() * 16)];
        } else if (side == 1) {
            coords = [Math.floor(Math.random() * 16), Math.floor(Math.random() * 384)];
        } else if (side == 2) {
            coords = [624 + Math.floor(Math.random() * 640), Math.floor(Math.random() * 384)];
        } else if (side == 3) {
            coords = [Math.floor(Math.random() * 640), 368 + Math.floor(Math.random() * 16)];
        }

        return coords;
    }
}

export default EnemyManager;
