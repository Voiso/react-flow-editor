import { selectors } from "../../../models"
import { CANVAS_POINT, CANVAS_ZONE_POINTS, CLICK_COORDS, NodeState } from "../constants"
import { coordinatesFromPath } from "../helpers"
import { connectionsModel } from "./Connections.model"
import { CYCLIC_TEST_2_CONNECTOR, FIRST_NODE_CONNECTOR, SECOND_NODE_CONNECTOR } from "./constants"

context("Node connections", () => {
  beforeEach(connectionsModel.open)

  const checkConnectionsCount = (count: number) =>
    connectionsModel.getConnections().then(($cons) => expect($cons.length).to.equal(count))

  describe("Connections logic", () => {
    const verifyFirstConnectionInitial = () =>
      connectionsModel
        .getFirstConnectionPath()
        .then(coordinatesFromPath)
        .then((coordinates) => {
          const properCoordinates = [15310, 15335, 15209, 15335, 15359, 15140, 15259, 15140]

          coordinates.forEach((coord, inx) => expect(coord).to.closeTo(properCoordinates[inx], 2))
        })

    const verifyFirstConnectionInitialMiddleInflection = () =>
      connectionsModel
        .getFirstConnectionPath()
        .should("be.equal", "M 15310 15335 C 15210 15335, 15359 15140, 15259 15140")

    it("Should match default connector path", () => {
      verifyFirstConnectionInitial()
    })

    it("Should match middleInflection connector path", () => {
      connectionsModel.enableMiddleInflection()
      verifyFirstConnectionInitialMiddleInflection()
    })

    it("Should move connectors middleInflection", () => {
      connectionsModel.enableMiddleInflection()
      connectionsModel.mouseDown(FIRST_NODE_CONNECTOR.X, FIRST_NODE_CONNECTOR.Y)
      connectionsModel.getRoot().realMouseMove(FIRST_NODE_CONNECTOR.X, FIRST_NODE_CONNECTOR.Y)

      connectionsModel
        .getLastConnectionPath()
        .then(coordinatesFromPath)
        .then((coordinates) => {
          const properCoordinates = [15253, 15136, 15153, 15136, 15359, 15140, 15259, 15140]
          coordinates.forEach((coord, inx) => expect(coord).to.closeTo(properCoordinates[inx], 2))
        })

      connectionsModel.getRoot().realMouseMove(CLICK_COORDS.SECOND_NODE.X, CLICK_COORDS.SECOND_NODE.Y)
      connectionsModel.mouseUp(CLICK_COORDS.SECOND_NODE.X, CLICK_COORDS.SECOND_NODE.Y)

      verifyFirstConnectionInitialMiddleInflection()
    })

    it("Should move connectors", () => {
      connectionsModel.mouseDown(FIRST_NODE_CONNECTOR.X, FIRST_NODE_CONNECTOR.Y)
      connectionsModel.getRoot().realMouseMove(FIRST_NODE_CONNECTOR.X, FIRST_NODE_CONNECTOR.Y)

      connectionsModel
        .getLastConnectionPath()
        .then(coordinatesFromPath)
        .then((coordinates) => {
          const properCoordinates = [15253, 15136, 15004, 15086, 15509, 15090, 15259, 15140]

          coordinates.forEach((coord, inx) => expect(coord).to.closeTo(properCoordinates[inx], 2))
        })

      connectionsModel.getRoot().realMouseMove(CLICK_COORDS.SECOND_NODE.X, CLICK_COORDS.SECOND_NODE.Y)
      connectionsModel.mouseUp(CLICK_COORDS.SECOND_NODE.X, CLICK_COORDS.SECOND_NODE.Y)

      verifyFirstConnectionInitial()
    })

    it("Should disconnect/connect connectors", () => {
      checkConnectionsCount(3)

      connectionsModel.mouseDown(FIRST_NODE_CONNECTOR.X, FIRST_NODE_CONNECTOR.Y)
      connectionsModel
        .getRoot()
        .realMouseMove(FIRST_NODE_CONNECTOR.X + 10, FIRST_NODE_CONNECTOR.Y)
        .realMouseUp()

      checkConnectionsCount(2)

      connectionsModel.mouseDown(FIRST_NODE_CONNECTOR.X, FIRST_NODE_CONNECTOR.Y)
      connectionsModel.getRoot().realMouseMove(CLICK_COORDS.SECOND_NODE.X, CLICK_COORDS.SECOND_NODE.Y)
      connectionsModel.mouseUp(CLICK_COORDS.SECOND_NODE.X, CLICK_COORDS.SECOND_NODE.Y)

      checkConnectionsCount(3)

      verifyFirstConnectionInitial()
    })

    it("Should drag connection via autoscroll", () => {
      connectionsModel.mouseDown(FIRST_NODE_CONNECTOR.X, FIRST_NODE_CONNECTOR.Y)
      connectionsModel
        .getRoot()
        .realMouseMove(FIRST_NODE_CONNECTOR.X + 10, FIRST_NODE_CONNECTOR.Y)
        .realMouseMove(CANVAS_ZONE_POINTS.RIGHT, CANVAS_ZONE_POINTS.TOP)
        .wait(1000)

      cy.get(selectors.CONNECTION)
        .last()
        .then(($el) => {
          const rect = $el.get()[0].getBoundingClientRect()
          expect(rect.top).to.closeTo(CANVAS_ZONE_POINTS.TOP, 2)
          expect(rect.left).to.lessThan(0)
          expect(rect.right).to.closeTo(CANVAS_ZONE_POINTS.RIGHT, 2)
          expect(rect.height).to.greaterThan(CANVAS_ZONE_POINTS.BOTTOM)
          expect(rect.width).to.greaterThan(CANVAS_ZONE_POINTS.RIGHT)
        })
    })

    it("Should disable node without empty inputs", () => {
      connectionsModel.getNodeElement(1).then(($el) => expect($el.hasClass(NodeState.disabled)).to.equal(false))

      connectionsModel
        .mouseDown(SECOND_NODE_CONNECTOR.X, SECOND_NODE_CONNECTOR.Y)
        .realMouseMove(SECOND_NODE_CONNECTOR.X + 1, SECOND_NODE_CONNECTOR.Y)

      connectionsModel.getNodeElement(1).then(($el) => expect($el.hasClass(NodeState.disabled)).to.equal(true))
    })

    it("Should has 'draggingConnector' state", () => {
      const checkFirstDraggingConnector = (isDragging: boolean) =>
        connectionsModel
          .getNodeElement(1)
          .then(($el) => expect($el.hasClass(NodeState.draggingConnector)).to.be.equals(isDragging))

      checkFirstDraggingConnector(false)

      connectionsModel.mouseDown(FIRST_NODE_CONNECTOR.X, FIRST_NODE_CONNECTOR.Y).realMouseMove(700, 500)

      checkFirstDraggingConnector(true)

      connectionsModel.getRoot().realMouseUp({ position: { x: CANVAS_POINT.X, y: CANVAS_POINT.Y } })
      checkFirstDraggingConnector(false)
    })

    it("Should connect nodes with cyclic prop", () => {
      connectionsModel.dnd(990, 400, 750, 300)

      checkConnectionsCount(3)

      connectionsModel.dnd(630, 466, 630, 426)

      checkConnectionsCount(3)

      connectionsModel.dnd(CYCLIC_TEST_2_CONNECTOR.X, CYCLIC_TEST_2_CONNECTOR.Y, CYCLIC_TEST_2_CONNECTOR.X, 300)

      checkConnectionsCount(2)

      connectionsModel.dnd(CYCLIC_TEST_2_CONNECTOR.X, CYCLIC_TEST_2_CONNECTOR.Y, CYCLIC_TEST_2_CONNECTOR.X, 226)

      checkConnectionsCount(3)
    })
  })
})
