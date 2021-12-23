export class Vector2D {
    /*
    SKALARPDODUKT
    Kreuzprodukt ist Dot?
    */
    x:number;
    y:number;
    constructor(x:number = 0.0, y:number = 0.0) {
        // Position in der Welt
        this.x = x;
        this.y = y;
    }
    set(x:number, y:number) {
        // Position in der Welt
        this.x = x;
        this.y = y;
    }
    setFromAngle(angle: number, length: number) {
        // Wie in 1.1 Schritt 2, allerdings sind dort sin und cos vertauscht,
        // welche differenz ergibt das? Liegt das am umgedrehten Koordinatensystem?
        this.x = Math.sin(angle) * length;
        this.y = Math.cos(angle) * length;
    }
    setX(x:number) {
        this.x = x;
    }
    setY(y:number) {
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    add (vector: Vector2D): Vector2D {
        this.setX(this.getX()+vector.getX());
        this.setY(this.getY()+vector.getY());
        return this;
    }
    sub (vector: Vector2D): Vector2D {
        this.setX(this.getX()-vector.getX());
        this.setY(this.getY()-vector.getY());
        return this;
    }
    negate(): Vector2D {
        this.setX(-this.x);
        this.setY(-this.y);
        return this;
    }
    scale(s: number): Vector2D {
        this.setX(s * this.getX());
        this.setY(s * this.getY());
        return this;
    }
    equals(obj: any): boolean {
        if(obj instanceof Vector2D){
            const vector = obj as Vector2D;
            return (this.getX()===vector.getX()&&this.getY()===vector.getY())
        }
        return false;
    }
    epsilonEquals(vector: Vector2D, epsilon: number) {
        // Returns true if the L-infinite distance between this
        // tuple and tuple t1 is less than or equal to the epsilon
        // parameter, otherwise returns false.
        throw new Error("Not implemented, yet.");
    }
    toString(): string {
        return "Vector3D: ( " + this.getX() + " | " + this.getY() + " );";
    }
    dot(vector: Vector2D): number {
        return this.getX() * vector.getX() + this.getY() * vector.getY();
    }
    length(): number {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared(): number {
        return this.getX() * this.getX() + this.getY() * this.getY();
    }
    normalize(): Vector2D {
        // console.log('Bei normalize stimmt was nicht. :/');
        this.scale(1/this.length());
        return this;
    }
    angle(vector: Vector2D): number {
        // angle of 2 relative to 1= atan2(v2.y,v2.x) - atan2(v1.y,v1.x)
        return (Math.atan2(vector.getY(),vector.getX()) - Math.atan2(this.getY(),this.getX()));
    }
    distance(vector: Vector2D): number {
        if (this.equals(vector)) {
            return 0;
        }
        // Kosinussatz :
        // a² = b² + c² - 2bc cos alpha

        // b = this && c = vector
        const alpha = this.angle(vector);
        return Math.sqrt(this.lengthSquared() + vector.lengthSquared() - 2 * this.length() * vector.length() * Math.cos(alpha));
    }
}
