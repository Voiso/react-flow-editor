import { useStore } from "@nanostores/react"

import {
  autoScrollActions,
  DragItemAtom,
  HoveredNodeIdAtom,
  nodeActions,
  NodesAtom,
  SelectionZoneAtom
} from "@/Editor/state"

import { BUTTON_LEFT } from "../../constants"
import { DragItemType } from "../../types"
import { useAutoScroll } from "../autoScroll"
import { useSelectionZone } from "../useSelectionZone"
import { useDragTransformations } from "./useDragTransformations"
import { isNodesHaveStateToReset } from "./helpers"

export default ({
  zoomContainerRef,
  editorContainerRef
}: {
  zoomContainerRef: React.RefObject<HTMLDivElement>
  editorContainerRef: React.RefObject<HTMLDivElement>
}) => {
  const dragItem = useStore(DragItemAtom)

  const checkAutoScrollEnable = useAutoScroll(editorContainerRef)
  const { initSelectionZone, expandSelectionZone } = useSelectionZone(zoomContainerRef)
  const dragTranformations = useDragTransformations({ expandSelectionZone, zoomContainerRef })

  const onDrag = (e: React.MouseEvent<HTMLElement>) => {
    if (!dragItem.type) return

    dragTranformations[dragItem.type](e)

    if ([DragItemType.node, DragItemType.connection, DragItemType.selectionZone].includes(dragItem.type)) {
      checkAutoScrollEnable(e)
    }

    DragItemAtom.set({ ...DragItemAtom.get(), x: e.clientX, y: e.clientY })
  }

  const onDragEnded = () => {
    autoScrollActions.resetAutoscroll()

    if (isNodesHaveStateToReset()) {
      nodeActions.clearNodesState()
    }

    if (dragItem.type === DragItemType.connection) {
      const hoveredNodeId = HoveredNodeIdAtom.get()
      const nodes = NodesAtom.get()

      const inputNode = nodes.find((node) => hoveredNodeId === node.id)!
      const outputNode = nodes.find((node) => node.id === dragItem.id)

      const isNew = dragItem.output?.nextNodeId === null

      if (!inputNode && outputNode && !isNew) {
        NodesAtom.set(
          nodes.map((el) => {
            if (el.id !== outputNode.id) return { ...el, state: null }

            return {
              ...el,
              outputs: el.outputs.map((out) => (out.id === dragItem.output?.id ? { ...out, nextNodeId: null } : out)),
              state: null
            }
          })
        )
      }

      const inputIdsForInputNode = nodes.filter((node) =>
        node.outputs.map((out) => out.nextNodeId).includes(inputNode?.id)
      )

      if (inputNode && outputNode && inputNode.inputNumber > inputIdsForInputNode.length) {
        const nodesAreEqual = outputNode.id === inputNode.id

        if (!nodesAreEqual || inputNode.isCyclic) {
          NodesAtom.set(
            nodes.map((el) => ({
              ...el,
              outputs:
                el.id === outputNode.id
                  ? el.outputs.map((out) =>
                      out.id === dragItem.output?.id ? { ...out, nextNodeId: inputNode.id } : out
                    )
                  : el.outputs,
              state: null
            }))
          )
        }
      }
    }

    DragItemAtom.set({ x: 0, y: 0 })
    SelectionZoneAtom.set(null)
  }

  const onDragStarted: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button === BUTTON_LEFT && !dragItem.type) {
      if (e.shiftKey) {
        DragItemAtom.set({ type: DragItemType.selectionZone, x: e.clientX, y: e.clientY })
      } else {
        DragItemAtom.set({ type: DragItemType.viewPort, x: e.clientX, y: e.clientY })
      }

      initSelectionZone(e)
    }
  }

  return { onDrag, onDragEnded, onDragStarted }
}
