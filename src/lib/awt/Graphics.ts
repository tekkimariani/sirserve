export class Graphics {
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    constructor(canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        if (this.canvas==null) {
            throw new ReferenceError('Need <canvas id="canvas">-Element to work.');
        }
        // Global.setDisplayWidth(this.canvas.width);
        // Global.setDisplayHeight(this.canvas.height);

        this.ctx =  this.canvas.getContext("2d");
        this.line(0,0,this.canvas.width,this.canvas.height,'#FFF');
        // this.ctx.translate(0.5, 0.5);
        this.clearCanvas();
    }
    getCtx():CanvasRenderingContext2D {
        return this.ctx;
    }
    clearCanvas(color:string = '#FFF'):void {
        this.drawRect(0, 0, this.canvas.width, this.canvas.height, color);
    }

    drawRect(x:number, y:number, width:number, heigth:number, color:string):void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, heigth);
        this.ctx.fill();
        this.ctx.stroke()
    }

    drawPoint(x:number, y:number, color:string):void {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }
    line(x1: number, y1: number, x2: number, y2: number, color: string) {
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
        x2 = Math.floor(x2);
        y2 = Math.floor(y2);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        this.ctx.shadowBlur = 0;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
}