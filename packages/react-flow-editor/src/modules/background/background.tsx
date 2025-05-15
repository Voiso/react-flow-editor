import { useStore } from "@nanostores/react"

import { TransformationMap } from "@/state"

import { usePatternDimensions } from "./hooks"
import { BackgroundProps, BackgroundVariant } from "./types"
import { createGridLinesPath, createGridDotsPath } from "./utils"

const PATTERN_ID = "backgroundPattern"
const defaultColors = {
  [BackgroundVariant.Dots]: "#D6D6D8",
  [BackgroundVariant.Lines]: "#eee"
}

export const Background = ({ variant = BackgroundVariant.Dots, gap = 14, size = 1, color }: BackgroundProps) => {
  const transformation = useStore(TransformationMap)
  const { scaledGap, xOffset, yOffset } = usePatternDimensions(gap)

  const bgColor = color || defaultColors[`${variant}`]
  const path =
    variant === BackgroundVariant.Lines
      ? createGridLinesPath(scaledGap, size, bgColor)
      : createGridDotsPath(size * transformation.zoom, bgColor)

  return (
    <svg className="react-flow__background">
      <pattern
        id={PATTERN_ID}
        x={xOffset}
        y={yOffset}
        width={scaledGap}
        height={scaledGap}
        patternUnits="userSpaceOnUse"
      >
        {path}
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${PATTERN_ID})`} />
    </svg>
  )
}
