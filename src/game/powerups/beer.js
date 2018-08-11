class Beer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'beer');
        this.setScale(2);
        this.setDepth(4);
        this.setSize(16, 32, true);
    }

    grab(player) {
        player.heal(30);
    }
}

export default Beer;
