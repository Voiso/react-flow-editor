import { createRoot } from "react-dom/client"
import { useStore } from "@nanostores/react"
import { Editor } from "@voiso/react-flow-editor"
import "@voiso/react-flow-editor/styles"
import "./simple.scss"

import { initialNodes, STYLED_CONFIG, TIPS } from "./constants"
import {
  MenuComponent,
  NodeAttributes,
  NodeComponent,
  OutputComponent,
  ScaleComponent,
  SelectionZoneComponent
} from "./parts"
import { NodesAtom, OutputsAtom } from "./store"

const App = () => {
  const nodes = useStore(NodesAtom)
  const outputs = useStore(OutputsAtom)

  return (
    <div className="editor-root">
      <div className="header">Flow Editor</div>
      <div className="flow-info">
        <NodeAttributes />
      </div>
      <div className="react-editor-container">
        <Editor
          NodeComponent={NodeComponent}
          SelectionZoneComponent={SelectionZoneComponent}
          ScaleComponent={ScaleComponent}
          OutputComponent={OutputComponent}
          MenuComponent={MenuComponent}
          nodes={nodes}
          outputs={outputs}
          onNodesChange={NodesAtom.set}
          onOutputsChange={OutputsAtom.set}
          importantNodeIds={[initialNodes[0].id]}
          connectorStyleConfig={STYLED_CONFIG}
        />
      </div>
      <pre className="tips">{TIPS}</pre>
    </div>
  )
}

const root = createRoot(document.getElementById("root")!)

root.render(<App />)
