import * as React from "react"
import { Node } from "@voiso/react-flow-editor"

export const NodeAttributes: React.FC<{ nodes: Node[] }> = ({ nodes }) => (
  <div>
    <h2>Nodes attributes</h2>
    {nodes.map((node) => (
      <pre key={node.id}> {JSON.stringify(node).replaceAll(/([{,])/g, "$1\n")}</pre>
    ))}
  </div>
)
