import { NodeState, Point } from "@/types"

export const nodeStyle = (pos: Point, state: NodeState | null) => ({
  transform: `translate(${pos.x}px, ${pos.y}px)`,
  cursor: state === NodeState.dragging ? "grabbing" : "pointer",
  zIndex: state === NodeState.dragging ? 2 : 1
})

export const buildDotId = (nodeId: string) => `dot-${nodeId}`
