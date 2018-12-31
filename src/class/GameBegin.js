class GameOver {
  constructor(game) {
    this.game = game;
    this.x = (this.game.canvas.width - 337)/2;
    this.y = 150;
  }
  updated () {
    
  }
  
  render() {
    this.game.ctx.drawImage(this.game.imgObj.gamebegin, 0, 0, 337, 75, this.x, this.y, 337, 75,);
  }
}

module.exports = GameOver;