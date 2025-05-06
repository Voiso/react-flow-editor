import { useStore } from "@nanostores/react"

import { DragItemAtom, TransformationMap } from "@/state"
import { MenuComponentProps } from "@/domain-types"
import { useRectsContext } from "@/context/rects-context"

type Props = {
  MenuComponent: (props: MenuComponentProps) => JSX.Element
}

export const Menu = ({ MenuComponent }: Props) => {
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
