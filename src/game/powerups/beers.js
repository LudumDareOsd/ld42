class Beers extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
      super(scene, x, y, 'beers');
      this.setScale(2);
      this.setDepth(4);
      this.setSize(16, 32, true);
  }

  grab(player) {
      player.heal(100);
  }
}

export default Beers;
