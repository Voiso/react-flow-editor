import { MouseEvent } from "react"

export const isLeftClick = (event: MouseEvent): boolean => event.button === 0

export const isRightClick = (event: MouseEvent): boolean => event.button === 2
