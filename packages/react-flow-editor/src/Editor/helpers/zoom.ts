import { useStore } from "@nanostores/react"
import { useCallback, useMemo } from "react"

import { ZOOM_STEP } from "../constants"
import { DragItemAtom, TransformationMap } from "../state"
import { clampZoom } from "./clampZoom"
import { findDOMRect } from "./findDOMRect"

export const useZoom = ({
  zoomContainerRef,
  editorContainerRef
}: {
  zoomContainerRef: React.RefObject<HTMLDivElement>
  editorContainerRef: React.RefObject<HTMLDivElement>
}) => {
  const currentDragItem = useStore(DragItemAtom)
  const transformation = useStore(TransformationMap)

  const zoomRefPoint = useMemo(() => {
    const editorRect = findDOMRect(editorContainerRef.current)

    return {
      x: -transformation.dx + (editorRect.width || 0) / 2,
      y: -transformation.dy + (editorRect.height || 0) / 2
    }
  }, [editorContainerRef?.current, transformation])

  if (zoomContainerRef?.current)
    zoomContainerRef.current.style.transformOrigin = `${zoomRefPoint.x}px ${zoomRefPoint.y}px`

  const onWheel: React.WheelEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (currentDragItem.type) return

      const isScrollUp = event.deltaY > 0

      const newZoom = clampZoom(isScrollUp ? transformation.zoom - ZOOM_STEP : transformation.zoom + ZOOM_STEP)

      TransformationMap.setKey("zoom", newZoom)
    },
    [currentDragItem, transformation]
  )

  return { onWheel }
}
