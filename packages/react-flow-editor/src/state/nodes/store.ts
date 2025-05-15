import { atom } from "nanostores"

import { Node } from "@/domain-types"

export const NodesAtom = atom<Array<Node>>([])
