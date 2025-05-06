import { EditorProps } from "@/domain-types"
import { Canvas } from "@/modules/canvas"
import { EditorContext } from "@/context/editor-context"
import { StoreUpdater } from "@/helpers/store-updater"
import "../../_style.scss"

export const Editor = ({
  nodes,
  outputs,
  onNodesChange,
  onOutputsChange,
  NodeComponent,
  ScaleComponent,
  MenuComponent,
  OutputComponent,
  SelectionZoneComponent,
  importantNodeIds,
  onSelectionZoneChanged,
  connectorStyleConfig
}: EditorProps) => (
  <EditorContext.Provider
    value={{
      NodeComponent,
      OutputComponent,
      importantNodeIds,
      connectorStyleConfig
    }}
  >
    <Canvas
      SelectionZoneComponent={SelectionZoneComponent}
      ScaleComponent={ScaleComponent}
      MenuComponent={MenuComponent}
    />

    <StoreUpdater
      nodes={nodes}
      outputs={outputs}
      onOutputsChange={onOutputsChange}
      onNodesChange={onNodesChange}
      onSelectionZoneChanged={onSelectionZoneChanged}
    />
  </EditorContext.Provider>
)
