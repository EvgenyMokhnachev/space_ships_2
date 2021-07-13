import PositionedObject from "../PositionedObject";
import Point from "../../common/Point";

abstract class Collision extends PositionedObject {
  private basePosition: Point;
  private rotatedPosition: Point;

  constructor(basePosition: Point, position: Point) {
    super(position);
    this.basePosition = basePosition;
    this.rotatedPosition = position;
  }

  abstract isCollision(collision: Collision): boolean;

  getMainPosition(): Point {
    return new Point(this.basePosition.x + this.rotatedPosition.x, this.basePosition.y + this.rotatedPosition.y);
  }

  rotate(angle: number) {
    if (this.position.x === 0 && this.position.y === 0) return this.position;
    const angleToDeg = Math.PI / 180 * (angle);
    const cosAngle = Math.cos(angleToDeg);
    const sinAngle = Math.sin(angleToDeg);

    this.rotatedPosition = new Point(
      this.position.x * cosAngle + (-this.position.y) * sinAngle,
      this.position.x * sinAngle + this.position.y * cosAngle
    );
  }

}

export default Collision;
