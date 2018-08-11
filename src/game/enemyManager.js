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

    generateEnemy() {
      if(this.enemyGroup.children.entries.length < this.nrOfEnemies && this.totalEnemies > this.enemiesCreated) {
        this.enemyGroup.add(new Enemy(this.player, this.scene, 420, 340).setScale(2), true);
        this.enemiesCreated++;
      }
    }

    enemyHit(enemy, bullet) {
      enemy.takeDamage(1);

      bullet.disable();
  }
}

export default EnemyManager;
