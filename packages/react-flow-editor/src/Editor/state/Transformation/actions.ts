import { action } from "nanostores"

import { DragItemAtom } from "../DragItem"
import { TransformationMap } from "./store"

export const dragViewportHandler = action(
  TransformationMap,
  "dragViewportHandler",
  (store, e: React.MouseEvent<HTMLElement>) => {
    const dragItem = DragItemAtom.get()
    const transformation = store.get()

    const newPos = {
      x: (e.clientX - dragItem.x) / transformation.zoom,
      y: (e.clientY - dragItem.y) / transformation.zoom
    }

    store.set({
      ...transformation,
      dx: transformation.dx + newPos.x,
      dy: transformation.dy + newPos.y
    })
  }
)
