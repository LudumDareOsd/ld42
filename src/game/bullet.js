class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'player_bullet');

        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;

        this.speed = Phaser.Math.GetSpeed(600, 1);
    }

    fire(x, y, tox, toy) {
        this.setActive(true);
        this.setVisible(true);

        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(x, y);

        var angle = Phaser.Math.Angle.Between(tox, toy, x, y);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 1000;
    }

    update(time, delta) {
      this.lifespan -= delta;

      this.x -= this.incX * (this.speed * delta);
      this.y -= this.incY * (this.speed * delta);

      if (this.lifespan <= 0)
      {
          this.setActive(false);
          this.setVisible(false);
      }
    }
}

export default Bullet;
