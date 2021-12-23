import { Graphics } from '../awt/Graphics';
import { WorldManager } from './WorldManager';

export class GameEngine {
    graphics: Graphics;
    // objects: GameObject[] = [];
    loop: boolean;
    constructor(canvas: HTMLCanvasElement){
        this.graphics = new Graphics(canvas);
    }
    /*
    add(object: GameObject) {
        this.objects.push(object);
    }
    remove(object: GameObject) {
        const id = this.objects.indexOf(object);
        if (id > -1) {
            this.objects.splice(id, 1);
        }
    }
    */
    start() {
        this.loop = true;
        this.render();
    }
    stop() {
        this.loop = false;
    }
    update() {
        WorldManager.currentWorld.getObjects().forEach((o) => {
            o.update();
        });
    }
    render() {
        if(this.loop===false){
            return;
        }
        this.update();
        this.graphics.clearCanvas();
        WorldManager.currentWorld.getObjects().forEach((o) => {
            o.render(this.graphics);
        });
        requestAnimationFrame(() => this.render());
    }
}
