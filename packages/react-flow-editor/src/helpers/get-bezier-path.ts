import { clamp } from "lodash"

import { Position } from "@/types"

export interface GetBezierPathParams {
  sourceX: number
  sourceY: number
  sourcePosition?: Position
  targetX: number
  targetY: number
  targetPosition?: Position
}

interface GetControlWithCurvatureParams {
  pos: Position
  x1: number
  y1: number
  x2: number
  y2: number
  c: number
}

const MINIMUM_CORNER_OFFSET = 25

const calculateControlOffset = (distance: number, curvature: number): number => {
  // Hack to avoid sharp corners, increase MINIMUM_CORNER_OFFSET to get smoother corners
  if (distance > -100 && distance < 100) {
    return curvature * 24 * Math.sqrt(Math.abs(distance) + MINIMUM_CORNER_OFFSET)
  }

  if (distance >= 0) {
    return 0.5 * distance
  }

  return curvature * 24 * Math.sqrt(-distance)
}

const getControlWithCurvature = ({ pos, x1, y1, x2, y2, c }: GetControlWithCurvatureParams): [number, number] => {
  switch (pos) {
    case Position.Left:
      return [x1 - calculateControlOffset(x1 - x2, c), y1]

    case Position.Right:
      return [x1 + calculateControlOffset(x2 - x1, c), y1]

    case Position.Top:
      return [x1, y1 - calculateControlOffset(y1 - y2, c)]

    case Position.Bottom:
      return [x1, y1 + calculateControlOffset(y2 - y1, c)]
  }
}

const getCurvatureMeasure = ({
  diffX,
  diffY,
  nearYLineCurvature
}: {
  diffX: number
  diffY: number
  nearYLineCurvature: number
}) => {
  if (nearYLineCurvature) return 0.5
  if (diffX < 0) return 0.6
  if (diffX < 50 && Math.abs(diffY) < 30) return 0.2
  if (diffX < 100 && Math.abs(diffY) < 60) return 0.3

  return 0.5
}

const GAP_BETWEEN_NODE_AND_ARROW = 2
const CONNECTOR_LINE_GAP = 24
const SAME_Y_CURVATURE = 30

export const getBezierPath = ({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top
}: GetBezierPathParams): string => {
  const diffX = sourceX - targetX
  const diffY = sourceY - targetY

  const nearYLineCurvature = Math.abs(diffY) < 120 && diffX < -150 ? SAME_Y_CURVATURE : 0

  const curvatureMeasure = getCurvatureMeasure({ diffX, diffY, nearYLineCurvature })

  const [sourceControlX, sourceControlY] = getControlWithCurvature({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: targetX,
    y2: targetY,
    c: curvatureMeasure
  })
  const [targetControlX, targetControlY] = getControlWithCurvature({
    pos: targetPosition,
    x1: targetX,
    y1: targetY,
    x2: sourceX,
    y2: sourceY,
    c: curvatureMeasure
  })

  const calcLineGap = clamp(Math.max(diffX, diffY) / 10, 0, CONNECTOR_LINE_GAP)

  const SX = sourceX - GAP_BETWEEN_NODE_AND_ARROW

  if (nearYLineCurvature) {
    const SCX = sourceControlX + nearYLineCurvature * Math.sign(diffY)
    const SCY = sourceControlY - nearYLineCurvature * Math.sign(diffY)
    const TCX = targetControlX - nearYLineCurvature
    const TCY = targetControlY + nearYLineCurvature * Math.sign(diffY)
    const TX = targetX + calcLineGap

    return `M${SX},${sourceY} l -${calcLineGap}, 0 C${SCX},${SCY} ${TCX},${TCY} ${TX},${targetY} l -${calcLineGap}, 0`
  }

  return `M${SX},${sourceY} l -${calcLineGap}, 0 C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${
    targetX + calcLineGap
  },${targetY} l -${calcLineGap}, 0`
}
