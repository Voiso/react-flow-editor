import { MutableRefObject } from "react"

export enum DragItemType {
  node = "node",
  connection = "connection",
  connectionPoint = "connectionPoint",
  viewPort = "viewPort",
  selectionZone = "selectionZone",
  click = "click"
}

export enum Position {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right"
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
