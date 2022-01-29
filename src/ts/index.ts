import StudioEngine from "./engine"
import { Size } from "./engine/math"

const DrawingCanvas:HTMLCanvasElement = document.querySelector("canvas.drawing-board") as HTMLCanvasElement

const height:number = parseFloat(getComputedStyle(DrawingCanvas).height)

const width:number = parseFloat(getComputedStyle(DrawingCanvas).width)

const engine:StudioEngine = new StudioEngine({
    canvas: DrawingCanvas,
    size: new Size(width, height)
})