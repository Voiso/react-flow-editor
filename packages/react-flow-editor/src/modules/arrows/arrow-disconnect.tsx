import React from "react"
import { useStore } from "@nanostores/react"

import { Output, Point } from "@/domain-types"
import { connectionActions, DragItemAtom, HoveredConnectionAtom, newConnectionActions } from "@/state"
import { useRectsContext } from "@/context/rects-context"
import { findDOMRect } from "@/helpers"

import { disconnectStyle } from "./arrows.helpers"

type DisconnectProps = {
  position: Point
  fromId: string
  output: Output
  zoneSize?: number
}

export const ArrowDisconnect = ({ position, fromId, output, zoneSize }: DisconnectProps) => {
  const { zoomContainerRef } = useRectsContext()
  const dragItem = useStore(DragItemAtom)

  const onMouseDown = (e: React.MouseEvent<SVGRectElement>) => {
    const zoomRect = findDOMRect(zoomContainerRef.current)

    newConnectionActions.dragArrowDisconnect(e, fromId, output, zoomRect)
  }

  const onMouseEnter = () => {
    if (dragItem.type) return

    HoveredConnectionAtom.set({ nodeId: fromId, outputId: output.id })
  }

  const onMouseLeave = () => {
    connectionActions.clearHoveredConnection()
  }

  return (
    <rect
      data-ignore-connection-hover
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="disconnect-arrow"
      style={disconnectStyle(position, zoneSize)}
    />
  )
}
