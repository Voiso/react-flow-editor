import { useStore } from "@nanostores/react"
import { useCallback, useMemo } from "react"

import { DragItemAtom, TransformationMap, transformationActions } from "@/state"

import { findDOMRect } from "../helpers"

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
      transformationActions.handleZoom(event.deltaY, event.ctrlKey)
    },
    [currentDragItem, transformation]
  )

  return { onWheel }
}
