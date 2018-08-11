class FloorMap {
    constructor(scene, player) {
        this.scene = scene;
        this.tiles = [];
        this.tilesLeft = 153;
        this.createTiles();

        this.scene.anims.create({
            key: 'droptile',
            frames: [{
                    key: 'floordrop1'
                },
                {
                    key: 'floordrop2'
                }
            ],
            frameRate: 1,
            repeat: 0
        });
    }

    createTiles() {
        for (let x = 0; x < 18; x++) {
            for (let y = 0; y < 10; y++) {
                let tile = this.scene.add.tileSprite(48 + (x * 32), 48 + (y * 32), 16, 16, 'floor').setScale(2).setDepth(2);
                this.tiles.push(tile);
            }
        }
    }

    dropTile() {
        let index = Math.floor(Math.random() * this.tilesLeft);
        let tile = this.tiles[index];
        let droptile = this.scene.add.sprite(tile.x, tile.y, 'floordrop1').setScale(2).setDepth(3);
        droptile.on('animationcomplete', this.removeTile, {
            scope: this,
            index: index,
            droptile: droptile
        });
        droptile.play('droptile');
    }

    removeTile() {
        let tile = this.scope.tiles.splice(this.index, 1);
        this.scope.tilesLeft--;

        tile[0].destroy();

        let lava = this.scope.scene.add.zone(tile[0].x, tile[0].y).setSize(1, 1);
        this.scope.scene.physics.world.enable(lava);
        this.scope.scene.physics.add.overlap(this.scope.scene.player, lava, this.scope.walkinlava, null, this.scope);
        this.droptile.destroy();
    }

    walkinlava() {
        this.scene.player.takeDamage(100);
    }

    getRandomTileCoords() {
      let index = Math.floor(Math.random() * this.tilesLeft);
      let tile = this.tiles[index];

      return [tile.x, tile.y]
    }
}

export default FloorMap;
