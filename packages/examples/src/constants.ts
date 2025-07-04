import { Node } from "@voiso/react-flow-editor"

export const DEFAULT_OUTPUT = {
  x: 149,
  y: 10
}

export const DEFAULT_OUTPUT_2 = {
  x: 149,
  y: 45
}

export const DEFAULT_INPUT = {
  x: 0,
  y: 25
}

export const initialNodes: Node[] = [
  {
    id: "Node_1",
    position: { x: 110, y: 110 },
    inputNumber: 0,
    inputPosition: DEFAULT_INPUT,
    isCyclic: false,
    state: null
  },
  {
    id: "Node_2",
    position: { x: 310, y: 310 },
    inputNumber: 10,
    inputPosition: DEFAULT_INPUT,
    isCyclic: true,
    state: null
  },
  {
    id: "Node_3",
    position: { x: 510, y: 510 },
    inputNumber: 10,
    inputPosition: DEFAULT_INPUT,
    state: null
  }
]

export const outputs = [
  { id: "N_1_1_1", nodeId: "Node_2", nextNodeId: "Node_2", position: DEFAULT_OUTPUT },
  { id: "N_1_2", nodeId: "Node_2", nextNodeId: null, position: DEFAULT_OUTPUT_2 },
  { id: "N_1_1_2", nodeId: "Node_1", nextNodeId: "Node_2", position: DEFAULT_OUTPUT },
  { id: "N_2_2", nodeId: "Node_1", nextNodeId: "Node_2", position: DEFAULT_OUTPUT_2 },
  { id: "N_3_1", nodeId: "Node_3", nextNodeId: null, position: DEFAULT_OUTPUT },
  { id: "N_3_2", nodeId: "Node_3", nextNodeId: null, position: DEFAULT_OUTPUT_2 }
]

export const pointPosition = { x: 30, y: -10 }
export const inputPosition = { x: 0, y: -10 }

export const TIPS = `
  - DnD with right mouse down to move canvas\n
  - Available autoScroll when DnD connection or nodes\n
  - Multiple Selection with left mouse click with shift on nodes\n
  - Multiple Selection with left mouse down and dragging select zone\n
  - Delete (multiple too) selected nodes with DELETE/BACKSPACE\n
  - DnD multiple selected nodes with left mouse down on selected nodes\n
  - Scroll mouse to zoom
`

export const STYLED_CONFIG = {
  width: 10,
  color: "#7d7d7d"
}
