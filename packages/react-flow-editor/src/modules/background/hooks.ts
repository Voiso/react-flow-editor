import { useStore } from "@nanostores/react"

import { TransformationMap } from "@/state"
import { useRectsContext } from "@/context/rects-context"
import { findDOMRect } from "@/helpers"

import { PatternDimensions } from "./types"
import { countOffset } from "./helpers"

export const usePatternDimensions = (gap: number): PatternDimensions => {
  const { editorContainerRef } = useRectsContext()
  const editorRect = findDOMRect(editorContainerRef.current)
  const transformation = useStore(TransformationMap)

  return {
    scaledGap: gap * transformation.zoom || 1,
    xOffset: countOffset(transformation.dx, transformation.zoom, editorRect.width),
    yOffset: countOffset(transformation.dy, transformation.zoom, editorRect.height)
  }
}
