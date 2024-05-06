import { atom } from "nanostores"

import { SelectionZone } from "@/types"

export const SelectionZoneAtom = atom<SelectionZone | null>(null)
