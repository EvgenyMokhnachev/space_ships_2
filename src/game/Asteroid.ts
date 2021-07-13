import DynamicObject from "./DynamicObject";
import {Speeds} from "./Speeds";
import Sequence from "./Sequence";
import Point from "../common/Point";
import CircleCollision from "./collisions/CircleCollision";

class Asteroid extends DynamicObject {
  id: number;
  spinRight: boolean;

  constructor(
    options?: {
      id?: number,
      position?: Point,
      angle?: number
      moving?: boolean,
      radius?: number,
      spinRight?: boolean
    }
  ) {
    super({
      position: options?.position || new Point(0, 0),
      speed: Speeds.ASTEROID,
      angle: options?.angle,
      rotateSpeed: Speeds.ASTEROID_ROTATE,
      moving: options?.moving,
      radius: options?.radius || 100
    });
    this.id = options?.id || Sequence.get();
    this.spinRight = options?.spinRight || false;

    this.addCollision(new CircleCollision(this.position, new Point(0,0), this.radius));
  }

  rotate() {
    super.rotate(this.spinRight);
  }

}

export default Asteroid;
