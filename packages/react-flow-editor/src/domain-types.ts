export type Size = {
  width: number
  height: number
}

export type Point = {
  x: number
  y: number
}

export type RectZone = {
  left: number
  right: number
  top: number
  bottom: number
}

export type SelectionZone = {
  cornerStart: Point
  cornerEnd: Point
}

export enum NodeState {
  dragging = "dragging",
  selected = "selected",
  disabled = "disabled"
}

export type Output = {
  id: string
  position: Point
  nodeId: string
  nextNodeId: string | null
}

export type Transformation = {
  dx: number
  dy: number
  zoom: number
}

export type Node = {
  id: string
  position: Point
  inputNumber: number
  state: NodeState | null
  inputPosition?: Point
  isCyclic?: boolean
}

export type ConnectorStyleConfig = {
  activeColor: string
  color: string
  width: number
  hoverColor: string
}

export type ScaleComponentProps = {
  zoomIn: (step?: number) => void
  zoomOut: (step?: number) => void
  overview: () => void
}

export type OutputComponentProps = {
  nodeId: string
  isActive: boolean
  isHovered: boolean
  isNodeHovered: boolean
  isSelected: boolean
  nodeState: NodeState | null
}

export type NodeComponentProps = Node & {
  isNodeHovered: boolean
}

export type MenuComponentProps = {
  setTransformation: (transformation: Transformation) => void
  transformation: Transformation
  zoomContainer: HTMLDivElement
  editorContainer: HTMLDivElement
}

export type EditorProps = {
  nodes: Node[]
  outputs: Output[]
  onNodesChange: (nodes: Node[]) => void
  onOutputsChange: (outputs: Output[]) => void
  onSelectionZoneChanged?: (selectionZone: null | SelectionZone) => void
  NodeComponent: (props: NodeComponentProps) => JSX.Element
  SelectionZoneComponent?: () => JSX.Element
  ScaleComponent?: (props: ScaleComponentProps) => JSX.Element
  MenuComponent?: (props: MenuComponentProps) => JSX.Element
  OutputComponent?: (props: OutputComponentProps) => JSX.Element
  importantNodeIds?: Array<string>
  connectorStyleConfig?: Partial<ConnectorStyleConfig>
}
