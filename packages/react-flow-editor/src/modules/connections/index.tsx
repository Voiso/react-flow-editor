import { useEffect } from "react"
import { useStore } from "@nanostores/react"

import { NodesAtom, SvgOffsetAtom, TransformationMap, OutputsAtom } from "@/state"
import { MAX_Z_INDEX } from "@/constants"
import { ConnectionNode, ConnectionNodeActive } from "@/modules/connection-node"
import { ConnectionNew } from "@/modules/connection-new"

import { computeNodeGroupsRect, connectionContainerStyle } from "./helpers"
import { ArrowConnector } from "../arrows"

export const Connections = () => {
  const nodes = useStore(NodesAtom)
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

  return (
    <div className="con">
      <svg className="connections" style={connectionContainerStyle(nodesRect)}>
        <ConnectionNode />
        <ConnectionNew />
      </svg>
    </div>
  )
}

export const ActiveConnections = () => {
  const nodes = useStore(NodesAtom)
  const outputs = useStore(OutputsAtom)

  const transformation = useStore(TransformationMap)

  const nodesRect = computeNodeGroupsRect(nodes, transformation)

  return (
    <div className="con active">
      <svg
        className="connections connections--with-selected"
        style={{ ...connectionContainerStyle(nodesRect), zIndex: MAX_Z_INDEX }}
      >
        <ConnectionNodeActive />

        {outputs.map((output) => (
          <ArrowConnector key={output.id} node={nodes.find((node) => node.id === output.nodeId)!} output={output} />
        ))}
      </svg>
    </div>
  )
}
