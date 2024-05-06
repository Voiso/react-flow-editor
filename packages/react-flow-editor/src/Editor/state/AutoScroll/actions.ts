import { uniqBy } from "lodash"
import { action } from "nanostores"

import { DRAG_OFFSET_TRANSFORM } from "@/Editor/constants"

import { AutoScrollAtom, AutoScrollDirection } from "./store"

export const addAutoscrollDegree = action(
  AutoScrollAtom,
  "addAutoscrollDegree",
  (store, directionOverflow: number, direction: AutoScrollDirection) =>
    store.set(uniqBy([{ speed: directionOverflow / DRAG_OFFSET_TRANSFORM, direction }, ...store.get()], "direction"))
)

export const dropAutoscrollDegree = action(
  AutoScrollAtom,
  "dropAutoscrollDegree",
  (store, direction: AutoScrollDirection) => {
    const updatedDirections = store.get().filter((degree) => degree.direction !== direction)

    if (updatedDirections.length !== store.get().length) store.set(updatedDirections)
  }
)

export const resetAutoscroll = action(AutoScrollAtom, "resetAutoscroll", (store) => store.set([]))
