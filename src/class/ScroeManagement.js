class ScoreManagement {
  constructor (game) {
    this.game = game;
    this.score = 0;
  }
  addOne() {
    this.score++;
  }
  update() {

  }
  render() {
    const scoreArr = this.score.toString().split('');
    const basePos = this.game.canvas.width / 2 - ((40 * scoreArr.length) / 2);

    scoreArr.forEach((item,index) => {
      this.game.ctx.drawImage(this.game.imgObj.number, 40 * parseInt(item), 0, 40, 57, basePos + 40 * index, 100, 40,57);
    });
  }
}



module.exports = ScoreManagement;