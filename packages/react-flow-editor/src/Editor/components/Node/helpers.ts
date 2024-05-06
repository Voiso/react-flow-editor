import { NodesAtom } from "@/Editor/state"
import { NodeState, Point, Node } from "@/types"

export const nodeStyle = (pos: Point, state: NodeState | null, zIndex: number) => ({
  transform: `translate(${pos.x}px, ${pos.y}px)`,
  cursor: state === NodeState.dragging ? "grabbing" : "pointer",
  zIndex
})

export const buildDotId = (nodeId: string) => `dot-${nodeId}`

const buildNodeActiveCondition = (nodeState: NodeState) => [NodeState.dragging, NodeState.selected].includes(nodeState)

export const buildResetSelectionCondition = (e: React.MouseEvent<HTMLDivElement>, node: Node) =>
  !e.shiftKey &&
  NodesAtom.get().find(
    (nodeItem) => buildNodeActiveCondition(nodeItem.state as NodeState) && node.id !== nodeItem.id
  ) &&
  !buildNodeActiveCondition(node.state as NodeState)
