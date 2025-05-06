import { MutableRefObject, PropsWithChildren } from "react"
import { useStore } from "@nanostores/react"

import { cornersToRect } from "@/helpers/selection-zone"
import { SelectionZoneAtom, TransformationMap } from "@/state"
import { Transformation } from "@/domain-types"
import { findDOMRect } from "@/helpers"

export type SelectionZoneParams = {
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
  selectionZone: SelectionZoneParams | null
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

export const SelectionZone = ({ zoomContainerRef, children }: PropsWithChildren<Props>) => {
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
