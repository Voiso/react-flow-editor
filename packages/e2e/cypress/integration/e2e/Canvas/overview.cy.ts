import { CANVAS_ZONE_POINTS, CLICK_COORDS, WheelDirection, ZOOM_OUT_COUNT } from "../constants"
import { zoomFromMatrix } from "../helpers"
import { CONTEXT } from "../Nodes/constants"
import { canvasModel } from "./Canvas.model"
import { INITIAL_OVERVIEW_X, INITIAL_OVERVIEW_Y } from "./constants"
import { checkCanvasPosition } from "./helpers"

context(CONTEXT, () => {
  beforeEach(canvasModel.open)

  const checkNodeInView = (node: JQuery<HTMLElement>) => {
    const rect = node.get()[0].getBoundingClientRect()

    expect(rect.top).to.be.greaterThan(CANVAS_ZONE_POINTS.TOP)
    expect(rect.bottom).to.be.lessThan(CANVAS_ZONE_POINTS.BOTTOM)
    expect(rect.left).to.be.greaterThan(CANVAS_ZONE_POINTS.LEFT)
    expect(rect.right).to.be.lessThan(CANVAS_ZONE_POINTS.RIGHT)
  }

  describe("Overview", () => {
    it("Should overview simple", () => {
      cy.contains("Overview").click()

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.equals", 1)
      checkCanvasPosition(INITIAL_OVERVIEW_X, INITIAL_OVERVIEW_Y)
    })

    it("Should overview zoom in", () => {
      canvasModel.dnd(200, 200, 400, 400)
      canvasModel.wheelDirection(Array(ZOOM_OUT_COUNT).fill(WheelDirection.top))

      cy.contains("Overview").click()

      canvasModel.canvasPosition().then(zoomFromMatrix).should("be.equals", 1)
      checkCanvasPosition(15, -35)
    })

    it("Should overview big scale", () => {
      canvasModel.dndWithDelayUp(
        CLICK_COORDS.FIRST_NODE.X,
        CLICK_COORDS.FIRST_NODE.Y,
        CANVAS_ZONE_POINTS.RIGHT,
        CANVAS_ZONE_POINTS.TOP,
        1000
      )

      canvasModel.wheelDirection(Array(ZOOM_OUT_COUNT).fill(WheelDirection.bottom))

      cy.contains("Overview").click()

      canvasModel.getNode(1).then(checkNodeInView)
      canvasModel.getNode(2).then(checkNodeInView)
      canvasModel.getNode(3).then(checkNodeInView)
    })
  })
})
