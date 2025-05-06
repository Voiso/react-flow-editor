import { Point } from "@/domain-types"
import { type SVGOffsetState } from "@/state"

// Accept node and inNodePosition, returns inNodePosition in global coordinates
export const getNodeRelativePosition = ({
  inNodePosition = { x: 0, y: 0 },
  nodePosition,
  svgOffset
}: {
  inNodePosition?: Point
  nodePosition: Point
  svgOffset: SVGOffsetState
}) => ({
  x: -svgOffset.x + nodePosition.x + inNodePosition.x,
  y: -svgOffset.y + nodePosition.y + inNodePosition.y
})
