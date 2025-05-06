import { Node, NodeState } from "@/domain-types"
import { OutputsAtom } from "@/state/outputs"

import { NodesAtom } from "../store"

const isNoNodeFreeInputs = (node: Node): boolean => {
  const outputs = OutputsAtom.get()

  return outputs.filter((output) => output.nodeId === node.id && output.nextNodeId).length === node.inputNumber
}

const notTheSameNode = (connectableNode: Node, curNode: Node): boolean => curNode.id !== connectableNode.id

export const markDisabledNodes = (connectableNode: Node) => {
  const nodes = NodesAtom.get()

  const disabledNodesIds = nodes
    .filter(
      (curNode) =>
        (notTheSameNode(connectableNode, curNode) && isNoNodeFreeInputs(curNode)) ||
        (curNode.id === connectableNode.id && !connectableNode.isCyclic)
    )
    .map((curNode) => curNode.id)

  NodesAtom.set(
    nodes.map((node) => (disabledNodesIds.includes(node.id) ? { ...node, state: NodeState.disabled } : node))
  )
}
