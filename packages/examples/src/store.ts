import { atom } from "nanostores"
import { Node, Output } from "@voiso/react-flow-editor"

import { initialNodes, outputs } from "./constants"

export const NodesAtom = atom<Node[]>(initialNodes)
export const OutputsAtom = atom<Output[]>(outputs)
