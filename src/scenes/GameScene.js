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
        this.lava = this.add.tileSprite(320, 240, 640, 480, 'lava');
        this.ui = this.add.tileSprite(320, 192, 608, 352, 'floor');
        this.player = this.add.existing(new Player(this, 320, 240));

        this.ground = this.add.zone(24, 24).setSize(592, 336);
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
