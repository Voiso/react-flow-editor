import React, { useCallback, useState } from "react"
import { useStore } from "@nanostores/react"

import { DragItemAtom, HoveredNodeIdAtom, NodesAtom } from "@/Editor/state"
import { Node, NodeState, Point } from "@/types"

import { BUTTON_LEFT } from "../../constants"
import { DragItemType } from "../../types"

export const useNodeInteractions = (node: Node) => {
  const dragItem = useStore(DragItemAtom)
  const [initialClickCoords, setInitialClickCoords] = useState<Point>({ x: 0, y: 0 })

  const onDragStarted: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button === BUTTON_LEFT) {
      const point = { x: e.clientX, y: e.clientY }
      DragItemAtom.set({ type: DragItemType.node, ...point, id: node.id })

      setInitialClickCoords(point)
    }
  }

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.button === BUTTON_LEFT) {
        NodesAtom.set(
          NodesAtom.get().map((nodeItem) => {
            const isSelected =
              (nodeItem.id === node.id && initialClickCoords.x === e.clientX && initialClickCoords.y === e.clientY) ||
              (e.shiftKey && nodeItem.state === NodeState.dragging)

            if (isSelected) {
              return {
                ...nodeItem,
                state: NodeState.selected
              }
            }

            const isIdentity = e.shiftKey && nodeItem.state === NodeState.selected

            if (isIdentity) {
              return {
                ...nodeItem
              }
            }

            return {
              ...nodeItem,
              state: null
            }
          })
        )

        DragItemAtom.set({ type: undefined, x: e.clientX, y: e.clientY })
      }
    },
    [initialClickCoords]
  )

  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
    HoveredNodeIdAtom.set(node.id)
  }, [dragItem.id])

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
    HoveredNodeIdAtom.set(null)
  }, [dragItem.type === DragItemType.connection])

  return {
    onDragStarted,
    onMouseUp,
    onMouseEnter,
    onMouseLeave
  }
}
