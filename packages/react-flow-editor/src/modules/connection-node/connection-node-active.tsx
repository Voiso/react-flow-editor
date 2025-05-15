import { useStore } from "@nanostores/react"

import { ActiveOutputsAtom } from "@/state"
import { ConnectionTrack } from "@/modules/connection-track"

export const ConnectionNodeActive = () => {
  const activeOutputs = useStore(ActiveOutputsAtom)

  return (
    <>
      {activeOutputs.map((output) => {
        if (!output.nextNodeId) return null

        return (
          <ConnectionTrack
            key={`active${output.id}`}
            nodeId={output.nodeId}
            output={output}
            nextNodeId={output.nextNodeId}
            isActive
            isSecondLayer
          />
        )
      })}
    </>
  )
}
