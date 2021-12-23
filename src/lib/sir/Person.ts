import { Graphics } from '../awt/Graphics';
import { Rectangle } from '../awt/Rectangle';
import { Vector2D } from '../awt/Vector2D';
import { GameObject } from '../game/GameObject';
import { WorldManager } from '../game/WorldManager';
import { Maths } from '../lang/Maths';
import { Settings } from './Settings';


export class Person extends GameObject {
    pos: Vector2D; // x und y
    suscepible: boolean = true;
    infected: boolean = false;
    removed: boolean = false;
    infectedDays: number = 0;
    color = "#00FF00";
    constructor(infected: boolean = false) {
        super();
        if(infected === true) {
            this.infect();
        }
        this.setSolid(true);
        this.pos = new Vector2D(Maths.getRandomInt(200)+100,Maths.getRandomInt(200)+100);
        this.bounds = new Rectangle(this.pos.getX(), this.pos.getX(), 2, 2);
    }
    tryToInfect() {
        // Wahrscheinlichkeit für Ansteckung
        if(Math.random() > Settings.getInfectionRate()){
            return;
        }
        this.infect();
    }
    infect() {
        this.suscepible = false;
        this.infected = true;
    }
    remove() {
        this.suscepible = false;
        this.infected = false;
        this.removed = true;
    }
    update() {
        // Bewegung pro Step
        // for(let i = 0; i < 10; i++) {
            const test = new Vector2D(this.pos.getX(), this.pos.getY());
            const a = new Vector2D();
            const angle = Maths.getRandomInt(360);
            a.setFromAngle(Maths.degreesToRadians(angle), 1);
            test.add(a);
            // Renn nicht aus dem Bildbims. Genau genommen unnötig...
            // if (!this.doesCollide()) {
                // Links klappt der Collider nicht richtig - möglicherweise ist das Rectangle falsch?!
                // Dort laufen die Personen aus dem Bild.
                // Außerdem bleiben Personen derzeit an den Borders hängen, wenn die darauf treffen - grade das soll ja vermieden werden.
                // Personen sollten nicht an Personen hängen bleiben.
                this.pos = test;
                this.bounds.setCenter(this.pos);
                // break;
            // }
        // }
        // Wenn ich ansteckend bin...
        if(this.infected === true) {
            // Prüfe Distanzen zu anderen Personen:
            WorldManager.currentWorld.getObjects().forEach((o) => {
                if (o instanceof Person) {
                    if (this.pos.distance(o.pos) < Settings.getCriticalDistance()) {
                        // Nah genug für Ansteckung.
                        o.tryToInfect();
                    }
                }
            });
        }
    }
    render(g: Graphics): void {
        if (this.suscepible) {
            this.color = '#FF0000';
        } else if (this.removed) {
            this.color = '#0000FF';
        } else {
            this.color = '#00FF00';
        }

        const c = g.getCtx();
        // g.line(this.bounds.center.getX(), 0, this.bounds.center.getX(), Global.getDisplayHeight(), '#FF0000');
        // g.line(0, this.bounds.center.getY(), Global.getDisplayWidth(), this.bounds.center.getY(), '#FF0000');
        g.drawRect(this.bounds.ul.getX(), this.bounds.ul.getY(), this.bounds.getWidth(), this.bounds.getHeight(), this.color);

        // g.drawPoint(this.pos.getX(), this.pos.getY(), this.color);
        /*
        const ctx: CanvasRenderingContext2D = g.getCtx();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        */
    }


}