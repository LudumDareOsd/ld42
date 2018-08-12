class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'player_bullet');
        this.setScale(1.5);
        this.setDepth(5);
        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;

        this.speed = Phaser.Math.GetSpeed(600, 1);
    }

    fire(x, y, tox, toy, aoffset) {
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x, y);

        let angle = Phaser.Math.Angle.Between(tox, toy, x, y);

        if(aoffset) {
          angle = aoffset + angle;
        }

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 2000;
    }

    update(time, delta) {
        this.lifespan -= delta;

        this.body.setVelocityX(-(this.incX * (this.speed * delta) * 50));
        this.body.setVelocityY(-(this.incY * (this.speed * delta) * 50));

        if (this.lifespan <= 0) {
            this.disable();
        }
    }

    disable() {
        this.destroy();
    }
}

export default Bullet;
