import { useEffect } from "react"
import { useStore } from "@nanostores/react"

import {
  HoveredConnectionAtom,
  SelectedConnectionAtom,
  NodesAtom,
  SvgOffsetAtom,
  SVGOffsetState,
  TransformationMap,
  connectionsActions
} from "@/Editor/state"
import { ActiveConnection, Node, NodeState } from "@/types"

import { Connection } from "./components/Connection"
import { NewConnection } from "./components/NewConnection"
import { computeNodeGroupsRect, connectionContainerStyle, getOffsettedPosition } from "./helpers"
import { Arrow } from "./components/Arrow"
import { useEditorContext } from "../../editor-context"
import { ActiveConnection as ActiveConnectionComponent } from "./components/ActiveConnection"

const getNodeWithSelectedConnection = ({
  node,
  selectedConnection,
  svgOffset
}: {
  node: Node
  selectedConnection: Array<ActiveConnection>
  svgOffset: SVGOffsetState
}) => {
  const [selected, hovered] = selectedConnection

  const filtredOutputs = node.outputs.filter((out) => {
    const { x: offsettedXPosition, y: offsettedYPosition } = getOffsettedPosition({ node, position: out, svgOffset })

    return !(
      (Boolean(selected.length) && offsettedXPosition === selected[1]?.x && offsettedYPosition === selected[1].y) ||
      (Boolean(hovered.length) && offsettedXPosition === hovered[1]?.x && offsettedYPosition === hovered[1]?.y)
    )
  })

  if (node.outputs.length !== filtredOutputs.length) {
    return node
  }

  return null
}

export const Container = () => {
  const svgOffset = SvgOffsetAtom.get()

  const selectedConnection = useStore(SelectedConnectionAtom)
  const hoveredConnection = useStore(HoveredConnectionAtom)

  const { connectorStyleConfig } = useEditorContext()
  const nodes = useStore(NodesAtom)
  const isDraggingConnector = nodes.some((node) => node.state === NodeState.draggingConnector)

  const transformation = useStore(TransformationMap)

  const nodesRect = computeNodeGroupsRect(nodes, transformation)

  useEffect(() => {
    SvgOffsetAtom.set({
      x: nodesRect.leftPoint,
      y: nodesRect.topPoint,
      width: nodesRect.realWidth,
      height: nodesRect.realHeight
    })
  }, [nodesRect.leftPoint, nodesRect.topPoint, nodesRect.realHeight, nodesRect.realWidth])

  const onKeyDown = (evt: KeyboardEvent) => {
    evt.preventDefault()

    if (evt.key === "Backspace" || evt.key === "Delete") {
      connectionsActions.removeSelectedConnectionsHanlder()
    }
  }

  useEffect(() => {
    if (selectedConnection.length) {
      return document.addEventListener("keydown", onKeyDown)
    }

    return document.removeEventListener("keydown", onKeyDown)
  }, [selectedConnection])

  const nodesWithSelectedConnection: Array<Node> = nodes
    .map((node) =>
      getNodeWithSelectedConnection({
        node,
        svgOffset,
        selectedConnection: [selectedConnection, hoveredConnection]
      })
    )
    .filter((node): node is Node => Boolean(node))

  return (
    <div className="con">
      {Boolean(nodesWithSelectedConnection.length) && (
        <svg className="connections connections--with-selected" style={connectionContainerStyle(nodesRect)}>
          <Arrow color={connectorStyleConfig?.color} />
          {nodesWithSelectedConnection.map((node) => (
            <ActiveConnectionComponent key={node.id} node={node} />
          ))}
          <NewConnection />
        </svg>
      )}
      <svg
        className={`connections${isDraggingConnector ? " dragging-connection" : ""}`}
        style={connectionContainerStyle(nodesRect)}
      >
        <Arrow color={connectorStyleConfig?.color} />
        {nodes.map((node) => (
          <Connection key={node.id} node={node} />
        ))}
        <NewConnection />
      </svg>
    </div>
  )
}
