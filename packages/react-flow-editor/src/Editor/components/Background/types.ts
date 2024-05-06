import { HTMLAttributes } from "react"

export enum BackgroundVariant {
  Lines = "lines",
  Dots = "dots"
}

export interface BackgroundProps extends HTMLAttributes<SVGElement> {
  variant?: BackgroundVariant
  gap?: number
  color?: string
  size?: number
}

export type PatternDimensions = {
  scaledGap: number
  xOffset: number
  yOffset: number
}
