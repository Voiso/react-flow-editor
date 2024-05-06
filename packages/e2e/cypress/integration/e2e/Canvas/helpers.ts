import { BROWSER_PX_DEVIATION } from "../constants"
import { coordinatesFromMatrix, coordinatesFromStringPX } from "../helpers"
import { canvasModel } from "./Canvas.model"

export const checkCanvasPosition = (x: number, y: number) =>
  canvasModel
    .canvasPosition()
    .then(coordinatesFromMatrix)
    .then(([xCoord, yCoord]) => {
      expect(Number(xCoord)).to.be.closeTo(x, BROWSER_PX_DEVIATION)
      expect(Number(yCoord)).to.be.closeTo(y, BROWSER_PX_DEVIATION)
    })

export const matchEndPosition = () => {
  checkCanvasPosition(115, 65)
  checkCanvasOriginPosition(285, 240)
}

export const checkCanvasOriginPosition = (x: number, y: number) =>
  canvasModel
    .canvasPositionOrigin()
    .then(coordinatesFromStringPX)
    .then(([xCoord, yCoord]) => {
      expect(Number(xCoord)).to.be.closeTo(x, BROWSER_PX_DEVIATION)
      expect(Number(yCoord)).to.be.closeTo(y, BROWSER_PX_DEVIATION)
    })
