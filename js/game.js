let gameScene = new Phaser.Scene('Game');

gameScene.preload = function(){
  this.load.image('background', 'assets/images/background.png');
  this.load.image('player', 'assets/images/player.png');
};

gameScene.create = function(){
  let bg = this.add.sprite(0, 0, 'background');
  this.add.sprite(100, 100, 'player');

  bg.setOrigin(0, 0);
};

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

let game = new Phaser.Game(config);
