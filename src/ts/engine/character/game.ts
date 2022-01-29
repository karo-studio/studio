import StudioEngine from ".."
import InputDetector from "../core/InputDetector"
import { Size, Vector2 } from "../math"

interface DrawingBoardRect {
    /**
     * size of the drawing board
     */
    size: Size 
    /**
     * color of the drawing board
     */
    color: string
    /**
     * position(in vector) of the drawing board
     */
    position: Vector2
}

export default class Game {
    private studio:StudioEngine

    /**
     * Current state of the game. whether in development or running state
     */
    public gameState:"running"|"developing" = "developing"

    private _drawingBoard!:DrawingBoardRect

    /**
     * How large or small the game character children are draw with respect to it scale
     */
    public zoom:number = 1

    private inputDetector: InputDetector

    /**
     * Base character of every game. Use to draw the entry game.
     * @param studio an instance of the StudioEngine class.
     */
    constructor(studio:StudioEngine) {
        this.studio = studio
        this.inputDetector = new InputDetector({
            canvas: studio.canvas,
            onDrag: ({ position }) => {
                if (this.gameState == "developing" && this.studio.tool == "handTool") {
                    if (this.studio.data.handToolData.position != undefined) {
                        this.studio.handToolPosition.x += position.x - this.studio.data.handToolData.position.x 
                        this.studio.handToolPosition.y += position.y - this.studio.data.handToolData.position.y
                    }
                    this.studio.data.handToolData.position = position
                }
            },
            onDragEnd: () => {
                if (this.gameState == "developing" && this.studio.tool == "handTool") {
                    this.studio.data.handToolData.position = undefined
                }
            },
            onLeave: () => {
                if (this.gameState == "developing" && studio.tool == "handTool") {
                    this.studio.data.handToolData.position = undefined
                }
            }
        })
    }

    public set drawingBoard(rect:DrawingBoardRect) {
        this._drawingBoard = rect
    }

    /**
     * Method called to draw the game character children.
     * @param graphic CanvasRenderingContext2D instance use to draw the game character children.
     */
    public render(graphic:CanvasRenderingContext2D): void {
        if (this._drawingBoard != null || this._drawingBoard != undefined) {
            const {
                position,
                size,
                color
            } = this._drawingBoard
            const { height, width } = size
            let { x, y } = position
            graphic.save()
            let zoom:number
            if (this.gameState == "developing") {
                x = (x - (width * this.zoom)/2) + this.studio.handToolPosition.x
                y = (y - (height * this.zoom)/2) + this.studio.handToolPosition.y
                zoom = this.zoom
            } else {
                x = (x - (width * 1)/2) + 0
                y = (y - (height * 1)/2) + 0
                zoom = 1
            }
            graphic.translate(x, y)
            graphic.rotate(0 * Math.PI/180)
            graphic.scale(zoom, zoom)
            graphic.translate(-x, -y)
            graphic.fillStyle = color
            graphic.fillRect(x, y, width, height)
            graphic.restore()
        } 
    }

    /**
     * Method called to update the game character children.
     * @param dt difference between current time(in milliseconds) and last time(in milliseconds) the game character children were updated.
     */
    public update(dt:number): void {}

}