import { GameObject } from './GameObject';

export class World {
    private static objects: GameObject[] = [];
    constructor(){
        World.objects = [];
    }
    add(object: GameObject) {
        World.objects.push(object);
    }
    remove(object: GameObject) {
        const id = World.objects.indexOf(object);
        if (id > -1) {
            World.objects.splice(id, 1);
        }
    }
    getObjects(): GameObject[] {
        return World.objects;
    }
}
