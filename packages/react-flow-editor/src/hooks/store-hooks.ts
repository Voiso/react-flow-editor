import { useStore } from "@nanostores/react"

import { OutputsAtom } from "@/state/outputs"

export const useNodeOutputs = (nodeId: string) => useStore(OutputsAtom).filter((output) => output.nodeId === nodeId)
