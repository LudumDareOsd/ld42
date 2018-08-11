import 'phaser';
import SplashScene from './scenes/SplashScene';
import GameScene from './scenes/GameScene';
import ScoreScene from './scenes/ScoreScene';

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
        }
    },
    scene: [
        SplashScene,
        GameScene,
        ScoreScene
    ]
};

const game = new Phaser.Game(config);
