class FloorMap {
    constructor(scene, player) {
        this.scene = scene;
        this.tiles = [];
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

        this.lavaGroup = this.scene.physics.add.group();
        this.scene.physics.add.overlap(this.lavaGroup, this.scene.player, this.walkinlava, null, this);
    }

    createTiles() {
        this.tilesLeft = 153;
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
        this.scope.lavaGroup.add(lava);

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

    reset() {
        let length = this.lavaGroup.children.entries.length;
        for(let i = 0; i < length; i++) {
          this.lavaGroup.children.entries[0].destroy();
        }

        for (let tile of this.tiles) {
            tile.destroy();
        }
        this.tiles = [];

        this.createTiles();
    }
}

export default FloorMap;
