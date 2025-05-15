import { useEffect, useState } from "react"
import { useStore } from "@nanostores/react"

import { Node, Point } from "@/domain-types"
import { SvgOffsetAtom } from "@/state"

/**
 * Dynamically calculates the relative position
 */
export const useNodeRelativePosition = ({
  inNodePosition = { x: 0, y: 0 },
  node
}: {
  inNodePosition?: Point
  node?: Node
}) => {
  const nodeId = node?.id || ""
  const [nodeHeight, setNodeHeight] = useState(0)
  const svgOffset = useStore(SvgOffsetAtom)

  const resizeNode: ResizeObserverCallback = (target) => {
    const newRect = target[0].contentRect

    setNodeHeight(newRect.height)
  }

  useEffect(() => {
    const node = document.getElementById(nodeId)

    if (!node) return

    const resizeNodeObserver = new ResizeObserver(resizeNode)

    resizeNodeObserver.observe(node)

    return () => {
      resizeNodeObserver.disconnect()
    }
  }, [])

  if (!node || nodeHeight === 0) return { x: 0, y: 0, rectWasSet: false }

  return {
    x: -svgOffset.x + node.position.x + inNodePosition.x,
    y: -svgOffset.y + node.position.y - inNodePosition.y + nodeHeight,
    rectWasSet: true
  }
}

export const useResizeObserver = ({ nodeId, onResize }: { nodeId: string; onResize: () => void }) => {
  useEffect(() => {
    const node = document.getElementById(nodeId)

    if (!node) return

    const resizeNodeObserver = new ResizeObserver(onResize)

    resizeNodeObserver.observe(node)

    return () => {
      resizeNodeObserver.disconnect()
    }
  }, [])
}
