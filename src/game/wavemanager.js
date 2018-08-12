class WaveManager {
    constructor(scene, enemyManager, powerupManager, map) {
        this.scene = scene;
        this.enemyManager = enemyManager;
        this.powerupManager = powerupManager;
        this.map = map;

        this.wave = 1;
        this.wavetimer = 0;
        this.timeout = false;
        this.overlay_wave = this.scene.add.image(320, 60, "overlay_wave").setScale(2).setDepth(15);
        this.overlay_wave.visible = false;

        this.wavenumber = [];
        this.wavenumber.push(this.scene.add.tileSprite(350, 58, 6, 8, 'numbers', 0).setScale(2).setDepth(15));
        this.wavenumber.push(this.scene.add.tileSprite(362, 58, 6, 8, 'numbers', 0).setScale(2).setDepth(15));

        for (let number of this.wavenumber) {
            number.visible = false;
        }

        this.enemyManager.startWave(this.wave);
    }

    update(time, delta) {
        if (this.enemyManager.isWaveClear()) {
            this.overlay_wave.visible = true;
            for (let number of this.wavenumber) {
                number.visible = true;
            }

            this.setNumber(this.wavenumber, (this.wave + 1).toString());

            this.wavetimer -= delta;
            if (this.wavetimer <= 0 && this.timeout == false) {
                this.wavetimer = 5000;
                this.timeout = true;
                this.enemyManager.player.addScore(1337 * 10);
            }

            if (this.wavetimer <= 0 && this.timeout == true) {
                this.powerupManager.reset();
                this.map.reset();
                this.enemyManager.startWave(++this.wave);
                this.timeout = false;
            }
        } else {
            this.overlay_wave.visible = false;
            for (let number of this.wavenumber) {
                number.visible = false;
            }
        }
    }

    setNumber(sprites, value) {
        value = value.padStart(sprites.length, '0');
        for (let i = 0; i < sprites.length; i++) {
            sprites[i].setFrame(value[i]);
        }
    }
}

export default WaveManager;
