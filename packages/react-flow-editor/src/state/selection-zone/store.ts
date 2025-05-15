import { atom } from "nanostores"

import { SelectionZone } from "@/domain-types"

export const SelectionZoneAtom = atom<SelectionZone | null>(null)
