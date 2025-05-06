import {
  autoScrollActions,
  DragItemAtom,
  OutputsAtom,
  HoveredNodeIdAtom,
  nodeActions,
  NodesAtom,
  SelectionZoneAtom,
  ShiftPressedAtom,
  outputsActions
} from "@/state"
import { DragItemType } from "@/types"
import { isLeftClick } from "@/helpers"

import { useAutoScroll } from "./use-auto-scroll"
import { useSelectionZone } from "./use-selection-zone"
import { useDragTransformations } from "./use-drag-transformations"

export const isNodesHaveStateToReset = () => {
  const dragItem = DragItemAtom.get()
  const nodes = NodesAtom.get()

  const hasState = nodes.some((node) => Boolean(node.state))

  return hasState && dragItem.type && [DragItemType.connection, DragItemType.click].includes(dragItem.type)
}

export const useDnD = ({
  zoomContainerRef,
  editorContainerRef
}: {
  zoomContainerRef: React.RefObject<HTMLDivElement>
  editorContainerRef: React.RefObject<HTMLDivElement>
}) => {
  const checkAutoScrollEnable = useAutoScroll(editorContainerRef)
  const { initSelectionZone, expandSelectionZone } = useSelectionZone(zoomContainerRef)
  const dragTransformations = useDragTransformations({ expandSelectionZone, zoomContainerRef })

  const onDrag = (e: React.MouseEvent<HTMLElement>) => {
    const dragItem = DragItemAtom.get()

    if (!dragItem.type) return

    const isDragItemPositionChanged = e.clientX !== dragItem.x || e.clientY !== dragItem.y

    if (dragItem.type === DragItemType.click && isDragItemPositionChanged) {
      DragItemAtom.set({ ...dragItem, type: DragItemType.viewPort })
    }

    dragTransformations[dragItem.type](e)

    if ([DragItemType.node, DragItemType.connection, DragItemType.selectionZone].includes(dragItem.type)) {
      checkAutoScrollEnable(e)
    }

    DragItemAtom.set({ ...DragItemAtom.get(), x: e.clientX, y: e.clientY })
  }

  // eslint-disable-next-line max-statements
  const onDragEnded = () => {
    autoScrollActions.resetAutoscroll()
    SelectionZoneAtom.set(null)
    const dragItem = DragItemAtom.get()
    const outputs = OutputsAtom.get()

    if (dragItem.type === DragItemType.connection) {
      const hoveredNodeId = HoveredNodeIdAtom.get()
      const nodes = NodesAtom.get()

      const inputNode = nodes.find((node) => hoveredNodeId === node.id)!
      const outputNode = nodes.find((node) => node.id === dragItem.id)

      const isNew = dragItem.output?.nextNodeId === null

      if (!dragItem.output) throw new Error("Output is not defined")

      if (!inputNode && outputNode && !isNew) {
        outputsActions.clearNextNodeId({ outputId: dragItem.output.id })

        NodesAtom.set(nodes.map((node) => (node.id === outputNode.id ? node : { ...node, state: null })))
      }

      const inputIdsForInputNode = outputs.filter((out) => out.nextNodeId === inputNode?.id)

      if (inputNode && outputNode && inputNode.inputNumber > inputIdsForInputNode.length) {
        const nodesAreEqual = outputNode.id === inputNode.id

        if (!nodesAreEqual || inputNode.isCyclic) {
          outputsActions.setNextNodeId({ outputId: dragItem.output.id, nextNodeId: inputNode.id })
        }
      }
    }

    if (isNodesHaveStateToReset()) {
      nodeActions.clearNodesState()
    }

    DragItemAtom.set({ x: 0, y: 0 })
  }

  const onDragStarted: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const leftPressed = isLeftClick(e)

    const isShiftPressed = ShiftPressedAtom.get()
    const dragItem = DragItemAtom.get()

    if (leftPressed && !dragItem.type && isShiftPressed) {
      DragItemAtom.set({ type: DragItemType.selectionZone, x: e.clientX, y: e.clientY })

      initSelectionZone(e)

      return
    }

    if (leftPressed && !dragItem.type) {
      return DragItemAtom.set({ type: DragItemType.click, x: e.clientX, y: e.clientY })
    }
  }

  return { onDrag, onDragEnded, onDragStarted }
}
