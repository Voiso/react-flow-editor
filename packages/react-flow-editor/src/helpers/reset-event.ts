export const resetEvent = <T extends Element>(e: React.MouseEvent<T>) => {
  e.stopPropagation()
  e.preventDefault()
}
