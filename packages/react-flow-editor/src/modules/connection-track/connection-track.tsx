import React from "react"
import { useStore } from "@nanostores/react"

import { Output } from "@/domain-types"
import { NodesAtom, SvgOffsetAtom } from "@/state"
import { useEditorContext } from "@/context/editor-context"
import { DEFAULT_ACTIVE_COLOR, DEFAULT_COLOR } from "@/constants"
import { getNodeRelativePosition } from "@/helpers"
import { useNodeRelativePosition } from "@/hooks"
import { Arrow, ArrowDisconnect } from "@/modules/arrows"
import { Connection } from "@/modules/connection"

export const ConnectionTrack = ({
  output,
  nodeId,
  nextNodeId,
  isActive = false,
  isSecondLayer = false
}: {
  output: Output
  nodeId: string
  nextNodeId: string
  isActive?: boolean
  isSecondLayer?: boolean
}) => {
  const nodes = useStore(NodesAtom)
  const node = nodes.find((node) => node.id === nodeId)!
  const nextNode = nodes.find((node) => node.id === nextNodeId)!
  const svgOffset = useStore(SvgOffsetAtom)
  const { connectorStyleConfig } = useEditorContext()

  const { rectWasSet, ...outputPosition } = useNodeRelativePosition({
    inNodePosition: output.position,
    node
  })

  if (!nextNode || !rectWasSet) return null

  const inputPosition = getNodeRelativePosition({
    inNodePosition: nextNode.inputPosition,
    nodePosition: nextNode.position,
    svgOffset
  })

  const strokeColor = isActive
    ? connectorStyleConfig?.activeColor || DEFAULT_ACTIVE_COLOR
    : connectorStyleConfig?.color || DEFAULT_COLOR

  const arrowId = output.id + node.id

  return (
    <React.Fragment key={`track${output.id}`}>
      <Connection
        outputPosition={outputPosition}
        inputPosition={inputPosition}
        nodeId={node.id}
        outputId={output.id}
        strokeColor={strokeColor}
        arrowId={arrowId}
        isSecondLayer={isSecondLayer}
      />
      <Arrow id={arrowId} color={strokeColor} />
      <ArrowDisconnect position={inputPosition} output={output} fromId={node.id} />
    </React.Fragment>
  )
}
