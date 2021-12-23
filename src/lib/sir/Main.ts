import { Graphics } from "../awt/Graphics";
import { GameEngine } from "../game/GameEngine";
import { WorldManager } from "../game/WorldManager";
import { World } from "../game/World";
import { Person } from "./Person";
import { SirData } from './SirData';
import { Settings } from './Settings';
export class Main {
    // Programmzeug
    engine: GameEngine; // Ist mittlerweile glaub ich überflüssig...
    // graphics: Graphics = new Graphics(); // Läd den Canvas für die einzelnen Schritte.

    // SIR-Daten
    sirdata: SirData[] = [];
    sirdataSim: SirData[] = [];
    // Parameters
    amount: number = Settings.getAmount();
    infected: number = Settings.getInfected();
    maxSimulations = Settings.getMaxSimulations();
    maxDaysPerSimulation: number = Settings.getMaxDaysPerSimulation();
    stepsPerDay: number = Settings.getStepsPerDay();

    static infectionRate: number = Settings.getInfectionRate();
    static criticalDistance: number = Settings.getCriticalDistance();
    infectionDuration: number = Settings.getInfectionDuration();

    // Programmablauf
    run: boolean = false;
    renderSteps: boolean = false; // Ob überhaupt die Personen gerendert werden. Kann man ohne Zeitliche verzögerung nicht sehen....
    renderDelay: number = 0; // Verzögerung in Millisekunden
    sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    constructor(){
        this.world();
    }
    start(){
        if(!this.run){
            this.run = true;
            this.world();
        }
    }
    resetWorld() {
        WorldManager.currentWorld = new World();
        // console.log('Build world.');
        // Add some WorldBorders
        // WorldManager.currentWorld.add(new Border(new Vector2D(-10, -10), new Vector2D(2, Global.getDisplayHeight()+10)));
        // WorldManager.currentWorld.add(new Border(new Vector2D(-10, -10), new Vector2D(Global.getDisplayWidth()+10, 2))); //Top
        // WorldManager.currentWorld.add(new Border(new Vector2D(Global.getDisplayWidth(), -10), new Vector2D(Global.getDisplayWidth()-2, Global.getDisplayHeight()+10))); //Right
        // WorldManager.currentWorld.add(new Border(new Vector2D(-10, Global.getDisplayHeight()-2), new Vector2D(Global.getDisplayWidth()+10, Global.getDisplayHeight()+10))); //Bottom
        // Infected Persons:
        for(let i=0;i<this.infected;i++){
            WorldManager.currentWorld.add(new Person(true));
        }
        // Add Some more Persons:
        for(let i=0;i<(this.amount-this.infected);i++){
            WorldManager.currentWorld.add(new Person());
        }
        // console.log('World is Ready.');
        // console.log('We have now ' + WorldManager.currentWorld.getPersons().length + ' Persons.');
    }
    async world() {
        // Datenspeicher vorbereiten:
        for(let i = 1; i <= this.maxDaysPerSimulation; i++) {
            this.sirdata.push(new SirData());
        }

        // 1. Simulationen
        for(let i=0; i<this.maxSimulations; i++) {
            // console.log('Start Simulation #' + (i+1) + '.');
            this.resetWorld();
            // 2. Tage in einer Simulation
            for(let j=1; j<=this.maxDaysPerSimulation; j++) {
                // console.log('Day #' + j + '.');
                 // 3. Schritte die eine Person pro Tag macht
                for(let k=0; k<=this.stepsPerDay; k++) {
                    // console.log('Step #' + k + '.');
                    // 4. Ein Schritt.
                    WorldManager.currentWorld.getObjects().forEach((o) => {
                        if(o instanceof Person) {
                            o.update();
                        }
                    });
                    if(this.renderSteps) {
                        /*
                        this.graphics.clearCanvas();
                        WorldManager.currentWorld.getObjects().forEach((o) => {
                            o.render(this.graphics);
                        });
                        await this.sleep(this.renderDelay);
                        */
                    }
                }
                // 5. Tagesdaten updaten
                WorldManager.currentWorld.getObjects().forEach((o) => {
                    if(o instanceof Person) {
                        if(o.infected === true) {
                            o.infectedDays++;
                            if(o.infectedDays > this.infectionDuration) {
                                o.remove();
                            }
                        }
                    }
                });
                // 6. Daten pro Tag sammeln
                const sirDay = new SirData();
                WorldManager.currentWorld.getObjects().forEach((o) => {
                    if(o instanceof Person) {
                        sirDay.sim = (i);
                        sirDay.day = (j-1);
                        if(o.suscepible === true) {
                            sirDay.addSuscepible();
                        }
                        if(o.infected === true) {
                            sirDay.addInfected();
                        }
                        if(o.removed === true){
                            sirDay.addRemoved();
                        }
                    }
                });
                this.sirdataSim.push(sirDay);
            }
            //

            // console.log(this.sirdataSim);
            this.sirdataSim.forEach((sds, index)=> {
                this.sirdata[sds.day].addSuscepible(sds.suscepible);
                this.sirdata[sds.day].addInfected(sds.infected);
                this.sirdata[sds.day].addRemoved(sds.removed);
            });
            this.sirdataSim = [];
        }
        // Alle Simulationen abgeschlossen.
        // Daten mitteln:


        this.sirdata.forEach((sd,index)=>{
            sd.suscepible = sd.suscepible/this.maxSimulations;
            sd.infected = sd.infected/this.maxSimulations;
            sd.removed = sd.removed/this.maxSimulations;
        });
        // Daten sind da:
        // console.log(this.sirdata);

        // this.run = false;
        // this.plot();
        return this.sirdata;
    }
    plot() {
        const plot = document.getElementById('plot') as HTMLCanvasElement;
        const ctx = plot.getContext("2d");
        let last: SirData = null;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0,0,400,400);
        this.sirdata.forEach((sir,index)=>{
            // Suscepible
            ctx.fillStyle = '#000000';
            ctx.fillRect(index*4, (100-(sir.suscepible/this.amount*100))*4, 1, 1);
            ctx.strokeStyle = '#FF0000';
            // ctx.arc(index*4, (100-(sir.suscepible/this.amount*100))*4, 0.5, 0, 2 * Math.PI);

            ctx.stroke();
            // Infected
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(index*4, (100-(sir.infected/this.amount*100))*4, 1, 1);
            ctx.strokeStyle = '#0000FF';
            // ctx.arc(index*4, (100-(sir.infected/this.amount*100))*4, 0.5, 0, 2 * Math.PI);
            ctx.stroke();
            // Removed
            ctx.fillStyle = '#CCCCCC';
            ctx.fillRect(index*4, (100-(sir.removed/this.amount*100))*4, 1, 1);
            ctx.strokeStyle = '#CCCCCC';
            // ctx.arc(index*4, (100-(sir.removed/this.amount*100))*4, 0.5, 0, 2 * Math.PI);
            ctx.stroke();


            last = sir;
        });
    }

}