class FrameUtil{
  constructor() {
    this.currentFrame = 0;
    this.sFrame = 0;
    this.sTime = new Date();
    this.realFps = 0;
  }
  update() {
    this.currentFrame++;
    const endTime = new Date();
    if (endTime - this.sTime >=1000) {
      this.realFps = this.currentFrame - this.sFrame;
      this.sFrame = this.currentFrame;
      this.sTime = endTime;
    }
  }
}

module.exports = FrameUtil;