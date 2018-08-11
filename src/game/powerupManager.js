import Beer from "./powerups/beer";

class PowerupManager {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.poweruptimer = 0;

        this.powerups = this.scene.physics.add.group();
        this.scene.physics.add.overlap(this.powerups, this.scene.player, this.hitpowerup, null, this);
    }

    update(time, delta) {
        this.poweruptimer -= delta;
        if (this.poweruptimer <= 0) {
            this.spawnPowerup();
            this.spawnLife();
            this.poweruptimer = 10000;
        }
    }

    spawnPowerup() {}

    spawnLife() {
        let coords = this.map.getRandomTileCoords();
        this.powerups.add(new Beer(this.scene, coords[0], coords[1]).setScale(2).setDepth(4), true);
    }

    hitpowerup(player, powerup) {
      powerup.grab(player);
      powerup.destroy();
    }
}

export default PowerupManager;
