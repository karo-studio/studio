export default class Size {
    private _height:number

    private _width:number

    constructor(width:number = 0, height:number = 0) {
        this._height = height
        this._width = width
    }

    public set height(value:number) {
        this._height = value
    }

    public get height(): number {
        return this._height
    }

    public get width(): number {
        return this._width
    }

    public set width(value:number) {
        this._width = value
    }


    /**
     * The aspect ratio of this size.
     */
    public get aspectRatio(): number {
        if (this.height != 0.0)
        return this.width / this.height
        if (this.width > 0.0)
            return Infinity
        if (this.width < 0.0)
            return -Infinity
        return 0.0
    }

    /**
     * A Size with the width and height swapped.
     */
    public get flipped(): Size {
        return new Size(this.height, this.width)
    }

    /**
     * Whether both components are finite (neither infinite nor NaN).
     */
    public get isFinite(): boolean {
        return (isFinite(this.height) && isFinite(this.width))
    }

    /**
     * The greater of the magnitudes of the width and the height.
     */
    public get longestSide(): number {
        return Math.max(this.height, this.width)
    }

    /**
     * The lesser of the magnitudes of the width and the height.
     */
    public get shortestSide(): number {
        return Math.min(this.height, this.width)
    }

    /**
     * Creates an instance of Size that has the same values of another.
     * @param size the Size instance to copy from.
     */
    public copy(size: Size): Size {
        return new Size(size.width, size.height)
    }

    /**
     * Creates a square Size whose width and height are twice the given dimension.
     */
    public fromRadius(dimension:number) {
        return new Size(dimension * 2, dimension * 2)
    }

    /**
     * Creates a Size with the given height and an infinite width.
     */
    public fromHeight(height:number): Size {
        return new Size(Infinity, height)
    }

    /**
     * Creates a Size with the given width and an infinite height.
     */
    public fromWidth(width:number): Size {
        return new Size(width, Infinity)
    }

    /**
     * Creates a square Size whose width and height are the given dimension.
     */
    public square(dimension:number): Size {
        return new Size(dimension, dimension)
    }

    /**
     * Convert the size instance to an 2-dimension array of numbers.
     */
    public toArray(): number[] {
        return [this.width, this.height]
    }

    /**
     * Convert the Size to an object.
     */
    public toObject(): {width: number, height: number} {
        return {
            width: this.width,
            height: this.height
        }
    }

    /**
     * Divide the Size by a number or Size.
     */
    public div(by:Size|number): Size {
        if (typeof by == "number")
            return new Size(this._width/by, this._height/by)
        else (by instanceof Size)
            return new Size(this._width/by.width, this._height/by.height)
    }

    /**
     * Subtract the Size from a Size.
    */
     public subtr(from:Size): Size {
        return new Size(this._width*from.width, this._height*from.height)
    }

    /**
     * Add the Size to a Size.
    */
    public add(to:Size): Size {
        return new Size(this._width*to.width, this._height*to.height)
    }

    /**
     * Multiply the Size by a number or Size.
    */
    public multiply(by:Size|number): Size {
        if (typeof by == "number")
            return new Size(this._width*by, this._height*by)
        else (by instanceof Size)
            return new Size(this._width*by.width, this._height*by.height)
    }

    /**
     * Convert the Size to string.
     */
    public toString(): string {
        return `Size(${this.width}, ${this.height})`
    }
}