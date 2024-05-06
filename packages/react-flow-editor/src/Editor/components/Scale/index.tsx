import React, { FC, useLayoutEffect } from "react"
import { useStore } from "@nanostores/react"

import { ScaleComponentProps } from "@/types"
import { overviewActions, TransformationMap } from "@/Editor/state"
import { ZOOM_STEP } from "@/Editor/constants"
import { clampZoom } from "@/Editor/helpers"
import { useRectsContext } from "@/Editor/rects-context"

type Props = {
  ScaleComponent: FC<ScaleComponentProps>
}

export const Scale: FC<Props> = ({ ScaleComponent }) => {
  const { editorContainerRef, isMounted } = useRectsContext()
  const transformation = useStore(TransformationMap)

  const overview = () => void (isMounted && editorContainerRef.current && overviewActions.overview(editorContainerRef))

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
