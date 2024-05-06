import React, { useEffect, useRef, useState } from "react"
import { useStore } from "@nanostores/react"

import { MenuComponentProps, ScaleComponentProps } from "@/types"

import Background from "./components/Background/Background"
import { transformCanvasStyle } from "./helpers"
import useDnD from "./helpers/DnD"
import { useZoom } from "./helpers/zoom"
import { useHotKeys } from "./helpers/hotKeys"
import { NodesContainer } from "./components/Node"
import { RectsContext } from "./rects-context"
import { TransformationMap } from "./state"
import { SelectionZone } from "./components/SelectionZone"
import { Scale } from "./components/Scale"
import { Menu } from "./components/Menu"
import { MountedContexts } from "./types"

type Props = {
  SelectionZoneComponent?: React.FC
  ScaleComponent?: React.FC<ScaleComponentProps>
  MenuComponent?: React.FC<MenuComponentProps>
}

export const Canvas: React.FC<Props> = ({ SelectionZoneComponent, ScaleComponent, MenuComponent }) => {
  const zoomContainerRef = useRef<HTMLDivElement | null>(null)
  const editorContainerRef = useRef<HTMLDivElement | null>(null)
  const [rectsContextValue, setRectsContextValue] = useState<MountedContexts>({ zoomContainerRef, editorContainerRef })

  useEffect(() => setRectsContextValue((prev) => ({ ...prev, isMounted: true })), [])

  const transformation = useStore(TransformationMap)

  const { onDrag, onDragEnded, onDragStarted } = useDnD({ editorContainerRef, zoomContainerRef })
  const { onWheel } = useZoom({ zoomContainerRef, editorContainerRef })

  useHotKeys()

  return (
    <RectsContext.Provider value={rectsContextValue}>
      <div
        onMouseUpCapture={onDragEnded}
        onMouseMove={onDrag}
        onWheel={onWheel}
        onMouseDownCapture={onDragStarted}
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
