import React from "react"

export const createGridLinesPath = (size: number, strokeWidth: number, stroke: string): React.ReactElement => (
  <path stroke={stroke} strokeWidth={strokeWidth} d={`M${size / 2} 0 V${size} M0 ${size / 2} H${size}`} />
)

export const createGridDotsPath = (size: number, fill: string): React.ReactElement => (
  <circle cx={size} cy={size} r={size} fill={fill} />
)
