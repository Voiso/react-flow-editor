import React from "react"
import { isEqual } from "lodash"

import { Node as NodeType } from "@/types"

import { nodeStyle } from "./helpers"
import { useNodeInteractions } from "./useNodeInteractions"
import { useEditorContext } from "../../editor-context"
import { Output } from "../Output"

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

  return (
    <div
      id={node.id}
      className="node"
      onMouseDown={nodeInteractions.onDragStarted}
      onMouseUp={nodeInteractions.onMouseUp}
      style={nodeStyle(node.position, node.state, nodeInteractions.zIndex)}
      onMouseEnter={nodeInteractions.onMouseEnter}
      onMouseLeave={nodeInteractions.onMouseLeave}
    >
      {node.outputs.map((out) => (
        <Output key={out.id} nodeId={node.id} nodeState={node.state} output={out} />
      ))}
      <NodeComponent {...node} />
    </div>
  )
}

export const Provider = ({ node }: NodeProps) => {
  const nodeInteractions = useNodeInteractions(node)

  return <Node node={node} nodeInteractions={nodeInteractions} />
}

export default React.memo(Provider, isEqual)
