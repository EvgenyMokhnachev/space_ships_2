import Collision from "./Collision";
import Point from "../../common/Point";

class CircleCollision extends Collision {
  radius: number

  constructor(basePosition: Point, position: Point, radius: number) {
    super(basePosition, position);
    this.radius = radius;
  }

  isCollision(collision: Collision): boolean {
    if (collision instanceof CircleCollision) {
      // OLD IMPLEMENTATION WITH 'SQRT'
      // const distanceBetweenCentersOfCircles = Math.sqrt(
      //   Math.pow(collision.getMainPosition().x - this.getMainPosition().x, 2) +
      //   Math.pow(collision.getMainPosition().y - this.getMainPosition().y, 2)
      // );
      // const radiusSum = (this.radius + collision.radius);
      // return radiusSum >= distanceBetweenCentersOfCircles;

      let radiusSum = collision.radius + this.radius;
      radiusSum *= radiusSum;
      return radiusSum >= (
        Math.pow(collision.getMainPosition().x - this.getMainPosition().x, 2) +
        Math.pow(collision.getMainPosition().y - this.getMainPosition().y, 2)
      );
    }

    return false;
  }

}

export default CircleCollision;
