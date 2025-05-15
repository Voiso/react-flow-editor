import React from "react"
import { useStore } from "@nanostores/react"
import { isEqual } from "lodash"

import { NodesAtom } from "@/state"

import { ActiveConnections, Connections } from "../connections"
import Node from "./node"

export const NodesContainer = React.memo(() => {
  const nodes = useStore(NodesAtom)

  return (
    <>
      <ActiveConnections />
      {nodes.map((node) => (
        <Node node={node} key={node.id} />
      ))}
      <Connections />
    </>
  )
}, isEqual)
