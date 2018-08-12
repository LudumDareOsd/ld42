import Player from "../game/player";
import EnemyManager from "../game/enemyManager";
import FloorMap from "../game/floorMap";
import PowerupManager from "../game/powerupManager";
import WaveManager from "../game/wavemanager";

class GameScene extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {}

    create() {
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.hud = this.add.image(320, 432, "hud").setScale(2).setDepth(10);
        this.lava = this.add.tileSprite(320, 240, 320, 240, 'lava', 0).setScale(2).setDepth(0);
        this.player = this.add.existing(new Player(this, 320, 240)).setScale(2).setDepth(5);
        this.droptimer = 3000;
        this.lavatimer = 250;
        this.lavaFrame = 0;
        this.lavaDir = true;

        this.ground = this.add.zone(48, 48).setSize(544, 288);
        this.physics.world.enable(this.ground);

        this.ground.body.setAllowGravity(false);
        this.ground.body.moves = false;

        this.physics.add.overlap(this.player, this.ground);

        this.map = new FloorMap(this);
        this.enemyManager = new EnemyManager(this.player, this, 1);
        this.powerupManager = new PowerupManager(this, this.map);
        this.waveManager = new WaveManager(this.enemyManager, this.powerupManager, this.map);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('blob', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('blob', {
                start: 4,
                end: 6
            }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('blob', {
                start: 7,
                end: 9
            }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'lava-idle',
            frames: this.anims.generateFrameNumbers('lava', {
                start: 0,
                end: 2
            }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        });
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.enemyManager.update(time, delta);
        this.powerupManager.update(time, delta);
        this.waveManager.update(time, delta);

        if (this.player.body) {
            if (!this.itersects(this.player, this.ground)) {
                this.player.takeDamage(100);
            }
        }


        this.droptimer -= delta;
        this.lavatimer -= delta;

        if (this.droptimer <= 0 && this.waveManager.timeout == false) {
            this.map.dropTile();
            this.droptimer = 3000;
        }

        if (this.lavatimer <= 0) {
            if (this.lavaDir) {
                if (this.lavaFrame < 2) {
                    this.lavaFrame++;
                } else {
                    this.lavaDir = false;
                    this.lavaFrame--;
                }
            } else {
                if (this.lavaFrame > 0) {
                    this.lavaFrame--
                } else {
                    this.lavaDir = true;
                    this.lavaFrame++;
                }
            }

            this.lava.destroy();
            this.lava = this.add.tileSprite(320, 240, 320, 240, 'lava', this.lavaFrame).setScale(2).setDepth(0);
            this.lavatimer = 250;
        }

        if (this.space.isDown && !this.player.active) {
            this.scene.restart();
        }
    }

    itersects(a, b) {
        return !(
            a.body.x + a.body.width < b.body.x ||
            a.body.y + a.body.height < b.body.y ||
            a.body.x > b.body.x + b.body.width ||
            a.body.y > b.body.y + b.body.height
        );
    }
}

export default GameScene;
