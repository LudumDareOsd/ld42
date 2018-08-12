import Beer from "./powerups/beer";
import Beers from "./powerups/beers";
import Rage from "./powerups/rage";
import Speed from "./powerups/speed";
import MachineGun from "./powerups/machinegun";
import ShotGun from "./powerups/shotgun";

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
        if (this.poweruptimer <= 0 && !this.scene.waveManager.timeout) {
            this.spawnPowerup();
            this.spawnLife();
            this.spawnWeapon();
            this.poweruptimer = 10000;
        }
    }

    spawnLife() {
        let rand = Math.floor(Math.random() * 5);
        let coords = this.map.getRandomTileCoords();

        if (rand == 1) {
            this.powerups.add(new Beers(this.scene, coords[0], coords[1]).setScale(2).setDepth(4), true);
        } else {
            this.powerups.add(new Beer(this.scene, coords[0], coords[1]).setScale(2).setDepth(4), true);
        }
    }

    spawnPowerup() {
        let rand = Math.floor(Math.random() * 2);
        let coords = this.map.getRandomTileCoords();

        if (rand == 1) {
            this.powerups.add(new Rage(this.scene, coords[0], coords[1]).setScale(2).setDepth(4), true);
        } else {
            this.powerups.add(new Speed(this.scene, coords[0], coords[1]).setScale(2).setDepth(4), true);
        }
    }

    spawnWeapon() {
        let rand = Math.floor(Math.random() * 2);
        let coords = this.map.getRandomTileCoords();

        if (rand == 1) {
            this.powerups.add(new MachineGun(this.scene, coords[0], coords[1]).setScale(2).setDepth(4), true);
        } else {
            this.powerups.add(new ShotGun(this.scene, coords[0], coords[1]).setScale(2).setDepth(4), true);
        }
    }

    hitpowerup(player, powerup) {
        powerup.grab(player);
        powerup.destroy();
    }

    reset() {
      while(this.powerups.children.entries.length > 0) {
        this.powerups.children.entries[0].destroy();
      }
    }
}

export default PowerupManager;
