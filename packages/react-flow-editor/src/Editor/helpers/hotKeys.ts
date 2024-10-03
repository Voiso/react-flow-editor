import { useEffect } from "react"

import { NodeState, Output } from "../../types"
import { KEY_CODE_BACK, KEY_CODE_DELETE } from "../constants"
import { useEditorContext } from "../editor-context"
import { NodesAtom } from "../state"

export const useHotKeys = () => {
  const { importantNodeIds } = useEditorContext()

  useEffect(() => {
    const hotKeysHandler = (e: KeyboardEvent) => {
      if ([KEY_CODE_BACK, KEY_CODE_DELETE].includes(e.key)) {
        const nodes = NodesAtom.get()

        const selectedNodesIds = nodes
          .filter((node) => node.state === NodeState.selected)
          .filter((node) => importantNodeIds && !importantNodeIds.includes(node.id))
          .map((node) => node.id)

        const addNextNodeId = (output: Output): Output => ({
          ...output,
          nextNodeId: output.nextNodeId && selectedNodesIds.includes(output.nextNodeId) ? null : output.nextNodeId
        })

        NodesAtom.set(
          nodes
            .filter((node) => !selectedNodesIds.includes(node.id))
            .map((node) => ({
              ...node,
              outputs: node.outputs.map(addNextNodeId)
            }))
        )
      }
    }

    window.addEventListener("keydown", hotKeysHandler)

    return () => window.removeEventListener("keydown", hotKeysHandler)
  }, [])
}
