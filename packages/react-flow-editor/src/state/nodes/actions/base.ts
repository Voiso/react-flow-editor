import { NodeState } from "@/domain-types"

import { NodesAtom } from "../store"

export const changeNodeState = (nodeId: string, state: NodeState) => {
  NodesAtom.set(NodesAtom.get().map((node) => (node.id === nodeId ? { ...node, state } : node)))
}

export const changeNodesState = (nodeIds: string[], state: NodeState) => {
  NodesAtom.set(NodesAtom.get().map((node) => (nodeIds.includes(node.id) ? { ...node, state } : node)))
}

export const clearNodesState = () => {
  NodesAtom.set(NodesAtom.get().map((node) => ({ ...node, state: null })))
}
