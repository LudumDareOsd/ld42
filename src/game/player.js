import Bullet from "./bullet";

class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        this.score = 0;
        this.hp = 100;
        this.setTexture('player');
        this.setPosition(x, y);

        this.scorenumbers = [];
        this.scorenumbers.push(this.scene.add.tileSprite(450, 458, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.scorenumbers.push(this.scene.add.tileSprite(462, 458, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.scorenumbers.push(this.scene.add.tileSprite(474, 458, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.scorenumbers.push(this.scene.add.tileSprite(486, 458, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.scorenumbers.push(this.scene.add.tileSprite(498, 458, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.scorenumbers.push(this.scene.add.tileSprite(510, 458, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.scorenumbers.push(this.scene.add.tileSprite(522, 458, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.scorenumbers.push(this.scene.add.tileSprite(534, 458, 6, 8, 'numbers', 0).setScale(2).setDepth(11));

        this.ammonumbers = [];
        this.ammonumbers.push(this.scene.add.tileSprite(196, 418, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.ammonumbers.push(this.scene.add.tileSprite(208, 418, 6, 8, 'numbers', 0).setScale(2).setDepth(11));
        this.ammonumbers.push(this.scene.add.tileSprite(220, 418, 6, 8, 'numbers', 0).setScale(2).setDepth(11));

        this.greenbar = this.scene.add.image(146, 462, "healthbar").setScale(2).setDepth(12);
        this.redbar = this.scene.add.image(528, 408, "redbar").setScale(2).setDepth(12);

        this.updateHpBar();

        this.ammoinfinite = this.scene.add.image(208, 418, 'infinite').setScale(2).setDepth(11);

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
            if (this.firetimer <= 0 && this.active == true) {
                this.fiering = true;
            }
        });

        this.scene.input.on('pointerup', (pointer) => {
            this.fiering = false;
        });

        this.scene.input.on('pointermove', (pointer) => {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        });

        this.firetimer = 0;

        this.raging = false;
        this.ragetimer = 0;

        this.speedvalue = 100;
        this.speedtimer = 0;

        this.weapon = 'shotgun';
        this.ammunition = 0;
        this.setInfiniteAmmo();

        this.fiering = false;
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

        if (this.ragetimer > 0) {
            this.ragetimer -= delta;
        } else {
            this.raging = false;
        }

        if (this.speedtimer > 0) {
            this.speedtimer -= delta;
        } else {
            this.speedvalue = 100;
        }


        if (this.firetimer > 0) {
            this.firetimer -= delta;
        }

        if (this.weapon == 'gun') {
            if (this.fiering && this.active == true) {
                this.scene.sound.play('shoot03', {
                    volume: 0.1
                });
                this.fire(this.mouseX, this.mouseY);
                this.fiering = false;
                this.firetimer = 200;
            }
        } else if (this.weapon == 'machinegun') {
            if (this.fiering && this.active == true) {
                if (this.firetimer <= 0) {
                    this.scene.sound.play('shoot01', {
                        volume: 0.1
                    });
                    this.fire(this.mouseX, this.mouseY);
                    this.ammunition--;
                    this.setAmmo();
                    this.firetimer = 100;
                }
            }
        } else if (this.weapon == 'shotgun') {
            if (this.fiering) {
                if (this.fiering && this.active == true) {
                    this.scene.sound.play('explosion01', {
                        volume: 0.1
                    });
                    this.fire(this.mouseX, this.mouseY, 0.1);
                    this.fire(this.mouseX, this.mouseY, 0.05);
                    this.fire(this.mouseX, this.mouseY, 0);
                    this.fire(this.mouseX, this.mouseY, -0.05);
                    this.fire(this.mouseX, this.mouseY, -0.1);
                    this.ammunition--;
                    this.setAmmo();
                    this.fiering = false;
                    this.firetimer = 400;
                }
            }
        }

        if (this.ammunition <= 0) {
            this.weapon = 'gun';
            this.setInfiniteAmmo();
        }

    }

    fire(x, y, offset) {
        if (this.active == true) {
            let bullet = this.bullets.get();

            if (bullet) {

                bullet.fire(this.x, this.y, x, y, offset);
            }
        }
    }

    takeDamage(value) {
        this.hp -= value;
        this.updateHpBar();

        if (this.hp <= 0) {
            this.scene.sound.play('death01', {
                volume: 0.5
            });
            this.destroy();
        } else {
            this.scene.sound.play('hit01', {
                volume: 0.1
            });
        }
    }

    heal(value) {
        this.hp += value;

        if (this.hp > 100) {
            this.hp = 100;
        }
        this.updateHpBar();
        this.scene.sound.play('beer01', {
            volume: 0.3
        });
    }

    updateHpBar() {
        this.greenbar.setCrop(0, 0, (this.hp / 100) * 93, 8);
    }

    updateSacreficeBar() {
        if (this.active) {
            // this.redbar.setCrop(0, 0, (this.scene.enemyManager.enemysleft / this.scene.enemyManager.totalEnemies) * 92, 8);
        }
    }

    rage() {
        this.ragetimer = 10000;
        this.raging = true;
        this.scene.sound.play('powerup01', {
            volume: 0.3
        });
    }

    speed() {
        this.speedtimer = 10000;
        this.speedvalue = 200;
        this.scene.sound.play('powerup02', {
            volume: 0.3
        });
    }

    machinegun() {
        if (this.weapon == 'shotgun') {
            this.ammunition = 0;
        }
        this.weapon = 'machinegun';
        this.ammunition += 50;
        this.scene.sound.play('powerup03', {
            volume: 0.3
        });
        this.setAmmo();
    }

    shotgun() {
        if (this.weapon == 'machinegun') {
            this.ammunition = 0;
        }
        this.weapon = 'shotgun';
        this.ammunition += 10;
        this.scene.sound.play('powerup03', {
            volume: 0.3
        });
        this.setAmmo();
    }

    setNumber(sprites, value) {
        value = value.padStart(sprites.length, '0');
        for (let i = 0; i < sprites.length; i++) {
            sprites[i].setFrame(value[i]);
        }
    }

    setAmmo() {
        this.ammoinfinite.visible = false;

        for (let sprite of this.ammonumbers) {
            sprite.visible = true;
        }

        this.setNumber(this.ammonumbers, this.ammunition.toString());
    }

    setInfiniteAmmo() {
        this.ammoinfinite.visible = true;

        for (let sprite of this.ammonumbers) {
            sprite.visible = false
        }
    }

    addScore(value) {
        this.score += value;
        this.setNumber(this.scorenumbers, this.score.toString());
    }
}

export default Player;
