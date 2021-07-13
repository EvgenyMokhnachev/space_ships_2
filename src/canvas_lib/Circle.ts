import Point from "../common/Point";
import Render from "./Render";
import Canvas from "./Canvas";
import Style from "./Style";
import Resource from "../resources/Resource";
import ImageResource from "../resources/ImageResource";
import Size from "../common/Size";

class Texture implements Render {
  style: Style;
  position: Point = new Point(0, 0);
  radius: number;

  constructor(options?: {radius?: number, position?: Point, style?: Style}) {
    this.setPosition(options?.position);
    this.setStyle(options?.style)
    this.setRadius(options?.radius);
  }

  setStyle(style: Style) {
    this.style = style;
    return this;
  }

  setPosition(point: Point): Texture {
    this.position = point;
    return this;
  }

  setRadius(radius: number) {
    this.radius = radius;
    return this;
  }

  render(canvasWrapper: Canvas): Texture {
    let ctx: CanvasRenderingContext2D = canvasWrapper.context;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.style.fillColor;
    ctx.strokeStyle = this.style.strokeColor;
    ctx.lineWidth = this.style.lineWidth;
    ctx.arc(canvasWrapper.center.x - this.position.x, canvasWrapper.center.y - this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    return this;
  }

}

export default Texture;
