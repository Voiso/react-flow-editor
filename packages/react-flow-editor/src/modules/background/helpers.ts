export const countOffset = (offset: number, zoom: number, editorDimension?: number): number =>
  offset * zoom + (editorDimension || 0) / 2
