import { DragItemAtom, NodesAtom } from "@/Editor/state"
import { DragItemType } from "@/Editor/types"

export const isNodesHaveStateToReset = () => {
  const dragItem = DragItemAtom.get()
  const nodes = NodesAtom.get()

  return (
    nodes.some((node) => Boolean(node.state)) &&
    dragItem.type &&
    [DragItemType.viewPort, DragItemType.connection].includes(dragItem.type)
  )
}
