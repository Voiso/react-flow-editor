import { Transformation } from "@/types"

export const transformCanvasStyle = (transformation: Transformation) => ({
  transform: `translate(${transformation.dx}px, ${transformation.dy}px) scale(${transformation.zoom})`
})
