class Background {
  constructor(param){
    this.image = param.image;
    this.width = param.width;
    this.height = param.height;
    this.speed = param.speed;
    this.y = param.y;
    this.game = param.ctx;
    this.x = 0;
    this.amount = parseInt(this.game.canvas.width / this.width) + 1;
  }

  update() {
    this.x -= this.speed;
    if (this.x <= -this.width * this.amount) {
      this.x = 0;
    }
  }

  render() {
    for (let i = 0; i < this.amount*2; i++){
      this.game.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x + this.width*i, this.y, this.width, this.height)
    }
  }
  pause() {
    this.speed = 0;
  }
}

module.exports = Background;