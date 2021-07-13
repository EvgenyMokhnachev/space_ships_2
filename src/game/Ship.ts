import DynamicObject from "./DynamicObject";
import {Speeds} from "./Speeds";
import Sequence from "./Sequence";
import Point from "../common/Point";
import CircleCollision from "./collisions/CircleCollision";

class Ship extends DynamicObject {
  id: number;

  constructor(
    options?: {
      id?: number,
      position?: Point,
      angle?: number
      moving?: boolean
    }
  ) {
    super({
      position: options?.position,
      speed: Speeds.SHIP,
      angle: options?.angle,
      rotateSpeed: Speeds.SHIP_ROTATE,
      moving: options?.moving,
      radius: 20
    });
    this.id = options?.id || Sequence.get();

    this.addCollision(new CircleCollision(this.position, new Point(15, 0), this.radius/5));

    this.addCollision(new CircleCollision(this.position, new Point(-19, 19), this.radius/10));
    this.addCollision(new CircleCollision(this.position, new Point(-19, -19), this.radius/10));

    this.addCollision(new CircleCollision(this.position, new Point(-14, 15), this.radius/8));
    this.addCollision(new CircleCollision(this.position, new Point(-14, -15), this.radius/8));

    this.addCollision(new CircleCollision(this.position, new Point(-7, 11), this.radius/6));
    this.addCollision(new CircleCollision(this.position, new Point(-7, -11), this.radius/6));

    this.addCollision(new CircleCollision(this.position, new Point(0, 7), this.radius/4));
    this.addCollision(new CircleCollision(this.position, new Point(0, -7), this.radius/4));

    this.addCollision(new CircleCollision(this.position, new Point(3, 6), this.radius/4));
    this.addCollision(new CircleCollision(this.position, new Point(3, -6), this.radius/4));

    this.addCollision(new CircleCollision(this.position, new Point(9, 3), this.radius/4));
    this.addCollision(new CircleCollision(this.position, new Point(9, -3), this.radius/4));
  }

}

export default Ship;
