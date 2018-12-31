const FrameUtil = require('../util/frameUtil')
const StaticResourceUtil = require('../util/staticResourceUtil')
const image = require('../r.js')
const Background = require('./Background')
const Birl = require('./Birl')
const Pipe = require('./Pipe')
const Score = require('./ScroeManagement')
const GameBegin = require('./GameBegin')
const GameOver = require('./GameOver')

class Game {
  constructor(paramJson) {
    this.fps = paramJson.fps || 60;
    this.timer = null;
    this.frame = new FrameUtil();
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.imgObj = {};
    this.pipeArray = [];
    this.gameBegin = false;
    this.gameEnd = false;
    new StaticResourceUtil().loadImage(image,(alreadyLoadNum, allNum, imagesObj) => {
      if (alreadyLoadNum === allNum) {
        this.imgObj = imagesObj;
        this.run();
      }
    })
  }
  run() {
    this.timer = setInterval(() => {
      this.mainloop();
    },1000 / this.fps);


    this.sGame = new GameBegin(this);
    this.OGame = new GameOver(this)
    // 演员列表
    this.fangzi = new Background({
      image : this.imgObj.fangzi,
      width: 300,
      height : 256,
      speed : 1,
      y : this.canvas.height - 296,
      ctx: this
    });
    this.dashu = new Background({
      image : this.imgObj.shu,
      width : 300,
      height : 216,
      speed : 2,
      y : this.canvas.height - 264,
      ctx: this
    });
    this.diban = new Background({
      image: this.imgObj.diban,
      width:48,
      height: 48,
      speed: 3,
      y: this.canvas.height - 48,
      ctx: this
    })

    this.bird = new Birl(this)
    this.score = new Score(this);
  }

  // 主循环
  mainloop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.frame.update();
    this.ctx.font="16px Consolas";
    this.ctx.fillText(`FPS / ${this.frame.realFps}`, 10, 20);
    this.ctx.fillText(`FNO / ${this.frame.currentFrame}`, 10, 40);

    // 房子更新渲染
    this.fangzi.update();
    this.fangzi.render();
    // 大树更新渲染
    this.dashu.update();
    this.dashu.render();
    // 地板更新渲染
    this.diban.update();
    this.diban.render();

    this.bird.update();
    this.bird.render();

    if (!this.gameEnd && this.frame.currentFrame % 120 === 0 && this.gameBegin) {
      this.pipeArray.push(new Pipe(this));
    }
    this.pipeArray.forEach((pipe) => {
      pipe.update();
      if (pipe) {
        pipe.render();
      }
    })
    if (this.gameBegin) {
      this.score.update();
      this.score.render();
    }

    if (!this.gameBegin) {
      this.sGame.render();
    }
    if (this.gameEnd) {
      this.OGame.render();
      this.sGame.render();
    }

  }

  // 暂停游戏
  stop() {
    clearInterval(this.timer);
  }
  gameOver() {
    this.fangzi.pause();
    this.diban.pause();
    this.dashu.pause();
    this.gameEnd = true;
    this.pipeArray.forEach((item) => {
      item.pause();
    })
    this.bird.birdDie = true;
  }
}

module.exports = Game;