import React from "react"

import { Output, Point } from "@/types"
import { newConnectionActions } from "@/Editor/state"
import { useRectsContext } from "@/Editor/rects-context"
import { findDOMRect } from "@/Editor/helpers"

import { disconnectorStyle } from "../helpers"

type DisconnectorProps = {
  position: Point
  fromId: string
  output: Output
}

const ArrowDisconnector: React.FC<DisconnectorProps> = ({ position, fromId, output }) => {
  const { zoomContainerRef } = useRectsContext()

  const onMouseDown = (e: React.MouseEvent<SVGRectElement>) => {
    e.stopPropagation()
    const zoomRect = findDOMRect(zoomContainerRef.current)

    newConnectionActions.dragArrowDisconnector(e, fromId, output, zoomRect)
  }

  return <rect onMouseDown={onMouseDown} className="disconnector" style={disconnectorStyle(position)} />
}

export default ArrowDisconnector
