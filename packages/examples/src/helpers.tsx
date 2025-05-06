import { Node } from "@voiso/react-flow-editor"
import { action } from "nanostores"

import { NodesAtom } from "./store"
import { DEFAULT_INPUT } from "./constants"

export const nodeFactory = (nodeName?: string): Node => ({
  id: nodeName || `Node_${(Math.random() * 10000).toFixed()}`,
  position: { x: 140 + Math.random() * 100, y: 140 + Math.random() * 100 },
  inputPosition: DEFAULT_INPUT,
  inputNumber: 2,
  state: null
})

export const createNode = action(NodesAtom, "createNode", (store) => store.set(store.get().concat([nodeFactory()])))
