import { useStore } from "@nanostores/react"
import { useEffect } from "react"

import { DragItemType } from "@/types"
import { DragItemAtom, ShiftPressedAtom } from "@/state"

export const useCursor = ({ editorContainerRef }: { editorContainerRef: React.RefObject<HTMLDivElement> }) => {
  const isShiftPressed = useStore(ShiftPressedAtom)
  const dragItem = useStore(DragItemAtom)

  const setCursor = (cursor: string) => {
    if (!editorContainerRef.current) return

    editorContainerRef.current.style.cursor = cursor

    if (cursor === "grab") {
      editorContainerRef.current.removeAttribute("data-hover-disabled")
    } else {
      editorContainerRef.current.setAttribute("data-hover-disabled", "")
    }
  }

  useEffect(() => {
    if (!dragItem.type) {
      if (isShiftPressed) {
        setCursor("default")
      } else {
        setCursor("grab")
      }
    }
  }, [isShiftPressed])

  useEffect(() => {
    if (!dragItem.type) {
      setCursor(isShiftPressed ? "default" : "grab")

      return
    }

    if (dragItem.type === DragItemType.selectionZone) {
      setCursor("crosshair")

      return
    }

    if (
      [
        DragItemType.click,
        DragItemType.viewPort,
        DragItemType.connection,
        DragItemType.connectionPoint,
        DragItemType.node
      ].includes(dragItem.type)
    ) {
      setCursor("grabbing")

      return
    }

    setCursor("grab")
  }, [dragItem.type])
}
