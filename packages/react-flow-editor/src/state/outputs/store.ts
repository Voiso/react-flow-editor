import { atom, computed } from "nanostores"

import { Output } from "@/domain-types"

import { HoveredConnectionAtom, SelectedConnectionAtom } from "../connections/store"

export const OutputsAtom = atom<Output[]>([])

export const ActiveOutputsAtom = computed(
  [OutputsAtom, SelectedConnectionAtom, HoveredConnectionAtom],
  (outputs, selectedConnection, hoveredConnection) =>
    outputs.filter(
      ({ id, nodeId }) =>
        (selectedConnection.outputId === id && selectedConnection.nodeId === nodeId) ||
        (hoveredConnection.outputId === id && hoveredConnection.nodeId === nodeId)
    )
)
