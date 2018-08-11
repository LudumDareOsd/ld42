import Player from "../game/player";
import Enemy from "../game/enemy";

class GameScene extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
    }

    create() {
        this.lava = this.add.tileSprite(320, 240, 320, 240, 'lava').setScale(2);
        this.floor = this.add.tileSprite(320, 192, 288, 160, 'floor').setScale(2);
        this.player = this.add.existing(new Player(this, 320, 240)).setScale(2);
        this.enemy = this.add.existing(new Enemy(this.player, this, 420, 340)).setScale(2);

        this.physics.add.collider(this.enemy, this.player.bullets);

        this.ground = this.add.zone(48, 48).setSize(544, 288);
        this.physics.world.enable(this.ground);

        this.ground.body.setAllowGravity(false);
        this.ground.body.moves = false;

        this.physics.add.overlap(this.player, this.ground);
    }

    update(time, delta) {
        this.player.update(time, delta);

        if (!this.itersects(this.player, this.ground)) {
            this.player.destroy();
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
