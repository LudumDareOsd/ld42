import Bullet from "./bullet";

class Enemy extends Phaser.GameObjects.Sprite {

    constructor(player, scene, x, y) {
        super(scene, x, y);

        this.setTexture('enemy');
        this.setPosition(x, y);
        this.hp = 3;

        this.scene.physics.add.existing(this, false);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1, 1);

        this.bullets = this.scene.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    update(time, delta) {
        super.update(time, delta);

        this.body.setVelocity(0, 0);

        // this.body.setVelocityX(-100);

        // this.body.setVelocityX(100);

        // this.body.setVelocityY(-100);

        // this.body.setVelocityY(100);


        this.setRotation(Phaser.Math.Angle.Between(this.player.x, this.player.y, this.x, this.y) - Math.PI / 2);
    }

    fire(x, y) {
        let bullet = this.bullets.get();

        if (bullet) {
            bullet.fire(this.x, this.y, x, y);
        }
    }

    takeDamage(value) {
      this.hp--;

      if(this.hp <= 0) {
        this.destroy();
      }
    }
}

export default Enemy;
