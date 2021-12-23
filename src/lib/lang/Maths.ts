export class Maths {
    // static random() { return Math.random }
    static getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    static radiansToDegrees(radians: number) {
        // const radians_to_degrees = rad => (rad * 180.0) / Math.PI;
        return (radians * 180.0) / Math.PI;
    }
    static degreesToRadians(degrees: number){
        return degrees * (Math.PI/180);
    }
}