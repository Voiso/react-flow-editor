import * as ReactDOM from "react-dom"
import { useStore } from "@nanostores/react"
import { Editor, Node, ScaleComponentProps, OutputComponentProps, ConnectorsBehaviour } from "@voiso/react-flow-editor"
import "./simple.scss"

import { initialNodes, STYLED_CONFIG, TIPS } from "./constants"
import { createNode } from "./helpers"
import { NodeAttributes } from "./parts"
import { ConnectorsBehaviourAtom, NodesAtom } from "./store"

const NodeComponent = (node: Node) => <div className={`nodeElement ${node.state || ""}`}>Node</div>

const SelectionZoneComponent = () => <div className="selection-zone" />

const OutputComponent = ({ isActive, nodeState, isOutlined }: OutputComponentProps) => (
  <div className={`${nodeState || ""} ${isActive ? "active" : ""} ${isOutlined ? "outlined" : ""}`} />
)

const ScaleComponent = ({ zoomIn, zoomOut, overview }: ScaleComponentProps) => (
  <div className="scale">
    <div className="scale-btn" onClick={zoomIn}>
      Zoom in
    </div>
    <div className="scale-btn" onClick={zoomOut}>
      Zoom out
    </div>
    <div className="scale-btn" onClick={overview}>
      Overview
    </div>
  </div>
)

const MenuComponent = () => (
  <div className="flow-menu button" onClick={createNode}>
    Create new Node
  </div>
)

const ConnectorsBehaviourComponent = () => {
  const connectorsBehaviour = useStore(ConnectorsBehaviourAtom)

  return (
    <div className="connectors-behaviour">
      {(["avoidSharpCorners", "middleInflection"] as Array<ConnectorsBehaviour>).map((type) => (
        <div
          key={type}
          onClick={() => ConnectorsBehaviourAtom.set(type)}
          className={connectorsBehaviour === type ? "active" : ""}
        >
          {type}
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const nodes = useStore(NodesAtom)
  const connectorsBehaviour = useStore(ConnectorsBehaviourAtom)

  return (
    <div className="editor-root">
      <div className="header">Flow Editor</div>
      <div className="flow-info">
        <NodeAttributes nodes={nodes} />
      </div>
      <ConnectorsBehaviourComponent />
      <div className="react-editor-container">
        <Editor
          NodeComponent={NodeComponent}
          SelectionZoneComponent={SelectionZoneComponent}
          ScaleComponent={ScaleComponent}
          OutputComponent={OutputComponent}
          MenuComponent={MenuComponent}
          nodes={nodes}
          onNodesChange={NodesAtom.set}
          importantNodeIds={[initialNodes[0].id]}
          connectorStyleConfig={STYLED_CONFIG}
          connectorsBehaviour={connectorsBehaviour}
        />
      </div>
      <pre className="tips">{TIPS}</pre>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
