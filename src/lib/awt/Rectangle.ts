import { Shape2D } from './Shape2D';
import { Vector2D } from './Vector2D';

export class Rectangle implements Shape2D {
    ul: Vector2D;
    br: Vector2D;
    center: Vector2D;
    private width: number;
    private height: number;
    constructor(upperleft: Vector2D, bottomrigth: Vector2D);
    constructor(upperleft: Vector2D, width: number, height: number);
    constructor(x: number, y: number, width: number, height: number);
    constructor(arg0: Vector2D | number, arg1: Vector2D | number = 0, arg2?: number, arg3?: number) {
        if (arg0 instanceof Vector2D && arg1 instanceof Vector2D) {
            this.ul = arg0;
            this.br = arg1;
            this.width = this.br.getX() - this.ul.getX();
            this.height = this.br.getY() - this.ul.getY();
            this.center = new Vector2D(this.width/2, this.height/2);
        } else if (arg0 instanceof Vector2D && typeof arg1 === "number" && typeof arg2 === "number") {
            this.ul = arg0;
            this.width = arg1;
            this.height = arg2;
            this.br = new Vector2D(this.ul.getX()+this.width, this.ul.getY()+this.height);
            this.center = new Vector2D(this.width/2, this.height/2);
        } else if (typeof arg0 === "number" && typeof arg1 === "number" && typeof arg2 === "number" && typeof arg3 === "number") {
            this.ul = new Vector2D(arg0, arg1);
            this.width = arg2;
            this.height = arg3;
            this.br = new Vector2D(this.ul.getX()+this.width, this.ul.getY()+this.height);
            this.center = new Vector2D(this.width/2, this.height/2);
        } else {
            throw new TypeError("Wrong argument types.");
        }
    }
    setCenter(center: Vector2D): Rectangle;
    setCenter(x: number, y: number): Rectangle;
    setCenter(arg0: Vector2D | number, arg1?: number): Rectangle {
        if(typeof arg0 === "number" && typeof arg1 === "number") {
            this.center.setX(arg0);
            this.center.setY(arg1);
        } else if(arg0 instanceof Vector2D) {
            this.center = arg0;
        } else {
            throw new TypeError("Wrong argument types.");
        }
        this.ul.setX(this.center.getX()-this.width/2);
        this.ul.setY(this.center.getY()-this.height/2);
        this.br.setX(this.center.getX()+this.width/2);
        this.br.setY(this.center.getY()+this.height/2);
        return this;
    }
    // Set length around the center
    // Set height around the center
    getWidth(): number {
        return this.width;
    }
    getHeight(): number {
        return this.height;
    }
    area(): number {
        return this.width*this.height;
    }

}