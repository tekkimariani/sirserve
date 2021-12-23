import { Graphics } from '../awt/Graphics';
import { Rectangle } from '../awt/Rectangle';
import { Vector2D } from '../awt/Vector2D';
import { GameObject } from '../game/GameObject';

export class Border extends GameObject {
    pos: Vector2D;
    // shape: Rectangle;
    color = "#0000FF";
    constructor(ul: Vector2D, br: Vector2D) {
        super();
        this.setSolid(true);
        this.bounds = new Rectangle(ul, br);
        // console.log(this.shape);
    }
    update() {
        //
    }
    render(g: Graphics): void {
        // console.log('I try...');
        g.drawRect(this.bounds.ul.getX(), this.bounds.ul.getY(), this.bounds.getWidth(), this.bounds.getHeight(), this.color);
    }
}