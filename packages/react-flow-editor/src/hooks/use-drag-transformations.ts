import { newConnectionActions, nodeActions, transformationActions } from "@/state"
import { DragItemType } from "@/types"

import { findDOMRect } from "../helpers"

export const useDragTransformations = ({
  expandSelectionZone,
  zoomContainerRef
}: {
  expandSelectionZone: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  zoomContainerRef: React.RefObject<HTMLDivElement>
}): Record<DragItemType, React.MouseEventHandler<HTMLElement>> => {
  const zoomRect = findDOMRect(zoomContainerRef.current)

  return {
    [DragItemType.click]: () => undefined,
    [DragItemType.connection]: (e: React.MouseEvent<HTMLElement>) => {
      newConnectionActions.dragNewConnectionHandler(e, zoomRect)
    },
    [DragItemType.viewPort]: (e: React.MouseEvent<HTMLElement>) => {
      transformationActions.dragViewportHandler(e)
    },
    [DragItemType.node]: (e: React.MouseEvent<HTMLElement>) => {
      nodeActions.dragNodeHandler(e)
    },
    [DragItemType.selectionZone]: (e: React.MouseEvent<HTMLElement>) => {
      expandSelectionZone(e)
      nodeActions.dragSelectionZoneHandler()
    },
    [DragItemType.connectionPoint]: (e: React.MouseEvent<HTMLElement>) => {
      newConnectionActions.startNewConnection(e, zoomRect)
    }
  }
}
