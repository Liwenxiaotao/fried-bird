class Bird {
  constructor(game) {
    this.game = game;
    this.x = (this.game.canvas.width - 85)/2;
    this.y = 100;
    this.w = 85;
    this.h = 60;
    this.state = 0;
    this.swing = 0;
    this.swingSpeed = 5;
    this.state = 0;
    this.dropSFrame = this.game.frame.currentFrame;
    this.ro = 0;
    this.detaY = 1;
    this.birdDie = false;
    this.dieAnimate = 0;
    this.bindClickListener();
  }
  update() {
    if (this.birdDie) {
      this.dieAnimate++
      if(this.dieAnimate === 30) {
        this.game.stop();
      }
      return;
    }
    if (this.game.frame.currentFrame % this.swingSpeed === 0) {
      this.swing++
      if (this.swing % 3 === 0){
        this.swing = 0;
      }
    }
    if (this.game.gameBegin) {
      if (this.state === 0) {
        this.swingSpeed = 5;
        this.dY = 0.01 * Math.pow(this.game.frame.currentFrame - this.dropSFrame, 2);
        this.ro ++;
      } else if (this.state === 1) {
        this.detaY += 1;
        this.dY = -14 + this.detaY;
        if (this.dY > 0){
          this.state = 0;
          this.dropSFrame = this.game.frame.currentFrame;
        }
      }
      this.y += this.dY;
    }

    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > this.game.canvas.height - 50 - this.h) {
      this.game.gameOver();
    }
  }
  render() {
    const ctx = this.game.ctx;
    if (this.birdDie) {
      const row = parseInt(this.dieAnimate / 5);
      const col = this.dieAnimate % 5;
      ctx.drawImage(this.game.imgObj.blood, 325 * col, 138 * row, 325, 138, this.x - 155, this.y + 50, 325, 138);
      return;
    }
    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h/2);
    ctx.rotate((Math.PI / 180) * this.ro);
    ctx.translate(-(this.x + this.w / 2), -(this.y + this.h/2));
    ctx.drawImage(this.game.imgObj.bird, this.w * this.swing, 0, this.w, this.h, this.x, this.y, this.w, this.h);
    ctx.restore();
  }
  bindClickListener() {
    this.game.canvas.addEventListener('mousedown', () => {
      this.game.gameBegin = true;
      if (this.game.gameBegin) {
        this.fly();
      }
      if (this.game.gameEnd) {
        window.location.reload();
      }
    })
    this.game.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.game.gameBegin = true;
      if (this.game.gameBegin) {
        this.fly();
      }
      if (this.game.gameEnd) {
        window.location.reload();
      }
    })
  }
  fly() {
    this.state = 1;
    this.ro = -25;
    this.detaY = 1;
    this.swingSpeed = 2;
    if (this.y < 0) {
      this.y = 0;
    }
  }
}

module.exports = Bird;