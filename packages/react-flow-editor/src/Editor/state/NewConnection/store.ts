import { atom } from "nanostores"

import { Point } from "@/types"

export const NewConnectionAtom = atom<Point>({ x: 0, y: 0 })
