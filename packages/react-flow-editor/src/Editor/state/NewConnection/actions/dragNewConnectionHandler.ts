import React from "react"
import { action } from "nanostores"

import { SvgOffsetAtom } from "@/Editor/state/SvgOffset"
import { TransformationMap } from "@/Editor/state/Transformation"

import { NewConnectionAtom } from "../store"

export const dragNewConnectionHandler = action(
  NewConnectionAtom,
  "dragNewConnectionHandler",
  (store, e: React.MouseEvent<HTMLElement>, zoomRect: DOMRect) => {
    const transformation = TransformationMap.get()
    const svgOffset = SvgOffsetAtom.get()

    const newPos = {
      x: (e.clientX - zoomRect.left) / transformation.zoom - svgOffset.x,
      y: (e.clientY - zoomRect.top) / transformation.zoom - svgOffset.y
    }

    store.set(newPos)
  }
)
