import React, { FC, MutableRefObject } from "react"
import { useStore } from "@nanostores/react"

import { cornersToRect } from "@/Editor/helpers/selectionZone"
import { SelectionZoneAtom, TransformationMap } from "@/Editor/state"
import { Transformation } from "@/types"
import { findDOMRect } from "@/Editor/helpers"

export type SelectionZone = {
  left: number
  top: number
  right: number
  bottom: number
}

const selectionZoneDisplay = (zonePosition: Partial<DOMRect>): string => {
  if (!zonePosition.height && !zonePosition.width) return "none"

  return "block"
}

export const computeSelectionZone = (
  zoomContainerRef: MutableRefObject<HTMLDivElement | null>,
  transformation: Transformation,
  selectionZone: SelectionZone | null
): Partial<DOMRect> => {
  const zoomContainerRect = findDOMRect(zoomContainerRef.current)

  const left = (zoomContainerRect.left || 0) + (selectionZone?.left || 0) * transformation.zoom || 0
  const top = (zoomContainerRect.top || 0) + (selectionZone?.top || 0) * transformation.zoom || 0
  const right = (zoomContainerRect.left || 0) + (selectionZone?.right || 0) * transformation.zoom || 0
  const bottom = (zoomContainerRect.top || 0) + (selectionZone?.bottom || 0) * transformation.zoom || 0

  return {
    left,
    top,
    width: right - left,
    height: bottom - top
  }
}

type Props = {
  zoomContainerRef: MutableRefObject<HTMLDivElement | null>
}

export const SelectionZone: FC<Props> = ({ zoomContainerRef, children }) => {
  const transformation = useStore(TransformationMap)
  const selectionZoneRect = cornersToRect(useStore(SelectionZoneAtom))

  const selectionZonePosition = computeSelectionZone(zoomContainerRef, transformation, selectionZoneRect)

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1,
        pointerEvents: "none",
        display: selectionZoneDisplay(selectionZonePosition),
        ...selectionZonePosition
      }}
    >
      {children}
    </div>
  )
}
