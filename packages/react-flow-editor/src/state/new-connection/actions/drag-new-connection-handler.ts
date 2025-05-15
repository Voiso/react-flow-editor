import React from "react"

import { SvgOffsetAtom } from "@/state/svg-offset"
import { TransformationMap } from "@/state/transformation"
import { findDOMRect } from "@/helpers"
import { NodeState } from "@/domain-types"
import { OUTPUT_BOX } from "@/constants"

import { NewConnectionAtom } from "../store"
import { HoveredNodeIdAtom } from "../../hovered-node-id"
import { NodesAtom } from "../../nodes"

export const dragNewConnectionHandler = (e: React.MouseEvent<HTMLElement>, zoomRect: DOMRect) => {
  const transformation = TransformationMap.get()
  const svgOffset = SvgOffsetAtom.get()
  const hoveredNodeId = HoveredNodeIdAtom.get()!
  const nodes = NodesAtom.get()
  const hoveredNode = nodes.find((node) => node.id === hoveredNodeId)

  const newPos = {
    x: (e.clientX - zoomRect.left) / transformation.zoom - svgOffset.x,
    y: (e.clientY - zoomRect.top) / transformation.zoom - svgOffset.y
  }

  // Make magnetic connection
  if (hoveredNode && hoveredNode.state !== NodeState.disabled) {
    if (!hoveredNode.inputPosition) return
    const hoveredNodeX = -svgOffset.x + hoveredNode.position.x + hoveredNode.inputPosition.x
    const hoveredNodeRect = findDOMRect(document.getElementById(hoveredNodeId))

    const width = hoveredNodeRect.width / transformation.zoom

    const differenceBetweenOutputXAndNewPosX = hoveredNodeX + width - newPos.x

    // Exception for right outputs column
    if (differenceBetweenOutputXAndNewPosX < 0 && differenceBetweenOutputXAndNewPosX > -OUTPUT_BOX) {
      NewConnectionAtom.set(newPos)

      return
    }

    NewConnectionAtom.set({
      x: hoveredNodeX,
      y: -svgOffset.y + hoveredNode.position.y + hoveredNode.inputPosition.y
    })

    return
  }

  NewConnectionAtom.set(newPos)
}
