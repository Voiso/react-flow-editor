import { Node } from "@voiso/react-flow-editor"
import { action } from "nanostores"

import { NodesAtom, OutputsAtom } from "./store"
import { DEFAULT_INPUT, DEFAULT_OUTPUT, DEFAULT_OUTPUT_2 } from "./constants"

export const nodeFactory = (nodeName?: string): Node => ({
  id: nodeName || `Node_${(Math.random() * 10000).toFixed()}`,
  position: { x: 140 + Math.random() * 100, y: 140 + Math.random() * 100 },
  inputPosition: DEFAULT_INPUT,
  inputNumber: 2,
  state: null
})

export const outputFactory = (nodeId: string) => {
  const number = (Math.random() * 10000).toFixed()
  const id = `Output_${number}`
  const id_2 = `Output_${number + 1}`

  return [
    {
      id,
      nodeId,
      nextNodeId: null,
      position: DEFAULT_OUTPUT
    },
    {
      id: id_2,
      nodeId,
      nextNodeId: null,
      position: DEFAULT_OUTPUT_2
    }
  ]
}

export const createNode = action(NodesAtom, "createNode", (store) => {
  const newNode = nodeFactory()

  store.set(store.get().concat([newNode]))

  const newOutputs = outputFactory(newNode.id)

  OutputsAtom.set(OutputsAtom.get().concat([...newOutputs]))

  return newNode
})
