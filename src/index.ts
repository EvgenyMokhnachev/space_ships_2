import Game from './game/Game';
import KeyCodeParser from "./utils/KeyCodeParser";
import Key from "./game/Key";
import ShipCanvasImpl from "./game_render/ShipCanvasImpl";
import Ship from "./game/Ship";
import Canvas from "./canvas_lib/Canvas";
import Point from "./common/Point";
import AsteroidCanvasImpl from "./game_render/AsteroidCanvasImpl";
import Asteroid from "./game/Asteroid";
import Random from "./utils/Random";

const canvas: HTMLCanvasElement = document.querySelector(".game_canvas");
const canvasWrapper: Canvas = new Canvas(canvas);

const game: Game = new Game();
const mainShip = game.addShip(true);
game.addShip(false, {
    position: new Point(100, 100)
});
game.addAsteroid({position: new Point(Random.generate(-300, 300), Random.generate(-300, 300))});

renderFrame();
function renderFrame() {
    processFrame();
    window.requestAnimationFrame(renderFrame);
}



function processFrame() {
    game.process();

    canvasWrapper.clear();
    canvasWrapper.setOffset(new Point(mainShip.position.x, mainShip.position.y));

    const ships: Ship[] = game.getShips();
    ships.forEach(item => {
        const renderItem = new ShipCanvasImpl(item);
        if (renderItem.item === mainShip) renderItem.setColor('#f0c790');
        renderItem.render(canvasWrapper);
    });

    const asteroids: Asteroid[] = game.getAsteroids();
    asteroids.forEach(item => {
        const renderItem = new AsteroidCanvasImpl(item);
        renderItem.render(canvasWrapper);
    });
}

window.onkeydown = (e: KeyboardEvent) => {
    const key: Key = KeyCodeParser.parseKeyboardKey(e);
    if (key) {
        game.pressKey(key);
    }
};

window.onkeyup = (e: KeyboardEvent) => {
    const key: Key = KeyCodeParser.parseKeyboardKey(e);
    if (key) {
        game.resumeKey(key);
    }
};
