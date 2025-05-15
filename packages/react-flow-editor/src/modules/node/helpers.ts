import { Point } from "@/domain-types"

export const nodeStyle = (pos: Point, zIndex: number) => ({
  // Translate 3d is used to use GPU instead of CPU
  transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
  zIndex
})

export const buildDotId = (nodeId: string) => `dot-${nodeId}`
