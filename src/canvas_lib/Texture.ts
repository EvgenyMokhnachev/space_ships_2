import Point from "../common/Point";
import Render from "./Render";
import Canvas from "./Canvas";
import Style from "./Style";
import Resource from "../resources/Resource";
import ImageResource from "../resources/ImageResource";
import Size from "../common/Size";

class Texture implements Render {
  position: Point = new Point(0, 0);
  rotationAngle: number = 0;
  resource: ImageResource;
  size: Size;

  constructor(size: Size) {
    this.size = size;
  }

  addPosition(point: Point): Texture {
    this.position = point;
    return this;
  }

  setAngle(angleInDeg: number): Texture {
    this.rotationAngle = angleInDeg;
    return this;
  }

  render(canvasWrapper: Canvas): Texture {
    let ctx: CanvasRenderingContext2D = canvasWrapper.context;
    ctx.save();
    ctx.beginPath();

    ctx.translate(canvasWrapper.center.x - this.position.x, canvasWrapper.center.y - this.position.y);
    ctx.rotate(this.rotationAngle*Math.PI/180);
    ctx.drawImage(this.resource.image,
      -(this.size.w / 2 * canvasWrapper.ratio),
      -(this.size.h / 2 * canvasWrapper.ratio),
      this.size.w * canvasWrapper.ratio,
      this.size.h * canvasWrapper.ratio
    );
    ctx.rotate(this.rotationAngle*Math.PI/180);

    ctx.closePath();
    ctx.restore();

    return this;
  }

  setImage(resource: ImageResource): Texture {
    this.resource = resource;
    return this;
  }

}

export default Texture;
