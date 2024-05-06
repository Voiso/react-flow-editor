import { action } from "nanostores"

import { Node, NodeState } from "@/types"

import { NodesAtom } from "../store"

const isNoNodeFreeInputs = (node: Node, nodes: Node[]): boolean =>
  nodes.filter((curNode) => curNode.outputs.map((out) => out.nextNodeId).includes(node.id)).length === node.inputNumber

const notTheSameNode = (connectableNode: Node, curNode: Node): boolean => curNode.id !== connectableNode.id

export const markDisabledNodes = action(NodesAtom, "changeNodeState", (store, connectableNode: Node) => {
  const nodes = store.get()

  const disabledNodesIds = nodes
    .filter((curNode) => notTheSameNode(connectableNode, curNode) && isNoNodeFreeInputs(curNode, nodes))
    .map((curNode) => curNode.id)

  store.set(
    store.get().map((node) => (disabledNodesIds.includes(node.id) ? { ...node, state: NodeState.disabled } : node))
  )
})
