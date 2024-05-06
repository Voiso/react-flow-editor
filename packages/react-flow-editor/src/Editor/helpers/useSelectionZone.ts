import { useStore } from "@nanostores/react"
import { RefObject, useCallback } from "react"

import { AutoScrollAtom, AutoScrollDirection, DragItemAtom, SelectionZoneAtom, TransformationMap } from "../state"
import { findDOMRect } from "./findDOMRect"

export const useSelectionZone = (zoomContainerRef: RefObject<HTMLElement>) => {
  const selectionZone = useStore(SelectionZoneAtom)

  const initSelectionZone = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (e.shiftKey) {
        const transformation = TransformationMap.get()
        const zoomContainerRect = findDOMRect(zoomContainerRef.current)

        const left = (e.clientX - zoomContainerRect.left) / transformation.zoom
        const top = (e.clientY - zoomContainerRect.top) / transformation.zoom
        const point = { x: left, y: top }

        SelectionZoneAtom.set({ cornerStart: point, cornerEnd: point })
      }
    },
    [selectionZone]
  )

  const expandDelta = (degrees: Array<AutoScrollDirection>, delta: number) =>
    AutoScrollAtom.get().find((degree) => degrees.includes(degree.direction)) ? 0 : delta

  const expandSelectionZone = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (selectionZone) {
        const transformation = TransformationMap.get()
        const dragItem = DragItemAtom.get()

        const deltaX = (e.clientX - dragItem.x) / transformation.zoom
        const deltaY = (e.clientY - dragItem.y) / transformation.zoom

        SelectionZoneAtom.set({
          ...selectionZone,
          cornerEnd: {
            x: selectionZone.cornerEnd.x + expandDelta([AutoScrollDirection.left, AutoScrollDirection.right], deltaX),
            y: selectionZone.cornerEnd.y + expandDelta([AutoScrollDirection.top, AutoScrollDirection.bottom], deltaY)
          }
        })
      }
    },
    [selectionZone]
  )

  return { initSelectionZone, expandSelectionZone }
}
