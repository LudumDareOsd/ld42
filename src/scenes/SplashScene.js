class SplashScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'SplashScene'
        });
    }

    preload() {
        this.load.audio("shoot01", "../../assets/audio/Shoot01.wav");
        this.load.audio("shoot02", "../../assets/audio/Shoot02.wav");
        this.load.audio("shoot03", "../../assets/audio/Shoot03.wav");
        this.load.audio("beer01", "../../assets/audio/Beer01.wav");
        this.load.audio("hit01", "../../assets/audio/Hit01.wav");
        this.load.audio("hit02", "../../assets/audio/Hit02.wav");
        this.load.audio("death01", "../../assets/audio/Death01.wav");
        this.load.audio("death02", "../../assets/audio/Death02.wav");
        this.load.audio("explosion01", "../../assets/audio/Explosion01.wav");
        this.load.audio("powerup01", "../../assets/audio/Powerup01.wav");
        this.load.audio("powerup02", "../../assets/audio/Powerup02.wav");
        this.load.audio("powerup03", "../../assets/audio/Powerup03.wav");

        this.load.image("logo", "../../assets/Original/splash.png");
        this.load.image("player", "../../assets/image/player.png");
        this.load.image("floor", "../../assets/image/floor_tile.png");
        this.load.image("player_bullet", "../../assets/image/bullet.png");
        this.load.image("enemy_bullet", "../../assets/image/enemy_bullet.png");
        this.load.image("floordrop1", "../../assets/image/floor_dropping_tile.png");
        this.load.image("floordrop2", "../../assets/image/floor_lava_tile.png");
        this.load.image("hud", "../../assets/image/HUD_background.png");
        this.load.image("beer", "../../assets/image/beer.png");
        this.load.image("beers", "../../assets/image/beers.png");
        this.load.image("rage", "../../assets/image/rage.png");
        this.load.image("speed", "../../assets/image/speed.png");
        this.load.image("machinegun", "../../assets/image/Machinegun.png");
        this.load.image("shotgun", "../../assets/image/Shotgun.png");
        this.load.image("handgun-hud", "../../assets/image/Handgun.png");
        this.load.image("shotgun-hud", "../../assets/image/Shotgun-HUD.png");
        this.load.image("machinegun-hud", "../../assets/image/Machinegun-HUD.png");
        this.load.image("healthbar", "../../assets/image/healthbar.png");
        this.load.image("infinite", "../../assets/image/infinite.png");
        this.load.image("redbar", "../../assets/image/sacrificebar.png");
        this.load.image("titlescreen", "../../assets/image/titlescreen.png");
        this.load.image("press_start", "../../assets/image/press_start.png");
        this.load.image("overlay", "../../assets/image/Overlay.png");
        this.load.image("overlay_game_over", "../../assets/image/Overllay_game_over.png");
        this.load.image("overlay_get_psyched", "../../assets/image/Overlay_Get_Psyched.png");


        this.load.spritesheet("numbers", "../../assets/image/numbers.png", {
            frameWidth: 6,
            frameHeight: 8
        });

        this.load.spritesheet("lava",
            "../../assets/image/lava_anim.png", {
                frameWidth: 32,
                frameHeight: 32
            }
        );

        this.load.spritesheet("blob",
            "../../assets/image/blob.png", {
                frameWidth: 16,
                frameHeight: 16
            }
        );

        this.load.spritesheet("death",
            "../../assets/image/death_anim.png", {
                frameWidth: 32,
                frameHeight: 32
            }
        );
    }

    create() {
        this.add.image(320, 240, "logo").setScale(2);
        this.scene.switch('GameScene');
    }

    update() {

    }
}

export default SplashScene;
