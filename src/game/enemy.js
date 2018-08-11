import Bullet from "./bullet";

class Enemy extends Phaser.GameObjects.Sprite {
    constructor(player, scene, x, y) {
        super(scene, x, y);
        this.player = player;

        this.setPosition(x, y);
        this.hp = 3;
        this.firetimer = this.firecd();

        this.scene.physics.add.existing(this, false);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1, 1);

        this.bullets = this.scene.physics.add.group({
            classType: Bullet,
            maxSize: 5,
            runChildUpdate: true
        });

        this.speed = Phaser.Math.GetSpeed(2000, 1);
        this.scene.physics.add.overlap(this.player, this.bullets, this.playerhit, null, this);
        this.scene.physics.add.collider(this, this.player);
        this.idle();
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    update(time, delta) {
        super.update(time, delta);

        this.body.setVelocity(0, 0);

        if (this.player.active == true) {
            let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.x, this.y);

            let incX = Math.cos(angle);
            let incY = Math.sin(angle);

            this.setRotation(angle - Math.PI / 2);

            this.body.setVelocityX(-(incX * (this.speed * delta)));
            this.body.setVelocityY(-(incY * (this.speed * delta)));

            this.firetimer -= delta;
            if (this.firetimer <= 0) {
                this.fire(this.player.x, this.player.y);
                this.firetimer = this.firecd();
            }
        }
    }

    idle() {
        this.play('idle');
    }

    fire(x, y) {
        this.play('attack');
        window.setTimeout(() => {
            this.idle();
        }, 300);

        let bullet = this.bullets.get();
        bullet.setTexture("enemy_bullet");
        if (bullet) {
            bullet.fire(this.x, this.y, x, y);
        }
    }

    takeDamage(value) {
        this.hp--;

        if (this.hp <= 0) {
            this.play('die');
            this.on('animationcomplete', this.removeEnemy, this);
        }
    }

    

    removeEnemy() {
        this.destroy();
    }

    playerhit(player, bullet) {
        player.takeDamage(10);
        bullet.destroy();
    }

    firecd() {
        return Math.floor(2500 + Math.random() * 1000);
    }
}

export default Enemy;
