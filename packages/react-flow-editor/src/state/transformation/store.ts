import { map } from "nanostores"

import { Transformation } from "@/domain-types"

export const TransformationMap = map<Transformation>({
  dx: 0,
  dy: 0,
  zoom: 1
})
