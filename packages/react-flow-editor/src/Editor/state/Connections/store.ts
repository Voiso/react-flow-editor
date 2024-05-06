import { atom } from "nanostores"

import { ActiveConnection } from "@/types"

export const SelectedConnectionAtom = atom<ActiveConnection>([])

export const HoveredConnectionAtom = atom<ActiveConnection>([])
