import React from "react"
import { useStore } from "@nanostores/react"

import { Output, Node } from "@/domain-types"
import { clearHoveredOutput, connectionActions, DragItemAtom, HoveredConnectionAtom, HoveredOutputAtom } from "@/state"
import { DragItemType } from "@/types"
import { useNodeRelativePosition } from "@/hooks"
import { isLeftClick } from "@/helpers"

import { disconnectStyle } from "./arrows.helpers"

type Props = {
  node: Node
  output: Output
  zoneSize?: number
}

export const ArrowConnector = ({ node, output, zoneSize }: Props) => {
  const dragItem = useStore(DragItemAtom)

  const outputPosition = useNodeRelativePosition({
    inNodePosition: output.position,
    node
  })

  const startNewConnection = (e: React.MouseEvent<SVGRectElement>) => {
    if (isLeftClick(e)) {
      DragItemAtom.set({
        type: DragItemType.connectionPoint,
        output,
        id: node.id,
        ...output.position
      })
    }
  }

  const onMouseEnter = () => {
    if (dragItem.type) return

    HoveredConnectionAtom.set({ nodeId: node.id, outputId: output.id })
    HoveredOutputAtom.set({ nodeId: node.id, outputId: output.id })
  }

  const onMouseLeave = () => {
    connectionActions.clearHoveredConnection()
    clearHoveredOutput()
  }

  return (
    <rect
      onMouseDown={startNewConnection}
      data-ignore-connection-hover
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="disconnect-arrow"
      style={disconnectStyle(outputPosition, zoneSize)}
    />
  )
}
