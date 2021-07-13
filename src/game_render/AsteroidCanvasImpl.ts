import CanvasRenderItem from "./CanvasRenderItem";
import Canvas from "../canvas_lib/Canvas";
import Asteroid from "../game/Asteroid";
import Texture from "../canvas_lib/Texture";
import Resource from "../resources/Resource";
import Size from "../common/Size";
import Circle from "../canvas_lib/Circle";

class AsteroidCanvasImpl extends CanvasRenderItem {
  item: Asteroid;

  constructor(item: Asteroid) {
    super();
    this.item = item;
  }

  render(canvasWrapper: Canvas): void {
    this.item.getCollisions().forEach((collision: any) => {
      const shape = new Circle({
        radius: collision.radius,
        position: collision.getMainPosition(),
        style: {fillColor: '#f0f0f0', strokeColor: '#f0f0f0', lineWidth: 2}
      }).render(canvasWrapper);
    })

    const shape = new Texture(new Size(this.item.radius, this.item.radius))
      .addPosition(this.item.position)
      .setImage(Resource.ASTEROID_1)
      .setAngle(this.item.angle)
      .render(canvasWrapper);
  }

}

export default AsteroidCanvasImpl;
