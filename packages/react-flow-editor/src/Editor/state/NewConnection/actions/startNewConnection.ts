import { action } from "nanostores"

import { NodeState } from "@/types"
import { DragItemType } from "@/Editor/types"
import { nodeActions, NodesAtom } from "@/Editor/state/Nodes"
import { SvgOffsetAtom } from "@/Editor/state/SvgOffset"
import { TransformationMap } from "@/Editor/state/Transformation"
import { DragItemAtom } from "@/Editor/state/DragItem"

import { NewConnectionAtom } from "../store"

export const startNewConnection = action(
  NewConnectionAtom,
  "startNewConnection",
  (_, e: React.MouseEvent<HTMLElement>, zoomRect: DOMRect) => {
    const { output, id: nodeId } = DragItemAtom.get()

    const svgOffset = SvgOffsetAtom.get()
    const transformation = TransformationMap.get()
    const node = NodesAtom.get().find((node) => node.id === nodeId)!

    nodeActions.changeNodeState(node.id, NodeState.draggingConnector)

    const pos = {
      x: -svgOffset.x + (e.clientX - zoomRect.left) / transformation.zoom,
      y: -svgOffset.y + (e.clientY - zoomRect.top) / transformation.zoom
    }

    NewConnectionAtom.set(pos)

    DragItemAtom.set({
      type: DragItemType.connection,
      output,
      id: node.id,
      x: e.clientX,
      y: e.clientY
    })

    nodeActions.markDisabledNodes(node)
  }
)
