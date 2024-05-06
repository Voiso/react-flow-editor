import { Node } from "@voiso/react-flow-editor"

export const NodeAttributes = ({ nodes }: { nodes: Node[] }) => (
  <div>
    <h2>Nodes attributes</h2>
    {nodes.map((node) => (
      <pre key={node.id}> {JSON.stringify(node).replaceAll(/([{,])/g, "$1\n")}</pre>
    ))}
  </div>
)
