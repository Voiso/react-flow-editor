import { atom } from "nanostores"

type OutputState = {
  nodeId: string | null
  outputId: string | null
}

const DEFAULT_VALUE = {
  nodeId: null,
  outputId: null
}

export const HoveredOutputAtom = atom<OutputState>(DEFAULT_VALUE)

export const clearHoveredOutput = () => {
  HoveredOutputAtom.set(DEFAULT_VALUE)
}
