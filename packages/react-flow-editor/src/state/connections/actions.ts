import { outputsActions } from "../outputs"
import { DEFAULT_VALUE, HoveredConnectionAtom, SelectedConnectionAtom } from "./store"

export const clearSelectedConnection = () => {
  SelectedConnectionAtom.set(DEFAULT_VALUE)
}

export const clearHoveredConnection = () => {
  HoveredConnectionAtom.set(DEFAULT_VALUE)
}

export const removeSelectedConnection = () => {
  const selectedConnection = SelectedConnectionAtom.get()

  if (!selectedConnection.outputId) return

  outputsActions.clearNextNodeId({ outputId: selectedConnection.outputId })
  clearSelectedConnection()
}
