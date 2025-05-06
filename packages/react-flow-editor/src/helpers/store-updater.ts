import { useEffect } from "react"
import { WritableAtom } from "nanostores"
import { useStore } from "@nanostores/react"

import { NodesAtom } from "@/state/nodes"
import { OutputsAtom } from "@/state/outputs"
import { SelectionZoneAtom } from "@/state/selection-zone"
import { EditorProps } from "@/domain-types"

type Props = Pick<EditorProps, "nodes" | "outputs" | "onNodesChange" | "onOutputsChange" | "onSelectionZoneChanged">

const synchronizeWithStore = <T = unknown>(
  entity: T,
  storeEntity: WritableAtom<T>,
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
export const StoreUpdater = ({ nodes, outputs, onNodesChange, onOutputsChange, onSelectionZoneChanged }: Props) => {
  const selectionZone = useStore(SelectionZoneAtom)

  synchronizeWithStore(nodes, NodesAtom, onNodesChange)
  synchronizeWithStore(outputs, OutputsAtom, onOutputsChange)
  synchronizeWithStore(selectionZone, SelectionZoneAtom, onSelectionZoneChanged)

  return null
}
