import { useEffect, useRef, useState } from "react"
import { useStore } from "@nanostores/react"

import { MenuComponentProps, ScaleComponentProps } from "@/domain-types"
import { Background } from "@/modules/background"
import { resetEvent, transformCanvasStyle } from "@/helpers"
import { useDnD, useZoom, useHotKeys, useCursor } from "@/hooks"
import { NodesContainer } from "@/modules/node"
import { RectsContext } from "@/context/rects-context"
import { TransformationMap } from "@/state"
import { SelectionZone } from "@/modules/selection-zone"
import { Scale } from "@/modules/scale"
import { Menu } from "@/modules/menu"
import { MountedContexts } from "@/types"

type Props = {
  SelectionZoneComponent?: () => JSX.Element
  ScaleComponent?: (props: ScaleComponentProps) => JSX.Element
  MenuComponent?: (props: MenuComponentProps) => JSX.Element
}

export const Canvas = ({ SelectionZoneComponent, ScaleComponent, MenuComponent }: Props) => {
  const zoomContainerRef = useRef<HTMLDivElement | null>(null)
  const editorContainerRef = useRef<HTMLDivElement | null>(null)
  const [rectsContextValue, setRectsContextValue] = useState<MountedContexts>({ zoomContainerRef, editorContainerRef })

  useEffect(() => setRectsContextValue((prev) => ({ ...prev, isMounted: true })), [])

  const transformation = useStore(TransformationMap)

  const { onDrag, onDragEnded, onDragStarted } = useDnD({
    editorContainerRef,
    zoomContainerRef
  })
  const { onWheel } = useZoom({ zoomContainerRef, editorContainerRef })

  useHotKeys()
  useCursor({ editorContainerRef })

  return (
    <RectsContext.Provider value={rectsContextValue}>
      <div
        onMouseUpCapture={onDragEnded}
        onMouseMove={onDrag}
        onWheel={onWheel}
        onMouseDownCapture={onDragStarted}
        onContextMenu={resetEvent}
        ref={editorContainerRef}
        className="react-flow-editor"
      >
        <div ref={zoomContainerRef} className="zoom-container" style={transformCanvasStyle(transformation)}>
          <NodesContainer />
        </div>
        <Background />
        {SelectionZoneComponent && (
          <SelectionZone zoomContainerRef={zoomContainerRef}>
            <SelectionZoneComponent />
          </SelectionZone>
        )}
        {MenuComponent && <Menu MenuComponent={MenuComponent} />}
        {ScaleComponent && <Scale ScaleComponent={ScaleComponent} />}
      </div>
    </RectsContext.Provider>
  )
}
