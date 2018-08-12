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
        this.titlescreen = this.add.image(320, 192, "titlescreen").setScale(2).setDepth(15);
        this.overlay = this.add.image(320, 100, "overlay").setScale(2).setDepth(15);
        this.overlay_game_over = this.add.image(320, 90, "overlay_game_over").setScale(2).setDepth(15);
        this.overlay_get_psyched = this.add.image(315, 90, "overlay_get_psyched").setScale(2).setDepth(15);

        this.overlay.visible = false;
        this.overlay_game_over.visible = false;
        this.overlay_get_psyched.visible = false;

        this.press_start = this.add.image(320, 192, "press_start").setScale(2).setDepth(16);
        this.presstarttimer = 500;

        this.hud = this.add.image(320, 432, "hud").setScale(2).setDepth(10);
        this.lava = this.add.tileSprite(320, 240, 320, 240, 'lava', 0).setScale(2).setDepth(0);
        this.player = this.add.existing(new Player(this, 320, 240)).setScale(2).setDepth(5);

        this.droptimer = 3000;
        this.lavatimer = 250;
        this.lavaFrame = 0;
        this.lavaDir = true;

        this.started = false;
        this.starttimer = 1200;

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
            key: 'player_die',
            frames: this.anims.generateFrameNumbers('death', {
                start: 0,
                end: 7
            }),
            frameRate: 7,
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

        if (window.restart == true) {
            this.started = true;
            this.titlescreen.destroy();
            this.press_start.destroy();
        }
    }



    update(time, delta) {
        if (this.starttimer <= 0) {
            this.overlay.visible = false;
            this.overlay_get_psyched.visible = false;
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

            if (this.droptimer <= 0 && this.waveManager.timeout == false) {
                this.map.dropTile();
                this.droptimer = 3000;
            }
        } else {

            if (this.started) {
                this.starttimer -= delta;
                this.overlay.visible = true;
                this.overlay_get_psyched.visible = true;
            }

            if (this.space.isDown && this.player.active) {
                this.started = true;
                this.titlescreen.destroy();
                this.press_start.destroy();
            }

            this.presstarttimer -= delta;

            if (this.presstarttimer <= 0) {
                this.presstarttimer = 500;
                this.press_start.visible = !this.press_start.visible;
            }
        }

        this.lavatimer -= delta;


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

        if (this.player.dead) {
            this.overlay.visible = true;
            this.overlay_game_over.visible = true;
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
