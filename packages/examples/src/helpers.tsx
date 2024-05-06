import { Node } from "@voiso/react-flow-editor"
import { action } from "nanostores"

import { DEFAULT_OUTPUT } from "./constants"
import { NodesAtom } from "./store"

export const nodeFactory = (nodeName?: string): Node => ({
  id: nodeName || `Node_${(Math.random() * 10000).toFixed()}`,
  position: { x: 140 + Math.random() * 100, y: 140 + Math.random() * 100 },
  inputNumber: 2,
  outputs: [{ id: `Out${(Math.random() * 10000).toFixed()}`, nextNodeId: null, position: DEFAULT_OUTPUT }],
  state: null
})

export const createNode = action(NodesAtom, "createNode", (store) => store.set(store.get().concat([nodeFactory()])))
