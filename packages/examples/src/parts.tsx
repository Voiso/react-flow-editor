import { useState } from "react"
import { Node, OutputComponentProps, ScaleComponentProps } from "@voiso/react-flow-editor"
import ReactJsonView from "@microlink/react-json-view"
import { useStore } from "@nanostores/react"

import { createNode } from "./helpers"
import { NodesAtom, OutputsAtom } from "./store"

export const NodeAttributes = () => {
  const nodes = useStore(NodesAtom)
  const outputs = useStore(OutputsAtom)

  return (
    <div>
      <ReactJsonView
        src={{ nodes, outputs }}
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
      />
    </div>
  )
}

export const NodeComponent = (node: Node) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`nodeElement ${node.state || ""}`}>
      <div>Node</div>
      {expanded && <div style={{ height: "100px" }}>Expanded</div>}
      <button onClick={() => setExpanded(!expanded)}>Toggle</button>
    </div>
  )
}

export const SelectionZoneComponent = () => <div className="selection-zone" />

export const OutputComponent = ({ isActive, nodeState, isSelected }: OutputComponentProps) => (
  <div>
    <div className={`${nodeState || ""} ${isActive ? "active" : ""} ${isSelected ? "selected-output" : ""}`} />
  </div>
)

export const ScaleComponent = ({ zoomIn, zoomOut, overview }: ScaleComponentProps) => (
  <div className="scale">
    <div className="scale-btn" onClick={() => zoomIn()}>
      Zoom in
    </div>
    <div className="scale-btn" onClick={() => zoomOut()}>
      Zoom out
    </div>
    <div className="scale-btn" onClick={overview}>
      Overview
    </div>
  </div>
)

export const MenuComponent = () => (
  <div className="flow-menu button" onClick={createNode}>
    Create new Node
  </div>
)
