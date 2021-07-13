import Point from "../common/Point";
import PositionedObject from "./PositionedObject";
import Collision from "./collisions/Collision";

const frameProcessTime = 50;
const degInPI = 180;

class DynamicObject extends PositionedObject {
  speed: number;
  moving: boolean;
  lastMovingTime: number;
  angle: number;
  rotateSpeed: number;
  lastRotateTime: number;
  radius: number;

  private collisions: Collision[] = [];
  private collisionObjects: DynamicObject[] = [];

  constructor(options?: { position?: Point, radius: number, speed: number, angle: number, rotateSpeed: number, moving: boolean }) {
    super(options?.position);
    this.speed = options?.speed || 0;
    this.angle = options?.angle || 0;
    this.rotateSpeed = options?.rotateSpeed || 0;
    this.moving = options?.moving || false;
    this.radius = options?.radius || 0;
    this.processRelations();
  }

  rotate(right?: boolean) {
    const currTime = new Date().getTime();
    if (!this.lastRotateTime) this.lastRotateTime = currTime;
    const timeDiff = currTime - this.lastRotateTime;
    this.lastRotateTime = currTime;
    if (timeDiff > frameProcessTime) return;
    const angleDiff = timeDiff * this.rotateSpeed;
    this.angle += right ? angleDiff : -(angleDiff);
    if (this.angle > 360) this.angle -= 360;
    if (this.angle < 0) this.angle = 360 + this.angle;
    this.processRelations();
  }

  processRelations() {
    this.collisions.forEach(collision => {
      collision.rotate(this.angle);
    });
  }

  private getMoveTimeDiff(): number {
    const currTime = new Date().getTime();
    if (!this.lastMovingTime) this.lastMovingTime = currTime;
    const timeDiff = currTime - this.lastMovingTime;
    this.lastMovingTime = currTime;
    if (timeDiff > frameProcessTime) return 0;
    return timeDiff;
  }

  private getMoveVec(): Point {
    const moveDiff = 1;
    const angleToDeg = Math.PI / degInPI * this.angle;
    return new Point(
      Math.cos(angleToDeg),
      Math.sin(angleToDeg)
    );
  }

  move(forward?: boolean) {
    const timeDiff = this.getMoveTimeDiff();
    if (timeDiff === 0) return;

    let moveVec = this.getMoveVec();
    const diffX = (moveVec.x * timeDiff * (forward ? this.speed : (-this.speed)));
    const diffY = (moveVec.y * timeDiff * (forward ? this.speed : (-this.speed)));

    let allowToMoveCount = 0;
    this.collisionObjects.forEach((collisionObject: DynamicObject) => {
      const r = collisionObject.radius;
      const x0 = collisionObject.position.x;
      const y0 = collisionObject.position.y;
      const x1 = this.position.x;
      const y1 = this.position.y;
      const x2 = this.position.x + diffX;
      const y2 = this.position.y + diffY;

      if (this.isMoveFromCenter(x0, y0, x1, y1, x2, y2)) {
        allowToMoveCount++;
      }
    });
    if (allowToMoveCount < this.collisionObjects.length) {
      return;
    }

    this.position.x += diffX;
    this.position.y += diffY;
  }

  isCollision(object: DynamicObject) {
    let isCollision: boolean = false;
    object.collisions.forEach(collisionFirst => {
      if (!isCollision) {
        this.collisions.forEach(collisionSecond => {
          if (!isCollision && collisionFirst.isCollision(collisionSecond)) {
            isCollision = true;
          }
        })
      }
    })
    return isCollision;
  }

  addCollision(collision: Collision) {
    this.collisions.push(collision);
    this.processRelations();
  }

  getCollisions() {
    return this.collisions;
  }

  addCollisionObject(object: DynamicObject) {
    const foundIndex = this.collisionObjects.findIndex((collisionObject: DynamicObject) => collisionObject === object);
    if (foundIndex === -1) this.collisionObjects.push(object);
  }

  removeCollisionObject(object: DynamicObject) {
    const foundIndex = this.collisionObjects.findIndex((collisionObject: DynamicObject) => collisionObject === object);
    if (foundIndex > -1) this.collisionObjects.splice(foundIndex, 1);
  }

  getCollisionsObjects(): DynamicObject[] {
    return this.collisionObjects;
  }

  isMoveFromCenter(x0: number, y0: number, // центр и рдиус окружности
                   x1: number, y1: number,           // точки
                   x2: number, y2: number           //    отрезка
  ): boolean {
    if (
      //  вектор находится в 1 четверти. Направлен от центра окружности
      (x1 > x0 && y1 > y0) ||
      //  вектор находится в 4 четверти. Направлен от центра окружности
      (x1 > x0 && y1 < y0) ||
      //  вектор находится в 2 четверти. Направлен от центра окружности
      (x1 < x0 && y1 > y0) ||
      //  вектор находится в 3 четверти. Направлен от центра окружности
      (x1 < x0 && y1 < y0)
    ) {
      const xy1LengthToCircleCenter = (
        Math.pow(x0 - x1, 2) +
        Math.pow(y0 - y1, 2)
      );

      const xy2LengthToCircleCenter = (
        Math.pow(x0 - x2, 2) +
        Math.pow(y0 - y2, 2)
      );

      if (xy2LengthToCircleCenter > xy1LengthToCircleCenter) {
        return true;
      }
    }

    return false;
  }

}

export default DynamicObject;
