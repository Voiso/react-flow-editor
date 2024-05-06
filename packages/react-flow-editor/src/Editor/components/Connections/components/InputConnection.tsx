import { clamp, isEqual } from "lodash"
import React, { useEffect, useRef } from "react"
import { useStore } from "@nanostores/react"

import { ConnectorsBehaviour, Point } from "@/types"
import { DEFAULT_COLOR } from "@/Editor/constants"
import { useEditorContext } from "@/Editor/editor-context"
import { connectionsActions, HoveredConnectionAtom, SelectedConnectionAtom } from "@/Editor/state"

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
  nodeId?: string
  nextNodeId?: string
  isNew?: boolean
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

const InputConnection = ({
  inputPosition,
  outputPosition,
  isNew = false,
  nodeId,
  nextNodeId
}: InputConnectionProps) => {
  const pathRef = useRef<SVGPathElement>(null)
  const [input, output] = useStore(SelectedConnectionAtom)
  const [hoveredInput, hoveredOutput] = useStore(HoveredConnectionAtom)

  const { connectorStyleConfig, connectorsBehaviour } = useEditorContext()

  const { dx, dy } = defineDxDy(inputPosition, outputPosition, connectorsBehaviour)

  const a1 = { x: inputPosition.x - dx, y: inputPosition.y + dy }
  const a2 = { x: outputPosition.x + dx, y: outputPosition.y + dy }

  // https://javascript.info/bezier-curve
  const cmd = `M ${inputPosition.x} ${inputPosition.y} C ${a1.x} ${a1.y}, ${a2.x} ${a2.y}, ${outputPosition.x} ${outputPosition.y}`

  const checkConnectionSelected = (input?: Point, output?: Point) => {
    if (input && output)
      return (
        input.x === inputPosition.x &&
        input.y === inputPosition.y &&
        output.x === outputPosition.x &&
        output.y === outputPosition.y
      )

    return false
  }

  const onClickHandler = () => {
    connectionsActions.setSelectedHanlder([inputPosition, outputPosition, nodeId, nextNodeId])
  }

  const onMouseEnterHandler = () => {
    if (!checkConnectionSelected(hoveredInput, hoveredOutput) && !isNew && !(hoveredInput && hoveredOutput))
      connectionsActions.setHoveredHanlder([inputPosition, outputPosition])
  }

  const onMouseMoveHandler = (evt: MouseEvent) => {
    const target = evt.target as EventTarget & { dataset: { position: string } }

    if (
      target.dataset?.position !== `${inputPosition.x}:${inputPosition.y}:${outputPosition.x}:${outputPosition.y}` &&
      hoveredInput &&
      hoveredOutput
    ) {
      document.removeEventListener("mousemove", onMouseMoveHandler)
      connectionsActions.clearHoveredHanlder()
    }
  }

  const clickAwayHandler = (evt: MouseEvent) => {
    if (evt.target !== pathRef.current) {
      connectionsActions.clearSelectedHanlder()
    }
  }

  useEffect(() => {
    if (!checkConnectionSelected(input, output)) {
      return document.removeEventListener("mousedown", clickAwayHandler)
    }

    if (checkConnectionSelected(input, output)) {
      return document.addEventListener("mousedown", clickAwayHandler)
    }
  }, [input, output])

  useEffect(() => {
    if (!checkConnectionSelected(hoveredInput, hoveredOutput)) {
      return document.removeEventListener("mousemove", onMouseMoveHandler)
    }

    if (checkConnectionSelected(hoveredInput, hoveredOutput)) {
      return document.addEventListener("mousemove", onMouseMoveHandler)
    }
  }, [hoveredInput, hoveredOutput])

  useEffect(
    () => () => {
      document.removeEventListener("mousedown", clickAwayHandler)

      document.removeEventListener("mousemove", onMouseMoveHandler)
    },
    []
  )
  const dataAttribute = isNew ? "" : `${inputPosition.x}:${inputPosition.y}:${outputPosition.x}:${outputPosition.y}`

  return (
    <g data-position={dataAttribute}>
      {!isNew && (
        <path
          data-position={dataAttribute}
          ref={pathRef}
          className="connection connection--hidden"
          d={cmd}
          fill="transparent"
          stroke="transparent"
          onClick={onClickHandler}
          onMouseEnter={onMouseEnterHandler}
          strokeWidth={15}
        />
      )}
      <path
        data-position={dataAttribute}
        className={`connection${isNew ? " connection--new" : ""}`}
        d={cmd}
        markerStart={`url(#${ARROW_ID})`}
        fill="transparent"
        strokeWidth={checkConnectionSelected(input, output) ? 1.5 : 1}
        stroke={connectorStyleConfig.color || DEFAULT_COLOR}
        onMouseEnter={onMouseEnterHandler}
        onClick={onClickHandler}
      />
    </g>
  )
}

export default React.memo(InputConnection, isEqual)
