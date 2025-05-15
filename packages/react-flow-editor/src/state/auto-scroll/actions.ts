import { uniqBy } from "lodash"

import { DRAG_OFFSET_TRANSFORM } from "@/constants"

import { AutoScrollAtom, AutoScrollDirection } from "./store"

export const addAutoscrollDegree = (directionOverflow: number, direction: AutoScrollDirection) => {
  const autoScroll = AutoScrollAtom.get()

  AutoScrollAtom.set(
    uniqBy([{ speed: directionOverflow / DRAG_OFFSET_TRANSFORM, direction }, ...autoScroll], "direction")
  )
}

export const dropAutoscrollDegree = (direction: AutoScrollDirection) => {
  const autoScroll = AutoScrollAtom.get()

  const updatedDirections = autoScroll.filter((degree) => degree.direction !== direction)

  if (updatedDirections.length !== autoScroll.length) AutoScrollAtom.set(updatedDirections)
}

export const resetAutoscroll = () => AutoScrollAtom.set([])
