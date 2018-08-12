class ShotGun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'shotgun');
        this.setScale(2);
        this.setDepth(4);
        this.setSize(64, 16, true);
    }

    grab(player) {
        player.shotgun();
    }
}

export default ShotGun;
