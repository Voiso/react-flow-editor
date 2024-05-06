import { action } from "nanostores"

import { Output, Point } from "@/types"

import { HoveredConnectionAtom, SelectedConnectionAtom } from "./store"
import { NodesAtom } from "../Nodes"

export const setSelectedHanlder = action(
  SelectedConnectionAtom,
  "setSelectedConnectionsHanlder",
  (store, e: [Point, Point, string?, string?]) => {
    store.set(e)
  }
)

export const removeSelectedConnectionsHanlder = action(
  SelectedConnectionAtom,
  "removeSelectedConnectionHanlder",
  (store) => {
    const nodes = NodesAtom.get()
    // eslint-disable-next-line no-unused-vars
    const [_, __, id, nextNodeId] = store.get()

    const targetNode = nodes.find((node) => node.id === id)

    if (!targetNode) return

    const newNodes = nodes.map((node) => {
      const newOuts = node.outputs.reduce<Array<Output>>((acc, current) => {
        if (current.nextNodeId === nextNodeId && node.id === id) {
          return [...acc, { ...current, nextNodeId: null }]
        }

        return [...acc, current]
      }, [])

      if (node.id === targetNode?.id) {
        return {
          ...node,
          outputs: newOuts
        }
      }

      return node
    })

    SelectedConnectionAtom.set([])
    NodesAtom.set(newNodes)
  }
)

export const clearSelectedHanlder = action(SelectedConnectionAtom, "removeSelectedConnectionsHanlder", (store) => {
  store.set([])
})

export const setHoveredHanlder = action(
  HoveredConnectionAtom,
  "setHoveredConnectionsHanlder",
  (store, e: [Point, Point]) => {
    store.set(e)
  }
)

export const clearHoveredHanlder = action(HoveredConnectionAtom, "removeHoveredConnectionsHanlder", (store) => {
  store.set([])
})
