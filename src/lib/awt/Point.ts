export class Point {
    x:number;
    y:number;
    constructor(x:number, y:number) {
        // Position in der Welt
        this.x = x;
        this.y = y;
    }
    setX(x:number) {
        this.x = x;
    }
    setY(y:number) {
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}

