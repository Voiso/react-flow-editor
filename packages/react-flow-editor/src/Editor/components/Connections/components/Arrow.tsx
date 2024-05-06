import React from "react"

import { Size } from "@/types"
import { DEFAULT_COLOR } from "@/Editor/constants"

type ArrowProps = {
  color?: string
} & Partial<Size>

export const ARROW_ID = "triangle"

export const Arrow: React.FC<ArrowProps> = ({ color = DEFAULT_COLOR, width = 10, height = 10 }) => (
  <defs>
    <marker
      id={ARROW_ID}
      viewBox={`0 0 ${width} ${height}`}
      refX={width / 2}
      refY={height / 2}
      preserveAspectRatio="none"
      markerUnits="strokeWidth"
      markerWidth={width}
      markerHeight={height}
      stroke="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.646447 0.646446C0.84171 0.451184 1.15829 0.451185 1.35355 0.646447L5.35355 4.64646C5.44732 4.74023 5.5 4.86741 5.5 5.00002C5.5 5.13263 5.44732 5.2598 5.35355 5.35357L1.35355 9.35355C1.15829 9.54882 0.841708 9.54881 0.646446 9.35355C0.451184 9.15829 0.451185 8.84171 0.646447 8.64645L4.29289 5.00002L0.646446 1.35355C0.451184 1.15829 0.451185 0.841708 0.646447 0.646446Z"
        fill={color}
      />
    </marker>
  </defs>
)
