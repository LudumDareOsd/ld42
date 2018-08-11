import Bullet from "./bullet";

class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        this.hp = 100;
        this.setTexture('player');
        this.setPosition(x, y);

        this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.left2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.right2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.up2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.down2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.scene.physics.add.existing(this, false);
        this.body.setCollideWorldBounds(true);

        this.bullets = this.scene.physics.add.group({
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        });

        this.mouseX = 0;
        this.mouseY = 0;

        this.scene.input.on('pointerdown', (pointer) => {
            this.fire(pointer.x, pointer.y);
        });

        this.scene.input.on('pointermove', (pointer) => {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        });

        this.raging = false;
        this.ragetimer = 0;

        this.speedvalue = 100;
        this.speedtimer = 0;

        this.weapon = 'gun';
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    update(time, delta) {
        super.update(time, delta);

        if (this.body) {
            this.body.setVelocity(0, 0);

            if (this.left.isDown || this.left2.isDown) {
                this.body.setVelocityX(-this.speedvalue);
            }

            if (this.right.isDown || this.right2.isDown) {
                this.body.setVelocityX(this.speedvalue);
            }

            if (this.up.isDown || this.up2.isDown) {
                this.body.setVelocityY(-this.speedvalue);
            }

            if (this.down.isDown || this.down2.isDown) {
                this.body.setVelocityY(this.speedvalue);
            }

            this.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.x, this.y) - Math.PI / 2);
        }

        if(this.ragetimer > 0) {
          this.ragetimer -= delta;
        } else {
          this.raging = false;
        }

        if(this.speedtimer > 0) {
          this.speedtimer -= delta;
        } else {
          this.speedvalue = 100;
        }
    }

    fire(x, y) {
        if (this.active == true) {
            let bullet = this.bullets.get();

            if (bullet) {
                bullet.fire(this.x, this.y, x, y);
            }
        }
    }

    takeDamage(value) {
        this.hp -= value;

        if (this.hp <= 0) {
            this.destroy();
        }
    }

    heal(value) {
      this.hp += value;

      if(this.hp > 100) {
        this.hp = 100;
      }
    }

    rage() {
      this.ragetimer = 10000;
      this.raging = true;
    }

    speed() {
      this.speedtimer = 10000;
      this.speedvalue = 200;
    }

    mashineGun() {

    }

    shotgun() {
      
    }
}

export default Player;
