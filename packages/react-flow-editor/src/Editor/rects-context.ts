import { createContext, useContext } from "react"

import { MountedContexts } from "./types"

export const RectsContext = createContext<MountedContexts>({} as MountedContexts)

export const useRectsContext = () => useContext(RectsContext)
