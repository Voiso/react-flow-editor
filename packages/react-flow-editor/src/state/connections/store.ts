import { atom } from "nanostores"

type ConnectionState = {
  nodeId: string | null
  outputId: string | null
}

export const DEFAULT_VALUE: ConnectionState = {
  nodeId: null,
  outputId: null
}

export const SelectedConnectionAtom = atom<ConnectionState>(DEFAULT_VALUE)
export const HoveredConnectionAtom = atom<ConnectionState>(DEFAULT_VALUE)
