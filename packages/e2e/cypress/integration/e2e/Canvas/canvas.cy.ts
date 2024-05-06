import { WheelDirection, ZOOM_IN_COUNT, ZOOM_OUT_COUNT, ZOOM_PX_DEVIATION } from "../constants"
import { zoomFromMatrix } from "../helpers"
import { canvasModel } from "./Canvas.model"
import { CANVAS_LONG_MOVE, INITIAL_OVERVIEW_X, INITIAL_OVERVIEW_Y } from "./constants"
import { CONTEXT } from "./context"
import { checkCanvasOriginPosition, checkCanvasPosition, matchEndPosition } from "./helpers"

context(CONTEXT, () => {
  beforeEach(canvasModel.open)

  describe("Initializing", () => {
    it("Should match default position", () => {
      checkCanvasPosition(INITIAL_OVERVIEW_X, INITIAL_OVERVIEW_Y)
      checkCanvasOriginPosition(385, 340)
    })
  })

  describe("Movements DnD", () => {
    it("Should move canvas one movement", () => {
      canvasModel.dnd(
        CANVAS_LONG_MOVE.FIRST_POINT.X,
        CANVAS_LONG_MOVE.FIRST_POINT.Y,
        CANVAS_LONG_MOVE.THIRD_POINT.X,
        CANVAS_LONG_MOVE.THIRD_POINT.Y
      )

      matchEndPosition()
    })

    it("Should move canvas chain movement", () => {
      canvasModel.dnd(
        CANVAS_LONG_MOVE.FIRST_POINT.X,
        CANVAS_LONG_MOVE.FIRST_POINT.Y,
        CANVAS_LONG_MOVE.SECOND_POINT.X,
        CANVAS_LONG_MOVE.SECOND_POINT.Y
      )
      canvasModel.dnd(
        CANVAS_LONG_MOVE.SECOND_POINT.X,
        CANVAS_LONG_MOVE.SECOND_POINT.Y,
        CANVAS_LONG_MOVE.SECOND_POINT.X,
        CANVAS_LONG_MOVE.FIRST_POINT.Y
      )
      canvasModel.dnd(
        CANVAS_LONG_MOVE.SECOND_POINT.X,
        CANVAS_LONG_MOVE.FIRST_POINT.Y,
        CANVAS_LONG_MOVE.THIRD_POINT.X,
        CANVAS_LONG_MOVE.THIRD_POINT.Y
      )

      matchEndPosition()
    })

    it("Should move canvas long movement", () => {
      canvasModel
        .mouseDown(CANVAS_LONG_MOVE.FIRST_POINT.X, CANVAS_LONG_MOVE.FIRST_POINT.Y)
        .realMouseMove(CANVAS_LONG_MOVE.SECOND_POINT.X, CANVAS_LONG_MOVE.SECOND_POINT.Y)
        .realMouseMove(CANVAS_LONG_MOVE.SECOND_POINT.X, CANVAS_LONG_MOVE.FIRST_POINT.Y)
        .realMouseMove(CANVAS_LONG_MOVE.THIRD_POINT.X, CANVAS_LONG_MOVE.THIRD_POINT.Y)
      canvasModel.mouseUp(CANVAS_LONG_MOVE.THIRD_POINT.X, CANVAS_LONG_MOVE.THIRD_POINT.Y)

      matchEndPosition()
    })
  })

  describe("Zoom interactions", () => {
    it("Should zoom out properly once", () => {
      canvasModel.wheel(WheelDirection.bottom)

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.closeTo", 1.05, ZOOM_PX_DEVIATION)
    })

    it("Should zoom out properly multiple", () => {
      canvasModel.wheelDirection(Array(3).fill(WheelDirection.bottom))

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.closeTo", 1.15, ZOOM_PX_DEVIATION)
    })

    it("Should zoom out properly to low threshold", () => {
      canvasModel.wheelDirection(Array(ZOOM_OUT_COUNT).fill(WheelDirection.bottom))

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.closeTo", 3, ZOOM_PX_DEVIATION)
    })

    it("Should zoom in properly once", () => {
      canvasModel.wheel(WheelDirection.top)

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.closeTo", 0.95, ZOOM_PX_DEVIATION)
    })

    it("Should zoom in properly multiple", () => {
      canvasModel.wheelDirection(Array(3).fill(WheelDirection.top))

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.closeTo", 0.85, ZOOM_PX_DEVIATION)
    })

    it("Should zoom in properly to high threshold", () => {
      canvasModel.wheelDirection(Array(ZOOM_IN_COUNT).fill(WheelDirection.top))

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.closeTo", 0.2, ZOOM_PX_DEVIATION)
    })

    it("Should zoom properly bidirectionally", () => {
      canvasModel.wheelDirection([
        WheelDirection.top,
        WheelDirection.top,
        WheelDirection.bottom,
        WheelDirection.bottom,
        WheelDirection.bottom,
        WheelDirection.bottom,
        WheelDirection.bottom,
        WheelDirection.top
      ])

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.closeTo", 1.1, ZOOM_PX_DEVIATION)
    })

    it("Should zoom with move properly", () => {
      canvasModel.dnd(
        CANVAS_LONG_MOVE.FIRST_POINT.X,
        CANVAS_LONG_MOVE.FIRST_POINT.Y,
        CANVAS_LONG_MOVE.THIRD_POINT.X,
        CANVAS_LONG_MOVE.THIRD_POINT.Y
      )
      canvasModel.wheel(WheelDirection.bottom)

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.closeTo", 1.05, ZOOM_PX_DEVIATION)

      matchEndPosition()
    })
  })
})
