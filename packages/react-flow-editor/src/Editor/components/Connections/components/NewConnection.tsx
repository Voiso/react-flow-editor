import React from "react"
import { useStore } from "@nanostores/react"

import { DragItemType } from "@/Editor/types"
import { DragItemAtom, NewConnectionAtom, NodesAtom, SvgOffsetAtom } from "@/Editor/state"

import InputConnection from "./InputConnection"

export const NewConnection: React.FC = () => {
  const nodes = useStore(NodesAtom)
  const newConnectionPosition = useStore(NewConnectionAtom)

  const svgOffset = useStore(SvgOffsetAtom)
  const dragItem = useStore(DragItemAtom)

  const outputNode = nodes.find((node) => node.id === dragItem?.id)

  if (!outputNode || dragItem.type !== DragItemType.connection) return null

  const outputPosition = {
    x: -svgOffset.x + outputNode.position.x + (dragItem.output?.position.x || 0),
    y: -svgOffset.y + outputNode.position.y + (dragItem.output?.position.y || 0)
  }

  return <InputConnection key={outputNode.id} outputPosition={outputPosition} inputPosition={newConnectionPosition} />
}
