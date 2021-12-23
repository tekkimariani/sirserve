export class SirData {
    sim: number;
    day: number;
    suscepible: number = 0;
    infected: number = 0;
    removed: number = 0;
    addSuscepible(s: number = 1) {
        this.suscepible+=s;
    }
    addInfected(i: number = 1) {
        this.infected+=i;
    }
    addRemoved(r: number = 1) {
        this.removed+=r;
    }
}
