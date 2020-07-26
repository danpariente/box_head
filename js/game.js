let gameScene = new Phaser.Scene('Game');

gameScene.init = function(){
  this.playerSpeed = 3.5;

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
  this.enemies = this.add.group({
    key: 'enemy',
    repeat: 4,
    setXY: {
      x: 200,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });

  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.8, -0.8);

  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
    enemy.flipX = true;

    let dir = Math.random() < 0.5 ? 1 : -1;
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed)
    enemy.speed = dir * speed;
  }, this);

  bg.setOrigin(0, 0);
};

gameScene.update = function(){
  if (this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }

  let playerRect = this.player.getBounds();

  this.enemies.getChildren().forEach(function(enemy){
    let enemyRect = enemy.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
      console.log('Game Over');
      this.scene.restart();
      return;
    }

    enemy.y += enemy.speed;

    let conditionUp = enemy.speed < 0 && enemy.y <= this.enemyMinY;
    let conditionDown = enemy.speed > 0 && enemy.y >= this.enemyMaxY;

    if (conditionUp || conditionDown) {
      enemy.speed *= -1;
    }
  }, this);
};

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

let game = new Phaser.Game(config);
