import { DragItemAtom, NodesAtom, SelectionZoneAtom } from "@/Editor/state"
import { DragItemType } from "@/Editor/types"

export const isNodesHaveStateToReset = () => {
  const dragItem = DragItemAtom.get()
  const nodes = NodesAtom.get()
  const selectionZone = SelectionZoneAtom.get()

  return (
    nodes.some((node) => Boolean(node.state)) &&
    dragItem.type &&
    [DragItemType.viewPort, DragItemType.connection, DragItemType.selectionZone].includes(dragItem.type) &&
    !(
      dragItem.type === DragItemType.selectionZone &&
      (selectionZone?.cornerEnd.x !== selectionZone?.cornerStart.x ||
        selectionZone?.cornerEnd.y !== selectionZone?.cornerStart.y)
    )
  )
}
