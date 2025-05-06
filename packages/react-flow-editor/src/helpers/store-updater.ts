import { useEffect } from "react"
import { WritableAtom } from "nanostores"
import { useStore } from "@nanostores/react"

import { NodesAtom } from "@/state/nodes"
import { OutputsAtom } from "@/state/outputs"
import { SelectionZoneAtom } from "@/state/selection-zone"
import { EditorProps } from "@/domain-types"

type Props = Pick<EditorProps, "nodes" | "outputs" | "onNodesChange" | "onOutputsChange" | "onSelectionZoneChanged">

const useSynchronizeWithStore = <T = unknown>(
  entity: T,
  storeEntity: WritableAtom<T>,
  updateEntity?: (entity: T) => void
) => {
  useEffect(() => {
    storeEntity.set(entity)
  }, [entity])

  useEffect(() => {
    let unsubCallback: (() => void) | null = null

    if (updateEntity) {
      unsubCallback = storeEntity.subscribe((value) => updateEntity(value))
    }

    return () => {
      if (unsubCallback) {
        unsubCallback()
      }
    }
  }, [updateEntity, storeEntity])
}

/**
 * Used for sync props with inner store
 */
export const StoreUpdater = ({ nodes, outputs, onNodesChange, onOutputsChange, onSelectionZoneChanged }: Props) => {
  const selectionZone = useStore(SelectionZoneAtom)

  useSynchronizeWithStore(nodes, NodesAtom, onNodesChange)
  useSynchronizeWithStore(outputs, OutputsAtom, onOutputsChange)
  useSynchronizeWithStore(selectionZone, SelectionZoneAtom, onSelectionZoneChanged)

  return null
}
