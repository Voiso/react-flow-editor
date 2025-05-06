import { ARROW_ID } from "@/constants"
import { Size } from "@/domain-types"

type ArrowProps = {
  id?: string
  color: string
  isNew?: boolean
} & Partial<Size>

export const Arrow = ({ id = ARROW_ID, color, width = 5, height = 5 }: ArrowProps) => (
  <defs>
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX={8}
      refY={5}
      preserveAspectRatio="none"
      markerUnits="strokeWidth"
      markerWidth={width}
      markerHeight={height}
      stroke="none"
    >
      <path
        d="M1.12229 9.4383C0.718241 9.64045 0.274393 9.24495 0.428934 8.82014L1.81834 4.99983L0.428934 1.17854C0.274393 0.753734 0.718241 0.359203 1.12229 0.561351L9.10569 4.55256C9.39598 4.69807 9.4575 5.05549 9.29026 5.28987C9.24534 5.35334 9.18382 5.40803 9.10569 5.44709L1.12229 9.4383Z"
        fill={color}
      />
    </marker>
  </defs>
)
