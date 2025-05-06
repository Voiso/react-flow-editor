import { DragItemType } from "@/types"
import { Output } from "@/domain-types"

import { DragItemAtom } from "../../drag-item"
import { nodeActions, NodesAtom } from "../../nodes"
import { NewConnectionAtom } from "../store"
import { TransformationMap } from "../../transformation"
import { SvgOffsetAtom } from "../../svg-offset"
import { connectionActions } from "../../connections"

export const dragArrowDisconnect = (
  e: React.MouseEvent<SVGRectElement>,
  fromId: string,
  output: Output,
  zoomRect: DOMRect
) => {
  const transformation = TransformationMap.get()
  const svgOffset = SvgOffsetAtom.get()
  const fromNode = NodesAtom.get().find((node) => node.id === fromId)!

  nodeActions.markDisabledNodes(fromNode)
  connectionActions.clearSelectedConnection()
  connectionActions.clearHoveredConnection()

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

  NewConnectionAtom.set(newPos)
}
