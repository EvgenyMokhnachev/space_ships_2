import Point from "../common/Point";

class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    ratio: number;
    center: Point;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.ratio = this.getPixelRatio(this.context);
        this.initCanvasSize();
        window.onresize = this.initCanvasSize.bind(this);
    }

    initCanvasSize() {
        this.canvas.width = this.canvas.clientWidth * this.ratio;
        this.canvas.height = this.canvas.clientHeight * this.ratio;
        this.context.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        this.initCenter();
    }

    getPixelRatio(context: any): number {
        const dpr = window.devicePixelRatio || 1,
            bsr = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;

        return dpr / bsr;
    }

    clear() {
        this.context.fillStyle = 'rgb(74,74,74)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = null;
    }

    initCenter(): Point {
        return this.center = new Point(
          this.context.canvas.width / 2 / this.ratio,
          this.context.canvas.height / 2 / this.ratio
        );
    }

    setOffset(offset: Point) {
        const center = this.initCenter();
        center.x += offset.x;
        center.y += offset.y;
    }

}

export default Canvas;
