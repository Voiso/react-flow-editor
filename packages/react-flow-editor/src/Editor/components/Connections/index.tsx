import React, { useEffect } from "react"
import { useStore } from "@nanostores/react"

import { NodesAtom, SvgOffsetAtom, TransformationMap } from "@/Editor/state"

import { Connection } from "./components/Connection"
import { NewConnection } from "./components/NewConnection"
import { computeNodeGroupsRect, connectionContainerStyle } from "./helpers"
import { Arrow } from "./components/Arrow"
import { useEditorContext } from "../../editor-context"

export const Container: React.FC = () => {
  const { connectorStyleConfig } = useEditorContext()
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
        <Arrow color={connectorStyleConfig?.color} />
        {nodes.map((node) => (
          <Connection key={node.id} node={node} />
        ))}
        <NewConnection />
      </svg>
    </div>
  )
}
