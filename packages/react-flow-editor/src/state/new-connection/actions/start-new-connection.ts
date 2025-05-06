import { DragItemType } from "@/types"
import { nodeActions, NodesAtom } from "@/state/nodes"
import { SvgOffsetAtom } from "@/state/svg-offset"
import { TransformationMap } from "@/state/transformation"
import { DragItemAtom } from "@/state/drag-item"

import { NewConnectionAtom } from "../store"
import { connectionActions } from "../../connections"

export const startNewConnection = (e: React.MouseEvent<HTMLElement>, zoomRect: DOMRect) => {
  const { output, id: nodeId } = DragItemAtom.get()

  const svgOffset = SvgOffsetAtom.get()
  const transformation = TransformationMap.get()
  const node = NodesAtom.get().find((node) => node.id === nodeId)!

  const pos = {
    x: -svgOffset.x + (e.clientX - zoomRect.left) / transformation.zoom,
    y: -svgOffset.y + (e.clientY - zoomRect.top) / transformation.zoom
  }

  NewConnectionAtom.set(pos)
  connectionActions.clearSelectedConnection()
  connectionActions.clearHoveredConnection()

  DragItemAtom.set({
    type: DragItemType.connection,
    output,
    id: node.id,
    x: e.clientX,
    y: e.clientY
  })

  nodeActions.markDisabledNodes(node)
}
