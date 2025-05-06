import { atom } from "nanostores"

import { Point } from "@/domain-types"

export const NewConnectionAtom = atom<Point>({ x: 0, y: 0 })
