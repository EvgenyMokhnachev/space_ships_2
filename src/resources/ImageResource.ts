class ImageResource {
  onLoadCallbacks: object[] = [];
  image: HTMLImageElement;

  constructor(src: string) {
    this.image = new Image();
    this.image.src = src;
    this.image.onload = () => {
      this.onLoadCallbacks.forEach(callback => callback);
    }
  }

  onLoad(callback: object) {
    this.onLoadCallbacks.push(callback);
  }

}

export default ImageResource;
