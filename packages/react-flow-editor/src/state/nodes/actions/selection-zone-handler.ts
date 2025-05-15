import { NodeState } from "@/domain-types"
import { isNodeInSelectionZone } from "@/helpers/selection-zone"
import { NodesAtom } from "@/state/nodes/store"
import { SelectionZoneAtom } from "@/state/selection-zone"
import { TransformationMap } from "@/state/transformation"

export const dragSelectionZoneHandler = () => {
  const selectionZone = SelectionZoneAtom.get()
  const transformation = TransformationMap.get()
  const nodes = NodesAtom.get()

  NodesAtom.set(
    nodes.map((el) => ({
      ...el,
      state: isNodeInSelectionZone(el, selectionZone, transformation) ? NodeState.selected : null
    }))
  )
}
