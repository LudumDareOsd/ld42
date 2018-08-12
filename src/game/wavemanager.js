class WaveManager {
    constructor(enemyManager, powerupManager, map) {
        this.enemyManager = enemyManager;
        this.powerupManager = powerupManager;
        this.map = map;

        this.wave = 1;
        this.wavetimer = 0;
        this.timeout = false;

        this.enemyManager.startWave(this.wave);
    }

    update(time, delta) {
        if (this.enemyManager.isWaveClear()) {
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
        }
    }
}

export default WaveManager;
