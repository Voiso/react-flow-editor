import { atom } from "nanostores"

import { Point, Size } from "@/types"

export type SVGOffsetState = Point & Size

export const SvgOffsetAtom = atom<SVGOffsetState>({ x: 0, y: 0, width: 0, height: 0 })
