import Canvas from "../canvas_lib/Canvas";

abstract class CanvasRenderItem {

    abstract render(canvasWrapper: Canvas): void;

}

export default CanvasRenderItem;