class SplashScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'SplashScene'
        });
    }

    preload() {
        this.load.image("logo", "../../assets/Original/splash.png");
        this.load.image("player", "../../assets/image/player.png");
        this.load.image("lava", "../../assets/image/lava_tile.png");
        this.load.image("floor", "../../assets/image/floor_tile.png");
        this.load.image("player_bullet", "../../assets/image/bullet.png");
        this.load.image("enemy_bullet", "../../assets/image/enemy_bullet.png");
        this.load.image("floordrop1", "../../assets/image/floor_dropping_tile.png");
        this.load.image("floordrop2", "../../assets/image/floor_lava_tile.png");
        this.load.image("hud", "../../assets/image/HUD_background.png");
        this.load.image("beer", "../../assets/image/beer.png");

        this.load.spritesheet("blob",
            "../../assets/image/blob.png",
            { frameWidth: 16, frameHeight: 16 }
        );
    }

    create() {
        this.add.image(320, 240, "logo").setScale(2);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.space.isDown) {
            this.scene.switch('GameScene');
        }
    }
}

export default SplashScene;
