class GameBegin {
  constructor(game) {
    this.game = game;
    this.x = (this.game.canvas.width - 624 * 0.7)/2;
    this.y = 50;
  }
  updated () {
    
  }
  
  render() {
    this.game.ctx.drawImage(this.game.imgObj.gameover, 0, 0, 626, 144, this.x, this.y, 624 * 0.7, 144 * 0.7, );
  }
}

module.exports = GameBegin;