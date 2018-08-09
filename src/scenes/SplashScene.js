class SplashScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'SplashScene'
        });

        this.phaserSprite;
    }
    preload() {
        this.load.image("logo", "../../assets/test.png");
    }

    create() {
        this.phaserSprite = this.add.sprite(400, 300, "logo");
    }
}

export default SplashScene;
