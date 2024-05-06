import React from "react"
import { useStore } from "@nanostores/react"
import { isEqual } from "lodash"

import { NodesAtom } from "@/Editor/state"

import { Container as ConnectionContainer } from "../../components/Connections"
import Node from "./node"

export const NodesContainer: React.FC = React.memo(() => {
  const nodes = useStore(NodesAtom)

  return (
    <>
      {nodes.map((node) => (
        <Node node={node} key={node.id} />
      ))}
      <ConnectionContainer />
    </>
  )
}, isEqual)
