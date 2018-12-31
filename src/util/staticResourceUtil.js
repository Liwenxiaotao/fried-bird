
class StaticResourceUtil {
  constructor() {
    this.alreadyNum = 0;
    this.images = {};
  }
  loadImage(image, cb){
    image.images.forEach(item => {
      const img = new Image();
      img.onload = () => {
        this.alreadyNum++;
        this.images[item.name] = img;
        cb(this.alreadyNum, image.images.length, this.images);
      }
      img.src = item.src;
    });
  }
}


module.exports = StaticResourceUtil;