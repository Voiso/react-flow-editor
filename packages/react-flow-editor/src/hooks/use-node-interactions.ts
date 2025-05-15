import React, { useCallback, useState, MouseEvent } from "react"
import { useStore } from "@nanostores/react"

import { DragItemAtom, HoveredNodeIdAtom, MaxNodeZIndex, nodeActions, NodesAtom } from "@/state"
import { Node, NodeState, Point } from "@/domain-types"
import { DragItemType } from "@/types"
import { isLeftClick } from "@/helpers"

const buildNodeActiveCondition = (nodeState: NodeState) => [NodeState.dragging, NodeState.selected].includes(nodeState)

export const buildResetSelectionCondition = (e: MouseEvent<HTMLDivElement>, node: Node) =>
  !e.shiftKey &&
  NodesAtom.get().find(
    (nodeItem) => buildNodeActiveCondition(nodeItem.state as NodeState) && node.id !== nodeItem.id
  ) &&
  !buildNodeActiveCondition(node.state as NodeState)

export const useNodeInteractions = (node: Node) => {
  const dragItem = useStore(DragItemAtom)
  const [initialClickCoords, setInitialClickCoords] = useState<Point>({ x: 0, y: 0 })
  const [zIndex, setZIndex] = useState(MaxNodeZIndex.get())

  const onDragStarted: React.MouseEventHandler<HTMLDivElement> = (e) => {
    MaxNodeZIndex.set(MaxNodeZIndex.get() + 1)
    setZIndex(MaxNodeZIndex.get())

    if (isLeftClick(e)) {
      const point = { x: e.clientX, y: e.clientY }

      DragItemAtom.set({ type: DragItemType.node, ...point, id: node.id })

      if (buildResetSelectionCondition(e, node)) {
        nodeActions.clearNodesState()
      }

      setInitialClickCoords(point)
    }
  }

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (isLeftClick(e)) {
        NodesAtom.set(
          NodesAtom.get().map((nodeItem) => {
            const isSelected =
              nodeItem.id === node.id && initialClickCoords.x === e.clientX && initialClickCoords.y === e.clientY

            if (isSelected) {
              return {
                ...nodeItem,
                state: nodeItem.state === NodeState.selected ? null : NodeState.selected
              }
            }

            const isIdentity =
              (initialClickCoords.x !== e.clientX || initialClickCoords.y !== e.clientY || e.shiftKey) &&
              nodeItem.state === NodeState.selected

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
  }, [dragItem.id, node.id])

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
    HoveredNodeIdAtom.set(null)
  }, [dragItem.type === DragItemType.connection])

  return {
    onDragStarted,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    zIndex
  }
}
