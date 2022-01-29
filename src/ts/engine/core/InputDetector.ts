import { Vector2 } from "../math"

type InputDetectionType = "move" | "release" | "right release" | "press" | "right press" | "drag"|"drag end"

interface InputDetectorEvent {
    position: Vector2
    time: number
    type: InputDetectionType
}

/**
 * Core class for the purpose of handling input delectations in the game
 */
export default class InputDetector {

    private isPointerPressed:boolean = false

    private isDragging:boolean = false

    private canvas:HTMLCanvasElement

    private onDrag:((ev: InputDetectorEvent) => void) | undefined = undefined
    
    private onPress:((ev: InputDetectorEvent) => void) | undefined = undefined
    
    private onRelease:((ev: InputDetectorEvent) => void) | undefined = undefined
    
    private onMove:((ev: InputDetectorEvent) => void) | undefined = undefined
    
    private onRightPress:((ev: InputDetectorEvent) => void) | undefined = undefined
    
    private onRightRelease:((ev: InputDetectorEvent) => void) | undefined = undefined
    
    private onDragEnd:((ev: InputDetectorEvent) => void) | undefined = undefined

    constructor(
        {
            canvas,
            onDrag,
            onPress,
            onRelease,
            onMove,
            onRightPress,
            onRightRelease,
            onDragEnd,
            onLeave
        }:{ 
            /**
             * Game canvas to add the input detection to 
             */
            canvas:HTMLCanvasElement,
            /**
             * Callback called when a click action occur on the game canvas
             */
            onPress?: (ev:InputDetectorEvent) => void,
            /**
             * Callback called after a click action occur on the game canvas
             */
            onRelease?: (ev:InputDetectorEvent) => void,
            /**
             * Callback called when a right click action occur on the game canvas
             */
            onRightPress?: (ev:InputDetectorEvent) => void,
            /**
             * Callback called after a right click action occur on the game canvas
             */
            onRightRelease?: (ev:InputDetectorEvent) => void,
            /**
             * Callback called when a drag action occur on the game canvas
             */
            onDrag?: (ev:InputDetectorEvent) => void,
            /**
             * Callback called when a pointer device enters the game canvas
             */
            onMove?: (ev:InputDetectorEvent) => void,
            /**
             * Callback called after a drag action occur on the game canvas
             */
            onDragEnd?: (ev:InputDetectorEvent) => void,
            /**
             * Callback called when a pointer device leaves the game canvas
             */
            onLeave?: () => void
        }
    ) {
        this.canvas = canvas
        this.onDragEnd = onDragEnd
        this.onDrag = onDrag
        this.onMove = onMove
        this.onPress = onPress
        this.onRelease = onRelease
        this.onRightPress = onRightPress
        this.onRightRelease = onRightRelease
        this.canvas.ondragstart = () => false
        canvas.style.touchAction = "none"
        canvas.addEventListener("pointerdown", (e) => this.inputHandler(e))
        canvas.addEventListener("pointermove", (e) => this.inputHandler(e))
        canvas.addEventListener("pointerover", (e) => this.inputHandler(e))
        canvas.addEventListener("pointerup", (e) => this.inputHandler(e))
        canvas.addEventListener("pointerleave", () => {
            this.isPointerPressed = false
            this.isDragging = false
            if (onLeave)
                onLeave()
        })
    }

    private inputHandler(e:PointerEvent): void {
        let canvasPositionX = parseFloat(getComputedStyle(this.canvas).left)
        let canvasPositionY = parseFloat(getComputedStyle(this.canvas).top)
        let time:number = e.timeStamp*1000, 
            type:InputDetectionType = "move",
            position:{
                x: number, 
                y: number
            } = {
                x: e.clientX - canvasPositionX,
                y: e.clientY - canvasPositionY
            }  
        if (e.type == "pointerdown") {
            type = "press"
            this.isPointerPressed = true
            if  (e.button == 2) {
                type = "right press"
                this.isPointerPressed = false
            }            
        }
        if (e.type == "pointermove" || e.type == "pointerover" ) {
            if (this.isPointerPressed) {
                type = "drag"
                this.isDragging = true
            }
            else if (!this.isPointerPressed) {
                type = "move"
            }
        }
        if (e.type == "pointerup") {
            if (!this.isDragging) {
                type = "release"
                if  (e.button == 2)
                    type = "right release" 
            } else {
                type = "drag end"
            }
            this.isPointerPressed = false
            this.isDragging = false
        }

        this.onDetect({ type, time, position: new Vector2(position.x, position.y) })
    }

    private onDetect({ type, time, position }:InputDetectorEvent): void {
        if (type == "press" && this.onPress)
            this.onPress({ type, time, position })
        else if (type == "drag" && this.onDrag)
            this.onDrag({ time, type, position })
        else if (type == "move" && this.onMove)
            this.onMove({ time, type, position })
        else if (type == "release" && this.onRelease)
            this.onRelease({ time, type, position })
        else if (type == "right press" && this.onRightPress)
            this.onRightPress({ time, type, position })
        else if (type == "right release" && this.onRightRelease)
            this.onRightRelease({ time, type, position })
        else if (type == "drag end" && this.onDragEnd)
            this.onDragEnd({ time, type, position })
    }
}