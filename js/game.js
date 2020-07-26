let gameScene = new Phaser.Scene('Game');

gameScene.init = function(){
  this.playerSpeed = 3;

  this.enemyMinSpeed = 2.5;
  this.enemyMaxSpeed = 5;

  this.enemyMinY = 80;
  this.enemyMaxY = 280;
};

gameScene.preload = function(){
  this.load.image('background', 'assets/images/background.png');
  this.load.image('player', 'assets/images/player.png');
  this.load.image('enemy', 'assets/images/enemy.gif');
};

gameScene.create = function(){
  let bg = this.add.sprite(0, 0, 'background');
  this.player = this.add.sprite(80, this.sys.game.config.height / 2, 'player');
  this.enemy = this.add.sprite(250, this.sys.game.config.height / 2, 'enemy');

  bg.setOrigin(0, 0);
  this.enemy.setScale(0.2);
  this.enemy.flipX = true;

  let dir = Math.random() < 0.5 ? 1 : -1;
  let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed)
  this.enemy.speed = dir * speed;
};

gameScene.update = function(){
  if (this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }

  let playerRect = this.player.getBounds();
  let enemyRect = this.enemy.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
    this.scene.restart();
    return;
  }

  this.enemy.y += this.enemy.speed;

  let conditionUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
  let conditionDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;

  if (conditionUp || conditionDown) {
    this.enemy.speed *= -1;
  }
};

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

let game = new Phaser.Game(config);
