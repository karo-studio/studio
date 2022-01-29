import { Game } from "./character"
import { Size, Vector2 } from "./math"

interface StudioEngineData {
    handToolData: {
        position?: Vector2
    }
}

/**
 * Class use to handling 
 */
export default class StudioEngine {
    private _canvas:HTMLCanvasElement

    private graphic:CanvasRenderingContext2D

    private oldTime: number = 0

    /**
     * Current tool use perform action on the canvas during game development.
     */
    public tool:"handTool"|"pickTool" = "pickTool"

    public handToolPosition:Vector2 = new Vector2(0, 0)

    public data:StudioEngineData = {
        handToolData: {
            position: undefined
        }
    }

    private _size:Size

    private _gameCharacter:Game

    /**
     * The base character use to draw the game
     */
    public get gameCharacter():Game {
        return this._gameCharacter
    }
    
    /**
     * Size of canvas to draw the game.
     */
    public get size(): Size {
        return this._size
    }

    /**
     * HTMLCanvasElement instance use to draw the game.
     */
    public get canvas(): HTMLCanvasElement {
        return this._canvas
    }

    constructor(
        { 
            canvas,
            size = new Size(600, 400)
        }:{ 
            /**
             * HTMLCanvasElement instance use to draw the game.
             */
            canvas:HTMLCanvasElement 
            /**
             * Size of canvas to draw the game.
             */
            size?: Size
        }
    ) {
        let { height, width } = size
        this._canvas = canvas
        this._size = size
        this._canvas.style.height = `${height}px`
        this._canvas.style.width = `${width}px`
        this._gameCharacter = new Game(this)
        this.graphic = this._canvas.getContext("2d") as CanvasRenderingContext2D
        this._gameCharacter.drawingBoard = {
            size: new Size(width, height).div(1.15),
            color: "#ffffff",
            position: new Vector2(width, height).multiply(0.5)
        }
        const loopCallback = (time:number) => {
            let dt = (time - this.oldTime)/1000
            this.oldTime = time
            this.graphic = this.sharpenCanvas(canvas)
            this.update(dt)
            this.graphic.clearRect(0, 0, width, height)
            this.render(this.graphic)
            requestAnimationFrame(loopCallback)
        }
        requestAnimationFrame(loopCallback)
    }

    /**
     * Start running game. 
     */
    public start(): void {
        let { height, width } = this.size
        this._gameCharacter.drawingBoard = {
            size: new Size(width, height),
            color: "#ffffff",
            position: new Vector2(width, height).multiply(0.5)
        }
        this._gameCharacter.gameState = "running"
    }

    /**
     * Stop running game.
     */
    public stop(): void {
        let { height, width } = this.size
        this._gameCharacter.drawingBoard = {
            size: new Size(width, height).div(1.15),
            color: "#ffffff",
            position: new Vector2(width, height).multiply(0.5)
        }
        this._gameCharacter.gameState = "developing"
    }

    /**
     * Set how large or small the game character is rendered.
     */
    public zoom(percentage:number): void {
        if (percentage <= 10) {
            this._gameCharacter.zoom = 10/100
        } else if (percentage >= 1200) {
            this._gameCharacter.zoom = 1200/100
        } else {
            this._gameCharacter.zoom = percentage/100
        }
    }

    /**
     * Sharpen the game canvas for a crisp effect.
     */
    private sharpenCanvas(canvas:HTMLCanvasElement): CanvasRenderingContext2D {
        var dpr = window.devicePixelRatio || 1
        var rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        var ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.constructor.prototype.devicePixelRatio = dpr
        ctx.scale(dpr, dpr)
        return ctx
    } 

    /**
     * Method called to update the game character.
     * @param dt difference between current time(in milliseconds) and last time(in milliseconds) the game character were updated.
     */
    private update(dt:number): void {
        this._gameCharacter.update(dt)
    }

    /**
     * Method called to draw the game character.
     * @param graphic CanvasRenderingContext2D instance use to draw the game character.
     */
    private render(graphic:CanvasRenderingContext2D): void {
        this._gameCharacter.render(graphic)
    }
}