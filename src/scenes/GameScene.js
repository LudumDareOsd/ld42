import Player from "../game/player";
import Enemy from "../game/enemy";
import EnemyManager from "../game/enemyManager";
import FloorMap from "../game/floorMap";

class GameScene extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {}

    create() {
        this.lava = this.add.tileSprite(320, 240, 320, 240, 'lava').setScale(2);
        this.map = new FloorMap(this);
        this.player = this.add.existing(new Player(this, 320, 240)).setScale(2);
        this.droptimer = 3000;

        this.ground = this.add.zone(48, 48).setSize(544, 288);
        this.physics.world.enable(this.ground);

        this.ground.body.setAllowGravity(false);
        this.ground.body.moves = false;

        this.physics.add.overlap(this.player, this.ground);

        this.enemyManager = new EnemyManager(this.player, this, 1);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('blob', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('blob', { start: 4, end: 6 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('blob', { start: 7, end: 9 }),
            frameRate: 10,
            repeat: 0
        });
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.enemyManager.update(time, delta);
        if (this.player.body) {
            if (!this.itersects(this.player, this.ground)) {
                this.player.takeDamage(100);
            }
        }

        this.enemyManager.generateEnemy();

        this.droptimer -= delta;

        if(this.droptimer <= 0) {
          this.map.dropTile();
          this.droptimer = 3000;
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
