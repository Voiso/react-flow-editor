import { createContext, useContext } from "react"

import { EditorProps } from "@/domain-types"

export const EditorContext = createContext<
  Pick<EditorProps, "NodeComponent" | "OutputComponent" | "importantNodeIds" | "connectorStyleConfig">
>({} as any)

export const useEditorContext = () => useContext(EditorContext)
