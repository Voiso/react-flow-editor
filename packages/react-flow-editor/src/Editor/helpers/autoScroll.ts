import { useStore } from "@nanostores/react"
import { useCallback, useEffect } from "react"

import {
  AutoScrollDirection,
  AutoScrollAtom,
  NodesAtom,
  autoScrollActions,
  NewConnectionAtom,
  SelectionZoneAtom,
  DragItemAtom,
  TransformationMap
} from "@/Editor/state"

import { NodeState } from "../../types"
import { DRAG_AUTO_SCROLL_DIST, DRAG_AUTO_SCROLL_TIME, DRAG_OFFSET_TRANSFORM } from "../constants"
import { Axis, DragItemType } from "../types"
import { findDOMRect } from "./findDOMRect"

export const getSign = (direction: AutoScrollDirection): -1 | 0 | 1 => {
  if ([AutoScrollDirection.left, AutoScrollDirection.top].includes(direction)) return -1
  if ([AutoScrollDirection.right, AutoScrollDirection.bottom].includes(direction)) return 1

  return 0
}

const axisDirections = {
  [Axis.x]: [AutoScrollDirection.left, AutoScrollDirection.right],
  [Axis.y]: [AutoScrollDirection.top, AutoScrollDirection.bottom]
}

const countScrollDelta = (axis: Axis) => {
  const scrollDegree = AutoScrollAtom.get().find((item) => axisDirections[axis].includes(item.direction))

  if (!scrollDegree) return 0

  return getSign(scrollDegree.direction) * DRAG_AUTO_SCROLL_DIST * scrollDegree.speed * TransformationMap.get().zoom
}

const useCheckAutoScrollEnable = (editorContainerRef: React.RefObject<HTMLDivElement>) => {
  const autoScroll = useStore(AutoScrollAtom)

  return useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const editorRect = findDOMRect(editorContainerRef.current)

      const leftOverflow = editorRect.left + DRAG_OFFSET_TRANSFORM - e.clientX
      const rightOverflow = e.clientX - (editorRect.right - DRAG_OFFSET_TRANSFORM)
      const topOverflow = editorRect.top + DRAG_OFFSET_TRANSFORM - e.clientY
      const bottomOverflow = e.clientY - (editorRect.bottom - DRAG_OFFSET_TRANSFORM)

      leftOverflow > 0
        ? autoScrollActions.addAutoscrollDegree(leftOverflow, AutoScrollDirection.left)
        : autoScrollActions.dropAutoscrollDegree(AutoScrollDirection.left)

      rightOverflow > 0
        ? autoScrollActions.addAutoscrollDegree(rightOverflow, AutoScrollDirection.right)
        : autoScrollActions.dropAutoscrollDegree(AutoScrollDirection.right)

      topOverflow > 0
        ? autoScrollActions.addAutoscrollDegree(topOverflow, AutoScrollDirection.top)
        : autoScrollActions.dropAutoscrollDegree(AutoScrollDirection.top)

      bottomOverflow > 0
        ? autoScrollActions.addAutoscrollDegree(bottomOverflow, AutoScrollDirection.bottom)
        : autoScrollActions.dropAutoscrollDegree(AutoScrollDirection.bottom)
    },
    [autoScroll, editorContainerRef]
  )
}

export const useAutoScroll = (editorContainerRef: React.RefObject<HTMLDivElement>) => {
  const autoScroll = useStore(AutoScrollAtom)

  useEffect(() => {
    if (!autoScroll.length) return

    const dragItem = DragItemAtom.get()

    const scroll = () => {
      if (!dragItem.type) return

      const transformation = TransformationMap.get()

      const deltaX = countScrollDelta(Axis.x)
      const deltaY = countScrollDelta(Axis.y)

      if ([DragItemType.node, DragItemType.connection, DragItemType.selectionZone].includes(dragItem.type)) {
        const dx = transformation.dx - deltaX
        const dy = transformation.dy - deltaY

        TransformationMap.set({
          ...transformation,
          dx,
          dy
        })
      }

      if (dragItem.type === DragItemType.connection) {
        const newConnection = NewConnectionAtom.get()

        NewConnectionAtom.set({
          x: newConnection.x + deltaX,
          y: newConnection.y + deltaY
        })
      }

      if (dragItem.type === DragItemType.selectionZone) {
        const selectionZone = SelectionZoneAtom.get()!

        SelectionZoneAtom.set({
          ...selectionZone,
          cornerEnd: {
            x: selectionZone.cornerEnd.x + deltaX,
            y: selectionZone.cornerEnd.y + deltaY
          }
        })
      }

      if (dragItem.type === DragItemType.node) {
        const draggingNodesIds = NodesAtom.get()
          .filter((node) => node.state && [NodeState.dragging, NodeState.selected].includes(node.state))
          .map((node) => node.id)

        NodesAtom.set(
          NodesAtom.get().map((el) =>
            draggingNodesIds.includes(el.id)
              ? {
                  ...el,
                  position: {
                    x: el.position.x + deltaX,
                    y: el.position.y + deltaY
                  }
                }
              : el
          )
        )
      }
    }

    const scrollInterval = setInterval(scroll, DRAG_AUTO_SCROLL_TIME)

    return () => clearInterval(scrollInterval)
  }, [autoScroll])

  return useCheckAutoScrollEnable(editorContainerRef)
}
