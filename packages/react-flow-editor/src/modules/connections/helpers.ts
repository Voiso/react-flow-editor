import { Node, Point, Transformation } from "@/domain-types"
import { DISCONNECT_ZONE, LARGEST_RECT, MINIMUM_SVG_SIZE } from "@/constants"

import { Axis, NodeGroupsRect } from "../../types"

const WHITE_SPACE_SCREENS = 2

const recomputeBorder = ({
  border,
  transform,
  axis,
  isStartEdge
}: {
  border: number
  transform: Transformation
  axis: Axis
  isStartEdge?: boolean
}): number => {
  const whiteSpace = WHITE_SPACE_SCREENS * (axis === Axis.x ? window.innerWidth : window.innerHeight) * transform.zoom
  const svgOffset = (isStartEdge ? -1 : 1) * MINIMUM_SVG_SIZE
  const inZoneCondition = isStartEdge ? border < svgOffset : border > svgOffset

  return inZoneCondition ? border - whiteSpace : svgOffset
}

export const computeNodeGroupsRect = (nodes: Node[], transform: Transformation): NodeGroupsRect => {
  if (!nodes.length) {
    return {
      leftPoint: 0,
      rightPoint: 0,
      topPoint: 0,
      bottomPoint: 0,
      realHeight: 0,
      realWidth: 0
    }
  }

  const dimensionsRect = nodes.reduce(
    (acc, node) => {
      if (node.position.x > acc.rightPoint) acc.rightPoint = node.position.x
      if (node.position.x < acc.leftPoint) acc.leftPoint = node.position.x
      if (node.position.y > acc.bottomPoint) acc.bottomPoint = node.position.y
      if (node.position.y < acc.topPoint) acc.topPoint = node.position.y

      return acc
    },
    { ...LARGEST_RECT }
  )

  dimensionsRect.leftPoint = recomputeBorder({
    border: dimensionsRect.leftPoint,
    transform,
    axis: Axis.x,
    isStartEdge: true
  })
  dimensionsRect.rightPoint = recomputeBorder({ border: dimensionsRect.rightPoint, transform, axis: Axis.x })
  dimensionsRect.topPoint = recomputeBorder({
    border: dimensionsRect.topPoint,
    transform,
    axis: Axis.y,
    isStartEdge: true
  })
  dimensionsRect.bottomPoint = recomputeBorder({ border: dimensionsRect.bottomPoint, transform, axis: Axis.y })

  return {
    ...dimensionsRect,
    realHeight: dimensionsRect.bottomPoint - dimensionsRect.topPoint,
    realWidth: dimensionsRect.rightPoint - dimensionsRect.leftPoint
  }
}

export const connectionContainerStyle = (rect: NodeGroupsRect): React.CSSProperties => ({
  minWidth: rect.realWidth,
  minHeight: rect.realHeight,
  transform: `translate(${rect.leftPoint}px, ${rect.topPoint}px)`
})

export const disconnectStyle = (pos: Point, zone = DISCONNECT_ZONE) => ({
  transform: `translate(${pos.x - zone / 2}px, ${pos.y - zone / 2}px)`,
  width: zone,
  height: zone
})
