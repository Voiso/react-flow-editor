import { isEqual } from "lodash"
import React from "react"
import { useStore } from "@nanostores/react"

import { NodeState, Output as OutputType } from "@/domain-types"
import {
  DragItemAtom,
  HoveredConnectionAtom,
  HoveredNodeIdAtom,
  HoveredOutputAtom,
  SelectedConnectionAtom
} from "@/state"
import { useEditorContext } from "@/context/editor-context"

type Props = {
  nodeId: string
  nodeState: NodeState | null
  output: OutputType
}

export const Output = React.memo(({ nodeId, nodeState, output }: Props) => {
  const { OutputComponent } = useEditorContext()
  const hoveredNodeId = useStore(HoveredNodeIdAtom)
  const dragItem = useStore(DragItemAtom)
  const hoveredConnection = useStore(HoveredConnectionAtom)
  const selectedConnection = useStore(SelectedConnectionAtom)
  const hoveredOutput = useStore(HoveredOutputAtom)

  const isDragging = dragItem.output?.id === output.id && dragItem.id === nodeId

  const isActive = Boolean(output.nextNodeId) || isDragging

  const isSelected =
    (((hoveredConnection.nodeId === nodeId && hoveredConnection.outputId === output.id) ||
      (selectedConnection.nodeId === nodeId && selectedConnection.outputId === output.id)) &&
      Boolean(output.nextNodeId)) ||
    isDragging

  if (!OutputComponent) return null

  return (
    <div
      className="dot"
      style={{
        bottom: `${output.position.y}px`,
        left: `${output.position.x}px`
      }}
    >
      <OutputComponent
        nodeId={nodeId}
        isNodeHovered={hoveredNodeId === nodeId}
        isHovered={hoveredOutput.outputId === output.id && hoveredOutput.nodeId === nodeId}
        isActive={isActive}
        nodeState={nodeState}
        isSelected={isSelected}
      />
    </div>
  )
}, isEqual)
