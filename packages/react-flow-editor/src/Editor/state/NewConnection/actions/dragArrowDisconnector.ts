import { action } from "nanostores"

import { DragItemType } from "@/Editor/types"
import { NodeState, Output } from "@/types"

import { DragItemAtom } from "../../DragItem"
import { nodeActions, NodesAtom } from "../../Nodes"
import { NewConnectionAtom } from "../store"
import { TransformationMap } from "../../Transformation"
import { SvgOffsetAtom } from "../../SvgOffset"

export const dragArrowDisconnector = action(
  NewConnectionAtom,
  "dragArrowDisconnector",
  (store, e: React.MouseEvent<SVGRectElement>, fromId: string, output: Output, zoomRect: DOMRect) => {
    const transformation = TransformationMap.get()
    const svgOffset = SvgOffsetAtom.get()
    const fromNode = NodesAtom.get().find((node) => node.id === fromId)!

    nodeActions.markDisabledNodes(fromNode)

    DragItemAtom.set({
      type: DragItemType.connection,
      id: fromId,
      output,
      x: e.clientX,
      y: e.clientY
    })

    const newPos = {
      x: (e.clientX - zoomRect.left) / transformation.zoom - svgOffset.x,
      y: (e.clientY - zoomRect.top) / transformation.zoom - svgOffset.y
    }

    store.set(newPos)

    nodeActions.changeNodeState(fromId, NodeState.draggingConnector)
  }
)
