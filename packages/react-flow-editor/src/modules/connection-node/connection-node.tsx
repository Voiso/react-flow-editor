import { useStore } from "@nanostores/react"

import { DragItemType } from "@/types"
import { DragItemAtom, OutputsAtom, ActiveOutputsAtom } from "@/state"
import { ConnectionTrack } from "@/modules/connection-track"

export const ConnectionNode = () => {
  const outputs = useStore(OutputsAtom)
  const dragItem = useStore(DragItemAtom)
  const activeOutputs = useStore(ActiveOutputsAtom)

  const activeConnectionsIds = activeOutputs.map(({ id }) => id)

  const filteredConnections = outputs.filter(
    (out) =>
      !(
        dragItem.type === DragItemType.connection &&
        out.nextNodeId === dragItem.output?.nextNodeId &&
        out.id === dragItem.output.id
      )
  )

  return (
    <>
      {filteredConnections.map((out) => {
        if (!out.nextNodeId) return null

        return (
          <ConnectionTrack
            key={`connection${out.id}`}
            nodeId={out.nodeId}
            nextNodeId={out.nextNodeId}
            output={out}
            isActive={activeConnectionsIds.includes(out.id)}
          />
        )
      })}
    </>
  )
}
