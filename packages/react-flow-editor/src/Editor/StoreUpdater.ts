import { FC, useEffect } from "react"
import { MapStore, WritableAtom } from "nanostores"

import { NodesAtom } from "@/Editor/state/Nodes"
import { Node } from "@/types"

type Props = {
  nodes: Node[]
  onNodesChange?: (nodes: Node[]) => void
}

const synchronizeWithStore = <T extends Record<string, unknown> | Array<unknown>>(
  entity: T,
  storeEntity: WritableAtom<T> | MapStore<T>,
  updateEntity?: (entity: T) => void
) => {
  let unsubCallback: (() => void) | null = null

  useEffect(() => {
    storeEntity.set(entity)
  }, [entity])

  useEffect(() => {
    if (updateEntity && !unsubCallback) {
      unsubCallback = storeEntity.subscribe((value) => updateEntity(value))
    }

    return () => {
      if (unsubCallback) {
        unsubCallback()
      }
    }
  }, [updateEntity])
}

/**
 * Used for sync props with inner store
 */
export const StoreUpdater: FC<Props> = ({ nodes, onNodesChange }) => {
  synchronizeWithStore(nodes, NodesAtom, onNodesChange)

  return null
}
