import { Size, Vector2 } from "."

export default class Rect{
    public x: number

    public y: number

    public height: number

    public width: number

    constructor(x: number, y: number, height: number, width: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    /**
     * Creates an instance of Rect from a Vector and Size.
     * @param vector the vector2 {xy-direction} to create the Rect with.
     * @param size the Size to create the Rect with. 
     */
    public fromVectorSize(vector:Vector2, size:Size): Rect {
        return new Rect(
            vector.x,
            vector.y,
            size.width,
            size.height
        )
    }

    public isVectorInPath(vector:Vector2): boolean {
        const {x, y} = vector
        return this.isPointInPath(x, y)
    }

    public isPointInPath(x:number, y:number): boolean {
        if ((x >= this.x && x <= this.width + this.x) && (y >= this.y && y <= this.height + this.y))
            return true
        else
            return false
    }

    /**
     * Creates an instance of Rect that has the same values of another.
     * @param rect the Rect instance to copy from.
     */
    public copy(rect: Rect): Rect {
        return new Rect(rect.x, rect.y, rect.width, rect.height)
    }
    
    /**
     * Convert the Rect to an object.
     */
     public toObject(): {x: number, y: number, width: number, height: number} {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
    }

    /**
     * Convert the Rect instance to string.
     */
    public toString(): string {
        return `Rect {`
            .concat(`\n\tx: ${this.x}`)
            .concat(`\n\ty: ${this.y}`)
            .concat(`\n\twidth: ${this.width}}`)
            .concat(`\n\theight: ${this.height}}`)
            .concat(`\n}`)
    }
}
