import React from "react"
import { useStore } from "@nanostores/react"

import { Node, Output } from "@/types"
import { DragItemType } from "@/Editor/types"
import { DragItemAtom, NodesAtom, SvgOffsetAtom } from "@/Editor/state"

import ArrowDisconnector from "./ArrowDisconnector"
import InputConnection from "./InputConnection"

type ConnectionProps = {
  node: Node
}

export const ConnectionTrack: React.FC<{ output: Output; node: Node }> = ({ output, node }) => {
  const nodes = useStore(NodesAtom)

  const nextNode = nodes.find((node) => node.id === output.nextNodeId)

  if (!nextNode) return null

  const svgOffset = SvgOffsetAtom.get()

  const outputPosition = {
    x: -svgOffset.x + node.position.x + output.position.x,
    y: -svgOffset.y + node.position.y + output.position.y
  }

  const inputPosition = nextNode && {
    x: -svgOffset.x + nextNode.position.x + (nextNode?.inputPosition?.x || 0),
    y: -svgOffset.y + nextNode.position.y + (nextNode?.inputPosition?.y || 0)
  }

  return (
    <React.Fragment key={output.id}>
      <InputConnection outputPosition={outputPosition} inputPosition={inputPosition} />
      <ArrowDisconnector position={inputPosition} output={output} fromId={node.id} />
    </React.Fragment>
  )
}

export const Connection: React.FC<ConnectionProps> = ({ node }) => {
  const dragItem = useStore(DragItemAtom)

  const filteredConnections = node.outputs.filter(
    (out) =>
      !(
        dragItem.type === DragItemType.connection &&
        out.nextNodeId === dragItem.output?.nextNodeId &&
        out.id === dragItem.output.id
      )
  )

  return (
    <>
      {filteredConnections.map((out) => (
        <ConnectionTrack key={out.id} node={node} output={out} />
      ))}
    </>
  )
}
