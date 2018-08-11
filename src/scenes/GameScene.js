import Player from "../game/player";

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
        this.ui = this.add.tileSprite(320, 192, 304, 176, 'floor').setScale(2);
        this.player = this.add.existing(new Player(this, 320, 240)).setScale(2);

        this.ground = this.add.zone(32, 32).setSize(576, 320);
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
