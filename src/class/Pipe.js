const _ = require('underscore');
class Pipe {
  constructor(game) {
    this.game = game;
    this.type = _.random(0, 1);
    this.h = _.random(140, this.game.canvas.height / 2);
    this.x = this.game.canvas.width;
    this.y = this.type === 0 ? this.game.canvas.height - this.h - 44 : 0;
    this.w = 148;
    this.speed = 3;
    this.done = false;
  }
  update() {
    this.x -= this.speed;
    if (this.x < -this.w) {
      this.game.pipeArray = _.without(this.game.pipeArray, this);
    }

    // 碰撞检测
    if (this.game.bird.x > this.x - this.game.bird.w && this.game.bird.x < this.x + this.game.bird.w) {
      if (this.type === 0) {
        if (this.game.bird.y > this.y - this.game.bird.h) {
          this.game.gameOver();
          return;
        }
      } else if (this.type === 1) {
        if (this.game.bird.y < this.h) {
          this.game.gameOver();
          return;
        }
      }
    }

    if (!this.done && this.x < this.game.canvas.width / 2 - this.w){
      this.done = true;
      this.game.score.addOne();
    }
  }

  render() {
    if (this.type === 0) {
      this.game.ctx.drawImage(this.game.imgObj.pipe0, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
    } else if (this.type === 1) {
      this.game.ctx.drawImage(this.game.imgObj.pipe1, 0, 1664 - this.h, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }
  pause() {
    this.speed = 0;
  }
}

module.exports = Pipe;