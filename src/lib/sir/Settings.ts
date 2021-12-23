export class Settings {
    // Parameters
    private static amount: number = 1000;     // Anzahl Personen.
    private static infected: number = 2;   // Anzahl anfangs infizierter Personen.
    private static maxSimulations = 1; // Anzahl an Simulationen die nacheinander durchlaufen werden.
    private static maxDaysPerSimulation: number = 100;    // Anzahl an Tagen die Simuliert wird.
    private static stepsPerDay: number = 15;             // Anzahl an Schritte die eine Person an einem Tag macht.

    private static infectionRate: number = 0.67 // Wahrscheinlichkeit zur Ansteckung?
    private static criticalDistance: number = 5;
    private static infectionDuration: number = 5;

    static setAmount(amount: number): void {
        this.amount = amount;
    }
    static setInfected(infected: number): void {
        this.infected = infected;
    }
    static setMaxSimulations(maxSimulations: number): void {
        this.maxSimulations = maxSimulations;
    }
    static setStepsPerDay(stepsPerDay: number): void {
        this.stepsPerDay = stepsPerDay;
    }
    static setMaxDaysPerSimulation(maxDaysPerSimulation: number): void {
        this.maxDaysPerSimulation = maxDaysPerSimulation;
    }
    static setInfectionRate(infectionRate: number): void {
        this.infectionRate = infectionRate;
    }
    static setCriticalDistance(criticalDistance: number): void {
        this.criticalDistance = criticalDistance;
    }
    static setInfectionDuration(infectionDuration: number): void {
        this.infectionDuration = infectionDuration;
    }

    static getAmount(): number {
        return this.amount;
    }
    static getInfected(): number {
        return this.infected;
    }
    static getMaxSimulations(): number {
        return this.maxSimulations;
    }
    static getStepsPerDay(): number {
        return this.stepsPerDay;
    }
    static getMaxDaysPerSimulation() {
        return this.maxDaysPerSimulation;
    }
    static getInfectionRate(): number {
        return this.infectionRate;
    }

    static getCriticalDistance(): number {
        return this.criticalDistance;
    }
    static getInfectionDuration(): number {
        return this.infectionDuration;
    }
}