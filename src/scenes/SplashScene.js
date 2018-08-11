import { S_IFREG } from "constants";

class SplashScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'SplashScene'
        });
    }

    preload() {
        this.load.image("logo", "../../assets/Original/splash.png");
        this.load.image("player", "../../assets/image/player.png");
        this.load.image("enemy", "../../assets/image/enemy.png");
        this.load.image("lava", "../../assets/image/lava_tile.png");
        this.load.image("floor", "../../assets/image/floor_tile.png");
        this.load.image("player_bullet", "../../assets/image/player_bullet.png");
    }

    create() {
        this.add.image(320, 240, "logo").setScale(2);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
      if(this.space.isDown) {
        this.scene.switch('GameScene');
      }
    }
}

export default SplashScene;
