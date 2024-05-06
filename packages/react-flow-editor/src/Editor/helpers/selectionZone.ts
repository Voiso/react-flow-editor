import { Node, RectZone, SelectionZone, Transformation } from "../../types"
import { findDOMRect } from "./findDOMRect"

export const isNodeInSelectionZone = (node: Node, zone: SelectionZone | null, transform: Transformation): boolean => {
  if (zone === null) return false

  const { left, top, right, bottom } = cornersToRect(zone)

  const rect = findDOMRect(document.getElementById(node.id))
  const isLeftOver = left < node.position.x + rect.width / transform.zoom
  const isRightOver = right > node.position.x
  const isTopOver = top < node.position.y + rect.height / transform.zoom
  const isBottomOver = bottom > node.position.y

  return isLeftOver && isRightOver && isTopOver && isBottomOver
}

export const cornersToRect = (zone: SelectionZone | null): RectZone =>
  zone
    ? {
        left: Math.min(zone.cornerStart.x, zone.cornerEnd.x),
        right: Math.max(zone.cornerStart.x, zone.cornerEnd.x),
        top: Math.min(zone.cornerStart.y, zone.cornerEnd.y),
        bottom: Math.max(zone.cornerStart.y, zone.cornerEnd.y)
      }
    : {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
