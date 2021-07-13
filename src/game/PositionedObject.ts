import Point from "../common/Point";

class PositionedObject {
    position: Point;

    constructor(position: Point) {
        this.setPosition(position);
    }

    setPosition(position: Point) {
        this.position = position || new Point(0,0);
    }
}

export default PositionedObject;
