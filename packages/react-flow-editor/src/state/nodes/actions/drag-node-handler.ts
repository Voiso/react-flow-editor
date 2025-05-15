import { NodeState } from "@/domain-types"
import { DragItemAtom } from "@/state/drag-item"
import { TransformationMap } from "@/state/transformation"

import { NodesAtom } from "../store"

export const dragNodeHandler = (e: React.MouseEvent<HTMLElement>) => {
  const dragItem = DragItemAtom.get()
  const transformation = TransformationMap.get()
  const nodes = NodesAtom.get()

  NodesAtom.set(
    nodes.map((el) => {
      const isDragging = el.id === dragItem.id
      const isSelected = el.state === NodeState.selected

      return isDragging || isSelected
        ? {
            ...el,
            position: {
              x: el.position.x + (e.clientX - dragItem.x) / transformation.zoom,
              y: el.position.y + (e.clientY - dragItem.y) / transformation.zoom
            },
            state: isSelected ? NodeState.selected : NodeState.dragging
          }
        : { ...el, state: null }
    })
  )
}
