import { DISCONNECT_ZONE } from "@/constants"
import { Point } from "@/domain-types"

export const disconnectStyle = (pos: Point, zone = DISCONNECT_ZONE) => ({
  transform: `translate(${pos.x - zone / 2}px, ${pos.y - zone / 2}px)`,
  width: zone,
  height: zone
})
