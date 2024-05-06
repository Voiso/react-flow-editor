import React, { FC } from "react"
import { useStore } from "@nanostores/react"

import { DragItemAtom, TransformationMap } from "@/Editor/state"
import { MenuComponentProps } from "@/types"
import { useRectsContext } from "@/Editor/rects-context"

type Props = {
  MenuComponent: FC<MenuComponentProps>
}

export const Menu: FC<Props> = ({ MenuComponent }) => {
  const transformation = useStore(TransformationMap)
  const { editorContainerRef, zoomContainerRef } = useRectsContext()
  const preventCanvasMove = () => DragItemAtom.set({ type: undefined, x: 0, y: 0 })

  if (!zoomContainerRef.current || !editorContainerRef.current) return null

  return (
    <div onMouseDownCapture={preventCanvasMove}>
      <MenuComponent
        setTransformation={TransformationMap.set}
        transformation={transformation}
        zoomContainer={zoomContainerRef.current}
        editorContainer={editorContainerRef.current}
      />
    </div>
  )
}
