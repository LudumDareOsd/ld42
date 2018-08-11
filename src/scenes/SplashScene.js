import { S_IFREG } from "constants";

class SplashScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'SplashScene'
        });
    }

    preload() {
        this.load.image("logo", "../../assets/Original/splash.png");
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
