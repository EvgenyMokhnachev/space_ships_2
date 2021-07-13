import Ship from "../game/Ship";
import CanvasRenderItem from "./CanvasRenderItem";
import Canvas from "../canvas_lib/Canvas";
import Polygon from "../canvas_lib/Polygon";
import Point from "../common/Point";
import Circle from "../canvas_lib/Circle";

class ShipCanvasImpl extends CanvasRenderItem {
  item: Ship;
  color: string = '#b3d3b3';

  constructor(item: Ship) {
    super();
    this.item = item;
  }

  setColor(color: string) {
    this.color = color;
  }

  render(canvasWrapper: Canvas): void {
    this.item.getCollisions().forEach((collision: any) => {
      const shape = new Circle({
        radius: collision.radius,
        position: collision.getMainPosition(),
        style: {fillColor: '#f0f0f0', strokeColor: '#f0f0f0', lineWidth: 2}
      }).render(canvasWrapper);
    })

    const shape = new Polygon()
      .addPosition(new Point(this.item.position.x, this.item.position.y))
      .setStyle({
        fillColor: this.color,
        lineWidth: 1
      })

      .setAngle(this.item.angle)

      .addPoint(new Point(-this.item.radius, 0))
      .addPoint(new Point(this.item.radius, this.item.radius))
      .addPoint(new Point(0, 0))
      .addPoint(new Point(this.item.radius, -this.item.radius))
      .addPoint(new Point(-this.item.radius, 0))

      .render(canvasWrapper);
  }

}

export default ShipCanvasImpl;
