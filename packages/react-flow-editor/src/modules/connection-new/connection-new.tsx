import { useStore } from "@nanostores/react"

import { DragItemType } from "@/types"
import { Node } from "@/domain-types"
import { DragItemAtom, NewConnectionAtom, NodesAtom } from "@/state"
import { useEditorContext } from "@/context/editor-context"
import { DEFAULT_ACTIVE_COLOR } from "@/constants"
import { Connection } from "@/modules/connection/connection"
import { Arrow } from "@/modules/arrows"
import { useNodeRelativePosition } from "@/hooks"

const ConnectionNewBody = ({ outputNode }: { outputNode: Node }) => {
  const newConnectionPosition = useStore(NewConnectionAtom)
  const { connectorStyleConfig } = useEditorContext()

  const dragItem = useStore(DragItemAtom)

  const { rectWasSet, ...outputPosition } = useNodeRelativePosition({
    inNodePosition: dragItem.output?.position,
    node: outputNode
  })

  if (!rectWasSet) return null

  return (
    <>
      <Arrow color={connectorStyleConfig?.hoverColor || DEFAULT_ACTIVE_COLOR} />
      <Connection
        outputPosition={outputPosition}
        inputPosition={newConnectionPosition}
        strokeColor={connectorStyleConfig?.hoverColor || DEFAULT_ACTIVE_COLOR}
        isNew
      />
    </>
  )
}

export const ConnectionNew = () => {
  const nodes = useStore(NodesAtom)
  const dragItem = useStore(DragItemAtom)

  const outputNode = nodes.find((node) => node.id === dragItem?.id)

  if (!outputNode || dragItem.type !== DragItemType.connection) return null

  return <ConnectionNewBody outputNode={outputNode} />
}
