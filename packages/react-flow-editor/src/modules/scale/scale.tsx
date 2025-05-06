import { useLayoutEffect, useCallback } from "react"

import { ScaleComponentProps } from "@/domain-types"
import { DragItemAtom, overviewActions, transformationActions } from "@/state"
import { useRectsContext } from "@/context/rects-context"
import { usePreventZoom } from "@/hooks"

type Props = {
  ScaleComponent: (props: ScaleComponentProps) => JSX.Element
}

export const Scale = ({ ScaleComponent }: Props) => {
  usePreventZoom()

  const { editorContainerRef, isMounted } = useRectsContext()
  const preventCanvasMove = () => DragItemAtom.set({ type: undefined, x: 0, y: 0 })

  const overview = useCallback(() => {
    void (isMounted && editorContainerRef.current && overviewActions.overview(editorContainerRef))
  }, [isMounted, editorContainerRef])

  useLayoutEffect(overview, [isMounted])

  return (
    <div onMouseDownCapture={preventCanvasMove}>
      <ScaleComponent
        zoomIn={transformationActions.zoomIn}
        zoomOut={transformationActions.zoomOut}
        overview={overview}
      />
    </div>
  )
}
