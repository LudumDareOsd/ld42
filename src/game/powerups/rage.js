class Rage extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'rage');
        this.setScale(2);
        this.setDepth(4);
        this.setSize(16, 32, true);
    }

    grab(player) {
        player.rage();
    }
}

export default Rage;
