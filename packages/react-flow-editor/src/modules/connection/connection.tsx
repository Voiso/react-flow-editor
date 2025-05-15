import { useEffect } from "react"
import { useStore } from "@nanostores/react"

import { Point } from "@/domain-types"
import { ARROW_ID, DEFAULT_COLOR } from "@/constants"
import { connectionActions, DragItemAtom, HoveredConnectionAtom, SelectedConnectionAtom } from "@/state"
import { DragItemType, Position } from "@/types"
import { getBezierPath } from "@/helpers"

type ConnectionProps = {
  inputPosition: Point
  outputPosition: Point
  nodeId?: string
  outputId?: string
  isNew?: boolean
  isSecondLayer?: boolean
  strokeColor?: string
  arrowId?: string
}

export const Connection = ({
  inputPosition,
  outputPosition,
  isNew = false,
  isSecondLayer = false,
  nodeId,
  outputId,
  strokeColor = DEFAULT_COLOR,
  arrowId = ARROW_ID
}: ConnectionProps) => {
  const selectedConnectionNodeId = useStore(SelectedConnectionAtom)
  const hoveredConnectionNodeId = useStore(HoveredConnectionAtom)
  const dragItem = useStore(DragItemAtom)

  const cmd = getBezierPath({
    sourceX: inputPosition.x,
    sourceY: inputPosition.y,
    targetX: outputPosition.x,
    targetY: outputPosition.y,
    sourcePosition: Position.Left,
    targetPosition: Position.Right
  })

  const startEndPosition = () => `${inputPosition.x}:${inputPosition.y}:${outputPosition.x}:${outputPosition.y}`

  const onClickHandler = () => {
    if (isNew || !outputId || !nodeId) return

    SelectedConnectionAtom.set({ nodeId, outputId })
  }

  const onMouseEnterHandler = () => {
    if (isNew || !nodeId || !outputId) return

    if (dragItem.type && [DragItemType.selectionZone, DragItemType.connection].includes(dragItem.type)) return

    if (hoveredConnectionNodeId.outputId !== outputId) {
      HoveredConnectionAtom.set({ nodeId, outputId })
    }
  }

  const onMouseMoveHandler = (evt: MouseEvent) => {
    const target = evt.target as EventTarget & { dataset: { position: string; ignoreConnectionHover: string } }
    const pos = startEndPosition()

    if (target.dataset?.position !== pos && !target.dataset?.ignoreConnectionHover && hoveredConnectionNodeId.nodeId) {
      connectionActions.clearHoveredConnection()
      document.removeEventListener("mousemove", onMouseMoveHandler)
    }
  }

  const clickAwayHandler = (evt: MouseEvent) => {
    const target = evt.target as EventTarget & { dataset: { position: string } }

    if (target.dataset?.position !== startEndPosition()) {
      connectionActions.clearSelectedConnection()
    }
  }

  useEffect(() => {
    if (selectedConnectionNodeId.outputId === outputId) {
      return document.addEventListener("mousedown", clickAwayHandler)
    } else {
      return document.removeEventListener("mousedown", clickAwayHandler)
    }
  }, [selectedConnectionNodeId.outputId])

  useEffect(() => {
    if (hoveredConnectionNodeId.outputId === outputId) {
      return document.addEventListener("mousemove", onMouseMoveHandler)
    } else {
      return document.removeEventListener("mousemove", onMouseMoveHandler)
    }
  }, [hoveredConnectionNodeId.outputId])

  useEffect(
    () => () => {
      document.removeEventListener("mousedown", clickAwayHandler)

      document.removeEventListener("mousemove", onMouseMoveHandler)
    },
    []
  )
  const dataAttribute = isNew ? "" : startEndPosition()

  return (
    <g data-position={dataAttribute}>
      {!isNew && (
        <path
          data-position={dataAttribute}
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
        className={`connection ${isNew ? " connection--new" : ""}`}
        d={cmd}
        markerStart={`url(#${arrowId})`}
        fill="transparent"
        strokeWidth={2}
        stroke={strokeColor}
        opacity={isSecondLayer ? 0.3 : 1}
        onMouseEnter={onMouseEnterHandler}
        onClick={onClickHandler}
      />
    </g>
  )
}
