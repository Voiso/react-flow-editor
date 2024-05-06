import { atom } from "nanostores"

import { DragItemType } from "@/Editor/types"
import { Output, Point } from "@/types"

export type DragItemState = { type?: DragItemType; output?: Output; id?: string } & Point

export const DragItemAtom = atom<DragItemState>({
  type: undefined,
  output: undefined,
  id: undefined,
  x: 0,
  y: 0
})
