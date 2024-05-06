import { action } from "nanostores"

import { LARGEST_RECT, DRAG_OFFSET_TRANSFORM } from "@/Editor/constants"
import { findDOMRect } from "@/Editor/helpers"

import { NodesAtom } from "../Nodes"
import { TransformationMap } from "../Transformation"

const countDumensionsRect = () => {
  const zoom = TransformationMap.get().zoom
  const nodes = NodesAtom.get()

  return nodes.reduce(
    (acc, node) => {
      const rect = findDOMRect(document.getElementById(node.id))

      if (node.position.x > acc.rightPoint) acc.rightPoint = node.position.x + rect.width / zoom
      if (node.position.x < acc.leftPoint) acc.leftPoint = node.position.x
      if (node.position.y > acc.bottomPoint) acc.bottomPoint = node.position.y + rect.height / zoom
      if (node.position.y < acc.topPoint) acc.topPoint = node.position.y

      return acc
    },
    { ...LARGEST_RECT }
  )
}

export const overview = action(
  TransformationMap,
  "overview",
  (store, editorContainerRef: React.RefObject<HTMLDivElement>) => {
    const nodes = NodesAtom.get()

    if (!nodes.length) return

    const editorRect = findDOMRect(editorContainerRef.current)
    const dimensionsRect = countDumensionsRect()

    const width = dimensionsRect.rightPoint - dimensionsRect.leftPoint
    const height = dimensionsRect.bottomPoint - dimensionsRect.topPoint

    const newZoom = Math.min(
      (editorRect.width - DRAG_OFFSET_TRANSFORM) / width,
      (editorRect.height - DRAG_OFFSET_TRANSFORM) / height
    )
    const newZoomCorrected = newZoom > 1 ? 1 : newZoom

    const dx = -dimensionsRect.leftPoint + (editorRect.width - width) / 2
    const dy = -dimensionsRect.topPoint + (editorRect.height - height) / 2

    store.set({
      dx,
      dy,
      zoom: newZoomCorrected
    })
  }
)
