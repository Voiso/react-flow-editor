import { PROPER_COORDINATES } from "./constants"

export const coordinatesFromMatrix = (matrixString: string): [string, string] =>
  matrixString.match(/([^ ]+), ([^ ]+)\)$/)!.slice(1) as [string, string]

export const zoomFromMatrix = (matrixString: string): number => Number(matrixString.match(/matrix\(([^(][\d.]*),/)![1])

export const coordinatesFromStringPX = (positionString: string) =>
  positionString.split(" ").map((item) => Math.round(parseInt(item)))

export const coordinatesFromPath = (pathString: string) =>
  coordinatesFromStringPX(pathString).filter((item) => !isNaN(Number(item)))

export const compareWithProperCoordinates = (coordinates: Array<number>) =>
  coordinates.forEach((coord, inx) => expect(coord).to.closeTo(PROPER_COORDINATES[inx], 2))
