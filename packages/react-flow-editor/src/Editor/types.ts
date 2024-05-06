import { MutableRefObject } from "react"

export enum DragItemType {
  node = "node",
  connection = "connection",
  connectionPoint = "connectionPoint",
  viewPort = "viewPort",
  selectionZone = "selectionZone"
}

export enum Axis {
  x = "x",
  y = "y"
}

export type NodeGroupsRect = {
  leftPoint: number
  rightPoint: number
  topPoint: number
  bottomPoint: number
  realHeight: number
  realWidth: number
}

export type MountedContexts = {
  isMounted?: boolean
  zoomContainerRef: MutableRefObject<HTMLDivElement | null>
  editorContainerRef: MutableRefObject<HTMLDivElement | null>
}
