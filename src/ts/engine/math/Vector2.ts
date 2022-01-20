export default class Vector2 {
    public x:number

    public y:number

    constructor (x:number = 0, y:number = 0) {
        this.x = x
        this.y = y
    }

    /**
     * Add other vectors to the vector.
     */
    public add(...others:Array<Vector2>): Vector2 {
        let returnValue:Vector2  = this
        if (others.length == 1) {
            let other:Vector2 = others[0]
            returnValue = new Vector2(returnValue.x + other.x, returnValue.y + other.y)
        } else if (others.length > 1) {
            others.forEach(other => {
                returnValue = returnValue.add(other)
            })
        }
        return returnValue
    } 
    
    /**
     * Subtract other vectors to the vector.
     */
    public subtr(...others:Array<Vector2>): Vector2 {
        let returnValue:Vector2  = this
        if (others.length == 1) {
            let other:Vector2 = others[0]
            returnValue = new Vector2(returnValue.x - other.x, returnValue.y - other.y)
        } else if (others.length > 1) {
            others.forEach(other => {
                returnValue = returnValue.subtr(other)
            })
        }
        return returnValue
    } 

    /**
     * Dot product between this vector and another vector.
     */
    public dot(other:Vector2): number {
        return ((this.x * other.x) + (this.y * other.y))
    }

    /**
     * Divide other vectors to the vector.
     */
    public div(...others:Array<Vector2>): Vector2 {
        let returnValue:Vector2  = this
        if (others.length == 1) {
            let other:Vector2 = others[0]
            returnValue = new Vector2(returnValue.x / other.x, returnValue.y / other.y)
        } else if (others.length > 1) {
            others.forEach(other => {
                returnValue = returnValue.div(other)
            })
        }
        return returnValue
    }

    /**
     * Multiply other vectors or number to the vector.
     */
    public multiply(...others:Array<Vector2|number>): Vector2 {
        let returnValue:Vector2  = this
        if (others.length == 1) {
            let other:Vector2|number = others[0]
            if (typeof other == "number") {
                returnValue = new Vector2(returnValue.x * other, returnValue.y * other)
            } else {
                returnValue = new Vector2(returnValue.x * other.x, returnValue.y * other.y)
            }
        } else if (others.length > 1) {
            others.forEach(other => {
                returnValue = returnValue.multiply(other)
            })
        }
        return returnValue
    }

    /**
     * Convert the vector to an number type array.
     */
    public toArray(): number[] {
        return [this.x, this.y]
    }

    /**
     * Convert the vector to a string.
     */
    public toString(): string {
        return `Vector2(${this.x}, ${this.y})`
    }

    /**
     * Convert the vector to an object.
     */
    public toObject(): {x:number, y:number} {
        return {
            x: this.x,
            y: this.y
        }
    }

    /**
     * Angle of the vector.
     */
    public angle() : number {;
        return Math.tan((this.y/this.x))
    }

    /**
     * Magnitude of the vector.
     */
    public magnitude(): number {
        return Math.sqrt(Math.abs(this.x) ** 2 + Math.abs(this.y) ** 2)
    }

    /**
     * Normalize the vector.
     */
    public normalize(): Vector2 {
        let length:number = this.magnitude()
        let returnVector2:Vector2 = new Vector2(0, 0)
        if (length > 0.00001) {
            returnVector2.x = this.x/length
            returnVector2.y = this.y/length
        }
        return returnVector2
    }

}