import { atom } from "nanostores"

import { DragItemType } from "@/types"
import { Output, Point } from "@/domain-types"

export type DragItemState = { type?: DragItemType; output?: Output; id?: string } & Point

export const ShiftPressedAtom = atom(false)

export const DragItemAtom = atom<DragItemState>({
  type: undefined,
  output: undefined,
  id: undefined,
  x: 0,
  y: 0
})
