import { BROWSER_PX_DEVIATION } from "../constants"
import { CONTEXT, MOVEMENT_X_1, MOVEMENT_Y_1 } from "./constants"
import { nodesModel } from "./Nodes.model"

context(CONTEXT, () => {
  beforeEach(nodesModel.open)

  describe("Selections", () => {
    it("Should be not selected on init", () => {
      nodesModel.getNodeElement(1).then(($el) => expect($el.hasClass("selected")).to.equals(false))
    })

    it("Should select nodes on click", () => {
      nodesModel.nodeClick(1)

      nodesModel.getNodeElement(1).then(($el) => expect($el.hasClass("selected")).to.equals(true))
      nodesModel.getNodeElement(2).then(($el) => expect($el.hasClass("selected")).to.equals(false))
    })

    it("Should select nodes on click chain", () => {
      nodesModel.nodeClick(1)

      nodesModel.getNodeElement(1).then(($el) => expect($el.hasClass("selected")).to.equals(true))
      nodesModel.getNodeElement(2).then(($el) => expect($el.hasClass("selected")).to.equals(false))

      nodesModel.nodeClick(2)

      nodesModel.getNodeElement(1).then(($el) => expect($el.hasClass("selected")).to.equals(false))
      nodesModel.getNodeElement(2).then(($el) => expect($el.hasClass("selected")).to.equals(true))
    })

    it("Should select nodes on click multiple", () => {
      nodesModel.nodeClick(1)
      nodesModel.getNode(2).click({ shiftKey: true })

      nodesModel.getNodeElement(1).then(($el) => expect($el.hasClass("selected")).to.equals(true))
      nodesModel.getNodeElement(2).then(($el) => expect($el.hasClass("selected")).to.equals(true))

      nodesModel.nodeClick(1)

      nodesModel.getNodeElement(1).then(($el) => expect($el.hasClass("selected")).to.equals(true))
      nodesModel.getNodeElement(2).then(($el) => expect($el.hasClass("selected")).to.equals(false))
    })

    it("Should move multiple selected nodes", () => {
      nodesModel.nodeClick(1)
      nodesModel.getNode(2).click({ shiftKey: true })

      nodesModel.getNode(1).trigger("mousedown", { shiftKey: true, button: 0 })
      nodesModel.getRoot().trigger("mousemove", { clientX: MOVEMENT_X_1, clientY: MOVEMENT_Y_1 })
      nodesModel.getNode(1).trigger("mouseup", { button: 0 })

      nodesModel.nodePositionNumeric(1).then(([x, y]) => {
        expect(Number(x)).to.closeTo(111, BROWSER_PX_DEVIATION)
        expect(Number(y)).to.closeTo(231, BROWSER_PX_DEVIATION)
      })

      nodesModel.nodePositionNumeric(2).then(([x, y]) => {
        expect(Number(x)).to.closeTo(311, BROWSER_PX_DEVIATION)
        expect(Number(y)).to.closeTo(431, BROWSER_PX_DEVIATION)
      })
    })

    it("Should select by selection zone", () => {
      nodesModel.getRoot().trigger("mousedown", { shiftKey: true, button: 0, clientX: 210, clientY: 60 })
      nodesModel.getRoot().trigger("mousemove", { clientX: 330, clientY: 200 })

      nodesModel.getNodeElement(1).then(($el) => expect($el.hasClass("selected")).to.equals(true))
      nodesModel.getNodeElement(2).then(($el) => expect($el.hasClass("selected")).to.equals(false))

      nodesModel.getRoot().trigger("mousemove", { clientX: 530, clientY: 400 })
      nodesModel.getRoot().trigger("mouseup", { button: 0, clientX: 530, clientY: 400 })

      nodesModel.getNodeElement(1).then(($el) => expect($el.hasClass("selected")).to.equals(true))
      nodesModel.getNodeElement(2).then(($el) => expect($el.hasClass("selected")).to.equals(true))
    })
  })
})
