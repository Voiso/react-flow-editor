import { action } from "nanostores"

import { NodeState } from "@/types"

import { NodesAtom } from "../store"

export const changeNodeState = action(NodesAtom, "changeNodeState", (store, nodeId: string, state: NodeState) => {
  store.set(store.get().map((node) => (node.id === nodeId ? { ...node, state } : node)))
})

export const changeNodesState = action(NodesAtom, "changeNodesState", (store, nodeIds: string[], state: NodeState) => {
  store.set(store.get().map((node) => (nodeIds.includes(node.id) ? { ...node, state } : node)))
})

export const clearNodesState = action(NodesAtom, "clearNodesState", (store) => {
  store.set(store.get().map((node) => ({ ...node, state: null })))
})
