import { action } from "nanostores"

import { NodeState } from "@/types"
import { isNodeInSelectionZone } from "@/Editor/helpers/selectionZone"

import { SelectionZoneAtom } from "../../SelectionZone"
import { TransformationMap } from "../../Transformation"
import { NodesAtom } from "../store"

export const dragSelectionZoneHandler = action(NodesAtom, "changeNodeState", (store) => {
  const selectionZone = SelectionZoneAtom.get()
  const transformation = TransformationMap.get()

  store.set(
    store.get().map((el) => ({
      ...el,
      state: isNodeInSelectionZone(el, selectionZone, transformation) ? NodeState.selected : null
    }))
  )
})
