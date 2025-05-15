import { ZOOM_STEP } from "@/constants"

import { TransformationMap } from "./store"
import { DragItemAtom } from "../drag-item"
import { clampZoom } from "../../helpers/clamp-zoom"

const SMOOTHING_FACTOR = 0.25
const MIN_ZOOM_DELTA = 0.0001

type ZoomAnimationState = {
  targetZoom: number
  currentZoom: number
  animationFrameId?: number
}

const zoomAnimationState: ZoomAnimationState = {
  targetZoom: 1,
  currentZoom: 1
}

export const animateZoom = (targetZoom: number) => {
  const animate = () => {
    const diff = targetZoom - zoomAnimationState.currentZoom
    const delta = diff * SMOOTHING_FACTOR

    zoomAnimationState.currentZoom += delta

    if (Math.abs(diff) < 0.0005) {
      zoomAnimationState.currentZoom = targetZoom
      TransformationMap.setKey("zoom", targetZoom)
      zoomAnimationState.animationFrameId = undefined

      return
    }

    TransformationMap.setKey("zoom", zoomAnimationState.currentZoom)
    zoomAnimationState.animationFrameId = requestAnimationFrame(animate)
  }

  if (zoomAnimationState.animationFrameId) {
    cancelAnimationFrame(zoomAnimationState.animationFrameId)
  }

  zoomAnimationState.targetZoom = targetZoom
  zoomAnimationState.animationFrameId = requestAnimationFrame(animate)
}

export const zoomIn = (step = ZOOM_STEP) => {
  const currentZoom = TransformationMap.get().zoom
  const targetZoom = clampZoom(currentZoom + step * 10)

  animateZoom(targetZoom)
}

export const zoomOut = (step = ZOOM_STEP) => {
  const currentZoom = TransformationMap.get().zoom
  const targetZoom = clampZoom(currentZoom - step * 10)

  animateZoom(targetZoom)
}

export const handleZoom = (deltaY: number, isCtrlKeyPressed: boolean) => {
  const currentZoom = TransformationMap.get().zoom
  const normalizedDelta = Math.sign(deltaY) * Math.min(Math.abs(deltaY), 100)
  const baseScaleFactor = 0.005
  const scaleFactor = isCtrlKeyPressed ? baseScaleFactor * 8 : baseScaleFactor
  const zoomDelta = normalizedDelta * scaleFactor * currentZoom

  if (Math.abs(zoomDelta) < MIN_ZOOM_DELTA) return

  const targetZoom = clampZoom(currentZoom - zoomDelta)

  if (Math.abs(targetZoom - zoomAnimationState.currentZoom) > 1) {
    zoomAnimationState.currentZoom += (targetZoom - zoomAnimationState.currentZoom) * 0.3
  }

  animateZoom(targetZoom)
}

export const dragViewportHandler = (e: React.MouseEvent<HTMLElement>) => {
  const dragItem = DragItemAtom.get()
  const transformation = TransformationMap.get()

  const newPos = {
    x: (e.clientX - dragItem.x) / transformation.zoom,
    y: (e.clientY - dragItem.y) / transformation.zoom
  }

  TransformationMap.set({
    ...transformation,
    dx: transformation.dx + newPos.x,
    dy: transformation.dy + newPos.y
  })
}
