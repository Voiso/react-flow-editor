const domRectClamp = new DOMRect()

export const findDOMRect = (element: Element | null): DOMRect => {
  const rect = element?.getBoundingClientRect()

  if (!rect) return domRectClamp

  return rect
}
