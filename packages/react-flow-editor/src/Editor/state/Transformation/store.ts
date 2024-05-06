import { map } from "nanostores"

import { Transformation } from "@/types"

export const TransformationMap = map<Transformation>({
  dx: 0,
  dy: 0,
  zoom: 1
})
