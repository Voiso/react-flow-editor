export const coordinatesFromMatrix = (matrixString: string): [string, string] =>
  matrixString.match(/([^ ]+), ([^ ]+)\)$/)!.slice(1) as [string, string]

export const zoomFromMatrix = (matrixString: string): number => Number(matrixString.match(/matrix\(([^(][\d.]*),/)![1])

export const coordinatesFromStringPX = (positionString: string) =>
  positionString.split(" ").map((item) => Math.round(parseInt(item)))

export const coordinatesFromPath = (pathString: string) =>
  coordinatesFromStringPX(pathString).filter((item) => !isNaN(Number(item)))
