import { clamp, isEqual } from "lodash"
import React from "react"

import { ConnectorsBehaviour, Point } from "@/types"
import { DEFAULT_COLOR } from "@/Editor/constants"
import { useEditorContext } from "@/Editor/editor-context"

import { ARROW_ID } from "./Arrow"
import {
  HORIZONTAL_CRITERIA_THRESHOLD,
  Y_BACKWARD_OFFSET_DELIMITER,
  MIN_X_BACKWARD_OFFSET,
  MAX_X_BACKWARD_OFFSET,
  MIN_Y_BACKWARD_OFFSET,
  MAX_Y_BACKWARD_OFFSET,
  X_FORWARD_OFFSET_THRESHOLD,
  X_FORWARD_OFFSET_DELIMITER,
  X_FORWARD_OFFSET_MINIMUM
} from "./constants"

type InputConnectionProps = {
  inputPosition: Point
  outputPosition: Point
}

const backwardHorizontalDx = (dist: number) =>
  clamp(dist / Y_BACKWARD_OFFSET_DELIMITER, MIN_X_BACKWARD_OFFSET, MAX_X_BACKWARD_OFFSET)

const backwardHorizontalDy = (dist: number, yDist: number) =>
  Math.sign(yDist) * clamp(dist, MIN_Y_BACKWARD_OFFSET, MAX_Y_BACKWARD_OFFSET)

const backwardDx = (dist: number) =>
  dist > X_FORWARD_OFFSET_THRESHOLD ? dist / X_FORWARD_OFFSET_DELIMITER : X_FORWARD_OFFSET_MINIMUM

const defineDxDy = (inputPosition: Point, outputPosition: Point, connectorsBehaviour: ConnectorsBehaviour) => {
  if (connectorsBehaviour === "middleInflection") {
    return {
      dx: Math.max(Math.abs(inputPosition.x - outputPosition.x) / 1.5, 100),
      dy: 0
    }
  }

  const xDist = inputPosition.x - outputPosition.x
  const yDist = inputPosition.y - outputPosition.y
  const dist = Math.sqrt(xDist ** 2 + yDist ** 2)
  const isBackwardHorizontal = Math.abs(yDist) < HORIZONTAL_CRITERIA_THRESHOLD && inputPosition.x < outputPosition.x

  return {
    dx: isBackwardHorizontal ? backwardHorizontalDx(dist) : backwardDx(dist),
    dy: isBackwardHorizontal ? backwardHorizontalDy(dist, yDist) : 0
  }
}

const InputConnection: React.FC<InputConnectionProps> = ({ inputPosition, outputPosition }) => {
  const { connectorStyleConfig, connectorsBehaviour } = useEditorContext()

  const { dx, dy } = defineDxDy(inputPosition, outputPosition, connectorsBehaviour)

  const a1 = { x: inputPosition.x - dx, y: inputPosition.y + dy }
  const a2 = { x: outputPosition.x + dx, y: outputPosition.y + dy }

  // https://javascript.info/bezier-curve
  const cmd = `M ${inputPosition.x} ${inputPosition.y} C ${a1.x} ${a1.y}, ${a2.x} ${a2.y}, ${outputPosition.x} ${outputPosition.y}`

  return (
    <path
      className="connection"
      d={cmd}
      markerStart={`url(#${ARROW_ID})`}
      fill="transparent"
      stroke={connectorStyleConfig.color || DEFAULT_COLOR}
    />
  )
}

export default React.memo(InputConnection, isEqual)
