import React from "react"
import { isEqual } from "lodash"
import { useStore } from "@nanostores/react"

import { Node as NodeType } from "@/domain-types"
import { HoveredNodeIdAtom } from "@/state"
import { useEditorContext } from "@/context/editor-context"
import { useNodeInteractions, useNodeOutputs } from "@/hooks"

import { nodeStyle } from "./helpers"
import { Output } from "../output"

type NodeProps = {
  node: NodeType
}

const Node = ({
  node,
  nodeInteractions
}: NodeProps & {
  nodeInteractions: ReturnType<typeof useNodeInteractions>
}) => {
  const { NodeComponent } = useEditorContext()
  const hoveredNodeId = useStore(HoveredNodeIdAtom)
  const nodeOutputs = useNodeOutputs(node.id)

  return (
    <div
      id={node.id}
      className="node"
      onMouseDown={nodeInteractions.onDragStarted}
      onMouseUp={nodeInteractions.onMouseUp}
      style={nodeStyle(node.position, nodeInteractions.zIndex)}
      onMouseEnter={nodeInteractions.onMouseEnter}
      onMouseLeave={nodeInteractions.onMouseLeave}
    >
      {nodeOutputs.map((out) => (
        <Output key={out.id} nodeId={node.id} nodeState={node.state} output={out} />
      ))}
      <NodeComponent {...node} isNodeHovered={hoveredNodeId === node.id} />
    </div>
  )
}

export const Provider = ({ node }: NodeProps) => {
  const nodeInteractions = useNodeInteractions(node)

  return <Node node={node} nodeInteractions={nodeInteractions} />
}

export default React.memo(Provider, isEqual)
