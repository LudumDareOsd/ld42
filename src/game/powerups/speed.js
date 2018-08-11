class Speed extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'speed');
        this.setScale(2);
        this.setDepth(4);
        this.setSize(16, 32, true);
    }

    grab(player) {
        player.speed();
    }
}

export default Speed;
