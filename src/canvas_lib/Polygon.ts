import Point from "../common/Point";
import Render from "./Render";
import Canvas from "./Canvas";
import Style from "./Style";

class Polygon implements Render {
  position: Point = new Point(0, 0);
  points: Point[] = [];
  rotationAngle: number = 0;
  style: Style = {
    fillColor: 'transparent',
    lineWidth: 0,
    strokeColor: 'transparent'
  };

  setStyle(style: Style): Polygon {
    this.style = style;
    return this;
  }

  addPosition(point: Point): Polygon {
    this.position = point;
    return this;
  }

  setAngle(angleInDeg: number): Polygon {
    this.rotationAngle = angleInDeg;
    return this;
  }

  private rotatePoint(point: Point): Point {
    const angleToDeg = Math.PI / 180 * this.rotationAngle;
    const cosAngle = Math.cos(angleToDeg);
    const sinAngle = Math.sin(angleToDeg);
    return new Point(point.x * cosAngle + (-point.y) * sinAngle, point.x * sinAngle + point.y * cosAngle);
  }

  render(canvasWrapper: Canvas): Polygon {
    let ctx: CanvasRenderingContext2D = canvasWrapper.context;

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.style.fillColor;
    ctx.strokeStyle = this.style.strokeColor;
    ctx.lineWidth = this.style.lineWidth;
    this.points.forEach((point: Point) => {
      const rotatedPoint = this.rotatePoint(point);
      ctx.lineTo(
        canvasWrapper.center.x - this.position.x + rotatedPoint.x,
        canvasWrapper.center.y - this.position.y + rotatedPoint.y
      );
    });
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    return this;
  }

  addPoint(point: Point): Polygon {
    this.points.push(point);
    return this;
  }

}

export default Polygon;
