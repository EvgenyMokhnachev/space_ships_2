import Ship from "./Ship";
import Key from "./Key";
import Asteroid from "./Asteroid";
import Point from "../common/Point";
import Random from "../utils/Random";
import DynamicObject from "./DynamicObject";

class Game {
    mainShip: Ship = null;
    ships: Record<number, Ship> = {};
    asteroids: Asteroid[] = [];
    dynamicObjects: DynamicObject[] = [];

    pressedKeys: Record<Key, boolean> = {
        [Key.Up]: false,
        [Key.Right]: false,
        [Key.Left]: false,
        [Key.Down]: false,
    };

    addAsteroid(options?: {
        position?: Point
    }): Asteroid {
        const asteroid = new Asteroid({
            radius: 100,
            spinRight: Random.generateBool(),
            position: options?.position
        });
        this.asteroids.push(asteroid);
        this.dynamicObjects.push(asteroid);
        return asteroid;
    }

    addShip(main?: boolean, options?: {angle?: number, position?: Point}): Ship {
        const ship: Ship = new Ship({
            angle: options?.angle || 90,
            position: options?.position
        });
        this.ships[ship.id] = ship;
        if (main) {
            this.mainShip = ship;
        }
        this.dynamicObjects.push(ship);
        return ship;
    }

    processCollisions() {
        this.dynamicObjects.forEach((itemFirst: DynamicObject) => {
            this.dynamicObjects.forEach((itemSecond: DynamicObject) => {
                if (itemFirst !== itemSecond) {
                    if (itemFirst.isCollision(itemSecond)) {
                        console.log('IS COLLISION!');
                        itemFirst.addCollisionObject(itemSecond);
                        itemSecond.addCollisionObject(itemFirst);
                    } else {
                        itemFirst.removeCollisionObject(itemSecond);
                        itemSecond.removeCollisionObject(itemFirst);
                    }
                }
            })
        })
    }

    process() {
        this.processCollisions();

        this.asteroids.forEach(item => item.rotate());

        if (this.pressedKeys[Key.Right]) {
            this.mainShip.rotate(true);
        }

        if (this.pressedKeys[Key.Left]) {
            this.mainShip.rotate();
        }

        if (this.pressedKeys[Key.Up]) {
            this.mainShip.move(true);
        }

        if (this.pressedKeys[Key.Down]) {
            this.mainShip.move();
        }
    }

    pressKey(key: Key) {
        this.pressedKeys[key] = true;
    }

    resumeKey(key: Key) {
        this.pressedKeys[key] = false;
    }

    getShips(): Ship[] {
        const result: Ship[] = [];
        for (let i in this.ships) {
            result.push(this.ships[i]);
        }
        return result;
    }

    getAsteroids(): Asteroid[] {
        return this.asteroids;
    }

}

export default Game;
