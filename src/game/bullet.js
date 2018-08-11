class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'player_bullet');
        this.speed = Phaser.Math.GetSpeed(400, 1);
    }

    fire(x, y, tox, toy) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    update(time, delta) {
        this.y -= this.speed * delta;
        this.x -= this.speed * delta;

        if (this.y < -50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default Bullet;
