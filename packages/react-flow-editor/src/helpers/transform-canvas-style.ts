import { Transformation } from "@/domain-types"

export const transformCanvasStyle = (transformation: Transformation) => ({
  // Translate 3d is used to use GPU instead of CPU
  transform: `translate3d(${transformation.dx}px, ${transformation.dy}px, 0) scale(${transformation.zoom})`
})
