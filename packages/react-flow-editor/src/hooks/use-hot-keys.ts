import { useEffect } from "react"
import { useStore } from "@nanostores/react"

import { NodeState } from "@/domain-types"
import { useEditorContext } from "@/context/editor-context"

import { NodesAtom, ShiftPressedAtom, connectionActions, outputsActions } from "../state"

const removeSelectedNodes = (importantNodeIds: Array<string>) => {
  const nodes = NodesAtom.get()

  const selectedNodesIds = nodes
    .filter((node) => node.state === NodeState.selected)
    .filter((node) => importantNodeIds && !importantNodeIds.includes(node.id))
    .map((node) => node.id)

  if (!selectedNodesIds.length) return

  outputsActions.removeSelectedOutputs(selectedNodesIds)
  NodesAtom.set(nodes.filter((node) => !selectedNodesIds.includes(node.id)))
}

export const useHotKeys = () => {
  const isShiftPressed = useStore(ShiftPressedAtom)

  const { importantNodeIds } = useEditorContext()

  useEffect(() => {
    const onShiftReleased = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        ShiftPressedAtom.set(false)
      }
    }

    const hotKeysHandler = (e: KeyboardEvent) => {
      if (e.key === "Shift" && !isShiftPressed) {
        ShiftPressedAtom.set(true)
      }

      if (["Delete", "Backspace"].includes(e.code)) {
        removeSelectedNodes(importantNodeIds || [])
        connectionActions.removeSelectedConnection()
      }
    }

    window.addEventListener("keydown", hotKeysHandler)
    window.addEventListener("keyup", onShiftReleased)

    return () => {
      window.removeEventListener("keydown", hotKeysHandler)
      window.removeEventListener("keyup", onShiftReleased)
    }
  }, [])
}
