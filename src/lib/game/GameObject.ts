import { Graphics } from '../awt/Graphics';
import { Rectangle } from '../awt/Rectangle';
import { Vector2D } from '../awt/Vector2D';
import { WorldManager } from './WorldManager';

export class GameObject {
    protected solid: boolean;
    pos: Vector2D;
    bounds: Rectangle;
    constructor() {
        this.solid = false;
        this.pos = new Vector2D();
        this.bounds = new Rectangle(new Vector2D(0, 0), new Vector2D(0, 0));
    }
    update(): void { /**/ };
    render(g:Graphics): void { /**/ };
    setSolid(solid: boolean): void { this.solid = solid; }
    isSolid(): boolean { return this.solid; };
    isCollide(o: GameObject): boolean {
        if(
            this.bounds.center.getX() - this.bounds.getWidth() / 2 > o.bounds.center.getX() - o.bounds.getWidth() / 2 &&
            this.bounds.center.getX() + this.bounds.getWidth() / 2 < o.bounds.center.getX() + o.bounds.getWidth() / 2 &&
            this.bounds.center.getY() - this.bounds.getHeight() / 2 > o.bounds.center.getY() - o.bounds.getHeight() / 2 &&
            this.bounds.center.getY() + this.bounds.getHeight() / 2 < o.bounds.center.getY() + o.bounds.getHeight() / 2
        ) {
            return true;
        }
        return false;
    }
    doesCollide(): boolean {
        const posMyLeft = this.bounds.ul.getX();
        const posMyRight = this.bounds.br.getX();
        const posMyTop = this.bounds.ul.getY();
        const posMyBottom = this.bounds.br.getY();
        for(const go of WorldManager.currentWorld.getObjects()){
            if (!go.isSolid()) {
                continue;
            }
            const posOtherLeft = go.bounds.ul.getX();
            const posOtherRight = go.bounds.br.getX();
            const posOtherTop = go.bounds.ul.getY();
            const posOtherBottom = go.bounds.br.getY();
            if (posMyLeft < posOtherRight && posMyRight > posOtherLeft && posMyBottom > posOtherTop && posMyTop < posOtherBottom) {
                return true;
            }
        }
        return false;
    }
    /*
        protected List<GameObject> getColliders(double x, double y) {
        List<GameObject> colliders = new LinkedList<>();
        double posMyLeft = x - width / 2;
        double posMyRight = x + width / 2;
        double posMyTop = y - height / 2;
        double posMyBottom = y + height / 2;
        for (GameObject go : WorldManager.currentWorld.getGameObjects()) {
            if (go == this || !go.isSolid()) {
                continue;
            }
            double posOtherLeft = go.getX() - go.getWidth() / 2;
            double posOtherRight = go.getX() + go.getWidth() / 2;
            double posOtherTop = go.getY() - go.getHeight() / 2;
            double posOtherBottom = go.getY() + go.getHeight() / 2;
            if (posMyLeft < posOtherRight && posMyRight > posOtherLeft && posMyBottom > posOtherTop && posMyTop < posOtherBottom) {
                colliders.add(go);
            }
        }
        return colliders;
    }
    */
    getColliders(vector: Vector2D): GameObject[] {
        const colliders: GameObject[] = [];
        const posMyLeft = vector.getX() - this.bounds.getWidth() / 2;
        const posMyRight = vector.getX() + this.bounds.getHeight() / 2;
        const posMyTop = vector.getY() - this.bounds.getWidth() / 2;
        const posMyBottom = vector.getY() + this.bounds.getHeight() / 2;
        for(const go of WorldManager.currentWorld.getObjects()){
            if (!go.isSolid()) {
                continue;
            }
            const posOtherLeft = go.bounds.ul.getX();
            const posOtherRight = go.bounds.br.getX();
            const posOtherTop = go.bounds.ul.getY();
            const posOtherBottom = go.bounds.br.getY();
            if (posMyLeft < posOtherRight && posMyRight > posOtherLeft && posMyBottom > posOtherTop && posMyTop < posOtherBottom) {
                colliders.push(go);

            }
        }
        return colliders;
    }

}