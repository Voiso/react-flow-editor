import { useLayoutEffect } from "react"
import { useStore } from "@nanostores/react"

import { ScaleComponentProps } from "@/types"
import { overviewActions, TransformationMap } from "@/Editor/state"
import { ZOOM_STEP } from "@/Editor/constants"
import { clampZoom } from "@/Editor/helpers"
import { useRectsContext } from "@/Editor/rects-context"

type Props = {
  ScaleComponent: (props: ScaleComponentProps) => JSX.Element
}

export const Scale = ({ ScaleComponent }: Props) => {
  const { editorContainerRef, isMounted } = useRectsContext()
  const transformation = useStore(TransformationMap)

  const overview = () => {
    isMounted && editorContainerRef.current && overviewActions.overview(editorContainerRef)

    return undefined
  }

  useLayoutEffect(overview, [isMounted])

  const zoomIn = () => {
    const zoom = clampZoom(transformation.zoom + ZOOM_STEP)

    TransformationMap.setKey("zoom", zoom)
  }

  const zoomOut = () => {
    const zoom = clampZoom(transformation.zoom - ZOOM_STEP)

    TransformationMap.setKey("zoom", zoom)
  }

  return <ScaleComponent zoomIn={zoomIn} zoomOut={zoomOut} overview={overview} />
}
