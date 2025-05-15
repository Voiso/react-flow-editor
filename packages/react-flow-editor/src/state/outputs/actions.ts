import { OutputsAtom } from "./store"

export const clearNextNodeId = ({ outputId }: { outputId?: string }) => {
  const outputs = OutputsAtom.get()

  OutputsAtom.set(outputs.map((output) => (output.id === outputId ? { ...output, nextNodeId: null } : output)))
}

export const setNextNodeId = ({ outputId, nextNodeId }: { outputId: string; nextNodeId: string }) => {
  const outputs = OutputsAtom.get()

  OutputsAtom.set(outputs.map((output) => (output.id === outputId ? { ...output, nextNodeId } : output)))
}

export const removeSelectedOutputs = (selectedNodesIds: string[]) => {
  const outputs = OutputsAtom.get()

  OutputsAtom.set(
    outputs
      .filter((output) => !selectedNodesIds.includes(output.nodeId))
      .map((output) => ({
        ...output,
        nextNodeId: output.nextNodeId && selectedNodesIds.includes(output.nextNodeId) ? null : output.nextNodeId
      }))
  )
}
